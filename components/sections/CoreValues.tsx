import { ReactNode } from 'react'
import { Pencil, Clock, Smartphone, BadgeEuro } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { LucideIcon } from 'lucide-react'

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div
    aria-hidden
    className="relative mx-auto size-36"
    style={{
      maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)',
    }}
  >
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
    }} />
    <div style={{
      position: 'absolute',
      inset: 0,
      margin: 'auto',
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',
      borderTop: '1px solid rgba(0,0,0,0.08)',
      borderLeft: '1px solid rgba(0,0,0,0.08)',
    }}>
      {children}
    </div>
  </div>
)

const VALUES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Pencil,
    title: 'Hecho para ti, no por ti',
    body: 'No es una plantilla. Es tu web diseñada desde cero para tu negocio, sector y ciudad.',
  },
  {
    icon: Clock,
    title: 'En línea en 3–5 días',
    body: 'Sin esperas. Sin reuniones interminables. Nos das la información, nosotros nos encargamos.',
  },
  {
    icon: Smartphone,
    title: 'Cero conocimientos técnicos',
    body: 'Actualiza tu web desde el móvil. Sin código. Sin llamar a nadie. Los cambios aparecen solos.',
  },
  {
    icon: BadgeEuro,
    title: 'Un precio fijo, sin sorpresas',
    body: 'Desde 19€/mes. Sin costes ocultos ni facturas inesperadas. Cancela cuando quieras.',
  },
]

export default function CoreValues() {
  return (
    <section className="py-24" style={{ background: 'var(--color-light)' }}>
      <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">

        {/* Header — centered */}
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
            }}>
              Diseñado para negocios reales
            </h2>
          </div>
        </ScrollReveal>

        {/* Single column of cards — centered, max-w-640 */}
        <div style={{
          maxWidth: '640px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {VALUES.map((v, i) => {
            const Icon = v.icon
            return (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{
                  background: 'rgba(0,0,0,0.03)',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center',
                }}>
                  <CardDecorator>
                    <Icon size={24} color="var(--color-accent)" strokeWidth={1.5} />
                  </CardDecorator>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--color-dark)',
                    marginTop: '24px',
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}>
                    {v.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--color-fog)',
                    lineHeight: 1.7,
                    margin: 0,
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
