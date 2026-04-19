import type { Metadata } from 'next'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import FAQSection from '@/components/ui/FAQSection'

export const metadata: Metadata = {
  title: 'Cómo funciona | Yele',
  description: 'De cero a publicado en 3–5 días. Así es el proceso de Yele — sin reuniones, sin código, sin complicaciones.',
}

const STEPS = [
  {
    number: '01',
    title: 'Nos cuentas tu negocio',
    body: 'Rellenas un formulario sencillo: nombre, sector, ciudad, qué quieres que haga tu web. Sin llamadas, sin reuniones. Solo la información que necesitamos para empezar.',
    detail: 'Tiempo estimado: 10 minutos.',
  },
  {
    number: '02',
    title: 'Elegimos tu plan',
    body: 'Seleccionas el plan que mejor se adapta a tu negocio. Sin pago inicial. El primer mes lo pagas solo si estás contento — tienes 14 días de prueba gratuita.',
    detail: 'Desde 19 €/mes · Sin permanencia.',
  },
  {
    number: '03',
    title: 'Diseñamos tu web',
    body: 'Nuestro equipo crea tu web desde cero — colores, tipografía, estructura y contenido adaptados a tu sector y ciudad. No usamos plantillas genéricas.',
    detail: 'Entrega en 3–5 días hábiles.',
  },
  {
    number: '04',
    title: 'Tú la revisas y apruebas',
    body: 'Te enviamos un enlace de previsualización. Puedes pedir cambios ilimitados antes de publicar. Cuando estés satisfecho, le damos al botón.',
    detail: 'Cambios incluidos en el proceso.',
  },
  {
    number: '05',
    title: 'Tu web está en línea',
    body: 'Publicamos con tu dominio propio, configuramos el SEO local y te entregamos acceso al panel de gestión. A partir de aquí, tú controlas tu contenido desde el móvil.',
    detail: 'Soporte incluido en tu suscripción.',
  },
]

export default function ComoFuncionaPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--color-light)', paddingTop: '120px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <ScrollReveal>
            <p style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-fog)',
              marginBottom: '16px',
              fontFamily: 'var(--font-body)',
            }}>
              El proceso
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 400,
              color: 'var(--color-dark)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '20px',
            }}>
              De cero a publicado en 3–5 días
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              color: 'var(--color-fog)',
              lineHeight: 1.7,
              marginBottom: '36px',
            }}>
              Sin reuniones interminables. Sin código. Sin sorpresas.<br />
              Nos das la información, nosotros nos encargamos de todo.
            </p>
            <Link
              href="/registro"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--color-dark)',
                color: 'white',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 600,
                padding: '14px 28px',
                textDecoration: 'none',
                borderRadius: '6px',
              }}
            >
              Quiero mi web →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 5-step process */}
      <section style={{ background: 'white', padding: '96px 0' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {STEPS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr',
                  gap: '32px',
                  alignItems: 'start',
                  paddingBottom: i < STEPS.length - 1 ? '48px' : '0',
                  borderBottom: i < STEPS.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                  marginBottom: i < STEPS.length - 1 ? '48px' : '0',
                }}>
                  {/* Number */}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '40px',
                    fontWeight: 300,
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    paddingTop: '4px',
                  }}>
                    {step.number}
                  </div>

                  {/* Content */}
                  <div>
                    <h2 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '22px',
                      fontWeight: 600,
                      color: 'var(--color-dark)',
                      lineHeight: 1.25,
                      marginBottom: '12px',
                    }}>
                      {step.title}
                    </h2>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: 'var(--color-fog)',
                      lineHeight: 1.7,
                      marginBottom: '10px',
                    }}>
                      {step.body}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      color: 'var(--color-accent)',
                    }}>
                      {step.detail}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        label="Preguntas frecuentes"
        heading="Todo lo que necesitas saber"
      />
    </>
  )
}
