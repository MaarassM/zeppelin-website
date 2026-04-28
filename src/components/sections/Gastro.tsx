"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";
import { SectionTag } from "@/components/ui/SectionTag";

export function Gastro() {
  const { t } = useT();

  return (
    <section
      id="gastro"
      className="bg-red pt-16 pb-32 lg:pt-20 lg:pb-44 px-6 lg:px-[120px] relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
        {/* Left: title + CTA */}
        <div className="flex flex-col gap-6 lg:w-[480px] shrink-0">
          <SectionTag light>{t.gastro.tag}</SectionTag>
          <h2 className="font-display text-white text-[34px] lg:text-[52px] leading-none whitespace-pre-line">
            {t.gastro.heading}
          </h2>
          <a
            href="/food"
            className="self-start flex items-center justify-center px-8 h-12 border-2 border-white text-white font-display text-sm tracking-widest rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            {t.gastro.menu_btn.toUpperCase()} →
          </a>
        </div>

        {/* Right: 2 photo cards */}
        <div className="grid grid-cols-2 gap-4 w-full lg:flex-1">
          <div className="relative overflow-hidden rounded-2xl h-40 lg:h-56">
            <Image
              src="/assets/food/DSC09600.jpg"
              alt="Fast food"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 300px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-8 flex flex-col gap-1">
              <p className="font-display text-white text-lg lg:text-2xl">
                {t.gastro.fastfood_name}
              </p>
              <p className="text-white/75 text-xs lg:text-sm">
                {t.gastro.fastfood_desc}
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl h-40 lg:h-56">
            <Image
              src="/assets/gelato.jpg"
              alt="Gelato"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 300px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-8 flex flex-col gap-1">
              <p className="font-display text-white text-lg lg:text-2xl">
                {t.gastro.gelato_name}
              </p>
              <p className="text-white/75 text-xs lg:text-sm">
                {t.gastro.gelato_desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dark wave — bleeds into the Careers section below */}
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
            d="M0,68 C140,30 300,76 520,42 C700,12 880,70 1100,38 C1260,14 1380,58 1440,62 L1440,80 L0,80 Z"
            fill="#1A1A1A"
          />
        </svg>
      </div>
    </section>
  );
}
