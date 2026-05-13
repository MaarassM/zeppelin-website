# Activity Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a masonry photo gallery with lightbox to every individual activity page on the Zeppelin Beach website.

**Architecture:** A shared `ActivityGallery` client component renders a CSS-columns masonry grid and owns lightbox state via `yet-another-react-lightbox`. A `gallery.ts` data file maps category slugs to image path arrays. The three existing page-client components (`ZonePageClient`, `BarPageClient`, `GastroPageClient`) each receive an optional `gallery` prop and render the component below existing content.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, `yet-another-react-lightbox`, TypeScript

---

## File Map

| Action | File | Purpose |
|---|---|---|
| Install | — | `yet-another-react-lightbox` package |
| Create | `src/data/gallery.ts` | Category slug → image paths mapping |
| Create | `src/components/ui/ActivityGallery.tsx` | Masonry grid + lightbox component |
| Modify | `src/components/ui/ZonePageClient.tsx` | Add `gallery` prop, render `ActivityGallery` |
| Modify | `src/components/ui/BarPageClient.tsx` | Add `gallery` prop, render `ActivityGallery` |
| Modify | `src/components/ui/GastroPageClient.tsx` | Add `gallery` prop, render `ActivityGallery` |
| Modify | `src/app/jetski/page.tsx` | Pass `galleryImages.jetski` |
| Modify | `src/app/wibit/page.tsx` | Pass `galleryImages.wibit` |
| Modify | `src/app/trampoline/page.tsx` | Pass `galleryImages.tramp` |
| Modify | `src/app/tube/page.tsx` | Pass `galleryImages.tube` |
| Modify | `src/app/pedaline/page.tsx` | Pass `galleryImages.pedaline` |
| Modify | `src/app/scuba/page.tsx` | Pass `galleryImages.scuba` |
| Modify | `src/app/bar/page.tsx` | Pass `galleryImages.bar` |
| Modify | `src/app/relax/page.tsx` | Pass `galleryImages.relax` |
| Modify | `src/app/fastfood/page.tsx` | Pass `galleryImages.fastfood` |
| Modify | `src/app/gelato/page.tsx` | Pass `galleryImages.gelato` |

> **Note:** No test infrastructure exists in this project. Skip TDD steps — verify with `npm run build` and visual inspection in the browser instead.

---

### Task 1: Install yet-another-react-lightbox

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install the package**

```bash
npm install yet-another-react-lightbox
```

Expected output: package added, `package.json` updated with `"yet-another-react-lightbox": "^3.x.x"`.

- [ ] **Step 2: Verify TypeScript types are included**

```bash
cat node_modules/yet-another-react-lightbox/package.json | grep '"types"'
```

Expected: a `"types"` field pointing to a `.d.ts` file (types are bundled, no `@types` package needed).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add yet-another-react-lightbox"
```

---

### Task 2: Create gallery data file

**Files:**
- Create: `src/data/gallery.ts`

- [ ] **Step 1: Create the file with empty arrays for all categories**

```ts
export const galleryImages: Record<string, string[]> = {
  jetski: [],
  wibit: [],
  tramp: [],
  tube: [],
  pedaline: [],
  scuba: [],
  bar: [],
  relax: [],
  fastfood: [],
  gelato: [],
};
```

> The arrays start empty. Once the user drops photos into `public/assets/<category>/`, they add paths here, e.g. `"/assets/jetski/img1.jpg"`.

- [ ] **Step 2: Commit**

```bash
git add src/data/gallery.ts
git commit -m "feat: add gallery data file"
```

---

### Task 3: Create ActivityGallery component

**Files:**
- Create: `src/components/ui/ActivityGallery.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ActivityGalleryProps {
  images: string[];
}

