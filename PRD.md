# Product Requirements — Dharmender Bishnoi Portfolio

Source of truth for what this site is for and what it must do. Derived entirely
from the current implementation (`src/data/content.ts`, sections, and
components) as of this document's writing. If this file and the code ever
disagree, **the code is correct** — update this file, don't silently trust it.

## Product overview

A one-page, single-scroll personal portfolio for **Dharmender Bishnoi**,
positioned as **Angular Developer · Frontend Engineer**, with **6 years**
of experience (per `src/data/content.ts` → `profile.experience`). It is a
static Vite + React + TypeScript site — no backend, no CMS, no router (all
navigation is same-page anchor scrolling).

> ⚠️ **Do not describe Dharmender as a "Senior Product Designer."** That was
> an earlier positioning; the current, correct positioning per
> `profile.role` is **Angular Developer · Frontend Engineer**.

## Portfolio objective

Give a hiring manager, recruiter, or technical reviewer enough concrete,
verifiable evidence — in under a few minutes — to believe Dharmender can do
real product-minded frontend engineering work: not just "I know Angular,"
but "here is what I built, why, and what it actually does today."

## Target audience

- Hiring managers / technical recruiters evaluating an Angular/frontend
  developer.
- Engineers or technical leads doing a quick portfolio review before a
  screen or interview.
- Dharmender himself, sharing a single link as a professional reference.

## Primary user journey

1. Land on the **Hero** — read the headline, eyebrow (role), and supporting
   statement; get the "who/what/how" in a few seconds.
2. Try the **CodeReveal** compare exhibit (drag to reveal code behind a
   simulated interface) — the site's own proof-of-craft, before any project
   is described.
3. Scroll through **How I work (POV)** → **Selected work** (three real
   projects) → **Capabilities** (mapped back to the projects) →
   **Experience** → **About** → **Contact**.
4. Reach **Contact** and either email directly or open GitHub/LinkedIn.

## Secondary user journeys

- Jump straight to a specific section via the desktop nav rail or mobile
  menu (`src/data/content.ts` → `nav`, anchor IDs matching each section).
- Open a specific project's GitHub repo link from within its case study
  (`ProjectFacts` renders `project.links.github` when present).
- Hover/tap a **Capabilities** item to see which project(s) it's evidenced
  by (`CapabilityMap`), then jump to that project via the linked node.
- Use **Back to top** (floating control or footer link) to return to the
  hero from anywhere on the page.

## Core value proposition

"I don't just talk about product thinking — I ship it in code myself." The
site demonstrates this directly (an interactive code/interface compare
exhibit, real project case studies with honest scope statements) rather
than only claiming it in prose.

## Current sections

In scroll order (`src/App.tsx`, IDs from `src/data/content.ts` → `nav`):

| # | Section | Component | Anchor |
|---|---|---|---|
| 00 | Intro | `Hero` | `#hero` |
| 01 | How I work | `POV` | `#pov` |
| 02 | Selected work | `Work` (contains `FlexschemaCase`, `WebBugPilotCase`, `IgnytisCase`) | `#work` |
| 03 | Capabilities | `Capabilities` | `#capabilities` |
| 04 | Experience | `Experience` | `#experience` |
| 05 | About | `About` | `#about` |
| 06 | Contact | `Contact` | `#contact` |

`Footer` renders below `Contact` (outside the numbered nav); `BackToTop`
and Vercel `Analytics` are global, non-content elements mounted at the app
root.

## Current projects

All facts below are taken verbatim/paraphrased from `src/data/content.ts` →
`projects`. Nothing here is invented.

### Flexschema

