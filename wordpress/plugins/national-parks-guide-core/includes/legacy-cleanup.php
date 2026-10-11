<?php
/**
 * Prelaunch National Parks Guide legacy-library isolation.
 * Archives all template data to private wp_options records before trashing.
 * Does not touch WordPress core, active Elementor Kit, users, media, or plugins.
 * Admin-only route, explicit confirmation and archive receipt required.
 */
defined( 'ABSPATH' ) || exit;

function npg_legacy_library_posts(): array {
    return get_posts( array(
        'post_type' => 'elementor_library',
        'post_status' => array( 'publish', 'draft', 'pending', 'private' ),
        'posts_per_page' => -1,
        'orderby' => 'ID',
        'order' => 'ASC',
        'suppress_filters' => true,
    ) );
}
function npg_is_legacy_template( WP_Post $post ): bool {
    return (string) get_post_meta( $post->ID, '_elementor_template_type', true ) !== 'kit'
        && (int) $post->ID !== (int) get_option( 'elementor_active_kit' );
}
function npg_register_prelaunch_cleanup(): void {
    $permission = static fn() => current_user_can( 'manage_options' );
    register_rest_route( 'npg/v1', '/legacy-inventory', array(
        'methods' => 'GET',
        'permission_callback' => $permission,
        'callback' => static function (): WP_REST_Response {
            $all = npg_legacy_library_posts();
            $items = array();
            foreach ( $all as $p ) {
                if ( ! npg_is_legacy_template( $p ) ) { continue; }
                $items[] = array(
                    'id' => $p->ID,
                    'title' => $p->post_title,
                    'status' => $p->post_status,
                    'type' => get_post_meta( $p->ID, '_elementor_template_type', true ),
                    'archive_saved' => false !== get_option( 'npg_legacy_template_backup_' . $p->ID, false ),
                );
            }
            return rest_ensure_response( array(
                'legacy_templates' => $items,
                'count' => count( $items ),
                'active_kit' => (int) get_option( 'elementor_active_kit' ),
                'media_purged' => false,
                'user_data_purged' => false,
            ) );
        },
    ) );
    register_rest_route( 'npg/v1', '/legacy-archive', array(
        'methods' => 'POST',
        'permission_callback' => $permission,
        'callback' => static function (): WP_REST_Response {
            $posts = npg_legacy_library_posts();
            $receipts = array();
            foreach ( $posts as $p ) {
                if ( ! npg_is_legacy_template( $p ) ) { continue; }
                $key = 'npg_legacy_template_backup_' . $p->ID;
                $prior = get_option( $key, false );
                if ( false === $prior ) {
                    $backup = array(
                        'original_post' => (array) $p,
                        'meta' => get_post_meta( $p->ID ),
                        'taxonomies' => wp_get_object_terms( $p->ID, get_object_taxonomies( 'elementor_library' ), array( 'fields' => 'all_with_object_id' ) ),
                        'captured_utc' => gmdate( 'c' ),
                    );
                    update_option( $key, $backup, false );
                }
                $saved = get_option( $key, false );
                if ( ! is_array( $saved ) || empty( $saved['original_post']['ID'] ) || (int) $saved['original_post']['ID'] !== (int) $p->ID ) {
                    return rest_ensure_response( new WP_Error( 'backup_failed', 'Legacy archive verification failed for ID ' . $p->ID, array( 'status' => 500 ) ) );
                }
                $receipts[] = (int) $p->ID;
            }
            update_option( 'npg_legacy_template_archive_receipt', array( 'ids' => $receipts, 'created_utc' => gmdate( 'c' ) ), false );
            return rest_ensure_response( array( 'archived' => count( $receipts ), 'ids' => $receipts, 'storage' => 'private WordPress options; each Elementor post and metadata retained', 'media_untouched' => true ) );
        },
    ) );
    register_rest_route( 'npg/v1', '/legacy-isolate', array(
        'methods' => 'POST',
        'permission_callback' => $permission,
        'callback' => static function ( WP_REST_Request $request ) {
            if ( $request->get_param( 'confirm_phrase' ) !== 'ISOLATE_NPG_LEGACY_LIBRARY' ) {
                return new WP_Error( 'confirmation_required', 'Confirmation phrase is required.', array( 'status' => 400 ) );
            }
            $receipt = get_option( 'npg_legacy_template_archive_receipt', array() );
            $ids = $receipt['ids'] ?? array();
            if ( ! is_array( $ids ) || count( $ids ) === 0 ) {
                return new WP_Error( 'archive_required', 'Create and verify a private archive first.', array( 'status' => 409 ) );
            }
            $trashed = array();
            foreach ( npg_legacy_library_posts() as $p ) {
                if ( ! npg_is_legacy_template( $p ) ) { continue; }
                if ( ! in_array( (int) $p->ID, $ids, true ) ) {
                    return new WP_Error( 'unarchived_template', 'Found an unarchived template. Refusing partial reset.', array( 'status' => 409 ) );
                }
                if ( false === get_option( 'npg_legacy_template_backup_' . $p->ID, false ) ) {
                    return new WP_Error( 'archive_missing', 'One template archive record is missing.', array( 'status' => 409 ) );
                }
                $trashed_post = wp_trash_post( $p->ID );
                if ( $trashed_post ) { $trashed[] = (int) $p->ID; }
            }
            return rest_ensure_response( array(
                'isolated_count' => count( $trashed ),
                'ids' => $trashed,
                'mode' => 'WordPress trash with private original Elementor data backup',
                'kit_preserved' => true,
                'media_deleted' => false,
                'plugin_deleted' => false,
            ) );
        },
    ) );
}
add_action( 'rest_api_init', 'npg_register_prelaunch_cleanup' );
