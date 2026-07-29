# Project Memory — Sahvo Marketing Site

## Overview
Sahvo single-page pre-MVP marketing site for tourist safety and price transparency in India.
Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lenis.

## Implementation Plan Summary
1. **Design System & Tokens**: Implement Design.md tokens in `app/globals.css` using CSS custom properties & Tailwind `@theme`.
2. **Typography**: Google Fonts via `next/font/google` (Figtree, JetBrains Mono, Noto Sans Devanagari) in `app/fonts.ts`.
3. **Data & Copy Layer**: `content/copy.ts` (all UI copy) and `content/sources.ts` (sourced statistics).
4. **UI Components**: `Button`, `Card`, `Input`, `Stat`, `Badge`, `Container`, `SectionHeading` in `components/ui/`.
5. **Motion System**: `Reveal`, `CountUp`, `useReducedMotion` hook, `SmoothScroll` with Lenis in `components/motion/` and `lib/lenis.ts`.
6. **Page Sections**: 10 sections in `components/sections/`: `Nav`, `Hero`, `TrustGap`, `Vision`, `Features`, `Segments`, `Market`, `Roadmap`, `Cta`, `Footer`.
7. **Signup API**: `app/api/subscribe/route.ts` with honeypot & server-side validation.
8. **SEO & Metadata**: Metadata, OG tags, JSON-LD (`Organization` + `WebSite`), `sitemap.ts`, `robots.ts`.
9. **Logo Integration**: Replaced placeholder SVG wordmark with official `Primary_logo1.png` in `components/logo/Logo.tsx`.

---

## Completed Tasks
- [x] Phase 0: Foundations & content audit (`Design.md`, `TRD.md`, `sahvo-phase-0.md`)
- [x] Phase 1–4: Architecture, design system, hi-fi specs & motion plan defined
- [x] Scaffold Next.js 16 (App Router + TypeScript + Tailwind v4) into project root
- [x] Install dependencies (`framer-motion`, `lenis`, `clsx`, `tailwind-merge`)
- [x] Implement `lib/cn.ts`, `app/fonts.ts`, `app/globals.css` with Design.md tokens
- [x] Implement `content/copy.ts` and `content/sources.ts`
- [x] Build reusable UI components (`Container`, `SectionHeading`, `Button`, `Card`, `Input`, `Stat`, `Badge`)
- [x] Build motion primitives (`Reveal`, `CountUp`, `useReducedMotion`, `SmoothScroll`)
- [x] Build mobile device mockup (`DeviceFrame`, `SosScreen`)
- [x] Build all 10 page sections (`Nav`, `Hero`, `TrustGap`, `Vision`, `Features`, `Segments`, `Market`, `Roadmap`, `Cta`, `Footer`)
- [x] Implement `app/api/subscribe/route.ts`
- [x] Set up SEO, Metadata, Sitemap, Robots, and JSON-LD in `app/layout.tsx` & root files
- [x] Integrate official `Primary_logo1.png` logo in `Nav.tsx` & `Footer.tsx`
- [x] Verify build with `npm run build` (Clean compile, 0 errors)
- [x] Perform QA audit against acceptance criteria (Design.md §12 & TRD.md §11)
