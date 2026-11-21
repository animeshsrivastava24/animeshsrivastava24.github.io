# animeshsrivastava24.github.io

Personal site of Animesh Srivastava: embedded firmware engineer (RF/PHY Layer-1 drivers for Snapdragon modems, RTOS, AI debug agents).

Plain HTML, CSS and JavaScript. No build step, no dependencies, no external requests (the Outfit font is self-hosted).
Design decisions are in `DESIGN.md`.

## Structure

The home page is a signal constellation: six of its 16 points are the site's sections. Every inner page carries a mini map of the same grid in its header.

| File | Page |
|---|---|
| `index.html` | Home: name, intro and the constellation map |
| `projects.html` | Projects list and planned builds |
| `projects/*.html` | One case study per project: problem, solution, blueprint |
| `experience.html` | Timeline, skills and education |
| `ai.html` | AI debug agents, MCP servers and the stack |
| `learning.html` | Learning paths |
| `awards.html` | Awards and selections |
| `publications.html` | Papers with DOI links |
| `404.html` | Not-found page |
| `assets/site.css` | All styles. Colours and fonts are CSS variables at the top |
| `assets/site.js` | Constellation, hover effects and page transitions |
| `assets/fonts/outfit.woff2` | Outfit (SIL Open Font License) |

Old page URLs (`agents.html`, `ai-work.html`, `mcp.html`, `skills.html`, `diagrams.html`, `writing.html`, `education.html`, `contact.html`) redirect to their new homes so existing links keep working.

## Editing

- Each page's content is plain HTML in its own file.
- Home map labels and hover previews: the JSON block with `id="points"` near the end of `index.html`.
- Photo: `assets/photo.jpg` (square, 480×480, metadata stripped). Replace the file to change it; the site tints it to match the palette.

## Motion

- Home: points start scattered and lock into the grid once per visit; plain dots sparkle on hover; section points ripple and show a preview card.
- Moving from the home map to a section zooms in from that point; going back shrinks into it. This uses cross-document View Transitions (Chrome, Edge, Safari 18.2+); other browsers navigate normally.
- Everything respects `prefers-reduced-motion`.

GitHub Pages publishes the `main` branch root.
