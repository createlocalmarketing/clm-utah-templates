<?php
/**
 * Plugin Name: CLM National Parks Core
 * Description: First-party National Parks Guide visitor content, merchant graph, safe source sync, SEO and Quality MCP/ACF/WooCommerce bridge.
 * Version: 0.1.0
 * Author: Create Local Marketing
 * License: Proprietary
 * Requires PHP: 8.0
 * Text Domain: clm-parks
 */
declare(strict_types=1);
if (!defined('ABSPATH')) exit;
require_once __DIR__.'/includes/class-clm-visitor-rewards.php';
final class CLM_National_Parks_Core {
 const VERSION='0.1.0'; const NS='clm-parks/v1';
 const TYPES = [
  'clm_park'=>['Park','Parks'], 'clm_trail'=>['Trail','Trails'],
  'clm_merchant'=>['Local Business','Local Businesses'],
  'clm_park_event'=>['Park Event','Park Events'],
  'clm_park_news'=>['Park Story','Park Stories'],
  'clm_offer'=>['Merchant Offer','Merchant Offers'],
  'clm_tour'=>['Tour','Tours'],
  'clm_location'=>['Photo Location','Photo Locations'],
  'clm_org'=>['Organizer / Sponsor','Organizers & Sponsors'],
  'clm_park_media'=>['Park Media','Park Media'],
  'clm_challenge'=>['Adventure Challenge','Adventure Challenges'],
  'clm_ugc_story'=>['Visitor Story','Visitor Stories'],
 ];
 static function init(): void {
  add_action('init',[__CLASS__,'register']);
  add_action('acf/init',[__CLASS__,'acf']);
  add_action('rest_api_init',[__CLASS__,'rest']);
  add_action('wp_head',[__CLASS__,'schema'],30);
  add_filter('wp_robots',[__CLASS__,'robot_review_gate'],20);
  add_filter('document_title_parts',[__CLASS__,'document_title'],20);
  add_filter('woocommerce_product_get_status',[__CLASS__,'product_guard'],20,2);
  register_activation_hook(__FILE__,[__CLASS__,'activate']);
 }
 static function activate(): void { self::register(); CLM_Park_Visitor_Rewards::install(); flush_rewrite_rules(); }
 static function register(): void {
  foreach(self::TYPES as $type=>$labels){
   register_post_type($type,[
    'labels'=>['name'=>$labels[1],'singular_name'=>$labels[0]],
    'public'=>!in_array($type,['clm_offer','clm_challenge','clm_ugc_story'],true),
    'show_ui'=>true,'show_in_rest'=>true,'supports'=>['title','editor','thumbnail','excerpt','revisions','author','custom-fields'],
    'rewrite'=>['slug'=>str_replace('clm_','', $type)],'menu_icon'=>'dashicons-location-alt',
    'capability_type'=>'post','has_archive'=>!in_array($type,['clm_offer','clm_challenge','clm_ugc_story'],true)
   ]);
  }
  $tax=[
   'clm_park_entity'=>['Park Entity',['clm_trail','clm_merchant','clm_park_event','clm_park_news','clm_offer','clm_tour','clm_location','clm_challenge']],
   'clm_visitor_category'=>['Visitor Category',array_keys(self::TYPES)],
   'clm_business_service'=>['Local Business Service',['clm_merchant','clm_offer','clm_tour']],
   'clm_state'=>['State / Territory',array_keys(self::TYPES)],
  ];
  foreach($tax as $slug=>$v)register_taxonomy($slug,$v[1],[
   'label'=>$v[0],'public'=>true,'hierarchical'=>true,'show_in_rest'=>true,'rewrite'=>['slug'=>$slug]
  ]);
  foreach(['clm_source_url','clm_source_checked_at','clm_editorial_status','clm_park_id','clm_merchant_id','clm_geo_lat','clm_geo_lon','clm_media_rights','clm_qa_approved','clm_approved_by','clm_approved_at'] as $meta){
   register_post_meta('', $meta,['single'=>true,'type'=>'string','show_in_rest'=>false,'auth_callback'=>static fn()=>current_user_can('edit_posts')]);
  }
 }
 static function acf(): void {
  if(!function_exists('acf_add_local_field_group'))return;
  $fields=[
   ['key'=>'clm_source_url','label'=>'Original Data Source URL','type'=>'url','required'=>1],
   ['key'=>'clm_source_checked_at','label'=>'Source last checked UTC','type'=>'date_time_picker','required'=>1],
   ['key'=>'clm_editorial_status','label'=>'Editorial Review Gate','type'=>'select','required'=>1,'choices'=>[
     'source_only'=>'Source Only','researching'=>'Researching','draft'=>'Original Draft',
     'review'=>'Needs Source/Legal Review','approved'=>'Approved by Editor'],'default_value'=>'source_only'],
   ['key'=>'clm_park_id','label'=>'Canonical National Park ID','type'=>'text'],
   ['key'=>'clm_merchant_id','label'=>'Global CLM Merchant ID','type'=>'text'],
   ['key'=>'clm_geo_lat','label'=>'Verified Latitude','type'=>'number'],
   ['key'=>'clm_geo_lon','label'=>'Verified Longitude','type'=>'number'],
   ['key'=>'clm_geo_anchor_source','label'=>'Entrance/Gateway Coordinate Source','type'=>'url'],
   ['key'=>'clm_media_rights','label'=>'Media Asset Rights and Attribution','type'=>'textarea'],
   ['key'=>'clm_primary_keyword','label'=>'Google US Primary Keyword','type'=>'text'],
   ['key'=>'clm_search_intent','label'=>'Verified Search Intent','type'=>'textarea'],
   ['key'=>'clm_eeat_author','label'=>'Expert/Editorial Reviewer','type'=>'text'],
   ['key'=>'clm_schema_type','label'=>'Verified Schema Type','type'=>'select','choices'=>[
     'WebPage'=>'WebPage','TouristAttraction'=>'TouristAttraction','LocalBusiness'=>'LocalBusiness',
     'Event'=>'Event','NewsArticle'=>'NewsArticle','Product'=>'Product','VideoObject'=>'VideoObject']],
   ['key'=>'clm_qa_approved','label'=>'All 32 Page Acceptance Gates Passed','type'=>'true_false','default_value'=>0],
   ['key'=>'clm_approved_by','label'=>'Approved by User ID','type'=>'number'],
   ['key'=>'clm_approved_at','label'=>'Approved at UTC','type'=>'date_time_picker']
  ];
  acf_add_local_field_group([
   'key'=>'group_clm_parks_production','title'=>'CLM Parks — Mandatory Provenance, SEO, GEO & QA',
   'fields'=>array_map(static function($f){$f['name']=$f['key'];$f['key']='field_'.$f['key'];return $f;},$fields),
   'location'=>[[['param'=>'post_type','operator'=>'==','value'=>'clm_park']]],
   'position'=>'normal','active'=>true,'show_in_rest'=>true
  ]);
  $business=[
   ['key'=>'field_clm_merchant_claim','name'=>'clm_merchant_claim','label'=>'Verified ownership status','type'=>'select','choices'=>['unclaimed'=>'Unclaimed','pending'=>'Pending','verified'=>'Verified'],'default_value'=>'unclaimed'],
   ['key'=>'field_clm_merchant_license','name'=>'clm_merchant_license','label'=>'Source license/export compliance','type'=>'textarea'],
   ['key'=>'field_clm_merchant_phone','name'=>'clm_merchant_phone','label'=>'Phone','type'=>'text'],
   ['key'=>'field_clm_merchant_website','name'=>'clm_merchant_website','label'=>'Official website','type'=>'url'],
   ['key'=>'field_clm_merchant_address','name'=>'clm_merchant_address','label'=>'Verified Address','type'=>'textarea'],
   ['key'=>'field_clm_merchant_hours','name'=>'clm_merchant_hours','label'=>'Hours source and last checked','type'=>'textarea'],
   ['key'=>'field_clm_merchant_radius','name'=>'clm_merchant_radius','label'=>'Nearest verified park entrance distance, straight-line miles','type'=>'number'],
   ['key'=>'field_clm_merchant_tier','name'=>'clm_merchant_tier','label'=>'Merchant Plan','type'=>'select','choices'=>['starter'=>'Starter','platinum'=>'Platinum'],'default_value'=>'starter'],
   ['key'=>'field_clm_merchant_deal_permissions','name'=>'clm_merchant_deal_permissions','label'=>'Merchant-authorized offer legal terms','type'=>'textarea']
  ];
  acf_add_local_field_group([
   'key'=>'group_clm_merchant_data','title'=>'CLM Merchant — Claim, License & Visitor Economy',
   'fields'=>$business,'location'=>[[['param'=>'post_type','operator'=>'==','value'=>'clm_merchant']]],
   'show_in_rest'=>true
  ]);
 }
 static function approved(int $id):bool{
  if(get_post_status($id)!=='publish')return false;
  $approved=get_post_meta($id,'clm_qa_approved',true);
  if(function_exists('get_field'))$approved=$approved||get_field('clm_qa_approved',$id);
  $source=get_post_meta($id,'clm_source_url',true);
  if(function_exists('get_field'))$source=$source?:get_field('clm_source_url',$id);
  return (bool)$approved && !empty($source) && (bool)get_post_field('post_content',$id);
 }
 static function robot_review_gate(array $robots):array {
  if(is_singular(array_keys(self::TYPES))&&!self::approved(get_queried_object_id())){ $robots['noindex']=true;$robots['nofollow']=true; }
  return $robots;
 }
 static function document_title(array $parts):array {
  if(!is_singular(array_keys(self::TYPES)))return $parts;
  $id=get_queried_object_id(); $kw=function_exists('get_field')?get_field('clm_primary_keyword',$id):'';
  if($kw)$parts['title']=sanitize_text_field((string)$kw).' | National Parks Guide';
  return $parts;
 }
 static function schema():void {
  if(!is_singular(array_keys(self::TYPES)))return;
  $id=get_queried_object_id();
  if(!self::approved($id))return;
  $url=get_permalink($id);$title=get_the_title($id);
  $type=get_post_type($id);
  $graph=[
   ['@type'=>'WebPage','@id'=>$url.'#webpage','url'=>$url,'name'=>$title,
    'isPartOf'=>['@id'=>home_url('/#website')],'dateModified'=>get_the_modified_date(DATE_ATOM,$id)],
   ['@type'=>'BreadcrumbList','@id'=>$url.'#breadcrumb','itemListElement'=>[
    ['@type'=>'ListItem','position'=>1,'name'=>'National Parks Guide','item'=>home_url('/')],
    ['@type'=>'ListItem','position'=>2,'name'=>$title,'item'=>$url]]]
  ];
  $typeMap=['clm_park'=>'TouristAttraction','clm_trail'=>'TouristAttraction','clm_merchant'=>'LocalBusiness',
    'clm_park_event'=>'Event','clm_park_news'=>'NewsArticle','clm_park_media'=>'MediaObject','clm_tour'=>'TouristTrip'];
  if(isset($typeMap[$type])){
   $item=['@type'=>$typeMap[$type],'@id'=>$url.'#entity','name'=>$title,'url'=>$url,
    'description'=>wp_strip_all_tags((string)get_the_excerpt($id))];
   if($type==='clm_merchant'){
     $item['address']=wp_strip_all_tags((string)get_post_meta($id,'clm_merchant_address',true));
     $item['telephone']=get_post_meta($id,'clm_merchant_phone',true);
   }
   if($type==='clm_park_event'){
     $start=get_post_meta($id,'clm_event_start',true);
     if(!$start)return; // Do not publish inaccurate event schema without genuine start date
     $item['startDate']=$start;
   }
   $graph[]=$item;
  }
  $json=['@context'=>'https://schema.org','@graph'=>$graph];
  echo '<script type="application/ld+json">'.wp_json_encode($json,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_HEX_TAG).'</script>'."\n";
 }
 static function rest():void {
  register_rest_route(self::NS,'/status',[
   'methods'=>'GET','permission_callback'=>static fn()=>current_user_can('manage_options'),
   'callback'=>static fn()=>rest_ensure_response([
    'version'=>self::VERSION,'acf'=>function_exists('acf_add_local_field_group'),
    'woo'=>class_exists('WooCommerce'),'connected_site'=>home_url(),
    'park_records'=>(int)wp_count_posts('clm_park')->publish,
    'merchant_records'=>(int)wp_count_posts('clm_merchant')->publish,
    'edit_requirement'=>'Every imported park article requires human QA approval before indexing.'
   ])]);
  register_rest_route(self::NS,'/public/park/(?P<slug>[a-z0-9-]+)',[
   'methods'=>'GET','permission_callback'=>'__return_true',
   'callback'=>static function(WP_REST_Request $req) {
    $posts=get_posts(['name'=>sanitize_title($req['slug']),'post_type'=>'clm_park','post_status'=>'publish','numberposts'=>1]);
    if(!$posts||!self::approved($posts[0]->ID))return new WP_Error('not_published','Park record under editorial review',['status'=>404]);
    $p=$posts[0];return rest_ensure_response(['id'=>$p->ID,'title'=>$p->post_title,'content'=>apply_filters('the_content',$p->post_content),
      'url'=>get_permalink($p),'modified'=>get_the_modified_date(DATE_ATOM,$p)]);
   }]);
  register_rest_route(self::NS,'/review/import-park',[
   'methods'=>'POST',
   'permission_callback'=>static fn()=>current_user_can('manage_options'),
   'args'=>['slug'=>['type'=>'string','required'=>true],'title'=>['type'=>'string','required'=>true],'source_url'=>['type'=>'string','required'=>true],'source_checked_at'=>['type'=>'string','required'=>true],'description'=>['type'=>'string','required'=>true]],
   'callback'=>static function(WP_REST_Request $req) {
    $source=esc_url_raw((string)$req['source_url']);
    if(strpos($source,'https://www.nps.gov/')!==0)return new WP_Error('bad_source','NPS park fact records require official source',['status'=>422]);
    $slug=sanitize_title((string)$req['slug']);$title=sanitize_text_field((string)$req['title']);$content=wp_kses_post((string)$req['description']);
    $existing=get_page_by_path($slug,OBJECT,'clm_park');
    $id=wp_insert_post(['ID'=>$existing?->ID??0,'post_type'=>'clm_park','post_status'=>'draft','post_name'=>$slug,'post_title'=>$title,'post_content'=>$content],true);
    if(is_wp_error($id))return $id;
    update_post_meta($id,'clm_source_url',$source);update_post_meta($id,'clm_source_checked_at',sanitize_text_field((string)$req['source_checked_at']));
    update_post_meta($id,'clm_qa_approved','0');update_post_meta($id,'clm_editorial_status','source_only');
    return rest_ensure_response(['post_id'=>$id,'status'=>'draft','qa_approved'=>false,'review_url'=>get_edit_post_link($id,'')]);
   }]);
 }
 static function product_guard(string $status,object $product):string {return $status;}
}
CLM_National_Parks_Core::init();
