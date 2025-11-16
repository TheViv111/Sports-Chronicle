## Findings
- Mobile performance is 77 vs desktop 95 due to slower CPU/network and heavier critical path on mobile.
- Largest Contentful Paint is delayed ~3.5s by a large image in the first viewport and oversized assets.
- Render‑blocking requests and third‑party font loading increase time to LCP.
- Image delivery is inefficient: the logo is ~112 KB served at ~113×88 display size; PSI estimates ~110 KB savings.
- Unused JavaScript across vendor chunks is present; initial data queries and carousel logic add work before LCP.
- Local preview console errors (`/_vercel/...`, `/src/...`) come from development‑only preloads and Vercel scripts not available in preview; these do not affect production but indicate wasted work if similar logic runs on mobile.

## Image Optimization
- Replace `src/assets/logo.png` with a compressed WebP/AVIF at an appropriate intrinsic size (e.g., 128×128), and reference the hashed built asset only.
- Add responsive images in `OptimizedImage` using `srcset` and `sizes` so mobile devices receive smaller files.
- Set explicit `width`/`height` on critical images to avoid layout work; keep container aspect.
- Mark LCP image with `fetchpriority="high"` and keep `loading="eager"` only for that one; ensure others remain `lazy`.
- For blog cover images from external sources, introduce upload‑time compression to generate WebP/AVIF variants and smaller resolutions; store in Supabase Storage (or an image CDN) and serve size‑appropriate URLs.

## Fonts
- Self‑host fonts via `@fontsource` (Inter/Playfair) to avoid third‑party latency; limit weights/styles and use `font-display: swap`.
- If remaining on Google Fonts, keep only required families/weights, add correct `preconnect` to `fonts.gstatic.com` with `crossorigin`, and avoid duplicate font links.

## Reduce Critical JS & Work
- Defer non‑critical JS: move the latest posts Supabase query to run after first paint (use `requestIdleCallback`/`setTimeout`) and render skeleton first.
- Gate carousel autoplay on mobile (pause until user interaction) to reduce CPU during initial load.
- Further code‑split heavy UI/vendor where feasible; ensure large modules (e.g., editor libraries) are only loaded on routes that need them.
- Keep analytics/speed scripts but mount them after hydration or behind `idle` to minimize impact on LCP.

## Network Hints & Caching
- Ensure `preconnect` hints to `fonts.gstatic.com` and Supabase are present in the real production head (via `Helmet`) on all routes.
- Confirm hashed static assets have long cache lifetimes; images served from Storage/CDN should have `Cache-Control: immutable`.
- Remove any dev‑only preloads to `/src/*` (e.g., in `useAdvancedCacheManager`) so mobile doesn’t waste work on unreachable dev paths.

## Verification
- Rebuild and run PSI for mobile; target LCP < 2.5s and performance ≥90.
- Validate no render‑blocking tags in the initial HTML, images are sized correctly, and font loads do not block rendering.

## Implementation Steps
1. Optimize logo asset (resize + WebP/AVIF) and update usage.
2. Add `srcset/sizes` and width/height support to `OptimizedImage` and mark the LCP image with high fetch priority.
3. Switch Inter/Playfair to `@fontsource`, remove Google Fonts links, limit weights, ensure `font-display: swap`.
4. Defer Home page data fetch and carousel autoplay on mobile.
5. Add global `Helmet` preconnects for `fonts.gstatic.com` and Supabase.
6. Remove dev‑only preloads in `useAdvancedCacheManager` that target `/src/*`.
7. Rebuild and verify PSI mobile results; iterate as needed.