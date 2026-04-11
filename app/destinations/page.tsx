import type { Metadata } from "next";
import DestinationsClientPage from "./DestinationsClientPage";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore international, domestic, and cruise destinations with curated travel packages from Advocate Tours and Travel.",
  alternates: {
    canonical: "/destinations",
  },
};

export default function DestinationsPage() {
  return <DestinationsClientPage />;
}
