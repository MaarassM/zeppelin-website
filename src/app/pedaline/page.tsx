import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Pedaline & SUP Pula | Zeppelin Beach",
  description:
    "Iznajmi pedalinu ili SUP dasku i istraži uvalu — Saccorgiana plaža, Pula. Za obitelji i grupe. Zeppelin Beach.",
  keywords: ["pedaline pula", "sup pula", "paddleboard pula", "iznajmljivanje pedaline pula", "vodeni sportovi pula"],
  alternates: { canonical: "https://zeppelinbar.com/pedaline" },
  openGraph: {
    title: "Pedaline & SUP Pula | Zeppelin Beach",
    description: "Iznajmi pedalinu ili SUP dasku i istraži uvalu — Saccorgiana plaža, Pula. Za sve uzraste.",
    url: "https://zeppelinbar.com/pedaline",
    siteName: "Zeppelin Beach Complex",
    images: [{ url: "https://zeppelinbar.com/assets/pedaline.jpg", width: 1280, height: 853, alt: "Pedaline & SUP Pula — Zeppelin Beach" }],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedaline & SUP Pula | Zeppelin Beach",
    description: "Iznajmi pedalinu ili SUP dasku na Saccorgiana plaži — Zeppelin Beach, Pula.",
    images: ["https://zeppelinbar.com/assets/pedaline.jpg"],
  },
};

export default function PedalinePage() {
  return <ZonePageClient zoneId="pedaline" name="Pedal Boat & SUP" gallery={galleryImages.pedaline ?? []} />;
}
