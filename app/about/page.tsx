import Image from "next/image";
import { Holtwood_One_SC } from "next/font/google";
import styles from "./page.module.css";

const holtwood = Holtwood_One_SC({
  subsets: ["latin"],
  weight: "400",
});

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <Image
          src="/Images/aboutus.jpg"
          alt="Advocate team and travel consultation"
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div className={styles.heroInner}>
            <h1 className={`${holtwood.className} ${styles.heading} ${styles.heroHeading}`}>
              Affordable Journeys,
              <span className={styles.heroTitleBreak}>
                Quality Experiences.
              </span>
            </h1>
            <p className={`${styles.bodyTexts} ${styles.heroBodyTexts}`}>
              We provide individualized travel solutions, competitive pricing,
              and end-to-end support, from planning and documentation to
              ticketing and post-trip assistance, all under the direction of
              our dedication to service excellence.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <h2 className={`${holtwood.className} ${styles.heading} ${styles.sectionHeading}`}>
            About Us
          </h2>
          <p className={`${styles.bodyTexts} ${styles.sectionBodyTexts}`}>
            Established in 2019, Advocate Tours and Travel Incorporated is a
            duly registered and accredited travel agency located in Pasig City,
            Philippines. Its mission is to empower aspiring and start-up travel
            agents to successfully build and grow their own travel businesses
            through Advo Quickfix, a one-stop partner for all travel business
            needs, while also offering dependable, convenient, and high-quality
            travel services to direct clients such as solo-travellers,
            families, corporate, pilgrimage and leisure groups.
          </p>

          <div className={styles.affiliationGrid}>
            <div className={styles.affiliationMedia}>
              <Image
                src="/Images/aboutuspage.jpg"
                alt="Advocate team in a tourism training and affiliation event"
                width={980}
                height={620}
                className={styles.affiliationImage}
              />
            </div>

            <div className={styles.affiliationTextCol}>
              <h3 className={styles.subheading}>
                Tourism Association Affiliation
              </h3>
              <p className={`${styles.bodyTexts} ${styles.affiliationBodyTexts}`}>
                Our integrity, professionalism, and commitment to industry
                standards are demonstrated by our accreditation by the
                Department of Tourism (DOT) and our pride in being members of
                reputable travel associations like PATA, PHILTOA, PTAA, and TPB
                Philippines.
              </p>
            </div>
          </div>

          <div className={styles.goalsGrid}>
            <div className={styles.goalsTextCol}>
              <h3 className={styles.subheading}>Our Goals</h3>

              <div className={styles.goalBlock}>
                <h4 className={`${holtwood.className} ${styles.heading} ${styles.goalHeading}`}>
                  To provide trustworthy, open, and customer-focused travel
                  services
                </h4>
                <p className={`${styles.bodyTexts} ${styles.goalBodyTexts}`}>
                  We are committed to delivering transparent, reliable, and customer-centered travel solutions, 
                  ensuring that every client receives honest guidance, competitive pricing, 
                  and personalized support from planning to post-trip assistance.
                </p>
              </div>

              <div className={styles.goalBlock}>
                <h4 className={`${holtwood.className} ${styles.heading} ${styles.goalHeading}`}>
                  To make travel experiences smooth and unforgettable
                </h4>
                <p className={`${styles.bodyTexts} ${styles.goalBodyTexts}`}>
                  We strive to create seamless and memorable journeys by handling every detail with care — 
                  from documentation and ticketing to on-ground coordination — 
                  so our clients can travel with confidence and peace of mind.
                </p>
              </div>

              <div className={styles.goalBlock}>
                <h4 className={`${holtwood.className} ${styles.heading} ${styles.goalHeading}`}>
                  To encourage and enable up-and-coming travel business owners
                </h4>
                <p className={`${styles.bodyTexts} ${styles.goalBodyTexts}`}>
                  Through Advo Quickfix, we empower aspiring and start-up travel 
                  entrepreneurs by providing comprehensive support, industry expertise, 
                  and reliable partnerships that help them build, grow, and sustain 
                  successful travel businesses.
                </p>
              </div>
            </div>

            <div className={styles.goalsMedia}>
              <Image
                src="/Images/aboutuspage2.jpg"
                alt="Advocate team training session"
                width={980}
                height={860}
                className={styles.goalsImage}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
