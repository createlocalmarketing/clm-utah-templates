<?php
/**
 * Plugin Name: National Parks Guide Core
 * Plugin URI: https://nationalparksguide.co/
 * Description: National Parks Guide canonical entities, structured destination fields and verified gateway discovery. Presentation belongs to native Elementor.
 * Version: 0.1.0
 * Requires at least: 6.6
 * Requires PHP: 8.0
 * Author: National Parks Guide
 * Author URI: https://nationalparksguide.co/
 * Text Domain: national-parks-guide-core
 * License: GPLv3 or later
 */
defined( 'ABSPATH' ) || exit;
define( 'NPG_CORE_VERSION', '0.1.0' );
define( 'NPG_CORE_PATH', plugin_dir_path( __FILE__ ) );
require_once NPG_CORE_PATH . 'includes/content-model.php';
require_once NPG_CORE_PATH . 'includes/fields.php';
require_once NPG_CORE_PATH . 'includes/geo-api.php';
require_once NPG_CORE_PATH . 'includes/brand-reset.php';
require_once NPG_CORE_PATH . 'includes/legacy-cleanup.php';
add_action( 'init', 'npg_register_content_model', 10 );
add_action( 'acf/init', 'npg_register_acf_fields' );
add_action( 'rest_api_init', 'npg_register_api_routes' );
register_activation_hook( __FILE__, static function (): void {
    npg_register_content_model();
    flush_rewrite_rules();
} );
register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );
