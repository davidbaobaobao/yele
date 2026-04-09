'use client'

import Link from 'next/link'

interface VitrinaLogoProps {
  variant?: 'light' | 'dark'
  size?: number
}

export default function VitrinaLogo({ variant = 'dark', size = 22 }: VitrinaLogoProps) {
  // In new design: dark text on light bg (default), white on dark bg
  const textColor = variant === 'light' ? '#fcf9f3' : '#000000'

  return (
    <Link
      href="/"
      aria-label="Vitrina Studio — inicio"
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
        vitrina
      </span>
      <span
        style={{
          fontFamily: 'var(--font-newsreader), Georgia, serif',
          fontSize: `${size}px`,
          fontWeight: 300,
          color: 'var(--tertiary-fixed, #c5ecd2)',
          lineHeight: 1,
          fontStyle: 'normal',
        }}
      >
        ·
      </span>
    </Link>
  )
}
