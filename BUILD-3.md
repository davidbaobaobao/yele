# BUILD.md — Vitrina Studio Website
# Cliente: Vitrina Studio (nuestro propio sitio)
# Fecha: 28/03/2026
# Estado: APROBADO — construir según estas especificaciones
# Actualizado: 29/03/2026 — referencias de componentes 21st.dev añadidas
#
# REFERENCIA DE COMPONENTES
# Todos los Component ID mencionados aquí viven en COMPONENTS_21ST.md.
# Antes de construir cualquier sección, leer el prompt correspondiente en ese archivo.

---

## IDENTIDAD DEL NEGOCIO

```
Nombre del negocio:   Vitrina Studio
Tagline:              Tu página web. Profesional. 19,90 €/mes.
Tipo:                 Estudio web de suscripción mensual
Mercado objetivo:     Autónomos y pequeñas empresas en España
Propuesta de valor:   Webs profesionales sin inversión inicial, entregadas en 3 días
Idioma:               Español en todo el sitio — sin excepciones
Dominio:              [vitrinastudio.es — pendiente confirmar]
Email de contacto:    [hola@vitrinastudio.es — pendiente]
WhatsApp:             [+34 6XX XXX XXX — pendiente]
```

---

## PERSONALIDAD DE MARCA

```
Adjetivos:            Profesional, cálido, directo, moderno, accesible
Tono de voz:          Habla como un profesional de confianza, no como una gran corporación.
                      Frases cortas. Español natural. Sin tecnicismos.
                      Empático con el autónomo que no sabe de tecnología.
Evitar:               Anglicismos innecesarios, lenguaje de startup, exclamaciones vacías,
                      palabras como "revolucionario", "innovador", "disruptivo"
Color principal:      Azul pizarra profundo (#1E2B3A) + Ámbar cálido (#E8A020)
Color oscuro:         Near-black con tinte azul (#0F1923)
Color claro:          Off-white cálido (#F5F2EE)
Color neutro:         Slate medio (#8A9BAD)
```

---

## DISEÑO — DIALES

```
DESIGN_VARIANCE:   6   — Cinematográfico en el hero. Estructurado y limpio en el resto.
MOTION_INTENSITY:  7   — Hero: vídeo + carousel auto-drift + scroll reveals.
                         Resto de secciones: comportamiento de MOTION 4-5.
                         El movimiento del hero debe sentirse fluido y premium.
VISUAL_DENSITY:    3   — Espacio generoso fuera del hero. Cada sección respira.
```

**Dirección estética comprometida:**
"Editorial oscuro sobre claro. Tipografía con carácter. El color ámbar aparece como acento
preciso — nunca decorativo. La web comunica: somos los profesionales que te hacen la web."

---

## FUENTES TIPOGRÁFICAS

```
Display (titulares):  DM Serif Display — elegancia moderna, contraste con el cuerpo
Body (cuerpo):        DM Sans — legible, limpio, familiar sin ser genérico
Cargadas via:         next/font de Google Fonts
```

Reglas:
- H1: DM Serif Display, 64px desktop / 40px móvil, tracking -0.03em, weight 400
- H2: DM Serif Display, 44px desktop / 32px móvil, tracking -0.02em
- H3: DM Sans, 20px, weight 600, tracking -0.01em
- Body: DM Sans, 17px, weight 400, line-height 1.75
- Labels: DM Sans, 12px, weight 600, uppercase, tracking 0.08em

---

## PALETA DE COLORES — TOKENS

```css
--color-primary:    #1E2B3A;   /* Azul pizarra profundo — fondos oscuros, nav */
--color-secondary:  #2D3F52;   /* Azul pizarra medio — cards en dark */
--color-accent:     #E8A020;   /* Ámbar cálido — CTAs, highlights, números */
--color-dark:       #0F1923;   /* Near-black con tinte azul — texto sobre claro */
--color-light:      #F5F2EE;   /* Off-white cálido — fondos claros */
--color-neutral:    #8A9BAD;   /* Slate medio — texto secundario, bordes */
--color-surface:    #FFFFFF;   /* Blanco puro — cards sobre fondo claro */
```

Sombras con tinte de marca:
```css
--shadow-sm:  0 1px 2px rgba(15,25,35,0.04), 0 2px 8px rgba(30,43,58,0.06);
--shadow-md:  0 2px 4px rgba(15,25,35,0.04), 0 8px 24px rgba(30,43,58,0.08), 0 20px 48px rgba(232,160,32,0.04);
--shadow-lg:  0 4px 8px rgba(15,25,35,0.04), 0 16px 40px rgba(15,25,35,0.10), 0 40px 80px rgba(232,160,32,0.06);
```

---

## ESTRUCTURA DEL SITIO

```
Páginas:
  /                    → Página de inicio (esta es la BUILD principal)
  /como-funciona       → Proceso detallado
  /precios             → Planes completos
  /trabajos            → Portfolio
  /contacto            → Formulario de intake
  /aviso-legal         → Obligatorio España
  /politica-privacidad → RGPD
  /politica-cookies    → Cookies

Navegación global (header):
  Logo (izquierda) · Cómo funciona · Precios · Trabajos · [Quiero mi web →] (CTA ámbar, derecha)

Footer global:
  Col 1: Logo + tagline corto + "Vitrina Studio — Webs para negocios reales."
  Col 2: Navegación — Inicio / Cómo funciona / Precios / Trabajos / Contacto
  Col 3: Legal — Aviso legal / Política de privacidad / Política de cookies
  Col 4: Contacto — Email / WhatsApp / Horario de atención
  Bajo footer: "© 2026 Vitrina Studio. Todos los derechos reservados."
```

---

## ORDEN DE CONSTRUCCIÓN

Seguir siempre el orden de CLAUDE.md. Leer COMPONENTS_21ST.md antes de cada paso.

```
Paso  1 · tailwind.config.js — tokens de color y espaciado
Paso  2 · globals.css — CSS custom properties + font setup
Paso  3 · COMP-MTN-01 · AmbientBackground — instanciar en layout.tsx
Paso  4 · COMP-NAV-01 · Navigation — sticky nav glassmorphic
Paso  5 · COMP-NAV-02 · Mobile hamburger — integrar en Navigation.tsx
Paso  6 · COMP-NAV-03 · VitrinaLogo — wordmark animado
Paso  7 · COMP-MKT-01 · AnnouncementBanner — instanciar en layout.tsx
Paso  8 · Sección 1A  · Hero vídeo (spec detallada abajo)
Paso  9 · COMP-CNT-03 · AdaptiveMedia — para fondo de vídeo del hero
Paso 10 · Sección 1B  · HeroCarousel — scroll-jacked (spec detallada abajo)
Paso 11 · COMP-INT-01 · MagneticButton — instanciar todos los CTAs principales
Paso 12 · COMP-MKT-05 · Ticker de sectores
Paso 13 · COMP-MKT-03 · Sección 2 — Propuesta de valor (6 tarjetas)
Paso 14 · COMP-INT-03 · Sección 3 — Portfolio scroll horizontal
Paso 15 · COMP-MKT-04 · Sección 4 — Cómo funciona (3 pasos)
Paso 16 · COMP-MKT-02 · Sección 5 — Precios (3 planes)
Paso 17 · COMP-MKT-06 · Sección 6 — Testimonios
Paso 18 · COMP-CNT-04 · Sección 7 — FAQ acordeón
Paso 19 · COMP-MKT-08 · Sección 8 — CTA final
Paso 20 · COMP-CNT-01 · Formulario de contacto (/contacto)
Paso 21 · COMP-MKT-09 · Footer global
Paso 22 · COMP-INT-02 · Mobile dock — solo móvil
Paso 23 · Screenshot + review cada sección (mínimo 2 rondas)
Paso 24 · Mobile review completo a 390px
Paso 25 · npm run build — cero errores
```

