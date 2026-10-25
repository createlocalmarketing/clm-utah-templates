<?php
/** Clear 404 that does not disguise nonexistent SEO pages. */
defined( 'ABSPATH' ) || exit;
status_header( 404 );
get_header();
?>
<main id="npg-main" class="npg-main npg-not-found" role="main">
<section class="npg-default-article">
<p class="npg-eyebrow"><?php esc_html_e( 'Page not found', 'national-parks-guide' ); ?></p>
<h1><?php esc_html_e( 'This trail leads somewhere else.', 'national-parks-guide' ); ?></h1>
<p><?php esc_html_e( 'The page you requested is not available. Explore our park guides or search for another destination.', 'national-parks-guide' ); ?></p>
<a class="npg-button" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Discover National Parks', 'national-parks-guide' ); ?></a>
<?php get_search_form(); ?>
</section>
</main>
<?php get_footer(); ?>
