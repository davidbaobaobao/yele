# Guía de Fotografías y Vídeos — Vitrina Studio
# Para: Equipo Vitrina Studio
# Preparado por: Vitrina Studio (uso interno)
# Fecha: 2026-03-28

---

## Introducción

Para completar la web de Vitrina Studio necesitamos **4 archivos imprescindibles**
y **6 capturas de pantalla** que podemos generar nosotros mismos una vez construidas
las webs de demostración.

Buenas noticias: **no necesitamos contratar a ningún fotógrafo.**
Todo el contenido visual se puede conseguir con vídeo de archivo gratuito y
exportaciones desde el navegador.

---

## Archivos IMPRESCINDIBLES 🔴
*Sin estos archivos no podemos publicar la web.*

---

### 1. Vídeo de fondo del hero

**¿Dónde aparece?** En la pantalla de inicio, de fondo completo cuando entras a la web.
**¿Qué debe mostrar?** Un vídeo cinematográfico y pausado — manos de alguien trabajando en un ordenador,
luz bokeh, tinta en agua a cámara lenta, o formas geométricas abstractas moviéndose suavemente.
Algo que transmita: calma, profesionalidad, oficio digital.

🔍 **Dónde encontrarlo (gratis):**
- Pexels.com — buscar: `"designer working laptop slow motion"`
- Pexels.com — buscar: `"hands typing keyboard cinematic dark"`
- Pexels.com — buscar: `"ink water slow motion dark background"`
- Pixabay.com — buscar: `"abstract dark bokeh loop video"`

✅ **Criterios para elegirlo:**
- Duración: entre 10 y 20 segundos (se pondrá en bucle)
- Paleta: oscura o neutra cálida — que funcione con texto blanco encima
- Resolución mínima: 1920×1080 (Full HD)
- Licencia: Free for commercial use (marcada en Pexels/Pixabay)
- Sin marcas de agua, sin logotipos visibles, sin caras mirando a cámara

📁 **Nombre del archivo:** `hero-video.mp4` + `hero-video.webm`

⚠️ **Evitar:**
- Vídeos de "startup" con equipos celebrando, pizarras blancas o neones
- Paletas frías azuladas o blancas brillantes
- Vídeos con contenido en pantalla claramente visible (copyright)
- Duración mayor de 30 segundos (pesa demasiado)

---

### 2. Imagen de fallback del hero (poster del vídeo)

**¿Dónde aparece?** Se carga antes de que el vídeo empiece, y es lo que ve el usuario
en móvil si el vídeo no se reproduce.
**¿Qué debe mostrar?** El mejor frame del vídeo elegido en el punto anterior, o una imagen
estática similar.

🔧 **Cómo generarlo nosotros mismos:**
Una vez descargado el vídeo, extraemos un frame con este comando:
```
ffmpeg -i hero-video.mp4 -ss 00:00:03 -vframes 1 hero-poster.jpg
```
O simplemente hacemos una captura de pantalla del vídeo en el momento más bonito.

📁 **Nombre del archivo:** `hero-poster.webp` y `hero-poster.jpg`

⚠️ **Evitar:**
- Un frame borroso por movimiento rápido
- Un frame con poca luz o difícil de ver

---

### 3. Imagen para compartir en redes sociales (OG Image)

**¿Dónde aparece?** Cuando alguien comparte la URL de Vitrina Studio en WhatsApp,
LinkedIn, Twitter o iMessage — es la imagen que aparece en la previsualización del enlace.
**¿Qué debe mostrar?** El logo de Vitrina Studio sobre fondo oscuro, con el texto:
"Tu página web. Profesional. 19,90 €/mes."

