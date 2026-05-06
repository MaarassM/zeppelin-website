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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-red px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <p className="text-white/85 text-xs leading-relaxed">
        {t.ui.cookie_notice}{" "}
        <Link href="/privacy" className="text-white underline underline-offset-2 hover:text-white/70 transition-colors">
          {t.ui.cookie_learn_more}
        </Link>
      </p>
      <button
        onClick={dismiss}
        className="shrink-0 border border-white/40 text-white text-xs px-4 py-1.5 rounded hover:bg-white/10 transition-colors"
      >
        {t.ui.cookie_ok}
      </button>
    </div>
  );
}
