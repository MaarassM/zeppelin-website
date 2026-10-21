"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { SectionTag } from "@/components/ui/SectionTag";
import { Wave } from "@/components/ui/Wave";

export function Careers() {
  const { t } = useT();

  return (
    <section
      id="karijere"
      className="relative overflow-hidden bg-dark pt-16 pb-24 lg:pt-24 lg:pb-36"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 px-5 sm:px-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-12 lg:gap-16 lg:px-10">
        <div className="reveal flex flex-col gap-6">
          <SectionTag light>{t.careers.tag}</SectionTag>
          <h2 className="font-display text-[40px] leading-[0.95] text-white sm:text-5xl lg:text-[64px]">
            {t.careers.heading}
          </h2>
          <p className="max-w-[40ch] text-base leading-relaxed text-white/65 lg:text-lg">
            {t.careers.subtitle}
          </p>
          <Link
            href="/careers"
            className="group inline-flex h-12 items-center gap-2 self-start whitespace-nowrap rounded-full bg-red px-7 font-display text-sm tracking-widest text-white transition-all duration-300 hover:bg-red-dark active:scale-[0.98]"
          >
            {t.careers.submit_btn.toUpperCase()}
            <ArrowRight size={17} strokeWidth={2.25} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="reveal relative aspect-[4/3] overflow-hidden rounded-[20px] md:aspect-[5/4] lg:aspect-[16/11]">
          <Image
            src="/assets/employee.jpg"
            alt={t.careers.heading}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </div>
      </div>

      <Wave fill="var(--color-cream)" variant={2} />
    </section>
  );
}
