# CLAUDE.md — Spanish SME Website Generator
# Vitrina Studio · v3.0 · Marzo 2026

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- **Read BUILD.md** before writing a single line of code. Every client brief lives there.
  If BUILD.md does not exist, stop and ask for it.
- **Read `brand_assets/brand.md`** for all color tokens, font names, and brand values.
  If brand.md does not exist, use DEFAULT_PALETTE (see Colors section) and mark with TODO.
- **Check `brand_assets/`** for logos, photos, and any uploaded assets.
  Use them. Do not use placeholders where real assets are available.

---

## Studio Identity — Vitrina Studio

This is Vitrina Studio's operational brain. Every client site must reflect the quality
standard that Vitrina's own brand represents: Japanese-inspired minimalism, quiet
authority, craft over noise.

**Vitrina brand reference:**
- `brand_assets/brand_sheet.png` — visual reference (1200×850px)
- `brand_assets/brand.md` — complete design token system
- `brand_assets/logo_vitrina.svg` — typographic logo

**Vitrina's four design principles (apply to all work):**
```
Ma      — Negative space. Silence around every element is intentional.
Wabi    — Austere beauty. Removing is designing. Less is the decision.
Shibui  — Subtle elegance. Noticed on second look, never the first.
Seijaku — Active tranquility. The design calms — never pressures.
```

The quality bar: show the finished site to someone who doesn't know it was AI-generated.
If they assume it cost €2,000 from a design agency, the bar has been met.

---

## Per-Project Design Dials

Before writing any code, derive these three values from BUILD.md personality
and industry. State them out loud. They govern every design decision below.

```
DESIGN_VARIANCE   1–10   How experimental the layout is
                         1–3: Perfect symmetry, predictable grids
                         4–6: Modern but structured
                         7–9: Asymmetric, overlapping, grid-breaking
                         10:  Artsy chaos — only for creative/art brands

MOTION_INTENSITY  1–10   How much animation there is
                         1–3: Static or subtle hover only
                         4–6: Scroll reveals, standard transitions
                         7–9: Magnetic interactions, cinematic scrolltelling
                         10:  Full WebGL / physics-based — rare

VISUAL_DENSITY    1–10   How much content fits on one screen
                         1–3: Gallery airy — luxury, one element at a time
                         4–6: Normal spacing — typical website
                         7–10: Dense — dashboards, data-heavy (rare for SME)
```

**Default values by industry:**
```
Sport / Adventure instructor:    VARIANCE:7  MOTION:8  DENSITY:3
Restaurant / Bar:                VARIANCE:5  MOTION:4  DENSITY:4
Clinic / Health:                 VARIANCE:3  MOTION:2  DENSITY:4
Beauty / Salon:                  VARIANCE:6  MOTION:4  DENSITY:3
Trade / Fontanero:               VARIANCE:3  MOTION:2  DENSITY:5
General SME:                     VARIANCE:4  MOTION:3  DENSITY:4
```

Override defaults with BUILD.md personality if they conflict.
State the three values at the start of every session:
"VARIANCE:7 / MOTION:8 / DENSITY:3 — committing to dark cinematic aesthetic"

---

## Project Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS — but never default palette colors (see Anti-Generic Guardrails)
- **Fonts**: Google Fonts — loaded via next/font. Never system fonts.
- **Images**: next/image with proper alt text in Spanish
- **Dev server**: `npm run dev` at `http://localhost:3000`
- **Deploy**: Vercel (`vercel deploy`)
- **Language**: Spanish everywhere. No English in UI, copy, labels, or meta tags.

---

## BUILD.md Contract
BUILD.md is the single source of truth for each client. It contains:
- Business identity and real contact details
- Brand personality and visual direction
- All real content (services, prices, hours, testimonials)
- Reference component styles from 21st.dev
- Anti-patterns specific to this client

**If real content exists in BUILD.md, use it.**
**Never use Lorem ipsum, placeholder names, or invented services in production builds.**
**Never use "Your Business Name" or "Add your text here" in any output.**

---

