<?php
if(!defined('ABSPATH'))exit;
get_header();
// Honor the approved Elementor Pro single template and its display conditions.
if (function_exists('elementor_theme_do_location') && elementor_theme_do_location('single')) {
 get_footer();
 return;
}
if(have_posts())while(have_posts()):the_post();
// A specific park authored in native Elementor owns all its visible sections.
$id=get_the_ID();
$native_park=get_post_meta($id,'_elementor_edit_mode',true)==='builder'
 && (string)get_post_meta($id,'_elementor_data',true)!=='';
if($native_park) {
 echo '<main id="site-main" class="npg-native-elementor-park">';
 the_content();
 echo '</main>';
 continue;
}
$id=get_the_ID();$approved=class_exists('CLM_National_Parks_Core')&&CLM_National_Parks_Core::approved($id);
?>
<main id="site-main"><div class="clm-wrap"><nav class="clm-breadcrumb"><a href="<?php echo esc_url(home_url('/')); ?>">National Parks Guide</a> / <a href="<?php echo esc_url(get_post_type_archive_link('clm_park')); ?>">Parks</a> / <?php the_title(); ?></nav></div>
<?php if(has_post_thumbnail()):?><div class="clm-hero"><figure><?php the_post_thumbnail('full',['loading'=>'eager']); ?></figure><article><span class="clm-stamp">National Park Visitor Experience</span><h1><?php the_title(); ?></h1><p><?php echo esc_html(get_the_excerpt()); ?></p><?php echo clm_parks_source($id); ?></article></div><?php endif; ?>
<article class="clm-content clm-wrap"><?php if(!has_post_thumbnail()):?><h1><?php the_title(); ?></h1><?php endif; ?>
<?php if(!$approved):?><p class="clm-source">Editorial review in progress. This page is not approved for public search indexing.</p><?php endif; ?>
<?php the_content();echo clm_parks_source($id); ?>
<section><h2>Plan Your Visit</h2><p>Check current fees, permits, shuttle routes, accessibility and conditions directly with the park. This site is not a source of live emergency information.</p></section>
<section><h2>Trails, Local Businesses & Experiences</h2><?php
 $related=get_posts(['post_type'=>['clm_trail','clm_merchant','clm_park_event','clm_park_news'],'numberposts'=>18,'post_status'=>'publish',
 'tax_query'=>[['taxonomy'=>'clm_park_entity','field'=>'slug','terms'=>get_post_field('post_name',$id)]]]);
 foreach($related as $r){if(class_exists('CLM_National_Parks_Core')&&!CLM_National_Parks_Core::approved($r->ID))continue;
 echo '<p><a href="'.esc_url(get_permalink($r)).'">'.esc_html($r->post_title).' →</a></p>';}
 ?></section></article></main>
<?php endwhile;get_footer();
