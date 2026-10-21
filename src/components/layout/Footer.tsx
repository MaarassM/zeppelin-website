"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Phone, Mail } from "lucide-react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { COMPANIES } from "@/data/companies";
import { OpeningHours } from "@/components/ui/OpeningHours";

const formatCapital = (value: number) =>
  new Intl.NumberFormat("hr-HR", { minimumFractionDigits: 2 }).format(value);

export function Footer({ className }: { className?: string }) {
  const { t } = useT();

  return (
    <footer className={cn("bg-red pt-14 pb-8 lg:pt-20", className)}>
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 border-b border-white/15 pb-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-5 md:col-span-2 lg:col-span-1">
            <Image
              src="/assets/logo-wordmark.png"
              alt="Zeppelin Beach & Lounge Bar"
              width={900}
              height={344}
              sizes="180px"
              className="h-16 w-auto self-start"
            />
            <p className="text-base leading-relaxed text-white/75">
              Beach & Lounge Bar
              <br />
              Saccorgiana Beach, Pula
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com/zeppelin_bar_pula"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-red"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/ZeppelinBeachBar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-red"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-display text-xl text-white">
              {t.footer.hours_title}
            </p>
            <OpeningHours />
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-display text-xl text-white">
              {t.footer.contact_title}
            </p>
            <a
              href="tel:+385912545117"
              className="flex items-center gap-3 text-[15px] text-white/85 transition-colors hover:text-white"
            >
              <span className="grid size-9 place-items-center rounded-full bg-white/10">
                <Phone size={16} />
              </span>
              {t.footer.phone}
            </a>
            <a
              href="mailto:info@zeppelinbar.hr"
              className="flex items-center gap-3 text-[15px] text-white/85 transition-colors hover:text-white"
            >
              <span className="grid size-9 place-items-center rounded-full bg-white/10">
                <Mail size={16} />
              </span>
              {t.footer.email}
            </a>
          </div>
        </div>

        <details className="group border-b border-white/15 py-3">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-white/70 transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
            {t.hours.legal_toggle}
            <ChevronDown size={16} className="transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="grid grid-cols-1 gap-6 pt-3 pb-5 md:grid-cols-2 md:gap-10">
            {[
              { label: t.footer.legal_bar, company: COMPANIES.brid },
              { label: t.footer.legal_food, company: COMPANIES.zeppelin },
            ].map(({ label, company }) => (
              <div key={company.id} className="flex flex-col gap-1 text-[13px] leading-relaxed text-white/70">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/55">{label}</p>
                <p className="font-semibold text-white/90">{company.legalName}</p>
                <p>{company.address}</p>
                <p>
                  <span className="whitespace-nowrap">OIB {company.oib}</span> ·{" "}
                  <span className="whitespace-nowrap">
                    {t.footer.legal_vat} {company.vatId}
                  </span>{" "}
                  · <span className="whitespace-nowrap">MBS {company.mbs}</span>
                </p>
                <p>
                  {t.footer.legal_registry}: {company.court}
                </p>
                <p>
                  {t.footer.legal_capital}: {formatCapital(company.shareCapital)} €
                  {company.capitalPaidInFull && `, ${t.footer.legal_paid}`}
                </p>
                <p>
                  {t.footer.legal_director}: {company.director}
                </p>
              </div>
            ))}
          </div>
        </details>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">{t.footer.copyright}</p>
          <div className="flex items-center gap-5">
            <Link
              href="/cjenik"
              className="py-2 text-xs text-white/50 transition-colors hover:text-white"
            >
              {t.footer.price_list_link}
            </Link>
            <Link
              href="/privacy"
              className="py-2 text-xs text-white/50 transition-colors hover:text-white"
            >
              {t.footer.privacy_link}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
