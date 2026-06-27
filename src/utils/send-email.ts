// src/lib/email.ts
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

const allowedSenders = new Set([
  "noreply@liveaxis.co.uk",
  "support@liveaxis.co.uk",
  "privacy@liveaxis.co.uk",
]);

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function isValidEmailAddress(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP2GO_HOST ?? "mail.smtp2go.com",
  port: Number(process.env.SMTP2GO_PORT ?? 587),
  secure: false, // false for STARTTLS on port 587
  requireTLS: true,
  auth: {
    user: getRequiredEnv("SMTP2GO_USERNAME"),
    pass: getRequiredEnv("SMTP2GO_PASSWORD"),
  },
});

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  text: string;
  from?: string;
  replyTo?: string;
};

export async function sendEmail({
  to,
  subject,
  html,
  text,
  from = getRequiredEnv("EMAIL_FROM_NOREPLY"),
  replyTo = getRequiredEnv("EMAIL_REPLY_TO"),
}: SendEmailOptions): Promise<void> {
  if (!isValidEmailAddress(to)) {
    throw new Error("Invalid recipient email address.");
  }

  if (!allowedSenders.has(from)) {
    throw new Error("Invalid sender email address.");
  }

  const message: Mail.Options = {
    from: `LiveAxis <${from}>`,
    to,
    subject,
    html,
    text,
    replyTo,
    bcc: "jamesdfrearson@gmail.com",
  };

  await transporter.sendMail(message);
}