🔧 **Cómo crearlo nosotros mismos:**
Lo diseñamos en Figma o Canva:
- Tamaño exacto: 1200 × 630 píxeles
- Fondo: #0F1923 (el azul oscuro de la marca)
- Logo centrado arriba
- Texto grande en blanco, precio en ámbar (#E8A020)
- Exportar como JPG, calidad 85

📁 **Nombre del archivo:** `og-image.jpg`
📂 **Dónde guardar:** `/public/og-image.jpg`

⚠️ **Evitar:**
- Fondo blanco o claro (no se ve en feeds oscuros)
- Demasiado texto pequeño (no se lee como miniatura)

---

### 4. Favicon (icono de la pestaña del navegador)

**¿Dónde aparece?** En la pestaña del navegador, en marcadores, y en la pantalla de
inicio si alguien guarda la web en su móvil.
**¿Qué debe mostrar?** La "V." del logo Vitrina en pequeño — solo la letra y el punto dorado.

🔧 **Cómo crearlo:**
Se genera automáticamente desde el archivo `brand_assets/logo_vitrina.svg` ya existente.
Usar realfavicongenerator.net — subir el SVG y descargar el paquete completo.

📁 **Nombres de archivo:**
- `favicon.svg` (principal)
- `apple-touch-icon.png` (180×180 — para iPhone)
- `icon-512.png` (512×512 — para Android/PWA)

---

## Capturas de pantalla del portfolio 🟡
*Las hacemos nosotros. Son importantes pero podemos publicar la web con placeholders de CSS primero.*

Una vez construidas las 6 webs de demostración (los sitios de ejemplo de clientes ficticios),
hacemos una captura de pantalla de cada una para usar en la sección de portfolio.

**Cómo hacerlas:**
1. Abrir la demo en el navegador a 1440px de ancho
2. Capturar la parte de arriba de la página (hero hasta primer scroll)
3. Recortar a 1200×800 píxeles (proporción 3:2)
4. Guardar como WebP con calidad 90

| Archivo | Demo a capturar |
|---|---|
| `portfolio-fontanero-madrid.webp` | Fontanería Martín · Madrid |
| `portfolio-yoga-valencia.webp` | Alma Yoga · Valencia |
| `portfolio-barberia-barcelona.webp` | Barbería El Corte · Barcelona |
| `portfolio-clinica-sevilla.webp` | Clínica Serena · Sevilla |
| `portfolio-academia-zaragoza.webp` | Academia Lumina · Zaragoza |
| `portfolio-restaurante-madrid.webp` | Casa Pepe · Madrid |

---

## Imágenes OPCIONALES 🟢
*Se pueden añadir después de publicar la web. No son necesarias para el lanzamiento.*

### Avatares de testimonios (3 fotos pequeñas)

Aparecen al lado de las citas de Antonio R., Marta L. y Pedro S. en la sección de testimonios.
Si no los tenemos, se muestran las iniciales en un círculo de color — también queda bien.

🔍 **Si queremos fotos reales:**
- Pexels.com — buscar: `"man portrait professional spain"` (para Antonio)
- Pexels.com — buscar: `"woman hairdresser portrait"` (para Marta)
- Pexels.com — buscar: `"man teacher portrait warm"` (para Pedro)

🔧 **Alternativa sin fotos (generador gratuito):**
- ui-avatars.com — genera iniciales estilizadas con los colores de la marca

| Archivo | Para |
|---|---|
| `avatar-antonio.webp` | Antonio R. · Fontanero · Sevilla |
| `avatar-marta.webp` | Marta L. · Peluquera · Bilbao |
| `avatar-pedro.webp` | Pedro S. · Academia de inglés · Zaragoza |

Tamaño: 96×96 px. Formato: WebP.

⚠️ **Evitar:**
- Fotos de banco claramente genéricas (sonrisa perfecta, fondo blanco de estudio)
- Fotos con ropa muy formal o logotipos visibles

---

## Resumen de prioridades

| # | Archivo | Cómo conseguirlo | Cuándo |
|---|---|---|---|
| 1 | `hero-video.mp4` + `.webm` | Descargar de Pexels (gratis) | Antes de publicar |
| 2 | `hero-poster.webp` + `.jpg` | Extraer frame del vídeo | Antes de publicar |
| 3 | `og-image.jpg` | Diseñar en Figma/Canva | Antes de publicar |
| 4 | `favicon.svg` + PNGs | Generar desde logo SVG | Antes de publicar |
| 5–10 | `portfolio-*.webp` (×6) | Captura de pantalla de las demos | Tras construir las demos |
| 11–13 | `avatar-*.webp` (×3) | Pexels o generador de avatares | Opcional, post-lanzamiento |

---

## Especificaciones técnicas

**Formatos preferidos:** WebP para todo (mejor compresión, mismo soporte).
Mantener JPG/MP4 como fallback.

**Resoluciones mínimas:**
- Vídeo hero: 1920×1080 (Full HD)
- Imagen hero fallback: 1920×1080
- OG image: 1200×630 exactos
- Portfolio cards: 1200×800 (ratio 3:2)
- Avatares: 96×96 px mínimo

**Tamaños máximos:**
- Vídeo MP4: 8MB
- Vídeo WebM: 6MB
- Cada imagen: 300KB (las optimizamos con Next.js Image automáticamente)
- OG image: 150KB

**¿Cómo comprimir vídeo?**
Herramienta gratuita: handbrake.fr
- Preset: Web → Fast 1080p30
- RF (calidad): 23
- Activar "Web Optimized" (faststart)

---

## Dónde guardar los archivos

Todos los archivos van en la carpeta `/public/` del proyecto Next.js.

```
/public/
  hero-video.mp4
  hero-video.webm
  hero-poster.webp
  hero-poster.jpg
  og-image.jpg
  favicon.svg
  apple-touch-icon.png
  icon-512.png
  portfolio-fontanero-madrid.webp
  portfolio-yoga-valencia.webp
  portfolio-barberia-barcelona.webp
  portfolio-clinica-sevilla.webp
  portfolio-academia-zaragoza.webp
  portfolio-restaurante-madrid.webp
  avatar-antonio.webp        (opcional)
  avatar-marta.webp          (opcional)
  avatar-pedro.webp          (opcional)
```

---

## Orden de acción recomendado

```
Semana 1 (antes de publicar):
  □ Buscar y descargar hero-video.mp4 de Pexels
  □ Extraer hero-poster.jpg del vídeo
  □ Convertir a WebM con ffmpeg o Handbrake
  □ Diseñar og-image.jpg en Figma
  □ Generar favicon desde logo SVG en realfavicongenerator.net
  □ Colocar todos en /public/ y verificar que cargan

Tras construir las demos de clientes:
  □ Capturar screenshots de las 6 webs demo
  □ Recortar a 1200×800 y exportar a WebP
  □ Reemplazar placeholders CSS del portfolio

Post-lanzamiento (opcional):
  □ Añadir avatares de testimonios si se decide usar fotos reales
```
