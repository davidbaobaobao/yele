import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  let body: {
    nombre: string
    email: string
    telefono?: string
    negocio?: string
    mensaje: string
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  const { nombre, email, telefono, negocio, mensaje } = body

  if (!nombre || !email || !mensaje) {
    return NextResponse.json({ error: 'Faltan campos obligatorios.' }, { status: 422 })
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: 'Email no válido.' }, { status: 422 })
  }

  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'hola@yele.design'

  try {
    await resend.emails.send({
      from: 'Yele Contacto <noreply@yele.design>',
      to: toEmail,
      replyTo: email,
      subject: `Nuevo mensaje de contacto — ${nombre}`,
      html: `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${telefono ? `<p><strong>Teléfono:</strong> ${telefono}</p>` : ''}
        ${negocio ? `<p><strong>Tipo de negocio:</strong> ${negocio}</p>` : ''}
        <hr />
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, '<br />')}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Resend error:', err)
    return NextResponse.json({ error: 'Error al enviar el mensaje.' }, { status: 500 })
  }
}
