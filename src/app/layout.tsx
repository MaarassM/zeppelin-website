import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { LocaleProvider } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { CookieNotice } from "@/components/ui/CookieNotice";
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
    "Beach bar, vodeni sportovi, avanture i gastro na Saccorgiana plaži u Puli. Jet ski, ronjenje, Wibit Park, kokteli i hrana — sve na jednom mjestu.",
  keywords: [
    "beach bar pula",
    "zeppelin bar pula",
    "zeppelin beach complex",
    "saccorgiana",
    "saccorgiana beach pula",
    "jet ski pula",
    "ronjenje pula",
    "scuba diving pula",
    "vodeni sportovi pula",
    "wibit park pula",
    "pedaline pula",
    "beach bar hrvatska",
    "plaža pula",
    "aktivnosti na plaži pula",
    "bar plaža pula",
  ],
  alternates: {
    canonical: "https://zeppelinbar.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Zeppelin Beach Complex | Saccorgiana Beach, Pula",
    description:
      "Beach bar, vodeni sportovi, avanture i gastro na Saccorgiana plaži u Puli. Tvoja baza za chill i polazište za svaku avanturu.",
    url: "https://zeppelinbar.com",
    siteName: "Zeppelin Beach Complex",
    locale: "hr_HR",
    type: "website",
    images: [
      {
        url: "https://zeppelinbar.com/assets/hero.jpg",
        width: 1280,
        height: 853,
        alt: "Zeppelin Beach Complex — Saccorgiana Beach, Pula",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeppelin Beach Complex | Saccorgiana Beach, Pula",
    description:
      "Beach bar, vodeni sportovi, avanture i gastro na Saccorgiana plaži u Puli.",
    images: ["https://zeppelinbar.com/assets/hero.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "BarOrPub", "SportsActivityLocation"],
  name: "Zeppelin Beach Complex",
  description:
    "Beach bar, water sports, adventures and gastro on Saccorgiana Beach in Pula, Croatia. Jet ski, scuba diving, Wibit Park, cocktails, fast food and gelato.",
  url: "https://zeppelinbar.com",
  telephone: "+38591254511 7",
  image: "https://zeppelinbar.com/assets/hero.jpg",
  logo: "https://zeppelinbar.com/assets/logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Saccorgiana Beach",
    addressLocality: "Pula",
    postalCode: "52100",
    addressCountry: "HR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "02:00",
      name: "Bar",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "19:00",
      name: "Water Sports",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Activities & Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Jet Ski",
          url: "https://zeppelinbar.com/jetski",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Scuba Diving",
          url: "https://zeppelinbar.com/scuba",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Wibit Park",
          url: "https://zeppelinbar.com/wibit",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tube Rides",
          url: "https://zeppelinbar.com/tube",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pedal Boat & SUP",
          url: "https://zeppelinbar.com/pedaline",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Trampoline",
          url: "https://zeppelinbar.com/trampoline",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "FoodService", name: "Beach Bar", url: "https://zeppelinbar.com/bar" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "FoodService", name: "Fast Food", url: "https://zeppelinbar.com/fastfood" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "FoodService", name: "Gelato Bar", url: "https://zeppelinbar.com/gelato" },
      },
    ],
  },
  sameAs: [
    "https://www.instagram.com/zeppelin_bar_pula",
    "https://www.facebook.com/ZeppelinBeachBar",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr" className={`${anton.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LocaleProvider>
          <Header />
          {children}
          <CookieNotice />
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
