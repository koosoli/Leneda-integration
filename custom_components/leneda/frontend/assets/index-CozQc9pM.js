var va=Object.defineProperty;var ya=(t,e,a)=>e in t?va(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var Fe=(t,e,a)=>ya(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const fa="modulepreload",wa=function(t){return"/leneda-panel/static/"+t},Mt={},ce=function(e,a,s){let o=Promise.resolve();if(a&&a.length>0){let r=function(v){return Promise.all(v.map(d=>Promise.resolve(d).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),u=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));o=r(a.map(v=>{if(v=wa(v),v in Mt)return;Mt[v]=!0;const d=v.endsWith(".css"),m=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${v}"]${m}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":fa,d||(h.as="script"),h.crossOrigin="",h.href=v,u&&h.setAttribute("nonce",u),document.head.appendChild(h),d)return new Promise((y,g)=>{h.addEventListener("load",y),h.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${v}`)))})}))}function n(r){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=r,window.dispatchEvent(c),!c.defaultPrevented)throw r}return o.then(r=>{for(const c of r||[])c.status==="rejected"&&n(c.reason);return e().catch(n)})};function Nt(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()})),proxy_url:(t.proxy_url??"").trim()}}function $a(){var t,e,a,s,o;try{const n=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((o=(s=(a=n==null?void 0:n.hass)==null?void 0:a.auth)==null?void 0:s.data)==null?void 0:o.access_token)??null}catch{return null}}async function X(t,e){const a=$a(),s={...e==null?void 0:e.headers,...a?{Authorization:`Bearer ${a}`}:{}},o={...e,credentials:"include",headers:s},n=await fetch(t,o);if(!n.ok){const r=n.headers.get("content-type")??"";let c="",u="";if(r.includes("application/json")){const v=await n.json().catch(()=>null);c=String((v==null?void 0:v.error)??"").trim(),u=String((v==null?void 0:v.message)??(v==null?void 0:v.error)??"").trim()}else u=(await n.text().catch(()=>"")).trim();throw c==="missing_data"||c==="no_data"||n.status===503?new Error("Missing data"):new Error(u?`API ${n.status}: ${u}`:`API ${n.status}: ${n.statusText}`)}return n.json()}async function Je(t){return X(`/leneda_api/data?range=${t}`)}async function ba(t,e){return X(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function Ae(t,e,a){let s=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(s+=`&start=${encodeURIComponent(e)}`),a&&(s+=`&end=${encodeURIComponent(a)}`),X(s)}async function ht(t,e,a){let s=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(s+=`&start=${encodeURIComponent(e)}`),a&&(s+=`&end=${encodeURIComponent(a)}`),X(s)}async function mt(){return X("/leneda_api/sensors")}async function He(){return X("/leneda_api/config")}async function _a(t){await X("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function xa(){await X("/leneda_api/config/reset",{method:"POST"})}async function Gt(){try{return await X("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function Ot(){return X("/leneda_api/credentials")}async function ka(t){const e=Nt(t);await X("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Ma(t){const e=Nt(t);return X("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Ut(){return X("/leneda_api/ha-entities")}const Se=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:He,fetchCredentials:Ot,fetchCustomData:ba,fetchHAEntities:Ut,fetchMode:Gt,fetchPerMeterTimeseries:ht,fetchRangeData:Je,fetchSensors:mt,fetchTimeseries:Ae,resetConfig:xa,saveConfig:_a,saveCredentials:ka,testCredentials:Ma},Symbol.toStringTag,{value:"Module"}));function vt(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(e){const[,a,s,o]=e;return new Date(Number(a),Number(s)-1,Number(o))}return new Date(t)}function p(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function $e(t){return vt(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function Bt(t){return vt(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function Pe(t){return vt(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}const et=[{id:"year",label:"Year",shortLabel:"Yr",stepLabel:"year",approxMs:365*864e5,maxBuckets:30},{id:"month",label:"Month",shortLabel:"Mo",stepLabel:"month",approxMs:30*864e5,maxBuckets:72},{id:"week",label:"Week",shortLabel:"Wk",stepLabel:"week",approxMs:7*864e5,maxBuckets:104},{id:"day",label:"Day",shortLabel:"Day",stepLabel:"day",approxMs:864e5,maxBuckets:370},{id:"hour",label:"Hour",shortLabel:"Hr",stepLabel:"hour",approxMs:36e5,maxBuckets:744},{id:"quarter_hour",label:"15 min",shortLabel:"15m",stepLabel:"15 minutes",approxMs:15*6e4,maxBuckets:672}];function qt(t){return et.find(e=>e.id===t)??et[3]}function gt(t,e){if(!t||!e)return 0;const a=new Date(t).getTime(),s=new Date(e).getTime();return!Number.isFinite(a)||!Number.isFinite(s)?0:Math.max(0,s-a)}function Ne(t,e){const a=qt(t);if(e<=0)return t==="quarter_hour";const s=e/a.approxMs;return s>=1.5&&s<=a.maxBuckets}function Ca(t,e){var o;if(e&&Ne(e,t))return e;const a=t/864e5,s=a<=1.25?"quarter_hour":a<=7?"hour":a<=45?"day":a<=180?"week":a<=900?"month":"year";return Ne(s,t)?s:((o=et.find(n=>Ne(n.id,t)))==null?void 0:o.id)??"quarter_hour"}function Sa(t,e){return new Date(t,e+1,0).getDate()}function Ct(t,e,a){const s=t.getDate(),o=new Date(t),n=o.getMonth()+a,r=o.getFullYear()+e+Math.floor(n/12),c=(n%12+12)%12,u=Math.min(s,Sa(r,c));return o.setFullYear(r,c,u),o}function St(t,e,a){switch(e){case"year":return Ct(t,a,0);case"month":return Ct(t,0,a);case"week":return new Date(t.getTime()+a*7*864e5);case"day":return new Date(t.getTime()+a*864e5);case"hour":return new Date(t.getTime()+a*36e5);case"quarter_hour":return new Date(t.getTime()+a*15*6e4)}}function Yt(t,e,a,s){if(!t||!e)return null;const o=new Date(t),n=new Date(e);return!Number.isFinite(o.getTime())||!Number.isFinite(n.getTime())?null:{start:St(o,a,s),end:St(n,a,s)}}function Ta(t,e){if(!t||!e)return"No period loaded";const a=new Date(t),s=new Date(e);if(!Number.isFinite(a.getTime())||!Number.isFinite(s.getTime()))return"No period loaded";if(a.getFullYear()===s.getFullYear()&&a.getMonth()===s.getMonth()&&a.getDate()===s.getDate()){const n=a.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),r=a.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),c=s.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${n}, ${r} - ${c}`}return`${a.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})} - ${s.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}`}const Ge=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function de(t){const e=a=>`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${a}
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
      `)}}function Ea(t){var Ke,fe,Ee,Ve,we,xe,ke,De;const e=t.rangeData,a=M=>{if(!M)return"";const E=M.match(/^(\d{4}-\d{2}-\d{2})/);return E?E[1]:""},s=(e==null?void 0:e.consumption)??0,o=(e==null?void 0:e.production)??0,n=(e==null?void 0:e.exported)??0,r=(e==null?void 0:e.self_consumed)??0,c=(e==null?void 0:e.gas_energy)??0,u=(e==null?void 0:e.gas_volume)??0,v=(e==null?void 0:e.peak_power_kw)??0,d=a(e==null?void 0:e.start),m=a(e==null?void 0:e.end),h=(e==null?void 0:e.shared_with_me)??0,y=(e==null?void 0:e.shared)??0,g=Math.max(0,n),$=(e==null?void 0:e.grid_import)!=null?s-e.grid_import:void 0,x=Math.max(0,$??(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(r>0?r:o-g)),C=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??Math.max(0,x-h)),k=x,b=Math.max(0,(e==null?void 0:e.grid_import)??s-x),S=s>0?s:b+x,i=!!((Ke=t.config)!=null&&Ke.meter_has_gas||(((fe=t.config)==null?void 0:fe.meters)??[]).some(M=>M.types.includes("gas"))),l=y+h,f=S>0?Math.min(100,x/S*100):0,_=Math.max(S,o,b,g,y,h,C,1),L=i?Math.min(Math.max(0,c),_):0,F=(M,E=2.8,D=8.2)=>M>0?E+M/_*(D-E):1.8,P=M=>F(M)+1.4,K=M=>F(M)+5.4,A=(M,E=.28,D=.88)=>M>0?E+M/_*(D-E):.1,j=(M,E=.09,D=.22)=>M>0?E+M/_*(D-E):.05,J=(M,E=1.6,D=3.9)=>`${(M>0?Math.max(E,D-M/_*(D-E)):D).toFixed(2)}s`,se=(M,E=3.4,D=5.8)=>M>0?E+M/_*(D-E):3,Z=M=>M>0?Math.max(18,Math.round(M/_*100)):0,Q=M=>`
    <defs>
      <filter id="${M}-glow-red" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${M}-glow-green" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${M}-glow-blue" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${M}-glow-cyan" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${M}-glow-gas" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <linearGradient id="${M}-flow-solar" x1="50%" y1="6%" x2="50%" y2="88%">
        <stop offset="0%" stop-color="var(--clr-production)" stop-opacity="0.28" />
        <stop offset="100%" stop-color="var(--clr-production)" stop-opacity="1" />
      </linearGradient>
      <linearGradient id="${M}-flow-grid-in" x1="8%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stop-color="var(--clr-consumption)" stop-opacity="0.35" />
        <stop offset="100%" stop-color="var(--clr-consumption)" stop-opacity="0.95" />
      </linearGradient>
      <linearGradient id="${M}-flow-grid-out" x1="100%" y1="44%" x2="4%" y2="76%">
        <stop offset="0%" stop-color="var(--clr-export)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--clr-export)" stop-opacity="0.4" />
      </linearGradient>
      <linearGradient id="${M}-flow-shared-out" x1="0%" y1="48%" x2="100%" y2="48%">
        <stop offset="0%" stop-color="var(--clr-export)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--clr-export)" stop-opacity="0.45" />
      </linearGradient>
      <linearGradient id="${M}-flow-shared-in" x1="100%" y1="48%" x2="0%" y2="48%">
        <stop offset="0%" stop-color="var(--clr-primary)" stop-opacity="0.4" />
        <stop offset="100%" stop-color="var(--clr-primary)" stop-opacity="1" />
      </linearGradient>
      <linearGradient id="${M}-flow-gas" x1="50%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stop-color="var(--clr-gas)" stop-opacity="0.3" />
        <stop offset="100%" stop-color="var(--clr-gas)" stop-opacity="0.95" />
      </linearGradient>

      <linearGradient id="${M}-scene-shell" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.05)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
      </linearGradient>
      <radialGradient id="${M}-house-base-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--clr-surface-alt)" stop-opacity="0.8" />
        <stop offset="100%" stop-color="var(--clr-surface-alt)" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="${M}-house-core-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(88, 166, 255, 0.18)" />
        <stop offset="100%" stop-color="rgba(88, 166, 255, 0)" />
      </radialGradient>
    </defs>
  `,q=M=>{const{x:E,y:D,width:G,accent:B,kicker:Me,value:ne,detail:oe}=M;return`
      <g class="scene-node-label" transform="translate(${E}, ${D})">
        <rect width="${G}" height="${oe?70:54}" rx="18" fill="var(--clr-overlay)" stroke="${B}" />
        <text x="16" y="22" class="scene-node-kicker">${Me}</text>
        <text x="16" y="${oe?39:37}" class="scene-node-value">${ne}</text>
        ${oe?`<text x="16" y="56" class="scene-node-detail">${oe}</text>`:""}
      </g>
    `},ue=M=>{const{x:E,y:D,scale:G=1,glowId:B}=M;return`
      <g class="scene-tier-icon scene-tier-grid" transform="translate(${E}, ${D}) scale(${G})">
        <circle cx="0" cy="44" r="48" fill="var(--clr-consumption)" fill-opacity="0.06" />
        <path d="M0 0 V88 M-24 20 H24 M-16 42 H16 M-8 66 H8" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" filter="url(#${B})" />
        <path d="M-12 88 L0 60 L12 88" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" fill="none" />
      </g>
    `},le=M=>{const{x:E,y:D,scale:G=1,glowId:B}=M;return`
      <g class="scene-tier-icon scene-tier-solar" transform="translate(${E}, ${D}) scale(${G})">
        <circle cx="0" cy="0" r="26" fill="var(--clr-production)" fill-opacity="0.09" />
        <circle cx="0" cy="0" r="12" fill="var(--clr-production)" fill-opacity="0.9" filter="url(#${B})" />
        <path d="M0 -26 V-40 M0 26 V40 M26 0 H40 M-26 0 H-40 M18 -18 L28 -28 M18 18 L28 28 M-18 18 L-28 28 M-18 -18 L-28 -28" stroke="var(--clr-production)" stroke-width="2.5" stroke-linecap="round" />
      </g>
    `},he=M=>{const{x:E,y:D,scale:G=1,glowId:B}=M;return`
      <g class="scene-tier-icon scene-tier-community" transform="translate(${E}, ${D}) scale(${G})">
        <circle cx="0" cy="40" r="50" fill="var(--clr-primary)" fill-opacity="0.06" />
        <rect x="-26" y="30" width="22" height="42" rx="6" fill="rgba(88, 166, 255, 0.08)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="6" y="16" width="24" height="56" rx="6" fill="rgba(88, 166, 255, 0.12)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="-2" y="4" width="6" height="10" rx="2" fill="var(--clr-primary)" fill-opacity="0.7" />
        <path d="M-14 12 H14 M-10 4 V20 M10 4 V20" stroke="var(--clr-primary)" stroke-width="2" stroke-linecap="round" filter="url(#${B})" />
      </g>
    `},U=M=>{const{x:E,y:D,scale:G=1,glowId:B}=M;return`
      <g class="scene-tier-icon scene-tier-gas" transform="translate(${E}, ${D}) scale(${G})">
        <circle cx="0" cy="38" r="46" fill="var(--clr-gas)" fill-opacity="0.08" />
        <path d="M-26 40 H-8 V72 H26" stroke="var(--clr-gas)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#${B})" />
        <path d="M0 4 C18 24 20 40 20 52 C20 70 9 84 0 84 C-9 84 -20 70 -20 52 C-20 38 -10 24 0 4 Z" fill="rgba(210, 153, 34, 0.14)" stroke="var(--clr-gas)" stroke-width="2.2" />
        <path d="M0 24 C9 35 10 44 10 52 C10 61 5 68 0 72 C-5 68 -10 61 -10 52 C-10 44 -8 35 0 24 Z" fill="var(--clr-gas)" fill-opacity="0.85" />
      </g>
    `},I=M=>{const{prefix:E,x:D,y:G,scale:B=1}=M;return`
      <g class="elite-house" transform="translate(${D}, ${G}) scale(${B})">
        <circle cx="90" cy="122" r="112" fill="url(#${E}-house-core-glow)" />
        <circle cx="90" cy="122" r="96" fill="url(#${E}-house-base-glow)" opacity="0.28" />
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
          <rect x="0" y="0" width="56" height="14" rx="3" fill="rgba(63, 185, 80, 0.12)" stroke="var(--clr-production)" stroke-width="1.6" filter="url(#${E}-glow-green)" />
          <rect x="0" y="20" width="56" height="14" rx="3" fill="rgba(63, 185, 80, 0.12)" stroke="var(--clr-production)" stroke-width="1.6" filter="url(#${E}-glow-green)" />
          <line x1="13" y1="0" x2="13" y2="14" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
          <line x1="30" y1="0" x2="30" y2="14" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
          <line x1="13" y1="20" x2="13" y2="34" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
          <line x1="30" y1="20" x2="30" y2="34" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
        </g>
        <g transform="translate(90, 124)">
          <circle r="32" fill="var(--clr-overlay)" stroke="var(--clr-overlay-border)" stroke-width="2" />
          <text text-anchor="middle" y="-4" class="house-core-kicker">Solar Cover.</text>
          <text text-anchor="middle" y="18" class="house-core-value">${p(f,0)}%</text>
        </g>
        <text x="90" y="262" text-anchor="middle" class="house-total-label">Home usage</text>
        <text x="90" y="284" text-anchor="middle" class="house-total-value">${p(S)} kWh</text>
      </g>
    `},N=M=>{const{path:E,value:D,gradientId:G,colorVar:B,filterId:Me,particleClass:ne,direction:oe="forward"}=M,We=oe==="reverse"?"1;0":"0;1";return`
      <path
        class="flow-halo ${ne}"
        d="${E}"
        stroke="url(#${G})"
        stroke-width="${K(D).toFixed(1)}"
        stroke-opacity="${j(D).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-rail ${ne}"
        d="${E}"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="${P(D).toFixed(1)}"
        stroke-opacity="0.42"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-stream ${ne}"
        d="${E}"
        stroke="url(#${G})"
        stroke-width="${F(D).toFixed(1)}"
        stroke-opacity="${A(D).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      ${D>0?`
        <circle
          class="flow-particle ${ne}"
          r="${se(D).toFixed(1)}"
          fill="${B}"
          filter="url(#${Me})"
        >
          <animateMotion dur="${J(D)}" repeatCount="indefinite" path="${E}" keyPoints="${We}" keyTimes="0;1" calcMode="linear" />
        </circle>
        <circle
          class="flow-particle flow-particle-secondary ${ne}"
          r="${Math.max(2.4,se(D)-1.2).toFixed(1)}"
          fill="${B}"
          fill-opacity="0.75"
          filter="url(#${Me})"
        >
          <animateMotion dur="${J(D)}" begin="-${(parseFloat(J(D))/2).toFixed(2)}s" repeatCount="indefinite" path="${E}" keyPoints="${We}" keyTimes="0;1" calcMode="linear" />
        </circle>
      `:""}
    `},re=()=>`
    <div class="elite-scene elite-scene-desktop">
      <svg class="elite-main-svg" viewBox="0 0 860 460" fill="none" preserveAspectRatio="xMidYMid meet">
        ${Q("desktop")}
        <rect x="34" y="30" width="792" height="372" rx="34" fill="url(#desktop-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="430" cy="330" rx="278" ry="60" fill="url(#desktop-house-base-glow)" opacity="0.56" />
        <line x1="98" y1="334" x2="762" y2="334" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.45" />

        ${q({x:58,y:108,width:152,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${p(b+g)} kWh`,detail:g>0?`In ${p(b)} / out ${p(g)} kWh`:void 0})}

        ${q({x:356,y:44,width:148,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${p(o)} kWh`,detail:`${p(x)} kWh used at home`})}

        ${q({x:624,y:108,width:184,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${p(l)} kWh`,detail:`Sent ${p(y)} / got ${p(h)} kWh`})}

        ${i?q({x:350,y:338,width:160,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${p(c)} kWh`,detail:u>0?`${p(u)} m3 in period`:"Gas meter active"}):""}

        ${ue({x:132,y:186,scale:1.02,glowId:"desktop-glow-red"})}
        ${le({x:430,y:126,glowId:"desktop-glow-green"})}
        ${he({x:716,y:194,glowId:"desktop-glow-cyan"})}
        ${i?U({x:430,y:352,glowId:"desktop-glow-gas"}):""}
        ${I({prefix:"desktop",x:340,y:96,scale:1.02})}

        ${N({path:"M 430 152 C 430 182 430 204 430 220",value:C,gradientId:"desktop-flow-solar",colorVar:"var(--clr-production)",filterId:"desktop-glow-green",particleClass:"flow-solar"})}

        ${N({path:"M 176 230 C 246 230 318 230 364 232",value:b,gradientId:"desktop-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"desktop-glow-red",particleClass:"flow-grid-in"})}

        ${N({path:"M 496 268 C 430 298 326 314 176 316",value:g,gradientId:"desktop-flow-grid-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-grid-out"})}

        ${N({path:"M 500 234 C 566 220 634 220 692 236",value:y,gradientId:"desktop-flow-shared-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-shared-out"})}

        ${N({path:"M 690 272 C 632 292 566 294 500 278",value:h,gradientId:"desktop-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"desktop-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${i?N({path:"M 430 404 C 430 370 430 336 430 302",value:L,gradientId:"desktop-flow-gas",colorVar:"var(--clr-gas)",filterId:"desktop-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,ee=()=>`
    <div class="elite-scene elite-scene-mobile">
      <svg class="elite-main-svg" viewBox="0 0 420 560" fill="none" preserveAspectRatio="xMidYMid meet">
        ${Q("mobile")}
        <rect x="20" y="20" width="380" height="520" rx="32" fill="url(#mobile-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="210" cy="316" rx="136" ry="38" fill="url(#mobile-house-base-glow)" opacity="0.58" />
        <line x1="64" y1="332" x2="356" y2="332" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.42" />

        ${q({x:132,y:40,width:156,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${p(o)} kWh`})}

        ${q({x:20,y:194,width:126,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${p(b+g)} kWh`})}

        ${q({x:274,y:194,width:126,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${p(l)} kWh`})}

        ${i?q({x:122,y:442,width:176,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${p(c)} kWh`,detail:u>0?`${p(u)} m3`:"Gas meter active"}):""}

        ${le({x:210,y:126,scale:.92,glowId:"mobile-glow-green"})}
        ${ue({x:76,y:254,scale:.86,glowId:"mobile-glow-red"})}
        ${he({x:344,y:260,scale:.86,glowId:"mobile-glow-cyan"})}
        ${i?U({x:210,y:442,scale:.9,glowId:"mobile-glow-gas"}):""}
        ${I({prefix:"mobile",x:118,y:166,scale:.94})}

        ${N({path:"M 210 152 C 210 188 210 216 210 238",value:C,gradientId:"mobile-flow-solar",colorVar:"var(--clr-production)",filterId:"mobile-glow-green",particleClass:"flow-solar"})}

        ${N({path:"M 104 286 C 138 286 168 286 194 286",value:b,gradientId:"mobile-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"mobile-glow-red",particleClass:"flow-grid-in"})}

        ${N({path:"M 226 318 C 194 340 162 348 102 350",value:g,gradientId:"mobile-flow-grid-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-grid-out"})}

        ${N({path:"M 226 286 C 262 274 294 274 318 286",value:y,gradientId:"mobile-flow-shared-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-shared-out"})}

        ${N({path:"M 318 320 C 294 332 262 334 226 322",value:h,gradientId:"mobile-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"mobile-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${i?N({path:"M 210 474 C 210 432 210 390 210 344",value:L,gradientId:"mobile-flow-gas",colorVar:"var(--clr-gas)",filterId:"mobile-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,te=e!=null&&e.start&&(e!=null&&e.end)?`${$e(e.start)} — ${$e(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${$e(t.customStart+"T00:00:00")} — ${$e(t.customEnd+"T00:00:00")}`:((Ee=Ge.find(M=>M.id===t.range))==null?void 0:Ee.label)??"Yesterday",_e=(we=(Ve=t.consumptionTimeseries)==null?void 0:Ve.items)!=null&&we.length?t.consumptionTimeseries.items:((xe=t.productionTimeseries)==null?void 0:xe.items)??[],Y=t.chartViewportStart??((ke=_e[0])==null?void 0:ke.startedAt)??(e==null?void 0:e.start),me=t.chartViewportEnd??((De=_e[_e.length-1])==null?void 0:De.startedAt)??(e==null?void 0:e.end),ae=gt(Y,me),ge=qt(t.chartTimeBucket),Te=Ta(Y,me),ve=Yt(Y,me,t.chartTimeBucket,1),z=new Date,Oe=!ve||ve.start.getTime()>z.getTime(),st=et.map(M=>{const E=Ne(M.id,ae),D=M.id===t.chartTimeBucket,G=M.id==="quarter_hour"?"15-minute detail would be too dense for this selected period":`${M.label} detail does not add useful resolution for this selected period`;return`
            <button
              class="unit-btn chart-bucket-btn ${D?"active":""}"
              data-chart-bucket="${M.id}"
              title="${E?`Show ${M.label.toLowerCase()} detail`:G}"
              ${E?"":'disabled aria-disabled="true"'}
            >${M.label}</button>
          `}).join(""),Ue=t.chartUnit==="kw"?"kW uses the same detail presets as kWh, but keeps power values in interval bars so short spikes and dips stay visible.":"kWh keeps the aggregated period bars for totals.",ye=`${t.chartConsumptionView==="house"?"Total Usage shows the full house load, with the solar-covered share highlighted in green and exports below zero. Use the detail presets and arrows above the graph to move through time.":t.chartConsumptionView==="solar_systems"?"PV Systems stacks each configured solar production meter so you can compare panel-system output like the Home Assistant Energy dashboard.":"Net Grid focuses on what still came from the grid after solar, with exports shown below zero. The reference limit in kW mode applies here."} ${Ue}`,nt=((e==null?void 0:e.exceedance_kwh)??0)>0?de("warning"):de("ok");return`
    <div class="dashboard" style="position: relative;">
      <div style="position:fixed;bottom:4px;right:4px;font-size:10px;opacity:0.5;pointer-events:none;z-index:9999;">v:2.10.1</div>

      <!-- Range Selector -->
      <div class="range-selector">
        ${Ge.map(M=>`
          <button
            class="range-btn ${M.id===t.range?"active":""}"
            data-range="${M.id}"
          >${M.label}</button>
        `).join("")}
      </div>

      ${(()=>{if(!(e!=null&&e.start)||!(e!=null&&e.end))return"";try{const M=new Date(e.start),E=new Date(e.end);return isNaN(M.getTime())||isNaN(E.getTime())?"":`
            <div class="range-info-bar">
              📅 ${M.toLocaleDateString()} — ${E.toLocaleDateString()}
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
      `:d&&m?`
      <!-- Preset Period Preview -->
      <div class="custom-range-picker period-preview">
        <span class="period-preview-label">Viewed period</span>
        <label>
          <span>From</span>
          <input type="date" value="${d}" readonly aria-label="Preset period start" />
        </label>
        <label>
          <span>To</span>
          <input type="date" value="${m}" readonly aria-label="Preset period end" />
        </label>
      </div>
      `:""}

      <!-- Stat Cards -->
      <div class="stats-grid">
        <div class="stat-card consumption">
          <div class="stat-icon">${de("consumption")}</div>
          <div class="stat-body">
            <div class="stat-label">Consumption</div>
            <div class="stat-value">${p(s)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card production">
          <div class="stat-icon">${de("production")}</div>
          <div class="stat-body">
            <div class="stat-label">Production</div>
            <div class="stat-value">${p(o)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.export">
          <div class="stat-icon">${de("export")}</div>
          <div class="stat-body">
            <div class="stat-label">Exported</div>
            <div class="stat-value">${p(n)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.self-consumed">
          <div class="stat-icon">${de("self_consumed")}</div>
          <div class="stat-body">
            <div class="stat-label">Self-Consumed</div>
            <div class="stat-value">${p(k)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>
      </div>

      <!-- Energy Flow + Key Metrics side by side -->
      <div class="flow-metrics-row">
        <div class="card flow-card">
          <h3 class="card-title"><span class="title-icon">${de("flow")}</span> Energy Flow</h3>

          <div class="leneda-elite-flow">
            <div class="elite-header">
              <div class="glass-module consumption-module">
                <div class="module-info">
                  <span class="module-label">Period Consumption <span class="info-icon">ⓘ</span></span>
                  <div class="module-value-row">
                    <span class="module-value highlight-red">${p(s)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg red"></div></div>
              </div>

              <div class="glass-module production-module">
                <div class="module-info">
                  <span class="module-label">Solar Production <span class="info-icon">ⓘ</span></span>
                  <div class="module-value-row">
                    <span class="module-value highlight-green">${p(o)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg green"></div></div>
              </div>
            </div>

            <div class="flow-scene-summary">
              <span class="flow-scene-chip solar">Solar coverage ${p(f,0)}%</span>
              <span class="flow-scene-chip import">Grid import ${p(b)} kWh</span>
              <span class="flow-scene-chip export">Export ${p(g)} kWh</span>
              <span class="flow-scene-chip community">Community ${p(l)} kWh</span>
              ${v>0?`<span class="flow-scene-chip neutral">Peak ${p(v,2)} kW</span>`:""}
            </div>

            <p class="flow-scene-caption">
              Thicker paths show larger energy volumes for the selected period. Green flows stay in the home, red flows come from the grid, blue flows leave the home or community, and amber shows gas.
            </p>

            ${re()}
            ${ee()}

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${p(S)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${p(f,0)}% of home usage solar-covered${v>0?` · Peak ${p(v,2)} kW`:""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${p(x)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${Z(x)}%;"></span></div>
                  <p>Energy used inside the house${h>0?", including received community energy":""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${p(b)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${Z(b)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${p(g)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${Z(g)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${p(l)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${Z(l)}%;"></span></div>
                  <p>Sent ${p(y)} kWh · received ${p(h)} kWh.</p>
                </div>
                ${i?`
                <div class="mobile-flow-item gas">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Gas to house</span>
                    <strong>${p(c)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${Z(L||_)}%;"></span></div>
                  <p>${u>0?`${p(u)} m3 measured for the same period.`:"Gas meter is configured for this home."}</p>
                </div>
                `:""}
              </div>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${p(x)} kWh directly supplied inside the house</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${p(b)} kWh still needed from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${p(g)} kWh sent back to the market or grid</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${p(y)} kWh sent · ${p(h)} kWh received${h>0?" (included in solar to home)":""}</span>
                </span>
              </div>
              ${i?`
              <div class="flow-legend-item gas">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Gas to house</strong>
                  <span>${p(c)} kWh${u>0?` / ${p(u)} m3`:""}</span>
                </span>
              </div>
              `:""}
            </div>
          </div>
      </div>

      <!-- Key Metrics (right of flow) -->
      <div class="card metrics-card">
        <h3 class="card-title"><span class="title-icon">${de("metrics")}</span> Key Metrics</h3>
        <div class="metrics-list">
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Solar Coverage</span>
              <span class="metric-value">${p(f,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${f}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Consumed</span>
              <span class="metric-value">${p(k)} kWh</span>
            </div>
          </div>
          ${v>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${p(v,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label"><span class="metric-status-icon">${nt}</span> Exceedance</span>
              <span class="metric-value">${p((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${c>0||u>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${p(c)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${p(u)} m³</span>
            </div>
          </div>
          `:""}
        </div>
      </div>
      </div>

      <!-- Chart -->
      <div class="card chart-card">
        <div class="chart-header">
          <h3 class="card-title"><span class="title-icon">${de("profile")}</span> Energy Profile — ${te}</h3>
          <div class="chart-period-status">
            <span class="chart-period-kicker">Showing</span>
            <strong>${Te}</strong>
            <span>${ge.label} detail</span>
          </div>

          <div class="chart-control-stack">
            <div class="chart-period-controls" aria-label="Move chart period">
              <button
                class="chart-nav-btn"
                data-chart-period-nav="prev"
                title="Previous ${ge.stepLabel}"
                aria-label="Previous ${ge.stepLabel}"
              >&larr;</button>
              <span class="chart-period-pill">${Te}</span>
              <button
                class="chart-nav-btn"
                data-chart-period-nav="next"
                title="Next ${ge.stepLabel}"
                aria-label="Next ${ge.stepLabel}"
                ${Oe?'disabled aria-disabled="true"':""}
              >&rarr;</button>
            </div>

            <div class="chart-bucket-toggle" aria-label="Chart detail presets">
              ${st}
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
          ${ye}
        </p>
      </div>

      </div>

      </div>
    </section>
  `}function Da(t=""){return{iso:t,consumptionKw:0,productionKw:0,gridImportKw:0,solarExportKw:0}}function je(t,e,a){for(const s of(e==null?void 0:e.items)??[]){const o=new Date(s.startedAt).getTime();if(!Number.isFinite(o))continue;const n=t.get(o)??Da(s.startedAt);n[a]+=Math.max(0,Number(s.value)||0),n.iso||(n.iso=s.startedAt),t.set(o,n)}}function Wa(t,e,a={}){var r,c,u,v;const s=new Map,o=!!((c=(r=a.gridImport)==null?void 0:r.items)!=null&&c.length),n=!!((v=(u=a.marketExport)==null?void 0:u.items)!=null&&v.length);return je(s,t,"consumptionKw"),je(s,e,"productionKw"),je(s,a.gridImport,"gridImportKw"),je(s,a.marketExport,"solarExportKw"),[...s.entries()].sort((d,m)=>d[0]-m[0]).map(([d,m])=>{const h=Math.max(0,m.consumptionKw),y=Math.max(0,m.productionKw),g=Math.max(0,Math.min(h,y)),$=o?Math.max(0,m.gridImportKw):Math.max(0,h-g),x=Math.max(0,h-$),C=n?Math.max(0,m.solarExportKw):Math.max(0,y-g);return{timestamp:d,iso:m.iso||new Date(d).toISOString(),consumptionKw:h,productionKw:y,solarToHomeKw:x,gridImportKw:$,solarExportKw:C}})}function dt(t,e){return Number.isFinite(t)?Number(t):e}function Fa(t,e){const a=t?t.slice(-8):"";return a?`Solar ${e} (${a})`:`Solar ${e}`}function Qe(t,e,a){return(typeof a=="string"?a.trim():"")||Fa(t,e)}function yt(t){const e=(t.meters??[]).filter(o=>o.types.includes("production")),a=t.feed_in_rates??[],s=t.currency??"EUR";return e.map((o,n)=>{const r=a.find(m=>m.meter_id===o.id),c=(r==null?void 0:r.mode)==="sensor"&&r.sensor_value!=null&&Number.isFinite(r.sensor_value),u=c?(r==null?void 0:r.sensor_value)??0:dt(r==null?void 0:r.tariff,dt(t.feed_in_tariff,0)),v=Math.max(1,Math.round(dt(r==null?void 0:r.self_use_priority,n+1))),d=Qe(o.id,n+1,r==null?void 0:r.display_name);return{meterId:o.id,shortId:o.id?"…"+o.id.slice(-8):`Meter ${n+1}`,displayName:d,rate:u,label:c?`Sensor (${u.toFixed(4)} ${s}/kWh)`:"Fixed tariff",mode:(r==null?void 0:r.mode)??"fixed",selfUsePriority:v}}).sort((o,n)=>o.selfUsePriority!==n.selfUsePriority?o.selfUsePriority-n.selfUsePriority:o.meterId.localeCompare(n.meterId))}function ft(t,e,a,s,o){var i;if(!e||!(a!=null&&a.length))return null;const n=yt(t);if(!n.length)return null;const r=new Map(a.map(l=>[l.meter_id,l]));if(!n.some(l=>r.has(l.meterId)))return null;const c=n.map(l=>({...l,producedKwh:0,selfConsumedKwh:0,exportedKwh:0,revenue:0,exportEquivalentForSelfUse:0})),u=new Map(c.map((l,f)=>[l.meterId,f])),v=new Map,d=new Set;for(const l of e.items)l.startedAt&&d.add(l.startedAt);const m=new Map;for(const l of e.items){const f=Math.max(0,Number(l.value)||0);m.set(l.startedAt,(m.get(l.startedAt)??0)+f)}for(const l of a){const f=new Map;for(const _ of l.items??[]){const L=Math.max(0,Number(_.value)||0);f.set(_.startedAt,(f.get(_.startedAt)??0)+L),_.startedAt&&d.add(_.startedAt)}v.set(l.meter_id,f)}for(const l of[...d].sort()){let f=Math.max(0,m.get(l)??0);for(const _ of c){const L=u.get(_.meterId);if(L==null)continue;const F=Math.max(0,((i=v.get(_.meterId))==null?void 0:i.get(l))??0),P=F*.25,K=Math.min(f,F),A=K*.25,j=Math.max(0,F-K)*.25;c[L].producedKwh+=P,c[L].selfConsumedKwh+=A,c[L].exportedKwh+=j,f=Math.max(0,f-K)}}const h=c.reduce((l,f)=>l+f.selfConsumedKwh,0),y=c.reduce((l,f)=>l+f.exportedKwh,0),g=Math.max(0,s??h),$=Math.max(0,o??y),x=h>0?g/h:1,C=y>0?$/y:1;for(const l of c)l.selfConsumedKwh*=x,l.exportedKwh*=C,l.revenue=l.exportedKwh*l.rate,l.exportEquivalentForSelfUse=l.selfConsumedKwh*l.rate;const k=c.reduce((l,f)=>l+f.revenue,0),b=c.reduce((l,f)=>l+f.exportEquivalentForSelfUse,0),S=$>0?k/$:0;return{meters:c,totalFeedInRevenue:k,totalSelfUseExportEquivalent:b,weightedExportRate:S,usedPriorityAllocation:!0}}const Tt=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],Re={house:"Total Usage",grid:"Net Grid",solar:"Solar Production",exceedance_kwh:"Exceedance kWh",exceedance_frequency:"Exceedance Rate"},ze={house:"Total Usage",grid:"Net Grid",solar:"Solar Production"},Le={previous:"Previous Period",last_year:"Last Year"};function Et(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function La(t){const e=new Date(t),a=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${a}-${s}-${o}`}function Pa(t){const[e,a,s]=t.split("-").map(Number);return new Date(e,a-1,s,12,0,0,0)}function ie(t,e=0){return t.length?Math.max(...t):e}function wt(t,e=0){return t.length?Math.min(...t):e}function be(t,e,a){return Math.min(a,Math.max(e,t))}function O(t,e){if(!t.length)return 0;const a=[...t].sort((u,v)=>u-v),s=be(e,0,1),o=(a.length-1)*s,n=Math.floor(o),r=Math.ceil(o);if(n===r)return a[n];const c=o-n;return a[n]*(1-c)+a[r]*c}function Ka(t){const e=Math.floor(t/4),a=t%4*15;return`${String(e).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function R(t,e){return`${p(t,2)} ${e}`}function tt(t,e){return`${t>0?"+":t<0?"-":""}${p(Math.abs(t),2)} ${e}`}function Xe(t,e=1){return Math.abs(t)<.005?"0":`${t>0?"+":""}${p(t,e)}`}function Dt(t){const[e,a]=t.split(":").map(s=>parseInt(s,10)||0);return e*60+a}function Va(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function jt(t,e,a,s){if(!Va(t.getDay(),e))return!1;const o=t.getHours()*60+t.getMinutes(),n=Dt(a),r=Dt(s);return n===r?!0:n<r?o>=n&&o<r:o>=n||o<r}function Ra(t,e){return e.find(a=>jt(t,a.day_group,a.start_time,a.end_time))}function Ia(t,e){return e.find(a=>jt(t,a.day_group,a.start_time,a.end_time))}function zt(t,e,a,s,o){const n=ft(t,e,a,s,o);if(n&&n.weightedExportRate>0)return n.weightedExportRate;const r=yt(t).map(c=>c.rate).filter(c=>Number.isFinite(c)&&c>=0);return r.length?r.reduce((c,u)=>c+u,0)/r.length:t.feed_in_tariff??0}function Aa(t,e,a,s,o,n){const r=o.consumption_rate_windows??[],c=o.reference_power_windows??[],u=o.reference_power_kw??0,v=(o.exceedance_rate??0)*(1+(o.vat_rate??0));return Wa(t,e,{gridImport:a,marketExport:s}).map(d=>{var _,L;const m=d.timestamp,h=new Date(m),y=d.consumptionKw,g=d.productionKw,$=d.solarToHomeKw,x=d.gridImportKw,C=d.solarExportKw,k=((_=Ia(h,c))==null?void 0:_.reference_power_kw)??u,b=Math.max(0,y-k),S=Math.max(0,x-k),i=Math.max(0,b-S),f=((((L=Ra(h,r))==null?void 0:L.rate)??o.energy_variable_rate??0)+(o.network_variable_rate??0)+(o.electricity_tax_rate??0)+(o.compensation_fund_rate??0))*(1+(o.vat_rate??0));return{timestamp:m,iso:d.iso,date:h,houseKw:y,solarKw:g,solarToHomeKw:$,gridKw:x,exportKw:C,referenceKw:k,overKw:S,avoidedOverKw:i,importRateWithVat:f,feedInRate:n,exceedanceRateWithVat:v}})}function Xt(t,e,a,s,o,n){const r=Aa(t,e,a,s,o,n),c=new Map,u=Array.from({length:24},()=>0),v=Array.from({length:24},(i,l)=>({label:`${String(l).padStart(2,"0")}:00`,importCost:0,exportSpreadValue:0,gridKwh:0,exportKwh:0})),d={house:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),grid:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),solar:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_kwh:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_frequency:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0})))},m=()=>Array.from({length:96},()=>[]),h={house:{weekday:m(),weekend:m()},grid:{weekday:m(),weekend:m()},solar:{weekday:m(),weekend:m()}},y={houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0};for(const i of r){const f=La(i.timestamp),_=c.get(f)??(()=>{const ee=Pa(f);return{key:f,label:ee.toLocaleDateString(void 0,{month:"short",day:"numeric"}),fullDate:ee.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0}})(),L=i.houseKw*.25,F=i.solarKw*.25,P=i.solarToHomeKw*.25,K=i.gridKw*.25,A=i.exportKw*.25,j=i.overKw*.25,J=i.avoidedOverKw*.25,se=K*i.importRateWithVat,Z=P*i.importRateWithVat,Q=A*i.feedInRate,q=P*(i.importRateWithVat-i.feedInRate),ue=j*i.exceedanceRateWithVat,le=J*i.exceedanceRateWithVat,he=Z+Q+le-se-ue;_.houseKwh+=L,_.solarKwh+=F,_.solarToHomeKwh+=P,_.gridKwh+=K,_.exportKwh+=A,_.exceedanceKwh+=j,_.avoidedExceedanceKwh+=J,_.importCost+=se,_.solarSavings+=Z,_.exportRevenue+=Q,_.selfConsumptionAdvantage+=q,_.exceedanceCost+=ue,_.avoidedExceedanceValue+=le,_.netValue+=he,_.peakGridKw=Math.max(_.peakGridKw,i.gridKw),_.peakHouseKw=Math.max(_.peakHouseKw,i.houseKw),_.exceedanceIntervals+=i.overKw>0?1:0,c.set(f,_),y.houseKwh+=L,y.solarKwh+=F,y.solarToHomeKwh+=P,y.gridKwh+=K,y.exportKwh+=A,y.exceedanceKwh+=j,y.avoidedExceedanceKwh+=J,y.importCost+=se,y.solarSavings+=Z,y.exportRevenue+=Q,y.selfConsumptionAdvantage+=q,y.exceedanceCost+=ue,y.avoidedExceedanceValue+=le,y.netValue+=he,y.peakGridKw=Math.max(y.peakGridKw,i.gridKw),y.peakHouseKw=Math.max(y.peakHouseKw,i.houseKw),y.exceedanceIntervals+=i.overKw>0?1:0;const U=(i.date.getDay()+6)%7,I=i.date.getHours(),N=I*4+Math.floor(i.date.getMinutes()/15),re=i.date.getDay()===0||i.date.getDay()===6?"weekend":"weekday";d.house[U][I].sum+=i.houseKw,d.house[U][I].count+=1,d.grid[U][I].sum+=i.gridKw,d.grid[U][I].count+=1,d.solar[U][I].sum+=i.solarKw,d.solar[U][I].count+=1,d.exceedance_kwh[U][I].sum+=j,d.exceedance_kwh[U][I].count+=1,d.exceedance_frequency[U][I].sum+=i.overKw>0?1:0,d.exceedance_frequency[U][I].count+=1,u[I]+=j,h.house[re][N].push(i.houseKw),h.grid[re][N].push(i.gridKw),h.solar[re][N].push(i.solarKw),v[I].importCost+=se,v[I].exportSpreadValue+=A*Math.max(i.importRateWithVat-i.feedInRate,0),v[I].gridKwh+=K,v[I].exportKwh+=A}const g=[...c.values()].sort((i,l)=>i.key.localeCompare(l.key)).map(i=>(i.coveragePct=i.houseKwh>0?i.solarToHomeKwh/i.houseKwh*100:0,i.selfConsumedPct=i.solarKwh>0?be(i.solarToHomeKwh/i.solarKwh*100,0,100):0,i.solarValue=i.solarSavings+i.exportRevenue+i.avoidedExceedanceValue,i));y.coveragePct=y.houseKwh>0?y.solarToHomeKwh/y.houseKwh*100:0,y.selfConsumedPct=y.solarKwh>0?be(y.solarToHomeKwh/y.solarKwh*100,0,100):0,y.solarValue=y.solarSavings+y.exportRevenue+y.avoidedExceedanceValue;const $={house:d.house.map(i=>i.map(l=>l.count?l.sum/l.count:0)),grid:d.grid.map(i=>i.map(l=>l.count?l.sum/l.count:0)),solar:d.solar.map(i=>i.map(l=>l.count?l.sum/l.count:0)),exceedance_kwh:d.exceedance_kwh.map(i=>i.map(l=>l.sum)),exceedance_frequency:d.exceedance_frequency.map(i=>i.map(l=>l.count?l.sum/l.count*100:0))},x=Array.from({length:96},(i,l)=>Ka(l)),C={house:{weekday:{lower:h.house.weekday.map(i=>O(i,.1)),median:h.house.weekday.map(i=>O(i,.5)),upper:h.house.weekday.map(i=>O(i,.9))},weekend:{lower:h.house.weekend.map(i=>O(i,.1)),median:h.house.weekend.map(i=>O(i,.5)),upper:h.house.weekend.map(i=>O(i,.9))}},grid:{weekday:{lower:h.grid.weekday.map(i=>O(i,.1)),median:h.grid.weekday.map(i=>O(i,.5)),upper:h.grid.weekday.map(i=>O(i,.9))},weekend:{lower:h.grid.weekend.map(i=>O(i,.1)),median:h.grid.weekend.map(i=>O(i,.5)),upper:h.grid.weekend.map(i=>O(i,.9))}},solar:{weekday:{lower:h.solar.weekday.map(i=>O(i,.1)),median:h.solar.weekday.map(i=>O(i,.5)),upper:h.solar.weekday.map(i=>O(i,.9))},weekend:{lower:h.solar.weekend.map(i=>O(i,.1)),median:h.solar.weekend.map(i=>O(i,.5)),upper:h.solar.weekend.map(i=>O(i,.9))}}},k=r.filter(i=>i.overKw>0).sort((i,l)=>l.overKw-i.overKw||l.timestamp-i.timestamp).slice(0,8),b=[...r].sort((i,l)=>l.houseKw-i.houseKw||l.timestamp-i.timestamp).slice(0,8),S=[...g].filter(i=>i.exceedanceKwh>0).sort((i,l)=>l.exceedanceKwh-i.exceedanceKwh).slice(0,6);return{points:r,daily:g,totals:y,topExceedances:k,peakIntervals:b,hourlyExceedanceKwh:u,heatmapValues:$,intradayProfiles:C,intradayLabels:x,hourlyOpportunity:v,loadDurationGrossKw:r.map(i=>i.houseKw).sort((i,l)=>l-i),loadDurationNetKw:r.map(i=>i.gridKw).sort((i,l)=>l-i),worstDays:S}}function Ha(t){var e,a,s;return(e=t.rangeData)!=null&&e.start&&((a=t.rangeData)!=null&&a.end)?`${$e(t.rangeData.start)} - ${$e(t.rangeData.end)}`:((s=Ge.find(o=>o.id===t.range))==null?void 0:s.label)??"Selected Period"}function Na(t){var e,a;return(e=t.rangeData)!=null&&e.start&&((a=t.rangeData)!=null&&a.end)?`${Pe(t.rangeData.start)} - ${Pe(t.rangeData.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${t.customStart} - ${t.customEnd}`:"Based on the currently selected range."}function Wt(t){const e=t.analysisComparisonMode==="last_year"?"Same period last year":"Previous matched period";return t.analysisComparison?`${e}: ${Pe(t.analysisComparison.start)} - ${Pe(t.analysisComparison.end)}`:e}function Ga(t){switch(t){case"house":return{description:"Average hourly power by weekday for total house usage.",note:"Each cell shows the average kW seen in that weekday/hour slot over the selected period."};case"grid":return{description:"Average hourly power by weekday for remaining grid draw after solar.",note:"Each cell shows the average net-grid kW seen in that weekday/hour slot over the selected period."};case"solar":return{description:"Average hourly power by weekday for solar production.",note:"Each cell shows the average solar kW seen in that weekday/hour slot over the selected period."};case"exceedance_kwh":return{description:"Cumulative exceedance energy by weekday and hour, showing where the reference limit hurt the most.",note:"Each cell shows cumulative exceedance kWh recorded in that weekday/hour slot over the selected period."};case"exceedance_frequency":return{description:"How often each weekday/hour slot went over the reference limit.",note:"Each cell shows the share of 15-minute intervals in that weekday/hour slot that exceeded the reference limit."}}}function Oa(t,e){switch(t){case"house":case"grid":case"solar":return`${p(e,2)} kW average`;case"exceedance_kwh":return`${p(e,2)} kWh`;case"exceedance_frequency":return`${p(e,0)}% of intervals`}}function pe(t){const e=t.series.filter(f=>f.values.length>0);if(!e.length)return'<div class="analysis-empty">No chart data available for this period.</div>';const a=Math.max(...e.map(f=>f.values.length)),s=Math.max(720,a*24+92),o=244,n=50,r=20,c=18,u=30,v=e.flatMap(f=>f.values);t.referenceValue!=null&&v.push(t.referenceValue);let d=t.minValue??wt(v,0),m=t.maxValue??ie(v,1);d===m&&(m+=1,d=Math.min(0,d-1)),t.minValue==null&&(d=Math.min(0,d));const h=s-n-r,y=o-c-u,g=(f,_)=>_<=1?n+h/2:n+f*h/(_-1),$=f=>c+(m-f)/(m-d)*y,x=t.valueFormatter??(f=>p(f,1)),C=Array.from({length:4},(f,_)=>d+(m-d)/3*_),k=[0,Math.floor((a-1)/2),a-1].filter((f,_,L)=>L.indexOf(f)===_),b=C.map(f=>{const _=$(f);return`
      <line x1="${n}" y1="${_.toFixed(1)}" x2="${(s-r).toFixed(1)}" y2="${_.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${n-8}" y="${(_+4).toFixed(1)}" class="analysis-svg-tick">${x(f)}</text>
    `}).join(""),S=t.referenceValue!=null?(()=>{const f=$(t.referenceValue);return`
        <line x1="${n}" y1="${f.toFixed(1)}" x2="${(s-r).toFixed(1)}" y2="${f.toFixed(1)}" class="analysis-svg-reference" />
        ${t.referenceLabel?`<text x="${s-r}" y="${(f-8).toFixed(1)}" class="analysis-svg-reference-label">${t.referenceLabel}</text>`:""}
      `})():"",i=e.map(f=>{const _=f.values.map((F,P)=>{const K=g(P,f.values.length),A=$(F);return`${P===0?"M":"L"} ${K.toFixed(1)} ${A.toFixed(1)}`}).join(" "),L=f.values.length<=40?f.values.map((F,P)=>{const K=g(P,f.values.length),A=$(F);return`<circle cx="${K.toFixed(1)}" cy="${A.toFixed(1)}" r="2.6" fill="${f.color}" />`}).join(""):"";return`
      <path d="${_}" fill="none" stroke="${f.color}" stroke-width="2.5" ${f.dashed?'stroke-dasharray="6 4"':""} />
      ${L}
    `}).join(""),l=k.map(f=>{const _=g(f,a),L=t.labels[f]??`Point ${f+1}`;return`<text x="${_.toFixed(1)}" y="${o-8}" text-anchor="middle" class="analysis-svg-x-label">${L}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${s}" height="${o}" viewBox="0 0 ${s} ${o}" role="img" aria-label="${t.title??"Line chart"}">
        ${b}
        ${S}
        ${i}
        ${l}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      ${e.map(f=>`
        <span class="analysis-legend-item">
          <span class="analysis-legend-swatch" style="background:${f.color};"></span>
          <span>${f.label}</span>
        </span>
      `).join("")}
      ${t.referenceLabel?`
          <span class="analysis-legend-item">
            <span class="analysis-legend-swatch analysis-legend-swatch-dashed"></span>
            <span>${t.referenceLabel}</span>
          </span>
        `:""}
    </div>
  `}function Ua(t){const e=t.series.filter(l=>l.band.median.length>0);if(!e.length)return'<div class="analysis-empty">No profile data available for this period.</div>';const a=Math.max(...e.map(l=>l.band.median.length)),s=Math.max(760,a*12+92),o=248,n=50,r=20,c=18,u=30,v=e.flatMap(l=>[...l.band.lower,...l.band.median,...l.band.upper]),d=Math.min(0,wt(v,0));let m=ie(v,1);m<=d&&(m=d+1);const h=s-n-r,y=o-c-u,g=(l,f)=>f<=1?n+h/2:n+l*h/(f-1),$=l=>c+(m-l)/(m-d)*y,x=t.valueFormatter??(l=>p(l,1)),C=Array.from({length:4},(l,f)=>d+(m-d)/3*f),k=[0,16,32,48,64,80,a-1].filter((l,f,_)=>l>=0&&l<a&&_.indexOf(l)===f),b=C.map(l=>{const f=$(l);return`
      <line x1="${n}" y1="${f.toFixed(1)}" x2="${(s-r).toFixed(1)}" y2="${f.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${n-8}" y="${(f+4).toFixed(1)}" class="analysis-svg-tick">${x(l)}</text>
    `}).join(""),S=e.map(l=>{const f=l.band.upper.map((F,P)=>{const K=g(P,l.band.upper.length),A=$(F);return`${P===0?"M":"L"} ${K.toFixed(1)} ${A.toFixed(1)}`}).join(" "),_=[...l.band.lower].reverse().map((F,P)=>{const K=l.band.lower.length-1-P,A=g(K,l.band.lower.length),j=$(F);return`L ${A.toFixed(1)} ${j.toFixed(1)}`}).join(" "),L=l.band.median.map((F,P)=>{const K=g(P,l.band.median.length),A=$(F);return`${P===0?"M":"L"} ${K.toFixed(1)} ${A.toFixed(1)}`}).join(" ");return`
      <path d="${f} ${_} Z" fill="${l.fill}" stroke="none" />
      <path d="${L}" fill="none" stroke="${l.color}" stroke-width="2.4" ${l.dashed?'stroke-dasharray="6 4"':""} />
    `}).join(""),i=k.map(l=>{const f=g(l,a),_=t.labels[l]??`Point ${l+1}`;return`<text x="${f.toFixed(1)}" y="${o-8}" text-anchor="middle" class="analysis-svg-x-label">${_}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${s}" height="${o}" viewBox="0 0 ${s} ${o}" role="img" aria-label="${t.title??"Band chart"}">
        ${b}
        ${S}
        ${i}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      ${e.map(l=>`
        <span class="analysis-legend-item">
          <span class="analysis-legend-swatch" style="background:${l.color};"></span>
          <span>${l.label}</span>
        </span>
      `).join("")}
    </div>
  `}function Ba(t){const e=new Date(t.timestamp);return{date:e.toLocaleDateString(void 0,{month:"short",day:"numeric"}),time:e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}}function qa(t){if(!t.length)return'<div class="analysis-empty">No peak intervals available for this period.</div>';const e=Math.max(760,t.length*86+96),a=276,s=52,o=16,n=18,r=54,c=ie(t.map($=>$.houseKw),1),u=e-s-o,v=a-n-r,d=n+v,m=u/t.length,h=Math.max(22,Math.min(38,m*.54)),y=t.map(($,x)=>{const C=s+x*m+(m-h)/2,k=$.solarToHomeKw/c*v,S=Math.max(0,Math.min($.gridKw,$.referenceKw))/c*v,i=Math.max(0,$.gridKw-$.referenceKw)/c*v;return`
      <g>
        <rect x="${C.toFixed(1)}" y="${(d-k).toFixed(1)}" width="${h.toFixed(1)}" height="${k.toFixed(1)}" rx="4" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${C.toFixed(1)}" y="${(d-k-S).toFixed(1)}" width="${h.toFixed(1)}" height="${S.toFixed(1)}" rx="4" fill="rgba(248, 81, 73, 0.62)" />
        ${i>0?`<rect x="${C.toFixed(1)}" y="${(d-k-S-i).toFixed(1)}" width="${h.toFixed(1)}" height="${i.toFixed(1)}" rx="4" fill="rgba(210, 153, 34, 0.92)" />`:""}
      </g>
    `}).join(""),g=t.map(($,x)=>{const C=s+x*m+m/2,{date:k,time:b}=Ba($);return`
      <text x="${C.toFixed(1)}" y="${a-20}" text-anchor="middle" class="analysis-svg-x-label">
        <tspan x="${C.toFixed(1)}" dy="0">${k}</tspan>
        <tspan x="${C.toFixed(1)}" dy="12">${b}</tspan>
      </text>
    `}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${a}" viewBox="0 0 ${e} ${a}" role="img" aria-label="Peak interval anatomy">
        <line x1="${s}" y1="${d.toFixed(1)}" x2="${(e-o).toFixed(1)}" y2="${d.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${s-8}" y="${(n+4).toFixed(1)}" class="analysis-svg-tick">${p(c,1)} kW</text>
        ${y}
        ${g}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.62);"></span><span>Grid within reference</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(210, 153, 34, 0.92);"></span><span>Grid over reference</span></span>
    </div>
  `}function Ya(t){if(!t.length)return'<div class="analysis-empty">No daily energy data available.</div>';const e=Math.max(760,t.length*28+84),a=250,s=52,o=16,n=18,r=34,c=ie(t.map(b=>b.houseKwh),1),u=ie(t.map(b=>b.exportKwh),0),v=e-s-o,d=a-n-r,m=u>0?d*.72:d,h=u>0?d-m:0,y=n+m,g=v/t.length,$=Math.max(8,Math.min(18,g*.62)),x=Math.max(1,Math.ceil(t.length/10)),C=t.map((b,S)=>{const i=s+S*g+(g-$)/2,l=b.solarToHomeKwh/c*m,f=b.gridKwh/c*m,_=u>0?b.exportKwh/u*h:0,L=y-l-f-8;return`
      <g>
        <rect x="${i.toFixed(1)}" y="${(y-l).toFixed(1)}" width="${$.toFixed(1)}" height="${l.toFixed(1)}" rx="3" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${i.toFixed(1)}" y="${(y-l-f).toFixed(1)}" width="${$.toFixed(1)}" height="${f.toFixed(1)}" rx="3" fill="rgba(248, 81, 73, 0.55)" />
        ${_>0?`<rect x="${i.toFixed(1)}" y="${y.toFixed(1)}" width="${$.toFixed(1)}" height="${_.toFixed(1)}" rx="3" fill="rgba(88, 166, 255, 0.75)" />`:""}
        ${b.exceedanceKwh>0?`<circle cx="${(i+$/2).toFixed(1)}" cy="${L.toFixed(1)}" r="3.2" fill="#d29922" />`:""}
      </g>
    `}).join(""),k=t.map((b,S)=>S%x!==0&&S!==t.length-1?"":`<text x="${(s+S*g+g/2).toFixed(1)}" y="${a-10}" text-anchor="middle" class="analysis-svg-x-label">${b.label}</text>`).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${a}" viewBox="0 0 ${e} ${a}" role="img" aria-label="Daily energy breakdown">
        <line x1="${s}" y1="${y.toFixed(1)}" x2="${(e-o).toFixed(1)}" y2="${y.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${s-8}" y="${(n+4).toFixed(1)}" class="analysis-svg-tick">${p(c,0)} kWh</text>
        ${u>0?`<text x="${s-8}" y="${(a-r+4).toFixed(1)}" class="analysis-svg-tick">-${p(u,0)} kWh</text>`:""}
        ${C}
        ${k}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.55);"></span><span>From grid</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span><span>Exported</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:#d29922;"></span><span>Exceedance on that day</span></span>
    </div>
  `}function ja(t,e){const a=be(e,0,1);return t==="solar"?`rgba(63, 185, 80, ${.12+a*.82})`:t==="exceedance_kwh"||t==="exceedance_frequency"?`rgba(210, 153, 34, ${.14+a*.82})`:t==="grid"?`rgba(210, 153, 34, ${.12+a*.82})`:`rgba(248, 81, 73, ${.12+a*.82})`}function za(t,e){const a=t.flat(),s=ie(a,1),o=wt(a,0);return`
    <div class="analysis-heatmap">
      <div class="analysis-heatmap-hours">
        <span class="analysis-heatmap-corner"></span>
        ${Array.from({length:24},(n,r)=>`
          <span class="analysis-heatmap-hour ${r%2===1?"analysis-heatmap-hour-faded":""}">${String(r).padStart(2,"0")}</span>
        `).join("")}
      </div>
      ${t.map((n,r)=>`
        <div class="analysis-heatmap-row">
          <span class="analysis-heatmap-day">${Tt[r]}</span>
          ${n.map((c,u)=>{const v=s===o?0:(c-o)/(s-o);return`
              <span
                class="analysis-heatmap-cell"
                style="background:${ja(e,v)};"
                title="${Tt[r]} ${String(u).padStart(2,"0")}:00 - ${Oa(e,c)}"
              >${c>(e==="exceedance_frequency"?1:.05)?p(c,e==="exceedance_frequency"?0:1):""}</span>
            `}).join("")}
        </div>
      `).join("")}
    </div>
  `}function at(t){const e=ie(t.map(a=>a.value),1);return t.length?`
    <div class="analysis-progress-list">
      ${t.map(a=>`
        <div class="analysis-progress-item">
          <div class="analysis-progress-header">
            <span>${a.label}</span>
            <strong>${a.meta}</strong>
          </div>
          <div class="analysis-progress-track">
            <span class="analysis-progress-fill ${a.colorClass??""}" style="width:${a.value/e*100}%;"></span>
          </div>
        </div>
      `).join("")}
    </div>
  `:'<div class="analysis-empty">No standout patterns in this period.</div>'}function Xa(t){var s,o,n,r;const e=Et(((s=t.rangeData)==null?void 0:s.start)??t.customStart),a=Et(((o=t.rangeData)==null?void 0:o.end)??t.customEnd);return`
    <div class="range-selector">
      ${Ge.map(c=>`
        <button
          class="range-btn ${c.id===t.range?"active":""}"
          data-range="${c.id}"
        >${c.label}</button>
      `).join("")}
    </div>
    ${(n=t.rangeData)!=null&&n.start&&((r=t.rangeData)!=null&&r.end)?`
        <div class="range-info-bar">
          Period: ${Pe(t.rangeData.start)} - ${Pe(t.rangeData.end)}
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
      `:e&&a?`
          <div class="custom-range-picker period-preview">
            <span class="period-preview-label">Viewed period</span>
            <label>
              <span>From</span>
              <input type="date" value="${e}" readonly aria-label="Preset period start" />
            </label>
            <label>
              <span>To</span>
              <input type="date" value="${a}" readonly aria-label="Preset period end" />
            </label>
          </div>
        `:""}
  `}function Za(t,e,a){const s=a.communitySolarToHomeKwh>.01?`${p(a.totalSolarCoverageKwh)} kWh of ${p(a.consumptionKwh)} kWh usage covered, incl. ${p(a.communitySolarToHomeKwh)} kWh shared`:`${p(a.totalSolarCoverageKwh)} kWh of ${p(a.consumptionKwh)} kWh usage covered`;return`
    <div class="analysis-stat-grid">
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Solar Coverage</span>
        <strong class="analysis-stat-value">${p(a.coveragePct,1)}%</strong>
        <span class="analysis-stat-meta">${s}</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Consumed Solar</span>
        <strong class="analysis-stat-value">${p(a.selfConsumedPct,1)}%</strong>
        <span class="analysis-stat-meta">${p(a.directSolarToHomeKwh)} kWh kept from your own solar, ${p(a.exportedKwh)} kWh exported</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Total Solar Value</span>
        <strong class="analysis-stat-value">${R(a.totalSolarValue,e)}</strong>
        <span class="analysis-stat-meta">Savings plus export revenue plus avoided exceedance charges</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Use vs Export</span>
        <strong class="analysis-stat-value">${tt(a.selfConsumptionAdvantage,e)}</strong>
        <span class="analysis-stat-meta">${p(a.directSolarToHomeKwh)} kWh kept on-site instead of exported</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Peak Net Grid</span>
        <strong class="analysis-stat-value">${p(t.totals.peakGridKw,2)} kW</strong>
        <span class="analysis-stat-meta">Compared with ${p(t.totals.peakHouseKw,2)} kW gross house load</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Exceedance Intervals</span>
        <strong class="analysis-stat-value">${p(t.totals.exceedanceIntervals,0)}</strong>
        <span class="analysis-stat-meta">${p(t.totals.exceedanceKwh,2)} kWh above the reference limit</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Variable Import Cost</span>
        <strong class="analysis-stat-value">${R(a.variableImportCost,e)}</strong>
        <span class="analysis-stat-meta">${p(a.billedGridImportKwh)} kWh billed from the grid during the selected period</span>
      </div>
    </div>
  `}function Ja(t){return`
    <div class="card analysis-card analysis-card-full">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Daily Breakdown</h3>
          <p class="analysis-card-copy">House usage is split into solar-covered energy, grid energy, and exported surplus. A gold marker flags days with any reference-power exceedance.</p>
        </div>
      </div>
      ${Ya(t.daily)}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily exceedance volume</h4>
        ${pe({title:"Daily exceedance volume",series:[{label:"Exceedance",color:"#d29922",values:t.daily.map(e=>e.exceedanceKwh)}],labels:t.daily.map(e=>e.label),valueFormatter:e=>`${p(e,2)} kWh`})}
      </div>
    </div>
  `}function Qa(t,e){const a=Ga(t.analysisHeatmapMetric);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Consumption Pattern Heatmap</h3>
          <p class="analysis-card-copy">${a.description}</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${t.analysisHeatmapMetric==="house"?"active":""}" data-analysis-heatmap="house">${Re.house}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="grid"?"active":""}" data-analysis-heatmap="grid">${Re.grid}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="solar"?"active":""}" data-analysis-heatmap="solar">${Re.solar}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="exceedance_kwh"?"active":""}" data-analysis-heatmap="exceedance_kwh">${Re.exceedance_kwh}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="exceedance_frequency"?"active":""}" data-analysis-heatmap="exceedance_frequency">${Re.exceedance_frequency}</button>
        </div>
      </div>
      ${za(e.heatmapValues[t.analysisHeatmapMetric],t.analysisHeatmapMetric)}
      <p class="analysis-note">${a.note}</p>
    </div>
  `}function es(t,e){const a=t.analysisProfileMetric,s=e.intradayProfiles[a],o=ze[a],n=s.weekday.median.reduce((c,u,v,d)=>u>d[c]?v:c,0),r=s.weekend.median.reduce((c,u,v,d)=>u>d[c]?v:c,0);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Intraday Profile</h3>
          <p class="analysis-card-copy">A typical day view for ${o.toLowerCase()}, split between weekdays and weekends. The band shows the p10 to p90 range and the line is the median interval.</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${a==="house"?"active":""}" data-analysis-profile="house">${ze.house}</button>
          <button class="unit-btn ${a==="grid"?"active":""}" data-analysis-profile="grid">${ze.grid}</button>
          <button class="unit-btn ${a==="solar"?"active":""}" data-analysis-profile="solar">${ze.solar}</button>
        </div>
      </div>
      <div class="analysis-inline-metrics">
        <div>
          <span class="analysis-inline-label">Weekday median peak</span>
          <strong>${p(s.weekday.median[n]??0,2)} kW</strong>
          <span class="analysis-stat-meta">${e.intradayLabels[n]??"n/a"}</span>
        </div>
        <div>
          <span class="analysis-inline-label">Weekend median peak</span>
          <strong>${p(s.weekend.median[r]??0,2)} kW</strong>
          <span class="analysis-stat-meta">${e.intradayLabels[r]??"n/a"}</span>
        </div>
      </div>
      ${Ua({title:`${o} intraday profile`,labels:e.intradayLabels,series:[{label:"Weekday median (p10-p90 band)",color:"#58a6ff",fill:"rgba(88, 166, 255, 0.14)",band:s.weekday},{label:"Weekend median (p10-p90 band)",color:"#d29922",fill:"rgba(210, 153, 34, 0.13)",band:s.weekend,dashed:!0}],valueFormatter:c=>`${p(c,1)} kW`})}
      <p class="analysis-note">This makes the typical daily rhythm much easier to read than the weekday/hour heatmap alone.</p>
    </div>
  `}function ts(t,e,a){const s=t.meters.reduce((n,r)=>n+r.selfConsumedKwh*e,0),o=s+t.totalFeedInRevenue;return`
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
            ${t.meters.map(n=>{const r=n.selfConsumedKwh*e,c=r+n.revenue;return`
                <tr>
                  <td>
                    <strong>${n.displayName}</strong>
                    <div class="analysis-stat-meta">${n.shortId} · priority ${n.selfUsePriority}</div>
                  </td>
                  <td>${p(n.rate,4)} ${a}/kWh</td>
                  <td>${p(n.producedKwh)} kWh</td>
                  <td>${p(n.selfConsumedKwh)} kWh</td>
                  <td>${p(n.exportedKwh)} kWh</td>
                  <td>${R(r,a)}</td>
                  <td>${R(n.revenue,a)}</td>
                  <td>${R(c,a)}</td>
                </tr>
              `}).join("")}
            <tr>
              <td><strong>Portfolio subtotal</strong></td>
              <td></td>
              <td>${p(t.meters.reduce((n,r)=>n+r.producedKwh,0))} kWh</td>
              <td>${p(t.meters.reduce((n,r)=>n+r.selfConsumedKwh,0))} kWh</td>
              <td>${p(t.meters.reduce((n,r)=>n+r.exportedKwh,0))} kWh</td>
              <td>${R(s,a)}</td>
              <td>${R(t.totalFeedInRevenue,a)}</td>
              <td>${R(o,a)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="analysis-note">This subtotal includes self-use savings and export revenue. Avoided exceedance value stays only in the overall solar total because it depends on aggregate site load, not a single solar system.</p>
    </div>
  `}function as(t,e,a,s){const o=t.totals.solarKwh>0?be(t.totals.solarToHomeKwh/t.totals.solarKwh*100,0,100):0,n=t.totals.solarKwh>0?be(t.totals.exportKwh/t.totals.solarKwh*100,0,100):0;return`
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
          <strong>${p(t.totals.coveragePct,1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-consumed solar</span>
          <strong>${p(t.totals.selfConsumedPct,1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Solar value</span>
          <strong>${R(t.totals.solarValue,e)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-use vs export</span>
          <strong>${tt(t.totals.selfConsumptionAdvantage,e)}</strong>
        </div>
      </div>
      <div class="analysis-share-bar">
        <span class="analysis-share-segment analysis-share-segment-home" style="width:${o}%;"></span>
        <span class="analysis-share-segment analysis-share-segment-export" style="width:${n}%;"></span>
      </div>
      <div class="analysis-share-legend">
        <span><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span>Self-consumed: ${p(t.totals.solarToHomeKwh)} kWh</span>
        <span><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span>Exported: ${p(t.totals.exportKwh)} kWh</span>
      </div>
      ${a!=null&&a.meters.length?ts(a,s,e):""}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Coverage of house usage by day</h4>
        ${pe({title:"Daily solar coverage",series:[{label:"Coverage",color:"#3fb950",values:t.daily.map(r=>r.coveragePct)}],labels:t.daily.map(r=>r.label),maxValue:100,minValue:0,valueFormatter:r=>`${p(r,0)}%`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day</h4>
        ${pe({title:"Daily solar value",series:[{label:"Solar value",color:"#58a6ff",values:t.daily.map(r=>r.solarValue)}],labels:t.daily.map(r=>r.label),valueFormatter:r=>R(r,e)})}
      </div>
    </div>
  `}function ss(t,e){const a=[...t.hourlyOpportunity].sort((r,c)=>c.importCost-r.importCost)[0],s=[...t.hourlyOpportunity].sort((r,c)=>c.exportSpreadValue-r.exportSpreadValue)[0],o=[...t.hourlyOpportunity].filter(r=>r.importCost>0).sort((r,c)=>c.importCost-r.importCost).slice(0,5).map(r=>({label:r.label,value:r.importCost,meta:`${R(r.importCost,e)} from ${p(r.gridKwh,1)} kWh`})),n=[...t.hourlyOpportunity].filter(r=>r.exportSpreadValue>0).sort((r,c)=>c.exportSpreadValue-r.exportSpreadValue).slice(0,5).map(r=>({label:r.label,value:r.exportSpreadValue,meta:`${R(r.exportSpreadValue,e)} on ${p(r.exportKwh,1)} kWh`,colorClass:"analysis-progress-fill-warn"}));return`
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
          <strong>${R(t.hourlyOpportunity.reduce((r,c)=>r+c.importCost,0),e)}</strong>
          <span class="analysis-stat-meta">Variable import cost grouped by hour of day</span>
        </div>
        <div>
          <span class="analysis-inline-label">Export spread opportunity</span>
          <strong>${R(t.hourlyOpportunity.reduce((r,c)=>r+c.exportSpreadValue,0),e)}</strong>
          <span class="analysis-stat-meta">Approximate value gap between export and local use</span>
        </div>
        <div>
          <span class="analysis-inline-label">Hardest import hour</span>
          <strong>${(a==null?void 0:a.label)??"n/a"}</strong>
          <span class="analysis-stat-meta">${a?R(a.importCost,e):"No import cost recorded"}</span>
        </div>
        <div>
          <span class="analysis-inline-label">Best storage hour</span>
          <strong>${(s==null?void 0:s.label)??"n/a"}</strong>
          <span class="analysis-stat-meta">${s?R(s.exportSpreadValue,e):"No export spread recorded"}</span>
        </div>
      </div>
      ${pe({title:"Hourly tariff opportunity",series:[{label:"Import cost pressure",color:"#f85149",values:t.hourlyOpportunity.map(r=>r.importCost)},{label:"Export spread opportunity",color:"#58a6ff",values:t.hourlyOpportunity.map(r=>r.exportSpreadValue)}],labels:t.hourlyOpportunity.map(r=>r.label),valueFormatter:r=>R(r,e)})}
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Most expensive import hours</h4>
          ${at(o)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Best export-to-storage hours</h4>
          ${at(n)}
        </div>
      </div>
      <p class="analysis-note">Export spread opportunity uses the difference between the import rate and feed-in rate for exported energy in that hour, so it is a directional indicator rather than a billing line item.</p>
    </div>
  `}function rs(t,e){const a=t.hourlyExceedanceKwh.map((s,o)=>({label:`${String(o).padStart(2,"0")}:00`,value:s,meta:`${p(s,2)} kWh`,colorClass:"analysis-progress-fill-warn"})).filter(s=>s.value>0).sort((s,o)=>o.value-s.value).slice(0,6);return`
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
          <strong>${p(t.totals.exceedanceIntervals,0)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Total exceedance</span>
          <strong>${p(t.totals.exceedanceKwh,2)} kWh</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Peak over reference</span>
          <strong>${p(ie(t.topExceedances.map(s=>s.overKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Exceedance cost</span>
          <strong>${R(t.totals.exceedanceCost,e)}</strong>
        </div>
      </div>
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Worst hours</h4>
          ${at(a)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Worst days</h4>
          ${at(t.worstDays.map(s=>({label:s.fullDate,value:s.exceedanceKwh,meta:`${p(s.exceedanceKwh,2)} kWh`,colorClass:"analysis-progress-fill-warn"})))}
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
                  ${t.topExceedances.map(s=>`
                    <tr>
                      <td>${Bt(s.iso)}</td>
                      <td>${p(s.gridKw,2)} kW</td>
                      <td>${p(s.referenceKw,2)} kW</td>
                      <td>${p(s.overKw,2)} kW</td>
                      <td>${p(s.solarKw,2)} kW</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `:'<div class="analysis-empty">No reference exceedance was recorded in this period.</div>'}
      </div>
    </div>
  `}function ns(t){const e=t.peakIntervals.length?t.peakIntervals.reduce((a,s)=>a+(s.houseKw>0?s.solarToHomeKw/s.houseKw*100:0),0)/t.peakIntervals.length:0;return`
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
          <strong>${p(ie(t.peakIntervals.map(a=>a.houseKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Highest net-grid peak</span>
          <strong>${p(ie(t.peakIntervals.map(a=>a.gridKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Solar share across peaks</span>
          <strong>${p(e,0)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Intervals over reference</span>
          <strong>${p(t.peakIntervals.filter(a=>a.overKw>0).length,0)} / ${p(t.peakIntervals.length,0)}</strong>
        </div>
      </div>
      ${qa(t.peakIntervals)}
      <p class="analysis-note">A gold cap only appears when the grid portion of the interval exceeded the configured reference power.</p>
    </div>
  `}function os(t,e,a){var u,v;const s=e.analysisComparisonMode==="last_year"?"Last year":"Previous";if(e.analysisComparisonLoading)return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${Wt(e)}</p>
          </div>
          <div class="chart-unit-toggle">
            <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${Le.previous}</button>
            <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${Le.last_year}</button>
          </div>
        </div>
        <div class="analysis-empty">Loading comparison period...</div>
      </div>
    `;if(!((u=e.analysisComparison)!=null&&u.consumptionTimeseries)||!((v=e.analysisComparison)!=null&&v.productionTimeseries))return`
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
    `;const o=zt(a,e.analysisComparison.consumptionTimeseries,null,void 0,void 0),n=Xt(e.analysisComparison.consumptionTimeseries,e.analysisComparison.productionTimeseries,e.analysisComparison.gridImportTimeseries,e.analysisComparison.marketExportTimeseries,a,o),r=Math.max(t.daily.length,n.daily.length,1),c=Array.from({length:r},(d,m)=>`D${m+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Period Comparison</h3>
          <p class="analysis-card-copy">${Wt(e)}</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${Le.previous}</button>
          <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${Le.last_year}</button>
        </div>
      </div>
      <div class="analysis-compare-grid">
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">House usage</span>
          <strong>${p(t.totals.houseKwh)} kWh</strong>
          <span class="analysis-compare-delta">${Xe(t.totals.houseKwh-n.totals.houseKwh)} kWh vs ${s.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Net grid usage</span>
          <strong>${p(t.totals.gridKwh)} kWh</strong>
          <span class="analysis-compare-delta">${Xe(t.totals.gridKwh-n.totals.gridKwh)} kWh vs ${s.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar coverage</span>
          <strong>${p(t.totals.coveragePct,1)}%</strong>
          <span class="analysis-compare-delta">${Xe(t.totals.coveragePct-n.totals.coveragePct)} pts vs ${s.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar value</span>
          <strong>${R(t.totals.solarValue,a.currency||"EUR")}</strong>
          <span class="analysis-compare-delta">${Xe(t.totals.solarValue-n.totals.solarValue,2)} ${a.currency||"EUR"} vs ${s.toLowerCase()}</span>
        </div>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Usage by day index</h4>
        ${pe({title:`Current versus ${s.toLowerCase()} usage`,series:[{label:"Current",color:"#f85149",values:t.daily.map(d=>d.houseKwh)},{label:s,color:"#58a6ff",values:n.daily.map(d=>d.houseKwh),dashed:!0}],labels:c,valueFormatter:d=>`${p(d,1)} kWh`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day index</h4>
        ${pe({title:`Current versus ${s.toLowerCase()} solar value`,series:[{label:"Current",color:"#3fb950",values:t.daily.map(d=>d.solarValue)},{label:s,color:"#d29922",values:n.daily.map(d=>d.solarValue),dashed:!0}],labels:c,valueFormatter:d=>R(d,a.currency||"EUR")})}
      </div>
    </div>
  `}function is(t,e){return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Tariff-Aware Cost Trends</h3>
          <p class="analysis-card-copy">Estimated variable import cost, solar savings, export earnings, and exceedance cost by day. Fixed monthly fees are intentionally left out so this stays behavior-driven.</p>
        </div>
      </div>
      ${pe({title:"Daily cost and value trends",series:[{label:"Import cost",color:"#f85149",values:t.daily.map(a=>a.importCost)},{label:"Solar savings",color:"#3fb950",values:t.daily.map(a=>a.solarSavings)},{label:"Export earnings",color:"#58a6ff",values:t.daily.map(a=>a.exportRevenue)},{label:"Exceedance cost",color:"#d29922",values:t.daily.map(a=>a.exceedanceCost)}],labels:t.daily.map(a=>a.label),valueFormatter:a=>R(a,e)})}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily net energy value</h4>
        ${pe({title:"Daily net energy value",series:[{label:"Net value",color:"#39c5cf",values:t.daily.map(a=>a.netValue)}],labels:t.daily.map(a=>a.label),referenceValue:0,referenceLabel:"Break-even",valueFormatter:a=>tt(a,e)})}
      </div>
      <div class="analysis-cost-totals">
        <span>Import cost: <strong>${R(t.totals.importCost,e)}</strong></span>
        <span>Solar savings: <strong>${R(t.totals.solarSavings,e)}</strong></span>
        <span>Export earnings: <strong>${R(t.totals.exportRevenue,e)}</strong></span>
        <span>Exceedance cost: <strong>${R(t.totals.exceedanceCost,e)}</strong></span>
        <span>Net value: <strong>${tt(t.totals.netValue,e)}</strong></span>
      </div>
    </div>
  `}function ls(t,e){const a=Array.from({length:Math.max(t.loadDurationGrossKw.length,t.loadDurationNetKw.length,1)},(s,o)=>`${o+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Load Duration Curve</h3>
          <p class="analysis-card-copy">Gross house load and net grid load sorted from highest to lowest interval. This shows how often high demand really occurs and how much solar trims the top end.</p>
        </div>
      </div>
      ${pe({title:"Load duration curve",series:[{label:"Gross house load",color:"#f85149",values:t.loadDurationGrossKw},{label:"Net grid load",color:"#58a6ff",values:t.loadDurationNetKw}],labels:a,referenceValue:e>0?e:void 0,referenceLabel:e>0?`Reference ${p(e,1)} kW`:void 0,valueFormatter:s=>`${p(s,1)} kW`})}
      <p class="analysis-note">Intervals are ordered from highest demand to lowest, so the left side is your hardest-to-handle load.</p>
    </div>
  `}function cs(t){var i,l;const e=t.config,a=t.rangeData,s=t.consumptionTimeseries,o=t.productionTimeseries;if(!e||!a||!s||!o)return`
      <section class="analysis-view">
        <div class="card">
          <p class="muted">Loading analysis data...</p>
        </div>
      </section>
    `;const n=Math.max(0,a.consumption??0),r=Math.max(0,a.production??0),c=Math.max(0,a.exported??0),u=Math.max(0,a.direct_solar_to_home??(a.self_consumed&&a.self_consumed>0?a.self_consumed:0)),v=Math.max(0,(a.grid_import!=null?n-a.grid_import:void 0)??a.solar_to_home??u??(a.self_consumed&&a.self_consumed>0?a.self_consumed:r-c)),d=Math.max(0,a.grid_import??n-v),m=Math.max(0,v-u),h=ft(e,s,((i=t.perMeterProductionTimeseries)==null?void 0:i.meters)??null,u,c),y=zt(e,s,((l=t.perMeterProductionTimeseries)==null?void 0:l.meters)??null,u,c),g=Xt(s,o,t.gridImportTimeseries,t.marketExportTimeseries,e,y),$=e.currency||"EUR",x=((e.energy_variable_rate??0)+(e.network_variable_rate??0)+(e.electricity_tax_rate??0)+(e.compensation_fund_rate??0))*(1+(e.vat_rate??0)),C=u*x,k=h?h.totalSelfUseExportEquivalent:u*y,b=h?h.totalFeedInRevenue:c*y,S={consumptionKwh:n,totalSolarCoverageKwh:v,directSolarToHomeKwh:u,communitySolarToHomeKwh:m,exportedKwh:c,billedGridImportKwh:d,coveragePct:n>0?be(v/n*100,0,100):0,selfConsumedPct:r>0?be(u/r*100,0,100):0,totalSolarValue:C+g.totals.avoidedExceedanceValue+b,selfConsumptionAdvantage:C-k,variableImportCost:d*x};return`
    <section class="analysis-view">
      <div class="section-header analysis-section-header">
        <div>
          <span class="badge">Analysis</span>
          <h2>Charts and Optimization</h2>
          <p class="muted">Deeper electricity analysis for ${Ha(t)}. This page is built from the same 15-minute data and billing settings that drive the dashboard and invoice.</p>
        </div>
        <div class="analysis-header-meta">
          <span>${Na(t)}</span>
          <span>${p(g.daily.length,0)} day${g.daily.length===1?"":"s"} analysed</span>
        </div>
      </div>

      ${Xa(t)}
      ${Za(g,$,S)}
      ${Ja(g)}

      <div class="analysis-grid">
        ${es(t,g)}
        ${Qa(t,g)}
      </div>

      <div class="analysis-grid">
        ${as(g,$,h,x)}
        ${ss(g,$)}
      </div>

      <div class="analysis-grid">
        ${rs(g,$)}
        ${os(g,t,e)}
      </div>

      <div class="analysis-grid">
        ${is(g,$)}
        ${ls(g,e.reference_power_kw??0)}
      </div>

      ${ns(g)}
    </section>
  `}const Ft={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function ds(t){return Ft[t]?Ft[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function ps(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],a=[],s=[],o=[],n=[];for(const c of t.sensors){const u=c.key;u.startsWith("c_")||u==="1-1:1.29.0"||u==="1-1:3.29.0"?e.push(c):u.startsWith("p_")||u==="1-1:2.29.0"||u==="1-1:4.29.0"?a.push(c):u.startsWith("s_")||u.startsWith("1-65:")?s.push(c):u.startsWith("g_")||u.startsWith("7-")?o.push(c):n.push(c)}const r=(c,u,v,d)=>v.length?`
      <div class="card sensor-group">
        <h3 class="card-title"><span class="title-icon">${u}</span> ${c} <span class="badge">${v.length}</span></h3>
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
              ${v.map(m=>`
                <tr>
                  <td class="sensor-name">${ds(m.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${d});">${p(m.value)}</td>
                  <td class="sensor-unit">${m.unit}</td>
                  <td class="sensor-peak">${m.peak_timestamp?Bt(m.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
      ${r("Energy Production","☀️",a,"production")}
      ${r("Energy Sharing","🔗",s,"self")}
      ${r("Gas","🔥",o,"gas")}
      ${r("Other","📊",n,"text")}
    </section>
  `}const Lt=[{kw:3,fixedMonthlyFee:7.42},{kw:7,fixedMonthlyFee:12.84},{kw:12,fixedMonthlyFee:19.61},{kw:17,fixedMonthlyFee:26.39},{kw:27,fixedMonthlyFee:39.94},{kw:43,fixedMonthlyFee:61.62},{kw:70,fixedMonthlyFee:98.2},{kw:100,fixedMonthlyFee:138.85},{kw:150,fixedMonthlyFee:206.6,existingContractsOnly:!0},{kw:200,fixedMonthlyFee:274.35,existingContractsOnly:!0}];function Ze(t){if(!t)return null;const e=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(e){const[,s,o,n]=e;return new Date(Number(s),Number(o)-1,Number(n))}const a=new Date(t);return Number.isNaN(a.getTime())?null:new Date(a.getFullYear(),a.getMonth(),a.getDate())}function Pt(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function us(t,e,a,s,o){const n=new Date,r=Ze(s),c=Ze(o);let u=r,v=c;if(!u||!v)switch(t){case"yesterday":{const g=new Date(n);g.setDate(g.getDate()-1),u=new Date(g.getFullYear(),g.getMonth(),g.getDate()),v=new Date(u);break}case"this_week":{const g=new Date(n),$=g.getDay()||7;u=new Date(g.getFullYear(),g.getMonth(),g.getDate()-$+1),v=new Date(n.getFullYear(),n.getMonth(),n.getDate());break}case"last_week":{const g=new Date(n),$=g.getDay()||7,x=new Date(g.getFullYear(),g.getMonth(),g.getDate()-$+1);u=new Date(x.getFullYear(),x.getMonth(),x.getDate()-7),v=new Date(x.getFullYear(),x.getMonth(),x.getDate()-1);break}case"this_month":{u=new Date(n.getFullYear(),n.getMonth(),1),v=new Date(n.getFullYear(),n.getMonth(),n.getDate());break}case"last_month":{u=new Date(n.getFullYear(),n.getMonth()-1,1),v=new Date(n.getFullYear(),n.getMonth(),0);break}case"this_year":{u=new Date(n.getFullYear(),0,1),v=new Date(n.getFullYear(),n.getMonth(),n.getDate());break}case"last_year":{u=new Date(n.getFullYear()-1,0,1),v=new Date(n.getFullYear()-1,11,31);break}case"custom":{u=Ze(e)??new Date(n.getFullYear(),n.getMonth(),n.getDate()),v=Ze(a)??new Date(u);break}default:{u=new Date(n.getFullYear(),n.getMonth(),n.getDate()-1),v=new Date(u);break}}if(v<u){const g=u;u=v,v=g}let d=0,m=0;const h=new Date(u);for(;h<=v;){const g=new Date(h.getFullYear(),h.getMonth()+1,0).getDate();m+=1/g,d+=1,h.setDate(h.getDate()+1)}const y=u.getFullYear()===v.getFullYear()&&u.getMonth()===v.getMonth()&&u.getDate()===1&&v.getDate()===new Date(v.getFullYear(),v.getMonth()+1,0).getDate();return{days:d,factor:m,label:y?"full month":`${d} day${d===1?"":"s"}`}}function hs(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function Kt(t){const[e,a]=t.split(":").map(s=>parseInt(s,10)||0);return e*60+a}function Zt(t,e,a,s){if(!hs(t.getDay(),e))return!1;const o=t.getHours()*60+t.getMinutes(),n=Kt(a),r=Kt(s);return n===r?!0:n<r?o>=n&&o<r:o>=n||o<r}function ms(t,e){return e.find(a=>Zt(t,a.day_group,a.start_time,a.end_time))}function gs(t,e){return e.find(a=>Zt(t,a.day_group,a.start_time,a.end_time))}function Vt(t,e,a,s,o,n=[]){var y;const r=new Map;let c=0,u=0,v=0,d=0,m=0;const h=new Map;for(const g of n){const $=Number(g.value)||0;h.set(g.startedAt,(h.get(g.startedAt)??0)+$)}for(const g of t){const $=Number(g.value)||0,x=$*.25,C=h.get(g.startedAt)??0,k=Math.max(0,$-C),b=new Date(g.startedAt);if(Number.isNaN(b.getTime()))continue;const S=ms(b,s),i=gs(b,o),l=(S==null?void 0:S.rate)??e,f=((y=S==null?void 0:S.label)==null?void 0:y.trim())||"Base tariff",_=(i==null?void 0:i.reference_power_kw)??a;c+=x*l,m=Math.max(m,$),d=Math.max(d,k),$>_&&(v+=($-_)*.25),k>_&&(u+=(k-_)*.25);const L=`${f}__${l}`,F=r.get(L);F?F.kwh+=x:r.set(L,{label:f,rate:l,kwh:x})}return{energyCost:c,exceedanceKwh:u,grossExceedanceKwh:v,avoidedExceedanceKwh:Math.max(0,v-u),peakPowerKw:d,grossPeakPowerKw:m,rateBreakdown:Array.from(r.values()).sort((g,$)=>g.label.localeCompare($.label))}}function vs(t){var bt,_t;const e=t.config,a=t.rangeData;if(!e||!a)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const s=a.consumption||0,o=a.production||0,n=a.exported||0,r=Math.max(0,n),c=Math.max(0,(a.grid_import!=null?s-a.grid_import:void 0)??a.solar_to_home??a.direct_solar_to_home??(a.self_consumed&&a.self_consumed>0?a.self_consumed:o-r)),u=Math.min(c,Math.max(0,a.direct_solar_to_home??(a.self_consumed&&a.self_consumed>0?a.self_consumed:o-r))),v=Math.max(0,c-u),d=Math.max(0,a.grid_import??s-c),m=a.peak_power_kw||0,h=e.reference_power_kw||5,y=a.exceedance_kwh||0,g=a.gas_energy||0,$=a.gas_volume||0,x=g>0||$>0,C=e.consumption_rate_windows??[],k=e.reference_power_windows??[],b=t.consumptionTimeseries?Vt(t.consumptionTimeseries.items,e.energy_variable_rate,h,C,k,((bt=t.productionTimeseries)==null?void 0:bt.items)??[]):null,S=C.length>0&&!!b&&Math.abs(d-s)<.01,i=k.length>0&&!!b,l=b?b.peakPowerKw:m,f=b?b.exceedanceKwh:y,_=Pt(a.start??t.customStart),L=Pt(a.end??t.customEnd),{days:F,factor:P,label:K}=us(t.range,t.customStart,t.customEnd,a.start,a.end),A=e.energy_fixed_fee*P,j=e.network_metering_rate*P,J=e.network_power_ref_rate*P,se=S?b.energyCost:d*e.energy_variable_rate,Z=d*e.network_variable_rate,Q=f*e.exceedance_rate,q=e.meter_monthly_fees??[],ue=q.reduce((w,H)=>w+(H.fee||0),0)*P,le=d*e.compensation_fund_rate,he=d*e.electricity_tax_rate,U=Math.max(0,e.connect_discount??0)*P,I=A+se+j+J+Z+Q+ue+le+he-U,N=I*e.vat_rate,re=I+N,ee=yt(e),te=ft(e,t.consumptionTimeseries,((_t=t.perMeterProductionTimeseries)==null?void 0:_t.meters)??null,u,r),_e=ee.filter(w=>isFinite(w.rate)&&w.rate>0),Y=ee.length>1,me=te?te.weightedExportRate:_e.length>0?_e.reduce((w,H)=>w+H.rate,0)/_e.length:e.feed_in_tariff,ae=te?te.totalFeedInRevenue:r*me,ge=Y&&ee.length>0?r/ee.length:r,Te=te?te.meters:ee.map(w=>({...w,producedKwh:0,exportedKwh:ge,revenue:ge*w.rate,selfConsumedKwh:0,exportEquivalentForSelfUse:0})),ve=!!te,z=u,Oe=e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate,st=Oe*(1+e.vat_rate),Ue=z*Oe,rt=Ue*e.vat_rate,ye=Ue+rt,nt=te?te.totalSelfUseExportEquivalent:z*me,Ke=ye-nt,fe=Math.max(0,(b==null?void 0:b.avoidedExceedanceKwh)??0),Ee=fe*e.exceedance_rate,Ve=Ee*e.vat_rate,we=Ee+Ve,xe=fe>1e-4,ke=ye+we+ae,De=Te.map(w=>{const H=w.selfConsumedKwh*st,Ce=H-w.exportEquivalentForSelfUse;return{...w,selfUseSavings:H,selfUseVsExport:Ce,totalTrackedValue:H+w.revenue}}),M=ve&&De.length>0,E=re-ae,D=(e.gas_fixed_fee??6.5)*P,G=g*(e.gas_variable_rate??.055),B=(e.gas_network_fee??4.8)*P,Me=g*(e.gas_network_variable_rate??.012),ne=g*(e.gas_tax_rate??.001),oe=D+G+B+Me+ne,We=oe*(e.gas_vat_rate??.08),Be=oe+We,V=e.currency||"EUR",T=w=>`${p(w,2)} ${V}`,ot=w=>`${w>0?"+":w<0?"-":""}${p(Math.abs(w),2)} ${V}`,W=w=>p(w,3),$t=w=>p(w,3),aa=w=>w>=0?"comparison-delta-savings":"comparison-delta-extra",sa=M?`
            <tr class="section-label"><td colspan="3">Per-System Self-Use vs Export</td></tr>
            ${De.map(w=>`
            <tr>
              <td>${w.displayName}</td>
              <td style="text-align: right;">
                ${w.shortId}<br/>
                Produced ${W(w.producedKwh)} kWh<br/>
                Kept on-site ${W(w.selfConsumedKwh)} kWh<br/>
                Sold ${W(w.exportedKwh)} kWh<br/>
                ${w.label} ${p(w.rate,4)} ${V}/kWh${Y?`<br/>Self-use priority ${w.selfUsePriority}`:""}
              </td>
              <td style="text-align: right;">
                <strong>${T(w.totalTrackedValue)}</strong><br/>
                <span class="${aa(w.selfUseVsExport)}">${ot(w.selfUseVsExport)}</span> self-use vs export<br/>
                <span class="muted">${T(w.selfUseSavings)} kept value + ${T(w.revenue)} sold</span>
              </td>
            </tr>
            `).join("")}
            <tr class="subtotal-row">
              <td colspan="2"><strong>Tracked per-system value</strong></td>
              <td style="text-align: right;"><strong>${T(De.reduce((w,H)=>w+H.totalTrackedValue,0))}</strong></td>
            </tr>
      `:"",ra=ve?`Compared with exporting the same ${W(z)} kWh using the configured PV self-use priority and each system's own feed-in tariff`:`Compared with selling the same ${W(z)} kWh at ${p(me,4)} ${V}/kWh`,it=Lt.find(w=>Math.abs(w.kw-h)<.05),na=I-J-Q,lt=b?Lt.map(w=>{var kt;const H=Vt(t.consumptionTimeseries.items,e.energy_variable_rate,w.kw,C,k,((kt=t.productionTimeseries)==null?void 0:kt.items)??[]),Ce=w.fixedMonthlyFee*P,Ye=H.exceedanceKwh*e.exceedance_rate,xt=(na+Ce+Ye)*(1+e.vat_rate);return{...w,fixedCharge:Ce,exceedanceKwh:H.exceedanceKwh,exceedanceCharge:Ye,total:xt,deltaVsCurrent:xt-re}}):[],qe=lt.reduce((w,H)=>!w||H.total<w.total?H:w,null),oa=w=>Math.abs(w)<.005?"Current total":`${w>0?"+":"-"}${T(Math.abs(w))}`,ct=a.start&&a.end?`${$e(a.start)} — ${$e(a.end)}`:t.range.replace("_"," ").replace(/\b\w/g,w=>w.toUpperCase()),ia=f>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${p(l,1)} kW</strong> &mdash; ${i?"Reference power windows active":`Reference power level: ${p(h,1)} kW`}</p>
        <p>Exceedance volume: <strong>${W(f)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${T(Q)}</p>
      </div>`:"",la=S?b.rateBreakdown.map(w=>`
            <tr>
              <td>${w.label} (${W(w.kwh)} kWh)</td>
              <td style="text-align: right;">${p(w.rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(w.kwh*w.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Supplier rate (${W(d)} kWh bought from grid)</td>
              <td style="text-align: right;">${p(e.energy_variable_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(se)}</td>
            </tr>
          `,ca=i?`Reference power windows active (${k.length})`:`${p(h,1)} kW`,da=S?`Time-of-use windows active (${C.length})`:`${p(e.energy_variable_rate,4)} ${V}/kWh`,pa=lt.map(w=>{const H=!!qe&&w.kw===qe.kw,Ce=!!it&&w.kw===it.kw,Ye=w.deltaVsCurrent<-.005?"comparison-delta-savings":w.deltaVsCurrent>.005?"comparison-delta-extra":"";return`
            <tr class="${H?"reference-power-best-row":""}${Ce?" reference-power-current-row":""}">
              <td>
                <div class="reference-level-cell">
                  <span class="reference-level-kw">${p(w.kw,0)} kW</span>
                  ${H?'<span class="reference-level-badge best">Financially optimal</span>':""}
                  ${Ce?'<span class="reference-level-badge current">Current</span>':""}
                  ${w.existingContractsOnly?'<span class="reference-level-badge legacy">Existing contracts</span>':""}
                </div>
              </td>
              <td style="text-align: right;">${T(w.fixedCharge)}</td>
              <td style="text-align: right;">${T(w.exceedanceCharge)}</td>
              <td style="text-align: right;"><strong>${T(w.total)}</strong></td>
              <td class="${Ye}" style="text-align: right;">${oa(w.deltaVsCurrent)}</td>
            </tr>
          `}).join(""),ua=lt.length>0?`
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${i?"Configured reference power windows stay active in this comparison.":"One reference power level is applied to the full selected period."}
              ${it?"":`Your current configuration uses ${p(h,1)} kW, which is outside the standard Creos low-voltage reference power levels.`}
            </p>
          </div>
          ${qe?`<div class="reference-power-optimum">
                <span class="reference-level-badge best">Financially optimal: ${p(qe.kw,0)} kW</span>
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
            ${pa}
          </tbody>
        </table>
      </div>
    `:`
      <div class="card reference-power-card">
        <p class="muted">Reference power level comparison requires 15-minute load-curve data for the selected period.</p>
      </div>
    `,ha=`
      <div class="range-selector">
        ${Ge.map(w=>`
          <button
            class="range-btn ${w.id===t.range?"active":""}"
            data-range="${w.id}"
          >${w.label}</button>
        `).join("")}
      </div>
    `,ma=a.start&&a.end?(()=>{const w=new Date(a.start),H=new Date(a.end);return Number.isNaN(w.getTime())||Number.isNaN(H.getTime())?"":`
        <div class="range-info-bar">
          Period: ${w.toLocaleDateString()} - ${H.toLocaleDateString()}
        </div>
      `})():"",ga=t.range==="custom"?`
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
    `:_&&L?`
        <div class="custom-range-picker period-preview">
          <span class="period-preview-label">Viewed period</span>
          <label>
            <span>From</span>
            <input type="date" value="${_}" readonly aria-label="Preset period start" />
          </label>
          <label>
            <span>To</span>
            <input type="date" value="${L}" readonly aria-label="Preset period end" />
          </label>
        </div>
      `:"";return`
    <section class="invoice-view">
      ${ha}
      ${ma}
      ${ga}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Supplier Bill Estimate &mdash; ${ct}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the selected period. Feed-in revenue and net position are shown separately.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${W(s)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${W(d)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${W(o)} kWh produced</span>
          ${r>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${W(r)} kWh exported</span>`:""}
          ${x?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${W(g)} kWh gas (${$t($)} m³)</span>`:""}
        </div>
      </div>

      ${ia}

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
              <td>Fixed Fee <span class="muted">(${K})</span></td>
              <td style="text-align: right;">${p(e.energy_fixed_fee,2)} ${V}/mo</td>
              <td style="text-align: right;">${T(A)}</td>
            </tr>
            ${la}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${K})</span></td>
              <td style="text-align: right;">${p(e.network_metering_rate,2)} ${V}/mo</td>
              <td style="text-align: right;">${T(j)}</td>
            </tr>
            <tr>
              <td>Reference power level (${ca}) <span class="muted">(${K})</span></td>
              <td style="text-align: right;">${p(e.network_power_ref_rate,2)} ${V}/mo</td>
              <td style="text-align: right;">${T(J)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${W(d)} kWh bought from grid)</td>
              <td style="text-align: right;">${p(e.network_variable_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(Z)}</td>
            </tr>
            <tr class="${f>0?"exceedance-row":""}">
              <td>Exceedance charge (${W(f)} kWh above the reference power level)</td>
              <td style="text-align: right;">${p(e.exceedance_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(Q)}</td>
            </tr>

            ${q.filter(w=>w.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${q.filter(w=>w.fee>0).map(w=>`
            <tr>
              <td>${w.label||"…"+w.meter_id.slice(-8)} <span class="muted">(${K})</span></td>
              <td style="text-align: right;">${p(w.fee,2)} ${V}/mo</td>
              <td style="text-align: right;">${T(w.fee*P)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${p(e.compensation_fund_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(le)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${p(e.electricity_tax_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(he)}</td>
            </tr>
            ${U>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            <tr>
              <td>Monthly Discount <span class="muted">(${K})</span></td>
              <td style="text-align: right;">-${p(Math.max(0,e.connect_discount??0),2)} ${V}/mo</td>
              <td style="text-align: right;">-${T(U)}</td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(I)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${p(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(N)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Supplier Bill Estimate</strong></td>
              <td style="text-align: right;"><strong>${T(re)}</strong></td>
            </tr>

            ${o>0?`
            <tr class="section-label revenue-section"><td colspan="3">Solar Value & Feed-in Revenue</td></tr>
            <tr class="revenue-row">
              <td>Solar produced</td>
              <td style="text-align: right;">Total generation during this period</td>
              <td style="text-align: right;">${W(o)} kWh</td>
            </tr>
            <tr class="revenue-row">
              <td>Own solar used at home</td>
              <td style="text-align: right;">${W(z)} kWh from your own production avoided grid purchases</td>
              <td style="text-align: right;">${T(ye)} saved</td>
            </tr>
            ${v>0?`
            <tr class="revenue-row">
              <td>Additional solar received</td>
              <td style="text-align: right;">${W(v)} kWh covered at home from shared/community solar</td>
              <td style="text-align: right;">Informational</td>
            </tr>
            `:""}
            <tr class="revenue-row">
              <td>Export sold</td>
              <td style="text-align: right;">${W(r)} kWh sent to grid</td>
              <td style="text-align: right;">${T(ae)} earned</td>
            </tr>
            ${xe?`
            <tr class="revenue-row">
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${W(fe)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${T(we)} saved</td>
            </tr>
            `:""}
            ${r>0?`
            <tr class="section-label"><td colspan="3">Credit Calculation</td></tr>
            ${Te.map(w=>`
            <tr class="revenue-row">
              <td>Exported (${Y?w.displayName:W(w.exportedKwh)+" kWh"})</td>
              <td style="text-align: right;">${Y?`${w.shortId}<br/>`:""}${W(w.exportedKwh)} kWh<br/>${w.label}<br/>${p(w.rate,4)} ${V}/kWh${ve&&Y?`<br/>Self-use priority ${w.selfUsePriority}`:""}</td>
              <td class="revenue-amount" style="text-align: right;">-${T(w.revenue)}</td>
            </tr>
            `).join("")}
            ${Y?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${W(r)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${p(me,4)} ${V}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${T(ae)}</td>
            </tr>
            `:""}
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total Solar Value</strong></td>
              <td style="text-align: right;"><strong>${T(ke)}</strong></td>
            </tr>
            <tr class="net-total-row">
              <td colspan="2"><strong>Net Electricity Position</strong></td>
              <td style="text-align: right;"><strong>${T(E)}</strong></td>
            </tr>
            `:""}
            ${r<=0?`
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total Solar Value</strong></td>
              <td style="text-align: right;"><strong>${T(ke)}</strong></td>
            </tr>
            `:""}
            `:""}
          </tbody>
        </table>
      </div>

      ${ua}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Supplier bill estimate: ${T(re)}</strong>${ae>0?` Feed-in revenue is shown separately as ${T(ae)}, giving a net electricity position of ${T(E)} after export credit.`:""}
          <br/>
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${W(d)} kWh), not total home usage.
          Supplier pricing: ${da}.
          Fixed monthly charges are prorated across the viewed period (${F} days, ${K}, equivalent to ${p(P,2)} monthly charges).
          Peak load (${p(l,1)} kW) is compared against ${i?"your configured reference power windows":`your reference power level (${p(h,1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${p(e.exceedance_rate,4)} ${V}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${x?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${ct}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${W(g)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${$t($)} m³</span>
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
              <td>Fixed Fee <span class="muted">(${K})</span></td>
              <td style="text-align: right;">${p(e.gas_fixed_fee??6.5,2)} ${V}/mo</td>
              <td style="text-align: right;">${T(D)}</td>
            </tr>
            <tr>
              <td>Energy (${W(g)} kWh)</td>
              <td style="text-align: right;">${p(e.gas_variable_rate??.055,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(G)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${K})</span></td>
              <td style="text-align: right;">${p(e.gas_network_fee??4.8,2)} ${V}/mo</td>
              <td style="text-align: right;">${T(B)}</td>
            </tr>
            <tr>
              <td>Network Variable (${W(g)} kWh)</td>
              <td style="text-align: right;">${p(e.gas_network_variable_rate??.012,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(Me)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${W(g)} kWh)</td>
              <td style="text-align: right;">${p(e.gas_tax_rate??.001,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(ne)}</td>
            </tr>

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(oe)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${p((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${T(We)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${T(Be)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Net Energy Position: ${T(E+Be)}</strong>
          (Electricity net position: ${T(E)} + Gas supplier estimate: ${T(Be)})
        </p>
      </div>
      `:""}

      ${o>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Value &mdash; ${ct}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${T(ke)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${W(o)} kWh</div>
            <div class="solar-stat-label">Solar produced</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${T(ye)}</div>
            <div class="solar-stat-label">Saved by using ${W(z)} kWh of your own solar at home</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${ot(Ke)}</div>
            <div class="solar-stat-label">Extra value from using it yourself instead of selling it</div>
          </div>
          ${xe?`
          <div class="solar-stat">
            <div class="solar-stat-value">${T(we)}</div>
            <div class="solar-stat-label">Saved by staying under the reference power</div>
          </div>
          `:""}
          <div class="solar-stat">
            <div class="solar-stat-value">${T(ae)}</div>
            <div class="solar-stat-label">Earned by selling ${W(r)} kWh</div>
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
              <td style="text-align: right;">${W(o)} kWh</td>
            </tr>
            <tr>
              <td>Own solar used at home</td>
              <td style="text-align: right;">${W(z)} kWh from your own production avoided grid purchases</td>
              <td style="text-align: right;">${T(ye)} saved</td>
            </tr>
            ${v>0?`
            <tr>
              <td>Additional solar received</td>
              <td style="text-align: right;">${W(v)} kWh covered at home from shared/community solar</td>
              <td style="text-align: right;">Informational</td>
            </tr>
            `:""}
            <tr>
              <td>Extra vs exporting instead</td>
              <td style="text-align: right;">${ra}</td>
              <td style="text-align: right;">${ot(Ke)}</td>
            </tr>
            <tr>
              <td>Export sold</td>
              <td style="text-align: right;">${W(r)} kWh sent to grid</td>
              <td style="text-align: right;">${T(ae)} earned</td>
            </tr>
            ${xe?`
            <tr>
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${W(fe)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${T(we)} saved</td>
            </tr>
            `:""}

            ${sa}

            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${W(z)} kWh)</td>
              <td style="text-align: right;">${p(e.energy_variable_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(z*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${p(e.network_variable_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(z*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${p(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(z*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${p(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(rt)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${T(ye)}</strong></td>
            </tr>

            ${xe?`
            <tr class="section-label"><td colspan="3">Reference Power Savings</td></tr>
            <tr>
              <td>Exceedance avoided</td>
              <td style="text-align: right;">${W(fe)} kWh above the reference power level</td>
              <td style="text-align: right;">${T(Ee)}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${p(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(Ve)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Reference Power Savings</strong></td>
              <td style="text-align: right;"><strong>${T(we)}</strong></td>
            </tr>
            `:""}

            ${r>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${Te.map(w=>`
            <tr>
              <td>Sold to grid ${Y?`(${w.displayName})`:`(${W(w.exportedKwh)} kWh)`}</td>
              <td style="text-align: right;">${Y?`${w.shortId}<br/>`:""}${W(w.exportedKwh)} kWh<br/>${w.label}<br/>${p(w.rate,4)} ${V}/kWh${ve&&Y?`<br/>Self-use priority ${w.selfUsePriority}`:""}</td>
              <td style="text-align: right;">${T(w.revenue)}</td>
            </tr>
            `).join("")}
            ${Y?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${T(ae)}</strong></td>
            </tr>
            `:""}
            `:""}

            <tr class="total-row solar-total-row">
              <td colspan="2"><strong>💰 Total Solar Panel Value</strong></td>
              <td style="text-align: right;"><strong>${T(ke)}</strong></td>
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
          ${ee.some(w=>w.mode==="sensor")?"Market price sourced from Home Assistant sensor.":"Using fixed feed-in tariff — configure a market price sensor in Settings for real-time rates."}
          ${ve?"Per-system self-consumption and export are allocated from each PV system's 15-minute production using the configured self-use priority (1 = consumed first at home).":Y?"Displayed per-meter feed-in kWh are currently equal-split estimates because per-meter production data was not available for this view.":""}
        </p>
      </div>
      `:""}
    </section>
  `}const ys=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],fs=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Reference Power Fixed Charge",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"connect_discount",label:"Monthly Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],ws={consumption:"Power Consumption",production:"Power Production",gas:"Gas Consumption"},Jt={consumption:"⚡",production:"☀️",gas:"🔥"};function $s(t){return t.map(e=>`<span class="meter-type-badge meter-type-${e}">${Jt[e]??""} ${ws[e]??e}</span>`).join(" ")}function Rt(t,e,a){const s=t+1;return a?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${s}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${$s(e.types)}</div>
      </div>
    `:`
    <div class="meter-card">
      <div class="meter-header">
        <strong>Meter ${s}</strong>
        ${s>1?`<button type="button" class="btn-icon remove-meter-btn" data-meter="${t}" title="Remove meter">&times;</button>`:""}
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
          <label class="meter-type-cb">
            <input type="checkbox" name="meter_${t}_consumption" ${e.types.includes("consumption")?"checked":""} />
            <span>⚡ Power Consumption</span>
          </label>
          <label class="meter-type-cb">
            <input type="checkbox" name="meter_${t}_production" ${e.types.includes("production")?"checked":""} />
            <span>☀️ Power Production</span>
          </label>
          <label class="meter-type-cb">
            <input type="checkbox" name="meter_${t}_gas" ${e.types.includes("gas")?"checked":""} />
            <span>🔥 Gas Consumption</span>
          </label>
        </div>
      </div>
    </div>
  `}function Qt(t){return ys.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function bs(t,e){return`
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
            ${Qt(e.day_group??"all")}
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
  `}function _s(t,e){return`
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
            ${Qt(e.day_group??"all")}
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
  `}function xs(t,e="ha",a){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const s=e==="standalone"?(a==null?void 0:a.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let o="";if(e==="standalone"){const i=s.map((f,_)=>Rt(_,f,!1)).join("");a==null||a.proxy_url,o=`
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
                  value="${(a==null?void 0:a.api_key)??""}"
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
                  value="${(a==null?void 0:a.energy_id)??""}"
                  placeholder="e.g. LU-123-456-789"
                />
              </div>
            </div>
            
          </div>

          <div class="form-section">
            <div class="form-section-title">📊  Metering Points</div>
            <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
              For each meter, select what it measures. A single bidirectional meter can handle both consumption and production.
            </p>
            <div id="meters-container">
              ${i}
            </div>
            ${s.length<10?`
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
    `}else{const i=(t==null?void 0:t.meters)??[];o=`
      <div class="card" style="margin-bottom: var(--sp-6); padding: var(--sp-4) var(--sp-5);">
        <p class="muted" style="margin: 0 0 var(--sp-3) 0;">🔒 API credentials are managed through Home Assistant &rarr; Settings &rarr; Integrations &rarr; Leneda</p>
        <div class="form-section">
          <div class="form-section-title">📊  Configured Metering Points</div>
          <div id="meters-container">
            ${i.length>0?i.map((f,_)=>Rt(_,f,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const n=i=>i.map(l=>{const f=t?t[l.key]??"":"";return`
        <div class="form-row">
          <label for="cfg-${l.key}">${l.label}</label>
          <div class="input-group">
            <input
              id="cfg-${l.key}"
              name="${l.key}"
              type="${l.type}"
              ${l.type==="number"?`step="${l.step}"`:""}
              value="${f}"
            />
            ${l.unit?`<span class="input-unit">${l.unit}</span>`:""}
          </div>
        </div>
      `}).join(""),r=((t==null?void 0:t.meters)??[]).filter(i=>i.types.includes("production")),c=(t==null?void 0:t.feed_in_rates)??[],u=e==="ha";function v(i){return c.find(l=>l.meter_id===i)??{meter_id:i,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:"",display_name:"",self_use_priority:r.findIndex(l=>l.id===i)+1}}const d=r.length===0?'<p class="muted">No production meters configured — add a meter with Power Production type above.</p>':r.map((i,l)=>{const f=v(i.id),_=i.id?"…"+i.id.slice(-8):`Meter ${l+1}`,L=Qe(i.id,l+1,f.display_name);return`
          <div class="feed-in-meter-card" data-meter-idx="${l}" data-meter-id="${i.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${L}</span>
              <code style="font-size: var(--text-sm);">${_}</code>
              <input type="hidden" name="feed_in_rate_${l}_meter_id" value="${i.id}" />
            </div>
            <div class="form-row">
              <label for="cfg-feed_in_rate_${l}_display_name">System Name</label>
              <div class="input-group">
                <input
                  id="cfg-feed_in_rate_${l}_display_name"
                  name="feed_in_rate_${l}_display_name"
                  type="text"
                  value="${f.display_name??""}"
                  placeholder="${Qe(i.id,l+1)}"
                />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-feed_in_rate_${l}_priority">Self-use Priority</label>
              <div class="input-group">
                <input
                  id="cfg-feed_in_rate_${l}_priority"
                  name="feed_in_rate_${l}_self_use_priority"
                  type="number"
                  min="1"
                  step="1"
                  value="${f.self_use_priority??l+1}"
                />
                <span class="input-unit">1 = used first at home</span>
              </div>
              <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                Leave blank to use ${Qe(i.id,l+1)}.
              </p>
            </div>
            <div class="form-row">
              <label>Pricing Mode</label>
              <div class="feed-in-mode-toggle">
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${l}_mode" value="fixed" ${f.mode==="fixed"?"checked":""} />
                  <span class="mode-label">💶 Fixed Tariff</span>
                </label>
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${l}_mode" value="sensor" ${f.mode==="sensor"?"checked":""} />
                  <span class="mode-label">📡 HA Sensor</span>
                </label>
              </div>
            </div>
            <div class="feed-in-fixed-fields" data-rate-idx="${l}" style="${f.mode==="fixed"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${l}_tariff">Feed-in Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${l}_tariff" name="feed_in_rate_${l}_tariff" type="number" step="0.0001" value="${f.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
              </div>
            </div>
            <div class="feed-in-sensor-fields" data-rate-idx="${l}" style="${f.mode==="sensor"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${l}_sensor">Market Price Sensor</label>
                <div class="input-group sensor-picker-group">
                  <input
                    id="cfg-feed_in_rate_${l}_sensor"
                    name="feed_in_rate_${l}_sensor_entity"
                    type="text"
                    value="${f.sensor_entity}"
                    placeholder="${u?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${u&&l===0?'<datalist id="ha-entity-list"></datalist>':""}
              </div>
              <div class="form-row">
                <label for="cfg-feed_in_rate_${l}_fallback">Fallback Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${l}_fallback" name="feed_in_rate_${l}_fallback_tariff" type="number" step="0.0001" value="${f.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
                <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                  Used when the sensor is unavailable.
                </p>
              </div>
            </div>
          </div>
        `}).join(""),m=((t==null?void 0:t.meters)??[]).some(i=>i.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),h=(t==null?void 0:t.consumption_rate_windows)??[],y=(t==null?void 0:t.reference_power_windows)??[],g=(t==null?void 0:t.meters)??[],$=(t==null?void 0:t.meter_monthly_fees)??[];function x(i){return $.find(l=>l.meter_id===i)??{meter_id:i,label:"",fee:0}}const C=g.length===0?'<p class="muted">No meters configured.</p>':g.map((i,l)=>{const f=x(i.id),_=i.id?"…"+i.id.slice(-8):`Meter ${l+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${i.types.map(F=>Jt[F]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${_}</code>
              <input type="hidden" name="meter_fee_${l}_meter_id" value="${i.id}" />
            </div>
            <div class="form-row" style="margin-bottom: var(--sp-2);">
              <label for="cfg-meter_fee_${l}_label">Label</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${l}_label" name="meter_fee_${l}_label" type="text" value="${f.label||`Meter ${l+1} metering fee`}" placeholder="e.g. Smart meter rental" />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-meter_fee_${l}_fee">Monthly Fee</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${l}_fee" name="meter_fee_${l}_fee" type="number" step="0.01" value="${f.fee}" />
                <span class="input-unit">EUR/mo</span>
              </div>
            </div>
          </div>
        `}).join(""),k=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional supplier-rate windows. Outside these windows, the base <strong>Energy Supplier → Variable Rate</strong> is used.
      Windows can cross midnight by setting an end time earlier than the start time.
    </p>
    <div id="consumption-windows-container">
      ${h.length>0?h.map((i,l)=>bs(l,i)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,b=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${y.length>0?y.map((i,l)=>_s(l,i)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,S=fs.map(i=>{if(i.title==="Gas Billing"&&!m||i.title==="Meter Fees"&&g.length<2)return"";let l;return i.title==="Feed-in / Selling"?l=d:i.title==="Time-of-Use Tariffs"?l=k:i.title==="Reference Power Windows"?l=b:i.title==="Discounts"?l=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as a monthly credit. The dashboard prorates it to the selected period and subtracts it before VAT.
      </p>`+n(i.fields):i.title==="Meter Fees"?l=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+C:l=n(i.fields),`
    <div class="form-section">
      <div class="form-section-title">${i.icon}  ${i.title}</div>
      ${l}
    </div>
  `}).join("");return`
    <section class="settings-view">
      ${o}

      <div class="section-header">
        <h2>Billing Configuration</h2>
        <span class="muted">Luxembourg energy billing rates &mdash; adjust values to match your contract</span>
      </div>

      <div class="card">
        <form id="settings-form">
          ${t?S:'<p class="muted">Loading configuration…</p>'}
          ${t?`
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save Configuration</button>
            <button type="button" id="reset-config-btn" class="btn btn-outline">Reset to Defaults</button>
          </div>
          `:""}
        </form>
      </div>
    </section>
  `}function pt(t,e,a=!1,s="dark",o=""){const n=y=>`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${y}
    </svg>
  `,r=n(`
    <path d="M4 19V5" />
    <path d="M4 19H20" />
    <path d="M7 15L11 11L14 13L19 8" />
    <circle cx="7" cy="15" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="11" cy="11" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="14" cy="13" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="19" cy="8" r="1.25" fill="currentColor" stroke="none" />
  `),c=n(`
    <path d="M3 11.5L12 4L21 11.5" />
    <path d="M5.5 10.5V20H18.5V10.5" />
    <path d="M9.5 20V14H14.5V20" />
  `),u=n(`
    <path d="M4 19H20" />
    <path d="M7 19V11" />
    <path d="M12 19V7" />
    <path d="M17 19V4" />
  `),v=n(`
    <path d="M7 4H17V20L15 18.5L13 20L11 18.5L9 20L7 18.5L5 20V6A2 2 0 0 1 7 4Z" />
    <path d="M9 9H15" />
    <path d="M9 13H15" />
  `),d=n(`
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3V6" />
    <path d="M12 18V21" />
    <path d="M3 12H6" />
    <path d="M18 12H21" />
    <path d="M5.64 5.64L7.76 7.76" />
    <path d="M16.24 16.24L18.36 18.36" />
    <path d="M16.24 7.76L18.36 5.64" />
    <path d="M5.64 18.36L7.76 16.24" />
  `),m=n(s==="dark"?`
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
      `),h=[{id:"charts",label:"Charts",icon:r},{id:"dashboard",label:"Dashboard",icon:c},{id:"sensors",label:"Sensors",icon:u},{id:"invoice",label:"Invoice",icon:v},{id:"settings",label:"Settings",icon:d}];return`
    <header class="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-brand">
        <img src="/leneda-panel/static/logo.png" srcset="/leneda-panel/static/logo@2x.png 2x" alt="Leneda Logo" class="navbar-logo-img" />
        ${o?`<span class="navbar-badge">${o}</span>`:""}
 
        <button class="menu-toggle ${a?"open":""}" aria-label="Toggle menu" aria-expanded="${a}">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav class="navbar-tabs ${a?"mobile-open":""}" role="tablist">
        ${h.map(y=>`
          <button
            class="nav-btn ${y.id===t?"active":""}"
            data-tab="${y.id}"
            role="tab"
            aria-selected="${y.id===t}"
            aria-controls="panel-${y.id}"
          >
            <span class="nav-icon" aria-hidden="true">${y.icon}</span>
            <span class="nav-label">${y.label}</span>
          </button>
        `).join("")}

        <div class="navbar-actions">
            <button
              class="theme-toggle"
              type="button"
              data-theme-toggle
              title="Switch to ${s==="dark"?"light":"dark"} mode"
              aria-label="Switch to ${s==="dark"?"light":"dark"} mode"
            >
              <span class="theme-toggle-icon" aria-hidden="true">${m}</span>
              <span class="theme-toggle-label">${s==="dark"?"Light":"Dark"} mode</span>
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
  `}const ea="leneda_credentials",ta="leneda_theme";function ks(){try{const t=localStorage.getItem(ea);if(t)return JSON.parse(t)}catch{}return null}function ut(t){try{localStorage.setItem(ea,JSON.stringify(t))}catch{}}function Ms(){var t;try{const e=localStorage.getItem(ta);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function Cs(t){try{localStorage.setItem(ta,t)}catch{}}function It(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const[,a,s,o]=e;return new Date(Number(a),Number(s)-1,Number(o))}function At(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${s}`}function Ie(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0"),r=String(t.getSeconds()).padStart(2,"0"),c=String(t.getMilliseconds()).padStart(3,"0"),u=-t.getTimezoneOffset(),v=u>=0?"+":"-",d=String(Math.floor(Math.abs(u)/60)).padStart(2,"0"),m=String(Math.abs(u)%60).padStart(2,"0");return`${e}-${a}-${s}T${o}:${n}:${r}.${c}${v}${d}:${m}`}function Ht(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Ss(t,e=new Date){switch(t){case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const s=new Date(a);return s.setHours(23,59,59,999),{start:a,end:s}}case"this_week":{const a=new Date(e),s=a.getDay()||7;return a.setDate(a.getDate()-s+1),a.setHours(0,0,0,0),{start:a,end:e}}case"last_week":{const a=new Date(e),s=a.getDay()||7,o=new Date(a);o.setDate(a.getDate()-s),o.setHours(23,59,59,999);const n=new Date(o);return n.setDate(o.getDate()-6),n.setHours(0,0,0,0),{start:n,end:o}}case"this_month":return{start:new Date(e.getFullYear(),e.getMonth(),1),end:e};case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),s=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:a,end:s}}case"this_year":return{start:new Date(e.getFullYear(),0,1),end:e};case"last_year":{const a=new Date(e.getFullYear()-1,0,1),s=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:a,end:s}}}}function Ts(t,e,a=new Date){const s=It(t),o=It(e);if(!s||!o)return null;const n=["yesterday","this_week","last_week","this_month","last_month","this_year","last_year"];for(const r of n){const c=Ss(r,a);if(Ht(s,c.start)&&Ht(o,c.end))return r}return null}class Es{constructor(e){Fe(this,"root");Fe(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartViewportStart:null,chartViewportEnd:null,chartUnit:"kwh",chartTimeBucket:"quarter_hour",chartConsumptionView:"grid",analysisHeatmapMetric:"grid",analysisProfileMetric:"house",analysisComparisonMode:"previous",analysisComparison:null,analysisComparisonLoading:!1,rangeData:null,consumptionTimeseries:null,productionTimeseries:null,gridImportTimeseries:null,marketExportTimeseries:null,perMeterProductionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:Ms()});Fe(this,"preZoomRange",null);Fe(this,"preZoomCustomStart","");Fe(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await Gt();if(this.state.mode=e.mode,e.mode==="standalone"){const a=ks();if(a&&(this.state.credentials=a),!e.configured&&!a){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&a)try{const{saveCredentials:s}=await ce(async()=>{const{saveCredentials:o}=await Promise.resolve().then(()=>Se);return{saveCredentials:o}},void 0);await s(a)}catch{}if(!a)try{this.state.credentials=await Ot()}catch{}}await this.loadData()}toDisplayError(e,a="Failed to load data"){const s=e instanceof Error?e.message:String(e??"").trim(),o=s.toLowerCase();return o.includes("missing data")||o.includes("no_data")||o.includes("no data")?"Missing data":s||a}clearRangeStateWithError(e,a="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.state.gridImportTimeseries=null,this.state.marketExportTimeseries=null,this.state.perMeterProductionTimeseries=null,this.clearChartViewport(),this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1,this.state.error=this.toDisplayError(e,a)}async fetchPerMeterProductionForRange(e,a,s){var n;if(((e==null?void 0:e.meters)??[]).filter(r=>r.types.includes("production")).length<=1)return null;try{const r=await ht("1-1:2.29.0",a,s);return(n=r.meters)!=null&&n.length?r:null}catch(r){return console.warn("Per-meter production fetch failed:",r),null}}async fetchEnergyFlowTimeseries(e,a){const[s,o,n,r]=await Promise.all([Ae("1-1:1.29.0",e,a),Ae("1-1:2.29.0",e,a),Ae("1-65:1.29.9",e,a),Ae("1-65:2.29.9",e,a)]);return{consumptionTimeseries:s,productionTimeseries:o,gridImportTimeseries:n,marketExportTimeseries:r}}resetAnalysisComparison(){this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1}clearChartViewport(){this.state.chartViewportStart=null,this.state.chartViewportEnd=null}normalizeChartTimeBucket(){const{start:e,end:a}=this.getDateRangeISO(),s=Ca(gt(e,a),this.state.chartTimeBucket);s!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=s)}getCurrentRangeKey(){const{start:e,end:a}=this.getDateRangeISO();return`${e}|${a}`}shiftIsoByYears(e,a){const s=new Date(e);if(!Number.isFinite(s.getTime()))return e;const o=new Date(s);return o.setUTCFullYear(o.getUTCFullYear()+a),o.toISOString()}getComparisonRangeISO(e,a,s){if(s==="last_year")return{start:this.shiftIsoByYears(e,-1),end:this.shiftIsoByYears(a,-1)};const o=new Date(e).getTime(),n=new Date(a).getTime(),r=Math.max(0,n-o),c=o-1,u=c-r;return{start:new Date(u).toISOString(),end:new Date(c).toISOString()}}async loadAnalysisComparison(e=!1){var c;if(!this.state.consumptionTimeseries||!this.state.productionTimeseries)return;const{start:a,end:s}=this.getDateRangeISO(),o=this.state.analysisComparisonMode,n=`${a}|${s}|${o}`;if(!e&&(this.state.analysisComparisonLoading||((c=this.state.analysisComparison)==null?void 0:c.key)===n))return;const r=this.getComparisonRangeISO(a,s,o);this.state.analysisComparisonLoading=!0,this.state.tab==="charts"&&this.renderPreserveMainScroll();try{const{consumptionTimeseries:u,productionTimeseries:v,gridImportTimeseries:d,marketExportTimeseries:m}=await this.fetchEnergyFlowTimeseries(r.start,r.end);if(n!==this.getCurrentRangeKey())return;this.state.analysisComparison={key:n,mode:o,start:r.start,end:r.end,consumptionTimeseries:u,productionTimeseries:v,gridImportTimeseries:d,marketExportTimeseries:m}}catch(u){console.warn("Comparison data fetch failed:",u),n===this.getCurrentRangeKey()&&(this.state.analysisComparison=null)}finally{n===this.getCurrentRangeKey()&&(this.state.analysisComparisonLoading=!1,this.state.tab==="charts"&&this.renderPreserveMainScroll())}}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.clearChartViewport(),this.resetAnalysisComparison(),this.render();try{const[e,a,s]=await Promise.all([Je(this.state.range),mt(),He()]),{start:o,end:n}=this.getDateRangeISO(),[r,c]=await Promise.all([this.fetchEnergyFlowTimeseries(o,n),this.fetchPerMeterProductionForRange(s,o,n)]);this.state.rangeData=e,this.state.consumptionTimeseries=r.consumptionTimeseries,this.state.productionTimeseries=r.productionTimeseries,this.state.gridImportTimeseries=r.gridImportTimeseries,this.state.marketExportTimeseries=r.marketExportTimeseries,this.state.perMeterProductionTimeseries=c,this.state.sensors=a,this.state.config=s}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async changeRange(e){if(this.preZoomRange=null,this.clearChartViewport(),this.state.range=e,this.resetAnalysisComparison(),e==="custom"){if(!this.state.customStart||!this.state.customEnd){const a=new Date;a.setDate(a.getDate()-1);const s=new Date(a);s.setDate(s.getDate()-6),this.state.customStart=At(s),this.state.customEnd=At(a)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:a,end:s}=this.getDateRangeISO(),[o,n,r]=await Promise.all([Je(e),this.fetchEnergyFlowTimeseries(a,s),this.fetchPerMeterProductionForRange(this.state.config,a,s)]);this.state.rangeData=o,this.state.consumptionTimeseries=n.consumptionTimeseries,this.state.productionTimeseries=n.productionTimeseries,this.state.gridImportTimeseries=n.gridImportTimeseries,this.state.marketExportTimeseries=n.marketExportTimeseries,this.state.perMeterProductionTimeseries=r}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async applyCustomRange(){this.preZoomRange=null,this.clearChartViewport();const{customStart:e,customEnd:a}=this.state;if(!(!e||!a)){this.state.error=null,this.state.loading=!0,this.resetAnalysisComparison(),this.render();try{const s=Ts(e,a),o=s?Je(s):ce(async()=>{const{fetchCustomData:m}=await Promise.resolve().then(()=>Se);return{fetchCustomData:m}},void 0).then(({fetchCustomData:m})=>m(e,a)),n=this.state.config,r=Ie(new Date(e+"T00:00:00")),c=Ie(new Date(a+"T23:59:59.999")),[u,v,d]=await Promise.all([o,this.fetchEnergyFlowTimeseries(r,c),this.fetchPerMeterProductionForRange(n,r,c)]);this.state.rangeData={range:"custom",consumption:u.consumption,production:u.production,exported:u.exported??0,self_consumed:u.self_consumed??0,grid_import:u.grid_import,solar_to_home:u.solar_to_home,direct_solar_to_home:u.direct_solar_to_home,shared:u.shared,shared_with_me:u.shared_with_me,gas_energy:u.gas_energy??0,gas_volume:u.gas_volume??0,peak_power_kw:u.peak_power_kw??0,exceedance_kwh:u.exceedance_kwh??0,metering_point:u.metering_point??"",start:u.start??e,end:u.end??a},this.state.consumptionTimeseries=v.consumptionTimeseries,this.state.productionTimeseries=v.productionTimeseries,this.state.gridImportTimeseries=v.gridImportTimeseries,this.state.marketExportTimeseries=v.marketExportTimeseries,this.state.perMeterProductionTimeseries=d}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}}async shiftChartPeriod(e){const{start:a,end:s}=this.getDateRangeISO(),o=Yt(a,s,this.state.chartTimeBucket,e);o&&await this.handleChartZoomChange(Ie(o.start),Ie(o.end))}changeTab(e){this.state.tab=e,this.render(),(e==="dashboard"||e==="charts")&&!this.state.rangeData&&!this.state.loading&&this.loadData(),e==="charts"&&this.state.rangeData&&this.loadAnalysisComparison(),e==="sensors"&&!this.state.sensors&&mt().then(a=>{this.state.sensors=a,this.render()}),e==="settings"&&!this.state.config&&He().then(a=>{this.state.config=a,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,Cs(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}printInvoice(){var r,c;const e=document.title,s=`Leneda-invoice-${(r=this.state.rangeData)!=null&&r.start&&((c=this.state.rangeData)!=null&&c.end)?`${this.state.rangeData.start.slice(0,10)}_to_${this.state.rangeData.end.slice(0,10)}`:this.state.range}`.replace(/[^a-z0-9_-]+/gi,"-");let o=!1;const n=()=>{o||(o=!0,document.title=e,window.removeEventListener("afterprint",n))};document.title=s,window.addEventListener("afterprint",n,{once:!0}),window.print(),window.setTimeout(n,1e3)}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const a=this.root.querySelector(".main-content");a?a.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}getDataSourceLabel(){return this.state.mode==="ha"?"Home Assistant":"Standalone"}getHostedDataNoticeHtml(){var e;return(((e=this.state.credentials)==null?void 0:e.proxy_url)??"").trim().length>0,""}render(){var u;const{tab:e,loading:a,error:s,theme:o}=this.state,n=this.getDataSourceLabel(),r=this.getHostedDataNoticeHtml();if(a&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${pt(e,v=>{},!1,o,n)}
          <main class="main-content">
            ${r}
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `,this.attachNavListeners();return}if(s&&!this.state.rangeData){const v=s.toLowerCase().includes("missing data");this.root.innerHTML=`
        <div class="app-shell">
          ${pt(e,d=>{},!1,o,n)}
          <main class="main-content">
            ${r}
            <div class="error-state">
              <h2>${v?"Missing Data":"Connection Error"}</h2>
              <p>${v?"The selected period could not be loaded because data is missing.":s}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(u=this.root.querySelector("#retry-btn"))==null||u.addEventListener("click",()=>this.loadData());return}this.state.rangeData&&this.normalizeChartTimeBucket();let c="";switch(e){case"dashboard":c=Ea(this.state);break;case"charts":c=cs(this.state);break;case"sensors":c=ps(this.state.sensors);break;case"invoice":c=vs(this.state);break;case"settings":c=xs(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${pt(e,v=>this.changeTab(v),this.state.isMenuOpen,o,n)}
        <main class="main-content">
          ${r}
          ${a?'<div class="loading-bar"></div>':""}
          ${c}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachAnalysisListeners(),this.attachInvoiceListeners(),this.attachSettingsListeners()}attachNavListeners(){var e,a;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(a=this.root.querySelector("[data-theme-toggle]"))==null||a.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.tab;this.changeTab(o)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.range;this.changeRange(c)})});const a=this.root.querySelector("#custom-start"),s=this.root.querySelector("#custom-end");a&&a.addEventListener("change",()=>{this.state.customStart=a.value}),s&&s.addEventListener("change",()=>{this.state.customEnd=s.value});const o=this.root.querySelector("#apply-custom-range");if(o==null||o.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.chartUnit;c!==this.state.chartUnit&&(this.state.chartUnit=c,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-bucket]").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.chartBucket,{start:u,end:v}=this.getDateRangeISO();Ne(c,gt(u,v))&&c!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=c,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-period-nav]").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.chartPeriodNav==="next"?1:-1;this.shiftChartPeriod(c)})}),this.root.querySelectorAll("[data-chart-view]").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.chartView;c!==this.state.chartConsumptionView&&(this.state.chartConsumptionView=c,this.renderPreserveMainScroll())})}),!e){const r=this.root.querySelector("#energy-chart");r&&this.state.rangeData&&this.initChart(r)}const n=this.root.querySelector(".reset-zoom-btn");n==null||n.addEventListener("click",async()=>{const{resetChartZoom:r}=await ce(async()=>{const{resetChartZoom:c}=await import("./Charts-CZY8Nqlk.js");return{resetChartZoom:c}},[]);if(r(),n.style.display="none",this.clearChartViewport(),this.preZoomRange!==null){const c=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",c==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(c)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachAnalysisListeners(){this.root.querySelectorAll("[data-analysis-heatmap]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisHeatmap;a!==this.state.analysisHeatmapMetric&&(this.state.analysisHeatmapMetric=a,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-profile]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisProfile;a!==this.state.analysisProfileMetric&&(this.state.analysisProfileMetric=a,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-comparison-mode]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisComparisonMode;a!==this.state.analysisComparisonMode&&(this.state.analysisComparisonMode=a,this.state.analysisComparison=null,this.loadAnalysisComparison(!0))})})}attachInvoiceListeners(){var e;(e=this.root.querySelector("#print-invoice-btn"))==null||e.addEventListener("click",()=>{this.printInvoice()})}attachSettingsListeners(){var u,v;const e=this.root.querySelector("#credentials-form");if(e){const d=this.root.querySelector("#add-meter-btn");d==null||d.addEventListener("click",()=>{var $,x,C;const y=new FormData(e),g=m(y);if(g.length<10){g.push({id:"",types:["consumption"]});const k={api_key:y.get("api_key")||(($=this.state.credentials)==null?void 0:$.api_key)||"",energy_id:y.get("energy_id")||((x=this.state.credentials)==null?void 0:x.energy_id)||"",meters:g,proxy_url:y.get("proxy_url")||((C=this.state.credentials)==null?void 0:C.proxy_url)||""};this.state.credentials=k,ut(k),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach(y=>{y.addEventListener("click",()=>{var k,b,S;const g=parseInt(y.dataset.meter??"0",10),$=new FormData(e),x=m($);x.splice(g,1);const C={api_key:$.get("api_key")||((k=this.state.credentials)==null?void 0:k.api_key)||"",energy_id:$.get("energy_id")||((b=this.state.credentials)==null?void 0:b.energy_id)||"",meters:x,proxy_url:$.get("proxy_url")||((S=this.state.credentials)==null?void 0:S.proxy_url)||""};this.state.credentials=C,ut(C),this.renderPreserveMainScroll()})});const m=y=>{var $,x,C;const g=[];for(let k=0;k<10;k++){const b=y.get(`meter_${k}_id`);if(b===null)break;const S=[];($=e.querySelector(`[name="meter_${k}_consumption"]`))!=null&&$.checked&&S.push("consumption"),(x=e.querySelector(`[name="meter_${k}_production"]`))!=null&&x.checked&&S.push("production"),(C=e.querySelector(`[name="meter_${k}_gas"]`))!=null&&C.checked&&S.push("gas"),g.push({id:b.trim(),types:S})}return g};e.addEventListener("submit",async y=>{y.preventDefault();const g=new FormData(e),$={api_key:g.get("api_key"),energy_id:g.get("energy_id"),meters:m(g),proxy_url:g.get("proxy_url")},x=this.root.querySelector("#creds-status");try{ut($);const{saveCredentials:C}=await ce(async()=>{const{saveCredentials:S}=await Promise.resolve().then(()=>Se);return{saveCredentials:S}},void 0);await C($),x&&(x.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=$,this.state.error=null;const k=!1,b=($.proxy_url??"").trim();await this.loadData()}catch(C){x&&(x.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${C instanceof Error?C.message:C}</p>`)}});const h=this.root.querySelector("#test-creds-btn");h==null||h.addEventListener("click",async()=>{const y=new FormData(e),g={api_key:y.get("api_key"),energy_id:y.get("energy_id"),meters:m(y),proxy_url:y.get("proxy_url")},$=this.root.querySelector("#creds-status");$&&($.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:x}=await ce(async()=>{const{testCredentials:k}=await Promise.resolve().then(()=>Se);return{testCredentials:k}},void 0),C=await x(g);$&&($.innerHTML=C.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${C.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${C.message}</p>`)}catch(x){$&&($.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${x instanceof Error?x.message:x}</p>`)}})}const a=this.root.querySelector("#settings-form");if(!a)return;const s=d=>{const m=[];for(let h=0;h<24;h++){const y=d.get(`consumption_window_${h}_label`),g=d.get(`consumption_window_${h}_day_group`),$=d.get(`consumption_window_${h}_start_time`),x=d.get(`consumption_window_${h}_end_time`),C=d.get(`consumption_window_${h}_rate`);if(y===null&&g===null&&$===null&&x===null&&C===null)break;m.push({label:(y??"").trim()||`Window ${h+1}`,day_group:g??"all",start_time:$??"00:00",end_time:x??"06:00",rate:parseFloat(C??"0")||0})}return m},o=d=>{const m=[];for(let h=0;h<24;h++){const y=d.get(`reference_window_${h}_label`),g=d.get(`reference_window_${h}_day_group`),$=d.get(`reference_window_${h}_start_time`),x=d.get(`reference_window_${h}_end_time`),C=d.get(`reference_window_${h}_reference_power_kw`);if(y===null&&g===null&&$===null&&x===null&&C===null)break;m.push({label:(y??"").trim()||`Reference ${h+1}`,day_group:g??"all",start_time:$??"17:00",end_time:x??"00:00",reference_power_kw:parseFloat(C??"0")||0})}return m},n=()=>{var k;const d=new FormData(a),m={};a.querySelectorAll('input[type="checkbox"]').forEach(b=>{m[b.name]=b.checked});const h=[],y=/^feed_in_rate_(\d+)_(.+)$/,g={},$=[],x=/^meter_fee_(\d+)_(.+)$/,C={};for(const[b,S]of d.entries()){if(b.startsWith("consumption_window_")||b.startsWith("reference_window_"))continue;const i=b.match(y);if(i){const F=i[1],P=i[2];g[F]||(g[F]={}),g[F][P]=S;continue}const l=b.match(x);if(l){const F=l[1],P=l[2];C[F]||(C[F]={}),C[F][P]=S;continue}if(m[b]!==void 0&&typeof m[b]=="boolean")continue;const f=S,_=a.elements.namedItem(b);if(f===""&&_ instanceof HTMLInputElement&&_.type==="number"){const F=(k=this.state.config)==null?void 0:k[b];typeof F=="number"&&isFinite(F)&&(m[b]=F);continue}const L=parseFloat(f);m[b]=isNaN(L)?f:L}for(const b of Object.keys(g).sort()){const S=g[b],i=S.mode??"fixed",l=i==="sensor"?S.fallback_tariff??S.tariff:S.tariff;h.push({meter_id:S.meter_id??"",mode:i,tariff:parseFloat(l??"0.08")||.08,sensor_entity:S.sensor_entity??"",display_name:(S.display_name??"").trim(),self_use_priority:Math.max(1,parseInt(S.self_use_priority??`${Number(b)+1}`,10)||Number(b)+1)})}h.length>0&&(m.feed_in_rates=h);for(const b of Object.keys(C).sort()){const S=C[b];$.push({meter_id:S.meter_id??"",label:S.label??"",fee:parseFloat(S.fee??"0")||0})}return $.length>0&&(m.meter_monthly_fees=$),m.consumption_rate_windows=s(d),m.reference_power_windows=o(d),m},r=d=>{if(!this.state.config)return;const m=n();d(m),this.state.config={...this.state.config,...m},this.renderPreserveMainScroll()};if((u=this.root.querySelector("#add-consumption-window-btn"))==null||u.addEventListener("click",()=>{r(d=>{var h;const m=Array.isArray(d.consumption_rate_windows)?[...d.consumption_rate_windows]:[];m.push({label:`Window ${m.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((h=this.state.config)==null?void 0:h.energy_variable_rate)??.1125}),d.consumption_rate_windows=m})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(d=>{d.addEventListener("click",()=>{const m=parseInt(d.dataset.window??"0",10);r(h=>{const y=Array.isArray(h.consumption_rate_windows)?[...h.consumption_rate_windows]:[];y.splice(m,1),h.consumption_rate_windows=y})})}),(v=this.root.querySelector("#add-reference-window-btn"))==null||v.addEventListener("click",()=>{r(d=>{var h;const m=Array.isArray(d.reference_power_windows)?[...d.reference_power_windows]:[];m.push({label:`Reference ${m.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((h=this.state.config)==null?void 0:h.reference_power_kw)??5}),d.reference_power_windows=m})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(d=>{d.addEventListener("click",()=>{const m=parseInt(d.dataset.window??"0",10);r(h=>{const y=Array.isArray(h.reference_power_windows)?[...h.reference_power_windows]:[];y.splice(m,1),h.reference_power_windows=y})})}),a.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(d=>{d.addEventListener("change",()=>{const m=d.name.match(/feed_in_rate_(\d+)_mode/);if(!m)return;const h=m[1],y=a.querySelector(`.feed-in-fixed-fields[data-rate-idx="${h}"]`),g=a.querySelector(`.feed-in-sensor-fields[data-rate-idx="${h}"]`);y&&(y.style.display=d.value==="fixed"?"":"none"),g&&(g.style.display=d.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const d=this.root.querySelector("#ha-entity-list");d&&Ut().then(({entities:m})=>{d.innerHTML=m.map(h=>`<option value="${h}"></option>`).join("")}).catch(()=>{})}a.addEventListener("submit",async d=>{d.preventDefault();const m=n();try{const{saveConfig:h}=await ce(async()=>{const{saveConfig:y}=await Promise.resolve().then(()=>Se);return{saveConfig:y}},void 0);await h(m),this.state.config=await He(),this.render()}catch(h){alert("Failed to save: "+(h instanceof Error?h.message:h))}});const c=this.root.querySelector("#reset-config-btn");c==null||c.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?"))try{const{resetConfig:d}=await ce(async()=>{const{resetConfig:m}=await Promise.resolve().then(()=>Se);return{resetConfig:m}},void 0);await d(),this.state.config=await He(),this.render()}catch(d){alert("Failed to reset: "+(d instanceof Error?d.message:d))}})}async initChart(e){var a,s,o,n;try{const{renderEnergyChart:r}=await ce(async()=>{const{renderEnergyChart:k}=await import("./Charts-CZY8Nqlk.js");return{renderEnergyChart:k}},[]),{start:c,end:u}=this.getDateRangeISO(),v=this.state.chartViewportStart?new Date(this.state.chartViewportStart).getTime():void 0,d=this.state.chartViewportEnd?new Date(this.state.chartViewportEnd).getTime():void 0;let m=this.state.consumptionTimeseries,h=this.state.productionTimeseries,y=this.state.gridImportTimeseries,g=this.state.marketExportTimeseries;if(!m||!h||!y||!g){const k=await this.fetchEnergyFlowTimeseries(c,u);m=k.consumptionTimeseries,h=k.productionTimeseries,y=k.gridImportTimeseries,g=k.marketExportTimeseries,this.state.consumptionTimeseries=m,this.state.productionTimeseries=h,this.state.gridImportTimeseries=y,this.state.marketExportTimeseries=g}const $=((a=this.state.config)==null?void 0:a.reference_power_kw)??0,x=(((s=this.state.config)==null?void 0:s.meters)??[]).filter(k=>k.types.includes("production"));let C;if((n=(o=this.state.perMeterProductionTimeseries)==null?void 0:o.meters)!=null&&n.length)C=this.state.perMeterProductionTimeseries.meters;else if(x.length>1)try{const k=await ht("1-1:2.29.0",c,u);k.meters&&k.meters.length>1&&(C=k.meters,this.state.perMeterProductionTimeseries=k)}catch(k){console.warn("Per-meter timeseries fetch failed, using merged view:",k)}r(e,m,h,{unit:this.state.chartUnit,consumptionView:this.state.chartConsumptionView,referencePowerKw:$,gridImportTimeseries:y,marketExportTimeseries:g,perMeterProduction:C,viewportStartMs:v,viewportEndMs:d,timeBucket:this.state.chartTimeBucket,onZoomChange:(k,b)=>{this.handleChartZoomChange(k,b)}})}catch(r){console.error("Chart init failed:",r)}}async handleChartZoomChange(e,a){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd),this.state.error=null,this.state.loading=!0,this.renderPreserveMainScroll();const{fetchCustomData:s}=await ce(async()=>{const{fetchCustomData:v}=await Promise.resolve().then(()=>Se);return{fetchCustomData:v}},void 0),o=e.slice(0,10),n=a.slice(0,10);this.resetAnalysisComparison();const r=await s(e,a),[c,u]=await Promise.all([this.fetchEnergyFlowTimeseries(e,a),this.fetchPerMeterProductionForRange(this.state.config,e,a)]);this.state.range="custom",this.state.customStart=o,this.state.customEnd=n,this.state.chartViewportStart=e,this.state.chartViewportEnd=a,this.state.rangeData={range:"custom",consumption:r.consumption,production:r.production,exported:r.exported??0,self_consumed:r.self_consumed??0,gas_energy:r.gas_energy??0,gas_volume:r.gas_volume??0,grid_import:r.grid_import,solar_to_home:r.solar_to_home,direct_solar_to_home:r.direct_solar_to_home,shared:r.shared,shared_with_me:r.shared_with_me,peak_power_kw:r.peak_power_kw??0,exceedance_kwh:r.exceedance_kwh??0,metering_point:r.metering_point??"",start:r.start,end:r.end},this.state.consumptionTimeseries=c.consumptionTimeseries,this.state.productionTimeseries=c.productionTimeseries,this.state.gridImportTimeseries=c.gridImportTimeseries,this.state.marketExportTimeseries=c.marketExportTimeseries,this.state.perMeterProductionTimeseries=u,this.state.loading=!1,this.renderPreserveMainScroll()}catch(s){console.error("Zoom data fetch failed:",s),this.state.loading=!1,this.clearRangeStateWithError(s,"Missing data"),this.render()}}getDateRangeISO(){if(this.state.chartViewportStart&&this.state.chartViewportEnd)return{start:this.state.chartViewportStart,end:this.state.chartViewportEnd};const e=new Date,a=s=>Ie(s);switch(this.state.range){case"custom":{const s=new Date(this.state.customStart+"T00:00:00"),o=new Date(this.state.customEnd+"T23:59:59.999");return{start:a(s),end:a(o)}}case"yesterday":{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const o=new Date(s);return o.setHours(23,59,59,999),{start:a(s),end:a(o)}}case"this_week":{const s=new Date(e),o=s.getDay()||7;return s.setDate(s.getDate()-o+1),s.setHours(0,0,0,0),{start:a(s),end:a(e)}}case"last_week":{const s=new Date(e),o=s.getDay()||7,n=new Date(s);n.setDate(s.getDate()-o),n.setHours(23,59,59,999);const r=new Date(n);return r.setDate(n.getDate()-6),r.setHours(0,0,0,0),{start:a(r),end:a(n)}}case"this_month":{const s=new Date(e.getFullYear(),e.getMonth(),1);return{start:a(s),end:a(e)}}case"last_month":{const s=new Date(e.getFullYear(),e.getMonth()-1,1),o=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:a(s),end:a(o)}}case"this_year":{const s=new Date(e.getFullYear(),0,1);return{start:a(s),end:a(e)}}case"last_year":{const s=new Date(e.getFullYear()-1,0,1),o=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:a(s),end:a(o)}}default:{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const o=new Date(s);return o.setHours(23,59,59,999),{start:a(s),end:a(o)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new Es(t).mount()}export{Wa as b};
