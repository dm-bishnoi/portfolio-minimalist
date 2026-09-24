# Architecture — Dharmender Bishnoi Portfolio

Derived from direct inspection of the repository (`package.json`, `src/`,
`vite.config.ts`, `index.html`, tsconfig, `.oxlintrc.json`, and git
history) as of this document's writing. No architecture, service, or
capability described here that isn't actually present in the code.

## Stack

| Layer | Choice | Version (from `package.json`) |
|---|---|---|
| Build tool | Vite | `^8.3.0` |
| Framework | React | `^19.2.8` (+ `react-dom` `^19.2.8`) |
| Language | TypeScript | `~6.0.2` |
| Animation | Framer Motion | `^13.4.0` |
| Analytics | `@vercel/analytics` (React integration, `/react`, not `/next`) | `^2.0.1` |
| Vite plugin | `@vitejs/plugin-react` | `^6.1.1` |
| Lint | `oxlint` | `^1.81.0` |
| Type declarations | `@types/react`, `@types/react-dom`, `@types/node` | `^19.2.18`, `^19.2.7`, `^24.13.3` |

No router, no state-management library, no CSS framework, no test runner,
no CMS/backend, no other runtime dependency exists in this repository.
`AGENTS.md` codifies keeping it this way unless a task genuinely needs
more.

## Application structure

```
index.html                 # HTML shell, meta/OG/Twitter tags, font links
src/
  main.tsx                 # React root: imports global.css, mounts <App/>
  App.tsx                  # App composition root (see below)
  assets/                  # hero.png (unused, kept pending a separate decision — see Known constraints), vite.svg
  components/               # Shared, reusable, cross-section primitives
    Nav.tsx / .module.css
    Cursor.tsx / .module.css
    ScrollProgress.tsx / .module.css
    Footer.tsx / .module.css
    BackToTop.tsx / .module.css
    CodeReveal.tsx / .module.css
    Reveal.tsx               # Reveal / RevealGroup / RevealItem (no own CSS)
    Magnetic.tsx              # (no own CSS)
    Parallax.tsx               # (no own CSS)
    ProjectFacts.tsx          # (reuses Work.module.css)
    CapabilityMap.tsx / .module.css
    diagrams/
      IgnytisLoopDiagram.tsx
      WebBugPilotStatusDiagram.tsx / .module.css
  sections/                  # One component per scroll section
    Hero.tsx / .module.css
    POV.tsx / .module.css
    Work.tsx / .module.css        # + shared styles for all 3 case studies
    FlexschemaCase.tsx            # uses Work.module.css only
    WebBugPilotCase.tsx / .module.css  # + Work.module.css
    IgnytisCase.tsx / .module.css      # + Work.module.css
    Capabilities.tsx / .module.css
    Experience.tsx / .module.css
    About.tsx / .module.css
    Contact.tsx / .module.css
  data/
    content.ts                # Single source of truth for all portfolio copy
  styles/
    tokens.css                 # Design tokens (imported by global.css)
    global.css                 # Resets, base element styles, shared utility classes
public/
  favicon.svg, icons.svg, og-image.png, robots.txt
```

## App entry

`src/main.tsx` imports `styles/global.css` (which itself `@import`s
`tokens.css`), then renders `<App />` (wrapped in `StrictMode`) into
`#root` (`index.html`).

## App.tsx

The composition root. Renders, in order: a skip link → `Cursor` →
`ScrollProgress` → `Nav` → `<main id="main" tabIndex={-1}>` containing all
seven content sections in scroll order → `Footer` → `BackToTop` →
`Analytics`. Wrapped entirely in `<MotionConfig reducedMotion="user">`
(a context provider, not a DOM element — does not affect layout or
create a CSS containing block for descendants).

## Component architecture

- **`Nav`** — owns both the desktop rail and the mobile bar/overlay in one
  component (conditionally shown via CSS breakpoints, not separate
  components/JS branches). Tracks the active section via
  `IntersectionObserver` and implements a real focus trap for the mobile
  overlay.
- **`Cursor`** — a custom cursor dot, enabled only when `pointer: fine`
  and motion isn't reduced; toggles a `body.has-fine-cursor` class that
  hides the native cursor via global CSS.
- **`ScrollProgress`** — a fixed top progress bar driven by
  `useScroll()`/`useSpring()` (Framer Motion), offset past the rail on
  desktop.
- **`BackToTop`** — self-contained: owns its own visibility threshold,
  footer-overlap avoidance (measuring the footer's position on
  scroll/resize), and scroll-to-top + focus-management behavior.
