# DESIGN.md — animeshsrivastava24.github.io

Direction: **a signal constellation.** The home page is a 16-point constellation
(the dot pattern used to read radio signals), drawn on deep teal. Six points are
the site's sections. The idea comes from the work itself: RF/PHY Layer-1 firmware
turns noisy signals into clean points. Premium comes from restraint: one accent,
one font family, one signature moment.

Not based on a UXKIN comparison (not connected).

## Principles

- Spend boldness in one place: the constellation and its "signal lock" on load.
  Everything else is quiet and readable.
- The constellation stays on the home page. Inner pages share one calm layout
  and carry the idea only as a mini map in the header (current section in amber).
- Projects are always told the same way: Problem, Solution, Blueprint.
- Motion answers the visitor: sparkle on hover, ripple on section points,
  zoom between the map and a page. No scroll-triggered entrance effects.

## Color

| Token | Value | Role |
|---|---|---|
| `--bg` | `#0F2A2C` | Home background (with a radial glow) |
| `--bg-deep` | `#0B2224` | Home background edge |
| `--page` | `#102D2F` | Inner page background |
| `--card` | `#133436` | Cards, preview popovers |
| `--well` | `#0C2527` | Blueprint panels |
| `--ink` | `#ECF5F3` | Primary text, section points |
| `--ink-2` | `#C9DAD7` | Body copy in long sections |
| `--muted` | `#93B0AC` | Secondary text (6.9:1 on page) |
| `--line` / `--line-2` | `#24464A` / `#2C5255` | Dividers, borders |
| `--dim` | `#3B6467` | Plain constellation dots |
| `--amber` | `#F2C14E` | The one accent: active point, metrics, current section, links |
| `--glint` | `#FFE7A8` | Sparkle highlight only |

## Typography

One family: **Outfit**, self-hosted (`assets/fonts/outfit.woff2`), weights 400 and 500.

| Use | Size | Line height |
|---|---|---|
| Home headline | clamp(50px, 6.1vw, 88px) | 0.96 |
| Page title | clamp(42px, 6vw, 72px) | 1.0 |
| Section title | clamp(26px, 2.6vw, 32px) | 1.2 |
| Metric | clamp(36px, 4vw, 52px) | 1.0 |
| Body | 17–18px | 1.55–1.65 |
| Small / meta | 13–15px | 1.4–1.5 |

Sentence case everywhere. No all-caps labels, no monospace labels.

## Spacing and shape

Page padding `clamp(20px, 5.5vw, 80px)`. Content width 1280px, text measure about 680–780px.
Radius: 12px for blueprint nodes, 16–18px for panels and popovers, 22px for agent cards, pill for buttons and chips.
One shadow, only on floating preview cards.

## Components

- **Constellation point**: white dot, title, one-line subtitle. Hover/focus: amber, ripple rings, preview card.
- **Mini map**: 4×4 grid, current section amber, other sections clickable.
- **Row**: year, title, description, optional chips and a link. Used for projects, awards, education and publications.
- **Case study**: numbered Problem / Solution / Blueprint (numbers because it is a sequence).
- **Blueprint flow**: HTML boxes and arrows; becomes vertical on phones.
- **Timeline**: amber node for the current role, metrics above the bullet list.
