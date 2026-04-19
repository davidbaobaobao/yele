'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import YeleLogo from '@/components/ui/YeleLogo'

const NAV_LINKS = [
  { label: 'cómo funciona', href: '/como-funciona' },
  { label: 'precios',        href: '/precios' },
  { label: 'trabajos',       href: '/trabajos' },
  { label: 'contacto',       href: '/contacto' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <style>{`
        .nav-center { display: flex; }
        .nav-right  { display: flex; }
        .nav-burger { display: none; }
        @media (max-width: 767px) {
          .nav-center { display: none !important; }
          .nav-right  { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>

      <motion.header
        initial={false}
        animate={scrolled ? 'scrolled' : 'top'}
        variants={{
          top:      { backgroundColor: 'rgba(252,249,243,0)',    borderBottomColor: 'rgba(200,194,180,0)' },
          scrolled: { backgroundColor: 'rgba(252,249,243,0.88)', borderBottomColor: 'rgba(200,194,180,0.18)' },
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-40 border-b"
        style={{ backdropFilter: scrolled ? 'blur(20px)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none' }}
      >
        <div style={{
          display: 'flex',
          height: '60px',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 'max(24px, 5vw)',
          paddingRight: 'max(24px, 5vw)',
        }}>

          {/* LEFT — Logo */}
          <YeleLogo variant="dark" size={22} />

          {/* CENTER — Nav links (desktop) */}
          <nav
            className="nav-center"
            style={{ gap: '32px', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
            aria-label="Menú principal"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '10px',
                  fontWeight: 300,
                  letterSpacing: '0.12em',
                  color: 'rgba(28,28,24,0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--on-surface)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(28,28,24,0.55)' }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* RIGHT — CTAs (desktop) */}
          <div className="nav-right" style={{ alignItems: 'center', gap: '10px' }}>
            <Link
              href="/registro"
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'var(--on-surface)',
                color: 'var(--surface)',
                fontFamily: 'var(--font-inter)',
                fontSize: '10px',
                fontWeight: 300,
                letterSpacing: '0.15em',
                textDecoration: 'none',
                transition: 'background 0.3s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--on-tertiary-container)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--on-surface)')}
            >
              quiero mi web
            </Link>
            <a
              href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL ?? 'https://app.yele.design'}/login`}
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'transparent',
                color: 'rgba(28,28,24,0.55)',
                fontFamily: 'var(--font-inter)',
                fontSize: '10px',
                fontWeight: 200,
                letterSpacing: '0.15em',
                textDecoration: 'none',
                border: '0.5px solid rgba(200,194,180,0.5)',
                transition: 'color 0.3s, border-color 0.3s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--on-surface)'
                e.currentTarget.style.borderColor = 'rgba(200,194,180,0.9)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(28,28,24,0.55)'
                e.currentTarget.style.borderColor = 'rgba(200,194,180,0.5)'
              }}
            >
              ingresar
            </a>
          </div>

          {/* RIGHT — Hamburger (mobile only) */}
          <button
            className="nav-burger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--on-surface)',
              padding: 0,
            }}
          >
            <svg width="18" height="11" viewBox="0 0 18 11" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
              <line x1="0" y1="1" x2="18" y2="1" />
              <line x1="0" y1="5.5" x2="18" y2="5.5" />
              <line x1="0" y1="10" x2="18" y2="10" />
            </svg>
          </button>

        </div>
      </motion.header>

      {/* Full-screen overlay menu (mobile) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: 'var(--surface)' }}
          >
            {/* Menu top bar */}
            <div style={{
              display: 'flex',
              height: '60px',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 'max(24px, 5vw)',
              paddingRight: 'max(24px, 5vw)',
              position: 'relative',
              borderBottom: '1px solid rgba(200,194,180,0.18)',
              flexShrink: 0,
            }}>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--on-surface)',
                  transition: 'opacity 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.4' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                  <line x1="1" y1="1" x2="13" y2="13" />
                  <line x1="13" y1="1" x2="1" y2="13" />
                </svg>
              </button>

              {/* Logo centered */}
              <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                <YeleLogo variant="dark" size={22} />
              </div>

              <div style={{ width: 36 }} />
            </div>

            {/* Nav links */}
            <nav
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1,
                paddingLeft: 'max(40px, 10vw)',
                paddingRight: 'max(40px, 10vw)',
              }}
              aria-label="Menú principal"
            >
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ borderBottom: '1px solid rgba(200,194,180,0.15)' }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', textDecoration: 'none' }}
                    onMouseEnter={e => {
                      const el = e.currentTarget.querySelector('.ml') as HTMLElement
                      if (el) el.style.color = 'var(--color-accent)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget.querySelector('.ml') as HTMLElement
                      if (el) el.style.color = 'var(--on-surface)'
                    }}
                  >
                    <span className="ml" style={{
                      fontFamily: 'var(--font-newsreader)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(26px, 4vw, 42px)',
                      fontWeight: 300,
                      color: 'var(--on-surface)',
                      transition: 'color 0.3s',
                      lineHeight: 1,
                    }}>
                      {label}
                    </span>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', fontWeight: 200, color: 'rgba(28,28,24,0.25)' }}>→</span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.4 }}
                style={{ marginTop: '40px' }}
              >
                <Link
                  href="/registro"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'inline-block',
                    padding: '14px 28px',
                    background: 'var(--on-surface)',
                    color: 'var(--surface)',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '11px',
                    fontWeight: 300,
                    letterSpacing: '0.18em',
                    textDecoration: 'none',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--on-tertiary-container)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--on-surface)')}
                >
                  quiero mi web →
                </Link>
              </motion.div>
            </nav>

            {/* Menu footer */}
            <div style={{
              borderTop: '1px solid rgba(200,194,180,0.15)',
              flexShrink: 0,
              padding: '20px max(40px, 10vw)',
            }}>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', fontWeight: 200, letterSpacing: '0.12em', color: 'rgba(28,28,24,0.3)' }}>
                hola@yele.design
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
