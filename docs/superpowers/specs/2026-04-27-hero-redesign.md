# Hero Section Redesign

**Date:** 2026-04-27
**Status:** Approved

## Summary

Redesign the hero section to be modern and minimalistic. Replace the SVG-background layout with a full-bleed beach complex photo, a subtle gradient overlay, and reduce content to only the logo and a single CTA button.

## What Changes

### Removed
- Location badge (MapPin + "Saccorgiana Beach, Pula")
- Subtitle / tagline text
- "Explore Offer" secondary button
- SVG background images (hero-background-desktop.svg, hero-background-mobile.svg)

### Kept
- Logo (`/assets/logo-extended.png`) — unchanged, centered
- "Book Adventure" button — links to `https://www.zeppelin-adventure.com`, external, with `trackOutbound("hero-cta")`
- Fonts — Anton (display) and Inter (body) unchanged

### Added
- `hero.jpg` as full-bleed background photo (`object-cover`, `fill`)
- Gradient overlay: `rgba(0,0,0,0.28)` top → `rgba(0,0,0,0.18)` mid → `rgba(0,0,0,0.40)` bottom
- Subtle animated scroll cue at the bottom center (thin vertical line, fade-in animation, reduced opacity)

## Layout

- **Height:** `100dvh`
- **Content alignment:** centered both axes, column direction
- **Logo and button gap:** `gap-7` (28px)
- **Logo size:** same proportions as before (`h-56 sm:h-60 lg:h-72 w-auto`)
- **Button:** `variant="outline"` (white border, white text) — existing Button component. Font: Anton, tracking-widest.
- **Scroll cue:** absolute, bottom-center, `opacity-40`, animated line (`scaleY` keyframe, 1.6s infinite)

## Responsive

- Single layout for all breakpoints — full bleed photo + centered content works identically on mobile and desktop
- No layout shift between breakpoints; photo uses `object-cover` with `fill`

## Files Affected

- `src/components/sections/Hero.tsx` — primary change, full rewrite of JSX and classes
- No new assets required — `hero.jpg` already exists in `/public/assets/`
- `src/app/globals.css` — adds `--animate-scroll-cue` animation token to `@theme {}` and `@keyframes scroll-cue` block (required for Tailwind v4 `animate-*` utility generation; prefers-reduced-motion is already handled globally)
- No changes to Button component, i18n messages, or analytics

## Constraints

- Keep `trackOutbound("hero-cta")` on the Book Adventure button
- Keep `rel="noopener noreferrer"` and `target="_blank"` on the external link
- Respect `prefers-reduced-motion` — scroll cue animation must be suppressed (already handled globally in `globals.css`)