- **`CodeReveal`** — the most complex single component: a draggable
  compare slider composited from a simulated UI layer and a code layer,
  with pointer-capture dragging, keyboard control, and interactive-
  element exclusion at the drag-start boundary (see Interaction
  architecture below).
- **`CapabilityMap`** — renders the six capability items and draws
  animated SVG connector lines to "evidence nodes" (project anchors) by
  measuring DOM positions on hover/focus/pin and on resize.
- **`Reveal` / `RevealGroup` / `RevealItem` / `Parallax` / `Magnetic`** —
  small reusable motion primitives, each doing exactly one thing, used
  across multiple sections rather than each section rolling its own
  scroll-reveal logic.
- **`ProjectFacts`** — a shared renderer for a project's
  context/problem/contribution facts, tech tags, honest-scope note, and
  optional repo link — used identically by all three case-study
  components so that structure can't drift between projects.

## Section architecture

Each file in `src/sections/` is one `<section>` for one part of the
single-page scroll, each reading its copy from `src/data/content.ts` and
its own `.module.css` for layout (falling back to shared global classes —
`.container`, `.eyebrow`, `.link-underline` — for common patterns). `Work`
is a thin wrapper composing the three project-specific case-study
components (`FlexschemaCase`, `WebBugPilotCase`, `IgnytisCase`); those
three are structurally similar but not fully unified into one generic
"ProjectCase" component — each has its own file because their content
shapes differ slightly (e.g. only `WebBugPilotCase` needs the
`RevealFactRow`/`useInView` re-triggering-reveal pattern; only
`IgnytisCase` has a status-dot treatment).

## Content/data architecture

All portfolio copy lives in **`src/data/content.ts`**, exporting typed
constants: `profile`, `contact`, `pov`, `experience`, `projects`,
`ignytisSpecs`, `webBugPilotStatement`, `webBugPilotSpecs`,
`evidenceNodes` (+ `EvidenceNodeId` type), `capabilities`, `about`, `nav`.
Components import and render these directly — no copy is hardcoded in
JSX beyond structural/decorative text (e.g. "View repository ↗", static
ARIA labels). The file's own header comment states this is deliberate:
"you should not need to touch component/layout code to change what the
site says" (also stated in `README.md`).

## Interaction architecture

- **`CodeReveal`**: pointer position is tracked via a Framer Motion
  `useMotionValue` (`percent`), smoothed through a `useSpring`, driving
  both a `clip-path` reveal and the handle's `left` position. Drag start
  (`onPointerDown` on the track) explicitly checks
  `(e.target as HTMLElement).closest(INTERACTIVE_SELECTOR)` — covering
  `button, input, textarea, select, a[href], [role="button"],
  [contenteditable]` — and returns early (no drag, no `preventDefault`)
  if the press targets one of those, so the simulated UI's own controls
  (the Admin/Viewer role-switch buttons) keep native click/keyboard
  behavior instead of being swallowed as a compare-drag gesture. The
  handle is independently keyboard-operable (arrow keys, ±6%) regardless
  of pointer state.
- **Navigation**: same-page anchor scrolling (`scrollIntoView({ behavior:
  "smooth" })` from `Nav`'s buttons, or plain `href="#id"` anchors
  elsewhere — e.g. Footer's "Back to top", `CapabilityMap`'s evidence-node
  links). Active-section state is derived from `IntersectionObserver`,
  not from scroll-position math.
- **`BackToTop`**: visibility is a scroll-position threshold (>700px),
  recomputed via `requestAnimationFrame`-throttled scroll/resize
  listeners; footer overlap is avoided by measuring
  `footer.getBoundingClientRect()` each time and exposing the result as
  a `--footer-lift` CSS custom property consumed by the button's own
  `bottom` calculation. Clicking scrolls to top (`window.scrollTo`,
  smooth unless reduced motion) and then moves focus to `<main>`.
- **Mobile menu**: `Nav`'s `open` state controls both the hamburger's
  `aria-expanded` and whether the overlay is rendered at all (mounted/
  unmounted, not just hidden). A `useEffect` keyed on `open` performs the
  focus-trap wiring and cleanup/focus-restoration.
- **Scroll/reveal behavior**: two independent implementations coexist
  intentionally — the shared one-shot `Reveal`/`RevealGroup`/`RevealItem`
  primitives (used by most sections), and `WebBugPilotCase`'s local
  re-triggering `RevealR`/`RevealFactRow` (using `useInView` directly)
  because the shared-variant approach produced an intermittent
  stuck-hidden bug specifically for that section (documented in a code
  comment in `WebBugPilotCase.tsx`). Do not "simplify" this into one
  pattern without re-testing that specific failure mode.

