// Next
import { after, NextResponse } from "next/server";

// Models
import Registration from "@/models/registration";

// Utils
import getClientIp from "@/utils/get-client-ip";
import connectToMongoDb from "@/utils/connect-to-mongodb";
import { createThankYouEmail } from "@/utils/emails/thank-you";
import { sendEmail } from "@/utils/send-email";

// Packages
import z from "zod";
import { v7 } from "uuid";

const BodySchema = z.strictObject({
  name: z.string().min(2).max(100).trim(),
  email: z.email().trim().toLowerCase(),
  company: z.string().min(2).max(100).trim(),
  agreeToTerms: z.boolean(),
  receiveUpdates: z.boolean(),
  screens: z.number(),
});

export async function POST(request: Request) {
  let bodyRaw: unknown;

  // Try and convert the body from JSON.
  try {
    bodyRaw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Safe parse the body via Zod.
  const result = BodySchema.safeParse(bodyRaw);

  if (!result.success)
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });

  const ip = getClientIp(request) ?? "unknown";

  // Connect to the database.
  try {
    await connectToMongoDb();
  } catch {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  after(async () => {
    await Registration.findOneAndUpdate(
      { email: result.data.email },
      {
        $set: {
          name: result.data.name,
          email: result.data.email,
          company: result.data.company,
          acceptedTermsAndConditions: new Date(),
          receiveMarketingEmails: result.data.receiveUpdates,
          ipAddress: ip,
          screens: result.data.screens,
        },
        $setOnInsert: {
          token: v7(),
        },
      },
      { upsert: true },
    );

    const reg = await Registration.findOne({ email: result.data.email }).lean();

    const url: URL = new URL("/unsubscribe", request.url);

    url.searchParams.set("token", reg?.token ?? "");

    const { subject, text, html } = createThankYouEmail({
      name: result.data.name,
      unsubscribeUrl: url.toString(),
    });

    await sendEmail({
      to: result.data.email,
      subject,
      text,
      html,
    });
  });

  return NextResponse.json({ message: "OK" });
}
