# TRD.md — Sahvo Marketing Site

Technical Requirements Document. Companion to `Design.md`.

| | |
|---|---|
| **Scope** | Single-page pre-MVP marketing site. 10 sections. Two jobs: early-access capture, technical co-founder outreach. |
| **Stage** | Pre-MVP. The app does not exist. |
| **Pilot city** | Jaipur |
| **Launch locales** | `en`, `hi` |
| **Relationship to Design.md** | `Design.md` owns colour, type, spacing, components, motion values, and copy constraints. **TRD.md owns behaviour, architecture, performance, i18n, data, and acceptance.** Where both speak, `Design.md` wins on appearance and this document wins on mechanism. |

Requirement IDs are stable. Reference them in commits and PRs (`fix(motion): MOT-04 clamp parallax displacement`).

---

## 1. Glossary

Terms used with precise meaning throughout this document. Where a term is commonly used loosely, the strict definition here governs.

### 1.1 Scroll and motion

| Term | Definition |
|---|---|
| **Parallax** | Two or more layers translating at *different fractions* of the same scroll delta, producing apparent depth. A layer at depth `0.3` moves 30 px for every 100 px of page scroll. Parallax is a `transform` effect — it never changes an element's box. |
| **Depth / speed factor** | The multiplier applied to scroll delta for one layer. `0` = pinned to page (no parallax), `1` = moves with the page normally. Values between produce recession. |
| **Scroll delta** | Change in `window.scrollY` between two frames. All scroll-linked motion derives from this single value, read **once per frame**. |
| **Smooth scroll (lerp scrolling)** | Interpolating the rendered scroll position toward the true scroll position each frame, instead of jumping to it. Produces a glide rather than a step. Implemented here with Lenis. |
| **Lerp** | Linear interpolation factor, `0`–`1`. `rendered += (target − rendered) × lerp`, once per frame. **Lower lerp = smoother and slower to settle. Higher lerp = snappier and closer to native.** This single number is the entire "smooth vs. laggy" tradeoff. |
| **Settle time** | Milliseconds from the last input event until rendered position is within 1 px of true position. The measurable definition of "delay". |
| **Scroll hijacking** | Any behaviour where the page's scroll position stops corresponding predictably to user input — snapping to sections, blocking scroll, capturing wheel events to drive something other than scroll, or forcing a fixed number of "pages" per gesture. **Prohibited** (MOT-02). Smooth scrolling is *not* hijacking; section snapping is. |
| **Sticky scroll / pinning** | An element held in the viewport via `position: sticky` while its taller parent track scrolls past. Scroll progress through the track drives a state change (e.g. active feature index). The page never stops scrolling. |
| **Scroll-linked animation** | Animation whose progress is a function of scroll position. Reversible — scrolling up reverses it. |
| **Scroll-triggered animation** | Animation fired *once* when an element crosses a viewport threshold, then runs on its own clock. Not reversible. Section reveals and stat count-ups are triggered, not linked. |
| **rAF (`requestAnimationFrame`)** | Browser callback fired once per display refresh, before paint. All scroll-linked writes happen in exactly one rAF loop. |
| **Layout thrash** | Interleaving DOM reads (`getBoundingClientRect`, `offsetTop`) with DOM writes in the same frame, forcing repeated synchronous layout. The primary cause of scroll jank. Prohibited (MOT-05). |
| **Compositing** | GPU-side assembly of already-painted layers. `transform` and `opacity` changes can be composited without re-running layout or paint; `width`, `top`, `margin` cannot. This is why only those two properties may be animated. |
| **`will-change`** | A hint that promotes an element to its own compositor layer. Costs GPU memory permanently while set — applied on approach, removed on exit. Never left on globally. |
| **Passive listener** | `addEventListener(..., { passive: true })`. Promises the handler won't call `preventDefault()`, letting the browser scroll without waiting for JS. Required on all scroll and touch listeners. |
| **`prefers-reduced-motion`** | OS-level accessibility setting. When `reduce`, vestibular-triggering motion must be removed — not shortened. |
| **IntersectionObserver** | Async API reporting when an element crosses a viewport threshold, without polling scroll. Used for all triggered animation and lazy loading. |
| **Overscan** | Sizing a parallax layer larger than its container so translation never exposes an edge. Required displacement headroom = max displacement + 8 px. |

### 1.2 Rendering and performance

