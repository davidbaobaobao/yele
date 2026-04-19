'use client'

import Link from 'next/link'

interface YeleLogoProps {
  variant?: 'light' | 'dark'
  size?: number
}

export default function YeleLogo({ variant = 'dark', size = 22 }: YeleLogoProps) {
  const textColor = variant === 'light' ? '#fcf9f3' : 'var(--on-surface)'

  return (
    <Link
      href="/"
      aria-label="Yele — inicio"
      style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline' }}
      className="transition-opacity duration-300 hover:opacity-60 select-none"
    >
      <span style={{
        fontFamily: 'var(--font-newsreader), Georgia, serif',
        fontStyle: 'italic',
        fontSize: `${size}px`,
        fontWeight: 300,
        color: textColor,
        letterSpacing: '-0.01em',
        lineHeight: 1,
      }}>
        yele
      </span>
      <span style={{
        fontFamily: 'var(--font-newsreader), Georgia, serif',
        fontStyle: 'italic',
        fontSize: `${size}px`,
        fontWeight: 300,
        color: 'var(--color-accent)',
        lineHeight: 1,
      }}>
        .
      </span>
    </Link>
  )
}
