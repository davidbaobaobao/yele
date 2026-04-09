'use client'

import { useRef, useEffect } from 'react'
import RevealText from '@/components/ui/RevealText'

interface Plan {
  name: string
  nameKanji: string
  price: string
  originalPrice?: string
  promo?: string
  featured?: boolean
  description: string
  includes: string[]
  notIncludes: string[]
  cta: string
}

const PLANS: Plan[] = [
  {
    name: 'Esencial',
    nameKanji: '一',
    price: '29',
    description: 'Para negocios que dan el primer paso online',
    includes: [
      'Web personalizada para tu negocio',
      'Hasta 4 páginas',
      'Diseño a medida (no es plantilla)',
      'Formulario de contacto',
      'Botón de WhatsApp',
      'Google Maps integrado',
      'SEO básico local',
      'Dominio .es o .com incluido',
      'SSL incluido',
      'Responsive (móvil y escritorio)',
      'Soporte por email',
    ],
    notIncludes: ['Animaciones avanzadas', 'Rediseño anual', 'SEO avanzado'],
    cta: 'empezar con esencial →',
  },
  {
    name: 'Profesional',
    nameKanji: '二',
    price: '49',
    featured: true,
    description: 'Para negocios que quieren destacar y crecer',
    includes: [
      'Todo lo del plan Esencial',
      'Hasta 8 páginas',
      'Animaciones avanzadas',
      'Rediseño completo cada 12 meses',
      'SEO técnico (meta tags, sitemap, GSC)',
      'Galería de fotos',
      'Sección de testimonios',
      '1 ronda de cambios por mes',
      'Soporte por WhatsApp',
    ],
    notIncludes: ['SEO avanzado', 'Rediseño semestral'],
    cta: 'empezar con profesional →',
  },
  {
    name: 'Avanzada',
    nameKanji: '三',
    price: '89',
    promo: 'todo incluido',
    description: 'Para negocios establecidos con presencia digital activa',
    includes: [
      'Todo lo del plan Profesional',
      'Páginas ilimitadas',
      'Blog con CMS propio',
      'Rediseño completo cada 6 meses',
      'SEO avanzado (estrategia local, informe mensual)',
      'Estadísticas mensuales',
      '2 rondas de cambios por mes',
      'Soporte prioritario (< 4h de respuesta)',
      'Formulario de reservas básico',
    ],
    notIncludes: [],
    cta: 'empezar con avanzada →',
  },
]

