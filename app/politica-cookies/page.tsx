import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de cookies | Yele',
}

export default function PoliticaCookiesPage() {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--color-light)', minHeight: '100svh' }}>
      <div className="max-w-2xl mx-auto pt-10">
        <h1 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: '40px', color: 'var(--color-dark)', marginBottom: '32px' }}>
          Política de cookies
        </h1>
        <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '16px', color: 'var(--color-neutral)', lineHeight: 1.8 }}>
          {/* TODO: completar con política de cookies real */}
          <p className="mb-4">
            Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia de navegación y obtener estadísticas de uso.
          </p>
          <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: '22px', color: 'var(--color-dark)', marginTop: '28px', marginBottom: '12px' }}>¿Qué son las cookies?</h2>
          <p>Las cookies son pequeños ficheros de texto que se almacenan en su dispositivo cuando visita un sitio web.</p>
          <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: '22px', color: 'var(--color-dark)', marginTop: '28px', marginBottom: '12px' }}>Cookies utilizadas</h2>
          <p>Actualmente este sitio solo utiliza cookies técnicas necesarias para el funcionamiento básico.</p>
          <p className="mt-8 text-sm opacity-70">Documento pendiente de redacción legal completa.</p>
        </div>
      </div>
    </section>
  )
}
