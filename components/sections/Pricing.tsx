'use client'

import { useState } from 'react'
import { PricingCard } from '@/components/ui/pricing-card'

const PLANS = [
  {
    title: 'Básica',
    tagline: 'Para empezar',
    monthlyPrice: '€19.90',
    monthlyDesc: 'al mes · facturado mensualmente',
    annualPrice: '€15.90',
    annualDesc: 'al mes · facturado €190.80/año',
    description: 'Perfecta para autónomos y pequeños negocios que quieren presencia online profesional.',
    features: [
      'Hasta 4 páginas',
      'Diseño profesional',
      'Versión móvil incluida',
      'Dominio propio',
      'Panel de gestión',
      'Soporte por mensajes',
    ],
    buttonText: 'Empezar con Básica',
    href: '/registro',
    imageSrc: 'https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-gyoxLFpXzRRzVsgPJOKvB2r4tvzpcy.png&w=320&q=75',
    imageAlt: 'Plan Básica',
    highlighted: false,
    badge: undefined,
  },
  {
    title: 'Profesional',
    tagline: 'El más elegido',
    monthlyPrice: '€29',
    monthlyDesc: 'al mes · facturado mensualmente',
    annualPrice: '€23.20',
    annualDesc: 'al mes · facturado €278.40/año',
    description: 'Para negocios que quieren crecer online con más páginas, blog y SEO local avanzado.',
    features: [
      'Todo lo de Básica',
      'Hasta 6 páginas',
      'SEO local avanzado',
      'Blog (hasta 10 posts)',
      'Galería avanzada',
      'Integración WhatsApp',
      'Soporte prioritario',
    ],
    buttonText: 'Empezar con Profesional',
    href: '/registro',
    imageSrc: 'https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-v98BP3EQdx0Yd0NkjHPnWx33WvzwGP.png&w=320&q=75',
    imageAlt: 'Plan Profesional',
    highlighted: true,
    badge: 'Más popular',
  },
  {
    title: 'Avanzada',
    tagline: 'Sin límites',
    monthlyPrice: '€59',
    monthlyDesc: 'al mes · facturado mensualmente',
    annualPrice: '€47.20',
    annualDesc: 'al mes · facturado €566.40/año',
    description: 'Para negocios con necesidades específicas que requieren páginas ilimitadas y funcionalidades a medida.',
    features: [
      'Todo lo de Profesional',
      'Páginas ilimitadas',
      'Secciones personalizadas',
      'Funcionalidades a medida',
      'Prioridad máxima en soporte',
    ],
    buttonText: 'Empezar con Avanzada',
    href: '/registro',
    imageSrc: 'https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-v98BP3EQdx0Yd0NkjHPnWx33WvzwGP.png&w=320&q=75',
    imageAlt: 'Plan Avanzada',
    highlighted: false,
    badge: undefined,
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <>
      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .pricing-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .pricing-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>

      <section style={{ background: 'var(--color-light)', padding: '96px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

          {/* Label + Heading */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 700,
              color: 'var(--color-dark)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              Un precio fijo. Todo incluido.
            </h2>
          </div>

          {/* Billing toggle */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '48px',
          }}>
            <div style={{
              display: 'flex',
              gap: '4px',
              background: 'rgba(0,0,0,0.06)',
              borderRadius: '8px',
              padding: '4px',
            }}>
              <button
                onClick={() => setAnnual(false)}
                style={{
                  padding: '8px 24px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  background: !annual ? 'white' : 'transparent',
                  color: !annual ? 'var(--color-dark)' : 'var(--color-fog)',
                  boxShadow: !annual ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                Mensual
              </button>
              <button
                onClick={() => setAnnual(true)}
                style={{
                  padding: '8px 24px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  background: annual ? 'white' : 'transparent',
                  color: annual ? 'var(--color-dark)' : 'var(--color-fog)',
                  boxShadow: annual ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                Anual
                {annual && (
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    background: 'var(--color-accent)',
                    color: 'var(--color-dark)',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    letterSpacing: '0.06em',
                  }}>
                    2 MESES GRATIS
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Plan cards — 3 columns with center card elevated */}
          <div className="pricing-grid" style={{ alignItems: 'start' }}>
            {PLANS.map((plan) => (
              <PricingCard
                key={plan.title}
                title={plan.title}
                tagline={plan.tagline}
                price={annual ? plan.annualPrice : plan.monthlyPrice}
                priceDescription={annual ? plan.annualDesc : plan.monthlyDesc}
                description={plan.description}
                features={plan.features}
                buttonText={plan.buttonText}
                href={plan.href}
                imageSrc={plan.imageSrc}
                imageAlt={plan.imageAlt}
                highlighted={plan.highlighted}
                badge={plan.badge}
                style={plan.highlighted ? {
                  marginTop: '-12px',
                  marginBottom: '-12px',
                  position: 'relative',
                  zIndex: 1,
                } : {}}
              />
            ))}
          </div>

          {/* Custom/enterprise wide card */}
          <div style={{
            marginTop: '44px',
            background: 'white',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '12px',
            padding: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}>
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
                color: 'var(--color-dark)',
                marginBottom: '6px',
              }}>
                ¿Necesitas algo a medida?
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-fog)',
                lineHeight: 1.65,
                maxWidth: '500px',
                fontFamily: 'var(--font-body)',
              }}>
                Si tu negocio tiene necesidades específicas — tienda online, reservas, multiidioma — cuéntanos y diseñamos una solución para ti.
              </p>
            </div>
            <a
              href="/contacto"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'var(--color-dark)',
                color: 'white',
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'opacity 0.2s',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              Hablemos →
            </a>
          </div>

          {/* Fine print */}
          <p style={{
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '13px',
            color: 'var(--color-fog)',
            fontFamily: 'var(--font-body)',
          }}>
            Sin permanencia · Cancela cuando quieras · Primeros 14 días gratis
          </p>

        </div>
      </section>
    </>
  )
}
