import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { getAuthState } from '../lib/auth'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    const { user } = getAuthState()
    if (!user) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
  component: Outlet,
})
