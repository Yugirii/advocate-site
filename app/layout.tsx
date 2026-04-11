import type { Metadata } from "next";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import SocialRail from "@/components/client/SocialRail";
import AppProviders from "@/components/client/AppProviders";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const siteName = "Advocate Tours and Travel";
const defaultTitle = "Advocate Tours and Travel";
const defaultDescription =
  "Discover curated tours, visa assistance, travel insurance, and reliable travel support with Advocate Tours and Travel.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: "%s | Advocate Tours and Travel",
  },
  description: defaultDescription,
  applicationName: siteName,
  keywords: [
    "Advocate Tours and Travel",
    "travel agency Philippines",
    "tour packages",
    "visa assistance",
    "travel insurance",
  ],
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: SITE_URL,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/Images/advocatenewLogo.jpg",
        width: 1200,
        height: 630,
        alt: "Advocate Tours and Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/Images/advocatenewLogo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&family=Holtwood+One+SC&display=swap"
        />
      </head>
      <body className="antialiased">
        <AppProviders>
          <Header />
          {children}
          <Footer />
          <SocialRail />
        </AppProviders>
      </body>
    </html>
  );
}
