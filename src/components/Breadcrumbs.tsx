import Link from "next/link";
import { site } from "@/lib/site";

export type Crumb = { name: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href ? `${site.url}${item.href === "/" ? "" : item.href}` : undefined,
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          {all.map((item, i) => (
            <li key={`${item.name}-${i}`} className="flex items-center gap-2">
              {i > 0 ? <span aria-hidden>/</span> : null}
              {item.href && i < all.length - 1 ? (
                <Link href={item.href} className="hover:text-ink">
                  {item.name}
                </Link>
              ) : (
                <span className="text-ink">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
