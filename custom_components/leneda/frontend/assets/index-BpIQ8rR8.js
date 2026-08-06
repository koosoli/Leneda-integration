var aa=Object.defineProperty;var ra=(t,e,s)=>e in t?aa(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var De=(t,e,s)=>ra(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const na="modulepreload",oa=function(t){return"/leneda-panel/static/"+t},ts={},pe=function(e,s,a){let n=Promise.resolve();if(s&&s.length>0){let r=function(y){return Promise.all(y.map(f=>Promise.resolve(f).then(b=>({status:"fulfilled",value:b}),b=>({status:"rejected",reason:b}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),p=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));n=r(s.map(y=>{if(y=oa(y),y in ts)return;ts[y]=!0;const f=y.endsWith(".css"),b=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${b}`))return;const $=document.createElement("link");if($.rel=f?"stylesheet":na,f||($.as="script"),$.crossOrigin="",$.href=y,p&&$.setAttribute("nonce",p),document.head.appendChild($),f)return new Promise((d,h)=>{$.addEventListener("load",d),$.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${y}`)))})}))}function o(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return n.then(r=>{for(const i of r||[])i.status==="rejected"&&o(i.reason);return e().catch(o)})};function ys(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()})),proxy_url:(t.proxy_url??"").trim()}}function ia(){var t,e,s,a,n;try{const o=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((n=(a=(s=o==null?void 0:o.hass)==null?void 0:s.auth)==null?void 0:a.data)==null?void 0:n.access_token)??null}catch{return null}}async function J(t,e){const s=ia(),a={...e==null?void 0:e.headers,...s?{Authorization:`Bearer ${s}`}:{}},n={...e,credentials:"include",headers:a},o=await fetch(t,n);if(!o.ok){const r=o.headers.get("content-type")??"";let i="",p="";if(r.includes("application/json")){const y=await o.json().catch(()=>null);i=String((y==null?void 0:y.error)??"").trim(),p=String((y==null?void 0:y.message)??(y==null?void 0:y.error)??"").trim()}else p=(await o.text().catch(()=>"")).trim();throw i==="missing_data"||i==="no_data"||o.status===503?new Error("Missing data"):new Error(p?`API ${o.status}: ${p}`:`API ${o.status}: ${o.statusText}`)}return o.json()}async function ot(t){return J(`/leneda_api/data?range=${t}`)}async function la(t,e){return J(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function je(t,e,s){let a=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),J(a)}async function Ct(t,e,s){let a=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),J(a)}async function Tt(){return J("/leneda_api/sensors")}async function Ne(){return J("/leneda_api/config")}async function da(t){await J("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function ca(){await J("/leneda_api/config/reset",{method:"POST"})}async function fs(){try{return await J("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function ws(){return J("/leneda_api/credentials")}async function ua(t){const e=ys(t);await J("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function pa(t){const e=ys(t);return J("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function bs(){return J("/leneda_api/ha-entities")}const Me=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:Ne,fetchCredentials:ws,fetchCustomData:la,fetchHAEntities:bs,fetchMode:fs,fetchPerMeterTimeseries:Ct,fetchRangeData:ot,fetchSensors:Tt,fetchTimeseries:je,resetConfig:ca,saveConfig:da,saveCredentials:ua,testCredentials:pa},Symbol.toStringTag,{value:"Module"}));function Wt(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(e){const[,s,a,n]=e;return new Date(Number(s),Number(a)-1,Number(n))}return new Date(t)}function m(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function fe(t){return Wt(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function _s(t){return Wt(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function We(t){return Wt(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}const lt=[{id:"year",label:"Year",shortLabel:"Yr",stepLabel:"year",approxMs:365*864e5,maxBuckets:30},{id:"month",label:"Month",shortLabel:"Mo",stepLabel:"month",approxMs:30*864e5,maxBuckets:72},{id:"week",label:"Week",shortLabel:"Wk",stepLabel:"week",approxMs:7*864e5,maxBuckets:104},{id:"day",label:"Day",shortLabel:"Day",stepLabel:"day",approxMs:864e5,maxBuckets:370},{id:"hour",label:"Hour",shortLabel:"Hr",stepLabel:"hour",approxMs:36e5,maxBuckets:744},{id:"quarter_hour",label:"15 min",shortLabel:"15m",stepLabel:"15 minutes",approxMs:15*6e4,maxBuckets:672}];function $s(t){return lt.find(e=>e.id===t)??lt[3]}function Et(t,e){if(!t||!e)return 0;const s=new Date(t).getTime(),a=new Date(e).getTime();return!Number.isFinite(s)||!Number.isFinite(a)?0:Math.max(0,a-s)}function Ge(t,e){const s=$s(t);if(e<=0)return t==="quarter_hour";const a=e/s.approxMs;return a>=1.5&&a<=s.maxBuckets}function ma(t,e){var n;if(e&&Ge(e,t))return e;const s=t/864e5,a=s<=1.25?"quarter_hour":s<=7?"hour":s<=45?"day":s<=180?"week":s<=900?"month":"year";return Ge(a,t)?a:((n=lt.find(o=>Ge(o.id,t)))==null?void 0:n.id)??"quarter_hour"}function ha(t,e){return new Date(t,e+1,0).getDate()}function ss(t,e,s){const a=t.getDate(),n=new Date(t),o=n.getMonth()+s,r=n.getFullYear()+e+Math.floor(o/12),i=(o%12+12)%12,p=Math.min(a,ha(r,i));return n.setFullYear(r,i,p),n}function as(t,e,s){switch(e){case"year":return ss(t,s,0);case"month":return ss(t,0,s);case"week":return new Date(t.getTime()+s*7*864e5);case"day":return new Date(t.getTime()+s*864e5);case"hour":return new Date(t.getTime()+s*36e5);case"quarter_hour":return new Date(t.getTime()+s*15*6e4)}}function xs(t,e,s,a){if(!t||!e)return null;const n=new Date(t),o=new Date(e);return!Number.isFinite(n.getTime())||!Number.isFinite(o.getTime())?null:{start:as(n,s,a),end:as(o,s,a)}}function ga(t,e){if(!t||!e)return"No period loaded";const s=new Date(t),a=new Date(e);if(!Number.isFinite(s.getTime())||!Number.isFinite(a.getTime()))return"No period loaded";if(s.getFullYear()===a.getFullYear()&&s.getMonth()===a.getMonth()&&s.getDate()===a.getDate()){const o=s.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),r=s.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=a.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${o}, ${r} - ${i}`}return`${s.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})} - ${a.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}`}const Ue=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function me(t){const e=s=>`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${s}
    </svg>
  `;switch(t){case"consumption":return e(`
        <path d="M13 2L6 13H11L10 22L18 10H13Z" />
      `);case"production":return e(`
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2V4.5" />
        <path d="M12 19.5V22" />
        <path d="M2 12H4.5" />
        <path d="M19.5 12H22" />
        <path d="M4.93 4.93L6.7 6.7" />
        <path d="M17.3 17.3L19.07 19.07" />
        <path d="M17.3 6.7L19.07 4.93" />
        <path d="M4.93 19.07L6.7 17.3" />
      `);case"export":return e(`
        <path d="M6 18H18" />
        <path d="M12 6V16" />
        <path d="M8 10L12 6L16 10" />
      `);case"self_consumed":return e(`
        <path d="M4 11.5L12 5L20 11.5" />
        <path d="M6.5 10.5V19H17.5V10.5" />
        <path d="M10.5 19V14H13.5V19" />
      `);case"flow":return e(`
        <path d="M8 7H17L14.5 4.5" />
        <path d="M17 7L14.5 9.5" />
        <path d="M16 17H7L9.5 19.5" />
        <path d="M7 17L9.5 14.5" />
        <path d="M7 17C5.5 15.8 4.5 14 4.5 12C4.5 10.7 4.9 9.5 5.6 8.5" />
        <path d="M17 7C18.5 8.2 19.5 10 19.5 12C19.5 13.3 19.1 14.5 18.4 15.5" />
      `);case"metrics":return e(`
        <path d="M5 19V11" />
        <path d="M12 19V7" />
        <path d="M19 19V4" />
        <path d="M3 19H21" />
      `);case"profile":return e(`
        <path d="M4 19V5" />
        <path d="M4 19H20" />
        <path d="M7 15L11 11L14 13L19 8" />
        <circle cx="7" cy="15" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="11" cy="11" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="14" cy="13" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="19" cy="8" r="1.25" fill="currentColor" stroke="none" />
      `);case"warning":return e(`
        <path d="M12 4L20 19H4L12 4Z" />
        <path d="M12 9V13" />
        <path d="M12 16H12.01" />
      `);case"ok":return e(`
        <circle cx="12" cy="12" r="8" />
        <path d="M8.5 12.5L11 15L15.5 9.5" />
      `)}}function va(t){var ue,X,Te,Z,xe,ee,Ie,Ee;const e=t.rangeData,s=C=>{if(!C)return"";const W=C.match(/^(\d{4}-\d{2}-\d{2})/);return W?W[1]:""},a=(e==null?void 0:e.consumption)??0,n=(e==null?void 0:e.production)??0,o=(e==null?void 0:e.exported)??0,r=(e==null?void 0:e.self_consumed)??0,i=(e==null?void 0:e.gas_energy)??0,p=(e==null?void 0:e.gas_volume)??0,y=(e==null?void 0:e.peak_power_kw)??0,f=s(e==null?void 0:e.start),b=s(e==null?void 0:e.end),$=(e==null?void 0:e.shared_with_me)??0,d=(e==null?void 0:e.shared)??0,h=Math.max(0,o),g=(e==null?void 0:e.grid_import)!=null?Math.max(0,a-e.grid_import):void 0,_=Math.max(0,(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(r>0?r:n-h),g??0),k=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??Math.max(0,_-$)),x=_,S=Math.max(0,(e==null?void 0:e.grid_import)??a-_),M=a>0?a:S+_,c=!!((ue=t.config)!=null&&ue.meter_has_gas||(((X=t.config)==null?void 0:X.meters)??[]).some(C=>C.types.includes("gas"))),v=d+$,l=M>0?Math.min(100,_/M*100):0,u=Math.max(M,n,S,h,d,$,k,1),E=c?Math.min(Math.max(0,i),u):0,D=(C,W=2.8,L=8.2)=>C>0?W+C/u*(L-W):1.8,K=C=>D(C)+1.4,V=C=>D(C)+5.4,P=(C,W=.28,L=.88)=>C>0?W+C/u*(L-W):.1,R=(C,W=.09,L=.22)=>C>0?W+C/u*(L-W):.05,G=(C,W=1.6,L=3.9)=>`${(C>0?Math.max(W,L-C/u*(L-W)):L).toFixed(2)}s`,ie=(C,W=3.4,L=5.8)=>C>0?W+C/u*(L-W):3,te=C=>C>0?Math.max(18,Math.round(C/u*100)):0,le=C=>`
    <defs>
      <filter id="${C}-glow-red" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${C}-glow-green" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${C}-glow-blue" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${C}-glow-cyan" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${C}-glow-gas" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <linearGradient id="${C}-flow-solar" x1="50%" y1="6%" x2="50%" y2="88%">
        <stop offset="0%" stop-color="var(--clr-production)" stop-opacity="0.28" />
        <stop offset="100%" stop-color="var(--clr-production)" stop-opacity="1" />
      </linearGradient>
      <linearGradient id="${C}-flow-grid-in" x1="8%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stop-color="var(--clr-consumption)" stop-opacity="0.35" />
        <stop offset="100%" stop-color="var(--clr-consumption)" stop-opacity="0.95" />
      </linearGradient>
      <linearGradient id="${C}-flow-grid-out" x1="100%" y1="44%" x2="4%" y2="76%">
        <stop offset="0%" stop-color="var(--clr-export)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--clr-export)" stop-opacity="0.4" />
      </linearGradient>
      <linearGradient id="${C}-flow-shared-out" x1="0%" y1="48%" x2="100%" y2="48%">
        <stop offset="0%" stop-color="var(--clr-export)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--clr-export)" stop-opacity="0.45" />
      </linearGradient>
      <linearGradient id="${C}-flow-shared-in" x1="100%" y1="48%" x2="0%" y2="48%">
        <stop offset="0%" stop-color="var(--clr-primary)" stop-opacity="0.4" />
        <stop offset="100%" stop-color="var(--clr-primary)" stop-opacity="1" />
      </linearGradient>
      <linearGradient id="${C}-flow-gas" x1="50%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stop-color="var(--clr-gas)" stop-opacity="0.3" />
        <stop offset="100%" stop-color="var(--clr-gas)" stop-opacity="0.95" />
      </linearGradient>

      <linearGradient id="${C}-scene-shell" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.05)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
      </linearGradient>
      <radialGradient id="${C}-house-base-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--clr-surface-alt)" stop-opacity="0.8" />
        <stop offset="100%" stop-color="var(--clr-surface-alt)" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="${C}-house-core-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(88, 166, 255, 0.18)" />
        <stop offset="100%" stop-color="rgba(88, 166, 255, 0)" />
      </radialGradient>
    </defs>
  `,z=C=>{const{x:W,y:L,width:O,accent:Y,kicker:ke,value:ae,detail:re}=C;return`
      <g class="scene-node-label" transform="translate(${W}, ${L})">
        <rect width="${O}" height="${re?70:54}" rx="18" fill="var(--clr-overlay)" stroke="${Y}" />
        <text x="16" y="22" class="scene-node-kicker">${ke}</text>
        <text x="16" y="${re?39:37}" class="scene-node-value">${ae}</text>
        ${re?`<text x="16" y="56" class="scene-node-detail">${re}</text>`:""}
      </g>
    `},se=C=>{const{x:W,y:L,scale:O=1,glowId:Y}=C;return`
      <g class="scene-tier-icon scene-tier-grid" transform="translate(${W}, ${L}) scale(${O})">
        <circle cx="0" cy="44" r="48" fill="var(--clr-consumption)" fill-opacity="0.06" />
        <path d="M0 0 V88 M-24 20 H24 M-16 42 H16 M-8 66 H8" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" filter="url(#${Y})" />
        <path d="M-12 88 L0 60 L12 88" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" fill="none" />
      </g>
    `},de=C=>{const{x:W,y:L,scale:O=1,glowId:Y}=C;return`
      <g class="scene-tier-icon scene-tier-solar" transform="translate(${W}, ${L}) scale(${O})">
        <circle cx="0" cy="0" r="26" fill="var(--clr-production)" fill-opacity="0.09" />
        <circle cx="0" cy="0" r="12" fill="var(--clr-production)" fill-opacity="0.9" filter="url(#${Y})" />
        <path d="M0 -26 V-40 M0 26 V40 M26 0 H40 M-26 0 H-40 M18 -18 L28 -28 M18 18 L28 28 M-18 18 L-28 28 M-18 -18 L-28 -28" stroke="var(--clr-production)" stroke-width="2.5" stroke-linecap="round" />
      </g>
    `},ge=C=>{const{x:W,y:L,scale:O=1,glowId:Y}=C;return`
      <g class="scene-tier-icon scene-tier-community" transform="translate(${W}, ${L}) scale(${O})">
        <circle cx="0" cy="40" r="50" fill="var(--clr-primary)" fill-opacity="0.06" />
        <rect x="-26" y="30" width="22" height="42" rx="6" fill="rgba(88, 166, 255, 0.08)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="6" y="16" width="24" height="56" rx="6" fill="rgba(88, 166, 255, 0.12)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="-2" y="4" width="6" height="10" rx="2" fill="var(--clr-primary)" fill-opacity="0.7" />
        <path d="M-14 12 H14 M-10 4 V20 M10 4 V20" stroke="var(--clr-primary)" stroke-width="2" stroke-linecap="round" filter="url(#${Y})" />
      </g>
    `},U=C=>{const{x:W,y:L,scale:O=1,glowId:Y}=C;return`
      <g class="scene-tier-icon scene-tier-gas" transform="translate(${W}, ${L}) scale(${O})">
        <circle cx="0" cy="38" r="46" fill="var(--clr-gas)" fill-opacity="0.08" />
        <path d="M-26 40 H-8 V72 H26" stroke="var(--clr-gas)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#${Y})" />
        <path d="M0 4 C18 24 20 40 20 52 C20 70 9 84 0 84 C-9 84 -20 70 -20 52 C-20 38 -10 24 0 4 Z" fill="rgba(210, 153, 34, 0.14)" stroke="var(--clr-gas)" stroke-width="2.2" />
        <path d="M0 24 C9 35 10 44 10 52 C10 61 5 68 0 72 C-5 68 -10 61 -10 52 C-10 44 -8 35 0 24 Z" fill="var(--clr-gas)" fill-opacity="0.85" />
      </g>
    `},N=C=>{const{prefix:W,x:L,y:O,scale:Y=1}=C;return`
      <g class="elite-house" transform="translate(${L}, ${O}) scale(${Y})">
        <circle cx="90" cy="122" r="112" fill="url(#${W}-house-core-glow)" />
        <circle cx="90" cy="122" r="96" fill="url(#${W}-house-base-glow)" opacity="0.28" />
        <circle cx="90" cy="122" r="88" stroke="rgba(88,166,255,0.12)" stroke-width="2" stroke-dasharray="6 10" />
        <g class="house-hub-badge" transform="translate(38, 6)">
          <rect width="104" height="28" rx="14" fill="var(--clr-overlay)" stroke="var(--clr-overlay-border)" />
          <text x="52" y="18" text-anchor="middle" class="house-core-kicker">House</text>
        </g>
        <path d="M8 96 L90 28 L172 96 V228 H8 Z" fill="var(--clr-surface)" stroke="var(--clr-border)" stroke-width="3" />
        <path d="M26 92 L90 44 L154 92" stroke="var(--clr-production)" stroke-width="4" stroke-linecap="round" stroke-opacity="0.7" />
        <path d="M90 28 V228" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.22" />
        <rect x="30" y="120" width="32" height="42" rx="6" fill="rgba(88,166,255,0.06)" stroke="var(--clr-border)" stroke-width="1.5" />
        <rect x="118" y="120" width="32" height="42" rx="6" fill="rgba(88,166,255,0.06)" stroke="var(--clr-border)" stroke-width="1.5" />
        <rect x="68" y="170" width="44" height="58" rx="6" fill="var(--clr-surface-alt)" stroke="var(--clr-border)" stroke-width="2" />
        <g transform="translate(122, 54) rotate(32)">
          <rect x="0" y="0" width="56" height="14" rx="3" fill="rgba(63, 185, 80, 0.12)" stroke="var(--clr-production)" stroke-width="1.6" filter="url(#${W}-glow-green)" />
          <rect x="0" y="20" width="56" height="14" rx="3" fill="rgba(63, 185, 80, 0.12)" stroke="var(--clr-production)" stroke-width="1.6" filter="url(#${W}-glow-green)" />
          <line x1="13" y1="0" x2="13" y2="14" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
          <line x1="30" y1="0" x2="30" y2="14" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
          <line x1="13" y1="20" x2="13" y2="34" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
          <line x1="30" y1="20" x2="30" y2="34" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
        </g>
        <g transform="translate(90, 124)">
          <circle r="32" fill="var(--clr-overlay)" stroke="var(--clr-overlay-border)" stroke-width="2" />
          <text text-anchor="middle" y="-4" class="house-core-kicker">Solar Cover.</text>
          <text text-anchor="middle" y="18" class="house-core-value">${m(l,0)}%</text>
        </g>
        <text x="90" y="262" text-anchor="middle" class="house-total-label">Home usage</text>
        <text x="90" y="284" text-anchor="middle" class="house-total-value">${m(M)} kWh</text>
      </g>
    `},B=C=>{const{path:W,value:L,gradientId:O,colorVar:Y,filterId:ke,particleClass:ae,direction:re="forward"}=C,ne=re==="reverse"?"1;0":"0;1";return`
      <path
        class="flow-halo ${ae}"
        d="${W}"
        stroke="url(#${O})"
        stroke-width="${V(L).toFixed(1)}"
        stroke-opacity="${R(L).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-rail ${ae}"
        d="${W}"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="${K(L).toFixed(1)}"
        stroke-opacity="0.42"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-stream ${ae}"
        d="${W}"
        stroke="url(#${O})"
        stroke-width="${D(L).toFixed(1)}"
        stroke-opacity="${P(L).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      ${L>0?`
        <circle
          class="flow-particle ${ae}"
          r="${ie(L).toFixed(1)}"
          fill="${Y}"
          filter="url(#${ke})"
        >
          <animateMotion dur="${G(L)}" repeatCount="indefinite" path="${W}" keyPoints="${ne}" keyTimes="0;1" calcMode="linear" />
        </circle>
        <circle
          class="flow-particle flow-particle-secondary ${ae}"
          r="${Math.max(2.4,ie(L)-1.2).toFixed(1)}"
          fill="${Y}"
          fill-opacity="0.75"
          filter="url(#${ke})"
        >
          <animateMotion dur="${G(L)}" begin="-${(parseFloat(G(L))/2).toFixed(2)}s" repeatCount="indefinite" path="${W}" keyPoints="${ne}" keyTimes="0;1" calcMode="linear" />
        </circle>
      `:""}
    `},ve=()=>`
    <div class="elite-scene elite-scene-desktop">
      <svg class="elite-main-svg" viewBox="0 0 860 460" fill="none" preserveAspectRatio="xMidYMid meet">
        ${le("desktop")}
        <rect x="34" y="30" width="792" height="372" rx="34" fill="url(#desktop-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="430" cy="330" rx="278" ry="60" fill="url(#desktop-house-base-glow)" opacity="0.56" />
        <line x1="98" y1="334" x2="762" y2="334" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.45" />

        ${z({x:58,y:108,width:152,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${m(S+h)} kWh`,detail:h>0?`In ${m(S)} / out ${m(h)} kWh`:void 0})}

        ${z({x:356,y:44,width:148,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${m(n)} kWh`,detail:`${m(_)} kWh used at home`})}

        ${z({x:624,y:108,width:184,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${m(v)} kWh`,detail:`Sent ${m(d)} / got ${m($)} kWh`})}

        ${c?z({x:350,y:338,width:160,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${m(i)} kWh`,detail:p>0?`${m(p)} m3 in period`:"Gas meter active"}):""}

        ${se({x:132,y:186,scale:1.02,glowId:"desktop-glow-red"})}
        ${de({x:430,y:126,glowId:"desktop-glow-green"})}
        ${ge({x:716,y:194,glowId:"desktop-glow-cyan"})}
        ${c?U({x:430,y:352,glowId:"desktop-glow-gas"}):""}
        ${N({prefix:"desktop",x:340,y:96,scale:1.02})}

        ${B({path:"M 430 152 C 430 182 430 204 430 220",value:k,gradientId:"desktop-flow-solar",colorVar:"var(--clr-production)",filterId:"desktop-glow-green",particleClass:"flow-solar"})}

        ${B({path:"M 176 230 C 246 230 318 230 364 232",value:S,gradientId:"desktop-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"desktop-glow-red",particleClass:"flow-grid-in"})}

        ${B({path:"M 496 268 C 430 298 326 314 176 316",value:h,gradientId:"desktop-flow-grid-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-grid-out"})}

        ${B({path:"M 500 234 C 566 220 634 220 692 236",value:d,gradientId:"desktop-flow-shared-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-shared-out"})}

        ${B({path:"M 690 272 C 632 292 566 294 500 278",value:$,gradientId:"desktop-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"desktop-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${c?B({path:"M 430 404 C 430 370 430 336 430 302",value:E,gradientId:"desktop-flow-gas",colorVar:"var(--clr-gas)",filterId:"desktop-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,be=()=>`
    <div class="elite-scene elite-scene-mobile">
      <svg class="elite-main-svg" viewBox="0 0 420 560" fill="none" preserveAspectRatio="xMidYMid meet">
        ${le("mobile")}
        <rect x="20" y="20" width="380" height="520" rx="32" fill="url(#mobile-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="210" cy="316" rx="136" ry="38" fill="url(#mobile-house-base-glow)" opacity="0.58" />
        <line x1="64" y1="332" x2="356" y2="332" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.42" />

        ${z({x:132,y:40,width:156,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${m(n)} kWh`})}

        ${z({x:20,y:194,width:126,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${m(S+h)} kWh`})}

        ${z({x:274,y:194,width:126,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${m(v)} kWh`})}

        ${c?z({x:122,y:442,width:176,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${m(i)} kWh`,detail:p>0?`${m(p)} m3`:"Gas meter active"}):""}

        ${de({x:210,y:126,scale:.92,glowId:"mobile-glow-green"})}
        ${se({x:76,y:254,scale:.86,glowId:"mobile-glow-red"})}
        ${ge({x:344,y:260,scale:.86,glowId:"mobile-glow-cyan"})}
        ${c?U({x:210,y:442,scale:.9,glowId:"mobile-glow-gas"}):""}
        ${N({prefix:"mobile",x:118,y:166,scale:.94})}

        ${B({path:"M 210 152 C 210 188 210 216 210 238",value:k,gradientId:"mobile-flow-solar",colorVar:"var(--clr-production)",filterId:"mobile-glow-green",particleClass:"flow-solar"})}

        ${B({path:"M 104 286 C 138 286 168 286 194 286",value:S,gradientId:"mobile-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"mobile-glow-red",particleClass:"flow-grid-in"})}

        ${B({path:"M 226 318 C 194 340 162 348 102 350",value:h,gradientId:"mobile-flow-grid-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-grid-out"})}

        ${B({path:"M 226 286 C 262 274 294 274 318 286",value:d,gradientId:"mobile-flow-shared-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-shared-out"})}

        ${B({path:"M 318 320 C 294 332 262 334 226 322",value:$,gradientId:"mobile-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"mobile-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${c?B({path:"M 210 474 C 210 432 210 390 210 344",value:E,gradientId:"mobile-flow-gas",colorVar:"var(--clr-gas)",filterId:"mobile-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,Ce=e!=null&&e.start&&(e!=null&&e.end)?`${fe(e.start)} — ${fe(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${fe(t.customStart+"T00:00:00")} — ${fe(t.customEnd+"T00:00:00")}`:((Te=Ue.find(C=>C.id===t.range))==null?void 0:Te.label)??"Yesterday",ye=(xe=(Z=t.consumptionTimeseries)==null?void 0:Z.items)!=null&&xe.length?t.consumptionTimeseries.items:((ee=t.productionTimeseries)==null?void 0:ee.items)??[],_e=t.chartViewportStart??((Ie=ye[0])==null?void 0:Ie.startedAt)??(e==null?void 0:e.start),Q=t.chartViewportEnd??((Ee=ye[ye.length-1])==null?void 0:Ee.startedAt)??(e==null?void 0:e.end),Pe=Et(_e,Q),ce=$s(t.chartTimeBucket),Ke=ga(_e,Q),Be=xs(_e,Q,t.chartTimeBucket,1),pt=new Date,mt=!Be||Be.start.getTime()>pt.getTime(),qe=lt.map(C=>{const W=Ge(C.id,Pe),L=C.id===t.chartTimeBucket,O=C.id==="quarter_hour"?"15-minute detail would be too dense for this selected period":`${C.label} detail does not add useful resolution for this selected period`;return`
            <button
              class="unit-btn chart-bucket-btn ${L?"active":""}"
              data-chart-bucket="${C.id}"
              title="${W?`Show ${C.label.toLowerCase()} detail`:O}"
              ${W?"":'disabled aria-disabled="true"'}
            >${C.label}</button>
          `}).join(""),Ye=t.chartUnit==="kw"?"kW uses the same detail presets as kWh, but keeps power values in interval bars so short spikes and dips stay visible.":"kWh keeps the aggregated period bars for totals.",Xe=`${t.chartConsumptionView==="house"?"Total Usage shows the full house load, with the solar-covered share highlighted in green and exports below zero. Use the detail presets and arrows above the graph to move through time.":t.chartConsumptionView==="solar_systems"?"PV Systems stacks each configured solar production meter so you can compare panel-system output like the Home Assistant Energy dashboard.":"Net Grid focuses on what still came from the grid after solar, with exports shown below zero. The reference limit in kW mode applies here."} ${Ye}`,$e=((e==null?void 0:e.exceedance_kwh)??0)>0?me("warning"):me("ok");return`
    <div class="dashboard" style="position: relative;">
      <div style="position:fixed;bottom:4px;right:4px;font-size:10px;opacity:0.5;pointer-events:none;z-index:9999;">v:2.16.1</div>

      <!-- Range Selector -->
      <div class="range-selector">
        ${Ue.map(C=>`
          <button
            class="range-btn ${C.id===t.range?"active":""}"
            data-range="${C.id}"
          >${C.label}</button>
        `).join("")}
      </div>

      ${(()=>{if(!(e!=null&&e.start)||!(e!=null&&e.end))return"";try{const C=new Date(e.start),W=new Date(e.end);return isNaN(C.getTime())||isNaN(W.getTime())?"":`
            <div class="range-info-bar">
              📅 ${C.toLocaleDateString()} — ${W.toLocaleDateString()}
            </div>
          `}catch{return""}})()}

      ${t.range==="custom"?`
      <!-- Custom Date Range Picker -->
      <div class="custom-range-picker">
        <label>
          <span>From</span>
          <input type="date" id="custom-start" value="${t.customStart??""}" />
        </label>
        <label>
          <span>To</span>
          <input type="date" id="custom-end" value="${t.customEnd??""}" />
        </label>
        <button class="btn btn-primary" id="apply-custom-range">Apply</button>
      </div>
      `:f&&b?`
      <!-- Preset Period Preview -->
      <div class="custom-range-picker period-preview">
        <span class="period-preview-label">Viewed period</span>
        <label>
          <span>From</span>
          <input type="date" value="${f}" readonly aria-label="Preset period start" />
        </label>
        <label>
          <span>To</span>
          <input type="date" value="${b}" readonly aria-label="Preset period end" />
        </label>
      </div>
      `:""}

      <!-- Stat Cards -->
      <div class="stats-grid">
        <div class="stat-card consumption">
          <div class="stat-icon">${me("consumption")}</div>
          <div class="stat-body">
            <div class="stat-label">Consumption</div>
            <div class="stat-value">${m(a)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card production">
          <div class="stat-icon">${me("production")}</div>
          <div class="stat-body">
            <div class="stat-label">Production</div>
            <div class="stat-value">${m(n)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.export">
          <div class="stat-icon">${me("export")}</div>
          <div class="stat-body">
            <div class="stat-label">Exported</div>
            <div class="stat-value">${m(o)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.self-consumed">
          <div class="stat-icon">${me("self_consumed")}</div>
          <div class="stat-body">
            <div class="stat-label">Self-Consumed</div>
            <div class="stat-value">${m(x)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>
      </div>

      <!-- Energy Flow + Key Metrics side by side -->
      <div class="flow-metrics-row">
        <div class="card flow-card">
          <h3 class="card-title"><span class="title-icon">${me("flow")}</span> Energy Flow</h3>

          <div class="leneda-elite-flow">
            <div class="elite-header">
              <div class="glass-module consumption-module">
                <div class="module-info">
                  <span class="module-label">Period Consumption <span class="info-icon">ⓘ</span></span>
                  <div class="module-value-row">
                    <span class="module-value highlight-red">${m(a)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg red"></div></div>
              </div>

              <div class="glass-module production-module">
                <div class="module-info">
                  <span class="module-label">Solar Production <span class="info-icon">ⓘ</span></span>
                  <div class="module-value-row">
                    <span class="module-value highlight-green">${m(n)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg green"></div></div>
              </div>
            </div>

            <div class="flow-scene-summary">
              <span class="flow-scene-chip solar">Solar coverage ${m(l,0)}%</span>
              <span class="flow-scene-chip import">Grid import ${m(S)} kWh</span>
              <span class="flow-scene-chip export">Export ${m(h)} kWh</span>
              <span class="flow-scene-chip community">Community ${m(v)} kWh</span>
              ${y>0?`<span class="flow-scene-chip neutral">Peak ${m(y,2)} kW</span>`:""}
            </div>

            <p class="flow-scene-caption">
              Thicker paths show larger energy volumes for the selected period. Green flows stay in the home, red flows come from the grid, blue flows leave the home or community, and amber shows gas.
            </p>

            ${ve()}
            ${be()}

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${m(M)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${m(l,0)}% of home usage solar-covered${y>0?` · Peak ${m(y,2)} kW`:""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${m(_)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${te(_)}%;"></span></div>
                  <p>Energy used inside the house${$>0?", including received community energy":""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${m(S)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${te(S)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${m(h)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${te(h)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${m(v)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${te(v)}%;"></span></div>
                  <p>Sent ${m(d)} kWh · received ${m($)} kWh.</p>
                </div>
                ${c?`
                <div class="mobile-flow-item gas">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Gas to house</span>
                    <strong>${m(i)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${te(E||u)}%;"></span></div>
                  <p>${p>0?`${m(p)} m3 measured for the same period.`:"Gas meter is configured for this home."}</p>
                </div>
                `:""}
              </div>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${m(_)} kWh directly supplied inside the house</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${m(S)} kWh still needed from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${m(h)} kWh sent back to the market or grid</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${m(d)} kWh sent · ${m($)} kWh received${$>0?" (included in solar to home)":""}</span>
                </span>
              </div>
              ${c?`
              <div class="flow-legend-item gas">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Gas to house</strong>
                  <span>${m(i)} kWh${p>0?` / ${m(p)} m3`:""}</span>
                </span>
              </div>
              `:""}
            </div>
          </div>
      </div>

      <!-- Key Metrics (right of flow) -->
      <div class="card metrics-card">
        <h3 class="card-title"><span class="title-icon">${me("metrics")}</span> Key Metrics</h3>
        <div class="metrics-list">
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Solar Coverage</span>
              <span class="metric-value">${m(l,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${l}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Consumed</span>
              <span class="metric-value">${m(x)} kWh</span>
            </div>
          </div>
          ${y>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${m(y,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label"><span class="metric-status-icon">${$e}</span> Exceedance</span>
              <span class="metric-value">${m((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${i>0||p>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${m(i)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${m(p)} m³</span>
            </div>
          </div>
          `:""}
        </div>
      </div>
      </div>

      <!-- Chart -->
      <div class="card chart-card">
        <div class="chart-header">
          <h3 class="card-title"><span class="title-icon">${me("profile")}</span> Energy Profile — ${Ce}</h3>
          <div class="chart-period-status">
            <span class="chart-period-kicker">Showing</span>
            <strong>${Ke}</strong>
            <span>${ce.label} detail</span>
          </div>

          <div class="chart-control-stack">
            <div class="chart-period-controls" aria-label="Move chart period">
              <button
                class="chart-nav-btn"
                data-chart-period-nav="prev"
                title="Previous ${ce.stepLabel}"
                aria-label="Previous ${ce.stepLabel}"
              >&larr;</button>
              <span class="chart-period-pill">${Ke}</span>
              <button
                class="chart-nav-btn"
                data-chart-period-nav="next"
                title="Next ${ce.stepLabel}"
                aria-label="Next ${ce.stepLabel}"
                ${mt?'disabled aria-disabled="true"':""}
              >&rarr;</button>
            </div>

            <div class="chart-bucket-toggle" aria-label="Chart detail presets">
              ${qe}
            </div>

            <div class="chart-unit-toggle">
            <button
              class="unit-btn ${t.chartUnit==="kw"?"active":""}"
              data-chart-unit="kw"
              title="Show power (kW) — see when you exceed the reference limit"
            >kW</button>
            <button
              class="unit-btn ${t.chartUnit==="kwh"?"active":""}"
              data-chart-unit="kwh"
              title="Show energy consumed (kWh)"
            >kWh</button>
            <button
              class="unit-btn ${t.chartConsumptionView==="house"?"active":""}"
              data-chart-view="house"
              title="Show the full house consumption with the solar-covered share overlaid"
            >Total Usage</button>
            <button
              class="unit-btn ${t.chartConsumptionView==="grid"?"active":""}"
              data-chart-view="grid"
              title="Show the net draw from the grid after solar"
            >Net Grid</button>
            <button
              class="unit-btn ${t.chartConsumptionView==="solar_systems"?"active":""}"
              data-chart-view="solar_systems"
              title="Show each configured solar production meter as a stacked PV performance chart"
            >PV Systems</button>
            </div>
          </div>
        </div>
        <div class="chart-container">
          <canvas id="energy-chart"></canvas>
        </div>
        <p class="muted chart-hint" style="text-align:center; margin-top: var(--sp-2); font-size: var(--text-xs);">
          ${Xe}
        </p>
      </div>

      </div>

      </div>
    </section>
  `}function ya(t=""){return{iso:t,consumptionKw:0,productionKw:0,gridImportKw:0,solarExportKw:0}}function st(t,e,s){for(const a of(e==null?void 0:e.items)??[]){const n=new Date(a.startedAt).getTime();if(!Number.isFinite(n))continue;const o=t.get(n)??ya(a.startedAt);o[s]+=Math.max(0,Number(a.value)||0),o.iso||(o.iso=a.startedAt),t.set(n,o)}}function fa(t,e,s={}){var r,i,p,y;const a=new Map,n=!!((i=(r=s.gridImport)==null?void 0:r.items)!=null&&i.length),o=!!((y=(p=s.marketExport)==null?void 0:p.items)!=null&&y.length);return st(a,t,"consumptionKw"),st(a,e,"productionKw"),st(a,s.gridImport,"gridImportKw"),st(a,s.marketExport,"solarExportKw"),[...a.entries()].sort((f,b)=>f[0]-b[0]).map(([f,b])=>{const $=Math.max(0,b.consumptionKw),d=Math.max(0,b.productionKw),h=Math.max(0,Math.min($,d)),g=n?Math.max(0,b.gridImportKw):Math.max(0,$-h),_=Math.max(0,$-g),k=o?Math.max(0,b.solarExportKw):Math.max(0,d-h);return{timestamp:f,iso:b.iso||new Date(f).toISOString(),consumptionKw:$,productionKw:d,solarToHomeKw:_,gridImportKw:g,solarExportKw:k}})}function Oe(t,e){return Number.isFinite(t)?Number(t):e}function kt(t,e,s){return Math.min(s,Math.max(e,t))}function wa(t,e,s){const a=t.reduce((d,h)=>d+h.producedKwh,0),n=t.reduce((d,h)=>d+h.selfConsumedKwh,0),o=t.reduce((d,h)=>d+h.exportedKwh,0),r=Oe(e,n),i=Oe(s,o),p=Math.max(0,r)+Math.max(0,i),y=Math.max(0,a-Math.max(0,i));if(a<=0)return{selfConsumedKwh:0,exportedKwh:0};if(p<=a+1e-6)return{selfConsumedKwh:kt(Math.max(Math.max(0,r),y),0,a),exportedKwh:kt(Math.max(0,i),0,a)};const f=p>0?Math.max(0,r)/p:0,b=Math.min(a,Math.max(0,r)),$=kt(a*f,0,b);return{selfConsumedKwh:$,exportedKwh:Math.max(0,a-$)}}function ba(t,e){const s=t?t.slice(-8):"";return s?`Solar ${e} (${s})`:`Solar ${e}`}function it(t,e,s){return(typeof s=="string"?s.trim():"")||ba(t,e)}function Ft(t){const e=(t.meters??[]).filter(n=>n.types.includes("production")||n.types.includes("solar_consumption")),s=t.feed_in_rates??[],a=t.currency??"EUR";return e.map((n,o)=>{const r=s.find(b=>b.meter_id===n.id),i=(r==null?void 0:r.mode)==="sensor"&&r.sensor_value!=null&&Number.isFinite(r.sensor_value),p=i?(r==null?void 0:r.sensor_value)??0:Oe(r==null?void 0:r.tariff,Oe(t.feed_in_tariff,0)),y=Math.max(1,Math.round(Oe(r==null?void 0:r.self_use_priority,o+1))),f=it(n.id,o+1,r==null?void 0:r.display_name);return{meterId:n.id,shortId:n.id?"…"+n.id.slice(-8):`Meter ${o+1}`,displayName:f,rate:p,label:i?`Sensor (${p.toFixed(4)} ${a}/kWh)`:"Fixed tariff",mode:(r==null?void 0:r.mode)??"fixed",selfUsePriority:y}}).sort((n,o)=>n.selfUsePriority!==o.selfUsePriority?n.selfUsePriority-o.selfUsePriority:n.meterId.localeCompare(o.meterId))}function Pt(t,e,s,a,n){var v;if(!e||!(s!=null&&s.length))return null;const o=Ft(t);if(!o.length)return null;const r=new Map(s.map(l=>[l.meter_id,l]));if(!o.some(l=>r.has(l.meterId)))return null;const i=o.map(l=>({...l,producedKwh:0,selfConsumedKwh:0,exportedKwh:0,revenue:0,exportEquivalentForSelfUse:0})),p=new Map(i.map((l,u)=>[l.meterId,u])),y=new Map,f=new Set;for(const l of e.items)l.startedAt&&f.add(l.startedAt);const b=new Map;for(const l of e.items){const u=Math.max(0,Number(l.value)||0);b.set(l.startedAt,(b.get(l.startedAt)??0)+u)}for(const l of s){const u=new Map;for(const E of l.items??[]){const D=Math.max(0,Number(E.value)||0);u.set(E.startedAt,(u.get(E.startedAt)??0)+D),E.startedAt&&f.add(E.startedAt)}y.set(l.meter_id,u)}for(const l of[...f].sort()){let u=Math.max(0,b.get(l)??0);for(const E of i){const D=p.get(E.meterId);if(D==null)continue;const K=Math.max(0,((v=y.get(E.meterId))==null?void 0:v.get(l))??0),V=K*.25,P=Math.min(u,K),R=P*.25,G=Math.max(0,K-P)*.25;i[D].producedKwh+=V,i[D].selfConsumedKwh+=R,i[D].exportedKwh+=G,u=Math.max(0,u-P)}}const $=i.reduce((l,u)=>l+u.selfConsumedKwh,0),d=i.reduce((l,u)=>l+u.exportedKwh,0),h=wa(i,a,n),g=h.selfConsumedKwh,_=h.exportedKwh,k=$>0?g/$:1,x=d>0?_/d:1;for(const l of i)l.selfConsumedKwh*=k,l.exportedKwh*=x,l.revenue=l.exportedKwh*l.rate,l.exportEquivalentForSelfUse=l.selfConsumedKwh*l.rate;const S=i.reduce((l,u)=>l+u.revenue,0),M=i.reduce((l,u)=>l+u.exportEquivalentForSelfUse,0),c=_>0?S/_:0;return{meters:i,totalFeedInRevenue:S,totalSelfUseExportEquivalent:M,weightedExportRate:c,usedPriorityAllocation:!0}}const rs=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],Ve={house:"Total Usage",grid:"Net Grid",solar:"Solar Production",exceedance_kwh:"Exceedance kWh",exceedance_frequency:"Exceedance Rate"},at={house:"Total Usage",grid:"Net Grid",solar:"Solar Production"},Le={previous:"Previous Period",last_year:"Last Year"};function ns(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function _a(t){const e=new Date(t),s=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${s}-${a}-${n}`}function $a(t){const[e,s,a]=t.split("-").map(Number);return new Date(e,s-1,a,12,0,0,0)}function oe(t,e=0){return t.length?Math.max(...t):e}function Kt(t,e=0){return t.length?Math.min(...t):e}function we(t,e,s){return Math.min(s,Math.max(e,t))}function q(t,e){if(!t.length)return 0;const s=[...t].sort((p,y)=>p-y),a=we(e,0,1),n=(s.length-1)*a,o=Math.floor(n),r=Math.ceil(n);if(o===r)return s[o];const i=n-o;return s[o]*(1-i)+s[r]*i}function xa(t){const e=Math.floor(t/4),s=t%4*15;return`${String(e).padStart(2,"0")}:${String(s).padStart(2,"0")}`}function j(t,e){return`${m(t,2)} ${e}`}function dt(t,e){return`${t>0?"+":t<0?"-":""}${m(Math.abs(t),2)} ${e}`}function rt(t,e=1){return Math.abs(t)<.005?"0":`${t>0?"+":""}${m(t,e)}`}function os(t){const[e,s]=t.split(":").map(a=>parseInt(a,10)||0);return e*60+s}function ka(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function ks(t,e,s,a){if(!ka(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),o=os(s),r=os(a);return o===r?!0:o<r?n>=o&&n<r:n>=o||n<r}function Sa(t,e){return e.find(s=>ks(t,s.day_group,s.start_time,s.end_time))}function Ma(t,e){return e.find(s=>ks(t,s.day_group,s.start_time,s.end_time))}function Ss(t,e,s,a,n){const o=Pt(t,e,s,a,n);if(o&&o.weightedExportRate>0)return o.weightedExportRate;const r=Ft(t).map(i=>i.rate).filter(i=>Number.isFinite(i)&&i>=0);return r.length?r.reduce((i,p)=>i+p,0)/r.length:t.feed_in_tariff??0}function Ca(t,e,s,a,n,o){const r=n.consumption_rate_windows??[],i=n.reference_power_windows??[],p=n.reference_power_kw??0,y=(n.exceedance_rate??0)*(1+(n.vat_rate??0));return fa(t,e,{gridImport:s,marketExport:a}).map(f=>{var u,E;const b=f.timestamp,$=new Date(b),d=f.consumptionKw,h=f.productionKw,g=f.solarToHomeKw,_=f.gridImportKw,k=f.solarExportKw,x=((u=Ma($,i))==null?void 0:u.reference_power_kw)??p,S=Math.max(0,d-x),M=Math.max(0,_-x),c=Math.max(0,S-M),l=((((E=Sa($,r))==null?void 0:E.rate)??n.energy_variable_rate??0)+(n.network_variable_rate??0)+(n.electricity_tax_rate??0)+(n.compensation_fund_rate??0))*(1+(n.vat_rate??0));return{timestamp:b,iso:f.iso,date:$,houseKw:d,solarKw:h,solarToHomeKw:g,gridKw:_,exportKw:k,referenceKw:x,overKw:M,avoidedOverKw:c,importRateWithVat:l,feedInRate:o,exceedanceRateWithVat:y}})}function Ms(t,e,s,a,n,o){const r=Ca(t,e,s,a,n,o),i=new Map,p=Array.from({length:24},()=>0),y=Array.from({length:24},(c,v)=>({label:`${String(v).padStart(2,"0")}:00`,importCost:0,exportSpreadValue:0,gridKwh:0,exportKwh:0})),f={house:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),grid:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),solar:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_kwh:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_frequency:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0})))},b=()=>Array.from({length:96},()=>[]),$={house:{weekday:b(),weekend:b()},grid:{weekday:b(),weekend:b()},solar:{weekday:b(),weekend:b()}},d={houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0};for(const c of r){const l=_a(c.timestamp),u=i.get(l)??(()=>{const be=$a(l);return{key:l,label:be.toLocaleDateString(void 0,{month:"short",day:"numeric"}),fullDate:be.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0}})(),E=c.houseKw*.25,D=c.solarKw*.25,K=c.solarToHomeKw*.25,V=c.gridKw*.25,P=c.exportKw*.25,R=c.overKw*.25,G=c.avoidedOverKw*.25,ie=V*c.importRateWithVat,te=K*c.importRateWithVat,le=P*c.feedInRate,z=K*(c.importRateWithVat-c.feedInRate),se=R*c.exceedanceRateWithVat,de=G*c.exceedanceRateWithVat,ge=te+le+de-ie-se;u.houseKwh+=E,u.solarKwh+=D,u.solarToHomeKwh+=K,u.gridKwh+=V,u.exportKwh+=P,u.exceedanceKwh+=R,u.avoidedExceedanceKwh+=G,u.importCost+=ie,u.solarSavings+=te,u.exportRevenue+=le,u.selfConsumptionAdvantage+=z,u.exceedanceCost+=se,u.avoidedExceedanceValue+=de,u.netValue+=ge,u.peakGridKw=Math.max(u.peakGridKw,c.gridKw),u.peakHouseKw=Math.max(u.peakHouseKw,c.houseKw),u.exceedanceIntervals+=c.overKw>0?1:0,i.set(l,u),d.houseKwh+=E,d.solarKwh+=D,d.solarToHomeKwh+=K,d.gridKwh+=V,d.exportKwh+=P,d.exceedanceKwh+=R,d.avoidedExceedanceKwh+=G,d.importCost+=ie,d.solarSavings+=te,d.exportRevenue+=le,d.selfConsumptionAdvantage+=z,d.exceedanceCost+=se,d.avoidedExceedanceValue+=de,d.netValue+=ge,d.peakGridKw=Math.max(d.peakGridKw,c.gridKw),d.peakHouseKw=Math.max(d.peakHouseKw,c.houseKw),d.exceedanceIntervals+=c.overKw>0?1:0;const U=(c.date.getDay()+6)%7,N=c.date.getHours(),B=N*4+Math.floor(c.date.getMinutes()/15),ve=c.date.getDay()===0||c.date.getDay()===6?"weekend":"weekday";f.house[U][N].sum+=c.houseKw,f.house[U][N].count+=1,f.grid[U][N].sum+=c.gridKw,f.grid[U][N].count+=1,f.solar[U][N].sum+=c.solarKw,f.solar[U][N].count+=1,f.exceedance_kwh[U][N].sum+=R,f.exceedance_kwh[U][N].count+=1,f.exceedance_frequency[U][N].sum+=c.overKw>0?1:0,f.exceedance_frequency[U][N].count+=1,p[N]+=R,$.house[ve][B].push(c.houseKw),$.grid[ve][B].push(c.gridKw),$.solar[ve][B].push(c.solarKw),y[N].importCost+=ie,y[N].exportSpreadValue+=P*Math.max(c.importRateWithVat-c.feedInRate,0),y[N].gridKwh+=V,y[N].exportKwh+=P}const h=[...i.values()].sort((c,v)=>c.key.localeCompare(v.key)).map(c=>(c.coveragePct=c.houseKwh>0?c.solarToHomeKwh/c.houseKwh*100:0,c.selfConsumedPct=c.solarKwh>0?we(c.solarToHomeKwh/c.solarKwh*100,0,100):0,c.solarValue=c.solarSavings+c.exportRevenue+c.avoidedExceedanceValue,c));d.coveragePct=d.houseKwh>0?d.solarToHomeKwh/d.houseKwh*100:0,d.selfConsumedPct=d.solarKwh>0?we(d.solarToHomeKwh/d.solarKwh*100,0,100):0,d.solarValue=d.solarSavings+d.exportRevenue+d.avoidedExceedanceValue;const g={house:f.house.map(c=>c.map(v=>v.count?v.sum/v.count:0)),grid:f.grid.map(c=>c.map(v=>v.count?v.sum/v.count:0)),solar:f.solar.map(c=>c.map(v=>v.count?v.sum/v.count:0)),exceedance_kwh:f.exceedance_kwh.map(c=>c.map(v=>v.sum)),exceedance_frequency:f.exceedance_frequency.map(c=>c.map(v=>v.count?v.sum/v.count*100:0))},_=Array.from({length:96},(c,v)=>xa(v)),k={house:{weekday:{lower:$.house.weekday.map(c=>q(c,.1)),median:$.house.weekday.map(c=>q(c,.5)),upper:$.house.weekday.map(c=>q(c,.9))},weekend:{lower:$.house.weekend.map(c=>q(c,.1)),median:$.house.weekend.map(c=>q(c,.5)),upper:$.house.weekend.map(c=>q(c,.9))}},grid:{weekday:{lower:$.grid.weekday.map(c=>q(c,.1)),median:$.grid.weekday.map(c=>q(c,.5)),upper:$.grid.weekday.map(c=>q(c,.9))},weekend:{lower:$.grid.weekend.map(c=>q(c,.1)),median:$.grid.weekend.map(c=>q(c,.5)),upper:$.grid.weekend.map(c=>q(c,.9))}},solar:{weekday:{lower:$.solar.weekday.map(c=>q(c,.1)),median:$.solar.weekday.map(c=>q(c,.5)),upper:$.solar.weekday.map(c=>q(c,.9))},weekend:{lower:$.solar.weekend.map(c=>q(c,.1)),median:$.solar.weekend.map(c=>q(c,.5)),upper:$.solar.weekend.map(c=>q(c,.9))}}},x=r.filter(c=>c.overKw>0).sort((c,v)=>v.overKw-c.overKw||v.timestamp-c.timestamp).slice(0,8),S=[...r].sort((c,v)=>v.houseKw-c.houseKw||v.timestamp-c.timestamp).slice(0,8),M=[...h].filter(c=>c.exceedanceKwh>0).sort((c,v)=>v.exceedanceKwh-c.exceedanceKwh).slice(0,6);return{points:r,daily:h,totals:d,topExceedances:x,peakIntervals:S,hourlyExceedanceKwh:p,heatmapValues:g,intradayProfiles:k,intradayLabels:_,hourlyOpportunity:y,loadDurationGrossKw:r.map(c=>c.houseKw).sort((c,v)=>v-c),loadDurationNetKw:r.map(c=>c.gridKw).sort((c,v)=>v-c),worstDays:M}}function Ta(t){var e,s,a;return(e=t.rangeData)!=null&&e.start&&((s=t.rangeData)!=null&&s.end)?`${fe(t.rangeData.start)} - ${fe(t.rangeData.end)}`:((a=Ue.find(n=>n.id===t.range))==null?void 0:a.label)??"Selected Period"}function Ea(t){var e,s;return(e=t.rangeData)!=null&&e.start&&((s=t.rangeData)!=null&&s.end)?`${We(t.rangeData.start)} - ${We(t.rangeData.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${t.customStart} - ${t.customEnd}`:"Based on the currently selected range."}function is(t){const e=t.analysisComparisonMode==="last_year"?"Same period last year":"Previous matched period";return t.analysisComparison?`${e}: ${We(t.analysisComparison.start)} - ${We(t.analysisComparison.end)}`:e}function Da(t){switch(t){case"house":return{description:"Average hourly power by weekday for total house usage.",note:"Each cell shows the average kW seen in that weekday/hour slot over the selected period."};case"grid":return{description:"Average hourly power by weekday for remaining grid draw after solar.",note:"Each cell shows the average net-grid kW seen in that weekday/hour slot over the selected period."};case"solar":return{description:"Average hourly power by weekday for solar production.",note:"Each cell shows the average solar kW seen in that weekday/hour slot over the selected period."};case"exceedance_kwh":return{description:"Cumulative exceedance energy by weekday and hour, showing where the reference limit hurt the most.",note:"Each cell shows cumulative exceedance kWh recorded in that weekday/hour slot over the selected period."};case"exceedance_frequency":return{description:"How often each weekday/hour slot went over the reference limit.",note:"Each cell shows the share of 15-minute intervals in that weekday/hour slot that exceeded the reference limit."}}}function La(t,e){switch(t){case"house":case"grid":case"solar":return`${m(e,2)} kW average`;case"exceedance_kwh":return`${m(e,2)} kWh`;case"exceedance_frequency":return`${m(e,0)}% of intervals`}}function he(t){const e=t.series.filter(l=>l.values.length>0);if(!e.length)return'<div class="analysis-empty">No chart data available for this period.</div>';const s=Math.max(...e.map(l=>l.values.length)),a=Math.max(720,s*24+92),n=244,o=50,r=20,i=18,p=30,y=e.flatMap(l=>l.values);t.referenceValue!=null&&y.push(t.referenceValue);let f=t.minValue??Kt(y,0),b=t.maxValue??oe(y,1);f===b&&(b+=1,f=Math.min(0,f-1)),t.minValue==null&&(f=Math.min(0,f));const $=a-o-r,d=n-i-p,h=(l,u)=>u<=1?o+$/2:o+l*$/(u-1),g=l=>i+(b-l)/(b-f)*d,_=t.valueFormatter??(l=>m(l,1)),k=Array.from({length:4},(l,u)=>f+(b-f)/3*u),x=[0,Math.floor((s-1)/2),s-1].filter((l,u,E)=>E.indexOf(l)===u),S=k.map(l=>{const u=g(l);return`
      <line x1="${o}" y1="${u.toFixed(1)}" x2="${(a-r).toFixed(1)}" y2="${u.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(u+4).toFixed(1)}" class="analysis-svg-tick">${_(l)}</text>
    `}).join(""),M=t.referenceValue!=null?(()=>{const l=g(t.referenceValue);return`
        <line x1="${o}" y1="${l.toFixed(1)}" x2="${(a-r).toFixed(1)}" y2="${l.toFixed(1)}" class="analysis-svg-reference" />
        ${t.referenceLabel?`<text x="${a-r}" y="${(l-8).toFixed(1)}" class="analysis-svg-reference-label">${t.referenceLabel}</text>`:""}
      `})():"",c=e.map(l=>{const u=l.values.map((D,K)=>{const V=h(K,l.values.length),P=g(D);return`${K===0?"M":"L"} ${V.toFixed(1)} ${P.toFixed(1)}`}).join(" "),E=l.values.length<=40?l.values.map((D,K)=>{const V=h(K,l.values.length),P=g(D);return`<circle cx="${V.toFixed(1)}" cy="${P.toFixed(1)}" r="2.6" fill="${l.color}" />`}).join(""):"";return`
      <path d="${u}" fill="none" stroke="${l.color}" stroke-width="2.5" ${l.dashed?'stroke-dasharray="6 4"':""} />
      ${E}
    `}).join(""),v=x.map(l=>{const u=h(l,s),E=t.labels[l]??`Point ${l+1}`;return`<text x="${u.toFixed(1)}" y="${n-8}" text-anchor="middle" class="analysis-svg-x-label">${E}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${a}" height="${n}" viewBox="0 0 ${a} ${n}" role="img" aria-label="${t.title??"Line chart"}">
        ${S}
        ${M}
        ${c}
        ${v}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      ${e.map(l=>`
        <span class="analysis-legend-item">
          <span class="analysis-legend-swatch" style="background:${l.color};"></span>
          <span>${l.label}</span>
        </span>
      `).join("")}
      ${t.referenceLabel?`
          <span class="analysis-legend-item">
            <span class="analysis-legend-swatch analysis-legend-swatch-dashed"></span>
            <span>${t.referenceLabel}</span>
          </span>
        `:""}
    </div>
  `}function Wa(t){const e=t.series.filter(v=>v.band.median.length>0);if(!e.length)return'<div class="analysis-empty">No profile data available for this period.</div>';const s=Math.max(...e.map(v=>v.band.median.length)),a=Math.max(760,s*12+92),n=248,o=50,r=20,i=18,p=30,y=e.flatMap(v=>[...v.band.lower,...v.band.median,...v.band.upper]),f=Math.min(0,Kt(y,0));let b=oe(y,1);b<=f&&(b=f+1);const $=a-o-r,d=n-i-p,h=(v,l)=>l<=1?o+$/2:o+v*$/(l-1),g=v=>i+(b-v)/(b-f)*d,_=t.valueFormatter??(v=>m(v,1)),k=Array.from({length:4},(v,l)=>f+(b-f)/3*l),x=[0,16,32,48,64,80,s-1].filter((v,l,u)=>v>=0&&v<s&&u.indexOf(v)===l),S=k.map(v=>{const l=g(v);return`
      <line x1="${o}" y1="${l.toFixed(1)}" x2="${(a-r).toFixed(1)}" y2="${l.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(l+4).toFixed(1)}" class="analysis-svg-tick">${_(v)}</text>
    `}).join(""),M=e.map(v=>{const l=v.band.upper.map((D,K)=>{const V=h(K,v.band.upper.length),P=g(D);return`${K===0?"M":"L"} ${V.toFixed(1)} ${P.toFixed(1)}`}).join(" "),u=[...v.band.lower].reverse().map((D,K)=>{const V=v.band.lower.length-1-K,P=h(V,v.band.lower.length),R=g(D);return`L ${P.toFixed(1)} ${R.toFixed(1)}`}).join(" "),E=v.band.median.map((D,K)=>{const V=h(K,v.band.median.length),P=g(D);return`${K===0?"M":"L"} ${V.toFixed(1)} ${P.toFixed(1)}`}).join(" ");return`
      <path d="${l} ${u} Z" fill="${v.fill}" stroke="none" />
      <path d="${E}" fill="none" stroke="${v.color}" stroke-width="2.4" ${v.dashed?'stroke-dasharray="6 4"':""} />
    `}).join(""),c=x.map(v=>{const l=h(v,s),u=t.labels[v]??`Point ${v+1}`;return`<text x="${l.toFixed(1)}" y="${n-8}" text-anchor="middle" class="analysis-svg-x-label">${u}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${a}" height="${n}" viewBox="0 0 ${a} ${n}" role="img" aria-label="${t.title??"Band chart"}">
        ${S}
        ${M}
        ${c}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      ${e.map(v=>`
        <span class="analysis-legend-item">
          <span class="analysis-legend-swatch" style="background:${v.color};"></span>
          <span>${v.label}</span>
        </span>
      `).join("")}
    </div>
  `}function Fa(t){const e=new Date(t.timestamp);return{date:e.toLocaleDateString(void 0,{month:"short",day:"numeric"}),time:e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}}function Pa(t){if(!t.length)return'<div class="analysis-empty">No peak intervals available for this period.</div>';const e=Math.max(760,t.length*86+96),s=276,a=52,n=16,o=18,r=54,i=oe(t.map(g=>g.houseKw),1),p=e-a-n,y=s-o-r,f=o+y,b=p/t.length,$=Math.max(22,Math.min(38,b*.54)),d=t.map((g,_)=>{const k=a+_*b+(b-$)/2,x=g.solarToHomeKw/i*y,M=Math.max(0,Math.min(g.gridKw,g.referenceKw))/i*y,c=Math.max(0,g.gridKw-g.referenceKw)/i*y;return`
      <g>
        <rect x="${k.toFixed(1)}" y="${(f-x).toFixed(1)}" width="${$.toFixed(1)}" height="${x.toFixed(1)}" rx="4" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${k.toFixed(1)}" y="${(f-x-M).toFixed(1)}" width="${$.toFixed(1)}" height="${M.toFixed(1)}" rx="4" fill="rgba(248, 81, 73, 0.62)" />
        ${c>0?`<rect x="${k.toFixed(1)}" y="${(f-x-M-c).toFixed(1)}" width="${$.toFixed(1)}" height="${c.toFixed(1)}" rx="4" fill="rgba(210, 153, 34, 0.92)" />`:""}
      </g>
    `}).join(""),h=t.map((g,_)=>{const k=a+_*b+b/2,{date:x,time:S}=Fa(g);return`
      <text x="${k.toFixed(1)}" y="${s-20}" text-anchor="middle" class="analysis-svg-x-label">
        <tspan x="${k.toFixed(1)}" dy="0">${x}</tspan>
        <tspan x="${k.toFixed(1)}" dy="12">${S}</tspan>
      </text>
    `}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${s}" viewBox="0 0 ${e} ${s}" role="img" aria-label="Peak interval anatomy">
        <line x1="${a}" y1="${f.toFixed(1)}" x2="${(e-n).toFixed(1)}" y2="${f.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${a-8}" y="${(o+4).toFixed(1)}" class="analysis-svg-tick">${m(i,1)} kW</text>
        ${d}
        ${h}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.62);"></span><span>Grid within reference</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(210, 153, 34, 0.92);"></span><span>Grid over reference</span></span>
    </div>
  `}function Ka(t){if(!t.length)return'<div class="analysis-empty">No daily energy data available.</div>';const e=Math.max(760,t.length*28+84),s=250,a=52,n=16,o=18,r=34,i=oe(t.map(S=>S.houseKwh),1),p=oe(t.map(S=>S.exportKwh),0),y=e-a-n,f=s-o-r,b=p>0?f*.72:f,$=p>0?f-b:0,d=o+b,h=y/t.length,g=Math.max(8,Math.min(18,h*.62)),_=Math.max(1,Math.ceil(t.length/10)),k=t.map((S,M)=>{const c=a+M*h+(h-g)/2,v=S.solarToHomeKwh/i*b,l=S.gridKwh/i*b,u=p>0?S.exportKwh/p*$:0,E=d-v-l-8;return`
      <g>
        <rect x="${c.toFixed(1)}" y="${(d-v).toFixed(1)}" width="${g.toFixed(1)}" height="${v.toFixed(1)}" rx="3" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${c.toFixed(1)}" y="${(d-v-l).toFixed(1)}" width="${g.toFixed(1)}" height="${l.toFixed(1)}" rx="3" fill="rgba(248, 81, 73, 0.55)" />
        ${u>0?`<rect x="${c.toFixed(1)}" y="${d.toFixed(1)}" width="${g.toFixed(1)}" height="${u.toFixed(1)}" rx="3" fill="rgba(88, 166, 255, 0.75)" />`:""}
        ${S.exceedanceKwh>0?`<circle cx="${(c+g/2).toFixed(1)}" cy="${E.toFixed(1)}" r="3.2" fill="#d29922" />`:""}
      </g>
    `}).join(""),x=t.map((S,M)=>M%_!==0&&M!==t.length-1?"":`<text x="${(a+M*h+h/2).toFixed(1)}" y="${s-10}" text-anchor="middle" class="analysis-svg-x-label">${S.label}</text>`).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${s}" viewBox="0 0 ${e} ${s}" role="img" aria-label="Daily energy breakdown">
        <line x1="${a}" y1="${d.toFixed(1)}" x2="${(e-n).toFixed(1)}" y2="${d.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${a-8}" y="${(o+4).toFixed(1)}" class="analysis-svg-tick">${m(i,0)} kWh</text>
        ${p>0?`<text x="${a-8}" y="${(s-r+4).toFixed(1)}" class="analysis-svg-tick">-${m(p,0)} kWh</text>`:""}
        ${k}
        ${x}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.55);"></span><span>From grid</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span><span>Exported</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:#d29922;"></span><span>Exceedance on that day</span></span>
    </div>
  `}function Ia(t,e){const s=we(e,0,1);return t==="solar"?`rgba(63, 185, 80, ${.12+s*.82})`:t==="exceedance_kwh"||t==="exceedance_frequency"?`rgba(210, 153, 34, ${.14+s*.82})`:t==="grid"?`rgba(210, 153, 34, ${.12+s*.82})`:`rgba(248, 81, 73, ${.12+s*.82})`}function Ra(t,e){const s=t.flat(),a=oe(s,1),n=Kt(s,0);return`
    <div class="analysis-heatmap">
      <div class="analysis-heatmap-hours">
        <span class="analysis-heatmap-corner"></span>
        ${Array.from({length:24},(o,r)=>`
          <span class="analysis-heatmap-hour ${r%2===1?"analysis-heatmap-hour-faded":""}">${String(r).padStart(2,"0")}</span>
        `).join("")}
      </div>
      ${t.map((o,r)=>`
        <div class="analysis-heatmap-row">
          <span class="analysis-heatmap-day">${rs[r]}</span>
          ${o.map((i,p)=>{const y=a===n?0:(i-n)/(a-n);return`
              <span
                class="analysis-heatmap-cell"
                style="background:${Ia(e,y)};"
                title="${rs[r]} ${String(p).padStart(2,"0")}:00 - ${La(e,i)}"
              >${i>(e==="exceedance_frequency"?1:.05)?m(i,e==="exceedance_frequency"?0:1):""}</span>
            `}).join("")}
        </div>
      `).join("")}
    </div>
  `}function ct(t){const e=oe(t.map(s=>s.value),1);return t.length?`
    <div class="analysis-progress-list">
      ${t.map(s=>`
        <div class="analysis-progress-item">
          <div class="analysis-progress-header">
            <span>${s.label}</span>
            <strong>${s.meta}</strong>
          </div>
          <div class="analysis-progress-track">
            <span class="analysis-progress-fill ${s.colorClass??""}" style="width:${s.value/e*100}%;"></span>
          </div>
        </div>
      `).join("")}
    </div>
  `:'<div class="analysis-empty">No standout patterns in this period.</div>'}function Aa(t){var a,n,o,r;const e=ns(((a=t.rangeData)==null?void 0:a.start)??t.customStart),s=ns(((n=t.rangeData)==null?void 0:n.end)??t.customEnd);return`
    <div class="range-selector">
      ${Ue.map(i=>`
        <button
          class="range-btn ${i.id===t.range?"active":""}"
          data-range="${i.id}"
        >${i.label}</button>
      `).join("")}
    </div>
    ${(o=t.rangeData)!=null&&o.start&&((r=t.rangeData)!=null&&r.end)?`
        <div class="range-info-bar">
          Period: ${We(t.rangeData.start)} - ${We(t.rangeData.end)}
        </div>
      `:""}
    ${t.range==="custom"?`
        <div class="custom-range-picker">
          <label>
            <span>From</span>
            <input type="date" id="custom-start" value="${t.customStart??""}" />
          </label>
          <label>
            <span>To</span>
            <input type="date" id="custom-end" value="${t.customEnd??""}" />
          </label>
          <button class="btn btn-primary" id="apply-custom-range">Apply</button>
        </div>
      `:e&&s?`
          <div class="custom-range-picker period-preview">
            <span class="period-preview-label">Viewed period</span>
            <label>
              <span>From</span>
              <input type="date" value="${e}" readonly aria-label="Preset period start" />
            </label>
            <label>
              <span>To</span>
              <input type="date" value="${s}" readonly aria-label="Preset period end" />
            </label>
          </div>
        `:""}
  `}function Va(t,e,s){const a=s.communitySolarToHomeKwh>.01?`${m(s.totalSolarCoverageKwh)} kWh of ${m(s.consumptionKwh)} kWh usage covered, incl. ${m(s.communitySolarToHomeKwh)} kWh shared`:`${m(s.totalSolarCoverageKwh)} kWh of ${m(s.consumptionKwh)} kWh usage covered`;return`
    <div class="analysis-stat-grid">
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Solar Coverage</span>
        <strong class="analysis-stat-value">${m(s.coveragePct,1)}%</strong>
        <span class="analysis-stat-meta">${a}</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Consumed Solar</span>
        <strong class="analysis-stat-value">${m(s.selfConsumedPct,1)}%</strong>
        <span class="analysis-stat-meta">${m(s.directSolarToHomeKwh)} kWh kept from your own solar, ${m(s.exportedKwh)} kWh exported</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Total Solar Value</span>
        <strong class="analysis-stat-value">${j(s.totalSolarValue,e)}</strong>
        <span class="analysis-stat-meta">Savings plus export revenue plus avoided exceedance charges</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Use vs Export</span>
        <strong class="analysis-stat-value">${dt(s.selfConsumptionAdvantage,e)}</strong>
        <span class="analysis-stat-meta">${m(s.directSolarToHomeKwh)} kWh kept on-site instead of exported</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Peak Net Grid</span>
        <strong class="analysis-stat-value">${m(t.totals.peakGridKw,2)} kW</strong>
        <span class="analysis-stat-meta">Compared with ${m(t.totals.peakHouseKw,2)} kW gross house load</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Exceedance Intervals</span>
        <strong class="analysis-stat-value">${m(t.totals.exceedanceIntervals,0)}</strong>
        <span class="analysis-stat-meta">${m(t.totals.exceedanceKwh,2)} kWh above the reference limit</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Variable Import Cost</span>
        <strong class="analysis-stat-value">${j(s.variableImportCost,e)}</strong>
        <span class="analysis-stat-meta">${m(s.billedGridImportKwh)} kWh billed from the grid during the selected period</span>
      </div>
    </div>
  `}function Ha(t){return`
    <div class="card analysis-card analysis-card-full">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Daily Breakdown</h3>
          <p class="analysis-card-copy">House usage is split into solar-covered energy, grid energy, and exported surplus. A gold marker flags days with any reference-power exceedance.</p>
        </div>
      </div>
      ${Ka(t.daily)}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily exceedance volume</h4>
        ${he({title:"Daily exceedance volume",series:[{label:"Exceedance",color:"#d29922",values:t.daily.map(e=>e.exceedanceKwh)}],labels:t.daily.map(e=>e.label),valueFormatter:e=>`${m(e,2)} kWh`})}
      </div>
    </div>
  `}function ja(t,e){const s=Da(t.analysisHeatmapMetric);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Consumption Pattern Heatmap</h3>
          <p class="analysis-card-copy">${s.description}</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${t.analysisHeatmapMetric==="house"?"active":""}" data-analysis-heatmap="house">${Ve.house}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="grid"?"active":""}" data-analysis-heatmap="grid">${Ve.grid}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="solar"?"active":""}" data-analysis-heatmap="solar">${Ve.solar}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="exceedance_kwh"?"active":""}" data-analysis-heatmap="exceedance_kwh">${Ve.exceedance_kwh}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="exceedance_frequency"?"active":""}" data-analysis-heatmap="exceedance_frequency">${Ve.exceedance_frequency}</button>
        </div>
      </div>
      ${Ra(e.heatmapValues[t.analysisHeatmapMetric],t.analysisHeatmapMetric)}
      <p class="analysis-note">${s.note}</p>
    </div>
  `}function Na(t,e){const s=t.analysisProfileMetric,a=e.intradayProfiles[s],n=at[s],o=a.weekday.median.reduce((i,p,y,f)=>p>f[i]?y:i,0),r=a.weekend.median.reduce((i,p,y,f)=>p>f[i]?y:i,0);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Intraday Profile</h3>
          <p class="analysis-card-copy">A typical day view for ${n.toLowerCase()}, split between weekdays and weekends. The band shows the p10 to p90 range and the line is the median interval.</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${s==="house"?"active":""}" data-analysis-profile="house">${at.house}</button>
          <button class="unit-btn ${s==="grid"?"active":""}" data-analysis-profile="grid">${at.grid}</button>
          <button class="unit-btn ${s==="solar"?"active":""}" data-analysis-profile="solar">${at.solar}</button>
        </div>
      </div>
      <div class="analysis-inline-metrics">
        <div>
          <span class="analysis-inline-label">Weekday median peak</span>
          <strong>${m(a.weekday.median[o]??0,2)} kW</strong>
          <span class="analysis-stat-meta">${e.intradayLabels[o]??"n/a"}</span>
        </div>
        <div>
          <span class="analysis-inline-label">Weekend median peak</span>
          <strong>${m(a.weekend.median[r]??0,2)} kW</strong>
          <span class="analysis-stat-meta">${e.intradayLabels[r]??"n/a"}</span>
        </div>
      </div>
      ${Wa({title:`${n} intraday profile`,labels:e.intradayLabels,series:[{label:"Weekday median (p10-p90 band)",color:"#58a6ff",fill:"rgba(88, 166, 255, 0.14)",band:a.weekday},{label:"Weekend median (p10-p90 band)",color:"#d29922",fill:"rgba(210, 153, 34, 0.13)",band:a.weekend,dashed:!0}],valueFormatter:i=>`${m(i,1)} kW`})}
      <p class="analysis-note">This makes the typical daily rhythm much easier to read than the weekday/hour heatmap alone.</p>
    </div>
  `}function Ga(t,e,s){const a=t.meters.reduce((o,r)=>o+r.selfConsumedKwh*e,0),n=a+t.totalFeedInRevenue;return`
    <div class="analysis-subchart">
      <h4 class="analysis-subtitle">Per-system value breakdown</h4>
      <div class="analysis-table-wrap">
        <table class="analysis-table">
          <thead>
            <tr>
              <th>System</th>
              <th>Export tariff</th>
              <th>Produced</th>
              <th>Self-used</th>
              <th>Exported</th>
              <th>Self-use value</th>
              <th>Export value</th>
              <th>Total value</th>
            </tr>
          </thead>
          <tbody>
            ${t.meters.map(o=>{const r=o.selfConsumedKwh*e,i=r+o.revenue;return`
                <tr>
                  <td>
                    <strong>${o.displayName}</strong>
                    <div class="analysis-stat-meta">${o.shortId} · priority ${o.selfUsePriority}</div>
                  </td>
                  <td>${m(o.rate,4)} ${s}/kWh</td>
                  <td>${m(o.producedKwh)} kWh</td>
                  <td>${m(o.selfConsumedKwh)} kWh</td>
                  <td>${m(o.exportedKwh)} kWh</td>
                  <td>${j(r,s)}</td>
                  <td>${j(o.revenue,s)}</td>
                  <td>${j(i,s)}</td>
                </tr>
              `}).join("")}
            <tr>
              <td><strong>Portfolio subtotal</strong></td>
              <td></td>
              <td>${m(t.meters.reduce((o,r)=>o+r.producedKwh,0))} kWh</td>
              <td>${m(t.meters.reduce((o,r)=>o+r.selfConsumedKwh,0))} kWh</td>
              <td>${m(t.meters.reduce((o,r)=>o+r.exportedKwh,0))} kWh</td>
              <td>${j(a,s)}</td>
              <td>${j(t.totalFeedInRevenue,s)}</td>
              <td>${j(n,s)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="analysis-note">This subtotal includes self-use savings and export revenue. Avoided exceedance value stays only in the overall solar total because it depends on aggregate site load, not a single solar system.</p>
    </div>
  `}function Oa(t,e,s,a){const n=t.totals.solarKwh>0?we(t.totals.solarToHomeKwh/t.totals.solarKwh*100,0,100):0,o=t.totals.solarKwh>0?we(t.totals.exportKwh/t.totals.solarKwh*100,0,100):0;return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Solar Coverage Analysis</h3>
          <p class="analysis-card-copy">How much of the house was covered by solar, how much solar stayed on-site, and how solar translated into money over time.</p>
        </div>
      </div>
      <div class="analysis-inline-metrics">
        <div>
          <span class="analysis-inline-label">Coverage of house usage</span>
          <strong>${m(t.totals.coveragePct,1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-consumed solar</span>
          <strong>${m(t.totals.selfConsumedPct,1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Solar value</span>
          <strong>${j(t.totals.solarValue,e)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-use vs export</span>
          <strong>${dt(t.totals.selfConsumptionAdvantage,e)}</strong>
        </div>
      </div>
      <div class="analysis-share-bar">
        <span class="analysis-share-segment analysis-share-segment-home" style="width:${n}%;"></span>
        <span class="analysis-share-segment analysis-share-segment-export" style="width:${o}%;"></span>
      </div>
      <div class="analysis-share-legend">
        <span><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span>Self-consumed: ${m(t.totals.solarToHomeKwh)} kWh</span>
        <span><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span>Exported: ${m(t.totals.exportKwh)} kWh</span>
      </div>
      ${s!=null&&s.meters.length?Ga(s,a,e):""}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Coverage of house usage by day</h4>
        ${he({title:"Daily solar coverage",series:[{label:"Coverage",color:"#3fb950",values:t.daily.map(r=>r.coveragePct)}],labels:t.daily.map(r=>r.label),maxValue:100,minValue:0,valueFormatter:r=>`${m(r,0)}%`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day</h4>
        ${he({title:"Daily solar value",series:[{label:"Solar value",color:"#58a6ff",values:t.daily.map(r=>r.solarValue)}],labels:t.daily.map(r=>r.label),valueFormatter:r=>j(r,e)})}
      </div>
    </div>
  `}function Ua(t,e){const s=[...t.hourlyOpportunity].sort((r,i)=>i.importCost-r.importCost)[0],a=[...t.hourlyOpportunity].sort((r,i)=>i.exportSpreadValue-r.exportSpreadValue)[0],n=[...t.hourlyOpportunity].filter(r=>r.importCost>0).sort((r,i)=>i.importCost-r.importCost).slice(0,5).map(r=>({label:r.label,value:r.importCost,meta:`${j(r.importCost,e)} from ${m(r.gridKwh,1)} kWh`})),o=[...t.hourlyOpportunity].filter(r=>r.exportSpreadValue>0).sort((r,i)=>i.exportSpreadValue-r.exportSpreadValue).slice(0,5).map(r=>({label:r.label,value:r.exportSpreadValue,meta:`${j(r.exportSpreadValue,e)} on ${m(r.exportKwh,1)} kWh`,colorClass:"analysis-progress-fill-warn"}));return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Tariff Opportunity by Hour</h3>
          <p class="analysis-card-copy">This highlights when imported energy cost you the most and when exported surplus had the biggest value gap versus self-use. It is a practical view for load shifting or storage sizing.</p>
        </div>
      </div>
      <div class="analysis-inline-metrics">
        <div>
          <span class="analysis-inline-label">Total import pressure</span>
          <strong>${j(t.hourlyOpportunity.reduce((r,i)=>r+i.importCost,0),e)}</strong>
          <span class="analysis-stat-meta">Variable import cost grouped by hour of day</span>
        </div>
        <div>
          <span class="analysis-inline-label">Export spread opportunity</span>
          <strong>${j(t.hourlyOpportunity.reduce((r,i)=>r+i.exportSpreadValue,0),e)}</strong>
          <span class="analysis-stat-meta">Approximate value gap between export and local use</span>
        </div>
        <div>
          <span class="analysis-inline-label">Hardest import hour</span>
          <strong>${(s==null?void 0:s.label)??"n/a"}</strong>
          <span class="analysis-stat-meta">${s?j(s.importCost,e):"No import cost recorded"}</span>
        </div>
        <div>
          <span class="analysis-inline-label">Best storage hour</span>
          <strong>${(a==null?void 0:a.label)??"n/a"}</strong>
          <span class="analysis-stat-meta">${a?j(a.exportSpreadValue,e):"No export spread recorded"}</span>
        </div>
      </div>
      ${he({title:"Hourly tariff opportunity",series:[{label:"Import cost pressure",color:"#f85149",values:t.hourlyOpportunity.map(r=>r.importCost)},{label:"Export spread opportunity",color:"#58a6ff",values:t.hourlyOpportunity.map(r=>r.exportSpreadValue)}],labels:t.hourlyOpportunity.map(r=>r.label),valueFormatter:r=>j(r,e)})}
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Most expensive import hours</h4>
          ${ct(n)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Best export-to-storage hours</h4>
          ${ct(o)}
        </div>
      </div>
      <p class="analysis-note">Export spread opportunity uses the difference between the import rate and feed-in rate for exported energy in that hour, so it is a directional indicator rather than a billing line item.</p>
    </div>
  `}function Ba(t,e){const s=t.hourlyExceedanceKwh.map((a,n)=>({label:`${String(n).padStart(2,"0")}:00`,value:a,meta:`${m(a,2)} kWh`,colorClass:"analysis-progress-fill-warn"})).filter(a=>a.value>0).sort((a,n)=>n.value-a.value).slice(0,6);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Reference Power and Peak Analysis</h3>
          <p class="analysis-card-copy">Where the reference limit was exceeded, how often it happened, and which hours or days were the main contributors.</p>
        </div>
      </div>
      <div class="analysis-inline-metrics">
        <div>
          <span class="analysis-inline-label">Exceeded intervals</span>
          <strong>${m(t.totals.exceedanceIntervals,0)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Total exceedance</span>
          <strong>${m(t.totals.exceedanceKwh,2)} kWh</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Peak over reference</span>
          <strong>${m(oe(t.topExceedances.map(a=>a.overKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Exceedance cost</span>
          <strong>${j(t.totals.exceedanceCost,e)}</strong>
        </div>
      </div>
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Worst hours</h4>
          ${ct(s)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Worst days</h4>
          ${ct(t.worstDays.map(a=>({label:a.fullDate,value:a.exceedanceKwh,meta:`${m(a.exceedanceKwh,2)} kWh`,colorClass:"analysis-progress-fill-warn"})))}
        </div>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Top exceedance intervals</h4>
        ${t.topExceedances.length?`
            <div class="analysis-table-wrap">
              <table class="analysis-table">
                <thead>
                  <tr>
                    <th>When</th>
                    <th>Net grid</th>
                    <th>Reference</th>
                    <th>Over</th>
                    <th>Solar then</th>
                  </tr>
                </thead>
                <tbody>
                  ${t.topExceedances.map(a=>`
                    <tr>
                      <td>${_s(a.iso)}</td>
                      <td>${m(a.gridKw,2)} kW</td>
                      <td>${m(a.referenceKw,2)} kW</td>
                      <td>${m(a.overKw,2)} kW</td>
                      <td>${m(a.solarKw,2)} kW</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `:'<div class="analysis-empty">No reference exceedance was recorded in this period.</div>'}
      </div>
    </div>
  `}function qa(t){const e=t.peakIntervals.length?t.peakIntervals.reduce((s,a)=>s+(a.houseKw>0?a.solarToHomeKw/a.houseKw*100:0),0)/t.peakIntervals.length:0;return`
    <div class="card analysis-card analysis-card-full">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Peak Interval Anatomy</h3>
          <p class="analysis-card-copy">The highest house-load intervals are broken into solar-covered demand, grid demand that stayed inside the reference window, and the part that still spilled over it.</p>
        </div>
      </div>
      <div class="analysis-inline-metrics">
        <div>
          <span class="analysis-inline-label">Highest gross peak</span>
          <strong>${m(oe(t.peakIntervals.map(s=>s.houseKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Highest net-grid peak</span>
          <strong>${m(oe(t.peakIntervals.map(s=>s.gridKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Solar share across peaks</span>
          <strong>${m(e,0)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Intervals over reference</span>
          <strong>${m(t.peakIntervals.filter(s=>s.overKw>0).length,0)} / ${m(t.peakIntervals.length,0)}</strong>
        </div>
      </div>
      ${Pa(t.peakIntervals)}
      <p class="analysis-note">A gold cap only appears when the grid portion of the interval exceeded the configured reference power.</p>
    </div>
  `}function Ya(t,e,s){var p,y;const a=e.analysisComparisonMode==="last_year"?"Last year":"Previous";if(e.analysisComparisonLoading)return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${is(e)}</p>
          </div>
          <div class="chart-unit-toggle">
            <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${Le.previous}</button>
            <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${Le.last_year}</button>
          </div>
        </div>
        <div class="analysis-empty">Loading comparison period...</div>
      </div>
    `;if(!((p=e.analysisComparison)!=null&&p.consumptionTimeseries)||!((y=e.analysisComparison)!=null&&y.productionTimeseries))return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${e.analysisComparisonMode==="last_year"?"The same calendar period last year is shown here when enough history is available.":"A matched previous period is shown here when enough historic data is available."}</p>
          </div>
          <div class="chart-unit-toggle">
            <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${Le.previous}</button>
            <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${Le.last_year}</button>
          </div>
        </div>
        <div class="analysis-empty">Comparison data is unavailable for the selected range.</div>
      </div>
    `;const n=Ss(s,e.analysisComparison.consumptionTimeseries,null,void 0,void 0),o=Ms(e.analysisComparison.consumptionTimeseries,e.analysisComparison.productionTimeseries,e.analysisComparison.gridImportTimeseries,e.analysisComparison.marketExportTimeseries,s,n),r=Math.max(t.daily.length,o.daily.length,1),i=Array.from({length:r},(f,b)=>`D${b+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Period Comparison</h3>
          <p class="analysis-card-copy">${is(e)}</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${Le.previous}</button>
          <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${Le.last_year}</button>
        </div>
      </div>
      <div class="analysis-compare-grid">
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">House usage</span>
          <strong>${m(t.totals.houseKwh)} kWh</strong>
          <span class="analysis-compare-delta">${rt(t.totals.houseKwh-o.totals.houseKwh)} kWh vs ${a.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Net grid usage</span>
          <strong>${m(t.totals.gridKwh)} kWh</strong>
          <span class="analysis-compare-delta">${rt(t.totals.gridKwh-o.totals.gridKwh)} kWh vs ${a.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar coverage</span>
          <strong>${m(t.totals.coveragePct,1)}%</strong>
          <span class="analysis-compare-delta">${rt(t.totals.coveragePct-o.totals.coveragePct)} pts vs ${a.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar value</span>
          <strong>${j(t.totals.solarValue,s.currency||"EUR")}</strong>
          <span class="analysis-compare-delta">${rt(t.totals.solarValue-o.totals.solarValue,2)} ${s.currency||"EUR"} vs ${a.toLowerCase()}</span>
        </div>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Usage by day index</h4>
        ${he({title:`Current versus ${a.toLowerCase()} usage`,series:[{label:"Current",color:"#f85149",values:t.daily.map(f=>f.houseKwh)},{label:a,color:"#58a6ff",values:o.daily.map(f=>f.houseKwh),dashed:!0}],labels:i,valueFormatter:f=>`${m(f,1)} kWh`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day index</h4>
        ${he({title:`Current versus ${a.toLowerCase()} solar value`,series:[{label:"Current",color:"#3fb950",values:t.daily.map(f=>f.solarValue)},{label:a,color:"#d29922",values:o.daily.map(f=>f.solarValue),dashed:!0}],labels:i,valueFormatter:f=>j(f,s.currency||"EUR")})}
      </div>
    </div>
  `}function za(t,e){return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Tariff-Aware Cost Trends</h3>
          <p class="analysis-card-copy">Estimated variable import cost, solar savings, export earnings, and exceedance cost by day. Fixed monthly fees are intentionally left out so this stays behavior-driven.</p>
        </div>
      </div>
      ${he({title:"Daily cost and value trends",series:[{label:"Import cost",color:"#f85149",values:t.daily.map(s=>s.importCost)},{label:"Solar savings",color:"#3fb950",values:t.daily.map(s=>s.solarSavings)},{label:"Export earnings",color:"#58a6ff",values:t.daily.map(s=>s.exportRevenue)},{label:"Exceedance cost",color:"#d29922",values:t.daily.map(s=>s.exceedanceCost)}],labels:t.daily.map(s=>s.label),valueFormatter:s=>j(s,e)})}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily net energy value</h4>
        ${he({title:"Daily net energy value",series:[{label:"Net value",color:"#39c5cf",values:t.daily.map(s=>s.netValue)}],labels:t.daily.map(s=>s.label),referenceValue:0,referenceLabel:"Break-even",valueFormatter:s=>dt(s,e)})}
      </div>
      <div class="analysis-cost-totals">
        <span>Import cost: <strong>${j(t.totals.importCost,e)}</strong></span>
        <span>Solar savings: <strong>${j(t.totals.solarSavings,e)}</strong></span>
        <span>Export earnings: <strong>${j(t.totals.exportRevenue,e)}</strong></span>
        <span>Exceedance cost: <strong>${j(t.totals.exceedanceCost,e)}</strong></span>
        <span>Net value: <strong>${dt(t.totals.netValue,e)}</strong></span>
      </div>
    </div>
  `}function Xa(t,e){const s=Array.from({length:Math.max(t.loadDurationGrossKw.length,t.loadDurationNetKw.length,1)},(a,n)=>`${n+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Load Duration Curve</h3>
          <p class="analysis-card-copy">Gross house load and net grid load sorted from highest to lowest interval. This shows how often high demand really occurs and how much solar trims the top end.</p>
        </div>
      </div>
      ${he({title:"Load duration curve",series:[{label:"Gross house load",color:"#f85149",values:t.loadDurationGrossKw},{label:"Net grid load",color:"#58a6ff",values:t.loadDurationNetKw}],labels:s,referenceValue:e>0?e:void 0,referenceLabel:e>0?`Reference ${m(e,1)} kW`:void 0,valueFormatter:a=>`${m(a,1)} kW`})}
      <p class="analysis-note">Intervals are ordered from highest demand to lowest, so the left side is your hardest-to-handle load.</p>
    </div>
  `}function Za(t){var c,v;const e=t.config,s=t.rangeData,a=t.consumptionTimeseries,n=t.productionTimeseries;if(!e||!s||!a||!n)return`
      <section class="analysis-view">
        <div class="card">
          <p class="muted">Loading analysis data...</p>
        </div>
      </section>
    `;const o=Math.max(0,s.consumption??0),r=Math.max(0,s.production??0),i=Math.max(0,s.exported??0),p=Math.max(0,s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:0)),y=Math.max(0,(s.grid_import!=null?o-s.grid_import:void 0)??s.solar_to_home??p??(s.self_consumed&&s.self_consumed>0?s.self_consumed:r-i)),f=Math.max(0,s.grid_import??o-y),b=Math.max(0,y-p),$=Pt(e,a,((c=t.perMeterProductionTimeseries)==null?void 0:c.meters)??null,p,i),d=Ss(e,a,((v=t.perMeterProductionTimeseries)==null?void 0:v.meters)??null,p,i),h=Ms(a,n,t.gridImportTimeseries,t.marketExportTimeseries,e,d),g=e.currency||"EUR",_=((e.energy_variable_rate??0)+(e.network_variable_rate??0)+(e.electricity_tax_rate??0)+(e.compensation_fund_rate??0))*(1+(e.vat_rate??0)),k=p*_,x=$?$.totalSelfUseExportEquivalent:p*d,S=$?$.totalFeedInRevenue:i*d,M={consumptionKwh:o,totalSolarCoverageKwh:y,directSolarToHomeKwh:p,communitySolarToHomeKwh:b,exportedKwh:i,billedGridImportKwh:f,coveragePct:o>0?we(y/o*100,0,100):0,selfConsumedPct:r>0?we(p/r*100,0,100):0,totalSolarValue:k+h.totals.avoidedExceedanceValue+S,selfConsumptionAdvantage:k-x,variableImportCost:f*_};return`
    <section class="analysis-view">
      <div class="section-header analysis-section-header">
        <div>
          <span class="badge">Analysis</span>
          <h2>Charts and Optimization</h2>
          <p class="muted">Deeper electricity analysis for ${Ta(t)}. This page is built from the same 15-minute data and billing settings that drive the dashboard and invoice.</p>
        </div>
        <div class="analysis-header-meta">
          <span>${Ea(t)}</span>
          <span>${m(h.daily.length,0)} day${h.daily.length===1?"":"s"} analysed</span>
        </div>
      </div>

      ${Aa(t)}
      ${Va(h,g,M)}
      ${Ha(h)}

      <div class="analysis-grid">
        ${Na(t,h)}
        ${ja(t,h)}
      </div>

      <div class="analysis-grid">
        ${Oa(h,g,$,_)}
        ${Ua(h,g)}
      </div>

      <div class="analysis-grid">
        ${Ba(h,g)}
        ${Ya(h,t,e)}
      </div>

      <div class="analysis-grid">
        ${za(h,g)}
        ${Xa(h,e.reference_power_kw??0)}
      </div>

      ${qa(h)}
    </section>
  `}const ls={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function Ja(t){return ls[t]?ls[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function Qa(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],s=[],a=[],n=[],o=[];for(const i of t.sensors){const p=i.key;p.startsWith("c_")||p==="1-1:1.29.0"||p==="1-1:3.29.0"?e.push(i):p.startsWith("p_")||p==="1-1:2.29.0"||p==="1-1:4.29.0"?s.push(i):p.startsWith("s_")||p.startsWith("1-65:")?a.push(i):p.startsWith("g_")||p.startsWith("7-")?n.push(i):o.push(i)}const r=(i,p,y,f)=>y.length?`
      <div class="card sensor-group">
        <h3 class="card-title"><span class="title-icon">${p}</span> ${i} <span class="badge">${y.length}</span></h3>
        <div style="overflow-x: auto;">
          <table class="sensor-table">
            <thead>
              <tr>
                <th>Sensor</th>
                <th style="text-align: right;">Value</th>
                <th>Unit</th>
                <th>Peak Time</th>
              </tr>
            </thead>
            <tbody>
              ${y.map(b=>`
                <tr>
                  <td class="sensor-name">${Ja(b.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${f});">${m(b.value)}</td>
                  <td class="sensor-unit">${b.unit}</td>
                  <td class="sensor-peak">${b.peak_timestamp?_s(b.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `:"";return`
    <section class="sensors-view">
      <div class="section-header">
        <h2>All Sensors</h2>
        <div style="display: flex; align-items: center; gap: var(--sp-3); margin-top: var(--sp-2);">
          <span class="badge">${t.sensors.length} sensors</span>
          <span class="muted">${t.metering_point}</span>
        </div>
      </div>
      ${r("Electricity Consumption","⚡",e,"consumption")}
      ${r("Energy Production","☀️",s,"production")}
      ${r("Energy Sharing","🔗",a,"self")}
      ${r("Gas","🔥",n,"gas")}
      ${r("Other","📊",o,"text")}
    </section>
  `}const er=11,Cs="lu_resilienzpak_electricity_2026",tr="lu_resilienzpak_gas_2026",sr=[{id:"lu-electricity-resilienzpak-2026",label:"Luxembourg electricity subsidy 2026",enabled:!0,commodity:"electricity",basis:"grid_import_kwh",amount_gross:.04,start_date:"2026-08-01",end_date:"2026-12-31",vat_included:!0,preset_id:Cs,eligibility_note:"Residential customers below 25,000 kWh/year; applies to grid import only.",tariff_already_includes_adjustment:!1},{id:"lu-gas-resilienzpak-2026",label:"Luxembourg gas subsidy 2026",enabled:!0,commodity:"gas",basis:"gas_volume_m3",amount_gross:.15,start_date:"2026-08-01",end_date:"2026-12-31",vat_included:!0,preset_id:tr,eligibility_note:"Eligible residential gas consumption.",tariff_already_includes_adjustment:!1}];function ar(t=!0){return sr.map(e=>({...e,enabled:t}))}const Ts=["electricity","gas"],Es=["grid_import_kwh","gas_volume_m3"];function rr(t){const e=[];Ts.includes(t.commodity)||e.push(`invalid commodity: ${String(t.commodity)}`),Es.includes(t.basis)||e.push(`invalid basis: ${String(t.basis)}`);const s=Number(t.amount_gross);isFinite(s)?s<0&&e.push("amount_gross must not be negative"):e.push("amount_gross must be a number");const a=ut(t.start_date),n=ut(t.end_date);return a||e.push("start_date must be YYYY-MM-DD"),n||e.push("end_date must be YYYY-MM-DD"),a&&n&&n<a&&e.push("end_date must not be before start_date"),e}function nr(t,e=0){let s=Number(t.amount_gross);return isFinite(s)||(s=0),{id:t.id?String(t.id).trim():`custom-${e+1}`,label:t.label&&String(t.label).trim()?String(t.label).trim():"Billing adjustment",enabled:t.enabled!==!1,commodity:Ts.includes(t.commodity)?t.commodity:"electricity",basis:Es.includes(t.basis)?t.basis:"grid_import_kwh",amount_gross:s,start_date:String(t.start_date??"").slice(0,10),end_date:String(t.end_date??"").slice(0,10),vat_included:t.vat_included!==!1,preset_id:t.preset_id?String(t.preset_id).trim():"",eligibility_note:t.eligibility_note?String(t.eligibility_note).trim():"",tariff_already_includes_adjustment:!!t.tariff_already_includes_adjustment}}function Ds(t){return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object").map((e,s)=>nr(e,s)):[]}function ut(t){if(!t||!/^\d{4}-\d{2}-\d{2}/.test(t))return null;const e=t.slice(0,10),[s,a,n]=e.split("-").map(Number);if(a<1||a>12||n<1||n>31)return null;const o=new Date(Date.UTC(s,a-1,n));return o.getUTCFullYear()!==s||o.getUTCMonth()!==a-1||o.getUTCDate()!==n?null:e}const or=new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Luxembourg",year:"numeric",month:"2-digit",day:"2-digit"});function ir(t){const e=new Date(t);return Number.isNaN(e.getTime())?null:or.format(e)}function lr(t,e){return!!t.start_date&&!!t.end_date&&t.start_date<=e&&e<=t.end_date}function It(t){return t.enabled&&rr(t).length===0}function Dt(t){return It(t)&&!t.tariff_already_includes_adjustment}function Fe(t){const[e,s,a]=t.split("-").map(Number);return Math.floor(Date.UTC(e,s-1,a)/864e5)}function Ls(t,e,s){const a=ut(t.start_date),n=ut(t.end_date);if(!a||!n)return 0;const o=a>e?a:e,r=n<s?n:s,i=Fe(r)-Fe(o)+1;return i>0?i:0}function Lt(t,e,s,a,n,o){const r=e*t.amount_gross,i=t.vat_included?r/(1+a):r;return{id:t.id,label:t.label,commodity:t.commodity,basis:t.basis,unit:s,quantity:e,amount_gross:t.amount_gross,total_gross:r,total_net:i,vat_included:t.vat_included,applied:n,estimated:o,preset_id:t.preset_id??"",eligibility_note:t.eligibility_note??""}}function dr(t,e,s,a,n,o,r,i){const p=t.filter(d=>d.commodity==="electricity"&&d.basis==="grid_import_kwh"&&It(d));if(p.length===0)return{lines:[],solarCorrectionGross:0,estimatedAny:!1};const y=[];let f=0,b=!1;if(e&&e.length>0){const d=new Map(p.map(_=>[_.id,0])),h=new Map(p.map(_=>[_.id,0])),g=new Map;for(const _ of s??[]){const k=String(_.startedAt??"");g.set(k,(g.get(k)??0)+(Number(_.value)||0))}for(const _ of e){const k=Number(_.value)||0,x=String(_.startedAt??""),S=ir(x);if(S===null)continue;const M=g.get(x)??0,c=Math.max(0,k-M)*.25,v=Math.min(k,M)*.25;for(const l of p)lr(l,S)&&(d.set(l.id,d.get(l.id)+c),h.set(l.id,h.get(l.id)+v))}for(const _ of p){const k=Dt(_);y.push(Lt(_,d.get(_.id),"kWh",i,k,!1)),k&&(f+=h.get(_.id)*_.amount_gross)}return{lines:y,solarCorrectionGross:f,estimatedAny:b}}const $=Math.max(1,Fe(r)-Fe(o)+1);for(const d of p){const h=Ls(d,o,r),g=h/$,_=h>0&&h<$;b=b||_;const k=Dt(d);y.push(Lt(d,Math.max(0,a)*g,"kWh",i,k,_)),k&&(f+=Math.max(0,n)*g*d.amount_gross)}return{lines:y,solarCorrectionGross:f,estimatedAny:b}}function cr(t,e,s,a,n,o){const r=t.filter(b=>b.commodity==="gas"&&b.basis==="gas_volume_m3"&&It(b));if(r.length===0)return{lines:[],estimatedAny:!1};let i=!1,p=Math.max(0,e||0);p<=0&&s>0&&(p=s/er,i=!0);const y=Math.max(1,Fe(n)-Fe(a)+1),f=[];for(const b of r){const $=Ls(b,a,n),d=$/y,h=i||$>0&&$<y;f.push(Lt(b,p*d,"m3",o,Dt(b),h)),h&&(i=!0)}return{lines:f,estimatedAny:i}}function ur(t){const e=Ds(t.adjustments),s=dr(e,t.consumptionItems,t.productionItems,t.fallbackGridImportKwh??0,t.fallbackSelfConsumedKwh??0,t.periodStart,t.periodEnd,t.vatRate||0),a=cr(e,t.gasVolumeM3??0,t.gasEnergyKwh??0,t.periodStart,t.periodEnd,t.gasVatRate||0),n=i=>{let p=0,y=0;for(const f of i)f.applied&&(p+=f.total_gross,y+=f.total_net);return{gross:p,net:y}},o=n(s.lines),r=n(a.lines);return{electricity:{lines:s.lines,applied_gross:o.gross,applied_net:o.net,solar_correction_gross:s.solarCorrectionGross,estimated:s.estimatedAny},gas:{lines:a.lines,applied_gross:r.gross,applied_net:r.net,estimated:a.estimatedAny},estimated:s.estimatedAny||a.estimatedAny}}const ds=[{kw:3,fixedMonthlyFee:7.42},{kw:7,fixedMonthlyFee:12.84},{kw:12,fixedMonthlyFee:19.61},{kw:17,fixedMonthlyFee:26.39},{kw:27,fixedMonthlyFee:39.94},{kw:43,fixedMonthlyFee:61.62},{kw:70,fixedMonthlyFee:98.2},{kw:100,fixedMonthlyFee:138.85},{kw:150,fixedMonthlyFee:206.6,existingContractsOnly:!0},{kw:200,fixedMonthlyFee:274.35,existingContractsOnly:!0}];function nt(t){if(!t)return null;const e=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(e){const[,a,n,o]=e;return new Date(Number(a),Number(n)-1,Number(o))}const s=new Date(t);return Number.isNaN(s.getTime())?null:new Date(s.getFullYear(),s.getMonth(),s.getDate())}function cs(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function pr(t,e,s,a,n){const o=new Date,r=nt(a),i=nt(n);let p=r,y=i;if(!p||!y)switch(t){case"yesterday":{const g=new Date(o);g.setDate(g.getDate()-1),p=new Date(g.getFullYear(),g.getMonth(),g.getDate()),y=new Date(p);break}case"this_week":{const g=new Date(o),_=g.getDay()||7;p=new Date(g.getFullYear(),g.getMonth(),g.getDate()-_+1),y=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_week":{const g=new Date(o),_=g.getDay()||7,k=new Date(g.getFullYear(),g.getMonth(),g.getDate()-_+1);p=new Date(k.getFullYear(),k.getMonth(),k.getDate()-7),y=new Date(k.getFullYear(),k.getMonth(),k.getDate()-1);break}case"this_month":{p=new Date(o.getFullYear(),o.getMonth(),1),y=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_month":{p=new Date(o.getFullYear(),o.getMonth()-1,1),y=new Date(o.getFullYear(),o.getMonth(),0);break}case"this_year":{p=new Date(o.getFullYear(),0,1),y=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_year":{p=new Date(o.getFullYear()-1,0,1),y=new Date(o.getFullYear()-1,11,31);break}case"custom":{p=nt(e)??new Date(o.getFullYear(),o.getMonth(),o.getDate()),y=nt(s)??new Date(p);break}default:{p=new Date(o.getFullYear(),o.getMonth(),o.getDate()-1),y=new Date(p);break}}if(y<p){const g=p;p=y,y=g}let f=0,b=0;const $=new Date(p);for(;$<=y;){const g=new Date($.getFullYear(),$.getMonth()+1,0).getDate();b+=1/g,f+=1,$.setDate($.getDate()+1)}const d=p.getFullYear()===y.getFullYear()&&p.getMonth()===y.getMonth()&&p.getDate()===1&&y.getDate()===new Date(y.getFullYear(),y.getMonth()+1,0).getDate(),h=g=>`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}-${String(g.getDate()).padStart(2,"0")}`;return{days:f,factor:b,label:d?"full month":`${f} day${f===1?"":"s"}`,startIso:h(p),endIso:h(y)}}function mr(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function us(t){const[e,s]=t.split(":").map(a=>parseInt(a,10)||0);return e*60+s}function Ws(t,e,s,a){if(!mr(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),o=us(s),r=us(a);return o===r?!0:o<r?n>=o&&n<r:n>=o||n<r}function hr(t,e){return e.find(s=>Ws(t,s.day_group,s.start_time,s.end_time))}function gr(t,e){return e.find(s=>Ws(t,s.day_group,s.start_time,s.end_time))}function ps(t,e,s,a,n,o=[]){var d;const r=new Map;let i=0,p=0,y=0,f=0,b=0;const $=new Map;for(const h of o){const g=Number(h.value)||0;$.set(h.startedAt,($.get(h.startedAt)??0)+g)}for(const h of t){const g=Number(h.value)||0,_=g*.25,k=$.get(h.startedAt)??0,x=Math.max(0,g-k),S=new Date(h.startedAt);if(Number.isNaN(S.getTime()))continue;const M=hr(S,a),c=gr(S,n),v=(M==null?void 0:M.rate)??e,l=((d=M==null?void 0:M.label)==null?void 0:d.trim())||"Base tariff",u=(c==null?void 0:c.reference_power_kw)??s;i+=_*v,b=Math.max(b,g),f=Math.max(f,x),g>u&&(y+=(g-u)*.25),x>u&&(p+=(x-u)*.25);const E=`${l}__${v}`,D=r.get(E);D?D.kwh+=_:r.set(E,{label:l,rate:v,kwh:_})}return{energyCost:i,exceedanceKwh:p,grossExceedanceKwh:y,avoidedExceedanceKwh:Math.max(0,y-p),peakPowerKw:f,grossPeakPowerKw:b,rateBreakdown:Array.from(r.values()).sort((h,g)=>h.label.localeCompare(g.label))}}function vr(t){var Xt,Zt,Jt,Qt;const e=t.config,s=t.rangeData;if(!e||!s)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const a=s.consumption||0,n=s.production||0,o=s.exported||0,r=Math.max(0,o),i=s.grid_import,p=(s.solar_to_home??s.direct_solar_to_home??s.self_consumed??n)>0,y=i!=null&&!(i<=0&&a>0&&!p),f=Math.max(0,(y?a-i:void 0)??s.solar_to_home??s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:n-r)),b=Math.min(f,Math.max(0,s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:n-r))),$=Math.max(0,f-b),d=Math.max(0,i!=null&&!(i<=0&&a>0&&f<=0)?i:a-f),h=s.peak_power_kw||0,g=e.reference_power_kw||5,_=s.exceedance_kwh||0,k=s.gas_energy||0,x=s.gas_volume||0,S=k>0||x>0,M=e.consumption_rate_windows??[],c=e.reference_power_windows??[],v=t.consumptionTimeseries?ps(t.consumptionTimeseries.items,e.energy_variable_rate,g,M,c,((Xt=t.productionTimeseries)==null?void 0:Xt.items)??[]):null,l=M.length>0&&!!v&&Math.abs(d-a)<.01,u=c.length>0&&!!v,E=v?v.peakPowerKw:h,D=v?v.exceedanceKwh:_,K=cs(s.start??t.customStart),V=cs(s.end??t.customEnd),{days:P,factor:R,label:G,startIso:ie,endIso:te}=pr(t.range,t.customStart,t.customEnd,s.start,s.end),le=e.energy_fixed_fee*R,z=e.network_metering_rate*R,se=e.network_power_ref_rate*R,de=l?v.energyCost:d*e.energy_variable_rate,ge=d*e.network_variable_rate,U=D*e.exceedance_rate,N=e.meter_monthly_fees??[],B=N.reduce((w,H)=>w+(H.fee||0),0)*R,ve=d*e.compensation_fund_rate,be=d*e.electricity_tax_rate,Ce=Math.max(0,e.domiciliation_discount??0)*R,ye=Math.max(0,e.connect_discount??0)*R,_e=le+de+z+se+ge+U+B+ve+be-Ce-ye,Q=ur({adjustments:e.billing_adjustments,vatRate:e.vat_rate,gasVatRate:e.gas_vat_rate??.08,periodStart:ie,periodEnd:te,consumptionItems:((Zt=t.consumptionTimeseries)==null?void 0:Zt.items)??null,productionItems:((Jt=t.productionTimeseries)==null?void 0:Jt.items)??null,fallbackGridImportKwh:d,fallbackSelfConsumedKwh:f,gasVolumeM3:x,gasEnergyKwh:k}),Pe=Q.electricity.lines,ce=Q.gas.lines,Ke=Pe.some(w=>w.applied&&Math.abs(w.total_gross)>1e-9),Be=ce.some(w=>w.applied&&Math.abs(w.total_gross)>1e-9),pt=Q.electricity.applied_net,mt=Q.gas.applied_net,qe=Q.estimated,Ye=_e,ze=_e-pt,Xe=ze*e.vat_rate,$e=ze+Xe,ue=Ft(e),X=Pt(e,t.consumptionTimeseries,((Qt=t.perMeterProductionTimeseries)==null?void 0:Qt.meters)??null,b,r),Te=ue.filter(w=>isFinite(w.rate)&&w.rate>0),Z=ue.length>1,xe=X?X.weightedExportRate:Te.length>0?Te.reduce((w,H)=>w+H.rate,0)/Te.length:e.feed_in_tariff,ee=X?X.totalFeedInRevenue:r*xe,Ie=Z&&ue.length>0?r/ue.length:r,Ee=X?X.meters:ue.map(w=>({...w,producedKwh:0,exportedKwh:Ie,revenue:Ie*w.rate,selfConsumedKwh:0,exportEquivalentForSelfUse:0})),C=!!X,L=X?X.meters.reduce((w,H)=>w+H.selfConsumedKwh,0):b,O=e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate,Y=O*(1+e.vat_rate),ke=L*O,ae=ke*e.vat_rate,re=Q.electricity.solar_correction_gross,ne=ke+ae-re,Rt=X?X.totalSelfUseExportEquivalent:L*xe,At=ne-Rt,Re=Math.max(0,(v==null?void 0:v.avoidedExceedanceKwh)??0),ht=Re*e.exceedance_rate,Vt=ht*e.vat_rate,Ae=ht+Vt,Ze=Re>1e-4,Je=ne+Ae+ee,gt=Ee.map(w=>{const H=w.selfConsumedKwh*Y,A=H-w.exportEquivalentForSelfUse;return{...w,selfUseSavings:H,selfUseVsExport:A,totalTrackedValue:H+w.revenue}}),As=C&&gt.length>0,Qe=$e-ee,Ht=(e.gas_fixed_fee??6.5)*R,jt=k*(e.gas_variable_rate??.055),Nt=(e.gas_network_fee??4.8)*R,Gt=k*(e.gas_network_variable_rate??.012),Ot=k*(e.gas_tax_rate??.001),Ut=Ht+jt+Nt+Gt+Ot,Bt=Ut,vt=Ut-mt,qt=vt*(e.gas_vat_rate??.08),yt=vt+qt,I=e.currency||"EUR",T=w=>`${m(w,2)} ${I}`,ft=w=>`${w>0?"+":w<0?"-":""}${m(Math.abs(w),2)} ${I}`,F=w=>m(w,3),wt=w=>m(w,3),Vs=w=>w>=0?"comparison-delta-savings":"comparison-delta-extra",Yt=(w,H)=>w.map(A=>{const Se=A.unit==="kWh"?`${F(A.quantity)} kWh`:`${wt(A.quantity)} m³`,xt=A.estimated?' <span class="muted">(estimated)</span>':"",tt=A.vat_included?A.total_gross:A.total_gross*(1+H);return A.applied?`
            <tr class="revenue-row">
              <td>${A.label}${xt}${A.eligibility_note?`<br/><span class="muted" style="font-size: var(--text-xs);">${A.eligibility_note}</span>`:""}</td>
              <td style="text-align: right;">${Se} × ${m(A.amount_gross,4)} ${I}/${A.unit}${A.vat_included?" incl. VAT":" excl. VAT"}<br/>= −${T(tt)}${A.vat_included?" incl. VAT":""}</td>
              <td class="revenue-amount" style="text-align: right;">−${T(A.total_net)}</td>
            </tr>
          `:`
            <tr class="revenue-row">
              <td>${A.label}${xt}<br/><span class="muted" style="font-size: var(--text-xs);">Already reflected in your configured tariff — not deducted again</span></td>
              <td style="text-align: right;">${Se} × ${m(A.amount_gross,4)} ${I}/${A.unit}</td>
              <td style="text-align: right;"><span class="muted">in tariff</span></td>
            </tr>
          `}).join(""),Hs=Yt(Pe,e.vat_rate),js=Yt(ce,e.gas_vat_rate??.08),zt=Ye*(1+e.vat_rate),Ns=Pe.length>0,Gs=ce.length>0,Os=As?`
            <tr class="section-label"><td colspan="3">Per-System Self-Use vs Export</td></tr>
            ${gt.map(w=>`
            <tr>
              <td>${w.displayName}</td>
              <td style="text-align: right;">
                ${w.shortId}<br/>
                Produced ${F(w.producedKwh)} kWh<br/>
                Kept on-site ${F(w.selfConsumedKwh)} kWh<br/>
                Sold ${F(w.exportedKwh)} kWh<br/>
                ${w.label} ${m(w.rate,4)} ${I}/kWh${Z?`<br/>Self-use priority ${w.selfUsePriority}`:""}
              </td>
              <td style="text-align: right;">
                <strong>${T(w.totalTrackedValue)}</strong><br/>
                <span class="${Vs(w.selfUseVsExport)}">${ft(w.selfUseVsExport)}</span> self-use vs export<br/>
                <span class="muted">${T(w.selfUseSavings)} kept value + ${T(w.revenue)} sold</span>
              </td>
            </tr>
            `).join("")}
            <tr class="subtotal-row">
              <td colspan="2"><strong>Tracked per-system value</strong></td>
              <td style="text-align: right;"><strong>${T(gt.reduce((w,H)=>w+H.totalTrackedValue,0))}</strong></td>
            </tr>
      `:"",Us=C?`Compared with exporting the same ${F(L)} kWh using the configured PV self-use priority and each system's own feed-in tariff`:`Compared with selling the same ${F(L)} kWh at ${m(xe,4)} ${I}/kWh`,bt=ds.find(w=>Math.abs(w.kw-g)<.05),Bs=_e-se-U,_t=v?ds.map(w=>{var es;const H=ps(t.consumptionTimeseries.items,e.energy_variable_rate,w.kw,M,c,((es=t.productionTimeseries)==null?void 0:es.items)??[]),A=w.fixedMonthlyFee*R,Se=H.exceedanceKwh*e.exceedance_rate,tt=(Bs+A+Se)*(1+e.vat_rate);return{...w,fixedCharge:A,exceedanceKwh:H.exceedanceKwh,exceedanceCharge:Se,total:tt,deltaVsCurrent:tt-$e}}):[],et=_t.reduce((w,H)=>!w||H.total<w.total?H:w,null),qs=w=>Math.abs(w)<.005?"Current total":`${w>0?"+":"-"}${T(Math.abs(w))}`,$t=s.start&&s.end?`${fe(s.start)} — ${fe(s.end)}`:t.range.replace("_"," ").replace(/\b\w/g,w=>w.toUpperCase()),Ys=D>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${m(E,1)} kW</strong> &mdash; ${u?"Reference power windows active":`Reference power level: ${m(g,1)} kW`}</p>
        <p>Exceedance volume: <strong>${F(D)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${T(U)}</p>
      </div>`:"",zs=l?v.rateBreakdown.map(w=>`
            <tr>
              <td>${w.label} (${F(w.kwh)} kWh)</td>
              <td style="text-align: right;">${m(w.rate,4)} ${I}/kWh</td>
              <td style="text-align: right;">${T(w.kwh*w.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Supplier rate (${F(d)} kWh bought from grid)</td>
              <td style="text-align: right;">${m(e.energy_variable_rate,4)} ${I}/kWh</td>
              <td style="text-align: right;">${T(de)}</td>
            </tr>
          `,Xs=u?`Reference power windows active (${c.length})`:`${m(g,1)} kW`,Zs=l?`Time-of-use windows active (${M.length})`:`${m(e.energy_variable_rate,4)} ${I}/kWh`,Js=_t.map(w=>{const H=!!et&&w.kw===et.kw,A=!!bt&&w.kw===bt.kw,Se=w.deltaVsCurrent<-.005?"comparison-delta-savings":w.deltaVsCurrent>.005?"comparison-delta-extra":"";return`
            <tr class="${H?"reference-power-best-row":""}${A?" reference-power-current-row":""}">
              <td>
                <div class="reference-level-cell">
                  <span class="reference-level-kw">${m(w.kw,0)} kW</span>
                  ${H?'<span class="reference-level-badge best">Financially optimal</span>':""}
                  ${A?'<span class="reference-level-badge current">Current</span>':""}
                  ${w.existingContractsOnly?'<span class="reference-level-badge legacy">Existing contracts</span>':""}
                </div>
              </td>
              <td style="text-align: right;">${T(w.fixedCharge)}</td>
              <td style="text-align: right;">${T(w.exceedanceCharge)}</td>
              <td style="text-align: right;"><strong>${T(w.total)}</strong></td>
              <td class="${Se}" style="text-align: right;">${qs(w.deltaVsCurrent)}</td>
            </tr>
          `}).join(""),Qs=_t.length>0?`
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${u?"Configured reference power windows stay active in this comparison.":"One reference power level is applied to the full selected period."}
              ${bt?"":`Your current configuration uses ${m(g,1)} kW, which is outside the standard Creos low-voltage reference power levels.`}
            </p>
          </div>
          ${et?`<div class="reference-power-optimum">
                <span class="reference-level-badge best">Financially optimal: ${m(et.kw,0)} kW</span>
              </div>`:""}
        </div>
        <table class="invoice-table reference-power-table">
          <thead>
            <tr>
              <th>Reference power level</th>
              <th style="text-align: right;">Fixed charge</th>
              <th style="text-align: right;">Exceedance charge</th>
              <th style="text-align: right;">Estimated total</th>
              <th style="text-align: right;">Difference vs current</th>
            </tr>
          </thead>
          <tbody>
            ${Js}
          </tbody>
        </table>
      </div>
    `:`
      <div class="card reference-power-card">
        <p class="muted">Reference power level comparison requires 15-minute load-curve data for the selected period.</p>
      </div>
    `,ea=`
      <div class="range-selector">
        ${Ue.map(w=>`
          <button
            class="range-btn ${w.id===t.range?"active":""}"
            data-range="${w.id}"
          >${w.label}</button>
        `).join("")}
      </div>
    `,ta=s.start&&s.end?(()=>{const w=new Date(s.start),H=new Date(s.end);return Number.isNaN(w.getTime())||Number.isNaN(H.getTime())?"":`
        <div class="range-info-bar">
          Period: ${w.toLocaleDateString()} - ${H.toLocaleDateString()}
        </div>
      `})():"",sa=t.range==="custom"?`
      <div class="custom-range-picker">
        <label>
          <span>From</span>
          <input type="date" id="custom-start" value="${t.customStart??""}" />
        </label>
        <label>
          <span>To</span>
          <input type="date" id="custom-end" value="${t.customEnd??""}" />
        </label>
        <button class="btn btn-primary" id="apply-custom-range">Apply</button>
      </div>
    `:K&&V?`
        <div class="custom-range-picker period-preview">
          <span class="period-preview-label">Viewed period</span>
          <label>
            <span>From</span>
            <input type="date" value="${K}" readonly aria-label="Preset period start" />
          </label>
          <label>
            <span>To</span>
            <input type="date" value="${V}" readonly aria-label="Preset period end" />
          </label>
        </div>
      `:"";return`
    <section class="invoice-view">
      ${ea}
      ${ta}
      ${sa}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Supplier Bill Estimate &mdash; ${$t}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the selected period. Feed-in revenue and net position are shown separately.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${F(a)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${F(d)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${F(n)} kWh produced</span>
          ${r>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${F(r)} kWh exported</span>`:""}
          ${S?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${F(k)} kWh gas (${wt(x)} m³)</span>`:""}
        </div>
      </div>

      ${Ys}

      <div class="card invoice-card">
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Component</th>
              <th style="text-align: right;">Rate / Detail</th>
              <th style="text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr class="section-label"><td colspan="3">Energy Supplier</td></tr>
            <tr>
              <td>Fixed Fee <span class="muted">(${G})</span></td>
              <td style="text-align: right;">${m(e.energy_fixed_fee,2)} ${I}/mo</td>
              <td style="text-align: right;">${T(le)}</td>
            </tr>
            ${zs}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${G})</span></td>
              <td style="text-align: right;">${m(e.network_metering_rate,2)} ${I}/mo</td>
              <td style="text-align: right;">${T(z)}</td>
            </tr>
            <tr>
              <td>Reference power level (${Xs}) <span class="muted">(${G})</span></td>
              <td style="text-align: right;">${m(e.network_power_ref_rate,2)} ${I}/mo</td>
              <td style="text-align: right;">${T(se)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${F(d)} kWh bought from grid)</td>
              <td style="text-align: right;">${m(e.network_variable_rate,4)} ${I}/kWh</td>
              <td style="text-align: right;">${T(ge)}</td>
            </tr>
            <tr class="${D>0?"exceedance-row":""}">
              <td>Exceedance charge (${F(D)} kWh above the reference power level)</td>
              <td style="text-align: right;">${m(e.exceedance_rate,4)} ${I}/kWh</td>
              <td style="text-align: right;">${T(U)}</td>
            </tr>

            ${N.filter(w=>w.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${N.filter(w=>w.fee>0).map(w=>`
            <tr>
              <td>${w.label||"…"+w.meter_id.slice(-8)} <span class="muted">(${G})</span></td>
              <td style="text-align: right;">${m(w.fee,2)} ${I}/mo</td>
              <td style="text-align: right;">${T(w.fee*R)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${m(e.compensation_fund_rate,4)} ${I}/kWh</td>
              <td style="text-align: right;">${T(ve)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${m(e.electricity_tax_rate,4)} ${I}/kWh</td>
              <td style="text-align: right;">${T(be)}</td>
            </tr>
            ${Ce>0||ye>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            ${Ce>0?`
            <tr>
              <td>Domiciliation Discount <span class="muted">(${G})</span></td>
              <td style="text-align: right;">-${m(Math.max(0,e.domiciliation_discount??0),2)} ${I}/mo</td>
              <td style="text-align: right;">-${T(Ce)}</td>
            </tr>
            `:""}
            ${ye>0?`
            <tr>
              <td>Electronic Invoice Discount <span class="muted">(${G})</span></td>
              <td style="text-align: right;">-${m(Math.max(0,e.connect_discount??0),2)} ${I}/mo</td>
              <td style="text-align: right;">-${T(ye)}</td>
            </tr>
            `:""}
            `:""}

            ${Ns?`
            <tr class="section-label"><td colspan="3">Government Aid &amp; Billing Adjustments</td></tr>
            ${Hs}
            <tr class="subtotal-row">
              <td colspan="2">Subtotal before adjustments (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(Ye)}</strong></td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(ze)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${m(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(Xe)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Supplier Bill Estimate</strong></td>
              <td style="text-align: right;"><strong>${T($e)}</strong></td>
            </tr>
            ${Ke?`
            <tr class="subtotal-row">
              <td colspan="2">Total before billing adjustments (incl. VAT)</td>
              <td style="text-align: right;">${T(zt)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2">Total after billing adjustments (incl. VAT)</td>
              <td style="text-align: right;">${T($e)}${qe?' <span class="muted">(estimated)</span>':""}</td>
            </tr>
            `:""}

            ${n>0?`
            <tr class="section-label revenue-section"><td colspan="3">Solar Value & Feed-in Revenue</td></tr>
            <tr class="revenue-row">
              <td>Solar produced</td>
              <td style="text-align: right;">Total generation during this period</td>
              <td style="text-align: right;">${F(n)} kWh</td>
            </tr>
            <tr class="revenue-row">
              <td>Own solar used at home</td>
              <td style="text-align: right;">${F(L)} kWh from your own production avoided grid purchases</td>
              <td style="text-align: right;">${T(ne)} saved</td>
            </tr>
            ${$>0?`
            <tr class="revenue-row">
              <td>Additional solar received</td>
              <td style="text-align: right;">${F($)} kWh covered at home from shared/community solar</td>
              <td style="text-align: right;">Informational</td>
            </tr>
            `:""}
            <tr class="revenue-row">
              <td>Export sold</td>
              <td style="text-align: right;">${F(r)} kWh sent to grid</td>
              <td style="text-align: right;">${T(ee)} earned</td>
            </tr>
            ${Ze?`
            <tr class="revenue-row">
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${F(Re)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${T(Ae)} saved</td>
            </tr>
            `:""}
            ${r>0?`
            <tr class="section-label"><td colspan="3">Credit Calculation</td></tr>
            ${Ee.map(w=>`
            <tr class="revenue-row">
              <td>Exported (${Z?w.displayName:F(w.exportedKwh)+" kWh"})</td>
              <td style="text-align: right;">${Z?`${w.shortId}<br/>`:""}${F(w.exportedKwh)} kWh<br/>${w.label}<br/>${m(w.rate,4)} ${I}/kWh${C&&Z?`<br/>Self-use priority ${w.selfUsePriority}`:""}</td>
              <td class="revenue-amount" style="text-align: right;">-${T(w.revenue)}</td>
            </tr>
            `).join("")}
            ${Z?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${F(r)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${m(xe,4)} ${I}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${T(ee)}</td>
            </tr>
            `:""}
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total Solar Value</strong></td>
              <td style="text-align: right;"><strong>${T(Je)}</strong></td>
            </tr>
            <tr class="net-total-row">
              <td colspan="2"><strong>Net Electricity Position</strong></td>
              <td style="text-align: right;"><strong>${T(Qe)}</strong></td>
            </tr>
            `:""}
            ${r<=0?`
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total Solar Value</strong></td>
              <td style="text-align: right;"><strong>${T(Je)}</strong></td>
            </tr>
            `:""}
            `:""}
          </tbody>
        </table>
      </div>

      ${Qs}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Supplier bill estimate: ${T($e)}</strong>${ee>0?` Feed-in revenue is shown separately as ${T(ee)}, giving a net electricity position of ${T(Qe)} after export credit.`:""}
          ${Ke?` Government aid and billing adjustments reduce this estimate by ${T(Q.electricity.applied_gross)} incl. VAT (total before adjustments: ${T(zt)}).${qe?" Some adjustment values are estimated from incomplete interval data.":""}`:""}
          <br/>
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${F(d)} kWh), not total home usage.
          Supplier pricing: ${Zs}.
          Fixed monthly charges are prorated across the viewed period (${P} days, ${G}, equivalent to ${m(R,2)} monthly charges).
          Peak load (${m(E,1)} kW) is compared against ${u?"your configured reference power windows":`your reference power level (${m(g,1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${m(e.exceedance_rate,4)} ${I}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${S?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${$t}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${F(k)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${wt(x)} m³</span>
        </div>
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Component</th>
              <th style="text-align: right;">Rate / Detail</th>
              <th style="text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr class="section-label"><td colspan="3">Gas Supplier</td></tr>
            <tr>
              <td>Fixed Fee <span class="muted">(${G})</span></td>
              <td style="text-align: right;">${m(e.gas_fixed_fee??6.5,2)} ${I}/mo</td>
              <td style="text-align: right;">${T(Ht)}</td>
            </tr>
            <tr>
              <td>Energy (${F(k)} kWh)</td>
              <td style="text-align: right;">${m(e.gas_variable_rate??.055,4)} ${I}/kWh</td>
              <td style="text-align: right;">${T(jt)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${G})</span></td>
              <td style="text-align: right;">${m(e.gas_network_fee??4.8,2)} ${I}/mo</td>
              <td style="text-align: right;">${T(Nt)}</td>
            </tr>
            <tr>
              <td>Network Variable (${F(k)} kWh)</td>
              <td style="text-align: right;">${m(e.gas_network_variable_rate??.012,4)} ${I}/kWh</td>
              <td style="text-align: right;">${T(Gt)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${F(k)} kWh)</td>
              <td style="text-align: right;">${m(e.gas_tax_rate??.001,4)} ${I}/kWh</td>
              <td style="text-align: right;">${T(Ot)}</td>
            </tr>

            ${Gs?`
            <tr class="section-label"><td colspan="3">Government Aid &amp; Billing Adjustments</td></tr>
            ${js}
            <tr class="subtotal-row">
              <td colspan="2">Subtotal before adjustments (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(Bt)}</strong></td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(vt)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${m((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${T(qt)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${T(yt)}</strong></td>
            </tr>
            ${Be?`
            <tr class="subtotal-row">
              <td colspan="2">Gas total before billing adjustments (incl. VAT)</td>
              <td style="text-align: right;">${T(Bt*(1+(e.gas_vat_rate??.08)))}</td>
            </tr>
            `:""}
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Net Energy Position: ${T(Qe+yt)}</strong>
          (Electricity net position: ${T(Qe)} + Gas supplier estimate: ${T(yt)})
        </p>
      </div>
      `:""}

      ${n>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Value &mdash; ${$t}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${T(Je)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${F(n)} kWh</div>
            <div class="solar-stat-label">Solar produced</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${T(ne)}</div>
            <div class="solar-stat-label">Saved by using ${F(L)} kWh of your own solar at home</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${ft(At)}</div>
            <div class="solar-stat-label">Extra value from using it yourself instead of selling it</div>
          </div>
          ${Ze?`
          <div class="solar-stat">
            <div class="solar-stat-value">${T(Ae)}</div>
            <div class="solar-stat-label">Saved by staying under the reference power</div>
          </div>
          `:""}
          <div class="solar-stat">
            <div class="solar-stat-value">${T(ee)}</div>
            <div class="solar-stat-label">Earned by selling ${F(r)} kWh</div>
          </div>
        </div>

        <table class="invoice-table solar-table">
          <thead>
            <tr>
              <th>Component</th>
              <th style="text-align: right;">Detail</th>
              <th style="text-align: right;">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr class="section-label"><td colspan="3">Production Overview</td></tr>
            <tr>
              <td>Solar produced</td>
              <td style="text-align: right;">Total generation during this period</td>
              <td style="text-align: right;">${F(n)} kWh</td>
            </tr>
            <tr>
              <td>Own solar used at home</td>
              <td style="text-align: right;">${F(L)} kWh from your own production avoided grid purchases</td>
              <td style="text-align: right;">${T(ne)} saved</td>
            </tr>
            ${$>0?`
            <tr>
              <td>Additional solar received</td>
              <td style="text-align: right;">${F($)} kWh covered at home from shared/community solar</td>
              <td style="text-align: right;">Informational</td>
            </tr>
            `:""}
            <tr>
              <td>Extra vs exporting instead</td>
              <td style="text-align: right;">${Us}</td>
              <td style="text-align: right;">${ft(At)}</td>
            </tr>
            <tr>
              <td>Export sold</td>
              <td style="text-align: right;">${F(r)} kWh sent to grid</td>
              <td style="text-align: right;">${T(ee)} earned</td>
            </tr>
            ${Ze?`
            <tr>
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${F(Re)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${T(Ae)} saved</td>
            </tr>
            `:""}

            ${Os}

            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${F(L)} kWh)</td>
              <td style="text-align: right;">${m(e.energy_variable_rate,4)} ${I}/kWh</td>
              <td style="text-align: right;">${T(L*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${m(e.network_variable_rate,4)} ${I}/kWh</td>
              <td style="text-align: right;">${T(L*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${m(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${I}/kWh</td>
              <td style="text-align: right;">${T(L*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${m(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(ae)}</td>
            </tr>
            ${re>1e-4?`
            <tr>
              <td>Government aid not received on own solar${Q.electricity.estimated?' <span class="muted">(estimated)</span>':""}</td>
              <td style="text-align: right;">Self-consumed kWh during the aid period avoid subsidised grid imports</td>
              <td class="revenue-amount" style="text-align: right;">−${T(re)}</td>
            </tr>
            `:""}
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${T(ne)}</strong></td>
            </tr>

            ${Ze?`
            <tr class="section-label"><td colspan="3">Reference Power Savings</td></tr>
            <tr>
              <td>Exceedance avoided</td>
              <td style="text-align: right;">${F(Re)} kWh above the reference power level</td>
              <td style="text-align: right;">${T(ht)}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${m(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(Vt)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Reference Power Savings</strong></td>
              <td style="text-align: right;"><strong>${T(Ae)}</strong></td>
            </tr>
            `:""}

            ${r>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${Ee.map(w=>`
            <tr>
              <td>Sold to grid ${Z?`(${w.displayName})`:`(${F(w.exportedKwh)} kWh)`}</td>
              <td style="text-align: right;">${Z?`${w.shortId}<br/>`:""}${F(w.exportedKwh)} kWh<br/>${w.label}<br/>${m(w.rate,4)} ${I}/kWh${C&&Z?`<br/>Self-use priority ${w.selfUsePriority}`:""}</td>
              <td style="text-align: right;">${T(w.revenue)}</td>
            </tr>
            `).join("")}
            ${Z?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${T(ee)}</strong></td>
            </tr>
            `:""}
            `:""}

            <tr class="total-row solar-total-row">
              <td colspan="2"><strong>💰 Total Solar Panel Value</strong></td>
              <td style="text-align: right;"><strong>${T(Je)}</strong></td>
            </tr>
          </tbody>
        </table>

        <p class="muted" style="margin-top: var(--sp-3); font-size: var(--text-xs); line-height: var(--lh-relaxed);">
          Self-consumption savings = energy you produced and used yourself instead of buying from the grid.
          Extra vs exporting instead = how much more or less those self-consumed kWh were worth compared with selling them at the feed-in rate.
          These savings are informational here and already reflected in the main invoice because only grid-imported energy is billed.
          Reference-power savings = exceedance charges avoided because solar reduced the net load seen against your reference power during the same 15-minute interval.
          Feed-in revenue = money earned by selling surplus production.
          Per-system tracked value combines each PV system's self-consumption savings and export revenue; reference-power savings stay separate because they are a whole-home grid-load effect.
          ${ue.some(w=>w.mode==="sensor")?"Market price sourced from Home Assistant sensor.":"Using fixed feed-in tariff — configure a market price sensor in Settings for real-time rates."}
          ${C?"Per-system self-consumption and export are allocated from each PV system's 15-minute production using the configured self-use priority (1 = consumed first at home).":Z?"Displayed per-meter feed-in kWh are currently equal-split estimates because per-meter production data was not available for this view.":""}
        </p>
      </div>
      `:""}
    </section>
  `}const yr=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],fr=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Reference Power Fixed Charge",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"domiciliation_discount",label:"Domiciliation Discount",step:"0.01",unit:"EUR/mo",type:"number"},{key:"connect_discount",label:"Electronic Invoice Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"Government Aid & Billing Adjustments",icon:"🏛️",fields:[]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],wr=["consumption","production","solar_consumption","export","export_consumption","gas"],Fs={consumption:"Consumption",production:"Solar production",solar_consumption:"Solar production (consumption-metered)",export:"Grid export",export_consumption:"Grid export (consumption-metered)",gas:"Gas"},Ps={consumption:"⚡",production:"☀️",solar_consumption:"☀️",export:"",export_consumption:"",gas:"🔥"},br={consumption:"House/grid import meter",production:"PV generation, including energy that may be self-consumed",solar_consumption:"Solar production measured as consumption",export:"Export-only meter for energy sold/sent to the grid",export_consumption:"Grid export measured on the consumption register (active consumption OBIS)",gas:"Gas consumption meter"};function _r(t){return t.map(e=>{const s=Ps[e],a=Fs[e]??e;return`<span class="meter-type-badge meter-type-${e}">${s?`${s} `:""}${a}</span>`}).join(" ")}function $r(t,e,s){return`
          <label class="meter-type-cb">
            <input type="checkbox" name="meter_${t}_${e}" ${s.types.includes(e)?"checked":""} />
            <span class="meter-type-copy">
              <strong>${Fs[e]??e}</strong>
              <small>${br[e]??""}</small>
            </span>
          </label>
  `}function ms(t,e,s){const a=t+1;return s?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${a}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${_r(e.types)}</div>
      </div>
    `:`
    <div class="meter-card">
      <div class="meter-header">
        <strong>Meter ${a}</strong>
        ${a>1?`<button type="button" class="btn-icon remove-meter-btn" data-meter="${t}" title="Remove meter">&times;</button>`:""}
      </div>
      <div class="form-row">
        <label for="meter-id-${t}">Metering Point ID</label>
        <div class="input-group">
          <input
            id="meter-id-${t}"
            name="meter_${t}_id"
            type="text"
            value="${e.id??""}"
            placeholder="e.g. LUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          />
        </div>
      </div>
      <div class="form-row">
        <label>This meter measures</label>
        <div class="meter-type-checkboxes">
          ${wr.map(n=>$r(t,n,e)).join("")}
        </div>
      </div>
    </div>
  `}function Ks(t){return yr.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function xr(t,e){return`
    <div class="meter-card">
      <div class="meter-header">
        <strong>Tariff Window ${t+1}</strong>
        <button type="button" class="btn-icon remove-consumption-window-btn" data-window="${t}" title="Remove tariff window">&times;</button>
      </div>
      <div class="form-row">
        <label for="consumption-window-${t}-label">Label</label>
        <div class="input-group">
          <input id="consumption-window-${t}-label" name="consumption_window_${t}_label" type="text" value="${e.label??""}" placeholder="e.g. Night / Drive / Weekend" />
        </div>
      </div>
      <div class="form-row">
        <label for="consumption-window-${t}-day-group">Active days</label>
        <div class="input-group">
          <select id="consumption-window-${t}-day-group" name="consumption_window_${t}_day_group">
            ${Ks(e.day_group??"all")}
          </select>
        </div>
      </div>
      <div class="form-row">
        <label>Time window</label>
        <div class="input-group schedule-window-inputs">
          <input name="consumption_window_${t}_start_time" type="time" value="${e.start_time??"00:00"}" />
          <span class="input-unit">to</span>
          <input name="consumption_window_${t}_end_time" type="time" value="${e.end_time??"06:00"}" />
        </div>
      </div>
      <div class="form-row">
        <label for="consumption-window-${t}-rate">Supplier rate</label>
        <div class="input-group">
          <input id="consumption-window-${t}-rate" name="consumption_window_${t}_rate" type="number" step="0.0001" value="${e.rate??0}" />
          <span class="input-unit">EUR/kWh</span>
        </div>
      </div>
    </div>
  `}function kr(t,e){return`
    <div class="meter-card">
      <div class="meter-header">
        <strong>Reference Window ${t+1}</strong>
        <button type="button" class="btn-icon remove-reference-window-btn" data-window="${t}" title="Remove reference window">&times;</button>
      </div>
      <div class="form-row">
        <label for="reference-window-${t}-label">Label</label>
        <div class="input-group">
          <input id="reference-window-${t}-label" name="reference_window_${t}_label" type="text" value="${e.label??""}" placeholder="e.g. Evening / Charging hours" />
        </div>
      </div>
      <div class="form-row">
        <label for="reference-window-${t}-day-group">Active days</label>
        <div class="input-group">
          <select id="reference-window-${t}-day-group" name="reference_window_${t}_day_group">
            ${Ks(e.day_group??"all")}
          </select>
        </div>
      </div>
      <div class="form-row">
        <label>Time window</label>
        <div class="input-group schedule-window-inputs">
          <input name="reference_window_${t}_start_time" type="time" value="${e.start_time??"17:00"}" />
          <span class="input-unit">to</span>
          <input name="reference_window_${t}_end_time" type="time" value="${e.end_time??"00:00"}" />
        </div>
      </div>
      <div class="form-row">
        <label for="reference-window-${t}-power">Reference power</label>
        <div class="input-group">
          <input id="reference-window-${t}-power" name="reference_window_${t}_reference_power_kw" type="number" step="0.1" value="${e.reference_power_kw??5}" />
          <span class="input-unit">kW</span>
        </div>
      </div>
    </div>
  `}function Sr(t,e){const s=!!e.preset_id,n=e.preset_id===Cs&&e.enabled&&!e.tariff_already_includes_adjustment;return`
    <div class="meter-card">
      <div class="meter-header">
        <strong>${e.label||`Adjustment ${t+1}`}</strong>
        ${s?'<span class="meter-type-badge meter-type-production">Official preset</span>':""}
        <button type="button" class="btn-icon remove-adjustment-btn" data-adjustment="${t}" title="Remove adjustment">&times;</button>
      </div>
      <input type="hidden" name="adjustment_${t}_id" value="${e.id}" />
      <input type="hidden" name="adjustment_${t}_preset_id" value="${e.preset_id??""}" />
      ${n?`
      <div class="settings-note settings-note-warning">
        ⚠️ Only enable this if your configured electricity price does <strong>not</strong> already include the government subsidy.
      </div>
      `:""}
      <div class="form-row">
        <label class="meter-type-cb">
          <input type="checkbox" name="adjustment_${t}_enabled" ${e.enabled?"checked":""} />
          <span class="meter-type-copy"><strong>Enabled</strong><small>Apply this adjustment on invoices inside its date range</small></span>
        </label>
      </div>
      <div class="form-row">
        <label for="adjustment-${t}-label">Label</label>
        <div class="input-group">
          <input id="adjustment-${t}-label" name="adjustment_${t}_label" type="text" value="${e.label??""}" placeholder="e.g. Luxembourg electricity subsidy 2026" />
        </div>
      </div>
      <div class="form-row">
        <label for="adjustment-${t}-commodity">Commodity</label>
        <div class="input-group">
          <select id="adjustment-${t}-commodity" name="adjustment_${t}_commodity">
            <option value="electricity" ${e.commodity==="electricity"?"selected":""}>Electricity</option>
            <option value="gas" ${e.commodity==="gas"?"selected":""}>Gas</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <label for="adjustment-${t}-basis">Calculation basis</label>
        <div class="input-group">
          <select id="adjustment-${t}-basis" name="adjustment_${t}_basis">
            <option value="grid_import_kwh" ${e.basis==="grid_import_kwh"?"selected":""}>Grid import (kWh)</option>
            <option value="gas_volume_m3" ${e.basis==="gas_volume_m3"?"selected":""}>Gas volume (m³)</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <label for="adjustment-${t}-amount">Amount per unit</label>
        <div class="input-group">
          <input id="adjustment-${t}-amount" name="adjustment_${t}_amount_gross" type="number" step="0.0001" min="0" value="${e.amount_gross??0}" />
          <span class="input-unit">EUR/${e.basis==="gas_volume_m3"?"m³":"kWh"}</span>
        </div>
      </div>
      <div class="form-row">
        <label>Valid period (inclusive)</label>
        <div class="input-group schedule-window-inputs">
          <input name="adjustment_${t}_start_date" type="date" value="${e.start_date??""}" />
          <span class="input-unit">to</span>
          <input name="adjustment_${t}_end_date" type="date" value="${e.end_date??""}" />
        </div>
      </div>
      <div class="form-row">
        <label class="meter-type-cb">
          <input type="checkbox" name="adjustment_${t}_vat_included" ${e.vat_included?"checked":""} />
          <span class="meter-type-copy"><strong>Amount includes VAT</strong><small>Official subsidy rates are published including VAT</small></span>
        </label>
      </div>
      <div class="form-row">
        <label class="meter-type-cb">
          <input type="checkbox" name="adjustment_${t}_tariff_already_includes_adjustment" ${e.tariff_already_includes_adjustment?"checked":""} />
          <span class="meter-type-copy"><strong>My entered tariff already includes this adjustment</strong><small>Prevents double-counting; the adjustment is shown for information only</small></span>
        </label>
      </div>
      <div class="form-row">
        <label for="adjustment-${t}-note">Eligibility note</label>
        <div class="input-group">
          <input id="adjustment-${t}-note" name="adjustment_${t}_eligibility_note" type="text" value="${e.eligibility_note??""}" placeholder="e.g. Residential customers below 25,000 kWh/year" />
        </div>
      </div>
    </div>
  `}function Mr(t,e="ha",s){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const a=e==="standalone"?(s==null?void 0:s.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let n="";if(e==="standalone"){const l=a.map((E,D)=>ms(D,E,!1)).join("");s==null||s.proxy_url,n=`
      <div class="section-header">
        <h2>API Connection</h2>
        <span class="muted">Configure your Leneda API credentials and metering points</span>
      </div>
      <div class="card" style="margin-bottom: var(--sp-6);">
        <form id="credentials-form">
          
          <div class="form-section">
            <div class="form-section-title">🔑  Leneda API Credentials</div>
            <div class="form-row">
              <label for="cfg-api_key">API Key</label>
              <div class="input-group">
                <input
                  id="cfg-api_key"
                  name="api_key"
                  type="password"
                  value="${(s==null?void 0:s.api_key)??""}"
                  placeholder="Enter your Leneda API key"
                />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-energy_id">Energy ID</label>
              <div class="input-group">
                <input
                  id="cfg-energy_id"
                  name="energy_id"
                  type="text"
                  value="${(s==null?void 0:s.energy_id)??""}"
                  placeholder="e.g. LU-123-456-789"
                />
              </div>
            </div>
            
          </div>

          <div class="form-section">
            <div class="form-section-title">📊  Metering Points</div>
            <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
              Select what each meter reports. Use Solar production for PV generation, and Grid export only when the meter reports energy sold or sent to the grid.
            </p>
            <div id="meters-container">
              ${l}
            </div>
            ${a.length<10?`
            <button type="button" id="add-meter-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
              + Add Metering Point
            </button>
            `:""}
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save Credentials</button>
            <button type="button" id="test-creds-btn" class="btn btn-outline">Test Connection</button>
          </div>
          <div id="creds-status"></div>
        </form>
      </div>
    `}else{const l=(t==null?void 0:t.meters)??[];n=`
      <div class="card" style="margin-bottom: var(--sp-6); padding: var(--sp-4) var(--sp-5);">
        <p class="muted" style="margin: 0 0 var(--sp-3) 0;">🔒 API credentials are managed through Home Assistant &rarr; Settings &rarr; Integrations &rarr; Leneda</p>
        <div class="form-section">
          <div class="form-section-title">📊  Configured Metering Points</div>
          <div id="meters-container">
            ${l.length>0?l.map((E,D)=>ms(D,E,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const o=l=>l.map(u=>{const E=t?t[u.key]??"":"";return`
        <div class="form-row">
          <label for="cfg-${u.key}">${u.label}</label>
          <div class="input-group">
            <input
              id="cfg-${u.key}"
              name="${u.key}"
              type="${u.type}"
              ${u.type==="number"?`step="${u.step}"`:""}
              value="${E}"
            />
            ${u.unit?`<span class="input-unit">${u.unit}</span>`:""}
          </div>
        </div>
      `}).join(""),r=((t==null?void 0:t.meters)??[]).filter(l=>l.types.includes("production")||l.types.includes("solar_consumption")),i=(t==null?void 0:t.feed_in_rates)??[],p=e==="ha";function y(l){return i.find(u=>u.meter_id===l)??{meter_id:l,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:"",display_name:"",self_use_priority:r.findIndex(u=>u.id===l)+1}}const f=r.length===0?'<p class="muted">No solar production meters configured — add a meter with Solar production above.</p>':r.map((l,u)=>{const E=y(l.id),D=l.id?"…"+l.id.slice(-8):`Meter ${u+1}`,K=it(l.id,u+1,E.display_name);return`
          <div class="feed-in-meter-card" data-meter-idx="${u}" data-meter-id="${l.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${K}</span>
              <code style="font-size: var(--text-sm);">${D}</code>
              <input type="hidden" name="feed_in_rate_${u}_meter_id" value="${l.id}" />
            </div>
            <div class="form-row">
              <label for="cfg-feed_in_rate_${u}_display_name">System Name</label>
              <div class="input-group">
                <input
                  id="cfg-feed_in_rate_${u}_display_name"
                  name="feed_in_rate_${u}_display_name"
                  type="text"
                  value="${E.display_name??""}"
                  placeholder="${it(l.id,u+1)}"
                />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-feed_in_rate_${u}_priority">Self-use Priority</label>
              <div class="input-group">
                <input
                  id="cfg-feed_in_rate_${u}_priority"
                  name="feed_in_rate_${u}_self_use_priority"
                  type="number"
                  min="1"
                  step="1"
                  value="${E.self_use_priority??u+1}"
                />
                <span class="input-unit">1 = used first at home</span>
              </div>
              <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                Leave blank to use ${it(l.id,u+1)}.
              </p>
            </div>
            <div class="form-row">
              <label>Pricing Mode</label>
              <div class="feed-in-mode-toggle">
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${u}_mode" value="fixed" ${E.mode==="fixed"?"checked":""} />
                  <span class="mode-label">💶 Fixed Tariff</span>
                </label>
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${u}_mode" value="sensor" ${E.mode==="sensor"?"checked":""} />
                  <span class="mode-label">📡 HA Sensor</span>
                </label>
              </div>
            </div>
            <div class="feed-in-fixed-fields" data-rate-idx="${u}" style="${E.mode==="fixed"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${u}_tariff">Feed-in Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${u}_tariff" name="feed_in_rate_${u}_tariff" type="number" step="0.0001" value="${E.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
              </div>
            </div>
            <div class="feed-in-sensor-fields" data-rate-idx="${u}" style="${E.mode==="sensor"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${u}_sensor">Market Price Sensor</label>
                <div class="input-group sensor-picker-group">
                  <input
                    id="cfg-feed_in_rate_${u}_sensor"
                    name="feed_in_rate_${u}_sensor_entity"
                    type="text"
                    value="${E.sensor_entity}"
                    placeholder="${p?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${p&&u===0?'<datalist id="ha-entity-list"></datalist>':""}
              </div>
              <div class="form-row">
                <label for="cfg-feed_in_rate_${u}_fallback">Fallback Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${u}_fallback" name="feed_in_rate_${u}_fallback_tariff" type="number" step="0.0001" value="${E.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
                <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                  Used when the sensor is unavailable.
                </p>
              </div>
            </div>
          </div>
        `}).join(""),b=((t==null?void 0:t.meters)??[]).some(l=>l.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),$=(t==null?void 0:t.consumption_rate_windows)??[],d=(t==null?void 0:t.reference_power_windows)??[],h=(t==null?void 0:t.meters)??[],g=(t==null?void 0:t.meter_monthly_fees)??[];function _(l){return g.find(u=>u.meter_id===l)??{meter_id:l,label:"",fee:0}}const k=h.length===0?'<p class="muted">No meters configured.</p>':h.map((l,u)=>{const E=_(l.id),D=l.id?"…"+l.id.slice(-8):`Meter ${u+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${l.types.map(V=>Ps[V]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${D}</code>
              <input type="hidden" name="meter_fee_${u}_meter_id" value="${l.id}" />
            </div>
            <div class="form-row" style="margin-bottom: var(--sp-2);">
              <label for="cfg-meter_fee_${u}_label">Label</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${u}_label" name="meter_fee_${u}_label" type="text" value="${E.label||`Meter ${u+1} metering fee`}" placeholder="e.g. Smart meter rental" />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-meter_fee_${u}_fee">Monthly Fee</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${u}_fee" name="meter_fee_${u}_fee" type="number" step="0.01" value="${E.fee}" />
                <span class="input-unit">EUR/mo</span>
              </div>
            </div>
          </div>
        `}).join(""),x=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional supplier-rate windows. Outside these windows, the base <strong>Energy Supplier → Variable Rate</strong> is used.
      Windows can cross midnight by setting an end time earlier than the start time.
    </p>
    <div id="consumption-windows-container">
      ${$.length>0?$.map((l,u)=>xr(u,l)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,S=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${d.length>0?d.map((l,u)=>kr(u,l)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,M=Ds(t==null?void 0:t.billing_adjustments),c=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Dated per-unit subsidies, rebates, supplier credits or temporary taxes. Amounts are deducted as separate invoice
      lines &mdash; your tariff prices are never modified. Date ranges are inclusive (Europe/Luxembourg).
      Overlapping adjustments stack. If your configured tariff already includes an adjustment, tick
      <strong>My entered tariff already includes this adjustment</strong> to avoid double-counting.
    </p>
    <div id="adjustments-container">
      ${M.length>0?M.map((l,u)=>Sr(u,l)).join(""):'<p class="muted">No billing adjustments configured.</p>'}
    </div>
    <div style="display: flex; gap: var(--sp-3); flex-wrap: wrap; margin-top: var(--sp-3);">
      <button type="button" id="add-adjustment-btn" class="btn btn-outline">
        + Add Custom Adjustment
      </button>
      <button type="button" id="restore-adjustment-presets-btn" class="btn btn-outline">
        Restore Official Presets
      </button>
    </div>
  `,v=fr.map(l=>{if(l.title==="Gas Billing"&&!b||l.title==="Meter Fees"&&h.length<2)return"";let u;return l.title==="Feed-in / Selling"?u=f:l.title==="Time-of-Use Tariffs"?u=x:l.title==="Reference Power Windows"?u=S:l.title==="Government Aid & Billing Adjustments"?u=c:l.title==="Discounts"?u=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as monthly credits. The dashboard prorates them to the selected period and subtracts them before VAT.
      </p>`+o(l.fields):l.title==="Meter Fees"?u=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+k:u=o(l.fields),`
    <div class="form-section">
      <div class="form-section-title">${l.icon}  ${l.title}</div>
      ${u}
    </div>
  `}).join("");return`
    <section class="settings-view">
      ${n}

      <div class="section-header">
        <h2>Billing Configuration</h2>
        <span class="muted">Luxembourg energy billing rates &mdash; adjust values to match your contract</span>
      </div>

      <div class="card">
        <form id="settings-form">
          ${t?v:'<p class="muted">Loading configuration…</p>'}
          ${t?`
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save Configuration</button>
            <button type="button" id="reset-config-btn" class="btn btn-outline">Reset to Defaults</button>
          </div>
          `:""}
        </form>
      </div>
    </section>
  `}function St(t,e,s=!1,a="dark",n=""){const o=d=>`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${d}
    </svg>
  `,r=o(`
    <path d="M4 19V5" />
    <path d="M4 19H20" />
    <path d="M7 15L11 11L14 13L19 8" />
    <circle cx="7" cy="15" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="11" cy="11" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="14" cy="13" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="19" cy="8" r="1.25" fill="currentColor" stroke="none" />
  `),i=o(`
    <path d="M3 11.5L12 4L21 11.5" />
    <path d="M5.5 10.5V20H18.5V10.5" />
    <path d="M9.5 20V14H14.5V20" />
  `),p=o(`
    <path d="M4 19H20" />
    <path d="M7 19V11" />
    <path d="M12 19V7" />
    <path d="M17 19V4" />
  `),y=o(`
    <path d="M7 4H17V20L15 18.5L13 20L11 18.5L9 20L7 18.5L5 20V6A2 2 0 0 1 7 4Z" />
    <path d="M9 9H15" />
    <path d="M9 13H15" />
  `),f=o(`
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3V6" />
    <path d="M12 18V21" />
    <path d="M3 12H6" />
    <path d="M18 12H21" />
    <path d="M5.64 5.64L7.76 7.76" />
    <path d="M16.24 16.24L18.36 18.36" />
    <path d="M16.24 7.76L18.36 5.64" />
    <path d="M5.64 18.36L7.76 16.24" />
  `),b=o(a==="dark"?`
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2V4.5" />
        <path d="M12 19.5V22" />
        <path d="M2 12H4.5" />
        <path d="M19.5 12H22" />
        <path d="M4.93 4.93L6.7 6.7" />
        <path d="M17.3 17.3L19.07 19.07" />
        <path d="M17.3 6.7L19.07 4.93" />
        <path d="M4.93 19.07L6.7 17.3" />
      `:`
        <path d="M20 14.5A7.5 7.5 0 0 1 9.5 4A8.5 8.5 0 1 0 20 14.5Z" />
      `),$=[{id:"charts",label:"Charts",icon:r},{id:"dashboard",label:"Dashboard",icon:i},{id:"sensors",label:"Sensors",icon:p},{id:"invoice",label:"Invoice",icon:y},{id:"settings",label:"Settings",icon:f}];return`
    <header class="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-brand">
        <img src="/leneda-panel/static/logo.png" srcset="/leneda-panel/static/logo@2x.png 2x" alt="Leneda Logo" class="navbar-logo-img" />
        ${n?`<span class="navbar-badge">${n}</span>`:""}
 
        <button class="menu-toggle ${s?"open":""}" aria-label="Toggle menu" aria-expanded="${s}">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav class="navbar-tabs ${s?"mobile-open":""}" role="tablist">
        ${$.map(d=>`
          <button
            class="nav-btn ${d.id===t?"active":""}"
            data-tab="${d.id}"
            role="tab"
            aria-selected="${d.id===t}"
            aria-controls="panel-${d.id}"
          >
            <span class="nav-icon" aria-hidden="true">${d.icon}</span>
            <span class="nav-label">${d.label}</span>
          </button>
        `).join("")}

        <div class="navbar-actions">
            <button
              class="theme-toggle"
              type="button"
              data-theme-toggle
              title="Switch to ${a==="dark"?"light":"dark"} mode"
              aria-label="Switch to ${a==="dark"?"light":"dark"} mode"
            >
              <span class="theme-toggle-icon" aria-hidden="true">${b}</span>
              <span class="theme-toggle-label">${a==="dark"?"Light":"Dark"} mode</span>
            </button>

            <a href="https://buymeacoffee.com/koosoli" target="_blank" rel="noopener noreferrer" 
               class="navbar-cta"
            >
              <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="currentColor"><path d="M20,3H4v10c0,2.21,1.79,4,4,4h6c2.21,0,4-1.79,4-4v-3h2c1.1,0,2-0.9,2-2V5C22,3.9,21.1,3,20,3z M20,8h-2V5h2V8z M18,15H4v-1h14V15z M18,12H4V5h14V12z"/></svg>
              <span>Support Project</span>
            </a>

            <a href="https://github.com/koosoli/Leneda-HACS-integration" target="_blank" rel="noopener noreferrer"
               class="navbar-icon-link"
               title="View Project on GitHub">
              <svg style="width: 18px; height: 18px;" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
        </div>
      </nav>
    </header>
  `}const Is="leneda_credentials",Rs="leneda_theme";function Cr(){try{const t=localStorage.getItem(Is);if(t)return JSON.parse(t)}catch{}return null}function Mt(t){try{localStorage.setItem(Is,JSON.stringify(t))}catch{}}function Tr(){var t;try{const e=localStorage.getItem(Rs);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function Er(t){try{localStorage.setItem(Rs,t)}catch{}}function hs(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const[,s,a,n]=e;return new Date(Number(s),Number(a)-1,Number(n))}function gs(t){const e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${e}-${s}-${a}`}function He(t){const e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0"),n=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),r=String(t.getSeconds()).padStart(2,"0"),i=String(t.getMilliseconds()).padStart(3,"0"),p=-t.getTimezoneOffset(),y=p>=0?"+":"-",f=String(Math.floor(Math.abs(p)/60)).padStart(2,"0"),b=String(Math.abs(p)%60).padStart(2,"0");return`${e}-${s}-${a}T${n}:${o}:${r}.${i}${y}${f}:${b}`}function vs(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Dr(t,e=new Date){switch(t){case"yesterday":{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const a=new Date(s);return a.setHours(23,59,59,999),{start:s,end:a}}case"this_week":{const s=new Date(e),a=s.getDay()||7;return s.setDate(s.getDate()-a+1),s.setHours(0,0,0,0),{start:s,end:e}}case"last_week":{const s=new Date(e),a=s.getDay()||7,n=new Date(s);n.setDate(s.getDate()-a),n.setHours(23,59,59,999);const o=new Date(n);return o.setDate(n.getDate()-6),o.setHours(0,0,0,0),{start:o,end:n}}case"this_month":return{start:new Date(e.getFullYear(),e.getMonth(),1),end:e};case"last_month":{const s=new Date(e.getFullYear(),e.getMonth()-1,1),a=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s,end:a}}case"this_year":return{start:new Date(e.getFullYear(),0,1),end:e};case"last_year":{const s=new Date(e.getFullYear()-1,0,1),a=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s,end:a}}}}function Lr(t,e,s=new Date){const a=hs(t),n=hs(e);if(!a||!n)return null;const o=["yesterday","this_week","last_week","this_month","last_month","this_year","last_year"];for(const r of o){const i=Dr(r,s);if(vs(a,i.start)&&vs(n,i.end))return r}return null}class Wr{constructor(e){De(this,"root");De(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartViewportStart:null,chartViewportEnd:null,chartUnit:"kwh",chartTimeBucket:"quarter_hour",chartConsumptionView:"grid",analysisHeatmapMetric:"grid",analysisProfileMetric:"house",analysisComparisonMode:"previous",analysisComparison:null,analysisComparisonLoading:!1,rangeData:null,consumptionTimeseries:null,productionTimeseries:null,gridImportTimeseries:null,marketExportTimeseries:null,perMeterProductionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:Tr()});De(this,"preZoomRange",null);De(this,"preZoomCustomStart","");De(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await fs();if(this.state.mode=e.mode,e.mode==="standalone"){const s=Cr();if(s&&(this.state.credentials=s),!e.configured&&!s){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&s)try{const{saveCredentials:a}=await pe(async()=>{const{saveCredentials:n}=await Promise.resolve().then(()=>Me);return{saveCredentials:n}},void 0);await a(s)}catch{}if(!s)try{this.state.credentials=await ws()}catch{}}await this.loadData()}toDisplayError(e,s="Failed to load data"){const a=e instanceof Error?e.message:String(e??"").trim(),n=a.toLowerCase();return n.includes("missing data")||n.includes("no_data")||n.includes("no data")?"Missing data":a||s}clearRangeStateWithError(e,s="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.state.gridImportTimeseries=null,this.state.marketExportTimeseries=null,this.state.perMeterProductionTimeseries=null,this.clearChartViewport(),this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1,this.state.error=this.toDisplayError(e,s)}async fetchPerMeterProductionForRange(e,s,a){var o;if(((e==null?void 0:e.meters)??[]).filter(r=>r.types.includes("production")||r.types.includes("solar_consumption")).length<=1)return null;try{const r=await Ct("1-1:2.29.0",s,a);return(o=r.meters)!=null&&o.length?r:null}catch(r){return console.warn("Per-meter production fetch failed:",r),null}}async fetchEnergyFlowTimeseries(e,s){const[a,n,o,r]=await Promise.all([je("1-1:1.29.0",e,s),je("1-1:2.29.0",e,s),je("1-65:1.29.9",e,s),je("1-65:2.29.9",e,s)]);return{consumptionTimeseries:a,productionTimeseries:n,gridImportTimeseries:o,marketExportTimeseries:r}}resetAnalysisComparison(){this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1}clearChartViewport(){this.state.chartViewportStart=null,this.state.chartViewportEnd=null}normalizeChartTimeBucket(){const{start:e,end:s}=this.getDateRangeISO(),a=ma(Et(e,s),this.state.chartTimeBucket);a!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=a)}getCurrentRangeKey(){const{start:e,end:s}=this.getDateRangeISO();return`${e}|${s}`}shiftIsoByYears(e,s){const a=new Date(e);if(!Number.isFinite(a.getTime()))return e;const n=new Date(a);return n.setUTCFullYear(n.getUTCFullYear()+s),n.toISOString()}getComparisonRangeISO(e,s,a){if(a==="last_year")return{start:this.shiftIsoByYears(e,-1),end:this.shiftIsoByYears(s,-1)};const n=new Date(e).getTime(),o=new Date(s).getTime(),r=Math.max(0,o-n),i=n-1,p=i-r;return{start:new Date(p).toISOString(),end:new Date(i).toISOString()}}async loadAnalysisComparison(e=!1){var i;if(!this.state.consumptionTimeseries||!this.state.productionTimeseries)return;const{start:s,end:a}=this.getDateRangeISO(),n=this.state.analysisComparisonMode,o=`${s}|${a}|${n}`;if(!e&&(this.state.analysisComparisonLoading||((i=this.state.analysisComparison)==null?void 0:i.key)===o))return;const r=this.getComparisonRangeISO(s,a,n);this.state.analysisComparisonLoading=!0,this.state.tab==="charts"&&this.renderPreserveMainScroll();try{const{consumptionTimeseries:p,productionTimeseries:y,gridImportTimeseries:f,marketExportTimeseries:b}=await this.fetchEnergyFlowTimeseries(r.start,r.end);if(o!==this.getCurrentRangeKey())return;this.state.analysisComparison={key:o,mode:n,start:r.start,end:r.end,consumptionTimeseries:p,productionTimeseries:y,gridImportTimeseries:f,marketExportTimeseries:b}}catch(p){console.warn("Comparison data fetch failed:",p),o===this.getCurrentRangeKey()&&(this.state.analysisComparison=null)}finally{o===this.getCurrentRangeKey()&&(this.state.analysisComparisonLoading=!1,this.state.tab==="charts"&&this.renderPreserveMainScroll())}}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.clearChartViewport(),this.resetAnalysisComparison(),this.render();try{const[e,s,a]=await Promise.all([ot(this.state.range),Tt(),Ne()]),{start:n,end:o}=this.getDateRangeISO(),[r,i]=await Promise.all([this.fetchEnergyFlowTimeseries(n,o),this.fetchPerMeterProductionForRange(a,n,o)]);this.state.rangeData=e,this.state.consumptionTimeseries=r.consumptionTimeseries,this.state.productionTimeseries=r.productionTimeseries,this.state.gridImportTimeseries=r.gridImportTimeseries,this.state.marketExportTimeseries=r.marketExportTimeseries,this.state.perMeterProductionTimeseries=i,this.state.sensors=s,this.state.config=a}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async changeRange(e){if(this.preZoomRange=null,this.clearChartViewport(),this.state.range=e,this.resetAnalysisComparison(),e==="custom"){if(!this.state.customStart||!this.state.customEnd){const s=new Date;s.setDate(s.getDate()-1);const a=new Date(s);a.setDate(a.getDate()-6),this.state.customStart=gs(a),this.state.customEnd=gs(s)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:s,end:a}=this.getDateRangeISO(),[n,o,r]=await Promise.all([ot(e),this.fetchEnergyFlowTimeseries(s,a),this.fetchPerMeterProductionForRange(this.state.config,s,a)]);this.state.rangeData=n,this.state.consumptionTimeseries=o.consumptionTimeseries,this.state.productionTimeseries=o.productionTimeseries,this.state.gridImportTimeseries=o.gridImportTimeseries,this.state.marketExportTimeseries=o.marketExportTimeseries,this.state.perMeterProductionTimeseries=r}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async applyCustomRange(){this.preZoomRange=null,this.clearChartViewport();const{customStart:e,customEnd:s}=this.state;if(!(!e||!s)){this.state.error=null,this.state.loading=!0,this.resetAnalysisComparison(),this.render();try{const a=Lr(e,s),n=a?ot(a):pe(async()=>{const{fetchCustomData:b}=await Promise.resolve().then(()=>Me);return{fetchCustomData:b}},void 0).then(({fetchCustomData:b})=>b(e,s)),o=this.state.config,r=He(new Date(e+"T00:00:00")),i=He(new Date(s+"T23:59:59.999")),[p,y,f]=await Promise.all([n,this.fetchEnergyFlowTimeseries(r,i),this.fetchPerMeterProductionForRange(o,r,i)]);this.state.rangeData={range:"custom",consumption:p.consumption,production:p.production,exported:p.exported??0,self_consumed:p.self_consumed??0,grid_import:p.grid_import,solar_to_home:p.solar_to_home,direct_solar_to_home:p.direct_solar_to_home,shared:p.shared,shared_with_me:p.shared_with_me,gas_energy:p.gas_energy??0,gas_volume:p.gas_volume??0,peak_power_kw:p.peak_power_kw??0,exceedance_kwh:p.exceedance_kwh??0,metering_point:p.metering_point??"",start:p.start??e,end:p.end??s},this.state.consumptionTimeseries=y.consumptionTimeseries,this.state.productionTimeseries=y.productionTimeseries,this.state.gridImportTimeseries=y.gridImportTimeseries,this.state.marketExportTimeseries=y.marketExportTimeseries,this.state.perMeterProductionTimeseries=f}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}}async shiftChartPeriod(e){const{start:s,end:a}=this.getDateRangeISO(),n=xs(s,a,this.state.chartTimeBucket,e);n&&await this.handleChartZoomChange(He(n.start),He(n.end))}changeTab(e){this.state.tab=e,this.render(),(e==="dashboard"||e==="charts")&&!this.state.rangeData&&!this.state.loading&&this.loadData(),e==="charts"&&this.state.rangeData&&this.loadAnalysisComparison(),e==="sensors"&&!this.state.sensors&&Tt().then(s=>{this.state.sensors=s,this.render()}),e==="settings"&&!this.state.config&&Ne().then(s=>{this.state.config=s,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,Er(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}printInvoice(){var r,i;const e=document.title,a=`Leneda-invoice-${(r=this.state.rangeData)!=null&&r.start&&((i=this.state.rangeData)!=null&&i.end)?`${this.state.rangeData.start.slice(0,10)}_to_${this.state.rangeData.end.slice(0,10)}`:this.state.range}`.replace(/[^a-z0-9_-]+/gi,"-");let n=!1;const o=()=>{n||(n=!0,document.title=e,window.removeEventListener("afterprint",o))};document.title=a,window.addEventListener("afterprint",o,{once:!0}),window.print(),window.setTimeout(o,1e3)}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const s=this.root.querySelector(".main-content");s?s.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}getDataSourceLabel(){return this.state.mode==="ha"?"Home Assistant":"Standalone"}getHostedDataNoticeHtml(){var e;return(((e=this.state.credentials)==null?void 0:e.proxy_url)??"").trim().length>0,""}render(){var p;const{tab:e,loading:s,error:a,theme:n}=this.state,o=this.getDataSourceLabel(),r=this.getHostedDataNoticeHtml();if(s&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${St(e,y=>{},!1,n,o)}
          <main class="main-content">
            ${r}
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `,this.attachNavListeners();return}if(a&&!this.state.rangeData){const y=a.toLowerCase().includes("missing data");this.root.innerHTML=`
        <div class="app-shell">
          ${St(e,f=>{},!1,n,o)}
          <main class="main-content">
            ${r}
            <div class="error-state">
              <h2>${y?"Missing Data":"Connection Error"}</h2>
              <p>${y?"The selected period could not be loaded because data is missing.":a}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(p=this.root.querySelector("#retry-btn"))==null||p.addEventListener("click",()=>this.loadData());return}this.state.rangeData&&this.normalizeChartTimeBucket();let i="";switch(e){case"dashboard":i=va(this.state);break;case"charts":i=Za(this.state);break;case"sensors":i=Qa(this.state.sensors);break;case"invoice":i=vr(this.state);break;case"settings":i=Mr(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${St(e,y=>this.changeTab(y),this.state.isMenuOpen,n,o)}
        <main class="main-content">
          ${r}
          ${s?'<div class="loading-bar"></div>':""}
          ${i}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachAnalysisListeners(),this.attachInvoiceListeners(),this.attachSettingsListeners()}attachNavListeners(){var e,s;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(s=this.root.querySelector("[data-theme-toggle]"))==null||s.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.tab;this.changeTab(n)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.range;this.changeRange(i)})});const s=this.root.querySelector("#custom-start"),a=this.root.querySelector("#custom-end");s&&s.addEventListener("change",()=>{this.state.customStart=s.value}),a&&a.addEventListener("change",()=>{this.state.customEnd=a.value});const n=this.root.querySelector("#apply-custom-range");if(n==null||n.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.chartUnit;i!==this.state.chartUnit&&(this.state.chartUnit=i,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-bucket]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.chartBucket,{start:p,end:y}=this.getDateRangeISO();Ge(i,Et(p,y))&&i!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=i,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-period-nav]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.chartPeriodNav==="next"?1:-1;this.shiftChartPeriod(i)})}),this.root.querySelectorAll("[data-chart-view]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.chartView;i!==this.state.chartConsumptionView&&(this.state.chartConsumptionView=i,this.renderPreserveMainScroll())})}),!e){const r=this.root.querySelector("#energy-chart");r&&this.state.rangeData&&this.initChart(r)}const o=this.root.querySelector(".reset-zoom-btn");o==null||o.addEventListener("click",async()=>{const{resetChartZoom:r}=await pe(async()=>{const{resetChartZoom:i}=await import("./Charts-DQrqjb_S.js");return{resetChartZoom:i}},[]);if(r(),o.style.display="none",this.clearChartViewport(),this.preZoomRange!==null){const i=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",i==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(i)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachAnalysisListeners(){this.root.querySelectorAll("[data-analysis-heatmap]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisHeatmap;s!==this.state.analysisHeatmapMetric&&(this.state.analysisHeatmapMetric=s,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-profile]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisProfile;s!==this.state.analysisProfileMetric&&(this.state.analysisProfileMetric=s,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-comparison-mode]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisComparisonMode;s!==this.state.analysisComparisonMode&&(this.state.analysisComparisonMode=s,this.state.analysisComparison=null,this.loadAnalysisComparison(!0))})})}attachInvoiceListeners(){var e;(e=this.root.querySelector("#print-invoice-btn"))==null||e.addEventListener("click",()=>{this.printInvoice()})}attachSettingsListeners(){var y,f,b,$;const e=this.root.querySelector("#credentials-form");if(e){const d=this.root.querySelector("#add-meter-btn");d==null||d.addEventListener("click",()=>{var x,S,M;const _=new FormData(e),k=h(_);if(k.length<10){k.push({id:"",types:["consumption"]});const c={api_key:_.get("api_key")||((x=this.state.credentials)==null?void 0:x.api_key)||"",energy_id:_.get("energy_id")||((S=this.state.credentials)==null?void 0:S.energy_id)||"",meters:k,proxy_url:_.get("proxy_url")||((M=this.state.credentials)==null?void 0:M.proxy_url)||""};this.state.credentials=c,Mt(c),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach(_=>{_.addEventListener("click",()=>{var c,v,l;const k=parseInt(_.dataset.meter??"0",10),x=new FormData(e),S=h(x);S.splice(k,1);const M={api_key:x.get("api_key")||((c=this.state.credentials)==null?void 0:c.api_key)||"",energy_id:x.get("energy_id")||((v=this.state.credentials)==null?void 0:v.energy_id)||"",meters:S,proxy_url:x.get("proxy_url")||((l=this.state.credentials)==null?void 0:l.proxy_url)||""};this.state.credentials=M,Mt(M),this.renderPreserveMainScroll()})});const h=_=>{var x,S,M,c,v,l;const k=[];for(let u=0;u<10;u++){const E=_.get(`meter_${u}_id`);if(E===null)break;const D=[];(x=e.querySelector(`[name="meter_${u}_consumption"]`))!=null&&x.checked&&D.push("consumption"),(S=e.querySelector(`[name="meter_${u}_production"]`))!=null&&S.checked&&D.push("production"),(M=e.querySelector(`[name="meter_${u}_solar_consumption"]`))!=null&&M.checked&&D.push("solar_consumption"),(c=e.querySelector(`[name="meter_${u}_export"]`))!=null&&c.checked&&D.push("export"),(v=e.querySelector(`[name="meter_${u}_export_consumption"]`))!=null&&v.checked&&D.push("export_consumption"),(l=e.querySelector(`[name="meter_${u}_gas"]`))!=null&&l.checked&&D.push("gas"),k.push({id:E.trim(),types:D})}return k};e.addEventListener("submit",async _=>{_.preventDefault();const k=new FormData(e),x={api_key:k.get("api_key"),energy_id:k.get("energy_id"),meters:h(k),proxy_url:k.get("proxy_url")},S=this.root.querySelector("#creds-status");try{Mt(x);const{saveCredentials:M}=await pe(async()=>{const{saveCredentials:l}=await Promise.resolve().then(()=>Me);return{saveCredentials:l}},void 0);await M(x),S&&(S.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=x,this.state.error=null;const c=!1,v=(x.proxy_url??"").trim();await this.loadData()}catch(M){S&&(S.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${M instanceof Error?M.message:M}</p>`)}});const g=this.root.querySelector("#test-creds-btn");g==null||g.addEventListener("click",async()=>{const _=new FormData(e),k={api_key:_.get("api_key"),energy_id:_.get("energy_id"),meters:h(_),proxy_url:_.get("proxy_url")},x=this.root.querySelector("#creds-status");x&&(x.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:S}=await pe(async()=>{const{testCredentials:c}=await Promise.resolve().then(()=>Me);return{testCredentials:c}},void 0),M=await S(k);x&&(x.innerHTML=M.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${M.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${M.message}</p>`)}catch(S){x&&(x.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${S instanceof Error?S.message:S}</p>`)}})}const s=this.root.querySelector("#settings-form");if(!s)return;const a=d=>{const h=[];for(let g=0;g<24;g++){const _=d.get(`consumption_window_${g}_label`),k=d.get(`consumption_window_${g}_day_group`),x=d.get(`consumption_window_${g}_start_time`),S=d.get(`consumption_window_${g}_end_time`),M=d.get(`consumption_window_${g}_rate`);if(_===null&&k===null&&x===null&&S===null&&M===null)break;h.push({label:(_??"").trim()||`Window ${g+1}`,day_group:k??"all",start_time:x??"00:00",end_time:S??"06:00",rate:parseFloat(M??"0")||0})}return h},n=d=>{const h=[];for(let g=0;g<24;g++){const _=d.get(`reference_window_${g}_label`),k=d.get(`reference_window_${g}_day_group`),x=d.get(`reference_window_${g}_start_time`),S=d.get(`reference_window_${g}_end_time`),M=d.get(`reference_window_${g}_reference_power_kw`);if(_===null&&k===null&&x===null&&S===null&&M===null)break;h.push({label:(_??"").trim()||`Reference ${g+1}`,day_group:k??"all",start_time:x??"17:00",end_time:S??"00:00",reference_power_kw:parseFloat(M??"0")||0})}return h},o=d=>{var g,_,k;const h=[];for(let x=0;x<50;x++){const S=d.get(`adjustment_${x}_id`);if(S===null)break;const M=d.get(`adjustment_${x}_label`),c=d.get(`adjustment_${x}_commodity`),v=d.get(`adjustment_${x}_basis`),l=d.get(`adjustment_${x}_amount_gross`),u=d.get(`adjustment_${x}_start_date`),E=d.get(`adjustment_${x}_end_date`),D=d.get(`adjustment_${x}_preset_id`),K=d.get(`adjustment_${x}_eligibility_note`);h.push({id:(S??"").trim()||`custom-${x+1}`,label:(M??"").trim()||`Adjustment ${x+1}`,enabled:((g=s.querySelector(`[name="adjustment_${x}_enabled"]`))==null?void 0:g.checked)??!1,commodity:c==="gas"?"gas":"electricity",basis:v==="gas_volume_m3"?"gas_volume_m3":"grid_import_kwh",amount_gross:parseFloat(l??"0")||0,start_date:u??"",end_date:E??"",vat_included:((_=s.querySelector(`[name="adjustment_${x}_vat_included"]`))==null?void 0:_.checked)??!1,preset_id:(D??"").trim(),eligibility_note:(K??"").trim(),tariff_already_includes_adjustment:((k=s.querySelector(`[name="adjustment_${x}_tariff_already_includes_adjustment"]`))==null?void 0:k.checked)??!1})}return h},r=()=>{var c;const d=new FormData(s),h={};s.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.name.startsWith("adjustment_")||(h[v.name]=v.checked)});const g=[],_=/^feed_in_rate_(\d+)_(.+)$/,k={},x=[],S=/^meter_fee_(\d+)_(.+)$/,M={};for(const[v,l]of d.entries()){if(v.startsWith("consumption_window_")||v.startsWith("reference_window_")||v.startsWith("adjustment_"))continue;const u=v.match(_);if(u){const P=u[1],R=u[2];k[P]||(k[P]={}),k[P][R]=l;continue}const E=v.match(S);if(E){const P=E[1],R=E[2];M[P]||(M[P]={}),M[P][R]=l;continue}if(h[v]!==void 0&&typeof h[v]=="boolean")continue;const D=l,K=s.elements.namedItem(v);if(D===""&&K instanceof HTMLInputElement&&K.type==="number"){const P=(c=this.state.config)==null?void 0:c[v];typeof P=="number"&&isFinite(P)&&(h[v]=P);continue}const V=parseFloat(D);h[v]=isNaN(V)?D:V}for(const v of Object.keys(k).sort()){const l=k[v],u=l.mode??"fixed",E=u==="sensor"?l.fallback_tariff??l.tariff:l.tariff;g.push({meter_id:l.meter_id??"",mode:u,tariff:parseFloat(E??"0.08")||.08,sensor_entity:l.sensor_entity??"",display_name:(l.display_name??"").trim(),self_use_priority:Math.max(1,parseInt(l.self_use_priority??`${Number(v)+1}`,10)||Number(v)+1)})}g.length>0&&(h.feed_in_rates=g);for(const v of Object.keys(M).sort()){const l=M[v];x.push({meter_id:l.meter_id??"",label:l.label??"",fee:parseFloat(l.fee??"0")||0})}return x.length>0&&(h.meter_monthly_fees=x),h.consumption_rate_windows=a(d),h.reference_power_windows=n(d),h.billing_adjustments=o(d),h},i=d=>{if(!this.state.config)return;const h=r();d(h),this.state.config={...this.state.config,...h},this.renderPreserveMainScroll()};if((y=this.root.querySelector("#add-consumption-window-btn"))==null||y.addEventListener("click",()=>{i(d=>{var g;const h=Array.isArray(d.consumption_rate_windows)?[...d.consumption_rate_windows]:[];h.push({label:`Window ${h.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((g=this.state.config)==null?void 0:g.energy_variable_rate)??.1125}),d.consumption_rate_windows=h})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(d=>{d.addEventListener("click",()=>{const h=parseInt(d.dataset.window??"0",10);i(g=>{const _=Array.isArray(g.consumption_rate_windows)?[...g.consumption_rate_windows]:[];_.splice(h,1),g.consumption_rate_windows=_})})}),(f=this.root.querySelector("#add-reference-window-btn"))==null||f.addEventListener("click",()=>{i(d=>{var g;const h=Array.isArray(d.reference_power_windows)?[...d.reference_power_windows]:[];h.push({label:`Reference ${h.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((g=this.state.config)==null?void 0:g.reference_power_kw)??5}),d.reference_power_windows=h})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(d=>{d.addEventListener("click",()=>{const h=parseInt(d.dataset.window??"0",10);i(g=>{const _=Array.isArray(g.reference_power_windows)?[...g.reference_power_windows]:[];_.splice(h,1),g.reference_power_windows=_})})}),(b=this.root.querySelector("#add-adjustment-btn"))==null||b.addEventListener("click",()=>{i(d=>{const h=Array.isArray(d.billing_adjustments)?[...d.billing_adjustments]:[];h.push({id:`custom-${Date.now()}`,label:`Adjustment ${h.length+1}`,enabled:!0,commodity:"electricity",basis:"grid_import_kwh",amount_gross:0,start_date:"",end_date:"",vat_included:!0,preset_id:"",eligibility_note:"",tariff_already_includes_adjustment:!1}),d.billing_adjustments=h})}),this.root.querySelectorAll(".remove-adjustment-btn").forEach(d=>{d.addEventListener("click",()=>{const h=parseInt(d.dataset.adjustment??"0",10);i(g=>{const _=Array.isArray(g.billing_adjustments)?[...g.billing_adjustments]:[];_.splice(h,1),g.billing_adjustments=_})})}),($=this.root.querySelector("#restore-adjustment-presets-btn"))==null||$.addEventListener("click",()=>{i(d=>{const g=(Array.isArray(d.billing_adjustments)?[...d.billing_adjustments]:[]).filter(_=>!_.preset_id);d.billing_adjustments=[...ar(!0),...g]})}),s.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(d=>{d.addEventListener("change",()=>{const h=d.name.match(/feed_in_rate_(\d+)_mode/);if(!h)return;const g=h[1],_=s.querySelector(`.feed-in-fixed-fields[data-rate-idx="${g}"]`),k=s.querySelector(`.feed-in-sensor-fields[data-rate-idx="${g}"]`);_&&(_.style.display=d.value==="fixed"?"":"none"),k&&(k.style.display=d.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const d=this.root.querySelector("#ha-entity-list");d&&bs().then(({entities:h})=>{d.innerHTML=h.map(g=>`<option value="${g}"></option>`).join("")}).catch(()=>{})}s.addEventListener("submit",async d=>{d.preventDefault();const h=r();try{const{saveConfig:g}=await pe(async()=>{const{saveConfig:_}=await Promise.resolve().then(()=>Me);return{saveConfig:_}},void 0);await g(h),this.state.config=await Ne(),this.render()}catch(g){alert("Failed to save: "+(g instanceof Error?g.message:g))}});const p=this.root.querySelector("#reset-config-btn");p==null||p.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?"))try{const{resetConfig:d}=await pe(async()=>{const{resetConfig:h}=await Promise.resolve().then(()=>Me);return{resetConfig:h}},void 0);await d(),this.state.config=await Ne(),this.render()}catch(d){alert("Failed to reset: "+(d instanceof Error?d.message:d))}})}async initChart(e){var s,a,n,o;try{const{renderEnergyChart:r}=await pe(async()=>{const{renderEnergyChart:x}=await import("./Charts-DQrqjb_S.js");return{renderEnergyChart:x}},[]),{start:i,end:p}=this.getDateRangeISO(),y=this.state.chartViewportStart?new Date(this.state.chartViewportStart).getTime():void 0,f=this.state.chartViewportEnd?new Date(this.state.chartViewportEnd).getTime():void 0;let b=this.state.consumptionTimeseries,$=this.state.productionTimeseries,d=this.state.gridImportTimeseries,h=this.state.marketExportTimeseries;if(!b||!$||!d||!h){const x=await this.fetchEnergyFlowTimeseries(i,p);b=x.consumptionTimeseries,$=x.productionTimeseries,d=x.gridImportTimeseries,h=x.marketExportTimeseries,this.state.consumptionTimeseries=b,this.state.productionTimeseries=$,this.state.gridImportTimeseries=d,this.state.marketExportTimeseries=h}const g=((s=this.state.config)==null?void 0:s.reference_power_kw)??0,_=(((a=this.state.config)==null?void 0:a.meters)??[]).filter(x=>x.types.includes("production")||x.types.includes("solar_consumption"));let k;if((o=(n=this.state.perMeterProductionTimeseries)==null?void 0:n.meters)!=null&&o.length)k=this.state.perMeterProductionTimeseries.meters;else if(_.length>1)try{const x=await Ct("1-1:2.29.0",i,p);x.meters&&x.meters.length>1&&(k=x.meters,this.state.perMeterProductionTimeseries=x)}catch(x){console.warn("Per-meter timeseries fetch failed, using merged view:",x)}r(e,b,$,{unit:this.state.chartUnit,consumptionView:this.state.chartConsumptionView,referencePowerKw:g,gridImportTimeseries:d,marketExportTimeseries:h,perMeterProduction:k,viewportStartMs:y,viewportEndMs:f,timeBucket:this.state.chartTimeBucket,onZoomChange:(x,S)=>{this.handleChartZoomChange(x,S)}})}catch(r){console.error("Chart init failed:",r)}}async handleChartZoomChange(e,s){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd),this.state.error=null,this.state.loading=!0,this.renderPreserveMainScroll();const{fetchCustomData:a}=await pe(async()=>{const{fetchCustomData:y}=await Promise.resolve().then(()=>Me);return{fetchCustomData:y}},void 0),n=e.slice(0,10),o=s.slice(0,10);this.resetAnalysisComparison();const r=await a(e,s),[i,p]=await Promise.all([this.fetchEnergyFlowTimeseries(e,s),this.fetchPerMeterProductionForRange(this.state.config,e,s)]);this.state.range="custom",this.state.customStart=n,this.state.customEnd=o,this.state.chartViewportStart=e,this.state.chartViewportEnd=s,this.state.rangeData={range:"custom",consumption:r.consumption,production:r.production,exported:r.exported??0,self_consumed:r.self_consumed??0,gas_energy:r.gas_energy??0,gas_volume:r.gas_volume??0,grid_import:r.grid_import,solar_to_home:r.solar_to_home,direct_solar_to_home:r.direct_solar_to_home,shared:r.shared,shared_with_me:r.shared_with_me,peak_power_kw:r.peak_power_kw??0,exceedance_kwh:r.exceedance_kwh??0,metering_point:r.metering_point??"",start:r.start,end:r.end},this.state.consumptionTimeseries=i.consumptionTimeseries,this.state.productionTimeseries=i.productionTimeseries,this.state.gridImportTimeseries=i.gridImportTimeseries,this.state.marketExportTimeseries=i.marketExportTimeseries,this.state.perMeterProductionTimeseries=p,this.state.loading=!1,this.renderPreserveMainScroll()}catch(a){console.error("Zoom data fetch failed:",a),this.state.loading=!1,this.clearRangeStateWithError(a,"Missing data"),this.render()}}getDateRangeISO(){if(this.state.chartViewportStart&&this.state.chartViewportEnd)return{start:this.state.chartViewportStart,end:this.state.chartViewportEnd};const e=new Date,s=a=>He(a);switch(this.state.range){case"custom":{const a=new Date(this.state.customStart+"T00:00:00"),n=new Date(this.state.customEnd+"T23:59:59.999");return{start:s(a),end:s(n)}}case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const n=new Date(a);return n.setHours(23,59,59,999),{start:s(a),end:s(n)}}case"this_week":{const a=new Date(e),n=a.getDay()||7;return a.setDate(a.getDate()-n+1),a.setHours(0,0,0,0),{start:s(a),end:s(e)}}case"last_week":{const a=new Date(e),n=a.getDay()||7,o=new Date(a);o.setDate(a.getDate()-n),o.setHours(23,59,59,999);const r=new Date(o);return r.setDate(o.getDate()-6),r.setHours(0,0,0,0),{start:s(r),end:s(o)}}case"this_month":{const a=new Date(e.getFullYear(),e.getMonth(),1);return{start:s(a),end:s(e)}}case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),n=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s(a),end:s(n)}}case"this_year":{const a=new Date(e.getFullYear(),0,1);return{start:s(a),end:s(e)}}case"last_year":{const a=new Date(e.getFullYear()-1,0,1),n=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s(a),end:s(n)}}default:{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const n=new Date(a);return n.setHours(23,59,59,999),{start:s(a),end:s(n)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new Wr(t).mount()}export{fa as b};
