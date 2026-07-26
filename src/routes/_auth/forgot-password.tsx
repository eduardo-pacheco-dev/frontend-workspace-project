import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../../lib/auth'

export const Route = createFileRoute('/_auth/forgot-password')({
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  const { forgotPassword, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await forgotPassword(email)
    setSent(true)
  }

  if (sent) {
    return (
      <>
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mb-1 text-2xl font-bold text-[var(--sea-ink)]">Check your email</h1>
          <p className="text-sm text-[var(--sea-ink-soft)]">
            If an account with <strong className="text-[var(--sea-ink)]">{email}</strong> exists,
            we&apos;ve sent a password reset link.
          </p>
        </div>
        <Link
          to="/login"
          className="block text-center text-sm text-[rgba(79,184,178,0.9)] hover:text-[rgba(79,184,178,1)]"
        >
          Back to sign in
        </Link>
      </>
    )
  }

  return (
    <>
      <h1 className="mb-1 text-2xl font-bold text-[var(--sea-ink)]">Forgot password</h1>
      <p className="mb-6 text-sm text-[var(--sea-ink-soft)]">
        Enter your email and we&apos;ll send you a reset link.
      </p>

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

        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full rounded-xl bg-[rgba(79,184,178,0.9)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[rgba(79,184,178,1)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Sending…' : 'Send reset link'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--sea-ink-soft)]">
        Remember your password?{' '}
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
