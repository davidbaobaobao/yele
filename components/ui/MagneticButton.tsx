'use client'

import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'text-link'
  className?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  'aria-label'?: string
}

// New Washi Design System button styles
const VARIANTS: Record<string, React.CSSProperties> = {
  // Solid sumi ink — primary action
  primary: {
    background: '#000000',
    color: '#fcf9f3',
    border: 'none',
  },
  // Ghost — stone border
  secondary: {
    background: 'transparent',
    color: 'rgba(28,28,24,0.9)',
    border: '0.5px solid rgba(200,194,180,0.5)',
  },
  // Ghost — same as secondary (legacy alias)
  ghost: {
    background: 'transparent',
    color: 'rgba(28,28,24,0.7)',
    border: '0.5px solid rgba(200,194,180,0.4)',
  },
  // Moss Celadon — singular accent moment
  accent: {
    background: 'var(--tertiary-fixed)',
    color: '#002112',
    border: 'none',
  },
  // Text-only link style
  'text-link': {
    background: 'transparent',
    color: 'rgba(28,28,24,0.7)',
    border: 'none',
    padding: '0',
    height: 'auto',
  },
}

export default function MagneticButton({
  children,
  variant = 'primary',
  className = '',
  href,
  onClick,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.22)
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.22)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const isTextLink = variant === 'text-link'

  const baseStyle: React.CSSProperties = {
    ...VARIANTS[variant],
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: isTextLink ? 'auto' : '44px',
    padding: isTextLink ? '0' : '0 24px',
    borderRadius: '0px',
    fontSize: '10px',
    fontWeight: 200,
    fontFamily: 'var(--font-inter)',
    letterSpacing: '0.2em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    transition: 'background 400ms ease-in-out, color 400ms ease-in-out, border-color 400ms ease-in-out',
  }

  // On hover: shift to Moss Celadon for primary/secondary
  function onHoverStart(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget
    if (variant === 'primary') {
      el.style.background = 'var(--tertiary-fixed)'
      el.style.color = '#002112'
    } else if (variant === 'secondary' || variant === 'ghost') {
      el.style.borderColor = 'rgba(197,236,210,0.6)'
      el.style.color = 'var(--on-tertiary-container)'
    }
  }

  function onHoverEnd(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget
    if (variant === 'primary') {
      el.style.background = '#000000'
      el.style.color = '#fcf9f3'
    } else if (variant === 'secondary' || variant === 'ghost') {
      el.style.borderColor = 'rgba(200,194,180,0.4)'
      el.style.color = variant === 'secondary' ? 'rgba(28,28,24,0.9)' : 'rgba(28,28,24,0.7)'
    }
  }

  const sharedMotionStyle = { x: springX, y: springY, ...baseStyle }
  const sharedProps = {
    style: sharedMotionStyle,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: onHoverStart,
    whileTap: { scale: 0.98 },
    className,
  }

  if (href) {
    return (
      <motion.a
        href={href}
        aria-label={ariaLabel}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...sharedProps}
        onMouseLeave={(e) => {
          handleMouseLeave()
          onHoverEnd(e as unknown as React.MouseEvent<HTMLElement>)
        }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...sharedProps}
      onMouseLeave={(e) => {
        handleMouseLeave()
        onHoverEnd(e as unknown as React.MouseEvent<HTMLElement>)
      }}
    >
      {children}
    </motion.button>
  )
}
