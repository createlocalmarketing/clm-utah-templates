<?php
/** Accessible fallback archive template. */
get_header();
?>
<main class="clm-container clm-section">
	<?php if ( have_posts() ) : ?>
		<header class="clm-page-intro">
			<p class="clm-eyebrow"><?php esc_html_e( 'Create Local Marketing', 'create-local-marketing' ); ?></p>
			<h1><?php echo is_home() && ! is_front_page() ? esc_html( single_post_title( '', false ) ) : esc_html( get_the_archive_title() ); ?></h1>
		</header>
		<div class="clm-entry-list">
			<?php while ( have_posts() ) : the_post(); ?>
				<article <?php post_class( 'clm-card' ); ?> id="post-<?php the_ID(); ?>">
					<div class="clm-card__body"><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><?php the_excerpt(); ?></div>
				</article>
			<?php endwhile; ?>
		</div>
		<?php the_posts_navigation(); ?>
	<?php else : ?>
		<header><p class="clm-eyebrow"><?php esc_html_e( 'Create Local Marketing', 'create-local-marketing' ); ?></p><h1><?php esc_html_e( 'A clearer path to growth.', 'create-local-marketing' ); ?></h1><p class="clm-lede"><?php esc_html_e( 'We connect strategy, creative, technology, and measurable marketing for businesses ready to grow.', 'create-local-marketing' ); ?></p></header>
	<?php endif; ?>
</main>
<?php get_footer(); ?>
