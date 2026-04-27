# Zeppelin Beach Complex — Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `zeppelinbar.com` — a mobile-first Next.js 14 informational hub for Zeppelin Beach Complex with bilingual support (HR/EN), linking to the existing `zeppelin-adventure.com` shop.

**Architecture:** Single-repo Next.js 14 App Router with two sub-pages (`/menu`, `/food`) as QR code targets. Homepage is a single long scroll divided into named anchor sections. Language toggle (HR/EN) stored in `localStorage` via a lightweight custom hook — no URL prefixes, no middleware.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS v3, React Hook Form, Zod, Lucide React, Vercel Analytics, `next/font` (Anton + Inter), `next/image`.

**Spec:** `docs/superpowers/specs/2026-04-20-zeppelin-website-design.md`  
**Design:** `zeppelin-design.pen`  
**Assets:** Drop into `public/assets/` when ready (logo, video, photos)

---

## File Map

```
zeppelin-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout — fonts, metadata, providers
│   │   ├── page.tsx                # Homepage — assembles all sections
│   │   ├── menu/
│   │   │   └── page.tsx            # /menu — bar drinks QR page
│   │   └── food/
│   │       └── page.tsx            # /food — food menu QR page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Sticky nav, language toggle, mobile drawer
│   │   │   ├── MobileMenu.tsx      # Slide-in drawer for mobile nav
│   │   │   └── Footer.tsx          # Multi-col footer with hours, social, contact
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # Full-viewport hero, video bg, overlay, CTAs
│   │   │   ├── BarRelax.tsx        # Bar section — image, desc, menu button
│   │   │   ├── ActionZone.tsx      # On-site activities — pricing cards
│   │   │   ├── Adventure.tsx       # Upsell — adventure shop cards
│   │   │   ├── Gastro.tsx          # Fast food + gelato
│   │   │   ├── Careers.tsx         # Mock job application form
│   │   │   └── Location.tsx        # Google Maps embed + directions
│   │   └── ui/
│   │       ├── Button.tsx          # Primary / outline / ghost variants
│   │       ├── SectionTag.tsx      # Eyebrow label (e.g. "BAR & RELAX")
│   │       ├── ActivityCard.tsx    # Action zone pricing card
│   │       └── AdventureCard.tsx   # Adventure upsell card with CTA
│   ├── data/
│   │   ├── menu.ts                 # Bar menu items (hardcoded, replace with CMS later)
│   │   └── food.ts                 # Food menu items
│   ├── lib/
│   │   ├── i18n.ts                 # Locale context, useT() hook, LocaleProvider
│   │   └── analytics.ts            # trackOutbound() helper
│   └── messages/
│       ├── hr.json                 # Croatian strings
│       └── en.json                 # English strings
├── public/
│   └── assets/                     # Logo, video, photos (drop here when ready)
├── tailwind.config.ts
└── next.config.ts
```

---

## Task 1: Project Scaffold

**Files:**

- Create: project root (runs in `/Users/mihaelmaras/Desktop/private work/zeppelin-website`)

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd "/Users/mihaelmaras/Desktop/private work/zeppelin-website"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

When prompted, choose: **Yes** to all defaults.

- [ ] **Step 2: Install dependencies**

```bash
npm install lucide-react react-hook-form zod @hookform/resolvers @vercel/analytics
```

- [ ] **Step 3: Remove boilerplate**

Delete `src/app/page.tsx` contents (keep the file), delete `src/app/globals.css` contents (keep the file), delete everything inside `public/` except `.gitkeep`.

- [ ] **Step 4: Create folder structure**

