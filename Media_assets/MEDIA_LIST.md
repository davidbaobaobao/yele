# Media Asset List — Vitrina Studio
# Generated: 2026-03-28
# Total assets required: 11
# Photography session: None required — stock video + generated/designed assets only

---

## SUMMARY TABLE

| ID | Section | Format | Dimensions | Priority | Source |
|---|---|---|---|---|---|
| motion-01 | Homepage Hero | Video MP4+WebM | 1920×1080 | 🔴 Critical | Stock video |
| hero-poster-01 | Homepage Hero (fallback) | Photo WebP+JPG | 1920×1080 | 🔴 Critical | Stock / Design |
| og-01 | Meta / Social sharing | Image JPG | 1200×630 | 🔴 Critical | Design |
| favicon-01 | Browser tab / PWA | Icon PNG+SVG | 512×512 | 🔴 Critical | From logo SVG |
| portfolio-ss-01 | Portfolio grid | Screenshot WebP | 1200×800 | 🟡 Important | Generated |
| portfolio-ss-02 | Portfolio grid | Screenshot WebP | 1200×800 | 🟡 Important | Generated |
| portfolio-ss-03 | Portfolio grid | Screenshot WebP | 1200×800 | 🟡 Important | Generated |
| portfolio-ss-04 | Portfolio grid | Screenshot WebP | 1200×800 | 🟡 Important | Generated |
| portfolio-ss-05 | Portfolio grid | Screenshot WebP | 1200×800 | 🟡 Important | Generated |
| portfolio-ss-06 | Portfolio grid | Screenshot WebP | 1200×800 | 🟡 Important | Generated |
| testimonial-avatar-01 | Testimonios | Photo WebP | 96×96 | 🟢 Optional | Stock / Illustration |
| testimonial-avatar-02 | Testimonios | Photo WebP | 96×96 | 🟢 Optional | Stock / Illustration |
| testimonial-avatar-03 | Testimonios | Photo WebP | 96×96 | 🟢 Optional | Stock / Illustration |

Priority legend:
🔴 Critical — site cannot launch without this
🟡 Important — significantly impacts quality; CSS placeholder acceptable temporarily
🟢 Optional — nice to have, can use initials/avatar placeholder post-launch

Source legend:
Stock video — licensed from Pexels/Pixabay video, free for commercial use
Design — created in Figma, Photoshop, or code export
Generated — rendered screenshot from browser of the actual built component
From logo SVG — derived directly from brand_assets/logo_vitrina.svg

---

## DETAILED ASSET BRIEFS

### HERO SECTION

---

#### motion-01 — Hero background video
```
Section:     Homepage Hero (Section 1A)
Usage:       Full-bleed background video, autoplay muted loop, behind hero text
Format:      Video — MP4 (H.264) primary + WebM (VP9) fallback
Dimensions:  1920×1080 minimum / 16:9 ratio / 4K source preferred, exported at 1080p
File format: MP4 + WebM pair
File size:   MP4 ≤ 8MB / WebM ≤ 6MB (compress with HandBrake or ffmpeg)
Duration:    10–15 seconds, seamless loop
Priority:    🔴 Critical
Source:      Stock video (Pexels / Pixabay)
Filename:    hero-video.mp4 / hero-video.webm
```

