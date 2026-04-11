import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  // Default destination — new users always go to the intake form
  const empezarResponse = NextResponse.redirect(new URL('/empezar', requestUrl.origin))

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll() },
          // Write session cookies onto the redirect response so the browser
          // receives them — without this the middleware sees no session
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            cookiesToSet.forEach(({ name, value, options }) =>
              empezarResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const { data: { session } } = await supabase.auth.getSession()

      if (session?.user?.id) {
        // Service role bypasses RLS to check the clients table
        const supabaseAdmin = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
          { auth: { persistSession: false } }
        )

        // maybeSingle() returns null cleanly on zero rows
        const { data: client } = await supabaseAdmin
          .from('clients')
          .select('id')
          .eq('user_id', session.user.id)
          .maybeSingle()

        if (client) {
          // Existing client — show the warning page so they click Ingresar themselves
          const warningResponse = NextResponse.redirect(
            new URL('/ya-eres-cliente', requestUrl.origin)
          )
          // Copy session cookies to the warning redirect too
          empezarResponse.cookies.getAll().forEach(c =>
            warningResponse.cookies.set(c.name, c.value)
          )
          return warningResponse
        }
      }
    }
  }

  // New user or any error → intake form
  return empezarResponse
}