## Reference Components (21st.dev)
Reference components live in `/reference-components/`. These are curated from 21st.dev
by a human designer and represent the quality and style benchmark for this project.

- Use them as **style and quality inspiration** — not pixel-perfect copies
- Adapt their structure, spacing, and aesthetic to the client's brand
- Honour their level of craft: if a reference uses layered shadows and subtle animations,
  the output must match that level of refinement
- Never produce something simpler than the reference component

---

## Screenshot & Review Workflow
After building each section, take a screenshot for comparison review.

- Always serve from localhost — never screenshot a `file:///` URL
- Start dev server: `npm run dev`
- Take screenshot of `http://localhost:3000`
- Review the screenshot against BUILD.md requirements
- Check mobile at 390px width (iPhone viewport) — use Chrome DevTools device toolbar
- Do at least **2 review rounds** per section before moving to the next
- Be specific when reporting mismatches: "headline font weight is 400 but should be 700",
  "CTA button is 36px height but needs 48px minimum for touch targets"

**Review checklist per section:**
```
□ Content matches BUILD.md exactly (real business name, phone, hours, services)
□ Colors match brand palette from brand.md (check exact hex values)
□ Font pairing is applied correctly (display font for headlines, clean font for body)
□ Mobile layout correct at 390px — no overflow, no tiny text
□ CTA buttons are minimum 48px height, full-width on mobile
□ All text is in Spanish
□ No placeholder content anywhere
□ Interactive states exist on all clickable elements
□ Images have descriptive alt text in Spanish
□ Glassmorphism (if used) follows the approved rules below
```

---

## Language Rules — Spanish Everywhere
All user-facing text must be in Spanish. No exceptions.

**UI elements:**
- Buttons: "Llámanos", "Contáctanos", "Ver más", "Reservar", "Enviar mensaje", "Solicitar presupuesto"
- Navigation: "Inicio", "Servicios", "Sobre nosotros", "Contacto", "Galería"
- Forms: "Nombre", "Teléfono", "Mensaje", "Enviar"
- Footer: "Todos los derechos reservados", "Política de privacidad", "Aviso legal"
- Error messages: "Campo obligatorio", "Email no válido"

**SEO meta tags — always in Spanish:**
```html
<title>[Nombre negocio] | [Servicio principal] en [Ciudad]</title>
<meta name="description" content="[2 sentences in Spanish about the business]" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
```

**Alt text on all images — in Spanish:**
```html
<Image alt="Interior del restaurante Casa Pepe en Valencia" ... />
<Image alt="Sara García, instructora de snowboard certificada en Sierra Nevada" ... />
```

**Legal requirements (Spanish law):**
Every site must include in the footer:
- Link to "Política de privacidad" (RGPD compliance)
- Link to "Aviso legal" (business identity: name, CIF, registered address)
- Cookie consent if analytics are used

---

## Industry Aesthetics — Per Vertical Rules

Each industry has a distinct personality. Claude must commit to the correct aesthetic
before writing code. Do not apply a generic "clean modern" style across all verticals.

### Restaurantes / Bares / Tapas
```
Personality:  warm, inviting, sensory, local, authentic
Color temp:   warm — terracottas, creams, deep burgundies, olive greens
Typography:   bold serif or slab serif for headlines (Playfair Display, Lora, Fraunces)
              readable humanist sans for body (Source Sans, Nunito)
Layout:       full-bleed food photography, generous whitespace, editorial feel
Hero:         large atmospheric food/interior photo, warm overlay, centered bold headline
Avoid:        cold blues, corporate sans-serif, flat white backgrounds, grid-heavy layouts
```

### Instructores de Deportes (Snow, Surf, Climbing)
```
Personality:  energetic, adventurous, technical, personal, trustworthy
Color temp:   depends on sport — snow: icy blues + sharp whites + electric accent
              surf: ocean blues + sandy warm tones
              mountain: slate greys + alpine greens + orange accent
Typography:   strong condensed or extended sans for headlines (Barlow Condensed, Oswald,
              Anton) — conveys power and movement
              clean legible sans for body (DM Sans, Plus Jakarta Sans)
Layout:       dynamic — diagonal elements, overlapping sections, bold type over imagery
Hero:         full-bleed action shot, overlaid bold condensed type, high contrast
Avoid:        delicate serif fonts, pastel palettes, static centered layouts,
              corporate stock photos
```

