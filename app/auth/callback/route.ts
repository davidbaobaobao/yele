import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

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

    const { data: { session } } = await supabase.auth.getSession()

    if (session?.user?.id) {
      // Use service role to bypass RLS when checking clients table
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
      )

      const { data: client } = await supabaseAdmin
        .from('clients')
        .select('id')
        .eq('user_id', session.user.id)
        .single()

      const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? 'https://app.yele.design'

      if (client) {
        // Returning client — send to dashboard
        return NextResponse.redirect(new URL('/dashboard', dashboardUrl))
      } else {
        // New user — send to intake form
        return NextResponse.redirect(new URL('/empezar', request.url))
      }
    }
  }

  // Fallback — send to intake form
  return NextResponse.redirect(new URL('/empezar', request.url))
}
