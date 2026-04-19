var Tt=Object.defineProperty;var Wt=(t,e,a)=>e in t?Tt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var ce=(t,e,a)=>Wt(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const Ft="modulepreload",Rt=function(t){return"/leneda-panel/static/"+t},je={},Z=function(e,a,s){let n=Promise.resolve();if(a&&a.length>0){let i=function(g){return Promise.all(g.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),d=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));n=i(a.map(g=>{if(g=Rt(g),g in je)return;je[g]=!0;const u=g.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${g}"]${p}`))return;const o=document.createElement("link");if(o.rel=u?"stylesheet":Ft,u||(o.as="script"),o.crossOrigin="",o.href=g,d&&o.setAttribute("nonce",d),document.head.appendChild(o),u)return new Promise((v,h)=>{o.addEventListener("load",v),o.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${g}`)))})}))}function r(i){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=i,window.dispatchEvent(c),!c.defaultPrevented)throw i}return n.then(i=>{for(const c of i||[])c.status==="rejected"&&r(c.reason);return e().catch(r)})};function ot(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()})),proxy_url:(t.proxy_url??"").trim()}}function Pt(){var t,e,a,s,n;try{const r=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((n=(s=(a=r==null?void 0:r.hass)==null?void 0:a.auth)==null?void 0:s.data)==null?void 0:n.access_token)??null}catch{return null}}async function G(t,e){const a=Pt(),s={...e==null?void 0:e.headers,...a?{Authorization:`Bearer ${a}`}:{}},n={...e,credentials:"include",headers:s},r=await fetch(t,n);if(!r.ok){const i=r.headers.get("content-type")??"";let c="",d="";if(i.includes("application/json")){const g=await r.json().catch(()=>null);c=String((g==null?void 0:g.error)??"").trim(),d=String((g==null?void 0:g.message)??(g==null?void 0:g.error)??"").trim()}else d=(await r.text().catch(()=>"")).trim();throw c==="missing_data"||c==="no_data"||r.status===503?new Error("Missing data"):new Error(d?`API ${r.status}: ${d}`:`API ${r.status}: ${r.statusText}`)}return r.json()}async function ke(t){return G(`/leneda_api/data?range=${t}`)}async function Lt(t,e){return G(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function U(t,e,a){let s=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(s+=`&start=${encodeURIComponent(e)}`),a&&(s+=`&end=${encodeURIComponent(a)}`),G(s)}async function Kt(t,e,a){let s=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(s+=`&start=${encodeURIComponent(e)}`),a&&(s+=`&end=${encodeURIComponent(a)}`),G(s)}async function Le(){return G("/leneda_api/sensors")}async function ye(){return G("/leneda_api/config")}async function Vt(t){await G("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function It(){await G("/leneda_api/config/reset",{method:"POST"})}async function it(){try{return await G("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function lt(){return G("/leneda_api/credentials")}async function At(t){const e=ot(t);await G("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Ht(t){const e=ot(t);return G("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function ct(){return G("/leneda_api/ha-entities")}const ae=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:ye,fetchCredentials:lt,fetchCustomData:Lt,fetchHAEntities:ct,fetchMode:it,fetchPerMeterTimeseries:Kt,fetchRangeData:ke,fetchSensors:Le,fetchTimeseries:U,resetConfig:It,saveConfig:Vt,saveCredentials:At,testCredentials:Ht},Symbol.toStringTag,{value:"Module"}));function l(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function se(t){return new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function dt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}const we=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function Gt(t){var ve,q,z;const e=t.rangeData,a=$=>{if(!$)return"";const E=$.match(/^(\d{4}-\d{2}-\d{2})/);return E?E[1]:""},s=(e==null?void 0:e.consumption)??0,n=(e==null?void 0:e.production)??0,r=(e==null?void 0:e.exported)??0,i=(e==null?void 0:e.self_consumed)??0,c=(e==null?void 0:e.gas_energy)??0,d=(e==null?void 0:e.gas_volume)??0,g=(e==null?void 0:e.peak_power_kw)??0,u=a(e==null?void 0:e.start),p=a(e==null?void 0:e.end),o=(e==null?void 0:e.shared_with_me)??0,v=(e==null?void 0:e.shared)??0,h=Math.max(0,r),m=Math.max(0,(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(i>0?i:n-h)),_=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??m),k=m,D=Math.max(0,(e==null?void 0:e.grid_import)??s-m),x=s>0?s:D+m,C=!!((ve=t.config)!=null&&ve.meter_has_gas||(((q=t.config)==null?void 0:q.meters)??[]).some($=>$.types.includes("gas"))),b=v+o,f=x>0?Math.min(100,m/x*100):0,y=Math.max(x,n,D,h,v,o,_,1),M=C?Math.min(Math.max(0,c),y):0,F=($,E=2.8,T=8.2)=>$>0?E+$/y*(T-E):1.8,W=$=>F($)+1.4,I=$=>F($)+5.4,H=($,E=.28,T=.88)=>$>0?E+$/y*(T-E):.1,V=($,E=.09,T=.22)=>$>0?E+$/y*(T-E):.05,J=($,E=1.6,T=3.9)=>`${($>0?Math.max(E,T-$/y*(T-E)):T).toFixed(2)}s`,ue=($,E=3.4,T=5.8)=>$>0?E+$/y*(T-E):3,Y=$=>$>0?Math.max(18,Math.round($/y*100)):0,ie=$=>`
    <defs>
      <filter id="${$}-glow-red" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${$}-glow-green" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${$}-glow-blue" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${$}-glow-cyan" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${$}-glow-gas" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <linearGradient id="${$}-flow-solar" x1="50%" y1="6%" x2="50%" y2="88%">
        <stop offset="0%" stop-color="var(--clr-production)" stop-opacity="0.28" />
        <stop offset="100%" stop-color="var(--clr-production)" stop-opacity="1" />
      </linearGradient>
      <linearGradient id="${$}-flow-grid-in" x1="8%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stop-color="var(--clr-consumption)" stop-opacity="0.35" />
        <stop offset="100%" stop-color="var(--clr-consumption)" stop-opacity="0.95" />
      </linearGradient>
      <linearGradient id="${$}-flow-grid-out" x1="100%" y1="44%" x2="4%" y2="76%">
        <stop offset="0%" stop-color="var(--clr-export)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--clr-export)" stop-opacity="0.4" />
      </linearGradient>
      <linearGradient id="${$}-flow-shared-out" x1="0%" y1="48%" x2="100%" y2="48%">
        <stop offset="0%" stop-color="var(--clr-export)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--clr-export)" stop-opacity="0.45" />
      </linearGradient>
      <linearGradient id="${$}-flow-shared-in" x1="100%" y1="48%" x2="0%" y2="48%">
        <stop offset="0%" stop-color="var(--clr-primary)" stop-opacity="0.4" />
        <stop offset="100%" stop-color="var(--clr-primary)" stop-opacity="1" />
      </linearGradient>
      <linearGradient id="${$}-flow-gas" x1="50%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stop-color="var(--clr-gas)" stop-opacity="0.3" />
        <stop offset="100%" stop-color="var(--clr-gas)" stop-opacity="0.95" />
      </linearGradient>

      <linearGradient id="${$}-scene-shell" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.05)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
      </linearGradient>
      <radialGradient id="${$}-house-base-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--clr-surface-alt)" stop-opacity="0.8" />
        <stop offset="100%" stop-color="var(--clr-surface-alt)" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="${$}-house-core-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(88, 166, 255, 0.18)" />
        <stop offset="100%" stop-color="rgba(88, 166, 255, 0)" />
      </radialGradient>
    </defs>
  `,j=$=>{const{x:E,y:T,width:L,accent:K,kicker:ee,value:B,detail:N}=$;return`
      <g class="scene-node-label" transform="translate(${E}, ${T})">
        <rect width="${L}" height="${N?70:54}" rx="18" fill="var(--clr-overlay)" stroke="${K}" />
        <text x="16" y="22" class="scene-node-kicker">${ee}</text>
        <text x="16" y="${N?39:37}" class="scene-node-value">${B}</text>
        ${N?`<text x="16" y="56" class="scene-node-detail">${N}</text>`:""}
      </g>
    `},pe=$=>{const{x:E,y:T,scale:L=1,glowId:K}=$;return`
      <g class="scene-tier-icon scene-tier-grid" transform="translate(${E}, ${T}) scale(${L})">
        <circle cx="0" cy="44" r="48" fill="var(--clr-consumption)" fill-opacity="0.06" />
        <path d="M0 0 V88 M-24 20 H24 M-16 42 H16 M-8 66 H8" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" filter="url(#${K})" />
        <path d="M-12 88 L0 60 L12 88" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" fill="none" />
      </g>
    `},he=$=>{const{x:E,y:T,scale:L=1,glowId:K}=$;return`
      <g class="scene-tier-icon scene-tier-solar" transform="translate(${E}, ${T}) scale(${L})">
        <circle cx="0" cy="0" r="26" fill="var(--clr-production)" fill-opacity="0.09" />
        <circle cx="0" cy="0" r="12" fill="var(--clr-production)" fill-opacity="0.9" filter="url(#${K})" />
        <path d="M0 -26 V-40 M0 26 V40 M26 0 H40 M-26 0 H-40 M18 -18 L28 -28 M18 18 L28 28 M-18 18 L-28 28 M-18 -18 L-28 -28" stroke="var(--clr-production)" stroke-width="2.5" stroke-linecap="round" />
      </g>
    `},le=$=>{const{x:E,y:T,scale:L=1,glowId:K}=$;return`
      <g class="scene-tier-icon scene-tier-community" transform="translate(${E}, ${T}) scale(${L})">
        <circle cx="0" cy="40" r="50" fill="var(--clr-primary)" fill-opacity="0.06" />
        <rect x="-26" y="30" width="22" height="42" rx="6" fill="rgba(88, 166, 255, 0.08)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="6" y="16" width="24" height="56" rx="6" fill="rgba(88, 166, 255, 0.12)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="-2" y="4" width="6" height="10" rx="2" fill="var(--clr-primary)" fill-opacity="0.7" />
        <path d="M-14 12 H14 M-10 4 V20 M10 4 V20" stroke="var(--clr-primary)" stroke-width="2" stroke-linecap="round" filter="url(#${K})" />
      </g>
    `},re=$=>{const{x:E,y:T,scale:L=1,glowId:K}=$;return`
      <g class="scene-tier-icon scene-tier-gas" transform="translate(${E}, ${T}) scale(${L})">
        <circle cx="0" cy="38" r="46" fill="var(--clr-gas)" fill-opacity="0.08" />
        <path d="M-26 40 H-8 V72 H26" stroke="var(--clr-gas)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#${K})" />
        <path d="M0 4 C18 24 20 40 20 52 C20 70 9 84 0 84 C-9 84 -20 70 -20 52 C-20 38 -10 24 0 4 Z" fill="rgba(210, 153, 34, 0.14)" stroke="var(--clr-gas)" stroke-width="2.2" />
        <path d="M0 24 C9 35 10 44 10 52 C10 61 5 68 0 72 C-5 68 -10 61 -10 52 C-10 44 -8 35 0 24 Z" fill="var(--clr-gas)" fill-opacity="0.85" />
      </g>
    `},me=$=>{const{prefix:E,x:T,y:L,scale:K=1}=$;return`
      <g class="elite-house" transform="translate(${T}, ${L}) scale(${K})">
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
          <text text-anchor="middle" y="18" class="house-core-value">${l(f,0)}%</text>
        </g>
        <text x="90" y="262" text-anchor="middle" class="house-total-label">Home usage</text>
        <text x="90" y="284" text-anchor="middle" class="house-total-value">${l(x)} kWh</text>
      </g>
    `},A=$=>{const{path:E,value:T,gradientId:L,colorVar:K,filterId:ee,particleClass:B,direction:N="forward"}=$,te=N==="reverse"?"1;0":"0;1";return`
      <path
        class="flow-halo ${B}"
        d="${E}"
        stroke="url(#${L})"
        stroke-width="${I(T).toFixed(1)}"
        stroke-opacity="${V(T).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-rail ${B}"
        d="${E}"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="${W(T).toFixed(1)}"
        stroke-opacity="0.42"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-stream ${B}"
        d="${E}"
        stroke="url(#${L})"
        stroke-width="${F(T).toFixed(1)}"
        stroke-opacity="${H(T).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      ${T>0?`
        <circle
          class="flow-particle ${B}"
          r="${ue(T).toFixed(1)}"
          fill="${K}"
          filter="url(#${ee})"
        >
          <animateMotion dur="${J(T)}" repeatCount="indefinite" path="${E}" keyPoints="${te}" keyTimes="0;1" calcMode="linear" />
        </circle>
        <circle
          class="flow-particle flow-particle-secondary ${B}"
          r="${Math.max(2.4,ue(T)-1.2).toFixed(1)}"
          fill="${K}"
          fill-opacity="0.75"
          filter="url(#${ee})"
        >
          <animateMotion dur="${J(T)}" begin="-${(parseFloat(J(T))/2).toFixed(2)}s" repeatCount="indefinite" path="${E}" keyPoints="${te}" keyTimes="0;1" calcMode="linear" />
        </circle>
      `:""}
    `},xe=()=>`
    <div class="elite-scene elite-scene-desktop">
      <svg class="elite-main-svg" viewBox="0 0 860 460" fill="none" preserveAspectRatio="xMidYMid meet">
        ${ie("desktop")}
        <rect x="34" y="30" width="792" height="372" rx="34" fill="url(#desktop-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="430" cy="330" rx="278" ry="60" fill="url(#desktop-house-base-glow)" opacity="0.56" />
        <line x1="98" y1="334" x2="762" y2="334" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.45" />

        ${j({x:58,y:108,width:152,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${l(D+h)} kWh`,detail:h>0?`In ${l(D)} / out ${l(h)} kWh`:void 0})}

        ${j({x:356,y:44,width:148,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${l(n)} kWh`,detail:`${l(m)} kWh used at home`})}

        ${j({x:624,y:108,width:184,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${l(b)} kWh`,detail:`Sent ${l(v)} / got ${l(o)} kWh`})}

        ${C?j({x:350,y:338,width:160,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${l(c)} kWh`,detail:d>0?`${l(d)} m3 in period`:"Gas meter active"}):""}

        ${pe({x:132,y:186,scale:1.02,glowId:"desktop-glow-red"})}
        ${he({x:430,y:126,glowId:"desktop-glow-green"})}
        ${le({x:716,y:194,glowId:"desktop-glow-cyan"})}
        ${C?re({x:430,y:352,glowId:"desktop-glow-gas"}):""}
        ${me({prefix:"desktop",x:340,y:96,scale:1.02})}

        ${A({path:"M 430 152 C 430 182 430 204 430 220",value:_,gradientId:"desktop-flow-solar",colorVar:"var(--clr-production)",filterId:"desktop-glow-green",particleClass:"flow-solar"})}

        ${A({path:"M 176 230 C 246 230 318 230 364 232",value:D,gradientId:"desktop-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"desktop-glow-red",particleClass:"flow-grid-in"})}

        ${A({path:"M 496 268 C 430 298 326 314 176 316",value:h,gradientId:"desktop-flow-grid-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-grid-out"})}

        ${A({path:"M 500 234 C 566 220 634 220 692 236",value:v,gradientId:"desktop-flow-shared-out",colorVar:"var(--clr-export)",filterId:"desktop-glow-blue",particleClass:"flow-shared-out"})}

        ${A({path:"M 690 272 C 632 292 566 294 500 278",value:o,gradientId:"desktop-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"desktop-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${C?A({path:"M 430 404 C 430 370 430 336 430 302",value:M,gradientId:"desktop-flow-gas",colorVar:"var(--clr-gas)",filterId:"desktop-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,Ce=()=>`
    <div class="elite-scene elite-scene-mobile">
      <svg class="elite-main-svg" viewBox="0 0 420 560" fill="none" preserveAspectRatio="xMidYMid meet">
        ${ie("mobile")}
        <rect x="20" y="20" width="380" height="520" rx="32" fill="url(#mobile-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="210" cy="316" rx="136" ry="38" fill="url(#mobile-house-base-glow)" opacity="0.58" />
        <line x1="64" y1="332" x2="356" y2="332" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.42" />

        ${j({x:132,y:40,width:156,accent:"rgba(63, 185, 80, 0.26)",kicker:"Solar",value:`${l(n)} kWh`})}

        ${j({x:20,y:194,width:126,accent:"rgba(248, 81, 73, 0.26)",kicker:"Grid",value:`${l(D+h)} kWh`})}

        ${j({x:274,y:194,width:126,accent:"rgba(88, 166, 255, 0.26)",kicker:"Community",value:`${l(b)} kWh`})}

        ${C?j({x:122,y:442,width:176,accent:"rgba(210, 153, 34, 0.28)",kicker:"Gas",value:`${l(c)} kWh`,detail:d>0?`${l(d)} m3`:"Gas meter active"}):""}

        ${he({x:210,y:126,scale:.92,glowId:"mobile-glow-green"})}
        ${pe({x:76,y:254,scale:.86,glowId:"mobile-glow-red"})}
        ${le({x:344,y:260,scale:.86,glowId:"mobile-glow-cyan"})}
        ${C?re({x:210,y:442,scale:.9,glowId:"mobile-glow-gas"}):""}
        ${me({prefix:"mobile",x:118,y:166,scale:.94})}

        ${A({path:"M 210 152 C 210 188 210 216 210 238",value:_,gradientId:"mobile-flow-solar",colorVar:"var(--clr-production)",filterId:"mobile-glow-green",particleClass:"flow-solar"})}

        ${A({path:"M 104 286 C 138 286 168 286 194 286",value:D,gradientId:"mobile-flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"mobile-glow-red",particleClass:"flow-grid-in"})}

        ${A({path:"M 226 318 C 194 340 162 348 102 350",value:h,gradientId:"mobile-flow-grid-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-grid-out"})}

        ${A({path:"M 226 286 C 262 274 294 274 318 286",value:v,gradientId:"mobile-flow-shared-out",colorVar:"var(--clr-export)",filterId:"mobile-glow-blue",particleClass:"flow-shared-out"})}

        ${A({path:"M 318 320 C 294 332 262 334 226 322",value:o,gradientId:"mobile-flow-shared-in",colorVar:"var(--clr-primary)",filterId:"mobile-glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}

        ${C?A({path:"M 210 474 C 210 432 210 390 210 344",value:M,gradientId:"mobile-flow-gas",colorVar:"var(--clr-gas)",filterId:"mobile-glow-gas",particleClass:"flow-gas"}):""}
      </svg>
    </div>
  `,Q=e!=null&&e.start&&(e!=null&&e.end)?`${se(e.start)} — ${se(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${se(t.customStart+"T00:00:00")} — ${se(t.customEnd+"T00:00:00")}`:((z=we.find($=>$.id===t.range))==null?void 0:z.label)??"Yesterday",ge=t.chartConsumptionView==="house"?"Total Usage shows the full house load, with the solar-covered share highlighted in green and exports below zero · Scroll to zoom · Drag to pan":"Net Grid focuses on what still came from the grid after solar, with exports shown below zero · The reference limit in kW mode applies here · Scroll to zoom · Drag to pan";return`
    <div class="dashboard" style="position: relative;">
      <div style="position:fixed;bottom:4px;right:4px;font-size:10px;opacity:0.5;pointer-events:none;z-index:9999;">v:2.5.0</div>

      <!-- Range Selector -->
      <div class="range-selector">
        ${we.map($=>`
          <button
            class="range-btn ${$.id===t.range?"active":""}"
            data-range="${$.id}"
          >${$.label}</button>
        `).join("")}
      </div>

      ${(()=>{if(!(e!=null&&e.start)||!(e!=null&&e.end))return"";try{const $=new Date(e.start),E=new Date(e.end);return isNaN($.getTime())||isNaN(E.getTime())?"":`
            <div class="range-info-bar">
              📅 ${$.toLocaleDateString()} — ${E.toLocaleDateString()}
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
            <div class="stat-value">${l(s)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card production">
          <div class="stat-icon">☀️</div>
          <div class="stat-body">
            <div class="stat-label">Production</div>
            <div class="stat-value">${l(n)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.export">
          <div class="stat-icon">📤</div>
          <div class="stat-body">
            <div class="stat-label">Exported</div>
            <div class="stat-value">${l(r)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.self-consumed">
          <div class="stat-icon">🏠</div>
          <div class="stat-body">
            <div class="stat-label">Self-Consumed</div>
            <div class="stat-value">${l(k)} <span class="stat-unit">kWh</span></div>
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
                    <span class="module-value highlight-red">${l(s)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg red"></div></div>
              </div>

              <div class="glass-module production-module">
                <div class="module-info">
                  <span class="module-label">Solar Production <span class="info-icon">ⓘ</span></span>
                  <div class="module-value-row">
                    <span class="module-value highlight-green">${l(n)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg green"></div></div>
              </div>
            </div>

            ${xe()}
            ${Ce()}

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${l(x)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${l(f,0)}% solar supplied${g>0?` · Peak ${l(g,2)} kW`:""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${l(m)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${Y(m)}%;"></span></div>
                  <p>Energy used inside the house${o>0?", including received community energy":""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${l(D)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${Y(D)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${l(h)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${Y(h)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${l(b)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${Y(b)}%;"></span></div>
                  <p>Sent ${l(v)} kWh · received ${l(o)} kWh.</p>
                </div>
                ${C?`
                <div class="mobile-flow-item gas">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Gas to house</span>
                    <strong>${l(c)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${Y(M||y)}%;"></span></div>
                  <p>${d>0?`${l(d)} m3 measured for the same period.`:"Gas meter is configured for this home."}</p>
                </div>
                `:""}
              </div>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${l(m)} kWh used in the house</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${l(D)} kWh bought from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${l(h)} kWh sent back to the market</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${l(v)} kWh sent · ${l(o)} kWh received${o>0?" (included in solar to home)":""}</span>
                </span>
              </div>
              ${C?`
              <div class="flow-legend-item gas">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Gas to house</strong>
                  <span>${l(c)} kWh${d>0?` / ${l(d)} m3`:""}</span>
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
              <span class="metric-value">${l(f,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${f}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Consumed</span>
              <span class="metric-value">${l(k)} kWh</span>
            </div>
          </div>
          ${g>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${l(g,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label">${((e==null?void 0:e.exceedance_kwh)??0)>0?"⚠️":"✅"} Exceedance</span>
              <span class="metric-value">${l((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${c>0||d>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${l(c)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${l(d)} m³</span>
            </div>
          </div>
          `:""}
        </div>
      </div>
      </div>

      <!-- Chart -->
      <div class="card chart-card">
        <div class="chart-header">
          <h3 class="card-title"><span class="title-icon">📉</span> Energy Profile — ${Q}</h3>
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
          ${ge}
        </p>
      </div>

      </div>

      </div>
    </section>
  `}const qe=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],Fe={house:"Total Usage",grid:"Net Grid",solar:"Solar Production"};function ze(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function Nt(t){const e=new Date(t),a=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${s}-${n}`}function Ot(t){const[e,a,s]=t.split("-").map(Number);return new Date(e,a-1,s,12,0,0,0)}function de(t,e=0){return t.length?Math.max(...t):e}function ut(t,e=0){return t.length?Math.min(...t):e}function Ut(t,e,a){return Math.min(a,Math.max(e,t))}function O(t,e){return`${l(t,2)} ${e}`}function $e(t,e=1){return Math.abs(t)<.005?"0":`${t>0?"+":""}${l(t,e)}`}function Be(t){const[e,a]=t.split(":").map(s=>parseInt(s,10)||0);return e*60+a}function Yt(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function pt(t,e,a,s){if(!Yt(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),r=Be(a),i=Be(s);return r===i?!0:r<i?n>=r&&n<i:n>=r||n<i}function jt(t,e){return e.find(a=>pt(t,a.day_group,a.start_time,a.end_time))}function qt(t,e){return e.find(a=>pt(t,a.day_group,a.start_time,a.end_time))}function zt(t){const e=(t.meters??[]).filter(n=>n.types.includes("production")),a=t.feed_in_rates??[];if(!e.length)return t.feed_in_tariff??0;const s=e.map(n=>{const r=a.find(c=>c.meter_id===n.id);return r?r.mode==="sensor"&&r.sensor_value!=null&&Number.isFinite(r.sensor_value)?r.sensor_value??0:Number.isFinite(r.tariff)?r.tariff:t.feed_in_tariff??0:t.feed_in_tariff??0}).filter(n=>Number.isFinite(n)&&n>=0);return s.length?s.reduce((n,r)=>n+r,0)/s.length:t.feed_in_tariff??0}function Bt(t,e,a){const s=new Map;for(const g of t.items){const u=new Date(g.startedAt).getTime();if(!Number.isFinite(u))continue;const p=s.get(u)??{houseKw:0,solarKw:0,iso:g.startedAt};p.houseKw+=Math.max(0,Number(g.value)||0),p.iso=g.startedAt,s.set(u,p)}for(const g of e.items){const u=new Date(g.startedAt).getTime();if(!Number.isFinite(u))continue;const p=s.get(u)??{houseKw:0,solarKw:0,iso:g.startedAt};p.solarKw+=Math.max(0,Number(g.value)||0),p.iso=p.iso||g.startedAt,s.set(u,p)}const n=a.consumption_rate_windows??[],r=a.reference_power_windows??[],i=a.reference_power_kw??0,c=zt(a),d=(a.exceedance_rate??0)*(1+(a.vat_rate??0));return[...s.entries()].sort((g,u)=>g[0]-u[0]).map(([g,u])=>{var y,M;const p=new Date(g),o=Math.max(0,u.houseKw),v=Math.max(0,u.solarKw),h=Math.max(0,Math.min(o,v)),m=Math.max(0,o-h),_=Math.max(0,v-h),k=((y=qt(p,r))==null?void 0:y.reference_power_kw)??i,D=Math.max(0,o-k),x=Math.max(0,m-k),C=Math.max(0,D-x),f=((((M=jt(p,n))==null?void 0:M.rate)??a.energy_variable_rate??0)+(a.network_variable_rate??0)+(a.electricity_tax_rate??0)+(a.compensation_fund_rate??0))*(1+(a.vat_rate??0));return{timestamp:g,iso:u.iso,date:p,houseKw:o,solarKw:v,solarToHomeKw:h,gridKw:m,exportKw:_,referenceKw:k,overKw:x,avoidedOverKw:C,importRateWithVat:f,feedInRate:c,exceedanceRateWithVat:d}})}function ht(t,e,a){const s=Bt(t,e,a),n=new Map,r=Array.from({length:24},()=>0),i={house:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),grid:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),solar:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0})))},c={houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0};for(const o of s){const h=Nt(o.timestamp),m=n.get(h)??(()=>{const J=Ot(h);return{key:h,label:J.toLocaleDateString(void 0,{month:"short",day:"numeric"}),fullDate:J.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0}})(),_=o.houseKw*.25,k=o.solarKw*.25,D=o.solarToHomeKw*.25,x=o.gridKw*.25,C=o.exportKw*.25,b=o.overKw*.25,f=o.avoidedOverKw*.25,y=x*o.importRateWithVat,M=D*o.importRateWithVat,F=C*o.feedInRate,W=b*o.exceedanceRateWithVat,I=f*o.exceedanceRateWithVat;m.houseKwh+=_,m.solarKwh+=k,m.solarToHomeKwh+=D,m.gridKwh+=x,m.exportKwh+=C,m.exceedanceKwh+=b,m.avoidedExceedanceKwh+=f,m.importCost+=y,m.solarSavings+=M,m.exportRevenue+=F,m.exceedanceCost+=W,m.avoidedExceedanceValue+=I,m.peakGridKw=Math.max(m.peakGridKw,o.gridKw),m.peakHouseKw=Math.max(m.peakHouseKw,o.houseKw),m.exceedanceIntervals+=o.overKw>0?1:0,n.set(h,m),c.houseKwh+=_,c.solarKwh+=k,c.solarToHomeKwh+=D,c.gridKwh+=x,c.exportKwh+=C,c.exceedanceKwh+=b,c.avoidedExceedanceKwh+=f,c.importCost+=y,c.solarSavings+=M,c.exportRevenue+=F,c.exceedanceCost+=W,c.avoidedExceedanceValue+=I,c.peakGridKw=Math.max(c.peakGridKw,o.gridKw),c.peakHouseKw=Math.max(c.peakHouseKw,o.houseKw),c.exceedanceIntervals+=o.overKw>0?1:0;const H=(o.date.getDay()+6)%7,V=o.date.getHours();i.house[H][V].sum+=o.houseKw,i.house[H][V].count+=1,i.grid[H][V].sum+=o.gridKw,i.grid[H][V].count+=1,i.solar[H][V].sum+=o.solarKw,i.solar[H][V].count+=1,r[V]+=b}const d=[...n.values()].sort((o,v)=>o.key.localeCompare(v.key)).map(o=>(o.coveragePct=o.houseKwh>0?o.solarToHomeKwh/o.houseKwh*100:0,o.selfConsumedPct=o.solarKwh>0?o.solarToHomeKwh/o.solarKwh*100:0,o.solarValue=o.solarSavings+o.exportRevenue+o.avoidedExceedanceValue,o));c.coveragePct=c.houseKwh>0?c.solarToHomeKwh/c.houseKwh*100:0,c.selfConsumedPct=c.solarKwh>0?c.solarToHomeKwh/c.solarKwh*100:0,c.solarValue=c.solarSavings+c.exportRevenue+c.avoidedExceedanceValue;const g={house:i.house.map(o=>o.map(v=>v.count?v.sum/v.count:0)),grid:i.grid.map(o=>o.map(v=>v.count?v.sum/v.count:0)),solar:i.solar.map(o=>o.map(v=>v.count?v.sum/v.count:0))},u=s.filter(o=>o.overKw>0).sort((o,v)=>v.overKw-o.overKw||v.timestamp-o.timestamp).slice(0,8),p=[...d].filter(o=>o.exceedanceKwh>0).sort((o,v)=>v.exceedanceKwh-o.exceedanceKwh).slice(0,6);return{daily:d,totals:c,topExceedances:u,hourlyExceedanceKwh:r,heatmapValues:g,loadDurationGrossKw:s.map(o=>o.houseKw).sort((o,v)=>v-o),loadDurationNetKw:s.map(o=>o.gridKw).sort((o,v)=>v-o),worstDays:p}}function Xt(t){var e,a,s;return(e=t.rangeData)!=null&&e.start&&((a=t.rangeData)!=null&&a.end)?`${se(t.rangeData.start)} - ${se(t.rangeData.end)}`:((s=we.find(n=>n.id===t.range))==null?void 0:s.label)??"Selected Period"}function Zt(t){var e,a;return(e=t.rangeData)!=null&&e.start&&((a=t.rangeData)!=null&&a.end)?`${new Date(t.rangeData.start).toLocaleDateString()} - ${new Date(t.rangeData.end).toLocaleDateString()}`:t.range==="custom"&&t.customStart&&t.customEnd?`${t.customStart} - ${t.customEnd}`:"Based on the currently selected range."}function Xe(t){return t.analysisComparison?`Previous matched period: ${new Date(t.analysisComparison.start).toLocaleDateString()} - ${new Date(t.analysisComparison.end).toLocaleDateString()}`:"Previous matched period"}function oe(t){const e=t.series.filter(y=>y.values.length>0);if(!e.length)return'<div class="analysis-empty">No chart data available for this period.</div>';const a=Math.max(...e.map(y=>y.values.length)),s=Math.max(720,a*24+92),n=244,r=50,i=20,c=18,d=30,g=e.flatMap(y=>y.values);t.referenceValue!=null&&g.push(t.referenceValue);let u=t.minValue??ut(g,0),p=t.maxValue??de(g,1);u===p&&(p+=1,u=Math.min(0,u-1)),t.minValue==null&&(u=Math.min(0,u));const o=s-r-i,v=n-c-d,h=(y,M)=>M<=1?r+o/2:r+y*o/(M-1),m=y=>c+(p-y)/(p-u)*v,_=t.valueFormatter??(y=>l(y,1)),k=Array.from({length:4},(y,M)=>u+(p-u)/3*M),D=[0,Math.floor((a-1)/2),a-1].filter((y,M,F)=>F.indexOf(y)===M),x=k.map(y=>{const M=m(y);return`
      <line x1="${r}" y1="${M.toFixed(1)}" x2="${(s-i).toFixed(1)}" y2="${M.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${r-8}" y="${(M+4).toFixed(1)}" class="analysis-svg-tick">${_(y)}</text>
    `}).join(""),C=t.referenceValue!=null?(()=>{const y=m(t.referenceValue);return`
        <line x1="${r}" y1="${y.toFixed(1)}" x2="${(s-i).toFixed(1)}" y2="${y.toFixed(1)}" class="analysis-svg-reference" />
        ${t.referenceLabel?`<text x="${s-i}" y="${(y-8).toFixed(1)}" class="analysis-svg-reference-label">${t.referenceLabel}</text>`:""}
      `})():"",b=e.map(y=>{const M=y.values.map((W,I)=>{const H=h(I,y.values.length),V=m(W);return`${I===0?"M":"L"} ${H.toFixed(1)} ${V.toFixed(1)}`}).join(" "),F=y.values.length<=40?y.values.map((W,I)=>{const H=h(I,y.values.length),V=m(W);return`<circle cx="${H.toFixed(1)}" cy="${V.toFixed(1)}" r="2.6" fill="${y.color}" />`}).join(""):"";return`
      <path d="${M}" fill="none" stroke="${y.color}" stroke-width="2.5" ${y.dashed?'stroke-dasharray="6 4"':""} />
      ${F}
    `}).join(""),f=D.map(y=>{const M=h(y,a),F=t.labels[y]??`Point ${y+1}`;return`<text x="${M.toFixed(1)}" y="${n-8}" text-anchor="middle" class="analysis-svg-x-label">${F}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${s}" height="${n}" viewBox="0 0 ${s} ${n}" role="img" aria-label="${t.title??"Line chart"}">
        ${x}
        ${C}
        ${b}
        ${f}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      ${e.map(y=>`
        <span class="analysis-legend-item">
          <span class="analysis-legend-swatch" style="background:${y.color};"></span>
          <span>${y.label}</span>
        </span>
      `).join("")}
      ${t.referenceLabel?`
          <span class="analysis-legend-item">
            <span class="analysis-legend-swatch analysis-legend-swatch-dashed"></span>
            <span>${t.referenceLabel}</span>
          </span>
        `:""}
    </div>
  `}function Jt(t){if(!t.length)return'<div class="analysis-empty">No daily energy data available.</div>';const e=Math.max(760,t.length*28+84),a=250,s=52,n=16,r=18,i=34,c=de(t.map(x=>x.houseKwh),1),d=de(t.map(x=>x.exportKwh),0),g=e-s-n,u=a-r-i,p=d>0?u*.72:u,o=d>0?u-p:0,v=r+p,h=g/t.length,m=Math.max(8,Math.min(18,h*.62)),_=Math.max(1,Math.ceil(t.length/10)),k=t.map((x,C)=>{const b=s+C*h+(h-m)/2,f=x.solarToHomeKwh/c*p,y=x.gridKwh/c*p,M=d>0?x.exportKwh/d*o:0,F=v-f-y-8;return`
      <g>
        <rect x="${b.toFixed(1)}" y="${(v-f).toFixed(1)}" width="${m.toFixed(1)}" height="${f.toFixed(1)}" rx="3" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${b.toFixed(1)}" y="${(v-f-y).toFixed(1)}" width="${m.toFixed(1)}" height="${y.toFixed(1)}" rx="3" fill="rgba(248, 81, 73, 0.55)" />
        ${M>0?`<rect x="${b.toFixed(1)}" y="${v.toFixed(1)}" width="${m.toFixed(1)}" height="${M.toFixed(1)}" rx="3" fill="rgba(88, 166, 255, 0.75)" />`:""}
        ${x.exceedanceKwh>0?`<circle cx="${(b+m/2).toFixed(1)}" cy="${F.toFixed(1)}" r="3.2" fill="#d29922" />`:""}
      </g>
    `}).join(""),D=t.map((x,C)=>C%_!==0&&C!==t.length-1?"":`<text x="${(s+C*h+h/2).toFixed(1)}" y="${a-10}" text-anchor="middle" class="analysis-svg-x-label">${x.label}</text>`).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${a}" viewBox="0 0 ${e} ${a}" role="img" aria-label="Daily energy breakdown">
        <line x1="${s}" y1="${v.toFixed(1)}" x2="${(e-n).toFixed(1)}" y2="${v.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${s-8}" y="${(r+4).toFixed(1)}" class="analysis-svg-tick">${l(c,0)} kWh</text>
        ${d>0?`<text x="${s-8}" y="${(a-i+4).toFixed(1)}" class="analysis-svg-tick">-${l(d,0)} kWh</text>`:""}
        ${k}
        ${D}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.55);"></span><span>From grid</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span><span>Exported</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:#d29922;"></span><span>Exceedance on that day</span></span>
    </div>
  `}function Qt(t,e){const a=Ut(e,0,1);return t==="solar"?`rgba(63, 185, 80, ${.12+a*.82})`:t==="grid"?`rgba(210, 153, 34, ${.12+a*.82})`:`rgba(248, 81, 73, ${.12+a*.82})`}function ea(t,e){const a=t.flat(),s=de(a,1),n=ut(a,0);return`
    <div class="analysis-heatmap">
      <div class="analysis-heatmap-hours">
        <span class="analysis-heatmap-corner"></span>
        ${Array.from({length:24},(r,i)=>`
          <span class="analysis-heatmap-hour ${i%2===1?"analysis-heatmap-hour-faded":""}">${String(i).padStart(2,"0")}</span>
        `).join("")}
      </div>
      ${t.map((r,i)=>`
        <div class="analysis-heatmap-row">
          <span class="analysis-heatmap-day">${qe[i]}</span>
          ${r.map((c,d)=>{const g=s===n?0:(c-n)/(s-n);return`
              <span
                class="analysis-heatmap-cell"
                style="background:${Qt(e,g)};"
                title="${qe[i]} ${String(d).padStart(2,"0")}:00 - ${l(c,2)} kW average"
              >${c>.05?l(c,1):""}</span>
            `}).join("")}
        </div>
      `).join("")}
    </div>
  `}function Ze(t){const e=de(t.map(a=>a.value),1);return t.length?`
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
  `:'<div class="analysis-empty">No standout patterns in this period.</div>'}function ta(t){var s,n,r,i;const e=ze(((s=t.rangeData)==null?void 0:s.start)??t.customStart),a=ze(((n=t.rangeData)==null?void 0:n.end)??t.customEnd);return`
    <div class="range-selector">
      ${we.map(c=>`
        <button
          class="range-btn ${c.id===t.range?"active":""}"
          data-range="${c.id}"
        >${c.label}</button>
      `).join("")}
    </div>
    ${(r=t.rangeData)!=null&&r.start&&((i=t.rangeData)!=null&&i.end)?`
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
  `}function aa(t,e){return`
    <div class="analysis-stat-grid">
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Solar Coverage</span>
        <strong class="analysis-stat-value">${l(t.totals.coveragePct,1)}%</strong>
        <span class="analysis-stat-meta">${l(t.totals.solarToHomeKwh)} kWh of ${l(t.totals.houseKwh)} kWh usage</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Consumed Solar</span>
        <strong class="analysis-stat-value">${l(t.totals.selfConsumedPct,1)}%</strong>
        <span class="analysis-stat-meta">${l(t.totals.solarToHomeKwh)} kWh kept at home, ${l(t.totals.exportKwh)} kWh exported</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Total Solar Value</span>
        <strong class="analysis-stat-value">${O(t.totals.solarValue,e)}</strong>
        <span class="analysis-stat-meta">Savings plus export revenue plus avoided exceedance charges</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Peak Net Grid</span>
        <strong class="analysis-stat-value">${l(t.totals.peakGridKw,2)} kW</strong>
        <span class="analysis-stat-meta">Compared with ${l(t.totals.peakHouseKw,2)} kW gross house load</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Exceedance Intervals</span>
        <strong class="analysis-stat-value">${l(t.totals.exceedanceIntervals,0)}</strong>
        <span class="analysis-stat-meta">${l(t.totals.exceedanceKwh,2)} kWh above the reference limit</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Variable Import Cost</span>
        <strong class="analysis-stat-value">${O(t.totals.importCost,e)}</strong>
        <span class="analysis-stat-meta">Energy-only import charges from the selected period</span>
      </div>
    </div>
  `}function sa(t){return`
    <div class="card analysis-card analysis-card-full">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Daily Breakdown</h3>
          <p class="analysis-card-copy">House usage is split into solar-covered energy, grid energy, and exported surplus. A gold marker flags days with any reference-power exceedance.</p>
        </div>
      </div>
      ${Jt(t.daily)}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily exceedance volume</h4>
        ${oe({title:"Daily exceedance volume",series:[{label:"Exceedance",color:"#d29922",values:t.daily.map(e=>e.exceedanceKwh)}],labels:t.daily.map(e=>e.label),valueFormatter:e=>`${l(e,2)} kWh`})}
      </div>
    </div>
  `}function ra(t,e){return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Consumption Pattern Heatmap</h3>
          <p class="analysis-card-copy">Average hourly power by weekday. Use the switch to inspect total house usage, remaining grid draw, or solar production.</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${t.analysisHeatmapMetric==="house"?"active":""}" data-analysis-heatmap="house">${Fe.house}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="grid"?"active":""}" data-analysis-heatmap="grid">${Fe.grid}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="solar"?"active":""}" data-analysis-heatmap="solar">${Fe.solar}</button>
        </div>
      </div>
      ${ea(e.heatmapValues[t.analysisHeatmapMetric],t.analysisHeatmapMetric)}
      <p class="analysis-note">Each cell shows the average kW seen in that weekday/hour slot over the selected period.</p>
    </div>
  `}function na(t,e){const a=t.totals.solarKwh>0?t.totals.solarToHomeKwh/t.totals.solarKwh*100:0,s=t.totals.solarKwh>0?t.totals.exportKwh/t.totals.solarKwh*100:0;return`
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
          <strong>${l(t.totals.coveragePct,1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-consumed solar</span>
          <strong>${l(t.totals.selfConsumedPct,1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Solar value</span>
          <strong>${O(t.totals.solarValue,e)}</strong>
        </div>
      </div>
      <div class="analysis-share-bar">
        <span class="analysis-share-segment analysis-share-segment-home" style="width:${a}%;"></span>
        <span class="analysis-share-segment analysis-share-segment-export" style="width:${s}%;"></span>
      </div>
      <div class="analysis-share-legend">
        <span><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span>Self-consumed: ${l(t.totals.solarToHomeKwh)} kWh</span>
        <span><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span>Exported: ${l(t.totals.exportKwh)} kWh</span>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Coverage of house usage by day</h4>
        ${oe({title:"Daily solar coverage",series:[{label:"Coverage",color:"#3fb950",values:t.daily.map(n=>n.coveragePct)}],labels:t.daily.map(n=>n.label),maxValue:100,minValue:0,valueFormatter:n=>`${l(n,0)}%`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day</h4>
        ${oe({title:"Daily solar value",series:[{label:"Solar value",color:"#58a6ff",values:t.daily.map(n=>n.solarValue)}],labels:t.daily.map(n=>n.label),valueFormatter:n=>O(n,e)})}
      </div>
    </div>
  `}function oa(t,e){const a=t.hourlyExceedanceKwh.map((s,n)=>({label:`${String(n).padStart(2,"0")}:00`,value:s,meta:`${l(s,2)} kWh`,colorClass:"analysis-progress-fill-warn"})).filter(s=>s.value>0).sort((s,n)=>n.value-s.value).slice(0,6);return`
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
          <strong>${l(t.totals.exceedanceIntervals,0)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Total exceedance</span>
          <strong>${l(t.totals.exceedanceKwh,2)} kWh</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Peak over reference</span>
          <strong>${l(de(t.topExceedances.map(s=>s.overKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Exceedance cost</span>
          <strong>${O(t.totals.exceedanceCost,e)}</strong>
        </div>
      </div>
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Worst hours</h4>
          ${Ze(a)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Worst days</h4>
          ${Ze(t.worstDays.map(s=>({label:s.fullDate,value:s.exceedanceKwh,meta:`${l(s.exceedanceKwh,2)} kWh`,colorClass:"analysis-progress-fill-warn"})))}
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
                      <td>${dt(s.iso)}</td>
                      <td>${l(s.gridKw,2)} kW</td>
                      <td>${l(s.referenceKw,2)} kW</td>
                      <td>${l(s.overKw,2)} kW</td>
                      <td>${l(s.solarKw,2)} kW</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `:'<div class="analysis-empty">No reference exceedance was recorded in this period.</div>'}
      </div>
    </div>
  `}function ia(t,e,a){var i,c;if(e.analysisComparisonLoading)return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${Xe(e)}</p>
          </div>
        </div>
        <div class="analysis-empty">Loading comparison period...</div>
      </div>
    `;if(!((i=e.analysisComparison)!=null&&i.consumptionTimeseries)||!((c=e.analysisComparison)!=null&&c.productionTimeseries))return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">A matched previous period is shown here when enough historic data is available.</p>
          </div>
        </div>
        <div class="analysis-empty">Comparison data is unavailable for the selected range.</div>
      </div>
    `;const s=ht(e.analysisComparison.consumptionTimeseries,e.analysisComparison.productionTimeseries,a),n=Math.max(t.daily.length,s.daily.length,1),r=Array.from({length:n},(d,g)=>`D${g+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Period Comparison</h3>
          <p class="analysis-card-copy">${Xe(e)}</p>
        </div>
      </div>
      <div class="analysis-compare-grid">
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">House usage</span>
          <strong>${l(t.totals.houseKwh)} kWh</strong>
          <span class="analysis-compare-delta">${$e(t.totals.houseKwh-s.totals.houseKwh)} kWh vs previous</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Net grid usage</span>
          <strong>${l(t.totals.gridKwh)} kWh</strong>
          <span class="analysis-compare-delta">${$e(t.totals.gridKwh-s.totals.gridKwh)} kWh vs previous</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar coverage</span>
          <strong>${l(t.totals.coveragePct,1)}%</strong>
          <span class="analysis-compare-delta">${$e(t.totals.coveragePct-s.totals.coveragePct)} pts vs previous</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar value</span>
          <strong>${O(t.totals.solarValue,a.currency||"EUR")}</strong>
          <span class="analysis-compare-delta">${$e(t.totals.solarValue-s.totals.solarValue,2)} ${a.currency||"EUR"} vs previous</span>
        </div>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Usage by day index</h4>
        ${oe({title:"Current versus previous usage",series:[{label:"Current",color:"#f85149",values:t.daily.map(d=>d.houseKwh)},{label:"Previous",color:"#58a6ff",values:s.daily.map(d=>d.houseKwh),dashed:!0}],labels:r,valueFormatter:d=>`${l(d,1)} kWh`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day index</h4>
        ${oe({title:"Current versus previous solar value",series:[{label:"Current",color:"#3fb950",values:t.daily.map(d=>d.solarValue)},{label:"Previous",color:"#d29922",values:s.daily.map(d=>d.solarValue),dashed:!0}],labels:r,valueFormatter:d=>O(d,a.currency||"EUR")})}
      </div>
    </div>
  `}function la(t,e){return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Tariff-Aware Cost Trends</h3>
          <p class="analysis-card-copy">Estimated variable import cost, solar savings, export earnings, and exceedance cost by day. Fixed monthly fees are intentionally left out so this stays behavior-driven.</p>
        </div>
      </div>
      ${oe({title:"Daily cost and value trends",series:[{label:"Import cost",color:"#f85149",values:t.daily.map(a=>a.importCost)},{label:"Solar savings",color:"#3fb950",values:t.daily.map(a=>a.solarSavings)},{label:"Export earnings",color:"#58a6ff",values:t.daily.map(a=>a.exportRevenue)},{label:"Exceedance cost",color:"#d29922",values:t.daily.map(a=>a.exceedanceCost)}],labels:t.daily.map(a=>a.label),valueFormatter:a=>O(a,e)})}
      <div class="analysis-cost-totals">
        <span>Import cost: <strong>${O(t.totals.importCost,e)}</strong></span>
        <span>Solar savings: <strong>${O(t.totals.solarSavings,e)}</strong></span>
        <span>Export earnings: <strong>${O(t.totals.exportRevenue,e)}</strong></span>
        <span>Exceedance cost: <strong>${O(t.totals.exceedanceCost,e)}</strong></span>
      </div>
    </div>
  `}function ca(t,e){const a=Array.from({length:Math.max(t.loadDurationGrossKw.length,t.loadDurationNetKw.length,1)},(s,n)=>`${n+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Load Duration Curve</h3>
          <p class="analysis-card-copy">Gross house load and net grid load sorted from highest to lowest interval. This shows how often high demand really occurs and how much solar trims the top end.</p>
        </div>
      </div>
      ${oe({title:"Load duration curve",series:[{label:"Gross house load",color:"#f85149",values:t.loadDurationGrossKw},{label:"Net grid load",color:"#58a6ff",values:t.loadDurationNetKw}],labels:a,referenceValue:e>0?e:void 0,referenceLabel:e>0?`Reference ${l(e,1)} kW`:void 0,valueFormatter:s=>`${l(s,1)} kW`})}
      <p class="analysis-note">Intervals are ordered from highest demand to lowest, so the left side is your hardest-to-handle load.</p>
    </div>
  `}function da(t){const e=t.config,a=t.rangeData,s=t.consumptionTimeseries,n=t.productionTimeseries;if(!e||!a||!s||!n)return`
      <section class="analysis-view">
        <div class="card">
          <p class="muted">Loading analysis data...</p>
        </div>
      </section>
    `;const r=ht(s,n,e),i=e.currency||"EUR";return`
    <section class="analysis-view">
      <div class="section-header analysis-section-header">
        <div>
          <span class="badge">Analysis</span>
          <h2>Charts and Optimization</h2>
          <p class="muted">Deeper electricity analysis for ${Xt(t)}. This page is built from the same 15-minute data and billing settings that drive the dashboard and invoice.</p>
        </div>
        <div class="analysis-header-meta">
          <span>${Zt(t)}</span>
          <span>${l(r.daily.length,0)} day${r.daily.length===1?"":"s"} analysed</span>
        </div>
      </div>

      ${ta(t)}
      ${aa(r,i)}
      ${sa(r)}

      <div class="analysis-grid">
        ${ra(t,r)}
        ${na(r,i)}
      </div>

      <div class="analysis-grid">
        ${oa(r,i)}
        ${ia(r,t,e)}
      </div>

      <div class="analysis-grid">
        ${la(r,i)}
        ${ca(r,e.reference_power_kw??0)}
      </div>
    </section>
  `}const Je={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function ua(t){return Je[t]?Je[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function pa(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],a=[],s=[],n=[],r=[];for(const c of t.sensors){const d=c.key;d.startsWith("c_")||d==="1-1:1.29.0"||d==="1-1:3.29.0"?e.push(c):d.startsWith("p_")||d==="1-1:2.29.0"||d==="1-1:4.29.0"?a.push(c):d.startsWith("s_")||d.startsWith("1-65:")?s.push(c):d.startsWith("g_")||d.startsWith("7-")?n.push(c):r.push(c)}const i=(c,d,g,u)=>g.length?`
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
                  <td class="sensor-name">${ua(p.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${u});">${l(p.value)}</td>
                  <td class="sensor-unit">${p.unit}</td>
                  <td class="sensor-peak">${p.peak_timestamp?dt(p.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
      ${i("Electricity Consumption","⚡",e,"consumption")}
      ${i("Energy Production","☀️",a,"production")}
      ${i("Energy Sharing","🔗",s,"self")}
      ${i("Gas","🔥",n,"gas")}
      ${i("Other","📊",r,"text")}
    </section>
  `}const Qe=[{kw:3,fixedMonthlyFee:7.42},{kw:7,fixedMonthlyFee:12.84},{kw:12,fixedMonthlyFee:19.61},{kw:17,fixedMonthlyFee:26.39},{kw:27,fixedMonthlyFee:39.94},{kw:43,fixedMonthlyFee:61.62},{kw:70,fixedMonthlyFee:98.2},{kw:100,fixedMonthlyFee:138.85},{kw:150,fixedMonthlyFee:206.6,existingContractsOnly:!0},{kw:200,fixedMonthlyFee:274.35,existingContractsOnly:!0}];function _e(t){if(!t)return null;const e=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(e){const[,s,n,r]=e;return new Date(Number(s),Number(n)-1,Number(r))}const a=new Date(t);return Number.isNaN(a.getTime())?null:new Date(a.getFullYear(),a.getMonth(),a.getDate())}function et(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function ha(t,e,a,s,n){const r=new Date,i=_e(s),c=_e(n);let d=i,g=c;if(!d||!g)switch(t){case"yesterday":{const h=new Date(r);h.setDate(h.getDate()-1),d=new Date(h.getFullYear(),h.getMonth(),h.getDate()),g=new Date(d);break}case"this_week":{const h=new Date(r),m=h.getDay()||7;d=new Date(h.getFullYear(),h.getMonth(),h.getDate()-m+1),g=new Date(r.getFullYear(),r.getMonth(),r.getDate());break}case"last_week":{const h=new Date(r),m=h.getDay()||7,_=new Date(h.getFullYear(),h.getMonth(),h.getDate()-m+1);d=new Date(_.getFullYear(),_.getMonth(),_.getDate()-7),g=new Date(_.getFullYear(),_.getMonth(),_.getDate()-1);break}case"this_month":{d=new Date(r.getFullYear(),r.getMonth(),1),g=new Date(r.getFullYear(),r.getMonth(),r.getDate());break}case"last_month":{d=new Date(r.getFullYear(),r.getMonth()-1,1),g=new Date(r.getFullYear(),r.getMonth(),0);break}case"this_year":{d=new Date(r.getFullYear(),0,1),g=new Date(r.getFullYear(),r.getMonth(),r.getDate());break}case"last_year":{d=new Date(r.getFullYear()-1,0,1),g=new Date(r.getFullYear()-1,11,31);break}case"custom":{d=_e(e)??new Date(r.getFullYear(),r.getMonth(),r.getDate()),g=_e(a)??new Date(d);break}default:{d=new Date(r.getFullYear(),r.getMonth(),r.getDate()-1),g=new Date(d);break}}if(g<d){const h=d;d=g,g=h}let u=0,p=0;const o=new Date(d);for(;o<=g;){const h=new Date(o.getFullYear(),o.getMonth()+1,0).getDate();p+=1/h,u+=1,o.setDate(o.getDate()+1)}const v=d.getFullYear()===g.getFullYear()&&d.getMonth()===g.getMonth()&&d.getDate()===1&&g.getDate()===new Date(g.getFullYear(),g.getMonth()+1,0).getDate();return{days:u,factor:p,label:v?"full month":`${u} day${u===1?"":"s"}`}}function ma(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function tt(t){const[e,a]=t.split(":").map(s=>parseInt(s,10)||0);return e*60+a}function mt(t,e,a,s){if(!ma(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),r=tt(a),i=tt(s);return r===i?!0:r<i?n>=r&&n<i:n>=r||n<i}function ga(t,e){return e.find(a=>mt(t,a.day_group,a.start_time,a.end_time))}function va(t,e){return e.find(a=>mt(t,a.day_group,a.start_time,a.end_time))}function at(t,e,a,s,n,r=[]){var v;const i=new Map;let c=0,d=0,g=0,u=0,p=0;const o=new Map;for(const h of r){const m=Number(h.value)||0;o.set(h.startedAt,(o.get(h.startedAt)??0)+m)}for(const h of t){const m=Number(h.value)||0,_=m*.25,k=o.get(h.startedAt)??0,D=Math.max(0,m-k),x=new Date(h.startedAt);if(Number.isNaN(x.getTime()))continue;const C=ga(x,s),b=va(x,n),f=(C==null?void 0:C.rate)??e,y=((v=C==null?void 0:C.label)==null?void 0:v.trim())||"Base tariff",M=(b==null?void 0:b.reference_power_kw)??a;c+=_*f,p=Math.max(p,m),u=Math.max(u,D),m>M&&(g+=(m-M)*.25),D>M&&(d+=(D-M)*.25);const F=`${y}__${f}`,W=i.get(F);W?W.kwh+=_:i.set(F,{label:y,rate:f,kwh:_})}return{energyCost:c,exceedanceKwh:d,grossExceedanceKwh:g,avoidedExceedanceKwh:Math.max(0,g-d),peakPowerKw:u,grossPeakPowerKw:p,rateBreakdown:Array.from(i.values()).sort((h,m)=>h.label.localeCompare(m.label))}}function fa(t){var Ne;const e=t.config,a=t.rangeData;if(!e||!a)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const s=a.consumption||0,n=a.production||0,r=a.exported||0,i=Math.max(0,r),c=Math.max(0,a.solar_to_home??a.direct_solar_to_home??(a.self_consumed&&a.self_consumed>0?a.self_consumed:n-i)),d=Math.max(0,a.grid_import??s-c),g=a.peak_power_kw||0,u=e.reference_power_kw||5,p=a.exceedance_kwh||0,o=a.gas_energy||0,v=a.gas_volume||0,h=o>0||v>0,m=e.consumption_rate_windows??[],_=e.reference_power_windows??[],k=t.consumptionTimeseries?at(t.consumptionTimeseries.items,e.energy_variable_rate,u,m,_,((Ne=t.productionTimeseries)==null?void 0:Ne.items)??[]):null,D=m.length>0&&!!k&&Math.abs(d-s)<.01,x=_.length>0&&!!k,C=k?k.peakPowerKw:g,b=k?k.exceedanceKwh:p,f=et(a.start??t.customStart),y=et(a.end??t.customEnd),{days:M,factor:F,label:W}=ha(t.range,t.customStart,t.customEnd,a.start,a.end),I=e.energy_fixed_fee*F,H=e.network_metering_rate*F,V=e.network_power_ref_rate*F,J=D?k.energyCost:d*e.energy_variable_rate,ue=d*e.network_variable_rate,Y=b*e.exceedance_rate,ie=e.meter_monthly_fees??[],j=ie.reduce((w,P)=>w+(P.fee||0),0)*F,pe=d*e.compensation_fund_rate,he=d*e.electricity_tax_rate,le=Math.max(0,e.connect_discount??0)*F,re=I+J+H+V+ue+Y+j+pe+he-le,me=re*e.vat_rate,A=re+me,xe=(e.meters??[]).filter(w=>w.types.includes("production")),Ce=e.feed_in_rates??[],Q=xe.map(w=>{const P=Ce.find(X=>X.meter_id===w.id);if(P){const X=P.mode==="sensor"&&P.sensor_value!=null&&isFinite(P.sensor_value),ne=X?P.sensor_value:isFinite(P.tariff)?P.tariff:e.feed_in_tariff,Oe=X?`Sensor (${l(ne,4)} ${e.currency??"EUR"}/kWh)`:"Fixed tariff";return{meterId:w.id,shortId:w.id?"…"+w.id.slice(-8):"Meter",rate:ne,label:Oe,mode:P.mode}}return{meterId:w.id,shortId:w.id?"…"+w.id.slice(-8):"Meter",rate:e.feed_in_tariff,label:"Fixed tariff",mode:"fixed"}}),ge=Q.filter(w=>isFinite(w.rate)&&w.rate>0),ve=ge.length>0?ge.reduce((w,P)=>w+P.rate,0)/ge.length:e.feed_in_tariff,q=i*ve,z=Q.length>1,$=c,E=$*(e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate),T=E*e.vat_rate,L=E+T,K=Math.max(0,(k==null?void 0:k.avoidedExceedanceKwh)??0),ee=K*e.exceedance_rate,B=ee*e.vat_rate,N=ee+B,te=K>1e-4,fe=L+N+q,Se=A-q,Ke=(e.gas_fixed_fee??6.5)*F,Ve=o*(e.gas_variable_rate??.055),Ie=(e.gas_network_fee??4.8)*F,Ae=o*(e.gas_network_variable_rate??.012),He=o*(e.gas_tax_rate??.001),De=Ke+Ve+Ie+Ae+He,Ge=De*(e.gas_vat_rate??.08),Me=De+Ge,R=e.currency||"EUR",S=w=>`${l(w,2)} ${R}`,Ee=Qe.find(w=>Math.abs(w.kw-u)<.05),wt=re-V-Y,Te=k?Qe.map(w=>{var Ye;const P=at(t.consumptionTimeseries.items,e.energy_variable_rate,w.kw,m,_,((Ye=t.productionTimeseries)==null?void 0:Ye.items)??[]),X=w.fixedMonthlyFee*F,ne=P.exceedanceKwh*e.exceedance_rate,Ue=(wt+X+ne)*(1+e.vat_rate);return{...w,fixedCharge:X,exceedanceKwh:P.exceedanceKwh,exceedanceCharge:ne,total:Ue,deltaVsCurrent:Ue-A}}):[],be=Te.reduce((w,P)=>!w||P.total<w.total?P:w,null),bt=w=>Math.abs(w)<.005?"Current total":`${w>0?"+":"-"}${S(Math.abs(w))}`,We=a.start&&a.end?`${se(a.start)} — ${se(a.end)}`:t.range.replace("_"," ").replace(/\b\w/g,w=>w.toUpperCase()),$t=b>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${l(C,1)} kW</strong> &mdash; ${x?"Reference power windows active":`Reference power level: ${l(u,1)} kW`}</p>
        <p>Exceedance volume: <strong>${l(b,2)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${S(Y)}</p>
      </div>`:"",_t=D?k.rateBreakdown.map(w=>`
            <tr>
              <td>${w.label} (${l(w.kwh)} kWh)</td>
              <td style="text-align: right;">${l(w.rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(w.kwh*w.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Supplier rate (${l(d)} kWh bought from grid)</td>
              <td style="text-align: right;">${l(e.energy_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(J)}</td>
            </tr>
          `,kt=x?`Reference power windows active (${_.length})`:`${l(u,1)} kW`,xt=D?`Time-of-use windows active (${m.length})`:`${l(e.energy_variable_rate,4)} ${R}/kWh`,Ct=Te.map(w=>{const P=!!be&&w.kw===be.kw,X=!!Ee&&w.kw===Ee.kw,ne=w.deltaVsCurrent<-.005?"comparison-delta-savings":w.deltaVsCurrent>.005?"comparison-delta-extra":"";return`
            <tr class="${P?"reference-power-best-row":""}${X?" reference-power-current-row":""}">
              <td>
                <div class="reference-level-cell">
                  <span class="reference-level-kw">${l(w.kw,0)} kW</span>
                  ${P?'<span class="reference-level-badge best">Financially optimal</span>':""}
                  ${X?'<span class="reference-level-badge current">Current</span>':""}
                  ${w.existingContractsOnly?'<span class="reference-level-badge legacy">Existing contracts</span>':""}
                </div>
              </td>
              <td style="text-align: right;">${S(w.fixedCharge)}</td>
              <td style="text-align: right;">${S(w.exceedanceCharge)}</td>
              <td style="text-align: right;"><strong>${S(w.total)}</strong></td>
              <td class="${ne}" style="text-align: right;">${bt(w.deltaVsCurrent)}</td>
            </tr>
          `}).join(""),St=Te.length>0?`
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${x?"Configured reference power windows stay active in this comparison.":"One reference power level is applied to the full selected period."}
              ${Ee?"":`Your current configuration uses ${l(u,1)} kW, which is outside the standard Creos low-voltage reference power levels.`}
            </p>
          </div>
          ${be?`<div class="reference-power-optimum">
                <span class="reference-level-badge best">Financially optimal: ${l(be.kw,0)} kW</span>
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
            ${Ct}
          </tbody>
        </table>
      </div>
    `:`
      <div class="card reference-power-card">
        <p class="muted">Reference power level comparison requires 15-minute load-curve data for the selected period.</p>
      </div>
    `,Dt=`
      <div class="range-selector">
        ${we.map(w=>`
          <button
            class="range-btn ${w.id===t.range?"active":""}"
            data-range="${w.id}"
          >${w.label}</button>
        `).join("")}
      </div>
    `,Mt=a.start&&a.end?(()=>{const w=new Date(a.start),P=new Date(a.end);return Number.isNaN(w.getTime())||Number.isNaN(P.getTime())?"":`
        <div class="range-info-bar">
          Period: ${w.toLocaleDateString()} - ${P.toLocaleDateString()}
        </div>
      `})():"",Et=t.range==="custom"?`
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
    `:f&&y?`
        <div class="custom-range-picker period-preview">
          <span class="period-preview-label">Viewed period</span>
          <label>
            <span>From</span>
            <input type="date" value="${f}" readonly aria-label="Preset period start" />
          </label>
          <label>
            <span>To</span>
            <input type="date" value="${y}" readonly aria-label="Preset period end" />
          </label>
        </div>
      `:"";return`
    <section class="invoice-view">
      ${Dt}
      ${Mt}
      ${Et}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Invoice Estimate &mdash; ${We}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the currently selected period.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${l(s)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${l(d)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${l(n)} kWh produced</span>
          ${i>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${l(i)} kWh exported</span>`:""}
          ${h?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${l(o)} kWh gas (${l(v)} m³)</span>`:""}
        </div>
      </div>

      ${$t}

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
              <td style="text-align: right;">${l(e.energy_fixed_fee,2)} ${R}/mo</td>
              <td style="text-align: right;">${S(I)}</td>
            </tr>
            ${_t}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${W})</span></td>
              <td style="text-align: right;">${l(e.network_metering_rate,2)} ${R}/mo</td>
              <td style="text-align: right;">${S(H)}</td>
            </tr>
            <tr>
              <td>Reference power level (${kt}) <span class="muted">(${W})</span></td>
              <td style="text-align: right;">${l(e.network_power_ref_rate,2)} ${R}/mo</td>
              <td style="text-align: right;">${S(V)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${l(d)} kWh bought from grid)</td>
              <td style="text-align: right;">${l(e.network_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(ue)}</td>
            </tr>
            <tr class="${b>0?"exceedance-row":""}">
              <td>Exceedance charge (${l(b,2)} kWh above the reference power level)</td>
              <td style="text-align: right;">${l(e.exceedance_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(Y)}</td>
            </tr>

            ${ie.filter(w=>w.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${ie.filter(w=>w.fee>0).map(w=>`
            <tr>
              <td>${w.label||"…"+w.meter_id.slice(-8)} <span class="muted">(${W})</span></td>
              <td style="text-align: right;">${l(w.fee,2)} ${R}/mo</td>
              <td style="text-align: right;">${S(w.fee*F)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${l(e.compensation_fund_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(pe)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${l(e.electricity_tax_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(he)}</td>
            </tr>
            ${le>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            <tr>
              <td>Monthly Discount <span class="muted">(${W})</span></td>
              <td style="text-align: right;">-${l(Math.max(0,e.connect_discount??0),2)} ${R}/mo</td>
              <td style="text-align: right;">-${S(le)}</td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${S(re)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${l(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(me)}</td>
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
              <td style="text-align: right;">${l(n)} kWh</td>
            </tr>
            <tr class="revenue-row">
              <td>Autoconsumed / used at home</td>
              <td style="text-align: right;">${l($)} kWh avoided grid purchases</td>
              <td style="text-align: right;">${S(L)} saved</td>
            </tr>
            <tr class="revenue-row">
              <td>Export sold</td>
              <td style="text-align: right;">${l(i)} kWh sent to grid</td>
              <td style="text-align: right;">${S(q)} earned</td>
            </tr>
            ${te?`
            <tr class="revenue-row">
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${l(K)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${S(N)} saved</td>
            </tr>
            `:""}
            ${i>0?`
            <tr class="section-label"><td colspan="3">Credit Calculation</td></tr>
            ${Q.map(w=>`
            <tr class="revenue-row">
              <td>Exported (${z?w.shortId:l(i)+" kWh"})</td>
              <td style="text-align: right;">${w.label}<br/>${l(w.rate,4)} ${R}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${S(z?i/Q.length*w.rate:i*w.rate)}</td>
            </tr>
            `).join("")}
            ${z?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${l(i)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${l(ve,4)} ${R}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${S(q)}</td>
            </tr>
            `:""}
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total saved / earned thanks to solar</strong></td>
              <td style="text-align: right;"><strong>${S(fe)}</strong></td>
            </tr>
            <tr class="net-total-row">
              <td colspan="2"><strong>Net Balance</strong></td>
              <td style="text-align: right;"><strong>${S(Se)}</strong></td>
            </tr>
            `:""}
            ${i<=0?`
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total saved / earned thanks to solar</strong></td>
              <td style="text-align: right;"><strong>${S(fe)}</strong></td>
            </tr>
            `:""}
            `:""}
          </tbody>
        </table>
      </div>

      ${St}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${l(d)} kWh), not total home usage.
          Supplier pricing: ${xt}.
          Fixed monthly charges are prorated across the viewed period (${M} days, ${W}, equivalent to ${l(F,2)} monthly charges).
          Peak load (${l(C,1)} kW) is compared against ${x?"your configured reference power windows":`your reference power level (${l(u,1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${l(e.exceedance_rate,4)} ${R}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${h?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${We}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${l(o)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${l(v)} m³</span>
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
              <td style="text-align: right;">${l(e.gas_fixed_fee??6.5,2)} ${R}/mo</td>
              <td style="text-align: right;">${S(Ke)}</td>
            </tr>
            <tr>
              <td>Energy (${l(o)} kWh)</td>
              <td style="text-align: right;">${l(e.gas_variable_rate??.055,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(Ve)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${W})</span></td>
              <td style="text-align: right;">${l(e.gas_network_fee??4.8,2)} ${R}/mo</td>
              <td style="text-align: right;">${S(Ie)}</td>
            </tr>
            <tr>
              <td>Network Variable (${l(o)} kWh)</td>
              <td style="text-align: right;">${l(e.gas_network_variable_rate??.012,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(Ae)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${l(o)} kWh)</td>
              <td style="text-align: right;">${l(e.gas_tax_rate??.001,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(He)}</td>
            </tr>

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${S(De)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${l((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${S(Ge)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${S(Me)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Energy Total: ${S(Se+Me)}</strong>
          (Electricity: ${S(Se)} + Gas: ${S(Me)})
        </p>
      </div>
      `:""}

      ${n>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Revenue &mdash; ${We}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${S(fe)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${l(n)} kWh</div>
            <div class="solar-stat-label">Solar produced</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${S(L)}</div>
            <div class="solar-stat-label">Saved by autoconsuming ${l($)} kWh</div>
          </div>
          ${te?`
          <div class="solar-stat">
            <div class="solar-stat-value">${S(N)}</div>
            <div class="solar-stat-label">Saved by staying under the reference power</div>
          </div>
          `:""}
          <div class="solar-stat">
            <div class="solar-stat-value">${S(q)}</div>
            <div class="solar-stat-label">Earned by selling ${l(i)} kWh</div>
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
              <td style="text-align: right;">${l(n)} kWh</td>
            </tr>
            <tr>
              <td>Autoconsumed / used at home</td>
              <td style="text-align: right;">${l($)} kWh avoided grid purchases</td>
              <td style="text-align: right;">${S(L)} saved</td>
            </tr>
            <tr>
              <td>Export sold</td>
              <td style="text-align: right;">${l(i)} kWh sent to grid</td>
              <td style="text-align: right;">${S(q)} earned</td>
            </tr>
            ${te?`
            <tr>
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${l(K)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${S(N)} saved</td>
            </tr>
            `:""}

            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${l($)} kWh)</td>
              <td style="text-align: right;">${l(e.energy_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S($*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${l(e.network_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S($*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${l(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S($*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${l(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(T)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${S(L)}</strong></td>
            </tr>

            ${te?`
            <tr class="section-label"><td colspan="3">Reference Power Savings</td></tr>
            <tr>
              <td>Exceedance avoided</td>
              <td style="text-align: right;">${l(K)} kWh above the reference power level</td>
              <td style="text-align: right;">${S(ee)}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${l(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(B)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Reference Power Savings</strong></td>
              <td style="text-align: right;"><strong>${S(N)}</strong></td>
            </tr>
            `:""}

            ${i>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${Q.map(w=>`
            <tr>
              <td>Sold to grid ${z?`(${w.shortId})`:`(${l(i)} kWh)`}</td>
              <td style="text-align: right;">${w.label}<br/>${l(w.rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${S(z?i/Q.length*w.rate:i*w.rate)}</td>
            </tr>
            `).join("")}
            ${z?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${S(q)}</strong></td>
            </tr>
            `:""}
            `:""}

            <tr class="total-row solar-total-row">
              <td colspan="2"><strong>💰 Total Solar Panel Value</strong></td>
              <td style="text-align: right;"><strong>${S(fe)}</strong></td>
            </tr>
          </tbody>
        </table>

        <p class="muted" style="margin-top: var(--sp-3); font-size: var(--text-xs); line-height: var(--lh-relaxed);">
          Self-consumption savings = energy you produced and used yourself instead of buying from the grid.
          These savings are informational here and already reflected in the main invoice because only grid-imported energy is billed.
          Reference-power savings = exceedance charges avoided because solar reduced the net load seen against your reference power during the same 15-minute interval.
          Feed-in revenue = money earned by selling surplus production.
          ${Q.some(w=>w.mode==="sensor")?"Market price sourced from Home Assistant sensor.":"Using fixed feed-in tariff — configure a market price sensor in Settings for real-time rates."}
          ${z?"Revenue split equally across production meters (per-meter export data not yet available).":""}
        </p>
      </div>
      `:""}
    </section>
  `}const ya=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],wa=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Reference Power Fixed Charge",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"connect_discount",label:"Monthly Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],ba={consumption:"Power Consumption",production:"Power Production",gas:"Gas Consumption"},gt={consumption:"⚡",production:"☀️",gas:"🔥"};function $a(t){return t.map(e=>`<span class="meter-type-badge meter-type-${e}">${gt[e]??""} ${ba[e]??e}</span>`).join(" ")}function st(t,e,a){const s=t+1;return a?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${s}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${$a(e.types)}</div>
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
  `}function vt(t){return ya.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function _a(t,e){return`
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
            ${vt(e.day_group??"all")}
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
  `}function ka(t,e){return`
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
            ${vt(e.day_group??"all")}
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
  `}function xa(t,e="ha",a){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const s=e==="standalone"?(a==null?void 0:a.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let n="";if(e==="standalone"){const b=s.map((y,M)=>st(M,y,!1)).join("");a==null||a.proxy_url,n=`
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
            ${b.length>0?b.map((y,M)=>st(M,y,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const r=b=>b.map(f=>{const y=t?t[f.key]??"":"";return`
        <div class="form-row">
          <label for="cfg-${f.key}">${f.label}</label>
          <div class="input-group">
            <input
              id="cfg-${f.key}"
              name="${f.key}"
              type="${f.type}"
              ${f.type==="number"?`step="${f.step}"`:""}
              value="${y}"
            />
            ${f.unit?`<span class="input-unit">${f.unit}</span>`:""}
          </div>
        </div>
      `}).join(""),i=((t==null?void 0:t.meters)??[]).filter(b=>b.types.includes("production")),c=(t==null?void 0:t.feed_in_rates)??[],d=e==="ha";function g(b){return c.find(f=>f.meter_id===b)??{meter_id:b,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:""}}const u=i.length===0?'<p class="muted">No production meters configured — add a meter with Power Production type above.</p>':i.map((b,f)=>{const y=g(b.id),M=b.id?"…"+b.id.slice(-8):`Meter ${f+1}`;return`
          <div class="feed-in-meter-card" data-meter-idx="${f}" data-meter-id="${b.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${M}</span>
              <input type="hidden" name="feed_in_rate_${f}_meter_id" value="${b.id}" />
            </div>
            <div class="form-row">
              <label>Pricing Mode</label>
              <div class="feed-in-mode-toggle">
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${f}_mode" value="fixed" ${y.mode==="fixed"?"checked":""} />
                  <span class="mode-label">💶 Fixed Tariff</span>
                </label>
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${f}_mode" value="sensor" ${y.mode==="sensor"?"checked":""} />
                  <span class="mode-label">📡 HA Sensor</span>
                </label>
              </div>
            </div>
            <div class="feed-in-fixed-fields" data-rate-idx="${f}" style="${y.mode==="fixed"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${f}_tariff">Feed-in Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${f}_tariff" name="feed_in_rate_${f}_tariff" type="number" step="0.0001" value="${y.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
              </div>
            </div>
            <div class="feed-in-sensor-fields" data-rate-idx="${f}" style="${y.mode==="sensor"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${f}_sensor">Market Price Sensor</label>
                <div class="input-group sensor-picker-group">
                  <input
                    id="cfg-feed_in_rate_${f}_sensor"
                    name="feed_in_rate_${f}_sensor_entity"
                    type="text"
                    value="${y.sensor_entity}"
                    placeholder="${d?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${d&&f===0?'<datalist id="ha-entity-list"></datalist>':""}
              </div>
              <div class="form-row">
                <label for="cfg-feed_in_rate_${f}_fallback">Fallback Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${f}_fallback" name="feed_in_rate_${f}_fallback_tariff" type="number" step="0.0001" value="${y.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
                <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                  Used when the sensor is unavailable.
                </p>
              </div>
            </div>
          </div>
        `}).join(""),p=((t==null?void 0:t.meters)??[]).some(b=>b.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),o=(t==null?void 0:t.consumption_rate_windows)??[],v=(t==null?void 0:t.reference_power_windows)??[],h=(t==null?void 0:t.meters)??[],m=(t==null?void 0:t.meter_monthly_fees)??[];function _(b){return m.find(f=>f.meter_id===b)??{meter_id:b,label:"",fee:0}}const k=h.length===0?'<p class="muted">No meters configured.</p>':h.map((b,f)=>{const y=_(b.id),M=b.id?"…"+b.id.slice(-8):`Meter ${f+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${b.types.map(W=>gt[W]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${M}</code>
              <input type="hidden" name="meter_fee_${f}_meter_id" value="${b.id}" />
            </div>
            <div class="form-row" style="margin-bottom: var(--sp-2);">
              <label for="cfg-meter_fee_${f}_label">Label</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${f}_label" name="meter_fee_${f}_label" type="text" value="${y.label||`Meter ${f+1} metering fee`}" placeholder="e.g. Smart meter rental" />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-meter_fee_${f}_fee">Monthly Fee</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${f}_fee" name="meter_fee_${f}_fee" type="number" step="0.01" value="${y.fee}" />
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
      ${o.length>0?o.map((b,f)=>_a(f,b)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,x=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${v.length>0?v.map((b,f)=>ka(f,b)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,C=wa.map(b=>{if(b.title==="Gas Billing"&&!p||b.title==="Meter Fees"&&h.length<2)return"";let f;return b.title==="Feed-in / Selling"?f=u:b.title==="Time-of-Use Tariffs"?f=D:b.title==="Reference Power Windows"?f=x:b.title==="Discounts"?f=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as a monthly credit. The dashboard prorates it to the selected period and subtracts it before VAT.
      </p>`+r(b.fields):b.title==="Meter Fees"?f=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+k:f=r(b.fields),`
    <div class="form-section">
      <div class="form-section-title">${b.icon}  ${b.title}</div>
      ${f}
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
  `}function Re(t,e,a=!1,s="dark",n=""){const r=[{id:"charts",label:"Charts",icon:"CH"},{id:"dashboard",label:"Dashboard",icon:"🏠"},{id:"sensors",label:"Sensors",icon:"📊"},{id:"invoice",label:"Invoice",icon:"💰"},{id:"settings",label:"Settings",icon:"⚙️"}];return`
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
        ${r.map(i=>`
          <button
            class="nav-btn ${i.id===t?"active":""}"
            data-tab="${i.id}"
            role="tab"
            aria-selected="${i.id===t}"
            aria-controls="panel-${i.id}"
          >
            <span class="nav-icon" aria-hidden="true">${i.icon}</span>
            <span class="nav-label">${i.label}</span>
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
  `}const ft="leneda_credentials",yt="leneda_theme";function Ca(){try{const t=localStorage.getItem(ft);if(t)return JSON.parse(t)}catch{}return null}function Pe(t){try{localStorage.setItem(ft,JSON.stringify(t))}catch{}}function Sa(){var t;try{const e=localStorage.getItem(yt);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function Da(t){try{localStorage.setItem(yt,t)}catch{}}function rt(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const[,a,s,n]=e;return new Date(Number(a),Number(s)-1,Number(n))}function nt(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Ma(t,e=new Date){switch(t){case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const s=new Date(a);return s.setHours(23,59,59,999),{start:a,end:s}}case"this_week":{const a=new Date(e),s=a.getDay()||7;return a.setDate(a.getDate()-s+1),a.setHours(0,0,0,0),{start:a,end:e}}case"last_week":{const a=new Date(e),s=a.getDay()||7,n=new Date(a);n.setDate(a.getDate()-s),n.setHours(23,59,59,999);const r=new Date(n);return r.setDate(n.getDate()-6),r.setHours(0,0,0,0),{start:r,end:n}}case"this_month":return{start:new Date(e.getFullYear(),e.getMonth(),1),end:e};case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),s=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:a,end:s}}case"this_year":return{start:new Date(e.getFullYear(),0,1),end:e};case"last_year":{const a=new Date(e.getFullYear()-1,0,1),s=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:a,end:s}}}}function Ea(t,e,a=new Date){const s=rt(t),n=rt(e);if(!s||!n)return null;const r=["yesterday","this_week","last_week","this_month","last_month","this_year","last_year"];for(const i of r){const c=Ma(i,a);if(nt(s,c.start)&&nt(n,c.end))return i}return null}class Ta{constructor(e){ce(this,"root");ce(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartViewportStart:null,chartViewportEnd:null,chartUnit:"kwh",chartConsumptionView:"grid",analysisHeatmapMetric:"grid",analysisComparison:null,analysisComparisonLoading:!1,rangeData:null,consumptionTimeseries:null,productionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:Sa()});ce(this,"preZoomRange",null);ce(this,"preZoomCustomStart","");ce(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await it();if(this.state.mode=e.mode,e.mode==="standalone"){const a=Ca();if(a&&(this.state.credentials=a),!e.configured&&!a){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&a)try{const{saveCredentials:s}=await Z(async()=>{const{saveCredentials:n}=await Promise.resolve().then(()=>ae);return{saveCredentials:n}},void 0);await s(a)}catch{}if(!a)try{this.state.credentials=await lt()}catch{}}await this.loadData()}toDisplayError(e,a="Failed to load data"){const s=e instanceof Error?e.message:String(e??"").trim(),n=s.toLowerCase();return n.includes("missing data")||n.includes("no_data")||n.includes("no data")?"Missing data":s||a}clearRangeStateWithError(e,a="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.clearChartViewport(),this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1,this.state.error=this.toDisplayError(e,a)}resetAnalysisComparison(){this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1}clearChartViewport(){this.state.chartViewportStart=null,this.state.chartViewportEnd=null}getCurrentRangeKey(){const{start:e,end:a}=this.getDateRangeISO();return`${e}|${a}`}getComparisonRangeISO(e,a){const s=new Date(e).getTime(),n=new Date(a).getTime(),r=Math.max(0,n-s),i=s-1,c=i-r;return{start:new Date(c).toISOString(),end:new Date(i).toISOString()}}async loadAnalysisComparison(e=!1){var i;if(!this.state.consumptionTimeseries||!this.state.productionTimeseries)return;const{start:a,end:s}=this.getDateRangeISO(),n=`${a}|${s}`;if(!e&&(this.state.analysisComparisonLoading||((i=this.state.analysisComparison)==null?void 0:i.key)===n))return;const r=this.getComparisonRangeISO(a,s);this.state.analysisComparisonLoading=!0,this.state.tab==="charts"&&this.renderPreserveMainScroll();try{const[c,d]=await Promise.all([U("1-1:1.29.0",r.start,r.end),U("1-1:2.29.0",r.start,r.end)]);if(n!==this.getCurrentRangeKey())return;this.state.analysisComparison={key:n,start:r.start,end:r.end,consumptionTimeseries:c,productionTimeseries:d}}catch(c){console.warn("Comparison data fetch failed:",c),n===this.getCurrentRangeKey()&&(this.state.analysisComparison=null)}finally{n===this.getCurrentRangeKey()&&(this.state.analysisComparisonLoading=!1,this.state.tab==="charts"&&this.renderPreserveMainScroll())}}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.clearChartViewport(),this.resetAnalysisComparison(),this.render();try{const[e,a,s]=await Promise.all([ke(this.state.range),Le(),ye()]),{start:n,end:r}=this.getDateRangeISO(),[i,c]=await Promise.all([U("1-1:1.29.0",n,r),U("1-1:2.29.0",n,r)]);this.state.rangeData=e,this.state.consumptionTimeseries=i,this.state.productionTimeseries=c,this.state.sensors=a,this.state.config=s}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async changeRange(e){if(this.preZoomRange=null,this.clearChartViewport(),this.state.range=e,this.resetAnalysisComparison(),e==="custom"){if(!this.state.customStart||!this.state.customEnd){const a=new Date;a.setDate(a.getDate()-1);const s=new Date(a);s.setDate(s.getDate()-6),this.state.customStart=s.toISOString().slice(0,10),this.state.customEnd=a.toISOString().slice(0,10)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:a,end:s}=this.getDateRangeISO(),[n,r,i]=await Promise.all([ke(e),U("1-1:1.29.0",a,s),U("1-1:2.29.0",a,s)]);this.state.rangeData=n,this.state.consumptionTimeseries=r,this.state.productionTimeseries=i}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async applyCustomRange(){this.preZoomRange=null,this.clearChartViewport();const{customStart:e,customEnd:a}=this.state;if(!(!e||!a)){this.state.error=null,this.state.loading=!0,this.resetAnalysisComparison(),this.render();try{const s=Ea(e,a),n=s?ke(s):Z(async()=>{const{fetchCustomData:d}=await Promise.resolve().then(()=>ae);return{fetchCustomData:d}},void 0).then(({fetchCustomData:d})=>d(e,a)),[r,i,c]=await Promise.all([n,U("1-1:1.29.0",new Date(e+"T00:00:00").toISOString(),new Date(a+"T23:59:59.999").toISOString()),U("1-1:2.29.0",new Date(e+"T00:00:00").toISOString(),new Date(a+"T23:59:59.999").toISOString())]);this.state.rangeData={range:"custom",consumption:r.consumption,production:r.production,exported:r.exported??0,self_consumed:r.self_consumed??0,grid_import:r.grid_import,solar_to_home:r.solar_to_home,direct_solar_to_home:r.direct_solar_to_home,shared:r.shared,shared_with_me:r.shared_with_me,gas_energy:r.gas_energy??0,gas_volume:r.gas_volume??0,peak_power_kw:r.peak_power_kw??0,exceedance_kwh:r.exceedance_kwh??0,metering_point:r.metering_point??"",start:r.start??e,end:r.end??a},this.state.consumptionTimeseries=i,this.state.productionTimeseries=c}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}}changeTab(e){this.state.tab=e,this.render(),(e==="dashboard"||e==="charts")&&!this.state.rangeData&&!this.state.loading&&this.loadData(),e==="charts"&&this.state.rangeData&&!this.state.analysisComparison&&!this.state.analysisComparisonLoading&&this.loadAnalysisComparison(),e==="sensors"&&!this.state.sensors&&Le().then(a=>{this.state.sensors=a,this.render()}),e==="settings"&&!this.state.config&&ye().then(a=>{this.state.config=a,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,Da(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}printInvoice(){var i,c;const e=document.title,s=`Leneda-invoice-${(i=this.state.rangeData)!=null&&i.start&&((c=this.state.rangeData)!=null&&c.end)?`${this.state.rangeData.start.slice(0,10)}_to_${this.state.rangeData.end.slice(0,10)}`:this.state.range}`.replace(/[^a-z0-9_-]+/gi,"-");let n=!1;const r=()=>{n||(n=!0,document.title=e,window.removeEventListener("afterprint",r))};document.title=s,window.addEventListener("afterprint",r,{once:!0}),window.print(),window.setTimeout(r,1e3)}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const a=this.root.querySelector(".main-content");a?a.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}getDataSourceLabel(){return this.state.mode==="ha"?"Home Assistant":"Standalone"}getHostedDataNoticeHtml(){var e;return(((e=this.state.credentials)==null?void 0:e.proxy_url)??"").trim().length>0,""}render(){var d;const{tab:e,loading:a,error:s,theme:n}=this.state,r=this.getDataSourceLabel(),i=this.getHostedDataNoticeHtml();if(a&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${Re(e,g=>{},!1,n,r)}
          <main class="main-content">
            ${i}
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `,this.attachNavListeners();return}if(s&&!this.state.rangeData){const g=s.toLowerCase().includes("missing data");this.root.innerHTML=`
        <div class="app-shell">
          ${Re(e,u=>{},!1,n,r)}
          <main class="main-content">
            ${i}
            <div class="error-state">
              <h2>${g?"Missing Data":"Connection Error"}</h2>
              <p>${g?"The selected period could not be loaded because data is missing.":s}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(d=this.root.querySelector("#retry-btn"))==null||d.addEventListener("click",()=>this.loadData());return}let c="";switch(e){case"dashboard":c=Gt(this.state);break;case"charts":c=da(this.state);break;case"sensors":c=pa(this.state.sensors);break;case"invoice":c=fa(this.state);break;case"settings":c=xa(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${Re(e,g=>this.changeTab(g),this.state.isMenuOpen,n,r)}
        <main class="main-content">
          ${i}
          ${a?'<div class="loading-bar"></div>':""}
          ${c}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachAnalysisListeners(),this.attachInvoiceListeners(),this.attachSettingsListeners()}attachNavListeners(){var e,a;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(a=this.root.querySelector("[data-theme-toggle]"))==null||a.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{const n=s.dataset.tab;this.changeTab(n)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(i=>{i.addEventListener("click",()=>{const c=i.dataset.range;this.changeRange(c)})});const a=this.root.querySelector("#custom-start"),s=this.root.querySelector("#custom-end");a&&a.addEventListener("change",()=>{this.state.customStart=a.value}),s&&s.addEventListener("change",()=>{this.state.customEnd=s.value});const n=this.root.querySelector("#apply-custom-range");if(n==null||n.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(i=>{i.addEventListener("click",()=>{const c=i.dataset.chartUnit;c!==this.state.chartUnit&&(this.state.chartUnit=c,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-view]").forEach(i=>{i.addEventListener("click",()=>{const c=i.dataset.chartView;c!==this.state.chartConsumptionView&&(this.state.chartConsumptionView=c,this.renderPreserveMainScroll())})}),!e){const i=this.root.querySelector("#energy-chart");i&&this.state.rangeData&&this.initChart(i)}const r=this.root.querySelector(".reset-zoom-btn");r==null||r.addEventListener("click",async()=>{const{resetChartZoom:i}=await Z(async()=>{const{resetChartZoom:c}=await import("./Charts-C6w_T9a3.js");return{resetChartZoom:c}},[]);if(i(),r.style.display="none",this.clearChartViewport(),this.preZoomRange!==null){const c=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",c==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(c)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachAnalysisListeners(){this.root.querySelectorAll("[data-analysis-heatmap]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisHeatmap;a!==this.state.analysisHeatmapMetric&&(this.state.analysisHeatmapMetric=a,this.renderPreserveMainScroll())})})}attachInvoiceListeners(){var e;(e=this.root.querySelector("#print-invoice-btn"))==null||e.addEventListener("click",()=>{this.printInvoice()})}attachSettingsListeners(){var d,g;const e=this.root.querySelector("#credentials-form");if(e){const u=this.root.querySelector("#add-meter-btn");u==null||u.addEventListener("click",()=>{var m,_,k;const v=new FormData(e),h=p(v);if(h.length<10){h.push({id:"",types:["consumption"]});const D={api_key:v.get("api_key")||((m=this.state.credentials)==null?void 0:m.api_key)||"",energy_id:v.get("energy_id")||((_=this.state.credentials)==null?void 0:_.energy_id)||"",meters:h,proxy_url:v.get("proxy_url")||((k=this.state.credentials)==null?void 0:k.proxy_url)||""};this.state.credentials=D,Pe(D),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach(v=>{v.addEventListener("click",()=>{var D,x,C;const h=parseInt(v.dataset.meter??"0",10),m=new FormData(e),_=p(m);_.splice(h,1);const k={api_key:m.get("api_key")||((D=this.state.credentials)==null?void 0:D.api_key)||"",energy_id:m.get("energy_id")||((x=this.state.credentials)==null?void 0:x.energy_id)||"",meters:_,proxy_url:m.get("proxy_url")||((C=this.state.credentials)==null?void 0:C.proxy_url)||""};this.state.credentials=k,Pe(k),this.renderPreserveMainScroll()})});const p=v=>{var m,_,k;const h=[];for(let D=0;D<10;D++){const x=v.get(`meter_${D}_id`);if(x===null)break;const C=[];(m=e.querySelector(`[name="meter_${D}_consumption"]`))!=null&&m.checked&&C.push("consumption"),(_=e.querySelector(`[name="meter_${D}_production"]`))!=null&&_.checked&&C.push("production"),(k=e.querySelector(`[name="meter_${D}_gas"]`))!=null&&k.checked&&C.push("gas"),h.push({id:x.trim(),types:C})}return h};e.addEventListener("submit",async v=>{v.preventDefault();const h=new FormData(e),m={api_key:h.get("api_key"),energy_id:h.get("energy_id"),meters:p(h),proxy_url:h.get("proxy_url")},_=this.root.querySelector("#creds-status");try{Pe(m);const{saveCredentials:k}=await Z(async()=>{const{saveCredentials:C}=await Promise.resolve().then(()=>ae);return{saveCredentials:C}},void 0);await k(m),_&&(_.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=m,this.state.error=null;const D=!1,x=(m.proxy_url??"").trim();await this.loadData()}catch(k){_&&(_.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${k instanceof Error?k.message:k}</p>`)}});const o=this.root.querySelector("#test-creds-btn");o==null||o.addEventListener("click",async()=>{const v=new FormData(e),h={api_key:v.get("api_key"),energy_id:v.get("energy_id"),meters:p(v),proxy_url:v.get("proxy_url")},m=this.root.querySelector("#creds-status");m&&(m.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:_}=await Z(async()=>{const{testCredentials:D}=await Promise.resolve().then(()=>ae);return{testCredentials:D}},void 0),k=await _(h);m&&(m.innerHTML=k.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${k.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${k.message}</p>`)}catch(_){m&&(m.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${_ instanceof Error?_.message:_}</p>`)}})}const a=this.root.querySelector("#settings-form");if(!a)return;const s=u=>{const p=[];for(let o=0;o<24;o++){const v=u.get(`consumption_window_${o}_label`),h=u.get(`consumption_window_${o}_day_group`),m=u.get(`consumption_window_${o}_start_time`),_=u.get(`consumption_window_${o}_end_time`),k=u.get(`consumption_window_${o}_rate`);if(v===null&&h===null&&m===null&&_===null&&k===null)break;p.push({label:(v??"").trim()||`Window ${o+1}`,day_group:h??"all",start_time:m??"00:00",end_time:_??"06:00",rate:parseFloat(k??"0")||0})}return p},n=u=>{const p=[];for(let o=0;o<24;o++){const v=u.get(`reference_window_${o}_label`),h=u.get(`reference_window_${o}_day_group`),m=u.get(`reference_window_${o}_start_time`),_=u.get(`reference_window_${o}_end_time`),k=u.get(`reference_window_${o}_reference_power_kw`);if(v===null&&h===null&&m===null&&_===null&&k===null)break;p.push({label:(v??"").trim()||`Reference ${o+1}`,day_group:h??"all",start_time:m??"17:00",end_time:_??"00:00",reference_power_kw:parseFloat(k??"0")||0})}return p},r=()=>{var D;const u=new FormData(a),p={};a.querySelectorAll('input[type="checkbox"]').forEach(x=>{p[x.name]=x.checked});const o=[],v=/^feed_in_rate_(\d+)_(.+)$/,h={},m=[],_=/^meter_fee_(\d+)_(.+)$/,k={};for(const[x,C]of u.entries()){if(x.startsWith("consumption_window_")||x.startsWith("reference_window_"))continue;const b=x.match(v);if(b){const W=b[1],I=b[2];h[W]||(h[W]={}),h[W][I]=C;continue}const f=x.match(_);if(f){const W=f[1],I=f[2];k[W]||(k[W]={}),k[W][I]=C;continue}if(p[x]!==void 0&&typeof p[x]=="boolean")continue;const y=C,M=a.elements.namedItem(x);if(y===""&&M instanceof HTMLInputElement&&M.type==="number"){const W=(D=this.state.config)==null?void 0:D[x];typeof W=="number"&&isFinite(W)&&(p[x]=W);continue}const F=parseFloat(y);p[x]=isNaN(F)?y:F}for(const x of Object.keys(h).sort()){const C=h[x],b=C.mode??"fixed",f=b==="sensor"?C.fallback_tariff??C.tariff:C.tariff;o.push({meter_id:C.meter_id??"",mode:b,tariff:parseFloat(f??"0.08")||.08,sensor_entity:C.sensor_entity??""})}o.length>0&&(p.feed_in_rates=o);for(const x of Object.keys(k).sort()){const C=k[x];m.push({meter_id:C.meter_id??"",label:C.label??"",fee:parseFloat(C.fee??"0")||0})}return m.length>0&&(p.meter_monthly_fees=m),p.consumption_rate_windows=s(u),p.reference_power_windows=n(u),p},i=u=>{if(!this.state.config)return;const p=r();u(p),this.state.config={...this.state.config,...p},this.renderPreserveMainScroll()};if((d=this.root.querySelector("#add-consumption-window-btn"))==null||d.addEventListener("click",()=>{i(u=>{var o;const p=Array.isArray(u.consumption_rate_windows)?[...u.consumption_rate_windows]:[];p.push({label:`Window ${p.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((o=this.state.config)==null?void 0:o.energy_variable_rate)??.1125}),u.consumption_rate_windows=p})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(u=>{u.addEventListener("click",()=>{const p=parseInt(u.dataset.window??"0",10);i(o=>{const v=Array.isArray(o.consumption_rate_windows)?[...o.consumption_rate_windows]:[];v.splice(p,1),o.consumption_rate_windows=v})})}),(g=this.root.querySelector("#add-reference-window-btn"))==null||g.addEventListener("click",()=>{i(u=>{var o;const p=Array.isArray(u.reference_power_windows)?[...u.reference_power_windows]:[];p.push({label:`Reference ${p.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((o=this.state.config)==null?void 0:o.reference_power_kw)??5}),u.reference_power_windows=p})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(u=>{u.addEventListener("click",()=>{const p=parseInt(u.dataset.window??"0",10);i(o=>{const v=Array.isArray(o.reference_power_windows)?[...o.reference_power_windows]:[];v.splice(p,1),o.reference_power_windows=v})})}),a.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(u=>{u.addEventListener("change",()=>{const p=u.name.match(/feed_in_rate_(\d+)_mode/);if(!p)return;const o=p[1],v=a.querySelector(`.feed-in-fixed-fields[data-rate-idx="${o}"]`),h=a.querySelector(`.feed-in-sensor-fields[data-rate-idx="${o}"]`);v&&(v.style.display=u.value==="fixed"?"":"none"),h&&(h.style.display=u.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const u=this.root.querySelector("#ha-entity-list");u&&ct().then(({entities:p})=>{u.innerHTML=p.map(o=>`<option value="${o}"></option>`).join("")}).catch(()=>{})}a.addEventListener("submit",async u=>{u.preventDefault();const p=r();try{const{saveConfig:o}=await Z(async()=>{const{saveConfig:v}=await Promise.resolve().then(()=>ae);return{saveConfig:v}},void 0);await o(p),this.state.config=await ye(),this.render()}catch(o){alert("Failed to save: "+(o instanceof Error?o.message:o))}});const c=this.root.querySelector("#reset-config-btn");c==null||c.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?"))try{const{resetConfig:u}=await Z(async()=>{const{resetConfig:p}=await Promise.resolve().then(()=>ae);return{resetConfig:p}},void 0);await u(),this.state.config=await ye(),this.render()}catch(u){alert("Failed to reset: "+(u instanceof Error?u.message:u))}})}async initChart(e){var a,s;try{const{renderEnergyChart:n}=await Z(async()=>{const{renderEnergyChart:_}=await import("./Charts-C6w_T9a3.js");return{renderEnergyChart:_}},[]),{fetchTimeseries:r,fetchPerMeterTimeseries:i}=await Z(async()=>{const{fetchTimeseries:_,fetchPerMeterTimeseries:k}=await Promise.resolve().then(()=>ae);return{fetchTimeseries:_,fetchPerMeterTimeseries:k}},void 0),{start:c,end:d}=this.getDateRangeISO(),g=this.state.chartViewportStart?new Date(this.state.chartViewportStart).getTime():void 0,u=this.state.chartViewportEnd?new Date(this.state.chartViewportEnd).getTime():void 0;let p=this.state.consumptionTimeseries,o=this.state.productionTimeseries;(!p||!o)&&([p,o]=await Promise.all([r("1-1:1.29.0",c,d),r("1-1:2.29.0",c,d)]),this.state.consumptionTimeseries=p,this.state.productionTimeseries=o);const v=((a=this.state.config)==null?void 0:a.reference_power_kw)??0,h=(((s=this.state.config)==null?void 0:s.meters)??[]).filter(_=>_.types.includes("production"));let m;if(h.length>1)try{const _=await i("1-1:2.29.0",c,d);_.meters&&_.meters.length>1&&(m=_.meters)}catch(_){console.warn("Per-meter timeseries fetch failed, using merged view:",_)}n(e,p,o,{unit:this.state.chartUnit,consumptionView:this.state.chartConsumptionView,referencePowerKw:v,perMeterProduction:m,viewportStartMs:g,viewportEndMs:u,onZoomChange:(_,k)=>{this.handleChartZoomChange(_,k)}})}catch(n){console.error("Chart init failed:",n)}}async handleChartZoomChange(e,a){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd);const{fetchCustomData:s}=await Z(async()=>{const{fetchCustomData:g}=await Promise.resolve().then(()=>ae);return{fetchCustomData:g}},void 0),n=e.slice(0,10),r=a.slice(0,10);this.resetAnalysisComparison();const i=await s(e,a),[c,d]=await Promise.all([U("1-1:1.29.0",e,a),U("1-1:2.29.0",e,a)]);this.state.range="custom",this.state.customStart=n,this.state.customEnd=r,this.state.chartViewportStart=e,this.state.chartViewportEnd=a,this.state.rangeData={range:"custom",consumption:i.consumption,production:i.production,exported:i.exported??0,self_consumed:i.self_consumed??0,gas_energy:i.gas_energy??0,gas_volume:i.gas_volume??0,grid_import:i.grid_import,solar_to_home:i.solar_to_home,direct_solar_to_home:i.direct_solar_to_home,shared:i.shared,shared_with_me:i.shared_with_me,peak_power_kw:i.peak_power_kw??0,exceedance_kwh:i.exceedance_kwh??0,metering_point:i.metering_point??"",start:i.start,end:i.end},this.state.consumptionTimeseries=c,this.state.productionTimeseries=d,this.renderPreserveMainScroll()}catch(s){console.error("Zoom data fetch failed:",s),this.clearRangeStateWithError(s,"Missing data"),this.render()}}getDateRangeISO(){if(this.state.chartViewportStart&&this.state.chartViewportEnd)return{start:this.state.chartViewportStart,end:this.state.chartViewportEnd};const e=new Date,a=s=>s.toISOString();switch(this.state.range){case"custom":{const s=new Date(this.state.customStart+"T00:00:00"),n=new Date(this.state.customEnd+"T23:59:59.999");return{start:a(s),end:a(n)}}case"yesterday":{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const n=new Date(s);return n.setHours(23,59,59,999),{start:a(s),end:a(n)}}case"this_week":{const s=new Date(e),n=s.getDay()||7;return s.setDate(s.getDate()-n+1),s.setHours(0,0,0,0),{start:a(s),end:a(e)}}case"last_week":{const s=new Date(e),n=s.getDay()||7,r=new Date(s);r.setDate(s.getDate()-n),r.setHours(23,59,59,999);const i=new Date(r);return i.setDate(r.getDate()-6),i.setHours(0,0,0,0),{start:a(i),end:a(r)}}case"this_month":{const s=new Date(e.getFullYear(),e.getMonth(),1);return{start:a(s),end:a(e)}}case"last_month":{const s=new Date(e.getFullYear(),e.getMonth()-1,1),n=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:a(s),end:a(n)}}case"this_year":{const s=new Date(e.getFullYear(),0,1);return{start:a(s),end:a(e)}}case"last_year":{const s=new Date(e.getFullYear()-1,0,1),n=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:a(s),end:a(n)}}default:{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const n=new Date(s);return n.setHours(23,59,59,999),{start:a(s),end:a(n)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new Ta(t).mount()}
