<?php
/** Single CPT/story fallback; prefer Elementor Pro single templates. */
defined( 'ABSPATH' ) || exit;
get_header();
?>
<main id="npg-main" class="npg-main npg-single" role="main">
<?php
if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'single' ) ) :
    while ( have_posts() ) : the_post();
        echo '<article ';
        post_class( 'npg-default-article' );
        echo '><h1>' . esc_html( get_the_title() ) . '</h1>';
        the_content();
        echo '</article>';
    endwhile;
endif;
?>
</main>
<?php get_footer(); ?>
