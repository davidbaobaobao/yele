'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

// ─── Types ────────────────────────────────────────────────────────────────────

type Industry =
  | 'restaurante'
  | 'oficios'
  | 'salud'
  | 'estetica'
  | 'inmobiliaria'
  | 'deporte'
  | 'academia'
  | 'tienda'
  | 'asesoria'
  | 'fotografo'
  | 'otro'

interface FormData {
  // Step 1
  industry: Industry | null
  // Step 2
  businessName: string
  city: string
  phone: string
  email: string
  preferredContact: 'whatsapp' | 'email' | 'telefono' | null
  whatsappNumber: string
  hasWebsite: boolean | null
  websiteUrl: string
  // Step 3 — universal
  description: string
  openingHours: string
  // Step 3 — industry-specific (keyed by field id)
  industryFields: Record<string, string | boolean | string[]>
  // Step 4
  hasLogo: boolean | null
  logoFile: File | null
  hasPhotos: boolean | null
  brandColors: string
  stylePrefs: string[]
  // Step 5
  extraInfo: string
  rgpd: boolean
}

interface FieldError {
  [key: string]: string
}

// ─── Industry catalogue ────────────────────────────────────────────────────────

const INDUSTRIES: { id: Industry; label: string; icon: string }[] = [
  { id: 'restaurante', label: 'Restaurante / Bar / Cafetería', icon: '🍽' },
  { id: 'oficios',     label: 'Fontanero / Electricista / Oficios', icon: '🔧' },
  { id: 'salud',       label: 'Fisioterapeuta / Clínica / Salud', icon: '🩺' },
  { id: 'estetica',    label: 'Peluquería / Barbería / Estética', icon: '✂️' },
  { id: 'inmobiliaria',label: 'Inmobiliaria', icon: '🏠' },
  { id: 'deporte',     label: 'Instructor / Deporte / Gym', icon: '🏋' },
  { id: 'academia',    label: 'Academia / Clases particulares', icon: '📚' },
  { id: 'tienda',      label: 'Tienda / Comercio local', icon: '🛍' },
  { id: 'asesoria',    label: 'Asesoría / Gestoría / Abogado', icon: '⚖️' },
  { id: 'fotografo',   label: 'Fotógrafo / Creativo', icon: '📷' },
  { id: 'otro',        label: 'Otro', icon: '•' },
]

const STYLE_OPTIONS = ['Moderno', 'Clásico', 'Minimalista', 'Atrevido', 'Cálido', 'Profesional']

// ─── Industry-specific extra fields config ─────────────────────────────────────

type FieldDef =
  | { id: string; label: string; type: 'text' | 'number' | 'textarea'; placeholder?: string; required?: boolean }
  | { id: string; label: string; type: 'yesno' }
  | { id: string; label: string; type: 'checkboxes'; options: string[] }

