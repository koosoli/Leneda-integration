var dt=Object.defineProperty;var ut=(t,e,s)=>e in t?dt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var K=(t,e,s)=>ut(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const pt="modulepreload",mt=function(t){return"/leneda-panel/static/"+t},Fe={},V=function(e,s,a){let n=Promise.resolve();if(s&&s.length>0){let o=function(f){return Promise.all(f.map(d=>Promise.resolve(d).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const p=document.querySelector("meta[property=csp-nonce]"),m=(p==null?void 0:p.nonce)||(p==null?void 0:p.getAttribute("nonce"));n=o(s.map(f=>{if(f=mt(f),f in Fe)return;Fe[f]=!0;const d=f.endsWith(".css"),g=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${g}`))return;const i=document.createElement("link");if(i.rel=d?"stylesheet":pt,d||(i.as="script"),i.crossOrigin="",i.href=f,m&&i.setAttribute("nonce",m),document.head.appendChild(i),d)return new Promise((y,c)=>{i.addEventListener("load",y),i.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${f}`)))})}))}function r(o){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=o,window.dispatchEvent(p),!p.defaultPrevented)throw o}return n.then(o=>{for(const p of o||[])p.status==="rejected"&&r(p.reason);return e().catch(r)})};function Ue(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()}))}}function ht(){var t,e,s,a,n;try{const r=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((n=(a=(s=r==null?void 0:r.hass)==null?void 0:s.auth)==null?void 0:a.data)==null?void 0:n.access_token)??null}catch{return null}}async function F(t,e){const s=ht(),a={...e==null?void 0:e.headers,...s?{Authorization:`Bearer ${s}`}:{}},n={...e,credentials:"include",headers:a},r=await fetch(t,n);if(!r.ok){const o=r.headers.get("content-type")??"";let p="",m="";if(o.includes("application/json")){const f=await r.json().catch(()=>null);p=String((f==null?void 0:f.error)??"").trim(),m=String((f==null?void 0:f.message)??(f==null?void 0:f.error)??"").trim()}else m=(await r.text().catch(()=>"")).trim();throw p==="missing_data"||p==="no_data"||r.status===503?new Error("Missing data"):new Error(m?`API ${r.status}: ${m}`:`API ${r.status}: ${r.statusText}`)}return r.json()}async function ye(t){return F(`/leneda_api/data?range=${t}`)}async function gt(t,e){return F(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function O(t,e,s){let a=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),F(a)}async function ft(t,e,s){let a=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),F(a)}async function we(){return F("/leneda_api/sensors")}async function ae(){return F("/leneda_api/config")}async function vt(t){await F("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function yt(){await F("/leneda_api/config/reset",{method:"POST"})}async function He(){try{return await F("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function Ye(){return F("/leneda_api/credentials")}async function wt(t){const e=Ue(t);await F("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function _t(t){const e=Ue(t);return F("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function je(){return F("/leneda_api/ha-entities")}const U=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:ae,fetchCredentials:Ye,fetchCustomData:gt,fetchHAEntities:je,fetchMode:He,fetchPerMeterTimeseries:ft,fetchRangeData:ye,fetchSensors:we,fetchTimeseries:O,resetConfig:yt,saveConfig:vt,saveCredentials:wt,testCredentials:_t},Symbol.toStringTag,{value:"Module"}));function l(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function B(t){return new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function bt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}const _e=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function Ie(t){var H;const e=t.rangeData,s=S=>{if(!S)return"";const E=S.match(/^(\d{4}-\d{2}-\d{2})/);return E?E[1]:""},a=(e==null?void 0:e.consumption)??0,n=(e==null?void 0:e.production)??0,r=(e==null?void 0:e.exported)??0,o=(e==null?void 0:e.self_consumed)??0,p=(e==null?void 0:e.gas_energy)??0,m=(e==null?void 0:e.gas_volume)??0,f=(e==null?void 0:e.peak_power_kw)??0,d=s(e==null?void 0:e.start),g=s(e==null?void 0:e.end),i=(e==null?void 0:e.shared_with_me)??0,y=(e==null?void 0:e.shared)??0,c=Math.max(0,r),w=Math.max(0,(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(o>0?o:n-c)),_=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??w),b=w,x=Math.max(0,(e==null?void 0:e.grid_import)??a-w),$=a>0?a:x+w,C=$>0?Math.min(100,w/$*100):0,v=Math.max(n,x,c,y,i,_,1),h=(S,E=2.8,T=8.2)=>S>0?E+S/v*(T-E):1.8,D=S=>h(S)+1.4,P=S=>h(S)+5.4,L=(S,E=.28,T=.88)=>S>0?E+S/v*(T-E):.1,W=(S,E=.09,T=.22)=>S>0?E+S/v*(T-E):.05,I=(S,E=1.6,T=3.9)=>`${(S>0?Math.max(E,T-S/v*(T-E)):T).toFixed(2)}s`,J=(S,E=3.4,T=5.8)=>S>0?E+S/v*(T-E):3,G=S=>S>0?Math.max(18,Math.round(S/v*100)):0,q=S=>{const{path:E,value:T,gradientId:Q,colorVar:Z,filterId:Y,particleClass:N,direction:ee="forward"}=S,ne=ee==="reverse"?"1;0":"0;1";return`
      <path
        class="flow-halo ${N}"
        d="${E}"
        stroke="url(#${Q})"
        stroke-width="${P(T).toFixed(1)}"
        stroke-opacity="${W(T).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-rail ${N}"
        d="${E}"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="${D(T).toFixed(1)}"
        stroke-opacity="0.42"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-stream ${N}"
        d="${E}"
        stroke="url(#${Q})"
        stroke-width="${h(T).toFixed(1)}"
        stroke-opacity="${L(T).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      ${T>0?`
        <circle
          class="flow-particle ${N}"
          r="${J(T).toFixed(1)}"
          fill="${Z}"
          filter="url(#${Y})"
        >
          <animateMotion dur="${I(T)}" repeatCount="indefinite" path="${E}" keyPoints="${ne}" keyTimes="0;1" calcMode="linear" />
        </circle>
        <circle
          class="flow-particle flow-particle-secondary ${N}"
          r="${Math.max(2.4,J(T)-1.2).toFixed(1)}"
          fill="${Z}"
          fill-opacity="0.75"
          filter="url(#${Y})"
        >
          <animateMotion dur="${I(T)}" begin="-${(parseFloat(I(T))/2).toFixed(2)}s" repeatCount="indefinite" path="${E}" keyPoints="${ne}" keyTimes="0;1" calcMode="linear" />
        </circle>
      `:""}
    `},re=e!=null&&e.start&&(e!=null&&e.end)?`${B(e.start)} — ${B(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${B(t.customStart+"T00:00:00")} — ${B(t.customEnd+"T00:00:00")}`:((H=_e.find(S=>S.id===t.range))==null?void 0:H.label)??"Yesterday";return`
    <div class="dashboard" style="position: relative;">
    <div style="position:fixed;bottom:4px;right:4px;font-size:10px;opacity:0.5;pointer-events:none;z-index:9999;">v:2.3.0</div>

      <!-- Range Selector -->
      <div class="range-selector">
        ${_e.map(S=>`
          <button
            class="range-btn ${S.id===t.range?"active":""}"
            data-range="${S.id}"
          >${S.label}</button>
        `).join("")}
      </div>

      ${(()=>{if(!(e!=null&&e.start)||!(e!=null&&e.end))return"";try{const S=new Date(e.start),E=new Date(e.end);return isNaN(S.getTime())||isNaN(E.getTime())?"":`
            <div class="range-info-bar">
              📅 ${S.toLocaleDateString()} — ${E.toLocaleDateString()}
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
      `:d&&g?`
      <!-- Preset Period Preview -->
      <div class="custom-range-picker period-preview">
        <span class="period-preview-label">Viewed period</span>
        <label>
          <span>From</span>
          <input type="date" value="${d}" readonly aria-label="Preset period start" />
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
          <div class="stat-icon">⚡</div>
          <div class="stat-body">
            <div class="stat-label">Consumption</div>
            <div class="stat-value">${l(a)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.production">
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
            <div class="stat-value">${l(b)} <span class="stat-unit">kWh</span></div>
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
                    <span class="module-value highlight-red">${l(a)}</span>
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
                  <text x="16" y="38" class="scene-node-value">${l(x+c)} kWh</text>
                </g>

                <g class="scene-node-label" transform="translate(338, 44)">
                  <rect width="124" height="48" rx="16" fill="var(--clr-overlay)" stroke="rgba(63, 185, 80, 0.24)" />
                  <text x="16" y="20" class="scene-node-kicker">Solar</text>
                  <text x="16" y="36" class="scene-node-value">${l(n)} kWh</text>
                </g>

                <g class="scene-node-label" transform="translate(600, 108)">
                  <rect width="146" height="52" rx="16" fill="var(--clr-overlay)" stroke="rgba(88, 166, 255, 0.24)" />
                  <text x="16" y="22" class="scene-node-kicker">Community</text>
                  <text x="16" y="38" class="scene-node-value">${l(y+i)} kWh</text>
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
                    <text text-anchor="middle" y="18" class="house-core-value">${l(C,0)}%</text>
                  </g>
                </g>

                ${q({path:"M 560 98 C 520 102 474 130 434 182",value:_,gradientId:"flow-solar",colorVar:"var(--clr-production)",filterId:"glow-green",particleClass:"flow-solar"})}

                ${q({path:"M 146 224 C 226 224 298 224 354 214",value:x,gradientId:"flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"glow-red",particleClass:"flow-grid-in"})}

                ${q({path:"M 446 246 C 386 292 286 314 146 312",value:c,gradientId:"flow-grid-out",colorVar:"var(--clr-export)",filterId:"glow-blue",particleClass:"flow-grid-out"})}

                ${q({path:"M 450 206 C 514 184 582 184 650 206",value:y,gradientId:"flow-shared-out",colorVar:"var(--clr-export)",filterId:"glow-blue",particleClass:"flow-shared-out"})}

                ${q({path:"M 650 236 C 586 252 522 254 448 238",value:i,gradientId:"flow-shared-in",colorVar:"var(--clr-primary)",filterId:"glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}
              </svg>
            </div>

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${l($)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${l(C,0)}% solar supplied${f>0?` · Peak ${l(f,2)} kW`:""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${l(w)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${G(w)}%;"></span></div>
                  <p>Energy used inside the house${i>0?", including received community energy":""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${l(x)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${G(x)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${l(c)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${G(c)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${l(y+i)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${G(y+i)}%;"></span></div>
                  <p>Sent ${l(y)} kWh · received ${l(i)} kWh.</p>
                </div>
              </div>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${l(w)} kWh used in the house</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${l(x)} kWh bought from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${l(c)} kWh sent back to the market</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${l(y)} kWh sent · ${l(i)} kWh received${i>0?" (included in solar to home)":""}</span>
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
              <span class="metric-value">${l(C,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${C}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Consumed</span>
              <span class="metric-value">${l(b)} kWh</span>
            </div>
          </div>
          ${f>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${l(f,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label">${((e==null?void 0:e.exceedance_kwh)??0)>0?"⚠️":"✅"} Exceedance</span>
              <span class="metric-value">${l((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${p>0||m>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${l(p)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${l(m)} m³</span>
            </div>
          </div>
          `:""}
        </div>
      </div>
      </div>

      <!-- Chart -->
      <div class="card chart-card">
        <div class="chart-header">
          <h3 class="card-title"><span class="title-icon">📉</span> Energy Profile — ${re}</h3>
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
  `}const Ae={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function $t(t){return Ae[t]?Ae[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function kt(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],s=[],a=[],n=[],r=[];for(const p of t.sensors){const m=p.key;m.startsWith("c_")||m==="1-1:1.29.0"||m==="1-1:3.29.0"?e.push(p):m.startsWith("p_")||m==="1-1:2.29.0"||m==="1-1:4.29.0"?s.push(p):m.startsWith("s_")||m.startsWith("1-65:")?a.push(p):m.startsWith("g_")||m.startsWith("7-")?n.push(p):r.push(p)}const o=(p,m,f,d)=>f.length?`
      <div class="card sensor-group">
        <h3 class="card-title"><span class="title-icon">${m}</span> ${p} <span class="badge">${f.length}</span></h3>
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
              ${f.map(g=>`
                <tr>
                  <td class="sensor-name">${$t(g.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${d});">${l(g.value)}</td>
                  <td class="sensor-unit">${g.unit}</td>
                  <td class="sensor-peak">${g.peak_timestamp?bt(g.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
      ${o("Electricity Consumption","⚡",e,"consumption")}
      ${o("Energy Production","☀️",s,"production")}
      ${o("Energy Sharing","🔗",a,"self")}
      ${o("Gas","🔥",n,"gas")}
      ${o("Other","📊",r,"text")}
    </section>
  `}const Ve=[{kw:3,fixedMonthlyFee:7.42},{kw:7,fixedMonthlyFee:12.84},{kw:12,fixedMonthlyFee:19.61},{kw:17,fixedMonthlyFee:26.39},{kw:27,fixedMonthlyFee:39.94},{kw:43,fixedMonthlyFee:61.62},{kw:70,fixedMonthlyFee:98.2},{kw:100,fixedMonthlyFee:138.85},{kw:150,fixedMonthlyFee:206.6,existingContractsOnly:!0},{kw:200,fixedMonthlyFee:274.35,existingContractsOnly:!0}];function ie(t){if(!t)return null;const e=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(e){const[,a,n,r]=e;return new Date(Number(a),Number(n)-1,Number(r))}const s=new Date(t);return Number.isNaN(s.getTime())?null:new Date(s.getFullYear(),s.getMonth(),s.getDate())}function Oe(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function xt(t,e,s,a,n){const r=new Date,o=ie(a),p=ie(n);let m=o,f=p;if(!m||!f)switch(t){case"yesterday":{const c=new Date(r);c.setDate(c.getDate()-1),m=new Date(c.getFullYear(),c.getMonth(),c.getDate()),f=new Date(m);break}case"this_week":{const c=new Date(r),w=c.getDay()||7;m=new Date(c.getFullYear(),c.getMonth(),c.getDate()-w+1),f=new Date(r.getFullYear(),r.getMonth(),r.getDate());break}case"last_week":{const c=new Date(r),w=c.getDay()||7,_=new Date(c.getFullYear(),c.getMonth(),c.getDate()-w+1);m=new Date(_.getFullYear(),_.getMonth(),_.getDate()-7),f=new Date(_.getFullYear(),_.getMonth(),_.getDate()-1);break}case"this_month":{m=new Date(r.getFullYear(),r.getMonth(),1),f=new Date(r.getFullYear(),r.getMonth(),r.getDate());break}case"last_month":{m=new Date(r.getFullYear(),r.getMonth()-1,1),f=new Date(r.getFullYear(),r.getMonth(),0);break}case"this_year":{m=new Date(r.getFullYear(),0,1),f=new Date(r.getFullYear(),r.getMonth(),r.getDate());break}case"last_year":{m=new Date(r.getFullYear()-1,0,1),f=new Date(r.getFullYear()-1,11,31);break}case"custom":{m=ie(e)??new Date(r.getFullYear(),r.getMonth(),r.getDate()),f=ie(s)??new Date(m);break}default:{m=new Date(r.getFullYear(),r.getMonth(),r.getDate()-1),f=new Date(m);break}}if(f<m){const c=m;m=f,f=c}let d=0,g=0;const i=new Date(m);for(;i<=f;){const c=new Date(i.getFullYear(),i.getMonth()+1,0).getDate();g+=1/c,d+=1,i.setDate(i.getDate()+1)}const y=m.getFullYear()===f.getFullYear()&&m.getMonth()===f.getMonth()&&m.getDate()===1&&f.getDate()===new Date(f.getFullYear(),f.getMonth()+1,0).getDate();return{days:d,factor:g,label:y?"full month":`${d} day${d===1?"":"s"}`}}function St(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function Ge(t){const[e,s]=t.split(":").map(a=>parseInt(a,10)||0);return e*60+s}function Xe(t,e,s,a){if(!St(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),r=Ge(s),o=Ge(a);return r===o?!0:r<o?n>=r&&n<o:n>=r||n<o}function Ct(t,e){return e.find(s=>Xe(t,s.day_group,s.start_time,s.end_time))}function Dt(t,e){return e.find(s=>Xe(t,s.day_group,s.start_time,s.end_time))}function qe(t,e,s,a,n,r=[]){var g;const o=new Map;let p=0,m=0,f=0;const d=new Map;for(const i of r){const y=Number(i.value)||0;d.set(i.startedAt,(d.get(i.startedAt)??0)+y)}for(const i of t){const y=Number(i.value)||0,c=y*.25,w=d.get(i.startedAt)??0,_=Math.max(0,y-w),b=new Date(i.startedAt);if(Number.isNaN(b.getTime()))continue;const x=Ct(b,a),$=Dt(b,n),C=(x==null?void 0:x.rate)??e,v=((g=x==null?void 0:x.label)==null?void 0:g.trim())||"Base tariff",h=($==null?void 0:$.reference_power_kw)??s;p+=c*C,f=Math.max(f,_),_>h&&(m+=(_-h)*.25);const D=`${v}__${C}`,P=o.get(D);P?P.kwh+=c:o.set(D,{label:v,rate:C,kwh:c})}return{energyCost:p,exceedanceKwh:m,peakPowerKw:f,rateBreakdown:Array.from(o.values()).sort((i,y)=>i.label.localeCompare(y.label))}}function Et(t){var We;const e=t.config,s=t.rangeData;if(!e||!s)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const a=s.consumption||0,n=s.production||0,r=s.exported||0,o=Math.max(0,r),p=Math.max(0,s.solar_to_home??s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:n-o)),m=Math.max(0,s.grid_import??a-p),f=s.peak_power_kw||0,d=e.reference_power_kw||5,g=s.exceedance_kwh||0,i=s.gas_energy||0,y=s.gas_volume||0,c=i>0||y>0,w=e.consumption_rate_windows??[],_=e.reference_power_windows??[],b=t.consumptionTimeseries?qe(t.consumptionTimeseries.items,e.energy_variable_rate,d,w,_,((We=t.productionTimeseries)==null?void 0:We.items)??[]):null,x=w.length>0&&!!b&&Math.abs(m-a)<.01,$=_.length>0&&!!b,C=$?b.peakPowerKw:f,v=$?b.exceedanceKwh:g,h=Oe(s.start??t.customStart),D=Oe(s.end??t.customEnd),{days:P,factor:L,label:W}=xt(t.range,t.customStart,t.customEnd,s.start,s.end),I=e.energy_fixed_fee*L,J=e.network_metering_rate*L,G=e.network_power_ref_rate*L,q=x?b.energyCost:m*e.energy_variable_rate,re=m*e.network_variable_rate,H=v*e.exceedance_rate,S=e.meter_monthly_fees??[],E=S.reduce((u,R)=>u+(R.fee||0),0)*L,T=m*e.compensation_fund_rate,Q=m*e.electricity_tax_rate,Z=Math.max(0,e.connect_discount??0)*L,Y=I+q+J+G+re+H+E+T+Q-Z,N=Y*e.vat_rate,ee=Y+N,ne=(e.meters??[]).filter(u=>u.types.includes("production")),Je=e.feed_in_rates??[],j=ne.map(u=>{const R=Je.find(A=>A.meter_id===u.id);if(R){const A=R.mode==="sensor"&&R.sensor_value!=null&&isFinite(R.sensor_value),z=A?R.sensor_value:isFinite(R.tariff)?R.tariff:e.feed_in_tariff,Re=A?`Sensor (${l(z,4)} ${e.currency??"EUR"}/kWh)`:"Fixed tariff";return{meterId:u.id,shortId:u.id?"…"+u.id.slice(-8):"Meter",rate:z,label:Re,mode:R.mode}}return{meterId:u.id,shortId:u.id?"…"+u.id.slice(-8):"Meter",rate:e.feed_in_tariff,label:"Fixed tariff",mode:"fixed"}}),le=j.filter(u=>isFinite(u.rate)&&u.rate>0),be=le.length>0?le.reduce((u,R)=>u+R.rate,0)/le.length:e.feed_in_tariff,te=o*be,X=j.length>1,se=p,$e=se*(e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate),ke=$e*e.vat_rate,ce=$e+ke,xe=ce+te,de=ee-te,Se=(e.gas_fixed_fee??6.5)*L,Ce=i*(e.gas_variable_rate??.055),De=(e.gas_network_fee??4.8)*L,Ee=i*(e.gas_network_variable_rate??.012),Te=i*(e.gas_tax_rate??.001),ue=Se+Ce+De+Ee+Te,Me=ue*(e.gas_vat_rate??.08),pe=ue+Me,M=e.currency||"EUR",k=u=>`${l(u,2)} ${M}`,me=Ve.find(u=>Math.abs(u.kw-d)<.05),Qe=Y-G-H,he=b?Ve.map(u=>{var Pe;const R=qe(t.consumptionTimeseries.items,e.energy_variable_rate,u.kw,w,_,((Pe=t.productionTimeseries)==null?void 0:Pe.items)??[]),A=u.fixedMonthlyFee*L,z=R.exceedanceKwh*e.exceedance_rate,Le=(Qe+A+z)*(1+e.vat_rate);return{...u,fixedCharge:A,exceedanceKwh:R.exceedanceKwh,exceedanceCharge:z,total:Le,deltaVsCurrent:Le-ee}}):[],oe=he.reduce((u,R)=>!u||R.total<u.total?R:u,null),et=u=>Math.abs(u)<.005?"Current total":`${u>0?"+":"-"}${k(Math.abs(u))}`,ge=s.start&&s.end?`${B(s.start)} — ${B(s.end)}`:t.range.replace("_"," ").replace(/\b\w/g,u=>u.toUpperCase()),tt=v>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${l(C,1)} kW</strong> &mdash; ${$?"Reference power windows active":`Reference power level: ${l(d,1)} kW`}</p>
        <p>Exceedance volume: <strong>${l(v,2)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${k(H)}</p>
      </div>`:"",st=x?b.rateBreakdown.map(u=>`
            <tr>
              <td>${u.label} (${l(u.kwh)} kWh)</td>
              <td style="text-align: right;">${l(u.rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${k(u.kwh*u.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Supplier rate (${l(m)} kWh bought from grid)</td>
              <td style="text-align: right;">${l(e.energy_variable_rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${k(q)}</td>
            </tr>
          `,at=$?`Reference power windows active (${_.length})`:`${l(d,1)} kW`,rt=x?`Time-of-use windows active (${w.length})`:`${l(e.energy_variable_rate,4)} ${M}/kWh`,nt=he.map(u=>{const R=!!oe&&u.kw===oe.kw,A=!!me&&u.kw===me.kw,z=u.deltaVsCurrent<-.005?"comparison-delta-savings":u.deltaVsCurrent>.005?"comparison-delta-extra":"";return`
            <tr class="${R?"reference-power-best-row":""}${A?" reference-power-current-row":""}">
              <td>
                <div class="reference-level-cell">
                  <span class="reference-level-kw">${l(u.kw,0)} kW</span>
                  ${R?'<span class="reference-level-badge best">Financially optimal</span>':""}
                  ${A?'<span class="reference-level-badge current">Current</span>':""}
                  ${u.existingContractsOnly?'<span class="reference-level-badge legacy">Existing contracts</span>':""}
                </div>
              </td>
              <td style="text-align: right;">${k(u.fixedCharge)}</td>
              <td style="text-align: right;">${k(u.exceedanceCharge)}</td>
              <td style="text-align: right;"><strong>${k(u.total)}</strong></td>
              <td class="${z}" style="text-align: right;">${et(u.deltaVsCurrent)}</td>
            </tr>
          `}).join(""),ot=he.length>0?`
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${$?"Configured reference power windows stay active in this comparison.":"One reference power level is applied to the full selected period."}
              ${me?"":`Your current configuration uses ${l(d,1)} kW, which is outside the standard Creos low-voltage reference power levels.`}
            </p>
          </div>
          ${oe?`<div class="reference-power-optimum">
                <span class="reference-level-badge best">Financially optimal: ${l(oe.kw,0)} kW</span>
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
            ${nt}
          </tbody>
        </table>
      </div>
    `:`
      <div class="card reference-power-card">
        <p class="muted">Reference power level comparison requires 15-minute load-curve data for the selected period.</p>
      </div>
    `,it=`
      <div class="range-selector">
        ${_e.map(u=>`
          <button
            class="range-btn ${u.id===t.range?"active":""}"
            data-range="${u.id}"
          >${u.label}</button>
        `).join("")}
      </div>
    `,lt=s.start&&s.end?(()=>{const u=new Date(s.start),R=new Date(s.end);return Number.isNaN(u.getTime())||Number.isNaN(R.getTime())?"":`
        <div class="range-info-bar">
          Period: ${u.toLocaleDateString()} - ${R.toLocaleDateString()}
        </div>
      `})():"",ct=t.range==="custom"?`
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
    `:h&&D?`
        <div class="custom-range-picker period-preview">
          <span class="period-preview-label">Viewed period</span>
          <label>
            <span>From</span>
            <input type="date" value="${h}" readonly aria-label="Preset period start" />
          </label>
          <label>
            <span>To</span>
            <input type="date" value="${D}" readonly aria-label="Preset period end" />
          </label>
        </div>
      `:"";return`
    <section class="invoice-view">
      ${it}
      ${lt}
      ${ct}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Invoice Estimate &mdash; ${ge}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the currently selected period.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${l(a)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${l(m)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${l(n)} kWh produced</span>
          ${o>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${l(o)} kWh exported</span>`:""}
          ${c?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${l(i)} kWh gas (${l(y)} m³)</span>`:""}
        </div>
      </div>

      ${tt}

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
              <td style="text-align: right;">${l(e.energy_fixed_fee,2)} ${M}/mo</td>
              <td style="text-align: right;">${k(I)}</td>
            </tr>
            ${st}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${W})</span></td>
              <td style="text-align: right;">${l(e.network_metering_rate,2)} ${M}/mo</td>
              <td style="text-align: right;">${k(J)}</td>
            </tr>
            <tr>
              <td>Reference power level (${at}) <span class="muted">(${W})</span></td>
              <td style="text-align: right;">${l(e.network_power_ref_rate,2)} ${M}/mo</td>
              <td style="text-align: right;">${k(G)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${l(m)} kWh bought from grid)</td>
              <td style="text-align: right;">${l(e.network_variable_rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${k(re)}</td>
            </tr>
            <tr class="${v>0?"exceedance-row":""}">
              <td>Exceedance charge (${l(v,2)} kWh above the reference power level)</td>
              <td style="text-align: right;">${l(e.exceedance_rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${k(H)}</td>
            </tr>

            ${S.filter(u=>u.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${S.filter(u=>u.fee>0).map(u=>`
            <tr>
              <td>${u.label||"…"+u.meter_id.slice(-8)} <span class="muted">(${W})</span></td>
              <td style="text-align: right;">${l(u.fee,2)} ${M}/mo</td>
              <td style="text-align: right;">${k(u.fee*L)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${l(e.compensation_fund_rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${k(T)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${l(e.electricity_tax_rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${k(Q)}</td>
            </tr>
            ${Z>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            <tr>
              <td>Monthly Discount <span class="muted">(${W})</span></td>
              <td style="text-align: right;">-${l(Math.max(0,e.connect_discount??0),2)} ${M}/mo</td>
              <td style="text-align: right;">-${k(Z)}</td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${k(Y)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${l(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${k(N)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Costs</strong></td>
              <td style="text-align: right;"><strong>${k(ee)}</strong></td>
            </tr>

            ${o>0?`
            <tr class="section-label revenue-section"><td colspan="3">Feed-in Revenue</td></tr>
            ${j.map(u=>`
            <tr class="revenue-row">
              <td>Exported (${X?u.shortId:l(o)+" kWh"})</td>
              <td style="text-align: right;">${u.label}<br/>${l(u.rate,4)} ${M}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${k(X?o/j.length*u.rate:o*u.rate)}</td>
            </tr>
            `).join("")}
            ${X?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${l(o)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${l(be,4)} ${M}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${k(te)}</td>
            </tr>
            `:""}
            <tr class="net-total-row">
              <td colspan="2"><strong>Net Balance</strong></td>
              <td style="text-align: right;"><strong>${k(de)}</strong></td>
            </tr>
            `:""}
          </tbody>
        </table>
      </div>

      ${ot}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${l(m)} kWh), not total home usage.
          Supplier pricing: ${rt}.
          Fixed monthly charges are prorated across the viewed period (${P} days, ${W}, equivalent to ${l(L,2)} monthly charges).
          Peak load (${l(C,1)} kW) is compared against ${$?"your configured reference power windows":`your reference power level (${l(d,1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${l(e.exceedance_rate,4)} ${M}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${c?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${ge}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${l(i)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${l(y)} m³</span>
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
              <td style="text-align: right;">${l(e.gas_fixed_fee??6.5,2)} ${M}/mo</td>
              <td style="text-align: right;">${k(Se)}</td>
            </tr>
            <tr>
              <td>Energy (${l(i)} kWh)</td>
              <td style="text-align: right;">${l(e.gas_variable_rate??.055,4)} ${M}/kWh</td>
              <td style="text-align: right;">${k(Ce)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${W})</span></td>
              <td style="text-align: right;">${l(e.gas_network_fee??4.8,2)} ${M}/mo</td>
              <td style="text-align: right;">${k(De)}</td>
            </tr>
            <tr>
              <td>Network Variable (${l(i)} kWh)</td>
              <td style="text-align: right;">${l(e.gas_network_variable_rate??.012,4)} ${M}/kWh</td>
              <td style="text-align: right;">${k(Ee)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${l(i)} kWh)</td>
              <td style="text-align: right;">${l(e.gas_tax_rate??.001,4)} ${M}/kWh</td>
              <td style="text-align: right;">${k(Te)}</td>
            </tr>

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${k(ue)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${l((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${k(Me)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${k(pe)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Energy Total: ${k(de+pe)}</strong>
          (Electricity: ${k(de)} + Gas: ${k(pe)})
        </p>
      </div>
      `:""}

      ${n>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Revenue &mdash; ${ge}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${k(xe)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${k(ce)}</div>
            <div class="solar-stat-label">Savings (self-consumed)</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${k(te)}</div>
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
              <td>Energy not bought (${l(se)} kWh)</td>
              <td style="text-align: right;">${l(e.energy_variable_rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${k(se*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${l(e.network_variable_rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${k(se*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${l(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${k(se*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${l(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${k(ke)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${k(ce)}</strong></td>
            </tr>

            ${o>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${j.map(u=>`
            <tr>
              <td>Sold to grid ${X?`(${u.shortId})`:`(${l(o)} kWh)`}</td>
              <td style="text-align: right;">${u.label}<br/>${l(u.rate,4)} ${M}/kWh</td>
              <td style="text-align: right;">${k(X?o/j.length*u.rate:o*u.rate)}</td>
            </tr>
            `).join("")}
            ${X?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${k(te)}</strong></td>
            </tr>
            `:""}
            `:""}

            <tr class="total-row solar-total-row">
              <td colspan="2"><strong>💰 Total Solar Panel Value</strong></td>
              <td style="text-align: right;"><strong>${k(xe)}</strong></td>
            </tr>
          </tbody>
        </table>

        <p class="muted" style="margin-top: var(--sp-3); font-size: var(--text-xs); line-height: var(--lh-relaxed);">
          Self-consumption savings = energy you produced and used yourself instead of buying from the grid.
          Feed-in revenue = money earned by selling surplus production.
          ${j.some(u=>u.mode==="sensor")?"Market price sourced from Home Assistant sensor.":"Using fixed feed-in tariff — configure a market price sensor in Settings for real-time rates."}
          ${X?"Revenue split equally across production meters (per-meter export data not yet available).":""}
        </p>
      </div>
      `:""}
    </section>
  `}const Tt=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],Mt=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Reference Power Fixed Charge",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"connect_discount",label:"Monthly Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],Wt={consumption:"Power Consumption",production:"Power Production",gas:"Gas Consumption"},ze={consumption:"⚡",production:"☀️",gas:"🔥"};function Rt(t){return t.map(e=>`<span class="meter-type-badge meter-type-${e}">${ze[e]??""} ${Wt[e]??e}</span>`).join(" ")}function Ne(t,e,s){const a=t+1;return s?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${a}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${Rt(e.types)}</div>
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
  `}function Ze(t){return Tt.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function Lt(t,e){return`
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
            ${Ze(e.day_group??"all")}
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
  `}function Pt(t,e){return`
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
            ${Ze(e.day_group??"all")}
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
  `}function Ft(t,e="ha",s){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const a=e==="standalone"?(s==null?void 0:s.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let n="";if(e==="standalone"){const v=a.map((h,D)=>Ne(D,h,!1)).join("");n=`
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
            ${v.length>0?v.map((D,P)=>Ne(P,D,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const r=v=>v.map(h=>{const D=t?t[h.key]??"":"";return`
        <div class="form-row">
          <label for="cfg-${h.key}">${h.label}</label>
          <div class="input-group">
            <input
              id="cfg-${h.key}"
              name="${h.key}"
              type="${h.type}"
              ${h.type==="number"?`step="${h.step}"`:""}
              value="${D}"
            />
            ${h.unit?`<span class="input-unit">${h.unit}</span>`:""}
          </div>
        </div>
      `}).join(""),o=((t==null?void 0:t.meters)??[]).filter(v=>v.types.includes("production")),p=(t==null?void 0:t.feed_in_rates)??[],m=e==="ha";function f(v){return p.find(h=>h.meter_id===v)??{meter_id:v,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:""}}const d=o.length===0?'<p class="muted">No production meters configured — add a meter with Power Production type above.</p>':o.map((v,h)=>{const D=f(v.id),P=v.id?"…"+v.id.slice(-8):`Meter ${h+1}`;return`
          <div class="feed-in-meter-card" data-meter-idx="${h}" data-meter-id="${v.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${P}</span>
              <input type="hidden" name="feed_in_rate_${h}_meter_id" value="${v.id}" />
            </div>
            <div class="form-row">
              <label>Pricing Mode</label>
              <div class="feed-in-mode-toggle">
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${h}_mode" value="fixed" ${D.mode==="fixed"?"checked":""} />
                  <span class="mode-label">💶 Fixed Tariff</span>
                </label>
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${h}_mode" value="sensor" ${D.mode==="sensor"?"checked":""} />
                  <span class="mode-label">📡 HA Sensor</span>
                </label>
              </div>
            </div>
            <div class="feed-in-fixed-fields" data-rate-idx="${h}" style="${D.mode==="fixed"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${h}_tariff">Feed-in Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${h}_tariff" name="feed_in_rate_${h}_tariff" type="number" step="0.0001" value="${D.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
              </div>
            </div>
            <div class="feed-in-sensor-fields" data-rate-idx="${h}" style="${D.mode==="sensor"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${h}_sensor">Market Price Sensor</label>
                <div class="input-group sensor-picker-group">
                  <input
                    id="cfg-feed_in_rate_${h}_sensor"
                    name="feed_in_rate_${h}_sensor_entity"
                    type="text"
                    value="${D.sensor_entity}"
                    placeholder="${m?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${m&&h===0?'<datalist id="ha-entity-list"></datalist>':""}
              </div>
              <div class="form-row">
                <label for="cfg-feed_in_rate_${h}_fallback">Fallback Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${h}_fallback" name="feed_in_rate_${h}_fallback_tariff" type="number" step="0.0001" value="${D.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
                <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                  Used when the sensor is unavailable.
                </p>
              </div>
            </div>
          </div>
        `}).join(""),g=((t==null?void 0:t.meters)??[]).some(v=>v.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),i=(t==null?void 0:t.consumption_rate_windows)??[],y=(t==null?void 0:t.reference_power_windows)??[],c=(t==null?void 0:t.meters)??[],w=(t==null?void 0:t.meter_monthly_fees)??[];function _(v){return w.find(h=>h.meter_id===v)??{meter_id:v,label:"",fee:0}}const b=c.length===0?'<p class="muted">No meters configured.</p>':c.map((v,h)=>{const D=_(v.id),P=v.id?"…"+v.id.slice(-8):`Meter ${h+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${v.types.map(W=>ze[W]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${P}</code>
              <input type="hidden" name="meter_fee_${h}_meter_id" value="${v.id}" />
            </div>
            <div class="form-row" style="margin-bottom: var(--sp-2);">
              <label for="cfg-meter_fee_${h}_label">Label</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${h}_label" name="meter_fee_${h}_label" type="text" value="${D.label||`Meter ${h+1} metering fee`}" placeholder="e.g. Smart meter rental" />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-meter_fee_${h}_fee">Monthly Fee</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${h}_fee" name="meter_fee_${h}_fee" type="number" step="0.01" value="${D.fee}" />
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
      ${i.length>0?i.map((v,h)=>Lt(h,v)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,$=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${y.length>0?y.map((v,h)=>Pt(h,v)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,C=Mt.map(v=>{if(v.title==="Gas Billing"&&!g||v.title==="Meter Fees"&&c.length<2)return"";let h;return v.title==="Feed-in / Selling"?h=d:v.title==="Time-of-Use Tariffs"?h=x:v.title==="Reference Power Windows"?h=$:v.title==="Discounts"?h=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as a monthly credit. The dashboard prorates it to the selected period and subtracts it before VAT.
      </p>`+r(v.fields):v.title==="Meter Fees"?h=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+b:h=r(v.fields),`
    <div class="form-section">
      <div class="form-section-title">${v.icon}  ${v.title}</div>
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
  `}function fe(t,e,s=!1,a="dark"){return`
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
  `}const Ke="leneda_credentials",Be="leneda_theme";function It(){try{const t=localStorage.getItem(Ke);if(t)return JSON.parse(t)}catch{}return null}function ve(t){try{localStorage.setItem(Ke,JSON.stringify(t))}catch{}}function At(){var t;try{const e=localStorage.getItem(Be);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function Vt(t){try{localStorage.setItem(Be,t)}catch{}}class Ot{constructor(e){K(this,"root");K(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartUnit:"kwh",rangeData:null,consumptionTimeseries:null,productionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:At()});K(this,"preZoomRange",null);K(this,"preZoomCustomStart","");K(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await He();if(this.state.mode=e.mode,e.mode==="standalone"){const s=It();if(s&&(this.state.credentials=s),!e.configured&&!s){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&s)try{const{saveCredentials:a}=await V(async()=>{const{saveCredentials:n}=await Promise.resolve().then(()=>U);return{saveCredentials:n}},void 0);await a(s)}catch{}if(!s)try{this.state.credentials=await Ye()}catch{}}await this.loadData()}toDisplayError(e,s="Failed to load data"){const a=e instanceof Error?e.message:String(e??"").trim(),n=a.toLowerCase();return n.includes("missing data")||n.includes("no_data")||n.includes("no data")?"Missing data":a||s}clearRangeStateWithError(e,s="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.state.error=this.toDisplayError(e,s)}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.render();try{const[e,s,a]=await Promise.all([ye(this.state.range),we(),ae()]),{start:n,end:r}=this.getDateRangeISO(),[o,p]=await Promise.all([O("1-1:1.29.0",n,r),O("1-1:2.29.0",n,r)]);this.state.rangeData=e,this.state.consumptionTimeseries=o,this.state.productionTimeseries=p,this.state.sensors=s,this.state.config=a}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render()}}async changeRange(e){if(this.preZoomRange=null,this.state.range=e,e==="custom"){if(!this.state.customStart||!this.state.customEnd){const s=new Date;s.setDate(s.getDate()-1);const a=new Date(s);a.setDate(a.getDate()-6),this.state.customStart=a.toISOString().slice(0,10),this.state.customEnd=s.toISOString().slice(0,10)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:s,end:a}=this.getDateRangeISO(),[n,r,o]=await Promise.all([ye(e),O("1-1:1.29.0",s,a),O("1-1:2.29.0",s,a)]);this.state.rangeData=n,this.state.consumptionTimeseries=r,this.state.productionTimeseries=o}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render()}}async applyCustomRange(){this.preZoomRange=null;const{customStart:e,customEnd:s}=this.state;if(!(!e||!s)){this.state.error=null,this.state.loading=!0,this.render();try{const{fetchCustomData:a}=await V(async()=>{const{fetchCustomData:p}=await Promise.resolve().then(()=>U);return{fetchCustomData:p}},void 0),[n,r,o]=await Promise.all([a(e,s),O("1-1:1.29.0",new Date(e+"T00:00:00").toISOString(),new Date(s+"T23:59:59.999").toISOString()),O("1-1:2.29.0",new Date(e+"T00:00:00").toISOString(),new Date(s+"T23:59:59.999").toISOString())]);this.state.rangeData={range:"custom",consumption:n.consumption,production:n.production,exported:n.exported??0,self_consumed:n.self_consumed??0,grid_import:n.grid_import,solar_to_home:n.solar_to_home,direct_solar_to_home:n.direct_solar_to_home,shared:n.shared,shared_with_me:n.shared_with_me,gas_energy:n.gas_energy??0,gas_volume:n.gas_volume??0,peak_power_kw:n.peak_power_kw??0,exceedance_kwh:n.exceedance_kwh??0,metering_point:n.metering_point??"",start:n.start,end:n.end},this.state.consumptionTimeseries=r,this.state.productionTimeseries=o}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render()}}}changeTab(e){this.state.tab=e,this.render(),e==="dashboard"&&!this.state.rangeData&&!this.state.loading&&this.loadData(),e==="sensors"&&!this.state.sensors&&we().then(s=>{this.state.sensors=s,this.render()}),e==="settings"&&!this.state.config&&ae().then(s=>{this.state.config=s,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,Vt(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}printInvoice(){var o,p;const e=document.title,a=`Leneda-invoice-${(o=this.state.rangeData)!=null&&o.start&&((p=this.state.rangeData)!=null&&p.end)?`${this.state.rangeData.start.slice(0,10)}_to_${this.state.rangeData.end.slice(0,10)}`:this.state.range}`.replace(/[^a-z0-9_-]+/gi,"-");let n=!1;const r=()=>{n||(n=!0,document.title=e,window.removeEventListener("afterprint",r))};document.title=a,window.addEventListener("afterprint",r,{once:!0}),window.print(),window.setTimeout(r,1e3)}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const s=this.root.querySelector(".main-content");s?s.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}render(){var o;const{tab:e,loading:s,error:a,theme:n}=this.state;if(s&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${fe(e,p=>{},!1,n)}
          <main class="main-content">
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `,this.attachNavListeners();return}if(a&&!this.state.rangeData){const p=a.toLowerCase().includes("missing data");this.root.innerHTML=`
        <div class="app-shell">
          ${fe(e,m=>{},!1,n)}
          <main class="main-content">
            <div class="error-state">
              <h2>${p?"Missing Data":"Connection Error"}</h2>
              <p>${p?"The selected period could not be loaded because data is missing.":a}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(o=this.root.querySelector("#retry-btn"))==null||o.addEventListener("click",()=>this.loadData());return}let r="";switch(e){case"dashboard":r=Ie(this.state);break;case"sensors":r=kt(this.state.sensors);break;case"invoice":r=Et(this.state);break;case"settings":r=Ft(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${fe(e,p=>this.changeTab(p),this.state.isMenuOpen,n)}
        <main class="main-content">
          ${s?'<div class="loading-bar"></div>':""}
          ${r}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachInvoiceListeners(),this.attachSettingsListeners()}attachNavListeners(){var e,s;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(s=this.root.querySelector("[data-theme-toggle]"))==null||s.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.tab;this.changeTab(n)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(o=>{o.addEventListener("click",()=>{const p=o.dataset.range;this.changeRange(p)})});const s=this.root.querySelector("#custom-start"),a=this.root.querySelector("#custom-end");s&&s.addEventListener("change",()=>{this.state.customStart=s.value}),a&&a.addEventListener("change",()=>{this.state.customEnd=a.value});const n=this.root.querySelector("#apply-custom-range");if(n==null||n.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(o=>{o.addEventListener("click",()=>{const p=o.dataset.chartUnit;p!==this.state.chartUnit&&(this.state.chartUnit=p,this.render())})}),!e){const o=this.root.querySelector("#energy-chart");o&&this.state.rangeData&&this.initChart(o)}const r=this.root.querySelector(".reset-zoom-btn");r==null||r.addEventListener("click",async()=>{const{resetChartZoom:o}=await V(async()=>{const{resetChartZoom:p}=await import("./Charts-CTuzU3zd.js");return{resetChartZoom:p}},[]);if(o(),r.style.display="none",this.preZoomRange!==null){const p=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",p==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(p)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachInvoiceListeners(){var e;(e=this.root.querySelector("#print-invoice-btn"))==null||e.addEventListener("click",()=>{this.printInvoice()})}attachSettingsListeners(){var m,f;const e=this.root.querySelector("#credentials-form");if(e){const d=this.root.querySelector("#add-meter-btn");d==null||d.addEventListener("click",()=>{var w,_;const y=new FormData(e),c=g(y);if(c.length<10){c.push({id:"",types:["consumption"]});const b={api_key:y.get("api_key")||((w=this.state.credentials)==null?void 0:w.api_key)||"",energy_id:y.get("energy_id")||((_=this.state.credentials)==null?void 0:_.energy_id)||"",meters:c};this.state.credentials=b,ve(b),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach(y=>{y.addEventListener("click",()=>{var x,$;const c=parseInt(y.dataset.meter??"0",10),w=new FormData(e),_=g(w);_.splice(c,1);const b={api_key:w.get("api_key")||((x=this.state.credentials)==null?void 0:x.api_key)||"",energy_id:w.get("energy_id")||(($=this.state.credentials)==null?void 0:$.energy_id)||"",meters:_};this.state.credentials=b,ve(b),this.renderPreserveMainScroll()})});const g=y=>{var w,_,b;const c=[];for(let x=0;x<10;x++){const $=y.get(`meter_${x}_id`);if($===null)break;const C=[];(w=e.querySelector(`[name="meter_${x}_consumption"]`))!=null&&w.checked&&C.push("consumption"),(_=e.querySelector(`[name="meter_${x}_production"]`))!=null&&_.checked&&C.push("production"),(b=e.querySelector(`[name="meter_${x}_gas"]`))!=null&&b.checked&&C.push("gas"),c.push({id:$.trim(),types:C})}return c};e.addEventListener("submit",async y=>{y.preventDefault();const c=new FormData(e),w={api_key:c.get("api_key"),energy_id:c.get("energy_id"),meters:g(c)},_=this.root.querySelector("#creds-status");try{ve(w);const{saveCredentials:b}=await V(async()=>{const{saveCredentials:x}=await Promise.resolve().then(()=>U);return{saveCredentials:x}},void 0);await b(w),_&&(_.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=w,this.state.error=null,await this.loadData()}catch(b){_&&(_.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${b instanceof Error?b.message:b}</p>`)}});const i=this.root.querySelector("#test-creds-btn");i==null||i.addEventListener("click",async()=>{const y=new FormData(e),c={api_key:y.get("api_key"),energy_id:y.get("energy_id"),meters:g(y)},w=this.root.querySelector("#creds-status");w&&(w.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:_}=await V(async()=>{const{testCredentials:x}=await Promise.resolve().then(()=>U);return{testCredentials:x}},void 0),b=await _(c);w&&(w.innerHTML=b.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${b.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${b.message}</p>`)}catch(_){w&&(w.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${_ instanceof Error?_.message:_}</p>`)}})}const s=this.root.querySelector("#settings-form");if(!s)return;const a=d=>{const g=[];for(let i=0;i<24;i++){const y=d.get(`consumption_window_${i}_label`),c=d.get(`consumption_window_${i}_day_group`),w=d.get(`consumption_window_${i}_start_time`),_=d.get(`consumption_window_${i}_end_time`),b=d.get(`consumption_window_${i}_rate`);if(y===null&&c===null&&w===null&&_===null&&b===null)break;g.push({label:(y??"").trim()||`Window ${i+1}`,day_group:c??"all",start_time:w??"00:00",end_time:_??"06:00",rate:parseFloat(b??"0")||0})}return g},n=d=>{const g=[];for(let i=0;i<24;i++){const y=d.get(`reference_window_${i}_label`),c=d.get(`reference_window_${i}_day_group`),w=d.get(`reference_window_${i}_start_time`),_=d.get(`reference_window_${i}_end_time`),b=d.get(`reference_window_${i}_reference_power_kw`);if(y===null&&c===null&&w===null&&_===null&&b===null)break;g.push({label:(y??"").trim()||`Reference ${i+1}`,day_group:c??"all",start_time:w??"17:00",end_time:_??"00:00",reference_power_kw:parseFloat(b??"0")||0})}return g},r=()=>{var x;const d=new FormData(s),g={};s.querySelectorAll('input[type="checkbox"]').forEach($=>{g[$.name]=$.checked});const i=[],y=/^feed_in_rate_(\d+)_(.+)$/,c={},w=[],_=/^meter_fee_(\d+)_(.+)$/,b={};for(const[$,C]of d.entries()){if($.startsWith("consumption_window_")||$.startsWith("reference_window_"))continue;const v=$.match(y);if(v){const W=v[1],I=v[2];c[W]||(c[W]={}),c[W][I]=C;continue}const h=$.match(_);if(h){const W=h[1],I=h[2];b[W]||(b[W]={}),b[W][I]=C;continue}if(g[$]!==void 0&&typeof g[$]=="boolean")continue;const D=C,P=s.elements.namedItem($);if(D===""&&P instanceof HTMLInputElement&&P.type==="number"){const W=(x=this.state.config)==null?void 0:x[$];typeof W=="number"&&isFinite(W)&&(g[$]=W);continue}const L=parseFloat(D);g[$]=isNaN(L)?D:L}for(const $ of Object.keys(c).sort()){const C=c[$],v=C.mode??"fixed",h=v==="sensor"?C.fallback_tariff??C.tariff:C.tariff;i.push({meter_id:C.meter_id??"",mode:v,tariff:parseFloat(h??"0.08")||.08,sensor_entity:C.sensor_entity??""})}i.length>0&&(g.feed_in_rates=i);for(const $ of Object.keys(b).sort()){const C=b[$];w.push({meter_id:C.meter_id??"",label:C.label??"",fee:parseFloat(C.fee??"0")||0})}return w.length>0&&(g.meter_monthly_fees=w),g.consumption_rate_windows=a(d),g.reference_power_windows=n(d),g},o=d=>{if(!this.state.config)return;const g=r();d(g),this.state.config={...this.state.config,...g},this.renderPreserveMainScroll()};if((m=this.root.querySelector("#add-consumption-window-btn"))==null||m.addEventListener("click",()=>{o(d=>{var i;const g=Array.isArray(d.consumption_rate_windows)?[...d.consumption_rate_windows]:[];g.push({label:`Window ${g.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((i=this.state.config)==null?void 0:i.energy_variable_rate)??.1125}),d.consumption_rate_windows=g})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(d=>{d.addEventListener("click",()=>{const g=parseInt(d.dataset.window??"0",10);o(i=>{const y=Array.isArray(i.consumption_rate_windows)?[...i.consumption_rate_windows]:[];y.splice(g,1),i.consumption_rate_windows=y})})}),(f=this.root.querySelector("#add-reference-window-btn"))==null||f.addEventListener("click",()=>{o(d=>{var i;const g=Array.isArray(d.reference_power_windows)?[...d.reference_power_windows]:[];g.push({label:`Reference ${g.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((i=this.state.config)==null?void 0:i.reference_power_kw)??5}),d.reference_power_windows=g})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(d=>{d.addEventListener("click",()=>{const g=parseInt(d.dataset.window??"0",10);o(i=>{const y=Array.isArray(i.reference_power_windows)?[...i.reference_power_windows]:[];y.splice(g,1),i.reference_power_windows=y})})}),s.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(d=>{d.addEventListener("change",()=>{const g=d.name.match(/feed_in_rate_(\d+)_mode/);if(!g)return;const i=g[1],y=s.querySelector(`.feed-in-fixed-fields[data-rate-idx="${i}"]`),c=s.querySelector(`.feed-in-sensor-fields[data-rate-idx="${i}"]`);y&&(y.style.display=d.value==="fixed"?"":"none"),c&&(c.style.display=d.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const d=this.root.querySelector("#ha-entity-list");d&&je().then(({entities:g})=>{d.innerHTML=g.map(i=>`<option value="${i}"></option>`).join("")}).catch(()=>{})}s.addEventListener("submit",async d=>{d.preventDefault();const g=r();try{const{saveConfig:i}=await V(async()=>{const{saveConfig:y}=await Promise.resolve().then(()=>U);return{saveConfig:y}},void 0);await i(g),this.state.config=await ae(),this.render()}catch(i){alert("Failed to save: "+(i instanceof Error?i.message:i))}});const p=this.root.querySelector("#reset-config-btn");p==null||p.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?"))try{const{resetConfig:d}=await V(async()=>{const{resetConfig:g}=await Promise.resolve().then(()=>U);return{resetConfig:g}},void 0);await d(),this.state.config=await ae(),this.render()}catch(d){alert("Failed to reset: "+(d instanceof Error?d.message:d))}})}async initChart(e){var s,a;try{const{renderEnergyChart:n}=await V(async()=>{const{renderEnergyChart:c}=await import("./Charts-CTuzU3zd.js");return{renderEnergyChart:c}},[]),{fetchTimeseries:r,fetchPerMeterTimeseries:o}=await V(async()=>{const{fetchTimeseries:c,fetchPerMeterTimeseries:w}=await Promise.resolve().then(()=>U);return{fetchTimeseries:c,fetchPerMeterTimeseries:w}},void 0),{start:p,end:m}=this.getDateRangeISO(),[f,d]=await Promise.all([r("1-1:1.29.0",p,m),r("1-1:2.29.0",p,m)]),g=((s=this.state.config)==null?void 0:s.reference_power_kw)??0,i=(((a=this.state.config)==null?void 0:a.meters)??[]).filter(c=>c.types.includes("production"));let y;if(i.length>1)try{const c=await o("1-1:2.29.0",p,m);c.meters&&c.meters.length>1&&(y=c.meters)}catch(c){console.warn("Per-meter timeseries fetch failed, using merged view:",c)}n(e,f,d,{unit:this.state.chartUnit,referencePowerKw:g,perMeterProduction:y,onZoomChange:(c,w)=>{this.handleChartZoomChange(c,w)}})}catch(n){console.error("Chart init failed:",n)}}async handleChartZoomChange(e,s){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd);const{fetchCustomData:a}=await V(async()=>{const{fetchCustomData:f}=await Promise.resolve().then(()=>U);return{fetchCustomData:f}},void 0),n=e.slice(0,10),r=s.slice(0,10),o=await a(n,r),[p,m]=await Promise.all([O("1-1:1.29.0",new Date(n+"T00:00:00").toISOString(),new Date(r+"T23:59:59.999").toISOString()),O("1-1:2.29.0",new Date(n+"T00:00:00").toISOString(),new Date(r+"T23:59:59.999").toISOString())]);this.state.range="custom",this.state.customStart=n,this.state.customEnd=r,this.state.rangeData={range:"custom",consumption:o.consumption,production:o.production,exported:o.exported??0,self_consumed:o.self_consumed??0,gas_energy:o.gas_energy??0,gas_volume:o.gas_volume??0,grid_import:o.grid_import,solar_to_home:o.solar_to_home,direct_solar_to_home:o.direct_solar_to_home,shared:o.shared,shared_with_me:o.shared_with_me,peak_power_kw:o.peak_power_kw??0,exceedance_kwh:o.exceedance_kwh??0,metering_point:o.metering_point??"",start:o.start,end:o.end},this.state.consumptionTimeseries=p,this.state.productionTimeseries=m,this.renderDashboardPartial()}catch(a){console.error("Zoom data fetch failed:",a),this.clearRangeStateWithError(a,"Missing data"),this.render()}}renderDashboardPartial(){var v,h;const e=this.root.querySelector(".dashboard");if(!e||!this.state.rangeData)return;const s=document.createElement("div");s.innerHTML=Ie(this.state);const a=s.querySelector(".dashboard");if(!a)return;const n=e.querySelector(".range-selector"),r=a.querySelector(".range-selector");n&&r&&n.replaceWith(r);const o=e.querySelector(".range-info-bar"),p=a.querySelector(".range-info-bar");o&&p?o.replaceWith(p):!o&&p?(v=e.querySelector(".range-selector"))==null||v.insertAdjacentElement("afterend",p):o&&!p&&o.remove();const m=e.querySelector(".custom-range-picker"),f=a.querySelector(".custom-range-picker");if(m&&f)m.replaceWith(f);else if(!m&&f){const D=e.querySelector(".range-info-bar")??e.querySelector(".range-selector");D==null||D.insertAdjacentElement("afterend",f)}else m&&!f&&m.remove();const d=e.querySelector(".stats-grid"),g=a.querySelector(".stats-grid");d&&g&&d.replaceWith(g);const i=e.querySelector(".flow-card"),y=a.querySelector(".flow-card");i&&y&&i.replaceWith(y);const c=e.querySelector(".metrics-card"),w=a.querySelector(".metrics-card");c&&w&&c.replaceWith(w);const _=e.querySelector(".chart-header .card-title"),b=a.querySelector(".chart-header .card-title");_&&b&&_.replaceWith(b);const x=e.querySelector(".reset-zoom-btn");x&&(x.style.display=""),e.querySelectorAll("[data-range]").forEach(D=>{D.addEventListener("click",()=>{this.changeRange(D.dataset.range)})});const $=e.querySelector("#custom-start"),C=e.querySelector("#custom-end");$&&$.addEventListener("change",()=>{this.state.customStart=$.value}),C&&C.addEventListener("change",()=>{this.state.customEnd=C.value}),(h=e.querySelector("#apply-custom-range"))==null||h.addEventListener("click",()=>{this.preZoomRange=null,this.applyCustomRange()})}getDateRangeISO(){const e=new Date,s=a=>a.toISOString();switch(this.state.range){case"custom":{const a=new Date(this.state.customStart+"T00:00:00"),n=new Date(this.state.customEnd+"T23:59:59.999");return{start:s(a),end:s(n)}}case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const n=new Date(a);return n.setHours(23,59,59,999),{start:s(a),end:s(n)}}case"this_week":{const a=new Date(e),n=a.getDay()||7;return a.setDate(a.getDate()-n+1),a.setHours(0,0,0,0),{start:s(a),end:s(e)}}case"last_week":{const a=new Date(e),n=a.getDay()||7,r=new Date(a);r.setDate(a.getDate()-n),r.setHours(23,59,59,999);const o=new Date(r);return o.setDate(r.getDate()-6),o.setHours(0,0,0,0),{start:s(o),end:s(r)}}case"this_month":{const a=new Date(e.getFullYear(),e.getMonth(),1);return{start:s(a),end:s(e)}}case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),n=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s(a),end:s(n)}}case"this_year":{const a=new Date(e.getFullYear(),0,1);return{start:s(a),end:s(e)}}case"last_year":{const a=new Date(e.getFullYear()-1,0,1),n=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s(a),end:s(n)}}default:{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const n=new Date(a);return n.setHours(23,59,59,999),{start:s(a),end:s(n)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new Ot(t).mount()}
