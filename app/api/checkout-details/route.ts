import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'session_id requerido.' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    })

    const planName = session.line_items?.data[0]?.description ?? null
    const billingPeriod = session.metadata?.billingPeriod ?? 'monthly'

    return NextResponse.json({
      planName,
      billingPeriod,
      amount: session.amount_total,
      currency: session.currency,
    })
  } catch (err) {
    console.error('[checkout-details] Stripe error:', err)
    return NextResponse.json({ error: 'No se pudo recuperar la sesión.' }, { status: 500 })
  }
}
