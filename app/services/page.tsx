import Image from "next/image";
import { Holtwood_One_SC } from "next/font/google";
import styles from "./page.module.css";
import ScrollToHash from "./ScrollToHash";
import WebsiteInquiryForm from "../../components/client/WebsiteInquiryForm";

const holtwood = Holtwood_One_SC({
  subsets: ["latin"],
  weight: "400",
});

const affiliateBenefits = [
  "Earn commissions per successful booking",
  "Enjoy a chance to travel for FREE on incentive trips",
  "Get your own booking portal - easy to manage and ready to use",
  "Be part of a growing travel community",
];

const visaReasons = [
  "Fast and reliable",
  "Proven track record of visa applications with high approval rate",
  "Excellent service and support",
];

const visaDestinationColumns = [
  [
    { label: "Australia", withCheck: true },
    { label: "Japan", withCheck: true },
    { label: "South Korea", withCheck: true },
    { label: "US", withCheck: true },
    { label: "Schengen", withCheck: true },
    { label: "Canada", withCheck: true },
  ],
  [
    { label: "UK", withCheck: true },
    { label: "New Zealand", withCheck: true },
    { label: "China", withCheck: true },
    { label: "Turkiye", withCheck: true },
    { label: "UAE", withCheck: true },
    { label: "and more!", withCheck: false },
  ],
];

