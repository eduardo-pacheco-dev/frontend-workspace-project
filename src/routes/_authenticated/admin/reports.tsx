import { createFileRoute } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const Route = createFileRoute('/_authenticated/admin/reports')({
  component: ReportsPage,
})

function ReportsPage() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Reports
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Reports page coming soon.
      </Typography>
    </Box>
  )
}
