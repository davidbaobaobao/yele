'use client'

import { useState, useEffect, useRef } from 'react'
import { TextScramble } from '@/components/TextScramble'

const ELEMENTS = [
  { id: 0, label: 'Restaurante' },
  { id: 1, label: 'Peluquería'  },
  { id: 2, label: 'Coffee Shop' },
  { id: 3, label: 'Fontanero'   },
  { id: 4, label: 'Academia'    },
  { id: 5, label: 'Dentista'    },
  { id: 6, label: 'Entrenador'  },
]
const TOTAL             = ELEMENTS.length
const DURATION_PER_ELEM = 2                   // seconds

// ── Carousel geometry ─────────────────────────────────────────────────────────
const SIDE_W   = 24   // vw — side card width
const CENTER_W = 28   // vw — center card width
const GAP      = 2    // vw — gap between cards
const STEP     = CENTER_W / 2 + GAP + SIDE_W / 2  // 28 vw — distance between card centers
const CARD_H   = '20vh'
const ANIM_MS  = 420

function wrap(i: number) { return ((i % TOTAL) + TOTAL) % TOTAL }

// Left edge X from the 50%-left anchor point, for each relative position k
function leftEdgeVW(k: number): number {
  if (k === 0) return -(CENTER_W / 2)          // -14
  return k * STEP - SIDE_W / 2                  // k=±1 → ±16, k=2 → 44
}

// Tilt & visual config per slot
const SLOTS = [
  { k: -1, tilt: -5, w: SIDE_W,   zIndex: 2, shadow: false },
  { k:  0, tilt:  0, w: CENTER_W, zIndex: 4, shadow: true  },
  { k:  1, tilt:  5, w: SIDE_W,   zIndex: 2, shadow: false },
  { k:  2, tilt:  5, w: SIDE_W,   zIndex: 1, shadow: false },
]

// ── Card visual ────────────────────────────────────────────────────────────────
function CardContent({ label }: { label: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/website_animation_draft.png"
        alt={label}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)',
        height: '50%', zIndex: 1,
      }} />
      <p style={{
        position: 'absolute', bottom: 16, left: 16,
        fontFamily: 'var(--font-inter), sans-serif',
        fontSize: 11, fontWeight: 500,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'white', margin: 0, zIndex: 2,
      }}>
        {label}
      </p>
    </>
  )
}

