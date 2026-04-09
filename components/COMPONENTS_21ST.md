# COMPONENTS_21ST.md
# Vitrina Studio — 21st.dev Component Reference
# Version: 1.0 · Marzo 2026
#
# HOW TO USE THIS FILE
# ─────────────────────────────────────────────────────────────────────
# This file lives alongside CLAUDE.md, FRAMEWORK.md, and BUILD.md.
# When building a section, find the component ID for that section below,
# then paste the corresponding CLAUDE CODE PROMPT into Claude Code.
# Claude Code will use the Magic MCP to source the component from 21st.dev,
# adapt it to brand.md tokens, and integrate it into the page.
#
# WORKFLOW PER SECTION
# 1. Open BUILD.md — identify the section to build
# 2. Find the matching COMPONENT BLOCK below
# 3. Copy the CLAUDE CODE PROMPT for that component
# 4. Paste into Claude Code, run it
# 5. Claude Code fetches via Magic MCP → adapts → screenshots → review
#
# MAGIC MCP SETUP (run once per project)
# Claude Code must have the 21st.dev Magic MCP connected.
# If not: https://21st.dev/magic
# ─────────────────────────────────────────────────────────────────────

---

## INDEX — COMPONENT ID → SITE SECTION

| Component ID        | Category            | Site Section              | Priority |
|---------------------|---------------------|---------------------------|----------|
| COMP-NAV-01         | Navigation          | Every page — sticky nav   | 🔴       |
| COMP-NAV-02         | Navigation          | Mobile hamburger          | 🔴       |
| COMP-NAV-03         | Texts / Logo        | Nav + Footer wordmark     | 🟡       |
| COMP-HERO-01        | Heroes              | Homepage — split screen   | 🔴       |
| COMP-HERO-02        | Heroes              | Homepage — cinematic      | 🔴       |
| COMP-HERO-03        | Texts               | Hero headline animation   | 🟡       |
| COMP-HERO-04        | Texts               | Rotating typewriter words | 🟡       |
| COMP-MKT-01         | Announcements       | Top-of-page banner        | 🟡       |
| COMP-MKT-02         | Pricing Sections    | Pricing page              | 🔴       |
| COMP-MKT-03         | Features            | Services / features grid  | 🔴       |
| COMP-MKT-04         | Features            | How it works — steps      | 🔴       |
| COMP-MKT-05         | Clients             | Logos marquee             | 🔴       |
| COMP-MKT-06         | Testimonials        | Social proof section      | 🔴       |
| COMP-MKT-07         | Comparisons         | Before/after slider       | 🟡       |
| COMP-MKT-08         | Calls to Action     | Bottom CTA section        | 🔴       |
| COMP-MKT-09         | Footers             | Site footer               | 🔴       |
| COMP-INT-01         | Buttons             | Magnetic CTA buttons      | 🔴       |
| COMP-INT-02         | Docks               | Mobile floating actions   | 🟡       |
| COMP-INT-03         | Scroll Areas        | Horizontal case studies   | 🟡       |
| COMP-INT-04         | Borders             | Animated card borders     | 🟢       |
| COMP-CNT-01         | Forms               | Contact form              | 🔴       |
| COMP-CNT-02         | Images              | Portfolio / gallery grid  | 🟡       |
| COMP-CNT-03         | Videos              | Hero background video     | 🟡       |
| COMP-CNT-04         | Accordions          | FAQ section               | 🟡       |
| COMP-CNT-05         | Numbers             | Stat counters             | 🟢       |
| COMP-CNT-06         | Cards               | Service cards hover       | 🟡       |
| COMP-MTN-01         | Backgrounds         | Ambient gradient section  | 🟡       |
| COMP-MTN-02         | Shaders             | WebGL hero background     | 🟢       |
| COMP-CNT-07         | Maps                | Location embed            | 🟢       |

Priority: 🔴 Must-have · 🟡 Strong upgrade · 🟢 Optional / post-launch

---

## ─────────────────────────────────────────
## NAVIGATION
## ─────────────────────────────────────────

### COMP-NAV-01 — Glassmorphic Sticky Navigation
**21st.dev category:** Navigation Menus (11 components)
**Browse:** https://21st.dev/s/navbar
**Used in:** Every page — fixed to top, transitions on scroll
**CLAUDE.md alignment:** glass-nav recipe, MOTION_INTENSITY ≥ 4

```
CLAUDE CODE PROMPT — COMP-NAV-01
─────────────────────────────────
Use the Magic MCP to find a sticky navigation component from 21st.dev
in the "navbar" or "navigation menus" category. Choose one that:
- Is transparent at top and transitions to a glassmorphic/blurred state on scroll
- Has logo on the left, nav links centered or right, and a CTA button
- Uses Framer Motion for the scroll transition

Adapt it to Vitrina brand.md:
- Glass recipe: background rgba(20,20,16,0.45), border-bottom 0.5px solid rgba(196,169,106,0.15), backdrop-filter blur(16px)
- Logo: render the "Vitrina." wordmark using Cormorant Garamond 300, gold "." in #C4A96A
- Nav links: Jost 400, 10px, uppercase, letter-spacing 0.25em, color #F4F1EA
- CTA button: btn-accent style — border 0.5px solid rgba(196,169,106,0.5), color #C4A96A, bg transparent
- On scroll trigger (>80px): apply glass styles via Framer Motion useScroll + useTransform
- Mobile: hide nav links, show hamburger icon (see COMP-NAV-02)
- File: components/Navigation.tsx
- All text in Spanish: "Inicio" "Servicios" "Proyectos" "Contacto" "Solicitar presupuesto →"
```

---

### COMP-NAV-02 — Mobile Hamburger Menu
**21st.dev category:** Navigation Menus / Menus (18 components)
**Browse:** https://21st.dev/s/navbar
**Used in:** Mobile nav at 390px breakpoint
**CLAUDE.md alignment:** mobile-first, 48px touch targets

```
CLAUDE CODE PROMPT — COMP-NAV-02
─────────────────────────────────
Use the Magic MCP to find a mobile hamburger menu component from 21st.dev
that features a morphing icon animation (≡ → ✕) and a full-screen or
slide-in mobile menu overlay.

Adapt it to Vitrina brand.md:
- Icon: 3 bars in #F4F1EA, stroke 1.5px, animates to ✕ via Framer Motion spring
- Overlay: full-screen bg #141410, nav links staggered in with translateY + opacity
- Links: Cormorant Garamond 300 italic, 40px, color #F4F1EA, stagger 60ms each
- CTA at bottom: full-width btn-primary — bg #141410, border 0.5px solid #C4A96A, color #C4A96A
- Touch targets: minimum 48px height on every link
- Close on link click and on Escape key
- All links in Spanish (same as desktop nav)
- Integrate inside Navigation.tsx, hidden above md breakpoint
```

---

### COMP-NAV-03 — Animated Logo Wordmark
**21st.dev category:** Texts (58 components)
**Browse:** https://21st.dev/s/texts
**Used in:** Navigation (left), Footer (center or left)
**CLAUDE.md alignment:** Cormorant Garamond wordmark, gold dot