// Minimal check SVG
const CheckMark = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '3px' }}>
    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="var(--tertiary-fixed)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function PlanCard({ plan, idx }: { plan: Plan; idx: number }) {
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
        background: plan.featured ? 'var(--secondary-container)' : 'var(--surface-container-low)',
        border: plan.featured ? '0.5px solid var(--tertiary-fixed)' : '0.5px solid rgba(200,194,180,0.2)',
        padding: '36px 32px',
        marginTop: idx % 2 === 1 ? '40px' : '0',
      }}
    >
      {/* Kanji watermark */}
      <div
        aria-hidden="true"
        className="absolute top-4 right-6 select-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-newsreader)',
          fontStyle: 'italic',
          fontSize: '64px',
          color: 'var(--tertiary-fixed)',
          opacity: plan.featured ? 0.5 : 0.3,
          lineHeight: 1,
        }}
      >
        {plan.nameKanji}
      </div>

      {/* Promo badge */}
      {plan.promo && (
        <span
          className="block mb-5"
          style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.18em', color: 'var(--on-tertiary-container)', padding: '3px 8px', background: 'rgba(197,236,210,0.25)', alignSelf: 'flex-start' }}
        >
          {plan.promo}
        </span>
      )}

      {/* Plan name */}
      <span
        style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.3em', color: 'rgba(28,28,24,0.4)' }}
      >
        {plan.name.toLowerCase()}
      </span>

      {/* Price */}
      <div className="flex items-baseline gap-2 mt-3 mb-2">
        {plan.originalPrice && (
          <span
            style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', fontWeight: 200, color: 'rgba(28,28,24,0.3)', textDecoration: 'line-through' }}
          >
            {plan.originalPrice} €
          </span>
        )}
        <span
          style={{ fontFamily: 'var(--font-newsreader)', fontSize: '52px', fontWeight: 300, color: 'var(--on-surface)', lineHeight: 1 }}
        >
          {plan.price}
        </span>
        <span
          style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', fontWeight: 200, letterSpacing: '0.1em', color: 'rgba(28,28,24,0.45)' }}
        >
          €/mes
        </span>
      </div>

      <p
        style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 200, color: 'rgba(28,28,24,0.5)', lineHeight: 1.7, letterSpacing: '0.02em', marginBottom: '28px' }}
      >
        {plan.description}
      </p>

      {/* sumi rule */}
      <div className="sumi-rule mb-6" aria-hidden="true" />

      {/* Features */}
      <ul className="flex flex-col gap-3 flex-1 mb-8">
        {plan.includes.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckMark />
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 200, color: 'rgba(28,28,24,0.7)', lineHeight: 1.6, letterSpacing: '0.01em' }}>
              {item}
            </span>
          </li>
        ))}
        {plan.notIncludes.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 opacity-30">
            <span style={{ width: '10px', flexShrink: 0, marginTop: '3px', fontFamily: 'var(--font-inter)', fontSize: '10px', color: 'rgba(28,28,24,0.4)' }}>—</span>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 200, color: 'rgba(28,28,24,0.6)', lineHeight: 1.6, letterSpacing: '0.01em' }}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="/contacto"
        className="transition-all duration-400"
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '10px',
          fontWeight: 200,
          letterSpacing: '0.2em',
          color: plan.featured ? 'var(--on-surface)' : 'rgba(28,28,24,0.6)',
          textDecoration: 'none',
          borderBottom: plan.featured ? '0.5px solid var(--tertiary-fixed)' : '0.5px solid rgba(200,194,180,0.4)',
          paddingBottom: '2px',
          alignSelf: 'flex-start',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--on-tertiary-container)'; e.currentTarget.style.borderColor = 'var(--tertiary-fixed)' }}
        onMouseLeave={e => {
          e.currentTarget.style.color = plan.featured ? 'var(--on-surface)' : 'rgba(28,28,24,0.6)'
          e.currentTarget.style.borderColor = plan.featured ? 'var(--tertiary-fixed)' : 'rgba(200,194,180,0.4)'
        }}
      >
        {plan.cta}
      </a>
    </div>
  )
}

export default function Pricing() {
  return (
    <section
      id="precios"
      className="py-24 lg:py-32"
      style={{ background: 'var(--surface)' }}
      aria-labelledby="pricing-heading"
    >
      <div style={{ paddingLeft: 'max(40px, 8vw)', paddingRight: 'max(40px, 6vw)' }}>
        {/* Header */}
        <div className="mb-20 max-w-lg">
          <RevealText>
            <span
              className="block mb-5"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.35em', color: 'rgba(28,28,24,0.35)' }}
            >
              planes y precios
            </span>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              id="pricing-heading"
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                color: 'var(--on-surface)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                marginBottom: '12px',
              }}
            >
              Precio claro.{' '}
              <span style={{ fontStyle: 'italic' }}>Sin sorpresas.</span>
            </h2>
          </RevealText>
          <RevealText delay={0.15}>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 200, letterSpacing: '0.1em', color: 'rgba(28,28,24,0.45)' }}>
              Sin pago inicial. Sin permanencia. Cancela cuando quieras.
            </p>
          </RevealText>
        </div>

        {/* Plans grid */}
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {PLANS.map((plan, i) => (
            <PlanCard key={i} plan={plan} idx={i} />
          ))}
        </div>

        {/* Notes */}
        <RevealText delay={0.2} as="div">
          <p
            className="mt-12"
            style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', fontWeight: 200, letterSpacing: '0.05em', color: 'rgba(28,28,24,0.4)', lineHeight: 1.8 }}
          >
            Todos los planes incluyen dominio, alojamiento web, SSL y 1 ronda de revisión.<br />
            ¿Necesitas tienda online? Consúltanos — lo presupuestamos aparte.
          </p>
        </RevealText>
      </div>
    </section>
  )
}
