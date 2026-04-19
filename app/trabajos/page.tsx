import type { Metadata } from 'next'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ClippedGoeyGallery } from '@/components/ui/clipped-image'

export const metadata: Metadata = {
  title: 'Trabajos | Yele',
  description: 'Ejemplos de webs diseñadas para negocios reales en España. Cada sector tiene su propio diseño.',
}

export default function TrabajosPage() {
  return (
    <section style={{ background: 'white', paddingTop: '120px', paddingBottom: '96px' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <ScrollReveal>
          <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 64px' }}>
            <p style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-fog)',
              marginBottom: '10px',
              fontFamily: 'var(--font-body)',
            }}>
              Portafolio
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 400,
              color: 'var(--color-dark)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}>
              Sitios que ya están funcionando
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--color-fog)',
              lineHeight: 1.65,
              marginBottom: '36px',
            }}>
              Cada web es única — diseñada para el sector, la ciudad y el cliente.
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
          </div>
        </ScrollReveal>

        {/* Gallery */}
        <ClippedGoeyGallery />

      </div>
    </section>
  )
}
