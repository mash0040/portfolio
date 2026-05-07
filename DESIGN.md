---
name: Ekene Masha Portfolio
description: A pressroom for the engineer behind the work.
colors:
  canvas: "#020617"
  ink-stockroom: "#1e293b"
  ink-galley: "#334155"
  ink-hairline: "#475569"
  caption: "#64748b"
  hush: "#94a3b8"
  copy: "#cbd5e1"
  copy-emphasis: "#e2e8f0"
  page: "#ffffff"
  spot-cyan: "#0ea5e9"
  spot-cyan-light: "#38bdf8"
  spot-cyan-tint: "#7dd3fc"
  proof-green: "#34d399"
typography:
  display:
    fontFamily: "Fraunces, ui-serif, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontFeature: "'ss01', 'cv11'"
    fontVariation: "'opsz' 144"
  headline:
    fontFamily: "Fraunces, ui-serif, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.015em"
    fontVariation: "'opsz' 144"
  title:
    fontFamily: "Fraunces, ui-serif, Georgia, 'Times New Roman', serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
    fontVariation: "'opsz' 144"
  body-large:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  body-small:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.25em"
  micro:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.075em"
rounded:
  none: "0"
  sm: "2px"
  md: "6px"
  full: "9999px"
spacing:
  page-x: "1.5rem"
  container-max: "72rem"
  section-y-base: "5rem"
  section-y-large: "7rem"
  card-padding: "1.75rem"
  rhythm-eyebrow-to-h1: "1.5rem"
  rhythm-h1-to-tagline: "1.75rem"
components:
  button-primary:
    backgroundColor: "{colors.spot-cyan}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
    typography: "{typography.body-small}"
  button-primary-hover:
    backgroundColor: "{colors.spot-cyan-light}"
    textColor: "{colors.canvas}"
  button-bordered:
    backgroundColor: "transparent"
    textColor: "{colors.copy-emphasis}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
    typography: "{typography.body-small}"
  button-bordered-hover:
    backgroundColor: "transparent"
    textColor: "{colors.page}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.copy}"
    rounded: "{rounded.sm}"
    padding: "0"
    typography: "{typography.body-small}"
  button-ghost-hover:
    backgroundColor: "transparent"
    textColor: "{colors.page}"
  card-project:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.copy}"
    rounded: "{rounded.none}"
    padding: "{spacing.card-padding}"
  card-project-hover:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.copy}"
  eyebrow:
    backgroundColor: "transparent"
    textColor: "{colors.caption}"
    typography: "{typography.label}"
    padding: "0"
  status-pill:
    backgroundColor: "transparent"
    textColor: "{colors.hush}"
    typography: "{typography.label}"
    padding: "0"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.hush}"
    rounded: "{rounded.sm}"
    padding: "0.125rem 0.25rem"
    typography: "{typography.body-small}"
  nav-link-active:
    backgroundColor: "transparent"
    textColor: "{colors.page}"
---

# Design System: Ekene Masha Portfolio

## 1. Overview

**Creative North Star: "The Pressroom"**

A working print shop at the back of an editorial office. Ink, galley proofs, neat columns, no lights but the ones you need. Restraint is the proof of craft. The discipline of the layout is the engineering signal; nothing decorative gets past the proofreader. The visitor encounters the same precision the work itself was made with, and that precision is the argument.

This is itssharl.ee's atmosphere with leerob.com's density. Editorial restraint at the front (Hero, About, case studies set in measured columns and serif type), utility at the back (Projects index and Contact compress into a working table of facts). One voice across both modes.

What this system explicitly rejects: the brittanychiang.com clone (purple-on-black with a sticky sidebar), the AI-SaaS landing template (icon grid skills, identical card grid projects, gradient hero), Awwwards-bait (motion design as the product), itssharl.ee-level animation (a credibility tax for an engineering candidate). When in doubt, choose the version that prints.

**Key Characteristics:**
- Single ink (slate canvas), single spot color (cyan), single signal color (proof green for status)
- Three-voice typography: serif heads (Fraunces with `opsz 144` optical sizing), sans body, mono eyebrows
- Numbered section headers as nameplates, the editorial signature
- Flat surfaces, no shadows, no glass, no gradients except a single radial wash on the hero
- 12-column grid governs long-form pages; squared-corner panels for the project grid
- Motion as feedback, never choreography

## 2. Colors

The palette is one ink, one spot, one signal. Anything more would be ink waste.

