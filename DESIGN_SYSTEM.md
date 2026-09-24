# Design System — Dharmender Bishnoi Portfolio

**This document describes the design system as it is currently
implemented.** It is derived from `src/styles/tokens.css`,
`src/styles/global.css`, and every component's CSS module — not a
generic or aspirational spec. **The visual design is frozen**: do not
redesign anything while using or updating this document (see
`AGENTS.md` → Design-change policy).

## Design direction

- **Dark editorial, cinematic technical minimalism.** Serif display type
  for headlines, monospace for labels/metadata/UI chrome, a warm
  paper/ink palette (not pure black/white) in both light and dark scheme.
- **Restrained premium presentation.** One accent color (a warm
  orange-red), used sparingly — small marks, active states, one line of
  emphasis — never as a dominant fill.
- No gradients, glassmorphism (aside from one deliberate
  `backdrop-filter: blur(8px)` on the mobile top bar), particles, 3D, or
  decorative imagery.

## Layout

### Desktop left navigation rail

- `position: fixed; left: 0; top: 0; bottom: 0; width: var(--rail-width)`
  (**72px**, `--rail-width: 4.5rem`), active at `min-width: 900px`
  (`Nav.module.css` → `.rail`).
- Contains: "DB" mark (top), then the seven nav items as vertical text
  (`writing-mode: vertical-rl; transform: rotate(180deg)`), centered in
  the remaining height (`ul { flex: 1; justify-content: center }`).
- `z-index: 100`, `border-right: 1px solid var(--line)`,
  `background: var(--paper)`.

### Mobile navigation behavior

- Below 900px: `.rail` is `display: none`. Instead, `.mobileBar` — a
  fixed top bar (`DB` mark + hamburger toggle) with
  `backdrop-filter: blur(8px)` and a translucent paper background — is
  shown.
- Tapping the toggle opens `.overlay`: a fixed, full-screen, opaque
  `role="dialog" aria-modal="true"` menu with large serif nav items and
  mono section numbers in the accent color.

### Content offset relationship

`.container` (global.css) is the shared content wrapper. At ≥900px it
gets `padding-left: calc(var(--rail-width) + var(--space-6))` — i.e. the
72px rail width plus one spacing step — so page content never sits under
the fixed rail. Below 900px, `.container` just uses the normal
`padding-inline: var(--space-5)`.

### Section structure

