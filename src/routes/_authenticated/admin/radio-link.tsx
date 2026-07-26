import { createFileRoute } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const Route = createFileRoute('/_authenticated/admin/radio-link')({
  component: RadioLinkPage,
})

function RadioLinkPage() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Radio Link
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Radio Link page coming soon.
      </Typography>
    </Box>
  )
}
