import type { Metadata } from "next";
import { BarPageClient } from "@/components/ui/BarPageClient";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Sunbeds & Relax | Zeppelin Beach Pula",
  description:
    "Iznajmi ležaljku i opusti se na Saccorgiana plaži u Puli. Zasjenjene terase i sunčana mjesta — Zeppelin Beach. Radi od 9:00 do 19:00.",
  keywords: ["ležaljke pula", "sunbeds pula", "plaža pula", "relax plaža pula", "zeppelin beach"],
  alternates: { canonical: "https://www.zeppelinbar.hr/relax" },
  openGraph: {
    title: "Sunbeds & Relax | Zeppelin Beach Pula",
    description:
      "Iznajmi ležaljku i opusti se na Saccorgiana plaži u Puli. Zasjenjene terase i sunčana mjesta.",
    url: "https://www.zeppelinbar.hr/relax",
    siteName: "Zeppelin Beach Complex",
    images: [{ url: "https://www.zeppelinbar.hr/assets/relax.jpg", width: 1280, height: 853, alt: "Sunbeds & Relax — Zeppelin Beach Pula" }],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunbeds & Relax | Zeppelin Beach Pula",
    description: "Iznajmi ležaljku na Saccorgiana plaži — Zeppelin Beach, Pula.",
    images: ["https://www.zeppelinbar.hr/assets/relax.jpg"],
  },
};

export default function RelaxPage() {
  return <BarPageClient item="relax" name="Sunbeds & Relax" gallery={galleryImages.relax ?? []} />;
}
