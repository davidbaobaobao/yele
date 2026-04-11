import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Price IDs resolved server-side — never exposed to the client
const PRICE_IDS: Record<string, Record<string, string | undefined>> = {
  basica:      { monthly: process.env.STRIPE_PRICE_BASICA_MONTHLY,      annual: process.env.STRIPE_PRICE_BASICA_ANNUAL },
  profesional: { monthly: process.env.STRIPE_PRICE_PROFESIONAL_MONTHLY, annual: process.env.STRIPE_PRICE_PROFESIONAL_ANNUAL },
  avanzada:    { monthly: process.env.STRIPE_PRICE_AVANZADA_MONTHLY,    annual: process.env.STRIPE_PRICE_AVANZADA_ANNUAL },
}

export async function POST(request: Request) {
  let body: {
    planId: string
    billingPeriod: 'monthly' | 'annual'
    clientId: string
    promoCode?: string
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  const { planId, billingPeriod, clientId, promoCode } = body

  // Resolve price ID from server-side env vars
  const priceId = PRICE_IDS[planId]?.[billingPeriod]

  console.log('[create-checkout] planId:', planId, '| billingPeriod:', billingPeriod)
  console.log('[create-checkout] resolved priceId:', priceId ?? '(undefined — check Vercel env vars)')
  console.log('[create-checkout] clientId:', clientId)
  console.log('[create-checkout] promoCode:', promoCode ?? null)

  if (!priceId) {
    console.error(`[create-checkout] Missing env var: STRIPE_PRICE_${planId.toUpperCase()}_${billingPeriod.toUpperCase()}`)
    return NextResponse.json(
      { error: `Plan no configurado (${planId} ${billingPeriod}). Contacta con nosotros en info@yele.design.` },
      { status: 500 }
    )
  }

  if (!clientId) {
    return NextResponse.json({ error: 'Falta client_id.' }, { status: 422 })
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

  // Apply promo code if provided — disable allow_promotion_codes when using discounts
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
        console.log('[create-checkout] Promo code applied:', promotionCodes.data[0].id)
      } else {
        console.warn('[create-checkout] Promo code not found or inactive:', promoCode)
      }
    } catch (e) {
      console.error('[create-checkout] Promo code lookup error:', e)
    }
  }

  try {
    const session = await stripe.checkout.sessions.create(sessionParams)
    console.log('[create-checkout] Session created:', session.id)
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[create-checkout] Stripe session error:', err)
    return NextResponse.json({ error: 'Error al crear la sesión de pago.' }, { status: 500 })
  }
}
