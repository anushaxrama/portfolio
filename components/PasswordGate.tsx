'use client'

import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'portfolio-password-gate'

function hashPassword(value: string) {
  let hash = 7

  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  }

  return hash.toString(16)
}

type PasswordGateProps = {
  children: ReactNode
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const sitePassword = process.env.NEXT_PUBLIC_PORTFOLIO_PASSWORD ?? ''
  const passwordHash = useMemo(
    () => (sitePassword ? hashPassword(sitePassword) : ''),
    [sitePassword]
  )

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (!passwordHash) {
      return
    }

    const storedHash = window.localStorage.getItem(STORAGE_KEY)

    if (storedHash === passwordHash) {
      setIsAuthenticated(true)
    }
  }, [passwordHash])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!sitePassword) {
      setError('Add NEXT_PUBLIC_PORTFOLIO_PASSWORD to .env.local first.')
      return
    }

    if (password === sitePassword) {
      window.localStorage.setItem(STORAGE_KEY, passwordHash)
      setIsAuthenticated(true)
      setError('')
      setPassword('')
      return
    }

    setError('Incorrect password.')
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-12 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_42%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.08),transparent_35%)]" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-white/50">
          Private Access
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Enter password to view the site
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/65">
          This portfolio is currently protected behind a password gate.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                if (error) {
                  setError('')
                }
              }}
              autoComplete="current-password"
              placeholder="Enter password"
              className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-base text-white outline-none transition focus:border-white/40"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl border border-white/20 bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Unlock portfolio
          </button>
        </form>

        {error ? (
          <p className="mt-4 text-sm text-red-300">{error}</p>
        ) : null}

        {!sitePassword ? (
          <p className="mt-4 text-sm leading-6 text-white/55">
            Set <code className="rounded bg-white/10 px-1.5 py-0.5">NEXT_PUBLIC_PORTFOLIO_PASSWORD</code>{' '}
            in <code className="rounded bg-white/10 px-1.5 py-0.5">.env.local</code>{' '}
            and restart the app.
          </p>
        ) : null}
      </div>
    </div>
  )
}
