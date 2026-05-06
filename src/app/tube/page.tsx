import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";

export const metadata: Metadata = {
  title: "Tube Rides Pula | Zeppelin Beach",
  description:
    "Adrenalinske tube vožnje morem — Single, Banana, Twister, Family i Group Couch. Saccorgiana plaža, Pula. Zeppelin Beach.",
  keywords: ["tube vožnja pula", "banana boat pula", "tube rides pula", "adrenalinske aktivnosti pula", "vodeni sportovi pula"],
  alternates: { canonical: "https://zeppelinbar.com/tube" },
  openGraph: {
    title: "Tube Rides Pula | Zeppelin Beach",
    description:
      "Adrenalinske tube vožnje morem — banana, twister, family i group couch. Saccorgiana plaža, Pula.",
    url: "https://zeppelinbar.com/tube",
    siteName: "Zeppelin Beach Complex",
    images: [{ url: "https://zeppelinbar.com/assets/tube.jpg", width: 1280, height: 853, alt: "Tube Rides Pula — Zeppelin Beach" }],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tube Rides Pula | Zeppelin Beach",
    description: "Adrenalinske tube vožnje morem — Zeppelin Beach, Saccorgiana, Pula.",
    images: ["https://zeppelinbar.com/assets/tube.jpg"],
  },
};

export default function TubePage() {
  return <ZonePageClient zoneId="tube" name="Tube Rides" />;
}
