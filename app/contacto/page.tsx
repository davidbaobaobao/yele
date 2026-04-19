import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import FAQSection from '@/components/ui/FAQSection'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Contacto | Yele',
  description: 'Cuéntanos tu negocio. Diseñamos y publicamos tu web en 3–5 días desde 19 €/mes.',
}

export default function ContactPage() {
  return (
    <>
      {/* Two-column contact section */}
      <section
        style={{ background: 'var(--color-light)', paddingTop: '120px', paddingBottom: '96px' }}
        aria-labelledby="contact-heading"
      >
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 24px' }}>

          <div
            className="contact-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,2fr) minmax(0,3fr)',
              gap: '80px',
              alignItems: 'start',
            }}
          >
            {/* Left — contact info */}
            <ScrollReveal>
              <p style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-fog)',
                marginBottom: '10px',
                fontFamily: 'var(--font-body)',
              }}>
                Contacto
              </p>
              <h1
                id="contact-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  fontWeight: 400,
                  color: 'var(--color-dark)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '16px',
                }}
              >
                Hablemos.
              </h1>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--color-fog)',
                lineHeight: 1.7,
                marginBottom: '40px',
              }}>
                Rellena el formulario y te contactamos en menos de 24 horas.
                Sin compromisos.
              </p>

              {/* Contact details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-fog)',
                    marginBottom: '4px',
                  }}>
                    Email
                  </p>
                  <a
                    href="mailto:hola@yele.design"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: 'var(--color-dark)',
                      textDecoration: 'none',
                    }}
                  >
                    hola@yele.design
                  </a>
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-fog)',
                    marginBottom: '4px',
                  }}>
                    Respuesta
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'var(--color-dark)',
                  }}>
                    En menos de 24 horas
                  </p>
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-fog)',
                    marginBottom: '4px',
                  }}>
                    Precio
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'var(--color-dark)',
                  }}>
                    Desde 19 €/mes · Sin permanencia
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right — form */}
            <ScrollReveal delay={120}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        label="Preguntas frecuentes"
        heading="Todo lo que necesitas saber"
        maxWidth="640px"
      />

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </>
  )
}
