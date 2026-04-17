'use client'

import { Pencil, Clock, Smartphone, BadgeEuro } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { LucideIcon } from 'lucide-react'

const VALUES: { icon: LucideIcon; headline: string; body: string }[] = [
  {
    icon: Pencil,
    headline: 'Hecho para ti, no por ti',
    body: 'No es una plantilla. No es un editor de arrastrar y soltar. Es tu web, diseñada desde cero para tu negocio, tu sector y tu ciudad.',
  },
  {
    icon: Clock,
    headline: 'En línea en 3–5 días',
    body: 'Sin esperas de semanas. Sin reuniones interminables. Nos das la información, nosotros nos encargamos del resto.',
  },
  {
    icon: Smartphone,
    headline: 'Cero conocimientos técnicos',
    body: 'Tú actualizas tu menú, tus horarios o tus fotos desde el móvil. Sin código. Sin llamar a nadie. Los cambios aparecen solos.',
  },
  {
    icon: BadgeEuro,
    headline: 'Un precio fijo, sin sorpresas',
    body: 'Sin costes ocultos, sin facturas inesperadas. Pagas lo mismo cada mes y tu web siempre está al día.',
  },
]

export default function CoreValues() {
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
            Por qué Yele
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
            Diseñado para negocios reales
          </h2>
        </ScrollReveal>

        {/* 2×2 grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {VALUES.map((v, i) => {
            const Icon = v.icon
            return (
              <ScrollReveal key={i} delay={i * 80}>
                <div
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '32px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    transition: 'transform 300ms ease, box-shadow 300ms ease',
                    height: '100%',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.transform = 'translateY(-4px)'
                    el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'
                  }}
                >
                  <Icon size={28} color="var(--color-accent)" strokeWidth={1.5} />
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: 'var(--color-dark)',
                    marginTop: '16px',
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}>
                    {v.headline}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'var(--color-fog)',
                    lineHeight: 1.75,
                  }}>
                    {v.body}
                  </p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
