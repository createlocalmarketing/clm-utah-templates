<?php
/**
 * First-party NPG Visitor Passport: privacy-first server-side reward ledger.
 * Never award real merchant value solely from self-reported client GPS.
 * No device coordinates are retained. NPS affiliation not asserted.
 */
declare(strict_types=1);
if(!defined('ABSPATH'))exit;
final class CLM_Park_Visitor_Rewards {
 const TABLE='clm_visitor_ledger'; const API='clm-parks/v1';
 static function install():void {
  global $wpdb;
  require_once ABSPATH.'wp-admin/includes/upgrade.php';
  $name=$wpdb->prefix.self::TABLE;
  $sql="CREATE TABLE {$name} (
    id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    account_id bigint(20) unsigned NOT NULL,
    challenge_id bigint(20) unsigned NOT NULL,
    activity_type varchar(32) NOT NULL,
    idempotency_key varchar(64) NOT NULL,
    coarse_accuracy varchar(32) NOT NULL DEFAULT '',
    status varchar(20) NOT NULL DEFAULT 'pending',
    points int NOT NULL DEFAULT 0,
    verified_by bigint(20) unsigned NOT NULL DEFAULT 0,
    created_at datetime NOT NULL,
    verified_at datetime DEFAULT NULL,
    PRIMARY KEY  (id),
    UNIQUE KEY unique_attempt (account_id,idempotency_key),
    KEY user_created (account_id,created_at),
    KEY status_check (status,created_at)
  ) {$wpdb->get_charset_collate()};";
  dbDelta($sql);
 }
 static function boot():void { add_action('rest_api_init',[__CLASS__,'register']); }
 static function register():void {
  $auth=static fn()=>is_user_logged_in();
  register_rest_route(self::API,'/passport',[
   'methods'=>'GET','permission_callback'=>$auth,
   'callback'=>static function() {
     global $wpdb;$uid=get_current_user_id();$table=$wpdb->prefix.self::TABLE;
     $entries=$wpdb->get_results($wpdb->prepare(
      "SELECT challenge_id,activity_type,status,points,coarse_accuracy,created_at FROM {$table} WHERE account_id=%d ORDER BY created_at DESC LIMIT 200",$uid),ARRAY_A);
     $points=array_reduce($entries,static fn($sum,$row)=>$sum+($row['status']==='approved'?(int)$row['points']:0),0);
     return rest_ensure_response(['account_id'=>$uid,'earned_points'=>$points,'entries'=>$entries,
      'reward_policy'=>'Credits only after verified server-side challenge review; not cash or merchant coupons.']);
   }]);
  register_rest_route(self::API,'/challenges',[
   'methods'=>'GET','permission_callback'=>'__return_true',
   'callback'=>static function() {
    $posts=get_posts(['post_type'=>'clm_challenge','post_status'=>'publish','numberposts'=>100]);
    $items=[];foreach($posts as $p){
     if(!CLM_National_Parks_Core::approved($p->ID))continue;
     $items[]=['id'=>$p->ID,'title'=>$p->post_title,'type'=>get_post_meta($p->ID,'clm_challenge_type',true),
      'park_id'=>get_post_meta($p->ID,'clm_park_id',true),
      'instructions'=>wp_strip_all_tags($p->post_content),
      'claim_status'=>'Eligibility requires responsible visit or learning proof; no rewards for restricted access'];
    }return rest_ensure_response($items);
   }]);
  register_rest_route(self::API,'/check-in',[
   'methods'=>'POST','permission_callback'=>$auth,
   'args'=>[
    'challenge_id'=>['type'=>'integer','required'=>true],
    'latitude'=>['type'=>'number','required'=>true],
    'longitude'=>['type'=>'number','required'=>true],
    'accuracy_m'=>['type'=>'number','required'=>true],
    'consent'=>['type'=>'boolean','required'=>true],
    'idempotency_key'=>['type'=>'string','required'=>true]],
   'callback'=>[__CLASS__,'check_in']
  ]);
  register_rest_route(self::API,'/passport/delete-history',[
   'methods'=>'DELETE','permission_callback'=>$auth,
   'callback'=>static function(){
    global $wpdb; $count=$wpdb->delete($wpdb->prefix.self::TABLE,['account_id'=>get_current_user_id()],['%d']);
    return rest_ensure_response(['deleted_entries'=>(int)$count,'message'=>'Your stored park activity ledger entries have been deleted.']);
   }]);
  register_rest_route(self::API,'/admin/approve-check-in',[
   'methods'=>'POST','permission_callback'=>static fn()=>current_user_can('manage_options'),
   'args'=>['activity_id'=>['type'=>'integer','required'=>true],'approved'=>['type'=>'boolean','required'=>true],'points'=>['type'=>'integer','required'=>true]],
   'callback'=>static function(WP_REST_Request $req){
     global $wpdb;$table=$wpdb->prefix.self::TABLE;$id=(int)$req['activity_id'];
     $row=$wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE id=%d",$id),ARRAY_A);
     if(!$row||$row['status']!=='pending')return new WP_Error('bad_review','Only pending activities may be reviewed',['status'=>409]);
     $yes=(bool)$req['approved'];$points=$yes?max(0,min(100,(int)$req['points'])):0;
     $wpdb->update($table,['status'=>$yes?'approved':'rejected','points'=>$points,'verified_by'=>get_current_user_id(),'verified_at'=>current_time('mysql',true)],['id'=>$id],['%s','%d','%d','%s'],['%d']);
     return rest_ensure_response(['status'=>$yes?'approved':'rejected','points'=>$points]);
   }]);
 }
 static function meters(float $lat1,float $lon1,float $lat2,float $lon2):float {
  $a=deg2rad($lat2-$lat1);$b=deg2rad($lon2-$lon1);
  return 6371000*2*asin(min(1,sqrt(sin($a/2)**2+cos(deg2rad($lat1))*cos(deg2rad($lat2))*sin($b/2)**2)));
 }
 static function check_in(WP_REST_Request $req) {
  global $wpdb;$uid=get_current_user_id();
  if($req['consent']!==true)return new WP_Error('consent_required','Explicit one-time GPS consent is required',['status'=>403]);
  $lat=(float)$req['latitude'];$lon=(float)$req['longitude'];$accuracy=(float)$req['accuracy_m'];
  if(abs($lat)>90||abs($lon)>180||!is_finite($lat)||!is_finite($lon)||$accuracy<0||$accuracy>100)
   return new WP_Error('bad_location','A recent sufficiently accurate location fix is required',['status'=>422]);
  $pid=(int)$req['challenge_id'];$challenge=get_post($pid);
  if(!$challenge||$challenge->post_type!=='clm_challenge'||!CLM_National_Parks_Core::approved($pid))
   return new WP_Error('closed_challenge','Challenge not approved, safely available, or still open',['status'=>404]);
  if(get_post_meta($pid,'clm_safe_open',true)!=='1')return new WP_Error('unsafe','This waypoint is not verified as currently safe and legally accessible',['status'=>403]);
  $lat0=get_post_meta($pid,'clm_geo_lat',true);$lon0=get_post_meta($pid,'clm_geo_lon',true);
  if(!is_numeric($lat0)||!is_numeric($lon0))return new WP_Error('no_verified_waypoint','Challenge has no safe reference geofence',['status'=>422]);
  $radius=max(30,min(250,(float)get_post_meta($pid,'clm_radius_m',true)?:120));
  $d=self::meters($lat,$lon,(float)$lat0,(float)$lon0);
  if($d>$radius+$accuracy)return new WP_Error('out_of_range','You are outside the confirmed challenge waypoint area',['status'=>422]);
  $key=sanitize_text_field((string)$req['idempotency_key']);
  if(!preg_match('/^[A-Za-z0-9_-]{12,64}$/',$key))return new WP_Error('invalid_attempt','Invalid unique attempt ID',['status'=>422]);
  $table=$wpdb->prefix.self::TABLE;
  $last=$wpdb->get_var($wpdb->prepare("SELECT created_at FROM {$table} WHERE account_id=%d AND challenge_id=%d ORDER BY created_at DESC LIMIT 1",$uid,$pid));
  if($last && time()-strtotime($last.' UTC')<3600)return new WP_Error('cooldown','Only one check-in attempt per hour is allowed',['status'=>429]);
  $ok=$wpdb->insert($table,[
    'account_id'=>$uid,'challenge_id'=>$pid,'activity_type'=>'gps_checkin','idempotency_key'=>$key,
    'coarse_accuracy'=>$accuracy<=25?'excellent':($accuracy<=50?'good':'moderate'),
    'status'=>'pending','points'=>0,'created_at'=>current_time('mysql',true)
   ],['%d','%d','%s','%s','%s','%s','%d','%s']);
  if(!$ok)return new WP_Error('duplicate_attempt','That check-in was already submitted',['status'=>409]);
  // Do NOT save submitted latitude/longitude; transient memory-only computation.
  return rest_ensure_response(['activity_id'=>(int)$wpdb->insert_id,'status'=>'pending',
    'points_awarded'=>0,'message'=>'Check-in received for safety and authenticity review. No merchant reward or park endorsement is implied.',
    'coordinates_stored'=>false]);
 }
}
CLM_Park_Visitor_Rewards::boot();
