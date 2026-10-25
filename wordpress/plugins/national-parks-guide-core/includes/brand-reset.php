<?php
/**
 * Read-only first, admin-authorized one-time logo cleanup for inherited installs.
 * Does not delete templates, media, site content or user accounts.
 */
defined( 'ABSPATH' ) || exit;

function npg_register_brand_reset_routes(): void {
    $allowed = static fn() => current_user_can( 'manage_options' );
    register_rest_route( 'npg/v1', '/brand-audit', array(
        'methods' => 'GET',
        'permission_callback' => $allowed,
        'callback' => static function () {
            $titles = get_option( 'wpseo_titles', array() );
            $general = get_option( 'wpseo', array() );
            $source = array();
            foreach ( array( 'wpseo_titles' => $titles, 'wpseo' => $general ) as $name => $v ) {
                if ( ! is_array( $v ) ) { continue; }
                foreach ( $v as $key => $value ) {
                    if ( strpos( (string) $key, 'logo' ) === false ) { continue; }
                    $source[ $name . '.' . $key ] = is_scalar( $value ) ? (string) $value : '[non-scalar]';
                }
            }
            return rest_ensure_response( array(
                'source' => $source,
                'theme' => get_stylesheet(),
                'media_reset' => false,
            ) );
        },
    ) );
    register_rest_route( 'npg/v1', '/brand-cleanup', array(
        'methods' => 'POST',
        'permission_callback' => $allowed,
        'callback' => static function ( WP_REST_Request $request ) {
            if ( true !== $request->get_param( 'confirm_branding' ) ) {
                return new WP_Error( 'confirm_required', 'Set confirm_branding=true to replace known old real estate logos.', array( 'status' => 400 ) );
            }
            $theme_logo = get_stylesheet_directory_uri() . '/assets/brand/npg-symbol.svg';
            $changed = array();
            foreach ( array( 'wpseo_titles', 'wpseo' ) as $option ) {
                $value = get_option( $option, array() );
                if ( ! is_array( $value ) ) { continue; }
                $updated = false;
                foreach ( $value as $key => $original ) {
                    if ( strpos( (string) $key, 'logo' ) === false || ! is_string( $original ) ) { continue; }
                    if ( stripos( $original, 'adam-griffee' ) === false && stripos( $original, 'adamgriffee' ) === false ) { continue; }
                    $changed[ $option . '.' . $key ] = 'replaced legacy logo URL';
                    $value[ $key ] = $theme_logo;
                    $updated = true;
                }
                if ( $updated ) { update_option( $option, $value ); }
            }
            wp_cache_flush();
            return rest_ensure_response( array( 'changed' => $changed, 'logo' => $theme_logo ) );
        },
    ) );
}
add_action( 'rest_api_init', 'npg_register_brand_reset_routes' );
