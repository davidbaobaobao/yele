'use client'

import { Layers, Search, Globe, LayoutDashboard, Headphones, RefreshCw } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { LucideIcon } from 'lucide-react'

const SERVICES: { icon: LucideIcon; headline: string; body: string }[] = [
  {
    icon: Layers,
    headline: 'Diseño a medida',
    body: 'Cada web es única. Colores, tipografías y estilo adaptados a tu sector — no una plantilla genérica con tu logo pegado encima.',
  },
  {
    icon: Search,
    headline: 'Visible y optimizada',
    body: 'Diseño mobile-first y SEO local incluido para que aparezcas cuando alguien en tu ciudad busque lo que ofreces.',
  },
  {
    icon: Globe,
    headline: 'Dominio propio incluido',
    body: 'Tu dirección en internet (tucafeteria.es) configurada y lista desde el primer día. Sin gestiones, sin complicaciones.',
  },
  {
    icon: LayoutDashboard,
    headline: 'Panel de gestión',
    body: 'Actualiza tu menú, precios, equipo o galería desde el móvil en segundos. Los cambios aparecen en tu web solos.',
  },
  {
    icon: Headphones,
    headline: 'Soporte y mantenimiento',
    body: 'Actualizaciones de seguridad, soporte directo y mantenimiento incluidos. Tu web nunca queda desactualizada.',
  },
  {
    icon: RefreshCw,
    headline: 'Precio fijo mensual',
    body: 'Sin costes ocultos ni sorpresas. Cancela cuando quieras. Un precio claro que incluye todo lo que necesita tu web.',
  },
]

export default function Services() {
  return (
    <section style={{ background: 'var(--color-dark)', paddingTop: '96px', paddingBottom: '96px' }}>
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
            Qué incluye
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 400,
            color: 'white',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '48px',
          }}>
            Todo lo que necesita tu web
          </h2>
        </ScrollReveal>

        {/* 3×2 grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <ScrollReveal key={i} delay={i * 80}>
                <div
                  style={{
                    background: 'var(--color-secondary)',
                    borderRadius: '12px',
                    padding: '32px',
                    border: '1px solid transparent',
                    transition: 'transform 300ms ease, border-color 300ms ease',
                    height: '100%',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.transform = 'translateY(-4px)'
                    el.style.borderColor = 'rgba(212,168,67,0.3)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.transform = 'translateY(0)'
                    el.style.borderColor = 'transparent'
                  }}
                >
                  <Icon size={24} color="var(--color-accent)" strokeWidth={1.5} />
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'white',
                    marginTop: '16px',
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}>
                    {s.headline}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.75,
                  }}>
                    {s.body}
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
