import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const CELLS = Array.from({ length: 9 }, (_, i) => i)

export default function WebsiteGrid() {
  return (
    <section>
      <style>{`
        .wg-cell img { transition: transform 400ms ease, filter 400ms ease; }
        .wg-cell:hover img { transform: scale(1.03); filter: brightness(1.1); }
      `}</style>

      {/* Header */}
      <div style={{ paddingTop: '64px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '72rem', margin: '0 auto', textAlign: 'center' }}>
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
            Webs reales
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 400,
            color: 'var(--color-dark)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '12px',
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
        </ScrollReveal>
      </div>

      {/* Full-width 3×3 grid — no gaps, images touch */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
        {CELLS.map(i => (
          <div
            key={i}
            className="wg-cell"
            style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}
          >
            <Image
              src="/website_animation_draft.png"
              alt="Ejemplo de web Yele"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
