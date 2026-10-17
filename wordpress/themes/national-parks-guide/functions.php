<?php
/**
 * National Parks Guide: theme bootstrap and native Elementor canvas.
 *
 * @package NationalParksGuide
 */
defined( 'ABSPATH' ) || exit;
define( 'NPG_THEME_VERSION', '0.1.0' );
define( 'NPG_THEME_DIR', get_template_directory() );
define( 'NPG_THEME_URI', get_template_directory_uri() );

add_action( 'after_setup_theme', static function (): void {
    load_theme_textdomain( 'national-parks-guide', NPG_THEME_DIR . '/languages' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'custom-logo', array(
        'height' => 160, 'width' => 500, 'flex-height' => true, 'flex-width' => true
    ) );
    add_theme_support( 'html5', array( 'comment-form', 'comment-list', 'search-form', 'gallery', 'caption', 'style', 'script' ) );
    add_theme_support( 'align-wide' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'woocommerce' );
    register_nav_menus( array(
        'primary' => __( 'Primary Park Navigation', 'national-parks-guide' ),
        'utility' => __( 'Visitor Utility Navigation', 'national-parks-guide' ),
        'footer'  => __( 'Footer Navigation', 'national-parks-guide' ),
    ) );
    add_image_size( 'npg-landscape-card', 720, 480, true );
    add_image_size( 'npg-feature-wide', 1600, 900, true );
    add_image_size( 'npg-portrait-card', 620, 790, true );
}, 20 );

add_action( 'wp_enqueue_scripts', static function (): void {
    wp_enqueue_style( 'national-parks-guide-core', get_stylesheet_uri(), array(), NPG_THEME_VERSION );
    wp_enqueue_style( 'national-parks-guide-tokens', NPG_THEME_URI . '/assets/css/tokens.css', array( 'national-parks-guide-core' ), NPG_THEME_VERSION );
}, 20 );

// Allow Elementor Pro to control header/footer and single/archive Theme Builder locations.
add_action( 'elementor/theme/register_locations', static function ( $manager ): void {
    $manager->register_all_core_location();
} );

add_filter( 'body_class', static function ( array $classes ): array {
    $classes[] = 'npg-theme';
    return $classes;
} );

// WordPress default content width only; actual editable components live in Elementor.
if ( ! isset( $content_width ) ) {
    $content_width = 1360;
}