```
CLAUDE CODE PROMPT — COMP-NAV-03
─────────────────────────────────
Use the Magic MCP to find a text/wordmark animation component from 21st.dev
that does a clip-path or opacity reveal on page load.

Adapt it to render the Vitrina wordmark:
- Text: "Vitrina" in Cormorant Garamond weight 300, letter-spacing -1.5px
- Gold dot: "." immediately after in #C4A96A — same font, same size
- Sub-rule: 28px gold (#C4A96A) horizontal line, 0.5px height, below wordmark
- Sub-text: "STUDIO" — Jost 200, 5px letter-spacing, uppercase, color #8C8C84
- Animation: clip-path reveal left→right over 600ms, cubic-bezier(0.16,1,0.3,1), on mount
- No animation on subsequent renders (run once)
- Export as <VitrinaLogo /> component
- Light variant (on dark bg): wordmark #F4F1EA, dot #C4A96A
- Dark variant (on light bg): wordmark #141410, dot #C4A96A
- Prop: variant="light" | "dark"
```

---

## ─────────────────────────────────────────
## HERO SECTIONS
## ─────────────────────────────────────────

### COMP-HERO-01 — Split-Screen Hero (primary)
**21st.dev category:** Heroes (73 components)
**Browse:** https://21st.dev/s/hero
**Used in:** Homepage — main above-the-fold section
**CLAUDE.md alignment:** VARIANCE > 4 → anti-center-bias, split-screen layout

```
CLAUDE CODE PROMPT — COMP-HERO-01
──────────────────────────────────
Use the Magic MCP to find a split-screen hero component from 21st.dev
where text occupies the left 55% and a media asset (photo or video) the right 45%.
Prefer components with scroll-triggered or mount-triggered entrance animations.

Adapt it to Vitrina brand.md:
LAYOUT:
- Left column: top-aligned, generous padding-top (15vh), padding-left 8vw
- Right column: full-height photo/video, object-fit cover, slight overlap into left col
- Hero min-height: 100vh desktop, 80vh mobile

TYPOGRAPHY (left column, top to bottom):
1. Label: Jost 500, 12px, uppercase, letter-spacing 0.2em, color #8C8C84
   Content from BUILD.md → industry label e.g. "Diseño web · España"
2. H1: Cormorant Garamond 300 italic, 56px (desktop) / 36px (mobile)
   letter-spacing -0.03em, line-height 1.05, color #141410 or #F4F1EA (dark bg)
   Content from BUILD.md → main headline
3. Body: Jost 300, 17px, line-height 1.8, color #8C8C84, max-width 480px
   Content from BUILD.md → subheadline / value proposition
4. CTA group (horizontal, gap 16px):
   - Primary btn: bg #141410, color #F4F1EA, Jost 400, 10px uppercase, tracking 0.25em
   - Secondary btn: border 0.5px solid #C4A96A, color #C4A96A, same type spec
   Content from BUILD.md → CTA labels

MEDIA (right column):
- Use AdaptiveMedia component pattern (check GENERATE_MEDIA_LIST.md Rule 6)
- If video: autoplay muted loop playsInline, poster fallback
- If photo: next/image, fill, object-fit cover, gradient overlay from-black/40 via-transparent

ANIMATION (Framer Motion):
- Left col content: staggered translateY(24px)→0 + opacity 0→1, 30ms stagger
- Right col: scale(1.03)→1 over 800ms, ease-out
- Spring: stiffness 80, damping 18

MOBILE (390px):
- Stack vertically: media on top (50vh), text below
- CTA buttons: full-width, stacked
- H1: 36px, line-height 1.1

File: components/Hero.tsx
```

---

### COMP-HERO-02 — Cinematic Full-Bleed Hero (alternative)
**21st.dev category:** Heroes (73 components)
**Browse:** https://21st.dev/s/hero
**Used in:** Homepage hero — use when client has strong photography
**CLAUDE.md alignment:** Full-bleed with glass overlay, MOTION_INTENSITY:8

```
CLAUDE CODE PROMPT — COMP-HERO-02
──────────────────────────────────
Use the Magic MCP to find a full-bleed video or photo hero from 21st.dev
with text overlay. Prefer components that include parallax or depth effects.

Adapt it to Vitrina brand.md:
BACKGROUND:
- Full-viewport media: use AdaptiveMedia pattern (GENERATE_MEDIA_LIST.md Rule 6)
- Gradient overlay: linear-gradient(to top, rgba(20,20,16,0.7) 0%, rgba(20,20,16,0.2) 50%, transparent 100%)
- Color treatment: mix-blend-multiply #141410 at 10% opacity layer on top

CONTENT (left-aligned, NOT centered — VARIANCE:7):
- Position: absolute, bottom 12vh, left 8vw, max-width 680px
- All text color: #FDFCF9

Typography stack (bottom to top on page):
1. CTA group: see COMP-INT-01 for magnetic button implementation
2. Body: Jost 300, 17px, line-height 1.8, color rgba(253,252,249,0.75), mb 32px
3. H1: Cormorant Garamond 300 italic, 72px desktop / 44px mobile
   letter-spacing -0.03em, line-height 1.05

GLASS CTA CARD (floating over hero):
- Small card, top-right or bottom-right corner
- Glass recipe: rgba(20,20,16,0.35), border 0.5px solid rgba(196,169,106,0.25), blur(12px)
- Content: short trust signal from BUILD.md e.g. "47 webs · 5 días · desde €19/mes"
- Font: Jost 300, 13px, color #C8C4B8

SCROLL INDICATOR:
- Animated chevron or line, bottom-center
- Opacity pulses 0.4→1 over 2s, infinite
- Disappears on first scroll (IntersectionObserver)

File: components/Hero.tsx (swap with COMP-HERO-01 based on available media)
```

---

### COMP-HERO-03 — Scroll-Triggered Text Reveal
**21st.dev category:** Texts (58 components)
**Browse:** https://21st.dev/s/texts
**Used in:** Hero headline OR section taglines
**CLAUDE.md alignment:** whileInView, translateY(16px), MOTION_INTENSITY:8

```
CLAUDE CODE PROMPT — COMP-HERO-03
──────────────────────────────────
Use the Magic MCP to find a scroll-triggered text reveal component from 21st.dev.
Prefer word-by-word or line-by-line reveals (not character-by-character — too slow).

Adapt it to Vitrina brand.md:
- Trigger: Framer Motion whileInView, once: true, margin "-100px"
- Each word/line: translateY(16px)→0 + opacity 0→1
- Duration: 600ms, cubic-bezier(0.16, 1, 0.3, 1)
- Stagger: 40ms per word or 80ms per line
- Export as <RevealText> wrapper component that accepts:
  - children: string (headline text)
  - as: "h1" | "h2" | "h3" (default "h2")
  - splitBy: "word" | "line" (default "word")
  - delay: number (default 0)
- Apply font styles from the parent — component only handles animation, not styling
- Reusable across Hero, Services, About, Testimonials sections
```

---

### COMP-HERO-04 — Rotating Typewriter Headline
**21st.dev category:** Texts (58 components)
**Browse:** https://21st.dev/s/texts
**Used in:** Hero H1 — cycles through client industries
**CLAUDE.md alignment:** Communicates multi-vertical value proposition

```
CLAUDE CODE PROMPT — COMP-HERO-04
──────────────────────────────────
Use the Magic MCP to find a typewriter or text rotation component from 21st.dev
that cycles through an array of words/phrases with smooth transitions.
Prefer clip-path reveal or fade transitions over character-by-character typing.

Adapt it to Vitrina brand.md:
- Structure: static prefix + animated rotating word
  e.g. "Webs para " + [rotating: "restaurantes" / "clínicas" / "instructores" / "tiendas" / "autónomos"]
- Transition: clip-path inset(0 0% 0 0)→inset(0 100% 0 0) exit, then inset(0 100% 0 0)→inset(0 0% 0 0) enter
- Duration: exit 300ms, enter 400ms, pause between 2200ms
- Rotating word color: #C4A96A (kintsugi gold accent)
- Static text color: #141410 or #FDFCF9 depending on hero variant
- Export as <RotatingText words={[...]} staticPrefix="..." />
- Accessible: aria-live="polite" on the rotating span
```

