<?php
/** National Parks Guide footer: native Elementor Theme Builder or accessible fallback. */
defined( 'ABSPATH' ) || exit;
if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'footer' ) ) :
?>
<footer class="npg-fallback-footer">
<div class="npg-fallback-footer__inner">
<p><strong><?php bloginfo( 'name' ); ?></strong> · <?php esc_html_e( 'Independent National Park visitor information', 'national-parks-guide' ); ?></p>
<p><?php esc_html_e( 'Not affiliated with or endorsed by the National Park Service. Check official park conditions before travel.', 'national-parks-guide' ); ?></p>
<?php wp_nav_menu( array( 'theme_location' => 'footer', 'container' => 'nav', 'container_aria_label' => __( 'Footer navigation', 'national-parks-guide' ), 'fallback_cb' => false ) ); ?>
</div>
</footer>
<?php endif; ?>
<?php wp_footer(); ?>
</body></html>
