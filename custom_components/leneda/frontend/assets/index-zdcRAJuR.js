var da=Object.defineProperty;var pa=(t,e,a)=>e in t?da(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var De=(t,e,a)=>pa(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const ua="modulepreload",ha=function(t){return"/leneda-panel/static/"+t},ft={},re=function(e,a,s){let r=Promise.resolve();if(a&&a.length>0){let n=function(p){return Promise.all(p.map(c=>Promise.resolve(c).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),u=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));r=n(a.map(p=>{if(p=ha(p),p in ft)return;ft[p]=!0;const c=p.endsWith(".css"),g=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${g}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":ua,c||(m.as="script"),m.crossOrigin="",m.href=p,u&&m.setAttribute("nonce",u),document.head.appendChild(m),c)return new Promise((_,y)=>{m.addEventListener("load",_),m.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${p}`)))})}))}function o(n){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=n,window.dispatchEvent(i),!i.defaultPrevented)throw n}return r.then(n=>{for(const i of n||[])i.status==="rejected"&&o(i.reason);return e().catch(o)})};function Ft(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()})),proxy_url:(t.proxy_url??"").trim()}}function ma(){var t,e,a,s,r;try{const o=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((r=(s=(a=o==null?void 0:o.hass)==null?void 0:a.auth)==null?void 0:s.data)==null?void 0:r.access_token)??null}catch{return null}}async function J(t,e){const a=ma(),s={...e==null?void 0:e.headers,...a?{Authorization:`Bearer ${a}`}:{}},r={...e,credentials:"include",headers:s},o=await fetch(t,r);if(!o.ok){const n=o.headers.get("content-type")??"";let i="",u="";if(n.includes("application/json")){const p=await o.json().catch(()=>null);i=String((p==null?void 0:p.error)??"").trim(),u=String((p==null?void 0:p.message)??(p==null?void 0:p.error)??"").trim()}else u=(await o.text().catch(()=>"")).trim();throw i==="missing_data"||i==="no_data"||o.status===503?new Error("Missing data"):new Error(u?`API ${o.status}: ${u}`:`API ${o.status}: ${o.statusText}`)}return o.json()}async function ze(t){return J(`/leneda_api/data?range=${t}`)}async function ga(t,e){return J(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function ae(t,e,a){let s=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(s+=`&start=${encodeURIComponent(e)}`),a&&(s+=`&end=${encodeURIComponent(a)}`),J(s)}async function lt(t,e,a){let s=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(s+=`&start=${encodeURIComponent(e)}`),a&&(s+=`&end=${encodeURIComponent(a)}`),J(s)}async function ct(){return J("/leneda_api/sensors")}async function Ve(){return J("/leneda_api/config")}async function va(t){await J("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function ya(){await J("/leneda_api/config/reset",{method:"POST"})}async function Vt(){try{return await J("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function Rt(){return J("/leneda_api/credentials")}async function fa(t){const e=Ft(t);await J("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function wa(t){const e=Ft(t);return J("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Kt(){return J("/leneda_api/ha-entities")}const fe=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:Ve,fetchCredentials:Rt,fetchCustomData:ga,fetchHAEntities:Kt,fetchMode:Vt,fetchPerMeterTimeseries:lt,fetchRangeData:ze,fetchSensors:ct,fetchTimeseries:ae,resetConfig:ya,saveConfig:va,saveCredentials:fa,testCredentials:wa},Symbol.toStringTag,{value:"Module"}));function pt(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(e){const[,a,s,r]=e;return new Date(Number(a),Number(s)-1,Number(r))}return new Date(t)}function h(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function we(t){return pt(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function It(t){return pt(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function Ee(t){return pt(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}const Xe=[{id:"year",label:"Year",shortLabel:"Yr",stepLabel:"year",approxMs:365*864e5,maxBuckets:30},{id:"month",label:"Month",shortLabel:"Mo",stepLabel:"month",approxMs:30*864e5,maxBuckets:72},{id:"week",label:"Week",shortLabel:"Wk",stepLabel:"week",approxMs:7*864e5,maxBuckets:104},{id:"day",label:"Day",shortLabel:"Day",stepLabel:"day",approxMs:864e5,maxBuckets:370},{id:"hour",label:"Hour",shortLabel:"Hr",stepLabel:"hour",approxMs:36e5,maxBuckets:744},{id:"quarter_hour",label:"15 min",shortLabel:"15m",stepLabel:"15 minutes",approxMs:15*6e4,maxBuckets:672}];function At(t){return Xe.find(e=>e.id===t)??Xe[3]}function dt(t,e){if(!t||!e)return 0;const a=new Date(t).getTime(),s=new Date(e).getTime();return!Number.isFinite(a)||!Number.isFinite(s)?0:Math.max(0,s-a)}function Re(t,e){const a=At(t);if(e<=0)return t==="quarter_hour";const s=e/a.approxMs;return s>=1.5&&s<=a.maxBuckets}function ba(t,e){var r;if(e&&Re(e,t))return e;const a=t/864e5,s=a<=1.25?"quarter_hour":a<=7?"hour":a<=45?"day":a<=180?"week":a<=900?"month":"year";return Re(s,t)?s:((r=Xe.find(o=>Re(o.id,t)))==null?void 0:r.id)??"quarter_hour"}function $a(t,e){return new Date(t,e+1,0).getDate()}function wt(t,e,a){const s=t.getDate(),r=new Date(t),o=r.getMonth()+a,n=r.getFullYear()+e+Math.floor(o/12),i=(o%12+12)%12,u=Math.min(s,$a(n,i));return r.setFullYear(n,i,u),r}function bt(t,e,a){switch(e){case"year":return wt(t,a,0);case"month":return wt(t,0,a);case"week":return new Date(t.getTime()+a*7*864e5);case"day":return new Date(t.getTime()+a*864e5);case"hour":return new Date(t.getTime()+a*36e5);case"quarter_hour":return new Date(t.getTime()+a*15*6e4)}}function Ht(t,e,a,s){if(!t||!e)return null;const r=new Date(t),o=new Date(e);return!Number.isFinite(r.getTime())||!Number.isFinite(o.getTime())?null:{start:bt(r,a,s),end:bt(o,a,s)}}function _a(t,e){if(!t||!e)return"No period loaded";const a=new Date(t),s=new Date(e);if(!Number.isFinite(a.getTime())||!Number.isFinite(s.getTime()))return"No period loaded";if(a.getFullYear()===s.getFullYear()&&a.getMonth()===s.getMonth()&&a.getDate()===s.getDate()){const o=a.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),n=a.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=s.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${o}, ${n} - ${i}`}return`${a.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})} - ${s.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}`}const Ke=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function de(t){const e=a=>`
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
      `)}}function xa(t){var ve,Ce,We,ye,$e,_e,Se,Ge;const e=t.rangeData,a=k=>{if(!k)return"";const E=k.match(/^(\d{4}-\d{2}-\d{2})/);return E?E[1]:""},s=(e==null?void 0:e.consumption)??0,r=(e==null?void 0:e.production)??0,o=(e==null?void 0:e.exported)??0,n=(e==null?void 0:e.self_consumed)??0,i=(e==null?void 0:e.gas_energy)??0,u=(e==null?void 0:e.gas_volume)??0,p=(e==null?void 0:e.peak_power_kw)??0,c=a(e==null?void 0:e.start),g=a(e==null?void 0:e.end),m=(e==null?void 0:e.shared_with_me)??0,_=(e==null?void 0:e.shared)??0,y=Math.max(0,o),$=Math.max(0,(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(n>0?n:r-y)),C=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??$),x=$,l=Math.max(0,(e==null?void 0:e.grid_import)??s-$),b=s>0?s:l+$,M=!!((ve=t.config)!=null&&ve.meter_has_gas||(((Ce=t.config)==null?void 0:Ce.meters)??[]).some(k=>k.types.includes("gas"))),w=_+m,d=b>0?Math.min(100,$/b*100):0,v=Math.max(b,r,l,y,_,m,C,1),D=M?Math.min(Math.max(0,i),v):0,L=(k,E=2.8,W=8.2)=>k>0?E+k/v*(W-E):1.8,T=k=>L(k)+1.4,F=k=>L(k)+5.4,K=(k,E=.28,W=.88)=>k>0?E+k/v*(W-E):.1,I=(k,E=.09,W=.22)=>k>0?E+k/v*(W-E):.05,q=(k,E=1.6,W=3.9)=>`${(k>0?Math.max(E,W-k/v*(W-E)):W).toFixed(2)}s`,oe=(k,E=3.4,W=5.8)=>k>0?E+k/v*(W-E):3,z=k=>k>0?Math.max(18,Math.round(k/v*100)):0,se=k=>`
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
  `,Y=k=>{const{x:E,y:W,width:N,accent:U,kicker:xe,value:te,detail:ce}=k;return`
      <g class="scene-node-label" transform="translate(${E}, ${W})">
        <rect width="${N}" height="${ce?70:54}" rx="18" fill="var(--clr-overlay)" stroke="${U}" />
        <text x="16" y="22" class="scene-node-kicker">${xe}</text>
        <text x="16" y="${ce?39:37}" class="scene-node-value">${te}</text>
        ${ce?`<text x="16" y="56" class="scene-node-detail">${ce}</text>`:""}
      </g>
    `},ue=k=>{const{x:E,y:W,scale:N=1,glowId:U}=k;return`
      <g class="scene-tier-icon scene-tier-grid" transform="translate(${E}, ${W}) scale(${N})">
        <circle cx="0" cy="44" r="48" fill="var(--clr-consumption)" fill-opacity="0.06" />
        <path d="M0 0 V88 M-24 20 H24 M-16 42 H16 M-8 66 H8" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" filter="url(#${U})" />
        <path d="M-12 88 L0 60 L12 88" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" fill="none" />
      </g>
    `},B=k=>{const{x:E,y:W,scale:N=1,glowId:U}=k;return`
      <g class="scene-tier-icon scene-tier-solar" transform="translate(${E}, ${W}) scale(${N})">
        <circle cx="0" cy="0" r="26" fill="var(--clr-production)" fill-opacity="0.09" />
        <circle cx="0" cy="0" r="12" fill="var(--clr-production)" fill-opacity="0.9" filter="url(#${U})" />
        <path d="M0 -26 V-40 M0 26 V40 M26 0 H40 M-26 0 H-40 M18 -18 L28 -28 M18 18 L28 28 M-18 18 L-28 28 M-18 -18 L-28 -28" stroke="var(--clr-production)" stroke-width="2.5" stroke-linecap="round" />
      </g>
    `},R=k=>{const{x:E,y:W,scale:N=1,glowId:U}=k;return`
      <g class="scene-tier-icon scene-tier-community" transform="translate(${E}, ${W}) scale(${N})">
        <circle cx="0" cy="40" r="50" fill="var(--clr-primary)" fill-opacity="0.06" />
        <rect x="-26" y="30" width="22" height="42" rx="6" fill="rgba(88, 166, 255, 0.08)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="6" y="16" width="24" height="56" rx="6" fill="rgba(88, 166, 255, 0.12)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="-2" y="4" width="6" height="10" rx="2" fill="var(--clr-primary)" fill-opacity="0.7" />
        <path d="M-14 12 H14 M-10 4 V20 M10 4 V20" stroke="var(--clr-primary)" stroke-width="2" stroke-linecap="round" filter="url(#${U})" />
      </g>
    `},Q=k=>{const{x:E,y:W,scale:N=1,glowId:U}=k;return`
      <g class="scene-tier-icon scene-tier-gas" transform="translate(${E}, ${W}) scale(${N})">
        <circle cx="0" cy="38" r="46" fill="var(--clr-gas)" fill-opacity="0.08" />
        <path d="M-26 40 H-8 V72 H26" stroke="var(--clr-gas)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#${U})" />
        <path d="M0 4 C18 24 20 40 20 52 C20 70 9 84 0 84 C-9 84 -20 70 -20 52 C-20 38 -10 24 0 4 Z" fill="rgba(210, 153, 34, 0.14)" stroke="var(--clr-gas)" stroke-width="2.2" />
        <path d="M0 24 C9 35 10 44 10 52 C10 61 5 68 0 72 C-5 68 -10 61 -10 52 C-10 44 -8 35 0 24 Z" fill="var(--clr-gas)" fill-opacity="0.85" />
      </g>
    `},ie=k=>{const{prefix:E,x:W,y:N,scale:U=1}=k;return`
      <g class="elite-house" transform="translate(${W}, ${N}) scale(${U})">
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
          <text text-anchor="middle" y="18" class="house-core-value">${h(d,0)}%</text>
        </g>
        <text x="90" y="262" text-anchor="middle" class="house-total-label">Home usage</text>
        <text x="90" y="284" text-anchor="middle" class="house-total-value">${h(b)} kWh</text>
      </g>
    `},H=k=>{const{path:E,value:W,gradientId:N,colorVar:U,filterId:xe,particleClass:te,direction:ce="forward"}=k,ke=ce==="reverse"?"1;0":"0;1";return`
      <path
        class="flow-halo ${te}"
        d="${E}"
        stroke="url(#${N})"
        stroke-width="${F(W).toFixed(1)}"
        stroke-opacity="${I(W).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-rail ${te}"
        d="${E}"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="${T(W).toFixed(1)}"
        stroke-opacity="0.42"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-stream ${te}"
        d="${E}"
        stroke="url(#${N})"
        stroke-width="${L(W).toFixed(1)}"
        stroke-opacity="${K(W).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      ${W>0?`
        <circle
          class="flow-particle ${te}"
          r="${oe(W).toFixed(1)}"
          fill="${U}"
          filter="url(#${xe})"
        >
          <animateMotion dur="${q(W)}" repeatCount="indefinite" path="${E}" keyPoints="${ke}" keyTimes="0;1" calcMode="linear" />
        </circle>
        <circle
          class="flow-particle flow-particle-secondary ${te}"
          r="${Math.max(2.4,oe(W)-1.2).toFixed(1)}"
          fill="${U}"
          fill-opacity="0.75"
          filter="url(#${xe})"
        >
          <animateMotion dur="${q(W)}" begin="-${(parseFloat(q(W))/2).toFixed(2)}s" repeatCount="indefinite" path="${E}" keyPoints="${ke}" keyTimes="0;1" calcMode="linear" />
        </circle>
      `:""}
    `},he=()=>`
    <div class="elite-scene elite-scene-desktop">
      <svg class="elite-main-svg" viewBox="0 0 860 460" fill="none" preserveAspectRatio="xMidYMid meet">
        ${se("desktop")}
        <rect x="34" y="30" width="792" height="372" rx="34" fill="url(#desktop-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="430" cy="330" rx="278" ry="60" fill="url(#desktop-house-base-glow)" opacity="0.56" />
        <line x1="98" y1="334" x2="762" y2="334" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.45" />

        ${Y({x:58,y:108,width:152,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${h(l+y)} kWh`,detail:y>0?`In ${h(l)} / out ${h(y)} kWh`:void 0})}

        ${Y({x:356,y:44,width:148,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${h(r)} kWh`,detail:`${h($)} kWh used at home`})}

        ${Y({x:624,y:108,width:184,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${h(w)} kWh`,detail:`Sent ${h(_)} / got ${h(m)} kWh`})}

        ${M?Y({x:350,y:338,width:160,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${h(i)} kWh`,detail:u>0?`${h(u)} m3 in period`:"Gas meter active"}):""}

        ${ue({x:132,y:186,scale:1.02,glowId:"desktop-glow-red"})}
        ${B({x:430,y:126,glowId:"desktop-glow-green"})}
        ${R({x:716,y:194,glowId:"desktop-glow-cyan"})}
        ${M?Q({x:430,y:352,glowId:"desktop-glow-gas"}):""}
        ${ie({prefix:"desktop",x:340,y:96,scale:1.02})}

        ${H({path:"M 430 152 C 430 182 430 204 430 220",value:C,gradientId:"desktop-flow-solar",colorVar:"var(--clr-production)",filterId:"desktop-glow-green",particleClass:"flow-solar"})}

        ${H({path:"M 176 230 C 246 230 318 230 364 232",value:l,gradientId:"desktop-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"desktop-glow-red",particleClass:"flow-grid-in"})}

        ${H({path:"M 496 268 C 430 298 326 314 176 316",value:y,gradientId:"desktop-flow-grid-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-grid-out"})}

        ${H({path:"M 500 234 C 566 220 634 220 692 236",value:_,gradientId:"desktop-flow-shared-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-shared-out"})}

        ${H({path:"M 690 272 C 632 292 566 294 500 278",value:m,gradientId:"desktop-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"desktop-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${M?H({path:"M 430 404 C 430 370 430 336 430 302",value:D,gradientId:"desktop-flow-gas",colorVar:"var(--clr-gas)",filterId:"desktop-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,ee=()=>`
    <div class="elite-scene elite-scene-mobile">
      <svg class="elite-main-svg" viewBox="0 0 420 560" fill="none" preserveAspectRatio="xMidYMid meet">
        ${se("mobile")}
        <rect x="20" y="20" width="380" height="520" rx="32" fill="url(#mobile-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="210" cy="316" rx="136" ry="38" fill="url(#mobile-house-base-glow)" opacity="0.58" />
        <line x1="64" y1="332" x2="356" y2="332" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.42" />

        ${Y({x:132,y:40,width:156,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${h(r)} kWh`})}

        ${Y({x:20,y:194,width:126,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${h(l+y)} kWh`})}

        ${Y({x:274,y:194,width:126,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${h(w)} kWh`})}

        ${M?Y({x:122,y:442,width:176,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${h(i)} kWh`,detail:u>0?`${h(u)} m3`:"Gas meter active"}):""}

        ${B({x:210,y:126,scale:.92,glowId:"mobile-glow-green"})}
        ${ue({x:76,y:254,scale:.86,glowId:"mobile-glow-red"})}
        ${R({x:344,y:260,scale:.86,glowId:"mobile-glow-cyan"})}
        ${M?Q({x:210,y:442,scale:.9,glowId:"mobile-glow-gas"}):""}
        ${ie({prefix:"mobile",x:118,y:166,scale:.94})}

        ${H({path:"M 210 152 C 210 188 210 216 210 238",value:C,gradientId:"mobile-flow-solar",colorVar:"var(--clr-production)",filterId:"mobile-glow-green",particleClass:"flow-solar"})}

        ${H({path:"M 104 286 C 138 286 168 286 194 286",value:l,gradientId:"mobile-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"mobile-glow-red",particleClass:"flow-grid-in"})}

        ${H({path:"M 226 318 C 194 340 162 348 102 350",value:y,gradientId:"mobile-flow-grid-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-grid-out"})}

        ${H({path:"M 226 286 C 262 274 294 274 318 286",value:_,gradientId:"mobile-flow-shared-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-shared-out"})}

        ${H({path:"M 318 320 C 294 332 262 334 226 322",value:m,gradientId:"mobile-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"mobile-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${M?H({path:"M 210 474 C 210 432 210 390 210 344",value:D,gradientId:"mobile-flow-gas",colorVar:"var(--clr-gas)",filterId:"mobile-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,Le=e!=null&&e.start&&(e!=null&&e.end)?`${we(e.start)} — ${we(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${we(t.customStart+"T00:00:00")} — ${we(t.customEnd+"T00:00:00")}`:((We=Ke.find(k=>k.id===t.range))==null?void 0:We.label)??"Yesterday",X=($e=(ye=t.consumptionTimeseries)==null?void 0:ye.items)!=null&&$e.length?t.consumptionTimeseries.items:((_e=t.productionTimeseries)==null?void 0:_e.items)??[],me=t.chartViewportStart??((Se=X[0])==null?void 0:Se.startedAt)??(e==null?void 0:e.start),Z=t.chartViewportEnd??((Ge=X[X.length-1])==null?void 0:Ge.startedAt)??(e==null?void 0:e.end),Ie=dt(me,Z),le=At(t.chartTimeBucket),ge=_a(me,Z),j=Ht(me,Z,t.chartTimeBucket,1),Ae=new Date,Qe=!j||j.start.getTime()>Ae.getTime(),He=Xe.map(k=>{const E=Re(k.id,Ie),W=k.id===t.chartTimeBucket,N=k.id==="quarter_hour"?"15-minute detail would be too dense for this selected period":`${k.label} detail does not add useful resolution for this selected period`;return`
            <button
              class="unit-btn chart-bucket-btn ${W?"active":""}"
              data-chart-bucket="${k.id}"
              title="${E?`Show ${k.label.toLowerCase()} detail`:N}"
              ${E?"":'disabled aria-disabled="true"'}
            >${k.label}</button>
          `}).join(""),Ne=t.chartUnit==="kw"?"kW uses the same detail presets as kWh, but keeps power values in interval bars so short spikes and dips stay visible.":"kWh keeps the aggregated period bars for totals.",et=`${t.chartConsumptionView==="house"?"Total Usage shows the full house load, with the solar-covered share highlighted in green and exports below zero. Use the detail presets and arrows above the graph to move through time.":t.chartConsumptionView==="solar_systems"?"PV Systems stacks each configured solar production meter so you can compare panel-system output like the Home Assistant Energy dashboard.":"Net Grid focuses on what still came from the grid after solar, with exports shown below zero. The reference limit in kW mode applies here."} ${Ne}`,Oe=((e==null?void 0:e.exceedance_kwh)??0)>0?de("warning"):de("ok");return`
    <div class="dashboard" style="position: relative;">
      <div style="position:fixed;bottom:4px;right:4px;font-size:10px;opacity:0.5;pointer-events:none;z-index:9999;">v:2.9.0</div>

      <!-- Range Selector -->
      <div class="range-selector">
        ${Ke.map(k=>`
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
      `:c&&g?`
      <!-- Preset Period Preview -->
      <div class="custom-range-picker period-preview">
        <span class="period-preview-label">Viewed period</span>
        <label>
          <span>From</span>
          <input type="date" value="${c}" readonly aria-label="Preset period start" />
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
            <div class="stat-value">${h(s)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card production">
          <div class="stat-icon">${de("production")}</div>
          <div class="stat-body">
            <div class="stat-label">Production</div>
            <div class="stat-value">${h(r)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.export">
          <div class="stat-icon">${de("export")}</div>
          <div class="stat-body">
            <div class="stat-label">Exported</div>
            <div class="stat-value">${h(o)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.self-consumed">
          <div class="stat-icon">${de("self_consumed")}</div>
          <div class="stat-body">
            <div class="stat-label">Self-Consumed</div>
            <div class="stat-value">${h(x)} <span class="stat-unit">kWh</span></div>
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
                    <span class="module-value highlight-red">${h(s)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg red"></div></div>
              </div>

              <div class="glass-module production-module">
                <div class="module-info">
                  <span class="module-label">Solar Production <span class="info-icon">ⓘ</span></span>
                  <div class="module-value-row">
                    <span class="module-value highlight-green">${h(r)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg green"></div></div>
              </div>
            </div>

            <div class="flow-scene-summary">
              <span class="flow-scene-chip solar">Self-sufficient ${h(d,0)}%</span>
              <span class="flow-scene-chip import">Grid import ${h(l)} kWh</span>
              <span class="flow-scene-chip export">Export ${h(y)} kWh</span>
              <span class="flow-scene-chip community">Community ${h(w)} kWh</span>
              ${p>0?`<span class="flow-scene-chip neutral">Peak ${h(p,2)} kW</span>`:""}
            </div>

            <p class="flow-scene-caption">
              Thicker paths show larger energy volumes for the selected period. Green flows stay in the home, red flows come from the grid, blue flows leave the home or community, and amber shows gas.
            </p>

            ${he()}
            ${ee()}

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${h(b)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${h(d,0)}% solar supplied${p>0?` · Peak ${h(p,2)} kW`:""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${h($)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${z($)}%;"></span></div>
                  <p>Energy used inside the house${m>0?", including received community energy":""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${h(l)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${z(l)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${h(y)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${z(y)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${h(w)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${z(w)}%;"></span></div>
                  <p>Sent ${h(_)} kWh · received ${h(m)} kWh.</p>
                </div>
                ${M?`
                <div class="mobile-flow-item gas">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Gas to house</span>
                    <strong>${h(i)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${z(D||v)}%;"></span></div>
                  <p>${u>0?`${h(u)} m3 measured for the same period.`:"Gas meter is configured for this home."}</p>
                </div>
                `:""}
              </div>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${h($)} kWh directly supplied inside the house</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${h(l)} kWh still needed from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${h(y)} kWh sent back to the market or grid</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${h(_)} kWh sent · ${h(m)} kWh received${m>0?" (included in solar to home)":""}</span>
                </span>
              </div>
              ${M?`
              <div class="flow-legend-item gas">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Gas to house</strong>
                  <span>${h(i)} kWh${u>0?` / ${h(u)} m3`:""}</span>
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
              <span class="metric-label">Self-Sufficiency</span>
              <span class="metric-value">${h(d,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${d}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Consumed</span>
              <span class="metric-value">${h(x)} kWh</span>
            </div>
          </div>
          ${p>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${h(p,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label"><span class="metric-status-icon">${Oe}</span> Exceedance</span>
              <span class="metric-value">${h((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${i>0||u>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${h(i)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${h(u)} m³</span>
            </div>
          </div>
          `:""}
        </div>
      </div>
      </div>

      <!-- Chart -->
      <div class="card chart-card">
        <div class="chart-header">
          <h3 class="card-title"><span class="title-icon">${de("profile")}</span> Energy Profile — ${Le}</h3>
          <div class="chart-period-status">
            <span class="chart-period-kicker">Showing</span>
            <strong>${ge}</strong>
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
              <span class="chart-period-pill">${ge}</span>
              <button
                class="chart-nav-btn"
                data-chart-period-nav="next"
                title="Next ${le.stepLabel}"
                aria-label="Next ${le.stepLabel}"
                ${Qe?'disabled aria-disabled="true"':""}
              >&rarr;</button>
            </div>

            <div class="chart-bucket-toggle" aria-label="Chart detail presets">
              ${He}
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
          ${et}
        </p>
      </div>

      </div>

      </div>
    </section>
  `}const $t=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],Pe={house:"Total Usage",grid:"Net Grid",solar:"Solar Production",exceedance_kwh:"Exceedance kWh",exceedance_frequency:"Exceedance Rate"},qe={house:"Total Usage",grid:"Net Grid",solar:"Solar Production"},Te={previous:"Previous Period",last_year:"Last Year"};function _t(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function ka(t){const e=new Date(t),a=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${a}-${s}-${r}`}function Ma(t){const[e,a,s]=t.split("-").map(Number);return new Date(e,a-1,s,12,0,0,0)}function ne(t,e=0){return t.length?Math.max(...t):e}function ut(t,e=0){return t.length?Math.min(...t):e}function Nt(t,e,a){return Math.min(a,Math.max(e,t))}function G(t,e){if(!t.length)return 0;const a=[...t].sort((u,p)=>u-p),s=Nt(e,0,1),r=(a.length-1)*s,o=Math.floor(r),n=Math.ceil(r);if(o===n)return a[o];const i=r-o;return a[o]*(1-i)+a[n]*i}function Ca(t){const e=Math.floor(t/4),a=t%4*15;return`${String(e).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function O(t,e){return`${h(t,2)} ${e}`}function Ze(t,e){return`${t>0?"+":t<0?"-":""}${h(Math.abs(t),2)} ${e}`}function Ye(t,e=1){return Math.abs(t)<.005?"0":`${t>0?"+":""}${h(t,e)}`}function xt(t){const[e,a]=t.split(":").map(s=>parseInt(s,10)||0);return e*60+a}function Sa(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function Ot(t,e,a,s){if(!Sa(t.getDay(),e))return!1;const r=t.getHours()*60+t.getMinutes(),o=xt(a),n=xt(s);return o===n?!0:o<n?r>=o&&r<n:r>=o||r<n}function Da(t,e){return e.find(a=>Ot(t,a.day_group,a.start_time,a.end_time))}function Ta(t,e){return e.find(a=>Ot(t,a.day_group,a.start_time,a.end_time))}function Ea(t){const e=(t.meters??[]).filter(r=>r.types.includes("production")),a=t.feed_in_rates??[];if(!e.length)return t.feed_in_tariff??0;const s=e.map(r=>{const o=a.find(i=>i.meter_id===r.id);return o?o.mode==="sensor"&&o.sensor_value!=null&&Number.isFinite(o.sensor_value)?o.sensor_value??0:Number.isFinite(o.tariff)?o.tariff:t.feed_in_tariff??0:t.feed_in_tariff??0}).filter(r=>Number.isFinite(r)&&r>=0);return s.length?s.reduce((r,o)=>r+o,0)/s.length:t.feed_in_tariff??0}function La(t,e,a){const s=new Map;for(const p of t.items){const c=new Date(p.startedAt).getTime();if(!Number.isFinite(c))continue;const g=s.get(c)??{houseKw:0,solarKw:0,iso:p.startedAt};g.houseKw+=Math.max(0,Number(p.value)||0),g.iso=p.startedAt,s.set(c,g)}for(const p of e.items){const c=new Date(p.startedAt).getTime();if(!Number.isFinite(c))continue;const g=s.get(c)??{houseKw:0,solarKw:0,iso:p.startedAt};g.solarKw+=Math.max(0,Number(p.value)||0),g.iso=g.iso||p.startedAt,s.set(c,g)}const r=a.consumption_rate_windows??[],o=a.reference_power_windows??[],n=a.reference_power_kw??0,i=Ea(a),u=(a.exceedance_rate??0)*(1+(a.vat_rate??0));return[...s.entries()].sort((p,c)=>p[0]-c[0]).map(([p,c])=>{var v,D;const g=new Date(p),m=Math.max(0,c.houseKw),_=Math.max(0,c.solarKw),y=Math.max(0,Math.min(m,_)),$=Math.max(0,m-y),C=Math.max(0,_-y),x=((v=Ta(g,o))==null?void 0:v.reference_power_kw)??n,l=Math.max(0,m-x),b=Math.max(0,$-x),M=Math.max(0,l-b),d=((((D=Da(g,r))==null?void 0:D.rate)??a.energy_variable_rate??0)+(a.network_variable_rate??0)+(a.electricity_tax_rate??0)+(a.compensation_fund_rate??0))*(1+(a.vat_rate??0));return{timestamp:p,iso:c.iso,date:g,houseKw:m,solarKw:_,solarToHomeKw:y,gridKw:$,exportKw:C,referenceKw:x,overKw:b,avoidedOverKw:M,importRateWithVat:d,feedInRate:i,exceedanceRateWithVat:u}})}function Gt(t,e,a){const s=La(t,e,a),r=new Map,o=Array.from({length:24},()=>0),n=Array.from({length:24},(l,b)=>({label:`${String(b).padStart(2,"0")}:00`,importCost:0,exportSpreadValue:0,gridKwh:0,exportKwh:0})),i={house:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),grid:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),solar:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_kwh:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_frequency:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0})))},u=()=>Array.from({length:96},()=>[]),p={house:{weekday:u(),weekend:u()},grid:{weekday:u(),weekend:u()},solar:{weekday:u(),weekend:u()}},c={houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0};for(const l of s){const M=ka(l.timestamp),w=r.get(M)??(()=>{const H=Ma(M);return{key:M,label:H.toLocaleDateString(void 0,{month:"short",day:"numeric"}),fullDate:H.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0}})(),d=l.houseKw*.25,v=l.solarKw*.25,D=l.solarToHomeKw*.25,L=l.gridKw*.25,T=l.exportKw*.25,F=l.overKw*.25,K=l.avoidedOverKw*.25,I=L*l.importRateWithVat,q=D*l.importRateWithVat,oe=T*l.feedInRate,z=D*(l.importRateWithVat-l.feedInRate),se=F*l.exceedanceRateWithVat,Y=K*l.exceedanceRateWithVat,ue=q+oe+Y-I-se;w.houseKwh+=d,w.solarKwh+=v,w.solarToHomeKwh+=D,w.gridKwh+=L,w.exportKwh+=T,w.exceedanceKwh+=F,w.avoidedExceedanceKwh+=K,w.importCost+=I,w.solarSavings+=q,w.exportRevenue+=oe,w.selfConsumptionAdvantage+=z,w.exceedanceCost+=se,w.avoidedExceedanceValue+=Y,w.netValue+=ue,w.peakGridKw=Math.max(w.peakGridKw,l.gridKw),w.peakHouseKw=Math.max(w.peakHouseKw,l.houseKw),w.exceedanceIntervals+=l.overKw>0?1:0,r.set(M,w),c.houseKwh+=d,c.solarKwh+=v,c.solarToHomeKwh+=D,c.gridKwh+=L,c.exportKwh+=T,c.exceedanceKwh+=F,c.avoidedExceedanceKwh+=K,c.importCost+=I,c.solarSavings+=q,c.exportRevenue+=oe,c.selfConsumptionAdvantage+=z,c.exceedanceCost+=se,c.avoidedExceedanceValue+=Y,c.netValue+=ue,c.peakGridKw=Math.max(c.peakGridKw,l.gridKw),c.peakHouseKw=Math.max(c.peakHouseKw,l.houseKw),c.exceedanceIntervals+=l.overKw>0?1:0;const B=(l.date.getDay()+6)%7,R=l.date.getHours(),Q=R*4+Math.floor(l.date.getMinutes()/15),ie=l.date.getDay()===0||l.date.getDay()===6?"weekend":"weekday";i.house[B][R].sum+=l.houseKw,i.house[B][R].count+=1,i.grid[B][R].sum+=l.gridKw,i.grid[B][R].count+=1,i.solar[B][R].sum+=l.solarKw,i.solar[B][R].count+=1,i.exceedance_kwh[B][R].sum+=F,i.exceedance_kwh[B][R].count+=1,i.exceedance_frequency[B][R].sum+=l.overKw>0?1:0,i.exceedance_frequency[B][R].count+=1,o[R]+=F,p.house[ie][Q].push(l.houseKw),p.grid[ie][Q].push(l.gridKw),p.solar[ie][Q].push(l.solarKw),n[R].importCost+=I,n[R].exportSpreadValue+=T*Math.max(l.importRateWithVat-l.feedInRate,0),n[R].gridKwh+=L,n[R].exportKwh+=T}const g=[...r.values()].sort((l,b)=>l.key.localeCompare(b.key)).map(l=>(l.coveragePct=l.houseKwh>0?l.solarToHomeKwh/l.houseKwh*100:0,l.selfConsumedPct=l.solarKwh>0?l.solarToHomeKwh/l.solarKwh*100:0,l.solarValue=l.solarSavings+l.exportRevenue+l.avoidedExceedanceValue,l));c.coveragePct=c.houseKwh>0?c.solarToHomeKwh/c.houseKwh*100:0,c.selfConsumedPct=c.solarKwh>0?c.solarToHomeKwh/c.solarKwh*100:0,c.solarValue=c.solarSavings+c.exportRevenue+c.avoidedExceedanceValue;const m={house:i.house.map(l=>l.map(b=>b.count?b.sum/b.count:0)),grid:i.grid.map(l=>l.map(b=>b.count?b.sum/b.count:0)),solar:i.solar.map(l=>l.map(b=>b.count?b.sum/b.count:0)),exceedance_kwh:i.exceedance_kwh.map(l=>l.map(b=>b.sum)),exceedance_frequency:i.exceedance_frequency.map(l=>l.map(b=>b.count?b.sum/b.count*100:0))},_=Array.from({length:96},(l,b)=>Ca(b)),y={house:{weekday:{lower:p.house.weekday.map(l=>G(l,.1)),median:p.house.weekday.map(l=>G(l,.5)),upper:p.house.weekday.map(l=>G(l,.9))},weekend:{lower:p.house.weekend.map(l=>G(l,.1)),median:p.house.weekend.map(l=>G(l,.5)),upper:p.house.weekend.map(l=>G(l,.9))}},grid:{weekday:{lower:p.grid.weekday.map(l=>G(l,.1)),median:p.grid.weekday.map(l=>G(l,.5)),upper:p.grid.weekday.map(l=>G(l,.9))},weekend:{lower:p.grid.weekend.map(l=>G(l,.1)),median:p.grid.weekend.map(l=>G(l,.5)),upper:p.grid.weekend.map(l=>G(l,.9))}},solar:{weekday:{lower:p.solar.weekday.map(l=>G(l,.1)),median:p.solar.weekday.map(l=>G(l,.5)),upper:p.solar.weekday.map(l=>G(l,.9))},weekend:{lower:p.solar.weekend.map(l=>G(l,.1)),median:p.solar.weekend.map(l=>G(l,.5)),upper:p.solar.weekend.map(l=>G(l,.9))}}},$=s.filter(l=>l.overKw>0).sort((l,b)=>b.overKw-l.overKw||b.timestamp-l.timestamp).slice(0,8),C=[...s].sort((l,b)=>b.houseKw-l.houseKw||b.timestamp-l.timestamp).slice(0,8),x=[...g].filter(l=>l.exceedanceKwh>0).sort((l,b)=>b.exceedanceKwh-l.exceedanceKwh).slice(0,6);return{points:s,daily:g,totals:c,topExceedances:$,peakIntervals:C,hourlyExceedanceKwh:o,heatmapValues:m,intradayProfiles:y,intradayLabels:_,hourlyOpportunity:n,loadDurationGrossKw:s.map(l=>l.houseKw).sort((l,b)=>b-l),loadDurationNetKw:s.map(l=>l.gridKw).sort((l,b)=>b-l),worstDays:x}}function Wa(t){var e,a,s;return(e=t.rangeData)!=null&&e.start&&((a=t.rangeData)!=null&&a.end)?`${we(t.rangeData.start)} - ${we(t.rangeData.end)}`:((s=Ke.find(r=>r.id===t.range))==null?void 0:s.label)??"Selected Period"}function Pa(t){var e,a;return(e=t.rangeData)!=null&&e.start&&((a=t.rangeData)!=null&&a.end)?`${Ee(t.rangeData.start)} - ${Ee(t.rangeData.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${t.customStart} - ${t.customEnd}`:"Based on the currently selected range."}function kt(t){const e=t.analysisComparisonMode==="last_year"?"Same period last year":"Previous matched period";return t.analysisComparison?`${e}: ${Ee(t.analysisComparison.start)} - ${Ee(t.analysisComparison.end)}`:e}function Fa(t){switch(t){case"house":return{description:"Average hourly power by weekday for total house usage.",note:"Each cell shows the average kW seen in that weekday/hour slot over the selected period."};case"grid":return{description:"Average hourly power by weekday for remaining grid draw after solar.",note:"Each cell shows the average net-grid kW seen in that weekday/hour slot over the selected period."};case"solar":return{description:"Average hourly power by weekday for solar production.",note:"Each cell shows the average solar kW seen in that weekday/hour slot over the selected period."};case"exceedance_kwh":return{description:"Cumulative exceedance energy by weekday and hour, showing where the reference limit hurt the most.",note:"Each cell shows cumulative exceedance kWh recorded in that weekday/hour slot over the selected period."};case"exceedance_frequency":return{description:"How often each weekday/hour slot went over the reference limit.",note:"Each cell shows the share of 15-minute intervals in that weekday/hour slot that exceeded the reference limit."}}}function Va(t,e){switch(t){case"house":case"grid":case"solar":return`${h(e,2)} kW average`;case"exceedance_kwh":return`${h(e,2)} kWh`;case"exceedance_frequency":return`${h(e,0)}% of intervals`}}function pe(t){const e=t.series.filter(v=>v.values.length>0);if(!e.length)return'<div class="analysis-empty">No chart data available for this period.</div>';const a=Math.max(...e.map(v=>v.values.length)),s=Math.max(720,a*24+92),r=244,o=50,n=20,i=18,u=30,p=e.flatMap(v=>v.values);t.referenceValue!=null&&p.push(t.referenceValue);let c=t.minValue??ut(p,0),g=t.maxValue??ne(p,1);c===g&&(g+=1,c=Math.min(0,c-1)),t.minValue==null&&(c=Math.min(0,c));const m=s-o-n,_=r-i-u,y=(v,D)=>D<=1?o+m/2:o+v*m/(D-1),$=v=>i+(g-v)/(g-c)*_,C=t.valueFormatter??(v=>h(v,1)),x=Array.from({length:4},(v,D)=>c+(g-c)/3*D),l=[0,Math.floor((a-1)/2),a-1].filter((v,D,L)=>L.indexOf(v)===D),b=x.map(v=>{const D=$(v);return`
      <line x1="${o}" y1="${D.toFixed(1)}" x2="${(s-n).toFixed(1)}" y2="${D.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(D+4).toFixed(1)}" class="analysis-svg-tick">${C(v)}</text>
    `}).join(""),M=t.referenceValue!=null?(()=>{const v=$(t.referenceValue);return`
        <line x1="${o}" y1="${v.toFixed(1)}" x2="${(s-n).toFixed(1)}" y2="${v.toFixed(1)}" class="analysis-svg-reference" />
        ${t.referenceLabel?`<text x="${s-n}" y="${(v-8).toFixed(1)}" class="analysis-svg-reference-label">${t.referenceLabel}</text>`:""}
      `})():"",w=e.map(v=>{const D=v.values.map((T,F)=>{const K=y(F,v.values.length),I=$(T);return`${F===0?"M":"L"} ${K.toFixed(1)} ${I.toFixed(1)}`}).join(" "),L=v.values.length<=40?v.values.map((T,F)=>{const K=y(F,v.values.length),I=$(T);return`<circle cx="${K.toFixed(1)}" cy="${I.toFixed(1)}" r="2.6" fill="${v.color}" />`}).join(""):"";return`
      <path d="${D}" fill="none" stroke="${v.color}" stroke-width="2.5" ${v.dashed?'stroke-dasharray="6 4"':""} />
      ${L}
    `}).join(""),d=l.map(v=>{const D=y(v,a),L=t.labels[v]??`Point ${v+1}`;return`<text x="${D.toFixed(1)}" y="${r-8}" text-anchor="middle" class="analysis-svg-x-label">${L}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${s}" height="${r}" viewBox="0 0 ${s} ${r}" role="img" aria-label="${t.title??"Line chart"}">
        ${b}
        ${M}
        ${w}
        ${d}
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
  `}function Ra(t){const e=t.series.filter(d=>d.band.median.length>0);if(!e.length)return'<div class="analysis-empty">No profile data available for this period.</div>';const a=Math.max(...e.map(d=>d.band.median.length)),s=Math.max(760,a*12+92),r=248,o=50,n=20,i=18,u=30,p=e.flatMap(d=>[...d.band.lower,...d.band.median,...d.band.upper]),c=Math.min(0,ut(p,0));let g=ne(p,1);g<=c&&(g=c+1);const m=s-o-n,_=r-i-u,y=(d,v)=>v<=1?o+m/2:o+d*m/(v-1),$=d=>i+(g-d)/(g-c)*_,C=t.valueFormatter??(d=>h(d,1)),x=Array.from({length:4},(d,v)=>c+(g-c)/3*v),l=[0,16,32,48,64,80,a-1].filter((d,v,D)=>d>=0&&d<a&&D.indexOf(d)===v),b=x.map(d=>{const v=$(d);return`
      <line x1="${o}" y1="${v.toFixed(1)}" x2="${(s-n).toFixed(1)}" y2="${v.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(v+4).toFixed(1)}" class="analysis-svg-tick">${C(d)}</text>
    `}).join(""),M=e.map(d=>{const v=d.band.upper.map((T,F)=>{const K=y(F,d.band.upper.length),I=$(T);return`${F===0?"M":"L"} ${K.toFixed(1)} ${I.toFixed(1)}`}).join(" "),D=[...d.band.lower].reverse().map((T,F)=>{const K=d.band.lower.length-1-F,I=y(K,d.band.lower.length),q=$(T);return`L ${I.toFixed(1)} ${q.toFixed(1)}`}).join(" "),L=d.band.median.map((T,F)=>{const K=y(F,d.band.median.length),I=$(T);return`${F===0?"M":"L"} ${K.toFixed(1)} ${I.toFixed(1)}`}).join(" ");return`
      <path d="${v} ${D} Z" fill="${d.fill}" stroke="none" />
      <path d="${L}" fill="none" stroke="${d.color}" stroke-width="2.4" ${d.dashed?'stroke-dasharray="6 4"':""} />
    `}).join(""),w=l.map(d=>{const v=y(d,a),D=t.labels[d]??`Point ${d+1}`;return`<text x="${v.toFixed(1)}" y="${r-8}" text-anchor="middle" class="analysis-svg-x-label">${D}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${s}" height="${r}" viewBox="0 0 ${s} ${r}" role="img" aria-label="${t.title??"Band chart"}">
        ${b}
        ${M}
        ${w}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      ${e.map(d=>`
        <span class="analysis-legend-item">
          <span class="analysis-legend-swatch" style="background:${d.color};"></span>
          <span>${d.label}</span>
        </span>
      `).join("")}
    </div>
  `}function Ka(t){const e=new Date(t.timestamp);return{date:e.toLocaleDateString(void 0,{month:"short",day:"numeric"}),time:e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}}function Ia(t){if(!t.length)return'<div class="analysis-empty">No peak intervals available for this period.</div>';const e=Math.max(760,t.length*86+96),a=276,s=52,r=16,o=18,n=54,i=ne(t.map($=>$.houseKw),1),u=e-s-r,p=a-o-n,c=o+p,g=u/t.length,m=Math.max(22,Math.min(38,g*.54)),_=t.map(($,C)=>{const x=s+C*g+(g-m)/2,l=$.solarToHomeKw/i*p,M=Math.max(0,Math.min($.gridKw,$.referenceKw))/i*p,w=Math.max(0,$.gridKw-$.referenceKw)/i*p;return`
      <g>
        <rect x="${x.toFixed(1)}" y="${(c-l).toFixed(1)}" width="${m.toFixed(1)}" height="${l.toFixed(1)}" rx="4" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${x.toFixed(1)}" y="${(c-l-M).toFixed(1)}" width="${m.toFixed(1)}" height="${M.toFixed(1)}" rx="4" fill="rgba(248, 81, 73, 0.62)" />
        ${w>0?`<rect x="${x.toFixed(1)}" y="${(c-l-M-w).toFixed(1)}" width="${m.toFixed(1)}" height="${w.toFixed(1)}" rx="4" fill="rgba(210, 153, 34, 0.92)" />`:""}
      </g>
    `}).join(""),y=t.map(($,C)=>{const x=s+C*g+g/2,{date:l,time:b}=Ka($);return`
      <text x="${x.toFixed(1)}" y="${a-20}" text-anchor="middle" class="analysis-svg-x-label">
        <tspan x="${x.toFixed(1)}" dy="0">${l}</tspan>
        <tspan x="${x.toFixed(1)}" dy="12">${b}</tspan>
      </text>
    `}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${a}" viewBox="0 0 ${e} ${a}" role="img" aria-label="Peak interval anatomy">
        <line x1="${s}" y1="${c.toFixed(1)}" x2="${(e-r).toFixed(1)}" y2="${c.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${s-8}" y="${(o+4).toFixed(1)}" class="analysis-svg-tick">${h(i,1)} kW</text>
        ${_}
        ${y}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.62);"></span><span>Grid within reference</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(210, 153, 34, 0.92);"></span><span>Grid over reference</span></span>
    </div>
  `}function Aa(t){if(!t.length)return'<div class="analysis-empty">No daily energy data available.</div>';const e=Math.max(760,t.length*28+84),a=250,s=52,r=16,o=18,n=34,i=ne(t.map(b=>b.houseKwh),1),u=ne(t.map(b=>b.exportKwh),0),p=e-s-r,c=a-o-n,g=u>0?c*.72:c,m=u>0?c-g:0,_=o+g,y=p/t.length,$=Math.max(8,Math.min(18,y*.62)),C=Math.max(1,Math.ceil(t.length/10)),x=t.map((b,M)=>{const w=s+M*y+(y-$)/2,d=b.solarToHomeKwh/i*g,v=b.gridKwh/i*g,D=u>0?b.exportKwh/u*m:0,L=_-d-v-8;return`
      <g>
        <rect x="${w.toFixed(1)}" y="${(_-d).toFixed(1)}" width="${$.toFixed(1)}" height="${d.toFixed(1)}" rx="3" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${w.toFixed(1)}" y="${(_-d-v).toFixed(1)}" width="${$.toFixed(1)}" height="${v.toFixed(1)}" rx="3" fill="rgba(248, 81, 73, 0.55)" />
        ${D>0?`<rect x="${w.toFixed(1)}" y="${_.toFixed(1)}" width="${$.toFixed(1)}" height="${D.toFixed(1)}" rx="3" fill="rgba(88, 166, 255, 0.75)" />`:""}
        ${b.exceedanceKwh>0?`<circle cx="${(w+$/2).toFixed(1)}" cy="${L.toFixed(1)}" r="3.2" fill="#d29922" />`:""}
      </g>
    `}).join(""),l=t.map((b,M)=>M%C!==0&&M!==t.length-1?"":`<text x="${(s+M*y+y/2).toFixed(1)}" y="${a-10}" text-anchor="middle" class="analysis-svg-x-label">${b.label}</text>`).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${a}" viewBox="0 0 ${e} ${a}" role="img" aria-label="Daily energy breakdown">
        <line x1="${s}" y1="${_.toFixed(1)}" x2="${(e-r).toFixed(1)}" y2="${_.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${s-8}" y="${(o+4).toFixed(1)}" class="analysis-svg-tick">${h(i,0)} kWh</text>
        ${u>0?`<text x="${s-8}" y="${(a-n+4).toFixed(1)}" class="analysis-svg-tick">-${h(u,0)} kWh</text>`:""}
        ${x}
        ${l}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.55);"></span><span>From grid</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span><span>Exported</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:#d29922;"></span><span>Exceedance on that day</span></span>
    </div>
  `}function Ha(t,e){const a=Nt(e,0,1);return t==="solar"?`rgba(63, 185, 80, ${.12+a*.82})`:t==="exceedance_kwh"||t==="exceedance_frequency"?`rgba(210, 153, 34, ${.14+a*.82})`:t==="grid"?`rgba(210, 153, 34, ${.12+a*.82})`:`rgba(248, 81, 73, ${.12+a*.82})`}function Na(t,e){const a=t.flat(),s=ne(a,1),r=ut(a,0);return`
    <div class="analysis-heatmap">
      <div class="analysis-heatmap-hours">
        <span class="analysis-heatmap-corner"></span>
        ${Array.from({length:24},(o,n)=>`
          <span class="analysis-heatmap-hour ${n%2===1?"analysis-heatmap-hour-faded":""}">${String(n).padStart(2,"0")}</span>
        `).join("")}
      </div>
      ${t.map((o,n)=>`
        <div class="analysis-heatmap-row">
          <span class="analysis-heatmap-day">${$t[n]}</span>
          ${o.map((i,u)=>{const p=s===r?0:(i-r)/(s-r);return`
              <span
                class="analysis-heatmap-cell"
                style="background:${Ha(e,p)};"
                title="${$t[n]} ${String(u).padStart(2,"0")}:00 - ${Va(e,i)}"
              >${i>(e==="exceedance_frequency"?1:.05)?h(i,e==="exceedance_frequency"?0:1):""}</span>
            `}).join("")}
        </div>
      `).join("")}
    </div>
  `}function Je(t){const e=ne(t.map(a=>a.value),1);return t.length?`
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
  `:'<div class="analysis-empty">No standout patterns in this period.</div>'}function Oa(t){var s,r,o,n;const e=_t(((s=t.rangeData)==null?void 0:s.start)??t.customStart),a=_t(((r=t.rangeData)==null?void 0:r.end)??t.customEnd);return`
    <div class="range-selector">
      ${Ke.map(i=>`
        <button
          class="range-btn ${i.id===t.range?"active":""}"
          data-range="${i.id}"
        >${i.label}</button>
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
  `}function Ga(t,e){return`
    <div class="analysis-stat-grid">
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Solar Coverage</span>
        <strong class="analysis-stat-value">${h(t.totals.coveragePct,1)}%</strong>
        <span class="analysis-stat-meta">${h(t.totals.solarToHomeKwh)} kWh of ${h(t.totals.houseKwh)} kWh usage</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Consumed Solar</span>
        <strong class="analysis-stat-value">${h(t.totals.selfConsumedPct,1)}%</strong>
        <span class="analysis-stat-meta">${h(t.totals.solarToHomeKwh)} kWh kept at home, ${h(t.totals.exportKwh)} kWh exported</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Total Solar Value</span>
        <strong class="analysis-stat-value">${O(t.totals.solarValue,e)}</strong>
        <span class="analysis-stat-meta">Savings plus export revenue plus avoided exceedance charges</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Use vs Export</span>
        <strong class="analysis-stat-value">${Ze(t.totals.selfConsumptionAdvantage,e)}</strong>
        <span class="analysis-stat-meta">${h(t.totals.solarToHomeKwh)} kWh kept on-site instead of exported</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Peak Net Grid</span>
        <strong class="analysis-stat-value">${h(t.totals.peakGridKw,2)} kW</strong>
        <span class="analysis-stat-meta">Compared with ${h(t.totals.peakHouseKw,2)} kW gross house load</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Exceedance Intervals</span>
        <strong class="analysis-stat-value">${h(t.totals.exceedanceIntervals,0)}</strong>
        <span class="analysis-stat-meta">${h(t.totals.exceedanceKwh,2)} kWh above the reference limit</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Variable Import Cost</span>
        <strong class="analysis-stat-value">${O(t.totals.importCost,e)}</strong>
        <span class="analysis-stat-meta">Energy-only import charges from the selected period</span>
      </div>
    </div>
  `}function Ua(t){return`
    <div class="card analysis-card analysis-card-full">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Daily Breakdown</h3>
          <p class="analysis-card-copy">House usage is split into solar-covered energy, grid energy, and exported surplus. A gold marker flags days with any reference-power exceedance.</p>
        </div>
      </div>
      ${Aa(t.daily)}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily exceedance volume</h4>
        ${pe({title:"Daily exceedance volume",series:[{label:"Exceedance",color:"#d29922",values:t.daily.map(e=>e.exceedanceKwh)}],labels:t.daily.map(e=>e.label),valueFormatter:e=>`${h(e,2)} kWh`})}
      </div>
    </div>
  `}function Ba(t,e){const a=Fa(t.analysisHeatmapMetric);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Consumption Pattern Heatmap</h3>
          <p class="analysis-card-copy">${a.description}</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${t.analysisHeatmapMetric==="house"?"active":""}" data-analysis-heatmap="house">${Pe.house}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="grid"?"active":""}" data-analysis-heatmap="grid">${Pe.grid}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="solar"?"active":""}" data-analysis-heatmap="solar">${Pe.solar}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="exceedance_kwh"?"active":""}" data-analysis-heatmap="exceedance_kwh">${Pe.exceedance_kwh}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="exceedance_frequency"?"active":""}" data-analysis-heatmap="exceedance_frequency">${Pe.exceedance_frequency}</button>
        </div>
      </div>
      ${Na(e.heatmapValues[t.analysisHeatmapMetric],t.analysisHeatmapMetric)}
      <p class="analysis-note">${a.note}</p>
    </div>
  `}function qa(t,e){const a=t.analysisProfileMetric,s=e.intradayProfiles[a],r=qe[a],o=s.weekday.median.reduce((i,u,p,c)=>u>c[i]?p:i,0),n=s.weekend.median.reduce((i,u,p,c)=>u>c[i]?p:i,0);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Intraday Profile</h3>
          <p class="analysis-card-copy">A typical day view for ${r.toLowerCase()}, split between weekdays and weekends. The band shows the p10 to p90 range and the line is the median interval.</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${a==="house"?"active":""}" data-analysis-profile="house">${qe.house}</button>
          <button class="unit-btn ${a==="grid"?"active":""}" data-analysis-profile="grid">${qe.grid}</button>
          <button class="unit-btn ${a==="solar"?"active":""}" data-analysis-profile="solar">${qe.solar}</button>
        </div>
      </div>
      <div class="analysis-inline-metrics">
        <div>
          <span class="analysis-inline-label">Weekday median peak</span>
          <strong>${h(s.weekday.median[o]??0,2)} kW</strong>
          <span class="analysis-stat-meta">${e.intradayLabels[o]??"n/a"}</span>
        </div>
        <div>
          <span class="analysis-inline-label">Weekend median peak</span>
          <strong>${h(s.weekend.median[n]??0,2)} kW</strong>
          <span class="analysis-stat-meta">${e.intradayLabels[n]??"n/a"}</span>
        </div>
      </div>
      ${Ra({title:`${r} intraday profile`,labels:e.intradayLabels,series:[{label:"Weekday median (p10-p90 band)",color:"#58a6ff",fill:"rgba(88, 166, 255, 0.14)",band:s.weekday},{label:"Weekend median (p10-p90 band)",color:"#d29922",fill:"rgba(210, 153, 34, 0.13)",band:s.weekend,dashed:!0}],valueFormatter:i=>`${h(i,1)} kW`})}
      <p class="analysis-note">This makes the typical daily rhythm much easier to read than the weekday/hour heatmap alone.</p>
    </div>
  `}function Ya(t,e){const a=t.totals.solarKwh>0?t.totals.solarToHomeKwh/t.totals.solarKwh*100:0,s=t.totals.solarKwh>0?t.totals.exportKwh/t.totals.solarKwh*100:0;return`
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
          <strong>${h(t.totals.coveragePct,1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-consumed solar</span>
          <strong>${h(t.totals.selfConsumedPct,1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Solar value</span>
          <strong>${O(t.totals.solarValue,e)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-use vs export</span>
          <strong>${Ze(t.totals.selfConsumptionAdvantage,e)}</strong>
        </div>
      </div>
      <div class="analysis-share-bar">
        <span class="analysis-share-segment analysis-share-segment-home" style="width:${a}%;"></span>
        <span class="analysis-share-segment analysis-share-segment-export" style="width:${s}%;"></span>
      </div>
      <div class="analysis-share-legend">
        <span><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span>Self-consumed: ${h(t.totals.solarToHomeKwh)} kWh</span>
        <span><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span>Exported: ${h(t.totals.exportKwh)} kWh</span>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Coverage of house usage by day</h4>
        ${pe({title:"Daily solar coverage",series:[{label:"Coverage",color:"#3fb950",values:t.daily.map(r=>r.coveragePct)}],labels:t.daily.map(r=>r.label),maxValue:100,minValue:0,valueFormatter:r=>`${h(r,0)}%`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day</h4>
        ${pe({title:"Daily solar value",series:[{label:"Solar value",color:"#58a6ff",values:t.daily.map(r=>r.solarValue)}],labels:t.daily.map(r=>r.label),valueFormatter:r=>O(r,e)})}
      </div>
    </div>
  `}function ja(t,e){const a=[...t.hourlyOpportunity].sort((n,i)=>i.importCost-n.importCost)[0],s=[...t.hourlyOpportunity].sort((n,i)=>i.exportSpreadValue-n.exportSpreadValue)[0],r=[...t.hourlyOpportunity].filter(n=>n.importCost>0).sort((n,i)=>i.importCost-n.importCost).slice(0,5).map(n=>({label:n.label,value:n.importCost,meta:`${O(n.importCost,e)} from ${h(n.gridKwh,1)} kWh`})),o=[...t.hourlyOpportunity].filter(n=>n.exportSpreadValue>0).sort((n,i)=>i.exportSpreadValue-n.exportSpreadValue).slice(0,5).map(n=>({label:n.label,value:n.exportSpreadValue,meta:`${O(n.exportSpreadValue,e)} on ${h(n.exportKwh,1)} kWh`,colorClass:"analysis-progress-fill-warn"}));return`
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
          <strong>${O(t.hourlyOpportunity.reduce((n,i)=>n+i.importCost,0),e)}</strong>
          <span class="analysis-stat-meta">Variable import cost grouped by hour of day</span>
        </div>
        <div>
          <span class="analysis-inline-label">Export spread opportunity</span>
          <strong>${O(t.hourlyOpportunity.reduce((n,i)=>n+i.exportSpreadValue,0),e)}</strong>
          <span class="analysis-stat-meta">Approximate value gap between export and local use</span>
        </div>
        <div>
          <span class="analysis-inline-label">Hardest import hour</span>
          <strong>${(a==null?void 0:a.label)??"n/a"}</strong>
          <span class="analysis-stat-meta">${a?O(a.importCost,e):"No import cost recorded"}</span>
        </div>
        <div>
          <span class="analysis-inline-label">Best storage hour</span>
          <strong>${(s==null?void 0:s.label)??"n/a"}</strong>
          <span class="analysis-stat-meta">${s?O(s.exportSpreadValue,e):"No export spread recorded"}</span>
        </div>
      </div>
      ${pe({title:"Hourly tariff opportunity",series:[{label:"Import cost pressure",color:"#f85149",values:t.hourlyOpportunity.map(n=>n.importCost)},{label:"Export spread opportunity",color:"#58a6ff",values:t.hourlyOpportunity.map(n=>n.exportSpreadValue)}],labels:t.hourlyOpportunity.map(n=>n.label),valueFormatter:n=>O(n,e)})}
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Most expensive import hours</h4>
          ${Je(r)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Best export-to-storage hours</h4>
          ${Je(o)}
        </div>
      </div>
      <p class="analysis-note">Export spread opportunity uses the difference between the import rate and feed-in rate for exported energy in that hour, so it is a directional indicator rather than a billing line item.</p>
    </div>
  `}function za(t,e){const a=t.hourlyExceedanceKwh.map((s,r)=>({label:`${String(r).padStart(2,"0")}:00`,value:s,meta:`${h(s,2)} kWh`,colorClass:"analysis-progress-fill-warn"})).filter(s=>s.value>0).sort((s,r)=>r.value-s.value).slice(0,6);return`
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
          <strong>${h(t.totals.exceedanceIntervals,0)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Total exceedance</span>
          <strong>${h(t.totals.exceedanceKwh,2)} kWh</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Peak over reference</span>
          <strong>${h(ne(t.topExceedances.map(s=>s.overKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Exceedance cost</span>
          <strong>${O(t.totals.exceedanceCost,e)}</strong>
        </div>
      </div>
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Worst hours</h4>
          ${Je(a)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Worst days</h4>
          ${Je(t.worstDays.map(s=>({label:s.fullDate,value:s.exceedanceKwh,meta:`${h(s.exceedanceKwh,2)} kWh`,colorClass:"analysis-progress-fill-warn"})))}
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
                      <td>${It(s.iso)}</td>
                      <td>${h(s.gridKw,2)} kW</td>
                      <td>${h(s.referenceKw,2)} kW</td>
                      <td>${h(s.overKw,2)} kW</td>
                      <td>${h(s.solarKw,2)} kW</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `:'<div class="analysis-empty">No reference exceedance was recorded in this period.</div>'}
      </div>
    </div>
  `}function Xa(t){const e=t.peakIntervals.length?t.peakIntervals.reduce((a,s)=>a+(s.houseKw>0?s.solarToHomeKw/s.houseKw*100:0),0)/t.peakIntervals.length:0;return`
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
          <strong>${h(ne(t.peakIntervals.map(a=>a.houseKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Highest net-grid peak</span>
          <strong>${h(ne(t.peakIntervals.map(a=>a.gridKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Solar share across peaks</span>
          <strong>${h(e,0)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Intervals over reference</span>
          <strong>${h(t.peakIntervals.filter(a=>a.overKw>0).length,0)} / ${h(t.peakIntervals.length,0)}</strong>
        </div>
      </div>
      ${Ia(t.peakIntervals)}
      <p class="analysis-note">A gold cap only appears when the grid portion of the interval exceeded the configured reference power.</p>
    </div>
  `}function Za(t,e,a){var i,u;const s=e.analysisComparisonMode==="last_year"?"Last year":"Previous";if(e.analysisComparisonLoading)return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${kt(e)}</p>
          </div>
          <div class="chart-unit-toggle">
            <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${Te.previous}</button>
            <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${Te.last_year}</button>
          </div>
        </div>
        <div class="analysis-empty">Loading comparison period...</div>
      </div>
    `;if(!((i=e.analysisComparison)!=null&&i.consumptionTimeseries)||!((u=e.analysisComparison)!=null&&u.productionTimeseries))return`
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
    `;const r=Gt(e.analysisComparison.consumptionTimeseries,e.analysisComparison.productionTimeseries,a),o=Math.max(t.daily.length,r.daily.length,1),n=Array.from({length:o},(p,c)=>`D${c+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Period Comparison</h3>
          <p class="analysis-card-copy">${kt(e)}</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${Te.previous}</button>
          <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${Te.last_year}</button>
        </div>
      </div>
      <div class="analysis-compare-grid">
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">House usage</span>
          <strong>${h(t.totals.houseKwh)} kWh</strong>
          <span class="analysis-compare-delta">${Ye(t.totals.houseKwh-r.totals.houseKwh)} kWh vs ${s.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Net grid usage</span>
          <strong>${h(t.totals.gridKwh)} kWh</strong>
          <span class="analysis-compare-delta">${Ye(t.totals.gridKwh-r.totals.gridKwh)} kWh vs ${s.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar coverage</span>
          <strong>${h(t.totals.coveragePct,1)}%</strong>
          <span class="analysis-compare-delta">${Ye(t.totals.coveragePct-r.totals.coveragePct)} pts vs ${s.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar value</span>
          <strong>${O(t.totals.solarValue,a.currency||"EUR")}</strong>
          <span class="analysis-compare-delta">${Ye(t.totals.solarValue-r.totals.solarValue,2)} ${a.currency||"EUR"} vs ${s.toLowerCase()}</span>
        </div>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Usage by day index</h4>
        ${pe({title:`Current versus ${s.toLowerCase()} usage`,series:[{label:"Current",color:"#f85149",values:t.daily.map(p=>p.houseKwh)},{label:s,color:"#58a6ff",values:r.daily.map(p=>p.houseKwh),dashed:!0}],labels:n,valueFormatter:p=>`${h(p,1)} kWh`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day index</h4>
        ${pe({title:`Current versus ${s.toLowerCase()} solar value`,series:[{label:"Current",color:"#3fb950",values:t.daily.map(p=>p.solarValue)},{label:s,color:"#d29922",values:r.daily.map(p=>p.solarValue),dashed:!0}],labels:n,valueFormatter:p=>O(p,a.currency||"EUR")})}
      </div>
    </div>
  `}function Ja(t,e){return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Tariff-Aware Cost Trends</h3>
          <p class="analysis-card-copy">Estimated variable import cost, solar savings, export earnings, and exceedance cost by day. Fixed monthly fees are intentionally left out so this stays behavior-driven.</p>
        </div>
      </div>
      ${pe({title:"Daily cost and value trends",series:[{label:"Import cost",color:"#f85149",values:t.daily.map(a=>a.importCost)},{label:"Solar savings",color:"#3fb950",values:t.daily.map(a=>a.solarSavings)},{label:"Export earnings",color:"#58a6ff",values:t.daily.map(a=>a.exportRevenue)},{label:"Exceedance cost",color:"#d29922",values:t.daily.map(a=>a.exceedanceCost)}],labels:t.daily.map(a=>a.label),valueFormatter:a=>O(a,e)})}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily net energy value</h4>
        ${pe({title:"Daily net energy value",series:[{label:"Net value",color:"#39c5cf",values:t.daily.map(a=>a.netValue)}],labels:t.daily.map(a=>a.label),referenceValue:0,referenceLabel:"Break-even",valueFormatter:a=>Ze(a,e)})}
      </div>
      <div class="analysis-cost-totals">
        <span>Import cost: <strong>${O(t.totals.importCost,e)}</strong></span>
        <span>Solar savings: <strong>${O(t.totals.solarSavings,e)}</strong></span>
        <span>Export earnings: <strong>${O(t.totals.exportRevenue,e)}</strong></span>
        <span>Exceedance cost: <strong>${O(t.totals.exceedanceCost,e)}</strong></span>
        <span>Net value: <strong>${Ze(t.totals.netValue,e)}</strong></span>
      </div>
    </div>
  `}function Qa(t,e){const a=Array.from({length:Math.max(t.loadDurationGrossKw.length,t.loadDurationNetKw.length,1)},(s,r)=>`${r+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Load Duration Curve</h3>
          <p class="analysis-card-copy">Gross house load and net grid load sorted from highest to lowest interval. This shows how often high demand really occurs and how much solar trims the top end.</p>
        </div>
      </div>
      ${pe({title:"Load duration curve",series:[{label:"Gross house load",color:"#f85149",values:t.loadDurationGrossKw},{label:"Net grid load",color:"#58a6ff",values:t.loadDurationNetKw}],labels:a,referenceValue:e>0?e:void 0,referenceLabel:e>0?`Reference ${h(e,1)} kW`:void 0,valueFormatter:s=>`${h(s,1)} kW`})}
      <p class="analysis-note">Intervals are ordered from highest demand to lowest, so the left side is your hardest-to-handle load.</p>
    </div>
  `}function es(t){const e=t.config,a=t.rangeData,s=t.consumptionTimeseries,r=t.productionTimeseries;if(!e||!a||!s||!r)return`
      <section class="analysis-view">
        <div class="card">
          <p class="muted">Loading analysis data...</p>
        </div>
      </section>
    `;const o=Gt(s,r,e),n=e.currency||"EUR";return`
    <section class="analysis-view">
      <div class="section-header analysis-section-header">
        <div>
          <span class="badge">Analysis</span>
          <h2>Charts and Optimization</h2>
          <p class="muted">Deeper electricity analysis for ${Wa(t)}. This page is built from the same 15-minute data and billing settings that drive the dashboard and invoice.</p>
        </div>
        <div class="analysis-header-meta">
          <span>${Pa(t)}</span>
          <span>${h(o.daily.length,0)} day${o.daily.length===1?"":"s"} analysed</span>
        </div>
      </div>

      ${Oa(t)}
      ${Ga(o,n)}
      ${Ua(o)}

      <div class="analysis-grid">
        ${qa(t,o)}
        ${Ba(t,o)}
      </div>

      <div class="analysis-grid">
        ${Ya(o,n)}
        ${ja(o,n)}
      </div>

      <div class="analysis-grid">
        ${za(o,n)}
        ${Za(o,t,e)}
      </div>

      <div class="analysis-grid">
        ${Ja(o,n)}
        ${Qa(o,e.reference_power_kw??0)}
      </div>

      ${Xa(o)}
    </section>
  `}const Mt={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function ts(t){return Mt[t]?Mt[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function as(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],a=[],s=[],r=[],o=[];for(const i of t.sensors){const u=i.key;u.startsWith("c_")||u==="1-1:1.29.0"||u==="1-1:3.29.0"?e.push(i):u.startsWith("p_")||u==="1-1:2.29.0"||u==="1-1:4.29.0"?a.push(i):u.startsWith("s_")||u.startsWith("1-65:")?s.push(i):u.startsWith("g_")||u.startsWith("7-")?r.push(i):o.push(i)}const n=(i,u,p,c)=>p.length?`
      <div class="card sensor-group">
        <h3 class="card-title"><span class="title-icon">${u}</span> ${i} <span class="badge">${p.length}</span></h3>
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
              ${p.map(g=>`
                <tr>
                  <td class="sensor-name">${ts(g.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${c});">${h(g.value)}</td>
                  <td class="sensor-unit">${g.unit}</td>
                  <td class="sensor-peak">${g.peak_timestamp?It(g.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
  `}function nt(t,e){return Number.isFinite(t)?Number(t):e}function Ut(t){const e=(t.meters??[]).filter(r=>r.types.includes("production")),a=t.feed_in_rates??[],s=t.currency??"EUR";return e.map((r,o)=>{const n=a.find(c=>c.meter_id===r.id),i=(n==null?void 0:n.mode)==="sensor"&&n.sensor_value!=null&&Number.isFinite(n.sensor_value),u=i?(n==null?void 0:n.sensor_value)??0:nt(n==null?void 0:n.tariff,nt(t.feed_in_tariff,0)),p=Math.max(1,Math.round(nt(n==null?void 0:n.self_use_priority,o+1)));return{meterId:r.id,shortId:r.id?"…"+r.id.slice(-8):`Meter ${o+1}`,rate:u,label:i?`Sensor (${u.toFixed(4)} ${s}/kWh)`:"Fixed tariff",mode:(n==null?void 0:n.mode)??"fixed",selfUsePriority:p}}).sort((r,o)=>r.selfUsePriority!==o.selfUsePriority?r.selfUsePriority-o.selfUsePriority:r.meterId.localeCompare(o.meterId))}function ss(t,e,a,s,r){var w;if(!e||!(a!=null&&a.length))return null;const o=Ut(t);if(!o.length)return null;const n=new Map(a.map(d=>[d.meter_id,d]));if(!o.some(d=>n.has(d.meterId)))return null;const i=o.map(d=>({...d,producedKwh:0,selfConsumedKwh:0,exportedKwh:0,revenue:0,exportEquivalentForSelfUse:0})),u=new Map(i.map((d,v)=>[d.meterId,v])),p=new Map,c=new Set;for(const d of e.items)d.startedAt&&c.add(d.startedAt);const g=new Map;for(const d of e.items){const v=Math.max(0,Number(d.value)||0);g.set(d.startedAt,(g.get(d.startedAt)??0)+v)}for(const d of a){const v=new Map;for(const D of d.items??[]){const L=Math.max(0,Number(D.value)||0);v.set(D.startedAt,(v.get(D.startedAt)??0)+L),D.startedAt&&c.add(D.startedAt)}p.set(d.meter_id,v)}for(const d of[...c].sort()){let v=Math.max(0,g.get(d)??0);for(const D of i){const L=u.get(D.meterId);if(L==null)continue;const T=Math.max(0,((w=p.get(D.meterId))==null?void 0:w.get(d))??0),F=T*.25,K=Math.min(v,T),I=K*.25,q=Math.max(0,T-K)*.25;i[L].producedKwh+=F,i[L].selfConsumedKwh+=I,i[L].exportedKwh+=q,v=Math.max(0,v-K)}}const m=i.reduce((d,v)=>d+v.selfConsumedKwh,0),_=i.reduce((d,v)=>d+v.exportedKwh,0),y=Math.max(0,s??m),$=Math.max(0,r??_),C=m>0?y/m:1,x=_>0?$/_:1;for(const d of i)d.selfConsumedKwh*=C,d.exportedKwh*=x,d.revenue=d.exportedKwh*d.rate,d.exportEquivalentForSelfUse=d.selfConsumedKwh*d.rate;const l=i.reduce((d,v)=>d+v.revenue,0),b=i.reduce((d,v)=>d+v.exportEquivalentForSelfUse,0),M=$>0?l/$:0;return{meters:i,totalFeedInRevenue:l,totalSelfUseExportEquivalent:b,weightedExportRate:M,usedPriorityAllocation:!0}}const Ct=[{kw:3,fixedMonthlyFee:7.42},{kw:7,fixedMonthlyFee:12.84},{kw:12,fixedMonthlyFee:19.61},{kw:17,fixedMonthlyFee:26.39},{kw:27,fixedMonthlyFee:39.94},{kw:43,fixedMonthlyFee:61.62},{kw:70,fixedMonthlyFee:98.2},{kw:100,fixedMonthlyFee:138.85},{kw:150,fixedMonthlyFee:206.6,existingContractsOnly:!0},{kw:200,fixedMonthlyFee:274.35,existingContractsOnly:!0}];function je(t){if(!t)return null;const e=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(e){const[,s,r,o]=e;return new Date(Number(s),Number(r)-1,Number(o))}const a=new Date(t);return Number.isNaN(a.getTime())?null:new Date(a.getFullYear(),a.getMonth(),a.getDate())}function St(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function rs(t,e,a,s,r){const o=new Date,n=je(s),i=je(r);let u=n,p=i;if(!u||!p)switch(t){case"yesterday":{const y=new Date(o);y.setDate(y.getDate()-1),u=new Date(y.getFullYear(),y.getMonth(),y.getDate()),p=new Date(u);break}case"this_week":{const y=new Date(o),$=y.getDay()||7;u=new Date(y.getFullYear(),y.getMonth(),y.getDate()-$+1),p=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_week":{const y=new Date(o),$=y.getDay()||7,C=new Date(y.getFullYear(),y.getMonth(),y.getDate()-$+1);u=new Date(C.getFullYear(),C.getMonth(),C.getDate()-7),p=new Date(C.getFullYear(),C.getMonth(),C.getDate()-1);break}case"this_month":{u=new Date(o.getFullYear(),o.getMonth(),1),p=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_month":{u=new Date(o.getFullYear(),o.getMonth()-1,1),p=new Date(o.getFullYear(),o.getMonth(),0);break}case"this_year":{u=new Date(o.getFullYear(),0,1),p=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_year":{u=new Date(o.getFullYear()-1,0,1),p=new Date(o.getFullYear()-1,11,31);break}case"custom":{u=je(e)??new Date(o.getFullYear(),o.getMonth(),o.getDate()),p=je(a)??new Date(u);break}default:{u=new Date(o.getFullYear(),o.getMonth(),o.getDate()-1),p=new Date(u);break}}if(p<u){const y=u;u=p,p=y}let c=0,g=0;const m=new Date(u);for(;m<=p;){const y=new Date(m.getFullYear(),m.getMonth()+1,0).getDate();g+=1/y,c+=1,m.setDate(m.getDate()+1)}const _=u.getFullYear()===p.getFullYear()&&u.getMonth()===p.getMonth()&&u.getDate()===1&&p.getDate()===new Date(p.getFullYear(),p.getMonth()+1,0).getDate();return{days:c,factor:g,label:_?"full month":`${c} day${c===1?"":"s"}`}}function ns(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function Dt(t){const[e,a]=t.split(":").map(s=>parseInt(s,10)||0);return e*60+a}function Bt(t,e,a,s){if(!ns(t.getDay(),e))return!1;const r=t.getHours()*60+t.getMinutes(),o=Dt(a),n=Dt(s);return o===n?!0:o<n?r>=o&&r<n:r>=o||r<n}function os(t,e){return e.find(a=>Bt(t,a.day_group,a.start_time,a.end_time))}function is(t,e){return e.find(a=>Bt(t,a.day_group,a.start_time,a.end_time))}function Tt(t,e,a,s,r,o=[]){var _;const n=new Map;let i=0,u=0,p=0,c=0,g=0;const m=new Map;for(const y of o){const $=Number(y.value)||0;m.set(y.startedAt,(m.get(y.startedAt)??0)+$)}for(const y of t){const $=Number(y.value)||0,C=$*.25,x=m.get(y.startedAt)??0,l=Math.max(0,$-x),b=new Date(y.startedAt);if(Number.isNaN(b.getTime()))continue;const M=os(b,s),w=is(b,r),d=(M==null?void 0:M.rate)??e,v=((_=M==null?void 0:M.label)==null?void 0:_.trim())||"Base tariff",D=(w==null?void 0:w.reference_power_kw)??a;i+=C*d,g=Math.max(g,$),c=Math.max(c,l),$>D&&(p+=($-D)*.25),l>D&&(u+=(l-D)*.25);const L=`${v}__${d}`,T=n.get(L);T?T.kwh+=C:n.set(L,{label:v,rate:d,kwh:C})}return{energyCost:i,exceedanceKwh:u,grossExceedanceKwh:p,avoidedExceedanceKwh:Math.max(0,p-u),peakPowerKw:c,grossPeakPowerKw:g,rateBreakdown:Array.from(n.values()).sort((y,$)=>y.label.localeCompare($.label))}}function ls(t){var mt,gt;const e=t.config,a=t.rangeData;if(!e||!a)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const s=a.consumption||0,r=a.production||0,o=a.exported||0,n=Math.max(0,o),i=Math.max(0,a.solar_to_home??a.direct_solar_to_home??(a.self_consumed&&a.self_consumed>0?a.self_consumed:r-n)),u=Math.max(0,a.grid_import??s-i),p=a.peak_power_kw||0,c=e.reference_power_kw||5,g=a.exceedance_kwh||0,m=a.gas_energy||0,_=a.gas_volume||0,y=m>0||_>0,$=e.consumption_rate_windows??[],C=e.reference_power_windows??[],x=t.consumptionTimeseries?Tt(t.consumptionTimeseries.items,e.energy_variable_rate,c,$,C,((mt=t.productionTimeseries)==null?void 0:mt.items)??[]):null,l=$.length>0&&!!x&&Math.abs(u-s)<.01,b=C.length>0&&!!x,M=x?x.peakPowerKw:p,w=x?x.exceedanceKwh:g,d=St(a.start??t.customStart),v=St(a.end??t.customEnd),{days:D,factor:L,label:T}=rs(t.range,t.customStart,t.customEnd,a.start,a.end),F=e.energy_fixed_fee*L,K=e.network_metering_rate*L,I=e.network_power_ref_rate*L,q=l?x.energyCost:u*e.energy_variable_rate,oe=u*e.network_variable_rate,z=w*e.exceedance_rate,se=e.meter_monthly_fees??[],Y=se.reduce((f,A)=>f+(A.fee||0),0)*L,ue=u*e.compensation_fund_rate,B=u*e.electricity_tax_rate,R=Math.max(0,e.connect_discount??0)*L,Q=F+q+K+I+oe+z+Y+ue+B-R,ie=Q*e.vat_rate,H=Q+ie,he=Ut(e),ee=ss(e,t.consumptionTimeseries,((gt=t.perMeterProductionTimeseries)==null?void 0:gt.meters)??null,i,n),Le=he.filter(f=>isFinite(f.rate)&&f.rate>0),X=he.length>1,me=ee?ee.weightedExportRate:Le.length>0?Le.reduce((f,A)=>f+A.rate,0)/Le.length:e.feed_in_tariff,Z=ee?ee.totalFeedInRevenue:n*me,Ie=X&&he.length>0?n/he.length:n,le=ee?ee.meters:he.map(f=>({...f,producedKwh:0,exportedKwh:Ie,revenue:Ie*f.rate,selfConsumedKwh:0,exportEquivalentForSelfUse:0})),ge=!!ee,j=i,Ae=e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate,Qe=Ae*(1+e.vat_rate),He=j*Ae,Ne=He*e.vat_rate,be=He+Ne,et=ee?ee.totalSelfUseExportEquivalent:j*me,Oe=be-et,ve=Math.max(0,(x==null?void 0:x.avoidedExceedanceKwh)??0),Ce=ve*e.exceedance_rate,We=Ce*e.vat_rate,ye=Ce+We,$e=ve>1e-4,_e=be+ye+Z,Se=le.map(f=>{const A=f.selfConsumedKwh*Qe,Me=A-f.exportEquivalentForSelfUse;return{...f,selfUseSavings:A,selfUseVsExport:Me,totalTrackedValue:A+f.revenue}}),Ge=ge&&Se.length>0,k=H-Z,E=(e.gas_fixed_fee??6.5)*L,W=m*(e.gas_variable_rate??.055),N=(e.gas_network_fee??4.8)*L,U=m*(e.gas_network_variable_rate??.012),xe=m*(e.gas_tax_rate??.001),te=E+W+N+U+xe,ce=te*(e.gas_vat_rate??.08),ke=te+ce,V=e.currency||"EUR",S=f=>`${h(f,2)} ${V}`,tt=f=>`${f>0?"+":f<0?"-":""}${h(Math.abs(f),2)} ${V}`,P=f=>h(f,3),ht=f=>h(f,3),Xt=f=>f>=0?"comparison-delta-savings":"comparison-delta-extra",Zt=Ge?`
            <tr class="section-label"><td colspan="3">Per-System Self-Use vs Export</td></tr>
            ${Se.map(f=>`
            <tr>
              <td>${f.shortId}</td>
              <td style="text-align: right;">
                Produced ${P(f.producedKwh)} kWh<br/>
                Kept on-site ${P(f.selfConsumedKwh)} kWh<br/>
                Sold ${P(f.exportedKwh)} kWh<br/>
                ${f.label} ${h(f.rate,4)} ${V}/kWh${X?`<br/>Self-use priority ${f.selfUsePriority}`:""}
              </td>
              <td style="text-align: right;">
                <strong>${S(f.totalTrackedValue)}</strong><br/>
                <span class="${Xt(f.selfUseVsExport)}">${tt(f.selfUseVsExport)}</span> self-use vs export<br/>
                <span class="muted">${S(f.selfUseSavings)} kept value + ${S(f.revenue)} sold</span>
              </td>
            </tr>
            `).join("")}
            <tr class="subtotal-row">
              <td colspan="2"><strong>Tracked per-system value</strong></td>
              <td style="text-align: right;"><strong>${S(Se.reduce((f,A)=>f+A.totalTrackedValue,0))}</strong></td>
            </tr>
      `:"",Jt=ge?`Compared with exporting the same ${P(j)} kWh using the configured PV self-use priority and each system's own feed-in tariff`:`Compared with selling the same ${P(j)} kWh at ${h(me,4)} ${V}/kWh`,at=Ct.find(f=>Math.abs(f.kw-c)<.05),Qt=Q-I-z,st=x?Ct.map(f=>{var yt;const A=Tt(t.consumptionTimeseries.items,e.energy_variable_rate,f.kw,$,C,((yt=t.productionTimeseries)==null?void 0:yt.items)??[]),Me=f.fixedMonthlyFee*L,Be=A.exceedanceKwh*e.exceedance_rate,vt=(Qt+Me+Be)*(1+e.vat_rate);return{...f,fixedCharge:Me,exceedanceKwh:A.exceedanceKwh,exceedanceCharge:Be,total:vt,deltaVsCurrent:vt-H}}):[],Ue=st.reduce((f,A)=>!f||A.total<f.total?A:f,null),ea=f=>Math.abs(f)<.005?"Current total":`${f>0?"+":"-"}${S(Math.abs(f))}`,rt=a.start&&a.end?`${we(a.start)} — ${we(a.end)}`:t.range.replace("_"," ").replace(/\b\w/g,f=>f.toUpperCase()),ta=w>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${h(M,1)} kW</strong> &mdash; ${b?"Reference power windows active":`Reference power level: ${h(c,1)} kW`}</p>
        <p>Exceedance volume: <strong>${P(w)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${S(z)}</p>
      </div>`:"",aa=l?x.rateBreakdown.map(f=>`
            <tr>
              <td>${f.label} (${P(f.kwh)} kWh)</td>
              <td style="text-align: right;">${h(f.rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${S(f.kwh*f.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Supplier rate (${P(u)} kWh bought from grid)</td>
              <td style="text-align: right;">${h(e.energy_variable_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${S(q)}</td>
            </tr>
          `,sa=b?`Reference power windows active (${C.length})`:`${h(c,1)} kW`,ra=l?`Time-of-use windows active (${$.length})`:`${h(e.energy_variable_rate,4)} ${V}/kWh`,na=st.map(f=>{const A=!!Ue&&f.kw===Ue.kw,Me=!!at&&f.kw===at.kw,Be=f.deltaVsCurrent<-.005?"comparison-delta-savings":f.deltaVsCurrent>.005?"comparison-delta-extra":"";return`
            <tr class="${A?"reference-power-best-row":""}${Me?" reference-power-current-row":""}">
              <td>
                <div class="reference-level-cell">
                  <span class="reference-level-kw">${h(f.kw,0)} kW</span>
                  ${A?'<span class="reference-level-badge best">Financially optimal</span>':""}
                  ${Me?'<span class="reference-level-badge current">Current</span>':""}
                  ${f.existingContractsOnly?'<span class="reference-level-badge legacy">Existing contracts</span>':""}
                </div>
              </td>
              <td style="text-align: right;">${S(f.fixedCharge)}</td>
              <td style="text-align: right;">${S(f.exceedanceCharge)}</td>
              <td style="text-align: right;"><strong>${S(f.total)}</strong></td>
              <td class="${Be}" style="text-align: right;">${ea(f.deltaVsCurrent)}</td>
            </tr>
          `}).join(""),oa=st.length>0?`
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${b?"Configured reference power windows stay active in this comparison.":"One reference power level is applied to the full selected period."}
              ${at?"":`Your current configuration uses ${h(c,1)} kW, which is outside the standard Creos low-voltage reference power levels.`}
            </p>
          </div>
          ${Ue?`<div class="reference-power-optimum">
                <span class="reference-level-badge best">Financially optimal: ${h(Ue.kw,0)} kW</span>
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
            ${na}
          </tbody>
        </table>
      </div>
    `:`
      <div class="card reference-power-card">
        <p class="muted">Reference power level comparison requires 15-minute load-curve data for the selected period.</p>
      </div>
    `,ia=`
      <div class="range-selector">
        ${Ke.map(f=>`
          <button
            class="range-btn ${f.id===t.range?"active":""}"
            data-range="${f.id}"
          >${f.label}</button>
        `).join("")}
      </div>
    `,la=a.start&&a.end?(()=>{const f=new Date(a.start),A=new Date(a.end);return Number.isNaN(f.getTime())||Number.isNaN(A.getTime())?"":`
        <div class="range-info-bar">
          Period: ${f.toLocaleDateString()} - ${A.toLocaleDateString()}
        </div>
      `})():"",ca=t.range==="custom"?`
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
    `:d&&v?`
        <div class="custom-range-picker period-preview">
          <span class="period-preview-label">Viewed period</span>
          <label>
            <span>From</span>
            <input type="date" value="${d}" readonly aria-label="Preset period start" />
          </label>
          <label>
            <span>To</span>
            <input type="date" value="${v}" readonly aria-label="Preset period end" />
          </label>
        </div>
      `:"";return`
    <section class="invoice-view">
      ${ia}
      ${la}
      ${ca}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Supplier Bill Estimate &mdash; ${rt}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the selected period. Feed-in revenue and net position are shown separately.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${P(s)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${P(u)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${P(r)} kWh produced</span>
          ${n>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${P(n)} kWh exported</span>`:""}
          ${y?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${P(m)} kWh gas (${ht(_)} m³)</span>`:""}
        </div>
      </div>

      ${ta}

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
              <td>Fixed Fee <span class="muted">(${T})</span></td>
              <td style="text-align: right;">${h(e.energy_fixed_fee,2)} ${V}/mo</td>
              <td style="text-align: right;">${S(F)}</td>
            </tr>
            ${aa}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${T})</span></td>
              <td style="text-align: right;">${h(e.network_metering_rate,2)} ${V}/mo</td>
              <td style="text-align: right;">${S(K)}</td>
            </tr>
            <tr>
              <td>Reference power level (${sa}) <span class="muted">(${T})</span></td>
              <td style="text-align: right;">${h(e.network_power_ref_rate,2)} ${V}/mo</td>
              <td style="text-align: right;">${S(I)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${P(u)} kWh bought from grid)</td>
              <td style="text-align: right;">${h(e.network_variable_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${S(oe)}</td>
            </tr>
            <tr class="${w>0?"exceedance-row":""}">
              <td>Exceedance charge (${P(w)} kWh above the reference power level)</td>
              <td style="text-align: right;">${h(e.exceedance_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${S(z)}</td>
            </tr>

            ${se.filter(f=>f.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${se.filter(f=>f.fee>0).map(f=>`
            <tr>
              <td>${f.label||"…"+f.meter_id.slice(-8)} <span class="muted">(${T})</span></td>
              <td style="text-align: right;">${h(f.fee,2)} ${V}/mo</td>
              <td style="text-align: right;">${S(f.fee*L)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${h(e.compensation_fund_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${S(ue)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${h(e.electricity_tax_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${S(B)}</td>
            </tr>
            ${R>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            <tr>
              <td>Monthly Discount <span class="muted">(${T})</span></td>
              <td style="text-align: right;">-${h(Math.max(0,e.connect_discount??0),2)} ${V}/mo</td>
              <td style="text-align: right;">-${S(R)}</td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${S(Q)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${h(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(ie)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Supplier Bill Estimate</strong></td>
              <td style="text-align: right;"><strong>${S(H)}</strong></td>
            </tr>

            ${r>0?`
            <tr class="section-label revenue-section"><td colspan="3">Solar Value & Feed-in Revenue</td></tr>
            <tr class="revenue-row">
              <td>Solar produced</td>
              <td style="text-align: right;">Total generation during this period</td>
              <td style="text-align: right;">${P(r)} kWh</td>
            </tr>
            <tr class="revenue-row">
              <td>Autoconsumed / used at home</td>
              <td style="text-align: right;">${P(j)} kWh avoided grid purchases</td>
              <td style="text-align: right;">${S(be)} saved</td>
            </tr>
            <tr class="revenue-row">
              <td>Export sold</td>
              <td style="text-align: right;">${P(n)} kWh sent to grid</td>
              <td style="text-align: right;">${S(Z)} earned</td>
            </tr>
            ${$e?`
            <tr class="revenue-row">
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${P(ve)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${S(ye)} saved</td>
            </tr>
            `:""}
            ${n>0?`
            <tr class="section-label"><td colspan="3">Credit Calculation</td></tr>
            ${le.map(f=>`
            <tr class="revenue-row">
              <td>Exported (${X?f.shortId:P(f.exportedKwh)+" kWh"})</td>
              <td style="text-align: right;">${P(f.exportedKwh)} kWh<br/>${f.label}<br/>${h(f.rate,4)} ${V}/kWh${ge&&X?`<br/>Self-use priority ${f.selfUsePriority}`:""}</td>
              <td class="revenue-amount" style="text-align: right;">-${S(f.revenue)}</td>
            </tr>
            `).join("")}
            ${X?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${P(n)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${h(me,4)} ${V}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${S(Z)}</td>
            </tr>
            `:""}
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total Solar Value</strong></td>
              <td style="text-align: right;"><strong>${S(_e)}</strong></td>
            </tr>
            <tr class="net-total-row">
              <td colspan="2"><strong>Net Electricity Position</strong></td>
              <td style="text-align: right;"><strong>${S(k)}</strong></td>
            </tr>
            `:""}
            ${n<=0?`
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total Solar Value</strong></td>
              <td style="text-align: right;"><strong>${S(_e)}</strong></td>
            </tr>
            `:""}
            `:""}
          </tbody>
        </table>
      </div>

      ${oa}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Supplier bill estimate: ${S(H)}</strong>${Z>0?` Feed-in revenue is shown separately as ${S(Z)}, giving a net electricity position of ${S(k)} after export credit.`:""}
          <br/>
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${P(u)} kWh), not total home usage.
          Supplier pricing: ${ra}.
          Fixed monthly charges are prorated across the viewed period (${D} days, ${T}, equivalent to ${h(L,2)} monthly charges).
          Peak load (${h(M,1)} kW) is compared against ${b?"your configured reference power windows":`your reference power level (${h(c,1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${h(e.exceedance_rate,4)} ${V}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${y?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${rt}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${P(m)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${ht(_)} m³</span>
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
              <td>Fixed Fee <span class="muted">(${T})</span></td>
              <td style="text-align: right;">${h(e.gas_fixed_fee??6.5,2)} ${V}/mo</td>
              <td style="text-align: right;">${S(E)}</td>
            </tr>
            <tr>
              <td>Energy (${P(m)} kWh)</td>
              <td style="text-align: right;">${h(e.gas_variable_rate??.055,4)} ${V}/kWh</td>
              <td style="text-align: right;">${S(W)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${T})</span></td>
              <td style="text-align: right;">${h(e.gas_network_fee??4.8,2)} ${V}/mo</td>
              <td style="text-align: right;">${S(N)}</td>
            </tr>
            <tr>
              <td>Network Variable (${P(m)} kWh)</td>
              <td style="text-align: right;">${h(e.gas_network_variable_rate??.012,4)} ${V}/kWh</td>
              <td style="text-align: right;">${S(U)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${P(m)} kWh)</td>
              <td style="text-align: right;">${h(e.gas_tax_rate??.001,4)} ${V}/kWh</td>
              <td style="text-align: right;">${S(xe)}</td>
            </tr>

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${S(te)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${h((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${S(ce)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${S(ke)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Net Energy Position: ${S(k+ke)}</strong>
          (Electricity net position: ${S(k)} + Gas supplier estimate: ${S(ke)})
        </p>
      </div>
      `:""}

      ${r>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Value &mdash; ${rt}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${S(_e)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${P(r)} kWh</div>
            <div class="solar-stat-label">Solar produced</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${S(be)}</div>
            <div class="solar-stat-label">Saved by autoconsuming ${P(j)} kWh</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${tt(Oe)}</div>
            <div class="solar-stat-label">Extra value from using it yourself instead of selling it</div>
          </div>
          ${$e?`
          <div class="solar-stat">
            <div class="solar-stat-value">${S(ye)}</div>
            <div class="solar-stat-label">Saved by staying under the reference power</div>
          </div>
          `:""}
          <div class="solar-stat">
            <div class="solar-stat-value">${S(Z)}</div>
            <div class="solar-stat-label">Earned by selling ${P(n)} kWh</div>
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
              <td style="text-align: right;">${P(r)} kWh</td>
            </tr>
            <tr>
              <td>Autoconsumed / used at home</td>
              <td style="text-align: right;">${P(j)} kWh avoided grid purchases</td>
              <td style="text-align: right;">${S(be)} saved</td>
            </tr>
            <tr>
              <td>Extra vs exporting instead</td>
              <td style="text-align: right;">${Jt}</td>
              <td style="text-align: right;">${tt(Oe)}</td>
            </tr>
            <tr>
              <td>Export sold</td>
              <td style="text-align: right;">${P(n)} kWh sent to grid</td>
              <td style="text-align: right;">${S(Z)} earned</td>
            </tr>
            ${$e?`
            <tr>
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${P(ve)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${S(ye)} saved</td>
            </tr>
            `:""}

            ${Zt}

            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${P(j)} kWh)</td>
              <td style="text-align: right;">${h(e.energy_variable_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${S(j*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${h(e.network_variable_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${S(j*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${h(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${V}/kWh</td>
              <td style="text-align: right;">${S(j*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${h(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(Ne)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${S(be)}</strong></td>
            </tr>

            ${$e?`
            <tr class="section-label"><td colspan="3">Reference Power Savings</td></tr>
            <tr>
              <td>Exceedance avoided</td>
              <td style="text-align: right;">${P(ve)} kWh above the reference power level</td>
              <td style="text-align: right;">${S(Ce)}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${h(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(We)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Reference Power Savings</strong></td>
              <td style="text-align: right;"><strong>${S(ye)}</strong></td>
            </tr>
            `:""}

            ${n>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${le.map(f=>`
            <tr>
              <td>Sold to grid ${X?`(${f.shortId})`:`(${P(f.exportedKwh)} kWh)`}</td>
              <td style="text-align: right;">${P(f.exportedKwh)} kWh<br/>${f.label}<br/>${h(f.rate,4)} ${V}/kWh${ge&&X?`<br/>Self-use priority ${f.selfUsePriority}`:""}</td>
              <td style="text-align: right;">${S(f.revenue)}</td>
            </tr>
            `).join("")}
            ${X?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${S(Z)}</strong></td>
            </tr>
            `:""}
            `:""}

            <tr class="total-row solar-total-row">
              <td colspan="2"><strong>💰 Total Solar Panel Value</strong></td>
              <td style="text-align: right;"><strong>${S(_e)}</strong></td>
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
          ${he.some(f=>f.mode==="sensor")?"Market price sourced from Home Assistant sensor.":"Using fixed feed-in tariff — configure a market price sensor in Settings for real-time rates."}
          ${ge?"Per-system self-consumption and export are allocated from each PV system's 15-minute production using the configured self-use priority (1 = consumed first at home).":X?"Displayed per-meter feed-in kWh are currently equal-split estimates because per-meter production data was not available for this view.":""}
        </p>
      </div>
      `:""}
    </section>
  `}const cs=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],ds=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Reference Power Fixed Charge",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"connect_discount",label:"Monthly Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],ps={consumption:"Power Consumption",production:"Power Production",gas:"Gas Consumption"},qt={consumption:"⚡",production:"☀️",gas:"🔥"};function us(t){return t.map(e=>`<span class="meter-type-badge meter-type-${e}">${qt[e]??""} ${ps[e]??e}</span>`).join(" ")}function Et(t,e,a){const s=t+1;return a?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${s}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${us(e.types)}</div>
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
  `}function Yt(t){return cs.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function hs(t,e){return`
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
            ${Yt(e.day_group??"all")}
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
  `}function ms(t,e){return`
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
            ${Yt(e.day_group??"all")}
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
  `}function gs(t,e="ha",a){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const s=e==="standalone"?(a==null?void 0:a.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let r="";if(e==="standalone"){const w=s.map((v,D)=>Et(D,v,!1)).join("");a==null||a.proxy_url,r=`
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
              ${w}
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
    `}else{const w=(t==null?void 0:t.meters)??[];r=`
      <div class="card" style="margin-bottom: var(--sp-6); padding: var(--sp-4) var(--sp-5);">
        <p class="muted" style="margin: 0 0 var(--sp-3) 0;">🔒 API credentials are managed through Home Assistant &rarr; Settings &rarr; Integrations &rarr; Leneda</p>
        <div class="form-section">
          <div class="form-section-title">📊  Configured Metering Points</div>
          <div id="meters-container">
            ${w.length>0?w.map((v,D)=>Et(D,v,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const o=w=>w.map(d=>{const v=t?t[d.key]??"":"";return`
        <div class="form-row">
          <label for="cfg-${d.key}">${d.label}</label>
          <div class="input-group">
            <input
              id="cfg-${d.key}"
              name="${d.key}"
              type="${d.type}"
              ${d.type==="number"?`step="${d.step}"`:""}
              value="${v}"
            />
            ${d.unit?`<span class="input-unit">${d.unit}</span>`:""}
          </div>
        </div>
      `}).join(""),n=((t==null?void 0:t.meters)??[]).filter(w=>w.types.includes("production")),i=(t==null?void 0:t.feed_in_rates)??[],u=e==="ha";function p(w){return i.find(d=>d.meter_id===w)??{meter_id:w,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:"",self_use_priority:n.findIndex(d=>d.id===w)+1}}const c=n.length===0?'<p class="muted">No production meters configured — add a meter with Power Production type above.</p>':n.map((w,d)=>{const v=p(w.id),D=w.id?"…"+w.id.slice(-8):`Meter ${d+1}`;return`
          <div class="feed-in-meter-card" data-meter-idx="${d}" data-meter-id="${w.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${D}</span>
              <input type="hidden" name="feed_in_rate_${d}_meter_id" value="${w.id}" />
            </div>
            <div class="form-row">
              <label for="cfg-feed_in_rate_${d}_priority">Self-use Priority</label>
              <div class="input-group">
                <input
                  id="cfg-feed_in_rate_${d}_priority"
                  name="feed_in_rate_${d}_self_use_priority"
                  type="number"
                  min="1"
                  step="1"
                  value="${v.self_use_priority??d+1}"
                />
                <span class="input-unit">1 = used first at home</span>
              </div>
            </div>
            <div class="form-row">
              <label>Pricing Mode</label>
              <div class="feed-in-mode-toggle">
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${d}_mode" value="fixed" ${v.mode==="fixed"?"checked":""} />
                  <span class="mode-label">💶 Fixed Tariff</span>
                </label>
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${d}_mode" value="sensor" ${v.mode==="sensor"?"checked":""} />
                  <span class="mode-label">📡 HA Sensor</span>
                </label>
              </div>
            </div>
            <div class="feed-in-fixed-fields" data-rate-idx="${d}" style="${v.mode==="fixed"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${d}_tariff">Feed-in Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${d}_tariff" name="feed_in_rate_${d}_tariff" type="number" step="0.0001" value="${v.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
              </div>
            </div>
            <div class="feed-in-sensor-fields" data-rate-idx="${d}" style="${v.mode==="sensor"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${d}_sensor">Market Price Sensor</label>
                <div class="input-group sensor-picker-group">
                  <input
                    id="cfg-feed_in_rate_${d}_sensor"
                    name="feed_in_rate_${d}_sensor_entity"
                    type="text"
                    value="${v.sensor_entity}"
                    placeholder="${u?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${u&&d===0?'<datalist id="ha-entity-list"></datalist>':""}
              </div>
              <div class="form-row">
                <label for="cfg-feed_in_rate_${d}_fallback">Fallback Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${d}_fallback" name="feed_in_rate_${d}_fallback_tariff" type="number" step="0.0001" value="${v.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
                <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                  Used when the sensor is unavailable.
                </p>
              </div>
            </div>
          </div>
        `}).join(""),g=((t==null?void 0:t.meters)??[]).some(w=>w.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),m=(t==null?void 0:t.consumption_rate_windows)??[],_=(t==null?void 0:t.reference_power_windows)??[],y=(t==null?void 0:t.meters)??[],$=(t==null?void 0:t.meter_monthly_fees)??[];function C(w){return $.find(d=>d.meter_id===w)??{meter_id:w,label:"",fee:0}}const x=y.length===0?'<p class="muted">No meters configured.</p>':y.map((w,d)=>{const v=C(w.id),D=w.id?"…"+w.id.slice(-8):`Meter ${d+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${w.types.map(T=>qt[T]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${D}</code>
              <input type="hidden" name="meter_fee_${d}_meter_id" value="${w.id}" />
            </div>
            <div class="form-row" style="margin-bottom: var(--sp-2);">
              <label for="cfg-meter_fee_${d}_label">Label</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${d}_label" name="meter_fee_${d}_label" type="text" value="${v.label||`Meter ${d+1} metering fee`}" placeholder="e.g. Smart meter rental" />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-meter_fee_${d}_fee">Monthly Fee</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${d}_fee" name="meter_fee_${d}_fee" type="number" step="0.01" value="${v.fee}" />
                <span class="input-unit">EUR/mo</span>
              </div>
            </div>
          </div>
        `}).join(""),l=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional supplier-rate windows. Outside these windows, the base <strong>Energy Supplier → Variable Rate</strong> is used.
      Windows can cross midnight by setting an end time earlier than the start time.
    </p>
    <div id="consumption-windows-container">
      ${m.length>0?m.map((w,d)=>hs(d,w)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,b=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${_.length>0?_.map((w,d)=>ms(d,w)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,M=ds.map(w=>{if(w.title==="Gas Billing"&&!g||w.title==="Meter Fees"&&y.length<2)return"";let d;return w.title==="Feed-in / Selling"?d=c:w.title==="Time-of-Use Tariffs"?d=l:w.title==="Reference Power Windows"?d=b:w.title==="Discounts"?d=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as a monthly credit. The dashboard prorates it to the selected period and subtracts it before VAT.
      </p>`+o(w.fields):w.title==="Meter Fees"?d=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+x:d=o(w.fields),`
    <div class="form-section">
      <div class="form-section-title">${w.icon}  ${w.title}</div>
      ${d}
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
          ${t?M:'<p class="muted">Loading configuration…</p>'}
          ${t?`
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save Configuration</button>
            <button type="button" id="reset-config-btn" class="btn btn-outline">Reset to Defaults</button>
          </div>
          `:""}
        </form>
      </div>
    </section>
  `}function ot(t,e,a=!1,s="dark",r=""){const o=_=>`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${_}
    </svg>
  `,n=o(`
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
  `),p=o(`
    <path d="M7 4H17V20L15 18.5L13 20L11 18.5L9 20L7 18.5L5 20V6A2 2 0 0 1 7 4Z" />
    <path d="M9 9H15" />
    <path d="M9 13H15" />
  `),c=o(`
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
      `),m=[{id:"charts",label:"Charts",icon:n},{id:"dashboard",label:"Dashboard",icon:i},{id:"sensors",label:"Sensors",icon:u},{id:"invoice",label:"Invoice",icon:p},{id:"settings",label:"Settings",icon:c}];return`
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
        ${m.map(_=>`
          <button
            class="nav-btn ${_.id===t?"active":""}"
            data-tab="${_.id}"
            role="tab"
            aria-selected="${_.id===t}"
            aria-controls="panel-${_.id}"
          >
            <span class="nav-icon" aria-hidden="true">${_.icon}</span>
            <span class="nav-label">${_.label}</span>
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
  `}const jt="leneda_credentials",zt="leneda_theme";function vs(){try{const t=localStorage.getItem(jt);if(t)return JSON.parse(t)}catch{}return null}function it(t){try{localStorage.setItem(jt,JSON.stringify(t))}catch{}}function ys(){var t;try{const e=localStorage.getItem(zt);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function fs(t){try{localStorage.setItem(zt,t)}catch{}}function Lt(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const[,a,s,r]=e;return new Date(Number(a),Number(s)-1,Number(r))}function Wt(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${s}`}function Fe(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0"),r=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),n=String(t.getSeconds()).padStart(2,"0"),i=String(t.getMilliseconds()).padStart(3,"0"),u=-t.getTimezoneOffset(),p=u>=0?"+":"-",c=String(Math.floor(Math.abs(u)/60)).padStart(2,"0"),g=String(Math.abs(u)%60).padStart(2,"0");return`${e}-${a}-${s}T${r}:${o}:${n}.${i}${p}${c}:${g}`}function Pt(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function ws(t,e=new Date){switch(t){case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const s=new Date(a);return s.setHours(23,59,59,999),{start:a,end:s}}case"this_week":{const a=new Date(e),s=a.getDay()||7;return a.setDate(a.getDate()-s+1),a.setHours(0,0,0,0),{start:a,end:e}}case"last_week":{const a=new Date(e),s=a.getDay()||7,r=new Date(a);r.setDate(a.getDate()-s),r.setHours(23,59,59,999);const o=new Date(r);return o.setDate(r.getDate()-6),o.setHours(0,0,0,0),{start:o,end:r}}case"this_month":return{start:new Date(e.getFullYear(),e.getMonth(),1),end:e};case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),s=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:a,end:s}}case"this_year":return{start:new Date(e.getFullYear(),0,1),end:e};case"last_year":{const a=new Date(e.getFullYear()-1,0,1),s=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:a,end:s}}}}function bs(t,e,a=new Date){const s=Lt(t),r=Lt(e);if(!s||!r)return null;const o=["yesterday","this_week","last_week","this_month","last_month","this_year","last_year"];for(const n of o){const i=ws(n,a);if(Pt(s,i.start)&&Pt(r,i.end))return n}return null}class $s{constructor(e){De(this,"root");De(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartViewportStart:null,chartViewportEnd:null,chartUnit:"kwh",chartTimeBucket:"quarter_hour",chartConsumptionView:"grid",analysisHeatmapMetric:"grid",analysisProfileMetric:"house",analysisComparisonMode:"previous",analysisComparison:null,analysisComparisonLoading:!1,rangeData:null,consumptionTimeseries:null,productionTimeseries:null,perMeterProductionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:ys()});De(this,"preZoomRange",null);De(this,"preZoomCustomStart","");De(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await Vt();if(this.state.mode=e.mode,e.mode==="standalone"){const a=vs();if(a&&(this.state.credentials=a),!e.configured&&!a){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&a)try{const{saveCredentials:s}=await re(async()=>{const{saveCredentials:r}=await Promise.resolve().then(()=>fe);return{saveCredentials:r}},void 0);await s(a)}catch{}if(!a)try{this.state.credentials=await Rt()}catch{}}await this.loadData()}toDisplayError(e,a="Failed to load data"){const s=e instanceof Error?e.message:String(e??"").trim(),r=s.toLowerCase();return r.includes("missing data")||r.includes("no_data")||r.includes("no data")?"Missing data":s||a}clearRangeStateWithError(e,a="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.state.perMeterProductionTimeseries=null,this.clearChartViewport(),this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1,this.state.error=this.toDisplayError(e,a)}async fetchPerMeterProductionForRange(e,a,s){var o;if(((e==null?void 0:e.meters)??[]).filter(n=>n.types.includes("production")).length<=1)return null;try{const n=await lt("1-1:2.29.0",a,s);return(o=n.meters)!=null&&o.length?n:null}catch(n){return console.warn("Per-meter production fetch failed:",n),null}}resetAnalysisComparison(){this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1}clearChartViewport(){this.state.chartViewportStart=null,this.state.chartViewportEnd=null}normalizeChartTimeBucket(){const{start:e,end:a}=this.getDateRangeISO(),s=ba(dt(e,a),this.state.chartTimeBucket);s!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=s)}getCurrentRangeKey(){const{start:e,end:a}=this.getDateRangeISO();return`${e}|${a}`}shiftIsoByYears(e,a){const s=new Date(e);if(!Number.isFinite(s.getTime()))return e;const r=new Date(s);return r.setUTCFullYear(r.getUTCFullYear()+a),r.toISOString()}getComparisonRangeISO(e,a,s){if(s==="last_year")return{start:this.shiftIsoByYears(e,-1),end:this.shiftIsoByYears(a,-1)};const r=new Date(e).getTime(),o=new Date(a).getTime(),n=Math.max(0,o-r),i=r-1,u=i-n;return{start:new Date(u).toISOString(),end:new Date(i).toISOString()}}async loadAnalysisComparison(e=!1){var i;if(!this.state.consumptionTimeseries||!this.state.productionTimeseries)return;const{start:a,end:s}=this.getDateRangeISO(),r=this.state.analysisComparisonMode,o=`${a}|${s}|${r}`;if(!e&&(this.state.analysisComparisonLoading||((i=this.state.analysisComparison)==null?void 0:i.key)===o))return;const n=this.getComparisonRangeISO(a,s,r);this.state.analysisComparisonLoading=!0,this.state.tab==="charts"&&this.renderPreserveMainScroll();try{const[u,p]=await Promise.all([ae("1-1:1.29.0",n.start,n.end),ae("1-1:2.29.0",n.start,n.end)]);if(o!==this.getCurrentRangeKey())return;this.state.analysisComparison={key:o,mode:r,start:n.start,end:n.end,consumptionTimeseries:u,productionTimeseries:p}}catch(u){console.warn("Comparison data fetch failed:",u),o===this.getCurrentRangeKey()&&(this.state.analysisComparison=null)}finally{o===this.getCurrentRangeKey()&&(this.state.analysisComparisonLoading=!1,this.state.tab==="charts"&&this.renderPreserveMainScroll())}}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.clearChartViewport(),this.resetAnalysisComparison(),this.render();try{const[e,a,s]=await Promise.all([ze(this.state.range),ct(),Ve()]),{start:r,end:o}=this.getDateRangeISO(),[n,i,u]=await Promise.all([ae("1-1:1.29.0",r,o),ae("1-1:2.29.0",r,o),this.fetchPerMeterProductionForRange(s,r,o)]);this.state.rangeData=e,this.state.consumptionTimeseries=n,this.state.productionTimeseries=i,this.state.perMeterProductionTimeseries=u,this.state.sensors=a,this.state.config=s}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async changeRange(e){if(this.preZoomRange=null,this.clearChartViewport(),this.state.range=e,this.resetAnalysisComparison(),e==="custom"){if(!this.state.customStart||!this.state.customEnd){const a=new Date;a.setDate(a.getDate()-1);const s=new Date(a);s.setDate(s.getDate()-6),this.state.customStart=Wt(s),this.state.customEnd=Wt(a)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:a,end:s}=this.getDateRangeISO(),[r,o,n,i]=await Promise.all([ze(e),ae("1-1:1.29.0",a,s),ae("1-1:2.29.0",a,s),this.fetchPerMeterProductionForRange(this.state.config,a,s)]);this.state.rangeData=r,this.state.consumptionTimeseries=o,this.state.productionTimeseries=n,this.state.perMeterProductionTimeseries=i}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async applyCustomRange(){this.preZoomRange=null,this.clearChartViewport();const{customStart:e,customEnd:a}=this.state;if(!(!e||!a)){this.state.error=null,this.state.loading=!0,this.resetAnalysisComparison(),this.render();try{const s=bs(e,a),r=s?ze(s):re(async()=>{const{fetchCustomData:m}=await Promise.resolve().then(()=>fe);return{fetchCustomData:m}},void 0).then(({fetchCustomData:m})=>m(e,a)),o=this.state.config,n=Fe(new Date(e+"T00:00:00")),i=Fe(new Date(a+"T23:59:59.999")),[u,p,c,g]=await Promise.all([r,ae("1-1:1.29.0",n,i),ae("1-1:2.29.0",n,i),this.fetchPerMeterProductionForRange(o,n,i)]);this.state.rangeData={range:"custom",consumption:u.consumption,production:u.production,exported:u.exported??0,self_consumed:u.self_consumed??0,grid_import:u.grid_import,solar_to_home:u.solar_to_home,direct_solar_to_home:u.direct_solar_to_home,shared:u.shared,shared_with_me:u.shared_with_me,gas_energy:u.gas_energy??0,gas_volume:u.gas_volume??0,peak_power_kw:u.peak_power_kw??0,exceedance_kwh:u.exceedance_kwh??0,metering_point:u.metering_point??"",start:u.start??e,end:u.end??a},this.state.consumptionTimeseries=p,this.state.productionTimeseries=c,this.state.perMeterProductionTimeseries=g}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}}async shiftChartPeriod(e){const{start:a,end:s}=this.getDateRangeISO(),r=Ht(a,s,this.state.chartTimeBucket,e);r&&await this.handleChartZoomChange(Fe(r.start),Fe(r.end))}changeTab(e){this.state.tab=e,this.render(),(e==="dashboard"||e==="charts")&&!this.state.rangeData&&!this.state.loading&&this.loadData(),e==="charts"&&this.state.rangeData&&this.loadAnalysisComparison(),e==="sensors"&&!this.state.sensors&&ct().then(a=>{this.state.sensors=a,this.render()}),e==="settings"&&!this.state.config&&Ve().then(a=>{this.state.config=a,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,fs(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}printInvoice(){var n,i;const e=document.title,s=`Leneda-invoice-${(n=this.state.rangeData)!=null&&n.start&&((i=this.state.rangeData)!=null&&i.end)?`${this.state.rangeData.start.slice(0,10)}_to_${this.state.rangeData.end.slice(0,10)}`:this.state.range}`.replace(/[^a-z0-9_-]+/gi,"-");let r=!1;const o=()=>{r||(r=!0,document.title=e,window.removeEventListener("afterprint",o))};document.title=s,window.addEventListener("afterprint",o,{once:!0}),window.print(),window.setTimeout(o,1e3)}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const a=this.root.querySelector(".main-content");a?a.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}getDataSourceLabel(){return this.state.mode==="ha"?"Home Assistant":"Standalone"}getHostedDataNoticeHtml(){var e;return(((e=this.state.credentials)==null?void 0:e.proxy_url)??"").trim().length>0,""}render(){var u;const{tab:e,loading:a,error:s,theme:r}=this.state,o=this.getDataSourceLabel(),n=this.getHostedDataNoticeHtml();if(a&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${ot(e,p=>{},!1,r,o)}
          <main class="main-content">
            ${n}
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `,this.attachNavListeners();return}if(s&&!this.state.rangeData){const p=s.toLowerCase().includes("missing data");this.root.innerHTML=`
        <div class="app-shell">
          ${ot(e,c=>{},!1,r,o)}
          <main class="main-content">
            ${n}
            <div class="error-state">
              <h2>${p?"Missing Data":"Connection Error"}</h2>
              <p>${p?"The selected period could not be loaded because data is missing.":s}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(u=this.root.querySelector("#retry-btn"))==null||u.addEventListener("click",()=>this.loadData());return}this.state.rangeData&&this.normalizeChartTimeBucket();let i="";switch(e){case"dashboard":i=xa(this.state);break;case"charts":i=es(this.state);break;case"sensors":i=as(this.state.sensors);break;case"invoice":i=ls(this.state);break;case"settings":i=gs(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${ot(e,p=>this.changeTab(p),this.state.isMenuOpen,r,o)}
        <main class="main-content">
          ${n}
          ${a?'<div class="loading-bar"></div>':""}
          ${i}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachAnalysisListeners(),this.attachInvoiceListeners(),this.attachSettingsListeners()}attachNavListeners(){var e,a;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(a=this.root.querySelector("[data-theme-toggle]"))==null||a.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.tab;this.changeTab(r)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.range;this.changeRange(i)})});const a=this.root.querySelector("#custom-start"),s=this.root.querySelector("#custom-end");a&&a.addEventListener("change",()=>{this.state.customStart=a.value}),s&&s.addEventListener("change",()=>{this.state.customEnd=s.value});const r=this.root.querySelector("#apply-custom-range");if(r==null||r.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.chartUnit;i!==this.state.chartUnit&&(this.state.chartUnit=i,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-bucket]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.chartBucket,{start:u,end:p}=this.getDateRangeISO();Re(i,dt(u,p))&&i!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=i,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-period-nav]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.chartPeriodNav==="next"?1:-1;this.shiftChartPeriod(i)})}),this.root.querySelectorAll("[data-chart-view]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.chartView;i!==this.state.chartConsumptionView&&(this.state.chartConsumptionView=i,this.renderPreserveMainScroll())})}),!e){const n=this.root.querySelector("#energy-chart");n&&this.state.rangeData&&this.initChart(n)}const o=this.root.querySelector(".reset-zoom-btn");o==null||o.addEventListener("click",async()=>{const{resetChartZoom:n}=await re(async()=>{const{resetChartZoom:i}=await import("./Charts-2lBBy3K_.js");return{resetChartZoom:i}},[]);if(n(),o.style.display="none",this.clearChartViewport(),this.preZoomRange!==null){const i=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",i==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(i)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachAnalysisListeners(){this.root.querySelectorAll("[data-analysis-heatmap]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisHeatmap;a!==this.state.analysisHeatmapMetric&&(this.state.analysisHeatmapMetric=a,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-profile]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisProfile;a!==this.state.analysisProfileMetric&&(this.state.analysisProfileMetric=a,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-comparison-mode]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisComparisonMode;a!==this.state.analysisComparisonMode&&(this.state.analysisComparisonMode=a,this.state.analysisComparison=null,this.loadAnalysisComparison(!0))})})}attachInvoiceListeners(){var e;(e=this.root.querySelector("#print-invoice-btn"))==null||e.addEventListener("click",()=>{this.printInvoice()})}attachSettingsListeners(){var u,p;const e=this.root.querySelector("#credentials-form");if(e){const c=this.root.querySelector("#add-meter-btn");c==null||c.addEventListener("click",()=>{var $,C,x;const _=new FormData(e),y=g(_);if(y.length<10){y.push({id:"",types:["consumption"]});const l={api_key:_.get("api_key")||(($=this.state.credentials)==null?void 0:$.api_key)||"",energy_id:_.get("energy_id")||((C=this.state.credentials)==null?void 0:C.energy_id)||"",meters:y,proxy_url:_.get("proxy_url")||((x=this.state.credentials)==null?void 0:x.proxy_url)||""};this.state.credentials=l,it(l),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach(_=>{_.addEventListener("click",()=>{var l,b,M;const y=parseInt(_.dataset.meter??"0",10),$=new FormData(e),C=g($);C.splice(y,1);const x={api_key:$.get("api_key")||((l=this.state.credentials)==null?void 0:l.api_key)||"",energy_id:$.get("energy_id")||((b=this.state.credentials)==null?void 0:b.energy_id)||"",meters:C,proxy_url:$.get("proxy_url")||((M=this.state.credentials)==null?void 0:M.proxy_url)||""};this.state.credentials=x,it(x),this.renderPreserveMainScroll()})});const g=_=>{var $,C,x;const y=[];for(let l=0;l<10;l++){const b=_.get(`meter_${l}_id`);if(b===null)break;const M=[];($=e.querySelector(`[name="meter_${l}_consumption"]`))!=null&&$.checked&&M.push("consumption"),(C=e.querySelector(`[name="meter_${l}_production"]`))!=null&&C.checked&&M.push("production"),(x=e.querySelector(`[name="meter_${l}_gas"]`))!=null&&x.checked&&M.push("gas"),y.push({id:b.trim(),types:M})}return y};e.addEventListener("submit",async _=>{_.preventDefault();const y=new FormData(e),$={api_key:y.get("api_key"),energy_id:y.get("energy_id"),meters:g(y),proxy_url:y.get("proxy_url")},C=this.root.querySelector("#creds-status");try{it($);const{saveCredentials:x}=await re(async()=>{const{saveCredentials:M}=await Promise.resolve().then(()=>fe);return{saveCredentials:M}},void 0);await x($),C&&(C.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=$,this.state.error=null;const l=!1,b=($.proxy_url??"").trim();await this.loadData()}catch(x){C&&(C.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${x instanceof Error?x.message:x}</p>`)}});const m=this.root.querySelector("#test-creds-btn");m==null||m.addEventListener("click",async()=>{const _=new FormData(e),y={api_key:_.get("api_key"),energy_id:_.get("energy_id"),meters:g(_),proxy_url:_.get("proxy_url")},$=this.root.querySelector("#creds-status");$&&($.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:C}=await re(async()=>{const{testCredentials:l}=await Promise.resolve().then(()=>fe);return{testCredentials:l}},void 0),x=await C(y);$&&($.innerHTML=x.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${x.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${x.message}</p>`)}catch(C){$&&($.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${C instanceof Error?C.message:C}</p>`)}})}const a=this.root.querySelector("#settings-form");if(!a)return;const s=c=>{const g=[];for(let m=0;m<24;m++){const _=c.get(`consumption_window_${m}_label`),y=c.get(`consumption_window_${m}_day_group`),$=c.get(`consumption_window_${m}_start_time`),C=c.get(`consumption_window_${m}_end_time`),x=c.get(`consumption_window_${m}_rate`);if(_===null&&y===null&&$===null&&C===null&&x===null)break;g.push({label:(_??"").trim()||`Window ${m+1}`,day_group:y??"all",start_time:$??"00:00",end_time:C??"06:00",rate:parseFloat(x??"0")||0})}return g},r=c=>{const g=[];for(let m=0;m<24;m++){const _=c.get(`reference_window_${m}_label`),y=c.get(`reference_window_${m}_day_group`),$=c.get(`reference_window_${m}_start_time`),C=c.get(`reference_window_${m}_end_time`),x=c.get(`reference_window_${m}_reference_power_kw`);if(_===null&&y===null&&$===null&&C===null&&x===null)break;g.push({label:(_??"").trim()||`Reference ${m+1}`,day_group:y??"all",start_time:$??"17:00",end_time:C??"00:00",reference_power_kw:parseFloat(x??"0")||0})}return g},o=()=>{var l;const c=new FormData(a),g={};a.querySelectorAll('input[type="checkbox"]').forEach(b=>{g[b.name]=b.checked});const m=[],_=/^feed_in_rate_(\d+)_(.+)$/,y={},$=[],C=/^meter_fee_(\d+)_(.+)$/,x={};for(const[b,M]of c.entries()){if(b.startsWith("consumption_window_")||b.startsWith("reference_window_"))continue;const w=b.match(_);if(w){const T=w[1],F=w[2];y[T]||(y[T]={}),y[T][F]=M;continue}const d=b.match(C);if(d){const T=d[1],F=d[2];x[T]||(x[T]={}),x[T][F]=M;continue}if(g[b]!==void 0&&typeof g[b]=="boolean")continue;const v=M,D=a.elements.namedItem(b);if(v===""&&D instanceof HTMLInputElement&&D.type==="number"){const T=(l=this.state.config)==null?void 0:l[b];typeof T=="number"&&isFinite(T)&&(g[b]=T);continue}const L=parseFloat(v);g[b]=isNaN(L)?v:L}for(const b of Object.keys(y).sort()){const M=y[b],w=M.mode??"fixed",d=w==="sensor"?M.fallback_tariff??M.tariff:M.tariff;m.push({meter_id:M.meter_id??"",mode:w,tariff:parseFloat(d??"0.08")||.08,sensor_entity:M.sensor_entity??"",self_use_priority:Math.max(1,parseInt(M.self_use_priority??`${Number(b)+1}`,10)||Number(b)+1)})}m.length>0&&(g.feed_in_rates=m);for(const b of Object.keys(x).sort()){const M=x[b];$.push({meter_id:M.meter_id??"",label:M.label??"",fee:parseFloat(M.fee??"0")||0})}return $.length>0&&(g.meter_monthly_fees=$),g.consumption_rate_windows=s(c),g.reference_power_windows=r(c),g},n=c=>{if(!this.state.config)return;const g=o();c(g),this.state.config={...this.state.config,...g},this.renderPreserveMainScroll()};if((u=this.root.querySelector("#add-consumption-window-btn"))==null||u.addEventListener("click",()=>{n(c=>{var m;const g=Array.isArray(c.consumption_rate_windows)?[...c.consumption_rate_windows]:[];g.push({label:`Window ${g.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((m=this.state.config)==null?void 0:m.energy_variable_rate)??.1125}),c.consumption_rate_windows=g})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(c=>{c.addEventListener("click",()=>{const g=parseInt(c.dataset.window??"0",10);n(m=>{const _=Array.isArray(m.consumption_rate_windows)?[...m.consumption_rate_windows]:[];_.splice(g,1),m.consumption_rate_windows=_})})}),(p=this.root.querySelector("#add-reference-window-btn"))==null||p.addEventListener("click",()=>{n(c=>{var m;const g=Array.isArray(c.reference_power_windows)?[...c.reference_power_windows]:[];g.push({label:`Reference ${g.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((m=this.state.config)==null?void 0:m.reference_power_kw)??5}),c.reference_power_windows=g})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(c=>{c.addEventListener("click",()=>{const g=parseInt(c.dataset.window??"0",10);n(m=>{const _=Array.isArray(m.reference_power_windows)?[...m.reference_power_windows]:[];_.splice(g,1),m.reference_power_windows=_})})}),a.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(c=>{c.addEventListener("change",()=>{const g=c.name.match(/feed_in_rate_(\d+)_mode/);if(!g)return;const m=g[1],_=a.querySelector(`.feed-in-fixed-fields[data-rate-idx="${m}"]`),y=a.querySelector(`.feed-in-sensor-fields[data-rate-idx="${m}"]`);_&&(_.style.display=c.value==="fixed"?"":"none"),y&&(y.style.display=c.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const c=this.root.querySelector("#ha-entity-list");c&&Kt().then(({entities:g})=>{c.innerHTML=g.map(m=>`<option value="${m}"></option>`).join("")}).catch(()=>{})}a.addEventListener("submit",async c=>{c.preventDefault();const g=o();try{const{saveConfig:m}=await re(async()=>{const{saveConfig:_}=await Promise.resolve().then(()=>fe);return{saveConfig:_}},void 0);await m(g),this.state.config=await Ve(),this.render()}catch(m){alert("Failed to save: "+(m instanceof Error?m.message:m))}});const i=this.root.querySelector("#reset-config-btn");i==null||i.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?"))try{const{resetConfig:c}=await re(async()=>{const{resetConfig:g}=await Promise.resolve().then(()=>fe);return{resetConfig:g}},void 0);await c(),this.state.config=await Ve(),this.render()}catch(c){alert("Failed to reset: "+(c instanceof Error?c.message:c))}})}async initChart(e){var a,s,r,o;try{const{renderEnergyChart:n}=await re(async()=>{const{renderEnergyChart:x}=await import("./Charts-2lBBy3K_.js");return{renderEnergyChart:x}},[]),{fetchTimeseries:i}=await re(async()=>{const{fetchTimeseries:x}=await Promise.resolve().then(()=>fe);return{fetchTimeseries:x}},void 0),{start:u,end:p}=this.getDateRangeISO(),c=this.state.chartViewportStart?new Date(this.state.chartViewportStart).getTime():void 0,g=this.state.chartViewportEnd?new Date(this.state.chartViewportEnd).getTime():void 0;let m=this.state.consumptionTimeseries,_=this.state.productionTimeseries;(!m||!_)&&([m,_]=await Promise.all([i("1-1:1.29.0",u,p),i("1-1:2.29.0",u,p)]),this.state.consumptionTimeseries=m,this.state.productionTimeseries=_);const y=((a=this.state.config)==null?void 0:a.reference_power_kw)??0,$=(((s=this.state.config)==null?void 0:s.meters)??[]).filter(x=>x.types.includes("production"));let C;if((o=(r=this.state.perMeterProductionTimeseries)==null?void 0:r.meters)!=null&&o.length)C=this.state.perMeterProductionTimeseries.meters;else if($.length>1)try{const x=await lt("1-1:2.29.0",u,p);x.meters&&x.meters.length>1&&(C=x.meters,this.state.perMeterProductionTimeseries=x)}catch(x){console.warn("Per-meter timeseries fetch failed, using merged view:",x)}n(e,m,_,{unit:this.state.chartUnit,consumptionView:this.state.chartConsumptionView,referencePowerKw:y,perMeterProduction:C,viewportStartMs:c,viewportEndMs:g,timeBucket:this.state.chartTimeBucket,onZoomChange:(x,l)=>{this.handleChartZoomChange(x,l)}})}catch(n){console.error("Chart init failed:",n)}}async handleChartZoomChange(e,a){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd),this.state.error=null,this.state.loading=!0,this.renderPreserveMainScroll();const{fetchCustomData:s}=await re(async()=>{const{fetchCustomData:c}=await Promise.resolve().then(()=>fe);return{fetchCustomData:c}},void 0),r=e.slice(0,10),o=a.slice(0,10);this.resetAnalysisComparison();const n=await s(e,a),[i,u,p]=await Promise.all([ae("1-1:1.29.0",e,a),ae("1-1:2.29.0",e,a),this.fetchPerMeterProductionForRange(this.state.config,e,a)]);this.state.range="custom",this.state.customStart=r,this.state.customEnd=o,this.state.chartViewportStart=e,this.state.chartViewportEnd=a,this.state.rangeData={range:"custom",consumption:n.consumption,production:n.production,exported:n.exported??0,self_consumed:n.self_consumed??0,gas_energy:n.gas_energy??0,gas_volume:n.gas_volume??0,grid_import:n.grid_import,solar_to_home:n.solar_to_home,direct_solar_to_home:n.direct_solar_to_home,shared:n.shared,shared_with_me:n.shared_with_me,peak_power_kw:n.peak_power_kw??0,exceedance_kwh:n.exceedance_kwh??0,metering_point:n.metering_point??"",start:n.start,end:n.end},this.state.consumptionTimeseries=i,this.state.productionTimeseries=u,this.state.perMeterProductionTimeseries=p,this.state.loading=!1,this.renderPreserveMainScroll()}catch(s){console.error("Zoom data fetch failed:",s),this.state.loading=!1,this.clearRangeStateWithError(s,"Missing data"),this.render()}}getDateRangeISO(){if(this.state.chartViewportStart&&this.state.chartViewportEnd)return{start:this.state.chartViewportStart,end:this.state.chartViewportEnd};const e=new Date,a=s=>Fe(s);switch(this.state.range){case"custom":{const s=new Date(this.state.customStart+"T00:00:00"),r=new Date(this.state.customEnd+"T23:59:59.999");return{start:a(s),end:a(r)}}case"yesterday":{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const r=new Date(s);return r.setHours(23,59,59,999),{start:a(s),end:a(r)}}case"this_week":{const s=new Date(e),r=s.getDay()||7;return s.setDate(s.getDate()-r+1),s.setHours(0,0,0,0),{start:a(s),end:a(e)}}case"last_week":{const s=new Date(e),r=s.getDay()||7,o=new Date(s);o.setDate(s.getDate()-r),o.setHours(23,59,59,999);const n=new Date(o);return n.setDate(o.getDate()-6),n.setHours(0,0,0,0),{start:a(n),end:a(o)}}case"this_month":{const s=new Date(e.getFullYear(),e.getMonth(),1);return{start:a(s),end:a(e)}}case"last_month":{const s=new Date(e.getFullYear(),e.getMonth()-1,1),r=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:a(s),end:a(r)}}case"this_year":{const s=new Date(e.getFullYear(),0,1);return{start:a(s),end:a(e)}}case"last_year":{const s=new Date(e.getFullYear()-1,0,1),r=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:a(s),end:a(r)}}default:{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const r=new Date(s);return r.setHours(23,59,59,999),{start:a(s),end:a(r)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new $s(t).mount()}
