# Portfolio delivery improvements

November 27, 2026. The static Next.js export and original evidence files are preserved.

## Measured asset sizes

The generated delivery manifest covers 135 referenced raster assets. Of those, 111 unique large sources received WebP delivery copies. Comparing each unique original with its generated delivery at up to 1280px gives 53,591,452 bytes versus 8,773,276 bytes: approximately 84% less image data for that comparison. This is a file-size measurement, not a claim that page loading is 84% faster.

| Asset | Original | Delivery copy |
| --- | ---: | ---: |
| Hero artwork | 1,226,996 bytes | 48,822 bytes at 1280px |
| Monogram | 517,795 bytes | 12,240 bytes at 320px; the header requests the smaller 160px variant |
| NeuraNote opening preview | 2,655,874 bytes | 36,318 bytes at 1280px |

The artwork's `.jpg` source is actually PNG-encoded. Full-resolution originals remain available for evidence links. The shared image component supplies responsive candidates, natural dimensions, asynchronous decoding, and lazy loading; critical artwork remains eager. SVG-framed HABITat artwork also uses its compact delivery copy.

## Critical path and interaction

- Eight locally hosted Latin variable font faces replace the external Google Fonts stylesheet. Only the two primary faces are preloaded; other faces load when used. Redistribution licenses are in `public/fonts/`.
- The header icon is a 2,318-byte PNG rather than the full-resolution monogram.
- Homepage reveal motion no longer sets content opacity to zero. A short movement remains, without a fade-in wait. The headline and main action also appear immediately, replacing the masked headline and delayed entrance sequence.
- The background mesh drops from 672 triangles per frame to 192 on desktop and 80 on mobile. Existing offscreen, background-tab, reduced-motion, and startup-continuity behavior remains tested.
- Manual walkthroughs use `preload="none"`. Selecting a billing timestamp explicitly loads metadata when needed; it still pauses at that timestamp.
- Auto-playing previews mount video sources only near the viewport and pause on exit or when the document is hidden. Posters use compact copies where available.
- All-work links defer automatic route prefetch but prefetch on pointer or keyboard intent; primary navigation keeps Next's normal prefetch behavior.
- Content-hashed image/font paths receive immutable cache rules in `render.yaml`. Those hosting rules depend on the service's Blueprint configuration being synchronized; do not assume a Git push alone changes an independently configured Render service's headers.

## Regenerating media

`scripts/prepare-responsive-media.mjs` requires `sharp` in the local generation environment (or `PORTFOLIO_SHARP_PATH`). It performs uncropped resizing and WebP encoding, deduplicates identical sources, and removes stale generated variants. Generated files are committed, so deployments require no image codec or additional build dependency.

Verification includes browser checks of actual `currentSrc`, preserved visual layout, desktop/mobile navigation and galleries, native video chapters, and the production static build. No Lighthouse score or real-user timing improvement is asserted without an independent measurement.

Implementation references: [Render static headers](https://render.com/docs/blueprint-spec#static-sites), [Next.js 14 navigation and prefetch](https://nextjs.org/docs/14/app/building-your-application/routing/linking-and-navigating).
