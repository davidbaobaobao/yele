'use client'

export default function YaEresClientePage() {
  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? 'https://app.yele.design'

  return (
    <>
      <style>{`
        @keyframes yec_fadein {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .yec-card {
          animation: yec_fadein 0.4s ease forwards;
        }
        .btn-primary {
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
          cursor: pointer;
          border: none;
        }
        .btn-primary:hover {
          background: var(--on-tertiary-container);
        }
        .btn-secondary {
          font-family: var(--font-inter), sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: rgba(28,28,24,0.5);
          text-decoration: none;
          border-bottom: 1px solid rgba(28,28,24,0.2);
          transition: color 0.2s, border-color 0.2s;
        }
        .btn-secondary:hover {
          color: var(--on-surface);
          border-bottom-color: var(--on-surface);
        }
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

        {/* Back to home */}
        <a href="/" style={{
          position: 'fixed',
          top: 24,
          left: 32,
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: 11,
          fontWeight: 300,
          color: 'rgba(28,28,24,0.45)',
          textDecoration: 'none',
          letterSpacing: '0.08em',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--on-tertiary-container)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(28,28,24,0.45)')}
        >
          ← yele
        </a>

        <div className="yec-card" style={{ width: '100%', maxWidth: 420 }}>

          {/* Icon */}
          <div style={{
            width: 48,
            height: 48,
            background: 'var(--tertiary-fixed)',
            border: '1px solid var(--on-tertiary-container)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M4 10.5l4 4 8-8" stroke="var(--on-tertiary-container)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-newsreader), Georgia, serif',
            fontSize: 'clamp(24px, 5vw, 32px)',
            fontWeight: 300,
            color: 'var(--on-surface)',
            lineHeight: 1.2,
            margin: '0 0 16px',
          }}>
            Ya tienes una cuenta
          </h1>

          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 14,
            fontWeight: 300,
            color: 'rgba(28,28,24,0.65)',
            lineHeight: 1.65,
            margin: '0 0 36px',
          }}>
            Parece que ya eres cliente de Yele. Para acceder a tu panel
            y gestionar tu web, usa el botón de abajo.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
            <a
              href={`${dashboardUrl}/login`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Ir al panel →
            </a>

            <a href="/" className="btn-secondary">
              Volver al inicio
            </a>
          </div>

        </div>
      </div>
    </>
  )
}