| Term | Definition |
|---|---|
| **SSG (Static Site Generation)** | Pages rendered to HTML at build time, served from CDN. This site's rendering mode. |
| **Hydration** | Attaching React event handlers to server-rendered HTML on the client. Content must be readable *before* hydration completes. |
| **LCP (Largest Contentful Paint)** | Time until the largest above-fold element renders. Target < 2.5 s. |
| **INP (Interaction to Next Paint)** | Latency from user interaction to the next visual update. Target < 200 ms. Replaces FID. |
| **CLS (Cumulative Layout Shift)** | Score for unexpected layout movement. Target < 0.1. Caused here by unsized images, font swap, and the sticky nav. |
| **FOUT / FOIT** | Flash of Unstyled / Invisible Text during font load. `font-display: swap` chooses FOUT; metric-matched fallbacks reduce the shift it causes. |
| **`unicode-range`** | `@font-face` descriptor restricting a font file to specific codepoints. The browser downloads the Devanagari file only if Devanagari characters are present. |
| **Subsetting** | Stripping unused glyphs from a font file. |
| **Tabular numerals (`tabular-nums`)** | Fixed-width digit glyphs. Required wherever numbers change in place, so a count-up doesn't reflow its container. |
| **Critical path** | Resources that must load before first render. Everything else is deferred. |

### 1.3 Internationalisation

| Term | Definition |
|---|---|
| **i18n** | Engineering the product so locales can be added without code changes. |
| **l10n** | Producing the actual translated content for a locale. |
| **Locale** | Language + region identifier (`en-IN`, `hi-IN`). Governs translation, number format, and date format independently. |
| **Message catalogue** | The per-locale key→string file (`messages/hi.json`). The only place user-facing text lives. |
| **ICU MessageFormat** | Syntax for plurals, gender, and interpolation inside a message. Required — string concatenation across locales produces broken grammar. |
| **Indian digit grouping** | `en-IN` groups as 2,2,3 from the right: `1,80,000`, not `180,000`. Handled by `Intl.NumberFormat`, never by hand. |
| **`hreflang`** | Link tag telling search engines which URL serves which locale. |
| **LTR / RTL** | Text direction. All eight candidate Indian languages are LTR. **Urdu is RTL** — see RSK-03. |
| **Devanagari** | Script used for Hindi, Marathi, Nepali. Requires greater line-height than Latin for matra and conjunct clearance. |
| **Matra** | Vowel sign attached above, below, or beside a Devanagari consonant. The reason `line-height: 1.6` clips Hindi. |

### 1.4 Product terms

| Term | Definition (as used on this site) |
|---|---|
| **SOS** | The emergency feature. Sends location to *user-chosen contacts* and surfaces local emergency numbers. **Not connected to any police system.** |
| **Geofence** | A defined geographic boundary that triggers a client-side notification on entry or approach. |
| **MRP** | Maximum Retail Price — the legally mandated printed ceiling price on Indian packaged goods. |
| **Verified guide** | A guide whose licence number has been checked against the issuing register. Binary — there are no tiers. |
| **MAU** | Monthly Active Users. A Year 1 *goal*, never stated as an achievement. |

---

## 2. Architecture

| ID | Requirement |
|---|---|
| **ARC-01** | Next.js App Router, TypeScript strict mode, Tailwind, Framer Motion (`motion`), Lenis. |
| **ARC-02** | Rendering: **fully static (SSG)**. No SSR at request time. The only dynamic surface is the signup Route Handler. |
| **ARC-03** | Routing: `app/[locale]/page.tsx`. `en` is the default and is **not** prefixed; `hi` serves at `/hi`. Middleware negotiates from `Accept-Language` on first visit only, then respects an explicit choice stored in a first-party cookie. |
| **ARC-04** | One component per section under `components/sections/`. No section component exceeds 250 lines. |
| **ARC-05** | Zero user-facing strings in component files. All copy resolves from the message catalogue (§6). |
| **ARC-06** | Every statistic resolves from `content/sources.ts`, which pairs value + source name + year. A stat without both does not render (FR-07-03). |
| **ARC-07** | The page is fully readable and navigable with JavaScript disabled: all content in the DOM, all sections reachable by anchor, the signup form posts natively to the Route Handler. Motion is the only thing lost. |
| **ARC-08** | Deploy target: static hosting + edge function for the form. No server, no database at launch (see OPN-02). |

