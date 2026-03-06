import Image from "next/image";
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
  params: Promise<{
    slug: string;
  }>;
};

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const pageData = destinationPages[slug];

  if (!pageData) {
    notFound();
  }

  if (slug === "international") {
    return (
      <main className="min-h-screen bg-[var(--background)] pt-[4.5rem] font-[var(--font-body)] text-black sm:pt-[5.5rem]">
        <section className="w-full">
          <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-14 max-md:px-4 max-md:py-10">
            <h1
              className={`${holtwood.className} text-3xl uppercase leading-[1.08] tracking-[0.04em] text-[#d89b2e] sm:text-4xl md:text-[3.25rem] max-md:text-2xl`}
            >
              International Countries
            </h1>

            <p className="mt-4 max-w-5xl text-base leading-7 text-[#1f1f1f]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut velit
              orci, consectetur id nulla et, condimentum lacinia lacus. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos.
            </p>

            <h2
              className={`${holtwood.className} mt-10 text-2xl uppercase leading-[1.1] tracking-[0.03em] text-[#50a7a4] sm:text-3xl`}
            >
              Long Haul
            </h2>

            <div className="mt-4 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="w-full">
                <h3 className="mb-2 text-xl font-semibold leading-tight text-black">
                  Africa
                </h3>

                <article className="group overflow-hidden rounded-[4px] border border-[#cfcfcf] bg-white">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src="/Images/africa.jpg"
                      alt="Africa tour package"
                      fill
                      className="object-cover"
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex min-h-[3.7rem] translate-y-2 items-center justify-center bg-white/95 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <Link
                        href="/services"
                        className="pointer-events-auto text-xl font-semibold leading-none text-[#50a7a4] transition-colors duration-200 hover:text-[#E39727]"
                      >
                        Inquire
                      </Link>
                    </div>
                  </div>
                </article>
              </div>

              <div className="w-full">
                <h3 className="mb-2 text-xl font-semibold leading-tight text-black">
                  America
                </h3>

                <article className="group overflow-hidden rounded-[4px] border border-[#cfcfcf] bg-white">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src="/Images/america.jpg"
                      alt="America tour package"
                      fill
                      className="object-cover"
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex min-h-[3.7rem] translate-y-2 items-center justify-center bg-white/95 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <Link
                        href="/services"
                        className="pointer-events-auto text-xl font-semibold leading-none text-[#50a7a4] transition-colors duration-200 hover:text-[#E39727]"
                      >
                        Inquire
                      </Link>
                    </div>
                  </div>
                </article>
              </div>

              <div className="w-full">
                <h3 className="mb-2 text-xl font-semibold leading-tight text-black">
                  Europe
                </h3>

                <article className="group overflow-hidden rounded-[4px] border border-[#cfcfcf] bg-white">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src="/Images/europe.jpg"
                      alt="Europe tour package"
                      fill
                      className="object-cover"
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex min-h-[3.7rem] translate-y-2 items-center justify-center bg-white/95 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <Link
                        href="/services"
                        className="pointer-events-auto text-xl font-semibold leading-none text-[#50a7a4] transition-colors duration-200 hover:text-[#E39727]"
                      >
                        Inquire
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <h2
              className={`${holtwood.className} mt-12 text-2xl uppercase leading-[1.1] tracking-[0.03em] text-[#50a7a4] sm:text-3xl`}
            >
              Short Haul
            </h2>

            <div className="mt-4 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="w-full">
                <h3 className="mb-2 text-xl font-semibold leading-tight text-black">
                  Japan
                </h3>

                <article className="group overflow-hidden rounded-[4px] border border-[#cfcfcf] bg-white">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src="/Images/japan.jpg"
                      alt="Japan tour package"
                      fill
                      className="object-cover"
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex min-h-[3.7rem] translate-y-2 items-center justify-center bg-white/95 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <Link
                        href="/services"
                        className="pointer-events-auto text-xl font-semibold leading-none text-[#50a7a4] transition-colors duration-200 hover:text-[#E39727]"
                      >
                        Inquire
                      </Link>
                    </div>
                  </div>
                </article>
              </div>

              <div className="w-full">
                <h3 className="mb-2 text-xl font-semibold leading-tight text-black">
                  Korea
                </h3>

                <article className="group overflow-hidden rounded-[4px] border border-[#cfcfcf] bg-white">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src="/Images/korea.jpg"
                      alt="Korea tour package"
                      fill
                      className="object-cover"
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex min-h-[3.7rem] translate-y-2 items-center justify-center bg-white/95 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <Link
                        href="/services"
                        className="pointer-events-auto text-xl font-semibold leading-none text-[#50a7a4] transition-colors duration-200 hover:text-[#E39727]"
                      >
                        Inquire
                      </Link>
                    </div>
                  </div>
                </article>
              </div>

              <div className="w-full">
                <h3 className="mb-2 text-xl font-semibold leading-tight text-black">
                  Taiwan
                </h3>

                <article className="group overflow-hidden rounded-[4px] border border-[#cfcfcf] bg-white">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src="/Images/taiwan.jpg"
                      alt="Taiwan tour package"
                      fill
                      className="object-cover"
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex min-h-[3.7rem] translate-y-2 items-center justify-center bg-white/95 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <Link
                        href="/services"
                        className="pointer-events-auto text-xl font-semibold leading-none text-[#50a7a4] transition-colors duration-200 hover:text-[#E39727]"
                      >
                        Inquire
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            </div>
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
          className={`${holtwood.className} text-3xl uppercase leading-[1.1] tracking-[0.03em] text-[#50a7a4] sm:text-4xl`}
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
