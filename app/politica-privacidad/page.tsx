import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de privacidad | Yele',
}

export default function PoliticaPrivacidadPage() {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--color-light)', minHeight: '100svh' }}>
      <div className="max-w-2xl mx-auto pt-10">
        <h1 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: '40px', color: 'var(--color-dark)', marginBottom: '32px' }}>
          Política de privacidad
        </h1>
        <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '16px', color: 'var(--color-neutral)', lineHeight: 1.8 }}>
          {/* TODO: completar con política RGPD completa */}
          <p className="mb-4">
            De conformidad con lo dispuesto en el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD), le informamos sobre el tratamiento de sus datos personales.
          </p>
          <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: '22px', color: 'var(--color-dark)', marginTop: '28px', marginBottom: '12px' }}>Responsable del tratamiento</h2>
          <p>Yele — {/* TODO: datos completos del responsable */}</p>
          <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: '22px', color: 'var(--color-dark)', marginTop: '28px', marginBottom: '12px' }}>Finalidad</h2>
          <p>Los datos recabados a través del formulario de contacto se utilizan exclusivamente para responder a su solicitud y enviarle información sobre los servicios de Yele.</p>
          <p className="mt-8 text-sm opacity-70">Documento pendiente de redacción legal completa.</p>
        </div>
      </div>
    </section>
  )
}
