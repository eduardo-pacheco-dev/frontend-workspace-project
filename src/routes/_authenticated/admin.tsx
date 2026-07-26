import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/material/styles'
import { useAuth } from '../../lib/auth'

export const Route = createFileRoute('/_authenticated/admin')({
  component: AdminPage,
})

function AdminPage() {
  const { user, logout } = useAuth()
  const theme = useTheme()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const menuOpen = Boolean(anchorEl)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ mr: 1 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </IconButton>

          <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
            Admin
          </Typography>

          <Tooltip title="Notifications">
            <IconButton sx={{ mr: 1 }}>
              <Badge badgeContent={3} color="error">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  bgcolor: theme.palette.primary.main,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {user!.name.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setAnchorEl(null)}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{ paper: { sx: { mt: 1, minWidth: 180, borderRadius: 2 } } }}
          >
            <MenuItem disabled sx={{ opacity: '1 !important' }}>
              <Box sx={{ py: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {user?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem component={Link} to="/profile" onClick={() => setAnchorEl(null)}>
              <ListItemIcon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null)
                logout()
              }}
            >
              <ListItemIcon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Select a section from the sidebar to get started.
        </Typography>
      </Box>
    </Box>
  )
}
