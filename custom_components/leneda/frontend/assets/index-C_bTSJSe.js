var vt=Object.defineProperty;var yt=(t,e,s)=>e in t?vt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var J=(t,e,s)=>yt(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const wt="modulepreload",_t=function(t){return"/leneda-panel/static/"+t},Ge={},V=function(e,s,a){let n=Promise.resolve();if(s&&s.length>0){let o=function(v){return Promise.all(v.map(d=>Promise.resolve(d).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=(u==null?void 0:u.nonce)||(u==null?void 0:u.getAttribute("nonce"));n=o(s.map(v=>{if(v=_t(v),v in Ge)return;Ge[v]=!0;const d=v.endsWith(".css"),g=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${v}"]${g}`))return;const l=document.createElement("link");if(l.rel=d?"stylesheet":wt,d||(l.as="script"),l.crossOrigin="",l.href=v,p&&l.setAttribute("nonce",p),document.head.appendChild(l),d)return new Promise((w,c)=>{l.addEventListener("load",w),l.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${v}`)))})}))}function r(o){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=o,window.dispatchEvent(u),!u.defaultPrevented)throw o}return n.then(o=>{for(const u of o||[])u.status==="rejected"&&r(u.reason);return e().catch(r)})};function Ke(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()}))}}function bt(){var t,e,s,a,n;try{const r=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((n=(a=(s=r==null?void 0:r.hass)==null?void 0:s.auth)==null?void 0:a.data)==null?void 0:n.access_token)??null}catch{return null}}async function F(t,e){const s=bt(),a={...e==null?void 0:e.headers,...s?{Authorization:`Bearer ${s}`}:{}},n={...e,credentials:"include",headers:a},r=await fetch(t,n);if(!r.ok){const o=r.headers.get("content-type")??"";let u="",p="";if(o.includes("application/json")){const v=await r.json().catch(()=>null);u=String((v==null?void 0:v.error)??"").trim(),p=String((v==null?void 0:v.message)??(v==null?void 0:v.error)??"").trim()}else p=(await r.text().catch(()=>"")).trim();throw u==="missing_data"||u==="no_data"||r.status===503?new Error("Missing data"):new Error(p?`API ${r.status}: ${p}`:`API ${r.status}: ${r.statusText}`)}return r.json()}async function he(t){return F(`/leneda_api/data?range=${t}`)}async function $t(t,e){return F(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function O(t,e,s){let a=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),F(a)}async function kt(t,e,s){let a=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(a+=`&start=${encodeURIComponent(e)}`),s&&(a+=`&end=${encodeURIComponent(s)}`),F(a)}async function xe(){return F("/leneda_api/sensors")}async function oe(){return F("/leneda_api/config")}async function xt(t){await F("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function St(){await F("/leneda_api/config/reset",{method:"POST"})}async function Be(){try{return await F("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function Je(){return F("/leneda_api/credentials")}async function Dt(t){const e=Ke(t);await F("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Et(t){const e=Ke(t);return F("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Qe(){return F("/leneda_api/ha-entities")}const H=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:oe,fetchCredentials:Je,fetchCustomData:$t,fetchHAEntities:Qe,fetchMode:Be,fetchPerMeterTimeseries:kt,fetchRangeData:he,fetchSensors:xe,fetchTimeseries:O,resetConfig:St,saveConfig:xt,saveCredentials:Dt,testCredentials:Et},Symbol.toStringTag,{value:"Module"}));function i(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function Q(t){return new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function Ct(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}const Se=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function qe(t){var U;const e=t.rangeData,s=S=>{if(!S)return"";const C=S.match(/^(\d{4}-\d{2}-\d{2})/);return C?C[1]:""},a=(e==null?void 0:e.consumption)??0,n=(e==null?void 0:e.production)??0,r=(e==null?void 0:e.exported)??0,o=(e==null?void 0:e.self_consumed)??0,u=(e==null?void 0:e.gas_energy)??0,p=(e==null?void 0:e.gas_volume)??0,v=(e==null?void 0:e.peak_power_kw)??0,d=s(e==null?void 0:e.start),g=s(e==null?void 0:e.end),l=(e==null?void 0:e.shared_with_me)??0,w=(e==null?void 0:e.shared)??0,c=Math.max(0,r),y=Math.max(0,(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(o>0?o:n-c)),$=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??y),b=y,D=Math.max(0,(e==null?void 0:e.grid_import)??a-y),k=a>0?a:D+y,x=k>0?Math.min(100,y/k*100):0,f=Math.max(n,D,c,w,l,$,1),m=(S,C=2.8,T=8.2)=>S>0?C+S/f*(T-C):1.8,E=S=>m(S)+1.4,L=S=>m(S)+5.4,P=(S,C=.28,T=.88)=>S>0?C+S/f*(T-C):.1,M=(S,C=.09,T=.22)=>S>0?C+S/f*(T-C):.05,I=(S,C=1.6,T=3.9)=>`${(S>0?Math.max(C,T-S/f*(T-C)):T).toFixed(2)}s`,ee=(S,C=3.4,T=5.8)=>S>0?C+S/f*(T-C):3,G=S=>S>0?Math.max(18,Math.round(S/f*100)):0,q=S=>{const{path:C,value:T,gradientId:te,colorVar:B,filterId:j,particleClass:N,direction:se="forward"}=S,le=se==="reverse"?"1;0":"0;1";return`
      <path
        class="flow-halo ${N}"
        d="${C}"
        stroke="url(#${te})"
        stroke-width="${L(T).toFixed(1)}"
        stroke-opacity="${M(T).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-rail ${N}"
        d="${C}"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="${E(T).toFixed(1)}"
        stroke-opacity="0.42"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-stream ${N}"
        d="${C}"
        stroke="url(#${te})"
        stroke-width="${m(T).toFixed(1)}"
        stroke-opacity="${P(T).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      ${T>0?`
        <circle
          class="flow-particle ${N}"
          r="${ee(T).toFixed(1)}"
          fill="${B}"
          filter="url(#${j})"
        >
          <animateMotion dur="${I(T)}" repeatCount="indefinite" path="${C}" keyPoints="${le}" keyTimes="0;1" calcMode="linear" />
        </circle>
        <circle
          class="flow-particle flow-particle-secondary ${N}"
          r="${Math.max(2.4,ee(T)-1.2).toFixed(1)}"
          fill="${B}"
          fill-opacity="0.75"
          filter="url(#${j})"
        >
          <animateMotion dur="${I(T)}" begin="-${(parseFloat(I(T))/2).toFixed(2)}s" repeatCount="indefinite" path="${C}" keyPoints="${le}" keyTimes="0;1" calcMode="linear" />
        </circle>
      `:""}
    `},ie=e!=null&&e.start&&(e!=null&&e.end)?`${Q(e.start)} — ${Q(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${Q(t.customStart+"T00:00:00")} — ${Q(t.customEnd+"T00:00:00")}`:((U=Se.find(S=>S.id===t.range))==null?void 0:U.label)??"Yesterday";return`
    <div class="dashboard" style="position: relative;">
      <div style="position:fixed;bottom:4px;right:4px;font-size:10px;opacity:0.5;pointer-events:none;z-index:9999;">v:2.4.0</div>

      <!-- Range Selector -->
      <div class="range-selector">
        ${Se.map(S=>`
          <button
            class="range-btn ${S.id===t.range?"active":""}"
            data-range="${S.id}"
          >${S.label}</button>
        `).join("")}
      </div>

      ${(()=>{if(!(e!=null&&e.start)||!(e!=null&&e.end))return"";try{const S=new Date(e.start),C=new Date(e.end);return isNaN(S.getTime())||isNaN(C.getTime())?"":`
            <div class="range-info-bar">
              📅 ${S.toLocaleDateString()} — ${C.toLocaleDateString()}
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
            <div class="stat-value">${i(a)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.production">
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
            <div class="stat-value">${i(b)} <span class="stat-unit">kWh</span></div>
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
                    <span class="module-value highlight-red">${i(a)}</span>
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
                  <text x="16" y="38" class="scene-node-value">${i(D+c)} kWh</text>
                </g>

                <g class="scene-node-label" transform="translate(338, 44)">
                  <rect width="124" height="48" rx="16" fill="var(--clr-overlay)" stroke="rgba(63, 185, 80, 0.24)" />
                  <text x="16" y="20" class="scene-node-kicker">Solar</text>
                  <text x="16" y="36" class="scene-node-value">${i(n)} kWh</text>
                </g>

                <g class="scene-node-label" transform="translate(600, 108)">
                  <rect width="146" height="52" rx="16" fill="var(--clr-overlay)" stroke="rgba(88, 166, 255, 0.24)" />
                  <text x="16" y="22" class="scene-node-kicker">Community</text>
                  <text x="16" y="38" class="scene-node-value">${i(w+l)} kWh</text>
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
                    <text text-anchor="middle" y="18" class="house-core-value">${i(x,0)}%</text>
                  </g>
                </g>

                ${q({path:"M 560 98 C 520 102 474 130 434 182",value:$,gradientId:"flow-solar",colorVar:"var(--clr-production)",filterId:"glow-green",particleClass:"flow-solar"})}

                ${q({path:"M 146 224 C 226 224 298 224 354 214",value:D,gradientId:"flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"glow-red",particleClass:"flow-grid-in"})}

                ${q({path:"M 446 246 C 386 292 286 314 146 312",value:c,gradientId:"flow-grid-out",colorVar:"var(--clr-export)",filterId:"glow-blue",particleClass:"flow-grid-out"})}

                ${q({path:"M 450 206 C 514 184 582 184 650 206",value:w,gradientId:"flow-shared-out",colorVar:"var(--clr-export)",filterId:"glow-blue",particleClass:"flow-shared-out"})}

                ${q({path:"M 650 236 C 586 252 522 254 448 238",value:l,gradientId:"flow-shared-in",colorVar:"var(--clr-primary)",filterId:"glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}
              </svg>
            </div>

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${i(k)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${i(x,0)}% solar supplied${v>0?` · Peak ${i(v,2)} kW`:""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${i(y)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${G(y)}%;"></span></div>
                  <p>Energy used inside the house${l>0?", including received community energy":""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${i(D)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${G(D)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${i(c)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${G(c)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${i(w+l)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${G(w+l)}%;"></span></div>
                  <p>Sent ${i(w)} kWh · received ${i(l)} kWh.</p>
                </div>
              </div>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${i(y)} kWh used in the house</span>
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
                  <span>${i(c)} kWh sent back to the market</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${i(w)} kWh sent · ${i(l)} kWh received${l>0?" (included in solar to home)":""}</span>
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
              <span class="metric-value">${i(x,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${x}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Consumed</span>
              <span class="metric-value">${i(b)} kWh</span>
            </div>
          </div>
          ${v>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${i(v,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label">${((e==null?void 0:e.exceedance_kwh)??0)>0?"⚠️":"✅"} Exceedance</span>
              <span class="metric-value">${i((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${u>0||p>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${i(u)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${i(p)} m³</span>
            </div>
          </div>
          `:""}
        </div>
      </div>
      </div>

      <!-- Chart -->
      <div class="card chart-card">
        <div class="chart-header">
          <h3 class="card-title"><span class="title-icon">📉</span> Energy Profile — ${ie}</h3>
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
  `}const Ne={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function Mt(t){return Ne[t]?Ne[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function Tt(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],s=[],a=[],n=[],r=[];for(const u of t.sensors){const p=u.key;p.startsWith("c_")||p==="1-1:1.29.0"||p==="1-1:3.29.0"?e.push(u):p.startsWith("p_")||p==="1-1:2.29.0"||p==="1-1:4.29.0"?s.push(u):p.startsWith("s_")||p.startsWith("1-65:")?a.push(u):p.startsWith("g_")||p.startsWith("7-")?n.push(u):r.push(u)}const o=(u,p,v,d)=>v.length?`
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
              ${v.map(g=>`
                <tr>
                  <td class="sensor-name">${Mt(g.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${d});">${i(g.value)}</td>
                  <td class="sensor-unit">${g.unit}</td>
                  <td class="sensor-peak">${g.peak_timestamp?Ct(g.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
  `}const Ye=[{kw:3,fixedMonthlyFee:7.42},{kw:7,fixedMonthlyFee:12.84},{kw:12,fixedMonthlyFee:19.61},{kw:17,fixedMonthlyFee:26.39},{kw:27,fixedMonthlyFee:39.94},{kw:43,fixedMonthlyFee:61.62},{kw:70,fixedMonthlyFee:98.2},{kw:100,fixedMonthlyFee:138.85},{kw:150,fixedMonthlyFee:206.6,existingContractsOnly:!0},{kw:200,fixedMonthlyFee:274.35,existingContractsOnly:!0}];function pe(t){if(!t)return null;const e=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(e){const[,a,n,r]=e;return new Date(Number(a),Number(n)-1,Number(r))}const s=new Date(t);return Number.isNaN(s.getTime())?null:new Date(s.getFullYear(),s.getMonth(),s.getDate())}function He(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function Wt(t,e,s,a,n){const r=new Date,o=pe(a),u=pe(n);let p=o,v=u;if(!p||!v)switch(t){case"yesterday":{const c=new Date(r);c.setDate(c.getDate()-1),p=new Date(c.getFullYear(),c.getMonth(),c.getDate()),v=new Date(p);break}case"this_week":{const c=new Date(r),y=c.getDay()||7;p=new Date(c.getFullYear(),c.getMonth(),c.getDate()-y+1),v=new Date(r.getFullYear(),r.getMonth(),r.getDate());break}case"last_week":{const c=new Date(r),y=c.getDay()||7,$=new Date(c.getFullYear(),c.getMonth(),c.getDate()-y+1);p=new Date($.getFullYear(),$.getMonth(),$.getDate()-7),v=new Date($.getFullYear(),$.getMonth(),$.getDate()-1);break}case"this_month":{p=new Date(r.getFullYear(),r.getMonth(),1),v=new Date(r.getFullYear(),r.getMonth(),r.getDate());break}case"last_month":{p=new Date(r.getFullYear(),r.getMonth()-1,1),v=new Date(r.getFullYear(),r.getMonth(),0);break}case"this_year":{p=new Date(r.getFullYear(),0,1),v=new Date(r.getFullYear(),r.getMonth(),r.getDate());break}case"last_year":{p=new Date(r.getFullYear()-1,0,1),v=new Date(r.getFullYear()-1,11,31);break}case"custom":{p=pe(e)??new Date(r.getFullYear(),r.getMonth(),r.getDate()),v=pe(s)??new Date(p);break}default:{p=new Date(r.getFullYear(),r.getMonth(),r.getDate()-1),v=new Date(p);break}}if(v<p){const c=p;p=v,v=c}let d=0,g=0;const l=new Date(p);for(;l<=v;){const c=new Date(l.getFullYear(),l.getMonth()+1,0).getDate();g+=1/c,d+=1,l.setDate(l.getDate()+1)}const w=p.getFullYear()===v.getFullYear()&&p.getMonth()===v.getMonth()&&p.getDate()===1&&v.getDate()===new Date(v.getFullYear(),v.getMonth()+1,0).getDate();return{days:d,factor:g,label:w?"full month":`${d} day${d===1?"":"s"}`}}function Rt(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function Ue(t){const[e,s]=t.split(":").map(a=>parseInt(a,10)||0);return e*60+s}function et(t,e,s,a){if(!Rt(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),r=Ue(s),o=Ue(a);return r===o?!0:r<o?n>=r&&n<o:n>=r||n<o}function Pt(t,e){return e.find(s=>et(t,s.day_group,s.start_time,s.end_time))}function Lt(t,e){return e.find(s=>et(t,s.day_group,s.start_time,s.end_time))}function je(t,e,s,a,n,r=[]){var w;const o=new Map;let u=0,p=0,v=0,d=0,g=0;const l=new Map;for(const c of r){const y=Number(c.value)||0;l.set(c.startedAt,(l.get(c.startedAt)??0)+y)}for(const c of t){const y=Number(c.value)||0,$=y*.25,b=l.get(c.startedAt)??0,D=Math.max(0,y-b),k=new Date(c.startedAt);if(Number.isNaN(k.getTime()))continue;const x=Pt(k,a),f=Lt(k,n),m=(x==null?void 0:x.rate)??e,E=((w=x==null?void 0:x.label)==null?void 0:w.trim())||"Base tariff",L=(f==null?void 0:f.reference_power_kw)??s;u+=$*m,g=Math.max(g,y),d=Math.max(d,D),y>L&&(v+=(y-L)*.25),D>L&&(p+=(D-L)*.25);const P=`${E}__${m}`,M=o.get(P);M?M.kwh+=$:o.set(P,{label:E,rate:m,kwh:$})}return{energyCost:u,exceedanceKwh:p,grossExceedanceKwh:v,avoidedExceedanceKwh:Math.max(0,v-p),peakPowerKw:d,grossPeakPowerKw:g,rateBreakdown:Array.from(o.values()).sort((c,y)=>c.label.localeCompare(y.label))}}function Ft(t){var Ie;const e=t.config,s=t.rangeData;if(!e||!s)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const a=s.consumption||0,n=s.production||0,r=s.exported||0,o=Math.max(0,r),u=Math.max(0,s.solar_to_home??s.direct_solar_to_home??(s.self_consumed&&s.self_consumed>0?s.self_consumed:n-o)),p=Math.max(0,s.grid_import??a-u),v=s.peak_power_kw||0,d=e.reference_power_kw||5,g=s.exceedance_kwh||0,l=s.gas_energy||0,w=s.gas_volume||0,c=l>0||w>0,y=e.consumption_rate_windows??[],$=e.reference_power_windows??[],b=t.consumptionTimeseries?je(t.consumptionTimeseries.items,e.energy_variable_rate,d,y,$,((Ie=t.productionTimeseries)==null?void 0:Ie.items)??[]):null,D=y.length>0&&!!b&&Math.abs(p-a)<.01,k=$.length>0&&!!b,x=b?b.peakPowerKw:v,f=b?b.exceedanceKwh:g,m=He(s.start??t.customStart),E=He(s.end??t.customEnd),{days:L,factor:P,label:M}=Wt(t.range,t.customStart,t.customEnd,s.start,s.end),I=e.energy_fixed_fee*P,ee=e.network_metering_rate*P,G=e.network_power_ref_rate*P,q=D?b.energyCost:p*e.energy_variable_rate,ie=p*e.network_variable_rate,U=f*e.exceedance_rate,S=e.meter_monthly_fees??[],C=S.reduce((h,R)=>h+(R.fee||0),0)*P,T=p*e.compensation_fund_rate,te=p*e.electricity_tax_rate,B=Math.max(0,e.connect_discount??0)*P,j=I+q+ee+G+ie+U+C+T+te-B,N=j*e.vat_rate,se=j+N,le=(e.meters??[]).filter(h=>h.types.includes("production")),nt=e.feed_in_rates??[],X=le.map(h=>{const R=nt.find(A=>A.meter_id===h.id);if(R){const A=R.mode==="sensor"&&R.sensor_value!=null&&isFinite(R.sensor_value),K=A?R.sensor_value:isFinite(R.tariff)?R.tariff:e.feed_in_tariff,Ae=A?`Sensor (${i(K,4)} ${e.currency??"EUR"}/kWh)`:"Fixed tariff";return{meterId:h.id,shortId:h.id?"…"+h.id.slice(-8):"Meter",rate:K,label:Ae,mode:R.mode}}return{meterId:h.id,shortId:h.id?"…"+h.id.slice(-8):"Meter",rate:e.feed_in_tariff,label:"Fixed tariff",mode:"fixed"}}),me=X.filter(h=>isFinite(h.rate)&&h.rate>0),De=me.length>0?me.reduce((h,R)=>h+R.rate,0)/me.length:e.feed_in_tariff,z=o*De,Z=X.length>1,Y=u,Ee=Y*(e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate),Ce=Ee*e.vat_rate,ae=Ee+Ce,re=Math.max(0,(b==null?void 0:b.avoidedExceedanceKwh)??0),ge=re*e.exceedance_rate,Me=ge*e.vat_rate,ne=ge+Me,ce=re>1e-4,de=ae+ne+z,fe=se-z,Te=(e.gas_fixed_fee??6.5)*P,We=l*(e.gas_variable_rate??.055),Re=(e.gas_network_fee??4.8)*P,Pe=l*(e.gas_network_variable_rate??.012),Le=l*(e.gas_tax_rate??.001),ve=Te+We+Re+Pe+Le,Fe=ve*(e.gas_vat_rate??.08),ye=ve+Fe,W=e.currency||"EUR",_=h=>`${i(h,2)} ${W}`,we=Ye.find(h=>Math.abs(h.kw-d)<.05),ot=j-G-U,_e=b?Ye.map(h=>{var Oe;const R=je(t.consumptionTimeseries.items,e.energy_variable_rate,h.kw,y,$,((Oe=t.productionTimeseries)==null?void 0:Oe.items)??[]),A=h.fixedMonthlyFee*P,K=R.exceedanceKwh*e.exceedance_rate,Ve=(ot+A+K)*(1+e.vat_rate);return{...h,fixedCharge:A,exceedanceKwh:R.exceedanceKwh,exceedanceCharge:K,total:Ve,deltaVsCurrent:Ve-se}}):[],ue=_e.reduce((h,R)=>!h||R.total<h.total?R:h,null),it=h=>Math.abs(h)<.005?"Current total":`${h>0?"+":"-"}${_(Math.abs(h))}`,be=s.start&&s.end?`${Q(s.start)} — ${Q(s.end)}`:t.range.replace("_"," ").replace(/\b\w/g,h=>h.toUpperCase()),lt=f>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${i(x,1)} kW</strong> &mdash; ${k?"Reference power windows active":`Reference power level: ${i(d,1)} kW`}</p>
        <p>Exceedance volume: <strong>${i(f,2)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${_(U)}</p>
      </div>`:"",ct=D?b.rateBreakdown.map(h=>`
            <tr>
              <td>${h.label} (${i(h.kwh)} kWh)</td>
              <td style="text-align: right;">${i(h.rate,4)} ${W}/kWh</td>
              <td style="text-align: right;">${_(h.kwh*h.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Supplier rate (${i(p)} kWh bought from grid)</td>
              <td style="text-align: right;">${i(e.energy_variable_rate,4)} ${W}/kWh</td>
              <td style="text-align: right;">${_(q)}</td>
            </tr>
          `,dt=k?`Reference power windows active (${$.length})`:`${i(d,1)} kW`,ut=D?`Time-of-use windows active (${y.length})`:`${i(e.energy_variable_rate,4)} ${W}/kWh`,pt=_e.map(h=>{const R=!!ue&&h.kw===ue.kw,A=!!we&&h.kw===we.kw,K=h.deltaVsCurrent<-.005?"comparison-delta-savings":h.deltaVsCurrent>.005?"comparison-delta-extra":"";return`
            <tr class="${R?"reference-power-best-row":""}${A?" reference-power-current-row":""}">
              <td>
                <div class="reference-level-cell">
                  <span class="reference-level-kw">${i(h.kw,0)} kW</span>
                  ${R?'<span class="reference-level-badge best">Financially optimal</span>':""}
                  ${A?'<span class="reference-level-badge current">Current</span>':""}
                  ${h.existingContractsOnly?'<span class="reference-level-badge legacy">Existing contracts</span>':""}
                </div>
              </td>
              <td style="text-align: right;">${_(h.fixedCharge)}</td>
              <td style="text-align: right;">${_(h.exceedanceCharge)}</td>
              <td style="text-align: right;"><strong>${_(h.total)}</strong></td>
              <td class="${K}" style="text-align: right;">${it(h.deltaVsCurrent)}</td>
            </tr>
          `}).join(""),ht=_e.length>0?`
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${k?"Configured reference power windows stay active in this comparison.":"One reference power level is applied to the full selected period."}
              ${we?"":`Your current configuration uses ${i(d,1)} kW, which is outside the standard Creos low-voltage reference power levels.`}
            </p>
          </div>
          ${ue?`<div class="reference-power-optimum">
                <span class="reference-level-badge best">Financially optimal: ${i(ue.kw,0)} kW</span>
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
            ${pt}
          </tbody>
        </table>
      </div>
    `:`
      <div class="card reference-power-card">
        <p class="muted">Reference power level comparison requires 15-minute load-curve data for the selected period.</p>
      </div>
    `,mt=`
      <div class="range-selector">
        ${Se.map(h=>`
          <button
            class="range-btn ${h.id===t.range?"active":""}"
            data-range="${h.id}"
          >${h.label}</button>
        `).join("")}
      </div>
    `,gt=s.start&&s.end?(()=>{const h=new Date(s.start),R=new Date(s.end);return Number.isNaN(h.getTime())||Number.isNaN(R.getTime())?"":`
        <div class="range-info-bar">
          Period: ${h.toLocaleDateString()} - ${R.toLocaleDateString()}
        </div>
      `})():"",ft=t.range==="custom"?`
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
    `:m&&E?`
        <div class="custom-range-picker period-preview">
          <span class="period-preview-label">Viewed period</span>
          <label>
            <span>From</span>
            <input type="date" value="${m}" readonly aria-label="Preset period start" />
          </label>
          <label>
            <span>To</span>
            <input type="date" value="${E}" readonly aria-label="Preset period end" />
          </label>
        </div>
      `:"";return`
    <section class="invoice-view">
      ${mt}
      ${gt}
      ${ft}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Invoice Estimate &mdash; ${be}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the currently selected period.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${i(a)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${i(p)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${i(n)} kWh produced</span>
          ${o>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${i(o)} kWh exported</span>`:""}
          ${c?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${i(l)} kWh gas (${i(w)} m³)</span>`:""}
        </div>
      </div>

      ${lt}

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
              <td>Fixed Fee <span class="muted">(${M})</span></td>
              <td style="text-align: right;">${i(e.energy_fixed_fee,2)} ${W}/mo</td>
              <td style="text-align: right;">${_(I)}</td>
            </tr>
            ${ct}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${M})</span></td>
              <td style="text-align: right;">${i(e.network_metering_rate,2)} ${W}/mo</td>
              <td style="text-align: right;">${_(ee)}</td>
            </tr>
            <tr>
              <td>Reference power level (${dt}) <span class="muted">(${M})</span></td>
              <td style="text-align: right;">${i(e.network_power_ref_rate,2)} ${W}/mo</td>
              <td style="text-align: right;">${_(G)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${i(p)} kWh bought from grid)</td>
              <td style="text-align: right;">${i(e.network_variable_rate,4)} ${W}/kWh</td>
              <td style="text-align: right;">${_(ie)}</td>
            </tr>
            <tr class="${f>0?"exceedance-row":""}">
              <td>Exceedance charge (${i(f,2)} kWh above the reference power level)</td>
              <td style="text-align: right;">${i(e.exceedance_rate,4)} ${W}/kWh</td>
              <td style="text-align: right;">${_(U)}</td>
            </tr>

            ${S.filter(h=>h.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${S.filter(h=>h.fee>0).map(h=>`
            <tr>
              <td>${h.label||"…"+h.meter_id.slice(-8)} <span class="muted">(${M})</span></td>
              <td style="text-align: right;">${i(h.fee,2)} ${W}/mo</td>
              <td style="text-align: right;">${_(h.fee*P)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${i(e.compensation_fund_rate,4)} ${W}/kWh</td>
              <td style="text-align: right;">${_(T)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${i(e.electricity_tax_rate,4)} ${W}/kWh</td>
              <td style="text-align: right;">${_(te)}</td>
            </tr>
            ${B>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            <tr>
              <td>Monthly Discount <span class="muted">(${M})</span></td>
              <td style="text-align: right;">-${i(Math.max(0,e.connect_discount??0),2)} ${W}/mo</td>
              <td style="text-align: right;">-${_(B)}</td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${_(j)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${i(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${_(N)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Costs</strong></td>
              <td style="text-align: right;"><strong>${_(se)}</strong></td>
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
              <td style="text-align: right;">${i(Y)} kWh avoided grid purchases</td>
              <td style="text-align: right;">${_(ae)} saved</td>
            </tr>
            <tr class="revenue-row">
              <td>Export sold</td>
              <td style="text-align: right;">${i(o)} kWh sent to grid</td>
              <td style="text-align: right;">${_(z)} earned</td>
            </tr>
            ${ce?`
            <tr class="revenue-row">
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${i(re)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${_(ne)} saved</td>
            </tr>
            `:""}
            ${o>0?`
            <tr class="section-label"><td colspan="3">Credit Calculation</td></tr>
            ${X.map(h=>`
            <tr class="revenue-row">
              <td>Exported (${Z?h.shortId:i(o)+" kWh"})</td>
              <td style="text-align: right;">${h.label}<br/>${i(h.rate,4)} ${W}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${_(Z?o/X.length*h.rate:o*h.rate)}</td>
            </tr>
            `).join("")}
            ${Z?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${i(o)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${i(De,4)} ${W}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${_(z)}</td>
            </tr>
            `:""}
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total saved / earned thanks to solar</strong></td>
              <td style="text-align: right;"><strong>${_(de)}</strong></td>
            </tr>
            <tr class="net-total-row">
              <td colspan="2"><strong>Net Balance</strong></td>
              <td style="text-align: right;"><strong>${_(fe)}</strong></td>
            </tr>
            `:""}
            ${o<=0?`
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total saved / earned thanks to solar</strong></td>
              <td style="text-align: right;"><strong>${_(de)}</strong></td>
            </tr>
            `:""}
            `:""}
          </tbody>
        </table>
      </div>

      ${ht}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${i(p)} kWh), not total home usage.
          Supplier pricing: ${ut}.
          Fixed monthly charges are prorated across the viewed period (${L} days, ${M}, equivalent to ${i(P,2)} monthly charges).
          Peak load (${i(x,1)} kW) is compared against ${k?"your configured reference power windows":`your reference power level (${i(d,1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${i(e.exceedance_rate,4)} ${W}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${c?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${be}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${i(l)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${i(w)} m³</span>
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
              <td>Fixed Fee <span class="muted">(${M})</span></td>
              <td style="text-align: right;">${i(e.gas_fixed_fee??6.5,2)} ${W}/mo</td>
              <td style="text-align: right;">${_(Te)}</td>
            </tr>
            <tr>
              <td>Energy (${i(l)} kWh)</td>
              <td style="text-align: right;">${i(e.gas_variable_rate??.055,4)} ${W}/kWh</td>
              <td style="text-align: right;">${_(We)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${M})</span></td>
              <td style="text-align: right;">${i(e.gas_network_fee??4.8,2)} ${W}/mo</td>
              <td style="text-align: right;">${_(Re)}</td>
            </tr>
            <tr>
              <td>Network Variable (${i(l)} kWh)</td>
              <td style="text-align: right;">${i(e.gas_network_variable_rate??.012,4)} ${W}/kWh</td>
              <td style="text-align: right;">${_(Pe)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${i(l)} kWh)</td>
              <td style="text-align: right;">${i(e.gas_tax_rate??.001,4)} ${W}/kWh</td>
              <td style="text-align: right;">${_(Le)}</td>
            </tr>

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${_(ve)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${i((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${_(Fe)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${_(ye)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Energy Total: ${_(fe+ye)}</strong>
          (Electricity: ${_(fe)} + Gas: ${_(ye)})
        </p>
      </div>
      `:""}

      ${n>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Revenue &mdash; ${be}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${_(de)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${i(n)} kWh</div>
            <div class="solar-stat-label">Solar produced</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${_(ae)}</div>
            <div class="solar-stat-label">Saved by autoconsuming ${i(Y)} kWh</div>
          </div>
          ${ce?`
          <div class="solar-stat">
            <div class="solar-stat-value">${_(ne)}</div>
            <div class="solar-stat-label">Saved by staying under the reference power</div>
          </div>
          `:""}
          <div class="solar-stat">
            <div class="solar-stat-value">${_(z)}</div>
            <div class="solar-stat-label">Earned by selling ${i(o)} kWh</div>
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
              <td style="text-align: right;">${i(Y)} kWh avoided grid purchases</td>
              <td style="text-align: right;">${_(ae)} saved</td>
            </tr>
            <tr>
              <td>Export sold</td>
              <td style="text-align: right;">${i(o)} kWh sent to grid</td>
              <td style="text-align: right;">${_(z)} earned</td>
            </tr>
            ${ce?`
            <tr>
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${i(re)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${_(ne)} saved</td>
            </tr>
            `:""}

            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${i(Y)} kWh)</td>
              <td style="text-align: right;">${i(e.energy_variable_rate,4)} ${W}/kWh</td>
              <td style="text-align: right;">${_(Y*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${i(e.network_variable_rate,4)} ${W}/kWh</td>
              <td style="text-align: right;">${_(Y*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${i(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${W}/kWh</td>
              <td style="text-align: right;">${_(Y*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${i(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${_(Ce)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${_(ae)}</strong></td>
            </tr>

            ${ce?`
            <tr class="section-label"><td colspan="3">Reference Power Savings</td></tr>
            <tr>
              <td>Exceedance avoided</td>
              <td style="text-align: right;">${i(re)} kWh above the reference power level</td>
              <td style="text-align: right;">${_(ge)}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${i(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${_(Me)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Reference Power Savings</strong></td>
              <td style="text-align: right;"><strong>${_(ne)}</strong></td>
            </tr>
            `:""}

            ${o>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${X.map(h=>`
            <tr>
              <td>Sold to grid ${Z?`(${h.shortId})`:`(${i(o)} kWh)`}</td>
              <td style="text-align: right;">${h.label}<br/>${i(h.rate,4)} ${W}/kWh</td>
              <td style="text-align: right;">${_(Z?o/X.length*h.rate:o*h.rate)}</td>
            </tr>
            `).join("")}
            ${Z?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${_(z)}</strong></td>
            </tr>
            `:""}
            `:""}

            <tr class="total-row solar-total-row">
              <td colspan="2"><strong>💰 Total Solar Panel Value</strong></td>
              <td style="text-align: right;"><strong>${_(de)}</strong></td>
            </tr>
          </tbody>
        </table>

        <p class="muted" style="margin-top: var(--sp-3); font-size: var(--text-xs); line-height: var(--lh-relaxed);">
          Self-consumption savings = energy you produced and used yourself instead of buying from the grid.
          These savings are informational here and already reflected in the main invoice because only grid-imported energy is billed.
          Reference-power savings = exceedance charges avoided because solar reduced the net load seen against your reference power during the same 15-minute interval.
          Feed-in revenue = money earned by selling surplus production.
          ${X.some(h=>h.mode==="sensor")?"Market price sourced from Home Assistant sensor.":"Using fixed feed-in tariff — configure a market price sensor in Settings for real-time rates."}
          ${Z?"Revenue split equally across production meters (per-meter export data not yet available).":""}
        </p>
      </div>
      `:""}
    </section>
  `}const It=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],At=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Reference Power Fixed Charge",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"connect_discount",label:"Monthly Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],Vt={consumption:"Power Consumption",production:"Power Production",gas:"Gas Consumption"},tt={consumption:"⚡",production:"☀️",gas:"🔥"};function Ot(t){return t.map(e=>`<span class="meter-type-badge meter-type-${e}">${tt[e]??""} ${Vt[e]??e}</span>`).join(" ")}function Xe(t,e,s){const a=t+1;return s?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${a}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${Ot(e.types)}</div>
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
  `}function st(t){return It.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function Gt(t,e){return`
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
            ${st(e.day_group??"all")}
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
  `}function qt(t,e){return`
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
            ${st(e.day_group??"all")}
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
  `}function Nt(t,e="ha",s){if(!t&&e==="ha")return`
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;const a=e==="standalone"?(s==null?void 0:s.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let n="";if(e==="standalone"){const f=a.map((m,E)=>Xe(E,m,!1)).join("");n=`
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
            ${f.length>0?f.map((E,L)=>Xe(L,E,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const r=f=>f.map(m=>{const E=t?t[m.key]??"":"";return`
        <div class="form-row">
          <label for="cfg-${m.key}">${m.label}</label>
          <div class="input-group">
            <input
              id="cfg-${m.key}"
              name="${m.key}"
              type="${m.type}"
              ${m.type==="number"?`step="${m.step}"`:""}
              value="${E}"
            />
            ${m.unit?`<span class="input-unit">${m.unit}</span>`:""}
          </div>
        </div>
      `}).join(""),o=((t==null?void 0:t.meters)??[]).filter(f=>f.types.includes("production")),u=(t==null?void 0:t.feed_in_rates)??[],p=e==="ha";function v(f){return u.find(m=>m.meter_id===f)??{meter_id:f,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:""}}const d=o.length===0?'<p class="muted">No production meters configured — add a meter with Power Production type above.</p>':o.map((f,m)=>{const E=v(f.id),L=f.id?"…"+f.id.slice(-8):`Meter ${m+1}`;return`
          <div class="feed-in-meter-card" data-meter-idx="${m}" data-meter-id="${f.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${L}</span>
              <input type="hidden" name="feed_in_rate_${m}_meter_id" value="${f.id}" />
            </div>
            <div class="form-row">
              <label>Pricing Mode</label>
              <div class="feed-in-mode-toggle">
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${m}_mode" value="fixed" ${E.mode==="fixed"?"checked":""} />
                  <span class="mode-label">💶 Fixed Tariff</span>
                </label>
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${m}_mode" value="sensor" ${E.mode==="sensor"?"checked":""} />
                  <span class="mode-label">📡 HA Sensor</span>
                </label>
              </div>
            </div>
            <div class="feed-in-fixed-fields" data-rate-idx="${m}" style="${E.mode==="fixed"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${m}_tariff">Feed-in Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${m}_tariff" name="feed_in_rate_${m}_tariff" type="number" step="0.0001" value="${E.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
              </div>
            </div>
            <div class="feed-in-sensor-fields" data-rate-idx="${m}" style="${E.mode==="sensor"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${m}_sensor">Market Price Sensor</label>
                <div class="input-group sensor-picker-group">
                  <input
                    id="cfg-feed_in_rate_${m}_sensor"
                    name="feed_in_rate_${m}_sensor_entity"
                    type="text"
                    value="${E.sensor_entity}"
                    placeholder="${p?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${p&&m===0?'<datalist id="ha-entity-list"></datalist>':""}
              </div>
              <div class="form-row">
                <label for="cfg-feed_in_rate_${m}_fallback">Fallback Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${m}_fallback" name="feed_in_rate_${m}_fallback_tariff" type="number" step="0.0001" value="${E.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
                <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                  Used when the sensor is unavailable.
                </p>
              </div>
            </div>
          </div>
        `}).join(""),g=((t==null?void 0:t.meters)??[]).some(f=>f.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),l=(t==null?void 0:t.consumption_rate_windows)??[],w=(t==null?void 0:t.reference_power_windows)??[],c=(t==null?void 0:t.meters)??[],y=(t==null?void 0:t.meter_monthly_fees)??[];function $(f){return y.find(m=>m.meter_id===f)??{meter_id:f,label:"",fee:0}}const b=c.length===0?'<p class="muted">No meters configured.</p>':c.map((f,m)=>{const E=$(f.id),L=f.id?"…"+f.id.slice(-8):`Meter ${m+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${f.types.map(M=>tt[M]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${L}</code>
              <input type="hidden" name="meter_fee_${m}_meter_id" value="${f.id}" />
            </div>
            <div class="form-row" style="margin-bottom: var(--sp-2);">
              <label for="cfg-meter_fee_${m}_label">Label</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${m}_label" name="meter_fee_${m}_label" type="text" value="${E.label||`Meter ${m+1} metering fee`}" placeholder="e.g. Smart meter rental" />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-meter_fee_${m}_fee">Monthly Fee</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${m}_fee" name="meter_fee_${m}_fee" type="number" step="0.01" value="${E.fee}" />
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
      ${l.length>0?l.map((f,m)=>Gt(m,f)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,k=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${w.length>0?w.map((f,m)=>qt(m,f)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,x=At.map(f=>{if(f.title==="Gas Billing"&&!g||f.title==="Meter Fees"&&c.length<2)return"";let m;return f.title==="Feed-in / Selling"?m=d:f.title==="Time-of-Use Tariffs"?m=D:f.title==="Reference Power Windows"?m=k:f.title==="Discounts"?m=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as a monthly credit. The dashboard prorates it to the selected period and subtracts it before VAT.
      </p>`+r(f.fields):f.title==="Meter Fees"?m=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+b:m=r(f.fields),`
    <div class="form-section">
      <div class="form-section-title">${f.icon}  ${f.title}</div>
      ${m}
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
          ${t?x:'<p class="muted">Loading configuration…</p>'}
          ${t?`
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save Configuration</button>
            <button type="button" id="reset-config-btn" class="btn btn-outline">Reset to Defaults</button>
          </div>
          `:""}
        </form>
      </div>
    </section>
  `}function $e(t,e,s=!1,a="dark"){return`
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
  `}const at="leneda_credentials",rt="leneda_theme";function Yt(){try{const t=localStorage.getItem(at);if(t)return JSON.parse(t)}catch{}return null}function ke(t){try{localStorage.setItem(at,JSON.stringify(t))}catch{}}function Ht(){var t;try{const e=localStorage.getItem(rt);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function Ut(t){try{localStorage.setItem(rt,t)}catch{}}function ze(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const[,s,a,n]=e;return new Date(Number(s),Number(a)-1,Number(n))}function Ze(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function jt(t,e=new Date){switch(t){case"yesterday":{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const a=new Date(s);return a.setHours(23,59,59,999),{start:s,end:a}}case"this_week":{const s=new Date(e),a=s.getDay()||7;return s.setDate(s.getDate()-a+1),s.setHours(0,0,0,0),{start:s,end:e}}case"last_week":{const s=new Date(e),a=s.getDay()||7,n=new Date(s);n.setDate(s.getDate()-a),n.setHours(23,59,59,999);const r=new Date(n);return r.setDate(n.getDate()-6),r.setHours(0,0,0,0),{start:r,end:n}}case"this_month":return{start:new Date(e.getFullYear(),e.getMonth(),1),end:e};case"last_month":{const s=new Date(e.getFullYear(),e.getMonth()-1,1),a=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s,end:a}}case"this_year":return{start:new Date(e.getFullYear(),0,1),end:e};case"last_year":{const s=new Date(e.getFullYear()-1,0,1),a=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s,end:a}}}}function Xt(t,e,s=new Date){const a=ze(t),n=ze(e);if(!a||!n)return null;const r=["yesterday","this_week","last_week","this_month","last_month","this_year","last_year"];for(const o of r){const u=jt(o,s);if(Ze(a,u.start)&&Ze(n,u.end))return o}return null}class zt{constructor(e){J(this,"root");J(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartUnit:"kwh",rangeData:null,consumptionTimeseries:null,productionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:Ht()});J(this,"preZoomRange",null);J(this,"preZoomCustomStart","");J(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await Be();if(this.state.mode=e.mode,e.mode==="standalone"){const s=Yt();if(s&&(this.state.credentials=s),!e.configured&&!s){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&s)try{const{saveCredentials:a}=await V(async()=>{const{saveCredentials:n}=await Promise.resolve().then(()=>H);return{saveCredentials:n}},void 0);await a(s)}catch{}if(!s)try{this.state.credentials=await Je()}catch{}}await this.loadData()}toDisplayError(e,s="Failed to load data"){const a=e instanceof Error?e.message:String(e??"").trim(),n=a.toLowerCase();return n.includes("missing data")||n.includes("no_data")||n.includes("no data")?"Missing data":a||s}clearRangeStateWithError(e,s="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.state.error=this.toDisplayError(e,s)}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.render();try{const[e,s,a]=await Promise.all([he(this.state.range),xe(),oe()]),{start:n,end:r}=this.getDateRangeISO(),[o,u]=await Promise.all([O("1-1:1.29.0",n,r),O("1-1:2.29.0",n,r)]);this.state.rangeData=e,this.state.consumptionTimeseries=o,this.state.productionTimeseries=u,this.state.sensors=s,this.state.config=a}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render()}}async changeRange(e){if(this.preZoomRange=null,this.state.range=e,e==="custom"){if(!this.state.customStart||!this.state.customEnd){const s=new Date;s.setDate(s.getDate()-1);const a=new Date(s);a.setDate(a.getDate()-6),this.state.customStart=a.toISOString().slice(0,10),this.state.customEnd=s.toISOString().slice(0,10)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:s,end:a}=this.getDateRangeISO(),[n,r,o]=await Promise.all([he(e),O("1-1:1.29.0",s,a),O("1-1:2.29.0",s,a)]);this.state.rangeData=n,this.state.consumptionTimeseries=r,this.state.productionTimeseries=o}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render()}}async applyCustomRange(){this.preZoomRange=null;const{customStart:e,customEnd:s}=this.state;if(!(!e||!s)){this.state.error=null,this.state.loading=!0,this.render();try{const a=Xt(e,s),n=a?he(a):V(async()=>{const{fetchCustomData:p}=await Promise.resolve().then(()=>H);return{fetchCustomData:p}},void 0).then(({fetchCustomData:p})=>p(e,s)),[r,o,u]=await Promise.all([n,O("1-1:1.29.0",new Date(e+"T00:00:00").toISOString(),new Date(s+"T23:59:59.999").toISOString()),O("1-1:2.29.0",new Date(e+"T00:00:00").toISOString(),new Date(s+"T23:59:59.999").toISOString())]);this.state.rangeData={range:"custom",consumption:r.consumption,production:r.production,exported:r.exported??0,self_consumed:r.self_consumed??0,grid_import:r.grid_import,solar_to_home:r.solar_to_home,direct_solar_to_home:r.direct_solar_to_home,shared:r.shared,shared_with_me:r.shared_with_me,gas_energy:r.gas_energy??0,gas_volume:r.gas_volume??0,peak_power_kw:r.peak_power_kw??0,exceedance_kwh:r.exceedance_kwh??0,metering_point:r.metering_point??"",start:r.start??e,end:r.end??s},this.state.consumptionTimeseries=o,this.state.productionTimeseries=u}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render()}}}changeTab(e){this.state.tab=e,this.render(),e==="dashboard"&&!this.state.rangeData&&!this.state.loading&&this.loadData(),e==="sensors"&&!this.state.sensors&&xe().then(s=>{this.state.sensors=s,this.render()}),e==="settings"&&!this.state.config&&oe().then(s=>{this.state.config=s,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,Ut(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}printInvoice(){var o,u;const e=document.title,a=`Leneda-invoice-${(o=this.state.rangeData)!=null&&o.start&&((u=this.state.rangeData)!=null&&u.end)?`${this.state.rangeData.start.slice(0,10)}_to_${this.state.rangeData.end.slice(0,10)}`:this.state.range}`.replace(/[^a-z0-9_-]+/gi,"-");let n=!1;const r=()=>{n||(n=!0,document.title=e,window.removeEventListener("afterprint",r))};document.title=a,window.addEventListener("afterprint",r,{once:!0}),window.print(),window.setTimeout(r,1e3)}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const s=this.root.querySelector(".main-content");s?s.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}render(){var o;const{tab:e,loading:s,error:a,theme:n}=this.state;if(s&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${$e(e,u=>{},!1,n)}
          <main class="main-content">
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `,this.attachNavListeners();return}if(a&&!this.state.rangeData){const u=a.toLowerCase().includes("missing data");this.root.innerHTML=`
        <div class="app-shell">
          ${$e(e,p=>{},!1,n)}
          <main class="main-content">
            <div class="error-state">
              <h2>${u?"Missing Data":"Connection Error"}</h2>
              <p>${u?"The selected period could not be loaded because data is missing.":a}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(o=this.root.querySelector("#retry-btn"))==null||o.addEventListener("click",()=>this.loadData());return}let r="";switch(e){case"dashboard":r=qe(this.state);break;case"sensors":r=Tt(this.state.sensors);break;case"invoice":r=Ft(this.state);break;case"settings":r=Nt(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${$e(e,u=>this.changeTab(u),this.state.isMenuOpen,n)}
        <main class="main-content">
          ${s?'<div class="loading-bar"></div>':""}
          ${r}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachInvoiceListeners(),this.attachSettingsListeners()}attachNavListeners(){var e,s;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(s=this.root.querySelector("[data-theme-toggle]"))==null||s.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.tab;this.changeTab(n)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(o=>{o.addEventListener("click",()=>{const u=o.dataset.range;this.changeRange(u)})});const s=this.root.querySelector("#custom-start"),a=this.root.querySelector("#custom-end");s&&s.addEventListener("change",()=>{this.state.customStart=s.value}),a&&a.addEventListener("change",()=>{this.state.customEnd=a.value});const n=this.root.querySelector("#apply-custom-range");if(n==null||n.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(o=>{o.addEventListener("click",()=>{const u=o.dataset.chartUnit;u!==this.state.chartUnit&&(this.state.chartUnit=u,this.render())})}),!e){const o=this.root.querySelector("#energy-chart");o&&this.state.rangeData&&this.initChart(o)}const r=this.root.querySelector(".reset-zoom-btn");r==null||r.addEventListener("click",async()=>{const{resetChartZoom:o}=await V(async()=>{const{resetChartZoom:u}=await import("./Charts-CTuzU3zd.js");return{resetChartZoom:u}},[]);if(o(),r.style.display="none",this.preZoomRange!==null){const u=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",u==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(u)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachInvoiceListeners(){var e;(e=this.root.querySelector("#print-invoice-btn"))==null||e.addEventListener("click",()=>{this.printInvoice()})}attachSettingsListeners(){var p,v;const e=this.root.querySelector("#credentials-form");if(e){const d=this.root.querySelector("#add-meter-btn");d==null||d.addEventListener("click",()=>{var y,$;const w=new FormData(e),c=g(w);if(c.length<10){c.push({id:"",types:["consumption"]});const b={api_key:w.get("api_key")||((y=this.state.credentials)==null?void 0:y.api_key)||"",energy_id:w.get("energy_id")||(($=this.state.credentials)==null?void 0:$.energy_id)||"",meters:c};this.state.credentials=b,ke(b),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach(w=>{w.addEventListener("click",()=>{var D,k;const c=parseInt(w.dataset.meter??"0",10),y=new FormData(e),$=g(y);$.splice(c,1);const b={api_key:y.get("api_key")||((D=this.state.credentials)==null?void 0:D.api_key)||"",energy_id:y.get("energy_id")||((k=this.state.credentials)==null?void 0:k.energy_id)||"",meters:$};this.state.credentials=b,ke(b),this.renderPreserveMainScroll()})});const g=w=>{var y,$,b;const c=[];for(let D=0;D<10;D++){const k=w.get(`meter_${D}_id`);if(k===null)break;const x=[];(y=e.querySelector(`[name="meter_${D}_consumption"]`))!=null&&y.checked&&x.push("consumption"),($=e.querySelector(`[name="meter_${D}_production"]`))!=null&&$.checked&&x.push("production"),(b=e.querySelector(`[name="meter_${D}_gas"]`))!=null&&b.checked&&x.push("gas"),c.push({id:k.trim(),types:x})}return c};e.addEventListener("submit",async w=>{w.preventDefault();const c=new FormData(e),y={api_key:c.get("api_key"),energy_id:c.get("energy_id"),meters:g(c)},$=this.root.querySelector("#creds-status");try{ke(y);const{saveCredentials:b}=await V(async()=>{const{saveCredentials:D}=await Promise.resolve().then(()=>H);return{saveCredentials:D}},void 0);await b(y),$&&($.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=y,this.state.error=null,await this.loadData()}catch(b){$&&($.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${b instanceof Error?b.message:b}</p>`)}});const l=this.root.querySelector("#test-creds-btn");l==null||l.addEventListener("click",async()=>{const w=new FormData(e),c={api_key:w.get("api_key"),energy_id:w.get("energy_id"),meters:g(w)},y=this.root.querySelector("#creds-status");y&&(y.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:$}=await V(async()=>{const{testCredentials:D}=await Promise.resolve().then(()=>H);return{testCredentials:D}},void 0),b=await $(c);y&&(y.innerHTML=b.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${b.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${b.message}</p>`)}catch($){y&&(y.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${$ instanceof Error?$.message:$}</p>`)}})}const s=this.root.querySelector("#settings-form");if(!s)return;const a=d=>{const g=[];for(let l=0;l<24;l++){const w=d.get(`consumption_window_${l}_label`),c=d.get(`consumption_window_${l}_day_group`),y=d.get(`consumption_window_${l}_start_time`),$=d.get(`consumption_window_${l}_end_time`),b=d.get(`consumption_window_${l}_rate`);if(w===null&&c===null&&y===null&&$===null&&b===null)break;g.push({label:(w??"").trim()||`Window ${l+1}`,day_group:c??"all",start_time:y??"00:00",end_time:$??"06:00",rate:parseFloat(b??"0")||0})}return g},n=d=>{const g=[];for(let l=0;l<24;l++){const w=d.get(`reference_window_${l}_label`),c=d.get(`reference_window_${l}_day_group`),y=d.get(`reference_window_${l}_start_time`),$=d.get(`reference_window_${l}_end_time`),b=d.get(`reference_window_${l}_reference_power_kw`);if(w===null&&c===null&&y===null&&$===null&&b===null)break;g.push({label:(w??"").trim()||`Reference ${l+1}`,day_group:c??"all",start_time:y??"17:00",end_time:$??"00:00",reference_power_kw:parseFloat(b??"0")||0})}return g},r=()=>{var D;const d=new FormData(s),g={};s.querySelectorAll('input[type="checkbox"]').forEach(k=>{g[k.name]=k.checked});const l=[],w=/^feed_in_rate_(\d+)_(.+)$/,c={},y=[],$=/^meter_fee_(\d+)_(.+)$/,b={};for(const[k,x]of d.entries()){if(k.startsWith("consumption_window_")||k.startsWith("reference_window_"))continue;const f=k.match(w);if(f){const M=f[1],I=f[2];c[M]||(c[M]={}),c[M][I]=x;continue}const m=k.match($);if(m){const M=m[1],I=m[2];b[M]||(b[M]={}),b[M][I]=x;continue}if(g[k]!==void 0&&typeof g[k]=="boolean")continue;const E=x,L=s.elements.namedItem(k);if(E===""&&L instanceof HTMLInputElement&&L.type==="number"){const M=(D=this.state.config)==null?void 0:D[k];typeof M=="number"&&isFinite(M)&&(g[k]=M);continue}const P=parseFloat(E);g[k]=isNaN(P)?E:P}for(const k of Object.keys(c).sort()){const x=c[k],f=x.mode??"fixed",m=f==="sensor"?x.fallback_tariff??x.tariff:x.tariff;l.push({meter_id:x.meter_id??"",mode:f,tariff:parseFloat(m??"0.08")||.08,sensor_entity:x.sensor_entity??""})}l.length>0&&(g.feed_in_rates=l);for(const k of Object.keys(b).sort()){const x=b[k];y.push({meter_id:x.meter_id??"",label:x.label??"",fee:parseFloat(x.fee??"0")||0})}return y.length>0&&(g.meter_monthly_fees=y),g.consumption_rate_windows=a(d),g.reference_power_windows=n(d),g},o=d=>{if(!this.state.config)return;const g=r();d(g),this.state.config={...this.state.config,...g},this.renderPreserveMainScroll()};if((p=this.root.querySelector("#add-consumption-window-btn"))==null||p.addEventListener("click",()=>{o(d=>{var l;const g=Array.isArray(d.consumption_rate_windows)?[...d.consumption_rate_windows]:[];g.push({label:`Window ${g.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((l=this.state.config)==null?void 0:l.energy_variable_rate)??.1125}),d.consumption_rate_windows=g})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(d=>{d.addEventListener("click",()=>{const g=parseInt(d.dataset.window??"0",10);o(l=>{const w=Array.isArray(l.consumption_rate_windows)?[...l.consumption_rate_windows]:[];w.splice(g,1),l.consumption_rate_windows=w})})}),(v=this.root.querySelector("#add-reference-window-btn"))==null||v.addEventListener("click",()=>{o(d=>{var l;const g=Array.isArray(d.reference_power_windows)?[...d.reference_power_windows]:[];g.push({label:`Reference ${g.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((l=this.state.config)==null?void 0:l.reference_power_kw)??5}),d.reference_power_windows=g})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(d=>{d.addEventListener("click",()=>{const g=parseInt(d.dataset.window??"0",10);o(l=>{const w=Array.isArray(l.reference_power_windows)?[...l.reference_power_windows]:[];w.splice(g,1),l.reference_power_windows=w})})}),s.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(d=>{d.addEventListener("change",()=>{const g=d.name.match(/feed_in_rate_(\d+)_mode/);if(!g)return;const l=g[1],w=s.querySelector(`.feed-in-fixed-fields[data-rate-idx="${l}"]`),c=s.querySelector(`.feed-in-sensor-fields[data-rate-idx="${l}"]`);w&&(w.style.display=d.value==="fixed"?"":"none"),c&&(c.style.display=d.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const d=this.root.querySelector("#ha-entity-list");d&&Qe().then(({entities:g})=>{d.innerHTML=g.map(l=>`<option value="${l}"></option>`).join("")}).catch(()=>{})}s.addEventListener("submit",async d=>{d.preventDefault();const g=r();try{const{saveConfig:l}=await V(async()=>{const{saveConfig:w}=await Promise.resolve().then(()=>H);return{saveConfig:w}},void 0);await l(g),this.state.config=await oe(),this.render()}catch(l){alert("Failed to save: "+(l instanceof Error?l.message:l))}});const u=this.root.querySelector("#reset-config-btn");u==null||u.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?"))try{const{resetConfig:d}=await V(async()=>{const{resetConfig:g}=await Promise.resolve().then(()=>H);return{resetConfig:g}},void 0);await d(),this.state.config=await oe(),this.render()}catch(d){alert("Failed to reset: "+(d instanceof Error?d.message:d))}})}async initChart(e){var s,a;try{const{renderEnergyChart:n}=await V(async()=>{const{renderEnergyChart:c}=await import("./Charts-CTuzU3zd.js");return{renderEnergyChart:c}},[]),{fetchTimeseries:r,fetchPerMeterTimeseries:o}=await V(async()=>{const{fetchTimeseries:c,fetchPerMeterTimeseries:y}=await Promise.resolve().then(()=>H);return{fetchTimeseries:c,fetchPerMeterTimeseries:y}},void 0),{start:u,end:p}=this.getDateRangeISO(),[v,d]=await Promise.all([r("1-1:1.29.0",u,p),r("1-1:2.29.0",u,p)]),g=((s=this.state.config)==null?void 0:s.reference_power_kw)??0,l=(((a=this.state.config)==null?void 0:a.meters)??[]).filter(c=>c.types.includes("production"));let w;if(l.length>1)try{const c=await o("1-1:2.29.0",u,p);c.meters&&c.meters.length>1&&(w=c.meters)}catch(c){console.warn("Per-meter timeseries fetch failed, using merged view:",c)}n(e,v,d,{unit:this.state.chartUnit,referencePowerKw:g,perMeterProduction:w,onZoomChange:(c,y)=>{this.handleChartZoomChange(c,y)}})}catch(n){console.error("Chart init failed:",n)}}async handleChartZoomChange(e,s){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd);const{fetchCustomData:a}=await V(async()=>{const{fetchCustomData:v}=await Promise.resolve().then(()=>H);return{fetchCustomData:v}},void 0),n=e.slice(0,10),r=s.slice(0,10),o=await a(n,r),[u,p]=await Promise.all([O("1-1:1.29.0",new Date(n+"T00:00:00").toISOString(),new Date(r+"T23:59:59.999").toISOString()),O("1-1:2.29.0",new Date(n+"T00:00:00").toISOString(),new Date(r+"T23:59:59.999").toISOString())]);this.state.range="custom",this.state.customStart=n,this.state.customEnd=r,this.state.rangeData={range:"custom",consumption:o.consumption,production:o.production,exported:o.exported??0,self_consumed:o.self_consumed??0,gas_energy:o.gas_energy??0,gas_volume:o.gas_volume??0,grid_import:o.grid_import,solar_to_home:o.solar_to_home,direct_solar_to_home:o.direct_solar_to_home,shared:o.shared,shared_with_me:o.shared_with_me,peak_power_kw:o.peak_power_kw??0,exceedance_kwh:o.exceedance_kwh??0,metering_point:o.metering_point??"",start:o.start,end:o.end},this.state.consumptionTimeseries=u,this.state.productionTimeseries=p,this.renderDashboardPartial()}catch(a){console.error("Zoom data fetch failed:",a),this.clearRangeStateWithError(a,"Missing data"),this.render()}}renderDashboardPartial(){var f,m;const e=this.root.querySelector(".dashboard");if(!e||!this.state.rangeData)return;const s=document.createElement("div");s.innerHTML=qe(this.state);const a=s.querySelector(".dashboard");if(!a)return;const n=e.querySelector(".range-selector"),r=a.querySelector(".range-selector");n&&r&&n.replaceWith(r);const o=e.querySelector(".range-info-bar"),u=a.querySelector(".range-info-bar");o&&u?o.replaceWith(u):!o&&u?(f=e.querySelector(".range-selector"))==null||f.insertAdjacentElement("afterend",u):o&&!u&&o.remove();const p=e.querySelector(".custom-range-picker"),v=a.querySelector(".custom-range-picker");if(p&&v)p.replaceWith(v);else if(!p&&v){const E=e.querySelector(".range-info-bar")??e.querySelector(".range-selector");E==null||E.insertAdjacentElement("afterend",v)}else p&&!v&&p.remove();const d=e.querySelector(".stats-grid"),g=a.querySelector(".stats-grid");d&&g&&d.replaceWith(g);const l=e.querySelector(".flow-card"),w=a.querySelector(".flow-card");l&&w&&l.replaceWith(w);const c=e.querySelector(".metrics-card"),y=a.querySelector(".metrics-card");c&&y&&c.replaceWith(y);const $=e.querySelector(".chart-header .card-title"),b=a.querySelector(".chart-header .card-title");$&&b&&$.replaceWith(b);const D=e.querySelector(".reset-zoom-btn");D&&(D.style.display=""),e.querySelectorAll("[data-range]").forEach(E=>{E.addEventListener("click",()=>{this.changeRange(E.dataset.range)})});const k=e.querySelector("#custom-start"),x=e.querySelector("#custom-end");k&&k.addEventListener("change",()=>{this.state.customStart=k.value}),x&&x.addEventListener("change",()=>{this.state.customEnd=x.value}),(m=e.querySelector("#apply-custom-range"))==null||m.addEventListener("click",()=>{this.preZoomRange=null,this.applyCustomRange()})}getDateRangeISO(){const e=new Date,s=a=>a.toISOString();switch(this.state.range){case"custom":{const a=new Date(this.state.customStart+"T00:00:00"),n=new Date(this.state.customEnd+"T23:59:59.999");return{start:s(a),end:s(n)}}case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const n=new Date(a);return n.setHours(23,59,59,999),{start:s(a),end:s(n)}}case"this_week":{const a=new Date(e),n=a.getDay()||7;return a.setDate(a.getDate()-n+1),a.setHours(0,0,0,0),{start:s(a),end:s(e)}}case"last_week":{const a=new Date(e),n=a.getDay()||7,r=new Date(a);r.setDate(a.getDate()-n),r.setHours(23,59,59,999);const o=new Date(r);return o.setDate(r.getDate()-6),o.setHours(0,0,0,0),{start:s(o),end:s(r)}}case"this_month":{const a=new Date(e.getFullYear(),e.getMonth(),1);return{start:s(a),end:s(e)}}case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),n=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:s(a),end:s(n)}}case"this_year":{const a=new Date(e.getFullYear(),0,1);return{start:s(a),end:s(e)}}case"last_year":{const a=new Date(e.getFullYear()-1,0,1),n=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:s(a),end:s(n)}}default:{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const n=new Date(a);return n.setHours(23,59,59,999),{start:s(a),end:s(n)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new zt(t).mount()}
