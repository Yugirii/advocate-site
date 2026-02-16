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
            <h1 className={`${holtwood.className} ${styles.heroTitle}`}>
              Affordable Journeys,
              <span className={styles.heroTitleBreak}>
                Quality Experiences.
              </span>
            </h1>
            <p className={styles.heroText}>
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
          <h2 className={`${holtwood.className} ${styles.sectionTitle}`}>
            About Us
          </h2>
          <p className={styles.sectionLead}>
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
              <h3 className={styles.affiliationTitle}>
                Tourism Association Affiliation
              </h3>
              <p className={styles.affiliationBody}>
                Our integrity, professionalism, and commitment to industry
                standards are demonstrated by our accreditation by the
                Department of Tourism (DOT) and our pride in being members of
                reputable travel associations like PATA, PHILTOA, PTAA, and TPB
                Philippines.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
