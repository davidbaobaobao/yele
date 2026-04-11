'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// Price IDs are resolved server-side in /api/create-checkout.
// The frontend only sends planId + billingPeriod.

// ─── Plan data ─────────────────────────────────────────────────────────────────
const PLANS = [
  {
    id: 'basica' as const,
    name: 'Básica',
    monthlyPrice: 29.90,
    annualPrice: 299.00,
    annualMonthly: 24.92,
    description: 'Hasta 4 páginas',
    popular: false,
    features: [
      'Diseño profesional',
      'Versión móvil',
      'SEO básico',
      'Panel de gestión',
      'Soporte por mensajes',
    ],
  },
  {
    id: 'profesional' as const,
    name: 'Profesional',
    monthlyPrice: 49,
    annualPrice: 499.00,
    annualMonthly: 41.58,
    description: 'Hasta 6 páginas',
    popular: true,
    features: [
      'Diseño profesional',
      'Versión móvil',
      'SEO básico',
      'Panel de gestión',
      'Soporte por mensajes',
      'Blog (hasta 10 posts)',
      'Galería avanzada',
      'Integración WhatsApp',
    ],
  },
  {
    id: 'avanzada' as const,
    name: 'Avanzada',
    monthlyPrice: 89,
    annualPrice: 899.00,
    annualMonthly: 74.92,
    description: 'Sin límites',
    popular: false,
    features: [
      'Diseño profesional',
      'Versión móvil',
      'SEO básico',
      'Panel de gestión',
      'Soporte por mensajes',
      'Blog (hasta 10 posts)',
      'Galería avanzada',
      'Integración WhatsApp',
      'Páginas ilimitadas',
      'Secciones personalizadas',
      'Prioridad en soporte',
    ],
  },
]

