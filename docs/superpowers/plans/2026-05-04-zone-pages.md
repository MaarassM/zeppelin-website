# Zone Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add dedicated pages for each ActionZone activity card (Wibit Park, Trampoline, Pedal Boat & SUP, Tube Rides), reachable via top-level routes `/wibit`, `/trampoline`, `/pedaline`, `/tube`.

**Architecture:** Each activity card becomes a Next.js `<Link>`. A shared `ZonePageClient` client component reads zone data from translations via `useT()` and renders the page layout. Each route's `page.tsx` is a server component that passes the zone ID to `ZonePageClient`. Zone content lives in `en.json` / `hr.json` under a new `zones` key.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, next/image, next/link, existing `useT()` i18n hook.

---

## File Map

| Action | File |
|--------|------|
| Modify | `src/messages/en.json` — add `zones` key with content for all 4 activities |
| Modify | `src/messages/hr.json` — add `zones` key (Croatian) |
| Modify | `src/components/ui/ActivityCard.tsx` — add optional `href` prop, wrap in `<Link>` |
| Modify | `src/components/sections/ActionZone.tsx` — pass `href` to each ActivityCard |
| Create | `src/components/ui/ZonePageClient.tsx` — shared client component for zone page layout |
| Create | `src/app/wibit/page.tsx` |
| Create | `src/app/trampoline/page.tsx` |
| Create | `src/app/pedaline/page.tsx` |
| Create | `src/app/tube/page.tsx` |

---

### Task 1: Add zone content to translations

**Files:**
- Modify: `src/messages/en.json`
- Modify: `src/messages/hr.json`

- [ ] **Step 1: Add `zones` key to `en.json`**

Inside the root JSON object of `src/messages/en.json`, add after the `"action"` block:

```json
"zones": {
  "wibit": {
    "tagline": "Jump, climb, slide.",
    "description": "An inflatable obstacle course on open water — test your balance, race your friends, and battle the obstacles. Open for all ages.",
    "features": ["Climbing walls", "Slides", "Balance beams", "Jump platforms"],
    "pricing": "1h · 3h · Day pass",
    "pay_note": "Pay at the water sports desk"
  },
  "tramp": {
    "tagline": "Bounce into the sea.",
    "description": "A water trampoline anchored just off the shore — jump high, flip, and land in the sea. Pure fun for all ages.",
    "features": ["Anchored offshore", "All ages welcome", "Jump & flip"],
    "pricing": "1h · 3h · Day pass",
    "pay_note": "Pay at the water sports desk"
  },
  "pedaline": {
    "tagline": "Explore at your own pace.",
    "description": "Pedal boats for families and groups, stand-up paddleboards for those who like a challenge. Navigate the bay and enjoy the view.",
    "features": ["Pedal boats", "Stand-up paddleboard (SUP)", "All levels welcome"],
    "pricing": "1h · 3h · Day pass",
    "pay_note": "Pay at the water sports desk"
  },
  "tube": {
    "tagline": "Hold on tight.",
    "description": "High-speed rides on the sea — pick your tube, grab the handles, and get dragged across the waves at full throttle. Multiple configurations available.",
    "features": ["Single", "Twister", "Banana", "Family Couch", "Group Couch"],
    "pricing": "Per ride",
    "pay_note": "Pay at the water sports desk"
  }
}
```

- [ ] **Step 2: Add `zones` key to `hr.json`**

Inside the root JSON object of `src/messages/hr.json`, add after the `"action"` block:

```json
"zones": {
  "wibit": {
    "tagline": "Skoči, penjaj se, klizaj.",
    "description": "Napuhani poligon prepreka na otvorenom moru — testiraj ravnotežu, natječi se s prijateljima i osvoji prepreke. Otvoreno za sve uzraste.",
    "features": ["Penjačke stijene", "Tobogani", "Greble za ravnotežu", "Skakaonice"],
    "pricing": "1h · 3h · Dnevna karta",
    "pay_note": "Plaćanje na info pultu vodenih sportova"
  },
  "tramp": {
    "tagline": "Odskoči u more.",
    "description": "Trampolin usidren uz obalu — skači visoko, napravi salto i sruši se u more. Čista zabava za sve generacije.",
    "features": ["Usidreno uz obalu", "Za sve uzraste", "Skakanje i saltosi"],
    "pricing": "1h · 3h · Dnevna karta",
    "pay_note": "Plaćanje na info pultu vodenih sportova"
  },
  "pedaline": {
    "tagline": "Istraži vlastitim tempom.",
    "description": "Pedaline za obitelj i grupe, SUP daske za one koji vole izazov. Prošetaj uvalom i uživaj u pogledu.",
    "features": ["Pedaline", "Stand-up paddleboard (SUP)", "Za sve razine"],
    "pricing": "1h · 3h · Dnevna karta",
    "pay_note": "Plaćanje na info pultu vodenih sportova"
  },
  "tube": {
    "tagline": "Drži se čvrsto.",
    "description": "Adrenalinske vožnje morem — odaberi svoju tubu, uhvati drške i daj se vući valovima punom brzinom. Dostupno u više konfiguracija.",
    "features": ["Single", "Twister", "Banana", "Family Couch", "Group Couch"],
    "pricing": "Po vožnji",
    "pay_note": "Plaćanje na info pultu vodenih sportova"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/messages/en.json src/messages/hr.json
git commit -m "feat: add zone page content to translations"
```

