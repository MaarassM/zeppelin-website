# Legal & Cookie Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Privacy Policy page, a cookie notice banner, and a footer privacy link to satisfy GDPR requirements for the Zeppelin Beach Complex website.

**Architecture:** Four sequential tasks — first add i18n strings (dependency for all others), then build the privacy page, cookie notice banner, and footer link independently. The `Messages` type is derived from `hr.json` via `type Messages = typeof hr`, so TypeScript types update automatically when JSON keys are added.

**Tech Stack:** Next.js App Router, React 19, Tailwind CSS 4, TypeScript, existing `useT()` i18n hook

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `src/messages/en.json` | Modify | Add `privacy`, `ui.cookie_*`, `footer.privacy_link` keys |
| `src/messages/hr.json` | Modify | Same keys in Croatian |
| `src/app/privacy/page.tsx` | Create | Server component with Metadata, renders `PrivacyPageClient` |
| `src/components/sections/PrivacyPageClient.tsx` | Create | Client component rendering all privacy policy sections |
| `src/components/ui/CookieNotice.tsx` | Create | Fixed bottom banner, localStorage dismiss, SSR-safe |
| `src/app/layout.tsx` | Modify | Mount `<CookieNotice />` inside `<LocaleProvider>` |
| `src/components/layout/Footer.tsx` | Modify | Add privacy link next to copyright line |

---

## Task 1: Add i18n strings

**Files:**
- Modify: `src/messages/en.json`
- Modify: `src/messages/hr.json`

- [ ] **Step 1: Add all new keys to `src/messages/en.json`**

Add the following at the top level (alongside existing `nav`, `bar`, `footer`, etc. keys). Insert before the closing `}`:

```json
  "privacy": {
    "page_title": "Privacy Policy",
    "intro": "This page explains how Zeppelin Beach Complex collects, uses, and protects your personal data.",
    "who_heading": "Who we are",
    "who_body": "Zeppelin Beach Complex operates on Saccorgiana Beach, Pula, Croatia. Contact: info@zeppelinbar.hr",
    "data_heading": "Data we collect",
    "data_body": "We collect personal data only through the careers application form: full name, phone number, email address, and CV (PDF). No other personal data is collected through this website.",
    "purpose_heading": "How we use your data",
    "purpose_body": "Application data is used solely to review job applications. It is not used for marketing, not shared with third parties, and not sold.",
    "retention_heading": "How long we keep it",
    "retention_body": "CVs and application data are deleted at the end of the hiring season. If you would like your data removed sooner, contact us at info@zeppelinbar.hr.",
    "analytics_heading": "Analytics",
    "analytics_body": "This website uses Vercel Analytics, a cookieless analytics tool. It does not set cookies, does not collect personal identifiers, and does not perform cross-site tracking.",
    "cookies_heading": "Cookies & local storage",
    "cookies_body": "This website does not set personal cookies. We use browser localStorage only to remember your language preference and whether you have dismissed the cookie notice.",
    "rights_heading": "Your rights (GDPR)",
    "rights_body": "Under GDPR you have the right to access, correct, delete, or restrict processing of your personal data. To exercise any right, contact us at info@zeppelinbar.hr.",
    "contact_heading": "Contact",
    "contact_body": "For any privacy-related questions: info@zeppelinbar.hr"
  }
```

Also add inside the existing `"ui"` object:

```json
    "cookie_notice": "We use cookieless analytics to improve your experience. No personal data is stored or sold.",
    "cookie_learn_more": "Learn more",
    "cookie_ok": "OK"
```

Also add inside the existing `"footer"` object:

```json
    "privacy_link": "Privacy Policy"
```

- [ ] **Step 2: Add the same keys to `src/messages/hr.json`**

Add the `privacy` block at the top level:

```json
  "privacy": {
    "page_title": "Pravila privatnosti",
    "intro": "Ova stranica objašnjava kako Zeppelin Beach Complex prikuplja, koristi i štiti vaše osobne podatke.",
    "who_heading": "Tko smo",
    "who_body": "Zeppelin Beach Complex posluje na Saccorgiana plaži, Pula, Hrvatska. Kontakt: info@zeppelinbar.hr",
    "data_heading": "Koji podaci se prikupljaju",
    "data_body": "Osobne podatke prikupljamo isključivo putem obrasca za prijavu na posao: ime i prezime, broj mobitela, email adresa i životopis (PDF). Nikakvi drugi osobni podaci se ne prikupljaju.",
    "purpose_heading": "Svrha obrade podataka",
    "purpose_body": "Podaci iz prijave koriste se isključivo za razmatranje kandidatura. Ne koriste se u marketinške svrhe, ne dijele se s trećim stranama i ne prodaju se.",
    "retention_heading": "Koliko dugo čuvamo podatke",
    "retention_body": "Životopisi i podaci iz prijava brišu se po završetku sezone zapošljavanja. Ako želite raniji brisanje podataka, kontaktirajte nas na info@zeppelinbar.hr.",
    "analytics_heading": "Analitika",
    "analytics_body": "Ova stranica koristi Vercel Analytics, alat za analitiku bez kolačića. Ne postavlja kolačiće, ne prikuplja osobne identifikatore i ne vrši praćenje između stranica.",
    "cookies_heading": "Kolačići i lokalna pohrana",
    "cookies_body": "Ova stranica ne postavlja osobne kolačiće. Koristimo localStorage preglednika isključivo za pamćenje jezičnih postavki i toga jeste li zatvorili obavijest o kolačićima.",
    "rights_heading": "Vaša prava (GDPR)",
    "rights_body": "Prema GDPR-u imate pravo na pristup, ispravak, brisanje ili ograničenje obrade vaših osobnih podataka. Za ostvarivanje bilo kojeg prava kontaktirajte nas na info@zeppelinbar.hr.",
    "contact_heading": "Kontakt",
    "contact_body": "Za sva pitanja vezana uz privatnost: info@zeppelinbar.hr"
  }
```

