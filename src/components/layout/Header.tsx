"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n";
import { MobileMenu } from "./MobileMenu";
import { LanguageMenu } from "./LanguageMenu";
import { trackOutbound } from "@/lib/analytics";

export const NAV_ITEMS = [
  { key: "gastro" as const, href: "/#gastro" },
  { key: "beach" as const, href: "/#action" },
  { key: "lokacija" as const, href: "/#lokacija" },
  { key: "karijere" as const, href: "/#karijere" },
];

export function Header() {
  const { t } = useT();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname === "/careers") return null;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 bg-red shadow-[0_1px_0_rgba(0,0,0,0.08),0_8px_24px_-16px_rgba(90,10,25,0.6)]">
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:h-[72px] lg:px-10">
          <Link href="/" aria-label="Zeppelin Beach & Lounge Bar" className="flex shrink-0 items-center">
            <Image
              src="/assets/logo-wordmark.png"
              alt="Zeppelin Beach & Lounge Bar"
              width={900}
              height={344}
              sizes="120px"
              className="h-10 w-auto lg:h-11"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="group relative rounded-full px-4 py-2 text-[15px] font-medium text-white/85 transition-colors hover:text-white"
              >
                {t.nav[key]}
                <span className="absolute inset-x-4 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-white transition-transform duration-300 ease-out-expo group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageMenu />
            <a
              href="https://www.zeppelin-adventure.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutbound("header-cta")}
              className="group inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full bg-white pl-5 pr-4 font-display text-[13px] tracking-widest text-red transition-all hover:bg-cream active:scale-[0.98]"
            >
              {t.nav.rezerviraj.toUpperCase()}
              <ArrowUpRight
                size={16}
                strokeWidth={2.25}
                className="transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageMenu />
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
