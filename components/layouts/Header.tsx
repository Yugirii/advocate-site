"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layouts/Navbar";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`left-0 right-0 top-0 z-30 w-full transition-all duration-300 ${
        isScrolled
          ? "fixed border-b border-black/10 bg-white/95 text-slate-900 backdrop-blur-md shadow-lg animate-slide-down"
          : "absolute border-b border-white/70 bg-transparent text-white"
      }`}
    >
      <Navbar tone={isScrolled ? "dark" : "light"} />
    </header>
  );
}
