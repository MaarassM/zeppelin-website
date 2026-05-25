import type { Metadata } from "next";
import { CareersPageClient } from "@/components/forms/CareersPageClient";

export const metadata: Metadata = {
  title: "Karijere | Posao na Plaži Pula | Zeppelin Beach",
  description:
    "Prijavi se za sezonu i radi na Saccorgiana plaži u Puli — bar, kuhinja, vodeni sportovi i više. Zeppelin Beach zapošljava.",
  keywords: ["posao pula", "sezonski posao pula", "posao plaža pula", "zapošljavanje pula", "zeppelin karijere"],
  alternates: { canonical: "https://www.zeppelinbar.hr/careers" },
  openGraph: {
    title: "Karijere | Posao na Plaži Pula | Zeppelin Beach",
    description: "Prijavi se za sezonu i radi na Saccorgiana plaži u Puli — bar, kuhinja, vodeni sportovi i više.",
    url: "https://www.zeppelinbar.hr/careers",
    siteName: "Zeppelin Beach Complex",
    images: [{ url: "https://www.zeppelinbar.hr/assets/hero.jpg", width: 1280, height: 853, alt: "Karijere — Zeppelin Beach Pula" }],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karijere | Posao na Plaži Pula | Zeppelin Beach",
    description: "Sezonski posao na Saccorgiana plaži u Puli — Zeppelin Beach zapošljava.",
    images: ["https://www.zeppelinbar.hr/assets/hero.jpg"],
  },
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-cream">
      <CareersPageClient />
    </div>
  );
}
