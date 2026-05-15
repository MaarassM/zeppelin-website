"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { ActivityGallery } from "@/components/ui/ActivityGallery";
import { PdfModal } from "@/components/ui/PdfModal";

const CONFIG = {
  fastfood: {
    image: "/assets/food/DSC09600.jpg",
    pageKey: "fastfood_page" as const,
    tag: "BITES & SWEETS",
    menuPdf: "/assets/menus/fastfood-menu.pdf",
    menuTitle: "Fast Food Menu",
  },
  gelato: {
    image: "/assets/gelato.jpg",
    pageKey: "gelato_page" as const,
    tag: "BITES & SWEETS",
    menuPdf: "/assets/menus/gelato-menu.pdf",
    menuTitle: "Gelato Menu",
  },
} as const;

interface GastroPageClientProps {
  item: "fastfood" | "gelato";
  name: string;
  gallery?: string[];
}

export function GastroPageClient({ item, name, gallery = [] }: GastroPageClientProps) {
  const { t } = useT();
  const { image, pageKey, tag, menuPdf, menuTitle } = CONFIG[item];
  const page = t.gastro[pageKey];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[360px]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />

        {/* Back button */}
        <Link
          href="/#gastro"
          className="absolute top-20 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold hover:bg-black/50 transition-all"
        >
          <ArrowLeft size={14} />
          {t.careers.back_btn}
        </Link>

        {/* Name + tagline */}
        <div className="absolute bottom-8 left-6 right-6 lg:left-[120px] lg:right-[120px] max-w-[800px]">
          <p className="text-red-400 text-xs font-medium uppercase tracking-widest mb-2">
            {tag}
          </p>
          <h1 className="font-display text-white text-[40px] lg:text-[64px] leading-none mb-3">
            {name}
          </h1>
          <p className="text-white/70 text-lg lg:text-xl leading-snug">
            {page.tagline}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-[120px] py-12 lg:py-20 max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-20">
          <p className="text-dark/80 text-base lg:text-lg leading-relaxed max-w-[600px]">
            {page.description}
          </p>

          <div>
            <button
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center justify-center w-full px-6 h-11 bg-dark text-cream font-display text-sm tracking-widest rounded-lg hover:bg-dark/80 transition-colors cursor-pointer"
            >
              {t.gastro.menu_btn.toUpperCase()} →
            </button>
          </div>
        </div>

        <ActivityGallery images={gallery} />
      </div>

      <PdfModal
        src={menuPdf}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        title={menuTitle}
      />
    </div>
  );
}
