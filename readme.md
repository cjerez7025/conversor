<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>README — CambioClaro</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
  :root {
    --green:      #00c48c;
    --green-dk:   #009e72;
    --green-bg:   rgba(0,196,140,0.08);
    --green-bd:   rgba(0,196,140,0.25);
    --red:        #f87171;
    --red-bg:     rgba(248,113,113,0.08);
    --red-bd:     rgba(248,113,113,0.3);
    --blue:       #60a5fa;
    --blue-bg:    rgba(96,165,250,0.08);
    --blue-bd:    rgba(96,165,250,0.25);
    --amber:      #fbbf24;
    --amber-bg:   rgba(251,191,36,0.08);
    --amber-bd:   rgba(251,191,36,0.25);
    --bg:         #0d1117;
    --bg-card:    #161b22;
    --bg-card2:   #1c2330;
    --border:     rgba(255,255,255,0.07);
    --text:       #e6edf3;
    --muted:      #8b949e;
    --dim:        #4d5561;
    --radius:     12px;
    --radius-sm:  8px;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    line-height: 1.7;
    padding: 48px 24px 80px;
    max-width: 900px;
    margin: 0 auto;
  }

  /* ── Tipografía ── */
  h1 { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; letter-spacing: -1px; margin-bottom: 6px; }
  h2 { font-family: 'Syne', sans-serif; font-size: 1.25rem; font-weight: 700; margin: 48px 0 16px; padding-bottom: 10px; border-bottom: 1px solid var(--border); }
  h3 { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; margin: 28px 0 12px; color: var(--green); }
  p  { color: var(--muted); margin-bottom: 12px; }
  code { font-family: 'DM Mono', monospace; font-size: 0.82rem; background: var(--bg-card2); padding: 2px 7px; border-radius: 4px; color: var(--text); }
  pre { background: var(--bg-card2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 16px 20px; overflow-x: auto; margin: 12px 0 20px; }
  pre code { background: none; padding: 0; font-size: 0.83rem; color: var(--muted); line-height: 1.8; }
  hr { border: none; border-top: 1px solid var(--border); margin: 40px 0; }
  strong { color: var(--text); font-weight: 500; }
  a { color: var(--green); }

  /* ── Hero ── */
  .hero-eyebrow { font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--green); font-weight: 600; margin-bottom: 8px; }
  .hero-sub { color: var(--muted); font-size: 0.92rem; margin-top: 6px; }

  /* ── Badges inline ── */
  .badge { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 3px 9px; border-radius: 20px; letter-spacing: 0.05em; }
  .badge-green  { background: var(--green-bg);  color: var(--green);  border: 1px solid var(--green-bd); }
  .badge-red    { background: var(--red-bg);    color: var(--red);    border: 1px solid var(--red-bd); }
  .badge-blue   { background: var(--blue-bg);   color: var(--blue);   border: 1px solid var(--blue-bd); }
  .badge-amber  { background: var(--amber-bg);  color: var(--amber);  border: 1px solid var(--amber-bd); }

  /* ── Tarjetas de sección ── */
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px 28px; margin: 16px 0; }

  /* ── Estructura de archivos ── */
  .file-tree { display: flex; flex-direction: column; gap: 8px; }
  .file-row { display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: var(--bg-card2); border-radius: var(--radius-sm); }
  .file-icon { font-size: 1rem; width: 24px; text-align: center; }
  .file-name { font-family: 'DM Mono', monospace; font-size: 0.85rem; color: var(--text); min-width: 160px; }
  .file-desc { font-size: 0.82rem; color: var(--muted); }

  /* ── Diagrama de flujo SVG ── */
  .diagram-wrap { width: 100%; overflow-x: auto; margin: 16px 0 28px; }
  svg.flow { display: block; }

  /* ── Tablas ── */
  table { width: 100%; border-collapse: collapse; font-size: 0.88rem; margin: 12px 0 24px; }
  th { background: var(--bg-card2); color: var(--text); font-weight: 500; padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--border); }
  td { padding: 9px 14px; border-bottom: 1px solid var(--border); color: var(--muted); vertical-align: top; }
  tr:last-child td { border-bottom: none; }

  /* ── Callout ── */
  .callout { display: flex; gap: 12px; padding: 14px 18px; border-radius: var(--radius-sm); margin: 16px 0; font-size: 0.88rem; }
  .callout-green { background: var(--green-bg); border: 1px solid var(--green-bd); color: var(--green); }
  .callout-amber { background: var(--amber-bg); border: 1px solid var(--amber-bd); color: var(--amber); }
  .callout-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }
  .callout-body { color: var(--muted); line-height: 1.6; }
  .callout-body strong { color: var(--text); }

  /* ── Formula ── */
  .formula { background: var(--bg-card2); border-left: 3px solid var(--green); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; padding: 14px 20px; font-family: 'DM Mono', monospace; font-size: 0.9rem; color: var(--text); margin: 12px 0; }
