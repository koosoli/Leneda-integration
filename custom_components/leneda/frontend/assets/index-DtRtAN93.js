var ha=Object.defineProperty;var ma=(t,e,s)=>e in t?ha(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var $e=(t,e,s)=>ma(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const ga="modulepreload",ya=function(t){return"/leneda-panel/static/"+t},rs={},ne=function(e,s,a){let r=Promise.resolve();if(s&&s.length>0){let n=function(u){return Promise.all(u.map(v=>Promise.resolve(v).then(w=>({status:"fulfilled",value:w}),w=>({status:"rejected",reason:w}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));r=n(s.map(u=>{if(u=ya(u),u in rs)return;rs[u]=!0;const v=u.endsWith(".css"),w=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${w}`))return;const S=document.createElement("link");if(S.rel=v?"stylesheet":ga,v||(S.as="script"),S.crossOrigin="",S.href=u,c&&S.setAttribute("nonce",c),document.head.appendChild(S),v)return new Promise((l,m)=>{S.addEventListener("load",l),S.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(n){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=n,window.dispatchEvent(i),!i.defaultPrevented)throw n}return r.then(n=>{for(const i of n||[])i.status==="rejected"&&o(i.reason);return e().catch(o)})};function xs(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()})),proxy_url:(t.proxy_url??"").trim()}}function va(){var t,e,s,a,r;try{const o=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((r=(a=(s=o==null?void 0:o.hass)==null?void 0:s.auth)==null?void 0:a.data)==null?void 0:r.access_token)??null}catch{return null}}async function q(t,e){const s=va(),a={...e==null?void 0:e.headers,...s?{Authorization:`Bearer ${s}`}:{}},r={...e,credentials:"include",headers:a},o=await fetch(t,r);if(!o.ok){const n=o.headers.get("content-type")??"";let i="",c="";if(n.includes("application/json")){const u=await o.json().catch(()=>null);i=String((u==null?void 0:u.error)??"").trim(),c=String((u==null?void 0:u.message)??(u==null?void 0:u.error)??"").trim()}else c=(await o.text().catch(()=>"")).trim();throw i==="missing_data"||i==="no_data"||o.status===503?new Error("Missing data"):new Error(c?`API ${o.status}: ${c}`:`API ${o.status}: ${o.statusText}`)}return o.json()}async function Be(t){return q(`/leneda_api/data?range=${t}`)}async function fa(t,e){return q(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function Fe(t,e,s){let a=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),q(a)}async function _t(t,e,s){let a=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),q(a)}async function xt(){return q("/leneda_api/sensors")}async function We(){return q("/leneda_api/config")}async function wa(t){await q("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function $a(){await q("/leneda_api/config/reset",{method:"POST"})}async function ks(){try{return await q("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function Ss(){return q("/leneda_api/credentials")}async function ba(t){const e=xs(t);await q("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function _a(t){const e=xs(t);return q("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Ms(){return q("/leneda_api/ha-entities")}const ge=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:We,fetchCredentials:Ss,fetchCustomData:fa,fetchHAEntities:Ms,fetchMode:ks,fetchPerMeterTimeseries:_t,fetchRangeData:Be,fetchSensors:xt,fetchTimeseries:Fe,resetConfig:$a,saveConfig:wa,saveCredentials:ba,testCredentials:_a},Symbol.toStringTag,{value:"Module"})),Tt=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function ns(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function xa(t,e){if(!t||!e)return"";const s=new Date(t),a=new Date(e);if(Number.isNaN(s.getTime())||Number.isNaN(a.getTime()))return"";const r=s.toLocaleDateString(),o=a.toLocaleDateString();return r===o?r:`${r} — ${o}`}function Et(t){var r,o,n,i;const e=ns(((r=t.rangeData)==null?void 0:r.start)??t.customStart),s=ns(((o=t.rangeData)==null?void 0:o.end)??t.customEnd),a=xa((n=t.rangeData)==null?void 0:n.start,(i=t.rangeData)==null?void 0:i.end);return`
    <div class="period-bar">
      <div class="range-selector" role="group" aria-label="Select period">
        ${Tt.map(c=>`
          <button
            class="range-btn ${c.id===t.range?"active":""}"
            data-range="${c.id}"
            aria-pressed="${c.id===t.range}"
          >${c.label}</button>
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
  `}function Dt(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(e){const[,s,a,r]=e;return new Date(Number(s),Number(a)-1,Number(r))}return new Date(t)}function j(t){return t==null||!Number.isFinite(t)?0:(t<0?-1:1)*Math.round(Number((Math.abs(t)*100).toFixed(6)))/100}function h(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function ce(t){return Dt(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function Cs(t){return Dt(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function ze(t){return Dt(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}const ka={grid:`
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
  `};function de(t){const{x:e,y:s,r:a,glyph:r,color:o,kicker:n,value:i,detail:c,text:u,compact:v=!1,prefix:w}=t,S=a*1.24/24,l=`
    <g class="scene-node-badge" transform="translate(${e}, ${s})" color="${o}">
      <circle r="${a+18}" class="scene-node-aura" fill="${o}" />
      <circle r="${a+7}" class="scene-node-halo" fill="${o}" />
      <circle r="${a}" class="scene-node-plate" fill="url(#${w}-plate)" stroke="${o}" />
      <circle r="${a-1}" class="scene-node-wash" fill="${o}" />
      <g class="scene-node-glyph" transform="scale(${S.toFixed(3)}) translate(-12, -12)">
        ${ka[r]}
      </g>
    </g>
  `;if(u==="none")return l;const m=v?9:11,p=v?18:28;if(u==="right"){const _=e+a+20;return`
      ${l}
      <g class="scene-node-text" text-anchor="start">
        <text x="${_}" y="${s-12}" class="scene-node-kicker">${n}</text>
        ${i?`<text x="${_}" y="${s+10}" class="scene-node-value">${i}</text>`:""}
        ${c?`<text x="${_}" y="${s+28}" class="scene-node-detail">${c}</text>`:""}
      </g>
    `}const b=s+a+p;return`
    ${l}
    <g class="scene-node-text" text-anchor="middle">
      <text x="${e}" y="${b}" class="scene-node-kicker" style="font-size:${m}px">${n}</text>
      ${i?`<text x="${e}" y="${b+(v?18:22)}" class="scene-node-value">${i}</text>`:""}
      ${c?`<text x="${e}" y="${b+(v?34:40)}" class="scene-node-detail">${c}</text>`:""}
    </g>
  `}function Y(t){const{id:e,path:s,from:a,to:r,value:o,max:n,color:i,reverse:c=!1,label:u}=t,v=n>0?Math.min(1,o/n):0,w=o>0?3.2+v*6:2,S=o<=0,l=(2.6-v*1.3).toFixed(2),[m,p]=c?[r,a]:[a,r];return`
    <g class="flow-link${S?" flow-link-idle":""}" color="${i}">
      <title>${u}</title>
      <linearGradient
        id="${e}"
        gradientUnits="userSpaceOnUse"
        x1="${m.x}" y1="${m.y}" x2="${p.x}" y2="${p.y}"
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
      ${S?"":`
      <path
        class="flow-pulse"
        d="${s}"
        stroke="url(#${e})"
        stroke-width="${w.toFixed(1)}"
        style="animation-duration:${l}s${c?";animation-direction:reverse":""}"
        fill="none"
      />`}
    </g>
  `}function Ts(t){const{cx:e,apexY:s,eavesY:a,baseY:r,halfWidth:o,ringY:n,ringR:i,coverage:c,usageLabel:u,usageValue:v,prefix:w}=t,S=e-o,l=e+o,m=Math.round(o*.09),p=(a-s)/o,b={x:e+o*.16,y:s+o*.16*p+9},_={x:e+o*.7,y:s+o*.7*p+9},x=Math.hypot(_.x-b.x,_.y-b.y),C=Math.atan2(_.y-b.y,_.x-b.x)*180/Math.PI,M=Math.max(6,o*.1),d=4,f=2*Math.PI*(i-5),g=Math.min(100,Math.max(0,c));return`
    <g class="elite-house">
      <ellipse cx="${e}" cy="${r+10}" rx="${o*1.5}" ry="${Math.max(10,o*.16)}" fill="url(#${w}-house-shadow)" />

      <path
        class="house-roof"
        d="M ${S-m} ${a+2} L ${e} ${s} L ${l+m} ${a+2} Z"
        fill="url(#${w}-roof)"
      />
      <path
        class="house-body"
        d="M ${S} ${a} H ${l} V ${r} H ${S} Z"
        fill="url(#${w}-body)"
      />
      <path class="house-ridge" d="M ${e} ${s+3} L ${e} ${a}" />

      <g class="house-panels" transform="translate(${b.x.toFixed(1)}, ${b.y.toFixed(1)}) rotate(${C.toFixed(2)})">
        <rect
          x="0" y="${(-M/2).toFixed(1)}"
          width="${x.toFixed(1)}" height="${M.toFixed(1)}"
          rx="2"
          fill="var(--clr-production)"
        />
        ${Array.from({length:d-1},(y,k)=>`<path d="M ${((k+1)*x/d).toFixed(1)} ${(-M/2).toFixed(1)} V ${(M/2).toFixed(1)}" class="house-panel-divider" />`).join("")}
      </g>

      <g class="house-ring" transform="translate(${e}, ${n})">
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
          stroke-dashoffset="${(f*(1-g/100)).toFixed(1)}"
          transform="rotate(-90)"
        />
        <text y="${i>32?-6:-5}" text-anchor="middle" class="house-ring-kicker">SOLAR</text>
        <text y="${i>32?15:14}" text-anchor="middle" class="house-ring-value-text">${h(g,0)}%</text>
      </g>

      ${u&&v?`
      <text x="${e}" y="${r-30}" text-anchor="middle" class="house-total-label">${u}</text>
      <text x="${e}" y="${r-10}" text-anchor="middle" class="house-total-value">${v}</text>
      `:""}
    </g>
  `}function Es(t){return`
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
  `}function Ds(t,e,s,a,r,o){return`
    <rect x="${e}" y="${s}" width="${a}" height="${r}" rx="${o}" class="scene-shell" fill="url(#${t}-shell)" />
    <rect x="${e}" y="${s}" width="${a}" height="${r}" rx="${o}" fill="url(#${t}-grid)" />
    <rect x="${e}" y="${s}" width="${a}" height="${r}" rx="${o}" fill="url(#${t}-scene-glow)" />
  `}function Sa(t,e){const{hasGas:s}=t,a=s?640:430,r="flowd",o=186,n=386,i=108,c=450-i,u=450+i;return`
    <svg
      class="elite-main-svg"
      viewBox="0 0 900 ${a}"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Energy flow between the grid, your solar panels, the energy community and your home for the selected period"
    >
      ${Es(r)}
      ${Ds(r,16,16,868,a-32,30)}

      ${Ts({cx:450,apexY:o,eavesY:256,baseY:n,halfWidth:i,ringY:296,ringR:34,coverage:t.selfSufficiency,usageLabel:"Home usage",usageValue:`${h(t.totalHomeEnergy)} kWh`,prefix:r})}

      ${de({prefix:r,x:450,y:82,r:40,glyph:"solar",color:"var(--clr-production)",text:"right",kicker:"Solar",value:`${h(t.production)} kWh`,detail:`${h(t.solarToHome)} kWh used at home`})}

      ${de({prefix:r,x:110,y:290,r:40,glyph:"grid",color:"var(--clr-consumption)",text:"below",kicker:"Grid",value:`${h(t.boughtFromGrid+t.soldToMarket)} kWh`,detail:`In ${h(t.boughtFromGrid)} · out ${h(t.soldToMarket)}`})}

      ${de({prefix:r,x:790,y:290,r:40,glyph:"community",color:"var(--clr-community)",text:"below",kicker:"Community",value:`${h(t.communityExchange)} kWh`,detail:`Sent ${h(t.shared)} · got ${h(t.sharedWithMe)}`})}

      ${s?de({prefix:r,x:450,y:494,r:38,glyph:"gas",color:"var(--clr-gas)",text:"below",kicker:"Gas",value:t.gasVolume>0?`${h(t.gasEnergy)} kWh · ${h(t.gasVolume)} m³`:`${h(t.gasEnergy)} kWh`}):""}

      ${Y({id:`${r}-solar`,path:`M 450 130 L 450 ${o-4}`,from:{x:450,y:130},to:{x:450,y:o-4},value:t.directSolarToHome,max:e,color:"var(--clr-production)",label:`Solar to home: ${h(t.directSolarToHome)} kWh`})}

      ${Y({id:`${r}-import`,path:`M 158 274 C 220 266, 280 266, ${c-4} 274`,from:{x:158,y:274},to:{x:c-4,y:274},value:t.boughtFromGrid,max:e,color:"var(--clr-consumption)",label:`Bought from the grid: ${h(t.boughtFromGrid)} kWh`})}

      ${Y({id:`${r}-export`,path:`M ${c-4} 330 C 280 338, 220 338, 158 330`,from:{x:c-4,y:330},to:{x:158,y:330},value:t.soldToMarket,max:e,color:"var(--clr-export)",label:`Exported to the grid: ${h(t.soldToMarket)} kWh`})}

      ${Y({id:`${r}-shared`,path:`M ${u+4} 274 C 620 266, 680 266, 742 274`,from:{x:u+4,y:274},to:{x:742,y:274},value:t.shared,max:e,color:"var(--clr-community)",label:`Shared with the community: ${h(t.shared)} kWh`})}

      ${Y({id:`${r}-received`,path:`M 742 330 C 680 338, 620 338, ${u+4} 330`,from:{x:742,y:330},to:{x:u+4,y:330},value:t.sharedWithMe,max:e,color:"var(--clr-community)",reverse:!0,label:`Received from the community: ${h(t.sharedWithMe)} kWh`})}

      ${s?Y({id:`${r}-gas`,path:`M 450 452 L 450 ${n+6}`,from:{x:450,y:452},to:{x:450,y:n+6},value:Math.min(t.gasEnergy,e),max:e,color:"var(--clr-gas)",reverse:!0,label:`Gas to the house: ${h(t.gasEnergy)} kWh`}):""}
    </svg>
  `}function Ma(t,e){const{hasGas:s}=t,a=s?430:330,r="flowm",o=148,n=288,i=70,c=210-i,u=210+i;return`
    <svg
      class="elite-main-svg"
      viewBox="0 0 420 ${a}"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Energy flow between the grid, your solar panels, the energy community and your home for the selected period"
    >
      ${Es(r)}
      ${Ds(r,12,12,396,a-24,26)}

      ${Ts({cx:210,apexY:o,eavesY:196,baseY:n,halfWidth:i,ringY:238,ringR:30,coverage:t.selfSufficiency,prefix:r})}

      ${de({prefix:r,x:210,y:60,r:28,glyph:"solar",color:"var(--clr-production)",text:"none",kicker:"Solar",compact:!0})}

      ${de({prefix:r,x:56,y:220,r:26,glyph:"grid",color:"var(--clr-consumption)",text:"below",kicker:"Grid",compact:!0})}

      ${de({prefix:r,x:364,y:220,r:26,glyph:"community",color:"var(--clr-community)",text:"below",kicker:"Community",compact:!0})}

      ${s?de({prefix:r,x:210,y:372,r:26,glyph:"gas",color:"var(--clr-gas)",text:"none",kicker:"Gas",compact:!0}):""}

      ${Y({id:`${r}-solar`,path:`M 210 94 L 210 ${o-4}`,from:{x:210,y:94},to:{x:210,y:o-4},value:t.directSolarToHome,max:e,color:"var(--clr-production)",label:`Solar to home: ${h(t.directSolarToHome)} kWh`})}

      ${Y({id:`${r}-import`,path:`M 86 206 C 104 200, 120 200, ${c-4} 206`,from:{x:86,y:206},to:{x:c-4,y:206},value:t.boughtFromGrid,max:e,color:"var(--clr-consumption)",label:`Bought from the grid: ${h(t.boughtFromGrid)} kWh`})}

      ${Y({id:`${r}-export`,path:`M ${c-4} 240 C 120 246, 104 246, 86 240`,from:{x:c-4,y:240},to:{x:86,y:240},value:t.soldToMarket,max:e,color:"var(--clr-export)",label:`Exported to the grid: ${h(t.soldToMarket)} kWh`})}

      ${Y({id:`${r}-shared`,path:`M ${u+4} 206 C 300 200, 318 200, 334 206`,from:{x:u+4,y:206},to:{x:334,y:206},value:t.shared,max:e,color:"var(--clr-community)",label:`Shared with the community: ${h(t.shared)} kWh`})}

      ${Y({id:`${r}-received`,path:`M 334 240 C 318 246, 300 246, ${u+4} 240`,from:{x:334,y:240},to:{x:u+4,y:240},value:t.sharedWithMe,max:e,color:"var(--clr-community)",reverse:!0,label:`Received from the community: ${h(t.sharedWithMe)} kWh`})}

      ${s?Y({id:`${r}-gas`,path:`M 210 342 L 210 ${n+6}`,from:{x:210,y:342},to:{x:210,y:n+6},value:Math.min(t.gasEnergy,e),max:e,color:"var(--clr-gas)",reverse:!0,label:`Gas to the house: ${h(t.gasEnergy)} kWh`}):""}
    </svg>
  `}function os(t,e){const s=Math.max(t.totalHomeEnergy,t.production,t.boughtFromGrid,t.soldToMarket,t.shared,t.sharedWithMe,t.directSolarToHome,1);return`
    <div class="elite-scene elite-scene-${e}">
      ${e==="desktop"?Sa(t,s):Ma(t,s)}
    </div>
  `}const Xe=[{id:"year",label:"Year",shortLabel:"Yr",stepLabel:"year",approxMs:365*864e5,maxBuckets:30},{id:"month",label:"Month",shortLabel:"Mo",stepLabel:"month",approxMs:30*864e5,maxBuckets:72},{id:"week",label:"Week",shortLabel:"Wk",stepLabel:"week",approxMs:7*864e5,maxBuckets:104},{id:"day",label:"Day",shortLabel:"Day",stepLabel:"day",approxMs:864e5,maxBuckets:370},{id:"hour",label:"Hour",shortLabel:"Hr",stepLabel:"hour",approxMs:36e5,maxBuckets:744},{id:"quarter_hour",label:"15 min",shortLabel:"15m",stepLabel:"15 minutes",approxMs:15*6e4,maxBuckets:672}];function Ls(t){return Xe.find(e=>e.id===t)??Xe[3]}function kt(t,e){if(!t||!e)return 0;const s=new Date(t).getTime(),a=new Date(e).getTime();return!Number.isFinite(s)||!Number.isFinite(a)?0:Math.max(0,a-s)}function Pe(t,e){const s=Ls(t);if(e<=0)return t==="quarter_hour";const a=e/s.approxMs;return a>=1.5&&a<=s.maxBuckets}function Ca(t,e){var r;if(e&&Pe(e,t))return e;const s=t/864e5,a=s<=1.25?"quarter_hour":s<=7?"hour":s<=45?"day":s<=180?"week":s<=900?"month":"year";return Pe(a,t)?a:((r=Xe.find(o=>Pe(o.id,t)))==null?void 0:r.id)??"quarter_hour"}function Ta(t,e){return new Date(t,e+1,0).getDate()}function is(t,e,s){const a=t.getDate(),r=new Date(t),o=r.getMonth()+s,n=r.getFullYear()+e+Math.floor(o/12),i=(o%12+12)%12,c=Math.min(a,Ta(n,i));return r.setFullYear(n,i,c),r}function ls(t,e,s){switch(e){case"year":return is(t,s,0);case"month":return is(t,0,s);case"week":return new Date(t.getTime()+s*7*864e5);case"day":return new Date(t.getTime()+s*864e5);case"hour":return new Date(t.getTime()+s*36e5);case"quarter_hour":return new Date(t.getTime()+s*15*6e4)}}function Fs(t,e,s,a){if(!t||!e)return null;const r=new Date(t),o=new Date(e);return!Number.isFinite(r.getTime())||!Number.isFinite(o.getTime())?null:{start:ls(r,s,a),end:ls(o,s,a)}}function Ea(t,e){if(!t||!e)return"No period loaded";const s=new Date(t),a=new Date(e);if(!Number.isFinite(s.getTime())||!Number.isFinite(a.getTime()))return"No period loaded";if(s.getFullYear()===a.getFullYear()&&s.getMonth()===a.getMonth()&&s.getDate()===a.getDate()){const o=s.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),n=s.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),i=a.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${o}, ${n} - ${i}`}return`${s.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})} - ${a.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}`}function be(t){const e=s=>`
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
      `)}}function Da(t){var X,Z,he,Ke,Re,ye,J,ve;const e=t.rangeData,s=(e==null?void 0:e.consumption)??0,a=(e==null?void 0:e.production)??0,r=(e==null?void 0:e.exported)??0,o=(e==null?void 0:e.self_consumed)??0,n=(e==null?void 0:e.gas_energy)??0,i=(e==null?void 0:e.gas_volume)??0,c=(e==null?void 0:e.peak_power_kw)??0,u=(e==null?void 0:e.shared_with_me)??0,v=(e==null?void 0:e.shared)??0,w=Math.max(0,r),S=(e==null?void 0:e.grid_import)!=null?Math.max(0,s-e.grid_import):void 0,l=Math.max(0,(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(o>0?o:a-w),S??0),m=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??Math.max(0,l-u)),p=l,b=Math.max(0,(e==null?void 0:e.grid_import)??s-l),_=s>0?s:b+l,x=!!((X=t.config)!=null&&X.meter_has_gas||(((Z=t.config)==null?void 0:Z.meters)??[]).some(A=>A.types.includes("gas"))),C=v+u,M=_>0?Math.min(100,l/_*100):0,d=Math.max(_,a,b,w,v,u,m,1),f=x?Math.min(Math.max(0,n),d):0,g=A=>A>0?Math.max(18,Math.round(A/d*100)):0,y={production:a,directSolarToHome:m,solarToHome:l,boughtFromGrid:b,soldToMarket:w,shared:v,sharedWithMe:u,communityExchange:C,totalHomeEnergy:_,selfSufficiency:M,gasEnergy:n,gasVolume:i,hasGas:x},k=e!=null&&e.start&&(e!=null&&e.end)?`${ce(e.start)} — ${ce(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${ce(t.customStart+"T00:00:00")} — ${ce(t.customEnd+"T00:00:00")}`:((he=Tt.find(A=>A.id===t.range))==null?void 0:he.label)??"Yesterday",E=(Re=(Ke=t.consumptionTimeseries)==null?void 0:Ke.items)!=null&&Re.length?t.consumptionTimeseries.items:((ye=t.productionTimeseries)==null?void 0:ye.items)??[],L=t.chartViewportStart??((J=E[0])==null?void 0:J.startedAt)??(e==null?void 0:e.start),W=t.chartViewportEnd??((ve=E[E.length-1])==null?void 0:ve.startedAt)??(e==null?void 0:e.end),D=kt(L,W),R=Ls(t.chartTimeBucket),B=Ea(L,W),O=Fs(L,W,t.chartTimeBucket,1),z=new Date,se=!O||O.start.getTime()>z.getTime(),pe=Xe.map(A=>{const ke=Pe(A.id,D),st=A.id===t.chartTimeBucket,at=A.id==="quarter_hour"?"15-minute detail would be too dense for this selected period":`${A.label} detail does not add useful resolution for this selected period`;return`
            <button
              class="unit-btn chart-bucket-btn ${st?"active":""}"
              data-chart-bucket="${A.id}"
              title="${ke?`Show ${A.label.toLowerCase()} detail`:at}"
              ${ke?"":'disabled aria-disabled="true"'}
            >${A.label}</button>
          `}).join(""),ie=t.chartUnit==="kw"?"kW uses the same detail presets as kWh, but keeps power values in interval bars so short spikes and dips stay visible.":"kWh keeps the aggregated period bars for totals.",le=`${t.chartConsumptionView==="house"?"Total Usage shows the full house load, with the solar-covered share highlighted in green and exports below zero. Use the detail presets and arrows above the graph to move through time.":t.chartConsumptionView==="solar_systems"?"PV Systems stacks each configured solar production meter so you can compare panel-system output like the Home Assistant Energy dashboard.":"Net Grid focuses on what still came from the grid after solar, with exports shown below zero. The reference limit in kW mode applies here."} ${ie}`,G=((e==null?void 0:e.exceedance_kwh)??0)>0?be("warning"):be("ok"),I=A=>`
        <div class="stat-card ${A.modifier}">
          <div class="stat-icon">${be(A.icon)}</div>
          <div class="stat-body">
            <div class="stat-label">${A.label}</div>
            <div class="stat-value">${A.value} <span class="stat-unit">${A.unit}</span></div>
            <p class="stat-hint">${A.hint}</p>
          </div>
        </div>
  `;return`
    <div class="dashboard">
      ${Et(t)}

      <!-- Stat Cards -->
      <div class="stats-grid">
        ${I({modifier:"consumption",icon:"consumption",label:"Consumption",value:h(s),unit:"kWh",hint:"Everything the house used"})}
        ${I({modifier:"production",icon:"production",label:"Production",value:h(a),unit:"kWh",hint:"Total generated by your panels"})}
        ${I({modifier:"export",icon:"export",label:"Exported",value:h(r),unit:"kWh",hint:"Surplus sold back to the grid"})}
        ${I({modifier:"self-consumed",icon:"self_consumed",label:"Self-Consumed",value:h(p),unit:"kWh",hint:"Solar used at home instead of bought"})}
      </div>

      <!-- Energy Flow + Key Metrics side by side -->
      <div class="flow-metrics-row">
        <div class="card flow-card">
          <h3 class="card-title"><span class="title-icon">${be("flow")}</span> Energy Flow</h3>

          <div class="leneda-elite-flow">
            <p class="flow-scene-caption">
              Thicker paths carry more energy. Colours are explained below the diagram.
            </p>

            ${os(y,"desktop")}
            ${os(y,"mobile")}

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${h(_)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${h(M,0)}% of home usage solar-covered${c>0?` · Peak ${h(c,2)} kW`:""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${h(l)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${g(l)}%;"></span></div>
                  <p>Energy used inside the house${u>0?", including received community energy":""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${h(b)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${g(b)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${h(w)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${g(w)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${h(C)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${g(C)}%;"></span></div>
                  <p>Sent ${h(v)} kWh · received ${h(u)} kWh.</p>
                </div>
                ${x?`
                <div class="mobile-flow-item gas">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Gas to house</span>
                    <strong>${h(n)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${g(f||d)}%;"></span></div>
                  <p>${i>0?`${h(i)} m3 measured for the same period.`:"Gas meter is configured for this home."}</p>
                </div>
                `:""}
              </div>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${h(l)} kWh directly supplied inside the house</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${h(b)} kWh still needed from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${h(w)} kWh sent back to the market or grid</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${h(v)} kWh sent · ${h(u)} kWh received${u>0?" (included in solar to home)":""}</span>
                </span>
              </div>
              ${x?`
              <div class="flow-legend-item gas">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Gas to house</strong>
                  <span>${h(n)} kWh${i>0?` / ${h(i)} m3`:""}</span>
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
              <span class="metric-value">${h(M,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${M}%"></div>
            </div>
            <p class="metric-sub">Share of home usage covered by solar</p>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Bought from Grid</span>
              <span class="metric-value">${h(b)} kWh</span>
            </div>
          </div>
          ${c>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${h(c,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label"><span class="metric-status-icon">${G}</span> Exceedance</span>
              <span class="metric-value">${h((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${n>0||i>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${h(n)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${h(i)} m³</span>
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
                  title="Previous ${R.stepLabel}"
                  aria-label="Previous ${R.stepLabel}"
                >&larr;</button>
                <span class="chart-period-pill">${B}</span>
                <button
                  class="chart-nav-btn"
                  data-chart-period-nav="next"
                  title="Next ${R.stepLabel}"
                  aria-label="Next ${R.stepLabel}"
                  ${se?'disabled aria-disabled="true"':""}
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
        <p class="muted chart-hint">${le}</p>
      </div>
    </div>
  `}function La(t=""){return{iso:t,consumptionKw:0,productionKw:0,gridImportKw:0,solarExportKw:0}}function Ge(t,e,s){for(const a of(e==null?void 0:e.items)??[]){const r=new Date(a.startedAt).getTime();if(!Number.isFinite(r))continue;const o=t.get(r)??La(a.startedAt);o[s]+=Math.max(0,Number(a.value)||0),o.iso||(o.iso=a.startedAt),t.set(r,o)}}function Fa(t,e,s={}){var n,i,c,u;const a=new Map,r=!!((i=(n=s.gridImport)==null?void 0:n.items)!=null&&i.length),o=!!((u=(c=s.marketExport)==null?void 0:c.items)!=null&&u.length);return Ge(a,t,"consumptionKw"),Ge(a,e,"productionKw"),Ge(a,s.gridImport,"gridImportKw"),Ge(a,s.marketExport,"solarExportKw"),[...a.entries()].sort((v,w)=>v[0]-w[0]).map(([v,w])=>{const S=Math.max(0,w.consumptionKw),l=Math.max(0,w.productionKw),m=Math.max(0,Math.min(S,l)),p=r?Math.max(0,w.gridImportKw):Math.max(0,S-m),b=Math.max(0,S-p),_=o?Math.max(0,w.solarExportKw):Math.max(0,l-m);return{timestamp:v,iso:w.iso||new Date(v).toISOString(),consumptionKw:S,productionKw:l,solarToHomeKw:b,gridImportKw:p,solarExportKw:_}})}function Ze(t,e){return Number.isFinite(t)?Number(t):e}function wt(t,e,s){return Math.min(s,Math.max(e,t))}function Wa(t,e,s){const a=t.reduce((l,m)=>l+m.producedKwh,0),r=t.reduce((l,m)=>l+m.selfConsumedKwh,0),o=t.reduce((l,m)=>l+m.exportedKwh,0),n=Ze(e,r),i=Ze(s,o),c=Math.max(0,n)+Math.max(0,i),u=Math.max(0,a-Math.max(0,i));if(a<=0)return{selfConsumedKwh:0,exportedKwh:0};if(c<=a+1e-6)return{selfConsumedKwh:wt(Math.max(Math.max(0,n),u),0,a),exportedKwh:wt(Math.max(0,i),0,a)};const v=c>0?Math.max(0,n)/c:0,w=Math.min(a,Math.max(0,n)),S=wt(a*v,0,w);return{selfConsumedKwh:S,exportedKwh:Math.max(0,a-S)}}function Pa(t,e){const s=t?t.slice(-8):"";return s?`Solar ${e} (${s})`:`Solar ${e}`}function St(t,e,s){return(typeof s=="string"?s.trim():"")||Pa(t,e)}function Lt(t){const e=(t.meters??[]).filter(r=>r.types.includes("production")||r.types.includes("solar_consumption")),s=t.feed_in_rates??[],a=t.currency??"EUR";return e.map((r,o)=>{const n=s.find(S=>S.meter_id===r.id),i=(n==null?void 0:n.mode)==="sensor"&&n.sensor_value!=null&&Number.isFinite(n.sensor_value),c=i?(n==null?void 0:n.sensor_value)??0:Ze(n==null?void 0:n.tariff,Ze(t.feed_in_tariff,0)),u=n==null?void 0:n.self_use_priority,v=u==null||u===""||!Number.isFinite(Number(u))?null:Math.max(1,Math.round(Number(u))),w=St(r.id,o+1,n==null?void 0:n.display_name);return{meterId:r.id,shortId:r.id?"…"+r.id.slice(-8):`Meter ${o+1}`,displayName:w,rate:c,label:i?`Sensor (${c.toFixed(4)} ${a}/kWh)`:"Fixed tariff",mode:(n==null?void 0:n.mode)??"fixed",selfUsePriority:v}}).map((r,o)=>({rate:r,order:o})).sort((r,o)=>{const n=r.rate.selfUsePriority??Number.POSITIVE_INFINITY,i=o.rate.selfUsePriority??Number.POSITIVE_INFINITY;return n!==i?n-i:r.order-o.order}).map(r=>r.rate)}function Ye(t){return t==null?"Pro-rata self-use":`Self-use priority ${t}`}function Ws(t){return t==="prorata"?"Prorata Modus: no self-use priority is configured, so each PV system's self-consumption and export are shared in proportion to what it produced in each 15-minute interval.":t==="mixed"?"Per-system self-consumption and export are allocated from each PV system's 15-minute production: systems with a self-use priority are served first (1 = consumed first at home), and systems sharing or missing a priority split the rest pro-rata to their own production.":"Per-system self-consumption and export are allocated from each PV system's 15-minute production using the configured self-use priority (1 = consumed first at home)."}function Ka(t){if(!t.length)return"prorata";const e=t.filter(a=>a.selfUsePriority!=null);return e.length===0?"prorata":e.length<t.length?"mixed":new Set(e.map(a=>a.selfUsePriority)).size===e.length?"priority":"mixed"}function Ra(t){const e=[];let s;for(const a of t){const r=a.selfUsePriority;if(e.length>0&&r===s){e[e.length-1].push(a);continue}e.push([a]),s=r}return e}function Ft(t,e,s,a,r){if(!e||!(s!=null&&s.length))return null;const o=Lt(t);if(!o.length)return null;const n=new Map(s.map(g=>[g.meter_id,g]));if(!o.some(g=>n.has(g.meterId)))return null;const i=o.map(g=>({...g,producedKwh:0,selfConsumedKwh:0,exportedKwh:0,revenue:0,exportEquivalentForSelfUse:0})),c=new Map(i.map((g,y)=>[g.meterId,y])),u=new Map,v=new Set;for(const g of e.items)g.startedAt&&v.add(g.startedAt);const w=new Map;for(const g of e.items){const y=Math.max(0,Number(g.value)||0);w.set(g.startedAt,(w.get(g.startedAt)??0)+y)}for(const g of s){const y=new Map;for(const k of g.items??[]){const E=Math.max(0,Number(k.value)||0);y.set(k.startedAt,(y.get(k.startedAt)??0)+E),k.startedAt&&v.add(k.startedAt)}u.set(g.meter_id,y)}const S=Ra(i);for(const g of[...v].sort()){let y=Math.max(0,w.get(g)??0);for(const k of S){const E=k.map(D=>{var R;return Math.max(0,((R=u.get(D.meterId))==null?void 0:R.get(g))??0)}),L=E.reduce((D,R)=>D+R,0);if(L<=0)continue;const W=Math.min(y,L);k.forEach((D,R)=>{const B=c.get(D.meterId);if(B==null)return;const O=E[R],z=W*(O/L);i[B].producedKwh+=O*.25,i[B].selfConsumedKwh+=z*.25,i[B].exportedKwh+=Math.max(0,O-z)*.25}),y=Math.max(0,y-W)}}const l=i.reduce((g,y)=>g+y.selfConsumedKwh,0),m=i.reduce((g,y)=>g+y.exportedKwh,0),p=Wa(i,a,r),b=p.selfConsumedKwh,_=p.exportedKwh,x=l>0?b/l:1,C=m>0?_/m:1;for(const g of i)g.selfConsumedKwh*=x,g.exportedKwh*=C,g.revenue=g.exportedKwh*g.rate,g.exportEquivalentForSelfUse=g.selfConsumedKwh*g.rate;const M=i.reduce((g,y)=>g+y.revenue,0),d=i.reduce((g,y)=>g+y.exportEquivalentForSelfUse,0),f=_>0?M/_:0;return{meters:i,totalFeedInRevenue:M,totalSelfUseExportEquivalent:d,weightedExportRate:f,usedPriorityAllocation:!0,allocationMode:Ka(o)}}const cs=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],De={house:"Total Usage",grid:"Net Grid",solar:"Solar Production",exceedance_kwh:"Exceedance kWh",exceedance_frequency:"Exceedance Rate"},Oe={house:"Total Usage",grid:"Net Grid",solar:"Solar Production"},_e={previous:"Previous Period",last_year:"Last Year"};function Aa(t){const e=new Date(t),s=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${s}-${a}-${r}`}function Va(t){const[e,s,a]=t.split("-").map(Number);return new Date(e,s-1,a,12,0,0,0)}function te(t,e=0){return t.length?Math.max(...t):e}function Wt(t,e=0){return t.length?Math.min(...t):e}function ue(t,e,s){return Math.min(s,Math.max(e,t))}function N(t,e){if(!t.length)return 0;const s=[...t].sort((c,u)=>c-u),a=ue(e,0,1),r=(s.length-1)*a,o=Math.floor(r),n=Math.ceil(r);if(o===n)return s[o];const i=r-o;return s[o]*(1-i)+s[n]*i}function Ia(t){const e=Math.floor(t/4),s=t%4*15;return`${String(e).padStart(2,"0")}:${String(s).padStart(2,"0")}`}function V(t,e){return`${h(t,2)} ${e}`}function Je(t,e){return`${t>0?"+":t<0?"-":""}${h(Math.abs(t),2)} ${e}`}function Ue(t,e=1){return Math.abs(t)<.005?"0":`${t>0?"+":""}${h(t,e)}`}function ds(t){const[e,s]=t.split(":").map(a=>parseInt(a,10)||0);return e*60+s}function Ha(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function Ps(t,e,s,a){if(!Ha(t.getDay(),e))return!1;const r=t.getHours()*60+t.getMinutes(),o=ds(s),n=ds(a);return o===n?!0:o<n?r>=o&&r<n:r>=o||r<n}function ja(t,e){return e.find(s=>Ps(t,s.day_group,s.start_time,s.end_time))}function Na(t,e){return e.find(s=>Ps(t,s.day_group,s.start_time,s.end_time))}function Ks(t,e,s,a,r){const o=Ft(t,e,s,a,r);if(o&&o.weightedExportRate>0)return o.weightedExportRate;const n=Lt(t).map(i=>i.rate).filter(i=>Number.isFinite(i)&&i>=0);return n.length?n.reduce((i,c)=>i+c,0)/n.length:t.feed_in_tariff??0}function Ga(t,e,s,a,r,o){const n=r.consumption_rate_windows??[],i=r.reference_power_windows??[],c=r.reference_power_kw??0,u=(r.exceedance_rate??0)*(1+(r.vat_rate??0));return Fa(t,e,{gridImport:s,marketExport:a}).map(v=>{var y,k;const w=v.timestamp,S=new Date(w),l=v.consumptionKw,m=v.productionKw,p=v.solarToHomeKw,b=v.gridImportKw,_=v.solarExportKw,x=((y=Na(S,i))==null?void 0:y.reference_power_kw)??c,C=Math.max(0,l-x),M=Math.max(0,b-x),d=Math.max(0,C-M),g=((((k=ja(S,n))==null?void 0:k.rate)??r.energy_variable_rate??0)+(r.network_variable_rate??0)+(r.electricity_tax_rate??0)+(r.compensation_fund_rate??0))*(1+(r.vat_rate??0));return{timestamp:w,iso:v.iso,date:S,houseKw:l,solarKw:m,solarToHomeKw:p,gridKw:b,exportKw:_,referenceKw:x,overKw:M,avoidedOverKw:d,importRateWithVat:g,feedInRate:o,exceedanceRateWithVat:u}})}function Rs(t,e,s,a,r,o){const n=Ga(t,e,s,a,r,o),i=new Map,c=Array.from({length:24},()=>0),u=Array.from({length:24},(d,f)=>({label:`${String(f).padStart(2,"0")}:00`,importCost:0,exportSpreadValue:0,gridKwh:0,exportKwh:0})),v={house:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),grid:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),solar:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_kwh:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),exceedance_frequency:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0})))},w=()=>Array.from({length:96},()=>[]),S={house:{weekday:w(),weekend:w()},grid:{weekday:w(),weekend:w()},solar:{weekday:w(),weekend:w()}},l={houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0};for(const d of n){const g=Aa(d.timestamp),y=i.get(g)??(()=>{const he=Va(g);return{key:g,label:he.toLocaleDateString(void 0,{month:"short",day:"numeric"}),fullDate:he.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,selfConsumptionAdvantage:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,netValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0}})(),k=d.houseKw*.25,E=d.solarKw*.25,L=d.solarToHomeKw*.25,W=d.gridKw*.25,D=d.exportKw*.25,R=d.overKw*.25,B=d.avoidedOverKw*.25,O=W*d.importRateWithVat,z=L*d.importRateWithVat,se=D*d.feedInRate,pe=L*(d.importRateWithVat-d.feedInRate),ie=R*d.exceedanceRateWithVat,ae=B*d.exceedanceRateWithVat,le=z+se+ae-O-ie;y.houseKwh+=k,y.solarKwh+=E,y.solarToHomeKwh+=L,y.gridKwh+=W,y.exportKwh+=D,y.exceedanceKwh+=R,y.avoidedExceedanceKwh+=B,y.importCost+=O,y.solarSavings+=z,y.exportRevenue+=se,y.selfConsumptionAdvantage+=pe,y.exceedanceCost+=ie,y.avoidedExceedanceValue+=ae,y.netValue+=le,y.peakGridKw=Math.max(y.peakGridKw,d.gridKw),y.peakHouseKw=Math.max(y.peakHouseKw,d.houseKw),y.exceedanceIntervals+=d.overKw>0?1:0,i.set(g,y),l.houseKwh+=k,l.solarKwh+=E,l.solarToHomeKwh+=L,l.gridKwh+=W,l.exportKwh+=D,l.exceedanceKwh+=R,l.avoidedExceedanceKwh+=B,l.importCost+=O,l.solarSavings+=z,l.exportRevenue+=se,l.selfConsumptionAdvantage+=pe,l.exceedanceCost+=ie,l.avoidedExceedanceValue+=ae,l.netValue+=le,l.peakGridKw=Math.max(l.peakGridKw,d.gridKw),l.peakHouseKw=Math.max(l.peakHouseKw,d.houseKw),l.exceedanceIntervals+=d.overKw>0?1:0;const G=(d.date.getDay()+6)%7,I=d.date.getHours(),X=I*4+Math.floor(d.date.getMinutes()/15),Z=d.date.getDay()===0||d.date.getDay()===6?"weekend":"weekday";v.house[G][I].sum+=d.houseKw,v.house[G][I].count+=1,v.grid[G][I].sum+=d.gridKw,v.grid[G][I].count+=1,v.solar[G][I].sum+=d.solarKw,v.solar[G][I].count+=1,v.exceedance_kwh[G][I].sum+=R,v.exceedance_kwh[G][I].count+=1,v.exceedance_frequency[G][I].sum+=d.overKw>0?1:0,v.exceedance_frequency[G][I].count+=1,c[I]+=R,S.house[Z][X].push(d.houseKw),S.grid[Z][X].push(d.gridKw),S.solar[Z][X].push(d.solarKw),u[I].importCost+=O,u[I].exportSpreadValue+=D*Math.max(d.importRateWithVat-d.feedInRate,0),u[I].gridKwh+=W,u[I].exportKwh+=D}const m=[...i.values()].sort((d,f)=>d.key.localeCompare(f.key)).map(d=>(d.coveragePct=d.houseKwh>0?d.solarToHomeKwh/d.houseKwh*100:0,d.selfConsumedPct=d.solarKwh>0?ue(d.solarToHomeKwh/d.solarKwh*100,0,100):0,d.solarValue=d.solarSavings+d.exportRevenue+d.avoidedExceedanceValue,d));l.coveragePct=l.houseKwh>0?l.solarToHomeKwh/l.houseKwh*100:0,l.selfConsumedPct=l.solarKwh>0?ue(l.solarToHomeKwh/l.solarKwh*100,0,100):0,l.solarValue=l.solarSavings+l.exportRevenue+l.avoidedExceedanceValue;const p={house:v.house.map(d=>d.map(f=>f.count?f.sum/f.count:0)),grid:v.grid.map(d=>d.map(f=>f.count?f.sum/f.count:0)),solar:v.solar.map(d=>d.map(f=>f.count?f.sum/f.count:0)),exceedance_kwh:v.exceedance_kwh.map(d=>d.map(f=>f.sum)),exceedance_frequency:v.exceedance_frequency.map(d=>d.map(f=>f.count?f.sum/f.count*100:0))},b=Array.from({length:96},(d,f)=>Ia(f)),_={house:{weekday:{lower:S.house.weekday.map(d=>N(d,.1)),median:S.house.weekday.map(d=>N(d,.5)),upper:S.house.weekday.map(d=>N(d,.9))},weekend:{lower:S.house.weekend.map(d=>N(d,.1)),median:S.house.weekend.map(d=>N(d,.5)),upper:S.house.weekend.map(d=>N(d,.9))}},grid:{weekday:{lower:S.grid.weekday.map(d=>N(d,.1)),median:S.grid.weekday.map(d=>N(d,.5)),upper:S.grid.weekday.map(d=>N(d,.9))},weekend:{lower:S.grid.weekend.map(d=>N(d,.1)),median:S.grid.weekend.map(d=>N(d,.5)),upper:S.grid.weekend.map(d=>N(d,.9))}},solar:{weekday:{lower:S.solar.weekday.map(d=>N(d,.1)),median:S.solar.weekday.map(d=>N(d,.5)),upper:S.solar.weekday.map(d=>N(d,.9))},weekend:{lower:S.solar.weekend.map(d=>N(d,.1)),median:S.solar.weekend.map(d=>N(d,.5)),upper:S.solar.weekend.map(d=>N(d,.9))}}},x=n.filter(d=>d.overKw>0).sort((d,f)=>f.overKw-d.overKw||f.timestamp-d.timestamp).slice(0,8),C=[...n].sort((d,f)=>f.houseKw-d.houseKw||f.timestamp-d.timestamp).slice(0,8),M=[...m].filter(d=>d.exceedanceKwh>0).sort((d,f)=>f.exceedanceKwh-d.exceedanceKwh).slice(0,6);return{points:n,daily:m,totals:l,topExceedances:x,peakIntervals:C,hourlyExceedanceKwh:c,heatmapValues:p,intradayProfiles:_,intradayLabels:b,hourlyOpportunity:u,loadDurationGrossKw:n.map(d=>d.houseKw).sort((d,f)=>f-d),loadDurationNetKw:n.map(d=>d.gridKw).sort((d,f)=>f-d),worstDays:M}}function Oa(t){var e,s,a;return(e=t.rangeData)!=null&&e.start&&((s=t.rangeData)!=null&&s.end)?`${ce(t.rangeData.start)} - ${ce(t.rangeData.end)}`:((a=Tt.find(r=>r.id===t.range))==null?void 0:a.label)??"Selected Period"}function Ua(t){var e,s;return(e=t.rangeData)!=null&&e.start&&((s=t.rangeData)!=null&&s.end)?`${ze(t.rangeData.start)} - ${ze(t.rangeData.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${t.customStart} - ${t.customEnd}`:"Based on the currently selected range."}function us(t){const e=t.analysisComparisonMode==="last_year"?"Same period last year":"Previous matched period";return t.analysisComparison?`${e}: ${ze(t.analysisComparison.start)} - ${ze(t.analysisComparison.end)}`:e}function qa(t){switch(t){case"house":return{description:"Average hourly power by weekday for total house usage.",note:"Each cell shows the average kW seen in that weekday/hour slot over the selected period."};case"grid":return{description:"Average hourly power by weekday for remaining grid draw after solar.",note:"Each cell shows the average net-grid kW seen in that weekday/hour slot over the selected period."};case"solar":return{description:"Average hourly power by weekday for solar production.",note:"Each cell shows the average solar kW seen in that weekday/hour slot over the selected period."};case"exceedance_kwh":return{description:"Cumulative exceedance energy by weekday and hour, showing where the reference limit hurt the most.",note:"Each cell shows cumulative exceedance kWh recorded in that weekday/hour slot over the selected period."};case"exceedance_frequency":return{description:"How often each weekday/hour slot went over the reference limit.",note:"Each cell shows the share of 15-minute intervals in that weekday/hour slot that exceeded the reference limit."}}}function Ba(t,e){switch(t){case"house":case"grid":case"solar":return`${h(e,2)} kW average`;case"exceedance_kwh":return`${h(e,2)} kWh`;case"exceedance_frequency":return`${h(e,0)}% of intervals`}}function oe(t){const e=t.series.filter(g=>g.values.length>0);if(!e.length)return'<div class="analysis-empty">No chart data available for this period.</div>';const s=Math.max(...e.map(g=>g.values.length)),a=Math.max(720,s*24+92),r=244,o=50,n=20,i=18,c=30,u=e.flatMap(g=>g.values);t.referenceValue!=null&&u.push(t.referenceValue);let v=t.minValue??Wt(u,0),w=t.maxValue??te(u,1);v===w&&(w+=1,v=Math.min(0,v-1)),t.minValue==null&&(v=Math.min(0,v));const S=a-o-n,l=r-i-c,m=(g,y)=>y<=1?o+S/2:o+g*S/(y-1),p=g=>i+(w-g)/(w-v)*l,b=t.valueFormatter??(g=>h(g,1)),_=Array.from({length:4},(g,y)=>v+(w-v)/3*y),x=[0,Math.floor((s-1)/2),s-1].filter((g,y,k)=>k.indexOf(g)===y),C=_.map(g=>{const y=p(g);return`
      <line x1="${o}" y1="${y.toFixed(1)}" x2="${(a-n).toFixed(1)}" y2="${y.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(y+4).toFixed(1)}" class="analysis-svg-tick">${b(g)}</text>
    `}).join(""),M=t.referenceValue!=null?(()=>{const g=p(t.referenceValue);return`
        <line x1="${o}" y1="${g.toFixed(1)}" x2="${(a-n).toFixed(1)}" y2="${g.toFixed(1)}" class="analysis-svg-reference" />
        ${t.referenceLabel?`<text x="${a-n}" y="${(g-8).toFixed(1)}" class="analysis-svg-reference-label">${t.referenceLabel}</text>`:""}
      `})():"",d=e.map(g=>{const y=g.values.map((E,L)=>{const W=m(L,g.values.length),D=p(E);return`${L===0?"M":"L"} ${W.toFixed(1)} ${D.toFixed(1)}`}).join(" "),k=g.values.length<=40?g.values.map((E,L)=>{const W=m(L,g.values.length),D=p(E);return`<circle cx="${W.toFixed(1)}" cy="${D.toFixed(1)}" r="2.6" fill="${g.color}" />`}).join(""):"";return`
      <path d="${y}" fill="none" stroke="${g.color}" stroke-width="2.5" ${g.dashed?'stroke-dasharray="6 4"':""} />
      ${k}
    `}).join(""),f=x.map(g=>{const y=m(g,s),k=t.labels[g]??`Point ${g+1}`;return`<text x="${y.toFixed(1)}" y="${r-8}" text-anchor="middle" class="analysis-svg-x-label">${k}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${a}" height="${r}" viewBox="0 0 ${a} ${r}" role="img" aria-label="${t.title??"Line chart"}">
        ${C}
        ${M}
        ${d}
        ${f}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      ${e.map(g=>`
        <span class="analysis-legend-item">
          <span class="analysis-legend-swatch" style="background:${g.color};"></span>
          <span>${g.label}</span>
        </span>
      `).join("")}
      ${t.referenceLabel?`
          <span class="analysis-legend-item">
            <span class="analysis-legend-swatch analysis-legend-swatch-dashed"></span>
            <span>${t.referenceLabel}</span>
          </span>
        `:""}
    </div>
  `}function Ya(t){const e=t.series.filter(f=>f.band.median.length>0);if(!e.length)return'<div class="analysis-empty">No profile data available for this period.</div>';const s=Math.max(...e.map(f=>f.band.median.length)),a=Math.max(760,s*12+92),r=248,o=50,n=20,i=18,c=30,u=e.flatMap(f=>[...f.band.lower,...f.band.median,...f.band.upper]),v=Math.min(0,Wt(u,0));let w=te(u,1);w<=v&&(w=v+1);const S=a-o-n,l=r-i-c,m=(f,g)=>g<=1?o+S/2:o+f*S/(g-1),p=f=>i+(w-f)/(w-v)*l,b=t.valueFormatter??(f=>h(f,1)),_=Array.from({length:4},(f,g)=>v+(w-v)/3*g),x=[0,16,32,48,64,80,s-1].filter((f,g,y)=>f>=0&&f<s&&y.indexOf(f)===g),C=_.map(f=>{const g=p(f);return`
      <line x1="${o}" y1="${g.toFixed(1)}" x2="${(a-n).toFixed(1)}" y2="${g.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${o-8}" y="${(g+4).toFixed(1)}" class="analysis-svg-tick">${b(f)}</text>
    `}).join(""),M=e.map(f=>{const g=f.band.upper.map((E,L)=>{const W=m(L,f.band.upper.length),D=p(E);return`${L===0?"M":"L"} ${W.toFixed(1)} ${D.toFixed(1)}`}).join(" "),y=[...f.band.lower].reverse().map((E,L)=>{const W=f.band.lower.length-1-L,D=m(W,f.band.lower.length),R=p(E);return`L ${D.toFixed(1)} ${R.toFixed(1)}`}).join(" "),k=f.band.median.map((E,L)=>{const W=m(L,f.band.median.length),D=p(E);return`${L===0?"M":"L"} ${W.toFixed(1)} ${D.toFixed(1)}`}).join(" ");return`
      <path d="${g} ${y} Z" fill="${f.fill}" stroke="none" />
      <path d="${k}" fill="none" stroke="${f.color}" stroke-width="2.4" ${f.dashed?'stroke-dasharray="6 4"':""} />
    `}).join(""),d=x.map(f=>{const g=m(f,s),y=t.labels[f]??`Point ${f+1}`;return`<text x="${g.toFixed(1)}" y="${r-8}" text-anchor="middle" class="analysis-svg-x-label">${y}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${a}" height="${r}" viewBox="0 0 ${a} ${r}" role="img" aria-label="${t.title??"Band chart"}">
        ${C}
        ${M}
        ${d}
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
  `}function za(t){const e=new Date(t.timestamp);return{date:e.toLocaleDateString(void 0,{month:"short",day:"numeric"}),time:e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}}function Xa(t){if(!t.length)return'<div class="analysis-empty">No peak intervals available for this period.</div>';const e=Math.max(760,t.length*86+96),s=276,a=52,r=16,o=18,n=54,i=te(t.map(p=>p.houseKw),1),c=e-a-r,u=s-o-n,v=o+u,w=c/t.length,S=Math.max(22,Math.min(38,w*.54)),l=t.map((p,b)=>{const _=a+b*w+(w-S)/2,x=p.solarToHomeKw/i*u,M=Math.max(0,Math.min(p.gridKw,p.referenceKw))/i*u,d=Math.max(0,p.gridKw-p.referenceKw)/i*u;return`
      <g>
        <rect x="${_.toFixed(1)}" y="${(v-x).toFixed(1)}" width="${S.toFixed(1)}" height="${x.toFixed(1)}" rx="4" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${_.toFixed(1)}" y="${(v-x-M).toFixed(1)}" width="${S.toFixed(1)}" height="${M.toFixed(1)}" rx="4" fill="rgba(248, 81, 73, 0.62)" />
        ${d>0?`<rect x="${_.toFixed(1)}" y="${(v-x-M-d).toFixed(1)}" width="${S.toFixed(1)}" height="${d.toFixed(1)}" rx="4" fill="rgba(210, 153, 34, 0.92)" />`:""}
      </g>
    `}).join(""),m=t.map((p,b)=>{const _=a+b*w+w/2,{date:x,time:C}=za(p);return`
      <text x="${_.toFixed(1)}" y="${s-20}" text-anchor="middle" class="analysis-svg-x-label">
        <tspan x="${_.toFixed(1)}" dy="0">${x}</tspan>
        <tspan x="${_.toFixed(1)}" dy="12">${C}</tspan>
      </text>
    `}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${s}" viewBox="0 0 ${e} ${s}" role="img" aria-label="Peak interval anatomy">
        <line x1="${a}" y1="${v.toFixed(1)}" x2="${(e-r).toFixed(1)}" y2="${v.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${a-8}" y="${(o+4).toFixed(1)}" class="analysis-svg-tick">${h(i,1)} kW</text>
        ${l}
        ${m}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.62);"></span><span>Grid within reference</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(210, 153, 34, 0.92);"></span><span>Grid over reference</span></span>
    </div>
  `}function Za(t){if(!t.length)return'<div class="analysis-empty">No daily energy data available.</div>';const e=Math.max(760,t.length*28+84),s=250,a=52,r=16,o=18,n=34,i=te(t.map(C=>C.houseKwh),1),c=te(t.map(C=>C.exportKwh),0),u=e-a-r,v=s-o-n,w=c>0?v*.72:v,S=c>0?v-w:0,l=o+w,m=u/t.length,p=Math.max(8,Math.min(18,m*.62)),b=Math.max(1,Math.ceil(t.length/10)),_=t.map((C,M)=>{const d=a+M*m+(m-p)/2,f=C.solarToHomeKwh/i*w,g=C.gridKwh/i*w,y=c>0?C.exportKwh/c*S:0,k=l-f-g-8;return`
      <g>
        <rect x="${d.toFixed(1)}" y="${(l-f).toFixed(1)}" width="${p.toFixed(1)}" height="${f.toFixed(1)}" rx="3" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${d.toFixed(1)}" y="${(l-f-g).toFixed(1)}" width="${p.toFixed(1)}" height="${g.toFixed(1)}" rx="3" fill="rgba(248, 81, 73, 0.55)" />
        ${y>0?`<rect x="${d.toFixed(1)}" y="${l.toFixed(1)}" width="${p.toFixed(1)}" height="${y.toFixed(1)}" rx="3" fill="rgba(88, 166, 255, 0.75)" />`:""}
        ${C.exceedanceKwh>0?`<circle cx="${(d+p/2).toFixed(1)}" cy="${k.toFixed(1)}" r="3.2" fill="#d29922" />`:""}
      </g>
    `}).join(""),x=t.map((C,M)=>M%b!==0&&M!==t.length-1?"":`<text x="${(a+M*m+m/2).toFixed(1)}" y="${s-10}" text-anchor="middle" class="analysis-svg-x-label">${C.label}</text>`).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${s}" viewBox="0 0 ${e} ${s}" role="img" aria-label="Daily energy breakdown">
        <line x1="${a}" y1="${l.toFixed(1)}" x2="${(e-r).toFixed(1)}" y2="${l.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${a-8}" y="${(o+4).toFixed(1)}" class="analysis-svg-tick">${h(i,0)} kWh</text>
        ${c>0?`<text x="${a-8}" y="${(s-n+4).toFixed(1)}" class="analysis-svg-tick">-${h(c,0)} kWh</text>`:""}
        ${_}
        ${x}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.55);"></span><span>From grid</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span><span>Exported</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:#d29922;"></span><span>Exceedance on that day</span></span>
    </div>
  `}function Ja(t,e){const s=ue(e,0,1);return t==="solar"?`rgba(63, 185, 80, ${.12+s*.82})`:t==="exceedance_kwh"||t==="exceedance_frequency"?`rgba(210, 153, 34, ${.14+s*.82})`:t==="grid"?`rgba(210, 153, 34, ${.12+s*.82})`:`rgba(248, 81, 73, ${.12+s*.82})`}function Qa(t,e){const s=t.flat(),a=te(s,1),r=Wt(s,0);return`
    <div class="analysis-heatmap">
      <div class="analysis-heatmap-hours">
        <span class="analysis-heatmap-corner"></span>
        ${Array.from({length:24},(o,n)=>`
          <span class="analysis-heatmap-hour ${n%2===1?"analysis-heatmap-hour-faded":""}">${String(n).padStart(2,"0")}</span>
        `).join("")}
      </div>
      ${t.map((o,n)=>`
        <div class="analysis-heatmap-row">
          <span class="analysis-heatmap-day">${cs[n]}</span>
          ${o.map((i,c)=>{const u=a===r?0:(i-r)/(a-r);return`
              <span
                class="analysis-heatmap-cell"
                style="background:${Ja(e,u)};"
                title="${cs[n]} ${String(c).padStart(2,"0")}:00 - ${Ba(e,i)}"
              >${i>(e==="exceedance_frequency"?1:.05)?h(i,e==="exceedance_frequency"?0:1):""}</span>
            `}).join("")}
        </div>
      `).join("")}
    </div>
  `}function Qe(t){const e=te(t.map(s=>s.value),1);return t.length?`
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
  `:'<div class="analysis-empty">No standout patterns in this period.</div>'}function er(t,e,s){const a=s.communitySolarToHomeKwh>.01?`${h(s.totalSolarCoverageKwh)} kWh of ${h(s.consumptionKwh)} kWh usage covered, incl. ${h(s.communitySolarToHomeKwh)} kWh shared`:`${h(s.totalSolarCoverageKwh)} kWh of ${h(s.consumptionKwh)} kWh usage covered`;return`
    <div class="analysis-stat-grid">
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Solar Coverage</span>
        <strong class="analysis-stat-value">${h(s.coveragePct,1)}%</strong>
        <span class="analysis-stat-meta">${a}</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Consumed Solar</span>
        <strong class="analysis-stat-value">${h(s.selfConsumedPct,1)}%</strong>
        <span class="analysis-stat-meta">${h(s.directSolarToHomeKwh)} kWh kept from your own solar, ${h(s.exportedKwh)} kWh exported</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Total Solar Value</span>
        <strong class="analysis-stat-value">${V(s.totalSolarValue,e)}</strong>
        <span class="analysis-stat-meta">Savings plus export revenue plus avoided exceedance charges</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Use vs Export</span>
        <strong class="analysis-stat-value">${Je(s.selfConsumptionAdvantage,e)}</strong>
        <span class="analysis-stat-meta">${h(s.directSolarToHomeKwh)} kWh kept on-site instead of exported</span>
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
        <strong class="analysis-stat-value">${V(s.variableImportCost,e)}</strong>
        <span class="analysis-stat-meta">${h(s.billedGridImportKwh)} kWh billed from the grid during the selected period</span>
      </div>
    </div>
  `}function tr(t){return`
    <div class="card analysis-card analysis-card-full">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Daily Breakdown</h3>
          <p class="analysis-card-copy">House usage is split into solar-covered energy, grid energy, and exported surplus. A gold marker flags days with any reference-power exceedance.</p>
        </div>
      </div>
      ${Za(t.daily)}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily exceedance volume</h4>
        ${oe({title:"Daily exceedance volume",series:[{label:"Exceedance",color:"#d29922",values:t.daily.map(e=>e.exceedanceKwh)}],labels:t.daily.map(e=>e.label),valueFormatter:e=>`${h(e,2)} kWh`})}
      </div>
    </div>
  `}function sr(t,e){const s=qa(t.analysisHeatmapMetric);return`
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
      ${Qa(e.heatmapValues[t.analysisHeatmapMetric],t.analysisHeatmapMetric)}
      <p class="analysis-note">${s.note}</p>
    </div>
  `}function ar(t,e){const s=t.analysisProfileMetric,a=e.intradayProfiles[s],r=Oe[s],o=a.weekday.median.reduce((i,c,u,v)=>c>v[i]?u:i,0),n=a.weekend.median.reduce((i,c,u,v)=>c>v[i]?u:i,0);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Intraday Profile</h3>
          <p class="analysis-card-copy">A typical day view for ${r.toLowerCase()}, split between weekdays and weekends. The band shows the p10 to p90 range and the line is the median interval.</p>
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
          <strong>${h(a.weekday.median[o]??0,2)} kW</strong>
          <span class="analysis-stat-meta">${e.intradayLabels[o]??"n/a"}</span>
        </div>
        <div>
          <span class="analysis-inline-label">Weekend median peak</span>
          <strong>${h(a.weekend.median[n]??0,2)} kW</strong>
          <span class="analysis-stat-meta">${e.intradayLabels[n]??"n/a"}</span>
        </div>
      </div>
      ${Ya({title:`${r} intraday profile`,labels:e.intradayLabels,series:[{label:"Weekday median (p10-p90 band)",color:"#58a6ff",fill:"rgba(88, 166, 255, 0.14)",band:a.weekday},{label:"Weekend median (p10-p90 band)",color:"#d29922",fill:"rgba(210, 153, 34, 0.13)",band:a.weekend,dashed:!0}],valueFormatter:i=>`${h(i,1)} kW`})}
      <p class="analysis-note">This makes the typical daily rhythm much easier to read than the weekday/hour heatmap alone.</p>
    </div>
  `}function rr(t,e,s){const a=t.meters.reduce((o,n)=>o+n.selfConsumedKwh*e,0),r=a+t.totalFeedInRevenue;return`
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
            ${t.meters.map(o=>{const n=o.selfConsumedKwh*e,i=n+o.revenue;return`
                <tr>
                  <td>
                    <strong>${o.displayName}</strong>
                    <div class="analysis-stat-meta">${o.shortId} · ${Ye(o.selfUsePriority)}</div>
                  </td>
                  <td>${h(o.rate,4)} ${s}/kWh</td>
                  <td>${h(o.producedKwh)} kWh</td>
                  <td>${h(o.selfConsumedKwh)} kWh</td>
                  <td>${h(o.exportedKwh)} kWh</td>
                  <td>${V(n,s)}</td>
                  <td>${V(o.revenue,s)}</td>
                  <td>${V(i,s)}</td>
                </tr>
              `}).join("")}
            <tr>
              <td><strong>Portfolio subtotal</strong></td>
              <td></td>
              <td>${h(t.meters.reduce((o,n)=>o+n.producedKwh,0))} kWh</td>
              <td>${h(t.meters.reduce((o,n)=>o+n.selfConsumedKwh,0))} kWh</td>
              <td>${h(t.meters.reduce((o,n)=>o+n.exportedKwh,0))} kWh</td>
              <td>${V(a,s)}</td>
              <td>${V(t.totalFeedInRevenue,s)}</td>
              <td>${V(r,s)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="analysis-note">${Ws(t.allocationMode)}</p>
      <p class="analysis-note">This subtotal includes self-use savings and export revenue. Avoided exceedance value stays only in the overall solar total because it depends on aggregate site load, not a single solar system.</p>
    </div>
  `}function nr(t,e,s,a){const r=t.totals.solarKwh>0?ue(t.totals.solarToHomeKwh/t.totals.solarKwh*100,0,100):0,o=t.totals.solarKwh>0?ue(t.totals.exportKwh/t.totals.solarKwh*100,0,100):0;return`
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
          <strong>${V(t.totals.solarValue,e)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-use vs export</span>
          <strong>${Je(t.totals.selfConsumptionAdvantage,e)}</strong>
        </div>
      </div>
      <div class="analysis-share-bar">
        <span class="analysis-share-segment analysis-share-segment-home" style="width:${r}%;"></span>
        <span class="analysis-share-segment analysis-share-segment-export" style="width:${o}%;"></span>
      </div>
      <div class="analysis-share-legend">
        <span><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span>Self-consumed: ${h(t.totals.solarToHomeKwh)} kWh</span>
        <span><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span>Exported: ${h(t.totals.exportKwh)} kWh</span>
      </div>
      ${s!=null&&s.meters.length?rr(s,a,e):""}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Coverage of house usage by day</h4>
        ${oe({title:"Daily solar coverage",series:[{label:"Coverage",color:"#3fb950",values:t.daily.map(n=>n.coveragePct)}],labels:t.daily.map(n=>n.label),maxValue:100,minValue:0,valueFormatter:n=>`${h(n,0)}%`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day</h4>
        ${oe({title:"Daily solar value",series:[{label:"Solar value",color:"#58a6ff",values:t.daily.map(n=>n.solarValue)}],labels:t.daily.map(n=>n.label),valueFormatter:n=>V(n,e)})}
      </div>
    </div>
  `}function or(t,e){const s=[...t.hourlyOpportunity].sort((n,i)=>i.importCost-n.importCost)[0],a=[...t.hourlyOpportunity].sort((n,i)=>i.exportSpreadValue-n.exportSpreadValue)[0],r=[...t.hourlyOpportunity].filter(n=>n.importCost>0).sort((n,i)=>i.importCost-n.importCost).slice(0,5).map(n=>({label:n.label,value:n.importCost,meta:`${V(n.importCost,e)} from ${h(n.gridKwh,1)} kWh`})),o=[...t.hourlyOpportunity].filter(n=>n.exportSpreadValue>0).sort((n,i)=>i.exportSpreadValue-n.exportSpreadValue).slice(0,5).map(n=>({label:n.label,value:n.exportSpreadValue,meta:`${V(n.exportSpreadValue,e)} on ${h(n.exportKwh,1)} kWh`,colorClass:"analysis-progress-fill-warn"}));return`
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
          <strong>${V(t.hourlyOpportunity.reduce((n,i)=>n+i.importCost,0),e)}</strong>
          <span class="analysis-stat-meta">Variable import cost grouped by hour of day</span>
        </div>
        <div>
          <span class="analysis-inline-label">Export spread opportunity</span>
          <strong>${V(t.hourlyOpportunity.reduce((n,i)=>n+i.exportSpreadValue,0),e)}</strong>
          <span class="analysis-stat-meta">Approximate value gap between export and local use</span>
        </div>
        <div>
          <span class="analysis-inline-label">Hardest import hour</span>
          <strong>${(s==null?void 0:s.label)??"n/a"}</strong>
          <span class="analysis-stat-meta">${s?V(s.importCost,e):"No import cost recorded"}</span>
        </div>
        <div>
          <span class="analysis-inline-label">Best storage hour</span>
          <strong>${(a==null?void 0:a.label)??"n/a"}</strong>
          <span class="analysis-stat-meta">${a?V(a.exportSpreadValue,e):"No export spread recorded"}</span>
        </div>
      </div>
      ${oe({title:"Hourly tariff opportunity",series:[{label:"Import cost pressure",color:"#f85149",values:t.hourlyOpportunity.map(n=>n.importCost)},{label:"Export spread opportunity",color:"#58a6ff",values:t.hourlyOpportunity.map(n=>n.exportSpreadValue)}],labels:t.hourlyOpportunity.map(n=>n.label),valueFormatter:n=>V(n,e)})}
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Most expensive import hours</h4>
          ${Qe(r)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Best export-to-storage hours</h4>
          ${Qe(o)}
        </div>
      </div>
      <p class="analysis-note">Export spread opportunity uses the difference between the import rate and feed-in rate for exported energy in that hour, so it is a directional indicator rather than a billing line item.</p>
    </div>
  `}function ir(t,e){const s=t.hourlyExceedanceKwh.map((a,r)=>({label:`${String(r).padStart(2,"0")}:00`,value:a,meta:`${h(a,2)} kWh`,colorClass:"analysis-progress-fill-warn"})).filter(a=>a.value>0).sort((a,r)=>r.value-a.value).slice(0,6);return`
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
          <strong>${h(te(t.topExceedances.map(a=>a.overKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Exceedance cost</span>
          <strong>${V(t.totals.exceedanceCost,e)}</strong>
        </div>
      </div>
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Worst hours</h4>
          ${Qe(s)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Worst days</h4>
          ${Qe(t.worstDays.map(a=>({label:a.fullDate,value:a.exceedanceKwh,meta:`${h(a.exceedanceKwh,2)} kWh`,colorClass:"analysis-progress-fill-warn"})))}
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
                      <td>${Cs(a.iso)}</td>
                      <td>${h(a.gridKw,2)} kW</td>
                      <td>${h(a.referenceKw,2)} kW</td>
                      <td>${h(a.overKw,2)} kW</td>
                      <td>${h(a.solarKw,2)} kW</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `:'<div class="analysis-empty">No reference exceedance was recorded in this period.</div>'}
      </div>
    </div>
  `}function lr(t){const e=t.peakIntervals.length?t.peakIntervals.reduce((s,a)=>s+(a.houseKw>0?a.solarToHomeKw/a.houseKw*100:0),0)/t.peakIntervals.length:0;return`
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
          <strong>${h(te(t.peakIntervals.map(s=>s.houseKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Highest net-grid peak</span>
          <strong>${h(te(t.peakIntervals.map(s=>s.gridKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Solar share across peaks</span>
          <strong>${h(e,0)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Intervals over reference</span>
          <strong>${h(t.peakIntervals.filter(s=>s.overKw>0).length,0)} / ${h(t.peakIntervals.length,0)}</strong>
        </div>
      </div>
      ${Xa(t.peakIntervals)}
      <p class="analysis-note">A gold cap only appears when the grid portion of the interval exceeded the configured reference power.</p>
    </div>
  `}function cr(t,e,s){var c,u;const a=e.analysisComparisonMode==="last_year"?"Last year":"Previous";if(e.analysisComparisonLoading)return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${us(e)}</p>
          </div>
          <div class="chart-unit-toggle">
            <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${_e.previous}</button>
            <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${_e.last_year}</button>
          </div>
        </div>
        <div class="analysis-empty">Loading comparison period...</div>
      </div>
    `;if(!((c=e.analysisComparison)!=null&&c.consumptionTimeseries)||!((u=e.analysisComparison)!=null&&u.productionTimeseries))return`
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
    `;const r=Ks(s,e.analysisComparison.consumptionTimeseries,null,void 0,void 0),o=Rs(e.analysisComparison.consumptionTimeseries,e.analysisComparison.productionTimeseries,e.analysisComparison.gridImportTimeseries,e.analysisComparison.marketExportTimeseries,s,r),n=Math.max(t.daily.length,o.daily.length,1),i=Array.from({length:n},(v,w)=>`D${w+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Period Comparison</h3>
          <p class="analysis-card-copy">${us(e)}</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${e.analysisComparisonMode==="previous"?"active":""}" data-analysis-comparison-mode="previous">${_e.previous}</button>
          <button class="unit-btn ${e.analysisComparisonMode==="last_year"?"active":""}" data-analysis-comparison-mode="last_year">${_e.last_year}</button>
        </div>
      </div>
      <div class="analysis-compare-grid">
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">House usage</span>
          <strong>${h(t.totals.houseKwh)} kWh</strong>
          <span class="analysis-compare-delta">${Ue(t.totals.houseKwh-o.totals.houseKwh)} kWh vs ${a.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Net grid usage</span>
          <strong>${h(t.totals.gridKwh)} kWh</strong>
          <span class="analysis-compare-delta">${Ue(t.totals.gridKwh-o.totals.gridKwh)} kWh vs ${a.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar coverage</span>
          <strong>${h(t.totals.coveragePct,1)}%</strong>
          <span class="analysis-compare-delta">${Ue(t.totals.coveragePct-o.totals.coveragePct)} pts vs ${a.toLowerCase()}</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar value</span>
          <strong>${V(t.totals.solarValue,s.currency||"EUR")}</strong>
          <span class="analysis-compare-delta">${Ue(t.totals.solarValue-o.totals.solarValue,2)} ${s.currency||"EUR"} vs ${a.toLowerCase()}</span>
        </div>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Usage by day index</h4>
        ${oe({title:`Current versus ${a.toLowerCase()} usage`,series:[{label:"Current",color:"#f85149",values:t.daily.map(v=>v.houseKwh)},{label:a,color:"#58a6ff",values:o.daily.map(v=>v.houseKwh),dashed:!0}],labels:i,valueFormatter:v=>`${h(v,1)} kWh`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day index</h4>
        ${oe({title:`Current versus ${a.toLowerCase()} solar value`,series:[{label:"Current",color:"#3fb950",values:t.daily.map(v=>v.solarValue)},{label:a,color:"#d29922",values:o.daily.map(v=>v.solarValue),dashed:!0}],labels:i,valueFormatter:v=>V(v,s.currency||"EUR")})}
      </div>
    </div>
  `}function dr(t,e){return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Tariff-Aware Cost Trends</h3>
          <p class="analysis-card-copy">Estimated variable import cost, solar savings, export earnings, and exceedance cost by day. Fixed monthly fees are intentionally left out so this stays behavior-driven.</p>
        </div>
      </div>
      ${oe({title:"Daily cost and value trends",series:[{label:"Import cost",color:"#f85149",values:t.daily.map(s=>s.importCost)},{label:"Solar savings",color:"#3fb950",values:t.daily.map(s=>s.solarSavings)},{label:"Export earnings",color:"#58a6ff",values:t.daily.map(s=>s.exportRevenue)},{label:"Exceedance cost",color:"#d29922",values:t.daily.map(s=>s.exceedanceCost)}],labels:t.daily.map(s=>s.label),valueFormatter:s=>V(s,e)})}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily net energy value</h4>
        ${oe({title:"Daily net energy value",series:[{label:"Net value",color:"#39c5cf",values:t.daily.map(s=>s.netValue)}],labels:t.daily.map(s=>s.label),referenceValue:0,referenceLabel:"Break-even",valueFormatter:s=>Je(s,e)})}
      </div>
      <div class="analysis-cost-totals">
        <span>Import cost: <strong>${V(t.totals.importCost,e)}</strong></span>
        <span>Solar savings: <strong>${V(t.totals.solarSavings,e)}</strong></span>
        <span>Export earnings: <strong>${V(t.totals.exportRevenue,e)}</strong></span>
        <span>Exceedance cost: <strong>${V(t.totals.exceedanceCost,e)}</strong></span>
        <span>Net value: <strong>${Je(t.totals.netValue,e)}</strong></span>
      </div>
    </div>
  `}function ur(t,e){const s=Array.from({length:Math.max(t.loadDurationGrossKw.length,t.loadDurationNetKw.length,1)},(a,r)=>`${r+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Load Duration Curve</h3>
          <p class="analysis-card-copy">Gross house load and net grid load sorted from highest to lowest interval. This shows how often high demand really occurs and how much solar trims the top end.</p>
        </div>
      </div>
      ${oe({title:"Load duration curve",series:[{label:"Gross house load",color:"#f85149",values:t.loadDurationGrossKw},{label:"Net grid load",color:"#58a6ff",values:t.loadDurationNetKw}],labels:s,referenceValue:e>0?e:void 0,referenceLabel:e>0?`Reference ${h(e,1)} kW`:void 0,valueFormatter:a=>`${h(a,1)} kW`})}
      <p class="analysis-note">Intervals are ordered from highest demand to lowest, so the left side is your hardest-to-handle load.</p>
    </div>
  `}function pr(t){var d,f;const e=t.config,s=t.rangeData,a=t.consumptionTimeseries,r=t.productionTimeseries;if(!e||!s||!a||!r)return`
      <section class="analysis-view">
        <div class="card">
          <p class="muted">Loading analysis data...</p>
        </div>
      </section>
    `;const o=Math.max(0,s.consumption??0),n=Math.max(0,s.production??0),i=Math.max(0,s.exported??0),c=Math.max(0,s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:0)),u=Math.max(0,(s.grid_import!=null?o-s.grid_import:void 0)??s.solar_to_home??c??(s.self_consumed&&s.self_consumed>0?s.self_consumed:n-i)),v=Math.max(0,s.grid_import??o-u),w=Math.max(0,u-c),S=Ft(e,a,((d=t.perMeterProductionTimeseries)==null?void 0:d.meters)??null,c,i),l=Ks(e,a,((f=t.perMeterProductionTimeseries)==null?void 0:f.meters)??null,c,i),m=Rs(a,r,t.gridImportTimeseries,t.marketExportTimeseries,e,l),p=e.currency||"EUR",b=((e.energy_variable_rate??0)+(e.network_variable_rate??0)+(e.electricity_tax_rate??0)+(e.compensation_fund_rate??0))*(1+(e.vat_rate??0)),_=c*b,x=S?S.totalSelfUseExportEquivalent:c*l,C=S?S.totalFeedInRevenue:i*l,M={consumptionKwh:o,totalSolarCoverageKwh:u,directSolarToHomeKwh:c,communitySolarToHomeKwh:w,exportedKwh:i,billedGridImportKwh:v,coveragePct:o>0?ue(u/o*100,0,100):0,selfConsumedPct:n>0?ue(c/n*100,0,100):0,totalSolarValue:_+m.totals.avoidedExceedanceValue+C,selfConsumptionAdvantage:_-x,variableImportCost:v*b};return`
    <section class="analysis-view">
      <div class="section-header analysis-section-header">
        <div>
          <span class="badge">Analysis</span>
          <h2>Charts and Optimization</h2>
          <p class="muted">Deeper electricity analysis for ${Oa(t)}. This page is built from the same 15-minute data and billing settings that drive the dashboard and invoice.</p>
        </div>
        <div class="analysis-header-meta">
          <span>${Ua(t)}</span>
          <span>${h(m.daily.length,0)} day${m.daily.length===1?"":"s"} analysed</span>
        </div>
      </div>

      ${Et(t)}
      ${er(m,p,M)}
      ${tr(m)}

      <div class="analysis-grid">
        ${ar(t,m)}
        ${sr(t,m)}
      </div>

      <div class="analysis-grid">
        ${nr(m,p,S,b)}
        ${or(m,p)}
      </div>

      <div class="analysis-grid">
        ${ir(m,p)}
        ${cr(m,t,e)}
      </div>

      <div class="analysis-grid">
        ${dr(m,p)}
        ${ur(m,e.reference_power_kw??0)}
      </div>

      ${lr(m)}
    </section>
  `}const ps={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function hs(t){return ps[t]?ps[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function hr(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],s=[],a=[],r=[],o=[];for(const i of t.sensors){const c=i.key;c.startsWith("c_")||c==="1-1:1.29.0"||c==="1-1:3.29.0"?e.push(i):c.startsWith("p_")||c==="1-1:2.29.0"||c==="1-1:4.29.0"?s.push(i):c.startsWith("s_")||c.startsWith("1-65:")?a.push(i):c.startsWith("g_")||c.startsWith("7-")?r.push(i):o.push(i)}const n=(i,c,u,v)=>u.length?`
      <div class="card sensor-group">
        <h3 class="card-title"><span class="title-icon">${c}</span> ${i} <span class="badge">${u.length}</span></h3>
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
              ${u.map(w=>`
                <tr data-sensor-search="${`${hs(w.key)} ${w.key}`.toLowerCase()}">
                  <td class="sensor-name">${hs(w.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${v});">${h(w.value)}</td>
                  <td class="sensor-unit">${w.unit}</td>
                  <td class="sensor-peak">${w.peak_timestamp?Cs(w.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
      ${n("Electricity Consumption","⚡",e,"consumption")}
      ${n("Energy Production","☀️",s,"production")}
      ${n("Energy Sharing","🔗",a,"self")}
      ${n("Gas","🔥",r,"gas")}
      ${n("Other","📊",o,"text")}
    </section>
  `}const mr=11,As="lu_resilienzpak_electricity_2026",gr="lu_resilienzpak_gas_2026",yr=[{id:"lu-electricity-resilienzpak-2026",label:"Luxembourg electricity subsidy 2026",enabled:!0,commodity:"electricity",basis:"grid_import_kwh",amount_gross:.04,start_date:"2026-08-01",end_date:"2026-12-31",vat_included:!0,preset_id:As,eligibility_note:"Residential customers below 25,000 kWh/year; applies to grid import only.",tariff_already_includes_adjustment:!1},{id:"lu-gas-resilienzpak-2026",label:"Luxembourg gas subsidy 2026",enabled:!0,commodity:"gas",basis:"gas_volume_m3",amount_gross:.15,start_date:"2026-08-01",end_date:"2026-12-31",vat_included:!0,preset_id:gr,eligibility_note:"Eligible residential gas consumption.",tariff_already_includes_adjustment:!1}];function vr(t=!0){return yr.map(e=>({...e,enabled:t}))}const Vs=["electricity","gas"],Is=["grid_import_kwh","gas_volume_m3"];function fr(t){const e=[];Vs.includes(t.commodity)||e.push(`invalid commodity: ${String(t.commodity)}`),Is.includes(t.basis)||e.push(`invalid basis: ${String(t.basis)}`);const s=Number(t.amount_gross);isFinite(s)?s<0&&e.push("amount_gross must not be negative"):e.push("amount_gross must be a number");const a=et(t.start_date),r=et(t.end_date);return a||e.push("start_date must be YYYY-MM-DD"),r||e.push("end_date must be YYYY-MM-DD"),a&&r&&r<a&&e.push("end_date must not be before start_date"),e}function wr(t,e=0){let s=Number(t.amount_gross);return isFinite(s)||(s=0),{id:t.id?String(t.id).trim():`custom-${e+1}`,label:t.label&&String(t.label).trim()?String(t.label).trim():"Billing adjustment",enabled:t.enabled!==!1,commodity:Vs.includes(t.commodity)?t.commodity:"electricity",basis:Is.includes(t.basis)?t.basis:"grid_import_kwh",amount_gross:s,start_date:String(t.start_date??"").slice(0,10),end_date:String(t.end_date??"").slice(0,10),vat_included:t.vat_included!==!1,preset_id:t.preset_id?String(t.preset_id).trim():"",eligibility_note:t.eligibility_note?String(t.eligibility_note).trim():"",tariff_already_includes_adjustment:!!t.tariff_already_includes_adjustment}}function Hs(t){return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object").map((e,s)=>wr(e,s)):[]}function et(t){if(!t||!/^\d{4}-\d{2}-\d{2}/.test(t))return null;const e=t.slice(0,10),[s,a,r]=e.split("-").map(Number);if(a<1||a>12||r<1||r>31)return null;const o=new Date(Date.UTC(s,a-1,r));return o.getUTCFullYear()!==s||o.getUTCMonth()!==a-1||o.getUTCDate()!==r?null:e}const $r=new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Luxembourg",year:"numeric",month:"2-digit",day:"2-digit"});function br(t){const e=new Date(t);return Number.isNaN(e.getTime())?null:$r.format(e)}function _r(t,e){return!!t.start_date&&!!t.end_date&&t.start_date<=e&&e<=t.end_date}function Pt(t){return t.enabled&&fr(t).length===0}function Mt(t){return Pt(t)&&!t.tariff_already_includes_adjustment}function xe(t){const[e,s,a]=t.split("-").map(Number);return Math.floor(Date.UTC(e,s-1,a)/864e5)}function js(t,e,s){const a=et(t.start_date),r=et(t.end_date);if(!a||!r)return 0;const o=a>e?a:e,n=r<s?r:s,i=xe(n)-xe(o)+1;return i>0?i:0}function Ct(t,e,s,a,r,o){const n=e*t.amount_gross,i=t.vat_included?n/(1+a):n;return{id:t.id,label:t.label,commodity:t.commodity,basis:t.basis,unit:s,quantity:e,amount_gross:t.amount_gross,total_gross:n,total_net:i,vat_included:t.vat_included,applied:r,estimated:o,preset_id:t.preset_id??"",eligibility_note:t.eligibility_note??""}}function xr(t,e,s,a,r,o,n,i){const c=t.filter(l=>l.commodity==="electricity"&&l.basis==="grid_import_kwh"&&Pt(l));if(c.length===0)return{lines:[],solarCorrectionGross:0,estimatedAny:!1};const u=[];let v=0,w=!1;if(e&&e.length>0){const l=new Map(c.map(b=>[b.id,0])),m=new Map(c.map(b=>[b.id,0])),p=new Map;for(const b of s??[]){const _=String(b.startedAt??"");p.set(_,(p.get(_)??0)+(Number(b.value)||0))}for(const b of e){const _=Number(b.value)||0,x=String(b.startedAt??""),C=br(x);if(C===null)continue;const M=p.get(x)??0,d=Math.max(0,_-M)*.25,f=Math.min(_,M)*.25;for(const g of c)_r(g,C)&&(l.set(g.id,l.get(g.id)+d),m.set(g.id,m.get(g.id)+f))}for(const b of c){const _=Mt(b);u.push(Ct(b,l.get(b.id),"kWh",i,_,!1)),_&&(v+=m.get(b.id)*b.amount_gross)}return{lines:u,solarCorrectionGross:v,estimatedAny:w}}const S=Math.max(1,xe(n)-xe(o)+1);for(const l of c){const m=js(l,o,n),p=m/S,b=m>0&&m<S;w=w||b;const _=Mt(l);u.push(Ct(l,Math.max(0,a)*p,"kWh",i,_,b)),_&&(v+=Math.max(0,r)*p*l.amount_gross)}return{lines:u,solarCorrectionGross:v,estimatedAny:w}}function kr(t,e,s,a,r,o){const n=t.filter(w=>w.commodity==="gas"&&w.basis==="gas_volume_m3"&&Pt(w));if(n.length===0)return{lines:[],estimatedAny:!1};let i=!1,c=Math.max(0,e||0);c<=0&&s>0&&(c=s/mr,i=!0);const u=Math.max(1,xe(r)-xe(a)+1),v=[];for(const w of n){const S=js(w,a,r),l=S/u,m=i||S>0&&S<u;v.push(Ct(w,c*l,"m3",o,Mt(w),m)),m&&(i=!0)}return{lines:v,estimatedAny:i}}function Sr(t){const e=Hs(t.adjustments),s=xr(e,t.consumptionItems,t.productionItems,t.fallbackGridImportKwh??0,t.fallbackSelfConsumedKwh??0,t.periodStart,t.periodEnd,t.vatRate||0),a=kr(e,t.gasVolumeM3??0,t.gasEnergyKwh??0,t.periodStart,t.periodEnd,t.gasVatRate||0),r=i=>{let c=0,u=0;for(const v of i)v.applied&&(c+=v.total_gross,u+=v.total_net);return{gross:c,net:u}},o=r(s.lines),n=r(a.lines);return{electricity:{lines:s.lines,applied_gross:o.gross,applied_net:o.net,solar_correction_gross:s.solarCorrectionGross,estimated:s.estimatedAny},gas:{lines:a.lines,applied_gross:n.gross,applied_net:n.net,estimated:a.estimatedAny},estimated:s.estimatedAny||a.estimatedAny}}const ms=[{kw:3,fixedMonthlyFee:7.42},{kw:7,fixedMonthlyFee:12.84},{kw:12,fixedMonthlyFee:19.61},{kw:17,fixedMonthlyFee:26.39},{kw:27,fixedMonthlyFee:39.94},{kw:43,fixedMonthlyFee:61.62},{kw:70,fixedMonthlyFee:98.2},{kw:100,fixedMonthlyFee:138.85},{kw:150,fixedMonthlyFee:206.6,existingContractsOnly:!0},{kw:200,fixedMonthlyFee:274.35,existingContractsOnly:!0}];function qe(t){if(!t)return null;const e=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(e){const[,a,r,o]=e;return new Date(Number(a),Number(r)-1,Number(o))}const s=new Date(t);return Number.isNaN(s.getTime())?null:new Date(s.getFullYear(),s.getMonth(),s.getDate())}function Mr(t,e,s,a,r){const o=new Date,n=qe(a),i=qe(r);let c=n,u=i;if(!c||!u)switch(t){case"yesterday":{const p=new Date(o);p.setDate(p.getDate()-1),c=new Date(p.getFullYear(),p.getMonth(),p.getDate()),u=new Date(c);break}case"this_week":{const p=new Date(o),b=p.getDay()||7;c=new Date(p.getFullYear(),p.getMonth(),p.getDate()-b+1),u=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_week":{const p=new Date(o),b=p.getDay()||7,_=new Date(p.getFullYear(),p.getMonth(),p.getDate()-b+1);c=new Date(_.getFullYear(),_.getMonth(),_.getDate()-7),u=new Date(_.getFullYear(),_.getMonth(),_.getDate()-1);break}case"this_month":{c=new Date(o.getFullYear(),o.getMonth(),1),u=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_month":{c=new Date(o.getFullYear(),o.getMonth()-1,1),u=new Date(o.getFullYear(),o.getMonth(),0);break}case"this_year":{c=new Date(o.getFullYear(),0,1),u=new Date(o.getFullYear(),o.getMonth(),o.getDate());break}case"last_year":{c=new Date(o.getFullYear()-1,0,1),u=new Date(o.getFullYear()-1,11,31);break}case"custom":{c=qe(e)??new Date(o.getFullYear(),o.getMonth(),o.getDate()),u=qe(s)??new Date(c);break}default:{c=new Date(o.getFullYear(),o.getMonth(),o.getDate()-1),u=new Date(c);break}}if(u<c){const p=c;c=u,u=p}let v=0,w=0;const S=new Date(c);for(;S<=u;){const p=new Date(S.getFullYear(),S.getMonth()+1,0).getDate();w+=1/p,v+=1,S.setDate(S.getDate()+1)}const l=c.getFullYear()===u.getFullYear()&&c.getMonth()===u.getMonth()&&c.getDate()===1&&u.getDate()===new Date(u.getFullYear(),u.getMonth()+1,0).getDate(),m=p=>`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}-${String(p.getDate()).padStart(2,"0")}`;return{days:v,factor:w,label:l?"full month":`${v} day${v===1?"":"s"}`,startIso:m(c),endIso:m(u)}}function Cr(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function gs(t){const[e,s]=t.split(":").map(a=>parseInt(a,10)||0);return e*60+s}function Ns(t,e,s,a){if(!Cr(t.getDay(),e))return!1;const r=t.getHours()*60+t.getMinutes(),o=gs(s),n=gs(a);return o===n?!0:o<n?r>=o&&r<n:r>=o||r<n}function Tr(t,e){return e.find(s=>Ns(t,s.day_group,s.start_time,s.end_time))}function Er(t,e){return e.find(s=>Ns(t,s.day_group,s.start_time,s.end_time))}function ys(t,e,s,a,r,o=[]){var l;const n=new Map;let i=0,c=0,u=0,v=0,w=0;const S=new Map;for(const m of o){const p=Number(m.value)||0;S.set(m.startedAt,(S.get(m.startedAt)??0)+p)}for(const m of t){const p=Number(m.value)||0,b=p*.25,_=S.get(m.startedAt)??0,x=Math.max(0,p-_),C=new Date(m.startedAt);if(Number.isNaN(C.getTime()))continue;const M=Tr(C,a),d=Er(C,r),f=(M==null?void 0:M.rate)??e,g=((l=M==null?void 0:M.label)==null?void 0:l.trim())||"Base tariff",y=(d==null?void 0:d.reference_power_kw)??s;i+=b*f,w=Math.max(w,p),v=Math.max(v,x),p>y&&(u+=(p-y)*.25),x>y&&(c+=(x-y)*.25);const k=`${g}__${f}`,E=n.get(k);E?E.kwh+=b:n.set(k,{label:g,rate:f,kwh:b})}return{energyCost:i,exceedanceKwh:c,grossExceedanceKwh:u,avoidedExceedanceKwh:Math.max(0,u-c),peakPowerKw:v,grossPeakPowerKw:w,rateBreakdown:Array.from(n.values()).sort((m,p)=>m.label.localeCompare(p.label))}}function Dr(t){var Qt,es,ts,ss;const e=t.config,s=t.rangeData;if(!e||!s)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const a=s.consumption||0,r=s.production||0,o=s.exported||0,n=Math.max(0,o),i=s.grid_import,c=(s.solar_to_home??s.direct_solar_to_home??s.self_consumed??r)>0,u=i!=null&&!(i<=0&&a>0&&!c),v=Math.max(0,(u?a-i:void 0)??s.solar_to_home??s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:r-n)),w=Math.min(v,Math.max(0,s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:r-n))),S=Math.max(0,v-w),l=Math.max(0,i!=null&&!(i<=0&&a>0&&v<=0)?i:a-v),m=s.peak_power_kw||0,p=e.reference_power_kw||5,b=s.exceedance_kwh||0,_=s.gas_energy||0,x=s.gas_volume||0,C=_>0||x>0,M=e.consumption_rate_windows??[],d=e.reference_power_windows??[],f=t.consumptionTimeseries?ys(t.consumptionTimeseries.items,e.energy_variable_rate,p,M,d,((Qt=t.productionTimeseries)==null?void 0:Qt.items)??[]):null,g=M.length>0&&!!f&&Math.abs(l-a)<.01,y=d.length>0&&!!f,k=f?f.peakPowerKw:m,E=f?f.exceedanceKwh:b,{days:L,factor:W,label:D,startIso:R,endIso:B}=Mr(t.range,t.customStart,t.customEnd,s.start,s.end),O=e.energy_fixed_fee*W,z=e.network_metering_rate*W,se=e.network_power_ref_rate*W,pe=g?f.energyCost:l*e.energy_variable_rate,ie=l*e.network_variable_rate,ae=E*e.exceedance_rate,le=e.meter_monthly_fees??[],G=l*e.compensation_fund_rate,I=l*e.electricity_tax_rate,X=Math.max(0,e.domiciliation_discount??0)*W,Z=Math.max(0,e.connect_discount??0)*W,he=g?f.rateBreakdown.map($=>$.kwh*$.rate):[pe],Ke=le.map($=>($.fee||0)*W),Re=[...he,O,z,se,ie,ae,...Ke,G,I,-X,-Z],ye=j(Re.reduce(($,H)=>$+j(H),0)),J=Sr({adjustments:e.billing_adjustments,vatRate:e.vat_rate,gasVatRate:e.gas_vat_rate??.08,periodStart:R,periodEnd:B,consumptionItems:((es=t.consumptionTimeseries)==null?void 0:es.items)??null,productionItems:((ts=t.productionTimeseries)==null?void 0:ts.items)??null,fallbackGridImportKwh:l,fallbackSelfConsumedKwh:v,gasVolumeM3:x,gasEnergyKwh:_}),ve=J.electricity.lines,A=J.gas.lines,ke=ve.some($=>$.applied&&Math.abs($.total_gross)>1e-9),st=A.some($=>$.applied&&Math.abs($.total_gross)>1e-9),at=J.electricity.applied_net,Ys=J.gas.applied_net,Kt=J.estimated,rt=ye,nt=j(ye-j(at)),Rt=j(nt*e.vat_rate),Se=j(nt+Rt),fe=Lt(e),U=Ft(e,t.consumptionTimeseries,((ss=t.perMeterProductionTimeseries)==null?void 0:ss.meters)??null,w,n),ot=fe.filter($=>isFinite($.rate)&&$.rate>0),Q=fe.length>1,Ae=U?U.weightedExportRate:ot.length>0?ot.reduce(($,H)=>$+H.rate,0)/ot.length:e.feed_in_tariff,re=U?U.totalFeedInRevenue:n*Ae,At=Q&&fe.length>0?n/fe.length:n,it=U?U.meters:fe.map($=>({...$,producedKwh:0,exportedKwh:At,revenue:At*$.rate,selfConsumedKwh:0,exportEquivalentForSelfUse:0})),Me=!!U,Vt=(U==null?void 0:U.allocationMode)??"prorata",ee=U?U.meters.reduce(($,H)=>$+H.selfConsumedKwh,0):w,It=e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate,zs=It*(1+e.vat_rate),Ht=ee*It,jt=Ht*e.vat_rate,lt=J.electricity.solar_correction_gross,we=Ht+jt-lt,Xs=U?U.totalSelfUseExportEquivalent:ee*Ae,Nt=we-Xs,Ce=Math.max(0,(f==null?void 0:f.avoidedExceedanceKwh)??0),ct=Ce*e.exceedance_rate,Gt=ct*e.vat_rate,Te=ct+Gt,Ve=Ce>1e-4,Ie=we+Te+re,dt=it.map($=>{const H=$.selfConsumedKwh*zs,K=H-$.exportEquivalentForSelfUse;return{...$,selfUseSavings:H,selfUseVsExport:K,totalTrackedValue:H+$.revenue}}),Zs=Me&&dt.length>0,He=Se-re,Ot=(e.gas_fixed_fee??6.5)*W,Ut=_*(e.gas_variable_rate??.055),qt=(e.gas_network_fee??4.8)*W,Bt=_*(e.gas_network_variable_rate??.012),Yt=_*(e.gas_tax_rate??.001),zt=j([Ot,Ut,qt,Bt,Yt].reduce(($,H)=>$+j(H),0)),ut=zt,pt=j(zt-j(Ys)),Xt=j(pt*(e.gas_vat_rate??.08)),ht=j(pt+Xt),P=e.currency||"EUR",T=$=>`${h($,2)} ${P}`,mt=$=>`${$>0?"+":$<0?"-":""}${h(Math.abs($),2)} ${P}`,F=$=>h($,3),gt=$=>h($,3),Js=$=>$>=0?"comparison-delta-savings":"comparison-delta-extra",Zt=($,H)=>$.map(K=>{const me=K.unit==="kWh"?`${F(K.quantity)} kWh`:`${gt(K.quantity)} m³`,Ee=K.estimated?' <span class="muted">(estimated)</span>':"",Ne=K.vat_included?K.total_gross:K.total_gross*(1+H);return K.applied?`
            <tr class="revenue-row">
              <td>${K.label}${Ee}${K.eligibility_note?`<br/><span class="muted" style="font-size: var(--text-xs);">${K.eligibility_note}</span>`:""}</td>
              <td style="text-align: right;">${me} × ${h(K.amount_gross,4)} ${P}/${K.unit}${K.vat_included?" incl. VAT":" excl. VAT"}<br/>= −${T(Ne)}${K.vat_included?" incl. VAT":""}</td>
              <td class="revenue-amount" style="text-align: right;">−${T(K.total_net)}</td>
            </tr>
          `:`
            <tr class="revenue-row">
              <td>${K.label}${Ee}<br/><span class="muted" style="font-size: var(--text-xs);">Already reflected in your configured tariff — not deducted again</span></td>
              <td style="text-align: right;">${me} × ${h(K.amount_gross,4)} ${P}/${K.unit}</td>
              <td style="text-align: right;"><span class="muted">in tariff</span></td>
            </tr>
          `}).join(""),Qs=Zt(ve,e.vat_rate),ea=Zt(A,e.gas_vat_rate??.08),Jt=j(rt+j(rt*e.vat_rate)),ta=ve.length>0,sa=A.length>0,aa=Zs?`
            <tr class="section-label"><td colspan="3">Per-System Self-Use vs Export</td></tr>
            ${dt.map($=>`
            <tr>
              <td>${$.displayName}</td>
              <td style="text-align: right;">
                ${$.shortId}<br/>
                Produced ${F($.producedKwh)} kWh<br/>
                Kept on-site ${F($.selfConsumedKwh)} kWh<br/>
                Sold ${F($.exportedKwh)} kWh<br/>
                ${$.label} ${h($.rate,4)} ${P}/kWh${Q?`<br/>${Ye($.selfUsePriority)}`:""}
              </td>
              <td style="text-align: right;">
                <strong>${T($.totalTrackedValue)}</strong><br/>
                <span class="${Js($.selfUseVsExport)}">${mt($.selfUseVsExport)}</span> self-use vs export<br/>
                <span class="muted">${T($.selfUseSavings)} kept value + ${T($.revenue)} sold</span>
              </td>
            </tr>
            `).join("")}
            <tr class="subtotal-row">
              <td colspan="2"><strong>Tracked per-system value</strong></td>
              <td style="text-align: right;"><strong>${T(dt.reduce(($,H)=>$+H.totalTrackedValue,0))}</strong></td>
            </tr>
      `:"",ra=Me?`Compared with exporting the same ${F(ee)} kWh using ${Vt==="prorata"?"a pro-rata split across the PV systems":"the configured PV self-use priority"} and each system's own feed-in tariff`:`Compared with selling the same ${F(ee)} kWh at ${h(Ae,4)} ${P}/kWh`,yt=ms.find($=>Math.abs($.kw-p)<.05),na=ye-j(se)-j(ae),vt=f?ms.map($=>{var as;const H=ys(t.consumptionTimeseries.items,e.energy_variable_rate,$.kw,M,d,((as=t.productionTimeseries)==null?void 0:as.items)??[]),K=$.fixedMonthlyFee*W,me=H.exceedanceKwh*e.exceedance_rate,Ee=j(na+j(K)+j(me)),Ne=j(Ee+j(Ee*e.vat_rate));return{...$,fixedCharge:K,exceedanceKwh:H.exceedanceKwh,exceedanceCharge:me,total:Ne,deltaVsCurrent:Ne-Se}}):[],je=vt.reduce(($,H)=>!$||H.total<$.total?H:$,null),oa=$=>Math.abs($)<.005?"Current total":`${$>0?"+":"-"}${T(Math.abs($))}`,ft=s.start&&s.end?`${ce(s.start)} — ${ce(s.end)}`:t.range.replace("_"," ").replace(/\b\w/g,$=>$.toUpperCase()),ia=E>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${h(k,1)} kW</strong> &mdash; ${y?"Reference power windows active":`Reference power level: ${h(p,1)} kW`}</p>
        <p>Exceedance volume: <strong>${F(E)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${T(ae)}</p>
      </div>`:"",la=g?f.rateBreakdown.map($=>`
            <tr>
              <td>${$.label} (${F($.kwh)} kWh)</td>
              <td style="text-align: right;">${h($.rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${T($.kwh*$.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Supplier rate (${F(l)} kWh bought from grid)</td>
              <td style="text-align: right;">${h(e.energy_variable_rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${T(pe)}</td>
            </tr>
          `,ca=y?`Reference power windows active (${d.length})`:`${h(p,1)} kW`,da=g?`Time-of-use windows active (${M.length})`:`${h(e.energy_variable_rate,4)} ${P}/kWh`,ua=vt.map($=>{const H=!!je&&$.kw===je.kw,K=!!yt&&$.kw===yt.kw,me=$.deltaVsCurrent<-.005?"comparison-delta-savings":$.deltaVsCurrent>.005?"comparison-delta-extra":"";return`
            <tr class="${H?"reference-power-best-row":""}${K?" reference-power-current-row":""}">
              <td>
                <div class="reference-level-cell">
                  <span class="reference-level-kw">${h($.kw,0)} kW</span>
                  ${H?'<span class="reference-level-badge best">Financially optimal</span>':""}
                  ${K?'<span class="reference-level-badge current">Current</span>':""}
                  ${$.existingContractsOnly?'<span class="reference-level-badge legacy">Existing contracts</span>':""}
                </div>
              </td>
              <td style="text-align: right;">${T($.fixedCharge)}</td>
              <td style="text-align: right;">${T($.exceedanceCharge)}</td>
              <td style="text-align: right;"><strong>${T($.total)}</strong></td>
              <td class="${me}" style="text-align: right;">${oa($.deltaVsCurrent)}</td>
            </tr>
          `}).join(""),pa=vt.length>0?`
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${y?"Configured reference power windows stay active in this comparison.":"One reference power level is applied to the full selected period."}
              ${yt?"":`Your current configuration uses ${h(p,1)} kW, which is outside the standard Creos low-voltage reference power levels.`}
            </p>
          </div>
          ${je?`<div class="reference-power-optimum">
                <span class="reference-level-badge best">Financially optimal: ${h(je.kw,0)} kW</span>
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
    `;return`
    <section class="invoice-view">
      ${Et(t)}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Supplier Bill Estimate &mdash; ${ft}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the selected period. Feed-in revenue and net position are shown separately.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${F(a)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${F(l)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${F(r)} kWh produced</span>
          ${n>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${F(n)} kWh exported</span>`:""}
          ${C?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${F(_)} kWh gas (${gt(x)} m³)</span>`:""}
        </div>
      </div>

      ${ia}

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
              <td style="text-align: right;">${h(e.energy_fixed_fee,2)} ${P}/mo</td>
              <td style="text-align: right;">${T(O)}</td>
            </tr>
            ${la}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${h(e.network_metering_rate,2)} ${P}/mo</td>
              <td style="text-align: right;">${T(z)}</td>
            </tr>
            <tr>
              <td>Reference power level (${ca}) <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${h(e.network_power_ref_rate,2)} ${P}/mo</td>
              <td style="text-align: right;">${T(se)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${F(l)} kWh bought from grid)</td>
              <td style="text-align: right;">${h(e.network_variable_rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${T(ie)}</td>
            </tr>
            <tr class="${E>0?"exceedance-row":""}">
              <td>Exceedance charge (${F(E)} kWh above the reference power level)</td>
              <td style="text-align: right;">${h(e.exceedance_rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${T(ae)}</td>
            </tr>

            ${le.filter($=>$.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${le.filter($=>$.fee>0).map($=>`
            <tr>
              <td>${$.label||"…"+$.meter_id.slice(-8)} <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${h($.fee,2)} ${P}/mo</td>
              <td style="text-align: right;">${T($.fee*W)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${h(e.compensation_fund_rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${T(G)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${h(e.electricity_tax_rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${T(I)}</td>
            </tr>
            ${X>0||Z>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            ${X>0?`
            <tr>
              <td>Domiciliation Discount <span class="muted">(${D})</span></td>
              <td style="text-align: right;">-${h(Math.max(0,e.domiciliation_discount??0),2)} ${P}/mo</td>
              <td style="text-align: right;">-${T(X)}</td>
            </tr>
            `:""}
            ${Z>0?`
            <tr>
              <td>Electronic Invoice Discount <span class="muted">(${D})</span></td>
              <td style="text-align: right;">-${h(Math.max(0,e.connect_discount??0),2)} ${P}/mo</td>
              <td style="text-align: right;">-${T(Z)}</td>
            </tr>
            `:""}
            `:""}

            ${ta?`
            <tr class="section-label"><td colspan="3">Government Aid &amp; Billing Adjustments</td></tr>
            ${Qs}
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
              <td style="text-align: right;">${h(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(Rt)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Supplier Bill Estimate</strong></td>
              <td style="text-align: right;"><strong>${T(Se)}</strong></td>
            </tr>
            ${ke?`
            <tr class="subtotal-row">
              <td colspan="2">Total before billing adjustments (incl. VAT)</td>
              <td style="text-align: right;">${T(Jt)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2">Total after billing adjustments (incl. VAT)</td>
              <td style="text-align: right;">${T(Se)}${Kt?' <span class="muted">(estimated)</span>':""}</td>
            </tr>
            `:""}

            ${r>0?`
            <tr class="section-label revenue-section"><td colspan="3">Solar Value & Feed-in Revenue</td></tr>
            <tr class="revenue-row">
              <td>Solar produced</td>
              <td style="text-align: right;">Total generation during this period</td>
              <td style="text-align: right;">${F(r)} kWh</td>
            </tr>
            <tr class="revenue-row">
              <td>Own solar used at home</td>
              <td style="text-align: right;">${F(ee)} kWh from your own production avoided grid purchases</td>
              <td style="text-align: right;">${T(we)} saved</td>
            </tr>
            ${S>0?`
            <tr class="revenue-row">
              <td>Additional solar received</td>
              <td style="text-align: right;">${F(S)} kWh covered at home from shared/community solar</td>
              <td style="text-align: right;">Informational</td>
            </tr>
            `:""}
            <tr class="revenue-row">
              <td>Export sold</td>
              <td style="text-align: right;">${F(n)} kWh sent to grid</td>
              <td style="text-align: right;">${T(re)} earned</td>
            </tr>
            ${Ve?`
            <tr class="revenue-row">
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${F(Ce)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${T(Te)} saved</td>
            </tr>
            `:""}
            ${n>0?`
            <tr class="section-label"><td colspan="3">Credit Calculation</td></tr>
            ${it.map($=>`
            <tr class="revenue-row">
              <td>Exported (${Q?$.displayName:F($.exportedKwh)+" kWh"})</td>
              <td style="text-align: right;">${Q?`${$.shortId}<br/>`:""}${F($.exportedKwh)} kWh<br/>${$.label}<br/>${h($.rate,4)} ${P}/kWh${Me&&Q?`<br/>${Ye($.selfUsePriority)}`:""}</td>
              <td class="revenue-amount" style="text-align: right;">-${T($.revenue)}</td>
            </tr>
            `).join("")}
            ${Q?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${F(n)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${h(Ae,4)} ${P}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${T(re)}</td>
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
            ${n<=0?`
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total Solar Value</strong></td>
              <td style="text-align: right;"><strong>${T(Ie)}</strong></td>
            </tr>
            `:""}
            `:""}
          </tbody>
        </table>
      </div>

      ${pa}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Supplier bill estimate: ${T(Se)}</strong>${re>0?` Feed-in revenue is shown separately as ${T(re)}, giving a net electricity position of ${T(He)} after export credit.`:""}
          ${ke?` Government aid and billing adjustments reduce this estimate by ${T(J.electricity.applied_gross)} incl. VAT (total before adjustments: ${T(Jt)}).${Kt?" Some adjustment values are estimated from incomplete interval data.":""}`:""}
          <br/>
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${F(l)} kWh), not total home usage.
          Supplier pricing: ${da}.
          Fixed monthly charges are prorated across the viewed period (${L} days, ${D}, equivalent to ${h(W,2)} monthly charges).
          Peak load (${h(k,1)} kW) is compared against ${y?"your configured reference power windows":`your reference power level (${h(p,1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${h(e.exceedance_rate,4)} ${P}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${C?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${ft}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${F(_)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${gt(x)} m³</span>
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
              <td style="text-align: right;">${h(e.gas_fixed_fee??6.5,2)} ${P}/mo</td>
              <td style="text-align: right;">${T(Ot)}</td>
            </tr>
            <tr>
              <td>Energy (${F(_)} kWh)</td>
              <td style="text-align: right;">${h(e.gas_variable_rate??.055,4)} ${P}/kWh</td>
              <td style="text-align: right;">${T(Ut)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${h(e.gas_network_fee??4.8,2)} ${P}/mo</td>
              <td style="text-align: right;">${T(qt)}</td>
            </tr>
            <tr>
              <td>Network Variable (${F(_)} kWh)</td>
              <td style="text-align: right;">${h(e.gas_network_variable_rate??.012,4)} ${P}/kWh</td>
              <td style="text-align: right;">${T(Bt)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${F(_)} kWh)</td>
              <td style="text-align: right;">${h(e.gas_tax_rate??.001,4)} ${P}/kWh</td>
              <td style="text-align: right;">${T(Yt)}</td>
            </tr>

            ${sa?`
            <tr class="section-label"><td colspan="3">Government Aid &amp; Billing Adjustments</td></tr>
            ${ea}
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
              <td style="text-align: right;">${h((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${T(Xt)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${T(ht)}</strong></td>
            </tr>
            ${st?`
            <tr class="subtotal-row">
              <td colspan="2">Gas total before billing adjustments (incl. VAT)</td>
              <td style="text-align: right;">${T(j(ut+j(ut*(e.gas_vat_rate??.08))))}</td>
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

      ${r>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Value &mdash; ${ft}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${T(Ie)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${F(r)} kWh</div>
            <div class="solar-stat-label">Solar produced</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${T(we)}</div>
            <div class="solar-stat-label">Saved by using ${F(ee)} kWh of your own solar at home</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${mt(Nt)}</div>
            <div class="solar-stat-label">Extra value from using it yourself instead of selling it</div>
          </div>
          ${Ve?`
          <div class="solar-stat">
            <div class="solar-stat-value">${T(Te)}</div>
            <div class="solar-stat-label">Saved by staying under the reference power</div>
          </div>
          `:""}
          <div class="solar-stat">
            <div class="solar-stat-value">${T(re)}</div>
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
              <td>Own solar used at home</td>
              <td style="text-align: right;">${F(ee)} kWh from your own production avoided grid purchases</td>
              <td style="text-align: right;">${T(we)} saved</td>
            </tr>
            ${S>0?`
            <tr>
              <td>Additional solar received</td>
              <td style="text-align: right;">${F(S)} kWh covered at home from shared/community solar</td>
              <td style="text-align: right;">Informational</td>
            </tr>
            `:""}
            <tr>
              <td>Extra vs exporting instead</td>
              <td style="text-align: right;">${ra}</td>
              <td style="text-align: right;">${mt(Nt)}</td>
            </tr>
            <tr>
              <td>Export sold</td>
              <td style="text-align: right;">${F(n)} kWh sent to grid</td>
              <td style="text-align: right;">${T(re)} earned</td>
            </tr>
            ${Ve?`
            <tr>
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${F(Ce)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${T(Te)} saved</td>
            </tr>
            `:""}

            ${aa}

            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${F(ee)} kWh)</td>
              <td style="text-align: right;">${h(e.energy_variable_rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${T(ee*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${h(e.network_variable_rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${T(ee*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${h(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${P}/kWh</td>
              <td style="text-align: right;">${T(ee*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${h(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(jt)}</td>
            </tr>
            ${lt>1e-4?`
            <tr>
              <td>Government aid not received on own solar${J.electricity.estimated?' <span class="muted">(estimated)</span>':""}</td>
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
              <td style="text-align: right;">${F(Ce)} kWh above the reference power level</td>
              <td style="text-align: right;">${T(ct)}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${h(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${T(Gt)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Reference Power Savings</strong></td>
              <td style="text-align: right;"><strong>${T(Te)}</strong></td>
            </tr>
            `:""}

            ${n>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${it.map($=>`
            <tr>
              <td>Sold to grid ${Q?`(${$.displayName})`:`(${F($.exportedKwh)} kWh)`}</td>
              <td style="text-align: right;">${Q?`${$.shortId}<br/>`:""}${F($.exportedKwh)} kWh<br/>${$.label}<br/>${h($.rate,4)} ${P}/kWh${Me&&Q?`<br/>${Ye($.selfUsePriority)}`:""}</td>
              <td style="text-align: right;">${T($.revenue)}</td>
            </tr>
            `).join("")}
            ${Q?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${T(re)}</strong></td>
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
          ${fe.some($=>$.mode==="sensor")?"Market price sourced from Home Assistant sensor.":"Using fixed feed-in tariff — configure a market price sensor in Settings for real-time rates."}
          ${Me?Ws(Vt):Q?"Displayed per-meter feed-in kWh are currently equal-split estimates because per-meter production data was not available for this view.":""}
        </p>
      </div>
      `:""}
    </section>
  `}const Lr=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],Fr=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Reference Power Fixed Charge",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"domiciliation_discount",label:"Domiciliation Discount",step:"0.01",unit:"EUR/mo",type:"number"},{key:"connect_discount",label:"Electronic Invoice Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"Government Aid & Billing Adjustments",icon:"🏛️",fields:[]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],tt=new Set;let vs=!1;function fs(t,e){e?tt.add(t):tt.delete(t)}function Wr(t,e){return vs||(vs=!0,e.forEach(s=>tt.add(s))),tt.has(t)}const Pr=["consumption","production","solar_consumption","export","export_consumption","gas"],Gs={consumption:"Consumption",production:"Solar production",solar_consumption:"Solar production (consumption-metered)",export:"Grid export",export_consumption:"Grid export (consumption-metered)",gas:"Gas"},Os={consumption:"⚡",production:"☀️",solar_consumption:"☀️",export:"",export_consumption:"",gas:"🔥"},Kr={consumption:"House/grid import meter",production:"PV generation, including energy that may be self-consumed",solar_consumption:"Solar production measured as consumption",export:"Export-only meter for energy sold/sent to the grid",export_consumption:"Grid export measured on the consumption register (active consumption OBIS)",gas:"Gas consumption meter"};function Rr(t){return t.map(e=>{const s=Os[e],a=Gs[e]??e;return`<span class="meter-type-badge meter-type-${e}">${s?`${s} `:""}${a}</span>`}).join(" ")}function Ar(t,e,s){return`
          <label class="meter-type-cb">
            <input type="checkbox" name="meter_${t}_${e}" ${s.types.includes(e)?"checked":""} />
            <span class="meter-type-copy">
              <strong>${Gs[e]??e}</strong>
              <small>${Kr[e]??""}</small>
            </span>
          </label>
  `}function ws(t,e,s){const a=t+1;return s?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${a}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${Rr(e.types)}</div>
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
          ${Pr.map(r=>Ar(t,r,e)).join("")}
        </div>
      </div>
    </div>
  `}function Us(t){return Lr.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function Vr(t,e){return`
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
            ${Us(e.day_group??"all")}
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
  `}function Ir(t,e){return`
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
            ${Us(e.day_group??"all")}
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
  `}function Hr(t,e){const s=!!e.preset_id,r=e.preset_id===As&&e.enabled&&!e.tariff_already_includes_adjustment;return`
    <div class="meter-card">
      <div class="meter-header">
        <strong>${e.label||`Adjustment ${t+1}`}</strong>
        ${s?'<span class="meter-type-badge meter-type-production">Official preset</span>':""}
        <button type="button" class="btn-icon remove-adjustment-btn" data-adjustment="${t}" title="Remove adjustment">&times;</button>
      </div>
      <input type="hidden" name="adjustment_${t}_id" value="${e.id}" />
      <input type="hidden" name="adjustment_${t}_preset_id" value="${e.preset_id??""}" />
      ${r?`
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
  `}function jr(t,e="ha",s){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const a=e==="standalone"?(s==null?void 0:s.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let r="";if(e==="standalone"){const y=a.map((E,L)=>ws(L,E,!1)).join("");s==null||s.proxy_url,r=`
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
              ${y}
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
    `}else{const y=(t==null?void 0:t.meters)??[];r=`
      <div class="card" style="margin-bottom: var(--sp-6); padding: var(--sp-4) var(--sp-5);">
        <p class="muted" style="margin: 0 0 var(--sp-3) 0;">🔒 API credentials are managed through Home Assistant &rarr; Settings &rarr; Integrations &rarr; Leneda</p>
        <div class="form-section">
          <div class="form-section-title">📊  Configured Metering Points</div>
          <div id="meters-container">
            ${y.length>0?y.map((E,L)=>ws(L,E,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const o=y=>y.map(k=>{const E=t?t[k.key]??"":"";return`
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
      `}).join(""),n=((t==null?void 0:t.meters)??[]).filter(y=>y.types.includes("production")||y.types.includes("solar_consumption")),i=(t==null?void 0:t.feed_in_rates)??[],c=e==="ha";function u(y){return i.find(k=>k.meter_id===y)??{meter_id:y,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:"",display_name:"",self_use_priority:null}}const v=n.length===0?'<p class="muted">No solar production meters configured — add a meter with Solar production above.</p>':n.map((y,k)=>{const E=u(y.id),L=y.id?"…"+y.id.slice(-8):`Meter ${k+1}`,W=St(y.id,k+1,E.display_name);return`
          <div class="feed-in-meter-card" data-meter-idx="${k}" data-meter-id="${y.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${W}</span>
              <code style="font-size: var(--text-sm);">${L}</code>
              <input type="hidden" name="feed_in_rate_${k}_meter_id" value="${y.id}" />
            </div>
            <div class="form-row">
              <label for="cfg-feed_in_rate_${k}_display_name">System Name</label>
              <div class="input-group">
                <input
                  id="cfg-feed_in_rate_${k}_display_name"
                  name="feed_in_rate_${k}_display_name"
                  type="text"
                  value="${E.display_name??""}"
                  placeholder="${St(y.id,k+1)}"
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
                    placeholder="${c?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${c&&k===0?'<datalist id="ha-entity-list"></datalist>':""}
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
        `}).join(""),w=((t==null?void 0:t.meters)??[]).some(y=>y.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),S=(t==null?void 0:t.consumption_rate_windows)??[],l=(t==null?void 0:t.reference_power_windows)??[],m=(t==null?void 0:t.meters)??[],p=(t==null?void 0:t.meter_monthly_fees)??[];function b(y){return p.find(k=>k.meter_id===y)??{meter_id:y,label:"",fee:0}}const _=m.length===0?'<p class="muted">No meters configured.</p>':m.map((y,k)=>{const E=b(y.id),L=y.id?"…"+y.id.slice(-8):`Meter ${k+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${y.types.map(D=>Os[D]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${L}</code>
              <input type="hidden" name="meter_fee_${k}_meter_id" value="${y.id}" />
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
        `}).join(""),x=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional supplier-rate windows. Outside these windows, the base <strong>Energy Supplier → Variable Rate</strong> is used.
      Windows can cross midnight by setting an end time earlier than the start time.
    </p>
    <div id="consumption-windows-container">
      ${S.length>0?S.map((y,k)=>Vr(k,y)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,C=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${l.length>0?l.map((y,k)=>Ir(k,y)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,M=Hs(t==null?void 0:t.billing_adjustments),d=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Dated per-unit subsidies, rebates, supplier credits or temporary taxes. Amounts are deducted as separate invoice
      lines &mdash; your tariff prices are never modified. Date ranges are inclusive (Europe/Luxembourg).
      Overlapping adjustments stack. If your configured tariff already includes an adjustment, tick
      <strong>My entered tariff already includes this adjustment</strong> to avoid double-counting.
    </p>
    <div id="adjustments-container">
      ${M.length>0?M.map((y,k)=>Hr(k,y)).join(""):'<p class="muted">No billing adjustments configured.</p>'}
    </div>
    <div style="display: flex; gap: var(--sp-3); flex-wrap: wrap; margin-top: var(--sp-3);">
      <button type="button" id="add-adjustment-btn" class="btn btn-outline">
        + Add Custom Adjustment
      </button>
      <button type="button" id="restore-adjustment-presets-btn" class="btn btn-outline">
        Restore Official Presets
      </button>
    </div>
  `,f=new Set(["Energy Supplier","Network Operator"]),g=Fr.map(y=>{if(y.title==="Gas Billing"&&!w||y.title==="Meter Fees"&&m.length<2)return"";let k;return y.title==="Feed-in / Selling"?k=v:y.title==="Time-of-Use Tariffs"?k=x:y.title==="Reference Power Windows"?k=C:y.title==="Government Aid & Billing Adjustments"?k=d:y.title==="Discounts"?k=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as monthly credits. The dashboard prorates them to the selected period and subtracts them before VAT.
      </p>`+o(y.fields):y.title==="Meter Fees"?k=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+_:k=o(y.fields),`
    <details class="form-section" data-section="${y.title}" ${Wr(y.title,f)?"open":""}>
      <summary class="form-section-title">${y.icon}  ${y.title}</summary>
      ${k}
    </details>
  `}).join("");return`
    <section class="settings-view">
      ${r}

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
          ${t?g:'<p class="muted">Loading configuration…</p>'}
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
  `}function $t(t,e,s=!1,a="dark",r=""){const o=l=>`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${l}
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
  `),c=o(`
    <path d="M4 19H20" />
    <path d="M7 19V11" />
    <path d="M12 19V7" />
    <path d="M17 19V4" />
  `),u=o(`
    <path d="M7 4H17V20L15 18.5L13 20L11 18.5L9 20L7 18.5L5 20V6A2 2 0 0 1 7 4Z" />
    <path d="M9 9H15" />
    <path d="M9 13H15" />
  `),v=o(`
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
      `),S=[{id:"dashboard",label:"Dashboard",icon:i},{id:"charts",label:"Charts",icon:n},{id:"invoice",label:"Invoice",icon:u},{id:"sensors",label:"Sensors",icon:c},{id:"settings",label:"Settings",icon:v}];return`
    <header class="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-brand">
        <img src="/leneda-panel/static/logo.png" srcset="/leneda-panel/static/logo@2x.png 2x" alt="Leneda Logo" class="navbar-logo-img" />
        ${r?`<span class="navbar-badge" title="Where this dashboard gets its data">${r}</span>`:""}
        <span class="navbar-version" title="Dashboard version">v2.17.1</span>

        <button class="menu-toggle ${s?"open":""}" aria-label="Toggle menu" aria-expanded="${s}">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav class="navbar-tabs ${s?"mobile-open":""}">
        <div class="navbar-tab-group" role="tablist">
          ${S.map(l=>`
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
  `}const qs="leneda_credentials",Bs="leneda_theme";function Nr(){try{const t=localStorage.getItem(qs);if(t)return JSON.parse(t)}catch{}return null}function bt(t){try{localStorage.setItem(qs,JSON.stringify(t))}catch{}}function Gr(){var t;try{const e=localStorage.getItem(Bs);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function Or(t){try{localStorage.setItem(Bs,t)}catch{}}function $s(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const[,s,a,r]=e;return new Date(Number(s),Number(a)-1,Number(r))}function bs(t){const e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${e}-${s}-${a}`}function Le(t){const e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0"),r=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),n=String(t.getSeconds()).padStart(2,"0"),i=String(t.getMilliseconds()).padStart(3,"0"),c=-t.getTimezoneOffset(),u=c>=0?"+":"-",v=String(Math.floor(Math.abs(c)/60)).padStart(2,"0"),w=String(Math.abs(c)%60).padStart(2,"0");return`${e}-${s}-${a}T${r}:${o}:${n}.${i}${u}${v}:${w}`}function _s(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Ur(t,e=new Date){switch(t){case"yesterday":{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const a=new Date(s);return a.setHours(23,59,59,999),{start:s,end:a}}case"this_week":{const s=new Date(e),a=s.getDay()||7;return s.setDate(s.getDate()-a+1),s.setHours(0,0,0,0),{start:s,end:e}}case"last_week":{const s=new Date(e),a=s.getDay()||7,r=new Date(s);r.setDate(s.getDate()-a),r.setHours(23,59,59,999);const o=new Date(r);return o.setDate(r.getDate()-6),o.setHours(0,0,0,0),{start:o,end:r}}case"this_month":return{start:new Date(e.getFullYear(),e.getMonth(),1),end:e};case"last_month":{const s=new Date(e.getFullYear(),e.getMonth()-1,1),a=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s,end:a}}case"this_year":return{start:new Date(e.getFullYear(),0,1),end:e};case"last_year":{const s=new Date(e.getFullYear()-1,0,1),a=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s,end:a}}}}function qr(t,e,s=new Date){const a=$s(t),r=$s(e);if(!a||!r)return null;const o=["yesterday","this_week","last_week","this_month","last_month","this_year","last_year"];for(const n of o){const i=Ur(n,s);if(_s(a,i.start)&&_s(r,i.end))return n}return null}class Br{constructor(e){$e(this,"root");$e(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartViewportStart:null,chartViewportEnd:null,chartUnit:"kwh",chartTimeBucket:"quarter_hour",chartConsumptionView:"grid",analysisHeatmapMetric:"grid",analysisProfileMetric:"house",analysisComparisonMode:"previous",analysisComparison:null,analysisComparisonLoading:!1,rangeData:null,consumptionTimeseries:null,productionTimeseries:null,gridImportTimeseries:null,marketExportTimeseries:null,perMeterProductionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:Gr()});$e(this,"preZoomRange",null);$e(this,"preZoomCustomStart","");$e(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await ks();if(this.state.mode=e.mode,e.mode==="standalone"){const s=Nr();if(s&&(this.state.credentials=s),!e.configured&&!s){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&s)try{const{saveCredentials:a}=await ne(async()=>{const{saveCredentials:r}=await Promise.resolve().then(()=>ge);return{saveCredentials:r}},void 0);await a(s)}catch{}if(!s)try{this.state.credentials=await Ss()}catch{}}await this.loadData()}toDisplayError(e,s="Failed to load data"){const a=e instanceof Error?e.message:String(e??"").trim(),r=a.toLowerCase();return r.includes("missing data")||r.includes("no_data")||r.includes("no data")?"Missing data":a||s}clearRangeStateWithError(e,s="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.state.gridImportTimeseries=null,this.state.marketExportTimeseries=null,this.state.perMeterProductionTimeseries=null,this.clearChartViewport(),this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1,this.state.error=this.toDisplayError(e,s)}async fetchPerMeterProductionForRange(e,s,a){var o;if(((e==null?void 0:e.meters)??[]).filter(n=>n.types.includes("production")||n.types.includes("solar_consumption")).length<=1)return null;try{const n=await _t("1-1:2.29.0",s,a);return(o=n.meters)!=null&&o.length?n:null}catch(n){return console.warn("Per-meter production fetch failed:",n),null}}async fetchEnergyFlowTimeseries(e,s){const[a,r,o,n]=await Promise.all([Fe("1-1:1.29.0",e,s),Fe("1-1:2.29.0",e,s),Fe("1-65:1.29.9",e,s),Fe("1-65:2.29.9",e,s)]);return{consumptionTimeseries:a,productionTimeseries:r,gridImportTimeseries:o,marketExportTimeseries:n}}resetAnalysisComparison(){this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1}clearChartViewport(){this.state.chartViewportStart=null,this.state.chartViewportEnd=null}normalizeChartTimeBucket(){const{start:e,end:s}=this.getDateRangeISO(),a=Ca(kt(e,s),this.state.chartTimeBucket);a!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=a)}getCurrentRangeKey(){const{start:e,end:s}=this.getDateRangeISO();return`${e}|${s}`}shiftIsoByYears(e,s){const a=new Date(e);if(!Number.isFinite(a.getTime()))return e;const r=new Date(a);return r.setUTCFullYear(r.getUTCFullYear()+s),r.toISOString()}getComparisonRangeISO(e,s,a){if(a==="last_year")return{start:this.shiftIsoByYears(e,-1),end:this.shiftIsoByYears(s,-1)};const r=new Date(e).getTime(),o=new Date(s).getTime(),n=Math.max(0,o-r),i=r-1,c=i-n;return{start:new Date(c).toISOString(),end:new Date(i).toISOString()}}async loadAnalysisComparison(e=!1){var i;if(!this.state.consumptionTimeseries||!this.state.productionTimeseries)return;const{start:s,end:a}=this.getDateRangeISO(),r=this.state.analysisComparisonMode,o=`${s}|${a}|${r}`;if(!e&&(this.state.analysisComparisonLoading||((i=this.state.analysisComparison)==null?void 0:i.key)===o))return;const n=this.getComparisonRangeISO(s,a,r);this.state.analysisComparisonLoading=!0,this.state.tab==="charts"&&this.renderPreserveMainScroll();try{const{consumptionTimeseries:c,productionTimeseries:u,gridImportTimeseries:v,marketExportTimeseries:w}=await this.fetchEnergyFlowTimeseries(n.start,n.end);if(o!==this.getCurrentRangeKey())return;this.state.analysisComparison={key:o,mode:r,start:n.start,end:n.end,consumptionTimeseries:c,productionTimeseries:u,gridImportTimeseries:v,marketExportTimeseries:w}}catch(c){console.warn("Comparison data fetch failed:",c),o===this.getCurrentRangeKey()&&(this.state.analysisComparison=null)}finally{o===this.getCurrentRangeKey()&&(this.state.analysisComparisonLoading=!1,this.state.tab==="charts"&&this.renderPreserveMainScroll())}}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.clearChartViewport(),this.resetAnalysisComparison(),this.render();try{const[e,s,a]=await Promise.all([Be(this.state.range),xt(),We()]),{start:r,end:o}=this.getDateRangeISO(),[n,i]=await Promise.all([this.fetchEnergyFlowTimeseries(r,o),this.fetchPerMeterProductionForRange(a,r,o)]);this.state.rangeData=e,this.state.consumptionTimeseries=n.consumptionTimeseries,this.state.productionTimeseries=n.productionTimeseries,this.state.gridImportTimeseries=n.gridImportTimeseries,this.state.marketExportTimeseries=n.marketExportTimeseries,this.state.perMeterProductionTimeseries=i,this.state.sensors=s,this.state.config=a}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async changeRange(e){if(this.preZoomRange=null,this.clearChartViewport(),this.state.range=e,this.resetAnalysisComparison(),e==="custom"){if(!this.state.customStart||!this.state.customEnd){const s=new Date;s.setDate(s.getDate()-1);const a=new Date(s);a.setDate(a.getDate()-6),this.state.customStart=bs(a),this.state.customEnd=bs(s)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:s,end:a}=this.getDateRangeISO(),[r,o,n]=await Promise.all([Be(e),this.fetchEnergyFlowTimeseries(s,a),this.fetchPerMeterProductionForRange(this.state.config,s,a)]);this.state.rangeData=r,this.state.consumptionTimeseries=o.consumptionTimeseries,this.state.productionTimeseries=o.productionTimeseries,this.state.gridImportTimeseries=o.gridImportTimeseries,this.state.marketExportTimeseries=o.marketExportTimeseries,this.state.perMeterProductionTimeseries=n}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async applyCustomRange(){this.preZoomRange=null,this.clearChartViewport();const{customStart:e,customEnd:s}=this.state;if(!(!e||!s)){this.state.error=null,this.state.loading=!0,this.resetAnalysisComparison(),this.render();try{const a=qr(e,s),r=a?Be(a):ne(async()=>{const{fetchCustomData:w}=await Promise.resolve().then(()=>ge);return{fetchCustomData:w}},void 0).then(({fetchCustomData:w})=>w(e,s)),o=this.state.config,n=Le(new Date(e+"T00:00:00")),i=Le(new Date(s+"T23:59:59.999")),[c,u,v]=await Promise.all([r,this.fetchEnergyFlowTimeseries(n,i),this.fetchPerMeterProductionForRange(o,n,i)]);this.state.rangeData={range:"custom",consumption:c.consumption,production:c.production,exported:c.exported??0,self_consumed:c.self_consumed??0,grid_import:c.grid_import,solar_to_home:c.solar_to_home,direct_solar_to_home:c.direct_solar_to_home,shared:c.shared,shared_with_me:c.shared_with_me,gas_energy:c.gas_energy??0,gas_volume:c.gas_volume??0,peak_power_kw:c.peak_power_kw??0,exceedance_kwh:c.exceedance_kwh??0,metering_point:c.metering_point??"",start:c.start??e,end:c.end??s},this.state.consumptionTimeseries=u.consumptionTimeseries,this.state.productionTimeseries=u.productionTimeseries,this.state.gridImportTimeseries=u.gridImportTimeseries,this.state.marketExportTimeseries=u.marketExportTimeseries,this.state.perMeterProductionTimeseries=v}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}}async shiftChartPeriod(e){const{start:s,end:a}=this.getDateRangeISO(),r=Fs(s,a,this.state.chartTimeBucket,e);r&&await this.handleChartZoomChange(Le(r.start),Le(r.end))}changeTab(e){this.state.tab=e,this.render(),(e==="dashboard"||e==="charts")&&!this.state.rangeData&&!this.state.loading&&this.loadData(),e==="charts"&&this.state.rangeData&&this.loadAnalysisComparison(),e==="sensors"&&!this.state.sensors&&xt().then(s=>{this.state.sensors=s,this.render()}),e==="settings"&&!this.state.config&&We().then(s=>{this.state.config=s,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,Or(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}printInvoice(){var n,i;const e=document.title,a=`Leneda-invoice-${(n=this.state.rangeData)!=null&&n.start&&((i=this.state.rangeData)!=null&&i.end)?`${this.state.rangeData.start.slice(0,10)}_to_${this.state.rangeData.end.slice(0,10)}`:this.state.range}`.replace(/[^a-z0-9_-]+/gi,"-");let r=!1;const o=()=>{r||(r=!0,document.title=e,window.removeEventListener("afterprint",o))};document.title=a,window.addEventListener("afterprint",o,{once:!0}),window.print(),window.setTimeout(o,1e3)}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const s=this.root.querySelector(".main-content");s?s.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}getDataSourceLabel(){return this.state.mode==="ha"?"Home Assistant":"Standalone"}getHostedDataNoticeHtml(){var e;return(((e=this.state.credentials)==null?void 0:e.proxy_url)??"").trim().length>0,""}render(){var c;const{tab:e,loading:s,error:a,theme:r}=this.state,o=this.getDataSourceLabel(),n=this.getHostedDataNoticeHtml();if(s&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${$t(e,u=>{},!1,r,o)}
          <main class="main-content">
            ${n}
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `,this.attachNavListeners();return}if(a&&!this.state.rangeData){const u=a.toLowerCase().includes("missing data");this.root.innerHTML=`
        <div class="app-shell">
          ${$t(e,v=>{},!1,r,o)}
          <main class="main-content">
            ${n}
            <div class="error-state">
              <h2>${u?"Missing Data":"Connection Error"}</h2>
              <p>${u?"The selected period could not be loaded because data is missing.":a}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(c=this.root.querySelector("#retry-btn"))==null||c.addEventListener("click",()=>this.loadData());return}this.state.rangeData&&this.normalizeChartTimeBucket();let i="";switch(e){case"dashboard":i=Da(this.state);break;case"charts":i=pr(this.state);break;case"sensors":i=hr(this.state.sensors);break;case"invoice":i=Dr(this.state);break;case"settings":i=jr(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${$t(e,u=>this.changeTab(u),this.state.isMenuOpen,r,o)}
        <main class="main-content">
          ${n}
          ${s?'<div class="loading-bar"></div>':""}
          ${i}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachAnalysisListeners(),this.attachInvoiceListeners(),this.attachSensorListeners(),this.attachSettingsListeners()}attachSensorListeners(){const e=this.root.querySelector("#sensor-filter");if(!e)return;const s=this.root.querySelector("#sensors-no-match");e.addEventListener("input",()=>{const a=e.value.trim().toLowerCase();let r=0;this.root.querySelectorAll(".sensor-group").forEach(o=>{let n=0;o.querySelectorAll("[data-sensor-search]").forEach(i=>{const c=!a||(i.dataset.sensorSearch??"").includes(a);i.hidden=!c,c&&(n+=1)}),o.hidden=n===0,r+=n}),s&&(s.hidden=r>0)})}attachNavListeners(){var e,s;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(s=this.root.querySelector("[data-theme-toggle]"))==null||s.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.tab;this.changeTab(r)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.range;this.changeRange(i)})});const s=this.root.querySelector("#custom-start"),a=this.root.querySelector("#custom-end");s&&s.addEventListener("change",()=>{this.state.customStart=s.value}),a&&a.addEventListener("change",()=>{this.state.customEnd=a.value});const r=this.root.querySelector("#apply-custom-range");if(r==null||r.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.chartUnit;i!==this.state.chartUnit&&(this.state.chartUnit=i,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-bucket]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.chartBucket,{start:c,end:u}=this.getDateRangeISO();Pe(i,kt(c,u))&&i!==this.state.chartTimeBucket&&(this.state.chartTimeBucket=i,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-period-nav]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.chartPeriodNav==="next"?1:-1;this.shiftChartPeriod(i)})}),this.root.querySelectorAll("[data-chart-view]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.chartView;i!==this.state.chartConsumptionView&&(this.state.chartConsumptionView=i,this.renderPreserveMainScroll())})}),!e){const n=this.root.querySelector("#energy-chart");n&&this.state.rangeData&&this.initChart(n)}const o=this.root.querySelector(".reset-zoom-btn");o==null||o.addEventListener("click",async()=>{const{resetChartZoom:n}=await ne(async()=>{const{resetChartZoom:i}=await import("./Charts-FRFyqDlJ.js");return{resetChartZoom:i}},[]);if(n(),o.style.display="none",this.clearChartViewport(),this.preZoomRange!==null){const i=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",i==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(i)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachAnalysisListeners(){this.root.querySelectorAll("[data-analysis-heatmap]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisHeatmap;s!==this.state.analysisHeatmapMetric&&(this.state.analysisHeatmapMetric=s,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-profile]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisProfile;s!==this.state.analysisProfileMetric&&(this.state.analysisProfileMetric=s,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-analysis-comparison-mode]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.analysisComparisonMode;s!==this.state.analysisComparisonMode&&(this.state.analysisComparisonMode=s,this.state.analysisComparison=null,this.loadAnalysisComparison(!0))})})}attachInvoiceListeners(){var e;(e=this.root.querySelector("#print-invoice-btn"))==null||e.addEventListener("click",()=>{this.printInvoice()})}attachSettingsListeners(){var u,v,w,S;const e=this.root.querySelector("#credentials-form");if(e){const l=this.root.querySelector("#add-meter-btn");l==null||l.addEventListener("click",()=>{var x,C,M;const b=new FormData(e),_=m(b);if(_.length<10){_.push({id:"",types:["consumption"]});const d={api_key:b.get("api_key")||((x=this.state.credentials)==null?void 0:x.api_key)||"",energy_id:b.get("energy_id")||((C=this.state.credentials)==null?void 0:C.energy_id)||"",meters:_,proxy_url:b.get("proxy_url")||((M=this.state.credentials)==null?void 0:M.proxy_url)||""};this.state.credentials=d,bt(d),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach(b=>{b.addEventListener("click",()=>{var d,f,g;const _=parseInt(b.dataset.meter??"0",10),x=new FormData(e),C=m(x);C.splice(_,1);const M={api_key:x.get("api_key")||((d=this.state.credentials)==null?void 0:d.api_key)||"",energy_id:x.get("energy_id")||((f=this.state.credentials)==null?void 0:f.energy_id)||"",meters:C,proxy_url:x.get("proxy_url")||((g=this.state.credentials)==null?void 0:g.proxy_url)||""};this.state.credentials=M,bt(M),this.renderPreserveMainScroll()})});const m=b=>{var x,C,M,d,f,g;const _=[];for(let y=0;y<10;y++){const k=b.get(`meter_${y}_id`);if(k===null)break;const E=[];(x=e.querySelector(`[name="meter_${y}_consumption"]`))!=null&&x.checked&&E.push("consumption"),(C=e.querySelector(`[name="meter_${y}_production"]`))!=null&&C.checked&&E.push("production"),(M=e.querySelector(`[name="meter_${y}_solar_consumption"]`))!=null&&M.checked&&E.push("solar_consumption"),(d=e.querySelector(`[name="meter_${y}_export"]`))!=null&&d.checked&&E.push("export"),(f=e.querySelector(`[name="meter_${y}_export_consumption"]`))!=null&&f.checked&&E.push("export_consumption"),(g=e.querySelector(`[name="meter_${y}_gas"]`))!=null&&g.checked&&E.push("gas"),_.push({id:k.trim(),types:E})}return _};e.addEventListener("submit",async b=>{b.preventDefault();const _=new FormData(e),x={api_key:_.get("api_key"),energy_id:_.get("energy_id"),meters:m(_),proxy_url:_.get("proxy_url")},C=this.root.querySelector("#creds-status");try{bt(x);const{saveCredentials:M}=await ne(async()=>{const{saveCredentials:g}=await Promise.resolve().then(()=>ge);return{saveCredentials:g}},void 0);await M(x),C&&(C.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=x,this.state.error=null;const d=!1,f=(x.proxy_url??"").trim();await this.loadData()}catch(M){C&&(C.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${M instanceof Error?M.message:M}</p>`)}});const p=this.root.querySelector("#test-creds-btn");p==null||p.addEventListener("click",async()=>{const b=new FormData(e),_={api_key:b.get("api_key"),energy_id:b.get("energy_id"),meters:m(b),proxy_url:b.get("proxy_url")},x=this.root.querySelector("#creds-status");x&&(x.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:C}=await ne(async()=>{const{testCredentials:d}=await Promise.resolve().then(()=>ge);return{testCredentials:d}},void 0),M=await C(_);x&&(x.innerHTML=M.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${M.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${M.message}</p>`)}catch(C){x&&(x.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${C instanceof Error?C.message:C}</p>`)}})}const s=this.root.querySelector("#settings-form");if(!s)return;const a=l=>{const m=[];for(let p=0;p<24;p++){const b=l.get(`consumption_window_${p}_label`),_=l.get(`consumption_window_${p}_day_group`),x=l.get(`consumption_window_${p}_start_time`),C=l.get(`consumption_window_${p}_end_time`),M=l.get(`consumption_window_${p}_rate`);if(b===null&&_===null&&x===null&&C===null&&M===null)break;m.push({label:(b??"").trim()||`Window ${p+1}`,day_group:_??"all",start_time:x??"00:00",end_time:C??"06:00",rate:parseFloat(M??"0")||0})}return m},r=l=>{const m=[];for(let p=0;p<24;p++){const b=l.get(`reference_window_${p}_label`),_=l.get(`reference_window_${p}_day_group`),x=l.get(`reference_window_${p}_start_time`),C=l.get(`reference_window_${p}_end_time`),M=l.get(`reference_window_${p}_reference_power_kw`);if(b===null&&_===null&&x===null&&C===null&&M===null)break;m.push({label:(b??"").trim()||`Reference ${p+1}`,day_group:_??"all",start_time:x??"17:00",end_time:C??"00:00",reference_power_kw:parseFloat(M??"0")||0})}return m},o=l=>{var p,b,_;const m=[];for(let x=0;x<50;x++){const C=l.get(`adjustment_${x}_id`);if(C===null)break;const M=l.get(`adjustment_${x}_label`),d=l.get(`adjustment_${x}_commodity`),f=l.get(`adjustment_${x}_basis`),g=l.get(`adjustment_${x}_amount_gross`),y=l.get(`adjustment_${x}_start_date`),k=l.get(`adjustment_${x}_end_date`),E=l.get(`adjustment_${x}_preset_id`),L=l.get(`adjustment_${x}_eligibility_note`);m.push({id:(C??"").trim()||`custom-${x+1}`,label:(M??"").trim()||`Adjustment ${x+1}`,enabled:((p=s.querySelector(`[name="adjustment_${x}_enabled"]`))==null?void 0:p.checked)??!1,commodity:d==="gas"?"gas":"electricity",basis:f==="gas_volume_m3"?"gas_volume_m3":"grid_import_kwh",amount_gross:parseFloat(g??"0")||0,start_date:y??"",end_date:k??"",vat_included:((b=s.querySelector(`[name="adjustment_${x}_vat_included"]`))==null?void 0:b.checked)??!1,preset_id:(E??"").trim(),eligibility_note:(L??"").trim(),tariff_already_includes_adjustment:((_=s.querySelector(`[name="adjustment_${x}_tariff_already_includes_adjustment"]`))==null?void 0:_.checked)??!1})}return m},n=()=>{var d;const l=new FormData(s),m={};s.querySelectorAll('input[type="checkbox"]').forEach(f=>{f.name.startsWith("adjustment_")||(m[f.name]=f.checked)});const p=[],b=/^feed_in_rate_(\d+)_(.+)$/,_={},x=[],C=/^meter_fee_(\d+)_(.+)$/,M={};for(const[f,g]of l.entries()){if(f.startsWith("consumption_window_")||f.startsWith("reference_window_")||f.startsWith("adjustment_"))continue;const y=f.match(b);if(y){const D=y[1],R=y[2];_[D]||(_[D]={}),_[D][R]=g;continue}const k=f.match(C);if(k){const D=k[1],R=k[2];M[D]||(M[D]={}),M[D][R]=g;continue}if(m[f]!==void 0&&typeof m[f]=="boolean")continue;const E=g,L=s.elements.namedItem(f);if(E===""&&L instanceof HTMLInputElement&&L.type==="number"){const D=(d=this.state.config)==null?void 0:d[f];typeof D=="number"&&isFinite(D)&&(m[f]=D);continue}const W=parseFloat(E);m[f]=isNaN(W)?E:W}for(const f of Object.keys(_).sort()){const g=_[f],y=g.mode??"fixed",k=y==="sensor"?g.fallback_tariff??g.tariff:g.tariff,E=(g.self_use_priority??"").trim(),L=parseInt(E,10);p.push({meter_id:g.meter_id??"",mode:y,tariff:parseFloat(k??"0.08")||.08,sensor_entity:g.sensor_entity??"",display_name:(g.display_name??"").trim(),self_use_priority:E===""||!isFinite(L)?null:Math.max(1,L)})}p.length>0&&(m.feed_in_rates=p);for(const f of Object.keys(M).sort()){const g=M[f];x.push({meter_id:g.meter_id??"",label:g.label??"",fee:parseFloat(g.fee??"0")||0})}return x.length>0&&(m.meter_monthly_fees=x),m.consumption_rate_windows=a(l),m.reference_power_windows=r(l),m.billing_adjustments=o(l),m},i=l=>{if(!this.state.config)return;const m=n();l(m),this.state.config={...this.state.config,...m},this.renderPreserveMainScroll()};if((u=this.root.querySelector("#add-consumption-window-btn"))==null||u.addEventListener("click",()=>{i(l=>{var p;const m=Array.isArray(l.consumption_rate_windows)?[...l.consumption_rate_windows]:[];m.push({label:`Window ${m.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((p=this.state.config)==null?void 0:p.energy_variable_rate)??.1125}),l.consumption_rate_windows=m})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(l=>{l.addEventListener("click",()=>{const m=parseInt(l.dataset.window??"0",10);i(p=>{const b=Array.isArray(p.consumption_rate_windows)?[...p.consumption_rate_windows]:[];b.splice(m,1),p.consumption_rate_windows=b})})}),(v=this.root.querySelector("#add-reference-window-btn"))==null||v.addEventListener("click",()=>{i(l=>{var p;const m=Array.isArray(l.reference_power_windows)?[...l.reference_power_windows]:[];m.push({label:`Reference ${m.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((p=this.state.config)==null?void 0:p.reference_power_kw)??5}),l.reference_power_windows=m})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(l=>{l.addEventListener("click",()=>{const m=parseInt(l.dataset.window??"0",10);i(p=>{const b=Array.isArray(p.reference_power_windows)?[...p.reference_power_windows]:[];b.splice(m,1),p.reference_power_windows=b})})}),(w=this.root.querySelector("#add-adjustment-btn"))==null||w.addEventListener("click",()=>{i(l=>{const m=Array.isArray(l.billing_adjustments)?[...l.billing_adjustments]:[];m.push({id:`custom-${Date.now()}`,label:`Adjustment ${m.length+1}`,enabled:!0,commodity:"electricity",basis:"grid_import_kwh",amount_gross:0,start_date:"",end_date:"",vat_included:!0,preset_id:"",eligibility_note:"",tariff_already_includes_adjustment:!1}),l.billing_adjustments=m})}),this.root.querySelectorAll(".remove-adjustment-btn").forEach(l=>{l.addEventListener("click",()=>{const m=parseInt(l.dataset.adjustment??"0",10);i(p=>{const b=Array.isArray(p.billing_adjustments)?[...p.billing_adjustments]:[];b.splice(m,1),p.billing_adjustments=b})})}),(S=this.root.querySelector("#restore-adjustment-presets-btn"))==null||S.addEventListener("click",()=>{i(l=>{const p=(Array.isArray(l.billing_adjustments)?[...l.billing_adjustments]:[]).filter(b=>!b.preset_id);l.billing_adjustments=[...vr(!0),...p]})}),s.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(l=>{l.addEventListener("change",()=>{const m=l.name.match(/feed_in_rate_(\d+)_mode/);if(!m)return;const p=m[1],b=s.querySelector(`.feed-in-fixed-fields[data-rate-idx="${p}"]`),_=s.querySelector(`.feed-in-sensor-fields[data-rate-idx="${p}"]`);b&&(b.style.display=l.value==="fixed"?"":"none"),_&&(_.style.display=l.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const l=this.root.querySelector("#ha-entity-list");l&&Ms().then(({entities:m})=>{l.innerHTML=m.map(p=>`<option value="${p}"></option>`).join("")}).catch(()=>{})}this.root.querySelectorAll("details[data-section]").forEach(l=>{l.addEventListener("toggle",()=>{fs(l.dataset.section??"",l.open)})}),this.root.querySelectorAll("[data-sections-toggle]").forEach(l=>{l.addEventListener("click",()=>{const m=l.dataset.sectionsToggle==="open";this.root.querySelectorAll("details[data-section]").forEach(p=>{p.open=m,fs(p.dataset.section??"",m)})})}),s.addEventListener("submit",async l=>{l.preventDefault();const m=n();this.setSettingsStatus("Saving…","pending");try{const{saveConfig:p}=await ne(async()=>{const{saveConfig:b}=await Promise.resolve().then(()=>ge);return{saveConfig:b}},void 0);await p(m),this.state.config=await We(),this.renderPreserveMainScroll(),this.setSettingsStatus("Configuration saved","ok")}catch(p){this.setSettingsStatus(`Save failed: ${p instanceof Error?p.message:String(p)}`,"error")}});const c=this.root.querySelector("#reset-config-btn");c==null||c.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?")){this.setSettingsStatus("Resetting…","pending");try{const{resetConfig:l}=await ne(async()=>{const{resetConfig:m}=await Promise.resolve().then(()=>ge);return{resetConfig:m}},void 0);await l(),this.state.config=await We(),this.renderPreserveMainScroll(),this.setSettingsStatus("Reset to defaults","ok")}catch(l){this.setSettingsStatus(`Reset failed: ${l instanceof Error?l.message:String(l)}`,"error")}}})}setSettingsStatus(e,s){const a=this.root.querySelector("#settings-status");a&&(a.className=`form-status form-status-${s}`,a.textContent=e,s==="ok"&&window.setTimeout(()=>{a.textContent===e&&(a.textContent="")},4e3))}async initChart(e){var s,a,r,o;try{const{renderEnergyChart:n}=await ne(async()=>{const{renderEnergyChart:x}=await import("./Charts-FRFyqDlJ.js");return{renderEnergyChart:x}},[]),{start:i,end:c}=this.getDateRangeISO(),u=this.state.chartViewportStart?new Date(this.state.chartViewportStart).getTime():void 0,v=this.state.chartViewportEnd?new Date(this.state.chartViewportEnd).getTime():void 0;let w=this.state.consumptionTimeseries,S=this.state.productionTimeseries,l=this.state.gridImportTimeseries,m=this.state.marketExportTimeseries;if(!w||!S||!l||!m){const x=await this.fetchEnergyFlowTimeseries(i,c);w=x.consumptionTimeseries,S=x.productionTimeseries,l=x.gridImportTimeseries,m=x.marketExportTimeseries,this.state.consumptionTimeseries=w,this.state.productionTimeseries=S,this.state.gridImportTimeseries=l,this.state.marketExportTimeseries=m}const p=((s=this.state.config)==null?void 0:s.reference_power_kw)??0,b=(((a=this.state.config)==null?void 0:a.meters)??[]).filter(x=>x.types.includes("production")||x.types.includes("solar_consumption"));let _;if((o=(r=this.state.perMeterProductionTimeseries)==null?void 0:r.meters)!=null&&o.length)_=this.state.perMeterProductionTimeseries.meters;else if(b.length>1)try{const x=await _t("1-1:2.29.0",i,c);x.meters&&x.meters.length>1&&(_=x.meters,this.state.perMeterProductionTimeseries=x)}catch(x){console.warn("Per-meter timeseries fetch failed, using merged view:",x)}n(e,w,S,{unit:this.state.chartUnit,consumptionView:this.state.chartConsumptionView,referencePowerKw:p,gridImportTimeseries:l,marketExportTimeseries:m,perMeterProduction:_,viewportStartMs:u,viewportEndMs:v,timeBucket:this.state.chartTimeBucket,onZoomChange:(x,C)=>{this.handleChartZoomChange(x,C)}})}catch(n){console.error("Chart init failed:",n)}}async handleChartZoomChange(e,s){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd),this.state.error=null,this.state.loading=!0,this.renderPreserveMainScroll();const{fetchCustomData:a}=await ne(async()=>{const{fetchCustomData:u}=await Promise.resolve().then(()=>ge);return{fetchCustomData:u}},void 0),r=e.slice(0,10),o=s.slice(0,10);this.resetAnalysisComparison();const n=await a(e,s),[i,c]=await Promise.all([this.fetchEnergyFlowTimeseries(e,s),this.fetchPerMeterProductionForRange(this.state.config,e,s)]);this.state.range="custom",this.state.customStart=r,this.state.customEnd=o,this.state.chartViewportStart=e,this.state.chartViewportEnd=s,this.state.rangeData={range:"custom",consumption:n.consumption,production:n.production,exported:n.exported??0,self_consumed:n.self_consumed??0,gas_energy:n.gas_energy??0,gas_volume:n.gas_volume??0,grid_import:n.grid_import,solar_to_home:n.solar_to_home,direct_solar_to_home:n.direct_solar_to_home,shared:n.shared,shared_with_me:n.shared_with_me,peak_power_kw:n.peak_power_kw??0,exceedance_kwh:n.exceedance_kwh??0,metering_point:n.metering_point??"",start:n.start,end:n.end},this.state.consumptionTimeseries=i.consumptionTimeseries,this.state.productionTimeseries=i.productionTimeseries,this.state.gridImportTimeseries=i.gridImportTimeseries,this.state.marketExportTimeseries=i.marketExportTimeseries,this.state.perMeterProductionTimeseries=c,this.state.loading=!1,this.renderPreserveMainScroll()}catch(a){console.error("Zoom data fetch failed:",a),this.state.loading=!1,this.clearRangeStateWithError(a,"Missing data"),this.render()}}getDateRangeISO(){if(this.state.chartViewportStart&&this.state.chartViewportEnd)return{start:this.state.chartViewportStart,end:this.state.chartViewportEnd};const e=new Date,s=a=>Le(a);switch(this.state.range){case"custom":{const a=new Date(this.state.customStart+"T00:00:00"),r=new Date(this.state.customEnd+"T23:59:59.999");return{start:s(a),end:s(r)}}case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const r=new Date(a);return r.setHours(23,59,59,999),{start:s(a),end:s(r)}}case"this_week":{const a=new Date(e),r=a.getDay()||7;return a.setDate(a.getDate()-r+1),a.setHours(0,0,0,0),{start:s(a),end:s(e)}}case"last_week":{const a=new Date(e),r=a.getDay()||7,o=new Date(a);o.setDate(a.getDate()-r),o.setHours(23,59,59,999);const n=new Date(o);return n.setDate(o.getDate()-6),n.setHours(0,0,0,0),{start:s(n),end:s(o)}}case"this_month":{const a=new Date(e.getFullYear(),e.getMonth(),1);return{start:s(a),end:s(e)}}case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),r=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s(a),end:s(r)}}case"this_year":{const a=new Date(e.getFullYear(),0,1);return{start:s(a),end:s(e)}}case"last_year":{const a=new Date(e.getFullYear()-1,0,1),r=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s(a),end:s(r)}}default:{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const r=new Date(a);return r.setHours(23,59,59,999),{start:s(a),end:s(r)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new Br(t).mount()}export{Fa as b};
