import Image from "next/image";
import Link from "next/link";
import { Holtwood_One_SC } from "next/font/google";
import styles from "./page.module.css";

const holtwood = Holtwood_One_SC({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <Image
          src="/Images/landingpageIMG1.jpg"
          alt="Hero background"
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.heroInner}>
            <h1
              className={`${holtwood.className} ${styles.heroTitle}`}
            >
              Travel leisurely, explore endlessly
            </h1>
            <p className={styles.heroText}>
              Discover handpicked destinations, curated tours, and seamless
              travel planning tailored to your next adventure.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.contentSection}>
        <div className={styles.sectionGrid}>
          <div className={styles.mediaFrame}>
            <Image
              src="/Images/advoquickfixAffiliate.jpg"
              alt="Advoquickfix affiliate team"
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className={`${styles.zoomMedia} ${styles.zoomImageFill}`}
              priority
            />
          </div>
          <div className={styles.textCol}>
            <h2
              className={`${holtwood.className} ${styles.sectionTitle}`}
            >
              Be an Advoquickfix Affiliate
            </h2>
            <p className={styles.sectionBody}>
              Start your travel business with a trusted one-stop partner. Get
              access to tools, training, and support to grow with confidence.
            </p>
            <Link
              href="/services"
              className={`${holtwood.className} ${styles.ctaButton}`}
            >
              Explore <span aria-hidden="true">&gt;</span>
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.contentSection}>
        <div className={styles.sectionGridAlt}>
          <div className={styles.textColAlt}>
            <h2
              className={`${holtwood.className} ${styles.sectionTitle}`}
            >
              Tourist Visa Assistance
            </h2>
            <p className={styles.sectionBody}>
              Get step-by-step guidance for your visa requirements with a team
              that makes the process clear, efficient, and stress-free.
            </p>
            <Link
              href="/services"
              className={`${holtwood.className} ${styles.ctaButton}`}
            >
              Explore <span aria-hidden="true">&gt;</span>
            </Link>
          </div>
          <div className={styles.mediaFrameAlt}>
            <Image
              src="/Images/visaassistance.jpg"
              alt="Tourist visa assistance"
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className={`${styles.zoomMedia} ${styles.zoomImageFill}`}
            />
          </div>
        </div>
      </section>
      <section className={styles.contentSection}>
        <div className={styles.sectionGrid}>
          <div className={styles.mediaFrameFull}>
            <Image
              src="/Images/tourpackageLandingPage.jpg"
              alt="Advoquickfix affiliate team"
              width={900}
              height={550}
              className={`${styles.zoomMedia} ${styles.zoomImageStatic}`}
              priority
            />
          </div>
          <div className={styles.textCol}>
            <h2
              className={`${holtwood.className} ${styles.sectionTitle}`}
            >
              where to next?
            </h2>
            <p className={styles.sectionBody}>
              Explore travel destinations tailored to provide you with
              unforgettable experiences, whether you seek vibrant cities, serene
              beaches, or cultural treasures.
            </p>
            <Link
              href="/services"
              className={`${holtwood.className} ${styles.ctaButton}`}
            >
              Explore <span aria-hidden="true">&gt;</span>
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.profileSection}>
        <div className={styles.profileContainer}>
          <div className={styles.profileCard}>
            <div className={styles.profileOverlay} />
            <div className={styles.profileContent}>
              <h2 className={`${holtwood.className} ${styles.profileTitle}`}>
                Advocate Tours and Travels Inc.
              </h2>
              <p className={styles.profileBody}>
                Learn about our mission, our people, and how we help travelers
                and travel entrepreneurs grow with confidence.
              </p>
              <Link href="/about" className={`${holtwood.className} ${styles.ctaButton}`}>
                Read More <span aria-hidden="true">&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.contactSection}>
        <div className={styles.contactContainer}>
          <div className={styles.contactLayout}>
            <aside className={styles.inquiryCol}>
              <h3 className={`${holtwood.className} ${styles.inquiryTitle}`}>For Inquiries</h3>
              <div className={styles.inquiryList}>
                <p className={styles.inquiryItem}>
                  <span className={styles.inquiryIcon} aria-hidden="true">
                    @
                  </span>
                  advocatetoursandtravel@gmail.com
                </p>
                <p className={styles.inquiryItem}>
                  <span className={styles.inquiryIcon} aria-hidden="true">
                    Tel
                  </span>
                  +63 905 845 4125
                </p>
              </div>
            </aside>

            <div className={styles.helpCol}>
              <h3 className={`${holtwood.className} ${styles.helpTitle}`}>We&apos;re Here to Help</h3>
              <p className={styles.helpSubtitle}>
                Kindly message us so we can assist in your travel needs
              </p>

              <div className={styles.formShell}>
                <div className={styles.formRow}>
                  <input
                    type="text"
                    placeholder="Name"
                    className={styles.field}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className={styles.field}
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className={styles.field}
                  />
                </div>
                <textarea
                  placeholder="Message"
                  className={styles.messageField}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
