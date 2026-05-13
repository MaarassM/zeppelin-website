# Activity Gallery — Design Spec

**Date:** 2026-05-13  
**Status:** Approved

## Overview

Add a photo gallery to every individual activity page on the Zeppelin Beach website. The gallery sits below the existing description/features content, renders photos in a masonry (Pinterest-style) grid, and opens a full-screen lightbox when a photo is clicked.

## Affected Pages

All pages that use one of the three page-client components:

| Page | Client Component |
|---|---|
| /jetski | ZonePageClient |
| /wibit | ZonePageClient |
| /trampoline | ZonePageClient |
| /tube | ZonePageClient |
| /pedaline | ZonePageClient |
| /scuba | ZonePageClient |
| /bar | BarPageClient |
| /relax | BarPageClient |
| /fastfood | GastroPageClient |
| /gelato | GastroPageClient |

## Folder Structure

Photos are dropped into category subfolders under `public/assets/`:

```
public/assets/
  jetski/
  wibit/
  trampoline/
  tube/
  pedaline/
  scuba/
  bar/
  relax/
  fastfood/
  gelato/
  parasailing/
  flyboard/
```

## Data Layer

**File:** `src/data/gallery.ts`

A plain TypeScript record mapping each category slug to an array of image path strings. Manually maintained — when photos are added to a folder, they are registered here.

```ts
export const galleryImages: Record<string, string[]> = {
  jetski: ["/assets/jetski/img1.jpg", ...],
  fastfood: ["/assets/fastfood/DSC09595.jpg", ...],
  // ...
}
```

## Component: ActivityGallery

**File:** `src/components/ui/ActivityGallery.tsx`  
**Type:** `"use client"` component

### Props
```ts
interface ActivityGalleryProps {
  images: string[]
}
```

### Behaviour
- Returns `null` if `images.length === 0` — no empty section rendered
- Section label: `"Gallery"` using existing style `text-dark/40 text-xs uppercase tracking-widest`
- **Masonry layout:** CSS `columns-2 md:columns-3` with `break-inside-avoid` on each item wrapper — no dependency
- **Images:** Next.js `<Image>` with `fill` inside a positioned wrapper, `sizes` tuned to column width for correct WebP generation and lazy loading
- **Lightbox:** `yet-another-react-lightbox` — opens on image click, supports keyboard arrows, mobile swipe, focus trap (accessibility)
- Lightbox state (`open`, `index`) owned locally in this component

## Integration into Page Clients

Each of the three page-client components (`ZonePageClient`, `BarPageClient`, `GastroPageClient`) is updated to:

1. Accept a `gallery?: string[]` prop (optional, defaults to `[]`)
2. Render `<ActivityGallery images={gallery} />` after the existing content grid

Each page's `page.tsx` imports from `gallery.ts` and passes the images:

```tsx
import { galleryImages } from "@/data/gallery"

export default function JetskiPage() {
  return <ZonePageClient zoneId="jetski" name="Jet Ski" gallery={galleryImages.jetski ?? []} />
}
```

## Dependencies

- **Add:** `yet-another-react-lightbox` — lightbox only. Masonry via CSS, no additional library.

## Styling

- Gallery section has `pt-12 lg:pt-20` top padding to separate from content above
- Each image has `rounded-lg overflow-hidden` and a subtle `hover:opacity-90 transition-opacity cursor-pointer`
- `gap-3` between columns via `space-y-3` on each column item
- Matches the existing cream background and dark text palette of all page clients

## Empty State

If `galleryImages` has no entry for a slug, or the array is empty, `ActivityGallery` renders nothing. The page layout is unchanged — no gap or placeholder shown.

## Error Handling

No special error handling needed. Images that fail to load fall back to Next.js Image default behaviour (broken image icon). Since these are static assets under `public/`, failures should only occur if a filename is wrong in `gallery.ts`.
