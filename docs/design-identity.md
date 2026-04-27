# Zeppelin Beach Complex — Design Identity

## Brand Overview

**Full name:** Zeppelin Beach & Lounge Bar  
**Tagline:** Waves of Fun  
**Location:** Saccorgiana Beach, Pula, Croatia  
**Contact:** +385 91 25 45 117 / +385 91 65 45 117  
**Social:** Instagram, Facebook, TikTok

---

## Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Primary Red | `#D61F3C` | Headers, CTAs, section backgrounds, hero |
| Deep Red | `#8B1124` | Gradient base, hover states, dark overlays |
| Dark Red | `#B8182E` | Card variants inside red sections |
| Cream / Off-white | `#F0EAD2` | Alternating section backgrounds, body bg |
| White | `#FFFFFF` | Text on red, card backgrounds, button fills |
| Dark Text | `#1A1A1A` | Headings on cream sections |
| Body Text | `#555555` | Paragraphs on cream sections |
| Muted Text | `#888888` | Secondary info, labels |
| Border / Divider | `#C0B898` | Subtle borders on cream bg |

### Color Usage Rules
- Sections **alternate** between Red (`#D61F3C`) and Cream (`#F0EAD2`) backgrounds
- CTAs on red sections: **white fill** with red text, or **white outline**
- CTAs on cream sections: **red fill** with white text
- Never use red text on red background
- Hero gradient: `#8B1124` → `#D61F3C` (top to bottom)

---

## Typography

| Role | Font | Weight | Use |
|------|------|--------|-----|
| Display / Headings | **Anton** | Regular (Anton is inherently bold/condensed) | Section titles, hero text, CTAs, logo |
| Body | **Inter** | 400 / 500 / 600 | Paragraphs, labels, descriptions |
| Eyebrow labels | **Inter** | 600 | Section tags (e.g. "BAR & RELAX") |

### Typography Scale (Mobile)
| Level | Size | Font | Tracking |
|-------|------|------|---------|
| Hero title | 52px | Anton | 0 |
| Section heading | 34–36px | Anton | 0 |
| Desktop hero | 88px | Anton | 0 |
| Desktop heading | 52px | Anton | 0 |
| Eyebrow | 11px | Inter 600 | +4px |
| Body | 14–16px | Inter 400 | 0 |
| Small / label | 11–13px | Inter 400–600 | 0–0.5px |
| CTA button | 12–15px | Anton | +1.5–2px |

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap');
```

---

## Visual Style

### Layout Pattern
- **Mobile-first** — 375px primary, then 768px (tablet), 1440px (desktop)
- Sections stack vertically with **alternating red/cream** backgrounds
- No horizontal dividers — color blocks create section breaks
- Wave/curved SVG dividers between sections (brand signature from brochure)

### Shape Language
- **Circular photo crops** — all lifestyle photography uses circle masks (`border-radius: 50%`)
- **Rounded cards** — `border-radius: 10–14px` on feature cards
- **Rounded buttons** — `border-radius: 6–8px`
- Soft shadows on white cards: `box-shadow: 0 4px 16px rgba(0,0,0,0.06)`

### Photography Style
- Warm, naturally-lit lifestyle shots
- Aerial beach/complex views
- Action shots: jet-ski, flyboard, aqua park
- Cocktail close-ups, lounge atmosphere
- All photos as **circle crops** on mobile feature sections
- Full-bleed on hero (with red overlay for text contrast)

### Iconography
- Icon library: **Material Symbols Rounded** (Google)
- Icon size: 16–32px depending on context
- Icon color always matches section foreground (white on red, red on cream)

---

## Brand Voice

- Energetic, fun, welcoming
- Bilingual: **Croatian primary**, English secondary
- Short punchy headlines (Anton, all-caps or title case)
- Warm and direct body copy

### CTA Text Patterns
| Action | Croatian | English |
|--------|----------|---------|
| Explore | ISTRAŽI PONUDU | EXPLORE OFFER |
| Book adventure | REZERVIRAJ AVANTURU | BOOK YOUR ADVENTURE |
| Book online | REZERVIRAJ ONLINE | BOOK ONLINE |
| See menu | DIGITALNI MENU | DIGITAL MENU |
| See food menu | POGLEDAJ JELOVNIK | VIEW MENU |
| Apply for job | POŠALJI PRIJAVU | SUBMIT APPLICATION |

---

## Component Patterns

### Primary Button (Red Fill)
```
Background: #D61F3C
Text: #FFFFFF, Anton, 14–15px, letter-spacing: 2px
Padding: 14px 32px
Border-radius: 8px
Hover: #B8182E
```

### Secondary Button (White Outline)
```
Background: transparent
Border: 2px solid #FFFFFF
Text: #FFFFFF, Anton, 14–15px, letter-spacing: 1.5–2px
Padding: 14px 32px
Border-radius: 8px
```

### Feature Card (on Red section)
```
Background: #F0EAD2
Border-radius: 12–14px
Padding: 16–24px
Icon: red (#D61F3C)
Title: Anton, dark
Subtext: Inter, muted
```

### Adventure Card (on Cream section)
```
Background: #FFFFFF
Border-radius: 12–14px
Padding: 24–28px
Shadow: 0 4px 16px rgba(0,0,0,0.06)
CTA button inside: red fill
```

---

## Logo

- Wordmark: **"Zeppelin"** in rounded bubbly custom font
- Icon: Zeppelin airship (blimp) — white line drawing
- Subtitle: "Beach & Lounge Bar" in clean caps
- Usage: white on red backgrounds only
- In digital header: use Anton or closest approximation until custom font file is provided

---

## Section Color Map

| Section | Background | Text Color |
|---------|-----------|------------|
| Header (sticky) | `#D61F3C` | White |
| Hero | `#D61F3C` gradient | White |
| Bar & Relax | `#F0EAD2` | Dark |
| Action Zone | `#D61F3C` | White |
| Zeppelin Adventure | `#F0EAD2` | Dark |
| Bites & Sweets | `#D61F3C` | White |
| Karijere | `#F0EAD2` | Dark |
| Footer | `#D61F3C` | White |
