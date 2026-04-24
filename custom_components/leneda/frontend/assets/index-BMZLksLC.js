var jt=Object.defineProperty;var qt=(t,e,s)=>e in t?jt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var ue=(t,e,s)=>qt(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const Bt="modulepreload",zt=function(t){return"/leneda-panel/static/"+t},rt={},Z=function(e,s,a){let r=Promise.resolve();if(s&&s.length>0){let n=function(h){return Promise.all(h.map(p=>Promise.resolve(p).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));r=n(s.map(h=>{if(h=zt(h),h in rt)return;rt[h]=!0;const p=h.endsWith(".css"),m=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${m}`))return;const i=document.createElement("link");if(i.rel=p?"stylesheet":Bt,p||(i.as="script"),i.crossOrigin="",i.href=h,c&&i.setAttribute("nonce",c),document.head.appendChild(i),p)return new Promise((f,g)=>{i.addEventListener("load",f),i.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${h}`)))})}))}function o(n){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=n,window.dispatchEvent(l),!l.defaultPrevented)throw n}return r.then(n=>{for(const l of n||[])l.status==="rejected"&&o(l.reason);return e().catch(o)})};function wt(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()})),proxy_url:(t.proxy_url??"").trim()}}function Xt(){var t,e,s,a,r;try{const o=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((r=(a=(s=o==null?void 0:o.hass)==null?void 0:s.auth)==null?void 0:a.data)==null?void 0:r.access_token)??null}catch{return null}}async function O(t,e){const s=Xt(),a={...e==null?void 0:e.headers,...s?{Authorization:`Bearer ${s}`}:{}},r={...e,credentials:"include",headers:a},o=await fetch(t,r);if(!o.ok){const n=o.headers.get("content-type")??"";let l="",c="";if(n.includes("application/json")){const h=await o.json().catch(()=>null);l=String((h==null?void 0:h.error)??"").trim(),c=String((h==null?void 0:h.message)??(h==null?void 0:h.error)??"").trim()}else c=(await o.text().catch(()=>"")).trim();throw l==="missing_data"||l==="no_data"||o.status===503?new Error("Missing data"):new Error(c?`API ${o.status}: ${c}`:`API ${o.status}: ${o.statusText}`)}return o.json()}async function Te(t){return O(`/leneda_api/data?range=${t}`)}async function Zt(t,e){return O(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function q(t,e,s){let a=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),O(a)}async function Ge(t,e,s){let a=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),O(a)}async function Oe(){return O("/leneda_api/sensors")}async function be(){return O("/leneda_api/config")}async function Jt(t){await O("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function Qt(){await O("/leneda_api/config/reset",{method:"POST"})}async function $t(){try{return await O("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function bt(){return O("/leneda_api/credentials")}async function es(t){const e=wt(t);await O("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function ts(t){const e=wt(t);return O("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function _t(){return O("/leneda_api/ha-entities")}const re=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:be,fetchCredentials:bt,fetchCustomData:Zt,fetchHAEntities:_t,fetchMode:$t,fetchPerMeterTimeseries:Ge,fetchRangeData:Te,fetchSensors:Oe,fetchTimeseries:q,resetConfig:Qt,saveConfig:Jt,saveCredentials:es,testCredentials:ts},Symbol.toStringTag,{value:"Module"}));function Ue(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(e){const[,s,a,r]=e;return new Date(Number(s),Number(a)-1,Number(r))}return new Date(t)}function u(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function ne(t){return Ue(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function xt(t){return Ue(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function pe(t){return Ue(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}const _e=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function ss(t){var ie,X,ye;const e=t.rangeData,s=_=>{if(!_)return"";const T=_.match(/^(\d{4}-\d{2}-\d{2})/);return T?T[1]:""},a=(e==null?void 0:e.consumption)??0,r=(e==null?void 0:e.production)??0,o=(e==null?void 0:e.exported)??0,n=(e==null?void 0:e.self_consumed)??0,l=(e==null?void 0:e.gas_energy)??0,c=(e==null?void 0:e.gas_volume)??0,h=(e==null?void 0:e.peak_power_kw)??0,p=s(e==null?void 0:e.start),m=s(e==null?void 0:e.end),i=(e==null?void 0:e.shared_with_me)??0,f=(e==null?void 0:e.shared)??0,g=Math.max(0,o),y=Math.max(0,(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(n>0?n:r-g)),k=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??y),b=y,S=Math.max(0,(e==null?void 0:e.grid_import)??a-y),x=a>0?a:S+y,C=!!((ie=t.config)!=null&&ie.meter_has_gas||(((X=t.config)==null?void 0:X.meters)??[]).some(_=>_.types.includes("gas"))),$=f+i,d=x>0?Math.min(100,y/x*100):0,v=Math.max(x,r,S,g,f,i,k,1),D=C?Math.min(Math.max(0,l),v):0,W=(_,T=2.8,E=8.2)=>_>0?T+_/v*(E-T):1.8,P=_=>W(_)+1.4,K=_=>W(_)+5.4,N=(_,T=.28,E=.88)=>_>0?T+_/v*(E-T):.1,L=(_,T=.09,E=.22)=>_>0?T+_/v*(E-T):.05,A=(_,T=1.6,E=3.9)=>`${(_>0?Math.max(T,E-_/v*(E-T)):E).toFixed(2)}s`,se=(_,T=3.4,E=5.8)=>_>0?T+_/v*(E-T):3,B=_=>_>0?Math.max(18,Math.round(_/v*100)):0,ce=_=>`
    <defs>
      <filter id="${_}-glow-red" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${_}-glow-green" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${_}-glow-blue" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${_}-glow-cyan" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${_}-glow-gas" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <linearGradient id="${_}-flow-solar" x1="50%" y1="6%" x2="50%" y2="88%">
        <stop offset="0%" stop-color="var(--clr-production)" stop-opacity="0.28" />
        <stop offset="100%" stop-color="var(--clr-production)" stop-opacity="1" />
      </linearGradient>
      <linearGradient id="${_}-flow-grid-in" x1="8%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stop-color="var(--clr-consumption)" stop-opacity="0.35" />
        <stop offset="100%" stop-color="var(--clr-consumption)" stop-opacity="0.95" />
      </linearGradient>
      <linearGradient id="${_}-flow-grid-out" x1="100%" y1="44%" x2="4%" y2="76%">
        <stop offset="0%" stop-color="var(--clr-export)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--clr-export)" stop-opacity="0.4" />
      </linearGradient>
      <linearGradient id="${_}-flow-shared-out" x1="0%" y1="48%" x2="100%" y2="48%">
        <stop offset="0%" stop-color="var(--clr-export)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--clr-export)" stop-opacity="0.45" />
      </linearGradient>
      <linearGradient id="${_}-flow-shared-in" x1="100%" y1="48%" x2="0%" y2="48%">
        <stop offset="0%" stop-color="var(--clr-primary)" stop-opacity="0.4" />
        <stop offset="100%" stop-color="var(--clr-primary)" stop-opacity="1" />
      </linearGradient>
      <linearGradient id="${_}-flow-gas" x1="50%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stop-color="var(--clr-gas)" stop-opacity="0.3" />
        <stop offset="100%" stop-color="var(--clr-gas)" stop-opacity="0.95" />
      </linearGradient>

      <linearGradient id="${_}-scene-shell" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.05)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
      </linearGradient>
      <radialGradient id="${_}-house-base-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--clr-surface-alt)" stop-opacity="0.8" />
        <stop offset="100%" stop-color="var(--clr-surface-alt)" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="${_}-house-core-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(88, 166, 255, 0.18)" />
        <stop offset="100%" stop-color="rgba(88, 166, 255, 0)" />
      </radialGradient>
    </defs>
  `,z=_=>{const{x:T,y:E,width:V,accent:I,kicker:j,value:Q,detail:ee}=_;return`
      <g class="scene-node-label" transform="translate(${T}, ${E})">
        <rect width="${V}" height="${ee?70:54}" rx="18" fill="var(--clr-overlay)" stroke="${I}" />
        <text x="16" y="22" class="scene-node-kicker">${j}</text>
        <text x="16" y="${ee?39:37}" class="scene-node-value">${Q}</text>
        ${ee?`<text x="16" y="56" class="scene-node-detail">${ee}</text>`:""}
      </g>
    `},me=_=>{const{x:T,y:E,scale:V=1,glowId:I}=_;return`
      <g class="scene-tier-icon scene-tier-grid" transform="translate(${T}, ${E}) scale(${V})">
        <circle cx="0" cy="44" r="48" fill="var(--clr-consumption)" fill-opacity="0.06" />
        <path d="M0 0 V88 M-24 20 H24 M-16 42 H16 M-8 66 H8" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" filter="url(#${I})" />
        <path d="M-12 88 L0 60 L12 88" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" fill="none" />
      </g>
    `},ge=_=>{const{x:T,y:E,scale:V=1,glowId:I}=_;return`
      <g class="scene-tier-icon scene-tier-solar" transform="translate(${T}, ${E}) scale(${V})">
        <circle cx="0" cy="0" r="26" fill="var(--clr-production)" fill-opacity="0.09" />
        <circle cx="0" cy="0" r="12" fill="var(--clr-production)" fill-opacity="0.9" filter="url(#${I})" />
        <path d="M0 -26 V-40 M0 26 V40 M26 0 H40 M-26 0 H-40 M18 -18 L28 -28 M18 18 L28 28 M-18 18 L-28 28 M-18 -18 L-28 -28" stroke="var(--clr-production)" stroke-width="2.5" stroke-linecap="round" />
      </g>
    `},de=_=>{const{x:T,y:E,scale:V=1,glowId:I}=_;return`
      <g class="scene-tier-icon scene-tier-community" transform="translate(${T}, ${E}) scale(${V})">
        <circle cx="0" cy="40" r="50" fill="var(--clr-primary)" fill-opacity="0.06" />
        <rect x="-26" y="30" width="22" height="42" rx="6" fill="rgba(88, 166, 255, 0.08)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="6" y="16" width="24" height="56" rx="6" fill="rgba(88, 166, 255, 0.12)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="-2" y="4" width="6" height="10" rx="2" fill="var(--clr-primary)" fill-opacity="0.7" />
        <path d="M-14 12 H14 M-10 4 V20 M10 4 V20" stroke="var(--clr-primary)" stroke-width="2" stroke-linecap="round" filter="url(#${I})" />
      </g>
    `},oe=_=>{const{x:T,y:E,scale:V=1,glowId:I}=_;return`
      <g class="scene-tier-icon scene-tier-gas" transform="translate(${T}, ${E}) scale(${V})">
        <circle cx="0" cy="38" r="46" fill="var(--clr-gas)" fill-opacity="0.08" />
        <path d="M-26 40 H-8 V72 H26" stroke="var(--clr-gas)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#${I})" />
        <path d="M0 4 C18 24 20 40 20 52 C20 70 9 84 0 84 C-9 84 -20 70 -20 52 C-20 38 -10 24 0 4 Z" fill="rgba(210, 153, 34, 0.14)" stroke="var(--clr-gas)" stroke-width="2.2" />
        <path d="M0 24 C9 35 10 44 10 52 C10 61 5 68 0 72 C-5 68 -10 61 -10 52 C-10 44 -8 35 0 24 Z" fill="var(--clr-gas)" fill-opacity="0.85" />
      </g>
    `},ve=_=>{const{prefix:T,x:E,y:V,scale:I=1}=_;return`
      <g class="elite-house" transform="translate(${E}, ${V}) scale(${I})">
        <circle cx="90" cy="122" r="112" fill="url(#${T}-house-core-glow)" />
        <circle cx="90" cy="122" r="96" fill="url(#${T}-house-base-glow)" opacity="0.28" />
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
          <rect x="0" y="0" width="56" height="14" rx="3" fill="rgba(63, 185, 80, 0.12)" stroke="var(--clr-production)" stroke-width="1.6" filter="url(#${T}-glow-green)" />
          <rect x="0" y="20" width="56" height="14" rx="3" fill="rgba(63, 185, 80, 0.12)" stroke="var(--clr-production)" stroke-width="1.6" filter="url(#${T}-glow-green)" />
          <line x1="13" y1="0" x2="13" y2="14" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
          <line x1="30" y1="0" x2="30" y2="14" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
          <line x1="13" y1="20" x2="13" y2="34" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
          <line x1="30" y1="20" x2="30" y2="34" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
        </g>
        <g transform="translate(90, 124)">
          <circle r="32" fill="var(--clr-overlay)" stroke="var(--clr-overlay-border)" stroke-width="2" />
          <text text-anchor="middle" y="-4" class="house-core-kicker">Self-Suff.</text>
          <text text-anchor="middle" y="18" class="house-core-value">${u(d,0)}%</text>
        </g>
        <text x="90" y="262" text-anchor="middle" class="house-total-label">Home usage</text>
        <text x="90" y="284" text-anchor="middle" class="house-total-value">${u(x)} kWh</text>
      </g>
    `},H=_=>{const{path:T,value:E,gradientId:V,colorVar:I,filterId:j,particleClass:Q,direction:ee="forward"}=_,te=ee==="reverse"?"1;0":"0;1";return`
      <path
        class="flow-halo ${Q}"
        d="${T}"
        stroke="url(#${V})"
        stroke-width="${K(E).toFixed(1)}"
        stroke-opacity="${L(E).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-rail ${Q}"
        d="${T}"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="${P(E).toFixed(1)}"
        stroke-opacity="0.42"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-stream ${Q}"
        d="${T}"
        stroke="url(#${V})"
        stroke-width="${W(E).toFixed(1)}"
        stroke-opacity="${N(E).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      ${E>0?`
        <circle
          class="flow-particle ${Q}"
          r="${se(E).toFixed(1)}"
          fill="${I}"
          filter="url(#${j})"
        >
          <animateMotion dur="${A(E)}" repeatCount="indefinite" path="${T}" keyPoints="${te}" keyTimes="0;1" calcMode="linear" />
        </circle>
        <circle
          class="flow-particle flow-particle-secondary ${Q}"
          r="${Math.max(2.4,se(E)-1.2).toFixed(1)}"
          fill="${I}"
          fill-opacity="0.75"
          filter="url(#${j})"
        >
          <animateMotion dur="${A(E)}" begin="-${(parseFloat(A(E))/2).toFixed(2)}s" repeatCount="indefinite" path="${T}" keyPoints="${te}" keyTimes="0;1" calcMode="linear" />
        </circle>
      `:""}
    `},ae=()=>`
    <div class="elite-scene elite-scene-desktop">
      <svg class="elite-main-svg" viewBox="0 0 860 460" fill="none" preserveAspectRatio="xMidYMid meet">
        ${ce("desktop")}
        <rect x="34" y="30" width="792" height="372" rx="34" fill="url(#desktop-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="430" cy="330" rx="278" ry="60" fill="url(#desktop-house-base-glow)" opacity="0.56" />
        <line x1="98" y1="334" x2="762" y2="334" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.45" />

        ${z({x:58,y:108,width:152,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${u(S+g)} kWh`,detail:g>0?`In ${u(S)} / out ${u(g)} kWh`:void 0})}

        ${z({x:356,y:44,width:148,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${u(r)} kWh`,detail:`${u(y)} kWh used at home`})}

        ${z({x:624,y:108,width:184,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${u($)} kWh`,detail:`Sent ${u(f)} / got ${u(i)} kWh`})}

        ${C?z({x:350,y:338,width:160,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${u(l)} kWh`,detail:c>0?`${u(c)} m3 in period`:"Gas meter active"}):""}

        ${me({x:132,y:186,scale:1.02,glowId:"desktop-glow-red"})}
        ${ge({x:430,y:126,glowId:"desktop-glow-green"})}
        ${de({x:716,y:194,glowId:"desktop-glow-cyan"})}
        ${C?oe({x:430,y:352,glowId:"desktop-glow-gas"}):""}
        ${ve({prefix:"desktop",x:340,y:96,scale:1.02})}

        ${H({path:"M 430 152 C 430 182 430 204 430 220",value:k,gradientId:"desktop-flow-solar",colorVar:"var(--clr-production)",filterId:"desktop-glow-green",particleClass:"flow-solar"})}

        ${H({path:"M 176 230 C 246 230 318 230 364 232",value:S,gradientId:"desktop-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"desktop-glow-red",particleClass:"flow-grid-in"})}

        ${H({path:"M 496 268 C 430 298 326 314 176 316",value:g,gradientId:"desktop-flow-grid-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-grid-out"})}

        ${H({path:"M 500 234 C 566 220 634 220 692 236",value:f,gradientId:"desktop-flow-shared-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-shared-out"})}

        ${H({path:"M 690 272 C 632 292 566 294 500 278",value:i,gradientId:"desktop-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"desktop-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${C?H({path:"M 430 404 C 430 370 430 336 430 302",value:D,gradientId:"desktop-flow-gas",colorVar:"var(--clr-gas)",filterId:"desktop-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,Y=()=>`
    <div class="elite-scene elite-scene-mobile">
      <svg class="elite-main-svg" viewBox="0 0 420 560" fill="none" preserveAspectRatio="xMidYMid meet">
        ${ce("mobile")}
        <rect x="20" y="20" width="380" height="520" rx="32" fill="url(#mobile-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="210" cy="316" rx="136" ry="38" fill="url(#mobile-house-base-glow)" opacity="0.58" />
        <line x1="64" y1="332" x2="356" y2="332" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.42" />

        ${z({x:132,y:40,width:156,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${u(r)} kWh`})}

        ${z({x:20,y:194,width:126,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${u(S+g)} kWh`})}

        ${z({x:274,y:194,width:126,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${u($)} kWh`})}

        ${C?z({x:122,y:442,width:176,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${u(l)} kWh`,detail:c>0?`${u(c)} m3`:"Gas meter active"}):""}

        ${ge({x:210,y:126,scale:.92,glowId:"mobile-glow-green"})}
        ${me({x:76,y:254,scale:.86,glowId:"mobile-glow-red"})}
        ${de({x:344,y:260,scale:.86,glowId:"mobile-glow-cyan"})}
        ${C?oe({x:210,y:442,scale:.9,glowId:"mobile-glow-gas"}):""}
        ${ve({prefix:"mobile",x:118,y:166,scale:.94})}

        ${H({path:"M 210 152 C 210 188 210 216 210 238",value:k,gradientId:"mobile-flow-solar",colorVar:"var(--clr-production)",filterId:"mobile-glow-green",particleClass:"flow-solar"})}

        ${H({path:"M 104 286 C 138 286 168 286 194 286",value:S,gradientId:"mobile-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"mobile-glow-red",particleClass:"flow-grid-in"})}

        ${H({path:"M 226 318 C 194 340 162 348 102 350",value:g,gradientId:"mobile-flow-grid-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-grid-out"})}

        ${H({path:"M 226 286 C 262 274 294 274 318 286",value:f,gradientId:"mobile-flow-shared-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-shared-out"})}

        ${H({path:"M 318 320 C 294 332 262 334 226 322",value:i,gradientId:"mobile-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"mobile-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${C?H({path:"M 210 474 C 210 432 210 390 210 344",value:D,gradientId:"mobile-flow-gas",colorVar:"var(--clr-gas)",filterId:"mobile-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,fe=e!=null&&e.start&&(e!=null&&e.end)?`${ne(e.start)} — ${ne(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${ne(t.customStart+"T00:00:00")} — ${ne(t.customEnd+"T00:00:00")}`:((ye=_e.find(_=>_.id===t.range))==null?void 0:ye.label)??"Yesterday",J=t.chartConsumptionView==="house"?"Total Usage shows the full house load, with the solar-covered share highlighted in green and exports below zero · Scroll to zoom · Drag to pan":"Net Grid focuses on what still came from the grid after solar, with exports shown below zero · The reference limit in kW mode applies here · Scroll to zoom · Drag to pan";return`
    <div class="dashboard" style="position: relative;">
      <div style="position:fixed;bottom:4px;right:4px;font-size:10px;opacity:0.5;pointer-events:none;z-index:9999;">v:2.8.0</div>

      <!-- Range Selector -->
      <div class="range-selector">
        ${_e.map(_=>`
          <button
            class="range-btn ${_.id===t.range?"active":""}"
            data-range="${_.id}"
          >${_.label}</button>
        `).join("")}
      </div>

      ${(()=>{if(!(e!=null&&e.start)||!(e!=null&&e.end))return"";try{const _=new Date(e.start),T=new Date(e.end);return isNaN(_.getTime())||isNaN(T.getTime())?"":`
            <div class="range-info-bar">
              📅 ${_.toLocaleDateString()} — ${T.toLocaleDateString()}
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
      `:p&&m?`
      <!-- Preset Period Preview -->
      <div class="custom-range-picker period-preview">
        <span class="period-preview-label">Viewed period</span>
        <label>
          <span>From</span>
          <input type="date" value="${p}" readonly aria-label="Preset period start" />
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
          <div class="stat-icon">⚡</div>
          <div class="stat-body">
            <div class="stat-label">Consumption</div>
            <div class="stat-value">${u(a)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card production">
          <div class="stat-icon">☀️</div>
          <div class="stat-body">
            <div class="stat-label">Production</div>
            <div class="stat-value">${u(r)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.export">
          <div class="stat-icon">📤</div>
          <div class="stat-body">
            <div class="stat-label">Exported</div>
            <div class="stat-value">${u(o)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.self-consumed">
          <div class="stat-icon">🏠</div>
          <div class="stat-body">
            <div class="stat-label">Self-Consumed</div>
            <div class="stat-value">${u(b)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>
      </div>

      <!-- Energy Flow + Key Metrics side by side -->
      <div class="flow-metrics-row">
        <div class="card flow-card">
          <h3 class="card-title"><span class="title-icon">🔄</span> Energy Flow</h3>

          <div class="leneda-elite-flow">
            <div class="elite-header">
              <div class="glass-module consumption-module">
                <div class="module-info">
                  <span class="module-label">Period Consumption <span class="info-icon">ⓘ</span></span>
                  <div class="module-value-row">
                    <span class="module-value highlight-red">${u(a)}</span>
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

            ${ae()}
            ${Y()}

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${u(x)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${u(d,0)}% solar supplied${h>0?` · Peak ${u(h,2)} kW`:""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${u(y)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${B(y)}%;"></span></div>
                  <p>Energy used inside the house${i>0?", including received community energy":""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${u(S)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${B(S)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${u(g)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${B(g)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${u($)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${B($)}%;"></span></div>
                  <p>Sent ${u(f)} kWh · received ${u(i)} kWh.</p>
                </div>
                ${C?`
                <div class="mobile-flow-item gas">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Gas to house</span>
                    <strong>${u(l)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${B(D||v)}%;"></span></div>
                  <p>${c>0?`${u(c)} m3 measured for the same period.`:"Gas meter is configured for this home."}</p>
                </div>
                `:""}
              </div>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${u(y)} kWh used in the house</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${u(S)} kWh bought from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${u(g)} kWh sent back to the market</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${u(f)} kWh sent · ${u(i)} kWh received${i>0?" (included in solar to home)":""}</span>
                </span>
              </div>
              ${C?`
              <div class="flow-legend-item gas">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Gas to house</strong>
                  <span>${u(l)} kWh${c>0?` / ${u(c)} m3`:""}</span>
                </span>
              </div>
              `:""}
            </div>
          </div>
      </div>

      <!-- Key Metrics (right of flow) -->
      <div class="card metrics-card">
        <h3 class="card-title"><span class="title-icon">📈</span> Key Metrics</h3>
        <div class="metrics-list">
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Sufficiency</span>
              <span class="metric-value">${u(d,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${d}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Consumed</span>
              <span class="metric-value">${u(b)} kWh</span>
            </div>
          </div>
          ${h>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${u(h,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label">${((e==null?void 0:e.exceedance_kwh)??0)>0?"⚠️":"✅"} Exceedance</span>
              <span class="metric-value">${u((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${l>0||c>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${u(l)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${u(c)} m³</span>
            </div>
          </div>
          `:""}
        </div>
      </div>
      </div>

      <!-- Chart -->
      <div class="card chart-card">
        <div class="chart-header">
          <h3 class="card-title"><span class="title-icon">📉</span> Energy Profile — ${fe}</h3>
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
              class="reset-zoom-btn"
              style="display: none;"
              title="Reset zoom to full period"
            >↩ Reset Zoom</button>
          </div>
        </div>
        <div class="chart-container">
          <canvas id="energy-chart"></canvas>
        </div>
        <p class="muted chart-hint" style="text-align:center; margin-top: var(--sp-2); font-size: var(--text-xs);">
          ${J}
        </p>
      </div>

      </div>

      </div>
    </section>
  `}const nt=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],Ve={house:"Total Usage",grid:"Net Grid",solar:"Solar Production"};function ot(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function as(t){const e=new Date(t),s=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${s}-${a}-${r}`}function rs(t){const[e,s,a]=t.split("-").map(Number);return new Date(e,s-1,a,12,0,0,0)}function he(t,e=0){return t.length?Math.max(...t):e}function kt(t,e=0){return t.length?Math.min(...t):e}function ns(t,e,s){return Math.min(s,Math.max(e,t))}function U(t,e){return`${u(t,2)} ${e}`}function Ct(t,e){return`${t>0?"+":t<0?"-":""}${u(Math.abs(t),2)} ${e}`}function De(t,e=1){return Math.abs(t)<.005?"0":`${t>0?"+":""}${u(t,e)}`}function it(t){const[e,s]=t.split(":").map(a=>parseInt(a,10)||0);return e*60+s}function os(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function St(t,e,s,a){if(!os(t.getDay(),e))return!1;const r=t.getHours()*60+t.getMinutes(),o=it(s),n=it(a);return o===n?!0:o<n?r>=o&&r<n:r>=o||r<n}function is(t,e){return e.find(s=>St(t,s.day_group,s.start_time,s.end_time))}function ls(t,e){return e.find(s=>St(t,s.day_group,s.start_time,s.end_time))}function cs(t){const e=(t.meters??[]).filter(r=>r.types.includes("production")),s=t.feed_in_rates??[];if(!e.length)return t.feed_in_tariff??0;const a=e.map(r=>{const o=s.find(l=>l.meter_id===r.id);return o?o.mode==="sensor"&&o.sensor_value!=null&&Number.isFinite(o.sensor_value)?o.sensor_value??0:Number.isFinite(o.tariff)?o.tariff:t.feed_in_tariff??0:t.feed_in_tariff??0}).filter(r=>Number.isFinite(r)&&r>=0);return a.length?a.reduce((r,o)=>r+o,0)/a.length:t.feed_in_tariff??0}function ds(t,e,s){const a=new Map;for(const h of t.items){const p=new Date(h.startedAt).getTime();if(!Number.isFinite(p))continue;const m=a.get(p)??{houseKw:0,solarKw:0,iso:h.startedAt};m.houseKw+=Math.max(0,Number(h.value)||0),m.iso=h.startedAt,a.set(p,m)}for(const h of e.items){const p=new Date(h.startedAt).getTime();if(!Number.isFinite(p))continue;const m=a.get(p)??{houseKw:0,solarKw:0,iso:h.startedAt};m.solarKw+=Math.max(0,Number(h.value)||0),m.iso=m.iso||h.startedAt,a.set(p,m)}const r=s.consumption_rate_windows??[],o=s.reference_power_windows??[],n=s.reference_power_kw??0,l=cs(s),c=(s.exceedance_rate??0)*(1+(s.vat_rate??0));return[...a.entries()].sort((h,p)=>h[0]-p[0]).map(([h,p])=>{var v,D;const m=new Date(h),i=Math.max(0,p.houseKw),f=Math.max(0,p.solarKw),g=Math.max(0,Math.min(i,f)),y=Math.max(0,i-g),k=Math.max(0,f-g),b=((v=ls(m,o))==null?void 0:v.reference_power_kw)??n,S=Math.max(0,i-b),x=Math.max(0,y-b),C=Math.max(0,S-x),d=((((D=is(m,r))==null?void 0:D.rate)??s.energy_variable_rate??0)+(s.network_variable_rate??0)+(s.electricity_tax_rate??0)+(s.compensation_fund_rate??0))*(1+(s.vat_rate??0));return{timestamp:h,iso:p.iso,date:m,houseKw:i,solarKw:f,solarToHomeKw:g,gridKw:y,exportKw:k,referenceKw:b,overKw:x,avoidedOverKw:C,importRateWithVat:d,feedInRate:l,exceedanceRateWithVat:c}})}function Mt(t,e,s){const a=ds(t,e,s),r=new Map,o=Array.from({length:24},()=>0),n={house:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),grid:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),solar:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0})))},l={houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0};for(const i of a){const g=as(i.timestamp),y=r.get(g)??(()=>{const se=rs(g);return{key:g,label:se.toLocaleDateString(void 0,{month:"short",day:"numeric"}),fullDate:se.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0}})(),k=i.houseKw*.25,b=i.solarKw*.25,S=i.solarToHomeKw*.25,x=i.gridKw*.25,C=i.exportKw*.25,$=i.overKw*.25,d=i.avoidedOverKw*.25,v=x*i.importRateWithVat,D=S*i.importRateWithVat,W=C*i.feedInRate,P=S*(i.importRateWithVat-i.feedInRate),K=$*i.exceedanceRateWithVat,N=d*i.exceedanceRateWithVat;y.houseKwh+=k,y.solarKwh+=b,y.solarToHomeKwh+=S,y.gridKwh+=x,y.exportKwh+=C,y.exceedanceKwh+=$,y.avoidedExceedanceKwh+=d,y.importCost+=v,y.solarSavings+=D,y.exportRevenue+=W,y.selfConsumptionAdvantage+=P,y.exceedanceCost+=K,y.avoidedExceedanceValue+=N,y.peakGridKw=Math.max(y.peakGridKw,i.gridKw),y.peakHouseKw=Math.max(y.peakHouseKw,i.houseKw),y.exceedanceIntervals+=i.overKw>0?1:0,r.set(g,y),l.houseKwh+=k,l.solarKwh+=b,l.solarToHomeKwh+=S,l.gridKwh+=x,l.exportKwh+=C,l.exceedanceKwh+=$,l.avoidedExceedanceKwh+=d,l.importCost+=v,l.solarSavings+=D,l.exportRevenue+=W,l.selfConsumptionAdvantage+=P,l.exceedanceCost+=K,l.avoidedExceedanceValue+=N,l.peakGridKw=Math.max(l.peakGridKw,i.gridKw),l.peakHouseKw=Math.max(l.peakHouseKw,i.houseKw),l.exceedanceIntervals+=i.overKw>0?1:0;const L=(i.date.getDay()+6)%7,A=i.date.getHours();n.house[L][A].sum+=i.houseKw,n.house[L][A].count+=1,n.grid[L][A].sum+=i.gridKw,n.grid[L][A].count+=1,n.solar[L][A].sum+=i.solarKw,n.solar[L][A].count+=1,o[A]+=$}const c=[...r.values()].sort((i,f)=>i.key.localeCompare(f.key)).map(i=>(i.coveragePct=i.houseKwh>0?i.solarToHomeKwh/i.houseKwh*100:0,i.selfConsumedPct=i.solarKwh>0?i.solarToHomeKwh/i.solarKwh*100:0,i.solarValue=i.solarSavings+i.exportRevenue+i.avoidedExceedanceValue,i));l.coveragePct=l.houseKwh>0?l.solarToHomeKwh/l.houseKwh*100:0,l.selfConsumedPct=l.solarKwh>0?l.solarToHomeKwh/l.solarKwh*100:0,l.solarValue=l.solarSavings+l.exportRevenue+l.avoidedExceedanceValue;const h={house:n.house.map(i=>i.map(f=>f.count?f.sum/f.count:0)),grid:n.grid.map(i=>i.map(f=>f.count?f.sum/f.count:0)),solar:n.solar.map(i=>i.map(f=>f.count?f.sum/f.count:0))},p=a.filter(i=>i.overKw>0).sort((i,f)=>f.overKw-i.overKw||f.timestamp-i.timestamp).slice(0,8),m=[...c].filter(i=>i.exceedanceKwh>0).sort((i,f)=>f.exceedanceKwh-i.exceedanceKwh).slice(0,6);return{daily:c,totals:l,topExceedances:p,hourlyExceedanceKwh:o,heatmapValues:h,loadDurationGrossKw:a.map(i=>i.houseKw).sort((i,f)=>f-i),loadDurationNetKw:a.map(i=>i.gridKw).sort((i,f)=>f-i),worstDays:m}}function us(t){var e,s,a;return(e=t.rangeData)!=null&&e.start&&((s=t.rangeData)!=null&&s.end)?`${ne(t.rangeData.start)} - ${ne(t.rangeData.end)}`:((a=_e.find(r=>r.id===t.range))==null?void 0:a.label)??"Selected Period"}function ps(t){var e,s;return(e=t.rangeData)!=null&&e.start&&((s=t.rangeData)!=null&&s.end)?`${pe(t.rangeData.start)} - ${pe(t.rangeData.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${t.customStart} - ${t.customEnd}`:"Based on the currently selected range."}function lt(t){return t.analysisComparison?`Previous matched period: ${pe(t.analysisComparison.start)} - ${pe(t.analysisComparison.end)}`:"Previous matched period"}function le(t){const e=t.series.filter(v=>v.values.length>0);if(!e.length)return'<div class="analysis-empty">No chart data available for this period.</div>';const s=Math.max(...e.map(v=>v.values.length)),a=Math.max(720,s*24+92),r=244,o=50,n=20,l=18,c=30,h=e.flatMap(v=>v.values);t.referenceValue!=null&&h.push(t.referenceValue);let p=t.minValue??kt(h,0),m=t.maxValue??he(h,1);p===m&&(m+=1,p=Math.min(0,p-1)),t.minValue==null&&(p=Math.min(0,p));const i=a-o-n,f=r-l-c,g=(v,D)=>D<=1?o+i/2:o+v*i/(D-1),y=v=>l+(m-v)/(m-p)*f,k=t.valueFormatter??(v=>u(v,1)),b=Array.from({length:4},(v,D)=>p+(m-p)/3*D),S=[0,Math.floor((s-1)/2),s-1].filter((v,D,W)=>W.indexOf(v)===D),x=b.map(v=>{const D=y(v);return`
      <line x1="${o}" y1="${D.toFixed(1)}" x2="${(a-n).toFixed(1)}" y2="${D.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(D+4).toFixed(1)}" class="analysis-svg-tick">${k(v)}</text>
    `}).join(""),C=t.referenceValue!=null?(()=>{const v=y(t.referenceValue);return`
        <line x1="${o}" y1="${v.toFixed(1)}" x2="${(a-n).toFixed(1)}" y2="${v.toFixed(1)}" class="analysis-svg-reference" />
        ${t.referenceLabel?`<text x="${a-n}" y="${(v-8).toFixed(1)}" class="analysis-svg-reference-label">${t.referenceLabel}</text>`:""}
      `})():"",$=e.map(v=>{const D=v.values.map((P,K)=>{const N=g(K,v.values.length),L=y(P);return`${K===0?"M":"L"} ${N.toFixed(1)} ${L.toFixed(1)}`}).join(" "),W=v.values.length<=40?v.values.map((P,K)=>{const N=g(K,v.values.length),L=y(P);return`<circle cx="${N.toFixed(1)}" cy="${L.toFixed(1)}" r="2.6" fill="${v.color}" />`}).join(""):"";return`
      <path d="${D}" fill="none" stroke="${v.color}" stroke-width="2.5" ${v.dashed?'stroke-dasharray="6 4"':""} />
      ${W}
    `}).join(""),d=S.map(v=>{const D=g(v,s),W=t.labels[v]??`Point ${v+1}`;return`<text x="${D.toFixed(1)}" y="${r-8}" text-anchor="middle" class="analysis-svg-x-label">${W}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${a}" height="${r}" viewBox="0 0 ${a} ${r}" role="img" aria-label="${t.title??"Line chart"}">
        ${x}
        ${C}
        ${$}
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
  `}function hs(t){if(!t.length)return'<div class="analysis-empty">No daily energy data available.</div>';const e=Math.max(760,t.length*28+84),s=250,a=52,r=16,o=18,n=34,l=he(t.map(x=>x.houseKwh),1),c=he(t.map(x=>x.exportKwh),0),h=e-a-r,p=s-o-n,m=c>0?p*.72:p,i=c>0?p-m:0,f=o+m,g=h/t.length,y=Math.max(8,Math.min(18,g*.62)),k=Math.max(1,Math.ceil(t.length/10)),b=t.map((x,C)=>{const $=a+C*g+(g-y)/2,d=x.solarToHomeKwh/l*m,v=x.gridKwh/l*m,D=c>0?x.exportKwh/c*i:0,W=f-d-v-8;return`
      <g>
        <rect x="${$.toFixed(1)}" y="${(f-d).toFixed(1)}" width="${y.toFixed(1)}" height="${d.toFixed(1)}" rx="3" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${$.toFixed(1)}" y="${(f-d-v).toFixed(1)}" width="${y.toFixed(1)}" height="${v.toFixed(1)}" rx="3" fill="rgba(248, 81, 73, 0.55)" />
        ${D>0?`<rect x="${$.toFixed(1)}" y="${f.toFixed(1)}" width="${y.toFixed(1)}" height="${D.toFixed(1)}" rx="3" fill="rgba(88, 166, 255, 0.75)" />`:""}
        ${x.exceedanceKwh>0?`<circle cx="${($+y/2).toFixed(1)}" cy="${W.toFixed(1)}" r="3.2" fill="#d29922" />`:""}
      </g>
    `}).join(""),S=t.map((x,C)=>C%k!==0&&C!==t.length-1?"":`<text x="${(a+C*g+g/2).toFixed(1)}" y="${s-10}" text-anchor="middle" class="analysis-svg-x-label">${x.label}</text>`).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${s}" viewBox="0 0 ${e} ${s}" role="img" aria-label="Daily energy breakdown">
        <line x1="${a}" y1="${f.toFixed(1)}" x2="${(e-r).toFixed(1)}" y2="${f.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${a-8}" y="${(o+4).toFixed(1)}" class="analysis-svg-tick">${u(l,0)} kWh</text>
        ${c>0?`<text x="${a-8}" y="${(s-n+4).toFixed(1)}" class="analysis-svg-tick">-${u(c,0)} kWh</text>`:""}
        ${b}
        ${S}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.55);"></span><span>From grid</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span><span>Exported</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:#d29922;"></span><span>Exceedance on that day</span></span>
    </div>
  `}function ms(t,e){const s=ns(e,0,1);return t==="solar"?`rgba(63, 185, 80, ${.12+s*.82})`:t==="grid"?`rgba(210, 153, 34, ${.12+s*.82})`:`rgba(248, 81, 73, ${.12+s*.82})`}function gs(t,e){const s=t.flat(),a=he(s,1),r=kt(s,0);return`
    <div class="analysis-heatmap">
      <div class="analysis-heatmap-hours">
        <span class="analysis-heatmap-corner"></span>
        ${Array.from({length:24},(o,n)=>`
          <span class="analysis-heatmap-hour ${n%2===1?"analysis-heatmap-hour-faded":""}">${String(n).padStart(2,"0")}</span>
        `).join("")}
      </div>
      ${t.map((o,n)=>`
        <div class="analysis-heatmap-row">
          <span class="analysis-heatmap-day">${nt[n]}</span>
          ${o.map((l,c)=>{const h=a===r?0:(l-r)/(a-r);return`
              <span
                class="analysis-heatmap-cell"
                style="background:${ms(e,h)};"
                title="${nt[n]} ${String(c).padStart(2,"0")}:00 - ${u(l,2)} kW average"
              >${l>.05?u(l,1):""}</span>
            `}).join("")}
        </div>
      `).join("")}
    </div>
  `}function ct(t){const e=he(t.map(s=>s.value),1);return t.length?`
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
  `:'<div class="analysis-empty">No standout patterns in this period.</div>'}function vs(t){var a,r,o,n;const e=ot(((a=t.rangeData)==null?void 0:a.start)??t.customStart),s=ot(((r=t.rangeData)==null?void 0:r.end)??t.customEnd);return`
    <div class="range-selector">
      ${_e.map(l=>`
        <button
          class="range-btn ${l.id===t.range?"active":""}"
          data-range="${l.id}"
        >${l.label}</button>
      `).join("")}
    </div>
    ${(o=t.rangeData)!=null&&o.start&&((n=t.rangeData)!=null&&n.end)?`
        <div class="range-info-bar">
          Period: ${pe(t.rangeData.start)} - ${pe(t.rangeData.end)}
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
  `}function fs(t,e){return`
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
        <strong class="analysis-stat-value">${U(t.totals.solarValue,e)}</strong>
        <span class="analysis-stat-meta">Savings plus export revenue plus avoided exceedance charges</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Use vs Export</span>
        <strong class="analysis-stat-value">${Ct(t.totals.selfConsumptionAdvantage,e)}</strong>
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
        <strong class="analysis-stat-value">${U(t.totals.importCost,e)}</strong>
        <span class="analysis-stat-meta">Energy-only import charges from the selected period</span>
      </div>
    </div>
  `}function ys(t){return`
    <div class="card analysis-card analysis-card-full">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Daily Breakdown</h3>
          <p class="analysis-card-copy">House usage is split into solar-covered energy, grid energy, and exported surplus. A gold marker flags days with any reference-power exceedance.</p>
        </div>
      </div>
      ${hs(t.daily)}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily exceedance volume</h4>
        ${le({title:"Daily exceedance volume",series:[{label:"Exceedance",color:"#d29922",values:t.daily.map(e=>e.exceedanceKwh)}],labels:t.daily.map(e=>e.label),valueFormatter:e=>`${u(e,2)} kWh`})}
      </div>
    </div>
  `}function ws(t,e){return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Consumption Pattern Heatmap</h3>
          <p class="analysis-card-copy">Average hourly power by weekday. Use the switch to inspect total house usage, remaining grid draw, or solar production.</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${t.analysisHeatmapMetric==="house"?"active":""}" data-analysis-heatmap="house">${Ve.house}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="grid"?"active":""}" data-analysis-heatmap="grid">${Ve.grid}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="solar"?"active":""}" data-analysis-heatmap="solar">${Ve.solar}</button>
        </div>
      </div>
      ${gs(e.heatmapValues[t.analysisHeatmapMetric],t.analysisHeatmapMetric)}
      <p class="analysis-note">Each cell shows the average kW seen in that weekday/hour slot over the selected period.</p>
    </div>
  `}function $s(t,e){const s=t.totals.solarKwh>0?t.totals.solarToHomeKwh/t.totals.solarKwh*100:0,a=t.totals.solarKwh>0?t.totals.exportKwh/t.totals.solarKwh*100:0;return`
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
          <strong>${U(t.totals.solarValue,e)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-use vs export</span>
          <strong>${Ct(t.totals.selfConsumptionAdvantage,e)}</strong>
        </div>
      </div>
      <div class="analysis-share-bar">
        <span class="analysis-share-segment analysis-share-segment-home" style="width:${s}%;"></span>
        <span class="analysis-share-segment analysis-share-segment-export" style="width:${a}%;"></span>
      </div>
      <div class="analysis-share-legend">
        <span><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span>Self-consumed: ${u(t.totals.solarToHomeKwh)} kWh</span>
        <span><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span>Exported: ${u(t.totals.exportKwh)} kWh</span>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Coverage of house usage by day</h4>
        ${le({title:"Daily solar coverage",series:[{label:"Coverage",color:"#3fb950",values:t.daily.map(r=>r.coveragePct)}],labels:t.daily.map(r=>r.label),maxValue:100,minValue:0,valueFormatter:r=>`${u(r,0)}%`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day</h4>
        ${le({title:"Daily solar value",series:[{label:"Solar value",color:"#58a6ff",values:t.daily.map(r=>r.solarValue)}],labels:t.daily.map(r=>r.label),valueFormatter:r=>U(r,e)})}
      </div>
    </div>
  `}function bs(t,e){const s=t.hourlyExceedanceKwh.map((a,r)=>({label:`${String(r).padStart(2,"0")}:00`,value:a,meta:`${u(a,2)} kWh`,colorClass:"analysis-progress-fill-warn"})).filter(a=>a.value>0).sort((a,r)=>r.value-a.value).slice(0,6);return`
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
          <strong>${u(he(t.topExceedances.map(a=>a.overKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Exceedance cost</span>
          <strong>${U(t.totals.exceedanceCost,e)}</strong>
        </div>
      </div>
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Worst hours</h4>
          ${ct(s)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Worst days</h4>
          ${ct(t.worstDays.map(a=>({label:a.fullDate,value:a.exceedanceKwh,meta:`${u(a.exceedanceKwh,2)} kWh`,colorClass:"analysis-progress-fill-warn"})))}
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
                      <td>${xt(a.iso)}</td>
                      <td>${u(a.gridKw,2)} kW</td>
                      <td>${u(a.referenceKw,2)} kW</td>
                      <td>${u(a.overKw,2)} kW</td>
                      <td>${u(a.solarKw,2)} kW</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `:'<div class="analysis-empty">No reference exceedance was recorded in this period.</div>'}
      </div>
    </div>
  `}function _s(t,e,s){var n,l;if(e.analysisComparisonLoading)return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${lt(e)}</p>
          </div>
        </div>
        <div class="analysis-empty">Loading comparison period...</div>
      </div>
    `;if(!((n=e.analysisComparison)!=null&&n.consumptionTimeseries)||!((l=e.analysisComparison)!=null&&l.productionTimeseries))return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">A matched previous period is shown here when enough historic data is available.</p>
          </div>
        </div>
        <div class="analysis-empty">Comparison data is unavailable for the selected range.</div>
      </div>
    `;const a=Mt(e.analysisComparison.consumptionTimeseries,e.analysisComparison.productionTimeseries,s),r=Math.max(t.daily.length,a.daily.length,1),o=Array.from({length:r},(c,h)=>`D${h+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Period Comparison</h3>
          <p class="analysis-card-copy">${lt(e)}</p>
        </div>
      </div>
      <div class="analysis-compare-grid">
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">House usage</span>
          <strong>${u(t.totals.houseKwh)} kWh</strong>
          <span class="analysis-compare-delta">${De(t.totals.houseKwh-a.totals.houseKwh)} kWh vs previous</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Net grid usage</span>
          <strong>${u(t.totals.gridKwh)} kWh</strong>
          <span class="analysis-compare-delta">${De(t.totals.gridKwh-a.totals.gridKwh)} kWh vs previous</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar coverage</span>
          <strong>${u(t.totals.coveragePct,1)}%</strong>
          <span class="analysis-compare-delta">${De(t.totals.coveragePct-a.totals.coveragePct)} pts vs previous</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar value</span>
          <strong>${U(t.totals.solarValue,s.currency||"EUR")}</strong>
          <span class="analysis-compare-delta">${De(t.totals.solarValue-a.totals.solarValue,2)} ${s.currency||"EUR"} vs previous</span>
        </div>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Usage by day index</h4>
        ${le({title:"Current versus previous usage",series:[{label:"Current",color:"#f85149",values:t.daily.map(c=>c.houseKwh)},{label:"Previous",color:"#58a6ff",values:a.daily.map(c=>c.houseKwh),dashed:!0}],labels:o,valueFormatter:c=>`${u(c,1)} kWh`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day index</h4>
        ${le({title:"Current versus previous solar value",series:[{label:"Current",color:"#3fb950",values:t.daily.map(c=>c.solarValue)},{label:"Previous",color:"#d29922",values:a.daily.map(c=>c.solarValue),dashed:!0}],labels:o,valueFormatter:c=>U(c,s.currency||"EUR")})}
      </div>
    </div>
  `}function xs(t,e){return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Tariff-Aware Cost Trends</h3>
          <p class="analysis-card-copy">Estimated variable import cost, solar savings, export earnings, and exceedance cost by day. Fixed monthly fees are intentionally left out so this stays behavior-driven.</p>
        </div>
      </div>
      ${le({title:"Daily cost and value trends",series:[{label:"Import cost",color:"#f85149",values:t.daily.map(s=>s.importCost)},{label:"Solar savings",color:"#3fb950",values:t.daily.map(s=>s.solarSavings)},{label:"Export earnings",color:"#58a6ff",values:t.daily.map(s=>s.exportRevenue)},{label:"Exceedance cost",color:"#d29922",values:t.daily.map(s=>s.exceedanceCost)}],labels:t.daily.map(s=>s.label),valueFormatter:s=>U(s,e)})}
      <div class="analysis-cost-totals">
        <span>Import cost: <strong>${U(t.totals.importCost,e)}</strong></span>
        <span>Solar savings: <strong>${U(t.totals.solarSavings,e)}</strong></span>
        <span>Export earnings: <strong>${U(t.totals.exportRevenue,e)}</strong></span>
        <span>Exceedance cost: <strong>${U(t.totals.exceedanceCost,e)}</strong></span>
      </div>
    </div>
  `}function ks(t,e){const s=Array.from({length:Math.max(t.loadDurationGrossKw.length,t.loadDurationNetKw.length,1)},(a,r)=>`${r+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Load Duration Curve</h3>
          <p class="analysis-card-copy">Gross house load and net grid load sorted from highest to lowest interval. This shows how often high demand really occurs and how much solar trims the top end.</p>
        </div>
      </div>
      ${le({title:"Load duration curve",series:[{label:"Gross house load",color:"#f85149",values:t.loadDurationGrossKw},{label:"Net grid load",color:"#58a6ff",values:t.loadDurationNetKw}],labels:s,referenceValue:e>0?e:void 0,referenceLabel:e>0?`Reference ${u(e,1)} kW`:void 0,valueFormatter:a=>`${u(a,1)} kW`})}
      <p class="analysis-note">Intervals are ordered from highest demand to lowest, so the left side is your hardest-to-handle load.</p>
    </div>
  `}function Cs(t){const e=t.config,s=t.rangeData,a=t.consumptionTimeseries,r=t.productionTimeseries;if(!e||!s||!a||!r)return`
      <section class="analysis-view">
        <div class="card">
          <p class="muted">Loading analysis data...</p>
        </div>
      </section>
    `;const o=Mt(a,r,e),n=e.currency||"EUR";return`
    <section class="analysis-view">
      <div class="section-header analysis-section-header">
        <div>
          <span class="badge">Analysis</span>
          <h2>Charts and Optimization</h2>
          <p class="muted">Deeper electricity analysis for ${us(t)}. This page is built from the same 15-minute data and billing settings that drive the dashboard and invoice.</p>
        </div>
        <div class="analysis-header-meta">
          <span>${ps(t)}</span>
          <span>${u(o.daily.length,0)} day${o.daily.length===1?"":"s"} analysed</span>
        </div>
      </div>

      ${vs(t)}
      ${fs(o,n)}
      ${ys(o)}

      <div class="analysis-grid">
        ${ws(t,o)}
        ${$s(o,n)}
      </div>

      <div class="analysis-grid">
        ${bs(o,n)}
        ${_s(o,t,e)}
      </div>

      <div class="analysis-grid">
        ${xs(o,n)}
        ${ks(o,e.reference_power_kw??0)}
      </div>
    </section>
  `}const dt={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function Ss(t){return dt[t]?dt[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function Ms(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],s=[],a=[],r=[],o=[];for(const l of t.sensors){const c=l.key;c.startsWith("c_")||c==="1-1:1.29.0"||c==="1-1:3.29.0"?e.push(l):c.startsWith("p_")||c==="1-1:2.29.0"||c==="1-1:4.29.0"?s.push(l):c.startsWith("s_")||c.startsWith("1-65:")?a.push(l):c.startsWith("g_")||c.startsWith("7-")?r.push(l):o.push(l)}const n=(l,c,h,p)=>h.length?`
      <div class="card sensor-group">
        <h3 class="card-title"><span class="title-icon">${c}</span> ${l} <span class="badge">${h.length}</span></h3>
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
              ${h.map(m=>`
                <tr>
                  <td class="sensor-name">${Ss(m.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${p});">${u(m.value)}</td>
                  <td class="sensor-unit">${m.unit}</td>
                  <td class="sensor-peak">${m.peak_timestamp?xt(m.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
      ${n("Energy Production","☀️",s,"production")}
      ${n("Energy Sharing","🔗",a,"self")}
      ${n("Gas","🔥",r,"gas")}
      ${n("Other","📊",o,"text")}
    </section>
  `}function Ie(t,e){return Number.isFinite(t)?Number(t):e}function Dt(t){const e=(t.meters??[]).filter(r=>r.types.includes("production")),s=t.feed_in_rates??[],a=t.currency??"EUR";return e.map((r,o)=>{const n=s.find(p=>p.meter_id===r.id),l=(n==null?void 0:n.mode)==="sensor"&&n.sensor_value!=null&&Number.isFinite(n.sensor_value),c=l?(n==null?void 0:n.sensor_value)??0:Ie(n==null?void 0:n.tariff,Ie(t.feed_in_tariff,0)),h=Math.max(1,Math.round(Ie(n==null?void 0:n.self_use_priority,o+1)));return{meterId:r.id,shortId:r.id?"…"+r.id.slice(-8):`Meter ${o+1}`,rate:c,label:l?`Sensor (${c.toFixed(4)} ${a}/kWh)`:"Fixed tariff",mode:(n==null?void 0:n.mode)??"fixed",selfUsePriority:h}}).sort((r,o)=>r.selfUsePriority!==o.selfUsePriority?r.selfUsePriority-o.selfUsePriority:r.meterId.localeCompare(o.meterId))}function Ds(t,e,s,a,r){var $;if(!e||!(s!=null&&s.length))return null;const o=Dt(t);if(!o.length)return null;const n=new Map(s.map(d=>[d.meter_id,d]));if(!o.some(d=>n.has(d.meterId)))return null;const l=o.map(d=>({...d,producedKwh:0,selfConsumedKwh:0,exportedKwh:0,revenue:0,exportEquivalentForSelfUse:0})),c=new Map(l.map((d,v)=>[d.meterId,v])),h=new Map,p=new Set;for(const d of e.items)d.startedAt&&p.add(d.startedAt);const m=new Map;for(const d of e.items){const v=Math.max(0,Number(d.value)||0);m.set(d.startedAt,(m.get(d.startedAt)??0)+v)}for(const d of s){const v=new Map;for(const D of d.items??[]){const W=Math.max(0,Number(D.value)||0);v.set(D.startedAt,(v.get(D.startedAt)??0)+W),D.startedAt&&p.add(D.startedAt)}h.set(d.meter_id,v)}for(const d of[...p].sort()){let v=Math.max(0,m.get(d)??0);for(const D of l){const W=c.get(D.meterId);if(W==null)continue;const P=Math.max(0,(($=h.get(D.meterId))==null?void 0:$.get(d))??0),K=P*.25,N=Math.min(v,P),L=N*.25,A=Math.max(0,P-N)*.25;l[W].producedKwh+=K,l[W].selfConsumedKwh+=L,l[W].exportedKwh+=A,v=Math.max(0,v-N)}}const i=l.reduce((d,v)=>d+v.selfConsumedKwh,0),f=l.reduce((d,v)=>d+v.exportedKwh,0),g=Math.max(0,a??i),y=Math.max(0,r??f),k=i>0?g/i:1,b=f>0?y/f:1;for(const d of l)d.selfConsumedKwh*=k,d.exportedKwh*=b,d.revenue=d.exportedKwh*d.rate,d.exportEquivalentForSelfUse=d.selfConsumedKwh*d.rate;const S=l.reduce((d,v)=>d+v.revenue,0),x=l.reduce((d,v)=>d+v.exportEquivalentForSelfUse,0),C=y>0?S/y:0;return{meters:l,totalFeedInRevenue:S,totalSelfUseExportEquivalent:x,weightedExportRate:C,usedPriorityAllocation:!0}}const ut=[{kw:3,fixedMonthlyFee:7.42},{kw:7,fixedMonthlyFee:12.84},{kw:12,fixedMonthlyFee:19.61},{kw:17,fixedMonthlyFee:26.39},{kw:27,fixedMonthlyFee:39.94},{kw:43,fixedMonthlyFee:61.62},{kw:70,fixedMonthlyFee:98.2},{kw:100,fixedMonthlyFee:138.85},{kw:150,fixedMonthlyFee:206.6,existingContractsOnly:!0},{kw:200,fixedMonthlyFee:274.35,existingContractsOnly:!0}];function Ee(t){if(!t)return null;const e=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(e){const[,a,r,o]=e;return new Date(Number(a),Number(r)-1,Number(o))}const s=new Date(t);return Number.isNaN(s.getTime())?null:new Date(s.getFullYear(),s.getMonth(),s.getDate())}function pt(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function Es(t,e,s,a,r){const o=new Date,n=Ee(a),l=Ee(r);let c=n,h=l;if(!c||!h)switch(t){case"yesterday":{const g=new Date(o);g.setDate(g.getDate()-1),c=new Date(g.getFullYear(),g.getMonth(),g.getDate()),h=new Date(c);break}case"this_week":{const g=new Date(o),y=g.getDay()||7;c=new Date(g.getFullYear(),g.getMonth(),g.getDate()-y+1),h=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_week":{const g=new Date(o),y=g.getDay()||7,k=new Date(g.getFullYear(),g.getMonth(),g.getDate()-y+1);c=new Date(k.getFullYear(),k.getMonth(),k.getDate()-7),h=new Date(k.getFullYear(),k.getMonth(),k.getDate()-1);break}case"this_month":{c=new Date(o.getFullYear(),o.getMonth(),1),h=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_month":{c=new Date(o.getFullYear(),o.getMonth()-1,1),h=new Date(o.getFullYear(),o.getMonth(),0);break}case"this_year":{c=new Date(o.getFullYear(),0,1),h=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_year":{c=new Date(o.getFullYear()-1,0,1),h=new Date(o.getFullYear()-1,11,31);break}case"custom":{c=Ee(e)??new Date(o.getFullYear(),o.getMonth(),o.getDate()),h=Ee(s)??new Date(c);break}default:{c=new Date(o.getFullYear(),o.getMonth(),o.getDate()-1),h=new Date(c);break}}if(h<c){const g=c;c=h,h=g}let p=0,m=0;const i=new Date(c);for(;i<=h;){const g=new Date(i.getFullYear(),i.getMonth()+1,0).getDate();m+=1/g,p+=1,i.setDate(i.getDate()+1)}const f=c.getFullYear()===h.getFullYear()&&c.getMonth()===h.getMonth()&&c.getDate()===1&&h.getDate()===new Date(h.getFullYear(),h.getMonth()+1,0).getDate();return{days:p,factor:m,label:f?"full month":`${p} day${p===1?"":"s"}`}}function Ts(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function ht(t){const[e,s]=t.split(":").map(a=>parseInt(a,10)||0);return e*60+s}function Et(t,e,s,a){if(!Ts(t.getDay(),e))return!1;const r=t.getHours()*60+t.getMinutes(),o=ht(s),n=ht(a);return o===n?!0:o<n?r>=o&&r<n:r>=o||r<n}function Ws(t,e){return e.find(s=>Et(t,s.day_group,s.start_time,s.end_time))}function Ps(t,e){return e.find(s=>Et(t,s.day_group,s.start_time,s.end_time))}function mt(t,e,s,a,r,o=[]){var f;const n=new Map;let l=0,c=0,h=0,p=0,m=0;const i=new Map;for(const g of o){const y=Number(g.value)||0;i.set(g.startedAt,(i.get(g.startedAt)??0)+y)}for(const g of t){const y=Number(g.value)||0,k=y*.25,b=i.get(g.startedAt)??0,S=Math.max(0,y-b),x=new Date(g.startedAt);if(Number.isNaN(x.getTime()))continue;const C=Ws(x,a),$=Ps(x,r),d=(C==null?void 0:C.rate)??e,v=((f=C==null?void 0:C.label)==null?void 0:f.trim())||"Base tariff",D=($==null?void 0:$.reference_power_kw)??s;l+=k*d,m=Math.max(m,y),p=Math.max(p,S),y>D&&(h+=(y-D)*.25),S>D&&(c+=(S-D)*.25);const W=`${v}__${d}`,P=n.get(W);P?P.kwh+=k:n.set(W,{label:v,rate:d,kwh:k})}return{energyCost:l,exceedanceKwh:c,grossExceedanceKwh:h,avoidedExceedanceKwh:Math.max(0,h-c),peakPowerKw:p,grossPeakPowerKw:m,rateBreakdown:Array.from(n.values()).sort((g,y)=>g.label.localeCompare(y.label))}}function Fs(t){var et,tt;const e=t.config,s=t.rangeData;if(!e||!s)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const a=s.consumption||0,r=s.production||0,o=s.exported||0,n=Math.max(0,o),l=Math.max(0,s.solar_to_home??s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:r-n)),c=Math.max(0,s.grid_import??a-l),h=s.peak_power_kw||0,p=e.reference_power_kw||5,m=s.exceedance_kwh||0,i=s.gas_energy||0,f=s.gas_volume||0,g=i>0||f>0,y=e.consumption_rate_windows??[],k=e.reference_power_windows??[],b=t.consumptionTimeseries?mt(t.consumptionTimeseries.items,e.energy_variable_rate,p,y,k,((et=t.productionTimeseries)==null?void 0:et.items)??[]):null,S=y.length>0&&!!b&&Math.abs(c-a)<.01,x=k.length>0&&!!b,C=b?b.peakPowerKw:h,$=b?b.exceedanceKwh:m,d=pt(s.start??t.customStart),v=pt(s.end??t.customEnd),{days:D,factor:W,label:P}=Es(t.range,t.customStart,t.customEnd,s.start,s.end),K=e.energy_fixed_fee*W,N=e.network_metering_rate*W,L=e.network_power_ref_rate*W,A=S?b.energyCost:c*e.energy_variable_rate,se=c*e.network_variable_rate,B=$*e.exceedance_rate,ce=e.meter_monthly_fees??[],z=ce.reduce((w,G)=>w+(G.fee||0),0)*W,me=c*e.compensation_fund_rate,ge=c*e.electricity_tax_rate,de=Math.max(0,e.connect_discount??0)*W,oe=K+A+N+L+se+B+z+me+ge-de,ve=oe*e.vat_rate,H=oe+ve,ae=Dt(e),Y=Ds(e,t.consumptionTimeseries,((tt=t.perMeterProductionTimeseries)==null?void 0:tt.meters)??null,l,n),fe=ae.filter(w=>isFinite(w.rate)&&w.rate>0),J=ae.length>1,ie=Y?Y.weightedExportRate:fe.length>0?fe.reduce((w,G)=>w+G.rate,0)/fe.length:e.feed_in_tariff,X=Y?Y.totalFeedInRevenue:n*ie,ye=J&&ae.length>0?n/ae.length:n,_=Y?Y.meters:ae.map(w=>({...w,producedKwh:0,exportedKwh:ye,revenue:ye*w.rate,selfConsumedKwh:0,exportEquivalentForSelfUse:0})),T=!!Y,E=l,V=E*(e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate),I=V*e.vat_rate,j=V+I,Q=Y?Y.totalSelfUseExportEquivalent:E*ie,ee=j-Q,te=Math.max(0,(b==null?void 0:b.avoidedExceedanceKwh)??0),xe=te*e.exceedance_rate,Ye=xe*e.vat_rate,we=xe+Ye,ke=te>1e-4,Ce=j+we+X,We=H-X,je=(e.gas_fixed_fee??6.5)*W,qe=i*(e.gas_variable_rate??.055),Be=(e.gas_network_fee??4.8)*W,ze=i*(e.gas_network_variable_rate??.012),Xe=i*(e.gas_tax_rate??.001),Pe=je+qe+Be+ze+Xe,Ze=Pe*(e.gas_vat_rate??.08),Fe=Pe+Ze,R=e.currency||"EUR",M=w=>`${u(w,2)} ${R}`,Je=w=>`${w>0?"+":w<0?"-":""}${u(Math.abs(w),2)} ${R}`,F=w=>u(w,3),Qe=w=>u(w,3),Rt=T?`Compared with exporting the same ${F(E)} kWh using the configured PV self-use priority and each system's own feed-in tariff`:`Compared with selling the same ${F(E)} kWh at ${u(ie,4)} ${R}/kWh`,Re=ut.find(w=>Math.abs(w.kw-p)<.05),Kt=oe-L-B,Ke=b?ut.map(w=>{var at;const G=mt(t.consumptionTimeseries.items,e.energy_variable_rate,w.kw,y,k,((at=t.productionTimeseries)==null?void 0:at.items)??[]),$e=w.fixedMonthlyFee*W,Me=G.exceedanceKwh*e.exceedance_rate,st=(Kt+$e+Me)*(1+e.vat_rate);return{...w,fixedCharge:$e,exceedanceKwh:G.exceedanceKwh,exceedanceCharge:Me,total:st,deltaVsCurrent:st-H}}):[],Se=Ke.reduce((w,G)=>!w||G.total<w.total?G:w,null),Lt=w=>Math.abs(w)<.005?"Current total":`${w>0?"+":"-"}${M(Math.abs(w))}`,Le=s.start&&s.end?`${ne(s.start)} — ${ne(s.end)}`:t.range.replace("_"," ").replace(/\b\w/g,w=>w.toUpperCase()),Vt=$>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${u(C,1)} kW</strong> &mdash; ${x?"Reference power windows active":`Reference power level: ${u(p,1)} kW`}</p>
        <p>Exceedance volume: <strong>${F($)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${M(B)}</p>
      </div>`:"",It=S?b.rateBreakdown.map(w=>`
            <tr>
              <td>${w.label} (${F(w.kwh)} kWh)</td>
              <td style="text-align: right;">${u(w.rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${M(w.kwh*w.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Supplier rate (${F(c)} kWh bought from grid)</td>
              <td style="text-align: right;">${u(e.energy_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${M(A)}</td>
            </tr>
          `,At=x?`Reference power windows active (${k.length})`:`${u(p,1)} kW`,Ht=S?`Time-of-use windows active (${y.length})`:`${u(e.energy_variable_rate,4)} ${R}/kWh`,Nt=Ke.map(w=>{const G=!!Se&&w.kw===Se.kw,$e=!!Re&&w.kw===Re.kw,Me=w.deltaVsCurrent<-.005?"comparison-delta-savings":w.deltaVsCurrent>.005?"comparison-delta-extra":"";return`
            <tr class="${G?"reference-power-best-row":""}${$e?" reference-power-current-row":""}">
              <td>
                <div class="reference-level-cell">
                  <span class="reference-level-kw">${u(w.kw,0)} kW</span>
                  ${G?'<span class="reference-level-badge best">Financially optimal</span>':""}
                  ${$e?'<span class="reference-level-badge current">Current</span>':""}
                  ${w.existingContractsOnly?'<span class="reference-level-badge legacy">Existing contracts</span>':""}
                </div>
              </td>
              <td style="text-align: right;">${M(w.fixedCharge)}</td>
              <td style="text-align: right;">${M(w.exceedanceCharge)}</td>
              <td style="text-align: right;"><strong>${M(w.total)}</strong></td>
              <td class="${Me}" style="text-align: right;">${Lt(w.deltaVsCurrent)}</td>
            </tr>
          `}).join(""),Gt=Ke.length>0?`
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${x?"Configured reference power windows stay active in this comparison.":"One reference power level is applied to the full selected period."}
              ${Re?"":`Your current configuration uses ${u(p,1)} kW, which is outside the standard Creos low-voltage reference power levels.`}
            </p>
          </div>
          ${Se?`<div class="reference-power-optimum">
                <span class="reference-level-badge best">Financially optimal: ${u(Se.kw,0)} kW</span>
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
            ${Nt}
          </tbody>
        </table>
      </div>
    `:`
      <div class="card reference-power-card">
        <p class="muted">Reference power level comparison requires 15-minute load-curve data for the selected period.</p>
      </div>
    `,Ot=`
      <div class="range-selector">
        ${_e.map(w=>`
          <button
            class="range-btn ${w.id===t.range?"active":""}"
            data-range="${w.id}"
          >${w.label}</button>
        `).join("")}
      </div>
    `,Ut=s.start&&s.end?(()=>{const w=new Date(s.start),G=new Date(s.end);return Number.isNaN(w.getTime())||Number.isNaN(G.getTime())?"":`
        <div class="range-info-bar">
          Period: ${w.toLocaleDateString()} - ${G.toLocaleDateString()}
        </div>
      `})():"",Yt=t.range==="custom"?`
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
      ${Ot}
      ${Ut}
      ${Yt}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Invoice Estimate &mdash; ${Le}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the currently selected period.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${F(a)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${F(c)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${F(r)} kWh produced</span>
          ${n>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${F(n)} kWh exported</span>`:""}
          ${g?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${F(i)} kWh gas (${Qe(f)} m³)</span>`:""}
        </div>
      </div>

      ${Vt}

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
              <td>Fixed Fee <span class="muted">(${P})</span></td>
              <td style="text-align: right;">${u(e.energy_fixed_fee,2)} ${R}/mo</td>
              <td style="text-align: right;">${M(K)}</td>
            </tr>
            ${It}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${P})</span></td>
              <td style="text-align: right;">${u(e.network_metering_rate,2)} ${R}/mo</td>
              <td style="text-align: right;">${M(N)}</td>
            </tr>
            <tr>
              <td>Reference power level (${At}) <span class="muted">(${P})</span></td>
              <td style="text-align: right;">${u(e.network_power_ref_rate,2)} ${R}/mo</td>
              <td style="text-align: right;">${M(L)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${F(c)} kWh bought from grid)</td>
              <td style="text-align: right;">${u(e.network_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${M(se)}</td>
            </tr>
            <tr class="${$>0?"exceedance-row":""}">
              <td>Exceedance charge (${F($)} kWh above the reference power level)</td>
              <td style="text-align: right;">${u(e.exceedance_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${M(B)}</td>
            </tr>

            ${ce.filter(w=>w.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${ce.filter(w=>w.fee>0).map(w=>`
            <tr>
              <td>${w.label||"…"+w.meter_id.slice(-8)} <span class="muted">(${P})</span></td>
              <td style="text-align: right;">${u(w.fee,2)} ${R}/mo</td>
              <td style="text-align: right;">${M(w.fee*W)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${u(e.compensation_fund_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${M(me)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${u(e.electricity_tax_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${M(ge)}</td>
            </tr>
            ${de>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            <tr>
              <td>Monthly Discount <span class="muted">(${P})</span></td>
              <td style="text-align: right;">-${u(Math.max(0,e.connect_discount??0),2)} ${R}/mo</td>
              <td style="text-align: right;">-${M(de)}</td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${M(oe)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${u(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${M(ve)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Costs</strong></td>
              <td style="text-align: right;"><strong>${M(H)}</strong></td>
            </tr>

            ${r>0?`
            <tr class="section-label revenue-section"><td colspan="3">Solar Savings & Feed-in Revenue</td></tr>
            <tr class="revenue-row">
              <td>Solar produced</td>
              <td style="text-align: right;">Total generation during this period</td>
              <td style="text-align: right;">${F(r)} kWh</td>
            </tr>
            <tr class="revenue-row">
              <td>Autoconsumed / used at home</td>
              <td style="text-align: right;">${F(E)} kWh avoided grid purchases</td>
              <td style="text-align: right;">${M(j)} saved</td>
            </tr>
            <tr class="revenue-row">
              <td>Export sold</td>
              <td style="text-align: right;">${F(n)} kWh sent to grid</td>
              <td style="text-align: right;">${M(X)} earned</td>
            </tr>
            ${ke?`
            <tr class="revenue-row">
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${F(te)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${M(we)} saved</td>
            </tr>
            `:""}
            ${n>0?`
            <tr class="section-label"><td colspan="3">Credit Calculation</td></tr>
            ${_.map(w=>`
            <tr class="revenue-row">
              <td>Exported (${J?w.shortId:F(w.exportedKwh)+" kWh"})</td>
              <td style="text-align: right;">${F(w.exportedKwh)} kWh<br/>${w.label}<br/>${u(w.rate,4)} ${R}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${M(w.revenue)}</td>
            </tr>
            `).join("")}
            ${J?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${F(n)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${u(ie,4)} ${R}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${M(X)}</td>
            </tr>
            `:""}
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total saved / earned thanks to solar</strong></td>
              <td style="text-align: right;"><strong>${M(Ce)}</strong></td>
            </tr>
            <tr class="net-total-row">
              <td colspan="2"><strong>Net Balance</strong></td>
              <td style="text-align: right;"><strong>${M(We)}</strong></td>
            </tr>
            `:""}
            ${n<=0?`
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total saved / earned thanks to solar</strong></td>
              <td style="text-align: right;"><strong>${M(Ce)}</strong></td>
            </tr>
            `:""}
            `:""}
          </tbody>
        </table>
      </div>

      ${Gt}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${F(c)} kWh), not total home usage.
          Supplier pricing: ${Ht}.
          Fixed monthly charges are prorated across the viewed period (${D} days, ${P}, equivalent to ${u(W,2)} monthly charges).
          Peak load (${u(C,1)} kW) is compared against ${x?"your configured reference power windows":`your reference power level (${u(p,1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${u(e.exceedance_rate,4)} ${R}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${g?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${Le}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${F(i)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${Qe(f)} m³</span>
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
              <td>Fixed Fee <span class="muted">(${P})</span></td>
              <td style="text-align: right;">${u(e.gas_fixed_fee??6.5,2)} ${R}/mo</td>
              <td style="text-align: right;">${M(je)}</td>
            </tr>
            <tr>
              <td>Energy (${F(i)} kWh)</td>
              <td style="text-align: right;">${u(e.gas_variable_rate??.055,4)} ${R}/kWh</td>
              <td style="text-align: right;">${M(qe)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${P})</span></td>
              <td style="text-align: right;">${u(e.gas_network_fee??4.8,2)} ${R}/mo</td>
              <td style="text-align: right;">${M(Be)}</td>
            </tr>
            <tr>
              <td>Network Variable (${F(i)} kWh)</td>
              <td style="text-align: right;">${u(e.gas_network_variable_rate??.012,4)} ${R}/kWh</td>
              <td style="text-align: right;">${M(ze)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${F(i)} kWh)</td>
              <td style="text-align: right;">${u(e.gas_tax_rate??.001,4)} ${R}/kWh</td>
              <td style="text-align: right;">${M(Xe)}</td>
            </tr>

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${M(Pe)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${u((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${M(Ze)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${M(Fe)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Energy Total: ${M(We+Fe)}</strong>
          (Electricity: ${M(We)} + Gas: ${M(Fe)})
        </p>
      </div>
      `:""}

      ${r>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Revenue &mdash; ${Le}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${M(Ce)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${F(r)} kWh</div>
            <div class="solar-stat-label">Solar produced</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${M(j)}</div>
            <div class="solar-stat-label">Saved by autoconsuming ${F(E)} kWh</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${Je(ee)}</div>
            <div class="solar-stat-label">Extra value from using it yourself instead of selling it</div>
          </div>
          ${ke?`
          <div class="solar-stat">
            <div class="solar-stat-value">${M(we)}</div>
            <div class="solar-stat-label">Saved by staying under the reference power</div>
          </div>
          `:""}
          <div class="solar-stat">
            <div class="solar-stat-value">${M(X)}</div>
            <div class="solar-stat-label">Earned by selling ${F(n)} kWh</div>
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
              <td style="text-align: right;">${F(r)} kWh</td>
            </tr>
            <tr>
              <td>Autoconsumed / used at home</td>
              <td style="text-align: right;">${F(E)} kWh avoided grid purchases</td>
              <td style="text-align: right;">${M(j)} saved</td>
            </tr>
            <tr>
              <td>Extra vs exporting instead</td>
              <td style="text-align: right;">${Rt}</td>
              <td style="text-align: right;">${Je(ee)}</td>
            </tr>
            <tr>
              <td>Export sold</td>
              <td style="text-align: right;">${F(n)} kWh sent to grid</td>
              <td style="text-align: right;">${M(X)} earned</td>
            </tr>
            ${ke?`
            <tr>
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${F(te)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${M(we)} saved</td>
            </tr>
            `:""}

            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${F(E)} kWh)</td>
              <td style="text-align: right;">${u(e.energy_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${M(E*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${u(e.network_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${M(E*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${u(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${M(E*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${u(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${M(I)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${M(j)}</strong></td>
            </tr>

            ${ke?`
            <tr class="section-label"><td colspan="3">Reference Power Savings</td></tr>
            <tr>
              <td>Exceedance avoided</td>
              <td style="text-align: right;">${F(te)} kWh above the reference power level</td>
              <td style="text-align: right;">${M(xe)}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${u(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${M(Ye)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Reference Power Savings</strong></td>
              <td style="text-align: right;"><strong>${M(we)}</strong></td>
            </tr>
            `:""}

            ${n>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${_.map(w=>`
            <tr>
              <td>Sold to grid ${J?`(${w.shortId})`:`(${F(w.exportedKwh)} kWh)`}</td>
              <td style="text-align: right;">${F(w.exportedKwh)} kWh<br/>${w.label}<br/>${u(w.rate,4)} ${R}/kWh${T&&J?`<br/>Self-use priority ${w.selfUsePriority}`:""}</td>
              <td style="text-align: right;">${M(w.revenue)}</td>
            </tr>
            `).join("")}
            ${J?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${M(X)}</strong></td>
            </tr>
            `:""}
            `:""}

            <tr class="total-row solar-total-row">
              <td colspan="2"><strong>💰 Total Solar Panel Value</strong></td>
              <td style="text-align: right;"><strong>${M(Ce)}</strong></td>
            </tr>
          </tbody>
        </table>

        <p class="muted" style="margin-top: var(--sp-3); font-size: var(--text-xs); line-height: var(--lh-relaxed);">
          Self-consumption savings = energy you produced and used yourself instead of buying from the grid.
          Extra vs exporting instead = how much more or less those self-consumed kWh were worth compared with selling them at the feed-in rate.
          These savings are informational here and already reflected in the main invoice because only grid-imported energy is billed.
          Reference-power savings = exceedance charges avoided because solar reduced the net load seen against your reference power during the same 15-minute interval.
          Feed-in revenue = money earned by selling surplus production.
          ${ae.some(w=>w.mode==="sensor")?"Market price sourced from Home Assistant sensor.":"Using fixed feed-in tariff — configure a market price sensor in Settings for real-time rates."}
          ${T?"Per-system self-consumption and export are allocated from each PV system's 15-minute production using the configured self-use priority (1 = consumed first at home).":J?"Displayed per-meter feed-in kWh are currently equal-split estimates because per-meter production data was not available for this view.":""}
        </p>
      </div>
      `:""}
    </section>
  `}const Rs=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],Ks=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Reference Power Fixed Charge",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"connect_discount",label:"Monthly Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],Ls={consumption:"Power Consumption",production:"Power Production",gas:"Gas Consumption"},Tt={consumption:"⚡",production:"☀️",gas:"🔥"};function Vs(t){return t.map(e=>`<span class="meter-type-badge meter-type-${e}">${Tt[e]??""} ${Ls[e]??e}</span>`).join(" ")}function gt(t,e,s){const a=t+1;return s?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${a}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${Vs(e.types)}</div>
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
  `}function Wt(t){return Rs.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function Is(t,e){return`
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
            ${Wt(e.day_group??"all")}
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
  `}function As(t,e){return`
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
            ${Wt(e.day_group??"all")}
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
  `}function Hs(t,e="ha",s){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const a=e==="standalone"?(s==null?void 0:s.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let r="";if(e==="standalone"){const $=a.map((v,D)=>gt(D,v,!1)).join("");s==null||s.proxy_url,r=`
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
              For each meter, select what it measures. A single bidirectional meter can handle both consumption and production.
            </p>
            <div id="meters-container">
              ${$}
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
    `}else{const $=(t==null?void 0:t.meters)??[];r=`
      <div class="card" style="margin-bottom: var(--sp-6); padding: var(--sp-4) var(--sp-5);">
        <p class="muted" style="margin: 0 0 var(--sp-3) 0;">🔒 API credentials are managed through Home Assistant &rarr; Settings &rarr; Integrations &rarr; Leneda</p>
        <div class="form-section">
          <div class="form-section-title">📊  Configured Metering Points</div>
          <div id="meters-container">
            ${$.length>0?$.map((v,D)=>gt(D,v,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const o=$=>$.map(d=>{const v=t?t[d.key]??"":"";return`
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
      `}).join(""),n=((t==null?void 0:t.meters)??[]).filter($=>$.types.includes("production")),l=(t==null?void 0:t.feed_in_rates)??[],c=e==="ha";function h($){return l.find(d=>d.meter_id===$)??{meter_id:$,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:"",self_use_priority:n.findIndex(d=>d.id===$)+1}}const p=n.length===0?'<p class="muted">No production meters configured — add a meter with Power Production type above.</p>':n.map(($,d)=>{const v=h($.id),D=$.id?"…"+$.id.slice(-8):`Meter ${d+1}`;return`
          <div class="feed-in-meter-card" data-meter-idx="${d}" data-meter-id="${$.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${D}</span>
              <input type="hidden" name="feed_in_rate_${d}_meter_id" value="${$.id}" />
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
                    placeholder="${c?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${c&&d===0?'<datalist id="ha-entity-list"></datalist>':""}
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
        `}).join(""),m=((t==null?void 0:t.meters)??[]).some($=>$.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),i=(t==null?void 0:t.consumption_rate_windows)??[],f=(t==null?void 0:t.reference_power_windows)??[],g=(t==null?void 0:t.meters)??[],y=(t==null?void 0:t.meter_monthly_fees)??[];function k($){return y.find(d=>d.meter_id===$)??{meter_id:$,label:"",fee:0}}const b=g.length===0?'<p class="muted">No meters configured.</p>':g.map(($,d)=>{const v=k($.id),D=$.id?"…"+$.id.slice(-8):`Meter ${d+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${$.types.map(P=>Tt[P]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${D}</code>
              <input type="hidden" name="meter_fee_${d}_meter_id" value="${$.id}" />
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
        `}).join(""),S=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional supplier-rate windows. Outside these windows, the base <strong>Energy Supplier → Variable Rate</strong> is used.
      Windows can cross midnight by setting an end time earlier than the start time.
    </p>
    <div id="consumption-windows-container">
      ${i.length>0?i.map(($,d)=>Is(d,$)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,x=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${f.length>0?f.map(($,d)=>As(d,$)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,C=Ks.map($=>{if($.title==="Gas Billing"&&!m||$.title==="Meter Fees"&&g.length<2)return"";let d;return $.title==="Feed-in / Selling"?d=p:$.title==="Time-of-Use Tariffs"?d=S:$.title==="Reference Power Windows"?d=x:$.title==="Discounts"?d=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as a monthly credit. The dashboard prorates it to the selected period and subtracts it before VAT.
      </p>`+o($.fields):$.title==="Meter Fees"?d=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+b:d=o($.fields),`
    <div class="form-section">
      <div class="form-section-title">${$.icon}  ${$.title}</div>
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
          ${t?C:'<p class="muted">Loading configuration…</p>'}
          ${t?`
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save Configuration</button>
            <button type="button" id="reset-config-btn" class="btn btn-outline">Reset to Defaults</button>
          </div>
          `:""}
        </form>
      </div>
    </section>
  `}function Ae(t,e,s=!1,a="dark",r=""){const o=[{id:"charts",label:"Charts",icon:"CH"},{id:"dashboard",label:"Dashboard",icon:"🏠"},{id:"sensors",label:"Sensors",icon:"📊"},{id:"invoice",label:"Invoice",icon:"💰"},{id:"settings",label:"Settings",icon:"⚙️"}];return`
    <header class="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-brand">
        <img src="/leneda-panel/static/logo.png" srcset="/leneda-panel/static/logo@2x.png 2x" alt="Leneda Logo" class="navbar-logo-img" />
        ${r?`<span class="navbar-badge">${r}</span>`:""}
 
        <button class="menu-toggle ${s?"open":""}" aria-label="Toggle menu" aria-expanded="${s}">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav class="navbar-tabs ${s?"mobile-open":""}" role="tablist">
        ${o.map(n=>`
          <button
            class="nav-btn ${n.id===t?"active":""}"
            data-tab="${n.id}"
            role="tab"
            aria-selected="${n.id===t}"
            aria-controls="panel-${n.id}"
          >
            <span class="nav-icon" aria-hidden="true">${n.icon}</span>
            <span class="nav-label">${n.label}</span>
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
              <span class="theme-toggle-icon" aria-hidden="true">${a==="dark"?"☀️":"🌙"}</span>
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
  `}const Pt="leneda_credentials",Ft="leneda_theme";function Ns(){try{const t=localStorage.getItem(Pt);if(t)return JSON.parse(t)}catch{}return null}function He(t){try{localStorage.setItem(Pt,JSON.stringify(t))}catch{}}function Gs(){var t;try{const e=localStorage.getItem(Ft);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function Os(t){try{localStorage.setItem(Ft,t)}catch{}}function vt(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const[,s,a,r]=e;return new Date(Number(s),Number(a)-1,Number(r))}function ft(t){const e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${e}-${s}-${a}`}function Ne(t){const e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0"),r=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),n=String(t.getSeconds()).padStart(2,"0"),l=String(t.getMilliseconds()).padStart(3,"0"),c=-t.getTimezoneOffset(),h=c>=0?"+":"-",p=String(Math.floor(Math.abs(c)/60)).padStart(2,"0"),m=String(Math.abs(c)%60).padStart(2,"0");return`${e}-${s}-${a}T${r}:${o}:${n}.${l}${h}${p}:${m}`}function yt(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Us(t,e=new Date){switch(t){case"yesterday":{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const a=new Date(s);return a.setHours(23,59,59,999),{start:s,end:a}}case"this_week":{const s=new Date(e),a=s.getDay()||7;return s.setDate(s.getDate()-a+1),s.setHours(0,0,0,0),{start:s,end:e}}case"last_week":{const s=new Date(e),a=s.getDay()||7,r=new Date(s);r.setDate(s.getDate()-a),r.setHours(23,59,59,999);const o=new Date(r);return o.setDate(r.getDate()-6),o.setHours(0,0,0,0),{start:o,end:r}}case"this_month":return{start:new Date(e.getFullYear(),e.getMonth(),1),end:e};case"last_month":{const s=new Date(e.getFullYear(),e.getMonth()-1,1),a=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s,end:a}}case"this_year":return{start:new Date(e.getFullYear(),0,1),end:e};case"last_year":{const s=new Date(e.getFullYear()-1,0,1),a=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s,end:a}}}}function Ys(t,e,s=new Date){const a=vt(t),r=vt(e);if(!a||!r)return null;const o=["yesterday","this_week","last_week","this_month","last_month","this_year","last_year"];for(const n of o){const l=Us(n,s);if(yt(a,l.start)&&yt(r,l.end))return n}return null}class js{constructor(e){ue(this,"root");ue(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartViewportStart:null,chartViewportEnd:null,chartUnit:"kwh",chartConsumptionView:"grid",analysisHeatmapMetric:"grid",analysisComparison:null,analysisComparisonLoading:!1,rangeData:null,consumptionTimeseries:null,productionTimeseries:null,perMeterProductionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:Gs()});ue(this,"preZoomRange",null);ue(this,"preZoomCustomStart","");ue(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await $t();if(this.state.mode=e.mode,e.mode==="standalone"){const s=Ns();if(s&&(this.state.credentials=s),!e.configured&&!s){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&s)try{const{saveCredentials:a}=await Z(async()=>{const{saveCredentials:r}=await Promise.resolve().then(()=>re);return{saveCredentials:r}},void 0);await a(s)}catch{}if(!s)try{this.state.credentials=await bt()}catch{}}await this.loadData()}toDisplayError(e,s="Failed to load data"){const a=e instanceof Error?e.message:String(e??"").trim(),r=a.toLowerCase();return r.includes("missing data")||r.includes("no_data")||r.includes("no data")?"Missing data":a||s}clearRangeStateWithError(e,s="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.state.perMeterProductionTimeseries=null,this.clearChartViewport(),this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1,this.state.error=this.toDisplayError(e,s)}async fetchPerMeterProductionForRange(e,s,a){var o;if(((e==null?void 0:e.meters)??[]).filter(n=>n.types.includes("production")).length<=1)return null;try{const n=await Ge("1-1:2.29.0",s,a);return(o=n.meters)!=null&&o.length?n:null}catch(n){return console.warn("Per-meter production fetch failed:",n),null}}resetAnalysisComparison(){this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1}clearChartViewport(){this.state.chartViewportStart=null,this.state.chartViewportEnd=null}getCurrentRangeKey(){const{start:e,end:s}=this.getDateRangeISO();return`${e}|${s}`}getComparisonRangeISO(e,s){const a=new Date(e).getTime(),r=new Date(s).getTime(),o=Math.max(0,r-a),n=a-1,l=n-o;return{start:new Date(l).toISOString(),end:new Date(n).toISOString()}}async loadAnalysisComparison(e=!1){var n;if(!this.state.consumptionTimeseries||!this.state.productionTimeseries)return;const{start:s,end:a}=this.getDateRangeISO(),r=`${s}|${a}`;if(!e&&(this.state.analysisComparisonLoading||((n=this.state.analysisComparison)==null?void 0:n.key)===r))return;const o=this.getComparisonRangeISO(s,a);this.state.analysisComparisonLoading=!0,this.state.tab==="charts"&&this.renderPreserveMainScroll();try{const[l,c]=await Promise.all([q("1-1:1.29.0",o.start,o.end),q("1-1:2.29.0",o.start,o.end)]);if(r!==this.getCurrentRangeKey())return;this.state.analysisComparison={key:r,start:o.start,end:o.end,consumptionTimeseries:l,productionTimeseries:c}}catch(l){console.warn("Comparison data fetch failed:",l),r===this.getCurrentRangeKey()&&(this.state.analysisComparison=null)}finally{r===this.getCurrentRangeKey()&&(this.state.analysisComparisonLoading=!1,this.state.tab==="charts"&&this.renderPreserveMainScroll())}}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.clearChartViewport(),this.resetAnalysisComparison(),this.render();try{const[e,s,a]=await Promise.all([Te(this.state.range),Oe(),be()]),{start:r,end:o}=this.getDateRangeISO(),[n,l,c]=await Promise.all([q("1-1:1.29.0",r,o),q("1-1:2.29.0",r,o),this.fetchPerMeterProductionForRange(a,r,o)]);this.state.rangeData=e,this.state.consumptionTimeseries=n,this.state.productionTimeseries=l,this.state.perMeterProductionTimeseries=c,this.state.sensors=s,this.state.config=a}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async changeRange(e){if(this.preZoomRange=null,this.clearChartViewport(),this.state.range=e,this.resetAnalysisComparison(),e==="custom"){if(!this.state.customStart||!this.state.customEnd){const s=new Date;s.setDate(s.getDate()-1);const a=new Date(s);a.setDate(a.getDate()-6),this.state.customStart=ft(a),this.state.customEnd=ft(s)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:s,end:a}=this.getDateRangeISO(),[r,o,n]=await Promise.all([Te(e),q("1-1:1.29.0",s,a),q("1-1:2.29.0",s,a)]);this.state.rangeData=r,this.state.consumptionTimeseries=o,this.state.productionTimeseries=n}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async applyCustomRange(){this.preZoomRange=null,this.clearChartViewport();const{customStart:e,customEnd:s}=this.state;if(!(!e||!s)){this.state.error=null,this.state.loading=!0,this.resetAnalysisComparison(),this.render();try{const a=Ys(e,s),r=a?Te(a):Z(async()=>{const{fetchCustomData:i}=await Promise.resolve().then(()=>re);return{fetchCustomData:i}},void 0).then(({fetchCustomData:i})=>i(e,s)),o=this.state.config,n=Ne(new Date(e+"T00:00:00")),l=Ne(new Date(s+"T23:59:59.999")),[c,h,p,m]=await Promise.all([r,q("1-1:1.29.0",n,l),q("1-1:2.29.0",n,l),this.fetchPerMeterProductionForRange(o,n,l)]);this.state.rangeData={range:"custom",consumption:c.consumption,production:c.production,exported:c.exported??0,self_consumed:c.self_consumed??0,grid_import:c.grid_import,solar_to_home:c.solar_to_home,direct_solar_to_home:c.direct_solar_to_home,shared:c.shared,shared_with_me:c.shared_with_me,gas_energy:c.gas_energy??0,gas_volume:c.gas_volume??0,peak_power_kw:c.peak_power_kw??0,exceedance_kwh:c.exceedance_kwh??0,metering_point:c.metering_point??"",start:c.start??e,end:c.end??s},this.state.consumptionTimeseries=h,this.state.productionTimeseries=p,this.state.perMeterProductionTimeseries=m}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}}changeTab(e){this.state.tab=e,this.render(),(e==="dashboard"||e==="charts")&&!this.state.rangeData&&!this.state.loading&&this.loadData(),e==="charts"&&this.state.rangeData&&!this.state.analysisComparison&&!this.state.analysisComparisonLoading&&this.loadAnalysisComparison(),e==="sensors"&&!this.state.sensors&&Oe().then(s=>{this.state.sensors=s,this.render()}),e==="settings"&&!this.state.config&&be().then(s=>{this.state.config=s,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,Os(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}printInvoice(){var n,l;const e=document.title,a=`Leneda-invoice-${(n=this.state.rangeData)!=null&&n.start&&((l=this.state.rangeData)!=null&&l.end)?`${this.state.rangeData.start.slice(0,10)}_to_${this.state.rangeData.end.slice(0,10)}`:this.state.range}`.replace(/[^a-z0-9_-]+/gi,"-");let r=!1;const o=()=>{r||(r=!0,document.title=e,window.removeEventListener("afterprint",o))};document.title=a,window.addEventListener("afterprint",o,{once:!0}),window.print(),window.setTimeout(o,1e3)}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const s=this.root.querySelector(".main-content");s?s.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}getDataSourceLabel(){return this.state.mode==="ha"?"Home Assistant":"Standalone"}getHostedDataNoticeHtml(){var e;return(((e=this.state.credentials)==null?void 0:e.proxy_url)??"").trim().length>0,""}render(){var c;const{tab:e,loading:s,error:a,theme:r}=this.state,o=this.getDataSourceLabel(),n=this.getHostedDataNoticeHtml();if(s&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${Ae(e,h=>{},!1,r,o)}
          <main class="main-content">
            ${n}
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `,this.attachNavListeners();return}if(a&&!this.state.rangeData){const h=a.toLowerCase().includes("missing data");this.root.innerHTML=`
        <div class="app-shell">
          ${Ae(e,p=>{},!1,r,o)}
          <main class="main-content">
            ${n}
            <div class="error-state">
              <h2>${h?"Missing Data":"Connection Error"}</h2>
              <p>${h?"The selected period could not be loaded because data is missing.":a}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(c=this.root.querySelector("#retry-btn"))==null||c.addEventListener("click",()=>this.loadData());return}let l="";switch(e){case"dashboard":l=ss(this.state);break;case"charts":l=Cs(this.state);break;case"sensors":l=Ms(this.state.sensors);break;case"invoice":l=Fs(this.state);break;case"settings":l=Hs(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${Ae(e,h=>this.changeTab(h),this.state.isMenuOpen,r,o)}
        <main class="main-content">
          ${n}
          ${s?'<div class="loading-bar"></div>':""}
          ${l}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachAnalysisListeners(),this.attachInvoiceListeners(),this.attachSettingsListeners()}attachNavListeners(){var e,s;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(s=this.root.querySelector("[data-theme-toggle]"))==null||s.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.tab;this.changeTab(r)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(n=>{n.addEventListener("click",()=>{const l=n.dataset.range;this.changeRange(l)})});const s=this.root.querySelector("#custom-start"),a=this.root.querySelector("#custom-end");s&&s.addEventListener("change",()=>{this.state.customStart=s.value}),a&&a.addEventListener("change",()=>{this.state.customEnd=a.value});const r=this.root.querySelector("#apply-custom-range");if(r==null||r.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(n=>{n.addEventListener("click",()=>{const l=n.dataset.chartUnit;l!==this.state.chartUnit&&(this.state.chartUnit=l,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-view]").forEach(n=>{n.addEventListener("click",()=>{const l=n.dataset.chartView;l!==this.state.chartConsumptionView&&(this.state.chartConsumptionView=l,this.renderPreserveMainScroll())})}),!e){const n=this.root.querySelector("#energy-chart");n&&this.state.rangeData&&this.initChart(n)}const o=this.root.querySelector(".reset-zoom-btn");o==null||o.addEventListener("click",async()=>{const{resetChartZoom:n}=await Z(async()=>{const{resetChartZoom:l}=await import("./Charts-C6w_T9a3.js");return{resetChartZoom:l}},[]);if(n(),o.style.display="none",this.clearChartViewport(),this.preZoomRange!==null){const l=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",l==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(l)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachAnalysisListeners(){this.root.querySelectorAll("[data-analysis-heatmap]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisHeatmap;s!==this.state.analysisHeatmapMetric&&(this.state.analysisHeatmapMetric=s,this.renderPreserveMainScroll())})})}attachInvoiceListeners(){var e;(e=this.root.querySelector("#print-invoice-btn"))==null||e.addEventListener("click",()=>{this.printInvoice()})}attachSettingsListeners(){var c,h;const e=this.root.querySelector("#credentials-form");if(e){const p=this.root.querySelector("#add-meter-btn");p==null||p.addEventListener("click",()=>{var y,k,b;const f=new FormData(e),g=m(f);if(g.length<10){g.push({id:"",types:["consumption"]});const S={api_key:f.get("api_key")||((y=this.state.credentials)==null?void 0:y.api_key)||"",energy_id:f.get("energy_id")||((k=this.state.credentials)==null?void 0:k.energy_id)||"",meters:g,proxy_url:f.get("proxy_url")||((b=this.state.credentials)==null?void 0:b.proxy_url)||""};this.state.credentials=S,He(S),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach(f=>{f.addEventListener("click",()=>{var S,x,C;const g=parseInt(f.dataset.meter??"0",10),y=new FormData(e),k=m(y);k.splice(g,1);const b={api_key:y.get("api_key")||((S=this.state.credentials)==null?void 0:S.api_key)||"",energy_id:y.get("energy_id")||((x=this.state.credentials)==null?void 0:x.energy_id)||"",meters:k,proxy_url:y.get("proxy_url")||((C=this.state.credentials)==null?void 0:C.proxy_url)||""};this.state.credentials=b,He(b),this.renderPreserveMainScroll()})});const m=f=>{var y,k,b;const g=[];for(let S=0;S<10;S++){const x=f.get(`meter_${S}_id`);if(x===null)break;const C=[];(y=e.querySelector(`[name="meter_${S}_consumption"]`))!=null&&y.checked&&C.push("consumption"),(k=e.querySelector(`[name="meter_${S}_production"]`))!=null&&k.checked&&C.push("production"),(b=e.querySelector(`[name="meter_${S}_gas"]`))!=null&&b.checked&&C.push("gas"),g.push({id:x.trim(),types:C})}return g};e.addEventListener("submit",async f=>{f.preventDefault();const g=new FormData(e),y={api_key:g.get("api_key"),energy_id:g.get("energy_id"),meters:m(g),proxy_url:g.get("proxy_url")},k=this.root.querySelector("#creds-status");try{He(y);const{saveCredentials:b}=await Z(async()=>{const{saveCredentials:C}=await Promise.resolve().then(()=>re);return{saveCredentials:C}},void 0);await b(y),k&&(k.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=y,this.state.error=null;const S=!1,x=(y.proxy_url??"").trim();await this.loadData()}catch(b){k&&(k.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${b instanceof Error?b.message:b}</p>`)}});const i=this.root.querySelector("#test-creds-btn");i==null||i.addEventListener("click",async()=>{const f=new FormData(e),g={api_key:f.get("api_key"),energy_id:f.get("energy_id"),meters:m(f),proxy_url:f.get("proxy_url")},y=this.root.querySelector("#creds-status");y&&(y.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:k}=await Z(async()=>{const{testCredentials:S}=await Promise.resolve().then(()=>re);return{testCredentials:S}},void 0),b=await k(g);y&&(y.innerHTML=b.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${b.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${b.message}</p>`)}catch(k){y&&(y.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${k instanceof Error?k.message:k}</p>`)}})}const s=this.root.querySelector("#settings-form");if(!s)return;const a=p=>{const m=[];for(let i=0;i<24;i++){const f=p.get(`consumption_window_${i}_label`),g=p.get(`consumption_window_${i}_day_group`),y=p.get(`consumption_window_${i}_start_time`),k=p.get(`consumption_window_${i}_end_time`),b=p.get(`consumption_window_${i}_rate`);if(f===null&&g===null&&y===null&&k===null&&b===null)break;m.push({label:(f??"").trim()||`Window ${i+1}`,day_group:g??"all",start_time:y??"00:00",end_time:k??"06:00",rate:parseFloat(b??"0")||0})}return m},r=p=>{const m=[];for(let i=0;i<24;i++){const f=p.get(`reference_window_${i}_label`),g=p.get(`reference_window_${i}_day_group`),y=p.get(`reference_window_${i}_start_time`),k=p.get(`reference_window_${i}_end_time`),b=p.get(`reference_window_${i}_reference_power_kw`);if(f===null&&g===null&&y===null&&k===null&&b===null)break;m.push({label:(f??"").trim()||`Reference ${i+1}`,day_group:g??"all",start_time:y??"17:00",end_time:k??"00:00",reference_power_kw:parseFloat(b??"0")||0})}return m},o=()=>{var S;const p=new FormData(s),m={};s.querySelectorAll('input[type="checkbox"]').forEach(x=>{m[x.name]=x.checked});const i=[],f=/^feed_in_rate_(\d+)_(.+)$/,g={},y=[],k=/^meter_fee_(\d+)_(.+)$/,b={};for(const[x,C]of p.entries()){if(x.startsWith("consumption_window_")||x.startsWith("reference_window_"))continue;const $=x.match(f);if($){const P=$[1],K=$[2];g[P]||(g[P]={}),g[P][K]=C;continue}const d=x.match(k);if(d){const P=d[1],K=d[2];b[P]||(b[P]={}),b[P][K]=C;continue}if(m[x]!==void 0&&typeof m[x]=="boolean")continue;const v=C,D=s.elements.namedItem(x);if(v===""&&D instanceof HTMLInputElement&&D.type==="number"){const P=(S=this.state.config)==null?void 0:S[x];typeof P=="number"&&isFinite(P)&&(m[x]=P);continue}const W=parseFloat(v);m[x]=isNaN(W)?v:W}for(const x of Object.keys(g).sort()){const C=g[x],$=C.mode??"fixed",d=$==="sensor"?C.fallback_tariff??C.tariff:C.tariff;i.push({meter_id:C.meter_id??"",mode:$,tariff:parseFloat(d??"0.08")||.08,sensor_entity:C.sensor_entity??"",self_use_priority:Math.max(1,parseInt(C.self_use_priority??`${Number(x)+1}`,10)||Number(x)+1)})}i.length>0&&(m.feed_in_rates=i);for(const x of Object.keys(b).sort()){const C=b[x];y.push({meter_id:C.meter_id??"",label:C.label??"",fee:parseFloat(C.fee??"0")||0})}return y.length>0&&(m.meter_monthly_fees=y),m.consumption_rate_windows=a(p),m.reference_power_windows=r(p),m},n=p=>{if(!this.state.config)return;const m=o();p(m),this.state.config={...this.state.config,...m},this.renderPreserveMainScroll()};if((c=this.root.querySelector("#add-consumption-window-btn"))==null||c.addEventListener("click",()=>{n(p=>{var i;const m=Array.isArray(p.consumption_rate_windows)?[...p.consumption_rate_windows]:[];m.push({label:`Window ${m.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((i=this.state.config)==null?void 0:i.energy_variable_rate)??.1125}),p.consumption_rate_windows=m})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(p=>{p.addEventListener("click",()=>{const m=parseInt(p.dataset.window??"0",10);n(i=>{const f=Array.isArray(i.consumption_rate_windows)?[...i.consumption_rate_windows]:[];f.splice(m,1),i.consumption_rate_windows=f})})}),(h=this.root.querySelector("#add-reference-window-btn"))==null||h.addEventListener("click",()=>{n(p=>{var i;const m=Array.isArray(p.reference_power_windows)?[...p.reference_power_windows]:[];m.push({label:`Reference ${m.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((i=this.state.config)==null?void 0:i.reference_power_kw)??5}),p.reference_power_windows=m})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(p=>{p.addEventListener("click",()=>{const m=parseInt(p.dataset.window??"0",10);n(i=>{const f=Array.isArray(i.reference_power_windows)?[...i.reference_power_windows]:[];f.splice(m,1),i.reference_power_windows=f})})}),s.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(p=>{p.addEventListener("change",()=>{const m=p.name.match(/feed_in_rate_(\d+)_mode/);if(!m)return;const i=m[1],f=s.querySelector(`.feed-in-fixed-fields[data-rate-idx="${i}"]`),g=s.querySelector(`.feed-in-sensor-fields[data-rate-idx="${i}"]`);f&&(f.style.display=p.value==="fixed"?"":"none"),g&&(g.style.display=p.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const p=this.root.querySelector("#ha-entity-list");p&&_t().then(({entities:m})=>{p.innerHTML=m.map(i=>`<option value="${i}"></option>`).join("")}).catch(()=>{})}s.addEventListener("submit",async p=>{p.preventDefault();const m=o();try{const{saveConfig:i}=await Z(async()=>{const{saveConfig:f}=await Promise.resolve().then(()=>re);return{saveConfig:f}},void 0);await i(m),this.state.config=await be(),this.render()}catch(i){alert("Failed to save: "+(i instanceof Error?i.message:i))}});const l=this.root.querySelector("#reset-config-btn");l==null||l.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?"))try{const{resetConfig:p}=await Z(async()=>{const{resetConfig:m}=await Promise.resolve().then(()=>re);return{resetConfig:m}},void 0);await p(),this.state.config=await be(),this.render()}catch(p){alert("Failed to reset: "+(p instanceof Error?p.message:p))}})}async initChart(e){var s,a,r,o;try{const{renderEnergyChart:n}=await Z(async()=>{const{renderEnergyChart:b}=await import("./Charts-C6w_T9a3.js");return{renderEnergyChart:b}},[]),{fetchTimeseries:l}=await Z(async()=>{const{fetchTimeseries:b}=await Promise.resolve().then(()=>re);return{fetchTimeseries:b}},void 0),{start:c,end:h}=this.getDateRangeISO(),p=this.state.chartViewportStart?new Date(this.state.chartViewportStart).getTime():void 0,m=this.state.chartViewportEnd?new Date(this.state.chartViewportEnd).getTime():void 0;let i=this.state.consumptionTimeseries,f=this.state.productionTimeseries;(!i||!f)&&([i,f]=await Promise.all([l("1-1:1.29.0",c,h),l("1-1:2.29.0",c,h)]),this.state.consumptionTimeseries=i,this.state.productionTimeseries=f);const g=((s=this.state.config)==null?void 0:s.reference_power_kw)??0,y=(((a=this.state.config)==null?void 0:a.meters)??[]).filter(b=>b.types.includes("production"));let k;if((o=(r=this.state.perMeterProductionTimeseries)==null?void 0:r.meters)!=null&&o.length)k=this.state.perMeterProductionTimeseries.meters;else if(y.length>1)try{const b=await Ge("1-1:2.29.0",c,h);b.meters&&b.meters.length>1&&(k=b.meters,this.state.perMeterProductionTimeseries=b)}catch(b){console.warn("Per-meter timeseries fetch failed, using merged view:",b)}n(e,i,f,{unit:this.state.chartUnit,consumptionView:this.state.chartConsumptionView,referencePowerKw:g,perMeterProduction:k,viewportStartMs:p,viewportEndMs:m,onZoomChange:(b,S)=>{this.handleChartZoomChange(b,S)}})}catch(n){console.error("Chart init failed:",n)}}async handleChartZoomChange(e,s){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd);const{fetchCustomData:a}=await Z(async()=>{const{fetchCustomData:p}=await Promise.resolve().then(()=>re);return{fetchCustomData:p}},void 0),r=e.slice(0,10),o=s.slice(0,10);this.resetAnalysisComparison();const n=await a(e,s),[l,c,h]=await Promise.all([q("1-1:1.29.0",e,s),q("1-1:2.29.0",e,s),this.fetchPerMeterProductionForRange(this.state.config,e,s)]);this.state.range="custom",this.state.customStart=r,this.state.customEnd=o,this.state.chartViewportStart=e,this.state.chartViewportEnd=s,this.state.rangeData={range:"custom",consumption:n.consumption,production:n.production,exported:n.exported??0,self_consumed:n.self_consumed??0,gas_energy:n.gas_energy??0,gas_volume:n.gas_volume??0,grid_import:n.grid_import,solar_to_home:n.solar_to_home,direct_solar_to_home:n.direct_solar_to_home,shared:n.shared,shared_with_me:n.shared_with_me,peak_power_kw:n.peak_power_kw??0,exceedance_kwh:n.exceedance_kwh??0,metering_point:n.metering_point??"",start:n.start,end:n.end},this.state.consumptionTimeseries=l,this.state.productionTimeseries=c,this.state.perMeterProductionTimeseries=h,this.renderPreserveMainScroll()}catch(a){console.error("Zoom data fetch failed:",a),this.clearRangeStateWithError(a,"Missing data"),this.render()}}getDateRangeISO(){if(this.state.chartViewportStart&&this.state.chartViewportEnd)return{start:this.state.chartViewportStart,end:this.state.chartViewportEnd};const e=new Date,s=a=>Ne(a);switch(this.state.range){case"custom":{const a=new Date(this.state.customStart+"T00:00:00"),r=new Date(this.state.customEnd+"T23:59:59.999");return{start:s(a),end:s(r)}}case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const r=new Date(a);return r.setHours(23,59,59,999),{start:s(a),end:s(r)}}case"this_week":{const a=new Date(e),r=a.getDay()||7;return a.setDate(a.getDate()-r+1),a.setHours(0,0,0,0),{start:s(a),end:s(e)}}case"last_week":{const a=new Date(e),r=a.getDay()||7,o=new Date(a);o.setDate(a.getDate()-r),o.setHours(23,59,59,999);const n=new Date(o);return n.setDate(o.getDate()-6),n.setHours(0,0,0,0),{start:s(n),end:s(o)}}case"this_month":{const a=new Date(e.getFullYear(),e.getMonth(),1);return{start:s(a),end:s(e)}}case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),r=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s(a),end:s(r)}}case"this_year":{const a=new Date(e.getFullYear(),0,1);return{start:s(a),end:s(e)}}case"last_year":{const a=new Date(e.getFullYear()-1,0,1),r=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s(a),end:s(r)}}default:{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const r=new Date(a);return r.setHours(23,59,59,999),{start:s(a),end:s(r)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new js(t).mount()}
