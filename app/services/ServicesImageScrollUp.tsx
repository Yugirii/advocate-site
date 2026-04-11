"use client";

import { useEffect } from "react";

const IMAGE_SELECTOR =
  'main[data-services-page="true"] img:not([data-no-scroll="true"])';

export default function ServicesImageScrollUp() {
  useEffect(() => {
    const images = Array.from(
      document.querySelectorAll<HTMLImageElement>(IMAGE_SELECTOR)
    );

    if (!images.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      images.forEach((image) => {
        image.classList.add("services-scroll-image", "services-scroll-image--visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const image = entry.target as HTMLImageElement;
          image.classList.add("services-scroll-image--visible");
          obs.unobserve(image);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    images.forEach((image) => {
      image.classList.add("services-scroll-image");
      observer.observe(image);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
