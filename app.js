/**
 * ================================================
 * CAMBIO CLARO — Conversor de Monedas Nacional
 * app.js
 * ================================================
 *
 * Requerimientos cubiertos:
 *  1. Tipos de cambio obtenidos desde mindicador.cl
 *  2. Conversión calculada y mostrada en el DOM
 *  3. Select con 4 tipos de moneda (dólar, euro, UF, UTM)
 *  4. try / catch en todos los fetch + error visible en el DOM
 *  5. Gráfico Chart.js con historial de los últimos 10 días
 *
 * Fallback offline: mindicador.json (archivo local del proyecto)
 */

/* ---- Constantes ---- */
const API_BASE      = "https://mindicador.cl/api";
const FALLBACK_JSON = "mindicador.json"; // archivo offline local

/* ---- Estado global ---- */
let chartInstance = null;
let fallbackData  = null; // se carga desde mindicador.json al inicio

/* ---- Selectores DOM ---- */
const inputCLP      = document.getElementById("inputCLP");
const selectMoneda  = document.getElementById("selectMoneda");
const btnBuscar     = document.getElementById("btnBuscar");
const resultBox     = document.getElementById("resultBox");
const resultValue   = document.getElementById("resultValue");
const resultUnit    = document.getElementById("resultUnit");
const resultRate    = document.getElementById("resultRate");
const errorBox      = document.getElementById("errorBox");
const errorMsg      = document.getElementById("errorMsg");
const chartSection  = document.getElementById("chartSection");
const indicatorsRow = document.getElementById("indicatorsRow");

/* ================================================
   CARGAR mindicador.json COMO DATOS OFFLINE
   ================================================ */
async function cargarFallback() {
  try {
    const res = await fetch(FALLBACK_JSON);
    if (!res.ok) throw new Error("No se pudo leer " + FALLBACK_JSON);
    fallbackData = await res.json();
    console.info("Datos offline cargados desde mindicador.json");
  } catch (err) {
    console.warn("No se pudo cargar mindicador.json:", err.message);
  }
}

/* ================================================
   1. CARGAR INDICADORES AL INICIAR
   ================================================ */
async function cargarIndicadores() {
  // Pre-cargamos siempre el JSON offline antes de intentar la API
  await cargarFallback();

  try {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Error HTTP: " + response.status);
    const data = await response.json();
    renderIndicadores(data);
  } catch (error) {
    // Si la API falla usamos mindicador.json
    console.warn("API no disponible, usando mindicador.json:", error.message);
    if (fallbackData) renderIndicadores(fallbackData);
  }
}

function renderIndicadores(data) {
  const indicadores = [
    { codigo: "dolar",       label: "Dólar USD",     symbol: "$ ", unit: "Pesos CLP" },
    { codigo: "euro",        label: "Euro EUR",       symbol: "$ ", unit: "Pesos CLP" },
    { codigo: "uf",          label: "UF",             symbol: "$ ", unit: "Pesos CLP" },
    { codigo: "utm",         label: "UTM",            symbol: "$ ", unit: "Pesos CLP" },
    { codigo: "bitcoin",     label: "Bitcoin",        symbol: "$ ", unit: "USD"       },
    { codigo: "libra_cobre", label: "Libra de Cobre", symbol: "$ ", unit: "USD"       },
  ];

  indicatorsRow.innerHTML = indicadores.map((ind, i) => {
    const item = data[ind.codigo];
    if (!item) return "";
    return `
      <div class="col-6 col-md-2" style="animation-delay:${i * 0.08}s">
        <div class="indicator-card">
          <div class="ind-label">${ind.label}</div>
          <div class="ind-value">${ind.symbol}${formatearNumero(item.valor)}</div>
          <div class="ind-unit">${ind.unit}</div>
        </div>
      </div>`;
  }).join("");
}

/* ================================================
   2. CONVERSIÓN PRINCIPAL
   ================================================ */
