# RZ Drywall — Visual Design Review

_Reviewed by a 5-agent team (one per page) against full-page desktop (1440px) and mobile (390px) Chrome screenshots, cross-referenced with the page source. Generated 2026-06-06._

## Executive summary

The RZ Drywall site already has strong bones: a confident dark-cinematic hero pattern, an oversized Switzer type system, a disciplined alternating light/dark section rhythm, and polished interaction details (masonry gallery, animated filter pill, lightbox, process numerals). On desktop it reads as a premium contractor site; on mobile it stacks safely but loses editorial intent. The three biggest levers separating it from "credible local brand" are **content authenticity** (real drywall photography instead of off-brand stock, a fixed `1,996+` stat, a real wordmark logo, and Lincoln-accurate copy), **brand color presence** (royal blue and the unused red barely register outside CTAs — heroes are dimmed to near-black and forms are greyscale), and **trust + conversion sharpening** (named/sourced testimonials, trust strips on Services/Gallery, and a single climactic CTA instead of duplicated button pairs). Fixing imagery, the stat, and the logo alone moves the site from "nice template" to "real business." Tightening color, hierarchy, and mobile rhythm makes it feel genuinely bold and premium.

## Cross-cutting themes

**Off-brand / dimmed imagery (Home, Services, Gallery, About).** Hero photos are dropped to opacity-25–30 under heavy triple gradients, reducing the site's best asset to flat charcoal panels (Services, About). Where photos do show, they're generic stock (purple house exterior, couple cooking) that never depicts drywall (Home gallery, Gallery grid). Fix per CLAUDE.md by swapping files in `/public/photos` (same names) and raising hero image opacity to ~40–50 with lighter overlay stops.

**Hover-only captions invisible on mobile/touch (Home, Gallery).** Gallery figcaptions are `opacity-0` until `group-hover`, so location/project storytelling — the local-credibility proof — never appears on touch devices and is missed by most desktop users. Render captions statically on mobile; keep hover as enhancement.

**Weak / missing trust signals (Home, Services, Gallery, About, Contact).** Testimonials are first-name-plus-initial with no source/avatar/date and identical 5-star ratings, reading as fabricated (Home, About). Services and Gallery carry zero proof (no ratings, "22 yrs", licensed/insured, review count) despite `lib/site.ts` stats/testimonials being available. Add slim trust strips and Google/source badges.

**Brand color barely registers; red entirely absent (Services, Contact, plus accents elsewhere).** For a "royal blue + vivid red" brand, blue appears only in small spans/chips/CTAs and `#ed1c24` red is essentially unused. Forms are greyscale (Contact); Services is overwhelmingly charcoal/white. Introduce blue in eyebrows/dividers/accents and one restrained red flourish.

**Duplicated / soft closing CTAs (Home, Services, About, Contact).** The global "Ready for walls done right?" footer band repeats the hero's exact "Get a Free Estimate" + "Call" pair, often stacked directly above a second near-identical CTA (Services). The close reads as a footer afterthought rather than a crescendo. Make one band the boldest CTA (stronger brand fill, guarantee microcopy) and differentiate or remove duplicates.

**Consecutive dark blocks break the light/dark rhythm (Home, Gallery, Contact).** Hero→StatsBar are both `ink-950` (Home); CTA card + footer + hero are three dark blocks in a row (Gallery, Contact). Add hairlines/shade shifts or brand-tint the CTA so sections stay distinct.

**Low-contrast secondary text on dark (Home, Services, Gallery, About, Contact).** Recurring `text-ink-300` / `white/60` leads and eyebrows on `ink-950` fall near or below WCAG AA. Bump hero leads to `text-white/80–85` / `text-ink-200` and value-prop body to `text-white/70`; verify ≥4.5:1.

**Low-emphasis outline "Call" button on dark (Home, Services, Gallery, About, Contact).** The secondary phone CTA uses `border-white/20–25` and nearly disappears — yet phone is a contractor's top conversion path. Strengthen to `border-white/40`, add a phone glyph, add a faint `white/5` fill.

**Monotonous mobile scroll (Services, Gallery, About, Contact).** Long single columns of near-identical full-width cards/photos/contact rows lose hierarchy and rhythm. Introduce mobile variety (collapsed detail lists, 2-col mosaics, taller lead tiles, sticky "Free Estimate" CTA, hoisted tappable phone block).

**Repetitive eyebrow+heading treatment & uniform motion (Home, About).** Every section uses the same Subheading+Heading+Lead at the same scale and one identical 24px fadeUp, so no section reads as a peak. Vary scale on stats/CTA and reserve distinct entrances for key moments.

