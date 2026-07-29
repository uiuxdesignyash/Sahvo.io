# Design.md — Sahvo

Design system of record. Everything visual in this repo derives from this file.

**Place at repo root.** Reference it from `AGENTS.md` / your rules file so it loads into every agent session:

```md
<!-- AGENTS.md -->
Before writing or editing any UI, read `Design.md` in full. It is the single
source of truth for colour, type, spacing, components, motion, and copy.
Do not introduce a colour, font size, radius, or duration that is not in it.
```

---

## 0. Agent contract — read before writing code

Nine rules. Violating any of these is a build failure, not a style preference.

| # | Rule |
|---|---|
| 1 | **No new values.** Every colour, size, radius, duration and easing must come from the token tables below. If you need something that isn't here, stop and ask. Do not invent a shade. |
| 2 | **`alert/*` is SOS only.** Red never appears as a hover, accent, link, badge, chart colour, error state, or footer element. In a safety product red is semantic. Enforced by lint — see §11.4. |
| 3 | **No mixed blues.** `brand/primary` is `#1A54DA`. The supplied app icon is a *different* blue and must be re-exported before use — see §2.3. |
| 4 | **No `text-*` on a background it hasn't been contrast-checked against.** §3.3 is the allow-list. Anything not in it is unverified. |
| 5 | **Numbers set in JetBrains Mono.** Prices, fares, coordinates, distances, counts, language codes, timers. Numbers read as receipts, not marketing. |
| 6 | **The product does not exist.** No "Download", no "Get the app", no store badges, no testimonials, no past-tense claims. See §10 — this is a legal constraint, not a tone preference. |
| 7 | **Animate `transform` and `opacity` only.** Never `width`, `height`, `top`, `left`, `margin`, `padding`, or `box-shadow`. |
| 8 | **`prefers-reduced-motion` is a first-class branch**, written at the same time as the animation, never bolted on afterwards. |
| 9 | **One component per section file.** No 2,000-line page component. |

---

## 1. Product context

Sahvo is a mobile safety and price-transparency app for travellers in India. Pre-MVP: Android pilot in **Jaipur**, Hindi + English. This repo is the single-page marketing site. Its two jobs: capture early-access signups, and attract a technical co-founder.

**Emotional register: a well-run airport, not a travel poster.** You do not feel excited in a well-run airport. You feel that someone competent thought about this before you arrived. Every design decision below resolves to that sentence.

What this rules out, concretely:

- No golden-hour photography, sunsets, silhouettes, camels, or Taj-at-dawn. Photography is daylight, documentary, unfiltered.
- No warm neutrals. Cream and sand signal editorial travel; our light surfaces are cool.
- No gradient meshes, glows, glassmorphism, or decorative blur.
- No upward arrows, confetti, or celebratory data viz.
- Confidence comes from space and scale, not from saturation or shadow.

---

## 2. Brand assets

### 2.1 Wordmark

Lowercase `sahvo`, geometric sans, with the **`v` replaced by a location-pin glyph** — a pin whose counter holds a solid disc wrapped by a crescent hook. The glyph is custom drawn.

| Rule | Value |
|---|---|
| Never re-typeset | The wordmark is artwork. Do not set "sahvo" in Figtree and call it the logo. |
| Clear space | On all four sides, the cap height of the lowercase `o`. Nothing enters it. |
| Minimum width | 104 px desktop, 88 px mobile. Below this the pin's inner crescent fills in. |
| In body copy | Written **Sahvo**, sentence case, in Figtree. The glyph is never substituted mid-sentence. |
| Format | SVG only in the app. No PNG wordmark in the DOM. |

Prohibited: recolouring outside the approved lockups, outlines, drop shadows, rotation, skewing, gradient fills, placing on photography without a solid colour plate, altering the pin's proportions relative to the letterforms.

### 2.2 Lockups required

Only the white-on-blue lockup was supplied. Three are needed:

| Lockup | Use | Status |
|---|---|---|
| White on `brand/primary` | Dark blue section breaks | ✅ supplied |
| `brand/primary` on transparent | Nav, footer on `surface/base` | ⚠️ **missing — must be produced** |
| `surface/base` on transparent | Footer and panels on `surface/inverse` | ⚠️ **missing — must be produced** |

Until produced, the nav must render the mono `text/primary` fallback, not a recoloured raster.

### 2.3 App icon — colour mismatch, must fix