function ElegirPlanContent() {
  const searchParams = useSearchParams()
  const clientId = searchParams.get('client_id') ?? ''

  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [checkoutError, setCheckoutError] = useState('')

  function handleApplyPromo() {
    const trimmed = promoCode.trim().toUpperCase()
    if (!trimmed) return
    // Optimistic — real validation happens server-side in Stripe
    setPromoApplied(true)
    setPromoError('')
  }

  async function handleSelectPlan(planId: 'basica' | 'profesional' | 'avanzada') {
    setLoadingPlan(planId)
    setCheckoutError('')
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          billingPeriod: billing,
          clientId,
          promoCode: promoApplied ? promoCode.trim() : null,
        }),
      })
      const { url, error } = await res.json()
      if (error || !url) {
        setCheckoutError(error || 'Error al crear la sesión de pago. Por favor, inténtalo de nuevo.')
        setLoadingPlan(null)
        return
      }
      window.location.href = url
    } catch {
      alert('Error de conexión. Por favor, inténtalo de nuevo.')
      setLoadingPlan(null)
    }
  }

  return (
    <>
      <style>{`
        @keyframes ep_fadein {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ep-page { animation: ep_fadein 0.4s ease forwards; }

        .billing-toggle {
          display: inline-flex;
          align-items: center;
          background: rgba(28,28,24,0.06);
          border-radius: 0;
          padding: 3px;
          gap: 2px;
        }
        .billing-btn {
          padding: 7px 18px;
          font-family: var(--font-inter), sans-serif;
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.04em;
          border: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          background: transparent;
          color: rgba(28,28,24,0.5);
        }
        .billing-btn.active {
          background: var(--on-surface);
          color: var(--surface);
        }

        .plan-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          width: 100%;
          max-width: 860px;
        }
        @media (max-width: 700px) {
          .plan-grid { grid-template-columns: 1fr; }
        }

        .plan-card {
          border: 1px solid rgba(28,28,24,0.12);
          padding: 28px 24px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
          background: var(--surface);
          transition: border-color 0.2s;
        }
        .plan-card.popular {
          border-color: var(--on-surface);
        }
        .popular-badge {
          position: absolute;
          top: -1px;
          right: -1px;
          background: var(--on-surface);
          color: var(--surface);
          font-family: var(--font-inter), sans-serif;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.1em;
          padding: 4px 10px;
          text-transform: uppercase;
        }

        .plan-name {
          font-family: var(--font-newsreader), Georgia, serif;
          font-size: 22px;
          font-weight: 300;
          color: var(--on-surface);
          margin: 0 0 4px;
        }
        .plan-desc {
          font-family: var(--font-inter), sans-serif;
          font-size: 11px;
          font-weight: 300;
          color: rgba(28,28,24,0.45);
          letter-spacing: 0.04em;
          margin: 0 0 20px;
        }
        .plan-price-wrap {
          margin-bottom: 24px;
          min-height: 56px;
        }
        .plan-price {
          font-family: var(--font-inter), sans-serif;
          font-size: 32px;
          font-weight: 300;
          color: var(--on-surface);
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .plan-price-unit {
          font-size: 13px;
          font-weight: 300;
          color: rgba(28,28,24,0.5);
          margin-left: 2px;
        }
        .plan-price-annual {
          font-family: var(--font-inter), sans-serif;
          font-size: 11px;
          font-weight: 300;
          color: rgba(28,28,24,0.45);
          margin-top: 4px;
        }
        .annual-badge {
          display: inline-block;
          background: var(--tertiary-fixed);
          color: var(--on-tertiary-container);
          font-family: var(--font-inter), sans-serif;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.08em;
          padding: 2px 7px;
          margin-left: 6px;
          vertical-align: middle;
        }

        .feature-list {
          list-style: none;
          margin: 0 0 28px;
          padding: 0;
          flex: 1;
        }
        .feature-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-family: var(--font-inter), sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: rgba(28,28,24,0.75);
          line-height: 1.5;
          padding: 5px 0;
          border-bottom: 1px solid rgba(28,28,24,0.06);
        }
        .feature-list li:last-child { border-bottom: none; }
        .check-icon {
          flex-shrink: 0;
          width: 14px;
          height: 14px;
          margin-top: 1px;
        }

        .btn-plan {
          width: 100%;
          padding: 13px 20px;
          background: var(--on-surface);
          color: var(--surface);
          border: none;
          cursor: pointer;
          font-family: var(--font-inter), sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.06em;
          transition: background 0.2s;
        }
        .btn-plan:hover:not(:disabled) {
          background: var(--on-tertiary-container);
        }
        .btn-plan:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .promo-section {
          width: 100%;
          max-width: 860px;
          margin-top: 32px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .promo-input {
          flex: 1;
          min-width: 180px;
          padding: 11px 0;
          border: none;
          border-bottom: 1px solid rgba(28,28,24,0.2);
          background: transparent;
          font-family: var(--font-inter), sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: var(--on-surface);
          outline: none;
          transition: border-color 0.2s;
        }
        .promo-input:focus { border-bottom-color: var(--on-surface); }
        .promo-input::placeholder { color: rgba(28,28,24,0.35); font-weight: 200; }
        .btn-promo {
          padding: 11px 20px;
          background: transparent;
          border: 1px solid rgba(28,28,24,0.25);
          font-family: var(--font-inter), sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: var(--on-surface);
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: border-color 0.2s;
          white-space: nowrap;
        }
        .btn-promo:hover { border-color: var(--on-surface); }
        .promo-success {
          font-family: var(--font-inter), sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: var(--on-tertiary-container);
          display: flex;
          align-items: center;
          gap: 6px;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 24px 64px',
      }}>
        <div className="ep-page" style={{ width: '100%', maxWidth: 860, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h1 style={{
              fontFamily: 'var(--font-newsreader), Georgia, serif',
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 300,
              color: 'var(--on-surface)',
              lineHeight: 1.15,
              margin: '0 0 12px',
            }}>
              Elige tu plan
            </h1>
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 13,
              fontWeight: 300,
              color: 'rgba(28,28,24,0.55)',
              margin: '0 0 28px',
            }}>
              Cancela cuando quieras. Sin permanencia.
            </p>

            {/* Billing toggle */}
            <div className="billing-toggle">
              <button
                className={`billing-btn${billing === 'monthly' ? ' active' : ''}`}
                onClick={() => setBilling('monthly')}
              >
                Mensual
              </button>
              <button
                className={`billing-btn${billing === 'annual' ? ' active' : ''}`}
                onClick={() => setBilling('annual')}
              >
                Anual
                <span className="annual-badge" style={{ marginLeft: 6 }}>2 meses gratis</span>
              </button>
            </div>
          </div>

          {/* Plan cards */}
          <div className="plan-grid">
            {PLANS.map(plan => (
              <div
                key={plan.id}
                className={`plan-card${plan.popular ? ' popular' : ''}`}
              >
                {plan.popular && <span className="popular-badge">Más popular</span>}

                <p className="plan-name">{plan.name}</p>
                <p className="plan-desc">{plan.description}</p>

                <div className="plan-price-wrap">
                  <div>
                    <span className="plan-price">
                      {billing === 'monthly'
                        ? `€${plan.monthlyPrice % 1 === 0 ? plan.monthlyPrice : plan.monthlyPrice.toFixed(2)}`
                        : `€${plan.annualMonthly}`}
                    </span>
                    <span className="plan-price-unit">/mes</span>
                  </div>
                  {billing === 'annual' && (
                    <p className="plan-price-annual">
                      €{plan.annualPrice.toFixed(2)}/año
                    </p>
                  )}
                  {billing === 'monthly' && (
                    <p className="plan-price-annual" style={{ opacity: 0 }}>—</p>
                  )}
                </div>

                <ul className="feature-list">
                  {plan.features.map(f => (
                    <li key={f}>
                      <svg className="check-icon" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M2.5 7.5l3 3 6-6" stroke="var(--on-tertiary-container)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className="btn-plan"
                  disabled={loadingPlan !== null}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {loadingPlan === plan.id ? 'Redirigiendo…' : `Empezar con ${plan.name}`}
                </button>
              </div>
            ))}
          </div>

          {/* Checkout error */}
          {checkoutError && (
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 13,
              fontWeight: 300,
              color: '#c0392b',
              margin: '0 0 8px',
              width: '100%',
              maxWidth: 860,
            }}>
              {checkoutError}
            </p>
          )}

          {/* Promo code */}
          <div className="promo-section">
            {promoApplied ? (
              <p className="promo-success">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2.5 7.5l3 3 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Código <strong style={{ marginLeft: 2 }}>{promoCode.trim().toUpperCase()}</strong> aplicado
                <button
                  onClick={() => { setPromoApplied(false); setPromoCode('') }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(28,28,24,0.4)', fontSize: 11, marginLeft: 8 }}
                >
                  Quitar
                </button>
              </p>
            ) : (
              <>
                <input
                  className="promo-input"
                  type="text"
                  placeholder="¿Tienes un código promocional?"
                  value={promoCode}
                  onChange={e => { setPromoCode(e.target.value); setPromoError('') }}
                  onKeyDown={e => e.key === 'Enter' && handleApplyPromo()}
                  disabled={loadingPlan !== null}
                />
                <button
                  className="btn-promo"
                  onClick={handleApplyPromo}
                  disabled={!promoCode.trim() || loadingPlan !== null}
                >
                  Aplicar
                </button>
              </>
            )}
            {promoError && (
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#c0392b', margin: 0 }}>
                {promoError}
              </p>
            )}
          </div>

          {/* Fine print */}
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 11,
            fontWeight: 300,
            color: 'rgba(28,28,24,0.35)',
            marginTop: 40,
            textAlign: 'center',
            lineHeight: 1.6,
          }}>
            Todos los precios incluyen IVA · Cancela en cualquier momento · Sin compromiso de permanencia
          </p>

        </div>
      </div>
    </>
  )
}

export default function ElegirPlanPage() {
  return (
    <Suspense>
      <ElegirPlanContent />
    </Suspense>
  )
}
