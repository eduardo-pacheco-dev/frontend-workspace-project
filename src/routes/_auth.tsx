import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
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
    <Box
      sx={{
        display: 'flex',
        minHeight: 'calc(100vh - 64px)',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 6,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 440, p: { xs: 3, sm: 4 } }}>
        <Outlet />
      </Card>
    </Box>
  )
}
