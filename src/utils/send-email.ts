import { randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";

import { ClientSecretCredential } from "@azure/identity";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

const senderAddress = "noreply@liveaxis.co.uk";
const senderName = "LiveAxis";

const graphBaseUrl = "https://graph.microsoft.com/v1.0";
const graphScope = "https://graph.microsoft.com/.default";

const maximumSendAttempts = 3;
const requestTimeoutMilliseconds = 15_000;

let credential: ClientSecretCredential | undefined;

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

type MicrosoftGraphTokenClaims = {
  appid?: string;
  azp?: string;
  aud?: string;
  tid?: string;
  roles?: string[];
};

type MicrosoftGraphErrorResponse = {
  error?: {
    code?: string;
    message?: string;
    innerError?: {
      date?: string;
      "request-id"?: string;
      "client-request-id"?: string;
    };
  };
};

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getCredential(): ClientSecretCredential {
  credential ??= new ClientSecretCredential(
    getRequiredEnv("M365_TENANT_ID"),
    getRequiredEnv("M365_CLIENT_ID"),
    getRequiredEnv("M365_CLIENT_SECRET"),
  );

  return credential;
}

function isValidEmailAddress(email: string): boolean {
  return (
    email.length <= 254 &&
    !email.includes("\r") &&
    !email.includes("\n") &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function validateEmailAddress(email: string, fieldName: string): void {
  if (!isValidEmailAddress(email)) {
    throw new Error(`Invalid ${fieldName} email address.`);
  }
}

function validateSubject(subject: string): void {
  if (!subject.trim()) {
    throw new Error("Email subject is required.");
  }

  if (subject.includes("\r") || subject.includes("\n")) {
    throw new Error("Email subject contains invalid characters.");
  }
}

function validateBody(body: string, fieldName: string): void {
  if (!body.trim()) {
    throw new Error(`Email ${fieldName} body is required.`);
  }
}

function decodeTokenClaims(token: string): MicrosoftGraphTokenClaims {
  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("Microsoft Graph returned an invalid access token.");
  }

  try {
    return JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf8"),
    ) as MicrosoftGraphTokenClaims;
  } catch (error) {
    throw new Error("Unable to decode Microsoft Graph access token.", {
      cause: error,
    });
  }
}

/**
 * Nodemailer is only used to generate a standards-compliant MIME message.
 * It does not establish an SMTP connection.
 */
const mimeTransporter = nodemailer.createTransport({
  streamTransport: true,
  buffer: true,
  newline: "unix",
});

async function getGraphAccessToken(): Promise<string> {
  try {
    const result = await getCredential().getToken(graphScope);

    if (!result?.token) {
      throw new Error("Microsoft Entra returned an empty access token.");
    }

    const claims = decodeTokenClaims(result.token);
    const expectedTenantId = getRequiredEnv("M365_TENANT_ID");
    const expectedClientId = getRequiredEnv("M365_CLIENT_ID");
    const tokenClientId = claims.azp ?? claims.appid;

    if (claims.tid !== expectedTenantId) {
      throw new Error(
        `Microsoft Graph token belongs to tenant ` +
          `${claims.tid ?? "unknown"}, expected ${expectedTenantId}.`,
      );
    }

    if (tokenClientId !== expectedClientId) {
      throw new Error(
        `Microsoft Graph token belongs to application ` +
          `${tokenClientId ?? "unknown"}, expected ${expectedClientId}.`,
      );
    }

    if (process.env.NODE_ENV !== "production") {
      console.info("Microsoft Graph email token", {
        tenantId: claims.tid,
        clientId: tokenClientId,
        audience: claims.aud,
        roles: claims.roles ?? [],
      });
    }

    return result.token;
  } catch (error) {
    throw new Error("Unable to authenticate with Microsoft Graph.", {
      cause: error,
    });
  }
}

async function createMimeMessage({
  to,
  subject,
  html,
  text,
  replyTo,
}: Required<SendEmailOptions>): Promise<Buffer> {
  const auditBcc = process.env.EMAIL_AUDIT_BCC?.trim();

  if (auditBcc) {
    validateEmailAddress(auditBcc, "audit BCC");
  }

  const message: Mail.Options = {
    from: {
      name: senderName,
      address: senderAddress,
    },
    to,
    subject,
    html,
    text,
    replyTo,
    ...(auditBcc ? { bcc: auditBcc } : {}),
  };

  const result = await mimeTransporter.sendMail(message);

  if (!Buffer.isBuffer(result.message)) {
    throw new Error("Nodemailer did not generate a valid MIME message.");
  }

  return result.message;
}

function isRetryableStatus(status: number): boolean {
  return status === 429 || status === 502 || status === 503 || status === 504;
}

function getRetryDelayMilliseconds(
  retryAfterHeader: string | null,
  attempt: number,
): number {
  if (retryAfterHeader) {
    const retryAfterSeconds = Number(retryAfterHeader);

    if (Number.isFinite(retryAfterSeconds) && retryAfterSeconds >= 0) {
      return retryAfterSeconds * 1_000;
    }

    const retryAfterDate = Date.parse(retryAfterHeader);

    if (Number.isFinite(retryAfterDate)) {
      return Math.max(0, retryAfterDate - Date.now());
    }
  }

  const exponentialDelay = 500 * 2 ** attempt;
  const jitter = Math.floor(Math.random() * 250);

  return exponentialDelay + jitter;
}

async function readGraphError(response: Response): Promise<{
  code: string;
  message: string;
}> {
  const responseBody = await response.text();

  if (!responseBody) {
    return {
      code: "UnknownGraphError",
      message: "Microsoft Graph returned no error details.",
    };
  }

  try {
    const parsed = JSON.parse(responseBody) as MicrosoftGraphErrorResponse;

    return {
      code: parsed.error?.code ?? "UnknownGraphError",
      message:
        parsed.error?.message ?? "Microsoft Graph returned no error message.",
    };
  } catch {
    return {
      code: "InvalidGraphErrorResponse",
      message: responseBody.slice(0, 500),
    };
  }
}

async function sendMimeMessage(
  accessToken: string,
  mimeMessage: Buffer,
): Promise<void> {
  const senderUserId = getRequiredEnv("M365_SENDER_USER_ID");

  const endpoint =
    `${graphBaseUrl}/users/` + `${encodeURIComponent(senderUserId)}/sendMail`;

  for (let attempt = 0; attempt < maximumSendAttempts; attempt += 1) {
    const clientRequestId = randomUUID();

    let response: Response;

    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/plain",
          "client-request-id": clientRequestId,
          "return-client-request-id": "true",
        },
        body: mimeMessage.toString("base64"),
        signal: AbortSignal.timeout(requestTimeoutMilliseconds),
      });
    } catch (error) {
      const isFinalAttempt = attempt === maximumSendAttempts - 1;

      if (isFinalAttempt) {
        throw new Error(
          `Microsoft Graph email request failed. ` +
            `Request ID: ${clientRequestId}.`,
          { cause: error },
        );
      }

      await delay(getRetryDelayMilliseconds(null, attempt));

      continue;
    }

    if (response.ok) {
      return;
    }

    const isFinalAttempt = attempt === maximumSendAttempts - 1;

    if (!isRetryableStatus(response.status) || isFinalAttempt) {
      const graphError = await readGraphError(response);

      const requestReference =
        response.headers.get("request-id") ??
        response.headers.get("client-request-id") ??
        clientRequestId;

      throw new Error(
        `Microsoft Graph rejected the email request with HTTP ` +
          `${response.status} (${graphError.code}): ` +
          `${graphError.message} ` +
          `Request ID: ${requestReference}.`,
      );
    }

    await response.arrayBuffer();

    await delay(
      getRetryDelayMilliseconds(response.headers.get("retry-after"), attempt),
    );
  }

  throw new Error("Microsoft Graph email delivery attempts were exhausted.");
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo = getRequiredEnv("EMAIL_REPLY_TO"),
}: SendEmailOptions): Promise<void> {
  const recipient = to.trim();
  const emailSubject = subject.trim();
  const replyAddress = replyTo.trim();

  validateEmailAddress(recipient, "recipient");
  validateEmailAddress(replyAddress, "reply-to");
  validateSubject(emailSubject);
  validateBody(html, "HTML");
  validateBody(text, "plain-text");

  const mimeMessage = await createMimeMessage({
    to: recipient,
    subject: emailSubject,
    html,
    text,
    replyTo: replyAddress,
  });

  const accessToken = await getGraphAccessToken();

  await sendMimeMessage(accessToken, mimeMessage);
}
