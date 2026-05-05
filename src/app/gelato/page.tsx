import type { Metadata } from "next";
import { GastroPageClient } from "@/components/ui/GastroPageClient";

export const metadata: Metadata = {
  title: "Gelato Bar | Zeppelin Beach",
  description:
    "Handcrafted gelato and smoothie bowls made with fresh ingredients at Zeppelin Beach, Pula.",
};

export default function GelatoPage() {
  return <GastroPageClient item="gelato" name="Gelato Bar" />;
}
