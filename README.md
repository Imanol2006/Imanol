# Imanol Portfolio

A cinematic one-page portfolio for Imanol Galvan, built with Next.js App Router, Tailwind CSS, and GSAP ScrollTrigger.

## Stack

- Next.js 14
- React 18
- Tailwind CSS 3
- GSAP + ScrollTrigger
- Lucide React
- Framer Motion (kept available for future microinteractions)

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Replace placeholder content

Update these values first:

- `data/portfolio.ts`: name, email, social links, hero copy, project details, journey milestones, capability labels, philosophy lines
- `app/layout.tsx`: metadata title and description
- `components/portfolio/PortfolioExperience.tsx`: if you want to swap premium placeholder mockups for real screenshots or video assets

## Motion notes

- Major section storytelling uses GSAP ScrollTrigger.
- The identity and vision sections pin on desktop and fall back to standard reveals on smaller screens.
- Reduced-motion users get static content without heavy scroll effects.

## Suggested next content upgrades

- Replace project placeholder visuals with real product images, short looping videos, or rendered device mockups.
- Swap `Your Name` and `YN` for your actual personal brand.
- Add real links for GitHub, LinkedIn, email, and any resume or calendar CTA.
- Refine project outcomes with metrics, launch dates, collaborators, or case-study links.

