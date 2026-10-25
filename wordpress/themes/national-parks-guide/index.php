<?php
/** Theme fallback: posts use Elementor Theme Builder where configured. */
defined( 'ABSPATH' ) || exit;
get_header();
?>
<main id="npg-main" class="npg-main" role="main">
<?php
if ( function_exists( 'elementor_theme_do_location' ) && elementor_theme_do_location( 'archive' ) ) :
    // Native Elementor Archive template.
elseif ( have_posts() ) :
    while ( have_posts() ) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class( 'npg-default-article' ); ?>>
            <h1><?php the_title(); ?></h1>
            <?php the_content(); ?>
        </article>
    <?php endwhile;
    the_posts_pagination();
else :
    get_template_part( 'template-parts/content', 'none' );
endif;
?>
</main>
<?php get_footer(); ?>