### Clínicas / Fisioterapia / Salud
```
Personality:  trustworthy, calm, professional, caring, expert
Color temp:   cool — clean whites, soft blues, sage greens, light greys
Typography:   clean geometric sans for headlines (DM Sans, Outfit, Jost)
              highly readable body (Inter is acceptable HERE ONLY — clarity over character)
Layout:       structured, lots of whitespace, clear hierarchy, reassuring
Hero:         clean studio portrait of the professional, or calm abstract background
Avoid:        flashy animations, dark themes, loud colors, overly casual tone
```

### Peluquerías / Barberías / Estética
```
Personality:  stylish, personal, modern or retro (depends on brand), local
Color temp:   varies widely — read BUILD.md carefully
              Modern salon: black + white + gold accent
              Barber retro: deep greens + cream + burgundy
              Trendy: bold monochrome or unexpected color pop
Typography:   editorial — high contrast between display and body
              (Bebas Neue, Cormorant, Canela for display — depends on direction)
Layout:       strong visual identity, portfolio-forward, before/after gallery
Hero:         dramatic portrait photography, strong typography overlay
Avoid:        generic spa aesthetics, purple + white (overused in this sector)
```

### Fontaneros / Electricistas / Oficios
```
Personality:  reliable, professional, fast, local, no-nonsense
Color temp:   trustworthy — navy blues, clean whites, safety orange or yellow accent
Typography:   strong, clear, legible sans — not trendy (Roboto Condensed acceptable,
              or better: Exo 2, Rajdhani for character with clarity)
Layout:       direct and clear — services front and center, phone number massive,
              trust signals prominent (years experience, certifications, coverage area)
Hero:         professional photo of the tradesperson at work, or clean graphic
              with giant phone number CTA
Avoid:        overly designed layouts that feel untrustworthy, dark moody themes,
              anything that feels like a tech startup
```

---

## Anti-Generic Guardrails (Non-Negotiable)
These rules prevent AI-default aesthetics. Every rule applies to every project.

**Colors — brand.md is the single source of truth:**

Color palette ALWAYS comes from `brand_assets/brand.md`.
Read it before touching any color in any file.
Never invent colors. Never use Tailwind defaults as brand colors.

```
Priority order for color source:
1. brand_assets/brand.md   → ALWAYS use this when it exists
2. BUILD.md color direction → if brand.md not yet generated
3. DEFAULT_PALETTE below    → only if neither exists yet
```

**Token rule — mandatory:**
Never write raw hex values inside components. Always use CSS variables:
```css
/* WRONG — never do this in components */
background: #C4622D;
color: #2C1810;

/* CORRECT — always reference tokens */
background: var(--color-primary);
color: var(--color-dark);
```
Define all tokens once in `tailwind.config.js` from brand.md values.
Change the token once → updates everywhere. No hex hunting.

**Semantic token naming — use these names in every project:**
```css
:root {
  --color-primary:    [from brand.md]   /* main brand color */
  --color-secondary:  [from brand.md]   /* supporting color */
  --color-accent:     [from brand.md]   /* CTAs, highlights */
  --color-dark:       [from brand.md]   /* headlines, dark bg */
  --color-light:      [from brand.md]   /* backgrounds, cards */
  --color-neutral:    [from brand.md]   /* borders, dividers */
}
```

**DEFAULT_PALETTE — use only when brand.md does not exist yet:**
```css
/* Temporary professional neutral — replace when brand.md is generated */
--color-primary:    #1A1F36;   /* deep navy */
--color-secondary:  #2D3561;   /* medium navy */
--color-accent:     #0066FF;   /* electric blue */
--color-dark:       #0D1017;   /* near black */
--color-light:      #F4F6FA;   /* cool near white */
--color-neutral:    #CBD5E1;   /* slate grey */
```
Mark any file using DEFAULT_PALETTE with: `/* TODO: replace with brand.md tokens */`

