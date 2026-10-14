<?php
/** Branded editorial fallback; Elementor Theme Builder can replace this location. */
get_header();
while ( have_posts() ) :
	the_post();
	?>
	<main id="main-content" class="clm-container clm-section">
		<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
			<header class="clm-page-intro">
				<p class="clm-eyebrow"><?php echo esc_html( get_the_date() ); ?></p>
				<h1><?php the_title(); ?></h1>
			</header>
			<?php if ( has_post_thumbnail() ) : ?><div class="clm-featured-image"><?php the_post_thumbnail( 'large' ); ?></div><?php endif; ?>
			<div class="clm-entry-content"><?php the_content(); ?></div>
		</article>
	</main>
	<?php
endwhile;
get_footer();
