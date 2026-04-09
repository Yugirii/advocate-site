import type { Metadata } from "next";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import SocialRail from "@/components/client/SocialRail";
import AppProviders from "@/components/client/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "Advocate Tours and Travel",
  description: "Discover exceptional destinations, services, and expert guidance with Advocate.",
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