**Dark mode:**
Design light and dark variants together. Dark mode uses desaturated/lighter
tonal variants — never inverted colors. Test contrast separately in both modes.

**Shadows:**
- Never use flat `shadow-md` or `shadow-lg` as the only shadow
- Shadows must be color-tinted to the brand palette — not generic black:
  ```css
  /* Wrong — generic black shadow */
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);

  /* Correct — tinted to brand primary */
  box-shadow: 0 1px 2px rgba(PRIMARY_RGB, 0.04),
              0 4px 12px rgba(DARK_RGB, 0.06),
              0 12px 32px rgba(PRIMARY_RGB, 0.08);
  ```
- Replace DARK_RGB and PRIMARY_RGB with actual brand color RGB values from brand.md
- A terracotta brand casts terracotta-tinted shadows — not grey ones

**Typography:**
- Never use the same font for headings and body text
- Always pair: one distinctive display/serif font + one clean readable sans
- Apply tight tracking (`-0.03em` to `-0.05em`) on large headings
- Apply generous line-height (`1.7` to `1.8`) on body text
- Minimum body font size: 17px — never smaller for body copy
- Forbidden fonts for headlines: Inter, Roboto, Arial, system-ui, sans-serif generic

**Gradients:**
- Layer multiple radial gradients for depth — not single linear washes
- Add grain/texture via SVG noise filter for organic atmosphere:
  ```css
  /* Grain overlay — add as pseudo-element */
  background-image: url("data:image/svg+xml,...");
  opacity: 0.03;
  ```

**Glassmorphism — approved usage rules:**
Glass effects are an approved technique for dark hero sections and photography backgrounds.
They are BANNED on flat washi/light surfaces and banned with neon/tech-adjacent colors.

```
APPROVED — dark background (ink #141410 or photography):
  background:   rgba(20, 20, 16, 0.35)       ← ink-tinted, never white-tinted
  border:       0.5px solid rgba(196, 169, 106, 0.25)  ← kintsugi gold edge
  backdrop-filter: blur(12px)
  border-radius: var(--radius-sm)             ← 1–3px, never large round corners

APPROVED — sticky nav over hero photography:
  Same recipe above. Gold border glows against dark. On-brand, refined.

CONDITIONALLY OK — light surface with texture/photo behind it:
  background:   rgba(255, 255, 255, 0.55)
  border:       0.5px solid rgba(200, 196, 184, 0.5)
  Only when there is a rich texture or photograph behind the glass panel.
  Never on a flat washi (#F4F1EA) background — effect disappears.

BANNED — neon/tech glass (destroys Vitrina positioning):
  Never use: rgba(150, 100, 255, ...) backgrounds
  Never use: glowing borders in blue, purple, or teal
  Never use: glass on plain white or near-white without a background image
  Never use: glass effects on more than 3 elements per page — use sparingly

PERFORMANCE:
  backdrop-filter is GPU-accelerated but heavy on mobile.
  Only apply to elements that are ≤30% of the viewport height.
  Always provide a fallback for browsers without backdrop-filter support:
  @supports not (backdrop-filter: blur(1px)) {
    background: rgba(20, 20, 16, 0.85);  ← opaque fallback
  }
```

**Animations:**
- Only animate `transform` and `opacity` — never `transition-all`
- When MOTION_INTENSITY ≥ 5: use spring physics on ALL interactive elements:
  ```js
  // Framer Motion — spring easing
  transition={{ type: "spring", stiffness: 80, damping: 18 }}
  ```
- When MOTION_INTENSITY < 5: use simple ease: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- One orchestrated page load with staggered reveals per page
- Micro-interactions: 150–300ms
- Complex transitions: ≤400ms — never exceed 500ms
- Exit animations: 60–70% of enter duration (feels more responsive)
- Stagger list/grid items: 30–50ms per item:
  ```css
  animation-delay: calc(var(--index) * 40ms);
  ```
- Easing: ease-out for entering elements, ease-in for exiting
- Scroll-triggered reveals: `translateY(16px) + opacity:0` resolving over 600ms
  with `cubic-bezier(0.16, 1, 0.3, 1)`. Use IntersectionObserver — never window scroll listener.
- Scroll-driven clip-path reveals for cinematic sections (when MOTION_INTENSITY ≥ 7):
  ```css
  clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)
  transition: clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1)
  ```
- Magnetic buttons (when MOTION_INTENSITY ≥ 6):
  CRITICAL — NEVER use React useState for magnetic hover.
  Use EXCLUSIVELY Framer Motion useMotionValue + useTransform outside render cycle:
  ```js
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  // update in onMouseMove handler — NOT setState
  ```
- Background ambient motion: slow radial gradient blob
  (animation-duration: 20s+, opacity: 0.02–0.04, position:fixed, pointer-events:none)

**Animation library separation — CRITICAL:**
```
Framer Motion     → UI interactions, page transitions, scroll reveals,
                    hover states, shared element transitions, bento layouts
GSAP/ScrollTrigger → full-page scrolltelling, canvas scroll sequences,
                     complex timeline orchestration, 3D scroll effects
ThreeJS/WebGL     → canvas backgrounds, 3D scenes, particle systems

NEVER mix GSAP/ThreeJS with Framer Motion in the same component tree.
When using GSAP or ThreeJS: wrap in useEffect with strict cleanup.
```

**Interactive States:**
Every clickable element needs all four states — no exceptions:
```css
.cta-button { /* default */ }
.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: [enhanced shadow];
}
.cta-button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
.cta-button:active { transform: translateY(0px); }
```

**Images:**
- Add gradient overlay on hero images: `bg-gradient-to-t from-black/60 via-transparent`
- Add color treatment layer with `mix-blend-multiply` for brand cohesion
- Always use `next/image` — never raw `<img>` tags
- Always include descriptive Spanish alt text

**Spacing:**
- Define spacing tokens in Tailwind config — not random utility class combinations
- Consistent section padding: `py-16 md:py-24 lg:py-32`
- Never mix spacing units randomly

**Hero Layout — Anti-Center Bias:**
When DESIGN_VARIANCE > 4, centered hero sections are strictly banned.
Use one of these layouts instead:
```
Split Screen:     50/50 — text left, image/video right (or reversed)
Left Aligned:     text left-aligned, asset floats right with overlap
Asymmetric:       text takes 60%, visual takes 40% with generous negative space
Diagonal:         text block at angle, or image crops diagonally into text zone
```
Stop doing centered text over a dark image. It is the most recognizable
AI output pattern and makes every site look generated.
Exception: DESIGN_VARIANCE ≤ 4 (clinics, trades) — centered is acceptable.

**Component State Completeness:**
Every interactive component must implement ALL states — not just the success state.

```
Loading state:   Skeletal loaders matching exact layout shape
                 DO NOT use generic circular spinners
                 Use: div with animate-pulse matching element dimensions

Empty state:     Beautifully composed — shows how to populate the data
                 Include a call-to-action within the empty state

Error state:     Friendly Spanish message + recovery action
                 Never show raw error strings to users

Hover state:     Every clickable element — no exceptions

Disabled state:  Visually distinct — opacity 0.5 + cursor not-allowed
                 DO NOT just remove the onClick handler
```

**Depth System:**
```
Base layer:   page background, section backgrounds        z-index: 0
Elevated:     cards, panels, form elements                z-index: 10
Floating:     modals, dropdowns, tooltips, sticky nav     z-index: 20–40
Modal:        modal dialogs, sheets                       z-index: 100
Toast:        notification toasts, alerts                 z-index: 1000
```
No two cards should sit at exactly the same visual depth.
Never assign arbitrary z-index values outside this scale.

