import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../../lib/auth'

export const Route = createFileRoute('/_auth/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const navigate = useNavigate()
  const { register, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    try {
      await register(name, email, password)
      navigate({ to: '/profile' })
    } catch {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <>
      <h1 className="mb-1 text-2xl font-bold text-[var(--sea-ink)]">Create account</h1>
      <p className="mb-6 text-sm text-[var(--sea-ink-soft)]">
        Fill in the details below to get started.
      </p>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-[var(--sea-ink)]">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm text-[var(--sea-ink)] outline-none focus:border-[rgba(79,184,178,0.5)] focus:ring-2 focus:ring-[rgba(79,184,178,0.2)]"
            placeholder="John Doe"
          />
        </div>

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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm text-[var(--sea-ink)] outline-none focus:border-[rgba(79,184,178,0.5)] focus:ring-2 focus:ring-[rgba(79,184,178,0.2)]"
            placeholder="······"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-[rgba(79,184,178,0.9)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[rgba(79,184,178,1)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--sea-ink-soft)]">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-[rgba(79,184,178,0.9)] hover:text-[rgba(79,184,178,1)]"
        >
          Sign in
        </Link>
      </p>
    </>
  )
}
