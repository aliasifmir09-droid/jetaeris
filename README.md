# JetAeris

Premium USA private jet charter & empty-leg website for [jetaeris.com](https://jetaeris.com).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Vercel-ready
- Quote API with optional [Resend](https://resend.com) email delivery

## Design principles (vs ordinary charter sites)

Informed by NetJets, VistaJet, Wheels Up, ACS, and Flexjet patterns:

- Concierge calm, not marketplace clutter
- Trip-first quote path (from / to / date / passengers)
- Full-bleed cinematic hero; brand as the primary signal
- Route & city SEO pages as products
- Explicit broker / Part 135 partner disclosure

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local`:

- `LEADS_EMAIL` — where quote requests are sent
- `RESEND_API_KEY` — optional; without it, leads are logged server-side only

## Deploy on Vercel

1. Push this repo to GitHub
2. Import the repo in Vercel
3. Add env vars (`LEADS_EMAIL`, optionally `RESEND_API_KEY` / `RESEND_FROM`)
4. Attach `jetaeris.com` + `www` in Project → Domains
