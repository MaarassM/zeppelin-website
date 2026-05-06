import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";

export const metadata: Metadata = {
  title: "Trampolin na Vodi Pula | Zeppelin Beach",
  description:
    "Vodeni trampolin uz obalu — skoči visoko i padni u more. Za sve uzraste, Saccorgiana plaža, Pula. Zeppelin Beach.",
  keywords: ["trampolin pula", "vodeni trampolin pula", "water trampoline pula", "aktivnosti za djecu pula", "vodeni sportovi pula"],
  alternates: { canonical: "https://zeppelinbar.com/trampoline" },
  openGraph: {
    title: "Trampolin na Vodi Pula | Zeppelin Beach",
    description: "Vodeni trampolin uz obalu — skoči visoko i padni u more. Za sve uzraste. Saccorgiana, Pula.",
    url: "https://zeppelinbar.com/trampoline",
    siteName: "Zeppelin Beach Complex",
    images: [{ url: "https://zeppelinbar.com/assets/trampoline.jpg", width: 1280, height: 853, alt: "Trampolin na Vodi Pula — Zeppelin Beach" }],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trampolin na Vodi Pula | Zeppelin Beach",
    description: "Vodeni trampolin uz obalu — skoči i padni u more. Zeppelin Beach, Pula.",
    images: ["https://zeppelinbar.com/assets/trampoline.jpg"],
  },
};

export default function TrampolinePage() {
  return <ZonePageClient zoneId="tramp" name="Trampoline" />;
}
