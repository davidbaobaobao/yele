import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://app.yele.design'

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
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

    await supabase.auth.exchangeCodeForSession(code)

    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    console.log('[auth/callback] Session user id:', session?.user?.id)
    console.log('[auth/callback] Session error:', sessionError)

    if (session?.user?.id) {
      // Use service role to bypass RLS — anon key cannot read other users' rows
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
      )

      // maybeSingle() returns null cleanly when no row exists.
      // single() throws a PostgREST error on zero rows, which was silently
      // bypassing the else branch and sending everyone to the dashboard.
      const { data: client, error: clientError } = await supabaseAdmin
        .from('clients')
        .select('id')
        .eq('user_id', session.user.id)
        .maybeSingle()

      console.log('[auth/callback] Client found:', client)
      console.log('[auth/callback] Client query error:', clientError)

      if (client) {
        console.log('[auth/callback] Returning user — redirecting to dashboard')
        return NextResponse.redirect(new URL('/dashboard', dashboardUrl))
      } else {
        console.log('[auth/callback] New user — redirecting to /empezar')
        return NextResponse.redirect(new URL('/empezar', requestUrl.origin))
      }
    }
  }

  console.log('[auth/callback] No code or no session — redirecting to /empezar')
  return NextResponse.redirect(new URL('/empezar', requestUrl.origin))
}
