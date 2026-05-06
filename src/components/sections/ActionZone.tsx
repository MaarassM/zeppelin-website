"use client";

import {
  Waves,
  ChevronsUp,
  Sailboat,
  Wind,
  Info,
  Zap,
  Fish,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useT } from "@/lib/i18n";
import { SectionTag } from "@/components/ui/SectionTag";
import { ActivityCard } from "@/components/ui/ActivityCard";

const ICONS: Record<string, LucideIcon> = {
  wibit: Waves,
  tramp: ChevronsUp,
  pedaline: Sailboat,
  tube: Wind,
  jetski: Zap,
  scuba: Fish,
};

const IMAGES: Record<string, string> = {
  wibit: "/assets/wibit.jpg",
  tramp: "/assets/trampoline.jpg",
  pedaline: "/assets/pedaline.jpg",
  tube: "/assets/tube.jpg",
  jetski: "/assets/jet-ski.jpg",
  scuba: "/assets/scuba-diving.jpg",
};

const HREFS: Record<string, string> = {
  wibit: "/wibit",
  tramp: "/trampoline",
  pedaline: "/pedaline",
  tube: "/tube",
  jetski: "/jetski",
  scuba: "/scuba",
};

export function ActionZone() {
  const { t } = useT();

  return (
    <section
      id="action"
      className="bg-red pt-16 pb-32 lg:pt-20 lg:pb-44 px-6 lg:px-[120px] relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
          <div className="flex flex-col gap-2">
            <SectionTag light>{t.action.tag}</SectionTag>
            <h2 className="font-display text-white text-[34px] lg:text-[52px] leading-none max-w-[600px]">
              {t.action.heading}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              {t.ui.cards_hint}
            </p>
          </div>
        </div>

        {/* Cards grid — 2col mobile, 3col desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {t.action.activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              icon={ICONS[activity.id] ?? Waves}
              image={IMAGES[activity.id] ?? ""}
              name={activity.name}
              href={HREFS[activity.id]}
            />
          ))}
        </div>
      </div>
      {/* Cream wave — bleeds into the Adventure section below */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 leading-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-16 lg:h-24"
        >
          <path
            d="M0,56 C120,18 280,70 480,38 C660,8 820,66 1020,36 C1180,12 1320,64 1440,30 L1440,80 L0,80 Z"
            fill="#F0EAD2"
          />
        </svg>
      </div>
    </section>
  );
}
