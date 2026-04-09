'use client'

import { useRef, useEffect } from 'react'
import RevealText from '@/components/ui/RevealText'

const EXAMPLES = [
  {
    num: '01',
    name: 'Fontanería Martín',
    sector: 'Fontanería · Madrid',
    headline: 'Tu fontanero\nde confianza.',
    theme: 0,
  },
  {
    num: '02',
    name: 'Alma Yoga',
    sector: 'Yoga · Valencia',
    headline: 'Encuentra\ntu centro.',
    theme: 1,
  },
  {
    num: '03',
    name: 'Barbería El Corte',
    sector: 'Barbería · Barcelona',
    headline: 'El mejor corte\nde tu barrio.',
    theme: 2,
  },
  {
    num: '04',
    name: 'Clínica Serena',
    sector: 'Salud · Sevilla',
    headline: 'Fisioterapia\nespecializada.',
    theme: 3,
  },
  {
    num: '05',
    name: 'Academia Lumina',
    sector: 'Academia · Zaragoza',
    headline: 'Inglés que\nabre puertas.',
    theme: 4,
  },
  {
    num: '06',
    name: 'Casa Pepe',
    sector: 'Restaurante · Madrid',
    headline: 'Cocina de mercado,\nde verdad.',
    theme: 5,
  },
]

function PortfolioCard({ item, idx }: { item: typeof EXAMPLES[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.remove('reveal-hidden')
            el.classList.add('reveal-visible')
          }, idx * 60)
          obs.unobserve(el)
        }
      },
      { threshold: 0.06 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [idx])

  return (
    <div
      ref={ref}
      className={`card-theme-${item.theme} reveal-hidden relative overflow-hidden group`}
      style={{
        aspectRatio: '4/3',
        marginTop: idx % 2 === 1 ? '48px' : '0',
        cursor: 'default',
      }}
    >
      {/* Blob */}
      <div
        className={`card-blob absolute pointer-events-none`}
        style={{ top: '-20%', right: '-10%', width: '60%', height: '60%', borderRadius: '50%', opacity: 0.35 }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
        <div className="flex items-start justify-between">
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '9px',
              fontWeight: 200,
              letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            {item.num}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '9px',
              fontWeight: 200,
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            {item.sector}
          </span>
        </div>

        <div className="mt-auto">
          <p
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontStyle: 'italic',
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              fontWeight: 300,
              color: 'white',
              lineHeight: 1.15,
              marginBottom: '12px',
              whiteSpace: 'pre-line',
            }}
          >
            {item.headline}
          </p>
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '11px',
              fontWeight: 200,
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {item.name}
          </span>
        </div>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.45)' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '9px',
            fontWeight: 200,
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.75)',
            border: '0.5px solid rgba(255,255,255,0.3)',
            padding: '8px 18px',
          }}
        >
          ejemplo →
        </span>
      </div>
    </div>
  )
}

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="py-24 lg:py-32"
      style={{ background: 'var(--surface-container-low)' }}
      aria-labelledby="portfolio-heading"
    >
      {/* Header */}
      <div
        className="mb-16"
        style={{ paddingLeft: 'max(40px, 8vw)', paddingRight: 'max(40px, 6vw)' }}
      >
        <RevealText>
          <span
            className="block mb-5"
            style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.35em', color: 'rgba(28,28,24,0.35)' }}
          >
            portfolio
          </span>
        </RevealText>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <RevealText delay={0.1}>
            <h2
              id="portfolio-heading"
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                color: 'var(--on-surface)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              Webs que ya están{' '}
              <span style={{ fontStyle: 'italic' }}>funcionando.</span>
            </h2>
          </RevealText>
          <RevealText delay={0.15}>
            <a
              href="/trabajos"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '10px',
                fontWeight: 200,
                letterSpacing: '0.18em',
                color: 'rgba(28,28,24,0.45)',
                textDecoration: 'none',
                borderBottom: '0.5px solid rgba(200,194,180,0.4)',
                paddingBottom: '2px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--on-tertiary-container)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(28,28,24,0.45)')}
            >
              ver todos →
            </a>
          </RevealText>
        </div>
      </div>

      {/* 3-col grid with asymmetric stagger */}
      <div
        style={{
          paddingLeft: 'max(40px, 8vw)',
          paddingRight: 'max(40px, 6vw)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
          alignItems: 'start',
        }}
      >
        {EXAMPLES.map((item, i) => (
          <PortfolioCard key={i} item={item} idx={i} />
        ))}
      </div>
    </section>
  )
}
