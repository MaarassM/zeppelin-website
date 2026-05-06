"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Wine, Sun } from "lucide-react";
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
        <div className="max-w-[1200px] mx-auto flex flex-col xl:flex-row items-start gap-10 xl:gap-16">
          <div className="flex flex-col gap-5 xl:w-[480px] shrink-0">
            <SectionTag>{t.bar.tag}</SectionTag>
            <h2 className="font-display text-dark text-[34px] lg:text-[52px] leading-none">
              {t.bar.heading}
            </h2>
            <p className="text-body/60 text-sm leading-relaxed">
              {t.ui.cards_hint}
            </p>
          </div>

          {/* Right: 2 photo cards + button */}
          <div className="flex flex-col gap-4 w-full lg:flex-1">
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/bar"
                className="relative flex flex-col justify-end gap-1 p-4 rounded-xl overflow-hidden min-h-[180px] lg:min-h-[220px]"
              >
                <Image
                  src="/assets/bar.jpg"
                  alt={t.bar.bar_name}
                  fill
                  className="object-cover object-bottom transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors duration-200" />
                <div className="relative flex flex-col gap-1">
                  <Wine className="text-white/80 mb-1" size={22} strokeWidth={1.5} />
                  <p className="font-display text-white text-sm leading-tight">{t.bar.bar_name}</p>
                </div>
              </Link>
              <Link
                href="/relax"
                className="relative flex flex-col justify-end gap-1 p-4 rounded-xl overflow-hidden min-h-[180px] lg:min-h-[220px]"
              >
                <Image
                  src="/assets/relax.jpg"
                  alt={t.bar.relax_name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors duration-200" />
                <div className="relative flex flex-col gap-1">
                  <Sun className="text-white/80 mb-1" size={22} strokeWidth={1.5} />
                  <p className="font-display text-white text-sm leading-tight">{t.bar.relax_name}</p>
                </div>
              </Link>
            </div>
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