```
app/
  [locale]/page.tsx  layout.tsx
  api/subscribe/route.ts
  globals.css  fonts.ts  sitemap.ts  robots.ts  opengraph-image.tsx
components/
  sections/   Nav Hero TrustGap Vision Features Segments Market Roadmap Cta Footer
  ui/         Button Card Input Stat Badge Container SectionHeading LocaleSwitcher
  motion/     ScrollProvider Parallax Reveal CountUp CoverageArc StickyFeatures
  mockups/    DeviceFrame SosScreen
hooks/        useReducedMotion useScrollProgress useInViewOnce
messages/     en.json  hi.json
content/      sources.ts
lib/          lenis.ts  format.ts  validate.ts  cn.ts
```

---

## 3. Scroll subsystem

The subject of the two most specific requirements in the brief: parallax on scroll, and smooth scrolling **without delay**. These pull against each other and are specified separately.

### 3.1 Smooth scrolling — "without delay"

"Smooth" and "no delay" are not in conflict *if* the correct property is tuned. The failure mode people call "laggy smooth scroll" is a low lerp producing a long settle tail, so the page keeps gliding after the user has stopped. The fix is a higher lerp, not disabling smoothing.

| ID | Requirement |
|---|---|
| **SCR-01** | Smooth scroll via Lenis, `lerp: 0.14`. Not the library default of `0.1` — `0.1` settles in ~700 ms and reads as lag. `0.14` settles in ~380 ms and reads as glide. |
| **SCR-02** | **First visual response must occur within one frame (≤ 16.7 ms) of the input event.** Smoothing may extend motion; it may never delay its start. This is the operative definition of "without delay". |
| **SCR-03** | Settle time ≤ 400 ms from last wheel/trackpad event. Measured, not estimated (§10.2). |
| **SCR-04** | **Touch uses native momentum scrolling.** `syncTouch: false`. Lenis on touch fights the platform's own physics and is the single largest source of "feels wrong on mobile" complaints. Smoothing applies to wheel and trackpad only. |
| **SCR-05** | `wheelMultiplier: 1`. Never amplify or dampen the user's input distance — that is scroll hijacking under §1.1. |
| **SCR-06** | Keyboard scrolling (`Space`, `PgUp`/`PgDn`, `Home`, `End`, arrows) behaves natively and is never intercepted. |
| **SCR-07** | Anchor navigation from the nav uses Lenis `scrollTo` with `duration: 0.8`, `ease-standard` easing, and lands with the target heading at `scroll-margin-top: 96px` (clear of the sticky nav). Total ≤ 900 ms. |
| **SCR-08** | Anchor navigation moves focus to the target section (`tabindex="-1"` + `.focus()`), so keyboard and screen-reader users land where sighted users land. |
| **SCR-09** | Lenis is **destroyed**, not paused, under `prefers-reduced-motion: reduce`. Native scrolling is fully restored and `scroll-behavior: auto` applies. |
| **SCR-10** | Lenis is destroyed on route change and on unmount. No orphaned rAF loops. |
| **SCR-11** | If Lenis fails to initialise for any reason, the page falls back to native scroll silently. Smooth scroll is an enhancement, never a dependency. |
| **SCR-12** | `overscroll-behavior: none` is **not** set on the document. It breaks pull-to-refresh on Android, the primary target platform. |

### 3.2 Parallax

| ID | Requirement |
|---|---|
| **MOT-01** | Hero parallax runs on three layers at depth factors **0.15 / 0.30 / 0.50** (background wash / coverage arc / device mockup). Referenced in `Design.md` §9. |
| **MOT-02** | **No scroll hijacking.** The page never snaps, never blocks, never captures wheel events to advance state instead of scrolling. Scroll position always corresponds to input. |
| **MOT-03** | Parallax animates `transform: translate3d(0, Ypx, 0)` only. Never `top`, `background-position`, `margin`, or `height`. |
| **MOT-04** | Displacement is **clamped** to the layer's overscan headroom. Layers are sized `max-displacement + 8px` beyond their container so no edge is ever exposed at any viewport height. |
| **MOT-05** | **One rAF loop for the entire page.** All scroll-linked values are computed from a single cached `scrollY` read and written in one batch. No component reads layout during scroll. Element geometry is cached on mount and recomputed only on `resize` and `orientationchange` (debounced 150 ms). |
| **MOT-06** | `will-change: transform` is applied when a parallax layer enters a 200 px pre-viewport margin and **removed when it exits**. Never set globally or permanently. |
| **MOT-07** | All scroll and touch listeners are `{ passive: true }`. |
| **MOT-08** | **Parallax is disabled below 768 px** — disabled, not reduced. Layers render at their resting position. |
| **MOT-09** | Parallax is disabled under `prefers-reduced-motion: reduce`. |
| **MOT-10** | **Frame budget: p95 frame time ≤ 16.7 ms** during a full-page scroll on the reference device (§10.1). If the budget is missed, remove the deepest layer and re-measure. If it is still missed, remove parallax. A static hero is better than a janky one in a product about calm. |
| **MOT-11** | Baseline implementation is rAF + `transform`. CSS scroll-driven animation (`animation-timeline: scroll()`) may be used as a progressive enhancement **only** behind `CSS.supports('animation-timeline: scroll()')`, with the rAF path as the fallback. Verify current browser support before adopting; do not assume. |

