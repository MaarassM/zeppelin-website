"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { useT } from "@/lib/i18n";

const CONFIG = {
  fastfood: {
    image: "/assets/food/DSC09600.jpg",
    pageKey: "fastfood_page" as const,
    tag: "BITES & SWEETS",
  },
  gelato: {
    image: "/assets/gelato.jpg",
    pageKey: "gelato_page" as const,
    tag: "BITES & SWEETS",
  },
} as const;

interface GastroPageClientProps {
  item: "fastfood" | "gelato";
  name: string;
}

export function GastroPageClient({ item, name }: GastroPageClientProps) {
  const { t } = useT();
  const { image, pageKey, tag } = CONFIG[item];
  const page = t.gastro[pageKey];

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
          {/* Left: description + features */}
          <div className="flex flex-col gap-8">
            <p className="text-dark/80 text-base lg:text-lg leading-relaxed max-w-[600px]">
              {page.description}
            </p>

            {page.features.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="text-dark/40 text-xs uppercase tracking-widest">
                  What&apos;s on offer
                </p>
                <div className="flex flex-wrap gap-2">
                  {page.features.map((feature: string) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 rounded-full border border-dark/20 text-dark/70 text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: hours + menu link */}
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-dark/10 bg-dark/5 p-6 flex flex-col gap-4">
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-dark/40 mt-0.5 shrink-0" />
                <div>
                  <p className="text-dark/40 text-xs uppercase tracking-widest mb-1">
                    Hours
                  </p>
                  <p className="font-display text-dark text-xl">{page.hours}</p>
                </div>
              </div>
              <div className="border-t border-dark/10 pt-4">
                <Link
                  href="/food"
                  className="inline-flex items-center justify-center w-full px-6 h-11 bg-dark text-cream font-display text-sm tracking-widest rounded-lg hover:bg-dark/80 transition-colors"
                >
                  {t.gastro.menu_btn.toUpperCase()} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
