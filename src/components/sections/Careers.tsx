"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";
import { SectionTag } from "@/components/ui/SectionTag";

export function Careers() {
  const { t } = useT();

  return (
    <section
      id="karijere"
      className="bg-dark py-20 lg:py-20 px-6 lg:px-[120px] relative overflow-hidden"
    >
      <div className="max-w-[680px] mx-auto flex flex-col gap-6">
        <SectionTag light>{t.careers.tag}</SectionTag>
        <h2 className="font-display text-white text-[34px] lg:text-[44px] leading-none">
          {t.careers.heading}
        </h2>
        <p className="text-white/60 text-sm">{t.careers.subtitle}</p>
        <Link
          href="/careers"
          className="self-start flex items-center justify-center h-12 px-8 bg-red text-white font-display text-sm tracking-widest rounded-lg hover:bg-red-dark transition-colors"
        >
          {t.careers.submit_btn.toUpperCase()} →
        </Link>
      </div>
      {/* Cream wave — bleeds into the Location section below */}
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
            d="M0,20 C160,60 340,8 560,50 C740,84 900,18 1120,48 C1280,68 1380,26 1440,38 L1440,80 L0,80 Z"
            fill="#F0EAD2"
          />
        </svg>
      </div>
    </section>
  );
}
