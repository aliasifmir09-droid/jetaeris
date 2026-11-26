import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand({
  title = "Tell us the trip. We return options.",
  body = site.responsePromise,
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--section-dark)] py-20 text-white md:py-28">
      <div className="atmosphere-dark" aria-hidden />
      <div className="container-narrow relative text-center">
        <p className="eyebrow text-[var(--accent-soft)]">Concierge desk</p>
        <h2 className="serif mt-4 text-[clamp(2rem,4.5vw,3.4rem)]">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-8 text-white/68">
          {body}
        </p>
        <p className="mt-4 text-sm font-semibold tracking-[0.06em] text-[var(--accent-soft)] uppercase">
          Bookings open {site.bookingOpensLabel}
        </p>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/50">
          {site.bookingOpensTagline}
        </p>
        <p className="mt-3 text-xs tracking-[0.12em] text-white/45 uppercase">
          {site.deskHours}
        </p>
        {site.phoneHref ? (
          <p className="mt-3 text-sm text-white/70">
            Call{" "}
            <a href={site.phoneHref} className="text-white underline underline-offset-4">
              {site.phoneDisplay}
            </a>
          </p>
        ) : null}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/quote" className="btn btn-light">
            Request a quote
          </Link>
          {site.phoneHref ? (
            <a href={site.phoneHref} className="btn btn-ghost">
              Call the desk
            </a>
          ) : null}
          <Link href="/empty-legs" className="btn btn-ghost">
            Empty legs
          </Link>
        </div>
      </div>
    </section>
  );
}
