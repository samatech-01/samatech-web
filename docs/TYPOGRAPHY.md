# Typography refinement

9 November 2026. Scope: fonts, font size/weight, letter spacing, line height, readability. No changes to React components, layout grids/breakpoints, animations, colors, routing, product data, activation flow, download URLs, domain, or deployment workflow.

## Font system

- Plus Jakarta Sans, normal variable 600–800: headings and mockup application names. Hero 800, page titles 750, section/card titles 650–700. Modest negative tracking, line heights 1.12–1.35.
- Inter, normal variable 400–700: body, navigation, buttons, UI and form controls. Body 400 with line height 1.7–1.75, navigation 500, buttons 600. Existing miniature illustration and logo retain their scale; decorative font weights outside the Inter range resolve to the closest available weight without synthetic bold.
- `clamp()` scales hero, page, section and card headings; tablet/mobile heading sizes are tuned for the existing two-column/stacked layouts.
- Descriptions are 16–17 px; important supporting text, navigation and CTAs are at least 14 px. Small text inside mockups/decorative labels remains illustrative, not primary content.
- Existing blue text gradient remains limited to the hero accent.

## Loading and licensing

Two official Google Fonts Latin WOFF2 files are self-hosted under `public/fonts`, totaling 75,604 bytes (~73.8 KiB). Only normal style is downloaded. Both have SIL Open Font License 1.1 notices included. See [font provenance](../public/fonts/README.md).

The HTML preloads both fonts with matching URLs, WOFF2 MIME and crossorigin. CSS uses `font-display: swap`, explicit line heights, and system sans-serif fallbacks. Same-origin preload avoids the extra Google stylesheet/CDN connection chain and reduces font-swap delay. No external font request occurs when visitors open the site. CLS still requires browser measurement; preload does not guarantee zero layout shift.

## Files

- `index.html`: two font preloads.
- `src/styles.css`: font faces, font-family tokens, responsive typography, sizes/weights/line heights/tracking. Existing geometry and animation declarations retained.
- `public/fonts/inter-latin-variable.woff2`
- `public/fonts/plus-jakarta-sans-latin-variable.woff2`
- `public/fonts/Inter-OFL.txt`
- `public/fonts/Plus-Jakarta-Sans-OFL.txt`
- `public/fonts/README.md`
- This report.

## Validation

- Production build passed, no warnings.
- `npm run check`: 3 passed.
- `npm run audit:render`: 7 pages and 2 fallbacks passed, including links, image alt/assets, and product addition from local data.
- Both WOFF2 files have valid signatures and declared binary lengths.
- Preview HTTP 200 for HTML and both fonts; font responses use `font/woff2`.
- JS bundle unchanged at 418.55 kB / 133.35 kB gzip. CSS approximately 40.84 kB / 9.88 kB gzip, plus separately cached font files.
- Important text sizes and existing wrapping behavior were reviewed in source for desktop/tablet/mobile. No browser rendering, text clipping/overflow measurement, actual font-selection check, or CLS measurement is claimed by these source/build/HTTP checks. Visual browser verification remains to be completed when browser access is available.

No push or deployment performed.
