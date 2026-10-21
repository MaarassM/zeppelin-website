"use client";

import { ArrowRight, Wine, Sun } from "lucide-react";
import { useT } from "@/lib/i18n";
import { SectionTag } from "@/components/ui/SectionTag";
import { ActivityCard } from "@/components/ui/ActivityCard";
import { Button } from "@/components/ui/Button";
import { Wave } from "@/components/ui/Wave";

export function BarRelax() {
  const { t } = useT();
  return (
    <section id="bar" className="relative overflow-hidden bg-cream pt-16 pb-24 lg:pt-24 lg:pb-36">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="reveal flex flex-col gap-6 lg:col-span-5">
          <SectionTag>{t.bar.tag}</SectionTag>
          <h2 className="font-display text-[40px] leading-[0.95] text-dark sm:text-5xl lg:text-[64px]">
            {t.bar.heading}
          </h2>
          <p className="max-w-[46ch] text-base leading-relaxed text-body lg:text-lg">
            {t.bar.description}
          </p>
          <Button
            as="a"
            href="/cjenik/bar"
            variant="solid-red"
            className="self-start"
          >
            {t.bar.menu_btn.toUpperCase()}
            <ArrowRight size={17} strokeWidth={2.25} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="reveal grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7 lg:gap-5">
          <ActivityCard
            icon={Wine}
            image="/assets/bar.jpg"
            name={t.bar.bar_name}
            meta={t.bar.bar_desc}
            href="/bar"
            imageClassName="object-bottom"
            sizes="(max-width: 1024px) 50vw, 360px"
          />
          <ActivityCard
            icon={Sun}
            image="/assets/relax.jpg"
            name={t.bar.relax_name}
            meta={t.bar.relax_desc}
            href="/relax"
            className="lg:translate-y-10"
            sizes="(max-width: 1024px) 50vw, 360px"
          />
        </div>
      </div>

      <Wave fill="var(--color-red)" variant={1} />
    </section>
  );
}
