'use client'

import { useState } from 'react'
import RevealText from '@/components/ui/RevealText'

const FAQS = [
  {
    q: '¿Por qué 29 €? ¿Hay algo que no me estáis contando?',
    a: 'No hay trampa. Usamos herramientas modernas que nos permiten trabajar muy rápido. El ahorro en tiempo lo trasladamos al precio. El precio que ves es lo que pagas. Sin comisiones ocultas, sin letra pequeña.',
  },
  {
    q: '¿Cuánto tiempo tardo en tener mi web lista?',
    a: 'Entre 3 y 5 días laborables desde que nos mandas tus datos e imágenes. El plan Básica suele estar lista en 3 días.',
  },
  {
    q: '¿Qué pasa si quiero cambiar algo después?',
    a: 'Nos lo dices por WhatsApp. Los cambios de texto, horarios o fotos los hacemos sin coste adicional. El número de cambios mensuales depende de tu plan.',
  },
  {
    q: '¿Puedo cancelar cuando quiera?',
    a: 'Sí, sin permanencia ni penalizaciones. Avisas con 30 días de antelación y listo. No queremos clientes que no estén contentos.',
  },
  {
    q: '¿Necesito saber de informática?',
    a: 'No. Nosotros nos encargamos de todo: diseño, programación, publicación, dominio y alojamiento. Tú solo nos cuentas tu negocio.',
  },
  {
    q: '¿Mi web aparecerá en Google?',
    a: 'Sí. Todas las webs incluyen SEO básico local desde el primer día. El plan Avanzada incluye SEO avanzado con estrategia de contenidos.',
  },
]

function FAQItem({ faq, idx }: { faq: typeof FAQS[0]; idx: number }) {
  const [open, setOpen] = useState(false)
  const id = `faq-answer-${idx}`

  return (
    <div style={{ borderBottom: '0.5px solid rgba(200,194,180,0.3)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="w-full flex items-start justify-between py-6 text-left"
        style={{
          fontFamily: 'var(--font-newsreader)',
          fontStyle: 'italic',
          fontSize: '18px',
          fontWeight: 300,
          color: 'var(--on-surface)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span className="pr-8 leading-relaxed">{faq.q}</span>
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontStyle: 'normal',
            fontSize: '14px',
            fontWeight: 200,
            color: open ? 'var(--on-tertiary-container)' : 'rgba(28,28,24,0.35)',
            flexShrink: 0,
            marginTop: '2px',
            transition: 'color 0.3s ease',
          }}
          aria-hidden="true"
        >
          {open ? '−' : '+'}
        </span>
      </button>

      <div
        id={id}
        role="region"
        style={{
          maxHeight: open ? '400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <p
          className="pb-6"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '13px',
            fontWeight: 200,
            color: 'rgba(28,28,24,0.6)',
            lineHeight: 1.8,
            letterSpacing: '0.02em',
          }}
        >
          {faq.a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const col1 = FAQS.slice(0, 3)
  const col2 = FAQS.slice(3, 6)

  return (
    <section
      id="faq"
      className="py-24 lg:py-32"
      style={{ background: 'var(--surface-container-low)' }}
      aria-labelledby="faq-heading"
    >
      <div style={{ paddingLeft: 'max(40px, 8vw)', paddingRight: 'max(40px, 6vw)' }}>
        {/* Header */}
        <div className="mb-16 max-w-lg">
          <RevealText>
            <span
              className="block mb-5"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.35em', color: 'rgba(28,28,24,0.35)' }}
            >
              preguntas frecuentes
            </span>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              id="faq-heading"
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                color: 'var(--on-surface)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              ¿Tienes dudas?{' '}
              <span style={{ fontStyle: 'italic' }}>Normal.</span>
            </h2>
          </RevealText>
        </div>

        {/* Two-column accordion */}
        <div className="grid md:grid-cols-2 gap-0 md:gap-16">
          <div style={{ borderTop: '0.5px solid rgba(200,194,180,0.3)' }}>
            {col1.map((faq, i) => (
              <FAQItem key={i} faq={faq} idx={i} />
            ))}
          </div>
          <div style={{ borderTop: '0.5px solid rgba(200,194,180,0.3)' }}>
            {col2.map((faq, i) => (
              <FAQItem key={i + 3} faq={faq} idx={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
