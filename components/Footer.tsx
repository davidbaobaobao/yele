'use client'

import Link from 'next/link'
import YeleLogo from '@/components/ui/YeleLogo'

const NAV_LINKS = [
  { label: 'inicio',          href: '/' },
  { label: 'cómo funciona',   href: '/como-funciona' },
  { label: 'precios',         href: '/precios' },
  { label: 'trabajos',        href: '/trabajos' },
  { label: 'contacto',        href: '/contacto' },
]

const LEGAL_LINKS = [
  { label: 'aviso legal',             href: '/aviso-legal' },
  { label: 'política de privacidad',  href: '/politica-privacidad' },
  { label: 'política de cookies',     href: '/politica-cookies' },
]

const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter)',
  fontWeight: 200,
  fontSize: '11px',
  letterSpacing: '0.12em',
  color: 'rgba(28,28,24,0.45)',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
}

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--surface)',
        borderTop: '0.5px solid rgba(200,194,180,0.25)',
      }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Pie de página</h2>

      <div
        className="py-16 md:py-20"
        style={{ paddingLeft: 'max(40px, 8vw)', paddingRight: 'max(40px, 6vw)' }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Col 1 — Brand */}
          <div className="col-span-2 md:col-span-1">
            <YeleLogo variant="dark" size={22} />
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 200,
                fontSize: '11px',
                letterSpacing: '0.08em',
                color: 'rgba(28,28,24,0.35)',
                marginTop: '16px',
                lineHeight: 1.8,
              }}
            >
              webs para negocios reales.
            </p>
          </div>

          {/* Col 2 — Nav */}
          <div>
            <p
              className="mb-6"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.3em', color: 'rgba(28,28,24,0.25)' }}
            >
              navegación
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={linkStyle}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--on-tertiary-container)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(28,28,24,0.45)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Legal */}
          <div>
            <p
              className="mb-6"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.3em', color: 'rgba(28,28,24,0.25)' }}
            >
              legal
            </p>
            <ul className="flex flex-col gap-3">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={linkStyle}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--on-tertiary-container)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(28,28,24,0.45)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <p
              className="mb-6"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.3em', color: 'rgba(28,28,24,0.25)' }}
            >
              contacto
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:hola@yele.design"
                  style={linkStyle}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--on-tertiary-container)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(28,28,24,0.45)')}
                >
                  hola@yele.design
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/34600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--on-tertiary-container)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(28,28,24,0.45)')}
                >
                  whatsapp
                </a>
              </li>
              <li>
                <span style={{ ...linkStyle, color: 'rgba(28,28,24,0.25)' }}>
                  lunes a viernes, 9:00 – 18:00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="py-5"
        style={{
          borderTop: '0.5px solid rgba(200,194,180,0.2)',
          paddingLeft: 'max(40px, 8vw)',
          paddingRight: 'max(40px, 6vw)',
        }}
      >
        <p
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 200, fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(28,28,24,0.25)' }}
        >
          © 2026 yele. todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
