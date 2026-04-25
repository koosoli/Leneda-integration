var pa=Object.defineProperty;var ua=(t,e,a)=>e in t?pa(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var Se=(t,e,a)=>ua(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const ha="modulepreload",ma=function(t){return"/leneda-panel/static/"+t},bt={},de=function(e,a,s){let r=Promise.resolve();if(a&&a.length>0){let n=function(m){return Promise.all(m.map(h=>Promise.resolve(h).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),p=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));r=n(a.map(m=>{if(m=ma(m),m in bt)return;bt[m]=!0;const h=m.endsWith(".css"),g=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${g}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":ha,h||(d.as="script"),d.crossOrigin="",d.href=m,p&&d.setAttribute("nonce",p),document.head.appendChild(d),h)return new Promise(($,f)=>{d.addEventListener("load",$),d.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${m}`)))})}))}function o(n){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=n,window.dispatchEvent(l),!l.defaultPrevented)throw n}return r.then(n=>{for(const l of n||[])l.status==="rejected"&&o(l.reason);return e().catch(o)})};function Vt(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()})),proxy_url:(t.proxy_url??"").trim()}}function ga(){var t,e,a,s,r;try{const o=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((r=(s=(a=o==null?void 0:o.hass)==null?void 0:a.auth)==null?void 0:s.data)==null?void 0:r.access_token)??null}catch{return null}}async function Q(t,e){const a=ga(),s={...e==null?void 0:e.headers,...a?{Authorization:`Bearer ${a}`}:{}},r={...e,credentials:"include",headers:s},o=await fetch(t,r);if(!o.ok){const n=o.headers.get("content-type")??"";let l="",p="";if(n.includes("application/json")){const m=await o.json().catch(()=>null);l=String((m==null?void 0:m.error)??"").trim(),p=String((m==null?void 0:m.message)??(m==null?void 0:m.error)??"").trim()}else p=(await o.text().catch(()=>"")).trim();throw l==="missing_data"||l==="no_data"||o.status===503?new Error("Missing data"):new Error(p?`API ${o.status}: ${p}`:`API ${o.status}: ${o.statusText}`)}return o.json()}async function Ze(t){return Q(`/leneda_api/data?range=${t}`)}async function va(t,e){return Q(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function Ke(t,e,a){let s=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(s+=`&start=${encodeURIComponent(e)}`),a&&(s+=`&end=${encodeURIComponent(a)}`),Q(s)}async function dt(t,e,a){let s=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(s+=`&start=${encodeURIComponent(e)}`),a&&(s+=`&end=${encodeURIComponent(a)}`),Q(s)}async function pt(){return Q("/leneda_api/sensors")}async function Ve(){return Q("/leneda_api/config")}async function ya(t){await Q("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function fa(){await Q("/leneda_api/config/reset",{method:"POST"})}async function Rt(){try{return await Q("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function It(){return Q("/leneda_api/credentials")}async function wa(t){const e=Vt(t);await Q("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function ba(t){const e=Vt(t);return Q("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function At(){return Q("/leneda_api/ha-entities")}const ke=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:Ve,fetchCredentials:It,fetchCustomData:va,fetchHAEntities:At,fetchMode:Rt,fetchPerMeterTimeseries:dt,fetchRangeData:Ze,fetchSensors:pt,fetchTimeseries:Ke,resetConfig:fa,saveConfig:ya,saveCredentials:wa,testCredentials:ba},Symbol.toStringTag,{value:"Module"}));function ht(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(e){const[,a,s,r]=e;return new Date(Number(a),Number(s)-1,Number(r))}return new Date(t)}function u(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function ye(t){return ht(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function Ht(t){return ht(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function Ee(t){return ht(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}const Je=[{id:"year",label:"Year",shortLabel:"Yr",stepLabel:"year",approxMs:365*864e5,maxBuckets:30},{id:"month",label:"Month",shortLabel:"Mo",stepLabel:"month",approxMs:30*864e5,maxBuckets:72},{id:"week",label:"Week",shortLabel:"Wk",stepLabel:"week",approxMs:7*864e5,maxBuckets:104},{id:"day",label:"Day",shortLabel:"Day",stepLabel:"day",approxMs:864e5,maxBuckets:370},{id:"hour",label:"Hour",shortLabel:"Hr",stepLabel:"hour",approxMs:36e5,maxBuckets:744},{id:"quarter_hour",label:"15 min",shortLabel:"15m",stepLabel:"15 minutes",approxMs:15*6e4,maxBuckets:672}];function Nt(t){return Je.find(e=>e.id===t)??Je[3]}function ut(t,e){if(!t||!e)return 0;const a=new Date(t).getTime(),s=new Date(e).getTime();return!Number.isFinite(a)||!Number.isFinite(s)?0:Math.max(0,s-a)}function Re(t,e){const a=Nt(t);if(e<=0)return t==="quarter_hour";const s=e/a.approxMs;return s>=1.5&&s<=a.maxBuckets}function $a(t,e){var r;if(e&&Re(e,t))return e;const a=t/864e5,s=a<=1.25?"quarter_hour":a<=7?"hour":a<=45?"day":a<=180?"week":a<=900?"month":"year";return Re(s,t)?s:((r=Je.find(o=>Re(o.id,t)))==null?void 0:r.id)??"quarter_hour"}function _a(t,e){return new Date(t,e+1,0).getDate()}function $t(t,e,a){const s=t.getDate(),r=new Date(t),o=r.getMonth()+a,n=r.getFullYear()+e+Math.floor(o/12),l=(o%12+12)%12,p=Math.min(s,_a(n,l));return r.setFullYear(n,l,p),r}function _t(t,e,a){switch(e){case"year":return $t(t,a,0);case"month":return $t(t,0,a);case"week":return new Date(t.getTime()+a*7*864e5);case"day":return new Date(t.getTime()+a*864e5);case"hour":return new Date(t.getTime()+a*36e5);case"quarter_hour":return new Date(t.getTime()+a*15*6e4)}}function Gt(t,e,a,s){if(!t||!e)return null;const r=new Date(t),o=new Date(e);return!Number.isFinite(r.getTime())||!Number.isFinite(o.getTime())?null:{start:_t(r,a,s),end:_t(o,a,s)}}function xa(t,e){if(!t||!e)return"No period loaded";const a=new Date(t),s=new Date(e);if(!Number.isFinite(a.getTime())||!Number.isFinite(s.getTime()))return"No period loaded";if(a.getFullYear()===s.getFullYear()&&a.getMonth()===s.getMonth()&&a.getDate()===s.getDate()){const o=a.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),n=a.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),l=s.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${o}, ${n} - ${l}`}return`${a.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})} - ${s.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}`}const Ie=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function pe(t){const e=a=>`
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
      `)}}function ka(t){var ge,Me,Le,ve,we,be,Ce,Ue;const e=t.rangeData,a=x=>{if(!x)return"";const E=x.match(/^(\d{4}-\d{2}-\d{2})/);return E?E[1]:""},s=(e==null?void 0:e.consumption)??0,r=(e==null?void 0:e.production)??0,o=(e==null?void 0:e.exported)??0,n=(e==null?void 0:e.self_consumed)??0,l=(e==null?void 0:e.gas_energy)??0,p=(e==null?void 0:e.gas_volume)??0,m=(e==null?void 0:e.peak_power_kw)??0,h=a(e==null?void 0:e.start),g=a(e==null?void 0:e.end),d=(e==null?void 0:e.shared_with_me)??0,$=(e==null?void 0:e.shared)??0,f=Math.max(0,o),b=Math.max(0,(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(n>0?n:r-f)),M=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??b),k=b,_=Math.max(0,(e==null?void 0:e.grid_import)??s-b),C=s>0?s:_+b,i=!!((ge=t.config)!=null&&ge.meter_has_gas||(((Me=t.config)==null?void 0:Me.meters)??[]).some(x=>x.types.includes("gas"))),y=$+d,c=C>0?Math.min(100,b/C*100):0,v=Math.max(C,r,_,f,$,d,M,1),T=i?Math.min(Math.max(0,l),v):0,F=(x,E=2.8,L=8.2)=>x>0?E+x/v*(L-E):1.8,D=x=>F(x)+1.4,K=x=>F(x)+5.4,V=(x,E=.28,L=.88)=>x>0?E+x/v*(L-E):.1,R=(x,E=.09,L=.22)=>x>0?E+x/v*(L-E):.05,q=(x,E=1.6,L=3.9)=>`${(x>0?Math.max(E,L-x/v*(L-E)):L).toFixed(2)}s`,ae=(x,E=3.4,L=5.8)=>x>0?E+x/v*(L-E):3,Y=x=>x>0?Math.max(18,Math.round(x/v*100)):0,se=x=>`
    <defs>
      <filter id="${x}-glow-red" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${x}-glow-green" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${x}-glow-blue" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${x}-glow-cyan" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${x}-glow-gas" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <linearGradient id="${x}-flow-solar" x1="50%" y1="6%" x2="50%" y2="88%">
        <stop offset="0%" stop-color="var(--clr-production)" stop-opacity="0.28" />
        <stop offset="100%" stop-color="var(--clr-production)" stop-opacity="1" />
      </linearGradient>
      <linearGradient id="${x}-flow-grid-in" x1="8%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stop-color="var(--clr-consumption)" stop-opacity="0.35" />
        <stop offset="100%" stop-color="var(--clr-consumption)" stop-opacity="0.95" />
      </linearGradient>
      <linearGradient id="${x}-flow-grid-out" x1="100%" y1="44%" x2="4%" y2="76%">
        <stop offset="0%" stop-color="var(--clr-export)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--clr-export)" stop-opacity="0.4" />
      </linearGradient>
      <linearGradient id="${x}-flow-shared-out" x1="0%" y1="48%" x2="100%" y2="48%">
        <stop offset="0%" stop-color="var(--clr-export)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--clr-export)" stop-opacity="0.45" />
      </linearGradient>
      <linearGradient id="${x}-flow-shared-in" x1="100%" y1="48%" x2="0%" y2="48%">
        <stop offset="0%" stop-color="var(--clr-primary)" stop-opacity="0.4" />
        <stop offset="100%" stop-color="var(--clr-primary)" stop-opacity="1" />
      </linearGradient>
      <linearGradient id="${x}-flow-gas" x1="50%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stop-color="var(--clr-gas)" stop-opacity="0.3" />
        <stop offset="100%" stop-color="var(--clr-gas)" stop-opacity="0.95" />
      </linearGradient>

      <linearGradient id="${x}-scene-shell" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.05)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
      </linearGradient>
      <radialGradient id="${x}-house-base-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--clr-surface-alt)" stop-opacity="0.8" />
        <stop offset="100%" stop-color="var(--clr-surface-alt)" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="${x}-house-core-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(88, 166, 255, 0.18)" />
        <stop offset="100%" stop-color="rgba(88, 166, 255, 0)" />
      </radialGradient>
    </defs>
  `,X=x=>{const{x:E,y:L,width:N,accent:B,kicker:$e,value:te,detail:ce}=x;return`
      <g class="scene-node-label" transform="translate(${E}, ${L})">
        <rect width="${N}" height="${ce?70:54}" rx="18" fill="var(--clr-overlay)" stroke="${B}" />
        <text x="16" y="22" class="scene-node-kicker">${$e}</text>
        <text x="16" y="${ce?39:37}" class="scene-node-value">${te}</text>
        ${ce?`<text x="16" y="56" class="scene-node-detail">${ce}</text>`:""}
      </g>
    `},ne=x=>{const{x:E,y:L,scale:N=1,glowId:B}=x;return`
      <g class="scene-tier-icon scene-tier-grid" transform="translate(${E}, ${L}) scale(${N})">
        <circle cx="0" cy="44" r="48" fill="var(--clr-consumption)" fill-opacity="0.06" />
        <path d="M0 0 V88 M-24 20 H24 M-16 42 H16 M-8 66 H8" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" filter="url(#${B})" />
        <path d="M-12 88 L0 60 L12 88" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" fill="none" />
      </g>
    `},oe=x=>{const{x:E,y:L,scale:N=1,glowId:B}=x;return`
      <g class="scene-tier-icon scene-tier-solar" transform="translate(${E}, ${L}) scale(${N})">
        <circle cx="0" cy="0" r="26" fill="var(--clr-production)" fill-opacity="0.09" />
        <circle cx="0" cy="0" r="12" fill="var(--clr-production)" fill-opacity="0.9" filter="url(#${B})" />
        <path d="M0 -26 V-40 M0 26 V40 M26 0 H40 M-26 0 H-40 M18 -18 L28 -28 M18 18 L28 28 M-18 18 L-28 28 M-18 -18 L-28 -28" stroke="var(--clr-production)" stroke-width="2.5" stroke-linecap="round" />
      </g>
    `},ie=x=>{const{x:E,y:L,scale:N=1,glowId:B}=x;return`
      <g class="scene-tier-icon scene-tier-community" transform="translate(${E}, ${L}) scale(${N})">
        <circle cx="0" cy="40" r="50" fill="var(--clr-primary)" fill-opacity="0.06" />
        <rect x="-26" y="30" width="22" height="42" rx="6" fill="rgba(88, 166, 255, 0.08)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="6" y="16" width="24" height="56" rx="6" fill="rgba(88, 166, 255, 0.12)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="-2" y="4" width="6" height="10" rx="2" fill="var(--clr-primary)" fill-opacity="0.7" />
        <path d="M-14 12 H14 M-10 4 V20 M10 4 V20" stroke="var(--clr-primary)" stroke-width="2" stroke-linecap="round" filter="url(#${B})" />
      </g>
    `},O=x=>{const{x:E,y:L,scale:N=1,glowId:B}=x;return`
      <g class="scene-tier-icon scene-tier-gas" transform="translate(${E}, ${L}) scale(${N})">
        <circle cx="0" cy="38" r="46" fill="var(--clr-gas)" fill-opacity="0.08" />
        <path d="M-26 40 H-8 V72 H26" stroke="var(--clr-gas)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#${B})" />
        <path d="M0 4 C18 24 20 40 20 52 C20 70 9 84 0 84 C-9 84 -20 70 -20 52 C-20 38 -10 24 0 4 Z" fill="rgba(210, 153, 34, 0.14)" stroke="var(--clr-gas)" stroke-width="2.2" />
        <path d="M0 24 C9 35 10 44 10 52 C10 61 5 68 0 72 C-5 68 -10 61 -10 52 C-10 44 -8 35 0 24 Z" fill="var(--clr-gas)" fill-opacity="0.85" />
      </g>
    `},I=x=>{const{prefix:E,x:L,y:N,scale:B=1}=x;return`
      <g class="elite-house" transform="translate(${L}, ${N}) scale(${B})">
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
          <text text-anchor="middle" y="18" class="house-core-value">${u(c,0)}%</text>
        </g>
        <text x="90" y="262" text-anchor="middle" class="house-total-label">Home usage</text>
        <text x="90" y="284" text-anchor="middle" class="house-total-value">${u(C)} kWh</text>
      </g>
    `},A=x=>{const{path:E,value:L,gradientId:N,colorVar:B,filterId:$e,particleClass:te,direction:ce="forward"}=x,_e=ce==="reverse"?"1;0":"0;1";return`
      <path
        class="flow-halo ${te}"
        d="${E}"
        stroke="url(#${N})"
        stroke-width="${K(L).toFixed(1)}"
        stroke-opacity="${R(L).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-rail ${te}"
        d="${E}"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="${D(L).toFixed(1)}"
        stroke-opacity="0.42"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-stream ${te}"
        d="${E}"
        stroke="url(#${N})"
        stroke-width="${F(L).toFixed(1)}"
        stroke-opacity="${V(L).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      ${L>0?`
        <circle
          class="flow-particle ${te}"
          r="${ae(L).toFixed(1)}"
          fill="${B}"
          filter="url(#${$e})"
        >
          <animateMotion dur="${q(L)}" repeatCount="indefinite" path="${E}" keyPoints="${_e}" keyTimes="0;1" calcMode="linear" />
        </circle>
        <circle
          class="flow-particle flow-particle-secondary ${te}"
          r="${Math.max(2.4,ae(L)-1.2).toFixed(1)}"
          fill="${B}"
          fill-opacity="0.75"
          filter="url(#${$e})"
        >
          <animateMotion dur="${q(L)}" begin="-${(parseFloat(q(L))/2).toFixed(2)}s" repeatCount="indefinite" path="${E}" keyPoints="${_e}" keyTimes="0;1" calcMode="linear" />
        </circle>
      `:""}
    `},ee=()=>`
    <div class="elite-scene elite-scene-desktop">
      <svg class="elite-main-svg" viewBox="0 0 860 460" fill="none" preserveAspectRatio="xMidYMid meet">
        ${se("desktop")}
        <rect x="34" y="30" width="792" height="372" rx="34" fill="url(#desktop-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="430" cy="330" rx="278" ry="60" fill="url(#desktop-house-base-glow)" opacity="0.56" />
        <line x1="98" y1="334" x2="762" y2="334" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.45" />

        ${X({x:58,y:108,width:152,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${u(_+f)} kWh`,detail:f>0?`In ${u(_)} / out ${u(f)} kWh`:void 0})}

        ${X({x:356,y:44,width:148,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${u(r)} kWh`,detail:`${u(b)} kWh used at home`})}

        ${X({x:624,y:108,width:184,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${u(y)} kWh`,detail:`Sent ${u($)} / got ${u(d)} kWh`})}

        ${i?X({x:350,y:338,width:160,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${u(l)} kWh`,detail:p>0?`${u(p)} m3 in period`:"Gas meter active"}):""}

        ${ne({x:132,y:186,scale:1.02,glowId:"desktop-glow-red"})}
        ${oe({x:430,y:126,glowId:"desktop-glow-green"})}
        ${ie({x:716,y:194,glowId:"desktop-glow-cyan"})}
        ${i?O({x:430,y:352,glowId:"desktop-glow-gas"}):""}
        ${I({prefix:"desktop",x:340,y:96,scale:1.02})}

        ${A({path:"M 430 152 C 430 182 430 204 430 220",value:M,gradientId:"desktop-flow-solar",colorVar:"var(--clr-production)",filterId:"desktop-glow-green",particleClass:"flow-solar"})}

        ${A({path:"M 176 230 C 246 230 318 230 364 232",value:_,gradientId:"desktop-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"desktop-glow-red",particleClass:"flow-grid-in"})}

        ${A({path:"M 496 268 C 430 298 326 314 176 316",value:f,gradientId:"desktop-flow-grid-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-grid-out"})}

        ${A({path:"M 500 234 C 566 220 634 220 692 236",value:$,gradientId:"desktop-flow-shared-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-shared-out"})}

        ${A({path:"M 690 272 C 632 292 566 294 500 278",value:d,gradientId:"desktop-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"desktop-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${i?A({path:"M 430 404 C 430 370 430 336 430 302",value:T,gradientId:"desktop-flow-gas",colorVar:"var(--clr-gas)",filterId:"desktop-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,j=()=>`
    <div class="elite-scene elite-scene-mobile">
      <svg class="elite-main-svg" viewBox="0 0 420 560" fill="none" preserveAspectRatio="xMidYMid meet">
        ${se("mobile")}
        <rect x="20" y="20" width="380" height="520" rx="32" fill="url(#mobile-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="210" cy="316" rx="136" ry="38" fill="url(#mobile-house-base-glow)" opacity="0.58" />
        <line x1="64" y1="332" x2="356" y2="332" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.42" />

        ${X({x:132,y:40,width:156,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${u(r)} kWh`})}

        ${X({x:20,y:194,width:126,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${u(_+f)} kWh`})}

        ${X({x:274,y:194,width:126,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${u(y)} kWh`})}

        ${i?X({x:122,y:442,width:176,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${u(l)} kWh`,detail:p>0?`${u(p)} m3`:"Gas meter active"}):""}

        ${oe({x:210,y:126,scale:.92,glowId:"mobile-glow-green"})}
        ${ne({x:76,y:254,scale:.86,glowId:"mobile-glow-red"})}
        ${ie({x:344,y:260,scale:.86,glowId:"mobile-glow-cyan"})}
        ${i?O({x:210,y:442,scale:.9,glowId:"mobile-glow-gas"}):""}
        ${I({prefix:"mobile",x:118,y:166,scale:.94})}

        ${A({path:"M 210 152 C 210 188 210 216 210 238",value:M,gradientId:"mobile-flow-solar",colorVar:"var(--clr-production)",filterId:"mobile-glow-green",particleClass:"flow-solar"})}

        ${A({path:"M 104 286 C 138 286 168 286 194 286",value:_,gradientId:"mobile-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"mobile-glow-red",particleClass:"flow-grid-in"})}

        ${A({path:"M 226 318 C 194 340 162 348 102 350",value:f,gradientId:"mobile-flow-grid-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-grid-out"})}

        ${A({path:"M 226 286 C 262 274 294 274 318 286",value:$,gradientId:"mobile-flow-shared-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-shared-out"})}

        ${A({path:"M 318 320 C 294 332 262 334 226 322",value:d,gradientId:"mobile-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"mobile-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${i?A({path:"M 210 474 C 210 432 210 390 210 344",value:T,gradientId:"mobile-flow-gas",colorVar:"var(--clr-gas)",filterId:"mobile-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,Fe=e!=null&&e.start&&(e!=null&&e.end)?`${ye(e.start)} — ${ye(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${ye(t.customStart+"T00:00:00")} — ${ye(t.customEnd+"T00:00:00")}`:((Le=Ie.find(x=>x.id===t.range))==null?void 0:Le.label)??"Yesterday",Z=(we=(ve=t.consumptionTimeseries)==null?void 0:ve.items)!=null&&we.length?t.consumptionTimeseries.items:((be=t.productionTimeseries)==null?void 0:be.items)??[],he=t.chartViewportStart??((Ce=Z[0])==null?void 0:Ce.startedAt)??(e==null?void 0:e.start),J=t.chartViewportEnd??((Ue=Z[Z.length-1])==null?void 0:Ue.startedAt)??(e==null?void 0:e.end),Ae=ut(he,J),le=Nt(t.chartTimeBucket),me=xa(he,J),z=Gt(he,J,t.chartTimeBucket,1),He=new Date,tt=!z||z.start.getTime()>He.getTime(),Ne=Je.map(x=>{const E=Re(x.id,Ae),L=x.id===t.chartTimeBucket,N=x.id==="quarter_hour"?"15-minute detail would be too dense for this selected period":`${x.label} detail does not add useful resolution for this selected period`;return`
            <button
              class="unit-btn chart-bucket-btn ${L?"active":""}"
              data-chart-bucket="${x.id}"
              title="${E?`Show ${x.label.toLowerCase()} detail`:N}"
              ${E?"":'disabled aria-disabled="true"'}
            >${x.label}</button>
          `}).join(""),Ge=t.chartUnit==="kw"?"kW uses the same detail presets as kWh, but keeps power values in interval bars so short spikes and dips stay visible.":"kWh keeps the aggregated period bars for totals.",at=`${t.chartConsumptionView==="house"?"Total Usage shows the full house load, with the solar-covered share highlighted in green and exports below zero. Use the detail presets and arrows above the graph to move through time.":t.chartConsumptionView==="solar_systems"?"PV Systems stacks each configured solar production meter so you can compare panel-system output like the Home Assistant Energy dashboard.":"Net Grid focuses on what still came from the grid after solar, with exports shown below zero. The reference limit in kW mode applies here."} ${Ge}`,Oe=((e==null?void 0:e.exceedance_kwh)??0)>0?pe("warning"):pe("ok");return`
    <div class="dashboard" style="position: relative;">
      <div style="position:fixed;bottom:4px;right:4px;font-size:10px;opacity:0.5;pointer-events:none;z-index:9999;">v:2.9.1</div>

      <!-- Range Selector -->
      <div class="range-selector">
        ${Ie.map(x=>`
          <button
            class="range-btn ${x.id===t.range?"active":""}"
            data-range="${x.id}"
          >${x.label}</button>
        `).join("")}
      </div>

      ${(()=>{if(!(e!=null&&e.start)||!(e!=null&&e.end))return"";try{const x=new Date(e.start),E=new Date(e.end);return isNaN(x.getTime())||isNaN(E.getTime())?"":`
            <div class="range-info-bar">
              📅 ${x.toLocaleDateString()} — ${E.toLocaleDateString()}
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
      `:h&&g?`
      <!-- Preset Period Preview -->
      <div class="custom-range-picker period-preview">
        <span class="period-preview-label">Viewed period</span>
        <label>
          <span>From</span>
          <input type="date" value="${h}" readonly aria-label="Preset period start" />
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
          <div class="stat-icon">${pe("consumption")}</div>
          <div class="stat-body">
            <div class="stat-label">Consumption</div>
            <div class="stat-value">${u(s)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card production">
          <div class="stat-icon">${pe("production")}</div>
          <div class="stat-body">
            <div class="stat-label">Production</div>
            <div class="stat-value">${u(r)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.export">
          <div class="stat-icon">${pe("export")}</div>
          <div class="stat-body">
            <div class="stat-label">Exported</div>
            <div class="stat-value">${u(o)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.self-consumed">
          <div class="stat-icon">${pe("self_consumed")}</div>
          <div class="stat-body">
            <div class="stat-label">Self-Consumed</div>
            <div class="stat-value">${u(k)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>
      </div>

      <!-- Energy Flow + Key Metrics side by side -->
      <div class="flow-metrics-row">
        <div class="card flow-card">
          <h3 class="card-title"><span class="title-icon">${pe("flow")}</span> Energy Flow</h3>

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
                    <span class="module-value highlight-green">${u(r)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg green"></div></div>
              </div>
            </div>

            <div class="flow-scene-summary">
              <span class="flow-scene-chip solar">Self-sufficient ${u(c,0)}%</span>
              <span class="flow-scene-chip import">Grid import ${u(_)} kWh</span>
              <span class="flow-scene-chip export">Export ${u(f)} kWh</span>
              <span class="flow-scene-chip community">Community ${u(y)} kWh</span>
              ${m>0?`<span class="flow-scene-chip neutral">Peak ${u(m,2)} kW</span>`:""}
            </div>

            <p class="flow-scene-caption">
              Thicker paths show larger energy volumes for the selected period. Green flows stay in the home, red flows come from the grid, blue flows leave the home or community, and amber shows gas.
            </p>

            ${ee()}
            ${j()}

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${u(C)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${u(c,0)}% solar supplied${m>0?` · Peak ${u(m,2)} kW`:""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${u(b)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${Y(b)}%;"></span></div>
                  <p>Energy used inside the house${d>0?", including received community energy":""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${u(_)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${Y(_)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${u(f)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${Y(f)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${u(y)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${Y(y)}%;"></span></div>
                  <p>Sent ${u($)} kWh · received ${u(d)} kWh.</p>
                </div>
                ${i?`
                <div class="mobile-flow-item gas">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Gas to house</span>
                    <strong>${u(l)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${Y(T||v)}%;"></span></div>
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
                  <span>${u(b)} kWh directly supplied inside the house</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${u(_)} kWh still needed from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${u(f)} kWh sent back to the market or grid</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${u($)} kWh sent · ${u(d)} kWh received${d>0?" (included in solar to home)":""}</span>
                </span>
              </div>
              ${i?`
              <div class="flow-legend-item gas">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Gas to house</strong>
                  <span>${u(l)} kWh${p>0?` / ${u(p)} m3`:""}</span>
                </span>
              </div>
              `:""}
            </div>
          </div>
      </div>

      <!-- Key Metrics (right of flow) -->
      <div class="card metrics-card">
        <h3 class="card-title"><span class="title-icon">${pe("metrics")}</span> Key Metrics</h3>
        <div class="metrics-list">
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Sufficiency</span>
              <span class="metric-value">${u(c,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${c}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Consumed</span>
              <span class="metric-value">${u(k)} kWh</span>
            </div>
          </div>
          ${m>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${u(m,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label"><span class="metric-status-icon">${Oe}</span> Exceedance</span>
              <span class="metric-value">${u((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${l>0||p>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${u(l)} kWh</span>
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
          <h3 class="card-title"><span class="title-icon">${pe("profile")}</span> Energy Profile — ${Fe}</h3>
          <div class="chart-period-status">
            <span class="chart-period-kicker">Showing</span>
            <strong>${me}</strong>
            <span>${le.label} detail</span>
          </div>

          <div class="chart-control-stack">
            <div class="chart-period-controls" aria-label="Move chart period">
              <button
                class="chart-nav-btn"
                data-chart-period-nav="prev"
                title="Previous ${le.stepLabel}"
                aria-label="Previous ${le.stepLabel}"
              >&larr;</button>
              <span class="chart-period-pill">${me}</span>
              <button
                class="chart-nav-btn"
                data-chart-period-nav="next"
                title="Next ${le.stepLabel}"
                aria-label="Next ${le.stepLabel}"
                ${tt?'disabled aria-disabled="true"':""}
              >&rarr;</button>
            </div>

            <div class="chart-bucket-toggle" aria-label="Chart detail presets">
              ${Ne}
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
          ${at}
        </p>
      </div>

      </div>

      </div>
    </section>
  `}function Ma(t=""){return{iso:t,consumptionKw:0,productionKw:0,gridImportKw:0,solarExportKw:0}}function Ye(t,e,a){for(const s of(e==null?void 0:e.items)??[]){const r=new Date(s.startedAt).getTime();if(!Number.isFinite(r))continue;const o=t.get(r)??Ma(s.startedAt);o[a]+=Math.max(0,Number(s.value)||0),o.iso||(o.iso=s.startedAt),t.set(r,o)}}function Ca(t,e,a={}){var n,l,p,m;const s=new Map,r=!!((l=(n=a.gridImport)==null?void 0:n.items)!=null&&l.length),o=!!((m=(p=a.marketExport)==null?void 0:p.items)!=null&&m.length);return Ye(s,t,"consumptionKw"),Ye(s,e,"productionKw"),Ye(s,a.gridImport,"gridImportKw"),Ye(s,a.marketExport,"solarExportKw"),[...s.entries()].sort((h,g)=>h[0]-g[0]).map(([h,g])=>{const d=Math.max(0,g.consumptionKw),$=Math.max(0,g.productionKw),f=Math.max(0,Math.min(d,$)),b=r?Math.max(0,g.gridImportKw):Math.max(0,d-f),M=Math.max(0,d-b),k=o?Math.max(0,g.solarExportKw):Math.max(0,$-f);return{timestamp:h,iso:g.iso||new Date(h).toISOString(),consumptionKw:d,productionKw:$,solarToHomeKw:M,gridImportKw:b,solarExportKw:k}})}const xt=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],We={house:"Total Usage",grid:"Net Grid",solar:"Solar Production",exceedance_kwh:"Exceedance kWh",exceedance_frequency:"Exceedance Rate"},je={house:"Total Usage",grid:"Net Grid",solar:"Solar Production"},Te={previous:"Previous Period",last_year:"Last Year"};function kt(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function Sa(t){const e=new Date(t),a=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${a}-${s}-${r}`}function Ta(t){const[e,a,s]=t.split("-").map(Number);return new Date(e,a-1,s,12,0,0,0)}function re(t,e=0){return t.length?Math.max(...t):e}function mt(t,e=0){return t.length?Math.min(...t):e}function De(t,e,a){return Math.min(a,Math.max(e,t))}function U(t,e){if(!t.length)return 0;const a=[...t].sort((p,m)=>p-m),s=De(e,0,1),r=(a.length-1)*s,o=Math.floor(r),n=Math.ceil(r);if(o===n)return a[o];const l=r-o;return a[o]*(1-l)+a[n]*l}function Ea(t){const e=Math.floor(t/4),a=t%4*15;return`${String(e).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function G(t,e){return`${u(t,2)} ${e}`}function Qe(t,e){return`${t>0?"+":t<0?"-":""}${u(Math.abs(t),2)} ${e}`}function ze(t,e=1){return Math.abs(t)<.005?"0":`${t>0?"+":""}${u(t,e)}`}function Mt(t){const[e,a]=t.split(":").map(s=>parseInt(s,10)||0);return e*60+a}function Da(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function Ot(t,e,a,s){if(!Da(t.getDay(),e))return!1;const r=t.getHours()*60+t.getMinutes(),o=Mt(a),n=Mt(s);return o===n?!0:o<n?r>=o&&r<n:r>=o||r<n}function Fa(t,e){return e.find(a=>Ot(t,a.day_group,a.start_time,a.end_time))}function La(t,e){return e.find(a=>Ot(t,a.day_group,a.start_time,a.end_time))}function Wa(t){const e=(t.meters??[]).filter(r=>r.types.includes("production")),a=t.feed_in_rates??[];if(!e.length)return t.feed_in_tariff??0;const s=e.map(r=>{const o=a.find(l=>l.meter_id===r.id);return o?o.mode==="sensor"&&o.sensor_value!=null&&Number.isFinite(o.sensor_value)?o.sensor_value??0:Number.isFinite(o.tariff)?o.tariff:t.feed_in_tariff??0:t.feed_in_tariff??0}).filter(r=>Number.isFinite(r)&&r>=0);return s.length?s.reduce((r,o)=>r+o,0)/s.length:t.feed_in_tariff??0}function Pa(t,e,a,s,r){const o=r.consumption_rate_windows??[],n=r.reference_power_windows??[],l=r.reference_power_kw??0,p=Wa(r),m=(r.exceedance_rate??0)*(1+(r.vat_rate??0));return Ca(t,e,{gridImport:a,marketExport:s}).map(h=>{var T,F;const g=h.timestamp,d=new Date(g),$=h.consumptionKw,f=h.productionKw,b=h.solarToHomeKw,M=h.gridImportKw,k=h.solarExportKw,_=((T=La(d,n))==null?void 0:T.reference_power_kw)??l,C=Math.max(0,$-_),i=Math.max(0,M-_),y=Math.max(0,C-i),v=((((F=Fa(d,o))==null?void 0:F.rate)??r.energy_variable_rate??0)+(r.network_variable_rate??0)+(r.electricity_tax_rate??0)+(r.compensation_fund_rate??0))*(1+(r.vat_rate??0));return{timestamp:g,iso:h.iso,date:d,houseKw:$,solarKw:f,solarToHomeKw:b,gridKw:M,exportKw:k,referenceKw:_,overKw:i,avoidedOverKw:y,importRateWithVat:v,feedInRate:p,exceedanceRateWithVat:m}})}function Ut(t,e,a,s,r){const o=Pa(t,e,a,s,r),n=new Map,l=Array.from({length:24},()=>0),p=Array.from({length:24},(i,y)=>({label:`${String(y).padStart(2,"0")}:00`,importCost:0,exportSpreadValue:0,gridKwh:0,exportKwh:0})),m={house:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),grid:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),solar:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_kwh:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_frequency:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0})))},h=()=>Array.from({length:96},()=>[]),g={house:{weekday:h(),weekend:h()},grid:{weekday:h(),weekend:h()},solar:{weekday:h(),weekend:h()}},d={houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0};for(const i of o){const c=Sa(i.timestamp),v=n.get(c)??(()=>{const j=Ta(c);return{key:c,label:j.toLocaleDateString(void 0,{month:"short",day:"numeric"}),fullDate:j.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0}})(),T=i.houseKw*.25,F=i.solarKw*.25,D=i.solarToHomeKw*.25,K=i.gridKw*.25,V=i.exportKw*.25,R=i.overKw*.25,q=i.avoidedOverKw*.25,ae=K*i.importRateWithVat,Y=D*i.importRateWithVat,se=V*i.feedInRate,X=D*(i.importRateWithVat-i.feedInRate),ne=R*i.exceedanceRateWithVat,oe=q*i.exceedanceRateWithVat,ie=Y+se+oe-ae-ne;v.houseKwh+=T,v.solarKwh+=F,v.solarToHomeKwh+=D,v.gridKwh+=K,v.exportKwh+=V,v.exceedanceKwh+=R,v.avoidedExceedanceKwh+=q,v.importCost+=ae,v.solarSavings+=Y,v.exportRevenue+=se,v.selfConsumptionAdvantage+=X,v.exceedanceCost+=ne,v.avoidedExceedanceValue+=oe,v.netValue+=ie,v.peakGridKw=Math.max(v.peakGridKw,i.gridKw),v.peakHouseKw=Math.max(v.peakHouseKw,i.houseKw),v.exceedanceIntervals+=i.overKw>0?1:0,n.set(c,v),d.houseKwh+=T,d.solarKwh+=F,d.solarToHomeKwh+=D,d.gridKwh+=K,d.exportKwh+=V,d.exceedanceKwh+=R,d.avoidedExceedanceKwh+=q,d.importCost+=ae,d.solarSavings+=Y,d.exportRevenue+=se,d.selfConsumptionAdvantage+=X,d.exceedanceCost+=ne,d.avoidedExceedanceValue+=oe,d.netValue+=ie,d.peakGridKw=Math.max(d.peakGridKw,i.gridKw),d.peakHouseKw=Math.max(d.peakHouseKw,i.houseKw),d.exceedanceIntervals+=i.overKw>0?1:0;const O=(i.date.getDay()+6)%7,I=i.date.getHours(),A=I*4+Math.floor(i.date.getMinutes()/15),ee=i.date.getDay()===0||i.date.getDay()===6?"weekend":"weekday";m.house[O][I].sum+=i.houseKw,m.house[O][I].count+=1,m.grid[O][I].sum+=i.gridKw,m.grid[O][I].count+=1,m.solar[O][I].sum+=i.solarKw,m.solar[O][I].count+=1,m.exceedance_kwh[O][I].sum+=R,m.exceedance_kwh[O][I].count+=1,m.exceedance_frequency[O][I].sum+=i.overKw>0?1:0,m.exceedance_frequency[O][I].count+=1,l[I]+=R,g.house[ee][A].push(i.houseKw),g.grid[ee][A].push(i.gridKw),g.solar[ee][A].push(i.solarKw),p[I].importCost+=ae,p[I].exportSpreadValue+=V*Math.max(i.importRateWithVat-i.feedInRate,0),p[I].gridKwh+=K,p[I].exportKwh+=V}const $=[...n.values()].sort((i,y)=>i.key.localeCompare(y.key)).map(i=>(i.coveragePct=i.houseKwh>0?i.solarToHomeKwh/i.houseKwh*100:0,i.selfConsumedPct=i.solarKwh>0?De(i.solarToHomeKwh/i.solarKwh*100,0,100):0,i.solarValue=i.solarSavings+i.exportRevenue+i.avoidedExceedanceValue,i));d.coveragePct=d.houseKwh>0?d.solarToHomeKwh/d.houseKwh*100:0,d.selfConsumedPct=d.solarKwh>0?De(d.solarToHomeKwh/d.solarKwh*100,0,100):0,d.solarValue=d.solarSavings+d.exportRevenue+d.avoidedExceedanceValue;const f={house:m.house.map(i=>i.map(y=>y.count?y.sum/y.count:0)),grid:m.grid.map(i=>i.map(y=>y.count?y.sum/y.count:0)),solar:m.solar.map(i=>i.map(y=>y.count?y.sum/y.count:0)),exceedance_kwh:m.exceedance_kwh.map(i=>i.map(y=>y.sum)),exceedance_frequency:m.exceedance_frequency.map(i=>i.map(y=>y.count?y.sum/y.count*100:0))},b=Array.from({length:96},(i,y)=>Ea(y)),M={house:{weekday:{lower:g.house.weekday.map(i=>U(i,.1)),median:g.house.weekday.map(i=>U(i,.5)),upper:g.house.weekday.map(i=>U(i,.9))},weekend:{lower:g.house.weekend.map(i=>U(i,.1)),median:g.house.weekend.map(i=>U(i,.5)),upper:g.house.weekend.map(i=>U(i,.9))}},grid:{weekday:{lower:g.grid.weekday.map(i=>U(i,.1)),median:g.grid.weekday.map(i=>U(i,.5)),upper:g.grid.weekday.map(i=>U(i,.9))},weekend:{lower:g.grid.weekend.map(i=>U(i,.1)),median:g.grid.weekend.map(i=>U(i,.5)),upper:g.grid.weekend.map(i=>U(i,.9))}},solar:{weekday:{lower:g.solar.weekday.map(i=>U(i,.1)),median:g.solar.weekday.map(i=>U(i,.5)),upper:g.solar.weekday.map(i=>U(i,.9))},weekend:{lower:g.solar.weekend.map(i=>U(i,.1)),median:g.solar.weekend.map(i=>U(i,.5)),upper:g.solar.weekend.map(i=>U(i,.9))}}},k=o.filter(i=>i.overKw>0).sort((i,y)=>y.overKw-i.overKw||y.timestamp-i.timestamp).slice(0,8),_=[...o].sort((i,y)=>y.houseKw-i.houseKw||y.timestamp-i.timestamp).slice(0,8),C=[...$].filter(i=>i.exceedanceKwh>0).sort((i,y)=>y.exceedanceKwh-i.exceedanceKwh).slice(0,6);return{points:o,daily:$,totals:d,topExceedances:k,peakIntervals:_,hourlyExceedanceKwh:l,heatmapValues:f,intradayProfiles:M,intradayLabels:b,hourlyOpportunity:p,loadDurationGrossKw:o.map(i=>i.houseKw).sort((i,y)=>y-i),loadDurationNetKw:o.map(i=>i.gridKw).sort((i,y)=>y-i),worstDays:C}}function Ka(t){var e,a,s;return(e=t.rangeData)!=null&&e.start&&((a=t.rangeData)!=null&&a.end)?`${ye(t.rangeData.start)} - ${ye(t.rangeData.end)}`:((s=Ie.find(r=>r.id===t.range))==null?void 0:s.label)??"Selected Period"}function Va(t){var e,a;return(e=t.rangeData)!=null&&e.start&&((a=t.rangeData)!=null&&a.end)?`${Ee(t.rangeData.start)} - ${Ee(t.rangeData.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${t.customStart} - ${t.customEnd}`:"Based on the currently selected range."}function Ct(t){const e=t.analysisComparisonMode==="last_year"?"Same period last year":"Previous matched period";return t.analysisComparison?`${e}: ${Ee(t.analysisComparison.start)} - ${Ee(t.analysisComparison.end)}`:e}function Ra(t){switch(t){case"house":return{description:"Average hourly power by weekday for total house usage.",note:"Each cell shows the average kW seen in that weekday/hour slot over the selected period."};case"grid":return{description:"Average hourly power by weekday for remaining grid draw after solar.",note:"Each cell shows the average net-grid kW seen in that weekday/hour slot over the selected period."};case"solar":return{description:"Average hourly power by weekday for solar production.",note:"Each cell shows the average solar kW seen in that weekday/hour slot over the selected period."};case"exceedance_kwh":return{description:"Cumulative exceedance energy by weekday and hour, showing where the reference limit hurt the most.",note:"Each cell shows cumulative exceedance kWh recorded in that weekday/hour slot over the selected period."};case"exceedance_frequency":return{description:"How often each weekday/hour slot went over the reference limit.",note:"Each cell shows the share of 15-minute intervals in that weekday/hour slot that exceeded the reference limit."}}}function Ia(t,e){switch(t){case"house":case"grid":case"solar":return`${u(e,2)} kW average`;case"exceedance_kwh":return`${u(e,2)} kWh`;case"exceedance_frequency":return`${u(e,0)}% of intervals`}}function ue(t){const e=t.series.filter(v=>v.values.length>0);if(!e.length)return'<div class="analysis-empty">No chart data available for this period.</div>';const a=Math.max(...e.map(v=>v.values.length)),s=Math.max(720,a*24+92),r=244,o=50,n=20,l=18,p=30,m=e.flatMap(v=>v.values);t.referenceValue!=null&&m.push(t.referenceValue);let h=t.minValue??mt(m,0),g=t.maxValue??re(m,1);h===g&&(g+=1,h=Math.min(0,h-1)),t.minValue==null&&(h=Math.min(0,h));const d=s-o-n,$=r-l-p,f=(v,T)=>T<=1?o+d/2:o+v*d/(T-1),b=v=>l+(g-v)/(g-h)*$,M=t.valueFormatter??(v=>u(v,1)),k=Array.from({length:4},(v,T)=>h+(g-h)/3*T),_=[0,Math.floor((a-1)/2),a-1].filter((v,T,F)=>F.indexOf(v)===T),C=k.map(v=>{const T=b(v);return`
      <line x1="${o}" y1="${T.toFixed(1)}" x2="${(s-n).toFixed(1)}" y2="${T.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(T+4).toFixed(1)}" class="analysis-svg-tick">${M(v)}</text>
    `}).join(""),i=t.referenceValue!=null?(()=>{const v=b(t.referenceValue);return`
        <line x1="${o}" y1="${v.toFixed(1)}" x2="${(s-n).toFixed(1)}" y2="${v.toFixed(1)}" class="analysis-svg-reference" />
        ${t.referenceLabel?`<text x="${s-n}" y="${(v-8).toFixed(1)}" class="analysis-svg-reference-label">${t.referenceLabel}</text>`:""}
      `})():"",y=e.map(v=>{const T=v.values.map((D,K)=>{const V=f(K,v.values.length),R=b(D);return`${K===0?"M":"L"} ${V.toFixed(1)} ${R.toFixed(1)}`}).join(" "),F=v.values.length<=40?v.values.map((D,K)=>{const V=f(K,v.values.length),R=b(D);return`<circle cx="${V.toFixed(1)}" cy="${R.toFixed(1)}" r="2.6" fill="${v.color}" />`}).join(""):"";return`
      <path d="${T}" fill="none" stroke="${v.color}" stroke-width="2.5" ${v.dashed?'stroke-dasharray="6 4"':""} />
      ${F}
    `}).join(""),c=_.map(v=>{const T=f(v,a),F=t.labels[v]??`Point ${v+1}`;return`<text x="${T.toFixed(1)}" y="${r-8}" text-anchor="middle" class="analysis-svg-x-label">${F}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${s}" height="${r}" viewBox="0 0 ${s} ${r}" role="img" aria-label="${t.title??"Line chart"}">
        ${C}
        ${i}
        ${y}
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
      ${t.referenceLabel?`
          <span class="analysis-legend-item">
            <span class="analysis-legend-swatch analysis-legend-swatch-dashed"></span>
            <span>${t.referenceLabel}</span>
          </span>
        `:""}
    </div>
  `}function Aa(t){const e=t.series.filter(c=>c.band.median.length>0);if(!e.length)return'<div class="analysis-empty">No profile data available for this period.</div>';const a=Math.max(...e.map(c=>c.band.median.length)),s=Math.max(760,a*12+92),r=248,o=50,n=20,l=18,p=30,m=e.flatMap(c=>[...c.band.lower,...c.band.median,...c.band.upper]),h=Math.min(0,mt(m,0));let g=re(m,1);g<=h&&(g=h+1);const d=s-o-n,$=r-l-p,f=(c,v)=>v<=1?o+d/2:o+c*d/(v-1),b=c=>l+(g-c)/(g-h)*$,M=t.valueFormatter??(c=>u(c,1)),k=Array.from({length:4},(c,v)=>h+(g-h)/3*v),_=[0,16,32,48,64,80,a-1].filter((c,v,T)=>c>=0&&c<a&&T.indexOf(c)===v),C=k.map(c=>{const v=b(c);return`
      <line x1="${o}" y1="${v.toFixed(1)}" x2="${(s-n).toFixed(1)}" y2="${v.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(v+4).toFixed(1)}" class="analysis-svg-tick">${M(c)}</text>
    `}).join(""),i=e.map(c=>{const v=c.band.upper.map((D,K)=>{const V=f(K,c.band.upper.length),R=b(D);return`${K===0?"M":"L"} ${V.toFixed(1)} ${R.toFixed(1)}`}).join(" "),T=[...c.band.lower].reverse().map((D,K)=>{const V=c.band.lower.length-1-K,R=f(V,c.band.lower.length),q=b(D);return`L ${R.toFixed(1)} ${q.toFixed(1)}`}).join(" "),F=c.band.median.map((D,K)=>{const V=f(K,c.band.median.length),R=b(D);return`${K===0?"M":"L"} ${V.toFixed(1)} ${R.toFixed(1)}`}).join(" ");return`
      <path d="${v} ${T} Z" fill="${c.fill}" stroke="none" />
      <path d="${F}" fill="none" stroke="${c.color}" stroke-width="2.4" ${c.dashed?'stroke-dasharray="6 4"':""} />
    `}).join(""),y=_.map(c=>{const v=f(c,a),T=t.labels[c]??`Point ${c+1}`;return`<text x="${v.toFixed(1)}" y="${r-8}" text-anchor="middle" class="analysis-svg-x-label">${T}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${s}" height="${r}" viewBox="0 0 ${s} ${r}" role="img" aria-label="${t.title??"Band chart"}">
        ${C}
        ${i}
        ${y}
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
  `}function Ha(t){const e=new Date(t.timestamp);return{date:e.toLocaleDateString(void 0,{month:"short",day:"numeric"}),time:e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}}function Na(t){if(!t.length)return'<div class="analysis-empty">No peak intervals available for this period.</div>';const e=Math.max(760,t.length*86+96),a=276,s=52,r=16,o=18,n=54,l=re(t.map(b=>b.houseKw),1),p=e-s-r,m=a-o-n,h=o+m,g=p/t.length,d=Math.max(22,Math.min(38,g*.54)),$=t.map((b,M)=>{const k=s+M*g+(g-d)/2,_=b.solarToHomeKw/l*m,i=Math.max(0,Math.min(b.gridKw,b.referenceKw))/l*m,y=Math.max(0,b.gridKw-b.referenceKw)/l*m;return`
      <g>
        <rect x="${k.toFixed(1)}" y="${(h-_).toFixed(1)}" width="${d.toFixed(1)}" height="${_.toFixed(1)}" rx="4" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${k.toFixed(1)}" y="${(h-_-i).toFixed(1)}" width="${d.toFixed(1)}" height="${i.toFixed(1)}" rx="4" fill="rgba(248, 81, 73, 0.62)" />
        ${y>0?`<rect x="${k.toFixed(1)}" y="${(h-_-i-y).toFixed(1)}" width="${d.toFixed(1)}" height="${y.toFixed(1)}" rx="4" fill="rgba(210, 153, 34, 0.92)" />`:""}
      </g>
    `}).join(""),f=t.map((b,M)=>{const k=s+M*g+g/2,{date:_,time:C}=Ha(b);return`
      <text x="${k.toFixed(1)}" y="${a-20}" text-anchor="middle" class="analysis-svg-x-label">
        <tspan x="${k.toFixed(1)}" dy="0">${_}</tspan>
        <tspan x="${k.toFixed(1)}" dy="12">${C}</tspan>
      </text>
    `}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${a}" viewBox="0 0 ${e} ${a}" role="img" aria-label="Peak interval anatomy">
        <line x1="${s}" y1="${h.toFixed(1)}" x2="${(e-r).toFixed(1)}" y2="${h.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${s-8}" y="${(o+4).toFixed(1)}" class="analysis-svg-tick">${u(l,1)} kW</text>
        ${$}
        ${f}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.62);"></span><span>Grid within reference</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(210, 153, 34, 0.92);"></span><span>Grid over reference</span></span>
    </div>
  `}function Ga(t){if(!t.length)return'<div class="analysis-empty">No daily energy data available.</div>';const e=Math.max(760,t.length*28+84),a=250,s=52,r=16,o=18,n=34,l=re(t.map(C=>C.houseKwh),1),p=re(t.map(C=>C.exportKwh),0),m=e-s-r,h=a-o-n,g=p>0?h*.72:h,d=p>0?h-g:0,$=o+g,f=m/t.length,b=Math.max(8,Math.min(18,f*.62)),M=Math.max(1,Math.ceil(t.length/10)),k=t.map((C,i)=>{const y=s+i*f+(f-b)/2,c=C.solarToHomeKwh/l*g,v=C.gridKwh/l*g,T=p>0?C.exportKwh/p*d:0,F=$-c-v-8;return`
      <g>
        <rect x="${y.toFixed(1)}" y="${($-c).toFixed(1)}" width="${b.toFixed(1)}" height="${c.toFixed(1)}" rx="3" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${y.toFixed(1)}" y="${($-c-v).toFixed(1)}" width="${b.toFixed(1)}" height="${v.toFixed(1)}" rx="3" fill="rgba(248, 81, 73, 0.55)" />
        ${T>0?`<rect x="${y.toFixed(1)}" y="${$.toFixed(1)}" width="${b.toFixed(1)}" height="${T.toFixed(1)}" rx="3" fill="rgba(88, 166, 255, 0.75)" />`:""}
        ${C.exceedanceKwh>0?`<circle cx="${(y+b/2).toFixed(1)}" cy="${F.toFixed(1)}" r="3.2" fill="#d29922" />`:""}
      </g>
    `}).join(""),_=t.map((C,i)=>i%M!==0&&i!==t.length-1?"":`<text x="${(s+i*f+f/2).toFixed(1)}" y="${a-10}" text-anchor="middle" class="analysis-svg-x-label">${C.label}</text>`).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${a}" viewBox="0 0 ${e} ${a}" role="img" aria-label="Daily energy breakdown">
        <line x1="${s}" y1="${$.toFixed(1)}" x2="${(e-r).toFixed(1)}" y2="${$.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${s-8}" y="${(o+4).toFixed(1)}" class="analysis-svg-tick">${u(l,0)} kWh</text>
        ${p>0?`<text x="${s-8}" y="${(a-n+4).toFixed(1)}" class="analysis-svg-tick">-${u(p,0)} kWh</text>`:""}
        ${k}
        ${_}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.55);"></span><span>From grid</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span><span>Exported</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:#d29922;"></span><span>Exceedance on that day</span></span>
    </div>
  `}function Oa(t,e){const a=De(e,0,1);return t==="solar"?`rgba(63, 185, 80, ${.12+a*.82})`:t==="exceedance_kwh"||t==="exceedance_frequency"?`rgba(210, 153, 34, ${.14+a*.82})`:t==="grid"?`rgba(210, 153, 34, ${.12+a*.82})`:`rgba(248, 81, 73, ${.12+a*.82})`}function Ua(t,e){const a=t.flat(),s=re(a,1),r=mt(a,0);return`
    <div class="analysis-heatmap">
      <div class="analysis-heatmap-hours">
        <span class="analysis-heatmap-corner"></span>
        ${Array.from({length:24},(o,n)=>`
          <span class="analysis-heatmap-hour ${n%2===1?"analysis-heatmap-hour-faded":""}">${String(n).padStart(2,"0")}</span>
        `).join("")}
      </div>
      ${t.map((o,n)=>`
        <div class="analysis-heatmap-row">
          <span class="analysis-heatmap-day">${xt[n]}</span>
          ${o.map((l,p)=>{const m=s===r?0:(l-r)/(s-r);return`
              <span
                class="analysis-heatmap-cell"
                style="background:${Oa(e,m)};"
                title="${xt[n]} ${String(p).padStart(2,"0")}:00 - ${Ia(e,l)}"
              >${l>(e==="exceedance_frequency"?1:.05)?u(l,e==="exceedance_frequency"?0:1):""}</span>
            `}).join("")}
        </div>
      `).join("")}
    </div>
  `}function et(t){const e=re(t.map(a=>a.value),1);return t.length?`
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
  `:'<div class="analysis-empty">No standout patterns in this period.</div>'}function Ba(t){var s,r,o,n;const e=kt(((s=t.rangeData)==null?void 0:s.start)??t.customStart),a=kt(((r=t.rangeData)==null?void 0:r.end)??t.customEnd);return`
    <div class="range-selector">
      ${Ie.map(l=>`
        <button
          class="range-btn ${l.id===t.range?"active":""}"
          data-range="${l.id}"
        >${l.label}</button>
      `).join("")}
    </div>
    ${(o=t.rangeData)!=null&&o.start&&((n=t.rangeData)!=null&&n.end)?`
        <div class="range-info-bar">
          Period: ${Ee(t.rangeData.start)} - ${Ee(t.rangeData.end)}
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
  `}function qa(t,e){return`
    <div class="analysis-stat-grid">
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Solar Coverage</span>
        <strong class="analysis-stat-value">${u(t.totals.coveragePct,1)}%</strong>
        <span class="analysis-stat-meta">${u(t.totals.solarToHomeKwh)} kWh of ${u(t.totals.houseKwh)} kWh usage</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Consumed Solar</span>
        <strong class="analysis-stat-value">${u(t.totals.selfConsumedPct,1)}%</strong>
        <span class="analysis-stat-meta">${u(t.totals.solarToHomeKwh)} kWh kept at home, ${u(t.totals.exportKwh)} kWh exported</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Total Solar Value</span>
        <strong class="analysis-stat-value">${G(t.totals.solarValue,e)}</strong>
        <span class="analysis-stat-meta">Savings plus export revenue plus avoided exceedance charges</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Use vs Export</span>
        <strong class="analysis-stat-value">${Qe(t.totals.selfConsumptionAdvantage,e)}</strong>
        <span class="analysis-stat-meta">${u(t.totals.solarToHomeKwh)} kWh kept on-site instead of exported</span>
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
        <strong class="analysis-stat-value">${G(t.totals.importCost,e)}</strong>
        <span class="analysis-stat-meta">Energy-only import charges from the selected period</span>
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
        ${ue({title:"Daily exceedance volume",series:[{label:"Exceedance",color:"#d29922",values:t.daily.map(e=>e.exceedanceKwh)}],labels:t.daily.map(e=>e.label),valueFormatter:e=>`${u(e,2)} kWh`})}
      </div>
    </div>
  `}function ja(t,e){const a=Ra(t.analysisHeatmapMetric);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Consumption Pattern Heatmap</h3>
          <p class="analysis-card-copy">${a.description}</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${t.analysisHeatmapMetric==="house"?"active":""}" data-analysis-heatmap="house">${We.house}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="grid"?"active":""}" data-analysis-heatmap="grid">${We.grid}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="solar"?"active":""}" data-analysis-heatmap="solar">${We.solar}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="exceedance_kwh"?"active":""}" data-analysis-heatmap="exceedance_kwh">${We.exceedance_kwh}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="exceedance_frequency"?"active":""}" data-analysis-heatmap="exceedance_frequency">${We.exceedance_frequency}</button>
        </div>
      </div>
      ${Ua(e.heatmapValues[t.analysisHeatmapMetric],t.analysisHeatmapMetric)}
      <p class="analysis-note">${a.note}</p>
    </div>
  `}function za(t,e){const a=t.analysisProfileMetric,s=e.intradayProfiles[a],r=je[a],o=s.weekday.median.reduce((l,p,m,h)=>p>h[l]?m:l,0),n=s.weekend.median.reduce((l,p,m,h)=>p>h[l]?m:l,0);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Intraday Profile</h3>
          <p class="analysis-card-copy">A typical day view for ${r.toLowerCase()}, split between weekdays and weekends. The band shows the p10 to p90 range and the line is the median interval.</p>
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
          <strong>${u(s.weekend.median[n]??0,2)} kW</strong>
          <span class="analysis-stat-meta">${e.intradayLabels[n]??"n/a"}</span>
        </div>
      </div>
      ${Aa({title:`${r} intraday profile`,labels:e.intradayLabels,series:[{label:"Weekday median (p10-p90 band)",color:"#58a6ff",fill:"rgba(88, 166, 255, 0.14)",band:s.weekday},{label:"Weekend median (p10-p90 band)",color:"#d29922",fill:"rgba(210, 153, 34, 0.13)",band:s.weekend,dashed:!0}],valueFormatter:l=>`${u(l,1)} kW`})}
      <p class="analysis-note">This makes the typical daily rhythm much easier to read than the weekday/hour heatmap alone.</p>
    </div>
  `}function Xa(t,e){const a=t.totals.solarKwh>0?De(t.totals.solarToHomeKwh/t.totals.solarKwh*100,0,100):0,s=t.totals.solarKwh>0?De(t.totals.exportKwh/t.totals.solarKwh*100,0,100):0;return`
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
          <strong>${G(t.totals.solarValue,e)}</strong>
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
        ${ue({title:"Daily solar coverage",series:[{label:"Coverage",color:"#3fb950",values:t.daily.map(r=>r.coveragePct)}],labels:t.daily.map(r=>r.label),maxValue:100,minValue:0,valueFormatter:r=>`${u(r,0)}%`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day</h4>
        ${ue({title:"Daily solar value",series:[{label:"Solar value",color:"#58a6ff",values:t.daily.map(r=>r.solarValue)}],labels:t.daily.map(r=>r.label),valueFormatter:r=>G(r,e)})}
      </div>
    </div>
  `}function Za(t,e){const a=[...t.hourlyOpportunity].sort((n,l)=>l.importCost-n.importCost)[0],s=[...t.hourlyOpportunity].sort((n,l)=>l.exportSpreadValue-n.exportSpreadValue)[0],r=[...t.hourlyOpportunity].filter(n=>n.importCost>0).sort((n,l)=>l.importCost-n.importCost).slice(0,5).map(n=>({label:n.label,value:n.importCost,meta:`${G(n.importCost,e)} from ${u(n.gridKwh,1)} kWh`})),o=[...t.hourlyOpportunity].filter(n=>n.exportSpreadValue>0).sort((n,l)=>l.exportSpreadValue-n.exportSpreadValue).slice(0,5).map(n=>({label:n.label,value:n.exportSpreadValue,meta:`${G(n.exportSpreadValue,e)} on ${u(n.exportKwh,1)} kWh`,colorClass:"analysis-progress-fill-warn"}));return`
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
          <strong>${G(t.hourlyOpportunity.reduce((n,l)=>n+l.importCost,0),e)}</strong>
          <span class="analysis-stat-meta">Variable import cost grouped by hour of day</span>
        </div>
        <div>
          <span class="analysis-inline-label">Export spread opportunity</span>
          <strong>${G(t.hourlyOpportunity.reduce((n,l)=>n+l.exportSpreadValue,0),e)}</strong>
          <span class="analysis-stat-meta">Approximate value gap between export and local use</span>
        </div>
        <div>
          <span class="analysis-inline-label">Hardest import hour</span>
          <strong>${(a==null?void 0:a.label)??"n/a"}</strong>
          <span class="analysis-stat-meta">${a?G(a.importCost,e):"No import cost recorded"}</span>
        </div>
        <div>
          <span class="analysis-inline-label">Best storage hour</span>
          <strong>${(s==null?void 0:s.label)??"n/a"}</strong>
          <span class="analysis-stat-meta">${s?G(s.exportSpreadValue,e):"No export spread recorded"}</span>
        </div>
      </div>
      ${ue({title:"Hourly tariff opportunity",series:[{label:"Import cost pressure",color:"#f85149",values:t.hourlyOpportunity.map(n=>n.importCost)},{label:"Export spread opportunity",color:"#58a6ff",values:t.hourlyOpportunity.map(n=>n.exportSpreadValue)}],labels:t.hourlyOpportunity.map(n=>n.label),valueFormatter:n=>G(n,e)})}
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Most expensive import hours</h4>
          ${et(r)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Best export-to-storage hours</h4>
          ${et(o)}
        </div>
      </div>
      <p class="analysis-note">Export spread opportunity uses the difference between the import rate and feed-in rate for exported energy in that hour, so it is a directional indicator rather than a billing line item.</p>
    </div>
  `}function Ja(t,e){const a=t.hourlyExceedanceKwh.map((s,r)=>({label:`${String(r).padStart(2,"0")}:00`,value:s,meta:`${u(s,2)} kWh`,colorClass:"analysis-progress-fill-warn"})).filter(s=>s.value>0).sort((s,r)=>r.value-s.value).slice(0,6);return`
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
          <strong>${u(re(t.topExceedances.map(s=>s.overKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Exceedance cost</span>
          <strong>${G(t.totals.exceedanceCost,e)}</strong>
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
                      <td>${Ht(s.iso)}</td>
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
  `}function Qa(t){const e=t.peakIntervals.length?t.peakIntervals.reduce((a,s)=>a+(s.houseKw>0?s.solarToHomeKw/s.houseKw*100:0),0)/t.peakIntervals.length:0;return`
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
          <strong>${u(re(t.peakIntervals.map(a=>a.houseKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Highest net-grid peak</span>
          <strong>${u(re(t.peakIntervals.map(a=>a.gridKw),0),2)} kW</strong>
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
      ${Na(t.peakIntervals)}
      <p class="analysis-note">A gold cap only appears when the grid portion of the interval exceeded the configured reference power.</p>
    </div>
  `}function es(t,e,a){var l,p;const s=e.analysisComparisonMode==="last_year"?"Last year":"Previous";if(e.analysisComparisonLoading)return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${Ct(e)}</p>
          </div>
          <div class="chart-unit-toggle">
            <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${Te.previous}</button>
            <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${Te.last_year}</button>
          </div>
        </div>
        <div class="analysis-empty">Loading comparison period...</div>
      </div>
    `;if(!((l=e.analysisComparison)!=null&&l.consumptionTimeseries)||!((p=e.analysisComparison)!=null&&p.productionTimeseries))return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${e.analysisComparisonMode==="last_year"?"The same calendar period last year is shown here when enough history is available.":"A matched previous period is shown here when enough historic data is available."}</p>
          </div>
          <div class="chart-unit-toggle">
            <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${Te.previous}</button>
            <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${Te.last_year}</button>
          </div>
        </div>
        <div class="analysis-empty">Comparison data is unavailable for the selected range.</div>
      </div>
    `;const r=Ut(e.analysisComparison.consumptionTimeseries,e.analysisComparison.productionTimeseries,e.analysisComparison.gridImportTimeseries,e.analysisComparison.marketExportTimeseries,a),o=Math.max(t.daily.length,r.daily.length,1),n=Array.from({length:o},(m,h)=>`D${h+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Period Comparison</h3>
          <p class="analysis-card-copy">${Ct(e)}</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${Te.previous}</button>
          <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${Te.last_year}</button>
        </div>
      </div>
      <div class="analysis-compare-grid">
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">House usage</span>
          <strong>${u(t.totals.houseKwh)} kWh</strong>
          <span class="analysis-compare-delta">${ze(t.totals.houseKwh-r.totals.houseKwh)} kWh vs ${s.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Net grid usage</span>
          <strong>${u(t.totals.gridKwh)} kWh</strong>
          <span class="analysis-compare-delta">${ze(t.totals.gridKwh-r.totals.gridKwh)} kWh vs ${s.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar coverage</span>
          <strong>${u(t.totals.coveragePct,1)}%</strong>
          <span class="analysis-compare-delta">${ze(t.totals.coveragePct-r.totals.coveragePct)} pts vs ${s.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar value</span>
          <strong>${G(t.totals.solarValue,a.currency||"EUR")}</strong>
          <span class="analysis-compare-delta">${ze(t.totals.solarValue-r.totals.solarValue,2)} ${a.currency||"EUR"} vs ${s.toLowerCase()}</span>
        </div>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Usage by day index</h4>
        ${ue({title:`Current versus ${s.toLowerCase()} usage`,series:[{label:"Current",color:"#f85149",values:t.daily.map(m=>m.houseKwh)},{label:s,color:"#58a6ff",values:r.daily.map(m=>m.houseKwh),dashed:!0}],labels:n,valueFormatter:m=>`${u(m,1)} kWh`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day index</h4>
        ${ue({title:`Current versus ${s.toLowerCase()} solar value`,series:[{label:"Current",color:"#3fb950",values:t.daily.map(m=>m.solarValue)},{label:s,color:"#d29922",values:r.daily.map(m=>m.solarValue),dashed:!0}],labels:n,valueFormatter:m=>G(m,a.currency||"EUR")})}
      </div>
    </div>
  `}function ts(t,e){return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Tariff-Aware Cost Trends</h3>
          <p class="analysis-card-copy">Estimated variable import cost, solar savings, export earnings, and exceedance cost by day. Fixed monthly fees are intentionally left out so this stays behavior-driven.</p>
        </div>
      </div>
      ${ue({title:"Daily cost and value trends",series:[{label:"Import cost",color:"#f85149",values:t.daily.map(a=>a.importCost)},{label:"Solar savings",color:"#3fb950",values:t.daily.map(a=>a.solarSavings)},{label:"Export earnings",color:"#58a6ff",values:t.daily.map(a=>a.exportRevenue)},{label:"Exceedance cost",color:"#d29922",values:t.daily.map(a=>a.exceedanceCost)}],labels:t.daily.map(a=>a.label),valueFormatter:a=>G(a,e)})}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily net energy value</h4>
        ${ue({title:"Daily net energy value",series:[{label:"Net value",color:"#39c5cf",values:t.daily.map(a=>a.netValue)}],labels:t.daily.map(a=>a.label),referenceValue:0,referenceLabel:"Break-even",valueFormatter:a=>Qe(a,e)})}
      </div>
      <div class="analysis-cost-totals">
        <span>Import cost: <strong>${G(t.totals.importCost,e)}</strong></span>
        <span>Solar savings: <strong>${G(t.totals.solarSavings,e)}</strong></span>
        <span>Export earnings: <strong>${G(t.totals.exportRevenue,e)}</strong></span>
        <span>Exceedance cost: <strong>${G(t.totals.exceedanceCost,e)}</strong></span>
        <span>Net value: <strong>${Qe(t.totals.netValue,e)}</strong></span>
      </div>
    </div>
  `}function as(t,e){const a=Array.from({length:Math.max(t.loadDurationGrossKw.length,t.loadDurationNetKw.length,1)},(s,r)=>`${r+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Load Duration Curve</h3>
          <p class="analysis-card-copy">Gross house load and net grid load sorted from highest to lowest interval. This shows how often high demand really occurs and how much solar trims the top end.</p>
        </div>
      </div>
      ${ue({title:"Load duration curve",series:[{label:"Gross house load",color:"#f85149",values:t.loadDurationGrossKw},{label:"Net grid load",color:"#58a6ff",values:t.loadDurationNetKw}],labels:a,referenceValue:e>0?e:void 0,referenceLabel:e>0?`Reference ${u(e,1)} kW`:void 0,valueFormatter:s=>`${u(s,1)} kW`})}
      <p class="analysis-note">Intervals are ordered from highest demand to lowest, so the left side is your hardest-to-handle load.</p>
    </div>
  `}function ss(t){const e=t.config,a=t.rangeData,s=t.consumptionTimeseries,r=t.productionTimeseries;if(!e||!a||!s||!r)return`
      <section class="analysis-view">
        <div class="card">
          <p class="muted">Loading analysis data...</p>
        </div>
      </section>
    `;const o=Ut(s,r,t.gridImportTimeseries,t.marketExportTimeseries,e),n=e.currency||"EUR";return`
    <section class="analysis-view">
      <div class="section-header analysis-section-header">
        <div>
          <span class="badge">Analysis</span>
          <h2>Charts and Optimization</h2>
          <p class="muted">Deeper electricity analysis for ${Ka(t)}. This page is built from the same 15-minute data and billing settings that drive the dashboard and invoice.</p>
        </div>
        <div class="analysis-header-meta">
          <span>${Va(t)}</span>
          <span>${u(o.daily.length,0)} day${o.daily.length===1?"":"s"} analysed</span>
        </div>
      </div>

      ${Ba(t)}
      ${qa(o,n)}
      ${Ya(o)}

      <div class="analysis-grid">
        ${za(t,o)}
        ${ja(t,o)}
      </div>

      <div class="analysis-grid">
        ${Xa(o,n)}
        ${Za(o,n)}
      </div>

      <div class="analysis-grid">
        ${Ja(o,n)}
        ${es(o,t,e)}
      </div>

      <div class="analysis-grid">
        ${ts(o,n)}
        ${as(o,e.reference_power_kw??0)}
      </div>

      ${Qa(o)}
    </section>
  `}const St={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function rs(t){return St[t]?St[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function ns(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],a=[],s=[],r=[],o=[];for(const l of t.sensors){const p=l.key;p.startsWith("c_")||p==="1-1:1.29.0"||p==="1-1:3.29.0"?e.push(l):p.startsWith("p_")||p==="1-1:2.29.0"||p==="1-1:4.29.0"?a.push(l):p.startsWith("s_")||p.startsWith("1-65:")?s.push(l):p.startsWith("g_")||p.startsWith("7-")?r.push(l):o.push(l)}const n=(l,p,m,h)=>m.length?`
      <div class="card sensor-group">
        <h3 class="card-title"><span class="title-icon">${p}</span> ${l} <span class="badge">${m.length}</span></h3>
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
              ${m.map(g=>`
                <tr>
                  <td class="sensor-name">${rs(g.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${h});">${u(g.value)}</td>
                  <td class="sensor-unit">${g.unit}</td>
                  <td class="sensor-peak">${g.peak_timestamp?Ht(g.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
      ${n("Electricity Consumption","⚡",e,"consumption")}
      ${n("Energy Production","☀️",a,"production")}
      ${n("Energy Sharing","🔗",s,"self")}
      ${n("Gas","🔥",r,"gas")}
      ${n("Other","📊",o,"text")}
    </section>
  `}function it(t,e){return Number.isFinite(t)?Number(t):e}function Bt(t){const e=(t.meters??[]).filter(r=>r.types.includes("production")),a=t.feed_in_rates??[],s=t.currency??"EUR";return e.map((r,o)=>{const n=a.find(h=>h.meter_id===r.id),l=(n==null?void 0:n.mode)==="sensor"&&n.sensor_value!=null&&Number.isFinite(n.sensor_value),p=l?(n==null?void 0:n.sensor_value)??0:it(n==null?void 0:n.tariff,it(t.feed_in_tariff,0)),m=Math.max(1,Math.round(it(n==null?void 0:n.self_use_priority,o+1)));return{meterId:r.id,shortId:r.id?"…"+r.id.slice(-8):`Meter ${o+1}`,rate:p,label:l?`Sensor (${p.toFixed(4)} ${s}/kWh)`:"Fixed tariff",mode:(n==null?void 0:n.mode)??"fixed",selfUsePriority:m}}).sort((r,o)=>r.selfUsePriority!==o.selfUsePriority?r.selfUsePriority-o.selfUsePriority:r.meterId.localeCompare(o.meterId))}function os(t,e,a,s,r){var y;if(!e||!(a!=null&&a.length))return null;const o=Bt(t);if(!o.length)return null;const n=new Map(a.map(c=>[c.meter_id,c]));if(!o.some(c=>n.has(c.meterId)))return null;const l=o.map(c=>({...c,producedKwh:0,selfConsumedKwh:0,exportedKwh:0,revenue:0,exportEquivalentForSelfUse:0})),p=new Map(l.map((c,v)=>[c.meterId,v])),m=new Map,h=new Set;for(const c of e.items)c.startedAt&&h.add(c.startedAt);const g=new Map;for(const c of e.items){const v=Math.max(0,Number(c.value)||0);g.set(c.startedAt,(g.get(c.startedAt)??0)+v)}for(const c of a){const v=new Map;for(const T of c.items??[]){const F=Math.max(0,Number(T.value)||0);v.set(T.startedAt,(v.get(T.startedAt)??0)+F),T.startedAt&&h.add(T.startedAt)}m.set(c.meter_id,v)}for(const c of[...h].sort()){let v=Math.max(0,g.get(c)??0);for(const T of l){const F=p.get(T.meterId);if(F==null)continue;const D=Math.max(0,((y=m.get(T.meterId))==null?void 0:y.get(c))??0),K=D*.25,V=Math.min(v,D),R=V*.25,q=Math.max(0,D-V)*.25;l[F].producedKwh+=K,l[F].selfConsumedKwh+=R,l[F].exportedKwh+=q,v=Math.max(0,v-V)}}const d=l.reduce((c,v)=>c+v.selfConsumedKwh,0),$=l.reduce((c,v)=>c+v.exportedKwh,0),f=Math.max(0,s??d),b=Math.max(0,r??$),M=d>0?f/d:1,k=$>0?b/$:1;for(const c of l)c.selfConsumedKwh*=M,c.exportedKwh*=k,c.revenue=c.exportedKwh*c.rate,c.exportEquivalentForSelfUse=c.selfConsumedKwh*c.rate;const _=l.reduce((c,v)=>c+v.revenue,0),C=l.reduce((c,v)=>c+v.exportEquivalentForSelfUse,0),i=b>0?_/b:0;return{meters:l,totalFeedInRevenue:_,totalSelfUseExportEquivalent:C,weightedExportRate:i,usedPriorityAllocation:!0}}const Tt=[{kw:3,fixedMonthlyFee:7.42},{kw:7,fixedMonthlyFee:12.84},{kw:12,fixedMonthlyFee:19.61},{kw:17,fixedMonthlyFee:26.39},{kw:27,fixedMonthlyFee:39.94},{kw:43,fixedMonthlyFee:61.62},{kw:70,fixedMonthlyFee:98.2},{kw:100,fixedMonthlyFee:138.85},{kw:150,fixedMonthlyFee:206.6,existingContractsOnly:!0},{kw:200,fixedMonthlyFee:274.35,existingContractsOnly:!0}];function Xe(t){if(!t)return null;const e=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(e){const[,s,r,o]=e;return new Date(Number(s),Number(r)-1,Number(o))}const a=new Date(t);return Number.isNaN(a.getTime())?null:new Date(a.getFullYear(),a.getMonth(),a.getDate())}function Et(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function is(t,e,a,s,r){const o=new Date,n=Xe(s),l=Xe(r);let p=n,m=l;if(!p||!m)switch(t){case"yesterday":{const f=new Date(o);f.setDate(f.getDate()-1),p=new Date(f.getFullYear(),f.getMonth(),f.getDate()),m=new Date(p);break}case"this_week":{const f=new Date(o),b=f.getDay()||7;p=new Date(f.getFullYear(),f.getMonth(),f.getDate()-b+1),m=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_week":{const f=new Date(o),b=f.getDay()||7,M=new Date(f.getFullYear(),f.getMonth(),f.getDate()-b+1);p=new Date(M.getFullYear(),M.getMonth(),M.getDate()-7),m=new Date(M.getFullYear(),M.getMonth(),M.getDate()-1);break}case"this_month":{p=new Date(o.getFullYear(),o.getMonth(),1),m=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_month":{p=new Date(o.getFullYear(),o.getMonth()-1,1),m=new Date(o.getFullYear(),o.getMonth(),0);break}case"this_year":{p=new Date(o.getFullYear(),0,1),m=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_year":{p=new Date(o.getFullYear()-1,0,1),m=new Date(o.getFullYear()-1,11,31);break}case"custom":{p=Xe(e)??new Date(o.getFullYear(),o.getMonth(),o.getDate()),m=Xe(a)??new Date(p);break}default:{p=new Date(o.getFullYear(),o.getMonth(),o.getDate()-1),m=new Date(p);break}}if(m<p){const f=p;p=m,m=f}let h=0,g=0;const d=new Date(p);for(;d<=m;){const f=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();g+=1/f,h+=1,d.setDate(d.getDate()+1)}const $=p.getFullYear()===m.getFullYear()&&p.getMonth()===m.getMonth()&&p.getDate()===1&&m.getDate()===new Date(m.getFullYear(),m.getMonth()+1,0).getDate();return{days:h,factor:g,label:$?"full month":`${h} day${h===1?"":"s"}`}}function ls(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function Dt(t){const[e,a]=t.split(":").map(s=>parseInt(s,10)||0);return e*60+a}function qt(t,e,a,s){if(!ls(t.getDay(),e))return!1;const r=t.getHours()*60+t.getMinutes(),o=Dt(a),n=Dt(s);return o===n?!0:o<n?r>=o&&r<n:r>=o||r<n}function cs(t,e){return e.find(a=>qt(t,a.day_group,a.start_time,a.end_time))}function ds(t,e){return e.find(a=>qt(t,a.day_group,a.start_time,a.end_time))}function Ft(t,e,a,s,r,o=[]){var $;const n=new Map;let l=0,p=0,m=0,h=0,g=0;const d=new Map;for(const f of o){const b=Number(f.value)||0;d.set(f.startedAt,(d.get(f.startedAt)??0)+b)}for(const f of t){const b=Number(f.value)||0,M=b*.25,k=d.get(f.startedAt)??0,_=Math.max(0,b-k),C=new Date(f.startedAt);if(Number.isNaN(C.getTime()))continue;const i=cs(C,s),y=ds(C,r),c=(i==null?void 0:i.rate)??e,v=(($=i==null?void 0:i.label)==null?void 0:$.trim())||"Base tariff",T=(y==null?void 0:y.reference_power_kw)??a;l+=M*c,g=Math.max(g,b),h=Math.max(h,_),b>T&&(m+=(b-T)*.25),_>T&&(p+=(_-T)*.25);const F=`${v}__${c}`,D=n.get(F);D?D.kwh+=M:n.set(F,{label:v,rate:c,kwh:M})}return{energyCost:l,exceedanceKwh:p,grossExceedanceKwh:m,avoidedExceedanceKwh:Math.max(0,m-p),peakPowerKw:h,grossPeakPowerKw:g,rateBreakdown:Array.from(n.values()).sort((f,b)=>f.label.localeCompare(b.label))}}function ps(t){var vt,yt;const e=t.config,a=t.rangeData;if(!e||!a)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const s=a.consumption||0,r=a.production||0,o=a.exported||0,n=Math.max(0,o),l=Math.max(0,a.solar_to_home??a.direct_solar_to_home??(a.self_consumed&&a.self_consumed>0?a.self_consumed:r-n)),p=Math.max(0,a.grid_import??s-l),m=a.peak_power_kw||0,h=e.reference_power_kw||5,g=a.exceedance_kwh||0,d=a.gas_energy||0,$=a.gas_volume||0,f=d>0||$>0,b=e.consumption_rate_windows??[],M=e.reference_power_windows??[],k=t.consumptionTimeseries?Ft(t.consumptionTimeseries.items,e.energy_variable_rate,h,b,M,((vt=t.productionTimeseries)==null?void 0:vt.items)??[]):null,_=b.length>0&&!!k&&Math.abs(p-s)<.01,C=M.length>0&&!!k,i=k?k.peakPowerKw:m,y=k?k.exceedanceKwh:g,c=Et(a.start??t.customStart),v=Et(a.end??t.customEnd),{days:T,factor:F,label:D}=is(t.range,t.customStart,t.customEnd,a.start,a.end),K=e.energy_fixed_fee*F,V=e.network_metering_rate*F,R=e.network_power_ref_rate*F,q=_?k.energyCost:p*e.energy_variable_rate,ae=p*e.network_variable_rate,Y=y*e.exceedance_rate,se=e.meter_monthly_fees??[],X=se.reduce((w,H)=>w+(H.fee||0),0)*F,ne=p*e.compensation_fund_rate,oe=p*e.electricity_tax_rate,ie=Math.max(0,e.connect_discount??0)*F,O=K+q+V+R+ae+Y+X+ne+oe-ie,I=O*e.vat_rate,A=O+I,ee=Bt(e),j=os(e,t.consumptionTimeseries,((yt=t.perMeterProductionTimeseries)==null?void 0:yt.meters)??null,l,n),Fe=ee.filter(w=>isFinite(w.rate)&&w.rate>0),Z=ee.length>1,he=j?j.weightedExportRate:Fe.length>0?Fe.reduce((w,H)=>w+H.rate,0)/Fe.length:e.feed_in_tariff,J=j?j.totalFeedInRevenue:n*he,Ae=Z&&ee.length>0?n/ee.length:n,le=j?j.meters:ee.map(w=>({...w,producedKwh:0,exportedKwh:Ae,revenue:Ae*w.rate,selfConsumedKwh:0,exportEquivalentForSelfUse:0})),me=!!j,z=l,He=e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate,tt=He*(1+e.vat_rate),Ne=z*He,Ge=Ne*e.vat_rate,fe=Ne+Ge,at=j?j.totalSelfUseExportEquivalent:z*he,Oe=fe-at,ge=Math.max(0,(k==null?void 0:k.avoidedExceedanceKwh)??0),Me=ge*e.exceedance_rate,Le=Me*e.vat_rate,ve=Me+Le,we=ge>1e-4,be=fe+ve+J,Ce=le.map(w=>{const H=w.selfConsumedKwh*tt,xe=H-w.exportEquivalentForSelfUse;return{...w,selfUseSavings:H,selfUseVsExport:xe,totalTrackedValue:H+w.revenue}}),Ue=me&&Ce.length>0,x=A-J,E=(e.gas_fixed_fee??6.5)*F,L=d*(e.gas_variable_rate??.055),N=(e.gas_network_fee??4.8)*F,B=d*(e.gas_network_variable_rate??.012),$e=d*(e.gas_tax_rate??.001),te=E+L+N+B+$e,ce=te*(e.gas_vat_rate??.08),_e=te+ce,P=e.currency||"EUR",S=w=>`${u(w,2)} ${P}`,st=w=>`${w>0?"+":w<0?"-":""}${u(Math.abs(w),2)} ${P}`,W=w=>u(w,3),gt=w=>u(w,3),Zt=w=>w>=0?"comparison-delta-savings":"comparison-delta-extra",Jt=Ue?`
            <tr class="section-label"><td colspan="3">Per-System Self-Use vs Export</td></tr>
            ${Ce.map(w=>`
            <tr>
              <td>${w.shortId}</td>
              <td style="text-align: right;">
                Produced ${W(w.producedKwh)} kWh<br/>
                Kept on-site ${W(w.selfConsumedKwh)} kWh<br/>
                Sold ${W(w.exportedKwh)} kWh<br/>
                ${w.label} ${u(w.rate,4)} ${P}/kWh${Z?`<br/>Self-use priority ${w.selfUsePriority}`:""}
              </td>
              <td style="text-align: right;">
                <strong>${S(w.totalTrackedValue)}</strong><br/>
                <span class="${Zt(w.selfUseVsExport)}">${st(w.selfUseVsExport)}</span> self-use vs export<br/>
                <span class="muted">${S(w.selfUseSavings)} kept value + ${S(w.revenue)} sold</span>
              </td>
            </tr>
            `).join("")}
            <tr class="subtotal-row">
              <td colspan="2"><strong>Tracked per-system value</strong></td>
              <td style="text-align: right;"><strong>${S(Ce.reduce((w,H)=>w+H.totalTrackedValue,0))}</strong></td>
            </tr>
      `:"",Qt=me?`Compared with exporting the same ${W(z)} kWh using the configured PV self-use priority and each system's own feed-in tariff`:`Compared with selling the same ${W(z)} kWh at ${u(he,4)} ${P}/kWh`,rt=Tt.find(w=>Math.abs(w.kw-h)<.05),ea=O-R-Y,nt=k?Tt.map(w=>{var wt;const H=Ft(t.consumptionTimeseries.items,e.energy_variable_rate,w.kw,b,M,((wt=t.productionTimeseries)==null?void 0:wt.items)??[]),xe=w.fixedMonthlyFee*F,qe=H.exceedanceKwh*e.exceedance_rate,ft=(ea+xe+qe)*(1+e.vat_rate);return{...w,fixedCharge:xe,exceedanceKwh:H.exceedanceKwh,exceedanceCharge:qe,total:ft,deltaVsCurrent:ft-A}}):[],Be=nt.reduce((w,H)=>!w||H.total<w.total?H:w,null),ta=w=>Math.abs(w)<.005?"Current total":`${w>0?"+":"-"}${S(Math.abs(w))}`,ot=a.start&&a.end?`${ye(a.start)} — ${ye(a.end)}`:t.range.replace("_"," ").replace(/\b\w/g,w=>w.toUpperCase()),aa=y>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${u(i,1)} kW</strong> &mdash; ${C?"Reference power windows active":`Reference power level: ${u(h,1)} kW`}</p>
        <p>Exceedance volume: <strong>${W(y)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${S(Y)}</p>
      </div>`:"",sa=_?k.rateBreakdown.map(w=>`
            <tr>
              <td>${w.label} (${W(w.kwh)} kWh)</td>
              <td style="text-align: right;">${u(w.rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${S(w.kwh*w.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Supplier rate (${W(p)} kWh bought from grid)</td>
              <td style="text-align: right;">${u(e.energy_variable_rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${S(q)}</td>
            </tr>
          `,ra=C?`Reference power windows active (${M.length})`:`${u(h,1)} kW`,na=_?`Time-of-use windows active (${b.length})`:`${u(e.energy_variable_rate,4)} ${P}/kWh`,oa=nt.map(w=>{const H=!!Be&&w.kw===Be.kw,xe=!!rt&&w.kw===rt.kw,qe=w.deltaVsCurrent<-.005?"comparison-delta-savings":w.deltaVsCurrent>.005?"comparison-delta-extra":"";return`
            <tr class="${H?"reference-power-best-row":""}${xe?" reference-power-current-row":""}">
              <td>
                <div class="reference-level-cell">
                  <span class="reference-level-kw">${u(w.kw,0)} kW</span>
                  ${H?'<span class="reference-level-badge best">Financially optimal</span>':""}
                  ${xe?'<span class="reference-level-badge current">Current</span>':""}
                  ${w.existingContractsOnly?'<span class="reference-level-badge legacy">Existing contracts</span>':""}
                </div>
              </td>
              <td style="text-align: right;">${S(w.fixedCharge)}</td>
              <td style="text-align: right;">${S(w.exceedanceCharge)}</td>
              <td style="text-align: right;"><strong>${S(w.total)}</strong></td>
              <td class="${qe}" style="text-align: right;">${ta(w.deltaVsCurrent)}</td>
            </tr>
          `}).join(""),ia=nt.length>0?`
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${C?"Configured reference power windows stay active in this comparison.":"One reference power level is applied to the full selected period."}
              ${rt?"":`Your current configuration uses ${u(h,1)} kW, which is outside the standard Creos low-voltage reference power levels.`}
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
            ${oa}
          </tbody>
        </table>
      </div>
    `:`
      <div class="card reference-power-card">
        <p class="muted">Reference power level comparison requires 15-minute load-curve data for the selected period.</p>
      </div>
    `,la=`
      <div class="range-selector">
        ${Ie.map(w=>`
          <button
            class="range-btn ${w.id===t.range?"active":""}"
            data-range="${w.id}"
          >${w.label}</button>
        `).join("")}
      </div>
    `,ca=a.start&&a.end?(()=>{const w=new Date(a.start),H=new Date(a.end);return Number.isNaN(w.getTime())||Number.isNaN(H.getTime())?"":`
        <div class="range-info-bar">
          Period: ${w.toLocaleDateString()} - ${H.toLocaleDateString()}
        </div>
      `})():"",da=t.range==="custom"?`
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
    `:c&&v?`
        <div class="custom-range-picker period-preview">
          <span class="period-preview-label">Viewed period</span>
          <label>
            <span>From</span>
            <input type="date" value="${c}" readonly aria-label="Preset period start" />
          </label>
          <label>
            <span>To</span>
            <input type="date" value="${v}" readonly aria-label="Preset period end" />
          </label>
        </div>
      `:"";return`
    <section class="invoice-view">
      ${la}
      ${ca}
      ${da}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Supplier Bill Estimate &mdash; ${ot}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the selected period. Feed-in revenue and net position are shown separately.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${W(s)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${W(p)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${W(r)} kWh produced</span>
          ${n>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${W(n)} kWh exported</span>`:""}
          ${f?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${W(d)} kWh gas (${gt($)} m³)</span>`:""}
        </div>
      </div>

      ${aa}

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
              <td>Fixed Fee <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${u(e.energy_fixed_fee,2)} ${P}/mo</td>
              <td style="text-align: right;">${S(K)}</td>
            </tr>
            ${sa}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${u(e.network_metering_rate,2)} ${P}/mo</td>
              <td style="text-align: right;">${S(V)}</td>
            </tr>
            <tr>
              <td>Reference power level (${ra}) <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${u(e.network_power_ref_rate,2)} ${P}/mo</td>
              <td style="text-align: right;">${S(R)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${W(p)} kWh bought from grid)</td>
              <td style="text-align: right;">${u(e.network_variable_rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${S(ae)}</td>
            </tr>
            <tr class="${y>0?"exceedance-row":""}">
              <td>Exceedance charge (${W(y)} kWh above the reference power level)</td>
              <td style="text-align: right;">${u(e.exceedance_rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${S(Y)}</td>
            </tr>

            ${se.filter(w=>w.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${se.filter(w=>w.fee>0).map(w=>`
            <tr>
              <td>${w.label||"…"+w.meter_id.slice(-8)} <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${u(w.fee,2)} ${P}/mo</td>
              <td style="text-align: right;">${S(w.fee*F)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${u(e.compensation_fund_rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${S(ne)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${u(e.electricity_tax_rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${S(oe)}</td>
            </tr>
            ${ie>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            <tr>
              <td>Monthly Discount <span class="muted">(${D})</span></td>
              <td style="text-align: right;">-${u(Math.max(0,e.connect_discount??0),2)} ${P}/mo</td>
              <td style="text-align: right;">-${S(ie)}</td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${S(O)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${u(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(I)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Supplier Bill Estimate</strong></td>
              <td style="text-align: right;"><strong>${S(A)}</strong></td>
            </tr>

            ${r>0?`
            <tr class="section-label revenue-section"><td colspan="3">Solar Value & Feed-in Revenue</td></tr>
            <tr class="revenue-row">
              <td>Solar produced</td>
              <td style="text-align: right;">Total generation during this period</td>
              <td style="text-align: right;">${W(r)} kWh</td>
            </tr>
            <tr class="revenue-row">
              <td>Autoconsumed / used at home</td>
              <td style="text-align: right;">${W(z)} kWh avoided grid purchases</td>
              <td style="text-align: right;">${S(fe)} saved</td>
            </tr>
            <tr class="revenue-row">
              <td>Export sold</td>
              <td style="text-align: right;">${W(n)} kWh sent to grid</td>
              <td style="text-align: right;">${S(J)} earned</td>
            </tr>
            ${we?`
            <tr class="revenue-row">
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${W(ge)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${S(ve)} saved</td>
            </tr>
            `:""}
            ${n>0?`
            <tr class="section-label"><td colspan="3">Credit Calculation</td></tr>
            ${le.map(w=>`
            <tr class="revenue-row">
              <td>Exported (${Z?w.shortId:W(w.exportedKwh)+" kWh"})</td>
              <td style="text-align: right;">${W(w.exportedKwh)} kWh<br/>${w.label}<br/>${u(w.rate,4)} ${P}/kWh${me&&Z?`<br/>Self-use priority ${w.selfUsePriority}`:""}</td>
              <td class="revenue-amount" style="text-align: right;">-${S(w.revenue)}</td>
            </tr>
            `).join("")}
            ${Z?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${W(n)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${u(he,4)} ${P}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${S(J)}</td>
            </tr>
            `:""}
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total Solar Value</strong></td>
              <td style="text-align: right;"><strong>${S(be)}</strong></td>
            </tr>
            <tr class="net-total-row">
              <td colspan="2"><strong>Net Electricity Position</strong></td>
              <td style="text-align: right;"><strong>${S(x)}</strong></td>
            </tr>
            `:""}
            ${n<=0?`
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total Solar Value</strong></td>
              <td style="text-align: right;"><strong>${S(be)}</strong></td>
            </tr>
            `:""}
            `:""}
          </tbody>
        </table>
      </div>

      ${ia}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Supplier bill estimate: ${S(A)}</strong>${J>0?` Feed-in revenue is shown separately as ${S(J)}, giving a net electricity position of ${S(x)} after export credit.`:""}
          <br/>
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${W(p)} kWh), not total home usage.
          Supplier pricing: ${na}.
          Fixed monthly charges are prorated across the viewed period (${T} days, ${D}, equivalent to ${u(F,2)} monthly charges).
          Peak load (${u(i,1)} kW) is compared against ${C?"your configured reference power windows":`your reference power level (${u(h,1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${u(e.exceedance_rate,4)} ${P}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${f?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${ot}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${W(d)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${gt($)} m³</span>
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
              <td>Fixed Fee <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${u(e.gas_fixed_fee??6.5,2)} ${P}/mo</td>
              <td style="text-align: right;">${S(E)}</td>
            </tr>
            <tr>
              <td>Energy (${W(d)} kWh)</td>
              <td style="text-align: right;">${u(e.gas_variable_rate??.055,4)} ${P}/kWh</td>
              <td style="text-align: right;">${S(L)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${u(e.gas_network_fee??4.8,2)} ${P}/mo</td>
              <td style="text-align: right;">${S(N)}</td>
            </tr>
            <tr>
              <td>Network Variable (${W(d)} kWh)</td>
              <td style="text-align: right;">${u(e.gas_network_variable_rate??.012,4)} ${P}/kWh</td>
              <td style="text-align: right;">${S(B)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${W(d)} kWh)</td>
              <td style="text-align: right;">${u(e.gas_tax_rate??.001,4)} ${P}/kWh</td>
              <td style="text-align: right;">${S($e)}</td>
            </tr>

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${S(te)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${u((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${S(ce)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${S(_e)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Net Energy Position: ${S(x+_e)}</strong>
          (Electricity net position: ${S(x)} + Gas supplier estimate: ${S(_e)})
        </p>
      </div>
      `:""}

      ${r>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Value &mdash; ${ot}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${S(be)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${W(r)} kWh</div>
            <div class="solar-stat-label">Solar produced</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${S(fe)}</div>
            <div class="solar-stat-label">Saved by autoconsuming ${W(z)} kWh</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${st(Oe)}</div>
            <div class="solar-stat-label">Extra value from using it yourself instead of selling it</div>
          </div>
          ${we?`
          <div class="solar-stat">
            <div class="solar-stat-value">${S(ve)}</div>
            <div class="solar-stat-label">Saved by staying under the reference power</div>
          </div>
          `:""}
          <div class="solar-stat">
            <div class="solar-stat-value">${S(J)}</div>
            <div class="solar-stat-label">Earned by selling ${W(n)} kWh</div>
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
              <td style="text-align: right;">${W(r)} kWh</td>
            </tr>
            <tr>
              <td>Autoconsumed / used at home</td>
              <td style="text-align: right;">${W(z)} kWh avoided grid purchases</td>
              <td style="text-align: right;">${S(fe)} saved</td>
            </tr>
            <tr>
              <td>Extra vs exporting instead</td>
              <td style="text-align: right;">${Qt}</td>
              <td style="text-align: right;">${st(Oe)}</td>
            </tr>
            <tr>
              <td>Export sold</td>
              <td style="text-align: right;">${W(n)} kWh sent to grid</td>
              <td style="text-align: right;">${S(J)} earned</td>
            </tr>
            ${we?`
            <tr>
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${W(ge)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${S(ve)} saved</td>
            </tr>
            `:""}

            ${Jt}

            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${W(z)} kWh)</td>
              <td style="text-align: right;">${u(e.energy_variable_rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${S(z*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${u(e.network_variable_rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${S(z*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${u(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${S(z*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${u(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(Ge)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${S(fe)}</strong></td>
            </tr>

            ${we?`
            <tr class="section-label"><td colspan="3">Reference Power Savings</td></tr>
            <tr>
              <td>Exceedance avoided</td>
              <td style="text-align: right;">${W(ge)} kWh above the reference power level</td>
              <td style="text-align: right;">${S(Me)}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${u(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(Le)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Reference Power Savings</strong></td>
              <td style="text-align: right;"><strong>${S(ve)}</strong></td>
            </tr>
            `:""}

            ${n>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${le.map(w=>`
            <tr>
              <td>Sold to grid ${Z?`(${w.shortId})`:`(${W(w.exportedKwh)} kWh)`}</td>
              <td style="text-align: right;">${W(w.exportedKwh)} kWh<br/>${w.label}<br/>${u(w.rate,4)} ${P}/kWh${me&&Z?`<br/>Self-use priority ${w.selfUsePriority}`:""}</td>
              <td style="text-align: right;">${S(w.revenue)}</td>
            </tr>
            `).join("")}
            ${Z?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${S(J)}</strong></td>
            </tr>
            `:""}
            `:""}

            <tr class="total-row solar-total-row">
              <td colspan="2"><strong>💰 Total Solar Panel Value</strong></td>
              <td style="text-align: right;"><strong>${S(be)}</strong></td>
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
          ${me?"Per-system self-consumption and export are allocated from each PV system's 15-minute production using the configured self-use priority (1 = consumed first at home).":Z?"Displayed per-meter feed-in kWh are currently equal-split estimates because per-meter production data was not available for this view.":""}
        </p>
      </div>
      `:""}
    </section>
  `}const us=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],hs=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Reference Power Fixed Charge",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"connect_discount",label:"Monthly Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],ms={consumption:"Power Consumption",production:"Power Production",gas:"Gas Consumption"},Yt={consumption:"⚡",production:"☀️",gas:"🔥"};function gs(t){return t.map(e=>`<span class="meter-type-badge meter-type-${e}">${Yt[e]??""} ${ms[e]??e}</span>`).join(" ")}function Lt(t,e,a){const s=t+1;return a?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${s}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${gs(e.types)}</div>
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
  `}function jt(t){return us.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function vs(t,e){return`
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
            ${jt(e.day_group??"all")}
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
  `}function ys(t,e){return`
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
            ${jt(e.day_group??"all")}
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
  `}function fs(t,e="ha",a){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const s=e==="standalone"?(a==null?void 0:a.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let r="";if(e==="standalone"){const y=s.map((v,T)=>Lt(T,v,!1)).join("");a==null||a.proxy_url,r=`
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
              ${y}
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
    `}else{const y=(t==null?void 0:t.meters)??[];r=`
      <div class="card" style="margin-bottom: var(--sp-6); padding: var(--sp-4) var(--sp-5);">
        <p class="muted" style="margin: 0 0 var(--sp-3) 0;">🔒 API credentials are managed through Home Assistant &rarr; Settings &rarr; Integrations &rarr; Leneda</p>
        <div class="form-section">
          <div class="form-section-title">📊  Configured Metering Points</div>
          <div id="meters-container">
            ${y.length>0?y.map((v,T)=>Lt(T,v,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const o=y=>y.map(c=>{const v=t?t[c.key]??"":"";return`
        <div class="form-row">
          <label for="cfg-${c.key}">${c.label}</label>
          <div class="input-group">
            <input
              id="cfg-${c.key}"
              name="${c.key}"
              type="${c.type}"
              ${c.type==="number"?`step="${c.step}"`:""}
              value="${v}"
            />
            ${c.unit?`<span class="input-unit">${c.unit}</span>`:""}
          </div>
        </div>
      `}).join(""),n=((t==null?void 0:t.meters)??[]).filter(y=>y.types.includes("production")),l=(t==null?void 0:t.feed_in_rates)??[],p=e==="ha";function m(y){return l.find(c=>c.meter_id===y)??{meter_id:y,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:"",self_use_priority:n.findIndex(c=>c.id===y)+1}}const h=n.length===0?'<p class="muted">No production meters configured — add a meter with Power Production type above.</p>':n.map((y,c)=>{const v=m(y.id),T=y.id?"…"+y.id.slice(-8):`Meter ${c+1}`;return`
          <div class="feed-in-meter-card" data-meter-idx="${c}" data-meter-id="${y.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${T}</span>
              <input type="hidden" name="feed_in_rate_${c}_meter_id" value="${y.id}" />
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
                  value="${v.self_use_priority??c+1}"
                />
                <span class="input-unit">1 = used first at home</span>
              </div>
            </div>
            <div class="form-row">
              <label>Pricing Mode</label>
              <div class="feed-in-mode-toggle">
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${c}_mode" value="fixed" ${v.mode==="fixed"?"checked":""} />
                  <span class="mode-label">💶 Fixed Tariff</span>
                </label>
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${c}_mode" value="sensor" ${v.mode==="sensor"?"checked":""} />
                  <span class="mode-label">📡 HA Sensor</span>
                </label>
              </div>
            </div>
            <div class="feed-in-fixed-fields" data-rate-idx="${c}" style="${v.mode==="fixed"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${c}_tariff">Feed-in Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${c}_tariff" name="feed_in_rate_${c}_tariff" type="number" step="0.0001" value="${v.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
              </div>
            </div>
            <div class="feed-in-sensor-fields" data-rate-idx="${c}" style="${v.mode==="sensor"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${c}_sensor">Market Price Sensor</label>
                <div class="input-group sensor-picker-group">
                  <input
                    id="cfg-feed_in_rate_${c}_sensor"
                    name="feed_in_rate_${c}_sensor_entity"
                    type="text"
                    value="${v.sensor_entity}"
                    placeholder="${p?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${p&&c===0?'<datalist id="ha-entity-list"></datalist>':""}
              </div>
              <div class="form-row">
                <label for="cfg-feed_in_rate_${c}_fallback">Fallback Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${c}_fallback" name="feed_in_rate_${c}_fallback_tariff" type="number" step="0.0001" value="${v.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
                <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                  Used when the sensor is unavailable.
                </p>
              </div>
            </div>
          </div>
        `}).join(""),g=((t==null?void 0:t.meters)??[]).some(y=>y.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),d=(t==null?void 0:t.consumption_rate_windows)??[],$=(t==null?void 0:t.reference_power_windows)??[],f=(t==null?void 0:t.meters)??[],b=(t==null?void 0:t.meter_monthly_fees)??[];function M(y){return b.find(c=>c.meter_id===y)??{meter_id:y,label:"",fee:0}}const k=f.length===0?'<p class="muted">No meters configured.</p>':f.map((y,c)=>{const v=M(y.id),T=y.id?"…"+y.id.slice(-8):`Meter ${c+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${y.types.map(D=>Yt[D]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${T}</code>
              <input type="hidden" name="meter_fee_${c}_meter_id" value="${y.id}" />
            </div>
            <div class="form-row" style="margin-bottom: var(--sp-2);">
              <label for="cfg-meter_fee_${c}_label">Label</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${c}_label" name="meter_fee_${c}_label" type="text" value="${v.label||`Meter ${c+1} metering fee`}" placeholder="e.g. Smart meter rental" />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-meter_fee_${c}_fee">Monthly Fee</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${c}_fee" name="meter_fee_${c}_fee" type="number" step="0.01" value="${v.fee}" />
                <span class="input-unit">EUR/mo</span>
              </div>
            </div>
          </div>
        `}).join(""),_=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional supplier-rate windows. Outside these windows, the base <strong>Energy Supplier → Variable Rate</strong> is used.
      Windows can cross midnight by setting an end time earlier than the start time.
    </p>
    <div id="consumption-windows-container">
      ${d.length>0?d.map((y,c)=>vs(c,y)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,C=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${$.length>0?$.map((y,c)=>ys(c,y)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,i=hs.map(y=>{if(y.title==="Gas Billing"&&!g||y.title==="Meter Fees"&&f.length<2)return"";let c;return y.title==="Feed-in / Selling"?c=h:y.title==="Time-of-Use Tariffs"?c=_:y.title==="Reference Power Windows"?c=C:y.title==="Discounts"?c=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as a monthly credit. The dashboard prorates it to the selected period and subtracts it before VAT.
      </p>`+o(y.fields):y.title==="Meter Fees"?c=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+k:c=o(y.fields),`
    <div class="form-section">
      <div class="form-section-title">${y.icon}  ${y.title}</div>
      ${c}
    </div>
  `}).join("");return`
    <section class="settings-view">
      ${r}

      <div class="section-header">
        <h2>Billing Configuration</h2>
        <span class="muted">Luxembourg energy billing rates &mdash; adjust values to match your contract</span>
      </div>

      <div class="card">
        <form id="settings-form">
          ${t?i:'<p class="muted">Loading configuration…</p>'}
          ${t?`
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save Configuration</button>
            <button type="button" id="reset-config-btn" class="btn btn-outline">Reset to Defaults</button>
          </div>
          `:""}
        </form>
      </div>
    </section>
  `}function lt(t,e,a=!1,s="dark",r=""){const o=$=>`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${$}
    </svg>
  `,n=o(`
    <path d="M4 19V5" />
    <path d="M4 19H20" />
    <path d="M7 15L11 11L14 13L19 8" />
    <circle cx="7" cy="15" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="11" cy="11" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="14" cy="13" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="19" cy="8" r="1.25" fill="currentColor" stroke="none" />
  `),l=o(`
    <path d="M3 11.5L12 4L21 11.5" />
    <path d="M5.5 10.5V20H18.5V10.5" />
    <path d="M9.5 20V14H14.5V20" />
  `),p=o(`
    <path d="M4 19H20" />
    <path d="M7 19V11" />
    <path d="M12 19V7" />
    <path d="M17 19V4" />
  `),m=o(`
    <path d="M7 4H17V20L15 18.5L13 20L11 18.5L9 20L7 18.5L5 20V6A2 2 0 0 1 7 4Z" />
    <path d="M9 9H15" />
    <path d="M9 13H15" />
  `),h=o(`
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
      `),d=[{id:"charts",label:"Charts",icon:n},{id:"dashboard",label:"Dashboard",icon:l},{id:"sensors",label:"Sensors",icon:p},{id:"invoice",label:"Invoice",icon:m},{id:"settings",label:"Settings",icon:h}];return`
    <header class="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-brand">
        <img src="/leneda-panel/static/logo.png" srcset="/leneda-panel/static/logo@2x.png 2x" alt="Leneda Logo" class="navbar-logo-img" />
        ${r?`<span class="navbar-badge">${r}</span>`:""}
 
        <button class="menu-toggle ${a?"open":""}" aria-label="Toggle menu" aria-expanded="${a}">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav class="navbar-tabs ${a?"mobile-open":""}" role="tablist">
        ${d.map($=>`
          <button
            class="nav-btn ${$.id===t?"active":""}"
            data-tab="${$.id}"
            role="tab"
            aria-selected="${$.id===t}"
            aria-controls="panel-${$.id}"
          >
            <span class="nav-icon" aria-hidden="true">${$.icon}</span>
            <span class="nav-label">${$.label}</span>
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
  `}const zt="leneda_credentials",Xt="leneda_theme";function ws(){try{const t=localStorage.getItem(zt);if(t)return JSON.parse(t)}catch{}return null}function ct(t){try{localStorage.setItem(zt,JSON.stringify(t))}catch{}}function bs(){var t;try{const e=localStorage.getItem(Xt);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function $s(t){try{localStorage.setItem(Xt,t)}catch{}}function Wt(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const[,a,s,r]=e;return new Date(Number(a),Number(s)-1,Number(r))}function Pt(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${s}`}function Pe(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0"),r=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),n=String(t.getSeconds()).padStart(2,"0"),l=String(t.getMilliseconds()).padStart(3,"0"),p=-t.getTimezoneOffset(),m=p>=0?"+":"-",h=String(Math.floor(Math.abs(p)/60)).padStart(2,"0"),g=String(Math.abs(p)%60).padStart(2,"0");return`${e}-${a}-${s}T${r}:${o}:${n}.${l}${m}${h}:${g}`}function Kt(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function _s(t,e=new Date){switch(t){case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const s=new Date(a);return s.setHours(23,59,59,999),{start:a,end:s}}case"this_week":{const a=new Date(e),s=a.getDay()||7;return a.setDate(a.getDate()-s+1),a.setHours(0,0,0,0),{start:a,end:e}}case"last_week":{const a=new Date(e),s=a.getDay()||7,r=new Date(a);r.setDate(a.getDate()-s),r.setHours(23,59,59,999);const o=new Date(r);return o.setDate(r.getDate()-6),o.setHours(0,0,0,0),{start:o,end:r}}case"this_month":return{start:new Date(e.getFullYear(),e.getMonth(),1),end:e};case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),s=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:a,end:s}}case"this_year":return{start:new Date(e.getFullYear(),0,1),end:e};case"last_year":{const a=new Date(e.getFullYear()-1,0,1),s=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:a,end:s}}}}function xs(t,e,a=new Date){const s=Wt(t),r=Wt(e);if(!s||!r)return null;const o=["yesterday","this_week","last_week","this_month","last_month","this_year","last_year"];for(const n of o){const l=_s(n,a);if(Kt(s,l.start)&&Kt(r,l.end))return n}return null}class ks{constructor(e){Se(this,"root");Se(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartViewportStart:null,chartViewportEnd:null,chartUnit:"kwh",chartTimeBucket:"quarter_hour",chartConsumptionView:"grid",analysisHeatmapMetric:"grid",analysisProfileMetric:"house",analysisComparisonMode:"previous",analysisComparison:null,analysisComparisonLoading:!1,rangeData:null,consumptionTimeseries:null,productionTimeseries:null,gridImportTimeseries:null,marketExportTimeseries:null,perMeterProductionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:bs()});Se(this,"preZoomRange",null);Se(this,"preZoomCustomStart","");Se(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await Rt();if(this.state.mode=e.mode,e.mode==="standalone"){const a=ws();if(a&&(this.state.credentials=a),!e.configured&&!a){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&a)try{const{saveCredentials:s}=await de(async()=>{const{saveCredentials:r}=await Promise.resolve().then(()=>ke);return{saveCredentials:r}},void 0);await s(a)}catch{}if(!a)try{this.state.credentials=await It()}catch{}}await this.loadData()}toDisplayError(e,a="Failed to load data"){const s=e instanceof Error?e.message:String(e??"").trim(),r=s.toLowerCase();return r.includes("missing data")||r.includes("no_data")||r.includes("no data")?"Missing data":s||a}clearRangeStateWithError(e,a="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.state.gridImportTimeseries=null,this.state.marketExportTimeseries=null,this.state.perMeterProductionTimeseries=null,this.clearChartViewport(),this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1,this.state.error=this.toDisplayError(e,a)}async fetchPerMeterProductionForRange(e,a,s){var o;if(((e==null?void 0:e.meters)??[]).filter(n=>n.types.includes("production")).length<=1)return null;try{const n=await dt("1-1:2.29.0",a,s);return(o=n.meters)!=null&&o.length?n:null}catch(n){return console.warn("Per-meter production fetch failed:",n),null}}async fetchEnergyFlowTimeseries(e,a){const[s,r,o,n]=await Promise.all([Ke("1-1:1.29.0",e,a),Ke("1-1:2.29.0",e,a),Ke("1-65:1.29.9",e,a),Ke("1-65:2.29.9",e,a)]);return{consumptionTimeseries:s,productionTimeseries:r,gridImportTimeseries:o,marketExportTimeseries:n}}resetAnalysisComparison(){this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1}clearChartViewport(){this.state.chartViewportStart=null,this.state.chartViewportEnd=null}normalizeChartTimeBucket(){const{start:e,end:a}=this.getDateRangeISO(),s=$a(ut(e,a),this.state.chartTimeBucket);s!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=s)}getCurrentRangeKey(){const{start:e,end:a}=this.getDateRangeISO();return`${e}|${a}`}shiftIsoByYears(e,a){const s=new Date(e);if(!Number.isFinite(s.getTime()))return e;const r=new Date(s);return r.setUTCFullYear(r.getUTCFullYear()+a),r.toISOString()}getComparisonRangeISO(e,a,s){if(s==="last_year")return{start:this.shiftIsoByYears(e,-1),end:this.shiftIsoByYears(a,-1)};const r=new Date(e).getTime(),o=new Date(a).getTime(),n=Math.max(0,o-r),l=r-1,p=l-n;return{start:new Date(p).toISOString(),end:new Date(l).toISOString()}}async loadAnalysisComparison(e=!1){var l;if(!this.state.consumptionTimeseries||!this.state.productionTimeseries)return;const{start:a,end:s}=this.getDateRangeISO(),r=this.state.analysisComparisonMode,o=`${a}|${s}|${r}`;if(!e&&(this.state.analysisComparisonLoading||((l=this.state.analysisComparison)==null?void 0:l.key)===o))return;const n=this.getComparisonRangeISO(a,s,r);this.state.analysisComparisonLoading=!0,this.state.tab==="charts"&&this.renderPreserveMainScroll();try{const{consumptionTimeseries:p,productionTimeseries:m,gridImportTimeseries:h,marketExportTimeseries:g}=await this.fetchEnergyFlowTimeseries(n.start,n.end);if(o!==this.getCurrentRangeKey())return;this.state.analysisComparison={key:o,mode:r,start:n.start,end:n.end,consumptionTimeseries:p,productionTimeseries:m,gridImportTimeseries:h,marketExportTimeseries:g}}catch(p){console.warn("Comparison data fetch failed:",p),o===this.getCurrentRangeKey()&&(this.state.analysisComparison=null)}finally{o===this.getCurrentRangeKey()&&(this.state.analysisComparisonLoading=!1,this.state.tab==="charts"&&this.renderPreserveMainScroll())}}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.clearChartViewport(),this.resetAnalysisComparison(),this.render();try{const[e,a,s]=await Promise.all([Ze(this.state.range),pt(),Ve()]),{start:r,end:o}=this.getDateRangeISO(),[n,l]=await Promise.all([this.fetchEnergyFlowTimeseries(r,o),this.fetchPerMeterProductionForRange(s,r,o)]);this.state.rangeData=e,this.state.consumptionTimeseries=n.consumptionTimeseries,this.state.productionTimeseries=n.productionTimeseries,this.state.gridImportTimeseries=n.gridImportTimeseries,this.state.marketExportTimeseries=n.marketExportTimeseries,this.state.perMeterProductionTimeseries=l,this.state.sensors=a,this.state.config=s}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async changeRange(e){if(this.preZoomRange=null,this.clearChartViewport(),this.state.range=e,this.resetAnalysisComparison(),e==="custom"){if(!this.state.customStart||!this.state.customEnd){const a=new Date;a.setDate(a.getDate()-1);const s=new Date(a);s.setDate(s.getDate()-6),this.state.customStart=Pt(s),this.state.customEnd=Pt(a)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:a,end:s}=this.getDateRangeISO(),[r,o,n]=await Promise.all([Ze(e),this.fetchEnergyFlowTimeseries(a,s),this.fetchPerMeterProductionForRange(this.state.config,a,s)]);this.state.rangeData=r,this.state.consumptionTimeseries=o.consumptionTimeseries,this.state.productionTimeseries=o.productionTimeseries,this.state.gridImportTimeseries=o.gridImportTimeseries,this.state.marketExportTimeseries=o.marketExportTimeseries,this.state.perMeterProductionTimeseries=n}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async applyCustomRange(){this.preZoomRange=null,this.clearChartViewport();const{customStart:e,customEnd:a}=this.state;if(!(!e||!a)){this.state.error=null,this.state.loading=!0,this.resetAnalysisComparison(),this.render();try{const s=xs(e,a),r=s?Ze(s):de(async()=>{const{fetchCustomData:g}=await Promise.resolve().then(()=>ke);return{fetchCustomData:g}},void 0).then(({fetchCustomData:g})=>g(e,a)),o=this.state.config,n=Pe(new Date(e+"T00:00:00")),l=Pe(new Date(a+"T23:59:59.999")),[p,m,h]=await Promise.all([r,this.fetchEnergyFlowTimeseries(n,l),this.fetchPerMeterProductionForRange(o,n,l)]);this.state.rangeData={range:"custom",consumption:p.consumption,production:p.production,exported:p.exported??0,self_consumed:p.self_consumed??0,grid_import:p.grid_import,solar_to_home:p.solar_to_home,direct_solar_to_home:p.direct_solar_to_home,shared:p.shared,shared_with_me:p.shared_with_me,gas_energy:p.gas_energy??0,gas_volume:p.gas_volume??0,peak_power_kw:p.peak_power_kw??0,exceedance_kwh:p.exceedance_kwh??0,metering_point:p.metering_point??"",start:p.start??e,end:p.end??a},this.state.consumptionTimeseries=m.consumptionTimeseries,this.state.productionTimeseries=m.productionTimeseries,this.state.gridImportTimeseries=m.gridImportTimeseries,this.state.marketExportTimeseries=m.marketExportTimeseries,this.state.perMeterProductionTimeseries=h}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}}async shiftChartPeriod(e){const{start:a,end:s}=this.getDateRangeISO(),r=Gt(a,s,this.state.chartTimeBucket,e);r&&await this.handleChartZoomChange(Pe(r.start),Pe(r.end))}changeTab(e){this.state.tab=e,this.render(),(e==="dashboard"||e==="charts")&&!this.state.rangeData&&!this.state.loading&&this.loadData(),e==="charts"&&this.state.rangeData&&this.loadAnalysisComparison(),e==="sensors"&&!this.state.sensors&&pt().then(a=>{this.state.sensors=a,this.render()}),e==="settings"&&!this.state.config&&Ve().then(a=>{this.state.config=a,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,$s(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}printInvoice(){var n,l;const e=document.title,s=`Leneda-invoice-${(n=this.state.rangeData)!=null&&n.start&&((l=this.state.rangeData)!=null&&l.end)?`${this.state.rangeData.start.slice(0,10)}_to_${this.state.rangeData.end.slice(0,10)}`:this.state.range}`.replace(/[^a-z0-9_-]+/gi,"-");let r=!1;const o=()=>{r||(r=!0,document.title=e,window.removeEventListener("afterprint",o))};document.title=s,window.addEventListener("afterprint",o,{once:!0}),window.print(),window.setTimeout(o,1e3)}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const a=this.root.querySelector(".main-content");a?a.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}getDataSourceLabel(){return this.state.mode==="ha"?"Home Assistant":"Standalone"}getHostedDataNoticeHtml(){var e;return(((e=this.state.credentials)==null?void 0:e.proxy_url)??"").trim().length>0,""}render(){var p;const{tab:e,loading:a,error:s,theme:r}=this.state,o=this.getDataSourceLabel(),n=this.getHostedDataNoticeHtml();if(a&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${lt(e,m=>{},!1,r,o)}
          <main class="main-content">
            ${n}
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `,this.attachNavListeners();return}if(s&&!this.state.rangeData){const m=s.toLowerCase().includes("missing data");this.root.innerHTML=`
        <div class="app-shell">
          ${lt(e,h=>{},!1,r,o)}
          <main class="main-content">
            ${n}
            <div class="error-state">
              <h2>${m?"Missing Data":"Connection Error"}</h2>
              <p>${m?"The selected period could not be loaded because data is missing.":s}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(p=this.root.querySelector("#retry-btn"))==null||p.addEventListener("click",()=>this.loadData());return}this.state.rangeData&&this.normalizeChartTimeBucket();let l="";switch(e){case"dashboard":l=ka(this.state);break;case"charts":l=ss(this.state);break;case"sensors":l=ns(this.state.sensors);break;case"invoice":l=ps(this.state);break;case"settings":l=fs(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${lt(e,m=>this.changeTab(m),this.state.isMenuOpen,r,o)}
        <main class="main-content">
          ${n}
          ${a?'<div class="loading-bar"></div>':""}
          ${l}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachAnalysisListeners(),this.attachInvoiceListeners(),this.attachSettingsListeners()}attachNavListeners(){var e,a;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(a=this.root.querySelector("[data-theme-toggle]"))==null||a.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.tab;this.changeTab(r)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(n=>{n.addEventListener("click",()=>{const l=n.dataset.range;this.changeRange(l)})});const a=this.root.querySelector("#custom-start"),s=this.root.querySelector("#custom-end");a&&a.addEventListener("change",()=>{this.state.customStart=a.value}),s&&s.addEventListener("change",()=>{this.state.customEnd=s.value});const r=this.root.querySelector("#apply-custom-range");if(r==null||r.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(n=>{n.addEventListener("click",()=>{const l=n.dataset.chartUnit;l!==this.state.chartUnit&&(this.state.chartUnit=l,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-bucket]").forEach(n=>{n.addEventListener("click",()=>{const l=n.dataset.chartBucket,{start:p,end:m}=this.getDateRangeISO();Re(l,ut(p,m))&&l!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=l,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-period-nav]").forEach(n=>{n.addEventListener("click",()=>{const l=n.dataset.chartPeriodNav==="next"?1:-1;this.shiftChartPeriod(l)})}),this.root.querySelectorAll("[data-chart-view]").forEach(n=>{n.addEventListener("click",()=>{const l=n.dataset.chartView;l!==this.state.chartConsumptionView&&(this.state.chartConsumptionView=l,this.renderPreserveMainScroll())})}),!e){const n=this.root.querySelector("#energy-chart");n&&this.state.rangeData&&this.initChart(n)}const o=this.root.querySelector(".reset-zoom-btn");o==null||o.addEventListener("click",async()=>{const{resetChartZoom:n}=await de(async()=>{const{resetChartZoom:l}=await import("./Charts-B8MEZ0rf.js");return{resetChartZoom:l}},[]);if(n(),o.style.display="none",this.clearChartViewport(),this.preZoomRange!==null){const l=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",l==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(l)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachAnalysisListeners(){this.root.querySelectorAll("[data-analysis-heatmap]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisHeatmap;a!==this.state.analysisHeatmapMetric&&(this.state.analysisHeatmapMetric=a,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-profile]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisProfile;a!==this.state.analysisProfileMetric&&(this.state.analysisProfileMetric=a,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-comparison-mode]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisComparisonMode;a!==this.state.analysisComparisonMode&&(this.state.analysisComparisonMode=a,this.state.analysisComparison=null,this.loadAnalysisComparison(!0))})})}attachInvoiceListeners(){var e;(e=this.root.querySelector("#print-invoice-btn"))==null||e.addEventListener("click",()=>{this.printInvoice()})}attachSettingsListeners(){var p,m;const e=this.root.querySelector("#credentials-form");if(e){const h=this.root.querySelector("#add-meter-btn");h==null||h.addEventListener("click",()=>{var b,M,k;const $=new FormData(e),f=g($);if(f.length<10){f.push({id:"",types:["consumption"]});const _={api_key:$.get("api_key")||((b=this.state.credentials)==null?void 0:b.api_key)||"",energy_id:$.get("energy_id")||((M=this.state.credentials)==null?void 0:M.energy_id)||"",meters:f,proxy_url:$.get("proxy_url")||((k=this.state.credentials)==null?void 0:k.proxy_url)||""};this.state.credentials=_,ct(_),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach($=>{$.addEventListener("click",()=>{var _,C,i;const f=parseInt($.dataset.meter??"0",10),b=new FormData(e),M=g(b);M.splice(f,1);const k={api_key:b.get("api_key")||((_=this.state.credentials)==null?void 0:_.api_key)||"",energy_id:b.get("energy_id")||((C=this.state.credentials)==null?void 0:C.energy_id)||"",meters:M,proxy_url:b.get("proxy_url")||((i=this.state.credentials)==null?void 0:i.proxy_url)||""};this.state.credentials=k,ct(k),this.renderPreserveMainScroll()})});const g=$=>{var b,M,k;const f=[];for(let _=0;_<10;_++){const C=$.get(`meter_${_}_id`);if(C===null)break;const i=[];(b=e.querySelector(`[name="meter_${_}_consumption"]`))!=null&&b.checked&&i.push("consumption"),(M=e.querySelector(`[name="meter_${_}_production"]`))!=null&&M.checked&&i.push("production"),(k=e.querySelector(`[name="meter_${_}_gas"]`))!=null&&k.checked&&i.push("gas"),f.push({id:C.trim(),types:i})}return f};e.addEventListener("submit",async $=>{$.preventDefault();const f=new FormData(e),b={api_key:f.get("api_key"),energy_id:f.get("energy_id"),meters:g(f),proxy_url:f.get("proxy_url")},M=this.root.querySelector("#creds-status");try{ct(b);const{saveCredentials:k}=await de(async()=>{const{saveCredentials:i}=await Promise.resolve().then(()=>ke);return{saveCredentials:i}},void 0);await k(b),M&&(M.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=b,this.state.error=null;const _=!1,C=(b.proxy_url??"").trim();await this.loadData()}catch(k){M&&(M.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${k instanceof Error?k.message:k}</p>`)}});const d=this.root.querySelector("#test-creds-btn");d==null||d.addEventListener("click",async()=>{const $=new FormData(e),f={api_key:$.get("api_key"),energy_id:$.get("energy_id"),meters:g($),proxy_url:$.get("proxy_url")},b=this.root.querySelector("#creds-status");b&&(b.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:M}=await de(async()=>{const{testCredentials:_}=await Promise.resolve().then(()=>ke);return{testCredentials:_}},void 0),k=await M(f);b&&(b.innerHTML=k.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${k.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${k.message}</p>`)}catch(M){b&&(b.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${M instanceof Error?M.message:M}</p>`)}})}const a=this.root.querySelector("#settings-form");if(!a)return;const s=h=>{const g=[];for(let d=0;d<24;d++){const $=h.get(`consumption_window_${d}_label`),f=h.get(`consumption_window_${d}_day_group`),b=h.get(`consumption_window_${d}_start_time`),M=h.get(`consumption_window_${d}_end_time`),k=h.get(`consumption_window_${d}_rate`);if($===null&&f===null&&b===null&&M===null&&k===null)break;g.push({label:($??"").trim()||`Window ${d+1}`,day_group:f??"all",start_time:b??"00:00",end_time:M??"06:00",rate:parseFloat(k??"0")||0})}return g},r=h=>{const g=[];for(let d=0;d<24;d++){const $=h.get(`reference_window_${d}_label`),f=h.get(`reference_window_${d}_day_group`),b=h.get(`reference_window_${d}_start_time`),M=h.get(`reference_window_${d}_end_time`),k=h.get(`reference_window_${d}_reference_power_kw`);if($===null&&f===null&&b===null&&M===null&&k===null)break;g.push({label:($??"").trim()||`Reference ${d+1}`,day_group:f??"all",start_time:b??"17:00",end_time:M??"00:00",reference_power_kw:parseFloat(k??"0")||0})}return g},o=()=>{var _;const h=new FormData(a),g={};a.querySelectorAll('input[type="checkbox"]').forEach(C=>{g[C.name]=C.checked});const d=[],$=/^feed_in_rate_(\d+)_(.+)$/,f={},b=[],M=/^meter_fee_(\d+)_(.+)$/,k={};for(const[C,i]of h.entries()){if(C.startsWith("consumption_window_")||C.startsWith("reference_window_"))continue;const y=C.match($);if(y){const D=y[1],K=y[2];f[D]||(f[D]={}),f[D][K]=i;continue}const c=C.match(M);if(c){const D=c[1],K=c[2];k[D]||(k[D]={}),k[D][K]=i;continue}if(g[C]!==void 0&&typeof g[C]=="boolean")continue;const v=i,T=a.elements.namedItem(C);if(v===""&&T instanceof HTMLInputElement&&T.type==="number"){const D=(_=this.state.config)==null?void 0:_[C];typeof D=="number"&&isFinite(D)&&(g[C]=D);continue}const F=parseFloat(v);g[C]=isNaN(F)?v:F}for(const C of Object.keys(f).sort()){const i=f[C],y=i.mode??"fixed",c=y==="sensor"?i.fallback_tariff??i.tariff:i.tariff;d.push({meter_id:i.meter_id??"",mode:y,tariff:parseFloat(c??"0.08")||.08,sensor_entity:i.sensor_entity??"",self_use_priority:Math.max(1,parseInt(i.self_use_priority??`${Number(C)+1}`,10)||Number(C)+1)})}d.length>0&&(g.feed_in_rates=d);for(const C of Object.keys(k).sort()){const i=k[C];b.push({meter_id:i.meter_id??"",label:i.label??"",fee:parseFloat(i.fee??"0")||0})}return b.length>0&&(g.meter_monthly_fees=b),g.consumption_rate_windows=s(h),g.reference_power_windows=r(h),g},n=h=>{if(!this.state.config)return;const g=o();h(g),this.state.config={...this.state.config,...g},this.renderPreserveMainScroll()};if((p=this.root.querySelector("#add-consumption-window-btn"))==null||p.addEventListener("click",()=>{n(h=>{var d;const g=Array.isArray(h.consumption_rate_windows)?[...h.consumption_rate_windows]:[];g.push({label:`Window ${g.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((d=this.state.config)==null?void 0:d.energy_variable_rate)??.1125}),h.consumption_rate_windows=g})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(h=>{h.addEventListener("click",()=>{const g=parseInt(h.dataset.window??"0",10);n(d=>{const $=Array.isArray(d.consumption_rate_windows)?[...d.consumption_rate_windows]:[];$.splice(g,1),d.consumption_rate_windows=$})})}),(m=this.root.querySelector("#add-reference-window-btn"))==null||m.addEventListener("click",()=>{n(h=>{var d;const g=Array.isArray(h.reference_power_windows)?[...h.reference_power_windows]:[];g.push({label:`Reference ${g.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((d=this.state.config)==null?void 0:d.reference_power_kw)??5}),h.reference_power_windows=g})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(h=>{h.addEventListener("click",()=>{const g=parseInt(h.dataset.window??"0",10);n(d=>{const $=Array.isArray(d.reference_power_windows)?[...d.reference_power_windows]:[];$.splice(g,1),d.reference_power_windows=$})})}),a.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(h=>{h.addEventListener("change",()=>{const g=h.name.match(/feed_in_rate_(\d+)_mode/);if(!g)return;const d=g[1],$=a.querySelector(`.feed-in-fixed-fields[data-rate-idx="${d}"]`),f=a.querySelector(`.feed-in-sensor-fields[data-rate-idx="${d}"]`);$&&($.style.display=h.value==="fixed"?"":"none"),f&&(f.style.display=h.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const h=this.root.querySelector("#ha-entity-list");h&&At().then(({entities:g})=>{h.innerHTML=g.map(d=>`<option value="${d}"></option>`).join("")}).catch(()=>{})}a.addEventListener("submit",async h=>{h.preventDefault();const g=o();try{const{saveConfig:d}=await de(async()=>{const{saveConfig:$}=await Promise.resolve().then(()=>ke);return{saveConfig:$}},void 0);await d(g),this.state.config=await Ve(),this.render()}catch(d){alert("Failed to save: "+(d instanceof Error?d.message:d))}});const l=this.root.querySelector("#reset-config-btn");l==null||l.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?"))try{const{resetConfig:h}=await de(async()=>{const{resetConfig:g}=await Promise.resolve().then(()=>ke);return{resetConfig:g}},void 0);await h(),this.state.config=await Ve(),this.render()}catch(h){alert("Failed to reset: "+(h instanceof Error?h.message:h))}})}async initChart(e){var a,s,r,o;try{const{renderEnergyChart:n}=await de(async()=>{const{renderEnergyChart:_}=await import("./Charts-B8MEZ0rf.js");return{renderEnergyChart:_}},[]),{start:l,end:p}=this.getDateRangeISO(),m=this.state.chartViewportStart?new Date(this.state.chartViewportStart).getTime():void 0,h=this.state.chartViewportEnd?new Date(this.state.chartViewportEnd).getTime():void 0;let g=this.state.consumptionTimeseries,d=this.state.productionTimeseries,$=this.state.gridImportTimeseries,f=this.state.marketExportTimeseries;if(!g||!d||!$||!f){const _=await this.fetchEnergyFlowTimeseries(l,p);g=_.consumptionTimeseries,d=_.productionTimeseries,$=_.gridImportTimeseries,f=_.marketExportTimeseries,this.state.consumptionTimeseries=g,this.state.productionTimeseries=d,this.state.gridImportTimeseries=$,this.state.marketExportTimeseries=f}const b=((a=this.state.config)==null?void 0:a.reference_power_kw)??0,M=(((s=this.state.config)==null?void 0:s.meters)??[]).filter(_=>_.types.includes("production"));let k;if((o=(r=this.state.perMeterProductionTimeseries)==null?void 0:r.meters)!=null&&o.length)k=this.state.perMeterProductionTimeseries.meters;else if(M.length>1)try{const _=await dt("1-1:2.29.0",l,p);_.meters&&_.meters.length>1&&(k=_.meters,this.state.perMeterProductionTimeseries=_)}catch(_){console.warn("Per-meter timeseries fetch failed, using merged view:",_)}n(e,g,d,{unit:this.state.chartUnit,consumptionView:this.state.chartConsumptionView,referencePowerKw:b,gridImportTimeseries:$,marketExportTimeseries:f,perMeterProduction:k,viewportStartMs:m,viewportEndMs:h,timeBucket:this.state.chartTimeBucket,onZoomChange:(_,C)=>{this.handleChartZoomChange(_,C)}})}catch(n){console.error("Chart init failed:",n)}}async handleChartZoomChange(e,a){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd),this.state.error=null,this.state.loading=!0,this.renderPreserveMainScroll();const{fetchCustomData:s}=await de(async()=>{const{fetchCustomData:m}=await Promise.resolve().then(()=>ke);return{fetchCustomData:m}},void 0),r=e.slice(0,10),o=a.slice(0,10);this.resetAnalysisComparison();const n=await s(e,a),[l,p]=await Promise.all([this.fetchEnergyFlowTimeseries(e,a),this.fetchPerMeterProductionForRange(this.state.config,e,a)]);this.state.range="custom",this.state.customStart=r,this.state.customEnd=o,this.state.chartViewportStart=e,this.state.chartViewportEnd=a,this.state.rangeData={range:"custom",consumption:n.consumption,production:n.production,exported:n.exported??0,self_consumed:n.self_consumed??0,gas_energy:n.gas_energy??0,gas_volume:n.gas_volume??0,grid_import:n.grid_import,solar_to_home:n.solar_to_home,direct_solar_to_home:n.direct_solar_to_home,shared:n.shared,shared_with_me:n.shared_with_me,peak_power_kw:n.peak_power_kw??0,exceedance_kwh:n.exceedance_kwh??0,metering_point:n.metering_point??"",start:n.start,end:n.end},this.state.consumptionTimeseries=l.consumptionTimeseries,this.state.productionTimeseries=l.productionTimeseries,this.state.gridImportTimeseries=l.gridImportTimeseries,this.state.marketExportTimeseries=l.marketExportTimeseries,this.state.perMeterProductionTimeseries=p,this.state.loading=!1,this.renderPreserveMainScroll()}catch(s){console.error("Zoom data fetch failed:",s),this.state.loading=!1,this.clearRangeStateWithError(s,"Missing data"),this.render()}}getDateRangeISO(){if(this.state.chartViewportStart&&this.state.chartViewportEnd)return{start:this.state.chartViewportStart,end:this.state.chartViewportEnd};const e=new Date,a=s=>Pe(s);switch(this.state.range){case"custom":{const s=new Date(this.state.customStart+"T00:00:00"),r=new Date(this.state.customEnd+"T23:59:59.999");return{start:a(s),end:a(r)}}case"yesterday":{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const r=new Date(s);return r.setHours(23,59,59,999),{start:a(s),end:a(r)}}case"this_week":{const s=new Date(e),r=s.getDay()||7;return s.setDate(s.getDate()-r+1),s.setHours(0,0,0,0),{start:a(s),end:a(e)}}case"last_week":{const s=new Date(e),r=s.getDay()||7,o=new Date(s);o.setDate(s.getDate()-r),o.setHours(23,59,59,999);const n=new Date(o);return n.setDate(o.getDate()-6),n.setHours(0,0,0,0),{start:a(n),end:a(o)}}case"this_month":{const s=new Date(e.getFullYear(),e.getMonth(),1);return{start:a(s),end:a(e)}}case"last_month":{const s=new Date(e.getFullYear(),e.getMonth()-1,1),r=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:a(s),end:a(r)}}case"this_year":{const s=new Date(e.getFullYear(),0,1);return{start:a(s),end:a(e)}}case"last_year":{const s=new Date(e.getFullYear()-1,0,1),r=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:a(s),end:a(r)}}default:{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const r=new Date(s);return r.setHours(23,59,59,999),{start:a(s),end:a(r)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new ks(t).mount()}export{Ca as b};
