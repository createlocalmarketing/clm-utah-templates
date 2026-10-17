<?php
/**
 * NPG canonical eight-family taxonomy importer.
 * No public pages are created; this registers independently managed term hierarchies.
 */
defined( 'ABSPATH' ) || exit;
function npg_topic_seed(): array {
    $file = NPG_CORE_PATH . 'data/taxonomy-8-families.json';
    if ( ! is_readable( $file ) ) { return array(); }
    $value = json_decode( (string) file_get_contents( $file ), true );
    return is_array( $value ) && ! empty( $value['families'] ) ? $value['families'] : array();
}
function npg_register_topic_build_routes(): void {
    register_rest_route( 'npg/v1', '/build/topics', array(
        'methods' => 'POST',
        'permission_callback' => static fn(): bool => current_user_can( 'manage_options' ),
        'args' => array(
            'dry_run' => array( 'type' => 'boolean', 'default' => true ),
        ),
        'callback' => static function ( WP_REST_Request $request ) {
            $seed = npg_topic_seed();
            $child_count = array_sum( array_map( static fn( $g ) => count( $g['children'] ?? array() ), $seed ) );
            if ( 8 !== count( $seed ) || 54 !== $child_count ) {
                return new WP_Error( 'invalid_taxonomy_seed', 'Expected 8 families and 54 unique child topics', array( 'status' => 409 ) );
            }
            $is_dry = (bool) $request['dry_run'];
            $created = 0;
            $existing = 0;
            $rows = array();
            foreach ( $seed as $group ) {
                $slug = sanitize_title( $group['slug'] );
                $name = sanitize_text_field( $group['name'] );
                $term = term_exists( $slug, 'npg_topic' );
                $parent = $term ? (int) ( is_array( $term ) ? $term['term_id'] : $term ) : 0;
                if ( ! $parent && ! $is_dry ) {
                    $made = wp_insert_term( $name, 'npg_topic', array( 'slug' => $slug ) );
                    if ( is_wp_error( $made ) ) {
                        return new WP_Error( 'parent_create_failed', $made->get_error_message(), array( 'status' => 500 ) );
                    }
                    $parent = (int) $made['term_id'];
                    $created++;
                } elseif ( $parent ) { $existing++; }
                $rows[] = array( 'slug' => $slug, 'id' => $parent, 'children' => count( $group['children'] ) );
                foreach ( $group['children'] as $item ) {
                    $c_slug = sanitize_title( $item['slug'] );
                    $c_name = sanitize_text_field( $item['name'] );
                    $known = term_exists( $c_slug, 'npg_topic' );
                    if ( $known ) {
                        $known_id = (int) ( is_array( $known ) ? $known['term_id'] : $known );
                        $existing++;
                        if ( ! $is_dry && $parent ) {
                            $t = get_term( $known_id, 'npg_topic' );
                            if ( $t && ! is_wp_error( $t ) && (int) $t->parent !== $parent ) {
                                wp_update_term( $known_id, 'npg_topic', array( 'parent' => $parent ) );
                            }
                        }
                    } elseif ( ! $is_dry ) {
                        $c = wp_insert_term( $c_name, 'npg_topic', array( 'slug' => $c_slug, 'parent' => $parent ) );
                        if ( is_wp_error( $c ) ) {
                            return new WP_Error( 'child_create_failed', $c->get_error_message(), array( 'status' => 500 ) );
                        }
                        $created++;
                    }
                }
            }
            return rest_ensure_response( array(
                'dry_run' => $is_dry,
                'families' => count( $seed ),
                'children' => $child_count,
                'new_terms' => $created,
                'existing_terms' => $existing,
                'tree' => $rows,
                'no_thin_pages_published' => true,
            ) );
        },
    ) );
}
add_action( 'rest_api_init', 'npg_register_topic_build_routes' );
