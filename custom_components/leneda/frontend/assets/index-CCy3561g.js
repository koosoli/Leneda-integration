var Ne=Object.defineProperty;var He=(t,e,s)=>e in t?Ne(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var I=(t,e,s)=>He(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const Xe="modulepreload",je=function(t){return"/leneda-panel/static/"+t},_e={},L=function(e,s,a){let n=Promise.resolve();if(s&&s.length>0){let i=function(v){return Promise.all(v.map(o=>Promise.resolve(o).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const m=document.querySelector("meta[property=csp-nonce]"),f=(m==null?void 0:m.nonce)||(m==null?void 0:m.getAttribute("nonce"));n=i(s.map(v=>{if(v=je(v),v in _e)return;_e[v]=!0;const o=v.endsWith(".css"),d=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${v}"]${d}`))return;const l=document.createElement("link");if(l.rel=o?"stylesheet":Xe,o||(l.as="script"),l.crossOrigin="",l.href=v,f&&l.setAttribute("nonce",f),document.head.appendChild(l),o)return new Promise((g,u)=>{l.addEventListener("load",g),l.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${v}`)))})}))}function r(i){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=i,window.dispatchEvent(m),!m.defaultPrevented)throw i}return n.then(i=>{for(const m of i||[])m.status==="rejected"&&r(m.reason);return e().catch(r)})};function Ce(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()}))}}function Ye(){var t,e,s,a,n;try{const r=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((n=(a=(s=r==null?void 0:r.hass)==null?void 0:s.auth)==null?void 0:a.data)==null?void 0:n.access_token)??null}catch{return null}}async function W(t,e){const s=Ye(),a={...e==null?void 0:e.headers,...s?{Authorization:`Bearer ${s}`}:{}},n={...e,credentials:"include",headers:a},r=await fetch(t,n);if(!r.ok)throw new Error(`API ${r.status}: ${r.statusText}`);return r.json()}async function te(t){return W(`/leneda_api/data?range=${t}`)}async function ze(t,e){return W(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function q(t,e,s){let a=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),W(a)}async function Ze(t,e,s){let a=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),W(a)}async function se(){return W("/leneda_api/sensors")}async function V(){return W("/leneda_api/config")}async function Be(t){await W("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function Ke(){await W("/leneda_api/config/reset",{method:"POST"})}async function Ee(){try{return await W("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function Te(){return W("/leneda_api/credentials")}async function Je(t){const e=Ce(t);await W("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Qe(t){const e=Ce(t);return W("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function De(){return W("/leneda_api/ha-entities")}const P=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:V,fetchCredentials:Te,fetchCustomData:ze,fetchHAEntities:De,fetchMode:Ee,fetchPerMeterTimeseries:Ze,fetchRangeData:te,fetchSensors:se,fetchTimeseries:q,resetConfig:Ke,saveConfig:Be,saveCredentials:Je,testCredentials:Qe},Symbol.toStringTag,{value:"Module"}));function c(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function we(t){return new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function et(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}const be=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function ke(t){var C;const e=t.rangeData,s=(e==null?void 0:e.consumption)??0,a=(e==null?void 0:e.production)??0,n=(e==null?void 0:e.exported)??0,r=(e==null?void 0:e.self_consumed)??0,i=(e==null?void 0:e.gas_energy)??0,m=(e==null?void 0:e.gas_volume)??0,f=(e==null?void 0:e.peak_power_kw)??0,v=(e==null?void 0:e.shared_with_me)??0,o=Math.min(a,r),d=o+v,l=s,g=Math.max(0,n-((e==null?void 0:e.shared)??0)),u=(e==null?void 0:e.shared)??0,y=l+d,k=y>0?Math.min(100,d/y*100):0,b=Math.max(a,l,g,u,v,o,1),_=(S,D=3,M=11)=>(S>0?D+S/b*(M-D):2).toFixed(1),x=(S,D=.22,M=.94)=>(S>0?D+S/b*(M-D):.12).toFixed(2),E=(S,D=1.35,M=3.2)=>`${(S>0?Math.max(D,M-S/b*(M-D)):M).toFixed(2)}s`,p=(S,D=4,M=7.5)=>(S>0?D+S/b*(M-D):3.5).toFixed(1),h=t.range==="custom"&&t.customStart&&t.customEnd?`${we(t.customStart+"T00:00:00")} — ${we(t.customEnd+"T00:00:00")}`:((C=be.find(S=>S.id===t.range))==null?void 0:C.label)??"Yesterday";return`
    <div class="dashboard" style="position: relative;">
      <div style="position:fixed;bottom:4px;right:4px;font-size:10px;opacity:0.5;pointer-events:none;z-index:9999;">v:2.1.0</div>

      <!-- Range Selector -->
      <div class="range-selector">
        ${be.map(S=>`
          <button
            class="range-btn ${S.id===t.range?"active":""}"
            data-range="${S.id}"
          >${S.label}</button>
        `).join("")}
      </div>

      ${(()=>{if(!(e!=null&&e.start)||!(e!=null&&e.end))return"";try{const S=new Date(e.start),D=new Date(e.end);return isNaN(S.getTime())||isNaN(D.getTime())?"":`
            <div class="range-info-bar">
              📅 ${S.toLocaleDateString()} — ${D.toLocaleDateString()}
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
      `:""}

      <!-- Stat Cards -->
      <div class="stats-grid">
        <div class="stat-card consumption">
          <div class="stat-icon">⚡</div>
          <div class="stat-body">
            <div class="stat-label">Consumption</div>
            <div class="stat-value">${c(s)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.production">
          <div class="stat-icon">☀️</div>
          <div class="stat-body">
            <div class="stat-label">Production</div>
            <div class="stat-value">${c(a)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.export">
          <div class="stat-icon">📤</div>
          <div class="stat-body">
            <div class="stat-label">Exported</div>
            <div class="stat-value">${c(n)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.self-consumed">
          <div class="stat-icon">🏠</div>
          <div class="stat-body">
            <div class="stat-label">Self-Consumed</div>
            <div class="stat-value">${c(r)} <span class="stat-unit">kWh</span></div>
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
                    <span class="module-value highlight-red">${c(s)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg red"></div></div>
              </div>

              <div class="glass-module production-module">
                <div class="module-info">
                  <span class="module-label">Solar Production <span class="info-icon">ⓘ</span></span>
                  <div class="module-value-row">
                    <span class="module-value highlight-green">${c(a)}</span>
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
                  <text x="16" y="38" class="scene-node-value">${c(l+g)} kWh</text>
                </g>

                <g class="scene-node-label" transform="translate(338, 44)">
                  <rect width="124" height="48" rx="16" fill="var(--clr-overlay)" stroke="rgba(63, 185, 80, 0.24)" />
                  <text x="16" y="20" class="scene-node-kicker">Solar</text>
                  <text x="16" y="36" class="scene-node-value">${c(a)} kWh</text>
                </g>

                <g class="scene-node-label" transform="translate(600, 108)">
                  <rect width="146" height="52" rx="16" fill="var(--clr-overlay)" stroke="rgba(88, 166, 255, 0.24)" />
                  <text x="16" y="22" class="scene-node-kicker">Community</text>
                  <text x="16" y="38" class="scene-node-value">${c(u+v)} kWh</text>
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
                    <text text-anchor="middle" y="18" class="house-core-value">${c(k,0)}%</text>
                  </g>
                </g>

                <path d="M 560 98 C 520 102 474 130 434 182" stroke="url(#flow-solar)" stroke-width="${_(o)}" stroke-opacity="${x(o)}" stroke-linecap="round" fill="none" marker-end="url(#arrow-green)" />
                ${o>0?`
                  <circle r="${p(o)}" fill="var(--clr-production)" filter="url(#glow-green)">
                    <animateMotion dur="${E(o)}" repeatCount="indefinite" path="M 560 98 C 520 102 474 130 434 182" />
                  </circle>
                `:""}

                <path d="M 146 224 C 226 224 298 224 354 214" stroke="url(#flow-grid-in)" stroke-width="${_(l)}" stroke-opacity="${x(l)}" stroke-linecap="round" fill="none" marker-end="url(#arrow-red)" />
                ${l>0?`
                  <circle r="${p(l)}" fill="var(--clr-consumption)" filter="url(#glow-red)">
                    <animateMotion dur="${E(l)}" repeatCount="indefinite" path="M 146 224 C 226 224 298 224 354 214" />
                  </circle>
                `:""}

                <path d="M 446 246 C 386 292 286 314 146 312" stroke="url(#flow-grid-out)" stroke-width="${_(g)}" stroke-opacity="${x(g)}" stroke-linecap="round" fill="none" marker-end="url(#arrow-blue)" />
                ${g>0?`
                  <circle r="${p(g)}" fill="var(--clr-export)" filter="url(#glow-blue)">
                    <animateMotion dur="${E(g)}" repeatCount="indefinite" path="M 446 246 C 386 292 286 314 146 312" />
                  </circle>
                `:""}

                <path d="M 450 206 C 514 184 582 184 650 206" stroke="url(#flow-shared-out)" stroke-width="${_(u)}" stroke-opacity="${x(u)}" stroke-linecap="round" fill="none" marker-end="url(#arrow-blue)" />
                ${u>0?`
                  <circle r="${p(u)}" fill="var(--clr-export)" filter="url(#glow-blue)">
                    <animateMotion dur="${E(u)}" repeatCount="indefinite" path="M 450 206 C 514 184 582 184 650 206" />
                  </circle>
                `:""}

                <path d="M 650 236 C 586 252 522 254 448 238" stroke="url(#flow-shared-in)" stroke-width="${_(v)}" stroke-opacity="${x(v)}" stroke-linecap="round" fill="none" marker-end="url(#arrow-cyan)" />
                ${v>0?`
                  <circle r="${p(v)}" fill="var(--clr-primary)" filter="url(#glow-cyan)">
                    <animateMotion dur="${E(v)}" repeatCount="indefinite" path="M 650 236 C 586 252 522 254 448 238" />
                  </circle>
                `:""}
              </svg>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${c(d)} kWh used in the house${v>0?` (${c(o)} direct + ${c(v)} via community)`:""}</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${c(l)} kWh bought from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${c(g)} kWh sent back to the market</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${c(u)} kWh sent · ${c(v)} kWh received${v>0?" (included in solar to home)":""}</span>
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
              <span class="metric-value">${c(k,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${k}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Consumed</span>
              <span class="metric-value">${c(r)} kWh</span>
            </div>
          </div>
          ${f>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${c(f,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label">${((e==null?void 0:e.exceedance_kwh)??0)>0?"⚠️":"✅"} Exceedance</span>
              <span class="metric-value">${c((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${i>0||m>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${c(i)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${c(m)} m³</span>
            </div>
          </div>
          `:""}
        </div>
      </div>
      </div>

      <!-- Chart -->
      <div class="card chart-card">
        <div class="chart-header">
          <h3 class="card-title"><span class="title-icon">📉</span> Energy Profile — ${h}</h3>
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
  `}const $e={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function tt(t){return $e[t]?$e[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function st(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],s=[],a=[],n=[],r=[];for(const m of t.sensors){const f=m.key;f.startsWith("c_")||f==="1-1:1.29.0"||f==="1-1:3.29.0"?e.push(m):f.startsWith("p_")||f==="1-1:2.29.0"||f==="1-1:4.29.0"?s.push(m):f.startsWith("s_")||f.startsWith("1-65:")?a.push(m):f.startsWith("g_")||f.startsWith("7-")?n.push(m):r.push(m)}const i=(m,f,v,o)=>v.length?`
      <div class="card sensor-group">
        <h3 class="card-title"><span class="title-icon">${f}</span> ${m} <span class="badge">${v.length}</span></h3>
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
              ${v.map(d=>`
                <tr>
                  <td class="sensor-name">${tt(d.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${o});">${c(d.value)}</td>
                  <td class="sensor-unit">${d.unit}</td>
                  <td class="sensor-peak">${d.peak_timestamp?et(d.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
      ${i("Energy Production","☀️",s,"production")}
      ${i("Energy Sharing","🔗",a,"self")}
      ${i("Gas","🔥",n,"gas")}
      ${i("Other","📊",r,"text")}
    </section>
  `}function at(t,e,s){const a=new Date,n=(f,v)=>new Date(f,v+1,0).getDate();let r,i;switch(t){case"yesterday":{const f=new Date(a);f.setDate(f.getDate()-1),r=1,i=f;break}case"this_week":{const f=new Date(a),v=f.getDay()||7,o=new Date(f);o.setDate(f.getDate()-v+1),r=Math.max(1,Math.round((a.getTime()-o.getTime())/864e5)+1),i=o;break}case"last_week":{r=7;const f=new Date(a);f.setDate(f.getDate()-7),i=f;break}case"this_month":{r=a.getDate(),i=a;break}case"last_month":{const f=new Date(a.getFullYear(),a.getMonth()-1,1);r=n(f.getFullYear(),f.getMonth()),i=f;break}case"custom":{if(e&&s){const f=new Date(e),v=new Date(s);r=Math.max(1,Math.round((v.getTime()-f.getTime())/864e5)+1),i=f}else r=1,i=a;break}default:r=1,i=a}const m=n(i.getFullYear(),i.getMonth());return{days:r,monthDays:m,factor:r/m}}function rt(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function xe(t){const[e,s]=t.split(":").map(a=>parseInt(a,10)||0);return e*60+s}function Me(t,e,s,a){if(!rt(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),r=xe(s),i=xe(a);return r===i?!0:r<i?n>=r&&n<i:n>=r||n<i}function nt(t,e){return e.find(s=>Me(t,s.day_group,s.start_time,s.end_time))}function ot(t,e){return e.find(s=>Me(t,s.day_group,s.start_time,s.end_time))}function it(t,e,s,a,n){var v;const r=new Map;let i=0,m=0,f=0;for(const o of t){const d=Number(o.value)||0,l=d*.25,g=new Date(o.startedAt);if(Number.isNaN(g.getTime()))continue;const u=nt(g,a),y=ot(g,n),k=(u==null?void 0:u.rate)??e,b=((v=u==null?void 0:u.label)==null?void 0:v.trim())||"Base tariff",_=(y==null?void 0:y.reference_power_kw)??s;i+=l*k,f=Math.max(f,d),d>_&&(m+=(d-_)*.25);const x=`${b}__${k}`,E=r.get(x);E?E.kwh+=l:r.set(x,{label:b,rate:k,kwh:l})}return{energyCost:i,exceedanceKwh:m,peakPowerKw:f,rateBreakdown:Array.from(r.values()).sort((o,d)=>o.label.localeCompare(d.label))}}function lt(t){const e=t.config,s=t.rangeData;if(!e||!s)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const a=s.consumption||0,n=s.production||0,r=s.exported||0,i=s.peak_power_kw||0,m=e.reference_power_kw||5,f=s.exceedance_kwh||0,v=s.gas_energy||0,o=s.gas_volume||0,d=v>0||o>0,l=e.consumption_rate_windows??[],g=e.reference_power_windows??[],u=t.consumptionTimeseries?it(t.consumptionTimeseries.items,e.energy_variable_rate,m,l,g):null,y=l.length>0&&!!u,k=g.length>0&&!!u,b=k?u.peakPowerKw:i,_=k?u.exceedanceKwh:f,{days:x,monthDays:E,factor:p}=at(t.range,t.customStart,t.customEnd),h=e.energy_fixed_fee*p,C=e.network_metering_rate*p,S=e.network_power_ref_rate*p,D=x<E?`${x}/${E} days`:"full month",M=y?u.energyCost:a*e.energy_variable_rate,ae=a*e.network_variable_rate,N=_*e.exceedance_rate,H=e.meter_monthly_fees??[],Fe=H.reduce((w,R)=>w+(R.fee||0),0)*p,re=a*e.compensation_fund_rate,ne=a*e.electricity_tax_rate,X=Math.max(0,e.connect_discount??0)*p,j=h+M+C+S+ae+N+Fe+re+ne-X,oe=j*e.vat_rate,ie=j+oe,Ae=(e.meters??[]).filter(w=>w.types.includes("production")),Ie=e.feed_in_rates??[],F=Ae.map(w=>{const R=Ie.find(U=>U.meter_id===w.id);if(R){const U=R.mode==="sensor"&&R.sensor_value!=null&&isFinite(R.sensor_value),ye=U?R.sensor_value:isFinite(R.tariff)?R.tariff:e.feed_in_tariff,Ue=U?`Sensor (${c(ye,4)} ${e.currency??"EUR"}/kWh)`:"Fixed tariff";return{meterId:w.id,shortId:w.id?"…"+w.id.slice(-8):"Meter",rate:ye,label:Ue,mode:R.mode}}return{meterId:w.id,shortId:w.id?"…"+w.id.slice(-8):"Meter",rate:e.feed_in_tariff,label:"Fixed tariff",mode:"fixed"}}),Y=F.filter(w=>isFinite(w.rate)&&w.rate>0),le=Y.length>0?Y.reduce((w,R)=>w+R.rate,0)/Y.length:e.feed_in_tariff,G=r*le,A=F.length>1,O=s.self_consumed||0,ce=O*(e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate),de=ce*e.vat_rate,z=ce+de,ue=z+G,Z=ie-G,pe=(e.gas_fixed_fee??6.5)*p,me=v*(e.gas_variable_rate??.055),he=(e.gas_network_fee??4.8)*p,ge=v*(e.gas_network_variable_rate??.012),fe=v*(e.gas_tax_rate??.001),B=pe+me+he+ge+fe,ve=B*(e.gas_vat_rate??.08),K=B+ve,T=e.currency||"EUR",$=w=>`${c(w,2)} ${T}`,J=t.range.replace("_"," ").replace(/\b\w/g,w=>w.toUpperCase()),Ge=_>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak: <strong>${c(b,1)} kW</strong> &mdash; ${k?"Scheduled reference windows active":`Reference: ${c(m,1)} kW`}</p>
        <p>Total exceedance energy: <strong>${c(_,2)} kWh</strong></p>
        <p class="muted">Surcharge: ${$(N)}</p>
      </div>`:"",Oe=y?u.rateBreakdown.map(w=>`
            <tr>
              <td>${w.label} (${c(w.kwh)} kWh)</td>
              <td style="text-align: right;">${c(w.rate,4)} ${T}/kWh</td>
              <td style="text-align: right;">${$(w.kwh*w.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Variable (${c(a)} kWh)</td>
              <td style="text-align: right;">${c(e.energy_variable_rate,4)} ${T}/kWh</td>
              <td style="text-align: right;">${$(M)}</td>
            </tr>
          `,qe=k?`Scheduled windows active (${g.length})`:`${c(m,1)} kW`,Ve=y?`Time-of-use windows active (${l.length})`:`${c(e.energy_variable_rate,4)} ${T}/kWh`;return`
    <section class="invoice-view">
      <div class="section-header">
        <h2>Cost Estimate &mdash; ${J}</h2>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-top: var(--sp-2);">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${c(a)} kWh consumed</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${c(n)} kWh produced</span>
          ${r>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${c(r)} kWh exported</span>`:""}
          ${d?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${c(v)} kWh gas (${c(o)} m³)</span>`:""}
        </div>
      </div>

      ${Ge}

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
              <td style="text-align: right;">${c(e.energy_fixed_fee,2)} ${T}/mo</td>
              <td style="text-align: right;">${$(h)}</td>
            </tr>
            ${Oe}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${c(e.network_metering_rate,2)} ${T}/mo</td>
              <td style="text-align: right;">${$(C)}</td>
            </tr>
            <tr>
              <td>Power Reference (${qe}) <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${c(e.network_power_ref_rate,2)} ${T}/mo</td>
              <td style="text-align: right;">${$(S)}</td>
            </tr>
            <tr>
              <td>Variable (${c(a)} kWh)</td>
              <td style="text-align: right;">${c(e.network_variable_rate,4)} ${T}/kWh</td>
              <td style="text-align: right;">${$(ae)}</td>
            </tr>
            <tr class="${_>0?"exceedance-row":""}">
              <td>Exceedance (${c(_,2)} kWh over ref)</td>
              <td style="text-align: right;">${c(e.exceedance_rate,4)} ${T}/kWh</td>
              <td style="text-align: right;">${$(N)}</td>
            </tr>

            ${H.filter(w=>w.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${H.filter(w=>w.fee>0).map(w=>`
            <tr>
              <td>${w.label||"…"+w.meter_id.slice(-8)} <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${c(w.fee,2)} ${T}/mo</td>
              <td style="text-align: right;">${$(w.fee*p)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${c(e.compensation_fund_rate,4)} ${T}/kWh</td>
              <td style="text-align: right;">${$(re)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${c(e.electricity_tax_rate,4)} ${T}/kWh</td>
              <td style="text-align: right;">${$(ne)}</td>
            </tr>
            ${X>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            <tr>
              <td>Connect Discount <span class="muted">(${D})</span></td>
              <td style="text-align: right;">-${c(Math.max(0,e.connect_discount??0),2)} ${T}/mo</td>
              <td style="text-align: right;">-${$(X)}</td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${$(j)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${c(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${$(oe)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Costs</strong></td>
              <td style="text-align: right;"><strong>${$(ie)}</strong></td>
            </tr>

            ${r>0?`
            <tr class="section-label revenue-section"><td colspan="3">Feed-in Revenue</td></tr>
            ${F.map(w=>`
            <tr class="revenue-row">
              <td>Exported (${A?w.shortId:c(r)+" kWh"})</td>
              <td style="text-align: right;">${w.label}<br/>${c(w.rate,4)} ${T}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${$(A?r/F.length*w.rate:r*w.rate)}</td>
            </tr>
            `).join("")}
            ${A?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${c(r)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${c(le,4)} ${T}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${$(G)}</td>
            </tr>
            `:""}
            <tr class="net-total-row">
              <td colspan="2"><strong>Net Balance</strong></td>
              <td style="text-align: right;"><strong>${$(Z)}</strong></td>
            </tr>
            `:""}
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          This is an estimate based on your configured billing rates.
          Fixed monthly fees are prorated to the viewed period (${x} of ${E} days = ${c(p*100,1)}%).
          Supplier energy pricing: ${Ve}.
          Peak power (${c(b,1)} kW) is compared against ${k?"your scheduled reference windows":`your reference power (${c(m,1)} kW)`} &mdash; 
          every kWh consumed above the Referenzwert incurs a surcharge of ${c(e.exceedance_rate,4)} ${T}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${d?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${J}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${c(v)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${c(o)} m³</span>
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
              <td style="text-align: right;">${c(e.gas_fixed_fee??6.5,2)} ${T}/mo</td>
              <td style="text-align: right;">${$(pe)}</td>
            </tr>
            <tr>
              <td>Energy (${c(v)} kWh)</td>
              <td style="text-align: right;">${c(e.gas_variable_rate??.055,4)} ${T}/kWh</td>
              <td style="text-align: right;">${$(me)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${D})</span></td>
              <td style="text-align: right;">${c(e.gas_network_fee??4.8,2)} ${T}/mo</td>
              <td style="text-align: right;">${$(he)}</td>
            </tr>
            <tr>
              <td>Network Variable (${c(v)} kWh)</td>
              <td style="text-align: right;">${c(e.gas_network_variable_rate??.012,4)} ${T}/kWh</td>
              <td style="text-align: right;">${$(ge)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${c(v)} kWh)</td>
              <td style="text-align: right;">${c(e.gas_tax_rate??.001,4)} ${T}/kWh</td>
              <td style="text-align: right;">${$(fe)}</td>
            </tr>

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${$(B)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${c((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${$(ve)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${$(K)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Energy Total: ${$(Z+K)}</strong>
          (Electricity: ${$(Z)} + Gas: ${$(K)})
        </p>
      </div>
      `:""}

      ${n>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Revenue &mdash; ${J}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${$(ue)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${$(z)}</div>
            <div class="solar-stat-label">Savings (self-consumed)</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${$(G)}</div>
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
              <td>Energy not bought (${c(O)} kWh)</td>
              <td style="text-align: right;">${c(e.energy_variable_rate,4)} ${T}/kWh</td>
              <td style="text-align: right;">${$(O*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${c(e.network_variable_rate,4)} ${T}/kWh</td>
              <td style="text-align: right;">${$(O*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${c(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${T}/kWh</td>
              <td style="text-align: right;">${$(O*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${c(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${$(de)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${$(z)}</strong></td>
            </tr>

            ${r>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${F.map(w=>`
            <tr>
              <td>Sold to grid ${A?`(${w.shortId})`:`(${c(r)} kWh)`}</td>
              <td style="text-align: right;">${w.label}<br/>${c(w.rate,4)} ${T}/kWh</td>
              <td style="text-align: right;">${$(A?r/F.length*w.rate:r*w.rate)}</td>
            </tr>
            `).join("")}
            ${A?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${$(G)}</strong></td>
            </tr>
            `:""}
            `:""}

            <tr class="total-row solar-total-row">
              <td colspan="2"><strong>💰 Total Solar Panel Value</strong></td>
              <td style="text-align: right;"><strong>${$(ue)}</strong></td>
            </tr>
          </tbody>
        </table>

        <p class="muted" style="margin-top: var(--sp-3); font-size: var(--text-xs); line-height: var(--lh-relaxed);">
          Self-consumption savings = energy you produced and used yourself instead of buying from the grid.
          Feed-in revenue = money earned by selling surplus production.
          ${F.some(w=>w.mode==="sensor")?"Market price sourced from Home Assistant sensor.":"Using fixed feed-in tariff — configure a market price sensor in Settings for real-time rates."}
          ${A?"Revenue split equally across production meters (per-meter export data not yet available).":""}
        </p>
      </div>
      `:""}
    </section>
  `}const ct=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],dt=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Power Reference Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"connect_discount",label:"Connect Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],ut={consumption:"Power Consumption",production:"Power Production",gas:"Gas Consumption"},We={consumption:"⚡",production:"☀️",gas:"🔥"};function pt(t){return t.map(e=>`<span class="meter-type-badge meter-type-${e}">${We[e]??""} ${ut[e]??e}</span>`).join(" ")}function Se(t,e,s){const a=t+1;return s?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${a}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${pt(e.types)}</div>
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
  `}function Re(t){return ct.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function mt(t,e){return`
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
            ${Re(e.day_group??"all")}
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
  `}function ht(t,e){return`
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
            ${Re(e.day_group??"all")}
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
  `}function gt(t,e="ha",s){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const a=e==="standalone"?(s==null?void 0:s.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let n="";if(e==="standalone"){const p=a.map((h,C)=>Se(C,h,!1)).join("");n=`
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
              ${p}
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
    `}else{const p=(t==null?void 0:t.meters)??[];n=`
      <div class="card" style="margin-bottom: var(--sp-6); padding: var(--sp-4) var(--sp-5);">
        <p class="muted" style="margin: 0 0 var(--sp-3) 0;">🔒 API credentials are managed through Home Assistant &rarr; Settings &rarr; Integrations &rarr; Leneda</p>
        <div class="form-section">
          <div class="form-section-title">📊  Configured Metering Points</div>
          <div id="meters-container">
            ${p.length>0?p.map((C,S)=>Se(S,C,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const r=p=>p.map(h=>{const C=t?t[h.key]??"":"";return`
        <div class="form-row">
          <label for="cfg-${h.key}">${h.label}</label>
          <div class="input-group">
            <input
              id="cfg-${h.key}"
              name="${h.key}"
              type="${h.type}"
              ${h.type==="number"?`step="${h.step}"`:""}
              value="${C}"
            />
            ${h.unit?`<span class="input-unit">${h.unit}</span>`:""}
          </div>
        </div>
      `}).join(""),i=((t==null?void 0:t.meters)??[]).filter(p=>p.types.includes("production")),m=(t==null?void 0:t.feed_in_rates)??[],f=e==="ha";function v(p){return m.find(h=>h.meter_id===p)??{meter_id:p,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:""}}const o=i.length===0?'<p class="muted">No production meters configured — add a meter with Power Production type above.</p>':i.map((p,h)=>{const C=v(p.id),S=p.id?"…"+p.id.slice(-8):`Meter ${h+1}`;return`
          <div class="feed-in-meter-card" data-meter-idx="${h}" data-meter-id="${p.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${S}</span>
              <input type="hidden" name="feed_in_rate_${h}_meter_id" value="${p.id}" />
            </div>
            <div class="form-row">
              <label>Pricing Mode</label>
              <div class="feed-in-mode-toggle">
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${h}_mode" value="fixed" ${C.mode==="fixed"?"checked":""} />
                  <span class="mode-label">💶 Fixed Tariff</span>
                </label>
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${h}_mode" value="sensor" ${C.mode==="sensor"?"checked":""} />
                  <span class="mode-label">📡 HA Sensor</span>
                </label>
              </div>
            </div>
            <div class="feed-in-fixed-fields" data-rate-idx="${h}" style="${C.mode==="fixed"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${h}_tariff">Feed-in Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${h}_tariff" name="feed_in_rate_${h}_tariff" type="number" step="0.0001" value="${C.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
              </div>
            </div>
            <div class="feed-in-sensor-fields" data-rate-idx="${h}" style="${C.mode==="sensor"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${h}_sensor">Market Price Sensor</label>
                <div class="input-group sensor-picker-group">
                  <input
                    id="cfg-feed_in_rate_${h}_sensor"
                    name="feed_in_rate_${h}_sensor_entity"
                    type="text"
                    value="${C.sensor_entity}"
                    placeholder="${f?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${f&&h===0?'<datalist id="ha-entity-list"></datalist>':""}
              </div>
              <div class="form-row">
                <label for="cfg-feed_in_rate_${h}_fallback">Fallback Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${h}_fallback" name="feed_in_rate_${h}_fallback_tariff" type="number" step="0.0001" value="${C.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
                <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                  Used when the sensor is unavailable.
                </p>
              </div>
            </div>
          </div>
        `}).join(""),d=((t==null?void 0:t.meters)??[]).some(p=>p.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),l=(t==null?void 0:t.consumption_rate_windows)??[],g=(t==null?void 0:t.reference_power_windows)??[],u=(t==null?void 0:t.meters)??[],y=(t==null?void 0:t.meter_monthly_fees)??[];function k(p){return y.find(h=>h.meter_id===p)??{meter_id:p,label:"",fee:0}}const b=u.length===0?'<p class="muted">No meters configured.</p>':u.map((p,h)=>{const C=k(p.id),S=p.id?"…"+p.id.slice(-8):`Meter ${h+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${p.types.map(M=>We[M]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${S}</code>
              <input type="hidden" name="meter_fee_${h}_meter_id" value="${p.id}" />
            </div>
            <div class="form-row" style="margin-bottom: var(--sp-2);">
              <label for="cfg-meter_fee_${h}_label">Label</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${h}_label" name="meter_fee_${h}_label" type="text" value="${C.label||`Meter ${h+1} metering fee`}" placeholder="e.g. Smart meter rental" />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-meter_fee_${h}_fee">Monthly Fee</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${h}_fee" name="meter_fee_${h}_fee" type="number" step="0.01" value="${C.fee}" />
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
      ${l.length>0?l.map((p,h)=>mt(h,p)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,x=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${g.length>0?g.map((p,h)=>ht(h,p)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,E=dt.map(p=>{if(p.title==="Gas Billing"&&!d||p.title==="Meter Fees"&&u.length<2)return"";let h;return p.title==="Feed-in / Selling"?h=o:p.title==="Time-of-Use Tariffs"?h=_:p.title==="Reference Power Windows"?h=x:p.title==="Discounts"?h=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as a monthly credit. The dashboard prorates it to the selected period and subtracts it before VAT.
      </p>`+r(p.fields):p.title==="Meter Fees"?h=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+b:h=r(p.fields),`
    <div class="form-section">
      <div class="form-section-title">${p.icon}  ${p.title}</div>
      ${h}
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
          ${t?E:'<p class="muted">Loading configuration…</p>'}
          ${t?`
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save Configuration</button>
            <button type="button" id="reset-config-btn" class="btn btn-outline">Reset to Defaults</button>
          </div>
          `:""}
        </form>
      </div>
    </section>
  `}function Q(t,e,s=!1,a="dark"){return`
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
        ${[{id:"dashboard",label:"Dashboard",icon:"🏠"},{id:"sensors",label:"Sensors",icon:"📊"},{id:"invoice",label:"Invoice",icon:"💰"},{id:"settings",label:"Settings",icon:"⚙️"}].map(r=>`
          <button
            class="nav-btn ${r.id===t?"active":""}"
            data-tab="${r.id}"
            role="tab"
            aria-selected="${r.id===t}"
            aria-controls="panel-${r.id}"
          >
            <span class="nav-icon" aria-hidden="true">${r.icon}</span>
            <span class="nav-label">${r.label}</span>
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
  `}const Le="leneda_credentials",Pe="leneda_theme";function ft(){try{const t=localStorage.getItem(Le);if(t)return JSON.parse(t)}catch{}return null}function ee(t){try{localStorage.setItem(Le,JSON.stringify(t))}catch{}}function vt(){var t;try{const e=localStorage.getItem(Pe);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function yt(t){try{localStorage.setItem(Pe,t)}catch{}}class _t{constructor(e){I(this,"root");I(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartUnit:"kw",rangeData:null,consumptionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:vt()});I(this,"preZoomRange",null);I(this,"preZoomCustomStart","");I(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await Ee();if(this.state.mode=e.mode,e.mode==="standalone"){const s=ft();if(s&&(this.state.credentials=s),!e.configured&&!s){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&s)try{const{saveCredentials:a}=await L(async()=>{const{saveCredentials:n}=await Promise.resolve().then(()=>P);return{saveCredentials:n}},void 0);await a(s)}catch{}if(!s)try{this.state.credentials=await Te()}catch{}}await this.loadData()}async loadData(){this.state.loading=!0,this.state.error=null,this.render();try{const[e,s,a]=await Promise.all([te(this.state.range),se(),V()]),{start:n,end:r}=this.getDateRangeISO(),i=await q("1-1:1.29.0",n,r);this.state.rangeData=e,this.state.consumptionTimeseries=i,this.state.sensors=s,this.state.config=a}catch(e){this.state.error=e instanceof Error?e.message:"Failed to load data"}finally{this.state.loading=!1,this.render()}}async changeRange(e){if(this.preZoomRange=null,this.state.range=e,e==="custom"){if(!this.state.customStart||!this.state.customEnd){const s=new Date;s.setDate(s.getDate()-1);const a=new Date(s);a.setDate(a.getDate()-6),this.state.customStart=a.toISOString().slice(0,10),this.state.customEnd=s.toISOString().slice(0,10)}this.render();return}this.state.loading=!0,this.render();try{const{start:s,end:a}=this.getDateRangeISO(),[n,r]=await Promise.all([te(e),q("1-1:1.29.0",s,a)]);this.state.rangeData=n,this.state.consumptionTimeseries=r}catch(s){this.state.error=s instanceof Error?s.message:"Failed to load data"}finally{this.state.loading=!1,this.render()}}async applyCustomRange(){this.preZoomRange=null;const{customStart:e,customEnd:s}=this.state;if(!(!e||!s)){this.state.loading=!0,this.render();try{const{fetchCustomData:a}=await L(async()=>{const{fetchCustomData:i}=await Promise.resolve().then(()=>P);return{fetchCustomData:i}},void 0),[n,r]=await Promise.all([a(e,s),q("1-1:1.29.0",new Date(e+"T00:00:00").toISOString(),new Date(s+"T23:59:59.999").toISOString())]);this.state.rangeData={range:"custom",consumption:n.consumption,production:n.production,exported:n.exported??0,self_consumed:n.self_consumed??0,gas_energy:n.gas_energy??0,gas_volume:n.gas_volume??0,peak_power_kw:n.peak_power_kw??0,exceedance_kwh:n.exceedance_kwh??0,metering_point:n.metering_point??""},this.state.consumptionTimeseries=r}catch(a){this.state.error=a instanceof Error?a.message:"Failed to load custom data"}finally{this.state.loading=!1,this.render()}}}changeTab(e){this.state.tab=e,this.render(),e==="sensors"&&!this.state.sensors&&se().then(s=>{this.state.sensors=s,this.render()}),e==="settings"&&!this.state.config&&V().then(s=>{this.state.config=s,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,yt(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const s=this.root.querySelector(".main-content");s?s.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}render(){var i;const{tab:e,loading:s,error:a,theme:n}=this.state;if(s&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${Q(e,m=>{},!1,n)}
          <main class="main-content">
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `,this.attachNavListeners();return}if(a&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${Q(e,m=>{},!1,n)}
          <main class="main-content">
            <div class="error-state">
              <h2>Connection Error</h2>
              <p>${a}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(i=this.root.querySelector("#retry-btn"))==null||i.addEventListener("click",()=>this.loadData());return}let r="";switch(e){case"dashboard":r=ke(this.state);break;case"sensors":r=st(this.state.sensors);break;case"invoice":r=lt(this.state);break;case"settings":r=gt(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${Q(e,m=>this.changeTab(m),this.state.isMenuOpen,n)}
        <main class="main-content">
          ${s?'<div class="loading-bar"></div>':""}
          ${r}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachSettingsListeners()}attachNavListeners(){var e,s;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(s=this.root.querySelector("[data-theme-toggle]"))==null||s.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.tab;this.changeTab(n)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(i=>{i.addEventListener("click",()=>{const m=i.dataset.range;this.changeRange(m)})});const s=this.root.querySelector("#custom-start"),a=this.root.querySelector("#custom-end");s&&s.addEventListener("change",()=>{this.state.customStart=s.value}),a&&a.addEventListener("change",()=>{this.state.customEnd=a.value});const n=this.root.querySelector("#apply-custom-range");if(n==null||n.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(i=>{i.addEventListener("click",()=>{const m=i.dataset.chartUnit;m!==this.state.chartUnit&&(this.state.chartUnit=m,this.render())})}),!e){const i=this.root.querySelector("#energy-chart");i&&this.state.rangeData&&this.initChart(i)}const r=this.root.querySelector(".reset-zoom-btn");r==null||r.addEventListener("click",async()=>{const{resetChartZoom:i}=await L(async()=>{const{resetChartZoom:m}=await import("./Charts-CD10JIPH.js");return{resetChartZoom:m}},[]);if(i(),r.style.display="none",this.preZoomRange!==null){const m=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",m==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(m)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachSettingsListeners(){var f,v;const e=this.root.querySelector("#credentials-form");if(e){const o=this.root.querySelector("#add-meter-btn");o==null||o.addEventListener("click",()=>{var y,k;const g=new FormData(e),u=d(g);if(u.length<10){u.push({id:"",types:["consumption"]});const b={api_key:g.get("api_key")||((y=this.state.credentials)==null?void 0:y.api_key)||"",energy_id:g.get("energy_id")||((k=this.state.credentials)==null?void 0:k.energy_id)||"",meters:u};this.state.credentials=b,ee(b),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach(g=>{g.addEventListener("click",()=>{var _,x;const u=parseInt(g.dataset.meter??"0",10),y=new FormData(e),k=d(y);k.splice(u,1);const b={api_key:y.get("api_key")||((_=this.state.credentials)==null?void 0:_.api_key)||"",energy_id:y.get("energy_id")||((x=this.state.credentials)==null?void 0:x.energy_id)||"",meters:k};this.state.credentials=b,ee(b),this.renderPreserveMainScroll()})});const d=g=>{var y,k,b;const u=[];for(let _=0;_<10;_++){const x=g.get(`meter_${_}_id`);if(x===null)break;const E=[];(y=e.querySelector(`[name="meter_${_}_consumption"]`))!=null&&y.checked&&E.push("consumption"),(k=e.querySelector(`[name="meter_${_}_production"]`))!=null&&k.checked&&E.push("production"),(b=e.querySelector(`[name="meter_${_}_gas"]`))!=null&&b.checked&&E.push("gas"),u.push({id:x.trim(),types:E})}return u};e.addEventListener("submit",async g=>{g.preventDefault();const u=new FormData(e),y={api_key:u.get("api_key"),energy_id:u.get("energy_id"),meters:d(u)},k=this.root.querySelector("#creds-status");try{ee(y);const{saveCredentials:b}=await L(async()=>{const{saveCredentials:_}=await Promise.resolve().then(()=>P);return{saveCredentials:_}},void 0);await b(y),k&&(k.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=y,this.state.error=null,await this.loadData()}catch(b){k&&(k.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${b instanceof Error?b.message:b}</p>`)}});const l=this.root.querySelector("#test-creds-btn");l==null||l.addEventListener("click",async()=>{const g=new FormData(e),u={api_key:g.get("api_key"),energy_id:g.get("energy_id"),meters:d(g)},y=this.root.querySelector("#creds-status");y&&(y.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:k}=await L(async()=>{const{testCredentials:_}=await Promise.resolve().then(()=>P);return{testCredentials:_}},void 0),b=await k(u);y&&(y.innerHTML=b.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${b.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${b.message}</p>`)}catch(k){y&&(y.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${k instanceof Error?k.message:k}</p>`)}})}const s=this.root.querySelector("#settings-form");if(!s)return;const a=o=>{const d=[];for(let l=0;l<24;l++){const g=o.get(`consumption_window_${l}_label`),u=o.get(`consumption_window_${l}_day_group`),y=o.get(`consumption_window_${l}_start_time`),k=o.get(`consumption_window_${l}_end_time`),b=o.get(`consumption_window_${l}_rate`);if(g===null&&u===null&&y===null&&k===null&&b===null)break;d.push({label:(g??"").trim()||`Window ${l+1}`,day_group:u??"all",start_time:y??"00:00",end_time:k??"06:00",rate:parseFloat(b??"0")||0})}return d},n=o=>{const d=[];for(let l=0;l<24;l++){const g=o.get(`reference_window_${l}_label`),u=o.get(`reference_window_${l}_day_group`),y=o.get(`reference_window_${l}_start_time`),k=o.get(`reference_window_${l}_end_time`),b=o.get(`reference_window_${l}_reference_power_kw`);if(g===null&&u===null&&y===null&&k===null&&b===null)break;d.push({label:(g??"").trim()||`Reference ${l+1}`,day_group:u??"all",start_time:y??"17:00",end_time:k??"00:00",reference_power_kw:parseFloat(b??"0")||0})}return d},r=()=>{const o=new FormData(s),d={};s.querySelectorAll('input[type="checkbox"]').forEach(_=>{d[_.name]=_.checked});const l=[],g=/^feed_in_rate_(\d+)_(.+)$/,u={},y=[],k=/^meter_fee_(\d+)_(.+)$/,b={};for(const[_,x]of o.entries()){if(_.startsWith("consumption_window_")||_.startsWith("reference_window_"))continue;const E=_.match(g);if(E){const C=E[1],S=E[2];u[C]||(u[C]={}),u[C][S]=x;continue}const p=_.match(k);if(p){const C=p[1],S=p[2];b[C]||(b[C]={}),b[C][S]=x;continue}if(d[_]!==void 0&&typeof d[_]=="boolean")continue;const h=parseFloat(x);d[_]=isNaN(h)?x:h}for(const _ of Object.keys(u).sort()){const x=u[_],E=x.mode??"fixed",p=E==="sensor"?x.fallback_tariff??x.tariff:x.tariff;l.push({meter_id:x.meter_id??"",mode:E,tariff:parseFloat(p??"0.08")||.08,sensor_entity:x.sensor_entity??""})}l.length>0&&(d.feed_in_rates=l);for(const _ of Object.keys(b).sort()){const x=b[_];y.push({meter_id:x.meter_id??"",label:x.label??"",fee:parseFloat(x.fee??"0")||0})}return y.length>0&&(d.meter_monthly_fees=y),d.consumption_rate_windows=a(o),d.reference_power_windows=n(o),d},i=o=>{if(!this.state.config)return;const d=r();o(d),this.state.config={...this.state.config,...d},this.renderPreserveMainScroll()};if((f=this.root.querySelector("#add-consumption-window-btn"))==null||f.addEventListener("click",()=>{i(o=>{var l;const d=Array.isArray(o.consumption_rate_windows)?[...o.consumption_rate_windows]:[];d.push({label:`Window ${d.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((l=this.state.config)==null?void 0:l.energy_variable_rate)??.15}),o.consumption_rate_windows=d})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(o=>{o.addEventListener("click",()=>{const d=parseInt(o.dataset.window??"0",10);i(l=>{const g=Array.isArray(l.consumption_rate_windows)?[...l.consumption_rate_windows]:[];g.splice(d,1),l.consumption_rate_windows=g})})}),(v=this.root.querySelector("#add-reference-window-btn"))==null||v.addEventListener("click",()=>{i(o=>{var l;const d=Array.isArray(o.reference_power_windows)?[...o.reference_power_windows]:[];d.push({label:`Reference ${d.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((l=this.state.config)==null?void 0:l.reference_power_kw)??5}),o.reference_power_windows=d})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(o=>{o.addEventListener("click",()=>{const d=parseInt(o.dataset.window??"0",10);i(l=>{const g=Array.isArray(l.reference_power_windows)?[...l.reference_power_windows]:[];g.splice(d,1),l.reference_power_windows=g})})}),s.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(o=>{o.addEventListener("change",()=>{const d=o.name.match(/feed_in_rate_(\d+)_mode/);if(!d)return;const l=d[1],g=s.querySelector(`.feed-in-fixed-fields[data-rate-idx="${l}"]`),u=s.querySelector(`.feed-in-sensor-fields[data-rate-idx="${l}"]`);g&&(g.style.display=o.value==="fixed"?"":"none"),u&&(u.style.display=o.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const o=this.root.querySelector("#ha-entity-list");o&&De().then(({entities:d})=>{o.innerHTML=d.map(l=>`<option value="${l}"></option>`).join("")}).catch(()=>{})}s.addEventListener("submit",async o=>{o.preventDefault();const d=r();try{const{saveConfig:l}=await L(async()=>{const{saveConfig:g}=await Promise.resolve().then(()=>P);return{saveConfig:g}},void 0);await l(d),this.state.config=await V(),this.render()}catch(l){alert("Failed to save: "+(l instanceof Error?l.message:l))}});const m=this.root.querySelector("#reset-config-btn");m==null||m.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?"))try{const{resetConfig:o}=await L(async()=>{const{resetConfig:d}=await Promise.resolve().then(()=>P);return{resetConfig:d}},void 0);await o(),this.state.config=await V(),this.render()}catch(o){alert("Failed to reset: "+(o instanceof Error?o.message:o))}})}async initChart(e){var s,a;try{const{renderEnergyChart:n}=await L(async()=>{const{renderEnergyChart:u}=await import("./Charts-CD10JIPH.js");return{renderEnergyChart:u}},[]),{fetchTimeseries:r,fetchPerMeterTimeseries:i}=await L(async()=>{const{fetchTimeseries:u,fetchPerMeterTimeseries:y}=await Promise.resolve().then(()=>P);return{fetchTimeseries:u,fetchPerMeterTimeseries:y}},void 0),{start:m,end:f}=this.getDateRangeISO(),[v,o]=await Promise.all([r("1-1:1.29.0",m,f),r("1-1:2.29.0",m,f)]),d=((s=this.state.config)==null?void 0:s.reference_power_kw)??0,l=(((a=this.state.config)==null?void 0:a.meters)??[]).filter(u=>u.types.includes("production"));let g;if(l.length>1)try{const u=await i("1-1:2.29.0",m,f);u.meters&&u.meters.length>1&&(g=u.meters)}catch(u){console.warn("Per-meter timeseries fetch failed, using merged view:",u)}n(e,v,o,{unit:this.state.chartUnit,referencePowerKw:d,perMeterProduction:g,onZoomChange:(u,y)=>{this.handleChartZoomChange(u,y)}})}catch(n){console.error("Chart init failed:",n)}}async handleChartZoomChange(e,s){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd);const{fetchCustomData:a}=await L(async()=>{const{fetchCustomData:f}=await Promise.resolve().then(()=>P);return{fetchCustomData:f}},void 0),n=e.slice(0,10),r=s.slice(0,10),i=await a(n,r),m=await q("1-1:1.29.0",new Date(n+"T00:00:00").toISOString(),new Date(r+"T23:59:59.999").toISOString());this.state.range="custom",this.state.customStart=n,this.state.customEnd=r,this.state.rangeData={range:"custom",consumption:i.consumption,production:i.production,exported:i.exported??0,self_consumed:i.self_consumed??0,gas_energy:i.gas_energy??0,gas_volume:i.gas_volume??0,peak_power_kw:i.peak_power_kw??0,exceedance_kwh:i.exceedance_kwh??0,metering_point:i.metering_point??""},this.state.consumptionTimeseries=m,this.renderDashboardPartial()}catch(a){console.error("Zoom data fetch failed:",a)}}renderDashboardPartial(){var x,E;const e=this.root.querySelector(".dashboard");if(!e||!this.state.rangeData)return;const s=document.createElement("div");s.innerHTML=ke(this.state);const a=s.querySelector(".dashboard");if(!a)return;const n=e.querySelector(".range-selector"),r=a.querySelector(".range-selector");n&&r&&n.replaceWith(r);const i=e.querySelector(".custom-range-picker"),m=a.querySelector(".custom-range-picker");i&&m?i.replaceWith(m):!i&&m?(x=e.querySelector(".range-selector"))==null||x.insertAdjacentElement("afterend",m):i&&!m&&i.remove();const f=e.querySelector(".stats-grid"),v=a.querySelector(".stats-grid");f&&v&&f.replaceWith(v);const o=e.querySelector(".flow-card"),d=a.querySelector(".flow-card");o&&d&&o.replaceWith(d);const l=e.querySelector(".metrics-card"),g=a.querySelector(".metrics-card");l&&g&&l.replaceWith(g);const u=e.querySelector(".chart-header .card-title"),y=a.querySelector(".chart-header .card-title");u&&y&&u.replaceWith(y);const k=e.querySelector(".reset-zoom-btn");k&&(k.style.display=""),e.querySelectorAll("[data-range]").forEach(p=>{p.addEventListener("click",()=>{this.changeRange(p.dataset.range)})});const b=e.querySelector("#custom-start"),_=e.querySelector("#custom-end");b&&b.addEventListener("change",()=>{this.state.customStart=b.value}),_&&_.addEventListener("change",()=>{this.state.customEnd=_.value}),(E=e.querySelector("#apply-custom-range"))==null||E.addEventListener("click",()=>{this.preZoomRange=null,this.applyCustomRange()})}getDateRangeISO(){const e=new Date,s=a=>a.toISOString();switch(this.state.range){case"custom":{const a=new Date(this.state.customStart+"T00:00:00"),n=new Date(this.state.customEnd+"T23:59:59.999");return{start:s(a),end:s(n)}}case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const n=new Date(a);return n.setHours(23,59,59,999),{start:s(a),end:s(n)}}case"this_week":{const a=new Date(e),n=a.getDay()||7;return a.setDate(a.getDate()-n+1),a.setHours(0,0,0,0),{start:s(a),end:s(e)}}case"last_week":{const a=new Date(e),n=a.getDay()||7,r=new Date(a);r.setDate(a.getDate()-n),r.setHours(23,59,59,999);const i=new Date(r);return i.setDate(r.getDate()-6),i.setHours(0,0,0,0),{start:s(i),end:s(r)}}case"this_month":{const a=new Date(e.getFullYear(),e.getMonth(),1);return{start:s(a),end:s(e)}}case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),n=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s(a),end:s(n)}}case"this_year":{const a=new Date(e.getFullYear(),0,1);return{start:s(a),end:s(e)}}case"last_year":{const a=new Date(e.getFullYear()-1,0,1),n=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s(a),end:s(n)}}default:{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const n=new Date(a);return n.setHours(23,59,59,999),{start:s(a),end:s(n)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new _t(t).mount()}
