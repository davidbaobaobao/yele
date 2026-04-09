import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso legal | Yele',
}

export default function AvisoLegalPage() {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--color-light)', minHeight: '100svh' }}>
      <div className="max-w-2xl mx-auto pt-10">
        <h1 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: '40px', color: 'var(--color-dark)', marginBottom: '32px' }}>
          Aviso legal
        </h1>
        <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '16px', color: 'var(--color-neutral)', lineHeight: 1.8 }}>
          {/* TODO: completar con datos legales reales — nombre del titular, NIF, domicilio, etc. */}
          <p className="mb-4">
            En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), el titular de este sitio web facilita la siguiente información:
          </p>
          <p className="mb-2"><strong style={{ color: 'var(--color-dark)' }}>Titular:</strong> Yele {/* TODO: nombre legal completo */}</p>
          <p className="mb-2"><strong style={{ color: 'var(--color-dark)' }}>NIF/CIF:</strong> {/* TODO: NIF */}</p>
          <p className="mb-2"><strong style={{ color: 'var(--color-dark)' }}>Domicilio:</strong> {/* TODO: dirección */}</p>
          <p className="mb-2"><strong style={{ color: 'var(--color-dark)' }}>Email:</strong> hola@yele.design {/* TODO */}</p>
          <p className="mt-8 text-sm opacity-70">Documento pendiente de redacción legal completa.</p>
        </div>
      </div>
    </section>
  )
}
