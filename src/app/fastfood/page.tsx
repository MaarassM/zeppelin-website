import type { Metadata } from "next";
import { GastroPageClient } from "@/components/ui/GastroPageClient";

export const metadata: Metadata = {
  title: "Fast Food | Zeppelin Beach",
  description:
    "Burgers, sandwiches, and grilled favourites made fresh on-site at Zeppelin Beach, Pula.",
};

export default function FastFoodPage() {
  return <GastroPageClient item="fastfood" name="Fast Food" />;
}
