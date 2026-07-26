import { createFileRoute } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

export const Route = createFileRoute('/_authenticated/admin/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <Box sx={{ maxWidth: 640 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Configure your application preferences.
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
            General
          </Typography>
          <Stack spacing={2.5}>
            <TextField label="Site name" defaultValue="My App" size="small" fullWidth />
            <TextField label="Support email" defaultValue="support@example.com" size="small" fullWidth />
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
            Notifications
          </Typography>
          <Stack spacing={1}>
            <FormControlLabel control={<Switch defaultChecked />} label="Email notifications" />
            <FormControlLabel control={<Switch defaultChecked />} label="Push notifications" />
            <FormControlLabel control={<Switch />} label="SMS notifications" />
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
            Security
          </Typography>
          <Stack spacing={2.5}>
            <FormControlLabel control={<Switch defaultChecked />} label="Two-factor authentication" />
            <Divider />
            <Button variant="contained" color="error" sx={{ alignSelf: 'flex-start' }}>
              Delete account
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
