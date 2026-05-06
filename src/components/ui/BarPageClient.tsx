"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { useT } from "@/lib/i18n";

const CONFIG = {
  bar: {
    image: "/assets/bar.jpg",
    pageKey: "bar_page" as const,
    tag: "BAR & RELAX",
  },
  relax: {
    image: "/assets/relax.jpg",
    pageKey: "relax_page" as const,
    tag: "BAR & RELAX",
  },
} as const;

interface BarPageClientProps {
  item: "bar" | "relax";
  name: string;
}

export function BarPageClient({ item, name }: BarPageClientProps) {
  const { t } = useT();
  const { image, pageKey, tag } = CONFIG[item];
  const page = t.bar[pageKey];

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
          href="/#bar"
          className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back
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

          {/* Right: hours */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