**Accessibility — Priority 1 (CRITICAL):**
```
Contrast:       4.5:1 minimum for normal text, 3:1 for large text
                Glass elements must still pass — test text on blurred bg
Alt text:       Every image — descriptive, in Spanish, never "image of..."
Focus rings:    Visible on every interactive element — 2px solid var(--color-accent)
                NEVER remove focus rings — keyboard users depend on them
Keyboard nav:   Tab order matches visual order
Aria labels:    Every icon-only button needs aria-label in Spanish
Skip links:     Add "Saltar al contenido principal" as first focusable element
Heading order:  h1 → h2 → h3 — never skip levels
Color not only: Never convey information by color alone — add icon or text
Form labels:    Every input has a visible <label> — never placeholder-only
```

**Form UX Rules:**
```
Validation:      Validate on blur — not on every keystroke
Error messages:  Place error directly below the field
                 Must state cause + recovery: "Email inválido — comprueba que incluye @"
Input types:     type="email" / type="tel" / type="number" / type="date"
Required fields: Mark with * and explain: "* Campos obligatorios"
Password:        Always include show/hide toggle
Multi-step:      Show step indicator (Paso 1 de 3) and allow going back
Primary CTA:     One primary CTA per section
                 Exception: homepage hero may have phone + WhatsApp as dual CTAs
```

---

## Hard Rules — Never Break These

```
DO NOT use transition-all — ever
DO NOT use raw hex values in components — always var(--color-x)
DO NOT invent colors — read brand.md or use DEFAULT_PALETTE
DO NOT use default Tailwind blue/indigo as primary brand color
DO NOT use Inter or Roboto as headline fonts
DO NOT leave Lorem ipsum in any production file
DO NOT use placehold.co in production — only in demos explicitly marked as such
DO NOT write English in any user-facing text
DO NOT build the entire site in one pass — build section by section, review each one
DO NOT use raw <img> tags — always next/image
DO NOT stop after one screenshot review pass — minimum 2 rounds per section
DO NOT add sections or features not specified in BUILD.md
DO NOT use <form> HTML tags in React — use event handlers (onClick, onChange)
DO NOT center the hero section when DESIGN_VARIANCE > 4
DO NOT generate only the success state — implement loading, empty, and error states
DO NOT mix GSAP/ThreeJS with Framer Motion in the same component tree
DO NOT remove focus rings — keyboard accessibility is mandatory
DO NOT convey information by color alone — always add icon or text
DO NOT use z-index values outside the defined scale (0/10/20/40/100/1000)
DO NOT validate forms on keystroke — validate on blur
DO NOT use glassmorphism on flat light backgrounds — only on dark/photo backgrounds
DO NOT use neon/purple/blue-glowing glass — ink-tinted glass only (rgba 20,20,16)
DO NOT apply backdrop-filter to elements covering >30% of viewport — performance
```

**Anti-AI Copywriting — Banned Words:**
```
Banned words:    Elevate, Seamless, Unleash, Next-Gen, Game-changer,
                 Delve, Tapestry, "In the world of...", Revolutionary,
                 Cutting-edge, Leverage, Holistic, Synergy, Empower

Banned patterns: Round numbers (use 47.2% not 50%, use €189 not €200)
                 Generic names (use María García, not Jane Smith / John Doe)
                 Exclamation marks in premium brand copy (!!! = unprofessional)

Write:           Plain, specific, honest language
                 "Aprende a leer la montaña" — not "Eleva tu experiencia"
                 "Respondo en 24 horas" — not "Atención al cliente seamless"
```

---

## Site Upgrade Protocol

When improving an existing site, apply changes in this exact order:

```
1. Font swap          — biggest instant improvement, lowest risk
2. Color cleanup      — remove clashing colors, apply CSS variables
3. Hover/active states — makes the interface feel alive immediately
4. Spacing            — double the breathing room in key sections
5. Shadow upgrade     — switch to brand-tinted layered shadows
6. Scroll animations  — add IntersectionObserver reveals
7. Hero layout        — fix centered hero if DESIGN_VARIANCE > 4
8. Glass accents      — consider glassmorphic nav if hero has dark photography
```

