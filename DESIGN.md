# DESIGN.md — animeshsrivastava24.github.io

Direction: **engineering magazine on cream paper.** It continues the
@thestackpointer brand (cream, DM Serif Display + DM Sans, gold / red / green)
so LinkedIn readers recognise it. Motion comes from the work itself: an RF
waveform, a boot log, a register being written. Nothing is decorative without
a reason.

Not based on a UXKIN comparison (not connected). Based on the existing brand.

## Color

| Token | Value | Role |
|---|---|---|
| `--paper` | `#F4EEE1` | Page background |
| `--paper-2` | `#EBE2CF` | Alternate bands, figure backgrounds |
| `--ink` | `#1C1A16` | Body text, primary buttons, strong rules |
| `--ink-2` | `#4A4539` | Secondary text (8:1 on paper) |
| `--ink-3` | `#6E6656` | Labels, captions (4.8:1 on paper) |
| `--rule` | `#D3C7AD` | Hairline borders and dividers |
| `--red` | `#A8352A` | The one accent: section numbers, active nav, highlights (5.6:1) |
| `--gold` | `#C9962E` | Waveforms, marker highlight, metrics on dark (decorative on paper) |
| `--gold-deep` | `#8A5E0F` | Gold used as text on paper: timestamps, link underline (4.9:1) |
| `--green` | `#2E6A4C` | Status / log tags only (5.4:1) |
| `--night` | `#16140F` | Dark section background (AI agents) |
| `--night-2` | `#211E17` | Cards on dark |
| `--night-text` / `--night-muted` | `#EFE7D6` / `#B5AA92` | Text on dark (16:1 / 7.9:1) |

No gradients on text, no purple, no glass.

## Typography

- Display: **DM Serif Display** (headings, numbers, big statements)
- Body: **DM Sans** 400/500/600
- Technical labels: **DM Mono** 400/500 (timestamps, register fields, kickers)

| Step | Size | Line height | Use |
|---|---|---|---|
| hero | clamp(64px, 12.5vw, 184px) | 0.9 | Name |
| d1 | clamp(56px, 10vw, 150px) | 0.95 | Contact headline |
| h2 | clamp(36px, 5vw, 60px) | 1.05 | Section titles |
| scrub | clamp(28px, 3.6vw, 48px) | 1.18 | Summary statement |
| h3 | 26–32px | 1.1 | Role and card titles |
| body | 17px (16px in lists) | 1.6 | Text, max 68ch |
| label | 12–13px mono, +0.06em, uppercase | 1.4 | Kickers, metadata |

## Spacing

8px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding
clamp(80px, 12vw, 160px). Content width 1160px; text measure 680px.

## Shape and depth

Radius 2px (buttons, chips) and 4px (cards). No soft shadows. One hard shadow,
`6px 6px 0 var(--ink)`, only on project-card hover. Structure comes from 1px rules.

## Components

- **Button primary**: ink fill, paper text; hover red; focus 2px gold-deep outline, 3px offset.
- **Button quiet**: text with underline that grows on hover.
- **Kicker**: mono number in red + label + rule to the edge.
- **Log line**: timestamp (gold-deep mono) · tag (green mono) · message; metrics get a gold marker highlight.
- **Register map**: 32 bit cells in 8 four-bit fields, bits set as you scroll; table below lists each field.
- **Card**: 1px ink border, mono file-path header, figure on paper-2, body.
- **Nav**: transparent at top, paper with hairline after scrolling; red active link.

## Motion

- Hero: I/Q waveform (gold/red) that flattens as you scroll; name letters rise on load.
- Left gutter (≥1320px): a waveform trace draws down the page with scroll.
- Summary words light up with scroll; counters count up once.
- AI agents: pinned section that scrolls sideways (≥900px), stacks on mobile.
- Experience: lines type in like a boot log; a red rail fills down the timeline.
- Skills: register bits flip to 1 as you scroll; hex value updates.
- Everything respects `prefers-reduced-motion` (all content shown, no movement).

## Imagery and icons

No stock photos. Inline SVG line diagrams only (threads, graphs, memory maps),
drawn in ink/gold/red with 1.5px strokes. Arrows are text glyphs (→ ↗).

## Site structure (v2)

- **Home**: small name and profile on the left; an index of 11 page tiles on the right
  (4 × 3 grid, the 12th cell is a live signal tile). The I/Q waveform runs under the fold.
- **Tile**: 1px ink grid lines, line icon (48px, 1.5px stroke, one red accent), number,
  serif label, mono caption, ↗. Hover inverts to ink with gold accents and redraws the icon.
- **Page head** (every page): ← Home, page number "NN / 11", icon + serif H1 with red italic word, lede.
- **Next link** at the bottom of every page chains the pages in tile order, back to Home.
- **Nav**: AS mark, current page, Contact, and "All pages" overlay listing every page.
- **Diagram figure**: ink-bordered card, mono header (Fig. NN — title · tag), SVG on paper-2
  with boxes (paper fill, ink stroke; ink fill = output; red stroke = the critical step), caption.