Every top-level section is a `<section>` with global defaults:
`position: relative; padding-block: var(--space-9); border-top: 1px solid
var(--line)` (first section has no top border). Each section's inner
content sits in `<div className="container">` (composed with a
section-specific class where extra layout is needed, e.g. Hero's
`.inner`, POV's `.grid`).

### Container behavior

`.container { max-width: var(--content-max) /* 74rem */; margin: 0 auto;
padding-inline: var(--space-5) }`, with the desktop rail offset added on
top as above.

## Typography

Font stacks (`tokens.css`):

| Token | Stack | Used for |
|---|---|---|
| `--font-display` | `"Fraunces", "Iowan Old Style", serif` | Headings (`h1`–`h4`), hero headline, case-study titles, quotes/statements |
| `--font-body` | `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | Body text (`body` default) |
| `--font-mono` | `"IBM Plex Mono", ui-monospace, "SFMono-Regular", monospace` | Eyebrows, nav labels, metadata, tech tags, buttons, code exhibit |

Loaded via Google Fonts in `index.html`: Fraunces (variable, opsz+wght
axes), Inter (400/500/600), IBM Plex Mono (400/500).

Representative sizes (all fluid via `clamp()` unless noted):

| Element | Size |
|---|---|
| Hero headline (`h1`) | `clamp(2.6rem, 5.4vw + 0.6rem, 4.4rem)`, weight 500 |
| Contact heading | `clamp(2.4rem, 7.5vw, 5.2rem)`, weight 400 |
| Work section heading | `clamp(2.1rem, 5vw, 3.6rem)`, weight 400 |
| Case-study title | `clamp(2.4rem, 7vw, 4.6rem)`, weight 500 |
| Contact signature ("Dharmender Bishnoi") | `clamp(1.8rem, 7.5vw, 7rem)`, weight 400, outlined via `-webkit-text-stroke` where supported |
| Hero body / supporting statement | `clamp(1.05rem, 2vw, 1.25rem)` |
| Base body | `16px` (`body` in `global.css`), `line-height: 1.5` |
| Eyebrows / mono labels | `0.66rem`–`0.85rem`, `letter-spacing: 0.06–0.14em`, uppercase |

Headings (`h1–h4` globally): `font-weight: 500; line-height: 1.05;
letter-spacing: -0.01em`.

## Colors

All tokens defined in `src/styles/tokens.css`, light values by default,
dark values under `@media (prefers-color-scheme: dark)` (the site follows
system theme; there is no manual theme toggle).

| Token | Light | Dark |
|---|---|---|
| `--paper` | `#f6f3ea` | `#121110` |
| `--paper-alt` | `#efe9d8` | `#1a1815` |
| `--ink` | `#141310` | `#f2ede0` |
| `--ink-soft` | `#55503f` | `#b7b09b` |
| `--ink-faint` | `#6b6552` | `#8f8973` |
| `--accent` | `#ff4a1f` | `#ff6a3d` |
| `--accent-text` | `#c7370f` | `#ff6a3d` |
| `--accent-ink` | `#14100d` | `#14100d` |
| `--line` | `rgba(20,19,16,0.14)` | `rgba(242,237,224,0.14)` |
| `--line-strong` | `rgba(20,19,16,0.28)` | `rgba(242,237,224,0.26)` |

Do not add new color tokens or hardcode new hex values without
introducing them through this token set.

## Borders

- Hairline dividers: `1px solid var(--line)` (section tops, footer top,
  facts-list left rail).
- Slightly stronger borders on framed elements (compare exhibit, tech
  pills, lead diagram frames): `1px solid var(--line-strong)`.
- No box-model borders in the accent color except the `CodeReveal`
  role-toggle active/pressed micro-states and the compare handle itself.

## Spacing

Defined as a numbered scale in `tokens.css` (`--space-1` … `--space-9`),
compressed for `--space-8`/`--space-9` under `max-width: 640px`:

| Token | Default | ≤640px |
|---|---|---|
| `--space-1` | 0.25rem | — |
| `--space-2` | 0.5rem | — |
| `--space-3` | 0.75rem | — |
| `--space-4` | 1rem | — |
| `--space-5` | 1.5rem | — |
| `--space-6` | 2.25rem | — |
| `--space-7` | 3.5rem | — |
| `--space-8` | 5.5rem | 3.5rem |
| `--space-9` | 8.5rem | 4.75rem |

Other layout tokens: `--rail-width: 4.5rem`, `--content-max: 74rem`.

## Radius

There is **no centralized radius token** — values are set per component.
Observed values in use: `2px` (skip link, BackToTop button), `6px`
(CodeReveal simulated button), `8px` (CodeReveal simulated card,
CapabilityMap node), `12px` (project lead-diagram frame), `14px`
(CodeReveal track), `50%` (dots, avatars/markers, cursor), `999px`
(pills — tech tags, quick-fact chips, toggle switches, primary CTA
button). Any new component should reuse one of these values rather than
introducing a new arbitrary radius.

## Components

### Nav

Desktop rail + mobile bar/overlay as described under Layout. Active
section is tracked via `IntersectionObserver` (`rootMargin: "-40% 0px
-50% 0px"`) and reflected as `.active` (accent-colored number) on the
current nav item. Rail items are `<button>`s that call `scrollIntoView({
behavior: "smooth" })`.

### Hero

Eyebrow (role) → animated word-mask headline → supporting statement →
byline (`name · experience with stack`) → primary button + email link →
CodeReveal exhibit (with a "Drag to compare" hint label) → a
fixed-corner "Scroll to explore ↓" cue (desktop ≥1200px only) that fades
out within the first 160px of scroll.

### CodeReveal

A draggable compare exhibit: a simulated UI card (role switch, toggle,
button) on top, revealing a code panel underneath via `clip-path`, driven
by a Framer Motion spring (`stiffness: 220, damping: 30, mass: 0.6`).
Rest position: 38%. The drag handle is a `role="slider"` element,
keyboard-operable (±6% per arrow key). Pointer-drag starting on an
interactive control inside the simulated UI (the Admin/Viewer buttons) is
explicitly excluded from starting a drag (see `Architecture.md` →
Interaction architecture).

### Buttons / links

- **Primary CTA** (`.primaryBtn`, Hero): pill (`border-radius: 999px`),
  1px `var(--ink)` border, mono font, inverts to filled ink/paper on
  hover.
- **Link-underline** (`.link-underline`, global): an underline that sits
  at 30% width/40% opacity at rest and animates to full width/opacity on
  hover/focus.
- **Secondary text links** (email, GitHub/LinkedIn): plain mono text,
  often with `.link-underline`.

### Project cards (case studies)

Not literal "cards" — each project (`FlexschemaCase`, `WebBugPilotCase`,
`IgnytisCase`) is a full-width `<article>` stacked vertically
(`.caseBlock`, top border + `padding-top: var(--space-7)`), containing:
meta row (kind + year, mono/uppercase) → large serif title → intro
statement → spec grid or quick-fact pills → a framed system diagram
(`.leadFrame`, bordered, `--paper-alt` background) with a caption
explicitly noting it's a diagram, not a screenshot → a facts list
(context/problem/contribution as a left-rialed `<dl>` with accent dot
markers) → tech-tag pills → an italic honest-scope note → an optional
"View repository ↗" link.

### Capabilities (CapabilityMap)

Six capability items (`<li role="button" tabIndex={0}>`), each showing
title + evidence text. Hovering, focusing, or clicking/pressing
Enter/Space on an item draws animated SVG connector lines (Framer Motion
`motion.line`, `pathLength` animation) from that item to the
project/"evidence node" it's sourced from. Click/Enter toggles a pinned
state (persists without hover); a `sr-only`-adjacent mobile list
(`.mobileSources`) exposes the same source mapping without relying on
hover.

### Experience

Role header (title/company + period) → summary → a vertical timeline
(dot + connecting line per area, `RevealGroup`/`RevealItem` staggered) →
a tech-tag pill list.

### CTA (Contact)

Large two-line heading with one italic accent-colored phrase → email
(pill-less, underlined mono) + GitHub/LinkedIn links → a full-bleed,
oversized outlined name treatment (`.signature`) at the section's base as
a closing visual signature.

### BackToTop

A compact editorial control (`↑ TOP`, not a generic circular FAB): real
`<button aria-label="Back to top">`, fixed bottom-right, appears after
>700px of scroll (`AnimatePresence` fade+8px slide, 0.25s), dark
ink/paper-alt surface with a thin border, accent border/arrow on
hover/focus. It dynamically lifts clear of the footer via a measured
`--footer-lift` CSS variable so it never overlaps footer content. Height:
44px (mobile), 48px (≥900px).

### Footer

A simple bottom bar: copyright line + a plain "Back to top" text link
(`href="#hero"`, anchor-based — distinct from and in addition to the
`BackToTop` floating control; both are intentional, per prior task
instructions).

### Mobile navigation

Covered under Layout → Mobile navigation behavior and Accessibility below
(focus trap, Escape-to-close, focus restoration).

## Motion

- **Framer Motion** is the sole animation dependency (`MotionConfig
  reducedMotion="user"` wraps the whole app in `App.tsx`).
- **Reveal patterns**: `Reveal` / `RevealGroup` / `RevealItem`
  (`src/components/Reveal.tsx`) — a shared `opacity: 0, y: 28 → opacity:
  1, y: 0` variant, `duration: 0.7`, one-shot (`viewport={{ once: true,
  margin: "-10% 0px -10% 0px" }}`). `WebBugPilotCase.tsx` deliberately
  uses a local, non-shared re-triggering reveal (`useInView`,
  `once: false`) instead, with a comment explaining why (a shared-variant
  approach produced an intermittent stuck-hidden bug for that section).
- **Hover behavior**: `Magnetic` (`src/components/Magnetic.tsx`) offsets
  an element toward the cursor on mousemove (spring-smoothed, gated to
  `pointer: fine`), used on the primary CTA. Standard link-underline hover
  described above.
- **Compare slider interaction**: see CodeReveal above — spring-driven
  position, `clip-path` reveal, pointer-capture drag with interactive-
  element exclusion, and keyboard arrow-key control.
- **Parallax**: `src/components/Parallax.tsx` applies a small scroll-
  linked vertical offset (`amount` px, default 24) to section headings in
  Work/Capabilities; it no-ops (renders a plain `div`) when
  `prefers-reduced-motion: reduce`.
- **Reduced-motion behavior**: enforced two ways — Framer Motion's
  `reducedMotion="user"` (auto-respects the OS setting for all `motion.*`
  animations), and a hard CSS override in `global.css` collapsing all
  `animation-duration`/`transition-duration`/`scroll-behavior` to near-
  zero. Several components additionally check the media query directly
  (`Parallax`, `CodeReveal`'s initial reveal, `BackToTop`'s scroll
  behavior, `Cursor`).
- **Timing/easing token**: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` and
  `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` (`tokens.css`) — used
  both in CSS transitions and mirrored as literal arrays
  (`[0.16, 1, 0.3, 1]`) in Framer Motion `transition` props throughout the
  codebase (JS/TS can't reference CSS custom properties directly, so the
  same curve is duplicated by value — not a token drift, but worth
  knowing if the curve is ever changed).

## Accessibility

- **Focus states**: global `:focus-visible { outline: 2px solid
  var(--accent); outline-offset: 3px }`. `main:focus { outline: none }` —
  intentional, since `<main>` only receives *programmatic* focus (skip
  link, BackToTop) as a navigation starting point, not as something a
  user tabs to directly.
- **Keyboard interaction**: skip link (`#main`), full site is reachable
  by Tab; `CodeReveal`'s handle (arrow keys); `CapabilityMap` items
  (`tabIndex={0} role="button"`, Enter/Space to pin); `BackToTop`
  (Enter/Space to activate, native button semantics).
- **ARIA usage**: `role="slider"` + full `aria-value*` set (CodeReveal
  handle); `role="group" aria-label` (CodeReveal role switch);
  `aria-pressed` (role-switch buttons, CapabilityMap pin state);
  `role="dialog" aria-modal="true"` (mobile nav overlay); `aria-current`
  (active desktop nav item); `aria-live="polite"` region announcing the
  CodeReveal role-preview state change; `aria-hidden="true"` on purely
  decorative elements (dots, scroll cue, drag hint label).
- **Touch targets**: mobile nav toggle 44×44px explicitly sized; overlay
  menu items `min-height: 44px`; BackToTop 44px (mobile) / 48px
  (desktop); several mobile-only CSS rules expand tap padding on inline
  links (negative-margin padding trick) without changing visual size.
- **Reduced motion**: see Motion section above.
- **Mobile navigation focus handling**: opening the overlay moves focus
  to its first focusable element; a real focus trap keeps Tab/Shift+Tab
  cycling inside the overlay while open; Escape closes it; closing (by
  any path) restores focus to the toggle button.

## Responsive behavior

Breakpoints actually used in the codebase:

| Breakpoint | Where | Effect |
|---|---|---|
| `max-width: 440px` | Hero eyebrow | Tighter letter-spacing so the eyebrow stays on one line |
| `max-width: 640px` | tokens.css, several components | Compresses `--space-8`/`--space-9`; adjusts tap-padding on inline links |
| `min-width: 700px` | CodeReveal | Track aspect ratio switches 5:4 → 16:9 |
| `min-width: 900px` | Nav, `.container`, Hero visual spacing, BackToTop sizing | **Primary desktop breakpoint** — rail nav on, mobile bar off, container gets rail-offset padding, larger spacing steps |
| `min-width: 1200px` | Hero scroll cue | Cue only shown at this width and up (avoids overlapping the compare exhibit at narrower desktop widths) |

No horizontal overflow is produced at any width from 375px up, verified
directly (not assumed) via `document.documentElement.scrollWidth ===
window.innerWidth` across the full breakpoint set above, at both page-top
and after scrolling.