export function ActivityGallery({ images }: ActivityGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const slides = images.map((src) => ({ src }));

  return (
    <section className="pt-12 lg:pt-20">
      <p className="text-dark/40 text-xs uppercase tracking-widest mb-6">
        Gallery
      </p>

      <div className="columns-2 md:columns-3 gap-3">
        {images.map((src, i) => (
          <div key={src} className="break-inside-avoid mb-3">
            <button
              type="button"
              className="block w-full overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark/40"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            >
              <Image
                src={src}
                alt={`Gallery photo ${i + 1}`}
                width={800}
                height={600}
                className="w-full h-auto"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </button>
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </section>
  );
}
```

- [ ] **Step 2: Run build to verify no TypeScript errors**

```bash
npm run build
```

Expected: build succeeds with no errors. If `yet-another-react-lightbox` CSS import causes issues in App Router, move the import to `src/app/globals.css` instead:
```css
@import "yet-another-react-lightbox/styles.css";
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/ActivityGallery.tsx
git commit -m "feat: add ActivityGallery component"
```

---

### Task 4: Update ZonePageClient

**Files:**
- Modify: `src/components/ui/ZonePageClient.tsx`

- [ ] **Step 1: Add `gallery` prop and render `ActivityGallery`**

Replace the interface and component signature:

```tsx
// Add import at top of file (after existing imports):
import { ActivityGallery } from "@/components/ui/ActivityGallery";

// Replace the interface:
interface ZonePageClientProps {
  zoneId: "wibit" | "tramp" | "pedaline" | "tube" | "jetski" | "scuba";
  name: string;
  gallery?: string[];
}

// Replace the function signature:
export function ZonePageClient({ zoneId, name, gallery = [] }: ZonePageClientProps) {
```

Then add `<ActivityGallery>` at the end of the content section, just before the closing `</div>` of `px-6 lg:px-[120px] py-12 lg:py-20`:

```tsx
        {/* Gallery */}
        <ActivityGallery images={gallery} />
```

The full content `<div>` after the change:

```tsx
      {/* Content */}
      <div className="px-6 lg:px-[120px] py-12 lg:py-20 max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-20">
          {/* Left: description + features */}
          <div className="flex flex-col gap-8">
            <p className="text-dark/80 text-base lg:text-lg leading-relaxed max-w-[600px]">
              {zone.description}
            </p>

            {zone.features.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="text-dark/40 text-xs uppercase tracking-widest">
                  What&apos;s included
                </p>
                <div className="flex flex-wrap gap-2">
                  {zone.features.map((feature: string) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 rounded-full border border-dark/20 text-dark/70 text-sm"
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
            <div className="rounded-xl border border-dark/10 bg-dark/5 p-6 flex flex-col gap-4">
              <div>
                <p className="text-dark/40 text-xs uppercase tracking-widest mb-1">
                  Pricing
                </p>
                <p className="font-display text-dark text-2xl">{zone.pricing}</p>
              </div>
              <div className="border-t border-dark/10 pt-4 flex items-start gap-2">
                <MapPin size={14} className="text-dark/40 mt-0.5 shrink-0" />
                <p className="text-dark/50 text-sm leading-relaxed">
                  {zone.pay_note}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <ActivityGallery images={gallery} />
      </div>
```

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/ZonePageClient.tsx
git commit -m "feat: add gallery to ZonePageClient"
```

---

### Task 5: Update BarPageClient

**Files:**
- Modify: `src/components/ui/BarPageClient.tsx`

- [ ] **Step 1: Add `gallery` prop and render `ActivityGallery`**

```tsx
// Add import at top of file (after existing imports):
import { ActivityGallery } from "@/components/ui/ActivityGallery";

// Replace the interface:
interface BarPageClientProps {
  item: "bar" | "relax";
  name: string;
  gallery?: string[];
}

// Replace the function signature:
export function BarPageClient({ item, name, gallery = [] }: BarPageClientProps) {
```

Add `<ActivityGallery>` just before the closing `</div>` of the `px-6 lg:px-[120px] py-12 lg:py-20` div:

```tsx
        {/* Gallery */}
        <ActivityGallery images={gallery} />
      </div>
```

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/BarPageClient.tsx
git commit -m "feat: add gallery to BarPageClient"
```

---

### Task 6: Update GastroPageClient

**Files:**
- Modify: `src/components/ui/GastroPageClient.tsx`

- [ ] **Step 1: Add `gallery` prop and render `ActivityGallery`**

```tsx
// Add import at top of file (after existing imports):
import { ActivityGallery } from "@/components/ui/ActivityGallery";

// Replace the interface:
interface GastroPageClientProps {
  item: "fastfood" | "gelato";
  name: string;
  gallery?: string[];
}

// Replace the function signature:
export function GastroPageClient({ item, name, gallery = [] }: GastroPageClientProps) {
```

Add `<ActivityGallery>` just before the closing `</div>` of the `px-6 lg:px-[120px] py-12 lg:py-20` div:

```tsx
        {/* Gallery */}
        <ActivityGallery images={gallery} />
      </div>
```

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/GastroPageClient.tsx
git commit -m "feat: add gallery to GastroPageClient"
```

---

### Task 7: Wire gallery data into all page.tsx files

**Files:**
- Modify: `src/app/jetski/page.tsx`, `src/app/wibit/page.tsx`, `src/app/trampoline/page.tsx`, `src/app/tube/page.tsx`, `src/app/pedaline/page.tsx`, `src/app/scuba/page.tsx`, `src/app/bar/page.tsx`, `src/app/relax/page.tsx`, `src/app/fastfood/page.tsx`, `src/app/gelato/page.tsx`

Each page gets the same two changes: import `galleryImages` and pass the relevant array to the client component.

- [ ] **Step 1: Update `src/app/jetski/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";
import { galleryImages } from "@/data/gallery";

// ... metadata unchanged ...

export default function JetskiPage() {
  return <ZonePageClient zoneId="jetski" name="Jet Ski" gallery={galleryImages.jetski ?? []} />;
}
```

- [ ] **Step 2: Update `src/app/wibit/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";
import { galleryImages } from "@/data/gallery";

// ... metadata unchanged ...

export default function WibitPage() {
  return <ZonePageClient zoneId="wibit" name="Wibit Park" gallery={galleryImages.wibit ?? []} />;
}
```

- [ ] **Step 3: Update `src/app/trampoline/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";
import { galleryImages } from "@/data/gallery";

// ... metadata unchanged ...

export default function TrampolinePage() {
  return <ZonePageClient zoneId="tramp" name="Trampoline" gallery={galleryImages.tramp ?? []} />;
}
```

- [ ] **Step 4: Update `src/app/tube/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";
import { galleryImages } from "@/data/gallery";

// ... metadata unchanged ...

export default function TubePage() {
  return <ZonePageClient zoneId="tube" name="Tube Rides" gallery={galleryImages.tube ?? []} />;
}
```

- [ ] **Step 5: Update `src/app/pedaline/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";
import { galleryImages } from "@/data/gallery";

// ... metadata unchanged ...

export default function PedalinePage() {
  return <ZonePageClient zoneId="pedaline" name="Pedal Boat & SUP" gallery={galleryImages.pedaline ?? []} />;
}
```

- [ ] **Step 6: Update `src/app/scuba/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ZonePageClient } from "@/components/ui/ZonePageClient";
import { galleryImages } from "@/data/gallery";

// ... metadata unchanged ...

export default function ScubaPage() {
  return <ZonePageClient zoneId="scuba" name="Scuba Diving" gallery={galleryImages.scuba ?? []} />;
}
```

- [ ] **Step 7: Update `src/app/bar/page.tsx`**

```tsx
import type { Metadata } from "next";
import { BarPageClient } from "@/components/ui/BarPageClient";
import { galleryImages } from "@/data/gallery";

// ... metadata unchanged ...

export default function BarPage() {
  return <BarPageClient item="bar" name="Bar" gallery={galleryImages.bar ?? []} />;
}
```

- [ ] **Step 8: Update `src/app/relax/page.tsx`**

```tsx
import type { Metadata } from "next";
import { BarPageClient } from "@/components/ui/BarPageClient";
import { galleryImages } from "@/data/gallery";

// ... metadata unchanged ...

export default function RelaxPage() {
  return <BarPageClient item="relax" name="Sunbeds & Relax" gallery={galleryImages.relax ?? []} />;
}
```

- [ ] **Step 9: Update `src/app/fastfood/page.tsx`**

```tsx
import type { Metadata } from "next";
import { GastroPageClient } from "@/components/ui/GastroPageClient";
import { galleryImages } from "@/data/gallery";

// ... metadata unchanged ...

export default function FastFoodPage() {
  return <GastroPageClient item="fastfood" name="Fast Food" gallery={galleryImages.fastfood ?? []} />;
}
```

- [ ] **Step 10: Update `src/app/gelato/page.tsx`**

```tsx
import type { Metadata } from "next";
import { GastroPageClient } from "@/components/ui/GastroPageClient";
import { galleryImages } from "@/data/gallery";

// ... metadata unchanged ...

export default function GelatoPage() {
  return <GastroPageClient item="gelato" name="Gelato Bar" gallery={galleryImages.gelato ?? []} />;
}
```

- [ ] **Step 11: Run final build**

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors across all modified files.

- [ ] **Step 12: Commit**

```bash
git add src/app/jetski/page.tsx src/app/wibit/page.tsx src/app/trampoline/page.tsx src/app/tube/page.tsx src/app/pedaline/page.tsx src/app/scuba/page.tsx src/app/bar/page.tsx src/app/relax/page.tsx src/app/fastfood/page.tsx src/app/gelato/page.tsx
git commit -m "feat: wire gallery data into all activity pages"
```

---

### Task 8: Create public asset folders and smoke-test with sample image

**Files:**
- Create: `public/assets/jetski/`, `public/assets/wibit/`, `public/assets/trampoline/`, `public/assets/tube/`, `public/assets/pedaline/`, `public/assets/scuba/`, `public/assets/bar/`, `public/assets/relax/`, `public/assets/fastfood/`, `public/assets/gelato/`

- [ ] **Step 1: Create all category folders**

```bash
mkdir -p public/assets/jetski public/assets/wibit public/assets/trampoline public/assets/tube public/assets/pedaline public/assets/scuba public/assets/bar public/assets/relax public/assets/fastfood public/assets/gelato
```

- [ ] **Step 2: Add a .gitkeep to each so folders are tracked by git**

```bash
for dir in jetski wibit trampoline tube pedaline scuba bar relax fastfood gelato; do
  touch public/assets/$dir/.gitkeep
done
```

- [ ] **Step 3: Smoke-test — copy one existing image into a category and register it**

Copy an existing asset to verify the full pipeline works end-to-end:

```bash
cp public/assets/jet-ski.jpg public/assets/jetski/jet-ski-1.jpg
```

Then update `src/data/gallery.ts`:

```ts
export const galleryImages: Record<string, string[]> = {
  jetski: ["/assets/jetski/jet-ski-1.jpg"],
  wibit: [],
  tramp: [],
  tube: [],
  pedaline: [],
  scuba: [],
  bar: [],
  relax: [],
  fastfood: [],
  gelato: [],
};
```

- [ ] **Step 4: Start dev server and verify gallery renders on /jetski**

```bash
npm run dev
```

Open `http://localhost:3000/jetski` in a browser. You should see:
- A "Gallery" label below the existing content
- One photo rendered in the masonry grid
- Clicking the photo opens the lightbox full-screen
- Keyboard arrow keys and the × button close/navigate the lightbox
- Layout looks correct on mobile (resize browser to < 768px: 2 columns) and desktop (3 columns)

- [ ] **Step 5: Revert the test image entry in gallery.ts back to empty**

```ts
jetski: [],
```

> Leave the `jet-ski-1.jpg` file in place — the user will replace it with real photos. Or delete it if you prefer a clean state.

- [ ] **Step 6: Commit**

```bash
git add public/assets/
git commit -m "feat: create gallery asset folders"
```

---

## Adding Photos (Instructions for the user)

Once folders exist:

1. Drop photos into the relevant `public/assets/<category>/` folder
2. Open `src/data/gallery.ts` and add the path to the array, e.g.:
   ```ts
   jetski: [
     "/assets/jetski/img1.jpg",
     "/assets/jetski/img2.jpg",
   ],
   ```
3. Save — the gallery renders automatically on the next build/refresh.
