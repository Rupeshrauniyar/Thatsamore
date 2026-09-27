# That's Amore — Premium React Experience

A premium React/Vite/Tailwind rebuild of the That's Amore Lindfield restaurant website, using the current public reference site as the content baseline and a new editorial hospitality design system.

## Stack

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- GSAP + ScrollTrigger
- Lucide React
- Google Fonts: Cormorant Garamond + DM Sans

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Routes

- `/`
- `/menu`
- `/story`
- `/gallery`
- `/contact`
- `/book`
- `/privacy`
- `/terms`
- `*` → 404

## Notes

- Booking remains external to OpenTable rather than faking a custom reservation backend.
- Published restaurant imagery is referenced through the source image CDN URLs; for a client launch, download/host licensed assets locally or through the client’s approved CMS/CDN.
- The current reference site’s published legal links do not expose enough verified copy in the accessible page content, so `/privacy` and `/terms` are intentionally marked placeholders for approved legal text.
