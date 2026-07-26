import { createFileRoute, Link } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Viewer', status: 'Active' },
]

export const Route = createFileRoute('/_authenticated/admin/management/users/$userId')({
  component: UserDetailPage,
})

function UserDetailPage() {
  const { userId } = Route.useParams()
  const id = Number(userId)
  const user = users.find((u) => u.id === id)

  if (!user) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          User not found
        </Typography>
        <Button component={Link} to="/admin/management" variant="outlined" sx={{ borderRadius: 999 }}>
          Back to management
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
        <Button
          component={Link}
          to="/admin/management"
          variant="text"
          sx={{ borderRadius: 999, minWidth: 0, px: 1 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Button>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
          <Chip label={user.role} size="small" variant="outlined" color={user.role === 'Admin' ? 'primary' : 'default'} />
          <Chip label={user.status} size="small" color={user.status === 'Active' ? 'success' : 'default'} />
        </Box>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                User Information
              </Typography>
              <Stack spacing={2}>
                {[
                  { label: 'Name', value: user.name },
                  { label: 'Email', value: user.email },
                  { label: 'Role', value: user.role },
                  { label: 'Status', value: user.status },
                ].map((item) => (
                  <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>{item.value}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
