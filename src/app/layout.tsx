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
    default: site.seoTitle,
    template: `%s · ${site.name}`,
  },
  description: site.seoDescription,
  applicationName: site.name,
  keywords: [
    "private jet charter",
    "private jet charter USA",
    "request a private quote",
    "empty legs",
    "FBO limo",
    "USA private aviation",
    "Part 135",
    "Jet Aeris Inc",
    "Queens NY private jet",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.legalName,
    title: site.seoTitle,
    description: site.seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seoTitle,
    description: site.seoDescription,
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
        url: `${site.url}/contact`,
        ...(site.phoneDisplay ? { telephone: site.phoneDisplay } : {}),
        areaServed: "US",
        availableLanguage: ["English"],
        hoursAvailable: "Mo-Su 08:00-22:00",
      },
    ],
  };

  /** LocalBusiness for NAP / local SEO tools — phone omitted until a real line exists. */
  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#localbusiness`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    image: `${site.url}/media/cabin-window-uhd.jpg`,
    email: site.email,
    ...(site.phoneDisplay ? { telephone: site.phoneDisplay } : {}),
    description: site.seoDescription,
    priceRange: "$$$$",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
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
