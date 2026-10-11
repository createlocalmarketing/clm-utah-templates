<?php
/**
 * Canonical, reusable SEO entities. Registration never creates thin content.
 */
defined( 'ABSPATH' ) || exit;

function npg_register_content_model(): void {
    $post_types = array(
        'npg_park' => array( 'National Parks', 'National Park', 'national-parks', 'parks', 'dashicons-palmtree' ),
        'npg_trail' => array( 'Trails', 'Trail', 'trails', 'trails', 'dashicons-location-alt' ),
        'npg_place' => array( 'Destinations and Viewpoints', 'Destination', 'places', 'places', 'dashicons-admin-site-alt3' ),
        'npg_business' => array( 'Gateway Businesses', 'Gateway Business', 'business-directory', 'businesses', 'dashicons-store' ),
        'npg_guide' => array( 'Visitor Guides', 'Visitor Guide', 'visitor-guides', 'guides', 'dashicons-welcome-learn-more' ),
        'npg_story' => array( 'Inside Park Stories', 'Inside Park Story', 'inside-parks', 'stories', 'dashicons-media-document' ),
        'npg_event' => array( 'Park & Gateway Events', 'Event', 'events', 'events', 'dashicons-calendar-alt' ),
        'npg_offer' => array( 'Gateway Offers', 'Offer', 'deals', 'offers', 'dashicons-tickets-alt' ),
    );
    foreach ( $post_types as $slug => $args ) {
        list( $plural, $singular, $rewrite, $rest, $icon ) = $args;
        register_post_type( $slug, array(
            'labels' => array( 'name' => __( $plural, 'national-parks-guide-core' ), 'singular_name' => __( $singular, 'national-parks-guide-core' ) ),
            'public' => true,
            'show_in_rest' => true,
            'rest_base' => $rest,
            'has_archive' => ( 'npg_park' !== $slug ),
            'rewrite' => array( 'slug' => $rewrite, 'with_front' => false ),
            'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'author', 'custom-fields' ),
            'menu_icon' => $icon,
            'menu_position' => 24,
            'show_in_nav_menus' => true,
        ) );
    }
    $taxonomies = array(
        'npg_park_region' => array( 'National Park Region', 'National Park Regions', array( 'npg_trail', 'npg_place', 'npg_business', 'npg_guide', 'npg_story', 'npg_event', 'npg_offer' ) ),
        'npg_state' => array( 'State', 'States', array_keys( $post_types ) ),
        'npg_activity' => array( 'Activity', 'Activities', array( 'npg_park', 'npg_trail', 'npg_place', 'npg_guide', 'npg_event' ) ),
        'npg_business_type' => array( 'Business Category', 'Business Categories', array( 'npg_business' ) ),
        'npg_content_family' => array( 'Content Family', 'Content Families', array_keys( $post_types ) ),
        'npg_topic' => array( 'Visitor Topic', 'Visitor Topics', array( 'npg_park', 'npg_guide', 'npg_story' ) ),
    );
    foreach ( $taxonomies as $key => $taxonomy ) {
        register_taxonomy( $key, $taxonomy[2], array(
            'labels' => array( 'name' => __( $taxonomy[1], 'national-parks-guide-core' ), 'singular_name' => __( $taxonomy[0], 'national-parks-guide-core' ) ),
            'public' => true,
            'hierarchical' => true,
            'show_ui' => true,
            'show_admin_column' => true,
            'show_in_rest' => true,
            'rest_base' => str_replace( 'npg_', '', $key ),
            'rewrite' => array( 'slug' => str_replace( '_', '-', $key ) ),
        ) );
    }
}

add_action( 'rest_api_init', static function (): void {
    register_rest_route( 'npg/v1', '/build/rewrite-flush', array(
        'methods' => 'POST',
        'permission_callback' => static fn(): bool => current_user_can( 'manage_options' ),
        'callback' => static function (): WP_REST_Response {
            $type = get_post_type_object( 'npg_park' );
            flush_rewrite_rules( true );
            return rest_ensure_response( array(
                'flushed' => true,
                'park_has_archive' => $type ? $type->has_archive : null,
                'park_rewrite' => $type ? $type->rewrite : null,
                'park_page_permalink' => get_permalink( 2532 ),
                'zion_permalink' => get_permalink( 2486 ),
            ) );
        },
    ) );
} );
