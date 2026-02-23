import Image from "next/image";
import { Holtwood_One_SC } from "next/font/google";
import styles from "./page.module.css";

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
    <main className={styles.main}>
      <section className={styles.hero}>
        <Image
          src="/Images/visaassistance2.jpg"
          alt="Visa assistance services"
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div className={styles.heroInner}>
            <h1 className={`${holtwood.className} ${styles.heading} ${styles.heroHeading}`}>
              Explore Our Offerings
            </h1>
            <p className={`${styles.bodyTexts} ${styles.heroBodyTexts}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut velit
              orci, consectetur id nulla et, condimentum lacinia lacus. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.affiliateSection}>
        <div className={styles.affiliateContainer}>
          <h2 className={`${holtwood.className} ${styles.heading} ${styles.sectionHeading}`}>
            Be an Advoquickfix Affiliate
          </h2>

          <p className={`${styles.bodyTexts} ${styles.sectionBodyTexts}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut velit
            orci, consectetur id nulla et, condimentum lacinia lacus. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos.
          </p>

          <div className={styles.benefitGrid}>
            {affiliateBenefits.map((benefit) => (
              <article key={benefit} className={styles.benefitItem}>
                <Image
                  src="/Images/checkMark.png"
                  alt=""
                  aria-hidden="true"
                  width={44}
                  height={44}
                  className={styles.benefitIcon}
                />
                <p className={styles.subheading}>{benefit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.bookingSection}>
        <div className={styles.bookingContainer}>
          <div className={styles.bookingLayout}>
            <div className={styles.bookingTextCol}>
              <h2 className={`${holtwood.className} ${styles.heading} ${styles.bookingHeading}`}>
                Get Access to a Travel
                <span className={styles.bookingHeadingBreak}>Booking Portal</span>
              </h2>

              <p className={`${styles.bodyTexts} ${styles.bookingBodyTexts}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut velit
                orci, consectetur id nulla et, condimentum lacinia lacus. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos.
              </p>
            </div>

            <div className={styles.bookingMedia}>
              <Image
                src="/Images/bookingportal.png"
                alt="Travel booking portal flight search interface"
                width={697}
                height={465}
                className={styles.bookingImage}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.visaSection}>
        <div className={styles.visaContainer}>
          <h2 className={`${holtwood.className} ${styles.heading} ${styles.visaHeading}`}>
            Tourist Visa Assistance
          </h2>

          <p className={`${styles.bodyTexts} ${styles.visaIntroBodyTexts}`}>
            Our Tourist Visa Assistance Services offer professional guidance and
            a smooth, hassle-free visa application experience. With our
            knowledge and expertise, we aim to support you in giving you a
            stress-free trip from preparation to departure.
          </p>

          <div className={styles.visaCardsGrid}>
            <article className={styles.visaCard}>
              <h3 className={`${holtwood.className} ${styles.subheading} ${styles.visaCardSubheading}`}>
                Why Choose Us?
              </h3>

              <ul className={styles.visaReasonList}>
                {visaReasons.map((reason) => (
                  <li key={reason} className={styles.visaReasonItem}>
                    <Image
                      src="/Images/pin.png"
                      alt=""
                      aria-hidden="true"
                      width={24}
                      height={24}
                      className={styles.pinIcon}
                    />
                    <span className={`${styles.bodyTexts} ${styles.visaReasonBodyTexts}`}>{reason}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className={styles.visaCard}>
              <h3 className={`${holtwood.className} ${styles.subheading} ${styles.visaCardSubheading}`}>
                Top Visa Destinations Available
              </h3>

              <div className={styles.visaDestinationColumns}>
                {visaDestinationColumns.map((column, columnIndex) => (
                  <ul
                    key={`visa-column-${columnIndex + 1}`}
                    className={styles.visaDestinationList}
                  >
                    {column.map((destination) => (
                      <li
                        key={`${columnIndex + 1}-${destination.label}`}
                        className={styles.visaDestinationItem}
                      >
                        {destination.withCheck ? (
                          <Image
                            src="/Images/checkMarkVisa.png"
                            alt=""
                            aria-hidden="true"
                            width={22}
                            height={22}
                            className={styles.checkVisaIcon}
                          />
                        ) : (
                          <span className={styles.checkVisaIconSpacer} aria-hidden="true" />
                        )}
                        <span className={`${styles.bodyTexts} ${styles.visaDestinationBodyTexts}`}>
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

      <section className={styles.inquirySection}>
        <div className={styles.inquiryContainer}>
          <div className={styles.inquiryLayout}>
            <aside className={styles.inquiryInfoCol}>
              <h3 className={`${holtwood.className} ${styles.heading} ${styles.inquiryHeading}`}>
                For Inquiries
              </h3>

              <div className={styles.inquiryInfoList}>
                <p className={`${styles.bodyTexts} ${styles.inquiryInfoItem}`}>
                  <Image
                    src="/Images/emailIcon.png"
                    alt=""
                    aria-hidden="true"
                    width={24}
                    height={24}
                    className={styles.inquiryInfoIcon}
                  />
                  advocatetoursandtravel@gmail.com
                </p>

                <p className={`${styles.bodyTexts} ${styles.inquiryInfoItem}`}>
                  <Image
                    src="/Images/phoneIcon.png"
                    alt=""
                    aria-hidden="true"
                    width={24}
                    height={24}
                    className={styles.inquiryInfoIcon}
                  />
                  +63 905 845 4125
                </p>
              </div>
            </aside>

            <div className={styles.inquiryFormCol}>
              <div className={styles.inquiryFormShell}>
                <div className={styles.inquiryFormRow}>
                  <input
                    type="text"
                    placeholder="Name"
                    className={styles.inquiryField}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className={styles.inquiryField}
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className={styles.inquiryField}
                  />
                </div>

                <textarea
                  placeholder="Message"
                  className={styles.inquiryMessageField}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
