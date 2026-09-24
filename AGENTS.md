# AGENTS.md — Operating guide for this repository

This file governs how AI agents (and developers) work in this repo. It is
derived from the actual current tooling and history of the project — not a
generic template. When in doubt, this file and `PRD.md` / `DESIGN_SYSTEM.md`
/ `Architecture.md` are the source of truth over chat history.

## Project identity

- **Framework**: Vite (`^8.3.0`) + React (`^19.2.8`) + TypeScript (`~6.0.2`)
- **Package manager**: npm (`package-lock.json` is committed; use `npm`,
  not yarn/pnpm, unless the user explicitly says otherwise)
- **Build**: `npm run build` → `tsc -b && vite build` (typecheck is part
  of the build, there is no separate `typecheck` script)
- **Lint**: `npm run lint` → `oxlint` (config: `.oxlintrc.json` — plugins
  `react`, `typescript`, `oxc`; enforces `react/rules-of-hooks` as an
  error)
- **Dev server**: `npm run dev` (Vite)
- **Preview production build**: `npm run preview`
- No test runner is configured in this repository.

## Working rules

Agents **MUST**:
- Inspect the actual implementation (component, its CSS module, the
  relevant global styles/tokens) before modifying anything.
- Preserve existing architecture unless there is a demonstrated, specific
  reason to change it.
- Prefer the smallest scoped change that solves the stated problem.
- Verify responsive behavior at the breakpoints in the Validation Matrix
  below whenever layout/CSS is touched.
- Verify accessibility (focus states, keyboard paths, ARIA) whenever
  interactive UI is touched.
- Run `npm run build` and `npm run lint` after any source change, and
  report the actual results (not assumed results).
- Inspect `git diff` / `git status` before commit, and confirm only the
  intended files are staged.
- Avoid unrelated changes — a bug fix commit should not also carry
  drive-by refactors, unless explicitly asked.
- Preserve factual accuracy in portfolio content (see `PRD.md` → Content
  principles). Never invent metrics, clients, users, or claims not present
  in `src/data/content.ts` or explicitly supplied by the user.

Agents **MUST NOT**:
- Rebuild or restructure the portfolio from scratch.
- Replace the design system (colors, typography, spacing tokens, layout
  model) without explicit approval for that specific change.
- Introduce dependencies beyond what a task genuinely requires — the
  project intentionally keeps its dependency list minimal (`README.md`
  calls Framer Motion "one justified animation dependency").
- Invent portfolio claims, fake metrics, or testimonials.
- Add gradients, orbs, particles, WebGL, or 3D effects unless a task
  explicitly requests them — the visual language is flat, editorial, and
  typography-led by design.
- Alter the established visual language (colors, type, spacing, motion
  character) without an explicit design-change request.
- Commit changes unrelated to the current task.

## Design-change policy

**The visual design is currently frozen.** Do not redesign, restyle, or
change the visual language, typography scale, color tokens, spacing
system, or motion character unless a task explicitly asks for a design
change. Bug fixes and feature additions (e.g. a new global control) should
reuse existing tokens/patterns and match the current visual language, not
introduce a new one.

## Change workflow

1. **Inspect** — read the actual component, its styles, and any shared
   tokens/globals it depends on. Do not assume from memory or from prior
   chat turns; re-verify against the current file contents.
2. **Reproduce** — for a reported bug, reproduce it directly (dev server +
   browser automation, or manual reasoning backed by real measurements)
   before proposing a cause. Do not diagnose from a description alone.
3. **Identify root cause** — trace the issue to the specific rule/line
   responsible, not just the symptom.
4. **Plan minimal change** — decide the smallest edit that fixes the root
   cause without touching unrelated code.
5. **Implement** — make the change.
6. **Test** — build, lint, and manually verify the specific behavior
   changed (and that nothing else did).
7. **Review diff** — read the full `git diff` before proposing to commit.
8. **Report** — state what was found, what was changed, and the actual
   validation results (build/lint output, viewport checks).
9. **Commit only when explicitly requested** — do not commit or push
   unless the user asks for it in that turn. A prior approval does not
   carry forward to later turns.

## Validation matrix

Responsive viewports to check when touching layout, navigation, or the
hero:

| Width | Notes |
|---|---|
| 375 | Mobile (nav rail hidden, mobile bar shown) |
| 390 | Mobile |
| 414 | Mobile |
| 768 | Below the 900px desktop-rail breakpoint — mobile nav still active |
| 1024 | Desktop rail active |
| 1280 | Desktop rail active |
| 1440 | Desktop rail active |

At each, and both at page-top and after scrolling, verify:
- **No horizontal overflow** — `document.documentElement.scrollWidth`
  must equal `window.innerWidth` (no visual/manual eyeballing substitute).
- **Navigation behavior** — desktop rail fixed/fully visible ≥900px;
  mobile bar + overlay <900px; active-section highlighting still works
  (`Nav.tsx`'s `IntersectionObserver`).
- **Keyboard accessibility** — Tab order, visible focus rings, and any
  component-specific keyboard interaction (e.g. `CodeReveal`'s slider
  arrow keys, mobile overlay's focus trap + Escape).
- **Reduced motion** — with `prefers-reduced-motion: reduce`, animations
  collapse to near-instant per `global.css`, and any component with its
  own reduced-motion branch (`Parallax.tsx`, `CodeReveal.tsx`,
  `BackToTop.tsx`) behaves correctly.
- **Touch interaction** — drag-to-compare and any button inside it must
  not conflict (tapping a button must not move the slider; dragging the
  handle must still work).
- **Console errors** — no new errors/warnings introduced by the change.

## Git / deployment rules

Document only what actually exists — do not invent CI/CD steps:

- **Repository**: `dm-bishnoi/portfolio-minimalist` on GitHub.
- **Hosting**: Vercel, connected via GitHub integration (confirmed via the
  Vercel project's `framework: "vite"` and auto-created deployments on
  push). Project name: `portfolio-minimalist`.
- **Deployment trigger**: a push to `main` triggers an automatic
  production build/deploy through the Vercel GitHub integration. There is
  **no manual `vercel deploy` step** and none should be introduced.
- **No CI pipeline** (no GitHub Actions workflow files exist in this
  repository as of this writing). Build/lint validation is run manually
  (or by an agent) before committing, not enforced by CI.
- **No `vercel.json`** is committed; `.vercel/` is git-ignored, so any
  Vercel project-level settings live in the Vercel dashboard.
- Development branch convention observed in this repo's history: feature
  work happens on a dedicated branch, then is pushed either to that
  branch or directly to `main` per explicit user instruction — agents
  should follow whatever the current task's instructions say about target
  branch, and never push to a branch other than the one specified without
  explicit permission.
