'use client'

import { useState } from 'react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const BUSINESS_TYPES = [
  'Restaurante',
  'Clínica o consulta',
  'Tienda',
  'Peluquería o barbería',
  'Instructor o academia',
  'Fontanero u oficio',
  'Otro',
]

// Bottom-border-only input style (DESIGN.md: no 4-sided boxes)
const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '0.5px solid rgba(200,194,180,0.5)',
  padding: '10px 0',
  fontFamily: 'var(--font-inter)',
  fontSize: '13px',
  fontWeight: 200,
  letterSpacing: '0.05em',
  color: 'var(--on-surface)',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  borderRadius: '0',
  appearance: 'none',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter)',
  fontSize: '9px',
  fontWeight: 200,
  letterSpacing: '0.25em',
  color: 'rgba(28,28,24,0.4)',
  marginBottom: '8px',
  display: 'block',
}

const errorStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter)',
  fontSize: '10px',
  fontWeight: 200,
  color: '#8B2020',
  marginTop: '4px',
  letterSpacing: '0.05em',
}

const focusCSS = `
  .washi-input:focus {
    border-bottom-color: var(--tertiary-fixed) !important;
  }
  .washi-select option {
    background: var(--surface);
    color: var(--on-surface);
  }
`

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [values, setValues] = useState({
    nombre: '',
    email: '',
    telefono: '',
    negocio: '',
    mensaje: '',
    rgpd: false,
  })

  function validate(field: string, value: string | boolean) {
    switch (field) {
      case 'nombre':
        return !value ? 'El nombre es obligatorio.' : ''
      case 'email':
        return !value
          ? 'El email es obligatorio.'
          : !/\S+@\S+\.\S+/.test(value as string)
          ? 'Introduce un email válido.'
          : ''
      case 'mensaje':
        return !value ? 'El mensaje es obligatorio.' : ''
      case 'rgpd':
        return !value ? 'Debes aceptar la política de privacidad.' : ''
      default:
        return ''
    }
  }

  function handleBlur(field: string) {
    const val = values[field as keyof typeof values]
    const err = validate(field, val)
    setErrors(prev => ({ ...prev, [field]: err }))
  }

  function handleChange(field: string, value: string | boolean) {
    setValues(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const newErrors: Record<string, string> = {}
    for (const field of ['nombre', 'email', 'mensaje', 'rgpd']) {
      const err = validate(field, values[field as keyof typeof values])
      if (err) newErrors[field] = err
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setFormState('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre:   values.nombre,
          email:    values.email,
          telefono: values.telefono,
          negocio:  values.negocio,
          mensaje:  values.mensaje,
        }),
      })
      if (res.ok) {
        setFormState('success')
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <div
        className="py-12 text-center"
        style={{ borderTop: '0.5px solid var(--tertiary-fixed)' }}
        role="status"
        aria-live="polite"
      >
        <p style={{ fontFamily: 'var(--font-newsreader)', fontStyle: 'italic', fontSize: '22px', fontWeight: 300, color: 'var(--on-surface)', marginBottom: '8px' }}>
          Mensaje enviado.
        </p>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', fontWeight: 200, letterSpacing: '0.1em', color: 'rgba(28,28,24,0.45)' }}>
          te contactamos en menos de 24 horas.
        </p>
      </div>
    )
  }

  return (
    <>
      <style>{focusCSS}</style>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" style={labelStyle}>nombre completo <span aria-label="obligatorio">*</span></label>
          <input
            id="nombre"
            type="text"
            autoComplete="name"
            value={values.nombre}
            onChange={e => handleChange('nombre', e.target.value)}
            onBlur={() => handleBlur('nombre')}
            aria-required="true"
            aria-describedby={errors.nombre ? 'error-nombre' : undefined}
            aria-invalid={!!errors.nombre}
            className="washi-input"
            style={{ ...inputStyle, borderBottomColor: errors.nombre ? '#8B2020' : undefined }}
          />
          {errors.nombre && <p id="error-nombre" style={errorStyle} role="alert">{errors.nombre}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" style={labelStyle}>email <span aria-label="obligatorio">*</span></label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={e => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            aria-required="true"
            aria-describedby={errors.email ? 'error-email' : undefined}
            aria-invalid={!!errors.email}
            className="washi-input"
            style={{ ...inputStyle, borderBottomColor: errors.email ? '#8B2020' : undefined }}
          />
          {errors.email && <p id="error-email" style={errorStyle} role="alert">{errors.email}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="telefono" style={labelStyle}>teléfono</label>
          <input
            id="telefono"
            type="tel"
            autoComplete="tel"
            value={values.telefono}
            onChange={e => handleChange('telefono', e.target.value)}
            className="washi-input"
            style={inputStyle}
          />
        </div>

        {/* Tipo de negocio */}
        <div>
          <label htmlFor="negocio" style={labelStyle}>tipo de negocio</label>
          <select
            id="negocio"
            value={values.negocio}
            onChange={e => handleChange('negocio', e.target.value)}
            className="washi-input washi-select"
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="">selecciona tu tipo de negocio</option>
            {BUSINESS_TYPES.map(t => (
              <option key={t} value={t}>{t.toLowerCase()}</option>
            ))}
          </select>
        </div>

        {/* Mensaje */}
        <div>
          <label htmlFor="mensaje" style={labelStyle}>mensaje <span aria-label="obligatorio">*</span></label>
          <textarea
            id="mensaje"
            rows={4}
            value={values.mensaje}
            onChange={e => handleChange('mensaje', e.target.value)}
            onBlur={() => handleBlur('mensaje')}
            aria-required="true"
            aria-describedby={errors.mensaje ? 'error-mensaje' : undefined}
            aria-invalid={!!errors.mensaje}
            className="washi-input"
            style={{ ...inputStyle, resize: 'vertical', minHeight: '100px', borderBottomColor: errors.mensaje ? '#8B2020' : undefined }}
          />
          {errors.mensaje && <p id="error-mensaje" style={errorStyle} role="alert">{errors.mensaje}</p>}
        </div>

        {/* RGPD */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={values.rgpd}
              onChange={e => handleChange('rgpd', e.target.checked)}
              onBlur={() => handleBlur('rgpd')}
              aria-required="true"
              aria-describedby={errors.rgpd ? 'error-rgpd' : undefined}
              aria-invalid={!!errors.rgpd}
              className="mt-1 flex-shrink-0"
              style={{ accentColor: 'var(--tertiary-fixed)', width: '14px', height: '14px' }}
            />
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', fontWeight: 200, letterSpacing: '0.05em', color: 'rgba(28,28,24,0.45)', lineHeight: 1.7 }}>
              he leído y acepto la{' '}
              <a
                href="/politica-privacidad"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--on-tertiary-container)', textDecoration: 'none', borderBottom: '0.5px solid var(--tertiary-fixed)' }}
              >
                política de privacidad
              </a>
              {' '}y consiento el tratamiento de mis datos.
            </span>
          </label>
          {errors.rgpd && <p id="error-rgpd" style={errorStyle} role="alert">{errors.rgpd}</p>}
        </div>

        {/* Error global */}
        {formState === 'error' && (
          <p style={{ ...errorStyle, fontSize: '11px' }} role="alert">
            Error al enviar. Inténtalo de nuevo o{' '}
            <a href="https://wa.me/34600000000" style={{ color: 'var(--on-tertiary-container)', borderBottom: '0.5px solid var(--tertiary-fixed)', textDecoration: 'none' }}>
              escríbenos por WhatsApp
            </a>.
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={formState === 'submitting'}
          className="transition-all duration-400"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '10px',
            fontWeight: 200,
            letterSpacing: '0.2em',
            color: formState === 'submitting' ? 'rgba(28,28,24,0.35)' : 'white',
            background: formState === 'submitting' ? 'rgba(28,28,24,0.2)' : 'var(--primary)',
            border: 'none',
            padding: '14px 32px',
            cursor: formState === 'submitting' ? 'not-allowed' : 'pointer',
            alignSelf: 'flex-start',
          }}
          onMouseEnter={e => {
            if (formState !== 'submitting') e.currentTarget.style.background = 'var(--on-tertiary-container)'
          }}
          onMouseLeave={e => {
            if (formState !== 'submitting') e.currentTarget.style.background = 'var(--primary)'
          }}
        >
          {formState === 'submitting' ? 'enviando…' : 'enviar mensaje →'}
        </button>
      </form>
    </>
  )
}
