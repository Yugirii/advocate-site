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

export default function MobileNav({ items, tone = "light" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

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
        onClick={() => setOpen((prev) => !prev)}
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
        <div className="fixed inset-0 z-40">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div
            id={panelId}
            role="menu"
            className="absolute right-4 top-16 w-[min(92vw,22rem)] overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black/10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col p-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className="rounded-md px-3 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
