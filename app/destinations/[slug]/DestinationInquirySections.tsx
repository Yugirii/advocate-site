"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

type DestinationCard = {
  name: string;
  image: string;
};

type TravelerField = "adults" | "children" | "infants";

type InquiryFormState = {
  email: string;
  name: string;
  departure: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  additionalInquiries: string;
};

const initialFormState: InquiryFormState = {
  email: "",
  name: "",
  departure: "",
  returnDate: "",
  adults: 0,
  children: 0,
  infants: 0,
  additionalInquiries: "",
};

type DestinationInquirySectionsProps = {
  headingFontClass: string;
  longHaulDestinations: readonly DestinationCard[];
  shortHaulDestinations?: readonly DestinationCard[];
  longHaulTitle?: string | null;
  shortHaulTitle?: string | null;
};

type DestinationGridSectionProps = {
  title?: string | null;
  headingFontClass: string;
  destinations: readonly DestinationCard[];
  onInquire: (destinationName: string) => void;
  extraTopMargin?: string;
};

function DestinationGridSection({
  title,
  headingFontClass,
  destinations,
  onInquire,
  extraTopMargin = "mt-10",
}: DestinationGridSectionProps) {
  const showHeading = Boolean(title);

  return (
    <>
      {showHeading ? (
        <h2
          className={`${headingFontClass} ${extraTopMargin} text-2xl uppercase leading-[1.1] tracking-[0.03em] text-[#50a7a4] sm:text-3xl`}
        >
          {title}
        </h2>
      ) : null}

      <div
        className={`grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${
          showHeading ? "mt-4" : "mt-10"
        }`}
      >
        {destinations.map((destination) => (
          <div key={destination.name} className="w-full">
            <h3 className="mb-2 text-xl font-semibold leading-tight text-black">
              {destination.name}
            </h3>

            <article className="group overflow-hidden rounded-[4px] border border-[#cfcfcf] bg-white">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={`/Images/${destination.image}`}
                  alt={`${destination.name} tour package`}
                  fill
                  className="object-cover"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex min-h-[3.7rem] translate-y-2 items-center justify-center bg-white/95 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 max-md:translate-y-0 max-md:opacity-100">
                  <button
                    type="button"
                    onClick={() => onInquire(destination.name)}
                    className="pointer-events-auto text-xl font-semibold leading-none text-[#50a7a4] transition-colors duration-200 hover:text-[#E39727]"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </>
  );
}

export default function DestinationInquirySections({
  headingFontClass,
  longHaulDestinations,
  shortHaulDestinations = [],
  longHaulTitle = "Long Haul",
  shortHaulTitle = "Short Haul",
}: DestinationInquirySectionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [formState, setFormState] = useState<InquiryFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const openModal = (destinationName: string) => {
    setSelectedDestination(destinationName);
    setIsModalOpen(true);
    setSubmitError(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormState(initialFormState);
    setSelectedDestination("");
    setIsSubmitting(false);
    setSubmitError(null);
  };

  const adjustTravelerCount = (field: TravelerField, delta: number) => {
    setFormState((prev) => ({
      ...prev,
      [field]: Math.max(0, prev[field] + delta),
    }));
  };

  const updateFormField = (field: keyof InquiryFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          destination: selectedDestination,
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setSubmitError(data.error ?? "Failed to send inquiry. Try again.");
        setIsSubmitting(false);
        return;
      }

      closeModal();
    } catch {
      setSubmitError("Failed to send inquiry. Check your connection.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        setFormState(initialFormState);
        setSelectedDestination("");
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      <DestinationGridSection
        title={longHaulTitle}
        headingFontClass={headingFontClass}
        destinations={longHaulDestinations}
        onInquire={openModal}
      />

      {shortHaulDestinations.length > 0 ? (
        <DestinationGridSection
          title={shortHaulTitle}
          headingFontClass={headingFontClass}
          destinations={shortHaulDestinations}
          onInquire={openModal}
          extraTopMargin="mt-12"
        />
      ) : null}

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={closeModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-[#d5d5d5] bg-[#f6f6f6] p-4 shadow-2xl sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Destination Inquiry"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-3xl font-semibold leading-tight text-black">
                  Destination Inquiry
                </h3>
                <p className="mt-1 text-sm text-[#5d5d5d]">
                  For:{" "}
                  <span className="font-semibold text-black">
                    {selectedDestination}
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded px-2 text-3xl leading-none text-[#1f1f1f] transition-colors hover:text-[#E39727]"
                aria-label="Close destination inquiry form"
              >
                x
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-base font-medium leading-6 text-[#1f1f1f]">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(event) => updateFormField("email", event.target.value)}
                    className="w-full rounded-md border border-[#bcbcbc] bg-white px-3 py-2.5 text-base text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-base font-medium leading-6 text-[#1f1f1f]">
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(event) => updateFormField("name", event.target.value)}
                    className="w-full rounded-md border border-[#bcbcbc] bg-white px-3 py-2.5 text-base text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-base font-medium leading-6 text-[#1f1f1f]">
                    Departure <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formState.departure}
                    onChange={(event) =>
                      updateFormField("departure", event.target.value)
                    }
                    className="w-full rounded-md border border-[#bcbcbc] bg-white px-3 py-2.5 text-base text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-base font-medium leading-6 text-[#1f1f1f]">
                    Return <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formState.returnDate}
                    onChange={(event) =>
                      updateFormField("returnDate", event.target.value)
                    }
                    className="w-full rounded-md border border-[#bcbcbc] bg-white px-3 py-2.5 text-base text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
                  />
                </div>
              </div>

              <div className="grid items-start gap-4 sm:grid-cols-3">
                {[
                  { label: "Adults", hint: "12+ years", field: "adults" as const },
                  {
                    label: "Children",
                    hint: "2 - under 12 Yrs",
                    field: "children" as const,
                  },
                  {
                    label: "Infants",
                    hint: "Under 2 Yrs",
                    field: "infants" as const,
                  },
                ].map((traveler) => (
                  <div key={traveler.field} className="justify-self-start">
                    <p className="text-base font-medium leading-6 text-[#1f1f1f]">
                      {traveler.label}{" "}
                      <span className="font-normal text-base text-[#7a7a7a]">
                        {traveler.hint}
                      </span>
                    </p>

                    <div className="mt-2 flex h-10 w-[13rem] max-w-full overflow-hidden rounded-md border border-[#bcbcbc] bg-white">
                      <button
                        type="button"
                        onClick={() => adjustTravelerCount(traveler.field, -1)}
                        className="h-full w-10 text-lg leading-none text-[#1f1f1f] transition-colors hover:bg-[#ececec]"
                        aria-label={`Decrease ${traveler.label}`}
                      >
                        -
                      </button>

                      <div className="flex h-full flex-1 items-center justify-center border-x border-[#bcbcbc] text-base font-medium leading-none text-[#1f1f1f]">
                        {formState[traveler.field]}
                      </div>

                      <button
                        type="button"
                        onClick={() => adjustTravelerCount(traveler.field, 1)}
                        className="h-full w-10 text-lg leading-none text-[#1f1f1f] transition-colors hover:bg-[#ececec]"
                        aria-label={`Increase ${traveler.label}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-base font-medium leading-6 text-[#1f1f1f]">
                  Additional Inquiries
                </label>
                <textarea
                  value={formState.additionalInquiries}
                  onChange={(event) =>
                    updateFormField("additionalInquiries", event.target.value)
                  }
                  rows={5}
                  className="w-full resize-y rounded-md border border-[#bcbcbc] bg-white px-3 py-2.5 text-base text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
                />
              </div>

              {submitError ? (
                <p className="text-sm text-red-600">{submitError}</p>
              ) : null}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[9rem] rounded-md bg-[#50a7a4] px-6 py-2.5 text-xl font-medium text-white transition-colors duration-200 hover:bg-[#458f8c] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
