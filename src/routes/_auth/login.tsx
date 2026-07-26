import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../../lib/auth'

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate({ to: '/profile' })
    } catch {
      setError('Invalid email or password.')
    }
  }

  return (
    <>
      <h1 className="mb-1 text-2xl font-bold text-[var(--sea-ink)]">Sign in</h1>
      <p className="mb-6 text-sm text-[var(--sea-ink-soft)]">
        Enter your credentials to access your account.
      </p>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-[var(--sea-ink)]">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm text-[var(--sea-ink)] outline-none focus:border-[rgba(79,184,178,0.5)] focus:ring-2 focus:ring-[rgba(79,184,178,0.2)]"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-[var(--sea-ink)]">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm text-[var(--sea-ink)] outline-none focus:border-[rgba(79,184,178,0.5)] focus:ring-2 focus:ring-[rgba(79,184,178,0.2)]"
            placeholder="······"
          />
        </div>

        <div className="flex items-center justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-[rgba(79,184,178,0.9)] hover:text-[rgba(79,184,178,1)]"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-[rgba(79,184,178,0.9)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[rgba(79,184,178,1)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--sea-ink-soft)]">
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="font-medium text-[rgba(79,184,178,0.9)] hover:text-[rgba(79,184,178,1)]"
        >
          Create one
        </Link>
      </p>
    </>
  )
}