### Primary (the spot color)
- **Spot Cyan** (`#0ea5e9`, `oklch(0.685 0.169 237.323)`): The single accent. Carries primary CTAs, the hero radial wash at 14% opacity, the active-nav underline, and link focus rings. Never used for ornament. Never paired with another saturated hue.
- **Press Cyan** (`#38bdf8`): The hover state of Spot Cyan. Appears only as a transient response to user intent, not as a resting color.
- **Tint Cyan** (`#7dd3fc`): Reserved for focus rings on dark canvases. Lighter for legibility against Pressroom Black.

### Secondary

None. The system has one accent on purpose.

### Tertiary
- **Proof Green** (`#34d399`, `oklch(0.765 0.177 163.223)`): The status indicator only. The dot beside "Available for new opportunities" and any future proof-of-life signal. Used at small sizes, never as a fill.

### Neutral (the ink scale)

The ink scale runs from canvas to page, tinted toward the spot cyan's blue family so the surface reads cool, not literal-black.

- **Pressroom Black** (`#020617`, `oklch(0.129 0.042 264.7)`): The canvas. Site background, button text on accent fills.
- **Stockroom Slate** (`#1e293b`): Section dividers, base card border. The first edge that registers above the canvas.
- **Galley Stone** (`#334155`): The underline-link rest border, the bordered-button border. The mid-weight rule.
- **Hairline Stone** (`#475569`): Card border in hover state, link arrow rest color.
- **Caption Grey** (`#64748b`): Mono eyebrows, dot separators between tech tags, list markers, the `01 — Section` numbers.
- **Quiet Grey** (`#94a3b8`): Inactive nav text, secondary body. The text rank just below body.
- **Body Newsprint** (`#cbd5e1`): Default body text on Pressroom Black. Comfortable read at 16-18px.
- **Emphasis Newsprint** (`#e2e8f0`): Bordered-button text, slightly elevated body emphasis.
- **Page White** (`#ffffff`): Headlines and active hover ink. The brightest stop, used sparingly.

### Named Rules

**The Single-Ink Rule.** One canvas, one ink scale tinted toward blue. Pressroom Black through Page White; no warm grays, no decorative tints. If a surface seems to need another color, it is wrong about its job.

**The Spot Color Rule.** Spot Cyan covers ≤10% of any page. Its rarity is the signal. Hero CTA, active-nav underline, focus rings, the 14% radial wash on the hero. Never decorative, never duplicated as a "secondary accent."

**The Signal Green Rule.** Proof Green appears only as a state indicator, never as a fill or text color for non-status content. If it shows up, something is being signaled.

## 3. Typography

**Display Font:** Fraunces (with `ui-serif, Georgia, 'Times New Roman', serif` fallback)
**Body Font:** system sans (`ui-sans-serif, system-ui, sans-serif`), the platform default, deliberately uncomputed.
**Label Font:** JetBrains Mono (with `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` fallback)

Site-wide `font-feature-settings: "ss01", "cv11"` is on at the html root.

**Character.** Three voices, each doing one job. Fraunces with optical sizing set to `144` at every display use is the editorial voice; the wide opsz axis gives headline shapes the breath of a printed broadsheet rather than a screen face. The system sans is utilitarian on purpose: no opinion in body type, so the writing carries the page. JetBrains Mono runs every label, eyebrow, and tech tag at `0.25em` letter-spacing so it reads as set caps, not code.

### Hierarchy
- **Display** (Fraunces 500, `clamp(2.5rem, 7vw, 4.5rem)`, line-height 1.05, `opsz 144`, `tracking-tight`): Hero and case-study H1 only.
- **Headline** (Fraunces 500, `clamp(1.875rem, 4vw, 3rem)`, line-height 1.1, `opsz 144`): Big page-section H2 (About sub-section heads, Projects "Recent" and "Earlier" titles).
- **Title** (Fraunces 500, `1.5rem` to `1.65rem`, line-height 1.2, `opsz 144`): Project card titles, sub-section H3 (e.g. About `02 — Experience` head).
- **Body Large** (sans 400, `1.125rem`, line-height 1.65, color Body Newsprint): Hero tagline, project description on detail page. Capped at the same line-length as Body.
- **Body** (sans 400, `1rem`, line-height 1.65, color Body Newsprint): Default body. Cap line length 65–75ch, which the 12-column grid's `col-span-9 max-w-3xl` lands on naturally.
- **Body Small** (sans 400, `0.875rem`, line-height 1.5): Secondary copy under section heads, project card description.
- **Label** (mono 400, `0.75rem`, uppercase, `0.25em` letter-spacing, Caption Grey): Section eyebrows, footer caption, status pill text. The editorial signature.
- **Micro** (mono 400, `0.6875rem` / 11px, uppercase, `0.075em` letter-spacing): Project card year, tech tags, repo/live actions on cards.