const INDUSTRY_FIELDS: Record<Industry, FieldDef[]> = {
  restaurante: [
    { id: 'cocina',    label: 'Tipo de cocina',    type: 'text', placeholder: 'ej. Mediterránea, Tapas, Fusión' },
    { id: 'terraza',   label: '¿Tienes terraza?',  type: 'yesno' },
    { id: 'reservas',  label: '¿Aceptas reservas?',type: 'yesno' },
  ],
  oficios: [
    { id: 'cobertura',   label: 'Zona de cobertura',      type: 'text', placeholder: 'ej. Madrid capital y alrededores' },
    { id: 'urgencias',   label: '¿Atiendes urgencias?',   type: 'yesno' },
    { id: 'experiencia', label: 'Años de experiencia',     type: 'number' },
  ],
  salud: [
    { id: 'especialidades', label: 'Especialidades',              type: 'text', placeholder: 'ej. Deportiva, Neurológica' },
    { id: 'seguro',         label: '¿Aceptas seguro médico?',     type: 'yesno' },
    { id: 'profesionales',  label: 'Número de profesionales',     type: 'number' },
  ],
  estetica: [
    { id: 'servicios',     label: 'Servicios principales',        type: 'text' },
    { id: 'cita',          label: '¿Se necesita cita previa?',    type: 'yesno' },
    { id: 'profesionales', label: 'Número de profesionales',      type: 'number' },
  ],
  inmobiliaria: [
    { id: 'zonas',      label: 'Zonas de actuación',              type: 'text' },
    { id: 'operaciones',label: 'Tipo de operaciones',             type: 'checkboxes', options: ['Venta', 'Alquiler', 'Obra nueva'] },
    { id: 'idiomas',    label: 'Idiomas que habláis',             type: 'text' },
  ],
  deporte: [
    { id: 'disciplina', label: 'Deporte o disciplina',            type: 'text' },
    { id: 'clases',     label: 'Tipo de clases',                  type: 'checkboxes', options: ['Individual', 'Grupo', 'Online'] },
    { id: 'nivel',      label: 'Nivel',                           type: 'checkboxes', options: ['Principiante', 'Intermedio', 'Avanzado'] },
  ],
  academia: [
    { id: 'materias',   label: 'Materias o disciplinas',          type: 'text' },
    { id: 'edades',     label: 'Edades a las que enseñas',        type: 'text', placeholder: 'ej. 8–18 años, adultos' },
    { id: 'modalidad',  label: 'Modalidad',                       type: 'checkboxes', options: ['Presencial', 'Online', 'Ambas'] },
  ],
  tienda: [
    { id: 'productos',  label: 'Tipo de productos',               type: 'text' },
    { id: 'online',     label: '¿Tienes tienda online?',          type: 'yesno' },
    { id: 'marcas',     label: 'Marcas principales (opcional)',   type: 'text' },
  ],
  asesoria: [
    { id: 'servicios',     label: 'Servicios principales',        type: 'text' },
    { id: 'sectores',      label: 'Sectores a los que te diriges (opcional)', type: 'text' },
    { id: 'profesionales', label: 'Número de profesionales',      type: 'number' },
  ],
  fotografo: [
    { id: 'especialidad', label: 'Especialidad',                  type: 'text', placeholder: 'ej. Bodas, Producto, Retrato' },
    { id: 'trabajo',      label: '¿Dónde trabajas?',              type: 'checkboxes', options: ['Estudio', 'Exterior', 'Ambos'] },
  ],
  otro: [
    { id: 'descripcion_extra', label: 'Describe tu negocio',      type: 'textarea' },
    { id: 'sector',            label: 'Sector',                   type: 'text' },
  ],
}

const INDUSTRY_LABELS: Record<Industry, string> = {
  restaurante: 'Restaurante / Bar / Cafetería',
  oficios:     'Fontanero / Electricista / Oficios',
  salud:       'Fisioterapeuta / Clínica / Salud',
  estetica:    'Peluquería / Barbería / Estética',
  inmobiliaria:'Inmobiliaria',
  deporte:     'Instructor / Deporte / Gym',
  academia:    'Academia / Clases particulares',
  tienda:      'Tienda / Comercio local',
  asesoria:    'Asesoría / Gestoría / Abogado',
  fotografo:   'Fotógrafo / Creativo',
  otro:        'Otro',
}

// ─── Shared style helpers ─────────────────────────────────────────────────────

const labelCss: React.CSSProperties = {
  fontFamily: 'var(--font-inter)',
  fontSize: '9px',
  fontWeight: 200,
  letterSpacing: '0.25em',
  color: 'rgba(28,28,24,0.45)',
  display: 'block',
  marginBottom: '8px',
}

const inputCss: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '0.5px solid rgba(200,194,180,0.6)',
  padding: '10px 0',
  fontFamily: 'var(--font-inter)',
  fontSize: '14px',
  fontWeight: 200,
  letterSpacing: '0.03em',
  color: 'var(--on-surface)',
  outline: 'none',
}

