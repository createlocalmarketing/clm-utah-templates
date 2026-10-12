<?php
if(!defined('ABSPATH'))exit;get_header();
// Elementor Theme Builder archive takes precedence; PHP cards are the fallback.
if(function_exists('elementor_theme_do_location') && elementor_theme_do_location('archive')) {
 get_footer();
 return;
} ?>
<main class="clm-section"><div class="clm-wrap"><h1>America's National Parks</h1><p>Explore original verified source-reviewed guides covering the National Park Service's designated national parks.</p><div class="clm-grid">
<?php while(have_posts()):the_post();if(class_exists('CLM_National_Parks_Core')&&!CLM_National_Parks_Core::approved(get_the_ID()))continue;?>
<article class="clm-card"><a href="<?php the_permalink(); ?>"><?php if(has_post_thumbnail())the_post_thumbnail('large'); ?></a><div><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><p><?php the_excerpt(); ?></p></div></article>
<?php endwhile; ?></div><?php the_posts_pagination(); ?></div></main>
<?php get_footer(); ?>
