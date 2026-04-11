import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Review the terms and conditions for using the website and travel services of Advocate Tours and Travel.",
  alternates: {
    canonical: "/legal",
  },
};

export default function LegalPage() {
  return (
    <main className="w-full bg-[#f3f3f3] text-black">
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-32 md:px-8 md:pt-36">
        <h1
          id="terms-and-conditions"
          className="font-display text-center text-5xl uppercase leading-[1.04] tracking-[0.04em] text-[#E39727] max-md:text-4xl"
        >
          Terms and Conditions
        </h1>
        <p className="mx-auto mt-5 max-w-5xl text-center text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
          Welcome to Advocate Tours and Travel Incorporated. By accessing our
          website and using our services, you agree to comply with and be bound
          by the following Terms and Conditions. Please read them carefully
          before making any bookings or transactions.
        </p>

        <section className="mt-10">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            Booking and Availability
          </h2>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            All bookings made through Advocate Tours and Travel Incorporated are
            subject to availability and confirmation by the relevant service
            providers, including airlines, hotels, and tour operators. We
            reserve the right to decline or cancel any booking in the event
            that services are unavailable or incorrectly priced.
          </p>
        </section>

        <section className="mt-9">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            Pricing and Payments
          </h2>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            All prices displayed are subject to change without prior notice due
            to factors such as currency fluctuations, supplier adjustments, or
            unforeseen circumstances. Full or partial payment may be required
            at the time of booking to secure your reservation. Failure to
            complete payment within the required time may result in automatic
            cancellation of your booking.
          </p>
        </section>

        <section className="mt-9">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            Cancellations and Refunds
          </h2>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            Cancellation and refund policies vary depending on the service
            provider (e.g., airlines, hotels, tour operators). Clients are
            responsible for reviewing and understanding the specific terms
            applicable to their bookings. Any applicable cancellation fees or
            penalties will be charged accordingly.
          </p>
        </section>

        <section className="mt-9">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            Travel Documents and Compliance
          </h2>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            It is the responsibility of the traveler to ensure that all
            required travel documents, such as passports, visas, and
            identification, are valid and up to date. Travelers must also
            comply with all applicable laws, regulations, and entry
            requirements of their destination, including health and safety
            protocols.
          </p>
        </section>

        <section className="mt-9">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            Third-Party Services
          </h2>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            Advocate Tours and Travel Incorporated acts solely as an
            intermediary between clients and third-party service providers.
            While we strive to work with reputable partners, we do not control
            their operations and are not liable for any acts, errors,
            omissions, delays, or service disruptions caused by them.
          </p>
        </section>

        <section className="mt-9">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            Unexpected Events (Force Majeure)
          </h2>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            We understand that some situations are beyond anyone&apos;s
            control. Advocate Tours and Travel Incorporated will not be held
            responsible for delays, changes, or cancellations caused by
            unexpected events such as natural disasters, severe weather, health
            emergencies, government restrictions, or other unforeseen
            circumstances.
          </p>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            In such cases, we will do our best to assist you by coordinating
            with our travel partners and exploring possible alternatives or
            solutions.
          </p>
        </section>

        <section className="mt-9">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            Limitation of Liability
          </h2>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            To the fullest extent permitted by law, Advocate Tours and Travel
            Incorporated shall not be held responsible for any direct, indirect,
            incidental, or consequential damages arising from the use of our
            services or participation in travel arrangements.
          </p>
        </section>

        <section className="mt-9">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            Amendments
          </h2>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            We reserve the right to update or modify these Terms and Conditions
            at any time without prior notice. Continued use of our services
            constitutes acceptance of any changes made.
          </p>
        </section>

        <section id="faqs" className="mt-10 scroll-mt-24">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            Frequently Asked Questions (FAQs):
          </h2>

          <ol className="mt-4 space-y-5 text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            <li>
              <p className="font-semibold">1. What services do you offer?</p>
              <p className="mt-1">
                We provide Tour Packages, Flight Bookings, Cruise Bookings,
                Hotel Reservations, Visa Assistance, Travel Insurance, and
                customized travel itineraries.
              </p>
            </li>

            <li>
              <p className="font-semibold">2. Is visa approval guaranteed?</p>
              <p className="mt-1">
                No. Visa approval is solely decided by the embassy. However, we
                ensure your application is complete and well-prepared to
                increase your chances of approval.
              </p>
            </li>

            <li>
              <p className="font-semibold">
                3. How long does visa processing take?
              </p>
              <p className="mt-1">
                Processing time varies depending on the country and season. It
                can take anywhere from a few days to several weeks.
              </p>
            </li>

            <li>
              <p className="font-semibold">
                4. Can you book flights and hotels only?
              </p>
              <p className="mt-1">
                Yes, you can avail of flight-only or hotel-only bookings,
                depending on your needs.
              </p>
            </li>

            <li>
              <p className="font-semibold">5. What are your payment options?</p>
              <p className="mt-1">
                We offer flexible and convenient payment methods for your
                bookings:
              </p>
              <ol className="mt-2 list-decimal space-y-1 pl-6">
                <li>
                  <span className="font-medium">Bank Transfer / Online Banking</span>
                  <br />
                  You may send your payment via bank transfer. Account details
                  will be provided upon booking confirmation.
                </li>
                <li>
                  <span className="font-medium">Over-the-Counter Deposit</span>
                  <br />
                  You may deposit your payment directly to our designated bank
                  account.
                </li>
                <li>
                  <span className="font-medium">
                    Installment (Selected Group Packages)
                  </span>
                  <br />
                  Installment options are available for selected group tour
                  packages. Terms and conditions apply.
                </li>
              </ol>
            </li>

            <li>
              <p className="font-semibold">
                6. How do I know your agency is legit?
              </p>
              <p className="mt-1">
                We are a registered and accredited travel agency. You may
                request our business permits and verify our credentials anytime.
                You can also visit the official DOT website to find the latest
                spreadsheet of accredited travel agencies, tour operators, and
                other tourism enterprises.
              </p>
            </li>

            <li>
              <p className="font-semibold">
                7. What is your cancellation and refund policy?
              </p>
              <p className="mt-1">No cancellations or refunds are allowed.</p>
              <p className="mt-1">
                Bookings may only be rescheduled, subject to availability.
                Rescheduling requests should be submitted in advance and may
                incur additional fees if the new dates have different rates.
              </p>
            </li>

            <li>
              <p className="font-semibold">
                8. How can I book your services?
              </p>
              <p className="mt-1">
                Send us a message with your travel details through our Facebook
                account or Email, and our team will guide you step by step.
              </p>
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}
