import Image from "next/image";
import Link from "next/link";

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
    "text-sm font-semibold opacity-90 transition-opacity hover:opacity-100";

  return (
    <nav className="w-full">
      <div className="relative flex w-full items-center py-3 pl-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/Images/companynamenewLogo.png"
            alt="Advocate logo"
            width={260}
            height={100}
            priority
            className="h-20 w-auto"
          />
        </Link>
        <div
          className={`absolute left-1/2 flex -translate-x-1/2 items-center gap-15 ${toneClass}`}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