---

## PÁGINA DE INICIO — SECCIONES EN ORDEN

---

### SECCIÓN 0 — LAYOUT GLOBAL Y COMPONENTES PERSISTENTES

**Componente:** `COMP-MTN-01` → `components/ui/AmbientBackground.tsx`
**Componente:** `COMP-MKT-01` → `components/AnnouncementBanner.tsx`
**Componente:** `COMP-NAV-01` + `COMP-NAV-02` + `COMP-NAV-03` → `components/Navigation.tsx`

```
AnnouncementBanner:
  Mensaje:    "Oferta de lanzamiento — primer mes gratis en cualquier plan"
  CTA texto:  "Ver planes →"
  CTA href:   /precios
  Dismissible: sí — localStorage "vitrina-banner-dismissed"

Navigation:
  Logo:       "Vitrina·" — DM Serif Display 22px, color white, punto ámbar
  Links:      Cómo funciona / Precios / Trabajos
              DM Sans 14px, color --color-neutral, hover color white
  CTA:        "Quiero mi web →" — botón ámbar 40px altura, 14px
              Implementar con COMP-INT-01 (MagneticButton variant="accent")
  Glassmorphic scroll:
              background: rgba(15,25,35,0.45)
              border-bottom: 0.5px solid rgba(232,160,32,0.15)
              backdrop-filter: blur(16px)
  Altura:     72px desktop / 64px móvil
  z-index:    40 (de escala definida en CLAUDE.md)
  Móvil:      COMP-NAV-02 hamburger, menú fullscreen #0F1923
```

---

### SECCIÓN 1 — HERO + CARD CAROUSEL

**Referencia de diseño:** Estilo Squarespace landing page — full-bleed video, slogan centrado,
carrusel de tarjetas que al hacer scroll se revelan en grid. Fluido y cinematográfico.

---

#### 1A. VIDEO HERO (100vh)

**Componente base:** `COMP-CNT-03` → `components/AdaptiveMedia.tsx`
**Componente animación texto:** `COMP-HERO-03` → `<RevealText>` en cada línea H1
**Componente CTAs:** `COMP-INT-01` → `<MagneticButton>` para ambos botones

**Layout:** Fullscreen. Texto centrado sobre el vídeo. DESIGN_VARIANCE = 6 (centrado
permitido aquí porque el vídeo lo justifica visualmente — excepción documentada).

**Vídeo de fondo (AdaptiveMedia):**
- ID de asset: `hero-01` (MEDIA_LIST.md)
- Detección automática: `hero-01.webm` → `hero-01.mp4` → `hero-01.jpg` → CSS fallback
- Objeto: `object-fit: cover` cobriendo 100% del viewport
- Overlay: `linear-gradient(to bottom, rgba(10,14,20,0.2) 0%, rgba(10,14,20,0.1) 40%, rgba(10,14,20,0.6) 80%, rgba(10,14,20,0.95) 100%)`
  El overlay más denso en la parte baja para hacer transición suave hacia las tarjetas

