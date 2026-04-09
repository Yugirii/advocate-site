import Image from "next/image";
import Link from "next/link";

const legalPageHref = "/legal";

const legalLinks = [
  { href: `${legalPageHref}#privacy-policy`, label: "Privacy Policy" },
  { href: `${legalPageHref}#terms-and-conditions`, label: "Terms & Conditions" },
  { href: `${legalPageHref}#faqs`, label: "FAQs" },
];

const exploreLinks = [
  { href: "/destinations/domestic", label: "Domestic" },
  { href: "/destinations/international", label: "International" },
  { href: "/destinations/cruise", label: "Cruise" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/advocatetoursandtravelinc",
    label: "Facebook",
    icon: "/Images/facebookIcon.png",
  },
  {
    href: "https://www.instagram.com/advocatetours/",
    label: "Instagram",
    icon: "/Images/instagramIcon.png",
  },
  {
    href: "https://www.tiktok.com/@advocatetours",
    label: "TikTok",
    icon: "/Images/tiktokIcon.png",
  },
  {
    href: "https://www.messenger.com/t/973421916336751",
    label: "Messenger",
    icon: "/Images/messengerIcon.png",
  },
];

const footerLinkClass =
  "block transition-all duration-200 ease-out hover:-translate-y-px hover:text-[#E39727]";

export default function Footer() {
  return (
    <footer id="site-footer" className="w-full bg-[#50A7A4] text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-14">
        <div className="flex items-start justify-between gap-6">
          <Link href="/" className="inline-block text-white">
            <p className="text-[1.25rem] font-semibold leading-tight tracking-[0.015em] sm:text-[1.75rem]">
              Advocate Tours and Travel Incorporated
            </p>
            <p className="mt-1.5 text-sm leading-none text-white/90 sm:text-base">
              Advocate your way
            </p>
          </Link>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-8 border-b border-white/25 pb-10 md:grid-cols-[1.6fr_1fr_1fr_auto] md:gap-10">
          <div className="min-w-0">
            <h4 className="text-lg font-semibold">About</h4>
            <div className="mt-2 space-y-1.5 text-base leading-relaxed text-white/95">
              <Link href="/about" className={footerLinkClass}>
                Our Company
              </Link>
              <p>advocatetoursandtravel@gmail.com</p>
              <p>+63 905 845 4125</p>
            </div>
          </div>

          <div className="min-w-0">
            <h4 className="text-lg font-semibold">Explore</h4>
            <div className="mt-2 space-y-1.5 text-base leading-relaxed text-white/95">
              {exploreLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={footerLinkClass}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <h4 className="text-lg font-semibold">Support</h4>
            <div className="mt-2 space-y-1.5 text-base leading-relaxed text-white/95">
              <Link href="/#contact" className={footerLinkClass}>
                Contact Us
              </Link>
            </div>
          </div>
          <div className="min-w-0 md:hidden">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="mt-3 flex items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-8 w-8 items-center justify-center transition-opacity duration-200 hover:opacity-80"
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={32}
                    height={32}
                    className="h-full w-full object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="min-w-0 max-md:hidden md:justify-self-end">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div
              id="footer-social-anchor"
              aria-hidden="true"
              className="mt-5 h-9 w-[176px]"
            />
          </div>
          
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 text-left">
          <nav className="flex w-full flex-wrap items-center justify-start gap-x-3 gap-y-2 text-[14px] leading-none">
            {legalLinks.map((item, index) => (
              <span key={item.href} className="flex items-center">
                <Link
                  href={item.href}
                  className="transition-all duration-200 ease-out hover:-translate-y-px hover:text-[#E39727]"
                >
                  {item.label}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="mx-3 opacity-80">|</span>
                )}
              </span>
            ))}
          </nav>

          <p className="text-sm text-white/90">
            &copy; 2019-2026 Advocate Tours and Travel Incorporated | 4th Floor, Unit 404, 4th floor
            Building M, One Oasis Hub, Ortigas Ave Ext., Pasig, Philippines
          </p>
        </div>
      </div>
    </footer>
  );
}
