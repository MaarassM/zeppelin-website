"use client";

import Link from "next/link";
import { FileCode, FileSpreadsheet } from "lucide-react";
import { useT } from "@/lib/i18n";
import { Footer } from "@/components/layout/Footer";
import { CjenikHero } from "@/components/cjenik/CjenikHero";
import { getPriceList, type PriceListSlug } from "@/data/cjenik";
import {
  currentFileName,
  currentVersion,
  fileHref,
  formatDateTime,
  formatPrice,
  formatSize,
} from "@/lib/cjenik";

const sectionId = (title: string) =>
  title.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function PriceListPageClient({ slug }: { slug: PriceListSlug }) {
  const { t } = useT();
  const c = t.cjenik;
  const list = getPriceList(slug)!;
  const version = currentVersion(list);

  return (
    <>
      <main className="min-h-screen bg-cream pt-16 lg:pt-[72px]">
        <CjenikHero title={c.names[slug]} backHref="/cjenik" active={slug}>
          <p className="text-sm text-white/75">
            {c.published} {formatDateTime(version.publishedAt)} · {c.version} {version.no}
          </p>
        </CjenikHero>

        <div className="mx-auto flex max-w-[960px] flex-col gap-12 px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
          {version.sections.length > 3 && (
            <nav className="flex flex-wrap gap-2">
              {version.sections.map((s) => (
                <a
                  key={s.title}
                  href={`#${sectionId(s.title)}`}
                  className="inline-flex min-h-9 items-center rounded-full bg-red/10 px-3.5 text-sm font-medium text-red transition-colors hover:bg-red hover:text-white"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          )}

          {version.sections.map((section) => (
            <section key={section.title} id={sectionId(section.title)} className="flex scroll-mt-24 flex-col gap-3">
              <h2 className="font-display text-[26px] leading-tight text-dark lg:text-[32px]">
                {section.title}
              </h2>

              <div className="hidden grid-cols-[1fr_5rem_6rem_8rem] gap-x-4 border-b-2 border-dark/80 pb-2 text-xs font-semibold uppercase tracking-widest text-muted sm:grid">
                <span>{c.col_item}</span>
                <span className="text-right">{c.col_size}</span>
                <span className="text-right">{c.col_price}</span>
                <span className="text-right">{c.col_anchor}</span>
              </div>

              <ul>
                {section.items.map((item, i) => (
                  <li
                    key={`${item.name}-${item.size ?? i}`}
                    className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-border/50 py-3 sm:grid-cols-[1fr_5rem_6rem_8rem] sm:items-baseline"
                  >
                    <div className="min-w-0">
                      <p className="text-[15px] font-medium text-dark">
                        {item.name}
                        {item.size !== undefined && (
                          <span className="whitespace-nowrap font-normal text-muted sm:hidden"> · {formatSize(item.size)}</span>
                        )}
                      </p>
                      {item.note && <p className="text-sm text-body">{item.note}</p>}
                      {item.specialSale && (
                        <p className="text-xs font-semibold uppercase tracking-wider text-red">{item.specialSale}</p>
                      )}
                    </div>
                    <span className="hidden whitespace-nowrap text-right text-[15px] text-muted sm:block">
                      {item.size !== undefined ? formatSize(item.size) : ""}
                    </span>
                    <div className="text-right">
                      <p className="whitespace-nowrap text-[15px] font-semibold text-dark">{formatPrice(item.price)} €</p>
                      <p className="whitespace-nowrap text-xs text-body sm:hidden">
                        {c.anchor_short}: {formatPrice(item.anchor)} €
                      </p>
                    </div>
                    <span className="hidden whitespace-nowrap text-right text-sm text-body sm:block">
                      {formatPrice(item.anchor)} €
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <aside className="flex flex-col gap-4 rounded-2xl bg-white/60 p-5 ring-1 ring-border/50 sm:p-7">
            <p className="text-sm font-medium text-dark">{c.vat_note}</p>
            <p className="text-sm text-body">{c.anchor_note}</p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={fileHref(currentFileName(list, "csv"))}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-dark px-5 text-sm font-semibold text-cream transition-colors hover:bg-dark/80"
              >
                <FileSpreadsheet size={16} /> CSV
              </a>
              <a
                href={fileHref(currentFileName(list, "xml"))}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-dark px-5 text-sm font-semibold text-cream transition-colors hover:bg-dark/80"
              >
                <FileCode size={16} /> XML
              </a>
              <Link
                href="/cjenik#arhiva"
                className="inline-flex h-11 items-center px-3 text-sm font-semibold text-red underline-offset-4 hover:underline"
              >
                {c.archive_title}
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
