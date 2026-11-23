import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { featuredRoutes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Routes",
  description:
    "Featured USA private jet routes arranged by JetAeris—New York, Miami, Los Angeles, Las Vegas, and expanding city pairs.",
  alternates: { canonical: "/routes" },
};

export default function RoutesPage() {
  return (
    <div className="bg-paper pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container">
        <SectionHeading
          eyebrow="USA routes"
          title="City pairs that convert—built for search and for sales."
          body="Big brands under-invest in specific route pages. We treat each corridor as a product: airports, timing, aircraft fit, and a direct quote path."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {featuredRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="border border-[var(--line)] bg-[color-mix(in_srgb,white_55%,var(--paper))] p-8 transition-colors hover:border-[var(--line-strong)]"
            >
              <p className="text-xs tracking-[0.16em] text-accent uppercase">
                {route.airports}
              </p>
              <h2 className="serif mt-4 text-3xl text-ink">
                {route.from} → {route.to}
              </h2>
              <p className="mt-3 text-sm text-muted">{route.time}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