### 3.3 Sticky feature scroll — Section 5

| ID | Requirement |
|---|---|
| **MOT-12** | ≥ 1024 px: the five MVP features use a **sticky panel inside a scroll track**. Track height = `5 × 100vh`. Panel is `position: sticky; top: 0`. Scroll progress through the track maps to active index 0–4. |
| **MOT-13** | The user can scroll through the entire track at normal speed and continue past. No snapping, no minimum dwell, no gesture capture. |
| **MOT-14** | Panel transitions are `opacity` + `translateY(12px)` cross-fades at `base` / `ease-standard` (`Design.md` §9). |
| **MOT-15** | < 1024 px: the section becomes a **native accordion** — `<button aria-expanded aria-controls>` per feature, no sticky, no scroll track. First item open by default. |
| **MOT-16** | All five features are present in the DOM in source order at every breakpoint, readable without JavaScript. The sticky behaviour is presentational. |
| **MOT-17** | Keyboard: at ≥ 1024 px a visible control group (prev/next + index dots) allows stepping without scrolling. Focus moving to a feature's control sets that feature active. |
| **MOT-18** | Each feature panel's honest caveat (`Design.md` §10.2) is permanently visible text — never a tooltip, `title` attribute, or disclosure. |

### 3.4 Triggered animation

| ID | Requirement |
|---|---|
| **MOT-19** | Section reveals use IntersectionObserver at `threshold: 0.2`, `once: true`. `opacity` 0→1 and `translateY` 16→0 at `slow` / `ease-entrance`. |
| **MOT-20** | Stat count-ups fire on first viewport entry only (`threshold: 0.5`, `once: true`), animate over `deliberate` (700 ms) via rAF, and use `font-variant-numeric: tabular-nums` so the container does not reflow. |
| **MOT-21** | **The final value is rendered in the server HTML.** The count-up replaces it on the client. Crawlers, no-JS users, and reduced-motion users all see the real number. |
| **MOT-22** | Under `prefers-reduced-motion`: count-ups render final values immediately; reveals become `opacity`-only at `fast`; the device mockup idle float is disabled; card hover lift is disabled. |
| **MOT-23** | `useReducedMotion` subscribes to the media query live. A user toggling the OS setting mid-session takes effect without reload. |
| **MOT-24** | Coverage arc (`Design.md` §8) translates at depth `0.10`. Disabled below 768 px and under reduced motion. |

---

## 4. Functional requirements — by section

