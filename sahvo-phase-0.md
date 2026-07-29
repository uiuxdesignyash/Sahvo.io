# Sahvo — Phase 0: Foundations & Content

**Status: partially blocked.** No files reached me. `/mnt/user-data/uploads/` is empty — no logo, no app icon, no reference screenshots. Everything below that depends on the logo file is architecture-only, with the seed value left unfilled.

---

## 0. Blocked items

| Item | Why blocked | Workaround used |
|---|---|---|
| Exact brand blue | Logo file absent; brief forbids eyeballing | Token set defined as a derivation from an unfilled seed `--seed-blue` |
| Full palette (tints, shades, neutral ramp) | Derived from seed | Derivation rules specified; values pending |
| Alert red selection | Must be tested for hue separation and contrast against the real blue | Constraints specified; hex pending |
| Type pairing final call | Must be seen against the actual wordmark | Three candidates proposed with rationale; recommendation stated |
| Reference extraction (Refs 1–3) | Screenshots absent | Working from your written descriptions only — flagged as second-hand |

**This does not block Phase 1.** Wireframes are greyscale. On approval of the copy deck and register below, I can proceed to Phase 1 while the logo is located.

---

## 1. Visual register — decision before design

Brief: *calm competence and safety, not wanderlust. Reassuring, not exciting.*

**The target feeling: a well-run airport, not a travel poster.** You do not feel excited in a well-run airport. You feel that someone competent has thought about this before you arrived. That is the whole emotional brief.

Nine rules that follow from it:

| # | Rule | Consequence |
|---|---|---|
| 1 | No golden-hour photography | No sunsets, silhouettes, camels, Taj-at-dawn. Any photography is daylight, documentary, unfiltered, of ordinary streets and real people. Travel sites sell the destination; Sahvo sells the traveller's state of mind. |
| 2 | Cool light ground, never warm | Surfaces are near-white with a cool blue-grey cast. No cream, no beige, no sand — those signal editorial travel. |
| 3 | Confidence via space, not weight | Large type at 500–600 weight, not 800. Generous leading, wide margins. Nothing shouts. |
| 4 | One hue does the work | Blue and its ramp carry the whole page. No secondary accent colour, no gradient meshes. Restraint reads as competence. |
| 5 | Red is a semaphore | Appears exactly twice: the SOS feature panel and the SOS device mockup. Never in errors, charts, hovers, or decoration. |
| 6 | Motion is slow and inevitable | 320–700 ms, ease-out, zero overshoot, zero bounce, zero spring. A safety product whose site startles you is a contradiction. |
| 7 | The recurring shape is a coverage arc, not a blob | Ref 2's organic blob translated into a large, low-opacity rounded arc — the shape of a geofence radius. It repeats and widens as you scroll, reading as *coverage extending*, not watercolour. |
| 8 | Numbers are stated, not celebrated | Data viz is monochrome blue, one highlight, no upward arrows, no confetti, no gradient fills. |
| 9 | The italic-serif accent is used exactly four times | Hero H1, trust-gap H2, segments H2, market H2. One word each. Beyond four it becomes a mannerism. |

Ref extraction, as instructed (principles not layouts): **airiness + single typographic accent** from Ref 1; **a recurring brand shape that carries the eye down the page** from Ref 2; **image-forward card treatment with confident large type** from Ref 3. The dark saturated feature cards from Ref 2 are adopted for the feature section only — dark blue panels give the interactive feature module a distinct register from the light page, which helps the one-at-a-time interaction read as a separate mode.

---

## 2. Type pairing — proposal, not yet applied

Constraint: body face must support Devanagari. Wordmark is geometric lowercase. Ref 1 requires an italic-serif accent word.

| | Option A — **recommended** | Option B | Option C |
|---|---|---|---|
| **Headline / UI** | IBM Plex Sans | Anek Latin | General Sans (Fontshare) |
| **Body / multilingual** | IBM Plex Sans Devanagari | Anek Devanagari | Mukta (Ek Type) |
| **Accent (italic serif)** | Instrument Serif Italic | Instrument Serif Italic | Newsreader Italic |
| **Licence** | OFL | OFL | OFL / Fontshare free |
| **Weights available** | 7 per script | Variable, 5 widths × 7 weights | 7 / 7 |
| **Devanagari designer** | Erin McLaughlin, Bold Monday, 2019 | Indian Type Foundry | Ek Type |

