const SECTORS = [
  'Fontaneros', 'Peluquerías', 'Fisioterapeutas', 'Instructores', 'Restaurantes',
  'Academias', 'Veterinarios', 'Electricistas', 'Dentistas', 'Barberías',
  'Tiendas', 'Entrenadores', 'Estética', 'Carpinteros', 'Ópticas',
]

function TickerContent() {
  return (
    <>
      {SECTORS.map((sector, i) => (
        <span key={i} className="flex items-center gap-3 flex-shrink-0">
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '10px',
              fontWeight: 200,
              letterSpacing: '0.2em',
              color: 'rgba(28,28,24,0.45)',
            }}
          >
            {sector.toLowerCase()}
          </span>
          <span
            style={{ color: 'var(--tertiary-fixed)', fontSize: '10px', opacity: 0.7 }}
            aria-hidden="true"
          >
            ·
          </span>
        </span>
      ))}
    </>
  )
}

export default function SectorTicker() {
  return (
    <div
      style={{ background: 'var(--surface-container-low)', height: '44px' }}
      className="overflow-hidden flex items-center"
      aria-label="Sectores que atendemos"
    >
      <div className="flex items-center gap-3 animate-marquee whitespace-nowrap">
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  )
}
