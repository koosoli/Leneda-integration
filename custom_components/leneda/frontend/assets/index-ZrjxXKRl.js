var _a=Object.defineProperty;var xa=(t,e,s)=>e in t?_a(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var $e=(t,e,s)=>xa(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const ka="modulepreload",Sa=function(t){return"/leneda-panel/static/"+t},ps={},ne=function(e,s,a){let n=Promise.resolve();if(s&&s.length>0){let r=function(p){return Promise.all(p.map(y=>Promise.resolve(y).then(w=>({status:"fulfilled",value:w}),w=>({status:"rejected",reason:w}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),d=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));n=r(s.map(p=>{if(p=Sa(p),p in ps)return;ps[p]=!0;const y=p.endsWith(".css"),w=y?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${w}`))return;const b=document.createElement("link");if(b.rel=y?"stylesheet":ka,y||(b.as="script"),b.crossOrigin="",b.href=p,d&&b.setAttribute("nonce",d),document.head.appendChild(b),y)return new Promise((l,g)=>{b.addEventListener("load",l),b.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${p}`)))})}))}function o(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return n.then(r=>{for(const i of r||[])i.status==="rejected"&&o(i.reason);return e().catch(o)})};function Ls(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()})),proxy_url:(t.proxy_url??"").trim()}}function Ma(){var t,e,s,a,n;try{const o=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((n=(a=(s=o==null?void 0:o.hass)==null?void 0:s.auth)==null?void 0:a.data)==null?void 0:n.access_token)??null}catch{return null}}async function z(t,e){const s=Ma(),a={...e==null?void 0:e.headers,...s?{Authorization:`Bearer ${s}`}:{}},n={...e,credentials:"include",headers:a},o=await fetch(t,n);if(!o.ok){const r=o.headers.get("content-type")??"";let i="",d="";if(r.includes("application/json")){const p=await o.json().catch(()=>null);i=String((p==null?void 0:p.error)??"").trim(),d=String((p==null?void 0:p.message)??(p==null?void 0:p.error)??"").trim()}else d=(await o.text().catch(()=>"")).trim();throw i==="missing_data"||i==="no_data"||o.status===503?new Error("Missing data"):new Error(d?`API ${o.status}: ${d}`:`API ${o.status}: ${o.statusText}`)}return o.json()}async function Ze(t){return z(`/leneda_api/data?range=${t}`)}async function Ca(t,e){return z(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function Le(t,e,s){let a=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),z(a)}async function Ct(t,e,s){let a=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),z(a)}async function Et(){return z("/leneda_api/sensors")}async function Ke(){return z("/leneda_api/config")}async function Ea(t){await z("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function Ta(){await z("/leneda_api/config/reset",{method:"POST"})}async function Ks(){try{return await z("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function Ws(){return z("/leneda_api/credentials")}async function Da(t){const e=Ls(t);await z("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function La(t){const e=Ls(t);return z("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Fs(){return z("/leneda_api/ha-entities")}const ge=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:Ke,fetchCredentials:Ws,fetchCustomData:Ca,fetchHAEntities:Fs,fetchMode:Ks,fetchPerMeterTimeseries:Ct,fetchRangeData:Ze,fetchSensors:Et,fetchTimeseries:Le,resetConfig:Ta,saveConfig:Ea,saveCredentials:Da,testCredentials:La},Symbol.toStringTag,{value:"Module"})),Rt=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function hs(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function Ka(t,e){if(!t||!e)return"";const s=new Date(t),a=new Date(e);if(Number.isNaN(s.getTime())||Number.isNaN(a.getTime()))return"";const n=s.toLocaleDateString(),o=a.toLocaleDateString();return n===o?n:`${n} — ${o}`}function At(t){var n,o,r,i;const e=hs(((n=t.rangeData)==null?void 0:n.start)??t.customStart),s=hs(((o=t.rangeData)==null?void 0:o.end)??t.customEnd),a=Ka((r=t.rangeData)==null?void 0:r.start,(i=t.rangeData)==null?void 0:i.end);return`
    <div class="period-bar">
      <div class="range-selector" role="group" aria-label="Select period">
        ${Rt.map(d=>`
          <button
            class="range-btn ${d.id===t.range?"active":""}"
            data-range="${d.id}"
            aria-pressed="${d.id===t.range}"
          >${d.label}</button>
        `).join("")}
      </div>
      ${a?`<span class="period-bar-dates" title="Period currently shown">${a}</span>`:""}
    </div>

    ${t.range==="custom"?`
      <div class="custom-range-picker">
        <label>
          <span>From</span>
          <input type="date" id="custom-start" value="${t.customStart||e}" />
        </label>
        <label>
          <span>To</span>
          <input type="date" id="custom-end" value="${t.customEnd||s}" />
        </label>
        <button class="btn btn-primary" id="apply-custom-range">Apply</button>
      </div>
    `:""}
  `}function Vt(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(e){const[,s,a,n]=e;return new Date(Number(s),Number(a)-1,Number(n))}return new Date(t)}function O(t){return t==null||!Number.isFinite(t)?0:(t<0?-1:1)*Math.round(Number((Math.abs(t)*100).toFixed(6)))/100}function u(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function de(t){return Vt(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function Ps(t){return Vt(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function Qe(t){return Vt(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}const Wa={grid:`
    <path d="M12 2.8V21.2" />
    <path d="M5.6 7H18.4" />
    <path d="M7.6 11.6H16.4" />
    <path d="M9.6 16.2H14.4" />
  `,solar:`
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.6V5.1" />
    <path d="M12 18.9V21.4" />
    <path d="M2.6 12H5.1" />
    <path d="M18.9 12H21.4" />
    <path d="M5.4 5.4L7.1 7.1" />
    <path d="M16.9 16.9L18.6 18.6" />
    <path d="M16.9 7.1L18.6 5.4" />
    <path d="M5.4 18.6L7.1 16.9" />
  `,community:`
    <path d="M2.8 21H21.2" />
    <path d="M4.4 21V10.2H10.6V21" />
    <path d="M13.4 21V6.2H19.6V21" />
    <path d="M6.4 13.4H8.6" />
    <path d="M6.4 17H8.6" />
    <path d="M15.4 9.6H17.6" />
    <path d="M15.4 13.4H17.6" />
    <path d="M15.4 17H17.6" />
  `,gas:`
    <path d="M12 2.9C15.1 6.6 16.6 9.4 16.6 11.9C16.6 15.2 14.5 17.9 12 17.9C9.5 17.9 7.4 15.2 7.4 11.9C7.4 9.4 8.9 6.6 12 2.9Z" />
    <path d="M12 10.4C13.3 12.1 13.9 13.4 13.9 14.5C13.9 16 13 17.1 12 17.1C11 17.1 10.1 16 10.1 14.5C10.1 13.4 10.7 12.1 12 10.4Z" fill="currentColor" stroke="none" opacity="0.8" />
  `};function ce(t){const{x:e,y:s,r:a,glyph:n,color:o,kicker:r,value:i,detail:d,text:p,compact:y=!1,prefix:w}=t,b=a*1.24/24,l=`
    <g class="scene-node-badge" transform="translate(${e}, ${s})" color="${o}">
      <circle r="${a+18}" class="scene-node-aura" fill="${o}" />
      <circle r="${a+7}" class="scene-node-halo" fill="${o}" />
      <circle r="${a}" class="scene-node-plate" fill="url(#${w}-plate)" stroke="${o}" />
      <circle r="${a-1}" class="scene-node-wash" fill="${o}" />
      <g class="scene-node-glyph" transform="scale(${b.toFixed(3)}) translate(-12, -12)">
        ${Wa[n]}
      </g>
    </g>
  `;if(p==="none")return l;const g=y?9:11,m=y?18:28;if(p==="right"){const k=e+a+20;return`
      ${l}
      <g class="scene-node-text" text-anchor="start">
        <text x="${k}" y="${s-12}" class="scene-node-kicker">${r}</text>
        ${i?`<text x="${k}" y="${s+10}" class="scene-node-value">${i}</text>`:""}
        ${d?`<text x="${k}" y="${s+28}" class="scene-node-detail">${d}</text>`:""}
      </g>
    `}const S=s+a+m;return`
    ${l}
    <g class="scene-node-text" text-anchor="middle">
      <text x="${e}" y="${S}" class="scene-node-kicker" style="font-size:${g}px">${r}</text>
      ${i?`<text x="${e}" y="${S+(y?18:22)}" class="scene-node-value">${i}</text>`:""}
      ${d?`<text x="${e}" y="${S+(y?34:40)}" class="scene-node-detail">${d}</text>`:""}
    </g>
  `}function Z(t){const{id:e,path:s,from:a,to:n,value:o,max:r,color:i,reverse:d=!1,label:p}=t,y=r>0?Math.min(1,o/r):0,w=o>0?3.2+y*6:2,b=o<=0,l=(2.6-y*1.3).toFixed(2),[g,m]=d?[n,a]:[a,n];return`
    <g class="flow-link${b?" flow-link-idle":""}" color="${i}">
      <title>${p}</title>
      <linearGradient
        id="${e}"
        gradientUnits="userSpaceOnUse"
        x1="${g.x}" y1="${g.y}" x2="${m.x}" y2="${m.y}"
      >
        <stop offset="0%" stop-color="${i}" stop-opacity="0.45" />
        <stop offset="100%" stop-color="${i}" stop-opacity="1" />
      </linearGradient>
      <path
        class="flow-track"
        d="${s}"
        stroke-width="${(w+3).toFixed(1)}"
        fill="none"
      />
      ${b?"":`
      <path
        class="flow-pulse"
        d="${s}"
        stroke="url(#${e})"
        stroke-width="${w.toFixed(1)}"
        style="animation-duration:${l}s${d?";animation-direction:reverse":""}"
        fill="none"
      />`}
    </g>
  `}function Rs(t){const{cx:e,apexY:s,eavesY:a,baseY:n,halfWidth:o,ringY:r,ringR:i,coverage:d,usageLabel:p,usageValue:y,prefix:w}=t,b=e-o,l=e+o,g=Math.round(o*.09),m=(a-s)/o,S={x:e+o*.16,y:s+o*.16*m+9},k={x:e+o*.7,y:s+o*.7*m+9},_=Math.hypot(k.x-S.x,k.y-S.y),C=Math.atan2(k.y-S.y,k.x-S.x)*180/Math.PI,M=Math.max(6,o*.1),c=4,v=2*Math.PI*(i-5),h=Math.min(100,Math.max(0,d));return`
    <g class="elite-house">
      <ellipse cx="${e}" cy="${n+10}" rx="${o*1.5}" ry="${Math.max(10,o*.16)}" fill="url(#${w}-house-shadow)" />

      <path
        class="house-roof"
        d="M ${b-g} ${a+2} L ${e} ${s} L ${l+g} ${a+2} Z"
        fill="url(#${w}-roof)"
      />
      <path
        class="house-body"
        d="M ${b} ${a} H ${l} V ${n} H ${b} Z"
        fill="url(#${w}-body)"
      />
      <path class="house-ridge" d="M ${e} ${s+3} L ${e} ${a}" />

      <g class="house-panels" transform="translate(${S.x.toFixed(1)}, ${S.y.toFixed(1)}) rotate(${C.toFixed(2)})">
        <rect
          x="0" y="${(-M/2).toFixed(1)}"
          width="${_.toFixed(1)}" height="${M.toFixed(1)}"
          rx="2"
          fill="var(--clr-production)"
        />
        ${Array.from({length:c-1},(f,$)=>`<path d="M ${(($+1)*_/c).toFixed(1)} ${(-M/2).toFixed(1)} V ${(M/2).toFixed(1)}" class="house-panel-divider" />`).join("")}
      </g>

      <g class="house-ring" transform="translate(${e}, ${r})">
        <circle r="${i+12}" class="house-ring-glow" fill="url(#${w}-ring-glow)" />
        <circle r="${i}" class="house-ring-plate" fill="url(#${w}-plate)" />
        <circle
          class="house-ring-track"
          r="${i-5}"
          fill="none"
          stroke-width="4.5"
        />
        <circle
          class="house-ring-value"
          r="${i-5}"
          fill="none"
          stroke="url(#${w}-ring-arc)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-dasharray="${v.toFixed(1)}"
          stroke-dashoffset="${(v*(1-h/100)).toFixed(1)}"
          transform="rotate(-90)"
        />
        <text y="${i>32?-6:-5}" text-anchor="middle" class="house-ring-kicker">SOLAR</text>
        <text y="${i>32?15:14}" text-anchor="middle" class="house-ring-value-text">${u(h,0)}%</text>
      </g>

      ${p&&y?`
      <text x="${e}" y="${n-30}" text-anchor="middle" class="house-total-label">${p}</text>
      <text x="${e}" y="${n-10}" text-anchor="middle" class="house-total-value">${y}</text>
      `:""}
    </g>
  `}function As(t){return`
    <defs>
      <!-- Dot grid: gives the panel a faint technical texture up close and
           reads as flat tone from a normal viewing distance. -->
      <pattern id="${t}-grid" width="26" height="26" patternUnits="userSpaceOnUse">
        <circle cx="1.4" cy="1.4" r="1.1" class="scene-grid-dot" />
      </pattern>

      <linearGradient id="${t}-shell" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="var(--clr-surface-alt)" />
        <stop offset="100%" stop-color="var(--clr-surface)" />
      </linearGradient>
      <linearGradient id="${t}-plate" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="var(--clr-surface-alt)" />
        <stop offset="100%" stop-color="var(--clr-surface)" />
      </linearGradient>
      <linearGradient id="${t}-roof" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="var(--clr-surface-hover)" />
        <stop offset="100%" stop-color="var(--clr-surface-alt)" />
      </linearGradient>
      <linearGradient id="${t}-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="var(--clr-surface-alt)" />
        <stop offset="100%" stop-color="var(--clr-surface)" />
      </linearGradient>
      <linearGradient id="${t}-ring-arc" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--clr-production)" stop-opacity="0.55" />
        <stop offset="100%" stop-color="var(--clr-production)" stop-opacity="1" />
      </linearGradient>

      <radialGradient id="${t}-house-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--clr-primary)" stop-opacity="0.18" />
        <stop offset="100%" stop-color="var(--clr-primary)" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="${t}-ring-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--clr-production)" stop-opacity="0.22" />
        <stop offset="100%" stop-color="var(--clr-production)" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="${t}-scene-glow" cx="50%" cy="40%" r="62%">
        <stop offset="0%" stop-color="var(--clr-primary)" stop-opacity="0.09" />
        <stop offset="100%" stop-color="var(--clr-primary)" stop-opacity="0" />
      </radialGradient>
    </defs>
  `}function Vs(t,e,s,a,n,o){return`
    <rect x="${e}" y="${s}" width="${a}" height="${n}" rx="${o}" class="scene-shell" fill="url(#${t}-shell)" />
    <rect x="${e}" y="${s}" width="${a}" height="${n}" rx="${o}" fill="url(#${t}-grid)" />
    <rect x="${e}" y="${s}" width="${a}" height="${n}" rx="${o}" fill="url(#${t}-scene-glow)" />
  `}function Fa(t,e){const{hasGas:s}=t,a=s?640:430,n="flowd",o=186,r=386,i=108,d=450-i,p=450+i;return`
    <svg
      class="elite-main-svg"
      viewBox="0 0 900 ${a}"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Energy flow between the grid, your solar panels, the energy community and your home for the selected period"
    >
      ${As(n)}
      ${Vs(n,16,16,868,a-32,30)}

      ${Rs({cx:450,apexY:o,eavesY:256,baseY:r,halfWidth:i,ringY:296,ringR:34,coverage:t.selfSufficiency,usageLabel:"Home usage",usageValue:`${u(t.totalHomeEnergy)} kWh`,prefix:n})}

      ${ce({prefix:n,x:450,y:82,r:40,glyph:"solar",color:"var(--clr-production)",text:"right",kicker:"Solar",value:`${u(t.production)} kWh`,detail:`${u(t.solarToHome)} kWh used at home`})}

      ${ce({prefix:n,x:110,y:290,r:40,glyph:"grid",color:"var(--clr-consumption)",text:"below",kicker:"Grid",value:`${u(t.boughtFromGrid+t.soldToMarket)} kWh`,detail:`In ${u(t.boughtFromGrid)} · out ${u(t.soldToMarket)}`})}

      ${ce({prefix:n,x:790,y:290,r:40,glyph:"community",color:"var(--clr-community)",text:"below",kicker:"Community",value:`${u(t.communityExchange)} kWh`,detail:`Sent ${u(t.shared)} · got ${u(t.sharedWithMe)}`})}

      ${s?ce({prefix:n,x:450,y:494,r:38,glyph:"gas",color:"var(--clr-gas)",text:"below",kicker:"Gas",value:t.gasVolume>0?`${u(t.gasEnergy)} kWh · ${u(t.gasVolume)} m³`:`${u(t.gasEnergy)} kWh`}):""}

      ${Z({id:`${n}-solar`,path:`M 450 130 L 450 ${o-4}`,from:{x:450,y:130},to:{x:450,y:o-4},value:t.directSolarToHome,max:e,color:"var(--clr-production)",label:`Solar to home: ${u(t.directSolarToHome)} kWh`})}

      ${Z({id:`${n}-import`,path:`M 158 274 C 220 266, 280 266, ${d-4} 274`,from:{x:158,y:274},to:{x:d-4,y:274},value:t.boughtFromGrid,max:e,color:"var(--clr-consumption)",label:`Bought from the grid: ${u(t.boughtFromGrid)} kWh`})}

      ${Z({id:`${n}-export`,path:`M ${d-4} 330 C 280 338, 220 338, 158 330`,from:{x:d-4,y:330},to:{x:158,y:330},value:t.soldToMarket,max:e,color:"var(--clr-export)",label:`Exported to the grid: ${u(t.soldToMarket)} kWh`})}

      ${Z({id:`${n}-shared`,path:`M ${p+4} 274 C 620 266, 680 266, 742 274`,from:{x:p+4,y:274},to:{x:742,y:274},value:t.shared,max:e,color:"var(--clr-community)",label:`Shared with the community: ${u(t.shared)} kWh`})}

      ${Z({id:`${n}-received`,path:`M 742 330 C 680 338, 620 338, ${p+4} 330`,from:{x:742,y:330},to:{x:p+4,y:330},value:t.sharedWithMe,max:e,color:"var(--clr-community)",reverse:!0,label:`Received from the community: ${u(t.sharedWithMe)} kWh`})}

      ${s?Z({id:`${n}-gas`,path:`M 450 452 L 450 ${r+6}`,from:{x:450,y:452},to:{x:450,y:r+6},value:Math.min(t.gasEnergy,e),max:e,color:"var(--clr-gas)",reverse:!0,label:`Gas to the house: ${u(t.gasEnergy)} kWh`}):""}
    </svg>
  `}function Pa(t,e){const{hasGas:s}=t,a=s?430:330,n="flowm",o=148,r=288,i=70,d=210-i,p=210+i;return`
    <svg
      class="elite-main-svg"
      viewBox="0 0 420 ${a}"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Energy flow between the grid, your solar panels, the energy community and your home for the selected period"
    >
      ${As(n)}
      ${Vs(n,12,12,396,a-24,26)}

      ${Rs({cx:210,apexY:o,eavesY:196,baseY:r,halfWidth:i,ringY:238,ringR:30,coverage:t.selfSufficiency,prefix:n})}

      ${ce({prefix:n,x:210,y:60,r:28,glyph:"solar",color:"var(--clr-production)",text:"none",kicker:"Solar",compact:!0})}

      ${ce({prefix:n,x:56,y:220,r:26,glyph:"grid",color:"var(--clr-consumption)",text:"below",kicker:"Grid",compact:!0})}

      ${ce({prefix:n,x:364,y:220,r:26,glyph:"community",color:"var(--clr-community)",text:"below",kicker:"Community",compact:!0})}

      ${s?ce({prefix:n,x:210,y:372,r:26,glyph:"gas",color:"var(--clr-gas)",text:"none",kicker:"Gas",compact:!0}):""}

      ${Z({id:`${n}-solar`,path:`M 210 94 L 210 ${o-4}`,from:{x:210,y:94},to:{x:210,y:o-4},value:t.directSolarToHome,max:e,color:"var(--clr-production)",label:`Solar to home: ${u(t.directSolarToHome)} kWh`})}

      ${Z({id:`${n}-import`,path:`M 86 206 C 104 200, 120 200, ${d-4} 206`,from:{x:86,y:206},to:{x:d-4,y:206},value:t.boughtFromGrid,max:e,color:"var(--clr-consumption)",label:`Bought from the grid: ${u(t.boughtFromGrid)} kWh`})}

      ${Z({id:`${n}-export`,path:`M ${d-4} 240 C 120 246, 104 246, 86 240`,from:{x:d-4,y:240},to:{x:86,y:240},value:t.soldToMarket,max:e,color:"var(--clr-export)",label:`Exported to the grid: ${u(t.soldToMarket)} kWh`})}

      ${Z({id:`${n}-shared`,path:`M ${p+4} 206 C 300 200, 318 200, 334 206`,from:{x:p+4,y:206},to:{x:334,y:206},value:t.shared,max:e,color:"var(--clr-community)",label:`Shared with the community: ${u(t.shared)} kWh`})}

      ${Z({id:`${n}-received`,path:`M 334 240 C 318 246, 300 246, ${p+4} 240`,from:{x:334,y:240},to:{x:p+4,y:240},value:t.sharedWithMe,max:e,color:"var(--clr-community)",reverse:!0,label:`Received from the community: ${u(t.sharedWithMe)} kWh`})}

      ${s?Z({id:`${n}-gas`,path:`M 210 342 L 210 ${r+6}`,from:{x:210,y:342},to:{x:210,y:r+6},value:Math.min(t.gasEnergy,e),max:e,color:"var(--clr-gas)",reverse:!0,label:`Gas to the house: ${u(t.gasEnergy)} kWh`}):""}
    </svg>
  `}function ms(t,e){const s=Math.max(t.totalHomeEnergy,t.production,t.boughtFromGrid,t.soldToMarket,t.shared,t.sharedWithMe,t.directSolarToHome,1);return`
    <div class="elite-scene elite-scene-${e}">
      ${e==="desktop"?Fa(t,s):Pa(t,s)}
    </div>
  `}const et=[{id:"year",label:"Year",shortLabel:"Yr",stepLabel:"year",approxMs:365*864e5,maxBuckets:30},{id:"month",label:"Month",shortLabel:"Mo",stepLabel:"month",approxMs:30*864e5,maxBuckets:72},{id:"week",label:"Week",shortLabel:"Wk",stepLabel:"week",approxMs:7*864e5,maxBuckets:104},{id:"day",label:"Day",shortLabel:"Day",stepLabel:"day",approxMs:864e5,maxBuckets:370},{id:"hour",label:"Hour",shortLabel:"Hr",stepLabel:"hour",approxMs:36e5,maxBuckets:744},{id:"quarter_hour",label:"15 min",shortLabel:"15m",stepLabel:"15 minutes",approxMs:15*6e4,maxBuckets:672}];function Is(t){return et.find(e=>e.id===t)??et[3]}function Tt(t,e){if(!t||!e)return 0;const s=new Date(t).getTime(),a=new Date(e).getTime();return!Number.isFinite(s)||!Number.isFinite(a)?0:Math.max(0,a-s)}function We(t,e){const s=Is(t);if(e<=0)return t==="quarter_hour";const a=e/s.approxMs;return a>=1.5&&a<=s.maxBuckets}function Ra(t,e){var n;if(e&&We(e,t))return e;const s=t/864e5,a=s<=1.25?"quarter_hour":s<=7?"hour":s<=45?"day":s<=180?"week":s<=900?"month":"year";return We(a,t)?a:((n=et.find(o=>We(o.id,t)))==null?void 0:n.id)??"quarter_hour"}function Aa(t,e){return new Date(t,e+1,0).getDate()}function gs(t,e,s){const a=t.getDate(),n=new Date(t),o=n.getMonth()+s,r=n.getFullYear()+e+Math.floor(o/12),i=(o%12+12)%12,d=Math.min(a,Aa(r,i));return n.setFullYear(r,i,d),n}function ys(t,e,s){switch(e){case"year":return gs(t,s,0);case"month":return gs(t,0,s);case"week":return new Date(t.getTime()+s*7*864e5);case"day":return new Date(t.getTime()+s*864e5);case"hour":return new Date(t.getTime()+s*36e5);case"quarter_hour":return new Date(t.getTime()+s*15*6e4)}}function Hs(t,e,s,a){if(!t||!e)return null;const n=new Date(t),o=new Date(e);return!Number.isFinite(n.getTime())||!Number.isFinite(o.getTime())?null:{start:ys(n,s,a),end:ys(o,s,a)}}function Va(t,e){if(!t||!e)return"No period loaded";const s=new Date(t),a=new Date(e);if(!Number.isFinite(s.getTime())||!Number.isFinite(a.getTime()))return"No period loaded";if(s.getFullYear()===a.getFullYear()&&s.getMonth()===a.getMonth()&&s.getDate()===a.getDate()){const o=s.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),r=s.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=a.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${o}, ${r} - ${i}`}return`${s.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})} - ${a.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}`}function be(t){const e=s=>`
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
      `)}}function Ia(t){var ee,U,ae,ye,xe,Fe,Pe,Re;const e=t.rangeData,s=(e==null?void 0:e.consumption)??0,a=(e==null?void 0:e.production)??0,n=(e==null?void 0:e.exported)??0,o=(e==null?void 0:e.self_consumed)??0,r=(e==null?void 0:e.gas_energy)??0,i=(e==null?void 0:e.gas_volume)??0,d=(e==null?void 0:e.peak_power_kw)??0,p=(e==null?void 0:e.shared_with_me)??0,y=(e==null?void 0:e.shared)??0,w=Math.max(0,n),b=(e==null?void 0:e.grid_import)!=null?Math.max(0,s-e.grid_import):void 0,l=Math.max(0,(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(o>0?o:a-w),b??0),g=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??Math.max(0,l-p)),m=l,S=Math.max(0,(e==null?void 0:e.grid_import)??s-l),k=s>0?s:S+l,_=!!((ee=t.config)!=null&&ee.meter_has_gas||(((U=t.config)==null?void 0:U.meters)??[]).some(j=>j.types.includes("gas"))),C=y+p,M=k>0?Math.min(100,l/k*100):0,c=Math.max(k,a,S,w,y,p,g,1),v=_?Math.min(Math.max(0,r),c):0,h=j=>j>0?Math.max(18,Math.round(j/c*100)):0,f={production:a,directSolarToHome:g,solarToHome:l,boughtFromGrid:S,soldToMarket:w,shared:y,sharedWithMe:p,communityExchange:C,totalHomeEnergy:k,selfSufficiency:M,gasEnergy:r,gasVolume:i,hasGas:_},$=e!=null&&e.start&&(e!=null&&e.end)?`${de(e.start)} — ${de(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${de(t.customStart+"T00:00:00")} — ${de(t.customEnd+"T00:00:00")}`:((ae=Rt.find(j=>j.id===t.range))==null?void 0:ae.label)??"Yesterday",E=(xe=(ye=t.consumptionTimeseries)==null?void 0:ye.items)!=null&&xe.length?t.consumptionTimeseries.items:((Fe=t.productionTimeseries)==null?void 0:Fe.items)??[],D=t.chartViewportStart??((Pe=E[0])==null?void 0:Pe.startedAt)??(e==null?void 0:e.start),K=t.chartViewportEnd??((Re=E[E.length-1])==null?void 0:Re.startedAt)??(e==null?void 0:e.end),L=Tt(D,K),F=Is(t.chartTimeBucket),I=Va(D,K),H=Hs(D,K,t.chartTimeBucket,1),N=new Date,Q=!H||H.start.getTime()>N.getTime(),pe=et.map(j=>{const fe=We(j.id,L),it=j.id===t.chartTimeBucket,Ae=j.id==="quarter_hour"?"15-minute detail would be too dense for this selected period":`${j.label} detail does not add useful resolution for this selected period`;return`
            <button
              class="unit-btn chart-bucket-btn ${it?"active":""}"
              data-chart-bucket="${j.id}"
              title="${fe?`Show ${j.label.toLowerCase()} detail`:Ae}"
              ${fe?"":'disabled aria-disabled="true"'}
            >${j.label}</button>
          `}).join(""),ie=t.chartUnit==="kw"?"kW uses the same detail presets as kWh, but keeps power values in interval bars so short spikes and dips stay visible.":"kWh keeps the aggregated period bars for totals.",he=`${t.chartConsumptionView==="house"?"Total Usage shows the full house load, with the solar-covered share highlighted in green and exports below zero. Use the detail presets and arrows above the graph to move through time.":t.chartConsumptionView==="solar_systems"?"PV Systems stacks each configured solar production meter so you can compare panel-system output like the Home Assistant Energy dashboard.":"Net Grid focuses on what still came from the grid after solar, with exports shown below zero. The reference limit in kW mode applies here."} ${ie}`,q=((e==null?void 0:e.exceedance_kwh)??0)>0?be("warning"):be("ok"),V=j=>`
        <div class="stat-card ${j.modifier}">
          <div class="stat-icon">${be(j.icon)}</div>
          <div class="stat-body">
            <div class="stat-label">${j.label}</div>
            <div class="stat-value">${j.value} <span class="stat-unit">${j.unit}</span></div>
            <p class="stat-hint">${j.hint}</p>
          </div>
        </div>
  `;return`
    <div class="dashboard">
      ${At(t)}

      <!-- Stat Cards -->
      <div class="stats-grid">
        ${V({modifier:"consumption",icon:"consumption",label:"Consumption",value:u(s),unit:"kWh",hint:"Everything the house used"})}
        ${V({modifier:"production",icon:"production",label:"Production",value:u(a),unit:"kWh",hint:"Total generated by your panels"})}
        ${V({modifier:"export",icon:"export",label:"Exported",value:u(n),unit:"kWh",hint:"Surplus sold back to the grid"})}
        ${V({modifier:"self-consumed",icon:"self_consumed",label:"Self-Consumed",value:u(m),unit:"kWh",hint:"Solar used at home instead of bought"})}
      </div>

      <!-- Energy Flow + Key Metrics side by side -->
      <div class="flow-metrics-row">
        <div class="card flow-card">
          <h3 class="card-title"><span class="title-icon">${be("flow")}</span> Energy Flow</h3>

          <div class="leneda-elite-flow">
            <p class="flow-scene-caption">
              Thicker paths carry more energy. Colours are explained below the diagram.
            </p>

            ${ms(f,"desktop")}
            ${ms(f,"mobile")}

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${u(k)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${u(M,0)}% of home usage solar-covered${d>0?` · Peak ${u(d,2)} kW`:""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${u(l)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${h(l)}%;"></span></div>
                  <p>Energy used inside the house${p>0?", including received community energy":""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${u(S)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${h(S)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${u(w)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${h(w)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${u(C)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${h(C)}%;"></span></div>
                  <p>Sent ${u(y)} kWh · received ${u(p)} kWh.</p>
                </div>
                ${_?`
                <div class="mobile-flow-item gas">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Gas to house</span>
                    <strong>${u(r)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${h(v||c)}%;"></span></div>
                  <p>${i>0?`${u(i)} m3 measured for the same period.`:"Gas meter is configured for this home."}</p>
                </div>
                `:""}
              </div>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${u(l)} kWh directly supplied inside the house</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${u(S)} kWh still needed from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${u(w)} kWh sent back to the market or grid</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${u(y)} kWh sent · ${u(p)} kWh received${p>0?" (included in solar to home)":""}</span>
                </span>
              </div>
              ${_?`
              <div class="flow-legend-item gas">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Gas to house</strong>
                  <span>${u(r)} kWh${i>0?` / ${u(i)} m3`:""}</span>
                </span>
              </div>
              `:""}
            </div>
          </div>
      </div>

      <!-- Key Metrics (right of flow) -->
      <div class="card metrics-card">
        <h3 class="card-title"><span class="title-icon">${be("metrics")}</span> Key Metrics</h3>
        <div class="metrics-list">
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Solar Coverage</span>
              <span class="metric-value">${u(M,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${M}%"></div>
            </div>
            <p class="metric-sub">Share of home usage covered by solar</p>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Bought from Grid</span>
              <span class="metric-value">${u(S)} kWh</span>
            </div>
          </div>
          ${d>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${u(d,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label"><span class="metric-status-icon">${q}</span> Exceedance</span>
              <span class="metric-value">${u((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${r>0||i>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${u(r)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${u(i)} m³</span>
            </div>
          </div>
          `:""}
        </div>
      </div>
      </div>

      <!-- Chart -->
      <div class="card chart-card">
        <div class="chart-header">
          <h3 class="card-title"><span class="title-icon">${be("profile")}</span> Energy Profile — ${$}</h3>

          <div class="chart-control-stack">
            <div class="chart-control-group chart-control-group-wide">
              <span class="chart-control-label">Period</span>
              <div class="chart-period-controls" role="group" aria-label="Move chart period">
                <button
                  class="chart-nav-btn"
                  data-chart-period-nav="prev"
                  title="Previous ${F.stepLabel}"
                  aria-label="Previous ${F.stepLabel}"
                >&larr;</button>
                <span class="chart-period-pill">${I}</span>
                <button
                  class="chart-nav-btn"
                  data-chart-period-nav="next"
                  title="Next ${F.stepLabel}"
                  aria-label="Next ${F.stepLabel}"
                  ${Q?'disabled aria-disabled="true"':""}
                >&rarr;</button>
              </div>
            </div>

            <div class="chart-control-group">
              <span class="chart-control-label">Detail</span>
              <div class="chart-bucket-toggle" role="group" aria-label="Chart detail presets">
                ${pe}
              </div>
            </div>

            <div class="chart-control-group">
              <span class="chart-control-label">Unit</span>
              <div class="chart-unit-toggle" role="group" aria-label="Chart unit">
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
              </div>
            </div>

            <div class="chart-control-group">
              <span class="chart-control-label">View</span>
              <div class="chart-unit-toggle" role="group" aria-label="Chart view">
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
        </div>
        <div class="chart-container">
          <canvas id="energy-chart"></canvas>
        </div>
        <p class="muted chart-hint">${he}</p>
      </div>
    </div>
  `}function Ha(t=""){return{iso:t,consumptionKw:0,productionKw:0,gridImportKw:0,solarExportKw:0}}function Ue(t,e,s){for(const a of(e==null?void 0:e.items)??[]){const n=new Date(a.startedAt).getTime();if(!Number.isFinite(n))continue;const o=t.get(n)??Ha(a.startedAt);o[s]+=Math.max(0,Number(a.value)||0),o.iso||(o.iso=a.startedAt),t.set(n,o)}}function Na(t,e,s={}){var r,i,d,p;const a=new Map,n=!!((i=(r=s.gridImport)==null?void 0:r.items)!=null&&i.length),o=!!((p=(d=s.marketExport)==null?void 0:d.items)!=null&&p.length);return Ue(a,t,"consumptionKw"),Ue(a,e,"productionKw"),Ue(a,s.gridImport,"gridImportKw"),Ue(a,s.marketExport,"solarExportKw"),[...a.entries()].sort((y,w)=>y[0]-w[0]).map(([y,w])=>{const b=Math.max(0,w.consumptionKw),l=Math.max(0,w.productionKw),g=Math.max(0,Math.min(b,l)),m=n?Math.max(0,w.gridImportKw):Math.max(0,b-g),S=Math.max(0,b-m),k=o?Math.max(0,w.solarExportKw):Math.max(0,l-g);return{timestamp:y,iso:w.iso||new Date(y).toISOString(),consumptionKw:b,productionKw:l,solarToHomeKw:S,gridImportKw:m,solarExportKw:k}})}function tt(t,e){return Number.isFinite(t)?Number(t):e}function kt(t,e,s){return Math.min(s,Math.max(e,t))}function ja(t,e,s){const a=t.reduce((l,g)=>l+g.producedKwh,0),n=t.reduce((l,g)=>l+g.selfConsumedKwh,0),o=t.reduce((l,g)=>l+g.exportedKwh,0),r=tt(e,n),i=tt(s,o),d=Math.max(0,r)+Math.max(0,i),p=Math.max(0,a-Math.max(0,i));if(a<=0)return{selfConsumedKwh:0,exportedKwh:0};if(d<=a+1e-6)return{selfConsumedKwh:kt(Math.max(Math.max(0,r),p),0,a),exportedKwh:kt(Math.max(0,i),0,a)};const y=d>0?Math.max(0,r)/d:0,w=Math.min(a,Math.max(0,r)),b=kt(a*y,0,w);return{selfConsumedKwh:b,exportedKwh:Math.max(0,a-b)}}function Ga(t,e){const s=t?t.slice(-8):"";return s?`Solar ${e} (${s})`:`Solar ${e}`}function Dt(t,e,s){return(typeof s=="string"?s.trim():"")||Ga(t,e)}function It(t){const e=(t.meters??[]).filter(n=>n.types.includes("production")||n.types.includes("solar_consumption")),s=t.feed_in_rates??[],a=t.currency??"EUR";return e.map((n,o)=>{const r=s.find(b=>b.meter_id===n.id),i=(r==null?void 0:r.mode)==="sensor"&&r.sensor_value!=null&&Number.isFinite(r.sensor_value),d=i?(r==null?void 0:r.sensor_value)??0:tt(r==null?void 0:r.tariff,tt(t.feed_in_tariff,0)),p=r==null?void 0:r.self_use_priority,y=p==null||p===""||!Number.isFinite(Number(p))?null:Math.max(1,Math.round(Number(p))),w=Dt(n.id,o+1,r==null?void 0:r.display_name);return{meterId:n.id,shortId:n.id?"…"+n.id.slice(-8):`Meter ${o+1}`,displayName:w,rate:d,label:i?`Sensor (${d.toFixed(4)} ${a}/kWh)`:"Fixed tariff",mode:(r==null?void 0:r.mode)??"fixed",selfUsePriority:y}}).map((n,o)=>({rate:n,order:o})).sort((n,o)=>{const r=n.rate.selfUsePriority??Number.POSITIVE_INFINITY,i=o.rate.selfUsePriority??Number.POSITIVE_INFINITY;return r!==i?r-i:n.order-o.order}).map(n=>n.rate)}function Xe(t){return t==null?"Pro-rata self-use":`Self-use priority ${t}`}function Ns(t){return t==="prorata"?"Prorata Modus: no self-use priority is configured, so each PV system's self-consumption and export are shared in proportion to what it produced in each 15-minute interval.":t==="mixed"?"Per-system self-consumption and export are allocated from each PV system's 15-minute production: systems with a self-use priority are served first (1 = consumed first at home), and systems sharing or missing a priority split the rest pro-rata to their own production.":"Per-system self-consumption and export are allocated from each PV system's 15-minute production using the configured self-use priority (1 = consumed first at home)."}function Oa(t){if(!t.length)return"prorata";const e=t.filter(a=>a.selfUsePriority!=null);return e.length===0?"prorata":e.length<t.length?"mixed":new Set(e.map(a=>a.selfUsePriority)).size===e.length?"priority":"mixed"}function Ba(t){const e=[];let s;for(const a of t){const n=a.selfUsePriority;if(e.length>0&&n===s){e[e.length-1].push(a);continue}e.push([a]),s=n}return e}function Ht(t,e,s,a,n){if(!e||!(s!=null&&s.length))return null;const o=It(t);if(!o.length)return null;const r=new Map(s.map(h=>[h.meter_id,h]));if(!o.some(h=>r.has(h.meterId)))return null;const i=o.map(h=>({...h,producedKwh:0,selfConsumedKwh:0,exportedKwh:0,revenue:0,exportEquivalentForSelfUse:0})),d=new Map(i.map((h,f)=>[h.meterId,f])),p=new Map,y=new Set;for(const h of e.items)h.startedAt&&y.add(h.startedAt);const w=new Map;for(const h of e.items){const f=Math.max(0,Number(h.value)||0);w.set(h.startedAt,(w.get(h.startedAt)??0)+f)}for(const h of s){const f=new Map;for(const $ of h.items??[]){const E=Math.max(0,Number($.value)||0);f.set($.startedAt,(f.get($.startedAt)??0)+E),$.startedAt&&y.add($.startedAt)}p.set(h.meter_id,f)}const b=Ba(i);for(const h of[...y].sort()){let f=Math.max(0,w.get(h)??0);for(const $ of b){const E=$.map(L=>{var F;return Math.max(0,((F=p.get(L.meterId))==null?void 0:F.get(h))??0)}),D=E.reduce((L,F)=>L+F,0);if(D<=0)continue;const K=Math.min(f,D);$.forEach((L,F)=>{const I=d.get(L.meterId);if(I==null)return;const H=E[F],N=K*(H/D);i[I].producedKwh+=H*.25,i[I].selfConsumedKwh+=N*.25,i[I].exportedKwh+=Math.max(0,H-N)*.25}),f=Math.max(0,f-K)}}const l=i.reduce((h,f)=>h+f.selfConsumedKwh,0),g=i.reduce((h,f)=>h+f.exportedKwh,0),m=ja(i,a,n),S=m.selfConsumedKwh,k=m.exportedKwh,_=l>0?S/l:1,C=g>0?k/g:1;for(const h of i)h.selfConsumedKwh*=_,h.exportedKwh*=C,h.revenue=h.exportedKwh*h.rate,h.exportEquivalentForSelfUse=h.selfConsumedKwh*h.rate;const M=i.reduce((h,f)=>h+f.revenue,0),c=i.reduce((h,f)=>h+f.exportEquivalentForSelfUse,0),v=k>0?M/k:0;return{meters:i,totalFeedInRevenue:M,totalSelfUseExportEquivalent:c,weightedExportRate:v,usedPriorityAllocation:!0,allocationMode:Oa(o)}}function Ua(t,e,s={}){const a=s.roundTripEfficiency??.9,n=s.usableFraction??.9,o=Math.sqrt(Math.max(0,Math.min(1,a))),r=Math.max(0,e*n);let i=0,d=0,p=0,y=0,w=0,b=0;for(const l of t){const g=Math.max(0,l.exportKwh),m=Math.max(0,l.gridKwh);if(b+=m,g>0&&i<r){const S=(r-i)/o,k=Math.min(g,S);i+=k*o,p+=k,w+=k*l.feedInRate}if(m>0&&i>0){const S=Math.min(m,i*o);i-=S/o,d+=S,y+=S*l.importRate}}return{capacityKwh:e,selfConsumedKwh:d,storedKwh:p,importSavings:y,lostExportRevenue:w,netBenefit:y-w,equivalentCycles:r>0?p*o/r:0,gridImportCoveredPct:b>0?d/b*100:0}}function qa(t,e=.05){const s=t.filter(n=>Number.isFinite(n)&&n>=0).sort((n,o)=>n-o);if(s.length===0)return 0;const a=Math.max(0,Math.min(s.length-1,Math.floor(s.length*e)));return s[a]}function Lt(t,e){return!Number.isFinite(e)||e<=0?0:t*365/e}const Kt=[{id:"overview",label:"Overview",blurb:"Headline numbers and what stood out this period"},{id:"patterns",label:"Patterns",blurb:"When you use energy, across the day and the week"},{id:"solar",label:"Solar & Battery",blurb:"How much of your own solar you keep, and what storage would add"},{id:"costs",label:"Costs",blurb:"What the period cost, and where the money moved"},{id:"peaks",label:"Peaks",blurb:"Reference power, exceedance and the intervals that caused it"}],Ya=[5,10,15],fs=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],Te={house:"Total Usage",grid:"Net Grid",solar:"Solar Production",exceedance_kwh:"Exceedance kWh",exceedance_frequency:"Exceedance Rate"},qe={house:"Total Usage",grid:"Net Grid",solar:"Solar Production"},_e={previous:"Previous Period",last_year:"Last Year"};function za(t){const e=new Date(t),s=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${s}-${a}-${n}`}function Za(t){const[e,s,a]=t.split("-").map(Number);return new Date(e,s-1,a,12,0,0,0)}function te(t,e=0){return t.length?Math.max(...t):e}function Nt(t,e=0){return t.length?Math.min(...t):e}function se(t,e,s){return Math.min(s,Math.max(e,t))}function B(t,e){if(!t.length)return 0;const s=[...t].sort((d,p)=>d-p),a=se(e,0,1),n=(s.length-1)*a,o=Math.floor(n),r=Math.ceil(n);if(o===r)return s[o];const i=n-o;return s[o]*(1-i)+s[r]*i}function Xa(t){const e=Math.floor(t/4),s=t%4*15;return`${String(e).padStart(2,"0")}:${String(s).padStart(2,"0")}`}function P(t,e){return`${u(t,2)} ${e}`}function st(t,e){return`${t>0?"+":t<0?"-":""}${u(Math.abs(t),2)} ${e}`}function Ye(t,e=1){return Math.abs(t)<.005?"0":`${t>0?"+":""}${u(t,e)}`}function vs(t){const[e,s]=t.split(":").map(a=>parseInt(a,10)||0);return e*60+s}function Ja(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function js(t,e,s,a){if(!Ja(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),o=vs(s),r=vs(a);return o===r?!0:o<r?n>=o&&n<r:n>=o||n<r}function Qa(t,e){return e.find(s=>js(t,s.day_group,s.start_time,s.end_time))}function er(t,e){return e.find(s=>js(t,s.day_group,s.start_time,s.end_time))}function Gs(t,e,s,a,n){const o=Ht(t,e,s,a,n);if(o&&o.weightedExportRate>0)return o.weightedExportRate;const r=It(t).map(i=>i.rate).filter(i=>Number.isFinite(i)&&i>=0);return r.length?r.reduce((i,d)=>i+d,0)/r.length:t.feed_in_tariff??0}function tr(t,e,s,a,n,o){const r=n.consumption_rate_windows??[],i=n.reference_power_windows??[],d=n.reference_power_kw??0,p=(n.exceedance_rate??0)*(1+(n.vat_rate??0));return Na(t,e,{gridImport:s,marketExport:a}).map(y=>{var f,$;const w=y.timestamp,b=new Date(w),l=y.consumptionKw,g=y.productionKw,m=y.solarToHomeKw,S=y.gridImportKw,k=y.solarExportKw,_=((f=er(b,i))==null?void 0:f.reference_power_kw)??d,C=Math.max(0,l-_),M=Math.max(0,S-_),c=Math.max(0,C-M),h=(((($=Qa(b,r))==null?void 0:$.rate)??n.energy_variable_rate??0)+(n.network_variable_rate??0)+(n.electricity_tax_rate??0)+(n.compensation_fund_rate??0))*(1+(n.vat_rate??0));return{timestamp:w,iso:y.iso,date:b,houseKw:l,solarKw:g,solarToHomeKw:m,gridKw:S,exportKw:k,referenceKw:_,overKw:M,avoidedOverKw:c,importRateWithVat:h,feedInRate:o,exceedanceRateWithVat:p}})}function Os(t,e,s,a,n,o){const r=tr(t,e,s,a,n,o),i=new Map,d=Array.from({length:24},()=>0),p=Array.from({length:24},(c,v)=>({label:`${String(v).padStart(2,"0")}:00`,importCost:0,exportSpreadValue:0,gridKwh:0,exportKwh:0})),y={house:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),grid:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),solar:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_kwh:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_frequency:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0})))},w=()=>Array.from({length:96},()=>[]),b={house:{weekday:w(),weekend:w()},grid:{weekday:w(),weekend:w()},solar:{weekday:w(),weekend:w()}},l={houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0};for(const c of r){const h=za(c.timestamp),f=i.get(h)??(()=>{const ae=Za(h);return{key:h,label:ae.toLocaleDateString(void 0,{month:"short",day:"numeric"}),fullDate:ae.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0}})(),$=c.houseKw*.25,E=c.solarKw*.25,D=c.solarToHomeKw*.25,K=c.gridKw*.25,L=c.exportKw*.25,F=c.overKw*.25,I=c.avoidedOverKw*.25,H=K*c.importRateWithVat,N=D*c.importRateWithVat,Q=L*c.feedInRate,pe=D*(c.importRateWithVat-c.feedInRate),ie=F*c.exceedanceRateWithVat,le=I*c.exceedanceRateWithVat,he=N+Q+le-H-ie;f.houseKwh+=$,f.solarKwh+=E,f.solarToHomeKwh+=D,f.gridKwh+=K,f.exportKwh+=L,f.exceedanceKwh+=F,f.avoidedExceedanceKwh+=I,f.importCost+=H,f.solarSavings+=N,f.exportRevenue+=Q,f.selfConsumptionAdvantage+=pe,f.exceedanceCost+=ie,f.avoidedExceedanceValue+=le,f.netValue+=he,f.peakGridKw=Math.max(f.peakGridKw,c.gridKw),f.peakHouseKw=Math.max(f.peakHouseKw,c.houseKw),f.exceedanceIntervals+=c.overKw>0?1:0,i.set(h,f),l.houseKwh+=$,l.solarKwh+=E,l.solarToHomeKwh+=D,l.gridKwh+=K,l.exportKwh+=L,l.exceedanceKwh+=F,l.avoidedExceedanceKwh+=I,l.importCost+=H,l.solarSavings+=N,l.exportRevenue+=Q,l.selfConsumptionAdvantage+=pe,l.exceedanceCost+=ie,l.avoidedExceedanceValue+=le,l.netValue+=he,l.peakGridKw=Math.max(l.peakGridKw,c.gridKw),l.peakHouseKw=Math.max(l.peakHouseKw,c.houseKw),l.exceedanceIntervals+=c.overKw>0?1:0;const q=(c.date.getDay()+6)%7,V=c.date.getHours(),ee=V*4+Math.floor(c.date.getMinutes()/15),U=c.date.getDay()===0||c.date.getDay()===6?"weekend":"weekday";y.house[q][V].sum+=c.houseKw,y.house[q][V].count+=1,y.grid[q][V].sum+=c.gridKw,y.grid[q][V].count+=1,y.solar[q][V].sum+=c.solarKw,y.solar[q][V].count+=1,y.exceedance_kwh[q][V].sum+=F,y.exceedance_kwh[q][V].count+=1,y.exceedance_frequency[q][V].sum+=c.overKw>0?1:0,y.exceedance_frequency[q][V].count+=1,d[V]+=F,b.house[U][ee].push(c.houseKw),b.grid[U][ee].push(c.gridKw),b.solar[U][ee].push(c.solarKw),p[V].importCost+=H,p[V].exportSpreadValue+=L*Math.max(c.importRateWithVat-c.feedInRate,0),p[V].gridKwh+=K,p[V].exportKwh+=L}const g=[...i.values()].sort((c,v)=>c.key.localeCompare(v.key)).map(c=>(c.coveragePct=c.houseKwh>0?c.solarToHomeKwh/c.houseKwh*100:0,c.selfConsumedPct=c.solarKwh>0?se(c.solarToHomeKwh/c.solarKwh*100,0,100):0,c.solarValue=c.solarSavings+c.exportRevenue+c.avoidedExceedanceValue,c));l.coveragePct=l.houseKwh>0?l.solarToHomeKwh/l.houseKwh*100:0,l.selfConsumedPct=l.solarKwh>0?se(l.solarToHomeKwh/l.solarKwh*100,0,100):0,l.solarValue=l.solarSavings+l.exportRevenue+l.avoidedExceedanceValue;const m={house:y.house.map(c=>c.map(v=>v.count?v.sum/v.count:0)),grid:y.grid.map(c=>c.map(v=>v.count?v.sum/v.count:0)),solar:y.solar.map(c=>c.map(v=>v.count?v.sum/v.count:0)),exceedance_kwh:y.exceedance_kwh.map(c=>c.map(v=>v.sum)),exceedance_frequency:y.exceedance_frequency.map(c=>c.map(v=>v.count?v.sum/v.count*100:0))},S=Array.from({length:96},(c,v)=>Xa(v)),k={house:{weekday:{lower:b.house.weekday.map(c=>B(c,.1)),median:b.house.weekday.map(c=>B(c,.5)),upper:b.house.weekday.map(c=>B(c,.9))},weekend:{lower:b.house.weekend.map(c=>B(c,.1)),median:b.house.weekend.map(c=>B(c,.5)),upper:b.house.weekend.map(c=>B(c,.9))}},grid:{weekday:{lower:b.grid.weekday.map(c=>B(c,.1)),median:b.grid.weekday.map(c=>B(c,.5)),upper:b.grid.weekday.map(c=>B(c,.9))},weekend:{lower:b.grid.weekend.map(c=>B(c,.1)),median:b.grid.weekend.map(c=>B(c,.5)),upper:b.grid.weekend.map(c=>B(c,.9))}},solar:{weekday:{lower:b.solar.weekday.map(c=>B(c,.1)),median:b.solar.weekday.map(c=>B(c,.5)),upper:b.solar.weekday.map(c=>B(c,.9))},weekend:{lower:b.solar.weekend.map(c=>B(c,.1)),median:b.solar.weekend.map(c=>B(c,.5)),upper:b.solar.weekend.map(c=>B(c,.9))}}},_=r.filter(c=>c.overKw>0).sort((c,v)=>v.overKw-c.overKw||v.timestamp-c.timestamp).slice(0,8),C=[...r].sort((c,v)=>v.houseKw-c.houseKw||v.timestamp-c.timestamp).slice(0,8),M=[...g].filter(c=>c.exceedanceKwh>0).sort((c,v)=>v.exceedanceKwh-c.exceedanceKwh).slice(0,6);return{points:r,daily:g,totals:l,topExceedances:_,peakIntervals:C,hourlyExceedanceKwh:d,heatmapValues:m,intradayProfiles:k,intradayLabels:S,hourlyOpportunity:p,loadDurationGrossKw:r.map(c=>c.houseKw).sort((c,v)=>v-c),loadDurationNetKw:r.map(c=>c.gridKw).sort((c,v)=>v-c),worstDays:M}}function sr(t){var e,s,a;return(e=t.rangeData)!=null&&e.start&&((s=t.rangeData)!=null&&s.end)?`${de(t.rangeData.start)} - ${de(t.rangeData.end)}`:((a=Rt.find(n=>n.id===t.range))==null?void 0:a.label)??"Selected Period"}function ar(t){var e,s;return(e=t.rangeData)!=null&&e.start&&((s=t.rangeData)!=null&&s.end)?`${Qe(t.rangeData.start)} - ${Qe(t.rangeData.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${t.customStart} - ${t.customEnd}`:"Based on the currently selected range."}function ws(t){const e=t.analysisComparisonMode==="last_year"?"Same period last year":"Previous matched period";return t.analysisComparison?`${e}: ${Qe(t.analysisComparison.start)} - ${Qe(t.analysisComparison.end)}`:e}function rr(t){switch(t){case"house":return{description:"Average hourly power by weekday for total house usage.",note:"Each cell shows the average kW seen in that weekday/hour slot over the selected period."};case"grid":return{description:"Average hourly power by weekday for remaining grid draw after solar.",note:"Each cell shows the average net-grid kW seen in that weekday/hour slot over the selected period."};case"solar":return{description:"Average hourly power by weekday for solar production.",note:"Each cell shows the average solar kW seen in that weekday/hour slot over the selected period."};case"exceedance_kwh":return{description:"Cumulative exceedance energy by weekday and hour, showing where the reference limit hurt the most.",note:"Each cell shows cumulative exceedance kWh recorded in that weekday/hour slot over the selected period."};case"exceedance_frequency":return{description:"How often each weekday/hour slot went over the reference limit.",note:"Each cell shows the share of 15-minute intervals in that weekday/hour slot that exceeded the reference limit."}}}function nr(t,e){switch(t){case"house":case"grid":case"solar":return`${u(e,2)} kW average`;case"exceedance_kwh":return`${u(e,2)} kWh`;case"exceedance_frequency":return`${u(e,0)}% of intervals`}}function oe(t){const e=t.series.filter(h=>h.values.length>0);if(!e.length)return'<div class="analysis-empty">No chart data available for this period.</div>';const s=Math.max(...e.map(h=>h.values.length)),a=Math.max(720,s*24+92),n=244,o=50,r=20,i=18,d=30,p=e.flatMap(h=>h.values);t.referenceValue!=null&&p.push(t.referenceValue);let y=t.minValue??Nt(p,0),w=t.maxValue??te(p,1);y===w&&(w+=1,y=Math.min(0,y-1)),t.minValue==null&&(y=Math.min(0,y));const b=a-o-r,l=n-i-d,g=(h,f)=>f<=1?o+b/2:o+h*b/(f-1),m=h=>i+(w-h)/(w-y)*l,S=t.valueFormatter??(h=>u(h,1)),k=Array.from({length:4},(h,f)=>y+(w-y)/3*f),_=[0,Math.floor((s-1)/2),s-1].filter((h,f,$)=>$.indexOf(h)===f),C=k.map(h=>{const f=m(h);return`
      <line x1="${o}" y1="${f.toFixed(1)}" x2="${(a-r).toFixed(1)}" y2="${f.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(f+4).toFixed(1)}" class="analysis-svg-tick">${S(h)}</text>
    `}).join(""),M=t.referenceValue!=null?(()=>{const h=m(t.referenceValue);return`
        <line x1="${o}" y1="${h.toFixed(1)}" x2="${(a-r).toFixed(1)}" y2="${h.toFixed(1)}" class="analysis-svg-reference" />
        ${t.referenceLabel?`<text x="${a-r}" y="${(h-8).toFixed(1)}" class="analysis-svg-reference-label">${t.referenceLabel}</text>`:""}
      `})():"",c=e.map(h=>{const f=h.values.map((E,D)=>{const K=g(D,h.values.length),L=m(E);return`${D===0?"M":"L"} ${K.toFixed(1)} ${L.toFixed(1)}`}).join(" "),$=h.values.length<=40?h.values.map((E,D)=>{const K=g(D,h.values.length),L=m(E);return`<circle cx="${K.toFixed(1)}" cy="${L.toFixed(1)}" r="2.6" fill="${h.color}" />`}).join(""):"";return`
      <path d="${f}" fill="none" stroke="${h.color}" stroke-width="2.5" ${h.dashed?'stroke-dasharray="6 4"':""} />
      ${$}
    `}).join(""),v=_.map(h=>{const f=g(h,s),$=t.labels[h]??`Point ${h+1}`;return`<text x="${f.toFixed(1)}" y="${n-8}" text-anchor="middle" class="analysis-svg-x-label">${$}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${a}" height="${n}" viewBox="0 0 ${a} ${n}" role="img" aria-label="${t.title??"Line chart"}">
        ${C}
        ${M}
        ${c}
        ${v}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      ${e.map(h=>`
        <span class="analysis-legend-item">
          <span class="analysis-legend-swatch" style="background:${h.color};"></span>
          <span>${h.label}</span>
        </span>
      `).join("")}
      ${t.referenceLabel?`
          <span class="analysis-legend-item">
            <span class="analysis-legend-swatch analysis-legend-swatch-dashed"></span>
            <span>${t.referenceLabel}</span>
          </span>
        `:""}
    </div>
  `}function or(t){const e=t.series.filter(v=>v.band.median.length>0);if(!e.length)return'<div class="analysis-empty">No profile data available for this period.</div>';const s=Math.max(...e.map(v=>v.band.median.length)),a=Math.max(760,s*12+92),n=248,o=50,r=20,i=18,d=30,p=e.flatMap(v=>[...v.band.lower,...v.band.median,...v.band.upper]),y=Math.min(0,Nt(p,0));let w=te(p,1);w<=y&&(w=y+1);const b=a-o-r,l=n-i-d,g=(v,h)=>h<=1?o+b/2:o+v*b/(h-1),m=v=>i+(w-v)/(w-y)*l,S=t.valueFormatter??(v=>u(v,1)),k=Array.from({length:4},(v,h)=>y+(w-y)/3*h),_=[0,16,32,48,64,80,s-1].filter((v,h,f)=>v>=0&&v<s&&f.indexOf(v)===h),C=k.map(v=>{const h=m(v);return`
      <line x1="${o}" y1="${h.toFixed(1)}" x2="${(a-r).toFixed(1)}" y2="${h.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(h+4).toFixed(1)}" class="analysis-svg-tick">${S(v)}</text>
    `}).join(""),M=e.map(v=>{const h=v.band.upper.map((E,D)=>{const K=g(D,v.band.upper.length),L=m(E);return`${D===0?"M":"L"} ${K.toFixed(1)} ${L.toFixed(1)}`}).join(" "),f=[...v.band.lower].reverse().map((E,D)=>{const K=v.band.lower.length-1-D,L=g(K,v.band.lower.length),F=m(E);return`L ${L.toFixed(1)} ${F.toFixed(1)}`}).join(" "),$=v.band.median.map((E,D)=>{const K=g(D,v.band.median.length),L=m(E);return`${D===0?"M":"L"} ${K.toFixed(1)} ${L.toFixed(1)}`}).join(" ");return`
      <path d="${h} ${f} Z" fill="${v.fill}" stroke="none" />
      <path d="${$}" fill="none" stroke="${v.color}" stroke-width="2.4" ${v.dashed?'stroke-dasharray="6 4"':""} />
    `}).join(""),c=_.map(v=>{const h=g(v,s),f=t.labels[v]??`Point ${v+1}`;return`<text x="${h.toFixed(1)}" y="${n-8}" text-anchor="middle" class="analysis-svg-x-label">${f}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${a}" height="${n}" viewBox="0 0 ${a} ${n}" role="img" aria-label="${t.title??"Band chart"}">
        ${C}
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
  `}function ir(t){const e=new Date(t.timestamp);return{date:e.toLocaleDateString(void 0,{month:"short",day:"numeric"}),time:e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}}function lr(t){if(!t.length)return'<div class="analysis-empty">No peak intervals available for this period.</div>';const e=Math.max(760,t.length*86+96),s=276,a=52,n=16,o=18,r=54,i=te(t.map(m=>m.houseKw),1),d=e-a-n,p=s-o-r,y=o+p,w=d/t.length,b=Math.max(22,Math.min(38,w*.54)),l=t.map((m,S)=>{const k=a+S*w+(w-b)/2,_=m.solarToHomeKw/i*p,M=Math.max(0,Math.min(m.gridKw,m.referenceKw))/i*p,c=Math.max(0,m.gridKw-m.referenceKw)/i*p;return`
      <g>
        <rect x="${k.toFixed(1)}" y="${(y-_).toFixed(1)}" width="${b.toFixed(1)}" height="${_.toFixed(1)}" rx="4" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${k.toFixed(1)}" y="${(y-_-M).toFixed(1)}" width="${b.toFixed(1)}" height="${M.toFixed(1)}" rx="4" fill="rgba(248, 81, 73, 0.62)" />
        ${c>0?`<rect x="${k.toFixed(1)}" y="${(y-_-M-c).toFixed(1)}" width="${b.toFixed(1)}" height="${c.toFixed(1)}" rx="4" fill="rgba(210, 153, 34, 0.92)" />`:""}
      </g>
    `}).join(""),g=t.map((m,S)=>{const k=a+S*w+w/2,{date:_,time:C}=ir(m);return`
      <text x="${k.toFixed(1)}" y="${s-20}" text-anchor="middle" class="analysis-svg-x-label">
        <tspan x="${k.toFixed(1)}" dy="0">${_}</tspan>
        <tspan x="${k.toFixed(1)}" dy="12">${C}</tspan>
      </text>
    `}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${s}" viewBox="0 0 ${e} ${s}" role="img" aria-label="Peak interval anatomy">
        <line x1="${a}" y1="${y.toFixed(1)}" x2="${(e-n).toFixed(1)}" y2="${y.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${a-8}" y="${(o+4).toFixed(1)}" class="analysis-svg-tick">${u(i,1)} kW</text>
        ${l}
        ${g}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.62);"></span><span>Grid within reference</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(210, 153, 34, 0.92);"></span><span>Grid over reference</span></span>
    </div>
  `}function dr(t){if(!t.length)return'<div class="analysis-empty">No daily energy data available.</div>';const e=Math.max(760,t.length*28+84),s=250,a=52,n=16,o=18,r=34,i=te(t.map(C=>C.houseKwh),1),d=te(t.map(C=>C.exportKwh),0),p=e-a-n,y=s-o-r,w=d>0?y*.72:y,b=d>0?y-w:0,l=o+w,g=p/t.length,m=Math.max(8,Math.min(18,g*.62)),S=Math.max(1,Math.ceil(t.length/10)),k=t.map((C,M)=>{const c=a+M*g+(g-m)/2,v=C.solarToHomeKwh/i*w,h=C.gridKwh/i*w,f=d>0?C.exportKwh/d*b:0,$=l-v-h-8;return`
      <g>
        <rect x="${c.toFixed(1)}" y="${(l-v).toFixed(1)}" width="${m.toFixed(1)}" height="${v.toFixed(1)}" rx="3" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${c.toFixed(1)}" y="${(l-v-h).toFixed(1)}" width="${m.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="rgba(248, 81, 73, 0.55)" />
        ${f>0?`<rect x="${c.toFixed(1)}" y="${l.toFixed(1)}" width="${m.toFixed(1)}" height="${f.toFixed(1)}" rx="3" fill="rgba(88, 166, 255, 0.75)" />`:""}
        ${C.exceedanceKwh>0?`<circle cx="${(c+m/2).toFixed(1)}" cy="${$.toFixed(1)}" r="3.2" fill="#d29922" />`:""}
      </g>
    `}).join(""),_=t.map((C,M)=>M%S!==0&&M!==t.length-1?"":`<text x="${(a+M*g+g/2).toFixed(1)}" y="${s-10}" text-anchor="middle" class="analysis-svg-x-label">${C.label}</text>`).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${s}" viewBox="0 0 ${e} ${s}" role="img" aria-label="Daily energy breakdown">
        <line x1="${a}" y1="${l.toFixed(1)}" x2="${(e-n).toFixed(1)}" y2="${l.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${a-8}" y="${(o+4).toFixed(1)}" class="analysis-svg-tick">${u(i,0)} kWh</text>
        ${d>0?`<text x="${a-8}" y="${(s-r+4).toFixed(1)}" class="analysis-svg-tick">-${u(d,0)} kWh</text>`:""}
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
  `}function cr(t,e){const s=se(e,0,1);return t==="solar"?`rgba(63, 185, 80, ${.12+s*.82})`:t==="exceedance_kwh"||t==="exceedance_frequency"?`rgba(210, 153, 34, ${.14+s*.82})`:t==="grid"?`rgba(210, 153, 34, ${.12+s*.82})`:`rgba(248, 81, 73, ${.12+s*.82})`}function ur(t,e){const s=t.flat(),a=te(s,1),n=Nt(s,0);return`
    <div class="analysis-heatmap">
      <div class="analysis-heatmap-hours">
        <span class="analysis-heatmap-corner"></span>
        ${Array.from({length:24},(o,r)=>`
          <span class="analysis-heatmap-hour ${r%2===1?"analysis-heatmap-hour-faded":""}">${String(r).padStart(2,"0")}</span>
        `).join("")}
      </div>
      ${t.map((o,r)=>`
        <div class="analysis-heatmap-row">
          <span class="analysis-heatmap-day">${fs[r]}</span>
          ${o.map((i,d)=>{const p=a===n?0:(i-n)/(a-n);return`
              <span
                class="analysis-heatmap-cell"
                style="background:${cr(e,p)};"
                title="${fs[r]} ${String(d).padStart(2,"0")}:00 - ${nr(e,i)}"
              >${i>(e==="exceedance_frequency"?1:.05)?u(i,e==="exceedance_frequency"?0:1):""}</span>
            `}).join("")}
        </div>
      `).join("")}
    </div>
  `}function at(t){const e=te(t.map(s=>s.value),1);return t.length?`
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
  `:'<div class="analysis-empty">No standout patterns in this period.</div>'}function pr(t,e,s){const a=s.communitySolarToHomeKwh>.01?`${u(s.totalSolarCoverageKwh)} kWh of ${u(s.consumptionKwh)} kWh usage covered, incl. ${u(s.communitySolarToHomeKwh)} kWh shared`:`${u(s.totalSolarCoverageKwh)} kWh of ${u(s.consumptionKwh)} kWh usage covered`,n=(r,i)=>t.daily.length>2?kr(r,i):"",o=r=>`
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">${r.label}</span>
        <strong class="analysis-stat-value">${r.value}</strong>
        ${r.spark??""}
        <span class="analysis-stat-meta">${r.meta}</span>
      </div>
  `;return`
    <div class="analysis-stat-grid">
      ${o({label:"Solar Coverage",value:`${u(s.coveragePct,1)}%`,meta:a,spark:n(t.daily.map(r=>r.coveragePct),"var(--clr-production)")})}
      ${o({label:"Self-Consumed Solar",value:`${u(s.selfConsumedPct,1)}%`,meta:`${u(s.directSolarToHomeKwh)} kWh kept from your own solar, ${u(s.exportedKwh)} kWh exported`,spark:n(t.daily.map(r=>r.selfConsumedPct),"var(--clr-production)")})}
      ${o({label:"Total Solar Value",value:P(s.totalSolarValue,e),meta:"Savings plus export revenue plus avoided exceedance charges",spark:n(t.daily.map(r=>r.solarValue),"var(--clr-production)")})}
      ${o({label:"Self-Use vs Export",value:st(s.selfConsumptionAdvantage,e),meta:`${u(s.directSolarToHomeKwh)} kWh kept on-site instead of exported`,spark:n(t.daily.map(r=>r.selfConsumptionAdvantage),"var(--clr-self)")})}
      ${o({label:"Peak Net Grid",value:`${u(t.totals.peakGridKw,2)} kW`,meta:`Compared with ${u(t.totals.peakHouseKw,2)} kW gross house load`,spark:n(t.daily.map(r=>r.peakGridKw),"var(--clr-consumption)")})}
      ${o({label:"Exceedance Intervals",value:u(t.totals.exceedanceIntervals,0),meta:`${u(t.totals.exceedanceKwh,2)} kWh above the reference limit`,spark:n(t.daily.map(r=>r.exceedanceIntervals),"var(--clr-warning)")})}
      ${o({label:"Variable Import Cost",value:P(s.variableImportCost,e),meta:`${u(s.billedGridImportKwh)} kWh billed from the grid during the selected period`,spark:n(t.daily.map(r=>r.importCost),"var(--clr-consumption)")})}
    </div>
  `}function hr(t){return`
    <div class="card analysis-card analysis-card-full">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Daily Breakdown</h3>
          <p class="analysis-card-copy">House usage is split into solar-covered energy, grid energy, and exported surplus. A gold marker flags days with any reference-power exceedance.</p>
        </div>
      </div>
      ${dr(t.daily)}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily exceedance volume</h4>
        ${oe({title:"Daily exceedance volume",series:[{label:"Exceedance",color:"#d29922",values:t.daily.map(e=>e.exceedanceKwh)}],labels:t.daily.map(e=>e.label),valueFormatter:e=>`${u(e,2)} kWh`})}
      </div>
    </div>
  `}function mr(t,e){const s=rr(t.analysisHeatmapMetric);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Consumption Pattern Heatmap</h3>
          <p class="analysis-card-copy">${s.description}</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${t.analysisHeatmapMetric==="house"?"active":""}" data-analysis-heatmap="house">${Te.house}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="grid"?"active":""}" data-analysis-heatmap="grid">${Te.grid}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="solar"?"active":""}" data-analysis-heatmap="solar">${Te.solar}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="exceedance_kwh"?"active":""}" data-analysis-heatmap="exceedance_kwh">${Te.exceedance_kwh}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="exceedance_frequency"?"active":""}" data-analysis-heatmap="exceedance_frequency">${Te.exceedance_frequency}</button>
        </div>
      </div>
      ${ur(e.heatmapValues[t.analysisHeatmapMetric],t.analysisHeatmapMetric)}
      <p class="analysis-note">${s.note}</p>
    </div>
  `}function gr(t,e){const s=t.analysisProfileMetric,a=e.intradayProfiles[s],n=qe[s],o=a.weekday.median.reduce((i,d,p,y)=>d>y[i]?p:i,0),r=a.weekend.median.reduce((i,d,p,y)=>d>y[i]?p:i,0);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Intraday Profile</h3>
          <p class="analysis-card-copy">A typical day view for ${n.toLowerCase()}, split between weekdays and weekends. The band shows the p10 to p90 range and the line is the median interval.</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${s==="house"?"active":""}" data-analysis-profile="house">${qe.house}</button>
          <button class="unit-btn ${s==="grid"?"active":""}" data-analysis-profile="grid">${qe.grid}</button>
          <button class="unit-btn ${s==="solar"?"active":""}" data-analysis-profile="solar">${qe.solar}</button>
        </div>
      </div>
      <div class="analysis-inline-metrics">
        <div>
          <span class="analysis-inline-label">Weekday median peak</span>
          <strong>${u(a.weekday.median[o]??0,2)} kW</strong>
          <span class="analysis-stat-meta">${e.intradayLabels[o]??"n/a"}</span>
        </div>
        <div>
          <span class="analysis-inline-label">Weekend median peak</span>
          <strong>${u(a.weekend.median[r]??0,2)} kW</strong>
          <span class="analysis-stat-meta">${e.intradayLabels[r]??"n/a"}</span>
        </div>
      </div>
      ${or({title:`${n} intraday profile`,labels:e.intradayLabels,series:[{label:"Weekday median (p10-p90 band)",color:"#58a6ff",fill:"rgba(88, 166, 255, 0.14)",band:a.weekday},{label:"Weekend median (p10-p90 band)",color:"#d29922",fill:"rgba(210, 153, 34, 0.13)",band:a.weekend,dashed:!0}],valueFormatter:i=>`${u(i,1)} kW`})}
      <p class="analysis-note">This makes the typical daily rhythm much easier to read than the weekday/hour heatmap alone.</p>
    </div>
  `}function yr(t,e,s){const a=t.meters.reduce((o,r)=>o+r.selfConsumedKwh*e,0),n=a+t.totalFeedInRevenue;return`
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
                    <div class="analysis-stat-meta">${o.shortId} · ${Xe(o.selfUsePriority)}</div>
                  </td>
                  <td>${u(o.rate,4)} ${s}/kWh</td>
                  <td>${u(o.producedKwh)} kWh</td>
                  <td>${u(o.selfConsumedKwh)} kWh</td>
                  <td>${u(o.exportedKwh)} kWh</td>
                  <td>${P(r,s)}</td>
                  <td>${P(o.revenue,s)}</td>
                  <td>${P(i,s)}</td>
                </tr>
              `}).join("")}
            <tr>
              <td><strong>Portfolio subtotal</strong></td>
              <td></td>
              <td>${u(t.meters.reduce((o,r)=>o+r.producedKwh,0))} kWh</td>
              <td>${u(t.meters.reduce((o,r)=>o+r.selfConsumedKwh,0))} kWh</td>
              <td>${u(t.meters.reduce((o,r)=>o+r.exportedKwh,0))} kWh</td>
              <td>${P(a,s)}</td>
              <td>${P(t.totalFeedInRevenue,s)}</td>
              <td>${P(n,s)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="analysis-note">${Ns(t.allocationMode)}</p>
      <p class="analysis-note">This subtotal includes self-use savings and export revenue. Avoided exceedance value stays only in the overall solar total because it depends on aggregate site load, not a single solar system.</p>
    </div>
  `}function fr(t,e,s,a){const n=t.totals.solarKwh>0?se(t.totals.solarToHomeKwh/t.totals.solarKwh*100,0,100):0,o=t.totals.solarKwh>0?se(t.totals.exportKwh/t.totals.solarKwh*100,0,100):0;return`
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
          <strong>${P(t.totals.solarValue,e)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-use vs export</span>
          <strong>${st(t.totals.selfConsumptionAdvantage,e)}</strong>
        </div>
      </div>
      <div class="analysis-share-bar">
        <span class="analysis-share-segment analysis-share-segment-home" style="width:${n}%;"></span>
        <span class="analysis-share-segment analysis-share-segment-export" style="width:${o}%;"></span>
      </div>
      <div class="analysis-share-legend">
        <span><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span>Self-consumed: ${u(t.totals.solarToHomeKwh)} kWh</span>
        <span><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span>Exported: ${u(t.totals.exportKwh)} kWh</span>
      </div>
      ${s!=null&&s.meters.length?yr(s,a,e):""}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Coverage of house usage by day</h4>
        ${oe({title:"Daily solar coverage",series:[{label:"Coverage",color:"#3fb950",values:t.daily.map(r=>r.coveragePct)}],labels:t.daily.map(r=>r.label),maxValue:100,minValue:0,valueFormatter:r=>`${u(r,0)}%`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day</h4>
        ${oe({title:"Daily solar value",series:[{label:"Solar value",color:"#58a6ff",values:t.daily.map(r=>r.solarValue)}],labels:t.daily.map(r=>r.label),valueFormatter:r=>P(r,e)})}
      </div>
    </div>
  `}function vr(t,e){const s=[...t.hourlyOpportunity].sort((r,i)=>i.importCost-r.importCost)[0],a=[...t.hourlyOpportunity].sort((r,i)=>i.exportSpreadValue-r.exportSpreadValue)[0],n=[...t.hourlyOpportunity].filter(r=>r.importCost>0).sort((r,i)=>i.importCost-r.importCost).slice(0,5).map(r=>({label:r.label,value:r.importCost,meta:`${P(r.importCost,e)} from ${u(r.gridKwh,1)} kWh`})),o=[...t.hourlyOpportunity].filter(r=>r.exportSpreadValue>0).sort((r,i)=>i.exportSpreadValue-r.exportSpreadValue).slice(0,5).map(r=>({label:r.label,value:r.exportSpreadValue,meta:`${P(r.exportSpreadValue,e)} on ${u(r.exportKwh,1)} kWh`,colorClass:"analysis-progress-fill-warn"}));return`
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
          <strong>${P(t.hourlyOpportunity.reduce((r,i)=>r+i.importCost,0),e)}</strong>
          <span class="analysis-stat-meta">Variable import cost grouped by hour of day</span>
        </div>
        <div>
          <span class="analysis-inline-label">Export spread opportunity</span>
          <strong>${P(t.hourlyOpportunity.reduce((r,i)=>r+i.exportSpreadValue,0),e)}</strong>
          <span class="analysis-stat-meta">Approximate value gap between export and local use</span>
        </div>
        <div>
          <span class="analysis-inline-label">Hardest import hour</span>
          <strong>${(s==null?void 0:s.label)??"n/a"}</strong>
          <span class="analysis-stat-meta">${s?P(s.importCost,e):"No import cost recorded"}</span>
        </div>
        <div>
          <span class="analysis-inline-label">Best storage hour</span>
          <strong>${(a==null?void 0:a.label)??"n/a"}</strong>
          <span class="analysis-stat-meta">${a?P(a.exportSpreadValue,e):"No export spread recorded"}</span>
        </div>
      </div>
      ${oe({title:"Hourly tariff opportunity",series:[{label:"Import cost pressure",color:"#f85149",values:t.hourlyOpportunity.map(r=>r.importCost)},{label:"Export spread opportunity",color:"#58a6ff",values:t.hourlyOpportunity.map(r=>r.exportSpreadValue)}],labels:t.hourlyOpportunity.map(r=>r.label),valueFormatter:r=>P(r,e)})}
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Most expensive import hours</h4>
          ${at(n)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Best export-to-storage hours</h4>
          ${at(o)}
        </div>
      </div>
      <p class="analysis-note">Export spread opportunity uses the difference between the import rate and feed-in rate for exported energy in that hour, so it is a directional indicator rather than a billing line item.</p>
    </div>
  `}function wr(t,e){const s=t.hourlyExceedanceKwh.map((a,n)=>({label:`${String(n).padStart(2,"0")}:00`,value:a,meta:`${u(a,2)} kWh`,colorClass:"analysis-progress-fill-warn"})).filter(a=>a.value>0).sort((a,n)=>n.value-a.value).slice(0,6);return`
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
          <strong>${u(te(t.topExceedances.map(a=>a.overKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Exceedance cost</span>
          <strong>${P(t.totals.exceedanceCost,e)}</strong>
        </div>
      </div>
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Worst hours</h4>
          ${at(s)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Worst days</h4>
          ${at(t.worstDays.map(a=>({label:a.fullDate,value:a.exceedanceKwh,meta:`${u(a.exceedanceKwh,2)} kWh`,colorClass:"analysis-progress-fill-warn"})))}
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
                      <td>${Ps(a.iso)}</td>
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
  `}function $r(t){const e=t.peakIntervals.length?t.peakIntervals.reduce((s,a)=>s+(a.houseKw>0?a.solarToHomeKw/a.houseKw*100:0),0)/t.peakIntervals.length:0;return`
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
          <strong>${u(te(t.peakIntervals.map(s=>s.houseKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Highest net-grid peak</span>
          <strong>${u(te(t.peakIntervals.map(s=>s.gridKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Solar share across peaks</span>
          <strong>${u(e,0)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Intervals over reference</span>
          <strong>${u(t.peakIntervals.filter(s=>s.overKw>0).length,0)} / ${u(t.peakIntervals.length,0)}</strong>
        </div>
      </div>
      ${lr(t.peakIntervals)}
      <p class="analysis-note">A gold cap only appears when the grid portion of the interval exceeded the configured reference power.</p>
    </div>
  `}function br(t,e,s){var d,p;const a=e.analysisComparisonMode==="last_year"?"Last year":"Previous";if(e.analysisComparisonLoading)return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${ws(e)}</p>
          </div>
          <div class="chart-unit-toggle">
            <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${_e.previous}</button>
            <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${_e.last_year}</button>
          </div>
        </div>
        <div class="analysis-empty">Loading comparison period...</div>
      </div>
    `;if(!((d=e.analysisComparison)!=null&&d.consumptionTimeseries)||!((p=e.analysisComparison)!=null&&p.productionTimeseries))return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${e.analysisComparisonMode==="last_year"?"The same calendar period last year is shown here when enough history is available.":"A matched previous period is shown here when enough historic data is available."}</p>
          </div>
          <div class="chart-unit-toggle">
            <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${_e.previous}</button>
            <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${_e.last_year}</button>
          </div>
        </div>
        <div class="analysis-empty">Comparison data is unavailable for the selected range.</div>
      </div>
    `;const n=Gs(s,e.analysisComparison.consumptionTimeseries,null,void 0,void 0),o=Os(e.analysisComparison.consumptionTimeseries,e.analysisComparison.productionTimeseries,e.analysisComparison.gridImportTimeseries,e.analysisComparison.marketExportTimeseries,s,n),r=Math.max(t.daily.length,o.daily.length,1),i=Array.from({length:r},(y,w)=>`D${w+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Period Comparison</h3>
          <p class="analysis-card-copy">${ws(e)}</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${_e.previous}</button>
          <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${_e.last_year}</button>
        </div>
      </div>
      <div class="analysis-compare-grid">
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">House usage</span>
          <strong>${u(t.totals.houseKwh)} kWh</strong>
          <span class="analysis-compare-delta">${Ye(t.totals.houseKwh-o.totals.houseKwh)} kWh vs ${a.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Net grid usage</span>
          <strong>${u(t.totals.gridKwh)} kWh</strong>
          <span class="analysis-compare-delta">${Ye(t.totals.gridKwh-o.totals.gridKwh)} kWh vs ${a.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar coverage</span>
          <strong>${u(t.totals.coveragePct,1)}%</strong>
          <span class="analysis-compare-delta">${Ye(t.totals.coveragePct-o.totals.coveragePct)} pts vs ${a.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar value</span>
          <strong>${P(t.totals.solarValue,s.currency||"EUR")}</strong>
          <span class="analysis-compare-delta">${Ye(t.totals.solarValue-o.totals.solarValue,2)} ${s.currency||"EUR"} vs ${a.toLowerCase()}</span>
        </div>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Usage by day index</h4>
        ${oe({title:`Current versus ${a.toLowerCase()} usage`,series:[{label:"Current",color:"#f85149",values:t.daily.map(y=>y.houseKwh)},{label:a,color:"#58a6ff",values:o.daily.map(y=>y.houseKwh),dashed:!0}],labels:i,valueFormatter:y=>`${u(y,1)} kWh`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day index</h4>
        ${oe({title:`Current versus ${a.toLowerCase()} solar value`,series:[{label:"Current",color:"#3fb950",values:t.daily.map(y=>y.solarValue)},{label:a,color:"#d29922",values:o.daily.map(y=>y.solarValue),dashed:!0}],labels:i,valueFormatter:y=>P(y,s.currency||"EUR")})}
      </div>
    </div>
  `}function _r(t,e){return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Tariff-Aware Cost Trends</h3>
          <p class="analysis-card-copy">Estimated variable import cost, solar savings, export earnings, and exceedance cost by day. Fixed monthly fees are intentionally left out so this stays behavior-driven.</p>
        </div>
      </div>
      ${oe({title:"Daily cost and value trends",series:[{label:"Import cost",color:"#f85149",values:t.daily.map(s=>s.importCost)},{label:"Solar savings",color:"#3fb950",values:t.daily.map(s=>s.solarSavings)},{label:"Export earnings",color:"#58a6ff",values:t.daily.map(s=>s.exportRevenue)},{label:"Exceedance cost",color:"#d29922",values:t.daily.map(s=>s.exceedanceCost)}],labels:t.daily.map(s=>s.label),valueFormatter:s=>P(s,e)})}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily net energy value</h4>
        ${oe({title:"Daily net energy value",series:[{label:"Net value",color:"#39c5cf",values:t.daily.map(s=>s.netValue)}],labels:t.daily.map(s=>s.label),referenceValue:0,referenceLabel:"Break-even",valueFormatter:s=>st(s,e)})}
      </div>
      <div class="analysis-cost-totals">
        <span>Import cost: <strong>${P(t.totals.importCost,e)}</strong></span>
        <span>Solar savings: <strong>${P(t.totals.solarSavings,e)}</strong></span>
        <span>Export earnings: <strong>${P(t.totals.exportRevenue,e)}</strong></span>
        <span>Exceedance cost: <strong>${P(t.totals.exceedanceCost,e)}</strong></span>
        <span>Net value: <strong>${st(t.totals.netValue,e)}</strong></span>
      </div>
    </div>
  `}function xr(t,e){const s=Array.from({length:Math.max(t.loadDurationGrossKw.length,t.loadDurationNetKw.length,1)},(a,n)=>`${n+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Load Duration Curve</h3>
          <p class="analysis-card-copy">Gross house load and net grid load sorted from highest to lowest interval. This shows how often high demand really occurs and how much solar trims the top end.</p>
        </div>
      </div>
      ${oe({title:"Load duration curve",series:[{label:"Gross house load",color:"#f85149",values:t.loadDurationGrossKw},{label:"Net grid load",color:"#58a6ff",values:t.loadDurationNetKw}],labels:s,referenceValue:e>0?e:void 0,referenceLabel:e>0?`Reference ${u(e,1)} kW`:void 0,valueFormatter:a=>`${u(a,1)} kW`})}
      <p class="analysis-note">Intervals are ordered from highest demand to lowest, so the left side is your hardest-to-handle load.</p>
    </div>
  `}function kr(t,e){const s=t.filter(w=>Number.isFinite(w));if(s.length<2)return"";const a=100,n=26,o=Math.min(...s),i=Math.max(...s)-o||1,d=a/(s.length-1),p=s.map((w,b)=>{const l=b*d,g=n-(w-o)/i*(n-4)-2;return`${l.toFixed(1)},${g.toFixed(1)}`}),y=p[p.length-1].split(",");return`
    <svg class="stat-sparkline" viewBox="0 0 ${a} ${n}" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="${p.join(" ")}" fill="none" stroke="${e}" stroke-width="1.6"
        stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
      <circle cx="${y[0]}" cy="${y[1]}" r="2" fill="${e}" vector-effect="non-scaling-stroke" />
    </svg>
  `}function Sr(t,e,s,a,n,o){const r=[],{totals:i,daily:d,hourlyOpportunity:p}=t,y=d.reduce((b,l)=>!b||l.importCost>b.importCost?l:b,null);if(y&&y.importCost>0&&d.length>1){const b=i.importCost>0?y.importCost/i.importCost*100:0;r.push({tone:"info",title:"Most expensive day",body:`${y.fullDate} cost ${P(y.importCost,s)} in grid energy — ${u(b,0)}% of the period's total, on ${u(y.gridKwh)} kWh imported.`})}if(a>.01){const b=a*24,l=i.houseKwh>0?b*o/i.houseKwh*100:0,g=Lt(b*o*(i.importCost/Math.max(i.gridKwh,.001)),o);r.push({tone:l>50?"warn":"info",title:"Always-on baseload",body:`Your load never drops below ${u(a,2)} kW — about ${u(b)} kWh a day, ${u(l,0)}% of everything you used. Priced at this period's average import rate, that standing load is roughly ${P(g,s)} a year if all of it came from the grid.`})}if(i.exceedanceIntervals>0){const b=t.hourlyExceedanceKwh.indexOf(Math.max(...t.hourlyExceedanceKwh));r.push({tone:"warn",title:"Reference power exceeded",body:`${u(i.exceedanceIntervals,0)} interval${i.exceedanceIntervals===1?"":"s"} went over your reference limit, costing ${P(i.exceedanceCost,s)}. Most of it happened around ${String(b).padStart(2,"0")}:00.`})}else i.peakGridKw>0&&r.push({tone:"good",title:"Stayed under the reference limit",body:`Your highest net grid draw was ${u(i.peakGridKw,2)} kW and never crossed the reference power, so no exceedance charge applied.`});e.exportedKwh>.5&&r.push({tone:e.selfConsumedPct>=50?"good":"info",title:"Solar kept at home",body:`You used ${u(e.selfConsumedPct,0)}% of your own production on site and exported ${u(e.exportedKwh)} kWh. Each kWh kept was worth ${P(e.selfConsumptionAdvantage/Math.max(e.directSolarToHomeKwh,.001),s)} more than exporting it.`});const w=p.reduce((b,l)=>!b||l.importCost>b.importCost?l:b,null);if(w&&w.importCost>0&&r.push({tone:"info",title:"Costliest hour of the day",body:`${w.label} accounted for ${P(w.importCost,s)} of grid spend across the period, on ${u(w.gridKwh)} kWh. Moving flexible loads out of that hour is the single biggest lever here.`}),n&&n.netBenefit>0){const b=Lt(n.netBenefit,o);r.push({tone:"info",title:"What storage would have added",body:`A ${u(n.capacityKwh,0)} kWh battery would have covered ${u(n.gridImportCoveredPct,0)}% of your grid import, worth ${P(n.netBenefit,s)} over this period once the lost feed-in revenue is deducted — roughly ${P(b,s)} a year if the rest of the year looks like this one, before the cost of the battery itself.`})}return r}function Mr(t){if(t.length===0)return"";const e=s=>s==="good"?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5L11 15L15.5 9.5" /></svg>':s==="warn"?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4L20.5 19H3.5L12 4Z" /><path d="M12 10V14" /><path d="M12 16.5H12.01" /></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 11V16" /><path d="M12 7.5H12.01" /></svg>';return`
    <div class="card analysis-card analysis-card-full insights-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">What stood out</h3>
          <p class="analysis-card-copy">Read straight from this period's 15-minute data and your billing settings.</p>
        </div>
      </div>
      <div class="insight-list">
        ${t.map(s=>`
          <div class="insight insight-${s.tone}">
            <span class="insight-icon" aria-hidden="true">${e(s.tone)}</span>
            <span class="insight-copy">
              <strong>${s.title}</strong>
              <span>${s.body}</span>
            </span>
          </div>
        `).join("")}
      </div>
    </div>
  `}function Cr(t,e,s,a){if(a<=.5)return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Battery Sizing</h3>
            <p class="analysis-card-copy">Nothing was exported in this period, so there was no surplus a battery could have stored.</p>
          </div>
        </div>
      </div>
    `;const n=t.reduce((o,r)=>r.netBenefit>o.netBenefit?r:o);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Battery Sizing</h3>
          <p class="analysis-card-copy">
            Your measured intervals replayed against a battery: surplus that was actually exported charges it, and energy you actually imported is served from it first.
          </p>
        </div>
      </div>

      <div class="analysis-table-wrap">
        <table class="analysis-table battery-table">
          <thead>
            <tr>
              <th>Size</th>
              <th class="numeric">Grid import covered</th>
              <th class="numeric">Cycles</th>
              <th class="numeric">Net value</th>
              <th class="numeric">Per year</th>
            </tr>
          </thead>
          <tbody>
            ${t.map(o=>`
              <tr class="${o.capacityKwh===n.capacityKwh?"battery-row-best":""}">
                <td><strong>${u(o.capacityKwh,0)} kWh</strong></td>
                <td class="numeric">
                  ${u(o.gridImportCoveredPct,0)}%
                  <span class="battery-bar"><span style="width:${se(o.gridImportCoveredPct,0,100)}%"></span></span>
                </td>
                <td class="numeric">${u(o.equivalentCycles,1)}</td>
                <td class="numeric">${P(o.netBenefit,e)}</td>
                <td class="numeric">${P(Lt(o.netBenefit,s),e)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <p class="analysis-note">
        Net value is the avoided grid import minus the feed-in revenue given up by storing instead of exporting.
        This is a floor, not a sales figure: it models round-trip losses and 90% usable capacity only — no inverter
        power limit, no degradation, and no tariff arbitrage. "Per year" simply scales ${u(s,0)} day${s===1?"":"s"}
        of measured data to 365 and assumes the rest of the year looks like this one.
      </p>
    </div>
  `}function Er(t,e,s,a){const n=t*24,o=n*a,r=e.totals.houseKwh>0?o/e.totals.houseKwh*100:0,i=e.totals.gridKwh>0?e.totals.importCost/e.totals.gridKwh:0;return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Always-On Baseload</h3>
          <p class="analysis-card-copy">
            The floor your house load never drops below — fridges, standby, network gear, circulation pumps.
          </p>
        </div>
      </div>

      <div class="baseload-figures">
        <div class="baseload-figure">
          <span class="analysis-stat-label">Baseload</span>
          <strong class="analysis-stat-value">${u(t,2)} kW</strong>
          <span class="analysis-stat-meta">5th percentile of all intervals</span>
        </div>
        <div class="baseload-figure">
          <span class="analysis-stat-label">Per day</span>
          <strong class="analysis-stat-value">${u(n)} kWh</strong>
          <span class="analysis-stat-meta">${u(r,0)}% of everything you used</span>
        </div>
        <div class="baseload-figure">
          <span class="analysis-stat-label">Per year</span>
          <strong class="analysis-stat-value">${P(n*365*i,s)}</strong>
          <span class="analysis-stat-meta">If all of it came from the grid, at this period's average rate</span>
        </div>
      </div>

      <div class="baseload-bar" role="img" aria-label="${u(r,0)} percent of usage is baseload">
        <span class="baseload-bar-fill" style="width:${se(r,0,100)}%"></span>
      </div>
      <p class="analysis-note">
        Cutting the baseload pays back every hour of every day, so it is usually the cheapest saving available.
        A 100 W reduction here is worth about ${P(.1*24*365*i,s)} a year.
      </p>
    </div>
  `}function Tr(t){return`
    <div class="analysis-section-nav" role="tablist" aria-label="Analysis sections">
      ${Kt.map(e=>`
        <button
          class="analysis-section-btn ${e.id===t?"active":""}"
          data-analysis-section="${e.id}"
          role="tab"
          aria-selected="${e.id===t}"
          title="${e.blurb}"
        >${e.label}</button>
      `).join("")}
    </div>
  `}function Dr(t){var I,H;const e=t.config,s=t.rangeData,a=t.consumptionTimeseries,n=t.productionTimeseries;if(!e||!s||!a||!n)return`
      <section class="analysis-view">
        <div class="card">
          <p class="muted">Loading analysis data...</p>
        </div>
      </section>
    `;const o=Math.max(0,s.consumption??0),r=Math.max(0,s.production??0),i=Math.max(0,s.exported??0),d=Math.max(0,s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:0)),p=Math.max(0,(s.grid_import!=null?o-s.grid_import:void 0)??s.solar_to_home??d??(s.self_consumed&&s.self_consumed>0?s.self_consumed:r-i)),y=Math.max(0,s.grid_import??o-p),w=Math.max(0,p-d),b=Ht(e,a,((I=t.perMeterProductionTimeseries)==null?void 0:I.meters)??null,d,i),l=Gs(e,a,((H=t.perMeterProductionTimeseries)==null?void 0:H.meters)??null,d,i),g=Os(a,n,t.gridImportTimeseries,t.marketExportTimeseries,e,l),m=e.currency||"EUR",S=((e.energy_variable_rate??0)+(e.network_variable_rate??0)+(e.electricity_tax_rate??0)+(e.compensation_fund_rate??0))*(1+(e.vat_rate??0)),k=d*S,_=b?b.totalSelfUseExportEquivalent:d*l,C=b?b.totalFeedInRevenue:i*l,M={consumptionKwh:o,totalSolarCoverageKwh:p,directSolarToHomeKwh:d,communitySolarToHomeKwh:w,exportedKwh:i,billedGridImportKwh:y,coveragePct:o>0?se(p/o*100,0,100):0,selfConsumedPct:r>0?se(d/r*100,0,100):0,totalSolarValue:k+g.totals.avoidedExceedanceValue+C,selfConsumptionAdvantage:k-_,variableImportCost:y*S},c=Math.max(1,g.daily.length),v=qa(g.points.map(N=>N.houseKw)),h=g.points.length>1?Math.max(1e-4,(g.points[1].timestamp-g.points[0].timestamp)/36e5):.25,f=g.points.map(N=>({exportKwh:N.exportKw*h,gridKwh:N.gridKw*h,importRate:N.importRateWithVat,feedInRate:N.feedInRate})),$=Ya.map(N=>Ua(f,N)),E=$.length>0?$.reduce((N,Q)=>Q.netBenefit>N.netBenefit?Q:N):null,D=Sr(g,M,m,v,E&&E.netBenefit>0?E:null,c),K=t.analysisSection,L=Kt.find(N=>N.id===K)??Kt[0];let F="";switch(K){case"overview":F=`
        ${Mr(D)}
        ${pr(g,m,M)}
        ${hr(g)}
      `;break;case"patterns":F=`
        <div class="analysis-grid">
          ${gr(t,g)}
          ${mr(t,g)}
        </div>
        <div class="analysis-grid">
          ${Er(v,g,m,c)}
          ${xr(g,e.reference_power_kw??0)}
        </div>
      `;break;case"solar":F=`
        <div class="analysis-grid">
          ${fr(g,m,b,S)}
          ${Cr($,m,c,M.exportedKwh)}
        </div>
      `;break;case"costs":F=`
        <div class="analysis-grid">
          ${_r(g,m)}
          ${vr(g,m)}
        </div>
        ${br(g,t,e)}
      `;break;case"peaks":F=`
        ${wr(g,m)}
        ${$r(g)}
      `;break}return`
    <section class="analysis-view">
      <div class="section-header analysis-section-header">
        <div>
          <span class="badge">Analysis</span>
          <h2>Charts and Optimization</h2>
          <p class="muted">${L.blurb} — ${sr(t)}.</p>
        </div>
        <div class="analysis-header-meta">
          <span>${ar(t)}</span>
          <span>${u(g.daily.length,0)} day${g.daily.length===1?"":"s"} analysed</span>
        </div>
      </div>

      ${At(t)}
      ${Tr(K)}

      ${F}
    </section>
  `}const $s={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function bs(t){return $s[t]?$s[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function Lr(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],s=[],a=[],n=[],o=[];for(const i of t.sensors){const d=i.key;d.startsWith("c_")||d==="1-1:1.29.0"||d==="1-1:3.29.0"?e.push(i):d.startsWith("p_")||d==="1-1:2.29.0"||d==="1-1:4.29.0"?s.push(i):d.startsWith("s_")||d.startsWith("1-65:")?a.push(i):d.startsWith("g_")||d.startsWith("7-")?n.push(i):o.push(i)}const r=(i,d,p,y)=>p.length?`
      <div class="card sensor-group">
        <h3 class="card-title"><span class="title-icon">${d}</span> ${i} <span class="badge">${p.length}</span></h3>
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
              ${p.map(w=>`
                <tr data-sensor-search="${`${bs(w.key)} ${w.key}`.toLowerCase()}">
                  <td class="sensor-name">${bs(w.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${y});">${u(w.value)}</td>
                  <td class="sensor-unit">${w.unit}</td>
                  <td class="sensor-peak">${w.peak_timestamp?Ps(w.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
        <div class="sensors-header-row">
          <span class="badge">${t.sensors.length} sensors</span>
          <span class="muted">${t.metering_point}</span>
          <input
            type="search"
            id="sensor-filter"
            class="sensor-filter"
            placeholder="Filter sensors…"
            aria-label="Filter sensors by name"
          />
        </div>
      </div>
      <p class="muted sensors-empty" id="sensors-no-match" hidden>No sensors match that filter.</p>
      ${r("Electricity Consumption","⚡",e,"consumption")}
      ${r("Energy Production","☀️",s,"production")}
      ${r("Energy Sharing","🔗",a,"self")}
      ${r("Gas","🔥",n,"gas")}
      ${r("Other","📊",o,"text")}
    </section>
  `}const Je=11,ot="lu_resilienzpak_electricity_2026",Kr="lu_resilienzpak_gas_2026",Wr=[{id:"lu-electricity-resilienzpak-2026",label:"Luxembourg electricity subsidy 2026",enabled:!0,commodity:"electricity",basis:"grid_import_kwh",amount_gross:.04,start_date:"2026-08-01",end_date:"2026-12-31",vat_included:!0,preset_id:ot,eligibility_note:"Residential customers below 25,000 kWh/year; applies to grid import only. Suppliers show this as 'Mécanisme de compensation A -0,0371/kWh'.",tariff_already_includes_adjustment:!1,suspends_compensation:!0},{id:"lu-gas-resilienzpak-2026",label:"Luxembourg gas subsidy 2026",enabled:!0,commodity:"gas",basis:"gas_volume_m3",amount_gross:.15,start_date:"2026-08-01",end_date:"2026-12-31",vat_included:!0,preset_id:Kr,eligibility_note:"Eligible residential gas consumption.",tariff_already_includes_adjustment:!1,suspends_compensation:!1}];function Fr(t=!0){return Wr.map(e=>({...e,enabled:t}))}const Bs=["electricity","gas"],Us=["grid_import_kwh","gas_volume_m3"];function Pr(t){const e=[];Bs.includes(t.commodity)||e.push(`invalid commodity: ${String(t.commodity)}`),Us.includes(t.basis)||e.push(`invalid basis: ${String(t.basis)}`);const s=Number(t.amount_gross);isFinite(s)?s<0&&e.push("amount_gross must not be negative"):e.push("amount_gross must be a number");const a=rt(t.start_date),n=rt(t.end_date);return a||e.push("start_date must be YYYY-MM-DD"),n||e.push("end_date must be YYYY-MM-DD"),a&&n&&n<a&&e.push("end_date must not be before start_date"),e}function Rr(t,e=0){let s=Number(t.amount_gross);isFinite(s)||(s=0);const a=t.preset_id?String(t.preset_id).trim():"",n=t.suspends_compensation!==void 0?!!t.suspends_compensation:a===ot;return{id:t.id?String(t.id).trim():`custom-${e+1}`,label:t.label&&String(t.label).trim()?String(t.label).trim():"Billing adjustment",enabled:t.enabled!==!1,commodity:Bs.includes(t.commodity)?t.commodity:"electricity",basis:Us.includes(t.basis)?t.basis:"grid_import_kwh",amount_gross:s,start_date:String(t.start_date??"").slice(0,10),end_date:String(t.end_date??"").slice(0,10),vat_included:t.vat_included!==!1,preset_id:a,eligibility_note:t.eligibility_note?String(t.eligibility_note).trim():"",tariff_already_includes_adjustment:!!t.tariff_already_includes_adjustment,suspends_compensation:n}}function qs(t){return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object").map((e,s)=>Rr(e,s)):[]}function rt(t){if(!t||!/^\d{4}-\d{2}-\d{2}/.test(t))return null;const e=t.slice(0,10),[s,a,n]=e.split("-").map(Number);if(a<1||a>12||n<1||n>31)return null;const o=new Date(Date.UTC(s,a-1,n));return o.getUTCFullYear()!==s||o.getUTCMonth()!==a-1||o.getUTCDate()!==n?null:e}const Ar=new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Luxembourg",year:"numeric",month:"2-digit",day:"2-digit"});function Vr(t){const e=new Date(t);return Number.isNaN(e.getTime())?null:Ar.format(e)}function Ir(t,e){return!!t.start_date&&!!t.end_date&&t.start_date<=e&&e<=t.end_date}function jt(t){return t.enabled&&Pr(t).length===0}function Wt(t){return jt(t)&&!t.tariff_already_includes_adjustment}function ue(t){const[e,s,a]=t.split("-").map(Number);return Math.floor(Date.UTC(e,s-1,a)/864e5)}function Ft(t,e,s){const a=rt(t.start_date),n=rt(t.end_date);if(!a||!n)return 0;const o=a>e?a:e,r=n<s?n:s,i=ue(r)-ue(o)+1;return i>0?i:0}function Pt(t,e,s,a,n,o){const r=e*t.amount_gross,i=t.vat_included?r/(1+a):r;return{id:t.id,label:t.label,commodity:t.commodity,basis:t.basis,unit:s,quantity:e,amount_gross:t.amount_gross,total_gross:r,total_net:i,vat_included:t.vat_included,applied:n,estimated:o,preset_id:t.preset_id??"",eligibility_note:t.eligibility_note??""}}function Hr(t,e,s,a,n,o,r,i){const d=t.filter(k=>k.commodity==="electricity"&&k.basis==="grid_import_kwh"&&jt(k));if(d.length===0)return{lines:[],solarCorrectionGross:0,suspendedGridKwh:0,suspendedSelfKwh:0,estimatedAny:!1};const p=[];let y=0,w=0,b=0,l=!1;const g=Math.max(0,a||0),m=Math.max(0,n||0);if(e&&e.length>0){const k=new Map(d.map(h=>[h.id,0])),_=new Map(d.map(h=>[h.id,0]));let C=0,M=0;const c=new Map;for(const h of s??[]){const f=String(h.startedAt??"");c.set(f,(c.get(f)??0)+(Number(h.value)||0))}for(const h of e){const f=Number(h.value)||0,$=String(h.startedAt??""),E=Vr($);if(E===null)continue;const D=c.get($)??0,K=Math.max(0,f-D)*.25,L=Math.min(f,D)*.25;C+=K,M+=L;for(const F of d)Ir(F,E)&&(k.set(F.id,k.get(F.id)+K),_.set(F.id,_.get(F.id)+L))}const v=Math.max(1,ue(r)-ue(o)+1);for(const h of d){let f,$;if(C>0&&g>0)f=g*(k.get(h.id)/C),$=M>0&&m>0?m*(_.get(h.id)/M):_.get(h.id);else if(g>0){const D=Ft(h,o,r),K=D/v;D>0&&D<v&&(l=!0),f=g*K,$=m*K}else f=k.get(h.id),$=_.get(h.id);const E=Wt(h);p.push(Pt(h,f,"kWh",i,E,!1)),E&&(y+=$*h.amount_gross),E&&h.suspends_compensation&&(w+=f,b+=$)}return{lines:p,solarCorrectionGross:y,suspendedGridKwh:w,suspendedSelfKwh:b,estimatedAny:l}}const S=Math.max(1,ue(r)-ue(o)+1);for(const k of d){const _=Ft(k,o,r),C=_/S,M=_>0&&_<S;l=l||M;const c=Wt(k),v=g*C,h=m*C;p.push(Pt(k,v,"kWh",i,c,M)),c&&(y+=h*k.amount_gross),c&&k.suspends_compensation&&(w+=v,b+=h)}return{lines:p,solarCorrectionGross:y,suspendedGridKwh:w,suspendedSelfKwh:b,estimatedAny:l}}function Nr(t,e,s,a,n,o,r=Je){const i=t.filter(l=>l.commodity==="gas"&&l.basis==="gas_volume_m3"&&jt(l));if(i.length===0)return{lines:[],estimatedAny:!1};let d=!1,p=Math.max(0,e||0),y=Number(r)||Je;(!isFinite(y)||y<=0)&&(y=Je),p<=0&&s>0&&(p=s/y,d=!0);const w=Math.max(1,ue(n)-ue(a)+1),b=[];for(const l of i){const g=Ft(l,a,n),m=g/w,S=d||g>0&&g<w;b.push(Pt(l,p*m,"m3",o,Wt(l),S)),S&&(d=!0)}return{lines:b,estimatedAny:d}}function jr(t){const e=qs(t.adjustments),s=Hr(e,t.consumptionItems,t.productionItems,t.fallbackGridImportKwh??0,t.fallbackSelfConsumedKwh??0,t.periodStart,t.periodEnd,t.vatRate||0),a=Nr(e,t.gasVolumeM3??0,t.gasEnergyKwh??0,t.periodStart,t.periodEnd,t.gasVatRate||0,t.gasKwhPerM3??Je),n=i=>{let d=0,p=0;for(const y of i)y.applied&&(d+=y.total_gross,p+=y.total_net);return{gross:d,net:p}},o=n(s.lines),r=n(a.lines);return{electricity:{lines:s.lines,applied_gross:o.gross,applied_net:o.net,solar_correction_gross:s.solarCorrectionGross,suspended_grid_kwh:s.suspendedGridKwh,suspended_self_kwh:s.suspendedSelfKwh,estimated:s.estimatedAny},gas:{lines:a.lines,applied_gross:r.gross,applied_net:r.net,estimated:a.estimatedAny},estimated:s.estimatedAny||a.estimatedAny}}const Gr=11;function Or(t,e,s){let a=Number(s);(!isFinite(a)||a<=0)&&(a=Gr);const n=Math.max(0,t||0),o=Math.max(0,e||0);return n>0?{energyKwh:n,estimated:!1}:o>0?{energyKwh:o*a,estimated:!0}:{energyKwh:0,estimated:!1}}const _s=[{kw:3,fixedMonthlyFee:7.42},{kw:7,fixedMonthlyFee:12.84},{kw:12,fixedMonthlyFee:19.61},{kw:17,fixedMonthlyFee:26.39},{kw:27,fixedMonthlyFee:39.94},{kw:43,fixedMonthlyFee:61.62},{kw:70,fixedMonthlyFee:98.2},{kw:100,fixedMonthlyFee:138.85},{kw:150,fixedMonthlyFee:206.6,existingContractsOnly:!0},{kw:200,fixedMonthlyFee:274.35,existingContractsOnly:!0}];function ze(t){if(!t)return null;const e=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(e){const[,a,n,o]=e;return new Date(Number(a),Number(n)-1,Number(o))}const s=new Date(t);return Number.isNaN(s.getTime())?null:new Date(s.getFullYear(),s.getMonth(),s.getDate())}function Br(t,e,s,a,n){const o=new Date,r=ze(a),i=ze(n);let d=r,p=i;if(!d||!p)switch(t){case"yesterday":{const m=new Date(o);m.setDate(m.getDate()-1),d=new Date(m.getFullYear(),m.getMonth(),m.getDate()),p=new Date(d);break}case"this_week":{const m=new Date(o),S=m.getDay()||7;d=new Date(m.getFullYear(),m.getMonth(),m.getDate()-S+1),p=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_week":{const m=new Date(o),S=m.getDay()||7,k=new Date(m.getFullYear(),m.getMonth(),m.getDate()-S+1);d=new Date(k.getFullYear(),k.getMonth(),k.getDate()-7),p=new Date(k.getFullYear(),k.getMonth(),k.getDate()-1);break}case"this_month":{d=new Date(o.getFullYear(),o.getMonth(),1),p=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_month":{d=new Date(o.getFullYear(),o.getMonth()-1,1),p=new Date(o.getFullYear(),o.getMonth(),0);break}case"this_year":{d=new Date(o.getFullYear(),0,1),p=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_year":{d=new Date(o.getFullYear()-1,0,1),p=new Date(o.getFullYear()-1,11,31);break}case"custom":{d=ze(e)??new Date(o.getFullYear(),o.getMonth(),o.getDate()),p=ze(s)??new Date(d);break}default:{d=new Date(o.getFullYear(),o.getMonth(),o.getDate()-1),p=new Date(d);break}}if(p<d){const m=d;d=p,p=m}let y=0,w=0;const b=new Date(d);for(;b<=p;){const m=new Date(b.getFullYear(),b.getMonth()+1,0).getDate();w+=1/m,y+=1,b.setDate(b.getDate()+1)}const l=d.getFullYear()===p.getFullYear()&&d.getMonth()===p.getMonth()&&d.getDate()===1&&p.getDate()===new Date(p.getFullYear(),p.getMonth()+1,0).getDate(),g=m=>`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}-${String(m.getDate()).padStart(2,"0")}`;return{days:y,factor:w,label:l?"full month":`${y} day${y===1?"":"s"}`,startIso:g(d),endIso:g(p)}}function Ur(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function xs(t){const[e,s]=t.split(":").map(a=>parseInt(a,10)||0);return e*60+s}function Ys(t,e,s,a){if(!Ur(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),o=xs(s),r=xs(a);return o===r?!0:o<r?n>=o&&n<r:n>=o||n<r}function qr(t,e){return e.find(s=>Ys(t,s.day_group,s.start_time,s.end_time))}function Yr(t,e){return e.find(s=>Ys(t,s.day_group,s.start_time,s.end_time))}function ks(t,e,s,a,n,o=[]){var l;const r=new Map;let i=0,d=0,p=0,y=0,w=0;const b=new Map;for(const g of o){const m=Number(g.value)||0;b.set(g.startedAt,(b.get(g.startedAt)??0)+m)}for(const g of t){const m=Number(g.value)||0,S=m*.25,k=b.get(g.startedAt)??0,_=Math.max(0,m-k),C=new Date(g.startedAt);if(Number.isNaN(C.getTime()))continue;const M=qr(C,a),c=Yr(C,n),v=(M==null?void 0:M.rate)??e,h=((l=M==null?void 0:M.label)==null?void 0:l.trim())||"Base tariff",f=(c==null?void 0:c.reference_power_kw)??s;i+=S*v,w=Math.max(w,m),y=Math.max(y,_),m>f&&(p+=(m-f)*.25),_>f&&(d+=(_-f)*.25);const $=`${h}__${v}`,E=r.get($);E?E.kwh+=S:r.set($,{label:h,rate:v,kwh:S})}return{energyCost:i,exceedanceKwh:d,grossExceedanceKwh:p,avoidedExceedanceKwh:Math.max(0,p-d),peakPowerKw:y,grossPeakPowerKw:w,rateBreakdown:Array.from(r.values()).sort((g,m)=>g.label.localeCompare(m.label))}}function zr(t){var is,ls,ds,cs;const e=t.config,s=t.rangeData;if(!e||!s)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const a=s.consumption||0,n=s.production||0,o=s.exported||0,r=Math.max(0,o),i=s.grid_import,d=(s.solar_to_home??s.direct_solar_to_home??s.self_consumed??n)>0,p=i!=null&&!(i<=0&&a>0&&!d),y=Math.max(0,(p?a-i:void 0)??s.solar_to_home??s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:n-r)),w=Math.min(y,Math.max(0,s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:n-r))),b=Math.max(0,y-w),l=Math.max(0,i!=null&&!(i<=0&&a>0&&y<=0)?i:a-y),g=s.peak_power_kw||0,m=e.reference_power_kw||5,S=s.exceedance_kwh||0,k=s.gas_energy||0,_=s.gas_volume||0,C=k>0||_>0,M=Or(k,_,e.gas_kwh_per_m3),c=M.energyKwh,v=M.estimated,h=e.consumption_rate_windows??[],f=e.reference_power_windows??[],$=t.consumptionTimeseries?ks(t.consumptionTimeseries.items,e.energy_variable_rate,m,h,f,((is=t.productionTimeseries)==null?void 0:is.items)??[]):null,E=h.length>0&&!!$&&Math.abs(l-a)<.01,D=f.length>0&&!!$,K=$?$.peakPowerKw:g,L=$?$.exceedanceKwh:S,{days:F,factor:I,label:H,startIso:N,endIso:Q}=Br(t.range,t.customStart,t.customEnd,s.start,s.end),pe=e.energy_fixed_fee*I,ie=e.network_metering_rate*I,le=e.network_power_ref_rate*I,he=E?$.energyCost:l*e.energy_variable_rate,q=l*e.network_variable_rate,V=L*e.exceedance_rate,ee=e.meter_monthly_fees??[],U=jr({adjustments:e.billing_adjustments,vatRate:e.vat_rate,gasVatRate:e.gas_vat_rate??.08,periodStart:N,periodEnd:Q,consumptionItems:((ls=t.consumptionTimeseries)==null?void 0:ls.items)??null,productionItems:((ds=t.productionTimeseries)==null?void 0:ds.items)??null,fallbackGridImportKwh:l,fallbackSelfConsumedKwh:y,gasVolumeM3:_,gasEnergyKwh:k,gasKwhPerM3:e.gas_kwh_per_m3??11}),ae=U.electricity.lines,ye=U.gas.lines,xe=ae.some(x=>x.applied&&Math.abs(x.total_gross)>1e-9),Fe=ye.some(x=>x.applied&&Math.abs(x.total_gross)>1e-9),Pe=U.electricity.applied_net,Re=U.gas.applied_net,j=U.estimated,fe=Math.min(l,Math.max(0,U.electricity.suspended_grid_kwh??0)),it=Math.min(y,Math.max(0,U.electricity.suspended_self_kwh??0)),Ae=(l-fe)*e.compensation_fund_rate,Gt=l*e.electricity_tax_rate,Ve=Math.max(0,e.domiciliation_discount??0)*I,Ie=Math.max(0,e.connect_discount??0)*I,ea=E?$.rateBreakdown.map(x=>x.kwh*x.rate):[he],ta=ee.map(x=>(x.fee||0)*I),sa=[...ea,pe,ie,le,q,V,...ta,Ae,Gt,-Ve,-Ie],lt=O(sa.reduce((x,G)=>x+O(G),0)),dt=lt,ct=O(lt-O(Pe)),Ot=O(ct*e.vat_rate),ke=O(ct+Ot),ve=It(e),Y=Ht(e,t.consumptionTimeseries,((cs=t.perMeterProductionTimeseries)==null?void 0:cs.meters)??null,w,r),ut=ve.filter(x=>isFinite(x.rate)&&x.rate>0),X=ve.length>1,He=Y?Y.weightedExportRate:ut.length>0?ut.reduce((x,G)=>x+G.rate,0)/ut.length:e.feed_in_tariff,re=Y?Y.totalFeedInRevenue:r*He,Bt=X&&ve.length>0?r/ve.length:r,pt=Y?Y.meters:ve.map(x=>({...x,producedKwh:0,exportedKwh:Bt,revenue:Bt*x.rate,selfConsumedKwh:0,exportEquivalentForSelfUse:0})),Se=!!Y,Ut=(Y==null?void 0:Y.allocationMode)??"prorata",J=Y?Y.meters.reduce((x,G)=>x+G.selfConsumedKwh,0):w,qt=e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate,aa=qt*(1+e.vat_rate),Yt=J*qt,zt=Yt*e.vat_rate,ht=U.electricity.solar_correction_gross,ra=it*e.compensation_fund_rate*(1+e.vat_rate),we=Yt+zt-ht-ra,na=Y?Y.totalSelfUseExportEquivalent:J*He,Zt=we-na,Me=Math.max(0,($==null?void 0:$.avoidedExceedanceKwh)??0),mt=Me*e.exceedance_rate,Xt=mt*e.vat_rate,Ce=mt+Xt,Ne=Me>1e-4,je=we+Ce+re,gt=pt.map(x=>{const G=x.selfConsumedKwh*aa,A=G-x.exportEquivalentForSelfUse;return{...x,selfUseSavings:G,selfUseVsExport:A,totalTrackedValue:G+x.revenue}}),oa=Se&&gt.length>0,Ge=ke-re,Jt=(e.gas_fixed_fee??6.5)*I,Qt=c*(e.gas_variable_rate??.055),es=(e.gas_network_fee??4.8)*I,ts=c*(e.gas_network_variable_rate??.012),ss=c*(e.gas_tax_rate??.001),as=O([Jt,Qt,es,ts,ss].reduce((x,G)=>x+O(G),0)),yt=as,ft=O(as-O(Re)),rs=O(ft*(e.gas_vat_rate??.08)),vt=O(ft+rs),R=e.currency||"EUR",T=x=>`${u(x,2)} ${R}`,wt=x=>`${x>0?"+":x<0?"-":""}${u(Math.abs(x),2)} ${R}`,W=x=>u(x,3),$t=x=>u(x,3),ia=x=>x>=0?"comparison-delta-savings":"comparison-delta-extra",ns=(x,G)=>x.map(A=>{const me=A.unit==="kWh"?`${W(A.quantity)} kWh`:`${$t(A.quantity)} m³`,Ee=A.estimated?' <span class="muted">(estimated)</span>':"",Be=A.vat_included?A.total_gross:A.total_gross*(1+G);return A.applied?`
            <tr class="revenue-row">
              <td>${A.label}${Ee}${A.eligibility_note?`<br/><span class="muted" style="font-size: var(--text-xs);">${A.eligibility_note}</span>`:""}</td>
              <td style="text-align: right;">${me} × ${u(A.amount_gross,4)} ${R}/${A.unit}${A.vat_included?" incl. VAT":" excl. VAT"}<br/>= −${T(Be)}${A.vat_included?" incl. VAT":""}</td>
              <td class="revenue-amount" style="text-align: right;">−${T(A.total_net)}</td>
            </tr>
          `:`
            <tr class="revenue-row">
              <td>${A.label}${Ee}<br/><span class="muted" style="font-size: var(--text-xs);">Already reflected in your configured tariff — not deducted again</span></td>
              <td style="text-align: right;">${me} × ${u(A.amount_gross,4)} ${R}/${A.unit}</td>
              <td style="text-align: right;"><span class="muted">in tariff</span></td>
            </tr>
          `}).join(""),la=ns(ae,e.vat_rate),da=ns(ye,e.gas_vat_rate??.08),os=O(dt+O(dt*e.vat_rate)),ca=ae.length>0,ua=ye.length>0,pa=oa?`
            <tr class="section-label"><td colspan="3">Per-System Self-Use vs Export</td></tr>
            ${gt.map(x=>`
            <tr>
              <td>${x.displayName}</td>
              <td style="text-align: right;">
                ${x.shortId}<br/>
                Produced ${W(x.producedKwh)} kWh<br/>
                Kept on-site ${W(x.selfConsumedKwh)} kWh<br/>
                Sold ${W(x.exportedKwh)} kWh<br/>
                ${x.label} ${u(x.rate,4)} ${R}/kWh${X?`<br/>${Xe(x.selfUsePriority)}`:""}
              </td>
              <td style="text-align: right;">
                <strong>${T(x.totalTrackedValue)}</strong><br/>
                <span class="${ia(x.selfUseVsExport)}">${wt(x.selfUseVsExport)}</span> self-use vs export<br/>
                <span class="muted">${T(x.selfUseSavings)} kept value + ${T(x.revenue)} sold</span>
              </td>
            </tr>
            `).join("")}
            <tr class="subtotal-row">
              <td colspan="2"><strong>Tracked per-system value</strong></td>
              <td style="text-align: right;"><strong>${T(gt.reduce((x,G)=>x+G.totalTrackedValue,0))}</strong></td>
            </tr>
      `:"",ha=Se?`Compared with exporting the same ${W(J)} kWh using ${Ut==="prorata"?"a pro-rata split across the PV systems":"the configured PV self-use priority"} and each system's own feed-in tariff`:`Compared with selling the same ${W(J)} kWh at ${u(He,4)} ${R}/kWh`,bt=_s.find(x=>Math.abs(x.kw-m)<.05),ma=lt-O(le)-O(V),_t=$?_s.map(x=>{var us;const G=ks(t.consumptionTimeseries.items,e.energy_variable_rate,x.kw,h,f,((us=t.productionTimeseries)==null?void 0:us.items)??[]),A=x.fixedMonthlyFee*I,me=G.exceedanceKwh*e.exceedance_rate,Ee=O(ma+O(A)+O(me)),Be=O(Ee+O(Ee*e.vat_rate));return{...x,fixedCharge:A,exceedanceKwh:G.exceedanceKwh,exceedanceCharge:me,total:Be,deltaVsCurrent:Be-ke}}):[],Oe=_t.reduce((x,G)=>!x||G.total<x.total?G:x,null),ga=x=>Math.abs(x)<.005?"Current total":`${x>0?"+":"-"}${T(Math.abs(x))}`,xt=s.start&&s.end?`${de(s.start)} — ${de(s.end)}`:t.range.replace("_"," ").replace(/\b\w/g,x=>x.toUpperCase()),ya=L>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${u(K,1)} kW</strong> &mdash; ${D?"Reference power windows active":`Reference power level: ${u(m,1)} kW`}</p>
        <p>Exceedance volume: <strong>${W(L)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${T(V)}</p>
      </div>`:"",fa=E?$.rateBreakdown.map(x=>`
            <tr>
              <td>${x.label} (${W(x.kwh)} kWh)</td>
              <td style="text-align: right;">${u(x.rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(x.kwh*x.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Supplier rate (${W(l)} kWh bought from grid)</td>
              <td style="text-align: right;">${u(e.energy_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(he)}</td>
            </tr>
          `,va=D?`Reference power windows active (${f.length})`:`${u(m,1)} kW`,wa=E?`Time-of-use windows active (${h.length})`:`${u(e.energy_variable_rate,4)} ${R}/kWh`,$a=_t.map(x=>{const G=!!Oe&&x.kw===Oe.kw,A=!!bt&&x.kw===bt.kw,me=x.deltaVsCurrent<-.005?"comparison-delta-savings":x.deltaVsCurrent>.005?"comparison-delta-extra":"";return`
            <tr class="${G?"reference-power-best-row":""}${A?" reference-power-current-row":""}">
              <td>
                <div class="reference-level-cell">
                  <span class="reference-level-kw">${u(x.kw,0)} kW</span>
                  ${G?'<span class="reference-level-badge best">Financially optimal</span>':""}
                  ${A?'<span class="reference-level-badge current">Current</span>':""}
                  ${x.existingContractsOnly?'<span class="reference-level-badge legacy">Existing contracts</span>':""}
                </div>
              </td>
              <td style="text-align: right;">${T(x.fixedCharge)}</td>
              <td style="text-align: right;">${T(x.exceedanceCharge)}</td>
              <td style="text-align: right;"><strong>${T(x.total)}</strong></td>
              <td class="${me}" style="text-align: right;">${ga(x.deltaVsCurrent)}</td>
            </tr>
          `}).join(""),ba=_t.length>0?`
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${D?"Configured reference power windows stay active in this comparison.":"One reference power level is applied to the full selected period."}
              ${bt?"":`Your current configuration uses ${u(m,1)} kW, which is outside the standard Creos low-voltage reference power levels.`}
            </p>
          </div>
          ${Oe?`<div class="reference-power-optimum">
                <span class="reference-level-badge best">Financially optimal: ${u(Oe.kw,0)} kW</span>
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
            ${$a}
          </tbody>
        </table>
      </div>
    `:`
      <div class="card reference-power-card">
        <p class="muted">Reference power level comparison requires 15-minute load-curve data for the selected period.</p>
      </div>
    `;return`
    <section class="invoice-view">
      ${At(t)}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Supplier Bill Estimate &mdash; ${xt}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the selected period. Feed-in revenue and net position are shown separately.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${W(a)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${W(l)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${W(n)} kWh produced</span>
          ${r>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${W(r)} kWh exported</span>`:""}
          ${C?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${W(c)} kWh gas (${$t(_)} m³)${v?" (estimated)":""}</span>`:""}
        </div>
      </div>

      ${ya}

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
              <td>Fixed Fee <span class="muted">(${H})</span></td>
              <td style="text-align: right;">${u(e.energy_fixed_fee,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(pe)}</td>
            </tr>
            ${fa}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${H})</span></td>
              <td style="text-align: right;">${u(e.network_metering_rate,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(ie)}</td>
            </tr>
            <tr>
              <td>Reference power level (${va}) <span class="muted">(${H})</span></td>
              <td style="text-align: right;">${u(e.network_power_ref_rate,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(le)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${W(l)} kWh bought from grid)</td>
              <td style="text-align: right;">${u(e.network_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(q)}</td>
            </tr>
            <tr class="${L>0?"exceedance-row":""}">
              <td>Exceedance charge (${W(L)} kWh above the reference power level)</td>
              <td style="text-align: right;">${u(e.exceedance_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(V)}</td>
            </tr>

            ${ee.filter(x=>x.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${ee.filter(x=>x.fee>0).map(x=>`
            <tr>
              <td>${x.label||"…"+x.meter_id.slice(-8)} <span class="muted">(${H})</span></td>
              <td style="text-align: right;">${u(x.fee,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(x.fee*I)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund${fe>1e-9?`<br/><span class="muted" style="font-size: var(--text-xs);">Base credit suspended on ${W(fe)} kWh covered by the subsidy (supplier bills it through this line)</span>`:""}</td>
              <td style="text-align: right;">${u(e.compensation_fund_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(Ae)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${u(e.electricity_tax_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(Gt)}</td>
            </tr>
            ${Ve>0||Ie>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            ${Ve>0?`
            <tr>
              <td>Domiciliation Discount <span class="muted">(${H})</span></td>
              <td style="text-align: right;">-${u(Math.max(0,e.domiciliation_discount??0),2)} ${R}/mo</td>
              <td style="text-align: right;">-${T(Ve)}</td>
            </tr>
            `:""}
            ${Ie>0?`
            <tr>
              <td>Electronic Invoice Discount <span class="muted">(${H})</span></td>
              <td style="text-align: right;">-${u(Math.max(0,e.connect_discount??0),2)} ${R}/mo</td>
              <td style="text-align: right;">-${T(Ie)}</td>
            </tr>
            `:""}
            `:""}

            ${ca?`
            <tr class="section-label"><td colspan="3">Government Aid &amp; Billing Adjustments</td></tr>
            ${la}
            <tr class="subtotal-row">
              <td colspan="2">Subtotal before adjustments (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(dt)}</strong></td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(ct)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${u(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(Ot)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Supplier Bill Estimate</strong></td>
              <td style="text-align: right;"><strong>${T(ke)}</strong></td>
            </tr>
            ${xe?`
            <tr class="subtotal-row">
              <td colspan="2">Total before billing adjustments (incl. VAT)</td>
              <td style="text-align: right;">${T(os)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2">Total after billing adjustments (incl. VAT)</td>
              <td style="text-align: right;">${T(ke)}${j?' <span class="muted">(estimated)</span>':""}</td>
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
              <td style="text-align: right;">${W(J)} kWh from your own production avoided grid purchases</td>
              <td style="text-align: right;">${T(we)} saved</td>
            </tr>
            ${b>0?`
            <tr class="revenue-row">
              <td>Additional solar received</td>
              <td style="text-align: right;">${W(b)} kWh covered at home from shared/community solar</td>
              <td style="text-align: right;">Informational</td>
            </tr>
            `:""}
            <tr class="revenue-row">
              <td>Export sold</td>
              <td style="text-align: right;">${W(r)} kWh sent to grid</td>
              <td style="text-align: right;">${T(re)} earned</td>
            </tr>
            ${Ne?`
            <tr class="revenue-row">
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${W(Me)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${T(Ce)} saved</td>
            </tr>
            `:""}
            ${r>0?`
            <tr class="section-label"><td colspan="3">Credit Calculation</td></tr>
            ${pt.map(x=>`
            <tr class="revenue-row">
              <td>Exported (${X?x.displayName:W(x.exportedKwh)+" kWh"})</td>
              <td style="text-align: right;">${X?`${x.shortId}<br/>`:""}${W(x.exportedKwh)} kWh<br/>${x.label}<br/>${u(x.rate,4)} ${R}/kWh${Se&&X?`<br/>${Xe(x.selfUsePriority)}`:""}</td>
              <td class="revenue-amount" style="text-align: right;">-${T(x.revenue)}</td>
            </tr>
            `).join("")}
            ${X?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${W(r)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${u(He,4)} ${R}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${T(re)}</td>
            </tr>
            `:""}
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total Solar Value</strong></td>
              <td style="text-align: right;"><strong>${T(je)}</strong></td>
            </tr>
            <tr class="net-total-row">
              <td colspan="2"><strong>Net Electricity Position</strong></td>
              <td style="text-align: right;"><strong>${T(Ge)}</strong></td>
            </tr>
            `:""}
            ${r<=0?`
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total Solar Value</strong></td>
              <td style="text-align: right;"><strong>${T(je)}</strong></td>
            </tr>
            `:""}
            `:""}
          </tbody>
        </table>
      </div>

      ${ba}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Supplier bill estimate: ${T(ke)}</strong>${re>0?` Feed-in revenue is shown separately as ${T(re)}, giving a net electricity position of ${T(Ge)} after export credit.`:""}
          ${xe?` Government aid and billing adjustments reduce this estimate by ${T(U.electricity.applied_gross)} incl. VAT (total before adjustments: ${T(os)}).${j?" Some adjustment values are estimated from incomplete interval data.":""}`:""}
          <br/>
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${W(l)} kWh), not total home usage.
          Supplier pricing: ${wa}.
          Fixed monthly charges are prorated across the viewed period (${F} days, ${H}, equivalent to ${u(I,2)} monthly charges).
          Peak load (${u(K,1)} kW) is compared against ${D?"your configured reference power windows":`your reference power level (${u(m,1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${u(e.exceedance_rate,4)} ${R}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${C?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${xt}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${W(c)} kWh${v?" (estimated from volume)":""}</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${$t(_)} m³</span>
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
              <td>Fixed Fee <span class="muted">(${H})</span></td>
              <td style="text-align: right;">${u(e.gas_fixed_fee??6.5,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(Jt)}</td>
            </tr>
            <tr>
              <td>Energy (${W(c)} kWh${v?", estimated from volume":""})</td>
              <td style="text-align: right;">${u(e.gas_variable_rate??.055,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(Qt)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${H})</span></td>
              <td style="text-align: right;">${u(e.gas_network_fee??4.8,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(es)}</td>
            </tr>
            <tr>
              <td>Network Variable (${W(c)} kWh)</td>
              <td style="text-align: right;">${u(e.gas_network_variable_rate??.012,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(ts)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${W(c)} kWh)</td>
              <td style="text-align: right;">${u(e.gas_tax_rate??.001,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(ss)}</td>
            </tr>

            ${ua?`
            <tr class="section-label"><td colspan="3">Government Aid &amp; Billing Adjustments</td></tr>
            ${da}
            <tr class="subtotal-row">
              <td colspan="2">Subtotal before adjustments (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(yt)}</strong></td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(ft)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${u((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${T(rs)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${T(vt)}</strong></td>
            </tr>
            ${Fe?`
            <tr class="subtotal-row">
              <td colspan="2">Gas total before billing adjustments (incl. VAT)</td>
              <td style="text-align: right;">${T(O(yt+O(yt*(e.gas_vat_rate??.08))))}</td>
            </tr>
            `:""}
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Net Energy Position: ${T(Ge+vt)}</strong>
          (Electricity net position: ${T(Ge)} + Gas supplier estimate: ${T(vt)})
        </p>
      </div>
      `:""}

      ${n>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Value &mdash; ${xt}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${T(je)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${W(n)} kWh</div>
            <div class="solar-stat-label">Solar produced</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${T(we)}</div>
            <div class="solar-stat-label">Saved by using ${W(J)} kWh of your own solar at home</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${wt(Zt)}</div>
            <div class="solar-stat-label">Extra value from using it yourself instead of selling it</div>
          </div>
          ${Ne?`
          <div class="solar-stat">
            <div class="solar-stat-value">${T(Ce)}</div>
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
              <td style="text-align: right;">${W(J)} kWh from your own production avoided grid purchases</td>
              <td style="text-align: right;">${T(we)} saved</td>
            </tr>
            ${b>0?`
            <tr>
              <td>Additional solar received</td>
              <td style="text-align: right;">${W(b)} kWh covered at home from shared/community solar</td>
              <td style="text-align: right;">Informational</td>
            </tr>
            `:""}
            <tr>
              <td>Extra vs exporting instead</td>
              <td style="text-align: right;">${ha}</td>
              <td style="text-align: right;">${wt(Zt)}</td>
            </tr>
            <tr>
              <td>Export sold</td>
              <td style="text-align: right;">${W(r)} kWh sent to grid</td>
              <td style="text-align: right;">${T(re)} earned</td>
            </tr>
            ${Ne?`
            <tr>
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${W(Me)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${T(Ce)} saved</td>
            </tr>
            `:""}

            ${pa}

            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${W(J)} kWh)</td>
              <td style="text-align: right;">${u(e.energy_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(J*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${u(e.network_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(J*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${u(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(J*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${u(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(zt)}</td>
            </tr>
            ${ht>1e-4?`
            <tr>
              <td>Government aid not received on own solar${U.electricity.estimated?' <span class="muted">(estimated)</span>':""}</td>
              <td style="text-align: right;">Self-consumed kWh during the aid period avoid subsidised grid imports</td>
              <td class="revenue-amount" style="text-align: right;">−${T(ht)}</td>
            </tr>
            `:""}
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${T(we)}</strong></td>
            </tr>

            ${Ne?`
            <tr class="section-label"><td colspan="3">Reference Power Savings</td></tr>
            <tr>
              <td>Exceedance avoided</td>
              <td style="text-align: right;">${W(Me)} kWh above the reference power level</td>
              <td style="text-align: right;">${T(mt)}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${u(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(Xt)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Reference Power Savings</strong></td>
              <td style="text-align: right;"><strong>${T(Ce)}</strong></td>
            </tr>
            `:""}

            ${r>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${pt.map(x=>`
            <tr>
              <td>Sold to grid ${X?`(${x.displayName})`:`(${W(x.exportedKwh)} kWh)`}</td>
              <td style="text-align: right;">${X?`${x.shortId}<br/>`:""}${W(x.exportedKwh)} kWh<br/>${x.label}<br/>${u(x.rate,4)} ${R}/kWh${Se&&X?`<br/>${Xe(x.selfUsePriority)}`:""}</td>
              <td style="text-align: right;">${T(x.revenue)}</td>
            </tr>
            `).join("")}
            ${X?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${T(re)}</strong></td>
            </tr>
            `:""}
            `:""}

            <tr class="total-row solar-total-row">
              <td colspan="2"><strong>💰 Total Solar Panel Value</strong></td>
              <td style="text-align: right;"><strong>${T(je)}</strong></td>
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
          ${ve.some(x=>x.mode==="sensor")?"Market price sourced from Home Assistant sensor.":"Using fixed feed-in tariff — configure a market price sensor in Settings for real-time rates."}
          ${Se?Ns(Ut):X?"Displayed per-meter feed-in kWh are currently equal-split estimates because per-meter production data was not available for this view.":""}
        </p>
      </div>
      `:""}
    </section>
  `}const Zr=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],Xr=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Reference Power Fixed Charge",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"},{key:"gas_kwh_per_m3",label:"Volume → Energy Conversion",step:"0.1",unit:"kWh/m³",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"domiciliation_discount",label:"Domiciliation Discount",step:"0.01",unit:"EUR/mo",type:"number"},{key:"connect_discount",label:"Electronic Invoice Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"Government Aid & Billing Adjustments",icon:"🏛️",fields:[]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],nt=new Set;let Ss=!1;function Ms(t,e){e?nt.add(t):nt.delete(t)}function Jr(t,e){return Ss||(Ss=!0,e.forEach(s=>nt.add(s))),nt.has(t)}const Qr=["consumption","production","solar_consumption","export","export_consumption","gas"],zs={consumption:"Consumption",production:"Solar production",solar_consumption:"Solar production (consumption-metered)",export:"Grid export",export_consumption:"Grid export (consumption-metered)",gas:"Gas"},Zs={consumption:"⚡",production:"☀️",solar_consumption:"☀️",export:"",export_consumption:"",gas:"🔥"},en={consumption:"House/grid import meter",production:"PV generation, including energy that may be self-consumed",solar_consumption:"Solar production measured as consumption",export:"Export-only meter for energy sold/sent to the grid",export_consumption:"Grid export measured on the consumption register (active consumption OBIS)",gas:"Gas consumption meter"};function tn(t){return t.map(e=>{const s=Zs[e],a=zs[e]??e;return`<span class="meter-type-badge meter-type-${e}">${s?`${s} `:""}${a}</span>`}).join(" ")}function sn(t,e,s){return`
          <label class="meter-type-cb">
            <input type="checkbox" name="meter_${t}_${e}" ${s.types.includes(e)?"checked":""} />
            <span class="meter-type-copy">
              <strong>${zs[e]??e}</strong>
              <small>${en[e]??""}</small>
            </span>
          </label>
  `}function Cs(t,e,s){const a=t+1;return s?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${a}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${tn(e.types)}</div>
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
          ${Qr.map(n=>sn(t,n,e)).join("")}
        </div>
      </div>
    </div>
  `}function Xs(t){return Zr.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function an(t,e){return`
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
            ${Xs(e.day_group??"all")}
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
  `}function rn(t,e){return`
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
            ${Xs(e.day_group??"all")}
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
  `}function nn(t,e){const s=!!e.preset_id,a=e.preset_id===ot,n=a&&e.enabled&&!e.tariff_already_includes_adjustment;return`
    <div class="meter-card">
      <div class="meter-header">
        <strong>${e.label||`Adjustment ${t+1}`}</strong>
        ${s?'<span class="meter-type-badge meter-type-production">Official preset</span>':""}
        <button type="button" class="btn-icon remove-adjustment-btn" data-adjustment="${t}" title="Remove adjustment">&times;</button>
      </div>
      <input type="hidden" name="adjustment_${t}_id" value="${e.id}" />
      <input type="hidden" name="adjustment_${t}_preset_id" value="${e.preset_id??""}" />
      <input type="hidden" name="adjustment_${t}_suspends_compensation" value="${e.suspends_compensation?"1":""}" />
      ${n?`
      <div class="settings-note settings-note-warning">
        ⚠️ Only enable this if your configured electricity price does <strong>not</strong> already include the government subsidy.
      </div>
      `:""}
      ${a&&e.enabled&&e.suspends_compensation?`
      <div class="settings-note">
        Suppliers bill this subsidy through the compensation line (“Mécanisme de compensation A −0,0371/kWh”), so the base Compensation Fund credit is automatically suspended on subsidised kWh instead of being added on top.
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
  `}function on(t,e="ha",s){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const a=e==="standalone"?(s==null?void 0:s.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let n="";if(e==="standalone"){const f=a.map((E,D)=>Cs(D,E,!1)).join("");s==null||s.proxy_url,n=`
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
              ${f}
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
    `}else{const f=(t==null?void 0:t.meters)??[];n=`
      <div class="card" style="margin-bottom: var(--sp-6); padding: var(--sp-4) var(--sp-5);">
        <p class="muted" style="margin: 0 0 var(--sp-3) 0;">🔒 API credentials are managed through Home Assistant &rarr; Settings &rarr; Integrations &rarr; Leneda</p>
        <div class="form-section">
          <div class="form-section-title">📊  Configured Metering Points</div>
          <div id="meters-container">
            ${f.length>0?f.map((E,D)=>Cs(D,E,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const o=f=>f.map($=>{const E=t?t[$.key]??"":"";return`
        <div class="form-row">
          <label for="cfg-${$.key}">${$.label}</label>
          <div class="input-group">
            <input
              id="cfg-${$.key}"
              name="${$.key}"
              type="${$.type}"
              ${$.type==="number"?`step="${$.step}"`:""}
              value="${E}"
            />
            ${$.unit?`<span class="input-unit">${$.unit}</span>`:""}
          </div>
        </div>
      `}).join(""),r=((t==null?void 0:t.meters)??[]).filter(f=>f.types.includes("production")||f.types.includes("solar_consumption")),i=(t==null?void 0:t.feed_in_rates)??[],d=e==="ha";function p(f){return i.find($=>$.meter_id===f)??{meter_id:f,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:"",display_name:"",self_use_priority:null}}const y=r.length===0?'<p class="muted">No solar production meters configured — add a meter with Solar production above.</p>':r.map((f,$)=>{const E=p(f.id),D=f.id?"…"+f.id.slice(-8):`Meter ${$+1}`,K=Dt(f.id,$+1,E.display_name);return`
          <div class="feed-in-meter-card" data-meter-idx="${$}" data-meter-id="${f.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${K}</span>
              <code style="font-size: var(--text-sm);">${D}</code>
              <input type="hidden" name="feed_in_rate_${$}_meter_id" value="${f.id}" />
            </div>
            <div class="form-row">
              <label for="cfg-feed_in_rate_${$}_display_name">System Name</label>
              <div class="input-group">
                <input
                  id="cfg-feed_in_rate_${$}_display_name"
                  name="feed_in_rate_${$}_display_name"
                  type="text"
                  value="${E.display_name??""}"
                  placeholder="${Dt(f.id,$+1)}"
                />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-feed_in_rate_${$}_priority">Self-use Priority</label>
              <div class="input-group">
                <input
                  id="cfg-feed_in_rate_${$}_priority"
                  name="feed_in_rate_${$}_self_use_priority"
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
                  <input type="radio" name="feed_in_rate_${$}_mode" value="fixed" ${E.mode==="fixed"?"checked":""} />
                  <span class="mode-label">💶 Fixed Tariff</span>
                </label>
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${$}_mode" value="sensor" ${E.mode==="sensor"?"checked":""} />
                  <span class="mode-label">📡 HA Sensor</span>
                </label>
              </div>
            </div>
            <div class="feed-in-fixed-fields" data-rate-idx="${$}" style="${E.mode==="fixed"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${$}_tariff">Feed-in Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${$}_tariff" name="feed_in_rate_${$}_tariff" type="number" step="0.0001" value="${E.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
              </div>
            </div>
            <div class="feed-in-sensor-fields" data-rate-idx="${$}" style="${E.mode==="sensor"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${$}_sensor">Market Price Sensor</label>
                <div class="input-group sensor-picker-group">
                  <input
                    id="cfg-feed_in_rate_${$}_sensor"
                    name="feed_in_rate_${$}_sensor_entity"
                    type="text"
                    value="${E.sensor_entity}"
                    placeholder="${d?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${d&&$===0?'<datalist id="ha-entity-list"></datalist>':""}
              </div>
              <div class="form-row">
                <label for="cfg-feed_in_rate_${$}_fallback">Fallback Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${$}_fallback" name="feed_in_rate_${$}_fallback_tariff" type="number" step="0.0001" value="${E.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
                <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                  Used when the sensor is unavailable.
                </p>
              </div>
            </div>
          </div>
        `}).join(""),w=((t==null?void 0:t.meters)??[]).some(f=>f.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),b=(t==null?void 0:t.consumption_rate_windows)??[],l=(t==null?void 0:t.reference_power_windows)??[],g=(t==null?void 0:t.meters)??[],m=(t==null?void 0:t.meter_monthly_fees)??[];function S(f){return m.find($=>$.meter_id===f)??{meter_id:f,label:"",fee:0}}const k=g.length===0?'<p class="muted">No meters configured.</p>':g.map((f,$)=>{const E=S(f.id),D=f.id?"…"+f.id.slice(-8):`Meter ${$+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${f.types.map(L=>Zs[L]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${D}</code>
              <input type="hidden" name="meter_fee_${$}_meter_id" value="${f.id}" />
            </div>
            <div class="form-row" style="margin-bottom: var(--sp-2);">
              <label for="cfg-meter_fee_${$}_label">Label</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${$}_label" name="meter_fee_${$}_label" type="text" value="${E.label||`Meter ${$+1} metering fee`}" placeholder="e.g. Smart meter rental" />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-meter_fee_${$}_fee">Monthly Fee</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${$}_fee" name="meter_fee_${$}_fee" type="number" step="0.01" value="${E.fee}" />
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
      ${b.length>0?b.map((f,$)=>an($,f)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,C=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${l.length>0?l.map((f,$)=>rn($,f)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,M=qs(t==null?void 0:t.billing_adjustments),c=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Dated per-unit subsidies, rebates, supplier credits or temporary taxes. Amounts are deducted as separate invoice
      lines &mdash; your tariff prices are never modified. Date ranges are inclusive (Europe/Luxembourg).
      Overlapping adjustments stack. If your configured tariff already includes an adjustment, tick
      <strong>My entered tariff already includes this adjustment</strong> to avoid double-counting.
    </p>
    <div id="adjustments-container">
      ${M.length>0?M.map((f,$)=>nn($,f)).join(""):'<p class="muted">No billing adjustments configured.</p>'}
    </div>
    <div style="display: flex; gap: var(--sp-3); flex-wrap: wrap; margin-top: var(--sp-3);">
      <button type="button" id="add-adjustment-btn" class="btn btn-outline">
        + Add Custom Adjustment
      </button>
      <button type="button" id="restore-adjustment-presets-btn" class="btn btn-outline">
        Restore Official Presets
      </button>
    </div>
  `,v=new Set(["Energy Supplier","Network Operator"]),h=Xr.map(f=>{if(f.title==="Gas Billing"&&!w||f.title==="Meter Fees"&&g.length<2)return"";let $;return f.title==="Feed-in / Selling"?$=y:f.title==="Time-of-Use Tariffs"?$=_:f.title==="Reference Power Windows"?$=C:f.title==="Government Aid & Billing Adjustments"?$=c:f.title==="Discounts"?$=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as monthly credits. The dashboard prorates them to the selected period and subtracts them before VAT.
      </p>`+o(f.fields):f.title==="Meter Fees"?$=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+k:$=o(f.fields),`
    <details class="form-section" data-section="${f.title}" ${Jr(f.title,v)?"open":""}>
      <summary class="form-section-title">${f.icon}  ${f.title}</summary>
      ${$}
    </details>
  `}).join("");return`
    <section class="settings-view">
      ${n}

      <div class="section-header">
        <h2>Billing Configuration</h2>
        <span class="muted">Luxembourg energy billing rates &mdash; adjust values to match your contract</span>
        ${t?`
        <div class="section-header-actions">
          <button type="button" class="btn btn-ghost" data-sections-toggle="open">Expand all</button>
          <button type="button" class="btn btn-ghost" data-sections-toggle="close">Collapse all</button>
        </div>
        `:""}
      </div>

      <div class="card">
        <form id="settings-form">
          ${t?h:'<p class="muted">Loading configuration…</p>'}
          ${t?`
          <div class="form-actions form-actions-sticky">
            <button type="submit" class="btn btn-primary">Save Configuration</button>
            <button type="button" id="reset-config-btn" class="btn btn-outline">Reset to Defaults</button>
            <span id="settings-status" class="form-status" role="status" aria-live="polite"></span>
          </div>
          `:""}
        </form>
      </div>
    </section>
  `}function St(t,e,s=!1,a="dark",n=""){const o=l=>`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${l}
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
  `),d=o(`
    <path d="M4 19H20" />
    <path d="M7 19V11" />
    <path d="M12 19V7" />
    <path d="M17 19V4" />
  `),p=o(`
    <path d="M7 4H17V20L15 18.5L13 20L11 18.5L9 20L7 18.5L5 20V6A2 2 0 0 1 7 4Z" />
    <path d="M9 9H15" />
    <path d="M9 13H15" />
  `),y=o(`
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3V6" />
    <path d="M12 18V21" />
    <path d="M3 12H6" />
    <path d="M18 12H21" />
    <path d="M5.64 5.64L7.76 7.76" />
    <path d="M16.24 16.24L18.36 18.36" />
    <path d="M16.24 7.76L18.36 5.64" />
    <path d="M5.64 18.36L7.76 16.24" />
  `),w=o(a==="dark"?`
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
      `),b=[{id:"dashboard",label:"Dashboard",icon:i},{id:"charts",label:"Charts",icon:r},{id:"invoice",label:"Invoice",icon:p},{id:"sensors",label:"Sensors",icon:d},{id:"settings",label:"Settings",icon:y}];return`
    <header class="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-brand">
        <img src="/leneda-panel/static/logo.png" srcset="/leneda-panel/static/logo@2x.png 2x" alt="Leneda Logo" class="navbar-logo-img" />
        ${n?`<span class="navbar-badge" title="Where this dashboard gets its data">${n}</span>`:""}
        <span class="navbar-version" title="Dashboard version">v2.18.1</span>

        <button class="menu-toggle ${s?"open":""}" aria-label="Toggle menu" aria-expanded="${s}">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav class="navbar-tabs ${s?"mobile-open":""}">
        <div class="navbar-tab-group" role="tablist">
          ${b.map(l=>`
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
        </div>

        <div class="navbar-actions">
            <button
              class="theme-toggle"
              type="button"
              data-theme-toggle
              title="Switch to ${a==="dark"?"light":"dark"} mode"
              aria-label="Switch to ${a==="dark"?"light":"dark"} mode"
            >
              <span class="theme-toggle-icon" aria-hidden="true">${w}</span>
              <span class="theme-toggle-label">${a==="dark"?"Light":"Dark"} mode</span>
            </button>

            <a href="https://buymeacoffee.com/koosoli" target="_blank" rel="noopener noreferrer" 
               class="navbar-cta"
            >
              <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="currentColor"><path d="M20,3H4v10c0,2.21,1.79,4,4,4h6c2.21,0,4-1.79,4-4v-3h2c1.1,0,2-0.9,2-2V5C22,3.9,21.1,3,20,3z M20,8h-2V5h2V8z M18,15H4v-1h14V15z M18,12H4V5h14V12z"/></svg>
              <span>Support Project</span>
            </a>

            <a href="https://github.com/koosoli/Leneda-integration" target="_blank" rel="noopener noreferrer"
               class="navbar-icon-link"
               title="View Project on GitHub">
              <svg style="width: 18px; height: 18px;" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
        </div>
      </nav>
    </header>
  `}const Js="leneda_credentials",Qs="leneda_theme";function ln(){try{const t=localStorage.getItem(Js);if(t)return JSON.parse(t)}catch{}return null}function Mt(t){try{localStorage.setItem(Js,JSON.stringify(t))}catch{}}function dn(){var t;try{const e=localStorage.getItem(Qs);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function cn(t){try{localStorage.setItem(Qs,t)}catch{}}function Es(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const[,s,a,n]=e;return new Date(Number(s),Number(a)-1,Number(n))}function Ts(t){const e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${e}-${s}-${a}`}function De(t){const e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0"),n=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),r=String(t.getSeconds()).padStart(2,"0"),i=String(t.getMilliseconds()).padStart(3,"0"),d=-t.getTimezoneOffset(),p=d>=0?"+":"-",y=String(Math.floor(Math.abs(d)/60)).padStart(2,"0"),w=String(Math.abs(d)%60).padStart(2,"0");return`${e}-${s}-${a}T${n}:${o}:${r}.${i}${p}${y}:${w}`}function Ds(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function un(t,e=new Date){switch(t){case"yesterday":{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const a=new Date(s);return a.setHours(23,59,59,999),{start:s,end:a}}case"this_week":{const s=new Date(e),a=s.getDay()||7;return s.setDate(s.getDate()-a+1),s.setHours(0,0,0,0),{start:s,end:e}}case"last_week":{const s=new Date(e),a=s.getDay()||7,n=new Date(s);n.setDate(s.getDate()-a),n.setHours(23,59,59,999);const o=new Date(n);return o.setDate(n.getDate()-6),o.setHours(0,0,0,0),{start:o,end:n}}case"this_month":return{start:new Date(e.getFullYear(),e.getMonth(),1),end:e};case"last_month":{const s=new Date(e.getFullYear(),e.getMonth()-1,1),a=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s,end:a}}case"this_year":return{start:new Date(e.getFullYear(),0,1),end:e};case"last_year":{const s=new Date(e.getFullYear()-1,0,1),a=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s,end:a}}}}function pn(t,e,s=new Date){const a=Es(t),n=Es(e);if(!a||!n)return null;const o=["yesterday","this_week","last_week","this_month","last_month","this_year","last_year"];for(const r of o){const i=un(r,s);if(Ds(a,i.start)&&Ds(n,i.end))return r}return null}class hn{constructor(e){$e(this,"root");$e(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartViewportStart:null,chartViewportEnd:null,chartUnit:"kwh",chartTimeBucket:"quarter_hour",chartConsumptionView:"grid",analysisSection:"overview",analysisHeatmapMetric:"grid",analysisProfileMetric:"house",analysisComparisonMode:"previous",analysisComparison:null,analysisComparisonLoading:!1,rangeData:null,consumptionTimeseries:null,productionTimeseries:null,gridImportTimeseries:null,marketExportTimeseries:null,perMeterProductionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:dn()});$e(this,"preZoomRange",null);$e(this,"preZoomCustomStart","");$e(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await Ks();if(this.state.mode=e.mode,e.mode==="standalone"){const s=ln();if(s&&(this.state.credentials=s),!e.configured&&!s){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&s)try{const{saveCredentials:a}=await ne(async()=>{const{saveCredentials:n}=await Promise.resolve().then(()=>ge);return{saveCredentials:n}},void 0);await a(s)}catch{}if(!s)try{this.state.credentials=await Ws()}catch{}}await this.loadData()}toDisplayError(e,s="Failed to load data"){const a=e instanceof Error?e.message:String(e??"").trim(),n=a.toLowerCase();return n.includes("missing data")||n.includes("no_data")||n.includes("no data")?"Missing data":a||s}clearRangeStateWithError(e,s="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.state.gridImportTimeseries=null,this.state.marketExportTimeseries=null,this.state.perMeterProductionTimeseries=null,this.clearChartViewport(),this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1,this.state.error=this.toDisplayError(e,s)}async fetchPerMeterProductionForRange(e,s,a){var o;if(((e==null?void 0:e.meters)??[]).filter(r=>r.types.includes("production")||r.types.includes("solar_consumption")).length<=1)return null;try{const r=await Ct("1-1:2.29.0",s,a);return(o=r.meters)!=null&&o.length?r:null}catch(r){return console.warn("Per-meter production fetch failed:",r),null}}async fetchEnergyFlowTimeseries(e,s){const[a,n,o,r]=await Promise.all([Le("1-1:1.29.0",e,s),Le("1-1:2.29.0",e,s),Le("1-65:1.29.9",e,s),Le("1-65:2.29.9",e,s)]);return{consumptionTimeseries:a,productionTimeseries:n,gridImportTimeseries:o,marketExportTimeseries:r}}shouldLoadComparison(){return this.state.tab==="charts"&&this.state.analysisSection==="costs"&&!!this.state.rangeData}resetAnalysisComparison(){this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1}clearChartViewport(){this.state.chartViewportStart=null,this.state.chartViewportEnd=null}normalizeChartTimeBucket(){const{start:e,end:s}=this.getDateRangeISO(),a=Ra(Tt(e,s),this.state.chartTimeBucket);a!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=a)}getCurrentRangeKey(){const{start:e,end:s}=this.getDateRangeISO();return`${e}|${s}`}shiftIsoByYears(e,s){const a=new Date(e);if(!Number.isFinite(a.getTime()))return e;const n=new Date(a);return n.setUTCFullYear(n.getUTCFullYear()+s),n.toISOString()}getComparisonRangeISO(e,s,a){if(a==="last_year")return{start:this.shiftIsoByYears(e,-1),end:this.shiftIsoByYears(s,-1)};const n=new Date(e).getTime(),o=new Date(s).getTime(),r=Math.max(0,o-n),i=n-1,d=i-r;return{start:new Date(d).toISOString(),end:new Date(i).toISOString()}}async loadAnalysisComparison(e=!1){var i;if(!this.state.consumptionTimeseries||!this.state.productionTimeseries)return;const{start:s,end:a}=this.getDateRangeISO(),n=this.state.analysisComparisonMode,o=`${s}|${a}|${n}`;if(!e&&(this.state.analysisComparisonLoading||((i=this.state.analysisComparison)==null?void 0:i.key)===o))return;const r=this.getComparisonRangeISO(s,a,n);this.state.analysisComparisonLoading=!0,this.state.tab==="charts"&&this.renderPreserveMainScroll();try{const{consumptionTimeseries:d,productionTimeseries:p,gridImportTimeseries:y,marketExportTimeseries:w}=await this.fetchEnergyFlowTimeseries(r.start,r.end);if(o!==this.getCurrentRangeKey())return;this.state.analysisComparison={key:o,mode:n,start:r.start,end:r.end,consumptionTimeseries:d,productionTimeseries:p,gridImportTimeseries:y,marketExportTimeseries:w}}catch(d){console.warn("Comparison data fetch failed:",d),o===this.getCurrentRangeKey()&&(this.state.analysisComparison=null)}finally{o===this.getCurrentRangeKey()&&(this.state.analysisComparisonLoading=!1,this.state.tab==="charts"&&this.renderPreserveMainScroll())}}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.clearChartViewport(),this.resetAnalysisComparison(),this.render();try{const[e,s,a]=await Promise.all([Ze(this.state.range),Et(),Ke()]),{start:n,end:o}=this.getDateRangeISO(),[r,i]=await Promise.all([this.fetchEnergyFlowTimeseries(n,o),this.fetchPerMeterProductionForRange(a,n,o)]);this.state.rangeData=e,this.state.consumptionTimeseries=r.consumptionTimeseries,this.state.productionTimeseries=r.productionTimeseries,this.state.gridImportTimeseries=r.gridImportTimeseries,this.state.marketExportTimeseries=r.marketExportTimeseries,this.state.perMeterProductionTimeseries=i,this.state.sensors=s,this.state.config=a}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render(),this.shouldLoadComparison()&&this.loadAnalysisComparison()}}async changeRange(e){if(this.preZoomRange=null,this.clearChartViewport(),this.state.range=e,this.resetAnalysisComparison(),e==="custom"){if(!this.state.customStart||!this.state.customEnd){const s=new Date;s.setDate(s.getDate()-1);const a=new Date(s);a.setDate(a.getDate()-6),this.state.customStart=Ts(a),this.state.customEnd=Ts(s)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:s,end:a}=this.getDateRangeISO(),[n,o,r]=await Promise.all([Ze(e),this.fetchEnergyFlowTimeseries(s,a),this.fetchPerMeterProductionForRange(this.state.config,s,a)]);this.state.rangeData=n,this.state.consumptionTimeseries=o.consumptionTimeseries,this.state.productionTimeseries=o.productionTimeseries,this.state.gridImportTimeseries=o.gridImportTimeseries,this.state.marketExportTimeseries=o.marketExportTimeseries,this.state.perMeterProductionTimeseries=r}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render(),this.shouldLoadComparison()&&this.loadAnalysisComparison()}}async applyCustomRange(){this.preZoomRange=null,this.clearChartViewport();const{customStart:e,customEnd:s}=this.state;if(!(!e||!s)){this.state.error=null,this.state.loading=!0,this.resetAnalysisComparison(),this.render();try{const a=pn(e,s),n=a?Ze(a):ne(async()=>{const{fetchCustomData:w}=await Promise.resolve().then(()=>ge);return{fetchCustomData:w}},void 0).then(({fetchCustomData:w})=>w(e,s)),o=this.state.config,r=De(new Date(e+"T00:00:00")),i=De(new Date(s+"T23:59:59.999")),[d,p,y]=await Promise.all([n,this.fetchEnergyFlowTimeseries(r,i),this.fetchPerMeterProductionForRange(o,r,i)]);this.state.rangeData={range:"custom",consumption:d.consumption,production:d.production,exported:d.exported??0,self_consumed:d.self_consumed??0,grid_import:d.grid_import,solar_to_home:d.solar_to_home,direct_solar_to_home:d.direct_solar_to_home,shared:d.shared,shared_with_me:d.shared_with_me,gas_energy:d.gas_energy??0,gas_volume:d.gas_volume??0,peak_power_kw:d.peak_power_kw??0,exceedance_kwh:d.exceedance_kwh??0,metering_point:d.metering_point??"",start:d.start??e,end:d.end??s},this.state.consumptionTimeseries=p.consumptionTimeseries,this.state.productionTimeseries=p.productionTimeseries,this.state.gridImportTimeseries=p.gridImportTimeseries,this.state.marketExportTimeseries=p.marketExportTimeseries,this.state.perMeterProductionTimeseries=y}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render(),this.shouldLoadComparison()&&this.loadAnalysisComparison()}}}async shiftChartPeriod(e){const{start:s,end:a}=this.getDateRangeISO(),n=Hs(s,a,this.state.chartTimeBucket,e);n&&await this.handleChartZoomChange(De(n.start),De(n.end))}changeTab(e){this.state.tab=e,this.render(),(e==="dashboard"||e==="charts")&&!this.state.rangeData&&!this.state.loading&&this.loadData(),this.shouldLoadComparison()&&this.loadAnalysisComparison(),e==="sensors"&&!this.state.sensors&&Et().then(s=>{this.state.sensors=s,this.render()}),e==="settings"&&!this.state.config&&Ke().then(s=>{this.state.config=s,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,cn(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}printInvoice(){var r,i;const e=document.title,a=`Leneda-invoice-${(r=this.state.rangeData)!=null&&r.start&&((i=this.state.rangeData)!=null&&i.end)?`${this.state.rangeData.start.slice(0,10)}_to_${this.state.rangeData.end.slice(0,10)}`:this.state.range}`.replace(/[^a-z0-9_-]+/gi,"-");let n=!1;const o=()=>{n||(n=!0,document.title=e,window.removeEventListener("afterprint",o))};document.title=a,window.addEventListener("afterprint",o,{once:!0}),window.print(),window.setTimeout(o,1e3)}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const s=this.root.querySelector(".main-content");s?s.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}getDataSourceLabel(){return this.state.mode==="ha"?"Home Assistant":"Standalone"}getHostedDataNoticeHtml(){var e;return(((e=this.state.credentials)==null?void 0:e.proxy_url)??"").trim().length>0,""}render(){var d;const{tab:e,loading:s,error:a,theme:n}=this.state,o=this.getDataSourceLabel(),r=this.getHostedDataNoticeHtml();if(s&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${St(e,p=>{},!1,n,o)}
          <main class="main-content">
            ${r}
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `,this.attachNavListeners();return}if(a&&!this.state.rangeData){const p=a.toLowerCase().includes("missing data");this.root.innerHTML=`
        <div class="app-shell">
          ${St(e,y=>{},!1,n,o)}
          <main class="main-content">
            ${r}
            <div class="error-state">
              <h2>${p?"Missing Data":"Connection Error"}</h2>
              <p>${p?"The selected period could not be loaded because data is missing.":a}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(d=this.root.querySelector("#retry-btn"))==null||d.addEventListener("click",()=>this.loadData());return}this.state.rangeData&&this.normalizeChartTimeBucket();let i="";switch(e){case"dashboard":i=Ia(this.state);break;case"charts":i=Dr(this.state);break;case"sensors":i=Lr(this.state.sensors);break;case"invoice":i=zr(this.state);break;case"settings":i=on(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${St(e,p=>this.changeTab(p),this.state.isMenuOpen,n,o)}
        <main class="main-content">
          ${r}
          ${s?'<div class="loading-bar"></div>':""}
          ${i}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachAnalysisListeners(),this.attachInvoiceListeners(),this.attachSensorListeners(),this.attachSettingsListeners()}attachSensorListeners(){const e=this.root.querySelector("#sensor-filter");if(!e)return;const s=this.root.querySelector("#sensors-no-match");e.addEventListener("input",()=>{const a=e.value.trim().toLowerCase();let n=0;this.root.querySelectorAll(".sensor-group").forEach(o=>{let r=0;o.querySelectorAll("[data-sensor-search]").forEach(i=>{const d=!a||(i.dataset.sensorSearch??"").includes(a);i.hidden=!d,d&&(r+=1)}),o.hidden=r===0,n+=r}),s&&(s.hidden=n>0)})}attachNavListeners(){var e,s;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(s=this.root.querySelector("[data-theme-toggle]"))==null||s.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.tab;this.changeTab(n)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.range;this.changeRange(i)})});const s=this.root.querySelector("#custom-start"),a=this.root.querySelector("#custom-end");s&&s.addEventListener("change",()=>{this.state.customStart=s.value}),a&&a.addEventListener("change",()=>{this.state.customEnd=a.value});const n=this.root.querySelector("#apply-custom-range");if(n==null||n.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.chartUnit;i!==this.state.chartUnit&&(this.state.chartUnit=i,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-bucket]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.chartBucket,{start:d,end:p}=this.getDateRangeISO();We(i,Tt(d,p))&&i!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=i,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-period-nav]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.chartPeriodNav==="next"?1:-1;this.shiftChartPeriod(i)})}),this.root.querySelectorAll("[data-chart-view]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.chartView;i!==this.state.chartConsumptionView&&(this.state.chartConsumptionView=i,this.renderPreserveMainScroll())})}),!e){const r=this.root.querySelector("#energy-chart");r&&this.state.rangeData&&this.initChart(r)}const o=this.root.querySelector(".reset-zoom-btn");o==null||o.addEventListener("click",async()=>{const{resetChartZoom:r}=await ne(async()=>{const{resetChartZoom:i}=await import("./Charts-BoxE657-.js");return{resetChartZoom:i}},[]);if(r(),o.style.display="none",this.clearChartViewport(),this.preZoomRange!==null){const i=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",i==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(i)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachAnalysisListeners(){this.root.querySelectorAll("[data-analysis-section]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisSection;if(s===this.state.analysisSection)return;this.state.analysisSection=s,this.render();const a=this.root.querySelector(".main-content");a?a.scrollTop=0:window.scrollTo({top:0}),this.shouldLoadComparison()&&this.loadAnalysisComparison()})}),this.root.querySelectorAll("[data-analysis-heatmap]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisHeatmap;s!==this.state.analysisHeatmapMetric&&(this.state.analysisHeatmapMetric=s,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-profile]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisProfile;s!==this.state.analysisProfileMetric&&(this.state.analysisProfileMetric=s,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-comparison-mode]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisComparisonMode;s!==this.state.analysisComparisonMode&&(this.state.analysisComparisonMode=s,this.state.analysisComparison=null,this.loadAnalysisComparison(!0))})})}attachInvoiceListeners(){var e;(e=this.root.querySelector("#print-invoice-btn"))==null||e.addEventListener("click",()=>{this.printInvoice()})}attachSettingsListeners(){var p,y,w,b;const e=this.root.querySelector("#credentials-form");if(e){const l=this.root.querySelector("#add-meter-btn");l==null||l.addEventListener("click",()=>{var _,C,M;const S=new FormData(e),k=g(S);if(k.length<10){k.push({id:"",types:["consumption"]});const c={api_key:S.get("api_key")||((_=this.state.credentials)==null?void 0:_.api_key)||"",energy_id:S.get("energy_id")||((C=this.state.credentials)==null?void 0:C.energy_id)||"",meters:k,proxy_url:S.get("proxy_url")||((M=this.state.credentials)==null?void 0:M.proxy_url)||""};this.state.credentials=c,Mt(c),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach(S=>{S.addEventListener("click",()=>{var c,v,h;const k=parseInt(S.dataset.meter??"0",10),_=new FormData(e),C=g(_);C.splice(k,1);const M={api_key:_.get("api_key")||((c=this.state.credentials)==null?void 0:c.api_key)||"",energy_id:_.get("energy_id")||((v=this.state.credentials)==null?void 0:v.energy_id)||"",meters:C,proxy_url:_.get("proxy_url")||((h=this.state.credentials)==null?void 0:h.proxy_url)||""};this.state.credentials=M,Mt(M),this.renderPreserveMainScroll()})});const g=S=>{var _,C,M,c,v,h;const k=[];for(let f=0;f<10;f++){const $=S.get(`meter_${f}_id`);if($===null)break;const E=[];(_=e.querySelector(`[name="meter_${f}_consumption"]`))!=null&&_.checked&&E.push("consumption"),(C=e.querySelector(`[name="meter_${f}_production"]`))!=null&&C.checked&&E.push("production"),(M=e.querySelector(`[name="meter_${f}_solar_consumption"]`))!=null&&M.checked&&E.push("solar_consumption"),(c=e.querySelector(`[name="meter_${f}_export"]`))!=null&&c.checked&&E.push("export"),(v=e.querySelector(`[name="meter_${f}_export_consumption"]`))!=null&&v.checked&&E.push("export_consumption"),(h=e.querySelector(`[name="meter_${f}_gas"]`))!=null&&h.checked&&E.push("gas"),k.push({id:$.trim(),types:E})}return k};e.addEventListener("submit",async S=>{S.preventDefault();const k=new FormData(e),_={api_key:k.get("api_key"),energy_id:k.get("energy_id"),meters:g(k),proxy_url:k.get("proxy_url")},C=this.root.querySelector("#creds-status");try{Mt(_);const{saveCredentials:M}=await ne(async()=>{const{saveCredentials:h}=await Promise.resolve().then(()=>ge);return{saveCredentials:h}},void 0);await M(_),C&&(C.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=_,this.state.error=null;const c=!1,v=(_.proxy_url??"").trim();await this.loadData()}catch(M){C&&(C.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${M instanceof Error?M.message:M}</p>`)}});const m=this.root.querySelector("#test-creds-btn");m==null||m.addEventListener("click",async()=>{const S=new FormData(e),k={api_key:S.get("api_key"),energy_id:S.get("energy_id"),meters:g(S),proxy_url:S.get("proxy_url")},_=this.root.querySelector("#creds-status");_&&(_.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:C}=await ne(async()=>{const{testCredentials:c}=await Promise.resolve().then(()=>ge);return{testCredentials:c}},void 0),M=await C(k);_&&(_.innerHTML=M.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${M.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${M.message}</p>`)}catch(C){_&&(_.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${C instanceof Error?C.message:C}</p>`)}})}const s=this.root.querySelector("#settings-form");if(!s)return;const a=l=>{const g=[];for(let m=0;m<24;m++){const S=l.get(`consumption_window_${m}_label`),k=l.get(`consumption_window_${m}_day_group`),_=l.get(`consumption_window_${m}_start_time`),C=l.get(`consumption_window_${m}_end_time`),M=l.get(`consumption_window_${m}_rate`);if(S===null&&k===null&&_===null&&C===null&&M===null)break;g.push({label:(S??"").trim()||`Window ${m+1}`,day_group:k??"all",start_time:_??"00:00",end_time:C??"06:00",rate:parseFloat(M??"0")||0})}return g},n=l=>{const g=[];for(let m=0;m<24;m++){const S=l.get(`reference_window_${m}_label`),k=l.get(`reference_window_${m}_day_group`),_=l.get(`reference_window_${m}_start_time`),C=l.get(`reference_window_${m}_end_time`),M=l.get(`reference_window_${m}_reference_power_kw`);if(S===null&&k===null&&_===null&&C===null&&M===null)break;g.push({label:(S??"").trim()||`Reference ${m+1}`,day_group:k??"all",start_time:_??"17:00",end_time:C??"00:00",reference_power_kw:parseFloat(M??"0")||0})}return g},o=l=>{var m,S,k;const g=[];for(let _=0;_<50;_++){const C=l.get(`adjustment_${_}_id`);if(C===null)break;const M=l.get(`adjustment_${_}_label`),c=l.get(`adjustment_${_}_commodity`),v=l.get(`adjustment_${_}_basis`),h=l.get(`adjustment_${_}_amount_gross`),f=l.get(`adjustment_${_}_start_date`),$=l.get(`adjustment_${_}_end_date`),E=l.get(`adjustment_${_}_preset_id`),D=l.get(`adjustment_${_}_eligibility_note`),K=l.get(`adjustment_${_}_suspends_compensation`);g.push({id:(C??"").trim()||`custom-${_+1}`,label:(M??"").trim()||`Adjustment ${_+1}`,enabled:((m=s.querySelector(`[name="adjustment_${_}_enabled"]`))==null?void 0:m.checked)??!1,commodity:c==="gas"?"gas":"electricity",basis:v==="gas_volume_m3"?"gas_volume_m3":"grid_import_kwh",amount_gross:parseFloat(h??"0")||0,start_date:f??"",end_date:$??"",vat_included:((S=s.querySelector(`[name="adjustment_${_}_vat_included"]`))==null?void 0:S.checked)??!1,preset_id:(E??"").trim(),eligibility_note:(D??"").trim(),tariff_already_includes_adjustment:((k=s.querySelector(`[name="adjustment_${_}_tariff_already_includes_adjustment"]`))==null?void 0:k.checked)??!1,suspends_compensation:K!==null?K==="1":(E??"").trim()===ot})}return g},r=()=>{var c;const l=new FormData(s),g={};s.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.name.startsWith("adjustment_")||(g[v.name]=v.checked)});const m=[],S=/^feed_in_rate_(\d+)_(.+)$/,k={},_=[],C=/^meter_fee_(\d+)_(.+)$/,M={};for(const[v,h]of l.entries()){if(v.startsWith("consumption_window_")||v.startsWith("reference_window_")||v.startsWith("adjustment_"))continue;const f=v.match(S);if(f){const L=f[1],F=f[2];k[L]||(k[L]={}),k[L][F]=h;continue}const $=v.match(C);if($){const L=$[1],F=$[2];M[L]||(M[L]={}),M[L][F]=h;continue}if(g[v]!==void 0&&typeof g[v]=="boolean")continue;const E=h,D=s.elements.namedItem(v);if(E===""&&D instanceof HTMLInputElement&&D.type==="number"){const L=(c=this.state.config)==null?void 0:c[v];typeof L=="number"&&isFinite(L)&&(g[v]=L);continue}const K=parseFloat(E);g[v]=isNaN(K)?E:K}for(const v of Object.keys(k).sort()){const h=k[v],f=h.mode??"fixed",$=f==="sensor"?h.fallback_tariff??h.tariff:h.tariff,E=(h.self_use_priority??"").trim(),D=parseInt(E,10);m.push({meter_id:h.meter_id??"",mode:f,tariff:parseFloat($??"0.08")||.08,sensor_entity:h.sensor_entity??"",display_name:(h.display_name??"").trim(),self_use_priority:E===""||!isFinite(D)?null:Math.max(1,D)})}m.length>0&&(g.feed_in_rates=m);for(const v of Object.keys(M).sort()){const h=M[v];_.push({meter_id:h.meter_id??"",label:h.label??"",fee:parseFloat(h.fee??"0")||0})}return _.length>0&&(g.meter_monthly_fees=_),g.consumption_rate_windows=a(l),g.reference_power_windows=n(l),g.billing_adjustments=o(l),g},i=l=>{if(!this.state.config)return;const g=r();l(g),this.state.config={...this.state.config,...g},this.renderPreserveMainScroll()};if((p=this.root.querySelector("#add-consumption-window-btn"))==null||p.addEventListener("click",()=>{i(l=>{var m;const g=Array.isArray(l.consumption_rate_windows)?[...l.consumption_rate_windows]:[];g.push({label:`Window ${g.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((m=this.state.config)==null?void 0:m.energy_variable_rate)??.1125}),l.consumption_rate_windows=g})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(l=>{l.addEventListener("click",()=>{const g=parseInt(l.dataset.window??"0",10);i(m=>{const S=Array.isArray(m.consumption_rate_windows)?[...m.consumption_rate_windows]:[];S.splice(g,1),m.consumption_rate_windows=S})})}),(y=this.root.querySelector("#add-reference-window-btn"))==null||y.addEventListener("click",()=>{i(l=>{var m;const g=Array.isArray(l.reference_power_windows)?[...l.reference_power_windows]:[];g.push({label:`Reference ${g.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((m=this.state.config)==null?void 0:m.reference_power_kw)??5}),l.reference_power_windows=g})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(l=>{l.addEventListener("click",()=>{const g=parseInt(l.dataset.window??"0",10);i(m=>{const S=Array.isArray(m.reference_power_windows)?[...m.reference_power_windows]:[];S.splice(g,1),m.reference_power_windows=S})})}),(w=this.root.querySelector("#add-adjustment-btn"))==null||w.addEventListener("click",()=>{i(l=>{const g=Array.isArray(l.billing_adjustments)?[...l.billing_adjustments]:[];g.push({id:`custom-${Date.now()}`,label:`Adjustment ${g.length+1}`,enabled:!0,commodity:"electricity",basis:"grid_import_kwh",amount_gross:0,start_date:"",end_date:"",vat_included:!0,preset_id:"",eligibility_note:"",tariff_already_includes_adjustment:!1}),l.billing_adjustments=g})}),this.root.querySelectorAll(".remove-adjustment-btn").forEach(l=>{l.addEventListener("click",()=>{const g=parseInt(l.dataset.adjustment??"0",10);i(m=>{const S=Array.isArray(m.billing_adjustments)?[...m.billing_adjustments]:[];S.splice(g,1),m.billing_adjustments=S})})}),(b=this.root.querySelector("#restore-adjustment-presets-btn"))==null||b.addEventListener("click",()=>{i(l=>{const m=(Array.isArray(l.billing_adjustments)?[...l.billing_adjustments]:[]).filter(S=>!S.preset_id);l.billing_adjustments=[...Fr(!0),...m]})}),s.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(l=>{l.addEventListener("change",()=>{const g=l.name.match(/feed_in_rate_(\d+)_mode/);if(!g)return;const m=g[1],S=s.querySelector(`.feed-in-fixed-fields[data-rate-idx="${m}"]`),k=s.querySelector(`.feed-in-sensor-fields[data-rate-idx="${m}"]`);S&&(S.style.display=l.value==="fixed"?"":"none"),k&&(k.style.display=l.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const l=this.root.querySelector("#ha-entity-list");l&&Fs().then(({entities:g})=>{l.innerHTML=g.map(m=>`<option value="${m}"></option>`).join("")}).catch(()=>{})}this.root.querySelectorAll("details[data-section]").forEach(l=>{l.addEventListener("toggle",()=>{Ms(l.dataset.section??"",l.open)})}),this.root.querySelectorAll("[data-sections-toggle]").forEach(l=>{l.addEventListener("click",()=>{const g=l.dataset.sectionsToggle==="open";this.root.querySelectorAll("details[data-section]").forEach(m=>{m.open=g,Ms(m.dataset.section??"",g)})})}),s.addEventListener("submit",async l=>{l.preventDefault();const g=r();this.setSettingsStatus("Saving…","pending");try{const{saveConfig:m}=await ne(async()=>{const{saveConfig:S}=await Promise.resolve().then(()=>ge);return{saveConfig:S}},void 0);await m(g),this.state.config=await Ke(),this.renderPreserveMainScroll(),this.setSettingsStatus("Configuration saved","ok")}catch(m){this.setSettingsStatus(`Save failed: ${m instanceof Error?m.message:String(m)}`,"error")}});const d=this.root.querySelector("#reset-config-btn");d==null||d.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?")){this.setSettingsStatus("Resetting…","pending");try{const{resetConfig:l}=await ne(async()=>{const{resetConfig:g}=await Promise.resolve().then(()=>ge);return{resetConfig:g}},void 0);await l(),this.state.config=await Ke(),this.renderPreserveMainScroll(),this.setSettingsStatus("Reset to defaults","ok")}catch(l){this.setSettingsStatus(`Reset failed: ${l instanceof Error?l.message:String(l)}`,"error")}}})}setSettingsStatus(e,s){const a=this.root.querySelector("#settings-status");a&&(a.className=`form-status form-status-${s}`,a.textContent=e,s==="ok"&&window.setTimeout(()=>{a.textContent===e&&(a.textContent="")},4e3))}async initChart(e){var s,a,n,o;try{const{renderEnergyChart:r}=await ne(async()=>{const{renderEnergyChart:_}=await import("./Charts-BoxE657-.js");return{renderEnergyChart:_}},[]),{start:i,end:d}=this.getDateRangeISO(),p=this.state.chartViewportStart?new Date(this.state.chartViewportStart).getTime():void 0,y=this.state.chartViewportEnd?new Date(this.state.chartViewportEnd).getTime():void 0;let w=this.state.consumptionTimeseries,b=this.state.productionTimeseries,l=this.state.gridImportTimeseries,g=this.state.marketExportTimeseries;if(!w||!b||!l||!g){const _=await this.fetchEnergyFlowTimeseries(i,d);w=_.consumptionTimeseries,b=_.productionTimeseries,l=_.gridImportTimeseries,g=_.marketExportTimeseries,this.state.consumptionTimeseries=w,this.state.productionTimeseries=b,this.state.gridImportTimeseries=l,this.state.marketExportTimeseries=g}const m=((s=this.state.config)==null?void 0:s.reference_power_kw)??0,S=(((a=this.state.config)==null?void 0:a.meters)??[]).filter(_=>_.types.includes("production")||_.types.includes("solar_consumption"));let k;if((o=(n=this.state.perMeterProductionTimeseries)==null?void 0:n.meters)!=null&&o.length)k=this.state.perMeterProductionTimeseries.meters;else if(S.length>1)try{const _=await Ct("1-1:2.29.0",i,d);_.meters&&_.meters.length>1&&(k=_.meters,this.state.perMeterProductionTimeseries=_)}catch(_){console.warn("Per-meter timeseries fetch failed, using merged view:",_)}r(e,w,b,{unit:this.state.chartUnit,consumptionView:this.state.chartConsumptionView,referencePowerKw:m,gridImportTimeseries:l,marketExportTimeseries:g,perMeterProduction:k,viewportStartMs:p,viewportEndMs:y,timeBucket:this.state.chartTimeBucket,onZoomChange:(_,C)=>{this.handleChartZoomChange(_,C)}})}catch(r){console.error("Chart init failed:",r)}}async handleChartZoomChange(e,s){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd),this.state.error=null,this.state.loading=!0,this.renderPreserveMainScroll();const{fetchCustomData:a}=await ne(async()=>{const{fetchCustomData:p}=await Promise.resolve().then(()=>ge);return{fetchCustomData:p}},void 0),n=e.slice(0,10),o=s.slice(0,10);this.resetAnalysisComparison();const r=await a(e,s),[i,d]=await Promise.all([this.fetchEnergyFlowTimeseries(e,s),this.fetchPerMeterProductionForRange(this.state.config,e,s)]);this.state.range="custom",this.state.customStart=n,this.state.customEnd=o,this.state.chartViewportStart=e,this.state.chartViewportEnd=s,this.state.rangeData={range:"custom",consumption:r.consumption,production:r.production,exported:r.exported??0,self_consumed:r.self_consumed??0,gas_energy:r.gas_energy??0,gas_volume:r.gas_volume??0,grid_import:r.grid_import,solar_to_home:r.solar_to_home,direct_solar_to_home:r.direct_solar_to_home,shared:r.shared,shared_with_me:r.shared_with_me,peak_power_kw:r.peak_power_kw??0,exceedance_kwh:r.exceedance_kwh??0,metering_point:r.metering_point??"",start:r.start,end:r.end},this.state.consumptionTimeseries=i.consumptionTimeseries,this.state.productionTimeseries=i.productionTimeseries,this.state.gridImportTimeseries=i.gridImportTimeseries,this.state.marketExportTimeseries=i.marketExportTimeseries,this.state.perMeterProductionTimeseries=d,this.state.loading=!1,this.renderPreserveMainScroll()}catch(a){console.error("Zoom data fetch failed:",a),this.state.loading=!1,this.clearRangeStateWithError(a,"Missing data"),this.render()}}getDateRangeISO(){if(this.state.chartViewportStart&&this.state.chartViewportEnd)return{start:this.state.chartViewportStart,end:this.state.chartViewportEnd};const e=new Date,s=a=>De(a);switch(this.state.range){case"custom":{const a=new Date(this.state.customStart+"T00:00:00"),n=new Date(this.state.customEnd+"T23:59:59.999");return{start:s(a),end:s(n)}}case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const n=new Date(a);return n.setHours(23,59,59,999),{start:s(a),end:s(n)}}case"this_week":{const a=new Date(e),n=a.getDay()||7;return a.setDate(a.getDate()-n+1),a.setHours(0,0,0,0),{start:s(a),end:s(e)}}case"last_week":{const a=new Date(e),n=a.getDay()||7,o=new Date(a);o.setDate(a.getDate()-n),o.setHours(23,59,59,999);const r=new Date(o);return r.setDate(o.getDate()-6),r.setHours(0,0,0,0),{start:s(r),end:s(o)}}case"this_month":{const a=new Date(e.getFullYear(),e.getMonth(),1);return{start:s(a),end:s(e)}}case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),n=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s(a),end:s(n)}}case"this_year":{const a=new Date(e.getFullYear(),0,1);return{start:s(a),end:s(e)}}case"last_year":{const a=new Date(e.getFullYear()-1,0,1),n=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s(a),end:s(n)}}default:{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const n=new Date(a);return n.setHours(23,59,59,999),{start:s(a),end:s(n)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new hn(t).mount()}export{Na as b};