---

## ─────────────────────────────────────────
## MARKETING BLOCKS
## ─────────────────────────────────────────

### COMP-MKT-01 — Announcement Banner
**21st.dev category:** Announcements (10 components)
**Browse:** https://21st.dev/s/announcements
**Used in:** Top of every page — above the nav
**CLAUDE.md alignment:** Conversion trigger, launch offer

```
CLAUDE CODE PROMPT — COMP-MKT-01
──────────────────────────────────
Use the Magic MCP to find a dismissible announcement banner from 21st.dev.
Choose a slim top-bar style (not a modal or popup).

Adapt it to Vitrina brand.md:
- Height: 40px
- Background: #C4A96A (kintsugi gold)
- Text: Jost 400, 12px, uppercase, letter-spacing 0.15em, color #141410
  Content from BUILD.md → offer text e.g. "Primer mes gratis · Oferta de lanzamiento →"
- Dismiss: ✕ button, right side, 24px touch target, removes banner and saves to localStorage
- Animation: slideDown from -40px on mount, 300ms ease-out
- Sticky above nav, z-index: 1001
- Export as <AnnouncementBanner message="..." ctaText="..." ctaHref="..." />
- Show/hide logic: check localStorage key "vitrina-banner-dismissed"
```

---

### COMP-MKT-02 — Pricing Section
**21st.dev category:** Pricing Sections (17 components)
**Browse:** https://21st.dev/s/pricing
**Used in:** Pricing page (standalone) + pricing section on homepage
**CLAUDE.md alignment:** DENSITY:3, three-tier subscription model

```
CLAUDE CODE PROMPT — COMP-MKT-02
──────────────────────────────────
Use the Magic MCP to find a pricing section component from 21st.dev
with a monthly/annual toggle and 3 tier cards. Prefer clean, spacious layouts.

Adapt it to Vitrina brand.md:
TOGGLE:
- Monthly / Anual, pill toggle, bg #141410 active, color #F4F1EA
- Annual shows "Ahorra 2 meses" badge in #C4A96A

TIER CARDS (data from BUILD.md):
Card structure:
- bg: #FDFCF9 (blanc), border: 0.5px solid #C8C4B8, radius: 3px (radius-sm)
- Plan label: Jost 500, 12px, uppercase, letter-spacing 0.2em, color #8C8C84
- Price: Cormorant Garamond 300, 48px, color #141410, suffix "/mes" in Jost 300 20px
- Tagline: Jost 300, 14px, color #8C8C84, margin-bottom 24px
- Feature list: checkmark in #C4A96A, Jost 300 15px, color #141410
- CTA: full-width btn-primary

RECOMMENDED CARD (middle tier):
- Border: 1px solid #C4A96A (gold accent, 1px — only exception to 0.5px rule)
- Badge "Más popular" above card: bg #C4A96A, color #141410, Jost 500, 11px, caps
- Subtle shadow-gold from brand.md

Section header:
- H2: Cormorant Garamond 600 uppercase, 40px, tracking 0.06em
- Body: Jost 300, 17px, color #8C8C84

File: app/precios/page.tsx + components/Pricing.tsx
All text in Spanish (Básico / Profesional / Estudio or from BUILD.md)
```

---

### COMP-MKT-03 — Services / Features Grid
**21st.dev category:** Features (36 components)
**Browse:** https://21st.dev/s/features
**Used in:** Homepage services section + services page
**CLAUDE.md alignment:** Bento grid variant preferred, DENSITY:3

```
CLAUDE CODE PROMPT — COMP-MKT-03
──────────────────────────────────
Use the Magic MCP to find a features or services grid component from 21st.dev.
Prefer a bento-grid layout (asymmetric cards) over a uniform grid for VARIANCE:7.

Adapt it to Vitrina brand.md:
GRID LAYOUT:
- Desktop: CSS grid, asymmetric — large card spans 2 cols, small cards fill gaps
- Mobile: single column stack
- Gap: 16px
- Section padding: py-24 lg:py-32

CARD BASE:
- bg: #FDFCF9, border: 0.5px solid #C8C4B8, radius: 3px, padding: 32px
- Hover: border-color #C4A96A, shadow-gold from brand.md, transform translateY(-2px)
- Transition: 200ms spring (stiffness 80, damping 18)

CARD CONTENT (from BUILD.md services list):
- Icon: SVG icon or Lucide icon, color #C4A96A, size 24px
- Title: Cormorant Garamond 600, 20px, color #141410, tracking 0.04em
- Description: Jost 300, 15px, color #8C8C84, line-height 1.7

LARGE FEATURE CARD (first card, 2-col span):
- Additional: stat number (e.g. "47" or "5 días") in Cormorant 300 80px, color #C4A96A
- Hover: animated border trace (see COMP-INT-04)

SECTION HEADER:
- Label: Jost 500, 12px, uppercase, tracking 0.2em, color #8C8C84
- H2: Cormorant 600 uppercase, 40px, tracking 0.06em, color #141410
- Apply COMP-HERO-03 (RevealText) on H2

File: components/Services.tsx
Content: pull ALL service names, descriptions, and icons from BUILD.md
```

---

### COMP-MKT-04 — How It Works — Process Steps
**21st.dev category:** Features (36 components)
**Browse:** https://21st.dev/s/features
**Used in:** Homepage — between hero and services, or on a dedicated section
**CLAUDE.md alignment:** Reduces buyer hesitation, MOTION_INTENSITY:8

```
CLAUDE CODE PROMPT — COMP-MKT-04
──────────────────────────────────
Use the Magic MCP to find a numbered steps or process component from 21st.dev.
Prefer a horizontal timeline on desktop and vertical stack on mobile.

Adapt it to Vitrina brand.md:
LAYOUT:
- Desktop: horizontal, 4 steps, connected by a thin gold line (#C4A96A, 0.5px)
- Mobile: vertical stack with left border line
- Section bg: #141410 (dark section for contrast)

STEP CARD:
- Number: Cormorant 300, 64px, color rgba(196,169,106,0.2) — decorative, behind content
- Title: Jost 500, 16px, uppercase, tracking 0.1em, color #F4F1EA
- Description: Jost 300, 14px, color #8C8C84, line-height 1.7
- No card border — float on dark bg

CONNECTING LINE:
- Thin horizontal rule, #C4A96A, 0.5px, animates left→right on scroll
- Framer Motion: scaleX 0→1, transformOrigin "left", whileInView

ANIMATION:
- Each step: staggered fade-up (translateY 24px→0, opacity 0→1)
- Stagger: 120ms per step
- Trigger: whileInView, once: true

CONTENT (4 steps — adapt from BUILD.md or use these defaults):
1. "Cuéntanos tu negocio" — Rellena el formulario en 5 minutos
2. "Diseñamos tu identidad" — Paleta, tipografía, y tono de marca
3. "Construimos tu web" — En 3–5 días, sección por sección
4. "Publicamos y mantenemos" — Tú pagas cuando tu web ya funciona

File: components/HowItWorks.tsx
```

---

### COMP-MKT-05 — Client Logos Marquee
**21st.dev category:** Clients (16 components)
**Browse:** https://21st.dev/s/clients
**Used in:** Homepage — directly below hero or above testimonials
**CLAUDE.md alignment:** Immediate trust signal, DENSITY:3

