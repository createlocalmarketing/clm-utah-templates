/* Brand configs — the ONLY thing that differs between domains.
   Every page type/feature lives in the shared engine; a brand supplies theme, scope, emphasis and nav. */
window.CLM_BRANDS = {
  utrd: {
    key: 'utrd', short: 'UTRD', bodyClass: 'brand-utrd', mark: 'U', word: ['Utah Real Estate', 'Directory'],
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
    key: 'pch', short: 'Park City', bodyClass: 'brand-pch', mark: 'PC', word: ['Homes For Sale', 'Park City'],
    name: 'Homes for Sale in Park City', domain: 'homesforsaleinparkcityutah.com',
    scope: ['summit', 'wasatch'],   // Wasatch Back: Summit + Wasatch counties down to neighborhoods
    primaryCity: 'park-city', primaryCounty: 'summit',
    areaName: 'Park City & the Wasatch Back', eyebrow: 'Wasatch Back · Summit & Wasatch counties', areaShort: 'Park City',
    urlBase: '', // production: /{county}/{city}/{neighborhood}/
    heroImg: 'hero_park_city', heroAlt: 'deer-valley-twilight',
    headline: ['Park City homes,', 'mountain to Main Street.'],
    lede: 'Every Park City, Heber, Midway, Kamas and Wasatch Back listing, neighborhood, school, event and local pro — with Park City first.',
    mls: 'PCBOR · WFRMLS (Summit & Wasatch)',
    nav: [['#/homes', 'Search MLS'], ['#/neighborhoods', 'Neighborhoods'], ['#/things-to-do', 'Lifestyle'], ['#/market-data', 'Market'], ['#/realtors', 'Agents'], ['#/directory', 'Directory'], ['#/news', 'Real Estate News']],
    featuredAgent: { name: 'Adam Griffee', team: 'Lawson Team · eXp Realty', img: 'adam-griffee' },
  },
  sg: {
    key: 'sg', short: 'St. George', bodyClass: 'brand-sg', mark: 'SG', word: ['Homes For Sale', 'St. George'],
    name: 'Homes for Sale in St. George', domain: 'homesforsaleinstgeorgeutah.com',
    scope: ['washington'],   // all of Washington County, St. George as the primary news emphasis
    primaryCity: 'st-george', primaryCounty: 'washington',
    areaName: 'St. George & Washington County', eyebrow: 'Southern Utah · Washington County', areaShort: 'St. George',
    urlBase: '', // production: /{county}/{city}/{neighborhood}/
    heroImg: 'st-george-redrock', heroAlt: 'sg-ivins-hero',
    headline: ['St. George homes,', 'red rock to golf course.'],
    lede: 'Every St. George, Ivins, Santa Clara, Washington, Hurricane and Washington County listing, neighborhood, school, event and local pro — with St. George first.',
    mls: 'Washington County MLS · WFRMLS',
    nav: [['#/homes', 'Search MLS'], ['#/neighborhoods', 'Neighborhoods'], ['#/things-to-do', 'Lifestyle'], ['#/market-data', 'Market'], ['#/realtors', 'Agents'], ['#/directory', 'Directory'], ['#/news', 'Real Estate News']],
    featuredAgent: { name: 'Adam Griffee', team: 'Lawson Team · eXp Realty', img: 'adam-griffee' },
  },
  iur: {
    key: 'iur', short: 'Inside Utah', bodyClass: 'brand-iur', mark: 'IU', word: ['Inside Utah', 'Real Estate'],
    name: 'Inside Utah Real Estate', domain: 'insideutahrealestate.com',
    scope: null,              // statewide editorial hub
    primaryCity: null, primaryCounty: null,
    areaName: 'Utah', areaShort: 'Utah',
    urlBase: '/utah',
    heroImg: 'iur-hero-editorial', heroAlt: 'iur-saltlake-wasatch',
    headline: ['Inside every Utah', 'neighborhood.'],
    lede: 'Utah real estate news, neighborhood guides, local businesses, events and the people who make each community — statewide, drilling down to every neighborhood.',
    mls: 'WFRMLS · PCBOR · Washington County MLS',
    nav: [['#/news', 'Real Estate News'], ['#/state', 'Counties'], ['#/cities', 'Cities'], ['#/homes', 'Homes'], ['#/events', 'Events'], ['#/directory', 'Directory'], ['#/relocation', 'Relocation']],
    featuredAgent: { name: 'Adam Griffee', team: 'Lawson Team · eXp Realty', img: 'adam-griffee' },
  },
};
/* Area-of-influence radii (miles) per content type, used when a page is scoped to a city or neighborhood.
   "Boating in St. George" / "skiing in Park City" pull everything within the radius, labeled with distance. */
window.CLM_RADIUS = { news: 25, events: 30, activities: 60, schools: 12, jobs: 30, deals: 20, market: 25, classifieds: 25, listings_nearby: 12, businesses: 25 };
