import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const TABLE_LABELS: Record<string, string> = {
  catalog_items: 'carta / menú',
  services:      'servicios',
  listings:      'propiedades',
  team_members:  'equipo',
  testimonials:  'testimonios',
  faqs:          'preguntas frecuentes',
  offers:        'ofertas',
  gallery:       'galería',
}

const TYPE_ACTIONS: Record<string, string> = {
  INSERT: 'ha añadido un elemento en',
  UPDATE: 'ha modificado',
  DELETE: 'ha eliminado un elemento de',
}

export async function POST(req: Request) {
  // 1. Verify webhook secret
  const secret = req.headers.get('x-webhook-secret')
  if (!secret || secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await req.json()

    // 2. Extract fields
    const table     = payload.table     as string | undefined
    const type      = payload.type      as string | undefined
    const clientId  = payload.record?.client_id ?? payload.old_record?.client_id as string | undefined

    if (!clientId) {
      console.warn('[notify-change] No client_id in payload — skipping')
      return NextResponse.json({ ok: true })
    }

    // 3. Fetch client from Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    )

    const { data: client, error } = await supabase
      .from('clients')
      .select('business_name, email')
      .eq('id', clientId)
      .single()

    if (error || !client) {
      console.warn('[notify-change] Client not found:', clientId)
      return NextResponse.json({ ok: true })
    }

    // 4 & 5. Map table and type to Spanish labels
    const section = TABLE_LABELS[table ?? ''] ?? table ?? 'sección desconocida'
    const action  = TYPE_ACTIONS[type  ?? ''] ?? type  ?? 'ha modificado'

    const businessName = client.business_name ?? 'Cliente'

    const dateStr = new Date().toLocaleDateString('es-ES', {
      day:    'numeric',
      month:  'long',
      year:   'numeric',
      hour:   '2-digit',
      minute: '2-digit',
    })

    // 6. Send email via Resend
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey && process.env.STUDIO_EMAIL) {
      const resend = new Resend(resendKey)

      await resend.emails.send({
        from:    'info@yele.design',
        to:      process.env.STUDIO_EMAIL,
        subject: `Actualización — ${businessName}`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1c1c18;">
            <h2 style="font-size:20px;font-weight:400;margin-bottom:8px;">${businessName}</h2>
            <p style="font-size:15px;line-height:1.6;margin-bottom:16px;">
              ${businessName} ${action} su <strong>${section}</strong>.
            </p>
            <p style="font-size:14px;line-height:1.6;color:#555;margin-bottom:24px;">
              Los cambios se reflejarán en su web en menos de 60 segundos automáticamente.
            </p>
            <hr style="border:none;border-top:1px solid #e0ddd8;margin-bottom:20px;"/>
            <p style="color:#888;font-size:12px;line-height:1.8;">
              Sección: ${section}<br/>
              Cambio: ${type}<br/>
              Fecha: ${dateStr}
            </p>
          </div>
        `,
      })
    } else {
      console.warn('[notify-change] RESEND_API_KEY or STUDIO_EMAIL not set — skipping email')
    }
  } catch (err) {
    // 7. Always return 200 so Supabase does not retry
    console.error('[notify-change] Error:', err)
  }

  return NextResponse.json({ ok: true })
}
