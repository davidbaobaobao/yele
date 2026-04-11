import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://app.yele.design'

  if (code) {
    // Build the default redirect response first so we can write cookies onto it.
    // This is critical: NextResponse.redirect() creates a fresh response with no
    // cookies. We must use the SAME response object that the supabase client writes
    // its session cookies to, otherwise the browser arrives at /empezar with no
    // session and the middleware bounces the user back to /registro.
    const redirectResponse = NextResponse.redirect(new URL('/empezar', requestUrl.origin))

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          // Read from the incoming request
          getAll() { return request.cookies.getAll() },
          // Write to both the request (for getSession() below) AND the redirect
          // response so the session cookie is sent to the browser
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            cookiesToSet.forEach(({ name, value, options }) =>
              redirectResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    console.log('[auth/callback] exchangeCodeForSession error:', exchangeError)

    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    console.log('[auth/callback] session user id:', session?.user?.id)
    console.log('[auth/callback] session error:', sessionError)

    if (session?.user?.id) {
      // Service role bypasses RLS for the clients table check
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
      )

      // maybeSingle() returns null cleanly on zero rows.
      // single() throws PGRST116 on zero rows which was silently
      // bypassing the routing logic.
      const { data: client, error: clientError } = await supabaseAdmin
        .from('clients')
        .select('id')
        .eq('user_id', session.user.id)
        .maybeSingle()

      console.log('[auth/callback] client found:', client)
      console.log('[auth/callback] client query error:', clientError)

      if (client) {
        // Returning user — copy session cookies to a new dashboard redirect
        console.log('[auth/callback] returning user → dashboard')
        const dashRedirect = NextResponse.redirect(new URL('/dashboard', dashboardUrl))
        redirectResponse.cookies.getAll().forEach(c => dashRedirect.cookies.set(c.name, c.value))
        return dashRedirect
      }

      // New user — /empezar redirect already set, cookies already on redirectResponse
      console.log('[auth/callback] new user → /empezar')
      return redirectResponse
    }
  }

  console.log('[auth/callback] no code or no session → /empezar')
  return NextResponse.redirect(new URL('/empezar', requestUrl.origin))
}
