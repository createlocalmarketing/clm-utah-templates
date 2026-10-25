<?php
/** Native Elementor Loop Grid and Theme Builder archives. */
defined( 'ABSPATH' ) || exit;
get_header();
?>
<main id="npg-main" class="npg-main npg-archive" role="main">
<?php
if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'archive' ) ) :
    echo '<div class="npg-default-article">';
    the_archive_title( '<h1>', '</h1>' );
    if ( have_posts() ) :
        while ( have_posts() ) : the_post();
            echo '<article><h2><a href="' . esc_url( get_permalink() ) . '">' . esc_html( get_the_title() ) . '</a></h2>';
            the_excerpt();
            echo '</article>';
        endwhile;
        the_posts_pagination();
    endif;
    echo '</div>';
endif;
?>
</main>
<?php get_footer(); ?>