**Visual Brief:**
Slow-motion footage of a designer or developer working at a desk — hands on keyboard,
cursor moving across a clean monitor showing design work (Figma, a beautiful website, or
abstract code). Warm, low-contrast lighting. The mood is calm, focused, professional.
Alternatively: an abstract cinematic shot of light refracting through glass or water —
ink dropping into water in slow motion, paper grain in macro, or architectural geometric
shapes moving slowly. The video MUST read as sophisticated and editorial, not tech-startup.
Dark or neutral-warm palette that works under the gradient overlay (#0A0E14 tinted).

**Technical Notes:**
- Shot or sourced at ≥60fps, delivered at 24fps for cinematic slow-motion feel
- No audio needed (muted autoplay)
- Seamless loop: first and last frame should be visually compatible
- Compress: `ffmpeg -i input.mp4 -vcodec h264 -crf 23 -preset slow -movflags +faststart hero-video.mp4`
- WebM: `ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 33 -b:v 0 hero-video.webm`
- The video sits behind overlay: `linear-gradient(to bottom, rgba(10,14,20,0.2) 0%, rgba(10,14,20,0.6) 80%, rgba(10,14,20,0.95) 100%)`

**Stock Search Terms:**
- Pexels.com — "designer working laptop slow motion"
- Pexels.com — "hands typing keyboard dark cinematic"
- Pixabay.com — "ink water slow motion dark"
- Pexels.com — "abstract light dark bokeh loop"
- Pexels.com — "office working night cinematic"

**What to AVOID:**
- Startup clichés: people fist-bumping, diverse team around a whiteboard, neon-lit coworking
- AI-generated or CGI-looking video
- POV laptop shots where the screen content is clearly visible (licensing/copyright)
- Cool blue tones, pure white backgrounds, overexposed bright office footage
- Any recognizable logos, faces looking directly at camera

---

#### hero-poster-01 — Hero video fallback / poster frame
```
Section:     Homepage Hero (Section 1A) — <video poster="...">
Usage:       Displayed before video loads (especially on mobile) and as
             CSS fallback if video fails to play
Format:      Photo / still frame
Dimensions:  1920×1080 (export WebP for primary, JPG for legacy)
File format: WebP + JPG
Quality:     Retina-ready (export at 2x, compress to ≤ 300KB)
Priority:    🔴 Critical
Source:      Extract from motion-01 video (best frame) or separate stock still
Filename:    hero-poster.webp / hero-poster.jpg
```

**Visual Brief:**
A single frame extracted from motion-01, chosen for maximum impact as a still image.
The frame should show clear compositional balance — subject slightly off-center or
centered, with intentional negative space for the headline text to breathe over it.
Avoid frames with motion blur (unless the blur itself is beautiful and abstract).

**Technical Notes:**
- Extract in ffmpeg: `ffmpeg -i hero-video.mp4 -ss 00:00:03 -vframes 1 hero-poster.jpg`
- Convert to WebP: `cwebp -q 85 hero-poster.jpg -o hero-poster.webp`
- Target size: ≤ 200KB WebP / ≤ 350KB JPG

**What to AVOID:**
- A mid-motion blurry frame that looks accidental
- Any visible UI element that would look broken as a static image

---

### META / SEO

---

#### og-01 — OpenGraph social sharing image
```
Section:     <head> meta tags — og:image, twitter:image
Usage:       Shown when the URL is shared on WhatsApp, LinkedIn, Twitter, iMessage
Format:      Image — designed in Figma or exported from code
Dimensions:  1200×630 px exactly
File format: JPG (no transparency needed) — ≤ 150KB
Quality:     72dpi web
Priority:    🔴 Critical
Source:      Design — create in Figma
Filename:    og-image.jpg
```

**Visual Brief:**
Dark background (#0F1923 or #141410) with the Vitrina Studio logo centered or
left-aligned. Large typographic headline: "Tu página web. Profesional. 19,90 €/mes."
in DM Serif Display — white text, amber accent on the price. A subtle grain texture
overlay (2–3% opacity SVG noise). Optional: a faint grid pattern or geometric line in
amber at very low opacity. The image must read clearly as a thumbnail at 400×210px.

**Technical Notes:**
- Design at 1200×630, export as JPG at quality 85
- Test by pasting the URL in the Sharing Debugger: developers.facebook.com/tools/debug
- Also test on: cards-dev.twitter.com/validator/home
- Save to /public/og-image.jpg for Next.js (<meta property="og:image" content="/og-image.jpg">)

**What to AVOID:**
- Too much text (≥8 words in large size becomes unreadable at thumbnail size)
- Light backgrounds (the card gets lost in WhatsApp/LinkedIn feeds)
- Using the logo SVG without sufficient padding or contrast

---

#### favicon-01 — Favicon and app icons
```
Section:     Browser tab, PWA manifest, Apple touch icon
Usage:       Browser tab icon, home screen icon (if PWA), bookmark icon
Format:      SVG (primary) + PNG exports
Dimensions:  SVG (scalable) + PNG at: 16×16, 32×32, 180×180, 512×512
File format: SVG + PNG set
Priority:    🔴 Critical
Source:      Derived from brand_assets/logo_vitrina.svg — extract mark or use "V." monogram
Filename:    favicon.svg / favicon-16.png / favicon-32.png / apple-touch-icon.png / icon-512.png
```

**Visual Brief:**
Use the "V." monogram from the Vitrina logo — Cormorant Garamond weight 300, the letter "V"
in ink (#141410) on washi (#F4F1EA) background, with the gold dot "." in kintsugi (#C4A96A).
For dark-mode browser tabs, provide an alternate favicon with the V in washi on ink background.
The favicon must be legible at 16×16px — the dot alone may need to be removed at that size.

**Technical Notes:**
- In Next.js App Router: place favicon.svg in /app/ directory (auto-detected)
- For PNG exports use: realfavicongenerator.net (paste the SVG)
- Add to app/layout.tsx:
  ```
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' }
  ```

**What to AVOID:**
- Using the full wordmark "Vitrina." — too wide, unreadable at 16px
- The full logo with "STUDIO" subtext — will be invisible at small sizes

---

### PORTFOLIO SECTION

*Note: At launch, Section 3 (Portfolio) uses CSS gradient placeholders as specified in BUILD.md.
The 6 assets below are post-launch replacements — real screenshots of the 6 demo client sites
once they are built. They are marked Important (not Critical) because the CSS placeholders
are an acceptable temporary state.*

---

#### portfolio-ss-01 — Fontanería Martín · Madrid
```
Section:     Portfolio grid (Section 3) — card 1
Usage:       3:2 ratio card image, shown in grid with sector badge overlay
Format:      Screenshot
Dimensions:  1200×800 px (3:2 ratio) — crop to show above-the-fold of the demo site
File format: WebP preferred, JPG fallback
Priority:    🟡 Important (CSS placeholder acceptable at launch)
Source:      Generated — browser screenshot of the built Fontanería Martín demo page
Filename:    portfolio-fontanero-madrid.webp
```

**Visual Brief:**
Full-width browser screenshot of the Fontanería Martín demo website, capturing from
the top of the page to just below the hero section. The dark blue gradient background
(#0d1b2a → #1a3a5c) and the blue ambient blob should be visible. The headline
"Tu fontanero / de confianza." must be legible. The card will be shown at approximately
380×253px in the grid, so contrast and legibility are essential.

**Technical Notes:**
- Take screenshot at 1440px browser width, then crop to 1200×800
- Use browser DevTools > More Tools > Screenshots, or Playwright for automation:
  `page.screenshot({ path: 'portfolio-fontanero-madrid.png', clip: { x:0, y:0, width:1200, height:800 } })`
- Convert to WebP: `cwebp -q 90 input.png -o portfolio-fontanero-madrid.webp`

---

#### portfolio-ss-02 — Alma Yoga · Valencia
```
Section:     Portfolio grid (Section 3) — card 2
Usage:       3:2 ratio card image
Format:      Screenshot
Dimensions:  1200×800 px
File format: WebP
Priority:    🟡 Important
Source:      Generated — browser screenshot of Alma Yoga demo page
Filename:    portfolio-yoga-valencia.webp
```

**Visual Brief:**
Screenshot of the Alma Yoga demo, showing the dark green gradient hero
(#1a1a2e → #2d4a3e, green blob). Headline "Encuentra / tu centro." visible.
Serene, balanced composition — white text on dark, breathing room.

---

#### portfolio-ss-03 — Barbería El Corte · Barcelona
```
Section:     Portfolio grid (Section 3) — card 3
Usage:       3:2 ratio card image
Format:      Screenshot
Dimensions:  1200×800 px
File format: WebP
Priority:    🟡 Important
Source:      Generated — browser screenshot of Barbería demo page
Filename:    portfolio-barberia-barcelona.webp
```

**Visual Brief:**
Screenshot showing the dark amber-on-black barbería aesthetic
(#1a1008 → #2d1f10, amber blob). Strong typographic hierarchy.
"El mejor corte / de tu barrio." headline prominent.

---

#### portfolio-ss-04 — Clínica Serena · Sevilla
```
Section:     Portfolio grid (Section 3) — card 4
Usage:       3:2 ratio card image
Format:      Screenshot
Dimensions:  1200×800 px
File format: WebP
Priority:    🟡 Important
Source:      Generated — browser screenshot of Clínica Serena demo page
Filename:    portfolio-clinica-sevilla.webp
```

**Visual Brief:**
Teal/dark-blue clinical aesthetic (#0d1f2a → #1a3040, teal blob).
Professional and calm. "Fisioterapia / especializada." headline.

---

#### portfolio-ss-05 — Academia Lumina · Zaragoza
```
Section:     Portfolio grid (Section 3) — card 5
Usage:       3:2 ratio card image
Format:      Screenshot
Dimensions:  1200×800 px
File format: WebP
Priority:    🟡 Important
Source:      Generated — browser screenshot of Academia Lumina demo page
Filename:    portfolio-academia-zaragoza.webp
```

**Visual Brief:**
Purple academic aesthetic (#1a0d2e → #2d1a4a, purple blob).
Aspirational. "Inglés que / abre puertas." headline.

---

#### portfolio-ss-06 — Casa Pepe · Madrid
```
Section:     Portfolio grid (Section 3) — card 6
Usage:       3:2 ratio card image
Format:      Screenshot
Dimensions:  1200×800 px
File format: WebP
Priority:    🟡 Important
Source:      Generated — browser screenshot of Casa Pepe demo page
Filename:    portfolio-restaurante-madrid.webp
```

**Visual Brief:**
Deep red restaurant aesthetic (#2a0d0d → #3d1a10, red blob).
Warm, appetising. "Cocina de / mercado, de verdad." headline.

---

### TESTIMONIOS SECTION (Optional)

*The BUILD.md does not specify avatar images for the testimonial authors.
The three testimonials are text-only cards. Avatars are optional — initials or a
simple monogram placeholder are acceptable and aligned with the minimalist aesthetic.*

---

#### testimonial-avatar-01 — Antonio R. · Fontanero · Sevilla
```
Section:     Testimonios (Section 6)
Usage:       Small circular avatar next to testimonial attribution
Format:      Photo (ideally) or illustrated avatar
Dimensions:  96×96 px (displayed at 48×48 retina)
File format: WebP
Priority:    🟢 Optional
Source:      Stock portrait or UI Avatar generator (ui-avatars.com)
Filename:    avatar-antonio.webp
```

**Visual Brief:**
Friendly male portrait, 40s–50s, trades/craftsman aesthetic. Natural light.
Slight stubble or casual professional look. NOT a suit-and-tie corporate headshot.
If using a generated avatar: initials "AR" on a slate-blue (#1E2B3A) background in
Cormorant Garamond — clean and intentional.

**Stock Search Terms:**
- Pexels: "spanish man portrait tradesman"
- UI avatars (no photo): ui-avatars.com/?name=Antonio+R&background=1E2B3A&color=F5F2EE&size=96

---

#### testimonial-avatar-02 — Marta L. · Peluquera · Bilbao
```
Section:     Testimonios (Section 6)
Usage:       Small circular avatar
Dimensions:  96×96 px
File format: WebP
Priority:    🟢 Optional
Source:      Stock portrait or generated avatar
Filename:    avatar-marta.webp
```

**Visual Brief:**
Warm female portrait, 30s–40s. Beauty/hairdresser professional look.
Natural approachable smile. NOT overly styled or commercial-looking.

**Stock Search Terms:**
- Pexels: "woman portrait hairdresser professional"
- UI avatars: ui-avatars.com/?name=Marta+L&background=2D3F52&color=F5F2EE&size=96

---

#### testimonial-avatar-03 — Pedro S. · Academia de inglés · Zaragoza
```
Section:     Testimonios (Section 6)
Usage:       Small circular avatar
Dimensions:  96×96 px
File format: WebP
Priority:    🟢 Optional
Source:      Stock portrait or generated avatar
Filename:    avatar-pedro.webp
```

**Visual Brief:**
Male portrait, 40s–50s, educator/intellectual look. Bookish, warm.
Natural light, neutral background.

**Stock Search Terms:**
- Pexels: "man teacher portrait warm"
- UI avatars: ui-avatars.com/?name=Pedro+S&background=1E2B3A&color=E8A020&size=96

---

## MOTION ASSETS

### Understanding motion asset types for this project

The BUILD.md specifies a MOTION_INTENSITY of 7 for the hero and 4–5 for other sections.
The majority of motion effects are CSS/JS (no media files needed):
- Carousel auto-drift → CSS requestAnimationFrame (no media file)
- Scroll reveal (translateY + opacity) → IntersectionObserver + CSS (no media file)
- Sector ticker → CSS marquee animation (no media file)
- FAQ accordion → CSS transition (no media file)
- Blob pulse → CSS keyframes (no media file)
- Hover states → CSS/Framer Motion (no media file)

Only the hero background video requires a media file.

---

### motion-01 — Hero background video *(see full brief above)*
```
MOTION ID:    motion-01
TYPE:         hero-video
SECTION:      Homepage Hero (Section 1A)
DURATION:     10–15 seconds
LOOP:         yes — seamless
CONTENT:      Designer at work / abstract ink/light in slow motion
MOOD:         Cinematic, calm, professional, editorial
FILE FORMAT:  MP4 (H.264) + WebM (VP9)
FILE SIZE MAX: MP4 ≤ 8MB / WebM ≤ 6MB
PRIORITY:     🔴 Critical
FALLBACK:     hero-poster-01.webp (static) + CSS animated gradient (specified in BUILD.md)
              CSS fallback: `background: linear-gradient(135deg, #0f1923, #1a2a3a, #0d1f2d)`
              with ambient radial gradients at low opacity + SVG grain texture
```

---

## FILE NAMING CONVENTION

All media files must follow this convention — no spaces, no uppercase, no special chars:

```
hero-video.mp4                          → Hero background video (MP4)
hero-video.webm                         → Hero background video (WebM)
hero-poster.webp                        → Hero video poster frame (WebP)
hero-poster.jpg                         → Hero video poster frame (JPG fallback)
og-image.jpg                            → OpenGraph sharing image
favicon.svg                             → Favicon (SVG, scalable)
apple-touch-icon.png                    → Apple touch icon (180×180)
icon-512.png                            → PWA icon (512×512)
portfolio-fontanero-madrid.webp         → Portfolio card 1
portfolio-yoga-valencia.webp            → Portfolio card 2
portfolio-barberia-barcelona.webp       → Portfolio card 3
portfolio-clinica-sevilla.webp          → Portfolio card 4
portfolio-academia-zaragoza.webp        → Portfolio card 5
portfolio-restaurante-madrid.webp       → Portfolio card 6
avatar-antonio.webp                     → Testimonial avatar 1 (optional)
avatar-marta.webp                       → Testimonial avatar 2 (optional)
avatar-pedro.webp                       → Testimonial avatar 3 (optional)
```

Place all assets in `/public/` for Next.js (served at root URL `/`).
Reference via Next.js `<Image>` component with `src="/hero-poster.webp"` etc.

---

## IMAGE TREATMENT — CONSISTENCY RULE

When using stock video or mixed-source assets, apply consistent treatment to unify:

```css
/* Dark overlay on hero video — applied as absolute-position div */
.hero-overlay {
  background: linear-gradient(
    to bottom,
    rgba(10, 14, 20, 0.2) 0%,
    rgba(10, 14, 20, 0.1) 40%,
    rgba(10, 14, 20, 0.6) 80%,
    rgba(10, 14, 20, 0.95) 100%
  );
}

/* Portfolio card images — desaturate to 90% + brand tint */
.portfolio-card-img {
  filter: saturate(0.9);
  /* On hover: remove filter for full color reveal */
}
```

Grain texture (add as pseudo-element on hero):
```css
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise */
  opacity: 0.03;
  pointer-events: none;
}
```
