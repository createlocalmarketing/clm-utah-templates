import React, {useMemo, useState} from 'react';
import {
  Alert, Image, Linking, Platform, SafeAreaView, ScrollView, StatusBar,
  StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import * as Location from 'expo-location';
import sourceParks from './src/data/parks.json';

/**
 * Native iOS/Android application source, not the GitHub Pages iframe.
 * First-party CLM UI components with native platform controls.
 * Account, verified rewards, QR redemption, ecommerce and maps are deliberately NOT
 * simulated as active until connected to authenticated production backend.
 */
type Park = {id:string;name:string;short:string;state:string;npsCode:string;officialUrl:string;image:string|null;reviewStatus:string;featured:boolean};
type Tab = 'Discover'|'Parks'|'Passport'|'Rewards'|'Safety';
const PARKS = sourceParks as Park[];
const FEATURED = ['great-smoky-mountains','yellowstone','glacier','yosemite','zion'];
const ordered = [...PARKS].sort((a,b)=>FEATURED.indexOf(a.id)<0&&FEATURED.indexOf(b.id)<0?a.name.localeCompare(b.name):FEATURED.indexOf(a.id)<0?1:FEATURED.indexOf(b.id)<0?-1:FEATURED.indexOf(a.id)-FEATURED.indexOf(b.id));
const C={pine:'#163e31',forest:'#0c2921',gold:'#d5ae72',paper:'#f5f2e9',light:'#e7ece4',ink:'#1e3a2d',muted:'#6f8475',white:'#ffffff'};
const CATEGORIES=[
 ['Plan Your Visit','Entry, transport, fees and park conditions','plan'],
 ['Things To Do','Trails, landmarks, wildlife and family experiences','things-to-do'],
 ['Where To Stay','Lodges, cabins, campsites and gateway towns','stay'],
 ['Where To Eat','Local restaurants, cafes and groceries','eat'],
 ['Local Businesses','Tours, rentals and visitor services','businesses'],
 ['News & Events','Ranger programs, park stories and conservation','events-news'],
 ['Offers & Rewards','Responsible challenges and verified local offers','deals-rewards'],
 ['Park Gift Shop','Original collectibles and locally inspired goods','shop']
] as const;

function Label({children,light=false}:{children:React.ReactNode;light?:boolean}){
 return <Text style={[styles.kicker,light&&{color:C.gold}]}>{children}</Text>;
}
function Btn({title,onPress,secondary=false}:{title:string;onPress:()=>void;secondary?:boolean}){
 return <TouchableOpacity accessibilityRole="button" style={[styles.btn,secondary&&styles.btnSecondary]} onPress={onPress}><Text style={[styles.btnText,secondary&&{color:C.pine}]}>{title}</Text></TouchableOpacity>;
}
function Photo({park,tall=false}:{park:Park;tall?:boolean}){
 return <View style={[styles.photo,tall&&{height:280}]}>
  {park.image?<Image source={{uri:park.image}} resizeMode="cover" style={StyleSheet.absoluteFillObject}/>:
  <View style={styles.originalMedia}><Text style={styles.originalMediaSymbol}>△</Text><Text style={styles.originalMediaText}>{park.short.toUpperCase()}</Text><Text style={styles.originalMediaFine}>ORIGINAL VISUAL SOURCE PENDING</Text></View>}
 </View>;
}
function SmallCard({park,onPress}:{park:Park;onPress:()=>void}){
 return <TouchableOpacity style={styles.parkCard} onPress={onPress} accessibilityRole="button" accessibilityLabel={'Discover '+park.name}>
  <Photo park={park}/><View style={{padding:15}}><Label>{park.state}</Label><Text style={styles.cardTitle}>{park.name}</Text><Text style={styles.cardLink}>Explore park →</Text></View>
 </TouchableOpacity>;
}
function EmptyBlock({title,detail}:{title:string;detail:string}){
 return <View style={styles.empty}><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.body}>{detail}</Text></View>;
}
export default function App(){
 const [tab,setTab]=useState<Tab>('Discover');
 const [selected,setSelected]=useState<Park|null>(null);
 const [topic,setTopic]=useState<string|null>(null);
 const [search,setSearch]=useState('');
 const [favorites,setFavorites]=useState<string[]>([]);
 const [dayCount,setDayCount]=useState(2);
 const [gpsStatus,setGpsStatus]=useState('Off — no location requested or stored');
 const filtered=useMemo(()=>ordered.filter(p=>(p.name+' '+p.state).toLowerCase().includes(search.toLowerCase())),[search]);
 function openPark(p:Park){setSelected(p);setTopic(null);setTab('Parks')}
 function back(){setTopic(null);setSelected(null)}
 async function openOfficial(park:Park|null){const url=park?.officialUrl||'https://www.nps.gov/planyourvisit/index.htm';await Linking.openURL(url)}
 async function askGPS(){
  try {
   const result=await Location.requestForegroundPermissionsAsync();
   if(result.status!=='granted'){setGpsStatus('Permission declined — adventure exploration remains available');return}
   const point=await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Balanced});
   // Only use the location in transient memory. No raw location logging, storage, background tracker,
   // reward points, geofence assertions or server transmission without user/park consent and safe routes.
   if(Number.isFinite(point.coords.latitude)&&Number.isFinite(point.coords.longitude))
    setGpsStatus('Permission granted — location sampled privately, not stored or submitted');
  }catch{
   setGpsStatus('Unable to obtain a reliable GPS fix — no check-in recorded');
  }
 }
 const isSaved=selected&&favorites.includes(selected.id);
 const home=<>
  <View style={styles.hero}><Label light>THE AMERICAN ADVENTURE PASSPORT</Label><Text style={styles.heroTitle}>Find your wild.</Text><Text style={styles.heroText}>Discover, explore and help protect all 63 U.S. national parks.</Text><View style={{marginTop:21,alignSelf:'flex-start'}}><Btn title="Explore the parks →" onPress={()=>setTab('Parks')}/></View></View>
  <View style={styles.section}><Text style={styles.heading}>Discover the extraordinary.</Text><Text style={styles.body}>Five top-searched parks to start. A nationwide park directory beneath the adventure.</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rail} contentContainerStyle={{gap:13,paddingRight:20}}>
    {FEATURED.map(id=>{const p=PARKS.find(x=>x.id===id);return p?<SmallCard key={id} park={p} onPress={()=>openPark(p)}/>:null})}
    </ScrollView>
  </View>
  <View style={styles.section}><Label>BUILD A BETTER PARK DAY</Label><Text style={styles.heading}>The journey is yours.</Text><View style={styles.grid2}>
    {[['Explore trails','See activities for a park','Parks'],['Plan an itinerary','Choose your days and park','Parks'],['Adventure passport','Discover the collectible system','Passport'],['Local offers','Verified merchant deals only','Rewards']].map(([title,subtitle,dest])=>
      <TouchableOpacity key={title} style={styles.actionTile} onPress={()=>setTab(dest as Tab)}><Text style={styles.actionIcon}>✦</Text><Text style={styles.actionTitle}>{title}</Text><Text style={styles.actionSub}>{subtitle}</Text><Text style={styles.cardLink}>Open →</Text></TouchableOpacity>)}
  </View></View>
  <View style={styles.section}><Label>RESPONSIBLE EXPLORATION</Label><Text style={styles.heading}>Know before you go.</Text><Text style={styles.body}>Access, weather, permits, wildlife and safety are specific to each park. We always link the National Park Service's official guidance.</Text><Btn title="Official NPS safety information ↗" secondary onPress={()=>setTab('Safety')}/></View>
 </>;
 const parksScreen=selected?<>
 <TouchableOpacity onPress={back} style={styles.back}><Text style={styles.backText}>← All 63 National Parks</Text></TouchableOpacity>
 <Photo park={selected} tall/>
 <View style={styles.section}>
  <Label>{selected.state} · NPS NATIONAL PARK</Label><Text style={styles.heading}>{selected.name}</Text>
  <Text style={styles.body}>Your park, your experience: explore history, activities, travel planning, local businesses, park news, events and safe visitor information.</Text>
  <View style={styles.buttonRow}><Btn title="Official NPS ↗" secondary onPress={()=>openOfficial(selected)}/><Btn title={isSaved?'Saved ♥':'Save ♥'} onPress={()=>setFavorites(v=>v.includes(selected.id)?v.filter(id=>id!==selected.id):[...v,selected.id])}/></View>
  <Text style={styles.sectionTitle}>What would you like to explore?</Text>
  {CATEGORIES.map(([title,detail,slug])=><TouchableOpacity key={slug} onPress={()=>setTopic(slug)} style={[styles.categoryRow,topic===slug&&{borderColor:C.gold,backgroundColor:'#fff4de'}]}><View style={{flex:1}}><Text style={styles.categoryTitle}>{title}</Text><Text style={styles.actionSub}>{detail}</Text></View><Text style={styles.arrow}>›</Text></TouchableOpacity>)}
  {topic&&<View style={styles.topicPanel}><Label>{selected.short.toUpperCase()} · VISITOR EXPERIENCE</Label><Text style={styles.sectionTitle}>{CATEGORIES.find(x=>x[2]===topic)?.[0]}</Text>
   <Text style={styles.body}>This dedicated native screen will connect to the full source-reviewed {selected.short} article, categorized merchants, verified trails, photo locations and date-specific facts through the CLM WordPress/ACF API. No invented live availability is shown.</Text>
   <Btn title="See published park source ↗" secondary onPress={()=>openOfficial(selected)}/>
  </View>}
  <View style={styles.notice}><Text style={styles.noticeText}>PRELAUNCH EDITORIAL: Original long-form content and location-specific media require review. See official NPS for real-time conditions.</Text></View>
 </View></>:<>
 <View style={styles.darkHead}><Label light>FIND YOUR NEXT STORY</Label><Text style={styles.headerTitle}>Explore all 63 parks.</Text><Text style={styles.darkCopy}>Search by destination or state. Open a park to explore its own native page.</Text></View>
 <View style={styles.section}><TextInput accessibilityLabel="Search national parks" placeholder="Search parks, states and regions…" placeholderTextColor="#708274" value={search} onChangeText={setSearch} style={styles.input} autoCapitalize="none"/>
  <Text style={[styles.body,{marginVertical:16}]}>{filtered.length} of 63 parks</Text>
  {filtered.map(p=><TouchableOpacity style={styles.listCard} key={p.id} onPress={()=>openPark(p)}><View style={styles.listPhoto}>{p.image?<Image source={{uri:p.image}} style={StyleSheet.absoluteFillObject}/>:<Text style={{color:'#e9d2a3',fontSize:30}}>△</Text>}</View><View style={{flex:1,paddingHorizontal:13}}><Text style={styles.listTitle}>{p.name}</Text><Text style={styles.actionSub}>{p.state}</Text></View><Text style={styles.arrow}>›</Text></TouchableOpacity>)}
 </View></>;
 const passport=<>
 <View style={styles.darkHead}><Label light>COLLECT WITH PURPOSE</Label><Text style={styles.headerTitle}>Your Adventure Passport.</Text><Text style={styles.darkCopy}>63 parks, a lifetime of discovery. Earn official-independent digital collectible stamps through safe approved challenges.</Text></View>
 <View style={styles.section}><View style={styles.balance}><Text style={styles.kicker}>VERIFIED PARK STAMPS</Text><Text style={styles.balanceCount}>0 / 63</Text><Text style={styles.body}>No source-verified visit records are connected yet. You can still explore and save parks.</Text></View>
 <Text style={styles.sectionTitle}>Your saved destinations</Text>{favorites.length?favorites.map(id=>{const p=PARKS.find(x=>x.id===id);return p?<TouchableOpacity key={id} onPress={()=>openPark(p)} style={styles.categoryRow}><Text style={styles.categoryTitle}>{p.name} →</Text></TouchableOpacity>:null}):<EmptyBlock title="Your adventure starts here." detail="Save parks on their individual screens to make your destination shortlist."/>}
 <Text style={styles.sectionTitle}>How stamps will work</Text><Text style={styles.body}>Approved challenges may include visitor-center learning, official trails when safe and open, park trivia, ethical photo spots, conservation activities, and participating local business events. GPS check-ins must be explicitly consented to and verified on the backend. No real points or merchant offers are invented here.</Text>
 <Btn title="Browse parks & challenges →" onPress={()=>setTab('Parks')}/>
 </View></>;
 const rewards=<><View style={styles.darkHead}><Label light>THE LOCAL VISITOR ECONOMY</Label><Text style={styles.headerTitle}>Unlock more adventure.</Text><Text style={styles.darkCopy}>Ethical, merchant-authorized visitor offers and original collectible rewards.</Text></View><View style={styles.section}><EmptyBlock title="Real deals require real merchants." detail="Merchant validation, coupon terms, QR redemption and secure WooCommerce payments are not yet connected to this native build. No false discounts are shown."/><Text style={styles.sectionTitle}>Discover the local gateway</Text><Text style={styles.body}>Choose a park to find its hotels, restaurants, outfitters, tours, rentals and locally owned businesses. Source-verified listings will sync between national and state platforms.</Text><Btn title="Explore park destinations →" onPress={()=>setTab('Parks')}/></View></>;
 const safety=<><View style={styles.darkHead}><Label light>POWERED BY DISASTERSTRIKE</Label><Text style={styles.headerTitle}>Explore boldly. Prepare wisely.</Text><Text style={styles.darkCopy}>Safety begins with official park conditions, weather guidance and a plan someone trusts.</Text></View><View style={styles.section}><Text style={styles.sectionTitle}>Official park advisories</Text><Text style={styles.body}>Trail closures, wildfire, flash flooding, wildlife restrictions, weather alerts and seasonal road conditions need official sources. This is not an emergency dispatch or SOS service.</Text><Btn title="National Park Service ↗" onPress={()=>openOfficial(null)}/>
 <Text style={styles.sectionTitle}>GPS privacy and trail check-ins</Text><Text style={styles.body}>Native location permission is opt-in and foreground-only. Permission tests do not save coordinates or award points. Challenge authentication requires the production backend.</Text><View style={styles.notice}><Text style={styles.noticeText}>{gpsStatus}</Text></View><Btn title="Request one-time GPS permission" secondary onPress={askGPS}/>
 <Text style={styles.sectionTitle}>Before you hit the trail</Text>{['Check current park conditions and restrictions','Share your route and expected return','Carry weather-appropriate layers and water','Know how to turn around safely','Never pursue a reward beyond a closure or edge'].map(x=><View key={x} style={styles.categoryRow}><Text style={styles.categoryTitle}>✓ {x}</Text></View>)}
 </View></>;
 const selectedView:Record<Tab,React.ReactNode>={Discover:home,Parks:parksScreen,Passport:passport,Rewards:rewards,Safety:safety};
 return <SafeAreaView style={styles.root}><StatusBar barStyle="light-content" backgroundColor={C.forest}/><View style={styles.topStrip}><Text style={styles.brand}>▲ NATIONAL PARKS <Text style={{color:C.gold}}>GUIDE</Text></Text><Text style={styles.topRight}>DISCOVER • EXPLORE • PRESERVE</Text></View>
 <ScrollView key={tab+selected?.id+topic} style={styles.scroll} contentContainerStyle={{paddingBottom:110}} keyboardShouldPersistTaps="handled">{selectedView[tab]}</ScrollView>
 <View style={styles.tabs}>{(['Discover','Parks','Passport','Rewards','Safety'] as Tab[]).map((name,i)=><TouchableOpacity accessibilityRole="tab" accessibilityState={{selected:tab===name}} key={name} onPress={()=>{setTab(name);if(name!=='Parks'){setSelected(null);setTopic(null)}}} style={[styles.tab,tab===name&&styles.tabActive]}><Text style={[styles.tabIcon,tab===name&&{color:C.pine}]}>{['◆','△','◉','◇','✚'][i]}</Text><Text style={[styles.tabText,tab===name&&{color:C.pine,fontWeight:'800'}]}>{name}</Text></TouchableOpacity>)}</View>
 </SafeAreaView>;
}
const styles=StyleSheet.create({
 root:{flex:1,backgroundColor:C.paper},scroll:{flex:1},
 topStrip:{backgroundColor:C.forest,paddingHorizontal:17,paddingVertical:14,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
 brand:{color:C.white,fontSize:14,fontWeight:'900',letterSpacing:1.2},topRight:{color:'#b9d0c2',fontSize:8,fontWeight:'700',letterSpacing:.6},
 hero:{backgroundColor:C.pine,paddingHorizontal:26,paddingTop:47,paddingBottom:49},heroTitle:{fontSize:55,lineHeight:57,color:C.white,fontWeight:'900',letterSpacing:-1.8,marginVertical:14},heroText:{color:'#d4e1d6',fontSize:16,lineHeight:24},
 kicker:{fontSize:10,fontWeight:'900',color:'#ae7e45',letterSpacing:2},section:{padding:21},heading:{fontSize:30,lineHeight:34,fontWeight:'800',color:C.ink,letterSpacing:-.6,marginVertical:12},body:{fontSize:13,lineHeight:21,color:C.muted},
 rail:{marginTop:20},parkCard:{width:230,borderRadius:12,backgroundColor:'white',overflow:'hidden',borderWidth:1,borderColor:'#dce5d9'},photo:{height:155,backgroundColor:'#406452',overflow:'hidden'},originalMedia:{flex:1,backgroundColor:C.pine,justifyContent:'center',alignItems:'center'},
 originalMediaSymbol:{fontSize:47,color:C.gold},originalMediaText:{fontSize:12,color:'white',fontWeight:'800',letterSpacing:1.5,marginTop:5},originalMediaFine:{fontSize:8,color:'#c8d2bf',marginTop:5},
 cardTitle:{fontSize:20,fontWeight:'900',color:C.ink,marginTop:8},cardLink:{fontSize:12,color:C.pine,marginTop:12,fontWeight:'900'},
 btn:{paddingHorizontal:18,paddingVertical:13,borderRadius:8,backgroundColor:C.gold,alignItems:'center',justifyContent:'center',minHeight:42},btnSecondary:{backgroundColor:'white',borderWidth:1,borderColor:'#b5c8b8'},btnText:{color:'#1e3528',fontWeight:'800',fontSize:12},
 grid2:{flexDirection:'row',flexWrap:'wrap',gap:9,marginTop:18},actionTile:{width:'48%',backgroundColor:'white',padding:16,borderWidth:1,borderColor:'#dbe6da',borderRadius:10,minHeight:152},
 actionIcon:{fontSize:24,color:C.gold},actionTitle:{fontSize:15,color:C.ink,fontWeight:'900',marginTop:8},actionSub:{color:C.muted,fontSize:11,lineHeight:17,marginTop:4},
 darkHead:{padding:26,backgroundColor:C.forest},headerTitle:{fontSize:39,lineHeight:42,letterSpacing:-.8,fontWeight:'900',color:'white',marginTop:12,marginBottom:11},darkCopy:{fontSize:13,lineHeight:21,color:'#c5d8cb'},
 input:{backgroundColor:'white',borderWidth:1,borderColor:'#b9c9b9',padding:15,borderRadius:9,fontSize:14,color:C.ink},
 listCard:{flexDirection:'row',alignItems:'center',padding:10,marginBottom:10,backgroundColor:'white',borderWidth:1,borderColor:'#dbe2d8',borderRadius:10},
 listPhoto:{width:68,height:65,borderRadius:8,backgroundColor:'#486d5c',overflow:'hidden',justifyContent:'center',alignItems:'center'},
 listTitle:{fontSize:15,fontWeight:'900',color:C.ink},arrow:{fontSize:26,color:C.gold,marginRight:3},
 back:{padding:18,backgroundColor:'white'},backText:{fontWeight:'900',color:C.pine},
 sectionTitle:{fontSize:23,fontWeight:'900',color:C.ink,marginTop:25,marginBottom:14},buttonRow:{flexDirection:'row',gap:10,marginVertical:14},
 categoryRow:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderRadius:9,borderWidth:1,borderColor:'#dbe5d9',backgroundColor:'white',marginBottom:10,padding:17},
 categoryTitle:{fontSize:15,fontWeight:'800',color:C.ink},topicPanel:{padding:20,borderWidth:1,borderColor:C.gold,backgroundColor:'white',marginTop:17,borderRadius:9},
 notice:{backgroundColor:'#fff2d6',borderLeftWidth:4,borderLeftColor:C.gold,padding:13,marginTop:19},noticeText:{color:'#725739',fontSize:12,lineHeight:19},
 balance:{backgroundColor:'white',padding:22,borderRadius:12,borderWidth:1,borderColor:'#d8e4d8'},balanceCount:{fontSize:48,fontWeight:'900',color:C.pine,marginVertical:12},
 empty:{backgroundColor:'white',padding:22,borderRadius:11,borderWidth:1,borderColor:'#dce5dd',marginVertical:15},emptyTitle:{fontSize:19,fontWeight:'900',color:C.ink,marginBottom:11},
 tabs:{flexDirection:'row',backgroundColor:'white',borderTopWidth:1,borderColor:'#dfe9dd',minHeight:67,paddingBottom:Platform.OS==='ios'?7:0},
 tab:{flex:1,alignItems:'center',justifyContent:'center',paddingVertical:7},tabActive:{backgroundColor:'#e8eee4',borderRadius:8},tabIcon:{fontSize:23,color:'#698173'},tabText:{fontSize:10,color:'#658073',marginTop:3}
});
