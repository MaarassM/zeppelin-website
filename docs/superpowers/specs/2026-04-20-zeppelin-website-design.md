# Zeppelin Beach Complex — Website Design Spec

**Date:** 2026-04-20  
**Project:** zeppelinbar.com  
**Stack:** Next.js 14 (App Router) + Tailwind CSS  
**Design file:** `zeppelin-design.pen`

---

## 1. Architecture

### Domain Split
- `zeppelinbar.com` — informational hub (this project)
- `zeppelin-adventure.com` — existing e-commerce/booking (external, no changes)

### Routing (Option C — Hybrid)

| Route | Type | Description |
|-------|------|-------------|
| `/` | Page | Homepage — full single scroll |
| `/menu` | Page | Bar drinks menu (QR code target) |
| `/food` | Page | Food & gelato menu (QR code target) |

All section anchors on homepage: `/#bar`, `/#action`, `/#adventure`, `/#gastro`, `/#karijere`, `/#lokacija`

### Language
- Croatian primary, English secondary
- `next-intl` for i18n — locale stored in cookie, no URL prefix
- Default locale: `hr`, fallback: `en`
- Language toggle in header (HR | EN)

---

## 2. Tech Stack

| Concern | Choice | Reason |
|---------|--------|--------|
| Framework | Next.js 14 App Router | SSG for speed, clean routing for QR codes |
| Styling | Tailwind CSS v4 | Utility-first, rapid build |
| i18n | next-intl | Cookie-based locale, no URL change |
| Forms | React Hook Form | Careers mock form |
| Maps | Google Maps Embed API | Static embed, no JS SDK needed |
| Analytics | Vercel Analytics + custom outbound click events | Track adventure shop conversions |
| Images | next/image | Automatic WebP, lazy load, blur placeholder |
| Video | HTML5 `<video>` with `autoplay muted loop playsInline` | Hero background loop |
| Icons | Lucide React | Consistent, tree-shakeable |
| Fonts | Google Fonts — Anton + Inter | Via `next/font/google` |
| Deployment | Vercel | Zero-config, edge CDN |

---

## 3. Design System

### Colors
```css
--red:        #D61F3C;
--red-deep:   #8B1124;
--red-dark:   #B8182E;
--cream:      #F0EAD2;
--white:      #FFFFFF;
--dark:       #1A1A1A;
--body:       #555555;
--muted:      #888888;
--border:     #C0B898;
```

### Typography
```css
--font-display: 'Anton', sans-serif;   /* headings, CTAs, logo */
--font-body:    'Inter', sans-serif;   /* body, labels */
```

### Spacing / Sizing
- Mobile section padding: `px-6 py-12`
- Desktop section padding: `px-[120px] py-20`
- Max content width: `max-w-[1200px] mx-auto`
- Card border-radius: `rounded-xl` (12px) or `rounded-2xl` (14px)
- Button border-radius: `rounded-lg` (8px)
- Card shadow: `shadow-[0_4px_16px_rgba(0,0,0,0.06)]`

### Section Color Pattern
Sections strictly alternate:

```
Header     → bg-red       text-white
Hero       → bg-red       text-white  (video bg + overlay)
Bar        → bg-cream     text-dark
Action     → bg-red       text-white
Adventure  → bg-cream     text-dark
Gastro     → bg-red       text-white
Careers    → bg-cream     text-dark
Footer     → bg-red       text-white
```

---

## 4. Page: Homepage (`/`)

### 4.1 Header (Sticky)
- Fixed top, `z-50`, full-width red background
- **Mobile:** Logo left | HR/EN toggle + hamburger right
- **Desktop:** Logo left | Nav center | HR/EN + CTA button right
- Nav items: `Bar | Gastro | Beach & Fun | Lokacija | Karijere` (smooth scroll anchors)
- CTA: `[ REZERVIRAJ AVANTURU ]` → `https://zeppelin-adventure.com` (new tab + outbound event)
- Mobile drawer menu: slides in from right on hamburger click

### 4.2 Hero Section
- Full viewport height (`100dvh`), red gradient background
- `<video autoPlay muted loop playsInline>` background, `object-cover`, full bleed
- Semi-transparent red overlay (`bg-red/70`) on top of video for text contrast
- Content anchored to bottom-left (mobile) / center-left (desktop)
- Location badge: pin icon + "Saccorgiana Beach, Pula"
- Headline: `ZEPPELIN BEACH COMPLEX` — Anton, 52px mobile / 88px desktop
- Subline: Croatian + English subtitle
- CTAs stacked on mobile, side-by-side on desktop:
  - Primary: white fill, red text → smooth scroll to `#bar`
  - Secondary: white outline → `zeppelin-adventure.com` (outbound)

### 4.3 Section: Bar & Relax (`#bar`)
- Cream background
- **Mobile:** stacked (tag → title → circular image → description → CTA → sunbed info)
- **Desktop:** two-column (text left, circular image right)
- Circular image: `rounded-full`, `aspect-square`, `object-cover`
- `[ DIGITALNI MENU ]` button → navigates to `/menu`
- Sunbed info: icon card with beach umbrella icon

