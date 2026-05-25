import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";

export const metadata: Metadata = {
  title: "Trampolin na Vodi Pula | Zeppelin Beach",
  description:
    "Vodeni trampolin uz obalu — skoči visoko i padni u more. Za sve uzraste, Saccorgiana plaža, Pula. Zeppelin Beach.",
  keywords: [
    "trampolin pula",
    "vodeni trampolin pula",
    "water trampoline pula",
    "aktivnosti za djecu pula",
    "vodeni sportovi pula",
  ],
  alternates: { canonical: "https://www.zeppelinbar.hr/trampoline" },
  openGraph: {
    title: "Trampolin na Vodi Pula | Zeppelin Beach",
    description:
      "Vodeni trampolin uz obalu — skoči visoko i padni u more. Za sve uzraste. Saccorgiana, Pula.",
    url: "https://www.zeppelinbar.hr/trampoline",
    siteName: "Zeppelin Beach Complex",
    images: [
      {
        url: "https://www.zeppelinbar.hr/assets/trampoline.jpg",
        width: 1280,
        height: 853,
        alt: "Trampolin na Vodi Pula — Zeppelin Beach",
      },
    ],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trampolin na Vodi Pula | Zeppelin Beach",
    description:
      "Vodeni trampolin uz obalu — skoči i padni u more. Zeppelin Beach, Pula.",
    images: ["https://www.zeppelinbar.hr/assets/trampoline.jpg"],
  },
};

export default function TrampolinePage() {
  return (
    <ZonePageClient zoneId="tramp" name="Trampoline" gallery={[]} hidePricing />
  );
}
