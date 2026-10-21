"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { SectionTag } from "@/components/ui/SectionTag";
import { PRICE_LISTS, type PriceListSlug } from "@/data/cjenik";
import { cn } from "@/lib/utils";

interface CjenikHeroProps {
  title: string;
  backHref: string;
  active?: PriceListSlug;
  children?: React.ReactNode;
}

export function CjenikHero({ title, backHref, active, children }: CjenikHeroProps) {
  const { t } = useT();

  return (
    <div className="bg-red text-white">
      <div className="mx-auto flex max-w-[960px] flex-col gap-5 px-5 pt-8 pb-10 sm:px-8 lg:px-10 lg:pt-12 lg:pb-14">
        <Link
          href={backHref}
          className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-white/75 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} />
          {t.cjenik.back}
        </Link>
        <SectionTag light>{t.cjenik.tag}</SectionTag>
        <h1 className="font-display text-[44px] leading-none sm:text-[56px] lg:text-[72px]">{title}</h1>
        {children}
        <nav aria-label={t.cjenik.title} className="flex flex-wrap gap-2 pt-1">
          {PRICE_LISTS.map(({ slug }) => (
            <Link
              key={slug}
              href={`/cjenik/${slug}`}
              aria-current={active === slug ? "page" : undefined}
              className={cn(
                "inline-flex h-11 items-center rounded-full px-5 font-display text-sm tracking-widest transition-colors",
                active === slug
                  ? "bg-white text-red"
                  : "bg-white/10 text-white ring-1 ring-inset ring-white/30 hover:bg-white/20"
              )}
            >
              {t.cjenik.names[slug].toUpperCase()}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