</style>
</head>
<body>

<!-- HERO -->
<p class="hero-eyebrow">Documentación técnica</p>
<h1>CambioClaro</h1>
<p class="hero-sub">Conversor de Monedas Nacional · Desafío Latam · Fetch API + Chart.js + Bootstrap 5</p>

<hr/>

<!-- ESTRUCTURA -->
<h2>📁 Estructura del proyecto</h2>
<div class="card">
  <div class="file-tree">
    <div class="file-row">
      <span class="file-icon">🌐</span>
      <span class="file-name">index.html</span>
      <span class="file-desc">Estructura HTML + Bootstrap 5 · layout, formulario, gráfico</span>
    </div>
    <div class="file-row">
      <span class="file-icon">🎨</span>
      <span class="file-name">styles.css</span>
      <span class="file-desc">Estilos personalizados · dark mode, variables CSS, animaciones</span>
    </div>
    <div class="file-row">
      <span class="file-icon">⚙️</span>
      <span class="file-name">app.js</span>
      <span class="file-desc">Lógica principal · fetch, conversión, Chart.js, manejo de errores</span>
    </div>
    <div class="file-row" style="border: 1px dashed rgba(251,191,36,0.3); background: var(--amber-bg);">
      <span class="file-icon">🔒</span>
      <span class="file-name">mindicador.json</span>
      <span class="file-desc">Datos de respaldo · <strong style="color:var(--amber)">solo se usa si la API falla</strong></span>
    </div>
  </div>
</div>

<hr/>

<!-- FLUJO 1 -->
<h2>🔄 Flujo 1 — Carga de la página</h2>

<div class="callout callout-green">
  <span class="callout-icon">💡</span>
  <div class="callout-body"><strong>Principio:</strong> la app siempre intenta la API real primero. El JSON offline solo se activa como último recurso cuando la API no responde.</div>
</div>

