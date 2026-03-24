var Ye=Object.defineProperty;var ze=(t,e,s)=>e in t?Ye(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var U=(t,e,s)=>ze(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const Ze="modulepreload",Be=function(t){return"/leneda-panel/static/"+t},xe={},A=function(e,s,a){let r=Promise.resolve();if(s&&s.length>0){let n=function(v){return Promise.all(v.map(l=>Promise.resolve(l).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=(u==null?void 0:u.nonce)||(u==null?void 0:u.getAttribute("nonce"));r=n(s.map(v=>{if(v=Be(v),v in xe)return;xe[v]=!0;const l=v.endsWith(".css"),m=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${v}"]${m}`))return;const i=document.createElement("link");if(i.rel=l?"stylesheet":Ze,l||(i.as="script"),i.crossOrigin="",i.href=v,p&&i.setAttribute("nonce",p),document.head.appendChild(i),l)return new Promise((f,h)=>{i.addEventListener("load",f),i.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${v}`)))})}))}function o(n){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=n,window.dispatchEvent(u),!u.defaultPrevented)throw n}return r.then(n=>{for(const u of n||[])u.status==="rejected"&&o(u.reason);return e().catch(o)})};function De(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()}))}}function Ke(){var t,e,s,a,r;try{const o=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((r=(a=(s=o==null?void 0:o.hass)==null?void 0:s.auth)==null?void 0:a.data)==null?void 0:r.access_token)??null}catch{return null}}async function R(t,e){const s=Ke(),a={...e==null?void 0:e.headers,...s?{Authorization:`Bearer ${s}`}:{}},r={...e,credentials:"include",headers:a},o=await fetch(t,r);if(!o.ok){const n=o.headers.get("content-type")??"";let u="",p="";if(n.includes("application/json")){const v=await o.json().catch(()=>null);u=String((v==null?void 0:v.error)??"").trim(),p=String((v==null?void 0:v.message)??(v==null?void 0:v.error)??"").trim()}else p=(await o.text().catch(()=>"")).trim();throw u==="missing_data"||u==="no_data"||o.status===503?new Error("Missing data"):new Error(p?`API ${o.status}: ${p}`:`API ${o.status}: ${o.statusText}`)}return o.json()}async function oe(t){return R(`/leneda_api/data?range=${t}`)}async function Je(t,e){return R(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function G(t,e,s){let a=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),R(a)}async function Qe(t,e,s){let a=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),R(a)}async function ie(){return R("/leneda_api/sensors")}async function X(){return R("/leneda_api/config")}async function et(t){await R("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function tt(){await R("/leneda_api/config/reset",{method:"POST"})}async function We(){try{return await R("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function Re(){return R("/leneda_api/credentials")}async function st(t){const e=De(t);await R("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function at(t){const e=De(t);return R("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Le(){return R("/leneda_api/ha-entities")}const O=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:X,fetchCredentials:Re,fetchCustomData:Je,fetchHAEntities:Le,fetchMode:We,fetchPerMeterTimeseries:Qe,fetchRangeData:oe,fetchSensors:ie,fetchTimeseries:G,resetConfig:tt,saveConfig:et,saveCredentials:st,testCredentials:at},Symbol.toStringTag,{value:"Module"}));function d(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function N(t){return new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function rt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}const Se=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function Te(t){var I;const e=t.rangeData,s=C=>{if(!C)return"";const D=C.match(/^(\d{4}-\d{2}-\d{2})/);return D?D[1]:""},a=(e==null?void 0:e.consumption)??0,r=(e==null?void 0:e.production)??0,o=(e==null?void 0:e.exported)??0,n=(e==null?void 0:e.self_consumed)??0,u=(e==null?void 0:e.gas_energy)??0,p=(e==null?void 0:e.gas_volume)??0,v=(e==null?void 0:e.peak_power_kw)??0,l=s(e==null?void 0:e.start),m=s(e==null?void 0:e.end),i=(e==null?void 0:e.shared_with_me)??0,f=(e==null?void 0:e.shared)??0,h=Math.max(0,o),y=Math.max(0,(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(n>0?n:r-h)),b=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??y),_=y,k=Math.max(0,(e==null?void 0:e.grid_import)??a-y),$=a>0?a:k+y,T=$>0?Math.min(100,y/$*100):0,g=Math.max(r,k,h,f,i,b,1),c=(C,D=3,P=11)=>(C>0?D+C/g*(P-D):2).toFixed(1),x=(C,D=.22,P=.94)=>(C>0?D+C/g*(P-D):.12).toFixed(2),E=(C,D=1.35,P=3.2)=>`${(C>0?Math.max(D,P-C/g*(P-D)):P).toFixed(2)}s`,L=(C,D=4,P=7.5)=>(C>0?D+C/g*(P-D):3.5).toFixed(1),W=e!=null&&e.start&&(e!=null&&e.end)?`${N(e.start)} — ${N(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${N(t.customStart+"T00:00:00")} — ${N(t.customEnd+"T00:00:00")}`:((I=Se.find(C=>C.id===t.range))==null?void 0:I.label)??"Yesterday";return`
    <div class="dashboard" style="position: relative;">
      <div style="position:fixed;bottom:4px;right:4px;font-size:10px;opacity:0.5;pointer-events:none;z-index:9999;">v:2.1.0</div>

      <!-- Range Selector -->
      <div class="range-selector">
        ${Se.map(C=>`
          <button
            class="range-btn ${C.id===t.range?"active":""}"
            data-range="${C.id}"
          >${C.label}</button>
        `).join("")}
      </div>

      ${(()=>{if(!(e!=null&&e.start)||!(e!=null&&e.end))return"";try{const C=new Date(e.start),D=new Date(e.end);return isNaN(C.getTime())||isNaN(D.getTime())?"":`
            <div class="range-info-bar">
              📅 ${C.toLocaleDateString()} — ${D.toLocaleDateString()}
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
      `:l&&m?`
      <!-- Preset Period Preview -->
      <div class="custom-range-picker period-preview">
        <span class="period-preview-label">Viewed period</span>
        <label>
          <span>From</span>
          <input type="date" value="${l}" readonly aria-label="Preset period start" />
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
            <div class="stat-value">${d(a)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.production">
          <div class="stat-icon">☀️</div>
          <div class="stat-body">
            <div class="stat-label">Production</div>
            <div class="stat-value">${d(r)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.export">
          <div class="stat-icon">📤</div>
          <div class="stat-body">
            <div class="stat-label">Exported</div>
            <div class="stat-value">${d(o)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.self-consumed">
          <div class="stat-icon">🏠</div>
          <div class="stat-body">
            <div class="stat-label">Self-Consumed</div>
            <div class="stat-value">${d(_)} <span class="stat-unit">kWh</span></div>
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
                    <span class="module-value highlight-red">${d(a)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg red"></div></div>
              </div>

              <div class="glass-module production-module">
                <div class="module-info">
                  <span class="module-label">Solar Production <span class="info-icon">ⓘ</span></span>
                  <div class="module-value-row">
                    <span class="module-value highlight-green">${d(r)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg green"></div></div>
              </div>
            </div>

            <div class="elite-scene">
              <svg class="elite-main-svg" viewBox="0 0 800 400" fill="none" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-green" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-blue" x="-25%" y="-25%" width="150%" height="150%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-cyan" x="-25%" y="-25%" width="150%" height="150%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  <linearGradient id="flow-solar" x1="66%" y1="18%" x2="50%" y2="48%">
                    <stop offset="0%" stop-color="var(--clr-production)" stop-opacity="0.25" />
                    <stop offset="100%" stop-color="var(--clr-production)" stop-opacity="1" />
                  </linearGradient>
                  <linearGradient id="flow-grid-in" x1="10%" y1="56%" x2="52%" y2="56%">
                    <stop offset="0%" stop-color="var(--clr-consumption)" stop-opacity="0.35" />
                    <stop offset="100%" stop-color="var(--clr-consumption)" stop-opacity="0.95" />
                  </linearGradient>
                  <linearGradient id="flow-grid-out" x1="54%" y1="70%" x2="12%" y2="78%">
                    <stop offset="0%" stop-color="var(--clr-export)" stop-opacity="0.95" />
                    <stop offset="100%" stop-color="var(--clr-export)" stop-opacity="0.4" />
                  </linearGradient>
                  <linearGradient id="flow-shared-out" x1="52%" y1="46%" x2="88%" y2="46%">
                    <stop offset="0%" stop-color="var(--clr-export)" stop-opacity="0.95" />
                    <stop offset="100%" stop-color="var(--clr-export)" stop-opacity="0.45" />
                  </linearGradient>
                  <linearGradient id="flow-shared-in" x1="88%" y1="61%" x2="52%" y2="61%">
                    <stop offset="0%" stop-color="var(--clr-primary)" stop-opacity="0.4" />
                    <stop offset="100%" stop-color="var(--clr-primary)" stop-opacity="1" />
                  </linearGradient>

                  <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0 0 L8 4 L0 8 Z" fill="var(--clr-consumption)" />
                  </marker>
                  <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0 0 L8 4 L0 8 Z" fill="var(--clr-production)" />
                  </marker>
                  <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0 0 L8 4 L0 8 Z" fill="var(--clr-export)" />
                  </marker>
                  <marker id="arrow-cyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0 0 L8 4 L0 8 Z" fill="var(--clr-primary)" />
                  </marker>

                  <linearGradient id="scene-shell" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="rgba(255,255,255,0.05)" />
                    <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
                  </linearGradient>
                  <radialGradient id="house-base-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="var(--clr-surface-alt)" stop-opacity="0.8" />
                    <stop offset="100%" stop-color="var(--clr-surface-alt)" stop-opacity="0" />
                  </radialGradient>
                  <radialGradient id="house-core-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="rgba(88, 166, 255, 0.18)" />
                    <stop offset="100%" stop-color="rgba(88, 166, 255, 0)" />
                  </radialGradient>
                </defs>

                <rect x="28" y="36" width="744" height="308" rx="30" fill="url(#scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
                <ellipse cx="400" cy="298" rx="324" ry="54" fill="url(#house-base-glow)" opacity="0.55" />
                <line x1="78" y1="280" x2="722" y2="280" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.45" />

                <g class="scene-node-label" transform="translate(54, 108)">
                  <rect width="118" height="52" rx="16" fill="var(--clr-overlay)" stroke="rgba(248, 81, 73, 0.24)" />
                  <text x="16" y="22" class="scene-node-kicker">Grid</text>
                  <text x="16" y="38" class="scene-node-value">${d(k+h)} kWh</text>
                </g>

                <g class="scene-node-label" transform="translate(338, 44)">
                  <rect width="124" height="48" rx="16" fill="var(--clr-overlay)" stroke="rgba(63, 185, 80, 0.24)" />
                  <text x="16" y="20" class="scene-node-kicker">Solar</text>
                  <text x="16" y="36" class="scene-node-value">${d(r)} kWh</text>
                </g>

                <g class="scene-node-label" transform="translate(600, 108)">
                  <rect width="146" height="52" rx="16" fill="var(--clr-overlay)" stroke="rgba(88, 166, 255, 0.24)" />
                  <text x="16" y="22" class="scene-node-kicker">Community</text>
                  <text x="16" y="38" class="scene-node-value">${d(f+i)} kWh</text>
                </g>

                <g class="tier-1-infrastructure" transform="translate(112, 180)">
                  <circle cx="0" cy="44" r="48" fill="var(--clr-consumption)" fill-opacity="0.06" />
                  <path d="M0 0 V88 M-24 20 H24 M-16 42 H16 M-8 66 H8" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" filter="url(#glow-red)" />
                  <path d="M-12 88 L0 60 L12 88" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" fill="none" />
                </g>

                <g class="tier-1-community" transform="translate(688, 185)">
                  <circle cx="0" cy="40" r="50" fill="var(--clr-primary)" fill-opacity="0.06" />
                  <rect x="-26" y="30" width="22" height="42" rx="6" fill="rgba(88, 166, 255, 0.08)" stroke="var(--clr-primary)" stroke-width="2" />
                  <rect x="6" y="16" width="24" height="56" rx="6" fill="rgba(88, 166, 255, 0.12)" stroke="var(--clr-primary)" stroke-width="2" />
                  <rect x="-2" y="4" width="6" height="10" rx="2" fill="var(--clr-primary)" fill-opacity="0.7" />
                  <path d="M-14 12 H14 M-10 4 V20 M10 4 V20" stroke="var(--clr-primary)" stroke-width="2" stroke-linecap="round" filter="url(#glow-cyan)" />
                </g>

                <g class="tier-1-solar" transform="translate(564, 88)">
                  <circle cx="0" cy="0" r="26" fill="var(--clr-production)" fill-opacity="0.09" />
                  <circle cx="0" cy="0" r="12" fill="var(--clr-production)" fill-opacity="0.9" filter="url(#glow-green)" />
                  <path d="M0 -26 V-40 M0 26 V40 M26 0 H40 M-26 0 H-40 M18 -18 L28 -28 M18 18 L28 28 M-18 18 L-28 28 M-18 -18 L-28 -28" stroke="var(--clr-production)" stroke-width="2.5" stroke-linecap="round" />
                </g>

                <g class="elite-house" transform="translate(312, 92)">
                  <circle cx="90" cy="122" r="100" fill="url(#house-core-glow)" />
                  <circle cx="90" cy="122" r="88" stroke="rgba(88,166,255,0.12)" stroke-width="2" stroke-dasharray="6 10" />
                  <path d="M8 96 L90 28 L172 96 V228 H8 Z" fill="var(--clr-surface)" stroke="var(--clr-border)" stroke-width="3" />
                  <path d="M26 92 L90 44 L154 92" stroke="var(--clr-production)" stroke-width="4" stroke-linecap="round" stroke-opacity="0.7" />
                  <path d="M90 28 V228" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.22" />
                  <rect x="30" y="120" width="32" height="42" rx="6" fill="rgba(88,166,255,0.06)" stroke="var(--clr-border)" stroke-width="1.5" />
                  <rect x="118" y="120" width="32" height="42" rx="6" fill="rgba(88,166,255,0.06)" stroke="var(--clr-border)" stroke-width="1.5" />
                  <rect x="68" y="170" width="44" height="58" rx="6" fill="var(--clr-surface-alt)" stroke="var(--clr-border)" stroke-width="2" />
                  <g transform="translate(122, 54) rotate(32)">
                    <rect x="0" y="0" width="56" height="14" rx="3" fill="rgba(63, 185, 80, 0.12)" stroke="var(--clr-production)" stroke-width="1.6" filter="url(#glow-green)" />
                    <rect x="0" y="20" width="56" height="14" rx="3" fill="rgba(63, 185, 80, 0.12)" stroke="var(--clr-production)" stroke-width="1.6" filter="url(#glow-green)" />
                    <line x1="13" y1="0" x2="13" y2="14" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
                    <line x1="30" y1="0" x2="30" y2="14" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
                    <line x1="13" y1="20" x2="13" y2="34" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
                    <line x1="30" y1="20" x2="30" y2="34" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
                  </g>
                  <g transform="translate(90, 124)">
                    <circle r="32" fill="var(--clr-overlay)" stroke="var(--clr-overlay-border)" stroke-width="2" />
                    <text text-anchor="middle" y="-4" class="house-core-kicker">Self-Suff.</text>
                    <text text-anchor="middle" y="18" class="house-core-value">${d(T,0)}%</text>
                  </g>
                </g>

                <path d="M 560 98 C 520 102 474 130 434 182" stroke="url(#flow-solar)" stroke-width="${c(b)}" stroke-opacity="${x(b)}" stroke-linecap="round" fill="none" marker-end="url(#arrow-green)" />
                ${b>0?`
                  <circle r="${L(b)}" fill="var(--clr-production)" filter="url(#glow-green)">
                    <animateMotion dur="${E(b)}" repeatCount="indefinite" path="M 560 98 C 520 102 474 130 434 182" />
                  </circle>
                `:""}

                <path d="M 146 224 C 226 224 298 224 354 214" stroke="url(#flow-grid-in)" stroke-width="${c(k)}" stroke-opacity="${x(k)}" stroke-linecap="round" fill="none" marker-end="url(#arrow-red)" />
                ${k>0?`
                  <circle r="${L(k)}" fill="var(--clr-consumption)" filter="url(#glow-red)">
                    <animateMotion dur="${E(k)}" repeatCount="indefinite" path="M 146 224 C 226 224 298 224 354 214" />
                  </circle>
                `:""}

                <path d="M 446 246 C 386 292 286 314 146 312" stroke="url(#flow-grid-out)" stroke-width="${c(h)}" stroke-opacity="${x(h)}" stroke-linecap="round" fill="none" marker-end="url(#arrow-blue)" />
                ${h>0?`
                  <circle r="${L(h)}" fill="var(--clr-export)" filter="url(#glow-blue)">
                    <animateMotion dur="${E(h)}" repeatCount="indefinite" path="M 446 246 C 386 292 286 314 146 312" />
                  </circle>
                `:""}

                <path d="M 450 206 C 514 184 582 184 650 206" stroke="url(#flow-shared-out)" stroke-width="${c(f)}" stroke-opacity="${x(f)}" stroke-linecap="round" fill="none" marker-end="url(#arrow-blue)" />
                ${f>0?`
                  <circle r="${L(f)}" fill="var(--clr-export)" filter="url(#glow-blue)">
                    <animateMotion dur="${E(f)}" repeatCount="indefinite" path="M 450 206 C 514 184 582 184 650 206" />
                  </circle>
                `:""}

                <path d="M 650 236 C 586 252 522 254 448 238" stroke="url(#flow-shared-in)" stroke-width="${c(i)}" stroke-opacity="${x(i)}" stroke-linecap="round" fill="none" marker-end="url(#arrow-cyan)" />
                ${i>0?`
                  <circle r="${L(i)}" fill="var(--clr-primary)" filter="url(#glow-cyan)">
                    <animateMotion dur="${E(i)}" repeatCount="indefinite" path="M 650 236 C 586 252 522 254 448 238" />
                  </circle>
                `:""}
              </svg>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${d(y)} kWh used in the house</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${d(k)} kWh bought from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${d(h)} kWh sent back to the market</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${d(f)} kWh sent · ${d(i)} kWh received${i>0?" (included in solar to home)":""}</span>
                </span>
              </div>
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
              <span class="metric-value">${d(T,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${T}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Consumed</span>
              <span class="metric-value">${d(_)} kWh</span>
            </div>
          </div>
          ${v>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${d(v,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label">${((e==null?void 0:e.exceedance_kwh)??0)>0?"⚠️":"✅"} Exceedance</span>
              <span class="metric-value">${d((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${u>0||p>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${d(u)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${d(p)} m³</span>
            </div>
          </div>
          `:""}
        </div>
      </div>
      </div>

      <!-- Chart -->
      <div class="card chart-card">
        <div class="chart-header">
          <h3 class="card-title"><span class="title-icon">📉</span> Energy Profile — ${W}</h3>
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
          Scroll to zoom · Drag to pan · Key metrics update with visible range
        </p>
      </div>

      </div>

      </div>
    </section>
  `}const Ce={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function nt(t){return Ce[t]?Ce[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function ot(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],s=[],a=[],r=[],o=[];for(const u of t.sensors){const p=u.key;p.startsWith("c_")||p==="1-1:1.29.0"||p==="1-1:3.29.0"?e.push(u):p.startsWith("p_")||p==="1-1:2.29.0"||p==="1-1:4.29.0"?s.push(u):p.startsWith("s_")||p.startsWith("1-65:")?a.push(u):p.startsWith("g_")||p.startsWith("7-")?r.push(u):o.push(u)}const n=(u,p,v,l)=>v.length?`
      <div class="card sensor-group">
        <h3 class="card-title"><span class="title-icon">${p}</span> ${u} <span class="badge">${v.length}</span></h3>
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
              ${v.map(m=>`
                <tr>
                  <td class="sensor-name">${nt(m.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${l});">${d(m.value)}</td>
                  <td class="sensor-unit">${m.unit}</td>
                  <td class="sensor-peak">${m.peak_timestamp?rt(m.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
  `}function it(t,e,s){const a=new Date,r=(p,v)=>new Date(p,v+1,0).getDate();let o,n;switch(t){case"yesterday":{const p=new Date(a);p.setDate(p.getDate()-1),o=1,n=p;break}case"this_week":{const p=new Date(a),v=p.getDay()||7,l=new Date(p);l.setDate(p.getDate()-v+1),o=Math.max(1,Math.round((a.getTime()-l.getTime())/864e5)+1),n=l;break}case"last_week":{o=7;const p=new Date(a);p.setDate(p.getDate()-7),n=p;break}case"this_month":{o=a.getDate(),n=a;break}case"last_month":{const p=new Date(a.getFullYear(),a.getMonth()-1,1);o=r(p.getFullYear(),p.getMonth()),n=p;break}case"custom":{if(e&&s){const p=new Date(e),v=new Date(s);o=Math.max(1,Math.round((v.getTime()-p.getTime())/864e5)+1),n=p}else o=1,n=a;break}default:o=1,n=a}const u=r(n.getFullYear(),n.getMonth());return{days:o,monthDays:u,factor:o/u}}function lt(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function Ee(t){const[e,s]=t.split(":").map(a=>parseInt(a,10)||0);return e*60+s}function Pe(t,e,s,a){if(!lt(t.getDay(),e))return!1;const r=t.getHours()*60+t.getMinutes(),o=Ee(s),n=Ee(a);return o===n?!0:o<n?r>=o&&r<n:r>=o||r<n}function ct(t,e){return e.find(s=>Pe(t,s.day_group,s.start_time,s.end_time))}function dt(t,e){return e.find(s=>Pe(t,s.day_group,s.start_time,s.end_time))}function ut(t,e,s,a,r,o=[]){var m;const n=new Map;let u=0,p=0,v=0;const l=new Map;for(const i of o){const f=Number(i.value)||0;l.set(i.startedAt,(l.get(i.startedAt)??0)+f)}for(const i of t){const f=Number(i.value)||0,h=f*.25,y=l.get(i.startedAt)??0,b=Math.max(0,f-y),_=new Date(i.startedAt);if(Number.isNaN(_.getTime()))continue;const k=ct(_,a),$=dt(_,r),T=(k==null?void 0:k.rate)??e,g=((m=k==null?void 0:k.label)==null?void 0:m.trim())||"Base tariff",c=($==null?void 0:$.reference_power_kw)??s;u+=h*T,v=Math.max(v,b),b>c&&(p+=(b-c)*.25);const x=`${g}__${T}`,E=n.get(x);E?E.kwh+=h:n.set(x,{label:g,rate:T,kwh:h})}return{energyCost:u,exceedanceKwh:p,peakPowerKw:v,rateBreakdown:Array.from(n.values()).sort((i,f)=>i.label.localeCompare(f.label))}}function pt(t){var ke;const e=t.config,s=t.rangeData;if(!e||!s)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const a=s.consumption||0,r=s.production||0,o=s.exported||0,n=Math.max(0,o),u=Math.max(0,s.solar_to_home??s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:r-n)),p=Math.max(0,s.grid_import??a-u),v=s.peak_power_kw||0,l=e.reference_power_kw||5,m=s.exceedance_kwh||0,i=s.gas_energy||0,f=s.gas_volume||0,h=i>0||f>0,y=e.consumption_rate_windows??[],b=e.reference_power_windows??[],_=t.consumptionTimeseries?ut(t.consumptionTimeseries.items,e.energy_variable_rate,l,y,b,((ke=t.productionTimeseries)==null?void 0:ke.items)??[]):null,k=y.length>0&&!!_&&Math.abs(p-a)<.01,$=b.length>0&&!!_,T=$?_.peakPowerKw:v,g=$?_.exceedanceKwh:m,{days:c,monthDays:x,factor:E}=it(t.range,t.customStart,t.customEnd),L=e.energy_fixed_fee*E,W=e.network_metering_rate*E,I=e.network_power_ref_rate*E,C=c<x?`${c}/${x} days`:"full month",D=k?_.energyCost:p*e.energy_variable_rate,P=p*e.network_variable_rate,z=g*e.exceedance_rate,Z=e.meter_monthly_fees??[],Oe=Z.reduce((w,F)=>w+(F.fee||0),0)*E,le=p*e.compensation_fund_rate,ce=p*e.electricity_tax_rate,B=Math.max(0,e.connect_discount??0)*E,K=L+D+W+I+P+z+Oe+le+ce-B,de=K*e.vat_rate,ue=K+de,qe=(e.meters??[]).filter(w=>w.types.includes("production")),Ve=e.feed_in_rates??[],q=qe.map(w=>{const F=Ve.find(Y=>Y.meter_id===w.id);if(F){const Y=F.mode==="sensor"&&F.sensor_value!=null&&isFinite(F.sensor_value),$e=Y?F.sensor_value:isFinite(F.tariff)?F.tariff:e.feed_in_tariff,Xe=Y?`Sensor (${d($e,4)} ${e.currency??"EUR"}/kWh)`:"Fixed tariff";return{meterId:w.id,shortId:w.id?"…"+w.id.slice(-8):"Meter",rate:$e,label:Xe,mode:F.mode}}return{meterId:w.id,shortId:w.id?"…"+w.id.slice(-8):"Meter",rate:e.feed_in_tariff,label:"Fixed tariff",mode:"fixed"}}),J=q.filter(w=>isFinite(w.rate)&&w.rate>0),pe=J.length>0?J.reduce((w,F)=>w+F.rate,0)/J.length:e.feed_in_tariff,H=n*pe,V=q.length>1,j=u,me=j*(e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate),he=me*e.vat_rate,Q=me+he,ge=Q+H,ee=ue-H,fe=(e.gas_fixed_fee??6.5)*E,ve=i*(e.gas_variable_rate??.055),ye=(e.gas_network_fee??4.8)*E,_e=i*(e.gas_network_variable_rate??.012),we=i*(e.gas_tax_rate??.001),te=fe+ve+ye+_e+we,be=te*(e.gas_vat_rate??.08),se=te+be,M=e.currency||"EUR",S=w=>`${d(w,2)} ${M}`,ae=s.start&&s.end?`${N(s.start)} — ${N(s.end)}`:t.range.replace("_"," ").replace(/\b\w/g,w=>w.toUpperCase()),Ue=g>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak: <strong>${d(T,1)} kW</strong> &mdash; ${$?"Scheduled reference windows active":`Reference: ${d(l,1)} kW`}</p>
        <p>Total exceedance energy: <strong>${d(g,2)} kWh</strong></p>
        <p class="muted">Surcharge: ${S(z)}</p>
      </div>`:"",Ne=k?_.rateBreakdown.map(w=>`
            <tr>
              <td>${w.label} (${d(w.kwh)} kWh)</td>
              <td style="text-align: right;">${d(w.rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${S(w.kwh*w.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Variable (${d(p)} kWh bought from grid)</td>
              <td style="text-align: right;">${d(e.energy_variable_rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${S(D)}</td>
            </tr>
          `,He=$?`Scheduled windows active (${b.length})`:`${d(l,1)} kW`,je=k?`Time-of-use windows active (${y.length})`:`${d(e.energy_variable_rate,4)} ${M}/kWh`;return`
    <section class="invoice-view">
      <div class="section-header">
        <h2>Cost Estimate &mdash; ${ae}</h2>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-top: var(--sp-2);">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${d(a)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${d(p)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${d(r)} kWh produced</span>
          ${n>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${d(n)} kWh exported</span>`:""}
          ${h?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${d(i)} kWh gas (${d(f)} m³)</span>`:""}
        </div>
      </div>

      ${Ue}

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
              <td>Fixed Fee <span class="muted">(${C})</span></td>
              <td style="text-align: right;">${d(e.energy_fixed_fee,2)} ${M}/mo</td>
              <td style="text-align: right;">${S(L)}</td>
            </tr>
            ${Ne}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${C})</span></td>
              <td style="text-align: right;">${d(e.network_metering_rate,2)} ${M}/mo</td>
              <td style="text-align: right;">${S(W)}</td>
            </tr>
            <tr>
              <td>Power Reference (${He}) <span class="muted">(${C})</span></td>
              <td style="text-align: right;">${d(e.network_power_ref_rate,2)} ${M}/mo</td>
              <td style="text-align: right;">${S(I)}</td>
            </tr>
            <tr>
              <td>Variable (${d(p)} kWh bought from grid)</td>
              <td style="text-align: right;">${d(e.network_variable_rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${S(P)}</td>
            </tr>
            <tr class="${g>0?"exceedance-row":""}">
              <td>Exceedance (${d(g,2)} kWh over ref)</td>
              <td style="text-align: right;">${d(e.exceedance_rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${S(z)}</td>
            </tr>

            ${Z.filter(w=>w.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${Z.filter(w=>w.fee>0).map(w=>`
            <tr>
              <td>${w.label||"…"+w.meter_id.slice(-8)} <span class="muted">(${C})</span></td>
              <td style="text-align: right;">${d(w.fee,2)} ${M}/mo</td>
              <td style="text-align: right;">${S(w.fee*E)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${d(e.compensation_fund_rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${S(le)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${d(e.electricity_tax_rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${S(ce)}</td>
            </tr>
            ${B>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            <tr>
              <td>Monthly Discount <span class="muted">(${C})</span></td>
              <td style="text-align: right;">-${d(Math.max(0,e.connect_discount??0),2)} ${M}/mo</td>
              <td style="text-align: right;">-${S(B)}</td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${S(K)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${d(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(de)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Costs</strong></td>
              <td style="text-align: right;"><strong>${S(ue)}</strong></td>
            </tr>

            ${n>0?`
            <tr class="section-label revenue-section"><td colspan="3">Feed-in Revenue</td></tr>
            ${q.map(w=>`
            <tr class="revenue-row">
              <td>Exported (${V?w.shortId:d(n)+" kWh"})</td>
              <td style="text-align: right;">${w.label}<br/>${d(w.rate,4)} ${M}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${S(V?n/q.length*w.rate:n*w.rate)}</td>
            </tr>
            `).join("")}
            ${V?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${d(n)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${d(pe,4)} ${M}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${S(H)}</td>
            </tr>
            `:""}
            <tr class="net-total-row">
              <td colspan="2"><strong>Net Balance</strong></td>
              <td style="text-align: right;"><strong>${S(ee)}</strong></td>
            </tr>
            `:""}
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          This is an estimate based on your configured billing rates.
          Variable electricity charges are applied to energy bought from the grid (${d(p)} kWh), not total home usage.
          Fixed monthly fees are prorated to the viewed period (${c} of ${x} days = ${d(E*100,1)}%).
          Supplier energy pricing: ${je}.
          Peak power (${d(T,1)} kW) is compared against ${$?"your scheduled reference windows":`your reference power (${d(l,1)} kW)`} &mdash; 
          every kWh consumed above the Referenzwert incurs a surcharge of ${d(e.exceedance_rate,4)} ${M}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${h?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${ae}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${d(i)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${d(f)} m³</span>
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
              <td>Fixed Fee <span class="muted">(${C})</span></td>
              <td style="text-align: right;">${d(e.gas_fixed_fee??6.5,2)} ${M}/mo</td>
              <td style="text-align: right;">${S(fe)}</td>
            </tr>
            <tr>
              <td>Energy (${d(i)} kWh)</td>
              <td style="text-align: right;">${d(e.gas_variable_rate??.055,4)} ${M}/kWh</td>
              <td style="text-align: right;">${S(ve)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${C})</span></td>
              <td style="text-align: right;">${d(e.gas_network_fee??4.8,2)} ${M}/mo</td>
              <td style="text-align: right;">${S(ye)}</td>
            </tr>
            <tr>
              <td>Network Variable (${d(i)} kWh)</td>
              <td style="text-align: right;">${d(e.gas_network_variable_rate??.012,4)} ${M}/kWh</td>
              <td style="text-align: right;">${S(_e)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${d(i)} kWh)</td>
              <td style="text-align: right;">${d(e.gas_tax_rate??.001,4)} ${M}/kWh</td>
              <td style="text-align: right;">${S(we)}</td>
            </tr>

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${S(te)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${d((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${S(be)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${S(se)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Energy Total: ${S(ee+se)}</strong>
          (Electricity: ${S(ee)} + Gas: ${S(se)})
        </p>
      </div>
      `:""}

      ${r>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Revenue &mdash; ${ae}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${S(ge)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${S(Q)}</div>
            <div class="solar-stat-label">Savings (self-consumed)</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${S(H)}</div>
            <div class="solar-stat-label">Feed-in revenue</div>
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
            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${d(j)} kWh)</td>
              <td style="text-align: right;">${d(e.energy_variable_rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${S(j*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${d(e.network_variable_rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${S(j*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${d(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${S(j*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${d(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(he)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${S(Q)}</strong></td>
            </tr>

            ${n>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${q.map(w=>`
            <tr>
              <td>Sold to grid ${V?`(${w.shortId})`:`(${d(n)} kWh)`}</td>
              <td style="text-align: right;">${w.label}<br/>${d(w.rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${S(V?n/q.length*w.rate:n*w.rate)}</td>
            </tr>
            `).join("")}
            ${V?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${S(H)}</strong></td>
            </tr>
            `:""}
            `:""}

            <tr class="total-row solar-total-row">
              <td colspan="2"><strong>💰 Total Solar Panel Value</strong></td>
              <td style="text-align: right;"><strong>${S(ge)}</strong></td>
            </tr>
          </tbody>
        </table>

        <p class="muted" style="margin-top: var(--sp-3); font-size: var(--text-xs); line-height: var(--lh-relaxed);">
          Self-consumption savings = energy you produced and used yourself instead of buying from the grid.
          Feed-in revenue = money earned by selling surplus production.
          ${q.some(w=>w.mode==="sensor")?"Market price sourced from Home Assistant sensor.":"Using fixed feed-in tariff — configure a market price sensor in Settings for real-time rates."}
          ${V?"Revenue split equally across production meters (per-meter export data not yet available).":""}
        </p>
      </div>
      `:""}
    </section>
  `}const mt=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],ht=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Power Reference Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"connect_discount",label:"Monthly Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],gt={consumption:"Power Consumption",production:"Power Production",gas:"Gas Consumption"},Fe={consumption:"⚡",production:"☀️",gas:"🔥"};function ft(t){return t.map(e=>`<span class="meter-type-badge meter-type-${e}">${Fe[e]??""} ${gt[e]??e}</span>`).join(" ")}function Me(t,e,s){const a=t+1;return s?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${a}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${ft(e.types)}</div>
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
  `}function Ae(t){return mt.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function vt(t,e){return`
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
            ${Ae(e.day_group??"all")}
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
  `}function yt(t,e){return`
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
            ${Ae(e.day_group??"all")}
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
  `}function _t(t,e="ha",s){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const a=e==="standalone"?(s==null?void 0:s.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let r="";if(e==="standalone"){const g=a.map((c,x)=>Me(x,c,!1)).join("");r=`
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
              ${g}
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
    `}else{const g=(t==null?void 0:t.meters)??[];r=`
      <div class="card" style="margin-bottom: var(--sp-6); padding: var(--sp-4) var(--sp-5);">
        <p class="muted" style="margin: 0 0 var(--sp-3) 0;">🔒 API credentials are managed through Home Assistant &rarr; Settings &rarr; Integrations &rarr; Leneda</p>
        <div class="form-section">
          <div class="form-section-title">📊  Configured Metering Points</div>
          <div id="meters-container">
            ${g.length>0?g.map((x,E)=>Me(E,x,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const o=g=>g.map(c=>{const x=t?t[c.key]??"":"";return`
        <div class="form-row">
          <label for="cfg-${c.key}">${c.label}</label>
          <div class="input-group">
            <input
              id="cfg-${c.key}"
              name="${c.key}"
              type="${c.type}"
              ${c.type==="number"?`step="${c.step}"`:""}
              value="${x}"
            />
            ${c.unit?`<span class="input-unit">${c.unit}</span>`:""}
          </div>
        </div>
      `}).join(""),n=((t==null?void 0:t.meters)??[]).filter(g=>g.types.includes("production")),u=(t==null?void 0:t.feed_in_rates)??[],p=e==="ha";function v(g){return u.find(c=>c.meter_id===g)??{meter_id:g,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:""}}const l=n.length===0?'<p class="muted">No production meters configured — add a meter with Power Production type above.</p>':n.map((g,c)=>{const x=v(g.id),E=g.id?"…"+g.id.slice(-8):`Meter ${c+1}`;return`
          <div class="feed-in-meter-card" data-meter-idx="${c}" data-meter-id="${g.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${E}</span>
              <input type="hidden" name="feed_in_rate_${c}_meter_id" value="${g.id}" />
            </div>
            <div class="form-row">
              <label>Pricing Mode</label>
              <div class="feed-in-mode-toggle">
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${c}_mode" value="fixed" ${x.mode==="fixed"?"checked":""} />
                  <span class="mode-label">💶 Fixed Tariff</span>
                </label>
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${c}_mode" value="sensor" ${x.mode==="sensor"?"checked":""} />
                  <span class="mode-label">📡 HA Sensor</span>
                </label>
              </div>
            </div>
            <div class="feed-in-fixed-fields" data-rate-idx="${c}" style="${x.mode==="fixed"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${c}_tariff">Feed-in Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${c}_tariff" name="feed_in_rate_${c}_tariff" type="number" step="0.0001" value="${x.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
              </div>
            </div>
            <div class="feed-in-sensor-fields" data-rate-idx="${c}" style="${x.mode==="sensor"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${c}_sensor">Market Price Sensor</label>
                <div class="input-group sensor-picker-group">
                  <input
                    id="cfg-feed_in_rate_${c}_sensor"
                    name="feed_in_rate_${c}_sensor_entity"
                    type="text"
                    value="${x.sensor_entity}"
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
                  <input id="cfg-feed_in_rate_${c}_fallback" name="feed_in_rate_${c}_fallback_tariff" type="number" step="0.0001" value="${x.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
                <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                  Used when the sensor is unavailable.
                </p>
              </div>
            </div>
          </div>
        `}).join(""),m=((t==null?void 0:t.meters)??[]).some(g=>g.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),i=(t==null?void 0:t.consumption_rate_windows)??[],f=(t==null?void 0:t.reference_power_windows)??[],h=(t==null?void 0:t.meters)??[],y=(t==null?void 0:t.meter_monthly_fees)??[];function b(g){return y.find(c=>c.meter_id===g)??{meter_id:g,label:"",fee:0}}const _=h.length===0?'<p class="muted">No meters configured.</p>':h.map((g,c)=>{const x=b(g.id),E=g.id?"…"+g.id.slice(-8):`Meter ${c+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${g.types.map(W=>Fe[W]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${E}</code>
              <input type="hidden" name="meter_fee_${c}_meter_id" value="${g.id}" />
            </div>
            <div class="form-row" style="margin-bottom: var(--sp-2);">
              <label for="cfg-meter_fee_${c}_label">Label</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${c}_label" name="meter_fee_${c}_label" type="text" value="${x.label||`Meter ${c+1} metering fee`}" placeholder="e.g. Smart meter rental" />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-meter_fee_${c}_fee">Monthly Fee</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${c}_fee" name="meter_fee_${c}_fee" type="number" step="0.01" value="${x.fee}" />
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
      ${i.length>0?i.map((g,c)=>vt(c,g)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,$=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${f.length>0?f.map((g,c)=>yt(c,g)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,T=ht.map(g=>{if(g.title==="Gas Billing"&&!m||g.title==="Meter Fees"&&h.length<2)return"";let c;return g.title==="Feed-in / Selling"?c=l:g.title==="Time-of-Use Tariffs"?c=k:g.title==="Reference Power Windows"?c=$:g.title==="Discounts"?c=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as a monthly credit. The dashboard prorates it to the selected period and subtracts it before VAT.
      </p>`+o(g.fields):g.title==="Meter Fees"?c=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+_:c=o(g.fields),`
    <div class="form-section">
      <div class="form-section-title">${g.icon}  ${g.title}</div>
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
          ${t?T:'<p class="muted">Loading configuration…</p>'}
          ${t?`
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save Configuration</button>
            <button type="button" id="reset-config-btn" class="btn btn-outline">Reset to Defaults</button>
          </div>
          `:""}
        </form>
      </div>
    </section>
  `}function re(t,e,s=!1,a="dark"){return`
    <header class="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-brand">
        <img src="/leneda-panel/static/logo.png" srcset="/leneda-panel/static/logo@2x.png 2x" alt="Leneda Logo" class="navbar-logo-img" />
 
        <button class="menu-toggle ${s?"open":""}" aria-label="Toggle menu" aria-expanded="${s}">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav class="navbar-tabs ${s?"mobile-open":""}" role="tablist">
        ${[{id:"dashboard",label:"Dashboard",icon:"🏠"},{id:"sensors",label:"Sensors",icon:"📊"},{id:"invoice",label:"Invoice",icon:"💰"},{id:"settings",label:"Settings",icon:"⚙️"}].map(o=>`
          <button
            class="nav-btn ${o.id===t?"active":""}"
            data-tab="${o.id}"
            role="tab"
            aria-selected="${o.id===t}"
            aria-controls="panel-${o.id}"
          >
            <span class="nav-icon" aria-hidden="true">${o.icon}</span>
            <span class="nav-label">${o.label}</span>
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
  `}const Ie="leneda_credentials",Ge="leneda_theme";function wt(){try{const t=localStorage.getItem(Ie);if(t)return JSON.parse(t)}catch{}return null}function ne(t){try{localStorage.setItem(Ie,JSON.stringify(t))}catch{}}function bt(){var t;try{const e=localStorage.getItem(Ge);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function kt(t){try{localStorage.setItem(Ge,t)}catch{}}class $t{constructor(e){U(this,"root");U(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartUnit:"kwh",rangeData:null,consumptionTimeseries:null,productionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:bt()});U(this,"preZoomRange",null);U(this,"preZoomCustomStart","");U(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await We();if(this.state.mode=e.mode,e.mode==="standalone"){const s=wt();if(s&&(this.state.credentials=s),!e.configured&&!s){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&s)try{const{saveCredentials:a}=await A(async()=>{const{saveCredentials:r}=await Promise.resolve().then(()=>O);return{saveCredentials:r}},void 0);await a(s)}catch{}if(!s)try{this.state.credentials=await Re()}catch{}}await this.loadData()}toDisplayError(e,s="Failed to load data"){const a=e instanceof Error?e.message:String(e??"").trim(),r=a.toLowerCase();return r.includes("missing data")||r.includes("no_data")||r.includes("no data")?"Missing data":a||s}clearRangeStateWithError(e,s="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.state.error=this.toDisplayError(e,s)}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.render();try{const[e,s,a]=await Promise.all([oe(this.state.range),ie(),X()]),{start:r,end:o}=this.getDateRangeISO(),[n,u]=await Promise.all([G("1-1:1.29.0",r,o),G("1-1:2.29.0",r,o)]);this.state.rangeData=e,this.state.consumptionTimeseries=n,this.state.productionTimeseries=u,this.state.sensors=s,this.state.config=a}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render()}}async changeRange(e){if(this.preZoomRange=null,this.state.range=e,e==="custom"){if(!this.state.customStart||!this.state.customEnd){const s=new Date;s.setDate(s.getDate()-1);const a=new Date(s);a.setDate(a.getDate()-6),this.state.customStart=a.toISOString().slice(0,10),this.state.customEnd=s.toISOString().slice(0,10)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:s,end:a}=this.getDateRangeISO(),[r,o,n]=await Promise.all([oe(e),G("1-1:1.29.0",s,a),G("1-1:2.29.0",s,a)]);this.state.rangeData=r,this.state.consumptionTimeseries=o,this.state.productionTimeseries=n}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render()}}async applyCustomRange(){this.preZoomRange=null;const{customStart:e,customEnd:s}=this.state;if(!(!e||!s)){this.state.error=null,this.state.loading=!0,this.render();try{const{fetchCustomData:a}=await A(async()=>{const{fetchCustomData:u}=await Promise.resolve().then(()=>O);return{fetchCustomData:u}},void 0),[r,o,n]=await Promise.all([a(e,s),G("1-1:1.29.0",new Date(e+"T00:00:00").toISOString(),new Date(s+"T23:59:59.999").toISOString()),G("1-1:2.29.0",new Date(e+"T00:00:00").toISOString(),new Date(s+"T23:59:59.999").toISOString())]);this.state.rangeData={range:"custom",consumption:r.consumption,production:r.production,exported:r.exported??0,self_consumed:r.self_consumed??0,grid_import:r.grid_import,solar_to_home:r.solar_to_home,direct_solar_to_home:r.direct_solar_to_home,shared:r.shared,shared_with_me:r.shared_with_me,gas_energy:r.gas_energy??0,gas_volume:r.gas_volume??0,peak_power_kw:r.peak_power_kw??0,exceedance_kwh:r.exceedance_kwh??0,metering_point:r.metering_point??"",start:r.start,end:r.end},this.state.consumptionTimeseries=o,this.state.productionTimeseries=n}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render()}}}changeTab(e){this.state.tab=e,this.render(),e==="dashboard"&&!this.state.rangeData&&!this.state.loading&&this.loadData(),e==="sensors"&&!this.state.sensors&&ie().then(s=>{this.state.sensors=s,this.render()}),e==="settings"&&!this.state.config&&X().then(s=>{this.state.config=s,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,kt(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const s=this.root.querySelector(".main-content");s?s.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}render(){var n;const{tab:e,loading:s,error:a,theme:r}=this.state;if(s&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${re(e,u=>{},!1,r)}
          <main class="main-content">
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `,this.attachNavListeners();return}if(a&&!this.state.rangeData){const u=a.toLowerCase().includes("missing data");this.root.innerHTML=`
        <div class="app-shell">
          ${re(e,p=>{},!1,r)}
          <main class="main-content">
            <div class="error-state">
              <h2>${u?"Missing Data":"Connection Error"}</h2>
              <p>${u?"The selected period could not be loaded because data is missing.":a}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(n=this.root.querySelector("#retry-btn"))==null||n.addEventListener("click",()=>this.loadData());return}let o="";switch(e){case"dashboard":o=Te(this.state);break;case"sensors":o=ot(this.state.sensors);break;case"invoice":o=pt(this.state);break;case"settings":o=_t(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${re(e,u=>this.changeTab(u),this.state.isMenuOpen,r)}
        <main class="main-content">
          ${s?'<div class="loading-bar"></div>':""}
          ${o}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachSettingsListeners()}attachNavListeners(){var e,s;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(s=this.root.querySelector("[data-theme-toggle]"))==null||s.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.tab;this.changeTab(r)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(n=>{n.addEventListener("click",()=>{const u=n.dataset.range;this.changeRange(u)})});const s=this.root.querySelector("#custom-start"),a=this.root.querySelector("#custom-end");s&&s.addEventListener("change",()=>{this.state.customStart=s.value}),a&&a.addEventListener("change",()=>{this.state.customEnd=a.value});const r=this.root.querySelector("#apply-custom-range");if(r==null||r.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(n=>{n.addEventListener("click",()=>{const u=n.dataset.chartUnit;u!==this.state.chartUnit&&(this.state.chartUnit=u,this.render())})}),!e){const n=this.root.querySelector("#energy-chart");n&&this.state.rangeData&&this.initChart(n)}const o=this.root.querySelector(".reset-zoom-btn");o==null||o.addEventListener("click",async()=>{const{resetChartZoom:n}=await A(async()=>{const{resetChartZoom:u}=await import("./Charts-CTuzU3zd.js");return{resetChartZoom:u}},[]);if(n(),o.style.display="none",this.preZoomRange!==null){const u=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",u==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(u)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachSettingsListeners(){var p,v;const e=this.root.querySelector("#credentials-form");if(e){const l=this.root.querySelector("#add-meter-btn");l==null||l.addEventListener("click",()=>{var y,b;const f=new FormData(e),h=m(f);if(h.length<10){h.push({id:"",types:["consumption"]});const _={api_key:f.get("api_key")||((y=this.state.credentials)==null?void 0:y.api_key)||"",energy_id:f.get("energy_id")||((b=this.state.credentials)==null?void 0:b.energy_id)||"",meters:h};this.state.credentials=_,ne(_),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach(f=>{f.addEventListener("click",()=>{var k,$;const h=parseInt(f.dataset.meter??"0",10),y=new FormData(e),b=m(y);b.splice(h,1);const _={api_key:y.get("api_key")||((k=this.state.credentials)==null?void 0:k.api_key)||"",energy_id:y.get("energy_id")||(($=this.state.credentials)==null?void 0:$.energy_id)||"",meters:b};this.state.credentials=_,ne(_),this.renderPreserveMainScroll()})});const m=f=>{var y,b,_;const h=[];for(let k=0;k<10;k++){const $=f.get(`meter_${k}_id`);if($===null)break;const T=[];(y=e.querySelector(`[name="meter_${k}_consumption"]`))!=null&&y.checked&&T.push("consumption"),(b=e.querySelector(`[name="meter_${k}_production"]`))!=null&&b.checked&&T.push("production"),(_=e.querySelector(`[name="meter_${k}_gas"]`))!=null&&_.checked&&T.push("gas"),h.push({id:$.trim(),types:T})}return h};e.addEventListener("submit",async f=>{f.preventDefault();const h=new FormData(e),y={api_key:h.get("api_key"),energy_id:h.get("energy_id"),meters:m(h)},b=this.root.querySelector("#creds-status");try{ne(y);const{saveCredentials:_}=await A(async()=>{const{saveCredentials:k}=await Promise.resolve().then(()=>O);return{saveCredentials:k}},void 0);await _(y),b&&(b.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=y,this.state.error=null,await this.loadData()}catch(_){b&&(b.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${_ instanceof Error?_.message:_}</p>`)}});const i=this.root.querySelector("#test-creds-btn");i==null||i.addEventListener("click",async()=>{const f=new FormData(e),h={api_key:f.get("api_key"),energy_id:f.get("energy_id"),meters:m(f)},y=this.root.querySelector("#creds-status");y&&(y.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:b}=await A(async()=>{const{testCredentials:k}=await Promise.resolve().then(()=>O);return{testCredentials:k}},void 0),_=await b(h);y&&(y.innerHTML=_.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${_.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${_.message}</p>`)}catch(b){y&&(y.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${b instanceof Error?b.message:b}</p>`)}})}const s=this.root.querySelector("#settings-form");if(!s)return;const a=l=>{const m=[];for(let i=0;i<24;i++){const f=l.get(`consumption_window_${i}_label`),h=l.get(`consumption_window_${i}_day_group`),y=l.get(`consumption_window_${i}_start_time`),b=l.get(`consumption_window_${i}_end_time`),_=l.get(`consumption_window_${i}_rate`);if(f===null&&h===null&&y===null&&b===null&&_===null)break;m.push({label:(f??"").trim()||`Window ${i+1}`,day_group:h??"all",start_time:y??"00:00",end_time:b??"06:00",rate:parseFloat(_??"0")||0})}return m},r=l=>{const m=[];for(let i=0;i<24;i++){const f=l.get(`reference_window_${i}_label`),h=l.get(`reference_window_${i}_day_group`),y=l.get(`reference_window_${i}_start_time`),b=l.get(`reference_window_${i}_end_time`),_=l.get(`reference_window_${i}_reference_power_kw`);if(f===null&&h===null&&y===null&&b===null&&_===null)break;m.push({label:(f??"").trim()||`Reference ${i+1}`,day_group:h??"all",start_time:y??"17:00",end_time:b??"00:00",reference_power_kw:parseFloat(_??"0")||0})}return m},o=()=>{var k;const l=new FormData(s),m={};s.querySelectorAll('input[type="checkbox"]').forEach($=>{m[$.name]=$.checked});const i=[],f=/^feed_in_rate_(\d+)_(.+)$/,h={},y=[],b=/^meter_fee_(\d+)_(.+)$/,_={};for(const[$,T]of l.entries()){if($.startsWith("consumption_window_")||$.startsWith("reference_window_"))continue;const g=$.match(f);if(g){const W=g[1],I=g[2];h[W]||(h[W]={}),h[W][I]=T;continue}const c=$.match(b);if(c){const W=c[1],I=c[2];_[W]||(_[W]={}),_[W][I]=T;continue}if(m[$]!==void 0&&typeof m[$]=="boolean")continue;const x=T,E=s.elements.namedItem($);if(x===""&&E instanceof HTMLInputElement&&E.type==="number"){const W=(k=this.state.config)==null?void 0:k[$];typeof W=="number"&&isFinite(W)&&(m[$]=W);continue}const L=parseFloat(x);m[$]=isNaN(L)?x:L}for(const $ of Object.keys(h).sort()){const T=h[$],g=T.mode??"fixed",c=g==="sensor"?T.fallback_tariff??T.tariff:T.tariff;i.push({meter_id:T.meter_id??"",mode:g,tariff:parseFloat(c??"0.08")||.08,sensor_entity:T.sensor_entity??""})}i.length>0&&(m.feed_in_rates=i);for(const $ of Object.keys(_).sort()){const T=_[$];y.push({meter_id:T.meter_id??"",label:T.label??"",fee:parseFloat(T.fee??"0")||0})}return y.length>0&&(m.meter_monthly_fees=y),m.consumption_rate_windows=a(l),m.reference_power_windows=r(l),m},n=l=>{if(!this.state.config)return;const m=o();l(m),this.state.config={...this.state.config,...m},this.renderPreserveMainScroll()};if((p=this.root.querySelector("#add-consumption-window-btn"))==null||p.addEventListener("click",()=>{n(l=>{var i;const m=Array.isArray(l.consumption_rate_windows)?[...l.consumption_rate_windows]:[];m.push({label:`Window ${m.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((i=this.state.config)==null?void 0:i.energy_variable_rate)??.1125}),l.consumption_rate_windows=m})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(l=>{l.addEventListener("click",()=>{const m=parseInt(l.dataset.window??"0",10);n(i=>{const f=Array.isArray(i.consumption_rate_windows)?[...i.consumption_rate_windows]:[];f.splice(m,1),i.consumption_rate_windows=f})})}),(v=this.root.querySelector("#add-reference-window-btn"))==null||v.addEventListener("click",()=>{n(l=>{var i;const m=Array.isArray(l.reference_power_windows)?[...l.reference_power_windows]:[];m.push({label:`Reference ${m.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((i=this.state.config)==null?void 0:i.reference_power_kw)??5}),l.reference_power_windows=m})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(l=>{l.addEventListener("click",()=>{const m=parseInt(l.dataset.window??"0",10);n(i=>{const f=Array.isArray(i.reference_power_windows)?[...i.reference_power_windows]:[];f.splice(m,1),i.reference_power_windows=f})})}),s.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(l=>{l.addEventListener("change",()=>{const m=l.name.match(/feed_in_rate_(\d+)_mode/);if(!m)return;const i=m[1],f=s.querySelector(`.feed-in-fixed-fields[data-rate-idx="${i}"]`),h=s.querySelector(`.feed-in-sensor-fields[data-rate-idx="${i}"]`);f&&(f.style.display=l.value==="fixed"?"":"none"),h&&(h.style.display=l.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const l=this.root.querySelector("#ha-entity-list");l&&Le().then(({entities:m})=>{l.innerHTML=m.map(i=>`<option value="${i}"></option>`).join("")}).catch(()=>{})}s.addEventListener("submit",async l=>{l.preventDefault();const m=o();try{const{saveConfig:i}=await A(async()=>{const{saveConfig:f}=await Promise.resolve().then(()=>O);return{saveConfig:f}},void 0);await i(m),this.state.config=await X(),this.render()}catch(i){alert("Failed to save: "+(i instanceof Error?i.message:i))}});const u=this.root.querySelector("#reset-config-btn");u==null||u.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?"))try{const{resetConfig:l}=await A(async()=>{const{resetConfig:m}=await Promise.resolve().then(()=>O);return{resetConfig:m}},void 0);await l(),this.state.config=await X(),this.render()}catch(l){alert("Failed to reset: "+(l instanceof Error?l.message:l))}})}async initChart(e){var s,a;try{const{renderEnergyChart:r}=await A(async()=>{const{renderEnergyChart:h}=await import("./Charts-CTuzU3zd.js");return{renderEnergyChart:h}},[]),{fetchTimeseries:o,fetchPerMeterTimeseries:n}=await A(async()=>{const{fetchTimeseries:h,fetchPerMeterTimeseries:y}=await Promise.resolve().then(()=>O);return{fetchTimeseries:h,fetchPerMeterTimeseries:y}},void 0),{start:u,end:p}=this.getDateRangeISO(),[v,l]=await Promise.all([o("1-1:1.29.0",u,p),o("1-1:2.29.0",u,p)]),m=((s=this.state.config)==null?void 0:s.reference_power_kw)??0,i=(((a=this.state.config)==null?void 0:a.meters)??[]).filter(h=>h.types.includes("production"));let f;if(i.length>1)try{const h=await n("1-1:2.29.0",u,p);h.meters&&h.meters.length>1&&(f=h.meters)}catch(h){console.warn("Per-meter timeseries fetch failed, using merged view:",h)}r(e,v,l,{unit:this.state.chartUnit,referencePowerKw:m,perMeterProduction:f,onZoomChange:(h,y)=>{this.handleChartZoomChange(h,y)}})}catch(r){console.error("Chart init failed:",r)}}async handleChartZoomChange(e,s){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd);const{fetchCustomData:a}=await A(async()=>{const{fetchCustomData:v}=await Promise.resolve().then(()=>O);return{fetchCustomData:v}},void 0),r=e.slice(0,10),o=s.slice(0,10),n=await a(r,o),[u,p]=await Promise.all([G("1-1:1.29.0",new Date(r+"T00:00:00").toISOString(),new Date(o+"T23:59:59.999").toISOString()),G("1-1:2.29.0",new Date(r+"T00:00:00").toISOString(),new Date(o+"T23:59:59.999").toISOString())]);this.state.range="custom",this.state.customStart=r,this.state.customEnd=o,this.state.rangeData={range:"custom",consumption:n.consumption,production:n.production,exported:n.exported??0,self_consumed:n.self_consumed??0,gas_energy:n.gas_energy??0,gas_volume:n.gas_volume??0,grid_import:n.grid_import,solar_to_home:n.solar_to_home,direct_solar_to_home:n.direct_solar_to_home,shared:n.shared,shared_with_me:n.shared_with_me,peak_power_kw:n.peak_power_kw??0,exceedance_kwh:n.exceedance_kwh??0,metering_point:n.metering_point??"",start:n.start,end:n.end},this.state.consumptionTimeseries=u,this.state.productionTimeseries=p,this.renderDashboardPartial()}catch(a){console.error("Zoom data fetch failed:",a),this.clearRangeStateWithError(a,"Missing data"),this.render()}}renderDashboardPartial(){var g,c;const e=this.root.querySelector(".dashboard");if(!e||!this.state.rangeData)return;const s=document.createElement("div");s.innerHTML=Te(this.state);const a=s.querySelector(".dashboard");if(!a)return;const r=e.querySelector(".range-selector"),o=a.querySelector(".range-selector");r&&o&&r.replaceWith(o);const n=e.querySelector(".range-info-bar"),u=a.querySelector(".range-info-bar");n&&u?n.replaceWith(u):!n&&u?(g=e.querySelector(".range-selector"))==null||g.insertAdjacentElement("afterend",u):n&&!u&&n.remove();const p=e.querySelector(".custom-range-picker"),v=a.querySelector(".custom-range-picker");if(p&&v)p.replaceWith(v);else if(!p&&v){const x=e.querySelector(".range-info-bar")??e.querySelector(".range-selector");x==null||x.insertAdjacentElement("afterend",v)}else p&&!v&&p.remove();const l=e.querySelector(".stats-grid"),m=a.querySelector(".stats-grid");l&&m&&l.replaceWith(m);const i=e.querySelector(".flow-card"),f=a.querySelector(".flow-card");i&&f&&i.replaceWith(f);const h=e.querySelector(".metrics-card"),y=a.querySelector(".metrics-card");h&&y&&h.replaceWith(y);const b=e.querySelector(".chart-header .card-title"),_=a.querySelector(".chart-header .card-title");b&&_&&b.replaceWith(_);const k=e.querySelector(".reset-zoom-btn");k&&(k.style.display=""),e.querySelectorAll("[data-range]").forEach(x=>{x.addEventListener("click",()=>{this.changeRange(x.dataset.range)})});const $=e.querySelector("#custom-start"),T=e.querySelector("#custom-end");$&&$.addEventListener("change",()=>{this.state.customStart=$.value}),T&&T.addEventListener("change",()=>{this.state.customEnd=T.value}),(c=e.querySelector("#apply-custom-range"))==null||c.addEventListener("click",()=>{this.preZoomRange=null,this.applyCustomRange()})}getDateRangeISO(){const e=new Date,s=a=>a.toISOString();switch(this.state.range){case"custom":{const a=new Date(this.state.customStart+"T00:00:00"),r=new Date(this.state.customEnd+"T23:59:59.999");return{start:s(a),end:s(r)}}case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const r=new Date(a);return r.setHours(23,59,59,999),{start:s(a),end:s(r)}}case"this_week":{const a=new Date(e),r=a.getDay()||7;return a.setDate(a.getDate()-r+1),a.setHours(0,0,0,0),{start:s(a),end:s(e)}}case"last_week":{const a=new Date(e),r=a.getDay()||7,o=new Date(a);o.setDate(a.getDate()-r),o.setHours(23,59,59,999);const n=new Date(o);return n.setDate(o.getDate()-6),n.setHours(0,0,0,0),{start:s(n),end:s(o)}}case"this_month":{const a=new Date(e.getFullYear(),e.getMonth(),1);return{start:s(a),end:s(e)}}case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),r=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s(a),end:s(r)}}case"this_year":{const a=new Date(e.getFullYear(),0,1);return{start:s(a),end:s(e)}}case"last_year":{const a=new Date(e.getFullYear()-1,0,1),r=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s(a),end:s(r)}}default:{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const r=new Date(a);return r.setHours(23,59,59,999),{start:s(a),end:s(r)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new $t(t).mount()}