**Why A.** IBM Plex was drawn as an institutional face for a technology company — it is the typeface of infrastructure, not of marketing. That is precisely the register we defined above: competent, slightly engineered, entirely unexcited. Its Latin has enough humanist irregularity (the flared `a`, the tailed `l`) that it never reads as generic geometric-startup, but it sits quietly beside a geometric lowercase wordmark rather than competing with it. Critically, Plex Sans and Plex Sans Devanagari are one family drawn by one team on shared metrics — Hindi and English strings in the same mockup will have matched colour, weight and rhythm, which is not true of a Latin face bolted to a separate Devanagari face. Same superfamily also means one variable-font payload strategy and no cross-script weight mismatch at 500.

**Why not B.** Anek Devanagari is the better-looking Devanagari in isolation and the width axis is tempting. But Anek's personality is expressive and contemporary-editorial — it leans warm and stylish, which pulls toward wanderlust and away from the register we just committed to. Hold it in reserve if Plex's Devanagari feels too corporate in specimen.

**Why not C.** Mukta's Devanagari is excellent and highly readable, but pairing it with a Latin-only display face (General Sans) reintroduces exactly the cross-script mismatch that Option A solves, and General Sans is close enough to a geometric wordmark that the two will fight.

**Accent face.** Instrument Serif Italic in all options — high contrast, narrow, a genuine italic rather than a slanted roman, and it reads as a quiet aside rather than a flourish. Latin-only, which is acceptable because the accent word is never translated: in Hindi builds the accent renders as Plex Devanagari at the same optical size, and the emphasis is carried by colour instead. Documented as an intentional divergence, not a fallback.

**Devanagari typesetting rules** (apply from Phase 2 onward): `:lang(hi)` gets +0.15 line-height over the Latin equivalent and a +0.5 px optical size bump; body Devanagari never below 1.7 leading, because matras and conjuncts need vertical clearance that Latin metrics do not allow for. No letter-spacing on Devanagari, ever.

---

## 3. Token set

### 3.1 Colour architecture (seed pending)

Method: hold hue, vary lightness on a fixed curve in OKLCH, damp chroma at both extremes so the tints do not go milky and the shades do not go black-blue. Every value derives from one seed.

| Token | Derivation | Value |
|---|---|---|
| `--seed-blue` | Sampled from logo, unmodified | **PENDING — logo file** |
| `--blue-50` … `--blue-950` | 11 steps, L from 0.97 → 0.18, C damped below 0.03 at both ends | PENDING |
| `--neutral-50` … `--neutral-950` | Same hue as seed, C clamped 0.004–0.012 — a cool grey that is family with the blue, not a dead grey | PENDING |
| `--sos-500` / `-600` / `-700` | Red, constrained: hue ≥ 60° from seed hue; `--sos-600` ≥ 4.5:1 on `--surface-base`; white text on `--sos-600` ≥ 4.5:1 | PENDING |

Semantic layer (this is what components consume — no component ever references a ramp step directly):

| Semantic token | Maps to | Use |
|---|---|---|
| `--surface-base` | `neutral-50` | Page ground |
| `--surface-raised` | `#FFF` | Cards |
| `--surface-sunken` | `neutral-100` | Alternating section bands |
| `--surface-inverse` | `blue-900` | Feature panels (Ref 2 dark cards) |
| `--text-primary` | `neutral-950` | Headlines, body |
| `--text-secondary` | `neutral-700` | Subheads, captions |
| `--text-muted` | `neutral-500` | Microcopy, footnotes, sources |
| `--text-on-inverse` | `blue-50` | Text on dark panels |
| `--border-subtle` | `neutral-200` | Card borders, dividers |
| `--border-strong` | `neutral-400` | Input borders, focus-adjacent |
| `--action-primary` | `blue-600` | Primary CTA fill |
| `--action-primary-hover` | `blue-700` | |
| `--action-primary-pressed` | `blue-800` | |
| `--focus-ring` | `blue-500` | 2 px ring + 2 px offset, never removed |
| `--brand-shape` | `blue-100` at 100% (not opacity) | The coverage arc. Solid tint, not a transparency — keeps rendering cheap. |
| `--sos-base` | `sos-600` | SOS UI only |
| `--sos-hover` | `sos-700` | SOS UI only |