<div class="diagram-wrap">
<svg class="flow" viewBox="0 0 820 400" width="820" height="400" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans, sans-serif">
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#4d5561"/>
    </marker>
    <marker id="arr-g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#00c48c"/>
    </marker>
    <marker id="arr-r" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f87171"/>
    </marker>
  </defs>

  <!-- DOMContentLoaded -->
  <rect x="300" y="16" width="220" height="44" rx="22" fill="rgba(0,196,140,0.12)" stroke="#00c48c" stroke-width="1.5"/>
  <text x="410" y="43" text-anchor="middle" font-size="13" font-weight="600" fill="#00c48c">DOMContentLoaded</text>

  <!-- flecha down -->
  <line x1="410" y1="60" x2="410" y2="86" stroke="#4d5561" stroke-width="1.5" marker-end="url(#arr)"/>

  <!-- cargarIndicadores -->
  <rect x="270" y="88" width="280" height="44" rx="8" fill="#1c2330" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
  <text x="410" y="109" text-anchor="middle" font-size="12" fill="#e6edf3" font-weight="500">cargarIndicadores()</text>
  <text x="410" y="124" text-anchor="middle" font-size="11" fill="#8b949e">función principal de inicio</text>

  <!-- flecha split -->
  <line x1="410" y1="132" x2="410" y2="158" stroke="#4d5561" stroke-width="1.5"/>
  <!-- bifurcación izq -->
  <line x1="200" y1="158" x2="620" y2="158" stroke="#4d5561" stroke-width="1"/>
  <line x1="200" y1="158" x2="200" y2="182" stroke="#4d5561" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="620" y1="158" x2="620" y2="182" stroke="#4d5561" stroke-width="1.5" marker-end="url(#arr)"/>

  <!-- label izq -->
  <text x="200" y="174" text-anchor="middle" font-size="10" fill="#8b949e">① API real</text>
  <!-- label der -->
  <text x="620" y="174" text-anchor="middle" font-size="10" fill="#8b949e">② pre-carga offline</text>

  <!-- fetch API -->
  <rect x="60" y="184" width="280" height="52" rx="8" fill="rgba(0,196,140,0.06)" stroke="rgba(0,196,140,0.3)" stroke-width="1"/>
  <text x="200" y="207" text-anchor="middle" font-size="12" fill="#e6edf3">fetch(mindicador.cl/api)</text>
  <text x="200" y="222" text-anchor="middle" font-size="10" fill="#8b949e">Solicitud HTTP GET</text>

  <!-- fetch JSON local -->
  <rect x="480" y="184" width="280" height="52" rx="8" fill="rgba(251,191,36,0.06)" stroke="rgba(251,191,36,0.25)" stroke-width="1"/>
  <text x="620" y="207" text-anchor="middle" font-size="12" fill="#e6edf3">fetch(mindicador.json)</text>
  <text x="620" y="222" text-anchor="middle" font-size="10" fill="#8b949e">archivo local de respaldo</text>

  <!-- flechas resultado API -->
  <line x1="130" y1="236" x2="130" y2="262" stroke="#00c48c" stroke-width="1.5" marker-end="url(#arr-g)"/>
  <line x1="270" y1="236" x2="270" y2="262" stroke="#f87171" stroke-width="1.5" marker-end="url(#arr-r)"/>

  <!-- OK API -->
  <rect x="44" y="264" width="174" height="56" rx="8" fill="rgba(0,196,140,0.08)" stroke="rgba(0,196,140,0.3)" stroke-width="1"/>
  <text x="131" y="285" text-anchor="middle" font-size="11" fill="#00c48c" font-weight="600">✓ API responde</text>
  <text x="131" y="300" text-anchor="middle" font-size="10" fill="#8b949e">renderIndicadores</text>
  <text x="131" y="313" text-anchor="middle" font-size="10" fill="#8b949e">(valores en vivo)</text>

  <!-- ERR API -->
  <rect x="183" y="264" width="174" height="56" rx="8" fill="rgba(248,113,113,0.08)" stroke="rgba(248,113,113,0.3)" stroke-width="1"/>
  <text x="270" y="285" text-anchor="middle" font-size="11" fill="#f87171" font-weight="600">✗ API falla</text>
  <text x="270" y="300" text-anchor="middle" font-size="10" fill="#8b949e">renderIndicadores</text>
  <text x="270" y="313" text-anchor="middle" font-size="10" fill="#8b949e">(usa fallbackData)</text>

  <!-- flechas resultado JSON -->
  <line x1="570" y1="236" x2="570" y2="262" stroke="#00c48c" stroke-width="1.5" marker-end="url(#arr-g)"/>
  <line x1="670" y1="236" x2="670" y2="262" stroke="#f87171" stroke-width="1.5" marker-end="url(#arr-r)"/>

  <!-- OK JSON -->
  <rect x="490" y="264" width="160" height="56" rx="8" fill="rgba(0,196,140,0.08)" stroke="rgba(0,196,140,0.3)" stroke-width="1"/>
  <text x="570" y="285" text-anchor="middle" font-size="11" fill="#00c48c" font-weight="600">✓ JSON leído</text>
  <text x="570" y="300" text-anchor="middle" font-size="10" fill="#8b949e">guarda en</text>
  <text x="570" y="313" text-anchor="middle" font-size="10" fill="#8b949e">fallbackData</text>

  <!-- ERR JSON -->
  <rect x="660" y="264" width="140" height="56" rx="8" fill="rgba(248,113,113,0.08)" stroke="rgba(248,113,113,0.3)" stroke-width="1"/>
  <text x="730" y="285" text-anchor="middle" font-size="11" fill="#f87171" font-weight="600">✗ Sin JSON</text>
  <text x="730" y="300" text-anchor="middle" font-size="10" fill="#8b949e">console.warn</text>
  <text x="730" y="313" text-anchor="middle" font-size="10" fill="#8b949e">no bloquea</text>

  <!-- labels OK/ERR sobre flechas -->
  <text x="118" y="255" font-size="10" fill="#00c48c">OK</text>
  <text x="258" y="255" font-size="10" fill="#f87171">ERR</text>
  <text x="558" y="255" font-size="10" fill="#00c48c">OK</text>
  <text x="658" y="255" font-size="10" fill="#f87171">ERR</text>

  <!-- Leyenda -->
  <rect x="300" y="356" width="220" height="34" rx="6" fill="var(--bg-card2, #1c2330)" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
  <line x1="320" y1="373" x2="345" y2="373" stroke="#00c48c" stroke-width="1.5"/>
  <text x="352" y="377" font-size="10" fill="#8b949e">camino exitoso</text>
  <line x1="415" y1="373" x2="440" y2="373" stroke="#f87171" stroke-width="1.5"/>
  <text x="447" y="377" font-size="10" fill="#8b949e">camino de error</text>
