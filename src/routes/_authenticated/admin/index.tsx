import { createFileRoute } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

export const Route = createFileRoute('/_authenticated/admin/')({
  component: DashboardPage,
})

const stats = [
  { label: 'Total Users', value: '2,847', change: '+12%', color: '#4fb8b2' },
  { label: 'Active Sessions', value: '143', change: '+5%', color: '#328f97' },
  { label: 'Revenue', value: '$48,290', change: '+18%', color: '#2f6a4a' },
  { label: 'Support Tickets', value: '24', change: '-8%', color: '#c44747' },
]

function DashboardPage() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Overview of your application metrics.
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.label}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  {stat.label}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: stat.change.startsWith('+') ? 'success.main' : 'error.main',
                  }}
                >
                  {stat.change} vs last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mt: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
            Recent Activity
          </Typography>
          {[
            { action: 'User John Doe registered', time: '2 minutes ago' },
            { action: 'New deployment v2.4.1 completed', time: '1 hour ago' },
            { action: 'Weekly report generated', time: '3 hours ago' },
            { action: 'Server backup completed', time: '5 hours ago' },
            { action: 'SSL certificate renewed', time: '1 day ago' },
          ].map((item, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1.5,
                borderBottom: i < 4 ? 1 : 0,
                borderColor: 'divider',
              }}
            >
              <Typography variant="body2">{item.action}</Typography>
              <Typography variant="caption" color="text.disabled">
                {item.time}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  )
}