**Enforcement rule to carry into Phase 5:** an ESLint/Stylelint rule blocking `--sos-*` outside `components/features/SosPanel` and `components/mockups/SosScreen`. The red-means-something constraint is easy to state and easy to violate six weeks later; make it mechanical.

### 3.2 Type scale

| Token | Desktop (1440) px / line-height / tracking | Mobile (360) |
|---|---|---|
| `display-1` | 72 / 1.05 / −0.02em | 40 / 1.1 / −0.015em |
| `display-2` | 56 / 1.10 / −0.015em | 34 / 1.15 |
| `h1` | 44 / 1.15 / −0.01em | 30 / 1.2 |
| `h2` | 36 / 1.20 | 26 / 1.25 |
| `h3` | 28 / 1.30 | 22 / 1.3 |
| `h4` | 22 / 1.35 | 19 / 1.35 |
| `body-lg` | 19 / 1.60 | 17 / 1.6 |
| `body` | 17 / 1.65 | 16 / 1.65 |
| `body-sm` | 15 / 1.60 | 14 / 1.6 |
| `caption` | 13 / 1.50 | 13 / 1.5 |
| `overline` | 12 / 1.40 / +0.08em uppercase | 12 / 1.4 |

Weights in use: 400 body, 500 UI and subheads, 600 headlines. **No 700 or above anywhere on the page** — bold is how excited sites shout.

### 3.3 Spacing, radius, elevation, motion primitives

| Set | Values |
|---|---|
| Space (4 px base) | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 192 |
| Section rhythm | 96 mobile / 160 desktop vertical padding |
| Radius | `sharp` 0, `sm` 6, `md` 10, `lg` 16, `xl` 24, `pill` 999 |
| Elevation | `e0` none, `e1` 0 1px 2px / 6%, `e2` 0 4px 12px / 8%, `e3` 0 12px 32px / 10% — all shadow colour derived from `blue-950`, never neutral black. **Cards default to `--border-subtle` + `e0`; shadow is the exception.** |
| Duration | `instant` 120, `fast` 200, `base` 320, `slow` 480, `deliberate` 700 |
| Easing | `standard` cubic-bezier(0.22, 0.61, 0.36, 1) · `entrance` cubic-bezier(0.16, 1, 0.3, 1) · `exit` cubic-bezier(0.4, 0, 1, 1) |
| Forbidden | Any easing with overshoot. No springs, no `back`, no `elastic`. |
| Breakpoints | 360 / 768 / 1024 / 1440, mobile-first |

---

## 4. Copy deck

Convention: `[PLACEHOLDER: …]` marks something I will not invent. `[FLAG]` marks a line that changed for honesty reasons — see §5.

### S1 · Sticky nav

| Element | Copy |
|---|---|
| Wordmark | `sahvo` (aria-label: "Sahvo — back to top") |
| Link 1 | The gap |
| Link 2 | What we're building |
| Link 3 | Who it's for |
| Link 4 | Roadmap |
| Primary CTA | Get early access |
| Mobile menu button | aria-label "Open menu" / "Close menu" |

Nav CTA never says "Download" or "Try it". There is nothing to download.

### S2 · Hero

| Element | Copy |
|---|---|
| Eyebrow badge | In development · Android pilot, Jaipur |
| **H1** | Know the fare. Know the guide. Know *where help is*. |
| Subhead | Sahvo is a mobile safety and price-transparency app for people travelling in India — foreign visitors, solo women travellers, and families. We're building it now, starting in Jaipur, in Hindi and English. |
| Input label | Email address |
| Input placeholder | you@example.com |
| Submit button | Join the early access list |
| Microcopy | Two emails, ever: one when the Jaipur pilot opens, one at full launch. Unsubscribe any time. |
| Success state | You're on the list. We'll write when there's something real to show you. |
| Error state | That doesn't look like an email address. Mind checking it? |
| Mockup alt text | Concept mockup of the Sahvo home screen. The app is in development and not yet available. |
| Hindi string inside mockup | आपकी यात्रा, आपके नियंत्रण में |
| English gloss (caption, `body-sm`, `--text-muted`) | "Your journey, in your control" — UI copy from the Hindi build. |

