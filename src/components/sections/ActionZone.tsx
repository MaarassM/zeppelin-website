"use client";

import {
  Waves,
  ChevronsUp,
  Sailboat,
  Wind,
  Zap,
  Fish,
  Droplet,
  Kayak,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useT } from "@/lib/i18n";
import { ActivityCard } from "@/components/ui/ActivityCard";
import { Wave } from "@/components/ui/Wave";

const ICONS: Record<string, LucideIcon> = {
  wibit: Waves,
  tramp: ChevronsUp,
  pedaline: Sailboat,
  sup: Kayak,
  tube: Wind,
  jetski: Zap,
  scuba: Fish,
  flyboard: Droplet,
};

const IMAGES: Record<string, string> = {
  wibit: "/assets/wibit.jpg",
  tramp: "/assets/Trampolin/IMG_1181.JPG",
  pedaline: "/assets/Pedalina/IMG_1532.JPG",
  sup: "/assets/pedaline.jpg",
  tube: "/assets/tube.jpg",
  jetski: "/assets/jet-ski.jpg",
  scuba: "/assets/scuba-diving.jpg",
  flyboard: "/assets/Flyboard/IMG_1528.JPG",
};

const HREFS: Record<string, string> = {
  wibit: "/wibit",
  tramp: "/trampoline",
  pedaline: "/pedaline",
  sup: "/sup",
  tube: "/tube",
  jetski: "/jetski",
  scuba: "/scuba",
  flyboard: "/flyboard",
};

export function ActionZone() {
  const { t } = useT();

  return (
    <section
      id="action"
      className="relative overflow-hidden bg-red pt-16 pb-24 lg:pt-24 lg:pb-36"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10 px-5 sm:px-8 lg:gap-14 lg:px-10">
        <div className="reveal flex flex-col gap-4">
          <h2 className="max-w-[14ch] font-display text-[40px] leading-[0.95] text-white sm:text-5xl lg:text-[72px]">
            {t.action.heading}
          </h2>
          <p className="text-base text-white/70 lg:text-lg">
            {t.ui.cards_hint}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:gap-5">
          {t.action.activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              icon={ICONS[activity.id] ?? Waves}
              image={IMAGES[activity.id] ?? ""}
              name={activity.name}
              meta={activity.pricing}
              href={HREFS[activity.id]}
              className="reveal text-white"
              sizes="(max-width: 768px) 50vw, 300px"
            />
          ))}
        </div>
      </div>

      <Wave fill="var(--color-cream)" variant={2} flip />
    </section>
  );
}
