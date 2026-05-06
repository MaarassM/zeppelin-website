"use client";

import { useT } from "@/lib/i18n";
import { SectionTag } from "@/components/ui/SectionTag";
import { AdventureCard } from "@/components/ui/AdventureCard";

const IMAGES: Record<string, string> = {
  jetski: "/assets/jet.jpg",
  buggy: "/assets/buggy.jpg",
  flyboard: "/assets/flyboard.jpg",
  parasail: "/assets/parasailing.jpg",
};

export function Adventure() {
  const { t } = useT();

  return (
    <section
      id="adventure"
      className="bg-cream pt-12 pb-28 lg:pt-20 lg:pb-44 px-6 lg:px-[120px] relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
          <div className="flex flex-col gap-2">
            <SectionTag>{t.adventure.tag}</SectionTag>
            <h2 className="font-display text-dark text-[34px] lg:text-[52px] leading-none max-w-[620px]">
              {t.adventure.heading}
            </h2>
            <p className="text-body/60 text-sm leading-relaxed">
              {t.ui.cards_hint}
            </p>
          </div>
        </div>

        {/* Cards grid — 2col mobile, 4col desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {t.adventure.items.map((item) => (
            <AdventureCard
              key={item.id}
              name={item.name}
              url={item.url}
              ctaLabel={t.adventure.cta}
              image={IMAGES[item.id] ?? ""}
            />
          ))}
        </div>
      </div>

      {/* Red wave — bleeds into the Gastro section below */}
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
            d="M0,44 C200,80 360,14 600,58 C800,94 960,20 1160,50 C1300,70 1400,32 1440,20 L1440,80 L0,80 Z"
            fill="#D61F3C"
          />
        </svg>
      </div>
    </section>
  );
}
