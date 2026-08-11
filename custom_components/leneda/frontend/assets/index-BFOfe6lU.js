var da=Object.defineProperty;var ca=(t,e,s)=>e in t?da(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var De=(t,e,s)=>ca(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const ua="modulepreload",pa=function(t){return"/leneda-panel/static/"+t},ns={},pe=function(e,s,a){let n=Promise.resolve();if(s&&s.length>0){let r=function(v){return Promise.all(v.map(f=>Promise.resolve(f).then(b=>({status:"fulfilled",value:b}),b=>({status:"rejected",reason:b}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),u=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));n=r(s.map(v=>{if(v=pa(v),v in ns)return;ns[v]=!0;const f=v.endsWith(".css"),b=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${v}"]${b}`))return;const _=document.createElement("link");if(_.rel=f?"stylesheet":ua,f||(_.as="script"),_.crossOrigin="",_.href=v,u&&_.setAttribute("nonce",u),document.head.appendChild(_),f)return new Promise((d,h)=>{_.addEventListener("load",d),_.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${v}`)))})}))}function o(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return n.then(r=>{for(const i of r||[])i.status==="rejected"&&o(i.reason);return e().catch(o)})};function _s(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()})),proxy_url:(t.proxy_url??"").trim()}}function ma(){var t,e,s,a,n;try{const o=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((n=(a=(s=o==null?void 0:o.hass)==null?void 0:s.auth)==null?void 0:a.data)==null?void 0:n.access_token)??null}catch{return null}}async function ae(t,e){const s=ma(),a={...e==null?void 0:e.headers,...s?{Authorization:`Bearer ${s}`}:{}},n={...e,credentials:"include",headers:a},o=await fetch(t,n);if(!o.ok){const r=o.headers.get("content-type")??"";let i="",u="";if(r.includes("application/json")){const v=await o.json().catch(()=>null);i=String((v==null?void 0:v.error)??"").trim(),u=String((v==null?void 0:v.message)??(v==null?void 0:v.error)??"").trim()}else u=(await o.text().catch(()=>"")).trim();throw i==="missing_data"||i==="no_data"||o.status===503?new Error("Missing data"):new Error(u?`API ${o.status}: ${u}`:`API ${o.status}: ${o.statusText}`)}return o.json()}async function ot(t){return ae(`/leneda_api/data?range=${t}`)}async function ha(t,e){return ae(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function Be(t,e,s){let a=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),ae(a)}async function Ft(t,e,s){let a=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),ae(a)}async function Wt(){return ae("/leneda_api/sensors")}async function qe(){return ae("/leneda_api/config")}async function ga(t){await ae("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function va(){await ae("/leneda_api/config/reset",{method:"POST"})}async function $s(){try{return await ae("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function xs(){return ae("/leneda_api/credentials")}async function ya(t){const e=_s(t);await ae("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function fa(t){const e=_s(t);return ae("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function ks(){return ae("/leneda_api/ha-entities")}const xe=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:qe,fetchCredentials:xs,fetchCustomData:ha,fetchHAEntities:ks,fetchMode:$s,fetchPerMeterTimeseries:Ft,fetchRangeData:ot,fetchSensors:Wt,fetchTimeseries:Be,resetConfig:va,saveConfig:ga,saveCredentials:ya,testCredentials:fa},Symbol.toStringTag,{value:"Module"}));function Rt(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(e){const[,s,a,n]=e;return new Date(Number(s),Number(a)-1,Number(n))}return new Date(t)}function G(t){return t==null||!Number.isFinite(t)?0:(t<0?-1:1)*Math.round(Number((Math.abs(t)*100).toFixed(6)))/100}function m(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function we(t){return Rt(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function Ss(t){return Rt(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function Fe(t){return Rt(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}const lt=[{id:"year",label:"Year",shortLabel:"Yr",stepLabel:"year",approxMs:365*864e5,maxBuckets:30},{id:"month",label:"Month",shortLabel:"Mo",stepLabel:"month",approxMs:30*864e5,maxBuckets:72},{id:"week",label:"Week",shortLabel:"Wk",stepLabel:"week",approxMs:7*864e5,maxBuckets:104},{id:"day",label:"Day",shortLabel:"Day",stepLabel:"day",approxMs:864e5,maxBuckets:370},{id:"hour",label:"Hour",shortLabel:"Hr",stepLabel:"hour",approxMs:36e5,maxBuckets:744},{id:"quarter_hour",label:"15 min",shortLabel:"15m",stepLabel:"15 minutes",approxMs:15*6e4,maxBuckets:672}];function Ms(t){return lt.find(e=>e.id===t)??lt[3]}function Pt(t,e){if(!t||!e)return 0;const s=new Date(t).getTime(),a=new Date(e).getTime();return!Number.isFinite(s)||!Number.isFinite(a)?0:Math.max(0,a-s)}function Ye(t,e){const s=Ms(t);if(e<=0)return t==="quarter_hour";const a=e/s.approxMs;return a>=1.5&&a<=s.maxBuckets}function wa(t,e){var n;if(e&&Ye(e,t))return e;const s=t/864e5,a=s<=1.25?"quarter_hour":s<=7?"hour":s<=45?"day":s<=180?"week":s<=900?"month":"year";return Ye(a,t)?a:((n=lt.find(o=>Ye(o.id,t)))==null?void 0:n.id)??"quarter_hour"}function ba(t,e){return new Date(t,e+1,0).getDate()}function os(t,e,s){const a=t.getDate(),n=new Date(t),o=n.getMonth()+s,r=n.getFullYear()+e+Math.floor(o/12),i=(o%12+12)%12,u=Math.min(a,ba(r,i));return n.setFullYear(r,i,u),n}function is(t,e,s){switch(e){case"year":return os(t,s,0);case"month":return os(t,0,s);case"week":return new Date(t.getTime()+s*7*864e5);case"day":return new Date(t.getTime()+s*864e5);case"hour":return new Date(t.getTime()+s*36e5);case"quarter_hour":return new Date(t.getTime()+s*15*6e4)}}function Cs(t,e,s,a){if(!t||!e)return null;const n=new Date(t),o=new Date(e);return!Number.isFinite(n.getTime())||!Number.isFinite(o.getTime())?null:{start:is(n,s,a),end:is(o,s,a)}}function _a(t,e){if(!t||!e)return"No period loaded";const s=new Date(t),a=new Date(e);if(!Number.isFinite(s.getTime())||!Number.isFinite(a.getTime()))return"No period loaded";if(s.getFullYear()===a.getFullYear()&&s.getMonth()===a.getMonth()&&s.getDate()===a.getDate()){const o=s.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),r=s.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=a.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${o}, ${r} - ${i}`}return`${s.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})} - ${a.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}`}const ze=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function me(t){const e=s=>`
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
      `)}}function $a(t){var He,ye,ue,z,Ce,te,_e,re;const e=t.rangeData,s=C=>{if(!C)return"";const L=C.match(/^(\d{4}-\d{2}-\d{2})/);return L?L[1]:""},a=(e==null?void 0:e.consumption)??0,n=(e==null?void 0:e.production)??0,o=(e==null?void 0:e.exported)??0,r=(e==null?void 0:e.self_consumed)??0,i=(e==null?void 0:e.gas_energy)??0,u=(e==null?void 0:e.gas_volume)??0,v=(e==null?void 0:e.peak_power_kw)??0,f=s(e==null?void 0:e.start),b=s(e==null?void 0:e.end),_=(e==null?void 0:e.shared_with_me)??0,d=(e==null?void 0:e.shared)??0,h=Math.max(0,o),g=(e==null?void 0:e.grid_import)!=null?Math.max(0,a-e.grid_import):void 0,$=Math.max(0,(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(r>0?r:n-h),g??0),k=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??Math.max(0,$-_)),x=$,S=Math.max(0,(e==null?void 0:e.grid_import)??a-$),M=a>0?a:S+$,c=!!((He=t.config)!=null&&He.meter_has_gas||(((ye=t.config)==null?void 0:ye.meters)??[]).some(C=>C.types.includes("gas"))),y=d+_,l=M>0?Math.min(100,$/M*100):0,p=Math.max(M,n,S,h,d,_,k,1),E=c?Math.min(Math.max(0,i),p):0,D=(C,L=2.8,F=8.2)=>C>0?L+C/p*(F-L):1.8,P=C=>D(C)+1.4,R=C=>D(C)+5.4,K=(C,L=.28,F=.88)=>C>0?L+C/p*(F-L):.1,I=(C,L=.09,F=.22)=>C>0?L+C/p*(F-L):.05,O=(C,L=1.6,F=3.9)=>`${(C>0?Math.max(L,F-C/p*(F-L)):F).toFixed(2)}s`,se=(C,L=3.4,F=5.8)=>C>0?L+C/p*(F-L):3,J=C=>C>0?Math.max(18,Math.round(C/p*100)):0,le=C=>`
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
  `,Q=C=>{const{x:L,y:F,width:B,accent:Z,kicker:X,value:oe,detail:fe}=C;return`
      <g class="scene-node-label" transform="translate(${L}, ${F})">
        <rect width="${B}" height="${fe?70:54}" rx="18" fill="var(--clr-overlay)" stroke="${Z}" />
        <text x="16" y="22" class="scene-node-kicker">${X}</text>
        <text x="16" y="${fe?39:37}" class="scene-node-value">${oe}</text>
        ${fe?`<text x="16" y="56" class="scene-node-detail">${fe}</text>`:""}
      </g>
    `},ne=C=>{const{x:L,y:F,scale:B=1,glowId:Z}=C;return`
      <g class="scene-tier-icon scene-tier-grid" transform="translate(${L}, ${F}) scale(${B})">
        <circle cx="0" cy="44" r="48" fill="var(--clr-consumption)" fill-opacity="0.06" />
        <path d="M0 0 V88 M-24 20 H24 M-16 42 H16 M-8 66 H8" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" filter="url(#${Z})" />
        <path d="M-12 88 L0 60 L12 88" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" fill="none" />
      </g>
    `},de=C=>{const{x:L,y:F,scale:B=1,glowId:Z}=C;return`
      <g class="scene-tier-icon scene-tier-solar" transform="translate(${L}, ${F}) scale(${B})">
        <circle cx="0" cy="0" r="26" fill="var(--clr-production)" fill-opacity="0.09" />
        <circle cx="0" cy="0" r="12" fill="var(--clr-production)" fill-opacity="0.9" filter="url(#${Z})" />
        <path d="M0 -26 V-40 M0 26 V40 M26 0 H40 M-26 0 H-40 M18 -18 L28 -28 M18 18 L28 28 M-18 18 L-28 28 M-18 -18 L-28 -28" stroke="var(--clr-production)" stroke-width="2.5" stroke-linecap="round" />
      </g>
    `},ge=C=>{const{x:L,y:F,scale:B=1,glowId:Z}=C;return`
      <g class="scene-tier-icon scene-tier-community" transform="translate(${L}, ${F}) scale(${B})">
        <circle cx="0" cy="40" r="50" fill="var(--clr-primary)" fill-opacity="0.06" />
        <rect x="-26" y="30" width="22" height="42" rx="6" fill="rgba(88, 166, 255, 0.08)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="6" y="16" width="24" height="56" rx="6" fill="rgba(88, 166, 255, 0.12)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="-2" y="4" width="6" height="10" rx="2" fill="var(--clr-primary)" fill-opacity="0.7" />
        <path d="M-14 12 H14 M-10 4 V20 M10 4 V20" stroke="var(--clr-primary)" stroke-width="2" stroke-linecap="round" filter="url(#${Z})" />
      </g>
    `},q=C=>{const{x:L,y:F,scale:B=1,glowId:Z}=C;return`
      <g class="scene-tier-icon scene-tier-gas" transform="translate(${L}, ${F}) scale(${B})">
        <circle cx="0" cy="38" r="46" fill="var(--clr-gas)" fill-opacity="0.08" />
        <path d="M-26 40 H-8 V72 H26" stroke="var(--clr-gas)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#${Z})" />
        <path d="M0 4 C18 24 20 40 20 52 C20 70 9 84 0 84 C-9 84 -20 70 -20 52 C-20 38 -10 24 0 4 Z" fill="rgba(210, 153, 34, 0.14)" stroke="var(--clr-gas)" stroke-width="2.2" />
        <path d="M0 24 C9 35 10 44 10 52 C10 61 5 68 0 72 C-5 68 -10 61 -10 52 C-10 44 -8 35 0 24 Z" fill="var(--clr-gas)" fill-opacity="0.85" />
      </g>
    `},N=C=>{const{prefix:L,x:F,y:B,scale:Z=1}=C;return`
      <g class="elite-house" transform="translate(${F}, ${B}) scale(${Z})">
        <circle cx="90" cy="122" r="112" fill="url(#${L}-house-core-glow)" />
        <circle cx="90" cy="122" r="96" fill="url(#${L}-house-base-glow)" opacity="0.28" />
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
          <rect x="0" y="0" width="56" height="14" rx="3" fill="rgba(63, 185, 80, 0.12)" stroke="var(--clr-production)" stroke-width="1.6" filter="url(#${L}-glow-green)" />
          <rect x="0" y="20" width="56" height="14" rx="3" fill="rgba(63, 185, 80, 0.12)" stroke="var(--clr-production)" stroke-width="1.6" filter="url(#${L}-glow-green)" />
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
    `},U=C=>{const{path:L,value:F,gradientId:B,colorVar:Z,filterId:X,particleClass:oe,direction:fe="forward"}=C,Te=fe==="reverse"?"1;0":"0;1";return`
      <path
        class="flow-halo ${oe}"
        d="${L}"
        stroke="url(#${B})"
        stroke-width="${R(F).toFixed(1)}"
        stroke-opacity="${I(F).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-rail ${oe}"
        d="${L}"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="${P(F).toFixed(1)}"
        stroke-opacity="0.42"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-stream ${oe}"
        d="${L}"
        stroke="url(#${B})"
        stroke-width="${D(F).toFixed(1)}"
        stroke-opacity="${K(F).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      ${F>0?`
        <circle
          class="flow-particle ${oe}"
          r="${se(F).toFixed(1)}"
          fill="${Z}"
          filter="url(#${X})"
        >
          <animateMotion dur="${O(F)}" repeatCount="indefinite" path="${L}" keyPoints="${Te}" keyTimes="0;1" calcMode="linear" />
        </circle>
        <circle
          class="flow-particle flow-particle-secondary ${oe}"
          r="${Math.max(2.4,se(F)-1.2).toFixed(1)}"
          fill="${Z}"
          fill-opacity="0.75"
          filter="url(#${X})"
        >
          <animateMotion dur="${O(F)}" begin="-${(parseFloat(O(F))/2).toFixed(2)}s" repeatCount="indefinite" path="${L}" keyPoints="${Te}" keyTimes="0;1" calcMode="linear" />
        </circle>
      `:""}
    `},ve=()=>`
    <div class="elite-scene elite-scene-desktop">
      <svg class="elite-main-svg" viewBox="0 0 860 460" fill="none" preserveAspectRatio="xMidYMid meet">
        ${le("desktop")}
        <rect x="34" y="30" width="792" height="372" rx="34" fill="url(#desktop-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="430" cy="330" rx="278" ry="60" fill="url(#desktop-house-base-glow)" opacity="0.56" />
        <line x1="98" y1="334" x2="762" y2="334" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.45" />

        ${Q({x:58,y:108,width:152,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${m(S+h)} kWh`,detail:h>0?`In ${m(S)} / out ${m(h)} kWh`:void 0})}

        ${Q({x:356,y:44,width:148,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${m(n)} kWh`,detail:`${m($)} kWh used at home`})}

        ${Q({x:624,y:108,width:184,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${m(y)} kWh`,detail:`Sent ${m(d)} / got ${m(_)} kWh`})}

        ${c?Q({x:350,y:338,width:160,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${m(i)} kWh`,detail:u>0?`${m(u)} m3 in period`:"Gas meter active"}):""}

        ${ne({x:132,y:186,scale:1.02,glowId:"desktop-glow-red"})}
        ${de({x:430,y:126,glowId:"desktop-glow-green"})}
        ${ge({x:716,y:194,glowId:"desktop-glow-cyan"})}
        ${c?q({x:430,y:352,glowId:"desktop-glow-gas"}):""}
        ${N({prefix:"desktop",x:340,y:96,scale:1.02})}

        ${U({path:"M 430 152 C 430 182 430 204 430 220",value:k,gradientId:"desktop-flow-solar",colorVar:"var(--clr-production)",filterId:"desktop-glow-green",particleClass:"flow-solar"})}

        ${U({path:"M 176 230 C 246 230 318 230 364 232",value:S,gradientId:"desktop-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"desktop-glow-red",particleClass:"flow-grid-in"})}

        ${U({path:"M 496 268 C 430 298 326 314 176 316",value:h,gradientId:"desktop-flow-grid-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-grid-out"})}

        ${U({path:"M 500 234 C 566 220 634 220 692 236",value:d,gradientId:"desktop-flow-shared-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-shared-out"})}

        ${U({path:"M 690 272 C 632 292 566 294 500 278",value:_,gradientId:"desktop-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"desktop-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${c?U({path:"M 430 404 C 430 370 430 336 430 302",value:E,gradientId:"desktop-flow-gas",colorVar:"var(--clr-gas)",filterId:"desktop-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,ce=()=>`
    <div class="elite-scene elite-scene-mobile">
      <svg class="elite-main-svg" viewBox="0 0 420 560" fill="none" preserveAspectRatio="xMidYMid meet">
        ${le("mobile")}
        <rect x="20" y="20" width="380" height="520" rx="32" fill="url(#mobile-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="210" cy="316" rx="136" ry="38" fill="url(#mobile-house-base-glow)" opacity="0.58" />
        <line x1="64" y1="332" x2="356" y2="332" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.42" />

        ${Q({x:132,y:40,width:156,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${m(n)} kWh`})}

        ${Q({x:20,y:194,width:126,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${m(S+h)} kWh`})}

        ${Q({x:274,y:194,width:126,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${m(y)} kWh`})}

        ${c?Q({x:122,y:442,width:176,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${m(i)} kWh`,detail:u>0?`${m(u)} m3`:"Gas meter active"}):""}

        ${de({x:210,y:126,scale:.92,glowId:"mobile-glow-green"})}
        ${ne({x:76,y:254,scale:.86,glowId:"mobile-glow-red"})}
        ${ge({x:344,y:260,scale:.86,glowId:"mobile-glow-cyan"})}
        ${c?q({x:210,y:442,scale:.9,glowId:"mobile-glow-gas"}):""}
        ${N({prefix:"mobile",x:118,y:166,scale:.94})}

        ${U({path:"M 210 152 C 210 188 210 216 210 238",value:k,gradientId:"mobile-flow-solar",colorVar:"var(--clr-production)",filterId:"mobile-glow-green",particleClass:"flow-solar"})}

        ${U({path:"M 104 286 C 138 286 168 286 194 286",value:S,gradientId:"mobile-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"mobile-glow-red",particleClass:"flow-grid-in"})}

        ${U({path:"M 226 318 C 194 340 162 348 102 350",value:h,gradientId:"mobile-flow-grid-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-grid-out"})}

        ${U({path:"M 226 286 C 262 274 294 274 318 286",value:d,gradientId:"mobile-flow-shared-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-shared-out"})}

        ${U({path:"M 318 320 C 294 332 262 334 226 322",value:_,gradientId:"mobile-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"mobile-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${c?U({path:"M 210 474 C 210 432 210 390 210 344",value:E,gradientId:"mobile-flow-gas",colorVar:"var(--clr-gas)",filterId:"mobile-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,ke=e!=null&&e.start&&(e!=null&&e.end)?`${we(e.start)} — ${we(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${we(t.customStart+"T00:00:00")} — ${we(t.customEnd+"T00:00:00")}`:((ue=ze.find(C=>C.id===t.range))==null?void 0:ue.label)??"Yesterday",Pe=(Ce=(z=t.consumptionTimeseries)==null?void 0:z.items)!=null&&Ce.length?t.consumptionTimeseries.items:((te=t.productionTimeseries)==null?void 0:te.items)??[],Ke=t.chartViewportStart??((_e=Pe[0])==null?void 0:_e.startedAt)??(e==null?void 0:e.start),Ie=t.chartViewportEnd??((re=Pe[Pe.length-1])==null?void 0:re.startedAt)??(e==null?void 0:e.end),Ve=Pt(Ke,Ie),ee=Ms(t.chartTimeBucket),Se=_a(Ke,Ie),Me=Cs(Ke,Ie,t.chartTimeBucket,1),Xe=new Date,mt=!Me||Me.start.getTime()>Xe.getTime(),ht=lt.map(C=>{const L=Ye(C.id,Ve),F=C.id===t.chartTimeBucket,B=C.id==="quarter_hour"?"15-minute detail would be too dense for this selected period":`${C.label} detail does not add useful resolution for this selected period`;return`
            <button
              class="unit-btn chart-bucket-btn ${F?"active":""}"
              data-chart-bucket="${C.id}"
              title="${L?`Show ${C.label.toLowerCase()} detail`:B}"
              ${L?"":'disabled aria-disabled="true"'}
            >${C.label}</button>
          `}).join(""),gt=t.chartUnit==="kw"?"kW uses the same detail presets as kWh, but keeps power values in interval bars so short spikes and dips stay visible.":"kWh keeps the aggregated period bars for totals.",Re=`${t.chartConsumptionView==="house"?"Total Usage shows the full house load, with the solar-covered share highlighted in green and exports below zero. Use the detail presets and arrows above the graph to move through time.":t.chartConsumptionView==="solar_systems"?"PV Systems stacks each configured solar production meter so you can compare panel-system output like the Home Assistant Energy dashboard.":"Net Grid focuses on what still came from the grid after solar, with exports shown below zero. The reference limit in kW mode applies here."} ${gt}`,Ae=((e==null?void 0:e.exceedance_kwh)??0)>0?me("warning"):me("ok");return`
    <div class="dashboard" style="position: relative;">
      <div style="position:fixed;bottom:4px;right:4px;font-size:10px;opacity:0.5;pointer-events:none;z-index:9999;">v:2.17.1</div>

      <!-- Range Selector -->
      <div class="range-selector">
        ${ze.map(C=>`
          <button
            class="range-btn ${C.id===t.range?"active":""}"
            data-range="${C.id}"
          >${C.label}</button>
        `).join("")}
      </div>

      ${(()=>{if(!(e!=null&&e.start)||!(e!=null&&e.end))return"";try{const C=new Date(e.start),L=new Date(e.end);return isNaN(C.getTime())||isNaN(L.getTime())?"":`
            <div class="range-info-bar">
              📅 ${C.toLocaleDateString()} — ${L.toLocaleDateString()}
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
              <span class="flow-scene-chip community">Community ${m(y)} kWh</span>
              ${v>0?`<span class="flow-scene-chip neutral">Peak ${m(v,2)} kW</span>`:""}
            </div>

            <p class="flow-scene-caption">
              Thicker paths show larger energy volumes for the selected period. Green flows stay in the home, red flows come from the grid, blue flows leave the home or community, and amber shows gas.
            </p>

            ${ve()}
            ${ce()}

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${m(M)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${m(l,0)}% of home usage solar-covered${v>0?` · Peak ${m(v,2)} kW`:""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${m($)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${J($)}%;"></span></div>
                  <p>Energy used inside the house${_>0?", including received community energy":""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${m(S)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${J(S)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${m(h)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${J(h)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${m(y)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${J(y)}%;"></span></div>
                  <p>Sent ${m(d)} kWh · received ${m(_)} kWh.</p>
                </div>
                ${c?`
                <div class="mobile-flow-item gas">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Gas to house</span>
                    <strong>${m(i)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${J(E||p)}%;"></span></div>
                  <p>${u>0?`${m(u)} m3 measured for the same period.`:"Gas meter is configured for this home."}</p>
                </div>
                `:""}
              </div>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${m($)} kWh directly supplied inside the house</span>
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
                  <span>${m(d)} kWh sent · ${m(_)} kWh received${_>0?" (included in solar to home)":""}</span>
                </span>
              </div>
              ${c?`
              <div class="flow-legend-item gas">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Gas to house</strong>
                  <span>${m(i)} kWh${u>0?` / ${m(u)} m3`:""}</span>
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
          ${v>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${m(v,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label"><span class="metric-status-icon">${Ae}</span> Exceedance</span>
              <span class="metric-value">${m((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${i>0||u>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${m(i)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${m(u)} m³</span>
            </div>
          </div>
          `:""}
        </div>
      </div>
      </div>

      <!-- Chart -->
      <div class="card chart-card">
        <div class="chart-header">
          <h3 class="card-title"><span class="title-icon">${me("profile")}</span> Energy Profile — ${ke}</h3>
          <div class="chart-period-status">
            <span class="chart-period-kicker">Showing</span>
            <strong>${Se}</strong>
            <span>${ee.label} detail</span>
          </div>

          <div class="chart-control-stack">
            <div class="chart-period-controls" aria-label="Move chart period">
              <button
                class="chart-nav-btn"
                data-chart-period-nav="prev"
                title="Previous ${ee.stepLabel}"
                aria-label="Previous ${ee.stepLabel}"
              >&larr;</button>
              <span class="chart-period-pill">${Se}</span>
              <button
                class="chart-nav-btn"
                data-chart-period-nav="next"
                title="Next ${ee.stepLabel}"
                aria-label="Next ${ee.stepLabel}"
                ${mt?'disabled aria-disabled="true"':""}
              >&rarr;</button>
            </div>

            <div class="chart-bucket-toggle" aria-label="Chart detail presets">
              ${ht}
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
          ${Re}
        </p>
      </div>

      </div>

      </div>
    </section>
  `}function xa(t=""){return{iso:t,consumptionKw:0,productionKw:0,gridImportKw:0,solarExportKw:0}}function st(t,e,s){for(const a of(e==null?void 0:e.items)??[]){const n=new Date(a.startedAt).getTime();if(!Number.isFinite(n))continue;const o=t.get(n)??xa(a.startedAt);o[s]+=Math.max(0,Number(a.value)||0),o.iso||(o.iso=a.startedAt),t.set(n,o)}}function ka(t,e,s={}){var r,i,u,v;const a=new Map,n=!!((i=(r=s.gridImport)==null?void 0:r.items)!=null&&i.length),o=!!((v=(u=s.marketExport)==null?void 0:u.items)!=null&&v.length);return st(a,t,"consumptionKw"),st(a,e,"productionKw"),st(a,s.gridImport,"gridImportKw"),st(a,s.marketExport,"solarExportKw"),[...a.entries()].sort((f,b)=>f[0]-b[0]).map(([f,b])=>{const _=Math.max(0,b.consumptionKw),d=Math.max(0,b.productionKw),h=Math.max(0,Math.min(_,d)),g=n?Math.max(0,b.gridImportKw):Math.max(0,_-h),$=Math.max(0,_-g),k=o?Math.max(0,b.solarExportKw):Math.max(0,d-h);return{timestamp:f,iso:b.iso||new Date(f).toISOString(),consumptionKw:_,productionKw:d,solarToHomeKw:$,gridImportKw:g,solarExportKw:k}})}function dt(t,e){return Number.isFinite(t)?Number(t):e}function Et(t,e,s){return Math.min(s,Math.max(e,t))}function Sa(t,e,s){const a=t.reduce((d,h)=>d+h.producedKwh,0),n=t.reduce((d,h)=>d+h.selfConsumedKwh,0),o=t.reduce((d,h)=>d+h.exportedKwh,0),r=dt(e,n),i=dt(s,o),u=Math.max(0,r)+Math.max(0,i),v=Math.max(0,a-Math.max(0,i));if(a<=0)return{selfConsumedKwh:0,exportedKwh:0};if(u<=a+1e-6)return{selfConsumedKwh:Et(Math.max(Math.max(0,r),v),0,a),exportedKwh:Et(Math.max(0,i),0,a)};const f=u>0?Math.max(0,r)/u:0,b=Math.min(a,Math.max(0,r)),_=Et(a*f,0,b);return{selfConsumedKwh:_,exportedKwh:Math.max(0,a-_)}}function Ma(t,e){const s=t?t.slice(-8):"";return s?`Solar ${e} (${s})`:`Solar ${e}`}function Kt(t,e,s){return(typeof s=="string"?s.trim():"")||Ma(t,e)}function At(t){const e=(t.meters??[]).filter(n=>n.types.includes("production")||n.types.includes("solar_consumption")),s=t.feed_in_rates??[],a=t.currency??"EUR";return e.map((n,o)=>{const r=s.find(_=>_.meter_id===n.id),i=(r==null?void 0:r.mode)==="sensor"&&r.sensor_value!=null&&Number.isFinite(r.sensor_value),u=i?(r==null?void 0:r.sensor_value)??0:dt(r==null?void 0:r.tariff,dt(t.feed_in_tariff,0)),v=r==null?void 0:r.self_use_priority,f=v==null||v===""||!Number.isFinite(Number(v))?null:Math.max(1,Math.round(Number(v))),b=Kt(n.id,o+1,r==null?void 0:r.display_name);return{meterId:n.id,shortId:n.id?"…"+n.id.slice(-8):`Meter ${o+1}`,displayName:b,rate:u,label:i?`Sensor (${u.toFixed(4)} ${a}/kWh)`:"Fixed tariff",mode:(r==null?void 0:r.mode)??"fixed",selfUsePriority:f}}).map((n,o)=>({rate:n,order:o})).sort((n,o)=>{const r=n.rate.selfUsePriority??Number.POSITIVE_INFINITY,i=o.rate.selfUsePriority??Number.POSITIVE_INFINITY;return r!==i?r-i:n.order-o.order}).map(n=>n.rate)}function it(t){return t==null?"Pro-rata self-use":`Self-use priority ${t}`}function Ts(t){return t==="prorata"?"Prorata Modus: no self-use priority is configured, so each PV system's self-consumption and export are shared in proportion to what it produced in each 15-minute interval.":t==="mixed"?"Per-system self-consumption and export are allocated from each PV system's 15-minute production: systems with a self-use priority are served first (1 = consumed first at home), and systems sharing or missing a priority split the rest pro-rata to their own production.":"Per-system self-consumption and export are allocated from each PV system's 15-minute production using the configured self-use priority (1 = consumed first at home)."}function Ca(t){if(!t.length)return"prorata";const e=t.filter(a=>a.selfUsePriority!=null);return e.length===0?"prorata":e.length<t.length?"mixed":new Set(e.map(a=>a.selfUsePriority)).size===e.length?"priority":"mixed"}function Ta(t){const e=[];let s;for(const a of t){const n=a.selfUsePriority;if(e.length>0&&n===s){e[e.length-1].push(a);continue}e.push([a]),s=n}return e}function Ht(t,e,s,a,n){if(!e||!(s!=null&&s.length))return null;const o=At(t);if(!o.length)return null;const r=new Map(s.map(l=>[l.meter_id,l]));if(!o.some(l=>r.has(l.meterId)))return null;const i=o.map(l=>({...l,producedKwh:0,selfConsumedKwh:0,exportedKwh:0,revenue:0,exportEquivalentForSelfUse:0})),u=new Map(i.map((l,p)=>[l.meterId,p])),v=new Map,f=new Set;for(const l of e.items)l.startedAt&&f.add(l.startedAt);const b=new Map;for(const l of e.items){const p=Math.max(0,Number(l.value)||0);b.set(l.startedAt,(b.get(l.startedAt)??0)+p)}for(const l of s){const p=new Map;for(const E of l.items??[]){const D=Math.max(0,Number(E.value)||0);p.set(E.startedAt,(p.get(E.startedAt)??0)+D),E.startedAt&&f.add(E.startedAt)}v.set(l.meter_id,p)}const _=Ta(i);for(const l of[...f].sort()){let p=Math.max(0,b.get(l)??0);for(const E of _){const D=E.map(K=>{var I;return Math.max(0,((I=v.get(K.meterId))==null?void 0:I.get(l))??0)}),P=D.reduce((K,I)=>K+I,0);if(P<=0)continue;const R=Math.min(p,P);E.forEach((K,I)=>{const O=u.get(K.meterId);if(O==null)return;const se=D[I],J=R*(se/P);i[O].producedKwh+=se*.25,i[O].selfConsumedKwh+=J*.25,i[O].exportedKwh+=Math.max(0,se-J)*.25}),p=Math.max(0,p-R)}}const d=i.reduce((l,p)=>l+p.selfConsumedKwh,0),h=i.reduce((l,p)=>l+p.exportedKwh,0),g=Sa(i,a,n),$=g.selfConsumedKwh,k=g.exportedKwh,x=d>0?$/d:1,S=h>0?k/h:1;for(const l of i)l.selfConsumedKwh*=x,l.exportedKwh*=S,l.revenue=l.exportedKwh*l.rate,l.exportEquivalentForSelfUse=l.selfConsumedKwh*l.rate;const M=i.reduce((l,p)=>l+p.revenue,0),c=i.reduce((l,p)=>l+p.exportEquivalentForSelfUse,0),y=k>0?M/k:0;return{meters:i,totalFeedInRevenue:M,totalSelfUseExportEquivalent:c,weightedExportRate:y,usedPriorityAllocation:!0,allocationMode:Ca(o)}}const ls=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],Oe={house:"Total Usage",grid:"Net Grid",solar:"Solar Production",exceedance_kwh:"Exceedance kWh",exceedance_frequency:"Exceedance Rate"},at={house:"Total Usage",grid:"Net Grid",solar:"Solar Production"},Le={previous:"Previous Period",last_year:"Last Year"};function ds(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function Ea(t){const e=new Date(t),s=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${s}-${a}-${n}`}function Da(t){const[e,s,a]=t.split("-").map(Number);return new Date(e,s-1,a,12,0,0,0)}function ie(t,e=0){return t.length?Math.max(...t):e}function jt(t,e=0){return t.length?Math.min(...t):e}function be(t,e,s){return Math.min(s,Math.max(e,t))}function Y(t,e){if(!t.length)return 0;const s=[...t].sort((u,v)=>u-v),a=be(e,0,1),n=(s.length-1)*a,o=Math.floor(n),r=Math.ceil(n);if(o===r)return s[o];const i=n-o;return s[o]*(1-i)+s[r]*i}function La(t){const e=Math.floor(t/4),s=t%4*15;return`${String(e).padStart(2,"0")}:${String(s).padStart(2,"0")}`}function j(t,e){return`${m(t,2)} ${e}`}function ct(t,e){return`${t>0?"+":t<0?"-":""}${m(Math.abs(t),2)} ${e}`}function rt(t,e=1){return Math.abs(t)<.005?"0":`${t>0?"+":""}${m(t,e)}`}function cs(t){const[e,s]=t.split(":").map(a=>parseInt(a,10)||0);return e*60+s}function Fa(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function Es(t,e,s,a){if(!Fa(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),o=cs(s),r=cs(a);return o===r?!0:o<r?n>=o&&n<r:n>=o||n<r}function Wa(t,e){return e.find(s=>Es(t,s.day_group,s.start_time,s.end_time))}function Pa(t,e){return e.find(s=>Es(t,s.day_group,s.start_time,s.end_time))}function Ds(t,e,s,a,n){const o=Ht(t,e,s,a,n);if(o&&o.weightedExportRate>0)return o.weightedExportRate;const r=At(t).map(i=>i.rate).filter(i=>Number.isFinite(i)&&i>=0);return r.length?r.reduce((i,u)=>i+u,0)/r.length:t.feed_in_tariff??0}function Ka(t,e,s,a,n,o){const r=n.consumption_rate_windows??[],i=n.reference_power_windows??[],u=n.reference_power_kw??0,v=(n.exceedance_rate??0)*(1+(n.vat_rate??0));return ka(t,e,{gridImport:s,marketExport:a}).map(f=>{var p,E;const b=f.timestamp,_=new Date(b),d=f.consumptionKw,h=f.productionKw,g=f.solarToHomeKw,$=f.gridImportKw,k=f.solarExportKw,x=((p=Pa(_,i))==null?void 0:p.reference_power_kw)??u,S=Math.max(0,d-x),M=Math.max(0,$-x),c=Math.max(0,S-M),l=((((E=Wa(_,r))==null?void 0:E.rate)??n.energy_variable_rate??0)+(n.network_variable_rate??0)+(n.electricity_tax_rate??0)+(n.compensation_fund_rate??0))*(1+(n.vat_rate??0));return{timestamp:b,iso:f.iso,date:_,houseKw:d,solarKw:h,solarToHomeKw:g,gridKw:$,exportKw:k,referenceKw:x,overKw:M,avoidedOverKw:c,importRateWithVat:l,feedInRate:o,exceedanceRateWithVat:v}})}function Ls(t,e,s,a,n,o){const r=Ka(t,e,s,a,n,o),i=new Map,u=Array.from({length:24},()=>0),v=Array.from({length:24},(c,y)=>({label:`${String(y).padStart(2,"0")}:00`,importCost:0,exportSpreadValue:0,gridKwh:0,exportKwh:0})),f={house:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),grid:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),solar:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_kwh:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_frequency:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0})))},b=()=>Array.from({length:96},()=>[]),_={house:{weekday:b(),weekend:b()},grid:{weekday:b(),weekend:b()},solar:{weekday:b(),weekend:b()}},d={houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0};for(const c of r){const l=Ea(c.timestamp),p=i.get(l)??(()=>{const ce=Da(l);return{key:l,label:ce.toLocaleDateString(void 0,{month:"short",day:"numeric"}),fullDate:ce.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0}})(),E=c.houseKw*.25,D=c.solarKw*.25,P=c.solarToHomeKw*.25,R=c.gridKw*.25,K=c.exportKw*.25,I=c.overKw*.25,O=c.avoidedOverKw*.25,se=R*c.importRateWithVat,J=P*c.importRateWithVat,le=K*c.feedInRate,Q=P*(c.importRateWithVat-c.feedInRate),ne=I*c.exceedanceRateWithVat,de=O*c.exceedanceRateWithVat,ge=J+le+de-se-ne;p.houseKwh+=E,p.solarKwh+=D,p.solarToHomeKwh+=P,p.gridKwh+=R,p.exportKwh+=K,p.exceedanceKwh+=I,p.avoidedExceedanceKwh+=O,p.importCost+=se,p.solarSavings+=J,p.exportRevenue+=le,p.selfConsumptionAdvantage+=Q,p.exceedanceCost+=ne,p.avoidedExceedanceValue+=de,p.netValue+=ge,p.peakGridKw=Math.max(p.peakGridKw,c.gridKw),p.peakHouseKw=Math.max(p.peakHouseKw,c.houseKw),p.exceedanceIntervals+=c.overKw>0?1:0,i.set(l,p),d.houseKwh+=E,d.solarKwh+=D,d.solarToHomeKwh+=P,d.gridKwh+=R,d.exportKwh+=K,d.exceedanceKwh+=I,d.avoidedExceedanceKwh+=O,d.importCost+=se,d.solarSavings+=J,d.exportRevenue+=le,d.selfConsumptionAdvantage+=Q,d.exceedanceCost+=ne,d.avoidedExceedanceValue+=de,d.netValue+=ge,d.peakGridKw=Math.max(d.peakGridKw,c.gridKw),d.peakHouseKw=Math.max(d.peakHouseKw,c.houseKw),d.exceedanceIntervals+=c.overKw>0?1:0;const q=(c.date.getDay()+6)%7,N=c.date.getHours(),U=N*4+Math.floor(c.date.getMinutes()/15),ve=c.date.getDay()===0||c.date.getDay()===6?"weekend":"weekday";f.house[q][N].sum+=c.houseKw,f.house[q][N].count+=1,f.grid[q][N].sum+=c.gridKw,f.grid[q][N].count+=1,f.solar[q][N].sum+=c.solarKw,f.solar[q][N].count+=1,f.exceedance_kwh[q][N].sum+=I,f.exceedance_kwh[q][N].count+=1,f.exceedance_frequency[q][N].sum+=c.overKw>0?1:0,f.exceedance_frequency[q][N].count+=1,u[N]+=I,_.house[ve][U].push(c.houseKw),_.grid[ve][U].push(c.gridKw),_.solar[ve][U].push(c.solarKw),v[N].importCost+=se,v[N].exportSpreadValue+=K*Math.max(c.importRateWithVat-c.feedInRate,0),v[N].gridKwh+=R,v[N].exportKwh+=K}const h=[...i.values()].sort((c,y)=>c.key.localeCompare(y.key)).map(c=>(c.coveragePct=c.houseKwh>0?c.solarToHomeKwh/c.houseKwh*100:0,c.selfConsumedPct=c.solarKwh>0?be(c.solarToHomeKwh/c.solarKwh*100,0,100):0,c.solarValue=c.solarSavings+c.exportRevenue+c.avoidedExceedanceValue,c));d.coveragePct=d.houseKwh>0?d.solarToHomeKwh/d.houseKwh*100:0,d.selfConsumedPct=d.solarKwh>0?be(d.solarToHomeKwh/d.solarKwh*100,0,100):0,d.solarValue=d.solarSavings+d.exportRevenue+d.avoidedExceedanceValue;const g={house:f.house.map(c=>c.map(y=>y.count?y.sum/y.count:0)),grid:f.grid.map(c=>c.map(y=>y.count?y.sum/y.count:0)),solar:f.solar.map(c=>c.map(y=>y.count?y.sum/y.count:0)),exceedance_kwh:f.exceedance_kwh.map(c=>c.map(y=>y.sum)),exceedance_frequency:f.exceedance_frequency.map(c=>c.map(y=>y.count?y.sum/y.count*100:0))},$=Array.from({length:96},(c,y)=>La(y)),k={house:{weekday:{lower:_.house.weekday.map(c=>Y(c,.1)),median:_.house.weekday.map(c=>Y(c,.5)),upper:_.house.weekday.map(c=>Y(c,.9))},weekend:{lower:_.house.weekend.map(c=>Y(c,.1)),median:_.house.weekend.map(c=>Y(c,.5)),upper:_.house.weekend.map(c=>Y(c,.9))}},grid:{weekday:{lower:_.grid.weekday.map(c=>Y(c,.1)),median:_.grid.weekday.map(c=>Y(c,.5)),upper:_.grid.weekday.map(c=>Y(c,.9))},weekend:{lower:_.grid.weekend.map(c=>Y(c,.1)),median:_.grid.weekend.map(c=>Y(c,.5)),upper:_.grid.weekend.map(c=>Y(c,.9))}},solar:{weekday:{lower:_.solar.weekday.map(c=>Y(c,.1)),median:_.solar.weekday.map(c=>Y(c,.5)),upper:_.solar.weekday.map(c=>Y(c,.9))},weekend:{lower:_.solar.weekend.map(c=>Y(c,.1)),median:_.solar.weekend.map(c=>Y(c,.5)),upper:_.solar.weekend.map(c=>Y(c,.9))}}},x=r.filter(c=>c.overKw>0).sort((c,y)=>y.overKw-c.overKw||y.timestamp-c.timestamp).slice(0,8),S=[...r].sort((c,y)=>y.houseKw-c.houseKw||y.timestamp-c.timestamp).slice(0,8),M=[...h].filter(c=>c.exceedanceKwh>0).sort((c,y)=>y.exceedanceKwh-c.exceedanceKwh).slice(0,6);return{points:r,daily:h,totals:d,topExceedances:x,peakIntervals:S,hourlyExceedanceKwh:u,heatmapValues:g,intradayProfiles:k,intradayLabels:$,hourlyOpportunity:v,loadDurationGrossKw:r.map(c=>c.houseKw).sort((c,y)=>y-c),loadDurationNetKw:r.map(c=>c.gridKw).sort((c,y)=>y-c),worstDays:M}}function Ia(t){var e,s,a;return(e=t.rangeData)!=null&&e.start&&((s=t.rangeData)!=null&&s.end)?`${we(t.rangeData.start)} - ${we(t.rangeData.end)}`:((a=ze.find(n=>n.id===t.range))==null?void 0:a.label)??"Selected Period"}function Va(t){var e,s;return(e=t.rangeData)!=null&&e.start&&((s=t.rangeData)!=null&&s.end)?`${Fe(t.rangeData.start)} - ${Fe(t.rangeData.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${t.customStart} - ${t.customEnd}`:"Based on the currently selected range."}function us(t){const e=t.analysisComparisonMode==="last_year"?"Same period last year":"Previous matched period";return t.analysisComparison?`${e}: ${Fe(t.analysisComparison.start)} - ${Fe(t.analysisComparison.end)}`:e}function Ra(t){switch(t){case"house":return{description:"Average hourly power by weekday for total house usage.",note:"Each cell shows the average kW seen in that weekday/hour slot over the selected period."};case"grid":return{description:"Average hourly power by weekday for remaining grid draw after solar.",note:"Each cell shows the average net-grid kW seen in that weekday/hour slot over the selected period."};case"solar":return{description:"Average hourly power by weekday for solar production.",note:"Each cell shows the average solar kW seen in that weekday/hour slot over the selected period."};case"exceedance_kwh":return{description:"Cumulative exceedance energy by weekday and hour, showing where the reference limit hurt the most.",note:"Each cell shows cumulative exceedance kWh recorded in that weekday/hour slot over the selected period."};case"exceedance_frequency":return{description:"How often each weekday/hour slot went over the reference limit.",note:"Each cell shows the share of 15-minute intervals in that weekday/hour slot that exceeded the reference limit."}}}function Aa(t,e){switch(t){case"house":case"grid":case"solar":return`${m(e,2)} kW average`;case"exceedance_kwh":return`${m(e,2)} kWh`;case"exceedance_frequency":return`${m(e,0)}% of intervals`}}function he(t){const e=t.series.filter(l=>l.values.length>0);if(!e.length)return'<div class="analysis-empty">No chart data available for this period.</div>';const s=Math.max(...e.map(l=>l.values.length)),a=Math.max(720,s*24+92),n=244,o=50,r=20,i=18,u=30,v=e.flatMap(l=>l.values);t.referenceValue!=null&&v.push(t.referenceValue);let f=t.minValue??jt(v,0),b=t.maxValue??ie(v,1);f===b&&(b+=1,f=Math.min(0,f-1)),t.minValue==null&&(f=Math.min(0,f));const _=a-o-r,d=n-i-u,h=(l,p)=>p<=1?o+_/2:o+l*_/(p-1),g=l=>i+(b-l)/(b-f)*d,$=t.valueFormatter??(l=>m(l,1)),k=Array.from({length:4},(l,p)=>f+(b-f)/3*p),x=[0,Math.floor((s-1)/2),s-1].filter((l,p,E)=>E.indexOf(l)===p),S=k.map(l=>{const p=g(l);return`
      <line x1="${o}" y1="${p.toFixed(1)}" x2="${(a-r).toFixed(1)}" y2="${p.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(p+4).toFixed(1)}" class="analysis-svg-tick">${$(l)}</text>
    `}).join(""),M=t.referenceValue!=null?(()=>{const l=g(t.referenceValue);return`
        <line x1="${o}" y1="${l.toFixed(1)}" x2="${(a-r).toFixed(1)}" y2="${l.toFixed(1)}" class="analysis-svg-reference" />
        ${t.referenceLabel?`<text x="${a-r}" y="${(l-8).toFixed(1)}" class="analysis-svg-reference-label">${t.referenceLabel}</text>`:""}
      `})():"",c=e.map(l=>{const p=l.values.map((D,P)=>{const R=h(P,l.values.length),K=g(D);return`${P===0?"M":"L"} ${R.toFixed(1)} ${K.toFixed(1)}`}).join(" "),E=l.values.length<=40?l.values.map((D,P)=>{const R=h(P,l.values.length),K=g(D);return`<circle cx="${R.toFixed(1)}" cy="${K.toFixed(1)}" r="2.6" fill="${l.color}" />`}).join(""):"";return`
      <path d="${p}" fill="none" stroke="${l.color}" stroke-width="2.5" ${l.dashed?'stroke-dasharray="6 4"':""} />
      ${E}
    `}).join(""),y=x.map(l=>{const p=h(l,s),E=t.labels[l]??`Point ${l+1}`;return`<text x="${p.toFixed(1)}" y="${n-8}" text-anchor="middle" class="analysis-svg-x-label">${E}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${a}" height="${n}" viewBox="0 0 ${a} ${n}" role="img" aria-label="${t.title??"Line chart"}">
        ${S}
        ${M}
        ${c}
        ${y}
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
  `}function Ha(t){const e=t.series.filter(y=>y.band.median.length>0);if(!e.length)return'<div class="analysis-empty">No profile data available for this period.</div>';const s=Math.max(...e.map(y=>y.band.median.length)),a=Math.max(760,s*12+92),n=248,o=50,r=20,i=18,u=30,v=e.flatMap(y=>[...y.band.lower,...y.band.median,...y.band.upper]),f=Math.min(0,jt(v,0));let b=ie(v,1);b<=f&&(b=f+1);const _=a-o-r,d=n-i-u,h=(y,l)=>l<=1?o+_/2:o+y*_/(l-1),g=y=>i+(b-y)/(b-f)*d,$=t.valueFormatter??(y=>m(y,1)),k=Array.from({length:4},(y,l)=>f+(b-f)/3*l),x=[0,16,32,48,64,80,s-1].filter((y,l,p)=>y>=0&&y<s&&p.indexOf(y)===l),S=k.map(y=>{const l=g(y);return`
      <line x1="${o}" y1="${l.toFixed(1)}" x2="${(a-r).toFixed(1)}" y2="${l.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(l+4).toFixed(1)}" class="analysis-svg-tick">${$(y)}</text>
    `}).join(""),M=e.map(y=>{const l=y.band.upper.map((D,P)=>{const R=h(P,y.band.upper.length),K=g(D);return`${P===0?"M":"L"} ${R.toFixed(1)} ${K.toFixed(1)}`}).join(" "),p=[...y.band.lower].reverse().map((D,P)=>{const R=y.band.lower.length-1-P,K=h(R,y.band.lower.length),I=g(D);return`L ${K.toFixed(1)} ${I.toFixed(1)}`}).join(" "),E=y.band.median.map((D,P)=>{const R=h(P,y.band.median.length),K=g(D);return`${P===0?"M":"L"} ${R.toFixed(1)} ${K.toFixed(1)}`}).join(" ");return`
      <path d="${l} ${p} Z" fill="${y.fill}" stroke="none" />
      <path d="${E}" fill="none" stroke="${y.color}" stroke-width="2.4" ${y.dashed?'stroke-dasharray="6 4"':""} />
    `}).join(""),c=x.map(y=>{const l=h(y,s),p=t.labels[y]??`Point ${y+1}`;return`<text x="${l.toFixed(1)}" y="${n-8}" text-anchor="middle" class="analysis-svg-x-label">${p}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${a}" height="${n}" viewBox="0 0 ${a} ${n}" role="img" aria-label="${t.title??"Band chart"}">
        ${S}
        ${M}
        ${c}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      ${e.map(y=>`
        <span class="analysis-legend-item">
          <span class="analysis-legend-swatch" style="background:${y.color};"></span>
          <span>${y.label}</span>
        </span>
      `).join("")}
    </div>
  `}function ja(t){const e=new Date(t.timestamp);return{date:e.toLocaleDateString(void 0,{month:"short",day:"numeric"}),time:e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}}function Na(t){if(!t.length)return'<div class="analysis-empty">No peak intervals available for this period.</div>';const e=Math.max(760,t.length*86+96),s=276,a=52,n=16,o=18,r=54,i=ie(t.map(g=>g.houseKw),1),u=e-a-n,v=s-o-r,f=o+v,b=u/t.length,_=Math.max(22,Math.min(38,b*.54)),d=t.map((g,$)=>{const k=a+$*b+(b-_)/2,x=g.solarToHomeKw/i*v,M=Math.max(0,Math.min(g.gridKw,g.referenceKw))/i*v,c=Math.max(0,g.gridKw-g.referenceKw)/i*v;return`
      <g>
        <rect x="${k.toFixed(1)}" y="${(f-x).toFixed(1)}" width="${_.toFixed(1)}" height="${x.toFixed(1)}" rx="4" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${k.toFixed(1)}" y="${(f-x-M).toFixed(1)}" width="${_.toFixed(1)}" height="${M.toFixed(1)}" rx="4" fill="rgba(248, 81, 73, 0.62)" />
        ${c>0?`<rect x="${k.toFixed(1)}" y="${(f-x-M-c).toFixed(1)}" width="${_.toFixed(1)}" height="${c.toFixed(1)}" rx="4" fill="rgba(210, 153, 34, 0.92)" />`:""}
      </g>
    `}).join(""),h=t.map((g,$)=>{const k=a+$*b+b/2,{date:x,time:S}=ja(g);return`
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
  `}function Ga(t){if(!t.length)return'<div class="analysis-empty">No daily energy data available.</div>';const e=Math.max(760,t.length*28+84),s=250,a=52,n=16,o=18,r=34,i=ie(t.map(S=>S.houseKwh),1),u=ie(t.map(S=>S.exportKwh),0),v=e-a-n,f=s-o-r,b=u>0?f*.72:f,_=u>0?f-b:0,d=o+b,h=v/t.length,g=Math.max(8,Math.min(18,h*.62)),$=Math.max(1,Math.ceil(t.length/10)),k=t.map((S,M)=>{const c=a+M*h+(h-g)/2,y=S.solarToHomeKwh/i*b,l=S.gridKwh/i*b,p=u>0?S.exportKwh/u*_:0,E=d-y-l-8;return`
      <g>
        <rect x="${c.toFixed(1)}" y="${(d-y).toFixed(1)}" width="${g.toFixed(1)}" height="${y.toFixed(1)}" rx="3" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${c.toFixed(1)}" y="${(d-y-l).toFixed(1)}" width="${g.toFixed(1)}" height="${l.toFixed(1)}" rx="3" fill="rgba(248, 81, 73, 0.55)" />
        ${p>0?`<rect x="${c.toFixed(1)}" y="${d.toFixed(1)}" width="${g.toFixed(1)}" height="${p.toFixed(1)}" rx="3" fill="rgba(88, 166, 255, 0.75)" />`:""}
        ${S.exceedanceKwh>0?`<circle cx="${(c+g/2).toFixed(1)}" cy="${E.toFixed(1)}" r="3.2" fill="#d29922" />`:""}
      </g>
    `}).join(""),x=t.map((S,M)=>M%$!==0&&M!==t.length-1?"":`<text x="${(a+M*h+h/2).toFixed(1)}" y="${s-10}" text-anchor="middle" class="analysis-svg-x-label">${S.label}</text>`).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${s}" viewBox="0 0 ${e} ${s}" role="img" aria-label="Daily energy breakdown">
        <line x1="${a}" y1="${d.toFixed(1)}" x2="${(e-n).toFixed(1)}" y2="${d.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${a-8}" y="${(o+4).toFixed(1)}" class="analysis-svg-tick">${m(i,0)} kWh</text>
        ${u>0?`<text x="${a-8}" y="${(s-r+4).toFixed(1)}" class="analysis-svg-tick">-${m(u,0)} kWh</text>`:""}
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
  `}function Oa(t,e){const s=be(e,0,1);return t==="solar"?`rgba(63, 185, 80, ${.12+s*.82})`:t==="exceedance_kwh"||t==="exceedance_frequency"?`rgba(210, 153, 34, ${.14+s*.82})`:t==="grid"?`rgba(210, 153, 34, ${.12+s*.82})`:`rgba(248, 81, 73, ${.12+s*.82})`}function Ua(t,e){const s=t.flat(),a=ie(s,1),n=jt(s,0);return`
    <div class="analysis-heatmap">
      <div class="analysis-heatmap-hours">
        <span class="analysis-heatmap-corner"></span>
        ${Array.from({length:24},(o,r)=>`
          <span class="analysis-heatmap-hour ${r%2===1?"analysis-heatmap-hour-faded":""}">${String(r).padStart(2,"0")}</span>
        `).join("")}
      </div>
      ${t.map((o,r)=>`
        <div class="analysis-heatmap-row">
          <span class="analysis-heatmap-day">${ls[r]}</span>
          ${o.map((i,u)=>{const v=a===n?0:(i-n)/(a-n);return`
              <span
                class="analysis-heatmap-cell"
                style="background:${Oa(e,v)};"
                title="${ls[r]} ${String(u).padStart(2,"0")}:00 - ${Aa(e,i)}"
              >${i>(e==="exceedance_frequency"?1:.05)?m(i,e==="exceedance_frequency"?0:1):""}</span>
            `}).join("")}
        </div>
      `).join("")}
    </div>
  `}function ut(t){const e=ie(t.map(s=>s.value),1);return t.length?`
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
  `:'<div class="analysis-empty">No standout patterns in this period.</div>'}function Ba(t){var a,n,o,r;const e=ds(((a=t.rangeData)==null?void 0:a.start)??t.customStart),s=ds(((n=t.rangeData)==null?void 0:n.end)??t.customEnd);return`
    <div class="range-selector">
      ${ze.map(i=>`
        <button
          class="range-btn ${i.id===t.range?"active":""}"
          data-range="${i.id}"
        >${i.label}</button>
      `).join("")}
    </div>
    ${(o=t.rangeData)!=null&&o.start&&((r=t.rangeData)!=null&&r.end)?`
        <div class="range-info-bar">
          Period: ${Fe(t.rangeData.start)} - ${Fe(t.rangeData.end)}
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
  `}function qa(t,e,s){const a=s.communitySolarToHomeKwh>.01?`${m(s.totalSolarCoverageKwh)} kWh of ${m(s.consumptionKwh)} kWh usage covered, incl. ${m(s.communitySolarToHomeKwh)} kWh shared`:`${m(s.totalSolarCoverageKwh)} kWh of ${m(s.consumptionKwh)} kWh usage covered`;return`
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
        <strong class="analysis-stat-value">${ct(s.selfConsumptionAdvantage,e)}</strong>
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
  `}function Ya(t){return`
    <div class="card analysis-card analysis-card-full">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Daily Breakdown</h3>
          <p class="analysis-card-copy">House usage is split into solar-covered energy, grid energy, and exported surplus. A gold marker flags days with any reference-power exceedance.</p>
        </div>
      </div>
      ${Ga(t.daily)}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily exceedance volume</h4>
        ${he({title:"Daily exceedance volume",series:[{label:"Exceedance",color:"#d29922",values:t.daily.map(e=>e.exceedanceKwh)}],labels:t.daily.map(e=>e.label),valueFormatter:e=>`${m(e,2)} kWh`})}
      </div>
    </div>
  `}function za(t,e){const s=Ra(t.analysisHeatmapMetric);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Consumption Pattern Heatmap</h3>
          <p class="analysis-card-copy">${s.description}</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${t.analysisHeatmapMetric==="house"?"active":""}" data-analysis-heatmap="house">${Oe.house}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="grid"?"active":""}" data-analysis-heatmap="grid">${Oe.grid}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="solar"?"active":""}" data-analysis-heatmap="solar">${Oe.solar}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="exceedance_kwh"?"active":""}" data-analysis-heatmap="exceedance_kwh">${Oe.exceedance_kwh}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="exceedance_frequency"?"active":""}" data-analysis-heatmap="exceedance_frequency">${Oe.exceedance_frequency}</button>
        </div>
      </div>
      ${Ua(e.heatmapValues[t.analysisHeatmapMetric],t.analysisHeatmapMetric)}
      <p class="analysis-note">${s.note}</p>
    </div>
  `}function Xa(t,e){const s=t.analysisProfileMetric,a=e.intradayProfiles[s],n=at[s],o=a.weekday.median.reduce((i,u,v,f)=>u>f[i]?v:i,0),r=a.weekend.median.reduce((i,u,v,f)=>u>f[i]?v:i,0);return`
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
      ${Ha({title:`${n} intraday profile`,labels:e.intradayLabels,series:[{label:"Weekday median (p10-p90 band)",color:"#58a6ff",fill:"rgba(88, 166, 255, 0.14)",band:a.weekday},{label:"Weekend median (p10-p90 band)",color:"#d29922",fill:"rgba(210, 153, 34, 0.13)",band:a.weekend,dashed:!0}],valueFormatter:i=>`${m(i,1)} kW`})}
      <p class="analysis-note">This makes the typical daily rhythm much easier to read than the weekday/hour heatmap alone.</p>
    </div>
  `}function Za(t,e,s){const a=t.meters.reduce((o,r)=>o+r.selfConsumedKwh*e,0),n=a+t.totalFeedInRevenue;return`
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
                    <div class="analysis-stat-meta">${o.shortId} · ${it(o.selfUsePriority)}</div>
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
      <p class="analysis-note">${Ts(t.allocationMode)}</p>
      <p class="analysis-note">This subtotal includes self-use savings and export revenue. Avoided exceedance value stays only in the overall solar total because it depends on aggregate site load, not a single solar system.</p>
    </div>
  `}function Ja(t,e,s,a){const n=t.totals.solarKwh>0?be(t.totals.solarToHomeKwh/t.totals.solarKwh*100,0,100):0,o=t.totals.solarKwh>0?be(t.totals.exportKwh/t.totals.solarKwh*100,0,100):0;return`
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
          <strong>${ct(t.totals.selfConsumptionAdvantage,e)}</strong>
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
      ${s!=null&&s.meters.length?Za(s,a,e):""}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Coverage of house usage by day</h4>
        ${he({title:"Daily solar coverage",series:[{label:"Coverage",color:"#3fb950",values:t.daily.map(r=>r.coveragePct)}],labels:t.daily.map(r=>r.label),maxValue:100,minValue:0,valueFormatter:r=>`${m(r,0)}%`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day</h4>
        ${he({title:"Daily solar value",series:[{label:"Solar value",color:"#58a6ff",values:t.daily.map(r=>r.solarValue)}],labels:t.daily.map(r=>r.label),valueFormatter:r=>j(r,e)})}
      </div>
    </div>
  `}function Qa(t,e){const s=[...t.hourlyOpportunity].sort((r,i)=>i.importCost-r.importCost)[0],a=[...t.hourlyOpportunity].sort((r,i)=>i.exportSpreadValue-r.exportSpreadValue)[0],n=[...t.hourlyOpportunity].filter(r=>r.importCost>0).sort((r,i)=>i.importCost-r.importCost).slice(0,5).map(r=>({label:r.label,value:r.importCost,meta:`${j(r.importCost,e)} from ${m(r.gridKwh,1)} kWh`})),o=[...t.hourlyOpportunity].filter(r=>r.exportSpreadValue>0).sort((r,i)=>i.exportSpreadValue-r.exportSpreadValue).slice(0,5).map(r=>({label:r.label,value:r.exportSpreadValue,meta:`${j(r.exportSpreadValue,e)} on ${m(r.exportKwh,1)} kWh`,colorClass:"analysis-progress-fill-warn"}));return`
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
          ${ut(n)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Best export-to-storage hours</h4>
          ${ut(o)}
        </div>
      </div>
      <p class="analysis-note">Export spread opportunity uses the difference between the import rate and feed-in rate for exported energy in that hour, so it is a directional indicator rather than a billing line item.</p>
    </div>
  `}function er(t,e){const s=t.hourlyExceedanceKwh.map((a,n)=>({label:`${String(n).padStart(2,"0")}:00`,value:a,meta:`${m(a,2)} kWh`,colorClass:"analysis-progress-fill-warn"})).filter(a=>a.value>0).sort((a,n)=>n.value-a.value).slice(0,6);return`
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
          <strong>${m(ie(t.topExceedances.map(a=>a.overKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Exceedance cost</span>
          <strong>${j(t.totals.exceedanceCost,e)}</strong>
        </div>
      </div>
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Worst hours</h4>
          ${ut(s)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Worst days</h4>
          ${ut(t.worstDays.map(a=>({label:a.fullDate,value:a.exceedanceKwh,meta:`${m(a.exceedanceKwh,2)} kWh`,colorClass:"analysis-progress-fill-warn"})))}
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
                      <td>${Ss(a.iso)}</td>
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
  `}function tr(t){const e=t.peakIntervals.length?t.peakIntervals.reduce((s,a)=>s+(a.houseKw>0?a.solarToHomeKw/a.houseKw*100:0),0)/t.peakIntervals.length:0;return`
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
          <strong>${m(ie(t.peakIntervals.map(s=>s.houseKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Highest net-grid peak</span>
          <strong>${m(ie(t.peakIntervals.map(s=>s.gridKw),0),2)} kW</strong>
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
      ${Na(t.peakIntervals)}
      <p class="analysis-note">A gold cap only appears when the grid portion of the interval exceeded the configured reference power.</p>
    </div>
  `}function sr(t,e,s){var u,v;const a=e.analysisComparisonMode==="last_year"?"Last year":"Previous";if(e.analysisComparisonLoading)return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${us(e)}</p>
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
    `;const n=Ds(s,e.analysisComparison.consumptionTimeseries,null,void 0,void 0),o=Ls(e.analysisComparison.consumptionTimeseries,e.analysisComparison.productionTimeseries,e.analysisComparison.gridImportTimeseries,e.analysisComparison.marketExportTimeseries,s,n),r=Math.max(t.daily.length,o.daily.length,1),i=Array.from({length:r},(f,b)=>`D${b+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Period Comparison</h3>
          <p class="analysis-card-copy">${us(e)}</p>
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
  `}function ar(t,e){return`
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
        ${he({title:"Daily net energy value",series:[{label:"Net value",color:"#39c5cf",values:t.daily.map(s=>s.netValue)}],labels:t.daily.map(s=>s.label),referenceValue:0,referenceLabel:"Break-even",valueFormatter:s=>ct(s,e)})}
      </div>
      <div class="analysis-cost-totals">
        <span>Import cost: <strong>${j(t.totals.importCost,e)}</strong></span>
        <span>Solar savings: <strong>${j(t.totals.solarSavings,e)}</strong></span>
        <span>Export earnings: <strong>${j(t.totals.exportRevenue,e)}</strong></span>
        <span>Exceedance cost: <strong>${j(t.totals.exceedanceCost,e)}</strong></span>
        <span>Net value: <strong>${ct(t.totals.netValue,e)}</strong></span>
      </div>
    </div>
  `}function rr(t,e){const s=Array.from({length:Math.max(t.loadDurationGrossKw.length,t.loadDurationNetKw.length,1)},(a,n)=>`${n+1}`);return`
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
  `}function nr(t){var c,y;const e=t.config,s=t.rangeData,a=t.consumptionTimeseries,n=t.productionTimeseries;if(!e||!s||!a||!n)return`
      <section class="analysis-view">
        <div class="card">
          <p class="muted">Loading analysis data...</p>
        </div>
      </section>
    `;const o=Math.max(0,s.consumption??0),r=Math.max(0,s.production??0),i=Math.max(0,s.exported??0),u=Math.max(0,s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:0)),v=Math.max(0,(s.grid_import!=null?o-s.grid_import:void 0)??s.solar_to_home??u??(s.self_consumed&&s.self_consumed>0?s.self_consumed:r-i)),f=Math.max(0,s.grid_import??o-v),b=Math.max(0,v-u),_=Ht(e,a,((c=t.perMeterProductionTimeseries)==null?void 0:c.meters)??null,u,i),d=Ds(e,a,((y=t.perMeterProductionTimeseries)==null?void 0:y.meters)??null,u,i),h=Ls(a,n,t.gridImportTimeseries,t.marketExportTimeseries,e,d),g=e.currency||"EUR",$=((e.energy_variable_rate??0)+(e.network_variable_rate??0)+(e.electricity_tax_rate??0)+(e.compensation_fund_rate??0))*(1+(e.vat_rate??0)),k=u*$,x=_?_.totalSelfUseExportEquivalent:u*d,S=_?_.totalFeedInRevenue:i*d,M={consumptionKwh:o,totalSolarCoverageKwh:v,directSolarToHomeKwh:u,communitySolarToHomeKwh:b,exportedKwh:i,billedGridImportKwh:f,coveragePct:o>0?be(v/o*100,0,100):0,selfConsumedPct:r>0?be(u/r*100,0,100):0,totalSolarValue:k+h.totals.avoidedExceedanceValue+S,selfConsumptionAdvantage:k-x,variableImportCost:f*$};return`
    <section class="analysis-view">
      <div class="section-header analysis-section-header">
        <div>
          <span class="badge">Analysis</span>
          <h2>Charts and Optimization</h2>
          <p class="muted">Deeper electricity analysis for ${Ia(t)}. This page is built from the same 15-minute data and billing settings that drive the dashboard and invoice.</p>
        </div>
        <div class="analysis-header-meta">
          <span>${Va(t)}</span>
          <span>${m(h.daily.length,0)} day${h.daily.length===1?"":"s"} analysed</span>
        </div>
      </div>

      ${Ba(t)}
      ${qa(h,g,M)}
      ${Ya(h)}

      <div class="analysis-grid">
        ${Xa(t,h)}
        ${za(t,h)}
      </div>

      <div class="analysis-grid">
        ${Ja(h,g,_,$)}
        ${Qa(h,g)}
      </div>

      <div class="analysis-grid">
        ${er(h,g)}
        ${sr(h,t,e)}
      </div>

      <div class="analysis-grid">
        ${ar(h,g)}
        ${rr(h,e.reference_power_kw??0)}
      </div>

      ${tr(h)}
    </section>
  `}const ps={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function or(t){return ps[t]?ps[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function ir(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],s=[],a=[],n=[],o=[];for(const i of t.sensors){const u=i.key;u.startsWith("c_")||u==="1-1:1.29.0"||u==="1-1:3.29.0"?e.push(i):u.startsWith("p_")||u==="1-1:2.29.0"||u==="1-1:4.29.0"?s.push(i):u.startsWith("s_")||u.startsWith("1-65:")?a.push(i):u.startsWith("g_")||u.startsWith("7-")?n.push(i):o.push(i)}const r=(i,u,v,f)=>v.length?`
      <div class="card sensor-group">
        <h3 class="card-title"><span class="title-icon">${u}</span> ${i} <span class="badge">${v.length}</span></h3>
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
              ${v.map(b=>`
                <tr>
                  <td class="sensor-name">${or(b.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${f});">${m(b.value)}</td>
                  <td class="sensor-unit">${b.unit}</td>
                  <td class="sensor-peak">${b.peak_timestamp?Ss(b.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
  `}const lr=11,Fs="lu_resilienzpak_electricity_2026",dr="lu_resilienzpak_gas_2026",cr=[{id:"lu-electricity-resilienzpak-2026",label:"Luxembourg electricity subsidy 2026",enabled:!0,commodity:"electricity",basis:"grid_import_kwh",amount_gross:.04,start_date:"2026-08-01",end_date:"2026-12-31",vat_included:!0,preset_id:Fs,eligibility_note:"Residential customers below 25,000 kWh/year; applies to grid import only.",tariff_already_includes_adjustment:!1},{id:"lu-gas-resilienzpak-2026",label:"Luxembourg gas subsidy 2026",enabled:!0,commodity:"gas",basis:"gas_volume_m3",amount_gross:.15,start_date:"2026-08-01",end_date:"2026-12-31",vat_included:!0,preset_id:dr,eligibility_note:"Eligible residential gas consumption.",tariff_already_includes_adjustment:!1}];function ur(t=!0){return cr.map(e=>({...e,enabled:t}))}const Ws=["electricity","gas"],Ps=["grid_import_kwh","gas_volume_m3"];function pr(t){const e=[];Ws.includes(t.commodity)||e.push(`invalid commodity: ${String(t.commodity)}`),Ps.includes(t.basis)||e.push(`invalid basis: ${String(t.basis)}`);const s=Number(t.amount_gross);isFinite(s)?s<0&&e.push("amount_gross must not be negative"):e.push("amount_gross must be a number");const a=pt(t.start_date),n=pt(t.end_date);return a||e.push("start_date must be YYYY-MM-DD"),n||e.push("end_date must be YYYY-MM-DD"),a&&n&&n<a&&e.push("end_date must not be before start_date"),e}function mr(t,e=0){let s=Number(t.amount_gross);return isFinite(s)||(s=0),{id:t.id?String(t.id).trim():`custom-${e+1}`,label:t.label&&String(t.label).trim()?String(t.label).trim():"Billing adjustment",enabled:t.enabled!==!1,commodity:Ws.includes(t.commodity)?t.commodity:"electricity",basis:Ps.includes(t.basis)?t.basis:"grid_import_kwh",amount_gross:s,start_date:String(t.start_date??"").slice(0,10),end_date:String(t.end_date??"").slice(0,10),vat_included:t.vat_included!==!1,preset_id:t.preset_id?String(t.preset_id).trim():"",eligibility_note:t.eligibility_note?String(t.eligibility_note).trim():"",tariff_already_includes_adjustment:!!t.tariff_already_includes_adjustment}}function Ks(t){return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object").map((e,s)=>mr(e,s)):[]}function pt(t){if(!t||!/^\d{4}-\d{2}-\d{2}/.test(t))return null;const e=t.slice(0,10),[s,a,n]=e.split("-").map(Number);if(a<1||a>12||n<1||n>31)return null;const o=new Date(Date.UTC(s,a-1,n));return o.getUTCFullYear()!==s||o.getUTCMonth()!==a-1||o.getUTCDate()!==n?null:e}const hr=new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Luxembourg",year:"numeric",month:"2-digit",day:"2-digit"});function gr(t){const e=new Date(t);return Number.isNaN(e.getTime())?null:hr.format(e)}function vr(t,e){return!!t.start_date&&!!t.end_date&&t.start_date<=e&&e<=t.end_date}function Nt(t){return t.enabled&&pr(t).length===0}function It(t){return Nt(t)&&!t.tariff_already_includes_adjustment}function We(t){const[e,s,a]=t.split("-").map(Number);return Math.floor(Date.UTC(e,s-1,a)/864e5)}function Is(t,e,s){const a=pt(t.start_date),n=pt(t.end_date);if(!a||!n)return 0;const o=a>e?a:e,r=n<s?n:s,i=We(r)-We(o)+1;return i>0?i:0}function Vt(t,e,s,a,n,o){const r=e*t.amount_gross,i=t.vat_included?r/(1+a):r;return{id:t.id,label:t.label,commodity:t.commodity,basis:t.basis,unit:s,quantity:e,amount_gross:t.amount_gross,total_gross:r,total_net:i,vat_included:t.vat_included,applied:n,estimated:o,preset_id:t.preset_id??"",eligibility_note:t.eligibility_note??""}}function yr(t,e,s,a,n,o,r,i){const u=t.filter(d=>d.commodity==="electricity"&&d.basis==="grid_import_kwh"&&Nt(d));if(u.length===0)return{lines:[],solarCorrectionGross:0,estimatedAny:!1};const v=[];let f=0,b=!1;if(e&&e.length>0){const d=new Map(u.map($=>[$.id,0])),h=new Map(u.map($=>[$.id,0])),g=new Map;for(const $ of s??[]){const k=String($.startedAt??"");g.set(k,(g.get(k)??0)+(Number($.value)||0))}for(const $ of e){const k=Number($.value)||0,x=String($.startedAt??""),S=gr(x);if(S===null)continue;const M=g.get(x)??0,c=Math.max(0,k-M)*.25,y=Math.min(k,M)*.25;for(const l of u)vr(l,S)&&(d.set(l.id,d.get(l.id)+c),h.set(l.id,h.get(l.id)+y))}for(const $ of u){const k=It($);v.push(Vt($,d.get($.id),"kWh",i,k,!1)),k&&(f+=h.get($.id)*$.amount_gross)}return{lines:v,solarCorrectionGross:f,estimatedAny:b}}const _=Math.max(1,We(r)-We(o)+1);for(const d of u){const h=Is(d,o,r),g=h/_,$=h>0&&h<_;b=b||$;const k=It(d);v.push(Vt(d,Math.max(0,a)*g,"kWh",i,k,$)),k&&(f+=Math.max(0,n)*g*d.amount_gross)}return{lines:v,solarCorrectionGross:f,estimatedAny:b}}function fr(t,e,s,a,n,o){const r=t.filter(b=>b.commodity==="gas"&&b.basis==="gas_volume_m3"&&Nt(b));if(r.length===0)return{lines:[],estimatedAny:!1};let i=!1,u=Math.max(0,e||0);u<=0&&s>0&&(u=s/lr,i=!0);const v=Math.max(1,We(n)-We(a)+1),f=[];for(const b of r){const _=Is(b,a,n),d=_/v,h=i||_>0&&_<v;f.push(Vt(b,u*d,"m3",o,It(b),h)),h&&(i=!0)}return{lines:f,estimatedAny:i}}function wr(t){const e=Ks(t.adjustments),s=yr(e,t.consumptionItems,t.productionItems,t.fallbackGridImportKwh??0,t.fallbackSelfConsumedKwh??0,t.periodStart,t.periodEnd,t.vatRate||0),a=fr(e,t.gasVolumeM3??0,t.gasEnergyKwh??0,t.periodStart,t.periodEnd,t.gasVatRate||0),n=i=>{let u=0,v=0;for(const f of i)f.applied&&(u+=f.total_gross,v+=f.total_net);return{gross:u,net:v}},o=n(s.lines),r=n(a.lines);return{electricity:{lines:s.lines,applied_gross:o.gross,applied_net:o.net,solar_correction_gross:s.solarCorrectionGross,estimated:s.estimatedAny},gas:{lines:a.lines,applied_gross:r.gross,applied_net:r.net,estimated:a.estimatedAny},estimated:s.estimatedAny||a.estimatedAny}}const ms=[{kw:3,fixedMonthlyFee:7.42},{kw:7,fixedMonthlyFee:12.84},{kw:12,fixedMonthlyFee:19.61},{kw:17,fixedMonthlyFee:26.39},{kw:27,fixedMonthlyFee:39.94},{kw:43,fixedMonthlyFee:61.62},{kw:70,fixedMonthlyFee:98.2},{kw:100,fixedMonthlyFee:138.85},{kw:150,fixedMonthlyFee:206.6,existingContractsOnly:!0},{kw:200,fixedMonthlyFee:274.35,existingContractsOnly:!0}];function nt(t){if(!t)return null;const e=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(e){const[,a,n,o]=e;return new Date(Number(a),Number(n)-1,Number(o))}const s=new Date(t);return Number.isNaN(s.getTime())?null:new Date(s.getFullYear(),s.getMonth(),s.getDate())}function hs(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function br(t,e,s,a,n){const o=new Date,r=nt(a),i=nt(n);let u=r,v=i;if(!u||!v)switch(t){case"yesterday":{const g=new Date(o);g.setDate(g.getDate()-1),u=new Date(g.getFullYear(),g.getMonth(),g.getDate()),v=new Date(u);break}case"this_week":{const g=new Date(o),$=g.getDay()||7;u=new Date(g.getFullYear(),g.getMonth(),g.getDate()-$+1),v=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_week":{const g=new Date(o),$=g.getDay()||7,k=new Date(g.getFullYear(),g.getMonth(),g.getDate()-$+1);u=new Date(k.getFullYear(),k.getMonth(),k.getDate()-7),v=new Date(k.getFullYear(),k.getMonth(),k.getDate()-1);break}case"this_month":{u=new Date(o.getFullYear(),o.getMonth(),1),v=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_month":{u=new Date(o.getFullYear(),o.getMonth()-1,1),v=new Date(o.getFullYear(),o.getMonth(),0);break}case"this_year":{u=new Date(o.getFullYear(),0,1),v=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_year":{u=new Date(o.getFullYear()-1,0,1),v=new Date(o.getFullYear()-1,11,31);break}case"custom":{u=nt(e)??new Date(o.getFullYear(),o.getMonth(),o.getDate()),v=nt(s)??new Date(u);break}default:{u=new Date(o.getFullYear(),o.getMonth(),o.getDate()-1),v=new Date(u);break}}if(v<u){const g=u;u=v,v=g}let f=0,b=0;const _=new Date(u);for(;_<=v;){const g=new Date(_.getFullYear(),_.getMonth()+1,0).getDate();b+=1/g,f+=1,_.setDate(_.getDate()+1)}const d=u.getFullYear()===v.getFullYear()&&u.getMonth()===v.getMonth()&&u.getDate()===1&&v.getDate()===new Date(v.getFullYear(),v.getMonth()+1,0).getDate(),h=g=>`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}-${String(g.getDate()).padStart(2,"0")}`;return{days:f,factor:b,label:d?"full month":`${f} day${f===1?"":"s"}`,startIso:h(u),endIso:h(v)}}function _r(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function gs(t){const[e,s]=t.split(":").map(a=>parseInt(a,10)||0);return e*60+s}function Vs(t,e,s,a){if(!_r(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),o=gs(s),r=gs(a);return o===r?!0:o<r?n>=o&&n<r:n>=o||n<r}function $r(t,e){return e.find(s=>Vs(t,s.day_group,s.start_time,s.end_time))}function xr(t,e){return e.find(s=>Vs(t,s.day_group,s.start_time,s.end_time))}function vs(t,e,s,a,n,o=[]){var d;const r=new Map;let i=0,u=0,v=0,f=0,b=0;const _=new Map;for(const h of o){const g=Number(h.value)||0;_.set(h.startedAt,(_.get(h.startedAt)??0)+g)}for(const h of t){const g=Number(h.value)||0,$=g*.25,k=_.get(h.startedAt)??0,x=Math.max(0,g-k),S=new Date(h.startedAt);if(Number.isNaN(S.getTime()))continue;const M=$r(S,a),c=xr(S,n),y=(M==null?void 0:M.rate)??e,l=((d=M==null?void 0:M.label)==null?void 0:d.trim())||"Base tariff",p=(c==null?void 0:c.reference_power_kw)??s;i+=$*y,b=Math.max(b,g),f=Math.max(f,x),g>p&&(v+=(g-p)*.25),x>p&&(u+=(x-p)*.25);const E=`${l}__${y}`,D=r.get(E);D?D.kwh+=$:r.set(E,{label:l,rate:y,kwh:$})}return{energyCost:i,exceedanceKwh:u,grossExceedanceKwh:v,avoidedExceedanceKwh:Math.max(0,v-u),peakPowerKw:f,grossPeakPowerKw:b,rateBreakdown:Array.from(r.values()).sort((h,g)=>h.label.localeCompare(g.label))}}function kr(t){var es,ts,ss,as;const e=t.config,s=t.rangeData;if(!e||!s)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const a=s.consumption||0,n=s.production||0,o=s.exported||0,r=Math.max(0,o),i=s.grid_import,u=(s.solar_to_home??s.direct_solar_to_home??s.self_consumed??n)>0,v=i!=null&&!(i<=0&&a>0&&!u),f=Math.max(0,(v?a-i:void 0)??s.solar_to_home??s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:n-r)),b=Math.min(f,Math.max(0,s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:n-r))),_=Math.max(0,f-b),d=Math.max(0,i!=null&&!(i<=0&&a>0&&f<=0)?i:a-f),h=s.peak_power_kw||0,g=e.reference_power_kw||5,$=s.exceedance_kwh||0,k=s.gas_energy||0,x=s.gas_volume||0,S=k>0||x>0,M=e.consumption_rate_windows??[],c=e.reference_power_windows??[],y=t.consumptionTimeseries?vs(t.consumptionTimeseries.items,e.energy_variable_rate,g,M,c,((es=t.productionTimeseries)==null?void 0:es.items)??[]):null,l=M.length>0&&!!y&&Math.abs(d-a)<.01,p=c.length>0&&!!y,E=y?y.peakPowerKw:h,D=y?y.exceedanceKwh:$,P=hs(s.start??t.customStart),R=hs(s.end??t.customEnd),{days:K,factor:I,label:O,startIso:se,endIso:J}=br(t.range,t.customStart,t.customEnd,s.start,s.end),le=e.energy_fixed_fee*I,Q=e.network_metering_rate*I,ne=e.network_power_ref_rate*I,de=l?y.energyCost:d*e.energy_variable_rate,ge=d*e.network_variable_rate,q=D*e.exceedance_rate,N=e.meter_monthly_fees??[],U=d*e.compensation_fund_rate,ve=d*e.electricity_tax_rate,ce=Math.max(0,e.domiciliation_discount??0)*I,ke=Math.max(0,e.connect_discount??0)*I,Pe=l?y.rateBreakdown.map(w=>w.kwh*w.rate):[de],Ke=N.map(w=>(w.fee||0)*I),Ie=[...Pe,le,Q,ne,ge,q,...Ke,U,ve,-ce,-ke],Ve=G(Ie.reduce((w,A)=>w+G(A),0)),ee=wr({adjustments:e.billing_adjustments,vatRate:e.vat_rate,gasVatRate:e.gas_vat_rate??.08,periodStart:se,periodEnd:J,consumptionItems:((ts=t.consumptionTimeseries)==null?void 0:ts.items)??null,productionItems:((ss=t.productionTimeseries)==null?void 0:ss.items)??null,fallbackGridImportKwh:d,fallbackSelfConsumedKwh:f,gasVolumeM3:x,gasEnergyKwh:k}),Se=ee.electricity.lines,Me=ee.gas.lines,Xe=Se.some(w=>w.applied&&Math.abs(w.total_gross)>1e-9),mt=Me.some(w=>w.applied&&Math.abs(w.total_gross)>1e-9),ht=ee.electricity.applied_net,gt=ee.gas.applied_net,vt=ee.estimated,Re=Ve,Ae=G(Ve-G(ht)),He=G(Ae*e.vat_rate),ye=G(Ae+He),ue=At(e),z=Ht(e,t.consumptionTimeseries,((as=t.perMeterProductionTimeseries)==null?void 0:as.meters)??null,b,r),Ce=ue.filter(w=>isFinite(w.rate)&&w.rate>0),te=ue.length>1,_e=z?z.weightedExportRate:Ce.length>0?Ce.reduce((w,A)=>w+A.rate,0)/Ce.length:e.feed_in_tariff,re=z?z.totalFeedInRevenue:r*_e,C=te&&ue.length>0?r/ue.length:r,L=z?z.meters:ue.map(w=>({...w,producedKwh:0,exportedKwh:C,revenue:C*w.rate,selfConsumedKwh:0,exportEquivalentForSelfUse:0})),F=!!z,B=(z==null?void 0:z.allocationMode)??"prorata",X=z?z.meters.reduce((w,A)=>w+A.selfConsumedKwh,0):b,oe=e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate,fe=oe*(1+e.vat_rate),Te=X*oe,yt=Te*e.vat_rate,ft=ee.electricity.solar_correction_gross,Ee=Te+yt-ft,Gs=z?z.totalSelfUseExportEquivalent:X*_e,Gt=Ee-Gs,je=Math.max(0,(y==null?void 0:y.avoidedExceedanceKwh)??0),wt=je*e.exceedance_rate,Ot=wt*e.vat_rate,Ne=wt+Ot,Ze=je>1e-4,Je=Ee+Ne+re,bt=L.map(w=>{const A=w.selfConsumedKwh*fe,H=A-w.exportEquivalentForSelfUse;return{...w,selfUseSavings:A,selfUseVsExport:H,totalTrackedValue:A+w.revenue}}),Os=F&&bt.length>0,Qe=ye-re,Ut=(e.gas_fixed_fee??6.5)*I,Bt=k*(e.gas_variable_rate??.055),qt=(e.gas_network_fee??4.8)*I,Yt=k*(e.gas_network_variable_rate??.012),zt=k*(e.gas_tax_rate??.001),Xt=G([Ut,Bt,qt,Yt,zt].reduce((w,A)=>w+G(A),0)),_t=Xt,$t=G(Xt-G(gt)),Zt=G($t*(e.gas_vat_rate??.08)),xt=G($t+Zt),V=e.currency||"EUR",T=w=>`${m(w,2)} ${V}`,kt=w=>`${w>0?"+":w<0?"-":""}${m(Math.abs(w),2)} ${V}`,W=w=>m(w,3),St=w=>m(w,3),Us=w=>w>=0?"comparison-delta-savings":"comparison-delta-extra",Jt=(w,A)=>w.map(H=>{const $e=H.unit==="kWh"?`${W(H.quantity)} kWh`:`${St(H.quantity)} m³`,Ge=H.estimated?' <span class="muted">(estimated)</span>':"",tt=H.vat_included?H.total_gross:H.total_gross*(1+A);return H.applied?`
            <tr class="revenue-row">
              <td>${H.label}${Ge}${H.eligibility_note?`<br/><span class="muted" style="font-size: var(--text-xs);">${H.eligibility_note}</span>`:""}</td>
              <td style="text-align: right;">${$e} × ${m(H.amount_gross,4)} ${V}/${H.unit}${H.vat_included?" incl. VAT":" excl. VAT"}<br/>= −${T(tt)}${H.vat_included?" incl. VAT":""}</td>
              <td class="revenue-amount" style="text-align: right;">−${T(H.total_net)}</td>
            </tr>
          `:`
            <tr class="revenue-row">
              <td>${H.label}${Ge}<br/><span class="muted" style="font-size: var(--text-xs);">Already reflected in your configured tariff — not deducted again</span></td>
              <td style="text-align: right;">${$e} × ${m(H.amount_gross,4)} ${V}/${H.unit}</td>
              <td style="text-align: right;"><span class="muted">in tariff</span></td>
            </tr>
          `}).join(""),Bs=Jt(Se,e.vat_rate),qs=Jt(Me,e.gas_vat_rate??.08),Qt=G(Re+G(Re*e.vat_rate)),Ys=Se.length>0,zs=Me.length>0,Xs=Os?`
            <tr class="section-label"><td colspan="3">Per-System Self-Use vs Export</td></tr>
            ${bt.map(w=>`
            <tr>
              <td>${w.displayName}</td>
              <td style="text-align: right;">
                ${w.shortId}<br/>
                Produced ${W(w.producedKwh)} kWh<br/>
                Kept on-site ${W(w.selfConsumedKwh)} kWh<br/>
                Sold ${W(w.exportedKwh)} kWh<br/>
                ${w.label} ${m(w.rate,4)} ${V}/kWh${te?`<br/>${it(w.selfUsePriority)}`:""}
              </td>
              <td style="text-align: right;">
                <strong>${T(w.totalTrackedValue)}</strong><br/>
                <span class="${Us(w.selfUseVsExport)}">${kt(w.selfUseVsExport)}</span> self-use vs export<br/>
                <span class="muted">${T(w.selfUseSavings)} kept value + ${T(w.revenue)} sold</span>
              </td>
            </tr>
            `).join("")}
            <tr class="subtotal-row">
              <td colspan="2"><strong>Tracked per-system value</strong></td>
              <td style="text-align: right;"><strong>${T(bt.reduce((w,A)=>w+A.totalTrackedValue,0))}</strong></td>
            </tr>
      `:"",Zs=F?`Compared with exporting the same ${W(X)} kWh using ${B==="prorata"?"a pro-rata split across the PV systems":"the configured PV self-use priority"} and each system's own feed-in tariff`:`Compared with selling the same ${W(X)} kWh at ${m(_e,4)} ${V}/kWh`,Mt=ms.find(w=>Math.abs(w.kw-g)<.05),Js=Ve-G(ne)-G(q),Ct=y?ms.map(w=>{var rs;const A=vs(t.consumptionTimeseries.items,e.energy_variable_rate,w.kw,M,c,((rs=t.productionTimeseries)==null?void 0:rs.items)??[]),H=w.fixedMonthlyFee*I,$e=A.exceedanceKwh*e.exceedance_rate,Ge=G(Js+G(H)+G($e)),tt=G(Ge+G(Ge*e.vat_rate));return{...w,fixedCharge:H,exceedanceKwh:A.exceedanceKwh,exceedanceCharge:$e,total:tt,deltaVsCurrent:tt-ye}}):[],et=Ct.reduce((w,A)=>!w||A.total<w.total?A:w,null),Qs=w=>Math.abs(w)<.005?"Current total":`${w>0?"+":"-"}${T(Math.abs(w))}`,Tt=s.start&&s.end?`${we(s.start)} — ${we(s.end)}`:t.range.replace("_"," ").replace(/\b\w/g,w=>w.toUpperCase()),ea=D>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${m(E,1)} kW</strong> &mdash; ${p?"Reference power windows active":`Reference power level: ${m(g,1)} kW`}</p>
        <p>Exceedance volume: <strong>${W(D)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${T(q)}</p>
      </div>`:"",ta=l?y.rateBreakdown.map(w=>`
            <tr>
              <td>${w.label} (${W(w.kwh)} kWh)</td>
              <td style="text-align: right;">${m(w.rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(w.kwh*w.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Supplier rate (${W(d)} kWh bought from grid)</td>
              <td style="text-align: right;">${m(e.energy_variable_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(de)}</td>
            </tr>
          `,sa=p?`Reference power windows active (${c.length})`:`${m(g,1)} kW`,aa=l?`Time-of-use windows active (${M.length})`:`${m(e.energy_variable_rate,4)} ${V}/kWh`,ra=Ct.map(w=>{const A=!!et&&w.kw===et.kw,H=!!Mt&&w.kw===Mt.kw,$e=w.deltaVsCurrent<-.005?"comparison-delta-savings":w.deltaVsCurrent>.005?"comparison-delta-extra":"";return`
            <tr class="${A?"reference-power-best-row":""}${H?" reference-power-current-row":""}">
              <td>
                <div class="reference-level-cell">
                  <span class="reference-level-kw">${m(w.kw,0)} kW</span>
                  ${A?'<span class="reference-level-badge best">Financially optimal</span>':""}
                  ${H?'<span class="reference-level-badge current">Current</span>':""}
                  ${w.existingContractsOnly?'<span class="reference-level-badge legacy">Existing contracts</span>':""}
                </div>
              </td>
              <td style="text-align: right;">${T(w.fixedCharge)}</td>
              <td style="text-align: right;">${T(w.exceedanceCharge)}</td>
              <td style="text-align: right;"><strong>${T(w.total)}</strong></td>
              <td class="${$e}" style="text-align: right;">${Qs(w.deltaVsCurrent)}</td>
            </tr>
          `}).join(""),na=Ct.length>0?`
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${p?"Configured reference power windows stay active in this comparison.":"One reference power level is applied to the full selected period."}
              ${Mt?"":`Your current configuration uses ${m(g,1)} kW, which is outside the standard Creos low-voltage reference power levels.`}
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
            ${ra}
          </tbody>
        </table>
      </div>
    `:`
      <div class="card reference-power-card">
        <p class="muted">Reference power level comparison requires 15-minute load-curve data for the selected period.</p>
      </div>
    `,oa=`
      <div class="range-selector">
        ${ze.map(w=>`
          <button
            class="range-btn ${w.id===t.range?"active":""}"
            data-range="${w.id}"
          >${w.label}</button>
        `).join("")}
      </div>
    `,ia=s.start&&s.end?(()=>{const w=new Date(s.start),A=new Date(s.end);return Number.isNaN(w.getTime())||Number.isNaN(A.getTime())?"":`
        <div class="range-info-bar">
          Period: ${w.toLocaleDateString()} - ${A.toLocaleDateString()}
        </div>
      `})():"",la=t.range==="custom"?`
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
    `:P&&R?`
        <div class="custom-range-picker period-preview">
          <span class="period-preview-label">Viewed period</span>
          <label>
            <span>From</span>
            <input type="date" value="${P}" readonly aria-label="Preset period start" />
          </label>
          <label>
            <span>To</span>
            <input type="date" value="${R}" readonly aria-label="Preset period end" />
          </label>
        </div>
      `:"";return`
    <section class="invoice-view">
      ${oa}
      ${ia}
      ${la}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Supplier Bill Estimate &mdash; ${Tt}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the selected period. Feed-in revenue and net position are shown separately.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${W(a)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${W(d)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${W(n)} kWh produced</span>
          ${r>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${W(r)} kWh exported</span>`:""}
          ${S?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${W(k)} kWh gas (${St(x)} m³)</span>`:""}
        </div>
      </div>

      ${ea}

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
              <td>Fixed Fee <span class="muted">(${O})</span></td>
              <td style="text-align: right;">${m(e.energy_fixed_fee,2)} ${V}/mo</td>
              <td style="text-align: right;">${T(le)}</td>
            </tr>
            ${ta}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${O})</span></td>
              <td style="text-align: right;">${m(e.network_metering_rate,2)} ${V}/mo</td>
              <td style="text-align: right;">${T(Q)}</td>
            </tr>
            <tr>
              <td>Reference power level (${sa}) <span class="muted">(${O})</span></td>
              <td style="text-align: right;">${m(e.network_power_ref_rate,2)} ${V}/mo</td>
              <td style="text-align: right;">${T(ne)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${W(d)} kWh bought from grid)</td>
              <td style="text-align: right;">${m(e.network_variable_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(ge)}</td>
            </tr>
            <tr class="${D>0?"exceedance-row":""}">
              <td>Exceedance charge (${W(D)} kWh above the reference power level)</td>
              <td style="text-align: right;">${m(e.exceedance_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(q)}</td>
            </tr>

            ${N.filter(w=>w.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${N.filter(w=>w.fee>0).map(w=>`
            <tr>
              <td>${w.label||"…"+w.meter_id.slice(-8)} <span class="muted">(${O})</span></td>
              <td style="text-align: right;">${m(w.fee,2)} ${V}/mo</td>
              <td style="text-align: right;">${T(w.fee*I)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${m(e.compensation_fund_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(U)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${m(e.electricity_tax_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(ve)}</td>
            </tr>
            ${ce>0||ke>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            ${ce>0?`
            <tr>
              <td>Domiciliation Discount <span class="muted">(${O})</span></td>
              <td style="text-align: right;">-${m(Math.max(0,e.domiciliation_discount??0),2)} ${V}/mo</td>
              <td style="text-align: right;">-${T(ce)}</td>
            </tr>
            `:""}
            ${ke>0?`
            <tr>
              <td>Electronic Invoice Discount <span class="muted">(${O})</span></td>
              <td style="text-align: right;">-${m(Math.max(0,e.connect_discount??0),2)} ${V}/mo</td>
              <td style="text-align: right;">-${T(ke)}</td>
            </tr>
            `:""}
            `:""}

            ${Ys?`
            <tr class="section-label"><td colspan="3">Government Aid &amp; Billing Adjustments</td></tr>
            ${Bs}
            <tr class="subtotal-row">
              <td colspan="2">Subtotal before adjustments (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(Re)}</strong></td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(Ae)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${m(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(He)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Supplier Bill Estimate</strong></td>
              <td style="text-align: right;"><strong>${T(ye)}</strong></td>
            </tr>
            ${Xe?`
            <tr class="subtotal-row">
              <td colspan="2">Total before billing adjustments (incl. VAT)</td>
              <td style="text-align: right;">${T(Qt)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2">Total after billing adjustments (incl. VAT)</td>
              <td style="text-align: right;">${T(ye)}${vt?' <span class="muted">(estimated)</span>':""}</td>
            </tr>
            `:""}

            ${n>0?`
            <tr class="section-label revenue-section"><td colspan="3">Solar Value & Feed-in Revenue</td></tr>
            <tr class="revenue-row">
              <td>Solar produced</td>
              <td style="text-align: right;">Total generation during this period</td>
              <td style="text-align: right;">${W(n)} kWh</td>
            </tr>
            <tr class="revenue-row">
              <td>Own solar used at home</td>
              <td style="text-align: right;">${W(X)} kWh from your own production avoided grid purchases</td>
              <td style="text-align: right;">${T(Ee)} saved</td>
            </tr>
            ${_>0?`
            <tr class="revenue-row">
              <td>Additional solar received</td>
              <td style="text-align: right;">${W(_)} kWh covered at home from shared/community solar</td>
              <td style="text-align: right;">Informational</td>
            </tr>
            `:""}
            <tr class="revenue-row">
              <td>Export sold</td>
              <td style="text-align: right;">${W(r)} kWh sent to grid</td>
              <td style="text-align: right;">${T(re)} earned</td>
            </tr>
            ${Ze?`
            <tr class="revenue-row">
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${W(je)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${T(Ne)} saved</td>
            </tr>
            `:""}
            ${r>0?`
            <tr class="section-label"><td colspan="3">Credit Calculation</td></tr>
            ${L.map(w=>`
            <tr class="revenue-row">
              <td>Exported (${te?w.displayName:W(w.exportedKwh)+" kWh"})</td>
              <td style="text-align: right;">${te?`${w.shortId}<br/>`:""}${W(w.exportedKwh)} kWh<br/>${w.label}<br/>${m(w.rate,4)} ${V}/kWh${F&&te?`<br/>${it(w.selfUsePriority)}`:""}</td>
              <td class="revenue-amount" style="text-align: right;">-${T(w.revenue)}</td>
            </tr>
            `).join("")}
            ${te?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${W(r)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${m(_e,4)} ${V}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${T(re)}</td>
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

      ${na}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Supplier bill estimate: ${T(ye)}</strong>${re>0?` Feed-in revenue is shown separately as ${T(re)}, giving a net electricity position of ${T(Qe)} after export credit.`:""}
          ${Xe?` Government aid and billing adjustments reduce this estimate by ${T(ee.electricity.applied_gross)} incl. VAT (total before adjustments: ${T(Qt)}).${vt?" Some adjustment values are estimated from incomplete interval data.":""}`:""}
          <br/>
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${W(d)} kWh), not total home usage.
          Supplier pricing: ${aa}.
          Fixed monthly charges are prorated across the viewed period (${K} days, ${O}, equivalent to ${m(I,2)} monthly charges).
          Peak load (${m(E,1)} kW) is compared against ${p?"your configured reference power windows":`your reference power level (${m(g,1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${m(e.exceedance_rate,4)} ${V}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${S?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${Tt}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${W(k)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${St(x)} m³</span>
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
              <td>Fixed Fee <span class="muted">(${O})</span></td>
              <td style="text-align: right;">${m(e.gas_fixed_fee??6.5,2)} ${V}/mo</td>
              <td style="text-align: right;">${T(Ut)}</td>
            </tr>
            <tr>
              <td>Energy (${W(k)} kWh)</td>
              <td style="text-align: right;">${m(e.gas_variable_rate??.055,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(Bt)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${O})</span></td>
              <td style="text-align: right;">${m(e.gas_network_fee??4.8,2)} ${V}/mo</td>
              <td style="text-align: right;">${T(qt)}</td>
            </tr>
            <tr>
              <td>Network Variable (${W(k)} kWh)</td>
              <td style="text-align: right;">${m(e.gas_network_variable_rate??.012,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(Yt)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${W(k)} kWh)</td>
              <td style="text-align: right;">${m(e.gas_tax_rate??.001,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(zt)}</td>
            </tr>

            ${zs?`
            <tr class="section-label"><td colspan="3">Government Aid &amp; Billing Adjustments</td></tr>
            ${qs}
            <tr class="subtotal-row">
              <td colspan="2">Subtotal before adjustments (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(_t)}</strong></td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T($t)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${m((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${T(Zt)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${T(xt)}</strong></td>
            </tr>
            ${mt?`
            <tr class="subtotal-row">
              <td colspan="2">Gas total before billing adjustments (incl. VAT)</td>
              <td style="text-align: right;">${T(G(_t+G(_t*(e.gas_vat_rate??.08))))}</td>
            </tr>
            `:""}
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Net Energy Position: ${T(Qe+xt)}</strong>
          (Electricity net position: ${T(Qe)} + Gas supplier estimate: ${T(xt)})
        </p>
      </div>
      `:""}

      ${n>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Value &mdash; ${Tt}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${T(Je)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${W(n)} kWh</div>
            <div class="solar-stat-label">Solar produced</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${T(Ee)}</div>
            <div class="solar-stat-label">Saved by using ${W(X)} kWh of your own solar at home</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${kt(Gt)}</div>
            <div class="solar-stat-label">Extra value from using it yourself instead of selling it</div>
          </div>
          ${Ze?`
          <div class="solar-stat">
            <div class="solar-stat-value">${T(Ne)}</div>
            <div class="solar-stat-label">Saved by staying under the reference power</div>
          </div>
          `:""}
          <div class="solar-stat">
            <div class="solar-stat-value">${T(re)}</div>
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
              <td style="text-align: right;">${W(n)} kWh</td>
            </tr>
            <tr>
              <td>Own solar used at home</td>
              <td style="text-align: right;">${W(X)} kWh from your own production avoided grid purchases</td>
              <td style="text-align: right;">${T(Ee)} saved</td>
            </tr>
            ${_>0?`
            <tr>
              <td>Additional solar received</td>
              <td style="text-align: right;">${W(_)} kWh covered at home from shared/community solar</td>
              <td style="text-align: right;">Informational</td>
            </tr>
            `:""}
            <tr>
              <td>Extra vs exporting instead</td>
              <td style="text-align: right;">${Zs}</td>
              <td style="text-align: right;">${kt(Gt)}</td>
            </tr>
            <tr>
              <td>Export sold</td>
              <td style="text-align: right;">${W(r)} kWh sent to grid</td>
              <td style="text-align: right;">${T(re)} earned</td>
            </tr>
            ${Ze?`
            <tr>
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${W(je)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${T(Ne)} saved</td>
            </tr>
            `:""}

            ${Xs}

            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${W(X)} kWh)</td>
              <td style="text-align: right;">${m(e.energy_variable_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(X*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${m(e.network_variable_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(X*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${m(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${T(X*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${m(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(yt)}</td>
            </tr>
            ${ft>1e-4?`
            <tr>
              <td>Government aid not received on own solar${ee.electricity.estimated?' <span class="muted">(estimated)</span>':""}</td>
              <td style="text-align: right;">Self-consumed kWh during the aid period avoid subsidised grid imports</td>
              <td class="revenue-amount" style="text-align: right;">−${T(ft)}</td>
            </tr>
            `:""}
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${T(Ee)}</strong></td>
            </tr>

            ${Ze?`
            <tr class="section-label"><td colspan="3">Reference Power Savings</td></tr>
            <tr>
              <td>Exceedance avoided</td>
              <td style="text-align: right;">${W(je)} kWh above the reference power level</td>
              <td style="text-align: right;">${T(wt)}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${m(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(Ot)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Reference Power Savings</strong></td>
              <td style="text-align: right;"><strong>${T(Ne)}</strong></td>
            </tr>
            `:""}

            ${r>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${L.map(w=>`
            <tr>
              <td>Sold to grid ${te?`(${w.displayName})`:`(${W(w.exportedKwh)} kWh)`}</td>
              <td style="text-align: right;">${te?`${w.shortId}<br/>`:""}${W(w.exportedKwh)} kWh<br/>${w.label}<br/>${m(w.rate,4)} ${V}/kWh${F&&te?`<br/>${it(w.selfUsePriority)}`:""}</td>
              <td style="text-align: right;">${T(w.revenue)}</td>
            </tr>
            `).join("")}
            ${te?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${T(re)}</strong></td>
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
          ${F?Ts(B):te?"Displayed per-meter feed-in kWh are currently equal-split estimates because per-meter production data was not available for this view.":""}
        </p>
      </div>
      `:""}
    </section>
  `}const Sr=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],Mr=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Reference Power Fixed Charge",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"domiciliation_discount",label:"Domiciliation Discount",step:"0.01",unit:"EUR/mo",type:"number"},{key:"connect_discount",label:"Electronic Invoice Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"Government Aid & Billing Adjustments",icon:"🏛️",fields:[]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],Cr=["consumption","production","solar_consumption","export","export_consumption","gas"],Rs={consumption:"Consumption",production:"Solar production",solar_consumption:"Solar production (consumption-metered)",export:"Grid export",export_consumption:"Grid export (consumption-metered)",gas:"Gas"},As={consumption:"⚡",production:"☀️",solar_consumption:"☀️",export:"",export_consumption:"",gas:"🔥"},Tr={consumption:"House/grid import meter",production:"PV generation, including energy that may be self-consumed",solar_consumption:"Solar production measured as consumption",export:"Export-only meter for energy sold/sent to the grid",export_consumption:"Grid export measured on the consumption register (active consumption OBIS)",gas:"Gas consumption meter"};function Er(t){return t.map(e=>{const s=As[e],a=Rs[e]??e;return`<span class="meter-type-badge meter-type-${e}">${s?`${s} `:""}${a}</span>`}).join(" ")}function Dr(t,e,s){return`
          <label class="meter-type-cb">
            <input type="checkbox" name="meter_${t}_${e}" ${s.types.includes(e)?"checked":""} />
            <span class="meter-type-copy">
              <strong>${Rs[e]??e}</strong>
              <small>${Tr[e]??""}</small>
            </span>
          </label>
  `}function ys(t,e,s){const a=t+1;return s?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${a}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${Er(e.types)}</div>
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
          ${Cr.map(n=>Dr(t,n,e)).join("")}
        </div>
      </div>
    </div>
  `}function Hs(t){return Sr.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function Lr(t,e){return`
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
            ${Hs(e.day_group??"all")}
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
  `}function Fr(t,e){return`
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
            ${Hs(e.day_group??"all")}
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
  `}function Wr(t,e){const s=!!e.preset_id,n=e.preset_id===Fs&&e.enabled&&!e.tariff_already_includes_adjustment;return`
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
  `}function Pr(t,e="ha",s){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const a=e==="standalone"?(s==null?void 0:s.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let n="";if(e==="standalone"){const l=a.map((E,D)=>ys(D,E,!1)).join("");s==null||s.proxy_url,n=`
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
            ${l.length>0?l.map((E,D)=>ys(D,E,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const o=l=>l.map(p=>{const E=t?t[p.key]??"":"";return`
        <div class="form-row">
          <label for="cfg-${p.key}">${p.label}</label>
          <div class="input-group">
            <input
              id="cfg-${p.key}"
              name="${p.key}"
              type="${p.type}"
              ${p.type==="number"?`step="${p.step}"`:""}
              value="${E}"
            />
            ${p.unit?`<span class="input-unit">${p.unit}</span>`:""}
          </div>
        </div>
      `}).join(""),r=((t==null?void 0:t.meters)??[]).filter(l=>l.types.includes("production")||l.types.includes("solar_consumption")),i=(t==null?void 0:t.feed_in_rates)??[],u=e==="ha";function v(l){return i.find(p=>p.meter_id===l)??{meter_id:l,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:"",display_name:"",self_use_priority:null}}const f=r.length===0?'<p class="muted">No solar production meters configured — add a meter with Solar production above.</p>':r.map((l,p)=>{const E=v(l.id),D=l.id?"…"+l.id.slice(-8):`Meter ${p+1}`,P=Kt(l.id,p+1,E.display_name);return`
          <div class="feed-in-meter-card" data-meter-idx="${p}" data-meter-id="${l.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${P}</span>
              <code style="font-size: var(--text-sm);">${D}</code>
              <input type="hidden" name="feed_in_rate_${p}_meter_id" value="${l.id}" />
            </div>
            <div class="form-row">
              <label for="cfg-feed_in_rate_${p}_display_name">System Name</label>
              <div class="input-group">
                <input
                  id="cfg-feed_in_rate_${p}_display_name"
                  name="feed_in_rate_${p}_display_name"
                  type="text"
                  value="${E.display_name??""}"
                  placeholder="${Kt(l.id,p+1)}"
                />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-feed_in_rate_${p}_priority">Self-use Priority</label>
              <div class="input-group">
                <input
                  id="cfg-feed_in_rate_${p}_priority"
                  name="feed_in_rate_${p}_self_use_priority"
                  type="number"
                  min="1"
                  step="1"
                  value="${E.self_use_priority??""}"
                  placeholder="Pro-rata"
                />
                <span class="input-unit">1 = used first at home</span>
              </div>
              <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                Leave blank for <strong>Prorata Modus</strong> — self-consumption is shared between
                the unprioritised systems in proportion to what each one produced in that
                15-minute interval.
              </p>
            </div>
            <div class="form-row">
              <label>Pricing Mode</label>
              <div class="feed-in-mode-toggle">
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${p}_mode" value="fixed" ${E.mode==="fixed"?"checked":""} />
                  <span class="mode-label">💶 Fixed Tariff</span>
                </label>
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${p}_mode" value="sensor" ${E.mode==="sensor"?"checked":""} />
                  <span class="mode-label">📡 HA Sensor</span>
                </label>
              </div>
            </div>
            <div class="feed-in-fixed-fields" data-rate-idx="${p}" style="${E.mode==="fixed"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${p}_tariff">Feed-in Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${p}_tariff" name="feed_in_rate_${p}_tariff" type="number" step="0.0001" value="${E.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
              </div>
            </div>
            <div class="feed-in-sensor-fields" data-rate-idx="${p}" style="${E.mode==="sensor"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${p}_sensor">Market Price Sensor</label>
                <div class="input-group sensor-picker-group">
                  <input
                    id="cfg-feed_in_rate_${p}_sensor"
                    name="feed_in_rate_${p}_sensor_entity"
                    type="text"
                    value="${E.sensor_entity}"
                    placeholder="${u?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${u&&p===0?'<datalist id="ha-entity-list"></datalist>':""}
              </div>
              <div class="form-row">
                <label for="cfg-feed_in_rate_${p}_fallback">Fallback Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${p}_fallback" name="feed_in_rate_${p}_fallback_tariff" type="number" step="0.0001" value="${E.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
                <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                  Used when the sensor is unavailable.
                </p>
              </div>
            </div>
          </div>
        `}).join(""),b=((t==null?void 0:t.meters)??[]).some(l=>l.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),_=(t==null?void 0:t.consumption_rate_windows)??[],d=(t==null?void 0:t.reference_power_windows)??[],h=(t==null?void 0:t.meters)??[],g=(t==null?void 0:t.meter_monthly_fees)??[];function $(l){return g.find(p=>p.meter_id===l)??{meter_id:l,label:"",fee:0}}const k=h.length===0?'<p class="muted">No meters configured.</p>':h.map((l,p)=>{const E=$(l.id),D=l.id?"…"+l.id.slice(-8):`Meter ${p+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${l.types.map(R=>As[R]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${D}</code>
              <input type="hidden" name="meter_fee_${p}_meter_id" value="${l.id}" />
            </div>
            <div class="form-row" style="margin-bottom: var(--sp-2);">
              <label for="cfg-meter_fee_${p}_label">Label</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${p}_label" name="meter_fee_${p}_label" type="text" value="${E.label||`Meter ${p+1} metering fee`}" placeholder="e.g. Smart meter rental" />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-meter_fee_${p}_fee">Monthly Fee</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${p}_fee" name="meter_fee_${p}_fee" type="number" step="0.01" value="${E.fee}" />
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
      ${_.length>0?_.map((l,p)=>Lr(p,l)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,S=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${d.length>0?d.map((l,p)=>Fr(p,l)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,M=Ks(t==null?void 0:t.billing_adjustments),c=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Dated per-unit subsidies, rebates, supplier credits or temporary taxes. Amounts are deducted as separate invoice
      lines &mdash; your tariff prices are never modified. Date ranges are inclusive (Europe/Luxembourg).
      Overlapping adjustments stack. If your configured tariff already includes an adjustment, tick
      <strong>My entered tariff already includes this adjustment</strong> to avoid double-counting.
    </p>
    <div id="adjustments-container">
      ${M.length>0?M.map((l,p)=>Wr(p,l)).join(""):'<p class="muted">No billing adjustments configured.</p>'}
    </div>
    <div style="display: flex; gap: var(--sp-3); flex-wrap: wrap; margin-top: var(--sp-3);">
      <button type="button" id="add-adjustment-btn" class="btn btn-outline">
        + Add Custom Adjustment
      </button>
      <button type="button" id="restore-adjustment-presets-btn" class="btn btn-outline">
        Restore Official Presets
      </button>
    </div>
  `,y=Mr.map(l=>{if(l.title==="Gas Billing"&&!b||l.title==="Meter Fees"&&h.length<2)return"";let p;return l.title==="Feed-in / Selling"?p=f:l.title==="Time-of-Use Tariffs"?p=x:l.title==="Reference Power Windows"?p=S:l.title==="Government Aid & Billing Adjustments"?p=c:l.title==="Discounts"?p=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as monthly credits. The dashboard prorates them to the selected period and subtracts them before VAT.
      </p>`+o(l.fields):l.title==="Meter Fees"?p=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+k:p=o(l.fields),`
    <div class="form-section">
      <div class="form-section-title">${l.icon}  ${l.title}</div>
      ${p}
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
          ${t?y:'<p class="muted">Loading configuration…</p>'}
          ${t?`
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save Configuration</button>
            <button type="button" id="reset-config-btn" class="btn btn-outline">Reset to Defaults</button>
          </div>
          `:""}
        </form>
      </div>
    </section>
  `}function Dt(t,e,s=!1,a="dark",n=""){const o=d=>`
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
  `),u=o(`
    <path d="M4 19H20" />
    <path d="M7 19V11" />
    <path d="M12 19V7" />
    <path d="M17 19V4" />
  `),v=o(`
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
      `),_=[{id:"charts",label:"Charts",icon:r},{id:"dashboard",label:"Dashboard",icon:i},{id:"sensors",label:"Sensors",icon:u},{id:"invoice",label:"Invoice",icon:v},{id:"settings",label:"Settings",icon:f}];return`
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
        ${_.map(d=>`
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
  `}const js="leneda_credentials",Ns="leneda_theme";function Kr(){try{const t=localStorage.getItem(js);if(t)return JSON.parse(t)}catch{}return null}function Lt(t){try{localStorage.setItem(js,JSON.stringify(t))}catch{}}function Ir(){var t;try{const e=localStorage.getItem(Ns);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function Vr(t){try{localStorage.setItem(Ns,t)}catch{}}function fs(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const[,s,a,n]=e;return new Date(Number(s),Number(a)-1,Number(n))}function ws(t){const e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${e}-${s}-${a}`}function Ue(t){const e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0"),n=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),r=String(t.getSeconds()).padStart(2,"0"),i=String(t.getMilliseconds()).padStart(3,"0"),u=-t.getTimezoneOffset(),v=u>=0?"+":"-",f=String(Math.floor(Math.abs(u)/60)).padStart(2,"0"),b=String(Math.abs(u)%60).padStart(2,"0");return`${e}-${s}-${a}T${n}:${o}:${r}.${i}${v}${f}:${b}`}function bs(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Rr(t,e=new Date){switch(t){case"yesterday":{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const a=new Date(s);return a.setHours(23,59,59,999),{start:s,end:a}}case"this_week":{const s=new Date(e),a=s.getDay()||7;return s.setDate(s.getDate()-a+1),s.setHours(0,0,0,0),{start:s,end:e}}case"last_week":{const s=new Date(e),a=s.getDay()||7,n=new Date(s);n.setDate(s.getDate()-a),n.setHours(23,59,59,999);const o=new Date(n);return o.setDate(n.getDate()-6),o.setHours(0,0,0,0),{start:o,end:n}}case"this_month":return{start:new Date(e.getFullYear(),e.getMonth(),1),end:e};case"last_month":{const s=new Date(e.getFullYear(),e.getMonth()-1,1),a=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s,end:a}}case"this_year":return{start:new Date(e.getFullYear(),0,1),end:e};case"last_year":{const s=new Date(e.getFullYear()-1,0,1),a=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s,end:a}}}}function Ar(t,e,s=new Date){const a=fs(t),n=fs(e);if(!a||!n)return null;const o=["yesterday","this_week","last_week","this_month","last_month","this_year","last_year"];for(const r of o){const i=Rr(r,s);if(bs(a,i.start)&&bs(n,i.end))return r}return null}class Hr{constructor(e){De(this,"root");De(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartViewportStart:null,chartViewportEnd:null,chartUnit:"kwh",chartTimeBucket:"quarter_hour",chartConsumptionView:"grid",analysisHeatmapMetric:"grid",analysisProfileMetric:"house",analysisComparisonMode:"previous",analysisComparison:null,analysisComparisonLoading:!1,rangeData:null,consumptionTimeseries:null,productionTimeseries:null,gridImportTimeseries:null,marketExportTimeseries:null,perMeterProductionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:Ir()});De(this,"preZoomRange",null);De(this,"preZoomCustomStart","");De(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await $s();if(this.state.mode=e.mode,e.mode==="standalone"){const s=Kr();if(s&&(this.state.credentials=s),!e.configured&&!s){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&s)try{const{saveCredentials:a}=await pe(async()=>{const{saveCredentials:n}=await Promise.resolve().then(()=>xe);return{saveCredentials:n}},void 0);await a(s)}catch{}if(!s)try{this.state.credentials=await xs()}catch{}}await this.loadData()}toDisplayError(e,s="Failed to load data"){const a=e instanceof Error?e.message:String(e??"").trim(),n=a.toLowerCase();return n.includes("missing data")||n.includes("no_data")||n.includes("no data")?"Missing data":a||s}clearRangeStateWithError(e,s="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.state.gridImportTimeseries=null,this.state.marketExportTimeseries=null,this.state.perMeterProductionTimeseries=null,this.clearChartViewport(),this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1,this.state.error=this.toDisplayError(e,s)}async fetchPerMeterProductionForRange(e,s,a){var o;if(((e==null?void 0:e.meters)??[]).filter(r=>r.types.includes("production")||r.types.includes("solar_consumption")).length<=1)return null;try{const r=await Ft("1-1:2.29.0",s,a);return(o=r.meters)!=null&&o.length?r:null}catch(r){return console.warn("Per-meter production fetch failed:",r),null}}async fetchEnergyFlowTimeseries(e,s){const[a,n,o,r]=await Promise.all([Be("1-1:1.29.0",e,s),Be("1-1:2.29.0",e,s),Be("1-65:1.29.9",e,s),Be("1-65:2.29.9",e,s)]);return{consumptionTimeseries:a,productionTimeseries:n,gridImportTimeseries:o,marketExportTimeseries:r}}resetAnalysisComparison(){this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1}clearChartViewport(){this.state.chartViewportStart=null,this.state.chartViewportEnd=null}normalizeChartTimeBucket(){const{start:e,end:s}=this.getDateRangeISO(),a=wa(Pt(e,s),this.state.chartTimeBucket);a!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=a)}getCurrentRangeKey(){const{start:e,end:s}=this.getDateRangeISO();return`${e}|${s}`}shiftIsoByYears(e,s){const a=new Date(e);if(!Number.isFinite(a.getTime()))return e;const n=new Date(a);return n.setUTCFullYear(n.getUTCFullYear()+s),n.toISOString()}getComparisonRangeISO(e,s,a){if(a==="last_year")return{start:this.shiftIsoByYears(e,-1),end:this.shiftIsoByYears(s,-1)};const n=new Date(e).getTime(),o=new Date(s).getTime(),r=Math.max(0,o-n),i=n-1,u=i-r;return{start:new Date(u).toISOString(),end:new Date(i).toISOString()}}async loadAnalysisComparison(e=!1){var i;if(!this.state.consumptionTimeseries||!this.state.productionTimeseries)return;const{start:s,end:a}=this.getDateRangeISO(),n=this.state.analysisComparisonMode,o=`${s}|${a}|${n}`;if(!e&&(this.state.analysisComparisonLoading||((i=this.state.analysisComparison)==null?void 0:i.key)===o))return;const r=this.getComparisonRangeISO(s,a,n);this.state.analysisComparisonLoading=!0,this.state.tab==="charts"&&this.renderPreserveMainScroll();try{const{consumptionTimeseries:u,productionTimeseries:v,gridImportTimeseries:f,marketExportTimeseries:b}=await this.fetchEnergyFlowTimeseries(r.start,r.end);if(o!==this.getCurrentRangeKey())return;this.state.analysisComparison={key:o,mode:n,start:r.start,end:r.end,consumptionTimeseries:u,productionTimeseries:v,gridImportTimeseries:f,marketExportTimeseries:b}}catch(u){console.warn("Comparison data fetch failed:",u),o===this.getCurrentRangeKey()&&(this.state.analysisComparison=null)}finally{o===this.getCurrentRangeKey()&&(this.state.analysisComparisonLoading=!1,this.state.tab==="charts"&&this.renderPreserveMainScroll())}}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.clearChartViewport(),this.resetAnalysisComparison(),this.render();try{const[e,s,a]=await Promise.all([ot(this.state.range),Wt(),qe()]),{start:n,end:o}=this.getDateRangeISO(),[r,i]=await Promise.all([this.fetchEnergyFlowTimeseries(n,o),this.fetchPerMeterProductionForRange(a,n,o)]);this.state.rangeData=e,this.state.consumptionTimeseries=r.consumptionTimeseries,this.state.productionTimeseries=r.productionTimeseries,this.state.gridImportTimeseries=r.gridImportTimeseries,this.state.marketExportTimeseries=r.marketExportTimeseries,this.state.perMeterProductionTimeseries=i,this.state.sensors=s,this.state.config=a}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async changeRange(e){if(this.preZoomRange=null,this.clearChartViewport(),this.state.range=e,this.resetAnalysisComparison(),e==="custom"){if(!this.state.customStart||!this.state.customEnd){const s=new Date;s.setDate(s.getDate()-1);const a=new Date(s);a.setDate(a.getDate()-6),this.state.customStart=ws(a),this.state.customEnd=ws(s)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:s,end:a}=this.getDateRangeISO(),[n,o,r]=await Promise.all([ot(e),this.fetchEnergyFlowTimeseries(s,a),this.fetchPerMeterProductionForRange(this.state.config,s,a)]);this.state.rangeData=n,this.state.consumptionTimeseries=o.consumptionTimeseries,this.state.productionTimeseries=o.productionTimeseries,this.state.gridImportTimeseries=o.gridImportTimeseries,this.state.marketExportTimeseries=o.marketExportTimeseries,this.state.perMeterProductionTimeseries=r}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async applyCustomRange(){this.preZoomRange=null,this.clearChartViewport();const{customStart:e,customEnd:s}=this.state;if(!(!e||!s)){this.state.error=null,this.state.loading=!0,this.resetAnalysisComparison(),this.render();try{const a=Ar(e,s),n=a?ot(a):pe(async()=>{const{fetchCustomData:b}=await Promise.resolve().then(()=>xe);return{fetchCustomData:b}},void 0).then(({fetchCustomData:b})=>b(e,s)),o=this.state.config,r=Ue(new Date(e+"T00:00:00")),i=Ue(new Date(s+"T23:59:59.999")),[u,v,f]=await Promise.all([n,this.fetchEnergyFlowTimeseries(r,i),this.fetchPerMeterProductionForRange(o,r,i)]);this.state.rangeData={range:"custom",consumption:u.consumption,production:u.production,exported:u.exported??0,self_consumed:u.self_consumed??0,grid_import:u.grid_import,solar_to_home:u.solar_to_home,direct_solar_to_home:u.direct_solar_to_home,shared:u.shared,shared_with_me:u.shared_with_me,gas_energy:u.gas_energy??0,gas_volume:u.gas_volume??0,peak_power_kw:u.peak_power_kw??0,exceedance_kwh:u.exceedance_kwh??0,metering_point:u.metering_point??"",start:u.start??e,end:u.end??s},this.state.consumptionTimeseries=v.consumptionTimeseries,this.state.productionTimeseries=v.productionTimeseries,this.state.gridImportTimeseries=v.gridImportTimeseries,this.state.marketExportTimeseries=v.marketExportTimeseries,this.state.perMeterProductionTimeseries=f}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}}async shiftChartPeriod(e){const{start:s,end:a}=this.getDateRangeISO(),n=Cs(s,a,this.state.chartTimeBucket,e);n&&await this.handleChartZoomChange(Ue(n.start),Ue(n.end))}changeTab(e){this.state.tab=e,this.render(),(e==="dashboard"||e==="charts")&&!this.state.rangeData&&!this.state.loading&&this.loadData(),e==="charts"&&this.state.rangeData&&this.loadAnalysisComparison(),e==="sensors"&&!this.state.sensors&&Wt().then(s=>{this.state.sensors=s,this.render()}),e==="settings"&&!this.state.config&&qe().then(s=>{this.state.config=s,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,Vr(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}printInvoice(){var r,i;const e=document.title,a=`Leneda-invoice-${(r=this.state.rangeData)!=null&&r.start&&((i=this.state.rangeData)!=null&&i.end)?`${this.state.rangeData.start.slice(0,10)}_to_${this.state.rangeData.end.slice(0,10)}`:this.state.range}`.replace(/[^a-z0-9_-]+/gi,"-");let n=!1;const o=()=>{n||(n=!0,document.title=e,window.removeEventListener("afterprint",o))};document.title=a,window.addEventListener("afterprint",o,{once:!0}),window.print(),window.setTimeout(o,1e3)}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const s=this.root.querySelector(".main-content");s?s.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}getDataSourceLabel(){return this.state.mode==="ha"?"Home Assistant":"Standalone"}getHostedDataNoticeHtml(){var e;return(((e=this.state.credentials)==null?void 0:e.proxy_url)??"").trim().length>0,""}render(){var u;const{tab:e,loading:s,error:a,theme:n}=this.state,o=this.getDataSourceLabel(),r=this.getHostedDataNoticeHtml();if(s&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${Dt(e,v=>{},!1,n,o)}
          <main class="main-content">
            ${r}
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `,this.attachNavListeners();return}if(a&&!this.state.rangeData){const v=a.toLowerCase().includes("missing data");this.root.innerHTML=`
        <div class="app-shell">
          ${Dt(e,f=>{},!1,n,o)}
          <main class="main-content">
            ${r}
            <div class="error-state">
              <h2>${v?"Missing Data":"Connection Error"}</h2>
              <p>${v?"The selected period could not be loaded because data is missing.":a}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(u=this.root.querySelector("#retry-btn"))==null||u.addEventListener("click",()=>this.loadData());return}this.state.rangeData&&this.normalizeChartTimeBucket();let i="";switch(e){case"dashboard":i=$a(this.state);break;case"charts":i=nr(this.state);break;case"sensors":i=ir(this.state.sensors);break;case"invoice":i=kr(this.state);break;case"settings":i=Pr(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${Dt(e,v=>this.changeTab(v),this.state.isMenuOpen,n,o)}
        <main class="main-content">
          ${r}
          ${s?'<div class="loading-bar"></div>':""}
          ${i}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachAnalysisListeners(),this.attachInvoiceListeners(),this.attachSettingsListeners()}attachNavListeners(){var e,s;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(s=this.root.querySelector("[data-theme-toggle]"))==null||s.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.tab;this.changeTab(n)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.range;this.changeRange(i)})});const s=this.root.querySelector("#custom-start"),a=this.root.querySelector("#custom-end");s&&s.addEventListener("change",()=>{this.state.customStart=s.value}),a&&a.addEventListener("change",()=>{this.state.customEnd=a.value});const n=this.root.querySelector("#apply-custom-range");if(n==null||n.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.chartUnit;i!==this.state.chartUnit&&(this.state.chartUnit=i,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-bucket]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.chartBucket,{start:u,end:v}=this.getDateRangeISO();Ye(i,Pt(u,v))&&i!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=i,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-period-nav]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.chartPeriodNav==="next"?1:-1;this.shiftChartPeriod(i)})}),this.root.querySelectorAll("[data-chart-view]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.chartView;i!==this.state.chartConsumptionView&&(this.state.chartConsumptionView=i,this.renderPreserveMainScroll())})}),!e){const r=this.root.querySelector("#energy-chart");r&&this.state.rangeData&&this.initChart(r)}const o=this.root.querySelector(".reset-zoom-btn");o==null||o.addEventListener("click",async()=>{const{resetChartZoom:r}=await pe(async()=>{const{resetChartZoom:i}=await import("./Charts-B7ru_scq.js");return{resetChartZoom:i}},[]);if(r(),o.style.display="none",this.clearChartViewport(),this.preZoomRange!==null){const i=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",i==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(i)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachAnalysisListeners(){this.root.querySelectorAll("[data-analysis-heatmap]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisHeatmap;s!==this.state.analysisHeatmapMetric&&(this.state.analysisHeatmapMetric=s,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-profile]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisProfile;s!==this.state.analysisProfileMetric&&(this.state.analysisProfileMetric=s,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-comparison-mode]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisComparisonMode;s!==this.state.analysisComparisonMode&&(this.state.analysisComparisonMode=s,this.state.analysisComparison=null,this.loadAnalysisComparison(!0))})})}attachInvoiceListeners(){var e;(e=this.root.querySelector("#print-invoice-btn"))==null||e.addEventListener("click",()=>{this.printInvoice()})}attachSettingsListeners(){var v,f,b,_;const e=this.root.querySelector("#credentials-form");if(e){const d=this.root.querySelector("#add-meter-btn");d==null||d.addEventListener("click",()=>{var x,S,M;const $=new FormData(e),k=h($);if(k.length<10){k.push({id:"",types:["consumption"]});const c={api_key:$.get("api_key")||((x=this.state.credentials)==null?void 0:x.api_key)||"",energy_id:$.get("energy_id")||((S=this.state.credentials)==null?void 0:S.energy_id)||"",meters:k,proxy_url:$.get("proxy_url")||((M=this.state.credentials)==null?void 0:M.proxy_url)||""};this.state.credentials=c,Lt(c),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach($=>{$.addEventListener("click",()=>{var c,y,l;const k=parseInt($.dataset.meter??"0",10),x=new FormData(e),S=h(x);S.splice(k,1);const M={api_key:x.get("api_key")||((c=this.state.credentials)==null?void 0:c.api_key)||"",energy_id:x.get("energy_id")||((y=this.state.credentials)==null?void 0:y.energy_id)||"",meters:S,proxy_url:x.get("proxy_url")||((l=this.state.credentials)==null?void 0:l.proxy_url)||""};this.state.credentials=M,Lt(M),this.renderPreserveMainScroll()})});const h=$=>{var x,S,M,c,y,l;const k=[];for(let p=0;p<10;p++){const E=$.get(`meter_${p}_id`);if(E===null)break;const D=[];(x=e.querySelector(`[name="meter_${p}_consumption"]`))!=null&&x.checked&&D.push("consumption"),(S=e.querySelector(`[name="meter_${p}_production"]`))!=null&&S.checked&&D.push("production"),(M=e.querySelector(`[name="meter_${p}_solar_consumption"]`))!=null&&M.checked&&D.push("solar_consumption"),(c=e.querySelector(`[name="meter_${p}_export"]`))!=null&&c.checked&&D.push("export"),(y=e.querySelector(`[name="meter_${p}_export_consumption"]`))!=null&&y.checked&&D.push("export_consumption"),(l=e.querySelector(`[name="meter_${p}_gas"]`))!=null&&l.checked&&D.push("gas"),k.push({id:E.trim(),types:D})}return k};e.addEventListener("submit",async $=>{$.preventDefault();const k=new FormData(e),x={api_key:k.get("api_key"),energy_id:k.get("energy_id"),meters:h(k),proxy_url:k.get("proxy_url")},S=this.root.querySelector("#creds-status");try{Lt(x);const{saveCredentials:M}=await pe(async()=>{const{saveCredentials:l}=await Promise.resolve().then(()=>xe);return{saveCredentials:l}},void 0);await M(x),S&&(S.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=x,this.state.error=null;const c=!1,y=(x.proxy_url??"").trim();await this.loadData()}catch(M){S&&(S.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${M instanceof Error?M.message:M}</p>`)}});const g=this.root.querySelector("#test-creds-btn");g==null||g.addEventListener("click",async()=>{const $=new FormData(e),k={api_key:$.get("api_key"),energy_id:$.get("energy_id"),meters:h($),proxy_url:$.get("proxy_url")},x=this.root.querySelector("#creds-status");x&&(x.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:S}=await pe(async()=>{const{testCredentials:c}=await Promise.resolve().then(()=>xe);return{testCredentials:c}},void 0),M=await S(k);x&&(x.innerHTML=M.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${M.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${M.message}</p>`)}catch(S){x&&(x.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${S instanceof Error?S.message:S}</p>`)}})}const s=this.root.querySelector("#settings-form");if(!s)return;const a=d=>{const h=[];for(let g=0;g<24;g++){const $=d.get(`consumption_window_${g}_label`),k=d.get(`consumption_window_${g}_day_group`),x=d.get(`consumption_window_${g}_start_time`),S=d.get(`consumption_window_${g}_end_time`),M=d.get(`consumption_window_${g}_rate`);if($===null&&k===null&&x===null&&S===null&&M===null)break;h.push({label:($??"").trim()||`Window ${g+1}`,day_group:k??"all",start_time:x??"00:00",end_time:S??"06:00",rate:parseFloat(M??"0")||0})}return h},n=d=>{const h=[];for(let g=0;g<24;g++){const $=d.get(`reference_window_${g}_label`),k=d.get(`reference_window_${g}_day_group`),x=d.get(`reference_window_${g}_start_time`),S=d.get(`reference_window_${g}_end_time`),M=d.get(`reference_window_${g}_reference_power_kw`);if($===null&&k===null&&x===null&&S===null&&M===null)break;h.push({label:($??"").trim()||`Reference ${g+1}`,day_group:k??"all",start_time:x??"17:00",end_time:S??"00:00",reference_power_kw:parseFloat(M??"0")||0})}return h},o=d=>{var g,$,k;const h=[];for(let x=0;x<50;x++){const S=d.get(`adjustment_${x}_id`);if(S===null)break;const M=d.get(`adjustment_${x}_label`),c=d.get(`adjustment_${x}_commodity`),y=d.get(`adjustment_${x}_basis`),l=d.get(`adjustment_${x}_amount_gross`),p=d.get(`adjustment_${x}_start_date`),E=d.get(`adjustment_${x}_end_date`),D=d.get(`adjustment_${x}_preset_id`),P=d.get(`adjustment_${x}_eligibility_note`);h.push({id:(S??"").trim()||`custom-${x+1}`,label:(M??"").trim()||`Adjustment ${x+1}`,enabled:((g=s.querySelector(`[name="adjustment_${x}_enabled"]`))==null?void 0:g.checked)??!1,commodity:c==="gas"?"gas":"electricity",basis:y==="gas_volume_m3"?"gas_volume_m3":"grid_import_kwh",amount_gross:parseFloat(l??"0")||0,start_date:p??"",end_date:E??"",vat_included:(($=s.querySelector(`[name="adjustment_${x}_vat_included"]`))==null?void 0:$.checked)??!1,preset_id:(D??"").trim(),eligibility_note:(P??"").trim(),tariff_already_includes_adjustment:((k=s.querySelector(`[name="adjustment_${x}_tariff_already_includes_adjustment"]`))==null?void 0:k.checked)??!1})}return h},r=()=>{var c;const d=new FormData(s),h={};s.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.name.startsWith("adjustment_")||(h[y.name]=y.checked)});const g=[],$=/^feed_in_rate_(\d+)_(.+)$/,k={},x=[],S=/^meter_fee_(\d+)_(.+)$/,M={};for(const[y,l]of d.entries()){if(y.startsWith("consumption_window_")||y.startsWith("reference_window_")||y.startsWith("adjustment_"))continue;const p=y.match($);if(p){const K=p[1],I=p[2];k[K]||(k[K]={}),k[K][I]=l;continue}const E=y.match(S);if(E){const K=E[1],I=E[2];M[K]||(M[K]={}),M[K][I]=l;continue}if(h[y]!==void 0&&typeof h[y]=="boolean")continue;const D=l,P=s.elements.namedItem(y);if(D===""&&P instanceof HTMLInputElement&&P.type==="number"){const K=(c=this.state.config)==null?void 0:c[y];typeof K=="number"&&isFinite(K)&&(h[y]=K);continue}const R=parseFloat(D);h[y]=isNaN(R)?D:R}for(const y of Object.keys(k).sort()){const l=k[y],p=l.mode??"fixed",E=p==="sensor"?l.fallback_tariff??l.tariff:l.tariff,D=(l.self_use_priority??"").trim(),P=parseInt(D,10);g.push({meter_id:l.meter_id??"",mode:p,tariff:parseFloat(E??"0.08")||.08,sensor_entity:l.sensor_entity??"",display_name:(l.display_name??"").trim(),self_use_priority:D===""||!isFinite(P)?null:Math.max(1,P)})}g.length>0&&(h.feed_in_rates=g);for(const y of Object.keys(M).sort()){const l=M[y];x.push({meter_id:l.meter_id??"",label:l.label??"",fee:parseFloat(l.fee??"0")||0})}return x.length>0&&(h.meter_monthly_fees=x),h.consumption_rate_windows=a(d),h.reference_power_windows=n(d),h.billing_adjustments=o(d),h},i=d=>{if(!this.state.config)return;const h=r();d(h),this.state.config={...this.state.config,...h},this.renderPreserveMainScroll()};if((v=this.root.querySelector("#add-consumption-window-btn"))==null||v.addEventListener("click",()=>{i(d=>{var g;const h=Array.isArray(d.consumption_rate_windows)?[...d.consumption_rate_windows]:[];h.push({label:`Window ${h.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((g=this.state.config)==null?void 0:g.energy_variable_rate)??.1125}),d.consumption_rate_windows=h})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(d=>{d.addEventListener("click",()=>{const h=parseInt(d.dataset.window??"0",10);i(g=>{const $=Array.isArray(g.consumption_rate_windows)?[...g.consumption_rate_windows]:[];$.splice(h,1),g.consumption_rate_windows=$})})}),(f=this.root.querySelector("#add-reference-window-btn"))==null||f.addEventListener("click",()=>{i(d=>{var g;const h=Array.isArray(d.reference_power_windows)?[...d.reference_power_windows]:[];h.push({label:`Reference ${h.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((g=this.state.config)==null?void 0:g.reference_power_kw)??5}),d.reference_power_windows=h})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(d=>{d.addEventListener("click",()=>{const h=parseInt(d.dataset.window??"0",10);i(g=>{const $=Array.isArray(g.reference_power_windows)?[...g.reference_power_windows]:[];$.splice(h,1),g.reference_power_windows=$})})}),(b=this.root.querySelector("#add-adjustment-btn"))==null||b.addEventListener("click",()=>{i(d=>{const h=Array.isArray(d.billing_adjustments)?[...d.billing_adjustments]:[];h.push({id:`custom-${Date.now()}`,label:`Adjustment ${h.length+1}`,enabled:!0,commodity:"electricity",basis:"grid_import_kwh",amount_gross:0,start_date:"",end_date:"",vat_included:!0,preset_id:"",eligibility_note:"",tariff_already_includes_adjustment:!1}),d.billing_adjustments=h})}),this.root.querySelectorAll(".remove-adjustment-btn").forEach(d=>{d.addEventListener("click",()=>{const h=parseInt(d.dataset.adjustment??"0",10);i(g=>{const $=Array.isArray(g.billing_adjustments)?[...g.billing_adjustments]:[];$.splice(h,1),g.billing_adjustments=$})})}),(_=this.root.querySelector("#restore-adjustment-presets-btn"))==null||_.addEventListener("click",()=>{i(d=>{const g=(Array.isArray(d.billing_adjustments)?[...d.billing_adjustments]:[]).filter($=>!$.preset_id);d.billing_adjustments=[...ur(!0),...g]})}),s.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(d=>{d.addEventListener("change",()=>{const h=d.name.match(/feed_in_rate_(\d+)_mode/);if(!h)return;const g=h[1],$=s.querySelector(`.feed-in-fixed-fields[data-rate-idx="${g}"]`),k=s.querySelector(`.feed-in-sensor-fields[data-rate-idx="${g}"]`);$&&($.style.display=d.value==="fixed"?"":"none"),k&&(k.style.display=d.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const d=this.root.querySelector("#ha-entity-list");d&&ks().then(({entities:h})=>{d.innerHTML=h.map(g=>`<option value="${g}"></option>`).join("")}).catch(()=>{})}s.addEventListener("submit",async d=>{d.preventDefault();const h=r();try{const{saveConfig:g}=await pe(async()=>{const{saveConfig:$}=await Promise.resolve().then(()=>xe);return{saveConfig:$}},void 0);await g(h),this.state.config=await qe(),this.render()}catch(g){alert("Failed to save: "+(g instanceof Error?g.message:g))}});const u=this.root.querySelector("#reset-config-btn");u==null||u.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?"))try{const{resetConfig:d}=await pe(async()=>{const{resetConfig:h}=await Promise.resolve().then(()=>xe);return{resetConfig:h}},void 0);await d(),this.state.config=await qe(),this.render()}catch(d){alert("Failed to reset: "+(d instanceof Error?d.message:d))}})}async initChart(e){var s,a,n,o;try{const{renderEnergyChart:r}=await pe(async()=>{const{renderEnergyChart:x}=await import("./Charts-B7ru_scq.js");return{renderEnergyChart:x}},[]),{start:i,end:u}=this.getDateRangeISO(),v=this.state.chartViewportStart?new Date(this.state.chartViewportStart).getTime():void 0,f=this.state.chartViewportEnd?new Date(this.state.chartViewportEnd).getTime():void 0;let b=this.state.consumptionTimeseries,_=this.state.productionTimeseries,d=this.state.gridImportTimeseries,h=this.state.marketExportTimeseries;if(!b||!_||!d||!h){const x=await this.fetchEnergyFlowTimeseries(i,u);b=x.consumptionTimeseries,_=x.productionTimeseries,d=x.gridImportTimeseries,h=x.marketExportTimeseries,this.state.consumptionTimeseries=b,this.state.productionTimeseries=_,this.state.gridImportTimeseries=d,this.state.marketExportTimeseries=h}const g=((s=this.state.config)==null?void 0:s.reference_power_kw)??0,$=(((a=this.state.config)==null?void 0:a.meters)??[]).filter(x=>x.types.includes("production")||x.types.includes("solar_consumption"));let k;if((o=(n=this.state.perMeterProductionTimeseries)==null?void 0:n.meters)!=null&&o.length)k=this.state.perMeterProductionTimeseries.meters;else if($.length>1)try{const x=await Ft("1-1:2.29.0",i,u);x.meters&&x.meters.length>1&&(k=x.meters,this.state.perMeterProductionTimeseries=x)}catch(x){console.warn("Per-meter timeseries fetch failed, using merged view:",x)}r(e,b,_,{unit:this.state.chartUnit,consumptionView:this.state.chartConsumptionView,referencePowerKw:g,gridImportTimeseries:d,marketExportTimeseries:h,perMeterProduction:k,viewportStartMs:v,viewportEndMs:f,timeBucket:this.state.chartTimeBucket,onZoomChange:(x,S)=>{this.handleChartZoomChange(x,S)}})}catch(r){console.error("Chart init failed:",r)}}async handleChartZoomChange(e,s){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd),this.state.error=null,this.state.loading=!0,this.renderPreserveMainScroll();const{fetchCustomData:a}=await pe(async()=>{const{fetchCustomData:v}=await Promise.resolve().then(()=>xe);return{fetchCustomData:v}},void 0),n=e.slice(0,10),o=s.slice(0,10);this.resetAnalysisComparison();const r=await a(e,s),[i,u]=await Promise.all([this.fetchEnergyFlowTimeseries(e,s),this.fetchPerMeterProductionForRange(this.state.config,e,s)]);this.state.range="custom",this.state.customStart=n,this.state.customEnd=o,this.state.chartViewportStart=e,this.state.chartViewportEnd=s,this.state.rangeData={range:"custom",consumption:r.consumption,production:r.production,exported:r.exported??0,self_consumed:r.self_consumed??0,gas_energy:r.gas_energy??0,gas_volume:r.gas_volume??0,grid_import:r.grid_import,solar_to_home:r.solar_to_home,direct_solar_to_home:r.direct_solar_to_home,shared:r.shared,shared_with_me:r.shared_with_me,peak_power_kw:r.peak_power_kw??0,exceedance_kwh:r.exceedance_kwh??0,metering_point:r.metering_point??"",start:r.start,end:r.end},this.state.consumptionTimeseries=i.consumptionTimeseries,this.state.productionTimeseries=i.productionTimeseries,this.state.gridImportTimeseries=i.gridImportTimeseries,this.state.marketExportTimeseries=i.marketExportTimeseries,this.state.perMeterProductionTimeseries=u,this.state.loading=!1,this.renderPreserveMainScroll()}catch(a){console.error("Zoom data fetch failed:",a),this.state.loading=!1,this.clearRangeStateWithError(a,"Missing data"),this.render()}}getDateRangeISO(){if(this.state.chartViewportStart&&this.state.chartViewportEnd)return{start:this.state.chartViewportStart,end:this.state.chartViewportEnd};const e=new Date,s=a=>Ue(a);switch(this.state.range){case"custom":{const a=new Date(this.state.customStart+"T00:00:00"),n=new Date(this.state.customEnd+"T23:59:59.999");return{start:s(a),end:s(n)}}case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const n=new Date(a);return n.setHours(23,59,59,999),{start:s(a),end:s(n)}}case"this_week":{const a=new Date(e),n=a.getDay()||7;return a.setDate(a.getDate()-n+1),a.setHours(0,0,0,0),{start:s(a),end:s(e)}}case"last_week":{const a=new Date(e),n=a.getDay()||7,o=new Date(a);o.setDate(a.getDate()-n),o.setHours(23,59,59,999);const r=new Date(o);return r.setDate(o.getDate()-6),r.setHours(0,0,0,0),{start:s(r),end:s(o)}}case"this_month":{const a=new Date(e.getFullYear(),e.getMonth(),1);return{start:s(a),end:s(e)}}case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),n=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s(a),end:s(n)}}case"this_year":{const a=new Date(e.getFullYear(),0,1);return{start:s(a),end:s(e)}}case"last_year":{const a=new Date(e.getFullYear()-1,0,1),n=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s(a),end:s(n)}}default:{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const n=new Date(a);return n.setHours(23,59,59,999),{start:s(a),end:s(n)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new Hr(t).mount()}export{ka as b};
