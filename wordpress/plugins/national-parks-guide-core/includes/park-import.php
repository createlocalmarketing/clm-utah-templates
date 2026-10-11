<?php
/**
 * National Parks Guide: idempotent canonical park ingestion.
 * Admin-only, draft-only, bounded batches, no fabricated articles or imagery.
 * JSON registry is sourced from canonical 63-park NPS park-code mapping.
 */
defined( 'ABSPATH' ) || exit;

function npg_register_park_build_routes(): void {
    $admin = static fn(): bool => current_user_can( 'manage_options' );
    register_rest_route( 'npg/v1', '/build/parks/status', array(
        'methods' => 'GET',
        'permission_callback' => $admin,
        'callback' => static function (): WP_REST_Response {
            $seed = npg_park_seed();
            $parks = get_posts( array( 'post_type' => 'npg_park', 'post_status' => array( 'draft', 'publish', 'pending', 'private' ), 'posts_per_page' => -1, 'fields' => 'ids', 'no_found_rows' => true ) );
            $by_status = array();
            foreach ( $parks as $id ) {
                $st = get_post_status( $id );
                $by_status[ $st ] = ( $by_status[ $st ] ?? 0 ) + 1;
            }
            return rest_ensure_response( array(
                'registry_count' => count( $seed ),
                'wordpress_count' => count( $parks ),
                'by_status' => $by_status,
                'source' => 'data/parks-63-registry.json',
                'generated_content' => false,
                'photography_uploaded' => false,
                'next' => 'Create separately reviewed Elementor park templates, original guides and licensed media.',
            ) );
        },
    ) );
    register_rest_route( 'npg/v1', '/build/parks', array(
        'methods' => 'POST',
        'permission_callback' => $admin,
        'args' => array(
            'offset' => array( 'type' => 'integer', 'default' => 0, 'minimum' => 0 ),
            'limit' => array( 'type' => 'integer', 'default' => 15, 'minimum' => 1, 'maximum' => 20 ),
            'dry_run' => array( 'type' => 'boolean', 'default' => true ),
        ),
        'callback' => static function ( WP_REST_Request $request ) {
            $seed = npg_park_seed();
            if ( count( $seed ) !== 63 ) {
                return new WP_Error( 'registry_unavailable', 'Refusing partial registry import; expected exactly 63 parks.', array( 'status' => 409 ) );
            }
            $offset = (int) $request->get_param( 'offset' );
            $limit = min( 20, max( 1, (int) $request->get_param( 'limit' ) ) );
            $dry_run = (bool) $request->get_param( 'dry_run' );
            $results = array();
            foreach ( array_slice( $seed, $offset, $limit ) as $row ) {
                $slug = sanitize_title( $row['slug'] ?? '' );
                $code = sanitize_key( $row['code'] ?? '' );
                $name = sanitize_text_field( $row['name'] ?? '' );
                $source = esc_url_raw( $row['source'] ?? '' );
                if ( '' === $slug || '' === $name || ! preg_match( '/^[a-z0-9]{4}$/', $code )
                    || 0 !== strpos( $source, 'https://www.nps.gov/' ) ) {
                    return new WP_Error( 'invalid_park', 'Registry park row invalid at ' . $slug, array( 'status' => 409 ) );
                }
                $existing = get_page_by_path( $slug, OBJECT, 'npg_park' );
                $id = $existing ? (int) $existing->ID : 0;
                if ( $id && get_post_status( $id ) === 'publish' ) {
                    $results[] = array( 'slug' => $slug, 'id' => $id, 'operation' => 'preserved_published' );
                    continue;
                }
                if ( $dry_run ) {
                    $results[] = array( 'slug' => $slug, 'id' => $id, 'operation' => $id ? 'would_verify_existing' : 'would_create_draft' );
                    continue;
                }
                $payload = array(
                    'post_type' => 'npg_park',
                    'post_status' => 'draft',
                    'post_title' => $name,
                    'post_name' => $slug,
                    'post_excerpt' => sanitize_textarea_field( $row['summary'] ?? '' ),
                    'comment_status' => 'closed',
                    'ping_status' => 'closed',
                );
                if ( $id ) {
                    // Preserve substantive editor-written content and revisions, refresh only validated entity metadata.
                    $target = $id;
                } else {
                    $target = wp_insert_post( $payload, true );
                }
                if ( is_wp_error( $target ) ) {
                    return new WP_Error( 'park_create_failed', $target->get_error_message(), array( 'status' => 500 ) );
                }
                update_post_meta( $target, 'npg_nps_code', $code );
                update_post_meta( $target, 'npg_official_source', $source );
                update_post_meta( $target, 'npg_official_conditions', esc_url_raw( $row['alerts'] ?? '' ) );
                update_post_meta( $target, 'npg_external_id', 'nps:' . $code );
                update_post_meta( $target, 'npg_source_status', sanitize_text_field( $row['source_status'] ?? 'unbuilt' ) );
                update_post_meta( $target, 'npg_editorial_review', 'pending_original_research' );
                update_post_meta( $target, 'npg_media_review', sanitize_text_field( $row['image_review'] ?? 'unlicensed_missing' ) );
                update_post_meta( $target, 'npg_seed_source', 'national-parks-guide/parks-63-registry/2026-10-11' );
                if ( ! empty( $row['image'] ) ) {
                    update_post_meta( $target, 'npg_candidate_media_source', esc_url_raw( $row['image'] ) );
                }
                if ( ! empty( $row['gateway']['lat'] ) && isset( $row['gateway']['lon'] ) ) {
                    update_post_meta( $target, 'npg_latitude', (float) $row['gateway']['lat'] );
                    update_post_meta( $target, 'npg_longitude', (float) $row['gateway']['lon'] );
                    update_post_meta( $target, 'npg_entrance_reference', 'gateway research candidate — entrance anchor not yet confirmed' );
                }
                $state = trim( (string) ( $row['state'] ?? '' ) );
                if ( $state ) {
                    $states = preg_split( '/\\s*,\\s*|\\s+and\\s+/', $state );
                    $terms = array();
                    foreach ( $states as $part ) {
                        if ( $part ) {
                            $term = term_exists( $part, 'npg_state' );
                            if ( ! $term ) {
                                $term = wp_insert_term( $part, 'npg_state' );
                            }
                            if ( is_wp_error( $term ) ) { continue; }
                            $terms[] = (int) ( is_array( $term ) ? $term['term_id'] : $term );
                        }
                    }
                    if ( $terms ) { wp_set_object_terms( $target, $terms, 'npg_state' ); }
                }
                $results[] = array( 'slug' => $slug, 'id' => (int) $target, 'operation' => $id ? 'verified_existing' : 'created_draft' );
            }
            return rest_ensure_response( array(
                'registry_count' => count( $seed ),
                'offset' => $offset,
                'limit' => $limit,
                'dry_run' => $dry_run,
                'results' => $results,
                'next_offset' => min( 63, $offset + $limit ),
                'all_created' => false,
                'approved_for_publication' => false,
            ) );
        },
    ) );
}
function npg_park_seed(): array {
    $file = NPG_CORE_PATH . 'data/parks-63-registry.json';
    if ( ! is_readable( $file ) ) { return array(); }
    $json = json_decode( (string) file_get_contents( $file ), true );
    return is_array( $json ) && isset( $json['parks'] ) && is_array( $json['parks'] ) ? $json['parks'] : array();
}
add_action( 'rest_api_init', 'npg_register_park_build_routes' );
