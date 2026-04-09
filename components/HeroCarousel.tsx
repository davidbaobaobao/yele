'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export const CARDS_DATA = [
  { theme: 0, logo: 'Fontanería Martín', sector: 'Fontanería · Plan Profesional',
    headline: 'Tu fontanero\nde confianza.', body: 'Madrid · Urgencias 24h\nPresupuesto gratuito en 1 hora',
    cta: 'Solicitar presupuesto →', navCta: 'Llamar' },
  { theme: 1, logo: 'Alma Yoga', sector: 'Yoga · Plan Básica',
    headline: 'Encuentra\ntu centro.', body: 'Valencia · Todos los niveles\nClases online y presencial',
    cta: 'Reservar clase →', navCta: 'Reservar' },
  { theme: 2, logo: 'Barbería El Corte', sector: 'Barbería · Plan Avanzada',
    headline: 'El mejor corte\nde tu barrio.', body: 'Barcelona · Desde 12 € · Sin cita previa\nAbierto sábados y domingos',
    cta: 'Ver servicios →', navCta: 'Reserva' },
  { theme: 3, logo: 'Clínica Serena', sector: 'Salud · Plan Profesional',
    headline: 'Fisioterapia\nespecializada.', body: 'Sevilla · Primera consulta gratis\n15 años de experiencia',
    cta: 'Pedir cita →', navCta: 'Cita' },
  { theme: 4, logo: 'Academia Lumina', sector: 'Academia · Plan Avanzada',
    headline: 'Inglés que\nabre puertas.', body: 'Zaragoza · Grupos reducidos\nPreparación exámenes oficiales',
    cta: 'Clase de prueba →', navCta: 'Prueba' },
  { theme: 5, logo: 'Casa Pepe', sector: 'Restaurante · Plan Profesional',
    headline: 'Cocina de mercado,\nde verdad.', body: 'Madrid · Menú del día 14 €\nAbierto todos los días',
    cta: 'Reservar mesa →', navCta: 'Reservar' },
]

const ACTIVE_W   = 520
const INACTIVE_W = 280
const GAP        = 16

function getOffset(activeIndex: number, stripWidth: number): number {
  let x = 0
  for (let i = 0; i < activeIndex; i++) x += INACTIVE_W + GAP
  return -(x - (stripWidth / 2 - ACTIVE_W / 2))
}