**Inert chip grids (Home service areas, Services specialties, About areas, Contact areas).** Plain gray/ghost pill grids read as disabled filler. Tint the home-base "Lincoln" chip in brand, raise contrast, and consider a Lancaster County map graphic.

## Top 12 highest-impact changes

1. **Fix the `1,996+` "Projects completed" counter to settle on 2,000+.** A hero KPI that under-shoots its own number instantly undermines credibility; trivial effort, high trust payoff. → `app/home-client.tsx` StatsBar (~L180) / `components/animated-number.jsx`.
2. **Swap in real drywall photography across `/public/photos` (keep filenames).** The portfolio is the #1 proof surface and currently shows stock that never depicts drywall; one asset swap fixes Home, Gallery, Services, and About at once. → `/public/photos`, `lib/images.ts`.
3. **Replace the boxy placeholder logo with a clean transparent wordmark (white + color variants).** The current low-res blue rectangle clashes with the rounded premium aesthetic everywhere it appears. → `public/logo.png`, `components/logo.jsx`, `components/navbar.jsx`.
4. **Un-dim the hero photos (opacity ~40–50, lighter gradient stops).** Services and About heroes currently read as flat black panels, throwing away the craftsmanship the pages are selling. → `app/services/services-client.tsx` (L49-58), `app/about/about-client.tsx` (L79-88).
5. **Fill the awkward empty 4th cell in the Home services grid.** A 7-card grid leaves a conspicuous hole; add an 8th card or a "See all services →" CTA tile. → `app/home-client.tsx` Services (~L317).
6. **Render gallery captions statically on mobile (and on the lead tile).** Hover-only captions hide all local project storytelling on touch — the page's credibility proof. → `app/home-client.tsx` GalleryPreview (~L512), `app/gallery/gallery-client.tsx` overlay (L127-140).
7. **Add trust strips to Services and Gallery (stars, review count, "22 yrs", licensed/insured, service area).** Conversion surfaces with zero proof; a near-one-line pull from `lib/site.ts` stats/testimonials. → Services CtaBand/hero, Gallery hero/grid region.
8. **Make testimonials verifiable: source badge, real first+last, project tag.** Identical 5-star, initials-only quotes read as fabricated and weaken trust. → `app/home-client.tsx` & `app/about/about-client.tsx` testimonials, `lib/site.ts`.
9. **Strengthen the secondary "Call" button site-wide.** `border-white/40` + phone glyph + faint fill makes the top contractor conversion path legible on every dark hero/CTA. → Home, Services, Gallery, About, Contact button instances.
10. **Promote the About tagline to H1 in white; demote "About RZ Drywall" to eyebrow.** The page spends its best real estate on a navigational label while the brand voice recedes in low-contrast blue. → `app/about/about-client.tsx` (L92-98, L96).
11. **Fix Lincoln-inaccurate copy ("foothills") and flag the 916 area code to the owner.** "Foothills" on flat prairie + a Sacramento area code signal an out-of-area vendor to local leads. → `lib/site.ts` / `app/about/about-client.tsx` (L366-369); `company.phone`.
12. **Make the closing CTA a real crescendo and kill duplicates.** Brand-filled band, guarantee microcopy ("Same-week estimates · No surprise pricing"), and remove the back-to-back CTA on Services. → global CTA band; `app/services/services-client.tsx` CtaBand (L426-470).

## Per-page findings

### Home (`/`)
*Standout: excellent layered-gradient hero with the blue "Honest work." accent, a confident consistent type system, and disciplined alternating section rhythm.*