### 4.4 Section: Action Zone (`#action`)
- Red background
- Title + subtitle + info note ("plaćanje na pultu")
- **Mobile:** 2×2 card grid
- **Desktop:** 4-column card grid
- Each card: cream background, activity icon, name, pricing tiers (1h / 3h / Dan)
- Activities: Wibit Park, Trampolin, Pedaline & SUP, Kayak Safari

### 4.5 Section: Zeppelin Adventure (`#adventure`)
- Cream background
- Title + subtitle
- **Mobile:** 2×2 card grid
- **Desktop:** 4-column card grid
- Each card: white background, shadow, red circle icon placeholder, name, `[ REZERVIRAJ → ]` button
- Button links directly to the product on `zeppelin-adventure.com` + fires `outbound_click` analytics event
- Products: Jet-Ski Safari, Buggy/Quad, Flyboard, Parasailing

### 4.6 Section: Bites & Sweets (`#gastro`)
- Red background
- **Mobile:** title → 2 cards (Fast Food, Gelaterija) → outline CTA
- **Desktop:** title+CTA left column, 2 cards right column
- `[ POGLEDAJ JELOVNIK ]` → `/food`

### 4.7 Section: Karijere (`#karijere`) — MOCK v1
- Cream background
- Form fields (UI only, no backend in v1):
  - `Ime i prezime` — text input
  - `Kontakt` — two inputs side-by-side: mobitel + email
  - `Pozicija` — `<select>`: Bar | Kuhinja | Sportski instruktor | Skipper | Promocija
  - `Strani jezici` — checkbox group: ENG | GER | ITA | FRA
  - `Dozvola za voditelja brodice` — radio: Da | Ne
  - `Dostupnost` — date range: OD + DO
  - `Iskustvo` — `<textarea>`, max 500 chars
  - `Upload` — CV (PDF) + Fotografija (JPG/PNG) — `<input type="file">`
- Submit button: `[ POŠALJI PRIJAVU ]` — shows success toast (no real submission)
- Form built with React Hook Form + Zod validation

### 4.8 Section: Lokacija & Kontakt (`#lokacija`)
- Part of footer area
- Google Maps iframe embed — full width, branded static map
- "Kako nas naći" text directions

### 4.9 Footer
- Red background, multi-column on desktop
- **Col 1:** Logo + address + social icons (Instagram, TikTok)
- **Col 2:** Radno vrijeme (Bar + Sportovi)
- **Col 3:** Kontakt (phone, WhatsApp)
- Bottom bar: copyright

---

## 5. Page: `/menu` — Bar Menu

- Standalone page (no navbar — just logo + back link)
- Mobile-optimized, white background, dark text
- QR code target — must load fast, no heavy assets
- Sections: Kokteli | Pivo | Vino | Soft Drinks | Kava
- Each item: name (HR + EN) + price
- Sticky category tabs at top for quick navigation
- Data: hardcoded JSON in `/src/data/menu.ts` (client updates via PR or CMS later)

---

## 6. Page: `/food` — Food Menu

- Same structure as `/menu`
- Sections: Fast Food | Gelaterija
- Data: hardcoded JSON in `/src/data/food.ts`

---

## 7. Analytics

```typescript
// Outbound click tracking helper
trackOutbound(label: string) {
  // Vercel Analytics custom event
  track('outbound_click', { destination: 'zeppelin-adventure.com', label })
}
```

Fire on every `[ REZERVIRAJ ONLINE ]` card button and hero secondary CTA.

---

## 8. Performance Requirements

| Metric | Target |
|--------|--------|
| LCP | < 2.5s on 3G |
| Hero video | `<5MB`, served via CDN, `preload="none"` on mobile |
| Images | WebP via `next/image`, max 800px on mobile |
| JS bundle | No heavy client-side libraries |
| Fonts | `display: swap` via `next/font` |

---

## 9. Accessibility

- All images: descriptive `alt` text
- Form inputs: `<label>` with `for` attribute
- Keyboard nav: visible focus rings
- Color contrast: all text meets 4.5:1 minimum
- `prefers-reduced-motion`: disable video autoplay, disable transitions

---

## 10. Project Structure

```
zeppelin-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, metadata
│   │   ├── page.tsx            # Homepage
│   │   ├── menu/page.tsx       # Bar menu (/menu)
│   │   └── food/page.tsx       # Food menu (/food)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── BarRelax.tsx
│   │   │   ├── ActionZone.tsx
│   │   │   ├── Adventure.tsx
│   │   │   ├── Gastro.tsx
│   │   │   ├── Careers.tsx
│   │   │   └── Location.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── SectionTag.tsx
│   │       ├── ActivityCard.tsx
│   │       └── AdventureCard.tsx
│   ├── data/
│   │   ├── menu.ts
│   │   └── food.ts
│   ├── lib/
│   │   └── analytics.ts
│   └── messages/
│       ├── hr.json             # Croatian strings
│       └── en.json             # English strings
├── public/
│   └── assets/                 # Client drops logo, video, photos here
├── docs/
│   ├── design-identity.md
│   ├── requirements.md
│   └── superpowers/specs/
│       └── 2026-04-20-zeppelin-website-design.md
├── design-system/
└── zeppelin-design.pen
```

---

## 11. Out of Scope (v1)

- Careers form backend (mock UI only)
- CMS for menu data
- `zeppelin-adventure.com` changes
- Tablet-specific breakpoints (mobile + desktop sufficient)
- Dark mode
