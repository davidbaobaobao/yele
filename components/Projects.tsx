'use client'

import { useRef, useEffect } from 'react'
import RevealText from '@/components/ui/RevealText'

interface PortfolioItem {
  title: string
  location: string
  plan: string
  gradient: string
  accentColor: string
}

const ITEMS: PortfolioItem[] = [
  { title: 'Fontanero',           location: 'Madrid',    plan: 'Profesional', gradient: 'linear-gradient(135deg, #0d1b2a, #1a3a5c)', accentColor: '#3a7bd5' },
  { title: 'Fisioterapeuta',      location: 'Valencia',  plan: 'Profesional', gradient: 'linear-gradient(135deg, #0d2a1f, #1a3d2e)', accentColor: '#3a8a5a' },
  { title: 'Barbería',            location: 'Barcelona', plan: 'Avanzada',    gradient: 'linear-gradient(135deg, #1a0f08, #2e1c0e)', accentColor: '#c4922a' },
  { title: 'Instructora de yoga', location: 'Málaga',    plan: 'Básica',      gradient: 'linear-gradient(135deg, #2a1a0a, #3d2810)', accentColor: '#8a6a3a' },
  { title: 'Electricista',        location: 'Bilbao',    plan: 'Básica',      gradient: 'linear-gradient(135deg, #1a1a0a, #2e2e10)', accentColor: '#c4b42a' },
  { title: 'Academia de inglés',  location: 'Zaragoza',  plan: 'Avanzada',    gradient: 'linear-gradient(135deg, #0a1a2a, #102038)', accentColor: '#3a6aaa' },
]

function PortfolioCard({ item, idx }: { item: PortfolioItem; idx: number }) {
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
      className="reveal-hidden relative overflow-hidden group cursor-pointer"
      style={{
        aspectRatio: '3/2',
        background: item.gradient,
        // Offset every second card — DESIGN.md asymmetry
        marginTop: idx % 2 === 1 ? '40px' : '0',
      }}
    >
      {/* Ambient blob */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '70%', height: '70%', top: '-20%', right: '-10%',
          background: `radial-gradient(circle, ${item.accentColor}33 0%, transparent 70%)`,
          animation: 'blob_pulse 4s ease-in-out infinite',
        }}
      />

      <div className="relative z-10 p-5 flex flex-col h-full">
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '9px',
            fontWeight: 200,
            letterSpacing: '0.18em',
            padding: '3px 8px',
            background: 'rgba(0,0,0,0.3)',
            color: 'rgba(255,255,255,0.5)',
            alignSelf: 'flex-start',
            backdropFilter: 'blur(4px)',
          }}
        >
          {item.plan.toLowerCase()}
        </span>
        <div className="mt-auto">
          <p style={{ fontFamily: 'var(--font-newsreader)', fontStyle: 'italic', fontSize: '22px', fontWeight: 300, color: 'white', lineHeight: 1.15, marginBottom: '4px' }}>
            {item.title}
          </p>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', fontWeight: 200, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
            {item.location.toLowerCase()}
          </p>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
        <span
          className="transition-transform duration-400 group-hover:-translate-y-1"
          style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(255,255,255,0.25)', padding: '8px 16px' }}
        >
          ver ejemplo →
        </span>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section
      id="portfolio"
      className="py-24 lg:py-32"
      style={{ background: 'var(--surface-container-low)' }}
      aria-labelledby="portfolio-heading"
    >
      <div style={{ paddingLeft: 'max(40px, 8vw)', paddingRight: 'max(40px, 6vw)' }}>
        {/* Header */}
        <div className="mb-16">
          <RevealText>
            <span className="block mb-5" style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.35em', color: 'rgba(28,28,24,0.35)' }}>
              nuestros trabajos
            </span>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              id="portfolio-heading"
              style={{ fontFamily: 'var(--font-newsreader)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, color: 'var(--on-surface)', letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: '12px' }}
            >
              Webs que ya están funcionando.
            </h2>
          </RevealText>
          <RevealText delay={0.15}>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 200, letterSpacing: '0.1em', color: 'rgba(28,28,24,0.45)' }}>
              Cada sector tiene su propio diseño. Ninguna web se parece a la anterior.
            </p>
          </RevealText>
        </div>

        {/* Grid — asymmetric stagger */}
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {ITEMS.map((item, i) => <PortfolioCard key={i} item={item} idx={i} />)}
        </div>

        {/* CTA — text link style */}
        <div className="mt-16 flex justify-start">
          <a
            href="/trabajos"
            className="transition-all duration-400"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '10px',
              fontWeight: 200,
              letterSpacing: '0.2em',
              color: 'rgba(28,28,24,0.6)',
              textDecoration: 'none',
              borderBottom: '0.5px solid rgba(200,194,180,0.4)',
              paddingBottom: '2px',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--on-tertiary-container)'; e.currentTarget.style.borderColor = 'var(--tertiary-fixed)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(28,28,24,0.6)'; e.currentTarget.style.borderColor = 'rgba(200,194,180,0.4)' }}
          >
            ver todos los trabajos →
          </a>
        </div>
      </div>
    </section>
  )
}
