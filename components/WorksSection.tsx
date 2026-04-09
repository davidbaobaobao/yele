'use client'

import { useRef, useEffect } from 'react'
import { CARDS_DATA } from '@/components/HeroCarousel'

/* ─── 1C. Peek Row ─── */
function PeekRow() {
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef   = useRef<number>(0)
  const paused   = useRef(false)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    function tick() {
      if (!paused.current && el) {
        el.scrollLeft += 0.4
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const stop  = () => { paused.current = true }
    const start = () => { paused.current = false }
    el.addEventListener('mousedown',  stop)
    el.addEventListener('touchstart', stop, { passive: true })
    el.addEventListener('mouseup',    start)
    el.addEventListener('touchend',   start)
    el.addEventListener('mouseleave', start)

    let isDown = false, startX = 0, sl = 0
    const onDown = (e: MouseEvent) => { isDown = true; startX = e.pageX - el.offsetLeft; sl = el.scrollLeft; el.style.cursor = 'grabbing' }
    const onMove = (e: MouseEvent) => { if (!isDown) return; e.preventDefault(); el.scrollLeft = sl - (e.pageX - el.offsetLeft - startX) }
    const onUp   = () => { isDown = false; el.style.cursor = 'grab' }
    el.addEventListener('mousedown', onDown)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseup',   onUp)

    return () => {
      cancelAnimationFrame(rafRef.current)
      el.removeEventListener('mousedown',  stop)
      el.removeEventListener('touchstart', stop)
      el.removeEventListener('mouseup',    start)
      el.removeEventListener('touchend',   start)
      el.removeEventListener('mouseleave', start)
      el.removeEventListener('mousedown',  onDown)
      el.removeEventListener('mousemove',  onMove)
      el.removeEventListener('mouseup',    onUp)
    }
  }, [])

  const allCards = [...CARDS_DATA, ...CARDS_DATA]

  return (
    <div
      ref={trackRef}
      className="scrollbar-none overflow-x-auto"
      style={{ cursor: 'grab', scrollSnapType: 'x mandatory' }}
    >
      <div style={{ display: 'flex', gap: '16px', padding: '8px 40px', width: 'max-content' }}>
        {allCards.map((card, i) => (
          <div
            key={i}
            className={`card-theme-${card.theme} flex-shrink-0 overflow-hidden relative group`}
            style={{ width: '240px', height: '160px', scrollSnapAlign: 'start' }}
          >
            <div className="card-blob absolute top-[-20%] right-[-10%] w-2/3 h-2/3 rounded-full pointer-events-none opacity-30" />
            <div className="relative z-10 p-4 flex flex-col h-full">
              <span style={{ fontFamily: 'var(--font-newsreader)', fontStyle: 'italic', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                {card.logo}
              </span>
              <p
                className="mt-auto whitespace-pre-line"
                style={{ fontFamily: 'var(--font-newsreader)', fontStyle: 'italic', fontSize: '17px', fontWeight: 300, color: 'white', lineHeight: 1.15 }}
              >
                {card.headline}
              </p>
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(255,255,255,0.25)', padding: '6px 14px' }}>
                ver ejemplo →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── 1D. Cards Grid ─── */
function CardsGrid() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const idx = parseInt(el.dataset.idx || '0', 10)
            setTimeout(() => {
              el.classList.remove('reveal-hidden')
              el.classList.add('reveal-visible')
            }, idx * 80)
            obs.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )
    itemsRef.current.forEach(el => { if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <div
      className="grid gap-4 px-5 md:px-10 pb-16"
      style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
    >
      {CARDS_DATA.map((card, i) => (
        <div
          key={i}
          ref={el => { itemsRef.current[i] = el }}
          data-idx={i}
          // Offset every second card vertically (per DESIGN.md)
          className={`card-theme-${card.theme} overflow-hidden relative group reveal-hidden`}
          style={{ height: '200px', marginTop: i % 2 === 1 ? '32px' : '0' }}
        >
          <div className="card-blob absolute top-[-15%] right-[-5%] w-2/3 h-2/3 rounded-full pointer-events-none opacity-35" />
          <div className="relative z-10 p-5 flex flex-col h-full">
            <span style={{ fontFamily: 'var(--font-newsreader)', fontStyle: 'italic', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
              {card.logo}
            </span>
            <p
              className="mt-auto whitespace-pre-line"
              style={{ fontFamily: 'var(--font-newsreader)', fontStyle: 'italic', fontSize: '20px', fontWeight: 300, color: 'white', lineHeight: 1.15 }}
            >
              {card.headline}
            </p>
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(255,255,255,0.25)', padding: '6px 14px' }}>
              ver ejemplo →
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function WorksSection() {
  return (
    <section
      id="trabajos"
      style={{ background: 'var(--secondary-container)' }}
      aria-labelledby="works-heading"
    >
      {/* Section separator */}
      <div className="sumi-rule" aria-hidden="true" />

      {/* Header */}
      <div className="text-center pt-16 pb-8 px-6">
        <span
          className="block mb-3"
          style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.3em', color: 'rgba(28,28,24,0.4)' }}
        >
          nuestros trabajos
        </span>
        <h2
          id="works-heading"
          style={{ fontFamily: 'var(--font-newsreader)', fontStyle: 'italic', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 300, color: 'var(--on-surface)', marginBottom: '28px' }}
        >
          Webs que ya están funcionando.
        </h2>
      </div>

      <PeekRow />
      <div className="mt-4"><CardsGrid /></div>
    </section>
  )
}