Sampled directly from the supplied files:

| File | Dominant fill | Sampled at |
|---|---|---|
| Wordmark PNG | `#1A54DA` (mean `#1B55DA`, drift is JPEG-style compression noise) | 30,748 px exact match |
| App icon PNG | `#1D4ED7` | 997,150 px exact match — **not compression noise** |
| Declared token | `#1A54DA` | Foundations sheet |

The icon is ~`#1D4ED7`, which is one unit off Tailwind's `blue-700` (`#1D4ED8`). It is a different colour from the wordmark. Placed adjacent — icon in the nav beside a `brand/primary` button — the mismatch is visible.

**Action: re-export the app icon at `#1A54DA`. Do not use the supplied PNG in the site.**

Icon geometry, measured: corner radius is **16.2% of the edge length** (194 px on a 1196 px icon). At 40 px render that is a 6.5 px radius. Preserve this ratio; do not substitute a `rounded-xl`.

### 2.4 Asset paths

```
public/brand/
  sahvo-wordmark-primary.svg     # brand/primary on transparent
  sahvo-wordmark-light.svg       # surface/base on transparent
  sahvo-wordmark-mono.svg        # text/primary on transparent
  sahvo-icon.svg                 # re-exported at #1A54DA
  favicon.ico  icon-192.png  icon-512.png  apple-touch-icon.png
  og-image.png                   # 1200×630
```

---

## 3. Colour

### 3.1 Tokens

Exact values. No others exist.

**Brand**

| Token | Hex | Use |
|---|---|---|
| `brand/primary` | `#1A54DA` | Logo, primary CTA fill, links, active nav, data-viz highlight |
| `brand/hover` | `#1544B4` | Primary CTA hover |
| `brand/pressed` | `#10358E` | Primary CTA active |
| `brand/subtle` | `#D9E3FB` | Tinted surfaces, chart fills, badge backgrounds |
| `brand/wash` | `#F2F6FE` | Section-break background — **once per page** |

**Surface**

| Token | Hex | Use |
|---|---|---|
| `surface/base` | `#FFFFFF` | Default page ground, cards |
| `surface/sunken` | `#F5F7FA` | Alternating section bands |
| `surface/inverse` | `#0B1220` | Dark section ground — feature panels |
| `surface/inverse-raised` | `#131C31` | Cards on `surface/inverse` |

**Text & border**

| Token | Hex | Use |
|---|---|---|
| `text/primary` | `#0E1526` | Headlines, body |
| `text/secondary` | `#4A5468` | Subheads, supporting copy |
| `text/tertiary` | `#656E7C` | Microcopy, source lines, captions — **value corrected, see §3.4** |
| `border/default` | `#E2E6EE` | Dividers, card edges (decorative) |
| `border/strong` | `#C6CCD8` | Emphasised dividers (decorative) |
| `border/interactive` | `#7E8798` | Input, checkbox, toggle boundaries — **added, see §3.4** |
| `border/interactive-on-dark` | `#5F72A6` | Same, on inverse surfaces — **added** |

**Alert — SOS only**

| Token | Hex | Use |
|---|---|---|
| `alert/sos` | `#D6202B` | SOS button fill, SOS icon |
| `alert/sos-pressed` | `#B3161F` | SOS active state |
| `alert/sos-on-wash` | `#B3161F` | Text on `alert/sos-wash` — **added, see §3.4** |
| `alert/sos-wash` | `#FDECEC` | SOS panel background only |
| `alert/sos-on-dark` | `#FF8A8F` | SOS text on `surface/inverse` — text only, never a fill |

**Added tokens** — required, absent from the Foundations sheet, justified in §3.4:

| Token | Hex | Use |
|---|---|---|
| `brand/on-dark` | `#8AADF6` | Links, stats, accents on `surface/inverse` |
| `focus/ring-light` | `#1A54DA` | Focus ring on light surfaces |
| `focus/ring-dark` | `#8AADF6` | Focus ring on dark surfaces |

### 3.2 Structural rules

1. **Two backgrounds carry the page:** `surface/base` and `surface/inverse`. `surface/sunken` alternates between them for rhythm.
2. **`brand/wash` and `brand/primary` each appear as a full-bleed section background exactly once**, as breaks. Spending them twice destroys the punctuation.
3. **`alert/*` appears exactly twice on the page:** the SOS feature panel, and the SOS screen inside the device mockup. Nowhere else.
4. **One badge for guides — never tiers, never stars.** Verification is binary or it is not trust. There is no gold guide, no 4.8★, no "top rated".
5. **Cards default to `border/default` with no shadow.** Elevation is the exception, not the default.

