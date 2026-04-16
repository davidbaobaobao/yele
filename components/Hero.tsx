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
const CARD_W = 280
const CARD_H = 380
const GAP    = 20
const INTERVAL_MS = 2000

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrambleKey, setScrambleKey] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % TOTAL)
      setScrambleKey(prev => prev + 1)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      {/* ── Video background ─────────────────────────────── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src="/hero-dash.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay ──────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* ── Zone: LEFT — rotating label ───────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: 'clamp(24px, 8vw, 120px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
        className="hero-left"
      >
        <p style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: 11,
          fontWeight: 300,
          letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.45)',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          diseñado para
        </p>
        <div style={{
          fontSize: 'clamp(48px, 6vw, 80px)',
          fontFamily: 'var(--font-newsreader), Georgia, serif',
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#ffffff',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          minWidth: '280px',
        }}>
          <TextScramble key={scrambleKey} text={ELEMENTS[activeIndex].label} />
        </div>
      </div>

      {/* ── Zone: RIGHT — static CTA text ────────────────── */}
      <div
        style={{
          position: 'absolute',
          right: 'clamp(24px, 8vw, 120px)',
          top: '50%',
          transform: 'translateY(-50%)',
          textAlign: 'right',
          zIndex: 10,
        }}
        className="hero-right"
      >
        <p style={{
          fontFamily: 'var(--font-newsreader), Georgia, serif',
          fontSize: 'clamp(32px, 4vw, 56px)',
          fontWeight: 300,
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
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--on-tertiary-container, #688c76)',
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
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--on-tertiary-container, #688c76)'
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#ffffff'
            e.currentTarget.style.color = '#1c1c18'
          }}
        >
          Quiero mi web →
        </a>
      </div>

      {/* ── Zone: BOTTOM — card strip ────────────────────── */}
      <div
        className="hero-cards-wrap"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: CARD_H + 40,
          zIndex: 10,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div style={{ position: 'relative', width: (CARD_W + GAP) * 3, height: CARD_H }}>
          {ELEMENTS.map((el, i) => {
            const offset   = i - activeIndex
            const wrapped  = ((offset % TOTAL) + TOTAL) % TOTAL
            const norm     = wrapped > 3 ? wrapped - TOTAL : wrapped
            // Only render ±2 from center
            if (Math.abs(norm) > 2) return null

            const xPos    = norm * (CARD_W + GAP)
            const scale   = norm === 0 ? 1.05 : Math.abs(norm) === 1 ? 0.95 : 0.88
            const opacity = norm === 0 ? 1    : Math.abs(norm) === 1 ? 0.7  : 0.4

            return (
              <div
                key={el.id}
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 0,
                  width: CARD_W,
                  height: CARD_H,
                  borderRadius: 12,
                  overflow: 'hidden',
                  transform: `translateX(calc(-50% + ${xPos}px)) scale(${scale})`,
                  transformOrigin: 'bottom center',
                  opacity,
                  transition: 'transform 600ms ease-in-out, opacity 600ms ease-in-out',
                  boxShadow: norm === 0 ? '0 24px 60px rgba(0,0,0,0.5)' : '0 8px 24px rgba(0,0,0,0.3)',
                }}
              >
                {/* Card label */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '32px 20px 20px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                  zIndex: 2,
                }}>
                  <p style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 11,
                    fontWeight: 400,
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.8)',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}>
                    {el.label}
                  </p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/website_animation_draft.png"
                  alt={el.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Responsive styles ────────────────────────────── */}
      <style>{`
        @media (max-width: 767px) {
          .hero-left {
            left: 50% !important;
            transform: translate(-50%, -120%) !important;
            text-align: center;
          }
          .hero-right {
            right: 50% !important;
            transform: translate(50%, 40%) !important;
            text-align: center;
          }
          .hero-cards-wrap {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