| ID | Section | Requirement |
|---|---|---|
| **FR-01-01** | Nav | Sticky. Transparent over hero; gains `surface/base`, `e2`, and bottom border past 80 px scroll, cross-faded 200 ms. |
| **FR-01-02** | Nav | Four anchor links + one primary CTA + locale switcher. CTA label never contains "Download", "Install", or "Try". |
| **FR-01-03** | Nav | Mobile: full-height sheet, focus-trapped, `Esc` closes, trigger regains focus on close, background inert (`inert` attribute or `aria-hidden` + focus containment). |
| **FR-01-04** | Nav | Active link reflects the section currently in view (IntersectionObserver, not scroll math) and is exposed as `aria-current="location"`. |
| **FR-02-01** | Hero | Three parallax layers per MOT-01. Device mockup is `priority` loaded; it is the LCP element. |
| **FR-02-02** | Hero | Email capture form, inline. Full spec §5. |
| **FR-02-03** | Hero | Mockup `alt` must state the app is in development. |
| **FR-02-04** | Hero | Eyebrow badge renders development status. No store badges anywhere in the document. |
| **FR-03-01** | Trust gap | Evidence cards render from `content/sources.ts`. Cards whose source is `null` render a **visible** `[PLACEHOLDER]` state in development and are **excluded from the production build** — never silently filled. |
| **FR-03-02** | Trust gap | Both the ITA (20.6 M) and FTA (9.95 M) figures render, labelled, with the footnote explaining the ~2× difference (`Design.md` §10.3). |
| **FR-04-01** | Vision | Static content. Reveal animation only. |
| **FR-05-01** | Features | Per §3.3. |
| **FR-06-01** | Segments | Three cards. Job-to-be-done rendered as first-person quoted text — these are stated needs, not testimonials, and must not be attributed to a named person. |
| **FR-07-01** | Market | Interactive data visualisation, three toggles (Inbound / Domestic / Pilot city). |
| **FR-07-02** | Market | Toggles are `role="tablist"` with arrow-key navigation and `aria-selected`. |
| **FR-07-03** | Market | `Stat` requires `source` **or** `goal={true}`. Rendering with neither throws at build time. |
| **FR-07-04** | Market | Chart is SVG, rendered server-side, monochrome per `Design.md` §1. Data table equivalent available to screen readers (`<table class="sr-only">` or `aria-describedby`). |
| **FR-08-01** | Roadmap | Four stages + a Year 1 targets block under an explicit "goals — not results" heading. |
| **FR-09-01** | Dual CTA | Left: signup form (§5). Right: co-founder outreach, `mailto:` with prefilled subject. |
| **FR-10-01** | Footer | Required disclosure string (`Design.md` §10.4) always rendered, never behind a disclosure control. |
| **FR-10-02** | Footer | Locale switcher duplicated here. |

---

## 5. Signup form

| ID | Requirement |
|---|---|
| **FRM-01** | Two instances (hero, dual CTA) share one component and one endpoint. `source` field distinguishes them. |
| **FRM-02** | Native `<form method="post" action="/api/subscribe">`. Progressive enhancement adds `fetch` + inline states. Works without JS. |
| **FRM-03** | Client validation on `blur` and submit; **server validation is authoritative**. Never trust the client. |
| **FRM-04** | Visible `<label>` always present. Placeholder is an example, never a label substitute. |
| **FRM-05** | `type="email"`, `autocomplete="email"`, `inputmode="email"`, `spellcheck="false"`. |
| **FRM-06** | Error state: 2 px `border/interactive`, inline icon, message in `text/primary`, `aria-invalid="true"`, `aria-describedby` → message id. **No red** — `alert/*` is SOS-only (`Design.md` §3.2). |
| **FRM-07** | Status messages announced via `aria-live="polite"`. |
| **FRM-08** | Spam: honeypot field (visually hidden, `tabindex="-1"`, `autocomplete="off"`) **plus** a minimum time-to-submit of 2 s. **No CAPTCHA** — it adds friction, fails accessibility for some users, and introduces a third-party consent obligation. |
| **FRM-09** | Rate limit: 5 submissions per IP per hour at the edge. |
| **FRM-10** | Duplicate submissions return success, not an error. Never disclose whether an address is already stored. |
| **FRM-11** | Double opt-in. Consent is recorded with timestamp, IP, and the exact consent text version shown. |
| **FRM-12** | Consent copy states purpose and frequency at the point of collection: two emails, unsubscribe any time. |
| **FRM-13** | Button label persists through the flow: "Join the early access list" → success state "You're on the list." |
| **FRM-14** | Loading state disables submit and announces politely. Success and error states are inline, never `alert()` or a toast that can be missed. |

---

## 6. Internationalisation

Launch is `en` + `hi`. The architecture must absorb six more languages without touching component code.

