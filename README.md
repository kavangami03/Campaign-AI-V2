# CampaignX 2.0

A complete visual rebuild of the CampaignX landing page.
Light theme, premium glassmorphism, cinematic product video, editorial type.

## Stack

| Concern        | Choice                                            |
| -------------- | ------------------------------------------------- |
| Framework      | Next.js 16 (App Router, RSC by default, Turbopack) |
| Language       | TypeScript, `strict` + `noUnusedLocals`            |
| Styling        | Tailwind CSS v4 + CSS custom-property tokens       |
| Motion         | GSAP + ScrollTrigger                               |
| Smooth scroll  | Lenis (single instance, driven by the GSAP ticker) |
| Icons          | lucide-react                                       |
| Fonts          | Inter + Inter Tight, **self-hosted** variable woff2 |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint (flat config)
npm run typecheck
```

## Architecture

```
src/
├── app/              layout, page, globals.css, icon.svg, opengraph-image.tsx, fonts/
├── components/
│   ├── layout/       Header, Footer, Container, Section
│   ├── navigation/   DesktopNav, MobileNav, MobileMenu
│   ├── hero/         Hero, HeroContent, HeroVideo, HeroGlow
│   ├── sections/     13 page sections
│   ├── ui/           GlassCard, Button, MagneticButton, Badge, SectionHeading, AnimatedText, Logo, Icon
│   └── motion/       SmoothScroll, Reveal, FadeIn, Parallax
├── config/           site.ts, navigation.ts, content.ts   ← all copy lives here
├── hooks/            useMediaQuery, useIsMobile, useLenis
├── lib/animations/   gsap.ts, hero.ts, scroll.ts, reveal.ts
├── styles/           tokens.css, animations.css
└── types/            common, content, navigation, motion
```

`app/page.tsx` only composes sections. No section is longer than it needs to be.

### Server vs client

Everything is a Server Component unless it needs the browser.
Client components: `Header`, `MobileNav`, `MobileMenu`, `Hero`, `HeroVideo`,
`Analytics` (chart animation), `Pricing` (billing toggle), `FAQ` (accordion),
and the four `motion/` wrappers. That's the whole list.

### Design tokens

`src/styles/tokens.css` is the single source of truth — colours, radii, glass
values, shadows, layout rails, easings. `globals.css` bridges those tokens into
Tailwind's theme so utilities like `bg-surface`, `text-muted`, `rounded-panel`
and `shadow-float` resolve to the same variables.

One accent only: `--accent: #2f5bff`.

### Glass system

Three intensities, defined once as Tailwind utilities in `globals.css`:
`glass-quiet` (repeatable across grids), `glass` (feature surfaces),
`glass-strong` (nav, controls). `glass-sheen` adds the hairline gradient edge.
Blur is applied where it earns its place, not everywhere.

### Motion

- All GSAP lives in `lib/animations/`. Components supply elements, not tweens.
- Every animation runs inside `gsap.context()` and is reverted on unmount.
- `prefers-reduced-motion` is honoured at three levels: GSAP guards, the Lenis
  instance is never created, and a CSS block neutralises transitions.
- Pre-reveal states are CSS, gated behind a `js-motion` class set before paint,
  so nothing flashes and no-JS visitors see full content.

### The hero video

`public/videos/campaignx-hero.mp4` — the two source clips concatenated into a
single 20s, 1280×720, silent, `+faststart` H.264 file (~2.8 MB), with
`campaignx-hero-poster.webp` as the poster.

To regenerate after replacing the source clips:

```bash
printf "file '1.mp4'\nfile '2.mp4'\n" > list.txt
ffmpeg -f concat -safe 0 -i list.txt -an -c:v libx264 -preset slow -crf 24 \
  -pix_fmt yuv420p -movflags +faststart public/videos/campaignx-hero.mp4
ffmpeg -i public/videos/campaignx-hero.mp4 -vframes 1 -c:v libwebp -quality 82 \
  public/videos/campaignx-hero-poster.webp
```

`HeroVideo.tsx` owns autoplay policy, the mobile preload budget (`none` on
small screens), the poster underlay, and the reduced-motion play control.

### Accessibility

Semantic landmarks, one `h1`, no skipped heading levels, skip-to-content link,
`aria-expanded`/`aria-controls` on the FAQ and mobile menu, Escape-to-close and
scroll lock on the menu, visible focus rings, decorative SVG hidden from AT.

### Content

All copy is in `src/config/content.ts`, typed against `src/types/content.ts`.
Nothing is hardcoded in a component; swapping in a CMS means replacing that one
module. No lorem ipsum, no invented testimonials, no borrowed customer logos.
