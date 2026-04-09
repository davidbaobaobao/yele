# Brand Tokens — Vitrina Studio
# Version: 2.1
# Updated: 28/03/2026
# Reference: see brand_sheet.png for visual reference
# Philosophy: Japanese-inspired minimalism — quiet authority, craft over noise

---

## Colors

```css
--color-primary:    #141410;   /* Tinta    — headlines, dark backgrounds, primary buttons */
--color-secondary:  #2A2A24;   /* Carbón   — dark panels, left column, footer */
--color-accent:     #C4A96A;   /* Kintsugi — CTAs, gold rule, logo punctuation, links */
--color-fog:        #8C8C84;   /* Niebla   — muted text, labels, metadata */
--color-neutral:    #C8C4B8;   /* Piedra   — borders, dividers, rules */
--color-light:      #F4F1EA;   /* Washi    — page background, surface, cards */
--color-white:      #FDFCF9;   /* Blanco   — inner card surfaces, form elements */
```

### RGB values (for shadows, overlays, glassmorphism)
```
Primary RGB:   20, 20, 16      use in rgba() for ink-tinted glass and shadows
Accent RGB:    196, 169, 106   use in rgba() for kintsugi gold glow borders
Fog RGB:       140, 140, 132   use in rgba() for muted overlays
Neutral RGB:   200, 196, 184   use in rgba() for light-mode glass borders
```

### CSS custom properties
```css
:root {
  --color-primary:   #141410;
  --color-secondary: #2A2A24;
  --color-accent:    #C4A96A;
  --color-fog:       #8C8C84;
  --color-neutral:   #C8C4B8;
  --color-light:     #F4F1EA;
  --color-white:     #FDFCF9;
}
```

### Dark mode overrides
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:      #141410;
    --color-surface: #2A2A24;
    --color-text:    #F4F1EA;
    --color-muted:   #8C8C84;
    --color-border:  rgba(200, 196, 184, 0.12);
    --color-accent:  #C4A96A;
  }
}
```

---

## Typography

### Font stack
```css
--font-display: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
--font-body:    'Jost', 'Helvetica Neue', Arial, sans-serif;
```

### Google Fonts import
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap" rel="stylesheet">
```

### next/font import (preferred in Next.js)
```js
import { Cormorant_Garamond, Jost } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-body',
})
```

### Type scale
```
H1:    56px / display / weight 300 / italic   / tracking -0.03em / lh 1.05
H2:    40px / display / weight 600 / normal   / tracking +0.06em UPPERCASE / lh 1.15
H3:    28px / display / weight 400 / normal   / tracking 0       / lh 1.3
H4:    20px / display / weight 600 / normal   / tracking +0.04em / lh 1.4
Body:  17px / body    / weight 300 / normal   / tracking 0       / lh 1.8
Small: 14px / body    / weight 300 / normal   / tracking 0       / lh 1.6
Label: 12px / body    / weight 500 / UPPERCASE / tracking 0.2em  / lh 1.4
Btn:   10px / body    / weight 400 / UPPERCASE / tracking 0.25em
```

### Key typography rules
- Cormorant italic = emotional weight — use for main titles and hero text
- Jost never exceeds weight 400 in body copy — lightness IS the brand
- Minimum body size: 17px — never smaller
- Label tracking always 0.15em–0.25em
- Never use Inter, Roboto, or system-ui for any visible text

---

## Spacing

```
4xs:  4px   |  3xs: 8px   |  2xs: 12px  |  xs:  16px
sm:   24px  |  md:  32px  |  lg:  48px  |  xl:  64px
2xl:  96px  |  3xl: 128px |  4xl: 192px

Section vertical padding:  py-16 md:py-24 lg:py-32
Inner cell padding:        24px desktop / 20px tablet / 16px mobile
Hero min-height:           100vh desktop / 80vh mobile
```

---

## Border Radius

```css
--radius-xs:   1px;    /* buttons */
--radius-sm:   3px;    /* cards, inputs, glass panels */
--radius-md:   6px;    /* panels, modals */
--radius-lg:   10px;   /* large containers */
--radius-full: 9999px; /* pills — use sparingly */
```

---

## Shadows

All shadows tinted with brand ink — never generic black.

