"use client";

import { useT } from "@/lib/i18n";
import { SectionTag } from "@/components/ui/SectionTag";

export function Location() {
  const { t } = useT();

  return (
    <section
      id="lokacija"
      className="bg-cream pt-8 lg:pt-20 px-6 lg:px-[120px]"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6 mb-12">
        <SectionTag>{t.location.heading.toUpperCase()}</SectionTag>
        <h2 className="font-display text-dark text-[34px] lg:text-[44px] leading-none">
          {t.location.heading}
        </h2>
        <p className="text-body text-sm max-w-[500px] leading-relaxed">
          {t.location.directions}
        </p>
        <div className="w-full h-64 lg:h-96 rounded-2xl overflow-hidden bg-border">
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
    </section>
  );
}
