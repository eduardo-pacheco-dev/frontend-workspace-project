import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
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
  const { user } = useAuth()
  const theme = useTheme()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteEmail, setDeleteEmail] = useState('')
  const [editOpen, setEditOpen] = useState(false)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [profileUser, setProfileUser] = useState(user)
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null)
  const [snack, setSnack] = useState({ open: false, message: '' })

  return (
    <Box>
      <Box sx={{ maxWidth: 960, mx: 'auto', px: 2, py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4, flexWrap: 'wrap' }}>
          <Box sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => document.getElementById('avatar-input')?.click()}>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = () => setAvatarSrc(reader.result as string)
                  reader.readAsDataURL(file)
                }
              }}
            />
            <Avatar
              src={avatarSrc ?? undefined}
              sx={{
                width: 72, height: 72,
                bgcolor: avatarSrc ? 'transparent' : theme.palette.primary.main,
                fontSize: 28, fontWeight: 700,
                border: '2px solid transparent',
                transition: 'border-color 0.15s',
                '&:hover': { borderColor: theme.palette.primary.main },
              }}
            >
              {!avatarSrc && profileUser?.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box
              sx={{
                position: 'absolute', bottom: 0, right: 0,
                bgcolor: 'background.paper', borderRadius: '50%',
                width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: 1, borderColor: 'divider', boxShadow: 1,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </Box>
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>{profileUser?.name}</Typography>
            <Typography variant="body1" color="text.secondary">{profileUser?.email}</Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    User Details
                  </Typography>
                  <Button size="small" variant="outlined" sx={{ borderRadius: 999 }} onClick={() => { setEditName(profileUser?.name ?? ''); setEditEmail(profileUser?.email ?? ''); setEditOpen(true) }}>
                    Edit
                  </Button>
                </Box>
                <Stack spacing={2}>
                  {[
                    { label: 'Name', value: profileUser?.name },
                    { label: 'Email', value: profileUser?.email },
                    { label: 'User ID', value: profileUser?.id },
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
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: 'error.main' }}>
                  Danger Zone
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Once you delete your account, there is no going back. Please be certain.
                </Typography>
                <Button variant="outlined" color="error" sx={{ borderRadius: 999 }} onClick={() => setDeleteOpen(true)}>
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Edit Profile</DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField label="Name" fullWidth size="small" value={editName} onChange={(e) => setEditName(e.target.value)} />
            <TextField label="Email" fullWidth size="small" type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setEditOpen(false)} sx={{ borderRadius: 999 }}>Cancel</Button>
          <Button variant="contained" sx={{ borderRadius: 999 }} onClick={() => {
            setProfileUser((prev) => prev ? { ...prev, name: editName, email: editEmail } : prev)
            setEditOpen(false)
            setSnack({ open: true, message: 'Profile updated successfully.' })
          }}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ open: false, message: '' })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{snack.message}</Alert>
      </Snackbar>

      <Dialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleteEmail('') }} maxWidth="xs" fullWidth slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
        <DialogTitle sx={{ fontWeight: 700, color: 'error.main' }}>Delete Account</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This action cannot be undone. Please type your email to confirm.
          </Typography>
          <TextField
            label="Confirm email"
            fullWidth
            size="small"
            value={deleteEmail}
            onChange={(e) => setDeleteEmail(e.target.value)}
            placeholder={profileUser?.email}
            autoFocus
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => { setDeleteOpen(false); setDeleteEmail('') }} sx={{ borderRadius: 999 }}>Cancel</Button>
          <Button variant="contained" color="error" sx={{ borderRadius: 999 }} disabled={deleteEmail !== profileUser?.email} onClick={() => { setDeleteOpen(false); setDeleteEmail('') }}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Box component="footer" sx={{ mt: 4, pt: 3, pb: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, px: 2 }}>
        <Typography variant="body2" color="text.secondary">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</Typography>
        <Typography variant="caption" color="text.disabled">Profile</Typography>
      </Box>
    </Box>
  )
}
