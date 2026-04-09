'use client'

import Link from 'next/link'

// Minimal SVG icons (strokeWidth 1, monochrome)
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1.3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.7 16.92z"/>
  </svg>
)

const MessageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

export default function MobileDock() {
  return (
    <nav
      className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-8 px-8 py-3.5"
      style={{
        background: 'rgba(252,249,243,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '0.5px solid rgba(200,194,180,0.3)',
        boxShadow: '0 4px 24px rgba(28,28,24,0.06)',
      }}
      aria-label="Acciones rápidas"
    >
      <a
        href="tel:+34600000000"
        aria-label="Llamar a Yele"
        className="flex flex-col items-center gap-1.5 transition-colors duration-300"
        style={{ color: 'rgba(28,28,24,0.4)', textDecoration: 'none' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--on-tertiary-container)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(28,28,24,0.4)')}
      >
        <PhoneIcon />
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: '8px', fontWeight: 200, letterSpacing: '0.15em' }}>llamar</span>
      </a>

      <a
        href="https://wa.me/34600000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        className="flex flex-col items-center gap-1.5 transition-colors duration-300"
        style={{ color: 'rgba(28,28,24,0.6)', textDecoration: 'none' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--on-tertiary-container)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(28,28,24,0.6)')}
      >
        <MessageIcon />
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: '8px', fontWeight: 200, letterSpacing: '0.15em' }}>whatsapp</span>
      </a>

      <Link
        href="/contacto"
        aria-label="Solicitar presupuesto"
        className="flex flex-col items-center gap-1.5 transition-colors duration-300"
        style={{ color: 'rgba(28,28,24,0.4)', textDecoration: 'none' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--on-tertiary-container)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(28,28,24,0.4)')}
      >
        <GlobeIcon />
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: '8px', fontWeight: 200, letterSpacing: '0.15em' }}>presupuesto</span>
      </Link>
    </nav>
  )
}
