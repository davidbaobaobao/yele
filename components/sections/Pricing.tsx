'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface Plan {
  name: string
  tagline: string
  badge?: string
  monthlyPrice: number
  annualMonthly: number
  annualTotal: number
  features: string[]
  highlighted: boolean
  cta: string
}

const PLANS: Plan[] = [
  {
    name: 'Básica',
    tagline: 'Para empezar',
    monthlyPrice: 19.90,
    annualMonthly: 15.90,
    annualTotal: 190.80,
    features: [
      'Hasta 4 páginas',
      'Diseño profesional',
      'Versión móvil incluida',
      'Dominio propio',
      'Panel de gestión',
      'Soporte por mensajes',
    ],
    highlighted: false,
    cta: 'Empezar con Básica',
  },
  {
    name: 'Profesional',
    tagline: 'El más elegido',
    badge: 'Más popular',
    monthlyPrice: 29,
    annualMonthly: 23.20,
    annualTotal: 278.40,
    features: [
      'Todo lo de Básica',
      'Hasta 6 páginas',
      'SEO local avanzado',
      'Blog (hasta 10 posts)',
      'Galería avanzada',
      'Integración WhatsApp',
      'Soporte prioritario',
    ],
    highlighted: true,
    cta: 'Empezar con Profesional',
  },
  {
    name: 'Avanzada',
    tagline: 'Sin límites',
    monthlyPrice: 59,
    annualMonthly: 47.20,
    annualTotal: 566.40,
    features: [
      'Todo lo de Profesional',
      'Páginas ilimitadas',
      'Secciones personalizadas',
      'Funcionalidades a medida',
      'Prioridad máxima en soporte',
    ],
    highlighted: false,
    cta: 'Empezar con Avanzada',
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section style={{ background: 'var(--color-light)', paddingTop: '96px', paddingBottom: '96px' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>

        {/* Header */}
        <ScrollReveal>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-fog)',
              marginBottom: '10px',
              fontFamily: 'var(--font-body)',
            }}>
              Precios
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 400,
              color: 'var(--color-dark)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '32px',
            }}>
              Un precio fijo. Todo incluido.
            </h2>

            {/* Billing toggle */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '48px' }}>
              <button
                onClick={() => setAnnual(false)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '6px',
                  border: annual ? '1px solid rgba(139,126,110,0.3)' : 'none',
                  background: annual ? 'transparent' : 'var(--color-dark)',
                  color: annual ? 'var(--color-fog)' : 'white',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 200ms',
                }}
              >
                Mensual
              </button>
              <button
                onClick={() => setAnnual(true)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '6px',
                  border: annual ? 'none' : '1px solid rgba(139,126,110,0.3)',
                  background: annual ? 'var(--color-dark)' : 'transparent',
                  color: annual ? 'white' : 'var(--color-fog)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 200ms',
                }}
              >
                Anual
              </button>
              {annual && (
                <span style={{
                  background: '#d1fae5',
                  color: '#065f46',
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-body)',
                }}>
                  2 meses gratis
                </span>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Plan cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
          alignItems: 'start',
        }}>
          {PLANS.map((plan, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div style={{
                position: 'relative',
                background: 'white',
                borderRadius: '12px',
                padding: '32px',
                border: plan.highlighted ? `2px solid var(--color-accent)` : '1px solid rgba(200,194,180,0.3)',
                boxShadow: plan.highlighted ? '0 8px 32px rgba(212,168,67,0.12)' : '0 1px 3px rgba(0,0,0,0.06)',
                transform: plan.highlighted ? 'scale(1.04)' : 'scale(1)',
              }}>

                {/* Popular badge */}
                {plan.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'var(--color-accent)',
                    color: 'var(--color-dark)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontFamily: 'var(--font-body)',
                  }}>
                    {plan.badge}
                  </span>
                )}

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: 400,
                  color: 'var(--color-dark)',
                  marginBottom: '4px',
                }}>
                  {plan.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--color-fog)',
                  marginBottom: '20px',
                }}>
                  {plan.tagline}
                </p>

                {/* Price */}
                <div style={{ marginBottom: '4px' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '48px',
                    fontWeight: 400,
                    color: 'var(--color-dark)',
                    lineHeight: 1,
                  }}>
                    €{annual ? plan.annualMonthly.toFixed(2) : plan.monthlyPrice % 1 === 0 ? plan.monthlyPrice : plan.monthlyPrice.toFixed(2)}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'var(--color-fog)',
                    marginLeft: '4px',
                  }}>
                    /mes
                  </span>
                </div>
                {annual && (
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: 'var(--color-fog)',
                    marginBottom: '20px',
                  }}>
                    Facturado €{plan.annualTotal.toFixed(2)}/año
                  </p>
                )}

                {/* Divider */}
                <div style={{ height: '0.5px', background: 'rgba(200,194,180,0.3)', margin: '20px 0' }} />

                {/* Features */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <CheckCircle2 size={16} color="var(--color-accent)" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(28,28,24,0.7)', lineHeight: 1.5 }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="/registro"
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    padding: '12px 20px',
                    borderRadius: '6px',
                    background: plan.highlighted ? 'var(--color-accent)' : 'var(--color-dark)',
                    color: plan.highlighted ? 'var(--color-dark)' : 'white',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'opacity 200ms',
                    boxSizing: 'border-box',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                >
                  {plan.cta}
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Footer note */}
        <ScrollReveal delay={240}>
          <p style={{
            textAlign: 'center',
            marginTop: '32px',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--color-fog)',
          }}>
            Sin permanencia · Cancela cuando quieras · Primeros 14 días gratis
          </p>
        </ScrollReveal>

      </div>
    </section>
  )
}