</svg>
</div>

<hr/>

<!-- FLUJO 2 -->
<h2>🔄 Flujo 2 — Botón "Convertir"</h2>

<div class="diagram-wrap">
<svg class="flow" viewBox="0 0 820 480" width="820" height="480" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans, sans-serif">
  <defs>
    <marker id="arr2"   markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#4d5561"/></marker>
    <marker id="arr2-g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#00c48c"/></marker>
    <marker id="arr2-r" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f87171"/></marker>
    <marker id="arr2-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#fbbf24"/></marker>
  </defs>

  <!-- Click -->
  <rect x="300" y="12" width="220" height="44" rx="22" fill="rgba(0,196,140,0.12)" stroke="#00c48c" stroke-width="1.5"/>
  <text x="410" y="39" text-anchor="middle" font-size="13" font-weight="600" fill="#00c48c">clic en "Convertir"</text>

  <line x1="410" y1="56" x2="410" y2="80" stroke="#4d5561" stroke-width="1.5" marker-end="url(#arr2)"/>

  <!-- Validación -->
  <rect x="270" y="82" width="280" height="50" rx="8" fill="#1c2330" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
  <text x="410" y="103" text-anchor="middle" font-size="12" fill="#e6edf3" font-weight="500">Validación local</text>
  <text x="410" y="119" text-anchor="middle" font-size="11" fill="#8b949e">¿monto &gt; 0? ¿moneda seleccionada?</text>

  <!-- Falla validación - lateral -->
  <line x1="270" y1="107" x2="210" y2="107" stroke="#f87171" stroke-width="1.5" marker-end="url(#arr2-r)"/>
  <rect x="40" y="85" width="168" height="44" rx="8" fill="rgba(248,113,113,0.08)" stroke="rgba(248,113,113,0.3)" stroke-width="1"/>
  <text x="124" y="106" text-anchor="middle" font-size="11" fill="#f87171" font-weight="600">✗ Datos inválidos</text>
  <text x="124" y="120" text-anchor="middle" font-size="10" fill="#8b949e">mostrarError() en DOM</text>
  <text x="246" y="101" font-size="10" fill="#f87171">ERR</text>

  <!-- OK validación -->
  <line x1="410" y1="132" x2="410" y2="158" stroke="#4d5561" stroke-width="1.5" marker-end="url(#arr2)"/>
  <text x="416" y="148" font-size="10" fill="#00c48c">OK</text>

  <!-- fetch moneda -->
  <rect x="240" y="160" width="340" height="52" rx="8" fill="rgba(0,196,140,0.06)" stroke="rgba(0,196,140,0.3)" stroke-width="1"/>
  <text x="410" y="183" text-anchor="middle" font-size="12" fill="#e6edf3">fetch(mindicador.cl/api/{moneda})</text>
  <text x="410" y="198" text-anchor="middle" font-size="10" fill="#8b949e">ej: /api/dolar · /api/euro · /api/bitcoin</text>

  <!-- split OK / ERR -->
  <line x1="410" y1="212" x2="410" y2="238" stroke="#4d5561" stroke-width="1.5"/>
  <line x1="220" y1="238" x2="600" y2="238" stroke="#4d5561" stroke-width="1"/>
  <line x1="220" y1="238" x2="220" y2="262" stroke="#00c48c" stroke-width="1.5" marker-end="url(#arr2-g)"/>
  <line x1="600" y1="238" x2="600" y2="262" stroke="#f87171" stroke-width="1.5" marker-end="url(#arr2-r)"/>
  <text x="200" y="254" font-size="10" fill="#00c48c">OK</text>
  <text x="586" y="254" font-size="10" fill="#f87171">ERR</text>

  <!-- Rama OK -->
  <rect x="80" y="264" width="280" height="116" rx="8" fill="rgba(0,196,140,0.06)" stroke="rgba(0,196,140,0.3)" stroke-width="1"/>
  <text x="220" y="284" text-anchor="middle" font-size="11" fill="#00c48c" font-weight="600">✓ API responde</text>
  <line x1="220" y1="290" x2="220" y2="300" stroke="rgba(0,196,140,0.3)" stroke-width="1"/>
  <!-- Paso 1 -->
  <rect x="96" y="302" width="248" height="26" rx="4" fill="rgba(0,196,140,0.08)"/>
  <text x="220" y="319" text-anchor="middle" font-size="10" fill="#8b949e">① serie[0].valor → tasa actual</text>
  <!-- Paso 2 -->
  <rect x="96" y="332" width="248" height="26" rx="4" fill="rgba(0,196,140,0.08)"/>
  <text x="220" y="349" text-anchor="middle" font-size="10" fill="#8b949e">② monto / tasa → mostrarResultado()</text>
  <!-- Paso 3 -->
  <rect x="96" y="362" width="248" height="26" rx="4" fill="rgba(0,196,140,0.08)"/>
  <text x="220" y="379" text-anchor="middle" font-size="10" fill="#8b949e">③ serie.slice(0,10) → gráfico Chart.js</text>

  <!-- Rama ERR -->
  <rect x="460" y="264" width="280" height="116" rx="8" fill="rgba(248,113,113,0.06)" stroke="rgba(248,113,113,0.3)" stroke-width="1"/>
  <text x="600" y="284" text-anchor="middle" font-size="11" fill="#f87171" font-weight="600">✗ API falla</text>
  <line x1="600" y1="290" x2="600" y2="300" stroke="rgba(248,113,113,0.3)" stroke-width="1"/>
  <!-- Paso 1 err -->
  <rect x="476" y="302" width="248" height="26" rx="4" fill="rgba(248,113,113,0.08)"/>
  <text x="600" y="319" text-anchor="middle" font-size="10" fill="#8b949e">① mostrarError() visible en DOM</text>
  <!-- Paso 2 err -->
  <rect x="476" y="332" width="248" height="26" rx="4" fill="rgba(251,191,36,0.08)"/>
  <text x="600" y="349" text-anchor="middle" font-size="10" fill="#fbbf24">② fallbackData[moneda].valor → resultado</text>
  <!-- Paso 3 err -->
  <rect x="476" y="362" width="248" height="26" rx="4" fill="rgba(251,191,36,0.08)"/>
  <text x="600" y="379" text-anchor="middle" font-size="10" fill="#fbbf24">③ mostrarGraficoOffline() ±2% simulado</text>

  <!-- Leyenda -->
  <rect x="260" y="430" width="300" height="34" rx="6" fill="#1c2330" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
  <rect x="276" y="443" width="10" height="10" rx="2" fill="rgba(0,196,140,0.3)"/>
  <text x="293" y="452" font-size="10" fill="#8b949e">datos en vivo</text>
  <rect x="370" y="443" width="10" height="10" rx="2" fill="rgba(251,191,36,0.2)"/>
  <text x="387" y="452" font-size="10" fill="#8b949e">datos offline</text>
  <rect x="464" y="443" width="10" height="10" rx="2" fill="rgba(248,113,113,0.3)"/>
  <text x="481" y="452" font-size="10" fill="#8b949e">error usuario</text>
