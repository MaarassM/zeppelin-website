import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Jet Ski Pula | Zeppelin Beach",
  description:
    "Iznajmi jet ski ili se pridruži guided safariju na Jadranu — Zeppelin Beach, Saccorgiana, Pula. Nije potrebno iskustvo.",
  keywords: ["jet ski pula", "jetski pula", "jet ski iznajmljivanje pula", "jet ski safari pula", "vodeni sportovi pula"],
  alternates: { canonical: "https://zeppelinbar.com/jetski" },
  openGraph: {
    title: "Jet Ski Pula | Zeppelin Beach",
    description:
      "Iznajmi jet ski ili guided safari na Jadranu — Zeppelin Beach, Saccorgiana, Pula. Nije potrebno iskustvo.",
    url: "https://zeppelinbar.com/jetski",
    siteName: "Zeppelin Beach Complex",
    images: [{ url: "https://zeppelinbar.com/assets/jet-ski.jpg", width: 1280, height: 853, alt: "Jet Ski Pula — Zeppelin Beach" }],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jet Ski Pula | Zeppelin Beach",
    description: "Iznajmi jet ski ili guided safari na Jadranu — Zeppelin Beach, Pula.",
    images: ["https://zeppelinbar.com/assets/jet-ski.jpg"],
  },
};

export default function JetskiPage() {
  return (
    <ZonePageClient
      zoneId="jetski"
      name="Jet Ski"
      gallery={galleryImages.jetski ?? []}
      passLink="https://www.zeppelin-adventure.com/product/rent-a-jet-ski/"
      passLabel="RENT A JET SKI"
    />
  );
}
