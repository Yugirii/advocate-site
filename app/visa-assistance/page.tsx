"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import WebsiteInquiryForm from "../../components/client/WebsiteInquiryForm";

const visaCards = [
  {
    country: "Australia",
    image: "/Images/Australia Visa w logo (2).png",
    alt: "Australia visa assistance card",
  },
  {
    country: "Canada",
    image: "/Images/Canada Visa wo logo.png",
    alt: "Canada visa assistance card",
  },
  {
    country: "Japan",
    image: "/Images/Japan Visa wo logo.png",
    alt: "Japan visa assistance card",
  },
  {
    country: "South Korea",
    image: "/Images/Korea Visa wo logo.png",
    alt: "South Korea visa assistance card",
  },
  {
    country: "New Zealand",
    image: "/Images/NZ wo logo.png",
    alt: "New Zealand visa assistance card",
  },
  {
    country: "Qatar",
    image: "/Images/Qatar Visa Assistance.png",
    alt: "Qatar visa assistance card",
  },
  {
    country: "Schengen",
    image: "/Images/Schengen visa wo logo.png",
    alt: "Schengen visa assistance card",
  },
  {
    country: "Umrah",
    image: "/Images/Umrah Visa Assistance (2).png",
    alt: "Umrah visa assistance card",
  },
  {
    country: "US",
    image: "/Images/US Visa wo logo.png",
    alt: "US visa assistance card",
  },
] as const;

export default function VisaAssistancePage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const closeModal = () => {
    setSelectedCountry(null);
  };

  useEffect(() => {
    if (!selectedCountry) {
      return;
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [selectedCountry]);

  return (
    <main className={`${styles.main} font-[var(--font-body)] text-black`}>
      <section className={styles.introSection}>
        <div className={styles.introInner}>
          <h1
            className={`font-display text-center text-5xl uppercase leading-none tracking-[0.06em] text-[#E39727] sm:text-5xl max-md:text-4xl`}
          >
            Visa Assistance
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-7 text-[#1f1f1f] max-md:text-sm max-md:leading-6">
            We provide guided visa support from assessment to submission so your
            application stays complete, organized, and stress-free.
          </p>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className={styles.cardsInner}>
          <h2
            className={`font-display text-4xl uppercase leading-none tracking-[0.05em] text-[#50a7a4] sm:text-3xl max-md:text-3xl`}
          >
            Top Visa
          </h2>

          <div className={styles.cardGrid}>
            {visaCards.map((card) => (
              <article
                key={card.country}
                className={styles.card}
                tabIndex={0}
              >
                <div className={styles.cardMedia}>
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className={styles.cardImage}
                  />
                </div>

                <div className={styles.cardLabel}>
                  <button
                    type="button"
                    className={styles.cardLabelButton}
                    onClick={() => setSelectedCountry(card.country)}
                    aria-label={`Inquire about ${card.country} visa`}
                  >
                    {`Inquire ${card.country} Visa`}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="visa-inquiries" className={styles.inquirySection}>
        <div className={styles.inquiryInner}>
          <aside className={styles.inquiryAside}>
            <h2
              className={`font-display ${styles.inquiryTitle}`}
            >
              For
              <span>Inquiries</span>
            </h2>

            <div className={styles.contactList}>
              <p className={styles.contactItem}>
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

              <p className={styles.contactItem}>
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

          <div className={styles.formCard}>
            <WebsiteInquiryForm className={styles.formShell} />
          </div>
        </div>
      </section>

      {selectedCountry ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={closeModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-[#d5d5d5] bg-[#f6f6f6] p-4 shadow-2xl sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="visa-assistance-inquiry-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  id="visa-assistance-inquiry-title"
                  className="text-3xl font-semibold leading-tight text-black"
                >
                  Visa Assistance Inquiry
                </h3>
                <p className="mt-1 text-sm text-[#5d5d5d]">
                  For:{" "}
                  <span className="font-semibold text-black">
                    {selectedCountry}
                  </span>
                </p>
              </div>
              <button
                type="button"
                className="rounded p-1 transition-opacity hover:opacity-80"
                onClick={closeModal}
                aria-label="Close visa inquiry modal"
              >
                <Image
                  src="/Images/cross.png"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              </button>
            </div>

            <WebsiteInquiryForm
              key={selectedCountry}
              className="mt-6"
              variant="simple"
              inquiryType="visa"
              inquiryTarget={selectedCountry}
              initialMessage={`Hello, I would like to inquire about ${selectedCountry} visa assistance.`}
              submitLabel="Submit"
              helperNote="Note: We will reply to your email as soon as possible, your patience is appreciated."
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}
