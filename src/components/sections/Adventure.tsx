"use client";

import { useT } from "@/lib/i18n";
import { SectionTag } from "@/components/ui/SectionTag";
import { AdventureCard } from "@/components/ui/AdventureCard";
import { Wave } from "@/components/ui/Wave";

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
      className="relative overflow-hidden bg-cream pt-16 pb-24 lg:pt-24 lg:pb-36"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10 lg:gap-14 lg:px-10">
        <div className="reveal flex flex-col gap-5 px-5 sm:px-8 lg:px-0">
          <SectionTag>{t.adventure.tag}</SectionTag>
          <h2 className="font-display text-[40px] leading-[0.95] text-dark sm:text-5xl lg:text-[64px]">
            {t.adventure.heading}
          </h2>
          <p className="max-w-[52ch] text-base leading-relaxed text-body lg:text-lg">
            {t.adventure.subtitle}
          </p>
        </div>

        {/* Swipeable row on phone and tablet, 4-column grid on desktop */}
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:scroll-px-8 sm:gap-4 sm:px-8 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {t.adventure.items.map((item) => (
            <div
              key={item.id}
              className="reveal w-[78vw] max-w-[320px] shrink-0 snap-start md:w-[42vw] lg:w-auto lg:max-w-none"
            >
              <AdventureCard
                name={item.name}
                url={item.url}
                ctaLabel={t.adventure.cta}
                image={IMAGES[item.id] ?? ""}
              />
            </div>
          ))}
        </div>
      </div>

      <Wave fill="var(--color-red)" variant={0} flip />
    </section>
  );
}
