import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../../lib/auth'

export const Route = createFileRoute('/_auth/reset-password')({
  validateSearch: (search: Record<string, unknown>) => ({
    token: (search.token as string) || '',
  }),
  component: ResetPasswordPage,
})

function ResetPasswordPage() {
  const navigate = useNavigate()
  const { token } = Route.useSearch()
  const { resetPassword, isLoading } = useAuth()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    try {
      await resetPassword(token, password)
      navigate({ to: '/login' })
    } catch {
      setError('Reset failed. The link may have expired.')
    }
  }

  return (
    <>
      <h1 className="mb-1 text-2xl font-bold text-[var(--sea-ink)]">Set new password</h1>
      <p className="mb-6 text-sm text-[var(--sea-ink-soft)]">
        Choose a new password for your account.
      </p>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {!token && (
        <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">
          Invalid or missing reset token.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-[var(--sea-ink)]">
            New password
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

        <div>
          <label htmlFor="confirm" className="mb-1 block text-sm font-medium text-[var(--sea-ink)]">
            Confirm password
          </label>
          <input
            id="confirm"
            type="password"
            required
            minLength={6}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm text-[var(--sea-ink)] outline-none focus:border-[rgba(79,184,178,0.5)] focus:ring-2 focus:ring-[rgba(79,184,178,0.2)]"
            placeholder="······"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !token}
          className="w-full rounded-xl bg-[rgba(79,184,178,0.9)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[rgba(79,184,178,1)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Resetting…' : 'Reset password'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--sea-ink-soft)]">
        <Link
          to="/login"
          className="font-medium text-[rgba(79,184,178,0.9)] hover:text-[rgba(79,184,178,1)]"
        >
          Back to sign in
        </Link>
      </p>
    </>
  )
}
