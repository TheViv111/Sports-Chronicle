# Font Files

This directory contains self-hosted web fonts to eliminate third-party dependencies.

## Fonts Used:
- **Inter** (Variable font, weights 300-700)
- **Playfair Display** (weights 400, 500, 600, 700)

## Download Instructions:

### Inter Variable Font:
1. Visit: https://fonts.google.com/specimen/Inter
2. Download the font family
3. Extract and copy `Inter-VariableFont_*.woff2` to this directory
4. Rename to `inter-var.woff2`

OR use Google Fonts Direct URL:
```
https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2
```

### Playfair Display:
1. Visit: https://fonts.google.com/specimen/Playfair+Display
2. Download font family
3. Copy the following weight files (woff2 format):
   - `playfair-display-regular.woff2` (400)
   - `playfair-display-medium.woff2` (500)
   - `playfair-display-semibold.woff2` (600)
   - `playfair-display-bold.woff2` (700)

## File Structure:
```
fonts/
├── fonts.css           # Font-face declarations
├── inter-var.woff2     # Inter variable font
├── playfair-display-regular.woff2
├── playfair-display-medium.woff2
├── playfair-display-semibold.woff2
└── playfair-display-bold.woff2
```

## Usage:
Font files are automatically loaded via `/fonts/fonts.css` which is imported in the main CSS file.
