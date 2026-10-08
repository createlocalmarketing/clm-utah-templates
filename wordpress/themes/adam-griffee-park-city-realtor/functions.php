<?php
/**
 * Adam Griffee | Park City Utah Realtor child theme.
 *
 * The Hello Elementor parent continues to provide the minimal theme runtime.
 * Adam-specific presentation remains in native Elementor/Theme Builder and the
 * reusable CLM/Adam component layer so the site stays editable and portable.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load the child theme stylesheet after WordPress has loaded the parent theme.
 * The stylesheet primarily carries canonical theme metadata; keeping it
 * enqueued also provides a stable future hook for theme-level overrides.
 */
function adam_griffee_realtor_enqueue_child_style() {
	wp_enqueue_style(
		'adam-griffee-park-city-realtor',
		get_stylesheet_uri(),
		array(),
		wp_get_theme()->get( 'Version' )
	);
}
add_action( 'wp_enqueue_scripts', 'adam_griffee_realtor_enqueue_child_style', 30 );
