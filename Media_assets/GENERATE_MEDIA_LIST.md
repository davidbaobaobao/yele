# GENERATE_MEDIA_LIST.md
# Run this file once per new project in Claude Code:
# > Read GENERATE_MEDIA_LIST.md and execute all instructions exactly.

---

## YOUR TASK

Analyse this project's BUILD.md and brand_assets/ to produce two outputs:

1. `media_assets/MEDIA_LIST.md` — complete list of every image/video needed,
   with exact specs, composition brief, and visual direction for each asset

2. `media_assets/MEDIA_BRIEF.md` — a clean client-facing document they can
   hand to a photographer, or use to search stock photo libraries themselves

Execute completely without stopping for input.
If BUILD.md does not exist, stop and say: "Add BUILD.md first."

---

## STEP 1 — ANALYSE THE PROJECT

Read BUILD.md completely. Extract:

```
CLIENT NAME:
INDUSTRY:
PAGE STRUCTURE:    which pages exist (home, services, about, contact, etc.)
SECTIONS:          list every section on every page
PERSONALITY:       adjectives (warm/bold/clinical/adventurous/etc.)
TARGET AUDIENCE:   who visits this site
COLOR TEMP:        warm / cool / neutral (from brand.md if exists)
HAS VIDEO:         yes/no based on whether motion/animation sections exist
BUDGET SIGNAL:     solo professional / small team / established business
```

Before writing any output, state your analysis:
```
Pages found: [list]
Sections found: [list every section]
Industry category: [exact category]
Visual style: [one sentence committing to the aesthetic]
Motion assets needed: [yes/no and why]
Estimated total assets: [number]
```

---

## STEP 2 — DETERMINE MEDIA CATEGORIES FOR THIS PROJECT

Based on industry, map which media categories apply.
Not every category applies to every project — only include what is relevant.

### Category Map by Industry

**Sport / Outdoor Instructor (snowboard, surf, climbing, ski, yoga)**
```
✓ Hero — cinematic action (primary WOW moment)
✓ Action sequence — motion/scroll animation frames
✓ Instructor portrait — full body + face
✓ Student moment — learning/achievement
✓ Location/environment — mountain, slope, water, gym
✓ Detail/texture — equipment, snow, board, rope
✗ Food photography — not applicable
✗ Interior space — not applicable
```

**Restaurant / Bar / Café / Tapas**
```
✓ Hero — atmospheric interior or signature dish
✓ Food hero — 2-3 signature dishes, overhead or 45°
✓ Interior — full room, empty (inviting, editorial)
✓ Detail — ingredients, texture, glassware, hands
✓ Team/chef — at work, candid
✓ Atmosphere — evening light, customers (blurred)
✗ Action sequence — not applicable
✗ Equipment detail — not applicable
```

**Health / Clinic / Physiotherapy / Dentist**
```
✓ Hero — professional portrait of practitioner
✓ Space — treatment room, clean, calm
✓ Trust signal — certificate/diploma display, equipment
✓ Patient moment — consultation (models, no real patients)
✓ Detail — hands at work, professional tools
✗ Action photography — not applicable
✗ Food photography — not applicable
```

**Beauty / Peluquería / Barbería / Spa**
```
✓ Hero — dramatic result shot (hair, skin, nails)
✓ Before/after — pair of transformation shots
✓ Stylist portrait — working, candid
✓ Space — salon interior, tools, atmosphere
✓ Detail — product, texture, technique closeup
✓ Client satisfaction — genuine reaction shot
```

**Trade / Fontanero / Electricista / Carpintero**
```
✓ Hero — professional at work on a real job
✓ Trust portrait — direct eye contact, professional attire
✓ Work in progress — hands on tools, mid-task
✓ Result/before-after — problem solved
✓ Vehicle/equipment — branded van, professional kit
✗ Atmospheric/mood — not relevant
✗ Food/beauty — not applicable
```

**Fitness / Personal Trainer / Gym**
```
✓ Hero — powerful action or result
✓ Trainer portrait — authoritative, energetic
✓ Training moment — client working with trainer
✓ Space — gym/studio environment
✓ Body/transformation — tasteful result imagery
✓ Detail — weights, equipment, form
```

**General SME / Shop / Service Business**
```
✓ Hero — best product or service in use
✓ Business owner portrait — warm, approachable
✓ Product/service detail — close, well-lit
✓ Space — shopfront or workspace
✓ Customer moment — interaction, satisfaction
```

---

## STEP 3 — MAP EVERY ASSET TO ITS SECTION

For each section found in BUILD.md, specify every media asset required.
Use this structure for each asset:

```
ASSET ID:        [category]-[number] e.g. hero-01, action-02, portrait-01
SECTION:         which page section uses this asset
USAGE:           hero background / card image / floating element /
                 scroll animation frame / profile photo / thumbnail
FORMAT:          photo / video / gif / lottie / css animation
DIMENSIONS:      exact pixel dimensions or aspect ratio
QUALITY:         web (72dpi) / retina (144dpi) / print (300dpi)
FILE FORMAT:     JPG / PNG / WebP / MP4 / WebM / SVG
```

Then give the **visual brief** for each asset — this is the most important part.
Be specific enough that a photographer or stock photo researcher knows
exactly what to find or shoot.

---

## STEP 4 — WRITE THE COMPLETE MEDIA LIST

Create `media_assets/MEDIA_LIST.md` with this structure:

```markdown
# Media Asset List — [CLIENT NAME]
# Generated: [DATE]
# Total assets required: [N]
# Estimated photography session: [X hours] or [Stock only / Mixed]

---

## SUMMARY TABLE

| ID | Section | Format | Dimensions | Priority | Source |
|---|---|---|---|---|---|
| hero-01 | Homepage hero | Photo/Video | 1920×1080 | 🔴 Critical | Shoot/Stock |
| ... | ... | ... | ... | ... | ... |

Priority legend:
🔴 Critical — site cannot launch without this
🟡 Important — significantly impacts quality
🟢 Optional — nice to have, can use placeholder initially

Source legend:
Shoot — must be original photography/video
Stock — high quality stock acceptable
Placeholder — temporary, replace post-launch

---

## DETAILED ASSET BRIEFS

### [SECTION NAME]
---

#### [ASSET ID] — [short description]
```
Section:     [section name]
Usage:       [how it appears on the page]
Format:      [Photo / Video / Animation]
Dimensions:  [W×H px] or [aspect ratio]
File format: [JPG/PNG/WebP/MP4]
Priority:    [🔴/🟡/🟢]
Source:      [Shoot / Stock / Placeholder]
```

**Visual Brief:**
[2-4 sentences describing exactly what this image should look like.
Camera angle, subject position, lighting, mood, what's in frame,
what's NOT in frame, what emotion it should evoke.]

**Technical Notes:**
[Focal length suggestion, depth of field, time of day if relevant,
any post-processing direction — warm grade / desaturate / high contrast]

**Stock Search Terms (if stock acceptable):**
[3-5 specific search terms for Unsplash, Pexels, or paid stock]

**What to AVOID:**
[specific things that would make this image wrong for the brand]

---
```

---

## STEP 5 — WRITE THE CLIENT-FACING BRIEF

Create `media_assets/MEDIA_BRIEF.md` — this is what you send to the client.
Plain language, no technical jargon, actionable.

