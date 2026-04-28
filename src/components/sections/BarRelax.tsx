"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";
import { SectionTag } from "@/components/ui/SectionTag";
import { PdfModal } from "@/components/ui/PdfModal";

export function BarRelax() {
  const { t } = useT();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section id="bar" className="bg-cream relative overflow-hidden">
      {/* Text content */}
      <div className="px-6 lg:px-[120px] pt-12 pb-28 lg:pt-20 lg:pb-44">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-start gap-10 lg:gap-20">
          <div className="flex flex-col gap-5 lg:w-[500px]">
            <SectionTag>{t.bar.tag}</SectionTag>
            <h2 className="font-display text-dark text-[34px] lg:text-[52px] leading-none">
              {t.bar.heading}
            </h2>
            <p className="text-body text-sm lg:text-base leading-relaxed">
              {t.bar.description}
            </p>
            <button
              onClick={() => setMenuOpen(true)}
              className="self-start flex items-center justify-center h-12 px-8 bg-red text-white font-display text-sm tracking-widest rounded-lg hover:bg-red-dark transition-colors cursor-pointer"
            >
              {t.bar.menu_btn.toUpperCase()} →
            </button>
          </div>
        </div>
      </div>

      <PdfModal
        src="/assets/menus/bar-menu.pdf"
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      {/* Red wave — bleeds into the ActionZone section below */}
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
            d="M0,30 C180,72 320,10 540,52 C720,88 880,16 1080,54 C1240,82 1360,22 1440,46 L1440,80 L0,80 Z"
            fill="#D61F3C"
          />
        </svg>
      </div>
    </section>
  );
}
