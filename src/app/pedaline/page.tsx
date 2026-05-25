import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Pedaline Pula | Zeppelin Beach",
  description:
    "Iznajmi pedalinu i istraži uvalu — Saccorgiana plaža, Pula. Za obitelji i grupe. Zeppelin Beach.",
  keywords: ["pedaline pula", "iznajmljivanje pedaline pula", "pedalina pula", "vodeni sportovi pula"],
  alternates: { canonical: "https://www.zeppelinbar.hr/pedaline" },
  openGraph: {
    title: "Pedaline Pula | Zeppelin Beach",
    description: "Iznajmi pedalinu i istraži uvalu — Saccorgiana plaža, Pula. Za obitelji i grupe.",
    url: "https://www.zeppelinbar.hr/pedaline",
    siteName: "Zeppelin Beach Complex",
    images: [{ url: "https://www.zeppelinbar.hr/assets/pedaline.jpg", width: 1280, height: 853, alt: "Pedaline Pula — Zeppelin Beach" }],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedaline Pula | Zeppelin Beach",
    description: "Iznajmi pedalinu na Saccorgiana plaži — Zeppelin Beach, Pula.",
    images: ["https://www.zeppelinbar.hr/assets/pedaline.jpg"],
  },
};

export default function PedalinePage() {
  return <ZonePageClient zoneId="pedaline" name="Pedal Boat" gallery={galleryImages.pedaline ?? []} hidePricing />;
}
