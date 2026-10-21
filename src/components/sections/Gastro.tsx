"use client";

import { ArrowRight, Utensils, IceCreamCone } from "lucide-react";
import { useT } from "@/lib/i18n";
import { ActivityCard } from "@/components/ui/ActivityCard";
import { Button } from "@/components/ui/Button";
import { Wave } from "@/components/ui/Wave";

export function Gastro() {
  const { t } = useT();
  return (
    <section
      id="gastro"
      className="relative overflow-hidden bg-red pt-16 pb-24 lg:pt-24 lg:pb-36"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="reveal flex flex-col gap-6 lg:order-2 lg:col-span-5">
          <h2 className="whitespace-pre-line font-display text-[40px] leading-[0.95] text-white sm:text-5xl lg:text-[64px]">
            {t.gastro.heading}
          </h2>
          <p className="text-base text-white/70 lg:text-lg">
            {t.ui.cards_hint}
          </p>
          <Button
            as="a"
            href="/cjenik/fastfood"
            variant="outline"
            className="self-start"
          >
            {t.gastro.menu_btn.toUpperCase()}
            <ArrowRight size={17} strokeWidth={2.25} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="reveal grid grid-cols-2 gap-3 sm:gap-4 lg:order-1 lg:col-span-7 lg:gap-5">
          <ActivityCard
            icon={Utensils}
            image="/assets/food/DSC09600.jpg"
            name={t.gastro.fastfood_name}
            meta={t.gastro.fastfood_desc}
            href="/fastfood"
            className="lg:translate-y-10"
            sizes="(max-width: 1024px) 50vw, 360px"
          />
          <ActivityCard
            icon={IceCreamCone}
            image="/assets/gelato.jpg"
            name={t.gastro.gelato_name}
            meta={t.gastro.gelato_desc}
            href="/gelato"
            sizes="(max-width: 1024px) 50vw, 360px"
          />
        </div>
      </div>

      <Wave fill="var(--color-dark)" variant={1} flip />
    </section>
  );
}
