## Outcome
- Replace the current initial-based About page cards with image-based bitmoji avatars.
- Keep the same 4-card layout, names, titles, and descriptions sourced from translations.
- Use your transparent-background image for Shaurya Gupta; add placeholders or real images for the other three.

## Asset Setup
- Place images in `public/images/team/`:
  - `shaurya.png` (no background, provided)
  - `vivaan.png`, `ved.png`, `shourya.png` (or placeholders until provided)
- Accept PNG/WebP; recommend square 512–1024 px to avoid distortion.
- Keep file names lowercase, no spaces.

## Implementation Changes
- Update `src/pages/About.tsx`:
  - Remove the gradient-initial avatar UI and the inline `TeamAvatar` helper.
  - Render `<img>` for each person with `rounded-full object-cover w-24 h-24`.
  - Add `loading="lazy"`, `decoding="async"`, and `alt` from translations.
  - Keep graceful fallback to initials if an image is missing or errors.
- Do not change translation keys; only swap the avatar portion.
- No new components unless needed; keep edits localized for simplicity and minimal code churn.

## Styling & UX
- Maintain existing `Card` spacing/typography.
- Ensure avatars look crisp on light/dark themes; optional subtle border `ring-2 ring-primary/20`.
- Provide consistent sizing to prevent layout shift (set `width`/`height` attributes).

## Build & Preview
- Run Vite build: `npm run build` (executes `scripts/generateSitemap.js` and `vite build`).
- Start preview server: `npm run preview`.
- Open and verify `/about` renders all four bitmojis correctly and that the admin toolbar remains above the navbar.

## Validation Checklist
- Each card shows the correct name/title/description from translations.
- Shaurya card uses the provided no-background image.
- Missing images fall back cleanly; no broken icons.
- Lighthouse check: no significant CLS from avatar loads.

## Rollback
- If needed, revert to the prior gradient-initial avatars by restoring the previous `About.tsx` section.

Confirm and I’ll implement the changes, run the build, start preview, and validate the About page end-to-end.