const errorCss: React.CSSProperties = {
  fontFamily: 'var(--font-inter)',
  fontSize: '10px',
  fontWeight: 200,
  color: '#8B2020',
  marginTop: '4px',
  letterSpacing: '0.05em',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldInput({
  id, label, required, type = 'text', placeholder, value, error,
  onChange, onBlur,
}: {
  id: string; label: string; required?: boolean; type?: string;
  placeholder?: string; value: string; error?: string;
  onChange: (v: string) => void; onBlur?: () => void;
}) {
  return (
    <div>
      <label htmlFor={id} style={labelCss}>
        {label}{required && <span aria-label="obligatorio"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        aria-required={required}
        aria-invalid={!!error}
        style={{ ...inputCss, borderBottomColor: error ? '#8B2020' : undefined }}
        className="washi-form-input"
      />
      {error && <p style={errorCss} role="alert">{error}</p>}
    </div>
  )
}

function YesNoToggle({
  id, label, value, onChange,
}: {
  id: string; label: string; value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div>
      <p style={labelCss}>{label}</p>
      <div className="flex gap-3">
        {([true, false] as const).map(opt => (
          <button
            key={String(opt)}
            type="button"
            onClick={() => onChange(opt)}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '10px',
              fontWeight: 200,
              letterSpacing: '0.2em',
              padding: '8px 20px',
              border: value === opt
                ? '0.5px solid var(--on-surface)'
                : '0.5px solid rgba(200,194,180,0.4)',
              background: value === opt ? 'var(--on-surface)' : 'transparent',
              color: value === opt ? 'var(--surface)' : 'rgba(28,28,24,0.6)',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
          >
            {opt ? 'sí' : 'no'}
          </button>
        ))}
      </div>
    </div>
  )
}

function CheckboxGroup({
  id, label, options, value, onChange,
}: {
  id: string; label: string; options: string[];
  value: string[]; onChange: (v: string[]) => void;
}) {
  function toggle(opt: string) {
    onChange(value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt])
  }
  return (
    <div>
      <p style={labelCss}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '10px',
              fontWeight: 200,
              letterSpacing: '0.15em',
              padding: '6px 14px',
              border: value.includes(opt)
                ? '0.5px solid var(--on-surface)'
                : '0.5px solid rgba(200,194,180,0.4)',
              background: value.includes(opt) ? 'var(--on-surface)' : 'transparent',
              color: value.includes(opt) ? 'var(--surface)' : 'rgba(28,28,24,0.6)',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
          >
            {opt.toLowerCase()}
          </button>
        ))}
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div className="flex gap-4" style={{ borderBottom: '0.5px solid rgba(200,194,180,0.2)', paddingBottom: '12px' }}>
      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.2em', color: 'rgba(28,28,24,0.4)', minWidth: '140px', paddingTop: '2px' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 200, color: 'var(--on-surface)', flex: 1 }}>
        {value}
      </span>
    </div>
  )
}

// ─── Step indicator ────────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.3em', color: 'rgba(28,28,24,0.35)' }}>
        paso {current} de {total}
      </span>
      <div className="flex gap-1.5 flex-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              height: '1px',
              flex: 1,
              background: i < current ? 'var(--on-surface)' : 'rgba(200,194,180,0.35)',
              transition: 'background 0.4s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Back / Next nav buttons ──────────────────────────────────────────────────

function NavButtons({
  onBack, onNext, nextLabel = 'siguiente →', nextDisabled = false, submitting = false,
}: {
  onBack?: () => void; onNext?: () => void; nextLabel?: string;
  nextDisabled?: boolean; submitting?: boolean;
}) {
  return (
    <div className="flex items-center justify-between mt-12 pt-6" style={{ borderTop: '0.5px solid rgba(200,194,180,0.2)' }}>
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '10px',
            fontWeight: 200,
            letterSpacing: '0.2em',
            color: 'rgba(28,28,24,0.4)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--on-surface)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(28,28,24,0.4)')}
        >
          ← atrás
        </button>
      ) : <div />}

      {onNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled || submitting}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '10px',
            fontWeight: 200,
            letterSpacing: '0.2em',
            color: (nextDisabled || submitting) ? 'rgba(28,28,24,0.3)' : 'white',
            background: (nextDisabled || submitting) ? 'rgba(28,28,24,0.15)' : 'var(--primary)',
            border: 'none',
            padding: '14px 28px',
            cursor: (nextDisabled || submitting) ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            if (!nextDisabled && !submitting) e.currentTarget.style.background = 'var(--on-tertiary-container)'
          }}
          onMouseLeave={e => {
            if (!nextDisabled && !submitting) e.currentTarget.style.background = 'var(--primary)'
          }}
        >
          {submitting ? 'enviando…' : nextLabel}
        </button>
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

const EMPTY: FormData = {
  industry: null,
  businessName: '', city: '', phone: '', email: '',
  preferredContact: null, whatsappNumber: '',
  hasWebsite: null, websiteUrl: '',
  description: '', openingHours: '',
  industryFields: {},
  hasLogo: null, logoFile: null, hasPhotos: null,
  brandColors: '', stylePrefs: [],
  extraInfo: '', rgpd: false,
}

