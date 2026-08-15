var ga=Object.defineProperty;var ya=(t,e,s)=>e in t?ga(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var $e=(t,e,s)=>ya(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const va="modulepreload",fa=function(t){return"/leneda-panel/static/"+t},os={},oe=function(e,s,a){let n=Promise.resolve();if(s&&s.length>0){let r=function(p){return Promise.all(p.map(g=>Promise.resolve(g).then(w=>({status:"fulfilled",value:w}),w=>({status:"rejected",reason:w}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),d=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));n=r(s.map(p=>{if(p=fa(p),p in os)return;os[p]=!0;const g=p.endsWith(".css"),w=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${w}`))return;const $=document.createElement("link");if($.rel=g?"stylesheet":va,g||($.as="script"),$.crossOrigin="",$.href=p,d&&$.setAttribute("nonce",d),document.head.appendChild($),g)return new Promise((l,m)=>{$.addEventListener("load",l),$.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${p}`)))})}))}function o(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return n.then(r=>{for(const i of r||[])i.status==="rejected"&&o(i.reason);return e().catch(o)})};function Ss(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()})),proxy_url:(t.proxy_url??"").trim()}}function wa(){var t,e,s,a,n;try{const o=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((n=(a=(s=o==null?void 0:o.hass)==null?void 0:s.auth)==null?void 0:a.data)==null?void 0:n.access_token)??null}catch{return null}}async function Y(t,e){const s=wa(),a={...e==null?void 0:e.headers,...s?{Authorization:`Bearer ${s}`}:{}},n={...e,credentials:"include",headers:a},o=await fetch(t,n);if(!o.ok){const r=o.headers.get("content-type")??"";let i="",d="";if(r.includes("application/json")){const p=await o.json().catch(()=>null);i=String((p==null?void 0:p.error)??"").trim(),d=String((p==null?void 0:p.message)??(p==null?void 0:p.error)??"").trim()}else d=(await o.text().catch(()=>"")).trim();throw i==="missing_data"||i==="no_data"||o.status===503?new Error("Missing data"):new Error(d?`API ${o.status}: ${d}`:`API ${o.status}: ${o.statusText}`)}return o.json()}async function qe(t){return Y(`/leneda_api/data?range=${t}`)}async function $a(t,e){return Y(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function We(t,e,s){let a=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),Y(a)}async function _t(t,e,s){let a=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),Y(a)}async function xt(){return Y("/leneda_api/sensors")}async function Ke(){return Y("/leneda_api/config")}async function ba(t){await Y("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function _a(){await Y("/leneda_api/config/reset",{method:"POST"})}async function Ms(){try{return await Y("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function Cs(){return Y("/leneda_api/credentials")}async function xa(t){const e=Ss(t);await Y("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function ka(t){const e=Ss(t);return Y("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Ts(){return Y("/leneda_api/ha-entities")}const ge=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:Ke,fetchCredentials:Cs,fetchCustomData:$a,fetchHAEntities:Ts,fetchMode:Ms,fetchPerMeterTimeseries:_t,fetchRangeData:qe,fetchSensors:xt,fetchTimeseries:We,resetConfig:_a,saveConfig:ba,saveCredentials:xa,testCredentials:ka},Symbol.toStringTag,{value:"Module"})),Dt=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function is(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function Sa(t,e){if(!t||!e)return"";const s=new Date(t),a=new Date(e);if(Number.isNaN(s.getTime())||Number.isNaN(a.getTime()))return"";const n=s.toLocaleDateString(),o=a.toLocaleDateString();return n===o?n:`${n} — ${o}`}function Lt(t){var n,o,r,i;const e=is(((n=t.rangeData)==null?void 0:n.start)??t.customStart),s=is(((o=t.rangeData)==null?void 0:o.end)??t.customEnd),a=Sa((r=t.rangeData)==null?void 0:r.start,(i=t.rangeData)==null?void 0:i.end);return`
    <div class="period-bar">
      <div class="range-selector" role="group" aria-label="Select period">
        ${Dt.map(d=>`
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
  `}function Wt(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(e){const[,s,a,n]=e;return new Date(Number(s),Number(a)-1,Number(n))}return new Date(t)}function N(t){return t==null||!Number.isFinite(t)?0:(t<0?-1:1)*Math.round(Number((Math.abs(t)*100).toFixed(6)))/100}function c(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function ce(t){return Wt(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function Es(t){return Wt(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function ze(t){return Wt(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}const Ma={grid:`
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
  `};function ue(t){const{x:e,y:s,r:a,glyph:n,color:o,kicker:r,value:i,detail:d,text:p,compact:g=!1,prefix:w}=t,$=a*1.24/24,l=`
    <g class="scene-node-badge" transform="translate(${e}, ${s})" color="${o}">
      <circle r="${a+18}" class="scene-node-aura" fill="${o}" />
      <circle r="${a+7}" class="scene-node-halo" fill="${o}" />
      <circle r="${a}" class="scene-node-plate" fill="url(#${w}-plate)" stroke="${o}" />
      <circle r="${a-1}" class="scene-node-wash" fill="${o}" />
      <g class="scene-node-glyph" transform="scale(${$.toFixed(3)}) translate(-12, -12)">
        ${Ma[n]}
      </g>
    </g>
  `;if(p==="none")return l;const m=g?9:11,h=g?18:28;if(p==="right"){const x=e+a+20;return`
      ${l}
      <g class="scene-node-text" text-anchor="start">
        <text x="${x}" y="${s-12}" class="scene-node-kicker">${r}</text>
        ${i?`<text x="${x}" y="${s+10}" class="scene-node-value">${i}</text>`:""}
        ${d?`<text x="${x}" y="${s+28}" class="scene-node-detail">${d}</text>`:""}
      </g>
    `}const b=s+a+h;return`
    ${l}
    <g class="scene-node-text" text-anchor="middle">
      <text x="${e}" y="${b}" class="scene-node-kicker" style="font-size:${m}px">${r}</text>
      ${i?`<text x="${e}" y="${b+(g?18:22)}" class="scene-node-value">${i}</text>`:""}
      ${d?`<text x="${e}" y="${b+(g?34:40)}" class="scene-node-detail">${d}</text>`:""}
    </g>
  `}function Z(t){const{id:e,path:s,from:a,to:n,value:o,max:r,color:i,reverse:d=!1,label:p}=t,g=r>0?Math.min(1,o/r):0,w=o>0?3.2+g*6:2,$=o<=0,l=(2.6-g*1.3).toFixed(2),[m,h]=d?[n,a]:[a,n];return`
    <g class="flow-link${$?" flow-link-idle":""}" color="${i}">
      <title>${p}</title>
      <linearGradient
        id="${e}"
        gradientUnits="userSpaceOnUse"
        x1="${m.x}" y1="${m.y}" x2="${h.x}" y2="${h.y}"
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
      ${$?"":`
      <path
        class="flow-pulse"
        d="${s}"
        stroke="url(#${e})"
        stroke-width="${w.toFixed(1)}"
        style="animation-duration:${l}s${d?";animation-direction:reverse":""}"
        fill="none"
      />`}
    </g>
  `}function Ds(t){const{cx:e,apexY:s,eavesY:a,baseY:n,halfWidth:o,ringY:r,ringR:i,coverage:d,usageLabel:p,usageValue:g,prefix:w}=t,$=e-o,l=e+o,m=Math.round(o*.09),h=(a-s)/o,b={x:e+o*.16,y:s+o*.16*h+9},x={x:e+o*.7,y:s+o*.7*h+9},S=Math.hypot(x.x-b.x,x.y-b.y),C=Math.atan2(x.y-b.y,x.x-b.x)*180/Math.PI,M=Math.max(6,o*.1),u=4,f=2*Math.PI*(i-5),y=Math.min(100,Math.max(0,d));return`
    <g class="elite-house">
      <ellipse cx="${e}" cy="${n+10}" rx="${o*1.5}" ry="${Math.max(10,o*.16)}" fill="url(#${w}-house-shadow)" />

      <path
        class="house-roof"
        d="M ${$-m} ${a+2} L ${e} ${s} L ${l+m} ${a+2} Z"
        fill="url(#${w}-roof)"
      />
      <path
        class="house-body"
        d="M ${$} ${a} H ${l} V ${n} H ${$} Z"
        fill="url(#${w}-body)"
      />
      <path class="house-ridge" d="M ${e} ${s+3} L ${e} ${a}" />

      <g class="house-panels" transform="translate(${b.x.toFixed(1)}, ${b.y.toFixed(1)}) rotate(${C.toFixed(2)})">
        <rect
          x="0" y="${(-M/2).toFixed(1)}"
          width="${S.toFixed(1)}" height="${M.toFixed(1)}"
          rx="2"
          fill="var(--clr-production)"
        />
        ${Array.from({length:u-1},(v,k)=>`<path d="M ${((k+1)*S/u).toFixed(1)} ${(-M/2).toFixed(1)} V ${(M/2).toFixed(1)}" class="house-panel-divider" />`).join("")}
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
          stroke-dasharray="${f.toFixed(1)}"
          stroke-dashoffset="${(f*(1-y/100)).toFixed(1)}"
          transform="rotate(-90)"
        />
        <text y="${i>32?-6:-5}" text-anchor="middle" class="house-ring-kicker">SOLAR</text>
        <text y="${i>32?15:14}" text-anchor="middle" class="house-ring-value-text">${c(y,0)}%</text>
      </g>

      ${p&&g?`
      <text x="${e}" y="${n-30}" text-anchor="middle" class="house-total-label">${p}</text>
      <text x="${e}" y="${n-10}" text-anchor="middle" class="house-total-value">${g}</text>
      `:""}
    </g>
  `}function Ls(t){return`
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
  `}function Ws(t,e,s,a,n,o){return`
    <rect x="${e}" y="${s}" width="${a}" height="${n}" rx="${o}" class="scene-shell" fill="url(#${t}-shell)" />
    <rect x="${e}" y="${s}" width="${a}" height="${n}" rx="${o}" fill="url(#${t}-grid)" />
    <rect x="${e}" y="${s}" width="${a}" height="${n}" rx="${o}" fill="url(#${t}-scene-glow)" />
  `}function Ca(t,e){const{hasGas:s}=t,a=s?640:430,n="flowd",o=186,r=386,i=108,d=450-i,p=450+i;return`
    <svg
      class="elite-main-svg"
      viewBox="0 0 900 ${a}"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Energy flow between the grid, your solar panels, the energy community and your home for the selected period"
    >
      ${Ls(n)}
      ${Ws(n,16,16,868,a-32,30)}

      ${Ds({cx:450,apexY:o,eavesY:256,baseY:r,halfWidth:i,ringY:296,ringR:34,coverage:t.selfSufficiency,usageLabel:"Home usage",usageValue:`${c(t.totalHomeEnergy)} kWh`,prefix:n})}

      ${ue({prefix:n,x:450,y:82,r:40,glyph:"solar",color:"var(--clr-production)",text:"right",kicker:"Solar",value:`${c(t.production)} kWh`,detail:`${c(t.solarToHome)} kWh used at home`})}

      ${ue({prefix:n,x:110,y:290,r:40,glyph:"grid",color:"var(--clr-consumption)",text:"below",kicker:"Grid",value:`${c(t.boughtFromGrid+t.soldToMarket)} kWh`,detail:`In ${c(t.boughtFromGrid)} · out ${c(t.soldToMarket)}`})}

      ${ue({prefix:n,x:790,y:290,r:40,glyph:"community",color:"var(--clr-community)",text:"below",kicker:"Community",value:`${c(t.communityExchange)} kWh`,detail:`Sent ${c(t.shared)} · got ${c(t.sharedWithMe)}`})}

      ${s?ue({prefix:n,x:450,y:494,r:38,glyph:"gas",color:"var(--clr-gas)",text:"below",kicker:"Gas",value:t.gasVolume>0?`${c(t.gasEnergy)} kWh · ${c(t.gasVolume)} m³`:`${c(t.gasEnergy)} kWh`}):""}

      ${Z({id:`${n}-solar`,path:`M 450 130 L 450 ${o-4}`,from:{x:450,y:130},to:{x:450,y:o-4},value:t.directSolarToHome,max:e,color:"var(--clr-production)",label:`Solar to home: ${c(t.directSolarToHome)} kWh`})}

      ${Z({id:`${n}-import`,path:`M 158 274 C 220 266, 280 266, ${d-4} 274`,from:{x:158,y:274},to:{x:d-4,y:274},value:t.boughtFromGrid,max:e,color:"var(--clr-consumption)",label:`Bought from the grid: ${c(t.boughtFromGrid)} kWh`})}

      ${Z({id:`${n}-export`,path:`M ${d-4} 330 C 280 338, 220 338, 158 330`,from:{x:d-4,y:330},to:{x:158,y:330},value:t.soldToMarket,max:e,color:"var(--clr-export)",label:`Exported to the grid: ${c(t.soldToMarket)} kWh`})}

      ${Z({id:`${n}-shared`,path:`M ${p+4} 274 C 620 266, 680 266, 742 274`,from:{x:p+4,y:274},to:{x:742,y:274},value:t.shared,max:e,color:"var(--clr-community)",label:`Shared with the community: ${c(t.shared)} kWh`})}

      ${Z({id:`${n}-received`,path:`M 742 330 C 680 338, 620 338, ${p+4} 330`,from:{x:742,y:330},to:{x:p+4,y:330},value:t.sharedWithMe,max:e,color:"var(--clr-community)",reverse:!0,label:`Received from the community: ${c(t.sharedWithMe)} kWh`})}

      ${s?Z({id:`${n}-gas`,path:`M 450 452 L 450 ${r+6}`,from:{x:450,y:452},to:{x:450,y:r+6},value:Math.min(t.gasEnergy,e),max:e,color:"var(--clr-gas)",reverse:!0,label:`Gas to the house: ${c(t.gasEnergy)} kWh`}):""}
    </svg>
  `}function Ta(t,e){const{hasGas:s}=t,a=s?430:330,n="flowm",o=148,r=288,i=70,d=210-i,p=210+i;return`
    <svg
      class="elite-main-svg"
      viewBox="0 0 420 ${a}"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Energy flow between the grid, your solar panels, the energy community and your home for the selected period"
    >
      ${Ls(n)}
      ${Ws(n,12,12,396,a-24,26)}

      ${Ds({cx:210,apexY:o,eavesY:196,baseY:r,halfWidth:i,ringY:238,ringR:30,coverage:t.selfSufficiency,prefix:n})}

      ${ue({prefix:n,x:210,y:60,r:28,glyph:"solar",color:"var(--clr-production)",text:"none",kicker:"Solar",compact:!0})}

      ${ue({prefix:n,x:56,y:220,r:26,glyph:"grid",color:"var(--clr-consumption)",text:"below",kicker:"Grid",compact:!0})}

      ${ue({prefix:n,x:364,y:220,r:26,glyph:"community",color:"var(--clr-community)",text:"below",kicker:"Community",compact:!0})}

      ${s?ue({prefix:n,x:210,y:372,r:26,glyph:"gas",color:"var(--clr-gas)",text:"none",kicker:"Gas",compact:!0}):""}

      ${Z({id:`${n}-solar`,path:`M 210 94 L 210 ${o-4}`,from:{x:210,y:94},to:{x:210,y:o-4},value:t.directSolarToHome,max:e,color:"var(--clr-production)",label:`Solar to home: ${c(t.directSolarToHome)} kWh`})}

      ${Z({id:`${n}-import`,path:`M 86 206 C 104 200, 120 200, ${d-4} 206`,from:{x:86,y:206},to:{x:d-4,y:206},value:t.boughtFromGrid,max:e,color:"var(--clr-consumption)",label:`Bought from the grid: ${c(t.boughtFromGrid)} kWh`})}

      ${Z({id:`${n}-export`,path:`M ${d-4} 240 C 120 246, 104 246, 86 240`,from:{x:d-4,y:240},to:{x:86,y:240},value:t.soldToMarket,max:e,color:"var(--clr-export)",label:`Exported to the grid: ${c(t.soldToMarket)} kWh`})}

      ${Z({id:`${n}-shared`,path:`M ${p+4} 206 C 300 200, 318 200, 334 206`,from:{x:p+4,y:206},to:{x:334,y:206},value:t.shared,max:e,color:"var(--clr-community)",label:`Shared with the community: ${c(t.shared)} kWh`})}

      ${Z({id:`${n}-received`,path:`M 334 240 C 318 246, 300 246, ${p+4} 240`,from:{x:334,y:240},to:{x:p+4,y:240},value:t.sharedWithMe,max:e,color:"var(--clr-community)",reverse:!0,label:`Received from the community: ${c(t.sharedWithMe)} kWh`})}

      ${s?Z({id:`${n}-gas`,path:`M 210 342 L 210 ${r+6}`,from:{x:210,y:342},to:{x:210,y:r+6},value:Math.min(t.gasEnergy,e),max:e,color:"var(--clr-gas)",reverse:!0,label:`Gas to the house: ${c(t.gasEnergy)} kWh`}):""}
    </svg>
  `}function ls(t,e){const s=Math.max(t.totalHomeEnergy,t.production,t.boughtFromGrid,t.soldToMarket,t.shared,t.sharedWithMe,t.directSolarToHome,1);return`
    <div class="elite-scene elite-scene-${e}">
      ${e==="desktop"?Ca(t,s):Ta(t,s)}
    </div>
  `}const Ze=[{id:"year",label:"Year",shortLabel:"Yr",stepLabel:"year",approxMs:365*864e5,maxBuckets:30},{id:"month",label:"Month",shortLabel:"Mo",stepLabel:"month",approxMs:30*864e5,maxBuckets:72},{id:"week",label:"Week",shortLabel:"Wk",stepLabel:"week",approxMs:7*864e5,maxBuckets:104},{id:"day",label:"Day",shortLabel:"Day",stepLabel:"day",approxMs:864e5,maxBuckets:370},{id:"hour",label:"Hour",shortLabel:"Hr",stepLabel:"hour",approxMs:36e5,maxBuckets:744},{id:"quarter_hour",label:"15 min",shortLabel:"15m",stepLabel:"15 minutes",approxMs:15*6e4,maxBuckets:672}];function Ks(t){return Ze.find(e=>e.id===t)??Ze[3]}function kt(t,e){if(!t||!e)return 0;const s=new Date(t).getTime(),a=new Date(e).getTime();return!Number.isFinite(s)||!Number.isFinite(a)?0:Math.max(0,a-s)}function Fe(t,e){const s=Ks(t);if(e<=0)return t==="quarter_hour";const a=e/s.approxMs;return a>=1.5&&a<=s.maxBuckets}function Ea(t,e){var n;if(e&&Fe(e,t))return e;const s=t/864e5,a=s<=1.25?"quarter_hour":s<=7?"hour":s<=45?"day":s<=180?"week":s<=900?"month":"year";return Fe(a,t)?a:((n=Ze.find(o=>Fe(o.id,t)))==null?void 0:n.id)??"quarter_hour"}function Da(t,e){return new Date(t,e+1,0).getDate()}function ds(t,e,s){const a=t.getDate(),n=new Date(t),o=n.getMonth()+s,r=n.getFullYear()+e+Math.floor(o/12),i=(o%12+12)%12,d=Math.min(a,Da(r,i));return n.setFullYear(r,i,d),n}function cs(t,e,s){switch(e){case"year":return ds(t,s,0);case"month":return ds(t,0,s);case"week":return new Date(t.getTime()+s*7*864e5);case"day":return new Date(t.getTime()+s*864e5);case"hour":return new Date(t.getTime()+s*36e5);case"quarter_hour":return new Date(t.getTime()+s*15*6e4)}}function Fs(t,e,s,a){if(!t||!e)return null;const n=new Date(t),o=new Date(e);return!Number.isFinite(n.getTime())||!Number.isFinite(o.getTime())?null:{start:cs(n,s,a),end:cs(o,s,a)}}function La(t,e){if(!t||!e)return"No period loaded";const s=new Date(t),a=new Date(e);if(!Number.isFinite(s.getTime())||!Number.isFinite(a.getTime()))return"No period loaded";if(s.getFullYear()===a.getFullYear()&&s.getMonth()===a.getMonth()&&s.getDate()===a.getDate()){const o=s.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),r=s.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=a.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${o}, ${r} - ${i}`}return`${s.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})} - ${a.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}`}function be(t){const e=s=>`
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
      `)}}function Wa(t){var X,J,he,Pe,Re,ye,Q,ve;const e=t.rangeData,s=(e==null?void 0:e.consumption)??0,a=(e==null?void 0:e.production)??0,n=(e==null?void 0:e.exported)??0,o=(e==null?void 0:e.self_consumed)??0,r=(e==null?void 0:e.gas_energy)??0,i=(e==null?void 0:e.gas_volume)??0,d=(e==null?void 0:e.peak_power_kw)??0,p=(e==null?void 0:e.shared_with_me)??0,g=(e==null?void 0:e.shared)??0,w=Math.max(0,n),$=(e==null?void 0:e.grid_import)!=null?Math.max(0,s-e.grid_import):void 0,l=Math.max(0,(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(o>0?o:a-w),$??0),m=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??Math.max(0,l-p)),h=l,b=Math.max(0,(e==null?void 0:e.grid_import)??s-l),x=s>0?s:b+l,S=!!((X=t.config)!=null&&X.meter_has_gas||(((J=t.config)==null?void 0:J.meters)??[]).some(I=>I.types.includes("gas"))),C=g+p,M=x>0?Math.min(100,l/x*100):0,u=Math.max(x,a,b,w,g,p,m,1),f=S?Math.min(Math.max(0,r),u):0,y=I=>I>0?Math.max(18,Math.round(I/u*100)):0,v={production:a,directSolarToHome:m,solarToHome:l,boughtFromGrid:b,soldToMarket:w,shared:g,sharedWithMe:p,communityExchange:C,totalHomeEnergy:x,selfSufficiency:M,gasEnergy:r,gasVolume:i,hasGas:S},k=e!=null&&e.start&&(e!=null&&e.end)?`${ce(e.start)} — ${ce(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${ce(t.customStart+"T00:00:00")} — ${ce(t.customEnd+"T00:00:00")}`:((he=Dt.find(I=>I.id===t.range))==null?void 0:he.label)??"Yesterday",E=(Re=(Pe=t.consumptionTimeseries)==null?void 0:Pe.items)!=null&&Re.length?t.consumptionTimeseries.items:((ye=t.productionTimeseries)==null?void 0:ye.items)??[],L=t.chartViewportStart??((Q=E[0])==null?void 0:Q.startedAt)??(e==null?void 0:e.start),W=t.chartViewportEnd??((ve=E[E.length-1])==null?void 0:ve.startedAt)??(e==null?void 0:e.end),D=kt(L,W),P=Ks(t.chartTimeBucket),B=La(L,W),O=Fs(L,W,t.chartTimeBucket,1),V=new Date,z=!O||O.start.getTime()>V.getTime(),pe=Ze.map(I=>{const ke=Fe(I.id,D),st=I.id===t.chartTimeBucket,at=I.id==="quarter_hour"?"15-minute detail would be too dense for this selected period":`${I.label} detail does not add useful resolution for this selected period`;return`
            <button
              class="unit-btn chart-bucket-btn ${st?"active":""}"
              data-chart-bucket="${I.id}"
              title="${ke?`Show ${I.label.toLowerCase()} detail`:at}"
              ${ke?"":'disabled aria-disabled="true"'}
            >${I.label}</button>
          `}).join(""),le=t.chartUnit==="kw"?"kW uses the same detail presets as kWh, but keeps power values in interval bars so short spikes and dips stay visible.":"kWh keeps the aggregated period bars for totals.",de=`${t.chartConsumptionView==="house"?"Total Usage shows the full house load, with the solar-covered share highlighted in green and exports below zero. Use the detail presets and arrows above the graph to move through time.":t.chartConsumptionView==="solar_systems"?"PV Systems stacks each configured solar production meter so you can compare panel-system output like the Home Assistant Energy dashboard.":"Net Grid focuses on what still came from the grid after solar, with exports shown below zero. The reference limit in kW mode applies here."} ${le}`,U=((e==null?void 0:e.exceedance_kwh)??0)>0?be("warning"):be("ok"),H=I=>`
        <div class="stat-card ${I.modifier}">
          <div class="stat-icon">${be(I.icon)}</div>
          <div class="stat-body">
            <div class="stat-label">${I.label}</div>
            <div class="stat-value">${I.value} <span class="stat-unit">${I.unit}</span></div>
            <p class="stat-hint">${I.hint}</p>
          </div>
        </div>
  `;return`
    <div class="dashboard">
      ${Lt(t)}

      <!-- Stat Cards -->
      <div class="stats-grid">
        ${H({modifier:"consumption",icon:"consumption",label:"Consumption",value:c(s),unit:"kWh",hint:"Everything the house used"})}
        ${H({modifier:"production",icon:"production",label:"Production",value:c(a),unit:"kWh",hint:"Total generated by your panels"})}
        ${H({modifier:"export",icon:"export",label:"Exported",value:c(n),unit:"kWh",hint:"Surplus sold back to the grid"})}
        ${H({modifier:"self-consumed",icon:"self_consumed",label:"Self-Consumed",value:c(h),unit:"kWh",hint:"Solar used at home instead of bought"})}
      </div>

      <!-- Energy Flow + Key Metrics side by side -->
      <div class="flow-metrics-row">
        <div class="card flow-card">
          <h3 class="card-title"><span class="title-icon">${be("flow")}</span> Energy Flow</h3>

          <div class="leneda-elite-flow">
            <p class="flow-scene-caption">
              Thicker paths carry more energy. Colours are explained below the diagram.
            </p>

            ${ls(v,"desktop")}
            ${ls(v,"mobile")}

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${c(x)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${c(M,0)}% of home usage solar-covered${d>0?` · Peak ${c(d,2)} kW`:""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${c(l)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${y(l)}%;"></span></div>
                  <p>Energy used inside the house${p>0?", including received community energy":""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${c(b)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${y(b)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${c(w)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${y(w)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${c(C)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${y(C)}%;"></span></div>
                  <p>Sent ${c(g)} kWh · received ${c(p)} kWh.</p>
                </div>
                ${S?`
                <div class="mobile-flow-item gas">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Gas to house</span>
                    <strong>${c(r)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${y(f||u)}%;"></span></div>
                  <p>${i>0?`${c(i)} m3 measured for the same period.`:"Gas meter is configured for this home."}</p>
                </div>
                `:""}
              </div>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${c(l)} kWh directly supplied inside the house</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${c(b)} kWh still needed from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${c(w)} kWh sent back to the market or grid</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${c(g)} kWh sent · ${c(p)} kWh received${p>0?" (included in solar to home)":""}</span>
                </span>
              </div>
              ${S?`
              <div class="flow-legend-item gas">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Gas to house</strong>
                  <span>${c(r)} kWh${i>0?` / ${c(i)} m3`:""}</span>
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
              <span class="metric-value">${c(M,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${M}%"></div>
            </div>
            <p class="metric-sub">Share of home usage covered by solar</p>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Bought from Grid</span>
              <span class="metric-value">${c(b)} kWh</span>
            </div>
          </div>
          ${d>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${c(d,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label"><span class="metric-status-icon">${U}</span> Exceedance</span>
              <span class="metric-value">${c((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${r>0||i>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${c(r)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${c(i)} m³</span>
            </div>
          </div>
          `:""}
        </div>
      </div>
      </div>

      <!-- Chart -->
      <div class="card chart-card">
        <div class="chart-header">
          <h3 class="card-title"><span class="title-icon">${be("profile")}</span> Energy Profile — ${k}</h3>

          <div class="chart-control-stack">
            <div class="chart-control-group chart-control-group-wide">
              <span class="chart-control-label">Period</span>
              <div class="chart-period-controls" role="group" aria-label="Move chart period">
                <button
                  class="chart-nav-btn"
                  data-chart-period-nav="prev"
                  title="Previous ${P.stepLabel}"
                  aria-label="Previous ${P.stepLabel}"
                >&larr;</button>
                <span class="chart-period-pill">${B}</span>
                <button
                  class="chart-nav-btn"
                  data-chart-period-nav="next"
                  title="Next ${P.stepLabel}"
                  aria-label="Next ${P.stepLabel}"
                  ${z?'disabled aria-disabled="true"':""}
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
        <p class="muted chart-hint">${de}</p>
      </div>
    </div>
  `}function Ka(t=""){return{iso:t,consumptionKw:0,productionKw:0,gridImportKw:0,solarExportKw:0}}function Ge(t,e,s){for(const a of(e==null?void 0:e.items)??[]){const n=new Date(a.startedAt).getTime();if(!Number.isFinite(n))continue;const o=t.get(n)??Ka(a.startedAt);o[s]+=Math.max(0,Number(a.value)||0),o.iso||(o.iso=a.startedAt),t.set(n,o)}}function Fa(t,e,s={}){var r,i,d,p;const a=new Map,n=!!((i=(r=s.gridImport)==null?void 0:r.items)!=null&&i.length),o=!!((p=(d=s.marketExport)==null?void 0:d.items)!=null&&p.length);return Ge(a,t,"consumptionKw"),Ge(a,e,"productionKw"),Ge(a,s.gridImport,"gridImportKw"),Ge(a,s.marketExport,"solarExportKw"),[...a.entries()].sort((g,w)=>g[0]-w[0]).map(([g,w])=>{const $=Math.max(0,w.consumptionKw),l=Math.max(0,w.productionKw),m=Math.max(0,Math.min($,l)),h=n?Math.max(0,w.gridImportKw):Math.max(0,$-m),b=Math.max(0,$-h),x=o?Math.max(0,w.solarExportKw):Math.max(0,l-m);return{timestamp:g,iso:w.iso||new Date(g).toISOString(),consumptionKw:$,productionKw:l,solarToHomeKw:b,gridImportKw:h,solarExportKw:x}})}function Xe(t,e){return Number.isFinite(t)?Number(t):e}function wt(t,e,s){return Math.min(s,Math.max(e,t))}function Pa(t,e,s){const a=t.reduce((l,m)=>l+m.producedKwh,0),n=t.reduce((l,m)=>l+m.selfConsumedKwh,0),o=t.reduce((l,m)=>l+m.exportedKwh,0),r=Xe(e,n),i=Xe(s,o),d=Math.max(0,r)+Math.max(0,i),p=Math.max(0,a-Math.max(0,i));if(a<=0)return{selfConsumedKwh:0,exportedKwh:0};if(d<=a+1e-6)return{selfConsumedKwh:wt(Math.max(Math.max(0,r),p),0,a),exportedKwh:wt(Math.max(0,i),0,a)};const g=d>0?Math.max(0,r)/d:0,w=Math.min(a,Math.max(0,r)),$=wt(a*g,0,w);return{selfConsumedKwh:$,exportedKwh:Math.max(0,a-$)}}function Ra(t,e){const s=t?t.slice(-8):"";return s?`Solar ${e} (${s})`:`Solar ${e}`}function St(t,e,s){return(typeof s=="string"?s.trim():"")||Ra(t,e)}function Kt(t){const e=(t.meters??[]).filter(n=>n.types.includes("production")||n.types.includes("solar_consumption")),s=t.feed_in_rates??[],a=t.currency??"EUR";return e.map((n,o)=>{const r=s.find($=>$.meter_id===n.id),i=(r==null?void 0:r.mode)==="sensor"&&r.sensor_value!=null&&Number.isFinite(r.sensor_value),d=i?(r==null?void 0:r.sensor_value)??0:Xe(r==null?void 0:r.tariff,Xe(t.feed_in_tariff,0)),p=r==null?void 0:r.self_use_priority,g=p==null||p===""||!Number.isFinite(Number(p))?null:Math.max(1,Math.round(Number(p))),w=St(n.id,o+1,r==null?void 0:r.display_name);return{meterId:n.id,shortId:n.id?"…"+n.id.slice(-8):`Meter ${o+1}`,displayName:w,rate:d,label:i?`Sensor (${d.toFixed(4)} ${a}/kWh)`:"Fixed tariff",mode:(r==null?void 0:r.mode)??"fixed",selfUsePriority:g}}).map((n,o)=>({rate:n,order:o})).sort((n,o)=>{const r=n.rate.selfUsePriority??Number.POSITIVE_INFINITY,i=o.rate.selfUsePriority??Number.POSITIVE_INFINITY;return r!==i?r-i:n.order-o.order}).map(n=>n.rate)}function Ye(t){return t==null?"Pro-rata self-use":`Self-use priority ${t}`}function Ps(t){return t==="prorata"?"Prorata Modus: no self-use priority is configured, so each PV system's self-consumption and export are shared in proportion to what it produced in each 15-minute interval.":t==="mixed"?"Per-system self-consumption and export are allocated from each PV system's 15-minute production: systems with a self-use priority are served first (1 = consumed first at home), and systems sharing or missing a priority split the rest pro-rata to their own production.":"Per-system self-consumption and export are allocated from each PV system's 15-minute production using the configured self-use priority (1 = consumed first at home)."}function Aa(t){if(!t.length)return"prorata";const e=t.filter(a=>a.selfUsePriority!=null);return e.length===0?"prorata":e.length<t.length?"mixed":new Set(e.map(a=>a.selfUsePriority)).size===e.length?"priority":"mixed"}function Va(t){const e=[];let s;for(const a of t){const n=a.selfUsePriority;if(e.length>0&&n===s){e[e.length-1].push(a);continue}e.push([a]),s=n}return e}function Ft(t,e,s,a,n){if(!e||!(s!=null&&s.length))return null;const o=Kt(t);if(!o.length)return null;const r=new Map(s.map(y=>[y.meter_id,y]));if(!o.some(y=>r.has(y.meterId)))return null;const i=o.map(y=>({...y,producedKwh:0,selfConsumedKwh:0,exportedKwh:0,revenue:0,exportEquivalentForSelfUse:0})),d=new Map(i.map((y,v)=>[y.meterId,v])),p=new Map,g=new Set;for(const y of e.items)y.startedAt&&g.add(y.startedAt);const w=new Map;for(const y of e.items){const v=Math.max(0,Number(y.value)||0);w.set(y.startedAt,(w.get(y.startedAt)??0)+v)}for(const y of s){const v=new Map;for(const k of y.items??[]){const E=Math.max(0,Number(k.value)||0);v.set(k.startedAt,(v.get(k.startedAt)??0)+E),k.startedAt&&g.add(k.startedAt)}p.set(y.meter_id,v)}const $=Va(i);for(const y of[...g].sort()){let v=Math.max(0,w.get(y)??0);for(const k of $){const E=k.map(D=>{var P;return Math.max(0,((P=p.get(D.meterId))==null?void 0:P.get(y))??0)}),L=E.reduce((D,P)=>D+P,0);if(L<=0)continue;const W=Math.min(v,L);k.forEach((D,P)=>{const B=d.get(D.meterId);if(B==null)return;const O=E[P],V=W*(O/L);i[B].producedKwh+=O*.25,i[B].selfConsumedKwh+=V*.25,i[B].exportedKwh+=Math.max(0,O-V)*.25}),v=Math.max(0,v-W)}}const l=i.reduce((y,v)=>y+v.selfConsumedKwh,0),m=i.reduce((y,v)=>y+v.exportedKwh,0),h=Pa(i,a,n),b=h.selfConsumedKwh,x=h.exportedKwh,S=l>0?b/l:1,C=m>0?x/m:1;for(const y of i)y.selfConsumedKwh*=S,y.exportedKwh*=C,y.revenue=y.exportedKwh*y.rate,y.exportEquivalentForSelfUse=y.selfConsumedKwh*y.rate;const M=i.reduce((y,v)=>y+v.revenue,0),u=i.reduce((y,v)=>y+v.exportEquivalentForSelfUse,0),f=x>0?M/x:0;return{meters:i,totalFeedInRevenue:M,totalSelfUseExportEquivalent:u,weightedExportRate:f,usedPriorityAllocation:!0,allocationMode:Aa(o)}}function Ia(t,e,s={}){const a=s.roundTripEfficiency??.9,n=s.usableFraction??.9,o=Math.sqrt(Math.max(0,Math.min(1,a))),r=Math.max(0,e*n);let i=0,d=0,p=0,g=0,w=0,$=0;for(const l of t){const m=Math.max(0,l.exportKwh),h=Math.max(0,l.gridKwh);if($+=h,m>0&&i<r){const b=(r-i)/o,x=Math.min(m,b);i+=x*o,p+=x,w+=x*l.feedInRate}if(h>0&&i>0){const b=Math.min(h,i*o);i-=b/o,d+=b,g+=b*l.importRate}}return{capacityKwh:e,selfConsumedKwh:d,storedKwh:p,importSavings:g,lostExportRevenue:w,netBenefit:g-w,equivalentCycles:r>0?p*o/r:0,gridImportCoveredPct:$>0?d/$*100:0}}function Ha(t,e=.05){const s=t.filter(n=>Number.isFinite(n)&&n>=0).sort((n,o)=>n-o);if(s.length===0)return 0;const a=Math.max(0,Math.min(s.length-1,Math.floor(s.length*e)));return s[a]}function Mt(t,e){return!Number.isFinite(e)||e<=0?0:t*365/e}const Ct=[{id:"overview",label:"Overview",blurb:"Headline numbers and what stood out this period"},{id:"patterns",label:"Patterns",blurb:"When you use energy, across the day and the week"},{id:"solar",label:"Solar & Battery",blurb:"How much of your own solar you keep, and what storage would add"},{id:"costs",label:"Costs",blurb:"What the period cost, and where the money moved"},{id:"peaks",label:"Peaks",blurb:"Reference power, exceedance and the intervals that caused it"}],ja=[5,10,15],us=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],De={house:"Total Usage",grid:"Net Grid",solar:"Solar Production",exceedance_kwh:"Exceedance kWh",exceedance_frequency:"Exceedance Rate"},Oe={house:"Total Usage",grid:"Net Grid",solar:"Solar Production"},_e={previous:"Previous Period",last_year:"Last Year"};function Na(t){const e=new Date(t),s=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${s}-${a}-${n}`}function Ga(t){const[e,s,a]=t.split("-").map(Number);return new Date(e,s-1,a,12,0,0,0)}function se(t,e=0){return t.length?Math.max(...t):e}function Pt(t,e=0){return t.length?Math.min(...t):e}function ae(t,e,s){return Math.min(s,Math.max(e,t))}function G(t,e){if(!t.length)return 0;const s=[...t].sort((d,p)=>d-p),a=ae(e,0,1),n=(s.length-1)*a,o=Math.floor(n),r=Math.ceil(n);if(o===r)return s[o];const i=n-o;return s[o]*(1-i)+s[r]*i}function Oa(t){const e=Math.floor(t/4),s=t%4*15;return`${String(e).padStart(2,"0")}:${String(s).padStart(2,"0")}`}function F(t,e){return`${c(t,2)} ${e}`}function Je(t,e){return`${t>0?"+":t<0?"-":""}${c(Math.abs(t),2)} ${e}`}function Be(t,e=1){return Math.abs(t)<.005?"0":`${t>0?"+":""}${c(t,e)}`}function ps(t){const[e,s]=t.split(":").map(a=>parseInt(a,10)||0);return e*60+s}function Ba(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function Rs(t,e,s,a){if(!Ba(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),o=ps(s),r=ps(a);return o===r?!0:o<r?n>=o&&n<r:n>=o||n<r}function Ua(t,e){return e.find(s=>Rs(t,s.day_group,s.start_time,s.end_time))}function qa(t,e){return e.find(s=>Rs(t,s.day_group,s.start_time,s.end_time))}function As(t,e,s,a,n){const o=Ft(t,e,s,a,n);if(o&&o.weightedExportRate>0)return o.weightedExportRate;const r=Kt(t).map(i=>i.rate).filter(i=>Number.isFinite(i)&&i>=0);return r.length?r.reduce((i,d)=>i+d,0)/r.length:t.feed_in_tariff??0}function Ya(t,e,s,a,n,o){const r=n.consumption_rate_windows??[],i=n.reference_power_windows??[],d=n.reference_power_kw??0,p=(n.exceedance_rate??0)*(1+(n.vat_rate??0));return Fa(t,e,{gridImport:s,marketExport:a}).map(g=>{var v,k;const w=g.timestamp,$=new Date(w),l=g.consumptionKw,m=g.productionKw,h=g.solarToHomeKw,b=g.gridImportKw,x=g.solarExportKw,S=((v=qa($,i))==null?void 0:v.reference_power_kw)??d,C=Math.max(0,l-S),M=Math.max(0,b-S),u=Math.max(0,C-M),y=((((k=Ua($,r))==null?void 0:k.rate)??n.energy_variable_rate??0)+(n.network_variable_rate??0)+(n.electricity_tax_rate??0)+(n.compensation_fund_rate??0))*(1+(n.vat_rate??0));return{timestamp:w,iso:g.iso,date:$,houseKw:l,solarKw:m,solarToHomeKw:h,gridKw:b,exportKw:x,referenceKw:S,overKw:M,avoidedOverKw:u,importRateWithVat:y,feedInRate:o,exceedanceRateWithVat:p}})}function Vs(t,e,s,a,n,o){const r=Ya(t,e,s,a,n,o),i=new Map,d=Array.from({length:24},()=>0),p=Array.from({length:24},(u,f)=>({label:`${String(f).padStart(2,"0")}:00`,importCost:0,exportSpreadValue:0,gridKwh:0,exportKwh:0})),g={house:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),grid:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),solar:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_kwh:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_frequency:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0})))},w=()=>Array.from({length:96},()=>[]),$={house:{weekday:w(),weekend:w()},grid:{weekday:w(),weekend:w()},solar:{weekday:w(),weekend:w()}},l={houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0};for(const u of r){const y=Na(u.timestamp),v=i.get(y)??(()=>{const he=Ga(y);return{key:y,label:he.toLocaleDateString(void 0,{month:"short",day:"numeric"}),fullDate:he.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0}})(),k=u.houseKw*.25,E=u.solarKw*.25,L=u.solarToHomeKw*.25,W=u.gridKw*.25,D=u.exportKw*.25,P=u.overKw*.25,B=u.avoidedOverKw*.25,O=W*u.importRateWithVat,V=L*u.importRateWithVat,z=D*u.feedInRate,pe=L*(u.importRateWithVat-u.feedInRate),le=P*u.exceedanceRateWithVat,re=B*u.exceedanceRateWithVat,de=V+z+re-O-le;v.houseKwh+=k,v.solarKwh+=E,v.solarToHomeKwh+=L,v.gridKwh+=W,v.exportKwh+=D,v.exceedanceKwh+=P,v.avoidedExceedanceKwh+=B,v.importCost+=O,v.solarSavings+=V,v.exportRevenue+=z,v.selfConsumptionAdvantage+=pe,v.exceedanceCost+=le,v.avoidedExceedanceValue+=re,v.netValue+=de,v.peakGridKw=Math.max(v.peakGridKw,u.gridKw),v.peakHouseKw=Math.max(v.peakHouseKw,u.houseKw),v.exceedanceIntervals+=u.overKw>0?1:0,i.set(y,v),l.houseKwh+=k,l.solarKwh+=E,l.solarToHomeKwh+=L,l.gridKwh+=W,l.exportKwh+=D,l.exceedanceKwh+=P,l.avoidedExceedanceKwh+=B,l.importCost+=O,l.solarSavings+=V,l.exportRevenue+=z,l.selfConsumptionAdvantage+=pe,l.exceedanceCost+=le,l.avoidedExceedanceValue+=re,l.netValue+=de,l.peakGridKw=Math.max(l.peakGridKw,u.gridKw),l.peakHouseKw=Math.max(l.peakHouseKw,u.houseKw),l.exceedanceIntervals+=u.overKw>0?1:0;const U=(u.date.getDay()+6)%7,H=u.date.getHours(),X=H*4+Math.floor(u.date.getMinutes()/15),J=u.date.getDay()===0||u.date.getDay()===6?"weekend":"weekday";g.house[U][H].sum+=u.houseKw,g.house[U][H].count+=1,g.grid[U][H].sum+=u.gridKw,g.grid[U][H].count+=1,g.solar[U][H].sum+=u.solarKw,g.solar[U][H].count+=1,g.exceedance_kwh[U][H].sum+=P,g.exceedance_kwh[U][H].count+=1,g.exceedance_frequency[U][H].sum+=u.overKw>0?1:0,g.exceedance_frequency[U][H].count+=1,d[H]+=P,$.house[J][X].push(u.houseKw),$.grid[J][X].push(u.gridKw),$.solar[J][X].push(u.solarKw),p[H].importCost+=O,p[H].exportSpreadValue+=D*Math.max(u.importRateWithVat-u.feedInRate,0),p[H].gridKwh+=W,p[H].exportKwh+=D}const m=[...i.values()].sort((u,f)=>u.key.localeCompare(f.key)).map(u=>(u.coveragePct=u.houseKwh>0?u.solarToHomeKwh/u.houseKwh*100:0,u.selfConsumedPct=u.solarKwh>0?ae(u.solarToHomeKwh/u.solarKwh*100,0,100):0,u.solarValue=u.solarSavings+u.exportRevenue+u.avoidedExceedanceValue,u));l.coveragePct=l.houseKwh>0?l.solarToHomeKwh/l.houseKwh*100:0,l.selfConsumedPct=l.solarKwh>0?ae(l.solarToHomeKwh/l.solarKwh*100,0,100):0,l.solarValue=l.solarSavings+l.exportRevenue+l.avoidedExceedanceValue;const h={house:g.house.map(u=>u.map(f=>f.count?f.sum/f.count:0)),grid:g.grid.map(u=>u.map(f=>f.count?f.sum/f.count:0)),solar:g.solar.map(u=>u.map(f=>f.count?f.sum/f.count:0)),exceedance_kwh:g.exceedance_kwh.map(u=>u.map(f=>f.sum)),exceedance_frequency:g.exceedance_frequency.map(u=>u.map(f=>f.count?f.sum/f.count*100:0))},b=Array.from({length:96},(u,f)=>Oa(f)),x={house:{weekday:{lower:$.house.weekday.map(u=>G(u,.1)),median:$.house.weekday.map(u=>G(u,.5)),upper:$.house.weekday.map(u=>G(u,.9))},weekend:{lower:$.house.weekend.map(u=>G(u,.1)),median:$.house.weekend.map(u=>G(u,.5)),upper:$.house.weekend.map(u=>G(u,.9))}},grid:{weekday:{lower:$.grid.weekday.map(u=>G(u,.1)),median:$.grid.weekday.map(u=>G(u,.5)),upper:$.grid.weekday.map(u=>G(u,.9))},weekend:{lower:$.grid.weekend.map(u=>G(u,.1)),median:$.grid.weekend.map(u=>G(u,.5)),upper:$.grid.weekend.map(u=>G(u,.9))}},solar:{weekday:{lower:$.solar.weekday.map(u=>G(u,.1)),median:$.solar.weekday.map(u=>G(u,.5)),upper:$.solar.weekday.map(u=>G(u,.9))},weekend:{lower:$.solar.weekend.map(u=>G(u,.1)),median:$.solar.weekend.map(u=>G(u,.5)),upper:$.solar.weekend.map(u=>G(u,.9))}}},S=r.filter(u=>u.overKw>0).sort((u,f)=>f.overKw-u.overKw||f.timestamp-u.timestamp).slice(0,8),C=[...r].sort((u,f)=>f.houseKw-u.houseKw||f.timestamp-u.timestamp).slice(0,8),M=[...m].filter(u=>u.exceedanceKwh>0).sort((u,f)=>f.exceedanceKwh-u.exceedanceKwh).slice(0,6);return{points:r,daily:m,totals:l,topExceedances:S,peakIntervals:C,hourlyExceedanceKwh:d,heatmapValues:h,intradayProfiles:x,intradayLabels:b,hourlyOpportunity:p,loadDurationGrossKw:r.map(u=>u.houseKw).sort((u,f)=>f-u),loadDurationNetKw:r.map(u=>u.gridKw).sort((u,f)=>f-u),worstDays:M}}function za(t){var e,s,a;return(e=t.rangeData)!=null&&e.start&&((s=t.rangeData)!=null&&s.end)?`${ce(t.rangeData.start)} - ${ce(t.rangeData.end)}`:((a=Dt.find(n=>n.id===t.range))==null?void 0:a.label)??"Selected Period"}function Za(t){var e,s;return(e=t.rangeData)!=null&&e.start&&((s=t.rangeData)!=null&&s.end)?`${ze(t.rangeData.start)} - ${ze(t.rangeData.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${t.customStart} - ${t.customEnd}`:"Based on the currently selected range."}function hs(t){const e=t.analysisComparisonMode==="last_year"?"Same period last year":"Previous matched period";return t.analysisComparison?`${e}: ${ze(t.analysisComparison.start)} - ${ze(t.analysisComparison.end)}`:e}function Xa(t){switch(t){case"house":return{description:"Average hourly power by weekday for total house usage.",note:"Each cell shows the average kW seen in that weekday/hour slot over the selected period."};case"grid":return{description:"Average hourly power by weekday for remaining grid draw after solar.",note:"Each cell shows the average net-grid kW seen in that weekday/hour slot over the selected period."};case"solar":return{description:"Average hourly power by weekday for solar production.",note:"Each cell shows the average solar kW seen in that weekday/hour slot over the selected period."};case"exceedance_kwh":return{description:"Cumulative exceedance energy by weekday and hour, showing where the reference limit hurt the most.",note:"Each cell shows cumulative exceedance kWh recorded in that weekday/hour slot over the selected period."};case"exceedance_frequency":return{description:"How often each weekday/hour slot went over the reference limit.",note:"Each cell shows the share of 15-minute intervals in that weekday/hour slot that exceeded the reference limit."}}}function Ja(t,e){switch(t){case"house":case"grid":case"solar":return`${c(e,2)} kW average`;case"exceedance_kwh":return`${c(e,2)} kWh`;case"exceedance_frequency":return`${c(e,0)}% of intervals`}}function ie(t){const e=t.series.filter(y=>y.values.length>0);if(!e.length)return'<div class="analysis-empty">No chart data available for this period.</div>';const s=Math.max(...e.map(y=>y.values.length)),a=Math.max(720,s*24+92),n=244,o=50,r=20,i=18,d=30,p=e.flatMap(y=>y.values);t.referenceValue!=null&&p.push(t.referenceValue);let g=t.minValue??Pt(p,0),w=t.maxValue??se(p,1);g===w&&(w+=1,g=Math.min(0,g-1)),t.minValue==null&&(g=Math.min(0,g));const $=a-o-r,l=n-i-d,m=(y,v)=>v<=1?o+$/2:o+y*$/(v-1),h=y=>i+(w-y)/(w-g)*l,b=t.valueFormatter??(y=>c(y,1)),x=Array.from({length:4},(y,v)=>g+(w-g)/3*v),S=[0,Math.floor((s-1)/2),s-1].filter((y,v,k)=>k.indexOf(y)===v),C=x.map(y=>{const v=h(y);return`
      <line x1="${o}" y1="${v.toFixed(1)}" x2="${(a-r).toFixed(1)}" y2="${v.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(v+4).toFixed(1)}" class="analysis-svg-tick">${b(y)}</text>
    `}).join(""),M=t.referenceValue!=null?(()=>{const y=h(t.referenceValue);return`
        <line x1="${o}" y1="${y.toFixed(1)}" x2="${(a-r).toFixed(1)}" y2="${y.toFixed(1)}" class="analysis-svg-reference" />
        ${t.referenceLabel?`<text x="${a-r}" y="${(y-8).toFixed(1)}" class="analysis-svg-reference-label">${t.referenceLabel}</text>`:""}
      `})():"",u=e.map(y=>{const v=y.values.map((E,L)=>{const W=m(L,y.values.length),D=h(E);return`${L===0?"M":"L"} ${W.toFixed(1)} ${D.toFixed(1)}`}).join(" "),k=y.values.length<=40?y.values.map((E,L)=>{const W=m(L,y.values.length),D=h(E);return`<circle cx="${W.toFixed(1)}" cy="${D.toFixed(1)}" r="2.6" fill="${y.color}" />`}).join(""):"";return`
      <path d="${v}" fill="none" stroke="${y.color}" stroke-width="2.5" ${y.dashed?'stroke-dasharray="6 4"':""} />
      ${k}
    `}).join(""),f=S.map(y=>{const v=m(y,s),k=t.labels[y]??`Point ${y+1}`;return`<text x="${v.toFixed(1)}" y="${n-8}" text-anchor="middle" class="analysis-svg-x-label">${k}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${a}" height="${n}" viewBox="0 0 ${a} ${n}" role="img" aria-label="${t.title??"Line chart"}">
        ${C}
        ${M}
        ${u}
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
  `}function Qa(t){const e=t.series.filter(f=>f.band.median.length>0);if(!e.length)return'<div class="analysis-empty">No profile data available for this period.</div>';const s=Math.max(...e.map(f=>f.band.median.length)),a=Math.max(760,s*12+92),n=248,o=50,r=20,i=18,d=30,p=e.flatMap(f=>[...f.band.lower,...f.band.median,...f.band.upper]),g=Math.min(0,Pt(p,0));let w=se(p,1);w<=g&&(w=g+1);const $=a-o-r,l=n-i-d,m=(f,y)=>y<=1?o+$/2:o+f*$/(y-1),h=f=>i+(w-f)/(w-g)*l,b=t.valueFormatter??(f=>c(f,1)),x=Array.from({length:4},(f,y)=>g+(w-g)/3*y),S=[0,16,32,48,64,80,s-1].filter((f,y,v)=>f>=0&&f<s&&v.indexOf(f)===y),C=x.map(f=>{const y=h(f);return`
      <line x1="${o}" y1="${y.toFixed(1)}" x2="${(a-r).toFixed(1)}" y2="${y.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(y+4).toFixed(1)}" class="analysis-svg-tick">${b(f)}</text>
    `}).join(""),M=e.map(f=>{const y=f.band.upper.map((E,L)=>{const W=m(L,f.band.upper.length),D=h(E);return`${L===0?"M":"L"} ${W.toFixed(1)} ${D.toFixed(1)}`}).join(" "),v=[...f.band.lower].reverse().map((E,L)=>{const W=f.band.lower.length-1-L,D=m(W,f.band.lower.length),P=h(E);return`L ${D.toFixed(1)} ${P.toFixed(1)}`}).join(" "),k=f.band.median.map((E,L)=>{const W=m(L,f.band.median.length),D=h(E);return`${L===0?"M":"L"} ${W.toFixed(1)} ${D.toFixed(1)}`}).join(" ");return`
      <path d="${y} ${v} Z" fill="${f.fill}" stroke="none" />
      <path d="${k}" fill="none" stroke="${f.color}" stroke-width="2.4" ${f.dashed?'stroke-dasharray="6 4"':""} />
    `}).join(""),u=S.map(f=>{const y=m(f,s),v=t.labels[f]??`Point ${f+1}`;return`<text x="${y.toFixed(1)}" y="${n-8}" text-anchor="middle" class="analysis-svg-x-label">${v}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${a}" height="${n}" viewBox="0 0 ${a} ${n}" role="img" aria-label="${t.title??"Band chart"}">
        ${C}
        ${M}
        ${u}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      ${e.map(f=>`
        <span class="analysis-legend-item">
          <span class="analysis-legend-swatch" style="background:${f.color};"></span>
          <span>${f.label}</span>
        </span>
      `).join("")}
    </div>
  `}function er(t){const e=new Date(t.timestamp);return{date:e.toLocaleDateString(void 0,{month:"short",day:"numeric"}),time:e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}}function tr(t){if(!t.length)return'<div class="analysis-empty">No peak intervals available for this period.</div>';const e=Math.max(760,t.length*86+96),s=276,a=52,n=16,o=18,r=54,i=se(t.map(h=>h.houseKw),1),d=e-a-n,p=s-o-r,g=o+p,w=d/t.length,$=Math.max(22,Math.min(38,w*.54)),l=t.map((h,b)=>{const x=a+b*w+(w-$)/2,S=h.solarToHomeKw/i*p,M=Math.max(0,Math.min(h.gridKw,h.referenceKw))/i*p,u=Math.max(0,h.gridKw-h.referenceKw)/i*p;return`
      <g>
        <rect x="${x.toFixed(1)}" y="${(g-S).toFixed(1)}" width="${$.toFixed(1)}" height="${S.toFixed(1)}" rx="4" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${x.toFixed(1)}" y="${(g-S-M).toFixed(1)}" width="${$.toFixed(1)}" height="${M.toFixed(1)}" rx="4" fill="rgba(248, 81, 73, 0.62)" />
        ${u>0?`<rect x="${x.toFixed(1)}" y="${(g-S-M-u).toFixed(1)}" width="${$.toFixed(1)}" height="${u.toFixed(1)}" rx="4" fill="rgba(210, 153, 34, 0.92)" />`:""}
      </g>
    `}).join(""),m=t.map((h,b)=>{const x=a+b*w+w/2,{date:S,time:C}=er(h);return`
      <text x="${x.toFixed(1)}" y="${s-20}" text-anchor="middle" class="analysis-svg-x-label">
        <tspan x="${x.toFixed(1)}" dy="0">${S}</tspan>
        <tspan x="${x.toFixed(1)}" dy="12">${C}</tspan>
      </text>
    `}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${s}" viewBox="0 0 ${e} ${s}" role="img" aria-label="Peak interval anatomy">
        <line x1="${a}" y1="${g.toFixed(1)}" x2="${(e-n).toFixed(1)}" y2="${g.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${a-8}" y="${(o+4).toFixed(1)}" class="analysis-svg-tick">${c(i,1)} kW</text>
        ${l}
        ${m}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.62);"></span><span>Grid within reference</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(210, 153, 34, 0.92);"></span><span>Grid over reference</span></span>
    </div>
  `}function sr(t){if(!t.length)return'<div class="analysis-empty">No daily energy data available.</div>';const e=Math.max(760,t.length*28+84),s=250,a=52,n=16,o=18,r=34,i=se(t.map(C=>C.houseKwh),1),d=se(t.map(C=>C.exportKwh),0),p=e-a-n,g=s-o-r,w=d>0?g*.72:g,$=d>0?g-w:0,l=o+w,m=p/t.length,h=Math.max(8,Math.min(18,m*.62)),b=Math.max(1,Math.ceil(t.length/10)),x=t.map((C,M)=>{const u=a+M*m+(m-h)/2,f=C.solarToHomeKwh/i*w,y=C.gridKwh/i*w,v=d>0?C.exportKwh/d*$:0,k=l-f-y-8;return`
      <g>
        <rect x="${u.toFixed(1)}" y="${(l-f).toFixed(1)}" width="${h.toFixed(1)}" height="${f.toFixed(1)}" rx="3" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${u.toFixed(1)}" y="${(l-f-y).toFixed(1)}" width="${h.toFixed(1)}" height="${y.toFixed(1)}" rx="3" fill="rgba(248, 81, 73, 0.55)" />
        ${v>0?`<rect x="${u.toFixed(1)}" y="${l.toFixed(1)}" width="${h.toFixed(1)}" height="${v.toFixed(1)}" rx="3" fill="rgba(88, 166, 255, 0.75)" />`:""}
        ${C.exceedanceKwh>0?`<circle cx="${(u+h/2).toFixed(1)}" cy="${k.toFixed(1)}" r="3.2" fill="#d29922" />`:""}
      </g>
    `}).join(""),S=t.map((C,M)=>M%b!==0&&M!==t.length-1?"":`<text x="${(a+M*m+m/2).toFixed(1)}" y="${s-10}" text-anchor="middle" class="analysis-svg-x-label">${C.label}</text>`).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${s}" viewBox="0 0 ${e} ${s}" role="img" aria-label="Daily energy breakdown">
        <line x1="${a}" y1="${l.toFixed(1)}" x2="${(e-n).toFixed(1)}" y2="${l.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${a-8}" y="${(o+4).toFixed(1)}" class="analysis-svg-tick">${c(i,0)} kWh</text>
        ${d>0?`<text x="${a-8}" y="${(s-r+4).toFixed(1)}" class="analysis-svg-tick">-${c(d,0)} kWh</text>`:""}
        ${x}
        ${S}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.55);"></span><span>From grid</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span><span>Exported</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:#d29922;"></span><span>Exceedance on that day</span></span>
    </div>
  `}function ar(t,e){const s=ae(e,0,1);return t==="solar"?`rgba(63, 185, 80, ${.12+s*.82})`:t==="exceedance_kwh"||t==="exceedance_frequency"?`rgba(210, 153, 34, ${.14+s*.82})`:t==="grid"?`rgba(210, 153, 34, ${.12+s*.82})`:`rgba(248, 81, 73, ${.12+s*.82})`}function rr(t,e){const s=t.flat(),a=se(s,1),n=Pt(s,0);return`
    <div class="analysis-heatmap">
      <div class="analysis-heatmap-hours">
        <span class="analysis-heatmap-corner"></span>
        ${Array.from({length:24},(o,r)=>`
          <span class="analysis-heatmap-hour ${r%2===1?"analysis-heatmap-hour-faded":""}">${String(r).padStart(2,"0")}</span>
        `).join("")}
      </div>
      ${t.map((o,r)=>`
        <div class="analysis-heatmap-row">
          <span class="analysis-heatmap-day">${us[r]}</span>
          ${o.map((i,d)=>{const p=a===n?0:(i-n)/(a-n);return`
              <span
                class="analysis-heatmap-cell"
                style="background:${ar(e,p)};"
                title="${us[r]} ${String(d).padStart(2,"0")}:00 - ${Ja(e,i)}"
              >${i>(e==="exceedance_frequency"?1:.05)?c(i,e==="exceedance_frequency"?0:1):""}</span>
            `}).join("")}
        </div>
      `).join("")}
    </div>
  `}function Qe(t){const e=se(t.map(s=>s.value),1);return t.length?`
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
  `:'<div class="analysis-empty">No standout patterns in this period.</div>'}function nr(t,e,s){const a=s.communitySolarToHomeKwh>.01?`${c(s.totalSolarCoverageKwh)} kWh of ${c(s.consumptionKwh)} kWh usage covered, incl. ${c(s.communitySolarToHomeKwh)} kWh shared`:`${c(s.totalSolarCoverageKwh)} kWh of ${c(s.consumptionKwh)} kWh usage covered`,n=(r,i)=>t.daily.length>2?vr(r,i):"",o=r=>`
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">${r.label}</span>
        <strong class="analysis-stat-value">${r.value}</strong>
        ${r.spark??""}
        <span class="analysis-stat-meta">${r.meta}</span>
      </div>
  `;return`
    <div class="analysis-stat-grid">
      ${o({label:"Solar Coverage",value:`${c(s.coveragePct,1)}%`,meta:a,spark:n(t.daily.map(r=>r.coveragePct),"var(--clr-production)")})}
      ${o({label:"Self-Consumed Solar",value:`${c(s.selfConsumedPct,1)}%`,meta:`${c(s.directSolarToHomeKwh)} kWh kept from your own solar, ${c(s.exportedKwh)} kWh exported`,spark:n(t.daily.map(r=>r.selfConsumedPct),"var(--clr-production)")})}
      ${o({label:"Total Solar Value",value:F(s.totalSolarValue,e),meta:"Savings plus export revenue plus avoided exceedance charges",spark:n(t.daily.map(r=>r.solarValue),"var(--clr-production)")})}
      ${o({label:"Self-Use vs Export",value:Je(s.selfConsumptionAdvantage,e),meta:`${c(s.directSolarToHomeKwh)} kWh kept on-site instead of exported`,spark:n(t.daily.map(r=>r.selfConsumptionAdvantage),"var(--clr-self)")})}
      ${o({label:"Peak Net Grid",value:`${c(t.totals.peakGridKw,2)} kW`,meta:`Compared with ${c(t.totals.peakHouseKw,2)} kW gross house load`,spark:n(t.daily.map(r=>r.peakGridKw),"var(--clr-consumption)")})}
      ${o({label:"Exceedance Intervals",value:c(t.totals.exceedanceIntervals,0),meta:`${c(t.totals.exceedanceKwh,2)} kWh above the reference limit`,spark:n(t.daily.map(r=>r.exceedanceIntervals),"var(--clr-warning)")})}
      ${o({label:"Variable Import Cost",value:F(s.variableImportCost,e),meta:`${c(s.billedGridImportKwh)} kWh billed from the grid during the selected period`,spark:n(t.daily.map(r=>r.importCost),"var(--clr-consumption)")})}
    </div>
  `}function or(t){return`
    <div class="card analysis-card analysis-card-full">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Daily Breakdown</h3>
          <p class="analysis-card-copy">House usage is split into solar-covered energy, grid energy, and exported surplus. A gold marker flags days with any reference-power exceedance.</p>
        </div>
      </div>
      ${sr(t.daily)}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily exceedance volume</h4>
        ${ie({title:"Daily exceedance volume",series:[{label:"Exceedance",color:"#d29922",values:t.daily.map(e=>e.exceedanceKwh)}],labels:t.daily.map(e=>e.label),valueFormatter:e=>`${c(e,2)} kWh`})}
      </div>
    </div>
  `}function ir(t,e){const s=Xa(t.analysisHeatmapMetric);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Consumption Pattern Heatmap</h3>
          <p class="analysis-card-copy">${s.description}</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${t.analysisHeatmapMetric==="house"?"active":""}" data-analysis-heatmap="house">${De.house}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="grid"?"active":""}" data-analysis-heatmap="grid">${De.grid}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="solar"?"active":""}" data-analysis-heatmap="solar">${De.solar}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="exceedance_kwh"?"active":""}" data-analysis-heatmap="exceedance_kwh">${De.exceedance_kwh}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="exceedance_frequency"?"active":""}" data-analysis-heatmap="exceedance_frequency">${De.exceedance_frequency}</button>
        </div>
      </div>
      ${rr(e.heatmapValues[t.analysisHeatmapMetric],t.analysisHeatmapMetric)}
      <p class="analysis-note">${s.note}</p>
    </div>
  `}function lr(t,e){const s=t.analysisProfileMetric,a=e.intradayProfiles[s],n=Oe[s],o=a.weekday.median.reduce((i,d,p,g)=>d>g[i]?p:i,0),r=a.weekend.median.reduce((i,d,p,g)=>d>g[i]?p:i,0);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Intraday Profile</h3>
          <p class="analysis-card-copy">A typical day view for ${n.toLowerCase()}, split between weekdays and weekends. The band shows the p10 to p90 range and the line is the median interval.</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${s==="house"?"active":""}" data-analysis-profile="house">${Oe.house}</button>
          <button class="unit-btn ${s==="grid"?"active":""}" data-analysis-profile="grid">${Oe.grid}</button>
          <button class="unit-btn ${s==="solar"?"active":""}" data-analysis-profile="solar">${Oe.solar}</button>
        </div>
      </div>
      <div class="analysis-inline-metrics">
        <div>
          <span class="analysis-inline-label">Weekday median peak</span>
          <strong>${c(a.weekday.median[o]??0,2)} kW</strong>
          <span class="analysis-stat-meta">${e.intradayLabels[o]??"n/a"}</span>
        </div>
        <div>
          <span class="analysis-inline-label">Weekend median peak</span>
          <strong>${c(a.weekend.median[r]??0,2)} kW</strong>
          <span class="analysis-stat-meta">${e.intradayLabels[r]??"n/a"}</span>
        </div>
      </div>
      ${Qa({title:`${n} intraday profile`,labels:e.intradayLabels,series:[{label:"Weekday median (p10-p90 band)",color:"#58a6ff",fill:"rgba(88, 166, 255, 0.14)",band:a.weekday},{label:"Weekend median (p10-p90 band)",color:"#d29922",fill:"rgba(210, 153, 34, 0.13)",band:a.weekend,dashed:!0}],valueFormatter:i=>`${c(i,1)} kW`})}
      <p class="analysis-note">This makes the typical daily rhythm much easier to read than the weekday/hour heatmap alone.</p>
    </div>
  `}function dr(t,e,s){const a=t.meters.reduce((o,r)=>o+r.selfConsumedKwh*e,0),n=a+t.totalFeedInRevenue;return`
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
                    <div class="analysis-stat-meta">${o.shortId} · ${Ye(o.selfUsePriority)}</div>
                  </td>
                  <td>${c(o.rate,4)} ${s}/kWh</td>
                  <td>${c(o.producedKwh)} kWh</td>
                  <td>${c(o.selfConsumedKwh)} kWh</td>
                  <td>${c(o.exportedKwh)} kWh</td>
                  <td>${F(r,s)}</td>
                  <td>${F(o.revenue,s)}</td>
                  <td>${F(i,s)}</td>
                </tr>
              `}).join("")}
            <tr>
              <td><strong>Portfolio subtotal</strong></td>
              <td></td>
              <td>${c(t.meters.reduce((o,r)=>o+r.producedKwh,0))} kWh</td>
              <td>${c(t.meters.reduce((o,r)=>o+r.selfConsumedKwh,0))} kWh</td>
              <td>${c(t.meters.reduce((o,r)=>o+r.exportedKwh,0))} kWh</td>
              <td>${F(a,s)}</td>
              <td>${F(t.totalFeedInRevenue,s)}</td>
              <td>${F(n,s)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="analysis-note">${Ps(t.allocationMode)}</p>
      <p class="analysis-note">This subtotal includes self-use savings and export revenue. Avoided exceedance value stays only in the overall solar total because it depends on aggregate site load, not a single solar system.</p>
    </div>
  `}function cr(t,e,s,a){const n=t.totals.solarKwh>0?ae(t.totals.solarToHomeKwh/t.totals.solarKwh*100,0,100):0,o=t.totals.solarKwh>0?ae(t.totals.exportKwh/t.totals.solarKwh*100,0,100):0;return`
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
          <strong>${c(t.totals.coveragePct,1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-consumed solar</span>
          <strong>${c(t.totals.selfConsumedPct,1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Solar value</span>
          <strong>${F(t.totals.solarValue,e)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-use vs export</span>
          <strong>${Je(t.totals.selfConsumptionAdvantage,e)}</strong>
        </div>
      </div>
      <div class="analysis-share-bar">
        <span class="analysis-share-segment analysis-share-segment-home" style="width:${n}%;"></span>
        <span class="analysis-share-segment analysis-share-segment-export" style="width:${o}%;"></span>
      </div>
      <div class="analysis-share-legend">
        <span><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span>Self-consumed: ${c(t.totals.solarToHomeKwh)} kWh</span>
        <span><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span>Exported: ${c(t.totals.exportKwh)} kWh</span>
      </div>
      ${s!=null&&s.meters.length?dr(s,a,e):""}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Coverage of house usage by day</h4>
        ${ie({title:"Daily solar coverage",series:[{label:"Coverage",color:"#3fb950",values:t.daily.map(r=>r.coveragePct)}],labels:t.daily.map(r=>r.label),maxValue:100,minValue:0,valueFormatter:r=>`${c(r,0)}%`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day</h4>
        ${ie({title:"Daily solar value",series:[{label:"Solar value",color:"#58a6ff",values:t.daily.map(r=>r.solarValue)}],labels:t.daily.map(r=>r.label),valueFormatter:r=>F(r,e)})}
      </div>
    </div>
  `}function ur(t,e){const s=[...t.hourlyOpportunity].sort((r,i)=>i.importCost-r.importCost)[0],a=[...t.hourlyOpportunity].sort((r,i)=>i.exportSpreadValue-r.exportSpreadValue)[0],n=[...t.hourlyOpportunity].filter(r=>r.importCost>0).sort((r,i)=>i.importCost-r.importCost).slice(0,5).map(r=>({label:r.label,value:r.importCost,meta:`${F(r.importCost,e)} from ${c(r.gridKwh,1)} kWh`})),o=[...t.hourlyOpportunity].filter(r=>r.exportSpreadValue>0).sort((r,i)=>i.exportSpreadValue-r.exportSpreadValue).slice(0,5).map(r=>({label:r.label,value:r.exportSpreadValue,meta:`${F(r.exportSpreadValue,e)} on ${c(r.exportKwh,1)} kWh`,colorClass:"analysis-progress-fill-warn"}));return`
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
          <strong>${F(t.hourlyOpportunity.reduce((r,i)=>r+i.importCost,0),e)}</strong>
          <span class="analysis-stat-meta">Variable import cost grouped by hour of day</span>
        </div>
        <div>
          <span class="analysis-inline-label">Export spread opportunity</span>
          <strong>${F(t.hourlyOpportunity.reduce((r,i)=>r+i.exportSpreadValue,0),e)}</strong>
          <span class="analysis-stat-meta">Approximate value gap between export and local use</span>
        </div>
        <div>
          <span class="analysis-inline-label">Hardest import hour</span>
          <strong>${(s==null?void 0:s.label)??"n/a"}</strong>
          <span class="analysis-stat-meta">${s?F(s.importCost,e):"No import cost recorded"}</span>
        </div>
        <div>
          <span class="analysis-inline-label">Best storage hour</span>
          <strong>${(a==null?void 0:a.label)??"n/a"}</strong>
          <span class="analysis-stat-meta">${a?F(a.exportSpreadValue,e):"No export spread recorded"}</span>
        </div>
      </div>
      ${ie({title:"Hourly tariff opportunity",series:[{label:"Import cost pressure",color:"#f85149",values:t.hourlyOpportunity.map(r=>r.importCost)},{label:"Export spread opportunity",color:"#58a6ff",values:t.hourlyOpportunity.map(r=>r.exportSpreadValue)}],labels:t.hourlyOpportunity.map(r=>r.label),valueFormatter:r=>F(r,e)})}
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Most expensive import hours</h4>
          ${Qe(n)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Best export-to-storage hours</h4>
          ${Qe(o)}
        </div>
      </div>
      <p class="analysis-note">Export spread opportunity uses the difference between the import rate and feed-in rate for exported energy in that hour, so it is a directional indicator rather than a billing line item.</p>
    </div>
  `}function pr(t,e){const s=t.hourlyExceedanceKwh.map((a,n)=>({label:`${String(n).padStart(2,"0")}:00`,value:a,meta:`${c(a,2)} kWh`,colorClass:"analysis-progress-fill-warn"})).filter(a=>a.value>0).sort((a,n)=>n.value-a.value).slice(0,6);return`
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
          <strong>${c(t.totals.exceedanceIntervals,0)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Total exceedance</span>
          <strong>${c(t.totals.exceedanceKwh,2)} kWh</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Peak over reference</span>
          <strong>${c(se(t.topExceedances.map(a=>a.overKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Exceedance cost</span>
          <strong>${F(t.totals.exceedanceCost,e)}</strong>
        </div>
      </div>
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Worst hours</h4>
          ${Qe(s)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Worst days</h4>
          ${Qe(t.worstDays.map(a=>({label:a.fullDate,value:a.exceedanceKwh,meta:`${c(a.exceedanceKwh,2)} kWh`,colorClass:"analysis-progress-fill-warn"})))}
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
                      <td>${Es(a.iso)}</td>
                      <td>${c(a.gridKw,2)} kW</td>
                      <td>${c(a.referenceKw,2)} kW</td>
                      <td>${c(a.overKw,2)} kW</td>
                      <td>${c(a.solarKw,2)} kW</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `:'<div class="analysis-empty">No reference exceedance was recorded in this period.</div>'}
      </div>
    </div>
  `}function hr(t){const e=t.peakIntervals.length?t.peakIntervals.reduce((s,a)=>s+(a.houseKw>0?a.solarToHomeKw/a.houseKw*100:0),0)/t.peakIntervals.length:0;return`
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
          <strong>${c(se(t.peakIntervals.map(s=>s.houseKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Highest net-grid peak</span>
          <strong>${c(se(t.peakIntervals.map(s=>s.gridKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Solar share across peaks</span>
          <strong>${c(e,0)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Intervals over reference</span>
          <strong>${c(t.peakIntervals.filter(s=>s.overKw>0).length,0)} / ${c(t.peakIntervals.length,0)}</strong>
        </div>
      </div>
      ${tr(t.peakIntervals)}
      <p class="analysis-note">A gold cap only appears when the grid portion of the interval exceeded the configured reference power.</p>
    </div>
  `}function mr(t,e,s){var d,p;const a=e.analysisComparisonMode==="last_year"?"Last year":"Previous";if(e.analysisComparisonLoading)return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${hs(e)}</p>
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
    `;const n=As(s,e.analysisComparison.consumptionTimeseries,null,void 0,void 0),o=Vs(e.analysisComparison.consumptionTimeseries,e.analysisComparison.productionTimeseries,e.analysisComparison.gridImportTimeseries,e.analysisComparison.marketExportTimeseries,s,n),r=Math.max(t.daily.length,o.daily.length,1),i=Array.from({length:r},(g,w)=>`D${w+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Period Comparison</h3>
          <p class="analysis-card-copy">${hs(e)}</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${_e.previous}</button>
          <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${_e.last_year}</button>
        </div>
      </div>
      <div class="analysis-compare-grid">
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">House usage</span>
          <strong>${c(t.totals.houseKwh)} kWh</strong>
          <span class="analysis-compare-delta">${Be(t.totals.houseKwh-o.totals.houseKwh)} kWh vs ${a.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Net grid usage</span>
          <strong>${c(t.totals.gridKwh)} kWh</strong>
          <span class="analysis-compare-delta">${Be(t.totals.gridKwh-o.totals.gridKwh)} kWh vs ${a.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar coverage</span>
          <strong>${c(t.totals.coveragePct,1)}%</strong>
          <span class="analysis-compare-delta">${Be(t.totals.coveragePct-o.totals.coveragePct)} pts vs ${a.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar value</span>
          <strong>${F(t.totals.solarValue,s.currency||"EUR")}</strong>
          <span class="analysis-compare-delta">${Be(t.totals.solarValue-o.totals.solarValue,2)} ${s.currency||"EUR"} vs ${a.toLowerCase()}</span>
        </div>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Usage by day index</h4>
        ${ie({title:`Current versus ${a.toLowerCase()} usage`,series:[{label:"Current",color:"#f85149",values:t.daily.map(g=>g.houseKwh)},{label:a,color:"#58a6ff",values:o.daily.map(g=>g.houseKwh),dashed:!0}],labels:i,valueFormatter:g=>`${c(g,1)} kWh`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day index</h4>
        ${ie({title:`Current versus ${a.toLowerCase()} solar value`,series:[{label:"Current",color:"#3fb950",values:t.daily.map(g=>g.solarValue)},{label:a,color:"#d29922",values:o.daily.map(g=>g.solarValue),dashed:!0}],labels:i,valueFormatter:g=>F(g,s.currency||"EUR")})}
      </div>
    </div>
  `}function gr(t,e){return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Tariff-Aware Cost Trends</h3>
          <p class="analysis-card-copy">Estimated variable import cost, solar savings, export earnings, and exceedance cost by day. Fixed monthly fees are intentionally left out so this stays behavior-driven.</p>
        </div>
      </div>
      ${ie({title:"Daily cost and value trends",series:[{label:"Import cost",color:"#f85149",values:t.daily.map(s=>s.importCost)},{label:"Solar savings",color:"#3fb950",values:t.daily.map(s=>s.solarSavings)},{label:"Export earnings",color:"#58a6ff",values:t.daily.map(s=>s.exportRevenue)},{label:"Exceedance cost",color:"#d29922",values:t.daily.map(s=>s.exceedanceCost)}],labels:t.daily.map(s=>s.label),valueFormatter:s=>F(s,e)})}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily net energy value</h4>
        ${ie({title:"Daily net energy value",series:[{label:"Net value",color:"#39c5cf",values:t.daily.map(s=>s.netValue)}],labels:t.daily.map(s=>s.label),referenceValue:0,referenceLabel:"Break-even",valueFormatter:s=>Je(s,e)})}
      </div>
      <div class="analysis-cost-totals">
        <span>Import cost: <strong>${F(t.totals.importCost,e)}</strong></span>
        <span>Solar savings: <strong>${F(t.totals.solarSavings,e)}</strong></span>
        <span>Export earnings: <strong>${F(t.totals.exportRevenue,e)}</strong></span>
        <span>Exceedance cost: <strong>${F(t.totals.exceedanceCost,e)}</strong></span>
        <span>Net value: <strong>${Je(t.totals.netValue,e)}</strong></span>
      </div>
    </div>
  `}function yr(t,e){const s=Array.from({length:Math.max(t.loadDurationGrossKw.length,t.loadDurationNetKw.length,1)},(a,n)=>`${n+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Load Duration Curve</h3>
          <p class="analysis-card-copy">Gross house load and net grid load sorted from highest to lowest interval. This shows how often high demand really occurs and how much solar trims the top end.</p>
        </div>
      </div>
      ${ie({title:"Load duration curve",series:[{label:"Gross house load",color:"#f85149",values:t.loadDurationGrossKw},{label:"Net grid load",color:"#58a6ff",values:t.loadDurationNetKw}],labels:s,referenceValue:e>0?e:void 0,referenceLabel:e>0?`Reference ${c(e,1)} kW`:void 0,valueFormatter:a=>`${c(a,1)} kW`})}
      <p class="analysis-note">Intervals are ordered from highest demand to lowest, so the left side is your hardest-to-handle load.</p>
    </div>
  `}function vr(t,e){const s=t.filter(w=>Number.isFinite(w));if(s.length<2)return"";const a=100,n=26,o=Math.min(...s),i=Math.max(...s)-o||1,d=a/(s.length-1),p=s.map((w,$)=>{const l=$*d,m=n-(w-o)/i*(n-4)-2;return`${l.toFixed(1)},${m.toFixed(1)}`}),g=p[p.length-1].split(",");return`
    <svg class="stat-sparkline" viewBox="0 0 ${a} ${n}" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="${p.join(" ")}" fill="none" stroke="${e}" stroke-width="1.6"
        stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
      <circle cx="${g[0]}" cy="${g[1]}" r="2" fill="${e}" vector-effect="non-scaling-stroke" />
    </svg>
  `}function fr(t,e,s,a,n,o){const r=[],{totals:i,daily:d,hourlyOpportunity:p}=t,g=d.reduce(($,l)=>!$||l.importCost>$.importCost?l:$,null);if(g&&g.importCost>0&&d.length>1){const $=i.importCost>0?g.importCost/i.importCost*100:0;r.push({tone:"info",title:"Most expensive day",body:`${g.fullDate} cost ${F(g.importCost,s)} in grid energy — ${c($,0)}% of the period's total, on ${c(g.gridKwh)} kWh imported.`})}if(a>.01){const $=a*24,l=i.houseKwh>0?$*o/i.houseKwh*100:0,m=Mt($*o*(i.importCost/Math.max(i.gridKwh,.001)),o);r.push({tone:l>50?"warn":"info",title:"Always-on baseload",body:`Your load never drops below ${c(a,2)} kW — about ${c($)} kWh a day, ${c(l,0)}% of everything you used. Priced at this period's average import rate, that standing load is roughly ${F(m,s)} a year if all of it came from the grid.`})}if(i.exceedanceIntervals>0){const $=t.hourlyExceedanceKwh.indexOf(Math.max(...t.hourlyExceedanceKwh));r.push({tone:"warn",title:"Reference power exceeded",body:`${c(i.exceedanceIntervals,0)} interval${i.exceedanceIntervals===1?"":"s"} went over your reference limit, costing ${F(i.exceedanceCost,s)}. Most of it happened around ${String($).padStart(2,"0")}:00.`})}else i.peakGridKw>0&&r.push({tone:"good",title:"Stayed under the reference limit",body:`Your highest net grid draw was ${c(i.peakGridKw,2)} kW and never crossed the reference power, so no exceedance charge applied.`});e.exportedKwh>.5&&r.push({tone:e.selfConsumedPct>=50?"good":"info",title:"Solar kept at home",body:`You used ${c(e.selfConsumedPct,0)}% of your own production on site and exported ${c(e.exportedKwh)} kWh. Each kWh kept was worth ${F(e.selfConsumptionAdvantage/Math.max(e.directSolarToHomeKwh,.001),s)} more than exporting it.`});const w=p.reduce(($,l)=>!$||l.importCost>$.importCost?l:$,null);if(w&&w.importCost>0&&r.push({tone:"info",title:"Costliest hour of the day",body:`${w.label} accounted for ${F(w.importCost,s)} of grid spend across the period, on ${c(w.gridKwh)} kWh. Moving flexible loads out of that hour is the single biggest lever here.`}),n&&n.netBenefit>0){const $=Mt(n.netBenefit,o);r.push({tone:"info",title:"What storage would have added",body:`A ${c(n.capacityKwh,0)} kWh battery would have covered ${c(n.gridImportCoveredPct,0)}% of your grid import, worth ${F(n.netBenefit,s)} over this period once the lost feed-in revenue is deducted — roughly ${F($,s)} a year if the rest of the year looks like this one, before the cost of the battery itself.`})}return r}function wr(t){if(t.length===0)return"";const e=s=>s==="good"?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5L11 15L15.5 9.5" /></svg>':s==="warn"?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4L20.5 19H3.5L12 4Z" /><path d="M12 10V14" /><path d="M12 16.5H12.01" /></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 11V16" /><path d="M12 7.5H12.01" /></svg>';return`
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
  `}function $r(t,e,s,a){if(a<=.5)return`
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
                <td><strong>${c(o.capacityKwh,0)} kWh</strong></td>
                <td class="numeric">
                  ${c(o.gridImportCoveredPct,0)}%
                  <span class="battery-bar"><span style="width:${ae(o.gridImportCoveredPct,0,100)}%"></span></span>
                </td>
                <td class="numeric">${c(o.equivalentCycles,1)}</td>
                <td class="numeric">${F(o.netBenefit,e)}</td>
                <td class="numeric">${F(Mt(o.netBenefit,s),e)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <p class="analysis-note">
        Net value is the avoided grid import minus the feed-in revenue given up by storing instead of exporting.
        This is a floor, not a sales figure: it models round-trip losses and 90% usable capacity only — no inverter
        power limit, no degradation, and no tariff arbitrage. "Per year" simply scales ${c(s,0)} day${s===1?"":"s"}
        of measured data to 365 and assumes the rest of the year looks like this one.
      </p>
    </div>
  `}function br(t,e,s,a){const n=t*24,o=n*a,r=e.totals.houseKwh>0?o/e.totals.houseKwh*100:0,i=e.totals.gridKwh>0?e.totals.importCost/e.totals.gridKwh:0;return`
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
          <strong class="analysis-stat-value">${c(t,2)} kW</strong>
          <span class="analysis-stat-meta">5th percentile of all intervals</span>
        </div>
        <div class="baseload-figure">
          <span class="analysis-stat-label">Per day</span>
          <strong class="analysis-stat-value">${c(n)} kWh</strong>
          <span class="analysis-stat-meta">${c(r,0)}% of everything you used</span>
        </div>
        <div class="baseload-figure">
          <span class="analysis-stat-label">Per year</span>
          <strong class="analysis-stat-value">${F(n*365*i,s)}</strong>
          <span class="analysis-stat-meta">If all of it came from the grid, at this period's average rate</span>
        </div>
      </div>

      <div class="baseload-bar" role="img" aria-label="${c(r,0)} percent of usage is baseload">
        <span class="baseload-bar-fill" style="width:${ae(r,0,100)}%"></span>
      </div>
      <p class="analysis-note">
        Cutting the baseload pays back every hour of every day, so it is usually the cheapest saving available.
        A 100 W reduction here is worth about ${F(.1*24*365*i,s)} a year.
      </p>
    </div>
  `}function _r(t){return`
    <div class="analysis-section-nav" role="tablist" aria-label="Analysis sections">
      ${Ct.map(e=>`
        <button
          class="analysis-section-btn ${e.id===t?"active":""}"
          data-analysis-section="${e.id}"
          role="tab"
          aria-selected="${e.id===t}"
          title="${e.blurb}"
        >${e.label}</button>
      `).join("")}
    </div>
  `}function xr(t){var B,O;const e=t.config,s=t.rangeData,a=t.consumptionTimeseries,n=t.productionTimeseries;if(!e||!s||!a||!n)return`
      <section class="analysis-view">
        <div class="card">
          <p class="muted">Loading analysis data...</p>
        </div>
      </section>
    `;const o=Math.max(0,s.consumption??0),r=Math.max(0,s.production??0),i=Math.max(0,s.exported??0),d=Math.max(0,s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:0)),p=Math.max(0,(s.grid_import!=null?o-s.grid_import:void 0)??s.solar_to_home??d??(s.self_consumed&&s.self_consumed>0?s.self_consumed:r-i)),g=Math.max(0,s.grid_import??o-p),w=Math.max(0,p-d),$=Ft(e,a,((B=t.perMeterProductionTimeseries)==null?void 0:B.meters)??null,d,i),l=As(e,a,((O=t.perMeterProductionTimeseries)==null?void 0:O.meters)??null,d,i),m=Vs(a,n,t.gridImportTimeseries,t.marketExportTimeseries,e,l),h=e.currency||"EUR",b=((e.energy_variable_rate??0)+(e.network_variable_rate??0)+(e.electricity_tax_rate??0)+(e.compensation_fund_rate??0))*(1+(e.vat_rate??0)),x=d*b,S=$?$.totalSelfUseExportEquivalent:d*l,C=$?$.totalFeedInRevenue:i*l,M={consumptionKwh:o,totalSolarCoverageKwh:p,directSolarToHomeKwh:d,communitySolarToHomeKwh:w,exportedKwh:i,billedGridImportKwh:g,coveragePct:o>0?ae(p/o*100,0,100):0,selfConsumedPct:r>0?ae(d/r*100,0,100):0,totalSolarValue:x+m.totals.avoidedExceedanceValue+C,selfConsumptionAdvantage:x-S,variableImportCost:g*b},u=Math.max(1,m.daily.length),f=Ha(m.points.map(V=>V.houseKw)),y=m.points.length>1?Math.max(1e-4,(m.points[1].timestamp-m.points[0].timestamp)/36e5):.25,v=m.points.map(V=>({exportKwh:V.exportKw*y,gridKwh:V.gridKw*y,importRate:V.importRateWithVat,feedInRate:V.feedInRate})),k=ja.map(V=>Ia(v,V)),E=k.length>0?k.reduce((V,z)=>z.netBenefit>V.netBenefit?z:V):null,L=fr(m,M,h,f,E&&E.netBenefit>0?E:null,u),W=t.analysisSection,D=Ct.find(V=>V.id===W)??Ct[0];let P="";switch(W){case"overview":P=`
        ${wr(L)}
        ${nr(m,h,M)}
        ${or(m)}
      `;break;case"patterns":P=`
        <div class="analysis-grid">
          ${lr(t,m)}
          ${ir(t,m)}
        </div>
        <div class="analysis-grid">
          ${br(f,m,h,u)}
          ${yr(m,e.reference_power_kw??0)}
        </div>
      `;break;case"solar":P=`
        <div class="analysis-grid">
          ${cr(m,h,$,b)}
          ${$r(k,h,u,M.exportedKwh)}
        </div>
      `;break;case"costs":P=`
        <div class="analysis-grid">
          ${gr(m,h)}
          ${ur(m,h)}
        </div>
        ${mr(m,t,e)}
      `;break;case"peaks":P=`
        ${pr(m,h)}
        ${hr(m)}
      `;break}return`
    <section class="analysis-view">
      <div class="section-header analysis-section-header">
        <div>
          <span class="badge">Analysis</span>
          <h2>Charts and Optimization</h2>
          <p class="muted">${D.blurb} — ${za(t)}.</p>
        </div>
        <div class="analysis-header-meta">
          <span>${Za(t)}</span>
          <span>${c(m.daily.length,0)} day${m.daily.length===1?"":"s"} analysed</span>
        </div>
      </div>

      ${Lt(t)}
      ${_r(W)}

      ${P}
    </section>
  `}const ms={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function gs(t){return ms[t]?ms[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function kr(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],s=[],a=[],n=[],o=[];for(const i of t.sensors){const d=i.key;d.startsWith("c_")||d==="1-1:1.29.0"||d==="1-1:3.29.0"?e.push(i):d.startsWith("p_")||d==="1-1:2.29.0"||d==="1-1:4.29.0"?s.push(i):d.startsWith("s_")||d.startsWith("1-65:")?a.push(i):d.startsWith("g_")||d.startsWith("7-")?n.push(i):o.push(i)}const r=(i,d,p,g)=>p.length?`
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
                <tr data-sensor-search="${`${gs(w.key)} ${w.key}`.toLowerCase()}">
                  <td class="sensor-name">${gs(w.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${g});">${c(w.value)}</td>
                  <td class="sensor-unit">${w.unit}</td>
                  <td class="sensor-peak">${w.peak_timestamp?Es(w.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
  `}const Sr=11,Is="lu_resilienzpak_electricity_2026",Mr="lu_resilienzpak_gas_2026",Cr=[{id:"lu-electricity-resilienzpak-2026",label:"Luxembourg electricity subsidy 2026",enabled:!0,commodity:"electricity",basis:"grid_import_kwh",amount_gross:.04,start_date:"2026-08-01",end_date:"2026-12-31",vat_included:!0,preset_id:Is,eligibility_note:"Residential customers below 25,000 kWh/year; applies to grid import only.",tariff_already_includes_adjustment:!1},{id:"lu-gas-resilienzpak-2026",label:"Luxembourg gas subsidy 2026",enabled:!0,commodity:"gas",basis:"gas_volume_m3",amount_gross:.15,start_date:"2026-08-01",end_date:"2026-12-31",vat_included:!0,preset_id:Mr,eligibility_note:"Eligible residential gas consumption.",tariff_already_includes_adjustment:!1}];function Tr(t=!0){return Cr.map(e=>({...e,enabled:t}))}const Hs=["electricity","gas"],js=["grid_import_kwh","gas_volume_m3"];function Er(t){const e=[];Hs.includes(t.commodity)||e.push(`invalid commodity: ${String(t.commodity)}`),js.includes(t.basis)||e.push(`invalid basis: ${String(t.basis)}`);const s=Number(t.amount_gross);isFinite(s)?s<0&&e.push("amount_gross must not be negative"):e.push("amount_gross must be a number");const a=et(t.start_date),n=et(t.end_date);return a||e.push("start_date must be YYYY-MM-DD"),n||e.push("end_date must be YYYY-MM-DD"),a&&n&&n<a&&e.push("end_date must not be before start_date"),e}function Dr(t,e=0){let s=Number(t.amount_gross);return isFinite(s)||(s=0),{id:t.id?String(t.id).trim():`custom-${e+1}`,label:t.label&&String(t.label).trim()?String(t.label).trim():"Billing adjustment",enabled:t.enabled!==!1,commodity:Hs.includes(t.commodity)?t.commodity:"electricity",basis:js.includes(t.basis)?t.basis:"grid_import_kwh",amount_gross:s,start_date:String(t.start_date??"").slice(0,10),end_date:String(t.end_date??"").slice(0,10),vat_included:t.vat_included!==!1,preset_id:t.preset_id?String(t.preset_id).trim():"",eligibility_note:t.eligibility_note?String(t.eligibility_note).trim():"",tariff_already_includes_adjustment:!!t.tariff_already_includes_adjustment}}function Ns(t){return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object").map((e,s)=>Dr(e,s)):[]}function et(t){if(!t||!/^\d{4}-\d{2}-\d{2}/.test(t))return null;const e=t.slice(0,10),[s,a,n]=e.split("-").map(Number);if(a<1||a>12||n<1||n>31)return null;const o=new Date(Date.UTC(s,a-1,n));return o.getUTCFullYear()!==s||o.getUTCMonth()!==a-1||o.getUTCDate()!==n?null:e}const Lr=new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Luxembourg",year:"numeric",month:"2-digit",day:"2-digit"});function Wr(t){const e=new Date(t);return Number.isNaN(e.getTime())?null:Lr.format(e)}function Kr(t,e){return!!t.start_date&&!!t.end_date&&t.start_date<=e&&e<=t.end_date}function Rt(t){return t.enabled&&Er(t).length===0}function Tt(t){return Rt(t)&&!t.tariff_already_includes_adjustment}function xe(t){const[e,s,a]=t.split("-").map(Number);return Math.floor(Date.UTC(e,s-1,a)/864e5)}function Gs(t,e,s){const a=et(t.start_date),n=et(t.end_date);if(!a||!n)return 0;const o=a>e?a:e,r=n<s?n:s,i=xe(r)-xe(o)+1;return i>0?i:0}function Et(t,e,s,a,n,o){const r=e*t.amount_gross,i=t.vat_included?r/(1+a):r;return{id:t.id,label:t.label,commodity:t.commodity,basis:t.basis,unit:s,quantity:e,amount_gross:t.amount_gross,total_gross:r,total_net:i,vat_included:t.vat_included,applied:n,estimated:o,preset_id:t.preset_id??"",eligibility_note:t.eligibility_note??""}}function Fr(t,e,s,a,n,o,r,i){const d=t.filter(l=>l.commodity==="electricity"&&l.basis==="grid_import_kwh"&&Rt(l));if(d.length===0)return{lines:[],solarCorrectionGross:0,estimatedAny:!1};const p=[];let g=0,w=!1;if(e&&e.length>0){const l=new Map(d.map(b=>[b.id,0])),m=new Map(d.map(b=>[b.id,0])),h=new Map;for(const b of s??[]){const x=String(b.startedAt??"");h.set(x,(h.get(x)??0)+(Number(b.value)||0))}for(const b of e){const x=Number(b.value)||0,S=String(b.startedAt??""),C=Wr(S);if(C===null)continue;const M=h.get(S)??0,u=Math.max(0,x-M)*.25,f=Math.min(x,M)*.25;for(const y of d)Kr(y,C)&&(l.set(y.id,l.get(y.id)+u),m.set(y.id,m.get(y.id)+f))}for(const b of d){const x=Tt(b);p.push(Et(b,l.get(b.id),"kWh",i,x,!1)),x&&(g+=m.get(b.id)*b.amount_gross)}return{lines:p,solarCorrectionGross:g,estimatedAny:w}}const $=Math.max(1,xe(r)-xe(o)+1);for(const l of d){const m=Gs(l,o,r),h=m/$,b=m>0&&m<$;w=w||b;const x=Tt(l);p.push(Et(l,Math.max(0,a)*h,"kWh",i,x,b)),x&&(g+=Math.max(0,n)*h*l.amount_gross)}return{lines:p,solarCorrectionGross:g,estimatedAny:w}}function Pr(t,e,s,a,n,o){const r=t.filter(w=>w.commodity==="gas"&&w.basis==="gas_volume_m3"&&Rt(w));if(r.length===0)return{lines:[],estimatedAny:!1};let i=!1,d=Math.max(0,e||0);d<=0&&s>0&&(d=s/Sr,i=!0);const p=Math.max(1,xe(n)-xe(a)+1),g=[];for(const w of r){const $=Gs(w,a,n),l=$/p,m=i||$>0&&$<p;g.push(Et(w,d*l,"m3",o,Tt(w),m)),m&&(i=!0)}return{lines:g,estimatedAny:i}}function Rr(t){const e=Ns(t.adjustments),s=Fr(e,t.consumptionItems,t.productionItems,t.fallbackGridImportKwh??0,t.fallbackSelfConsumedKwh??0,t.periodStart,t.periodEnd,t.vatRate||0),a=Pr(e,t.gasVolumeM3??0,t.gasEnergyKwh??0,t.periodStart,t.periodEnd,t.gasVatRate||0),n=i=>{let d=0,p=0;for(const g of i)g.applied&&(d+=g.total_gross,p+=g.total_net);return{gross:d,net:p}},o=n(s.lines),r=n(a.lines);return{electricity:{lines:s.lines,applied_gross:o.gross,applied_net:o.net,solar_correction_gross:s.solarCorrectionGross,estimated:s.estimatedAny},gas:{lines:a.lines,applied_gross:r.gross,applied_net:r.net,estimated:a.estimatedAny},estimated:s.estimatedAny||a.estimatedAny}}const ys=[{kw:3,fixedMonthlyFee:7.42},{kw:7,fixedMonthlyFee:12.84},{kw:12,fixedMonthlyFee:19.61},{kw:17,fixedMonthlyFee:26.39},{kw:27,fixedMonthlyFee:39.94},{kw:43,fixedMonthlyFee:61.62},{kw:70,fixedMonthlyFee:98.2},{kw:100,fixedMonthlyFee:138.85},{kw:150,fixedMonthlyFee:206.6,existingContractsOnly:!0},{kw:200,fixedMonthlyFee:274.35,existingContractsOnly:!0}];function Ue(t){if(!t)return null;const e=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(e){const[,a,n,o]=e;return new Date(Number(a),Number(n)-1,Number(o))}const s=new Date(t);return Number.isNaN(s.getTime())?null:new Date(s.getFullYear(),s.getMonth(),s.getDate())}function Ar(t,e,s,a,n){const o=new Date,r=Ue(a),i=Ue(n);let d=r,p=i;if(!d||!p)switch(t){case"yesterday":{const h=new Date(o);h.setDate(h.getDate()-1),d=new Date(h.getFullYear(),h.getMonth(),h.getDate()),p=new Date(d);break}case"this_week":{const h=new Date(o),b=h.getDay()||7;d=new Date(h.getFullYear(),h.getMonth(),h.getDate()-b+1),p=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_week":{const h=new Date(o),b=h.getDay()||7,x=new Date(h.getFullYear(),h.getMonth(),h.getDate()-b+1);d=new Date(x.getFullYear(),x.getMonth(),x.getDate()-7),p=new Date(x.getFullYear(),x.getMonth(),x.getDate()-1);break}case"this_month":{d=new Date(o.getFullYear(),o.getMonth(),1),p=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_month":{d=new Date(o.getFullYear(),o.getMonth()-1,1),p=new Date(o.getFullYear(),o.getMonth(),0);break}case"this_year":{d=new Date(o.getFullYear(),0,1),p=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_year":{d=new Date(o.getFullYear()-1,0,1),p=new Date(o.getFullYear()-1,11,31);break}case"custom":{d=Ue(e)??new Date(o.getFullYear(),o.getMonth(),o.getDate()),p=Ue(s)??new Date(d);break}default:{d=new Date(o.getFullYear(),o.getMonth(),o.getDate()-1),p=new Date(d);break}}if(p<d){const h=d;d=p,p=h}let g=0,w=0;const $=new Date(d);for(;$<=p;){const h=new Date($.getFullYear(),$.getMonth()+1,0).getDate();w+=1/h,g+=1,$.setDate($.getDate()+1)}const l=d.getFullYear()===p.getFullYear()&&d.getMonth()===p.getMonth()&&d.getDate()===1&&p.getDate()===new Date(p.getFullYear(),p.getMonth()+1,0).getDate(),m=h=>`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}-${String(h.getDate()).padStart(2,"0")}`;return{days:g,factor:w,label:l?"full month":`${g} day${g===1?"":"s"}`,startIso:m(d),endIso:m(p)}}function Vr(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function vs(t){const[e,s]=t.split(":").map(a=>parseInt(a,10)||0);return e*60+s}function Os(t,e,s,a){if(!Vr(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),o=vs(s),r=vs(a);return o===r?!0:o<r?n>=o&&n<r:n>=o||n<r}function Ir(t,e){return e.find(s=>Os(t,s.day_group,s.start_time,s.end_time))}function Hr(t,e){return e.find(s=>Os(t,s.day_group,s.start_time,s.end_time))}function fs(t,e,s,a,n,o=[]){var l;const r=new Map;let i=0,d=0,p=0,g=0,w=0;const $=new Map;for(const m of o){const h=Number(m.value)||0;$.set(m.startedAt,($.get(m.startedAt)??0)+h)}for(const m of t){const h=Number(m.value)||0,b=h*.25,x=$.get(m.startedAt)??0,S=Math.max(0,h-x),C=new Date(m.startedAt);if(Number.isNaN(C.getTime()))continue;const M=Ir(C,a),u=Hr(C,n),f=(M==null?void 0:M.rate)??e,y=((l=M==null?void 0:M.label)==null?void 0:l.trim())||"Base tariff",v=(u==null?void 0:u.reference_power_kw)??s;i+=b*f,w=Math.max(w,h),g=Math.max(g,S),h>v&&(p+=(h-v)*.25),S>v&&(d+=(S-v)*.25);const k=`${y}__${f}`,E=r.get(k);E?E.kwh+=b:r.set(k,{label:y,rate:f,kwh:b})}return{energyCost:i,exceedanceKwh:d,grossExceedanceKwh:p,avoidedExceedanceKwh:Math.max(0,p-d),peakPowerKw:g,grossPeakPowerKw:w,rateBreakdown:Array.from(r.values()).sort((m,h)=>m.label.localeCompare(h.label))}}function jr(t){var ts,ss,as,rs;const e=t.config,s=t.rangeData;if(!e||!s)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const a=s.consumption||0,n=s.production||0,o=s.exported||0,r=Math.max(0,o),i=s.grid_import,d=(s.solar_to_home??s.direct_solar_to_home??s.self_consumed??n)>0,p=i!=null&&!(i<=0&&a>0&&!d),g=Math.max(0,(p?a-i:void 0)??s.solar_to_home??s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:n-r)),w=Math.min(g,Math.max(0,s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:n-r))),$=Math.max(0,g-w),l=Math.max(0,i!=null&&!(i<=0&&a>0&&g<=0)?i:a-g),m=s.peak_power_kw||0,h=e.reference_power_kw||5,b=s.exceedance_kwh||0,x=s.gas_energy||0,S=s.gas_volume||0,C=x>0||S>0,M=e.consumption_rate_windows??[],u=e.reference_power_windows??[],f=t.consumptionTimeseries?fs(t.consumptionTimeseries.items,e.energy_variable_rate,h,M,u,((ts=t.productionTimeseries)==null?void 0:ts.items)??[]):null,y=M.length>0&&!!f&&Math.abs(l-a)<.01,v=u.length>0&&!!f,k=f?f.peakPowerKw:m,E=f?f.exceedanceKwh:b,{days:L,factor:W,label:D,startIso:P,endIso:B}=Ar(t.range,t.customStart,t.customEnd,s.start,s.end),O=e.energy_fixed_fee*W,V=e.network_metering_rate*W,z=e.network_power_ref_rate*W,pe=y?f.energyCost:l*e.energy_variable_rate,le=l*e.network_variable_rate,re=E*e.exceedance_rate,de=e.meter_monthly_fees??[],U=l*e.compensation_fund_rate,H=l*e.electricity_tax_rate,X=Math.max(0,e.domiciliation_discount??0)*W,J=Math.max(0,e.connect_discount??0)*W,he=y?f.rateBreakdown.map(_=>_.kwh*_.rate):[pe],Pe=de.map(_=>(_.fee||0)*W),Re=[...he,O,V,z,le,re,...Pe,U,H,-X,-J],ye=N(Re.reduce((_,j)=>_+N(j),0)),Q=Rr({adjustments:e.billing_adjustments,vatRate:e.vat_rate,gasVatRate:e.gas_vat_rate??.08,periodStart:P,periodEnd:B,consumptionItems:((ss=t.consumptionTimeseries)==null?void 0:ss.items)??null,productionItems:((as=t.productionTimeseries)==null?void 0:as.items)??null,fallbackGridImportKwh:l,fallbackSelfConsumedKwh:g,gasVolumeM3:S,gasEnergyKwh:x}),ve=Q.electricity.lines,I=Q.gas.lines,ke=ve.some(_=>_.applied&&Math.abs(_.total_gross)>1e-9),st=I.some(_=>_.applied&&Math.abs(_.total_gross)>1e-9),at=Q.electricity.applied_net,Zs=Q.gas.applied_net,At=Q.estimated,rt=ye,nt=N(ye-N(at)),Vt=N(nt*e.vat_rate),Se=N(nt+Vt),fe=Kt(e),q=Ft(e,t.consumptionTimeseries,((rs=t.perMeterProductionTimeseries)==null?void 0:rs.meters)??null,w,r),ot=fe.filter(_=>isFinite(_.rate)&&_.rate>0),ee=fe.length>1,Ae=q?q.weightedExportRate:ot.length>0?ot.reduce((_,j)=>_+j.rate,0)/ot.length:e.feed_in_tariff,ne=q?q.totalFeedInRevenue:r*Ae,It=ee&&fe.length>0?r/fe.length:r,it=q?q.meters:fe.map(_=>({..._,producedKwh:0,exportedKwh:It,revenue:It*_.rate,selfConsumedKwh:0,exportEquivalentForSelfUse:0})),Me=!!q,Ht=(q==null?void 0:q.allocationMode)??"prorata",te=q?q.meters.reduce((_,j)=>_+j.selfConsumedKwh,0):w,jt=e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate,Xs=jt*(1+e.vat_rate),Nt=te*jt,Gt=Nt*e.vat_rate,lt=Q.electricity.solar_correction_gross,we=Nt+Gt-lt,Js=q?q.totalSelfUseExportEquivalent:te*Ae,Ot=we-Js,Ce=Math.max(0,(f==null?void 0:f.avoidedExceedanceKwh)??0),dt=Ce*e.exceedance_rate,Bt=dt*e.vat_rate,Te=dt+Bt,Ve=Ce>1e-4,Ie=we+Te+ne,ct=it.map(_=>{const j=_.selfConsumedKwh*Xs,A=j-_.exportEquivalentForSelfUse;return{..._,selfUseSavings:j,selfUseVsExport:A,totalTrackedValue:j+_.revenue}}),Qs=Me&&ct.length>0,He=Se-ne,Ut=(e.gas_fixed_fee??6.5)*W,qt=x*(e.gas_variable_rate??.055),Yt=(e.gas_network_fee??4.8)*W,zt=x*(e.gas_network_variable_rate??.012),Zt=x*(e.gas_tax_rate??.001),Xt=N([Ut,qt,Yt,zt,Zt].reduce((_,j)=>_+N(j),0)),ut=Xt,pt=N(Xt-N(Zs)),Jt=N(pt*(e.gas_vat_rate??.08)),ht=N(pt+Jt),R=e.currency||"EUR",T=_=>`${c(_,2)} ${R}`,mt=_=>`${_>0?"+":_<0?"-":""}${c(Math.abs(_),2)} ${R}`,K=_=>c(_,3),gt=_=>c(_,3),ea=_=>_>=0?"comparison-delta-savings":"comparison-delta-extra",Qt=(_,j)=>_.map(A=>{const me=A.unit==="kWh"?`${K(A.quantity)} kWh`:`${gt(A.quantity)} m³`,Ee=A.estimated?' <span class="muted">(estimated)</span>':"",Ne=A.vat_included?A.total_gross:A.total_gross*(1+j);return A.applied?`
            <tr class="revenue-row">
              <td>${A.label}${Ee}${A.eligibility_note?`<br/><span class="muted" style="font-size: var(--text-xs);">${A.eligibility_note}</span>`:""}</td>
              <td style="text-align: right;">${me} × ${c(A.amount_gross,4)} ${R}/${A.unit}${A.vat_included?" incl. VAT":" excl. VAT"}<br/>= −${T(Ne)}${A.vat_included?" incl. VAT":""}</td>
              <td class="revenue-amount" style="text-align: right;">−${T(A.total_net)}</td>
            </tr>
          `:`
            <tr class="revenue-row">
              <td>${A.label}${Ee}<br/><span class="muted" style="font-size: var(--text-xs);">Already reflected in your configured tariff — not deducted again</span></td>
              <td style="text-align: right;">${me} × ${c(A.amount_gross,4)} ${R}/${A.unit}</td>
              <td style="text-align: right;"><span class="muted">in tariff</span></td>
            </tr>
          `}).join(""),ta=Qt(ve,e.vat_rate),sa=Qt(I,e.gas_vat_rate??.08),es=N(rt+N(rt*e.vat_rate)),aa=ve.length>0,ra=I.length>0,na=Qs?`
            <tr class="section-label"><td colspan="3">Per-System Self-Use vs Export</td></tr>
            ${ct.map(_=>`
            <tr>
              <td>${_.displayName}</td>
              <td style="text-align: right;">
                ${_.shortId}<br/>
                Produced ${K(_.producedKwh)} kWh<br/>
                Kept on-site ${K(_.selfConsumedKwh)} kWh<br/>
                Sold ${K(_.exportedKwh)} kWh<br/>
                ${_.label} ${c(_.rate,4)} ${R}/kWh${ee?`<br/>${Ye(_.selfUsePriority)}`:""}
              </td>
              <td style="text-align: right;">
                <strong>${T(_.totalTrackedValue)}</strong><br/>
                <span class="${ea(_.selfUseVsExport)}">${mt(_.selfUseVsExport)}</span> self-use vs export<br/>
                <span class="muted">${T(_.selfUseSavings)} kept value + ${T(_.revenue)} sold</span>
              </td>
            </tr>
            `).join("")}
            <tr class="subtotal-row">
              <td colspan="2"><strong>Tracked per-system value</strong></td>
              <td style="text-align: right;"><strong>${T(ct.reduce((_,j)=>_+j.totalTrackedValue,0))}</strong></td>
            </tr>
      `:"",oa=Me?`Compared with exporting the same ${K(te)} kWh using ${Ht==="prorata"?"a pro-rata split across the PV systems":"the configured PV self-use priority"} and each system's own feed-in tariff`:`Compared with selling the same ${K(te)} kWh at ${c(Ae,4)} ${R}/kWh`,yt=ys.find(_=>Math.abs(_.kw-h)<.05),ia=ye-N(z)-N(re),vt=f?ys.map(_=>{var ns;const j=fs(t.consumptionTimeseries.items,e.energy_variable_rate,_.kw,M,u,((ns=t.productionTimeseries)==null?void 0:ns.items)??[]),A=_.fixedMonthlyFee*W,me=j.exceedanceKwh*e.exceedance_rate,Ee=N(ia+N(A)+N(me)),Ne=N(Ee+N(Ee*e.vat_rate));return{..._,fixedCharge:A,exceedanceKwh:j.exceedanceKwh,exceedanceCharge:me,total:Ne,deltaVsCurrent:Ne-Se}}):[],je=vt.reduce((_,j)=>!_||j.total<_.total?j:_,null),la=_=>Math.abs(_)<.005?"Current total":`${_>0?"+":"-"}${T(Math.abs(_))}`,ft=s.start&&s.end?`${ce(s.start)} — ${ce(s.end)}`:t.range.replace("_"," ").replace(/\b\w/g,_=>_.toUpperCase()),da=E>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${c(k,1)} kW</strong> &mdash; ${v?"Reference power windows active":`Reference power level: ${c(h,1)} kW`}</p>
        <p>Exceedance volume: <strong>${K(E)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${T(re)}</p>
      </div>`:"",ca=y?f.rateBreakdown.map(_=>`
            <tr>
              <td>${_.label} (${K(_.kwh)} kWh)</td>
              <td style="text-align: right;">${c(_.rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(_.kwh*_.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Supplier rate (${K(l)} kWh bought from grid)</td>
              <td style="text-align: right;">${c(e.energy_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(pe)}</td>
            </tr>
          `,ua=v?`Reference power windows active (${u.length})`:`${c(h,1)} kW`,pa=y?`Time-of-use windows active (${M.length})`:`${c(e.energy_variable_rate,4)} ${R}/kWh`,ha=vt.map(_=>{const j=!!je&&_.kw===je.kw,A=!!yt&&_.kw===yt.kw,me=_.deltaVsCurrent<-.005?"comparison-delta-savings":_.deltaVsCurrent>.005?"comparison-delta-extra":"";return`
            <tr class="${j?"reference-power-best-row":""}${A?" reference-power-current-row":""}">
              <td>
                <div class="reference-level-cell">
                  <span class="reference-level-kw">${c(_.kw,0)} kW</span>
                  ${j?'<span class="reference-level-badge best">Financially optimal</span>':""}
                  ${A?'<span class="reference-level-badge current">Current</span>':""}
                  ${_.existingContractsOnly?'<span class="reference-level-badge legacy">Existing contracts</span>':""}
                </div>
              </td>
              <td style="text-align: right;">${T(_.fixedCharge)}</td>
              <td style="text-align: right;">${T(_.exceedanceCharge)}</td>
              <td style="text-align: right;"><strong>${T(_.total)}</strong></td>
              <td class="${me}" style="text-align: right;">${la(_.deltaVsCurrent)}</td>
            </tr>
          `}).join(""),ma=vt.length>0?`
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${v?"Configured reference power windows stay active in this comparison.":"One reference power level is applied to the full selected period."}
              ${yt?"":`Your current configuration uses ${c(h,1)} kW, which is outside the standard Creos low-voltage reference power levels.`}
            </p>
          </div>
          ${je?`<div class="reference-power-optimum">
                <span class="reference-level-badge best">Financially optimal: ${c(je.kw,0)} kW</span>
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
            ${ha}
          </tbody>
        </table>
      </div>
    `:`
      <div class="card reference-power-card">
        <p class="muted">Reference power level comparison requires 15-minute load-curve data for the selected period.</p>
      </div>
    `;return`
    <section class="invoice-view">
      ${Lt(t)}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Supplier Bill Estimate &mdash; ${ft}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the selected period. Feed-in revenue and net position are shown separately.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${K(a)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${K(l)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${K(n)} kWh produced</span>
          ${r>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${K(r)} kWh exported</span>`:""}
          ${C?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${K(x)} kWh gas (${gt(S)} m³)</span>`:""}
        </div>
      </div>

      ${da}

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
              <td style="text-align: right;">${c(e.energy_fixed_fee,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(O)}</td>
            </tr>
            ${ca}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${c(e.network_metering_rate,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(V)}</td>
            </tr>
            <tr>
              <td>Reference power level (${ua}) <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${c(e.network_power_ref_rate,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(z)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${K(l)} kWh bought from grid)</td>
              <td style="text-align: right;">${c(e.network_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(le)}</td>
            </tr>
            <tr class="${E>0?"exceedance-row":""}">
              <td>Exceedance charge (${K(E)} kWh above the reference power level)</td>
              <td style="text-align: right;">${c(e.exceedance_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(re)}</td>
            </tr>

            ${de.filter(_=>_.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${de.filter(_=>_.fee>0).map(_=>`
            <tr>
              <td>${_.label||"…"+_.meter_id.slice(-8)} <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${c(_.fee,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(_.fee*W)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${c(e.compensation_fund_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(U)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${c(e.electricity_tax_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(H)}</td>
            </tr>
            ${X>0||J>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            ${X>0?`
            <tr>
              <td>Domiciliation Discount <span class="muted">(${D})</span></td>
              <td style="text-align: right;">-${c(Math.max(0,e.domiciliation_discount??0),2)} ${R}/mo</td>
              <td style="text-align: right;">-${T(X)}</td>
            </tr>
            `:""}
            ${J>0?`
            <tr>
              <td>Electronic Invoice Discount <span class="muted">(${D})</span></td>
              <td style="text-align: right;">-${c(Math.max(0,e.connect_discount??0),2)} ${R}/mo</td>
              <td style="text-align: right;">-${T(J)}</td>
            </tr>
            `:""}
            `:""}

            ${aa?`
            <tr class="section-label"><td colspan="3">Government Aid &amp; Billing Adjustments</td></tr>
            ${ta}
            <tr class="subtotal-row">
              <td colspan="2">Subtotal before adjustments (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(rt)}</strong></td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(nt)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${c(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(Vt)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Supplier Bill Estimate</strong></td>
              <td style="text-align: right;"><strong>${T(Se)}</strong></td>
            </tr>
            ${ke?`
            <tr class="subtotal-row">
              <td colspan="2">Total before billing adjustments (incl. VAT)</td>
              <td style="text-align: right;">${T(es)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2">Total after billing adjustments (incl. VAT)</td>
              <td style="text-align: right;">${T(Se)}${At?' <span class="muted">(estimated)</span>':""}</td>
            </tr>
            `:""}

            ${n>0?`
            <tr class="section-label revenue-section"><td colspan="3">Solar Value & Feed-in Revenue</td></tr>
            <tr class="revenue-row">
              <td>Solar produced</td>
              <td style="text-align: right;">Total generation during this period</td>
              <td style="text-align: right;">${K(n)} kWh</td>
            </tr>
            <tr class="revenue-row">
              <td>Own solar used at home</td>
              <td style="text-align: right;">${K(te)} kWh from your own production avoided grid purchases</td>
              <td style="text-align: right;">${T(we)} saved</td>
            </tr>
            ${$>0?`
            <tr class="revenue-row">
              <td>Additional solar received</td>
              <td style="text-align: right;">${K($)} kWh covered at home from shared/community solar</td>
              <td style="text-align: right;">Informational</td>
            </tr>
            `:""}
            <tr class="revenue-row">
              <td>Export sold</td>
              <td style="text-align: right;">${K(r)} kWh sent to grid</td>
              <td style="text-align: right;">${T(ne)} earned</td>
            </tr>
            ${Ve?`
            <tr class="revenue-row">
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${K(Ce)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${T(Te)} saved</td>
            </tr>
            `:""}
            ${r>0?`
            <tr class="section-label"><td colspan="3">Credit Calculation</td></tr>
            ${it.map(_=>`
            <tr class="revenue-row">
              <td>Exported (${ee?_.displayName:K(_.exportedKwh)+" kWh"})</td>
              <td style="text-align: right;">${ee?`${_.shortId}<br/>`:""}${K(_.exportedKwh)} kWh<br/>${_.label}<br/>${c(_.rate,4)} ${R}/kWh${Me&&ee?`<br/>${Ye(_.selfUsePriority)}`:""}</td>
              <td class="revenue-amount" style="text-align: right;">-${T(_.revenue)}</td>
            </tr>
            `).join("")}
            ${ee?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${K(r)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${c(Ae,4)} ${R}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${T(ne)}</td>
            </tr>
            `:""}
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total Solar Value</strong></td>
              <td style="text-align: right;"><strong>${T(Ie)}</strong></td>
            </tr>
            <tr class="net-total-row">
              <td colspan="2"><strong>Net Electricity Position</strong></td>
              <td style="text-align: right;"><strong>${T(He)}</strong></td>
            </tr>
            `:""}
            ${r<=0?`
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total Solar Value</strong></td>
              <td style="text-align: right;"><strong>${T(Ie)}</strong></td>
            </tr>
            `:""}
            `:""}
          </tbody>
        </table>
      </div>

      ${ma}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Supplier bill estimate: ${T(Se)}</strong>${ne>0?` Feed-in revenue is shown separately as ${T(ne)}, giving a net electricity position of ${T(He)} after export credit.`:""}
          ${ke?` Government aid and billing adjustments reduce this estimate by ${T(Q.electricity.applied_gross)} incl. VAT (total before adjustments: ${T(es)}).${At?" Some adjustment values are estimated from incomplete interval data.":""}`:""}
          <br/>
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${K(l)} kWh), not total home usage.
          Supplier pricing: ${pa}.
          Fixed monthly charges are prorated across the viewed period (${L} days, ${D}, equivalent to ${c(W,2)} monthly charges).
          Peak load (${c(k,1)} kW) is compared against ${v?"your configured reference power windows":`your reference power level (${c(h,1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${c(e.exceedance_rate,4)} ${R}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${C?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${ft}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${K(x)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${gt(S)} m³</span>
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
              <td style="text-align: right;">${c(e.gas_fixed_fee??6.5,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(Ut)}</td>
            </tr>
            <tr>
              <td>Energy (${K(x)} kWh)</td>
              <td style="text-align: right;">${c(e.gas_variable_rate??.055,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(qt)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${c(e.gas_network_fee??4.8,2)} ${R}/mo</td>
              <td style="text-align: right;">${T(Yt)}</td>
            </tr>
            <tr>
              <td>Network Variable (${K(x)} kWh)</td>
              <td style="text-align: right;">${c(e.gas_network_variable_rate??.012,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(zt)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${K(x)} kWh)</td>
              <td style="text-align: right;">${c(e.gas_tax_rate??.001,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(Zt)}</td>
            </tr>

            ${ra?`
            <tr class="section-label"><td colspan="3">Government Aid &amp; Billing Adjustments</td></tr>
            ${sa}
            <tr class="subtotal-row">
              <td colspan="2">Subtotal before adjustments (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(ut)}</strong></td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${T(pt)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${c((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${T(Jt)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${T(ht)}</strong></td>
            </tr>
            ${st?`
            <tr class="subtotal-row">
              <td colspan="2">Gas total before billing adjustments (incl. VAT)</td>
              <td style="text-align: right;">${T(N(ut+N(ut*(e.gas_vat_rate??.08))))}</td>
            </tr>
            `:""}
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Net Energy Position: ${T(He+ht)}</strong>
          (Electricity net position: ${T(He)} + Gas supplier estimate: ${T(ht)})
        </p>
      </div>
      `:""}

      ${n>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Value &mdash; ${ft}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${T(Ie)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${K(n)} kWh</div>
            <div class="solar-stat-label">Solar produced</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${T(we)}</div>
            <div class="solar-stat-label">Saved by using ${K(te)} kWh of your own solar at home</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${mt(Ot)}</div>
            <div class="solar-stat-label">Extra value from using it yourself instead of selling it</div>
          </div>
          ${Ve?`
          <div class="solar-stat">
            <div class="solar-stat-value">${T(Te)}</div>
            <div class="solar-stat-label">Saved by staying under the reference power</div>
          </div>
          `:""}
          <div class="solar-stat">
            <div class="solar-stat-value">${T(ne)}</div>
            <div class="solar-stat-label">Earned by selling ${K(r)} kWh</div>
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
              <td style="text-align: right;">${K(n)} kWh</td>
            </tr>
            <tr>
              <td>Own solar used at home</td>
              <td style="text-align: right;">${K(te)} kWh from your own production avoided grid purchases</td>
              <td style="text-align: right;">${T(we)} saved</td>
            </tr>
            ${$>0?`
            <tr>
              <td>Additional solar received</td>
              <td style="text-align: right;">${K($)} kWh covered at home from shared/community solar</td>
              <td style="text-align: right;">Informational</td>
            </tr>
            `:""}
            <tr>
              <td>Extra vs exporting instead</td>
              <td style="text-align: right;">${oa}</td>
              <td style="text-align: right;">${mt(Ot)}</td>
            </tr>
            <tr>
              <td>Export sold</td>
              <td style="text-align: right;">${K(r)} kWh sent to grid</td>
              <td style="text-align: right;">${T(ne)} earned</td>
            </tr>
            ${Ve?`
            <tr>
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${K(Ce)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${T(Te)} saved</td>
            </tr>
            `:""}

            ${na}

            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${K(te)} kWh)</td>
              <td style="text-align: right;">${c(e.energy_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(te*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${c(e.network_variable_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(te*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${c(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${R}/kWh</td>
              <td style="text-align: right;">${T(te*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${c(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(Gt)}</td>
            </tr>
            ${lt>1e-4?`
            <tr>
              <td>Government aid not received on own solar${Q.electricity.estimated?' <span class="muted">(estimated)</span>':""}</td>
              <td style="text-align: right;">Self-consumed kWh during the aid period avoid subsidised grid imports</td>
              <td class="revenue-amount" style="text-align: right;">−${T(lt)}</td>
            </tr>
            `:""}
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${T(we)}</strong></td>
            </tr>

            ${Ve?`
            <tr class="section-label"><td colspan="3">Reference Power Savings</td></tr>
            <tr>
              <td>Exceedance avoided</td>
              <td style="text-align: right;">${K(Ce)} kWh above the reference power level</td>
              <td style="text-align: right;">${T(dt)}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${c(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(Bt)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Reference Power Savings</strong></td>
              <td style="text-align: right;"><strong>${T(Te)}</strong></td>
            </tr>
            `:""}

            ${r>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${it.map(_=>`
            <tr>
              <td>Sold to grid ${ee?`(${_.displayName})`:`(${K(_.exportedKwh)} kWh)`}</td>
              <td style="text-align: right;">${ee?`${_.shortId}<br/>`:""}${K(_.exportedKwh)} kWh<br/>${_.label}<br/>${c(_.rate,4)} ${R}/kWh${Me&&ee?`<br/>${Ye(_.selfUsePriority)}`:""}</td>
              <td style="text-align: right;">${T(_.revenue)}</td>
            </tr>
            `).join("")}
            ${ee?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${T(ne)}</strong></td>
            </tr>
            `:""}
            `:""}

            <tr class="total-row solar-total-row">
              <td colspan="2"><strong>💰 Total Solar Panel Value</strong></td>
              <td style="text-align: right;"><strong>${T(Ie)}</strong></td>
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
          ${fe.some(_=>_.mode==="sensor")?"Market price sourced from Home Assistant sensor.":"Using fixed feed-in tariff — configure a market price sensor in Settings for real-time rates."}
          ${Me?Ps(Ht):ee?"Displayed per-meter feed-in kWh are currently equal-split estimates because per-meter production data was not available for this view.":""}
        </p>
      </div>
      `:""}
    </section>
  `}const Nr=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],Gr=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Reference Power Fixed Charge",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"domiciliation_discount",label:"Domiciliation Discount",step:"0.01",unit:"EUR/mo",type:"number"},{key:"connect_discount",label:"Electronic Invoice Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"Government Aid & Billing Adjustments",icon:"🏛️",fields:[]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],tt=new Set;let ws=!1;function $s(t,e){e?tt.add(t):tt.delete(t)}function Or(t,e){return ws||(ws=!0,e.forEach(s=>tt.add(s))),tt.has(t)}const Br=["consumption","production","solar_consumption","export","export_consumption","gas"],Bs={consumption:"Consumption",production:"Solar production",solar_consumption:"Solar production (consumption-metered)",export:"Grid export",export_consumption:"Grid export (consumption-metered)",gas:"Gas"},Us={consumption:"⚡",production:"☀️",solar_consumption:"☀️",export:"",export_consumption:"",gas:"🔥"},Ur={consumption:"House/grid import meter",production:"PV generation, including energy that may be self-consumed",solar_consumption:"Solar production measured as consumption",export:"Export-only meter for energy sold/sent to the grid",export_consumption:"Grid export measured on the consumption register (active consumption OBIS)",gas:"Gas consumption meter"};function qr(t){return t.map(e=>{const s=Us[e],a=Bs[e]??e;return`<span class="meter-type-badge meter-type-${e}">${s?`${s} `:""}${a}</span>`}).join(" ")}function Yr(t,e,s){return`
          <label class="meter-type-cb">
            <input type="checkbox" name="meter_${t}_${e}" ${s.types.includes(e)?"checked":""} />
            <span class="meter-type-copy">
              <strong>${Bs[e]??e}</strong>
              <small>${Ur[e]??""}</small>
            </span>
          </label>
  `}function bs(t,e,s){const a=t+1;return s?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${a}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${qr(e.types)}</div>
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
          ${Br.map(n=>Yr(t,n,e)).join("")}
        </div>
      </div>
    </div>
  `}function qs(t){return Nr.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function zr(t,e){return`
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
            ${qs(e.day_group??"all")}
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
  `}function Zr(t,e){return`
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
            ${qs(e.day_group??"all")}
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
  `}function Xr(t,e){const s=!!e.preset_id,n=e.preset_id===Is&&e.enabled&&!e.tariff_already_includes_adjustment;return`
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
  `}function Jr(t,e="ha",s){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const a=e==="standalone"?(s==null?void 0:s.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let n="";if(e==="standalone"){const v=a.map((E,L)=>bs(L,E,!1)).join("");s==null||s.proxy_url,n=`
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
              ${v}
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
    `}else{const v=(t==null?void 0:t.meters)??[];n=`
      <div class="card" style="margin-bottom: var(--sp-6); padding: var(--sp-4) var(--sp-5);">
        <p class="muted" style="margin: 0 0 var(--sp-3) 0;">🔒 API credentials are managed through Home Assistant &rarr; Settings &rarr; Integrations &rarr; Leneda</p>
        <div class="form-section">
          <div class="form-section-title">📊  Configured Metering Points</div>
          <div id="meters-container">
            ${v.length>0?v.map((E,L)=>bs(L,E,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const o=v=>v.map(k=>{const E=t?t[k.key]??"":"";return`
        <div class="form-row">
          <label for="cfg-${k.key}">${k.label}</label>
          <div class="input-group">
            <input
              id="cfg-${k.key}"
              name="${k.key}"
              type="${k.type}"
              ${k.type==="number"?`step="${k.step}"`:""}
              value="${E}"
            />
            ${k.unit?`<span class="input-unit">${k.unit}</span>`:""}
          </div>
        </div>
      `}).join(""),r=((t==null?void 0:t.meters)??[]).filter(v=>v.types.includes("production")||v.types.includes("solar_consumption")),i=(t==null?void 0:t.feed_in_rates)??[],d=e==="ha";function p(v){return i.find(k=>k.meter_id===v)??{meter_id:v,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:"",display_name:"",self_use_priority:null}}const g=r.length===0?'<p class="muted">No solar production meters configured — add a meter with Solar production above.</p>':r.map((v,k)=>{const E=p(v.id),L=v.id?"…"+v.id.slice(-8):`Meter ${k+1}`,W=St(v.id,k+1,E.display_name);return`
          <div class="feed-in-meter-card" data-meter-idx="${k}" data-meter-id="${v.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${W}</span>
              <code style="font-size: var(--text-sm);">${L}</code>
              <input type="hidden" name="feed_in_rate_${k}_meter_id" value="${v.id}" />
            </div>
            <div class="form-row">
              <label for="cfg-feed_in_rate_${k}_display_name">System Name</label>
              <div class="input-group">
                <input
                  id="cfg-feed_in_rate_${k}_display_name"
                  name="feed_in_rate_${k}_display_name"
                  type="text"
                  value="${E.display_name??""}"
                  placeholder="${St(v.id,k+1)}"
                />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-feed_in_rate_${k}_priority">Self-use Priority</label>
              <div class="input-group">
                <input
                  id="cfg-feed_in_rate_${k}_priority"
                  name="feed_in_rate_${k}_self_use_priority"
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
                  <input type="radio" name="feed_in_rate_${k}_mode" value="fixed" ${E.mode==="fixed"?"checked":""} />
                  <span class="mode-label">💶 Fixed Tariff</span>
                </label>
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${k}_mode" value="sensor" ${E.mode==="sensor"?"checked":""} />
                  <span class="mode-label">📡 HA Sensor</span>
                </label>
              </div>
            </div>
            <div class="feed-in-fixed-fields" data-rate-idx="${k}" style="${E.mode==="fixed"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${k}_tariff">Feed-in Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${k}_tariff" name="feed_in_rate_${k}_tariff" type="number" step="0.0001" value="${E.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
              </div>
            </div>
            <div class="feed-in-sensor-fields" data-rate-idx="${k}" style="${E.mode==="sensor"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${k}_sensor">Market Price Sensor</label>
                <div class="input-group sensor-picker-group">
                  <input
                    id="cfg-feed_in_rate_${k}_sensor"
                    name="feed_in_rate_${k}_sensor_entity"
                    type="text"
                    value="${E.sensor_entity}"
                    placeholder="${d?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${d&&k===0?'<datalist id="ha-entity-list"></datalist>':""}
              </div>
              <div class="form-row">
                <label for="cfg-feed_in_rate_${k}_fallback">Fallback Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${k}_fallback" name="feed_in_rate_${k}_fallback_tariff" type="number" step="0.0001" value="${E.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
                <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                  Used when the sensor is unavailable.
                </p>
              </div>
            </div>
          </div>
        `}).join(""),w=((t==null?void 0:t.meters)??[]).some(v=>v.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),$=(t==null?void 0:t.consumption_rate_windows)??[],l=(t==null?void 0:t.reference_power_windows)??[],m=(t==null?void 0:t.meters)??[],h=(t==null?void 0:t.meter_monthly_fees)??[];function b(v){return h.find(k=>k.meter_id===v)??{meter_id:v,label:"",fee:0}}const x=m.length===0?'<p class="muted">No meters configured.</p>':m.map((v,k)=>{const E=b(v.id),L=v.id?"…"+v.id.slice(-8):`Meter ${k+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${v.types.map(D=>Us[D]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${L}</code>
              <input type="hidden" name="meter_fee_${k}_meter_id" value="${v.id}" />
            </div>
            <div class="form-row" style="margin-bottom: var(--sp-2);">
              <label for="cfg-meter_fee_${k}_label">Label</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${k}_label" name="meter_fee_${k}_label" type="text" value="${E.label||`Meter ${k+1} metering fee`}" placeholder="e.g. Smart meter rental" />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-meter_fee_${k}_fee">Monthly Fee</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${k}_fee" name="meter_fee_${k}_fee" type="number" step="0.01" value="${E.fee}" />
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
      ${$.length>0?$.map((v,k)=>zr(k,v)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,C=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${l.length>0?l.map((v,k)=>Zr(k,v)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,M=Ns(t==null?void 0:t.billing_adjustments),u=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Dated per-unit subsidies, rebates, supplier credits or temporary taxes. Amounts are deducted as separate invoice
      lines &mdash; your tariff prices are never modified. Date ranges are inclusive (Europe/Luxembourg).
      Overlapping adjustments stack. If your configured tariff already includes an adjustment, tick
      <strong>My entered tariff already includes this adjustment</strong> to avoid double-counting.
    </p>
    <div id="adjustments-container">
      ${M.length>0?M.map((v,k)=>Xr(k,v)).join(""):'<p class="muted">No billing adjustments configured.</p>'}
    </div>
    <div style="display: flex; gap: var(--sp-3); flex-wrap: wrap; margin-top: var(--sp-3);">
      <button type="button" id="add-adjustment-btn" class="btn btn-outline">
        + Add Custom Adjustment
      </button>
      <button type="button" id="restore-adjustment-presets-btn" class="btn btn-outline">
        Restore Official Presets
      </button>
    </div>
  `,f=new Set(["Energy Supplier","Network Operator"]),y=Gr.map(v=>{if(v.title==="Gas Billing"&&!w||v.title==="Meter Fees"&&m.length<2)return"";let k;return v.title==="Feed-in / Selling"?k=g:v.title==="Time-of-Use Tariffs"?k=S:v.title==="Reference Power Windows"?k=C:v.title==="Government Aid & Billing Adjustments"?k=u:v.title==="Discounts"?k=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as monthly credits. The dashboard prorates them to the selected period and subtracts them before VAT.
      </p>`+o(v.fields):v.title==="Meter Fees"?k=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+x:k=o(v.fields),`
    <details class="form-section" data-section="${v.title}" ${Or(v.title,f)?"open":""}>
      <summary class="form-section-title">${v.icon}  ${v.title}</summary>
      ${k}
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
          ${t?y:'<p class="muted">Loading configuration…</p>'}
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
  `}function $t(t,e,s=!1,a="dark",n=""){const o=l=>`
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
  `),g=o(`
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
      `),$=[{id:"dashboard",label:"Dashboard",icon:i},{id:"charts",label:"Charts",icon:r},{id:"invoice",label:"Invoice",icon:p},{id:"sensors",label:"Sensors",icon:d},{id:"settings",label:"Settings",icon:g}];return`
    <header class="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-brand">
        <img src="/leneda-panel/static/logo.png" srcset="/leneda-panel/static/logo@2x.png 2x" alt="Leneda Logo" class="navbar-logo-img" />
        ${n?`<span class="navbar-badge" title="Where this dashboard gets its data">${n}</span>`:""}
        <span class="navbar-version" title="Dashboard version">v2.18.0</span>

        <button class="menu-toggle ${s?"open":""}" aria-label="Toggle menu" aria-expanded="${s}">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav class="navbar-tabs ${s?"mobile-open":""}">
        <div class="navbar-tab-group" role="tablist">
          ${$.map(l=>`
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
  `}const Ys="leneda_credentials",zs="leneda_theme";function Qr(){try{const t=localStorage.getItem(Ys);if(t)return JSON.parse(t)}catch{}return null}function bt(t){try{localStorage.setItem(Ys,JSON.stringify(t))}catch{}}function en(){var t;try{const e=localStorage.getItem(zs);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function tn(t){try{localStorage.setItem(zs,t)}catch{}}function _s(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const[,s,a,n]=e;return new Date(Number(s),Number(a)-1,Number(n))}function xs(t){const e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${e}-${s}-${a}`}function Le(t){const e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0"),n=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),r=String(t.getSeconds()).padStart(2,"0"),i=String(t.getMilliseconds()).padStart(3,"0"),d=-t.getTimezoneOffset(),p=d>=0?"+":"-",g=String(Math.floor(Math.abs(d)/60)).padStart(2,"0"),w=String(Math.abs(d)%60).padStart(2,"0");return`${e}-${s}-${a}T${n}:${o}:${r}.${i}${p}${g}:${w}`}function ks(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function sn(t,e=new Date){switch(t){case"yesterday":{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const a=new Date(s);return a.setHours(23,59,59,999),{start:s,end:a}}case"this_week":{const s=new Date(e),a=s.getDay()||7;return s.setDate(s.getDate()-a+1),s.setHours(0,0,0,0),{start:s,end:e}}case"last_week":{const s=new Date(e),a=s.getDay()||7,n=new Date(s);n.setDate(s.getDate()-a),n.setHours(23,59,59,999);const o=new Date(n);return o.setDate(n.getDate()-6),o.setHours(0,0,0,0),{start:o,end:n}}case"this_month":return{start:new Date(e.getFullYear(),e.getMonth(),1),end:e};case"last_month":{const s=new Date(e.getFullYear(),e.getMonth()-1,1),a=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s,end:a}}case"this_year":return{start:new Date(e.getFullYear(),0,1),end:e};case"last_year":{const s=new Date(e.getFullYear()-1,0,1),a=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s,end:a}}}}function an(t,e,s=new Date){const a=_s(t),n=_s(e);if(!a||!n)return null;const o=["yesterday","this_week","last_week","this_month","last_month","this_year","last_year"];for(const r of o){const i=sn(r,s);if(ks(a,i.start)&&ks(n,i.end))return r}return null}class rn{constructor(e){$e(this,"root");$e(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartViewportStart:null,chartViewportEnd:null,chartUnit:"kwh",chartTimeBucket:"quarter_hour",chartConsumptionView:"grid",analysisSection:"overview",analysisHeatmapMetric:"grid",analysisProfileMetric:"house",analysisComparisonMode:"previous",analysisComparison:null,analysisComparisonLoading:!1,rangeData:null,consumptionTimeseries:null,productionTimeseries:null,gridImportTimeseries:null,marketExportTimeseries:null,perMeterProductionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:en()});$e(this,"preZoomRange",null);$e(this,"preZoomCustomStart","");$e(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await Ms();if(this.state.mode=e.mode,e.mode==="standalone"){const s=Qr();if(s&&(this.state.credentials=s),!e.configured&&!s){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&s)try{const{saveCredentials:a}=await oe(async()=>{const{saveCredentials:n}=await Promise.resolve().then(()=>ge);return{saveCredentials:n}},void 0);await a(s)}catch{}if(!s)try{this.state.credentials=await Cs()}catch{}}await this.loadData()}toDisplayError(e,s="Failed to load data"){const a=e instanceof Error?e.message:String(e??"").trim(),n=a.toLowerCase();return n.includes("missing data")||n.includes("no_data")||n.includes("no data")?"Missing data":a||s}clearRangeStateWithError(e,s="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.state.gridImportTimeseries=null,this.state.marketExportTimeseries=null,this.state.perMeterProductionTimeseries=null,this.clearChartViewport(),this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1,this.state.error=this.toDisplayError(e,s)}async fetchPerMeterProductionForRange(e,s,a){var o;if(((e==null?void 0:e.meters)??[]).filter(r=>r.types.includes("production")||r.types.includes("solar_consumption")).length<=1)return null;try{const r=await _t("1-1:2.29.0",s,a);return(o=r.meters)!=null&&o.length?r:null}catch(r){return console.warn("Per-meter production fetch failed:",r),null}}async fetchEnergyFlowTimeseries(e,s){const[a,n,o,r]=await Promise.all([We("1-1:1.29.0",e,s),We("1-1:2.29.0",e,s),We("1-65:1.29.9",e,s),We("1-65:2.29.9",e,s)]);return{consumptionTimeseries:a,productionTimeseries:n,gridImportTimeseries:o,marketExportTimeseries:r}}shouldLoadComparison(){return this.state.tab==="charts"&&this.state.analysisSection==="costs"&&!!this.state.rangeData}resetAnalysisComparison(){this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1}clearChartViewport(){this.state.chartViewportStart=null,this.state.chartViewportEnd=null}normalizeChartTimeBucket(){const{start:e,end:s}=this.getDateRangeISO(),a=Ea(kt(e,s),this.state.chartTimeBucket);a!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=a)}getCurrentRangeKey(){const{start:e,end:s}=this.getDateRangeISO();return`${e}|${s}`}shiftIsoByYears(e,s){const a=new Date(e);if(!Number.isFinite(a.getTime()))return e;const n=new Date(a);return n.setUTCFullYear(n.getUTCFullYear()+s),n.toISOString()}getComparisonRangeISO(e,s,a){if(a==="last_year")return{start:this.shiftIsoByYears(e,-1),end:this.shiftIsoByYears(s,-1)};const n=new Date(e).getTime(),o=new Date(s).getTime(),r=Math.max(0,o-n),i=n-1,d=i-r;return{start:new Date(d).toISOString(),end:new Date(i).toISOString()}}async loadAnalysisComparison(e=!1){var i;if(!this.state.consumptionTimeseries||!this.state.productionTimeseries)return;const{start:s,end:a}=this.getDateRangeISO(),n=this.state.analysisComparisonMode,o=`${s}|${a}|${n}`;if(!e&&(this.state.analysisComparisonLoading||((i=this.state.analysisComparison)==null?void 0:i.key)===o))return;const r=this.getComparisonRangeISO(s,a,n);this.state.analysisComparisonLoading=!0,this.state.tab==="charts"&&this.renderPreserveMainScroll();try{const{consumptionTimeseries:d,productionTimeseries:p,gridImportTimeseries:g,marketExportTimeseries:w}=await this.fetchEnergyFlowTimeseries(r.start,r.end);if(o!==this.getCurrentRangeKey())return;this.state.analysisComparison={key:o,mode:n,start:r.start,end:r.end,consumptionTimeseries:d,productionTimeseries:p,gridImportTimeseries:g,marketExportTimeseries:w}}catch(d){console.warn("Comparison data fetch failed:",d),o===this.getCurrentRangeKey()&&(this.state.analysisComparison=null)}finally{o===this.getCurrentRangeKey()&&(this.state.analysisComparisonLoading=!1,this.state.tab==="charts"&&this.renderPreserveMainScroll())}}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.clearChartViewport(),this.resetAnalysisComparison(),this.render();try{const[e,s,a]=await Promise.all([qe(this.state.range),xt(),Ke()]),{start:n,end:o}=this.getDateRangeISO(),[r,i]=await Promise.all([this.fetchEnergyFlowTimeseries(n,o),this.fetchPerMeterProductionForRange(a,n,o)]);this.state.rangeData=e,this.state.consumptionTimeseries=r.consumptionTimeseries,this.state.productionTimeseries=r.productionTimeseries,this.state.gridImportTimeseries=r.gridImportTimeseries,this.state.marketExportTimeseries=r.marketExportTimeseries,this.state.perMeterProductionTimeseries=i,this.state.sensors=s,this.state.config=a}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render(),this.shouldLoadComparison()&&this.loadAnalysisComparison()}}async changeRange(e){if(this.preZoomRange=null,this.clearChartViewport(),this.state.range=e,this.resetAnalysisComparison(),e==="custom"){if(!this.state.customStart||!this.state.customEnd){const s=new Date;s.setDate(s.getDate()-1);const a=new Date(s);a.setDate(a.getDate()-6),this.state.customStart=xs(a),this.state.customEnd=xs(s)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:s,end:a}=this.getDateRangeISO(),[n,o,r]=await Promise.all([qe(e),this.fetchEnergyFlowTimeseries(s,a),this.fetchPerMeterProductionForRange(this.state.config,s,a)]);this.state.rangeData=n,this.state.consumptionTimeseries=o.consumptionTimeseries,this.state.productionTimeseries=o.productionTimeseries,this.state.gridImportTimeseries=o.gridImportTimeseries,this.state.marketExportTimeseries=o.marketExportTimeseries,this.state.perMeterProductionTimeseries=r}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render(),this.shouldLoadComparison()&&this.loadAnalysisComparison()}}async applyCustomRange(){this.preZoomRange=null,this.clearChartViewport();const{customStart:e,customEnd:s}=this.state;if(!(!e||!s)){this.state.error=null,this.state.loading=!0,this.resetAnalysisComparison(),this.render();try{const a=an(e,s),n=a?qe(a):oe(async()=>{const{fetchCustomData:w}=await Promise.resolve().then(()=>ge);return{fetchCustomData:w}},void 0).then(({fetchCustomData:w})=>w(e,s)),o=this.state.config,r=Le(new Date(e+"T00:00:00")),i=Le(new Date(s+"T23:59:59.999")),[d,p,g]=await Promise.all([n,this.fetchEnergyFlowTimeseries(r,i),this.fetchPerMeterProductionForRange(o,r,i)]);this.state.rangeData={range:"custom",consumption:d.consumption,production:d.production,exported:d.exported??0,self_consumed:d.self_consumed??0,grid_import:d.grid_import,solar_to_home:d.solar_to_home,direct_solar_to_home:d.direct_solar_to_home,shared:d.shared,shared_with_me:d.shared_with_me,gas_energy:d.gas_energy??0,gas_volume:d.gas_volume??0,peak_power_kw:d.peak_power_kw??0,exceedance_kwh:d.exceedance_kwh??0,metering_point:d.metering_point??"",start:d.start??e,end:d.end??s},this.state.consumptionTimeseries=p.consumptionTimeseries,this.state.productionTimeseries=p.productionTimeseries,this.state.gridImportTimeseries=p.gridImportTimeseries,this.state.marketExportTimeseries=p.marketExportTimeseries,this.state.perMeterProductionTimeseries=g}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render(),this.shouldLoadComparison()&&this.loadAnalysisComparison()}}}async shiftChartPeriod(e){const{start:s,end:a}=this.getDateRangeISO(),n=Fs(s,a,this.state.chartTimeBucket,e);n&&await this.handleChartZoomChange(Le(n.start),Le(n.end))}changeTab(e){this.state.tab=e,this.render(),(e==="dashboard"||e==="charts")&&!this.state.rangeData&&!this.state.loading&&this.loadData(),this.shouldLoadComparison()&&this.loadAnalysisComparison(),e==="sensors"&&!this.state.sensors&&xt().then(s=>{this.state.sensors=s,this.render()}),e==="settings"&&!this.state.config&&Ke().then(s=>{this.state.config=s,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,tn(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}printInvoice(){var r,i;const e=document.title,a=`Leneda-invoice-${(r=this.state.rangeData)!=null&&r.start&&((i=this.state.rangeData)!=null&&i.end)?`${this.state.rangeData.start.slice(0,10)}_to_${this.state.rangeData.end.slice(0,10)}`:this.state.range}`.replace(/[^a-z0-9_-]+/gi,"-");let n=!1;const o=()=>{n||(n=!0,document.title=e,window.removeEventListener("afterprint",o))};document.title=a,window.addEventListener("afterprint",o,{once:!0}),window.print(),window.setTimeout(o,1e3)}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const s=this.root.querySelector(".main-content");s?s.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}getDataSourceLabel(){return this.state.mode==="ha"?"Home Assistant":"Standalone"}getHostedDataNoticeHtml(){var e;return(((e=this.state.credentials)==null?void 0:e.proxy_url)??"").trim().length>0,""}render(){var d;const{tab:e,loading:s,error:a,theme:n}=this.state,o=this.getDataSourceLabel(),r=this.getHostedDataNoticeHtml();if(s&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${$t(e,p=>{},!1,n,o)}
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
          ${$t(e,g=>{},!1,n,o)}
          <main class="main-content">
            ${r}
            <div class="error-state">
              <h2>${p?"Missing Data":"Connection Error"}</h2>
              <p>${p?"The selected period could not be loaded because data is missing.":a}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(d=this.root.querySelector("#retry-btn"))==null||d.addEventListener("click",()=>this.loadData());return}this.state.rangeData&&this.normalizeChartTimeBucket();let i="";switch(e){case"dashboard":i=Wa(this.state);break;case"charts":i=xr(this.state);break;case"sensors":i=kr(this.state.sensors);break;case"invoice":i=jr(this.state);break;case"settings":i=Jr(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${$t(e,p=>this.changeTab(p),this.state.isMenuOpen,n,o)}
        <main class="main-content">
          ${r}
          ${s?'<div class="loading-bar"></div>':""}
          ${i}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachAnalysisListeners(),this.attachInvoiceListeners(),this.attachSensorListeners(),this.attachSettingsListeners()}attachSensorListeners(){const e=this.root.querySelector("#sensor-filter");if(!e)return;const s=this.root.querySelector("#sensors-no-match");e.addEventListener("input",()=>{const a=e.value.trim().toLowerCase();let n=0;this.root.querySelectorAll(".sensor-group").forEach(o=>{let r=0;o.querySelectorAll("[data-sensor-search]").forEach(i=>{const d=!a||(i.dataset.sensorSearch??"").includes(a);i.hidden=!d,d&&(r+=1)}),o.hidden=r===0,n+=r}),s&&(s.hidden=n>0)})}attachNavListeners(){var e,s;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(s=this.root.querySelector("[data-theme-toggle]"))==null||s.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.tab;this.changeTab(n)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.range;this.changeRange(i)})});const s=this.root.querySelector("#custom-start"),a=this.root.querySelector("#custom-end");s&&s.addEventListener("change",()=>{this.state.customStart=s.value}),a&&a.addEventListener("change",()=>{this.state.customEnd=a.value});const n=this.root.querySelector("#apply-custom-range");if(n==null||n.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.chartUnit;i!==this.state.chartUnit&&(this.state.chartUnit=i,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-bucket]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.chartBucket,{start:d,end:p}=this.getDateRangeISO();Fe(i,kt(d,p))&&i!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=i,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-period-nav]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.chartPeriodNav==="next"?1:-1;this.shiftChartPeriod(i)})}),this.root.querySelectorAll("[data-chart-view]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.chartView;i!==this.state.chartConsumptionView&&(this.state.chartConsumptionView=i,this.renderPreserveMainScroll())})}),!e){const r=this.root.querySelector("#energy-chart");r&&this.state.rangeData&&this.initChart(r)}const o=this.root.querySelector(".reset-zoom-btn");o==null||o.addEventListener("click",async()=>{const{resetChartZoom:r}=await oe(async()=>{const{resetChartZoom:i}=await import("./Charts-Dl-BA8CR.js");return{resetChartZoom:i}},[]);if(r(),o.style.display="none",this.clearChartViewport(),this.preZoomRange!==null){const i=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",i==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(i)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachAnalysisListeners(){this.root.querySelectorAll("[data-analysis-section]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisSection;if(s===this.state.analysisSection)return;this.state.analysisSection=s,this.render();const a=this.root.querySelector(".main-content");a?a.scrollTop=0:window.scrollTo({top:0}),this.shouldLoadComparison()&&this.loadAnalysisComparison()})}),this.root.querySelectorAll("[data-analysis-heatmap]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisHeatmap;s!==this.state.analysisHeatmapMetric&&(this.state.analysisHeatmapMetric=s,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-profile]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisProfile;s!==this.state.analysisProfileMetric&&(this.state.analysisProfileMetric=s,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-comparison-mode]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisComparisonMode;s!==this.state.analysisComparisonMode&&(this.state.analysisComparisonMode=s,this.state.analysisComparison=null,this.loadAnalysisComparison(!0))})})}attachInvoiceListeners(){var e;(e=this.root.querySelector("#print-invoice-btn"))==null||e.addEventListener("click",()=>{this.printInvoice()})}attachSettingsListeners(){var p,g,w,$;const e=this.root.querySelector("#credentials-form");if(e){const l=this.root.querySelector("#add-meter-btn");l==null||l.addEventListener("click",()=>{var S,C,M;const b=new FormData(e),x=m(b);if(x.length<10){x.push({id:"",types:["consumption"]});const u={api_key:b.get("api_key")||((S=this.state.credentials)==null?void 0:S.api_key)||"",energy_id:b.get("energy_id")||((C=this.state.credentials)==null?void 0:C.energy_id)||"",meters:x,proxy_url:b.get("proxy_url")||((M=this.state.credentials)==null?void 0:M.proxy_url)||""};this.state.credentials=u,bt(u),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach(b=>{b.addEventListener("click",()=>{var u,f,y;const x=parseInt(b.dataset.meter??"0",10),S=new FormData(e),C=m(S);C.splice(x,1);const M={api_key:S.get("api_key")||((u=this.state.credentials)==null?void 0:u.api_key)||"",energy_id:S.get("energy_id")||((f=this.state.credentials)==null?void 0:f.energy_id)||"",meters:C,proxy_url:S.get("proxy_url")||((y=this.state.credentials)==null?void 0:y.proxy_url)||""};this.state.credentials=M,bt(M),this.renderPreserveMainScroll()})});const m=b=>{var S,C,M,u,f,y;const x=[];for(let v=0;v<10;v++){const k=b.get(`meter_${v}_id`);if(k===null)break;const E=[];(S=e.querySelector(`[name="meter_${v}_consumption"]`))!=null&&S.checked&&E.push("consumption"),(C=e.querySelector(`[name="meter_${v}_production"]`))!=null&&C.checked&&E.push("production"),(M=e.querySelector(`[name="meter_${v}_solar_consumption"]`))!=null&&M.checked&&E.push("solar_consumption"),(u=e.querySelector(`[name="meter_${v}_export"]`))!=null&&u.checked&&E.push("export"),(f=e.querySelector(`[name="meter_${v}_export_consumption"]`))!=null&&f.checked&&E.push("export_consumption"),(y=e.querySelector(`[name="meter_${v}_gas"]`))!=null&&y.checked&&E.push("gas"),x.push({id:k.trim(),types:E})}return x};e.addEventListener("submit",async b=>{b.preventDefault();const x=new FormData(e),S={api_key:x.get("api_key"),energy_id:x.get("energy_id"),meters:m(x),proxy_url:x.get("proxy_url")},C=this.root.querySelector("#creds-status");try{bt(S);const{saveCredentials:M}=await oe(async()=>{const{saveCredentials:y}=await Promise.resolve().then(()=>ge);return{saveCredentials:y}},void 0);await M(S),C&&(C.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=S,this.state.error=null;const u=!1,f=(S.proxy_url??"").trim();await this.loadData()}catch(M){C&&(C.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${M instanceof Error?M.message:M}</p>`)}});const h=this.root.querySelector("#test-creds-btn");h==null||h.addEventListener("click",async()=>{const b=new FormData(e),x={api_key:b.get("api_key"),energy_id:b.get("energy_id"),meters:m(b),proxy_url:b.get("proxy_url")},S=this.root.querySelector("#creds-status");S&&(S.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:C}=await oe(async()=>{const{testCredentials:u}=await Promise.resolve().then(()=>ge);return{testCredentials:u}},void 0),M=await C(x);S&&(S.innerHTML=M.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${M.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${M.message}</p>`)}catch(C){S&&(S.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${C instanceof Error?C.message:C}</p>`)}})}const s=this.root.querySelector("#settings-form");if(!s)return;const a=l=>{const m=[];for(let h=0;h<24;h++){const b=l.get(`consumption_window_${h}_label`),x=l.get(`consumption_window_${h}_day_group`),S=l.get(`consumption_window_${h}_start_time`),C=l.get(`consumption_window_${h}_end_time`),M=l.get(`consumption_window_${h}_rate`);if(b===null&&x===null&&S===null&&C===null&&M===null)break;m.push({label:(b??"").trim()||`Window ${h+1}`,day_group:x??"all",start_time:S??"00:00",end_time:C??"06:00",rate:parseFloat(M??"0")||0})}return m},n=l=>{const m=[];for(let h=0;h<24;h++){const b=l.get(`reference_window_${h}_label`),x=l.get(`reference_window_${h}_day_group`),S=l.get(`reference_window_${h}_start_time`),C=l.get(`reference_window_${h}_end_time`),M=l.get(`reference_window_${h}_reference_power_kw`);if(b===null&&x===null&&S===null&&C===null&&M===null)break;m.push({label:(b??"").trim()||`Reference ${h+1}`,day_group:x??"all",start_time:S??"17:00",end_time:C??"00:00",reference_power_kw:parseFloat(M??"0")||0})}return m},o=l=>{var h,b,x;const m=[];for(let S=0;S<50;S++){const C=l.get(`adjustment_${S}_id`);if(C===null)break;const M=l.get(`adjustment_${S}_label`),u=l.get(`adjustment_${S}_commodity`),f=l.get(`adjustment_${S}_basis`),y=l.get(`adjustment_${S}_amount_gross`),v=l.get(`adjustment_${S}_start_date`),k=l.get(`adjustment_${S}_end_date`),E=l.get(`adjustment_${S}_preset_id`),L=l.get(`adjustment_${S}_eligibility_note`);m.push({id:(C??"").trim()||`custom-${S+1}`,label:(M??"").trim()||`Adjustment ${S+1}`,enabled:((h=s.querySelector(`[name="adjustment_${S}_enabled"]`))==null?void 0:h.checked)??!1,commodity:u==="gas"?"gas":"electricity",basis:f==="gas_volume_m3"?"gas_volume_m3":"grid_import_kwh",amount_gross:parseFloat(y??"0")||0,start_date:v??"",end_date:k??"",vat_included:((b=s.querySelector(`[name="adjustment_${S}_vat_included"]`))==null?void 0:b.checked)??!1,preset_id:(E??"").trim(),eligibility_note:(L??"").trim(),tariff_already_includes_adjustment:((x=s.querySelector(`[name="adjustment_${S}_tariff_already_includes_adjustment"]`))==null?void 0:x.checked)??!1})}return m},r=()=>{var u;const l=new FormData(s),m={};s.querySelectorAll('input[type="checkbox"]').forEach(f=>{f.name.startsWith("adjustment_")||(m[f.name]=f.checked)});const h=[],b=/^feed_in_rate_(\d+)_(.+)$/,x={},S=[],C=/^meter_fee_(\d+)_(.+)$/,M={};for(const[f,y]of l.entries()){if(f.startsWith("consumption_window_")||f.startsWith("reference_window_")||f.startsWith("adjustment_"))continue;const v=f.match(b);if(v){const D=v[1],P=v[2];x[D]||(x[D]={}),x[D][P]=y;continue}const k=f.match(C);if(k){const D=k[1],P=k[2];M[D]||(M[D]={}),M[D][P]=y;continue}if(m[f]!==void 0&&typeof m[f]=="boolean")continue;const E=y,L=s.elements.namedItem(f);if(E===""&&L instanceof HTMLInputElement&&L.type==="number"){const D=(u=this.state.config)==null?void 0:u[f];typeof D=="number"&&isFinite(D)&&(m[f]=D);continue}const W=parseFloat(E);m[f]=isNaN(W)?E:W}for(const f of Object.keys(x).sort()){const y=x[f],v=y.mode??"fixed",k=v==="sensor"?y.fallback_tariff??y.tariff:y.tariff,E=(y.self_use_priority??"").trim(),L=parseInt(E,10);h.push({meter_id:y.meter_id??"",mode:v,tariff:parseFloat(k??"0.08")||.08,sensor_entity:y.sensor_entity??"",display_name:(y.display_name??"").trim(),self_use_priority:E===""||!isFinite(L)?null:Math.max(1,L)})}h.length>0&&(m.feed_in_rates=h);for(const f of Object.keys(M).sort()){const y=M[f];S.push({meter_id:y.meter_id??"",label:y.label??"",fee:parseFloat(y.fee??"0")||0})}return S.length>0&&(m.meter_monthly_fees=S),m.consumption_rate_windows=a(l),m.reference_power_windows=n(l),m.billing_adjustments=o(l),m},i=l=>{if(!this.state.config)return;const m=r();l(m),this.state.config={...this.state.config,...m},this.renderPreserveMainScroll()};if((p=this.root.querySelector("#add-consumption-window-btn"))==null||p.addEventListener("click",()=>{i(l=>{var h;const m=Array.isArray(l.consumption_rate_windows)?[...l.consumption_rate_windows]:[];m.push({label:`Window ${m.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((h=this.state.config)==null?void 0:h.energy_variable_rate)??.1125}),l.consumption_rate_windows=m})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(l=>{l.addEventListener("click",()=>{const m=parseInt(l.dataset.window??"0",10);i(h=>{const b=Array.isArray(h.consumption_rate_windows)?[...h.consumption_rate_windows]:[];b.splice(m,1),h.consumption_rate_windows=b})})}),(g=this.root.querySelector("#add-reference-window-btn"))==null||g.addEventListener("click",()=>{i(l=>{var h;const m=Array.isArray(l.reference_power_windows)?[...l.reference_power_windows]:[];m.push({label:`Reference ${m.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((h=this.state.config)==null?void 0:h.reference_power_kw)??5}),l.reference_power_windows=m})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(l=>{l.addEventListener("click",()=>{const m=parseInt(l.dataset.window??"0",10);i(h=>{const b=Array.isArray(h.reference_power_windows)?[...h.reference_power_windows]:[];b.splice(m,1),h.reference_power_windows=b})})}),(w=this.root.querySelector("#add-adjustment-btn"))==null||w.addEventListener("click",()=>{i(l=>{const m=Array.isArray(l.billing_adjustments)?[...l.billing_adjustments]:[];m.push({id:`custom-${Date.now()}`,label:`Adjustment ${m.length+1}`,enabled:!0,commodity:"electricity",basis:"grid_import_kwh",amount_gross:0,start_date:"",end_date:"",vat_included:!0,preset_id:"",eligibility_note:"",tariff_already_includes_adjustment:!1}),l.billing_adjustments=m})}),this.root.querySelectorAll(".remove-adjustment-btn").forEach(l=>{l.addEventListener("click",()=>{const m=parseInt(l.dataset.adjustment??"0",10);i(h=>{const b=Array.isArray(h.billing_adjustments)?[...h.billing_adjustments]:[];b.splice(m,1),h.billing_adjustments=b})})}),($=this.root.querySelector("#restore-adjustment-presets-btn"))==null||$.addEventListener("click",()=>{i(l=>{const h=(Array.isArray(l.billing_adjustments)?[...l.billing_adjustments]:[]).filter(b=>!b.preset_id);l.billing_adjustments=[...Tr(!0),...h]})}),s.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(l=>{l.addEventListener("change",()=>{const m=l.name.match(/feed_in_rate_(\d+)_mode/);if(!m)return;const h=m[1],b=s.querySelector(`.feed-in-fixed-fields[data-rate-idx="${h}"]`),x=s.querySelector(`.feed-in-sensor-fields[data-rate-idx="${h}"]`);b&&(b.style.display=l.value==="fixed"?"":"none"),x&&(x.style.display=l.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const l=this.root.querySelector("#ha-entity-list");l&&Ts().then(({entities:m})=>{l.innerHTML=m.map(h=>`<option value="${h}"></option>`).join("")}).catch(()=>{})}this.root.querySelectorAll("details[data-section]").forEach(l=>{l.addEventListener("toggle",()=>{$s(l.dataset.section??"",l.open)})}),this.root.querySelectorAll("[data-sections-toggle]").forEach(l=>{l.addEventListener("click",()=>{const m=l.dataset.sectionsToggle==="open";this.root.querySelectorAll("details[data-section]").forEach(h=>{h.open=m,$s(h.dataset.section??"",m)})})}),s.addEventListener("submit",async l=>{l.preventDefault();const m=r();this.setSettingsStatus("Saving…","pending");try{const{saveConfig:h}=await oe(async()=>{const{saveConfig:b}=await Promise.resolve().then(()=>ge);return{saveConfig:b}},void 0);await h(m),this.state.config=await Ke(),this.renderPreserveMainScroll(),this.setSettingsStatus("Configuration saved","ok")}catch(h){this.setSettingsStatus(`Save failed: ${h instanceof Error?h.message:String(h)}`,"error")}});const d=this.root.querySelector("#reset-config-btn");d==null||d.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?")){this.setSettingsStatus("Resetting…","pending");try{const{resetConfig:l}=await oe(async()=>{const{resetConfig:m}=await Promise.resolve().then(()=>ge);return{resetConfig:m}},void 0);await l(),this.state.config=await Ke(),this.renderPreserveMainScroll(),this.setSettingsStatus("Reset to defaults","ok")}catch(l){this.setSettingsStatus(`Reset failed: ${l instanceof Error?l.message:String(l)}`,"error")}}})}setSettingsStatus(e,s){const a=this.root.querySelector("#settings-status");a&&(a.className=`form-status form-status-${s}`,a.textContent=e,s==="ok"&&window.setTimeout(()=>{a.textContent===e&&(a.textContent="")},4e3))}async initChart(e){var s,a,n,o;try{const{renderEnergyChart:r}=await oe(async()=>{const{renderEnergyChart:S}=await import("./Charts-Dl-BA8CR.js");return{renderEnergyChart:S}},[]),{start:i,end:d}=this.getDateRangeISO(),p=this.state.chartViewportStart?new Date(this.state.chartViewportStart).getTime():void 0,g=this.state.chartViewportEnd?new Date(this.state.chartViewportEnd).getTime():void 0;let w=this.state.consumptionTimeseries,$=this.state.productionTimeseries,l=this.state.gridImportTimeseries,m=this.state.marketExportTimeseries;if(!w||!$||!l||!m){const S=await this.fetchEnergyFlowTimeseries(i,d);w=S.consumptionTimeseries,$=S.productionTimeseries,l=S.gridImportTimeseries,m=S.marketExportTimeseries,this.state.consumptionTimeseries=w,this.state.productionTimeseries=$,this.state.gridImportTimeseries=l,this.state.marketExportTimeseries=m}const h=((s=this.state.config)==null?void 0:s.reference_power_kw)??0,b=(((a=this.state.config)==null?void 0:a.meters)??[]).filter(S=>S.types.includes("production")||S.types.includes("solar_consumption"));let x;if((o=(n=this.state.perMeterProductionTimeseries)==null?void 0:n.meters)!=null&&o.length)x=this.state.perMeterProductionTimeseries.meters;else if(b.length>1)try{const S=await _t("1-1:2.29.0",i,d);S.meters&&S.meters.length>1&&(x=S.meters,this.state.perMeterProductionTimeseries=S)}catch(S){console.warn("Per-meter timeseries fetch failed, using merged view:",S)}r(e,w,$,{unit:this.state.chartUnit,consumptionView:this.state.chartConsumptionView,referencePowerKw:h,gridImportTimeseries:l,marketExportTimeseries:m,perMeterProduction:x,viewportStartMs:p,viewportEndMs:g,timeBucket:this.state.chartTimeBucket,onZoomChange:(S,C)=>{this.handleChartZoomChange(S,C)}})}catch(r){console.error("Chart init failed:",r)}}async handleChartZoomChange(e,s){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd),this.state.error=null,this.state.loading=!0,this.renderPreserveMainScroll();const{fetchCustomData:a}=await oe(async()=>{const{fetchCustomData:p}=await Promise.resolve().then(()=>ge);return{fetchCustomData:p}},void 0),n=e.slice(0,10),o=s.slice(0,10);this.resetAnalysisComparison();const r=await a(e,s),[i,d]=await Promise.all([this.fetchEnergyFlowTimeseries(e,s),this.fetchPerMeterProductionForRange(this.state.config,e,s)]);this.state.range="custom",this.state.customStart=n,this.state.customEnd=o,this.state.chartViewportStart=e,this.state.chartViewportEnd=s,this.state.rangeData={range:"custom",consumption:r.consumption,production:r.production,exported:r.exported??0,self_consumed:r.self_consumed??0,gas_energy:r.gas_energy??0,gas_volume:r.gas_volume??0,grid_import:r.grid_import,solar_to_home:r.solar_to_home,direct_solar_to_home:r.direct_solar_to_home,shared:r.shared,shared_with_me:r.shared_with_me,peak_power_kw:r.peak_power_kw??0,exceedance_kwh:r.exceedance_kwh??0,metering_point:r.metering_point??"",start:r.start,end:r.end},this.state.consumptionTimeseries=i.consumptionTimeseries,this.state.productionTimeseries=i.productionTimeseries,this.state.gridImportTimeseries=i.gridImportTimeseries,this.state.marketExportTimeseries=i.marketExportTimeseries,this.state.perMeterProductionTimeseries=d,this.state.loading=!1,this.renderPreserveMainScroll()}catch(a){console.error("Zoom data fetch failed:",a),this.state.loading=!1,this.clearRangeStateWithError(a,"Missing data"),this.render()}}getDateRangeISO(){if(this.state.chartViewportStart&&this.state.chartViewportEnd)return{start:this.state.chartViewportStart,end:this.state.chartViewportEnd};const e=new Date,s=a=>Le(a);switch(this.state.range){case"custom":{const a=new Date(this.state.customStart+"T00:00:00"),n=new Date(this.state.customEnd+"T23:59:59.999");return{start:s(a),end:s(n)}}case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const n=new Date(a);return n.setHours(23,59,59,999),{start:s(a),end:s(n)}}case"this_week":{const a=new Date(e),n=a.getDay()||7;return a.setDate(a.getDate()-n+1),a.setHours(0,0,0,0),{start:s(a),end:s(e)}}case"last_week":{const a=new Date(e),n=a.getDay()||7,o=new Date(a);o.setDate(a.getDate()-n),o.setHours(23,59,59,999);const r=new Date(o);return r.setDate(o.getDate()-6),r.setHours(0,0,0,0),{start:s(r),end:s(o)}}case"this_month":{const a=new Date(e.getFullYear(),e.getMonth(),1);return{start:s(a),end:s(e)}}case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),n=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s(a),end:s(n)}}case"this_year":{const a=new Date(e.getFullYear(),0,1);return{start:s(a),end:s(e)}}case"last_year":{const a=new Date(e.getFullYear()-1,0,1),n=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s(a),end:s(n)}}default:{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const n=new Date(a);return n.setHours(23,59,59,999),{start:s(a),end:s(n)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new rn(t).mount()}export{Fa as b};
