"use client";

import Link from "next/link";
import { ArrowRight, FileCode, FileSpreadsheet } from "lucide-react";
import { useT } from "@/lib/i18n";
import { Footer } from "@/components/layout/Footer";
import { CjenikHero } from "@/components/cjenik/CjenikHero";
import { PRICE_LISTS } from "@/data/cjenik";
import {
  currentFileName,
  currentVersion,
  fileHref,
  formatDateTime,
  versionFileName,
} from "@/lib/cjenik";

export function CjenikIndexClient() {
  const { t } = useT();
  const c = t.cjenik;

  return (
    <>
      <main className="min-h-screen bg-cream pt-16 lg:pt-[72px]">
        <CjenikHero title={c.title} backHref="/">
          <p className="max-w-[60ch] text-base leading-relaxed text-white/80 lg:text-lg">{c.intro}</p>
        </CjenikHero>

        <div className="mx-auto flex max-w-[960px] flex-col gap-14 px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-[26px] leading-tight text-dark lg:text-[32px]">{c.machine_title}</h2>
              <p className="max-w-[65ch] text-sm leading-relaxed text-body">{c.machine_desc}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {PRICE_LISTS.map((list) => {
                const version = currentVersion(list);
                return (
                  <article
                    key={list.slug}
                    className="flex flex-col gap-4 rounded-2xl bg-white/70 p-5 ring-1 ring-border/50 sm:p-6"
                  >
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-2xl text-dark">{c.names[list.slug]}</h3>
                      <p className="text-xs text-muted">
                        {c.published} {formatDateTime(version.publishedAt)} · {c.version} {version.no}
                      </p>
                    </div>
                    <Link
                      href={`/cjenik/${list.slug}`}
                      className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-red px-5 font-display text-sm tracking-widest text-white transition-colors hover:bg-red-dark"
                    >
                      {c.open.toUpperCase()}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <div className="flex gap-2">
                      <a
                        href={fileHref(currentFileName(list, "csv"))}
                        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-dark text-sm font-semibold text-cream transition-colors hover:bg-dark/80"
                      >
                        <FileSpreadsheet size={16} /> CSV
                      </a>
                      <a
                        href={fileHref(currentFileName(list, "xml"))}
                        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-dark text-sm font-semibold text-cream transition-colors hover:bg-dark/80"
                      >
                        <FileCode size={16} /> XML
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="arhiva" className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-[26px] leading-tight text-dark lg:text-[32px]">{c.archive_title}</h2>
              <p className="text-sm text-body">{c.archive_desc}</p>
            </div>

            <ul className="flex flex-col">
              {PRICE_LISTS.flatMap((list) =>
                list.versions.map((version) => (
                  <li
                    key={`${list.slug}-${version.no}`}
                    className="flex flex-col gap-2 border-b border-border/50 py-4 md:flex-row md:items-center md:justify-between md:gap-6"
                  >
                    <div className="min-w-0">
                      <p className="text-[15px] font-medium text-dark">
                        {c.names[list.slug]} · {c.version} {version.no}
                      </p>
                      <p className="text-xs text-muted">
                        {c.published} {formatDateTime(version.publishedAt)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 md:items-end">
                      {(["csv", "xml"] as const).map((format) => {
                        const name = versionFileName(list, version, format);
                        return (
                          <a
                            key={format}
                            href={fileHref(name)}
                            className="break-all py-1 font-mono text-xs text-red underline-offset-4 hover:underline"
                          >
                            {name}
                          </a>
                        );
                      })}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
