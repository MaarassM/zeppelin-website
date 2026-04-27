# Zeppelin Beach Complex — Website Requirements

> Extracted from PROJECT BRIEF.docx

---

## 1. Project Overview

**Client:** Zeppelin Beach & Lounge Bar  
**Goal:** Build the central website for the complex (`zeppelinbar.com`) and integrate it with the existing web shop (`zeppelin-adventure.com`).  
**Vibe:** Modern, luxury, adrenaline, clean design.  
**Language:** Croatian primary, English secondary (toggle HR/EN).

---

## 2. Technical Architecture

### Domains

| Domain | Purpose |
|--------|---------|
| `zeppelinbar.com` | **Informational hub** — Bar, Gastro, Beach, Location, Careers |
| `zeppelin-adventure.com` | **E-commerce / booking** — Tours and excursions (existing, no changes) |

### Integration Model
- `zeppelinbar.com` = main entry point
- Prominent CTA button links users through to `zeppelin-adventure.com` for bookings
- Track outbound clicks to adventure shop (analytics conversion funnel)

### Routing (QR Code Targets)
| URL | Content |
|-----|---------|
| `/` | Homepage (full scroll) |
| `/menu` | Bar drinks menu (web page, NOT PDF) |
| `/food` | Food / gelato menu |
| `/adventure` | Adventure section / redirect to shop |

---

## 3. Page Architecture (Option C — Hybrid)

**Homepage** (`index`) — single long scroll with all sections  
**Sub-pages** — `/menu` and `/food` as dedicated pages (QR code targets)

---

## 4. Homepage Sections

### A. Header (Sticky)
- Navigation links: Bar | Gastro | Beach & Fun | Lokacija | Karijere
- Language toggle: HR / EN
- CTA button: **[ REZERVIRAJ AVANTURU ]** → links to `zeppelin-adventure.com`

### B. Hero Section
- Background: high-quality video loop (aerial complex, cocktails, jet-ski)
- Overlay elements:
  - Location pin: "Saccorgiana Beach, Pula"
  - Title: **ZEPPELIN BEACH COMPLEX**
  - Subtitle: "Tvoja baza za chill i polazište za svaku avanturu."
- Primary CTA: **[ ISTRAŽI PONUDU ]** — scrolls down
- Secondary CTA: **[ BOOK TOURS ONLINE ]** → `zeppelin-adventure.com`

### C. Bar & Relax
- Bar atmosphere description (ležaljke, glazba, kokteli)
- **[ DIGITALNI MENU ]** button → opens `/menu` (mobile-optimized web page, NOT a PDF)
- Ležaljke rental info (on-site payment)

### D. Action Zone (Wibit & On-site Fun)
- Activities paid at on-site kiosk (not bookable online):
  - Wibit Park
  - Trampolin
  - Pedaline / Pedal Boat
  - SUP / Kayak
- Price cards per activity: 1h / 3h / Day rates
- Note: "Plaćanje na info pultu vodenih sportova"

### E. Zeppelin Adventure (Upsell Integration)
- High-ticket tours linked to `zeppelin-adventure.com`:
  - Jet-Ski Safari
  - Buggy / Quad tours
  - Flyboard school
  - Parasailing
  - Ronjenje / Diving
- Each card has **[ REZERVIRAJ ONLINE ]** → direct product link on shop domain

### F. Bites & Sweets (Gastro)
- Fast Food presentation
- Gelaterija presentation
- **[ POGLEDAJ JELOVNIK ]** button → opens `/food`

### G. Karijere (Job Applications) — MOCK in v1
- Form fields:
  - Ime i prezime (text)
  - Kontakt — mobitel & email
  - Pozicija (dropdown): Bar | Kuhinja | Sportski instruktor | Skipper | Promocija
  - Strani jezici (checkboxes): ENG | GER | ITA | FRA
  - Posjedovanje dozvole za voditelja brodice (Yes/No)
  - Dostupnost: Datum OD — Datum DO
  - Kratki opis prethodnog iskustva (textarea)
  - Upload: CV + Fotografija
- v1: UI only (mock), no backend submission

### H. Lokacija & Kontakt
- Google Maps embed — full-width with branded pin
- Text directions to find the beach location
- Footer:
  - Radno vrijeme: Bar (9:00–02:00), Sportovi (9:00–19:00)
  - Instagram / TikTok links
  - Phone / WhatsApp contact

---

## 5. Sub-Pages

### `/menu` — Bar Drinks Menu
- Mobile-optimized web page (NOT a PDF)
- QR code target for table use
- Categories: Cocktails, Beer, Wine, Soft Drinks, Coffee
- Clean, readable layout — dark text on light bg

### `/food` — Food & Gelato Menu
- Mobile-optimized web page (NOT a PDF)
- QR code target
- Categories: Fast Food, Gelaterija

---

## 6. Functional Requirements

| Requirement | Detail |
|-------------|--------|
| Mobile-First | 90% of users are on mobile at the beach |
| QR Code Ready | Clean URLs: `/menu`, `/food`, `/adventure` |
| Performance | Max image/video optimization — weak beach WiFi signal |
| Analytics | Track outbound clicks to `zeppelin-adventure.com` |
| Language | Croatian primary, English toggle |
| No PDFs | All menus must be web pages, not PDF downloads |

---

## 7. References

| Resource | URL |
|----------|-----|
| Current site | https://zeppelinpula.eu/ |
| Adventure shop | https://www.zeppelin-adventure.com/ |
| Target domain | zeppelinbar.com |

---

## 8. Asset Delivery

Assets will be provided in the project root `/assets/` folder:
- Logo files (SVG + PNG)
- Hero video (MP4 loop)
- Photography (bar, beach, activities)
- Brand font files (if custom)

---

## 9. Out of Scope (v1)

- Backend for careers form (mock UI only)
- `zeppelin-adventure.com` changes
- Payment processing
- CMS integration