### 3.3 Verified pairings — the allow-list

Computed WCAG 2.1 ratios. Only these combinations are approved.

| Foreground | Background | Ratio | AA text | AAA |
|---|---|---|---|---|
| `text/primary` | `surface/base` | 18.20:1 | ✅ | ✅ |
| `text/primary` | `surface/sunken` | 16.96:1 | ✅ | ✅ |
| `text/primary` | `brand/wash` | 16.80:1 | ✅ | ✅ |
| `text/primary` | `brand/subtle` | 14.15:1 | ✅ | ✅ |
| `text/primary` | `alert/sos-wash` | 15.93:1 | ✅ | ✅ |
| `text/secondary` | `surface/base` | 7.61:1 | ✅ | ✅ |
| `text/secondary` | `surface/sunken` | 7.09:1 | ✅ | ✅ |
| `text/tertiary` (corrected) | `surface/base` | 5.15:1 | ✅ | ✗ |
| `text/tertiary` (corrected) | `surface/sunken` | 4.80:1 | ✅ | ✗ |
| `text/tertiary` (corrected) | `brand/wash` | 4.76:1 | ✅ | ✗ |
| `brand/primary` | `surface/base` | 6.32:1 | ✅ | ✗ |
| `brand/primary` | `surface/sunken` | 5.89:1 | ✅ | ✗ |
| `brand/hover` | `surface/base` | 8.34:1 | ✅ | ✅ |
| `surface/base` | `brand/primary` | 6.32:1 | ✅ | ✗ |
| `surface/base` | `brand/hover` | 8.34:1 | ✅ | ✅ |
| `surface/base` | `brand/pressed` | 10.93:1 | ✅ | ✅ |
| `surface/base` | `surface/inverse` | 18.72:1 | ✅ | ✅ |
| `surface/base` | `surface/inverse-raised` | 16.96:1 | ✅ | ✅ |
| `brand/on-dark` | `surface/inverse` | 8.37:1 | ✅ | ✅ |
| `brand/on-dark` | `surface/inverse-raised` | 7.58:1 | ✅ | ✅ |
| `alert/sos` | `surface/base` | 5.12:1 | ✅ | ✗ |
| `surface/base` | `alert/sos` | 5.12:1 | ✅ | ✗ |
| `surface/base` | `alert/sos-pressed` | 6.88:1 | ✅ | ✗ |
| `alert/sos-on-wash` | `alert/sos-wash` | 6.03:1 | ✅ | ✗ |
| `alert/sos-on-dark` | `surface/inverse` | 8.28:1 | ✅ | ✅ |

**Forbidden pairings — these fail and must never ship:**

| Foreground | Background | Ratio | Why it fails |
|---|---|---|---|
| `brand/primary` | `surface/inverse` | **2.96:1** | Fails AA and even 3:1 non-text. Use `brand/on-dark`. |
| `text/tertiary` `#6B7488` (original) | `surface/sunken` | **4.37:1** | Below 4.5. Corrected value replaces it. |
| `alert/sos` | `alert/sos-wash` | **4.48:1** | 0.02 short of AA. Use `alert/sos-on-wash`. |
| `border/strong` | `surface/base` | **1.61:1** | Fine as a divider; fails 1.4.11 as an input boundary. Use `border/interactive`. |

### 3.4 Corrections and additions — rationale

The Foundations sheet has four gaps. Each is a real defect that would surface in a Lighthouse or manual audit, not a matter of taste.

| # | Issue | Evidence | Fix |
|---|---|---|---|
| 1 | `text/tertiary` `#6B7488` fails AA on `surface/sunken` | Computes 4.37:1, needs 4.5:1. Sunken is an alternating band background, so tertiary text lands on it routinely. | Darken to `#656E7C`: 5.15:1 on base, 4.80:1 on sunken, 4.76:1 on wash. Passes on all three light surfaces. |
| 2 | No `brand/on-dark` token | `brand/primary` on `surface/inverse` is 2.96:1 — fails everything. `surface/inverse` is one of the two page backgrounds, so this bug is guaranteed the moment a link or stat lands on a dark panel. | Add `#8AADF6`: 8.37:1 on inverse, 7.58:1 on inverse-raised. AAA on both. |
| 3 | No focus-ring token | WCAG 2.2 SC 2.4.7 requires visible focus. `brand/primary` works on light (6.32:1) but not dark (2.96:1), so one ring colour cannot cover both grounds. | Two tokens: `focus/ring-light` `#1A54DA`, `focus/ring-dark` `#8AADF6`. |
| 4 | No non-red error treatment | Red is reserved for SOS, so form validation cannot use `alert/sos`. Without a defined alternative, an agent will reach for red and break rule 2. | Errors use `text/primary` message + 2 px `border/interactive` + an inline icon + `aria-invalid="true"` + `aria-describedby`. Never colour alone — required by SC 1.4.1 regardless. |

