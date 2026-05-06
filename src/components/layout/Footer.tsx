"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { useT } from "@/lib/i18n";

export function Footer() {
  const { t } = useT();

  return (
    <footer className="bg-red pt-12 pb-8 px-6 lg:px-[120px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-10 border-b border-white/15">
          <div className="flex flex-col gap-4">
            <Image
              src="/assets/logo.png"
              alt="Zeppelin Beach Complex"
              width={140}
              height={48}
              className="h-10 w-auto invert self-start"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              Beach & Lounge Bar
              <br />
              Saccorgiana Beach, Pula
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/zeppelin_bar_pula"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-white/50 text-xs tracking-widest font-semibold uppercase">
              {t.footer.hours_title}
            </p>
            <p className="text-white/50 text-[11px] tracking-widest uppercase font-semibold">
              {t.footer.hours_bar_label}
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-white/85 text-sm">{t.footer.hours_bar_summer}</p>
              <p className="text-white/85 text-sm">{t.footer.hours_bar_spring}</p>
              <p className="text-white/85 text-sm">{t.footer.hours_bar_autumn}</p>
              <p className="text-white/85 text-sm">{t.footer.hours_bar_winter}</p>
            </div>
            <p className="text-white/50 text-[11px] tracking-widest uppercase font-semibold pt-1">
              {t.footer.hours_sports_label}
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-white/85 text-sm">{t.footer.hours_sports_summer}</p>
              <p className="text-white/85 text-sm">{t.footer.hours_sports_offseason}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-white/50 text-xs tracking-widest font-semibold uppercase">
              {t.footer.contact_title}
            </p>
            <a
              href="tel:+385912545117"
              className="flex items-center gap-2 text-white/85 hover:text-white text-sm transition-colors"
            >
              <Phone size={15} />
              {t.footer.phone}
            </a>
            <a
              href="mailto:info@zeppelinbar.hr"
              className="flex items-center gap-2 text-white/85 hover:text-white text-sm transition-colors"
            >
              <Mail size={15} />
              {t.footer.email}
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
          <p className="text-white/35 text-xs">{t.footer.copyright}</p>
          <span className="text-white/20 text-xs hidden sm:block">·</span>
          <Link
            href="/privacy"
            className="text-white/35 text-xs hover:text-white/60 transition-colors"
          >
            {t.footer.privacy_link}
          </Link>
        </div>
      </div>
    </footer>
  );
}
