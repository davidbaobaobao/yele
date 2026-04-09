'use client'

import { useRef, useEffect } from 'react'
import RevealText from '@/components/ui/RevealText'

const STATS = [
  { value: '3',    unit: 'días',   label: 'de la solicitud a la web publicada' },
  { value: '100%', unit: '',       label: 'responsive. funciona en cualquier pantalla' },
  { value: 'SEO',  unit: '',       label: 'optimizado desde el primer día' },
  { value: '0€',   unit: 'inicio', label: 'sin pago inicial ni permanencia' },
  { value: '24h',  unit: '',       label: 'soporte por WhatsApp incluido' },
  { value: '∞',    unit: '',       label: 'actualizaciones y mantenimiento incluidos' },
]

const CAPABILITIES = [
  {
    title:       'Diseño editorial',
    description: 'Cada web es una composición única para tu negocio — no existen dos iguales. Trabajo artesanal, no plantillas.',
  },
  {
    title:       'Velocidad de carga',
    description: 'Optimizadas para Core Web Vitals. Código limpio, imágenes comprimidas, carga ultrarrápida en móvil.',
  },
  {
    title:       'SEO técnico incluido',
    description: 'Meta tags, sitemap, structured data y Google Search Console configurados desde el día uno.',
  },
  {
    title:       'Dominio y hosting',
    description: 'Dominio .es o .com, SSL, alojamiento premium y copias de seguridad diarias. Todo incluido en la mensualidad.',
  },
  {
    title:       'Formularios y llamadas a la acción',
    description: 'Botón de WhatsApp, formulario de contacto, Google Maps y reservas básicas — lo que tu negocio necesita para convertir.',
  },
  {
    title:       'Rediseño periódico',
    description: 'Tu web evoluciona con tu negocio. Rediseño completo incluido cada 12 meses (plan Profesional) o cada 6 (plan Avanzada).',
  },
]

function StatBox({ stat, idx }: { stat: typeof STATS[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { el.classList.remove('reveal-hidden'); el.classList.add('reveal-visible') }, idx * 60)
          obs.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [idx])

  return (
    <div
      ref={ref}
      className="reveal-hidden"
      style={{
        padding: '28px 24px',
        borderBottom: '0.5px solid rgba(200,194,180,0.25)',
        borderRight: '0.5px solid rgba(200,194,180,0.15)',
      }}
    >
      <div style={{ marginBottom: '8px' }}>
        <span
          style={{
            fontFamily: 'var(--font-newsreader)',
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            color: 'var(--on-surface)',
            lineHeight: 1,
          }}
        >
          {stat.value}
        </span>
        {stat.unit && (
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '11px',
              fontWeight: 200,
              letterSpacing: '0.12em',
              color: 'var(--on-tertiary-container)',
              marginLeft: '6px',
            }}
          >
            {stat.unit}
          </span>
        )}
      </div>
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '11px',
          fontWeight: 200,
          letterSpacing: '0.04em',
          color: 'rgba(28,28,24,0.5)',
          lineHeight: 1.5,
        }}
      >
        {stat.label}
      </p>
    </div>
  )
}

function CapabilityRow({ cap, idx }: { cap: typeof CAPABILITIES[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { el.classList.remove('reveal-hidden'); el.classList.add('reveal-visible') }, idx * 55)
          obs.unobserve(el)
        }
      },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [idx])

  return (
    <div
      ref={ref}
      className="reveal-hidden flex flex-col md:flex-row md:items-start gap-4 py-7"
      style={{ borderBottom: '0.5px solid rgba(200,194,180,0.25)' }}
    >
      <span
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '9px',
          fontWeight: 200,
          letterSpacing: '0.25em',
          color: 'var(--on-tertiary-container)',
          paddingTop: '4px',
          minWidth: '100px',
          flexShrink: 0,
        }}
      >
        {String(idx + 1).padStart(2, '0')}
      </span>
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-newsreader)',
            fontStyle: 'italic',
            fontSize: '18px',
            fontWeight: 300,
            color: 'var(--on-surface)',
            marginBottom: '6px',
            lineHeight: 1.3,
          }}
        >
          {cap.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '13px',
            fontWeight: 200,
            color: 'rgba(28,28,24,0.55)',
            lineHeight: 1.75,
            letterSpacing: '0.02em',
          }}
        >
          {cap.description}
        </p>
      </div>
    </div>
  )
}

export default function Capabilities() {
  return (
    <section
      id="capacidades"
      className="py-24 lg:py-32"
      style={{ background: 'var(--surface)' }}
      aria-labelledby="capabilities-heading"
    >
      <div style={{ paddingLeft: 'max(40px, 8vw)', paddingRight: 'max(40px, 6vw)' }}>

        {/* Header */}
        <div className="mb-16 max-w-lg">
          <RevealText>
            <span
              className="block mb-5"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.35em', color: 'rgba(28,28,24,0.35)' }}
            >
              lo que incluye
            </span>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              id="capabilities-heading"
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                color: 'var(--on-surface)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              Todo listo.{' '}
              <span style={{ fontStyle: 'italic' }}>Desde el primer día.</span>
            </h2>
          </RevealText>
        </div>

        {/* Stats grid */}
        <div
          className="mb-20"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            borderTop: '0.5px solid rgba(200,194,180,0.25)',
            borderLeft: '0.5px solid rgba(200,194,180,0.15)',
          }}
        >
          {STATS.map((stat, i) => (
            <StatBox key={i} stat={stat} idx={i} />
          ))}
        </div>

        {/* Capabilities list */}
        <div style={{ maxWidth: '720px' }}>
          {CAPABILITIES.map((cap, i) => (
            <CapabilityRow key={i} cap={cap} idx={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
