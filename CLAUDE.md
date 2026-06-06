# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

Marketing website for **RZ Drywall LLC** — a residential & commercial drywall contractor based in **Lincoln, Nebraska** (serving the Lincoln metro, Lancaster County, and out to Omaha). Built with Next.js 15 (App Router), React 19, Tailwind CSS v4, and TypeScript. Goal: a modern, bold, high-converting site that wins both homeowner and commercial work.

## Commands

```bash
make dev        # Dev server at http://localhost:3002 (Turbopack)  ← preferred
make build      # Production build
make start      # Serve the production build
make lint       # ESLint
make format     # Prettier
# (or use npm run dev / build / start / lint / format directly)
```

## Architecture

**Routing:** App Router. Pages: `/` (home), `/services`, `/gallery`, `/about`, `/contact`. Each route is a server-component `page.tsx` (exports `metadata`) that renders a `'use client'` component (e.g. `app/services/page.tsx` → `services-client.tsx`). Page-specific helpers are colocated inside the client file or under `app/<route>/_components/`.

**Content is centralized — edit copy here, not in pages:**
- `lib/site.ts` — company info (name, phone, email, hours, region), nav, `residentialServices`, `commercialServices`, `specialties`, `process`, `testimonials`, `stats`, `serviceAreas`. **All contact details and service areas flow from here.**
- `lib/images.ts` — image manifest. Photos live in `/public/photos` (currently royalty-free stock placeholders). **Swap the files in `/public/photos` keeping the same names** to drop in real RZ project photos with zero code changes.

**Contact form:** `app/contact/contact-client.tsx` POSTs to `app/api/contact/route.ts`, which emails the lead via Resend. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (see `.env.example`). **Without a key it still returns success and logs the lead** — the form works unconfigured.

**Shared components** (`components/`): `navbar` (scroll-aware: transparent/white text over dark heroes, solid white when scrolled), `footer`, `logo` (renders `/public/logo.png`), `button`, `container`, `link`, `text` (Heading/Subheading/Lead), plus animation primitives (`tilt-card`, `bento-card`, `animated-number`, `plus-grid`, `cursor-gradient`, `shooting-stars`, `gradient`, `alternating-feature`).

## Brand / design system

Theme is derived from the logo (`/public/logo.png`): **royal blue + vivid red on white/charcoal.** Tailwind v4 tokens in `styles/tailwind.css`:
- Neutrals: `ink-50` … `ink-950` (charcoal scale).
- Primary: `brand` (#1f59f6), `brand-light`, `brand-dark`, `brand-darker`. Use for CTAs, links, primary accents. **Solid blue backgrounds use white text.**
- Accent: `accent` (#ed1c24 red), `accent-light`, `accent-dark`. Used sparingly — star ratings, nav hover underline, small flourishes.
- Font: Switzer (loaded from Fontshare in `app/layout.tsx`).
- Pattern: alternate light (`white`/`ink-50`) and dark (`bg-ink-950`) sections; rounded-2xl/3xl cards; framer-motion `whileInView` reveals with `viewport={{ once: true }}`.

Icons/favicon: `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` are generated from the logo.

## SEO

`GeneralContractor` JSON-LD in `app/layout.tsx` (Lincoln, NE; `areaServed` from `serviceAreas`). Per-page `metadata`. `app/sitemap.ts` and `app/robots.ts` exist — update sitemap entries when adding routes.

## Conventions

- Node 22; package manager: npm (`package-lock.json` committed).
- Path alias `@/*` → repo root.
- Keep TypeScript clean (typed props, no `any`, no unused imports); `next build` type-checks.
- Note: `company.phone` is `(916) 267-7388` (carried over from the owner's existing number — a Sacramento area code despite the Lincoln, NE location). Confirm with the owner before changing.
