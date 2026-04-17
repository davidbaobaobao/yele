import { Pencil, Smartphone, BadgeEuro } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export default function CoreValues() {
  return (
    <section className="py-24" style={{ background: 'var(--color-light)' }}>
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

        {/* 6-col bento grid */}
        <div className="grid grid-cols-6 gap-3">

          {/* CARD A — large stat */}
          <ScrollReveal className="col-span-full lg:col-span-2" delay={0}>
            <Card className="col-span-full lg:col-span-2 flex overflow-hidden h-full"
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
              <CardContent className="m-auto pt-6 text-center w-full">
                <div style={{
                  fontSize: '64px',
                  lineHeight: 1,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-accent)',
                  fontWeight: 700,
                }}>
                  3–5
                </div>
                <div style={{
                  fontSize: '13px',
                  color: 'var(--color-fog)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: '8px',
                  fontFamily: 'var(--font-body)',
                }}>
                  días
                </div>
                <h3 style={{
                  marginTop: '24px',
                  fontSize: '22px',
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-dark)',
                  fontWeight: 400,
                  lineHeight: 1.25,
                }}>
                  En línea en 3–5 días
                </h3>
                <p style={{
                  marginTop: '8px',
                  fontSize: '14px',
                  color: 'var(--color-fog)',
                  lineHeight: 1.65,
                  fontFamily: 'var(--font-body)',
                  paddingBottom: '8px',
                }}>
                  Sin esperas de semanas. Sin reuniones interminables.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* CARD B — icon + text centered */}
          <ScrollReveal className="col-span-full sm:col-span-3 lg:col-span-2" delay={80}>
            <Card className="overflow-hidden h-full"
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
              <CardContent className="pt-6 h-full flex flex-col items-center justify-center text-center">
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                }}>
                  <Smartphone size={24} color="var(--color-accent)" strokeWidth={1.5} />
                </div>
                <div style={{ marginTop: '24px' }}>
                  <h3 style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: 'var(--color-dark)',
                    fontFamily: 'var(--font-display)',
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}>
                    Cero conocimientos técnicos
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--color-fog)',
                    lineHeight: 1.65,
                    fontFamily: 'var(--font-body)',
                    paddingBottom: '8px',
                  }}>
                    Actualiza tu web desde el móvil. Sin código. Sin llamar a nadie.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* CARD C — sparkline chart */}
          <ScrollReveal className="col-span-full sm:col-span-3 lg:col-span-2" delay={160}>
            <Card className="overflow-hidden h-full"
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
              <CardContent className="pt-6 h-full flex flex-col">
                <svg viewBox="0 0 200 60" className="w-full" style={{ color: 'var(--color-accent)' }}>
                  <defs>
                    <linearGradient id="grad-light" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polyline
                    points="0,50 30,40 60,45 90,20 120,30 150,10 180,15 200,5 200,60 0,60"
                    fill="url(#grad-light)"
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
                    color: 'var(--color-dark)',
                    fontFamily: 'var(--font-display)',
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}>
                    Un precio fijo, sin sorpresas
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--color-fog)',
                    lineHeight: 1.65,
                    fontFamily: 'var(--font-body)',
                    paddingBottom: '8px',
                  }}>
                    Desde 29€/mes. Sin costes ocultos ni facturas inesperadas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* CARD D — icon + decorative right panel */}
          <ScrollReveal className="col-span-full lg:col-span-3" delay={80}>
            <Card className="overflow-hidden h-full"
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
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
                    border: '1px solid rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Pencil size={20} color="var(--color-accent)" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '17px',
                      fontWeight: 600,
                      color: 'var(--color-dark)',
                      fontFamily: 'var(--font-display)',
                      marginBottom: '8px',
                      lineHeight: 1.3,
                    }}>
                      Hecho para ti, no por ti
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: 'var(--color-fog)',
                      lineHeight: 1.65,
                      fontFamily: 'var(--font-body)',
                    }}>
                      Tu web diseñada desde cero para tu negocio, sector y ciudad. No una plantilla genérica.
                    </p>
                  </div>
                </div>

                {/* Decorative right panel */}
                <div style={{
                  borderLeft: '1px solid rgba(0,0,0,0.06)',
                  borderTop: '1px solid rgba(0,0,0,0.06)',
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
                        background: 'rgba(0,0,0,0.08)',
                        display: 'inline-block',
                      }} />
                    ))}
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    {['Diseño', 'Contenido', 'Publicado'].map((step, i) => (
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
                          background: i < 2 ? 'var(--color-accent)' : 'rgba(0,0,0,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          color: i < 2 ? 'var(--color-dark)' : 'transparent',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}>
                          {i < 2 ? '✓' : ''}
                        </div>
                        <span style={{
                          fontSize: '12px',
                          color: i < 2 ? 'var(--color-dark)' : 'var(--color-fog)',
                          fontFamily: 'var(--font-body)',
                        }}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* CARD E — icon + sector pills */}
          <ScrollReveal className="col-span-full lg:col-span-3" delay={160}>
            <Card className="overflow-hidden h-full"
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
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
                    border: '1px solid rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <BadgeEuro size={20} color="var(--color-accent)" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '17px',
                      fontWeight: 600,
                      color: 'var(--color-dark)',
                      fontFamily: 'var(--font-display)',
                      marginBottom: '8px',
                      lineHeight: 1.3,
                    }}>
                      Precio fijo mensual
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: 'var(--color-fog)',
                      lineHeight: 1.65,
                      fontFamily: 'var(--font-body)',
                    }}>
                      Sin permanencia. Sin sorpresas. Cancela cuando quieras.
                    </p>
                  </div>
                </div>

                {/* Sector pills */}
                <div style={{
                  borderLeft: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '12px',
                  paddingLeft: '24px',
                  marginLeft: '24px',
                  marginTop: '24px',
                }}>
                  {[
                    { label: 'Restaurante', offset: false },
                    { label: 'Peluquería', offset: true },
                    { label: 'Fontanero', offset: false },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: item.offset ? 'flex-start' : 'flex-end',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 500,
                        padding: '4px 12px',
                        border: '1px solid rgba(0,0,0,0.08)',
                        borderRadius: '20px',
                        color: 'var(--color-dark)',
                        background: 'white',
                        fontFamily: 'var(--font-body)',
                      }}>
                        {item.label}
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