export default function HeroCarousel() {
  const [active, setActive]     = useState(0)
  const [locked, setLocked]     = useState(true)
  const stripRef    = useRef<HTMLDivElement>(null)
  const accDelta    = useRef(0)
  const [stripWidth, setStripWidth] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const measure = () => {
      if (stripRef.current) setStripWidth(stripRef.current.offsetWidth)
      setIsMobile(window.innerWidth < 768)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const navigate = useCallback((dir: 1 | -1) => {
    setActive(prev => Math.max(0, Math.min(CARDS_DATA.length - 1, prev + dir)))
  }, [])

  useEffect(() => {
    if (!locked) return
    const onWheel = (e: WheelEvent) => {
      if (active === CARDS_DATA.length - 1 && e.deltaY > 0) { setLocked(false); return }
      if (active === 0 && e.deltaY < 0) { setLocked(false); return }
      e.preventDefault()
      accDelta.current += e.deltaY
      if (Math.abs(accDelta.current) > 60) {
        navigate(accDelta.current > 0 ? 1 : -1)
        accDelta.current = 0
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [active, locked, navigate])

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setLocked(true) },
      { threshold: 0.5 }
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft')  navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const touchStart = useRef(0)
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 40) navigate(dx > 0 ? 1 : -1)
  }

  const offset    = getOffset(active, stripWidth)
  const activeW   = isMobile ? '85vw' : `${ACTIVE_W}px`
  const inactiveW = isMobile ? '65vw' : `${INACTIVE_W}px`

  return (
    <div
      ref={stripRef}
      className="relative w-full h-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Ejemplos de webs para negocios"
    >
      {/* Arrow left */}
      {active > 0 && !isMobile && (
        <button
          onClick={() => navigate(-1)}
          aria-label="Tarjeta anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-[25] w-8 h-8 flex items-center justify-center transition-all duration-400"
          style={{
            background: 'rgba(252,249,243,0.15)',
            color: 'rgba(252,249,243,0.7)',
            backdropFilter: 'blur(8px)',
            border: '0.5px solid rgba(252,249,243,0.2)',
            fontSize: '18px',
            lineHeight: 1,
          }}
        >
          ‹
        </button>
      )}

      {/* Track */}
      <div
        className="flex items-end h-full"
        style={{
          gap: `${GAP}px`,
          paddingTop: '12px',
          transform: `translateX(${offset}px)`,
          transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
      >
        {CARDS_DATA.map((card, i) => {
          const isActive = i === active
          return (
            <div
              key={i}
              onClick={() => setActive(i)}
              role="button"
              tabIndex={0}
              aria-label={`Ver ejemplo: ${card.logo}`}
              onKeyDown={e => e.key === 'Enter' && setActive(i)}
              className={`site-card card-theme-${card.theme} flex-shrink-0 overflow-hidden cursor-pointer relative`}
              style={{
                width: isActive ? activeW : inactiveW,
                height: isActive ? '100%' : 'calc(100% - 20px)',
                boxShadow: isActive ? '0px 20px 40px rgba(28,28,24,0.12)' : 'none',
                transition: 'width 0.75s cubic-bezier(0.16,1,0.3,1), height 0.75s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease',
                alignSelf: 'flex-end',
              }}
            >
              {/* Blob */}
              <div
                className="card-blob absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full pointer-events-none"
                style={{
                  opacity: isActive ? 0.55 : 0.3,
                  transition: 'opacity 0.4s ease',
                  animation: 'blob_pulse 4s ease-in-out infinite',
                }}
              />

              <div className="card-inner relative z-10 flex flex-col h-full p-4">
                {/* Mini nav */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    style={{
                      fontFamily: 'var(--font-newsreader)',
                      fontStyle: 'italic',
                      fontSize: isActive ? '13px' : '11px',
                      color: 'rgba(255,255,255,0.85)',
                      transition: 'font-size 0.4s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    {card.logo}
                  </span>
                  <div
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '9px',
                      fontWeight: 200,
                      letterSpacing: '0.15em',
                      padding: '3px 8px',
                      background: 'rgba(197,236,210,0.15)',
                      color: '#aacfb6',
                    }}
                  >
                    {card.navCta.toLowerCase()}
                  </div>
                </div>

                {/* Hero content */}
                <div className="flex-1 flex flex-col justify-end">
                  <h3
                    className="whitespace-pre-line"
                    style={{
                      fontFamily: 'var(--font-newsreader)',
                      fontStyle: 'italic',
                      fontSize: isActive ? '24px' : '15px',
                      fontWeight: 300,
                      color: 'white',
                      lineHeight: 1.15,
                      transition: 'font-size 0.4s cubic-bezier(0.16,1,0.3,1)',
                      marginBottom: '8px',
                    }}
                  >
                    {card.headline}
                  </h3>

                  <p
                    className="whitespace-pre-line"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '11px',
                      fontWeight: 200,
                      letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.45)',
                      lineHeight: 1.6,
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 0.4s ease 0.1s',
                      marginBottom: '12px',
                    }}
                  >
                    {card.body}
                  </p>

                  {/* CTA text link style */}
                  <div
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0)' : 'translateY(8px)',
                      transition: 'opacity 0.4s ease 0.2s, transform 0.4s cubic-bezier(0.16,1,0.3,1) 0.2s',
                    }}
                  >
                    {isActive && (
                      <button
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontSize: '9px',
                          fontWeight: 200,
                          letterSpacing: '0.2em',
                          color: 'rgba(255,255,255,0.7)',
                          background: 'none',
                          border: 'none',
                          borderBottom: '0.5px solid rgba(255,255,255,0.2)',
                          paddingBottom: '1px',
                          cursor: 'pointer',
                          padding: '0 0 1px 0',
                        }}
                      >
                        {card.cta}
                      </button>
                    )}
                  </div>
                </div>

                {/* Skeleton strips */}
                <div
                  className="flex flex-col gap-1.5 mt-3"
                  style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.4s ease 0.3s' }}
                >
                  {[65, 85, 45].map((w, j) => (
                    <div key={j} style={{ width: `${w}%`, height: '3px', background: 'rgba(255,255,255,0.08)' }} />
                  ))}
                </div>
              </div>

              {/* Sector badge */}
              <div
                className="absolute bottom-3 right-3"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '9px',
                  fontWeight: 200,
                  letterSpacing: '0.12em',
                  padding: '3px 6px',
                  background: 'rgba(0,0,0,0.35)',
                  color: 'rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {card.sector}
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(0,0,0,0.4)' }}
              >
                <button
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '9px',
                    fontWeight: 200,
                    letterSpacing: '0.2em',
                    color: 'rgba(255,255,255,0.8)',
                    background: 'none',
                    border: '0.5px solid rgba(255,255,255,0.25)',
                    padding: '8px 16px',
                    cursor: 'pointer',
                  }}
                >
                  ver ejemplo →
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Arrow right */}
      {active < CARDS_DATA.length - 1 && !isMobile && (
        <button
          onClick={() => navigate(1)}
          aria-label="Siguiente tarjeta"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-[25] w-8 h-8 flex items-center justify-center transition-all duration-400"
          style={{
            background: 'rgba(252,249,243,0.15)',
            color: 'rgba(252,249,243,0.7)',
            backdropFilter: 'blur(8px)',
            border: '0.5px solid rgba(252,249,243,0.2)',
            fontSize: '18px',
            lineHeight: 1,
          }}
        >
          ›
        </button>
      )}

      {/* Dot progress */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[25] flex items-center gap-2" role="tablist">
        {CARDS_DATA.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            aria-label={`Ir a la tarjeta ${i + 1}`}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? '16px' : '4px',
              height: '4px',
              background: i === active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
