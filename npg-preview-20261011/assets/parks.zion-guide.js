(function initializeZionGuide(){
  "use strict";
  const U=window.ParkUI, D=window.CLM_PARKS;
  if(!U||!D)throw new Error("Zion guide needs park registry");
  const esc=U.esc;
  const sourceMap="https://www.springdale.utah.gov/DocumentCenter/View/2195/Zion-Canyon-Visitors-Bureau-Shuttle-Map--";
  const sourceLodging="https://www.visitutah.com/places-to-go/parks-outdoors/zion/where-to-stay";
  const sourceTrails="https://www.nps.gov/zion/planyourvisit/zion-canyon-trail-descriptions.htm";
  const sourceConditions="https://www.nps.gov/zion/planyourvisit/conditions.htm";
  const sourceCamp="https://www.nps.gov/zion/planyourvisit/campgrounds-in-zion.htm";
  const q=(name)=>"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(name+", Springdale Utah Zion");
  const mapUrl=(name,area)=>"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(name+(area==="In Zion National Park"?", Zion National Park":", "+(area||"Springdale")+", Utah"));
  const records=[
    ["cable-mountain","Cable Mountain Lodge","hotels","Springdale","Suites and canyon views near the pedestrian entrance.",sourceLodging],
    ["cliffrose","Cliffrose Springdale","hotels","Springdale","Riverside hotel and landscaped resort near Zion Canyon Village.",sourceLodging],
    ["desert-pearl","Desert Pearl Inn","hotels","Springdale","River-facing inn with balconies or patios in the gateway town.",sourceLodging],
    ["bumbleberry","Bumbleberry Inn","hotels","Springdale","Central-town accommodation near dining and shuttle stops.",sourceLodging],
    ["flanigans","Flanigan’s Resort & Spa","hotels","Springdale","Hotel, gardens and spa toward the north end of Springdale.",sourceLodging],
    ["driftwood","Driftwood Lodge","hotels","Springdale","South-end stay with Virgin River access and canyon views.",sourceLodging],
    ["zion-lodge","Zion Lodge","hotels","In Zion National Park","The only hotel inside Zion Canyon; access differs from Springdale.",sourceLodging],
    ["springhill","SpringHill Suites by Marriott Springdale","hotels","Springdale","Suite-style lodging along the Springdale shuttle corridor.",sourceLodging],
    ["watchman","Watchman Campground","camping","In Zion National Park","Reservable year-round tent and RV sites close to the visitor center.","https://www.nps.gov/zion/planyourvisit/watchman-campground.htm"],
    ["south","South Campground","camping","In Zion National Park","Seasonal park campground; verify availability and closure dates.","https://www.nps.gov/zion/planyourvisit/south-campground.htm"],
    ["zion-canyon-rv","Zion Canyon Campground & RV Resort","camping","Springdale","Private camping and RV stays close to the canyon entrance.",sourceLodging],
    ["zion-river-rv","Zion River Resort RV Park & Campground","camping","Virgin","RV resort in the broader Zion gateway area; distance verification pending.",sourceLodging],
    ["willow-wind","WillowWind RV Park","camping","Hurricane","Full-hookup RV park in the Hurricane gateway area; distance verification pending.","https://www.utah.com/destinations/national-parks/zion-national-park/springdale-utah/property/"],
    ["oscars","Oscar’s Café","dining","Springdale","Breakfast, Tex-Mex-style plates, sandwiches and patio dining.",sourceMap],
    ["memes","MeMe’s Café","dining","Springdale","Crepes, burgers and casual breakfast-to-dinner meals.",sourceMap],
    ["bit-spur","Bit & Spur","dining","Springdale","Southwestern-influenced dining along Zion Park Boulevard.",sourceMap],
    ["spotted-dog","Spotted Dog","dining","Springdale","Restaurant near the north end of town and the park entrance.",sourceMap],
    ["zion-pizza","Zion Pizza & Noodle Co.","dining","Springdale","Pizza and pasta in Springdale’s central dining corridor.",sourceMap],
    ["zion-brew","Zion Canyon Brew Pub","dining","Springdale","Casual food and gathering place near the pedestrian entrance.",sourceMap],
    ["thai-sapa","Thai Sapa","dining","Springdale","Thai restaurant along Zion Park Boulevard.",sourceMap],
    ["wild-thyme","Wild Thyme Café","dining","Springdale","Cafe and dining option toward the south end of town.",sourceMap],
    ["canyon-coffee","Canyon Coffee","dining","Springdale","Coffee stop near the Springdale shuttle corridor.",sourceMap],
    ["kings-landing","King’s Landing Bistro","dining","Springdale","Dinner restaurant listed on the Zion Canyon visitor map.",sourceMap],
    ["zion-adventure","Zion Adventures","tours","Springdale","Outfitting and guided adventure services; confirm route authorizations.",sourceMap],
    ["zion-guide","Zion Guide Hub","tours","Springdale","Custom climbing, cycling, hiking and canyon-area guided experiences.",sourceMap],
    ["zion-guru","Zion Guru","tours","Springdale","Guiding, outdoor equipment and local adventure advice.",sourceMap],
    ["zion-jeep","Zion Jeep Tours","tours","Springdale","Guided off-road experiences outside protected park travel restrictions.",sourceMap],
    ["mild-wild","Mild to Wild Rhino Tours","tours","Springdale","Locally listed motorized scenic touring service; route restrictions apply.",sourceMap],
    ["zion-outfitter","Zion Outfitter","tours","Springdale","Visitor gear and outdoor activity outfitting near the entrance.",sourceMap],
    ["zion-cycles","Zion Cycles","rentals","Springdale","Bicycle and e-bike rentals, service and local riding assistance.",sourceMap],
    ["zion-peddler","Zion Peddler","rentals","Springdale","Bicycle-oriented service listed in the town visitor map.",sourceMap],
    ["sol-foods","Sol Foods Supermarket","essentials","Springdale","Groceries, food supplies and picnic provisions.",sourceMap],
    ["hoodoos","Hoodoos Market & Boutique","essentials","Springdale","Convenience provisions and shopping along the gateway corridor.",sourceMap],
    ["happy-camper","Happy Camper Market","essentials","Springdale","Travel provisions near the pedestrian entrance.",sourceMap],
    ["trailhead-gear","Trailhead Gifts & Gear","essentials","Springdale","Visitor supplies and souvenirs near the park entrance.",sourceMap],
    ["zion-forever","Zion Forever Project Park Store","essentials","Springdale","Park-related educational merchandise and visitor supplies.",sourceMap],
    ["bumbleberry-gifts","Bumbleberry Gifts","essentials","Springdale","Local retail and souvenirs near central Springdale.",sourceMap],
    ["david-west","David J West Gallery","galleries","Springdale","Fine-art photography gallery in Springdale.",sourceMap],
    ["dezion","DeZion Gallery","galleries","Springdale","Art gallery serving visitors to the Zion gateway.",sourceMap],
    ["worthington","Worthington Gallery","galleries","Springdale","Local art gallery on the Springdale visitor map.",sourceMap],
    ["sorella","Sorella Gallery","galleries","Springdale","Gallery and gift-shopping stop in central Springdale.",sourceMap],
    ["tribal-arts","Tribal Arts Gallery","galleries","Springdale","Gallery specializing in regional arts and cultural objects.",sourceMap],
    ["zion-rock-gem","Zion Rock & Gem","galleries","Springdale","Geology-inspired collectibles, stones and local gift shopping.",sourceMap],
    ["zion-canyon-shuttle","Zion Canyon Shuttle","transport","In Zion National Park","National Park Service transit in Zion Canyon; check seasonal schedules.","https://www.nps.gov/zion/planyourvisit/zion-canyon-shuttle-system.htm"],
    ["springdale-line","Springdale Line Shuttle","transport","Springdale","Town shuttle connecting Springdale stops and the pedestrian entrance.","https://www.springdale.utah.gov/31/Visit-Springdale"],
    ["zion-peddler-transport","Zion Peddler","transport","Springdale","Town-listed bicycle service as an alternative local travel option.",sourceMap],
    ["zion-cycles-transport","Zion Cycles","transport","Springdale","Bicycle rental and ride-planning support around Springdale.",sourceMap]
  ].map(([id,name,category,area,description,source])=>({id,name,category,area,description,source,link:mapUrl(name,area),sourceType:source.includes("nps.gov")?"NPS official":source===sourceMap?"Springdale visitor map":"Utah travel source",mediaStatus:"No cleared property photo yet",distanceStatus:area==="Springdale"?"South-entrance gateway, precise distance pending":"25-mile eligibility not yet verified"}));
  const byId=Object.fromEntries(records.map(r=>[r.id,r]));
  const scene=window.NPG_EDITORIAL_EXPERIENCE?.scene||{};
  const makeScene=(fileName)=>"https://commons.wikimedia.org/wiki/Special:FilePath/"+encodeURIComponent(fileName)+"?width=1000";
  const experiences=[
    ["the-narrows","The Narrows","River canyon hike · water safety","River walking conditions and flash-flood risk determine whether a visit is suitable.",makeScene('Zion "The Narrows" Stream.jpg'),"https://www.nps.gov/zion/planyourvisit/the-narrows.htm"],
    ["angels-landing","Angels Landing / Scout Lookout","Strenuous trail · permit restrictions","Check the permit requirements for the chains section and current route conditions.",makeScene("Angels Landing Zion National Park.jpg"),"https://www.nps.gov/zion/planyourvisit/angels-landing-hiking-permits.htm"],
    ["emerald-pools","Emerald Pools","Waterfalls · variable trail access","A series of routes around pools and seasonal waterfalls; verify trail status.",makeScene("Zion National Park.jpg"),sourceTrails],
    ["canyon-overlook","Canyon Overlook","Scenic viewpoint · exposed sections","Short scenic route on the east side with overlooks and exposed terrain.",scene.zion||"",sourceTrails],
    ["parus","Pa’rus Trail","Paved route · mobility options","Virgin River views on a paved shared-use path; review accessibility details.",makeScene("Zion national park.jpg"),"https://www.nps.gov/zion/planyourvisit/trail-access-information.htm"],
    ["riverside-walk","Riverside Walk","Riverside scenery · seasonal access","Approach the narrows of Zion Canyon on the paved riverside walk.",scene.narrows||"",sourceTrails]
  ].map(([id,name,eyebrow,description,image,source])=>({id,name,eyebrow,description,image,source,link:source,area:"Zion National Park",mediaStatus:"Photography requires image-specific rights QA"}));
  const photos=[
    ["canyon-overlook-photo","Canyon Overlook","Red rock panoramas","Iconic canyon vistas from a marked scenic trail; respect path boundaries.",scene.zion||"",sourceTrails],
    ["court-patriarchs","Court of the Patriarchs","Sandstone formations","Classic Zion Canyon viewpoint served by the canyon transport corridor.",makeScene("Zion national park.jpg"),sourceTrails],
    ["watchman-view","The Watchman","Sunrise & river scenery","Classic red-rock skyline visible from visitor areas and the Pa’rus corridor.",scene.zionwide||"",sourceTrails],
    ["river-walk-photo","Riverside Walk","Virgin River detail","Layers of rock and river-side landscapes in upper Zion Canyon.",scene.narrows||"",sourceTrails],
    ["pa-rus-photo","Pa’rus River Bridges","Canyon light","Bridge and river views on the accessible Pa’rus route.",makeScene("Zion NP20.jpg"),sourceTrails],
    ["zion-carmel","Zion–Mt. Carmel Highway","Scenic road viewpoint","East-side sandstone scenery; stop only at legal, designated pullouts.",makeScene("Zion National Park Canyon Overlook Trail View.jpg"),"https://www.nps.gov/zion/planyourvisit/directions.htm"]
  ].map(([id,name,eyebrow,description,image,source])=>({id,name,eyebrow,description,image,source,link:source,area:"Zion National Park",mediaStatus:"Photography requires image-specific rights QA"}));
  const rails=[
    {id:"trails",index:"01",group:"DO IN ZION",title:"Hikes, trails & unforgettable routes",subtitle:"Actual named Zion trails, practical decision points and direct official information.",cards:experiences,type:"experience",url:"#/park/zion/topic/things-to-do/hikes-trails",action:"Explore all Zion hikes"},
    {id:"photo-spots",index:"02",group:"SEE IN ZION",title:"Must-see photo spots & scenic viewpoints",subtitle:"Canyon overlooks, riverside views and roadside stops with a real location—not a generic landscape gallery.",cards:photos,type:"experience",url:"#/park/zion/topic/things-to-do/iconic-photo-spots",action:"Explore photo locations"},
    {id:"hotels",index:"03",group:"STAY NEAR ZION",title:"Hotels, inns & lodges",subtitle:"Named places to stay in the park and Springdale, organized around park access and visitor needs.",ids:["cable-mountain","cliffrose","desert-pearl","bumbleberry","flanigans","driftwood","zion-lodge","springhill"],url:"#/park/zion/topic/stay/hotels",action:"See hotel guide"},
    {id:"camping",index:"04",group:"CAMP NEAR ZION",title:"Campgrounds, cabins & RV parks",subtitle:"In-park campgrounds and gateway RV locations; always recheck seasonal operations and availability.",ids:["watchman","south","zion-canyon-rv","zion-river-rv","willow-wind"],url:"#/park/zion/topic/stay/campgrounds",action:"Explore camping"},
    {id:"dining",index:"05",group:"EAT NEAR ZION",title:"Restaurants, cafés & coffee",subtitle:"Actual Springdale dining establishments rather than a single category tile.",ids:["oscars","memes","bit-spur","spotted-dog","zion-pizza","zion-brew","thai-sapa","wild-thyme","canyon-coffee","kings-landing"],url:"#/park/zion/topic/eat/restaurants",action:"See dining guide"},
    {id:"tours",index:"06",group:"EXPERIENCE THE REGION",title:"Guided adventures, tours & packages",subtitle:"Named regional operators. Confirm commercial-use permits and whether tours run inside or outside the park.",ids:["zion-adventure","zion-guide","zion-guru","zion-jeep","mild-wild","zion-outfitter"],url:"#/park/zion/topic/businesses/tour-guides",action:"Find guides & tours"},
    {id:"rentals",index:"07",group:"GEAR UP",title:"Bikes, e-bikes & outdoor equipment rentals",subtitle:"Springdale rental and outfitting providers with real local storefronts and visitor services.",ids:["zion-cycles","zion-adventure","zion-guru","zion-outfitter","zion-peddler"],url:"#/park/zion/topic/businesses/gear-rentals",action:"Compare rental providers"},
    {id:"essentials",index:"08",group:"VISITOR SERVICES",title:"Groceries, supplies & local shops",subtitle:"Shopping stops for food, outdoor essentials, maps, park learning and supplies.",ids:["sol-foods","hoodoos","happy-camper","trailhead-gear","zion-forever","bumbleberry-gifts"],url:"#/park/zion/topic/eat/groceries",action:"Find essentials"},
    {id:"galleries",index:"09",group:"MEET THE COMMUNITY",title:"Galleries, photographers & local makers",subtitle:"The galleries and creative businesses that give Springdale its local character.",ids:["david-west","dezion","worthington","sorella","tribal-arts","zion-rock-gem"],url:"#/park/zion/topic/businesses/photographers",action:"Discover local art"},
    {id:"transport",index:"10",group:"GET AROUND",title:"Shuttles, bikes & visitor transportation",subtitle:"Town and park shuttle systems plus local bike-travel options; confirm service windows.",ids:["springdale-line","zion-canyon-shuttle","zion-peddler-transport","zion-cycles-transport"],url:"#/park/zion/topic/plan/shuttles-parking",action:"Plan arrivals & transport"}
  ].map(r=>({...r,cards:r.cards||(r.ids||[]).map(id=>byId[id]).filter(Boolean)}));
  const iconByRail={trails:"fa-person-hiking","photo-spots":"fa-camera",hotels:"fa-bed",camping:"fa-campground",dining:"fa-utensils",tours:"fa-compass",rentals:"fa-bicycle",essentials:"fa-basket-shopping",galleries:"fa-palette",transport:"fa-bus"};
  const card=(item,rail,i)=>{
    const isPlace=rail.type==="experience";
    const visual=isPlace&&item.image?`<img loading="lazy" decoding="async" src="${esc(item.image)}" alt="${esc(item.name)} scenic photography; source and licensing review pending" onerror="this.classList.add('npg-media-error')">`:
    `<div class="npg-zion-business-art" aria-hidden="true"><i class="fa-solid ${iconByRail[rail.id]||"fa-location-dot"}"></i><span>${esc(item.area||"SPRINGDALE")}</span><strong>${esc(item.name.split(/\s+/).slice(0,2).join(" "))}</strong></div>`;
    const sectionType=isPlace?esc(item.eyebrow):esc(item.area)+" · LOCAL DIRECTORY CANDIDATE";
    return `<article class="npg-zion-card"><div class="npg-zion-card-media">${visual}<span class="npg-zion-serial">${String(i+1).padStart(2,"0")}</span></div><div class="npg-zion-card-body"><span class="npg-zion-card-meta">${sectionType}</span><h3>${esc(item.name)}</h3><p>${esc(item.description)}</p><div class="npg-zion-card-footer"><a href="${esc(item.link)}" target="_blank" rel="noopener noreferrer">${isPlace?"Official trail details":"Location & details"} <span aria-hidden="true">↗</span></a><a href="${esc(item.source)}" target="_blank" rel="noopener noreferrer" title="Open origin/source">Source</a></div></div></article>`;
  };
  const rail=(r)=>{
    const n=r.cards.length;
    return `<section class="npg-zion-rail-section" id="npg-zion-${r.id}" aria-labelledby="npg-zion-heading-${r.id}"><div class="npg-zion-head"><div><div class="npg-zion-eyebrow">${r.index} / ${esc(r.group)} · ${n} ${r.type==="experience"?"PLACES":"RESEARCH CANDIDATES"}</div><h2 id="npg-zion-heading-${r.id}">${esc(r.title)}</h2><p>${esc(r.subtitle)}</p></div><div class="npg-zion-rail-actions"><a href="${esc(r.url)}" class="npg-zion-all">${esc(r.action)} <span aria-hidden="true">↗</span></a><div class="npg-zion-scroll-buttons"><button type="button" data-zion-scroll="${esc(r.id)}" data-direction="-1" aria-label="Scroll ${esc(r.title)} left">‹</button><button type="button" data-zion-scroll="${esc(r.id)}" data-direction="1" aria-label="Scroll ${esc(r.title)} right">›</button></div></div></div><div class="npg-zion-track" id="npg-zion-track-${r.id}" tabindex="0" aria-label="${esc(r.title)}; horizontally scrollable">${r.cards.map((item,i)=>card(item,r,i)).join("")}</div></section>`;
  };
  function render({headings=true,sourceIntro=true}={}){
    return `<div class="npg-zion-market" id="npg-zion-guide">${headings?`<section class="npg-zion-open"><div class="wrap"><div class="npg-zion-open-eyebrow">ZION NATIONAL PARK · SPRINGDALE & THE GATEWAY COMMUNITIES</div><h2>Explore the park. <em>Meet the people around it.</em></h2><p>Ten full discovery shelves: real Zion trails and viewpoints, places to stay and eat, visitor services, outfitters, rentals, shops and the local economy.</p><nav class="npg-zion-quick" aria-label="Explore Zion categories">${rails.map(r=>`<a href="#npg-zion-${r.id}" data-zion-jump="${r.id}">${esc(r.title.split(",")[0].split(" & ")[0])}<span aria-hidden="true">↗</span></a>`).join("")}</nav></div></section>`:""}
    ${sourceIntro?`<div class="npg-zion-disclosure wrap"><i class="fa-solid fa-circle-info" aria-hidden="true"></i><div><strong>Zion south-entrance discovery edition — verified names, not a completed 25-mile census.</strong> Springdale business names are sourced to the <a href="${sourceMap}" target="_blank" rel="noopener">town visitor map</a>, Utah travel resources and NPS. Operator hours, offers, imagery rights, exact geocoordinates and 25-mile eligibility remain subject to verification. In-park campgrounds are not private businesses. <a href="${sourceConditions}" target="_blank" rel="noopener">Check official conditions ↗</a></div></div>`:""}
    <div class="wrap npg-zion-rails">${rails.map(rail).join("")}<div class="npg-zion-next"><div><span>CONTINUE EXPLORING</span><h2>More than a park visit. A complete Zion trip.</h2><p>Build your itinerary around the actual businesses, trails, dates and services that matter—not placeholder categories.</p></div><div class="npg-zion-next-actions"><a class="btn gold" href="#/directory?park=zion">Full Zion business directory →</a><a class="btn alt" href="#/trip-builder?park=zion">Plan a Zion adventure ↗</a></div></div></div></div>`;
  }
  function attach(){
    document.querySelectorAll("#npg-zion-guide [data-zion-scroll]").forEach(button=>{
      button.addEventListener("click",()=>{
        const track=document.getElementById("npg-zion-track-"+button.dataset.zionScroll);
        if(track)track.scrollBy({left:Math.round((track.querySelector(".npg-zion-card")?.getBoundingClientRect().width||290)+20)*Number(button.dataset.direction)*2,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
      });
    });
    document.querySelectorAll("#npg-zion-guide [data-zion-jump]").forEach(link=>link.addEventListener("click",event=>{
      const dest=document.getElementById("npg-zion-"+link.dataset.zionJump);
      if(dest){event.preventDefault();dest.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"})}
    }));
  }
  window.NPG_ZION_GUIDE={render,attach,rails,records,sourceMap,updated:"2026-10-11",status:"research-backed preview / radius and media validation pending"};
})();
