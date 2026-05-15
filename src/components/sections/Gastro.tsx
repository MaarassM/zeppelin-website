"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Utensils, IceCreamCone } from "lucide-react";
import { useT } from "@/lib/i18n";
import { SectionTag } from "@/components/ui/SectionTag";
import { PdfModal } from "@/components/ui/PdfModal";

export function Gastro() {
  const { t } = useT();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <section
      id="gastro"
      className="bg-red pt-16 pb-32 lg:pt-20 lg:pb-44 px-6 lg:px-[120px] relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col xl:flex-row items-start gap-10 xl:gap-16">
        {/* Left: title + CTA (button visible on xl+) */}
        <div className="flex flex-col gap-6 xl:w-[480px] shrink-0">
          <SectionTag light>{t.gastro.tag}</SectionTag>
          <h2 className="font-display text-white text-[34px] lg:text-[52px] leading-none whitespace-pre-line">
            {t.gastro.heading}
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            {t.ui.cards_hint}
          </p>
          <button
            onClick={() => setMenuOpen(true)}
            className="hidden xl:flex self-start items-center justify-center px-8 h-12 border-2 border-white text-white font-display text-sm tracking-widest rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            {t.gastro.menu_btn.toUpperCase()} →
          </button>
        </div>

        {/* Right: 2 photo cards + button (button visible on mobile only) */}
        <div className="flex flex-col gap-4 w-full lg:flex-1">
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/fastfood"
              className="relative flex flex-col justify-end gap-1 p-4 rounded-xl overflow-hidden min-h-[180px] lg:min-h-[220px]"
            >
              <Image
                src="/assets/food/DSC09600.jpg"
                alt="Fast food"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors duration-200" />
              <div className="relative flex flex-col gap-1">
                <Utensils
                  className="text-white/80 mb-1"
                  size={22}
                  strokeWidth={1.5}
                />
                <p className="font-display text-white text-sm leading-tight">
                  {t.gastro.fastfood_name}
                </p>
              </div>
            </Link>
            <Link
              href="/gelato"
              className="relative flex flex-col justify-end gap-1 p-4 rounded-xl overflow-hidden min-h-[180px] lg:min-h-[220px]"
            >
              <Image
                src="/assets/gelato.jpg"
                alt="Gelato"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors duration-200" />
              <div className="relative flex flex-col gap-1">
                <IceCreamCone
                  className="text-white/80 mb-1"
                  size={22}
                  strokeWidth={1.5}
                />
                <p className="font-display text-white text-sm leading-tight">
                  {t.gastro.gelato_name}
                </p>
              </div>
            </Link>
          </div>
          <button
            onClick={() => setMenuOpen(true)}
            className="xl:hidden self-start flex items-center justify-center px-8 h-12 border-2 border-white text-white font-display text-sm tracking-widest rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            {t.gastro.menu_btn.toUpperCase()} →
          </button>
        </div>
      </div>

      <PdfModal
        src="/assets/menus/food-menu.pdf"
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Food Menu"
      />

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
