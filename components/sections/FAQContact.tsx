'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const FAQS = [
  {
    q: '¿Cuánto tiempo tarda en estar lista mi web?',
    a: 'Entre 3 y 5 días hábiles desde que nos confirmas el contenido y apruebas el diseño.',
  },
  {
    q: '¿Necesito saber programar o diseñar?',
    a: 'No. Nosotros nos encargamos de todo. Tú solo necesitas darnos la información de tu negocio.',
  },
  {
    q: '¿Puedo cambiar el contenido yo mismo?',
    a: 'Sí. Tienes un panel propio donde puedes actualizar textos, precios, fotos y más. Sin tocar código.',
  },
  {
    q: '¿Qué pasa si quiero cancelar?',
    a: 'Puedes cancelar cuando quieras, sin penalización. Tu web deja de estar activa al final del período pagado.',
  },
  {
    q: '¿El dominio (.es, .com) está incluido?',
    a: 'Sí. El dominio del primer año está incluido en todos los planes. A partir del segundo año se renueva por separado (~12 €/año).',
  },
  {
    q: '¿Puedo hablar con alguien antes de contratar?',
    a: 'Claro. Escríbenos por el formulario o al WhatsApp y te respondemos en menos de 24 horas.',
  },
]

function FAQItem({ faq, idx }: { faq: typeof FAQS[0]; idx: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '16px',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          fontWeight: 500,
          color: 'var(--color-dark)',
          lineHeight: 1.4,
        }}>
          {faq.q}
        </span>
        <ChevronDown
          size={18}
          color="var(--color-fog)"
          strokeWidth={1.5}
          style={{
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 300ms ease',
          }}
        />
      </button>
      <div style={{
        maxHeight: open ? '300px' : '0',
        overflow: 'hidden',
        transition: 'max-height 400ms cubic-bezier(0.16,1,0.3,1)',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--color-fog)',
          lineHeight: 1.7,
          paddingBottom: '18px',
        }}>
          {faq.a}
        </p>
      </div>
    </div>
  )
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(200,194,180,0.6)',
  padding: '12px 0',
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  color: 'var(--color-dark)',
  outline: 'none',
  transition: 'border-color 200ms',
  borderRadius: 0,
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--color-fog)',
  marginBottom: '6px',
  display: 'block',
}

export default function FAQContact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [values, setValues] = useState({ nombre: '', email: '', telefono: '', mensaje: '', rgpd: false })

  function handleChange(field: string, value: string | boolean) {
    setValues(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!values.nombre || !values.email || !values.mensaje || !values.rgpd) return
    setFormState('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: values.nombre, email: values.email, telefono: values.telefono, mensaje: values.mensaje }),
      })
      setFormState(res.ok ? 'success' : 'error')
    } catch {
      setFormState('error')
    }
  }

  return (
    <section style={{ background: 'var(--color-light)', paddingTop: '96px', paddingBottom: '96px' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>

        {/* Header */}
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
            FAQ y Contacto
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 400,
            color: 'var(--color-dark)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '48px',
          }}>
            Preguntas frecuentes
          </h2>
        </ScrollReveal>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,3fr) minmax(0,2fr)',
          gap: '64px',
          alignItems: 'start',
        }}
        className="faq-contact-grid"
        >

          {/* Left — FAQ */}
          <ScrollReveal>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              {FAQS.map((faq, i) => (
                <FAQItem key={i} faq={faq} idx={i} />
              ))}
            </div>
          </ScrollReveal>

          {/* Right — Contact form */}
          <ScrollReveal delay={120}>
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

              <div>
                <label style={labelStyle}>Nombre</label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={values.nombre}
                  onChange={e => handleChange('nombre', e.target.value)}
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--color-accent)' }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(200,194,180,0.6)' }}
                />
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={values.email}
                  onChange={e => handleChange('email', e.target.value)}
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--color-accent)' }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(200,194,180,0.6)' }}
                />
              </div>

              <div>
                <label style={labelStyle}>Teléfono</label>
                <input
                  type="tel"
                  autoComplete="tel"
                  value={values.telefono}
                  onChange={e => handleChange('telefono', e.target.value)}
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--color-accent)' }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(200,194,180,0.6)' }}
                />
              </div>

              <div>
                <label style={labelStyle}>Mensaje</label>
                <textarea
                  required
                  rows={4}
                  value={values.mensaje}
                  onChange={e => handleChange('mensaje', e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--color-accent)' }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(200,194,180,0.6)' }}
                />
              </div>

              {/* RGPD */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  required
                  checked={values.rgpd}
                  onChange={e => handleChange('rgpd', e.target.checked)}
                  style={{ marginTop: '2px', accentColor: 'var(--color-accent)', width: '14px', height: '14px', flexShrink: 0 }}
                />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-fog)', lineHeight: 1.6 }}>
                  Acepto la{' '}
                  <a href="/politica-privacidad" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-dark)', textDecoration: 'underline' }}>
                    política de privacidad
                  </a>
                </span>
              </label>

              {/* Submit */}
              {formState === 'success' ? (
                <div style={{
                  padding: '14px 24px',
                  background: '#d1fae5',
                  color: '#065f46',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 500,
                  borderRadius: '6px',
                  textAlign: 'center',
                }}>
                  ✓ Mensaje enviado
                </div>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    style={{
                      width: '100%',
                      height: '48px',
                      background: formState === 'submitting' ? 'rgba(28,28,24,0.5)' : 'var(--color-dark)',
                      color: 'white',
                      border: 'none',
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: formState === 'submitting' ? 'not-allowed' : 'pointer',
                      borderRadius: '6px',
                      transition: 'background 200ms',
                    }}
                    onMouseEnter={e => { if (formState !== 'submitting') e.currentTarget.style.background = 'var(--color-accent)'; if (formState !== 'submitting') e.currentTarget.style.color = 'var(--color-dark)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-dark)'; e.currentTarget.style.color = 'white' }}
                  >
                    {formState === 'submitting' ? 'Enviando…' : 'Enviar mensaje'}
                  </button>
                  {formState === 'error' && (
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#b91c1c', textAlign: 'center' }}>
                      Error al enviar. Inténtalo de nuevo.
                    </p>
                  )}
                </>
              )}

            </form>
          </ScrollReveal>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
