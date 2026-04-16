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
const TOTAL              = ELEMENTS.length
const DURATION_PER_ELEM  = 2   // seconds each element shows
const TOTAL_DURATION     = DURATION_PER_ELEM * TOTAL // 14 s loop

function wrap(i: number) { return ((i % TOTAL) + TOTAL) % TOTAL }

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrambleKey,  setScrambleKey]  = useState(0)
  const [videoReady,   setVideoReady]   = useState(false)

  const stickyRef  = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const rafRef     = useRef<number>()

  // ── FIX 2: rAF loop synced to video.currentTime ───────────────
  useEffect(() => {
    if (!videoReady) return

    const tick = () => {
      const video = videoRef.current
      if (video) {
        const t        = video.currentTime % TOTAL_DURATION
        const newIndex = Math.floor(t / DURATION_PER_ELEM)
        setActiveIndex(prev => {
          if (prev !== newIndex) {
            setScrambleKey(k => k + 1)
            return newIndex
          }
          return prev
        })
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [videoReady])

  // ── Scroll → CSS custom properties ────────────────────────────
  useEffect(() => {
    const section = sectionRef.current
    const sticky  = stickyRef.current
    if (!section || !sticky) return

    const onScroll = () => {
      const rect  = section.getBoundingClientRect()
      const total = section.offsetHeight - window.innerHeight
      const p     = Math.max(0, Math.min(1, -rect.top / total))

      sticky.style.setProperty('--strip-h',      (28 + 57 * p) + 'vh')
      sticky.style.setProperty('--card-cw',      (52 + 20 * p) + 'vw') // 52 → 72vw
      sticky.style.setProperty('--card-ch',      (30 + 48 * p) + 'vh') // 30 → 78vh
      sticky.style.setProperty('--side-opacity', String(1 - 0.6 * p))
      sticky.style.setProperty('--text-y',       (-30 * p) + 'vh')
      sticky.style.setProperty('--text-scale',   String(1 - 0.4 * p))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const prevIndex = wrap(activeIndex - 1)
  const nextIndex = wrap(activeIndex + 1)

  return (
    <>
      <style>{`
        [data-sticky] {
          --strip-h:      28vh;
          --card-cw:      52vw;
          --card-ch:      30vh;
          --side-opacity: 1;
          --text-y:       0vh;
          --text-scale:   1;
        }

        /* Center card slides in from right on each index change */
        @keyframes heroCardIn {
          from { transform: translateX(48px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .hero-card-center {
          animation: heroCardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        /* Side cards crossfade */
        @keyframes heroSideFade {
          from { opacity: 0; }
          to   { opacity: var(--side-opacity, 1); }
        }
        .hero-card-side {
          animation: heroSideFade 0.4s ease both;
        }

        /* Mobile */
        @media (max-width: 767px) {
          .hero-left {
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
          .hero-cards { display: none !important; }
          [data-sticky] { --strip-h: 0vh !important; }
        }
      `}</style>

      {/* ── 250vh outer section for scroll travel ─────────────── */}
      <section
        ref={sectionRef}
        style={{ position: 'relative', height: '250vh', width: '100%' }}
      >
        {/* ── Sticky viewport ────────────────────────────────── */}
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
          {/* Static fallback always visible */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/hero-static.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }} />

          {/* Video fades in on canPlay */}
          <video
            ref={videoRef}
            autoPlay muted loop playsInline
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

          {/* Overlay */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.55) 100%)',
            zIndex: 2,
          }} />

          {/* ── LEFT — scramble label, hidden until videoReady ── */}
          <div
            className="hero-left"
            style={{
              position: 'absolute',
              left: 'clamp(24px, 8vw, 120px)',
              top: '50%',
              transform: 'translateY(calc(-50% + var(--text-y, 0vh))) scale(var(--text-scale, 1))',
              transformOrigin: 'left center',
              zIndex: 10,
              // FIX 1: instant hide/show — no transition
              opacity: videoReady ? 1 : 0,
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

          {/* ── RIGHT — always visible ───────────────────────── */}
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

          {/* ── CARDS STRIP — hidden until videoReady ────────── */}
          {/* FIX 3: margin trick — side cards are 38vw wide but
              pushed -26vw so only ~12vw shows at each edge       */}
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
              gap: 12,
              zIndex: 10,
              // FIX 1: instant hide/show on cards too
              opacity: videoReady ? 1 : 0,
            }}
          >
            {/* Left side card — mostly hidden off-screen left */}
            <div
              key={`left-${prevIndex}`}
              className="hero-card-side"
              style={{
                width: '38vw',
                height: '26vh',
                borderRadius: '14px 14px 0 0',
                overflow: 'hidden',
                flexShrink: 0,
                marginRight: '-26vw',  // pushes most of card off left edge
                position: 'relative',
                opacity: 'var(--side-opacity, 1)' as unknown as number,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/website_animation_draft.png" alt={ELEMENTS[prevIndex].label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '24px 16px 12px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
              }}>
                <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: 10, fontWeight: 400, letterSpacing: '0.1em', color: 'white', textTransform: 'uppercase', margin: 0 }}>
                  {ELEMENTS[prevIndex].label}
                </p>
              </div>
            </div>

            {/* Center card — dominant, slides in on change */}
            <div
              key={`center-${activeIndex}`}
              className="hero-card-center"
              style={{
                width: 'var(--card-cw, 52vw)',
                height: 'var(--card-ch, 30vh)',
                borderRadius: '14px 14px 0 0',
                overflow: 'hidden',
                flexShrink: 0,
                position: 'relative',
                zIndex: 2,
                boxShadow: '0 -12px 48px rgba(0,0,0,0.45)',
                transition: 'width 0.1s linear, height 0.1s linear',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/website_animation_draft.png" alt={ELEMENTS[activeIndex].label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '32px 20px 16px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
              }}>
                <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: 11, fontWeight: 400, letterSpacing: '0.1em', color: 'white', textTransform: 'uppercase', margin: 0 }}>
                  {ELEMENTS[activeIndex].label}
                </p>
              </div>
            </div>

            {/* Right side card — mostly hidden off-screen right */}
            <div
              key={`right-${nextIndex}`}
              className="hero-card-side"
              style={{
                width: '38vw',
                height: '26vh',
                borderRadius: '14px 14px 0 0',
                overflow: 'hidden',
                flexShrink: 0,
                marginLeft: '-26vw',   // pushes most of card off right edge
                position: 'relative',
                opacity: 'var(--side-opacity, 1)' as unknown as number,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/website_animation_draft.png" alt={ELEMENTS[nextIndex].label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '24px 16px 12px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
              }}>
                <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: 10, fontWeight: 400, letterSpacing: '0.1em', color: 'white', textTransform: 'uppercase', margin: 0 }}>
                  {ELEMENTS[nextIndex].label}
                </p>
              </div>
            </div>

          </div>{/* /cards */}
        </div>{/* /sticky */}
      </section>
    </>
  )
}
