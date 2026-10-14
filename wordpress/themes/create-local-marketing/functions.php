<?php
/**
 * Create Local Marketing theme setup.
 * Presentation belongs here; custom post types and business data belong in a core plugin.
 *
 * @package CreateLocalMarketing
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'CREATE_LOCAL_MARKETING_VERSION', '1.0.0' );

/** Register theme supports and the one native navigation location. */
function create_local_marketing_setup() {
	load_child_theme_textdomain( 'create-local-marketing', get_stylesheet_directory() . '/languages' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo', array( 'height' => 180, 'width' => 800, 'flex-height' => true, 'flex-width' => true ) );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'align-wide' );
	add_theme_support( 'responsive-embeds' );
	register_nav_menus( array( 'primary' => __( 'Primary navigation', 'create-local-marketing' ) ) );
}
add_action( 'after_setup_theme', 'create_local_marketing_setup' );

/** Add the theme namespace without changing Elementor's editable page structure. */
function create_local_marketing_body_class( $classes ) {
	$classes[] = 'clm-site';
	return $classes;
}
add_filter( 'body_class', 'create_local_marketing_body_class' );

/** Load only the theme's own small assets. */
function create_local_marketing_enqueue_assets() {
	wp_enqueue_style( 'create-local-marketing-style', get_stylesheet_uri(), array(), CREATE_LOCAL_MARKETING_VERSION );
	wp_enqueue_script(
		'create-local-marketing-theme',
		get_stylesheet_directory_uri() . '/create-local-marketing.js',
		array(),
		CREATE_LOCAL_MARKETING_VERSION,
		array( 'in_footer' => true, 'strategy' => 'defer' )
	);
}
add_action( 'wp_enqueue_scripts', 'create_local_marketing_enqueue_assets', 20 );

/** Provide a keyboard-accessible skip link on all public templates. */
function create_local_marketing_skip_link() {
	echo '<a class="clm-skip-link" href="#main-content">' . esc_html__( 'Skip to content', 'create-local-marketing' ) . '</a>';
}
add_action( 'wp_body_open', 'create_local_marketing_skip_link', 5 );

/** Preserve the existing Jet/Crocoblock location hook used by legacy Elementor templates. */
function cb_child_process_location( $location = null ) {
	if ( ! function_exists( 'jet_theme_core' ) || ! defined( 'ELEMENTOR_VERSION' ) ) {
		return false;
	}
	return jet_theme_core()->locations->do_location( $location );
}
