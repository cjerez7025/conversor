# CambioClaro — Conversor de Monedas Nacional

> Prueba técnica Desafío Latam · Fetch API + Chart.js + Bootstrap 5

---

## 📁 Estructura del proyecto

```
📁 conversor/
├── 🌐 index.html        → Estructura HTML + Bootstrap 5
├── 🎨 styles.css        → Estilos dark mode + animaciones
├── ⚙️  app.js            → Lógica JS: fetch, conversión, gráfico
└── 🔒 mindicador.json   → Respaldo offline (solo si la API falla)
```

---

## 🔄 Flujo 1 — Carga de la página

> La app **siempre intenta la API real primero**. El JSON offline solo se activa si la API no responde.

```mermaid
flowchart TD
    A([🟢 DOMContentLoaded]) --> B[cargarIndicadores]
    B --> C[fetch mindicador.cl/api\nINTENTO PRINCIPAL]
    B --> D[fetch mindicador.json\npre-carga en paralelo]

    C -->|✅ OK| E[renderIndicadores\nvalores en vivo]
    C -->|❌ ERR| F[renderIndicadores\nusa fallbackData]

    D -->|✅ OK| G[guarda en\nfallbackData]
    D -->|❌ ERR| H[console.warn\nno bloquea la app]

    style A fill:#003d2b,stroke:#00c48c,color:#00c48c
    style C fill:#0d2b1a,stroke:#00c48c,color:#c8e6c9
    style D fill:#2b2200,stroke:#fbbf24,color:#fef3c7
    style E fill:#0d2b1a,stroke:#00c48c,color:#c8e6c9
    style F fill:#2b1400,stroke:#f97316,color:#fed7aa
    style G fill:#0d2b1a,stroke:#00c48c,color:#c8e6c9
    style H fill:#2b0000,stroke:#f87171,color:#fecaca
```

---

## 🔄 Flujo 2 — Botón "Convertir"

```mermaid
flowchart TD
    A([🟢 clic en Convertir]) --> B{Validación local\n¿monto y moneda OK?}

    B -->|❌ Datos inválidos| C[/mostrarError\nen el DOM/]

    B -->|✅ OK| D[fetch mindicador.cl/api/moneda\nej: /api/dolar · /api/euro]

    D -->|✅ API responde| E[serie 0 .valor\ntasa actual]
    E --> F[monto ÷ tasa\nmostrarResultado en DOM]
    F --> G[serie.slice 0-10\nrenderizarGrafico Chart.js]

    D -->|❌ API falla| H[/mostrarError\nvisible en DOM/]
    H --> I[fallbackData moneda .valor\nresultado marcado offline]
    I --> J[mostrarGraficoOffline\ngráfico simulado ±2%]

    style A fill:#003d2b,stroke:#00c48c,color:#00c48c
    style B fill:#1c1c2e,stroke:#8b949e,color:#e6edf3
    style C fill:#2b0000,stroke:#f87171,color:#fecaca
    style D fill:#0d2b1a,stroke:#00c48c,color:#c8e6c9
    style E fill:#0d2b1a,stroke:#00c48c,color:#c8e6c9
    style F fill:#0d2b1a,stroke:#00c48c,color:#c8e6c9
    style G fill:#0d2b1a,stroke:#00c48c,color:#c8e6c9
    style H fill:#2b0000,stroke:#f87171,color:#fecaca
    style I fill:#2b2200,stroke:#fbbf24,color:#fef3c7
    style J fill:#2b2200,stroke:#fbbf24,color:#fef3c7
```

---

## 🔒 Cuándo se usa `mindicador.json`

| Situación | Función | Resultado visible |
|-----------|---------|------------------|
| API caída al **cargar** | `cargarIndicadores()` | Tarjetas con valores del JSON |
| API caída al **convertir** | `btnBuscar` handler | Error en pantalla + resultado `(offline)` |

> En ambos casos el usuario ve claramente que los datos no son en tiempo real.

---

## 🛡️ Manejo de errores — `try / catch`

| Función | Captura | Muestra al usuario |
|---|---|---|
| `cargarFallback()` | JSON no encontrado | Solo `console.warn`, no interrumpe |
| `cargarIndicadores()` | API caída, HTTP error | Activa respaldo silenciosamente |
| `btnBuscar` handler | API caída, HTTP error, serie vacía | `#errorBox` visible + resultado offline |

---

## 🧮 Fórmula de conversión

$$resultado = \frac{monto_{CLP}}{tasa_{CLP}}$$

**Ejemplo:** `200.000 CLP ÷ 5,56 = 35.971,22 lb/cobre`

---

## 💱 Monedas soportadas

| Select | Nombre | Endpoint | Unidad |
|--------|--------|----------|--------|
| `dolar` | Dólar observado | `/api/dolar` | USD |
| `euro` | Euro | `/api/euro` | EUR |
| `uf` | Unidad de Fomento | `/api/uf` | UF |
| `utm` | UTM | `/api/utm` | UTM |
| `bitcoin` | Bitcoin | `/api/bitcoin` | BTC |
| `libra_cobre` | Libra de Cobre | `/api/libra_cobre` | lb/cobre |

---

## 📦 Dependencias externas (CDN)

| Librería | Versión | Uso |
|----------|---------|-----|
| Bootstrap | `5.3.2` | Layout, grid, componentes UI |
| Bootstrap Icons | `1.11.3` | Íconos |
| Chart.js | `4.4.0` | Gráfico de línea con historial |
| Google Fonts | — | Syne (display) + DM Sans (body) |

---

## 📋 Requerimientos cubiertos

| # | Criterio | Puntos | Estado |
|---|----------|--------|--------|
| 1 | Tipos de cambio obtenidos desde `mindicador.cl` | 1 pto | ✅ |
| 2 | Conversión calculada y mostrada en el DOM | 3 ptos | ✅ |
| 3 | Select con 2+ monedas funcionando correctamente | 3 ptos | ✅ |
| 4 | `try/catch` en fetch con error visible en DOM | 2 ptos | ✅ |
| 5 | Gráfico con historial implementado | 1 pto | ✅ |
| | **Total** | **10 ptos** | 🎯 |