```bash
mkdir -p src/components/layout src/components/sections src/components/ui src/data src/lib src/messages public/assets
```

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 14 project"
```

---

## Task 2: Tailwind Brand Config + Global CSS

**Files:**

- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace `tailwind.config.ts`**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: "#D61F3C",
          deep: "#8B1124",
          dark: "#B8182E",
        },
        cream: "#F0EAD2",
        dark: "#1A1A1A",
        body: "#555555",
        muted: "#888888",
        border: "#C0B898",
      },
      fontFamily: {
        display: ["var(--font-anton)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Replace `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply font-body bg-cream text-dark antialiased;
  }
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "chore: add brand design tokens to Tailwind config"
```

---

## Task 3: Translation System (HR/EN)

**Files:**

- Create: `src/lib/i18n.ts`
- Create: `src/messages/hr.json`
- Create: `src/messages/en.json`

- [ ] **Step 1: Create `src/messages/hr.json`**

```json
{
  "nav": {
    "bar": "Bar",
    "gastro": "Gastro",
    "beach": "Beach & Fun",
    "lokacija": "Lokacija",
    "karijere": "Karijere",
    "rezerviraj": "Rezerviraj Avanturu"
  },
  "hero": {
    "location": "Saccorgiana Beach, Pula",
    "title": "ZEPPELIN\nBEACH COMPLEX",
    "subtitle": "Tvoja baza za chill i polazište za svaku avanturu.",
    "cta_primary": "Istraži Ponudu",
    "cta_secondary": "Book Tours Online"
  },
  "bar": {
    "tag": "BAR & RELAX",
    "heading": "Chill na visokom nivou.",
    "description": "Opusti se uz savršene koktele, glazbu i pogled na more. Ugodna atmosfera, ležaljke i hlad terasa čekaju te svakog dana.",
    "menu_btn": "Digitalni Menu",
    "sunbed_label": "Najam ležaljki",
    "sunbed_info": "Info na licu mjesta — info pult"
  },
  "action": {
    "tag": "ACTION ZONE",
    "heading": "Na vodi, u zraku, na tlu.",
    "note": "Plaćanje na info pultu vodenih sportova",
    "activities": [
      { "id": "wibit", "name": "Wibit Park", "pricing": "1h · 3h · Dan" },
      { "id": "tramp", "name": "Trampolin", "pricing": "1h · 3h · Dan" },
      {
        "id": "pedaline",
        "name": "Pedaline & SUP",
        "pricing": "1h · 3h · Dan"
      },
      { "id": "kayak", "name": "Kayak Safari", "pricing": "1h · 3h · Dan" }
    ]
  },
  "adventure": {
    "tag": "ZEPPELIN ADVENTURE",
    "heading": "Rezerviraj svoju avanturu.",
    "subtitle": "Iskustva koja se pamte — booking online, polazak s naše plaže.",
    "cta": "Rezerviraj →",
    "items": [
      {
        "id": "jetski",
        "name": "Jet-Ski Safari",
        "url": "https://www.zeppelin-adventure.com"
      },
      {
        "id": "buggy",
        "name": "Buggy / Quad",
        "url": "https://www.zeppelin-adventure.com"
      },
      {
        "id": "flyboard",
        "name": "Flyboard",
        "url": "https://www.zeppelin-adventure.com"
      },
      {
        "id": "parasail",
        "name": "Parasailing",
        "url": "https://www.zeppelin-adventure.com"
      }
    ]
  },
  "gastro": {
    "tag": "BITES & SWEETS",
    "heading": "Fast food &\nGelaterija.",
    "menu_btn": "Pogledaj Jelovnik",
    "fastfood_name": "Fast Food",
    "fastfood_desc": "Burgeri, sendviči, grill",
    "gelato_name": "Gelaterija",
    "gelato_desc": "Sladoled, smoothie bowl"
  },
  "careers": {
    "tag": "KARIJERE",
    "heading": "Postani dio Zeppelin tima.",
    "subtitle": "Prijavi se za sezonu i radi na najljepšoj plaži u Puli.",
    "name_label": "Ime i prezime",
    "phone_label": "Mobitel",
    "email_label": "Email",
    "position_label": "Pozicija",
    "position_options": [
      "Bar",
      "Kuhinja",
      "Sportski instruktor",
      "Skipper",
      "Promocija"
    ],
    "languages_label": "Strani jezici",
    "license_label": "Dozvola za voditelja brodice",
    "license_yes": "Da",
    "license_no": "Ne",
    "from_label": "Dostupnost od",
    "to_label": "Dostupnost do",
    "experience_label": "Kratki opis iskustva",
    "cv_label": "Životopis (PDF)",
    "photo_label": "Fotografija (JPG/PNG)",
    "submit_btn": "Pošalji Prijavu",
    "success_msg": "Hvala! Kontaktirat ćemo te uskoro."
  },
  "location": {
    "heading": "Pronađi nas.",
    "directions": "Nalazimo se na Saccorgiana plaži u Puli. Pratite oznake za \"Zeppelin Beach\" od centra grada."
  },
  "footer": {
    "hours_title": "Radno vrijeme",
    "hours_bar": "Bar — 9:00–02:00",
    "hours_sports": "Sportovi — 9:00–19:00",
    "contact_title": "Kontakt",
    "phone": "+385 91 25 45 117",
    "whatsapp": "WhatsApp",
    "social_title": "Pratite nas",
    "instagram": "@zeppelinbar",
    "copyright": "© 2025 Zeppelin Beach Complex"
  }
}
```

- [ ] **Step 2: Create `src/messages/en.json`**

```json
{
  "nav": {
    "bar": "Bar",
    "gastro": "Gastro",
    "beach": "Beach & Fun",
    "lokacija": "Location",
    "karijere": "Careers",
    "rezerviraj": "Book Adventure"
  },
  "hero": {
    "location": "Saccorgiana Beach, Pula",
    "title": "ZEPPELIN\nBEACH COMPLEX",
    "subtitle": "Your base for chill — and the start of every adventure.",
    "cta_primary": "Explore Offer",
    "cta_secondary": "Book Tours Online"
  },
  "bar": {
    "tag": "BAR & RELAX",
    "heading": "Chill at the highest level.",
    "description": "Kick back with perfect cocktails, music, and a view of the sea. Great vibes, sunbeds, and shaded terraces waiting for you every day.",
    "menu_btn": "Digital Menu",
    "sunbed_label": "Sunbed rental",
    "sunbed_info": "Info at the water sports desk"
  },
  "action": {
    "tag": "ACTION ZONE",
    "heading": "On water, in the air, on land.",
    "note": "Pay at the water sports info desk",
    "activities": [
      { "id": "wibit", "name": "Wibit Park", "pricing": "1h · 3h · Day" },
      { "id": "tramp", "name": "Trampoline", "pricing": "1h · 3h · Day" },
      {
        "id": "pedaline",
        "name": "Pedal Boat & SUP",
        "pricing": "1h · 3h · Day"
      },
      { "id": "tube", "name": "Tube rides", "pricing": "1h · 3h · Day" }
    ]
  },
  "adventure": {
    "tag": "ZEPPELIN ADVENTURE",
    "heading": "Book your adventure.",
    "subtitle": "Unforgettable experiences — book online, depart from our beach.",
    "cta": "Book Now →",
    "items": [
      {
        "id": "jetski",
        "name": "Jet-Ski Safari",
        "url": "https://www.zeppelin-adventure.com"
      },
      {
        "id": "buggy",
        "name": "Buggy / Quad",
        "url": "https://www.zeppelin-adventure.com"
      },
      {
        "id": "flyboard",
        "name": "Flyboard",
        "url": "https://www.zeppelin-adventure.com"
      },
      {
        "id": "parasail",
        "name": "Parasailing",
        "url": "https://www.zeppelin-adventure.com"
      }
    ]
  },
  "gastro": {
    "tag": "BITES & SWEETS",
    "heading": "Fast food &\nGelato.",
    "menu_btn": "View Menu",
    "fastfood_name": "Fast Food",
    "fastfood_desc": "Burgers, sandwiches, grill",
    "gelato_name": "Gelato Bar",
    "gelato_desc": "Ice cream, smoothie bowls"
  },
  "careers": {
    "tag": "CAREERS",
    "heading": "Join the Zeppelin team.",
    "subtitle": "Apply for the season and work on the most beautiful beach in Pula.",
    "name_label": "Full name",
    "phone_label": "Phone",
    "email_label": "Email",
    "position_label": "Position",
    "position_options": [
      "Bar",
      "Kitchen",
      "Sports instructor",
      "Skipper",
      "Promotion"
    ],
    "languages_label": "Foreign languages",
    "license_label": "Boat skipper licence",
    "license_yes": "Yes",
    "license_no": "No",
    "from_label": "Available from",
    "to_label": "Available until",
    "experience_label": "Brief experience description",
    "cv_label": "CV (PDF)",
    "photo_label": "Photo (JPG/PNG)",
    "submit_btn": "Submit Application",
    "success_msg": "Thank you! We'll be in touch soon."
  },
  "location": {
    "heading": "Find us.",
    "directions": "We're on Saccorgiana Beach in Pula. Follow signs for \"Zeppelin Beach\" from the city centre."
  },
  "footer": {
    "hours_title": "Opening hours",
    "hours_bar": "Bar — 9:00–02:00",
    "hours_sports": "Sports — 9:00–19:00",
    "contact_title": "Contact",
    "phone": "+385 91 25 45 117",
    "whatsapp": "WhatsApp",
    "social_title": "Follow us",
    "instagram": "@zeppelinbar",
    "copyright": "© 2025 Zeppelin Beach Complex"
  }
}
```

- [ ] **Step 3: Create `src/lib/i18n.ts`**

```typescript
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import hr from '@/messages/hr.json'
import en from '@/messages/en.json'

