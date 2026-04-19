import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ClippedGoeyGallery } from '@/components/ui/clipped-image'

export default function WebsiteGrid() {
  return (
    <section style={{ background: 'white', padding: '96px 0' }}>
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
              Webs reales
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 400,
              color: 'var(--color-dark)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}>
              Sitios que ya están funcionando
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--color-fog)',
              lineHeight: 1.65,
            }}>
              Cada web es única — diseñada para el sector, la ciudad y el cliente.
            </p>
          </div>
        </ScrollReveal>

        {/* Gallery */}
        <ClippedGoeyGallery />

      </div>
    </section>
  )
}
