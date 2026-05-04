# Careers Sub-category Redesign

**Date:** 2026-04-29
**Status:** Approved

## Overview

Restructure the careers application flow to support a two-level selection: category → sub-role → form. Currently the form has 4 flat position boxes that go directly to the application form. The new design introduces 6 categories, most of which expand into specific sub-roles before the user reaches the form.

## UI Flow

```
Step 1: Category grid (6 boxes)
  ↓ click category with sub-roles
Step 2: Sub-role screen (back button returns to Step 1)
  ↓ click sub-role
Step 3: Application form (back button returns to Step 2)

Special case: "Radnik na sladoledu" has no sub-roles → click goes directly to Step 3
Special case: Back on form for "Radnik na sladoledu" returns to Step 1
```

State in `CareersPageClient`:
- `selectedCategory: string | null`
- `selectedPosition: string | null`

When `selectedPosition` is set → show form.
When `selectedCategory` is set but `selectedPosition` is null → show sub-role screen.
When both are null → show category grid.

## Category & Sub-role Map

| Category key | Display (HR) | Sub-roles (HR) | Notes |
|---|---|---|---|
| `bar` | Bar | Šanker, Servir, Konobar | |
| `kuhinja` | Kuhinja | Grill majstor, Pomoćnik | |
| `vodeni_sportovi` | Vodeni sportovi | Banjin, Radnik na vodenim sportovima, Skipper | |
| `sladoled` | Radnik na sladoledu | *(none)* | Skips sub-role screen |
| `ostale` | Ostale djelatnosti | Marketing, Voditelj poslovanja (menadžer) | |
| `adventures` | Zeppelin Adventures | Voditelj tura — Buggy, Voditelj tura — Quad, Voditelj tura — Jetski | Has license notice |

## Zeppelin Adventures Notice

A static informational banner displayed above the sub-role options on the Zeppelin Adventures screen:

> **Buggy** i **Quad** zahtijevaju važeću vozačku dozvolu. Za **Jetski** potrebna je valjana skiper dozvola.

English equivalent:
> **Buggy** and **Quad** require a valid driving licence. **Jetski** requires a valid skipper licence.

Styling: amber/yellow info banner. Not a gate — informational only.

## Data Structure

Replace the flat `position_options` array in translation files with a structured `position_categories` array:

```json
"position_categories": [
  {
    "key": "bar",
    "label": "Bar",
    "sub_roles": ["Šanker", "Servir", "Konobar"]
  },
  {
    "key": "kuhinja",
    "label": "Kuhinja",
    "sub_roles": ["Grill majstor", "Pomoćnik"]
  },
  {
    "key": "vodeni_sportovi",
    "label": "Vodeni sportovi",
    "sub_roles": ["Banjin", "Radnik na vodenim sportovima", "Skipper"]
  },
  {
    "key": "sladoled",
    "label": "Radnik na sladoledu",
    "sub_roles": []
  },
  {
    "key": "ostale",
    "label": "Ostale djelatnosti",
    "sub_roles": ["Marketing", "Voditelj poslovanja (menadžer)"]
  },
  {
    "key": "adventures",
    "label": "Zeppelin Adventures",
    "sub_roles": ["Voditelj tura — Buggy", "Voditelj tura — Quad", "Voditelj tura — Jetski"],
    "notice": "**Buggy** i **Quad** zahtijevaju važeću vozačku dozvolu. Za **Jetski** potrebna je valjana skiper dozvola."
  }
]
```

The `notice` field is only present for categories that need it. The `CareersForm` renders it when the field exists.

## Component Changes

### `src/messages/hr.json` & `src/messages/en.json`
- Replace `position_options` array with `position_categories` structured array (see above).
- Add `notice` field to Zeppelin Adventures entry.

### `src/components/forms/CareersPageClient.tsx`
- Add `selectedCategory` state alongside existing `selectedPosition`.
- Pass `onCategorySelect` and `onBack` callbacks down to `CareersForm`.
- Update back-button logic: from form → back to sub-roles (or category grid for sladoled); from sub-roles → back to category grid.

### `src/components/forms/CareersForm.tsx`
- **Step 1 (category grid):** Render 6 category boxes in a 2-column grid. Same card style as current position boxes. New icons assigned per category (see below).
- **Step 2 (sub-role screen):** Full-width list of sub-role cards. If category has a `notice`, render it above the list as an amber info banner. Back button → category grid.
- **Step 3 (form):** Unchanged. Pre-fills position with the chosen sub-role label.

### Icon assignments (Lucide)
| Category | Icon |
|---|---|
| Bar | `Wine` |
| Kuhinja | `ChefHat` |
| Vodeni sportovi | `Waves` |
| Radnik na sladoledu | `IceCream` |
| Ostale djelatnosti | `Briefcase` |
| Zeppelin Adventures | `Compass` |

## What Does Not Change
- Form fields, Zod validation schema — untouched.
- API route `/api/careers` — untouched. The `position` field still receives a plain string (the sub-role label).
- Overall visual style (cream background, red accents, card borders).
- Success screen and error handling.

## Out of Scope
- English translation parity for new labels (add at same time as Croatian strings).
- Any changes to the homepage `Careers.tsx` section.
