import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";

export const metadata: Metadata = {
  title: "Tube Rides | Zeppelin Beach",
  description:
    "High-speed tube rides on the sea — Single, Twister, Banana, Family Couch, Group Couch. At Zeppelin Beach, Pula.",
};

export default function TubePage() {
  return <ZonePageClient zoneId="tube" name="Tube Rides" />;
}
