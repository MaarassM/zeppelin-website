"use client";

import { useState } from "react";
import { CareersForm } from "./CareersForm";
import { useT } from "@/lib/i18n";

export function CareersPageClient() {
  const { t } = useT();
  const [category, setCategory] = useState<string | null>(null);
  const [position, setPosition] = useState<string | null>(null);

  const categoryLabel = category
    ? t.careers.position_categories.find((c) => c.key === category)?.label
    : null;

  const headerTitle = position
    ? position.toLocaleUpperCase()
    : categoryLabel
    ? categoryLabel.toLocaleUpperCase()
    : t.careers.tag;

  return (
    <>
      <div className="bg-red px-6 py-14 text-center relative">
        <a
          href="/#karijere"
          className="absolute left-6 top-1/2 -translate-y-1/2 font-display text-white/60 text-[11px] tracking-[0.25em] uppercase hover:text-white transition-colors"
        >
          ← {t.careers.back_btn}
        </a>
        <p className="font-display text-white/50 text-[11px] tracking-[0.35em] uppercase mb-3">
          Zeppelin Beach
        </p>
        <h1 className="font-display text-white text-5xl lg:text-6xl tracking-wide px-24 lg:px-32">
          {headerTitle}
        </h1>
      </div>

      <div className="px-6 py-12 max-w-[680px] mx-auto">
        <CareersForm
          category={category}
          position={position}
          onCategorySelect={setCategory}
          onPositionSelect={setPosition}
        />
      </div>
    </>
  );
}
