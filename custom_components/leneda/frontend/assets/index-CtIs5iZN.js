var Wt=Object.defineProperty;var Rt=(t,e,a)=>e in t?Wt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var se=(t,e,a)=>Rt(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const Ft="modulepreload",Pt=function(t){return"/leneda-panel/static/"+t},Ye={},G=function(e,a,s){let n=Promise.resolve();if(a&&a.length>0){let o=function(h){return Promise.all(h.map(d=>Promise.resolve(d).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));n=o(a.map(h=>{if(h=Pt(h),h in Ye)return;Ye[h]=!0;const d=h.endsWith(".css"),m=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${m}`))return;const i=document.createElement("link");if(i.rel=d?"stylesheet":Ft,d||(i.as="script"),i.crossOrigin="",i.href=h,u&&i.setAttribute("nonce",u),document.head.appendChild(i),d)return new Promise((v,p)=>{i.addEventListener("load",v),i.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return n.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};function it(t){return{api_key:(t.api_key??"").trim(),energy_id:(t.energy_id??"").trim(),meters:(t.meters??[]).map(e=>({...e,id:(e.id??"").trim()})),proxy_url:(t.proxy_url??"").trim()}}function Lt(){var t,e,a,s,n;try{const r=(e=(t=window.parent)==null?void 0:t.document)==null?void 0:e.querySelector("home-assistant");return((n=(s=(a=r==null?void 0:r.hass)==null?void 0:a.auth)==null?void 0:s.data)==null?void 0:n.access_token)??null}catch{return null}}async function V(t,e){const a=Lt(),s={...e==null?void 0:e.headers,...a?{Authorization:`Bearer ${a}`}:{}},n={...e,credentials:"include",headers:s},r=await fetch(t,n);if(!r.ok){const o=r.headers.get("content-type")??"";let l="",u="";if(o.includes("application/json")){const h=await r.json().catch(()=>null);l=String((h==null?void 0:h.error)??"").trim(),u=String((h==null?void 0:h.message)??(h==null?void 0:h.error)??"").trim()}else u=(await r.text().catch(()=>"")).trim();throw l==="missing_data"||l==="no_data"||r.status===503?new Error("Missing data"):new Error(u?`API ${r.status}: ${u}`:`API ${r.status}: ${r.statusText}`)}return r.json()}async function ye(t){return V(`/leneda_api/data?range=${t}`)}async function Kt(t,e){return V(`/leneda_api/data/custom?start=${encodeURIComponent(t)}&end=${encodeURIComponent(e)}`)}async function N(t,e,a){let s=`/leneda_api/data/timeseries?obis=${encodeURIComponent(t)}`;return e&&(s+=`&start=${encodeURIComponent(e)}`),a&&(s+=`&end=${encodeURIComponent(a)}`),V(s)}async function At(t,e,a){let s=`/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(t)}`;return e&&(s+=`&start=${encodeURIComponent(e)}`),a&&(s+=`&end=${encodeURIComponent(a)}`),V(s)}async function We(){return V("/leneda_api/sensors")}async function ce(){return V("/leneda_api/config")}async function Vt(t){await V("/leneda_api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function It(){await V("/leneda_api/config/reset",{method:"POST"})}async function lt(){try{return await V("/leneda_api/mode")}catch{return{mode:"standalone",configured:!1}}}async function ct(){return V("/leneda_api/credentials")}async function Ht(t){const e=it(t);await V("/leneda_api/credentials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Nt(t){const e=it(t);return V("/leneda_api/credentials/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function dt(){return V("/leneda_api/ha-entities")}const Y=Object.freeze(Object.defineProperty({__proto__:null,fetchConfig:ce,fetchCredentials:ct,fetchCustomData:Kt,fetchHAEntities:dt,fetchMode:lt,fetchPerMeterTimeseries:At,fetchRangeData:ye,fetchSensors:We,fetchTimeseries:N,resetConfig:It,saveConfig:Vt,saveCredentials:Ht,testCredentials:Nt},Symbol.toStringTag,{value:"Module"}));function c(t,e=2){return t==null?"—":t.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:e})}function j(t){return new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function ut(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}const de=[{id:"yesterday",label:"Yesterday"},{id:"this_week",label:"This Week"},{id:"last_week",label:"Last Week"},{id:"this_month",label:"This Month"},{id:"last_month",label:"Last Month"},{id:"this_year",label:"This Year"},{id:"last_year",label:"Last Year"},{id:"custom",label:"Custom"}];function je(t){var te;const e=t.rangeData,a=M=>{if(!M)return"";const W=M.match(/^(\d{4}-\d{2}-\d{2})/);return W?W[1]:""},s=(e==null?void 0:e.consumption)??0,n=(e==null?void 0:e.production)??0,r=(e==null?void 0:e.exported)??0,o=(e==null?void 0:e.self_consumed)??0,l=(e==null?void 0:e.gas_energy)??0,u=(e==null?void 0:e.gas_volume)??0,h=(e==null?void 0:e.peak_power_kw)??0,d=a(e==null?void 0:e.start),m=a(e==null?void 0:e.end),i=(e==null?void 0:e.shared_with_me)??0,v=(e==null?void 0:e.shared)??0,p=Math.max(0,r),g=Math.max(0,(e==null?void 0:e.solar_to_home)??(e==null?void 0:e.direct_solar_to_home)??(o>0?o:n-p)),k=Math.max(0,(e==null?void 0:e.direct_solar_to_home)??g),b=g,C=Math.max(0,(e==null?void 0:e.grid_import)??s-g),$=s>0?s:C+g,x=$>0?Math.min(100,g/$*100):0,y=Math.max(n,C,p,v,i,k,1),f=(M,W=2.8,R=8.2)=>M>0?W+M/y*(R-W):1.8,w=M=>f(M)+1.4,D=M=>f(M)+5.4,T=(M,W=.28,R=.88)=>M>0?W+M/y*(R-W):.1,E=(M,W=.09,R=.22)=>M>0?W+M/y*(R-W):.05,K=(M,W=1.6,R=3.9)=>`${(M>0?Math.max(W,R-M/y*(R-W)):R).toFixed(2)}s`,A=(M,W=3.4,R=5.8)=>M>0?W+M/y*(R-W):3,L=M=>M>0?Math.max(18,Math.round(M/y*100)):0,H=M=>{const{path:W,value:R,gradientId:ae,colorVar:X,filterId:ne,particleClass:q,direction:we="forward"}=M,pe=we==="reverse"?"1;0":"0;1";return`
      <path
        class="flow-halo ${q}"
        d="${W}"
        stroke="url(#${ae})"
        stroke-width="${D(R).toFixed(1)}"
        stroke-opacity="${E(R).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-rail ${q}"
        d="${W}"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="${w(R).toFixed(1)}"
        stroke-opacity="0.42"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-stream ${q}"
        d="${W}"
        stroke="url(#${ae})"
        stroke-width="${f(R).toFixed(1)}"
        stroke-opacity="${T(R).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      ${R>0?`
        <circle
          class="flow-particle ${q}"
          r="${A(R).toFixed(1)}"
          fill="${X}"
          filter="url(#${ne})"
        >
          <animateMotion dur="${K(R)}" repeatCount="indefinite" path="${W}" keyPoints="${pe}" keyTimes="0;1" calcMode="linear" />
        </circle>
        <circle
          class="flow-particle flow-particle-secondary ${q}"
          r="${Math.max(2.4,A(R)-1.2).toFixed(1)}"
          fill="${X}"
          fill-opacity="0.75"
          filter="url(#${ne})"
        >
          <animateMotion dur="${K(R)}" begin="-${(parseFloat(K(R))/2).toFixed(2)}s" repeatCount="indefinite" path="${W}" keyPoints="${pe}" keyTimes="0;1" calcMode="linear" />
        </circle>
      `:""}
    `},ue=e!=null&&e.start&&(e!=null&&e.end)?`${j(e.start)} — ${j(e.end)}`:t.range==="custom"&&t.customStart&&t.customEnd?`${j(t.customStart+"T00:00:00")} — ${j(t.customEnd+"T00:00:00")}`:((te=de.find(M=>M.id===t.range))==null?void 0:te.label)??"Yesterday",ee=t.chartConsumptionView==="house"?"Total Usage shows the full house load, with the solar-covered share highlighted in green and exports below zero · Scroll to zoom · Drag to pan":"Net Grid focuses on what still came from the grid after solar, with exports shown below zero · The reference limit in kW mode applies here · Scroll to zoom · Drag to pan";return`
    <div class="dashboard" style="position: relative;">
      <div style="position:fixed;bottom:4px;right:4px;font-size:10px;opacity:0.5;pointer-events:none;z-index:9999;">v:2.5.0</div>

      <!-- Range Selector -->
      <div class="range-selector">
        ${de.map(M=>`
          <button
            class="range-btn ${M.id===t.range?"active":""}"
            data-range="${M.id}"
          >${M.label}</button>
        `).join("")}
      </div>

      ${(()=>{if(!(e!=null&&e.start)||!(e!=null&&e.end))return"";try{const M=new Date(e.start),W=new Date(e.end);return isNaN(M.getTime())||isNaN(W.getTime())?"":`
            <div class="range-info-bar">
              📅 ${M.toLocaleDateString()} — ${W.toLocaleDateString()}
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
      `:d&&m?`
      <!-- Preset Period Preview -->
      <div class="custom-range-picker period-preview">
        <span class="period-preview-label">Viewed period</span>
        <label>
          <span>From</span>
          <input type="date" value="${d}" readonly aria-label="Preset period start" />
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
            <div class="stat-value">${c(s)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.production">
          <div class="stat-icon">☀️</div>
          <div class="stat-body">
            <div class="stat-label">Production</div>
            <div class="stat-value">${c(n)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.export">
          <div class="stat-icon">📤</div>
          <div class="stat-body">
            <div class="stat-label">Exported</div>
            <div class="stat-value">${c(r)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.self-consumed">
          <div class="stat-icon">🏠</div>
          <div class="stat-body">
            <div class="stat-label">Self-Consumed</div>
            <div class="stat-value">${c(b)} <span class="stat-unit">kWh</span></div>
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
                    <span class="module-value highlight-green">${c(n)}</span>
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
                  <text x="16" y="38" class="scene-node-value">${c(C+p)} kWh</text>
                </g>

                <g class="scene-node-label" transform="translate(338, 44)">
                  <rect width="124" height="48" rx="16" fill="var(--clr-overlay)" stroke="rgba(63, 185, 80, 0.24)" />
                  <text x="16" y="20" class="scene-node-kicker">Solar</text>
                  <text x="16" y="36" class="scene-node-value">${c(n)} kWh</text>
                </g>

                <g class="scene-node-label" transform="translate(600, 108)">
                  <rect width="146" height="52" rx="16" fill="var(--clr-overlay)" stroke="rgba(88, 166, 255, 0.24)" />
                  <text x="16" y="22" class="scene-node-kicker">Community</text>
                  <text x="16" y="38" class="scene-node-value">${c(v+i)} kWh</text>
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
                    <text text-anchor="middle" y="18" class="house-core-value">${c(x,0)}%</text>
                  </g>
                </g>

                ${H({path:"M 560 98 C 520 102 474 130 434 182",value:k,gradientId:"flow-solar",colorVar:"var(--clr-production)",filterId:"glow-green",particleClass:"flow-solar"})}

                ${H({path:"M 146 224 C 226 224 298 224 354 214",value:C,gradientId:"flow-grid-in",colorVar:"var(--clr-consumption)",filterId:"glow-red",particleClass:"flow-grid-in"})}

                ${H({path:"M 446 246 C 386 292 286 314 146 312",value:p,gradientId:"flow-grid-out",colorVar:"var(--clr-export)",filterId:"glow-blue",particleClass:"flow-grid-out"})}

                ${H({path:"M 450 206 C 514 184 582 184 650 206",value:v,gradientId:"flow-shared-out",colorVar:"var(--clr-export)",filterId:"glow-blue",particleClass:"flow-shared-out"})}

                ${H({path:"M 650 236 C 586 252 522 254 448 238",value:i,gradientId:"flow-shared-in",colorVar:"var(--clr-primary)",filterId:"glow-cyan",particleClass:"flow-shared-in",direction:"reverse"})}
              </svg>
            </div>

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${c($)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${c(x,0)}% solar supplied${h>0?` · Peak ${c(h,2)} kW`:""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${c(g)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${L(g)}%;"></span></div>
                  <p>Energy used inside the house${i>0?", including received community energy":""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${c(C)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${L(C)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${c(p)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${L(p)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${c(v+i)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${L(v+i)}%;"></span></div>
                  <p>Sent ${c(v)} kWh · received ${c(i)} kWh.</p>
                </div>
              </div>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${c(g)} kWh used in the house</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${c(C)} kWh bought from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${c(p)} kWh sent back to the market</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${c(v)} kWh sent · ${c(i)} kWh received${i>0?" (included in solar to home)":""}</span>
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
              <span class="metric-value">${c(x,1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${x}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Consumed</span>
              <span class="metric-value">${c(b)} kWh</span>
            </div>
          </div>
          ${h>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${c(h,2)} kW</span>
            </div>
          </div>
          `:""}
          <div class="metric ${((e==null?void 0:e.exceedance_kwh)??0)>0?"metric-warning":"metric-ok"}">
            <div class="metric-header">
              <span class="metric-label">${((e==null?void 0:e.exceedance_kwh)??0)>0?"⚠️":"✅"} Exceedance</span>
              <span class="metric-value">${c((e==null?void 0:e.exceedance_kwh)??0,2)} kWh</span>
            </div>
          </div>
          ${l>0||u>0?`
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${c(l)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${c(u)} m³</span>
            </div>
          </div>
          `:""}
        </div>
      </div>
      </div>

      <!-- Chart -->
      <div class="card chart-card">
        <div class="chart-header">
          <h3 class="card-title"><span class="title-icon">📉</span> Energy Profile — ${ue}</h3>
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
          ${ee}
        </p>
      </div>

      </div>

      </div>
    </section>
  `}const Xe=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],Me={house:"Total Usage",grid:"Net Grid",solar:"Solar Production"};function ze(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function Ot(t){const e=new Date(t),a=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${s}-${n}`}function Gt(t){const[e,a,s]=t.split("-").map(Number);return new Date(e,a-1,s,12,0,0,0)}function re(t,e=0){return t.length?Math.max(...t):e}function pt(t,e=0){return t.length?Math.min(...t):e}function qt(t,e,a){return Math.min(a,Math.max(e,t))}function I(t,e){return`${c(t,2)} ${e}`}function ve(t,e=1){return Math.abs(t)<.005?"0":`${t>0?"+":""}${c(t,e)}`}function Be(t){const[e,a]=t.split(":").map(s=>parseInt(s,10)||0);return e*60+a}function Ut(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function ht(t,e,a,s){if(!Ut(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),r=Be(a),o=Be(s);return r===o?!0:r<o?n>=r&&n<o:n>=r||n<o}function Yt(t,e){return e.find(a=>ht(t,a.day_group,a.start_time,a.end_time))}function jt(t,e){return e.find(a=>ht(t,a.day_group,a.start_time,a.end_time))}function Xt(t){const e=(t.meters??[]).filter(n=>n.types.includes("production")),a=t.feed_in_rates??[];if(!e.length)return t.feed_in_tariff??0;const s=e.map(n=>{const r=a.find(l=>l.meter_id===n.id);return r?r.mode==="sensor"&&r.sensor_value!=null&&Number.isFinite(r.sensor_value)?r.sensor_value??0:Number.isFinite(r.tariff)?r.tariff:t.feed_in_tariff??0:t.feed_in_tariff??0}).filter(n=>Number.isFinite(n)&&n>=0);return s.length?s.reduce((n,r)=>n+r,0)/s.length:t.feed_in_tariff??0}function zt(t,e,a){const s=new Map;for(const h of t.items){const d=new Date(h.startedAt).getTime();if(!Number.isFinite(d))continue;const m=s.get(d)??{houseKw:0,solarKw:0,iso:h.startedAt};m.houseKw+=Math.max(0,Number(h.value)||0),m.iso=h.startedAt,s.set(d,m)}for(const h of e.items){const d=new Date(h.startedAt).getTime();if(!Number.isFinite(d))continue;const m=s.get(d)??{houseKw:0,solarKw:0,iso:h.startedAt};m.solarKw+=Math.max(0,Number(h.value)||0),m.iso=m.iso||h.startedAt,s.set(d,m)}const n=a.consumption_rate_windows??[],r=a.reference_power_windows??[],o=a.reference_power_kw??0,l=Xt(a),u=(a.exceedance_rate??0)*(1+(a.vat_rate??0));return[...s.entries()].sort((h,d)=>h[0]-d[0]).map(([h,d])=>{var w,D;const m=new Date(h),i=Math.max(0,d.houseKw),v=Math.max(0,d.solarKw),p=Math.max(0,Math.min(i,v)),g=Math.max(0,i-p),k=Math.max(0,v-p),b=((w=jt(m,r))==null?void 0:w.reference_power_kw)??o,C=Math.max(0,i-b),$=Math.max(0,g-b),x=Math.max(0,C-$),f=((((D=Yt(m,n))==null?void 0:D.rate)??a.energy_variable_rate??0)+(a.network_variable_rate??0)+(a.electricity_tax_rate??0)+(a.compensation_fund_rate??0))*(1+(a.vat_rate??0));return{timestamp:h,iso:d.iso,date:m,houseKw:i,solarKw:v,solarToHomeKw:p,gridKw:g,exportKw:k,referenceKw:b,overKw:$,avoidedOverKw:x,importRateWithVat:f,feedInRate:l,exceedanceRateWithVat:u}})}function mt(t,e,a){const s=zt(t,e,a),n=new Map,r=Array.from({length:24},()=>0),o={house:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),grid:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0}))),solar:Array.from({length:7},()=>Array.from({length:24},()=>({sum:0,count:0})))},l={houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0};for(const i of s){const p=Ot(i.timestamp),g=n.get(p)??(()=>{const H=Gt(p);return{key:p,label:H.toLocaleDateString(void 0,{month:"short",day:"numeric"}),fullDate:H.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),houseKwh:0,solarKwh:0,solarToHomeKwh:0,gridKwh:0,exportKwh:0,exceedanceKwh:0,avoidedExceedanceKwh:0,importCost:0,solarSavings:0,exportRevenue:0,exceedanceCost:0,avoidedExceedanceValue:0,solarValue:0,coveragePct:0,selfConsumedPct:0,peakGridKw:0,peakHouseKw:0,exceedanceIntervals:0}})(),k=i.houseKw*.25,b=i.solarKw*.25,C=i.solarToHomeKw*.25,$=i.gridKw*.25,x=i.exportKw*.25,y=i.overKw*.25,f=i.avoidedOverKw*.25,w=$*i.importRateWithVat,D=C*i.importRateWithVat,T=x*i.feedInRate,E=y*i.exceedanceRateWithVat,K=f*i.exceedanceRateWithVat;g.houseKwh+=k,g.solarKwh+=b,g.solarToHomeKwh+=C,g.gridKwh+=$,g.exportKwh+=x,g.exceedanceKwh+=y,g.avoidedExceedanceKwh+=f,g.importCost+=w,g.solarSavings+=D,g.exportRevenue+=T,g.exceedanceCost+=E,g.avoidedExceedanceValue+=K,g.peakGridKw=Math.max(g.peakGridKw,i.gridKw),g.peakHouseKw=Math.max(g.peakHouseKw,i.houseKw),g.exceedanceIntervals+=i.overKw>0?1:0,n.set(p,g),l.houseKwh+=k,l.solarKwh+=b,l.solarToHomeKwh+=C,l.gridKwh+=$,l.exportKwh+=x,l.exceedanceKwh+=y,l.avoidedExceedanceKwh+=f,l.importCost+=w,l.solarSavings+=D,l.exportRevenue+=T,l.exceedanceCost+=E,l.avoidedExceedanceValue+=K,l.peakGridKw=Math.max(l.peakGridKw,i.gridKw),l.peakHouseKw=Math.max(l.peakHouseKw,i.houseKw),l.exceedanceIntervals+=i.overKw>0?1:0;const A=(i.date.getDay()+6)%7,L=i.date.getHours();o.house[A][L].sum+=i.houseKw,o.house[A][L].count+=1,o.grid[A][L].sum+=i.gridKw,o.grid[A][L].count+=1,o.solar[A][L].sum+=i.solarKw,o.solar[A][L].count+=1,r[L]+=y}const u=[...n.values()].sort((i,v)=>i.key.localeCompare(v.key)).map(i=>(i.coveragePct=i.houseKwh>0?i.solarToHomeKwh/i.houseKwh*100:0,i.selfConsumedPct=i.solarKwh>0?i.solarToHomeKwh/i.solarKwh*100:0,i.solarValue=i.solarSavings+i.exportRevenue+i.avoidedExceedanceValue,i));l.coveragePct=l.houseKwh>0?l.solarToHomeKwh/l.houseKwh*100:0,l.selfConsumedPct=l.solarKwh>0?l.solarToHomeKwh/l.solarKwh*100:0,l.solarValue=l.solarSavings+l.exportRevenue+l.avoidedExceedanceValue;const h={house:o.house.map(i=>i.map(v=>v.count?v.sum/v.count:0)),grid:o.grid.map(i=>i.map(v=>v.count?v.sum/v.count:0)),solar:o.solar.map(i=>i.map(v=>v.count?v.sum/v.count:0))},d=s.filter(i=>i.overKw>0).sort((i,v)=>v.overKw-i.overKw||v.timestamp-i.timestamp).slice(0,8),m=[...u].filter(i=>i.exceedanceKwh>0).sort((i,v)=>v.exceedanceKwh-i.exceedanceKwh).slice(0,6);return{daily:u,totals:l,topExceedances:d,hourlyExceedanceKwh:r,heatmapValues:h,loadDurationGrossKw:s.map(i=>i.houseKw).sort((i,v)=>v-i),loadDurationNetKw:s.map(i=>i.gridKw).sort((i,v)=>v-i),worstDays:m}}function Bt(t){var e,a,s;return(e=t.rangeData)!=null&&e.start&&((a=t.rangeData)!=null&&a.end)?`${j(t.rangeData.start)} - ${j(t.rangeData.end)}`:((s=de.find(n=>n.id===t.range))==null?void 0:s.label)??"Selected Period"}function Zt(t){var e,a;return(e=t.rangeData)!=null&&e.start&&((a=t.rangeData)!=null&&a.end)?`${new Date(t.rangeData.start).toLocaleDateString()} - ${new Date(t.rangeData.end).toLocaleDateString()}`:t.range==="custom"&&t.customStart&&t.customEnd?`${t.customStart} - ${t.customEnd}`:"Based on the currently selected range."}function Ze(t){return t.analysisComparison?`Previous matched period: ${new Date(t.analysisComparison.start).toLocaleDateString()} - ${new Date(t.analysisComparison.end).toLocaleDateString()}`:"Previous matched period"}function Q(t){const e=t.series.filter(w=>w.values.length>0);if(!e.length)return'<div class="analysis-empty">No chart data available for this period.</div>';const a=Math.max(...e.map(w=>w.values.length)),s=Math.max(720,a*24+92),n=244,r=50,o=20,l=18,u=30,h=e.flatMap(w=>w.values);t.referenceValue!=null&&h.push(t.referenceValue);let d=t.minValue??pt(h,0),m=t.maxValue??re(h,1);d===m&&(m+=1,d=Math.min(0,d-1)),t.minValue==null&&(d=Math.min(0,d));const i=s-r-o,v=n-l-u,p=(w,D)=>D<=1?r+i/2:r+w*i/(D-1),g=w=>l+(m-w)/(m-d)*v,k=t.valueFormatter??(w=>c(w,1)),b=Array.from({length:4},(w,D)=>d+(m-d)/3*D),C=[0,Math.floor((a-1)/2),a-1].filter((w,D,T)=>T.indexOf(w)===D),$=b.map(w=>{const D=g(w);return`
      <line x1="${r}" y1="${D.toFixed(1)}" x2="${(s-o).toFixed(1)}" y2="${D.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${r-8}" y="${(D+4).toFixed(1)}" class="analysis-svg-tick">${k(w)}</text>
    `}).join(""),x=t.referenceValue!=null?(()=>{const w=g(t.referenceValue);return`
        <line x1="${r}" y1="${w.toFixed(1)}" x2="${(s-o).toFixed(1)}" y2="${w.toFixed(1)}" class="analysis-svg-reference" />
        ${t.referenceLabel?`<text x="${s-o}" y="${(w-8).toFixed(1)}" class="analysis-svg-reference-label">${t.referenceLabel}</text>`:""}
      `})():"",y=e.map(w=>{const D=w.values.map((E,K)=>{const A=p(K,w.values.length),L=g(E);return`${K===0?"M":"L"} ${A.toFixed(1)} ${L.toFixed(1)}`}).join(" "),T=w.values.length<=40?w.values.map((E,K)=>{const A=p(K,w.values.length),L=g(E);return`<circle cx="${A.toFixed(1)}" cy="${L.toFixed(1)}" r="2.6" fill="${w.color}" />`}).join(""):"";return`
      <path d="${D}" fill="none" stroke="${w.color}" stroke-width="2.5" ${w.dashed?'stroke-dasharray="6 4"':""} />
      ${T}
    `}).join(""),f=C.map(w=>{const D=p(w,a),T=t.labels[w]??`Point ${w+1}`;return`<text x="${D.toFixed(1)}" y="${n-8}" text-anchor="middle" class="analysis-svg-x-label">${T}</text>`}).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${s}" height="${n}" viewBox="0 0 ${s} ${n}" role="img" aria-label="${t.title??"Line chart"}">
        ${$}
        ${x}
        ${y}
        ${f}
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
  `}function Jt(t){if(!t.length)return'<div class="analysis-empty">No daily energy data available.</div>';const e=Math.max(760,t.length*28+84),a=250,s=52,n=16,r=18,o=34,l=re(t.map($=>$.houseKwh),1),u=re(t.map($=>$.exportKwh),0),h=e-s-n,d=a-r-o,m=u>0?d*.72:d,i=u>0?d-m:0,v=r+m,p=h/t.length,g=Math.max(8,Math.min(18,p*.62)),k=Math.max(1,Math.ceil(t.length/10)),b=t.map(($,x)=>{const y=s+x*p+(p-g)/2,f=$.solarToHomeKwh/l*m,w=$.gridKwh/l*m,D=u>0?$.exportKwh/u*i:0,T=v-f-w-8;return`
      <g>
        <rect x="${y.toFixed(1)}" y="${(v-f).toFixed(1)}" width="${g.toFixed(1)}" height="${f.toFixed(1)}" rx="3" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${y.toFixed(1)}" y="${(v-f-w).toFixed(1)}" width="${g.toFixed(1)}" height="${w.toFixed(1)}" rx="3" fill="rgba(248, 81, 73, 0.55)" />
        ${D>0?`<rect x="${y.toFixed(1)}" y="${v.toFixed(1)}" width="${g.toFixed(1)}" height="${D.toFixed(1)}" rx="3" fill="rgba(88, 166, 255, 0.75)" />`:""}
        ${$.exceedanceKwh>0?`<circle cx="${(y+g/2).toFixed(1)}" cy="${T.toFixed(1)}" r="3.2" fill="#d29922" />`:""}
      </g>
    `}).join(""),C=t.map(($,x)=>x%k!==0&&x!==t.length-1?"":`<text x="${(s+x*p+p/2).toFixed(1)}" y="${a-10}" text-anchor="middle" class="analysis-svg-x-label">${$.label}</text>`).join("");return`
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${e}" height="${a}" viewBox="0 0 ${e} ${a}" role="img" aria-label="Daily energy breakdown">
        <line x1="${s}" y1="${v.toFixed(1)}" x2="${(e-n).toFixed(1)}" y2="${v.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${s-8}" y="${(r+4).toFixed(1)}" class="analysis-svg-tick">${c(l,0)} kWh</text>
        ${u>0?`<text x="${s-8}" y="${(a-o+4).toFixed(1)}" class="analysis-svg-tick">-${c(u,0)} kWh</text>`:""}
        ${b}
        ${C}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.55);"></span><span>From grid</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span><span>Exported</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:#d29922;"></span><span>Exceedance on that day</span></span>
    </div>
  `}function Qt(t,e){const a=qt(e,0,1);return t==="solar"?`rgba(63, 185, 80, ${.12+a*.82})`:t==="grid"?`rgba(210, 153, 34, ${.12+a*.82})`:`rgba(248, 81, 73, ${.12+a*.82})`}function ea(t,e){const a=t.flat(),s=re(a,1),n=pt(a,0);return`
    <div class="analysis-heatmap">
      <div class="analysis-heatmap-hours">
        <span class="analysis-heatmap-corner"></span>
        ${Array.from({length:24},(r,o)=>`
          <span class="analysis-heatmap-hour ${o%2===1?"analysis-heatmap-hour-faded":""}">${String(o).padStart(2,"0")}</span>
        `).join("")}
      </div>
      ${t.map((r,o)=>`
        <div class="analysis-heatmap-row">
          <span class="analysis-heatmap-day">${Xe[o]}</span>
          ${r.map((l,u)=>{const h=s===n?0:(l-n)/(s-n);return`
              <span
                class="analysis-heatmap-cell"
                style="background:${Qt(e,h)};"
                title="${Xe[o]} ${String(u).padStart(2,"0")}:00 - ${c(l,2)} kW average"
              >${l>.05?c(l,1):""}</span>
            `}).join("")}
        </div>
      `).join("")}
    </div>
  `}function Je(t){const e=re(t.map(a=>a.value),1);return t.length?`
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
  `:'<div class="analysis-empty">No standout patterns in this period.</div>'}function ta(t){var s,n,r,o;const e=ze(((s=t.rangeData)==null?void 0:s.start)??t.customStart),a=ze(((n=t.rangeData)==null?void 0:n.end)??t.customEnd);return`
    <div class="range-selector">
      ${de.map(l=>`
        <button
          class="range-btn ${l.id===t.range?"active":""}"
          data-range="${l.id}"
        >${l.label}</button>
      `).join("")}
    </div>
    ${(r=t.rangeData)!=null&&r.start&&((o=t.rangeData)!=null&&o.end)?`
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
        <strong class="analysis-stat-value">${c(t.totals.coveragePct,1)}%</strong>
        <span class="analysis-stat-meta">${c(t.totals.solarToHomeKwh)} kWh of ${c(t.totals.houseKwh)} kWh usage</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Consumed Solar</span>
        <strong class="analysis-stat-value">${c(t.totals.selfConsumedPct,1)}%</strong>
        <span class="analysis-stat-meta">${c(t.totals.solarToHomeKwh)} kWh kept at home, ${c(t.totals.exportKwh)} kWh exported</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Total Solar Value</span>
        <strong class="analysis-stat-value">${I(t.totals.solarValue,e)}</strong>
        <span class="analysis-stat-meta">Savings plus export revenue plus avoided exceedance charges</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Peak Net Grid</span>
        <strong class="analysis-stat-value">${c(t.totals.peakGridKw,2)} kW</strong>
        <span class="analysis-stat-meta">Compared with ${c(t.totals.peakHouseKw,2)} kW gross house load</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Exceedance Intervals</span>
        <strong class="analysis-stat-value">${c(t.totals.exceedanceIntervals,0)}</strong>
        <span class="analysis-stat-meta">${c(t.totals.exceedanceKwh,2)} kWh above the reference limit</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Variable Import Cost</span>
        <strong class="analysis-stat-value">${I(t.totals.importCost,e)}</strong>
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
        ${Q({title:"Daily exceedance volume",series:[{label:"Exceedance",color:"#d29922",values:t.daily.map(e=>e.exceedanceKwh)}],labels:t.daily.map(e=>e.label),valueFormatter:e=>`${c(e,2)} kWh`})}
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
          <button class="unit-btn ${t.analysisHeatmapMetric==="house"?"active":""}" data-analysis-heatmap="house">${Me.house}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="grid"?"active":""}" data-analysis-heatmap="grid">${Me.grid}</button>
          <button class="unit-btn ${t.analysisHeatmapMetric==="solar"?"active":""}" data-analysis-heatmap="solar">${Me.solar}</button>
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
          <strong>${c(t.totals.coveragePct,1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-consumed solar</span>
          <strong>${c(t.totals.selfConsumedPct,1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Solar value</span>
          <strong>${I(t.totals.solarValue,e)}</strong>
        </div>
      </div>
      <div class="analysis-share-bar">
        <span class="analysis-share-segment analysis-share-segment-home" style="width:${a}%;"></span>
        <span class="analysis-share-segment analysis-share-segment-export" style="width:${s}%;"></span>
      </div>
      <div class="analysis-share-legend">
        <span><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span>Self-consumed: ${c(t.totals.solarToHomeKwh)} kWh</span>
        <span><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span>Exported: ${c(t.totals.exportKwh)} kWh</span>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Coverage of house usage by day</h4>
        ${Q({title:"Daily solar coverage",series:[{label:"Coverage",color:"#3fb950",values:t.daily.map(n=>n.coveragePct)}],labels:t.daily.map(n=>n.label),maxValue:100,minValue:0,valueFormatter:n=>`${c(n,0)}%`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day</h4>
        ${Q({title:"Daily solar value",series:[{label:"Solar value",color:"#58a6ff",values:t.daily.map(n=>n.solarValue)}],labels:t.daily.map(n=>n.label),valueFormatter:n=>I(n,e)})}
      </div>
    </div>
  `}function oa(t,e){const a=t.hourlyExceedanceKwh.map((s,n)=>({label:`${String(n).padStart(2,"0")}:00`,value:s,meta:`${c(s,2)} kWh`,colorClass:"analysis-progress-fill-warn"})).filter(s=>s.value>0).sort((s,n)=>n.value-s.value).slice(0,6);return`
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
          <strong>${c(re(t.topExceedances.map(s=>s.overKw),0),2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Exceedance cost</span>
          <strong>${I(t.totals.exceedanceCost,e)}</strong>
        </div>
      </div>
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Worst hours</h4>
          ${Je(a)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Worst days</h4>
          ${Je(t.worstDays.map(s=>({label:s.fullDate,value:s.exceedanceKwh,meta:`${c(s.exceedanceKwh,2)} kWh`,colorClass:"analysis-progress-fill-warn"})))}
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
                      <td>${ut(s.iso)}</td>
                      <td>${c(s.gridKw,2)} kW</td>
                      <td>${c(s.referenceKw,2)} kW</td>
                      <td>${c(s.overKw,2)} kW</td>
                      <td>${c(s.solarKw,2)} kW</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `:'<div class="analysis-empty">No reference exceedance was recorded in this period.</div>'}
      </div>
    </div>
  `}function ia(t,e,a){var o,l;if(e.analysisComparisonLoading)return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${Ze(e)}</p>
          </div>
        </div>
        <div class="analysis-empty">Loading comparison period...</div>
      </div>
    `;if(!((o=e.analysisComparison)!=null&&o.consumptionTimeseries)||!((l=e.analysisComparison)!=null&&l.productionTimeseries))return`
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">A matched previous period is shown here when enough historic data is available.</p>
          </div>
        </div>
        <div class="analysis-empty">Comparison data is unavailable for the selected range.</div>
      </div>
    `;const s=mt(e.analysisComparison.consumptionTimeseries,e.analysisComparison.productionTimeseries,a),n=Math.max(t.daily.length,s.daily.length,1),r=Array.from({length:n},(u,h)=>`D${h+1}`);return`
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Period Comparison</h3>
          <p class="analysis-card-copy">${Ze(e)}</p>
        </div>
      </div>
      <div class="analysis-compare-grid">
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">House usage</span>
          <strong>${c(t.totals.houseKwh)} kWh</strong>
          <span class="analysis-compare-delta">${ve(t.totals.houseKwh-s.totals.houseKwh)} kWh vs previous</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Net grid usage</span>
          <strong>${c(t.totals.gridKwh)} kWh</strong>
          <span class="analysis-compare-delta">${ve(t.totals.gridKwh-s.totals.gridKwh)} kWh vs previous</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar coverage</span>
          <strong>${c(t.totals.coveragePct,1)}%</strong>
          <span class="analysis-compare-delta">${ve(t.totals.coveragePct-s.totals.coveragePct)} pts vs previous</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar value</span>
          <strong>${I(t.totals.solarValue,a.currency||"EUR")}</strong>
          <span class="analysis-compare-delta">${ve(t.totals.solarValue-s.totals.solarValue,2)} ${a.currency||"EUR"} vs previous</span>
        </div>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Usage by day index</h4>
        ${Q({title:"Current versus previous usage",series:[{label:"Current",color:"#f85149",values:t.daily.map(u=>u.houseKwh)},{label:"Previous",color:"#58a6ff",values:s.daily.map(u=>u.houseKwh),dashed:!0}],labels:r,valueFormatter:u=>`${c(u,1)} kWh`})}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day index</h4>
        ${Q({title:"Current versus previous solar value",series:[{label:"Current",color:"#3fb950",values:t.daily.map(u=>u.solarValue)},{label:"Previous",color:"#d29922",values:s.daily.map(u=>u.solarValue),dashed:!0}],labels:r,valueFormatter:u=>I(u,a.currency||"EUR")})}
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
      ${Q({title:"Daily cost and value trends",series:[{label:"Import cost",color:"#f85149",values:t.daily.map(a=>a.importCost)},{label:"Solar savings",color:"#3fb950",values:t.daily.map(a=>a.solarSavings)},{label:"Export earnings",color:"#58a6ff",values:t.daily.map(a=>a.exportRevenue)},{label:"Exceedance cost",color:"#d29922",values:t.daily.map(a=>a.exceedanceCost)}],labels:t.daily.map(a=>a.label),valueFormatter:a=>I(a,e)})}
      <div class="analysis-cost-totals">
        <span>Import cost: <strong>${I(t.totals.importCost,e)}</strong></span>
        <span>Solar savings: <strong>${I(t.totals.solarSavings,e)}</strong></span>
        <span>Export earnings: <strong>${I(t.totals.exportRevenue,e)}</strong></span>
        <span>Exceedance cost: <strong>${I(t.totals.exceedanceCost,e)}</strong></span>
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
      ${Q({title:"Load duration curve",series:[{label:"Gross house load",color:"#f85149",values:t.loadDurationGrossKw},{label:"Net grid load",color:"#58a6ff",values:t.loadDurationNetKw}],labels:a,referenceValue:e>0?e:void 0,referenceLabel:e>0?`Reference ${c(e,1)} kW`:void 0,valueFormatter:s=>`${c(s,1)} kW`})}
      <p class="analysis-note">Intervals are ordered from highest demand to lowest, so the left side is your hardest-to-handle load.</p>
    </div>
  `}function da(t){const e=t.config,a=t.rangeData,s=t.consumptionTimeseries,n=t.productionTimeseries;if(!e||!a||!s||!n)return`
      <section class="analysis-view">
        <div class="card">
          <p class="muted">Loading analysis data...</p>
        </div>
      </section>
    `;const r=mt(s,n,e),o=e.currency||"EUR";return`
    <section class="analysis-view">
      <div class="section-header analysis-section-header">
        <div>
          <span class="badge">Analysis</span>
          <h2>Charts and Optimization</h2>
          <p class="muted">Deeper electricity analysis for ${Bt(t)}. This page is built from the same 15-minute data and billing settings that drive the dashboard and invoice.</p>
        </div>
        <div class="analysis-header-meta">
          <span>${Zt(t)}</span>
          <span>${c(r.daily.length,0)} day${r.daily.length===1?"":"s"} analysed</span>
        </div>
      </div>

      ${ta(t)}
      ${aa(r,o)}
      ${sa(r)}

      <div class="analysis-grid">
        ${ra(t,r)}
        ${na(r,o)}
      </div>

      <div class="analysis-grid">
        ${oa(r,o)}
        ${ia(r,t,e)}
      </div>

      <div class="analysis-grid">
        ${la(r,o)}
        ${ca(r,e.reference_power_kw??0)}
      </div>
    </section>
  `}const Qe={"1-1:1.29.0":{name:"Active Consumption",unit:"kW",icon:"⚡",category:"consumption"},"1-1:2.29.0":{name:"Active Production",unit:"kW",icon:"☀️",category:"production"},"1-1:3.29.0":{name:"Reactive Consumption",unit:"kvar",icon:"⚡",category:"consumption"},"1-1:4.29.0":{name:"Reactive Production",unit:"kvar",icon:"☀️",category:"production"},"1-65:1.29.1":{name:"Consumption Covered (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.3":{name:"Consumption Covered (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.2":{name:"Consumption Covered (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.4":{name:"Consumption Covered (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:1.29.9":{name:"Remaining Consumption",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.1":{name:"Production Shared (L1 AIR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.3":{name:"Production Shared (L2 ACR)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.2":{name:"Production Shared (L3 CEL)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.4":{name:"Production Shared (L4 APS)",unit:"kW",icon:"🔗",category:"sharing"},"1-65:2.29.9":{name:"Remaining Production",unit:"kW",icon:"🔗",category:"sharing"},"7-1:99.23.15":{name:"Gas Volume",unit:"m³",icon:"🔥",category:"gas"},"7-1:99.23.17":{name:"Gas Standard Volume",unit:"Nm³",icon:"🔥",category:"gas"},"7-20:99.33.17":{name:"Gas Energy",unit:"kWh",icon:"🔥",category:"gas"}};function ua(t){return Qe[t]?Qe[t].name:{c_04_yesterday_consumption:"Yesterday's Consumption",c_05_weekly_consumption:"This Week's Consumption",c_06_last_week_consumption:"Last Week's Consumption",c_07_monthly_consumption:"This Month's Consumption",c_08_previous_month_consumption:"Last Month's Consumption",p_04_yesterday_production:"Yesterday's Production",p_05_weekly_production:"This Week's Production",p_06_last_week_production:"Last Week's Production",p_07_monthly_production:"This Month's Production",p_08_previous_month_production:"Last Month's Production",p_09_yesterday_exported:"Yesterday's Export",p_10_last_week_exported:"Last Week's Export",p_11_last_month_exported:"Last Month's Export",p_12_yesterday_self_consumed:"Yesterday's Self-Consumed",p_13_last_week_self_consumed:"Last Week's Self-Consumed",p_14_last_month_self_consumed:"Last Month's Self-Consumed",p_15_monthly_exported:"This Month's Export",p_16_monthly_self_consumed:"This Month's Self-Consumed",g_01_yesterday_consumption:"Gas Yesterday (kWh)",g_02_weekly_consumption:"Gas This Week (kWh)",g_03_last_week_consumption:"Gas Last Week (kWh)",g_04_monthly_consumption:"Gas This Month (kWh)",g_05_last_month_consumption:"Gas Last Month (kWh)",g_10_yesterday_volume:"Gas Yesterday (m³)",g_11_weekly_volume:"Gas This Week (m³)",g_12_last_week_volume:"Gas Last Week (m³)",g_13_monthly_volume:"Gas This Month (m³)",g_14_last_month_volume:"Gas Last Month (m³)"}[t]??t}function pa(t){if(!t||!t.sensors.length)return`
      <section class="sensors-view">
        <div class="card">
          <p class="muted">No sensor data available. Waiting for coordinator update…</p>
        </div>
      </section>
    `;const e=[],a=[],s=[],n=[],r=[];for(const l of t.sensors){const u=l.key;u.startsWith("c_")||u==="1-1:1.29.0"||u==="1-1:3.29.0"?e.push(l):u.startsWith("p_")||u==="1-1:2.29.0"||u==="1-1:4.29.0"?a.push(l):u.startsWith("s_")||u.startsWith("1-65:")?s.push(l):u.startsWith("g_")||u.startsWith("7-")?n.push(l):r.push(l)}const o=(l,u,h,d)=>h.length?`
      <div class="card sensor-group">
        <h3 class="card-title"><span class="title-icon">${u}</span> ${l} <span class="badge">${h.length}</span></h3>
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
                  <td class="sensor-name">${ua(m.key)}</td>
                  <td class="sensor-value" style="text-align: right; color: var(--clr-${d});">${c(m.value)}</td>
                  <td class="sensor-unit">${m.unit}</td>
                  <td class="sensor-peak">${m.peak_timestamp?ut(m.peak_timestamp):'<span style="color: var(--clr-border)">—</span>'}</td>
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
      ${o("Energy Production","☀️",a,"production")}
      ${o("Energy Sharing","🔗",s,"self")}
      ${o("Gas","🔥",n,"gas")}
      ${o("Other","📊",r,"text")}
    </section>
  `}const et=[{kw:3,fixedMonthlyFee:7.42},{kw:7,fixedMonthlyFee:12.84},{kw:12,fixedMonthlyFee:19.61},{kw:17,fixedMonthlyFee:26.39},{kw:27,fixedMonthlyFee:39.94},{kw:43,fixedMonthlyFee:61.62},{kw:70,fixedMonthlyFee:98.2},{kw:100,fixedMonthlyFee:138.85},{kw:150,fixedMonthlyFee:206.6,existingContractsOnly:!0},{kw:200,fixedMonthlyFee:274.35,existingContractsOnly:!0}];function fe(t){if(!t)return null;const e=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(e){const[,s,n,r]=e;return new Date(Number(s),Number(n)-1,Number(r))}const a=new Date(t);return Number.isNaN(a.getTime())?null:new Date(a.getFullYear(),a.getMonth(),a.getDate())}function tt(t){if(!t)return"";const e=t.match(/^(\d{4}-\d{2}-\d{2})/);return e?e[1]:""}function ha(t,e,a,s,n){const r=new Date,o=fe(s),l=fe(n);let u=o,h=l;if(!u||!h)switch(t){case"yesterday":{const p=new Date(r);p.setDate(p.getDate()-1),u=new Date(p.getFullYear(),p.getMonth(),p.getDate()),h=new Date(u);break}case"this_week":{const p=new Date(r),g=p.getDay()||7;u=new Date(p.getFullYear(),p.getMonth(),p.getDate()-g+1),h=new Date(r.getFullYear(),r.getMonth(),r.getDate());break}case"last_week":{const p=new Date(r),g=p.getDay()||7,k=new Date(p.getFullYear(),p.getMonth(),p.getDate()-g+1);u=new Date(k.getFullYear(),k.getMonth(),k.getDate()-7),h=new Date(k.getFullYear(),k.getMonth(),k.getDate()-1);break}case"this_month":{u=new Date(r.getFullYear(),r.getMonth(),1),h=new Date(r.getFullYear(),r.getMonth(),r.getDate());break}case"last_month":{u=new Date(r.getFullYear(),r.getMonth()-1,1),h=new Date(r.getFullYear(),r.getMonth(),0);break}case"this_year":{u=new Date(r.getFullYear(),0,1),h=new Date(r.getFullYear(),r.getMonth(),r.getDate());break}case"last_year":{u=new Date(r.getFullYear()-1,0,1),h=new Date(r.getFullYear()-1,11,31);break}case"custom":{u=fe(e)??new Date(r.getFullYear(),r.getMonth(),r.getDate()),h=fe(a)??new Date(u);break}default:{u=new Date(r.getFullYear(),r.getMonth(),r.getDate()-1),h=new Date(u);break}}if(h<u){const p=u;u=h,h=p}let d=0,m=0;const i=new Date(u);for(;i<=h;){const p=new Date(i.getFullYear(),i.getMonth()+1,0).getDate();m+=1/p,d+=1,i.setDate(i.getDate()+1)}const v=u.getFullYear()===h.getFullYear()&&u.getMonth()===h.getMonth()&&u.getDate()===1&&h.getDate()===new Date(h.getFullYear(),h.getMonth()+1,0).getDate();return{days:d,factor:m,label:v?"full month":`${d} day${d===1?"":"s"}`}}function ma(t,e){return e==="all"?!0:e==="weekdays"?t>=1&&t<=5:t===0||t===6}function at(t){const[e,a]=t.split(":").map(s=>parseInt(s,10)||0);return e*60+a}function gt(t,e,a,s){if(!ma(t.getDay(),e))return!1;const n=t.getHours()*60+t.getMinutes(),r=at(a),o=at(s);return r===o?!0:r<o?n>=r&&n<o:n>=r||n<o}function ga(t,e){return e.find(a=>gt(t,a.day_group,a.start_time,a.end_time))}function va(t,e){return e.find(a=>gt(t,a.day_group,a.start_time,a.end_time))}function st(t,e,a,s,n,r=[]){var v;const o=new Map;let l=0,u=0,h=0,d=0,m=0;const i=new Map;for(const p of r){const g=Number(p.value)||0;i.set(p.startedAt,(i.get(p.startedAt)??0)+g)}for(const p of t){const g=Number(p.value)||0,k=g*.25,b=i.get(p.startedAt)??0,C=Math.max(0,g-b),$=new Date(p.startedAt);if(Number.isNaN($.getTime()))continue;const x=ga($,s),y=va($,n),f=(x==null?void 0:x.rate)??e,w=((v=x==null?void 0:x.label)==null?void 0:v.trim())||"Base tariff",D=(y==null?void 0:y.reference_power_kw)??a;l+=k*f,m=Math.max(m,g),d=Math.max(d,C),g>D&&(h+=(g-D)*.25),C>D&&(u+=(C-D)*.25);const T=`${w}__${f}`,E=o.get(T);E?E.kwh+=k:o.set(T,{label:w,rate:f,kwh:k})}return{energyCost:l,exceedanceKwh:u,grossExceedanceKwh:h,avoidedExceedanceKwh:Math.max(0,h-u),peakPowerKw:d,grossPeakPowerKw:m,rateBreakdown:Array.from(o.values()).sort((p,g)=>p.label.localeCompare(g.label))}}function fa(t){var Oe;const e=t.config,a=t.rangeData;if(!e||!a)return`
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;const s=a.consumption||0,n=a.production||0,r=a.exported||0,o=Math.max(0,r),l=Math.max(0,a.solar_to_home??a.direct_solar_to_home??(a.self_consumed&&a.self_consumed>0?a.self_consumed:n-o)),u=Math.max(0,a.grid_import??s-l),h=a.peak_power_kw||0,d=e.reference_power_kw||5,m=a.exceedance_kwh||0,i=a.gas_energy||0,v=a.gas_volume||0,p=i>0||v>0,g=e.consumption_rate_windows??[],k=e.reference_power_windows??[],b=t.consumptionTimeseries?st(t.consumptionTimeseries.items,e.energy_variable_rate,d,g,k,((Oe=t.productionTimeseries)==null?void 0:Oe.items)??[]):null,C=g.length>0&&!!b&&Math.abs(u-s)<.01,$=k.length>0&&!!b,x=b?b.peakPowerKw:h,y=b?b.exceedanceKwh:m,f=tt(a.start??t.customStart),w=tt(a.end??t.customEnd),{days:D,factor:T,label:E}=ha(t.range,t.customStart,t.customEnd,a.start,a.end),K=e.energy_fixed_fee*T,A=e.network_metering_rate*T,L=e.network_power_ref_rate*T,H=C?b.energyCost:u*e.energy_variable_rate,ue=u*e.network_variable_rate,ee=y*e.exceedance_rate,te=e.meter_monthly_fees??[],M=te.reduce((_,P)=>_+(P.fee||0),0)*T,W=u*e.compensation_fund_rate,R=u*e.electricity_tax_rate,ae=Math.max(0,e.connect_discount??0)*T,X=K+H+A+L+ue+ee+M+W+R-ae,ne=X*e.vat_rate,q=X+ne,we=(e.meters??[]).filter(_=>_.types.includes("production")),pe=e.feed_in_rates??[],z=we.map(_=>{const P=pe.find(O=>O.meter_id===_.id);if(P){const O=P.mode==="sensor"&&P.sensor_value!=null&&isFinite(P.sensor_value),J=O?P.sensor_value:isFinite(P.tariff)?P.tariff:e.feed_in_tariff,Ge=O?`Sensor (${c(J,4)} ${e.currency??"EUR"}/kWh)`:"Fixed tariff";return{meterId:_.id,shortId:_.id?"…"+_.id.slice(-8):"Meter",rate:J,label:Ge,mode:P.mode}}return{meterId:_.id,shortId:_.id?"…"+_.id.slice(-8):"Meter",rate:e.feed_in_tariff,label:"Fixed tariff",mode:"fixed"}}),_e=z.filter(_=>isFinite(_.rate)&&_.rate>0),Re=_e.length>0?_e.reduce((_,P)=>_+P.rate,0)/_e.length:e.feed_in_tariff,B=o*Re,Z=z.length>1,U=l,Fe=U*(e.energy_variable_rate+e.network_variable_rate+e.electricity_tax_rate+e.compensation_fund_rate),Pe=Fe*e.vat_rate,oe=Fe+Pe,ie=Math.max(0,(b==null?void 0:b.avoidedExceedanceKwh)??0),be=ie*e.exceedance_rate,Le=be*e.vat_rate,le=be+Le,he=ie>1e-4,me=oe+le+B,$e=q-B,Ke=(e.gas_fixed_fee??6.5)*T,Ae=i*(e.gas_variable_rate??.055),Ve=(e.gas_network_fee??4.8)*T,Ie=i*(e.gas_network_variable_rate??.012),He=i*(e.gas_tax_rate??.001),ke=Ke+Ae+Ve+Ie+He,Ne=ke*(e.gas_vat_rate??.08),xe=ke+Ne,F=e.currency||"EUR",S=_=>`${c(_,2)} ${F}`,Se=et.find(_=>Math.abs(_.kw-d)<.05),_t=X-L-ee,Ce=b?et.map(_=>{var Ue;const P=st(t.consumptionTimeseries.items,e.energy_variable_rate,_.kw,g,k,((Ue=t.productionTimeseries)==null?void 0:Ue.items)??[]),O=_.fixedMonthlyFee*T,J=P.exceedanceKwh*e.exceedance_rate,qe=(_t+O+J)*(1+e.vat_rate);return{..._,fixedCharge:O,exceedanceKwh:P.exceedanceKwh,exceedanceCharge:J,total:qe,deltaVsCurrent:qe-q}}):[],ge=Ce.reduce((_,P)=>!_||P.total<_.total?P:_,null),bt=_=>Math.abs(_)<.005?"Current total":`${_>0?"+":"-"}${S(Math.abs(_))}`,De=a.start&&a.end?`${j(a.start)} — ${j(a.end)}`:t.range.replace("_"," ").replace(/\b\w/g,_=>_.toUpperCase()),$t=y>0?`<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${c(x,1)} kW</strong> &mdash; ${$?"Reference power windows active":`Reference power level: ${c(d,1)} kW`}</p>
        <p>Exceedance volume: <strong>${c(y,2)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${S(ee)}</p>
      </div>`:"",kt=C?b.rateBreakdown.map(_=>`
            <tr>
              <td>${_.label} (${c(_.kwh)} kWh)</td>
              <td style="text-align: right;">${c(_.rate,4)} ${F}/kWh</td>
              <td style="text-align: right;">${S(_.kwh*_.rate)}</td>
            </tr>
          `).join(""):`
            <tr>
              <td>Supplier rate (${c(u)} kWh bought from grid)</td>
              <td style="text-align: right;">${c(e.energy_variable_rate,4)} ${F}/kWh</td>
              <td style="text-align: right;">${S(H)}</td>
            </tr>
          `,xt=$?`Reference power windows active (${k.length})`:`${c(d,1)} kW`,St=C?`Time-of-use windows active (${g.length})`:`${c(e.energy_variable_rate,4)} ${F}/kWh`,Ct=Ce.map(_=>{const P=!!ge&&_.kw===ge.kw,O=!!Se&&_.kw===Se.kw,J=_.deltaVsCurrent<-.005?"comparison-delta-savings":_.deltaVsCurrent>.005?"comparison-delta-extra":"";return`
            <tr class="${P?"reference-power-best-row":""}${O?" reference-power-current-row":""}">
              <td>
                <div class="reference-level-cell">
                  <span class="reference-level-kw">${c(_.kw,0)} kW</span>
                  ${P?'<span class="reference-level-badge best">Financially optimal</span>':""}
                  ${O?'<span class="reference-level-badge current">Current</span>':""}
                  ${_.existingContractsOnly?'<span class="reference-level-badge legacy">Existing contracts</span>':""}
                </div>
              </td>
              <td style="text-align: right;">${S(_.fixedCharge)}</td>
              <td style="text-align: right;">${S(_.exceedanceCharge)}</td>
              <td style="text-align: right;"><strong>${S(_.total)}</strong></td>
              <td class="${J}" style="text-align: right;">${bt(_.deltaVsCurrent)}</td>
            </tr>
          `}).join(""),Dt=Ce.length>0?`
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${$?"Configured reference power windows stay active in this comparison.":"One reference power level is applied to the full selected period."}
              ${Se?"":`Your current configuration uses ${c(d,1)} kW, which is outside the standard Creos low-voltage reference power levels.`}
            </p>
          </div>
          ${ge?`<div class="reference-power-optimum">
                <span class="reference-level-badge best">Financially optimal: ${c(ge.kw,0)} kW</span>
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
    `,Mt=`
      <div class="range-selector">
        ${de.map(_=>`
          <button
            class="range-btn ${_.id===t.range?"active":""}"
            data-range="${_.id}"
          >${_.label}</button>
        `).join("")}
      </div>
    `,Et=a.start&&a.end?(()=>{const _=new Date(a.start),P=new Date(a.end);return Number.isNaN(_.getTime())||Number.isNaN(P.getTime())?"":`
        <div class="range-info-bar">
          Period: ${_.toLocaleDateString()} - ${P.toLocaleDateString()}
        </div>
      `})():"",Tt=t.range==="custom"?`
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
    `:f&&w?`
        <div class="custom-range-picker period-preview">
          <span class="period-preview-label">Viewed period</span>
          <label>
            <span>From</span>
            <input type="date" value="${f}" readonly aria-label="Preset period start" />
          </label>
          <label>
            <span>To</span>
            <input type="date" value="${w}" readonly aria-label="Preset period end" />
          </label>
        </div>
      `:"";return`
    <section class="invoice-view">
      ${Mt}
      ${Et}
      ${Tt}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Invoice Estimate &mdash; ${De}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the currently selected period.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${c(s)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${c(u)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${c(n)} kWh produced</span>
          ${o>0?`<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${c(o)} kWh exported</span>`:""}
          ${p?`<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${c(i)} kWh gas (${c(v)} m³)</span>`:""}
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
              <td>Fixed Fee <span class="muted">(${E})</span></td>
              <td style="text-align: right;">${c(e.energy_fixed_fee,2)} ${F}/mo</td>
              <td style="text-align: right;">${S(K)}</td>
            </tr>
            ${kt}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${E})</span></td>
              <td style="text-align: right;">${c(e.network_metering_rate,2)} ${F}/mo</td>
              <td style="text-align: right;">${S(A)}</td>
            </tr>
            <tr>
              <td>Reference power level (${xt}) <span class="muted">(${E})</span></td>
              <td style="text-align: right;">${c(e.network_power_ref_rate,2)} ${F}/mo</td>
              <td style="text-align: right;">${S(L)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${c(u)} kWh bought from grid)</td>
              <td style="text-align: right;">${c(e.network_variable_rate,4)} ${F}/kWh</td>
              <td style="text-align: right;">${S(ue)}</td>
            </tr>
            <tr class="${y>0?"exceedance-row":""}">
              <td>Exceedance charge (${c(y,2)} kWh above the reference power level)</td>
              <td style="text-align: right;">${c(e.exceedance_rate,4)} ${F}/kWh</td>
              <td style="text-align: right;">${S(ee)}</td>
            </tr>

            ${te.filter(_=>_.fee>0).length>0?`
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${te.filter(_=>_.fee>0).map(_=>`
            <tr>
              <td>${_.label||"…"+_.meter_id.slice(-8)} <span class="muted">(${E})</span></td>
              <td style="text-align: right;">${c(_.fee,2)} ${F}/mo</td>
              <td style="text-align: right;">${S(_.fee*T)}</td>
            </tr>
            `).join("")}
            `:""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${c(e.compensation_fund_rate,4)} ${F}/kWh</td>
              <td style="text-align: right;">${S(W)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${c(e.electricity_tax_rate,4)} ${F}/kWh</td>
              <td style="text-align: right;">${S(R)}</td>
            </tr>
            ${ae>0?`
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            <tr>
              <td>Monthly Discount <span class="muted">(${E})</span></td>
              <td style="text-align: right;">-${c(Math.max(0,e.connect_discount??0),2)} ${F}/mo</td>
              <td style="text-align: right;">-${S(ae)}</td>
            </tr>
            `:""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${S(X)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${c(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(ne)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Costs</strong></td>
              <td style="text-align: right;"><strong>${S(q)}</strong></td>
            </tr>

            ${n>0?`
            <tr class="section-label revenue-section"><td colspan="3">Solar Savings & Feed-in Revenue</td></tr>
            <tr class="revenue-row">
              <td>Solar produced</td>
              <td style="text-align: right;">Total generation during this period</td>
              <td style="text-align: right;">${c(n)} kWh</td>
            </tr>
            <tr class="revenue-row">
              <td>Autoconsumed / used at home</td>
              <td style="text-align: right;">${c(U)} kWh avoided grid purchases</td>
              <td style="text-align: right;">${S(oe)} saved</td>
            </tr>
            <tr class="revenue-row">
              <td>Export sold</td>
              <td style="text-align: right;">${c(o)} kWh sent to grid</td>
              <td style="text-align: right;">${S(B)} earned</td>
            </tr>
            ${he?`
            <tr class="revenue-row">
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${c(ie)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${S(le)} saved</td>
            </tr>
            `:""}
            ${o>0?`
            <tr class="section-label"><td colspan="3">Credit Calculation</td></tr>
            ${z.map(_=>`
            <tr class="revenue-row">
              <td>Exported (${Z?_.shortId:c(o)+" kWh"})</td>
              <td style="text-align: right;">${_.label}<br/>${c(_.rate,4)} ${F}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${S(Z?o/z.length*_.rate:o*_.rate)}</td>
            </tr>
            `).join("")}
            ${Z?`
            <tr class="revenue-row">
              <td><em>Total feed-in (${c(o)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${c(Re,4)} ${F}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${S(B)}</td>
            </tr>
            `:""}
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total saved / earned thanks to solar</strong></td>
              <td style="text-align: right;"><strong>${S(me)}</strong></td>
            </tr>
            <tr class="net-total-row">
              <td colspan="2"><strong>Net Balance</strong></td>
              <td style="text-align: right;"><strong>${S($e)}</strong></td>
            </tr>
            `:""}
            ${o<=0?`
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total saved / earned thanks to solar</strong></td>
              <td style="text-align: right;"><strong>${S(me)}</strong></td>
            </tr>
            `:""}
            `:""}
          </tbody>
        </table>
      </div>

      ${Dt}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${c(u)} kWh), not total home usage.
          Supplier pricing: ${St}.
          Fixed monthly charges are prorated across the viewed period (${D} days, ${E}, equivalent to ${c(T,2)} monthly charges).
          Peak load (${c(x,1)} kW) is compared against ${$?"your configured reference power windows":`your reference power level (${c(d,1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${c(e.exceedance_rate,4)} ${F}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${p?`
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${De}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${c(i)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${c(v)} m³</span>
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
              <td>Fixed Fee <span class="muted">(${E})</span></td>
              <td style="text-align: right;">${c(e.gas_fixed_fee??6.5,2)} ${F}/mo</td>
              <td style="text-align: right;">${S(Ke)}</td>
            </tr>
            <tr>
              <td>Energy (${c(i)} kWh)</td>
              <td style="text-align: right;">${c(e.gas_variable_rate??.055,4)} ${F}/kWh</td>
              <td style="text-align: right;">${S(Ae)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${E})</span></td>
              <td style="text-align: right;">${c(e.gas_network_fee??4.8,2)} ${F}/mo</td>
              <td style="text-align: right;">${S(Ve)}</td>
            </tr>
            <tr>
              <td>Network Variable (${c(i)} kWh)</td>
              <td style="text-align: right;">${c(e.gas_network_variable_rate??.012,4)} ${F}/kWh</td>
              <td style="text-align: right;">${S(Ie)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${c(i)} kWh)</td>
              <td style="text-align: right;">${c(e.gas_tax_rate??.001,4)} ${F}/kWh</td>
              <td style="text-align: right;">${S(He)}</td>
            </tr>

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${S(ke)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${c((e.gas_vat_rate??.08)*100,0)}%</td>
              <td style="text-align: right;">${S(Ne)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${S(xe)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Energy Total: ${S($e+xe)}</strong>
          (Electricity: ${S($e)} + Gas: ${S(xe)})
        </p>
      </div>
      `:""}

      ${n>0?`
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Revenue &mdash; ${De}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${S(me)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${c(n)} kWh</div>
            <div class="solar-stat-label">Solar produced</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${S(oe)}</div>
            <div class="solar-stat-label">Saved by autoconsuming ${c(U)} kWh</div>
          </div>
          ${he?`
          <div class="solar-stat">
            <div class="solar-stat-value">${S(le)}</div>
            <div class="solar-stat-label">Saved by staying under the reference power</div>
          </div>
          `:""}
          <div class="solar-stat">
            <div class="solar-stat-value">${S(B)}</div>
            <div class="solar-stat-label">Earned by selling ${c(o)} kWh</div>
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
              <td style="text-align: right;">${c(n)} kWh</td>
            </tr>
            <tr>
              <td>Autoconsumed / used at home</td>
              <td style="text-align: right;">${c(U)} kWh avoided grid purchases</td>
              <td style="text-align: right;">${S(oe)} saved</td>
            </tr>
            <tr>
              <td>Export sold</td>
              <td style="text-align: right;">${c(o)} kWh sent to grid</td>
              <td style="text-align: right;">${S(B)} earned</td>
            </tr>
            ${he?`
            <tr>
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${c(ie)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${S(le)} saved</td>
            </tr>
            `:""}

            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${c(U)} kWh)</td>
              <td style="text-align: right;">${c(e.energy_variable_rate,4)} ${F}/kWh</td>
              <td style="text-align: right;">${S(U*e.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${c(e.network_variable_rate,4)} ${F}/kWh</td>
              <td style="text-align: right;">${S(U*e.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${c(e.electricity_tax_rate+e.compensation_fund_rate,4)} ${F}/kWh</td>
              <td style="text-align: right;">${S(U*(e.electricity_tax_rate+e.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${c(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(Pe)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${S(oe)}</strong></td>
            </tr>

            ${he?`
            <tr class="section-label"><td colspan="3">Reference Power Savings</td></tr>
            <tr>
              <td>Exceedance avoided</td>
              <td style="text-align: right;">${c(ie)} kWh above the reference power level</td>
              <td style="text-align: right;">${S(be)}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${c(e.vat_rate*100,0)}%</td>
              <td style="text-align: right;">${S(Le)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Reference Power Savings</strong></td>
              <td style="text-align: right;"><strong>${S(le)}</strong></td>
            </tr>
            `:""}

            ${o>0?`
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${z.map(_=>`
            <tr>
              <td>Sold to grid ${Z?`(${_.shortId})`:`(${c(o)} kWh)`}</td>
              <td style="text-align: right;">${_.label}<br/>${c(_.rate,4)} ${F}/kWh</td>
              <td style="text-align: right;">${S(Z?o/z.length*_.rate:o*_.rate)}</td>
            </tr>
            `).join("")}
            ${Z?`
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${S(B)}</strong></td>
            </tr>
            `:""}
            `:""}

            <tr class="total-row solar-total-row">
              <td colspan="2"><strong>💰 Total Solar Panel Value</strong></td>
              <td style="text-align: right;"><strong>${S(me)}</strong></td>
            </tr>
          </tbody>
        </table>

        <p class="muted" style="margin-top: var(--sp-3); font-size: var(--text-xs); line-height: var(--lh-relaxed);">
          Self-consumption savings = energy you produced and used yourself instead of buying from the grid.
          These savings are informational here and already reflected in the main invoice because only grid-imported energy is billed.
          Reference-power savings = exceedance charges avoided because solar reduced the net load seen against your reference power during the same 15-minute interval.
          Feed-in revenue = money earned by selling surplus production.
          ${z.some(_=>_.mode==="sensor")?"Market price sourced from Home Assistant sensor.":"Using fixed feed-in tariff — configure a market price sensor in Settings for real-time rates."}
          ${Z?"Revenue split equally across production meters (per-meter export data not yet available).":""}
        </p>
      </div>
      `:""}
    </section>
  `}const ya=[{value:"all",label:"Every day"},{value:"weekdays",label:"Weekdays"},{value:"weekends",label:"Weekends"}],wa=[{title:"Energy Supplier",icon:"⚡",fields:[{key:"energy_fixed_fee",label:"Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"energy_variable_rate",label:"Variable Rate",step:"0.00001",unit:"EUR/kWh",type:"number"}]},{title:"Network Operator",icon:"🔌",fields:[{key:"network_metering_rate",label:"Metering Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_power_ref_rate",label:"Reference Power Fixed Charge",step:"0.01",unit:"EUR/mo",type:"number"},{key:"network_variable_rate",label:"Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power & Exceedance",icon:"📏",fields:[{key:"reference_power_kw",label:"Reference Power (Referenzwert)",step:"0.1",unit:"kW",type:"number"},{key:"exceedance_rate",label:"Exceedance Surcharge",step:"0.0001",unit:"EUR/kWh",type:"number"}]},{title:"Reference Power Windows",icon:"⏱️",fields:[]},{title:"Time-of-Use Tariffs",icon:"🕒",fields:[]},{title:"Feed-in / Selling",icon:"💶",fields:[]},{title:"Gas Billing",icon:"🔥",fields:[{key:"gas_fixed_fee",label:"Supplier Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_variable_rate",label:"Supplier Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_network_fee",label:"Network Fixed Fee",step:"0.01",unit:"EUR/mo",type:"number"},{key:"gas_network_variable_rate",label:"Network Variable Rate",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_tax_rate",label:"Gas Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"gas_vat_rate",label:"Gas VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Meter Fees",icon:"📊",fields:[]},{title:"Taxes & Levies",icon:"🏛️",fields:[{key:"compensation_fund_rate",label:"Compensation Fund",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"electricity_tax_rate",label:"Electricity Tax",step:"0.0001",unit:"EUR/kWh",type:"number"},{key:"vat_rate",label:"VAT Rate",step:"0.01",unit:"decimal (0.08 = 8%)",type:"number"}]},{title:"Discounts",icon:"💸",fields:[{key:"connect_discount",label:"Monthly Discount",step:"0.01",unit:"EUR/mo",type:"number"}]},{title:"General",icon:"⚙️",fields:[{key:"currency",label:"Currency",step:"",unit:"",type:"text"}]}],_a={consumption:"Power Consumption",production:"Power Production",gas:"Gas Consumption"},vt={consumption:"⚡",production:"☀️",gas:"🔥"};function ba(t){return t.map(e=>`<span class="meter-type-badge meter-type-${e}">${vt[e]??""} ${_a[e]??e}</span>`).join(" ")}function rt(t,e,a){const s=t+1;return a?`
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${s}</strong>
          <code class="meter-id">${e.id?"..."+e.id.slice(-8):"—"}</code>
        </div>
        <div class="meter-types">${ba(e.types)}</div>
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
  `}function ft(t){return ya.map(e=>`<option value="${e.value}" ${e.value===t?"selected":""}>${e.label}</option>`).join("")}function $a(t,e){return`
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
            ${ft(e.day_group??"all")}
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
            ${ft(e.day_group??"all")}
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
    `;const s=e==="standalone"?(a==null?void 0:a.meters)??[{id:"",types:["consumption"]}]:(t==null?void 0:t.meters)??[];let n="";if(e==="standalone"){const y=s.map((w,D)=>rt(D,w,!1)).join("");a==null||a.proxy_url,n=`
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
              ${y}
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
    `}else{const y=(t==null?void 0:t.meters)??[];n=`
      <div class="card" style="margin-bottom: var(--sp-6); padding: var(--sp-4) var(--sp-5);">
        <p class="muted" style="margin: 0 0 var(--sp-3) 0;">🔒 API credentials are managed through Home Assistant &rarr; Settings &rarr; Integrations &rarr; Leneda</p>
        <div class="form-section">
          <div class="form-section-title">📊  Configured Metering Points</div>
          <div id="meters-container">
            ${y.length>0?y.map((w,D)=>rt(D,w,!0)).join(""):'<p class="muted">No meters configured</p>'}
          </div>
        </div>
      </div>
    `}const r=y=>y.map(f=>{const w=t?t[f.key]??"":"";return`
        <div class="form-row">
          <label for="cfg-${f.key}">${f.label}</label>
          <div class="input-group">
            <input
              id="cfg-${f.key}"
              name="${f.key}"
              type="${f.type}"
              ${f.type==="number"?`step="${f.step}"`:""}
              value="${w}"
            />
            ${f.unit?`<span class="input-unit">${f.unit}</span>`:""}
          </div>
        </div>
      `}).join(""),o=((t==null?void 0:t.meters)??[]).filter(y=>y.types.includes("production")),l=(t==null?void 0:t.feed_in_rates)??[],u=e==="ha";function h(y){return l.find(f=>f.meter_id===y)??{meter_id:y,mode:"fixed",tariff:(t==null?void 0:t.feed_in_tariff)??.08,sensor_entity:""}}const d=o.length===0?'<p class="muted">No production meters configured — add a meter with Power Production type above.</p>':o.map((y,f)=>{const w=h(y.id),D=y.id?"…"+y.id.slice(-8):`Meter ${f+1}`;return`
          <div class="feed-in-meter-card" data-meter-idx="${f}" data-meter-id="${y.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${D}</span>
              <input type="hidden" name="feed_in_rate_${f}_meter_id" value="${y.id}" />
            </div>
            <div class="form-row">
              <label>Pricing Mode</label>
              <div class="feed-in-mode-toggle">
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${f}_mode" value="fixed" ${w.mode==="fixed"?"checked":""} />
                  <span class="mode-label">💶 Fixed Tariff</span>
                </label>
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${f}_mode" value="sensor" ${w.mode==="sensor"?"checked":""} />
                  <span class="mode-label">📡 HA Sensor</span>
                </label>
              </div>
            </div>
            <div class="feed-in-fixed-fields" data-rate-idx="${f}" style="${w.mode==="fixed"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${f}_tariff">Feed-in Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${f}_tariff" name="feed_in_rate_${f}_tariff" type="number" step="0.0001" value="${w.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
              </div>
            </div>
            <div class="feed-in-sensor-fields" data-rate-idx="${f}" style="${w.mode==="sensor"?"":"display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${f}_sensor">Market Price Sensor</label>
                <div class="input-group sensor-picker-group">
                  <input
                    id="cfg-feed_in_rate_${f}_sensor"
                    name="feed_in_rate_${f}_sensor_entity"
                    type="text"
                    value="${w.sensor_entity}"
                    placeholder="${u?"sensor.electricity_price":"sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${u&&f===0?'<datalist id="ha-entity-list"></datalist>':""}
              </div>
              <div class="form-row">
                <label for="cfg-feed_in_rate_${f}_fallback">Fallback Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${f}_fallback" name="feed_in_rate_${f}_fallback_tariff" type="number" step="0.0001" value="${w.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
                <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                  Used when the sensor is unavailable.
                </p>
              </div>
            </div>
          </div>
        `}).join(""),m=((t==null?void 0:t.meters)??[]).some(y=>y.types.includes("gas"))||(t==null?void 0:t.meter_has_gas),i=(t==null?void 0:t.consumption_rate_windows)??[],v=(t==null?void 0:t.reference_power_windows)??[],p=(t==null?void 0:t.meters)??[],g=(t==null?void 0:t.meter_monthly_fees)??[];function k(y){return g.find(f=>f.meter_id===y)??{meter_id:y,label:"",fee:0}}const b=p.length===0?'<p class="muted">No meters configured.</p>':p.map((y,f)=>{const w=k(y.id),D=y.id?"…"+y.id.slice(-8):`Meter ${f+1}`;return`
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${y.types.map(E=>vt[E]??"").join(" ")}</span>
              <code style="font-size: var(--text-sm);">${D}</code>
              <input type="hidden" name="meter_fee_${f}_meter_id" value="${y.id}" />
            </div>
            <div class="form-row" style="margin-bottom: var(--sp-2);">
              <label for="cfg-meter_fee_${f}_label">Label</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${f}_label" name="meter_fee_${f}_label" type="text" value="${w.label||`Meter ${f+1} metering fee`}" placeholder="e.g. Smart meter rental" />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-meter_fee_${f}_fee">Monthly Fee</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${f}_fee" name="meter_fee_${f}_fee" type="number" step="0.01" value="${w.fee}" />
                <span class="input-unit">EUR/mo</span>
              </div>
            </div>
          </div>
        `}).join(""),C=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional supplier-rate windows. Outside these windows, the base <strong>Energy Supplier → Variable Rate</strong> is used.
      Windows can cross midnight by setting an end time earlier than the start time.
    </p>
    <div id="consumption-windows-container">
      ${i.length>0?i.map((y,f)=>$a(f,y)).join(""):'<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `,$=`
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${v.length>0?v.map((y,f)=>ka(f,y)).join(""):'<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `,x=wa.map(y=>{if(y.title==="Gas Billing"&&!m||y.title==="Meter Fees"&&p.length<2)return"";let f;return y.title==="Feed-in / Selling"?f=d:y.title==="Time-of-Use Tariffs"?f=C:y.title==="Reference Power Windows"?f=$:y.title==="Discounts"?f=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as a monthly credit. The dashboard prorates it to the selected period and subtracts it before VAT.
      </p>`+r(y.fields):y.title==="Meter Fees"?f=`<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>`+b:f=r(y.fields),`
    <div class="form-section">
      <div class="form-section-title">${y.icon}  ${y.title}</div>
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
  `}function Ee(t,e,a=!1,s="dark",n=""){const r=[{id:"charts",label:"Charts",icon:"CH"},{id:"dashboard",label:"Dashboard",icon:"🏠"},{id:"sensors",label:"Sensors",icon:"📊"},{id:"invoice",label:"Invoice",icon:"💰"},{id:"settings",label:"Settings",icon:"⚙️"}];return`
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
        ${r.map(o=>`
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
  `}const yt="leneda_credentials",wt="leneda_theme";function Sa(){try{const t=localStorage.getItem(yt);if(t)return JSON.parse(t)}catch{}return null}function Te(t){try{localStorage.setItem(yt,JSON.stringify(t))}catch{}}function Ca(){var t;try{const e=localStorage.getItem(wt);if(e==="dark"||e==="light")return e}catch{}return(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"}function Da(t){try{localStorage.setItem(wt,t)}catch{}}function nt(t){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!e)return null;const[,a,s,n]=e;return new Date(Number(a),Number(s)-1,Number(n))}function ot(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Ma(t,e=new Date){switch(t){case"yesterday":{const a=new Date(e);a.setDate(a.getDate()-1),a.setHours(0,0,0,0);const s=new Date(a);return s.setHours(23,59,59,999),{start:a,end:s}}case"this_week":{const a=new Date(e),s=a.getDay()||7;return a.setDate(a.getDate()-s+1),a.setHours(0,0,0,0),{start:a,end:e}}case"last_week":{const a=new Date(e),s=a.getDay()||7,n=new Date(a);n.setDate(a.getDate()-s),n.setHours(23,59,59,999);const r=new Date(n);return r.setDate(n.getDate()-6),r.setHours(0,0,0,0),{start:r,end:n}}case"this_month":return{start:new Date(e.getFullYear(),e.getMonth(),1),end:e};case"last_month":{const a=new Date(e.getFullYear(),e.getMonth()-1,1),s=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:a,end:s}}case"this_year":return{start:new Date(e.getFullYear(),0,1),end:e};case"last_year":{const a=new Date(e.getFullYear()-1,0,1),s=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:a,end:s}}}}function Ea(t,e,a=new Date){const s=nt(t),n=nt(e);if(!s||!n)return null;const r=["yesterday","this_week","last_week","this_month","last_month","this_year","last_year"];for(const o of r){const l=Ma(o,a);if(ot(s,l.start)&&ot(n,l.end))return o}return null}class Ta{constructor(e){se(this,"root");se(this,"state",{tab:"dashboard",range:"yesterday",customStart:"",customEnd:"",chartUnit:"kwh",chartConsumptionView:"grid",analysisHeatmapMetric:"grid",analysisComparison:null,analysisComparisonLoading:!1,rangeData:null,consumptionTimeseries:null,productionTimeseries:null,sensors:null,config:null,loading:!0,error:null,mode:"ha",credentials:null,isMenuOpen:!1,theme:Ca()});se(this,"preZoomRange",null);se(this,"preZoomCustomStart","");se(this,"preZoomCustomEnd","");this.root=e}async mount(){this.applyTheme(),this.render();const e=await lt();if(this.state.mode=e.mode,e.mode==="standalone"){const a=Sa();if(a&&(this.state.credentials=a),!e.configured&&!a){this.state.tab="settings",this.state.loading=!1,this.state.error=null,this.render();return}if(!e.configured&&a)try{const{saveCredentials:s}=await G(async()=>{const{saveCredentials:n}=await Promise.resolve().then(()=>Y);return{saveCredentials:n}},void 0);await s(a)}catch{}if(!a)try{this.state.credentials=await ct()}catch{}}await this.loadData()}toDisplayError(e,a="Failed to load data"){const s=e instanceof Error?e.message:String(e??"").trim(),n=s.toLowerCase();return n.includes("missing data")||n.includes("no_data")||n.includes("no data")?"Missing data":s||a}clearRangeStateWithError(e,a="Failed to load data"){this.state.rangeData=null,this.state.consumptionTimeseries=null,this.state.productionTimeseries=null,this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1,this.state.error=this.toDisplayError(e,a)}resetAnalysisComparison(){this.state.analysisComparison=null,this.state.analysisComparisonLoading=!1}getCurrentRangeKey(){const{start:e,end:a}=this.getDateRangeISO();return`${e}|${a}`}getComparisonRangeISO(e,a){const s=new Date(e).getTime(),n=new Date(a).getTime(),r=Math.max(0,n-s),o=s-1,l=o-r;return{start:new Date(l).toISOString(),end:new Date(o).toISOString()}}async loadAnalysisComparison(e=!1){var o;if(!this.state.consumptionTimeseries||!this.state.productionTimeseries)return;const{start:a,end:s}=this.getDateRangeISO(),n=`${a}|${s}`;if(!e&&(this.state.analysisComparisonLoading||((o=this.state.analysisComparison)==null?void 0:o.key)===n))return;const r=this.getComparisonRangeISO(a,s);this.state.analysisComparisonLoading=!0,this.state.tab==="charts"&&this.renderPreserveMainScroll();try{const[l,u]=await Promise.all([N("1-1:1.29.0",r.start,r.end),N("1-1:2.29.0",r.start,r.end)]);if(n!==this.getCurrentRangeKey())return;this.state.analysisComparison={key:n,start:r.start,end:r.end,consumptionTimeseries:l,productionTimeseries:u}}catch(l){console.warn("Comparison data fetch failed:",l),n===this.getCurrentRangeKey()&&(this.state.analysisComparison=null)}finally{n===this.getCurrentRangeKey()&&(this.state.analysisComparisonLoading=!1,this.state.tab==="charts"&&this.renderPreserveMainScroll())}}async loadData(){this.state.loading=!0,this.state.error=null,this.state.rangeData=null,this.resetAnalysisComparison(),this.render();try{const[e,a,s]=await Promise.all([ye(this.state.range),We(),ce()]),{start:n,end:r}=this.getDateRangeISO(),[o,l]=await Promise.all([N("1-1:1.29.0",n,r),N("1-1:2.29.0",n,r)]);this.state.rangeData=e,this.state.consumptionTimeseries=o,this.state.productionTimeseries=l,this.state.sensors=a,this.state.config=s}catch(e){this.clearRangeStateWithError(e,"Failed to load data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async changeRange(e){if(this.preZoomRange=null,this.state.range=e,this.resetAnalysisComparison(),e==="custom"){if(!this.state.customStart||!this.state.customEnd){const a=new Date;a.setDate(a.getDate()-1);const s=new Date(a);s.setDate(s.getDate()-6),this.state.customStart=s.toISOString().slice(0,10),this.state.customEnd=a.toISOString().slice(0,10)}this.render();return}this.state.error=null,this.state.loading=!0,this.render();try{const{start:a,end:s}=this.getDateRangeISO(),[n,r,o]=await Promise.all([ye(e),N("1-1:1.29.0",a,s),N("1-1:2.29.0",a,s)]);this.state.rangeData=n,this.state.consumptionTimeseries=r,this.state.productionTimeseries=o}catch(a){this.clearRangeStateWithError(a,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}async applyCustomRange(){this.preZoomRange=null;const{customStart:e,customEnd:a}=this.state;if(!(!e||!a)){this.state.error=null,this.state.loading=!0,this.resetAnalysisComparison(),this.render();try{const s=Ea(e,a),n=s?ye(s):G(async()=>{const{fetchCustomData:u}=await Promise.resolve().then(()=>Y);return{fetchCustomData:u}},void 0).then(({fetchCustomData:u})=>u(e,a)),[r,o,l]=await Promise.all([n,N("1-1:1.29.0",new Date(e+"T00:00:00").toISOString(),new Date(a+"T23:59:59.999").toISOString()),N("1-1:2.29.0",new Date(e+"T00:00:00").toISOString(),new Date(a+"T23:59:59.999").toISOString())]);this.state.rangeData={range:"custom",consumption:r.consumption,production:r.production,exported:r.exported??0,self_consumed:r.self_consumed??0,grid_import:r.grid_import,solar_to_home:r.solar_to_home,direct_solar_to_home:r.direct_solar_to_home,shared:r.shared,shared_with_me:r.shared_with_me,gas_energy:r.gas_energy??0,gas_volume:r.gas_volume??0,peak_power_kw:r.peak_power_kw??0,exceedance_kwh:r.exceedance_kwh??0,metering_point:r.metering_point??"",start:r.start??e,end:r.end??a},this.state.consumptionTimeseries=o,this.state.productionTimeseries=l}catch(s){this.clearRangeStateWithError(s,"Missing data")}finally{this.state.loading=!1,this.render(),this.state.tab==="charts"&&this.state.rangeData&&this.loadAnalysisComparison()}}}changeTab(e){this.state.tab=e,this.render(),(e==="dashboard"||e==="charts")&&!this.state.rangeData&&!this.state.loading&&this.loadData(),e==="charts"&&this.state.rangeData&&!this.state.analysisComparison&&!this.state.analysisComparisonLoading&&this.loadAnalysisComparison(),e==="sensors"&&!this.state.sensors&&We().then(a=>{this.state.sensors=a,this.render()}),e==="settings"&&!this.state.config&&ce().then(a=>{this.state.config=a,this.render()}),this.state.isMenuOpen=!1}toggleMenu(){this.state.isMenuOpen=!this.state.isMenuOpen,this.render()}applyTheme(){document.documentElement.dataset.theme=this.state.theme}setTheme(e){e!==this.state.theme&&(this.state.theme=e,Da(e),this.applyTheme(),this.render())}toggleTheme(){this.setTheme(this.state.theme==="dark"?"light":"dark")}printInvoice(){var o,l;const e=document.title,s=`Leneda-invoice-${(o=this.state.rangeData)!=null&&o.start&&((l=this.state.rangeData)!=null&&l.end)?`${this.state.rangeData.start.slice(0,10)}_to_${this.state.rangeData.end.slice(0,10)}`:this.state.range}`.replace(/[^a-z0-9_-]+/gi,"-");let n=!1;const r=()=>{n||(n=!0,document.title=e,window.removeEventListener("afterprint",r))};document.title=s,window.addEventListener("afterprint",r,{once:!0}),window.print(),window.setTimeout(r,1e3)}getMainContentScrollTop(){const e=this.root.querySelector(".main-content");return e?e.scrollTop:window.scrollY||document.documentElement.scrollTop||0}restoreMainContentScrollTop(e){requestAnimationFrame(()=>{const a=this.root.querySelector(".main-content");a?a.scrollTop=e:window.scrollTo({top:e})})}renderPreserveMainScroll(){const e=this.getMainContentScrollTop();this.render(),this.restoreMainContentScrollTop(e)}getDataSourceLabel(){return this.state.mode==="ha"?"Home Assistant":"Standalone"}getHostedDataNoticeHtml(){var e;return(((e=this.state.credentials)==null?void 0:e.proxy_url)??"").trim().length>0,""}render(){var u;const{tab:e,loading:a,error:s,theme:n}=this.state,r=this.getDataSourceLabel(),o=this.getHostedDataNoticeHtml();if(a&&!this.state.rangeData){this.root.innerHTML=`
        <div class="app-shell">
          ${Ee(e,h=>{},!1,n,r)}
          <main class="main-content">
            ${o}
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `,this.attachNavListeners();return}if(s&&!this.state.rangeData){const h=s.toLowerCase().includes("missing data");this.root.innerHTML=`
        <div class="app-shell">
          ${Ee(e,d=>{},!1,n,r)}
          <main class="main-content">
            ${o}
            <div class="error-state">
              <h2>${h?"Missing Data":"Connection Error"}</h2>
              <p>${h?"The selected period could not be loaded because data is missing.":s}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `,this.attachNavListeners(),(u=this.root.querySelector("#retry-btn"))==null||u.addEventListener("click",()=>this.loadData());return}let l="";switch(e){case"dashboard":l=je(this.state);break;case"charts":l=da(this.state);break;case"sensors":l=pa(this.state.sensors);break;case"invoice":l=fa(this.state);break;case"settings":l=xa(this.state.config,this.state.mode,this.state.credentials);break}this.root.innerHTML=`
      <div class="app-shell">
        ${Ee(e,h=>this.changeTab(h),this.state.isMenuOpen,n,r)}
        <main class="main-content">
          ${o}
          ${a?'<div class="loading-bar"></div>':""}
          ${l}
        </main>
      </div>
    `,this.attachNavListeners(),this.attachDashboardListeners(),this.attachAnalysisListeners(),this.attachInvoiceListeners(),this.attachSettingsListeners()}attachNavListeners(){var e,a;(e=this.root.querySelector(".menu-toggle"))==null||e.addEventListener("click",()=>{this.toggleMenu()}),(a=this.root.querySelector("[data-theme-toggle]"))==null||a.addEventListener("click",()=>{this.toggleTheme()}),this.root.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{const n=s.dataset.tab;this.changeTab(n)})})}attachDashboardListeners(e=!1){this.root.querySelectorAll("[data-range]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.range;this.changeRange(l)})});const a=this.root.querySelector("#custom-start"),s=this.root.querySelector("#custom-end");a&&a.addEventListener("change",()=>{this.state.customStart=a.value}),s&&s.addEventListener("change",()=>{this.state.customEnd=s.value});const n=this.root.querySelector("#apply-custom-range");if(n==null||n.addEventListener("click",()=>this.applyCustomRange()),this.root.querySelectorAll("[data-chart-unit]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.chartUnit;l!==this.state.chartUnit&&(this.state.chartUnit=l,this.renderPreserveMainScroll())})}),this.root.querySelectorAll("[data-chart-view]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.chartView;l!==this.state.chartConsumptionView&&(this.state.chartConsumptionView=l,this.renderPreserveMainScroll())})}),!e){const o=this.root.querySelector("#energy-chart");o&&this.state.rangeData&&this.initChart(o)}const r=this.root.querySelector(".reset-zoom-btn");r==null||r.addEventListener("click",async()=>{const{resetChartZoom:o}=await G(async()=>{const{resetChartZoom:l}=await import("./Charts-Dtmf4FcE.js");return{resetChartZoom:l}},[]);if(o(),r.style.display="none",this.preZoomRange!==null){const l=this.preZoomRange;this.state.customStart=this.preZoomCustomStart,this.state.customEnd=this.preZoomCustomEnd,this.preZoomRange=null,this.preZoomCustomStart="",this.preZoomCustomEnd="",l==="custom"?(this.state.range="custom",this.applyCustomRange()):this.changeRange(l)}else this.changeRange(this.state.range==="custom"?"yesterday":this.state.range)})}attachAnalysisListeners(){this.root.querySelectorAll("[data-analysis-heatmap]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.analysisHeatmap;a!==this.state.analysisHeatmapMetric&&(this.state.analysisHeatmapMetric=a,this.renderPreserveMainScroll())})})}attachInvoiceListeners(){var e;(e=this.root.querySelector("#print-invoice-btn"))==null||e.addEventListener("click",()=>{this.printInvoice()})}attachSettingsListeners(){var u,h;const e=this.root.querySelector("#credentials-form");if(e){const d=this.root.querySelector("#add-meter-btn");d==null||d.addEventListener("click",()=>{var g,k,b;const v=new FormData(e),p=m(v);if(p.length<10){p.push({id:"",types:["consumption"]});const C={api_key:v.get("api_key")||((g=this.state.credentials)==null?void 0:g.api_key)||"",energy_id:v.get("energy_id")||((k=this.state.credentials)==null?void 0:k.energy_id)||"",meters:p,proxy_url:v.get("proxy_url")||((b=this.state.credentials)==null?void 0:b.proxy_url)||""};this.state.credentials=C,Te(C),this.renderPreserveMainScroll()}}),this.root.querySelectorAll(".remove-meter-btn").forEach(v=>{v.addEventListener("click",()=>{var C,$,x;const p=parseInt(v.dataset.meter??"0",10),g=new FormData(e),k=m(g);k.splice(p,1);const b={api_key:g.get("api_key")||((C=this.state.credentials)==null?void 0:C.api_key)||"",energy_id:g.get("energy_id")||(($=this.state.credentials)==null?void 0:$.energy_id)||"",meters:k,proxy_url:g.get("proxy_url")||((x=this.state.credentials)==null?void 0:x.proxy_url)||""};this.state.credentials=b,Te(b),this.renderPreserveMainScroll()})});const m=v=>{var g,k,b;const p=[];for(let C=0;C<10;C++){const $=v.get(`meter_${C}_id`);if($===null)break;const x=[];(g=e.querySelector(`[name="meter_${C}_consumption"]`))!=null&&g.checked&&x.push("consumption"),(k=e.querySelector(`[name="meter_${C}_production"]`))!=null&&k.checked&&x.push("production"),(b=e.querySelector(`[name="meter_${C}_gas"]`))!=null&&b.checked&&x.push("gas"),p.push({id:$.trim(),types:x})}return p};e.addEventListener("submit",async v=>{v.preventDefault();const p=new FormData(e),g={api_key:p.get("api_key"),energy_id:p.get("energy_id"),meters:m(p),proxy_url:p.get("proxy_url")},k=this.root.querySelector("#creds-status");try{Te(g);const{saveCredentials:b}=await G(async()=>{const{saveCredentials:x}=await Promise.resolve().then(()=>Y);return{saveCredentials:x}},void 0);await b(g),k&&(k.innerHTML='<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>'),this.state.credentials=g,this.state.error=null;const C=!1,$=(g.proxy_url??"").trim();await this.loadData()}catch(b){k&&(k.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${b instanceof Error?b.message:b}</p>`)}});const i=this.root.querySelector("#test-creds-btn");i==null||i.addEventListener("click",async()=>{const v=new FormData(e),p={api_key:v.get("api_key"),energy_id:v.get("energy_id"),meters:m(v),proxy_url:v.get("proxy_url")},g=this.root.querySelector("#creds-status");g&&(g.innerHTML='<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>');try{const{testCredentials:k}=await G(async()=>{const{testCredentials:C}=await Promise.resolve().then(()=>Y);return{testCredentials:C}},void 0),b=await k(p);g&&(g.innerHTML=b.success?`<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${b.message}</p>`:`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${b.message}</p>`)}catch(k){g&&(g.innerHTML=`<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${k instanceof Error?k.message:k}</p>`)}})}const a=this.root.querySelector("#settings-form");if(!a)return;const s=d=>{const m=[];for(let i=0;i<24;i++){const v=d.get(`consumption_window_${i}_label`),p=d.get(`consumption_window_${i}_day_group`),g=d.get(`consumption_window_${i}_start_time`),k=d.get(`consumption_window_${i}_end_time`),b=d.get(`consumption_window_${i}_rate`);if(v===null&&p===null&&g===null&&k===null&&b===null)break;m.push({label:(v??"").trim()||`Window ${i+1}`,day_group:p??"all",start_time:g??"00:00",end_time:k??"06:00",rate:parseFloat(b??"0")||0})}return m},n=d=>{const m=[];for(let i=0;i<24;i++){const v=d.get(`reference_window_${i}_label`),p=d.get(`reference_window_${i}_day_group`),g=d.get(`reference_window_${i}_start_time`),k=d.get(`reference_window_${i}_end_time`),b=d.get(`reference_window_${i}_reference_power_kw`);if(v===null&&p===null&&g===null&&k===null&&b===null)break;m.push({label:(v??"").trim()||`Reference ${i+1}`,day_group:p??"all",start_time:g??"17:00",end_time:k??"00:00",reference_power_kw:parseFloat(b??"0")||0})}return m},r=()=>{var C;const d=new FormData(a),m={};a.querySelectorAll('input[type="checkbox"]').forEach($=>{m[$.name]=$.checked});const i=[],v=/^feed_in_rate_(\d+)_(.+)$/,p={},g=[],k=/^meter_fee_(\d+)_(.+)$/,b={};for(const[$,x]of d.entries()){if($.startsWith("consumption_window_")||$.startsWith("reference_window_"))continue;const y=$.match(v);if(y){const E=y[1],K=y[2];p[E]||(p[E]={}),p[E][K]=x;continue}const f=$.match(k);if(f){const E=f[1],K=f[2];b[E]||(b[E]={}),b[E][K]=x;continue}if(m[$]!==void 0&&typeof m[$]=="boolean")continue;const w=x,D=a.elements.namedItem($);if(w===""&&D instanceof HTMLInputElement&&D.type==="number"){const E=(C=this.state.config)==null?void 0:C[$];typeof E=="number"&&isFinite(E)&&(m[$]=E);continue}const T=parseFloat(w);m[$]=isNaN(T)?w:T}for(const $ of Object.keys(p).sort()){const x=p[$],y=x.mode??"fixed",f=y==="sensor"?x.fallback_tariff??x.tariff:x.tariff;i.push({meter_id:x.meter_id??"",mode:y,tariff:parseFloat(f??"0.08")||.08,sensor_entity:x.sensor_entity??""})}i.length>0&&(m.feed_in_rates=i);for(const $ of Object.keys(b).sort()){const x=b[$];g.push({meter_id:x.meter_id??"",label:x.label??"",fee:parseFloat(x.fee??"0")||0})}return g.length>0&&(m.meter_monthly_fees=g),m.consumption_rate_windows=s(d),m.reference_power_windows=n(d),m},o=d=>{if(!this.state.config)return;const m=r();d(m),this.state.config={...this.state.config,...m},this.renderPreserveMainScroll()};if((u=this.root.querySelector("#add-consumption-window-btn"))==null||u.addEventListener("click",()=>{o(d=>{var i;const m=Array.isArray(d.consumption_rate_windows)?[...d.consumption_rate_windows]:[];m.push({label:`Window ${m.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",rate:((i=this.state.config)==null?void 0:i.energy_variable_rate)??.1125}),d.consumption_rate_windows=m})}),this.root.querySelectorAll(".remove-consumption-window-btn").forEach(d=>{d.addEventListener("click",()=>{const m=parseInt(d.dataset.window??"0",10);o(i=>{const v=Array.isArray(i.consumption_rate_windows)?[...i.consumption_rate_windows]:[];v.splice(m,1),i.consumption_rate_windows=v})})}),(h=this.root.querySelector("#add-reference-window-btn"))==null||h.addEventListener("click",()=>{o(d=>{var i;const m=Array.isArray(d.reference_power_windows)?[...d.reference_power_windows]:[];m.push({label:`Reference ${m.length+1}`,day_group:"weekdays",start_time:"17:00",end_time:"00:00",reference_power_kw:((i=this.state.config)==null?void 0:i.reference_power_kw)??5}),d.reference_power_windows=m})}),this.root.querySelectorAll(".remove-reference-window-btn").forEach(d=>{d.addEventListener("click",()=>{const m=parseInt(d.dataset.window??"0",10);o(i=>{const v=Array.isArray(i.reference_power_windows)?[...i.reference_power_windows]:[];v.splice(m,1),i.reference_power_windows=v})})}),a.querySelectorAll('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach(d=>{d.addEventListener("change",()=>{const m=d.name.match(/feed_in_rate_(\d+)_mode/);if(!m)return;const i=m[1],v=a.querySelector(`.feed-in-fixed-fields[data-rate-idx="${i}"]`),p=a.querySelector(`.feed-in-sensor-fields[data-rate-idx="${i}"]`);v&&(v.style.display=d.value==="fixed"?"":"none"),p&&(p.style.display=d.value==="sensor"?"":"none")})}),this.state.mode==="ha"){const d=this.root.querySelector("#ha-entity-list");d&&dt().then(({entities:m})=>{d.innerHTML=m.map(i=>`<option value="${i}"></option>`).join("")}).catch(()=>{})}a.addEventListener("submit",async d=>{d.preventDefault();const m=r();try{const{saveConfig:i}=await G(async()=>{const{saveConfig:v}=await Promise.resolve().then(()=>Y);return{saveConfig:v}},void 0);await i(m),this.state.config=await ce(),this.render()}catch(i){alert("Failed to save: "+(i instanceof Error?i.message:i))}});const l=this.root.querySelector("#reset-config-btn");l==null||l.addEventListener("click",async()=>{if(confirm("Reset all billing rates to defaults?"))try{const{resetConfig:d}=await G(async()=>{const{resetConfig:m}=await Promise.resolve().then(()=>Y);return{resetConfig:m}},void 0);await d(),this.state.config=await ce(),this.render()}catch(d){alert("Failed to reset: "+(d instanceof Error?d.message:d))}})}async initChart(e){var a,s;try{const{renderEnergyChart:n}=await G(async()=>{const{renderEnergyChart:p}=await import("./Charts-Dtmf4FcE.js");return{renderEnergyChart:p}},[]),{fetchTimeseries:r,fetchPerMeterTimeseries:o}=await G(async()=>{const{fetchTimeseries:p,fetchPerMeterTimeseries:g}=await Promise.resolve().then(()=>Y);return{fetchTimeseries:p,fetchPerMeterTimeseries:g}},void 0),{start:l,end:u}=this.getDateRangeISO(),[h,d]=await Promise.all([r("1-1:1.29.0",l,u),r("1-1:2.29.0",l,u)]),m=((a=this.state.config)==null?void 0:a.reference_power_kw)??0,i=(((s=this.state.config)==null?void 0:s.meters)??[]).filter(p=>p.types.includes("production"));let v;if(i.length>1)try{const p=await o("1-1:2.29.0",l,u);p.meters&&p.meters.length>1&&(v=p.meters)}catch(p){console.warn("Per-meter timeseries fetch failed, using merged view:",p)}n(e,h,d,{unit:this.state.chartUnit,consumptionView:this.state.chartConsumptionView,referencePowerKw:m,perMeterProduction:v,onZoomChange:(p,g)=>{this.handleChartZoomChange(p,g)}})}catch(n){console.error("Chart init failed:",n)}}async handleChartZoomChange(e,a){try{this.preZoomRange===null&&(this.preZoomRange=this.state.range,this.preZoomCustomStart=this.state.customStart,this.preZoomCustomEnd=this.state.customEnd);const{fetchCustomData:s}=await G(async()=>{const{fetchCustomData:h}=await Promise.resolve().then(()=>Y);return{fetchCustomData:h}},void 0),n=e.slice(0,10),r=a.slice(0,10);this.resetAnalysisComparison();const o=await s(n,r),[l,u]=await Promise.all([N("1-1:1.29.0",new Date(n+"T00:00:00").toISOString(),new Date(r+"T23:59:59.999").toISOString()),N("1-1:2.29.0",new Date(n+"T00:00:00").toISOString(),new Date(r+"T23:59:59.999").toISOString())]);this.state.range="custom",this.state.customStart=n,this.state.customEnd=r,this.state.rangeData={range:"custom",consumption:o.consumption,production:o.production,exported:o.exported??0,self_consumed:o.self_consumed??0,gas_energy:o.gas_energy??0,gas_volume:o.gas_volume??0,grid_import:o.grid_import,solar_to_home:o.solar_to_home,direct_solar_to_home:o.direct_solar_to_home,shared:o.shared,shared_with_me:o.shared_with_me,peak_power_kw:o.peak_power_kw??0,exceedance_kwh:o.exceedance_kwh??0,metering_point:o.metering_point??"",start:o.start,end:o.end},this.state.consumptionTimeseries=l,this.state.productionTimeseries=u,this.renderDashboardPartial()}catch(s){console.error("Zoom data fetch failed:",s),this.clearRangeStateWithError(s,"Missing data"),this.render()}}renderDashboardPartial(){var y,f;const e=this.root.querySelector(".dashboard");if(!e||!this.state.rangeData)return;const a=document.createElement("div");a.innerHTML=je(this.state);const s=a.querySelector(".dashboard");if(!s)return;const n=e.querySelector(".range-selector"),r=s.querySelector(".range-selector");n&&r&&n.replaceWith(r);const o=e.querySelector(".range-info-bar"),l=s.querySelector(".range-info-bar");o&&l?o.replaceWith(l):!o&&l?(y=e.querySelector(".range-selector"))==null||y.insertAdjacentElement("afterend",l):o&&!l&&o.remove();const u=e.querySelector(".custom-range-picker"),h=s.querySelector(".custom-range-picker");if(u&&h)u.replaceWith(h);else if(!u&&h){const w=e.querySelector(".range-info-bar")??e.querySelector(".range-selector");w==null||w.insertAdjacentElement("afterend",h)}else u&&!h&&u.remove();const d=e.querySelector(".stats-grid"),m=s.querySelector(".stats-grid");d&&m&&d.replaceWith(m);const i=e.querySelector(".flow-card"),v=s.querySelector(".flow-card");i&&v&&i.replaceWith(v);const p=e.querySelector(".metrics-card"),g=s.querySelector(".metrics-card");p&&g&&p.replaceWith(g);const k=e.querySelector(".chart-header .card-title"),b=s.querySelector(".chart-header .card-title");k&&b&&k.replaceWith(b);const C=e.querySelector(".reset-zoom-btn");C&&(C.style.display=""),e.querySelectorAll("[data-range]").forEach(w=>{w.addEventListener("click",()=>{this.changeRange(w.dataset.range)})});const $=e.querySelector("#custom-start"),x=e.querySelector("#custom-end");$&&$.addEventListener("change",()=>{this.state.customStart=$.value}),x&&x.addEventListener("change",()=>{this.state.customEnd=x.value}),(f=e.querySelector("#apply-custom-range"))==null||f.addEventListener("click",()=>{this.preZoomRange=null,this.applyCustomRange()})}getDateRangeISO(){const e=new Date,a=s=>s.toISOString();switch(this.state.range){case"custom":{const s=new Date(this.state.customStart+"T00:00:00"),n=new Date(this.state.customEnd+"T23:59:59.999");return{start:a(s),end:a(n)}}case"yesterday":{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const n=new Date(s);return n.setHours(23,59,59,999),{start:a(s),end:a(n)}}case"this_week":{const s=new Date(e),n=s.getDay()||7;return s.setDate(s.getDate()-n+1),s.setHours(0,0,0,0),{start:a(s),end:a(e)}}case"last_week":{const s=new Date(e),n=s.getDay()||7,r=new Date(s);r.setDate(s.getDate()-n),r.setHours(23,59,59,999);const o=new Date(r);return o.setDate(r.getDate()-6),o.setHours(0,0,0,0),{start:a(o),end:a(r)}}case"this_month":{const s=new Date(e.getFullYear(),e.getMonth(),1);return{start:a(s),end:a(e)}}case"last_month":{const s=new Date(e.getFullYear(),e.getMonth()-1,1),n=new Date(e.getFullYear(),e.getMonth(),0,23,59,59,999);return{start:a(s),end:a(n)}}case"this_year":{const s=new Date(e.getFullYear(),0,1);return{start:a(s),end:a(e)}}case"last_year":{const s=new Date(e.getFullYear()-1,0,1),n=new Date(e.getFullYear()-1,11,31,23,59,59,999);return{start:a(s),end:a(n)}}default:{const s=new Date(e);s.setDate(s.getDate()-1),s.setHours(0,0,0,0);const n=new Date(s);return n.setHours(23,59,59,999),{start:a(s),end:a(n)}}}}}if(window.self===window.top&&window.location.pathname.startsWith("/leneda-panel/"))window.location.href="/leneda";else{const t=document.getElementById("app");t&&new Ta(t).mount()}
