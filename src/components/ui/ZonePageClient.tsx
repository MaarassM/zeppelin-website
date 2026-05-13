"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { useT } from "@/lib/i18n";
import { ActivityGallery } from "@/components/ui/ActivityGallery";

const IMAGES: Record<string, string> = {
  wibit: "/assets/wibit.jpg",
  tramp: "/assets/trampoline.jpg",
  pedaline: "/assets/pedaline.jpg",
  tube: "/assets/tube.jpg",
  jetski: "/assets/jet-ski.jpg",
  scuba: "/assets/scuba-diving.jpg",
};

interface ZonePageClientProps {
  zoneId: "wibit" | "tramp" | "pedaline" | "tube" | "jetski" | "scuba";
  name: string;
  gallery?: string[];
}

export function ZonePageClient({ zoneId, name, gallery = [] }: ZonePageClientProps) {
  const { t } = useT();
  const zone = t.zones[zoneId];
  const image = IMAGES[zoneId];

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
          href="/#action"
          className="absolute top-20 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold hover:bg-black/50 transition-all"
        >
          <ArrowLeft size={14} />
          {t.careers.back_btn}
        </Link>

        {/* Zone name + tagline */}
        <div className="absolute bottom-8 left-6 right-6 lg:left-[120px] lg:right-[120px] max-w-[800px]">
          <p className="text-red-400 text-xs font-medium uppercase tracking-widest mb-2">
            ACTION ZONE
          </p>
          <h1 className="font-display text-white text-[40px] lg:text-[64px] leading-none mb-3">
            {name}
          </h1>
          <p className="text-white/70 text-lg lg:text-xl leading-snug">
            {zone.tagline}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-[120px] py-12 lg:py-20 max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-20">
          {/* Left: description + features */}
          <div className="flex flex-col gap-8">
            <p className="text-dark/80 text-base lg:text-lg leading-relaxed max-w-[600px]">
              {zone.description}
            </p>

            {zone.features.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="text-dark/40 text-xs uppercase tracking-widest">
                  What&apos;s included
                </p>
                <div className="flex flex-wrap gap-2">
                  {zone.features.map((feature: string) => (
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

          {/* Right: pricing info */}
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-dark/10 bg-dark/5 p-6 flex flex-col gap-4">
              <div>
                <p className="text-dark/40 text-xs uppercase tracking-widest mb-1">
                  Pricing
                </p>
                <p className="font-display text-dark text-2xl">{zone.pricing}</p>
              </div>
              <div className="border-t border-dark/10 pt-4 flex items-start gap-2">
                <MapPin size={14} className="text-dark/40 mt-0.5 shrink-0" />
                <p className="text-dark/50 text-sm leading-relaxed">
                  {zone.pay_note}
                </p>
              </div>
            </div>
          </div>
        </div>

        <ActivityGallery images={gallery} />
      </div>
    </div>
  );
}
