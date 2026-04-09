import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'

// Use built-in Helvetica — no font registration needed
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1a1a1a',
    paddingTop: 40,
    paddingBottom: 48,
    paddingHorizontal: 48,
    lineHeight: 1.5,
  },
  // Header
  header: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 12,
  },
  headerTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 4,
  },
  headerMeta: {
    fontSize: 9,
    color: '#666666',
  },
  // Section
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    letterSpacing: 1.2,
    color: '#333333',
    backgroundColor: '#f0f0f0',
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginBottom: 8,
  },
  // Field row
  row: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingHorizontal: 6,
  },
  label: {
    fontFamily: 'Helvetica-Bold',
    width: 160,
    fontSize: 9,
    color: '#444444',
    flexShrink: 0,
  },
  value: {
    flex: 1,
    fontSize: 9,
    color: '#1a1a1a',
  },
  // Próximos pasos list
  stepsBlock: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: '#fafafa',
    borderLeftWidth: 2,
    borderLeftColor: '#cccccc',
    marginTop: 4,
  },
  stepLine: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 3,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 48,
    right: 48,
    borderTopWidth: 0.5,
    borderTopColor: '#dddddd',
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 8,
    color: '#aaaaaa',
  },
})

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value && value !== '0') return null
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionHeader}>{title}</Text>
}

function formatKey(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

export interface IntakePdfProps {
  clientId: string
  submittedAt: string
  businessName: string
  industry: string
  city: string
  phone?: string
  email: string
  preferredContact?: string
  whatsappNumber?: string
  description?: string
  openingHours?: string
  industryFields?: Record<string, unknown>
  hasLogo?: boolean
  hasPhotos?: boolean
  brandColors?: string
  stylePrefs?: string[]
  extraInfo?: string
  hasWebsite?: boolean
  websiteUrl?: string
}

export function IntakePdf(props: IntakePdfProps) {
  const {
    clientId,
    submittedAt,
    businessName,
    industry,
    city,
    phone,
    email,
    preferredContact,
    whatsappNumber,
    description,
    openingHours,
    industryFields,
    hasLogo,
    hasPhotos,
    brandColors,
    stylePrefs,
    extraInfo,
    hasWebsite,
    websiteUrl,
  } = props

  const contactLabel = preferredContact === 'whatsapp' ? 'WhatsApp'
    : preferredContact === 'email' ? 'Email'
    : preferredContact === 'telefono' ? 'Teléfono'
    : undefined

  const hasLogoLabel = hasLogo === true ? 'Sí' : hasLogo === false ? 'No' : undefined
  const hasPhotosLabel = hasPhotos === true ? 'Sí' : hasPhotos === false ? 'No' : undefined
  const hasWebsiteLabel = hasWebsite === true ? 'Sí' : hasWebsite === false ? 'No' : undefined

  // Flatten industry fields to string pairs
  const industryRows: [string, string][] = Object.entries(industryFields ?? {})
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => [formatKey(k), Array.isArray(v) ? (v as unknown[]).join(', ') : String(v)])

  const stylePrefsStr = stylePrefs && stylePrefs.length > 0 ? stylePrefs.join(', ') : undefined

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Nueva solicitud — {businessName}</Text>
          <Text style={styles.headerMeta}>Yele  ·  {submittedAt}</Text>
        </View>

        {/* 1. IDENTIFICACIÓN */}
        <View style={styles.section}>
          <SectionHeader title="1. IDENTIFICACIÓN" />
          <Field label="Nombre del negocio" value={businessName} />
          <Field label="Sector / Tipo de negocio" value={industry} />
          <Field label="Ciudad" value={city} />
          <Field label="Teléfono" value={phone || '—'} />
          <Field label="Email" value={email} />
          <Field label="Contacto preferido" value={contactLabel} />
          <Field label="WhatsApp" value={whatsappNumber} />
          <Field label="Tiene web actual" value={hasWebsiteLabel} />
          <Field label="URL web actual" value={websiteUrl} />
          <Field label="Client UUID" value={clientId} />
        </View>

        {/* 2. DESCRIPCIÓN */}
        <View style={styles.section}>
          <SectionHeader title="2. DESCRIPCIÓN" />
          <Field label="Descripción breve" value={description || '—'} />
          <Field label="Horario" value={openingHours || '—'} />
        </View>

        {/* 3. DETALLES DEL SECTOR */}
        {industryRows.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="3. DETALLES DEL SECTOR" />
            {industryRows.map(([k, v]) => (
              <Field key={k} label={k} value={v} />
            ))}
          </View>
        )}

        {/* 4. MARCA */}
        <View style={styles.section}>
          <SectionHeader title="4. MARCA" />
          <Field label="¿Tiene logo?" value={hasLogoLabel} />
          <Field label="¿Tiene fotos?" value={hasPhotosLabel} />
          <Field label="Colores de marca" value={brandColors} />
          <Field label="Estilo preferido" value={stylePrefsStr} />
        </View>

        {/* 5. NOTAS ADICIONALES */}
        <View style={styles.section}>
          <SectionHeader title="5. NOTAS ADICIONALES" />
          <View style={styles.row}>
            <Text style={styles.value}>{extraInfo || '—'}</Text>
          </View>
        </View>

        {/* 6. PRÓXIMOS PASOS */}
        <View style={styles.section}>
          <SectionHeader title="6. PRÓXIMOS PASOS" />
          <View style={styles.stepsBlock}>
            {[
              "1. Abrir vitrina-workflow-4.html",
              "2. Introducir los datos de este documento en Fase 1",
              "3. Generar BUILD.md, brand.md y MEDIA_LIST.md",
              "4. Crear carpeta del proyecto y ejecutar Claude Code",
              "5. Actualizar status del cliente a 'building' en Supabase",
            ].map((line, i) => (
              <Text key={i} style={styles.stepLine}>{line}</Text>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Yele — uso interno</Text>
          <Text style={styles.footerText}>{submittedAt}</Text>
        </View>
      </Page>
    </Document>
  )
}
