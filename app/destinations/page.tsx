"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Holtwood_One_SC } from "next/font/google";
import styles from "./page.module.css";

const holtwood = Holtwood_One_SC({
  subsets: ["latin"],
  weight: "400",
});

const destinationSlides = [
  {
    id: "international",
    title: "international",
    foreground: "/Images/tourpackageInternational.jpg",
    background: "/Images/tourpackageInternationalbackground.jpg",
    foregroundAlt: "International destination package preview",
    backgroundAlt: "International destination background",
  },
  {
    id: "domestic",
    title: "domestic",
    foreground: "/Images/tourpackagedomestic.jpg",
    background: "/Images/tourpackagedomesticbackground.jpg",
    foregroundAlt: "Domestic destination package preview",
    backgroundAlt: "Domestic destination background",
  },
  {
    id: "cruise",
    title: "cruise",
    foreground: "/Images/tourpackagecruise.jpg",
    background: "/Images/tourpackagecruisebackground.jpg",
    foregroundAlt: "Cruise destination package preview",
    backgroundAlt: "Cruise destination background",
  },
] as const;

export default function DestinationsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [isSliding, setIsSliding] = useState(false);
  const totalSlides = destinationSlides.length;

  const activeSlide = destinationSlides[activeIndex];
  const leftIndex = (activeIndex - 1 + totalSlides) % totalSlides;
  const rightIndex = (activeIndex + 1) % totalSlides;
  const leftSlide = destinationSlides[leftIndex];
  const rightSlide = destinationSlides[rightIndex];

  useEffect(() => {
    if (!isSliding) return;

    const timeout = window.setTimeout(() => {
      setIsSliding(false);
    }, 320);

    return () => window.clearTimeout(timeout);
  }, [isSliding]);

  const moveToSlide = (nextIndex: number, direction: "left" | "right") => {
    setSlideDirection(direction);
    setActiveIndex(nextIndex);
    setIsSliding(true);
  };

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <Image
          key={activeSlide.background}
          src={activeSlide.background}
          alt={activeSlide.backgroundAlt}
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div className={styles.heroInner}>
            <div className={styles.heroTextBlock}>
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

            <div
              className={`${styles.carouselRow} ${
                isSliding
                  ? slideDirection === "right"
                    ? styles.slideRight
                    : styles.slideLeft
                  : ""
              }`}
            >
              <button
                type="button"
                className={`${styles.destinationCard} ${styles.sideCard}`}
                aria-label={`Show ${leftSlide.title} destinations`}
                onClick={() => moveToSlide(leftIndex, "left")}
              >
                <Image
                  src={leftSlide.foreground}
                  alt={leftSlide.foregroundAlt}
                  fill
                  className={styles.cardImage}
                />
              </button>

              <button
                type="button"
                className={`${styles.destinationCard} ${styles.centerCard}`}
                aria-label={`Current: ${activeSlide.title} destinations`}
                aria-current="true"
                onClick={() => setActiveIndex(activeIndex)}
              >
                <Image
                  src={activeSlide.foreground}
                  alt={activeSlide.foregroundAlt}
                  fill
                  className={styles.cardImage}
                />
              </button>

              <button
                type="button"
                className={`${styles.destinationCard} ${styles.sideCard}`}
                aria-label={`Show ${rightSlide.title} destinations`}
                onClick={() => moveToSlide(rightIndex, "right")}
              >
                <Image
                  src={rightSlide.foreground}
                  alt={rightSlide.foregroundAlt}
                  fill
                  className={styles.cardImage}
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
