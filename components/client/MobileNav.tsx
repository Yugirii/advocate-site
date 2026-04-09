"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";

export type MobileNavItem = {
  href: string;
  label: string;
};

type MobileNavProps = {
  items: MobileNavItem[];
  tone?: "light" | "dark";
};

const destinationSubRoutes: MobileNavItem[] = [
  { href: "/destinations/international", label: "International" },
  { href: "/destinations/domestic", label: "Domestic" },
  { href: "/destinations/cruise", label: "Cruise" },
];

export default function MobileNav({ items, tone = "light" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const buttonClass =
    tone === "dark"
      ? "text-slate-900 hover:bg-slate-900/5"
      : "text-white hover:bg-white/10";

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (open) {
            closeMenu();
            return;
          }
          setOpen(true);
        }}
        className={`inline-flex items-center justify-center rounded-md p-2 transition-colors ${buttonClass}`}
      >
        <span className="sr-only">Open menu</span>
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-hidden="true"
          className="block"
        >
          <path
            fill="currentColor"
            d="M4 6.5h16a1 1 0 1 0 0-2H4a1 1 0 1 0 0 2zm16 4.5H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2zm0 6.5H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2z"
          />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-x-0 top-[72px] z-40 animate-menu-drop px-4">
          <div
            id={panelId}
            role="menu"
            className="mx-auto w-full max-w-[46rem] overflow-hidden border border-black/10 bg-[#f3f3f3] shadow-xl"
          >
            <div className="h-[2px] w-full bg-[#E39727]" />
            <div className="flex flex-col p-4">
              {items.map((item) => {
                if (item.href !== "/destinations") {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className="border-b border-slate-200 px-3 py-3 text-base font-semibold text-slate-900 transition-colors duration-200 hover:text-[#E39727]"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div key={item.href} className="rounded-md">
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        role="menuitem"
                        className="flex-1 bg-slate-200 px-3 py-3 text-base font-bold text-slate-900"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </div>

                    <div className="ml-3 mt-1 flex flex-col border-l border-slate-200 pl-3">
                      {destinationSubRoutes.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          role="menuitem"
                          className="border-b border-slate-200 px-3 py-3 text-base font-medium text-slate-700 transition-colors duration-200 hover:text-[#E39727]"
                          onClick={closeMenu}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
