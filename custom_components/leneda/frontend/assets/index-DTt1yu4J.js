var ya=Object.defineProperty;var fa=(t,e,a)=>e in t?ya(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var Fe=(t,e,a)=>fa(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const wa="modulepreload",$a=function(t){return"/leneda-panel/static/"+t},Ct={},ce=function(e,a,s){let o=Promise.resolve();if(a&&a.length>0){let r=function(y){return Promise.all(y.map(d=>Promise.resolve(d).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));o=r(a.map(y=>{if(y=$a(y),y in Ct)return;Ct[y]=!0;const d=y.endsWith(".css"),g=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${g}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":wa,d||(h.as="script"),h.crossOrigin="",h.href=y,u&&h.setAttribute("nonce",u),document.head.appendChild(h),d)return new Promise((f,v)=>{h.addEventListener("load",f),h.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${y}`)))})}))}function n(r){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=r,window.dispatchEvent(l),!l.defaultPrevented)throw r}return o.then(r=>{for(const l of r||[])l.status==="rejected"&&n(l.reason);return e().catch(n)})};function Gt(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()})),proxy_url:(t.proxy_url??"").trim()}}function ba(){var t,e,a,s,o;try{const n=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((o=(s=(a=n==null?void 0:n.hass)==null?void 0:a.auth)==null?void 0:s.data)==null?void 0:o.access_token)??null}catch{return null}}async function Z(t,e){const a=ba(),s={...e==null?void 0:e.headers,...a?{Authorization:`Bearer ${a}`}:{}},o={...e,credentials:"include",headers:s},n=await fetch(t,o);if(!n.ok){const r=n.headers.get("content-type")??"";let l="",u="";if(r.includes("application/json")){const y=await n.json().catch(()=>null);l=String((y==null?void 0:y.error)??"").trim(),u=String((y==null?void 0:y.message)??(y==null?void 0:y.error)??"").trim()}else u=(await n.text().catch(()=>"")).trim();throw l==="missing_data"||l==="no_data"||n.status===503?new Error("Missing data"):new Error(u?`API ${n.status}: ${u}`:`API ${n.status}: ${n.statusText}`)}return n.json()}async function Qe(t){return Z(`/leneda_api/data?range=${t}`)}async function _a(t,e){return Z(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function Ae(t,e,a){let s=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(s+=`&start=${encodeURIComponent(e)}`),a&&(s+=`&end=${encodeURIComponent(a)}`),Z(s)}async function mt(t,e,a){let s=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(s+=`&start=${encodeURIComponent(e)}`),a&&(s+=`&end=${encodeURIComponent(a)}`),Z(s)}async function gt(){return Z("/leneda_api/sensors")}async function He(){return Z("/leneda_api/config")}async function xa(t){await Z("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function ka(){await Z("/leneda_api/config/reset",{method:"POST"})}async function Ot(){try{return await Z("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function Ut(){return Z("/leneda_api/credentials")}async function Ma(t){const e=Gt(t);await Z("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Ca(t){const e=Gt(t);return Z("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Bt(){return Z("/leneda_api/ha-entities")}const Se=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:He,fetchCredentials:Ut,fetchCustomData:_a,fetchHAEntities:Bt,fetchMode:Ot,fetchPerMeterTimeseries:mt,fetchRangeData:Qe,fetchSensors:gt,fetchTimeseries:Ae,resetConfig:ka,saveConfig:xa,saveCredentials:Ma,testCredentials:Ca},Symbol.toStringTag,{value:"Module"}));function yt(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(e){const[,a,s,o]=e;return new Date(Number(a),Number(s)-1,Number(o))}return new Date(t)}function p(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function $e(t){return yt(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function qt(t){return yt(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function Pe(t){return yt(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}const tt=[{id:"year",label:"Year",shortLabel:"Yr",stepLabel:"year",approxMs:365*864e5,maxBuckets:30},{id:"month",label:"Month",shortLabel:"Mo",stepLabel:"month",approxMs:30*864e5,maxBuckets:72},{id:"week",label:"Week",shortLabel:"Wk",stepLabel:"week",approxMs:7*864e5,maxBuckets:104},{id:"day",label:"Day",shortLabel:"Day",stepLabel:"day",approxMs:864e5,maxBuckets:370},{id:"hour",label:"Hour",shortLabel:"Hr",stepLabel:"hour",approxMs:36e5,maxBuckets:744},{id:"quarter_hour",label:"15 min",shortLabel:"15m",stepLabel:"15 minutes",approxMs:15*6e4,maxBuckets:672}];function Yt(t){return tt.find(e=>e.id===t)??tt[3]}function vt(t,e){if(!t||!e)return 0;const a=new Date(t).getTime(),s=new Date(e).getTime();return!Number.isFinite(a)||!Number.isFinite(s)?0:Math.max(0,s-a)}function Ne(t,e){const a=Yt(t);if(e<=0)return t==="quarter_hour";const s=e/a.approxMs;return s>=1.5&&s<=a.maxBuckets}function Sa(t,e){var o;if(e&&Ne(e,t))return e;const a=t/864e5,s=a<=1.25?"quarter_hour":a<=7?"hour":a<=45?"day":a<=180?"week":a<=900?"month":"year";return Ne(s,t)?s:((o=tt.find(n=>Ne(n.id,t)))==null?void 0:o.id)??"quarter_hour"}function Ta(t,e){return new Date(t,e+1,0).getDate()}function St(t,e,a){const s=t.getDate(),o=new Date(t),n=o.getMonth()+a,r=o.getFullYear()+e+Math.floor(n/12),l=(n%12+12)%12,u=Math.min(s,Ta(r,l));return o.setFullYear(r,l,u),o}function Tt(t,e,a){switch(e){case"year":return St(t,a,0);case"month":return St(t,0,a);case"week":return new Date(t.getTime()+a*7*864e5);case"day":return new Date(t.getTime()+a*864e5);case"hour":return new Date(t.getTime()+a*36e5);case"quarter_hour":return new Date(t.getTime()+a*15*6e4)}}function jt(t,e,a,s){if(!t||!e)return null;const o=new Date(t),n=new Date(e);return!Number.isFinite(o.getTime())||!Number.isFinite(n.getTime())?null:{start:Tt(o,a,s),end:Tt(n,a,s)}}function Ea(t,e){if(!t||!e)return"No period loaded";const a=new Date(t),s=new Date(e);if(!Number.isFinite(a.getTime())||!Number.isFinite(s.getTime()))return"No period loaded";if(a.getFullYear()===s.getFullYear()&&a.getMonth()===s.getMonth()&&a.getDate()===s.getDate()){const n=a.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),r=a.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),l=s.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${n}, ${r} - ${l}`}return`${a.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})} - ${s.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}`}const Oe=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function de(t){const e=a=>`
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
      `)}}function Da(t){var Ke,fe,Ee,Ve,we,xe,ke,De;const e=t.rangeData,a=M=>{if(!M)return"";const E=M.match(/^(\d{4}-\d{2}-\d{2})/);return E?E[1]:""},s=(e==null?void 0:e.consumption)??0,o=(e==null?void 0:e.production)??0,n=(e==null?void 0:e.exported)??0,r=(e==null?void 0:e.self_consumed)??0,l=(e==null?void 0:e.gas_energy)??0,u=(e==null?void 0:e.gas_volume)??0,y=(e==null?void 0:e.peak_power_kw)??0,d=a(e==null?void 0:e.start),g=a(e==null?void 0:e.end),h=(e==null?void 0:e.shared_with_me)??0,f=(e==null?void 0:e.shared)??0,v=Math.max(0,n),$=(e==null?void 0:e.grid_import)!=null?s-e.grid_import:void 0,x=Math.max(0,$??(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(r>0?r:o-v)),C=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??Math.max(0,x-h)),k=x,_=Math.max(0,(e==null?void 0:e.grid_import)??s-x),S=s>0?s:_+x,i=!!((Ke=t.config)!=null&&Ke.meter_has_gas||(((fe=t.config)==null?void 0:fe.meters)??[]).some(M=>M.types.includes("gas"))),c=f+h,m=S>0?Math.min(100,x/S*100):0,b=Math.max(S,o,_,v,f,h,C,1),W=i?Math.min(Math.max(0,l),b):0,D=(M,E=2.8,F=8.2)=>M>0?E+M/b*(F-E):1.8,P=M=>D(M)+1.4,V=M=>D(M)+5.4,I=(M,E=.28,F=.88)=>M>0?E+M/b*(F-E):.1,j=(M,E=.09,F=.22)=>M>0?E+M/b*(F-E):.05,z=(M,E=1.6,F=3.9)=>`${(M>0?Math.max(E,F-M/b*(F-E)):F).toFixed(2)}s`,se=(M,E=3.4,F=5.8)=>M>0?E+M/b*(F-E):3,J=M=>M>0?Math.max(18,Math.round(M/b*100)):0,Q=M=>`
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
  `,q=M=>{const{x:E,y:F,width:G,accent:B,kicker:Me,value:ne,detail:oe}=M;return`
      <g class="scene-node-label" transform="translate(${E}, ${F})">
        <rect width="${G}" height="${oe?70:54}" rx="18" fill="var(--clr-overlay)" stroke="${B}" />
        <text x="16" y="22" class="scene-node-kicker">${Me}</text>
        <text x="16" y="${oe?39:37}" class="scene-node-value">${ne}</text>
        ${oe?`<text x="16" y="56" class="scene-node-detail">${oe}</text>`:""}
      </g>
    `},ue=M=>{const{x:E,y:F,scale:G=1,glowId:B}=M;return`
      <g class="scene-tier-icon scene-tier-grid" transform="translate(${E}, ${F}) scale(${G})">
        <circle cx="0" cy="44" r="48" fill="var(--clr-consumption)" fill-opacity="0.06" />
        <path d="M0 0 V88 M-24 20 H24 M-16 42 H16 M-8 66 H8" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" filter="url(#${B})" />
        <path d="M-12 88 L0 60 L12 88" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" fill="none" />
      </g>
    `},le=M=>{const{x:E,y:F,scale:G=1,glowId:B}=M;return`
      <g class="scene-tier-icon scene-tier-solar" transform="translate(${E}, ${F}) scale(${G})">
        <circle cx="0" cy="0" r="26" fill="var(--clr-production)" fill-opacity="0.09" />
        <circle cx="0" cy="0" r="12" fill="var(--clr-production)" fill-opacity="0.9" filter="url(#${B})" />
        <path d="M0 -26 V-40 M0 26 V40 M26 0 H40 M-26 0 H-40 M18 -18 L28 -28 M18 18 L28 28 M-18 18 L-28 28 M-18 -18 L-28 -28" stroke="var(--clr-production)" stroke-width="2.5" stroke-linecap="round" />
      </g>
    `},he=M=>{const{x:E,y:F,scale:G=1,glowId:B}=M;return`
      <g class="scene-tier-icon scene-tier-community" transform="translate(${E}, ${F}) scale(${G})">
        <circle cx="0" cy="40" r="50" fill="var(--clr-primary)" fill-opacity="0.06" />
        <rect x="-26" y="30" width="22" height="42" rx="6" fill="rgba(88, 166, 255, 0.08)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="6" y="16" width="24" height="56" rx="6" fill="rgba(88, 166, 255, 0.12)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="-2" y="4" width="6" height="10" rx="2" fill="var(--clr-primary)" fill-opacity="0.7" />
        <path d="M-14 12 H14 M-10 4 V20 M10 4 V20" stroke="var(--clr-primary)" stroke-width="2" stroke-linecap="round" filter="url(#${B})" />
      </g>
    `},U=M=>{const{x:E,y:F,scale:G=1,glowId:B}=M;return`
      <g class="scene-tier-icon scene-tier-gas" transform="translate(${E}, ${F}) scale(${G})">
        <circle cx="0" cy="38" r="46" fill="var(--clr-gas)" fill-opacity="0.08" />
        <path d="M-26 40 H-8 V72 H26" stroke="var(--clr-gas)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#${B})" />
        <path d="M0 4 C18 24 20 40 20 52 C20 70 9 84 0 84 C-9 84 -20 70 -20 52 C-20 38 -10 24 0 4 Z" fill="rgba(210, 153, 34, 0.14)" stroke="var(--clr-gas)" stroke-width="2.2" />
        <path d="M0 24 C9 35 10 44 10 52 C10 61 5 68 0 72 C-5 68 -10 61 -10 52 C-10 44 -8 35 0 24 Z" fill="var(--clr-gas)" fill-opacity="0.85" />
      </g>
    `},A=M=>{const{prefix:E,x:F,y:G,scale:B=1}=M;return`
      <g class="elite-house" transform="translate(${F}, ${G}) scale(${B})">
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
          <text text-anchor="middle" y="18" class="house-core-value">${p(m,0)}%</text>
        </g>
        <text x="90" y="262" text-anchor="middle" class="house-total-label">Home usage</text>
        <text x="90" y="284" text-anchor="middle" class="house-total-value">${p(S)} kWh</text>
      </g>
    `},N=M=>{const{path:E,value:F,gradientId:G,colorVar:B,filterId:Me,particleClass:ne,direction:oe="forward"}=M,We=oe==="reverse"?"1;0":"0;1";return`
      <path
        class="flow-halo ${ne}"
        d="${E}"
        stroke="url(#${G})"
        stroke-width="${V(F).toFixed(1)}"
        stroke-opacity="${j(F).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-rail ${ne}"
        d="${E}"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="${P(F).toFixed(1)}"
        stroke-opacity="0.42"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-stream ${ne}"
        d="${E}"
        stroke="url(#${G})"
        stroke-width="${D(F).toFixed(1)}"
        stroke-opacity="${I(F).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      ${F>0?`
        <circle
          class="flow-particle ${ne}"
          r="${se(F).toFixed(1)}"
          fill="${B}"
          filter="url(#${Me})"
        >
          <animateMotion dur="${z(F)}" repeatCount="indefinite" path="${E}" keyPoints="${We}" keyTimes="0;1" calcMode="linear" />
        </circle>
        <circle
          class="flow-particle flow-particle-secondary ${ne}"
          r="${Math.max(2.4,se(F)-1.2).toFixed(1)}"
          fill="${B}"
          fill-opacity="0.75"
          filter="url(#${Me})"
        >
          <animateMotion dur="${z(F)}" begin="-${(parseFloat(z(F))/2).toFixed(2)}s" repeatCount="indefinite" path="${E}" keyPoints="${We}" keyTimes="0;1" calcMode="linear" />
        </circle>
      `:""}
    `},re=()=>`
    <div class="elite-scene elite-scene-desktop">
      <svg class="elite-main-svg" viewBox="0 0 860 460" fill="none" preserveAspectRatio="xMidYMid meet">
        ${Q("desktop")}
        <rect x="34" y="30" width="792" height="372" rx="34" fill="url(#desktop-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="430" cy="330" rx="278" ry="60" fill="url(#desktop-house-base-glow)" opacity="0.56" />
        <line x1="98" y1="334" x2="762" y2="334" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.45" />

        ${q({x:58,y:108,width:152,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${p(_+v)} kWh`,detail:v>0?`In ${p(_)} / out ${p(v)} kWh`:void 0})}

        ${q({x:356,y:44,width:148,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${p(o)} kWh`,detail:`${p(x)} kWh used at home`})}

        ${q({x:624,y:108,width:184,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${p(c)} kWh`,detail:`Sent ${p(f)} / got ${p(h)} kWh`})}

        ${i?q({x:350,y:338,width:160,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${p(l)} kWh`,detail:u>0?`${p(u)} m3 in period`:"Gas meter active"}):""}

        ${ue({x:132,y:186,scale:1.02,glowId:"desktop-glow-red"})}
        ${le({x:430,y:126,glowId:"desktop-glow-green"})}
        ${he({x:716,y:194,glowId:"desktop-glow-cyan"})}
        ${i?U({x:430,y:352,glowId:"desktop-glow-gas"}):""}
        ${A({prefix:"desktop",x:340,y:96,scale:1.02})}

        ${N({path:"M 430 152 C 430 182 430 204 430 220",value:C,gradientId:"desktop-flow-solar",colorVar:"var(--clr-production)",filterId:"desktop-glow-green",particleClass:"flow-solar"})}

        ${N({path:"M 176 230 C 246 230 318 230 364 232",value:_,gradientId:"desktop-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"desktop-glow-red",particleClass:"flow-grid-in"})}

        ${N({path:"M 496 268 C 430 298 326 314 176 316",value:v,gradientId:"desktop-flow-grid-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-grid-out"})}

        ${N({path:"M 500 234 C 566 220 634 220 692 236",value:f,gradientId:"desktop-flow-shared-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-shared-out"})}

        ${N({path:"M 690 272 C 632 292 566 294 500 278",value:h,gradientId:"desktop-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"desktop-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${i?N({path:"M 430 404 C 430 370 430 336 430 302",value:W,gradientId:"desktop-flow-gas",colorVar:"var(--clr-gas)",filterId:"desktop-glow-gas",particleClass:"flow-gas"}):""}
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

        ${q({x:20,y:194,width:126,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${p(_+v)} kWh`})}

        ${q({x:274,y:194,width:126,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${p(c)} kWh`})}

        ${i?q({x:122,y:442,width:176,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${p(l)} kWh`,detail:u>0?`${p(u)} m3`:"Gas meter active"}):""}

        ${le({x:210,y:126,scale:.92,glowId:"mobile-glow-green"})}
        ${ue({x:76,y:254,scale:.86,glowId:"mobile-glow-red"})}
        ${he({x:344,y:260,scale:.86,glowId:"mobile-glow-cyan"})}
        ${i?U({x:210,y:442,scale:.9,glowId:"mobile-glow-gas"}):""}
        ${A({prefix:"mobile",x:118,y:166,scale:.94})}

        ${N({path:"M 210 152 C 210 188 210 216 210 238",value:C,gradientId:"mobile-flow-solar",colorVar:"var(--clr-production)",filterId:"mobile-glow-green",particleClass:"flow-solar"})}

        ${N({path:"M 104 286 C 138 286 168 286 194 286",value:_,gradientId:"mobile-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"mobile-glow-red",particleClass:"flow-grid-in"})}

        ${N({path:"M 226 318 C 194 340 162 348 102 350",value:v,gradientId:"mobile-flow-grid-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-grid-out"})}

        ${N({path:"M 226 286 C 262 274 294 274 318 286",value:f,gradientId:"mobile-flow-shared-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-shared-out"})}

        ${N({path:"M 318 320 C 294 332 262 334 226 322",value:h,gradientId:"mobile-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"mobile-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${i?N({path:"M 210 474 C 210 432 210 390 210 344",value:W,gradientId:"mobile-flow-gas",colorVar:"var(--clr-gas)",filterId:"mobile-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,te=e!=null&&e.start&&(e!=null&&e.end)?`${$e(e.start)} — ${$e(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${$e(t.customStart+"T00:00:00")} — ${$e(t.customEnd+"T00:00:00")}`:((Ee=Oe.find(M=>M.id===t.range))==null?void 0:Ee.label)??"Yesterday",_e=(we=(Ve=t.consumptionTimeseries)==null?void 0:Ve.items)!=null&&we.length?t.consumptionTimeseries.items:((xe=t.productionTimeseries)==null?void 0:xe.items)??[],Y=t.chartViewportStart??((ke=_e[0])==null?void 0:ke.startedAt)??(e==null?void 0:e.start),me=t.chartViewportEnd??((De=_e[_e.length-1])==null?void 0:De.startedAt)??(e==null?void 0:e.end),ae=vt(Y,me),ge=Yt(t.chartTimeBucket),Te=Ea(Y,me),ve=jt(Y,me,t.chartTimeBucket,1),X=new Date,Ue=!ve||ve.start.getTime()>X.getTime(),rt=tt.map(M=>{const E=Ne(M.id,ae),F=M.id===t.chartTimeBucket,G=M.id==="quarter_hour"?"15-minute detail would be too dense for this selected period":`${M.label} detail does not add useful resolution for this selected period`;return`
            <button
              class="unit-btn chart-bucket-btn ${F?"active":""}"
              data-chart-bucket="${M.id}"
              title="${E?`Show ${M.label.toLowerCase()} detail`:G}"
              ${E?"":'disabled aria-disabled="true"'}
            >${M.label}</button>
          `}).join(""),Be=t.chartUnit==="kw"?"kW uses the same detail presets as kWh, but keeps power values in interval bars so short spikes and dips stay visible.":"kWh keeps the aggregated period bars for totals.",ye=`${t.chartConsumptionView==="house"?"Total Usage shows the full house load, with the solar-covered share highlighted in green and exports below zero. Use the detail presets and arrows above the graph to move through time.":t.chartConsumptionView==="solar_systems"?"PV Systems stacks each configured solar production meter so you can compare panel-system output like the Home Assistant Energy dashboard.":"Net Grid focuses on what still came from the grid after solar, with exports shown below zero. The reference limit in kW mode applies here."} ${Be}`,ot=((e==null?void 0:e.exceedance_kwh)??0)>0?de("warning"):de("ok");return`
    <div class="dashboard" style="position: relative;">
      <div style="position:fixed;bottom:4px;right:4px;font-size:10px;opacity:0.5;pointer-events:none;z-index:9999;">v:2.10.2</div>

      <!-- Range Selector -->
      <div class="range-selector">
        ${Oe.map(M=>`
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
              <span class="flow-scene-chip solar">Solar coverage ${p(m,0)}%</span>
              <span class="flow-scene-chip import">Grid import ${p(_)} kWh</span>
              <span class="flow-scene-chip export">Export ${p(v)} kWh</span>
              <span class="flow-scene-chip community">Community ${p(c)} kWh</span>
              ${y>0?`<span class="flow-scene-chip neutral">Peak ${p(y,2)} kW</span>`:""}
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
                  ${p(m,0)}% of home usage solar-covered${y>0?` · Peak ${p(y,2)} kW`:""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${p(x)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${J(x)}%;"></span></div>
                  <p>Energy used inside the house${h>0?", including received community energy":""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${p(_)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${J(_)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${p(v)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${J(v)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${p(c)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${J(c)}%;"></span></div>
                  <p>Sent ${p(f)} kWh · received ${p(h)} kWh.</p>
                </div>
                ${i?`
                <div class="mobile-flow-item gas">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Gas to house</span>
                    <strong>${p(l)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${J(W||b)}%;"></span></div>
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
                  <span>${p(_)} kWh still needed from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${p(v)} kWh sent back to the market or grid</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${p(f)} kWh sent · ${p(h)} kWh received${h>0?" (included in solar to home)":""}</span>
                </span>
              </div>
              ${i?`
              <div class="flow-legend-item gas">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Gas to house</strong>
                  <span>${p(l)} kWh${u>0?` / ${p(u)} m3`:""}</span>
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
              <span class="metric-value">${p(m,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${m}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Consumed</span>
              <span class="metric-value">${p(k)} kWh</span>
            </div>
          </div>
          ${y>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${p(y,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label"><span class="metric-status-icon">${ot}</span> Exceedance</span>
              <span class="metric-value">${p((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${l>0||u>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${p(l)} kWh</span>
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
                ${Ue?'disabled aria-disabled="true"':""}
              >&rarr;</button>
            </div>

            <div class="chart-bucket-toggle" aria-label="Chart detail presets">
              ${rt}
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
  `}function Wa(t=""){return{iso:t,consumptionKw:0,productionKw:0,gridImportKw:0,solarExportKw:0}}function ze(t,e,a){for(const s of(e==null?void 0:e.items)??[]){const o=new Date(s.startedAt).getTime();if(!Number.isFinite(o))continue;const n=t.get(o)??Wa(s.startedAt);n[a]+=Math.max(0,Number(s.value)||0),n.iso||(n.iso=s.startedAt),t.set(o,n)}}function Fa(t,e,a={}){var r,l,u,y;const s=new Map,o=!!((l=(r=a.gridImport)==null?void 0:r.items)!=null&&l.length),n=!!((y=(u=a.marketExport)==null?void 0:u.items)!=null&&y.length);return ze(s,t,"consumptionKw"),ze(s,e,"productionKw"),ze(s,a.gridImport,"gridImportKw"),ze(s,a.marketExport,"solarExportKw"),[...s.entries()].sort((d,g)=>d[0]-g[0]).map(([d,g])=>{const h=Math.max(0,g.consumptionKw),f=Math.max(0,g.productionKw),v=Math.max(0,Math.min(h,f)),$=o?Math.max(0,g.gridImportKw):Math.max(0,h-v),x=Math.max(0,h-$),C=n?Math.max(0,g.solarExportKw):Math.max(0,f-v);return{timestamp:d,iso:g.iso||new Date(d).toISOString(),consumptionKw:h,productionKw:f,solarToHomeKw:x,gridImportKw:$,solarExportKw:C}})}function Ge(t,e){return Number.isFinite(t)?Number(t):e}function pt(t,e,a){return Math.min(a,Math.max(e,t))}function La(t,e,a){const s=t.reduce((h,f)=>h+f.producedKwh,0),o=t.reduce((h,f)=>h+f.selfConsumedKwh,0),n=t.reduce((h,f)=>h+f.exportedKwh,0),r=Ge(e,o),l=Ge(a,n),u=Math.max(0,r)+Math.max(0,l);if(s<=0)return{selfConsumedKwh:0,exportedKwh:0};if(u<=s+1e-6)return{selfConsumedKwh:pt(Math.max(0,r),0,s),exportedKwh:pt(Math.max(0,l),0,s)};const y=u>0?Math.max(0,r)/u:0,d=Math.min(s,Math.max(0,r)),g=pt(s*y,0,d);return{selfConsumedKwh:g,exportedKwh:Math.max(0,s-g)}}function Pa(t,e){const a=t?t.slice(-8):"";return a?`Solar ${e} (${a})`:`Solar ${e}`}function et(t,e,a){return(typeof a=="string"?a.trim():"")||Pa(t,e)}function ft(t){const e=(t.meters??[]).filter(o=>o.types.includes("production")),a=t.feed_in_rates??[],s=t.currency??"EUR";return e.map((o,n)=>{const r=a.find(g=>g.meter_id===o.id),l=(r==null?void 0:r.mode)==="sensor"&&r.sensor_value!=null&&Number.isFinite(r.sensor_value),u=l?(r==null?void 0:r.sensor_value)??0:Ge(r==null?void 0:r.tariff,Ge(t.feed_in_tariff,0)),y=Math.max(1,Math.round(Ge(r==null?void 0:r.self_use_priority,n+1))),d=et(o.id,n+1,r==null?void 0:r.display_name);return{meterId:o.id,shortId:o.id?"…"+o.id.slice(-8):`Meter ${n+1}`,displayName:d,rate:u,label:l?`Sensor (${u.toFixed(4)} ${s}/kWh)`:"Fixed tariff",mode:(r==null?void 0:r.mode)??"fixed",selfUsePriority:y}}).sort((o,n)=>o.selfUsePriority!==n.selfUsePriority?o.selfUsePriority-n.selfUsePriority:o.meterId.localeCompare(n.meterId))}function wt(t,e,a,s,o){var c;if(!e||!(a!=null&&a.length))return null;const n=ft(t);if(!n.length)return null;const r=new Map(a.map(m=>[m.meter_id,m]));if(!n.some(m=>r.has(m.meterId)))return null;const l=n.map(m=>({...m,producedKwh:0,selfConsumedKwh:0,exportedKwh:0,revenue:0,exportEquivalentForSelfUse:0})),u=new Map(l.map((m,b)=>[m.meterId,b])),y=new Map,d=new Set;for(const m of e.items)m.startedAt&&d.add(m.startedAt);const g=new Map;for(const m of e.items){const b=Math.max(0,Number(m.value)||0);g.set(m.startedAt,(g.get(m.startedAt)??0)+b)}for(const m of a){const b=new Map;for(const W of m.items??[]){const D=Math.max(0,Number(W.value)||0);b.set(W.startedAt,(b.get(W.startedAt)??0)+D),W.startedAt&&d.add(W.startedAt)}y.set(m.meter_id,b)}for(const m of[...d].sort()){let b=Math.max(0,g.get(m)??0);for(const W of l){const D=u.get(W.meterId);if(D==null)continue;const P=Math.max(0,((c=y.get(W.meterId))==null?void 0:c.get(m))??0),V=P*.25,I=Math.min(b,P),j=I*.25,z=Math.max(0,P-I)*.25;l[D].producedKwh+=V,l[D].selfConsumedKwh+=j,l[D].exportedKwh+=z,b=Math.max(0,b-I)}}const h=l.reduce((m,b)=>m+b.selfConsumedKwh,0),f=l.reduce((m,b)=>m+b.exportedKwh,0),v=La(l,s,o),$=v.selfConsumedKwh,x=v.exportedKwh,C=h>0?$/h:1,k=f>0?x/f:1;for(const m of l)m.selfConsumedKwh*=C,m.exportedKwh*=k,m.revenue=m.exportedKwh*m.rate,m.exportEquivalentForSelfUse=m.selfConsumedKwh*m.rate;const _=l.reduce((m,b)=>m+b.revenue,0),S=l.reduce((m,b)=>m+b.exportEquivalentForSelfUse,0),i=x>0?_/x:0;return{meters:l,totalFeedInRevenue:_,totalSelfUseExportEquivalent:S,weightedExportRate:i,usedPriorityAllocation:!0}}const Et=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],Re={house:"Total Usage",grid:"Net Grid",solar:"Solar Production",exceedance_kwh:"Exceedance kWh",exceedance_frequency:"Exceedance Rate"},Xe={house:"Total Usage",grid:"Net Grid",solar:"Solar Production"},Le={previous:"Previous Period",last_year:"Last Year"};function Dt(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function Ka(t){const e=new Date(t),a=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${a}-${s}-${o}`}function Va(t){const[e,a,s]=t.split("-").map(Number);return new Date(e,a-1,s,12,0,0,0)}function ie(t,e=0){return t.length?Math.max(...t):e}function $t(t,e=0){return t.length?Math.min(...t):e}function be(t,e,a){return Math.min(a,Math.max(e,t))}function O(t,e){if(!t.length)return 0;const a=[...t].sort((u,y)=>u-y),s=be(e,0,1),o=(a.length-1)*s,n=Math.floor(o),r=Math.ceil(o);if(n===r)return a[n];const l=o-n;return a[n]*(1-l)+a[r]*l}function Ra(t){const e=Math.floor(t/4),a=t%4*15;return`${String(e).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function R(t,e){return`${p(t,2)} ${e}`}function at(t,e){return`${t>0?"+":t<0?"-":""}${p(Math.abs(t),2)} ${e}`}function Ze(t,e=1){return Math.abs(t)<.005?"0":`${t>0?"+":""}${p(t,e)}`}function Wt(t){const[e,a]=t.split(":").map(s=>parseInt(s,10)||0);return e*60+a}function Ia(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function zt(t,e,a,s){if(!Ia(t.getDay(),e))return!1;const o=t.getHours()*60+t.getMinutes(),n=Wt(a),r=Wt(s);return n===r?!0:n<r?o>=n&&o<r:o>=n||o<r}function Aa(t,e){return e.find(a=>zt(t,a.day_group,a.start_time,a.end_time))}function Ha(t,e){return e.find(a=>zt(t,a.day_group,a.start_time,a.end_time))}function Xt(t,e,a,s,o){const n=wt(t,e,a,s,o);if(n&&n.weightedExportRate>0)return n.weightedExportRate;const r=ft(t).map(l=>l.rate).filter(l=>Number.isFinite(l)&&l>=0);return r.length?r.reduce((l,u)=>l+u,0)/r.length:t.feed_in_tariff??0}function Na(t,e,a,s,o,n){const r=o.consumption_rate_windows??[],l=o.reference_power_windows??[],u=o.reference_power_kw??0,y=(o.exceedance_rate??0)*(1+(o.vat_rate??0));return Fa(t,e,{gridImport:a,marketExport:s}).map(d=>{var b,W;const g=d.timestamp,h=new Date(g),f=d.consumptionKw,v=d.productionKw,$=d.solarToHomeKw,x=d.gridImportKw,C=d.solarExportKw,k=((b=Ha(h,l))==null?void 0:b.reference_power_kw)??u,_=Math.max(0,f-k),S=Math.max(0,x-k),i=Math.max(0,_-S),m=((((W=Aa(h,r))==null?void 0:W.rate)??o.energy_variable_rate??0)+(o.network_variable_rate??0)+(o.electricity_tax_rate??0)+(o.compensation_fund_rate??0))*(1+(o.vat_rate??0));return{timestamp:g,iso:d.iso,date:h,houseKw:f,solarKw:v,solarToHomeKw:$,gridKw:x,exportKw:C,referenceKw:k,overKw:S,avoidedOverKw:i,importRateWithVat:m,feedInRate:n,exceedanceRateWithVat:y}})}function Zt(t,e,a,s,o,n){const r=Na(t,e,a,s,o,n),l=new Map,u=Array.from({length:24},()=>0),y=Array.from({length:24},(i,c)=>({label:`${String(c).padStart(2,"0")}:00`,importCost:0,exportSpreadValue:0,gridKwh:0,exportKwh:0})),d={house:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),grid:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),solar:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_kwh:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_frequency:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0})))},g=()=>Array.from({length:96},()=>[]),h={house:{weekday:g(),weekend:g()},grid:{weekday:g(),weekend:g()},solar:{weekday:g(),weekend:g()}},f={houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0};for(const i of r){const m=Ka(i.timestamp),b=l.get(m)??(()=>{const ee=Va(m);return{key:m,label:ee.toLocaleDateString(void 0,{month:"short",day:"numeric"}),fullDate:ee.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0}})(),W=i.houseKw*.25,D=i.solarKw*.25,P=i.solarToHomeKw*.25,V=i.gridKw*.25,I=i.exportKw*.25,j=i.overKw*.25,z=i.avoidedOverKw*.25,se=V*i.importRateWithVat,J=P*i.importRateWithVat,Q=I*i.feedInRate,q=P*(i.importRateWithVat-i.feedInRate),ue=j*i.exceedanceRateWithVat,le=z*i.exceedanceRateWithVat,he=J+Q+le-se-ue;b.houseKwh+=W,b.solarKwh+=D,b.solarToHomeKwh+=P,b.gridKwh+=V,b.exportKwh+=I,b.exceedanceKwh+=j,b.avoidedExceedanceKwh+=z,b.importCost+=se,b.solarSavings+=J,b.exportRevenue+=Q,b.selfConsumptionAdvantage+=q,b.exceedanceCost+=ue,b.avoidedExceedanceValue+=le,b.netValue+=he,b.peakGridKw=Math.max(b.peakGridKw,i.gridKw),b.peakHouseKw=Math.max(b.peakHouseKw,i.houseKw),b.exceedanceIntervals+=i.overKw>0?1:0,l.set(m,b),f.houseKwh+=W,f.solarKwh+=D,f.solarToHomeKwh+=P,f.gridKwh+=V,f.exportKwh+=I,f.exceedanceKwh+=j,f.avoidedExceedanceKwh+=z,f.importCost+=se,f.solarSavings+=J,f.exportRevenue+=Q,f.selfConsumptionAdvantage+=q,f.exceedanceCost+=ue,f.avoidedExceedanceValue+=le,f.netValue+=he,f.peakGridKw=Math.max(f.peakGridKw,i.gridKw),f.peakHouseKw=Math.max(f.peakHouseKw,i.houseKw),f.exceedanceIntervals+=i.overKw>0?1:0;const U=(i.date.getDay()+6)%7,A=i.date.getHours(),N=A*4+Math.floor(i.date.getMinutes()/15),re=i.date.getDay()===0||i.date.getDay()===6?"weekend":"weekday";d.house[U][A].sum+=i.houseKw,d.house[U][A].count+=1,d.grid[U][A].sum+=i.gridKw,d.grid[U][A].count+=1,d.solar[U][A].sum+=i.solarKw,d.solar[U][A].count+=1,d.exceedance_kwh[U][A].sum+=j,d.exceedance_kwh[U][A].count+=1,d.exceedance_frequency[U][A].sum+=i.overKw>0?1:0,d.exceedance_frequency[U][A].count+=1,u[A]+=j,h.house[re][N].push(i.houseKw),h.grid[re][N].push(i.gridKw),h.solar[re][N].push(i.solarKw),y[A].importCost+=se,y[A].exportSpreadValue+=I*Math.max(i.importRateWithVat-i.feedInRate,0),y[A].gridKwh+=V,y[A].exportKwh+=I}const v=[...l.values()].sort((i,c)=>i.key.localeCompare(c.key)).map(i=>(i.coveragePct=i.houseKwh>0?i.solarToHomeKwh/i.houseKwh*100:0,i.selfConsumedPct=i.solarKwh>0?be(i.solarToHomeKwh/i.solarKwh*100,0,100):0,i.solarValue=i.solarSavings+i.exportRevenue+i.avoidedExceedanceValue,i));f.coveragePct=f.houseKwh>0?f.solarToHomeKwh/f.houseKwh*100:0,f.selfConsumedPct=f.solarKwh>0?be(f.solarToHomeKwh/f.solarKwh*100,0,100):0,f.solarValue=f.solarSavings+f.exportRevenue+f.avoidedExceedanceValue;const $={house:d.house.map(i=>i.map(c=>c.count?c.sum/c.count:0)),grid:d.grid.map(i=>i.map(c=>c.count?c.sum/c.count:0)),solar:d.solar.map(i=>i.map(c=>c.count?c.sum/c.count:0)),exceedance_kwh:d.exceedance_kwh.map(i=>i.map(c=>c.sum)),exceedance_frequency:d.exceedance_frequency.map(i=>i.map(c=>c.count?c.sum/c.count*100:0))},x=Array.from({length:96},(i,c)=>Ra(c)),C={house:{weekday:{lower:h.house.weekday.map(i=>O(i,.1)),median:h.house.weekday.map(i=>O(i,.5)),upper:h.house.weekday.map(i=>O(i,.9))},weekend:{lower:h.house.weekend.map(i=>O(i,.1)),median:h.house.weekend.map(i=>O(i,.5)),upper:h.house.weekend.map(i=>O(i,.9))}},grid:{weekday:{lower:h.grid.weekday.map(i=>O(i,.1)),median:h.grid.weekday.map(i=>O(i,.5)),upper:h.grid.weekday.map(i=>O(i,.9))},weekend:{lower:h.grid.weekend.map(i=>O(i,.1)),median:h.grid.weekend.map(i=>O(i,.5)),upper:h.grid.weekend.map(i=>O(i,.9))}},solar:{weekday:{lower:h.solar.weekday.map(i=>O(i,.1)),median:h.solar.weekday.map(i=>O(i,.5)),upper:h.solar.weekday.map(i=>O(i,.9))},weekend:{lower:h.solar.weekend.map(i=>O(i,.1)),median:h.solar.weekend.map(i=>O(i,.5)),upper:h.solar.weekend.map(i=>O(i,.9))}}},k=r.filter(i=>i.overKw>0).sort((i,c)=>c.overKw-i.overKw||c.timestamp-i.timestamp).slice(0,8),_=[...r].sort((i,c)=>c.houseKw-i.houseKw||c.timestamp-i.timestamp).slice(0,8),S=[...v].filter(i=>i.exceedanceKwh>0).sort((i,c)=>c.exceedanceKwh-i.exceedanceKwh).slice(0,6);return{points:r,daily:v,totals:f,topExceedances:k,peakIntervals:_,hourlyExceedanceKwh:u,heatmapValues:$,intradayProfiles:C,intradayLabels:x,hourlyOpportunity:y,loadDurationGrossKw:r.map(i=>i.houseKw).sort((i,c)=>c-i),loadDurationNetKw:r.map(i=>i.gridKw).sort((i,c)=>c-i),worstDays:S}}function Ga(t){var e,a,s;return(e=t.rangeData)!=null&&e.start&&((a=t.rangeData)!=null&&a.end)?`${$e(t.rangeData.start)} - ${$e(t.rangeData.end)}`:((s=Oe.find(o=>o.id===t.range))==null?void 0:s.label)??"Selected Period"}function Oa(t){var e,a;return(e=t.rangeData)!=null&&e.start&&((a=t.rangeData)!=null&&a.end)?`${Pe(t.rangeData.start)} - ${Pe(t.rangeData.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${t.customStart} - ${t.customEnd}`:"Based on the currently selected range."}function Ft(t){const e=t.analysisComparisonMode==="last_year"?"Same period last year":"Previous matched period";return t.analysisComparison?`${e}: ${Pe(t.analysisComparison.start)} - ${Pe(t.analysisComparison.end)}`:e}function Ua(t){switch(t){case"house":return{description:"Average hourly power by weekday for total house usage.",note:"Each cell shows the average kW seen in that weekday/hour slot over the selected period."};case"grid":return{description:"Average hourly power by weekday for remaining grid draw after solar.",note:"Each cell shows the average net-grid kW seen in that weekday/hour slot over the selected period."};case"solar":return{description:"Average hourly power by weekday for solar production.",note:"Each cell shows the average solar kW seen in that weekday/hour slot over the selected period."};case"exceedance_kwh":return{description:"Cumulative exceedance energy by weekday and hour, showing where the reference limit hurt the most.",note:"Each cell shows cumulative exceedance kWh recorded in that weekday/hour slot over the selected period."};case"exceedance_frequency":return{description:"How often each weekday/hour slot went over the reference limit.",note:"Each cell shows the share of 15-minute intervals in that weekday/hour slot that exceeded the reference limit."}}}function Ba(t,e){switch(t){case"house":case"grid":case"solar":return`${p(e,2)} kW average`;case"exceedance_kwh":return`${p(e,2)} kWh`;case"exceedance_frequency":return`${p(e,0)}% of intervals`}}function pe(t){const e=t.series.filter(m=>m.values.length>0);if(!e.length)return'<div class="analysis-empty">No chart data available for this period.</div>';const a=Math.max(...e.map(m=>m.values.length)),s=Math.max(720,a*24+92),o=244,n=50,r=20,l=18,u=30,y=e.flatMap(m=>m.values);t.referenceValue!=null&&y.push(t.referenceValue);let d=t.minValue??$t(y,0),g=t.maxValue??ie(y,1);d===g&&(g+=1,d=Math.min(0,d-1)),t.minValue==null&&(d=Math.min(0,d));const h=s-n-r,f=o-l-u,v=(m,b)=>b<=1?n+h/2:n+m*h/(b-1),$=m=>l+(g-m)/(g-d)*f,x=t.valueFormatter??(m=>p(m,1)),C=Array.from({length:4},(m,b)=>d+(g-d)/3*b),k=[0,Math.floor((a-1)/2),a-1].filter((m,b,W)=>W.indexOf(m)===b),_=C.map(m=>{const b=$(m);return`
      <line x1="${n}" y1="${b.toFixed(1)}" x2="${(s-r).toFixed(1)}" y2="${b.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${n-8}" y="${(b+4).toFixed(1)}" class="analysis-svg-tick">${x(m)}</text>
    `}).join(""),S=t.referenceValue!=null?(()=>{const m=$(t.referenceValue);return`
        <line x1="${n}" y1="${m.toFixed(1)}" x2="${(s-r).toFixed(1)}" y2="${m.toFixed(1)}" class="analysis-svg-reference" />
        ${t.referenceLabel?`<text x="${s-r}" y="${(m-8).toFixed(1)}" class="analysis-svg-reference-label">${t.referenceLabel}</text>`:""}
      `})():"",i=e.map(m=>{const b=m.values.map((D,P)=>{const V=v(P,m.values.length),I=$(D);return`${P===0?"M":"L"} ${V.toFixed(1)} ${I.toFixed(1)}`}).join(" "),W=m.values.length<=40?m.values.map((D,P)=>{const V=v(P,m.values.length),I=$(D);return`<circle cx="${V.toFixed(1)}" cy="${I.toFixed(1)}" r="2.6" fill="${m.color}" />`}).join(""):"";return`
      <path d="${b}" fill="none" stroke="${m.color}" stroke-width="2.5" ${m.dashed?'stroke-dasharray="6 4"':""} />
      ${W}
    `}).join(""),c=k.map(m=>{const b=v(m,a),W=t.labels[m]??`Point ${m+1}`;return`<text x="${b.toFixed(1)}" y="${o-8}" text-anchor="middle" class="analysis-svg-x-label">${W}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${s}" height="${o}" viewBox="0 0 ${s} ${o}" role="img" aria-label="${t.title??"Line chart"}">
        ${_}
        ${S}
        ${i}
        ${c}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      ${e.map(m=>`
        <span class="analysis-legend-item">
          <span class="analysis-legend-swatch" style="background:${m.color};"></span>
          <span>${m.label}</span>
        </span>
      `).join("")}
      ${t.referenceLabel?`
          <span class="analysis-legend-item">
            <span class="analysis-legend-swatch analysis-legend-swatch-dashed"></span>
            <span>${t.referenceLabel}</span>
          </span>
        `:""}
    </div>
  `}function qa(t){const e=t.series.filter(c=>c.band.median.length>0);if(!e.length)return'<div class="analysis-empty">No profile data available for this period.</div>';const a=Math.max(...e.map(c=>c.band.median.length)),s=Math.max(760,a*12+92),o=248,n=50,r=20,l=18,u=30,y=e.flatMap(c=>[...c.band.lower,...c.band.median,...c.band.upper]),d=Math.min(0,$t(y,0));let g=ie(y,1);g<=d&&(g=d+1);const h=s-n-r,f=o-l-u,v=(c,m)=>m<=1?n+h/2:n+c*h/(m-1),$=c=>l+(g-c)/(g-d)*f,x=t.valueFormatter??(c=>p(c,1)),C=Array.from({length:4},(c,m)=>d+(g-d)/3*m),k=[0,16,32,48,64,80,a-1].filter((c,m,b)=>c>=0&&c<a&&b.indexOf(c)===m),_=C.map(c=>{const m=$(c);return`
      <line x1="${n}" y1="${m.toFixed(1)}" x2="${(s-r).toFixed(1)}" y2="${m.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${n-8}" y="${(m+4).toFixed(1)}" class="analysis-svg-tick">${x(c)}</text>
    `}).join(""),S=e.map(c=>{const m=c.band.upper.map((D,P)=>{const V=v(P,c.band.upper.length),I=$(D);return`${P===0?"M":"L"} ${V.toFixed(1)} ${I.toFixed(1)}`}).join(" "),b=[...c.band.lower].reverse().map((D,P)=>{const V=c.band.lower.length-1-P,I=v(V,c.band.lower.length),j=$(D);return`L ${I.toFixed(1)} ${j.toFixed(1)}`}).join(" "),W=c.band.median.map((D,P)=>{const V=v(P,c.band.median.length),I=$(D);return`${P===0?"M":"L"} ${V.toFixed(1)} ${I.toFixed(1)}`}).join(" ");return`
      <path d="${m} ${b} Z" fill="${c.fill}" stroke="none" />
      <path d="${W}" fill="none" stroke="${c.color}" stroke-width="2.4" ${c.dashed?'stroke-dasharray="6 4"':""} />
    `}).join(""),i=k.map(c=>{const m=v(c,a),b=t.labels[c]??`Point ${c+1}`;return`<text x="${m.toFixed(1)}" y="${o-8}" text-anchor="middle" class="analysis-svg-x-label">${b}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${s}" height="${o}" viewBox="0 0 ${s} ${o}" role="img" aria-label="${t.title??"Band chart"}">
        ${_}
        ${S}
        ${i}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      ${e.map(c=>`
        <span class="analysis-legend-item">
          <span class="analysis-legend-swatch" style="background:${c.color};"></span>
          <span>${c.label}</span>
        </span>
      `).join("")}
    </div>
  `}function Ya(t){const e=new Date(t.timestamp);return{date:e.toLocaleDateString(void 0,{month:"short",day:"numeric"}),time:e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}}function ja(t){if(!t.length)return'<div class="analysis-empty">No peak intervals available for this period.</div>';const e=Math.max(760,t.length*86+96),a=276,s=52,o=16,n=18,r=54,l=ie(t.map($=>$.houseKw),1),u=e-s-o,y=a-n-r,d=n+y,g=u/t.length,h=Math.max(22,Math.min(38,g*.54)),f=t.map(($,x)=>{const C=s+x*g+(g-h)/2,k=$.solarToHomeKw/l*y,S=Math.max(0,Math.min($.gridKw,$.referenceKw))/l*y,i=Math.max(0,$.gridKw-$.referenceKw)/l*y;return`
      <g>
        <rect x="${C.toFixed(1)}" y="${(d-k).toFixed(1)}" width="${h.toFixed(1)}" height="${k.toFixed(1)}" rx="4" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${C.toFixed(1)}" y="${(d-k-S).toFixed(1)}" width="${h.toFixed(1)}" height="${S.toFixed(1)}" rx="4" fill="rgba(248, 81, 73, 0.62)" />
        ${i>0?`<rect x="${C.toFixed(1)}" y="${(d-k-S-i).toFixed(1)}" width="${h.toFixed(1)}" height="${i.toFixed(1)}" rx="4" fill="rgba(210, 153, 34, 0.92)" />`:""}
      </g>
    `}).join(""),v=t.map(($,x)=>{const C=s+x*g+g/2,{date:k,time:_}=Ya($);return`
      <text x="${C.toFixed(1)}" y="${a-20}" text-anchor="middle" class="analysis-svg-x-label">
        <tspan x="${C.toFixed(1)}" dy="0">${k}</tspan>
        <tspan x="${C.toFixed(1)}" dy="12">${_}</tspan>
      </text>
    `}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${a}" viewBox="0 0 ${e} ${a}" role="img" aria-label="Peak interval anatomy">
        <line x1="${s}" y1="${d.toFixed(1)}" x2="${(e-o).toFixed(1)}" y2="${d.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${s-8}" y="${(n+4).toFixed(1)}" class="analysis-svg-tick">${p(l,1)} kW</text>
        ${f}
        ${v}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.62);"></span><span>Grid within reference</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(210, 153, 34, 0.92);"></span><span>Grid over reference</span></span>
    </div>
  `}function za(t){if(!t.length)return'<div class="analysis-empty">No daily energy data available.</div>';const e=Math.max(760,t.length*28+84),a=250,s=52,o=16,n=18,r=34,l=ie(t.map(_=>_.houseKwh),1),u=ie(t.map(_=>_.exportKwh),0),y=e-s-o,d=a-n-r,g=u>0?d*.72:d,h=u>0?d-g:0,f=n+g,v=y/t.length,$=Math.max(8,Math.min(18,v*.62)),x=Math.max(1,Math.ceil(t.length/10)),C=t.map((_,S)=>{const i=s+S*v+(v-$)/2,c=_.solarToHomeKwh/l*g,m=_.gridKwh/l*g,b=u>0?_.exportKwh/u*h:0,W=f-c-m-8;return`
      <g>
        <rect x="${i.toFixed(1)}" y="${(f-c).toFixed(1)}" width="${$.toFixed(1)}" height="${c.toFixed(1)}" rx="3" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${i.toFixed(1)}" y="${(f-c-m).toFixed(1)}" width="${$.toFixed(1)}" height="${m.toFixed(1)}" rx="3" fill="rgba(248, 81, 73, 0.55)" />
        ${b>0?`<rect x="${i.toFixed(1)}" y="${f.toFixed(1)}" width="${$.toFixed(1)}" height="${b.toFixed(1)}" rx="3" fill="rgba(88, 166, 255, 0.75)" />`:""}
        ${_.exceedanceKwh>0?`<circle cx="${(i+$/2).toFixed(1)}" cy="${W.toFixed(1)}" r="3.2" fill="#d29922" />`:""}
      </g>
    `}).join(""),k=t.map((_,S)=>S%x!==0&&S!==t.length-1?"":`<text x="${(s+S*v+v/2).toFixed(1)}" y="${a-10}" text-anchor="middle" class="analysis-svg-x-label">${_.label}</text>`).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${a}" viewBox="0 0 ${e} ${a}" role="img" aria-label="Daily energy breakdown">
        <line x1="${s}" y1="${f.toFixed(1)}" x2="${(e-o).toFixed(1)}" y2="${f.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${s-8}" y="${(n+4).toFixed(1)}" class="analysis-svg-tick">${p(l,0)} kWh</text>
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
  `}function Xa(t,e){const a=be(e,0,1);return t==="solar"?`rgba(63, 185, 80, ${.12+a*.82})`:t==="exceedance_kwh"||t==="exceedance_frequency"?`rgba(210, 153, 34, ${.14+a*.82})`:t==="grid"?`rgba(210, 153, 34, ${.12+a*.82})`:`rgba(248, 81, 73, ${.12+a*.82})`}function Za(t,e){const a=t.flat(),s=ie(a,1),o=$t(a,0);return`
    <div class="analysis-heatmap">
      <div class="analysis-heatmap-hours">
        <span class="analysis-heatmap-corner"></span>
        ${Array.from({length:24},(n,r)=>`
          <span class="analysis-heatmap-hour ${r%2===1?"analysis-heatmap-hour-faded":""}">${String(r).padStart(2,"0")}</span>
        `).join("")}
      </div>
      ${t.map((n,r)=>`
        <div class="analysis-heatmap-row">
          <span class="analysis-heatmap-day">${Et[r]}</span>
          ${n.map((l,u)=>{const y=s===o?0:(l-o)/(s-o);return`
              <span
                class="analysis-heatmap-cell"
                style="background:${Xa(e,y)};"
                title="${Et[r]} ${String(u).padStart(2,"0")}:00 - ${Ba(e,l)}"
              >${l>(e==="exceedance_frequency"?1:.05)?p(l,e==="exceedance_frequency"?0:1):""}</span>
            `}).join("")}
        </div>
      `).join("")}
    </div>
  `}function st(t){const e=ie(t.map(a=>a.value),1);return t.length?`
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
  `:'<div class="analysis-empty">No standout patterns in this period.</div>'}function Ja(t){var s,o,n,r;const e=Dt(((s=t.rangeData)==null?void 0:s.start)??t.customStart),a=Dt(((o=t.rangeData)==null?void 0:o.end)??t.customEnd);return`
    <div class="range-selector">
      ${Oe.map(l=>`
        <button
          class="range-btn ${l.id===t.range?"active":""}"
          data-range="${l.id}"
        >${l.label}</button>
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
  `}function Qa(t,e,a){const s=a.communitySolarToHomeKwh>.01?`${p(a.totalSolarCoverageKwh)} kWh of ${p(a.consumptionKwh)} kWh usage covered, incl. ${p(a.communitySolarToHomeKwh)} kWh shared`:`${p(a.totalSolarCoverageKwh)} kWh of ${p(a.consumptionKwh)} kWh usage covered`;return`
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
        <strong class="analysis-stat-value">${at(a.selfConsumptionAdvantage,e)}</strong>
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
  `}function es(t){return`
    <div class="card analysis-card analysis-card-full">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Daily Breakdown</h3>
          <p class="analysis-card-copy">House usage is split into solar-covered energy, grid energy, and exported surplus. A gold marker flags days with any reference-power exceedance.</p>
        </div>
      </div>
      ${za(t.daily)}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily exceedance volume</h4>
        ${pe({title:"Daily exceedance volume",series:[{label:"Exceedance",color:"#d29922",values:t.daily.map(e=>e.exceedanceKwh)}],labels:t.daily.map(e=>e.label),valueFormatter:e=>`${p(e,2)} kWh`})}
      </div>
    </div>
  `}function ts(t,e){const a=Ua(t.analysisHeatmapMetric);return`
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
      ${Za(e.heatmapValues[t.analysisHeatmapMetric],t.analysisHeatmapMetric)}
      <p class="analysis-note">${a.note}</p>
    </div>
  `}function as(t,e){const a=t.analysisProfileMetric,s=e.intradayProfiles[a],o=Xe[a],n=s.weekday.median.reduce((l,u,y,d)=>u>d[l]?y:l,0),r=s.weekend.median.reduce((l,u,y,d)=>u>d[l]?y:l,0);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Intraday Profile</h3>
          <p class="analysis-card-copy">A typical day view for ${o.toLowerCase()}, split between weekdays and weekends. The band shows the p10 to p90 range and the line is the median interval.</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${a==="house"?"active":""}" data-analysis-profile="house">${Xe.house}</button>
          <button class="unit-btn ${a==="grid"?"active":""}" data-analysis-profile="grid">${Xe.grid}</button>
          <button class="unit-btn ${a==="solar"?"active":""}" data-analysis-profile="solar">${Xe.solar}</button>
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
      ${qa({title:`${o} intraday profile`,labels:e.intradayLabels,series:[{label:"Weekday median (p10-p90 band)",color:"#58a6ff",fill:"rgba(88, 166, 255, 0.14)",band:s.weekday},{label:"Weekend median (p10-p90 band)",color:"#d29922",fill:"rgba(210, 153, 34, 0.13)",band:s.weekend,dashed:!0}],valueFormatter:l=>`${p(l,1)} kW`})}
      <p class="analysis-note">This makes the typical daily rhythm much easier to read than the weekday/hour heatmap alone.</p>
    </div>
  `}function ss(t,e,a){const s=t.meters.reduce((n,r)=>n+r.selfConsumedKwh*e,0),o=s+t.totalFeedInRevenue;return`
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
            ${t.meters.map(n=>{const r=n.selfConsumedKwh*e,l=r+n.revenue;return`
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
                  <td>${R(l,a)}</td>
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
  `}function rs(t,e,a,s){const o=t.totals.solarKwh>0?be(t.totals.solarToHomeKwh/t.totals.solarKwh*100,0,100):0,n=t.totals.solarKwh>0?be(t.totals.exportKwh/t.totals.solarKwh*100,0,100):0;return`
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
          <strong>${at(t.totals.selfConsumptionAdvantage,e)}</strong>
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
      ${a!=null&&a.meters.length?ss(a,s,e):""}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Coverage of house usage by day</h4>
        ${pe({title:"Daily solar coverage",series:[{label:"Coverage",color:"#3fb950",values:t.daily.map(r=>r.coveragePct)}],labels:t.daily.map(r=>r.label),maxValue:100,minValue:0,valueFormatter:r=>`${p(r,0)}%`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day</h4>
        ${pe({title:"Daily solar value",series:[{label:"Solar value",color:"#58a6ff",values:t.daily.map(r=>r.solarValue)}],labels:t.daily.map(r=>r.label),valueFormatter:r=>R(r,e)})}
      </div>
    </div>
  `}function ns(t,e){const a=[...t.hourlyOpportunity].sort((r,l)=>l.importCost-r.importCost)[0],s=[...t.hourlyOpportunity].sort((r,l)=>l.exportSpreadValue-r.exportSpreadValue)[0],o=[...t.hourlyOpportunity].filter(r=>r.importCost>0).sort((r,l)=>l.importCost-r.importCost).slice(0,5).map(r=>({label:r.label,value:r.importCost,meta:`${R(r.importCost,e)} from ${p(r.gridKwh,1)} kWh`})),n=[...t.hourlyOpportunity].filter(r=>r.exportSpreadValue>0).sort((r,l)=>l.exportSpreadValue-r.exportSpreadValue).slice(0,5).map(r=>({label:r.label,value:r.exportSpreadValue,meta:`${R(r.exportSpreadValue,e)} on ${p(r.exportKwh,1)} kWh`,colorClass:"analysis-progress-fill-warn"}));return`
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
          <strong>${R(t.hourlyOpportunity.reduce((r,l)=>r+l.importCost,0),e)}</strong>
          <span class="analysis-stat-meta">Variable import cost grouped by hour of day</span>
        </div>
        <div>
          <span class="analysis-inline-label">Export spread opportunity</span>
          <strong>${R(t.hourlyOpportunity.reduce((r,l)=>r+l.exportSpreadValue,0),e)}</strong>
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
          ${st(o)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Best export-to-storage hours</h4>
          ${st(n)}
        </div>
      </div>
      <p class="analysis-note">Export spread opportunity uses the difference between the import rate and feed-in rate for exported energy in that hour, so it is a directional indicator rather than a billing line item.</p>
    </div>
  `}function os(t,e){const a=t.hourlyExceedanceKwh.map((s,o)=>({label:`${String(o).padStart(2,"0")}:00`,value:s,meta:`${p(s,2)} kWh`,colorClass:"analysis-progress-fill-warn"})).filter(s=>s.value>0).sort((s,o)=>o.value-s.value).slice(0,6);return`
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
          ${st(a)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Worst days</h4>
          ${st(t.worstDays.map(s=>({label:s.fullDate,value:s.exceedanceKwh,meta:`${p(s.exceedanceKwh,2)} kWh`,colorClass:"analysis-progress-fill-warn"})))}
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
                      <td>${qt(s.iso)}</td>
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
  `}function is(t){const e=t.peakIntervals.length?t.peakIntervals.reduce((a,s)=>a+(s.houseKw>0?s.solarToHomeKw/s.houseKw*100:0),0)/t.peakIntervals.length:0;return`
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
      ${ja(t.peakIntervals)}
      <p class="analysis-note">A gold cap only appears when the grid portion of the interval exceeded the configured reference power.</p>
    </div>
  `}function ls(t,e,a){var u,y;const s=e.analysisComparisonMode==="last_year"?"Last year":"Previous";if(e.analysisComparisonLoading)return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${Ft(e)}</p>
          </div>
          <div class="chart-unit-toggle">
            <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${Le.previous}</button>
            <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${Le.last_year}</button>
          </div>
        </div>
        <div class="analysis-empty">Loading comparison period...</div>
      </div>
    `;if(!((u=e.analysisComparison)!=null&&u.consumptionTimeseries)||!((y=e.analysisComparison)!=null&&y.productionTimeseries))return`
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
    `;const o=Xt(a,e.analysisComparison.consumptionTimeseries,null,void 0,void 0),n=Zt(e.analysisComparison.consumptionTimeseries,e.analysisComparison.productionTimeseries,e.analysisComparison.gridImportTimeseries,e.analysisComparison.marketExportTimeseries,a,o),r=Math.max(t.daily.length,n.daily.length,1),l=Array.from({length:r},(d,g)=>`D${g+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Period Comparison</h3>
          <p class="analysis-card-copy">${Ft(e)}</p>
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
          <span class="analysis-compare-delta">${Ze(t.totals.houseKwh-n.totals.houseKwh)} kWh vs ${s.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Net grid usage</span>
          <strong>${p(t.totals.gridKwh)} kWh</strong>
          <span class="analysis-compare-delta">${Ze(t.totals.gridKwh-n.totals.gridKwh)} kWh vs ${s.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar coverage</span>
          <strong>${p(t.totals.coveragePct,1)}%</strong>
          <span class="analysis-compare-delta">${Ze(t.totals.coveragePct-n.totals.coveragePct)} pts vs ${s.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar value</span>
          <strong>${R(t.totals.solarValue,a.currency||"EUR")}</strong>
          <span class="analysis-compare-delta">${Ze(t.totals.solarValue-n.totals.solarValue,2)} ${a.currency||"EUR"} vs ${s.toLowerCase()}</span>
        </div>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Usage by day index</h4>
        ${pe({title:`Current versus ${s.toLowerCase()} usage`,series:[{label:"Current",color:"#f85149",values:t.daily.map(d=>d.houseKwh)},{label:s,color:"#58a6ff",values:n.daily.map(d=>d.houseKwh),dashed:!0}],labels:l,valueFormatter:d=>`${p(d,1)} kWh`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day index</h4>
        ${pe({title:`Current versus ${s.toLowerCase()} solar value`,series:[{label:"Current",color:"#3fb950",values:t.daily.map(d=>d.solarValue)},{label:s,color:"#d29922",values:n.daily.map(d=>d.solarValue),dashed:!0}],labels:l,valueFormatter:d=>R(d,a.currency||"EUR")})}
      </div>
    </div>
  `}function cs(t,e){return`
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
        ${pe({title:"Daily net energy value",series:[{label:"Net value",color:"#39c5cf",values:t.daily.map(a=>a.netValue)}],labels:t.daily.map(a=>a.label),referenceValue:0,referenceLabel:"Break-even",valueFormatter:a=>at(a,e)})}
      </div>
      <div class="analysis-cost-totals">
        <span>Import cost: <strong>${R(t.totals.importCost,e)}</strong></span>
        <span>Solar savings: <strong>${R(t.totals.solarSavings,e)}</strong></span>
        <span>Export earnings: <strong>${R(t.totals.exportRevenue,e)}</strong></span>
        <span>Exceedance cost: <strong>${R(t.totals.exceedanceCost,e)}</strong></span>
        <span>Net value: <strong>${at(t.totals.netValue,e)}</strong></span>
      </div>
    </div>
  `}function ds(t,e){const a=Array.from({length:Math.max(t.loadDurationGrossKw.length,t.loadDurationNetKw.length,1)},(s,o)=>`${o+1}`);return`
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
  `}function ps(t){var i,c;const e=t.config,a=t.rangeData,s=t.consumptionTimeseries,o=t.productionTimeseries;if(!e||!a||!s||!o)return`
      <section class="analysis-view">
        <div class="card">
          <p class="muted">Loading analysis data...</p>
        </div>
      </section>
    `;const n=Math.max(0,a.consumption??0),r=Math.max(0,a.production??0),l=Math.max(0,a.exported??0),u=Math.max(0,a.direct_solar_to_home??(a.self_consumed&&a.self_consumed>0?a.self_consumed:0)),y=Math.max(0,(a.grid_import!=null?n-a.grid_import:void 0)??a.solar_to_home??u??(a.self_consumed&&a.self_consumed>0?a.self_consumed:r-l)),d=Math.max(0,a.grid_import??n-y),g=Math.max(0,y-u),h=wt(e,s,((i=t.perMeterProductionTimeseries)==null?void 0:i.meters)??null,u,l),f=Xt(e,s,((c=t.perMeterProductionTimeseries)==null?void 0:c.meters)??null,u,l),v=Zt(s,o,t.gridImportTimeseries,t.marketExportTimeseries,e,f),$=e.currency||"EUR",x=((e.energy_variable_rate??0)+(e.network_variable_rate??0)+(e.electricity_tax_rate??0)+(e.compensation_fund_rate??0))*(1+(e.vat_rate??0)),C=u*x,k=h?h.totalSelfUseExportEquivalent:u*f,_=h?h.totalFeedInRevenue:l*f,S={consumptionKwh:n,totalSolarCoverageKwh:y,directSolarToHomeKwh:u,communitySolarToHomeKwh:g,exportedKwh:l,billedGridImportKwh:d,coveragePct:n>0?be(y/n*100,0,100):0,selfConsumedPct:r>0?be(u/r*100,0,100):0,totalSolarValue:C+v.totals.avoidedExceedanceValue+_,selfConsumptionAdvantage:C-k,variableImportCost:d*x};return`
    <section class="analysis-view">
      <div class="section-header analysis-section-header">
        <div>
          <span class="badge">Analysis</span>
          <h2>Charts and Optimization</h2>
          <p class="muted">Deeper electricity analysis for ${Ga(t)}. This page is built from the same 15-minute data and billing settings that drive the dashboard and invoice.</p>
        </div>
        <div class="analysis-header-meta">
          <span>${Oa(t)}</span>
          <span>${p(v.daily.length,0)} day${v.daily.length===1?"":"s"} analysed</span>
        </div>
      </div>

      ${Ja(t)}
      ${Qa(v,$,S)}
      ${es(v)}

      <div class="analysis-grid">
        ${as(t,v)}
        ${ts(t,v)}
      </div>

      <div class="analysis-grid">
        ${rs(v,$,h,x)}
        ${ns(v,$)}
      </div>

      <div class="analysis-grid">
        ${os(v,$)}
        ${ls(v,t,e)}
      </div>

      <div class="analysis-grid">
        ${cs(v,$)}
        ${ds(v,e.reference_power_kw??0)}
      </div>

      ${is(v)}
    </section>
  `}const Lt={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function us(t){return Lt[t]?Lt[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function hs(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],a=[],s=[],o=[],n=[];for(const l of t.sensors){const u=l.key;u.startsWith("c_")||u==="1-1:1.29.0"||u==="1-1:3.29.0"?e.push(l):u.startsWith("p_")||u==="1-1:2.29.0"||u==="1-1:4.29.0"?a.push(l):u.startsWith("s_")||u.startsWith("1-65:")?s.push(l):u.startsWith("g_")||u.startsWith("7-")?o.push(l):n.push(l)}const r=(l,u,y,d)=>y.length?`
      <div class="card sensor-group">
        <h3 class="card-title"><span class="title-icon">${u}</span> ${l} <span class="badge">${y.length}</span></h3>
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
              ${y.map(g=>`
                <tr>
                  <td class="sensor-name">${us(g.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${d});">${p(g.value)}</td>
                  <td class="sensor-unit">${g.unit}</td>
                  <td class="sensor-peak">${g.peak_timestamp?qt(g.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
  `}const Pt=[{kw:3,fixedMonthlyFee:7.42},{kw:7,fixedMonthlyFee:12.84},{kw:12,fixedMonthlyFee:19.61},{kw:17,fixedMonthlyFee:26.39},{kw:27,fixedMonthlyFee:39.94},{kw:43,fixedMonthlyFee:61.62},{kw:70,fixedMonthlyFee:98.2},{kw:100,fixedMonthlyFee:138.85},{kw:150,fixedMonthlyFee:206.6,existingContractsOnly:!0},{kw:200,fixedMonthlyFee:274.35,existingContractsOnly:!0}];function Je(t){if(!t)return null;const e=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(e){const[,s,o,n]=e;return new Date(Number(s),Number(o)-1,Number(n))}const a=new Date(t);return Number.isNaN(a.getTime())?null:new Date(a.getFullYear(),a.getMonth(),a.getDate())}function Kt(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function ms(t,e,a,s,o){const n=new Date,r=Je(s),l=Je(o);let u=r,y=l;if(!u||!y)switch(t){case"yesterday":{const v=new Date(n);v.setDate(v.getDate()-1),u=new Date(v.getFullYear(),v.getMonth(),v.getDate()),y=new Date(u);break}case"this_week":{const v=new Date(n),$=v.getDay()||7;u=new Date(v.getFullYear(),v.getMonth(),v.getDate()-$+1),y=new Date(n.getFullYear(),n.getMonth(),n.getDate());break}case"last_week":{const v=new Date(n),$=v.getDay()||7,x=new Date(v.getFullYear(),v.getMonth(),v.getDate()-$+1);u=new Date(x.getFullYear(),x.getMonth(),x.getDate()-7),y=new Date(x.getFullYear(),x.getMonth(),x.getDate()-1);break}case"this_month":{u=new Date(n.getFullYear(),n.getMonth(),1),y=new Date(n.getFullYear(),n.getMonth(),n.getDate());break}case"last_month":{u=new Date(n.getFullYear(),n.getMonth()-1,1),y=new Date(n.getFullYear(),n.getMonth(),0);break}case"this_year":{u=new Date(n.getFullYear(),0,1),y=new Date(n.getFullYear(),n.getMonth(),n.getDate());break}case"last_year":{u=new Date(n.getFullYear()-1,0,1),y=new Date(n.getFullYear()-1,11,31);break}case"custom":{u=Je(e)??new Date(n.getFullYear(),n.getMonth(),n.getDate()),y=Je(a)??new Date(u);break}default:{u=new Date(n.getFullYear(),n.getMonth(),n.getDate()-1),y=new Date(u);break}}if(y<u){const v=u;u=y,y=v}let d=0,g=0;const h=new Date(u);for(;h<=y;){const v=new Date(h.getFullYear(),h.getMonth()+1,0).getDate();g+=1/v,d+=1,h.setDate(h.getDate()+1)}const f=u.getFullYear()===y.getFullYear()&&u.getMonth()===y.getMonth()&&u.getDate()===1&&y.getDate()===new Date(y.getFullYear(),y.getMonth()+1,0).getDate();return{days:d,factor:g,label:f?"full month":`${d} day${d===1?"":"s"}`}}function gs(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function Vt(t){const[e,a]=t.split(":").map(s=>parseInt(s,10)||0);return e*60+a}function Jt(t,e,a,s){if(!gs(t.getDay(),e))return!1;const o=t.getHours()*60+t.getMinutes(),n=Vt(a),r=Vt(s);return n===r?!0:n<r?o>=n&&o<r:o>=n||o<r}function vs(t,e){return e.find(a=>Jt(t,a.day_group,a.start_time,a.end_time))}function ys(t,e){return e.find(a=>Jt(t,a.day_group,a.start_time,a.end_time))}function Rt(t,e,a,s,o,n=[]){var f;const r=new Map;let l=0,u=0,y=0,d=0,g=0;const h=new Map;for(const v of n){const $=Number(v.value)||0;h.set(v.startedAt,(h.get(v.startedAt)??0)+$)}for(const v of t){const $=Number(v.value)||0,x=$*.25,C=h.get(v.startedAt)??0,k=Math.max(0,$-C),_=new Date(v.startedAt);if(Number.isNaN(_.getTime()))continue;const S=vs(_,s),i=ys(_,o),c=(S==null?void 0:S.rate)??e,m=((f=S==null?void 0:S.label)==null?void 0:f.trim())||"Base tariff",b=(i==null?void 0:i.reference_power_kw)??a;l+=x*c,g=Math.max(g,$),d=Math.max(d,k),$>b&&(y+=($-b)*.25),k>b&&(u+=(k-b)*.25);const W=`${m}__${c}`,D=r.get(W);D?D.kwh+=x:r.set(W,{label:m,rate:c,kwh:x})}return{energyCost:l,exceedanceKwh:u,grossExceedanceKwh:y,avoidedExceedanceKwh:Math.max(0,y-u),peakPowerKw:d,grossPeakPowerKw:g,rateBreakdown:Array.from(r.values()).sort((v,$)=>v.label.localeCompare($.label))}}function fs(t){var _t,xt;const e=t.config,a=t.rangeData;if(!e||!a)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const s=a.consumption||0,o=a.production||0,n=a.exported||0,r=Math.max(0,n),l=Math.max(0,(a.grid_import!=null?s-a.grid_import:void 0)??a.solar_to_home??a.direct_solar_to_home??(a.self_consumed&&a.self_consumed>0?a.self_consumed:o-r)),u=Math.min(l,Math.max(0,a.direct_solar_to_home??(a.self_consumed&&a.self_consumed>0?a.self_consumed:o-r))),y=Math.max(0,l-u),d=Math.max(0,a.grid_import??s-l),g=a.peak_power_kw||0,h=e.reference_power_kw||5,f=a.exceedance_kwh||0,v=a.gas_energy||0,$=a.gas_volume||0,x=v>0||$>0,C=e.consumption_rate_windows??[],k=e.reference_power_windows??[],_=t.consumptionTimeseries?Rt(t.consumptionTimeseries.items,e.energy_variable_rate,h,C,k,((_t=t.productionTimeseries)==null?void 0:_t.items)??[]):null,S=C.length>0&&!!_&&Math.abs(d-s)<.01,i=k.length>0&&!!_,c=_?_.peakPowerKw:g,m=_?_.exceedanceKwh:f,b=Kt(a.start??t.customStart),W=Kt(a.end??t.customEnd),{days:D,factor:P,label:V}=ms(t.range,t.customStart,t.customEnd,a.start,a.end),I=e.energy_fixed_fee*P,j=e.network_metering_rate*P,z=e.network_power_ref_rate*P,se=S?_.energyCost:d*e.energy_variable_rate,J=d*e.network_variable_rate,Q=m*e.exceedance_rate,q=e.meter_monthly_fees??[],ue=q.reduce((w,H)=>w+(H.fee||0),0)*P,le=d*e.compensation_fund_rate,he=d*e.electricity_tax_rate,U=Math.max(0,e.connect_discount??0)*P,A=I+se+j+z+J+Q+ue+le+he-U,N=A*e.vat_rate,re=A+N,ee=ft(e),te=wt(e,t.consumptionTimeseries,((xt=t.perMeterProductionTimeseries)==null?void 0:xt.meters)??null,u,r),_e=ee.filter(w=>isFinite(w.rate)&&w.rate>0),Y=ee.length>1,me=te?te.weightedExportRate:_e.length>0?_e.reduce((w,H)=>w+H.rate,0)/_e.length:e.feed_in_tariff,ae=te?te.totalFeedInRevenue:r*me,ge=Y&&ee.length>0?r/ee.length:r,Te=te?te.meters:ee.map(w=>({...w,producedKwh:0,exportedKwh:ge,revenue:ge*w.rate,selfConsumedKwh:0,exportEquivalentForSelfUse:0})),ve=!!te,X=u,Ue=e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate,rt=Ue*(1+e.vat_rate),Be=X*Ue,nt=Be*e.vat_rate,ye=Be+nt,ot=te?te.totalSelfUseExportEquivalent:X*me,Ke=ye-ot,fe=Math.max(0,(_==null?void 0:_.avoidedExceedanceKwh)??0),Ee=fe*e.exceedance_rate,Ve=Ee*e.vat_rate,we=Ee+Ve,xe=fe>1e-4,ke=ye+we+ae,De=Te.map(w=>{const H=w.selfConsumedKwh*rt,Ce=H-w.exportEquivalentForSelfUse;return{...w,selfUseSavings:H,selfUseVsExport:Ce,totalTrackedValue:H+w.revenue}}),M=ve&&De.length>0,E=re-ae,F=(e.gas_fixed_fee??6.5)*P,G=v*(e.gas_variable_rate??.055),B=(e.gas_network_fee??4.8)*P,Me=v*(e.gas_network_variable_rate??.012),ne=v*(e.gas_tax_rate??.001),oe=F+G+B+Me+ne,We=oe*(e.gas_vat_rate??.08),qe=oe+We,K=e.currency||"EUR",T=w=>`${p(w,2)} ${K}`,it=w=>`${w>0?"+":w<0?"-":""}${p(Math.abs(w),2)} ${K}`,L=w=>p(w,3),bt=w=>p(w,3),sa=w=>w>=0?"comparison-delta-savings":"comparison-delta-extra",ra=M?`
            <tr class="section-label"><td colspan="3">Per-System Self-Use vs Export</td></tr>
            ${De.map(w=>`
            <tr>
              <td>${w.displayName}</td>
              <td style="text-align: right;">
                ${w.shortId}<br/>
                Produced ${L(w.producedKwh)} kWh<br/>
                Kept on-site ${L(w.selfConsumedKwh)} kWh<br/>
                Sold ${L(w.exportedKwh)} kWh<br/>
                ${w.label} ${p(w.rate,4)} ${K}/kWh${Y?`<br/>Self-use priority ${w.selfUsePriority}`:""}
              </td>
              <td style="text-align: right;">
                <strong>${T(w.totalTrackedValue)}</strong><br/>
                <span class="${sa(w.selfUseVsExport)}">${it(w.selfUseVsExport)}</span> self-use vs export<br/>
                <span class="muted">${T(w.selfUseSavings)} kept value + ${T(w.revenue)} sold</span>
              </td>
            </tr>
            `).join("")}
            <tr class="subtotal-row">
              <td colspan="2"><strong>Tracked per-system value</strong></td>
              <td style="text-align: right;"><strong>${T(De.reduce((w,H)=>w+H.totalTrackedValue,0))}</strong></td>
            </tr>
      `:"",na=ve?`Compared with exporting the same ${L(X)} kWh using the configured PV self-use priority and each system's own feed-in tariff`:`Compared with selling the same ${L(X)} kWh at ${p(me,4)} ${K}/kWh`,lt=Pt.find(w=>Math.abs(w.kw-h)<.05),oa=A-z-Q,ct=_?Pt.map(w=>{var Mt;const H=Rt(t.consumptionTimeseries.items,e.energy_variable_rate,w.kw,C,k,((Mt=t.productionTimeseries)==null?void 0:Mt.items)??[]),Ce=w.fixedMonthlyFee*P,je=H.exceedanceKwh*e.exceedance_rate,kt=(oa+Ce+je)*(1+e.vat_rate);return{...w,fixedCharge:Ce,exceedanceKwh:H.exceedanceKwh,exceedanceCharge:je,total:kt,deltaVsCurrent:kt-re}}):[],Ye=ct.reduce((w,H)=>!w||H.total<w.total?H:w,null),ia=w=>Math.abs(w)<.005?"Current total":`${w>0?"+":"-"}${T(Math.abs(w))}`,dt=a.start&&a.end?`${$e(a.start)} — ${$e(a.end)}`:t.range.replace("_"," ").replace(/\b\w/g,w=>w.toUpperCase()),la=m>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${p(c,1)} kW</strong> &mdash; ${i?"Reference power windows active":`Reference power level: ${p(h,1)} kW`}</p>
        <p>Exceedance volume: <strong>${L(m)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${T(Q)}</p>
      </div>`:"",ca=S?_.rateBreakdown.map(w=>`
            <tr>
              <td>${w.label} (${L(w.kwh)} kWh)</td>
              <td style="text-align: right;">${p(w.rate,4)} ${K}/kWh</td>
              <td style="text-align: right;">${T(w.kwh*w.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Supplier rate (${L(d)} kWh bought from grid)</td>
              <td style="text-align: right;">${p(e.energy_variable_rate,4)} ${K}/kWh</td>
              <td style="text-align: right;">${T(se)}</td>
            </tr>
          `,da=i?`Reference power windows active (${k.length})`:`${p(h,1)} kW`,pa=S?`Time-of-use windows active (${C.length})`:`${p(e.energy_variable_rate,4)} ${K}/kWh`,ua=ct.map(w=>{const H=!!Ye&&w.kw===Ye.kw,Ce=!!lt&&w.kw===lt.kw,je=w.deltaVsCurrent<-.005?"comparison-delta-savings":w.deltaVsCurrent>.005?"comparison-delta-extra":"";return`
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
              <td class="${je}" style="text-align: right;">${ia(w.deltaVsCurrent)}</td>
            </tr>
          `}).join(""),ha=ct.length>0?`
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${i?"Configured reference power windows stay active in this comparison.":"One reference power level is applied to the full selected period."}
              ${lt?"":`Your current configuration uses ${p(h,1)} kW, which is outside the standard Creos low-voltage reference power levels.`}
            </p>
          </div>
          ${Ye?`<div class="reference-power-optimum">
                <span class="reference-level-badge best">Financially optimal: ${p(Ye.kw,0)} kW</span>
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
            ${ua}
          </tbody>
        </table>
      </div>
    `:`
      <div class="card reference-power-card">
        <p class="muted">Reference power level comparison requires 15-minute load-curve data for the selected period.</p>
      </div>
    `,ma=`
      <div class="range-selector">
        ${Oe.map(w=>`
          <button
            class="range-btn ${w.id===t.range?"active":""}"
            data-range="${w.id}"
          >${w.label}</button>
        `).join("")}
      </div>
    `,ga=a.start&&a.end?(()=>{const w=new Date(a.start),H=new Date(a.end);return Number.isNaN(w.getTime())||Number.isNaN(H.getTime())?"":`
        <div class="range-info-bar">
          Period: ${w.toLocaleDateString()} - ${H.toLocaleDateString()}
        </div>
      `})():"",va=t.range==="custom"?`
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
    `:b&&W?`
        <div class="custom-range-picker period-preview">
          <span class="period-preview-label">Viewed period</span>
          <label>
            <span>From</span>
            <input type="date" value="${b}" readonly aria-label="Preset period start" />
          </label>
          <label>
            <span>To</span>
            <input type="date" value="${W}" readonly aria-label="Preset period end" />
          </label>
        </div>
      `:"";return`
    <section class="invoice-view">
      ${ma}
      ${ga}
      ${va}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Supplier Bill Estimate &mdash; ${dt}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the selected period. Feed-in revenue and net position are shown separately.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${L(s)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${L(d)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${L(o)} kWh produced</span>
          ${r>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${L(r)} kWh exported</span>`:""}
          ${x?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${L(v)} kWh gas (${bt($)} m³)</span>`:""}
        </div>
      </div>

      ${la}

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
              <td style="text-align: right;">${p(e.energy_fixed_fee,2)} ${K}/mo</td>
              <td style="text-align: right;">${T(I)}</td>
            </tr>
            ${ca}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${V})</span></td>
              <td style="text-align: right;">${p(e.network_metering_rate,2)} ${K}/mo</td>
              <td style="text-align: right;">${T(j)}</td>
            </tr>
            <tr>
              <td>Reference power level (${da}) <span class="muted">(${V})</span></td>
              <td style="text-align: right;">${p(e.network_power_ref_rate,2)} ${K}/mo</td>
              <td style="text-align: right;">${T(z)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${L(d)} kWh bought from grid)</td>
              <td style="text-align: right;">${p(e.network_variable_rate,4)} ${K}/kWh</td>
              <td style="text-align: right;">${T(J)}</td>
            </tr>
            <tr class="${m>0?"exceedance-row":""}">
              <td>Exceedance charge (${L(m)} kWh above the reference power level)</td>
              <td style="text-align: right;">${p(e.exceedance_rate,4)} ${K}/kWh</td>
              <td style="text-align: right;">${T(Q)}</td>
            </tr>

            ${q.filter(w=>w.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${q.filter(w=>w.fee>0).map(w=>`
            <tr>
              <td>${w.label||"…"+w.meter_id.slice(-8)} <span class="muted">(${V})</span></td>
              <td style="text-align: right;">${p(w.fee,2)} ${K}/mo</td>
              <td style="text-align: right;">${T(w.fee*P)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${p(e.compensation_fund_rate,4)} ${K}/kWh</td>
              <td style="text-align: right;">${T(le)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${p(e.electricity_tax_rate,4)} ${K}/kWh</td>
              <td style="text-align: right;">${T(he)}</td>
            </tr>
            ${U>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            <tr>
              <td>Monthly Discount <span class="muted">(${V})</span></td>
              <td style="text-align: right;">-${p(Math.max(0,e.connect_discount??0),2)} ${K}/mo</td>
              <td style="text-align: right;">-${T(U)}</td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(A)}</strong></td>
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
              <td style="text-align: right;">${L(o)} kWh</td>
            </tr>
            <tr class="revenue-row">
              <td>Own solar used at home</td>
              <td style="text-align: right;">${L(X)} kWh from your own production avoided grid purchases</td>
              <td style="text-align: right;">${T(ye)} saved</td>
            </tr>
            ${y>0?`
            <tr class="revenue-row">
              <td>Additional solar received</td>
              <td style="text-align: right;">${L(y)} kWh covered at home from shared/community solar</td>
              <td style="text-align: right;">Informational</td>
            </tr>
            `:""}
            <tr class="revenue-row">
              <td>Export sold</td>
              <td style="text-align: right;">${L(r)} kWh sent to grid</td>
              <td style="text-align: right;">${T(ae)} earned</td>
            </tr>
            ${xe?`
            <tr class="revenue-row">
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${L(fe)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${T(we)} saved</td>
            </tr>
            `:""}
            ${r>0?`
            <tr class="section-label"><td colspan="3">Credit Calculation</td></tr>
            ${Te.map(w=>`
            <tr class="revenue-row">
              <td>Exported (${Y?w.displayName:L(w.exportedKwh)+" kWh"})</td>
              <td style="text-align: right;">${Y?`${w.shortId}<br/>`:""}${L(w.exportedKwh)} kWh<br/>${w.label}<br/>${p(w.rate,4)} ${K}/kWh${ve&&Y?`<br/>Self-use priority ${w.selfUsePriority}`:""}</td>
              <td class="revenue-amount" style="text-align: right;">-${T(w.revenue)}</td>
            </tr>
            `).join("")}
            ${Y?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${L(r)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${p(me,4)} ${K}/kWh</td>
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

      ${ha}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Supplier bill estimate: ${T(re)}</strong>${ae>0?` Feed-in revenue is shown separately as ${T(ae)}, giving a net electricity position of ${T(E)} after export credit.`:""}
          <br/>
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${L(d)} kWh), not total home usage.
          Supplier pricing: ${pa}.
          Fixed monthly charges are prorated across the viewed period (${D} days, ${V}, equivalent to ${p(P,2)} monthly charges).
          Peak load (${p(c,1)} kW) is compared against ${i?"your configured reference power windows":`your reference power level (${p(h,1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${p(e.exceedance_rate,4)} ${K}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${x?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${dt}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${L(v)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${bt($)} m³</span>
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
              <td style="text-align: right;">${p(e.gas_fixed_fee??6.5,2)} ${K}/mo</td>
              <td style="text-align: right;">${T(F)}</td>
            </tr>
            <tr>
              <td>Energy (${L(v)} kWh)</td>
              <td style="text-align: right;">${p(e.gas_variable_rate??.055,4)} ${K}/kWh</td>
              <td style="text-align: right;">${T(G)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${V})</span></td>
              <td style="text-align: right;">${p(e.gas_network_fee??4.8,2)} ${K}/mo</td>
              <td style="text-align: right;">${T(B)}</td>
            </tr>
            <tr>
              <td>Network Variable (${L(v)} kWh)</td>
              <td style="text-align: right;">${p(e.gas_network_variable_rate??.012,4)} ${K}/kWh</td>
              <td style="text-align: right;">${T(Me)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${L(v)} kWh)</td>
              <td style="text-align: right;">${p(e.gas_tax_rate??.001,4)} ${K}/kWh</td>
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
              <td style="text-align: right;"><strong>${T(qe)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Net Energy Position: ${T(E+qe)}</strong>
          (Electricity net position: ${T(E)} + Gas supplier estimate: ${T(qe)})
        </p>
      </div>
      `:""}

      ${o>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Value &mdash; ${dt}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${T(ke)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${L(o)} kWh</div>
            <div class="solar-stat-label">Solar produced</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${T(ye)}</div>
            <div class="solar-stat-label">Saved by using ${L(X)} kWh of your own solar at home</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${it(Ke)}</div>
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
            <div class="solar-stat-label">Earned by selling ${L(r)} kWh</div>
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
              <td style="text-align: right;">${L(o)} kWh</td>
            </tr>
            <tr>
              <td>Own solar used at home</td>
              <td style="text-align: right;">${L(X)} kWh from your own production avoided grid purchases</td>
              <td style="text-align: right;">${T(ye)} saved</td>
            </tr>
            ${y>0?`
            <tr>
              <td>Additional solar received</td>
              <td style="text-align: right;">${L(y)} kWh covered at home from shared/community solar</td>
              <td style="text-align: right;">Informational</td>
            </tr>
            `:""}
            <tr>
              <td>Extra vs exporting instead</td>
              <td style="text-align: right;">${na}</td>
              <td style="text-align: right;">${it(Ke)}</td>
            </tr>
            <tr>
              <td>Export sold</td>
              <td style="text-align: right;">${L(r)} kWh sent to grid</td>
              <td style="text-align: right;">${T(ae)} earned</td>
            </tr>
            ${xe?`
            <tr>
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${L(fe)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${T(we)} saved</td>
            </tr>
            `:""}

            ${ra}

            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${L(X)} kWh)</td>
              <td style="text-align: right;">${p(e.energy_variable_rate,4)} ${K}/kWh</td>
              <td style="text-align: right;">${T(X*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${p(e.network_variable_rate,4)} ${K}/kWh</td>
              <td style="text-align: right;">${T(X*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${p(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${K}/kWh</td>
              <td style="text-align: right;">${T(X*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${p(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(nt)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${T(ye)}</strong></td>
            </tr>

            ${xe?`
            <tr class="section-label"><td colspan="3">Reference Power Savings</td></tr>
            <tr>
              <td>Exceedance avoided</td>
              <td style="text-align: right;">${L(fe)} kWh above the reference power level</td>
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
              <td>Sold to grid ${Y?`(${w.displayName})`:`(${L(w.exportedKwh)} kWh)`}</td>
              <td style="text-align: right;">${Y?`${w.shortId}<br/>`:""}${L(w.exportedKwh)} kWh<br/>${w.label}<br/>${p(w.rate,4)} ${K}/kWh${ve&&Y?`<br/>Self-use priority ${w.selfUsePriority}`:""}</td>
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
  `}const ws=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],$s=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Reference Power Fixed Charge",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"connect_discount",label:"Monthly Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],bs={consumption:"Power Consumption",production:"Power Production",gas:"Gas Consumption"},Qt={consumption:"⚡",production:"☀️",gas:"🔥"};function _s(t){return t.map(e=>`<span class="meter-type-badge meter-type-${e}">${Qt[e]??""} ${bs[e]??e}</span>`).join(" ")}function It(t,e,a){const s=t+1;return a?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${s}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${_s(e.types)}</div>
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
  `}function ea(t){return ws.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function xs(t,e){return`
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
            ${ea(e.day_group??"all")}
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
  `}function ks(t,e){return`
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
            ${ea(e.day_group??"all")}
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
  `}function Ms(t,e="ha",a){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const s=e==="standalone"?(a==null?void 0:a.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let o="";if(e==="standalone"){const i=s.map((m,b)=>It(b,m,!1)).join("");a==null||a.proxy_url,o=`
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
            ${i.length>0?i.map((m,b)=>It(b,m,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const n=i=>i.map(c=>{const m=t?t[c.key]??"":"";return`
        <div class="form-row">
          <label for="cfg-${c.key}">${c.label}</label>
          <div class="input-group">
            <input
              id="cfg-${c.key}"
              name="${c.key}"
              type="${c.type}"
              ${c.type==="number"?`step="${c.step}"`:""}
              value="${m}"
            />
            ${c.unit?`<span class="input-unit">${c.unit}</span>`:""}
          </div>
        </div>
      `}).join(""),r=((t==null?void 0:t.meters)??[]).filter(i=>i.types.includes("production")),l=(t==null?void 0:t.feed_in_rates)??[],u=e==="ha";function y(i){return l.find(c=>c.meter_id===i)??{meter_id:i,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:"",display_name:"",self_use_priority:r.findIndex(c=>c.id===i)+1}}const d=r.length===0?'<p class="muted">No production meters configured — add a meter with Power Production type above.</p>':r.map((i,c)=>{const m=y(i.id),b=i.id?"…"+i.id.slice(-8):`Meter ${c+1}`,W=et(i.id,c+1,m.display_name);return`
          <div class="feed-in-meter-card" data-meter-idx="${c}" data-meter-id="${i.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${W}</span>
              <code style="font-size: var(--text-sm);">${b}</code>
              <input type="hidden" name="feed_in_rate_${c}_meter_id" value="${i.id}" />
            </div>
            <div class="form-row">
              <label for="cfg-feed_in_rate_${c}_display_name">System Name</label>
              <div class="input-group">
                <input
                  id="cfg-feed_in_rate_${c}_display_name"
                  name="feed_in_rate_${c}_display_name"
                  type="text"
                  value="${m.display_name??""}"
                  placeholder="${et(i.id,c+1)}"
                />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-feed_in_rate_${c}_priority">Self-use Priority</label>
              <div class="input-group">
                <input
                  id="cfg-feed_in_rate_${c}_priority"
                  name="feed_in_rate_${c}_self_use_priority"
                  type="number"
                  min="1"
                  step="1"
                  value="${m.self_use_priority??c+1}"
                />
                <span class="input-unit">1 = used first at home</span>
              </div>
              <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                Leave blank to use ${et(i.id,c+1)}.
              </p>
            </div>
            <div class="form-row">
              <label>Pricing Mode</label>
              <div class="feed-in-mode-toggle">
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${c}_mode" value="fixed" ${m.mode==="fixed"?"checked":""} />
                  <span class="mode-label">💶 Fixed Tariff</span>
                </label>
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${c}_mode" value="sensor" ${m.mode==="sensor"?"checked":""} />
                  <span class="mode-label">📡 HA Sensor</span>
                </label>
              </div>
            </div>
            <div class="feed-in-fixed-fields" data-rate-idx="${c}" style="${m.mode==="fixed"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${c}_tariff">Feed-in Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${c}_tariff" name="feed_in_rate_${c}_tariff" type="number" step="0.0001" value="${m.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
              </div>
            </div>
            <div class="feed-in-sensor-fields" data-rate-idx="${c}" style="${m.mode==="sensor"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${c}_sensor">Market Price Sensor</label>
                <div class="input-group sensor-picker-group">
                  <input
                    id="cfg-feed_in_rate_${c}_sensor"
                    name="feed_in_rate_${c}_sensor_entity"
                    type="text"
                    value="${m.sensor_entity}"
                    placeholder="${u?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${u&&c===0?'<datalist id="ha-entity-list"></datalist>':""}
              </div>
              <div class="form-row">
                <label for="cfg-feed_in_rate_${c}_fallback">Fallback Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${c}_fallback" name="feed_in_rate_${c}_fallback_tariff" type="number" step="0.0001" value="${m.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
                <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                  Used when the sensor is unavailable.
                </p>
              </div>
            </div>
          </div>
        `}).join(""),g=((t==null?void 0:t.meters)??[]).some(i=>i.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),h=(t==null?void 0:t.consumption_rate_windows)??[],f=(t==null?void 0:t.reference_power_windows)??[],v=(t==null?void 0:t.meters)??[],$=(t==null?void 0:t.meter_monthly_fees)??[];function x(i){return $.find(c=>c.meter_id===i)??{meter_id:i,label:"",fee:0}}const C=v.length===0?'<p class="muted">No meters configured.</p>':v.map((i,c)=>{const m=x(i.id),b=i.id?"…"+i.id.slice(-8):`Meter ${c+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${i.types.map(D=>Qt[D]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${b}</code>
              <input type="hidden" name="meter_fee_${c}_meter_id" value="${i.id}" />
            </div>
            <div class="form-row" style="margin-bottom: var(--sp-2);">
              <label for="cfg-meter_fee_${c}_label">Label</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${c}_label" name="meter_fee_${c}_label" type="text" value="${m.label||`Meter ${c+1} metering fee`}" placeholder="e.g. Smart meter rental" />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-meter_fee_${c}_fee">Monthly Fee</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${c}_fee" name="meter_fee_${c}_fee" type="number" step="0.01" value="${m.fee}" />
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
      ${h.length>0?h.map((i,c)=>xs(c,i)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,_=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${f.length>0?f.map((i,c)=>ks(c,i)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,S=$s.map(i=>{if(i.title==="Gas Billing"&&!g||i.title==="Meter Fees"&&v.length<2)return"";let c;return i.title==="Feed-in / Selling"?c=d:i.title==="Time-of-Use Tariffs"?c=k:i.title==="Reference Power Windows"?c=_:i.title==="Discounts"?c=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as a monthly credit. The dashboard prorates it to the selected period and subtracts it before VAT.
      </p>`+n(i.fields):i.title==="Meter Fees"?c=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+C:c=n(i.fields),`
    <div class="form-section">
      <div class="form-section-title">${i.icon}  ${i.title}</div>
      ${c}
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
  `}function ut(t,e,a=!1,s="dark",o=""){const n=f=>`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${f}
    </svg>
  `,r=n(`
    <path d="M4 19V5" />
    <path d="M4 19H20" />
    <path d="M7 15L11 11L14 13L19 8" />
    <circle cx="7" cy="15" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="11" cy="11" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="14" cy="13" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="19" cy="8" r="1.25" fill="currentColor" stroke="none" />
  `),l=n(`
    <path d="M3 11.5L12 4L21 11.5" />
    <path d="M5.5 10.5V20H18.5V10.5" />
    <path d="M9.5 20V14H14.5V20" />
  `),u=n(`
    <path d="M4 19H20" />
    <path d="M7 19V11" />
    <path d="M12 19V7" />
    <path d="M17 19V4" />
  `),y=n(`
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
  `),g=n(s==="dark"?`
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
      `),h=[{id:"charts",label:"Charts",icon:r},{id:"dashboard",label:"Dashboard",icon:l},{id:"sensors",label:"Sensors",icon:u},{id:"invoice",label:"Invoice",icon:y},{id:"settings",label:"Settings",icon:d}];return`
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
        ${h.map(f=>`
          <button
            class="nav-btn ${f.id===t?"active":""}"
            data-tab="${f.id}"
            role="tab"
            aria-selected="${f.id===t}"
            aria-controls="panel-${f.id}"
          >
            <span class="nav-icon" aria-hidden="true">${f.icon}</span>
            <span class="nav-label">${f.label}</span>
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
  `}const ta="leneda_credentials",aa="leneda_theme";function Cs(){try{const t=localStorage.getItem(ta);if(t)return JSON.parse(t)}catch{}return null}function ht(t){try{localStorage.setItem(ta,JSON.stringify(t))}catch{}}function Ss(){var t;try{const e=localStorage.getItem(aa);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function Ts(t){try{localStorage.setItem(aa,t)}catch{}}function At(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const[,a,s,o]=e;return new Date(Number(a),Number(s)-1,Number(o))}function Ht(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${s}`}function Ie(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0"),r=String(t.getSeconds()).padStart(2,"0"),l=String(t.getMilliseconds()).padStart(3,"0"),u=-t.getTimezoneOffset(),y=u>=0?"+":"-",d=String(Math.floor(Math.abs(u)/60)).padStart(2,"0"),g=String(Math.abs(u)%60).padStart(2,"0");return`${e}-${a}-${s}T${o}:${n}:${r}.${l}${y}${d}:${g}`}function Nt(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Es(t,e=new Date){switch(t){case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const s=new Date(a);return s.setHours(23,59,59,999),{start:a,end:s}}case"this_week":{const a=new Date(e),s=a.getDay()||7;return a.setDate(a.getDate()-s+1),a.setHours(0,0,0,0),{start:a,end:e}}case"last_week":{const a=new Date(e),s=a.getDay()||7,o=new Date(a);o.setDate(a.getDate()-s),o.setHours(23,59,59,999);const n=new Date(o);return n.setDate(o.getDate()-6),n.setHours(0,0,0,0),{start:n,end:o}}case"this_month":return{start:new Date(e.getFullYear(),e.getMonth(),1),end:e};case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),s=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:a,end:s}}case"this_year":return{start:new Date(e.getFullYear(),0,1),end:e};case"last_year":{const a=new Date(e.getFullYear()-1,0,1),s=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:a,end:s}}}}function Ds(t,e,a=new Date){const s=At(t),o=At(e);if(!s||!o)return null;const n=["yesterday","this_week","last_week","this_month","last_month","this_year","last_year"];for(const r of n){const l=Es(r,a);if(Nt(s,l.start)&&Nt(o,l.end))return r}return null}class Ws{constructor(e){Fe(this,"root");Fe(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartViewportStart:null,chartViewportEnd:null,chartUnit:"kwh",chartTimeBucket:"quarter_hour",chartConsumptionView:"grid",analysisHeatmapMetric:"grid",analysisProfileMetric:"house",analysisComparisonMode:"previous",analysisComparison:null,analysisComparisonLoading:!1,rangeData:null,consumptionTimeseries:null,productionTimeseries:null,gridImportTimeseries:null,marketExportTimeseries:null,perMeterProductionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:Ss()});Fe(this,"preZoomRange",null);Fe(this,"preZoomCustomStart","");Fe(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await Ot();if(this.state.mode=e.mode,e.mode==="standalone"){const a=Cs();if(a&&(this.state.credentials=a),!e.configured&&!a){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&a)try{const{saveCredentials:s}=await ce(async()=>{const{saveCredentials:o}=await Promise.resolve().then(()=>Se);return{saveCredentials:o}},void 0);await s(a)}catch{}if(!a)try{this.state.credentials=await Ut()}catch{}}await this.loadData()}toDisplayError(e,a="Failed to load data"){const s=e instanceof Error?e.message:String(e??"").trim(),o=s.toLowerCase();return o.includes("missing data")||o.includes("no_data")||o.includes("no data")?"Missing data":s||a}clearRangeStateWithError(e,a="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.state.gridImportTimeseries=null,this.state.marketExportTimeseries=null,this.state.perMeterProductionTimeseries=null,this.clearChartViewport(),this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1,this.state.error=this.toDisplayError(e,a)}async fetchPerMeterProductionForRange(e,a,s){var n;if(((e==null?void 0:e.meters)??[]).filter(r=>r.types.includes("production")).length<=1)return null;try{const r=await mt("1-1:2.29.0",a,s);return(n=r.meters)!=null&&n.length?r:null}catch(r){return console.warn("Per-meter production fetch failed:",r),null}}async fetchEnergyFlowTimeseries(e,a){const[s,o,n,r]=await Promise.all([Ae("1-1:1.29.0",e,a),Ae("1-1:2.29.0",e,a),Ae("1-65:1.29.9",e,a),Ae("1-65:2.29.9",e,a)]);return{consumptionTimeseries:s,productionTimeseries:o,gridImportTimeseries:n,marketExportTimeseries:r}}resetAnalysisComparison(){this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1}clearChartViewport(){this.state.chartViewportStart=null,this.state.chartViewportEnd=null}normalizeChartTimeBucket(){const{start:e,end:a}=this.getDateRangeISO(),s=Sa(vt(e,a),this.state.chartTimeBucket);s!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=s)}getCurrentRangeKey(){const{start:e,end:a}=this.getDateRangeISO();return`${e}|${a}`}shiftIsoByYears(e,a){const s=new Date(e);if(!Number.isFinite(s.getTime()))return e;const o=new Date(s);return o.setUTCFullYear(o.getUTCFullYear()+a),o.toISOString()}getComparisonRangeISO(e,a,s){if(s==="last_year")return{start:this.shiftIsoByYears(e,-1),end:this.shiftIsoByYears(a,-1)};const o=new Date(e).getTime(),n=new Date(a).getTime(),r=Math.max(0,n-o),l=o-1,u=l-r;return{start:new Date(u).toISOString(),end:new Date(l).toISOString()}}async loadAnalysisComparison(e=!1){var l;if(!this.state.consumptionTimeseries||!this.state.productionTimeseries)return;const{start:a,end:s}=this.getDateRangeISO(),o=this.state.analysisComparisonMode,n=`${a}|${s}|${o}`;if(!e&&(this.state.analysisComparisonLoading||((l=this.state.analysisComparison)==null?void 0:l.key)===n))return;const r=this.getComparisonRangeISO(a,s,o);this.state.analysisComparisonLoading=!0,this.state.tab==="charts"&&this.renderPreserveMainScroll();try{const{consumptionTimeseries:u,productionTimeseries:y,gridImportTimeseries:d,marketExportTimeseries:g}=await this.fetchEnergyFlowTimeseries(r.start,r.end);if(n!==this.getCurrentRangeKey())return;this.state.analysisComparison={key:n,mode:o,start:r.start,end:r.end,consumptionTimeseries:u,productionTimeseries:y,gridImportTimeseries:d,marketExportTimeseries:g}}catch(u){console.warn("Comparison data fetch failed:",u),n===this.getCurrentRangeKey()&&(this.state.analysisComparison=null)}finally{n===this.getCurrentRangeKey()&&(this.state.analysisComparisonLoading=!1,this.state.tab==="charts"&&this.renderPreserveMainScroll())}}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.clearChartViewport(),this.resetAnalysisComparison(),this.render();try{const[e,a,s]=await Promise.all([Qe(this.state.range),gt(),He()]),{start:o,end:n}=this.getDateRangeISO(),[r,l]=await Promise.all([this.fetchEnergyFlowTimeseries(o,n),this.fetchPerMeterProductionForRange(s,o,n)]);this.state.rangeData=e,this.state.consumptionTimeseries=r.consumptionTimeseries,this.state.productionTimeseries=r.productionTimeseries,this.state.gridImportTimeseries=r.gridImportTimeseries,this.state.marketExportTimeseries=r.marketExportTimeseries,this.state.perMeterProductionTimeseries=l,this.state.sensors=a,this.state.config=s}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async changeRange(e){if(this.preZoomRange=null,this.clearChartViewport(),this.state.range=e,this.resetAnalysisComparison(),e==="custom"){if(!this.state.customStart||!this.state.customEnd){const a=new Date;a.setDate(a.getDate()-1);const s=new Date(a);s.setDate(s.getDate()-6),this.state.customStart=Ht(s),this.state.customEnd=Ht(a)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:a,end:s}=this.getDateRangeISO(),[o,n,r]=await Promise.all([Qe(e),this.fetchEnergyFlowTimeseries(a,s),this.fetchPerMeterProductionForRange(this.state.config,a,s)]);this.state.rangeData=o,this.state.consumptionTimeseries=n.consumptionTimeseries,this.state.productionTimeseries=n.productionTimeseries,this.state.gridImportTimeseries=n.gridImportTimeseries,this.state.marketExportTimeseries=n.marketExportTimeseries,this.state.perMeterProductionTimeseries=r}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async applyCustomRange(){this.preZoomRange=null,this.clearChartViewport();const{customStart:e,customEnd:a}=this.state;if(!(!e||!a)){this.state.error=null,this.state.loading=!0,this.resetAnalysisComparison(),this.render();try{const s=Ds(e,a),o=s?Qe(s):ce(async()=>{const{fetchCustomData:g}=await Promise.resolve().then(()=>Se);return{fetchCustomData:g}},void 0).then(({fetchCustomData:g})=>g(e,a)),n=this.state.config,r=Ie(new Date(e+"T00:00:00")),l=Ie(new Date(a+"T23:59:59.999")),[u,y,d]=await Promise.all([o,this.fetchEnergyFlowTimeseries(r,l),this.fetchPerMeterProductionForRange(n,r,l)]);this.state.rangeData={range:"custom",consumption:u.consumption,production:u.production,exported:u.exported??0,self_consumed:u.self_consumed??0,grid_import:u.grid_import,solar_to_home:u.solar_to_home,direct_solar_to_home:u.direct_solar_to_home,shared:u.shared,shared_with_me:u.shared_with_me,gas_energy:u.gas_energy??0,gas_volume:u.gas_volume??0,peak_power_kw:u.peak_power_kw??0,exceedance_kwh:u.exceedance_kwh??0,metering_point:u.metering_point??"",start:u.start??e,end:u.end??a},this.state.consumptionTimeseries=y.consumptionTimeseries,this.state.productionTimeseries=y.productionTimeseries,this.state.gridImportTimeseries=y.gridImportTimeseries,this.state.marketExportTimeseries=y.marketExportTimeseries,this.state.perMeterProductionTimeseries=d}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}}async shiftChartPeriod(e){const{start:a,end:s}=this.getDateRangeISO(),o=jt(a,s,this.state.chartTimeBucket,e);o&&await this.handleChartZoomChange(Ie(o.start),Ie(o.end))}changeTab(e){this.state.tab=e,this.render(),(e==="dashboard"||e==="charts")&&!this.state.rangeData&&!this.state.loading&&this.loadData(),e==="charts"&&this.state.rangeData&&this.loadAnalysisComparison(),e==="sensors"&&!this.state.sensors&&gt().then(a=>{this.state.sensors=a,this.render()}),e==="settings"&&!this.state.config&&He().then(a=>{this.state.config=a,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,Ts(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}printInvoice(){var r,l;const e=document.title,s=`Leneda-invoice-${(r=this.state.rangeData)!=null&&r.start&&((l=this.state.rangeData)!=null&&l.end)?`${this.state.rangeData.start.slice(0,10)}_to_${this.state.rangeData.end.slice(0,10)}`:this.state.range}`.replace(/[^a-z0-9_-]+/gi,"-");let o=!1;const n=()=>{o||(o=!0,document.title=e,window.removeEventListener("afterprint",n))};document.title=s,window.addEventListener("afterprint",n,{once:!0}),window.print(),window.setTimeout(n,1e3)}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const a=this.root.querySelector(".main-content");a?a.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}getDataSourceLabel(){return this.state.mode==="ha"?"Home Assistant":"Standalone"}getHostedDataNoticeHtml(){var e;return(((e=this.state.credentials)==null?void 0:e.proxy_url)??"").trim().length>0,""}render(){var u;const{tab:e,loading:a,error:s,theme:o}=this.state,n=this.getDataSourceLabel(),r=this.getHostedDataNoticeHtml();if(a&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${ut(e,y=>{},!1,o,n)}
          <main class="main-content">
            ${r}
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `,this.attachNavListeners();return}if(s&&!this.state.rangeData){const y=s.toLowerCase().includes("missing data");this.root.innerHTML=`
        <div class="app-shell">
          ${ut(e,d=>{},!1,o,n)}
          <main class="main-content">
            ${r}
            <div class="error-state">
              <h2>${y?"Missing Data":"Connection Error"}</h2>
              <p>${y?"The selected period could not be loaded because data is missing.":s}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(u=this.root.querySelector("#retry-btn"))==null||u.addEventListener("click",()=>this.loadData());return}this.state.rangeData&&this.normalizeChartTimeBucket();let l="";switch(e){case"dashboard":l=Da(this.state);break;case"charts":l=ps(this.state);break;case"sensors":l=hs(this.state.sensors);break;case"invoice":l=fs(this.state);break;case"settings":l=Ms(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${ut(e,y=>this.changeTab(y),this.state.isMenuOpen,o,n)}
        <main class="main-content">
          ${r}
          ${a?'<div class="loading-bar"></div>':""}
          ${l}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachAnalysisListeners(),this.attachInvoiceListeners(),this.attachSettingsListeners()}attachNavListeners(){var e,a;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(a=this.root.querySelector("[data-theme-toggle]"))==null||a.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.tab;this.changeTab(o)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.range;this.changeRange(l)})});const a=this.root.querySelector("#custom-start"),s=this.root.querySelector("#custom-end");a&&a.addEventListener("change",()=>{this.state.customStart=a.value}),s&&s.addEventListener("change",()=>{this.state.customEnd=s.value});const o=this.root.querySelector("#apply-custom-range");if(o==null||o.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.chartUnit;l!==this.state.chartUnit&&(this.state.chartUnit=l,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-bucket]").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.chartBucket,{start:u,end:y}=this.getDateRangeISO();Ne(l,vt(u,y))&&l!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=l,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-period-nav]").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.chartPeriodNav==="next"?1:-1;this.shiftChartPeriod(l)})}),this.root.querySelectorAll("[data-chart-view]").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.chartView;l!==this.state.chartConsumptionView&&(this.state.chartConsumptionView=l,this.renderPreserveMainScroll())})}),!e){const r=this.root.querySelector("#energy-chart");r&&this.state.rangeData&&this.initChart(r)}const n=this.root.querySelector(".reset-zoom-btn");n==null||n.addEventListener("click",async()=>{const{resetChartZoom:r}=await ce(async()=>{const{resetChartZoom:l}=await import("./Charts-DcLYDQ9Z.js");return{resetChartZoom:l}},[]);if(r(),n.style.display="none",this.clearChartViewport(),this.preZoomRange!==null){const l=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",l==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(l)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachAnalysisListeners(){this.root.querySelectorAll("[data-analysis-heatmap]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisHeatmap;a!==this.state.analysisHeatmapMetric&&(this.state.analysisHeatmapMetric=a,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-profile]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisProfile;a!==this.state.analysisProfileMetric&&(this.state.analysisProfileMetric=a,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-comparison-mode]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisComparisonMode;a!==this.state.analysisComparisonMode&&(this.state.analysisComparisonMode=a,this.state.analysisComparison=null,this.loadAnalysisComparison(!0))})})}attachInvoiceListeners(){var e;(e=this.root.querySelector("#print-invoice-btn"))==null||e.addEventListener("click",()=>{this.printInvoice()})}attachSettingsListeners(){var u,y;const e=this.root.querySelector("#credentials-form");if(e){const d=this.root.querySelector("#add-meter-btn");d==null||d.addEventListener("click",()=>{var $,x,C;const f=new FormData(e),v=g(f);if(v.length<10){v.push({id:"",types:["consumption"]});const k={api_key:f.get("api_key")||(($=this.state.credentials)==null?void 0:$.api_key)||"",energy_id:f.get("energy_id")||((x=this.state.credentials)==null?void 0:x.energy_id)||"",meters:v,proxy_url:f.get("proxy_url")||((C=this.state.credentials)==null?void 0:C.proxy_url)||""};this.state.credentials=k,ht(k),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach(f=>{f.addEventListener("click",()=>{var k,_,S;const v=parseInt(f.dataset.meter??"0",10),$=new FormData(e),x=g($);x.splice(v,1);const C={api_key:$.get("api_key")||((k=this.state.credentials)==null?void 0:k.api_key)||"",energy_id:$.get("energy_id")||((_=this.state.credentials)==null?void 0:_.energy_id)||"",meters:x,proxy_url:$.get("proxy_url")||((S=this.state.credentials)==null?void 0:S.proxy_url)||""};this.state.credentials=C,ht(C),this.renderPreserveMainScroll()})});const g=f=>{var $,x,C;const v=[];for(let k=0;k<10;k++){const _=f.get(`meter_${k}_id`);if(_===null)break;const S=[];($=e.querySelector(`[name="meter_${k}_consumption"]`))!=null&&$.checked&&S.push("consumption"),(x=e.querySelector(`[name="meter_${k}_production"]`))!=null&&x.checked&&S.push("production"),(C=e.querySelector(`[name="meter_${k}_gas"]`))!=null&&C.checked&&S.push("gas"),v.push({id:_.trim(),types:S})}return v};e.addEventListener("submit",async f=>{f.preventDefault();const v=new FormData(e),$={api_key:v.get("api_key"),energy_id:v.get("energy_id"),meters:g(v),proxy_url:v.get("proxy_url")},x=this.root.querySelector("#creds-status");try{ht($);const{saveCredentials:C}=await ce(async()=>{const{saveCredentials:S}=await Promise.resolve().then(()=>Se);return{saveCredentials:S}},void 0);await C($),x&&(x.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=$,this.state.error=null;const k=!1,_=($.proxy_url??"").trim();await this.loadData()}catch(C){x&&(x.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${C instanceof Error?C.message:C}</p>`)}});const h=this.root.querySelector("#test-creds-btn");h==null||h.addEventListener("click",async()=>{const f=new FormData(e),v={api_key:f.get("api_key"),energy_id:f.get("energy_id"),meters:g(f),proxy_url:f.get("proxy_url")},$=this.root.querySelector("#creds-status");$&&($.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:x}=await ce(async()=>{const{testCredentials:k}=await Promise.resolve().then(()=>Se);return{testCredentials:k}},void 0),C=await x(v);$&&($.innerHTML=C.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${C.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${C.message}</p>`)}catch(x){$&&($.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${x instanceof Error?x.message:x}</p>`)}})}const a=this.root.querySelector("#settings-form");if(!a)return;const s=d=>{const g=[];for(let h=0;h<24;h++){const f=d.get(`consumption_window_${h}_label`),v=d.get(`consumption_window_${h}_day_group`),$=d.get(`consumption_window_${h}_start_time`),x=d.get(`consumption_window_${h}_end_time`),C=d.get(`consumption_window_${h}_rate`);if(f===null&&v===null&&$===null&&x===null&&C===null)break;g.push({label:(f??"").trim()||`Window ${h+1}`,day_group:v??"all",start_time:$??"00:00",end_time:x??"06:00",rate:parseFloat(C??"0")||0})}return g},o=d=>{const g=[];for(let h=0;h<24;h++){const f=d.get(`reference_window_${h}_label`),v=d.get(`reference_window_${h}_day_group`),$=d.get(`reference_window_${h}_start_time`),x=d.get(`reference_window_${h}_end_time`),C=d.get(`reference_window_${h}_reference_power_kw`);if(f===null&&v===null&&$===null&&x===null&&C===null)break;g.push({label:(f??"").trim()||`Reference ${h+1}`,day_group:v??"all",start_time:$??"17:00",end_time:x??"00:00",reference_power_kw:parseFloat(C??"0")||0})}return g},n=()=>{var k;const d=new FormData(a),g={};a.querySelectorAll('input[type="checkbox"]').forEach(_=>{g[_.name]=_.checked});const h=[],f=/^feed_in_rate_(\d+)_(.+)$/,v={},$=[],x=/^meter_fee_(\d+)_(.+)$/,C={};for(const[_,S]of d.entries()){if(_.startsWith("consumption_window_")||_.startsWith("reference_window_"))continue;const i=_.match(f);if(i){const D=i[1],P=i[2];v[D]||(v[D]={}),v[D][P]=S;continue}const c=_.match(x);if(c){const D=c[1],P=c[2];C[D]||(C[D]={}),C[D][P]=S;continue}if(g[_]!==void 0&&typeof g[_]=="boolean")continue;const m=S,b=a.elements.namedItem(_);if(m===""&&b instanceof HTMLInputElement&&b.type==="number"){const D=(k=this.state.config)==null?void 0:k[_];typeof D=="number"&&isFinite(D)&&(g[_]=D);continue}const W=parseFloat(m);g[_]=isNaN(W)?m:W}for(const _ of Object.keys(v).sort()){const S=v[_],i=S.mode??"fixed",c=i==="sensor"?S.fallback_tariff??S.tariff:S.tariff;h.push({meter_id:S.meter_id??"",mode:i,tariff:parseFloat(c??"0.08")||.08,sensor_entity:S.sensor_entity??"",display_name:(S.display_name??"").trim(),self_use_priority:Math.max(1,parseInt(S.self_use_priority??`${Number(_)+1}`,10)||Number(_)+1)})}h.length>0&&(g.feed_in_rates=h);for(const _ of Object.keys(C).sort()){const S=C[_];$.push({meter_id:S.meter_id??"",label:S.label??"",fee:parseFloat(S.fee??"0")||0})}return $.length>0&&(g.meter_monthly_fees=$),g.consumption_rate_windows=s(d),g.reference_power_windows=o(d),g},r=d=>{if(!this.state.config)return;const g=n();d(g),this.state.config={...this.state.config,...g},this.renderPreserveMainScroll()};if((u=this.root.querySelector("#add-consumption-window-btn"))==null||u.addEventListener("click",()=>{r(d=>{var h;const g=Array.isArray(d.consumption_rate_windows)?[...d.consumption_rate_windows]:[];g.push({label:`Window ${g.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((h=this.state.config)==null?void 0:h.energy_variable_rate)??.1125}),d.consumption_rate_windows=g})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(d=>{d.addEventListener("click",()=>{const g=parseInt(d.dataset.window??"0",10);r(h=>{const f=Array.isArray(h.consumption_rate_windows)?[...h.consumption_rate_windows]:[];f.splice(g,1),h.consumption_rate_windows=f})})}),(y=this.root.querySelector("#add-reference-window-btn"))==null||y.addEventListener("click",()=>{r(d=>{var h;const g=Array.isArray(d.reference_power_windows)?[...d.reference_power_windows]:[];g.push({label:`Reference ${g.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((h=this.state.config)==null?void 0:h.reference_power_kw)??5}),d.reference_power_windows=g})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(d=>{d.addEventListener("click",()=>{const g=parseInt(d.dataset.window??"0",10);r(h=>{const f=Array.isArray(h.reference_power_windows)?[...h.reference_power_windows]:[];f.splice(g,1),h.reference_power_windows=f})})}),a.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(d=>{d.addEventListener("change",()=>{const g=d.name.match(/feed_in_rate_(\d+)_mode/);if(!g)return;const h=g[1],f=a.querySelector(`.feed-in-fixed-fields[data-rate-idx="${h}"]`),v=a.querySelector(`.feed-in-sensor-fields[data-rate-idx="${h}"]`);f&&(f.style.display=d.value==="fixed"?"":"none"),v&&(v.style.display=d.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const d=this.root.querySelector("#ha-entity-list");d&&Bt().then(({entities:g})=>{d.innerHTML=g.map(h=>`<option value="${h}"></option>`).join("")}).catch(()=>{})}a.addEventListener("submit",async d=>{d.preventDefault();const g=n();try{const{saveConfig:h}=await ce(async()=>{const{saveConfig:f}=await Promise.resolve().then(()=>Se);return{saveConfig:f}},void 0);await h(g),this.state.config=await He(),this.render()}catch(h){alert("Failed to save: "+(h instanceof Error?h.message:h))}});const l=this.root.querySelector("#reset-config-btn");l==null||l.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?"))try{const{resetConfig:d}=await ce(async()=>{const{resetConfig:g}=await Promise.resolve().then(()=>Se);return{resetConfig:g}},void 0);await d(),this.state.config=await He(),this.render()}catch(d){alert("Failed to reset: "+(d instanceof Error?d.message:d))}})}async initChart(e){var a,s,o,n;try{const{renderEnergyChart:r}=await ce(async()=>{const{renderEnergyChart:k}=await import("./Charts-DcLYDQ9Z.js");return{renderEnergyChart:k}},[]),{start:l,end:u}=this.getDateRangeISO(),y=this.state.chartViewportStart?new Date(this.state.chartViewportStart).getTime():void 0,d=this.state.chartViewportEnd?new Date(this.state.chartViewportEnd).getTime():void 0;let g=this.state.consumptionTimeseries,h=this.state.productionTimeseries,f=this.state.gridImportTimeseries,v=this.state.marketExportTimeseries;if(!g||!h||!f||!v){const k=await this.fetchEnergyFlowTimeseries(l,u);g=k.consumptionTimeseries,h=k.productionTimeseries,f=k.gridImportTimeseries,v=k.marketExportTimeseries,this.state.consumptionTimeseries=g,this.state.productionTimeseries=h,this.state.gridImportTimeseries=f,this.state.marketExportTimeseries=v}const $=((a=this.state.config)==null?void 0:a.reference_power_kw)??0,x=(((s=this.state.config)==null?void 0:s.meters)??[]).filter(k=>k.types.includes("production"));let C;if((n=(o=this.state.perMeterProductionTimeseries)==null?void 0:o.meters)!=null&&n.length)C=this.state.perMeterProductionTimeseries.meters;else if(x.length>1)try{const k=await mt("1-1:2.29.0",l,u);k.meters&&k.meters.length>1&&(C=k.meters,this.state.perMeterProductionTimeseries=k)}catch(k){console.warn("Per-meter timeseries fetch failed, using merged view:",k)}r(e,g,h,{unit:this.state.chartUnit,consumptionView:this.state.chartConsumptionView,referencePowerKw:$,gridImportTimeseries:f,marketExportTimeseries:v,perMeterProduction:C,viewportStartMs:y,viewportEndMs:d,timeBucket:this.state.chartTimeBucket,onZoomChange:(k,_)=>{this.handleChartZoomChange(k,_)}})}catch(r){console.error("Chart init failed:",r)}}async handleChartZoomChange(e,a){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd),this.state.error=null,this.state.loading=!0,this.renderPreserveMainScroll();const{fetchCustomData:s}=await ce(async()=>{const{fetchCustomData:y}=await Promise.resolve().then(()=>Se);return{fetchCustomData:y}},void 0),o=e.slice(0,10),n=a.slice(0,10);this.resetAnalysisComparison();const r=await s(e,a),[l,u]=await Promise.all([this.fetchEnergyFlowTimeseries(e,a),this.fetchPerMeterProductionForRange(this.state.config,e,a)]);this.state.range="custom",this.state.customStart=o,this.state.customEnd=n,this.state.chartViewportStart=e,this.state.chartViewportEnd=a,this.state.rangeData={range:"custom",consumption:r.consumption,production:r.production,exported:r.exported??0,self_consumed:r.self_consumed??0,gas_energy:r.gas_energy??0,gas_volume:r.gas_volume??0,grid_import:r.grid_import,solar_to_home:r.solar_to_home,direct_solar_to_home:r.direct_solar_to_home,shared:r.shared,shared_with_me:r.shared_with_me,peak_power_kw:r.peak_power_kw??0,exceedance_kwh:r.exceedance_kwh??0,metering_point:r.metering_point??"",start:r.start,end:r.end},this.state.consumptionTimeseries=l.consumptionTimeseries,this.state.productionTimeseries=l.productionTimeseries,this.state.gridImportTimeseries=l.gridImportTimeseries,this.state.marketExportTimeseries=l.marketExportTimeseries,this.state.perMeterProductionTimeseries=u,this.state.loading=!1,this.renderPreserveMainScroll()}catch(s){console.error("Zoom data fetch failed:",s),this.state.loading=!1,this.clearRangeStateWithError(s,"Missing data"),this.render()}}getDateRangeISO(){if(this.state.chartViewportStart&&this.state.chartViewportEnd)return{start:this.state.chartViewportStart,end:this.state.chartViewportEnd};const e=new Date,a=s=>Ie(s);switch(this.state.range){case"custom":{const s=new Date(this.state.customStart+"T00:00:00"),o=new Date(this.state.customEnd+"T23:59:59.999");return{start:a(s),end:a(o)}}case"yesterday":{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const o=new Date(s);return o.setHours(23,59,59,999),{start:a(s),end:a(o)}}case"this_week":{const s=new Date(e),o=s.getDay()||7;return s.setDate(s.getDate()-o+1),s.setHours(0,0,0,0),{start:a(s),end:a(e)}}case"last_week":{const s=new Date(e),o=s.getDay()||7,n=new Date(s);n.setDate(s.getDate()-o),n.setHours(23,59,59,999);const r=new Date(n);return r.setDate(n.getDate()-6),r.setHours(0,0,0,0),{start:a(r),end:a(n)}}case"this_month":{const s=new Date(e.getFullYear(),e.getMonth(),1);return{start:a(s),end:a(e)}}case"last_month":{const s=new Date(e.getFullYear(),e.getMonth()-1,1),o=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:a(s),end:a(o)}}case"this_year":{const s=new Date(e.getFullYear(),0,1);return{start:a(s),end:a(e)}}case"last_year":{const s=new Date(e.getFullYear()-1,0,1),o=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:a(s),end:a(o)}}default:{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const o=new Date(s);return o.setHours(23,59,59,999),{start:a(s),end:a(o)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new Ws(t).mount()}export{Fa as b};