| ID | Requirement |
|---|---|
| **I18N-01** | `next-intl` (or equivalent) with `app/[locale]/`. `en` unprefixed, `hi` at `/hi`. |
| **I18N-02** | All user-facing strings in `messages/{locale}.json`. **Zero string literals in components** — verified by lint. |
| **I18N-03** | **ICU MessageFormat** for all plurals, interpolation, and gendered strings. String concatenation across locales is prohibited — it produces broken grammar in every language with different word order. |
| **I18N-04** | `<html lang>` set per locale. `dir="ltr"` for all currently planned locales. |
| **I18N-05** | Numbers formatted with `Intl.NumberFormat(locale)`. **`en-IN` groups 2,2,3** — `1,80,000` not `180,000`. Never hand-format. Currency via `{ style: 'currency', currency: 'INR' }`. |
| **I18N-06** | Dates via `Intl.DateTimeFormat`. No hard-coded month names. |
| **I18N-07** | Devanagari renders in the chosen Devanagari face (`Design.md` §4.3 — **decision outstanding, OPN-01**), loaded via `unicode-range` so English-only visitors never download it. |
| **I18N-08** | `:lang(hi)` applies `line-height: 1.75` minimum, `letter-spacing: 0`, and `text-transform: none`. The `meta` uppercase style does not apply — Devanagari has no case. |
| **I18N-09** | Digits inside Hindi strings remain **Latin numerals in JetBrains Mono**. Devanagari numerals are not used, so the mono rule survives translation. |
| **I18N-10** | Locale switcher preserves scroll position and the current anchor. It is a `<a href>` per locale, not a JS-only control, so it works without JS and is crawlable. |
| **I18N-11** | `hreflang` alternates for every locale plus `x-default`. Per-locale entries in `sitemap.xml`. |
| **I18N-12** | Message catalogues are checked for key parity in CI. A missing key in any locale fails the build — it must not fall back silently to English in production. |
| **I18N-13** | Locale is persisted in a first-party `SameSite=Lax` cookie after explicit user choice only. `Accept-Language` negotiation applies to the first visit only and never overrides an explicit choice. |
| **I18N-14** | Layout must tolerate **+35% string expansion** without breaking. Hindi and German-length strings are the test cases. No fixed-width buttons, no single-line assumptions on headings. |
| **I18N-15** | The eight-language feature copy (`Design.md` §10.2) states "Pilot ships in Hindi and English. Eight languages follow." It must not imply eight are available. |

---

## 7. Performance

| ID | Requirement |
|---|---|
| **PRF-01** | Lighthouse mobile: Performance ≥ 90, Accessibility 100, Best Practices ≥ 95, SEO 100. |
| **PRF-02** | LCP < 2.5 s, INP < 200 ms, CLS < 0.1 — on the reference device and network (§10.1). |
| **PRF-03** | First-load JS ≤ 130 KB gzipped. |
| **PRF-04** | Framer Motion is imported via `LazyMotion` + `domAnimation` (~18 KB) rather than the full bundle (~50 KB). Motion components are `m.*`, not `motion.*`. |
| **PRF-05** | Fonts self-hosted via `next/font`. No runtime request to a font CDN. Preload **only** Figtree 400 and 800. |
| **PRF-06** | Metric-matched `size-adjust` fallback declared for Figtree to keep font-swap CLS at zero. |
| **PRF-07** | Images: `next/image`, AVIF with WebP fallback, explicit `width`/`height`, `sizes` set. `priority` on the hero mockup only; everything below the fold lazy. |
| **PRF-08** | No third-party script blocks first render. Analytics loads `afterInteractive`. |
| **PRF-09** | Total page weight ≤ 900 KB on first load including images. |
| **PRF-10** | Bundle size is checked in CI; a PR that exceeds the budget fails. |

---

## 8. Accessibility

Target: **WCAG 2.2 AA**, Lighthouse Accessibility 100.

| ID | Requirement |
|---|---|
| **A11Y-01** | Every text/background pair appears in the `Design.md` §3.3 allow-list. Nothing unverified ships. |
| **A11Y-02** | Visible focus on every interactive element: 2 px ring + 2 px offset, using `focus/ring-light` or `focus/ring-dark` per ground. `outline: none` without a replacement is prohibited. |
| **A11Y-03** | Full keyboard operability. Logical tab order matching visual order. No keyboard traps. Skip-to-content link as the first focusable element. |
| **A11Y-04** | Interactive control boundaries meet 3:1 (SC 1.4.11) — `border/interactive`, not `border/strong`. |
| **A11Y-05** | Touch targets ≥ 44×44 CSS px, including small buttons (pad the hit area, not the box). |
| **A11Y-06** | Semantic HTML: one `<h1>`, sequential heading levels, `<nav>`/`<main>`/`<footer>`, `<section aria-labelledby>`. |
| **A11Y-07** | Status and error messages use `aria-live`, not visual-only cues. Colour is never the sole carrier of meaning (SC 1.4.1). |
| **A11Y-08** | Data visualisation has a screen-reader-accessible table equivalent. |
| **A11Y-09** | `prefers-reduced-motion` honoured per MOT-22/23 — motion removed, not shortened. |
| **A11Y-10** | Page usable at 200% zoom and at 320 px equivalent width without horizontal scroll (SC 1.4.10). |
| **A11Y-11** | Automated axe-core scan passes with zero violations in CI; automated testing is a floor, not the standard — manual keyboard and screen-reader passes are required (§10.3). |