Also noted: the sheet annotates `text/primary` as 16.1:1; it computes 18.20:1 against `surface/base` and 16.96:1 against `surface/sunken`. The token is correct and comfortably passing; only the label is off. `text/tertiary` is annotated 4.8:1; it computes 4.69:1 on white. `alert/sos` at 5.1:1 matches exactly.

---

## 4. Typography

**Figtree** for everything except numbers. **JetBrains Mono** for numbers.

Figtree's geometric lowercase sits directly alongside the wordmark without competing — same construction logic, different job. JetBrains Mono for numerals is the load-bearing decision: this product's core promise is that a price is a fact, and tabular monospace numerals read as a receipt or a meter, not as marketing. A fare in a proportional sans is a claim; a fare in mono is a figure.

### 4.1 Scale

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| `display` | Figtree | 800 | 76 | 0.98 | −3.5% |
| `h2` | Figtree | 800 | 46 | 1.06 | −3% |
| `h3` | Figtree | 700 | 30 | 1.2 | −2% |
| `body` | Figtree | 400 | 17.5 | 1.6 | 0 |
| `meta` | Figtree | 600 | 13 | 1.4 | +9%, uppercase |
| `mono` | JetBrains Mono | 700 | inherits | inherits | 0 |

Mobile (≤767 px): `display` 44 / 1.02, `h2` 32 / 1.1, `h3` 24 / 1.25, `body` 17 / 1.6, `meta` 12.

Negative tracking scales with size and is never applied below 30 px. Body and meta keep their specified tracking at every breakpoint.

### 4.2 Mono rule

JetBrains Mono 700 is mandatory for: prices (`₹1,800`), fares, distances, coordinates, response times, MAU counts, guide counts, dates, percentages, language codes (`hi`, `en`), and phone numbers.

It is forbidden for: prose, headlines, buttons, navigation, and any running text. It is a data face, not a display face.

Enable `font-variant-numeric: tabular-nums` wherever numbers stack or animate (count-ups, stat rows, tables) so digits don't reflow.

### 4.3 Devanagari — unresolved, blocks Hindi content

**Figtree does not support Devanagari.** Neither does JetBrains Mono. The brief requires Hindi strings in mockups and UI. As specified, every Devanagari character on this site will render in an unstyled system fallback.

Fix — add a third family, scoped by `unicode-range` so it never loads for English-only visitors:

| Candidate | Notes |
|---|---|
| **Noto Sans Devanagari** *(recommended)* | Neutral, matched vertical metrics, exhaustive coverage, OFL. The safe default when the Latin face was chosen first. |
| IBM Plex Sans Devanagari | Better-drawn, more character; slightly institutional next to Figtree's warmth. |
| Mukta (Ek Type) | Excellent Devanagari; the widest tonal gap from Figtree. |

Typesetting rules once chosen:

- `:lang(hi)` gets **+0.15 line-height** over the Latin equivalent. Matras and conjuncts need vertical clearance Latin metrics don't allow for.
- Body Devanagari never below **1.7** line-height.
- **Never letter-space Devanagari.** Not at any size, not for `meta`.
- The `meta` uppercase transform does not apply — Devanagari has no case.
- Digits inside Hindi strings stay **Latin numerals in JetBrains Mono**, not Devanagari numerals, so the mono rule survives translation.

**This needs a decision before any Hindi string ships.**

---

## 5. Space, radius, elevation