## Analytics

`@vercel/analytics/react`'s `<Analytics />` component is mounted exactly
once, in `App.tsx`, as the last child inside `<MotionConfig>` (after
`Footer` and `BackToTop`). No custom `track()` events are called anywhere
in the codebase — this is page-view/visit tracking only, via Vercel's
Web Analytics product. No other analytics/tag-manager script exists.

## Responsive architecture

Desktop/mobile navigation is handled entirely by CSS breakpoints inside a
single `Nav` component (see `DESIGN_SYSTEM.md` → Layout and Responsive
behavior for the exact breakpoint table) — there is no separate
mobile-specific component tree, no `matchMedia`-driven conditional
rendering for the nav itself (only `Cursor`, `Magnetic`, and a couple of
motion-related checks use `matchMedia` in JS). Content offset for the
fixed rail is handled by one shared CSS rule on `.container` rather than
per-section overrides, so every section automatically respects the rail
without each one needing its own offset logic.

## Build / deployment

- **Build command**: `npm run build` → `tsc -b && vite build` (typecheck
  then bundle; output to `dist/`).
- **Lint command**: `npm run lint` → `oxlint` (config in
  `.oxlintrc.json`).
- **Dev**: `npm run dev` (Vite dev server, HMR).
- **Preview**: `npm run preview` (serves the built `dist/` locally).
- **Deployment**: Vercel, connected to the `dm-bishnoi/portfolio-
  minimalist` GitHub repository via Vercel's GitHub integration
  (confirmed via the Vercel project record: `framework: "vite"`, no
  manual deploy tool used). A push to `main` triggers an automatic
  production build and deployment. `index.html`'s canonical URL,
  `og:url`, `og:image`, and `twitter:image` are hardcoded to the
  confirmed production domain, **https://portfolio-minimalist.vercel.app**
  (no build-time substitution mechanism exists or is needed — see Known
  constraints below).
- **No CI pipeline** exists in-repo (no `.github/workflows/`).

## Dependency principles

- Add a dependency only when a task genuinely cannot be done reasonably
  with what's already present (React, Framer Motion, plain CSS modules,
  Vercel Analytics).
- Prefer a small, targeted addition (as with `@vercel/analytics`) over a
  framework-level one (no router, no UI kit, no CSS framework has been
  introduced despite this being a fairly rich interactive site — that's a
  deliberate constraint, not an oversight).
- Never add a dependency to solve a problem that a native browser API or
  a few lines of CSS/TS already solves (see `Reveal`, `Magnetic`,
  `Parallax` — all hand-rolled rather than pulled from a library).

## Known constraints

- **`src/components/diagrams/PipelineDiagram.tsx` was removed** (it was
  unused — not imported by any section or component — and its content,
  labels like "Game Engine," "Plugin API," "Teen Patti," "WS Gateway",
  did not correspond to any of the three current projects in
  `content.ts`). No other file referenced it; no shared/exclusive
  stylesheet existed for it to remove alongside it.
- **`src/assets/hero.png` was removed** (it was unused — not referenced by
  any component, config, or public asset). `README.md`'s claim that "no
  images are used" was already accurate for what's rendered on the page;
  this removes the one unused file that could have contradicted it on a
  closer look.
- **`__PRODUCTION_DOMAIN__` placeholders are resolved.** `index.html`'s
  canonical URL, `og:url`, `og:image`, and `twitter:image` now use the
  confirmed production domain, `https://portfolio-minimalist.vercel.app`,
  hardcoded as a literal string (existing asset paths — `/` and
  `/og-image.png` — preserved unchanged). Verified by running
  `npm run build` and inspecting `dist/index.html`: zero occurrences of
  `__PRODUCTION_DOMAIN__` remain. There is still no build-time
  substitution mechanism in this repository (no Vite plugin, `define`,
  `vercel.json`, or env file) — the domain is a plain hardcoded value, so
  if the production domain ever changes, `index.html` must be updated by
  hand.
- **`WebBugPilotCase.tsx`'s reveal pattern intentionally diverges** from
  the shared `Reveal` primitive — see Interaction architecture above. Do
  not unify it without first reproducing and re-verifying against the
  stuck-hidden bug the code comment describes.
- **No formal typecheck script** exists separately from `build` — `tsc -b`
  runs as part of `npm run build`, so a TypeScript error surfaces there,
  not via a dedicated `npm run typecheck`.
- **No test suite** exists in this repository. Validation currently
  relies on manual build/lint runs and manual/automated browser
  verification (screenshots, computed-style checks), not on an automated
  test runner.
