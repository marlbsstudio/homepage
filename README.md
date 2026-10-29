# MARLBS — Mustafa Kapadiya portfolio

Articulation with logic. A Next.js site for Mustafa Kapadiya, Senior UI/UX Product Designer, Dubai.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Where things live

| File | What it holds |
| --- | --- |
| `app/portfolio-markup.ts` | All page content and structure (journey chapters, about, now, experience, contact, footer) |
| `app/portfolio.css` | All styles. Colours and fonts are the variables at the top |
| `public/portfolio.js` | Behaviour: particle journey, scroll-blended backgrounds, menu, case list, lead journey, toolbox, Let's talk form |
| `app/layout.tsx` | Fonts (Inter Tight, Geist Mono), page title, description, social preview |
| `public/mustafa-kapadiya.webp` | Portrait |
| `public/favicon.svg` | Browser tab icon |

Case studies, lead-journey moments and toolbox items are the `CASES`, `STAGES` and `TB` lists in `public/portfolio.js`.

## Deploy

Push to GitHub and import the repo in Vercel (or redeploy if it's already connected). No settings needed.

If you use a custom domain, add an environment variable `NEXT_PUBLIC_SITE_URL` with the full address (for example `https://marlbs.com`) so LinkedIn and WhatsApp previews use the right image link.

## Fonts

The design follows brand-nw.com, which uses Suisse Int'l (a paid font). Inter Tight is the free match. If you license Suisse Int'l, add its `@font-face` rules to `app/portfolio.css`; it is already first in the font list.
