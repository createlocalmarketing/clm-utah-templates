<?php
declare(strict_types=1);
if(!defined('ABSPATH'))exit;
add_action('after_setup_theme',static function():void{
 add_theme_support('title-tag');add_theme_support('post-thumbnails');
 add_theme_support('html5',['search-form','comment-form','gallery','caption','style','script']);
 add_theme_support('woocommerce');
 add_theme_support('elementor');
 register_nav_menus(['primary'=>'National Parks Primary Navigation','footer'=>'Park Footer Links']);
});
add_action('wp_enqueue_scripts',static function():void{
 wp_enqueue_style('clm-parks-theme',get_stylesheet_uri(),[],wp_get_theme()->get('Version'));
 wp_enqueue_style('clm-parks-fontawesome','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css',[],'6.7.2');
});
add_action('elementor/theme/register_locations',static function($manager):void{
 foreach(['header','footer','single','archive'] as $location)$manager->register_location($location);
});
add_filter('body_class',static function(array $classes):array{
 if((string)get_option('clm_parks_brand','national')==='zion')$classes[]='clm-zion';
 return $classes;
});
function clm_parks_source(int $id):string{
 $url=get_post_meta($id,'clm_source_url',true);
 if(!$url&&function_exists('get_field'))$url=get_field('clm_source_url',$id);
 if(!$url)return '';
 return '<aside class="clm-source">Independent visitor guide. Official source: <a rel="noopener" target="_blank" href="'.esc_url($url).'">National Park Service ↗</a>. Verify current conditions directly with the park.</aside>';
}
function clm_parks_featured_posts():array{
 $order=['great-smoky-mountains','yellowstone','glacier','yosemite','zion'];
 $posts=get_posts(['post_type'=>'clm_park','post_status'=>'publish','numberposts'=>100]);
 $by=[];foreach($posts as $post)$by[$post->post_name]=$post;
 return array_values(array_filter(array_map(static fn($k)=>$by[$k]??null,$order)));
}
