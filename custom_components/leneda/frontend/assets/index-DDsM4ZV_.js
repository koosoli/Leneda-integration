var ga=Object.defineProperty;var va=(t,e,a)=>e in t?ga(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var De=(t,e,a)=>va(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const ya="modulepreload",fa=function(t){return"/leneda-panel/static/"+t},kt={},le=function(e,a,s){let n=Promise.resolve();if(a&&a.length>0){let r=function(v){return Promise.all(v.map(d=>Promise.resolve(d).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),p=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));n=r(a.map(v=>{if(v=fa(v),v in kt)return;kt[v]=!0;const d=v.endsWith(".css"),g=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${v}"]${g}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":ya,d||(h.as="script"),h.crossOrigin="",h.href=v,p&&h.setAttribute("nonce",p),document.head.appendChild(h),d)return new Promise((y,m)=>{h.addEventListener("load",y),h.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${v}`)))})}))}function o(r){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=r,window.dispatchEvent(c),!c.defaultPrevented)throw r}return n.then(r=>{for(const c of r||[])c.status==="rejected"&&o(c.reason);return e().catch(o)})};function Ht(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()})),proxy_url:(t.proxy_url??"").trim()}}function wa(){var t,e,a,s,n;try{const o=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((n=(s=(a=o==null?void 0:o.hass)==null?void 0:a.auth)==null?void 0:s.data)==null?void 0:n.access_token)??null}catch{return null}}async function J(t,e){const a=wa(),s={...e==null?void 0:e.headers,...a?{Authorization:`Bearer ${a}`}:{}},n={...e,credentials:"include",headers:s},o=await fetch(t,n);if(!o.ok){const r=o.headers.get("content-type")??"";let c="",p="";if(r.includes("application/json")){const v=await o.json().catch(()=>null);c=String((v==null?void 0:v.error)??"").trim(),p=String((v==null?void 0:v.message)??(v==null?void 0:v.error)??"").trim()}else p=(await o.text().catch(()=>"")).trim();throw c==="missing_data"||c==="no_data"||o.status===503?new Error("Missing data"):new Error(p?`API ${o.status}: ${p}`:`API ${o.status}: ${o.statusText}`)}return o.json()}async function Ze(t){return J(`/leneda_api/data?range=${t}`)}async function $a(t,e){return J(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function Ie(t,e,a){let s=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(s+=`&start=${encodeURIComponent(e)}`),a&&(s+=`&end=${encodeURIComponent(a)}`),J(s)}async function ut(t,e,a){let s=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(s+=`&start=${encodeURIComponent(e)}`),a&&(s+=`&end=${encodeURIComponent(a)}`),J(s)}async function ht(){return J("/leneda_api/sensors")}async function Ae(){return J("/leneda_api/config")}async function ba(t){await J("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function _a(){await J("/leneda_api/config/reset",{method:"POST"})}async function Nt(){try{return await J("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function Gt(){return J("/leneda_api/credentials")}async function xa(t){const e=Ht(t);await J("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function ka(t){const e=Ht(t);return J("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Ot(){return J("/leneda_api/ha-entities")}const Ce=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:Ae,fetchCredentials:Gt,fetchCustomData:$a,fetchHAEntities:Ot,fetchMode:Nt,fetchPerMeterTimeseries:ut,fetchRangeData:Ze,fetchSensors:ht,fetchTimeseries:Ie,resetConfig:_a,saveConfig:ba,saveCredentials:xa,testCredentials:ka},Symbol.toStringTag,{value:"Module"}));function gt(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(e){const[,a,s,n]=e;return new Date(Number(a),Number(s)-1,Number(n))}return new Date(t)}function u(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function ye(t){return gt(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function Ut(t){return gt(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function We(t){return gt(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}const Je=[{id:"year",label:"Year",shortLabel:"Yr",stepLabel:"year",approxMs:365*864e5,maxBuckets:30},{id:"month",label:"Month",shortLabel:"Mo",stepLabel:"month",approxMs:30*864e5,maxBuckets:72},{id:"week",label:"Week",shortLabel:"Wk",stepLabel:"week",approxMs:7*864e5,maxBuckets:104},{id:"day",label:"Day",shortLabel:"Day",stepLabel:"day",approxMs:864e5,maxBuckets:370},{id:"hour",label:"Hour",shortLabel:"Hr",stepLabel:"hour",approxMs:36e5,maxBuckets:744},{id:"quarter_hour",label:"15 min",shortLabel:"15m",stepLabel:"15 minutes",approxMs:15*6e4,maxBuckets:672}];function Bt(t){return Je.find(e=>e.id===t)??Je[3]}function mt(t,e){if(!t||!e)return 0;const a=new Date(t).getTime(),s=new Date(e).getTime();return!Number.isFinite(a)||!Number.isFinite(s)?0:Math.max(0,s-a)}function He(t,e){const a=Bt(t);if(e<=0)return t==="quarter_hour";const s=e/a.approxMs;return s>=1.5&&s<=a.maxBuckets}function Ma(t,e){var n;if(e&&He(e,t))return e;const a=t/864e5,s=a<=1.25?"quarter_hour":a<=7?"hour":a<=45?"day":a<=180?"week":a<=900?"month":"year";return He(s,t)?s:((n=Je.find(o=>He(o.id,t)))==null?void 0:n.id)??"quarter_hour"}function Ca(t,e){return new Date(t,e+1,0).getDate()}function Mt(t,e,a){const s=t.getDate(),n=new Date(t),o=n.getMonth()+a,r=n.getFullYear()+e+Math.floor(o/12),c=(o%12+12)%12,p=Math.min(s,Ca(r,c));return n.setFullYear(r,c,p),n}function Ct(t,e,a){switch(e){case"year":return Mt(t,a,0);case"month":return Mt(t,0,a);case"week":return new Date(t.getTime()+a*7*864e5);case"day":return new Date(t.getTime()+a*864e5);case"hour":return new Date(t.getTime()+a*36e5);case"quarter_hour":return new Date(t.getTime()+a*15*6e4)}}function qt(t,e,a,s){if(!t||!e)return null;const n=new Date(t),o=new Date(e);return!Number.isFinite(n.getTime())||!Number.isFinite(o.getTime())?null:{start:Ct(n,a,s),end:Ct(o,a,s)}}function Sa(t,e){if(!t||!e)return"No period loaded";const a=new Date(t),s=new Date(e);if(!Number.isFinite(a.getTime())||!Number.isFinite(s.getTime()))return"No period loaded";if(a.getFullYear()===s.getFullYear()&&a.getMonth()===s.getMonth()&&a.getDate()===s.getDate()){const o=a.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),r=a.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),c=s.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${o}, ${r} - ${c}`}return`${a.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})} - ${s.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}`}const Ne=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function ce(t){const e=a=>`
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
      `)}}function Ta(t){var Ue,Pe,ge,Ee,Ke,ve,be,_e;const e=t.rangeData,a=k=>{if(!k)return"";const E=k.match(/^(\d{4}-\d{2}-\d{2})/);return E?E[1]:""},s=(e==null?void 0:e.consumption)??0,n=(e==null?void 0:e.production)??0,o=(e==null?void 0:e.exported)??0,r=(e==null?void 0:e.self_consumed)??0,c=(e==null?void 0:e.gas_energy)??0,p=(e==null?void 0:e.gas_volume)??0,v=(e==null?void 0:e.peak_power_kw)??0,d=a(e==null?void 0:e.start),g=a(e==null?void 0:e.end),h=(e==null?void 0:e.shared_with_me)??0,y=(e==null?void 0:e.shared)??0,m=Math.max(0,o),$=Math.max(0,(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(r>0?r:n-m)),M=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??$),C=$,b=Math.max(0,(e==null?void 0:e.grid_import)??s-$),_=s>0?s:b+$,S=!!((Ue=t.config)!=null&&Ue.meter_has_gas||(((Pe=t.config)==null?void 0:Pe.meters)??[]).some(k=>k.types.includes("gas"))),i=y+h,l=_>0?Math.min(100,$/_*100):0,f=Math.max(_,n,b,m,y,h,M,1),x=S?Math.min(Math.max(0,c),f):0,L=(k,E=2.8,D=8.2)=>k>0?E+k/f*(D-E):1.8,W=k=>L(k)+1.4,P=k=>L(k)+5.4,V=(k,E=.28,D=.88)=>k>0?E+k/f*(D-E):.1,I=(k,E=.09,D=.22)=>k>0?E+k/f*(D-E):.05,q=(k,E=1.6,D=3.9)=>`${(k>0?Math.max(E,D-k/f*(D-E)):D).toFixed(2)}s`,ee=(k,E=3.4,D=5.8)=>k>0?E+k/f*(D-E):3,j=k=>k>0?Math.max(18,Math.round(k/f*100)):0,re=k=>`
    <defs>
      <filter id="${k}-glow-red" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${k}-glow-green" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${k}-glow-blue" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${k}-glow-cyan" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${k}-glow-gas" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <linearGradient id="${k}-flow-solar" x1="50%" y1="6%" x2="50%" y2="88%">
        <stop offset="0%" stop-color="var(--clr-production)" stop-opacity="0.28" />
        <stop offset="100%" stop-color="var(--clr-production)" stop-opacity="1" />
      </linearGradient>
      <linearGradient id="${k}-flow-grid-in" x1="8%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stop-color="var(--clr-consumption)" stop-opacity="0.35" />
        <stop offset="100%" stop-color="var(--clr-consumption)" stop-opacity="0.95" />
      </linearGradient>
      <linearGradient id="${k}-flow-grid-out" x1="100%" y1="44%" x2="4%" y2="76%">
        <stop offset="0%" stop-color="var(--clr-export)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--clr-export)" stop-opacity="0.4" />
      </linearGradient>
      <linearGradient id="${k}-flow-shared-out" x1="0%" y1="48%" x2="100%" y2="48%">
        <stop offset="0%" stop-color="var(--clr-export)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--clr-export)" stop-opacity="0.45" />
      </linearGradient>
      <linearGradient id="${k}-flow-shared-in" x1="100%" y1="48%" x2="0%" y2="48%">
        <stop offset="0%" stop-color="var(--clr-primary)" stop-opacity="0.4" />
        <stop offset="100%" stop-color="var(--clr-primary)" stop-opacity="1" />
      </linearGradient>
      <linearGradient id="${k}-flow-gas" x1="50%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stop-color="var(--clr-gas)" stop-opacity="0.3" />
        <stop offset="100%" stop-color="var(--clr-gas)" stop-opacity="0.95" />
      </linearGradient>

      <linearGradient id="${k}-scene-shell" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.05)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
      </linearGradient>
      <radialGradient id="${k}-house-base-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--clr-surface-alt)" stop-opacity="0.8" />
        <stop offset="100%" stop-color="var(--clr-surface-alt)" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="${k}-house-core-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(88, 166, 255, 0.18)" />
        <stop offset="100%" stop-color="rgba(88, 166, 255, 0)" />
      </radialGradient>
    </defs>
  `,O=k=>{const{x:E,y:D,width:H,accent:B,kicker:xe,value:ae,detail:ie}=k;return`
      <g class="scene-node-label" transform="translate(${E}, ${D})">
        <rect width="${H}" height="${ie?70:54}" rx="18" fill="var(--clr-overlay)" stroke="${B}" />
        <text x="16" y="22" class="scene-node-kicker">${xe}</text>
        <text x="16" y="${ie?39:37}" class="scene-node-value">${ae}</text>
        ${ie?`<text x="16" y="56" class="scene-node-detail">${ie}</text>`:""}
      </g>
    `},ne=k=>{const{x:E,y:D,scale:H=1,glowId:B}=k;return`
      <g class="scene-tier-icon scene-tier-grid" transform="translate(${E}, ${D}) scale(${H})">
        <circle cx="0" cy="44" r="48" fill="var(--clr-consumption)" fill-opacity="0.06" />
        <path d="M0 0 V88 M-24 20 H24 M-16 42 H16 M-8 66 H8" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" filter="url(#${B})" />
        <path d="M-12 88 L0 60 L12 88" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" fill="none" />
      </g>
    `},pe=k=>{const{x:E,y:D,scale:H=1,glowId:B}=k;return`
      <g class="scene-tier-icon scene-tier-solar" transform="translate(${E}, ${D}) scale(${H})">
        <circle cx="0" cy="0" r="26" fill="var(--clr-production)" fill-opacity="0.09" />
        <circle cx="0" cy="0" r="12" fill="var(--clr-production)" fill-opacity="0.9" filter="url(#${B})" />
        <path d="M0 -26 V-40 M0 26 V40 M26 0 H40 M-26 0 H-40 M18 -18 L28 -28 M18 18 L28 28 M-18 18 L-28 28 M-18 -18 L-28 -28" stroke="var(--clr-production)" stroke-width="2.5" stroke-linecap="round" />
      </g>
    `},oe=k=>{const{x:E,y:D,scale:H=1,glowId:B}=k;return`
      <g class="scene-tier-icon scene-tier-community" transform="translate(${E}, ${D}) scale(${H})">
        <circle cx="0" cy="40" r="50" fill="var(--clr-primary)" fill-opacity="0.06" />
        <rect x="-26" y="30" width="22" height="42" rx="6" fill="rgba(88, 166, 255, 0.08)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="6" y="16" width="24" height="56" rx="6" fill="rgba(88, 166, 255, 0.12)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="-2" y="4" width="6" height="10" rx="2" fill="var(--clr-primary)" fill-opacity="0.7" />
        <path d="M-14 12 H14 M-10 4 V20 M10 4 V20" stroke="var(--clr-primary)" stroke-width="2" stroke-linecap="round" filter="url(#${B})" />
      </g>
    `},ue=k=>{const{x:E,y:D,scale:H=1,glowId:B}=k;return`
      <g class="scene-tier-icon scene-tier-gas" transform="translate(${E}, ${D}) scale(${H})">
        <circle cx="0" cy="38" r="46" fill="var(--clr-gas)" fill-opacity="0.08" />
        <path d="M-26 40 H-8 V72 H26" stroke="var(--clr-gas)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#${B})" />
        <path d="M0 4 C18 24 20 40 20 52 C20 70 9 84 0 84 C-9 84 -20 70 -20 52 C-20 38 -10 24 0 4 Z" fill="rgba(210, 153, 34, 0.14)" stroke="var(--clr-gas)" stroke-width="2.2" />
        <path d="M0 24 C9 35 10 44 10 52 C10 61 5 68 0 72 C-5 68 -10 61 -10 52 C-10 44 -8 35 0 24 Z" fill="var(--clr-gas)" fill-opacity="0.85" />
      </g>
    `},U=k=>{const{prefix:E,x:D,y:H,scale:B=1}=k;return`
      <g class="elite-house" transform="translate(${D}, ${H}) scale(${B})">
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
          <text text-anchor="middle" y="-4" class="house-core-kicker">Self-Suff.</text>
          <text text-anchor="middle" y="18" class="house-core-value">${u(l,0)}%</text>
        </g>
        <text x="90" y="262" text-anchor="middle" class="house-total-label">Home usage</text>
        <text x="90" y="284" text-anchor="middle" class="house-total-value">${u(_)} kWh</text>
      </g>
    `},K=k=>{const{path:E,value:D,gradientId:H,colorVar:B,filterId:xe,particleClass:ae,direction:ie="forward"}=k,ke=ie==="reverse"?"1;0":"0;1";return`
      <path
        class="flow-halo ${ae}"
        d="${E}"
        stroke="url(#${H})"
        stroke-width="${P(D).toFixed(1)}"
        stroke-opacity="${I(D).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-rail ${ae}"
        d="${E}"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="${W(D).toFixed(1)}"
        stroke-opacity="0.42"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-stream ${ae}"
        d="${E}"
        stroke="url(#${H})"
        stroke-width="${L(D).toFixed(1)}"
        stroke-opacity="${V(D).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      ${D>0?`
        <circle
          class="flow-particle ${ae}"
          r="${ee(D).toFixed(1)}"
          fill="${B}"
          filter="url(#${xe})"
        >
          <animateMotion dur="${q(D)}" repeatCount="indefinite" path="${E}" keyPoints="${ke}" keyTimes="0;1" calcMode="linear" />
        </circle>
        <circle
          class="flow-particle flow-particle-secondary ${ae}"
          r="${Math.max(2.4,ee(D)-1.2).toFixed(1)}"
          fill="${B}"
          fill-opacity="0.75"
          filter="url(#${xe})"
        >
          <animateMotion dur="${q(D)}" begin="-${(parseFloat(q(D))/2).toFixed(2)}s" repeatCount="indefinite" path="${E}" keyPoints="${ke}" keyTimes="0;1" calcMode="linear" />
        </circle>
      `:""}
    `},he=()=>`
    <div class="elite-scene elite-scene-desktop">
      <svg class="elite-main-svg" viewBox="0 0 860 460" fill="none" preserveAspectRatio="xMidYMid meet">
        ${re("desktop")}
        <rect x="34" y="30" width="792" height="372" rx="34" fill="url(#desktop-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="430" cy="330" rx="278" ry="60" fill="url(#desktop-house-base-glow)" opacity="0.56" />
        <line x1="98" y1="334" x2="762" y2="334" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.45" />

        ${O({x:58,y:108,width:152,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${u(b+m)} kWh`,detail:m>0?`In ${u(b)} / out ${u(m)} kWh`:void 0})}

        ${O({x:356,y:44,width:148,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${u(n)} kWh`,detail:`${u($)} kWh used at home`})}

        ${O({x:624,y:108,width:184,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${u(i)} kWh`,detail:`Sent ${u(y)} / got ${u(h)} kWh`})}

        ${S?O({x:350,y:338,width:160,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${u(c)} kWh`,detail:p>0?`${u(p)} m3 in period`:"Gas meter active"}):""}

        ${ne({x:132,y:186,scale:1.02,glowId:"desktop-glow-red"})}
        ${pe({x:430,y:126,glowId:"desktop-glow-green"})}
        ${oe({x:716,y:194,glowId:"desktop-glow-cyan"})}
        ${S?ue({x:430,y:352,glowId:"desktop-glow-gas"}):""}
        ${U({prefix:"desktop",x:340,y:96,scale:1.02})}

        ${K({path:"M 430 152 C 430 182 430 204 430 220",value:M,gradientId:"desktop-flow-solar",colorVar:"var(--clr-production)",filterId:"desktop-glow-green",particleClass:"flow-solar"})}

        ${K({path:"M 176 230 C 246 230 318 230 364 232",value:b,gradientId:"desktop-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"desktop-glow-red",particleClass:"flow-grid-in"})}

        ${K({path:"M 496 268 C 430 298 326 314 176 316",value:m,gradientId:"desktop-flow-grid-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-grid-out"})}

        ${K({path:"M 500 234 C 566 220 634 220 692 236",value:y,gradientId:"desktop-flow-shared-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-shared-out"})}

        ${K({path:"M 690 272 C 632 292 566 294 500 278",value:h,gradientId:"desktop-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"desktop-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${S?K({path:"M 430 404 C 430 370 430 336 430 302",value:x,gradientId:"desktop-flow-gas",colorVar:"var(--clr-gas)",filterId:"desktop-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,te=()=>`
    <div class="elite-scene elite-scene-mobile">
      <svg class="elite-main-svg" viewBox="0 0 420 560" fill="none" preserveAspectRatio="xMidYMid meet">
        ${re("mobile")}
        <rect x="20" y="20" width="380" height="520" rx="32" fill="url(#mobile-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="210" cy="316" rx="136" ry="38" fill="url(#mobile-house-base-glow)" opacity="0.58" />
        <line x1="64" y1="332" x2="356" y2="332" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.42" />

        ${O({x:132,y:40,width:156,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${u(n)} kWh`})}

        ${O({x:20,y:194,width:126,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${u(b+m)} kWh`})}

        ${O({x:274,y:194,width:126,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${u(i)} kWh`})}

        ${S?O({x:122,y:442,width:176,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${u(c)} kWh`,detail:p>0?`${u(p)} m3`:"Gas meter active"}):""}

        ${pe({x:210,y:126,scale:.92,glowId:"mobile-glow-green"})}
        ${ne({x:76,y:254,scale:.86,glowId:"mobile-glow-red"})}
        ${oe({x:344,y:260,scale:.86,glowId:"mobile-glow-cyan"})}
        ${S?ue({x:210,y:442,scale:.9,glowId:"mobile-glow-gas"}):""}
        ${U({prefix:"mobile",x:118,y:166,scale:.94})}

        ${K({path:"M 210 152 C 210 188 210 216 210 238",value:M,gradientId:"mobile-flow-solar",colorVar:"var(--clr-production)",filterId:"mobile-glow-green",particleClass:"flow-solar"})}

        ${K({path:"M 104 286 C 138 286 168 286 194 286",value:b,gradientId:"mobile-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"mobile-glow-red",particleClass:"flow-grid-in"})}

        ${K({path:"M 226 318 C 194 340 162 348 102 350",value:m,gradientId:"mobile-flow-grid-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-grid-out"})}

        ${K({path:"M 226 286 C 262 274 294 274 318 286",value:y,gradientId:"mobile-flow-shared-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-shared-out"})}

        ${K({path:"M 318 320 C 294 332 262 334 226 322",value:h,gradientId:"mobile-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"mobile-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${S?K({path:"M 210 474 C 210 432 210 390 210 344",value:x,gradientId:"mobile-flow-gas",colorVar:"var(--clr-gas)",filterId:"mobile-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,Q=e!=null&&e.start&&(e!=null&&e.end)?`${ye(e.start)} — ${ye(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${ye(t.customStart+"T00:00:00")} — ${ye(t.customEnd+"T00:00:00")}`:((ge=Ne.find(k=>k.id===t.range))==null?void 0:ge.label)??"Yesterday",z=(Ke=(Ee=t.consumptionTimeseries)==null?void 0:Ee.items)!=null&&Ke.length?t.consumptionTimeseries.items:((ve=t.productionTimeseries)==null?void 0:ve.items)??[],we=t.chartViewportStart??((be=z[0])==null?void 0:be.startedAt)??(e==null?void 0:e.start),X=t.chartViewportEnd??((_e=z[z.length-1])==null?void 0:_e.startedAt)??(e==null?void 0:e.end),Se=mt(we,X),Y=Bt(t.chartTimeBucket),Le=Sa(we,X),Te=qt(we,X,t.chartTimeBucket,1),$e=new Date,Z=!Te||Te.start.getTime()>$e.getTime(),Ge=Je.map(k=>{const E=He(k.id,Se),D=k.id===t.chartTimeBucket,H=k.id==="quarter_hour"?"15-minute detail would be too dense for this selected period":`${k.label} detail does not add useful resolution for this selected period`;return`
            <button
              class="unit-btn chart-bucket-btn ${D?"active":""}"
              data-chart-bucket="${k.id}"
              title="${E?`Show ${k.label.toLowerCase()} detail`:H}"
              ${E?"":'disabled aria-disabled="true"'}
            >${k.label}</button>
          `}).join(""),tt=t.chartUnit==="kw"?"kW uses the same detail presets as kWh, but keeps power values in interval bars so short spikes and dips stay visible.":"kWh keeps the aggregated period bars for totals.",Oe=`${t.chartConsumptionView==="house"?"Total Usage shows the full house load, with the solar-covered share highlighted in green and exports below zero. Use the detail presets and arrows above the graph to move through time.":t.chartConsumptionView==="solar_systems"?"PV Systems stacks each configured solar production meter so you can compare panel-system output like the Home Assistant Energy dashboard.":"Net Grid focuses on what still came from the grid after solar, with exports shown below zero. The reference limit in kW mode applies here."} ${tt}`,me=((e==null?void 0:e.exceedance_kwh)??0)>0?ce("warning"):ce("ok");return`
    <div class="dashboard" style="position: relative;">
      <div style="position:fixed;bottom:4px;right:4px;font-size:10px;opacity:0.5;pointer-events:none;z-index:9999;">v:2.9.2</div>

      <!-- Range Selector -->
      <div class="range-selector">
        ${Ne.map(k=>`
          <button
            class="range-btn ${k.id===t.range?"active":""}"
            data-range="${k.id}"
          >${k.label}</button>
        `).join("")}
      </div>

      ${(()=>{if(!(e!=null&&e.start)||!(e!=null&&e.end))return"";try{const k=new Date(e.start),E=new Date(e.end);return isNaN(k.getTime())||isNaN(E.getTime())?"":`
            <div class="range-info-bar">
              📅 ${k.toLocaleDateString()} — ${E.toLocaleDateString()}
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
      `:d&&g?`
      <!-- Preset Period Preview -->
      <div class="custom-range-picker period-preview">
        <span class="period-preview-label">Viewed period</span>
        <label>
          <span>From</span>
          <input type="date" value="${d}" readonly aria-label="Preset period start" />
        </label>
        <label>
          <span>To</span>
          <input type="date" value="${g}" readonly aria-label="Preset period end" />
        </label>
      </div>
      `:""}

      <!-- Stat Cards -->
      <div class="stats-grid">
        <div class="stat-card consumption">
          <div class="stat-icon">${ce("consumption")}</div>
          <div class="stat-body">
            <div class="stat-label">Consumption</div>
            <div class="stat-value">${u(s)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card production">
          <div class="stat-icon">${ce("production")}</div>
          <div class="stat-body">
            <div class="stat-label">Production</div>
            <div class="stat-value">${u(n)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.export">
          <div class="stat-icon">${ce("export")}</div>
          <div class="stat-body">
            <div class="stat-label">Exported</div>
            <div class="stat-value">${u(o)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.self-consumed">
          <div class="stat-icon">${ce("self_consumed")}</div>
          <div class="stat-body">
            <div class="stat-label">Self-Consumed</div>
            <div class="stat-value">${u(C)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>
      </div>

      <!-- Energy Flow + Key Metrics side by side -->
      <div class="flow-metrics-row">
        <div class="card flow-card">
          <h3 class="card-title"><span class="title-icon">${ce("flow")}</span> Energy Flow</h3>

          <div class="leneda-elite-flow">
            <div class="elite-header">
              <div class="glass-module consumption-module">
                <div class="module-info">
                  <span class="module-label">Period Consumption <span class="info-icon">ⓘ</span></span>
                  <div class="module-value-row">
                    <span class="module-value highlight-red">${u(s)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg red"></div></div>
              </div>

              <div class="glass-module production-module">
                <div class="module-info">
                  <span class="module-label">Solar Production <span class="info-icon">ⓘ</span></span>
                  <div class="module-value-row">
                    <span class="module-value highlight-green">${u(n)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg green"></div></div>
              </div>
            </div>

            <div class="flow-scene-summary">
              <span class="flow-scene-chip solar">Self-sufficient ${u(l,0)}%</span>
              <span class="flow-scene-chip import">Grid import ${u(b)} kWh</span>
              <span class="flow-scene-chip export">Export ${u(m)} kWh</span>
              <span class="flow-scene-chip community">Community ${u(i)} kWh</span>
              ${v>0?`<span class="flow-scene-chip neutral">Peak ${u(v,2)} kW</span>`:""}
            </div>

            <p class="flow-scene-caption">
              Thicker paths show larger energy volumes for the selected period. Green flows stay in the home, red flows come from the grid, blue flows leave the home or community, and amber shows gas.
            </p>

            ${he()}
            ${te()}

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${u(_)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${u(l,0)}% solar supplied${v>0?` · Peak ${u(v,2)} kW`:""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${u($)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${j($)}%;"></span></div>
                  <p>Energy used inside the house${h>0?", including received community energy":""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${u(b)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${j(b)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${u(m)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${j(m)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${u(i)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${j(i)}%;"></span></div>
                  <p>Sent ${u(y)} kWh · received ${u(h)} kWh.</p>
                </div>
                ${S?`
                <div class="mobile-flow-item gas">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Gas to house</span>
                    <strong>${u(c)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${j(x||f)}%;"></span></div>
                  <p>${p>0?`${u(p)} m3 measured for the same period.`:"Gas meter is configured for this home."}</p>
                </div>
                `:""}
              </div>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${u($)} kWh directly supplied inside the house</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${u(b)} kWh still needed from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${u(m)} kWh sent back to the market or grid</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${u(y)} kWh sent · ${u(h)} kWh received${h>0?" (included in solar to home)":""}</span>
                </span>
              </div>
              ${S?`
              <div class="flow-legend-item gas">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Gas to house</strong>
                  <span>${u(c)} kWh${p>0?` / ${u(p)} m3`:""}</span>
                </span>
              </div>
              `:""}
            </div>
          </div>
      </div>

      <!-- Key Metrics (right of flow) -->
      <div class="card metrics-card">
        <h3 class="card-title"><span class="title-icon">${ce("metrics")}</span> Key Metrics</h3>
        <div class="metrics-list">
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Sufficiency</span>
              <span class="metric-value">${u(l,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${l}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Consumed</span>
              <span class="metric-value">${u(C)} kWh</span>
            </div>
          </div>
          ${v>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${u(v,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label"><span class="metric-status-icon">${me}</span> Exceedance</span>
              <span class="metric-value">${u((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${c>0||p>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${u(c)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${u(p)} m³</span>
            </div>
          </div>
          `:""}
        </div>
      </div>
      </div>

      <!-- Chart -->
      <div class="card chart-card">
        <div class="chart-header">
          <h3 class="card-title"><span class="title-icon">${ce("profile")}</span> Energy Profile — ${Q}</h3>
          <div class="chart-period-status">
            <span class="chart-period-kicker">Showing</span>
            <strong>${Le}</strong>
            <span>${Y.label} detail</span>
          </div>

          <div class="chart-control-stack">
            <div class="chart-period-controls" aria-label="Move chart period">
              <button
                class="chart-nav-btn"
                data-chart-period-nav="prev"
                title="Previous ${Y.stepLabel}"
                aria-label="Previous ${Y.stepLabel}"
              >&larr;</button>
              <span class="chart-period-pill">${Le}</span>
              <button
                class="chart-nav-btn"
                data-chart-period-nav="next"
                title="Next ${Y.stepLabel}"
                aria-label="Next ${Y.stepLabel}"
                ${Z?'disabled aria-disabled="true"':""}
              >&rarr;</button>
            </div>

            <div class="chart-bucket-toggle" aria-label="Chart detail presets">
              ${Ge}
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
          ${Oe}
        </p>
      </div>

      </div>

      </div>
    </section>
  `}function Ea(t=""){return{iso:t,consumptionKw:0,productionKw:0,gridImportKw:0,solarExportKw:0}}function Ye(t,e,a){for(const s of(e==null?void 0:e.items)??[]){const n=new Date(s.startedAt).getTime();if(!Number.isFinite(n))continue;const o=t.get(n)??Ea(s.startedAt);o[a]+=Math.max(0,Number(s.value)||0),o.iso||(o.iso=s.startedAt),t.set(n,o)}}function Da(t,e,a={}){var r,c,p,v;const s=new Map,n=!!((c=(r=a.gridImport)==null?void 0:r.items)!=null&&c.length),o=!!((v=(p=a.marketExport)==null?void 0:p.items)!=null&&v.length);return Ye(s,t,"consumptionKw"),Ye(s,e,"productionKw"),Ye(s,a.gridImport,"gridImportKw"),Ye(s,a.marketExport,"solarExportKw"),[...s.entries()].sort((d,g)=>d[0]-g[0]).map(([d,g])=>{const h=Math.max(0,g.consumptionKw),y=Math.max(0,g.productionKw),m=Math.max(0,Math.min(h,y)),$=n?Math.max(0,g.gridImportKw):Math.max(0,h-m),M=Math.max(0,h-$),C=o?Math.max(0,g.solarExportKw):Math.max(0,y-m);return{timestamp:d,iso:g.iso||new Date(d).toISOString(),consumptionKw:h,productionKw:y,solarToHomeKw:M,gridImportKw:$,solarExportKw:C}})}function ct(t,e){return Number.isFinite(t)?Number(t):e}function vt(t){const e=(t.meters??[]).filter(n=>n.types.includes("production")),a=t.feed_in_rates??[],s=t.currency??"EUR";return e.map((n,o)=>{const r=a.find(d=>d.meter_id===n.id),c=(r==null?void 0:r.mode)==="sensor"&&r.sensor_value!=null&&Number.isFinite(r.sensor_value),p=c?(r==null?void 0:r.sensor_value)??0:ct(r==null?void 0:r.tariff,ct(t.feed_in_tariff,0)),v=Math.max(1,Math.round(ct(r==null?void 0:r.self_use_priority,o+1)));return{meterId:n.id,shortId:n.id?"…"+n.id.slice(-8):`Meter ${o+1}`,rate:p,label:c?`Sensor (${p.toFixed(4)} ${s}/kWh)`:"Fixed tariff",mode:(r==null?void 0:r.mode)??"fixed",selfUsePriority:v}}).sort((n,o)=>n.selfUsePriority!==o.selfUsePriority?n.selfUsePriority-o.selfUsePriority:n.meterId.localeCompare(o.meterId))}function yt(t,e,a,s,n){var i;if(!e||!(a!=null&&a.length))return null;const o=vt(t);if(!o.length)return null;const r=new Map(a.map(l=>[l.meter_id,l]));if(!o.some(l=>r.has(l.meterId)))return null;const c=o.map(l=>({...l,producedKwh:0,selfConsumedKwh:0,exportedKwh:0,revenue:0,exportEquivalentForSelfUse:0})),p=new Map(c.map((l,f)=>[l.meterId,f])),v=new Map,d=new Set;for(const l of e.items)l.startedAt&&d.add(l.startedAt);const g=new Map;for(const l of e.items){const f=Math.max(0,Number(l.value)||0);g.set(l.startedAt,(g.get(l.startedAt)??0)+f)}for(const l of a){const f=new Map;for(const x of l.items??[]){const L=Math.max(0,Number(x.value)||0);f.set(x.startedAt,(f.get(x.startedAt)??0)+L),x.startedAt&&d.add(x.startedAt)}v.set(l.meter_id,f)}for(const l of[...d].sort()){let f=Math.max(0,g.get(l)??0);for(const x of c){const L=p.get(x.meterId);if(L==null)continue;const W=Math.max(0,((i=v.get(x.meterId))==null?void 0:i.get(l))??0),P=W*.25,V=Math.min(f,W),I=V*.25,q=Math.max(0,W-V)*.25;c[L].producedKwh+=P,c[L].selfConsumedKwh+=I,c[L].exportedKwh+=q,f=Math.max(0,f-V)}}const h=c.reduce((l,f)=>l+f.selfConsumedKwh,0),y=c.reduce((l,f)=>l+f.exportedKwh,0),m=Math.max(0,s??h),$=Math.max(0,n??y),M=h>0?m/h:1,C=y>0?$/y:1;for(const l of c)l.selfConsumedKwh*=M,l.exportedKwh*=C,l.revenue=l.exportedKwh*l.rate,l.exportEquivalentForSelfUse=l.selfConsumedKwh*l.rate;const b=c.reduce((l,f)=>l+f.revenue,0),_=c.reduce((l,f)=>l+f.exportEquivalentForSelfUse,0),S=$>0?b/$:0;return{meters:c,totalFeedInRevenue:b,totalSelfUseExportEquivalent:_,weightedExportRate:S,usedPriorityAllocation:!0}}const St=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],Ve={house:"Total Usage",grid:"Net Grid",solar:"Solar Production",exceedance_kwh:"Exceedance kWh",exceedance_frequency:"Exceedance Rate"},je={house:"Total Usage",grid:"Net Grid",solar:"Solar Production"},Fe={previous:"Previous Period",last_year:"Last Year"};function Tt(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function Fa(t){const e=new Date(t),a=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${s}-${n}`}function Wa(t){const[e,a,s]=t.split("-").map(Number);return new Date(e,a-1,s,12,0,0,0)}function se(t,e=0){return t.length?Math.max(...t):e}function ft(t,e=0){return t.length?Math.min(...t):e}function fe(t,e,a){return Math.min(a,Math.max(e,t))}function G(t,e){if(!t.length)return 0;const a=[...t].sort((p,v)=>p-v),s=fe(e,0,1),n=(a.length-1)*s,o=Math.floor(n),r=Math.ceil(n);if(o===r)return a[o];const c=n-o;return a[o]*(1-c)+a[r]*c}function La(t){const e=Math.floor(t/4),a=t%4*15;return`${String(e).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function N(t,e){return`${u(t,2)} ${e}`}function Qe(t,e){return`${t>0?"+":t<0?"-":""}${u(Math.abs(t),2)} ${e}`}function ze(t,e=1){return Math.abs(t)<.005?"0":`${t>0?"+":""}${u(t,e)}`}function Et(t){const[e,a]=t.split(":").map(s=>parseInt(s,10)||0);return e*60+a}function Pa(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function Yt(t,e,a,s){if(!Pa(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),o=Et(a),r=Et(s);return o===r?!0:o<r?n>=o&&n<r:n>=o||n<r}function Ka(t,e){return e.find(a=>Yt(t,a.day_group,a.start_time,a.end_time))}function Va(t,e){return e.find(a=>Yt(t,a.day_group,a.start_time,a.end_time))}function jt(t,e,a,s,n){const o=yt(t,e,a,s,n);if(o&&o.weightedExportRate>0)return o.weightedExportRate;const r=vt(t).map(c=>c.rate).filter(c=>Number.isFinite(c)&&c>=0);return r.length?r.reduce((c,p)=>c+p,0)/r.length:t.feed_in_tariff??0}function Ra(t,e,a,s,n,o){const r=n.consumption_rate_windows??[],c=n.reference_power_windows??[],p=n.reference_power_kw??0,v=(n.exceedance_rate??0)*(1+(n.vat_rate??0));return Da(t,e,{gridImport:a,marketExport:s}).map(d=>{var x,L;const g=d.timestamp,h=new Date(g),y=d.consumptionKw,m=d.productionKw,$=d.solarToHomeKw,M=d.gridImportKw,C=d.solarExportKw,b=((x=Va(h,c))==null?void 0:x.reference_power_kw)??p,_=Math.max(0,y-b),S=Math.max(0,M-b),i=Math.max(0,_-S),f=((((L=Ka(h,r))==null?void 0:L.rate)??n.energy_variable_rate??0)+(n.network_variable_rate??0)+(n.electricity_tax_rate??0)+(n.compensation_fund_rate??0))*(1+(n.vat_rate??0));return{timestamp:g,iso:d.iso,date:h,houseKw:y,solarKw:m,solarToHomeKw:$,gridKw:M,exportKw:C,referenceKw:b,overKw:S,avoidedOverKw:i,importRateWithVat:f,feedInRate:o,exceedanceRateWithVat:v}})}function zt(t,e,a,s,n,o){const r=Ra(t,e,a,s,n,o),c=new Map,p=Array.from({length:24},()=>0),v=Array.from({length:24},(i,l)=>({label:`${String(l).padStart(2,"0")}:00`,importCost:0,exportSpreadValue:0,gridKwh:0,exportKwh:0})),d={house:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),grid:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),solar:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_kwh:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_frequency:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0})))},g=()=>Array.from({length:96},()=>[]),h={house:{weekday:g(),weekend:g()},grid:{weekday:g(),weekend:g()},solar:{weekday:g(),weekend:g()}},y={houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0};for(const i of r){const f=Fa(i.timestamp),x=c.get(f)??(()=>{const Q=Wa(f);return{key:f,label:Q.toLocaleDateString(void 0,{month:"short",day:"numeric"}),fullDate:Q.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0}})(),L=i.houseKw*.25,W=i.solarKw*.25,P=i.solarToHomeKw*.25,V=i.gridKw*.25,I=i.exportKw*.25,q=i.overKw*.25,ee=i.avoidedOverKw*.25,j=V*i.importRateWithVat,re=P*i.importRateWithVat,O=I*i.feedInRate,ne=P*(i.importRateWithVat-i.feedInRate),pe=q*i.exceedanceRateWithVat,oe=ee*i.exceedanceRateWithVat,ue=re+O+oe-j-pe;x.houseKwh+=L,x.solarKwh+=W,x.solarToHomeKwh+=P,x.gridKwh+=V,x.exportKwh+=I,x.exceedanceKwh+=q,x.avoidedExceedanceKwh+=ee,x.importCost+=j,x.solarSavings+=re,x.exportRevenue+=O,x.selfConsumptionAdvantage+=ne,x.exceedanceCost+=pe,x.avoidedExceedanceValue+=oe,x.netValue+=ue,x.peakGridKw=Math.max(x.peakGridKw,i.gridKw),x.peakHouseKw=Math.max(x.peakHouseKw,i.houseKw),x.exceedanceIntervals+=i.overKw>0?1:0,c.set(f,x),y.houseKwh+=L,y.solarKwh+=W,y.solarToHomeKwh+=P,y.gridKwh+=V,y.exportKwh+=I,y.exceedanceKwh+=q,y.avoidedExceedanceKwh+=ee,y.importCost+=j,y.solarSavings+=re,y.exportRevenue+=O,y.selfConsumptionAdvantage+=ne,y.exceedanceCost+=pe,y.avoidedExceedanceValue+=oe,y.netValue+=ue,y.peakGridKw=Math.max(y.peakGridKw,i.gridKw),y.peakHouseKw=Math.max(y.peakHouseKw,i.houseKw),y.exceedanceIntervals+=i.overKw>0?1:0;const U=(i.date.getDay()+6)%7,K=i.date.getHours(),he=K*4+Math.floor(i.date.getMinutes()/15),te=i.date.getDay()===0||i.date.getDay()===6?"weekend":"weekday";d.house[U][K].sum+=i.houseKw,d.house[U][K].count+=1,d.grid[U][K].sum+=i.gridKw,d.grid[U][K].count+=1,d.solar[U][K].sum+=i.solarKw,d.solar[U][K].count+=1,d.exceedance_kwh[U][K].sum+=q,d.exceedance_kwh[U][K].count+=1,d.exceedance_frequency[U][K].sum+=i.overKw>0?1:0,d.exceedance_frequency[U][K].count+=1,p[K]+=q,h.house[te][he].push(i.houseKw),h.grid[te][he].push(i.gridKw),h.solar[te][he].push(i.solarKw),v[K].importCost+=j,v[K].exportSpreadValue+=I*Math.max(i.importRateWithVat-i.feedInRate,0),v[K].gridKwh+=V,v[K].exportKwh+=I}const m=[...c.values()].sort((i,l)=>i.key.localeCompare(l.key)).map(i=>(i.coveragePct=i.houseKwh>0?i.solarToHomeKwh/i.houseKwh*100:0,i.selfConsumedPct=i.solarKwh>0?fe(i.solarToHomeKwh/i.solarKwh*100,0,100):0,i.solarValue=i.solarSavings+i.exportRevenue+i.avoidedExceedanceValue,i));y.coveragePct=y.houseKwh>0?y.solarToHomeKwh/y.houseKwh*100:0,y.selfConsumedPct=y.solarKwh>0?fe(y.solarToHomeKwh/y.solarKwh*100,0,100):0,y.solarValue=y.solarSavings+y.exportRevenue+y.avoidedExceedanceValue;const $={house:d.house.map(i=>i.map(l=>l.count?l.sum/l.count:0)),grid:d.grid.map(i=>i.map(l=>l.count?l.sum/l.count:0)),solar:d.solar.map(i=>i.map(l=>l.count?l.sum/l.count:0)),exceedance_kwh:d.exceedance_kwh.map(i=>i.map(l=>l.sum)),exceedance_frequency:d.exceedance_frequency.map(i=>i.map(l=>l.count?l.sum/l.count*100:0))},M=Array.from({length:96},(i,l)=>La(l)),C={house:{weekday:{lower:h.house.weekday.map(i=>G(i,.1)),median:h.house.weekday.map(i=>G(i,.5)),upper:h.house.weekday.map(i=>G(i,.9))},weekend:{lower:h.house.weekend.map(i=>G(i,.1)),median:h.house.weekend.map(i=>G(i,.5)),upper:h.house.weekend.map(i=>G(i,.9))}},grid:{weekday:{lower:h.grid.weekday.map(i=>G(i,.1)),median:h.grid.weekday.map(i=>G(i,.5)),upper:h.grid.weekday.map(i=>G(i,.9))},weekend:{lower:h.grid.weekend.map(i=>G(i,.1)),median:h.grid.weekend.map(i=>G(i,.5)),upper:h.grid.weekend.map(i=>G(i,.9))}},solar:{weekday:{lower:h.solar.weekday.map(i=>G(i,.1)),median:h.solar.weekday.map(i=>G(i,.5)),upper:h.solar.weekday.map(i=>G(i,.9))},weekend:{lower:h.solar.weekend.map(i=>G(i,.1)),median:h.solar.weekend.map(i=>G(i,.5)),upper:h.solar.weekend.map(i=>G(i,.9))}}},b=r.filter(i=>i.overKw>0).sort((i,l)=>l.overKw-i.overKw||l.timestamp-i.timestamp).slice(0,8),_=[...r].sort((i,l)=>l.houseKw-i.houseKw||l.timestamp-i.timestamp).slice(0,8),S=[...m].filter(i=>i.exceedanceKwh>0).sort((i,l)=>l.exceedanceKwh-i.exceedanceKwh).slice(0,6);return{points:r,daily:m,totals:y,topExceedances:b,peakIntervals:_,hourlyExceedanceKwh:p,heatmapValues:$,intradayProfiles:C,intradayLabels:M,hourlyOpportunity:v,loadDurationGrossKw:r.map(i=>i.houseKw).sort((i,l)=>l-i),loadDurationNetKw:r.map(i=>i.gridKw).sort((i,l)=>l-i),worstDays:S}}function Ia(t){var e,a,s;return(e=t.rangeData)!=null&&e.start&&((a=t.rangeData)!=null&&a.end)?`${ye(t.rangeData.start)} - ${ye(t.rangeData.end)}`:((s=Ne.find(n=>n.id===t.range))==null?void 0:s.label)??"Selected Period"}function Aa(t){var e,a;return(e=t.rangeData)!=null&&e.start&&((a=t.rangeData)!=null&&a.end)?`${We(t.rangeData.start)} - ${We(t.rangeData.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${t.customStart} - ${t.customEnd}`:"Based on the currently selected range."}function Dt(t){const e=t.analysisComparisonMode==="last_year"?"Same period last year":"Previous matched period";return t.analysisComparison?`${e}: ${We(t.analysisComparison.start)} - ${We(t.analysisComparison.end)}`:e}function Ha(t){switch(t){case"house":return{description:"Average hourly power by weekday for total house usage.",note:"Each cell shows the average kW seen in that weekday/hour slot over the selected period."};case"grid":return{description:"Average hourly power by weekday for remaining grid draw after solar.",note:"Each cell shows the average net-grid kW seen in that weekday/hour slot over the selected period."};case"solar":return{description:"Average hourly power by weekday for solar production.",note:"Each cell shows the average solar kW seen in that weekday/hour slot over the selected period."};case"exceedance_kwh":return{description:"Cumulative exceedance energy by weekday and hour, showing where the reference limit hurt the most.",note:"Each cell shows cumulative exceedance kWh recorded in that weekday/hour slot over the selected period."};case"exceedance_frequency":return{description:"How often each weekday/hour slot went over the reference limit.",note:"Each cell shows the share of 15-minute intervals in that weekday/hour slot that exceeded the reference limit."}}}function Na(t,e){switch(t){case"house":case"grid":case"solar":return`${u(e,2)} kW average`;case"exceedance_kwh":return`${u(e,2)} kWh`;case"exceedance_frequency":return`${u(e,0)}% of intervals`}}function de(t){const e=t.series.filter(f=>f.values.length>0);if(!e.length)return'<div class="analysis-empty">No chart data available for this period.</div>';const a=Math.max(...e.map(f=>f.values.length)),s=Math.max(720,a*24+92),n=244,o=50,r=20,c=18,p=30,v=e.flatMap(f=>f.values);t.referenceValue!=null&&v.push(t.referenceValue);let d=t.minValue??ft(v,0),g=t.maxValue??se(v,1);d===g&&(g+=1,d=Math.min(0,d-1)),t.minValue==null&&(d=Math.min(0,d));const h=s-o-r,y=n-c-p,m=(f,x)=>x<=1?o+h/2:o+f*h/(x-1),$=f=>c+(g-f)/(g-d)*y,M=t.valueFormatter??(f=>u(f,1)),C=Array.from({length:4},(f,x)=>d+(g-d)/3*x),b=[0,Math.floor((a-1)/2),a-1].filter((f,x,L)=>L.indexOf(f)===x),_=C.map(f=>{const x=$(f);return`
      <line x1="${o}" y1="${x.toFixed(1)}" x2="${(s-r).toFixed(1)}" y2="${x.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(x+4).toFixed(1)}" class="analysis-svg-tick">${M(f)}</text>
    `}).join(""),S=t.referenceValue!=null?(()=>{const f=$(t.referenceValue);return`
        <line x1="${o}" y1="${f.toFixed(1)}" x2="${(s-r).toFixed(1)}" y2="${f.toFixed(1)}" class="analysis-svg-reference" />
        ${t.referenceLabel?`<text x="${s-r}" y="${(f-8).toFixed(1)}" class="analysis-svg-reference-label">${t.referenceLabel}</text>`:""}
      `})():"",i=e.map(f=>{const x=f.values.map((W,P)=>{const V=m(P,f.values.length),I=$(W);return`${P===0?"M":"L"} ${V.toFixed(1)} ${I.toFixed(1)}`}).join(" "),L=f.values.length<=40?f.values.map((W,P)=>{const V=m(P,f.values.length),I=$(W);return`<circle cx="${V.toFixed(1)}" cy="${I.toFixed(1)}" r="2.6" fill="${f.color}" />`}).join(""):"";return`
      <path d="${x}" fill="none" stroke="${f.color}" stroke-width="2.5" ${f.dashed?'stroke-dasharray="6 4"':""} />
      ${L}
    `}).join(""),l=b.map(f=>{const x=m(f,a),L=t.labels[f]??`Point ${f+1}`;return`<text x="${x.toFixed(1)}" y="${n-8}" text-anchor="middle" class="analysis-svg-x-label">${L}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${s}" height="${n}" viewBox="0 0 ${s} ${n}" role="img" aria-label="${t.title??"Line chart"}">
        ${_}
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
  `}function Ga(t){const e=t.series.filter(l=>l.band.median.length>0);if(!e.length)return'<div class="analysis-empty">No profile data available for this period.</div>';const a=Math.max(...e.map(l=>l.band.median.length)),s=Math.max(760,a*12+92),n=248,o=50,r=20,c=18,p=30,v=e.flatMap(l=>[...l.band.lower,...l.band.median,...l.band.upper]),d=Math.min(0,ft(v,0));let g=se(v,1);g<=d&&(g=d+1);const h=s-o-r,y=n-c-p,m=(l,f)=>f<=1?o+h/2:o+l*h/(f-1),$=l=>c+(g-l)/(g-d)*y,M=t.valueFormatter??(l=>u(l,1)),C=Array.from({length:4},(l,f)=>d+(g-d)/3*f),b=[0,16,32,48,64,80,a-1].filter((l,f,x)=>l>=0&&l<a&&x.indexOf(l)===f),_=C.map(l=>{const f=$(l);return`
      <line x1="${o}" y1="${f.toFixed(1)}" x2="${(s-r).toFixed(1)}" y2="${f.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(f+4).toFixed(1)}" class="analysis-svg-tick">${M(l)}</text>
    `}).join(""),S=e.map(l=>{const f=l.band.upper.map((W,P)=>{const V=m(P,l.band.upper.length),I=$(W);return`${P===0?"M":"L"} ${V.toFixed(1)} ${I.toFixed(1)}`}).join(" "),x=[...l.band.lower].reverse().map((W,P)=>{const V=l.band.lower.length-1-P,I=m(V,l.band.lower.length),q=$(W);return`L ${I.toFixed(1)} ${q.toFixed(1)}`}).join(" "),L=l.band.median.map((W,P)=>{const V=m(P,l.band.median.length),I=$(W);return`${P===0?"M":"L"} ${V.toFixed(1)} ${I.toFixed(1)}`}).join(" ");return`
      <path d="${f} ${x} Z" fill="${l.fill}" stroke="none" />
      <path d="${L}" fill="none" stroke="${l.color}" stroke-width="2.4" ${l.dashed?'stroke-dasharray="6 4"':""} />
    `}).join(""),i=b.map(l=>{const f=m(l,a),x=t.labels[l]??`Point ${l+1}`;return`<text x="${f.toFixed(1)}" y="${n-8}" text-anchor="middle" class="analysis-svg-x-label">${x}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${s}" height="${n}" viewBox="0 0 ${s} ${n}" role="img" aria-label="${t.title??"Band chart"}">
        ${_}
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
  `}function Oa(t){const e=new Date(t.timestamp);return{date:e.toLocaleDateString(void 0,{month:"short",day:"numeric"}),time:e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}}function Ua(t){if(!t.length)return'<div class="analysis-empty">No peak intervals available for this period.</div>';const e=Math.max(760,t.length*86+96),a=276,s=52,n=16,o=18,r=54,c=se(t.map($=>$.houseKw),1),p=e-s-n,v=a-o-r,d=o+v,g=p/t.length,h=Math.max(22,Math.min(38,g*.54)),y=t.map(($,M)=>{const C=s+M*g+(g-h)/2,b=$.solarToHomeKw/c*v,S=Math.max(0,Math.min($.gridKw,$.referenceKw))/c*v,i=Math.max(0,$.gridKw-$.referenceKw)/c*v;return`
      <g>
        <rect x="${C.toFixed(1)}" y="${(d-b).toFixed(1)}" width="${h.toFixed(1)}" height="${b.toFixed(1)}" rx="4" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${C.toFixed(1)}" y="${(d-b-S).toFixed(1)}" width="${h.toFixed(1)}" height="${S.toFixed(1)}" rx="4" fill="rgba(248, 81, 73, 0.62)" />
        ${i>0?`<rect x="${C.toFixed(1)}" y="${(d-b-S-i).toFixed(1)}" width="${h.toFixed(1)}" height="${i.toFixed(1)}" rx="4" fill="rgba(210, 153, 34, 0.92)" />`:""}
      </g>
    `}).join(""),m=t.map(($,M)=>{const C=s+M*g+g/2,{date:b,time:_}=Oa($);return`
      <text x="${C.toFixed(1)}" y="${a-20}" text-anchor="middle" class="analysis-svg-x-label">
        <tspan x="${C.toFixed(1)}" dy="0">${b}</tspan>
        <tspan x="${C.toFixed(1)}" dy="12">${_}</tspan>
      </text>
    `}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${a}" viewBox="0 0 ${e} ${a}" role="img" aria-label="Peak interval anatomy">
        <line x1="${s}" y1="${d.toFixed(1)}" x2="${(e-n).toFixed(1)}" y2="${d.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${s-8}" y="${(o+4).toFixed(1)}" class="analysis-svg-tick">${u(c,1)} kW</text>
        ${y}
        ${m}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.62);"></span><span>Grid within reference</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(210, 153, 34, 0.92);"></span><span>Grid over reference</span></span>
    </div>
  `}function Ba(t){if(!t.length)return'<div class="analysis-empty">No daily energy data available.</div>';const e=Math.max(760,t.length*28+84),a=250,s=52,n=16,o=18,r=34,c=se(t.map(_=>_.houseKwh),1),p=se(t.map(_=>_.exportKwh),0),v=e-s-n,d=a-o-r,g=p>0?d*.72:d,h=p>0?d-g:0,y=o+g,m=v/t.length,$=Math.max(8,Math.min(18,m*.62)),M=Math.max(1,Math.ceil(t.length/10)),C=t.map((_,S)=>{const i=s+S*m+(m-$)/2,l=_.solarToHomeKwh/c*g,f=_.gridKwh/c*g,x=p>0?_.exportKwh/p*h:0,L=y-l-f-8;return`
      <g>
        <rect x="${i.toFixed(1)}" y="${(y-l).toFixed(1)}" width="${$.toFixed(1)}" height="${l.toFixed(1)}" rx="3" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${i.toFixed(1)}" y="${(y-l-f).toFixed(1)}" width="${$.toFixed(1)}" height="${f.toFixed(1)}" rx="3" fill="rgba(248, 81, 73, 0.55)" />
        ${x>0?`<rect x="${i.toFixed(1)}" y="${y.toFixed(1)}" width="${$.toFixed(1)}" height="${x.toFixed(1)}" rx="3" fill="rgba(88, 166, 255, 0.75)" />`:""}
        ${_.exceedanceKwh>0?`<circle cx="${(i+$/2).toFixed(1)}" cy="${L.toFixed(1)}" r="3.2" fill="#d29922" />`:""}
      </g>
    `}).join(""),b=t.map((_,S)=>S%M!==0&&S!==t.length-1?"":`<text x="${(s+S*m+m/2).toFixed(1)}" y="${a-10}" text-anchor="middle" class="analysis-svg-x-label">${_.label}</text>`).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${a}" viewBox="0 0 ${e} ${a}" role="img" aria-label="Daily energy breakdown">
        <line x1="${s}" y1="${y.toFixed(1)}" x2="${(e-n).toFixed(1)}" y2="${y.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${s-8}" y="${(o+4).toFixed(1)}" class="analysis-svg-tick">${u(c,0)} kWh</text>
        ${p>0?`<text x="${s-8}" y="${(a-r+4).toFixed(1)}" class="analysis-svg-tick">-${u(p,0)} kWh</text>`:""}
        ${C}
        ${b}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.55);"></span><span>From grid</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span><span>Exported</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:#d29922;"></span><span>Exceedance on that day</span></span>
    </div>
  `}function qa(t,e){const a=fe(e,0,1);return t==="solar"?`rgba(63, 185, 80, ${.12+a*.82})`:t==="exceedance_kwh"||t==="exceedance_frequency"?`rgba(210, 153, 34, ${.14+a*.82})`:t==="grid"?`rgba(210, 153, 34, ${.12+a*.82})`:`rgba(248, 81, 73, ${.12+a*.82})`}function Ya(t,e){const a=t.flat(),s=se(a,1),n=ft(a,0);return`
    <div class="analysis-heatmap">
      <div class="analysis-heatmap-hours">
        <span class="analysis-heatmap-corner"></span>
        ${Array.from({length:24},(o,r)=>`
          <span class="analysis-heatmap-hour ${r%2===1?"analysis-heatmap-hour-faded":""}">${String(r).padStart(2,"0")}</span>
        `).join("")}
      </div>
      ${t.map((o,r)=>`
        <div class="analysis-heatmap-row">
          <span class="analysis-heatmap-day">${St[r]}</span>
          ${o.map((c,p)=>{const v=s===n?0:(c-n)/(s-n);return`
              <span
                class="analysis-heatmap-cell"
                style="background:${qa(e,v)};"
                title="${St[r]} ${String(p).padStart(2,"0")}:00 - ${Na(e,c)}"
              >${c>(e==="exceedance_frequency"?1:.05)?u(c,e==="exceedance_frequency"?0:1):""}</span>
            `}).join("")}
        </div>
      `).join("")}
    </div>
  `}function et(t){const e=se(t.map(a=>a.value),1);return t.length?`
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
  `:'<div class="analysis-empty">No standout patterns in this period.</div>'}function ja(t){var s,n,o,r;const e=Tt(((s=t.rangeData)==null?void 0:s.start)??t.customStart),a=Tt(((n=t.rangeData)==null?void 0:n.end)??t.customEnd);return`
    <div class="range-selector">
      ${Ne.map(c=>`
        <button
          class="range-btn ${c.id===t.range?"active":""}"
          data-range="${c.id}"
        >${c.label}</button>
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
  `}function za(t,e,a){const s=a.communitySolarToHomeKwh>.01?`${u(a.totalSolarCoverageKwh)} kWh of ${u(a.consumptionKwh)} kWh usage covered, incl. ${u(a.communitySolarToHomeKwh)} kWh shared`:`${u(a.totalSolarCoverageKwh)} kWh of ${u(a.consumptionKwh)} kWh usage covered`;return`
    <div class="analysis-stat-grid">
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Solar Coverage</span>
        <strong class="analysis-stat-value">${u(a.coveragePct,1)}%</strong>
        <span class="analysis-stat-meta">${s}</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Consumed Solar</span>
        <strong class="analysis-stat-value">${u(a.selfConsumedPct,1)}%</strong>
        <span class="analysis-stat-meta">${u(a.directSolarToHomeKwh)} kWh kept from your own solar, ${u(a.exportedKwh)} kWh exported</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Total Solar Value</span>
        <strong class="analysis-stat-value">${N(a.totalSolarValue,e)}</strong>
        <span class="analysis-stat-meta">Savings plus export revenue plus avoided exceedance charges</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Use vs Export</span>
        <strong class="analysis-stat-value">${Qe(a.selfConsumptionAdvantage,e)}</strong>
        <span class="analysis-stat-meta">${u(a.directSolarToHomeKwh)} kWh kept on-site instead of exported</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Peak Net Grid</span>
        <strong class="analysis-stat-value">${u(t.totals.peakGridKw,2)} kW</strong>
        <span class="analysis-stat-meta">Compared with ${u(t.totals.peakHouseKw,2)} kW gross house load</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Exceedance Intervals</span>
        <strong class="analysis-stat-value">${u(t.totals.exceedanceIntervals,0)}</strong>
        <span class="analysis-stat-meta">${u(t.totals.exceedanceKwh,2)} kWh above the reference limit</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Variable Import Cost</span>
        <strong class="analysis-stat-value">${N(a.variableImportCost,e)}</strong>
        <span class="analysis-stat-meta">${u(a.billedGridImportKwh)} kWh billed from the grid during the selected period</span>
      </div>
    </div>
  `}function Xa(t){return`
    <div class="card analysis-card analysis-card-full">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Daily Breakdown</h3>
          <p class="analysis-card-copy">House usage is split into solar-covered energy, grid energy, and exported surplus. A gold marker flags days with any reference-power exceedance.</p>
        </div>
      </div>
      ${Ba(t.daily)}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily exceedance volume</h4>
        ${de({title:"Daily exceedance volume",series:[{label:"Exceedance",color:"#d29922",values:t.daily.map(e=>e.exceedanceKwh)}],labels:t.daily.map(e=>e.label),valueFormatter:e=>`${u(e,2)} kWh`})}
      </div>
    </div>
  `}function Za(t,e){const a=Ha(t.analysisHeatmapMetric);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Consumption Pattern Heatmap</h3>
          <p class="analysis-card-copy">${a.description}</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${t.analysisHeatmapMetric==="house"?"active":""}" data-analysis-heatmap="house">${Ve.house}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="grid"?"active":""}" data-analysis-heatmap="grid">${Ve.grid}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="solar"?"active":""}" data-analysis-heatmap="solar">${Ve.solar}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="exceedance_kwh"?"active":""}" data-analysis-heatmap="exceedance_kwh">${Ve.exceedance_kwh}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="exceedance_frequency"?"active":""}" data-analysis-heatmap="exceedance_frequency">${Ve.exceedance_frequency}</button>
        </div>
      </div>
      ${Ya(e.heatmapValues[t.analysisHeatmapMetric],t.analysisHeatmapMetric)}
      <p class="analysis-note">${a.note}</p>
    </div>
  `}function Ja(t,e){const a=t.analysisProfileMetric,s=e.intradayProfiles[a],n=je[a],o=s.weekday.median.reduce((c,p,v,d)=>p>d[c]?v:c,0),r=s.weekend.median.reduce((c,p,v,d)=>p>d[c]?v:c,0);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Intraday Profile</h3>
          <p class="analysis-card-copy">A typical day view for ${n.toLowerCase()}, split between weekdays and weekends. The band shows the p10 to p90 range and the line is the median interval.</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${a==="house"?"active":""}" data-analysis-profile="house">${je.house}</button>
          <button class="unit-btn ${a==="grid"?"active":""}" data-analysis-profile="grid">${je.grid}</button>
          <button class="unit-btn ${a==="solar"?"active":""}" data-analysis-profile="solar">${je.solar}</button>
        </div>
      </div>
      <div class="analysis-inline-metrics">
        <div>
          <span class="analysis-inline-label">Weekday median peak</span>
          <strong>${u(s.weekday.median[o]??0,2)} kW</strong>
          <span class="analysis-stat-meta">${e.intradayLabels[o]??"n/a"}</span>
        </div>
        <div>
          <span class="analysis-inline-label">Weekend median peak</span>
          <strong>${u(s.weekend.median[r]??0,2)} kW</strong>
          <span class="analysis-stat-meta">${e.intradayLabels[r]??"n/a"}</span>
        </div>
      </div>
      ${Ga({title:`${n} intraday profile`,labels:e.intradayLabels,series:[{label:"Weekday median (p10-p90 band)",color:"#58a6ff",fill:"rgba(88, 166, 255, 0.14)",band:s.weekday},{label:"Weekend median (p10-p90 band)",color:"#d29922",fill:"rgba(210, 153, 34, 0.13)",band:s.weekend,dashed:!0}],valueFormatter:c=>`${u(c,1)} kW`})}
      <p class="analysis-note">This makes the typical daily rhythm much easier to read than the weekday/hour heatmap alone.</p>
    </div>
  `}function Qa(t,e){const a=t.totals.solarKwh>0?fe(t.totals.solarToHomeKwh/t.totals.solarKwh*100,0,100):0,s=t.totals.solarKwh>0?fe(t.totals.exportKwh/t.totals.solarKwh*100,0,100):0;return`
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
          <strong>${u(t.totals.coveragePct,1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-consumed solar</span>
          <strong>${u(t.totals.selfConsumedPct,1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Solar value</span>
          <strong>${N(t.totals.solarValue,e)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-use vs export</span>
          <strong>${Qe(t.totals.selfConsumptionAdvantage,e)}</strong>
        </div>
      </div>
      <div class="analysis-share-bar">
        <span class="analysis-share-segment analysis-share-segment-home" style="width:${a}%;"></span>
        <span class="analysis-share-segment analysis-share-segment-export" style="width:${s}%;"></span>
      </div>
      <div class="analysis-share-legend">
        <span><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span>Self-consumed: ${u(t.totals.solarToHomeKwh)} kWh</span>
        <span><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span>Exported: ${u(t.totals.exportKwh)} kWh</span>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Coverage of house usage by day</h4>
        ${de({title:"Daily solar coverage",series:[{label:"Coverage",color:"#3fb950",values:t.daily.map(n=>n.coveragePct)}],labels:t.daily.map(n=>n.label),maxValue:100,minValue:0,valueFormatter:n=>`${u(n,0)}%`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day</h4>
        ${de({title:"Daily solar value",series:[{label:"Solar value",color:"#58a6ff",values:t.daily.map(n=>n.solarValue)}],labels:t.daily.map(n=>n.label),valueFormatter:n=>N(n,e)})}
      </div>
    </div>
  `}function es(t,e){const a=[...t.hourlyOpportunity].sort((r,c)=>c.importCost-r.importCost)[0],s=[...t.hourlyOpportunity].sort((r,c)=>c.exportSpreadValue-r.exportSpreadValue)[0],n=[...t.hourlyOpportunity].filter(r=>r.importCost>0).sort((r,c)=>c.importCost-r.importCost).slice(0,5).map(r=>({label:r.label,value:r.importCost,meta:`${N(r.importCost,e)} from ${u(r.gridKwh,1)} kWh`})),o=[...t.hourlyOpportunity].filter(r=>r.exportSpreadValue>0).sort((r,c)=>c.exportSpreadValue-r.exportSpreadValue).slice(0,5).map(r=>({label:r.label,value:r.exportSpreadValue,meta:`${N(r.exportSpreadValue,e)} on ${u(r.exportKwh,1)} kWh`,colorClass:"analysis-progress-fill-warn"}));return`
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
          <strong>${N(t.hourlyOpportunity.reduce((r,c)=>r+c.importCost,0),e)}</strong>
          <span class="analysis-stat-meta">Variable import cost grouped by hour of day</span>
        </div>
        <div>
          <span class="analysis-inline-label">Export spread opportunity</span>
          <strong>${N(t.hourlyOpportunity.reduce((r,c)=>r+c.exportSpreadValue,0),e)}</strong>
          <span class="analysis-stat-meta">Approximate value gap between export and local use</span>
        </div>
        <div>
          <span class="analysis-inline-label">Hardest import hour</span>
          <strong>${(a==null?void 0:a.label)??"n/a"}</strong>
          <span class="analysis-stat-meta">${a?N(a.importCost,e):"No import cost recorded"}</span>
        </div>
        <div>
          <span class="analysis-inline-label">Best storage hour</span>
          <strong>${(s==null?void 0:s.label)??"n/a"}</strong>
          <span class="analysis-stat-meta">${s?N(s.exportSpreadValue,e):"No export spread recorded"}</span>
        </div>
      </div>
      ${de({title:"Hourly tariff opportunity",series:[{label:"Import cost pressure",color:"#f85149",values:t.hourlyOpportunity.map(r=>r.importCost)},{label:"Export spread opportunity",color:"#58a6ff",values:t.hourlyOpportunity.map(r=>r.exportSpreadValue)}],labels:t.hourlyOpportunity.map(r=>r.label),valueFormatter:r=>N(r,e)})}
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Most expensive import hours</h4>
          ${et(n)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Best export-to-storage hours</h4>
          ${et(o)}
        </div>
      </div>
      <p class="analysis-note">Export spread opportunity uses the difference between the import rate and feed-in rate for exported energy in that hour, so it is a directional indicator rather than a billing line item.</p>
    </div>
  `}function ts(t,e){const a=t.hourlyExceedanceKwh.map((s,n)=>({label:`${String(n).padStart(2,"0")}:00`,value:s,meta:`${u(s,2)} kWh`,colorClass:"analysis-progress-fill-warn"})).filter(s=>s.value>0).sort((s,n)=>n.value-s.value).slice(0,6);return`
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
          <strong>${u(t.totals.exceedanceIntervals,0)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Total exceedance</span>
          <strong>${u(t.totals.exceedanceKwh,2)} kWh</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Peak over reference</span>
          <strong>${u(se(t.topExceedances.map(s=>s.overKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Exceedance cost</span>
          <strong>${N(t.totals.exceedanceCost,e)}</strong>
        </div>
      </div>
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Worst hours</h4>
          ${et(a)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Worst days</h4>
          ${et(t.worstDays.map(s=>({label:s.fullDate,value:s.exceedanceKwh,meta:`${u(s.exceedanceKwh,2)} kWh`,colorClass:"analysis-progress-fill-warn"})))}
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
                      <td>${Ut(s.iso)}</td>
                      <td>${u(s.gridKw,2)} kW</td>
                      <td>${u(s.referenceKw,2)} kW</td>
                      <td>${u(s.overKw,2)} kW</td>
                      <td>${u(s.solarKw,2)} kW</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `:'<div class="analysis-empty">No reference exceedance was recorded in this period.</div>'}
      </div>
    </div>
  `}function as(t){const e=t.peakIntervals.length?t.peakIntervals.reduce((a,s)=>a+(s.houseKw>0?s.solarToHomeKw/s.houseKw*100:0),0)/t.peakIntervals.length:0;return`
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
          <strong>${u(se(t.peakIntervals.map(a=>a.houseKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Highest net-grid peak</span>
          <strong>${u(se(t.peakIntervals.map(a=>a.gridKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Solar share across peaks</span>
          <strong>${u(e,0)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Intervals over reference</span>
          <strong>${u(t.peakIntervals.filter(a=>a.overKw>0).length,0)} / ${u(t.peakIntervals.length,0)}</strong>
        </div>
      </div>
      ${Ua(t.peakIntervals)}
      <p class="analysis-note">A gold cap only appears when the grid portion of the interval exceeded the configured reference power.</p>
    </div>
  `}function ss(t,e,a){var p,v;const s=e.analysisComparisonMode==="last_year"?"Last year":"Previous";if(e.analysisComparisonLoading)return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${Dt(e)}</p>
          </div>
          <div class="chart-unit-toggle">
            <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${Fe.previous}</button>
            <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${Fe.last_year}</button>
          </div>
        </div>
        <div class="analysis-empty">Loading comparison period...</div>
      </div>
    `;if(!((p=e.analysisComparison)!=null&&p.consumptionTimeseries)||!((v=e.analysisComparison)!=null&&v.productionTimeseries))return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${e.analysisComparisonMode==="last_year"?"The same calendar period last year is shown here when enough history is available.":"A matched previous period is shown here when enough historic data is available."}</p>
          </div>
          <div class="chart-unit-toggle">
            <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${Fe.previous}</button>
            <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${Fe.last_year}</button>
          </div>
        </div>
        <div class="analysis-empty">Comparison data is unavailable for the selected range.</div>
      </div>
    `;const n=jt(a,e.analysisComparison.consumptionTimeseries,null,void 0,void 0),o=zt(e.analysisComparison.consumptionTimeseries,e.analysisComparison.productionTimeseries,e.analysisComparison.gridImportTimeseries,e.analysisComparison.marketExportTimeseries,a,n),r=Math.max(t.daily.length,o.daily.length,1),c=Array.from({length:r},(d,g)=>`D${g+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Period Comparison</h3>
          <p class="analysis-card-copy">${Dt(e)}</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${Fe.previous}</button>
          <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${Fe.last_year}</button>
        </div>
      </div>
      <div class="analysis-compare-grid">
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">House usage</span>
          <strong>${u(t.totals.houseKwh)} kWh</strong>
          <span class="analysis-compare-delta">${ze(t.totals.houseKwh-o.totals.houseKwh)} kWh vs ${s.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Net grid usage</span>
          <strong>${u(t.totals.gridKwh)} kWh</strong>
          <span class="analysis-compare-delta">${ze(t.totals.gridKwh-o.totals.gridKwh)} kWh vs ${s.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar coverage</span>
          <strong>${u(t.totals.coveragePct,1)}%</strong>
          <span class="analysis-compare-delta">${ze(t.totals.coveragePct-o.totals.coveragePct)} pts vs ${s.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar value</span>
          <strong>${N(t.totals.solarValue,a.currency||"EUR")}</strong>
          <span class="analysis-compare-delta">${ze(t.totals.solarValue-o.totals.solarValue,2)} ${a.currency||"EUR"} vs ${s.toLowerCase()}</span>
        </div>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Usage by day index</h4>
        ${de({title:`Current versus ${s.toLowerCase()} usage`,series:[{label:"Current",color:"#f85149",values:t.daily.map(d=>d.houseKwh)},{label:s,color:"#58a6ff",values:o.daily.map(d=>d.houseKwh),dashed:!0}],labels:c,valueFormatter:d=>`${u(d,1)} kWh`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day index</h4>
        ${de({title:`Current versus ${s.toLowerCase()} solar value`,series:[{label:"Current",color:"#3fb950",values:t.daily.map(d=>d.solarValue)},{label:s,color:"#d29922",values:o.daily.map(d=>d.solarValue),dashed:!0}],labels:c,valueFormatter:d=>N(d,a.currency||"EUR")})}
      </div>
    </div>
  `}function rs(t,e){return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Tariff-Aware Cost Trends</h3>
          <p class="analysis-card-copy">Estimated variable import cost, solar savings, export earnings, and exceedance cost by day. Fixed monthly fees are intentionally left out so this stays behavior-driven.</p>
        </div>
      </div>
      ${de({title:"Daily cost and value trends",series:[{label:"Import cost",color:"#f85149",values:t.daily.map(a=>a.importCost)},{label:"Solar savings",color:"#3fb950",values:t.daily.map(a=>a.solarSavings)},{label:"Export earnings",color:"#58a6ff",values:t.daily.map(a=>a.exportRevenue)},{label:"Exceedance cost",color:"#d29922",values:t.daily.map(a=>a.exceedanceCost)}],labels:t.daily.map(a=>a.label),valueFormatter:a=>N(a,e)})}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily net energy value</h4>
        ${de({title:"Daily net energy value",series:[{label:"Net value",color:"#39c5cf",values:t.daily.map(a=>a.netValue)}],labels:t.daily.map(a=>a.label),referenceValue:0,referenceLabel:"Break-even",valueFormatter:a=>Qe(a,e)})}
      </div>
      <div class="analysis-cost-totals">
        <span>Import cost: <strong>${N(t.totals.importCost,e)}</strong></span>
        <span>Solar savings: <strong>${N(t.totals.solarSavings,e)}</strong></span>
        <span>Export earnings: <strong>${N(t.totals.exportRevenue,e)}</strong></span>
        <span>Exceedance cost: <strong>${N(t.totals.exceedanceCost,e)}</strong></span>
        <span>Net value: <strong>${Qe(t.totals.netValue,e)}</strong></span>
      </div>
    </div>
  `}function ns(t,e){const a=Array.from({length:Math.max(t.loadDurationGrossKw.length,t.loadDurationNetKw.length,1)},(s,n)=>`${n+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Load Duration Curve</h3>
          <p class="analysis-card-copy">Gross house load and net grid load sorted from highest to lowest interval. This shows how often high demand really occurs and how much solar trims the top end.</p>
        </div>
      </div>
      ${de({title:"Load duration curve",series:[{label:"Gross house load",color:"#f85149",values:t.loadDurationGrossKw},{label:"Net grid load",color:"#58a6ff",values:t.loadDurationNetKw}],labels:a,referenceValue:e>0?e:void 0,referenceLabel:e>0?`Reference ${u(e,1)} kW`:void 0,valueFormatter:s=>`${u(s,1)} kW`})}
      <p class="analysis-note">Intervals are ordered from highest demand to lowest, so the left side is your hardest-to-handle load.</p>
    </div>
  `}function os(t){var i,l;const e=t.config,a=t.rangeData,s=t.consumptionTimeseries,n=t.productionTimeseries;if(!e||!a||!s||!n)return`
      <section class="analysis-view">
        <div class="card">
          <p class="muted">Loading analysis data...</p>
        </div>
      </section>
    `;const o=Math.max(0,a.consumption??0),r=Math.max(0,a.production??0),c=Math.max(0,a.exported??0),p=Math.max(0,a.direct_solar_to_home??(a.self_consumed&&a.self_consumed>0?a.self_consumed:0)),v=Math.max(0,(a.grid_import!=null?o-a.grid_import:void 0)??a.solar_to_home??p??(a.self_consumed&&a.self_consumed>0?a.self_consumed:r-c)),d=Math.max(0,a.grid_import??o-v),g=Math.max(0,v-p),h=yt(e,s,((i=t.perMeterProductionTimeseries)==null?void 0:i.meters)??null,p,c),y=jt(e,s,((l=t.perMeterProductionTimeseries)==null?void 0:l.meters)??null,p,c),m=zt(s,n,t.gridImportTimeseries,t.marketExportTimeseries,e,y),$=e.currency||"EUR",M=((e.energy_variable_rate??0)+(e.network_variable_rate??0)+(e.electricity_tax_rate??0)+(e.compensation_fund_rate??0))*(1+(e.vat_rate??0)),C=p*M,b=h?h.totalSelfUseExportEquivalent:p*y,_=h?h.totalFeedInRevenue:c*y,S={consumptionKwh:o,totalSolarCoverageKwh:v,directSolarToHomeKwh:p,communitySolarToHomeKwh:g,exportedKwh:c,billedGridImportKwh:d,coveragePct:o>0?fe(v/o*100,0,100):0,selfConsumedPct:r>0?fe(p/r*100,0,100):0,totalSolarValue:C+m.totals.avoidedExceedanceValue+_,selfConsumptionAdvantage:C-b,variableImportCost:d*M};return`
    <section class="analysis-view">
      <div class="section-header analysis-section-header">
        <div>
          <span class="badge">Analysis</span>
          <h2>Charts and Optimization</h2>
          <p class="muted">Deeper electricity analysis for ${Ia(t)}. This page is built from the same 15-minute data and billing settings that drive the dashboard and invoice.</p>
        </div>
        <div class="analysis-header-meta">
          <span>${Aa(t)}</span>
          <span>${u(m.daily.length,0)} day${m.daily.length===1?"":"s"} analysed</span>
        </div>
      </div>

      ${ja(t)}
      ${za(m,$,S)}
      ${Xa(m)}

      <div class="analysis-grid">
        ${Ja(t,m)}
        ${Za(t,m)}
      </div>

      <div class="analysis-grid">
        ${Qa(m,$)}
        ${es(m,$)}
      </div>

      <div class="analysis-grid">
        ${ts(m,$)}
        ${ss(m,t,e)}
      </div>

      <div class="analysis-grid">
        ${rs(m,$)}
        ${ns(m,e.reference_power_kw??0)}
      </div>

      ${as(m)}
    </section>
  `}const Ft={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function is(t){return Ft[t]?Ft[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function ls(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],a=[],s=[],n=[],o=[];for(const c of t.sensors){const p=c.key;p.startsWith("c_")||p==="1-1:1.29.0"||p==="1-1:3.29.0"?e.push(c):p.startsWith("p_")||p==="1-1:2.29.0"||p==="1-1:4.29.0"?a.push(c):p.startsWith("s_")||p.startsWith("1-65:")?s.push(c):p.startsWith("g_")||p.startsWith("7-")?n.push(c):o.push(c)}const r=(c,p,v,d)=>v.length?`
      <div class="card sensor-group">
        <h3 class="card-title"><span class="title-icon">${p}</span> ${c} <span class="badge">${v.length}</span></h3>
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
              ${v.map(g=>`
                <tr>
                  <td class="sensor-name">${is(g.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${d});">${u(g.value)}</td>
                  <td class="sensor-unit">${g.unit}</td>
                  <td class="sensor-peak">${g.peak_timestamp?Ut(g.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
      ${r("Gas","🔥",n,"gas")}
      ${r("Other","📊",o,"text")}
    </section>
  `}const Wt=[{kw:3,fixedMonthlyFee:7.42},{kw:7,fixedMonthlyFee:12.84},{kw:12,fixedMonthlyFee:19.61},{kw:17,fixedMonthlyFee:26.39},{kw:27,fixedMonthlyFee:39.94},{kw:43,fixedMonthlyFee:61.62},{kw:70,fixedMonthlyFee:98.2},{kw:100,fixedMonthlyFee:138.85},{kw:150,fixedMonthlyFee:206.6,existingContractsOnly:!0},{kw:200,fixedMonthlyFee:274.35,existingContractsOnly:!0}];function Xe(t){if(!t)return null;const e=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(e){const[,s,n,o]=e;return new Date(Number(s),Number(n)-1,Number(o))}const a=new Date(t);return Number.isNaN(a.getTime())?null:new Date(a.getFullYear(),a.getMonth(),a.getDate())}function Lt(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function cs(t,e,a,s,n){const o=new Date,r=Xe(s),c=Xe(n);let p=r,v=c;if(!p||!v)switch(t){case"yesterday":{const m=new Date(o);m.setDate(m.getDate()-1),p=new Date(m.getFullYear(),m.getMonth(),m.getDate()),v=new Date(p);break}case"this_week":{const m=new Date(o),$=m.getDay()||7;p=new Date(m.getFullYear(),m.getMonth(),m.getDate()-$+1),v=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_week":{const m=new Date(o),$=m.getDay()||7,M=new Date(m.getFullYear(),m.getMonth(),m.getDate()-$+1);p=new Date(M.getFullYear(),M.getMonth(),M.getDate()-7),v=new Date(M.getFullYear(),M.getMonth(),M.getDate()-1);break}case"this_month":{p=new Date(o.getFullYear(),o.getMonth(),1),v=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_month":{p=new Date(o.getFullYear(),o.getMonth()-1,1),v=new Date(o.getFullYear(),o.getMonth(),0);break}case"this_year":{p=new Date(o.getFullYear(),0,1),v=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_year":{p=new Date(o.getFullYear()-1,0,1),v=new Date(o.getFullYear()-1,11,31);break}case"custom":{p=Xe(e)??new Date(o.getFullYear(),o.getMonth(),o.getDate()),v=Xe(a)??new Date(p);break}default:{p=new Date(o.getFullYear(),o.getMonth(),o.getDate()-1),v=new Date(p);break}}if(v<p){const m=p;p=v,v=m}let d=0,g=0;const h=new Date(p);for(;h<=v;){const m=new Date(h.getFullYear(),h.getMonth()+1,0).getDate();g+=1/m,d+=1,h.setDate(h.getDate()+1)}const y=p.getFullYear()===v.getFullYear()&&p.getMonth()===v.getMonth()&&p.getDate()===1&&v.getDate()===new Date(v.getFullYear(),v.getMonth()+1,0).getDate();return{days:d,factor:g,label:y?"full month":`${d} day${d===1?"":"s"}`}}function ds(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function Pt(t){const[e,a]=t.split(":").map(s=>parseInt(s,10)||0);return e*60+a}function Xt(t,e,a,s){if(!ds(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),o=Pt(a),r=Pt(s);return o===r?!0:o<r?n>=o&&n<r:n>=o||n<r}function ps(t,e){return e.find(a=>Xt(t,a.day_group,a.start_time,a.end_time))}function us(t,e){return e.find(a=>Xt(t,a.day_group,a.start_time,a.end_time))}function Kt(t,e,a,s,n,o=[]){var y;const r=new Map;let c=0,p=0,v=0,d=0,g=0;const h=new Map;for(const m of o){const $=Number(m.value)||0;h.set(m.startedAt,(h.get(m.startedAt)??0)+$)}for(const m of t){const $=Number(m.value)||0,M=$*.25,C=h.get(m.startedAt)??0,b=Math.max(0,$-C),_=new Date(m.startedAt);if(Number.isNaN(_.getTime()))continue;const S=ps(_,s),i=us(_,n),l=(S==null?void 0:S.rate)??e,f=((y=S==null?void 0:S.label)==null?void 0:y.trim())||"Base tariff",x=(i==null?void 0:i.reference_power_kw)??a;c+=M*l,g=Math.max(g,$),d=Math.max(d,b),$>x&&(v+=($-x)*.25),b>x&&(p+=(b-x)*.25);const L=`${f}__${l}`,W=r.get(L);W?W.kwh+=M:r.set(L,{label:f,rate:l,kwh:M})}return{energyCost:c,exceedanceKwh:p,grossExceedanceKwh:v,avoidedExceedanceKwh:Math.max(0,v-p),peakPowerKw:d,grossPeakPowerKw:g,rateBreakdown:Array.from(r.values()).sort((m,$)=>m.label.localeCompare($.label))}}function hs(t){var $t,bt;const e=t.config,a=t.rangeData;if(!e||!a)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const s=a.consumption||0,n=a.production||0,o=a.exported||0,r=Math.max(0,o),c=Math.max(0,(a.grid_import!=null?s-a.grid_import:void 0)??a.solar_to_home??a.direct_solar_to_home??(a.self_consumed&&a.self_consumed>0?a.self_consumed:n-r)),p=Math.min(c,Math.max(0,a.direct_solar_to_home??(a.self_consumed&&a.self_consumed>0?a.self_consumed:n-r))),v=Math.max(0,c-p),d=Math.max(0,a.grid_import??s-c),g=a.peak_power_kw||0,h=e.reference_power_kw||5,y=a.exceedance_kwh||0,m=a.gas_energy||0,$=a.gas_volume||0,M=m>0||$>0,C=e.consumption_rate_windows??[],b=e.reference_power_windows??[],_=t.consumptionTimeseries?Kt(t.consumptionTimeseries.items,e.energy_variable_rate,h,C,b,(($t=t.productionTimeseries)==null?void 0:$t.items)??[]):null,S=C.length>0&&!!_&&Math.abs(d-s)<.01,i=b.length>0&&!!_,l=_?_.peakPowerKw:g,f=_?_.exceedanceKwh:y,x=Lt(a.start??t.customStart),L=Lt(a.end??t.customEnd),{days:W,factor:P,label:V}=cs(t.range,t.customStart,t.customEnd,a.start,a.end),I=e.energy_fixed_fee*P,q=e.network_metering_rate*P,ee=e.network_power_ref_rate*P,j=S?_.energyCost:d*e.energy_variable_rate,re=d*e.network_variable_rate,O=f*e.exceedance_rate,ne=e.meter_monthly_fees??[],pe=ne.reduce((w,A)=>w+(A.fee||0),0)*P,oe=d*e.compensation_fund_rate,ue=d*e.electricity_tax_rate,U=Math.max(0,e.connect_discount??0)*P,K=I+j+q+ee+re+O+pe+oe+ue-U,he=K*e.vat_rate,te=K+he,Q=vt(e),z=yt(e,t.consumptionTimeseries,((bt=t.perMeterProductionTimeseries)==null?void 0:bt.meters)??null,p,r),we=Q.filter(w=>isFinite(w.rate)&&w.rate>0),X=Q.length>1,Se=z?z.weightedExportRate:we.length>0?we.reduce((w,A)=>w+A.rate,0)/we.length:e.feed_in_tariff,Y=z?z.totalFeedInRevenue:r*Se,Le=X&&Q.length>0?r/Q.length:r,Te=z?z.meters:Q.map(w=>({...w,producedKwh:0,exportedKwh:Le,revenue:Le*w.rate,selfConsumedKwh:0,exportEquivalentForSelfUse:0})),$e=!!z,Z=p,Ge=e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate,tt=Ge*(1+e.vat_rate),at=Z*Ge,Oe=at*e.vat_rate,me=at+Oe,Ue=z?z.totalSelfUseExportEquivalent:Z*Se,Pe=me-Ue,ge=Math.max(0,(_==null?void 0:_.avoidedExceedanceKwh)??0),Ee=ge*e.exceedance_rate,Ke=Ee*e.vat_rate,ve=Ee+Ke,be=ge>1e-4,_e=me+ve+Y,k=Te.map(w=>{const A=w.selfConsumedKwh*tt,Me=A-w.exportEquivalentForSelfUse;return{...w,selfUseSavings:A,selfUseVsExport:Me,totalTrackedValue:A+w.revenue}}),E=$e&&k.length>0,D=te-Y,H=(e.gas_fixed_fee??6.5)*P,B=m*(e.gas_variable_rate??.055),xe=(e.gas_network_fee??4.8)*P,ae=m*(e.gas_network_variable_rate??.012),ie=m*(e.gas_tax_rate??.001),ke=H+B+xe+ae+ie,st=ke*(e.gas_vat_rate??.08),rt=ke+st,R=e.currency||"EUR",T=w=>`${u(w,2)} ${R}`,nt=w=>`${w>0?"+":w<0?"-":""}${u(Math.abs(w),2)} ${R}`,F=w=>u(w,3),wt=w=>u(w,3),ta=w=>w>=0?"comparison-delta-savings":"comparison-delta-extra",aa=E?`
            <tr class="section-label"><td colspan="3">Per-System Self-Use vs Export</td></tr>
            ${k.map(w=>`
            <tr>
              <td>${w.shortId}</td>
              <td style="text-align: right;">
                Produced ${F(w.producedKwh)} kWh<br/>
                Kept on-site ${F(w.selfConsumedKwh)} kWh<br/>
                Sold ${F(w.exportedKwh)} kWh<br/>
                ${w.label} ${u(w.rate,4)} ${R}/kWh${X?`<br/>Self-use priority ${w.selfUsePriority}`:""}
              </td>
              <td style="text-align: right;">
                <strong>${T(w.totalTrackedValue)}</strong><br/>
                <span class="${ta(w.selfUseVsExport)}">${nt(w.selfUseVsExport)}</span> self-use vs export<br/>
                <span class="muted">${T(w.selfUseSavings)} kept value + ${T(w.revenue)} sold</span>
              </td>
            </tr>
            `).join("")}
            <tr class="subtotal-row">
              <td colspan="2"><strong>Tracked per-system value</strong></td>
              <td style="text-align: right;"><strong>${T(k.reduce((w,A)=>w+A.totalTrackedValue,0))}</strong></td>
            </tr>
      `:"",sa=$e?`Compared with exporting the same ${F(Z)} kWh using the configured PV self-use priority and each system's own feed-in tariff`:`Compared with selling the same ${F(Z)} kWh at ${u(Se,4)} ${R}/kWh`,ot=Wt.find(w=>Math.abs(w.kw-h)<.05),ra=K-ee-O,it=_?Wt.map(w=>{var xt;const A=Kt(t.consumptionTimeseries.items,e.energy_variable_rate,w.kw,C,b,((xt=t.productionTimeseries)==null?void 0:xt.items)??[]),Me=w.fixedMonthlyFee*P,qe=A.exceedanceKwh*e.exceedance_rate,_t=(ra+Me+qe)*(1+e.vat_rate);return{...w,fixedCharge:Me,exceedanceKwh:A.exceedanceKwh,exceedanceCharge:qe,total:_t,deltaVsCurrent:_t-te}}):[],Be=it.reduce((w,A)=>!w||A.total<w.total?A:w,null),na=w=>Math.abs(w)<.005?"Current total":`${w>0?"+":"-"}${T(Math.abs(w))}`,lt=a.start&&a.end?`${ye(a.start)} — ${ye(a.end)}`:t.range.replace("_"," ").replace(/\b\w/g,w=>w.toUpperCase()),oa=f>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${u(l,1)} kW</strong> &mdash; ${i?"Reference power windows active":`Reference power level: ${u(h,1)} kW`}</p>
        <p>Exceedance volume: <strong>${F(f)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${T(O)}</p>
      </div>`:"",ia=S?_.rateBreakdown.map(w=>`
            <tr>
              <td>${w.label} (${F(w.kwh)} kWh)</td>
              <td style="text-align: right;">${u(w.rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(w.kwh*w.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Supplier rate (${F(d)} kWh bought from grid)</td>
              <td style="text-align: right;">${u(e.energy_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(j)}</td>
            </tr>
          `,la=i?`Reference power windows active (${b.length})`:`${u(h,1)} kW`,ca=S?`Time-of-use windows active (${C.length})`:`${u(e.energy_variable_rate,4)} ${R}/kWh`,da=it.map(w=>{const A=!!Be&&w.kw===Be.kw,Me=!!ot&&w.kw===ot.kw,qe=w.deltaVsCurrent<-.005?"comparison-delta-savings":w.deltaVsCurrent>.005?"comparison-delta-extra":"";return`
            <tr class="${A?"reference-power-best-row":""}${Me?" reference-power-current-row":""}">
              <td>
                <div class="reference-level-cell">
                  <span class="reference-level-kw">${u(w.kw,0)} kW</span>
                  ${A?'<span class="reference-level-badge best">Financially optimal</span>':""}
                  ${Me?'<span class="reference-level-badge current">Current</span>':""}
                  ${w.existingContractsOnly?'<span class="reference-level-badge legacy">Existing contracts</span>':""}
                </div>
              </td>
              <td style="text-align: right;">${T(w.fixedCharge)}</td>
              <td style="text-align: right;">${T(w.exceedanceCharge)}</td>
              <td style="text-align: right;"><strong>${T(w.total)}</strong></td>
              <td class="${qe}" style="text-align: right;">${na(w.deltaVsCurrent)}</td>
            </tr>
          `}).join(""),pa=it.length>0?`
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${i?"Configured reference power windows stay active in this comparison.":"One reference power level is applied to the full selected period."}
              ${ot?"":`Your current configuration uses ${u(h,1)} kW, which is outside the standard Creos low-voltage reference power levels.`}
            </p>
          </div>
          ${Be?`<div class="reference-power-optimum">
                <span class="reference-level-badge best">Financially optimal: ${u(Be.kw,0)} kW</span>
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
            ${da}
          </tbody>
        </table>
      </div>
    `:`
      <div class="card reference-power-card">
        <p class="muted">Reference power level comparison requires 15-minute load-curve data for the selected period.</p>
      </div>
    `,ua=`
      <div class="range-selector">
        ${Ne.map(w=>`
          <button
            class="range-btn ${w.id===t.range?"active":""}"
            data-range="${w.id}"
          >${w.label}</button>
        `).join("")}
      </div>
    `,ha=a.start&&a.end?(()=>{const w=new Date(a.start),A=new Date(a.end);return Number.isNaN(w.getTime())||Number.isNaN(A.getTime())?"":`
        <div class="range-info-bar">
          Period: ${w.toLocaleDateString()} - ${A.toLocaleDateString()}
        </div>
      `})():"",ma=t.range==="custom"?`
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
    `:x&&L?`
        <div class="custom-range-picker period-preview">
          <span class="period-preview-label">Viewed period</span>
          <label>
            <span>From</span>
            <input type="date" value="${x}" readonly aria-label="Preset period start" />
          </label>
          <label>
            <span>To</span>
            <input type="date" value="${L}" readonly aria-label="Preset period end" />
          </label>
        </div>
      `:"";return`
    <section class="invoice-view">
      ${ua}
      ${ha}
      ${ma}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Supplier Bill Estimate &mdash; ${lt}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the selected period. Feed-in revenue and net position are shown separately.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${F(s)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${F(d)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${F(n)} kWh produced</span>
          ${r>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${F(r)} kWh exported</span>`:""}
          ${M?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${F(m)} kWh gas (${wt($)} m³)</span>`:""}
        </div>
      </div>

      ${oa}

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
              <td>Fixed Fee <span class="muted">(${V})</span></td>
              <td style="text-align: right;">${u(e.energy_fixed_fee,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(I)}</td>
            </tr>
            ${ia}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${V})</span></td>
              <td style="text-align: right;">${u(e.network_metering_rate,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(q)}</td>
            </tr>
            <tr>
              <td>Reference power level (${la}) <span class="muted">(${V})</span></td>
              <td style="text-align: right;">${u(e.network_power_ref_rate,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(ee)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${F(d)} kWh bought from grid)</td>
              <td style="text-align: right;">${u(e.network_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(re)}</td>
            </tr>
            <tr class="${f>0?"exceedance-row":""}">
              <td>Exceedance charge (${F(f)} kWh above the reference power level)</td>
              <td style="text-align: right;">${u(e.exceedance_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(O)}</td>
            </tr>

            ${ne.filter(w=>w.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${ne.filter(w=>w.fee>0).map(w=>`
            <tr>
              <td>${w.label||"…"+w.meter_id.slice(-8)} <span class="muted">(${V})</span></td>
              <td style="text-align: right;">${u(w.fee,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(w.fee*P)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${u(e.compensation_fund_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(oe)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${u(e.electricity_tax_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(ue)}</td>
            </tr>
            ${U>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            <tr>
              <td>Monthly Discount <span class="muted">(${V})</span></td>
              <td style="text-align: right;">-${u(Math.max(0,e.connect_discount??0),2)} ${R}/mo</td>
              <td style="text-align: right;">-${T(U)}</td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(K)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${u(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(he)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Supplier Bill Estimate</strong></td>
              <td style="text-align: right;"><strong>${T(te)}</strong></td>
            </tr>

            ${n>0?`
            <tr class="section-label revenue-section"><td colspan="3">Solar Value & Feed-in Revenue</td></tr>
            <tr class="revenue-row">
              <td>Solar produced</td>
              <td style="text-align: right;">Total generation during this period</td>
              <td style="text-align: right;">${F(n)} kWh</td>
            </tr>
            <tr class="revenue-row">
              <td>Own solar used at home</td>
              <td style="text-align: right;">${F(Z)} kWh from your own production avoided grid purchases</td>
              <td style="text-align: right;">${T(me)} saved</td>
            </tr>
            ${v>0?`
            <tr class="revenue-row">
              <td>Additional solar received</td>
              <td style="text-align: right;">${F(v)} kWh covered at home from shared/community solar</td>
              <td style="text-align: right;">Informational</td>
            </tr>
            `:""}
            <tr class="revenue-row">
              <td>Export sold</td>
              <td style="text-align: right;">${F(r)} kWh sent to grid</td>
              <td style="text-align: right;">${T(Y)} earned</td>
            </tr>
            ${be?`
            <tr class="revenue-row">
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${F(ge)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${T(ve)} saved</td>
            </tr>
            `:""}
            ${r>0?`
            <tr class="section-label"><td colspan="3">Credit Calculation</td></tr>
            ${Te.map(w=>`
            <tr class="revenue-row">
              <td>Exported (${X?w.shortId:F(w.exportedKwh)+" kWh"})</td>
              <td style="text-align: right;">${F(w.exportedKwh)} kWh<br/>${w.label}<br/>${u(w.rate,4)} ${R}/kWh${$e&&X?`<br/>Self-use priority ${w.selfUsePriority}`:""}</td>
              <td class="revenue-amount" style="text-align: right;">-${T(w.revenue)}</td>
            </tr>
            `).join("")}
            ${X?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${F(r)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${u(Se,4)} ${R}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${T(Y)}</td>
            </tr>
            `:""}
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total Solar Value</strong></td>
              <td style="text-align: right;"><strong>${T(_e)}</strong></td>
            </tr>
            <tr class="net-total-row">
              <td colspan="2"><strong>Net Electricity Position</strong></td>
              <td style="text-align: right;"><strong>${T(D)}</strong></td>
            </tr>
            `:""}
            ${r<=0?`
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total Solar Value</strong></td>
              <td style="text-align: right;"><strong>${T(_e)}</strong></td>
            </tr>
            `:""}
            `:""}
          </tbody>
        </table>
      </div>

      ${pa}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Supplier bill estimate: ${T(te)}</strong>${Y>0?` Feed-in revenue is shown separately as ${T(Y)}, giving a net electricity position of ${T(D)} after export credit.`:""}
          <br/>
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${F(d)} kWh), not total home usage.
          Supplier pricing: ${ca}.
          Fixed monthly charges are prorated across the viewed period (${W} days, ${V}, equivalent to ${u(P,2)} monthly charges).
          Peak load (${u(l,1)} kW) is compared against ${i?"your configured reference power windows":`your reference power level (${u(h,1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${u(e.exceedance_rate,4)} ${R}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${M?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${lt}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${F(m)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${wt($)} m³</span>
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
              <td>Fixed Fee <span class="muted">(${V})</span></td>
              <td style="text-align: right;">${u(e.gas_fixed_fee??6.5,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(H)}</td>
            </tr>
            <tr>
              <td>Energy (${F(m)} kWh)</td>
              <td style="text-align: right;">${u(e.gas_variable_rate??.055,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(B)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${V})</span></td>
              <td style="text-align: right;">${u(e.gas_network_fee??4.8,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(xe)}</td>
            </tr>
            <tr>
              <td>Network Variable (${F(m)} kWh)</td>
              <td style="text-align: right;">${u(e.gas_network_variable_rate??.012,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(ae)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${F(m)} kWh)</td>
              <td style="text-align: right;">${u(e.gas_tax_rate??.001,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(ie)}</td>
            </tr>

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(ke)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${u((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${T(st)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${T(rt)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Net Energy Position: ${T(D+rt)}</strong>
          (Electricity net position: ${T(D)} + Gas supplier estimate: ${T(rt)})
        </p>
      </div>
      `:""}

      ${n>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Value &mdash; ${lt}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${T(_e)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${F(n)} kWh</div>
            <div class="solar-stat-label">Solar produced</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${T(me)}</div>
            <div class="solar-stat-label">Saved by using ${F(Z)} kWh of your own solar at home</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${nt(Pe)}</div>
            <div class="solar-stat-label">Extra value from using it yourself instead of selling it</div>
          </div>
          ${be?`
          <div class="solar-stat">
            <div class="solar-stat-value">${T(ve)}</div>
            <div class="solar-stat-label">Saved by staying under the reference power</div>
          </div>
          `:""}
          <div class="solar-stat">
            <div class="solar-stat-value">${T(Y)}</div>
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
              <td style="text-align: right;">${F(Z)} kWh from your own production avoided grid purchases</td>
              <td style="text-align: right;">${T(me)} saved</td>
            </tr>
            ${v>0?`
            <tr>
              <td>Additional solar received</td>
              <td style="text-align: right;">${F(v)} kWh covered at home from shared/community solar</td>
              <td style="text-align: right;">Informational</td>
            </tr>
            `:""}
            <tr>
              <td>Extra vs exporting instead</td>
              <td style="text-align: right;">${sa}</td>
              <td style="text-align: right;">${nt(Pe)}</td>
            </tr>
            <tr>
              <td>Export sold</td>
              <td style="text-align: right;">${F(r)} kWh sent to grid</td>
              <td style="text-align: right;">${T(Y)} earned</td>
            </tr>
            ${be?`
            <tr>
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${F(ge)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${T(ve)} saved</td>
            </tr>
            `:""}

            ${aa}

            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${F(Z)} kWh)</td>
              <td style="text-align: right;">${u(e.energy_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(Z*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${u(e.network_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(Z*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${u(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(Z*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${u(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(Oe)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${T(me)}</strong></td>
            </tr>

            ${be?`
            <tr class="section-label"><td colspan="3">Reference Power Savings</td></tr>
            <tr>
              <td>Exceedance avoided</td>
              <td style="text-align: right;">${F(ge)} kWh above the reference power level</td>
              <td style="text-align: right;">${T(Ee)}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${u(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(Ke)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Reference Power Savings</strong></td>
              <td style="text-align: right;"><strong>${T(ve)}</strong></td>
            </tr>
            `:""}

            ${r>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${Te.map(w=>`
            <tr>
              <td>Sold to grid ${X?`(${w.shortId})`:`(${F(w.exportedKwh)} kWh)`}</td>
              <td style="text-align: right;">${F(w.exportedKwh)} kWh<br/>${w.label}<br/>${u(w.rate,4)} ${R}/kWh${$e&&X?`<br/>Self-use priority ${w.selfUsePriority}`:""}</td>
              <td style="text-align: right;">${T(w.revenue)}</td>
            </tr>
            `).join("")}
            ${X?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${T(Y)}</strong></td>
            </tr>
            `:""}
            `:""}

            <tr class="total-row solar-total-row">
              <td colspan="2"><strong>💰 Total Solar Panel Value</strong></td>
              <td style="text-align: right;"><strong>${T(_e)}</strong></td>
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
          ${Q.some(w=>w.mode==="sensor")?"Market price sourced from Home Assistant sensor.":"Using fixed feed-in tariff — configure a market price sensor in Settings for real-time rates."}
          ${$e?"Per-system self-consumption and export are allocated from each PV system's 15-minute production using the configured self-use priority (1 = consumed first at home).":X?"Displayed per-meter feed-in kWh are currently equal-split estimates because per-meter production data was not available for this view.":""}
        </p>
      </div>
      `:""}
    </section>
  `}const ms=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],gs=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Reference Power Fixed Charge",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"connect_discount",label:"Monthly Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],vs={consumption:"Power Consumption",production:"Power Production",gas:"Gas Consumption"},Zt={consumption:"⚡",production:"☀️",gas:"🔥"};function ys(t){return t.map(e=>`<span class="meter-type-badge meter-type-${e}">${Zt[e]??""} ${vs[e]??e}</span>`).join(" ")}function Vt(t,e,a){const s=t+1;return a?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${s}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${ys(e.types)}</div>
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
  `}function Jt(t){return ms.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function fs(t,e){return`
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
            ${Jt(e.day_group??"all")}
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
  `}function ws(t,e){return`
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
            ${Jt(e.day_group??"all")}
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
  `}function $s(t,e="ha",a){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const s=e==="standalone"?(a==null?void 0:a.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let n="";if(e==="standalone"){const i=s.map((f,x)=>Vt(x,f,!1)).join("");a==null||a.proxy_url,n=`
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
    `}else{const i=(t==null?void 0:t.meters)??[];n=`
      <div class="card" style="margin-bottom: var(--sp-6); padding: var(--sp-4) var(--sp-5);">
        <p class="muted" style="margin: 0 0 var(--sp-3) 0;">🔒 API credentials are managed through Home Assistant &rarr; Settings &rarr; Integrations &rarr; Leneda</p>
        <div class="form-section">
          <div class="form-section-title">📊  Configured Metering Points</div>
          <div id="meters-container">
            ${i.length>0?i.map((f,x)=>Vt(x,f,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const o=i=>i.map(l=>{const f=t?t[l.key]??"":"";return`
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
      `}).join(""),r=((t==null?void 0:t.meters)??[]).filter(i=>i.types.includes("production")),c=(t==null?void 0:t.feed_in_rates)??[],p=e==="ha";function v(i){return c.find(l=>l.meter_id===i)??{meter_id:i,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:"",self_use_priority:r.findIndex(l=>l.id===i)+1}}const d=r.length===0?'<p class="muted">No production meters configured — add a meter with Power Production type above.</p>':r.map((i,l)=>{const f=v(i.id),x=i.id?"…"+i.id.slice(-8):`Meter ${l+1}`;return`
          <div class="feed-in-meter-card" data-meter-idx="${l}" data-meter-id="${i.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${x}</span>
              <input type="hidden" name="feed_in_rate_${l}_meter_id" value="${i.id}" />
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
                    placeholder="${p?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${p&&l===0?'<datalist id="ha-entity-list"></datalist>':""}
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
        `}).join(""),g=((t==null?void 0:t.meters)??[]).some(i=>i.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),h=(t==null?void 0:t.consumption_rate_windows)??[],y=(t==null?void 0:t.reference_power_windows)??[],m=(t==null?void 0:t.meters)??[],$=(t==null?void 0:t.meter_monthly_fees)??[];function M(i){return $.find(l=>l.meter_id===i)??{meter_id:i,label:"",fee:0}}const C=m.length===0?'<p class="muted">No meters configured.</p>':m.map((i,l)=>{const f=M(i.id),x=i.id?"…"+i.id.slice(-8):`Meter ${l+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${i.types.map(W=>Zt[W]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${x}</code>
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
        `}).join(""),b=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional supplier-rate windows. Outside these windows, the base <strong>Energy Supplier → Variable Rate</strong> is used.
      Windows can cross midnight by setting an end time earlier than the start time.
    </p>
    <div id="consumption-windows-container">
      ${h.length>0?h.map((i,l)=>fs(l,i)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,_=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${y.length>0?y.map((i,l)=>ws(l,i)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,S=gs.map(i=>{if(i.title==="Gas Billing"&&!g||i.title==="Meter Fees"&&m.length<2)return"";let l;return i.title==="Feed-in / Selling"?l=d:i.title==="Time-of-Use Tariffs"?l=b:i.title==="Reference Power Windows"?l=_:i.title==="Discounts"?l=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as a monthly credit. The dashboard prorates it to the selected period and subtracts it before VAT.
      </p>`+o(i.fields):i.title==="Meter Fees"?l=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+C:l=o(i.fields),`
    <div class="form-section">
      <div class="form-section-title">${i.icon}  ${i.title}</div>
      ${l}
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
  `}function dt(t,e,a=!1,s="dark",n=""){const o=y=>`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${y}
    </svg>
  `,r=o(`
    <path d="M4 19V5" />
    <path d="M4 19H20" />
    <path d="M7 15L11 11L14 13L19 8" />
    <circle cx="7" cy="15" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="11" cy="11" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="14" cy="13" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="19" cy="8" r="1.25" fill="currentColor" stroke="none" />
  `),c=o(`
    <path d="M3 11.5L12 4L21 11.5" />
    <path d="M5.5 10.5V20H18.5V10.5" />
    <path d="M9.5 20V14H14.5V20" />
  `),p=o(`
    <path d="M4 19H20" />
    <path d="M7 19V11" />
    <path d="M12 19V7" />
    <path d="M17 19V4" />
  `),v=o(`
    <path d="M7 4H17V20L15 18.5L13 20L11 18.5L9 20L7 18.5L5 20V6A2 2 0 0 1 7 4Z" />
    <path d="M9 9H15" />
    <path d="M9 13H15" />
  `),d=o(`
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3V6" />
    <path d="M12 18V21" />
    <path d="M3 12H6" />
    <path d="M18 12H21" />
    <path d="M5.64 5.64L7.76 7.76" />
    <path d="M16.24 16.24L18.36 18.36" />
    <path d="M16.24 7.76L18.36 5.64" />
    <path d="M5.64 18.36L7.76 16.24" />
  `),g=o(s==="dark"?`
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
      `),h=[{id:"charts",label:"Charts",icon:r},{id:"dashboard",label:"Dashboard",icon:c},{id:"sensors",label:"Sensors",icon:p},{id:"invoice",label:"Invoice",icon:v},{id:"settings",label:"Settings",icon:d}];return`
    <header class="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-brand">
        <img src="/leneda-panel/static/logo.png" srcset="/leneda-panel/static/logo@2x.png 2x" alt="Leneda Logo" class="navbar-logo-img" />
        ${n?`<span class="navbar-badge">${n}</span>`:""}
 
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
              <span class="theme-toggle-icon" aria-hidden="true">${g}</span>
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
  `}const Qt="leneda_credentials",ea="leneda_theme";function bs(){try{const t=localStorage.getItem(Qt);if(t)return JSON.parse(t)}catch{}return null}function pt(t){try{localStorage.setItem(Qt,JSON.stringify(t))}catch{}}function _s(){var t;try{const e=localStorage.getItem(ea);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function xs(t){try{localStorage.setItem(ea,t)}catch{}}function Rt(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const[,a,s,n]=e;return new Date(Number(a),Number(s)-1,Number(n))}function It(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${s}`}function Re(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0"),n=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),r=String(t.getSeconds()).padStart(2,"0"),c=String(t.getMilliseconds()).padStart(3,"0"),p=-t.getTimezoneOffset(),v=p>=0?"+":"-",d=String(Math.floor(Math.abs(p)/60)).padStart(2,"0"),g=String(Math.abs(p)%60).padStart(2,"0");return`${e}-${a}-${s}T${n}:${o}:${r}.${c}${v}${d}:${g}`}function At(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function ks(t,e=new Date){switch(t){case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const s=new Date(a);return s.setHours(23,59,59,999),{start:a,end:s}}case"this_week":{const a=new Date(e),s=a.getDay()||7;return a.setDate(a.getDate()-s+1),a.setHours(0,0,0,0),{start:a,end:e}}case"last_week":{const a=new Date(e),s=a.getDay()||7,n=new Date(a);n.setDate(a.getDate()-s),n.setHours(23,59,59,999);const o=new Date(n);return o.setDate(n.getDate()-6),o.setHours(0,0,0,0),{start:o,end:n}}case"this_month":return{start:new Date(e.getFullYear(),e.getMonth(),1),end:e};case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),s=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:a,end:s}}case"this_year":return{start:new Date(e.getFullYear(),0,1),end:e};case"last_year":{const a=new Date(e.getFullYear()-1,0,1),s=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:a,end:s}}}}function Ms(t,e,a=new Date){const s=Rt(t),n=Rt(e);if(!s||!n)return null;const o=["yesterday","this_week","last_week","this_month","last_month","this_year","last_year"];for(const r of o){const c=ks(r,a);if(At(s,c.start)&&At(n,c.end))return r}return null}class Cs{constructor(e){De(this,"root");De(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartViewportStart:null,chartViewportEnd:null,chartUnit:"kwh",chartTimeBucket:"quarter_hour",chartConsumptionView:"grid",analysisHeatmapMetric:"grid",analysisProfileMetric:"house",analysisComparisonMode:"previous",analysisComparison:null,analysisComparisonLoading:!1,rangeData:null,consumptionTimeseries:null,productionTimeseries:null,gridImportTimeseries:null,marketExportTimeseries:null,perMeterProductionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:_s()});De(this,"preZoomRange",null);De(this,"preZoomCustomStart","");De(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await Nt();if(this.state.mode=e.mode,e.mode==="standalone"){const a=bs();if(a&&(this.state.credentials=a),!e.configured&&!a){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&a)try{const{saveCredentials:s}=await le(async()=>{const{saveCredentials:n}=await Promise.resolve().then(()=>Ce);return{saveCredentials:n}},void 0);await s(a)}catch{}if(!a)try{this.state.credentials=await Gt()}catch{}}await this.loadData()}toDisplayError(e,a="Failed to load data"){const s=e instanceof Error?e.message:String(e??"").trim(),n=s.toLowerCase();return n.includes("missing data")||n.includes("no_data")||n.includes("no data")?"Missing data":s||a}clearRangeStateWithError(e,a="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.state.gridImportTimeseries=null,this.state.marketExportTimeseries=null,this.state.perMeterProductionTimeseries=null,this.clearChartViewport(),this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1,this.state.error=this.toDisplayError(e,a)}async fetchPerMeterProductionForRange(e,a,s){var o;if(((e==null?void 0:e.meters)??[]).filter(r=>r.types.includes("production")).length<=1)return null;try{const r=await ut("1-1:2.29.0",a,s);return(o=r.meters)!=null&&o.length?r:null}catch(r){return console.warn("Per-meter production fetch failed:",r),null}}async fetchEnergyFlowTimeseries(e,a){const[s,n,o,r]=await Promise.all([Ie("1-1:1.29.0",e,a),Ie("1-1:2.29.0",e,a),Ie("1-65:1.29.9",e,a),Ie("1-65:2.29.9",e,a)]);return{consumptionTimeseries:s,productionTimeseries:n,gridImportTimeseries:o,marketExportTimeseries:r}}resetAnalysisComparison(){this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1}clearChartViewport(){this.state.chartViewportStart=null,this.state.chartViewportEnd=null}normalizeChartTimeBucket(){const{start:e,end:a}=this.getDateRangeISO(),s=Ma(mt(e,a),this.state.chartTimeBucket);s!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=s)}getCurrentRangeKey(){const{start:e,end:a}=this.getDateRangeISO();return`${e}|${a}`}shiftIsoByYears(e,a){const s=new Date(e);if(!Number.isFinite(s.getTime()))return e;const n=new Date(s);return n.setUTCFullYear(n.getUTCFullYear()+a),n.toISOString()}getComparisonRangeISO(e,a,s){if(s==="last_year")return{start:this.shiftIsoByYears(e,-1),end:this.shiftIsoByYears(a,-1)};const n=new Date(e).getTime(),o=new Date(a).getTime(),r=Math.max(0,o-n),c=n-1,p=c-r;return{start:new Date(p).toISOString(),end:new Date(c).toISOString()}}async loadAnalysisComparison(e=!1){var c;if(!this.state.consumptionTimeseries||!this.state.productionTimeseries)return;const{start:a,end:s}=this.getDateRangeISO(),n=this.state.analysisComparisonMode,o=`${a}|${s}|${n}`;if(!e&&(this.state.analysisComparisonLoading||((c=this.state.analysisComparison)==null?void 0:c.key)===o))return;const r=this.getComparisonRangeISO(a,s,n);this.state.analysisComparisonLoading=!0,this.state.tab==="charts"&&this.renderPreserveMainScroll();try{const{consumptionTimeseries:p,productionTimeseries:v,gridImportTimeseries:d,marketExportTimeseries:g}=await this.fetchEnergyFlowTimeseries(r.start,r.end);if(o!==this.getCurrentRangeKey())return;this.state.analysisComparison={key:o,mode:n,start:r.start,end:r.end,consumptionTimeseries:p,productionTimeseries:v,gridImportTimeseries:d,marketExportTimeseries:g}}catch(p){console.warn("Comparison data fetch failed:",p),o===this.getCurrentRangeKey()&&(this.state.analysisComparison=null)}finally{o===this.getCurrentRangeKey()&&(this.state.analysisComparisonLoading=!1,this.state.tab==="charts"&&this.renderPreserveMainScroll())}}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.clearChartViewport(),this.resetAnalysisComparison(),this.render();try{const[e,a,s]=await Promise.all([Ze(this.state.range),ht(),Ae()]),{start:n,end:o}=this.getDateRangeISO(),[r,c]=await Promise.all([this.fetchEnergyFlowTimeseries(n,o),this.fetchPerMeterProductionForRange(s,n,o)]);this.state.rangeData=e,this.state.consumptionTimeseries=r.consumptionTimeseries,this.state.productionTimeseries=r.productionTimeseries,this.state.gridImportTimeseries=r.gridImportTimeseries,this.state.marketExportTimeseries=r.marketExportTimeseries,this.state.perMeterProductionTimeseries=c,this.state.sensors=a,this.state.config=s}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async changeRange(e){if(this.preZoomRange=null,this.clearChartViewport(),this.state.range=e,this.resetAnalysisComparison(),e==="custom"){if(!this.state.customStart||!this.state.customEnd){const a=new Date;a.setDate(a.getDate()-1);const s=new Date(a);s.setDate(s.getDate()-6),this.state.customStart=It(s),this.state.customEnd=It(a)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:a,end:s}=this.getDateRangeISO(),[n,o,r]=await Promise.all([Ze(e),this.fetchEnergyFlowTimeseries(a,s),this.fetchPerMeterProductionForRange(this.state.config,a,s)]);this.state.rangeData=n,this.state.consumptionTimeseries=o.consumptionTimeseries,this.state.productionTimeseries=o.productionTimeseries,this.state.gridImportTimeseries=o.gridImportTimeseries,this.state.marketExportTimeseries=o.marketExportTimeseries,this.state.perMeterProductionTimeseries=r}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async applyCustomRange(){this.preZoomRange=null,this.clearChartViewport();const{customStart:e,customEnd:a}=this.state;if(!(!e||!a)){this.state.error=null,this.state.loading=!0,this.resetAnalysisComparison(),this.render();try{const s=Ms(e,a),n=s?Ze(s):le(async()=>{const{fetchCustomData:g}=await Promise.resolve().then(()=>Ce);return{fetchCustomData:g}},void 0).then(({fetchCustomData:g})=>g(e,a)),o=this.state.config,r=Re(new Date(e+"T00:00:00")),c=Re(new Date(a+"T23:59:59.999")),[p,v,d]=await Promise.all([n,this.fetchEnergyFlowTimeseries(r,c),this.fetchPerMeterProductionForRange(o,r,c)]);this.state.rangeData={range:"custom",consumption:p.consumption,production:p.production,exported:p.exported??0,self_consumed:p.self_consumed??0,grid_import:p.grid_import,solar_to_home:p.solar_to_home,direct_solar_to_home:p.direct_solar_to_home,shared:p.shared,shared_with_me:p.shared_with_me,gas_energy:p.gas_energy??0,gas_volume:p.gas_volume??0,peak_power_kw:p.peak_power_kw??0,exceedance_kwh:p.exceedance_kwh??0,metering_point:p.metering_point??"",start:p.start??e,end:p.end??a},this.state.consumptionTimeseries=v.consumptionTimeseries,this.state.productionTimeseries=v.productionTimeseries,this.state.gridImportTimeseries=v.gridImportTimeseries,this.state.marketExportTimeseries=v.marketExportTimeseries,this.state.perMeterProductionTimeseries=d}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}}async shiftChartPeriod(e){const{start:a,end:s}=this.getDateRangeISO(),n=qt(a,s,this.state.chartTimeBucket,e);n&&await this.handleChartZoomChange(Re(n.start),Re(n.end))}changeTab(e){this.state.tab=e,this.render(),(e==="dashboard"||e==="charts")&&!this.state.rangeData&&!this.state.loading&&this.loadData(),e==="charts"&&this.state.rangeData&&this.loadAnalysisComparison(),e==="sensors"&&!this.state.sensors&&ht().then(a=>{this.state.sensors=a,this.render()}),e==="settings"&&!this.state.config&&Ae().then(a=>{this.state.config=a,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,xs(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}printInvoice(){var r,c;const e=document.title,s=`Leneda-invoice-${(r=this.state.rangeData)!=null&&r.start&&((c=this.state.rangeData)!=null&&c.end)?`${this.state.rangeData.start.slice(0,10)}_to_${this.state.rangeData.end.slice(0,10)}`:this.state.range}`.replace(/[^a-z0-9_-]+/gi,"-");let n=!1;const o=()=>{n||(n=!0,document.title=e,window.removeEventListener("afterprint",o))};document.title=s,window.addEventListener("afterprint",o,{once:!0}),window.print(),window.setTimeout(o,1e3)}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const a=this.root.querySelector(".main-content");a?a.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}getDataSourceLabel(){return this.state.mode==="ha"?"Home Assistant":"Standalone"}getHostedDataNoticeHtml(){var e;return(((e=this.state.credentials)==null?void 0:e.proxy_url)??"").trim().length>0,""}render(){var p;const{tab:e,loading:a,error:s,theme:n}=this.state,o=this.getDataSourceLabel(),r=this.getHostedDataNoticeHtml();if(a&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${dt(e,v=>{},!1,n,o)}
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
          ${dt(e,d=>{},!1,n,o)}
          <main class="main-content">
            ${r}
            <div class="error-state">
              <h2>${v?"Missing Data":"Connection Error"}</h2>
              <p>${v?"The selected period could not be loaded because data is missing.":s}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(p=this.root.querySelector("#retry-btn"))==null||p.addEventListener("click",()=>this.loadData());return}this.state.rangeData&&this.normalizeChartTimeBucket();let c="";switch(e){case"dashboard":c=Ta(this.state);break;case"charts":c=os(this.state);break;case"sensors":c=ls(this.state.sensors);break;case"invoice":c=hs(this.state);break;case"settings":c=$s(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${dt(e,v=>this.changeTab(v),this.state.isMenuOpen,n,o)}
        <main class="main-content">
          ${r}
          ${a?'<div class="loading-bar"></div>':""}
          ${c}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachAnalysisListeners(),this.attachInvoiceListeners(),this.attachSettingsListeners()}attachNavListeners(){var e,a;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(a=this.root.querySelector("[data-theme-toggle]"))==null||a.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{const n=s.dataset.tab;this.changeTab(n)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.range;this.changeRange(c)})});const a=this.root.querySelector("#custom-start"),s=this.root.querySelector("#custom-end");a&&a.addEventListener("change",()=>{this.state.customStart=a.value}),s&&s.addEventListener("change",()=>{this.state.customEnd=s.value});const n=this.root.querySelector("#apply-custom-range");if(n==null||n.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.chartUnit;c!==this.state.chartUnit&&(this.state.chartUnit=c,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-bucket]").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.chartBucket,{start:p,end:v}=this.getDateRangeISO();He(c,mt(p,v))&&c!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=c,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-period-nav]").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.chartPeriodNav==="next"?1:-1;this.shiftChartPeriod(c)})}),this.root.querySelectorAll("[data-chart-view]").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.chartView;c!==this.state.chartConsumptionView&&(this.state.chartConsumptionView=c,this.renderPreserveMainScroll())})}),!e){const r=this.root.querySelector("#energy-chart");r&&this.state.rangeData&&this.initChart(r)}const o=this.root.querySelector(".reset-zoom-btn");o==null||o.addEventListener("click",async()=>{const{resetChartZoom:r}=await le(async()=>{const{resetChartZoom:c}=await import("./Charts-Cn8go7-p.js");return{resetChartZoom:c}},[]);if(r(),o.style.display="none",this.clearChartViewport(),this.preZoomRange!==null){const c=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",c==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(c)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachAnalysisListeners(){this.root.querySelectorAll("[data-analysis-heatmap]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisHeatmap;a!==this.state.analysisHeatmapMetric&&(this.state.analysisHeatmapMetric=a,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-profile]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisProfile;a!==this.state.analysisProfileMetric&&(this.state.analysisProfileMetric=a,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-comparison-mode]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisComparisonMode;a!==this.state.analysisComparisonMode&&(this.state.analysisComparisonMode=a,this.state.analysisComparison=null,this.loadAnalysisComparison(!0))})})}attachInvoiceListeners(){var e;(e=this.root.querySelector("#print-invoice-btn"))==null||e.addEventListener("click",()=>{this.printInvoice()})}attachSettingsListeners(){var p,v;const e=this.root.querySelector("#credentials-form");if(e){const d=this.root.querySelector("#add-meter-btn");d==null||d.addEventListener("click",()=>{var $,M,C;const y=new FormData(e),m=g(y);if(m.length<10){m.push({id:"",types:["consumption"]});const b={api_key:y.get("api_key")||(($=this.state.credentials)==null?void 0:$.api_key)||"",energy_id:y.get("energy_id")||((M=this.state.credentials)==null?void 0:M.energy_id)||"",meters:m,proxy_url:y.get("proxy_url")||((C=this.state.credentials)==null?void 0:C.proxy_url)||""};this.state.credentials=b,pt(b),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach(y=>{y.addEventListener("click",()=>{var b,_,S;const m=parseInt(y.dataset.meter??"0",10),$=new FormData(e),M=g($);M.splice(m,1);const C={api_key:$.get("api_key")||((b=this.state.credentials)==null?void 0:b.api_key)||"",energy_id:$.get("energy_id")||((_=this.state.credentials)==null?void 0:_.energy_id)||"",meters:M,proxy_url:$.get("proxy_url")||((S=this.state.credentials)==null?void 0:S.proxy_url)||""};this.state.credentials=C,pt(C),this.renderPreserveMainScroll()})});const g=y=>{var $,M,C;const m=[];for(let b=0;b<10;b++){const _=y.get(`meter_${b}_id`);if(_===null)break;const S=[];($=e.querySelector(`[name="meter_${b}_consumption"]`))!=null&&$.checked&&S.push("consumption"),(M=e.querySelector(`[name="meter_${b}_production"]`))!=null&&M.checked&&S.push("production"),(C=e.querySelector(`[name="meter_${b}_gas"]`))!=null&&C.checked&&S.push("gas"),m.push({id:_.trim(),types:S})}return m};e.addEventListener("submit",async y=>{y.preventDefault();const m=new FormData(e),$={api_key:m.get("api_key"),energy_id:m.get("energy_id"),meters:g(m),proxy_url:m.get("proxy_url")},M=this.root.querySelector("#creds-status");try{pt($);const{saveCredentials:C}=await le(async()=>{const{saveCredentials:S}=await Promise.resolve().then(()=>Ce);return{saveCredentials:S}},void 0);await C($),M&&(M.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=$,this.state.error=null;const b=!1,_=($.proxy_url??"").trim();await this.loadData()}catch(C){M&&(M.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${C instanceof Error?C.message:C}</p>`)}});const h=this.root.querySelector("#test-creds-btn");h==null||h.addEventListener("click",async()=>{const y=new FormData(e),m={api_key:y.get("api_key"),energy_id:y.get("energy_id"),meters:g(y),proxy_url:y.get("proxy_url")},$=this.root.querySelector("#creds-status");$&&($.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:M}=await le(async()=>{const{testCredentials:b}=await Promise.resolve().then(()=>Ce);return{testCredentials:b}},void 0),C=await M(m);$&&($.innerHTML=C.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${C.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${C.message}</p>`)}catch(M){$&&($.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${M instanceof Error?M.message:M}</p>`)}})}const a=this.root.querySelector("#settings-form");if(!a)return;const s=d=>{const g=[];for(let h=0;h<24;h++){const y=d.get(`consumption_window_${h}_label`),m=d.get(`consumption_window_${h}_day_group`),$=d.get(`consumption_window_${h}_start_time`),M=d.get(`consumption_window_${h}_end_time`),C=d.get(`consumption_window_${h}_rate`);if(y===null&&m===null&&$===null&&M===null&&C===null)break;g.push({label:(y??"").trim()||`Window ${h+1}`,day_group:m??"all",start_time:$??"00:00",end_time:M??"06:00",rate:parseFloat(C??"0")||0})}return g},n=d=>{const g=[];for(let h=0;h<24;h++){const y=d.get(`reference_window_${h}_label`),m=d.get(`reference_window_${h}_day_group`),$=d.get(`reference_window_${h}_start_time`),M=d.get(`reference_window_${h}_end_time`),C=d.get(`reference_window_${h}_reference_power_kw`);if(y===null&&m===null&&$===null&&M===null&&C===null)break;g.push({label:(y??"").trim()||`Reference ${h+1}`,day_group:m??"all",start_time:$??"17:00",end_time:M??"00:00",reference_power_kw:parseFloat(C??"0")||0})}return g},o=()=>{var b;const d=new FormData(a),g={};a.querySelectorAll('input[type="checkbox"]').forEach(_=>{g[_.name]=_.checked});const h=[],y=/^feed_in_rate_(\d+)_(.+)$/,m={},$=[],M=/^meter_fee_(\d+)_(.+)$/,C={};for(const[_,S]of d.entries()){if(_.startsWith("consumption_window_")||_.startsWith("reference_window_"))continue;const i=_.match(y);if(i){const W=i[1],P=i[2];m[W]||(m[W]={}),m[W][P]=S;continue}const l=_.match(M);if(l){const W=l[1],P=l[2];C[W]||(C[W]={}),C[W][P]=S;continue}if(g[_]!==void 0&&typeof g[_]=="boolean")continue;const f=S,x=a.elements.namedItem(_);if(f===""&&x instanceof HTMLInputElement&&x.type==="number"){const W=(b=this.state.config)==null?void 0:b[_];typeof W=="number"&&isFinite(W)&&(g[_]=W);continue}const L=parseFloat(f);g[_]=isNaN(L)?f:L}for(const _ of Object.keys(m).sort()){const S=m[_],i=S.mode??"fixed",l=i==="sensor"?S.fallback_tariff??S.tariff:S.tariff;h.push({meter_id:S.meter_id??"",mode:i,tariff:parseFloat(l??"0.08")||.08,sensor_entity:S.sensor_entity??"",self_use_priority:Math.max(1,parseInt(S.self_use_priority??`${Number(_)+1}`,10)||Number(_)+1)})}h.length>0&&(g.feed_in_rates=h);for(const _ of Object.keys(C).sort()){const S=C[_];$.push({meter_id:S.meter_id??"",label:S.label??"",fee:parseFloat(S.fee??"0")||0})}return $.length>0&&(g.meter_monthly_fees=$),g.consumption_rate_windows=s(d),g.reference_power_windows=n(d),g},r=d=>{if(!this.state.config)return;const g=o();d(g),this.state.config={...this.state.config,...g},this.renderPreserveMainScroll()};if((p=this.root.querySelector("#add-consumption-window-btn"))==null||p.addEventListener("click",()=>{r(d=>{var h;const g=Array.isArray(d.consumption_rate_windows)?[...d.consumption_rate_windows]:[];g.push({label:`Window ${g.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((h=this.state.config)==null?void 0:h.energy_variable_rate)??.1125}),d.consumption_rate_windows=g})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(d=>{d.addEventListener("click",()=>{const g=parseInt(d.dataset.window??"0",10);r(h=>{const y=Array.isArray(h.consumption_rate_windows)?[...h.consumption_rate_windows]:[];y.splice(g,1),h.consumption_rate_windows=y})})}),(v=this.root.querySelector("#add-reference-window-btn"))==null||v.addEventListener("click",()=>{r(d=>{var h;const g=Array.isArray(d.reference_power_windows)?[...d.reference_power_windows]:[];g.push({label:`Reference ${g.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((h=this.state.config)==null?void 0:h.reference_power_kw)??5}),d.reference_power_windows=g})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(d=>{d.addEventListener("click",()=>{const g=parseInt(d.dataset.window??"0",10);r(h=>{const y=Array.isArray(h.reference_power_windows)?[...h.reference_power_windows]:[];y.splice(g,1),h.reference_power_windows=y})})}),a.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(d=>{d.addEventListener("change",()=>{const g=d.name.match(/feed_in_rate_(\d+)_mode/);if(!g)return;const h=g[1],y=a.querySelector(`.feed-in-fixed-fields[data-rate-idx="${h}"]`),m=a.querySelector(`.feed-in-sensor-fields[data-rate-idx="${h}"]`);y&&(y.style.display=d.value==="fixed"?"":"none"),m&&(m.style.display=d.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const d=this.root.querySelector("#ha-entity-list");d&&Ot().then(({entities:g})=>{d.innerHTML=g.map(h=>`<option value="${h}"></option>`).join("")}).catch(()=>{})}a.addEventListener("submit",async d=>{d.preventDefault();const g=o();try{const{saveConfig:h}=await le(async()=>{const{saveConfig:y}=await Promise.resolve().then(()=>Ce);return{saveConfig:y}},void 0);await h(g),this.state.config=await Ae(),this.render()}catch(h){alert("Failed to save: "+(h instanceof Error?h.message:h))}});const c=this.root.querySelector("#reset-config-btn");c==null||c.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?"))try{const{resetConfig:d}=await le(async()=>{const{resetConfig:g}=await Promise.resolve().then(()=>Ce);return{resetConfig:g}},void 0);await d(),this.state.config=await Ae(),this.render()}catch(d){alert("Failed to reset: "+(d instanceof Error?d.message:d))}})}async initChart(e){var a,s,n,o;try{const{renderEnergyChart:r}=await le(async()=>{const{renderEnergyChart:b}=await import("./Charts-Cn8go7-p.js");return{renderEnergyChart:b}},[]),{start:c,end:p}=this.getDateRangeISO(),v=this.state.chartViewportStart?new Date(this.state.chartViewportStart).getTime():void 0,d=this.state.chartViewportEnd?new Date(this.state.chartViewportEnd).getTime():void 0;let g=this.state.consumptionTimeseries,h=this.state.productionTimeseries,y=this.state.gridImportTimeseries,m=this.state.marketExportTimeseries;if(!g||!h||!y||!m){const b=await this.fetchEnergyFlowTimeseries(c,p);g=b.consumptionTimeseries,h=b.productionTimeseries,y=b.gridImportTimeseries,m=b.marketExportTimeseries,this.state.consumptionTimeseries=g,this.state.productionTimeseries=h,this.state.gridImportTimeseries=y,this.state.marketExportTimeseries=m}const $=((a=this.state.config)==null?void 0:a.reference_power_kw)??0,M=(((s=this.state.config)==null?void 0:s.meters)??[]).filter(b=>b.types.includes("production"));let C;if((o=(n=this.state.perMeterProductionTimeseries)==null?void 0:n.meters)!=null&&o.length)C=this.state.perMeterProductionTimeseries.meters;else if(M.length>1)try{const b=await ut("1-1:2.29.0",c,p);b.meters&&b.meters.length>1&&(C=b.meters,this.state.perMeterProductionTimeseries=b)}catch(b){console.warn("Per-meter timeseries fetch failed, using merged view:",b)}r(e,g,h,{unit:this.state.chartUnit,consumptionView:this.state.chartConsumptionView,referencePowerKw:$,gridImportTimeseries:y,marketExportTimeseries:m,perMeterProduction:C,viewportStartMs:v,viewportEndMs:d,timeBucket:this.state.chartTimeBucket,onZoomChange:(b,_)=>{this.handleChartZoomChange(b,_)}})}catch(r){console.error("Chart init failed:",r)}}async handleChartZoomChange(e,a){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd),this.state.error=null,this.state.loading=!0,this.renderPreserveMainScroll();const{fetchCustomData:s}=await le(async()=>{const{fetchCustomData:v}=await Promise.resolve().then(()=>Ce);return{fetchCustomData:v}},void 0),n=e.slice(0,10),o=a.slice(0,10);this.resetAnalysisComparison();const r=await s(e,a),[c,p]=await Promise.all([this.fetchEnergyFlowTimeseries(e,a),this.fetchPerMeterProductionForRange(this.state.config,e,a)]);this.state.range="custom",this.state.customStart=n,this.state.customEnd=o,this.state.chartViewportStart=e,this.state.chartViewportEnd=a,this.state.rangeData={range:"custom",consumption:r.consumption,production:r.production,exported:r.exported??0,self_consumed:r.self_consumed??0,gas_energy:r.gas_energy??0,gas_volume:r.gas_volume??0,grid_import:r.grid_import,solar_to_home:r.solar_to_home,direct_solar_to_home:r.direct_solar_to_home,shared:r.shared,shared_with_me:r.shared_with_me,peak_power_kw:r.peak_power_kw??0,exceedance_kwh:r.exceedance_kwh??0,metering_point:r.metering_point??"",start:r.start,end:r.end},this.state.consumptionTimeseries=c.consumptionTimeseries,this.state.productionTimeseries=c.productionTimeseries,this.state.gridImportTimeseries=c.gridImportTimeseries,this.state.marketExportTimeseries=c.marketExportTimeseries,this.state.perMeterProductionTimeseries=p,this.state.loading=!1,this.renderPreserveMainScroll()}catch(s){console.error("Zoom data fetch failed:",s),this.state.loading=!1,this.clearRangeStateWithError(s,"Missing data"),this.render()}}getDateRangeISO(){if(this.state.chartViewportStart&&this.state.chartViewportEnd)return{start:this.state.chartViewportStart,end:this.state.chartViewportEnd};const e=new Date,a=s=>Re(s);switch(this.state.range){case"custom":{const s=new Date(this.state.customStart+"T00:00:00"),n=new Date(this.state.customEnd+"T23:59:59.999");return{start:a(s),end:a(n)}}case"yesterday":{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const n=new Date(s);return n.setHours(23,59,59,999),{start:a(s),end:a(n)}}case"this_week":{const s=new Date(e),n=s.getDay()||7;return s.setDate(s.getDate()-n+1),s.setHours(0,0,0,0),{start:a(s),end:a(e)}}case"last_week":{const s=new Date(e),n=s.getDay()||7,o=new Date(s);o.setDate(s.getDate()-n),o.setHours(23,59,59,999);const r=new Date(o);return r.setDate(o.getDate()-6),r.setHours(0,0,0,0),{start:a(r),end:a(o)}}case"this_month":{const s=new Date(e.getFullYear(),e.getMonth(),1);return{start:a(s),end:a(e)}}case"last_month":{const s=new Date(e.getFullYear(),e.getMonth()-1,1),n=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:a(s),end:a(n)}}case"this_year":{const s=new Date(e.getFullYear(),0,1);return{start:a(s),end:a(e)}}case"last_year":{const s=new Date(e.getFullYear()-1,0,1),n=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:a(s),end:a(n)}}default:{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const n=new Date(s);return n.setHours(23,59,59,999),{start:a(s),end:a(n)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new Cs(t).mount()}export{Da as b};
