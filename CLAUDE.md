# MHQ – Personal Brand Website

## Project Overview

Premium personal brand website for a strategic technical professional.
Positioning: bridge between engineering complexity and business clarity.
Brand tagline: *"Engineering doesn't fail. How it's understood does."*
Framework acronym: **MHQ = Message · Humanity · Quality**

---

## Project Structure

```
/
├── index.html          # Single-page site, all sections here
├── css/
│   ├── tokens.css      # Design tokens (colors, typography, spacing)
│   ├── components.css  # Buttons, cards, dividers
│   ├── layout.css      # Grid, containers, sections
│   └── animations.css  # Motion system
├── js/
│   └── main.js         # Scroll animations, anchor smoothing, micro-interactions
├── assets/
│   └── images/         # One professional photo only
└── docs/
    ├── design-system.md    # Full visual spec (reference with @docs/design-system.md)
    └── copy.md             # Section copy and content (reference with @docs/copy.md)
```

---

## Dev Commands

```bash
# Preview locally (no build step required – pure HTML/CSS/JS)
open index.html
# or
npx serve .

# Validate HTML
npx html-validate index.html

# Check CSS
npx stylelint css/**/*.css
```

---

## Tech Stack

- **HTML5** – semantic markup only
- **CSS3** – custom properties (no Tailwind, no frameworks)
- **Vanilla JS** – ES6+, no jQuery, no heavy libraries
- **GSAP** – allowed only for scroll reveal; keep subtle
- **No build tools required** – ship-ready static files

---

## Page Structure (DO NOT REORDER)

```
1. HERO
2. TRUST STRIP
3. PROBLEM
4. SOLUTION
5. MHQ FRAMEWORK
6. WHAT I DO
7. EXPERIENCE
8. ABOUT
9. CTA
```

Each section uses the class pattern: `.section--[name]` (e.g. `.section--hero`, `.section--problem`)

---

## Design Tokens (Source of Truth)

Always use CSS custom properties. Never hardcode colors or spacing.

```css
/* Colors */
--bg-primary: #0B0F1A;
--bg-secondary: #101626;
--bg-card: #111827;
--text-primary: #EAEAEA;
--text-secondary: #A0A8B8;
--gold-1: #D4AF37;
--gold-2: #FFD700;
--accent-blue: #3B82F6;

/* Typography */
--font-heading: 'Playfair Display', serif;
--font-body: 'Inter', sans-serif;
--text-hero: clamp(48px, 5vw, 64px);
--text-section: clamp(28px, 3vw, 40px);
--text-sub: clamp(18px, 2vw, 24px);
--text-body: 16px;

/* Spacing (8px grid) */
--space-1: 8px;
--space-2: 16px;
--space-3: 24px;
--space-4: 32px;
--space-6: 48px;
--space-8: 64px;
--space-10: 80px;
--space-15: 120px;
--section-padding: 100px;

/* Layout */
--container-max: 1200px;
--text-max: 600px;
--radius-card: 8px;
--radius-btn: 6px;
```

---

## Coding Rules

### HTML
- Semantic elements only: `<section>`, `<article>`, `<nav>`, `<header>`, `<main>`, `<footer>`
- BEM class naming: `.block__element--modifier`
- No inline styles – ever
- One `<h1>` per page (hero headline)
- All images need `alt` text and explicit `width`/`height`

### CSS
- CSS custom properties for all design values (see tokens above)
- Mobile-first: write base styles for mobile, use `min-width` media queries to scale up
- Breakpoints: `768px` (tablet), `1200px` (desktop)
- Max text container width: `var(--text-max)` (600px)
- Section vertical padding: `var(--section-padding)` minimum
- No `!important` unless overriding third-party

### JavaScript
- Vanilla ES6+ only
- Use `IntersectionObserver` for scroll-triggered animations
- Smooth anchor scrolling via `scroll-behavior: smooth` + JS fallback
- No DOM manipulation before `DOMContentLoaded`

---

## Component Specs

### Buttons

```css
/* Primary */
.btn--primary {
  background: linear-gradient(135deg, var(--gold-1), var(--gold-2));
  color: #000;
  padding: 12px 24px;
  border-radius: var(--radius-btn);
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
}
```

### Cards

```css
.card {
  background: var(--bg-card);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--radius-card);
  padding: var(--space-3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(212, 175, 55, 0.08);
}
```

---

## Animation Rules

### Scroll Reveal (Apply to every section)
```css
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Stagger (Framework cards)
- Delay each card: `transition-delay: calc(0.1s * var(--index))`

### Forbidden animations
- No bounce, elastic, or spring easing
- No parallax scroll effects
- No autoplay video or looping GIFs
- No animation duration under 0.6s for primary reveals

---

## Gold Usage Rules

Gold is used **only** for:
- Primary CTA buttons
- Emphasized words in headlines (wrap in `<span class="text--gold">`)
- Active nav indicator
- Card hover glow

Gold is **never** used for:
- Body text
- Backgrounds
- Borders (except subtle card hover)
- Decorative icons

---

## Layout Rules

```
Hero:     2-column (text left 60% | image right 40%)
Problem:  Single column, centered, max-width 700px
Solution: Single column, centered
MHQ:      3-column card grid
What I Do: 2-column list
Experience: Timeline, single column
About:    2-column (image left | text right)
CTA:      Single column, centered
```

---

## Anti-Patterns (Reject These)

- Hardcoded hex values outside `tokens.css`
- Gradient backgrounds on anything other than primary buttons and hero overlay
- More than 2 font families loaded
- CSS animations using `bounce`, `elastic`, or `steps()`
- Any stock photo or icon library (Flaticon, Unsplash, etc.)
- Inline `style=""` attributes
- More than 3 color variants in any single section
- Generic class names: `.container1`, `.box`, `.wrapper2`
- Missing `transition` on interactive elements

---

## Workflow Instructions

When building a new section:
1. Write semantic HTML structure first
2. Apply layout CSS (grid/flex)
3. Apply design tokens for colors and spacing
4. Add `.reveal` class and ensure JS observer targets it
5. Check mobile (375px) before desktop
6. Validate against token usage – no hardcoded values

When adding a new component:
- Add CSS to `components.css` only
- Name with BEM: `.component-name__element--modifier`
- Test hover and focus states

---

## Quality Checklist (Run Before Marking Any Section Done)

- [ ] Spacing uses only `--space-*` tokens
- [ ] Colors use only CSS custom properties
- [ ] Section has scroll reveal animation
- [ ] Mobile layout works at 375px
- [ ] No inline styles present
- [ ] Gold used only per Gold Usage Rules
- [ ] Text columns don't exceed `var(--text-max)` (600px)
- [ ] Interactive elements have hover + focus states

---

## What NOT to Put in This File

Extended design rationale, copy/content, and full visual spec live in:
- `@docs/design-system.md` – full visual language reference
- `@docs/copy.md` – section headlines, body copy, CTAs

Reference those files only when working on specific sections that need them.
