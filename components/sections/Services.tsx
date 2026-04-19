import { ReactNode } from 'react'
import { Layers, Search, Globe, LayoutDashboard, Headphones, RefreshCw } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { LucideIcon } from 'lucide-react'

const CardDecoratorDark = ({ children }: { children: ReactNode }) => (
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
      backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
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
      background: 'var(--color-secondary)',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      borderLeft: '1px solid rgba(255,255,255,0.1)',
    }}>
      {children}
    </div>
  </div>
)

const SERVICES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Layers,
    title: 'Diseño a medida',
    body: 'Cada web es única. Colores y estilo adaptados a tu sector.',
  },
  {
    icon: Search,
    title: 'Visible y optimizada',
    body: 'Mobile-first y SEO local para que aparezcas cuando te busquen en tu ciudad.',
  },
  {
    icon: Globe,
    title: 'Dominio propio incluido',
    body: 'Tu dominio configurado y listo desde el primer día.',
  },
  {
    icon: LayoutDashboard,
    title: 'Panel de gestión',
    body: 'Actualiza tu contenido desde el móvil. Los cambios aparecen en tu web solos.',
  },
  {
    icon: Headphones,
    title: 'Soporte y mantenimiento',
    body: 'Soporte directo y actualizaciones de seguridad incluidas en tu suscripción.',
  },
  {
    icon: RefreshCw,
    title: 'Precio fijo mensual',
    body: 'Sin costes ocultos. Cancela cuando quieras. 19€/mes todo incluido.',
  },
]

export default function Services() {
  return (
    <section className="py-24" style={{ background: 'var(--color-dark)' }}>
      <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">

        {/* Header */}
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
              Qué incluye
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 400,
              color: 'white',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>
              Todo lo que necesita tu web
            </h2>
          </div>
        </ScrollReveal>

        {/* 3-col grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '24px',
        }}>
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <ScrollReveal key={i} delay={i * 60}>
                <div style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center',
                }}>
                  <CardDecoratorDark>
                    <Icon size={24} color="var(--color-accent)" strokeWidth={1.5} />
                  </CardDecoratorDark>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'white',
                    marginTop: '24px',
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}>
                    {s.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.7,
                    margin: 0,
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
