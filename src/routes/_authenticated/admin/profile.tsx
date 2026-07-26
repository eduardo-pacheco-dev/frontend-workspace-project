import { createFileRoute, Link } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import { useTheme } from '@mui/material/styles'
import { useAuth } from '../../../lib/auth'

export const Route = createFileRoute('/_authenticated/admin/profile')({
  component: ProfilePage,
})

const companyData = {
  name: 'Acme Technology LLC',
  cnpj: '12.345.678/0001-95',
  tradeName: 'Acme Tech',
  registrationStatus: 'Active',
  phone: '+55 11 99999-1234',
  email: 'contact@acmetech.com.br',
}

const projects = [
  { id: 1, name: 'Network Expansion SP', role: 'Project Manager', status: 'In Progress', deadline: '2026-08-30' },
  { id: 2, name: '5G Rollout RJ', role: 'Technical Lead', status: 'In Progress', deadline: '2026-10-15' },
  { id: 3, name: 'Fiber Optic BH', role: 'Team Member', status: 'Completed', deadline: '2026-03-20' },
  { id: 4, name: 'Data Center Upgrade', role: 'Consultant', status: 'Planning', deadline: '2026-12-01' },
]

function ProfilePage() {
  const { user, logout } = useAuth()
  const theme = useTheme()

  return (
    <Box>
      <Box sx={{ maxWidth: 960, mx: 'auto', px: 2, py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4, flexWrap: 'wrap' }}>
          <Avatar sx={{ width: 72, height: 72, bgcolor: theme.palette.primary.main, fontSize: 28, fontWeight: 700 }}>
            {user?.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>{user?.name}</Typography>
            <Typography variant="body1" color="text.secondary">{user?.email}</Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                  User Details
                </Typography>
                <Stack spacing={2}>
                  {[
                    { label: 'Name', value: user?.name },
                    { label: 'Email', value: user?.email },
                    { label: 'User ID', value: user?.id },
                    { label: 'Role', value: 'Administrator' },
                    { label: 'Status', value: 'Active' },
                  ].map((item) => (
                    <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.5, borderBottom: 1, borderColor: 'divider' }}>
                      <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.value}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Company Details
                  </Typography>
                  <Chip label={companyData.registrationStatus} size="small" color="success" />
                </Box>
                <Stack spacing={2}>
                  {[
                    { label: 'Legal Name', value: companyData.name },
                    { label: 'Trade Name', value: companyData.tradeName },
                    { label: 'CNPJ', value: companyData.cnpj },
                    { label: 'Phone', value: companyData.phone },
                    { label: 'Email', value: companyData.email },
                  ].map((item) => (
                    <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.5, borderBottom: 1, borderColor: 'divider' }}>
                      <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.value}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                  Projects ({projects.length})
                </Typography>
                <Stack spacing={2}>
                  {projects.map((project) => (
                    <Box
                      key={project.id}
                      sx={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        flexWrap: 'wrap', gap: 1, p: 2, borderRadius: 2, border: 1, borderColor: 'divider',
                      }}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{project.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{project.role} · Deadline: {project.deadline}</Typography>
                      </Box>
                      <Chip
                        label={project.status}
                        size="small"
                        color={project.status === 'Completed' ? 'success' : project.status === 'In Progress' ? 'warning' : 'default'}
                      />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button component={Link} to="/admin" variant="outlined" sx={{ borderRadius: 999 }}>Dashboard</Button>
          <Button onClick={logout} variant="outlined" color="error" sx={{ borderRadius: 999 }}>Sign out</Button>
        </Stack>
      </Box>

      <Box component="footer" sx={{ mt: 4, pt: 3, pb: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, px: 2 }}>
        <Typography variant="body2" color="text.secondary">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</Typography>
        <Typography variant="caption" color="text.disabled">Profile</Typography>
      </Box>
    </Box>
  )
}
