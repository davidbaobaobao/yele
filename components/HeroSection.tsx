'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ATTRIBUTES = [
  'diseño a medida',
  'sin letra pequeña',
  'sin pago inicial',
  'lista en 3 días',
]

export default function HeroSection() {
  const [showScroll, setShowScroll] = useState(true)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const obs = new IntersectionObserver(
      ([entry]) => setShowScroll(entry.isIntersecting),
      { threshold: 0.6 }
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100svh',
        background: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '24px',
        paddingRight: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient celadon bloom — top */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70vw',
          height: '40vw',
          maxWidth: '800px',
          filter: 'blur(100px)',
          background: 'radial-gradient(ellipse, rgba(197,236,210,0.28) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        style={{ position: 'relative', zIndex: 1, maxWidth: '700px', width: '100%' }}
      >
        {/* Eyebrow */}
        <motion.span
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'block',
            fontFamily: 'var(--font-inter)',
            fontSize: '9px',
            fontWeight: 200,
            letterSpacing: '0.4em',
            color: 'rgba(28,28,24,0.3)',
            marginBottom: '40px',
          }}
        >
          yele.design
        </motion.span>

        {/* Main headline */}
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-newsreader)',
            fontSize: 'clamp(56px, 10vw, 120px)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            color: 'var(--on-surface)',
            marginBottom: '20px',
          }}
        >
          Tu página web.
        </motion.h1>

        {/* Italic sub-headline */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-newsreader)',
            fontStyle: 'italic',
            fontSize: 'clamp(22px, 4vw, 40px)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: 'rgba(28,28,24,0.45)',
            marginBottom: '52px',
          }}
        >
          diseño a medida.
        </motion.p>

        {/* Price — the singular celadon accent */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '48px' }}
        >
          <span
            style={{
              position: 'relative',
              display: 'inline-block',
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(14px, 2vw, 20px)',
              fontWeight: 200,
              letterSpacing: '0.12em',
              color: 'var(--on-surface)',
            }}
          >
            a partir de 29 €/mes
            {/* Celadon underline — singular accent moment */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                right: 0,
                height: '1.5px',
                background: 'var(--tertiary-fixed)',
              }}
            />
          </span>
        </motion.div>

        {/* Attribute pills */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
            marginBottom: '56px',
          }}
        >
          {ATTRIBUTES.map(attr => (
            <span
              key={attr}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '10px',
                fontWeight: 200,
                letterSpacing: '0.18em',
                color: 'rgba(28,28,24,0.45)',
                padding: '6px 14px',
                border: '0.5px solid rgba(200,194,180,0.4)',
              }}
            >
              {attr}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '28px', flexWrap: 'wrap' }}
        >
          <a
            href="/registro"
            style={{
              display: 'inline-block',
              padding: '15px 32px',
              background: 'var(--on-surface)',
              color: 'var(--surface)',
              fontFamily: 'var(--font-inter)',
              fontSize: '11px',
              fontWeight: 300,
              letterSpacing: '0.2em',
              textDecoration: 'none',
              transition: 'background 0.4s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--on-tertiary-container)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--on-surface)')}
          >
            quiero mi web →
          </a>
          <a
            href="#portfolio"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '10px',
              fontWeight: 200,
              letterSpacing: '0.18em',
              color: 'rgba(28,28,24,0.38)',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--on-surface)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(28,28,24,0.38)')}
          >
            ver ejemplos
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      {showScroll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: '1px',
              height: '36px',
              background: 'linear-gradient(to bottom, rgba(28,28,24,0.25), transparent)',
              animation: 'pulse_soft 2.4s ease-in-out infinite',
            }}
          />
        </motion.div>
      )}
    </section>
  )
}
