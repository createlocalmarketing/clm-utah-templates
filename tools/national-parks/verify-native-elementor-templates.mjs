// Source-level regression guard; passing here does NOT verify WordPress rendering.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const root = new URL('../../wordpress/themes/clm-national-parks/', import.meta.url);
const load = name => readFileSync(new URL(name, root), 'utf8');
const front = load('front-page.php'), single = load('single-clm_park.php');
const archive = load('archive-clm_park.php'), header = load('header.php');
const footer = load('footer.php');
assert.ok(front.includes("get_post_meta($front_id, '_elementor_edit_mode'"), 'Homepage must detect the native Elementor edit document');
assert.ok(front.includes("get_post_meta($front_id, '_elementor_data'"), 'Homepage must contain native Elementor content');
assert.ok(front.includes("if ($native_front_page)") && front.includes('the_content();'), 'Homepage must render Elementor-authored content');
assert.ok(front.indexOf('if ($native_front_page)') < front.indexOf('$parks=clm_parks_featured_posts();'), 'Elementor frontpage must precede legacy tile fallback');
assert.ok(single.includes("elementor_theme_do_location('single')"), 'Single must allow Elementor Pro Theme Builder');
assert.ok(single.includes("get_post_meta($id,'_elementor_data'") && single.includes("if($native_park)"), 'Park profile must honor its native Elementor document');
assert.ok(archive.includes("elementor_theme_do_location('archive')"), 'Archive must allow Elementor Pro Theme Builder');
assert.ok(header.includes("elementor_theme_do_location('header')"), 'Header must allow Elementor Pro Theme Builder');
assert.ok(footer.includes("elementor_theme_do_location('footer')"), 'Footer must allow Elementor Pro Theme Builder');
for (const [file, source] of Object.entries({front, single, archive, header, footer})) {
 assert.ok(!/\belementor-widget-html\b|\[elementor-template\s+id=/i.test(source), file + ' must not render HTML-widget or shortcode impersonations of native Elementor');
}
console.log('PASS: native Elementor template precedence and no known HTML-widget shell in five PHP theme templates.');
