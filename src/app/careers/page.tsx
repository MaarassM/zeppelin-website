import type { Metadata } from "next";
import { CareersPageClient } from "@/components/forms/CareersPageClient";

export const metadata: Metadata = {
  title: "Karijere | Zeppelin Beach",
  description: "Prijavi se za sezonu i radi na najljepšoj plaži u Puli.",
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-cream pt-16">
      <CareersPageClient />
    </div>
  );
}
