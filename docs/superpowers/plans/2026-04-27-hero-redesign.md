# Hero Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the SVG-background hero with a full-bleed `hero.jpg` photo, a subtle gradient overlay, and reduce content to only the logo and a single "Book Adventure" CTA button.

**Architecture:** Single component rewrite (`Hero.tsx`) with a small addition to `globals.css` for the scroll-cue keyframe animation. No new files, no new dependencies, no changes to any other component.

**Tech Stack:** Next.js (App Router), React, Tailwind CSS v4, `next/image`

---

### Task 1: Add scroll-cue animation to globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Open `src/app/globals.css` and add the animation token + keyframe**

  Append inside the `@theme {}` block (after the last existing token):

  ```css
  --animate-scroll-cue: scroll-cue 1.6s ease-in-out infinite;
  ```

  Then add the keyframe **after** the closing `}` of the `@layer base {}` block:

  ```css
  @keyframes scroll-cue {
    0%, 100% { opacity: 0; transform: scaleY(0); }
    50%       { opacity: 1; transform: scaleY(1); }
  }
  ```

  The full file should look like this when done:

  ```css
  @import "tailwindcss";

  @theme {
    --color-red: #D61F3C;
    --color-red-deep: #8B1124;
    --color-red-dark: #B8182E;
    --color-cream: #F0EAD2;
    --color-dark: #1A1A1A;
    --color-body: #555555;
    --color-muted: #888888;
    --color-border: #C0B898;

    --font-display: var(--font-anton), sans-serif;
    --font-body: var(--font-inter), sans-serif;

    --letter-spacing-widest2: 0.25em;

    --breakpoint-sm: 640px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 1024px;
    --breakpoint-xl: 1280px;
    --breakpoint-2xl: 1440px;

    --animate-scroll-cue: scroll-cue 1.6s ease-in-out infinite;
  }

  @layer base {
    html {
      scroll-behavior: smooth;
    }
    body {
      @apply font-body bg-cream text-dark antialiased;
    }
    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  }

  @keyframes scroll-cue {
    0%, 100% { opacity: 0; transform: scaleY(0); }
    50%       { opacity: 1; transform: scaleY(1); }
  }
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add src/app/globals.css
  git commit -m "feat: add scroll-cue keyframe animation"
  ```

---

### Task 2: Rewrite Hero.tsx

**Files:**
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Replace the entire contents of `src/components/sections/Hero.tsx`**

  ```tsx
  "use client";

  import Image from "next/image";
  import { useT } from "@/lib/i18n";
  import { Button } from "@/components/ui/Button";
  import { trackOutbound } from "@/lib/analytics";

  export function Hero() {
    const { t } = useT();

    return (
      <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
        {/* Full-bleed beach photo */}
        <Image
          src="/assets/hero.jpg"
          alt="Zeppelin Beach Complex"
          fill
          priority
          className="object-cover"
        />

        {/* Gradient overlay — light touch so photo stays visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.28] via-black/[0.18] to-black/40" />

        {/* Centered content — logo + single CTA */}
        <div className="relative z-10 flex flex-col items-center gap-7">
          <Image
            src="/assets/logo-extended.png"
            alt="Zeppelin Beach Complex"
            width={360}
            height={130}
            className="h-56 sm:h-60 lg:h-72 w-auto"
            priority
          />
          <Button
            as="a"
            href="https://www.zeppelin-adventure.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            onClick={() => trackOutbound("hero-cta")}
            className="font-display tracking-widest text-sm lg:text-base"
          >
            {t.nav.rezerviraj.toUpperCase()} ↗
          </Button>
        </div>

        {/* Scroll cue — animated vertical line, suppressed by prefers-reduced-motion */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-40">
          <div
            className="w-px h-6 bg-white animate-scroll-cue"
            style={{ transformOrigin: "top" }}
          />
        </div>
      </section>
    );
  }
  ```

- [ ] **Step 2: Start the dev server and verify visually**

  ```bash
  npm run dev
  ```

  Open `http://localhost:3000` and check:
  - Hero shows the beach photo full-screen
  - Gradient overlay is subtle — photo still clearly visible
  - Logo centered, appropriately sized on desktop and mobile (resize browser)
  - "BOOK ADVENTURE ↗" button renders with white outline style
  - Animated scroll line visible at bottom center
  - No location badge, no subtitle, no second button
  - Clicking "BOOK ADVENTURE ↗" opens `https://www.zeppelin-adventure.com` in a new tab

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/sections/Hero.tsx
  git commit -m "feat: hero redesign — full-bleed photo, minimal overlay, logo + one CTA"
  ```