*Italic-serif accent: **where help is**.*

Alternates if you want a different angle:
- "The trip is the easy part. *Trust* is the hard part."
- "India, with the *guesswork* taken out."

I recommend the primary because it is three concrete promises rather than a mood, and each maps to a shipped-MVP feature, which makes it defensible under scrutiny.

### S3 · The trust gap

| Element | Copy |
|---|---|
| Overline | The problem |
| **H2** | India's constraint isn't its attractions. It's *trust*. |
| Body | India received 20.6 million international tourist arrivals in 2024 — a figure that includes visiting non-resident Indians; foreign nationals alone accounted for 9.95 million. **[FLAG]** The monuments, the food and the transport network are not what hold the experience back. What holds it back is not knowing: whether the fare is fair, whether the guide is licensed, whether anyone will come if something goes wrong. |
| Evidence card 1 | **Cheating ranks second among crimes reported against tourists.** Tour operators surveyed for a Ministry of Tourism–commissioned study reported theft (25%), cheating (16%) and sexual harassment (16%) as the most common. *Source: IITTM study for the Ministry of Tourism, reported by Deccan Herald. `[PLACEHOLDER: publication year]`* |
| Evidence card 2 | **Jaipur alone hosted 6.23 lakh foreign visitors in 2024.** Rajasthan received 20.7 lakh, up 21.9% year on year. *Source: Rajasthan Department of Tourism, reported February 2025. `[PLACEHOLDER: primary-source link]`* |
| Evidence card 3 | `[PLACEHOLDER: typical autorickshaw overcharge multiple vs. metered rate, Jaipur — no credible source found. Do not ship an invented number.]` |
| Evidence card 4 | `[PLACEHOLDER: count of licensed guides in Rajasthan vs. estimated guides operating — no credible source found.]` |
| Closer | None of this is an infrastructure problem. It's an information problem — and information problems are the kind software can actually fix. |

### S4 · Vision & mission

| Element | Copy |
|---|---|
| Overline | Why we're building it |
| **H2** | Travel in India shouldn't require knowing a local. |
| Vision body | Everyone who travels well here has one — someone who knows the fare, knows which guide is real, knows who to call. Sahvo is an attempt to give that to everyone else. |
| Mission statement (pull) | To build a trust layer over Indian travel: people you can verify, prices you can see before you commit, and a way to call for help that doesn't fall over when the network does. |
| Principle 1 | **Verified, not rated.** Ratings can be bought. Licences can be checked. Where a public register exists, we check against it — and where one doesn't, we say so rather than implying we did. |
| Principle 2 | **Priced before, not disputed after.** A number you saw before you got in the vehicle is worth more than a complaint form afterwards. |
| Principle 3 | **Built for the worst connection, not the best.** SOS falls back to SMS when data drops. It's the one feature that can never assume a good signal. |

### S5 · Five MVP features (interactive, one at a time)

| Element | Copy |
|---|---|
| Overline | MVP scope |
| **H2** | Five things, built properly, before anything else. |
| Intro | None of this has shipped. This is what we're building first, and what the Jaipur pilot will contain. |

