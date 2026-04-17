import { ClipboardList, Palette, Code2, Eye, Rocket } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { LucideIcon } from 'lucide-react'

const STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ClipboardList,
    title: 'Nos cuentas tu negocio',
    body: 'Rellenas un formulario breve en menos de 5 minutos. Nos dices qué haces, dónde estás y cómo quieres que te vean.',
  },
  {
    icon: Palette,
    title: 'Diseñamos tu identidad',
    body: 'Creamos la paleta de colores, la tipografía y el estilo visual adaptado a tu sector y personalidad de marca.',
  },
  {
    icon: Code2,
    title: 'Construimos tu web',
    body: 'Nuestro equipo construye todas las páginas con tu contenido real. Sin plantillas, sin atajos.',
  },
  {
    icon: Eye,
    title: 'Tú la revisas',
    body: 'Te enviamos el enlace para que la veas antes de publicar. Si algo no encaja, lo ajustamos.',
  },
  {
    icon: Rocket,
    title: 'La publicamos',
    body: 'Tu web aparece en internet con tu dominio. Desde ese momento, tú gestionas el contenido desde tu panel.',
  },
]

export default function Process() {
  return (
    <section style={{ background: 'white', paddingTop: '96px', paddingBottom: '96px' }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>

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
            El proceso
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 400,
            color: 'var(--color-dark)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '56px',
          }}>
            De la idea a tu web en 5 pasos
          </h2>
        </ScrollReveal>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* Vertical connector line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '15px',
              top: '32px',
              bottom: '32px',
              width: '2px',
              background: 'rgba(212,168,67,0.2)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <ScrollReveal key={i} delay={i * 100}>
                  <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

                    {/* Number badge */}
                    <div style={{
                      flexShrink: 0,
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--color-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--color-dark)',
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      {i + 1}
                    </div>

                    {/* Content card */}
                    <div style={{
                      flex: 1,
                      background: 'white',
                      border: '1px solid rgba(0,0,0,0.06)',
                      borderRadius: '12px',
                      padding: '24px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    }}>
                      <Icon size={20} color="var(--color-accent)" strokeWidth={1.5} style={{ marginBottom: '12px' }} />
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: 'var(--color-dark)',
                        marginBottom: '8px',
                        lineHeight: 1.3,
                      }}>
                        {step.title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'var(--color-fog)',
                        lineHeight: 1.7,
                        margin: 0,
                      }}>
                        {step.body}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
