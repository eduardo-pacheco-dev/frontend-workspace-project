import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuth } from '../../lib/auth'

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  const { user, logout } = useAuth()

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">Profile</p>
        <h1 className="mb-6 text-3xl font-bold text-[var(--sea-ink)]">
          Welcome, {user?.name}
        </h1>

        <div className="mb-6 space-y-3">
          <div className="rounded-xl border border-[var(--line)] bg-white px-4 py-3">
            <p className="text-xs text-[var(--sea-ink-soft)]">Name</p>
            <p className="text-sm font-medium text-[var(--sea-ink)]">{user?.name}</p>
          </div>
          <div className="rounded-xl border border-[var(--line)] bg-white px-4 py-3">
            <p className="text-xs text-[var(--sea-ink-soft)]">Email</p>
            <p className="text-sm font-medium text-[var(--sea-ink)]">{user?.email}</p>
          </div>
          <div className="rounded-xl border border-[var(--line)] bg-white px-4 py-3">
            <p className="text-xs text-[var(--sea-ink-soft)]">User ID</p>
            <p className="text-sm font-medium text-[var(--sea-ink)] font-mono">{user?.id}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
          >
            Home
          </Link>
          <button
            onClick={logout}
            className="rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:-translate-y-0.5 hover:bg-red-100"
          >
            Sign out
          </button>
        </div>
      </section>
    </main>
  )
}