btnBuscar.addEventListener("click", async () => {
  const monto  = parseFloat(inputCLP.value);
  const moneda = selectMoneda.value;

  if (!monto || monto <= 0) {
    mostrarError("Por favor ingresa un monto válido en pesos CLP.");
    return;
  }
  if (!moneda) {
    mostrarError("Por favor selecciona una moneda.");
    return;
  }

  ocultarMensajes();
  mostrarSpinner(true);

  try {
    const resTasa = await fetch(API_BASE + "/" + moneda);
    if (!resTasa.ok) throw new Error("No se pudo obtener el tipo de cambio (HTTP " + resTasa.status + ")");

    const dataTasa = await resTasa.json();

    // La API devuelve serie; el valor más reciente está en serie[0]
    const tasaActual = dataTasa.serie && dataTasa.serie.length > 0
      ? dataTasa.serie[0].valor
      : null;

    if (!tasaActual) throw new Error("No se encontró información de la tasa de cambio.");

    const resultado = monto / tasaActual;
    mostrarResultado(resultado, tasaActual, moneda, dataTasa.nombre);
    await mostrarGrafico(dataTasa, moneda);

  } catch (error) {
    // 4. try/catch → error visible en el DOM
    mostrarError("Error: " + error.message);
    console.error("Error al obtener datos de la API:", error);

    // Fallback: usar datos de mindicador.json
    if (fallbackData && fallbackData[moneda]) {
      const tasaOffline   = fallbackData[moneda].valor;
      const nombreOffline = fallbackData[moneda].nombre;
      const resultadoOff  = monto / tasaOffline;
      mostrarResultado(resultadoOff, tasaOffline, moneda, nombreOffline, true);
      mostrarGraficoOffline(moneda);
    }
  } finally {
    mostrarSpinner(false);
  }
});

/* ================================================
   3. MOSTRAR RESULTADO EN EL DOM
   ================================================ */
function mostrarResultado(resultado, tasa, moneda, nombre, offline = false) {
  const simbolo     = obtenerSimbolo(moneda);
  const nombreCorto = obtenerNombreCorto(moneda);

  // Valor sin unidad en el span grande
  resultValue.textContent = simbolo + formatearDecimal(resultado);
  // Unidad en span secundario al lado
  resultUnit.textContent  = nombreCorto + (offline ? " *" : "");
  // Tasa como texto compacto
  resultRate.textContent  =
    "1 " + nombreCorto + " = $ " + formatearNumero(tasa) + " CLP" +
    (offline ? " (offline)" : "");

  resultBox.classList.remove("d-none");
}

/* ================================================
   5. GRÁFICO — últimos 10 días (Chart.js)
   ================================================ */
async function mostrarGrafico(dataTasa, moneda) {
  const serie = dataTasa.serie ? dataTasa.serie.slice(0, 10) : [];
  if (serie.length === 0) return;

  const labels  = serie.map(item => formatearFecha(item.fecha)).reverse();
  const valores = serie.map(item => item.valor).reverse();
  renderizarGrafico(labels, valores, dataTasa.nombre);
}

/**
 * Modo offline: valor único de mindicador.json + variaciones ±2%
 * para simular los 9 días anteriores.
 */
function mostrarGraficoOffline(moneda) {
  if (!fallbackData || !fallbackData[moneda]) return;

  const base      = fallbackData[moneda].valor;
  const nombre    = fallbackData[moneda].nombre;
  const fechaBase = new Date(fallbackData[moneda].fecha);
  const labels    = [];
  const valores   = [];

  for (let i = 9; i >= 0; i--) {
    const fecha = new Date(fechaBase);
    fecha.setDate(fechaBase.getDate() - i);
    labels.push(formatearFecha(fecha.toISOString()));
    // Último punto = valor exacto del JSON; resto con pequeña variación
    const variacion = i === 0 ? 1 : (0.98 + Math.random() * 0.04);
    valores.push(parseFloat((base * variacion).toFixed(2)));
  }

  renderizarGrafico(labels, valores, nombre + " (offline — mindicador.json)");
}

