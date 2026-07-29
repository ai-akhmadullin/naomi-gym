import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  contact?: unknown;
  plan?: unknown;
  message?: unknown;
};

function asTrimmedString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = asTrimmedString(body.name, 120);
  const contact = asTrimmedString(body.contact, 160);
  const plan = asTrimmedString(body.plan, 120);
  const message = asTrimmedString(body.message, 2000);

  if (!name || !contact) {
    return NextResponse.json({ ok: false, error: "Name and contact are required." }, { status: 400 });
  }

  // Demo build: we simply acknowledge the enquiry. To make this live, forward the
  // lead to wherever the gym wants it — email (Resend / Nodemailer), a Telegram or
  // Zalo bot, a Google Sheet, or a CRM — using the values below.
  console.info("[contact] new enquiry", { name, contact, plan, message });

  return NextResponse.json({ ok: true });
}
