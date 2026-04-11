const fallbackSiteUrl = "https://www.advocatetoursandtravel.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || fallbackSiteUrl;

