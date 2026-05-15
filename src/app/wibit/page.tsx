import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Wibit Park Pula | Zeppelin Beach",
  description:
    "Wibit Park — napuhani poligon prepreka na vodi, Saccorgiana plaža, Pula. Skakanje, penjanje, tobogani. Za sve uzraste.",
  keywords: ["wibit pula", "wibit park pula", "aqua park pula", "vodeni park pula", "prepreke na vodi pula"],
  alternates: { canonical: "https://zeppelinbar.com/wibit" },
  openGraph: {
    title: "Wibit Park Pula | Zeppelin Beach",
    description: "Napuhani poligon prepreka na vodi — skoči, penjaj se, klizaj. Saccorgiana plaža, Pula.",
    url: "https://zeppelinbar.com/wibit",
    siteName: "Zeppelin Beach Complex",
    images: [{ url: "https://zeppelinbar.com/assets/wibit.jpg", width: 1280, height: 853, alt: "Wibit Park Pula — Zeppelin Beach" }],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wibit Park Pula | Zeppelin Beach",
    description: "Napuhani poligon prepreka na vodi — Zeppelin Beach, Saccorgiana, Pula.",
    images: ["https://zeppelinbar.com/assets/wibit.jpg"],
  },
};

export default function WibitPage() {
  return (
    <ZonePageClient
      zoneId="wibit"
      name="Wibit Park"
      gallery={galleryImages.wibit ?? []}
      passLink="https://www.zeppelin-adventure.com/product/7-day-wibbit-pass/"
      passLabel="7 DAY WIBIT PASS"
    />
  );
}