| # | Tab label | Panel headline | Panel body | Honest caveat (`caption`, always visible — not a tooltip) |
|---|---|---|---|---|
| 1 | SOS | One press, even without data | Hold the SOS button and Sahvo sends your GPS location to the emergency contacts you've chosen — over data if it's there, over SMS if it isn't — and puts local emergency numbers one tap away. | Sahvo is not connected to any police or government emergency system. It sends your location to people you choose and helps you dial. **[FLAG]** |
| 2 | Verified guides | Guides you can check. Prices you can see. | Every listed guide will carry a licence number we've verified against the issuing register, with their rate published before you book — not negotiated at the gate. | Verification process is in design. The first cohort will be Jaipur-based. **[FLAG]** |
| 3 | Safety alerts | A quiet word before you walk in | Sahvo will flag areas where travellers most often report trouble as you approach them — on your lock screen, without announcing anything to anyone around you. | Alert zones will be built from published advisories and user reports. Coverage begins in Jaipur only. **[FLAG]** |
| 4 | Price transparency | Know the number before the argument | An auto fare calculator using published state rates, an MRP scanner for packaged goods, and hotel benchmarking so you know what a room in that area actually goes for. | Fare calculations follow published tariffs; they are a reference, not a regulated quote. **[FLAG]** |
| 5 | Languages | आपकी भाषा में · In your language | The pilot ships in Hindi and English. Eight Indian languages follow in the second phase. | `[PLACEHOLDER: which eight languages]` **[FLAG]** |

### S6 · Who it's for

| Element | Copy |
|---|---|
| Overline | Three travellers |
| **H2** | Three people. Three *different* fears. |

| Segment | Card headline | Job to be done (first person, verbatim on card) |
|---|---|---|
| Foreign tourists | Stop negotiating. Start travelling. | *When I don't know what anything costs here, help me pay the real price and spot the scam before it happens — so I can stop treating every transaction as a fight.* |
| Solo Indian women travellers | Discreet, not dramatic. | *When I'm travelling alone, help me share where I am and reach help quietly — without announcing to everyone around me that I feel unsafe.* |
| Indian families | One trip. No arguments about money. | *When I'm responsible for other people's day, help me plan in my own language at prices I can trust — so a good trip doesn't end in a row over a bill.* |

### S7 · Market opportunity (interactive data viz)

| Element | Copy |
|---|---|
| Overline | The opportunity |
| **H2** | The market is large. The gap is *specific*. |
| Intro | Every figure below is third-party and dated. Sahvo has no users and no operating history — nothing on this page is a Sahvo metric. |
| Toggle 1 | Inbound |
| Toggle 2 | Domestic |
| Toggle 3 | Pilot city |

| View | Stat | Value | Source |
|---|---|---|---|
| Inbound | International tourist arrivals, India, 2024 (incl. NRIs) | 20.6 M | Ministry of Tourism / UN Tourism, cited in Lok Sabha reply, 2025 |
| Inbound | Foreign tourist arrivals, India, 2024 (foreign nationals only) | 9.95 M | Ministry of Tourism, 2024 data |
| Inbound | Foreign exchange earnings from tourism, 2023 | US $28.08 bn | India Tourism Data Compendium 2024, Ministry of Tourism |
| Domestic | Domestic tourist visits, India, 2024 | 2.95 bn | Ministry of Tourism, cited in Lok Sabha reply, 2025 |
| Pilot city | Foreign tourists, Rajasthan, 2024 | 20.7 lakh (2.07 M) | Rajasthan Dept. of Tourism, reported Feb 2025 |
| Pilot city | Foreign tourists, Jaipur, 2024 | 6.23 lakh (623,000) | Rajasthan Dept. of Tourism, reported Feb 2025 |
| Context | India's rank, WEF Travel & Tourism Development Index 2024 | 39th of 119 | World Economic Forum, TTDI 2024 |
| — | Serviceable market sizing (₹ or $) | `[PLACEHOLDER — I will not model this without your assumptions]` | — |

| Footnote | Copy |
|---|---|
| Under the viz | "International tourist arrivals" includes non-resident Indians; "foreign tourist arrivals" does not. We show both because the difference is roughly 2× and the distinction matters to who we serve. |

### S8 · Roadmap

| Element | Copy |
|---|---|
| Overline | How we get there |
| **H2** | One city, done properly, then the next. |

| Stage | Label | Copy |
|---|---|---|
| Now | Pre-MVP | Designing and building. There is no app to download. |
| 1 | Jaipur pilot | Android. Hindi and English. All five features, one city. `[PLACEHOLDER: absolute dates — brief gives "Month 3–5" relative to an unstated start]` |
| 2 | iOS + languages | iOS build and eight-language support. |
| 3 | Ten cities | Expansion across India, one city at a time, guides verified before launch in each. |
| 4 | Southeast Asia | Same trust problem, different map. |