Never rebuild from scratch when upgrading. Diagnose first.

---

## Build Process — Always Follow This Order

```
1.  Read FRAMEWORK.md — understand business context and scope
2.  Read BUILD.md completely — client brief and requirements
3.  Read brand_assets/brand.md — all color tokens and font names
    If brand.md missing → use DEFAULT_PALETTE, mark files with TODO
4.  Read all files in /reference-components/
5.  Check brand_assets/ for logos, photos, assets
6.  Invoke frontend-design skill
7.  Declare the three design dials from BUILD.md personality:
    "VARIANCE:[N] / MOTION:[N] / DENSITY:[N]"
8.  State your aesthetic direction out loud before writing code:
    "I'm committing to [direction] because [reason from BUILD.md]"
9.  Build ONE section at a time
10. Screenshot and review against checklist
11. Fix all issues found
12. Screenshot again — confirm fixed
13. Only then move to next section
```

**Section build order (standard):**
```
1. Tailwind config + CSS variables + font setup
2. Navigation / Header (glassmorphic if hero uses dark photography)
3. Hero section
4. Services / Features section
5. About / Story section
6. Testimonials (if in BUILD.md)
7. Contact section (phone, WhatsApp, map if required)
8. Footer (with legal links)
9. SEO meta tags on all pages
10. Mobile review pass — full site at 390px
11. Performance check (npm run build — fix any errors)
```

---

## Performance & Legal Requirements

**Performance:**
- `next/image` handles WebP/AVIF — never use raw `<img>`
- Declare width and height on every image — CLS < 0.1
- Fonts loaded via `next/font` — never `@import` in CSS
- Lazy load all images below the fold
- Preload only the hero/critical image
- No render-blocking scripts — load third-party scripts `async` or `defer`
- `backdrop-filter` only on elements ≤30% viewport height — GPU cost
- Target: Google PageSpeed 85+ on mobile, CLS < 0.1, LCP < 2.5s

**Legal (Spanish law — mandatory on every site):**
```
✓ Aviso Legal page (empresa, CIF, dirección registrada, contacto)
✓ Política de Privacidad page (RGPD compliant)
✓ Cookie banner if using analytics or tracking
✓ Footer links to both legal pages
✓ Contact form with RGPD consent checkbox
```

---

## Contact & CTA Patterns — Spanish SME Specific

Spanish SME clients receive most enquiries via phone and WhatsApp. Prioritise these.

```jsx
// Phone CTA — always clickable
<a href="tel:+34612345678">📞 612 345 678</a>

// WhatsApp CTA — highly effective in Spain
<a href="https://wa.me/34612345678?text=Hola%2C%20me%20gustaría%20más%20información"
   target="_blank" rel="noopener noreferrer">
  Escríbenos por WhatsApp
</a>

// Opening hours — always visible in footer and contact
"Lunes a Viernes: 9:00 – 14:00 y 16:00 – 20:00"
"Sábados: 10:00 – 14:00"
"Domingos: Cerrado"
```

---

## File Structure
```
/
├── CLAUDE.md                    ← this file (studio-wide, never changes per client)
├── FRAMEWORK.md                 ← business model and pipeline
├── BUILD.md                     ← client brief (one per project)
├── GENERATE_BRAND_SHEET.md      ← brand generation instructions
├── GENERATE_MEDIA_LIST.md       ← media list generation instructions
├── brand_assets/
│   ├── brand_sheet.png          ← Vitrina visual reference (1200×850px)
│   ├── brand.md                 ← Vitrina design tokens
│   ├── logo_vitrina.svg         ← Vitrina typographic logo
│   ├── logo.svg (or .png)       ← client logo (per project)
│   └── photos/                  ← client photography assets
├── media_assets/
│   ├── MEDIA_LIST.md
│   └── MEDIA_BRIEF.md
├── reference-components/
│   └── [21st.dev components]
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── contacto/page.tsx
│   └── servicios/page.tsx
├── components/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── public/images/
├── tailwind.config.js
└── next.config.js
```
