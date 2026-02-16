import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/client/MobileNav";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blogs" },
];

type NavbarProps = {
  tone?: "light" | "dark";
};

export default function Navbar({ tone = "light" }: NavbarProps) {
  const toneClass = tone === "dark" ? "text-slate-900" : "text-white";
  const linkClass =
    "whitespace-nowrap text-sm font-semibold opacity-90 transition-all duration-200 ease-out hover:-translate-y-px hover:text-[#E39727] hover:opacity-100";

  return (
    <nav className="relative w-full">
      <div className="absolute left-2 top-1/2 z-20 -translate-y-1/2 sm:left-4 md:left-6 lg:left-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/Images/companynamenewLogo.png"
            alt="Advocate logo"
            width={260}
            height={100}
            priority
            className="h-12 w-auto md:h-16"
          />
        </Link>
      </div>

      <div className="mx-auto flex min-h-[72px] w-full max-w-6xl items-center justify-end px-4 py-3 md:grid md:min-h-[88px] md:grid-cols-[1fr_auto_1fr] md:items-center md:px-8">
        <div className="hidden md:block" aria-hidden="true" />

        <div className={`hidden items-center gap-4 md:flex lg:gap-8 ${toneClass}`}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="justify-self-end">
          <MobileNav items={navItems} tone={tone} />
        </div>
      </div>
    </nav>
  );
}
