<?php
if(!defined('ABSPATH'))exit;
get_header();
// Honor the WordPress homepage authored as a native Elementor document.
// This prevents the old PHP tile layout from overriding approved Elementor sections.
$front_id = (int) get_queried_object_id();
$native_front_page = $front_id > 0
 && get_post_meta($front_id, '_elementor_edit_mode', true) === 'builder'
 && (string) get_post_meta($front_id, '_elementor_data', true) !== '';
if ($native_front_page) {
 while (have_posts()) {
  the_post();
  echo '<main id="site-main" class="npg-native-elementor-home">';
  the_content();
  echo '</main>';
 }
 get_footer();
 return;
}
// Editorial-only fallback when a native Elementor homepage is not configured.
$parks=clm_parks_featured_posts();
$feature=$parks[0]??null;
if($feature):
?>
<main id="site-main">
<section class="clm-hero">
<figure><?php if(has_post_thumbnail($feature))echo get_the_post_thumbnail($feature,'full',['loading'=>'eager']); else echo '<div class="clm-source">Editorial imagery pending source/media rights review</div>'; ?></figure>
<article><span class="clm-stamp">Featured National Park / Independent Visitor Guide</span><h1><?php echo esc_html($feature->post_title); ?></h1><p><?php echo esc_html($feature->post_excerpt?:wp_trim_words($feature->post_content,38)); ?></p><a class="clm-cta" href="<?php echo esc_url(get_permalink($feature)); ?>">Discover this park →</a></article>
</section>
<section class="clm-section"><div class="clm-wrap"><h2>Explore America's National Parks</h2><div class="clm-grid">
<?php foreach($parks as $p): ?>
<article class="clm-card"><a href="<?php echo esc_url(get_permalink($p)); ?>"><?php
 if(has_post_thumbnail($p))echo get_the_post_thumbnail($p,'large',['loading'=>'lazy']);
 else echo '<div class="clm-source">Unique photo pending</div>';?></a><div><h2><a href="<?php echo esc_url(get_permalink($p)); ?>"><?php echo esc_html($p->post_title); ?></a></h2><p><?php echo esc_html($p->post_excerpt); ?></p></div></article>
<?php endforeach; ?></div></div></section>
<section class="clm-section"><div class="clm-wrap"><h2>Explore every National Park</h2><p>Browse verified and published park guides. Incomplete records remain in editorial review and out of the search index.</p><a class="clm-cta" href="<?php echo esc_url(get_post_type_archive_link('clm_park')); ?>">Find a National Park →</a></div></section>
</main>
<?php else: ?>
<main class="clm-section"><div class="clm-wrap"><h1>National Parks Guide</h1><p>Official-source content is being imported and reviewed. No unfinished park pages are being represented as live visitor guidance.</p></div></main>
<?php endif;get_footer();