```
CLAUDE CODE PROMPT — COMP-MKT-05
──────────────────────────────────
Use the Magic MCP to find an infinite logo marquee / scrolling clients component
from 21st.dev. Must have: infinite loop, pause on hover, duplicated items for seamless scroll.

Adapt it to Vitrina brand.md:
MARQUEE:
- Speed: 40s per full loop (slow, elegant)
- Direction: left (default)
- Pause on hover: yes
- Gap between logos: 64px
- Gradient mask edges: fade-out using bg-gradient left and right, 80px wide, color #F4F1EA

LOGOS:
- If real client logos available: use from brand_assets/photos/ (grayscale + hover to color)
- If no logos yet: use industry category icons + business type labels
  e.g. [Restaurant icon] "Restauración" / [Health icon] "Salud" / [Sport icon] "Deporte"
- Logo container: height 32px, opacity 0.5, hover opacity 1.0, transition 200ms
- All logos in #141410 (grayscale treatment via CSS filter: grayscale(1))

SECTION LABEL ABOVE:
- Jost 500, 11px, uppercase, tracking 0.2em, color #8C8C84, text-align center
- Text: "Negocios que ya confían en Vitrina"

File: components/ClientLogos.tsx
```

---

### COMP-MKT-06 — Testimonials Section
**21st.dev category:** Testimonials (15 components)
**Browse:** https://21st.dev/s/testimonials
**Used in:** Homepage trust section — after services, before pricing
**CLAUDE.md alignment:** DENSITY:3, authentic language (no AI clichés)

```
CLAUDE CODE PROMPT — COMP-MKT-06
──────────────────────────────────
Use the Magic MCP to find a testimonials component from 21st.dev.
Prefer: masonry grid OR a horizontally scrollable card list.
Avoid: carousels that auto-play without user control (accessibility issue).

Adapt it to Vitrina brand.md:
LAYOUT:
- Desktop: masonry grid, 3 columns, staggered heights (not uniform)
- Mobile: single column or horizontal scroll (snap)

TESTIMONIAL CARD:
- bg: #FDFCF9, border: 0.5px solid #C8C4B8, radius: 3px, padding: 28px
- Quote mark: Cormorant 300, 80px, color rgba(196,169,106,0.15), absolute top-left
- Quote text: Cormorant 300 italic, 18px, color #141410, line-height 1.6
- Separator: 0.5px gold line, 24px wide, margin: 16px 0
- Name: Jost 500, 13px, color #141410, uppercase, tracking 0.1em
- Business: Jost 300, 12px, color #8C8C84
- Avatar: 36px circle, initials or photo

HOVER STATE:
- border-color #C4A96A, shadow-gold from brand.md, 200ms

CONTENT:
- Pull ALL testimonials from BUILD.md (name, business, quote)
- Never invent testimonials — use [PENDING: cliente real] if none in BUILD.md
- Language: Spanish always
- Avoid banned words: Seamless, Elevate, Transformó, Increíble (as empty superlatives)

Section header: same pattern as COMP-MKT-03
File: components/Testimonials.tsx
```

---

### COMP-MKT-07 — Before/After Comparison Slider
**21st.dev category:** Comparisons (6 components)
**Browse:** https://21st.dev/s/comparisons
**Used in:** Results section — shows client website transformation
**CLAUDE.md alignment:** Visual proof of value, MOTION_INTENSITY:8

```
CLAUDE CODE PROMPT — COMP-MKT-07
──────────────────────────────────
Use the Magic MCP to find a before/after image comparison slider from 21st.dev.
Must have: drag handle, keyboard accessible, touch-friendly.

Adapt it to Vitrina brand.md:
SLIDER:
- Drag handle: 40px circle, bg #C4A96A, border 2px solid #FDFCF9
  Icon: ←→ arrows in #141410
- Divider line: 1px solid #FDFCF9
- Default position: 45% (reveal more "after")

LABELS:
- "Antes" badge: top-left of before image, bg rgba(20,20,16,0.7), color #F4F1EA
- "Con Vitrina" badge: top-right of after image, bg #C4A96A, color #141410
- Font: Jost 500, 11px, uppercase, tracking 0.15em, padding 6px 12px, radius-xs

IMAGES:
- Pull from media_assets/ — use canonical IDs from MEDIA_LIST.md
- Fallback: CSS placeholder with business name if no images yet
- next/image, fill, object-fit cover

SECTION CONTEXT:
- Add above slider: H2 "El antes y el después" (RevealText)
- Add below: brief Jost 300 14px description from BUILD.md

File: components/BeforeAfter.tsx
```

---

### COMP-MKT-08 — Bottom CTA Section
**21st.dev category:** Calls to Action (34 components)
**Browse:** https://21st.dev/s/calls-to-action
**Used in:** Bottom of homepage + bottom of every page before footer
**CLAUDE.md alignment:** Dark section, magnetic button, Seijaku (calms, never pressures)

```
CLAUDE CODE PROMPT — COMP-MKT-08
──────────────────────────────────
Use the Magic MCP to find a full-width CTA section from 21st.dev.
Prefer dark background with a single large headline and one or two buttons.
Avoid countdown timers, urgency manipulation, or exclamation marks.

Adapt it to Vitrina brand.md:
SECTION:
- bg: #141410, padding: py-32 lg:py-40
- Optional: ambient gradient blob (see COMP-MTN-01) as section background

CONTENT (centered, max-width 720px, margin auto):
- Label: Jost 500, 12px, uppercase, tracking 0.2em, color #8C8C84, mb 16px
  Text: "Sin compromisos. Sin coste inicial."
- H2: Cormorant 300 italic, 56px desktop / 36px mobile, color #FDFCF9
  letter-spacing -0.03em, line-height 1.05
  Content from BUILD.md → closing headline
- Sub: Jost 300, 17px, color #8C8C84, line-height 1.8, max-width 520px, mb 40px
  Content from BUILD.md → supporting line
- CTA group: horizontal, gap 16px, centered
  Primary: btn-glass (see brand.md) — MUST use COMP-INT-01 magnetic effect
  Secondary: btn-accent (gold border)

FILE: components/CTASection.tsx
Content from BUILD.md — never use "Eleva", "Seamless", "Game-changer"
```

---

### COMP-MKT-09 — Site Footer
**21st.dev category:** Footers (14 components)
**Browse:** https://21st.dev/s/footers
**Used in:** Every page — bottom
**CLAUDE.md alignment:** Spanish law mandatory (Aviso Legal, Política de Privacidad)

```
CLAUDE CODE PROMPT — COMP-MKT-09
──────────────────────────────────
Use the Magic MCP to find a site footer component from 21st.dev.
Choose a multi-column layout with logo, nav links, and a contact column.

Adapt it to Vitrina brand.md:
LAYOUT:
- bg: #2A2A24 (carbon)
- Top border: 0.5px solid rgba(200,196,184,0.12)
- Grid: 4 columns desktop, 2×2 tablet, stacked mobile
- Padding: py-16 md:py-20

COLUMNS:
Col 1 — Brand:
- <VitrinaLogo variant="light" /> (COMP-NAV-03, dark variant)
- Tagline: Jost 300, 13px, color #8C8C84, mt 12px
  Text from BUILD.md tagline

Col 2 — Navegación:
- Heading: Jost 500, 11px, uppercase, tracking 0.2em, color #8C8C84
- Links: Jost 300, 14px, color #C8C4B8, hover color #F4F1EA
  "Inicio" / "Servicios" / "Proyectos" / "Precios" / "Contacto"

Col 3 — Contacto:
- Heading: same style as Col 2
- Phone: clickable <a href="tel:+34..."> — pull from BUILD.md
- WhatsApp: <a href="https://wa.me/34..."> — pull from BUILD.md
- Email: pull from BUILD.md

Col 4 — Legal (MANDATORY — Spanish law):
- Heading: same style
- Links: "Aviso Legal" / "Política de Privacidad" / "Cookies"
- Each links to /aviso-legal and /privacidad pages

BOTTOM BAR:
- 0.5px solid rgba(200,196,184,0.08) border-top, py 6
- Left: "© 2026 Vitrina Studio. Todos los derechos reservados."
- Right: "Hecho en España" (no emoji)
- Font: Jost 300, 12px, color #8C8C84

File: components/Footer.tsx
ALL text in Spanish. Never omit legal links — required by Spanish law.
```

