import { NextResponse } from "next/server";
import { site } from "@/lib/site";

type QuoteBody = {
  from?: string;
  to?: string;
  date?: string;
  passengers?: string;
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
};

function clean(value: unknown, max = 200) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: QuoteBody;

  try {
    body = (await request.json()) as QuoteBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const payload = {
    from: clean(body.from, 120),
    to: clean(body.to, 120),
    date: clean(body.date, 40),
    passengers: clean(body.passengers, 10),
    name: clean(body.name, 120),
    email: clean(body.email, 160),
    phone: clean(body.phone, 40),
    notes: clean(body.notes, 2000),
  };

  if (
    !payload.from ||
    !payload.to ||
    !payload.date ||
    !payload.name ||
    !payload.email ||
    !payload.phone
  ) {
    return NextResponse.json(
      { ok: false, error: "Please complete all required fields." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  const leadEmail =
    process.env.LEADS_EMAIL || process.env.CONTACT_EMAIL || site.email;
  const resendKey = process.env.RESEND_API_KEY;

  const text = [
    `New JetAeris flight request`,
    ``,
    `From: ${payload.from}`,
    `To: ${payload.to}`,
    `Date: ${payload.date}`,
    `Passengers: ${payload.passengers}`,
    ``,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    ``,
    `Notes: ${payload.notes || "—"}`,
  ].join("\n");

  if (resendKey) {
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "JetAeris <onboarding@resend.dev>",
        to: [leadEmail],
        reply_to: payload.email,
        subject: `Flight request · ${payload.from} → ${payload.to}`,
        text,
      }),
    });

    if (!emailRes.ok) {
      const detail = await emailRes.text();
      console.error("Resend error:", detail);
      return NextResponse.json(
        {
          ok: false,
          error: "We could not deliver your request. Please email us directly.",
        },
        { status: 502 },
      );
    }
  } else {
    console.info("[JetAeris quote lead]", payload);
  }

  return NextResponse.json({ ok: true });
}
