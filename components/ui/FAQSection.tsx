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

function FAQItem({ faq }: { faq: typeof FAQS[0] }) {
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

interface FAQSectionProps {
  label?: string
  heading?: string
  maxWidth?: string
}

export default function FAQSection({
  label = 'Preguntas frecuentes',
  heading = 'Todo lo que necesitas saber',
  maxWidth = '640px',
}: FAQSectionProps) {
  return (
    <section style={{ background: 'var(--color-light)', padding: '96px 0' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 24px' }}>
        <ScrollReveal>
          <div style={{ maxWidth, margin: '0 auto' }}>
            <p style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-fog)',
              marginBottom: '10px',
              fontFamily: 'var(--font-body)',
            }}>
              {label}
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 400,
              color: 'var(--color-dark)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '40px',
            }}>
              {heading}
            </h2>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              {FAQS.map((faq, i) => (
                <FAQItem key={i} faq={faq} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