```markdown
# Guía de Fotografías — [CLIENT NAME]
# Para: [client name]
# Preparado por: [your company name]
# Fecha: [DATE]

---

## Introducción

Para completar tu página web necesitamos [N] fotografías/vídeos.
Este documento explica exactamente qué necesitamos y cómo conseguirlo.

Tienes dos opciones para cada imagen:
**Opción A — Fotografía propia:** Te damos las instrucciones exactas
para que un fotógrafo (o tú mismo con un smartphone moderno) las haga.
**Opción B — Fotografía de archivo:** Te damos los términos de búsqueda
exactos para sitios gratuitos como Unsplash o Pexels.

---

## Imágenes IMPRESCINDIBLES 🔴
*Sin estas imágenes no podemos publicar la web.*

[For each critical asset:]

### [N]. [Descriptive name in Spanish]

**¿Dónde aparece?** [Section name in plain Spanish]
**¿Qué debe mostrar?** [Plain Spanish description a non-photographer understands]

📸 **Si la haces tú:**
- [Instruction 1 — where to stand, what angle]
- [Instruction 2 — time of day, lighting]
- [Instruction 3 — what to include/exclude]
- [Smartphone tip if relevant]

🔍 **Si usas fotografía de archivo:**
- Unsplash.com — buscar: "[search term]"
- Pexels.com — buscar: "[search term]"
- Elegir imágenes con licencia gratuita (marcadas como "Free to use")

⚠️ **Evitar:**
- [specific thing that would look wrong]
- [another thing to avoid]

---

## Imágenes IMPORTANTES 🟡
*Mejoran significativamente el resultado final.*

[Same structure, briefer descriptions]

---

## Imágenes OPCIONALES 🟢
*Se pueden añadir después de publicar la web.*

[Same structure, very brief]

---

## Especificaciones técnicas

**Resolución mínima:** 1920px de ancho para imágenes de fondo
**Resolución mínima:** 800px de ancho para imágenes de sección
**Formato:** JPG o PNG preferiblemente
**Tamaño máximo:** 5MB por archivo (los comprimiremos nosotros)

**¿Tienes un iPhone o Android moderno?**
Cualquier smartphone de los últimos 3 años toma fotos con la resolución suficiente.
Usa el modo retrato para fotos de personas, modo normal para espacios y acción.

---

## Cómo enviarnos las imágenes

Opción 1: Google Drive o Dropbox — comparte la carpeta con [your email]
Opción 2: WeTransfer.com — envía a [your email]
Opción 3: WhatsApp — solo para imágenes de baja prioridad

**Nombra los archivos así:**
hero-principal.jpg / retrato-instructor.jpg / accion-01.jpg

---

## Plazos

Para publicar tu web en el plazo acordado necesitamos las imágenes
imprescindibles antes de: [DATE — 3 business days before launch]

Las imágenes importantes y opcionales las podemos añadir después del lanzamiento.

```

---

## STEP 6 — ANIMATION AND MOTION ASSET SPECIFICATION

If the project includes scroll animations, hero videos, or motion elements,
add a dedicated motion section to MEDIA_LIST.md:

```markdown
---

## MOTION ASSETS

### Understanding motion asset types

**Type 1 — Hero background video**
Autoplay, muted, looped video behind the hero text.
Duration: 8-15 seconds. Format: MP4 + WebM fallback.
Style: slow motion preferred (60-120fps shot, slowed to 24fps)
File size: under 8MB compressed with HandBrake or ffmpeg

**Type 2 — Scroll-triggered animation**
Image or video that plays/reveals as user scrolls down.
Can be: CSS animation on a photo, parallax image, or short clip.
Technical approach: intersection observer + CSS transform

**Type 3 — Lottie animation**
Lightweight JSON animation. Best for: icons, illustrations, loaders.
Source: LottieFiles.com — search for relevant free animations
No custom video production needed.

**Type 4 — CSS-only animation**
Pure code animation — no media file needed.
Best for: subtle background effects, particle systems, geometric shapes.
The developer handles this — no photography/video needed.
```

For each motion asset, specify:

```
MOTION ID:       motion-[number]
TYPE:            hero-video / scroll-trigger / lottie / css-only
SECTION:         where it appears
DURATION:        [N] seconds
LOOP:            yes / no
CONTENT:         what should be shown in motion
MOOD:            cinematic / energetic / calm / dramatic
FILE FORMAT:     MP4+WebM / Lottie JSON / CSS
FILE SIZE MAX:   [N]MB
PRIORITY:        🔴/🟡/🟢
FALLBACK:        what shows if video/animation fails to load
```

---

## STEP 7 — SNOWBOARD INSTRUCTOR EXAMPLE

If BUILD.md identifies this as a snowboard/ski/snow sport instructor project,
apply these specific asset specifications:

