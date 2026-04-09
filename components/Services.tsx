'use client'

import { useRef, useEffect } from 'react'
import RevealText from '@/components/ui/RevealText'

// Icon — minimal line SVG instead of Lucide (per washi: monochrome, weight 200)
const ICONS = {
  brush: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  sparkle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  ),
  circle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  ),
  monitor: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="0"/><path d="M8 21h8m-4-4v4"/>
    </svg>
  ),
  zap: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  shield: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
}

const CARDS = [
  { icon: ICONS.brush,   title: 'Diseño a medida',            description: 'Cada web es única para tu negocio. No usamos plantillas genéricas. Diseño profesional que transmite quién eres.' },
  { icon: ICONS.sparkle, title: 'Diseño de primer nivel',     description: 'Usamos las herramientas y técnicas de los mejores estudios web. El resultado parece de agencia. El precio, no.' },
  { icon: ICONS.circle,  title: 'Sin inversión inicial',      description: 'Cero euros por adelantado. Pagas solo la mensualidad. Sin riesgo, sin compromisos de permanencia.' },
  { icon: ICONS.monitor, title: 'Perfecta en cualquier pantalla', description: 'Tu web funciona igual de bien en móvil, tablet y ordenador. El 78% de tus clientes llega desde el móvil.' },
  { icon: ICONS.zap,     title: 'Lista en 3 días',            description: 'Desde que nos mandas los datos hasta que está publicada: 3 días laborables. Sin esperas de semanas.' },
  { icon: ICONS.shield,  title: 'Mantenimiento incluido',     description: 'Actualizaciones, seguridad y soporte por WhatsApp incluidos. Tu web siempre funcionando. Tú, tranquilo.' },
]

function ServiceCard({ card, idx }: { card: typeof CARDS[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { el.classList.remove('reveal-hidden'); el.classList.add('reveal-visible') }, idx * 70)
          obs.unobserve(el)
        }
      },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [idx])

  return (
    <div
      ref={ref}
      className="reveal-hidden flex flex-col transition-all duration-400"
      // Offset every second card vertically — DESIGN.md asymmetry rule
      style={{ marginTop: idx % 2 === 1 ? '48px' : '0', paddingTop: '32px', paddingBottom: '32px' }}
      onMouseEnter={e => { e.currentTarget.style.paddingLeft = '8px' }}
      onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0' }}
    >
      {/* Icon — celadon tint on hover */}
      <div
        className="mb-6 transition-colors duration-400"
        style={{ color: 'rgba(28,28,24,0.3)', width: '20px' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--on-tertiary-container)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(28,28,24,0.3)')}
      >
        {card.icon}
      </div>

      {/* 0.5px sumi rule above title */}
      <div className="sumi-rule mb-5" aria-hidden="true" />

      <h3
        style={{
          fontFamily: 'var(--font-newsreader)',
          fontStyle: 'italic',
          fontSize: '20px',
          fontWeight: 300,
          color: 'var(--on-surface)',
          marginBottom: '12px',
          lineHeight: 1.3,
        }}
      >
        {card.title}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '13px',
          fontWeight: 200,
          color: 'rgba(28,28,24,0.55)',
          lineHeight: 1.8,
          letterSpacing: '0.02em',
        }}
      >
        {card.description}
      </p>
    </div>
  )
}

export default function Services() {
  return (
    <section
      id="servicios"
      className="py-24 lg:py-32"
      style={{ background: 'var(--surface)' }}
      aria-labelledby="services-heading"
    >
      {/* Asymmetric padding — 15% left, 8% right per DESIGN.md */}
      <div style={{ paddingLeft: 'max(40px, 8vw)', paddingRight: 'max(40px, 6vw)' }}>
        {/* Header — left aligned */}
        <div className="mb-20 max-w-lg">
          <RevealText>
            <span
              className="block mb-5"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.35em', color: 'rgba(28,28,24,0.35)' }}
            >
              por qué elegir yele
            </span>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              id="services-heading"
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                color: 'var(--on-surface)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              Todo lo que necesita tu negocio.{' '}
              <span style={{ fontStyle: 'italic' }}>Nada que no necesitas.</span>
            </h2>
          </RevealText>
        </div>

        {/* Grid — 3 cols, asymmetric stagger */}
        <div
          className="grid gap-x-12"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}
        >
          {CARDS.map((card, i) => (
            <ServiceCard key={i} card={card} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
