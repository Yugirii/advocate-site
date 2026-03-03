import Link from "next/link";
import { notFound } from "next/navigation";
import { Holtwood_One_SC } from "next/font/google";

const holtwood = Holtwood_One_SC({
  subsets: ["latin"],
  weight: "400",
});

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

type DestinationSlug = keyof typeof destinationPages;

export function generateStaticParams() {
  return (Object.keys(destinationPages) as DestinationSlug[]).map((slug) => ({ slug }));
}

type DestinationPageProps = {
  params: {
    slug: string;
  };
};

export default function DestinationDetailPage({ params }: DestinationPageProps) {
  const pageData = destinationPages[params.slug as DestinationSlug];

  if (!pageData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#ececec] px-6 py-20 text-black sm:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-[#50a7a4]">
          Destination
        </p>

        <h1
          className={`${holtwood.className} text-3xl uppercase leading-[1.1] tracking-[0.03em] text-[#50a7a4] sm:text-4xl`}
        >
          {pageData.title}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8">{pageData.description}</p>

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
