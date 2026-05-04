import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";

export const metadata: Metadata = {
  title: "Trampoline | Zeppelin Beach",
  description:
    "Water trampoline anchored off the shore — jump high and land in the sea. All ages welcome at Zeppelin Beach, Pula.",
};

export default function TrampolinePage() {
  return <ZonePageClient zoneId="tramp" name="Trampoline" />;
}
