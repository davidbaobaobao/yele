'use client'

import Link from 'next/link'

interface YeleLogoProps {
  variant?: 'light' | 'dark'
  size?: number
}

export default function YeleLogo({ variant = 'dark', size = 22 }: YeleLogoProps) {
  const textColor = variant === 'light' ? '#fcf9f3' : '#000000'

  return (
    <Link
      href="/"
      aria-label="Yele — inicio"
      className="inline-flex items-center select-none transition-opacity duration-400 hover:opacity-60"
    >
      <span
        style={{
          fontFamily: 'var(--font-newsreader), Georgia, serif',
          fontSize: `${size}px`,
          fontWeight: 300,
          fontStyle: 'italic',
          color: textColor,
          letterSpacing: '-0.01em',
          lineHeight: 1,
        }}
      >
        yele
      </span>
    </Link>
  )
}
