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
            <h1 className={`${holtwood.className} ${styles.heroTitle}`}>
              Explore Our Offerings
            </h1>
            <p className={styles.heroText}>
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
          <h2 className={`${holtwood.className} ${styles.affiliateTitle}`}>
            Be an Advoquickfix Affiliate
          </h2>

          <p className={styles.affiliateText}>
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
                <p className={styles.benefitText}>{benefit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
