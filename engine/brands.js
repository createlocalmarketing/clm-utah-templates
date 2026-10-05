/* Brand configs — the ONLY thing that differs between domains.
   Every page type/feature lives in the shared engine; a brand supplies theme, scope, emphasis and nav. */
window.CLM_BRANDS = {
  utrd: {
    key: 'utrd', bodyClass: 'brand-utrd', mark: 'U', word: ['Utah Real Estate', 'Directory'],
    name: 'Utah Real Estate Directory', domain: 'utahrealestatedirectory.com',
    scope: null,              // null = all 29 Utah counties
    primaryCity: null, primaryCounty: null,
    areaName: 'Utah', areaShort: 'Utah',
    urlBase: '/utah', // production: /utah/{region}/{county}/{city}/{neighborhood}/
    heroImg: 'iur-saltlake-wasatch', heroAlt: 'iur-zion-canyon',
    headline: ['Every Utah home,', 'business and neighborhood.'],
    lede: 'The statewide directory: live MLS homes, 29 counties, 328 cities and 815 neighborhoods, plus the local businesses, schools, events and pros that serve each one.',
    mls: 'WFRMLS · PCBOR · Washington County MLS',
    nav: [['#/homes', 'Search MLS'], ['#/state', 'Counties'], ['#/cities', 'Cities'], ['#/realtors', 'Agents'], ['#/directory', 'Directory'], ['#/news', 'Real Estate News'], ['#/market-data', 'Market Data']],
    featuredAgent: { name: 'Adam Griffee', team: 'Lawson Team · eXp Realty', img: 'adam-griffee' },
  },
  pch: {
    key: 'pch', bodyClass: 'brand-pch', mark: 'PC', word: ['Homes For Sale', 'Park City'],
    name: 'Homes for Sale in Park City', domain: 'homesforsaleinparkcityutah.com',
    scope: ['summit', 'wasatch'],   // Wasatch Back: Summit + Wasatch counties down to neighborhoods
    primaryCity: 'park-city', primaryCounty: 'summit',
    areaName: 'Park City & the Wasatch Back', areaShort: 'Park City',
    urlBase: '', // production: /{county}/{city}/{neighborhood}/
    heroImg: 'hero_park_city', heroAlt: 'deer-valley-twilight',
    headline: ['Park City homes,', 'mountain to Main Street.'],
    lede: 'Every Park City, Heber, Midway, Kamas and Wasatch Back listing, neighborhood, school, event and local pro — with Park City first.',
    mls: 'PCBOR · WFRMLS (Summit & Wasatch)',
    nav: [['#/homes', 'Search MLS'], ['#/neighborhoods', 'Neighborhoods'], ['#/things-to-do', 'Lifestyle'], ['#/market-data', 'Market'], ['#/realtors', 'Agents'], ['#/directory', 'Directory'], ['#/news', 'Real Estate News']],
    featuredAgent: { name: 'Adam Griffee', team: 'Lawson Team · eXp Realty', img: 'adam-griffee' },
  },
};
/* Area-of-influence radii (miles) per content type, used when a page is scoped to a city or neighborhood.
   "Boating in St. George" / "skiing in Park City" pull everything within the radius, labeled with distance. */
window.CLM_RADIUS = { news: 25, events: 30, activities: 60, schools: 12, jobs: 30, deals: 20, market: 25, classifieds: 25, listings_nearby: 12, businesses: 25 };
