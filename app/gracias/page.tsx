import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solicitud recibida — Yele',
  description: 'Hemos recibido tu solicitud. Nos pondremos en contacto contigo en menos de 24 horas.',
  robots: { index: false },
}

export default function GraciasPage({
  searchParams,
}: {
  searchParams: { nombre?: string }
}) {
  const nombre = searchParams.nombre
    ? decodeURIComponent(searchParams.nombre)
    : null

  return (
    <main
      style={{ minHeight: '100vh', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}
    >
      <div style={{ maxWidth: '520px', width: '100%' }}>

        {/* Logo */}
        <a
          href="/"
          style={{
            fontFamily: 'var(--font-newsreader)',
            fontStyle: 'italic',
            fontSize: '16px',
            fontWeight: 300,
            color: 'var(--on-surface)',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '64px',
            letterSpacing: '-0.01em',
          }}
        >
          yele
        </a>

        {/* Celadon accent line */}
        <div style={{ width: '32px', height: '2px', background: 'var(--tertiary-fixed)', marginBottom: '32px' }} />

        <h1
          style={{
            fontFamily: 'var(--font-newsreader)',
            fontStyle: 'italic',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 300,
            color: 'var(--on-surface)',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            marginBottom: '20px',
          }}
        >
          Solicitud recibida.
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '14px',
            fontWeight: 200,
            color: 'rgba(28,28,24,0.6)',
            lineHeight: 1.8,
            letterSpacing: '0.03em',
            marginBottom: '40px',
          }}
        >
          {nombre
            ? <>Hemos recibido la información de <strong style={{ fontWeight: 300, color: 'var(--on-surface)' }}>{nombre}</strong>. Revisaremos tu solicitud y nos pondremos en contacto contigo en menos de 24 horas.</>
            : 'Hemos recibido tu solicitud. Revisaremos la información y nos pondremos en contacto contigo en menos de 24 horas.'
          }
        </p>

        {/* What happens next */}
        <div
          style={{
            background: 'var(--surface-container-low)',
            border: '0.5px solid rgba(200,194,180,0.25)',
            padding: '24px 20px',
            marginBottom: '40px',
          }}
        >
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.3em', color: 'rgba(28,28,24,0.35)', marginBottom: '14px' }}>
            qué pasa ahora
          </p>
          <div className="flex flex-col gap-3">
            {[
              { n: '1', text: 'Revisamos tu solicitud en el día.' },
              { n: '2', text: 'Te llamamos o escribimos para confirmar los detalles.' },
              { n: '3', text: 'Empezamos con tu web. Lista en 3 días.' },
            ].map(item => (
              <div key={item.n} className="flex items-baseline gap-3">
                <span style={{ fontFamily: 'var(--font-newsreader)', fontStyle: 'italic', fontSize: '13px', fontWeight: 300, color: 'var(--on-tertiary-container)', flexShrink: 0 }}>
                  {item.n}
                </span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 200, color: 'rgba(28,28,24,0.65)', letterSpacing: '0.03em', lineHeight: 1.6 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Back home */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '10px',
            fontWeight: 200,
            letterSpacing: '0.2em',
            color: 'rgba(28,28,24,0.5)',
            textDecoration: 'none',
            borderBottom: '0.5px solid rgba(200,194,180,0.4)',
            paddingBottom: '2px',
            transition: 'color 0.3s ease, border-color 0.3s ease',
          }}
          onMouseEnter={undefined}
        >
          ← volver al inicio
        </Link>
      </div>
    </main>
  )
}
