import { Link } from '@tanstack/react-router'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../lib/auth'

export default function Header() {
  const { user, logout } = useAuth()
  const theme = useTheme()

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: theme.palette.background.paper,
        backdropFilter: 'blur(12px)',
      }}
    >
      <Toolbar sx={{ maxWidth: 1080, width: '100%', mx: 'auto', gap: 1 }}>
        <Typography
          component={Link}
          to="/"
          variant="body1"
          sx={{
            fontWeight: 700,
            textDecoration: 'none',
            color: 'text.primary',
            mr: 2,
          }}
        >
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'linear-gradient(90deg, #56c6be, #7ed3bf)',
              mr: 1,
            }}
          />
          TanStack Start
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <ThemeToggle />

        <Box sx={{ width: 1, height: 20, bgcolor: 'divider', mx: 0.5 }} />

        {user ? (
          <>
            <Button
              component={Link}
              to="/profile"
              variant="outlined"
              size="small"
              sx={{ borderRadius: 999 }}
            >
              {user.name}
            </Button>
            <Button
              onClick={logout}
              variant="text"
              size="small"
              color="error"
              sx={{ borderRadius: 999 }}
            >
              Sign out
            </Button>
          </>
        ) : (
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            size="small"
            sx={{ borderRadius: 999 }}
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