| Severity | Viewport | Issue | Fix | Location |
|---|---|---|---|---|
| High | both | Stats animate to `1,996+` not 2,000+ | Snap AnimatedNumber to final integer; format `2,000+`; respect reduced-motion | `app/home-client.tsx` StatsBar ~L180 / `components/animated-number.jsx` |
| High | both | Boxy placeholder logo clashes with premium aesthetic | New transparent wordmark, white + color variants | `public/logo.png`, `components/logo.jsx`, `components/navbar.jsx` |
| High | both | Gallery is off-brand stock (purple exterior, couple cooking) — no drywall | Swap `/public/photos` with real hung/taped/Level-5/before-after work | `lib/images.ts` gallery, `/public/photos` |
| High | desktop | 7-card services grid leaves empty top-right cell | Add 8th card or "See all services →" tile, or go 3-up | `app/home-client.tsx` Services ~L317 |
| Medium | mobile | Gallery collapses to flat uniform single-column stack | Taller lead tile, 2-col sub-grid pairs, lead caption | GalleryPreview grid ~L491 |
| Medium | both | Captions hover-only — invisible on touch/most users | Persistent caption on lead tile; static on mobile | GalleryPreview figcaption ~L512 |
| Medium | both | Testimonials templated (initials-only, no source/photo) | Google/Yelp badge, real names, project tag | Testimonials, `lib/site.ts` |
| Medium | both | Pathway eyebrows/sub-text land on light image areas | Strengthen `from-ink-950` gradient (`via-ink-950/60`) | Pathway gradient ~L228 |
| Medium | both | 916 area code + `RZdrywall916@` on a Lincoln site | Flag owner; prefer local 402 number | `lib/site.ts` company.phone |
| Medium | both | WhyRZ body `white/60` borderline on `ink-950` | Bump to `text-white/70`; check StatsBar labels at `white/50` | WhyRZ ~L395, StatsBar labels ~L185 |
| Low | both | Hero + StatsBar both `ink-950`, boundary blurs | Add hairline `border-white/10` or `ink-900` shade above stats | StatsBar ~L164 |
| Low | desktop | ServiceAreas chips inert, ragged whitespace | Map graphic or tint "Lincoln" chip brand | ServiceAreas ~L601 |
| Low | both | Alts describe stock placeholders | Specific work/location alts when swapping photos | `lib/images.ts` alt fields |
| Low | both | Final CTA repeats hero CTAs softly | Bolder brand button + guarantee microcopy + contrast | final CTA band |
| Polish | both | Process→Testimonials light run loses contrast energy | Give Testimonials a dark/brand-tinted beat | Testimonials ~L529 |
| Polish | desktop | TiltCard 3D tilt may feel toy-like | Calmer lift (translate-y + shadow); ensure reduced-motion off | ServiceCard / `components/tilt-card.tsx` |

### Services (`/services`)
*Standout: confident editorial headlines ("For the home you live in"), clean alternating rhythm, the floating "Texture — Matched, not guessed" tag, and a numbered process timeline.*

| Severity | Viewport | Issue | Fix | Location |
|---|---|---|---|---|
| High | both | Hero photo dimmed to a flat black band (`opacity-25` + triple gradient) | Raise to opacity-40/50, lighten overlay, text-side scrim only | Hero L49-58 |
| High | both | Brand blue barely appears; red entirely absent | Blue in eyebrows/dividers; one restrained red flourish; bigger "done right." | `styles/tailwind.css`; Hero L73-76 |
| High | mobile | Long uniform stack of ~17 similar cards | Collapse detail lists behind blurb; sticky "Free Estimate" CTA | grids L246-250, L320-324 |
| High | both | No trust signals on a conversion page | Slim trust strip (stars, 22 yrs, licensed/insured, area) from `site.ts` | page composition |
| Medium | both | Residential vs commercial cards visually identical | Per-service icon/photo strip or featured first card | ServiceCard L114-188 |
| Medium | both | `01–04` index numbers imply false ranking, low contrast | Drop on service cards; reserve for Process | ServiceCard span L142-151 |
| Medium | both | Hero lead/eyebrow low-contrast gray on dimmed photo | Bump lead to near-white; bold the price promise | Lead L78-85, Subheading L70 |
| Medium | both | Specialties chips look like dead buttons (repeated sparkle icon) | Distinct/no icons, hover lift, tighter 2-row, faint blue tint | Specialties L351-366 |
| Medium | both | Dark commercial check chips low contrast | `text-brand` on `bg-brand/20` for dark cards | check chip L171-173 |
| Medium | both | Two near-identical "Free Estimate" CTAs stacked at bottom | Differentiate in-page band (add trust line); lighten footer or remove one | CtaBand L426-470 + footer |
| Low | both | Section eyebrows tiny, easy to miss | Colored rule/dot before eyebrow; bump to `text-sm` brand | `components/text.tsx` Subheading L40 |
| Low | desktop | Commercial 3-up vs residential 2-up feels unbalanced | One card proportion, or intentional "compact" variant | grids L246 vs L320 |
| Low | desktop | Floating image tags may crowd at 1024–1280px | Verify spacing; anchor inside image or add bottom margin | L236-241, L282-292 |
| Low | desktop | Lead lines run 80+ chars | Cap `max-w-prose`/~65ch | Leads L79, L208, L303, L344, L402 |
| Low | desktop | Process section sparse, large empty left column | Add visual/stat to sticky column or tighten to `cols-10` | Process L391-419 |
| Low | both | Outline "Call" button low-contrast on dark | `border-white/40` + `white/5` fill + phone glyph | Hero secondary Button L96-102 |

