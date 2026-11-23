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
        <p className="mt-3 text-xs tracking-[0.12em] text-white/45 uppercase">
          {site.deskHours}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/quote" className="btn btn-light">
            Request a flight
          </Link>
          <Link href="/empty-legs" className="btn btn-ghost">
            Empty legs
          </Link>
        </div>
      </div>
    </section>
  );
}
