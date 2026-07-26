import { createFileRoute } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const Route = createFileRoute('/_authenticated/admin/support')({
  component: SupportPage,
})

function SupportPage() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Support
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Support page coming soon.
      </Typography>
    </Box>
  )
}