| | |
|---|---|
| **Kind** | Enterprise CRM — built at Pizone Infotech (employer work, not a personal project) |
| **Purpose** | An enterprise CRM platform business teams use to manage customers, workflows, and permissions |
| **User's role/context** | Angular frontend developer — ongoing, in-production employer work |
| **Technology** | Angular, .NET, SQL Server, REST APIs |
| **Implemented functionality** | Configurable, reusable CRM module components; role-based access control across features; REST API integration via `HttpClient` + RxJS; lazy-loaded routing with managed subscription lifecycles |
| **What the portfolio demonstrates** | Production Angular engineering at real scope: configurability, access control, and API integration, not a toy build |
| **Honest scope (as stated in content)** | Presented as an engineering case study, not a personal project. Business metrics and team composition are explicitly **not disclosed** |

### WebBugPilot

| | |
|---|---|
| **Purpose** | A developer tool that autonomously tests a web app running locally: describe what to check in plain English, and a Playwright-driven agent drives a real browser, watches for broken behavior, and reports bugs with evidence |
| **User's role/context** | Personal project, in development, not deployed as a public product |
| **Technology** | React, TypeScript, Vite, Tailwind CSS, Node.js, Express, Playwright, Ollama |
| **Implemented functionality** | Playwright-controlled browser with a live in-page status overlay and a human-interaction lock during runs; an agent loop converting page state into commands (click, type, scroll, report bug); live progress over Server-Sent Events rendered as a screenshot feed with an animated cursor; bug fingerprinting to dedupe findings; multiple AI backends (local Ollama by default, OpenRouter/Gemini/others optional) |
| **What the portfolio demonstrates** | End-to-end systems + AI-agent engineering: real browser automation, a reasoning loop, and real-time streaming, not a UI mockup |
| **Honest scope (as stated in content)** | Pipeline (automation, reasoning loop, streaming, bug detection) is fully built and wired end-to-end. Two explicit limits: persistence is a per-user JSON file store (not a database), and there's no standalone report-file export yet |

### Ignytis

| | |
|---|---|
| **Purpose** | A coding-education platform: watch lessons, write and run code, work through practice challenges, track progress |
| **User's role/context** | Personal project, in development, monorepo architecture, not a live public product |
| **Technology** | Angular, NestJS, TypeScript, PostgreSQL, Prisma, Tailwind CSS, Docker |
| **Implemented functionality** | Angular frontend (courses, lessons, practice challenges, dashboard, progress tracking); NestJS API with Prisma-backed course/enrollment/lesson-progress logic; separate Docker-based sandboxed code-execution service with a language registry and challenge test harnesses, streamed to the API over SSE (queued/started/stdout/stderr/complete/error) |
| **What the portfolio demonstrates** | Platform/systems architecture: a genuinely isolated execution service kept out of the main API by design, plus real backend data modeling |
| **Honest scope (as stated in content)** | Course, lesson, and execution modules have real, tested backend logic and a working sandboxed execution service. Some frontend areas (workspace, settings, profile) are comparatively early/thinner than the core course/lesson/practice flow |

## Content principles

- **Every claim must be verifiable or explicitly scoped.** Each project
  carries an `honestScope` field stating exactly what's built vs. not, and
  whether it's employer work or a personal project. This is a deliberate,
  load-bearing content pattern — not incidental copy.
- **`src/data/content.ts` is the single source of truth for all copy.**
  Components read from it; they do not hardcode portfolio facts. The file's
  own header comment states this explicitly.
- No fabricated metrics, users, revenue, client names, or testimonials
  appear anywhere in current content, and none should be added.

## Interaction principles

- Motion is used to support comprehension and craft-signaling (staggered
  reveals, a draggable code/interface compare exhibit), not for spectacle.
- Every meaningful interaction has both a pointer and a keyboard path (see
  `DESIGN_SYSTEM.md` → Accessibility and `Architecture.md` → Interaction
  architecture for specifics per component).
- `prefers-reduced-motion` is respected globally, both via `MotionConfig
  reducedMotion="user"` (Framer Motion) and a hard CSS override in
  `src/styles/global.css`.

## Accessibility requirements

- Skip link to `#main` (`App.tsx`, `.skip-link` in `global.css`).
- Visible focus states via `:focus-visible` (2px accent outline) sitewide.
- Mobile nav overlay implements a real focus trap (`Nav.tsx`) and restores
  focus to the toggle button on close.
