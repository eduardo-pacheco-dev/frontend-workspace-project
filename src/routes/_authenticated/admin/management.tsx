import { createFileRoute } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'

export const Route = createFileRoute('/_authenticated/admin/management')({
  component: ManagementPage,
})

function ManagementPage() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Admin
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        System administration and control panel.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                System Status
              </Typography>
              <Stack spacing={2}>
                {[
                  { label: 'Server', value: 'Online', color: 'success' as const },
                  { label: 'Database', value: 'Connected', color: 'success' as const },
                  { label: 'Cache', value: 'Healthy', color: 'success' as const },
                  { label: 'Queue', value: 'Processing', color: 'warning' as const },
                ].map((item) => (
                  <Box
                    key={item.label}
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="body2">{item.label}</Typography>
                    <Chip label={item.value} size="small" color={item.color} />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Version Info
              </Typography>
              <Stack spacing={1.5}>
                {[
                  { label: 'App version', value: 'v2.4.1' },
                  { label: 'Last deployed', value: '2026-07-25' },
                  { label: 'Environment', value: 'Production' },
                  { label: 'Uptime', value: '14d 6h 32m' },
                ].map((item) => (
                  <Box
                    key={item.label}
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.value}
                    </Typography>
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
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {[
                  { label: 'Clear Cache', desc: 'Purge all cached data' },
                  { label: 'Run Backup', desc: 'Create a full system backup' },
                  { label: 'Restart Queue', desc: 'Restart the job queue worker' },
                  { label: 'System Logs', desc: 'View recent system logs' },
                ].map((action) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={action.label}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        border: 1,
                        borderColor: 'divider',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s',
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {action.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {action.desc}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
