import Link from "next/link";
import { notFound } from "next/navigation";
import DestinationInquirySections from "./DestinationInquirySections";

const destinationPages = {
  international: {
    title: "International Destinations",
    description:
      "Explore curated international travel packages with guided support from planning to departure.",
  },
  domestic: {
    title: "Domestic Destinations",
    description:
      "Discover top local getaways and hassle-free domestic travel options designed for every traveler.",
  },
  cruise: {
    title: "Cruise",
    description:
      "Enjoy premium cruise experiences with complete booking assistance and itinerary support.",
  },
} as const;

const longHaulDestinations = [
  { name: "Africa", image: "africa.jpg" },
  { name: "America", image: "america.jpg" },
  { name: "Europe", image: "europe.jpg" },
  { name: "Brazil", image: "brazil.jpg" },
  { name: "Australia", image: "australia.jpg" },
  { name: "Canada", image: "canada.jpg" },
  { name: "Central Asia", image: "centralAsia.jpg" },
  { name: "Egypt", image: "egypt.jpg" },
  { name: "Dubai", image: "dubai.jpg" },
  { name: "Morocco", image: "morocco.jpg" },
  { name: "Saudi", image: "saudi.jpg" },
  { name: "New Zealand", image: "newzealand.jpg" },
  { name: "Spain", image: "spain.jpg" },
  { name: "Turkiye", image: "turkiye.jpg" },
] as const;

const shortHaulDestinations = [
  { name: "Japan", image: "japan.jpg" },
  { name: "South Korea", image: "korea.jpg" },
  { name: "Taiwan", image: "taiwan.jpg" },
  { name: "Singapore", image: "singapore.jpg" },
  { name: "Thailand", image: "thailand.jpg" },
  { name: "Hong Kong", image: "hongkong.jpg" },
  { name: "Vietnam", image: "vietnam.jpg" },
  { name: "Indonesia", image: "indonesia.jpg" },
  { name: "China", image: "china2.jpg" },
] as const;

const internationalFeaturedPackages = [
  {
    name: "Memorable Japan",
    image: "JAPAN (Memorable Japan_Tokyo-Osaka via JAL) 2026 - copy.jpg",
  },
  {
    name: "Vietnam Rose 2.0",
    image: "VIETNAM (Vietnam Rose 2.0) 2026-2027 - copy.jpg",
  },
  {
    name: "Tales of Arctic 2026",
    image: "EUROPE (Tales of Arctic) 2026 - copy.jpg",
  },
] as const;

const domesticFeaturedPackages = [
  {
    name: "Go Batanes 2026",
    image: "BATANES (Go Batanes) 2026 - copy.jpg",
  },
  {
    name: "Go Boracay 2026",
    image: "BORACAY (Go Boracay) 2026 - copy.jpg",
  },
] as const;

const cruiseFeaturedPackages = [
  {
    name: "Disney Fly & Cruise 2026",
    image: "FLY & CRUISE (Disney Adventure) 2026 - copy.jpg",
  },
] as const;

const domesticDestinations = [
  { name: "Batanes", image: "batanes2.jpg" },
  { name: "El Nido", image: "elnido2.jpg" },
  { name: "Iloilo", image: "iloilo2.jpg" },
  { name: "Boracay", image: "boracay.jpg" },
  { name: "Siargao", image: "siargao.jpg" },
] as const;

const cruiseDestinations = [
  { name: "Cruise", image: "cruise.jpg" },
  { name: "Fly & Cruise", image: "cruisebreakfast.jpg" },
] as const;

type DestinationSlug = keyof typeof destinationPages;

function isDestinationSlug(value: string): value is DestinationSlug {
  return value in destinationPages;
}

export function generateStaticParams() {
  return (Object.keys(destinationPages) as DestinationSlug[]).map((slug) => ({ slug }));
}

