"use client";

import { useEffect } from "react";

function scrollToHash() {
  if (typeof window === "undefined") return;
  const hash = window.location.hash.replace("#", "");
  if (!hash) return;

  const target = document.getElementById(hash);
  if (!target) return;

  const header = document.querySelector("header");
  const headerHeight = header ? header.getBoundingClientRect().height : 0;
  const targetTop = target.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: Math.max(targetTop - headerHeight - 8, 0),
    behavior: "auto",
  });
}

export default function ScrollToHash() {
  useEffect(() => {
    const onHashChange = () => {
      requestAnimationFrame(scrollToHash);
    };

    requestAnimationFrame(scrollToHash);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
