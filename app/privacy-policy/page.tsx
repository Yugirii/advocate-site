import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the privacy policy of Advocate Tours and Travel to understand how personal information is collected, used, and protected.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full bg-[#f3f3f3] text-black">
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-32 md:px-8 md:pt-36">
        <h1 className="font-display text-center text-5xl uppercase leading-[1.04] tracking-[0.04em] text-[#E39727] max-md:text-4xl">
          Privacy Policy
        </h1>

        <p className="mx-auto mt-5 max-w-5xl text-center text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
          Advocate Tours and Travel Incorporated is committed to protecting your
          privacy and ensuring that your personal information is handled in a
          safe and responsible manner. This Privacy Policy outlines how we
          collect, use, disclose, and safeguard your information when you use
          our services or visit our website.
        </p>

        <section className="mt-10">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            Information We Collect
          </h2>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            We may collect personal information that you voluntarily provide to
            us when making inquiries, reservations, or bookings. This
            information may include, but is not limited to:
          </p>
          <ol className="mt-4 list-decimal space-y-1 pl-6 text-base leading-7 text-[#232323] marker:font-semibold max-md:text-sm max-md:leading-6">
            <li>Full name</li>
            <li>
              Contact details (such as email address, phone number, and mailing
              address)
            </li>
            <li>Travel preferences and special requests</li>
            <li>Payment information necessary to complete transactions</li>
          </ol>
        </section>

        <section className="mt-9">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            How We Use Your Information
          </h2>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            The information we collect is used solely for legitimate business
            purposes, including:
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-6 text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            <li>Processing and managing your reservations and bookings</li>
            <li>
              Communicating with you regarding your travel arrangements
            </li>
            <li>
              Improving our services, offers, and customer experience
            </li>
            <li>
              Ensuring smooth coordination with travel service providers
            </li>
          </ul>
        </section>

        <section className="mt-9">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            Sharing of Information
          </h2>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            To fulfill your travel arrangements, we may share necessary personal
            information with trusted and reliable third-party partners such as
            hotels, airlines, transportation providers, and other service
            providers. These partners are only given access to the information
            required to perform their specific services.
          </p>
        </section>

        <section className="mt-9">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            Data Protection and Security
          </h2>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            We take reasonable administrative, technical, and physical measures
            to protect your personal information against unauthorized access,
            loss, misuse, or alteration. While we strive to use commercially
            acceptable means to protect your data, no method of transmission
            over the internet is completely secure.
          </p>
        </section>

        <section className="mt-9">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            Your Rights
          </h2>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            You have the right to access, update, correct, or request deletion
            of your personal information at any time. Should you wish to
            exercise any of these rights, you may contact us through the
            appropriate channels provided on our website.
          </p>
        </section>

        <section className="mt-9">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            Data Retention
          </h2>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            We retain your personal information only for as long as necessary to
            fulfill the purposes outlined in this policy, unless a longer
            retention period is required or permitted by law.
          </p>
        </section>

        <section className="mt-9">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            Important Notice
          </h2>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            We respect your privacy. We do not sell, trade, or rent your
            personal data to third parties.
          </p>
        </section>

        <section className="mt-9">
          <h2 className="font-display text-[2rem] uppercase leading-[1.08] tracking-[0.03em] text-[#50a7a4] max-md:text-[1.65rem]">
            Updates to This Policy
          </h2>
          <p className="mt-3 max-w-5xl text-base leading-7 text-[#232323] max-md:text-sm max-md:leading-6">
            Advocate Tours and Travel Incorporated reserves the right to update
            or modify this Privacy Policy at any time. Any changes will be
            posted on this page with an updated revision date.
          </p>
        </section>
      </div>
    </main>
  );
}
