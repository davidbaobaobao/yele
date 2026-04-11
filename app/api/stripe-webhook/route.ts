import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
)

// Next.js App Router route handlers receive the raw Request — body is not pre-parsed
export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('[stripe-webhook] Signature verification failed:', err)
    return new Response('Webhook signature error', { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const clientId = session.metadata?.clientId
      const billingPeriod = session.metadata?.billingPeriod

      if (clientId) {
        // Retrieve line items to determine which plan was purchased
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
        const priceId = lineItems.data[0]?.price?.id

        let plan = 'basica'
        if (
          priceId === process.env.STRIPE_PRICE_PROFESIONAL_MONTHLY ||
          priceId === process.env.STRIPE_PRICE_PROFESIONAL_ANNUAL
        ) {
          plan = 'profesional'
        } else if (
          priceId === process.env.STRIPE_PRICE_AVANZADA_MONTHLY ||
          priceId === process.env.STRIPE_PRICE_AVANZADA_ANNUAL
        ) {
          plan = 'avanzada'
        }

        console.log(`[stripe-webhook] checkout.session.completed — client ${clientId}, plan ${plan}, billing ${billingPeriod}`)

        await supabaseAdmin
          .from('clients')
          .update({
            plan,
            status: 'intake_pending',
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            subscription_active: true,
          })
          .eq('id', clientId)
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription
      const clientId = subscription.metadata?.clientId

      if (clientId) {
        console.log(`[stripe-webhook] subscription.deleted — client ${clientId}`)
        await supabaseAdmin
          .from('clients')
          .update({ subscription_active: false, status: 'paused' })
          .eq('id', clientId)
      }
    }

    if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription
      const clientId = subscription.metadata?.clientId

      if (clientId) {
        const active = subscription.status === 'active' || subscription.status === 'trialing'
        console.log(`[stripe-webhook] subscription.updated — client ${clientId}, active ${active}`)
        await supabaseAdmin
          .from('clients')
          .update({ subscription_active: active })
          .eq('id', clientId)
      }
    }
  } catch (err) {
    console.error('[stripe-webhook] Handler error:', err)
    // Return 200 so Stripe doesn't retry — log the error for investigation
  }

  return new Response('OK', { status: 200 })
}