---

## ─────────────────────────────────────────
## INTERACTIONS & MOTION
## ─────────────────────────────────────────

### COMP-INT-01 — Magnetic CTA Buttons
**21st.dev category:** Buttons (130 components)
**Browse:** https://21st.dev/s/buttons
**Used in:** Every primary CTA — hero, pricing cards, bottom CTA
**CLAUDE.md alignment:** MANDATORY at MOTION_INTENSITY ≥ 6. useMotionValue only.

```
CLAUDE CODE PROMPT — COMP-INT-01
──────────────────────────────────
Use the Magic MCP to find a magnetic button component from 21st.dev.
CRITICAL: Must use Framer Motion useMotionValue + useTransform — never useState.

Adapt it to Vitrina brand.md:
IMPLEMENTATION (non-negotiable — CLAUDE.md mandates this):
const x = useMotionValue(0)
const y = useMotionValue(0)
const rotateX = useTransform(y, [-50, 50], [8, -8])
const rotateY = useTransform(x, [-50, 50], [-8, 8])

function onMouseMove(e: MouseEvent) {
  const rect = ref.current.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  x.set((e.clientX - cx) * 0.4)
  y.set((e.clientY - cy) * 0.4)
}
function onMouseLeave() {
  x.set(0); y.set(0)
}

BUTTON VARIANTS — export all three:
1. <MagneticButton variant="primary">
   bg #141410, color #F4F1EA, border none
   padding 10px 28px, Jost 400, 10px, uppercase, tracking 0.25em
   hover: bg #2A2A24, translateY(-1px)

2. <MagneticButton variant="accent">
   bg transparent, color #C4A96A, border 0.5px solid #C4A96A
   same type spec as primary
   hover: bg #C4A96A, color #141410

3. <MagneticButton variant="glass">
   bg rgba(196,169,106,0.12), color #C4A96A
   border 0.5px solid rgba(196,169,106,0.5), backdrop-filter blur(8px)
   Only use on dark photography backgrounds

ALL VARIANTS:
- focus-visible: outline 2px solid #C4A96A, outline-offset 3px
- active: scale(0.98), transition 100ms
- Disable magnetic on touch devices (no hover)
- radius: 1px (radius-xs from brand.md)
- Cursor: default (not pointer — refined brands avoid pointer on buttons)

File: components/ui/MagneticButton.tsx
```

---

### COMP-INT-02 — Floating Mobile Action Dock
**21st.dev category:** Docks (6 components)
**Browse:** https://21st.dev/s/docks
**Used in:** Mobile viewport — sticky bottom bar for primary actions
**CLAUDE.md alignment:** Spanish SME contact pattern, WhatsApp priority

```
CLAUDE CODE PROMPT — COMP-INT-02
──────────────────────────────────
Use the Magic MCP to find a dock or floating action bar component from 21st.dev.
Prefer a macOS-style dock with spring-physics icon magnification on hover.

Adapt it to Vitrina brand.md for mobile Spanish SME context:
DOCK:
- Only visible on mobile (hidden md: and above)
- Position: fixed, bottom 24px, left 50%, transform -50%, z-index 40
- bg: rgba(20,20,16,0.85), border: 0.5px solid rgba(196,169,106,0.25)
  backdrop-filter: blur(16px), border-radius: 999px (pill)
- Padding: 10px 20px, gap: 24px

DOCK ITEMS (3 actions — pull numbers from BUILD.md):
1. Phone call: 📞 icon → <a href="tel:+34...">
   Label: "Llamar" — Jost 300, 10px, appears on hover/focus
2. WhatsApp: WhatsApp SVG icon → <a href="https://wa.me/34...?text=...">
   Pre-filled message: "Hola, me gustaría más información sobre vuestros servicios web."
3. Presupuesto: arrow icon → scroll to contact form or /contacto

ICON STYLE:
- SVG icons, 20px, color #C8C4B8, hover color #F4F1EA
- WhatsApp: brand green (#25D366) — only exception to monochrome rule
- Spring magnify on hover: scale 1→1.4, neighbors scale 1→1.2
  Framer Motion: useSpring, stiffness 300, damping 30

File: components/MobileDock.tsx
Hidden above md breakpoint (display: none md:hidden)
```

---

### COMP-INT-03 — Horizontal Scroll — Case Studies
**21st.dev category:** Scroll Areas (24 components)
**Browse:** https://21st.dev/s/scroll-areas
**Used in:** Projects / case studies section — desktop horizontal, mobile vertical
**CLAUDE.md alignment:** VARIANCE:7, anti-grid, editorial layout

```
CLAUDE CODE PROMPT — COMP-INT-03
──────────────────────────────────
Use the Magic MCP to find a horizontal scroll component from 21st.dev.
Prefer smooth scroll with snap points and a draggable / swipe-friendly track.

Adapt it to Vitrina brand.md:
TRACK:
- Desktop: horizontal scroll, overflow-x auto, scroll-snap-type x mandatory
- Mobile: convert to vertical stack (flex-direction column)
- Hide scrollbar: scrollbar-width none
- Cursor: grab / grabbing on desktop

PROJECT CARD (each item):
- Width: 380px desktop (fixed), 100% mobile
- Height: 520px
- scroll-snap-align: start
- bg: #FDFCF9, border: 0.5px solid #C8C4B8, radius: 3px, overflow: hidden

CARD STRUCTURE:
- Top 55%: next/image, fill, object-fit cover — project screenshot
  Overlay on hover: rgba(20,20,16,0.5) slide up from bottom, 300ms
- Bottom 45%: padding 24px
  Industry tag: Jost 500, 11px, uppercase, color #8C8C84
  Project name: Cormorant 600, 22px, color #141410
  Brief: Jost 300, 14px, color #8C8C84, 2 lines max
  "Ver proyecto →": Jost 400, 12px, color #C4A96A, hover underline

SECTION HEADER:
- Left-aligned H2 + "Arrastra para ver más →" hint in #8C8C84 (disappears after first drag)

CONTENT: Pull project list and screenshots from BUILD.md + media_assets/
File: components/Projects.tsx
```

---

### COMP-INT-04 — Animated Border Trace
**21st.dev category:** Borders (12 components)
**Browse:** https://21st.dev/s/borders
**Used in:** Large feature card (COMP-MKT-03), pricing recommended card
**CLAUDE.md alignment:** Kintsugi gold accent, subtle — Shibui

