# National Parks Guide — demo photo rights ledger
Date: 2026-10-10
Scope: Front-end **demo photographs only** on `nationalparksguide.co/`, `utahzionnationalpark.com/`, and the `nationalparksguide.co/app/` demo in this public GitHub Pages repository.
**Important:** This is not the source license ledger for the final Zion VIDEO, and these photographs are not film footage. Media is loaded from third-party Wikimedia Commons file endpoints and image HTTP loading has not been verified from this environment.

| Subject | Wikimedia Commons file / credit | License represented on source page |
|---|---|---|
| Zion Canyon | [Zion national park.jpg](https://commons.wikimedia.org/wiki/File:Zion_national_park.jpg) — Stolz Gary M / U.S. Fish and Wildlife Service | Public domain |
| Zion Narrows river | [Zion "The Narrows" Stream.jpg](https://commons.wikimedia.org/wiki/File:Zion_%22The_Narrows%22_Stream.jpg) — Julianibarra | CC0 1.0 |
| Zion/Springdale | [Zion National Park, Springdale.jpg](https://commons.wikimedia.org/wiki/File:Zion_National_Park,_Springdale.jpg) — Ken Lane | CC0 1.0 |
| Zion Watchman Trail | [Zion National Park - HCP - October 03, 2022 - 115 - The Watchman Trail.jpg](https://commons.wikimedia.org/wiki/File:Zion_National_Park_-_HCP_-_October_03,_2022_-_115_-_The_Watchman_Trail.jpg) — Vulturesong | CC0 1.0 |
| Yellowstone Old Faithful Geyser | [Old Faithful Geyser (48941846278).jpg](https://commons.wikimedia.org/wiki/File:Old_Faithful_Geyser_(48941846278).jpg) — Yellowstone NPS | Public domain, NPS government work |
| Great Smoky Mountains | [Views at Great Smoky Mountains National Park...jpg](https://commons.wikimedia.org/wiki/File:Views_at_Great_Smoky_Mountains_National_Park,_Tennessee_and_North_Carolina_(9077fd30-5847-46a9-b967-728e87050d2c).jpg) — NPS | Public domain, NPS government work |
| Grand Canyon | [Grand Canyon Panorama - 2016.jpg](https://commons.wikimedia.org/wiki/File:Grand_Canyon_Panorama_-_2016.jpg) — AlmightyWorm | CC0 1.0 |
| Yosemite Valley | [Yosemite Valley, View from Glacier Point, Yosemite National Park.jpg](https://commons.wikimedia.org/wiki/File:Yosemite_Valley,_View_from_Glacier_Point,_Yosemite_National_Park.jpg) — Mckunec | CC0 1.0 |

## Open issues
- Check that every remote image returns 200 from the final browser/network and that Commons hotlink policies are followed; production should vendor/optimize actual licensed images through proper media storage if allowed.
- Move final production to first-party media delivery, generate responsive WebP/AVIF at verified sharpness and keep photographer/rights IDs in ACF/CLM registry.
- Do not treat any Envato search or preview URL as acquired footage. Envato commercial footage needs a valid project license before edit.
- NPS YouTube upload has distinct rights from NPS-owned PD assets; verify actual derivative rights before use.
- All images used by independent NPG are NOT an endorsement by NPS.
