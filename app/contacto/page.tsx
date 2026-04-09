import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contacto | Yele',
  description: 'Cuéntanos tu negocio. Diseñamos y publicamos tu web en 3 días desde 19,90 €/mes.',
}

export default function ContactPage() {
  return (
    <section
      className="py-24 lg:py-32 px-6"
      style={{ background: 'var(--color-light)', minHeight: '100svh' }}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-xl mx-auto pt-10">
        <span
          className="block uppercase mb-4"
          style={{ fontSize: '12px', letterSpacing: '0.08em', fontWeight: 600, color: 'var(--color-accent)', fontFamily: 'var(--font-dm-sans)' }}
        >
          Cuéntanos tu negocio
        </span>
        <h1
          id="contact-heading"
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontSize: 'clamp(32px, 3.5vw, 44px)',
            color: 'var(--color-dark)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: '8px',
          }}
        >
          Hablemos.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '16px',
            color: 'var(--color-neutral)',
            marginBottom: '40px',
            lineHeight: 1.6,
          }}
        >
          Rellena el formulario y te contactamos en menos de 24 horas.
          Sin compromisos.
        </p>

        <ContactForm />
      </div>
    </section>
  )
}
