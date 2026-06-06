# RZ Drywall LLC — Website

Marketing site for RZ Drywall LLC, a residential & commercial drywall contractor in **Lincoln, Nebraska**.

Built with **Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · TypeScript**.

## Quick start

```bash
make install   # install dependencies
make dev       # http://localhost:3002
```

`make help` lists all tasks (`dev`, `build`, `start`, `lint`, `format`, `clean`).

## Editing content

- **Text & business info:** `lib/site.ts` (phone, email, services, service areas, testimonials, stats).
- **Photos:** drop your images into `public/photos/` using the existing filenames (see `lib/images.ts`). The current photos are royalty-free placeholders.
- **Logo / colors:** the brand (blue + red) comes from `public/logo.png`; theme tokens are in `styles/tailwind.css`.

## Contact form (email)

The contact form sends leads via [Resend](https://resend.com). Copy `.env.example` to `.env` and set:

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=RZdrywall916@gmail.com
```

Without a key the form still works (it logs the lead and returns success).

## Pages

`/` · `/services` · `/gallery` · `/about` · `/contact`
