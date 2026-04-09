'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'

const BASE_URL =
  typeof window !== 'undefined'
    ? window.location.origin
    : 'http://localhost:3001'

function getSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

export default function RegistroPage() {
  const supabase = getSupabaseBrowser()

  const [email, setEmail]           = useState('')
  const [emailSent, setEmailSent]   = useState(false)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState<string | null>(null)

  async function handleGoogle() {
    setError(null)
    setLoading(true)
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${BASE_URL}/auth/callback` },
    })
    if (err) {
      setError('No se pudo conectar con Google. Inténtalo de nuevo.')
      setLoading(false)
    }
  }

  async function handleEmailLink() {
    setError(null)
    if (!email.trim() || !email.includes('@')) {
      setError('Introduce un email válido.')
      return
    }
    setLoading(true)
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${BASE_URL}/auth/callback` },
    })
    setLoading(false)
    if (err) {
      setError('No se pudo enviar el enlace. Inténtalo de nuevo.')
    } else {
      setEmailSent(true)
    }
  }

  return (
    <>
      <style>{`
        @keyframes reg_fadein {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .reg-card {
          animation: reg_fadein 0.4s ease forwards;
        }
        .reg-input {
          width: 100%;
          padding: 12px 0;
          border: none;
          border-bottom: 1px solid rgba(28,28,24,0.2);
          background: transparent;
          font-family: var(--font-inter), sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: var(--on-surface);
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .reg-input:focus {
          border-bottom-color: var(--on-tertiary-container);
        }
        .reg-input::placeholder {
          color: rgba(28,28,24,0.4);
          font-weight: 200;
        }
        .btn-google {
          width: 100%;
          padding: 14px 20px;
          background: var(--on-surface);
          color: var(--surface);
          border: none;
          cursor: pointer;
          font-family: var(--font-inter), sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.2s;
        }
        .btn-google:hover:not(:disabled) {
          background: var(--on-tertiary-container);
        }
        .btn-google:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn-email {
          width: 100%;
          padding: 13px 20px;
          background: transparent;
          color: var(--on-surface);
          border: 1px solid rgba(28,28,24,0.25);
          cursor: pointer;
          font-family: var(--font-inter), sans-serif;
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.02em;
          transition: border-color 0.2s, background 0.2s;
          margin-top: 8px;
        }
        .btn-email:hover:not(:disabled) {
          border-color: var(--on-tertiary-container);
          background: rgba(197,236,210,0.15);
        }
        .btn-email:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}>

        {/* Back to home */}
        <a href="/" style={{
          position: 'fixed',
          top: 24,
          left: 32,
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: 11,
          fontWeight: 300,
          color: 'rgba(28,28,24,0.45)',
          textDecoration: 'none',
          letterSpacing: '0.08em',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--on-tertiary-container)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(28,28,24,0.45)')}
        >
          ← yele
        </a>

        <div className="reg-card" style={{ width: '100%', maxWidth: 420 }}>

          {/* Step indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 36,
          }}>
            {/* Steps */}
            {[1, 2, 3].map(n => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 22,
                  height: 22,
                  background: n === 1 ? 'var(--on-surface)' : 'transparent',
                  border: `1px solid ${n === 1 ? 'var(--on-surface)' : 'rgba(28,28,24,0.2)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 10,
                    fontWeight: n === 1 ? 500 : 300,
                    color: n === 1 ? 'var(--surface)' : 'rgba(28,28,24,0.35)',
                  }}>
                    {n}
                  </span>
                </div>
                {n < 3 && (
                  <div style={{
                    width: 24,
                    height: 0.5,
                    background: 'rgba(28,28,24,0.15)',
                  }} />
                )}
              </div>
            ))}
            <span style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 10,
              fontWeight: 300,
              color: 'rgba(28,28,24,0.5)',
              letterSpacing: '0.06em',
              marginLeft: 4,
            }}>
              paso 1 de 3 — crea tu cuenta
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-newsreader), Georgia, serif',
            fontSize: 'clamp(26px, 5vw, 34px)',
            fontWeight: 300,
            color: 'var(--on-surface)',
            lineHeight: 1.2,
            margin: '0 0 12px',
          }}>
            Primero, crea tu cuenta
          </h1>

          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 13,
            fontWeight: 300,
            color: 'rgba(28,28,24,0.6)',
            lineHeight: 1.6,
            margin: '0 0 36px',
          }}>
            La necesitarás para acceder a tu panel y gestionar tu web cuando esté lista.
          </p>

          {emailSent ? (
            /* ── Success state ── */
            <div style={{
              padding: '20px 20px',
              background: 'var(--tertiary-fixed)',
              borderLeft: '2px solid var(--on-tertiary-container)',
            }}>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 13,
                fontWeight: 400,
                color: 'var(--on-surface)',
                margin: '0 0 4px',
              }}>
                Revisa tu correo
              </p>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 12,
                fontWeight: 300,
                color: 'rgba(28,28,24,0.65)',
                margin: 0,
                lineHeight: 1.5,
              }}>
                Te hemos enviado un enlace de acceso a <strong>{email}</strong>. Haz clic en él para continuar con el formulario.
              </p>
            </div>
          ) : (
            <>
              {/* Error */}
              {error && (
                <p style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 12,
                  fontWeight: 300,
                  color: '#c0392b',
                  margin: '0 0 16px',
                }}>
                  {error}
                </p>
              )}

              {/* Google button */}
              <button
                type="button"
                className="btn-google"
                onClick={handleGoogle}
                disabled={loading}
              >
                <GoogleIcon />
                Continuar con Google
              </button>

              {/* Divider */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                margin: '24px 0',
              }}>
                <div style={{ flex: 1, height: '0.5px', background: 'rgba(28,28,24,0.15)' }} />
                <span style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 11,
                  fontWeight: 300,
                  color: 'rgba(28,28,24,0.4)',
                  letterSpacing: '0.06em',
                }}>
                  o
                </span>
                <div style={{ flex: 1, height: '0.5px', background: 'rgba(28,28,24,0.15)' }} />
              </div>

              {/* Email magic link */}
              <input
                className="reg-input"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleEmailLink()}
                disabled={loading}
              />

              <button
                type="button"
                className="btn-email"
                onClick={handleEmailLink}
                disabled={loading}
              >
                {loading ? 'enviando…' : 'enviar enlace de acceso'}
              </button>
            </>
          )}

          {/* Already have account */}
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 11,
            fontWeight: 300,
            color: 'rgba(28,28,24,0.45)',
            marginTop: 32,
            lineHeight: 1.5,
          }}>
            ¿Ya tienes cuenta?{' '}
            <a
              href="/empezar"
              style={{
                color: 'var(--on-tertiary-container)',
                textDecoration: 'none',
                borderBottom: '1px solid currentColor',
              }}
            >
              Accede aquí
            </a>
          </p>

        </div>
      </div>
    </>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}
