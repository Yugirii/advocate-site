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
const MOVE_DURATION_MS = 360;
const INITIAL_SETTLE_MS = 140;

export default function SocialRail() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const dockedRef = useRef(false);
  const initializedRef = useRef(false);
  const pageReadyRef = useRef(false);
  const dockingTimerRef = useRef<number | null>(null);
  const [isDocked, setIsDocked] = useState(false);
  const [isDocking, setIsDocking] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const [floatLeft, setFloatLeft] = useState(0);
  const [floatTop, setFloatTop] = useState(0);
  const [dockLeft, setDockLeft] = useState(0);
  const [dockTop, setDockTop] = useState(0);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    const anchor = document.getElementById("footer-social-anchor");
    const railEl = railRef.current;
    if (!footer || !anchor || !railEl) return;

    let rafId: number | null = null;
    let settleTimer: number | null = null;

    pageReadyRef.current = document.readyState === "complete";

    const measure = () => {
      const railRect = railRef.current?.getBoundingClientRect();
      const railWidth = railRect?.width ?? 36;
      const railHeight = railRect?.height ?? 36;

      const floatLeft = window.innerWidth - FLOAT_RIGHT_OFFSET - railWidth;
      const floatTop = window.innerHeight - FLOAT_BOTTOM_OFFSET - railHeight;

      const anchorRect = anchor.getBoundingClientRect();
      const shouldDock =
        pageReadyRef.current &&
        anchorRect.top <= window.innerHeight - DOCK_TRIGGER_BOTTOM_OFFSET;

      if (shouldDock) {
        // Keep dock coordinates in viewport space so we avoid switching coordinate systems.
        const nextDockLeft = anchorRect.left;
        const nextDockTop = anchorRect.top;
        setDockLeft(nextDockLeft);
        setDockTop(nextDockTop);

        if (!dockedRef.current) {
          dockedRef.current = true;
          setIsDocked(true);
          setIsDocking(true);
          if (dockingTimerRef.current !== null) {
            window.clearTimeout(dockingTimerRef.current);
          }
          dockingTimerRef.current = window.setTimeout(() => {
            setIsDocking(false);
            dockingTimerRef.current = null;
          }, MOVE_DURATION_MS);
        }

        if (!initializedRef.current) {
          initializedRef.current = true;
          setIsInitialized(true);
          settleTimer = window.setTimeout(() => {
            setIsSettled(true);
          }, INITIAL_SETTLE_MS);
        }
        return;
      }

      setFloatLeft(floatLeft);
      setFloatTop(floatTop);

      if (dockedRef.current) {
        dockedRef.current = false;
        setIsDocked(false);
        setIsDocking(false);
        if (dockingTimerRef.current !== null) {
          window.clearTimeout(dockingTimerRef.current);
          dockingTimerRef.current = null;
        }
      }

      if (!initializedRef.current) {
        initializedRef.current = true;
        setIsInitialized(true);
        settleTimer = window.setTimeout(() => {
          setIsSettled(true);
        }, INITIAL_SETTLE_MS);
      }
    };

    const onViewportChange = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => measure());
    };

    const onResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => measure());
    };

    const onLoad = () => {
      pageReadyRef.current = true;
      onResize();
    };

    measure();
    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onLoad, { once: true });
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(footer);
    resizeObserver.observe(anchor);
    resizeObserver.observe(railEl);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (settleTimer !== null) window.clearTimeout(settleTimer);
      if (dockingTimerRef.current !== null) {
        window.clearTimeout(dockingTimerRef.current);
        dockingTimerRef.current = null;
      }
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      resizeObserver.disconnect();
    };
  }, []);

  const railStyle = useMemo(() => {
    const shouldAnimate = isSettled && (isDocking || !isDocked);
    const sharedStyle = {
      transition: shouldAnimate
        ? `left ${MOVE_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), top ${MOVE_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
        : "none",
      willChange: "left, top",
      opacity: isInitialized && isSettled ? 1 : 0,
      pointerEvents: isInitialized && isSettled ? "auto" : "none",
    };

    return {
      position: "fixed" as const,
      left: `${isDocked ? dockLeft : floatLeft}px`,
      top: `${isDocked ? dockTop : floatTop}px`,
      ...sharedStyle,
    };
  }, [dockLeft, dockTop, floatLeft, floatTop, isDocked, isDocking, isInitialized, isSettled]);

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
