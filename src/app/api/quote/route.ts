import { NextResponse } from "next/server";
import { site } from "@/lib/site";

type QuoteBody = Record<string, unknown>;

function clean(value: unknown, max = 200) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function flag(value: unknown) {
  return Boolean(value);
}

export async function POST(request: Request) {
  let body: QuoteBody;

  try {
    body = (await request.json()) as QuoteBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const payload = {
    tripType: clean(body.tripType, 40) || "one-way",
    from: clean(body.from, 120),
    to: clean(body.to, 120),
    date: clean(body.date, 40),
    returnDate: clean(body.returnDate, 40),
    timePref: clean(body.timePref, 80),
    passengers: clean(body.passengers, 10),
    bags: clean(body.bags, 120),
    pets: clean(body.pets, 40),
    aircraftPref: clean(body.aircraftPref, 40),
    flexibleAirports: flag(body.flexibleAirports),
    emptyLegInterest: flag(body.emptyLegInterest),
    limo: flag(body.limo),
    catering: flag(body.catering),
    wifi: flag(body.wifi),
    name: clean(body.name, 120),
    email: clean(body.email, 160),
    phone: clean(body.phone, 40),
    company: clean(body.company, 120),
    channel: clean(body.channel, 40),
    notes: clean(body.notes, 2000),
    consent: flag(body.consent),
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

  if (!payload.consent) {
    return NextResponse.json(
      { ok: false, error: "Privacy consent is required." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  const requestId = `JA-${Date.now().toString(36).toUpperCase()}`;
  const leadEmail =
    process.env.LEADS_EMAIL || process.env.CONTACT_EMAIL || site.email;
  const resendKey = process.env.RESEND_API_KEY;

  const text = [
    `New JetAeris flight request (${requestId})`,
    ``,
    `Trip type: ${payload.tripType}`,
    `From: ${payload.from}`,
    `To: ${payload.to}`,
    `Date: ${payload.date}`,
    `Return: ${payload.returnDate || "—"}`,
    `Time preference: ${payload.timePref || "—"}`,
    `Passengers: ${payload.passengers}`,
    `Bags: ${payload.bags || "—"}`,
    `Pets: ${payload.pets}`,
    `Aircraft pref: ${payload.aircraftPref || "recommend"}`,
    `Flexible FBOs: ${payload.flexibleAirports ? "yes" : "no"}`,
    `Empty leg interest: ${payload.emptyLegInterest ? "yes" : "no"}`,
    `Limo: ${payload.limo ? "yes" : "no"}`,
    `Catering: ${payload.catering ? "yes" : "no"}`,
    `Wi-Fi: ${payload.wifi ? "yes" : "no"}`,
    ``,
    `Name: ${payload.name}`,
    `Company: ${payload.company || "—"}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Prefer: ${payload.channel}`,
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
        subject: `${requestId} · ${payload.from} → ${payload.to}`,
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
    console.info("[JetAeris quote lead]", { requestId, ...payload });
  }

  return NextResponse.json({ ok: true, requestId });
}
