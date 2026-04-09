'use client'

import { useRef, useEffect, useState, ElementType, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface RevealTextProps {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
  style?: React.CSSProperties
}

export default function RevealText({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  style,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 22 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}
