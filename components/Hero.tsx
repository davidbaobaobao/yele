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
const TOTAL = ELEMENTS.length

// Wraps an index safely into [0, TOTAL)
function wrap(i: number) { return ((i % TOTAL) + TOTAL) % TOTAL }

export default function Hero() {
  const [activeIndex, setActiveIndex]   = useState(0)
  const [scrambleKey, setScrambleKey]   = useState(0)
  const [videoReady, setVideoReady]     = useState(false)
  // Slide direction: 1 = slide left (next), -1 = slide right (prev)
  const [slideDir, setSlideDir]         = useState(0)

  const stickyRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // ── Interval: starts only when video is ready ────────────────
  useEffect(() => {
    if (!videoReady) return
    const id = setInterval(() => {
      setSlideDir(1)
      setActiveIndex(prev => (prev + 1) % TOTAL)
      setScrambleKey(prev => prev + 1)
    }, 2000)
    return () => clearInterval(id)
  }, [videoReady])

  // ── Scroll listener: drives CSS custom properties ─────────────
  useEffect(() => {
    const section = sectionRef.current
    const sticky  = stickyRef.current
    if (!section || !sticky) return

    function onScroll() {
      const rect  = section!.getBoundingClientRect()
      const total = section!.offsetHeight - window.innerHeight
      const p     = Math.max(0, Math.min(1, -rect.top / total))

      // Strip height: 28vh → 85vh
      sticky!.style.setProperty('--strip-h',      (28 + 57 * p) + 'vh')
      // Center card dimensions: 38vw×26vh → 72vw×78vh
      sticky!.style.setProperty('--card-cw',      (38 + 34 * p) + 'vw')
      sticky!.style.setProperty('--card-ch',      (26 + 52 * p) + 'vh')
      // Side card opacity: 1 → 0.4
      sticky!.style.setProperty('--side-opacity', String(1 - 0.6 * p))
      // Left text: move up and shrink
      sticky!.style.setProperty('--text-y',       (-30 * p) + 'vh')
      sticky!.style.setProperty('--text-scale',   String(1 - 0.4 * p))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // init
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const prevIndex = wrap(activeIndex - 1)
  const nextIndex = wrap(activeIndex + 1)

  return (
    <>
      <style>{`
        /* ── Scroll-driven properties with NO transition (scroll = instant) ── */
        [data-sticky] {
          --strip-h:      28vh;
          --card-cw:      38vw;
          --card-ch:      26vh;
          --side-opacity: 1;
          --text-y:       0vh;
          --text-scale:   1;
        }

        /* ── Responsive overrides ── */
        @media (max-width: 767px) {
          .hero-left  {
            left: 50% !important;
            top: 32% !important;
            transform: translate(-50%, -50%) scale(var(--text-scale, 1)) !important;
            text-align: center;
          }
          .hero-right {
            right: auto !important;
            left: 50% !important;
            top: 62% !important;
            transform: translate(-50%, -50%) !important;
            text-align: center;
          }
          .hero-cards  { display: none !important; }
          [data-sticky] { --strip-h: 0vh !important; }
        }

        /* ── Card slide animation ── */
        @keyframes slideInRight  { from { transform: translateX(60px);  opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideInLeft   { from { transform: translateX(-60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .card-center { animation: none; }
      `}</style>

      {/* ── Outer section: 250vh for scroll travel ───────────── */}
      <section
        ref={sectionRef}
        style={{ position: 'relative', height: '250vh', width: '100%' }}
      >

        {/* ── Sticky viewport ──────────────────────────────────── */}
        <div
          ref={stickyRef}
          data-sticky
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            background: '#0a0a0a',
          }}
        >

          {/* ── Static image base layer (always present) ──────── */}
          <div
            aria-hidden
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'url(/hero-static.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0,
            }}
          />

          {/* ── Video — fades in when ready ───────────────────── */}
          <video
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoReady(true)}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: videoReady ? 1 : 0,
              transition: 'opacity 0.8s ease',
              zIndex: 1,
            }}
          >
            <source src="/hero-dash.mp4" type="video/mp4" />
          </video>

          {/* ── Overlay ───────────────────────────────────────── */}
          <div
            aria-hidden
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.55) 100%)',
              zIndex: 2,
            }}
          />

          {/* ── LEFT — scrambling industry label ─────────────── */}
          <div
            className="hero-left"
            style={{
              position: 'absolute',
              left: 'clamp(24px, 8vw, 120px)',
              top: '50%',
              transform: 'translateY(calc(-50% + var(--text-y, 0vh))) scale(var(--text-scale, 1))',
              transformOrigin: 'left center',
              zIndex: 10,
            }}
          >
            <div style={{
              fontSize: 'clamp(48px, 6vw, 80px)',
              fontFamily: 'var(--font-newsreader), Georgia, serif',
              fontWeight: 600,
              fontStyle: 'italic',
              color: '#ffffff',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              minWidth: 'max-content',
            }}>
              <TextScramble key={scrambleKey} text={ELEMENTS[activeIndex].label} />
            </div>
          </div>

          {/* ── RIGHT — static copy ───────────────────────────── */}
          <div
            className="hero-right"
            style={{
              position: 'absolute',
              right: 'clamp(24px, 8vw, 120px)',
              top: '50%',
              transform: 'translateY(-50%)',
              textAlign: 'right',
              zIndex: 10,
            }}
          >
            <p style={{
              fontFamily: 'var(--font-newsreader), Georgia, serif',
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: '0 0 4px',
            }}>
              Tu página web
            </p>
            <p style={{
              fontFamily: 'var(--font-newsreader), Georgia, serif',
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 700,
              fontStyle: 'italic',
              color: '#d4a843',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: '0 0 32px',
            }}>
              por 29€/mes
            </p>
            <a
              href="/registro"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                background: '#ffffff',
                color: '#1c1c18',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: '0.12em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'background 0.25s, color 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#d4a843'; e.currentTarget.style.color = '#ffffff' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#1c1c18' }}
            >
              Quiero mi web →
            </a>
          </div>

          {/* ── BOTTOM — 3-panel card strip ───────────────────── */}
          <div
            className="hero-cards"
            style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: 'var(--strip-h, 28vh)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: 16,
              zIndex: 10,
            }}
          >
            {/* Left panel */}
            <div style={{
              width: '26vw',
              height: '22vh',
              borderRadius: '12px 12px 0 0',
              overflow: 'hidden',
              flexShrink: 0,
              opacity: 'var(--side-opacity, 1)' as unknown as number,
              transition: 'opacity 0.5s ease',
              position: 'relative',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/website_animation_draft.png" alt={ELEMENTS[prevIndex].label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '24px 14px 12px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              }}>
                <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: 10, fontWeight: 400, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', margin: 0 }}>
                  {ELEMENTS[prevIndex].label}
                </p>
              </div>
            </div>

            {/* Center panel */}
            <div style={{
              width: 'var(--card-cw, 38vw)',
              height: 'var(--card-ch, 26vh)',
              borderRadius: '12px 12px 0 0',
              overflow: 'hidden',
              flexShrink: 0,
              position: 'relative',
              boxShadow: '0 -8px 40px rgba(0,0,0,0.4)',
              transition: 'width 0.1s linear, height 0.1s linear',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/website_animation_draft.png" alt={ELEMENTS[activeIndex].label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '32px 20px 16px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              }}>
                <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: 11, fontWeight: 400, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', margin: 0 }}>
                  {ELEMENTS[activeIndex].label}
                </p>
              </div>
            </div>

            {/* Right panel */}
            <div style={{
              width: '26vw',
              height: '22vh',
              borderRadius: '12px 12px 0 0',
              overflow: 'hidden',
              flexShrink: 0,
              opacity: 'var(--side-opacity, 1)' as unknown as number,
              transition: 'opacity 0.5s ease',
              position: 'relative',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/website_animation_draft.png" alt={ELEMENTS[nextIndex].label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '24px 14px 12px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              }}>
                <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: 10, fontWeight: 400, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', margin: 0 }}>
                  {ELEMENTS[nextIndex].label}
                </p>
              </div>
            </div>

          </div>{/* /cards strip */}

        </div>{/* /sticky */}
      </section>
    </>
  )
}