Add inside the existing `"ui"` object:

```json
    "cookie_notice": "Koristimo analitiku bez kolačića za poboljšanje iskustva. Osobni podaci se ne pohranjuju niti prodaju.",
    "cookie_learn_more": "Saznaj više",
    "cookie_ok": "OK"
```

Add inside the existing `"footer"` object:

```json
    "privacy_link": "Pravila privatnosti"
```

- [ ] **Step 3: Verify TypeScript picks up the new keys**

```bash
cd "/Users/mihaelmaras/Desktop/private work/zeppelin-website"
npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors about missing `privacy`, `ui.cookie_*`, or `footer.privacy_link` keys. (If you see other pre-existing errors, ignore them.)

- [ ] **Step 4: Commit**

```bash
git add src/messages/en.json src/messages/hr.json
git commit -m "feat: add i18n strings for privacy policy, cookie notice, footer link"
```

---

## Task 2: Privacy page

**Files:**
- Create: `src/app/privacy/page.tsx`
- Create: `src/components/sections/PrivacyPageClient.tsx`

- [ ] **Step 1: Create the client component `src/components/sections/PrivacyPageClient.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";
import { Footer } from "@/components/layout/Footer";

export function PrivacyPageClient() {
  const { t } = useT();
  const p = t.privacy;

  return (
    <>
      <main className="bg-white min-h-screen pt-24 pb-20 px-6 lg:px-[120px]">
        <div className="max-w-[760px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm text-black/40 hover:text-black transition-colors"
            >
              ← Zeppelin Beach Complex
            </Link>
            <h1 className="font-display text-[34px] lg:text-[52px] leading-none text-black">
              {p.page_title}
            </h1>
            <p className="text-black/60 text-sm leading-relaxed">{p.intro}</p>
          </div>

          {[
            { heading: p.who_heading, body: p.who_body },
            { heading: p.data_heading, body: p.data_body },
            { heading: p.purpose_heading, body: p.purpose_body },
            { heading: p.retention_heading, body: p.retention_body },
            { heading: p.analytics_heading, body: p.analytics_body },
            { heading: p.cookies_heading, body: p.cookies_body },
            { heading: p.rights_heading, body: p.rights_body },
            { heading: p.contact_heading, body: p.contact_body },
          ].map(({ heading, body }) => (
            <section key={heading} className="flex flex-col gap-2">
              <h2 className="font-display text-[22px] leading-tight text-black">
                {heading}
              </h2>
              <p className="text-black/70 text-sm leading-relaxed">{body}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Create the server component `src/app/privacy/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PrivacyPageClient } from "@/components/sections/PrivacyPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Zeppelin Beach Complex",
  description:
    "How Zeppelin Beach Complex collects, uses, and protects your personal data.",
  alternates: { canonical: "https://zeppelinbar.com/privacy" },
  openGraph: {
    title: "Privacy Policy | Zeppelin Beach Complex",
    description:
      "How Zeppelin Beach Complex collects, uses, and protects your personal data.",
    url: "https://zeppelinbar.com/privacy",
    siteName: "Zeppelin Beach Complex",
    locale: "hr_HR",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
```

- [ ] **Step 3: Verify the page builds without errors**

```bash
cd "/Users/mihaelmaras/Desktop/private work/zeppelin-website"
npx tsc --noEmit 2>&1 | head -30
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/privacy/page.tsx src/components/sections/PrivacyPageClient.tsx
git commit -m "feat: add Privacy Policy page"
```

---

## Task 3: Cookie notice banner

**Files:**
- Create: `src/components/ui/CookieNotice.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create `src/components/ui/CookieNotice.tsx`**

```tsx
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
```

- [ ] **Step 2: Mount `CookieNotice` in `src/app/layout.tsx`**

Add the import at the top of the file alongside existing imports:

```tsx
import { CookieNotice } from "@/components/ui/CookieNotice";
```

Inside the `<LocaleProvider>` block, add `<CookieNotice />` after `{children}`:

```tsx
      <LocaleProvider>
        <Header />
        {children}
        <CookieNotice />
      </LocaleProvider>
```

- [ ] **Step 3: Verify TypeScript**

```bash
cd "/Users/mihaelmaras/Desktop/private work/zeppelin-website"
npx tsc --noEmit 2>&1 | head -30
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/CookieNotice.tsx src/app/layout.tsx
git commit -m "feat: add cookie notice banner with localStorage dismiss"
```

---

## Task 4: Footer privacy link

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Add the import for `Link` at the top of `src/components/layout/Footer.tsx`**

Add after the existing imports:

```tsx
import Link from "next/link";
```

- [ ] **Step 2: Replace the copyright line with a flex row that includes the privacy link**

Find this block at the bottom of the footer (around line 98):

```tsx
        <p className="text-white/35 text-xs text-center pt-6">
          {t.footer.copyright}
        </p>
```

Replace with:

```tsx
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
```

- [ ] **Step 3: Verify TypeScript**

```bash
cd "/Users/mihaelmaras/Desktop/private work/zeppelin-website"
npx tsc --noEmit 2>&1 | head -30
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add privacy policy link to footer"
```

---

## Final check

- [ ] **Run a full build to confirm everything compiles**

```bash
cd "/Users/mihaelmaras/Desktop/private work/zeppelin-website"
npm run build 2>&1 | tail -20
```

Expected: `Route (app)` table shows `/privacy` as a new route. No build errors.
