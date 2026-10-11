(function artRuntime(){
const D=window.CLM_PARKS;
const palette={zion:['#894b32','#e6a06b','#f3ddba'],yellowstone:['#204c46','#dfa757','#e8dbc3'],'great-smoky-mountains':['#274b47','#94b9ad','#e5eadc'],yosemite:['#45545b','#afbcad','#e2e2d7'],glacier:['#294c61','#80b8c2','#e4eef0']};
function esc(s){return String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
const body={
sticker:'<rect x="108" y="65" width="164" height="138" rx="35" fill="#fff9eb" stroke="#a18b62" stroke-width="5"/>',
patch:'<path d="M190 47 272 83v75c0 42-32 66-82 88-50-22-82-46-82-88V83Z" fill="#edcf9e" stroke="#5a5347" stroke-width="9"/>',
pin:'<circle cx="190" cy="142" r="83" fill="#eac789" stroke="#9d7441" stroke-width="14"/><circle cx="190" cy="142" r="73" fill="none" stroke="#fff9e9" stroke-width="5"/>',
print:'<rect x="98" y="45" width="184" height="200" fill="#fff9ec" stroke="#724e36" stroke-width="19"/><rect x="116" y="63" width="148" height="164" fill="#d2e2d4"/>',
tshirt:'<path d="M146 55h88l31 20 45 38-29 37-29-19v125H128V131l-29 19-29-37 45-38Z" fill="#f4ddbd" stroke="#88694c" stroke-width="7"/>',
mug:'<path d="M114 74h144v122q0 33-35 33h-74q-35 0-35-33Z" fill="#ece1cb" stroke="#8c785e" stroke-width="7"/><path d="M258 105h25q48 4 19 59-12 19-44 18" fill="none" stroke="#8c785e" stroke-width="17"/>',
journal:'<rect x="110" y="43" width="166" height="207" rx="7" fill="#d4a97b" stroke="#604f40" stroke-width="7"/><rect x="119" y="43" width="18" height="207" fill="#6f5346"/>',
postcard:'<rect x="88" y="95" width="196" height="135" rx="6" fill="#e6cfac" stroke="#886543" stroke-width="5"/><rect x="117" y="57" width="196" height="135" rx="6" fill="#fff5e2" stroke="#886543" stroke-width="5"/>',
magnet:'<path d="M118 66h144v110q0 72-72 72t-72-72V66Z" fill="#f1dcbb" stroke="#af7152" stroke-width="11"/>',
tote:'<path d="M114 104h151l20 145H95Z" fill="#ead8b6" stroke="#927c5a" stroke-width="7"/><path d="M147 112V86a43 43 0 0 1 86 0v26" fill="none" stroke="#927c5a" stroke-width="8"/>',
bandana:'<path d="M64 76h252l-126 168Z" fill="#df9879" stroke="#9b5e4c" stroke-width="7"/>',
bottle:'<rect x="152" y="61" width="78" height="193" rx="25" fill="#83aaa5" stroke="#365f58" stroke-width="7"/><rect x="163" y="33" width="57" height="42" rx="9" fill="#365f58"/>',
cap:'<path d="M111 156q-12-98 79-105 91 7 79 105Z" fill="#cca77a" stroke="#7c624d" stroke-width="8"/><path d="M91 163q102-30 199 0-4 30-97 26t-102-26" fill="#ab795a" stroke="#745844" stroke-width="5"/>',
hoodie:'<path d="M149 54q41-47 81 0l24 27 49 43-35 29-15-16v118H127V137l-15 16-35-29 49-43Z" fill="#a4baae" stroke="#5d786c" stroke-width="8"/>',
puzzle:'<path d="M111 65h58q-16 36 16 36t16-36h68v73q-34-21-34 12t34 15v72H110v-70q32 17 32-15t-32-16Z" fill="#f2d7ac" stroke="#9b7f55" stroke-width="8"/>',
map:'<path d="M82 72 157 50l72 24 74-24v170l-74 24-72-24-75 24Z" fill="#e8d7b9" stroke="#998769" stroke-width="6"/><path d="m157 50 0 170m72-146v170" fill="none" stroke="#a38e6c" stroke-width="4"/>',
ornament:'<circle cx="190" cy="158" r="83" fill="#e5b778" stroke="#947145" stroke-width="10"/><rect x="174" y="55" width="32" height="26" rx="5" fill="#aa9b77"/><path d="M190 40q-26 0-26 19h52q0-19-26-19" stroke="#aa9b77" stroke-width="6" fill="none"/>',
bookmark:'<path d="M137 32h107v228l-54-39-53 39Z" fill="#e0bb87" stroke="#806348" stroke-width="7"/>',
calendar:'<rect x="96" y="59" width="189" height="185" rx="9" fill="#fbefe0" stroke="#826d56" stroke-width="7"/><path d="M96 112h189" stroke="#826d56" stroke-width="7"/>',
badge:'<path d="M190 38 240 70l54 4-12 62 17 51-60 17-49 50-49-50-60-17 17-51-12-62 54-4Z" fill="#f1c77d" stroke="#957047" stroke-width="8"/>'
};
function art(x){
const colors=palette[x.park]||['#254d40','#c5b277','#e9e2d0'];const tone=(x.category.length*17+x.park.length*13)%22;
const shape=body[x.category]||body.badge;
return `<svg class="npg-product-art" viewBox="0 0 380 318" role="img" aria-label="Original concept illustration of ${esc(x.name)}, not actual photographed inventory" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="bg-${esc(x.id)}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${colors[2]}"/><stop offset="1" stop-color="${colors[1]}"/></linearGradient></defs>
<rect width="380" height="318" fill="url(#bg-${esc(x.id)})"/><circle cx="${296-tone}" cy="59" r="58" fill="${colors[1]}" opacity=".36"/>
<g>${shape}</g>
<path d="M132 171 163 114l27 35 17-22 41 44" fill="${colors[0]}" opacity=".85" stroke="${colors[0]}" stroke-width="2" stroke-linejoin="round"/>
<path d="M143 183c22-12 35-11 49 0 17 12 30 10 47-3" fill="none" stroke="${colors[1]}" stroke-width="7" stroke-linecap="round"/>
<text x="190" y="216" fill="${colors[0]}" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" font-weight="900">${esc(x.park.replace(/-/g,' ').toUpperCase().slice(0,19))}</text>
<text x="190" y="296" fill="#3c3a32" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="800">${esc(x.category.toUpperCase())} / CONCEPT ART</text>
</svg>`;
}
D.productArt=art;
})();