**Fallback CSS (cuando no hay vídeo — COMP-MTN-02 si GPU disponible, si no:**
```css
background: linear-gradient(135deg, #0f1923, #1a2a3a, #0d1f2d);
animation: vidmove 12s ease-in-out infinite alternate;
```
Con radial gradients sobre él: ámbar tenue (0.12 opacity) + azul profundo (0.15 opacity).
Añadir grain texture SVG en pseudo-element, opacity 0.03.

**Texto centrado (Framer Motion — stagger de entrada):**
```
Label:       "Vitrina Studio" — DM Sans 11px uppercase, tracking 0.14em, color #E8A020
             Usar <RevealText as="span"> delay=0
H1 línea 1:  "Tu página web." — DM Serif Display, clamp(36px, 5vw, 64px), color white
H1 línea 2:  "Profesional." — mismo estilo
H1 línea 3:  "19,90 €/mes." — mismo estilo, color #E8A020
             Todas: letter-spacing -0.02em, line-height 1.08
             Usar <RevealText as="h1"> splitBy="line" delay=0.1
Sub:         "Sin letras pequeñas. Sin inversión inicial. Lista en 3 días."
             DM Sans 16px, color rgba(255,255,255,0.5), weight 300, mt 20px
             Usar <RevealText as="p"> delay=0.2
CTAs row (justify-content: center, gap 16px):
  Primario:   <MagneticButton variant="primary">
              "Quiero mi web →" — bg #E8A020, color #0a0e14, 44px height, border-radius 6px
              DM Sans 13px weight 500
  Secundario: <MagneticButton variant="ghost">
              "Ver ejemplos" — borde 1px rgba(255,255,255,0.2), color rgba(255,255,255,0.6)
             delay=0.3
```

**Scroll indicator (posición absoluta, bottom 28px, centrado):**
- Línea vertical de 32px, gradient de #E8A020 a transparent
- Label "Scroll" en 10px uppercase tracking-wide, color rgba(255,255,255,0.3)
- Animación pulse CSS: opacity 0.4 → 1, loop 2s ease-in-out
- Desaparece al hacer scroll (IntersectionObserver)

**Transición al siguiente bloque:**
El overlay del vídeo llega a opacity 0.95 en el fondo — la transición visual a las tarjetas
es imperceptible, parece que las tarjetas emergen del vídeo.

---

#### 1B. CARDS CAROUSEL — HERO SCROLL-JACKED

**Componente:** `HeroCarousel.tsx` — construir nativo (no hay equivalente en 21st.dev para esta interacción específica)
**Componente CTAs internas:** `COMP-INT-01` → `<MagneticButton>` en cada card activa

**Posición:** Las cards viven DENTRO del mismo viewport que el vídeo hero.
No están "debajo" — están superpuestas en el tercio inferior (position: absolute, bottom 0).
El overlay del vídeo se vuelve casi opaco (0.88–0.97) en la zona de las cards,
creando un suelo oscuro sobre el que flotan las tarjetas.

**Composición del viewport:**

```
┌─────────────────────────────────────────────────┐  ← 100vh
│                                                 │
│   NAV (60px, posición absoluta, z-index 40)     │
│                                                 │
│        VIDEO DE FONDO (cubre todo)              │
│                                                 │
│        TEXTO HERO (centrado, ~62% alto)         │
│        Label / H1 / Sub / CTAs                 │
│                                                 │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │
│                                                 │
│   CARDS STRIP (38% inferior, position:absolute) │
│   [card ‹] [  CARD ACTIVA GRANDE  ] [card ›]   │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Scroll-jacking:**
```js
// Cuando el usuario hace scroll/wheel sobre la página:
// - El scroll NO mueve la página verticalmente.
// - Cada tick (deltaY > 60) avanza o retrocede 1 card.
// - La card avanzada se centra, agranda, activa animaciones internas.
// - Al llegar a la última card y seguir scrolleando: liberar scroll normal.
window.addEventListener('wheel', e => {
  e.preventDefault();
  // acumular deltaY → cuando > 60 → navigate(±1)
}, { passive: false });
```

**Dimensiones de cards:**
```
Card inactiva (izquierda/derecha):  width: 280px, height: calc(100% - 20px)
Card activa (centro):               width: 520px, height: 100%
Gap entre cards:                    16px
```

Transición de tamaño: `0.75s cubic-bezier(0.16, 1, 0.3, 1)`.

El track se traduce con `translateX()`:
```js
// Fórmula de offset para centrar card activa:
const offset = -(x_acumulado - (stripWidth/2 - ACTIVE_W/2));
```

**Animaciones internas por estado:**

| Elemento           | Estado inactivo             | Estado activo                      |
|--------------------|-----------------------------|------------------------------------|
| Headline           | font-size: 16px             | font-size: 24px                    |
| Body text          | opacity: 0                  | opacity: 1, delay 0.1s             |
| CTA button         | opacity: 0, translateY(8px) | opacity: 1, translateY(0), delay 0.2s |
| Imagen derecha     | opacity: 0, translateX(20px)| opacity: 1, translateX(0), delay 0.15s |
| Skeleton rows      | opacity: 0                  | opacity: 1, delay 0.3s             |
| Blob atmosférico   | opacity: 0.3                | opacity: 0.55                      |
| Box shadow         | débil                       | 0 16px 60px rgba(0,0,0,.7)         |

Todas las transiciones: `cubic-bezier(0.16, 1, 0.3, 1)`, 0.4–0.6s.
IMPORTANTE: usar CSS transitions activadas por clase — no Framer Motion aquí.

**Controles:**
- Flechas ‹ › laterales (semitransparentes, z-index 25)
- Dots de progreso en la base (pill activo en ámbar)
- Teclado: ArrowLeft / ArrowRight
- Touch: swipe horizontal
- Click en card inactiva → activa esa card

**Datos de las 6 cards (contenido exacto):**

```jsx
// components/HeroCarousel.tsx
const CARDS_DATA = [
  { theme: 0, logo: 'Fontanería Martín', sector: 'Fontanería · Plan Profesional',
    headline: 'Tu fontanero\nde confianza.', body: 'Madrid · Urgencias 24h\nPresupuesto gratuito en 1 hora',
    cta: 'Solicitar presupuesto →', navCta: 'Llamar' },
  { theme: 1, logo: 'Alma Yoga', sector: 'Yoga · Plan Básica',
    headline: 'Encuentra\ntu centro.', body: 'Valencia · Todos los niveles\nClases online y presencial',
    cta: 'Reservar clase →', navCta: 'Reservar' },
  { theme: 2, logo: 'Barbería El Corte', sector: 'Barbería · Plan Avanzada',
    headline: 'El mejor corte\nde tu barrio.', body: 'Barcelona · Desde 12 € · Sin cita previa\nAbierto sábados y domingos',
    cta: 'Ver servicios →', navCta: 'Reserva' },
  { theme: 3, logo: 'Clínica Serena', sector: 'Salud · Plan Profesional',
    headline: 'Fisioterapia\nespecializada.', body: 'Sevilla · Primera consulta gratis\n15 años de experiencia',
    cta: 'Pedir cita →', navCta: 'Cita' },
  { theme: 4, logo: 'Academia Lumina', sector: 'Academia · Plan Avanzada',
    headline: 'Inglés que\nabre puertas.', body: 'Zaragoza · Grupos reducidos\nPreparación exámenes oficiales',
    cta: 'Clase de prueba →', navCta: 'Prueba' },
  { theme: 5, logo: 'Casa Pepe', sector: 'Restaurante · Plan Profesional',
    headline: 'Cocina de mercado,\nde verdad.', body: 'Madrid · Menú del día 14 €\nAbierto todos los días',
    cta: 'Reservar mesa →', navCta: 'Reservar' },
]

// Colores de tema por card:
// theme-0: bg #0c1825→#1a3a5c, blob/accent #3a7bd5  (Fontanería — azul marino)
// theme-1: bg #141a18→#1e3d30, blob/accent #3a8a5a  (Yoga — verde)
// theme-2: bg #18100a→#2e1c0e, blob/accent #c4922a  (Barbería — ámbar oscuro)
// theme-3: bg #0c1e28→#183040, blob/accent #2a9a8a  (Clínica — teal)
// theme-4: bg #180f28→#2a1840, blob/accent #7a5ac4  (Academia — púrpura)
// theme-5: bg #200c0c→#3a1410, blob/accent #c43a2a  (Restaurante — rojo)
```

**Estructura interna de cada tarjeta:**

```jsx
<div className="site-card card-theme-{N}">
  <div className="card-inner">
    {/* Blob atmosférico — pulse 4s */}
    <div className="card-blob" />

    {/* Mini nav */}
    <div className="card-nav">
      <span className="card-logo">[logo del negocio]</span>
      <div className="card-nav-links">{/* 3 pills */}</div>
      <div className="card-nav-cta" />
    </div>

    {/* Hero mini-web */}
    <div className="card-hero">
      <h3 className="card-headline">[headline del negocio]</h3>
      <p className="card-sub">[ciudad · servicio · detalle]</p>
      {/* CTA — usar MagneticButton solo cuando card está activa */}
      <MagneticButton variant="accent" className="card-cta-mini">
        [cta del negocio]
      </MagneticButton>
    </div>

    {/* Skeleton strips — sugieren más contenido */}
    <div className="card-strips">
      <div className="card-strip" style={{ width: '65%' }} />
      <div className="card-strip" style={{ width: '85%' }} />
      <div className="card-strip" style={{ width: '45%' }} />
    </div>
  </div>

  <div className="card-sector">[Sector] · Plan [X]</div>

  <div className="card-overlay">
    <button className="card-overlay-btn">Ver ejemplo →</button>
  </div>
</div>
```

**Hover en tarjeta:**
- `transform: translateY(-6px) scale(1.01)`
- `box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 4px 12px rgba(232,160,32,0.08)`
- Overlay: opacity 0 → 1, botón sube translateY(6px → 0)
- Transición: 300ms cubic-bezier(0.16, 1, 0.3, 1)

**Mobile (390px):**
- Cards ocupan el 45% inferior del viewport.
- Card activa: width 85vw (centrada), card inactiva: 65vw cortada por los lados.
- Swipe horizontal activa navigate(±1).
- No hay flechas ‹ › — solo dots y swipe.

**Librería de animación:**
- Framer Motion: hover states y animaciones de entrada del texto del hero
- CSS keyframes: blob pulse, drift del carousel, scroll indicator
- IntersectionObserver (nativo): scroll reveal de tarjetas en grid
- NUNCA mezclar GSAP con Framer Motion en el mismo árbol de componentes

---

#### 1C. CARDS PEEK ROW — HORIZONTAL SCROLL (bajo el hero)

**Componente referencia:** `COMP-INT-03` → ver patrón de scroll horizontal
**Nota:** Este peek row es diferente al carousel del hero. Es el strip de trabajos que aparece
inmediatamente debajo, en fondo #0a0e14, con auto-drift continuo.

**Posición:** Inmediatamente bajo el hero, sin separación visual. Fondo #0a0e14.

**Label sobre el carousel:**
- "Nuestros trabajos" — DM Sans 10px uppercase, tracking 0.14em, color #E8A020, centrado
- "Webs que ya están funcionando." — DM Serif Display 26px, color white, centrado, mb 28px

**Técnico:**
```
Contenedor:    overflow-x: auto, scroll-snap-type: x mandatory, scrollbar-width: none
Track:         display: flex, gap: 18px, padding: 12px 40px
Cada tarjeta:  scroll-snap-align: start, flex-shrink: 0, 260px × 170px, border-radius 14px
Auto-drift:    requestAnimationFrame, 0.4px/frame, pausa en mousedown/touchstart
               Loop infinito: scrollLeft >= scrollWidth/2 → resetear a 0 (contenido duplicado)
Drag:          mousedown → mousemove → delta → scrollLeft
               cursor: grab / grabbing
```

**Las mismas 6 tarjetas que el carousel del hero (mismos CARDS_DATA).**

---

#### 1D. CARDS GRID — SCROLL REVEAL (bajo el peek row)

**Componente referencia:** Scroll reveal → usar patrón de `COMP-HERO-03` con IntersectionObserver

**Layout:**
```
Grid:     display: grid, grid-template-columns: repeat(2, 1fr), gap: 20px, padding: 0 40px
Altura:   220px por tarjeta
Fondo:    mismo #0a0e14
```

**Animación de entrada (IntersectionObserver, threshold 0.15):**
```css
/* Estado inicial */
opacity: 0; transform: translateY(30px);
/* Estado visible */
opacity: 1; transform: translateY(0);
transition: 0.7s cubic-bezier(0.16, 1, 0.3, 1);
/* Stagger: 80ms por tarjeta via setTimeout en el callback */
```

**Mobile (390px):** Grid 1 columna. Peek row: padding 0 20px, tarjetas 220px × 150px.

**Las mismas 6 tarjetas (CARDS_DATA).**

---

### SECCIÓN 1.5 — TICKER DE SECTORES

**Componente:** `COMP-MKT-05` adaptado → `components/ClientLogos.tsx` (en modo ticker de texto)
**Posición:** Entre el bloque hero/cards y la propuesta de valor.

```
Layout:        Banda horizontal, auto-scroll CSS infinito
Fondo:         --color-secondary (#2D3F52)
Altura:        48px
Contenido:     "Fontaneros · Peluquerías · Fisioterapeutas · Instructores · Restaurantes ·
               Academias · Veterinarios · Electricistas · Dentistas · Barberías ·
               Tiendas · Entrenadores · Estética · Carpinteros · Ópticas ···"
               Separador "·" en color ámbar (#E8A020)
               Texto en --color-neutral (#8A9BAD)
Tipografía:    DM Sans 13px, weight 400
Velocidad:     40s loop, sin pausa en hover
Implementación: CSS @keyframes marquee (duplicar contenido para loop perfecto)
               NO JavaScript — CSS puro
```

---

### SECCIÓN 2 — PROPUESTA DE VALOR (6 TARJETAS)

**Componente:** `COMP-MKT-03` → `components/Services.tsx`
**Componente titular:** `COMP-HERO-03` → `<RevealText>` en H2
**Componente cards:** `COMP-CNT-06` → ServiceCards con hover states

**Layout:**
```
Fondo:    --color-light (#F5F2EE)
Grid:     3×2 desktop / 2×3 tablet / 1×6 móvil
Gap:      24px
Padding:  py-24 lg:py-32, px-8
```

**Header de sección:**
```
Label:    "Por qué elegir Vitrina" — DM Sans 12px uppercase, tracking 0.08em, color #E8A020
H2:       "Todo lo que necesitas tu negocio. Nada que no necesitas."
          DM Serif Display, 44px desktop / 32px móvil, color #0F1923
          Aplicar <RevealText splitBy="line">
Sub:      ninguno — el H2 ya es suficiente
```

**Las 6 tarjetas (contenido exacto — no modificar):**

```
Tarjeta 1:
  Icono:       Pincel / brocha (Lucide: Paintbrush), color #E8A020, 24px
  Título:      Diseño a medida
  Descripción: Cada web es única para tu negocio. No usamos plantillas genéricas.
               Diseño profesional que transmite quién eres.

Tarjeta 2:
  Icono:       Estrella / diamante (Lucide: Sparkles), color #E8A020, 24px
  Título:      Diseño de primer nivel
  Descripción: Usamos las herramientas y técnicas de los mejores estudios web.
               El resultado parece de agencia. El precio, no.

Tarjeta 3:
  Icono:       Euro con barra (Lucide: CircleDollarSign), color #E8A020, 24px
  Título:      Sin inversión inicial
  Descripción: Cero euros por adelantado. Pagas solo la mensualidad.
               Sin riesgo, sin compromisos de permanencia.

Tarjeta 4:
  Icono:       Móvil + escritorio (Lucide: MonitorSmartphone), color #E8A020, 24px
  Título:      Perfecta en cualquier pantalla
  Descripción: Tu web funciona igual de bien en móvil, tablet y ordenador.
               El 78% de tus clientes llega desde el móvil.

Tarjeta 5:
  Icono:       Rayo / reloj (Lucide: Zap), color #E8A020, 24px
  Título:      Lista en 3 días
  Descripción: Desde que nos mandas los datos hasta que está publicada:
               3 días laborables. Sin esperas de semanas.

Tarjeta 6:
  Icono:       Escudo (Lucide: ShieldCheck), color #E8A020, 24px
  Título:      Mantenimiento incluido
  Descripción: Actualizaciones, seguridad y soporte por WhatsApp incluidos.
               Tu web siempre funcionando. Tú, tranquilo.
```

**Estilos de tarjeta (adaptar COMP-CNT-06 a esta paleta):**
```
bg:      #FFFFFF (--color-surface)
border:  0.5px solid rgba(138,155,173,0.3) (--color-neutral)
radius:  8px
padding: 28px
Hover:   border-color #E8A020, shadow-md, translateY(-4px), 200ms
Icono bg: 44px × 44px, bg rgba(232,160,32,0.08), radius 6px
```

---

### SECCIÓN 3 — PORTFOLIO (TRABAJOS)

**Componente:** `COMP-INT-03` → `components/Projects.tsx` (scroll horizontal)
**Componente imágenes:** `COMP-CNT-02` → galería con hover overlay

**Layout:**
```
Fondo:    --color-primary (#1E2B3A)
Padding:  py-24 lg:py-32
```

**Header de sección:**
```
Label:    "Nuestros trabajos" — uppercase ámbar
H2:       "Webs que ya están funcionando."
          DM Serif Display, color white
          Aplicar <RevealText>
Sub:      "Cada sector tiene su propio diseño. Ninguna web se parece a la anterior."
          DM Sans 17px, color --color-neutral
```

**Grid 3 columnas (desktop) / 2 (tablet) / 1 (móvil). Ratio tarjetas: 3:2.**

**Las 6 tarjetas de portfolio (placeholders elegantes hasta screenshots reales):**

```
Tarjeta 1: Fontanero · Madrid · Plan Profesional
           Placeholder: linear-gradient(135deg, #0d1b2a, #1a3a5c) + icono herramienta
           /* TODO: reemplazar con screenshot real */

Tarjeta 2: Fisioterapeuta · Valencia · Plan Profesional
           Placeholder: linear-gradient(135deg, #0d2a1f, #1a3d2e) + icono salud
           /* TODO: reemplazar con screenshot real */

Tarjeta 3: Barbería · Barcelona · Plan Avanzada
           Placeholder: linear-gradient(135deg, #1a0f08, #2e1c0e) + icono tijeras
           /* TODO: reemplazar con screenshot real */

Tarjeta 4: Instructora de yoga · Málaga · Plan Básica
           Placeholder: linear-gradient(135deg, #2a1a0a, #3d2810) + icono lotus
           /* TODO: reemplazar con screenshot real */

Tarjeta 5: Electricista · Bilbao · Plan Básica
           Placeholder: linear-gradient(135deg, #1a1a0a, #2e2e10) + icono rayo
           /* TODO: reemplazar con screenshot real */

Tarjeta 6: Academia de inglés · Zaragoza · Plan Avanzada
           Placeholder: linear-gradient(135deg, #0a1a2a, #1020388) + icono libro
           /* TODO: reemplazar con screenshot real */
```

**Hover en tarjeta:** overlay oscuro aparece, botón "Ver ejemplo →" aparece centrado.
Implementar con patrón de COMP-CNT-02 (hover overlay).

**CTA bajo grid:**
- "Ver todos los trabajos →" — botón ghost, borde ámbar, color ámbar → href /trabajos
- Implementar con `<MagneticButton variant="accent">` (COMP-INT-01)

---

### SECCIÓN 4 — CÓMO FUNCIONA

**Componente:** `COMP-MKT-04` → `components/HowItWorks.tsx`
**Componente titular:** `COMP-HERO-03` → `<RevealText>` en H2

**Layout:**
```
Fondo:    --color-light (#F5F2EE)
Steps:    3 pasos en horizontal con número grande + conector
          Desktop: horizontal con línea punteada entre pasos
          Móvil: vertical, conector vertical
Padding:  py-24 lg:py-32
```

**Header de sección:**
```
Label:    "El proceso" — DM Sans 12px uppercase, tracking 0.08em, color #E8A020
H2:       "De cero a publicado en 3 días."
          DM Serif Display, 44px, color #0F1923
          Aplicar <RevealText>
```

**Los 3 pasos (contenido exacto):**

```
Paso 01:
  Detalle:     "Día 1"
  Título:      Nos cuentas tu negocio
  Descripción: Rellenas un formulario sencillo. Nos dices quién eres, qué haces,
               tu teléfono y horario. 10 minutos, sin complicaciones.

Paso 02:
  Detalle:     "Días 1-3"
  Título:      Nosotros lo construimos todo
  Descripción: Diseñamos y desarrollamos tu web a medida. Tú no tienes que
               hacer nada más. Lo publicamos en tu dominio.

Paso 03:
  Detalle:     "Día 3"
  Título:      Tu negocio aparece en Google
  Descripción: Tu web está live, indexada, y lista para recibir clientes.
               Soporte incluido por WhatsApp para lo que necesites.
```

**Estilos de número (adaptar COMP-MKT-04 a esta paleta):**
```
Número grande:    DM Serif Display 80px, color #E8A020, opacity 0.15
                  Posición absoluta, watermark detrás del texto
Conector:         línea horizontal punteada, color --color-neutral opacity 0.4
                  Animación: scaleX 0→1 al entrar en viewport
```

**CTA bajo sección:** "Ver cómo funciona en detalle →" — link a /como-funciona
Implementar con `<MagneticButton variant="ghost">` (COMP-INT-01)

---

### SECCIÓN 5 — PRECIOS

**Componente:** `COMP-MKT-02` → `app/precios/page.tsx` + `components/Pricing.tsx`
**Componente titular:** `COMP-HERO-03` → `<RevealText>` en H2
**Componente botones:** `COMP-INT-01` → `<MagneticButton>` en cada CTA de plan
**Componente border:** `COMP-INT-04` → `<AnimatedBorder>` en tarjeta Profesional

**Layout:**
```
Fondo:    --color-primary (#1E2B3A)
Columnas: 3 planes. Profesional (central) ligeramente más grande, borde ámbar 2px
Padding:  py-24 lg:py-32
```

**Header de sección:**
```
Label:    "Planes y precios" — uppercase ámbar
H2:       "Precio claro. Sin sorpresas."
          DM Serif Display, color white
          Aplicar <RevealText>
Sub:      "Sin pago inicial. Sin permanencia. Cancela cuando quieras."
          DM Sans 17px, color --color-neutral
```

**Los 3 planes (datos exactos — no modificar precios ni features):**

```
PLAN BÁSICA — 19,90 €/mes
  Badge promo:      [ninguno]
  Descripción:      Para negocios que dan el primer paso online
  Incluye:
    ✓ Web básica personalizada para tu negocio
    ✓ Hasta 4 páginas
    ✓ Diseño a medida (no es una plantilla)
    ✓ Formulario de contacto
    ✓ Botón de WhatsApp
    ✓ Google Maps integrado
    ✓ SEO básico local
    ✓ Dominio .es o .com incluido
    ✓ SSL (candado de seguridad)
    ✓ Responsive (móvil y escritorio)
    ✓ Soporte por email
  No incluye:
    — Animaciones avanzadas
    — Rediseño anual
    — SEO avanzado
  CTA:              <MagneticButton variant="secondary">"Empezar con Básica"</MagneticButton>

PLAN PROFESIONAL — ~~39 €/mes~~ → 29 €/mes
  Badge promo:      "Oferta lanzamiento — ahorra 10 €/mes" (pequeño, color ámbar)
  Badge popular:    "Más popular" — encima de la tarjeta
  Descripción:      Para negocios que quieren destacar y crecer
  Borde:            2px solid #E8A020 + <AnimatedBorder> en hover (COMP-INT-04)
  Incluye todo de Básica, más:
    ✓ Hasta 6 páginas
    ✓ Animaciones avanzadas (scroll reveals, hover states, transiciones)
    ✓ Rediseño completo cada 12 meses incluido
    ✓ SEO básico (meta tags, sitemap, robots.txt, Google Search Console)
    ✓ Galería de fotos
    ✓ Sección de testimonios
    ✓ 1 ronda de cambios por mes
    ✓ Soporte por WhatsApp
  No incluye:
    — SEO avanzado
    — Rediseño semestral
  CTA:              <MagneticButton variant="primary">"Empezar con Profesional"</MagneticButton>
  Precio tachado:   39 €/mes tachado, luego 29 €/mes en grande

PLAN AVANZADA — ~~69 €/mes~~ → 59 €/mes
  Badge promo:      "Oferta lanzamiento — ahorra 10 €/mes"
  Descripción:      Para negocios establecidos con presencia digital activa
  Incluye todo de Profesional, más:
    ✓ Páginas ilimitadas
    ✓ Blog con CMS (gestor de contenido propio)
    ✓ Rediseño completo cada 6 meses incluido
    ✓ SEO avanzado (estrategia local, optimización de contenido, informe mensual)
    ✓ Estadísticas mensuales (visitas, clics, consultas)
    ✓ 2 rondas de cambios por mes
    ✓ Soporte prioritario (respuesta en menos de 4 horas)
    ✓ Formulario de reservas básico (sin pago online)
  CTA:              <MagneticButton variant="secondary">"Empezar con Avanzada"</MagneticButton>
  Precio tachado:   69 €/mes tachado, luego 59 €/mes en grande
```

**Nota bajo los planes:**
```
"Todos los planes incluyen: instalación del dominio, alojamiento web, certificado SSL
y 1 ronda de revisión tras el lanzamiento."
"¿Necesitas tienda online? Consúltanos — lo presupuestamos aparte."
```

**Estilos de tarjeta de precio (adaptar COMP-MKT-02 a esta paleta):**
```
bg:           #FFFFFF (sobre fondo oscuro de sección)
border:       0.5px solid rgba(138,155,173,0.2) (default)
              2px solid #E8A020 (Profesional)
radius:       8px
Precio:       DM Serif Display 48px, color #0F1923, sufijo "/mes" DM Sans 20px
Feature list: checkmark SVG en #E8A020, DM Sans 15px
```

---

### SECCIÓN 6 — TESTIMONIOS

**Componente:** `COMP-MKT-06` → `components/Testimonials.tsx`
**Componente titular:** `COMP-HERO-03` → `<RevealText>` en H2

**Layout:**
```
Fondo:    --color-light (#F5F2EE)
Grid:     3 tarjetas en row desktop / 1 columna móvil
Padding:  py-24 lg:py-32
```

**Header de sección:**
```
Label:    "Lo que dicen nuestros clientes" — uppercase ámbar
H2:       "Resultados reales. Negocios reales."
          DM Serif Display, color #0F1923
          Aplicar <RevealText>
```

**Los 3 testimonios (copiar exactamente — no parafrasear):**

```
Testimonio 1:
  Cita:      "Llevaba dos años diciéndome que iba a hacer la web.
              En una semana ya estaba en Google. Mis clientes me dicen que se ve muy profesional."
  Nombre:    Antonio R.
  Negocio:   Fontanero · Sevilla

Testimonio 2:
  Cita:      "No entiendo nada de tecnología, y no hizo falta.
              Me preguntaron cuatro cosas y ya estaba lista. El precio, sin comentarios — es una ganga."
  Nombre:    Marta L.
  Negocio:   Peluquera · Bilbao

Testimonio 3:
  Cita:      "Tengo una academia pequeña. Ahora mis alumnos me mandan a sus amigos
              diciéndoles que busquen mi web. Eso antes no pasaba."
  Nombre:    Pedro S.
  Negocio:   Academia de inglés · Zaragoza
```

**Estilos de tarjeta (adaptar COMP-MKT-06 a esta paleta):**
```
bg:           #FFFFFF
border:       0.5px solid rgba(138,155,173,0.3)
radius:       8px
padding:      32px 28px
Comillas:     DM Serif Display 80px, color #E8A020, opacity 0.15
Cita:         DM Serif Display 18px italic, color #0F1923, line-height 1.6
Nombre:       DM Sans 600, 13px, uppercase, color #0F1923
Negocio:      DM Sans 300, 12px, color --color-neutral
Hover:        border-color #E8A020, shadow-md
```

---

### SECCIÓN 7 — FAQ

**Componente:** `COMP-CNT-04` → `components/FAQ.tsx`
**Componente titular:** `COMP-HERO-03` → `<RevealText>` en H2

**Layout:**
```
Fondo:    --color-primary (#1E2B3A)
Grid:     2 columnas en desktop / 1 en móvil
Padding:  py-24 lg:py-32
Texto:    Preguntas DM Sans 600, color white
          Respuestas DM Sans 400, color --color-neutral
```

**Header de sección:**
```
Label:    "Preguntas frecuentes" — uppercase ámbar
H2:       "¿Tienes dudas? Normal."
          DM Serif Display, color white
          Aplicar <RevealText>
```

**Las 6 preguntas (copiar exactamente):**

```
P: ¿Por qué 19,90 €? ¿Hay algo que no me estáis contando?
R: No hay trampa. Usamos herramientas modernas que nos permiten trabajar
   muy rápido. El ahorro en tiempo lo trasladamos al precio.
   El precio que ves es lo que pagas. Sin comisiones ocultas, sin letra pequeña.

P: ¿Cuánto tiempo tardo en tener mi web lista?
R: Entre 3 y 5 días laborables desde que nos mandas tus datos e imágenes.
   El plan Básica suele estar lista en 3 días.

P: ¿Qué pasa si quiero cambiar algo después?
R: Nos lo dices por WhatsApp. Los cambios de texto, horarios o fotos los
   hacemos sin coste adicional. El número de cambios mensuales depende de tu plan.

P: ¿Puedo cancelar cuando quiera?
R: Sí, sin permanencia ni penalizaciones. Avisas con 30 días de antelación y listo.
   No queremos clientes que no estén contentos.

P: ¿Necesito saber de informática?
R: No. Nosotros nos encargamos de todo: diseño, programación, publicación,
   dominio y alojamiento. Tú solo nos cuentas tu negocio.

P: ¿Mi web aparecerá en Google?
R: Sí. Todas las webs incluyen SEO básico local desde el primer día.
   El plan Avanzada incluye SEO avanzado con estrategia de contenidos.
```

**Estilos (adaptar COMP-CNT-04 a esta paleta):**
```
Trigger:      DM Sans 600, 18px, color white, full-width button
Icono:        + / − en #E8A020
Respuesta:    DM Sans 400, 16px, color #8A9BAD, line-height 1.8
Divisor:      0.5px solid rgba(138,155,173,0.2)
```

---

### SECCIÓN 8 — CTA FINAL

**Componente:** `COMP-MKT-08` → `components/CTASection.tsx`
**Componente fondo:** `COMP-MTN-01` → `<AmbientBackground>` en modo ámbar tenue
**Componente CTAs:** `COMP-INT-01` → `<MagneticButton>` para ambos botones
**Componente contador:** `COMP-CNT-05` → opcional — stat numérica si hay datos reales

**Layout:**
```
Fondo:      linear-gradient(to bottom, --color-dark, --color-primary)
            + AmbientBackground blob ámbar, opacity 0.06
Altura:     320px mínimo
Centrado:   max-width 720px, margin auto
Padding:    py-32 lg:py-40
```

**Contenido exacto:**

```
Label:      "¿A qué esperas?"
            DM Sans 12px uppercase, tracking 0.08em, color #E8A020
H2:         "Tu negocio se merece estar en internet."
            DM Serif Display, 44px desktop / 32px móvil, color white
            Aplicar <RevealText>
Sub:        "Empieza hoy. Tu web en 3 días. Sin riesgo."
            DM Sans 18px, color --color-neutral, mb 40px
CTA 1:      <MagneticButton variant="primary">
            "Quiero mi web →" — 56px altura, ámbar grande
CTA 2:      "o escríbenos por WhatsApp" — link texto, color --color-neutral
            hover color ámbar, href wa.me/[número pendiente]
```

---

### SECCIÓN 9 — FORMULARIO DE CONTACTO (/contacto)

**Componente:** `COMP-CNT-01` → `components/ContactForm.tsx`
**Ruta:** `app/contacto/page.tsx`

**Campos (en este orden):**

```
1. Nombre completo*        — type text, autocomplete "name"
2. Email*                  — type email, autocomplete "email"
3. Teléfono                — type tel, autocomplete "tel"
4. Tipo de negocio         — select:
                             Restaurante / Clínica o consulta / Tienda /
                             Peluquería o barbería / Instructor o academia /
                             Fontanero u oficio / Otro
5. Mensaje*                — textarea, 4 rows
6. RGPD checkbox* (OBLIGATORIO — ley española):
   "He leído y acepto la [Política de privacidad] y consiento
    el tratamiento de mis datos para recibir información sobre los servicios de Vitrina Studio."
   Link a /politica-privacidad, abre en nueva pestaña
```

**Validación:** solo on blur — nunca on keystroke.
**Submit:** Formspree o Netlify Forms. Endpoint: /* TODO: añadir endpoint real */
**Éxito:** mensaje inline "Mensaje enviado — te contactamos en menos de 24 horas."
**Error:** "Error al enviar. Inténtalo de nuevo o escríbenos por WhatsApp."

**Estilos (adaptar COMP-CNT-01 a esta paleta):**
```
bg input:    #FFFFFF, border: 0.5px solid #8A9BAD, radius: 6px
Focus:       border-color #E8A020, box-shadow 0 0 0 3px rgba(232,160,32,0.12)
Error:       border-color #E24B4A, mensaje rojo bajo el campo
Label:       DM Sans 600, 12px, uppercase, tracking 0.06em, color #0F1923
Submit:      <MagneticButton variant="primary"> full-width (COMP-INT-01)
```

---

## COMPONENTES GLOBALES

### Navegación (header)
**Componente:** `COMP-NAV-01` + `COMP-NAV-02` + `COMP-NAV-03`
**Archivo:** `components/Navigation.tsx`

```
Posición:      sticky top, z-index 40
Altura:        72px desktop / 64px móvil
Glassmorphic:  rgba(15,25,35,0.45) + blur(16px) + border-bottom rgba(232,160,32,0.15)
Logo:          "Vitrina·" DM Serif Display 22px, color white, punto en ámbar
               Implementar con <VitrinaLogo variant="light"> (COMP-NAV-03)
Links:         DM Sans 14px, color --color-neutral, hover white
               "Cómo funciona" / "Precios" / "Trabajos"
CTA:           <MagneticButton variant="accent"> "Quiero mi web →" 40px altura 14px
Móvil:         <HamburgerMenu> (COMP-NAV-02) — menú fullscreen #0F1923
               Links grandes centrados, CTA full-width bajo los links
```

### Footer global
**Componente:** `COMP-MKT-09` → `components/Footer.tsx`

```
bg:            --color-primary (#1E2B3A)
border-top:    0.5px solid rgba(138,155,173,0.12)
Padding:       py-16 md:py-20
Grid:          4 columnas desktop / 2×2 tablet / stacked móvil

Col 1 — Marca:
  <VitrinaLogo variant="light"> (COMP-NAV-03)
  Tagline: "Vitrina Studio — Webs para negocios reales."
           DM Sans 300, 13px, color --color-neutral, mt 12px

Col 2 — Navegación:
  "Inicio" / "Cómo funciona" / "Precios" / "Trabajos" / "Contacto"
  DM Sans 300, 14px, color --color-neutral, hover white

Col 3 — Legal (OBLIGATORIO — ley española):
  "Aviso legal" → /aviso-legal
  "Política de privacidad" → /politica-privacidad
  "Política de cookies" → /politica-cookies

Col 4 — Contacto:
  Email:     /* TODO: hola@vitrinastudio.es */
  WhatsApp:  /* TODO: wa.me/34XXXXXXXXX */
  Horario:   "Lunes a viernes, 9:00 – 18:00"

Bottom bar:
  "© 2026 Vitrina Studio. Todos los derechos reservados."
  DM Sans 300, 12px, color --color-neutral
  border-top: 0.5px solid rgba(138,155,173,0.08), py-6
```

### Mobile dock
**Componente:** `COMP-INT-02` → `components/MobileDock.tsx`
**Solo visible:** en móvil (hidden md:block)

```
3 acciones:
  1. Llamar    → tel:/* TODO */
  2. WhatsApp  → wa.me//* TODO */
  3. Presupuesto → /contacto

Estilos dock:
  bg: rgba(15,25,35,0.85), blur(16px)
  border: 0.5px solid rgba(232,160,32,0.25)
  radius: 999px (pill), bottom 24px, centrado
  Iconos: 20px, color #8A9BAD → hover white
  WhatsApp: #25D366 (excepción de color)
```

---

## ESPECIFICACIONES TÉCNICAS

```
Framework:     Next.js 14, App Router
Estilos:       Tailwind CSS + CSS variables (nunca colores Tailwind por defecto)
Fuentes:       DM Serif Display + DM Sans via next/font
Imágenes:      next/image siempre — nunca <img>
Animaciones:   Framer Motion para interacciones UI
               IntersectionObserver para scroll reveals
               CSS keyframes para ticker y micro-animaciones simples
               COMP-INT-01 (MagneticButton) en todos los CTAs principales
Formulario:    Formspree o Netlify Forms — /* TODO: endpoint */
Analytics:     [A definir — incluir cookie consent si se activa]
Deploy:        Vercel
```

**Rendimiento obligatorio:**
- PageSpeed mobile ≥ 85
- LCP < 2.5s
- CLS < 0.1
- No render-blocking scripts

**Accesibilidad obligatoria:**
- Contraste mínimo 4.5:1 en todo texto normal
- Focus rings visibles en todos los elementos interactivos
- Alt text en español en todas las imágenes
- Skip link "Saltar al contenido principal" como primer elemento focusable
- FAQ accesible por teclado (aria-expanded, aria-controls)
- Mobile dock: aria-label en español en cada acción

**SEO meta tags — página de inicio:**
```html
<title>Vitrina Studio | Tu página web profesional desde 19,90 €/mes</title>
<meta name="description" content="Webs profesionales para autónomos y pequeños negocios en España. Diseño a medida, sin inversión inicial, lista en 3 días. Desde 19,90 €/mes sin permanencia." />
<meta property="og:title" content="Vitrina Studio — Tu web profesional desde 19,90 €/mes" />
<meta property="og:description" content="Sin letras pequeñas. Sin pago inicial. Diseño a medida para tu negocio en 3 días." />
```

---

## ANTI-PATTERNS — NUNCA HACER EN ESTE PROYECTO

```
✗ No usar la paleta por defecto de Tailwind (blue-500, gray-200, etc.)
✗ No centrar el hero — excepción documentada solo en 1A por vídeo de fondo
✗ No usar Inter, Roboto o Arial como fuentes
✗ No escribir ningún texto en inglés visible al usuario
✗ No inventar precios o servicios no especificados aquí
✗ No usar placeholders tipo "Lorem ipsum" en ningún lugar
✗ No mostrar precio tachado sin el badge de "promo lanzamiento"
✗ No usar sombras genéricas negras — siempre tintadas con el brand
✗ No construir toda la página de golpe — sección a sección con screenshot
✗ No mezclar GSAP con Framer Motion en el mismo árbol de componentes
✗ No usar <img> — siempre next/image
✗ No usar <form> HTML — usar manejadores de eventos (onClick, onChange)
✗ No poner focus-visible: none en ningún elemento
✗ No usar z-index fuera de la escala definida (0/10/20/40/100/1000)
✗ No usar useState en MagneticButton — solo useMotionValue (COMP-INT-01)
✗ No aplicar glassmorphism sobre fondo plano claro — solo sobre oscuro o foto
✗ No validar formularios on keystroke — solo on blur (COMP-CNT-01)
```

---

## COPY ANTI-AI — PALABRAS PROHIBIDAS

```
Prohibidas:  "Eleva", "Transforma", "Impulsa", "Revolucionario", "Innovador",
             "Seamless", "Cutting-edge", "Holístico", "Sinergias", "Disruptivo",
             "Potencia tu negocio", "Lleva tu marca al siguiente nivel",
             "Soluciones integrales", "A medida de tus necesidades"

Escribir:    Frases cortas. Específicas. Honestas.
             "Lista en 3 días" — no "rápida entrega"
             "19,90 €/mes, sin más" — no "precio competitivo"
             "Soporte por WhatsApp" — no "atención al cliente seamless"
```

---

## ESTADO DEL PROYECTO

```
BUILD.md:          ✅ Completo + referencias COMPONENTS_21ST.md añadidas
COMPONENTS_21ST.md:✅ Generado — prompts de componentes listos
brand_assets/:     ⬜ Pendiente — usar tokens de paleta definidos en este BUILD.md
                   hasta que exista brand.md formal
Logo:              ⬜ Pendiente — usar logotipo tipográfico "Vitrina·" (COMP-NAV-03)
Screenshots:       ⬜ Pendiente — usar placeholders elegantes con gradientes definidos
Dominio:           ⬜ Pendiente confirmar vitrinastudio.es
WhatsApp:          ⬜ Pendiente número real — todos los TODOs marcados en código
Email:             ⬜ Pendiente hola@vitrinastudio.es
Formspree:         ⬜ Pendiente endpoint para formulario de contacto
Analytics:         ⬜ A definir — cookie consent pendiente de decisión
```

Marcar cualquier campo pendiente con `/* TODO: reemplazar con dato real */` en el código.

---

## HERO — SPEC ACTUALIZADA (28/03/2026)

**Referencia visual exacta:** Squarespace landing page.

### Composición del viewport

```
┌─────────────────────────────────────────────────┐  ← 100vh
│                                                 │
│   NAV (sticky, z-index 40)                      │
│                                                 │
│        VIDEO DE FONDO — AdaptiveMedia           │
│        (COMP-CNT-03 — auto-detecta formato)     │
│                                                 │
│        TEXTO HERO (centrado, ~62% alto)         │
│        <RevealText> Label / H1 / Sub / CTAs     │
│        CTAs con <MagneticButton> (COMP-INT-01)  │
│                                                 │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │
│                                                 │
│   CARDS STRIP (38% inferior, position:absolute) │
│   HeroCarousel — nativo, scroll-jacked          │
│   [card ‹] [  CARD ACTIVA GRANDE  ] [card ›]   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Dimensiones de cards

```
Card inactiva:  width: 280px, height: calc(100% - 20px)
Card activa:    width: 520px, height: 100%
Gap:            16px
Transición:     0.75s cubic-bezier(0.16, 1, 0.3, 1)
```

Track offset:
```js
const offset = -(x_acumulado - (stripWidth/2 - ACTIVE_W/2));
```

### Animaciones internas por estado de card

| Elemento           | Inactivo                    | Activo                              |
|--------------------|-----------------------------|-------------------------------------|
| Headline           | font-size: 16px             | font-size: 24px                     |
| Body text          | opacity: 0                  | opacity: 1, delay 0.1s              |
| CTA (MagneticButton)| opacity: 0, translateY(8px)| opacity: 1, translateY(0), delay 0.2s|
| Imagen derecha     | opacity: 0, translateX(20px)| opacity: 1, translateX(0), delay 0.15s|
| Skeleton rows      | opacity: 0                  | opacity: 1, delay 0.3s              |
| Blob atmosférico   | opacity: 0.3                | opacity: 0.55                       |
| Box shadow         | débil                       | 0 16px 60px rgba(0,0,0,.7)          |

Todas las transiciones: `cubic-bezier(0.16, 1, 0.3, 1)`, 0.4–0.6s.
Usar CSS transitions por clase — no Framer Motion en el track.

### Mobile (390px)
- Cards: 45% inferior del viewport
- Card activa: 85vw centrada, inactiva: 65vw cortada
- Solo dots y swipe — sin flechas ‹ ›