| Targets block | Copy |
|---|---|
| Heading | **Year 1 goals — not results.** |
| Body | These are what we're aiming at. None of them have been achieved, because the product doesn't exist yet. |
| Goal 1 | 50,000 monthly active users |
| Goal 2 | 2,000+ verified guides |
| Goal 3 | Median under 4 minutes from SOS trigger to an emergency contact acknowledging **[FLAG — reframed]** |
| Goal 4 | NPS 60 or above |

### S9 · Dual CTA

| Panel | Element | Copy |
|---|---|---|
| Left | Headline | Be there for the Jaipur pilot. |
| Left | Body | We'll open a limited Android pilot in Jaipur first. Early users shape what ships next. |
| Left | Input label / placeholder | Email address / you@example.com |
| Left | Button | Join the early access list |
| Left | Microcopy | Android and Jaipur to begin with. We'll be honest about the wait. |
| Right | Headline | We're looking for a technical co-founder. |
| Right | Body | Sahvo needs someone who wants to own the engineering: offline-first mobile, a verification pipeline that can't be gamed, and a safety feature that has to work on a bad network at the worst possible moment. Equity, not salary, at this stage. |
| Right | Button | Email the founder |
| Right | `mailto:` | `[PLACEHOLDER: address]` |
| Right | Microcopy | We reply to every message, including the ones where the answer is no. |

### S10 · Footer

| Element | Copy |
|---|---|
| Descriptor | Sahvo — a trust layer for travel in India. In development, Jaipur. |
| Column: Product | The gap · What we're building · Who it's for · Roadmap |
| Column: Company | About · Co-founder role · Contact |
| Column: Legal | Privacy · Terms |
| **Required disclosure** | Sahvo is a pre-launch product. It is not available for download, and it is not affiliated with or integrated into any police force or government emergency service. |
| Copyright | © 2026 `[PLACEHOLDER: registered entity name]` |

---

## 5. Claims audit

Every line that would have created legal, regulatory or reputational exposure, and what it became.

| # | Risk level | Original / natural phrasing | Problem | Shipped phrasing |
|---|---|---|---|---|
| 1 | **Critical** | "Sends your GPS to emergency contacts **and police**" | States an operational integration with a police force. No MoU exists. This is the single most dangerous sentence available to this product — it invites both regulatory attention and a wrongful-death theory if someone relies on it. | "Sends your location to the emergency contacts you've chosen, and puts local emergency numbers one tap away." Plus the explicit footer disclosure. |
| 2 | **Critical** | "Sub-4-minute SOS response" | Implies Sahvo controls emergency-services response time. It cannot. | "Median under 4 minutes from SOS trigger to an emergency contact acknowledging" — a metric Sahvo can actually own — and placed under a heading that says *goals, not results*. |
| 3 | **Critical** | "Offline-capable" | SMS still needs cellular signal. "Offline" implies function with no connectivity at all, which is false. | "Works over SMS when data is unavailable." |
| 4 | **High** | "19M+ international tourists annually" (from your brief) | Conflates two different Ministry of Tourism series. ITAs (20.6 M, 2024) include non-resident Indians. FTAs — actual foreign nationals, your first target segment — were 9.95 M. Using ~19–20 M to size the foreign-tourist segment overstates it by roughly 2×. An investor who knows the dataset will spot this immediately, and it is the kind of error that makes every other number in the deck suspect. | Both figures shown, labelled, with a footnote explaining the difference. |
| 5 | **High** | Testimonials | Your brief asks for Hindi strings in "mockups and testimonials". There are no users, so there can be no testimonials. Fabricated ones are straightforwardly deceptive and are the first thing a journalist checks. | **Section removed.** Hindi appears only as in-product UI strings in mockups. If you want social proof, the honest options are: (a) named advisors who consent, (b) a clearly-labelled "what we heard in Jaipur" block paraphrasing user-research conversations, (c) a live signup counter. I'd take (b). Needs your call. |
| 6 | **High** | "Verified guides" | Undefined verification is a liability if a listed guide harms someone. | Defined on the card: licence number checked against the issuing register. Caveat states the process is in design. |
| 7 | **Medium** | "Fixed, published pricing" | Sahvo cannot force compliance at the point of sale. | "Published before you book" + guide-agreement language. Avoid "fixed" as an unqualified promise. |
| 8 | **Medium** | "8-language support" | Not at MVP. Brief itself says Hindi + English at pilot. | "The pilot ships in Hindi and English. Eight languages follow." |
| 9 | **Medium** | Any "Download" / "Get the app" / store badges | Implies availability. | All CTAs are "early access" / "join the list". No store badges anywhere, including footer. |
| 10 | **Medium** | Geofenced alerts described as comprehensive | Implies coverage that won't exist. | "Coverage begins in Jaipur only", stated on the card. |
| 11 | **Low** | Fare calculator | Could read as an official or binding quote. | "A reference, not a regulated quote." |
| 12 | **Low** | 50K MAU / 2,000 guides / NPS 60 | Targets reading as achievements. | Under an explicit "Year 1 goals — not results" heading with a sentence saying none have been achieved. |

