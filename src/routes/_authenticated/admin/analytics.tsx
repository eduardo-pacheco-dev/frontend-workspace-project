import { createFileRoute } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const Route = createFileRoute('/_authenticated/admin/analytics')({
  component: AnalyticsPage,
})

function AnalyticsPage() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Analytics
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Analytics page coming soon.
      </Typography>
    </Box>
  )
}
