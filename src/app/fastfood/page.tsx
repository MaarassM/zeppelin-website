import type { Metadata } from "next";
import { GastroPageClient } from "@/components/ui/GastroPageClient";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Fast Food Pula | Zeppelin Beach",
  description:
    "Burgeri, sendviči i roštilj na Saccorgiana plaži, Pula. Svježe, brzo, ukusno — Zeppelin Beach.",
  keywords: ["fast food pula", "hrana na plaži pula", "burgeri pula", "roštilj pula", "restoran plaža pula"],
  alternates: { canonical: "https://zeppelinbar.com/fastfood" },
  openGraph: {
    title: "Fast Food Pula | Zeppelin Beach",
    description: "Burgeri, sendviči i roštilj — svježe i brzo na Saccorgiana plaži, Pula. Zeppelin Beach.",
    url: "https://zeppelinbar.com/fastfood",
    siteName: "Zeppelin Beach Complex",
    images: [{ url: "https://zeppelinbar.com/assets/food/DSC09600.jpg", width: 1280, height: 853, alt: "Fast Food — Zeppelin Beach Pula" }],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fast Food Pula | Zeppelin Beach",
    description: "Burgeri, sendviči i roštilj na plaži — Zeppelin Beach, Saccorgiana, Pula.",
    images: ["https://zeppelinbar.com/assets/food/DSC09600.jpg"],
  },
};

export default function FastFoodPage() {
  return <GastroPageClient item="fastfood" name="Fast Food" gallery={galleryImages.fastfood ?? []} />;
}
