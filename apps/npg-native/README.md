# National Parks Guide — actual native iOS + Android project

This directory is **React Native mobile application source** rather than the HTML/iPhone simulator at `nationalparksguide.co/app/index.html`.

## What exists in source

- Real native `SafeAreaView`, `ScrollView`, `TextInput`, `TouchableOpacity`, `Image`, and mobile tab navigation.
- All 63 canonical NPS-designated park records bundled locally for discovery even without network.
- Park detail screens, clickable eight-category park discovery routes, working park search and in-session favorites.
- Visitor passport screen, responsible traveler consent explanation, informational merchant rewards screen.
- DisasterStrike-themed safety section with foreground-only consented GPS permission and privacy-conscious one-time test.
- Native iOS and Android Expo configuration; no HTML webview is presented as the actual app.

## Test locally

```sh
cd apps/npg-native
npm install
npm run typecheck
npm run ios     # macOS + simulator
npm run android # Android emulator
```

The deployment has **not** been compiled into a signed IPA/AAB or submitted to stores. CI still needs emulator/E2E verification.

## Strict production gates

- No real GPS check-in is awarded client-side.
- No full device location trail, location storage, child geodata sale, unsafe incentives, or unapproved background tracking.
- Park data and photos are source seeds, not an approved offline travel/safety map.
- Merchant offers and native checkout are NOT connected to real WooCommerce inventory or authenticated owner authorizations.
- Server-side rewards ledger exists at `wordpress/plugins/clm-national-parks/includes/class-clm-visitor-rewards.php` but requires authenticated deployed staging + audits.
- All use of NPS imagery/attributions must be audited before signed store builds.
- The distinct iPhone-framed browser **visual walkthrough** is `nationalparksguide.co/app/index.html`.

## Release connection

WordPress/Quality MCP/ACF and WooCommerce data should be sourced from the correct parks staging deployment (never AdamGriffee.com). Authentication, merchant source licensing, GPS anti-spoofing, wallet, media, UGC, safe challenges, notifications and order flows must pass their acceptance tasks first.
