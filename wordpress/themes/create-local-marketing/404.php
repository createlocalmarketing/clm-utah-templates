<?php
/** Branded not-found template. */
get_header();
?>
<main class="clm-container clm-section">
	<p class="clm-eyebrow"><?php esc_html_e( '404 · Page not found', 'create-local-marketing' ); ?></p>
	<h1><?php esc_html_e( 'Let’s get you back on track.', 'create-local-marketing' ); ?></h1>
	<p class="clm-lede"><?php esc_html_e( 'The page may have moved. Start at the homepage or search the site for what you need.', 'create-local-marketing' ); ?></p>
	<p><a class="clm-pill" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Go to the homepage', 'create-local-marketing' ); ?></a></p>
	<?php get_search_form(); ?>
</main>
<?php get_footer(); ?>
