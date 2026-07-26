import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

export default function Footer() {
  const year = new Date().getFullYear()
  const theme = useTheme()

  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        borderTop: 1,
        borderColor: 'divider',
        px: 2,
        pb: 6,
        pt: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: 1080,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Typography variant="body2" color="text.secondary">
          &copy; {year} Your name here. All rights reserved.
        </Typography>
        <Typography
          variant="caption"
          sx={{
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: theme.palette.secondary.main,
          }}
        >
          Built with TanStack Start
        </Typography>
      </Box>
    </Box>
  )
}
