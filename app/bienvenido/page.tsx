'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function BienvenidoContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [planName, setPlanName] = useState<string | null>(null)
  const [billingPeriod, setBillingPeriod] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionId) { setLoading(false); return }
    fetch(`/api/checkout-details?session_id=${sessionId}`)
      .then(r => r.json())
      .then(data => {
        setPlanName(data.planName ?? null)
        setBillingPeriod(data.billingPeriod ?? null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [sessionId])

  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? 'https://app.yele.design'

  const billingLabel =
    billingPeriod === 'annual' ? 'facturación anual' :
    billingPeriod === 'monthly' ? 'facturación mensual' : null

  return (
    <>
      <style>{`
        @keyframes bv_fadein {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bv-card { animation: bv_fadein 0.5s ease forwards; }
        .btn-dashboard {
          display: inline-block;
          padding: 14px 28px;
          background: var(--on-surface);
          color: var(--surface);
          font-family: var(--font-inter), sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: background 0.2s;
        }
        .btn-dashboard:hover { background: var(--on-tertiary-container); }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}>
        <div className="bv-card" style={{ width: '100%', maxWidth: 480, textAlign: 'center' }}>

          {/* Checkmark */}
          <div style={{
            width: 56,
            height: 56,
            background: 'var(--tertiary-fixed)',
            border: '1px solid var(--on-tertiary-container)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
              <path d="M4 11.5l5 5 9-9" stroke="var(--on-tertiary-container)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Logo wordmark */}
          <p style={{
            fontFamily: 'var(--font-newsreader), Georgia, serif',
            fontStyle: 'italic',
            fontSize: 14,
            fontWeight: 300,
            color: 'rgba(28,28,24,0.4)',
            margin: '0 0 16px',
            letterSpacing: '0.04em',
          }}>
            yele
          </p>

          <h1 style={{
            fontFamily: 'var(--font-newsreader), Georgia, serif',
            fontSize: 'clamp(26px, 5vw, 36px)',
            fontWeight: 300,
            color: 'var(--on-surface)',
            lineHeight: 1.2,
            margin: '0 0 16px',
          }}>
            ¡Bienvenido a Yele!
          </h1>

          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 14,
            fontWeight: 300,
            color: 'rgba(28,28,24,0.65)',
            lineHeight: 1.65,
            margin: '0 0 24px',
          }}>
            Tu suscripción está activa. Ya estamos trabajando en tu web.
            Te contactaremos en menos de 24 horas para confirmar los detalles.
          </p>

          {/* Plan details */}
          {!loading && (planName || billingLabel) && (
            <div style={{
              padding: '14px 20px',
              background: 'var(--tertiary-fixed)',
              borderLeft: '2px solid var(--on-tertiary-container)',
              textAlign: 'left',
              marginBottom: 32,
            }}>
              {planName && (
                <p style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'var(--on-surface)',
                  margin: '0 0 2px',
                }}>
                  {planName}
                </p>
              )}
              {billingLabel && (
                <p style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 12,
                  fontWeight: 300,
                  color: 'rgba(28,28,24,0.55)',
                  margin: 0,
                }}>
                  {billingLabel}
                </p>
              )}
            </div>
          )}

          <a href={dashboardUrl} className="btn-dashboard">
            Acceder a mi panel →
          </a>

          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 11,
            fontWeight: 300,
            color: 'rgba(28,28,24,0.4)',
            marginTop: 32,
            lineHeight: 1.6,
          }}>
            ¿Preguntas? Escríbenos a{' '}
            <a
              href="mailto:info@yele.design"
              style={{ color: 'var(--on-tertiary-container)', textDecoration: 'none', borderBottom: '1px solid currentColor' }}
            >
              info@yele.design
            </a>
          </p>

        </div>
      </div>
    </>
  )
}

export default function BienvenidoPage() {
  return (
    <Suspense>
      <BienvenidoContent />
    </Suspense>
  )
}
