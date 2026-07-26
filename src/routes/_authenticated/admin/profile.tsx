import { createFileRoute, Link } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { useAuth } from '../../../lib/auth'

export const Route = createFileRoute('/_authenticated/admin/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  const { user, logout } = useAuth()

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto', px: 2, py: 6 }}>
      <Typography
        variant="overline"
        sx={{ letterSpacing: '0.16em', color: 'secondary.main' }}
      >
        Profile
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Welcome, {user?.name}
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="caption" color="text.secondary">Name</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>{user?.name}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Email</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>{user?.email}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">User ID</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>{user?.id}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Stack direction="row" spacing={2}>
        <Button component={Link} to="/admin/dashboard" variant="outlined" sx={{ borderRadius: 999 }}>Dashboard</Button>
        <Button onClick={logout} variant="outlined" color="error" sx={{ borderRadius: 999 }}>Sign out</Button>
      </Stack>
    </Box>
  )
}
