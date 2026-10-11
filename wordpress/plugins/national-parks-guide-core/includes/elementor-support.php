<?php
/**
 * Enable Elementor's native editor for each NPG custom content model.
 * All front-end layouts remain Elementor native Flexbox Container / widgets.
 */
defined('ABSPATH') || exit;

function npg_elementor_post_type_support(): void {
    $eligible = array('page','post','npg_park','npg_trail','npg_place','npg_business','npg_guide','npg_story','npg_event','npg_offer');
    $current = get_option('elementor_cpt_support', array('page','post'));
    if (!is_array($current)) { $current=array('page','post'); }
    $combined = array_values(array_unique(array_merge($current,$eligible)));
    if ($combined !== $current) {
        update_option('elementor_cpt_support', $combined, false);
    }
}
add_action('init','npg_elementor_post_type_support',25);
add_filter('elementor/settings/post_types',static function($types){
    $extra = array('npg_park','npg_trail','npg_place','npg_business','npg_guide','npg_story','npg_event','npg_offer');
    if (!is_array($types)) return $types;
    foreach($extra as $type) {
        if (array_is_list($types)) {
            if (!in_array($type,$types,true)) $types[]=$type;
        }else {
            $types[$type]=$type;
        }
    }
    return $types;
},20);

add_action('rest_api_init',static function():void {
 register_rest_route('npg/v1','/elementor-types',array(
  'methods'=>'GET','permission_callback'=>static fn()=>current_user_can('manage_options'),
  'callback'=>static fn()=>rest_ensure_response(array('elementor_cpt_support'=>get_option('elementor_cpt_support'),'npg_post_types'=>array_values(array_filter(get_post_types(),static fn($v)=>str_starts_with($v,'npg_')))))
 ));
});