```
HERO VIDEO (motion-01) — 🔴 Critical
Type: hero-video or CSS animation overlay on photo
Content: Professional snowboarder performing a trick — frontside 360,
         method grab, or carving turn. Full body in frame.
         Mountain backdrop, bright snow, clear sky preferred.
         Slow motion: 120fps slowed to 24fps = 5x slow motion effect.
Duration: 10-12 seconds, seamless loop
Mood: cinematic, powerful, awe-inspiring
Shot angle: slightly low, looking up at rider — heroic perspective
Lighting: golden hour (morning or late afternoon) — warm light on snow
Fallback: static photo of same content with CSS parallax
Stock: Pexels "snowboard trick slow motion" / "snowboard mountain aerial"
AVOID: helmet-cam POV, group shots, chairlift, après-ski social scenes

ACTION SCROLL SEQUENCE (action-01 through action-05) — 🟡 Important
5 photos that show progressive snowboard action
Used as: scroll-triggered reveals, section backgrounds, floating cards
Content:
  action-01: Wide mountain landscape, fresh powder, no people
  action-02: Instructor carving a sharp turn, spray of snow
  action-03: Student learning — instructor beside them on slope
  action-04: Close detail — board edge on snow, boots, bindings
  action-05: Celebration moment — student after first successful run
Shot style: editorial, slightly desaturated, high contrast
Aspect ratios: mix of 16:9 landscape and 3:4 portrait

INSTRUCTOR PORTRAIT FULL BODY (portrait-01) — 🔴 Critical
Subject: the instructor themselves
Pose: standing on slope or at base, board in hand or under arm,
      facing camera with confidence, slight 3/4 angle
Clothing: professional instructor gear, branded if possible
Background: mountain/slope, slightly out of focus
Expression: confident, approachable, professional — NOT posed smile
Shot: full body including board, 3:4 portrait orientation
Lighting: natural mountain light, avoid harsh midday sun

INSTRUCTOR PORTRAIT FACE (portrait-02) — 🔴 Critical
Same session as portrait-01
Shot: chest up, looking directly at camera
Expression: warm, trustworthy, expert
Use: about section, testimonial attribution, WhatsApp-style contact card
Crop: tight, face fills 50% of frame
Background: blurred mountain or clean neutral

INSTRUCTOR IN ACTION WITH STUDENT (teaching-01) — 🟡 Important
Content: instructor demonstrating technique to a student on gentle slope
Both subjects visible, instructor pointing or adjusting student's position
Mood: patient, expert, collaborative
This is the most important "trust" image — shows teaching ability directly

LOCATION ATMOSPHERE (location-01) — 🟢 Optional
Mountain panorama, ski resort, or powder field
No people — pure environment
Used as: section divider background, parallax layer
Shot in: golden hour light, high contrast sky
```

---

## STEP 8 — STOCK PHOTO GUIDANCE

For assets marked "Stock acceptable", provide curated search guidance:

```markdown
## Stock Photo Sources & Search Guide

### Free sources (recommend first)
- **Unsplash.com** — best quality, completely free, commercial use allowed
- **Pexels.com** — large library, free commercial use
- **Pixabay.com** — large library, check license per image

### Paid sources (if budget allows)
- **Adobe Stock** — highest quality, subscription or per-image
- **Shutterstock** — large library, subscription model
- **Getty Images** — premium sports/action photography

### Search strategy for best results
1. Search in English — stock libraries are indexed in English
2. Use specific terms: "snowboard trick mountain slow motion"
   NOT generic: "winter sports"
3. Filter by: Horizontal orientation for hero/backgrounds
               Vertical/Portrait for person shots
4. Avoid: images with visible brand logos (licensing issue)
          images with recognizable faces unless Rights Managed
          overly staged / obviously stock-looking compositions

### Image treatment to unify mixed stock sources
When mixing stock photos from different sources, apply consistent treatment:
- Overlay: `background: linear-gradient(to bottom, transparent 40%, rgba(DARK,0.7))`
- Color grade: slight desaturation (90% saturation) + brand color tint (multiply blend)
- This makes different photos feel like one cohesive shoot
```

---

## STEP 9 — FINAL OUTPUT CHECKLIST

Before completing, verify:

```
□ Every page section from BUILD.md has at least one media asset specified
□ Every asset has dimensions, format, priority, and visual brief
□ Critical assets are clearly marked 🔴
□ Stock search terms provided for all non-critical assets
□ Motion assets have fallback specified
□ MEDIA_BRIEF.md is in plain Spanish, no technical jargon
□ Client instructions are actionable (not "take a good photo")
□ File naming convention is defined
□ Submission deadline placeholder is included
```

---

## COMPLETION REPORT

When done, report:

```
✓ MEDIA_LIST.md    →  media_assets/MEDIA_LIST.md
✓ MEDIA_BRIEF.md   →  media_assets/MEDIA_BRIEF.md

Asset summary:
  🔴 Critical:   [N] assets — [list names briefly]
  🟡 Important:  [N] assets
  🟢 Optional:   [N] assets
  Total:         [N] assets

Motion assets: [N] — [types]
Photography session estimate: [X hours / stock only / mixed]

Client can proceed with stock photos for [N] assets.
[N] assets require original photography/video.

Send MEDIA_BRIEF.md to client to begin asset collection.
```