type Locale = 'hr' | 'en'
type Messages = typeof hr

interface LocaleContextValue {
  locale: Locale
  t: Messages
  setLocale: (l: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const messages: Record<Locale, Messages> = { hr, en }

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('hr')

  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale | null
    if (stored === 'hr' || stored === 'en') setLocaleState(stored)
  }, [])

  function setLocale(l: Locale) {
    setLocaleState(l)
    localStorage.setItem('locale', l)
  }

  return (
    <LocaleContext.Provider value={{ locale, t: messages[locale], setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useT() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useT must be used inside LocaleProvider')
  return ctx
}
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/i18n.ts src/messages/
git commit -m "feat: add HR/EN translation system"
```

---

## Task 4: Root Layout + Fonts

**Files:**

- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace `src/app/layout.tsx`**

```typescript
import type { Metadata } from 'next'
import { Anton, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { LocaleProvider } from '@/lib/i18n'
import '@/app/globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Zeppelin Beach Complex | Saccorgiana Beach, Pula',
  description: 'Beach bar, vodeni sportovi, avanture i gastro na Saccorgiana plaži u Puli. Tvoja baza za chill i polazište za svaku avanturu.',
  keywords: ['beach bar pula', 'zeppelin bar', 'saccorgiana', 'vodeni sportovi pula', 'jet ski pula'],
  openGraph: {
    title: 'Zeppelin Beach Complex',
    description: 'Tvoja baza za chill i polazište za svaku avanturu.',
    url: 'https://zeppelinbar.com',
    siteName: 'Zeppelin Beach Complex',
    locale: 'hr_HR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr" className={`${anton.variable} ${inter.variable}`}>
      <body>
        <LocaleProvider>
          {children}
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify dev server starts without errors**

```bash
npm run dev
```

Expected: server starts on `http://localhost:3000`, no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: root layout with Anton/Inter fonts and LocaleProvider"
```

---

## Task 5: Shared UI Components

**Files:**

- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SectionTag.tsx`

- [ ] **Step 1: Create `src/components/ui/Button.tsx`**

```typescript
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'outline-dark'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, as: Tag = 'button', href, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-display tracking-widest transition-colors cursor-pointer rounded-lg'
    const sizes = {
      sm: 'px-5 py-2.5 text-xs',
      md: 'px-8 py-3.5 text-sm',
      lg: 'px-10 py-4 text-base',
    }
    const variants = {
      primary:      'bg-white text-red hover:bg-white/90',
      outline:      'border-2 border-white text-white hover:bg-white/10',
      'outline-dark': 'border-2 border-red text-red hover:bg-red hover:text-white',
    }

    if (Tag === 'a') {
      return (
        <a
          href={href}
          className={cn(base, sizes[size], variants[variant], className)}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      )
    }

    return (
      <button ref={ref} className={cn(base, sizes[size], variants[variant], className)} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
```

- [ ] **Step 2: Create `src/lib/utils.ts`**

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: Install `clsx` and `tailwind-merge`**

```bash
npm install clsx tailwind-merge
```

- [ ] **Step 4: Create `src/components/ui/SectionTag.tsx`**

```typescript
import { cn } from '@/lib/utils'

interface SectionTagProps {
  children: string
  light?: boolean
  className?: string
}

export function SectionTag({ children, light = false, className }: SectionTagProps) {
  return (
    <p className={cn(
      'font-display text-[11px] tracking-[0.3em] uppercase',
      light ? 'text-white/65' : 'text-red',
      className
    )}>
      {children}
    </p>
  )
}
```

- [ ] **Step 5: Create `src/components/ui/ActivityCard.tsx`**

```typescript
import { LucideIcon } from 'lucide-react'

interface ActivityCardProps {
  icon: LucideIcon
  name: string
  pricing: string
}

export function ActivityCard({ icon: Icon, name, pricing }: ActivityCardProps) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-cream rounded-xl flex-1 min-w-0">
      <Icon className="text-red" size={26} strokeWidth={1.5} />
      <p className="font-display text-dark text-sm leading-tight">{name}</p>
      <p className="text-muted text-xs">{pricing}</p>
    </div>
  )
}
```

- [ ] **Step 6: Create `src/components/ui/AdventureCard.tsx`**

```typescript
import { trackOutbound } from '@/lib/analytics'

interface AdventureCardProps {
  name: string
  url: string
  ctaLabel: string
}

export function AdventureCard({ name, url, ctaLabel }: AdventureCardProps) {
  return (
    <div className="flex flex-col gap-3 p-5 bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex-1 min-w-0">
      <div className="w-11 h-11 rounded-full bg-red" />
      <p className="font-display text-dark text-sm leading-tight">{name}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutbound(name)}
        className="mt-auto flex items-center justify-center h-9 bg-red text-white text-xs font-display tracking-widest rounded-lg hover:bg-red-dark transition-colors cursor-pointer"
      >
        {ctaLabel}
      </a>
    </div>
  )
}
```

- [ ] **Step 7: Create `src/lib/analytics.ts`**

```typescript
import { track } from "@vercel/analytics";

export function trackOutbound(label: string) {
  track("outbound_click", {
    destination: "zeppelin-adventure.com",
    label,
  });
}
```

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/ src/lib/
git commit -m "feat: shared UI components and analytics helper"
```

---

## Task 6: Header + Mobile Menu

**Files:**

- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/MobileMenu.tsx`

- [ ] **Step 1: Create `src/components/layout/MobileMenu.tsx`**

```typescript
'use client'

import { X } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { trackOutbound } from '@/lib/analytics'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

const NAV_ITEMS = [
  { key: 'bar' as const,      href: '/#bar' },
  { key: 'gastro' as const,   href: '/#gastro' },
  { key: 'beach' as const,    href: '/#action' },
  { key: 'lokacija' as const, href: '/#lokacija' },
  { key: 'karijere' as const, href: '/#karijere' },
]

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t, locale, setLocale } = useT()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-red flex flex-col">
      <div className="flex items-center justify-between px-5 h-16">
        <span className="font-display text-white text-xl tracking-wide">Zeppelin</span>
        <button onClick={onClose} aria-label="Close menu" className="cursor-pointer">
          <X className="text-white" size={24} />
        </button>
      </div>
      <nav className="flex flex-col gap-1 px-5 pt-6">
        {NAV_ITEMS.map(({ key, href }) => (
          <a
            key={key}
            href={href}
            onClick={onClose}
            className="font-display text-white text-2xl py-3 border-b border-white/10 hover:opacity-75 transition-opacity"
          >
            {t.nav[key]}
          </a>
        ))}
      </nav>
      <div className="mt-8 px-5 flex flex-col gap-4">
        <a
          href="https://www.zeppelin-adventure.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { trackOutbound('header-cta'); onClose() }}
          className="flex items-center justify-center h-12 border-2 border-white text-white font-display text-xs tracking-widest rounded-lg hover:bg-white/10 transition-colors"
        >
          {t.nav.rezerviraj.toUpperCase()}
        </a>
        <div className="flex gap-3">
          {(['hr', 'en'] as const).map(l => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`font-display text-sm px-3 py-1.5 rounded cursor-pointer transition-colors ${
                locale === l ? 'bg-white text-red' : 'text-white/70 hover:text-white'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/components/layout/Header.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { MobileMenu } from './MobileMenu'
import { trackOutbound } from '@/lib/analytics'

const NAV_ITEMS = [
  { key: 'bar' as const,      href: '/#bar' },
  { key: 'gastro' as const,   href: '/#gastro' },
  { key: 'beach' as const,    href: '/#action' },
  { key: 'lokacija' as const, href: '/#lokacija' },
  { key: 'karijere' as const, href: '/#karijere' },
]

export function Header() {
  const { t, locale, setLocale } = useT()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-red h-16 flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-5 lg:px-[60px] flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="font-display text-white text-xl lg:text-2xl tracking-wide">
            Zeppelin
          </a>

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
              {(['hr', 'en'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`text-xs font-semibold px-2 py-1 rounded cursor-pointer transition-colors ${
                    locale === l ? 'text-white' : 'text-white/55 hover:text-white/80'
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
              onClick={() => trackOutbound('header-cta')}
              className="border-2 border-white text-white font-display text-xs tracking-widest px-5 py-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              {t.nav.rezerviraj.toUpperCase()}
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-4">
            <div className="flex gap-1">
              {(['hr', 'en'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`text-xs font-semibold px-1.5 py-1 cursor-pointer ${
                    locale === l ? 'text-white' : 'text-white/50'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="cursor-pointer">
              <Menu className="text-white" size={24} />
            </button>
          </div>

        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/
git commit -m "feat: sticky header with desktop nav, language toggle, mobile drawer"
```

---

## Task 7: Hero Section

**Files:**

- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create `src/components/sections/Hero.tsx`**

```typescript
'use client'

import { MapPin } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'
import { trackOutbound } from '@/lib/analytics'

export function Hero() {
  const { t } = useT()

  return (
    <section className="relative w-full h-[100dvh] flex flex-col justify-end bg-gradient-to-b from-red-deep to-red overflow-hidden">

      {/* Video background — place hero.mp4 in public/assets/ */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/assets/hero-poster.jpg"
      >
        <source src="/assets/hero.mp4" type="video/mp4" />
      </video>

      {/* Red overlay */}
      <div className="absolute inset-0 bg-red/60" />

      {/* Content */}
      <div className="relative z-10 px-6 pb-10 lg:px-20 lg:pb-16 max-w-[800px]">
        {/* Location badge */}
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={14} className="text-white shrink-0" />
          <span className="text-white text-xs font-medium">{t.hero.location}</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-white text-[52px] lg:text-[88px] leading-none whitespace-pre-line mb-4">
          {t.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="text-white/85 text-base lg:text-lg leading-relaxed mb-7 max-w-[500px]">
          {t.hero.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            as="a"
            href="/#bar"
            variant="primary"
            className="bg-white text-red hover:bg-white/90 font-display tracking-widest text-sm lg:text-base"
          >
            {t.hero.cta_primary.toUpperCase()}
          </Button>
          <Button
            as="a"
            href="https://www.zeppelin-adventure.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            onClick={() => trackOutbound('hero-cta')}
            className="font-display tracking-widest text-sm lg:text-base"
          >
            {t.hero.cta_secondary.toUpperCase()} ↗
          </Button>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: hero section with video bg, overlay, bilingual CTAs"
```

---

## Task 8: Bar & Relax Section

**Files:**

- Create: `src/components/sections/BarRelax.tsx`

- [ ] **Step 1: Create `src/components/sections/BarRelax.tsx`**

```typescript
'use client'

import Image from 'next/image'
import { Umbrella } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { SectionTag } from '@/components/ui/SectionTag'
import { Button } from '@/components/ui/Button'

export function BarRelax() {
  const { t } = useT()

  return (
    <section id="bar" className="bg-cream py-12 lg:py-20 px-6 lg:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

        {/* Text */}
        <div className="flex flex-col gap-5 lg:w-[500px] order-2 lg:order-1">
          <SectionTag>{t.bar.tag}</SectionTag>
          <h2 className="font-display text-dark text-[34px] lg:text-[52px] leading-none">
            {t.bar.heading}
          </h2>
          <p className="text-body text-sm lg:text-base leading-relaxed">
            {t.bar.description}
          </p>
          <a
            href="/menu"
            className="self-start flex items-center justify-center h-12 px-8 bg-red text-white font-display text-sm tracking-widest rounded-lg hover:bg-red-dark transition-colors cursor-pointer"
          >
            {t.bar.menu_btn.toUpperCase()} →
          </a>
          {/* Sunbed info */}
          <div className="flex items-center gap-3 p-4 rounded-xl border border-border">
            <Umbrella size={22} className="text-red shrink-0" />
            <div>
              <p className="text-dark text-sm font-semibold">{t.bar.sunbed_label}</p>
              <p className="text-muted text-xs">{t.bar.sunbed_info}</p>
            </div>
          </div>
        </div>

        {/* Circular image */}
        <div className="relative w-48 h-48 lg:w-[360px] lg:h-[360px] rounded-full overflow-hidden bg-border shrink-0 order-1 lg:order-2">
          <Image
            src="/assets/bar-circle.jpg"
            alt="Zeppelin bar lounge"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 192px, 360px"
          />
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/BarRelax.tsx
git commit -m "feat: bar & relax section with circular image and menu CTA"
```

---

## Task 9: Action Zone Section

**Files:**

- Create: `src/components/sections/ActionZone.tsx`

- [ ] **Step 1: Create `src/components/sections/ActionZone.tsx`**

```typescript
'use client'

import { Waves, Dumbbell, Sailboat, Rows3 } from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { SectionTag } from '@/components/ui/SectionTag'
import { ActivityCard } from '@/components/ui/ActivityCard'
import { Info } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  wibit:    Waves,
  tramp:    Dumbbell,
  pedaline: Sailboat,
  kayak:    Rows3,
}

export function ActionZone() {
  const { t } = useT()

  return (
    <section id="action" className="bg-red py-12 lg:py-20 px-6 lg:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
          <div className="flex flex-col gap-2">
            <SectionTag light>{t.action.tag}</SectionTag>
            <h2 className="font-display text-white text-[34px] lg:text-[52px] leading-none max-w-[600px]">
              {t.action.heading}
            </h2>
          </div>
          <div className="flex items-start gap-2 lg:w-[240px]">
            <Info size={16} className="text-white/60 mt-0.5 shrink-0" />
            <p className="text-white/70 text-sm leading-relaxed">{t.action.note}</p>
          </div>
        </div>

        {/* Cards grid — 2col mobile, 4col desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {t.action.activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              icon={ICONS[activity.id] ?? Waves}
              name={activity.name}
              pricing={activity.pricing}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/ActionZone.tsx
git commit -m "feat: action zone section with pricing cards grid"
```

---

## Task 10: Adventure Section

**Files:**

- Create: `src/components/sections/Adventure.tsx`

- [ ] **Step 1: Create `src/components/sections/Adventure.tsx`**

```typescript
'use client'

import { useT } from '@/lib/i18n'
import { SectionTag } from '@/components/ui/SectionTag'
import { AdventureCard } from '@/components/ui/AdventureCard'

export function Adventure() {
  const { t } = useT()

  return (
    <section id="adventure" className="bg-cream py-12 lg:py-20 px-6 lg:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
          <div className="flex flex-col gap-2">
            <SectionTag>{t.adventure.tag}</SectionTag>
            <h2 className="font-display text-dark text-[34px] lg:text-[52px] leading-none max-w-[620px]">
              {t.adventure.heading}
            </h2>
          </div>
          <p className="text-muted text-sm leading-relaxed lg:w-[260px]">
            {t.adventure.subtitle}
          </p>
        </div>

        {/* Cards grid — 2col mobile, 4col desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {t.adventure.items.map((item) => (
            <AdventureCard
              key={item.id}
              name={item.name}
              url={item.url}
              ctaLabel={t.adventure.cta}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Adventure.tsx
git commit -m "feat: adventure upsell section with shop links and outbound tracking"
```

---

## Task 11: Gastro Section

**Files:**

- Create: `src/components/sections/Gastro.tsx`

- [ ] **Step 1: Create `src/components/sections/Gastro.tsx`**

```typescript
'use client'

import { Sandwich, IceCream } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { SectionTag } from '@/components/ui/SectionTag'

export function Gastro() {
  const { t } = useT()

  return (
    <section id="gastro" className="bg-red py-12 lg:py-20 px-6 lg:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

        {/* Left: title + CTA */}
        <div className="flex flex-col gap-6 lg:w-[480px] shrink-0">
          <SectionTag light>{t.gastro.tag}</SectionTag>
          <h2 className="font-display text-white text-[34px] lg:text-[52px] leading-none whitespace-pre-line">
            {t.gastro.heading}
          </h2>
          <a
            href="/food"
            className="self-start flex items-center justify-center px-8 h-12 border-2 border-white text-white font-display text-sm tracking-widest rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            {t.gastro.menu_btn.toUpperCase()} →
          </a>
        </div>

        {/* Right: 2 cards */}
        <div className="grid grid-cols-2 gap-4 w-full lg:flex-1">
          <div className="flex flex-col gap-3 p-5 lg:p-8 bg-red-dark rounded-2xl">
            <Sandwich size={36} className="text-white" strokeWidth={1.5} />
            <p className="font-display text-white text-lg lg:text-2xl">{t.gastro.fastfood_name}</p>
            <p className="text-white/75 text-xs lg:text-sm">{t.gastro.fastfood_desc}</p>
          </div>
          <div className="flex flex-col gap-3 p-5 lg:p-8 bg-red-dark rounded-2xl">
            <IceCream size={36} className="text-white" strokeWidth={1.5} />
            <p className="font-display text-white text-lg lg:text-2xl">{t.gastro.gelato_name}</p>
            <p className="text-white/75 text-xs lg:text-sm">{t.gastro.gelato_desc}</p>
          </div>
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Gastro.tsx
git commit -m "feat: gastro section with fast food and gelato cards"
```

---

## Task 12: Careers Section (Mock Form)

**Files:**

- Create: `src/components/sections/Careers.tsx`

- [ ] **Step 1: Create `src/components/sections/Careers.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { SectionTag } from '@/components/ui/SectionTag'

const schema = z.object({
  name:       z.string().min(2, 'Obavezno'),
  phone:      z.string().min(6, 'Obavezno'),
  email:      z.string().email('Neispravan email'),
  position:   z.string().min(1, 'Odaberi poziciju'),
  languages:  z.array(z.string()),
  license:    z.enum(['yes', 'no']),
  fromDate:   z.string().min(1, 'Obavezno'),
  toDate:     z.string().min(1, 'Obavezno'),
  experience: z.string().max(500),
})

type FormData = z.infer<typeof schema>

const inputCls = 'w-full h-12 px-4 bg-white border border-border rounded-lg text-sm text-dark focus:outline-none focus:ring-2 focus:ring-red/30'
const labelCls = 'text-xs font-semibold text-muted tracking-wide uppercase'

export function Careers() {
  const { t } = useT()
  const [submitted, setSubmitted] = useState(false)
  const LANGS = ['ENG', 'GER', 'ITA', 'FRA']

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { languages: [], license: 'no' },
  })

  const selectedLangs = watch('languages') ?? []

  function toggleLang(lang: string) {
    const next = selectedLangs.includes(lang)
      ? selectedLangs.filter(l => l !== lang)
      : [...selectedLangs, lang]
    setValue('languages', next)
  }

  function onSubmit(_data: FormData) {
    // v1: mock — no backend
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="karijere" className="bg-cream py-20 px-6 flex flex-col items-center gap-4">
        <CheckCircle size={48} className="text-red" />
        <p className="font-display text-dark text-2xl text-center">{t.careers.success_msg}</p>
      </section>
    )
  }

  return (
    <section id="karijere" className="bg-cream py-12 lg:py-20 px-6 lg:px-[120px]">
      <div className="max-w-[680px] mx-auto flex flex-col gap-6">
        <SectionTag>{t.careers.tag}</SectionTag>
        <h2 className="font-display text-dark text-[34px] lg:text-[44px] leading-none">
          {t.careers.heading}
        </h2>
        <p className="text-body text-sm">{t.careers.subtitle}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>{t.careers.name_label}</label>
            <input {...register('name')} className={inputCls} />
            {errors.name && <p className="text-red text-xs">{errors.name.message}</p>}
          </div>

          {/* Phone + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>{t.careers.phone_label}</label>
              <input {...register('phone')} type="tel" className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>{t.careers.email_label}</label>
              <input {...register('email')} type="email" className={inputCls} />
              {errors.email && <p className="text-red text-xs">{errors.email.message}</p>}
            </div>
          </div>

          {/* Position */}
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>{t.careers.position_label}</label>
            <select {...register('position')} className={inputCls}>
              <option value="">—</option>
              {t.careers.position_options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Languages */}
          <div className="flex flex-col gap-2">
            <label className={labelCls}>{t.careers.languages_label}</label>
            <div className="flex gap-2 flex-wrap">
              {LANGS.map(lang => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLang(lang)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors cursor-pointer ${
                    selectedLangs.includes(lang)
                      ? 'bg-red text-white border-red'
                      : 'bg-white text-dark border-border hover:border-red/40'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Licence */}
          <div className="flex flex-col gap-2">
            <label className={labelCls}>{t.careers.license_label}</label>
            <div className="flex gap-4">
              {(['yes', 'no'] as const).map(val => (
                <label key={val} className="flex items-center gap-2 cursor-pointer">
                  <input {...register('license')} type="radio" value={val} className="accent-red" />
                  <span className="text-sm text-dark">
                    {val === 'yes' ? t.careers.license_yes : t.careers.license_no}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>{t.careers.from_label}</label>
              <input {...register('fromDate')} type="date" className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>{t.careers.to_label}</label>
              <input {...register('toDate')} type="date" className={inputCls} />
            </div>
          </div>

          {/* Experience */}
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>{t.careers.experience_label}</label>
            <textarea
              {...register('experience')}
              rows={4}
              maxLength={500}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-sm text-dark resize-none focus:outline-none focus:ring-2 focus:ring-red/30"
            />
          </div>

          {/* File uploads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>{t.careers.cv_label}</label>
              <input type="file" accept=".pdf" className="text-sm text-dark file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red file:text-white file:text-xs file:font-display file:cursor-pointer" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>{t.careers.photo_label}</label>
              <input type="file" accept="image/*" className="text-sm text-dark file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red file:text-white file:text-xs file:font-display file:cursor-pointer" />
            </div>
          </div>

          <button
            type="submit"
            className="h-14 bg-red text-white font-display text-sm tracking-widest rounded-lg hover:bg-red-dark transition-colors cursor-pointer mt-2"
          >
            {t.careers.submit_btn.toUpperCase()}
          </button>
        </form>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Careers.tsx
git commit -m "feat: careers mock form with RHF + Zod validation"
```

---

## Task 13: Location + Footer

**Files:**

- Create: `src/components/sections/Location.tsx`
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create `src/components/sections/Location.tsx`**

```typescript
'use client'

import { useT } from '@/lib/i18n'
import { SectionTag } from '@/components/ui/SectionTag'

export function Location() {
  const { t } = useT()

  return (
    <section id="lokacija" className="bg-cream pt-12 lg:pt-20 px-6 lg:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
        <SectionTag>{t.location.heading.toUpperCase()}</SectionTag>
        <h2 className="font-display text-dark text-[34px] lg:text-[44px] leading-none">
          {t.location.heading}
        </h2>
        <p className="text-body text-sm max-w-[500px] leading-relaxed">
          {t.location.directions}
        </p>
        {/* Google Maps embed — replace src with actual embed URL from Google Maps */}
        <div className="w-full h-64 lg:h-96 rounded-2xl overflow-hidden bg-border">
          <iframe
            title="Zeppelin Beach location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2822.5!2d13.85!3d44.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDUxJzAwLjAiTiAxM8KwNTEnMDAuMCJF!5e0!3m2!1shr!2shr!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/layout/Footer.tsx`**

```typescript
'use client'

import { Camera, Phone, MessageCircle } from 'lucide-react'
import { useT } from '@/lib/i18n'

export function Footer() {
  const { t } = useT()

  return (
    <footer className="bg-red pt-12 pb-8 px-6 lg:px-[120px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-10 border-b border-white/15">

          {/* Col 1: Brand */}
          <div className="flex flex-col gap-4">
            <p className="font-display text-white text-3xl tracking-wide">Zeppelin</p>
            <p className="text-white/70 text-sm leading-relaxed">
              Beach & Lounge Bar<br />Saccorgiana Beach, Pula
            </p>
            <a
              href="https://instagram.com/zeppelinbar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
            >
              <Camera size={16} />
              {t.footer.instagram}
            </a>
          </div>

          {/* Col 2: Hours */}
          <div className="flex flex-col gap-3">
            <p className="text-white/50 text-xs tracking-widest font-semibold uppercase">
              {t.footer.hours_title}
            </p>
            <p className="text-white/85 text-sm leading-relaxed">
              {t.footer.hours_bar}<br />{t.footer.hours_sports}
            </p>
          </div>

          {/* Col 3: Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-white/50 text-xs tracking-widest font-semibold uppercase">
              {t.footer.contact_title}
            </p>
            <a href="tel:+385912545117" className="flex items-center gap-2 text-white/85 hover:text-white text-sm transition-colors">
              <Phone size={15} />
              {t.footer.phone}
            </a>
            <a href="https://wa.me/385912545117" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/85 hover:text-white text-sm transition-colors">
              <MessageCircle size={15} />
              {t.footer.whatsapp}
            </a>
          </div>

        </div>

        <p className="text-white/35 text-xs text-center pt-6">{t.footer.copyright}</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Location.tsx src/components/layout/Footer.tsx
git commit -m "feat: location map section and footer"
```

---

## Task 14: Homepage Assembly

**Files:**

- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx`**

```typescript
import { Header }     from '@/components/layout/Header'
import { Footer }     from '@/components/layout/Footer'
import { Hero }       from '@/components/sections/Hero'
import { BarRelax }   from '@/components/sections/BarRelax'
import { ActionZone } from '@/components/sections/ActionZone'
import { Adventure }  from '@/components/sections/Adventure'
import { Gastro }     from '@/components/sections/Gastro'
import { Careers }    from '@/components/sections/Careers'
import { Location }   from '@/components/sections/Location'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Hero />
        <BarRelax />
        <ActionZone />
        <Adventure />
        <Gastro />
        <Careers />
        <Location />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run dev server and verify all sections render**

```bash
npm run dev
```

Open `http://localhost:3000` — check: header, hero (gradient bg if no video), all sections present, footer visible. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble homepage with all sections"
```

---

## Task 15: Menu Data + `/menu` Page

**Files:**

- Create: `src/data/menu.ts`
- Create: `src/app/menu/page.tsx`

- [ ] **Step 1: Create `src/data/menu.ts`**

```typescript
export interface MenuItem {
  name_hr: string;
  name_en: string;
  price: string;
}

export interface MenuCategory {
  id: string;
  label_hr: string;
  label_en: string;
  items: MenuItem[];
}

export const barMenu: MenuCategory[] = [
  {
    id: "cocktails",
    label_hr: "Kokteli",
    label_en: "Cocktails",
    items: [
      { name_hr: "Mojito", name_en: "Mojito", price: "9€" },
      { name_hr: "Aperol Spritz", name_en: "Aperol Spritz", price: "8€" },
      { name_hr: "Piña Colada", name_en: "Piña Colada", price: "10€" },
      { name_hr: "Sex on the Beach", name_en: "Sex on the Beach", price: "9€" },
    ],
  },
  {
    id: "beer",
    label_hr: "Pivo",
    label_en: "Beer",
    items: [
      { name_hr: "Točeno pivo 0.5L", name_en: "Draft beer 0.5L", price: "4€" },
      { name_hr: "Corona Extra", name_en: "Corona Extra", price: "5€" },
    ],
  },
  {
    id: "soft",
    label_hr: "Bezalkoholna pića",
    label_en: "Soft Drinks",
    items: [
      { name_hr: "Coca-Cola 0.33L", name_en: "Coca-Cola 0.33L", price: "3€" },
      { name_hr: "Voda 0.5L", name_en: "Water 0.5L", price: "2€" },
      { name_hr: "Svježi sokovi", name_en: "Fresh juices", price: "5€" },
    ],
  },
  {
    id: "coffee",
    label_hr: "Kava",
    label_en: "Coffee",
    items: [
      { name_hr: "Espresso", name_en: "Espresso", price: "2€" },
      { name_hr: "Cappuccino", name_en: "Cappuccino", price: "3€" },
      { name_hr: "Ledena kava", name_en: "Iced coffee", price: "4€" },
    ],
  },
];
```

- [ ] **Step 2: Create `src/app/menu/page.tsx`**

```typescript
import type { Metadata } from 'next'
import { barMenu } from '@/data/menu'

export const metadata: Metadata = {
  title: 'Bar Menu | Zeppelin Beach',
  description: 'Digitalni menu Zeppelin beach bara — kokteli, pivo, bezalkoholna pića i kava.',
}

export default function MenuPage() {
  const categories = barMenu

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-red px-6 py-8 text-center">
        <a href="/" className="font-display text-white text-2xl tracking-wide block mb-1">Zeppelin</a>
        <p className="text-white/70 text-sm">Bar Menu</p>
      </div>

      {/* Sticky category tabs */}
      <nav className="sticky top-0 bg-white border-b border-border z-10 overflow-x-auto">
        <div className="flex gap-0 px-4 min-w-max">
          {categories.map(cat => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="px-4 py-3 text-xs font-semibold text-muted hover:text-dark whitespace-nowrap transition-colors"
            >
              {cat.label_hr}
            </a>
          ))}
        </div>
      </nav>

      {/* Menu items */}
      <div className="px-6 py-6 max-w-lg mx-auto flex flex-col gap-10">
        {categories.map(cat => (
          <section key={cat.id} id={cat.id}>
            <h2 className="font-display text-dark text-2xl mb-4">{cat.label_hr}</h2>
            <div className="flex flex-col gap-0 divide-y divide-border/50">
              {cat.items.map(item => (
                <div key={item.name_hr} className="flex justify-between items-center py-3">
                  <span className="text-dark text-sm">{item.name_hr}</span>
                  <span className="font-semibold text-dark text-sm">{item.price}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="text-center py-8">
        <a href="/" className="text-muted text-sm hover:text-dark transition-colors">← Nazad na stranicu</a>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Verify `/menu` at `http://localhost:3000/menu`**

Check: logo, sticky tabs, all categories, item names and prices visible, mobile-readable.

- [ ] **Step 4: Commit**

```bash
git add src/data/menu.ts src/app/menu/
git commit -m "feat: /menu page with sticky category tabs and bar menu data"
```

---

## Task 16: Food Data + `/food` Page

**Files:**

- Create: `src/data/food.ts`
- Create: `src/app/food/page.tsx`

- [ ] **Step 1: Create `src/data/food.ts`**

```typescript
import type { MenuCategory } from "./menu";

export const foodMenu: MenuCategory[] = [
  {
    id: "fastfood",
    label_hr: "Fast Food",
    label_en: "Fast Food",
    items: [
      { name_hr: "Cheeseburger", name_en: "Cheeseburger", price: "8€" },
      { name_hr: "BBQ Burger", name_en: "BBQ Burger", price: "10€" },
      { name_hr: "Hot Dog", name_en: "Hot Dog", price: "5€" },
      { name_hr: "Pommes frites", name_en: "French fries", price: "4€" },
      {
        name_hr: "Sendvič s piletinom",
        name_en: "Chicken sandwich",
        price: "7€",
      },
    ],
  },
  {
    id: "gelato",
    label_hr: "Gelaterija",
    label_en: "Gelato",
    items: [
      {
        name_hr: "Sladoled 1 kugla",
        name_en: "Ice cream 1 scoop",
        price: "2€",
      },
      {
        name_hr: "Sladoled 2 kugle",
        name_en: "Ice cream 2 scoops",
        price: "3.5€",
      },
      { name_hr: "Smoothie bowl", name_en: "Smoothie bowl", price: "7€" },
      { name_hr: "Waffle s kuglom", name_en: "Waffle with scoop", price: "5€" },
    ],
  },
];
```

- [ ] **Step 2: Create `src/app/food/page.tsx`**

```typescript
import type { Metadata } from 'next'
import { foodMenu } from '@/data/food'

export const metadata: Metadata = {
  title: 'Food Menu | Zeppelin Beach',
  description: 'Fast food i gelaterija na Zeppelin beach-u — burgeri, sendviči, sladoled.',
}

export default function FoodPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-red px-6 py-8 text-center">
        <a href="/" className="font-display text-white text-2xl tracking-wide block mb-1">Zeppelin</a>
        <p className="text-white/70 text-sm">Food Menu</p>
      </div>

      <nav className="sticky top-0 bg-white border-b border-border z-10 overflow-x-auto">
        <div className="flex gap-0 px-4 min-w-max">
          {foodMenu.map(cat => (
            <a key={cat.id} href={`#${cat.id}`} className="px-4 py-3 text-xs font-semibold text-muted hover:text-dark whitespace-nowrap transition-colors">
              {cat.label_hr}
            </a>
          ))}
        </div>
      </nav>

      <div className="px-6 py-6 max-w-lg mx-auto flex flex-col gap-10">
        {foodMenu.map(cat => (
          <section key={cat.id} id={cat.id}>
            <h2 className="font-display text-dark text-2xl mb-4">{cat.label_hr}</h2>
            <div className="flex flex-col gap-0 divide-y divide-border/50">
              {cat.items.map(item => (
                <div key={item.name_hr} className="flex justify-between items-center py-3">
                  <span className="text-dark text-sm">{item.name_hr}</span>
                  <span className="font-semibold text-dark text-sm">{item.price}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="text-center py-8">
        <a href="/" className="text-muted text-sm hover:text-dark transition-colors">← Nazad na stranicu</a>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/food.ts src/app/food/
git commit -m "feat: /food page with fast food and gelato menu"
```

---

## Task 17: `next.config.ts` + Performance Pass

**Files:**

- Modify: `next.config.ts`

- [ ] **Step 1: Update `next.config.ts`**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440],
  },
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 2: Add `public/assets/.gitkeep`**

```bash
touch public/assets/.gitkeep
```

Add a comment in `src/components/sections/Hero.tsx` near the `<video>` element:

```typescript
{
  /*
  ASSETS REQUIRED (drop in public/assets/):
  - hero.mp4     — video loop (< 5MB, H.264, 1920x1080)
  - hero-poster.jpg — first frame of video (used while video loads)
  - bar-circle.jpg  — circular bar photo (used in BarRelax section)
*/
}
```

- [ ] **Step 3: Run build check**

```bash
npm run build
```

Expected: builds successfully with no TypeScript errors.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "chore: next.config, asset caching, build verification"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement                     | Task                                                   |
| ------------------------------------ | ------------------------------------------------------ |
| Next.js 14 App Router                | Task 1                                                 |
| Tailwind brand colors                | Task 2                                                 |
| HR/EN language toggle                | Task 3, 4, Header                                      |
| Sticky header + mobile drawer        | Task 6                                                 |
| Hero video bg + overlay + CTAs       | Task 7                                                 |
| Bar & Relax + `/menu` link           | Task 8                                                 |
| Action Zone pricing cards            | Task 9                                                 |
| Adventure upsell + outbound tracking | Task 10                                                |
| Gastro + `/food` link                | Task 11                                                |
| Careers mock form (RHF + Zod)        | Task 12                                                |
| Location map + footer                | Task 13                                                |
| Homepage assembly                    | Task 14                                                |
| `/menu` QR page                      | Task 15                                                |
| `/food` QR page                      | Task 16                                                |
| next/image, caching, build check     | Task 17                                                |
| `trackOutbound()` on adventure cards | Task 5 (AdventureCard), Task 7 (Hero), Task 6 (Header) |

All spec requirements covered. ✅