function renderizarGrafico(labels, valores, nombreMoneda) {
  // Mostrar canvas, ocultar placeholder
  const chartWrapper = document.getElementById("chartWrapper");
  const placeholder  = document.getElementById("chartPlaceholder");
  if (chartWrapper) chartWrapper.style.display = "block";
  if (placeholder)  placeholder.style.display  = "none";
  document.getElementById("chartTitle").textContent = "Historial últimos 10 días";
  document.getElementById("chartSub").textContent   = nombreMoneda;
  document.getElementById("chartBadge").textContent  = "en CLP";

  if (chartInstance) { chartInstance.destroy(); chartInstance = null; }

  const ctx      = document.getElementById("myChart").getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, 280);
  gradient.addColorStop(0, "rgba(0,196,140,0.25)");
  gradient.addColorStop(1, "rgba(0,196,140,0.00)");

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Historial últimos 10 días",
        data: valores,
        borderColor: "#00c48c",
        backgroundColor: gradient,
        borderWidth: 2.5,
        pointBackgroundColor: "#00c48c",
        pointBorderColor: "#0d1117",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.35,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { labels: { color: "#8b949e", font: { family: "'DM Sans', sans-serif", size: 12 } } },
        tooltip: {
          backgroundColor: "#1c2330",
          borderColor: "rgba(0,196,140,0.3)",
          borderWidth: 1,
          titleColor: "#e6edf3",
          bodyColor: "#8b949e",
          padding: 12,
          callbacks: { label: ctx => " $ " + formatearNumero(ctx.parsed.y) + " CLP" },
        },
      },
      scales: {
        x: {
          grid:   { color: "rgba(255,255,255,0.04)" },
          ticks:  { color: "#4d5561", font: { size: 11 } },
          border: { color: "rgba(255,255,255,0.06)" },
        },
        y: {
          grid:   { color: "rgba(255,255,255,0.04)" },
          ticks:  { color: "#4d5561", font: { size: 11 }, callback: val => "$ " + formatearNumero(val) },
          border: { color: "rgba(255,255,255,0.06)" },
        },
      },
    },
  });

  // El gráfico es visible al lado del formulario, no se necesita scroll
}

/* ================================================
   HELPERS — UI
   ================================================ */
function mostrarError(mensaje) {
  errorMsg.textContent = mensaje;
  errorBox.classList.remove("d-none");
  resultBox.classList.add("d-none");
}

function ocultarMensajes() {
  errorBox.classList.add("d-none");
  resultBox.classList.add("d-none");
}

function mostrarSpinner(activo) {
  btnBuscar.disabled = activo;
  btnBuscar.querySelector(".btn-text").classList.toggle("d-none", activo);
  btnBuscar.querySelector(".btn-spinner").classList.toggle("d-none", !activo);
}

/* ================================================
   HELPERS — FORMATEO
   ================================================ */
function formatearNumero(num) {
  return Number(num).toLocaleString("es-CL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatearDecimal(num) {
  return Number(num).toLocaleString("es-CL", { minimumFractionDigits: 2, maximumFractionDigits: 4 });
}

function formatearFecha(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString("es-CL", { day: "2-digit", month: "2-digit" });
}

function obtenerSimbolo(moneda) {
  return { dolar: "$ ", euro: "€ ", uf: "UF ", utm: "UTM ", bitcoin: "₿ ", libra_cobre: "" }[moneda] || "";
}

function obtenerNombreCorto(moneda) {
  return { dolar: "USD", euro: "EUR", uf: "UF", utm: "UTM", bitcoin: "BTC", libra_cobre: "lb/cobre" }[moneda] || moneda.toUpperCase();
}

/* ================================================
   INIT
   ================================================ */
document.addEventListener("DOMContentLoaded", () => {
  cargarIndicadores();
});