### Named Rules

**The Three-Voice Rule.** Serif for heads, sans for body, mono for labels. Never substitute. A serif label is wrong; a mono headline is wrong; a sans eyebrow is wrong. The voice IS the information class.

**The Optical Sizing Rule.** Every Fraunces instance carries `font-variation-settings: "opsz" 144`. Without it the display face renders as text Fraunces, which looks like the wrong font at headline sizes. The variable axis is non-optional.

**The Set-Caps Rule.** Mono labels are uppercase with `0.25em` letter-spacing (or `0.075em` at micro size). The wide tracking is what makes them read as a nameplate, not a code shout. Sentence-case mono is forbidden in label position.

## 4. Elevation

Flat. No shadows on any element, in any state. Depth is communicated by border weight and color shift, not by light.

A single non-shadow ambient effect exists: a 14%-opacity Spot Cyan radial gradient washed over the upper-left of the hero, masked with a soft radial falloff. It is not elevation; it is a stage light, and it appears nowhere else on the site.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. State changes communicate via border color (Stockroom Slate `#1e293b` to Hairline Stone `#475569`), text color (Quiet Grey to Page White), or position (`translate-x-0.5` on link arrows). No `box-shadow` is used on any component. If a card seems to need lift, the border color brightens, never a drop shadow.

**The One Glow Rule.** The hero's radial Spot Cyan wash is the only ambient color effect on the site. No glows on cards, no auras under buttons, no backdrop-filter anywhere. Adding a second glow breaks the system.

## 5. Components

### Buttons

- **Shape.** Primary CTA and bordered button share a soft rectangle (`6px` / `rounded-md`). Ghost links have no shape; they are underlined text.
- **Primary CTA** (Spot Cyan fill, Pressroom Black text, `0.625rem 1.25rem` padding, medium weight): Used at most once per page, on the primary action. Hero "View projects", project detail "View live", 404 "Back to home". Hover shifts to Press Cyan; focus shows a Tint Cyan `2px` ring with a Pressroom Black ring offset.
- **Ghost link** (no fill, Body Newsprint text, sans medium): The secondary action. Always paired with a chasing arrow → that translates `0.5px` on hover and recolors Caption Grey to Page White. The underline rests on a Galley Stone hairline that brightens to Page White on hover. The workhorse pattern, used everywhere from "Get in touch" to "Back to projects."
- **Bordered button** (Galley Stone border, Emphasis Newsprint text, same shape and padding as primary): The download/utility variant. Used for the resume PDF. Hover lifts the border to Page White. Never placed in close visual proximity to the primary CTA.

### Cards

- **Project Card.** Squared corners (`rounded-none`). A `1px Stockroom Slate` border on a Pressroom Black fill (the same color as the canvas). The border is the only thing that defines the card. Hover brightens the border to Hairline Stone. Padding `1.5rem` on mobile, `1.75rem` at sm. A full-bleed `<Link>` overlay (`absolute inset-0`) covers the card for an accessible click target without nesting interactive elements; its focus state shows a Press Cyan ring.
- **Why squared corners.** Rounded card grids are the SaaS template signature. Squaring them is structural, not stylistic. A magazine card is a panel, not a chip.
- **Internal hierarchy.** Year micro-label (mono uppercase) → Title-rank h2 → 3-line clamp description → tech-tag list with `·` separators → chasing arrow at the bottom-right that translates on hover.

### Inputs / Fields

The current site has no form inputs. When introduced, follow the bordered-button shape: Galley Stone border, Pressroom Black fill, Body Newsprint text, `0.625rem 1rem` padding, `6px` radius, focus ring Tint Cyan with Pressroom Black ring offset. Never rounded-full pill inputs; never a stacked icon.

### Navigation