| Set | Values |
|---|---|
| Grid | 8 px base: 8, 16, 24, 32, 40, 48, 64, 72, 96, 128 |
| Section padding | **96** desktop / **72** mobile, vertical |
| Card radius | **18–22** — use 20 as the default; 18 for dense cards, 22 for hero-scale |
| Control radius | **10–12** — use 12 for buttons and inputs, 10 for badges and chips |
| Icon/avatar radius | 16.2% of edge (matches the app icon) |
| Pill radius | 999 — badges only |
| Max content width | 1200 px, 24 px gutters mobile / 40 px desktop |

Elevation — shadow colour derived from `surface/inverse`, never neutral black:

| Token | Value |
|---|---|
| `e0` | none — **the default for cards** |
| `e1` | `0 1px 2px rgba(11,18,32,0.06)` |
| `e2` | `0 4px 12px rgba(11,18,32,0.08)` — sticky nav once scrolled |
| `e3` | `0 12px 32px rgba(11,18,32,0.10)` — device mockup only |

---

## 6. Breakpoints

Mobile-first. `360 / 768 / 1024 / 1440`.

| Width | Behaviour |
|---|---|
| 360 | Single column. No parallax. No depth effects. Feature section becomes a vertical accordion. |
| 768 | Two-column cards. Parallax still disabled. |
| 1024 | Full grid. Parallax enabled. Feature section becomes sticky-scroll. |
| 1440 | Max content width caps; gutters grow. |

**Depth effects are disabled below 768 px unconditionally.** Not reduced — disabled.

---

## 7. Components

Each gets its own file under `components/ui/`. Props are exhaustive; no ad-hoc `className` colour overrides.

### Button

| Prop | Values |
|---|---|
| `variant` | `primary` · `secondary` · `ghost` · `sos` |
| `size` | `sm` (36 h) · `md` (44 h) · `lg` (52 h) |
| `state` | default · hover · active · focus · disabled · loading |
| `iconLeading` / `iconTrailing` | boolean slots |

| Variant | Fill | Text | Hover | Active |
|---|---|---|---|---|
| `primary` | `brand/primary` | `surface/base` | `brand/hover` | `brand/pressed` |
| `secondary` | transparent, 1 px `border/interactive` | `text/primary` | `surface/sunken` | `border/strong` |
| `ghost` | transparent | `brand/primary` | `brand/wash` | `brand/subtle` |
| `sos` | `alert/sos` | `surface/base` | — | `alert/sos-pressed` |

`sos` is importable **only** by `components/sections/Features.tsx` and `components/mockups/SosScreen.tsx`. Radius 12. Minimum touch target 44×44 at every size, including `sm` (pad the hit area, not the box).

### Card

`variant`: `default` (`surface/base` + `border/default` + `e0`) · `sunken` (`surface/sunken`, no border) · `inverse` (`surface/inverse-raised`, no border) · `media` (image-forward, image bleeds to the radius).

Radius 20. Padding 32 desktop / 24 mobile. Hover on interactive cards: `translateY(-2px)` + `e1`. Never a border-colour change — that's a repaint.

### Nav

Sticky. Transparent over the hero; on scroll past 80 px it gains `surface/base`, `e2`, and a `border/default` bottom edge, cross-faded over 200 ms. Height 72 desktop / 64 mobile.

Contains: wordmark (links to top, `aria-label="Sahvo — back to top"`), 4 anchor links, one `primary` Button. Mobile: a full-height sheet, focus-trapped, `Esc` closes, the trigger regains focus on close.

The nav CTA never reads "Download" or "Try it".

### Input

Height 52. Radius 12. Border 1 px `border/interactive` (3.62:1 — meets SC 1.4.11). Focus: 2 px `focus/ring-light` ring + 2 px `surface/base` offset. Error: 2 px `border/interactive` + icon + `text/primary` message + `aria-invalid` + `aria-describedby`. **No red.**

Labels are always present and visible. Placeholder is an example, never a substitute for a label.

### Stat

Number in JetBrains Mono 700 with `tabular-nums`; label in `meta`; source line in `text/tertiary`. Count-up animates on first viewport entry only — see §9. Every Stat requires either a `source` prop or a `goal` boolean. Rendering one with neither is a build error (§10).

### Badge

One variant only: `verified`. `brand/subtle` background, `brand/primary` text and check icon, radius 10, `meta` type. There is no size variant, no colour variant, no star, no tier. Adding one violates rule 4 of §3.2.

### FeaturePanel

`surface/inverse` ground, `surface/inverse-raised` cards, `brand/on-dark` accents. Holds the five-feature step-through. Each panel carries a permanently visible caveat line in `text/tertiary` on light or a `surface/base`-derived tint on dark — never a tooltip, never a disclosure. See §10.

