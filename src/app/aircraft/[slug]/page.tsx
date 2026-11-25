import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AircraftCabinExperience } from "@/components/aircraft/AircraftCabinExperience";
import { CtaBand } from "@/components/CtaBand";
import {
  aircraftCabinExperiences,
  getAircraftCabin,
} from "@/lib/aircraft-cabin";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return aircraftCabinExperiences.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getAircraftCabin(slug);
  if (!item) return {};
  return {
    title: `${item.name} cabin & seats | JetAeris`,
    description: `${item.name}: about ${item.typicalSeats} seats (up to ${item.seatMax}). ${item.interiorLead}`,
    alternates: { canonical: `/aircraft/${item.slug}` },
    openGraph: {
      title: `${item.name} — cabin & seating`,
      description: item.interiorLead,
      url: `/aircraft/${item.slug}`,
      images: [{ url: item.cabinSrc }],
    },
  };
}

export default async function AircraftPage({ params }: Props) {
  const { slug } = await params;
  const item = getAircraftCabin(slug);
  if (!item) notFound();

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${item.name} charter class`,
    description: item.summary,
    brand: { "@type": "Brand", name: site.name },
    category: "Private jet charter",
    image: `${site.url}${item.cabinSrc}`,
    url: `${site.url}/aircraft/${item.slug}`,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Typical seats",
        value: String(item.typicalSeats),
      },
      {
        "@type": "PropertyValue",
        name: "Seat range",
        value: item.seats,
      },
      {
        "@type": "PropertyValue",
        name: "Best range",
        value: item.range,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <AircraftCabinExperience cabin={item} />
      <CtaBand />
    </>
  );
}
