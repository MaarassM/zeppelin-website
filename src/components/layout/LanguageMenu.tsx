"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { LOCALES, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageMenu({ className }: { className?: string }) {
  const { locale, setLocale } = useT();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        className="flex h-10 items-center gap-1.5 rounded-full bg-black/15 pl-3 pr-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black/25 cursor-pointer"
      >
        <Globe size={15} strokeWidth={2} />
        {locale}
        <ChevronDown
          size={14}
          strokeWidth={2.25}
          className={cn("transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      <ul
        role="listbox"
        aria-label="Language"
        className={cn(
          "absolute right-0 top-[calc(100%+10px)] w-44 origin-top-right rounded-[20px] bg-cream-soft p-1.5 shadow-[0_18px_40px_-12px_rgba(90,10,25,0.45)] ring-1 ring-dark/5 transition duration-200 ease-out-expo",
          open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
        )}
      >
        {LOCALES.map(({ code, label }) => {
          const active = code === locale;
          return (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-left text-sm transition-colors cursor-pointer",
                  active ? "bg-red text-white" : "text-dark hover:bg-dark/5"
                )}
              >
                <span
                  className={cn(
                    "w-6 text-xs font-semibold uppercase",
                    active ? "text-white/80" : "text-dark/45"
                  )}
                >
                  {code}
                </span>
                <span className="flex-1 font-medium">{label}</span>
                {active && <Check size={15} strokeWidth={2.5} />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