</svg>
</div>

<hr/>

<!-- FALLBACK -->
<h2>🔒 Cuándo se usa mindicador.json</h2>

<div class="callout callout-amber">
  <span class="callout-icon">⚠️</span>
  <div class="callout-body">El JSON nunca reemplaza la API en condiciones normales. Solo entra en juego cuando hay un fallo de red o la API devuelve un error HTTP.</div>
</div>

<table>
  <thead><tr><th>Situación</th><th>Dónde ocurre</th><th>Resultado para el usuario</th></tr></thead>
  <tbody>
    <tr>
      <td>API caída al cargar</td>
      <td><code>cargarIndicadores()</code></td>
      <td>Tarjetas de indicadores con valores del JSON</td>
    </tr>
    <tr>
      <td>API caída al convertir</td>
      <td><code>btnBuscar</code> handler</td>
      <td>Error visible en pantalla + resultado calculado con JSON marcado <code>(offline)</code></td>
    </tr>
  </tbody>
</table>

<hr/>

<!-- TRY CATCH -->
<h2>🛡️ Manejo de errores (try / catch)</h2>

<table>
  <thead><tr><th>Función</th><th>¿Qué captura?</th><th>¿Qué muestra al usuario?</th></tr></thead>
  <tbody>
    <tr>
      <td><code>cargarFallback()</code></td>
      <td>JSON no encontrado o malformado</td>
      <td><span class="badge badge-amber">solo consola</span> no interrumpe la app</td>
    </tr>
    <tr>
      <td><code>cargarIndicadores()</code></td>
      <td>API caída, HTTP error</td>
      <td><span class="badge badge-amber">silencioso</span> activa fallback automáticamente</td>
    </tr>
    <tr>
      <td><code>btnBuscar</code> handler</td>
      <td>API caída, HTTP error, serie vacía</td>
      <td><span class="badge badge-red">visible</span> mensaje en <code>#errorBox</code> + resultado offline</td>
    </tr>
  </tbody>
