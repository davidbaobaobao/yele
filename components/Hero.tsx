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
const DURATION_PER_ELEM = 2              // seconds per element
const TOTAL_DURATION    = TOTAL * DURATION_PER_ELEM // 14 s loop
const CARD_H_BASE       = 38            // vh at scroll=0
const CARD_H_MAX        = 82            // vh at scroll=1

function wrap(i: number) { return ((i % TOTAL) + TOTAL) % TOTAL }

// ─── Card inner content ───────────────────────────────────────────────────────
function CardContent({ label }: { label: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/website_animation_draft.png"
        alt={label}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)',
        height: '50%',
        zIndex: 1,
      }} />
      {/* Label */}
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

export default function Hero() {
  const [activeIndex,  setActiveIndex]  = useState(0)
  const [scrambleKey,  setScrambleKey]  = useState(0)
  const [videoReady,   setVideoReady]   = useState(false)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [cardsVisible, setCardsVisible] = useState(true)

  const stickyRef   = useRef<HTMLDivElement>(null)
  const sectionRef  = useRef<HTMLElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const rafRef      = useRef<number>()
  const fadeTimer   = useRef<ReturnType<typeof setTimeout>>()
  const firstRender = useRef(true)

  // ── rAF loop: sync activeIndex to video.currentTime ──────────────
  useEffect(() => {
    if (!videoReady) return
    const tick = () => {
      const vid = videoRef.current
      if (vid) {
        const t     = vid.currentTime % TOTAL_DURATION
        const next  = Math.floor(t / DURATION_PER_ELEM)
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

  // ── Crossfade: when activeIndex changes, fade out → swap → fade in ─
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      setDisplayIndex(activeIndex)
      return
    }
    setCardsVisible(false)
    if (fadeTimer.current) clearTimeout(fadeTimer.current)
    fadeTimer.current = setTimeout(() => {
      setDisplayIndex(activeIndex)
      setCardsVisible(true)
    }, 300)
    return () => { if (fadeTimer.current) clearTimeout(fadeTimer.current) }
  }, [activeIndex])

  // ── Scroll: set --card-height and --content-y on sticky el ───────
  useEffect(() => {
    const section = sectionRef.current
    const sticky  = stickyRef.current
    if (!section || !sticky) return

    const onScroll = () => {
      const rect  = section.getBoundingClientRect()
      const total = section.offsetHeight - window.innerHeight
      const p     = Math.max(0, Math.min(1, -rect.top / total))
      sticky.style.setProperty('--card-height', (CARD_H_BASE + (CARD_H_MAX - CARD_H_BASE) * p) + 'vh')
      sticky.style.setProperty('--content-y',   (-30 * p) + 'vh')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const leftIndex  = wrap(displayIndex - 1)
  const rightIndex = wrap(displayIndex + 1)

  // Cards: videoReady AND crossfade visibility
  const cardsOpacity   = !videoReady ? 0 : cardsVisible ? 1 : 0
  const cardsTransition = !videoReady
    ? 'none'
    : cardsVisible ? 'opacity 0.5s ease' : 'opacity 0.3s ease'

  return (
    <>
      <style>{`
        [data-hero-sticky] {
          --card-height: ${CARD_H_BASE}vh;
          --content-y:   0vh;
        }
        @media (max-width: 767px) {
          .hero-left {
            left: 50% !important;
            top: 28% !important;
            transform: translate(-50%, -50%) !important;
            text-align: center;
          }
          .hero-right {
            right: auto !important;
            left: 50% !important;
            top: 60% !important;
            transform: translate(-50%, -50%) !important;
            text-align: center;
          }
          .hero-card-left, .hero-card-right { display: none !important; }
          .hero-card-center {
            width: 80vw !important;
            transform: none !important;
            margin: 0 !important;
          }
          [data-hero-sticky] {
            --card-height: 30vh !important;
            --content-y:   0vh  !important;
          }
        }
      `}</style>

      {/* 240vh outer section — no overflow set so sticky works correctly */}
      <section
        ref={sectionRef}
        style={{ height: '240vh', position: 'relative' }}
      >
        {/* Sticky viewport — overflow: visible so rotated card tops are never clipped */}
        <div
          ref={stickyRef}
          data-hero-sticky
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'visible',
          }}
        >

          {/* ── CONTENT BLOCK — translates up on scroll ─────────────── */}
          <div style={{
            position: 'absolute',
            inset: 0,
            transform: 'translateY(var(--content-y, 0vh))',
            willChange: 'transform',
          }}>

            {/* Static fallback — always visible, shows before video loads */}
            <div aria-hidden style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'url(/hero-static.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0,
            }} />

            {/* Video — 130vh tall so it covers when content moves up 30vh */}
            <video
              ref={videoRef}
              autoPlay muted loop playsInline
              onCanPlay={() => setVideoReady(true)}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '130vh',
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
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.52) 100%)',
              zIndex: 2,
            }} />

            {/* LEFT — scramble label, hidden until video ready */}
            <div
              className="hero-left"
              style={{
                position: 'absolute',
                left: 'clamp(24px, 8vw, 120px)',
                top: '50%',
                transform: 'translateY(-50%)',
                transformOrigin: 'left center',
                zIndex: 10,
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

            {/* RIGHT — always visible */}
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

          </div>{/* /content block */}

          {/* ── CARDS STRIP — anchored to sticky bottom, not content block ── */}
          {/* overflow: visible so rotated tops extend above strip boundary    */}
          <div
            style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              overflow: 'visible',
              pointerEvents: 'none',
              zIndex: 10,
              // Combined opacity: hidden before video, then crossfade on index change
              opacity: cardsOpacity,
              transition: cardsTransition,
            }}
          >

            {/* LEFT — rotate(5deg) pivoting at bottom-right corner → top leans toward center */}
            <div
              className="hero-card-left"
              style={{
                position: 'relative',
                width: '36vw',
                height: 'var(--card-height, 38vh)',
                transform: 'rotate(5deg)',
                transformOrigin: 'bottom right',
                marginRight: '-4vw',
                borderRadius: '14px 14px 0 0',
                overflow: 'hidden',
                flexShrink: 0,
                transition: 'height 0.2s ease-out',
                zIndex: 2,
              }}
            >
              <CardContent label={ELEMENTS[leftIndex].label} />
            </div>

            {/* CENTER — perfectly vertical, dominant card */}
            <div
              className="hero-card-center"
              style={{
                position: 'relative',
                width: '36vw',
                height: 'var(--card-height, 38vh)',
                transform: 'none',
                borderRadius: '14px 14px 0 0',
                overflow: 'hidden',
                flexShrink: 0,
                transition: 'height 0.2s ease-out',
                zIndex: 3,
                boxShadow: '0 -16px 60px rgba(0,0,0,0.5)',
              }}
            >
              <CardContent label={ELEMENTS[displayIndex].label} />
            </div>

            {/* RIGHT — rotate(-5deg) pivoting at bottom-left corner → top leans toward center */}
            <div
              className="hero-card-right"
              style={{
                position: 'relative',
                width: '36vw',
                height: 'var(--card-height, 38vh)',
                transform: 'rotate(-5deg)',
                transformOrigin: 'bottom left',
                marginLeft: '-4vw',
                borderRadius: '14px 14px 0 0',
                overflow: 'hidden',
                flexShrink: 0,
                transition: 'height 0.2s ease-out',
                zIndex: 2,
              }}
            >
              <CardContent label={ELEMENTS[rightIndex].label} />
            </div>

          </div>{/* /cards strip */}

        </div>{/* /sticky */}
      </section>
    </>
  )
}
