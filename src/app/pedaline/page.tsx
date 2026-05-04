import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";

export const metadata: Metadata = {
  title: "Pedal Boat & SUP | Zeppelin Beach",
  description:
    "Pedal boats and stand-up paddleboards available at Zeppelin Beach, Pula. Explore the bay at your own pace.",
};

export default function PedalinePage() {
  return <ZonePageClient zoneId="pedaline" name="Pedal Boat & SUP" />;
}
