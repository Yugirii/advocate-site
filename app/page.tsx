import Image from "next/image";
import Link from "next/link";
import { Holtwood_One_SC } from "next/font/google";

const holtwood = Holtwood_One_SC({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative h-165 w-full overflow-hidden">
        <Image
          src="/Images/landingpageIMG1.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-white">
          <div className="w-full max-w-2xl">
            <h1
              className={`${holtwood.className} text-2xl uppercase tracking-[0.1em] text-amber-500 sm:text-3xl md:text-4xl`}
            >
              Travel leisurely, explore endlessly
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-6 text-white/90 sm:text-base font-['SF_Pro_Display','SF_Pro_Text','SF_Pro',-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
              Discover handpicked destinations, curated tours, and seamless
              travel planning tailored to your next adventure.
            </p>
          </div>
        </div>
      </section>
      <section className="group w-full bg-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md">
            <Image
              src="/Images/advoquickfixAffiliate.jpg"
              alt="Advoquickfix affiliate team"
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <h2
              className={`${holtwood.className} text-2xl uppercase tracking-[0.06em] text-[#50A7A4] sm:text-3xl`}
            >
              Be an Advoquickfix Affiliate
            </h2>
            <p className="max-w-xl text-sm leading-6 text-[#3b3b3b] sm:text-base">
              Start your travel business with a trusted one-stop partner. Get
              access to tools, training, and support to grow with confidence.
            </p>
            <Link
              href="/services"
              className={`${holtwood.className} inline-flex items-center gap-2 rounded-md bg-[#D89B2E] px-5 py-2 text-sm uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#c4861f]`}
            >
              Explore <span aria-hidden="true">&gt;</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="group w-full bg-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-0 md:grid-cols-[1fr_1.1fr]">
          <div className="order-2 flex flex-col items-start gap-4 md:order-1">
            <h2
              className={`${holtwood.className} text-2xl uppercase tracking-[0.06em] text-[#50A7A4] sm:text-3xl`}
            >
              Tourist Visa Assistance
            </h2>
            <p className="max-w-xl text-sm leading-6 text-[#3b3b3b] sm:text-base">
              Get step-by-step guidance for your visa requirements with a team
              that makes the process clear, efficient, and stress-free.
            </p>
            <Link
              href="/services"
              className={`${holtwood.className} inline-flex items-center gap-2 rounded-md bg-[#D89B2E] px-5 py-2 text-sm uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#c4861f]`}
            >
              Explore <span aria-hidden="true">&gt;</span>
            </Link>
          </div>
          <div className="order-1 relative aspect-[16/9] w-full overflow-hidden rounded-md md:order-2">
            <Image
              src="/Images/visaassistance.jpg"
              alt="Tourist visa assistance"
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>
      <section className="group w-full bg-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[1.1fr_1fr]">
          <div className="relative w-full overflow-hidden rounded-md">
            <Image
              src="/Images/tourpackageLandingPage.jpg"
              alt="Advoquickfix affiliate team"
              width={900}
              height={550}
              className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <h2
              className={`${holtwood.className} text-2xl uppercase tracking-[0.06em] text-[#50A7A4] sm:text-3xl`}
            >
              where to next?
            </h2>
            <p className="max-w-xl text-sm leading-6 text-[#3b3b3b] sm:text-base">
              Explore travel destinations tailored to provide you with unforgettable experiences, whether you seek vibrant cities, serene beaches, or cultural treasures.
            </p>
            <Link
              href="/services"
              className={`${holtwood.className} inline-flex items-center gap-2 rounded-md bg-[#D89B2E] px-5 py-2 text-sm uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#c4861f]`}
            >
              Explore <span aria-hidden="true">&gt;</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="group w-full bg-white">
        <div className="mx-auto w-full max-w-9xl px-6 py-10">
          <div className="relative min-h-[85vh] overflow-hidden rounded-xl bg-[url('/Images/companyProfile.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]">
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative flex w-full max-w-4xl flex-col items-start gap-4 px-15 py-60 pl-50 text-left text-white">
          <h2
            className={`${holtwood.className} text-3xl uppercase tracking-[0.08em] text-amber-500 sm:text-4xl md:text-5xl`}
          >
            Advocate Tours and Travels Inc.
          </h2>
          <p className="max-w-xl text-sm leading-6 text-white/90 sm:text-base">
            Learn about our mission, our people, and how we help travelers and
            travel entrepreneurs grow with confidence.
          </p>
          <Link
            href="/about"
            className={`${holtwood.className} inline-flex items-center gap-2 rounded-md bg-[#D89B2E] px-5 py-2 text-sm uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#c4861f]`}
          >
            Read More <span aria-hidden="true">&gt;</span>
          </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
