<?php
/** Preserve the site's editable Elementor front page. */
get_header();
while ( have_posts() ) :
	the_post();
	?>
	<main id="main-content" class="clm-front-page">
		<?php the_content(); ?>
	</main>
	<?php
endwhile;
get_footer();
