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
    "whitespace-nowrap text-sm font-semibold opacity-90 transition-opacity hover:opacity-100";

  return (
    <nav className="w-full">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:px-8">
        <div className="justify-self-start">
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
