"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useT } from "@/lib/i18n";
import { MobileMenu } from "./MobileMenu";
import { trackOutbound } from "@/lib/analytics";

const NAV_ITEMS = [
  { key: "gastro" as const, href: "/#gastro" },
  { key: "beach" as const, href: "/#action" },
  { key: "lokacija" as const, href: "/#lokacija" },
  { key: "karijere" as const, href: "/careers" },
];

export function Header() {
  const { t, locale, setLocale } = useT();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-red h-16 flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-5 lg:px-[60px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo.png"
              alt="Zeppelin Beach"
              width={140}
              height={48}
              className="h-10 w-auto invert"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="text-white/85 text-sm font-semibold tracking-wide hover:text-white transition-colors"
              >
                {t.nav[key]}
              </a>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="flex gap-1">
              {(["hr", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`text-xs font-semibold px-2 py-1 rounded cursor-pointer transition-colors ${
                    locale === l
                      ? "text-white"
                      : "text-white/55 hover:text-white/80"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a
              href="https://www.zeppelin-adventure.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutbound("header-cta")}
              className="border-2 border-white text-white font-display text-xs tracking-widest px-5 py-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              {t.nav.rezerviraj.toUpperCase()}
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-4">
            <div className="flex gap-1">
              {(["hr", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`text-xs font-semibold px-1.5 py-1 cursor-pointer ${
                    locale === l ? "text-white" : "text-white/50"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="cursor-pointer"
            >
              <Menu className="text-white" size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
