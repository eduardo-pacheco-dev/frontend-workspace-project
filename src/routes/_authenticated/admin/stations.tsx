import { createFileRoute } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const Route = createFileRoute('/_authenticated/admin/stations')({
  component: StationsPage,
})

function StationsPage() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Stations
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Stations page coming soon.
      </Typography>
    </Box>
  )
}
