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
if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'header' ) ) :
?>
<header class="npg-fallback-header">
<div class="npg-fallback-header__inner">
<div class="npg-fallback-brand">
<?php if ( has_custom_logo() ) : the_custom_logo(); else : ?>
<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
<?php endif; ?>
</div>
<nav aria-label="<?php esc_attr_e( 'Primary navigation', 'national-parks-guide' ); ?>">
<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'fallback_cb' => false, 'depth' => 2 ) ); ?>
</nav>
</div>
</header>
<?php endif; ?>
