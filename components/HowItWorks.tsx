'use client'

import { useRef, useEffect } from 'react'
import RevealText from '@/components/ui/RevealText'

const STEPS = [
  {
    number: '一',
    detail:  'día 1',
    title:   'Nos cuentas tu negocio',
    description: 'Rellenas un formulario sencillo. Nos dices quién eres, qué haces, tu teléfono y horario. 10 minutos, sin complicaciones.',
  },
  {
    number: '二',
    detail:  'días 1–3',
    title:   'Nosotros lo construimos todo',
    description: 'Diseñamos y desarrollamos tu web a medida. Tú no tienes que hacer nada más. Lo publicamos en tu dominio.',
  },
  {
    number: '三',
    detail:  'día 3',
    title:   'Tu negocio aparece en Google',
    description: 'Tu web está live, indexada, y lista para recibir clientes. Soporte incluido por WhatsApp para lo que necesites.',
  },
]

export default function HowItWorks() {
  const connectorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = connectorRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animation = 'connector_in 0.8s cubic-bezier(0.16,1,0.3,1) forwards'
          obs.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="como-funciona"
      className="py-24 lg:py-32"
      style={{ background: 'var(--surface-container-low)' }}
      aria-labelledby="how-heading"
    >
      <div style={{ paddingLeft: 'max(40px, 8vw)', paddingRight: 'max(40px, 6vw)' }}>
        {/* Header — left aligned */}
        <div className="mb-20 max-w-lg">
          <RevealText>
            <span
              className="block mb-5"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.35em', color: 'rgba(28,28,24,0.35)' }}
            >
              el proceso
            </span>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              id="how-heading"
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                color: 'var(--on-surface)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              De cero a publicado{' '}
              <span style={{ fontStyle: 'italic' }}>en 3 días.</span>
            </h2>
          </RevealText>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div
            ref={connectorRef}
            className="hidden md:block absolute"
            style={{
              top: '36px',
              left: '16.67%',
              right: '16.67%',
              height: '0.5px',
              background: 'none',
              borderTop: '0.5px dashed rgba(200,194,180,0.5)',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {STEPS.map((step, i) => (
              <RevealText key={i} delay={0.1 + i * 0.12} as="div">
                <div className="relative flex flex-col">
                  {/* Watermark number — kanji */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-4 left-0 select-none pointer-events-none"
                    style={{
                      fontFamily: 'var(--font-newsreader)',
                      fontStyle: 'italic',
                      fontSize: '88px',
                      color: 'var(--tertiary-fixed)',
                      opacity: 0.4,
                      lineHeight: 1,
                      zIndex: 0,
                    }}
                  >
                    {step.number}
                  </div>

                  <div className="relative z-10 pt-12">
                    <span
                      className="block mb-5"
                      style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.25em', color: 'rgba(28,28,24,0.35)' }}
                    >
                      {step.detail}
                    </span>

                    {/* sumi rule */}
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
                      {step.title}
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
                      {step.description}
                    </p>
                  </div>

                  {/* Vertical connector — mobile only */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="md:hidden mt-8 mx-auto"
                      style={{ width: '0.5px', height: '32px', borderLeft: '0.5px dashed rgba(200,194,180,0.5)' }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </RevealText>
            ))}
          </div>
        </div>

        {/* CTA — text link */}
        <div className="mt-16 flex justify-start">
          <a
            href="/como-funciona"
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
            ver cómo funciona en detalle →
          </a>
        </div>
      </div>
    </section>
  )
}
