<?php
/** Page template that leaves all page content editable in Elementor. */
get_header();
while ( have_posts() ) :
	the_post();
	?>
	<main id="main-content" class="clm-page">
		<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
			<?php the_content(); ?>
		</article>
	</main>
	<?php
endwhile;
get_footer();
