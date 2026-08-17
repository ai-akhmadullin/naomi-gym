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

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Without Telegram credentials the enquiry is only logged (demo mode) — the
  // gym owner will not see leads until TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID
  // are set. Zalo OA delivery can be added later once the owner registers an
  // Official Account.
  if (!botToken || !chatId) {
    console.info("[contact] new enquiry (Telegram not configured)", { name, contact, plan, message });
    return NextResponse.json({ ok: true });
  }

  const lines = [
    "🏋️ New enquiry — Naomi Gym",
    `Name: ${name}`,
    `Contact: ${contact}`,
  ];
  if (plan) {
    lines.push(`Plan: ${plan}`);
  }
  if (message) {
    lines.push("", message);
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: lines.join("\n") }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[contact] Telegram delivery failed", response.status, await response.text());
      return NextResponse.json({ ok: false, error: "Failed to send message." }, { status: 500 });
    }
  } catch (error) {
    console.error("[contact] Telegram delivery failed", error);
    return NextResponse.json({ ok: false, error: "Failed to send message." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
