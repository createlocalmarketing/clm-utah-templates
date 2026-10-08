# Adam Griffee | Park City Utah Realtor

Canonical WordPress child theme for **AdamGriffee.com**, the pilot implementation of the reusable single-Realtor website platform.

## Theme metadata

- **Theme Name:** Adam Griffee | Park City Utah Realtor
- **Theme URI:** https://www.adamgriffee.com/
- **Author:** Adam Griffee
- **Author URI:** https://www.adamgriffee.com/
- **Version:** 1.0.0
- **Parent Theme:** Hello Elementor (`hello-elementor`)
- **Text Domain:** `adam-griffee-park-city-realtor`

## Architecture

The child theme is intentionally thin.

- Hello Elementor provides the minimal parent runtime.
- Elementor Pro / Theme Builder owns editable page and template structure.
- CLM Core owns reusable, brand-agnostic component architecture.
- Adam brand layer owns identity and Realtor-specific presentation.
- Content/data layers own listings, places, articles, education, directories and market intelligence.

Do not move page/component presentation back into a monolithic PHP theme. The custom theme exists to give the site its correct WordPress identity and a stable theme-level extension point while preserving native Elementor editability.

## Deployment

Live target: https://www.adamgriffee.com/

Activation must be followed by:
1. Elementor/Theme Builder condition verification.
2. homepage/header/footer frontend verification.
3. protected 7169 Canyon Drive microsite verification.
4. cache clear.
