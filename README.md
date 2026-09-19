# Dharmender Bishnoi — Portfolio

A one-page portfolio built with Vite + React + TypeScript. Editorial layout, one
justified animation dependency (Framer Motion), plain CSS with design tokens —
no CSS framework, no router, no CMS.

## Run it

```bash
npm install
npm run dev
```

```bash
npm run build   # type-checks then builds to dist/
npm run preview # serve the production build locally
```

## Editing content

All copy — name, positioning, experience, project case studies, capabilities,
contact links — lives in one place: [`src/data/content.ts`](src/data/content.ts).
Every fact in that file is verified (from the candidate directly, or from the
referenced repository). To correct or extend anything, edit that file; you
should not need to touch component/layout code to change what the site says.

## Structure

- `src/sections/` — one component per scroll section (Hero, POV, Work,
  Capabilities, Experience, About, Contact)
- `src/components/` — shared primitives (Nav, Cursor, Reveal/scroll-in-view
  wrapper, Magnetic button, diagrams)
- `src/components/diagrams/` — inline SVG architecture diagrams used in the
  Work section in place of product screenshots (none were available/verified)
- `src/styles/tokens.css` — color/type/spacing design tokens, light + dark
  via `prefers-color-scheme`

## Notes

- No images are used because no verified product screenshots exist for the
  featured projects; the visual system leans on typography and art-directed
  system diagrams instead. Swap in real screenshots by adding them under
  `public/` and updating the relevant section component if that changes.
- Motion respects `prefers-reduced-motion`.
