<?php
/**
 * First-party NPG native Elementor Theme Builder registration and audit endpoint.
 * Uses Elementor Pro template metadata, never HTML widgets.
 */
defined( 'ABSPATH' ) || exit;
add_action( 'rest_api_init', static function (): void {
 register_rest_route( 'npg/v1', '/build/elementor-template', array(
  'methods' => 'POST',
  'permission_callback' => static fn(): bool => current_user_can( 'manage_options' ),
  'args' => array(
   'post_id' => array('type'=>'integer','required'=>true,'minimum'=>1),
   'type' => array('type'=>'string','enum'=>array('header','footer','archive','single'),'required'=>true),
  ),
  'callback' => static function( WP_REST_Request $request ) {
   $post_id=(int)$request['post_id'];
   $post=get_post($post_id);
   if (!$post||'elementor_library'!==$post->post_type) {
    return new WP_Error('invalid_elementor_template','Only existing Elementor Library posts are allowed',array('status'=>400));
   }
   $type=sanitize_key($request['type']);
   $previous=get_post_meta($post_id,'_elementor_template_type',true);
   update_post_meta($post_id,'_elementor_template_type',$type);
   return rest_ensure_response(array('post_id'=>$post_id,'type'=>$type,'previous'=>$previous,'stored'=>get_post_meta($post_id,'_elementor_template_type',true)));
  }
 ));
});