```
CLAUDE CODE PROMPT — COMP-INT-04
──────────────────────────────────
Use the Magic MCP to find an animated border/perimeter trace component from 21st.dev.
The border should animate on hover — tracing the edge of the card.

Adapt it to Vitrina brand.md:
- Border color: #C4A96A (kintsugi gold)
- Border width: 0.5px (refined, not heavy)
- Animation: SVG stroke-dasharray trace — starts at top-left, travels clockwise
- Duration: 600ms, ease-in-out, triggers on hover enter
- Reverse: on hover leave, 400ms (60% of enter — CLAUDE.md exit rule)
- Radius: matches card radius (3px)
- Implementation: CSS clip-path animation OR SVG overlay — NOT box-shadow
- Export as <AnimatedBorder> wrapper: wraps any card element

Apply to:
- Large feature card in COMP-MKT-03
- Recommended pricing card in COMP-MKT-02 (in addition to 1px static border)
File: components/ui/AnimatedBorder.tsx
```

---

## ─────────────────────────────────────────
## CONTENT COMPONENTS
## ─────────────────────────────────────────

### COMP-CNT-01 — Contact Form
**21st.dev category:** Forms (23 components)
**Browse:** https://21st.dev/s/forms
**Used in:** Contact page (app/contacto/page.tsx) + contact section on homepage
**CLAUDE.md alignment:** Spanish, RGPD mandatory, validate on blur not keystroke

```
CLAUDE CODE PROMPT — COMP-CNT-01
──────────────────────────────────
Use the Magic MCP to find a contact form component from 21st.dev.
Choose a clean, minimal layout — not a multi-step wizard.

Adapt it to Vitrina brand.md:
FORM LAYOUT:
- Max-width: 560px, centered or left-aligned per BUILD.md layout
- All labels visible (never placeholder-only)
- Required fields marked with * (legend: "* Campos obligatorios" in small type)

FIELDS (in Spanish — pull specifics from BUILD.md):
1. Nombre completo* — type text, autocomplete "name"
2. Email* — type email, autocomplete "email"
3. Teléfono — type tel, autocomplete "tel" (optional but recommended for Spanish SMEs)
4. Tipo de negocio — select dropdown: Restaurante / Clínica / Tienda / Instructor / Otro
5. Mensaje* — textarea, 4 rows
6. RGPD checkbox* (MANDATORY — Spanish law):
   "He leído y acepto la [Política de Privacidad] y consiento el tratamiento de mis datos."
   Link to /privacidad opens in new tab

FIELD STYLING (brand.md):
- bg: #FDFCF9, border: 0.5px solid #C8C4B8, radius: 3px, padding: 10px 14px
- Focus: border-color #C4A96A, outline none, box-shadow 0 0 0 3px rgba(196,169,106,0.12)
- Error: border-color #E24B4A, error message below field in red
- Error message format: "Campo obligatorio" or "Email no válido — debe incluir @"
- Label: Jost 500, 12px, uppercase, tracking 0.1em, color #141410, mb 6px

VALIDATION:
- On blur only — NEVER on keystroke
- Email: basic format check
- All required fields on submit

SUBMIT BUTTON:
- Full width, btn-primary with MagneticButton (COMP-INT-01)
- Text: "Enviar mensaje" / loading: "Enviando..." / success: "Mensaje enviado ✓"

SUBMISSION:
- Use Formspree or Netlify Forms endpoint from BUILD.md
- On success: show inline success message (no page redirect)
- On error: "Error al enviar. Inténtalo de nuevo o escríbenos por WhatsApp."

File: components/ContactForm.tsx
```

---

### COMP-CNT-02 — Portfolio / Gallery Grid
**21st.dev category:** Images (26 components)
**Browse:** https://21st.dev/s/images
**Used in:** Portfolio section + standalone gallery page
**CLAUDE.md alignment:** Masonry grid, editorial treatment, mix-blend-multiply

```
CLAUDE CODE PROMPT — COMP-CNT-02
──────────────────────────────────
Use the Magic MCP to find an image gallery or masonry grid component from 21st.dev.
Prefer a masonry layout with lightbox on click.

Adapt it to Vitrina brand.md:
GRID:
- Desktop: CSS columns (column-count: 3), gap: 12px — true masonry
- Tablet: 2 columns, Mobile: 1 column
- Each image: rounded corner 3px (radius-sm), overflow hidden

IMAGE TREATMENT:
- next/image, layout responsive, placeholder "blur"
- Default: grayscale(15%) — slightly desaturated for editorial feel
- Hover: grayscale(0%), scale(1.02), 300ms ease — snaps to color on hover
- Overlay: mix-blend-multiply #141410 at 10% — brand cohesion filter
- Gradient: linear-gradient(to top, rgba(20,20,16,0.5), transparent) — always on

LIGHTBOX (on click):
- Full viewport overlay: bg rgba(20,20,16,0.92), blur backdrop
- Image centered, max-height 90vh
- Next/prev navigation: arrow buttons, keyboard ← →
- Close: ✕ top-right, Escape key
- Project info below image: name + industry (from media metadata)
- Framer Motion AnimatePresence for enter/exit

CONTENT:
- Pull all images from media_assets/ using canonical naming (GENERATE_MEDIA_LIST.md Rule 6)
- Captions from MEDIA_LIST.md alt text
- If no images yet: CSS placeholder cards with gradient + project name

File: components/Gallery.tsx
```

---

### COMP-CNT-03 — Hero Background Video
**21st.dev category:** Videos (9 components)
**Browse:** https://21st.dev/s/videos
**Used in:** Hero section — when client provides video (hero-01.mp4)
**CLAUDE.md alignment:** AdaptiveMedia pattern from GENERATE_MEDIA_LIST.md Rule 6

```
CLAUDE CODE PROMPT — COMP-CNT-03
──────────────────────────────────
Use the Magic MCP to find a video background component from 21st.dev.
Must include: poster image fallback, autoplay muted loop playsInline.

Adapt it to Vitrina brand.md and implement the AdaptiveMedia detection pattern:
COMPONENT LOGIC (from GENERATE_MEDIA_LIST.md Rule 6 — auto-detection):
function AdaptiveMedia({ id, alt, className, objectPosition = 'center' }) {
  // Detection order: .webm → .mp4 → .mov → .webp → .jpg → .png
  // This is determined at build time by checking media_assets/
  // Claude Code: scan /media_assets/ for [id].* and detect format
  // DO NOT hardcode — generate the correct src based on what's in media_assets/
}

IF VIDEO FORMAT FOUND:
<video
  autoPlay muted loop playsInline
  poster={`/media/${id}.jpg`}
  className={className}
  style={{ objectFit: 'cover', objectPosition, width: '100%', height: '100%' }}
>
  <source src={`/media/${id}.webm`} type="video/webm" />
  <source src={`/media/${id}.mp4`} type="video/mp4" />
  <img src={`/media/${id}.jpg`} alt={alt} style={{ objectFit: 'cover' }} />
</video>

IF ONLY PHOTO FOUND — apply CSS animation (no video = not inferior):
@keyframes subtle-zoom {
  0%   { transform: scale(1); }
  100% { transform: scale(1.06); }
}
animation: subtle-zoom 10s ease-in-out infinite alternate;

IF NOTHING FOUND — CSS animated gradient (brand colors):
background: linear-gradient(135deg, #141410 0%, #2A2A24 50%, #141410 100%);
/* Add ambient blob (COMP-MTN-01) */

PERFORMANCE:
- video: preload="none" — load only when in viewport
- Use IntersectionObserver to play/pause (battery saving)
- backdrop-filter only if element ≤30% viewport height (CLAUDE.md rule)

File: components/AdaptiveMedia.tsx (reusable across all media sections)
```

---

### COMP-CNT-04 — FAQ Accordion
**21st.dev category:** Accordions (40 components)
**Browse:** https://21st.dev/s/accordions
**Used in:** FAQ section on homepage or pricing page
**CLAUDE.md alignment:** DENSITY:4, reduces support load, accessible

