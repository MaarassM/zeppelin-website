import type { Metadata } from "next";
import { PrivacyPageClient } from "@/components/sections/PrivacyPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Zeppelin Beach Complex",
  description:
    "How Zeppelin Beach Complex collects, uses, and protects your personal data.",
  alternates: { canonical: "https://www.zeppelinbar.hr/privacy" },
  openGraph: {
    title: "Privacy Policy | Zeppelin Beach Complex",
    description:
      "How Zeppelin Beach Complex collects, uses, and protects your personal data.",
    url: "https://www.zeppelinbar.hr/privacy",
    siteName: "Zeppelin Beach Complex",
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Zeppelin Beach Complex",
    description:
      "How Zeppelin Beach Complex collects, uses, and protects your personal data.",
  },
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
