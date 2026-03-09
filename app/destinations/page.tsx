"use client";

import Image from "next/image";
import Link from "next/link";
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
    label: "International Destinations",
    foreground: "/Images/tourpackageInternational.jpg",
    background: "/Images/tourpackageInternationalbackground.jpg",
    foregroundAlt: "International destination package preview",
    backgroundAlt: "International destination background",
    href: "/destinations/international",
  },
  {
    id: "domestic",
    title: "domestic",
    label: "Domestic Destinations",
    foreground: "/Images/tourpackagedomestic.jpg",
    background: "/Images/tourpackagedomesticbackground.jpg",
    foregroundAlt: "Domestic destination package preview",
    backgroundAlt: "Domestic destination background",
    href: "/destinations/domestic",
  },
  {
    id: "cruise",
    title: "cruise",
    label: "Cruise",
    foreground: "/Images/tourpackagecruise.jpg",
    background: "/Images/tourpackagecruisebackground.jpg",
    foregroundAlt: "Cruise destination package preview",
    backgroundAlt: "Cruise destination background",
    href: "/destinations/cruise",
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
    <main className="min-h-screen bg-[var(--background)] font-[var(--font-body)] text-black">
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
            <div className="w-full max-w-[44rem]">
              <h1
                className={`${holtwood.className} text-2xl uppercase leading-[1.05] tracking-[0.1em] text-amber-500 sm:text-3xl md:text-4xl`}
              >
                Elevate Your Experience
              </h1>
              <p className="mt-4 mb-0 max-w-2xl text-sm font-semibold leading-6 text-white/90 sm:text-base">
                Discover remarkable destinations and begin your journey toward unforgettable travel experiences.
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
                <span className={styles.cardMedia}>
                  <Image
                    src={leftSlide.foreground}
                    alt={leftSlide.foregroundAlt}
                    fill
                    className={styles.cardImage}
                  />
                </span>
              </button>

              <div
                className={`${styles.destinationCard} ${styles.centerCard}`}
                aria-label={`Current: ${activeSlide.title} destinations`}
                aria-current="true"
              >
                <span className={styles.cardMedia}>
                  <Image
                    src={activeSlide.foreground}
                    alt={activeSlide.foregroundAlt}
                    fill
                    className={styles.cardImage}
                  />
                </span>
                <span className={styles.cardLabel}>
                  <Link href={activeSlide.href} className={styles.cardLabelLink}>
                    {activeSlide.label}
                  </Link>
                </span>
              </div>

              <button
                type="button"
                className={`${styles.destinationCard} ${styles.sideCard}`}
                aria-label={`Show ${rightSlide.title} destinations`}
                onClick={() => moveToSlide(rightIndex, "right")}
              >
                <span className={styles.cardMedia}>
                  <Image
                    src={rightSlide.foreground}
                   alt={rightSlide.foregroundAlt}
                    fill
                    className={styles.cardImage}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[var(--background)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-14 max-md:px-4 max-md:py-10">
          <h2
            className={`${holtwood.className} m-0 text-3xl uppercase leading-[1.08] tracking-[0.04em] text-[#50a7a4] sm:text-4xl md:text-[3.25rem] max-md:text-2xl max-md:tracking-[0.03em]`}
          >
            Explore Popular Destinations
          </h2>
          <p className="m-0 mt-4 max-w-5xl text-base leading-7 text-black">
            Every destination tells a story. From global landmarks to beautiful 
            Philippine getaways, unforgettable travel experiences await. 
            +Whether you&apos;re seeking adventure, culture, or relaxation, there&apos;s 
            always a destination ready to inspire your next journey.
          </p>

          <h2
            className={`${holtwood.className} mb-0 mt-11 text-xl uppercase leading-[1.25] tracking-[0.02em] text-[#50a7a4] max-md:mt-8 max-md:text-lg`}
          >
            Tour Packages
          </h2>

          <div className="mt-3 grid grid-cols-1 items-start gap-8 min-[992px]:grid-cols-[minmax(22rem,30.5rem)_1fr] min-[992px]:items-center min-[992px]:gap-x-11 max-md:mt-4 max-md:gap-5">
            <div className="w-full">
              <h3 className="m-0 text-2xl font-semibold leading-tight text-black">
                International
              </h3>

              <div className={styles.collageFrame} aria-hidden="true">
                <div className={`${styles.collageCard} ${styles.cardBridge}`}>
                  <Image
                    src="/Images/sanfrancisco.jpg"
                    alt=""
                    fill
                    className={styles.collageImage}
                  />
                </div>

                <div className={`${styles.collageCard} ${styles.cardAutumn}`}>
                  <Image
                    src="/Images/vancouver.jpg"
                    alt=""
                    fill
                    className={styles.collageImage}
                  />
                </div>

                <div className={`${styles.collageCard} ${styles.cardSafari}`}>
                  <Image
                    src="/Images/safari.jpg"
                    alt=""
                    fill
                    className={styles.collageImage}
                  />
                </div>
              </div>
            </div>

            <p className="m-0 max-w-2xl text-base leading-7 text-black min-[992px]:max-w-[34rem]">
              Discover some of the world’s most exciting destinations. From vibrant cities and famous 
              landmarks to breathtaking landscapes, international travel offers unforgettable experiences 
              and cultures waiting to be explored.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 items-start gap-8 min-[992px]:grid-cols-[minmax(22rem,30.5rem)_1fr] min-[992px]:items-center min-[992px]:gap-x-11 max-md:mt-10 max-md:gap-5">
            <div className="w-full">
              <h3 className="m-0 text-2xl font-semibold leading-tight text-black">
                Domestic
              </h3>

              <div className={styles.domesticCollageFrame} aria-hidden="true">
                <div className={`${styles.domesticCollageCard} ${styles.domesticCardLeft}`}>
                  <Image
                    src="/Images/batanes.jpg"
                    alt=""
                    fill
                    className={styles.collageImage}
                  />
                </div>

                <div className={`${styles.domesticCollageCard} ${styles.domesticCardCenter}`}>
                  <Image
                    src="/Images/elnido.jpg"
                    alt=""
                    fill
                    className={styles.collageImage}
                  />
                </div>

                <div className={`${styles.domesticCollageCard} ${styles.domesticCardRight}`}>
                  <Image
                    src="/Images/iloilo.jpg"
                    alt=""
                    fill
                    className={styles.collageImage}
                  />
                </div>
              </div>
            </div>

            <p className="m-0 max-w-2xl text-base leading-7 text-black min-[992px]:max-w-[34rem]">
              Discover the beauty of the Philippines through its diverse destinations. 
              Travel closer to home and discover amazing destinations across the 
              country filled with natural beauty, culture, and unforgettable adventures.

            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 items-start gap-8 min-[992px]:grid-cols-[minmax(22rem,30.5rem)_1fr] min-[992px]:items-center min-[992px]:gap-x-11 max-md:mt-10 max-md:gap-5">
            <div className="w-full">
              <h3 className="m-0 text-2xl font-semibold leading-tight text-black">
                Cruise
              </h3>

              <div className={styles.cruiseCollageFrame} aria-hidden="true">
                <div className={`${styles.cruiseCollageCard} ${styles.cruiseCardLeft}`}>
                  <Image
                    src="/Images/cruise.jpg"
                    alt=""
                    fill
                    className={styles.collageImage}
                  />
                </div>

                <div className={`${styles.cruiseCollageCard} ${styles.cruiseCardRight}`}>
                  <Image
                    src="/Images/cruisebreakfast.jpg"
                    alt=""
                    fill
                    className={styles.collageImage}
                  />
                </div>
              </div>
            </div>

            <p className="m-0 max-w-2xl text-base leading-7 text-black min-[992px]:max-w-[34rem]">
              Set sail on an unforgettable journey across beautiful seas and coastal destinations. 
              Cruise experiences combine travel, relaxation, and entertainment in one incredible adventure.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