// ── Hero ───────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrambleKey, setScrambleKey] = useState(0)
  const [videoReady,  setVideoReady]  = useState(false)
  const [baseIndex,   setBaseIndex]   = useState(0)   // which element is the center card
  const [sliding,     setSliding]     = useState(false)

  const videoRef    = useRef<HTMLVideoElement>(null)
  const rafRef      = useRef<number>()
  const timerRef    = useRef<ReturnType<typeof setTimeout>>()
  const isSliding   = useRef(false)

  // rAF: keep activeIndex in sync with video time
  useEffect(() => {
    if (!videoReady) return
    const tick = () => {
      const vid = videoRef.current
      if (vid) {
        const t    = vid.currentTime % (TOTAL * DURATION_PER_ELEM)
        const next = Math.floor(t / DURATION_PER_ELEM)
        setActiveIndex(prev => {
          if (prev !== next) { setScrambleKey(k => k + 1); return next }
          return prev
        })
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [videoReady])

  // Slide carousel when activeIndex advances
  useEffect(() => {
    if (!videoReady) { setBaseIndex(activeIndex); return }
    if (isSliding.current) return   // skip if already mid-slide
    isSliding.current = true
    setSliding(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setBaseIndex(activeIndex)     // snap content to new base (transition:none)
      setSliding(false)
      isSliding.current = false
    }, ANIM_MS)
  }, [activeIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .hero-left {
            left: 50% !important; top: 25% !important;
            transform: translate(-50%, -50%) !important;
            text-align: center;
          }
          .hero-right {
            right: auto !important; left: 50% !important; top: 58% !important;
            transform: translate(-50%, -50%) !important;
            text-align: center;
          }
          .hero-card-left, .hero-card-right, .hero-card-far { display: none !important; }
          .hero-card-center { width: 80vw !important; }
        }
      `}</style>

      {/* Hero: normal 100vh section — no sticky, no scroll grow */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>

        {/* Static fallback */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/hero-static.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
        }} />

        {/* Video */}
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          onCanPlay={() => setVideoReady(true)}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 0.8s ease',
            zIndex: 1,
          }}
        >
          <source src="/hero-dash.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.52) 100%)',
          zIndex: 2,
        }} />

        {/* ── LEFT text — scramble label ── */}
        <div
          className="hero-left"
          style={{
            position: 'absolute',
            left: 'max(24px, 15vw)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        >
          <div style={{
            fontSize: 'clamp(48px, 6vw, 80px)',
            fontFamily: 'var(--font-newsreader), Georgia, serif',
            fontWeight: 600, fontStyle: 'italic',
            color: '#ffffff', lineHeight: 1, letterSpacing: '-0.02em',
            minWidth: 'max-content',
          }}>
            <TextScramble key={scrambleKey} text={ELEMENTS[activeIndex].label} />
          </div>
        </div>

        {/* ── RIGHT text — headline + CTA ── */}
        <div
          className="hero-right"
          style={{
            position: 'absolute',
            right: 'max(24px, 15vw)',
            top: '50%',
            transform: 'translateY(-50%)',
            textAlign: 'right',
            zIndex: 10,
          }}
        >
          <p style={{
            fontFamily: 'var(--font-newsreader), Georgia, serif',
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: 400, color: '#ffffff',
            lineHeight: 1.1, letterSpacing: '-0.02em',
            margin: '0 0 4px',
          }}>
            Tu página web
          </p>
          <p style={{
            fontFamily: 'var(--font-newsreader), Georgia, serif',
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: 700, fontStyle: 'italic',
            color: '#d4a843', lineHeight: 1.1, letterSpacing: '-0.02em',
            margin: '0 0 32px',
          }}>
            por 19€/mes
          </p>
          <a
            href="/registro"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: '#ffffff', color: '#1c1c18',
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 12, fontWeight: 400,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.25s, color 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#d4a843'; e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#1c1c18' }}
          >
            Quiero mi web →
          </a>
        </div>

        {/* ── WHEEL CAROUSEL — anchored to screen center + bottom ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',                   // anchor = horizontal center of viewport
            zIndex: 10,
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 0.8s ease',
            pointerEvents: 'none',
          }}
        >
          {SLOTS.map(slot => {
            const cardIdx = wrap(baseIndex + slot.k)
            const lVW     = leftEdgeVW(slot.k)

            return (
              <div
                key={slot.k}
                className={
                  slot.k === -1 ? 'hero-card-left'   :
                  slot.k ===  0 ? 'hero-card-center' :
                  slot.k ===  1 ? 'hero-card-right'  :
                  'hero-card-far'
                }
                style={{
                  position: 'absolute',
                  bottom: 0,
                  // left edge relative to the 50% anchor
                  left: `${lVW}vw`,
                  width: `${slot.w}vw`,
                  // Slide: translate all cards left by STEP; when done, snap (no transition)
                  transform: sliding ? `translateX(-${STEP}vw)` : 'translateX(0)',
                  transition: sliding
                    ? `transform ${ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
                    : 'none',
                  willChange: 'transform',
                  zIndex: slot.zIndex,
                }}
              >
                {/* Inner wrapper: handles tilt + clip */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: CARD_H,
                  transform: slot.tilt ? `rotate(${slot.tilt}deg)` : 'none',
                  transformOrigin: 'bottom center',
                  borderRadius: '14px 14px 0 0',
                  overflow: 'hidden',
                  boxShadow: slot.shadow ? '0 -16px 60px rgba(0,0,0,0.5)' : undefined,
                }}>
                  <CardContent label={ELEMENTS[cardIdx].label} />
                </div>
              </div>
            )
          })}
        </div>

      </section>
    </>
  )
}