export default function EmpezarPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(EMPTY)
  const [errors, setErrors] = useState<FieldError>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData(prev => ({ ...prev, [key]: value }))
  }

  function setIF(key: string, value: string | boolean | string[]) {
    setData(prev => ({ ...prev, industryFields: { ...prev.industryFields, [key]: value } }))
  }

  function getIF(key: string): string {
    const v = data.industryFields[key]
    return typeof v === 'string' ? v : ''
  }

  function getIFBool(key: string): boolean | null {
    const v = data.industryFields[key]
    return typeof v === 'boolean' ? v : null
  }

  function getIFArr(key: string): string[] {
    const v = data.industryFields[key]
    return Array.isArray(v) ? v : []
  }

  function validateStep2(): FieldError {
    const e: FieldError = {}
    if (!data.businessName.trim()) e.businessName = 'El nombre del negocio es obligatorio.'
    if (!data.city.trim()) e.city = 'La ciudad es obligatoria.'
    if (!data.email.trim()) e.email = 'El email es obligatorio.'
    else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = 'Introduce un email válido.'
    if (!data.preferredContact) e.preferredContact = 'Selecciona cómo prefieres que te contactemos.'
    return e
  }

  function validateStep5(): FieldError {
    const e: FieldError = {}
    if (!data.rgpd) e.rgpd = 'Debes aceptar la política de privacidad.'
    return e
  }

  function blur(field: keyof FormData) {
    const errs = validateStep2()
    if (errs[field as string]) setErrors(prev => ({ ...prev, [field]: errs[field as string] }))
    else setErrors(prev => { const n = { ...prev }; delete n[field as string]; return n })
  }

  // ─── Step rendering ──────────────────────────────────────────────────────────

  function renderStep1() {
    return (
      <div>
        <h1 style={{ fontFamily: 'var(--font-newsreader)', fontStyle: 'italic', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 300, color: 'var(--on-surface)', marginBottom: '8px', lineHeight: 1.2 }}>
          ¿Qué tipo de negocio tienes?
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 200, letterSpacing: '0.08em', color: 'rgba(28,28,24,0.45)', marginBottom: '32px' }}>
          Selecciona el que mejor describe tu actividad.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {INDUSTRIES.map(ind => (
            <button
              key={ind.id}
              type="button"
              onClick={() => { set('industry', ind.id); setTimeout(() => setStep(2), 120) }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '8px',
                padding: '20px 16px',
                background: data.industry === ind.id ? 'var(--secondary-container)' : 'var(--surface-container-low)',
                border: data.industry === ind.id
                  ? '0.5px solid var(--on-surface)'
                  : '0.5px solid rgba(200,194,180,0.3)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(28,28,24,0.4)'; e.currentTarget.style.background = 'var(--surface-container)' }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = data.industry === ind.id ? 'var(--on-surface)' : 'rgba(200,194,180,0.3)'
                e.currentTarget.style.background = data.industry === ind.id ? 'var(--secondary-container)' : 'var(--surface-container-low)'
              }}
            >
              <span style={{ fontSize: '20px', lineHeight: 1 }}>{ind.icon}</span>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', fontWeight: 200, letterSpacing: '0.05em', color: 'var(--on-surface)', lineHeight: 1.4 }}>
                {ind.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  function renderStep2() {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h2 style={{ fontFamily: 'var(--font-newsreader)', fontStyle: 'italic', fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 300, color: 'var(--on-surface)', marginBottom: '8px', lineHeight: 1.2 }}>
            Información básica
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 200, letterSpacing: '0.08em', color: 'rgba(28,28,24,0.45)' }}>
            Los datos de contacto de tu negocio.
          </p>
        </div>

        <FieldInput
          id="businessName" label="Nombre del negocio" required
          value={data.businessName} error={errors.businessName}
          onChange={v => set('businessName', v)}
          onBlur={() => blur('businessName')}
        />
        <FieldInput
          id="city" label="Ciudad" required
          value={data.city} error={errors.city}
          onChange={v => set('city', v)}
          onBlur={() => blur('city')}
        />
        <FieldInput
          id="phone" label="Teléfono" type="tel"
          value={data.phone}
          onChange={v => set('phone', v)}
        />
        <FieldInput
          id="email" label="Email de contacto" required type="email"
          value={data.email} error={errors.email}
          onChange={v => set('email', v)}
          onBlur={() => blur('email')}
        />

        {/* Preferred contact channel */}
        <div>
          <p style={labelCss}>
            ¿Cómo prefieres que te contactemos? <span aria-label="obligatorio">*</span>
          </p>
          <div className="flex gap-3 flex-wrap">
            {([
              { id: 'whatsapp',  label: 'WhatsApp' },
              { id: 'email',     label: 'Email' },
              { id: 'telefono',  label: 'Teléfono' },
            ] as const).map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  set('preferredContact', opt.id)
                  if (errors.preferredContact) setErrors(prev => { const n = { ...prev }; delete n.preferredContact; return n })
                }}
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '10px',
                  fontWeight: 200,
                  letterSpacing: '0.2em',
                  padding: '10px 22px',
                  border: data.preferredContact === opt.id
                    ? '0.5px solid var(--on-surface)'
                    : '0.5px solid rgba(200,194,180,0.4)',
                  background: data.preferredContact === opt.id ? 'var(--on-surface)' : 'transparent',
                  color: data.preferredContact === opt.id ? 'var(--surface)' : 'rgba(28,28,24,0.6)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {opt.label.toLowerCase()}
              </button>
            ))}
          </div>
          {errors.preferredContact && (
            <p style={errorCss} role="alert">{errors.preferredContact}</p>
          )}
        </div>

        {data.preferredContact === 'whatsapp' && (
          <FieldInput
            id="whatsappNumber" label="Número de WhatsApp" type="tel"
            placeholder="ej. 612 345 678"
            value={data.whatsappNumber}
            onChange={v => set('whatsappNumber', v)}
          />
        )}

        <YesNoToggle
          id="hasWebsite" label="¿Tienes web actualmente?"
          value={data.hasWebsite}
          onChange={v => set('hasWebsite', v)}
        />

        {data.hasWebsite === true && (
          <FieldInput
            id="websiteUrl" label="URL de tu web actual"
            placeholder="https://..."
            value={data.websiteUrl}
            onChange={v => set('websiteUrl', v)}
          />
        )}

        <NavButtons
          onBack={() => setStep(1)}
          onNext={() => {
            const errs = validateStep2()
            if (Object.keys(errs).length > 0) { setErrors(errs); return }
            setErrors({})
            setStep(3)
          }}
        />
      </div>
    )
  }

  function renderStep3() {
    const extraFields = data.industry ? INDUSTRY_FIELDS[data.industry] : []
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h2 style={{ fontFamily: 'var(--font-newsreader)', fontStyle: 'italic', fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 300, color: 'var(--on-surface)', marginBottom: '8px', lineHeight: 1.2 }}>
            Cuéntanos tu negocio
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 200, letterSpacing: '0.08em', color: 'rgba(28,28,24,0.45)' }}>
            Esto ayuda a que la web refleje exactamente lo que haces.
          </p>
        </div>

        {/* Universal fields */}
        <div>
          <label htmlFor="description" style={labelCss}>
            Descripción breve <span aria-label="opcional">(máx. 300 caracteres)</span>
          </label>
          <textarea
            id="description"
            rows={4}
            maxLength={300}
            placeholder="Cuéntanos qué haces en 2-3 frases"
            value={data.description}
            onChange={e => set('description', e.target.value)}
            style={{ ...inputCss, resize: 'vertical', minHeight: '90px', borderBottom: '0.5px solid rgba(200,194,180,0.6)' }}
            className="washi-form-input"
          />
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.1em', color: 'rgba(28,28,24,0.3)', marginTop: '4px', textAlign: 'right' }}>
            {data.description.length}/300
          </p>
        </div>

        <FieldInput
          id="openingHours" label="Horario de apertura"
          placeholder="ej. Lunes a viernes 9:00–20:00"
          value={data.openingHours}
          onChange={v => set('openingHours', v)}
        />

        {/* Divider before industry-specific */}
        {extraFields.length > 0 && (
          <div className="sumi-rule" aria-hidden="true" />
        )}

        {/* Industry-specific fields */}
        {extraFields.map(field => {
          if (field.type === 'yesno') {
            return (
              <YesNoToggle
                key={field.id}
                id={field.id}
                label={field.label}
                value={getIFBool(field.id)}
                onChange={v => setIF(field.id, v)}
              />
            )
          }
          if (field.type === 'checkboxes') {
            return (
              <CheckboxGroup
                key={field.id}
                id={field.id}
                label={field.label}
                options={field.options}
                value={getIFArr(field.id)}
                onChange={v => setIF(field.id, v)}
              />
            )
          }
          if (field.type === 'textarea') {
            return (
              <div key={field.id}>
                <label htmlFor={field.id} style={labelCss}>{field.label}</label>
                <textarea
                  id={field.id}
                  rows={3}
                  value={getIF(field.id)}
                  onChange={e => setIF(field.id, e.target.value)}
                  style={{ ...inputCss, resize: 'vertical', minHeight: '80px', borderBottom: '0.5px solid rgba(200,194,180,0.6)' }}
                  className="washi-form-input"
                />
              </div>
            )
          }
          return (
            <FieldInput
              key={field.id}
              id={field.id}
              label={field.label}
              type={field.type}
              placeholder={'placeholder' in field ? field.placeholder : undefined}
              value={getIF(field.id)}
              onChange={v => setIF(field.id, v)}
            />
          )
        })}

        <NavButtons
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      </div>
    )
  }

  function renderStep4() {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h2 style={{ fontFamily: 'var(--font-newsreader)', fontStyle: 'italic', fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 300, color: 'var(--on-surface)', marginBottom: '8px', lineHeight: 1.2 }}>
            Imágenes y marca
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 200, letterSpacing: '0.08em', color: 'rgba(28,28,24,0.45)' }}>
            Para diseñar tu web necesitamos conocer tu identidad visual.
          </p>
        </div>

        <YesNoToggle
          id="hasLogo" label="¿Tienes logo?"
          value={data.hasLogo}
          onChange={v => set('hasLogo', v)}
        />

        {data.hasLogo === true && (
          <div>
            <p style={labelCss}>Sube tu logo <span style={{ color: 'rgba(28,28,24,0.3)' }}>(SVG, PNG o JPG — máx. 5 MB)</span></p>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                border: '0.5px dashed rgba(200,194,180,0.6)',
                padding: '28px 20px',
                textAlign: 'center',
                cursor: 'pointer',
                background: 'var(--surface-container-low)',
                transition: 'border-color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(28,28,24,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,194,180,0.6)')}
            >
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', fontWeight: 200, letterSpacing: '0.1em', color: data.logoFile ? 'var(--on-tertiary-container)' : 'rgba(28,28,24,0.4)' }}>
                {data.logoFile ? `✓ ${data.logoFile.name}` : 'haz clic para seleccionar archivo'}
              </p>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".svg,.png,.jpg,.jpeg"
              style={{ display: 'none' }}
              onChange={e => {
                const f = e.target.files?.[0]
                if (f && f.size <= 5 * 1024 * 1024) set('logoFile', f)
              }}
            />
          </div>
        )}

        <YesNoToggle
          id="hasPhotos" label="¿Tienes fotos del negocio?"
          value={data.hasPhotos}
          onChange={v => set('hasPhotos', v)}
        />

        {data.hasPhotos === true && (
          <div
            style={{
              background: 'var(--surface-container-low)',
              border: '0.5px solid rgba(197,236,210,0.5)',
              padding: '16px 20px',
            }}
          >
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 200, letterSpacing: '0.05em', color: 'rgba(28,28,24,0.6)', lineHeight: 1.7 }}>
              Perfecto. Te pediremos las fotos por email una vez revisemos tu solicitud.
            </p>
          </div>
        )}

        <FieldInput
          id="brandColors" label="Colores de tu marca (opcional)"
          placeholder="ej. Azul marino y dorado"
          value={data.brandColors}
          onChange={v => set('brandColors', v)}
        />

        <div>
          <p style={labelCss}>Estilo que te gusta <span style={{ color: 'rgba(28,28,24,0.3)' }}>(elige hasta 2)</span></p>
          <div className="flex flex-wrap gap-2">
            {STYLE_OPTIONS.map(opt => {
              const sel = data.stylePrefs.includes(opt)
              const maxReached = data.stylePrefs.length >= 2 && !sel
              return (
                <button
                  key={opt}
                  type="button"
                  disabled={maxReached}
                  onClick={() => {
                    if (maxReached) return
                    set('stylePrefs', sel
                      ? data.stylePrefs.filter(s => s !== opt)
                      : [...data.stylePrefs, opt])
                  }}
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '10px',
                    fontWeight: 200,
                    letterSpacing: '0.15em',
                    padding: '6px 14px',
                    border: sel ? '0.5px solid var(--on-surface)' : '0.5px solid rgba(200,194,180,0.4)',
                    background: sel ? 'var(--on-surface)' : 'transparent',
                    color: sel ? 'var(--surface)' : maxReached ? 'rgba(28,28,24,0.25)' : 'rgba(28,28,24,0.6)',
                    cursor: maxReached ? 'not-allowed' : 'pointer',
                    opacity: maxReached ? 0.5 : 1,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {opt.toLowerCase()}
                </button>
              )
            })}
          </div>
        </div>

        <NavButtons
          onBack={() => setStep(3)}
          onNext={() => setStep(5)}
        />
      </div>
    )
  }

  function renderStep5() {
    const errs = Object.keys(errors).length > 0

    // Build summary rows
    const industryLabel = data.industry ? INDUSTRY_LABELS[data.industry] : ''
    const extraFields = data.industry ? INDUSTRY_FIELDS[data.industry] : []

    function formatIFValue(field: FieldDef): string {
      if (field.type === 'yesno') {
        const v = getIFBool(field.id)
        return v === null ? '' : v ? 'Sí' : 'No'
      }
      if (field.type === 'checkboxes') return getIFArr(field.id).join(', ')
      return getIF(field.id)
    }

    return (
      <div className="flex flex-col gap-8">
        <div>
          <h2 style={{ fontFamily: 'var(--font-newsreader)', fontStyle: 'italic', fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 300, color: 'var(--on-surface)', marginBottom: '8px', lineHeight: 1.2 }}>
            Confirma y envía
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 200, letterSpacing: '0.08em', color: 'rgba(28,28,24,0.45)' }}>
            Revisa que todo esté bien antes de enviarnos tu solicitud.
          </p>
        </div>

        {/* Summary */}
        <div
          style={{
            background: 'var(--surface-container-low)',
            border: '0.5px solid rgba(200,194,180,0.25)',
            padding: '28px 24px',
          }}
        >
          <div className="flex flex-col gap-4">
            <SummaryRow label="tipo de negocio" value={industryLabel} />
            <SummaryRow label="nombre" value={data.businessName} />
            <SummaryRow label="ciudad" value={data.city} />
            {data.phone && <SummaryRow label="teléfono" value={data.phone} />}
            <SummaryRow label="email" value={data.email} />
            {data.preferredContact && (
              <SummaryRow
                label="contacto preferido"
                value={data.preferredContact === 'whatsapp' ? `WhatsApp${data.whatsappNumber ? ` (${data.whatsappNumber})` : ''}` : data.preferredContact === 'email' ? 'Email' : 'Teléfono'}
              />
            )}
            {data.hasWebsite !== null && (
              <SummaryRow label="web actual" value={data.hasWebsite ? (data.websiteUrl || 'Sí') : 'No'} />
            )}
            {data.description && <SummaryRow label="descripción" value={data.description} />}
            {data.openingHours && <SummaryRow label="horario" value={data.openingHours} />}
            {extraFields.map(f => {
              const v = formatIFValue(f)
              return v ? <SummaryRow key={f.id} label={f.label.toLowerCase()} value={v} /> : null
            })}
            {data.hasLogo !== null && <SummaryRow label="logo" value={data.hasLogo ? (data.logoFile ? data.logoFile.name : 'Sí') : 'No'} />}
            {data.hasPhotos !== null && <SummaryRow label="fotos" value={data.hasPhotos ? 'Sí' : 'No'} />}
            {data.brandColors && <SummaryRow label="colores de marca" value={data.brandColors} />}
            {data.stylePrefs.length > 0 && <SummaryRow label="estilo preferido" value={data.stylePrefs.join(', ')} />}
          </div>
        </div>

        {/* Extra info */}
        <div>
          <label htmlFor="extraInfo" style={labelCss}>¿Algo más que debamos saber? (opcional)</label>
          <textarea
            id="extraInfo"
            rows={3}
            value={data.extraInfo}
            onChange={e => set('extraInfo', e.target.value)}
            style={{ ...inputCss, resize: 'vertical', minHeight: '80px', borderBottom: '0.5px solid rgba(200,194,180,0.6)' }}
            className="washi-form-input"
          />
        </div>

        {/* RGPD */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.rgpd}
              onChange={e => {
                set('rgpd', e.target.checked)
                if (errors.rgpd) setErrors(prev => { const n = { ...prev }; delete n.rgpd; return n })
              }}
              style={{ marginTop: '3px', accentColor: 'var(--primary)', width: '14px', height: '14px', flexShrink: 0 }}
              aria-required="true"
              aria-invalid={!!errors.rgpd}
            />
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', fontWeight: 200, letterSpacing: '0.04em', color: 'rgba(28,28,24,0.5)', lineHeight: 1.7 }}>
              He leído y acepto la{' '}
              <a
                href="/politica-privacidad"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--on-tertiary-container)', textDecoration: 'none', borderBottom: '0.5px solid var(--tertiary-fixed)' }}
              >
                Política de privacidad
              </a>
            </span>
          </label>
          {errors.rgpd && <p style={errorCss} role="alert">{errors.rgpd}</p>}
        </div>

        {submitError && (
          <p style={{ ...errorCss, fontSize: '12px' }} role="alert">
            {submitError}{' '}
            <a href="https://wa.me/34600000000" style={{ color: 'var(--on-tertiary-container)', borderBottom: '0.5px solid var(--tertiary-fixed)', textDecoration: 'none' }}>
              Escríbenos por WhatsApp
            </a>.
          </p>
        )}

        <NavButtons
          onBack={() => setStep(4)}
          onNext={handleSubmit}
          nextLabel="enviar mi solicitud →"
          nextDisabled={!data.rgpd}
          submitting={submitting}
        />

        {!errs && <p style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 200, letterSpacing: '0.15em', color: 'rgba(28,28,24,0.3)', textAlign: 'center' }}>
          * Campos obligatorios
        </p>}
      </div>
    )
  }

  async function handleSubmit() {
    const errs = validateStep5()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setSubmitting(true)
    setSubmitError('')

    try {
      const payload = {
        industry: data.industry,
        businessName: data.businessName,
        city: data.city,
        phone: data.phone,
        email: data.email,
        preferredContact: data.preferredContact,
        whatsappNumber: data.whatsappNumber,
        hasWebsite: data.hasWebsite,
        websiteUrl: data.websiteUrl,
        description: data.description,
        openingHours: data.openingHours,
        industryFields: data.industryFields,
        hasLogo: data.hasLogo,
        hasPhotos: data.hasPhotos,
        brandColors: data.brandColors,
        stylePrefs: data.stylePrefs,
        extraInfo: data.extraInfo,
      }

      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push(`/gracias?nombre=${encodeURIComponent(data.businessName)}`)
      } else {
        const body = await res.json().catch(() => ({}))
        setSubmitError(body.error || 'Error al enviar la solicitud. Por favor, inténtalo de nuevo.')
        setSubmitting(false)
      }
    } catch {
      setSubmitError('Error de conexión. Por favor, inténtalo de nuevo.')
      setSubmitting(false)
    }
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  const TOTAL_STEPS = 5
  const stepRenderers = [renderStep1, renderStep2, renderStep3, renderStep4, renderStep5]

  return (
    <>
      <style>{`
        .washi-form-input:focus {
          border-bottom-color: var(--on-tertiary-container) !important;
        }
      `}</style>

      <main style={{ minHeight: '100vh', background: 'var(--surface)', paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 24px' }}>

          {/* Logo back link */}
          <a
            href="/"
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontStyle: 'italic',
              fontSize: '16px',
              fontWeight: 300,
              color: 'var(--on-surface)',
              textDecoration: 'none',
              display: 'inline-block',
              marginBottom: '48px',
              letterSpacing: '-0.01em',
            }}
          >
            yele
          </a>

          <StepIndicator current={step} total={TOTAL_STEPS} />

          {/* Step content — fade transition */}
          <div
            key={step}
            style={{
              animation: 'step_fadein 0.35s cubic-bezier(0.16,1,0.3,1) both',
            }}
          >
            {stepRenderers[step - 1]?.()}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes step_fadein {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
