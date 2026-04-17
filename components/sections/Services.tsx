import { Globe, LayoutDashboard, Headphones } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const cardStyle: React.CSSProperties = {
  background: 'var(--color-secondary)',
  border: '1px solid rgba(255,255,255,0.06)',
}

export default function Services() {
  return (
    <section className="py-24" style={{ background: 'var(--color-dark)' }}>
      <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">

        {/* Section label + heading */}
        <ScrollReveal>
          <div className="mb-12">
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

        {/* 6-col dark bento grid */}
        <div className="grid grid-cols-6 gap-3">

          {/* CARD A — large stat: 100% móvil */}
          <ScrollReveal className="col-span-full lg:col-span-2" delay={0}>
            <Card className="flex overflow-hidden h-full" style={cardStyle}>
              <CardContent className="m-auto pt-6 text-center w-full">
                <div style={{
                  fontSize: '64px',
                  lineHeight: 1,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-accent)',
                  fontWeight: 700,
                }}>
                  100%
                </div>
                <div style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: '8px',
                  fontFamily: 'var(--font-body)',
                }}>
                  móvil
                </div>
                <h3 style={{
                  marginTop: '24px',
                  fontSize: '22px',
                  fontFamily: 'var(--font-display)',
                  color: 'white',
                  fontWeight: 400,
                  lineHeight: 1.25,
                }}>
                  Perfecta en el móvil
                </h3>
                <p style={{
                  marginTop: '8px',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.65,
                  fontFamily: 'var(--font-body)',
                  paddingBottom: '8px',
                }}>
                  El 70% de tus clientes te buscan desde el teléfono.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* CARD B — Dominio propio */}
          <ScrollReveal className="col-span-full sm:col-span-3 lg:col-span-2" delay={80}>
            <Card className="overflow-hidden h-full" style={cardStyle}>
              <CardContent className="pt-6 h-full flex flex-col items-center justify-center text-center">
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                }}>
                  <Globe size={24} color="var(--color-accent)" strokeWidth={1.5} />
                </div>
                <div style={{ marginTop: '24px' }}>
                  <h3 style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: 'white',
                    fontFamily: 'var(--font-display)',
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}>
                    Dominio propio
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.65,
                    fontFamily: 'var(--font-body)',
                    paddingBottom: '8px',
                  }}>
                    Tu dirección en internet configurada desde el primer día.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* CARD C — SEO sparkline (inverted) */}
          <ScrollReveal className="col-span-full sm:col-span-3 lg:col-span-2" delay={160}>
            <Card className="overflow-hidden h-full" style={cardStyle}>
              <CardContent className="pt-6 h-full flex flex-col">
                <svg viewBox="0 0 200 60" className="w-full" style={{ color: 'var(--color-accent)' }}>
                  <defs>
                    <linearGradient id="grad-dark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polyline
                    points="0,50 30,40 60,45 90,20 120,30 150,10 180,15 200,5 200,60 0,60"
                    fill="url(#grad-dark)"
                  />
                  <polyline
                    points="0,50 30,40 60,45 90,20 120,30 150,10 180,15 200,5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <div style={{ marginTop: '16px', textAlign: 'center', flex: 1 }}>
                  <h3 style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: 'white',
                    fontFamily: 'var(--font-display)',
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}>
                    SEO local incluido
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.65,
                    fontFamily: 'var(--font-body)',
                    paddingBottom: '8px',
                  }}>
                    Aparece en Google cuando te busquen en tu ciudad.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* CARD D — Panel de gestión */}
          <ScrollReveal className="col-span-full lg:col-span-3" delay={80}>
            <Card className="overflow-hidden h-full" style={cardStyle}>
              <CardContent className="grid sm:grid-cols-2 pt-6 h-full">
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '32px',
                  paddingBottom: '8px',
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <LayoutDashboard size={20} color="var(--color-accent)" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '17px',
                      fontWeight: 600,
                      color: 'white',
                      fontFamily: 'var(--font-display)',
                      marginBottom: '8px',
                      lineHeight: 1.3,
                    }}>
                      Panel de gestión
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 1.65,
                      fontFamily: 'var(--font-body)',
                    }}>
                      Actualiza tu contenido desde el móvil en segundos.
                    </p>
                  </div>
                </div>

                {/* Decorative mini dashboard */}
                <div style={{
                  borderLeft: '1px solid rgba(255,255,255,0.06)',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '8px 0 0 0',
                  padding: '24px',
                  marginTop: '24px',
                  marginLeft: '24px',
                  position: 'relative',
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '4px',
                    position: 'absolute',
                    top: '8px',
                    left: '12px',
                  }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.12)',
                        display: 'inline-block',
                      }} />
                    ))}
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    {[
                      { label: 'Servicios', done: true },
                      { label: 'Galería', done: true },
                      { label: 'Precios', done: false },
                    ].map((row, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '10px',
                      }}>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: row.done ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          color: row.done ? 'var(--color-dark)' : 'rgba(255,255,255,0.4)',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}>
                          {row.done ? '✓' : '●'}
                        </div>
                        <span style={{
                          fontSize: '12px',
                          color: row.done ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)',
                          fontFamily: 'var(--font-body)',
                        }}>
                          {row.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* CARD E — Soporte */}
          <ScrollReveal className="col-span-full lg:col-span-3" delay={160}>
            <Card className="overflow-hidden h-full" style={cardStyle}>
              <CardContent className="grid sm:grid-cols-2 h-full pt-6">
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '32px',
                  paddingBottom: '8px',
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Headphones size={20} color="var(--color-accent)" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '17px',
                      fontWeight: 600,
                      color: 'white',
                      fontFamily: 'var(--font-display)',
                      marginBottom: '8px',
                      lineHeight: 1.3,
                    }}>
                      Soporte y mantenimiento
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 1.65,
                      fontFamily: 'var(--font-body)',
                    }}>
                      Soporte directo y actualizaciones incluidas en tu suscripción.
                    </p>
                  </div>
                </div>

                {/* Status pills */}
                <div style={{
                  borderLeft: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '12px',
                  paddingLeft: '24px',
                  marginLeft: '24px',
                  marginTop: '24px',
                }}>
                  {['Diseño', 'Soporte', 'Seguridad'].map((label, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: 'var(--color-accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        color: 'var(--color-dark)',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}>
                        ✓
                      </div>
                      <span style={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.8)',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                      }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
