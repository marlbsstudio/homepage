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
| `public/portfolio.js` | Behaviour: horizontal journey reel (rail, travelling full stop, line reveals), menu, case list, toolbox, Let's talk form |
| `app/layout.tsx` | Fonts (Geist, Geist Mono, Antonio), page title, description, social preview |
| `public/mustafa-kapadiya.webp` | Portrait |
| `public/favicon.svg` | Browser tab icon |

Case studies, lead-journey moments and toolbox items are the `CASES`, `STAGES` and `TB` lists in `public/portfolio.js`.

## Deploy

Push to GitHub and import the repo in Vercel (or redeploy if it's already connected). No settings needed.

If you use a custom domain, add an environment variable `NEXT_PUBLIC_SITE_URL` with the full address (for example `https://marlbs.com`) so LinkedIn and WhatsApp previews use the right image link.

## Journey reel

The opening section is a horizontal reel driven by vertical scroll: one chapter per screen and one chapter per
scroll gesture (wheel, trackpad, swipe or arrow keys). The strip glides on a soft spring, the chapter you leave
turns to sand before the next slides in, a lens turns headings to outline under the cursor, and a slow
black-and-white star field drifts behind everything. The red rail at the bottom shows the journey and jumps to
a chapter on click.

- Chapters: inside `#htrack` in `app/portfolio-markup.ts` (each `.hpanel` is one screen; `data-label` names its rail stop).
- Styles: the "JOURNEY REEL" block near the end of `app/portfolio.css`.
- Behaviour: the "JOURNEY REEL" block in `public/portfolio.js`.
- Everything sits on one content column, max 1180px wide (`--gutter`); MARLBS in the hero and the footer share the same size.
- Reduced-motion users get the same chapters without the sand, streaks or lens.

## Colours and fonts

Background `--night` (#0C0C0B) and ink `--fg` (#E7E7E5). Motion and effects are black and white; the red
`--accent` (#FF3B1D) is kept for content markers and calls to action.
Geist and Geist Mono come from the `geist` package, so they ship with the site.
