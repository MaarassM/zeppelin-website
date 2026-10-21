"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Clock, MapPin, X } from "lucide-react";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { trackOutbound } from "@/lib/analytics";
import { Wave } from "@/components/ui/Wave";
import { OpeningHours } from "@/components/ui/OpeningHours";

export function Hero() {
  const { t } = useT();
  const [hoursOpen, setHoursOpen] = useState(false);

  useEffect(() => {
    if (!hoursOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setHoursOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [hoursOpen]);

  return (
    <section className="relative isolate flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-24 lg:pb-32 lg:pt-28">
      <Image
        src="/assets/hero-wibit.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[35%_center] md:object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/15 via-black/0 to-black/55" />

      <div className="flex w-full flex-col items-center gap-8 lg:gap-10">
        <Image
          src="/assets/logo-hero.png"
          alt="Zeppelin Beach & Lounge Bar"
          width={1600}
          height={991}
          sizes="(max-width: 640px) 70vw, 440px"
          className="rise h-auto w-[min(70vw,280px)] drop-shadow-[0_12px_32px_rgba(0,0,0,0.35)] sm:w-[360px] lg:w-[440px]"
          priority
        />

        <div
          className="rise flex w-full max-w-[320px] flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center"
          style={{ animationDelay: "150ms" }}
        >
          <Button
            as="a"
            href="https://www.google.com/maps/search/Zeppelin+Beach+lounge+bar+Pula"
            target="_blank"
            rel="noopener noreferrer"
            variant="solid-red"
            size="lg"
            onClick={() => trackOutbound("hero-maps")}
          >
            <MapPin size={17} strokeWidth={2} />
            {t.hero.find_us.toUpperCase()}
          </Button>
          <Button
            as="a"
            href="https://www.zeppelin-adventure.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="cream"
            size="lg"
            onClick={() => trackOutbound("hero-cta")}
          >
            {t.nav.rezerviraj.toUpperCase()}
          </Button>
          <Button variant="glass" size="lg" onClick={() => setHoursOpen(true)}>
            <Clock size={17} strokeWidth={2} />
            {t.hero.hours_btn.toUpperCase()}
          </Button>
        </div>
      </div>

      {hoursOpen && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.footer.hours_title}
          className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6"
          onClick={() => setHoursOpen(false)}
        >
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" />
          <div
            className="rise relative w-full max-w-md rounded-[24px] bg-cream-soft p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="font-display text-[28px] leading-none text-dark">
                {t.footer.hours_title}
              </p>
              <button
                onClick={() => setHoursOpen(false)}
                className="grid size-10 place-items-center rounded-full bg-dark/5 text-dark/60 transition-colors hover:bg-dark/10 hover:text-dark cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="rounded-[16px] bg-white/70 p-4 sm:p-5">
              <OpeningHours tone="onLight" />
            </div>
          </div>
        </div>,
        document.body
      )}

      <Wave fill="var(--color-cream)" back="var(--color-cream)" backOpacity={0.5} variant={0} />
    </section>
  );
}
