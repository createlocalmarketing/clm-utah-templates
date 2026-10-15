<?php
/**
 * National Parks Guide production register -> WordPress native Elementor content.
 * Registers drafts for unverified routes; NEVER claims blank merchant/event/products.
 * Loaded after the existing first-party plugin; admin-only REST actions.
 */
defined('ABSPATH') || exit;

function npg_catalog_rows(): array {
    static $cached = null;
    if (is_array($cached)) return $cached;
    $all = []; $folder = dirname(__DIR__) . '/data/';
    foreach (range(1, 8) as $index) {
        $file = $folder . sprintf('production-register-part-%02d.json', $index);
        if (!is_readable($file)) throw new RuntimeException('Register file missing: part '.$index);
        $part = json_decode((string)file_get_contents($file), true);
        if (!is_array($part) || !isset($part['rows']) || !is_array($part['rows']))
            throw new RuntimeException('Malformed production register: part '.$index);
        foreach ($part['rows'] as $item) $all[] = $item;
    }
    if (count($all) !== 8411) throw new RuntimeException('Expected 8411 contracted targets; got '.count($all));
    $cached = $all;
    return $cached;
}
function npg_catalog_counts(array $rows): array {
    $counts = ['total'=>count($rows),'national'=>0,'zion'=>0,'app'=>0,'invalid'=>0,'family'=>[]];
    $seen = [];
    foreach ($rows as $row) {
        $domain = (string)($row['domain'] ?? '');
        if ($domain === 'NATIONAL') $counts['national']++;
        elseif ($domain === 'ZION') $counts['zion']++;
        elseif ($domain === 'APP') $counts['app']++;
        else $counts['invalid']++;
        $fam = (string)($row['family'] ?? 'other');
        $counts['family'][$fam] = ($counts['family'][$fam] ?? 0)+1;
        $url = (string)($row['url'] ?? '');
        $seen[$domain.'|'.$url] = true;
    }
    $counts['distinct_domain_urls'] = count($seen);
    return $counts;
}
function npg_catalog_elementor(array $item, string $parkName, string $npsUrl, int $postId): array {
    $num = 0;
    $nextId = static function() use ($postId, &$num): string {
        return sprintf('%08x', ($postId * 1000) + (++$num));
    };
    $w = static function(string $type,array $settings) use ($nextId):array {
        return ['id'=>$nextId(),'elType'=>'widget','widgetType'=>$type,'settings'=>$settings,'elements'=>[]];
    };
    $h = static function(string $text,string $tag='h2') use ($w):array {
        return $w('heading',['title'=>$text,'header_size'=>$tag,'title_color'=>'#173f31',
            'typography_typography'=>'custom','typography_font_family'=>'Outfit','typography_font_weight'=>'700',
            'typography_font_size'=>['unit'=>'px','size'=>$tag==='h1'?45:30]]);
    };
    $p = static function(string $text) use ($w):array {
        return $w('text-editor',['editor'=>esc_html($text),'text_color'=>'#526b5a',
            'typography_typography'=>'custom','typography_font_family'=>'DM Sans','typography_font_size'=>['unit'=>'px','size'=>16]]);
    };
    $b = static function(string $label,string $url) use($w):array {
        return $w('button',['text'=>$label,'link'=>['url'=>$url,'is_external'=>str_contains($url,'nps.gov')?'yes':''],
            'button_background_color'=>'#193f31','button_text_color'=>'#ffffff',
            'selected_icon'=>['value'=>'fas fa-chevron-circle-right','library'=>'fa-solid']]);
    };
    $section = static function(string $class,array $children,string $bg='#ffffff') use ($nextId):array {
        return ['id'=>$nextId(),'elType'=>'container','settings'=>[
            'container_type'=>'flex','content_width'=>'full','flex_direction'=>'column',
            'css_classes'=>'npg-clm-native-section '.$class,
            'padding'=>['unit'=>'px','top'=>42,'right'=>36,'bottom'=>46,'left'=>36,'isLinked'=>false],
            'flex_gap'=>['unit'=>'px','size'=>16],
            'background_background'=>'classic','background_color'=>$bg
        ],'elements'=>$children];
    };
    $title = sanitize_text_field((string)$item['title']);
    $family = sanitize_text_field((string)($item['family']??'Visitor Guide'));
    $keyword = sanitize_text_field((string)($item['keyword']??$title));
    $parkLabel = $parkName !== '' ? $parkName.' National Park' : 'America’s National Parks';
    $subject = $parkName !== '' ? $title.' at '.$parkLabel : $title.' across America’s national parks';
    $source = $npsUrl !== '' ? $npsUrl : 'https://www.nps.gov/planyourvisit/index.htm';
    $familyNotice = 'Editorial category: '.$family.'. Primary research topic: '.$keyword.'. This page has not passed original reporting, approved media, business verification or page-by-page quality acceptance.';
    return [
        $section('npg-clm-route-hero',[
            $h('NATIONAL PARKS GUIDE · '.$family,'span'),$h($subject,'h1'),
            $p('Use this destination research record to identify relevant visitor information, responsible park authorities and the planning questions that must be answered before travel.'),
            $b('Find official visitor guidance',$source),
            $b('Explore all 63 national parks',home_url('/national-parks/'))
        ],'#eaf0e7'),
        $section('npg-clm-route-planning',[
            $h('Planning '.$keyword),
            $p('For '.$parkLabel.', research current park access, seasons, closures, activity rules, entrance routes, accessibility and operating services. Do not interpret a research category as an available reservation or verified provider.'),
            $h('Review current access and permit requirements','h3'),
            $p('Check the National Park Service and the responsible operator for date-specific changes. Rules and operating conditions differ between parks and services.'),
            $b('National Park Service source',$source)
        ]),
        $section('npg-clm-route-connect',[
            $h('Related visitor planning topics'),
            $p('Compare this research topic with the broader visitor experience: activities, transportation, accommodation, dining, supplies and visitor safety. Accurate recommendations require the correct entrance and a current verified source.'),
            $b('Plan a park itinerary',home_url('/trip-planner/')),
            $b('National activities and experiences',home_url('/things-to-do/')),
            $b('Nationwide gateway business guide',home_url('/local-businesses/'))
        ],'#f4f7f1'),
        $section('npg-clm-route-faq',[
            $h('Questions to verify before your visit'),
            $h('Where can I confirm current information?','h3'),
            $p('Use the park authority and current operating provider. Historical summaries and preview URLs cannot confirm today’s conditions or availability.'),
            $h('Are local businesses or tickets verified here?','h3'),
            $p('No. Merchant identities, location radius, permits, prices and availability must be researched and individually reviewed before publication.'),
            $h('Does a 25-mile distance guarantee nearby access?','h3'),
            $p('No. Entrance geography, seasonal roads and route travel times must also be checked.')
        ]),
        $section('npg-clm-route-trust',[
            $h('Sources and editorial verification'),
            $p('This independently produced research document is not an official National Park Service publication.'),
            $p($familyNotice),
            $b('Read park authority information',$source)
        ],'#f5f7ef'),
    ];
}
function npg_catalog_import_batch(int $offset, int $limit, bool $dry): array {
    $rows=npg_catalog_rows();
    $national = array_values(array_filter($rows,static fn($a)=>(string)($a['domain']??'')==='NATIONAL'));
    $total=count($national);
    if ($total !== 8145) throw new RuntimeException('National target mismatch; expected 8145, found '.$total);
    $offset=max(0,$offset); $limit=max(1,min(150,$limit));
    $slice=array_slice($national,$offset,$limit);
    $sum=['offset'=>$offset,'limit'=>$limit,'total'=>$total,'processed'=>0,'created'=>0,'updated'=>0,
          'preserved'=>0,'errors'=>0,'drafts_created'=>0,'published'=>0,'dry_run'=>$dry,'results'=>[]];
    $seed=function_exists('npg_park_seed')?npg_park_seed():[];
    $parkMap=[];
    foreach ($seed as $record) {
        $parkMap[sanitize_title((string)($record['slug']??''))]=$record;
    }
    $known=[];
    foreach ($slice as $route) {
        $sum['processed']++;
        $url=(string)($route['url']??'');
        $parsed=wp_parse_url($url);
        if (!$parsed || !in_array(strtolower((string)($parsed['host']??'')),['nationalparksguide.co','www.nationalparksguide.co'],true)) {
            $sum['errors']++; $sum['results'][]=['url'=>$url,'error'=>'Non-national URL refused']; continue;
        }
        $path=trim(rawurldecode((string)($parsed['path']??'')),'/');
        if($path==='' && ($route['family']??'')==='Homepage') {
            $sum['preserved']++;$sum['results'][]=['url'=>$url,'status'=>'existing_homepage_preserved'];continue;
        }
        if($path===''){$sum['errors']++;continue;}
        $parts=array_values(array_filter(explode('/',$path),'strlen'));
        $segments=[];$parent=0;$page=null;
        foreach($parts as $idx=>$segment) {
            $segments[]=sanitize_title($segment);
            $key=implode('/',$segments);
            if(isset($known[$key])) {$parent=$known[$key];continue;}
            $found=get_page_by_path($key,OBJECT,'page');
            if($found) { $known[$key]=(int)$found->ID; $parent=(int)$found->ID;continue; }
            if($dry){$known[$key]=0;$parent=0;continue;}
            $isLeaf=$idx===count($parts)-1;
            $label=$isLeaf ? sanitize_text_field((string)($route['title']??$segment)) : ucwords(str_replace('-',' ',$segment));
            $pageId=wp_insert_post([
                'post_type'=>'page','post_status'=>'draft','post_parent'=>$parent,
                'post_name'=>sanitize_title($segment),'post_title'=>$label,
                'post_content'=>'','comment_status'=>'closed','ping_status'=>'closed'
            ],true);
            if(is_wp_error($pageId) || (int)$pageId<1) {
                $sum['errors']++;$sum['results'][]=['url'=>$url,'error'=>'WordPress page creation rejected'];continue 2;
            }
            $known[$key]=(int)$pageId;
            $parent=(int)$pageId;
            $sum['created']++;
            $sum['drafts_created']++;
            update_post_meta((int)$pageId,'_yoast_wpseo_meta-robots-noindex','1');
            update_post_meta((int)$pageId,'_npg_catalog_state','research_draft');
        }
        if ($dry){$sum['results'][]=['url'=>$url,'status'=>'would_create_or_preserve'];continue;}
        $id=$parent; $page=get_post($id);
        if(!$page) {$sum['errors']++;continue;}
        $routeId=sanitize_text_field((string)($route['id']??''));
        if(get_post_meta($id,'_npg_catalog_id',true)===$routeId) {
            $sum['preserved']++;$sum['results'][]=['url'=>$url,'status'=>'catalog_already_installed','post_id'=>$id];continue;
        }
        if(get_post_meta($id,'_elementor_data',true) || ($page->post_status==='publish' && !get_post_meta($id,'_npg_catalog_state',true))) {
            $sum['preserved']++;$sum['results'][]=['url'=>$url,'status'=>'existing_content_preserved','post_id'=>$id];continue;
        }
        $parkSlug = count($parts)>=2 && $parts[0]==='parks' ? $parts[1] : '';
        $parkRecord=$parkMap[$parkSlug]??[];
        $parkName=sanitize_text_field((string)($parkRecord['name']??($route['park']??'')));
        if($parkName==='All parks')$parkName='';
        $npsUrl=esc_url_raw((string)($parkRecord['source']??''));
        $tree=npg_catalog_elementor($route,$parkName,$npsUrl,$id);
        $json=wp_json_encode($tree);
        if(!is_string($json)||json_decode($json,true)===null){$sum['errors']++;continue;}
        update_post_meta($id,'_elementor_edit_mode','builder');
        update_post_meta($id,'_elementor_data',wp_slash($json));
        update_post_meta($id,'_npg_catalog_id',$routeId);
        update_post_meta($id,'_npg_catalog_url',$url);
        update_post_meta($id,'_npg_catalog_family',sanitize_text_field((string)($route['family']??'')));
        update_post_meta($id,'_npg_catalog_keyword',sanitize_text_field((string)($route['keyword']??'')));
        update_post_meta($id,'_npg_catalog_state','research_draft');
        update_post_meta($id,'_npg_media_review','not_approved');
        update_post_meta($id,'_npg_local_provider_review','not_verified');
        update_post_meta($id,'_npg_publication_approved','no');
        update_post_meta($id,'_yoast_wpseo_meta-robots-noindex','1');
        if($page->post_title!==sanitize_text_field((string)$route['title'])) {
            wp_update_post(['ID'=>$id,'post_title'=>sanitize_text_field((string)$route['title'])]);
        }
        $check=json_decode((string)get_post_meta($id,'_elementor_data',true),true);
        if(!is_array($check)||count($check)!==5){$sum['errors']++;$sum['results'][]=['url'=>$url,'error'=>'Elementor read-back failed'];continue;}
        $sum['updated']++;
        $sum['results'][]=['url'=>$url,'post_id'=>$id,'status'=>'native_elementor_draft_saved'];
    }
    $sum['next_offset']=$offset+$sum['processed'];
    $sum['complete']=$sum['next_offset'] >= $total;
    return $sum;
}
add_action('rest_api_init',static function():void {
    register_rest_route('npg/v1','/build/register-preflight',[
        'methods'=>'GET','permission_callback'=>static fn():bool=>current_user_can('manage_options'),
        'callback'=>static function() {
            try{return rest_ensure_response(npg_catalog_counts(npg_catalog_rows()));}
            catch(Throwable $e){return new WP_Error('npg_register_invalid',$e->getMessage(),['status'=>409]);}
        }
    ]);
    register_rest_route('npg/v1','/build/register-import',[
        'methods'=>'POST','permission_callback'=>static fn():bool=>current_user_can('manage_options'),
        'args'=>[
            'offset'=>['type'=>'integer','default'=>0,'minimum'=>0],
            'limit'=>['type'=>'integer','default'=>80,'minimum'=>1,'maximum'=>150],
            'dry_run'=>['type'=>'boolean','default'=>true],
        ],
        'callback'=>static function(WP_REST_Request $request) {
            try{return rest_ensure_response(npg_catalog_import_batch((int)$request['offset'],(int)$request['limit'],(bool)$request['dry_run']));}
            catch(Throwable $e){error_log('[NPG catalog] '.$e->getMessage());return new WP_Error('npg_register_import_failed',$e->getMessage(),['status'=>409]);}
        }
    ]);
});