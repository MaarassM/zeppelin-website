import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";

export const metadata: Metadata = {
  title: "Wibit Park | Zeppelin Beach",
  description:
    "An inflatable obstacle course on open water — jump, climb, slide. Open for all ages at Zeppelin Beach, Pula.",
};

export default function WibitPage() {
  return <ZonePageClient zoneId="wibit" name="Wibit Park" />;
}
