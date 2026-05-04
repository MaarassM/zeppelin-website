"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { trackOutbound } from "@/lib/analytics";

export function Hero() {
  const { t } = useT();

  return (
    <section className="relative w-full h-[95dvh] flex flex-col items-center justify-center overflow-hidden pb-16 lg:pb-24">
      {/* Full-bleed beach photo */}
      <Image
        src="/assets/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center] md:object-center"
      />

      {/* Gradient overlay — light touch so photo stays visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/[0.42] via-black/[0.32] to-black/55" />

      {/* Centered content — logo + single CTA */}
      <div className="relative z-10 flex flex-col items-center gap-7">
        <Image
          src="/assets/logo-extended.png"
          alt="Zeppelin Beach Complex"
          width={360}
          height={130}
          sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 360px"
          className="h-72 sm:h-60 lg:h-72 w-auto"
          priority
        />
        <Button
          as="a"
          href="https://www.google.com/maps/search/Zeppelin+Beach+lounge+bar+Pula"
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          onClick={() => trackOutbound("hero-maps")}
          className="font-display tracking-widest text-sm lg:text-base"
        >
          {t.hero.find_us.toUpperCase()} ↗
        </Button>
        <Button
          as="a"
          href="https://www.zeppelin-adventure.com"
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          onClick={() => trackOutbound("hero-cta")}
          className="font-display tracking-widest text-sm lg:text-base"
        >
          {t.nav.rezerviraj.toUpperCase()} ↗
        </Button>
      </div>

      {/* Scroll cue — animated vertical line, suppressed by prefers-reduced-motion */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-40"
        aria-hidden="true"
      >
        <div
          className="w-px h-6 bg-white animate-scroll-cue"
          style={{ transformOrigin: "top" }}
        />
      </div>

      {/* Cream wave — bleeds into the BarRelax section below */}
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
            d="M0,62 C216,24 360,76 576,48 C756,24 900,72 1116,40 C1260,18 1368,60 1440,44 L1440,80 L0,80 Z"
            fill="#F0EAD2"
          />
        </svg>
      </div>
    </section>
  );
}