---

### Task 2: Make ActivityCard linkable

**Files:**
- Modify: `src/components/ui/ActivityCard.tsx`

- [ ] **Step 1: Read current ActivityCard**

Current content of `src/components/ui/ActivityCard.tsx`:
```tsx
import Image from "next/image";
import { LucideIcon } from "lucide-react";

interface ActivityCardProps {
  icon: LucideIcon;
  name: string;
  pricing: string;
  image: string;
}

export function ActivityCard({ icon: Icon, name, pricing, image }: ActivityCardProps) {
  return (
    <div className="relative flex flex-col justify-end gap-1 p-4 rounded-xl overflow-hidden min-h-[180px] lg:min-h-[220px]">
      <Image src={image} alt={name} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="relative flex flex-col gap-1">
        <Icon className="text-white/80 mb-1" size={22} strokeWidth={1.5} />
        <p className="font-display text-white text-sm leading-tight">{name}</p>
        <p className="text-white/60 text-xs">{pricing}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace with link-aware version**

Replace the entire file with:

```tsx
import Image from "next/image";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ActivityCardProps {
  icon: LucideIcon;
  name: string;
  pricing: string;
  image: string;
  href?: string;
}

export function ActivityCard({ icon: Icon, name, pricing, image, href }: ActivityCardProps) {
  const inner = (
    <>
      <Image src={image} alt={name} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      {href && (
        <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors duration-200" />
      )}
      <div className="relative flex flex-col gap-1">
        <Icon className="text-white/80 mb-1" size={22} strokeWidth={1.5} />
        <p className="font-display text-white text-sm leading-tight">{name}</p>
        <p className="text-white/60 text-xs">{pricing}</p>
      </div>
    </>
  );

  const className = "relative flex flex-col justify-end gap-1 p-4 rounded-xl overflow-hidden min-h-[180px] lg:min-h-[220px]";

  if (href) {
    return <Link href={href} className={className}>{inner}</Link>;
  }

  return <div className={className}>{inner}</div>;
}
```

- [ ] **Step 3: Update ActionZone to pass hrefs**

In `src/components/sections/ActionZone.tsx`, add an `HREFS` map and pass it to `ActivityCard`:

```tsx
const HREFS: Record<string, string> = {
  wibit: "/wibit",
  tramp: "/trampoline",
  pedaline: "/pedaline",
  tube: "/tube",
};
```

In the `ActivityCard` render inside `.map()`, add `href={HREFS[activity.id]}`:

```tsx
<ActivityCard
  key={activity.id}
  icon={ICONS[activity.id] ?? Waves}
  image={IMAGES[activity.id] ?? ""}
  name={activity.name}
  pricing={activity.pricing}
  href={HREFS[activity.id]}
/>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ActivityCard.tsx src/components/sections/ActionZone.tsx
git commit -m "feat: make activity cards linkable with optional href prop"
```

---

### Task 3: Build shared ZonePageClient component

**Files:**
- Create: `src/components/ui/ZonePageClient.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { useT } from "@/lib/i18n";

const IMAGES: Record<string, string> = {
  wibit: "/assets/wibit.jpg",
  tramp: "/assets/trampoline.jpg",
  pedaline: "/assets/pedaline.jpg",
  tube: "/assets/tube.jpg",
};

interface ZonePageClientProps {
  zoneId: "wibit" | "tramp" | "pedaline" | "tube";
  name: string;
}

