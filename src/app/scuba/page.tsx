import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";

export const metadata: Metadata = {
  title: "Ronjenje Pula | Scuba Diving | Zeppelin Beach",
  description:
    "Ronjenje uz certificiranog instruktora na Saccorgiana plaži, Pula. Za početnike i iskusne ronioce — Zeppelin Beach. Oprema uključena.",
  keywords: ["ronjenje pula", "scuba diving pula", "ronilački tečaj pula", "ronjenje jadran", "zeppelin ronjenje"],
  alternates: { canonical: "https://zeppelinbar.com/scuba" },
  openGraph: {
    title: "Ronjenje Pula | Scuba Diving | Zeppelin Beach",
    description:
      "Ronjenje uz certificiranog instruktora — za početnike i iskusne ronioce. Saccorgiana plaža, Pula.",
    url: "https://zeppelinbar.com/scuba",
    siteName: "Zeppelin Beach Complex",
    images: [{ url: "https://zeppelinbar.com/assets/scuba-diving.jpg", width: 1280, height: 853, alt: "Ronjenje Pula — Zeppelin Beach" }],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ronjenje Pula | Scuba Diving | Zeppelin Beach",
    description: "Ronjenje uz instruktora na Saccorgiana plaži — Zeppelin Beach, Pula.",
    images: ["https://zeppelinbar.com/assets/scuba-diving.jpg"],
  },
};

export default function ScubaPage() {
  return <ZonePageClient zoneId="scuba" name="Scuba Diving" />;
}
