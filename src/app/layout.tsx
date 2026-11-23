import type { Metadata } from "next";
import { Figtree, Newsreader, Syne } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    description: site.description,
    areaServed: "US",
  };

  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${sans.variable} h-full`}
    >
      <body className="site-shell antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
