"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const socialLinks = [
  { href: "#", label: "Facebook", icon: "/Images/facebookIcon.png" },
  { href: "#", label: "Instagram", icon: "/Images/instagramIcon.png" },
  { href: "#", label: "TikTok", icon: "/Images/tiktokIcon.png" },
  { href: "#", label: "Messenger", icon: "/Images/messengerIcon.png" },
] as const;

const FLOAT_RIGHT_OFFSET = 44;
const FLOAT_BOTTOM_OFFSET = 16;
const DOCK_TRIGGER_BOTTOM_OFFSET = 32;
const MIN_VIEWPORT_PADDING = 16;
const MOVE_DURATION_MS = 360;

export default function SocialRail() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const dockedRef = useRef(false);
  const [isDocked, setIsDocked] = useState(false);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    const anchor = document.getElementById("footer-social-anchor");
    const railEl = railRef.current;
    if (!footer || !anchor || !railEl) return;

    let rafId: number | null = null;

    const measure = (source: "initial" | "scroll" | "resize") => {
      const railRect = railRef.current?.getBoundingClientRect();
      const railWidth = railRect?.width ?? 36;
      const railHeight = railRect?.height ?? 36;

      const floatLeft = window.innerWidth - FLOAT_RIGHT_OFFSET - railWidth;
      const floatTop = window.innerHeight - FLOAT_BOTTOM_OFFSET - railHeight;

      const anchorRect = anchor.getBoundingClientRect();
      const shouldDock = anchorRect.top <= window.innerHeight - DOCK_TRIGGER_BOTTOM_OFFSET;

      if (shouldDock) {
        const nextLeft = Math.max(
          MIN_VIEWPORT_PADDING,
          Math.min(anchorRect.left, window.innerWidth - railWidth - MIN_VIEWPORT_PADDING),
        );
        const nextTop = Math.max(
          MIN_VIEWPORT_PADDING,
          Math.min(anchorRect.top, window.innerHeight - railHeight - MIN_VIEWPORT_PADDING),
        );

        // Lock position once docked during scroll, and only update during resize/initial measurement.
        if (!dockedRef.current || source !== "scroll") {
          setLeft(nextLeft);
          setTop(nextTop);
        }

        if (!dockedRef.current) {
          dockedRef.current = true;
          setIsDocked(true);
        }
        return;
      }

      setLeft(floatLeft);
      setTop(floatTop);

      if (dockedRef.current) {
        dockedRef.current = false;
        setIsDocked(false);
      }
    };

    const onViewportChange = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => measure("scroll"));
    };

    const onResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => measure("resize"));
    };

    measure("initial");
    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onResize);
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(footer);
    resizeObserver.observe(anchor);
    resizeObserver.observe(railEl);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
    };
  }, []);

  const railStyle = useMemo(() => {
    return {
      position: "fixed" as const,
      left: `${left}px`,
      top: `${top}px`,
      transition: `left ${MOVE_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), top ${MOVE_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      willChange: "left, top",
    };
  }, [left, top]);

  return (
    <div
      ref={railRef}
      aria-label="Social links"
      className={`z-40 flex ${isDocked ? "flex-row items-center gap-4" : "flex-col items-center gap-3 sm:gap-4"}`}
      style={railStyle}
    >
      {socialLinks.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          aria-label={item.label}
          className="inline-flex h-8 w-8 items-center justify-center transition-opacity duration-200 hover:opacity-80 sm:h-9 sm:w-9"
        >
          <Image
            src={item.icon}
            alt={item.label}
            width={36}
            height={36}
            className="h-full w-full object-contain"
          />
        </Link>
      ))}
    </div>
  );
}
