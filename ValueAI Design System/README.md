# ValueAI Design System

**Product:** [valueai.com](https://valueai.com) — a website where users compare AI subscription plans, understand model capabilities, and find the best value for their needs.

**Sources used:** Greenfield brand — invented from scratch. References studied: ready.so, chiaraluzzana.com, superlist.com, slite.com, monographcomms.ca.

---

## Overview

ValueAI is a technical intelligence product dressed as editorial media. It treats AI plan data the way Bloomberg treats financial data — structured, precise, scannable — but with a cinematic dark aesthetic and terminal/command-line visual DNA. The brand is for a mixed audience who want signal, not marketing fluff.

---

## Products / Surfaces

| Surface | Kit location |
|---|---|
| Marketing site (homepage, compare, model detail, blog) | `ui_kits/marketing/` |

---

## Content Fundamentals

**Voice:** Third-person observational, then second-person action. Starts with a precise claim, ends with a clear choice. No exclamation marks. No "powerful", "revolutionary", or "cutting-edge".

**Tone:** Technical & precise. Data leads. Opinions are stated as conclusions, not pitches. Write like a benchmarking lab, not a startup.

**Casing:** Sentence case for all UI labels, headings, and CTAs. `MONO CAPS` for metadata labels, categories, status tags. Never title-case prose.

**Emoji:** Never used in UI or copy. Reserved only for changelog reactions.

**Numbers:** Always exact. "$20/mo" not "twenty dollars per month." Prefer "GPT-4o" over "OpenAI's latest model."

**Pronouns:** "You" for user benefit statements. "We" only in changelog/blog context.

**Examples:**
- ✅ `Find the plan that fits your workflow — not your FOMO.`
- ✅ `Claude 3.5 Sonnet. Best context window under $30/mo.`
- ❌ `Discover the power of AI today!`
- ❌ `Our cutting-edge platform helps you unlock AI potential.`

**Micro-copy:** Labels use `MONO CAPS`. Descriptions use lowercase sans. Prices use mono. Deltas use `+/−` notation.

---

## Visual Foundations

### Color
- **Surfaces:** 5 steps from near-black `#05070b` (page void) → `#1f2533` (pressed state)
- **Foreground:** 4 steps from `#e8ecf4` (primary) → `#3e455a` (disabled)
- **Electric blue** `#4d7cff` — primary action, CTAs, selected states
- **Phosphor cyan** `#5fd9ff` — secondary accent, data highlights, cursor blink
- **Deep ultraviolet** `#8a5cff` — tertiary, tags, special callouts
- **Value scale:** 5-step green→red for plan-value ratings (`--value-5` → `--value-1`)
- **Semantic:** `--good` green, `--warn` amber, `--bad` red

### Typography
- **JetBrains Mono** — primary display for numbers, labels, metadata, eyebrows. The dominant voice of the brand. Terminal aesthetic.
- **Inter Tight** — headlines, body copy. Tight tracking at large sizes; normal at body.
- **Instrument Serif italic** — editorial accent only; used sparingly in hero or pull quotes.
- **Scale:** `--t-mega` (clamp 56→144px) for hero numbers/stats; `--t-display` for hero headlines; `--t-h1`→`--t-h4` for content hierarchy.

### Backgrounds
- **Base:** `--bg-0` void black with optional `--scanline` CSS texture overlay (repeating horizontal line 3px pitch, 1% opacity) — barely visible, adds tactile depth
- **Grid lines:** `--gridlines` CSS var for engineering-paper bg on select sections
- **No images as section backgrounds.** Photography used only in model/provider cards (greyscale, slightly grained).
- **Gradients:** subtle radial glows only — `rgba(77,124,255,0.08)` bloom behind hero. Never full-bleed color gradients.
- **No decorative illustrations.** Data and typography ARE the visual.

### Cards
- Background: `--bg-2`
- Border: `1px solid var(--line-2)`
- Radius: `var(--r-3)` (6px) — not pill, not square. Tight.
- Shadow: `var(--shadow-2)`
- Hover: background lifts to `--bg-3`, border brightens to `--line-3`
- Electric glow on selected/active: `var(--glow-electric)`

### Borders
- `--line-1` hairline dividers (table rows, section separators)
- `--line-2` card / input borders
- `--line-3` focus / hover emphasis
- No decorative borders. Borders are structural.

### Spacing
4px base grid. Prefer `--sp-5` (24px) for component inner padding; `--sp-7` (48px) for section gaps; `--sp-9` (96px) for major section breathing room.

### Animation
- **Easing:** `--ease-out` for reveals; `--ease-spring` for interactive elements (hover lift, selection snap)
- **Durations:** 120ms (micro), 220ms (standard), 420ms (page-level)
- **Hover:** background + border color transition, slight Y translate (`-2px`) on cards
- **Press:** scale `0.97` + background drops to `--bg-4`
- **No bouncy animations.** Spring reserved for selection indicators and modals.
- **Scroll-triggered:** fade+translate(0,24px) reveals — not parallax.
- **Cursor blink** on logo: 1.1s `opacity` cycle using CSS animation.

### Corner Radii
`--r-1` (2px) for inline code/kbd; `--r-2` (4px) for tags/chips; `--r-3` (6px) for cards/inputs; `--r-pill` for badges/labels. Strictly no large radius (>10px) except pill.

### Shadows & Glow
Three shadow levels (subtle inset highlight + drop). Glow rings (`--glow-electric`, `--glow-cyan`) on focused/active elements — not decorative glows. Used sparingly.

### Imagery
- Provider logos: wordmarks on dark bg, desaturated or white
- Photography: grayscale, slight grain, never full-bleed decorative
- No AI-generated illustrations. No decorative SVG art.

### Layout
- Max content width: `1280px`, gutter `32px`
- Asymmetric grid common: left-heavy with 60/40 or 70/30 splits
- Sticky column headers in comparison tables
- Fixed top nav, no sidebar nav on marketing site

### Hover & Press States
- **Hover:** `--bg-3` bg, `--line-3` border, `translateY(-2px)`, `var(--dur-base)` transition
- **Press:** `scale(0.97)`, `--bg-4` bg
- **Focus:** `--glow-electric` box-shadow
- **Disabled:** `--fg-4` text, `--bg-2` bg, no hover effects

---

## Iconography

- **No custom icon system.** Icons used sparingly and functionally only.
- **Lucide Icons** (CDN: `https://unpkg.com/lucide@latest`) — stroke icons, 1.5px weight, 20px default size. Matches the technical/precise aesthetic.
- **No icon fonts.** No emoji as icons. No filled icons except for value rating dots.
- **Usage:** nav UI only, inline with text only at small sizes. Section headings never have icons.
- **Value rating dots** (`●●●●○`) are unicode characters styled with the value scale colors, not icon components.
- **Terminal caret** `›` and bracket `[` `]` used as brand punctuation, not icons.
- **Logo mark:** custom SVG bracket-V in `assets/logo-mark.svg`

---

## File Index

```
colors_and_type.css        — CSS custom props: colors, type, spacing, motion, layout
assets/
  logo.svg                 — Full wordmark, dark bg, animated cursor
  logo-mark.svg            — Square icon mark
  logo-wordmark-light.svg  — Wordmark for light backgrounds
preview/                   — Design system preview cards (registered in asset review)
ui_kits/
  marketing/               — Marketing site UI kit
    index.html             — Full interactive prototype
    components/            — Individual JSX components
slides/                    — Slide deck templates
SKILL.md                   — Agent skill definition
```
