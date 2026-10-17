#!/usr/bin/env node
/**
 * Native Elementor guardrail for National Parks Guide.
 * This scans actual Elementor JSON documents, not static HTML previews.
 * Use: node wordpress/elementor/validate-native-templates.mjs
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
const root=fileURLToPath(new URL("./native-templates/",import.meta.url));
const forbiddenWidgets=new Set([
  "html","shortcode","wp-widget-custom_html","code-highlight","wp-widget-text"
]);
const approvedWidgets=new Set([
  "heading","text-editor","button","image","image-box","nested-carousel",
  "image-carousel","gallery","accordion","nested-accordion","icon-list",
  "loop-grid","loop-carousel","video","table-of-contents","posts",
  "nav-menu","mega-menu","search-form","breadcrumbs","form","google_maps",
  "theme-site-logo","theme-site-title","theme-page-title","theme-post-title",
  "theme-post-featured-image","theme-post-content","archive-posts","template"
]);
const forbiddenSettingKeys=/^(custom_css|custom_js|custom_html|html_code|css_code|shortcode)$/i;
const forbiddenMarkup=/<(script|iframe|style|form|div|section|button|img|picture|object|embed)\b/i;
let count=0;
let failed=0;
async function walkDir(dir){
  for(const entry of await readdir(dir,{withFileTypes:true})){
    const full=join(dir,entry.name);
    if(entry.isDirectory())await walkDir(full);
    else if(entry.name.endsWith(".json"))await inspect(full);
  }
}
async function inspect(file){
 const obj=JSON.parse(await readFile(file,"utf8"));
 if(!Array.isArray(obj.content)||obj.version!=="0.4")throw Error(file+": bad Elementor import envelope");
 const ids=new Set(),stats={elements:0,images:0,carousels:0,headings:0,widgets:0};
 function visit(nodes){
 for(const element of nodes){
   stats.elements++;
   if(!/^[0-9a-f]{8}$/.test(element.id)||ids.has(element.id))throw Error(file+": missing/duplicate 8-digit Elementor id "+element.id);
   ids.add(element.id);
   if(!["container","widget"].includes(element.elType))throw Error(file+": invalid Elementor type");
   if(element.elType==="widget"){
     stats.widgets++;
     const type=element.widgetType;
     if(forbiddenWidgets.has(type)||!approvedWidgets.has(type))throw Error(file+": prohibited/unregistered-widget target "+type);
     if(type==="image")stats.images++;
     if(type==="heading" && ["h1","h2","h3"].includes(element.settings.header_size))stats.headings++;
     if(type==="nested-carousel"){
       stats.carousels++;
       if(!Array.isArray(element.elements)||element.elements.length<2)throw Error(file+": carousel must contain native editable nested slides");
       if(element.settings.carousel_items.length!==element.elements.length)throw Error(file+": slide repeater/children mismatch");
     }
   }
   const settings=element.settings||{};
   for(const [key,value] of Object.entries(settings)){
     if(forbiddenSettingKeys.test(key))throw Error(file+": forbidden setting "+key);
     if((key==="editor"||key==="title")&&typeof value==="string"&&forbiddenMarkup.test(value))throw Error(file+": markup embedded inside content for "+key);
   }
   if(Array.isArray(element.elements))visit(element.elements);
 }
 }
 visit(obj.content);
 if(stats.carousels<1||stats.images<1||stats.headings<5)throw Error(file+": missing native content architecture "+JSON.stringify(stats));
 console.log("PASS",file.replace(root,""),JSON.stringify(stats));
 count++;
}
try{
 await walkDir(root);
 if(count===0)throw Error("No native Elementor templates exist");
 console.log("TOTAL",count,"VALID NATIVE ELEMENTOR TEMPLATES — 0 HTML widgets");
}catch(error){console.error("FAIL",error.message);process.exitCode=1}
