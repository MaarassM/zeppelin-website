import type { Metadata } from "next";
import { PrivacyPageClient } from "@/components/sections/PrivacyPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Zeppelin Beach Complex",
  description:
    "How Zeppelin Beach Complex collects, uses, and protects your personal data.",
  alternates: { canonical: "https://zeppelinbar.com/privacy" },
  openGraph: {
    title: "Privacy Policy | Zeppelin Beach Complex",
    description:
      "How Zeppelin Beach Complex collects, uses, and protects your personal data.",
    url: "https://zeppelinbar.com/privacy",
    siteName: "Zeppelin Beach Complex",
    locale: "hr_HR",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
