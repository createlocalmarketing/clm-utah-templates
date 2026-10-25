<?php
/**
 * National Parks Guide native Elementor search results.
 * Searches across approved CPTs; the layout is managed in Elementor Template 2636.
 * No HTML widgets, custom page markup or full-content result dumping.
 */
defined('ABSPATH') || exit;
get_header();
?>
<main id="npg-main" class="npg-main npg-search" role="main">
<?php
$npg_search_template=(int)get_option('npg_search_template_id',2636);
if ( class_exists('Elementor\\Plugin') && 'publish' === get_post_status($npg_search_template) ) {
  $npg_search_html=\Elementor\Plugin::instance()->frontend->get_builder_content_for_display($npg_search_template,true);
  if (is_string($npg_search_html) && trim($npg_search_html) !== '') {
    echo $npg_search_html; // Entire editable search surface is native Elementor.
  }
} else {
  // Accessible failsafe only, used if Elementor is disabled.
  echo '<section class="npg-default-article"><h1>' . esc_html__('Search results','national-parks-guide') . '</h1>';
  if (have_posts()) {
    while(have_posts()) { the_post(); echo '<article><h2><a href="'. esc_url(get_permalink()) .'">' . esc_html(get_the_title()) . '</a></h2>'; the_excerpt(); echo '</article>'; }
    the_posts_pagination();
  } else {
    echo '<p>' . esc_html__('No matching published destination guides were found.','national-parks-guide') . '</p>';
  }
  echo '</section>';
}
?>
</main>
<?php get_footer(); ?>