</table>

<hr/>

<!-- FORMULA -->
<h2>🧮 Fórmula de conversión</h2>
<div class="formula">resultado = monto_CLP  ÷  tasa_en_CLP</div>
<p>Ejemplo: <code>200.000 CLP ÷ 5,56 = 35.971,22 lb/cobre</code></p>

<hr/>

<!-- MONEDAS -->
<h2>💱 Monedas soportadas</h2>
<table>
  <thead><tr><th>Valor select</th><th>Nombre</th><th>Endpoint</th><th>Unidad</th></tr></thead>
  <tbody>
    <tr><td><code>dolar</code></td><td>Dólar observado</td><td><code>/api/dolar</code></td><td>USD</td></tr>
    <tr><td><code>euro</code></td><td>Euro</td><td><code>/api/euro</code></td><td>EUR</td></tr>
    <tr><td><code>uf</code></td><td>Unidad de Fomento</td><td><code>/api/uf</code></td><td>UF</td></tr>
    <tr><td><code>utm</code></td><td>UTM</td><td><code>/api/utm</code></td><td>UTM</td></tr>
    <tr><td><code>bitcoin</code></td><td>Bitcoin</td><td><code>/api/bitcoin</code></td><td>BTC</td></tr>
    <tr><td><code>libra_cobre</code></td><td>Libra de Cobre</td><td><code>/api/libra_cobre</code></td><td>lb/cobre</td></tr>
  </tbody>
</table>

<hr/>

<!-- DEPENDENCIAS -->
<h2>📦 Dependencias externas (CDN)</h2>
<table>
  <thead><tr><th>Librería</th><th>Versión</th><th>Uso</th></tr></thead>
  <tbody>
    <tr><td>Bootstrap</td><td><code>5.3.2</code></td><td>Layout, grid, componentes UI</td></tr>
    <tr><td>Bootstrap Icons</td><td><code>1.11.3</code></td><td>Íconos</td></tr>
    <tr><td>Chart.js</td><td><code>4.4.0</code></td><td>Gráfico de línea con historial</td></tr>
    <tr><td>Google Fonts</td><td>—</td><td>Syne (display) + DM Sans (body)</td></tr>
  </tbody>
</table>

</body>
</html>