---

## 8. Signature element

**The coverage arc.** A large, low-opacity rounded arc in `brand/subtle` — the shape of a geofence radius — that recurs at each section boundary and widens as the page descends. It is the connective tissue that carries the eye down the page, and the one thing this site will be remembered by.

It is a shape, not an effect: solid tint, no transparency, no blur, no gradient. Rendering it as a solid keeps it cheap to composite during scroll.

It never sits behind body text. It sits behind whitespace, or bleeds off-canvas.

---

## 9. Motion

Duration and easing are fixed. There is no third option.

| Token | Value |
|---|---|
| `instant` | 120 ms |
| `fast` | 200 ms |
| `base` | 320 ms |
| `slow` | 480 ms |
| `deliberate` | 700 ms |
| `ease-standard` | `cubic-bezier(0.22, 0.61, 0.36, 1)` |
| `ease-entrance` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` |

**No overshoot anywhere.** No springs, no `back`, no `elastic`, no bounce. A safety product whose website startles you is a contradiction.

| Element | Trigger | Property | Duration / easing | ≤767 px | Reduced motion |
|---|---|---|---|---|---|
| Hero parallax | scroll | `translateY` on 3 layers at 0.15 / 0.3 / 0.5 of scroll delta | rAF-driven, no transition | **disabled** | disabled |
| Section reveal | 20% in viewport, once | `opacity` 0→1, `translateY` 16→0 | `slow` / `ease-entrance` | translateY → 8 px | opacity only, `fast` |
| Feature step-through | scroll (≥1024) / tap (<1024) | `opacity` + `translateY` 12 px cross-fade | `base` / `ease-standard` | accordion, no sticky | instant swap |
| Stat count-up | first viewport entry, once | `textContent`, `tabular-nums` | `deliberate` / `ease-standard` | unchanged | final value rendered immediately |
| Device mockup float | idle loop | `translateY` ±6 px | 6 s / `ease-in-out`, infinite | ±4 px | disabled |
| Nav scrim | scroll > 80 px | `opacity` + `box-shadow` on a pseudo-element | `fast` / `ease-standard` | unchanged | unchanged |
| Coverage arc | scroll | `translateY` at 0.1 scroll delta | rAF | **disabled** | disabled |
| Button hover | pointer | `background-color` | `instant` | — | unchanged |
| Card hover | pointer | `transform: translateY(-2px)` | `fast` / `ease-standard` | — | disabled |

Smooth scroll via Lenis, `lerp: 0.1`. **Lenis is destroyed entirely under `prefers-reduced-motion`** — no scroll interception, native behaviour restored. It must never trap or hijack: keyboard `Space`/`PgDn`/`Home`/`End` and anchor jumps all behave natively.

If any effect costs frame rate, cut it. Jank is worse than a static page in a product about calm.

---

## 10. Content rules

These are enforceable constraints, not tone guidance. The app does not exist; the copy must survive a journalist or investor reading it closely.

### 10.1 Forbidden strings

Never generate, in copy, alt text, meta tags, or JSON-LD:

- "Download", "Get the app", "Available now", "Install"
- App Store / Google Play badges or links
- Any testimonial, user quote, or review — **there are no users**
- "We alert the police", "connected to police", "integrated with emergency services"
- "Offline" as an unqualified adjective for SOS
- Star ratings, tiers, "top rated", "premium guide"
- Past-tense claims of achievement ("we've helped…", "trusted by…")

### 10.2 Required framings

| Concept | Must be written as |
|---|---|
| SOS destination | "Sends your location to the emergency contacts you've chosen, and puts local emergency numbers one tap away." Plus the footer disclosure. |
| SOS offline capability | "Works over SMS when data is unavailable." Never "offline". |
| Sub-4-minute target | "Median time from SOS trigger to an emergency contact acknowledging" — a metric Sahvo can own — under a "goals, not results" heading. |
| Guide verification | "Licence number verified against the issuing register." Caveat: process in design, first cohort Jaipur. |
| Language support | "Pilot ships in Hindi and English. Eight languages follow." |
| Geofenced alerts | "Coverage begins in Jaipur only." |
| Fare calculator | "A reference, not a regulated quote." |
| Year 1 numbers | Under an explicit **"Year 1 goals — not results"** heading, with a line stating none have been achieved. |

### 10.3 The number rule

**Every number on the page carries either a named source with a year, or the word "goal" above it. A number with neither does not ship.**

This is a build constraint: the `Stat` component requires `source` or `goal={true}`, and rendering one with neither throws.

Do not invent a statistic to fill a slot. Leave `[PLACEHOLDER]` visible in the DOM if a figure is unsourced — a visible hole is recoverable, a fabricated number is not.

Known conflation to preserve: India recorded **20.6 M international tourist arrivals** in 2024, which includes non-resident Indians. **Foreign tourist arrivals** — actual foreign nationals, the first target segment — were **9.95 M**. Both figures ship, both labelled, with a footnote explaining the ~2× difference. Never present 19–20 M as the foreign-tourist market.

### 10.4 Required footer disclosure

Verbatim, in `text/tertiary`, always rendered:

> Sahvo is a pre-launch product. It is not available for download, and it is not affiliated with or integrated into any police force or government emergency service.

### 10.5 Interface voice

Sentence case. Active voice. A control says what happens: "Join the early access list", not "Submit". The action keeps its name through the flow — the button that says "Join" produces a confirmation that says "You're on the list."

Errors explain what happened and how to fix it. They don't apologise and they're never vague. Empty states are invitations to act.

---

## 11. Implementation

### 11.1 Stack

Next.js (App Router) · TypeScript · Tailwind · Framer Motion · Lenis.

### 11.2 Tokens as CSS variables

`app/globals.css`:

```css
@theme {
  --color-brand-primary: #1A54DA;
  --color-brand-hover: #1544B4;
  --color-brand-pressed: #10358E;
  --color-brand-subtle: #D9E3FB;
  --color-brand-wash: #F2F6FE;
  --color-brand-on-dark: #8AADF6;

  --color-surface-base: #FFFFFF;
  --color-surface-sunken: #F5F7FA;
  --color-surface-inverse: #0B1220;
  --color-surface-inverse-raised: #131C31;

  --color-text-primary: #0E1526;
  --color-text-secondary: #4A5468;
  --color-text-tertiary: #656E7C;

  --color-border-default: #E2E6EE;
  --color-border-strong: #C6CCD8;
  --color-border-interactive: #7E8798;
  --color-border-interactive-on-dark: #5F72A6;

  --color-alert-sos: #D6202B;
  --color-alert-sos-pressed: #B3161F;
  --color-alert-sos-on-wash: #B3161F;
  --color-alert-sos-wash: #FDECEC;
  --color-alert-sos-on-dark: #FF8A8F;

  --color-focus-ring-light: #1A54DA;
  --color-focus-ring-dark: #8AADF6;

  --font-sans: var(--font-figtree), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, monospace;
  --font-deva: var(--font-noto-deva), sans-serif;

  --radius-control: 12px;
  --radius-chip: 10px;
  --radius-card: 20px;
  --radius-card-lg: 22px;

  --ease-standard: cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-entrance: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
}

