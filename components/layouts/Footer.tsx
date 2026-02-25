import Image from "next/image";
import Link from "next/link";

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  
];

const exploreLinks = [
  { href: "/destinations/domestic", label: "Domestic" },
  { href: "/destinations/international", label: "International" },
  { href: "/destinations/cruise", label: "Cruise" },
];

const footerLinkClass =
  "block transition-all duration-200 ease-out hover:-translate-y-px hover:text-[#E39727]";

export default function Footer() {
  return (
    <footer id="site-footer" className="w-full bg-[#50A7A4] text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-14">
        <div className="flex items-start justify-between gap-6">
          <Link href="/" className="inline-flex">
            <Image
              src="/Images/companynamenewLogo.png"
              alt="Advocate logo"
              width={240}
              height={76}
              className="h-auto w-[180px] sm:w-[210px]"
            />
          </Link>

          
        </div>

        <div className="mt-7 grid gap-10 border-b border-white/25 pb-10 md:grid-cols-[1.6fr_1fr_1fr_auto]">
          <div>
            <h4 className="text-lg font-semibold">About</h4>
            <div className="mt-2 space-y-1.5 text-base leading-relaxed text-white/95">
              <Link href="/about" className={footerLinkClass}>
                Company
              </Link>
              <p>advocatetoursandtravel@gmail.com</p>
              <p>+63 905 845 4125</p>
            </div>
          </div>

          <div>
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

          <div>
            <h4 className="text-lg font-semibold">Support</h4>
            <div className="mt-2 space-y-1.5 text-base leading-relaxed text-white/95">
              <Link href="/#contact" className={footerLinkClass}>
                Contact Us
              </Link>
            </div>
          </div>
          <div
            id="footer-social-anchor"
            aria-hidden="true"
            className="h-8 w-[176px] md:mt-1 md:justify-self-end"
          />
          
        </div>

        <div className="mt-8 flex flex-col items-start gap-4">
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] leading-none">
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
            &copy; Advocate Tours and Travel | 4th Floor, Unit 404, 4th floor
            Building M, One Oasis Hub, Ortigas Ave Ext., Pasig, Philippines
          </p>
        </div>
      </div>
    </footer>
  );
}