**Standing rule for later phases:** no number appears on the page without either a named source beside it or the word *goal* above it. If it has neither, it comes off.

---

## 6. Data register

| Figure | Value | Source | Confidence | Action |
|---|---|---|---|---|
| ITAs, India, 2024 | 20.6 M | Ministry of Tourism / UN Tourism, via Lok Sabha reply reported 2025 | Medium — secondary reporting | Verify against primary release before ship |
| FTAs, India, 2024 | 9.95 M | Ministry of Tourism | Medium | Verify against *India Tourism Statistics 2025* |
| FEE from tourism, 2023 | US $28.08 bn | India Tourism Data Compendium 2024 (Ministry of Tourism) | **High — primary** | Use as-is; note it is 2023, not 2024 |
| FTAs, India, 2023 | 9.52 M | India Tourism Data Compendium 2024 | **High — primary** | Use as-is |
| Domestic tourist visits, 2024 | 2.95 bn | Ministry of Tourism via Lok Sabha reply, 2025 | Medium | Verify |
| Foreign tourists, Rajasthan, 2024 | 20.7 lakh | Rajasthan Dept. of Tourism via press, Feb 2025 | Medium | Request primary figure from Rajasthan Tourism |
| Foreign tourists, Jaipur, 2024 | 6.23 lakh | Same | Medium | Same |
| Crime mix against tourists | theft 25% / cheating 16% / harassment 16% | IITTM study for Ministry of Tourism | **Low — year unknown** | Find the study and its year, or cut the stat |
| WEF TTDI rank 2024 | 39 of 119 | World Economic Forum | High | Use as-is |
| Autorickshaw overcharge multiple, Jaipur | — | **none found** | — | **You must supply or we cut the card** |
| Licensed vs. operating guides, Rajasthan | — | **none found** | — | **You must supply or we cut the card** |
| Emergency response time for tourists, India | — | **none found** | — | Do not put a number on the page. Ever. |
| Serviceable market size | — | not modelled | — | Needs your pricing and take-rate assumptions |

Rejected sources: Assocham's 2013 tour-operator survey on female-tourist cancellations (13 years stale, and framing India as dangerous for women is both inaccurate as current evidence and off-register for the brand). McAfee's 2025 travel-scam survey (measures *online booking* fraud, not on-ground overcharging — adjacent, not evidence).

---

## 7. Unresolved

1. **Logo, app icon and the three reference screenshots did not arrive.** Everything colour-dependent is architecture only.
2. **Testimonials vs. pre-MVP honesty** (audit item 5) — needs your decision on the substitute.
3. **Absolute dates.** Brief gives "Month 3–5" with no start month. Roadmap uses stage labels; if you want dates on the page, give me a start date.
4. **The eight languages** are unnamed.
5. **Founder email and registered entity name** are placeholders.
6. **Two evidence cards in §S3 have no sourceable number.** Per your data-integrity constraint I have left holes rather than filled them.
7. **Reference extraction is second-hand** — from your written descriptions, not the screenshots.
