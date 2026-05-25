import type { Metadata } from "next";
import { BarPageClient } from "@/components/ui/BarPageClient";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Bar | Zeppelin Beach Pula",
  description:
    "Beach bar na Saccorgiana plaži u Puli — kokteli, pivo, kava i terasa s pogledom na more. Radi od 9:00 do 02:00.",
  keywords: ["bar pula", "beach bar pula", "kokteli pula", "terasa pula", "zeppelin bar"],
  alternates: { canonical: "https://www.zeppelinbar.hr/bar" },
  openGraph: {
    title: "Bar | Zeppelin Beach Pula",
    description:
      "Kokteli, pivo, kava i terasa s pogledom na more. Zeppelin Beach Bar, Saccorgiana, Pula.",
    url: "https://www.zeppelinbar.hr/bar",
    siteName: "Zeppelin Beach Complex",
    images: [{ url: "https://www.zeppelinbar.hr/assets/bar.jpg", width: 1280, height: 853, alt: "Zeppelin Beach Bar, Pula" }],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bar | Zeppelin Beach Pula",
    description: "Kokteli, pivo i terasa s pogledom na more — Zeppelin Beach Bar, Pula.",
    images: ["https://www.zeppelinbar.hr/assets/bar.jpg"],
  },
};

export default function BarPage() {
  return <BarPageClient item="bar" name="Bar" gallery={galleryImages.bar ?? []} />;
}
