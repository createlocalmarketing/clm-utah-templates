<?php if(!defined('ABSPATH'))exit; ?>
<?php if(!function_exists('elementor_theme_do_location')||!elementor_theme_do_location('footer')): ?>
<footer class="clm-footer"><div class="clm-wrap"><strong><?php bloginfo('name'); ?></strong><p>Discover, understand, safely explore and help protect America's National Parks. Independent website, not affiliated with or endorsed by the National Park Service.</p><nav aria-label="Footer navigation"><?php wp_nav_menu(['theme_location'=>'footer','container'=>false,'fallback_cb'=>false]); ?></nav></div></footer><?php endif; ?>
<?php wp_footer(); ?></body></html>