export function ZonePageClient({ zoneId, name }: ZonePageClientProps) {
  const { t } = useT();
  const zone = t.zones[zoneId];
  const image = IMAGES[zoneId];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[360px]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />

        {/* Back button */}
        <Link
          href="/#action"
          className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        {/* Zone name + tagline */}
        <div className="absolute bottom-8 left-6 right-6 lg:left-[120px] lg:right-[120px] max-w-[800px]">
          <p className="text-red-400 text-xs font-medium uppercase tracking-widest mb-2">
            ACTION ZONE
          </p>
          <h1 className="font-display text-white text-[40px] lg:text-[64px] leading-none mb-3">
            {name}
          </h1>
          <p className="text-white/70 text-lg lg:text-xl leading-snug">
            {zone.tagline}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-[120px] py-12 lg:py-20 max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-20">
          {/* Left: description + features */}
          <div className="flex flex-col gap-8">
            <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-[600px]">
              {zone.description}
            </p>

            {zone.features.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="text-white/40 text-xs uppercase tracking-widest">
                  What's included
                </p>
                <div className="flex flex-wrap gap-2">
                  {zone.features.map((feature: string) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 rounded-full border border-white/20 text-white/70 text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: pricing info */}
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col gap-4">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                  Pricing
                </p>
                <p className="font-display text-white text-2xl">{zone.pricing}</p>
              </div>
              <div className="border-t border-white/10 pt-4 flex items-start gap-2">
                <MapPin size={14} className="text-white/40 mt-0.5 shrink-0" />
                <p className="text-white/50 text-sm leading-relaxed">
                  {zone.pay_note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/ZonePageClient.tsx
git commit -m "feat: add shared ZonePageClient component for zone detail pages"
```

---

### Task 4: Create the four zone pages

**Files:**
- Create: `src/app/wibit/page.tsx`
- Create: `src/app/trampoline/page.tsx`
- Create: `src/app/pedaline/page.tsx`
- Create: `src/app/tube/page.tsx`

- [ ] **Step 1: Create `/wibit/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";

export const metadata: Metadata = {
  title: "Wibit Park | Zeppelin Beach",
  description: "An inflatable obstacle course on open water — jump, climb, slide. Open for all ages at Zeppelin Beach, Pula.",
};

export default function WibitPage() {
  return <ZonePageClient zoneId="wibit" name="Wibit Park" />;
}
```

- [ ] **Step 2: Create `/trampoline/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";

export const metadata: Metadata = {
  title: "Trampoline | Zeppelin Beach",
  description: "Water trampoline anchored off the shore — jump high and land in the sea. All ages welcome at Zeppelin Beach, Pula.",
};

export default function TrampolinePage() {
  return <ZonePageClient zoneId="tramp" name="Trampoline" />;
}
```

- [ ] **Step 3: Create `/pedaline/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";

export const metadata: Metadata = {
  title: "Pedal Boat & SUP | Zeppelin Beach",
  description: "Pedal boats and stand-up paddleboards available at Zeppelin Beach, Pula. Explore the bay at your own pace.",
};

export default function PedalinePage() {
  return <ZonePageClient zoneId="pedaline" name="Pedal Boat & SUP" />;
}
```

- [ ] **Step 4: Create `/tube/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";

export const metadata: Metadata = {
  title: "Tube Rides | Zeppelin Beach",
  description: "High-speed tube rides on the sea — Single, Twister, Banana, Family Couch, Group Couch. At Zeppelin Beach, Pula.",
};

export default function TubePage() {
  return <ZonePageClient zoneId="tube" name="Tube Rides" />;
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/wibit/page.tsx src/app/trampoline/page.tsx src/app/pedaline/page.tsx src/app/tube/page.tsx
git commit -m "feat: add zone detail pages for Wibit, Trampoline, Pedaline, Tube"
```

---

### Task 5: Type-check and verify

- [ ] **Step 1: Run type check**

```bash
cd "/Users/mihaelmaras/Desktop/private work/zeppelin-website" && npx tsc --noEmit
```

Expected: no errors. If `t.zones` is not typed, check `src/lib/i18n.tsx` — the `useT()` hook likely infers types from the JSON. If you get a type error on `t.zones[zoneId]`, cast with `(t.zones as any)[zoneId]` as a last resort but prefer adding the type properly.

- [ ] **Step 2: Start dev server and verify all four pages load**

```bash
cd "/Users/mihaelmaras/Desktop/private work/zeppelin-website" && bun dev
```

Visit in browser:
- `http://localhost:3000` — confirm activity cards are now clickable links
- `http://localhost:3000/wibit`
- `http://localhost:3000/trampoline`
- `http://localhost:3000/pedaline`
- `http://localhost:3000/tube`

Each page should show: hero image, zone name, tagline, description, feature tags, pricing card.

- [ ] **Step 3: Commit if any fixes were needed**

```bash
git add -p
git commit -m "fix: resolve type errors in zone pages"
```
