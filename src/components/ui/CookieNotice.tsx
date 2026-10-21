"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useT } from "@/lib/i18n";

const STORAGE_KEY = "cookie-notice";

export function CookieNotice() {
  const { t } = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) !== "dismissed") {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="rise fixed inset-x-3 bottom-3 z-50 flex flex-col gap-3 rounded-[20px] bg-dark/95 p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] backdrop-blur-md sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-md sm:flex-row sm:items-center sm:gap-5 sm:p-5">
      <p className="text-[13px] leading-relaxed text-white/80">
        {t.ui.cookie_notice}{" "}
        <Link href="/privacy" className="text-white underline underline-offset-2 transition-colors hover:text-cream">
          {t.ui.cookie_learn_more}
        </Link>
      </p>
      <button
        onClick={dismiss}
        className="h-10 shrink-0 rounded-full bg-white px-6 text-sm font-semibold text-dark transition-colors hover:bg-cream active:scale-[0.98] cursor-pointer"
      >
        {t.ui.cookie_ok}
      </button>
    </div>
  );
}
