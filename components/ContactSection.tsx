'use client'

import RevealText from '@/components/ui/RevealText'

export default function ContactSection() {
  return (
    <section
      id="contacto-info"
      className="py-24 lg:py-32"
      style={{ background: 'var(--surface-container-low)' }}
      aria-labelledby="contact-section-heading"
    >
      <div style={{ paddingLeft: 'max(40px, 8vw)', paddingRight: 'max(40px, 6vw)' }}>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-16">

          {/* Left — copy */}
          <div style={{ maxWidth: '480px' }}>
            <RevealText>
              <span
                className="block mb-5"
                style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.35em', color: 'rgba(28,28,24,0.35)' }}
              >
                ¿tienes dudas?
              </span>
            </RevealText>
            <RevealText delay={0.1}>
              <h2
                id="contact-section-heading"
                style={{
                  fontFamily: 'var(--font-newsreader)',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 300,
                  color: 'var(--on-surface)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  marginBottom: '20px',
                }}
              >
                Hablamos.{' '}
                <span style={{ fontStyle: 'italic' }}>Sin compromiso.</span>
              </h2>
            </RevealText>
            <RevealText delay={0.15}>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '13px',
                  fontWeight: 200,
                  letterSpacing: '0.04em',
                  color: 'rgba(28,28,24,0.55)',
                  lineHeight: 1.8,
                }}
              >
                Si tienes preguntas sobre el servicio, el proceso o cualquier duda sobre tu proyecto — escríbenos. Respondemos en menos de 24 horas.
              </p>
            </RevealText>
          </div>

          {/* Right — contact options */}
          <RevealText delay={0.2} as="div">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

              {/* Email */}
              <a
                href="mailto:hola@yele.design"
                className="group flex items-center justify-between py-6 transition-all duration-300"
                style={{
                  borderBottom: '0.5px solid rgba(200,194,180,0.3)',
                  textDecoration: 'none',
                  minWidth: '320px',
                }}
                onMouseEnter={e => {
                  const t = e.currentTarget.querySelector('.ct') as HTMLElement
                  if (t) t.style.color = 'var(--on-tertiary-container)'
                  const a = e.currentTarget.querySelector('.arr') as HTMLElement
                  if (a) a.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  const t = e.currentTarget.querySelector('.ct') as HTMLElement
                  if (t) t.style.color = 'var(--on-surface)'
                  const a = e.currentTarget.querySelector('.arr') as HTMLElement
                  if (a) a.style.opacity = '0.3'
                }}
              >
                <div>
                  <span
                    style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.3em', color: 'rgba(28,28,24,0.35)', display: 'block', marginBottom: '4px' }}
                  >
                    email
                  </span>
                  <span
                    className="ct"
                    style={{ fontFamily: 'var(--font-newsreader)', fontStyle: 'italic', fontSize: '20px', fontWeight: 300, color: 'var(--on-surface)', transition: 'color 0.3s' }}
                  >
                    hola@yele.design
                  </span>
                </div>
                <span className="arr" style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'rgba(28,28,24,0.3)', transition: 'opacity 0.3s', opacity: 0.3 }}>→</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-6 transition-all duration-300"
                style={{
                  borderBottom: '0.5px solid rgba(200,194,180,0.3)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  const t = e.currentTarget.querySelector('.ct') as HTMLElement
                  if (t) t.style.color = 'var(--on-tertiary-container)'
                  const a = e.currentTarget.querySelector('.arr') as HTMLElement
                  if (a) a.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  const t = e.currentTarget.querySelector('.ct') as HTMLElement
                  if (t) t.style.color = 'var(--on-surface)'
                  const a = e.currentTarget.querySelector('.arr') as HTMLElement
                  if (a) a.style.opacity = '0.3'
                }}
              >
                <div>
                  <span
                    style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.3em', color: 'rgba(28,28,24,0.35)', display: 'block', marginBottom: '4px' }}
                  >
                    whatsapp
                  </span>
                  <span
                    className="ct"
                    style={{ fontFamily: 'var(--font-newsreader)', fontStyle: 'italic', fontSize: '20px', fontWeight: 300, color: 'var(--on-surface)', transition: 'color 0.3s' }}
                  >
                    +34 600 000 000
                  </span>
                </div>
                <span className="arr" style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'rgba(28,28,24,0.3)', transition: 'opacity 0.3s', opacity: 0.3 }}>→</span>
              </a>

              {/* Contact page */}
              <a
                href="/contacto"
                className="group flex items-center justify-between py-6 transition-all duration-300"
                style={{ textDecoration: 'none' }}
                onMouseEnter={e => {
                  const t = e.currentTarget.querySelector('.ct') as HTMLElement
                  if (t) t.style.color = 'var(--on-tertiary-container)'
                  const a = e.currentTarget.querySelector('.arr') as HTMLElement
                  if (a) a.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  const t = e.currentTarget.querySelector('.ct') as HTMLElement
                  if (t) t.style.color = 'var(--on-surface)'
                  const a = e.currentTarget.querySelector('.arr') as HTMLElement
                  if (a) a.style.opacity = '0.3'
                }}
              >
                <div>
                  <span
                    style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.3em', color: 'rgba(28,28,24,0.35)', display: 'block', marginBottom: '4px' }}
                  >
                    formulario
                  </span>
                  <span
                    className="ct"
                    style={{ fontFamily: 'var(--font-newsreader)', fontStyle: 'italic', fontSize: '20px', fontWeight: 300, color: 'var(--on-surface)', transition: 'color 0.3s' }}
                  >
                    abrir formulario de contacto
                  </span>
                </div>
                <span className="arr" style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'rgba(28,28,24,0.3)', transition: 'opacity 0.3s', opacity: 0.3 }}>→</span>
              </a>

            </div>
          </RevealText>
        </div>

      </div>
    </section>
  )
}