- **Primary nav.** Top-aligned, full-width, `border-b Stockroom Slate`, Pressroom Black fill. Display logotype set in Fraunces on the left (`text-lg font-medium tracking-tight`); text links on the right (`text-sm font-medium`).
- **States.** Inactive: Quiet Grey, no underline. Hover: Quiet Grey to Page White. Active: Page White text with a `border-b-2 Press Cyan pb-0.5` underline that's the same width as the link itself. The active underline is the only place Press Cyan appears as a 2px rule.
- **Mobile.** A hamburger button toggles a vertical menu under the bar. No drawer, no overlay; the menu pushes content down. Escape closes.
- **Skip link.** A `focus:not-sr-only` "Skip to content" pill, Spot Cyan fill, Page White text. WCAG-mandated; visually consistent with the primary CTA.

### Numbered Section Header (signature)

The single most distinctive component. Used on every long-form page: Home, About, Projects, ProjectDetails. Two-tier label.
- **Eyebrow:** mono uppercase `0.75rem` with `0.25em` letter-spacing in Caption Grey.
- **Number:** the leading `01`, `02`, etc. set in Quiet Grey, one rank brighter than the rest of the label.
- **Format:** `01 [non-breaking space] — [non-breaking space] Stack`. Note: the surrounding `&nbsp;` and the em-dash are part of the editorial signature here. (Tension worth flagging: the impeccable shared design laws ban em-dashes in copy. This use is in the label component, not narrative copy. If the dash must go, replace with a thin pipe `|` or middle dot `·`. Don't downgrade to a hyphen.)
- **Companion.** On About and ProjectDetails, the eyebrow lives in `col-span-3` of a 12-col grid, with section content in `col-span-9`. The grid IS the layout doctrine.

### Status Pill (signature)

A single 6px Proof Green dot (`bg-emerald-400 h-1.5 w-1.5 rounded-full`) with a 2px Proof Green at 20% opacity ring, followed by uppercase mono `text-[11px]` Quiet Grey label. Used exclusively for "Available for new opportunities" on the hero. Never repurposed.

### Tech Tag List (signature)

A horizontal mono list with `·` middle dot separators between items (rendered as Galley Stone). Used on Project Cards and ProjectDetails to surface the stack without claiming visual weight. Never replaced with chip pills, badges, or icon rows.

## 6. Do's and Don'ts

### Do:
- **Do** keep one accent (Spot Cyan, `#0ea5e9`) on ≤10% of any page. The rarity is the point.
- **Do** set every Fraunces use with `font-variation-settings: "opsz" 144`. Required.
- **Do** use the numbered section header (`01 — Stack`, mono uppercase, `0.25em` tracking, Caption Grey) on every long-form page section. It is the editorial signature.
- **Do** follow the `max-w-6xl px-6` container and `py-20 sm:py-28` section padding for vertical rhythm.
- **Do** apply the 12-col `col-span-3 / col-span-9` magazine grid on About and ProjectDetails section bodies. That is where the "magazine front" lives.
- **Do** keep the Project Card squared (`rounded-none`). The border is the card.
- **Do** chase every link with an arrow → that translates `0.5px` on hover and brightens from Hairline Stone to Page White.
- **Do** respect `prefers-reduced-motion`: collapse all transitions to instantaneous on the few transitions in the system.

### Don't:
- **Don't** add purple, magenta, or any second accent. Spot Cyan is the only color the site is allowed to feel. (Carries PRODUCT.md anti-reference: brittanychiang.com clone aesthetic.)
- **Don't** add a sticky scroll-spy sidebar with section indicators. That is the brittanychiang.com clone signature; refused on sight.
- **Don't** lay out skills as an icon grid. The list-with-mono-labels in About is the format. Icons are forbidden in skill display. (Carries PRODUCT.md anti-reference: AI SaaS landing template.)
- **Don't** use identical card grids beyond the Project Card itself. The site has one card pattern; introducing another is the AI-SaaS template tell.
- **Don't** use `box-shadow` anywhere. The system is flat. If you reach for a shadow, the answer is a border-color shift.
- **Don't** use `background-clip: text` with a gradient on headlines or anywhere else. Gradient text is banned.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored stripe on cards, callouts, or list items. Side stripes are forbidden by the impeccable shared design laws.
- **Don't** introduce scroll-driven animation, parallax, custom cursors, or motion choreography. (Carries PRODUCT.md anti-references: Awwwards-bait, itssharl.ee-level animation.)
- **Don't** use `#000` or raw `#fff` outside the existing single Page White use. Pressroom Black (`#020617`) is the canvas; warmer or cooler near-blacks are forbidden.
- **Don't** add a second hero glow, an aura under buttons, or any glassmorphism / `backdrop-filter` effect. The hero radial wash is the only ambient color effect in the system.
