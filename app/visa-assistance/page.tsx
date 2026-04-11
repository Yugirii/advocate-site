import type { Metadata } from "next";
import VisaAssistanceClientPage from "./VisaAssistanceClientPage";

export const metadata: Metadata = {
  title: "Visa Assistance",
  description:
    "Get guided tourist visa assistance with Advocate Tours and Travel for major destinations, from requirements review to submission support.",
  alternates: {
    canonical: "/visa-assistance",
  },
};

export default function VisaAssistancePage() {
  return <VisaAssistanceClientPage />;
}