:lang(hi) {
  font-family: var(--font-deva);
  line-height: 1.75;
  letter-spacing: 0;
  text-transform: none;
}

:focus-visible {
  outline: 2px solid var(--color-focus-ring-light);
  outline-offset: 2px;
}
.on-dark :focus-visible {
  outline-color: var(--color-focus-ring-dark);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 11.3 Fonts

```ts
// app/fonts.ts
import { Figtree, JetBrains_Mono, Noto_Sans_Devanagari } from 'next/font/google'

export const figtree = Figtree({
  subsets: ['latin'], weight: ['400','600','700','800'],
  variable: '--font-figtree', display: 'swap',
})

export const jetbrains = JetBrains_Mono({
  subsets: ['latin'], weight: ['700'],
  variable: '--font-jetbrains', display: 'swap',
})

// Loads only when Devanagari codepoints are present on the page.
export const notoDeva = Noto_Sans_Devanagari({
  subsets: ['devanagari'], weight: ['400','600','700'],
  variable: '--font-noto-deva', display: 'swap',
})
```

Self-host via `next/font` — no runtime Google Fonts request. Preload only Figtree 400 and 800.

### 11.4 Lint rule — enforce the red constraint

The red-means-something rule is easy to state and easy to violate six weeks later. Make it mechanical:

```js
// eslint.config.js — no-restricted-imports / no-restricted-syntax
{
  files: ['**/*.{ts,tsx,css}'],
  ignores: [
    'components/sections/Features.tsx',
    'components/mockups/SosScreen.tsx',
  ],
  rules: {
    'no-restricted-syntax': ['error', {
      selector: "Literal[value=/alert-sos|#D6202B|#B3161F|#FDECEC|#FF8A8F/i]",
      message: 'alert/* is reserved for SOS UI. See Design.md §3.2 rule 3.',
    }],
  },
}
```

Add a matching Stylelint rule for raw hex usage anywhere outside `globals.css`.

### 11.5 File structure

```
app/
  layout.tsx  page.tsx  globals.css  fonts.ts
  opengraph-image.tsx  sitemap.ts  robots.ts
components/
  sections/   Nav TrustGap Vision Features Segments Market Roadmap Cta Footer Hero
  ui/         Button Card Input Stat Badge Container SectionHeading
  mockups/    DeviceFrame SosScreen
  motion/     Reveal CountUp Parallax CoverageArc useReducedMotion
content/
  copy.ts        # all strings, one place, translation-ready
  sources.ts     # every statistic + named source + year
lib/
  lenis.ts  cn.ts
public/brand/    # see §2.4
```

`content/copy.ts` holds every user-facing string. No hard-coded copy in components — it makes the eight-language roadmap tractable and makes the claims audit reviewable in one file.

### 11.6 Images

`next/image` throughout. WebP with explicit `width`/`height`. `priority` on the hero mockup only; everything below the fold lazy. Device mockups: alt text must state the app is in development — e.g. *"Concept mockup of the Sahvo home screen. The app is in development and not yet available."*

---

## 12. Acceptance criteria

Ship gate. Each is pass/fail.

| # | Criterion |
|---|---|
| 1 | Lighthouse mobile: Performance ≥ 90, Accessibility 100, Best Practices ≥ 95, SEO 100 |
| 2 | Every text/background pair on the page appears in the §3.3 allow-list |
| 3 | Zero `alert/*` usage outside the two permitted files — lint clean |
| 4 | Full keyboard operability: every interactive element reachable, visible focus ring, logical order, mobile menu focus-trapped with `Esc` to close |
| 5 | `prefers-reduced-motion`: Lenis destroyed, parallax off, float off, count-ups render final values, reveals are opacity-only |
| 6 | No layout-property animation — audit for `width`, `height`, `top`, `left`, `margin`, `padding` in transitions |
| 7 | CLS < 0.1; no layout shift from font swap or the sticky nav |
| 8 | Every `Stat` has `source` or `goal` |
| 9 | Zero forbidden strings from §10.1 anywhere in the bundle |
| 10 | Footer disclosure (§10.4) present and readable |
| 11 | Devanagari strings render in the chosen Devanagari face, not a system fallback |
| 12 | 360 / 768 / 1024 / 1440 verified; real-device check on Android Chrome and iOS Safari |
| 13 | SEO: title, meta description, OG image 1200×630, JSON-LD `Organization` + `WebSite`, sitemap, robots |
| 14 | JSON-LD contains no `SoftwareApplication` with a download URL — the app doesn't exist |

---

## 13. Open items

Blocking or decision-required. Do not guess at any of these.

| # | Item | Blocks | Owner |
|---|---|---|---|
| 1 | **App icon is `#1D4ED7`, token is `#1A54DA`** — re-export needed | Nav, favicon, OG image | Design |
| 2 | **Devanagari face not chosen** — Figtree has no Devanagari | Every Hindi string | Design |
| 3 | Wordmark lockups: `brand/primary`-on-transparent and light-on-transparent not supplied | Nav, footer | Design |
| 4 | Testimonials: brief asks for them, but there are no users. Substitute needed — labelled user-research block recommended | Segments section | Founder |
| 5 | Absolute roadmap dates — brief gives "Month 3–5" with no start month | Roadmap section | Founder |
| 6 | Which eight languages | Feature 5 | Founder |
| 7 | Founder email + registered entity name | Dual CTA, footer | Founder |
| 8 | Two trust-gap statistics have no source: Jaipur autorickshaw overcharge multiple, licensed-vs-operating guide counts in Rajasthan | Trust gap section | Founder |
| 9 | Serviceable market sizing — needs pricing and take-rate assumptions | Market section | Founder |

Items 1 and 2 are the ones an agent will silently paper over if not fixed. Item 2 in particular fails quietly: Devanagari will render, just in the wrong face, and it will pass every automated check.
