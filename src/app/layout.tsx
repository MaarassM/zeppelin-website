import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { LocaleProvider } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import "@/app/globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zeppelin Beach Complex | Saccorgiana Beach, Pula",
  description:
    "Beach bar, vodeni sportovi, avanture i gastro na Saccorgiana plaži u Puli. Tvoja baza za chill i polazište za svaku avanturu.",
  keywords: [
    "beach bar pula",
    "zeppelin bar",
    "saccorgiana",
    "vodeni sportovi pula",
    "jet ski pula",
  ],
  openGraph: {
    title: "Zeppelin Beach Complex",
    description: "Tvoja baza za chill i polazište za svaku avanturu.",
    url: "https://zeppelinbar.com",
    siteName: "Zeppelin Beach Complex",
    locale: "hr_HR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr" className={`${anton.variable} ${inter.variable}`}>
      <body>
        <LocaleProvider>
          <Header />
          {children}
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
