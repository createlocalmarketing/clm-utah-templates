<?php
/**
 * Make the public Elementor search form return approved National Parks Guide
 * destination entities and visitor pages, not the default blog-only results.
 */
defined('ABSPATH') || exit;
add_action('pre_get_posts', static function (WP_Query $query): void {
    if (is_admin() || ! $query->is_main_query() || ! $query->is_search()) return;
    $query->set('post_type', array('page', 'npg_park', 'npg_guide', 'npg_story', 'npg_trail', 'npg_place', 'npg_business', 'npg_event'));
    $query->set('post_status','publish');
    $query->set('posts_per_page',12);
    $query->set('ignore_sticky_posts',true);
});