import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Flyboard Pula | Zeppelin Beach",
  description:
    "Flyboard iskustvo na Jadranu — uzleti iznad mora uz vodeni pogon. Zeppelin Beach, Saccorgiana, Pula. Nije potrebno iskustvo.",
  keywords: ["flyboard pula", "flyboard iskustvo pula", "vodeni sportovi pula", "adrenalin pula"],
  alternates: { canonical: "https://www.zeppelinbar.hr/flyboard" },
  openGraph: {
    title: "Flyboard Pula | Zeppelin Beach",
    description:
      "Uzleti iznad Jadrana uz flyboard — Zeppelin Beach, Saccorgiana, Pula. Nije potrebno iskustvo.",
    url: "https://www.zeppelinbar.hr/flyboard",
    siteName: "Zeppelin Beach Complex",
    images: [{ url: "https://www.zeppelinbar.hr/assets/flyboard.jpg", width: 1280, height: 853, alt: "Flyboard Pula — Zeppelin Beach" }],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flyboard Pula | Zeppelin Beach",
    description: "Uzleti iznad Jadrana uz flyboard — Zeppelin Beach, Pula.",
    images: ["https://www.zeppelinbar.hr/assets/flyboard.jpg"],
  },
};

export default function FlyboardPage() {
  return (
    <ZonePageClient
      zoneId="flyboard"
      name="Flyboard"
      gallery={galleryImages.flyboard ?? []}
      passLink="https://www.zeppelin-adventure.com/product/flyboard-school/"
      passLabel="FLYBOARD SCHOOL"
    />
  );
}