### Gallery (`/gallery`)
*Standout: premium masonry with rounded-2xl cards + ring/shadow, tasteful hover overlay, spring `layoutId` filter pill, and a well-built lightbox (counter, keyboard nav, backdrop blur).*

| Severity | Viewport | Issue | Fix | Location |
|---|---|---|---|---|
| High | both | Tall empty hero — most visual page opens with least content | Compress (`pt-28 pb-16`) or add stat chips / thumbnail teaser strip from `site.ts` | hero L43-65 |
| High | both | Filter tabs visually weak, no container — read as inline links | Wrap in segmented control (`bg-ink-100 ring-1`); add per-filter counts | filter tabs L71-95 |
| High | both | No trust signals in grid region | Slim trust bar: rating, AnimatedNumber project count, area pills | between sections L65-68 |
| High | mobile | Captions hover-only — grid is unlabeled rooms on touch | Persistent caption/chip or render below image `<sm` via media query | hover overlay L127-140 |
| Medium | both | Hero lead `text-ink-300` near-invisible on `ink-950` | Bump to `text-ink-200`/`white/80`, verify ≥4.5:1 | L59 |
| Medium | both | Masonry monotone — all pale interiors blend | Intersperse darker jobsite/commercial shots; curate `gallery[]` order | `lib/images.ts` L25-38 |
| Medium | mobile | `columns-1` = endless similar scroll | `columns-2` on mobile + reduced gap, or persistent captions | grid L100 |
| Medium | both | CTA card + footer both dark, boundary lost | Brand-tinted CTA gradient/accent or white CTA section bg | CTA section L150-190 |
| Medium | both | Secondary "Call" button low-emphasis ghost | `border-white/40`, phone icon, brighter label | L179-185 |
| Low | desktop | Hero H1 vs CTA H2 use `!` size overrides | Intentional `size` prop on Heading instead of `!` | L165 |
| Low | both | No section heading/count above grid | "Selected projects — showing 12 of 12" subheading | top of grid L69-71 |
| Low | desktop | Lightbox clickability only on hover | Subtle persistent corner glyph / `cursor-zoom-in` | corner indicator L137-140 |
| Low | both | Generic filename-derived alts | Align alts with captions (city + work type) | `lib/images.ts` L26-37 |
| Low | both | Empty-filter state unhandled | Graceful empty state when `visible.length === 0` | grid render L98-145 |
| Polish | desktop | `gap-5` channels feel sparse | `gap-4`/`mb-4` at lg to tighten mosaic | grid L100 |

### About (`/about`)
*Standout: smart Homeowners (light) vs Businesses (dark inverted) split, a strong animated stats band with brand suffixes, and the offset "Est. 2002" floating badge.*

| Severity | Viewport | Issue | Fix | Location |
|---|---|---|---|---|
| High | both | H1 "About RZ Drywall" is a label; tagline buried below | Demote title to eyebrow; promote tagline to H1 `text-4xl sm:text-6xl` | hero L92-98 |
| High | both | Tagline `text-brand-light` recedes on `ink-950` | Use white; reserve brand-light for one accent word | L96 |
| High | desktop | "Est. 2002" badge: dark text on blue fill (breaks brand rule) | `text-white` + `text-white/80` subline | L167-173 |
| High | both | "Foothills" copy wrong for flat Lincoln | "…surrounding Lancaster County towns out toward Omaha" | L366-369 / `lib/site.ts` |
| Medium | both | "12 Cities served" mixes round number with literal 12-item list | Round to "15+/20+ communities" or relabel "Communities served" | `lib/site.ts` L199 |
| Medium | both | Three story paragraphs = dense gray wall, no anchor | Pull-quote one line; add "Reza, Founder" attribution | L129-150 |
| Medium | both | Body/card copy leans on small `text-sm` gray | Bump to `text-[15px]`/base, darken to `ink-700` | L244, L283, L311, L386 |
| Medium | both | Hero CTAs small (`text-sm`); outline "Call" disappears | Primary `text-base font-semibold px-8 py-3.5`; brighter outline border | L101-115 |
| Medium | both | Eyebrow+heading repeats 7x, alignment toggles without logic | Vary scale on stats/CTA; standardize alignment; add accent rule | L184, L222, L255, L324, L361 |
| Low | mobile | Value cards crowd at `sm` 2-col | Single-column compact icon+title on phones; reduce padding | L232-245 |
| Low | both | Hero photo `opacity-30` reads as muddy texture | Raise opacity, lighten bottom gradient stop | L79-88 |
| Low | both | Testimonials flat, no avatar/source | Monogram avatar or "via Google" chip; one featured card | L330-352 |
| Low | both | 12 inert pin chips = low-info block | Pair with map graphic; group "Lincoln metro" vs "Out to Omaha" | L359-396 |
| Low | both | CTA "Ready for walls done right?" undersized | `text-4xl sm:text-5xl`, stronger glow, brand-filled card | L401-433 |
| Polish | both | All reveals share one fadeUp | Distinct entrances for stats/CTA; verify no pre-visible pop-in | L29-34 |
| Polish | both | Thin outline heroicons read as generic SaaS | Heavier/solid set or a trade mark (trowel/level) | L36-57 |

