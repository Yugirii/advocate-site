import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const staticRoutes = [
  "/",
  "/about",
  "/services",
  "/visa-assistance",
  "/destinations",
  "/destinations/international",
  "/destinations/domestic",
  "/destinations/cruise",
  "/privacy-policy",
  "/legal",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority:
      route === "/"
        ? 1
        : route.startsWith("/destinations/")
          ? 0.8
          : 0.7,
  }));
}

