# Ductos Peralta — Landing (draft)

## Objective
Draft landing page for Ductos Peralta (@ductos_peralta) inspired by the layout language of santa-ana-78.vercel.app, with a scroll-driven Three.js story about their service.

## Context
- Business (from Instagram bio): projects and installation of duct systems for air conditioning. Posts also show galvanized sheet fabrication in their own workshop, kitchen extraction hoods, roof chimneys/caps, axial and centrifugal fans, grilles/diffusers.
- Contact: 0422-886.22.50 · 0424-280.31.12 · ductosperalta@gmail.com · @ductos_peralta
- Location: not published on the profile (pending from client).
- Palette (from logo): navy #0B2D5B, brand blue #1565C0, sky #3FA9F5, galvanized #B9C3CC, paper #EEF1F4, ink #0A1220, warm accent #FF6A2B (hot air in the story).

## Scope
Next.js (App Router, TS, Tailwind v4) + @react-three/fiber + drei. Single page. Spanish UI copy (client is Venezuelan).

## Tasks
- [x] T1 Research reference site + Instagram, pull logo, palette, images (inline)
- [x] T2 Scaffold Next.js 16.4 + three / R3F / drei (inline)
- [x] T3 Build landing sections + 3D scroll story (delegated writer; trigger: 2+ non-trivial files)
- [x] T4 Run dev server and verify in browser (inline) — hero relayout (CTAs above the fold on desktop), header CTA hidden on mobile (FAB covers it), buttons no-wrap

- [x] T5 Restyle with own identity "Galvanizado & flujo de aire" (delegated writer): user asked to stop calquing the reference. Removed hang tags, `01 / 07` labels, all-caps poster headlines, ✕ marquee. Added MetalCard/rivets/sheen, DuctBand, duct-line process, blueprint hero panel, glass story cards. 3D scene untouched. Email wrap fix inline.
  - Evidence: lint 0, tsc 0, browser 1280x800 hero/services/process/projects/contact/story ch.4 OK, 375x812 no overflow, 0 broken images.
  - Gotcha: running `npm run build` while `next dev` is up left the dev server serving stale CSS; restart dev after builds.

- [x] T6 Make the 3D story technically coherent (delegated writer): the A/C unit (AirHandler) cools the air, the duct only carries cold supply air (blue particles from the start), and the room temperature readout stays at 32 °C until the diffuser chapter, then drops to 24 °C. Copy updated in chapters.ts.
  - Evidence: lint 0, tsc 0; browser 1280x800 ch.3 (unit + network), ch.4 (blue flow, room 32 °C), ch.5 (diffuser, 24 °C).

## Evidence
- `npm run lint`: exit 0
- `npm run build`: static `/` prerendered OK
- Browser 1280x800: hero, 5 story chapters (sheet → rolled duct → duct network → hot air flow 32°C → diffuser 22°C), services rendered
- Browser 375x812: no horizontal overflow, no broken images, no clipped headings

## Next
- Client to confirm city/location (`src/lib/contact.ts` LOCATION TODO) and which phone is WhatsApp.
- Higher-res photos and a vector logo would improve the draft.

## Checks
- `npm run build` passes
- `npm run lint` passes
- Visual check in browser desktop + mobile, 3D story animates on scroll

## Notes
- Not a git repo: work-unit commits skipped until the user decides to init git.
- Engram unavailable this session: mirror `odd/ductos-peralta-landing/tasks` pending.
