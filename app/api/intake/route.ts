import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { renderToBuffer } from '@react-pdf/renderer'
import { Resend } from 'resend'
import React from 'react'
import { IntakePdf, IntakePdfProps } from '@/lib/intakePdf'

// Server-side only — uses service_role key, never expose to client
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  })
}

function generateSlug(name: string): string {
  const base = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9\s-]/g, '')    // remove special chars
    .trim()
    .replace(/\s+/g, '-')            // spaces to hyphens
  const suffix = Math.floor(1000 + Math.random() * 9000) // 4 random digits
  return `${base}-${suffix}`
}

export async function POST(req: Request) {
  let body: Record<string, unknown>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  const {
    industry,
    businessName,
    city,
    phone,
    email,
    description,
    openingHours,
    industryFields,
    preferredContact,
    whatsappNumber,
    hasLogo,
    hasPhotos,
    brandColors,
    stylePrefs,
    extraInfo,
    hasWebsite,
    websiteUrl,
  } = body as {
    industry: string
    businessName: string
    city: string
    phone?: string
    email: string
    description?: string
    openingHours?: string
    industryFields?: Record<string, unknown>
    preferredContact?: string
    whatsappNumber?: string
    hasLogo?: boolean
    hasPhotos?: boolean
    brandColors?: string
    stylePrefs?: string[]
    extraInfo?: string
    hasWebsite?: boolean
    websiteUrl?: string
  }

  // Basic validation
  if (!businessName || !city || !email) {
    return NextResponse.json(
      { error: 'Faltan campos obligatorios: nombre, ciudad o email.' },
      { status: 422 }
    )
  }

  const slug = generateSlug(businessName)

  // Get the logged-in user's id (if any) from the request session
  let userId: string | null = null
  try {
    const cookieStore = cookies()
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )
    const { data: { session } } = await supabaseAuth.auth.getSession()
    userId = session?.user?.id ?? null
  } catch {
    // Non-fatal — proceed without user_id
  }

  // Aggregate all extra data into intake_data JSONB
  const intakeData = {
    preferred_contact: preferredContact ?? null,
    whatsapp_number:   whatsappNumber ?? '',
    industry_fields: industryFields ?? {},
    has_logo: hasLogo,
    has_photos: hasPhotos,
    brand_colors: brandColors ?? '',
    style_prefs: stylePrefs ?? [],
    extra_info: extraInfo ?? '',
    has_website: hasWebsite,
    website_url: websiteUrl ?? '',
  }

  try {
    const supabase = getSupabase()

    const { data: inserted, error } = await supabase
      .from('clients')
      .insert({
        business_name:  businessName,
        industry_type:  industry,
        city,
        phone:          phone ?? '',
        email,
        description:    description ?? '',
        opening_hours:  openingHours ? { horario: openingHours } : {},
        status:         'intake_pending',
        plan:           'basica',
        slug,
        intake_data:    intakeData,
        user_id:        userId,
      })
      .select('id')
      .single()

    if (error) {
      console.error('[intake] Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Error al guardar la solicitud. Por favor, inténtalo de nuevo.' },
        { status: 500 }
      )
    }

    const clientId: string = inserted?.id ?? 'desconocido'

    // Fire-and-forget email — don't block the 201 response on it
    sendIntakeEmail({
      clientId,
      businessName,
      industry,
      city,
      phone,
      email,
      preferredContact,
      whatsappNumber,
      description,
      openingHours,
      industryFields: industryFields ?? {},
      hasLogo,
      hasPhotos,
      brandColors,
      stylePrefs,
      extraInfo,
      hasWebsite,
      websiteUrl,
    }).catch(err => console.error('[intake] Email send error:', err))

    return NextResponse.json({ ok: true, slug }, { status: 201 })
  } catch (err) {
    console.error('[intake] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Error del servidor. Por favor, inténtalo de nuevo.' },
      { status: 500 }
    )
  }
}

async function sendIntakeEmail(params: {
  clientId: string
  businessName: string
  industry: string
  city: string
  phone?: string
  email: string
  preferredContact?: string
  whatsappNumber?: string
  description?: string
  openingHours?: string
  industryFields: Record<string, unknown>
  hasLogo?: boolean
  hasPhotos?: boolean
  brandColors?: string
  stylePrefs?: string[]
  extraInfo?: string
  hasWebsite?: boolean
  websiteUrl?: string
}) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.warn('[intake] RESEND_API_KEY not set — skipping email')
    return
  }

  const submittedAt = new Date().toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid',
    dateStyle: 'long',
    timeStyle: 'short',
  })

  const pdfProps: IntakePdfProps = { ...params, submittedAt }
  const doc = React.createElement(IntakePdf, pdfProps)
  // renderToBuffer expects DocumentProps; cast through unknown to satisfy TS
  const pdfBuffer = await renderToBuffer(doc as unknown as Parameters<typeof renderToBuffer>[0])

  const resend = new Resend(resendKey)

  await resend.emails.send({
    from: 'info@yele.design',
    to: 'davidbaobaobao@gmail.com',
    subject: `Nueva solicitud — ${params.businessName} (${params.city})`,
    text: 'Nueva solicitud recibida. Adjunto encontrarás el PDF con toda la información del cliente.',
    attachments: [
      {
        filename: `solicitud-${params.businessName.toLowerCase().replace(/\s+/g, '-')}.pdf`,
        content: pdfBuffer,
      },
    ],
  })
}
