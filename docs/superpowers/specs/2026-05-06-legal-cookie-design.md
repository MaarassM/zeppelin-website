# Legal & Cookie Implementation Design

**Date:** 2026-05-06  
**Project:** Zeppelin Beach Complex website  
**Scope:** Privacy Policy page, cookie notice banner, footer legal link

---

## Context

The site collects personal data via the careers form (name, phone, email, CV). It uses Vercel Analytics, which is cookieless and collects no personal identifiers. No payment processing or user accounts exist. GDPR applies (Croatian/EU visitors).

---

## Architecture

Three independent additions, no shared state between them:

1. **`/privacy` page** — static informational page
2. **`CookieNotice` component** — client component, mounts in root layout
3. **Footer legal link** — small addition to existing Footer component

---

## 1. Privacy & Cookie Policy Page

**Route:** `src/app/privacy/page.tsx`  
**Pattern:** Follows existing detail pages — server component with `Metadata`, renders a `PrivacyPageClient` client component.

**Metadata (both locales):**
- Title: "Privacy Policy | Zeppelin Beach Complex" / "Pravila privatnosti | Zeppelin Beach Complex"
- Description: concise one-liner about data handling
- `noindex` not set — let it be indexed

**Page sections (in order):**

| Section | Content |
|---|---|
| Who we are | Zeppelin Beach Complex, Saccorgiana Beach, Pula, contact: info@zeppelinbar.hr |
| Data we collect | Careers form: full name, phone, email, CV (PDF). No other personal data collected. |
| Purpose | Reviewing job applications only. Not used for marketing. Not shared with third parties. |
| Retention | CVs and application data deleted after the hiring season ends. |
| Analytics | Vercel Analytics — cookieless, no personal identifiers, no cross-site tracking. |
| Your rights | GDPR rights: access, rectification, deletion, restriction, portability. Contact info@zeppelinbar.hr to exercise any right. |
| Cookies | No personal cookies set. Session/localStorage used only to remember language preference and cookie notice dismissal. |
| Contact | info@zeppelinbar.hr |

**i18n:** All section content added to `en.json` and `hr.json` under a `privacy` key. The client component reads from `t.privacy`.

**Styling:** White background (`bg-white`), max-width container, readable prose typography matching site style. No nav sections needed — plain scrollable page. Header and Footer included via root layout.

---

## 2. Cookie Notice Banner

**Component:** `src/components/ui/CookieNotice.tsx`  
**Mounted in:** `src/app/layout.tsx` (below `<Analytics />`)

**Behaviour:**
- On first visit: renders a fixed bottom bar
- On dismiss: sets `localStorage.setItem('cookie-notice', 'dismissed')` and unmounts
- On subsequent visits: reads localStorage on mount, skips render if dismissed
- SSR-safe: renders `null` until after hydration (use `useEffect` + `useState`)

**Content:**  
EN: "We use cookieless analytics to improve your experience. No personal data is stored or sold."  
HR: "Koristimo analitiku bez kolačića za poboljšanje iskustva. Osobni podaci se ne pohranjuju niti prodaju."  
+ link to `/privacy` ("Learn more" / "Saznaj više")  
+ "OK" dismiss button

**Styling:**
- Fixed bottom, full width, z-50
- Red background (`bg-red`) matching site footer/header
- White text, small font
- Dismiss button: white outline style, compact

---

## 3. Footer Legal Link

**File:** `src/components/layout/Footer.tsx`

**Change:** Add a "Privacy Policy" / "Pravila privatnosti" link next to the existing copyright line at the bottom of the footer.

**i18n keys added:**
- `footer.privacy_link`: "Privacy Policy" / "Pravila privatnosti"

**Layout:** Copyright line becomes a flex row: copyright text on the left (or centered on mobile), privacy link on the right (or below on mobile).

---

## i18n Keys Summary

New keys added to both `en.json` and `hr.json`:

```
footer.privacy_link
privacy.page_title
privacy.who_heading
privacy.who_body
privacy.data_heading
privacy.data_body
privacy.purpose_heading
privacy.purpose_body
privacy.retention_heading
privacy.retention_body
privacy.analytics_heading
privacy.analytics_body
privacy.rights_heading
privacy.rights_body
privacy.cookies_heading
privacy.cookies_body
privacy.contact_heading
privacy.contact_body
ui.cookie_notice
ui.cookie_learn_more
ui.cookie_ok
```

---

## What Is Not In Scope

- Cookie consent with granular accept/reject (not needed — no personal cookies)
- Terms of Use page (no online transactions or bookings handled directly)
- Age verification or special category data handling
- Automated GDPR request processing (email contact is sufficient at this scale)
