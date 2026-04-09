'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

const STORAGE_KEY = 'yele-banner-dismissed'

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) setVisible(true)
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="banner"
      className="relative flex items-center justify-center gap-3 px-4 py-2.5 text-center"
      style={{ background: 'var(--secondary-container)' }}
    >
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '10px',
          fontWeight: 200,
          letterSpacing: '0.15em',
          color: 'rgba(28,28,24,0.7)',
        }}
      >
        oferta de lanzamiento — primer mes gratis en cualquier plan.{' '}
        <Link
          href="/precios"
          className="transition-colors duration-400"
          style={{
            borderBottom: '0.5px solid rgba(200,194,180,0.6)',
            paddingBottom: '1px',
            color: 'var(--on-surface)',
            textDecoration: 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--on-tertiary-container)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--on-surface)')}
        >
          ver planes →
        </Link>
      </p>
      <button
        onClick={dismiss}
        aria-label="Cerrar anuncio"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 opacity-40 hover:opacity-80 transition-opacity"
        style={{ color: 'var(--on-surface)' }}
      >
        <X size={12} strokeWidth={1} />
      </button>
    </div>
  )
}
