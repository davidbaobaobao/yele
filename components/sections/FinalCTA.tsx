'use client'

import { Boxes } from '@/components/ui/background-boxes'

export default function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden flex flex-col items-center justify-center"
      style={{ minHeight: '500px', background: '#0f172a' }}
    >
      {/* Radial mask overlay — fades boxes at edges */}
      <div
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        style={{
          background: '#0f172a',
          WebkitMaskImage: 'radial-gradient(transparent 40%, #0f172a 80%)',
          maskImage: 'radial-gradient(transparent 40%, #0f172a 80%)',
        }}
        aria-hidden="true"
      />

      <Boxes />

      <div
        className="relative z-30 text-center px-6"
        style={{ maxWidth: '672px', margin: '0 auto' }}
      >
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: '20px',
          fontFamily: 'var(--font-body)',
        }}>
          Empieza hoy
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 400,
          color: 'white',
          lineHeight: 1.15,
          marginBottom: '16px',
        }}>
          Tu negocio merece una web que funcione.
        </h2>
        <p style={{
          fontSize: '16px',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '36px',
          lineHeight: 1.65,
          fontFamily: 'var(--font-body)',
        }}>
          Sin permanencia. Sin sorpresas.<br />
          Lista en 3–5 días.
        </p>
        <a
          href="/registro"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--color-accent)',
            color: 'var(--color-dark)',
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '16px 36px',
            textDecoration: 'none',
            borderRadius: '4px',
            transition: 'opacity 200ms',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
        >
          Quiero mi web →
        </a>
      </div>
    </section>
  )
}
