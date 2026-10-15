<?php
/**
 * Production-register editorial grammar repair for staged Elementor drafts only.
 * Never changes publication status, visibility, media, links or approved pages.
 */
defined('ABSPATH') || exit;
add_action('rest_api_init',static function():void{
    register_rest_route('npg/v1','/build/register-quality-sweep',[
        'methods'=>'POST',
        'permission_callback'=>static fn():bool=>current_user_can('manage_options'),
        'args'=>[
            'offset'=>['type'=>'integer','default'=>0,'minimum'=>0],
            'limit'=>['type'=>'integer','default'=>500,'minimum'=>1,'maximum'=>1000],
            'dry_run'=>['type'=>'boolean','default'=>true],
        ],
        'callback'=>static function(WP_REST_Request $request):WP_REST_Response{
            $ids=get_posts([
                'post_type'=>'page','post_status'=>'draft','fields'=>'ids','numberposts'=>(int)$request['limit'],
                'offset'=>(int)$request['offset'],'orderby'=>'ID','order'=>'ASC',
                'meta_query'=>[['key'=>'_npg_catalog_id','compare'=>'EXISTS']],
                'suppress_filters'=>true
            ]);
            $done=0;$fixed=0;$hubs=0;$errors=0;$samples=[];
            foreach($ids as $id){
                $done++;$id=(int)$id;
                $json=get_post_meta($id,'_elementor_data',true);
                if(!is_string($json) || $json==='')continue;
                $data=json_decode($json,true);
                if(!is_array($data) || !isset($data[0]['elements'])){$errors++;continue;}
                $changed=false;
                $corrected=str_replace('National Park National Park','National Park',$json);
                if($corrected!==$json){$changed=true;$json=$corrected;$data=json_decode($json,true);}
                if(!is_array($data)){$errors++;continue;}
                if(get_post_meta($id,'_npg_catalog_family',true)==='Park Hub'){
                    $title=wp_strip_all_tags(get_the_title($id));
                    if(isset($data[0]['elements'][1]['settings']['title']) &&
                       $data[0]['elements'][1]['settings']['title']!==$title){
                        $data[0]['elements'][1]['settings']['title']=$title;$changed=true;$hubs++;
                    }
                }
                if($changed){
                    $fixed++;
                    if(!(bool)$request['dry_run']){
                        $new=wp_json_encode($data);
                        if(!is_string($new)){$errors++;continue;}
                        update_post_meta($id,'_elementor_data',wp_slash($new));
                    }
                    if(count($samples)<4)$samples[]=['post_id'=>$id,'title'=>get_the_title($id)];
                }
            }
            return rest_ensure_response([
                'offset'=>(int)$request['offset'],'processed'=>$done,'fixed'=>$fixed,
                'park_hub_headings'=>$hubs,'errors'=>$errors,
                'next_offset'=>(int)$request['offset']+$done,'dry_run'=>(bool)$request['dry_run'],
                'samples'=>$samples
            ]);
        }
    ]);
});