```css
--shadow-sm:
  0 1px 2px rgba(20, 20, 16, 0.04),
  0 2px 8px rgba(20, 20, 16, 0.06);

--shadow-md:
  0 2px 4px rgba(20, 20, 16, 0.04),
  0 6px 20px rgba(20, 20, 16, 0.08),
  0 16px 40px rgba(196, 169, 106, 0.04);

--shadow-lg:
  0 4px 8px rgba(20, 20, 16, 0.04),
  0 12px 32px rgba(20, 20, 16, 0.10),
  0 32px 64px rgba(20, 20, 16, 0.08);

--shadow-gold:
  0 2px 12px rgba(196, 169, 106, 0.15),
  0 8px 32px rgba(196, 169, 106, 0.08);
```

---

## Glassmorphism

Glass effects are approved on dark and photography backgrounds.
They are banned on flat washi/light surfaces and with neon or tech colors.

### Approved — dark background or photography

```css
/* Ink-tinted glass panel — the Vitrina glass recipe */
.glass-panel {
  background:              rgba(20, 20, 16, 0.35);
  border:                  0.5px solid rgba(196, 169, 106, 0.25);
  backdrop-filter:         blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius:           var(--radius-sm);
}
@supports not (backdrop-filter: blur(1px)) {
  .glass-panel { background: rgba(20, 20, 16, 0.88); }
}

/* Gold-accent glass — CTAs floating over dark hero */
.glass-cta {
  background:              rgba(196, 169, 106, 0.12);
  border:                  0.5px solid rgba(196, 169, 106, 0.5);
  backdrop-filter:         blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius:           var(--radius-xs);
}

/* Sticky nav over hero photography */
.glass-nav {
  background:              rgba(20, 20, 16, 0.45);
  border-bottom:           0.5px solid rgba(196, 169, 106, 0.15);
  backdrop-filter:         blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
```

### Conditionally approved — textured/photo light surface

```css
/* Only when there is rich texture or photography behind the element */
.glass-light {
  background:              rgba(253, 252, 249, 0.65);
  border:                  0.5px solid rgba(200, 196, 184, 0.5);
  backdrop-filter:         blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius:           var(--radius-sm);
}
/* NEVER apply on flat washi (#F4F1EA) — the effect disappears */
```

### Banned glass patterns
```
Never: rgba with purple, blue, teal, or neon base colors
Never: glowing box-shadows with color (neon glow borders)
Never: glass on plain white or flat washi surface
Never: more than 3 glass elements per page
Never: backdrop-filter on elements covering >30% of viewport
Never: glass on text-heavy content where blur hurts readability
```

### Performance
```css
/* Cap blur at 16px — more rarely adds visual value */
/* Add will-change only on animated glass elements */
.glass-animated {
  will-change:             transform, opacity;
  backdrop-filter:         blur(12px);
}
/* On scroll: animate opacity only — never animate blur value */
```

---

## Buttons

```css
.btn-primary {
  background: var(--color-primary); color: var(--color-light);
  border: none; border-radius: var(--radius-xs);
  padding: 10px 22px; font-size: 10px; font-weight: 400;
  letter-spacing: 0.25em; text-transform: uppercase;
  transition: background 200ms, transform 200ms;
}
.btn-primary:hover  { background: var(--color-secondary); transform: translateY(-1px); }
.btn-primary:active { transform: translateY(0); }
.btn-primary:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }

.btn-secondary {
  background: transparent; color: var(--color-primary);
  border: 0.5px solid var(--color-primary); border-radius: var(--radius-xs);
  padding: 9px 21px; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase;
}
.btn-secondary:hover { background: var(--color-primary); color: var(--color-light); }

.btn-accent {
  background: transparent; color: var(--color-accent);
  border: 0.5px solid var(--color-accent); border-radius: var(--radius-xs);
  padding: 9px 21px; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase;
}
.btn-accent:hover { background: var(--color-accent); color: var(--color-primary); }

/* Glass CTA — over dark hero photography only */
.btn-glass {
  background: rgba(196, 169, 106, 0.12); color: var(--color-accent);
  border: 0.5px solid rgba(196, 169, 106, 0.5);
  backdrop-filter: blur(8px); border-radius: var(--radius-xs);
  padding: 9px 21px; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase;
}
```

---

## Logo

```
File:           brand_assets/logo_vitrina.svg
Wordmark:       "Vitrina." — Cormorant Garamond 300, letter-spacing -1.5px
Gold dot:       "." in #C4A96A
Sub-rule:       28px gold (#C4A96A) horizontal rule, 0.5px height
Sub-text:       "STUDIO" — Jost 200, 5px letter-spacing, uppercase, color #8C8C84

Minimum width:  120px
Clear space:    Equal to height of logo on all 4 sides

Variants:
  On dark bg:   Wordmark #F4F1EA + gold accent
  On light bg:  Wordmark #141410 + gold accent
  On gold bg:   Wordmark #141410 + ink accent at 50% opacity
  On glass nav: Same as dark bg variant

Never:          Stretch · Rotate · Recolor · Add effects · Add shadow
```

