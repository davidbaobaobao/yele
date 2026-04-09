'use client'

import RevealText from '@/components/ui/RevealText'

export default function CTASection() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden py-32 lg:py-40"
      style={{ background: 'var(--secondary-container)' }}
      aria-labelledby="cta-heading"
    >
      {/* Ink wash atmospheric clouds */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: '500px', height: '500px',
          top: '-100px', left: '-100px',
          background: 'radial-gradient(circle, rgba(197,236,210,0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: '400px', height: '400px',
          bottom: '-80px', right: '-80px',
          background: 'radial-gradient(circle, rgba(28,28,24,0.04) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div
        className="relative z-10"
        style={{ paddingLeft: 'max(40px, 8vw)', paddingRight: 'max(40px, 6vw)' }}
      >
        <div className="max-w-xl">
          <RevealText>
            <span
              className="block mb-5"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.35em', color: 'rgba(28,28,24,0.35)' }}
            >
              ¿a qué esperas?
            </span>
          </RevealText>

          <RevealText delay={0.1}>
            <h2
              id="cta-heading"
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                color: 'var(--on-surface)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                marginBottom: '16px',
              }}
            >
              Tu negocio se merece{' '}
              <span style={{ fontStyle: 'italic' }}>estar en internet.</span>
            </h2>
          </RevealText>

          <RevealText delay={0.18}>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '13px',
                fontWeight: 200,
                letterSpacing: '0.1em',
                color: 'rgba(28,28,24,0.5)',
                marginBottom: '44px',
                lineHeight: 1.8,
              }}
            >
              Empieza hoy. Tu web en 3 días. Sin riesgo.
            </p>
          </RevealText>

          <RevealText delay={0.26} as="div">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <a
                href="/registro"
                className="transition-all duration-400"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '10px',
                  fontWeight: 200,
                  letterSpacing: '0.2em',
                  color: 'var(--on-surface)',
                  textDecoration: 'none',
                  borderBottom: '0.5px solid rgba(28,28,24,0.4)',
                  paddingBottom: '2px',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--on-tertiary-container)'; e.currentTarget.style.borderColor = 'var(--tertiary-fixed)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--on-surface)'; e.currentTarget.style.borderColor = 'rgba(28,28,24,0.4)' }}
              >
                quiero mi web →
              </a>
              <a
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-400"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '10px',
                  fontWeight: 200,
                  letterSpacing: '0.2em',
                  color: 'rgba(28,28,24,0.45)',
                  textDecoration: 'none',
                  borderBottom: '0.5px solid rgba(200,194,180,0.3)',
                  paddingBottom: '2px',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--on-tertiary-container)'; e.currentTarget.style.borderColor = 'var(--tertiary-fixed)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(28,28,24,0.45)'; e.currentTarget.style.borderColor = 'rgba(200,194,180,0.3)' }}
              >
                o escríbenos por whatsapp →
              </a>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  )
}
