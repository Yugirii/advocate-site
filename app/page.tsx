import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import WebsiteInquiryForm from "../components/client/WebsiteInquiryForm";

export const metadata: Metadata = {
  title: {
    absolute:
      "Advocate Tours and Travel | AdvoQuickfix, Visa Assistance & Travel Services",
  },
  description:
    "Plan your next trip with Advocate Tours and Travel. Explore curated destinations, visa support, and travel services built for smooth journeys.",
  alternates: {
    canonical: "/",
  },
};

const sectionTitleClass =
  "text-2xl uppercase tracking-[0.06em] text-[#50a7a4] sm:text-3xl";
const ctaClass =
  "inline-flex items-center gap-2 rounded-md bg-[#d89b2e] px-5 py-2 text-sm uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#c4861f]";

export default function Home() {
  return (
    <main className="min-h-screen font-[var(--font-body)] text-black">
      <section className={styles.heroSection}>
        <Image
          src="/Images/landingpageIMG1.jpg"
          alt="Hero background"
          fill
          sizes="100vw"
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.heroInner}>
            <h1 className={`font-display text-2xl uppercase tracking-[0.1em] text-amber-500 sm:text-3xl md:text-4xl`}>
              Advocate Tours and Travel Inc.
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-white/90 sm:text-base">
              Discover handpicked destinations, curated tours, and seamless
              travel planning tailored to your next adventure.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-[var(--background)] group">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md">
            <Image
              src="/Images/advocateemployees.jpg"
              alt="Advoquickfix affiliate team"
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className={`${styles.zoomMedia} object-cover object-[50%_12%] max-md:object-[50%_16%]`}
              priority
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <h2 className={`font-display ${sectionTitleClass}`}>
              Be an Advoquickfix Affiliate
            </h2>
            <p className="max-w-xl text-sm leading-6 text-[#3b3b3b] sm:text-base">
              Start your travel business with a trusted one-stop partner. Get
              access to tools, training, and support to grow with confidence.
            </p>
            <Link
              href="/services#be-an-advoquickfix-affiliate"
              className={`font-display ${ctaClass}`}
            >
              Explore <span aria-hidden="true">&gt;</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-[var(--background)] group">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-0 md:grid-cols-[1fr_1.1fr]">
          <div className="order-2 flex flex-col items-start gap-4 md:order-1">
            <h2 className={`font-display ${sectionTitleClass}`}>
              Tourist Visa Assistance
            </h2>
            <p className="max-w-xl text-sm leading-6 text-[#3b3b3b] sm:text-base">
              Get step-by-step guidance for your visa requirements with a team
              that makes the process clear, efficient, and stress-free.
            </p>
            <Link href="/services#tourist-visa-assistance" className={`font-display ${ctaClass}`}>
              Explore <span aria-hidden="true">&gt;</span>
            </Link>
          </div>
          <div className="order-1 relative aspect-[16/9] w-full overflow-hidden rounded-md md:order-2">
            <Image
              src="/Images/visaassistance.jpg"
              alt="Tourist visa assistance"
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className={`${styles.zoomMedia} object-cover`}
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-[var(--background)] group">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[1.1fr_1fr]">
          <div className="relative w-full overflow-hidden rounded-md">
            <Image
              src="/Images/tourpackageLandingPage.jpg"
              alt="Advoquickfix affiliate team"
              width={900}
              height={550}
              className={`${styles.zoomMedia} h-auto w-full object-cover`}
              priority
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <h2 className={`font-display ${sectionTitleClass}`}>
              where to next?
            </h2>
            <p className="max-w-xl text-sm leading-6 text-[#3b3b3b] sm:text-base">
              Explore travel destinations tailored to provide you with
              unforgettable experiences, whether you seek vibrant cities, serene
              beaches, or cultural treasures.
            </p>
            <Link href="/destinations" className={`font-display ${ctaClass}`}>
              Explore <span aria-hidden="true">&gt;</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-[var(--background)] group">
        <div className="mx-auto w-full max-w-[80rem] px-6 py-10">
          <div className={`${styles.profileCard} relative overflow-hidden rounded-xl bg-center bg-cover transition-transform duration-700 group-hover:scale-[1.03]`}>
            <div className={styles.profileOverlay} />
            <div className={styles.profileContent}>
              <h2 className={`font-display text-3xl uppercase tracking-[0.08em] text-amber-500 sm:text-4xl md:text-5xl`}>
                Advocate Tours and Travel Inc.
              </h2>
              <p className="max-w-xl text-sm leading-6 text-white/90 sm:text-base">
                Learn about our mission, our people, and how we help travelers, and travel entrepreneurs grow with confidence.
              </p>
              <Link href="/about" className={`font-display ${ctaClass}`}>
                Read More <span aria-hidden="true">&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="w-full bg-[var(--background)]">
        <div className="mx-auto w-full max-w-[80rem] px-6 py-16">
          <div className="grid grid-cols-1 items-start gap-10 min-[1100px]:grid-cols-[0.9fr_2fr] min-[1100px]:gap-16">
            <aside className="order-2 pt-2 min-[1100px]:order-1">
              <h3 className={`font-display text-3xl uppercase tracking-[0.06em] text-[#50a7a4]`}>
                For Inquiries
              </h3>
              <div className="mt-5 flex flex-col gap-4">
                <p className="flex items-center gap-3 text-lg text-[#2d2d2d]">
                  <Image
                    src="/Images/emailIcon.png"
                    alt=""
                    aria-hidden="true"
                    width={26}
                    height={26}
                    className="h-6 w-6 flex-shrink-0 object-contain"
                  />
                  advocatetoursandtravel@gmail.com
                </p>
                <p className="flex items-center gap-3 text-lg text-[#2d2d2d]">
                  <Image
                    src="/Images/phoneIcon.png"
                    alt=""
                    aria-hidden="true"
                    width={26}
                    height={26}
                    className="h-6 w-6 flex-shrink-0 object-contain"
                  />
                  +63 905 845 4125
                </p>
              </div>
            </aside>

            <div className="order-1 w-full min-[1100px]:order-2">
              <h3 className={`font-display text-3xl uppercase tracking-[0.06em] text-[#50a7a4]`}>
                We&apos;re Here to Help
              </h3>
              <p className="max-w-xl text-sm leading-6 text-[#3b3b3b] sm:text-base">
                Kindly message us so we can assist in your travel needs
              </p>

              <div className="mt-5">
                <WebsiteInquiryForm className="rounded-md border border-[#8ccfcf] p-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[var(--background)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 text-center">
          <h2 className="text-3xl font-semibold leading-tight text-black sm:text-4xl">
            Advocate Tours and Travel Incorporated
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-base leading-7 text-[#2d2d2d]">
            Duly licensed by the Department of Tourism (DOT), we are a proud member of 
            PATA, PTAA, PHILTOA, TPB Philippines, NAITAS, and NITAS. We are committed to 
            providing exceptional travel services and fostering strong partnerships within 
            the travel industry.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-7">
            <Image
              src="/Images/DOTsealed.png"
              alt="Department of Tourism"
              width={73}
              height={72}
              className="object-contain"
            />
            <Image
              src="/Images/PATA.png"
              alt="PATA"
              width={91}
              height={72}
              className="object-contain"
            />
            <Image
              src="/Images/PHILTOA.png"
              alt="PHILTOA"
              width={194}
              height={72}
              className="object-contain"
            />
            <Image
              src="/Images/PTAA.jpg"
              alt="PTAA"
              width={72}
              height={72}
              className="object-contain"
            />
            <Image
              src="/Images/TPB.png"
              alt="TPB Philippines"
              width={100}
              height={80}
              className="object-contain"
            />
            <Image
              src="/Images/NAITAS.jpg"
              alt="NAITAS"
              width={186}
              height={80}
              className="object-contain"
            />
            <Image
              src="/Images/NITAS.png"
              alt="NITAS"
              width={73}
              height={80}
              className="object-contain"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