```
CLAUDE CODE PROMPT — COMP-CNT-04
──────────────────────────────────
Use the Magic MCP to find an accordion / FAQ component from 21st.dev.
Choose one with smooth height animation and accessible keyboard navigation.

Adapt it to Vitrina brand.md:
CONTAINER:
- Max-width: 720px, centered
- Divide items with 0.5px solid #C8C4B8 lines (not card boxes)
- No border around the whole accordion — minimalist

ITEM:
- Trigger: full-width button, padding 20px 0, cursor pointer
  Question: Cormorant 300, 20px, color #141410 (closed) / #C4A96A (open)
  Icon: + (closed) / − (open), color #C4A96A, right side, 20px, transition rotate 300ms
- Answer: Jost 300, 16px, color #8C8C84, line-height 1.8, padding-bottom 20px
  Height animation: Framer Motion animate={{ height: "auto" / 0 }}, spring

ACCESSIBILITY:
- role="button" or <button> on trigger
- aria-expanded, aria-controls on trigger
- id on answer panel
- Keyboard: Enter/Space to toggle, Tab to navigate
- One open at a time (close others on open)

FAQ ITEMS (from BUILD.md or use these defaults):
Q: "¿Cuánto tarda en estar lista mi web?"
A: "Entre 3 y 5 días laborables desde que recibimos tus fotos y contenido."

Q: "¿Puedo cancelar cuando quiera?"
A: "Sí. Mes a mes, sin permanencia. Si cancelas, te entregamos el código completo."

Q: "¿Qué pasa con mi dominio?"
A: "Si ya tienes uno, lo conectamos nosotros. Si no, te ayudamos a registrarlo."

Q: "¿Tengo que saber de tecnología?"
A: "No. Tú nos das el contenido, nosotros hacemos todo lo demás."

Q: "¿Hay costes ocultos?"
A: "No. El precio mensual incluye hosting, actualizaciones y soporte."

File: components/FAQ.tsx
Pull all FAQ content from BUILD.md if provided — use defaults only as fallback.
```

---

### COMP-CNT-05 — Animated Stat Counters
**21st.dev category:** Numbers (18 components)
**Browse:** https://21st.dev/s/numbers
**Used in:** Stats section — specific numbers reinforce trust
**CLAUDE.md alignment:** NEVER round numbers (47 not 50, €189 not €200)

```
CLAUDE CODE PROMPT — COMP-CNT-05
──────────────────────────────────
Use the Magic MCP to find an animated number counter component from 21st.dev.
Must be scroll-triggered (IntersectionObserver or whileInView), runs once.

Adapt it to Vitrina brand.md:
COUNTER ITEM:
- Number: Cormorant 300, 64px, color #C4A96A, line-height 1
  Suffix (e.g. "+", "días", "€"): Cormorant 300, 28px, color #8C8C84
- Label: Jost 500, 12px, uppercase, tracking 0.2em, color #8C8C84, mt 8px
- Animation: count up from 0 to target, 1200ms, ease-out
- Trigger: once on scroll into view (never re-triggers)

LAYOUT: 3–4 stats in a row (flex, gap 48px desktop; 2×2 grid mobile)

CONTENT (NEVER use round numbers — CLAUDE.md rule):
Use real numbers from BUILD.md. Default examples (replace with real data):
- "47" + " clientes" → "Proyectos publicados"
- "4.8" + "/5" → "Valoración media"
- "5" + " días" → "Tiempo de entrega"
- "€19" + "/mes" → "Precio de entrada"

File: components/Stats.tsx
Pull real numbers from BUILD.md if provided.
```

---

### COMP-CNT-06 — Service Cards with Hover Effects
**21st.dev category:** Cards (79 components)
**Browse:** https://21st.dev/s/cards
**Used in:** Services section — alternative to bento grid (COMP-MKT-03)
**CLAUDE.md alignment:** All interactive states, brand-tinted shadows

```
CLAUDE CODE PROMPT — COMP-CNT-06
──────────────────────────────────
Use the Magic MCP to find a feature or service card component from 21st.dev
with rich hover states. Prefer tilt + depth effect OR reveal animation.

Adapt it to Vitrina brand.md:
CARD BASE:
- bg: #FDFCF9, border: 0.5px solid #C8C4B8, radius: 3px, padding: 32px 28px
- shadow-sm-ink from brand.md (default)

ALL FOUR STATES (mandatory — CLAUDE.md):
1. Default: as above
2. Hover:
   - border-color: #C4A96A
   - shadow-md-ink from brand.md
   - translateY(-4px)
   - icon color: #C4A96A (was #8C8C84)
   - Framer Motion: spring stiffness 80, damping 18
3. Focus-visible: outline 2px solid #C4A96A, outline-offset 3px
4. Active: translateY(-2px), shadow-sm-ink

CARD CONTENT:
- Icon area: 48px × 48px, bg rgba(196,169,106,0.08), radius 3px
  Lucide icon or custom SVG, color #8C8C84 → hover #C4A96A
- Title: Cormorant 600, 20px, tracking 0.04em, color #141410, mt 20px
- Description: Jost 300, 15px, color #8C8C84, line-height 1.7, mt 10px
- "Saber más →": Jost 400, 12px, color #C4A96A, mt 16px, appears on hover

TILT EFFECT (optional — enable when MOTION_INTENSITY ≥ 7):
- Framer Motion useMotionValue for rotateX/rotateY (same as COMP-INT-01 pattern)
- Max rotation: 6deg, perspective: 800px

File: components/ServiceCards.tsx
Content: pull ALL services from BUILD.md
```

---

## ─────────────────────────────────────────
## MOTION & AMBIENT
## ─────────────────────────────────────────

### COMP-MTN-01 — Ambient Gradient Background
**21st.dev category:** Backgrounds (33 components)
**Browse:** https://21st.dev/s/backgrounds
**Used in:** Dark sections (hero, CTA) — ambient depth without video
**CLAUDE.md alignment:** 20s+, opacity 0.02–0.04, pointer-events none, NEVER > 30% viewport

```
CLAUDE CODE PROMPT — COMP-MTN-01
──────────────────────────────────
Use the Magic MCP to find an animated gradient or blob background component
from 21st.dev. Must be CSS-only or minimal JS — no heavy canvas/WebGL.

Adapt it to Vitrina brand.md (CLAUDE.md ambient blob rules):
BLOB ELEMENT:
- position: fixed, z-index: -1, pointer-events: none
- width: 600px, height: 600px, border-radius: 50%
- background: radial-gradient(circle, rgba(196,169,106,0.06), transparent 70%)
- animation: drift 25s ease-in-out infinite alternate
  @keyframes drift {
    0%   { transform: translate(0, 0) scale(1); }
    33%  { transform: translate(60px, -40px) scale(1.05); }
    66%  { transform: translate(-30px, 50px) scale(0.97); }
    100% { transform: translate(40px, 20px) scale(1.02); }
  }
- opacity: 0.04 (CLAUDE.md rule — max 0.04)
- animation-duration: NEVER below 20s (subtle, never attention-grabbing)

SECOND BLOB (optional — opposite corner):
- Same config, animation-delay: -12s, different position
- Slightly different color: rgba(20,20,16,0.08) — ink tint

PERFORMANCE:
- will-change: transform (GPU only)
- @media (prefers-reduced-motion: reduce) { animation: none; }
- backdrop-filter: NEVER on this element — it's decoration only
- Only one instance per page (not per section)

File: components/ui/AmbientBackground.tsx
Import into app/layout.tsx — runs site-wide
```