type DestinationPageProps = {
  params: Promise<{
    slug: string;
  }>;
}; 

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params;

  if (!isDestinationSlug(slug)) {
    notFound();
  }

  const pageData = destinationPages[slug];

  if (slug === "international") {
    return (
      <main className="min-h-screen bg-[var(--background)] pt-[4.5rem] font-[var(--font-body)] text-black sm:pt-[5.5rem]">
        <section className="w-full">
          <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-14 max-md:px-4 max-md:py-10">
            <h1
              className={`font-display text-3xl uppercase leading-[1.08] tracking-[0.04em] text-[#d89b2e] sm:text-4xl md:text-[3.25rem] max-md:text-2xl`}
            >
              International Countries
            </h1>

            <p className="mt-4 max-w-5xl text-base leading-7 text-[#1f1f1f]">
              Explore our international destinations, offering a wide range of experiences for every traveler. 
              From vibrant cities to serene landscapes, our curated selection ensures unforgettable journeys worldwide.
            </p>

            <DestinationInquirySections
              headingFontClass="font-display"
              featuredDestinations={internationalFeaturedPackages}
              longHaulDestinations={longHaulDestinations}
              shortHaulDestinations={shortHaulDestinations}
            />
          </div>
        </section>
      </main>
    );
  }

  if (slug === "domestic") {
    return (
      <main className="min-h-screen bg-[var(--background)] pt-[4.5rem] font-[var(--font-body)] text-black sm:pt-[5.5rem]">
        <section className="w-full">
          <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-14 max-md:px-4 max-md:py-10">
            <h1
              className={`font-display text-3xl uppercase leading-[1.08] tracking-[0.04em] text-[#d89b2e] sm:text-4xl md:text-[3.25rem] max-md:text-2xl`}
            >
              Domestic Destinations
            </h1>

            <p className="mt-4 max-w-5xl text-base leading-7 text-[#1f1f1f]">
              Discover the beauty of our domestic destinations, offering a diverse range of experiences across the country.
              Explore stunning beaches and breathtaking landscapes as our curated selection ensures unforgettable journeys within our borders.
            </p>

            <DestinationInquirySections
              headingFontClass="font-display"
              featuredDestinations={domesticFeaturedPackages}
              longHaulDestinations={domesticDestinations}
              longHaulTitle={null}
            />
          </div>
        </section>
      </main>
    );
  }

  if (slug === "cruise") {
    return (
      <main className="min-h-screen bg-[var(--background)] pt-[4.5rem] font-[var(--font-body)] text-black sm:pt-[5.5rem]">
        <section className="w-full">
          <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-14 max-md:px-4 max-md:py-10">
            <h1
              className={`font-display text-3xl uppercase leading-[1.08] tracking-[0.04em] text-[#d89b2e] sm:text-4xl md:text-[3.25rem] max-md:text-2xl`}
            >
              Cruise Destinations
            </h1>

            <p className="mt-4 max-w-5xl text-base leading-7 text-[#1f1f1f]">
              Experience the world of cruise travel with our curated cruise destinations.
              From luxurious ocean voyages to scenic river cruises, our selection offers unforgettable journeys on the water, with expert guidance and support for every traveler.
            </p>

            <DestinationInquirySections
              headingFontClass="font-display"
              featuredDestinations={cruiseFeaturedPackages}
              longHaulDestinations={cruiseDestinations}
              longHaulTitle={null}
            />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-20 pt-[4.5rem] text-black sm:px-8 sm:pt-[5.5rem]">
      <div className="mx-auto w-full max-w-4xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-[#50a7a4]">
          Destination
        </p>

        <h1
          className={`font-display text-3xl uppercase leading-[1.1] tracking-[0.03em] text-[#50a7a4] sm:text-4xl`}
        >
          {pageData.title}
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-7">{pageData.description}</p>

        <Link
          href="/destinations"
          className="mt-10 inline-block text-base font-semibold text-black transition-colors duration-200 hover:text-[#E39727]"
        >
          Back to Destinations
        </Link>
      </div>
    </main>
  );
}