- `CodeReveal`'s compare handle is a real `role="slider"` with
  `aria-valuemin/max/now/text`, keyboard-operable via arrow keys, and
  pointer-drag ignores presses that start on an interactive control inside
  the exhibit (role-switch buttons) so they keep native click/keyboard
  behavior.
- `BackToTop` is a real `<button aria-label="Back to top">`, keyboard
  operable, and moves focus to `<main>` after activating.
- Minimum interactive sizing: mobile nav toggle 44×44px, `BackToTop` 44px
  (mobile) / 48px (desktop), overlay menu items `min-height: 44px`.

## Responsive requirements

- No horizontal overflow at any viewport (verified 375–1440px in practice;
  `body { overflow-x: hidden }` is a backstop, not the primary defense).
- Desktop (≥900px): fixed left nav rail (72px / `--rail-width`), content
  offset via `.container`'s `padding-left`.
- Mobile (<900px): fixed top bar + hamburger, full-screen overlay menu.
- Hero, compare exhibit, and typography are tuned per-breakpoint, not
  simply scaled down (see `DESIGN_SYSTEM.md`).

## Performance requirements

None are formally specified or measured in the repository (no Lighthouse
CI, no budget config). The only implicit performance-relevant facts in the
codebase:
- Single external font-loading step in `index.html` (Google Fonts,
  preconnected).
- One runtime dependency beyond React (Framer Motion) plus Vercel
  Analytics — deliberately kept minimal per `README.md`.
- No images are rendered inline in the page (system diagrams are inline
  SVG/React, not raster images); `og-image.png` is metadata-only (social
  preview), not part of the rendered page.

## SEO / metadata requirements

Defined in `index.html`:
- `<title>`, meta `description`, canonical URL, and OG/Twitter image URLs.
  Canonical URL, `og:url`, `og:image`, and `twitter:image` now resolve to
  the confirmed production domain, `https://portfolio-minimalist.vercel.app`
  (hardcoded in `index.html`; verified with zero `__PRODUCTION_DOMAIN__`
  occurrences remaining in a real `npm run build` output).
- Open Graph (`og:type`, `og:url`, `og:title`, `og:description`,
  `og:image` + dimensions) and Twitter Card (`summary_large_image`) tags.
- Current title/description read: **"Dharmender Bishnoi — Angular
  Developer / Frontend Engineer."**

## Analytics requirements

- Vercel Web Analytics only (`@vercel/analytics/react`, `<Analytics />`
  mounted once in `App.tsx`). No custom events are implemented. No other
  analytics/tracking provider is present in the codebase.

## Deployment requirements

- Hosted on Vercel, connected via the GitHub integration (project
  `portfolio-minimalist`, framework detected as `vite`). Pushing to
  `main` on the connected GitHub repo automatically triggers a production
  deployment — no manual `vercel deploy` is used or required.
- No `vercel.json` is committed; `.vercel` is git-ignored, meaning any
  project-level config lives in the Vercel dashboard, not in-repo.

## Explicit non-goals

- Not a multi-page site; no router is used or planned.
- Not a CMS-backed site; content changes are code changes to
  `src/data/content.ts`.
- Not presenting fabricated production metrics, user counts, revenue, or
  testimonials for any project.
- Not claiming public/live-product status for WebBugPilot or Ignytis —
  both are explicitly labeled "in development" / personal projects.
- Not a general blog, case-study library, or multi-client agency site.

## Experience consistency (resolved)

`profile.experience` in `src/data/content.ts` reads **"6 years"**. Two
other content fields previously said "five years" in prose
(`capabilities.items[1].evidence` and `about.body[1]`); both have been
updated to "Six years"/"six years" to match, since they describe the same
real-world experience duration in different words, not a distinct
historical fact. Verified: no "five years"/"5 years"/"5+ years" string
remains anywhere in `src/`, `public/`, `index.html`, or `README.md`.
