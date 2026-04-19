'use client'

import Link from 'next/link'

interface YeleLogoProps {
  variant?: 'light' | 'dark'
  /** Height in px — width scales proportionally (logo aspect ≈ 3:1) */
  height?: number
  /** Show icon only (square) instead of full logo with wordmark */
  iconOnly?: boolean
}

export default function YeleLogo({ variant = 'dark', height = 28, iconOnly = false }: YeleLogoProps) {
  const src = iconOnly
    ? (variant === 'light' ? '/yele-icon-outline.svg' : '/yele-icon-dark.svg')
    : (variant === 'light' ? '/yele-logo-light.svg' : '/yele-logo-dark.svg')

  // Full logo: 230×76 viewBox → aspect ~3.03:1
  // Icon: 52×52 → aspect 1:1
  const width = iconOnly ? height : Math.round(height * (230 / 76))

  return (
    <Link
      href="/"
      aria-label="Yele — inicio"
      className="inline-flex items-center select-none transition-opacity duration-300 hover:opacity-60"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Yele"
        width={width}
        height={height}
        style={{ display: 'block', width, height }}
      />
    </Link>
  )
}
