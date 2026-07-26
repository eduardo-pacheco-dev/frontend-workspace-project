import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { getAuthState } from '../lib/auth'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const { user } = getAuthState()
    if (user) throw redirect({ to: '/' })
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="island-shell w-full max-w-md rounded-2xl p-6 sm:p-8">
        <Outlet />
      </div>
    </main>
  )
}
