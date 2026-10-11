<?php
/** National Parks Guide footer: native Elementor Theme Builder or accessible fallback. */
defined( 'ABSPATH' ) || exit;
$npg_footer_rendered = function_exists( 'elementor_theme_do_location' ) && elementor_theme_do_location( 'footer' );
if ( ! $npg_footer_rendered && class_exists( 'Elementor\\Plugin' ) ) {
    $npg_footer_id = (int) get_option( 'npg_footer_template_id', 2624 );
    if ( 'publish' === get_post_status( $npg_footer_id ) ) {
        $npg_footer_markup = \Elementor\Plugin::instance()->frontend->get_builder_content_for_display( $npg_footer_id, true );
        if ( is_string( $npg_footer_markup ) && trim( $npg_footer_markup ) !== '' ) {
            echo $npg_footer_markup; // Full content is constructed with native Elementor widgets.
            $npg_footer_rendered = true;
        }
    }
}
if ( ! $npg_footer_rendered ) :
    $npg_footer = '';
    if ( class_exists( '\\Elementor\\Plugin' ) ) {
        $npg_footer = \Elementor\Plugin::instance()->frontend->get_builder_content_for_display( 2580, true );
    }
    if ( is_string( $npg_footer ) && trim( $npg_footer ) !== '' ) :
        echo $npg_footer; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Native Elementor rendered content.
    else :

?>
<footer class="npg-fallback-footer">
<div class="npg-fallback-footer__inner">
<p><strong><?php bloginfo( 'name' ); ?></strong> · <?php esc_html_e( 'Independent National Park visitor information', 'national-parks-guide' ); ?></p>
<p><?php esc_html_e( 'Not affiliated with or endorsed by the National Park Service. Check official park conditions before travel.', 'national-parks-guide' ); ?></p>
<?php wp_nav_menu( array( 'theme_location' => 'footer', 'container' => 'nav', 'container_aria_label' => __( 'Footer navigation', 'national-parks-guide' ), 'fallback_cb' => false ) ); ?>
</div>
</footer>
<?php endif; endif; ?>
<?php wp_footer(); ?>
</body></html>
