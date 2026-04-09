'use client'

import { useRef, useEffect } from 'react'
import RevealText from '@/components/ui/RevealText'

const TESTIMONIALS = [
  {
    quote: 'Llevaba dos años diciéndome que iba a hacer la web. En una semana ya estaba en Google. Mis clientes me dicen que se ve muy profesional.',
    name:    'Antonio R.',
    business:'Fontanero · Sevilla',
    initials:'AR',
  },
  {
    quote: 'No entiendo nada de tecnología, y no hizo falta. Me preguntaron cuatro cosas y ya estaba lista. El precio, sin comentarios — es una ganga.',
    name:    'Marta L.',
    business:'Peluquera · Bilbao',
    initials:'ML',
  },
  {
    quote: 'Tengo una academia pequeña. Ahora mis alumnos me mandan a sus amigos diciéndoles que busquen mi web. Eso antes no pasaba.',
    name:    'Pedro S.',
    business:'Academia de inglés · Zaragoza',
    initials:'PS',
  },
]

function TestimonialCard({ t, idx }: { t: typeof TESTIMONIALS[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { el.classList.remove('reveal-hidden'); el.classList.add('reveal-visible') }, idx * 80)
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
      className="reveal-hidden flex flex-col relative"
      style={{
        background: 'var(--surface-container-low)',
        border: '0.5px solid rgba(200,194,180,0.2)',
        padding: '36px 32px',
        marginTop: idx % 2 === 1 ? '40px' : '0',
      }}
    >
      {/* Opening mark — watermark */}
      <div
        aria-hidden="true"
        className="absolute top-3 right-5 select-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-newsreader)',
          fontStyle: 'italic',
          fontSize: '64px',
          color: 'var(--tertiary-fixed)',
          opacity: 0.35,
          lineHeight: 1,
        }}
      >
        &ldquo;
      </div>

      {/* Quote */}
      <blockquote
        className="flex-1 relative z-10"
        style={{
          fontFamily: 'var(--font-newsreader)',
          fontStyle: 'italic',
          fontSize: '17px',
          fontWeight: 300,
          color: 'var(--on-surface)',
          lineHeight: 1.65,
          marginBottom: '28px',
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* sumi rule */}
      <div className="sumi-rule mb-5" aria-hidden="true" />

      {/* Attribution */}
      <div className="flex items-center gap-3 relative z-10">
        {/* Monochrome avatar — square, no radius */}
        <div
          style={{
            width: '32px',
            height: '32px',
            background: 'rgba(28,28,24,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.1em', color: 'rgba(28,28,24,0.5)' }}>
            {t.initials}
          </span>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', fontWeight: 200, letterSpacing: '0.15em', color: 'rgba(28,28,24,0.7)' }}>
            {t.name.toLowerCase()}
          </p>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.12em', color: 'rgba(28,28,24,0.35)' }}>
            {t.business.toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section
      id="testimonios"
      className="py-24 lg:py-32"
      style={{ background: 'var(--surface)' }}
      aria-labelledby="testimonials-heading"
    >
      <div style={{ paddingLeft: 'max(40px, 8vw)', paddingRight: 'max(40px, 6vw)' }}>
        {/* Header */}
        <div className="mb-16 max-w-lg">
          <RevealText>
            <span
              className="block mb-5"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.35em', color: 'rgba(28,28,24,0.35)' }}
            >
              lo que dicen
            </span>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              id="testimonials-heading"
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                color: 'var(--on-surface)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              Resultados reales.{' '}
              <span style={{ fontStyle: 'italic' }}>Negocios reales.</span>
            </h2>
          </RevealText>
        </div>

        {/* Cards — asymmetric stagger */}
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
