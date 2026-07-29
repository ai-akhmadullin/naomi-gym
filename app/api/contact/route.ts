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

  // ⚠️ TODO(launch): this is a STUB — the enquiry is only logged to the server
  // console and is NOT delivered to anyone. The gym owner will not see leads
  // until this is wired up. Add ONE delivery channel below (all the data you
  // need is in { name, contact, plan, message }):
  //
  //   • Telegram: fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, ...)
  //       with chat_id = the owner's chat ID. Instant push to their phone.
  //   • Email:    Resend (`resend.emails.send(...)`) or SMTP via Nodemailer.
  //   • Sheet:    POST to a Google Apps Script web-app URL that appends a row.
  //
  // Put secrets in env vars (e.g. TELEGRAM_BOT_TOKEN / RESEND_API_KEY) and read
  // them via process.env. IMPORTANT: if delivery FAILS, return a 500 (ok:false)
  // so the form shows its error state — otherwise the visitor sees "Message
  // sent!" while the lead was actually lost.
  console.info("[contact] new enquiry", { name, contact, plan, message });

  return NextResponse.json({ ok: true });
}