---

### COMP-MTN-02 — WebGL / Shader Hero Background
**21st.dev category:** Shaders (15 components — NEW)
**Browse:** https://21st.dev/s/shaders
**Used in:** Hero — ONLY when no hero photo/video is available
**CLAUDE.md alignment:** CSS/canvas fallback for media-less launches

```
CLAUDE CODE PROMPT — COMP-MTN-02
──────────────────────────────────
Use the Magic MCP to find a GLSL shader or WebGL background component
from 21st.dev (Shaders category — new, 15 variants).
Choose a noise/fluid simulation that feels organic, NOT geometric or neon.

Adapt it to Vitrina brand.md:
SHADER COLORS:
- Palette: #141410, #2A2A24, and subtle #C4A96A highlights at max 5% opacity
- NO bright colors, NO neon, NO purple — Vitrina's ink-and-gold palette only
- Speed: very slow drift (timeScale: 0.3 or equivalent)
- Feel: like dark ink moving through water — Seijaku (active tranquility)

PERFORMANCE GATES:
- Check: window.matchMedia('(prefers-reduced-motion: reduce)')
  If true: render static bg #141410, skip WebGL entirely
- Check: navigator.hardwareConcurrency < 4
  If true: fall back to COMP-MTN-01 CSS gradient animation
- canvas element must have: aria-hidden="true"
- Max canvas size: 1920×1080 — scale down on larger screens
- Frame rate cap: requestAnimationFrame with 30fps cap on mobile

FALLBACK CHAIN (GENERATE_MEDIA_LIST.md Rule 2):
  1. WebGL shader (this component) — if GPU capable + no reduced motion
  2. COMP-MTN-01 CSS gradient blob — if WebGL not available
  3. Static #141410 background — absolute fallback

File: components/ShaderBackground.tsx
Only import in Hero.tsx when no media_assets/hero-01.* file exists.
```

---

### COMP-CNT-07 — Map Embed
**21st.dev category:** Maps (2 components — limited)
**Browse:** https://21st.dev/s/maps
**Used in:** Contact page — location-based businesses only
**CLAUDE.md alignment:** Only for businesses with a physical location in BUILD.md

```
CLAUDE CODE PROMPT — COMP-CNT-07
──────────────────────────────────
Note: 21st.dev has only 2 map components and they may not include Google Maps.
Use the Magic MCP to check what's available in the Maps category.
If no suitable component found, implement natively as follows:

NATIVE GOOGLE MAPS EMBED (fallback — no MCP component needed):
<div style={{ position: 'relative', height: '400px', borderRadius: '3px', overflow: 'hidden' }}>
  <iframe
    src={`https://www.google.com/maps/embed?pb=${encodeFromBUILD.md}`}
    width="100%" height="100%"
    style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }}
    allowFullScreen loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Ubicación de [business name from BUILD.md]"
  />
  <div style={{
    position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
    background: 'linear-gradient(to top, rgba(20,20,16,0.6), transparent)',
    pointerEvents: 'none'
  }} />
</div>

STYLING:
- filter: grayscale(100%) — monochrome map matches brand palette
- Gold pin marker: not possible via embed — add CSS absolute pin overlay if needed
- Border-radius: 3px (radius-sm)

COOKIES:
- Google Maps embed sets cookies — add to cookie consent list in BUILD.md
- Lazy load: add loading="lazy" and IntersectionObserver for privacy

Only include for businesses where BUILD.md specifies a physical location.
File: components/Map.tsx
Embed URL: pull exact Google Maps URL from BUILD.md
```

---

## ─────────────────────────────────────────
## GLOBAL USAGE RULES
## ─────────────────────────────────────────

```
WHEN USING ANY COMPONENT FROM THIS FILE:

1. READ brand.md FIRST — never use raw hex values in components
   All colors via CSS variables: var(--color-primary), var(--color-accent), etc.

2. READ BUILD.md BEFORE pasting any prompt
   Replace all "[from BUILD.md]" tags with actual client content
   Never leave placeholder content in production builds

3. MAGIC MCP WORKFLOW:
   - If Magic MCP is connected: paste prompt → Claude Code fetches → adapts
   - If Magic MCP not connected: use the prompt as a design spec and build natively
   - Never block the build because a specific 21st.dev component wasn't found
   - The prompt is the spec. The MCP is a sourcing shortcut.

4. ADAPTATION PRIORITY ORDER:
   a. Brand.md tokens → always override component defaults
   b. BUILD.md content → always use real content, never placeholders
   c. CLAUDE.md rules → always apply (transitions, accessibility, Spanish)
   d. 21st.dev component → visual inspiration and interaction pattern

5. SCREENSHOT AFTER EACH COMPONENT:
   - Run: npm run dev → screenshot localhost:3000
   - Check CLAUDE.md review checklist
   - Minimum 2 review rounds before moving to next component

6. BANNED PATTERNS (CLAUDE.md hard rules — also apply here):
   ✗ transition-all
   ✗ Raw hex values in components
   ✗ Centered hero when VARIANCE > 4
   ✗ Inter or Roboto as headline font
   ✗ Lorem ipsum anywhere
   ✗ English in any user-facing text
   ✗ Glassmorphism on flat washi (#F4F1EA) backgrounds
   ✗ backdrop-filter on elements > 30% viewport
   ✗ useState for magnetic button — only useMotionValue
   ✗ AI copywriting: Elevate, Seamless, Unleash, Revolutionary
```

---

## ─────────────────────────────────────────
## QUICK REFERENCE — BUILD.md SECTION MAP
## ─────────────────────────────────────────

When writing BUILD.md for a new client, add this block to each section:

```markdown
## [SECTION NAME]
Component: [COMP-ID from this file]
Prompt: See COMPONENTS_21ST.md → [COMP-ID]
Content:
  - [field 1]: [actual client content]
  - [field 2]: [actual client content]
Notes: [any client-specific adaptations]
```

### Standard homepage BUILD.md section order + component mapping:

| Build Order | Section Name         | Component ID   |
|-------------|----------------------|----------------|
| 0           | Tailwind config      | (native — brand.md) |
| 1           | Announcement banner  | COMP-MKT-01    |
| 2           | Navigation           | COMP-NAV-01 + COMP-NAV-02 |
| 3           | Hero                 | COMP-HERO-01 or COMP-HERO-02 |
| 3a          | Hero headline        | COMP-HERO-03 + COMP-HERO-04 |
| 4           | Client logos         | COMP-MKT-05    |
| 5           | How it works         | COMP-MKT-04    |
| 6           | Services / features  | COMP-MKT-03 or COMP-CNT-06 |
| 7           | Testimonials         | COMP-MKT-06    |
| 8           | Stats                | COMP-CNT-05    |
| 9           | Before/after         | COMP-MKT-07    |
| 10          | Projects / gallery   | COMP-INT-03 or COMP-CNT-02 |
| 11          | FAQ                  | COMP-CNT-04    |
| 12          | Bottom CTA           | COMP-MKT-08    |
| 13          | Contact section      | COMP-CNT-01    |
| 14          | Footer               | COMP-MKT-09    |
| 15          | Mobile dock          | COMP-INT-02    |
| 16          | Ambient background   | COMP-MTN-01    |
| 17          | Mobile 390px review  | (no component — review pass) |
| 18          | Performance build    | npm run build  |

---
# END OF COMPONENTS_21ST.md
# Version 1.0 · Vitrina Studio · Marzo 2026
