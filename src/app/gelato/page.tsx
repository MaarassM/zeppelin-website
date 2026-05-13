import type { Metadata } from "next";
import { GastroPageClient } from "@/components/ui/GastroPageClient";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gelato Bar Pula | Sladoled | Zeppelin Beach",
  description:
    "Ručno rađeni sladoled i smoothie bowlovi od svježih sastojaka — Saccorgiana plaža, Pula. Zeppelin Beach Gelato Bar.",
  keywords: ["sladoled pula", "gelato pula", "gelato bar pula", "smoothie bowl pula", "slatko na plaži pula"],
  alternates: { canonical: "https://zeppelinbar.com/gelato" },
  openGraph: {
    title: "Gelato Bar Pula | Sladoled | Zeppelin Beach",
    description: "Ručno rađeni sladoled i smoothie bowlovi od svježih sastojaka — Saccorgiana plaža, Pula.",
    url: "https://zeppelinbar.com/gelato",
    siteName: "Zeppelin Beach Complex",
    images: [{ url: "https://zeppelinbar.com/assets/gelato.jpg", width: 1280, height: 853, alt: "Gelato Bar Pula — Zeppelin Beach" }],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gelato Bar Pula | Sladoled | Zeppelin Beach",
    description: "Ručno rađeni sladoled i smoothie bowlovi — Zeppelin Beach, Saccorgiana, Pula.",
    images: ["https://zeppelinbar.com/assets/gelato.jpg"],
  },
};

export default function GelatoPage() {
  return <GastroPageClient item="gelato" name="Gelato Bar" gallery={galleryImages.gelato ?? []} />;
}
