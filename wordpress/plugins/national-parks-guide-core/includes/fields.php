<?php
/** ACF Pro field records: verified entities are not interchangeable with generated claims. */
defined( 'ABSPATH' ) || exit;

function npg_register_acf_fields(): void {
    if ( ! function_exists( 'acf_add_local_field_group' ) ) {
        return;
    }
    $scope = 'park';
    $text = static function ( string $name, string $label, string $type = 'text' ) use ( &$scope ): array {
        return array( 'key' => 'field_npg_' . $scope . '_' . $name, 'name' => $name, 'label' => $label, 'type' => $type, 'show_in_rest' => true );
    };
    $places = array(
        $text( 'npg_external_id', 'Canonical External Entity ID' ),
        $text( 'npg_official_source', 'Official/Primary Source URL', 'url' ),
        $text( 'npg_source_checked_at', 'Source Last Checked (UTC)', 'date_time_picker' ),
        $text( 'npg_latitude', 'Latitude', 'number' ),
        $text( 'npg_longitude', 'Longitude', 'number' ),
        $text( 'npg_media_license', 'Lead Photo License' ),
        $text( 'npg_media_attribution', 'Lead Photo Attribution' ),
        $text( 'npg_editorial_review', 'Editorial Approval State' ),
        $text( 'npg_nps_code', 'Official National Park Service Code' ),
        $text( 'npg_entrance_reference', 'Entrance-Specific Geographic Reference' ),
    );
    acf_add_local_field_group( array(
        'key' => 'group_npg_park_location',
        'title' => 'National Parks Guide · Verified Geographic Entity',
        'fields' => $places,
        'location' => array( array(
            array( 'param' => 'post_type', 'operator' => '==', 'value' => 'npg_park' ),
        ), array(
            array( 'param' => 'post_type', 'operator' => '==', 'value' => 'npg_trail' ),
        ), array(
            array( 'param' => 'post_type', 'operator' => '==', 'value' => 'npg_place' ),
        ) ),
        'show_in_rest' => true,
        'position' => 'normal',
    ) );
    $scope = 'business';
    acf_add_local_field_group( array(
        'key' => 'group_npg_verified_gateway_business',
        'title' => 'National Parks Guide · Gateway Business Verification',
        'fields' => array(
            $text( 'npg_business_website', 'Official Business Website', 'url' ),
            $text( 'npg_business_address', 'Verified Street Address', 'textarea' ),
            $text( 'npg_latitude', 'Business Latitude', 'number' ),
            $text( 'npg_longitude', 'Business Longitude', 'number' ),
            $text( 'npg_verification_status', 'Verification State' ),
            $text( 'npg_verification_source', 'Business Verification Source URL', 'url' ),
            $text( 'npg_verified_at', 'Business Verification Date UTC', 'date_time_picker' ),
            $text( 'npg_media_license', 'Property Photo License' ),
            $text( 'npg_media_attribution', 'Property Photo Attribution' ),
            $text( 'npg_offer_source', 'Booking/Offer Source URL', 'url' ),
        ),
        'location' => array( array(
            array( 'param' => 'post_type', 'operator' => '==', 'value' => 'npg_business' ),
        ) ),
        'show_in_rest' => true,
        'position' => 'normal',
    ) );
    $scope = 'editorial';
    acf_add_local_field_group( array(
        'key' => 'group_npg_editorial_provenance',
        'title' => 'National Parks Guide · Editorial Provenance & Acceptance',
        'fields' => array(
            $text( 'npg_primary_keyword', 'Researched Primary Query' ),
            $text( 'npg_search_intent', 'Verified Search Intent' ),
            $text( 'npg_primary_source_url', 'Primary Source URL', 'url' ),
            $text( 'npg_reviewer', 'Reviewing Editor' ),
            $text( 'npg_review_status', 'Page Acceptance State' ),
            $text( 'npg_review_issue', 'GitHub Page Acceptance Issue', 'url' ),
            $text( 'npg_review_date', 'Last Reviewed (UTC)', 'date_time_picker' ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'npg_guide' ) ),
            array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'npg_story' ) ) ),
        'show_in_rest' => true,
    ) );
}
