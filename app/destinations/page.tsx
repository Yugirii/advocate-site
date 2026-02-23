import Image from "next/image";
import { Holtwood_One_SC } from "next/font/google";
import styles from "./page.module.css";

const holtwood = Holtwood_One_SC({
  subsets: ["latin"],
  weight: "400",
});

export default function DestinationsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <Image
          src="/Images/tourpackageInternationalbackground.jpg"
          alt="International travel destinations background"
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div className={styles.heroInner}>
            <h1 className={`${holtwood.className} ${styles.heading} ${styles.heroHeading}`}>
              Elevate Your Experience
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
    </main>
  );
}