---

## Imagery Style

```
Color temp:    Warm neutral — washi and ink tones, never cool/clinical
Treatment:     linear-gradient(to top, rgba(20,20,16,0.6), transparent)
Blend mode:    mix-blend-multiply at 10–15% with Tinta (#141410)
Style:         Editorial · Documentary · Authentic — never staged stock
Finish:        90% saturation desaturation for timelessness
Grain:         SVG noise overlay at 2–3% opacity for organic warmth

Avoid:         Cool blues · Overexposed white · Generic handshake/laptop stock
               Perfectly lit white-background studio shots
               Anything that reads as AI-generated photography
```

---

## Animations

```
Easing enter:  cubic-bezier(0.16, 1, 0.3, 1)
Easing exit:   cubic-bezier(0.4, 0, 1, 1)
Spring:        stiffness 80 / damping 18

Duration:
  Micro:       150–250ms
  Standard:    300–400ms
  Cinematic:   600–800ms
  Max:         500ms (never exceed for standard UI)
  Exit:        60–70% of enter duration

Scroll reveals:  translateY(16px) + opacity 0 over 600ms
Stagger:         30–50ms per item via --index
Magnetic btns:   useMotionValue + useTransform — NEVER useState
Ambient blob:    20s+ / opacity 0.02–0.04 / fixed / pointer-events:none
Glass on scroll: animate opacity only — never animate blur value
```

---

## Design Principles

```
Ma      (間)   Negative space. Silence around every element is intentional.
Wabi    (侘)   Austere beauty. Removing is designing. Less is the decision.
Shibui  (渋)   Subtle elegance. Noticed on second look, never the first.
Seijaku (静寂) Active tranquility. The design calms — never pressures.
```

---

## Tailwind Config

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        ink:      '#141410',
        carbon:   '#2A2A24',
        fog:      '#8C8C84',
        stone:    '#C8C4B8',
        washi:    '#F4F1EA',
        blanc:    '#FDFCF9',
        kintsugi: '#C4A96A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'Helvetica Neue', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.2em',
        btn:   '0.25em',
      },
      borderRadius: { xs: '1px' },
      boxShadow: {
        'sm-ink': '0 1px 2px rgba(20,20,16,0.04), 0 2px 8px rgba(20,20,16,0.06)',
        'md-ink': '0 2px 4px rgba(20,20,16,0.04), 0 6px 20px rgba(20,20,16,0.08), 0 16px 40px rgba(196,169,106,0.04)',
        'lg-ink': '0 4px 8px rgba(20,20,16,0.04), 0 12px 32px rgba(20,20,16,0.10), 0 32px 64px rgba(20,20,16,0.08)',
        gold:     '0 2px 12px rgba(196,169,106,0.15), 0 8px 32px rgba(196,169,106,0.08)',
      },
    },
  },
}
```

---

## Quick Reference

| Token           | Value                    | Use                              |
|-----------------|--------------------------|----------------------------------|
| primary         | #141410                  | Text, dark bg, primary buttons   |
| secondary       | #2A2A24                  | Panels, footer, dark surfaces    |
| accent          | #C4A96A                  | CTAs, gold rule, logo dot        |
| fog             | #8C8C84                  | Muted text, labels               |
| neutral         | #C8C4B8                  | Borders, dividers                |
| light           | #F4F1EA                  | Page bg, surfaces, cards         |
| white           | #FDFCF9                  | Inner surfaces, form fields      |
| font-display    | Cormorant Garamond        | Titles, H1–H4, hero              |
| font-body       | Jost                      | Body, buttons, labels, UI        |
| radius-xs       | 1px                       | Buttons                          |
| radius-sm       | 3px                       | Cards, inputs, glass panels      |
| Glass dark      | rgba(20,20,16,0.35)       | Ink-tinted glass on dark bg      |
| Glass border    | rgba(196,169,106,0.25)    | Kintsugi edge on glass           |
| Glass nav       | rgba(20,20,16,0.45)       | Sticky nav over photography      |
| Glass light     | rgba(253,252,249,0.65)    | On textured/photo light bg only  |
