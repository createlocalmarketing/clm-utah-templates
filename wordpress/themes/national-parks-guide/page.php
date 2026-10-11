<?php
/** Native Elementor page wrapper. No HTML widgets or duplicated page designs. */
defined( 'ABSPATH' ) || exit;
get_header();
?>
<main id="npg-main" class="npg-main npg-page" role="main">
<?php while ( have_posts() ) : the_post();
    if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'single' ) ) :
        the_content();
    endif;
endwhile; ?>
</main>
<?php get_footer(); ?>
