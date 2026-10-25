<?php
/** NPG single content: all layout controls live in native Elementor widgets and containers. */
defined('ABSPATH') || exit;
get_header();
?>
<main id="npg-main" class="npg-main npg-single" role="main">
<?php
if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'single' ) ) :
 while ( have_posts() ) : the_post();
  $builder = 'builder' === get_post_meta( get_the_ID(), '_elementor_edit_mode', true );
  if ( $builder ) :
    // Do not constrain full-bleed Elementor containers or inject a duplicate H1.
    the_content();
  else :
    echo '<article ';
    post_class( 'npg-default-article' );
    echo '><h1>' . esc_html( get_the_title() ) . '</h1>';
    the_content();
    echo '</article>';
  endif;
 endwhile;
endif;
?>
</main>
<?php get_footer(); ?>