---

## 9. SEO, privacy, analytics

| ID | Requirement |
|---|---|
| **SEO-01** | Per-locale `<title>`, meta description, canonical, `hreflang`, OG + Twitter tags. OG image 1200×630. |
| **SEO-02** | JSON-LD: `Organization` and `WebSite` only. **No `SoftwareApplication`, no `downloadUrl`, no `AggregateRating`** — the app does not exist and there are no ratings. |
| **SEO-03** | `sitemap.xml` and `robots.txt` generated at build. |
| **PRV-01** | **DPDP Act 2023 (India)** applies: notice at collection, stated purpose, consent record, and a withdrawal path. |
| **PRV-02** | **GDPR/UK GDPR also applies** — the stated audience includes foreign tourists, so EU/UK data subjects will submit the form. Lawful basis is consent; a data processing agreement is required with whichever email vendor is chosen (OPN-02). |
| **PRV-03** | Analytics is cookieless and privacy-preserving by default (e.g. Plausible/Umami class). If any cookie-setting analytics is adopted, a consent banner becomes mandatory and PRF-08 must be re-measured. |
| **PRV-04** | No third-party tracking pixels, no ad-network tags, no session recording. |
| **PRV-05** | Privacy policy and terms pages exist and are linked from the footer before the form goes live. |
| **SEC-01** | CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS. |
| **SEC-02** | No secrets in client bundles. Email vendor keys server-side only. |

---

## 10. Testing

### 10.1 Reference environment

Performance and motion budgets are meaningless without a stated target. All measurements are taken on:

| | |
|---|---|
| **Device** | Mid-range Android, 2022–2023 class (Redmi Note / Moto G tier) — the actual pilot audience's hardware |
| **Proxy** | Chrome DevTools, 4× CPU throttle, "Fast 4G" network |
| **Viewport** | 360 × 800 |
| **Also verified on** | iPhone SE-class Safari, desktop Chrome 1440, Firefox, Safari macOS |

### 10.2 Scroll and motion verification

| ID | Test |
|---|---|
| **TST-01** | Record a Performance trace across a full-page scroll. **p95 frame time ≤ 16.7 ms** (MOT-10). Fail → drop the deepest parallax layer and re-measure. |
| **TST-02** | Measure input-to-first-paint latency on wheel event ≤ 16.7 ms (SCR-02). |
| **TST-03** | Measure settle time from last wheel event ≤ 400 ms (SCR-03). |
| **TST-04** | Confirm zero forced synchronous layouts in the scroll trace (MOT-05). |
| **TST-05** | Confirm no `will-change` remains set on off-screen elements after scroll (MOT-06). |
| **TST-06** | Toggle OS reduced-motion mid-session; confirm Lenis is destroyed and all motion stops without reload (SCR-09, MOT-23). |
| **TST-07** | Scroll the feature track at maximum speed; confirm the page passes through without snapping or resistance (MOT-13). |

### 10.3 Functional and accessibility

| ID | Test |
|---|---|
| **TST-08** | Playwright e2e: signup happy path, validation failure, duplicate, honeypot rejection, rate limit. |
| **TST-09** | Playwright keyboard-only traversal of the whole page including the mobile menu. |
| **TST-10** | axe-core in CI, zero violations. |
| **TST-11** | Manual screen-reader pass: NVDA/Chrome and VoiceOver/Safari. |
| **TST-12** | JavaScript disabled: all content readable, all anchors work, form submits and returns a usable response (ARC-07). |
| **TST-13** | Locale parity check across message catalogues (I18N-12). |
| **TST-14** | Hindi build: confirm Devanagari renders in the intended face, not a system fallback, and that no line clips matras (I18N-07/08). |
| **TST-15** | Grep the production bundle for every forbidden string in `Design.md` §10.1. Any hit fails the build. |
| **TST-16** | Confirm no `alert/*` token outside the two permitted files (`Design.md` §11.4). |
| **TST-17** | Visual regression at 360 / 768 / 1024 / 1440. |
| **TST-18** | +35% pseudo-localised string expansion causes no overflow or clipping (I18N-14). |

