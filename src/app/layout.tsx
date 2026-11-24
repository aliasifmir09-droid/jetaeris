import type { Metadata } from "next";
import { Figtree, Newsreader, Syne } from "next/font/google";
import { StickyQuoteBar } from "@/components/StickyQuoteBar";
import { SitePreloader } from "@/components/SitePreloader";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { site } from "@/lib/site";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Private Jet Charter USA`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "private jet charter",
    "empty legs",
    "FBO limo",
    "USA private aviation",
    "Jet Aeris Inc",
    "Queens NY private jet",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.legalName,
    title: `${site.name} · Private Jet Charter USA`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Private Jet Charter USA`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: site.url,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    ...(site.phoneDisplay ? { telephone: site.phoneDisplay } : {}),
    description: site.description,
    areaServed: "US",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: site.email,
        ...(site.phoneDisplay ? { telephone: site.phoneDisplay } : {}),
        areaServed: "US",
        availableLanguage: ["English"],
        hoursAvailable: "Mo-Su 08:00-22:00",
      },
    ],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    publisher: { "@type": "Organization", name: site.legalName },
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/routes?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "USA private jet charter brokerage",
    serviceType: "Air charter brokerage",
    provider: { "@type": "Organization", name: site.legalName },
    areaServed: "US",
    description: site.description,
    url: site.url,
  };

  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${sans.variable} h-full`}
    >
      <body className="site-shell antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
        />
        <MotionRoot>
          <SitePreloader />
          <Header />
          <main className="site-main">{children}</main>
          <Footer />
          <StickyQuoteBar />
        </MotionRoot>
      </body>
    </html>
  );
}
