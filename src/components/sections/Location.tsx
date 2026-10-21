"use client";

import { ParkingCircle } from "lucide-react";
import { useT } from "@/lib/i18n";
import { Wave } from "@/components/ui/Wave";

export function Location() {
  const { t } = useT();

  return (
    <section
      id="lokacija"
      className="relative overflow-hidden bg-cream pt-16 pb-24 lg:pt-24 lg:pb-36"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-5 sm:px-8 lg:gap-12 lg:px-10">
        <div className="reveal flex flex-col gap-5">
          <h2 className="font-display text-[40px] leading-[0.95] text-dark sm:text-5xl lg:text-[64px]">
            {t.location.heading}
          </h2>
          <p className="max-w-[52ch] text-base leading-relaxed text-body lg:text-lg">
            {t.location.directions}
          </p>
          <div className="inline-flex items-center gap-2 self-start rounded-full bg-red/10 px-4 py-2.5 text-red">
            <ParkingCircle size={18} strokeWidth={2} />
            <span className="text-sm font-semibold">{t.location.parking}</span>
          </div>
        </div>

        <div className="reveal h-80 w-full overflow-hidden rounded-[20px] bg-border/40 ring-1 ring-dark/5 lg:h-[480px]">
          <iframe
            title="Zeppelin Beach location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d674.014647572722!2d13.834802888242885!3d44.84281016437521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477cd368091029f3%3A0xddda8bbd11701873!2sZeppelin%20-%20Beach%20%26%20lounge%20bar!5e0!3m2!1shr!2shr!4v1777318096151!5m2!1shr!2shr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <Wave fill="var(--color-red)" variant={0} />
    </section>
  );
}
