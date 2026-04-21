var Kt=Object.defineProperty;var Vt=(t,e,a)=>e in t?Kt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var ue=(t,e,a)=>Vt(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const It="modulepreload",At=function(t){return"/leneda-panel/static/"+t},Ze={},X=function(e,a,s){let n=Promise.resolve();if(a&&a.length>0){let l=function(g){return Promise.all(g.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),d=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));n=l(a.map(g=>{if(g=At(g),g in Ze)return;Ze[g]=!0;const u=g.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${g}"]${p}`))return;const o=document.createElement("link");if(o.rel=u?"stylesheet":It,u||(o.as="script"),o.crossOrigin="",o.href=g,d&&o.setAttribute("nonce",d),document.head.appendChild(o),u)return new Promise((v,h)=>{o.addEventListener("load",v),o.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${g}`)))})}))}function r(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return n.then(l=>{for(const c of l||[])c.status==="rejected"&&r(c.reason);return e().catch(r)})};function ut(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()})),proxy_url:(t.proxy_url??"").trim()}}function Ht(){var t,e,a,s,n;try{const r=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((n=(s=(a=r==null?void 0:r.hass)==null?void 0:a.auth)==null?void 0:s.data)==null?void 0:n.access_token)??null}catch{return null}}async function G(t,e){const a=Ht(),s={...e==null?void 0:e.headers,...a?{Authorization:`Bearer ${a}`}:{}},n={...e,credentials:"include",headers:s},r=await fetch(t,n);if(!r.ok){const l=r.headers.get("content-type")??"";let c="",d="";if(l.includes("application/json")){const g=await r.json().catch(()=>null);c=String((g==null?void 0:g.error)??"").trim(),d=String((g==null?void 0:g.message)??(g==null?void 0:g.error)??"").trim()}else d=(await r.text().catch(()=>"")).trim();throw c==="missing_data"||c==="no_data"||r.status===503?new Error("Missing data"):new Error(d?`API ${r.status}: ${d}`:`API ${r.status}: ${r.statusText}`)}return r.json()}async function Se(t){return G(`/leneda_api/data?range=${t}`)}async function Gt(t,e){return G(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function Y(t,e,a){let s=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(s+=`&start=${encodeURIComponent(e)}`),a&&(s+=`&end=${encodeURIComponent(a)}`),G(s)}async function Nt(t,e,a){let s=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(s+=`&start=${encodeURIComponent(e)}`),a&&(s+=`&end=${encodeURIComponent(a)}`),G(s)}async function Ie(){return G("/leneda_api/sensors")}async function ye(){return G("/leneda_api/config")}async function Ot(t){await G("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function Ut(){await G("/leneda_api/config/reset",{method:"POST"})}async function pt(){try{return await G("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function ht(){return G("/leneda_api/credentials")}async function Yt(t){const e=ut(t);await G("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function jt(t){const e=ut(t);return G("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function mt(){return G("/leneda_api/ha-entities")}const se=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:ye,fetchCredentials:ht,fetchCustomData:Gt,fetchHAEntities:mt,fetchMode:pt,fetchPerMeterTimeseries:Nt,fetchRangeData:Se,fetchSensors:Ie,fetchTimeseries:Y,resetConfig:Ut,saveConfig:Ot,saveCredentials:Yt,testCredentials:jt},Symbol.toStringTag,{value:"Module"}));function i(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function re(t){return new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function gt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}const we=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function qt(t){var oe,z,Z;const e=t.rangeData,a=_=>{if(!_)return"";const T=_.match(/^(\d{4}-\d{2}-\d{2})/);return T?T[1]:""},s=(e==null?void 0:e.consumption)??0,n=(e==null?void 0:e.production)??0,r=(e==null?void 0:e.exported)??0,l=(e==null?void 0:e.self_consumed)??0,c=(e==null?void 0:e.gas_energy)??0,d=(e==null?void 0:e.gas_volume)??0,g=(e==null?void 0:e.peak_power_kw)??0,u=a(e==null?void 0:e.start),p=a(e==null?void 0:e.end),o=(e==null?void 0:e.shared_with_me)??0,v=(e==null?void 0:e.shared)??0,h=Math.max(0,r),m=Math.max(0,(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(l>0?l:n-h)),$=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??m),x=m,D=Math.max(0,(e==null?void 0:e.grid_import)??s-m),k=s>0?s:D+m,C=!!((oe=t.config)!=null&&oe.meter_has_gas||(((z=t.config)==null?void 0:z.meters)??[]).some(_=>_.types.includes("gas"))),b=v+o,y=k>0?Math.min(100,m/k*100):0,w=Math.max(k,n,D,h,v,o,$,1),E=C?Math.min(Math.max(0,c),w):0,F=(_,T=2.8,M=8.2)=>_>0?T+_/w*(M-T):1.8,W=_=>F(_)+1.4,V=_=>F(_)+5.4,O=(_,T=.28,M=.88)=>_>0?T+_/w*(M-T):.1,I=(_,T=.09,M=.22)=>_>0?T+_/w*(M-T):.05,H=(_,T=1.6,M=3.9)=>`${(_>0?Math.max(T,M-_/w*(M-T)):M).toFixed(2)}s`,te=(_,T=3.4,M=5.8)=>_>0?T+_/w*(M-T):3,j=_=>_>0?Math.max(18,Math.round(_/w*100)):0,ce=_=>`
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
  `,q=_=>{const{x:T,y:M,width:L,accent:K,kicker:U,value:J,detail:Q}=_;return`
      <g class="scene-node-label" transform="translate(${T}, ${M})">
        <rect width="${L}" height="${Q?70:54}" rx="18" fill="var(--clr-overlay)" stroke="${K}" />
        <text x="16" y="22" class="scene-node-kicker">${U}</text>
        <text x="16" y="${Q?39:37}" class="scene-node-value">${J}</text>
        ${Q?`<text x="16" y="56" class="scene-node-detail">${Q}</text>`:""}
      </g>
    `},he=_=>{const{x:T,y:M,scale:L=1,glowId:K}=_;return`
      <g class="scene-tier-icon scene-tier-grid" transform="translate(${T}, ${M}) scale(${L})">
        <circle cx="0" cy="44" r="48" fill="var(--clr-consumption)" fill-opacity="0.06" />
        <path d="M0 0 V88 M-24 20 H24 M-16 42 H16 M-8 66 H8" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" filter="url(#${K})" />
        <path d="M-12 88 L0 60 L12 88" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" fill="none" />
      </g>
    `},me=_=>{const{x:T,y:M,scale:L=1,glowId:K}=_;return`
      <g class="scene-tier-icon scene-tier-solar" transform="translate(${T}, ${M}) scale(${L})">
        <circle cx="0" cy="0" r="26" fill="var(--clr-production)" fill-opacity="0.09" />
        <circle cx="0" cy="0" r="12" fill="var(--clr-production)" fill-opacity="0.9" filter="url(#${K})" />
        <path d="M0 -26 V-40 M0 26 V40 M26 0 H40 M-26 0 H-40 M18 -18 L28 -28 M18 18 L28 28 M-18 18 L-28 28 M-18 -18 L-28 -28" stroke="var(--clr-production)" stroke-width="2.5" stroke-linecap="round" />
      </g>
    `},de=_=>{const{x:T,y:M,scale:L=1,glowId:K}=_;return`
      <g class="scene-tier-icon scene-tier-community" transform="translate(${T}, ${M}) scale(${L})">
        <circle cx="0" cy="40" r="50" fill="var(--clr-primary)" fill-opacity="0.06" />
        <rect x="-26" y="30" width="22" height="42" rx="6" fill="rgba(88, 166, 255, 0.08)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="6" y="16" width="24" height="56" rx="6" fill="rgba(88, 166, 255, 0.12)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="-2" y="4" width="6" height="10" rx="2" fill="var(--clr-primary)" fill-opacity="0.7" />
        <path d="M-14 12 H14 M-10 4 V20 M10 4 V20" stroke="var(--clr-primary)" stroke-width="2" stroke-linecap="round" filter="url(#${K})" />
      </g>
    `},ne=_=>{const{x:T,y:M,scale:L=1,glowId:K}=_;return`
      <g class="scene-tier-icon scene-tier-gas" transform="translate(${T}, ${M}) scale(${L})">
        <circle cx="0" cy="38" r="46" fill="var(--clr-gas)" fill-opacity="0.08" />
        <path d="M-26 40 H-8 V72 H26" stroke="var(--clr-gas)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#${K})" />
        <path d="M0 4 C18 24 20 40 20 52 C20 70 9 84 0 84 C-9 84 -20 70 -20 52 C-20 38 -10 24 0 4 Z" fill="rgba(210, 153, 34, 0.14)" stroke="var(--clr-gas)" stroke-width="2.2" />
        <path d="M0 24 C9 35 10 44 10 52 C10 61 5 68 0 72 C-5 68 -10 61 -10 52 C-10 44 -8 35 0 24 Z" fill="var(--clr-gas)" fill-opacity="0.85" />
      </g>
    `},ge=_=>{const{prefix:T,x:M,y:L,scale:K=1}=_;return`
      <g class="elite-house" transform="translate(${M}, ${L}) scale(${K})">
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
          <text text-anchor="middle" y="18" class="house-core-value">${i(y,0)}%</text>
        </g>
        <text x="90" y="262" text-anchor="middle" class="house-total-label">Home usage</text>
        <text x="90" y="284" text-anchor="middle" class="house-total-value">${i(k)} kWh</text>
      </g>
    `},A=_=>{const{path:T,value:M,gradientId:L,colorVar:K,filterId:U,particleClass:J,direction:Q="forward"}=_,ee=Q==="reverse"?"1;0":"0;1";return`
      <path
        class="flow-halo ${J}"
        d="${T}"
        stroke="url(#${L})"
        stroke-width="${V(M).toFixed(1)}"
        stroke-opacity="${I(M).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-rail ${J}"
        d="${T}"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="${W(M).toFixed(1)}"
        stroke-opacity="0.42"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-stream ${J}"
        d="${T}"
        stroke="url(#${L})"
        stroke-width="${F(M).toFixed(1)}"
        stroke-opacity="${O(M).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      ${M>0?`
        <circle
          class="flow-particle ${J}"
          r="${te(M).toFixed(1)}"
          fill="${K}"
          filter="url(#${U})"
        >
          <animateMotion dur="${H(M)}" repeatCount="indefinite" path="${T}" keyPoints="${ee}" keyTimes="0;1" calcMode="linear" />
        </circle>
        <circle
          class="flow-particle flow-particle-secondary ${J}"
          r="${Math.max(2.4,te(M)-1.2).toFixed(1)}"
          fill="${K}"
          fill-opacity="0.75"
          filter="url(#${U})"
        >
          <animateMotion dur="${H(M)}" begin="-${(parseFloat(H(M))/2).toFixed(2)}s" repeatCount="indefinite" path="${T}" keyPoints="${ee}" keyTimes="0;1" calcMode="linear" />
        </circle>
      `:""}
    `},De=()=>`
    <div class="elite-scene elite-scene-desktop">
      <svg class="elite-main-svg" viewBox="0 0 860 460" fill="none" preserveAspectRatio="xMidYMid meet">
        ${ce("desktop")}
        <rect x="34" y="30" width="792" height="372" rx="34" fill="url(#desktop-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="430" cy="330" rx="278" ry="60" fill="url(#desktop-house-base-glow)" opacity="0.56" />
        <line x1="98" y1="334" x2="762" y2="334" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.45" />

        ${q({x:58,y:108,width:152,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${i(D+h)} kWh`,detail:h>0?`In ${i(D)} / out ${i(h)} kWh`:void 0})}

        ${q({x:356,y:44,width:148,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${i(n)} kWh`,detail:`${i(m)} kWh used at home`})}

        ${q({x:624,y:108,width:184,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${i(b)} kWh`,detail:`Sent ${i(v)} / got ${i(o)} kWh`})}

        ${C?q({x:350,y:338,width:160,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${i(c)} kWh`,detail:d>0?`${i(d)} m3 in period`:"Gas meter active"}):""}

        ${he({x:132,y:186,scale:1.02,glowId:"desktop-glow-red"})}
        ${me({x:430,y:126,glowId:"desktop-glow-green"})}
        ${de({x:716,y:194,glowId:"desktop-glow-cyan"})}
        ${C?ne({x:430,y:352,glowId:"desktop-glow-gas"}):""}
        ${ge({prefix:"desktop",x:340,y:96,scale:1.02})}

        ${A({path:"M 430 152 C 430 182 430 204 430 220",value:$,gradientId:"desktop-flow-solar",colorVar:"var(--clr-production)",filterId:"desktop-glow-green",particleClass:"flow-solar"})}

        ${A({path:"M 176 230 C 246 230 318 230 364 232",value:D,gradientId:"desktop-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"desktop-glow-red",particleClass:"flow-grid-in"})}

        ${A({path:"M 496 268 C 430 298 326 314 176 316",value:h,gradientId:"desktop-flow-grid-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-grid-out"})}

        ${A({path:"M 500 234 C 566 220 634 220 692 236",value:v,gradientId:"desktop-flow-shared-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-shared-out"})}

        ${A({path:"M 690 272 C 632 292 566 294 500 278",value:o,gradientId:"desktop-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"desktop-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${C?A({path:"M 430 404 C 430 370 430 336 430 302",value:E,gradientId:"desktop-flow-gas",colorVar:"var(--clr-gas)",filterId:"desktop-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,Me=()=>`
    <div class="elite-scene elite-scene-mobile">
      <svg class="elite-main-svg" viewBox="0 0 420 560" fill="none" preserveAspectRatio="xMidYMid meet">
        ${ce("mobile")}
        <rect x="20" y="20" width="380" height="520" rx="32" fill="url(#mobile-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="210" cy="316" rx="136" ry="38" fill="url(#mobile-house-base-glow)" opacity="0.58" />
        <line x1="64" y1="332" x2="356" y2="332" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.42" />

        ${q({x:132,y:40,width:156,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${i(n)} kWh`})}

        ${q({x:20,y:194,width:126,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${i(D+h)} kWh`})}

        ${q({x:274,y:194,width:126,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${i(b)} kWh`})}

        ${C?q({x:122,y:442,width:176,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${i(c)} kWh`,detail:d>0?`${i(d)} m3`:"Gas meter active"}):""}

        ${me({x:210,y:126,scale:.92,glowId:"mobile-glow-green"})}
        ${he({x:76,y:254,scale:.86,glowId:"mobile-glow-red"})}
        ${de({x:344,y:260,scale:.86,glowId:"mobile-glow-cyan"})}
        ${C?ne({x:210,y:442,scale:.9,glowId:"mobile-glow-gas"}):""}
        ${ge({prefix:"mobile",x:118,y:166,scale:.94})}

        ${A({path:"M 210 152 C 210 188 210 216 210 238",value:$,gradientId:"mobile-flow-solar",colorVar:"var(--clr-production)",filterId:"mobile-glow-green",particleClass:"flow-solar"})}

        ${A({path:"M 104 286 C 138 286 168 286 194 286",value:D,gradientId:"mobile-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"mobile-glow-red",particleClass:"flow-grid-in"})}

        ${A({path:"M 226 318 C 194 340 162 348 102 350",value:h,gradientId:"mobile-flow-grid-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-grid-out"})}

        ${A({path:"M 226 286 C 262 274 294 274 318 286",value:v,gradientId:"mobile-flow-shared-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-shared-out"})}

        ${A({path:"M 318 320 C 294 332 262 334 226 322",value:o,gradientId:"mobile-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"mobile-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${C?A({path:"M 210 474 C 210 432 210 390 210 344",value:E,gradientId:"mobile-flow-gas",colorVar:"var(--clr-gas)",filterId:"mobile-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,ae=e!=null&&e.start&&(e!=null&&e.end)?`${re(e.start)} — ${re(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${re(t.customStart+"T00:00:00")} — ${re(t.customEnd+"T00:00:00")}`:((Z=we.find(_=>_.id===t.range))==null?void 0:Z.label)??"Yesterday",ve=t.chartConsumptionView==="house"?"Total Usage shows the full house load, with the solar-covered share highlighted in green and exports below zero · Scroll to zoom · Drag to pan":"Net Grid focuses on what still came from the grid after solar, with exports shown below zero · The reference limit in kW mode applies here · Scroll to zoom · Drag to pan";return`
    <div class="dashboard" style="position: relative;">
      <div style="position:fixed;bottom:4px;right:4px;font-size:10px;opacity:0.5;pointer-events:none;z-index:9999;">v:2.7.0</div>

      <!-- Range Selector -->
      <div class="range-selector">
        ${we.map(_=>`
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
      `:u&&p?`
      <!-- Preset Period Preview -->
      <div class="custom-range-picker period-preview">
        <span class="period-preview-label">Viewed period</span>
        <label>
          <span>From</span>
          <input type="date" value="${u}" readonly aria-label="Preset period start" />
        </label>
        <label>
          <span>To</span>
          <input type="date" value="${p}" readonly aria-label="Preset period end" />
        </label>
      </div>
      `:""}

      <!-- Stat Cards -->
      <div class="stats-grid">
        <div class="stat-card consumption">
          <div class="stat-icon">⚡</div>
          <div class="stat-body">
            <div class="stat-label">Consumption</div>
            <div class="stat-value">${i(s)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card production">
          <div class="stat-icon">☀️</div>
          <div class="stat-body">
            <div class="stat-label">Production</div>
            <div class="stat-value">${i(n)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.export">
          <div class="stat-icon">📤</div>
          <div class="stat-body">
            <div class="stat-label">Exported</div>
            <div class="stat-value">${i(r)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.self-consumed">
          <div class="stat-icon">🏠</div>
          <div class="stat-body">
            <div class="stat-label">Self-Consumed</div>
            <div class="stat-value">${i(x)} <span class="stat-unit">kWh</span></div>
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
                    <span class="module-value highlight-red">${i(s)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg red"></div></div>
              </div>

              <div class="glass-module production-module">
                <div class="module-info">
                  <span class="module-label">Solar Production <span class="info-icon">ⓘ</span></span>
                  <div class="module-value-row">
                    <span class="module-value highlight-green">${i(n)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg green"></div></div>
              </div>
            </div>

            ${De()}
            ${Me()}

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${i(k)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${i(y,0)}% solar supplied${g>0?` · Peak ${i(g,2)} kW`:""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${i(m)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${j(m)}%;"></span></div>
                  <p>Energy used inside the house${o>0?", including received community energy":""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${i(D)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${j(D)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${i(h)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${j(h)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${i(b)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${j(b)}%;"></span></div>
                  <p>Sent ${i(v)} kWh · received ${i(o)} kWh.</p>
                </div>
                ${C?`
                <div class="mobile-flow-item gas">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Gas to house</span>
                    <strong>${i(c)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${j(E||w)}%;"></span></div>
                  <p>${d>0?`${i(d)} m3 measured for the same period.`:"Gas meter is configured for this home."}</p>
                </div>
                `:""}
              </div>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${i(m)} kWh used in the house</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${i(D)} kWh bought from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${i(h)} kWh sent back to the market</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${i(v)} kWh sent · ${i(o)} kWh received${o>0?" (included in solar to home)":""}</span>
                </span>
              </div>
              ${C?`
              <div class="flow-legend-item gas">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Gas to house</strong>
                  <span>${i(c)} kWh${d>0?` / ${i(d)} m3`:""}</span>
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
              <span class="metric-value">${i(y,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${y}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Consumed</span>
              <span class="metric-value">${i(x)} kWh</span>
            </div>
          </div>
          ${g>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${i(g,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label">${((e==null?void 0:e.exceedance_kwh)??0)>0?"⚠️":"✅"} Exceedance</span>
              <span class="metric-value">${i((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${c>0||d>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${i(c)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${i(d)} m³</span>
            </div>
          </div>
          `:""}
        </div>
      </div>
      </div>

      <!-- Chart -->
      <div class="card chart-card">
        <div class="chart-header">
          <h3 class="card-title"><span class="title-icon">📉</span> Energy Profile — ${ae}</h3>
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
          ${ve}
        </p>
      </div>

      </div>

      </div>
    </section>
  `}const Je=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],Le={house:"Total Usage",grid:"Net Grid",solar:"Solar Production"};function Qe(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function zt(t){const e=new Date(t),a=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${s}-${n}`}function Bt(t){const[e,a,s]=t.split("-").map(Number);return new Date(e,a-1,s,12,0,0,0)}function pe(t,e=0){return t.length?Math.max(...t):e}function vt(t,e=0){return t.length?Math.min(...t):e}function Xt(t,e,a){return Math.min(a,Math.max(e,t))}function N(t,e){return`${i(t,2)} ${e}`}function ft(t,e){return`${t>0?"+":t<0?"-":""}${i(Math.abs(t),2)} ${e}`}function ke(t,e=1){return Math.abs(t)<.005?"0":`${t>0?"+":""}${i(t,e)}`}function et(t){const[e,a]=t.split(":").map(s=>parseInt(s,10)||0);return e*60+a}function Zt(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function yt(t,e,a,s){if(!Zt(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),r=et(a),l=et(s);return r===l?!0:r<l?n>=r&&n<l:n>=r||n<l}function Jt(t,e){return e.find(a=>yt(t,a.day_group,a.start_time,a.end_time))}function Qt(t,e){return e.find(a=>yt(t,a.day_group,a.start_time,a.end_time))}function ea(t){const e=(t.meters??[]).filter(n=>n.types.includes("production")),a=t.feed_in_rates??[];if(!e.length)return t.feed_in_tariff??0;const s=e.map(n=>{const r=a.find(c=>c.meter_id===n.id);return r?r.mode==="sensor"&&r.sensor_value!=null&&Number.isFinite(r.sensor_value)?r.sensor_value??0:Number.isFinite(r.tariff)?r.tariff:t.feed_in_tariff??0:t.feed_in_tariff??0}).filter(n=>Number.isFinite(n)&&n>=0);return s.length?s.reduce((n,r)=>n+r,0)/s.length:t.feed_in_tariff??0}function ta(t,e,a){const s=new Map;for(const g of t.items){const u=new Date(g.startedAt).getTime();if(!Number.isFinite(u))continue;const p=s.get(u)??{houseKw:0,solarKw:0,iso:g.startedAt};p.houseKw+=Math.max(0,Number(g.value)||0),p.iso=g.startedAt,s.set(u,p)}for(const g of e.items){const u=new Date(g.startedAt).getTime();if(!Number.isFinite(u))continue;const p=s.get(u)??{houseKw:0,solarKw:0,iso:g.startedAt};p.solarKw+=Math.max(0,Number(g.value)||0),p.iso=p.iso||g.startedAt,s.set(u,p)}const n=a.consumption_rate_windows??[],r=a.reference_power_windows??[],l=a.reference_power_kw??0,c=ea(a),d=(a.exceedance_rate??0)*(1+(a.vat_rate??0));return[...s.entries()].sort((g,u)=>g[0]-u[0]).map(([g,u])=>{var w,E;const p=new Date(g),o=Math.max(0,u.houseKw),v=Math.max(0,u.solarKw),h=Math.max(0,Math.min(o,v)),m=Math.max(0,o-h),$=Math.max(0,v-h),x=((w=Qt(p,r))==null?void 0:w.reference_power_kw)??l,D=Math.max(0,o-x),k=Math.max(0,m-x),C=Math.max(0,D-k),y=((((E=Jt(p,n))==null?void 0:E.rate)??a.energy_variable_rate??0)+(a.network_variable_rate??0)+(a.electricity_tax_rate??0)+(a.compensation_fund_rate??0))*(1+(a.vat_rate??0));return{timestamp:g,iso:u.iso,date:p,houseKw:o,solarKw:v,solarToHomeKw:h,gridKw:m,exportKw:$,referenceKw:x,overKw:k,avoidedOverKw:C,importRateWithVat:y,feedInRate:c,exceedanceRateWithVat:d}})}function wt(t,e,a){const s=ta(t,e,a),n=new Map,r=Array.from({length:24},()=>0),l={house:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),grid:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),solar:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0})))},c={houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0};for(const o of s){const h=zt(o.timestamp),m=n.get(h)??(()=>{const te=Bt(h);return{key:h,label:te.toLocaleDateString(void 0,{month:"short",day:"numeric"}),fullDate:te.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0}})(),$=o.houseKw*.25,x=o.solarKw*.25,D=o.solarToHomeKw*.25,k=o.gridKw*.25,C=o.exportKw*.25,b=o.overKw*.25,y=o.avoidedOverKw*.25,w=k*o.importRateWithVat,E=D*o.importRateWithVat,F=C*o.feedInRate,W=D*(o.importRateWithVat-o.feedInRate),V=b*o.exceedanceRateWithVat,O=y*o.exceedanceRateWithVat;m.houseKwh+=$,m.solarKwh+=x,m.solarToHomeKwh+=D,m.gridKwh+=k,m.exportKwh+=C,m.exceedanceKwh+=b,m.avoidedExceedanceKwh+=y,m.importCost+=w,m.solarSavings+=E,m.exportRevenue+=F,m.selfConsumptionAdvantage+=W,m.exceedanceCost+=V,m.avoidedExceedanceValue+=O,m.peakGridKw=Math.max(m.peakGridKw,o.gridKw),m.peakHouseKw=Math.max(m.peakHouseKw,o.houseKw),m.exceedanceIntervals+=o.overKw>0?1:0,n.set(h,m),c.houseKwh+=$,c.solarKwh+=x,c.solarToHomeKwh+=D,c.gridKwh+=k,c.exportKwh+=C,c.exceedanceKwh+=b,c.avoidedExceedanceKwh+=y,c.importCost+=w,c.solarSavings+=E,c.exportRevenue+=F,c.selfConsumptionAdvantage+=W,c.exceedanceCost+=V,c.avoidedExceedanceValue+=O,c.peakGridKw=Math.max(c.peakGridKw,o.gridKw),c.peakHouseKw=Math.max(c.peakHouseKw,o.houseKw),c.exceedanceIntervals+=o.overKw>0?1:0;const I=(o.date.getDay()+6)%7,H=o.date.getHours();l.house[I][H].sum+=o.houseKw,l.house[I][H].count+=1,l.grid[I][H].sum+=o.gridKw,l.grid[I][H].count+=1,l.solar[I][H].sum+=o.solarKw,l.solar[I][H].count+=1,r[H]+=b}const d=[...n.values()].sort((o,v)=>o.key.localeCompare(v.key)).map(o=>(o.coveragePct=o.houseKwh>0?o.solarToHomeKwh/o.houseKwh*100:0,o.selfConsumedPct=o.solarKwh>0?o.solarToHomeKwh/o.solarKwh*100:0,o.solarValue=o.solarSavings+o.exportRevenue+o.avoidedExceedanceValue,o));c.coveragePct=c.houseKwh>0?c.solarToHomeKwh/c.houseKwh*100:0,c.selfConsumedPct=c.solarKwh>0?c.solarToHomeKwh/c.solarKwh*100:0,c.solarValue=c.solarSavings+c.exportRevenue+c.avoidedExceedanceValue;const g={house:l.house.map(o=>o.map(v=>v.count?v.sum/v.count:0)),grid:l.grid.map(o=>o.map(v=>v.count?v.sum/v.count:0)),solar:l.solar.map(o=>o.map(v=>v.count?v.sum/v.count:0))},u=s.filter(o=>o.overKw>0).sort((o,v)=>v.overKw-o.overKw||v.timestamp-o.timestamp).slice(0,8),p=[...d].filter(o=>o.exceedanceKwh>0).sort((o,v)=>v.exceedanceKwh-o.exceedanceKwh).slice(0,6);return{daily:d,totals:c,topExceedances:u,hourlyExceedanceKwh:r,heatmapValues:g,loadDurationGrossKw:s.map(o=>o.houseKw).sort((o,v)=>v-o),loadDurationNetKw:s.map(o=>o.gridKw).sort((o,v)=>v-o),worstDays:p}}function aa(t){var e,a,s;return(e=t.rangeData)!=null&&e.start&&((a=t.rangeData)!=null&&a.end)?`${re(t.rangeData.start)} - ${re(t.rangeData.end)}`:((s=we.find(n=>n.id===t.range))==null?void 0:s.label)??"Selected Period"}function sa(t){var e,a;return(e=t.rangeData)!=null&&e.start&&((a=t.rangeData)!=null&&a.end)?`${new Date(t.rangeData.start).toLocaleDateString()} - ${new Date(t.rangeData.end).toLocaleDateString()}`:t.range==="custom"&&t.customStart&&t.customEnd?`${t.customStart} - ${t.customEnd}`:"Based on the currently selected range."}function tt(t){return t.analysisComparison?`Previous matched period: ${new Date(t.analysisComparison.start).toLocaleDateString()} - ${new Date(t.analysisComparison.end).toLocaleDateString()}`:"Previous matched period"}function le(t){const e=t.series.filter(w=>w.values.length>0);if(!e.length)return'<div class="analysis-empty">No chart data available for this period.</div>';const a=Math.max(...e.map(w=>w.values.length)),s=Math.max(720,a*24+92),n=244,r=50,l=20,c=18,d=30,g=e.flatMap(w=>w.values);t.referenceValue!=null&&g.push(t.referenceValue);let u=t.minValue??vt(g,0),p=t.maxValue??pe(g,1);u===p&&(p+=1,u=Math.min(0,u-1)),t.minValue==null&&(u=Math.min(0,u));const o=s-r-l,v=n-c-d,h=(w,E)=>E<=1?r+o/2:r+w*o/(E-1),m=w=>c+(p-w)/(p-u)*v,$=t.valueFormatter??(w=>i(w,1)),x=Array.from({length:4},(w,E)=>u+(p-u)/3*E),D=[0,Math.floor((a-1)/2),a-1].filter((w,E,F)=>F.indexOf(w)===E),k=x.map(w=>{const E=m(w);return`
      <line x1="${r}" y1="${E.toFixed(1)}" x2="${(s-l).toFixed(1)}" y2="${E.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${r-8}" y="${(E+4).toFixed(1)}" class="analysis-svg-tick">${$(w)}</text>
    `}).join(""),C=t.referenceValue!=null?(()=>{const w=m(t.referenceValue);return`
        <line x1="${r}" y1="${w.toFixed(1)}" x2="${(s-l).toFixed(1)}" y2="${w.toFixed(1)}" class="analysis-svg-reference" />
        ${t.referenceLabel?`<text x="${s-l}" y="${(w-8).toFixed(1)}" class="analysis-svg-reference-label">${t.referenceLabel}</text>`:""}
      `})():"",b=e.map(w=>{const E=w.values.map((W,V)=>{const O=h(V,w.values.length),I=m(W);return`${V===0?"M":"L"} ${O.toFixed(1)} ${I.toFixed(1)}`}).join(" "),F=w.values.length<=40?w.values.map((W,V)=>{const O=h(V,w.values.length),I=m(W);return`<circle cx="${O.toFixed(1)}" cy="${I.toFixed(1)}" r="2.6" fill="${w.color}" />`}).join(""):"";return`
      <path d="${E}" fill="none" stroke="${w.color}" stroke-width="2.5" ${w.dashed?'stroke-dasharray="6 4"':""} />
      ${F}
    `}).join(""),y=D.map(w=>{const E=h(w,a),F=t.labels[w]??`Point ${w+1}`;return`<text x="${E.toFixed(1)}" y="${n-8}" text-anchor="middle" class="analysis-svg-x-label">${F}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${s}" height="${n}" viewBox="0 0 ${s} ${n}" role="img" aria-label="${t.title??"Line chart"}">
        ${k}
        ${C}
        ${b}
        ${y}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      ${e.map(w=>`
        <span class="analysis-legend-item">
          <span class="analysis-legend-swatch" style="background:${w.color};"></span>
          <span>${w.label}</span>
        </span>
      `).join("")}
      ${t.referenceLabel?`
          <span class="analysis-legend-item">
            <span class="analysis-legend-swatch analysis-legend-swatch-dashed"></span>
            <span>${t.referenceLabel}</span>
          </span>
        `:""}
    </div>
  `}function ra(t){if(!t.length)return'<div class="analysis-empty">No daily energy data available.</div>';const e=Math.max(760,t.length*28+84),a=250,s=52,n=16,r=18,l=34,c=pe(t.map(k=>k.houseKwh),1),d=pe(t.map(k=>k.exportKwh),0),g=e-s-n,u=a-r-l,p=d>0?u*.72:u,o=d>0?u-p:0,v=r+p,h=g/t.length,m=Math.max(8,Math.min(18,h*.62)),$=Math.max(1,Math.ceil(t.length/10)),x=t.map((k,C)=>{const b=s+C*h+(h-m)/2,y=k.solarToHomeKwh/c*p,w=k.gridKwh/c*p,E=d>0?k.exportKwh/d*o:0,F=v-y-w-8;return`
      <g>
        <rect x="${b.toFixed(1)}" y="${(v-y).toFixed(1)}" width="${m.toFixed(1)}" height="${y.toFixed(1)}" rx="3" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${b.toFixed(1)}" y="${(v-y-w).toFixed(1)}" width="${m.toFixed(1)}" height="${w.toFixed(1)}" rx="3" fill="rgba(248, 81, 73, 0.55)" />
        ${E>0?`<rect x="${b.toFixed(1)}" y="${v.toFixed(1)}" width="${m.toFixed(1)}" height="${E.toFixed(1)}" rx="3" fill="rgba(88, 166, 255, 0.75)" />`:""}
        ${k.exceedanceKwh>0?`<circle cx="${(b+m/2).toFixed(1)}" cy="${F.toFixed(1)}" r="3.2" fill="#d29922" />`:""}
      </g>
    `}).join(""),D=t.map((k,C)=>C%$!==0&&C!==t.length-1?"":`<text x="${(s+C*h+h/2).toFixed(1)}" y="${a-10}" text-anchor="middle" class="analysis-svg-x-label">${k.label}</text>`).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${a}" viewBox="0 0 ${e} ${a}" role="img" aria-label="Daily energy breakdown">
        <line x1="${s}" y1="${v.toFixed(1)}" x2="${(e-n).toFixed(1)}" y2="${v.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${s-8}" y="${(r+4).toFixed(1)}" class="analysis-svg-tick">${i(c,0)} kWh</text>
        ${d>0?`<text x="${s-8}" y="${(a-l+4).toFixed(1)}" class="analysis-svg-tick">-${i(d,0)} kWh</text>`:""}
        ${x}
        ${D}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.55);"></span><span>From grid</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span><span>Exported</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:#d29922;"></span><span>Exceedance on that day</span></span>
    </div>
  `}function na(t,e){const a=Xt(e,0,1);return t==="solar"?`rgba(63, 185, 80, ${.12+a*.82})`:t==="grid"?`rgba(210, 153, 34, ${.12+a*.82})`:`rgba(248, 81, 73, ${.12+a*.82})`}function oa(t,e){const a=t.flat(),s=pe(a,1),n=vt(a,0);return`
    <div class="analysis-heatmap">
      <div class="analysis-heatmap-hours">
        <span class="analysis-heatmap-corner"></span>
        ${Array.from({length:24},(r,l)=>`
          <span class="analysis-heatmap-hour ${l%2===1?"analysis-heatmap-hour-faded":""}">${String(l).padStart(2,"0")}</span>
        `).join("")}
      </div>
      ${t.map((r,l)=>`
        <div class="analysis-heatmap-row">
          <span class="analysis-heatmap-day">${Je[l]}</span>
          ${r.map((c,d)=>{const g=s===n?0:(c-n)/(s-n);return`
              <span
                class="analysis-heatmap-cell"
                style="background:${na(e,g)};"
                title="${Je[l]} ${String(d).padStart(2,"0")}:00 - ${i(c,2)} kW average"
              >${c>.05?i(c,1):""}</span>
            `}).join("")}
        </div>
      `).join("")}
    </div>
  `}function at(t){const e=pe(t.map(a=>a.value),1);return t.length?`
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
  `:'<div class="analysis-empty">No standout patterns in this period.</div>'}function ia(t){var s,n,r,l;const e=Qe(((s=t.rangeData)==null?void 0:s.start)??t.customStart),a=Qe(((n=t.rangeData)==null?void 0:n.end)??t.customEnd);return`
    <div class="range-selector">
      ${we.map(c=>`
        <button
          class="range-btn ${c.id===t.range?"active":""}"
          data-range="${c.id}"
        >${c.label}</button>
      `).join("")}
    </div>
    ${(r=t.rangeData)!=null&&r.start&&((l=t.rangeData)!=null&&l.end)?`
        <div class="range-info-bar">
          Period: ${new Date(t.rangeData.start).toLocaleDateString()} - ${new Date(t.rangeData.end).toLocaleDateString()}
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
  `}function la(t,e){return`
    <div class="analysis-stat-grid">
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Solar Coverage</span>
        <strong class="analysis-stat-value">${i(t.totals.coveragePct,1)}%</strong>
        <span class="analysis-stat-meta">${i(t.totals.solarToHomeKwh)} kWh of ${i(t.totals.houseKwh)} kWh usage</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Consumed Solar</span>
        <strong class="analysis-stat-value">${i(t.totals.selfConsumedPct,1)}%</strong>
        <span class="analysis-stat-meta">${i(t.totals.solarToHomeKwh)} kWh kept at home, ${i(t.totals.exportKwh)} kWh exported</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Total Solar Value</span>
        <strong class="analysis-stat-value">${N(t.totals.solarValue,e)}</strong>
        <span class="analysis-stat-meta">Savings plus export revenue plus avoided exceedance charges</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Use vs Export</span>
        <strong class="analysis-stat-value">${ft(t.totals.selfConsumptionAdvantage,e)}</strong>
        <span class="analysis-stat-meta">${i(t.totals.solarToHomeKwh)} kWh kept on-site instead of exported</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Peak Net Grid</span>
        <strong class="analysis-stat-value">${i(t.totals.peakGridKw,2)} kW</strong>
        <span class="analysis-stat-meta">Compared with ${i(t.totals.peakHouseKw,2)} kW gross house load</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Exceedance Intervals</span>
        <strong class="analysis-stat-value">${i(t.totals.exceedanceIntervals,0)}</strong>
        <span class="analysis-stat-meta">${i(t.totals.exceedanceKwh,2)} kWh above the reference limit</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Variable Import Cost</span>
        <strong class="analysis-stat-value">${N(t.totals.importCost,e)}</strong>
        <span class="analysis-stat-meta">Energy-only import charges from the selected period</span>
      </div>
    </div>
  `}function ca(t){return`
    <div class="card analysis-card analysis-card-full">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Daily Breakdown</h3>
          <p class="analysis-card-copy">House usage is split into solar-covered energy, grid energy, and exported surplus. A gold marker flags days with any reference-power exceedance.</p>
        </div>
      </div>
      ${ra(t.daily)}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily exceedance volume</h4>
        ${le({title:"Daily exceedance volume",series:[{label:"Exceedance",color:"#d29922",values:t.daily.map(e=>e.exceedanceKwh)}],labels:t.daily.map(e=>e.label),valueFormatter:e=>`${i(e,2)} kWh`})}
      </div>
    </div>
  `}function da(t,e){return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Consumption Pattern Heatmap</h3>
          <p class="analysis-card-copy">Average hourly power by weekday. Use the switch to inspect total house usage, remaining grid draw, or solar production.</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${t.analysisHeatmapMetric==="house"?"active":""}" data-analysis-heatmap="house">${Le.house}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="grid"?"active":""}" data-analysis-heatmap="grid">${Le.grid}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="solar"?"active":""}" data-analysis-heatmap="solar">${Le.solar}</button>
        </div>
      </div>
      ${oa(e.heatmapValues[t.analysisHeatmapMetric],t.analysisHeatmapMetric)}
      <p class="analysis-note">Each cell shows the average kW seen in that weekday/hour slot over the selected period.</p>
    </div>
  `}function ua(t,e){const a=t.totals.solarKwh>0?t.totals.solarToHomeKwh/t.totals.solarKwh*100:0,s=t.totals.solarKwh>0?t.totals.exportKwh/t.totals.solarKwh*100:0;return`
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
          <strong>${i(t.totals.coveragePct,1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-consumed solar</span>
          <strong>${i(t.totals.selfConsumedPct,1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Solar value</span>
          <strong>${N(t.totals.solarValue,e)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-use vs export</span>
          <strong>${ft(t.totals.selfConsumptionAdvantage,e)}</strong>
        </div>
      </div>
      <div class="analysis-share-bar">
        <span class="analysis-share-segment analysis-share-segment-home" style="width:${a}%;"></span>
        <span class="analysis-share-segment analysis-share-segment-export" style="width:${s}%;"></span>
      </div>
      <div class="analysis-share-legend">
        <span><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span>Self-consumed: ${i(t.totals.solarToHomeKwh)} kWh</span>
        <span><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span>Exported: ${i(t.totals.exportKwh)} kWh</span>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Coverage of house usage by day</h4>
        ${le({title:"Daily solar coverage",series:[{label:"Coverage",color:"#3fb950",values:t.daily.map(n=>n.coveragePct)}],labels:t.daily.map(n=>n.label),maxValue:100,minValue:0,valueFormatter:n=>`${i(n,0)}%`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day</h4>
        ${le({title:"Daily solar value",series:[{label:"Solar value",color:"#58a6ff",values:t.daily.map(n=>n.solarValue)}],labels:t.daily.map(n=>n.label),valueFormatter:n=>N(n,e)})}
      </div>
    </div>
  `}function pa(t,e){const a=t.hourlyExceedanceKwh.map((s,n)=>({label:`${String(n).padStart(2,"0")}:00`,value:s,meta:`${i(s,2)} kWh`,colorClass:"analysis-progress-fill-warn"})).filter(s=>s.value>0).sort((s,n)=>n.value-s.value).slice(0,6);return`
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
          <strong>${i(t.totals.exceedanceIntervals,0)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Total exceedance</span>
          <strong>${i(t.totals.exceedanceKwh,2)} kWh</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Peak over reference</span>
          <strong>${i(pe(t.topExceedances.map(s=>s.overKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Exceedance cost</span>
          <strong>${N(t.totals.exceedanceCost,e)}</strong>
        </div>
      </div>
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Worst hours</h4>
          ${at(a)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Worst days</h4>
          ${at(t.worstDays.map(s=>({label:s.fullDate,value:s.exceedanceKwh,meta:`${i(s.exceedanceKwh,2)} kWh`,colorClass:"analysis-progress-fill-warn"})))}
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
                      <td>${gt(s.iso)}</td>
                      <td>${i(s.gridKw,2)} kW</td>
                      <td>${i(s.referenceKw,2)} kW</td>
                      <td>${i(s.overKw,2)} kW</td>
                      <td>${i(s.solarKw,2)} kW</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `:'<div class="analysis-empty">No reference exceedance was recorded in this period.</div>'}
      </div>
    </div>
  `}function ha(t,e,a){var l,c;if(e.analysisComparisonLoading)return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${tt(e)}</p>
          </div>
        </div>
        <div class="analysis-empty">Loading comparison period...</div>
      </div>
    `;if(!((l=e.analysisComparison)!=null&&l.consumptionTimeseries)||!((c=e.analysisComparison)!=null&&c.productionTimeseries))return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">A matched previous period is shown here when enough historic data is available.</p>
          </div>
        </div>
        <div class="analysis-empty">Comparison data is unavailable for the selected range.</div>
      </div>
    `;const s=wt(e.analysisComparison.consumptionTimeseries,e.analysisComparison.productionTimeseries,a),n=Math.max(t.daily.length,s.daily.length,1),r=Array.from({length:n},(d,g)=>`D${g+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Period Comparison</h3>
          <p class="analysis-card-copy">${tt(e)}</p>
        </div>
      </div>
      <div class="analysis-compare-grid">
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">House usage</span>
          <strong>${i(t.totals.houseKwh)} kWh</strong>
          <span class="analysis-compare-delta">${ke(t.totals.houseKwh-s.totals.houseKwh)} kWh vs previous</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Net grid usage</span>
          <strong>${i(t.totals.gridKwh)} kWh</strong>
          <span class="analysis-compare-delta">${ke(t.totals.gridKwh-s.totals.gridKwh)} kWh vs previous</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar coverage</span>
          <strong>${i(t.totals.coveragePct,1)}%</strong>
          <span class="analysis-compare-delta">${ke(t.totals.coveragePct-s.totals.coveragePct)} pts vs previous</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar value</span>
          <strong>${N(t.totals.solarValue,a.currency||"EUR")}</strong>
          <span class="analysis-compare-delta">${ke(t.totals.solarValue-s.totals.solarValue,2)} ${a.currency||"EUR"} vs previous</span>
        </div>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Usage by day index</h4>
        ${le({title:"Current versus previous usage",series:[{label:"Current",color:"#f85149",values:t.daily.map(d=>d.houseKwh)},{label:"Previous",color:"#58a6ff",values:s.daily.map(d=>d.houseKwh),dashed:!0}],labels:r,valueFormatter:d=>`${i(d,1)} kWh`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day index</h4>
        ${le({title:"Current versus previous solar value",series:[{label:"Current",color:"#3fb950",values:t.daily.map(d=>d.solarValue)},{label:"Previous",color:"#d29922",values:s.daily.map(d=>d.solarValue),dashed:!0}],labels:r,valueFormatter:d=>N(d,a.currency||"EUR")})}
      </div>
    </div>
  `}function ma(t,e){return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Tariff-Aware Cost Trends</h3>
          <p class="analysis-card-copy">Estimated variable import cost, solar savings, export earnings, and exceedance cost by day. Fixed monthly fees are intentionally left out so this stays behavior-driven.</p>
        </div>
      </div>
      ${le({title:"Daily cost and value trends",series:[{label:"Import cost",color:"#f85149",values:t.daily.map(a=>a.importCost)},{label:"Solar savings",color:"#3fb950",values:t.daily.map(a=>a.solarSavings)},{label:"Export earnings",color:"#58a6ff",values:t.daily.map(a=>a.exportRevenue)},{label:"Exceedance cost",color:"#d29922",values:t.daily.map(a=>a.exceedanceCost)}],labels:t.daily.map(a=>a.label),valueFormatter:a=>N(a,e)})}
      <div class="analysis-cost-totals">
        <span>Import cost: <strong>${N(t.totals.importCost,e)}</strong></span>
        <span>Solar savings: <strong>${N(t.totals.solarSavings,e)}</strong></span>
        <span>Export earnings: <strong>${N(t.totals.exportRevenue,e)}</strong></span>
        <span>Exceedance cost: <strong>${N(t.totals.exceedanceCost,e)}</strong></span>
      </div>
    </div>
  `}function ga(t,e){const a=Array.from({length:Math.max(t.loadDurationGrossKw.length,t.loadDurationNetKw.length,1)},(s,n)=>`${n+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Load Duration Curve</h3>
          <p class="analysis-card-copy">Gross house load and net grid load sorted from highest to lowest interval. This shows how often high demand really occurs and how much solar trims the top end.</p>
        </div>
      </div>
      ${le({title:"Load duration curve",series:[{label:"Gross house load",color:"#f85149",values:t.loadDurationGrossKw},{label:"Net grid load",color:"#58a6ff",values:t.loadDurationNetKw}],labels:a,referenceValue:e>0?e:void 0,referenceLabel:e>0?`Reference ${i(e,1)} kW`:void 0,valueFormatter:s=>`${i(s,1)} kW`})}
      <p class="analysis-note">Intervals are ordered from highest demand to lowest, so the left side is your hardest-to-handle load.</p>
    </div>
  `}function va(t){const e=t.config,a=t.rangeData,s=t.consumptionTimeseries,n=t.productionTimeseries;if(!e||!a||!s||!n)return`
      <section class="analysis-view">
        <div class="card">
          <p class="muted">Loading analysis data...</p>
        </div>
      </section>
    `;const r=wt(s,n,e),l=e.currency||"EUR";return`
    <section class="analysis-view">
      <div class="section-header analysis-section-header">
        <div>
          <span class="badge">Analysis</span>
          <h2>Charts and Optimization</h2>
          <p class="muted">Deeper electricity analysis for ${aa(t)}. This page is built from the same 15-minute data and billing settings that drive the dashboard and invoice.</p>
        </div>
        <div class="analysis-header-meta">
          <span>${sa(t)}</span>
          <span>${i(r.daily.length,0)} day${r.daily.length===1?"":"s"} analysed</span>
        </div>
      </div>

      ${ia(t)}
      ${la(r,l)}
      ${ca(r)}

      <div class="analysis-grid">
        ${da(t,r)}
        ${ua(r,l)}
      </div>

      <div class="analysis-grid">
        ${pa(r,l)}
        ${ha(r,t,e)}
      </div>

      <div class="analysis-grid">
        ${ma(r,l)}
        ${ga(r,e.reference_power_kw??0)}
      </div>
    </section>
  `}const st={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function fa(t){return st[t]?st[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function ya(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],a=[],s=[],n=[],r=[];for(const c of t.sensors){const d=c.key;d.startsWith("c_")||d==="1-1:1.29.0"||d==="1-1:3.29.0"?e.push(c):d.startsWith("p_")||d==="1-1:2.29.0"||d==="1-1:4.29.0"?a.push(c):d.startsWith("s_")||d.startsWith("1-65:")?s.push(c):d.startsWith("g_")||d.startsWith("7-")?n.push(c):r.push(c)}const l=(c,d,g,u)=>g.length?`
      <div class="card sensor-group">
        <h3 class="card-title"><span class="title-icon">${d}</span> ${c} <span class="badge">${g.length}</span></h3>
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
              ${g.map(p=>`
                <tr>
                  <td class="sensor-name">${fa(p.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${u});">${i(p.value)}</td>
                  <td class="sensor-unit">${p.unit}</td>
                  <td class="sensor-peak">${p.peak_timestamp?gt(p.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
      ${l("Electricity Consumption","⚡",e,"consumption")}
      ${l("Energy Production","☀️",a,"production")}
      ${l("Energy Sharing","🔗",s,"self")}
      ${l("Gas","🔥",n,"gas")}
      ${l("Other","📊",r,"text")}
    </section>
  `}const rt=[{kw:3,fixedMonthlyFee:7.42},{kw:7,fixedMonthlyFee:12.84},{kw:12,fixedMonthlyFee:19.61},{kw:17,fixedMonthlyFee:26.39},{kw:27,fixedMonthlyFee:39.94},{kw:43,fixedMonthlyFee:61.62},{kw:70,fixedMonthlyFee:98.2},{kw:100,fixedMonthlyFee:138.85},{kw:150,fixedMonthlyFee:206.6,existingContractsOnly:!0},{kw:200,fixedMonthlyFee:274.35,existingContractsOnly:!0}];function Ce(t){if(!t)return null;const e=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(e){const[,s,n,r]=e;return new Date(Number(s),Number(n)-1,Number(r))}const a=new Date(t);return Number.isNaN(a.getTime())?null:new Date(a.getFullYear(),a.getMonth(),a.getDate())}function nt(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function wa(t,e,a,s,n){const r=new Date,l=Ce(s),c=Ce(n);let d=l,g=c;if(!d||!g)switch(t){case"yesterday":{const h=new Date(r);h.setDate(h.getDate()-1),d=new Date(h.getFullYear(),h.getMonth(),h.getDate()),g=new Date(d);break}case"this_week":{const h=new Date(r),m=h.getDay()||7;d=new Date(h.getFullYear(),h.getMonth(),h.getDate()-m+1),g=new Date(r.getFullYear(),r.getMonth(),r.getDate());break}case"last_week":{const h=new Date(r),m=h.getDay()||7,$=new Date(h.getFullYear(),h.getMonth(),h.getDate()-m+1);d=new Date($.getFullYear(),$.getMonth(),$.getDate()-7),g=new Date($.getFullYear(),$.getMonth(),$.getDate()-1);break}case"this_month":{d=new Date(r.getFullYear(),r.getMonth(),1),g=new Date(r.getFullYear(),r.getMonth(),r.getDate());break}case"last_month":{d=new Date(r.getFullYear(),r.getMonth()-1,1),g=new Date(r.getFullYear(),r.getMonth(),0);break}case"this_year":{d=new Date(r.getFullYear(),0,1),g=new Date(r.getFullYear(),r.getMonth(),r.getDate());break}case"last_year":{d=new Date(r.getFullYear()-1,0,1),g=new Date(r.getFullYear()-1,11,31);break}case"custom":{d=Ce(e)??new Date(r.getFullYear(),r.getMonth(),r.getDate()),g=Ce(a)??new Date(d);break}default:{d=new Date(r.getFullYear(),r.getMonth(),r.getDate()-1),g=new Date(d);break}}if(g<d){const h=d;d=g,g=h}let u=0,p=0;const o=new Date(d);for(;o<=g;){const h=new Date(o.getFullYear(),o.getMonth()+1,0).getDate();p+=1/h,u+=1,o.setDate(o.getDate()+1)}const v=d.getFullYear()===g.getFullYear()&&d.getMonth()===g.getMonth()&&d.getDate()===1&&g.getDate()===new Date(g.getFullYear(),g.getMonth()+1,0).getDate();return{days:u,factor:p,label:v?"full month":`${u} day${u===1?"":"s"}`}}function ba(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function ot(t){const[e,a]=t.split(":").map(s=>parseInt(s,10)||0);return e*60+a}function bt(t,e,a,s){if(!ba(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),r=ot(a),l=ot(s);return r===l?!0:r<l?n>=r&&n<l:n>=r||n<l}function $a(t,e){return e.find(a=>bt(t,a.day_group,a.start_time,a.end_time))}function _a(t,e){return e.find(a=>bt(t,a.day_group,a.start_time,a.end_time))}function it(t,e,a,s,n,r=[]){var v;const l=new Map;let c=0,d=0,g=0,u=0,p=0;const o=new Map;for(const h of r){const m=Number(h.value)||0;o.set(h.startedAt,(o.get(h.startedAt)??0)+m)}for(const h of t){const m=Number(h.value)||0,$=m*.25,x=o.get(h.startedAt)??0,D=Math.max(0,m-x),k=new Date(h.startedAt);if(Number.isNaN(k.getTime()))continue;const C=$a(k,s),b=_a(k,n),y=(C==null?void 0:C.rate)??e,w=((v=C==null?void 0:C.label)==null?void 0:v.trim())||"Base tariff",E=(b==null?void 0:b.reference_power_kw)??a;c+=$*y,p=Math.max(p,m),u=Math.max(u,D),m>E&&(g+=(m-E)*.25),D>E&&(d+=(D-E)*.25);const F=`${w}__${y}`,W=l.get(F);W?W.kwh+=$:l.set(F,{label:w,rate:y,kwh:$})}return{energyCost:c,exceedanceKwh:d,grossExceedanceKwh:g,avoidedExceedanceKwh:Math.max(0,g-d),peakPowerKw:u,grossPeakPowerKw:p,rateBreakdown:Array.from(l.values()).sort((h,m)=>h.label.localeCompare(m.label))}}function xa(t){var qe;const e=t.config,a=t.rangeData;if(!e||!a)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const s=a.consumption||0,n=a.production||0,r=a.exported||0,l=Math.max(0,r),c=Math.max(0,a.solar_to_home??a.direct_solar_to_home??(a.self_consumed&&a.self_consumed>0?a.self_consumed:n-l)),d=Math.max(0,a.grid_import??s-c),g=a.peak_power_kw||0,u=e.reference_power_kw||5,p=a.exceedance_kwh||0,o=a.gas_energy||0,v=a.gas_volume||0,h=o>0||v>0,m=e.consumption_rate_windows??[],$=e.reference_power_windows??[],x=t.consumptionTimeseries?it(t.consumptionTimeseries.items,e.energy_variable_rate,u,m,$,((qe=t.productionTimeseries)==null?void 0:qe.items)??[]):null,D=m.length>0&&!!x&&Math.abs(d-s)<.01,k=$.length>0&&!!x,C=x?x.peakPowerKw:g,b=x?x.exceedanceKwh:p,y=nt(a.start??t.customStart),w=nt(a.end??t.customEnd),{days:E,factor:F,label:W}=wa(t.range,t.customStart,t.customEnd,a.start,a.end),V=e.energy_fixed_fee*F,O=e.network_metering_rate*F,I=e.network_power_ref_rate*F,H=D?x.energyCost:d*e.energy_variable_rate,te=d*e.network_variable_rate,j=b*e.exceedance_rate,ce=e.meter_monthly_fees??[],q=ce.reduce((f,P)=>f+(P.fee||0),0)*F,he=d*e.compensation_fund_rate,me=d*e.electricity_tax_rate,de=Math.max(0,e.connect_discount??0)*F,ne=V+H+O+I+te+j+q+he+me-de,ge=ne*e.vat_rate,A=ne+ge,De=(e.meters??[]).filter(f=>f.types.includes("production")),Me=e.feed_in_rates??[],ae=De.map(f=>{const P=Me.find(B=>B.meter_id===f.id);if(P){const B=P.mode==="sensor"&&P.sensor_value!=null&&isFinite(P.sensor_value),ie=B?P.sensor_value:isFinite(P.tariff)?P.tariff:e.feed_in_tariff,ze=B?`Sensor (${i(ie,4)} ${e.currency??"EUR"}/kWh)`:"Fixed tariff";return{meterId:f.id,shortId:f.id?"…"+f.id.slice(-8):"Meter",rate:ie,label:ze,mode:P.mode}}return{meterId:f.id,shortId:f.id?"…"+f.id.slice(-8):"Meter",rate:e.feed_in_tariff,label:"Fixed tariff",mode:"fixed"}}),ve=ae.filter(f=>isFinite(f.rate)&&f.rate>0),oe=ve.length>0?ve.reduce((f,P)=>f+P.rate,0)/ve.length:e.feed_in_tariff,z=l*oe,Z=ae.length>1,_=Z&&ae.length>0?l/ae.length:l,T=ae.map(f=>({...f,exportKwh:_,revenue:_*f.rate})),M=c,L=M*(e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate),K=L*e.vat_rate,U=L+K,J=M*oe,Q=U-J,ee=Math.max(0,(x==null?void 0:x.avoidedExceedanceKwh)??0),be=ee*e.exceedance_rate,Ae=be*e.vat_rate,fe=be+Ae,$e=ee>1e-4,_e=U+fe+z,Ee=A-z,He=(e.gas_fixed_fee??6.5)*F,Ge=o*(e.gas_variable_rate??.055),Ne=(e.gas_network_fee??4.8)*F,Oe=o*(e.gas_network_variable_rate??.012),Ue=o*(e.gas_tax_rate??.001),Te=He+Ge+Ne+Oe+Ue,Ye=Te*(e.gas_vat_rate??.08),We=Te+Ye,R=e.currency||"EUR",S=f=>`${i(f,2)} ${R}`,je=f=>`${f>0?"+":f<0?"-":""}${i(Math.abs(f),2)} ${R}`,Fe=rt.find(f=>Math.abs(f.kw-u)<.05),Ct=ne-I-j,Re=x?rt.map(f=>{var Xe;const P=it(t.consumptionTimeseries.items,e.energy_variable_rate,f.kw,m,$,((Xe=t.productionTimeseries)==null?void 0:Xe.items)??[]),B=f.fixedMonthlyFee*F,ie=P.exceedanceKwh*e.exceedance_rate,Be=(Ct+B+ie)*(1+e.vat_rate);return{...f,fixedCharge:B,exceedanceKwh:P.exceedanceKwh,exceedanceCharge:ie,total:Be,deltaVsCurrent:Be-A}}):[],xe=Re.reduce((f,P)=>!f||P.total<f.total?P:f,null),St=f=>Math.abs(f)<.005?"Current total":`${f>0?"+":"-"}${S(Math.abs(f))}`,Pe=a.start&&a.end?`${re(a.start)} — ${re(a.end)}`:t.range.replace("_"," ").replace(/\b\w/g,f=>f.toUpperCase()),Dt=b>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${i(C,1)} kW</strong> &mdash; ${k?"Reference power windows active":`Reference power level: ${i(u,1)} kW`}</p>
        <p>Exceedance volume: <strong>${i(b,2)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${S(j)}</p>
      </div>`:"",Mt=D?x.rateBreakdown.map(f=>`
            <tr>
              <td>${f.label} (${i(f.kwh)} kWh)</td>
              <td style="text-align: right;">${i(f.rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(f.kwh*f.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Supplier rate (${i(d)} kWh bought from grid)</td>
              <td style="text-align: right;">${i(e.energy_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(H)}</td>
            </tr>
          `,Et=k?`Reference power windows active (${$.length})`:`${i(u,1)} kW`,Tt=D?`Time-of-use windows active (${m.length})`:`${i(e.energy_variable_rate,4)} ${R}/kWh`,Wt=Re.map(f=>{const P=!!xe&&f.kw===xe.kw,B=!!Fe&&f.kw===Fe.kw,ie=f.deltaVsCurrent<-.005?"comparison-delta-savings":f.deltaVsCurrent>.005?"comparison-delta-extra":"";return`
            <tr class="${P?"reference-power-best-row":""}${B?" reference-power-current-row":""}">
              <td>
                <div class="reference-level-cell">
                  <span class="reference-level-kw">${i(f.kw,0)} kW</span>
                  ${P?'<span class="reference-level-badge best">Financially optimal</span>':""}
                  ${B?'<span class="reference-level-badge current">Current</span>':""}
                  ${f.existingContractsOnly?'<span class="reference-level-badge legacy">Existing contracts</span>':""}
                </div>
              </td>
              <td style="text-align: right;">${S(f.fixedCharge)}</td>
              <td style="text-align: right;">${S(f.exceedanceCharge)}</td>
              <td style="text-align: right;"><strong>${S(f.total)}</strong></td>
              <td class="${ie}" style="text-align: right;">${St(f.deltaVsCurrent)}</td>
            </tr>
          `}).join(""),Ft=Re.length>0?`
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${k?"Configured reference power windows stay active in this comparison.":"One reference power level is applied to the full selected period."}
              ${Fe?"":`Your current configuration uses ${i(u,1)} kW, which is outside the standard Creos low-voltage reference power levels.`}
            </p>
          </div>
          ${xe?`<div class="reference-power-optimum">
                <span class="reference-level-badge best">Financially optimal: ${i(xe.kw,0)} kW</span>
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
            ${Wt}
          </tbody>
        </table>
      </div>
    `:`
      <div class="card reference-power-card">
        <p class="muted">Reference power level comparison requires 15-minute load-curve data for the selected period.</p>
      </div>
    `,Rt=`
      <div class="range-selector">
        ${we.map(f=>`
          <button
            class="range-btn ${f.id===t.range?"active":""}"
            data-range="${f.id}"
          >${f.label}</button>
        `).join("")}
      </div>
    `,Pt=a.start&&a.end?(()=>{const f=new Date(a.start),P=new Date(a.end);return Number.isNaN(f.getTime())||Number.isNaN(P.getTime())?"":`
        <div class="range-info-bar">
          Period: ${f.toLocaleDateString()} - ${P.toLocaleDateString()}
        </div>
      `})():"",Lt=t.range==="custom"?`
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
    `:y&&w?`
        <div class="custom-range-picker period-preview">
          <span class="period-preview-label">Viewed period</span>
          <label>
            <span>From</span>
            <input type="date" value="${y}" readonly aria-label="Preset period start" />
          </label>
          <label>
            <span>To</span>
            <input type="date" value="${w}" readonly aria-label="Preset period end" />
          </label>
        </div>
      `:"";return`
    <section class="invoice-view">
      ${Rt}
      ${Pt}
      ${Lt}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Invoice Estimate &mdash; ${Pe}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the currently selected period.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${i(s)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${i(d)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${i(n)} kWh produced</span>
          ${l>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${i(l)} kWh exported</span>`:""}
          ${h?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${i(o)} kWh gas (${i(v)} m³)</span>`:""}
        </div>
      </div>

      ${Dt}

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
              <td>Fixed Fee <span class="muted">(${W})</span></td>
              <td style="text-align: right;">${i(e.energy_fixed_fee,2)} ${R}/mo</td>
              <td style="text-align: right;">${S(V)}</td>
            </tr>
            ${Mt}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${W})</span></td>
              <td style="text-align: right;">${i(e.network_metering_rate,2)} ${R}/mo</td>
              <td style="text-align: right;">${S(O)}</td>
            </tr>
            <tr>
              <td>Reference power level (${Et}) <span class="muted">(${W})</span></td>
              <td style="text-align: right;">${i(e.network_power_ref_rate,2)} ${R}/mo</td>
              <td style="text-align: right;">${S(I)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${i(d)} kWh bought from grid)</td>
              <td style="text-align: right;">${i(e.network_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(te)}</td>
            </tr>
            <tr class="${b>0?"exceedance-row":""}">
              <td>Exceedance charge (${i(b,2)} kWh above the reference power level)</td>
              <td style="text-align: right;">${i(e.exceedance_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(j)}</td>
            </tr>

            ${ce.filter(f=>f.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${ce.filter(f=>f.fee>0).map(f=>`
            <tr>
              <td>${f.label||"…"+f.meter_id.slice(-8)} <span class="muted">(${W})</span></td>
              <td style="text-align: right;">${i(f.fee,2)} ${R}/mo</td>
              <td style="text-align: right;">${S(f.fee*F)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${i(e.compensation_fund_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(he)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${i(e.electricity_tax_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(me)}</td>
            </tr>
            ${de>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            <tr>
              <td>Monthly Discount <span class="muted">(${W})</span></td>
              <td style="text-align: right;">-${i(Math.max(0,e.connect_discount??0),2)} ${R}/mo</td>
              <td style="text-align: right;">-${S(de)}</td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${S(ne)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${i(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(ge)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Costs</strong></td>
              <td style="text-align: right;"><strong>${S(A)}</strong></td>
            </tr>

            ${n>0?`
            <tr class="section-label revenue-section"><td colspan="3">Solar Savings & Feed-in Revenue</td></tr>
            <tr class="revenue-row">
              <td>Solar produced</td>
              <td style="text-align: right;">Total generation during this period</td>
              <td style="text-align: right;">${i(n)} kWh</td>
            </tr>
            <tr class="revenue-row">
              <td>Autoconsumed / used at home</td>
              <td style="text-align: right;">${i(M)} kWh avoided grid purchases</td>
              <td style="text-align: right;">${S(U)} saved</td>
            </tr>
            <tr class="revenue-row">
              <td>Export sold</td>
              <td style="text-align: right;">${i(l)} kWh sent to grid</td>
              <td style="text-align: right;">${S(z)} earned</td>
            </tr>
            ${$e?`
            <tr class="revenue-row">
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${i(ee)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${S(fe)} saved</td>
            </tr>
            `:""}
            ${l>0?`
            <tr class="section-label"><td colspan="3">Credit Calculation</td></tr>
            ${T.map(f=>`
            <tr class="revenue-row">
              <td>Exported (${Z?f.shortId:i(f.exportKwh)+" kWh"})</td>
              <td style="text-align: right;">${i(f.exportKwh)} kWh<br/>${f.label}<br/>${i(f.rate,4)} ${R}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${S(f.revenue)}</td>
            </tr>
            `).join("")}
            ${Z?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${i(l)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${i(oe,4)} ${R}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${S(z)}</td>
            </tr>
            `:""}
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total saved / earned thanks to solar</strong></td>
              <td style="text-align: right;"><strong>${S(_e)}</strong></td>
            </tr>
            <tr class="net-total-row">
              <td colspan="2"><strong>Net Balance</strong></td>
              <td style="text-align: right;"><strong>${S(Ee)}</strong></td>
            </tr>
            `:""}
            ${l<=0?`
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total saved / earned thanks to solar</strong></td>
              <td style="text-align: right;"><strong>${S(_e)}</strong></td>
            </tr>
            `:""}
            `:""}
          </tbody>
        </table>
      </div>

      ${Ft}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${i(d)} kWh), not total home usage.
          Supplier pricing: ${Tt}.
          Fixed monthly charges are prorated across the viewed period (${E} days, ${W}, equivalent to ${i(F,2)} monthly charges).
          Peak load (${i(C,1)} kW) is compared against ${k?"your configured reference power windows":`your reference power level (${i(u,1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${i(e.exceedance_rate,4)} ${R}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${h?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${Pe}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${i(o)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${i(v)} m³</span>
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
              <td>Fixed Fee <span class="muted">(${W})</span></td>
              <td style="text-align: right;">${i(e.gas_fixed_fee??6.5,2)} ${R}/mo</td>
              <td style="text-align: right;">${S(He)}</td>
            </tr>
            <tr>
              <td>Energy (${i(o)} kWh)</td>
              <td style="text-align: right;">${i(e.gas_variable_rate??.055,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(Ge)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${W})</span></td>
              <td style="text-align: right;">${i(e.gas_network_fee??4.8,2)} ${R}/mo</td>
              <td style="text-align: right;">${S(Ne)}</td>
            </tr>
            <tr>
              <td>Network Variable (${i(o)} kWh)</td>
              <td style="text-align: right;">${i(e.gas_network_variable_rate??.012,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(Oe)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${i(o)} kWh)</td>
              <td style="text-align: right;">${i(e.gas_tax_rate??.001,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(Ue)}</td>
            </tr>

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${S(Te)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${i((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${S(Ye)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${S(We)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Energy Total: ${S(Ee+We)}</strong>
          (Electricity: ${S(Ee)} + Gas: ${S(We)})
        </p>
      </div>
      `:""}

      ${n>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Revenue &mdash; ${Pe}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${S(_e)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${i(n)} kWh</div>
            <div class="solar-stat-label">Solar produced</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${S(U)}</div>
            <div class="solar-stat-label">Saved by autoconsuming ${i(M)} kWh</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${je(Q)}</div>
            <div class="solar-stat-label">Extra value from using it yourself instead of selling it</div>
          </div>
          ${$e?`
          <div class="solar-stat">
            <div class="solar-stat-value">${S(fe)}</div>
            <div class="solar-stat-label">Saved by staying under the reference power</div>
          </div>
          `:""}
          <div class="solar-stat">
            <div class="solar-stat-value">${S(z)}</div>
            <div class="solar-stat-label">Earned by selling ${i(l)} kWh</div>
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
              <td style="text-align: right;">${i(n)} kWh</td>
            </tr>
            <tr>
              <td>Autoconsumed / used at home</td>
              <td style="text-align: right;">${i(M)} kWh avoided grid purchases</td>
              <td style="text-align: right;">${S(U)} saved</td>
            </tr>
            <tr>
              <td>Extra vs exporting instead</td>
              <td style="text-align: right;">Compared with selling the same ${i(M)} kWh at ${i(oe,4)} ${R}/kWh</td>
              <td style="text-align: right;">${je(Q)}</td>
            </tr>
            <tr>
              <td>Export sold</td>
              <td style="text-align: right;">${i(l)} kWh sent to grid</td>
              <td style="text-align: right;">${S(z)} earned</td>
            </tr>
            ${$e?`
            <tr>
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${i(ee)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${S(fe)} saved</td>
            </tr>
            `:""}

            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${i(M)} kWh)</td>
              <td style="text-align: right;">${i(e.energy_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(M*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${i(e.network_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(M*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${i(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(M*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${i(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(K)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${S(U)}</strong></td>
            </tr>

            ${$e?`
            <tr class="section-label"><td colspan="3">Reference Power Savings</td></tr>
            <tr>
              <td>Exceedance avoided</td>
              <td style="text-align: right;">${i(ee)} kWh above the reference power level</td>
              <td style="text-align: right;">${S(be)}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${i(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(Ae)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Reference Power Savings</strong></td>
              <td style="text-align: right;"><strong>${S(fe)}</strong></td>
            </tr>
            `:""}

            ${l>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${T.map(f=>`
            <tr>
              <td>Sold to grid ${Z?`(${f.shortId})`:`(${i(f.exportKwh)} kWh)`}</td>
              <td style="text-align: right;">${i(f.exportKwh)} kWh<br/>${f.label}<br/>${i(f.rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(f.revenue)}</td>
            </tr>
            `).join("")}
            ${Z?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${S(z)}</strong></td>
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
          ${ae.some(f=>f.mode==="sensor")?"Market price sourced from Home Assistant sensor.":"Using fixed feed-in tariff — configure a market price sensor in Settings for real-time rates."}
          ${Z?"Displayed per-meter feed-in kWh are currently equal-split estimates because per-meter export data is not yet available.":""}
        </p>
      </div>
      `:""}
    </section>
  `}const ka=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],Ca=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Reference Power Fixed Charge",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"connect_discount",label:"Monthly Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],Sa={consumption:"Power Consumption",production:"Power Production",gas:"Gas Consumption"},$t={consumption:"⚡",production:"☀️",gas:"🔥"};function Da(t){return t.map(e=>`<span class="meter-type-badge meter-type-${e}">${$t[e]??""} ${Sa[e]??e}</span>`).join(" ")}function lt(t,e,a){const s=t+1;return a?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${s}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${Da(e.types)}</div>
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
  `}function _t(t){return ka.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function Ma(t,e){return`
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
            ${_t(e.day_group??"all")}
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
  `}function Ea(t,e){return`
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
            ${_t(e.day_group??"all")}
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
  `}function Ta(t,e="ha",a){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const s=e==="standalone"?(a==null?void 0:a.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let n="";if(e==="standalone"){const b=s.map((w,E)=>lt(E,w,!1)).join("");a==null||a.proxy_url,n=`
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
              ${b}
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
    `}else{const b=(t==null?void 0:t.meters)??[];n=`
      <div class="card" style="margin-bottom: var(--sp-6); padding: var(--sp-4) var(--sp-5);">
        <p class="muted" style="margin: 0 0 var(--sp-3) 0;">🔒 API credentials are managed through Home Assistant &rarr; Settings &rarr; Integrations &rarr; Leneda</p>
        <div class="form-section">
          <div class="form-section-title">📊  Configured Metering Points</div>
          <div id="meters-container">
            ${b.length>0?b.map((w,E)=>lt(E,w,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const r=b=>b.map(y=>{const w=t?t[y.key]??"":"";return`
        <div class="form-row">
          <label for="cfg-${y.key}">${y.label}</label>
          <div class="input-group">
            <input
              id="cfg-${y.key}"
              name="${y.key}"
              type="${y.type}"
              ${y.type==="number"?`step="${y.step}"`:""}
              value="${w}"
            />
            ${y.unit?`<span class="input-unit">${y.unit}</span>`:""}
          </div>
        </div>
      `}).join(""),l=((t==null?void 0:t.meters)??[]).filter(b=>b.types.includes("production")),c=(t==null?void 0:t.feed_in_rates)??[],d=e==="ha";function g(b){return c.find(y=>y.meter_id===b)??{meter_id:b,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:""}}const u=l.length===0?'<p class="muted">No production meters configured — add a meter with Power Production type above.</p>':l.map((b,y)=>{const w=g(b.id),E=b.id?"…"+b.id.slice(-8):`Meter ${y+1}`;return`
          <div class="feed-in-meter-card" data-meter-idx="${y}" data-meter-id="${b.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${E}</span>
              <input type="hidden" name="feed_in_rate_${y}_meter_id" value="${b.id}" />
            </div>
            <div class="form-row">
              <label>Pricing Mode</label>
              <div class="feed-in-mode-toggle">
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${y}_mode" value="fixed" ${w.mode==="fixed"?"checked":""} />
                  <span class="mode-label">💶 Fixed Tariff</span>
                </label>
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${y}_mode" value="sensor" ${w.mode==="sensor"?"checked":""} />
                  <span class="mode-label">📡 HA Sensor</span>
                </label>
              </div>
            </div>
            <div class="feed-in-fixed-fields" data-rate-idx="${y}" style="${w.mode==="fixed"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${y}_tariff">Feed-in Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${y}_tariff" name="feed_in_rate_${y}_tariff" type="number" step="0.0001" value="${w.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
              </div>
            </div>
            <div class="feed-in-sensor-fields" data-rate-idx="${y}" style="${w.mode==="sensor"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${y}_sensor">Market Price Sensor</label>
                <div class="input-group sensor-picker-group">
                  <input
                    id="cfg-feed_in_rate_${y}_sensor"
                    name="feed_in_rate_${y}_sensor_entity"
                    type="text"
                    value="${w.sensor_entity}"
                    placeholder="${d?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${d&&y===0?'<datalist id="ha-entity-list"></datalist>':""}
              </div>
              <div class="form-row">
                <label for="cfg-feed_in_rate_${y}_fallback">Fallback Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${y}_fallback" name="feed_in_rate_${y}_fallback_tariff" type="number" step="0.0001" value="${w.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
                <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                  Used when the sensor is unavailable.
                </p>
              </div>
            </div>
          </div>
        `}).join(""),p=((t==null?void 0:t.meters)??[]).some(b=>b.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),o=(t==null?void 0:t.consumption_rate_windows)??[],v=(t==null?void 0:t.reference_power_windows)??[],h=(t==null?void 0:t.meters)??[],m=(t==null?void 0:t.meter_monthly_fees)??[];function $(b){return m.find(y=>y.meter_id===b)??{meter_id:b,label:"",fee:0}}const x=h.length===0?'<p class="muted">No meters configured.</p>':h.map((b,y)=>{const w=$(b.id),E=b.id?"…"+b.id.slice(-8):`Meter ${y+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${b.types.map(W=>$t[W]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${E}</code>
              <input type="hidden" name="meter_fee_${y}_meter_id" value="${b.id}" />
            </div>
            <div class="form-row" style="margin-bottom: var(--sp-2);">
              <label for="cfg-meter_fee_${y}_label">Label</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${y}_label" name="meter_fee_${y}_label" type="text" value="${w.label||`Meter ${y+1} metering fee`}" placeholder="e.g. Smart meter rental" />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-meter_fee_${y}_fee">Monthly Fee</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${y}_fee" name="meter_fee_${y}_fee" type="number" step="0.01" value="${w.fee}" />
                <span class="input-unit">EUR/mo</span>
              </div>
            </div>
          </div>
        `}).join(""),D=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional supplier-rate windows. Outside these windows, the base <strong>Energy Supplier → Variable Rate</strong> is used.
      Windows can cross midnight by setting an end time earlier than the start time.
    </p>
    <div id="consumption-windows-container">
      ${o.length>0?o.map((b,y)=>Ma(y,b)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,k=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${v.length>0?v.map((b,y)=>Ea(y,b)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,C=Ca.map(b=>{if(b.title==="Gas Billing"&&!p||b.title==="Meter Fees"&&h.length<2)return"";let y;return b.title==="Feed-in / Selling"?y=u:b.title==="Time-of-Use Tariffs"?y=D:b.title==="Reference Power Windows"?y=k:b.title==="Discounts"?y=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as a monthly credit. The dashboard prorates it to the selected period and subtracts it before VAT.
      </p>`+r(b.fields):b.title==="Meter Fees"?y=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+x:y=r(b.fields),`
    <div class="form-section">
      <div class="form-section-title">${b.icon}  ${b.title}</div>
      ${y}
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
  `}function Ke(t,e,a=!1,s="dark",n=""){const r=[{id:"charts",label:"Charts",icon:"CH"},{id:"dashboard",label:"Dashboard",icon:"🏠"},{id:"sensors",label:"Sensors",icon:"📊"},{id:"invoice",label:"Invoice",icon:"💰"},{id:"settings",label:"Settings",icon:"⚙️"}];return`
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
        ${r.map(l=>`
          <button
            class="nav-btn ${l.id===t?"active":""}"
            data-tab="${l.id}"
            role="tab"
            aria-selected="${l.id===t}"
            aria-controls="panel-${l.id}"
          >
            <span class="nav-icon" aria-hidden="true">${l.icon}</span>
            <span class="nav-label">${l.label}</span>
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
              <span class="theme-toggle-icon" aria-hidden="true">${s==="dark"?"☀️":"🌙"}</span>
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
  `}const xt="leneda_credentials",kt="leneda_theme";function Wa(){try{const t=localStorage.getItem(xt);if(t)return JSON.parse(t)}catch{}return null}function Ve(t){try{localStorage.setItem(xt,JSON.stringify(t))}catch{}}function Fa(){var t;try{const e=localStorage.getItem(kt);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function Ra(t){try{localStorage.setItem(kt,t)}catch{}}function ct(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const[,a,s,n]=e;return new Date(Number(a),Number(s)-1,Number(n))}function dt(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Pa(t,e=new Date){switch(t){case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const s=new Date(a);return s.setHours(23,59,59,999),{start:a,end:s}}case"this_week":{const a=new Date(e),s=a.getDay()||7;return a.setDate(a.getDate()-s+1),a.setHours(0,0,0,0),{start:a,end:e}}case"last_week":{const a=new Date(e),s=a.getDay()||7,n=new Date(a);n.setDate(a.getDate()-s),n.setHours(23,59,59,999);const r=new Date(n);return r.setDate(n.getDate()-6),r.setHours(0,0,0,0),{start:r,end:n}}case"this_month":return{start:new Date(e.getFullYear(),e.getMonth(),1),end:e};case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),s=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:a,end:s}}case"this_year":return{start:new Date(e.getFullYear(),0,1),end:e};case"last_year":{const a=new Date(e.getFullYear()-1,0,1),s=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:a,end:s}}}}function La(t,e,a=new Date){const s=ct(t),n=ct(e);if(!s||!n)return null;const r=["yesterday","this_week","last_week","this_month","last_month","this_year","last_year"];for(const l of r){const c=Pa(l,a);if(dt(s,c.start)&&dt(n,c.end))return l}return null}class Ka{constructor(e){ue(this,"root");ue(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartViewportStart:null,chartViewportEnd:null,chartUnit:"kwh",chartConsumptionView:"grid",analysisHeatmapMetric:"grid",analysisComparison:null,analysisComparisonLoading:!1,rangeData:null,consumptionTimeseries:null,productionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:Fa()});ue(this,"preZoomRange",null);ue(this,"preZoomCustomStart","");ue(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await pt();if(this.state.mode=e.mode,e.mode==="standalone"){const a=Wa();if(a&&(this.state.credentials=a),!e.configured&&!a){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&a)try{const{saveCredentials:s}=await X(async()=>{const{saveCredentials:n}=await Promise.resolve().then(()=>se);return{saveCredentials:n}},void 0);await s(a)}catch{}if(!a)try{this.state.credentials=await ht()}catch{}}await this.loadData()}toDisplayError(e,a="Failed to load data"){const s=e instanceof Error?e.message:String(e??"").trim(),n=s.toLowerCase();return n.includes("missing data")||n.includes("no_data")||n.includes("no data")?"Missing data":s||a}clearRangeStateWithError(e,a="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.clearChartViewport(),this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1,this.state.error=this.toDisplayError(e,a)}resetAnalysisComparison(){this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1}clearChartViewport(){this.state.chartViewportStart=null,this.state.chartViewportEnd=null}getCurrentRangeKey(){const{start:e,end:a}=this.getDateRangeISO();return`${e}|${a}`}getComparisonRangeISO(e,a){const s=new Date(e).getTime(),n=new Date(a).getTime(),r=Math.max(0,n-s),l=s-1,c=l-r;return{start:new Date(c).toISOString(),end:new Date(l).toISOString()}}async loadAnalysisComparison(e=!1){var l;if(!this.state.consumptionTimeseries||!this.state.productionTimeseries)return;const{start:a,end:s}=this.getDateRangeISO(),n=`${a}|${s}`;if(!e&&(this.state.analysisComparisonLoading||((l=this.state.analysisComparison)==null?void 0:l.key)===n))return;const r=this.getComparisonRangeISO(a,s);this.state.analysisComparisonLoading=!0,this.state.tab==="charts"&&this.renderPreserveMainScroll();try{const[c,d]=await Promise.all([Y("1-1:1.29.0",r.start,r.end),Y("1-1:2.29.0",r.start,r.end)]);if(n!==this.getCurrentRangeKey())return;this.state.analysisComparison={key:n,start:r.start,end:r.end,consumptionTimeseries:c,productionTimeseries:d}}catch(c){console.warn("Comparison data fetch failed:",c),n===this.getCurrentRangeKey()&&(this.state.analysisComparison=null)}finally{n===this.getCurrentRangeKey()&&(this.state.analysisComparisonLoading=!1,this.state.tab==="charts"&&this.renderPreserveMainScroll())}}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.clearChartViewport(),this.resetAnalysisComparison(),this.render();try{const[e,a,s]=await Promise.all([Se(this.state.range),Ie(),ye()]),{start:n,end:r}=this.getDateRangeISO(),[l,c]=await Promise.all([Y("1-1:1.29.0",n,r),Y("1-1:2.29.0",n,r)]);this.state.rangeData=e,this.state.consumptionTimeseries=l,this.state.productionTimeseries=c,this.state.sensors=a,this.state.config=s}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async changeRange(e){if(this.preZoomRange=null,this.clearChartViewport(),this.state.range=e,this.resetAnalysisComparison(),e==="custom"){if(!this.state.customStart||!this.state.customEnd){const a=new Date;a.setDate(a.getDate()-1);const s=new Date(a);s.setDate(s.getDate()-6),this.state.customStart=s.toISOString().slice(0,10),this.state.customEnd=a.toISOString().slice(0,10)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:a,end:s}=this.getDateRangeISO(),[n,r,l]=await Promise.all([Se(e),Y("1-1:1.29.0",a,s),Y("1-1:2.29.0",a,s)]);this.state.rangeData=n,this.state.consumptionTimeseries=r,this.state.productionTimeseries=l}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async applyCustomRange(){this.preZoomRange=null,this.clearChartViewport();const{customStart:e,customEnd:a}=this.state;if(!(!e||!a)){this.state.error=null,this.state.loading=!0,this.resetAnalysisComparison(),this.render();try{const s=La(e,a),n=s?Se(s):X(async()=>{const{fetchCustomData:d}=await Promise.resolve().then(()=>se);return{fetchCustomData:d}},void 0).then(({fetchCustomData:d})=>d(e,a)),[r,l,c]=await Promise.all([n,Y("1-1:1.29.0",new Date(e+"T00:00:00").toISOString(),new Date(a+"T23:59:59.999").toISOString()),Y("1-1:2.29.0",new Date(e+"T00:00:00").toISOString(),new Date(a+"T23:59:59.999").toISOString())]);this.state.rangeData={range:"custom",consumption:r.consumption,production:r.production,exported:r.exported??0,self_consumed:r.self_consumed??0,grid_import:r.grid_import,solar_to_home:r.solar_to_home,direct_solar_to_home:r.direct_solar_to_home,shared:r.shared,shared_with_me:r.shared_with_me,gas_energy:r.gas_energy??0,gas_volume:r.gas_volume??0,peak_power_kw:r.peak_power_kw??0,exceedance_kwh:r.exceedance_kwh??0,metering_point:r.metering_point??"",start:r.start??e,end:r.end??a},this.state.consumptionTimeseries=l,this.state.productionTimeseries=c}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}}changeTab(e){this.state.tab=e,this.render(),(e==="dashboard"||e==="charts")&&!this.state.rangeData&&!this.state.loading&&this.loadData(),e==="charts"&&this.state.rangeData&&!this.state.analysisComparison&&!this.state.analysisComparisonLoading&&this.loadAnalysisComparison(),e==="sensors"&&!this.state.sensors&&Ie().then(a=>{this.state.sensors=a,this.render()}),e==="settings"&&!this.state.config&&ye().then(a=>{this.state.config=a,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,Ra(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}printInvoice(){var l,c;const e=document.title,s=`Leneda-invoice-${(l=this.state.rangeData)!=null&&l.start&&((c=this.state.rangeData)!=null&&c.end)?`${this.state.rangeData.start.slice(0,10)}_to_${this.state.rangeData.end.slice(0,10)}`:this.state.range}`.replace(/[^a-z0-9_-]+/gi,"-");let n=!1;const r=()=>{n||(n=!0,document.title=e,window.removeEventListener("afterprint",r))};document.title=s,window.addEventListener("afterprint",r,{once:!0}),window.print(),window.setTimeout(r,1e3)}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const a=this.root.querySelector(".main-content");a?a.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}getDataSourceLabel(){return this.state.mode==="ha"?"Home Assistant":"Standalone"}getHostedDataNoticeHtml(){var e;return(((e=this.state.credentials)==null?void 0:e.proxy_url)??"").trim().length>0,""}render(){var d;const{tab:e,loading:a,error:s,theme:n}=this.state,r=this.getDataSourceLabel(),l=this.getHostedDataNoticeHtml();if(a&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${Ke(e,g=>{},!1,n,r)}
          <main class="main-content">
            ${l}
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `,this.attachNavListeners();return}if(s&&!this.state.rangeData){const g=s.toLowerCase().includes("missing data");this.root.innerHTML=`
        <div class="app-shell">
          ${Ke(e,u=>{},!1,n,r)}
          <main class="main-content">
            ${l}
            <div class="error-state">
              <h2>${g?"Missing Data":"Connection Error"}</h2>
              <p>${g?"The selected period could not be loaded because data is missing.":s}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(d=this.root.querySelector("#retry-btn"))==null||d.addEventListener("click",()=>this.loadData());return}let c="";switch(e){case"dashboard":c=qt(this.state);break;case"charts":c=va(this.state);break;case"sensors":c=ya(this.state.sensors);break;case"invoice":c=xa(this.state);break;case"settings":c=Ta(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${Ke(e,g=>this.changeTab(g),this.state.isMenuOpen,n,r)}
        <main class="main-content">
          ${l}
          ${a?'<div class="loading-bar"></div>':""}
          ${c}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachAnalysisListeners(),this.attachInvoiceListeners(),this.attachSettingsListeners()}attachNavListeners(){var e,a;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(a=this.root.querySelector("[data-theme-toggle]"))==null||a.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{const n=s.dataset.tab;this.changeTab(n)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.range;this.changeRange(c)})});const a=this.root.querySelector("#custom-start"),s=this.root.querySelector("#custom-end");a&&a.addEventListener("change",()=>{this.state.customStart=a.value}),s&&s.addEventListener("change",()=>{this.state.customEnd=s.value});const n=this.root.querySelector("#apply-custom-range");if(n==null||n.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.chartUnit;c!==this.state.chartUnit&&(this.state.chartUnit=c,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-view]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.chartView;c!==this.state.chartConsumptionView&&(this.state.chartConsumptionView=c,this.renderPreserveMainScroll())})}),!e){const l=this.root.querySelector("#energy-chart");l&&this.state.rangeData&&this.initChart(l)}const r=this.root.querySelector(".reset-zoom-btn");r==null||r.addEventListener("click",async()=>{const{resetChartZoom:l}=await X(async()=>{const{resetChartZoom:c}=await import("./Charts-C6w_T9a3.js");return{resetChartZoom:c}},[]);if(l(),r.style.display="none",this.clearChartViewport(),this.preZoomRange!==null){const c=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",c==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(c)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachAnalysisListeners(){this.root.querySelectorAll("[data-analysis-heatmap]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisHeatmap;a!==this.state.analysisHeatmapMetric&&(this.state.analysisHeatmapMetric=a,this.renderPreserveMainScroll())})})}attachInvoiceListeners(){var e;(e=this.root.querySelector("#print-invoice-btn"))==null||e.addEventListener("click",()=>{this.printInvoice()})}attachSettingsListeners(){var d,g;const e=this.root.querySelector("#credentials-form");if(e){const u=this.root.querySelector("#add-meter-btn");u==null||u.addEventListener("click",()=>{var m,$,x;const v=new FormData(e),h=p(v);if(h.length<10){h.push({id:"",types:["consumption"]});const D={api_key:v.get("api_key")||((m=this.state.credentials)==null?void 0:m.api_key)||"",energy_id:v.get("energy_id")||(($=this.state.credentials)==null?void 0:$.energy_id)||"",meters:h,proxy_url:v.get("proxy_url")||((x=this.state.credentials)==null?void 0:x.proxy_url)||""};this.state.credentials=D,Ve(D),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach(v=>{v.addEventListener("click",()=>{var D,k,C;const h=parseInt(v.dataset.meter??"0",10),m=new FormData(e),$=p(m);$.splice(h,1);const x={api_key:m.get("api_key")||((D=this.state.credentials)==null?void 0:D.api_key)||"",energy_id:m.get("energy_id")||((k=this.state.credentials)==null?void 0:k.energy_id)||"",meters:$,proxy_url:m.get("proxy_url")||((C=this.state.credentials)==null?void 0:C.proxy_url)||""};this.state.credentials=x,Ve(x),this.renderPreserveMainScroll()})});const p=v=>{var m,$,x;const h=[];for(let D=0;D<10;D++){const k=v.get(`meter_${D}_id`);if(k===null)break;const C=[];(m=e.querySelector(`[name="meter_${D}_consumption"]`))!=null&&m.checked&&C.push("consumption"),($=e.querySelector(`[name="meter_${D}_production"]`))!=null&&$.checked&&C.push("production"),(x=e.querySelector(`[name="meter_${D}_gas"]`))!=null&&x.checked&&C.push("gas"),h.push({id:k.trim(),types:C})}return h};e.addEventListener("submit",async v=>{v.preventDefault();const h=new FormData(e),m={api_key:h.get("api_key"),energy_id:h.get("energy_id"),meters:p(h),proxy_url:h.get("proxy_url")},$=this.root.querySelector("#creds-status");try{Ve(m);const{saveCredentials:x}=await X(async()=>{const{saveCredentials:C}=await Promise.resolve().then(()=>se);return{saveCredentials:C}},void 0);await x(m),$&&($.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=m,this.state.error=null;const D=!1,k=(m.proxy_url??"").trim();await this.loadData()}catch(x){$&&($.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${x instanceof Error?x.message:x}</p>`)}});const o=this.root.querySelector("#test-creds-btn");o==null||o.addEventListener("click",async()=>{const v=new FormData(e),h={api_key:v.get("api_key"),energy_id:v.get("energy_id"),meters:p(v),proxy_url:v.get("proxy_url")},m=this.root.querySelector("#creds-status");m&&(m.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:$}=await X(async()=>{const{testCredentials:D}=await Promise.resolve().then(()=>se);return{testCredentials:D}},void 0),x=await $(h);m&&(m.innerHTML=x.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${x.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${x.message}</p>`)}catch($){m&&(m.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${$ instanceof Error?$.message:$}</p>`)}})}const a=this.root.querySelector("#settings-form");if(!a)return;const s=u=>{const p=[];for(let o=0;o<24;o++){const v=u.get(`consumption_window_${o}_label`),h=u.get(`consumption_window_${o}_day_group`),m=u.get(`consumption_window_${o}_start_time`),$=u.get(`consumption_window_${o}_end_time`),x=u.get(`consumption_window_${o}_rate`);if(v===null&&h===null&&m===null&&$===null&&x===null)break;p.push({label:(v??"").trim()||`Window ${o+1}`,day_group:h??"all",start_time:m??"00:00",end_time:$??"06:00",rate:parseFloat(x??"0")||0})}return p},n=u=>{const p=[];for(let o=0;o<24;o++){const v=u.get(`reference_window_${o}_label`),h=u.get(`reference_window_${o}_day_group`),m=u.get(`reference_window_${o}_start_time`),$=u.get(`reference_window_${o}_end_time`),x=u.get(`reference_window_${o}_reference_power_kw`);if(v===null&&h===null&&m===null&&$===null&&x===null)break;p.push({label:(v??"").trim()||`Reference ${o+1}`,day_group:h??"all",start_time:m??"17:00",end_time:$??"00:00",reference_power_kw:parseFloat(x??"0")||0})}return p},r=()=>{var D;const u=new FormData(a),p={};a.querySelectorAll('input[type="checkbox"]').forEach(k=>{p[k.name]=k.checked});const o=[],v=/^feed_in_rate_(\d+)_(.+)$/,h={},m=[],$=/^meter_fee_(\d+)_(.+)$/,x={};for(const[k,C]of u.entries()){if(k.startsWith("consumption_window_")||k.startsWith("reference_window_"))continue;const b=k.match(v);if(b){const W=b[1],V=b[2];h[W]||(h[W]={}),h[W][V]=C;continue}const y=k.match($);if(y){const W=y[1],V=y[2];x[W]||(x[W]={}),x[W][V]=C;continue}if(p[k]!==void 0&&typeof p[k]=="boolean")continue;const w=C,E=a.elements.namedItem(k);if(w===""&&E instanceof HTMLInputElement&&E.type==="number"){const W=(D=this.state.config)==null?void 0:D[k];typeof W=="number"&&isFinite(W)&&(p[k]=W);continue}const F=parseFloat(w);p[k]=isNaN(F)?w:F}for(const k of Object.keys(h).sort()){const C=h[k],b=C.mode??"fixed",y=b==="sensor"?C.fallback_tariff??C.tariff:C.tariff;o.push({meter_id:C.meter_id??"",mode:b,tariff:parseFloat(y??"0.08")||.08,sensor_entity:C.sensor_entity??""})}o.length>0&&(p.feed_in_rates=o);for(const k of Object.keys(x).sort()){const C=x[k];m.push({meter_id:C.meter_id??"",label:C.label??"",fee:parseFloat(C.fee??"0")||0})}return m.length>0&&(p.meter_monthly_fees=m),p.consumption_rate_windows=s(u),p.reference_power_windows=n(u),p},l=u=>{if(!this.state.config)return;const p=r();u(p),this.state.config={...this.state.config,...p},this.renderPreserveMainScroll()};if((d=this.root.querySelector("#add-consumption-window-btn"))==null||d.addEventListener("click",()=>{l(u=>{var o;const p=Array.isArray(u.consumption_rate_windows)?[...u.consumption_rate_windows]:[];p.push({label:`Window ${p.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((o=this.state.config)==null?void 0:o.energy_variable_rate)??.1125}),u.consumption_rate_windows=p})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(u=>{u.addEventListener("click",()=>{const p=parseInt(u.dataset.window??"0",10);l(o=>{const v=Array.isArray(o.consumption_rate_windows)?[...o.consumption_rate_windows]:[];v.splice(p,1),o.consumption_rate_windows=v})})}),(g=this.root.querySelector("#add-reference-window-btn"))==null||g.addEventListener("click",()=>{l(u=>{var o;const p=Array.isArray(u.reference_power_windows)?[...u.reference_power_windows]:[];p.push({label:`Reference ${p.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((o=this.state.config)==null?void 0:o.reference_power_kw)??5}),u.reference_power_windows=p})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(u=>{u.addEventListener("click",()=>{const p=parseInt(u.dataset.window??"0",10);l(o=>{const v=Array.isArray(o.reference_power_windows)?[...o.reference_power_windows]:[];v.splice(p,1),o.reference_power_windows=v})})}),a.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(u=>{u.addEventListener("change",()=>{const p=u.name.match(/feed_in_rate_(\d+)_mode/);if(!p)return;const o=p[1],v=a.querySelector(`.feed-in-fixed-fields[data-rate-idx="${o}"]`),h=a.querySelector(`.feed-in-sensor-fields[data-rate-idx="${o}"]`);v&&(v.style.display=u.value==="fixed"?"":"none"),h&&(h.style.display=u.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const u=this.root.querySelector("#ha-entity-list");u&&mt().then(({entities:p})=>{u.innerHTML=p.map(o=>`<option value="${o}"></option>`).join("")}).catch(()=>{})}a.addEventListener("submit",async u=>{u.preventDefault();const p=r();try{const{saveConfig:o}=await X(async()=>{const{saveConfig:v}=await Promise.resolve().then(()=>se);return{saveConfig:v}},void 0);await o(p),this.state.config=await ye(),this.render()}catch(o){alert("Failed to save: "+(o instanceof Error?o.message:o))}});const c=this.root.querySelector("#reset-config-btn");c==null||c.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?"))try{const{resetConfig:u}=await X(async()=>{const{resetConfig:p}=await Promise.resolve().then(()=>se);return{resetConfig:p}},void 0);await u(),this.state.config=await ye(),this.render()}catch(u){alert("Failed to reset: "+(u instanceof Error?u.message:u))}})}async initChart(e){var a,s;try{const{renderEnergyChart:n}=await X(async()=>{const{renderEnergyChart:$}=await import("./Charts-C6w_T9a3.js");return{renderEnergyChart:$}},[]),{fetchTimeseries:r,fetchPerMeterTimeseries:l}=await X(async()=>{const{fetchTimeseries:$,fetchPerMeterTimeseries:x}=await Promise.resolve().then(()=>se);return{fetchTimeseries:$,fetchPerMeterTimeseries:x}},void 0),{start:c,end:d}=this.getDateRangeISO(),g=this.state.chartViewportStart?new Date(this.state.chartViewportStart).getTime():void 0,u=this.state.chartViewportEnd?new Date(this.state.chartViewportEnd).getTime():void 0;let p=this.state.consumptionTimeseries,o=this.state.productionTimeseries;(!p||!o)&&([p,o]=await Promise.all([r("1-1:1.29.0",c,d),r("1-1:2.29.0",c,d)]),this.state.consumptionTimeseries=p,this.state.productionTimeseries=o);const v=((a=this.state.config)==null?void 0:a.reference_power_kw)??0,h=(((s=this.state.config)==null?void 0:s.meters)??[]).filter($=>$.types.includes("production"));let m;if(h.length>1)try{const $=await l("1-1:2.29.0",c,d);$.meters&&$.meters.length>1&&(m=$.meters)}catch($){console.warn("Per-meter timeseries fetch failed, using merged view:",$)}n(e,p,o,{unit:this.state.chartUnit,consumptionView:this.state.chartConsumptionView,referencePowerKw:v,perMeterProduction:m,viewportStartMs:g,viewportEndMs:u,onZoomChange:($,x)=>{this.handleChartZoomChange($,x)}})}catch(n){console.error("Chart init failed:",n)}}async handleChartZoomChange(e,a){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd);const{fetchCustomData:s}=await X(async()=>{const{fetchCustomData:g}=await Promise.resolve().then(()=>se);return{fetchCustomData:g}},void 0),n=e.slice(0,10),r=a.slice(0,10);this.resetAnalysisComparison();const l=await s(e,a),[c,d]=await Promise.all([Y("1-1:1.29.0",e,a),Y("1-1:2.29.0",e,a)]);this.state.range="custom",this.state.customStart=n,this.state.customEnd=r,this.state.chartViewportStart=e,this.state.chartViewportEnd=a,this.state.rangeData={range:"custom",consumption:l.consumption,production:l.production,exported:l.exported??0,self_consumed:l.self_consumed??0,gas_energy:l.gas_energy??0,gas_volume:l.gas_volume??0,grid_import:l.grid_import,solar_to_home:l.solar_to_home,direct_solar_to_home:l.direct_solar_to_home,shared:l.shared,shared_with_me:l.shared_with_me,peak_power_kw:l.peak_power_kw??0,exceedance_kwh:l.exceedance_kwh??0,metering_point:l.metering_point??"",start:l.start,end:l.end},this.state.consumptionTimeseries=c,this.state.productionTimeseries=d,this.renderPreserveMainScroll()}catch(s){console.error("Zoom data fetch failed:",s),this.clearRangeStateWithError(s,"Missing data"),this.render()}}getDateRangeISO(){if(this.state.chartViewportStart&&this.state.chartViewportEnd)return{start:this.state.chartViewportStart,end:this.state.chartViewportEnd};const e=new Date,a=s=>s.toISOString();switch(this.state.range){case"custom":{const s=new Date(this.state.customStart+"T00:00:00"),n=new Date(this.state.customEnd+"T23:59:59.999");return{start:a(s),end:a(n)}}case"yesterday":{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const n=new Date(s);return n.setHours(23,59,59,999),{start:a(s),end:a(n)}}case"this_week":{const s=new Date(e),n=s.getDay()||7;return s.setDate(s.getDate()-n+1),s.setHours(0,0,0,0),{start:a(s),end:a(e)}}case"last_week":{const s=new Date(e),n=s.getDay()||7,r=new Date(s);r.setDate(s.getDate()-n),r.setHours(23,59,59,999);const l=new Date(r);return l.setDate(r.getDate()-6),l.setHours(0,0,0,0),{start:a(l),end:a(r)}}case"this_month":{const s=new Date(e.getFullYear(),e.getMonth(),1);return{start:a(s),end:a(e)}}case"last_month":{const s=new Date(e.getFullYear(),e.getMonth()-1,1),n=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:a(s),end:a(n)}}case"this_year":{const s=new Date(e.getFullYear(),0,1);return{start:a(s),end:a(e)}}case"last_year":{const s=new Date(e.getFullYear()-1,0,1),n=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:a(s),end:a(n)}}default:{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const n=new Date(s);return n.setHours(23,59,59,999),{start:a(s),end:a(n)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new Ka(t).mount()}
