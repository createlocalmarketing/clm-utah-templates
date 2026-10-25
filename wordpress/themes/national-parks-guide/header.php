<?php
/** National Parks Guide accessible wrapper; header content is native Elementor Theme Builder. */
defined( 'ABSPATH' ) || exit;
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="npg-skip-link" href="#npg-main"><?php esc_html_e( 'Skip to content', 'national-parks-guide' ); ?></a>
<?php
$npg_header_rendered = function_exists( 'elementor_theme_do_location' ) && elementor_theme_do_location( 'header' );
if ( ! $npg_header_rendered && class_exists( '\\Elementor\\Plugin' ) ) {
    $npg_header_id = (int) get_option( 'npg_header_template_id', 2544 );
    if ( 'publish' === get_post_status( $npg_header_id ) ) {
        $npg_header_html = \Elementor\Plugin::instance()->frontend->get_builder_content_for_display( $npg_header_id, true );
        if ( is_string( $npg_header_html ) && trim( $npg_header_html ) !== '' ) {
            echo $npg_header_html; // Native Elementor template, no HTML widgets.
            $npg_header_rendered = true;
        }
    }
}
if ( ! $npg_header_rendered ) :
    // Elementor Pro Theme Builder conditions may be unavailable on inherited installs.
    // Fallback by rendering the saved NPG Elementor HEADER DOCUMENT, not static HTML.
    $npg_header = '';
    if ( class_exists( '\\Elementor\\Plugin' ) ) {
        $npg_header = \Elementor\Plugin::instance()->frontend->get_builder_content_for_display( 2544, true );
    }
    if ( is_string( $npg_header ) && trim( $npg_header ) !== '' ) :
        echo $npg_header; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Elementor frontend-rendered widgets.
    else :

?>
<header class="npg-fallback-header">
<div class="npg-fallback-header__inner">
<div class="npg-fallback-brand">
<?php if ( has_custom_logo() ) : the_custom_logo(); else : ?>
<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
<?php endif; endif; ?>
</div>
<nav aria-label="<?php esc_attr_e( 'Primary navigation', 'national-parks-guide' ); ?>">
<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'fallback_cb' => false, 'depth' => 2 ) ); ?>
</nav>
</div>
</header>
<?php endif; ?>
