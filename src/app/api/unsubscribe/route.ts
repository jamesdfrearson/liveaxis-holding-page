import Registration from "@/models/registration";
import connectToMongoDb from "@/utils/connect-to-mongodb";
import getClientIp from "@/utils/get-client-ip";
import { after, NextResponse } from "next/server";

import z from "zod";

const BodySchema = z.strictObject({
  token: z.string().min(2).max(100).trim(),
});

export async function DELETE(request: Request) {
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

  // Connect to the database.
  try {
    await connectToMongoDb();
  } catch {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  await Registration.deleteOne({ token: result.data.token });

  return NextResponse.json({ message: "OK" });
}
