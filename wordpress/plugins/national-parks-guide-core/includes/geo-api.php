<?php
/**
 * Public discovery API: ONLY published AND source-verified businesses.
 * A business is not within "25 miles of a park" without a named entrance anchor.
 */
defined( 'ABSPATH' ) || exit;

function npg_distance_miles( float $lat1, float $lon1, float $lat2, float $lon2 ): float {
    $to_rad = M_PI / 180;
    $dlat = ( $lat2 - $lat1 ) * $to_rad;
    $dlon = ( $lon2 - $lon1 ) * $to_rad;
    $angle = pow( sin( $dlat / 2 ), 2 )
        + cos( $lat1 * $to_rad ) * cos( $lat2 * $to_rad ) * pow( sin( $dlon / 2 ), 2 );
    return 3958.7613 * 2 * asin( min( 1.0, sqrt( max( 0.0, $angle ) ) ) );
}

function npg_register_api_routes(): void {
    register_rest_route( 'npg/v1', '/health', array(
        'methods' => 'GET', 'permission_callback' => '__return_true',
        'callback' => static function (): WP_REST_Response {
            return rest_ensure_response( array(
                'platform' => 'national-parks-guide-core',
                'version' => NPG_CORE_VERSION,
                'content_models' => 8,
                'acceptance' => 'Pages and business data are not assumed complete.',
            ) );
        },
    ) );
    register_rest_route( 'npg/v1', '/nearby-businesses', array(
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'args' => array(
            'latitude' => array( 'type' => 'number', 'required' => true, 'minimum' => -90, 'maximum' => 90 ),
            'longitude' => array( 'type' => 'number', 'required' => true, 'minimum' => -180, 'maximum' => 180 ),
            'radius_miles' => array( 'type' => 'number', 'default' => 25, 'minimum' => 1, 'maximum' => 25 ),
            'category' => array( 'type' => 'string', 'required' => false ),
        ),
        'callback' => static function ( WP_REST_Request $request ): WP_REST_Response {
            $lat = (float) $request['latitude'];
            $lon = (float) $request['longitude'];
            $radius = min( 25, max( 1, (float) $request['radius_miles'] ) );
            $lat_delta = $radius / 69;
            $cos = max( 0.05, abs( cos( deg2rad( $lat ) ) ) );
            $lon_delta = $radius / ( 69 * $cos );
            $query_args = array(
                'post_type' => 'npg_business',
                'post_status' => 'publish',
                'posts_per_page' => 200,
                'no_found_rows' => true,
                'meta_query' => array(
                    'relation' => 'AND',
                    array( 'key' => 'npg_verification_status', 'value' => 'verified' ),
                    array( 'key' => 'npg_verification_source', 'compare' => 'EXISTS' ),
                    array( 'key' => 'npg_verified_at', 'compare' => 'EXISTS' ),
                    array( 'key' => 'npg_latitude', 'value' => array( $lat - $lat_delta, $lat + $lat_delta ), 'compare' => 'BETWEEN', 'type' => 'NUMERIC' ),
                    array( 'key' => 'npg_longitude', 'value' => array( $lon - $lon_delta, $lon + $lon_delta ), 'compare' => 'BETWEEN', 'type' => 'NUMERIC' ),
                ),
            );
            if ( $request['category'] ) {
                $query_args['tax_query'] = array( array(
                    'taxonomy' => 'npg_business_type',
                    'field' => 'slug',
                    'terms' => sanitize_title( $request['category'] ),
                ) );
            }
            $result = new WP_Query( $query_args );
            $output = array();
            foreach ( $result->posts as $post ) {
                $b_lat = get_post_meta( $post->ID, 'npg_latitude', true );
                $b_lon = get_post_meta( $post->ID, 'npg_longitude', true );
                if ( ! is_numeric( $b_lat ) || ! is_numeric( $b_lon ) ) {
                    continue;
                }
                $distance = npg_distance_miles( $lat, $lon, (float) $b_lat, (float) $b_lon );
                if ( $distance > $radius ) {
                    continue;
                }
                $output[] = array(
                    'id' => $post->ID,
                    'name' => get_the_title( $post ),
                    'url' => get_permalink( $post ),
                    'latitude' => (float) $b_lat,
                    'longitude' => (float) $b_lon,
                    'distance_from_requested_anchor_miles' => round( $distance, 2 ),
                    'source' => esc_url_raw( get_post_meta( $post->ID, 'npg_verification_source', true ) ),
                    'verified_at' => get_post_meta( $post->ID, 'npg_verified_at', true ),
                );
            }
            usort( $output, static fn( $a, $b ) => $a['distance_from_requested_anchor_miles'] <=> $b['distance_from_requested_anchor_miles'] );
            return rest_ensure_response( array(
                'units' => 'miles',
                'radius_miles' => $radius,
                'measurement' => 'geodesic distance from explicitly supplied entrance/gateway point; not drive distance',
                'business_count' => count( $output ),
                'incomplete_census' => true,
                'businesses' => $output,
            ) );
        },
    ) );
}