### Contact (`/contact`)
*Standout: proven two-column form + dark contact panel, strong trust copy ("the price we quote is the price you pay," Licensed & Insured), and solid form UX (required asterisks, inline validation, honeypot, loading/success states).*

| Severity | Viewport | Issue | Fix | Location |
|---|---|---|---|---|
| High | both | Hero subhead `text-ink-300` faint on `ink-950` | Bump to `text-ink-200`/`white/85`, verify 4.5:1 | hero Lead L173 |
| High | both | Hero text-only, flat, dead dark space at right | Add project photo / plus-grid / brand gradient with scrim | hero L151-192 |
| High | both | Dark panel info-dense, weak hierarchy; phone doesn't stand out | Elevate phone to tappable blue block / `text-xl`; de-emphasize credentials | aside dl L485-519 |
| High | mobile | Panel = long cramped grey scroll, phone not prominent | Hoist large tappable "Call …" button to top; tighten/brighten rows | aside (mobile) |
| Medium | both | Form is monochrome grey, no brand presence | Brand heading rule/icon; faint brand-tinted card top border | form card L206-248 |
| Medium | desktop | Submit `sm:w-auto` — small left-aligned CTA | Keep full-width or heavier (larger py, shadow, hover accent) | submit L435-438 |
| Medium | both | Service-area chips read as disabled ghosts | `text-ink-100`, `border-white/20`; tint "Lincoln" chip brand | chips L528-537 |
| Medium | both | Panel + closing CTA + footer = three dark blocks | Brand/gradient bg on closing CTA for separation | closing CTA + footer |
| Low | both | Hero chips duplicate panel credentials/region | Pick one home per fact; drop redundant panel copy | hero L180-189 vs panel L516-526 |
| Low | both | Native `<select>` placeholders look pre-filled | `text-ink-400` when value==='' | selects L351-396 |
| Low | desktop | Bottom-heavy form rhythm | `rows={4}` textarea; more space above submit | L240, L404-413 |
| Low | mobile | Email `break-all` splits mid-word | `break-words` or smaller email font on mobile | email link L505 |
| Low | both | Hero eyebrow "Free estimate" tiny | Brand-light, larger tracking, leading accent rule | Subheading L167-169 |
| Low | both | No map / sense of place for a local trade | Lightweight static map / service-radius graphic | panel / new section |
| Low | both | Closing CTA buttons limited contrast hierarchy | Solid brand primary; secondary `border-white/30+` + phone icon | closing CTA band |

## Quick wins
*Each <30 min — knock these out first.*

- **Fix the `1,996+` counter** to snap to 2,000+. → `components/animated-number.jsx` / StatsBar.
- **Replace "and foothills"** with Lancaster-County-accurate copy. → `lib/site.ts` / About L366-369.
- **Fix the "Est. 2002" badge** to white text on blue. → About L167-173.
- **Bump low-contrast leads/eyebrows** to `text-ink-200`/`white/80` on dark heroes (Contact L173, Gallery L59, Services L78-85, Home WhyRZ ~L395).
- **Strengthen every secondary "Call" button** (`border-white/40` + phone glyph + faint fill). → Home, Services, Gallery, About, Contact.
- **Promote the About tagline / demote "About RZ Drywall"** to eyebrow. → About L92-98.
- **Tint the home-base "Lincoln" chip brand** across service-area lists. → Home L601, About L359-396, Contact L528-537.
- **Add a hairline/shade divider** between Home hero and StatsBar. → Home L164.
- **Fix email `break-all` → `break-words`.** → Contact L505.
- **Style empty `<select>` options** as placeholder gray. → Contact L351-396.
- **Add a result-count subheading** above the gallery grid. → Gallery L69-71.
- **Drop the duplicated hero/panel credential copy** on Contact. → Contact L180-189 vs L516-526.