export default function ServicesPage() {
  return (
    <main className={`${styles.main} font-[var(--font-body)] text-black`}>
      <ScrollToHash />
      <section className={styles.hero}>
        <Image
          src="/Images/visaassistance2.jpg"
          alt="Visa assistance services"
          fill
          sizes="100vw"
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div className={styles.heroInner}>
            <h1
              className={`${holtwood.className} uppercase text-2xl leading-[0.95] tracking-[0.05em] text-amber-500 sm:text-3xl md:text-4xl`}
            >
              Explore Our Offerings
            </h1>
            <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-white/95 sm:text-base max-md:mt-3">
              We offer a range of services to make your travel experience unforgettable. 
              From personalized travel planning to visa assistance, we are here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-[var(--background)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 sm:py-16 md:py-20 max-md:px-4 max-md:py-10">
          <h2
            className={`${holtwood.className} mx-auto max-w-3xl text-center text-4xl leading-[1.1] tracking-[0.04em] text-[#50a7a4] uppercase sm:text-5xl max-md:text-3xl`}
          >
            Be an Advoquickfix Affiliate
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-7 max-md:mt-4">
            Join our affiliate program and start your own travel business with us. 
            As an Advoquickfix Affiliate, you can earn commissions by promoting our 
            travel services and sharing the benefits of our offerings with your network.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-12 max-md:mt-10 max-md:gap-8">
            {affiliateBenefits.map((benefit) => (
              <article key={benefit} className="flex items-center gap-4">
                <Image
                  src="/Images/checkMark.png"
                  alt=""
                  aria-hidden="true"
                  width={44}
                  height={44}
                  className="h-11 w-11 flex-shrink-0 object-contain"
                />
                <p className="text-base font-semibold leading-7 text-[#121212]">
                  {benefit}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[var(--background)]">
        <div className="mx-auto w-full max-w-6xl px-6 pb-14 sm:px-8 sm:pb-16 md:pb-20 max-md:px-4 max-md:pb-10">
          <div className="grid grid-cols-1 items-center gap-10 min-[980px]:grid-cols-[0.95fr_1.2fr] min-[980px]:gap-10 max-md:gap-6">
            <div className="w-full">
              <h2
                className={`${holtwood.className} uppercase text-3xl leading-[1.1] tracking-[0.05em] text-[#50a7a4] sm:text-4xl max-md:text-2xl [text-decoration-thickness:3px] [text-underline-offset:4px] max-md:[text-decoration-thickness:2px] max-md:[text-underline-offset:3px]`}
              >
                Get Access to a Travel
                <span className="block">Booking Portal</span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 max-md:mt-4">
                As an Advoquickfix Affiliate, you will gain access to our travel booking portal,
                allowing you to easily book and manage your clients&apos; travel arrangements.
                Our user-friendly portal provides access to a wide range of travel options,
                including flights, hotels, and more, making it easy for you to offer comprehensive
                travel solutions to your clients.
              </p>
            </div>

            <div className="ml-auto w-full max-w-[34rem] overflow-hidden rounded-[5px] max-md:mx-auto max-md:max-w-96">
              <Image
                src="/Images/bookingportal.png"
                alt="Travel booking portal flight search interface"
                width={697}
                height={465}
                className="block h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[var(--background)]">
        <div className="mx-auto w-full max-w-6xl px-6 pb-14 sm:px-8 sm:pb-16 md:pb-20 max-md:px-4 max-md:pb-10">
          <h2
            id="tourist-visa-assistance"
            className={`${holtwood.className} scroll-mt-24 uppercase text-center text-4xl leading-[1.1] tracking-[0.04em] text-[#50a7a4] sm:text-5xl max-md:text-3xl`}
          >
            Tourist Visa Assistance
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-7 max-md:mt-4">
            Our Tourist Visa Assistance Services offer professional guidance and
            a smooth, hassle-free visa application experience. With our
            knowledge and expertise, we aim to support you in giving you a
            stress-free trip from preparation to departure.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-7 min-[980px]:grid-cols-2 max-md:mt-8 max-md:gap-5">
            <article className="rounded-md border border-[#d8a65a] bg-transparent p-6 sm:p-8 max-md:p-5">
              <h3
                className={`${holtwood.className} text-3xl font-semibold leading-[1.1] tracking-[0.03em] text-[#50a7a4] max-md:text-2xl`}
              >
                Why Choose Us?
              </h3>

              <ul className="mt-7 space-y-5 max-md:mt-5 max-md:space-y-4">
                {visaReasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-3">
                    <Image
                      src="/Images/pin.png"
                      alt=""
                      aria-hidden="true"
                      width={24}
                      height={24}
                      className="mt-[0.2rem] h-6 w-6 flex-shrink-0 object-contain"
                    />
                    <span className="text-base leading-7">{reason}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-md border border-[#d8a65a] bg-transparent p-6 sm:p-8 max-md:p-5">
              <h3
                className={`${holtwood.className} text-3xl font-semibold leading-[1.1] tracking-[0.03em] text-[#50a7a4] max-md:text-2xl`}
              >
                Top Visa Destinations Available
              </h3>

              <div className="mt-7 grid grid-cols-1 gap-4 min-[980px]:grid-cols-2 min-[980px]:gap-x-10 max-md:mt-5 max-md:gap-3">
                {visaDestinationColumns.map((column, columnIndex) => (
                  <ul
                    key={`visa-column-${columnIndex + 1}`}
                    className="space-y-1"
                  >
                    {column.map((destination) => (
                      <li
                        key={`${columnIndex + 1}-${destination.label}`}
                        className="flex items-start gap-2"
                      >
                        {destination.withCheck ? (
                          <Image
                            src="/Images/checkMarkVisa.png"
                            alt=""
                            aria-hidden="true"
                            width={22}
                            height={22}
                            className="mt-[0.25rem] h-5 w-5 flex-shrink-0 object-contain"
                          />
                        ) : (
                          <span className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                        )}
                        <span className="text-base leading-7">
                          {destination.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="w-full bg-[var(--background)]">
        <div className="mx-auto w-full max-w-6xl px-6 pb-14 sm:px-8 sm:pb-16 md:pb-20 max-md:px-4 max-md:pb-10">
          <div className="grid grid-cols-1 items-start gap-8 min-[980px]:grid-cols-[0.9fr_1.6fr] min-[980px]:gap-10">
            <aside className="w-full">
              <h3
                className={`${holtwood.className} uppercase text-4xl leading-[1.05] tracking-[0.04em] text-[#50a7a4] sm:text-5xl max-md:text-3xl`}
              >
                For Inquiries
              </h3>

              <div className="mt-5 flex flex-col gap-4">
                <p className="flex items-center gap-3 text-base leading-7 text-[#2d2d2d]">
                  <Image
                    src="/Images/emailIcon.png"
                    alt=""
                    aria-hidden="true"
                    width={24}
                    height={24}
                    className="h-6 w-6 flex-shrink-0 object-contain"
                  />
                  advocatetoursandtravel@gmail.com
                </p>

                <p className="flex items-center gap-3 text-base leading-7 text-[#2d2d2d]">
                  <Image
                    src="/Images/phoneIcon.png"
                    alt=""
                    aria-hidden="true"
                    width={24}
                    height={24}
                    className="h-6 w-6 flex-shrink-0 object-contain"
                  />
                  +63 905 845 4125
                </p>
              </div>
            </aside>

            <div className="w-full">
              <WebsiteInquiryForm className="rounded-md border border-[#8ccfcf] p-6 sm:p-8 max-md:p-4" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
