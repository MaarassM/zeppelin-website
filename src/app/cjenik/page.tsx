import type { Metadata } from "next";
import { CjenikIndexClient } from "@/components/cjenik/CjenikIndexClient";

export const metadata: Metadata = {
  title: "Cjenik | Zeppelin Beach Pula",
  description:
    "Važeći cjenici Zeppelin Beach Bara, Fast Fooda i Gelaterije na Saccorgiana plaži u Puli — sa sidrenim cijenama te u CSV i XML formatu.",
  alternates: { canonical: "https://www.zeppelinbar.hr/cjenik" },
  openGraph: {
    title: "Cjenik | Zeppelin Beach Pula",
    description: "Cjenici Zeppelin Beach Bara, Fast Fooda i Gelaterije — Saccorgiana plaža, Pula.",
    url: "https://www.zeppelinbar.hr/cjenik",
    siteName: "Zeppelin Beach Bar",
    locale: "hr_HR",
    type: "website",
  },
};

export default function CjenikPage() {
  return <CjenikIndexClient />;
}
