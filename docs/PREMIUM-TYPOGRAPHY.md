# Premium typography — Manrope + Inter

9 November 2026. Typography-only refinement of the approved dark store design.

- Manrope normal variable WOFF2 (600–800): headings, hero, section titles, application names in cards/detail/recommendations/download bar. Hero 800, tracking -0.04em, line-height 1.1, responsive clamp. Section/application headings 700, tracking -0.025em.
- Inter normal variable WOFF2 (400–700): body, sidebar/bottom navigation, search, buttons, labels, specifications, footer. Body 400 and line-height 1.6; navigation 500; buttons 600.
- Normal kerning, optical sizing, antialiasing, balanced heading wrapping and existing soft white/gray colors. No added text shadow or gradient. Existing anywhere wrapping/min-width behavior protects long application names; actual viewport stress measurement is not claimed.
- Two same-origin preloads, font-display swap and system sans-serif fallbacks. New Manrope file is 24,532 bytes; Inter remains 48,256 bytes. Both are official Google Fonts Latin WOFF2 with SIL OFL licenses. Old Plus Jakarta Sans assets remain available but are not loaded.

Changes are limited to font loading and typography declarations. An edit-time comparison excluded typography properties and confirmed existing layout, color, motion and geometry declarations were unchanged. React components, product catalog, routing, download/activation logic and Pages configuration were not edited.

## Validation

- `npm run build`: successful, no warnings; JS 424.07 kB / 135.16 kB gzip (unchanged), CSS 38.37 kB / 8.90 kB gzip.
- `npm run check`: 3 passed.
- `npm run audit:render`: 7 pages + 2 fallbacks passed.
- `npm run test:store`: desktop/mobile media-state DOM scenarios passed.
- `npm run test:detail`: normal/reduced-motion gallery scenarios passed.
- Both WOFF2 signatures/declared lengths are valid. Preview serves both font URLs with HTTP 200 and font/woff2 MIME.
- Font preloads reduce load delay; explicit line heights and fallbacks remain. A numeric CLS result requires browser measurement and is not inferred from preload alone.
- Browser visual desktop/mobile rendering, actual chosen font, clipping/horizontal overflow and CLS remain unverified without working browser access. DOM tests do not measure layout geometry.

Changed: `src/styles.css`, `src/pages/product-detail.css`, `index.html`, new Manrope WOFF2/OFL files, `public/fonts/README.md`, `README.md`, and this report. No dependencies added, push or deployment performed.
