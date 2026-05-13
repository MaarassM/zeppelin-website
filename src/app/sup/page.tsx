import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "SUP & Kajak Pula | Zeppelin Beach",
  description:
    "Iznajmi SUP dasku ili kajak i istraži Jadran — Saccorgiana plaža, Pula. Za sve razine. Zeppelin Beach.",
  keywords: ["sup pula", "kajak pula", "paddleboard pula", "iznajmljivanje sup pula", "vodeni sportovi pula"],
  alternates: { canonical: "https://zeppelinbar.com/sup" },
  openGraph: {
    title: "SUP & Kajak Pula | Zeppelin Beach",
    description: "Iznajmi SUP dasku ili kajak i istraži Jadran — Saccorgiana plaža, Pula. Za sve razine.",
    url: "https://zeppelinbar.com/sup",
    siteName: "Zeppelin Beach Complex",
    images: [{ url: "https://zeppelinbar.com/assets/Sup kayak/IMG_1208.JPG", width: 1280, height: 853, alt: "SUP & Kajak Pula — Zeppelin Beach" }],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SUP & Kajak Pula | Zeppelin Beach",
    description: "Iznajmi SUP dasku ili kajak na Saccorgiana plaži — Zeppelin Beach, Pula.",
    images: ["https://zeppelinbar.com/assets/Sup kayak/IMG_1208.JPG"],
  },
};

export default function SupPage() {
  return <ZonePageClient zoneId="sup" name="SUP & Kayak" gallery={galleryImages.sup ?? []} />;
}
