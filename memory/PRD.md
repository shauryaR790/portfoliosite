# Michael Smith — Dark Portfolio Landing

## Original Problem
Recreate a single-page dark portfolio landing page using React + Tailwind + GSAP + Framer Motion + hls.js, faithful to the spec (loading screen, HLS hero video, fixed pill navbar, bento Selected Works, Journal pills, GSAP-pinned parallax Explorations with lightbox, Stats, marquee Footer with flipped HLS).

## Stack (User-confirmed)
- Frontend: CRA + JavaScript + Tailwind + GSAP + Framer Motion + hls.js
- Backend: Not used (frontend-only)

## Architecture
- `/app/frontend/src/pages/Index.jsx` — composes all sections; gates render on LoadingScreen state
- `/app/frontend/src/components/portfolio/`
  - `LoadingScreen.jsx` — rAF counter 0→100 over 2700ms, rotating words, progress bar
  - `Navbar.jsx` — fixed pill, smooth-scroll, IntersectionObserver active state
  - `Hero.jsx` — HLS video bg, GSAP entrance timeline, role rotation
  - `Works.jsx` — 4-card bento grid (7/5/5/7) with halftone hover overlays
  - `Journal.jsx` — 4 horizontal pill entries
  - `Explorations.jsx` — GSAP ScrollTrigger pin + parallax columns + lightbox
  - `Stats.jsx` — 3-col metrics
  - `Footer.jsx` — flipped HLS bg, GSAP marquee xPercent:-50, mailto, socials
- `/app/frontend/src/index.css` — design tokens (--bg, --surface, --text, --muted, --stroke), keyframes (scroll-down, role-fade-in, gradient-shift)
- `/app/frontend/tailwind.config.js` — custom palette + Inter / Instrument Serif font families

## What's Implemented (Dec 2025)
- Loading screen with counter 000→100 + rotating Design/Create/Inspire
- Hero with Mux HLS video background, GSAP name reveal + blur-in entrance
- Sticky pill navbar with smooth scroll + active link tracking; "Say hi" with animated gradient border
- 4 project bento cards with Unsplash imagery + halftone overlay + hover reveal pill
- Journal section (4 pill entries with read time/date)
- Explorations: 300vh GSAP-pinned center with 2 parallax columns (6 images) + click-to-lightbox
- Stats: 20+ / 95+ / 200% with framer-motion fade-in
- Footer: flipped HLS video, GSAP marquee, mailto, 4 socials, "Available for projects" pulse

## Test Coverage (iteration_1.json)
100% frontend pass — 13/13 acceptance criteria. Only fix needed: navbar logo "JA" → "MS" (applied).

## Backlog
- P2: Extract `useHlsVideo(src)` hook to DRY Hero/Footer video logic
- P2: Add `journal` + `contact` to Navbar IntersectionObserver if links expand
- P2: Reduced-motion fallbacks for GSAP animations
- P2: Mobile fine-tuning of Explorations parallax (currently desktop-optimized)

## Next Tasks
- Optional content pass with real copy/links
- Optional: hook up a real contact form with backend
