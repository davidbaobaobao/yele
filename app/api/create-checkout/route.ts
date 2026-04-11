import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  let body: {
    priceId: string
    clientId: string
    promoCode?: string
    billingPeriod: 'monthly' | 'annual'
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  const { priceId, clientId, promoCode, billingPeriod } = body

  if (!priceId || !clientId) {
    return NextResponse.json({ error: 'Faltan parámetros.' }, { status: 422 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yele.design'

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${siteUrl}/bienvenido?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/elegir-plan?client_id=${clientId}`,
    metadata: { clientId, billingPeriod },
    subscription_data: {
      metadata: { clientId, billingPeriod },
    },
    locale: 'es',
    allow_promotion_codes: true,
  }

  // Apply promo code if provided — overrides allow_promotion_codes
  if (promoCode) {
    try {
      const promotionCodes = await stripe.promotionCodes.list({
        code: promoCode,
        active: true,
        limit: 1,
      })
      if (promotionCodes.data.length > 0) {
        sessionParams.discounts = [{ promotion_code: promotionCodes.data[0].id }]
        delete sessionParams.allow_promotion_codes
      }
    } catch (e) {
      console.error('[create-checkout] Promo code error:', e)
    }
  }

  try {
    const session = await stripe.checkout.sessions.create(sessionParams)
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[create-checkout] Stripe error:', err)
    return NextResponse.json({ error: 'Error al crear la sesión de pago.' }, { status: 500 })
  }
}
