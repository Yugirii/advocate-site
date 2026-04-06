"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "@/components/client/MobileNav";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/visa-assistance", label: "Visa Assistance" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
];

type NavbarProps = {
  tone?: "light" | "dark";
};

export default function Navbar({ tone = "light" }: NavbarProps) {
  const pathname = usePathname();
  const toneClass = tone === "dark" ? "text-slate-900" : "text-white";
  const linkClass =
    "relative inline-flex items-center whitespace-nowrap px-2 py-2 -mx-2 -my-2 text-sm font-semibold opacity-90 transition-all duration-200 ease-out hover:-translate-y-px hover:text-[#E39727] hover:opacity-100 after:pointer-events-none after:absolute after:inset-x-2 after:bottom-[0.15rem] after:h-[2px] after:origin-left after:scale-x-0 after:bg-[#E39727] after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100";

  const isActiveLink = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <nav className="relative w-full">
      <div className="absolute left-2 top-1/2 z-20 -translate-y-1/2 sm:left-4 md:left-6 lg:left-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/Images/companyCurrentLogo.png"
            alt="Advocate logo"
            width={220}
            height={86}
            priority
            className="h-8 w-auto md:h-10"
          />
        </Link>
      </div>

      <div className="mx-auto flex min-h-[72px] w-full max-w-6xl items-center justify-end px-4 py-3 md:grid md:min-h-[88px] md:grid-cols-[1fr_auto_1fr] md:items-center md:px-8">
        <div className="hidden md:block" aria-hidden="true" />

        <div className={`hidden items-center gap-4 md:flex lg:gap-8 ${toneClass}`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActiveLink(item.href) ? "page" : undefined}
              className={`${linkClass} ${
                isActiveLink(item.href)
                  ? "text-[#E39727] opacity-100 after:scale-x-100"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-self-end gap-3">
          <MobileNav items={navItems} tone={tone} />
        </div>
      </div>
    </nav>
  );
}