---

## 11. Definition of done

Release gate. All must pass.

1. Lighthouse mobile: Performance ≥ 90, Accessibility 100 (PRF-01)
2. Core Web Vitals within budget on the reference device (PRF-02)
3. Scroll budget met: p95 ≤ 16.7 ms, first response ≤ 16.7 ms, settle ≤ 400 ms (TST-01/02/03)
4. Zero axe violations; manual keyboard and screen-reader passes complete (A11Y-11)
5. Reduced motion verified live-toggling (TST-06)
6. Page functional with JS disabled (TST-12)
7. Locale parity green; Hindi renders in the intended Devanagari face (TST-13/14)
8. Zero forbidden strings in the bundle (TST-15)
9. Zero `alert/*` outside permitted files (TST-16)
10. Every `Stat` carries `source` or `goal` (FR-07-03)
11. Footer disclosure present and unhidden (FR-10-01)
12. Privacy policy and terms live; consent record captured with version (PRV-01/05)
13. JSON-LD contains no `SoftwareApplication` or `downloadUrl` (SEO-02)

---

## 12. Risks

| ID | Risk | Impact | Mitigation |
|---|---|---|---|
| **RSK-01** | Smooth scroll perceived as laggy | Core UX complaint; undermines "calm competence" | Lerp `0.14`, native touch, measured settle time (SCR-01/03/04). If TST-03 fails twice, ship native scroll — smoothing is optional, responsiveness is not. |
| **RSK-02** | Parallax jank on mid-range Android | Motion sickness, bounce, contradicts the brand | Disabled < 768 px, measured budget, documented cut order (MOT-08/10) |
| **RSK-03** | **If Urdu is among the eight languages, RTL is required** | Full mirrored layout: logical properties throughout, mirrored icons, bidi handling. Non-trivial retrofit. | Confirm the eight languages now (OPN-03). If Urdu is in, adopt logical CSS properties (`margin-inline`, `padding-block`) from the first commit rather than retrofitting. |
| **RSK-04** | Devanagari renders in a system fallback | **Fails silently** — it looks like text and passes every automated check | Explicit visual check (TST-14), plus a computed-style assertion in CI |
| **RSK-05** | An agent fills an unsourced statistic to complete a card | Fabricated data on an investor-facing page | Build-time throw (FR-07-03), placeholders excluded from production build (FR-03-01) |
| **RSK-06** | Copy drifts toward implying the app ships | Regulatory and reputational exposure — the product's largest liability | Forbidden-string grep in CI (TST-15) |
| **RSK-07** | Framer Motion + Lenis exceed the JS budget | LCP/INP regression | `LazyMotion` (PRF-04), CI bundle check (PRF-10) |
| **RSK-08** | CSS scroll-driven animation adopted without verified support | Silent breakage in some browsers | Feature-detect only, rAF fallback mandatory (MOT-11) |

---

## 13. Open items

Blocking. Do not guess.

| ID | Item | Blocks | Owner |
|---|---|---|---|
| **OPN-01** | Devanagari typeface not chosen — Figtree has no Devanagari coverage | Every Hindi string (I18N-07) | Design |
| **OPN-02** | Email storage vendor not chosen — determines the DPA, the double opt-in flow, and the data residency answer | Signup form (§5), PRV-02 | Founder |
| **OPN-03** | The eight languages are unnamed — determines whether RTL is in scope | I18N architecture, RSK-03 | Founder |
| **OPN-04** | App icon is `#1D4ED7`, token is `#1A54DA` — re-export required | Favicon, OG image, nav | Design |
| **OPN-05** | Wordmark lockups on transparent (primary and light) not supplied | Nav, footer | Design |
| **OPN-06** | Two trust-gap statistics unsourced: Jaipur autorickshaw overcharge multiple, licensed-vs-operating guide counts in Rajasthan | FR-03-01 | Founder |
| **OPN-07** | Absolute roadmap dates — brief gives "Month 3–5" with no start month | FR-08-01 | Founder |
| **OPN-08** | Founder email, registered entity name | FR-09-01, FR-10-01 | Founder |
| **OPN-09** | Testimonial substitute — there are no users | FR-06-01 | Founder |
| **OPN-10** | Analytics vendor — determines whether a consent banner is required | PRV-03 | Founder |

OPN-01 and OPN-03 are the two that change architecture rather than content. Both should be answered before Phase 5 begins.
