import { createFileRoute, Link, Outlet, useNavigate, useLocation } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
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
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/material/styles'
import { useAuth } from '../../lib/auth'

export const Route = createFileRoute('/_authenticated/admin')({
  component: AdminLayout,
})

interface AppItem {
  id: string
  name: string
  route: string
  icon: React.ReactNode
}

const apps: AppItem[] = [
  {
    id: 'admin',
    name: 'Admin',
    route: '/admin',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    route: '/admin',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'users',
    name: 'Users',
    route: '/admin/users',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'settings',
    name: 'Settings',
    route: '/admin/settings',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    id: 'reports',
    name: 'Reports',
    route: '/admin/reports',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 'analytics',
    name: 'Analytics',
    route: '/admin/analytics',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    id: 'support',
    name: 'Support',
    route: '/admin/support',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
]

function AdminLayout() {
  const { user, logout } = useAuth()
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [appMenuAnchor, setAppMenuAnchor] = useState<HTMLElement | null>(null)
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(null)
  const [notifMenuAnchor, setNotifMenuAnchor] = useState<HTMLElement | null>(null)

  const currentApp = useMemo(
    () => apps.find((a) => a.route === location.pathname) ?? apps[0],
    [location.pathname],
  )

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
          <Tooltip title="Apps">
            <IconButton
              edge="start"
              onClick={(e) => setAppMenuAnchor(e.currentTarget)}
              sx={{ mr: 1 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={appMenuAnchor}
            open={Boolean(appMenuAnchor)}
            onClose={() => setAppMenuAnchor(null)}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            slotProps={{
              paper: { sx: { mt: 1, borderRadius: 3, p: 1.5, minWidth: 280 } },
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1,
              }}
            >
              {apps.map((app) => (
                <Paper
                  key={app.id}
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    p: 1.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    bgcolor: location.pathname === app.route ? 'action.selected' : 'transparent',
                    borderColor: location.pathname === app.route ? 'primary.main' : 'divider',
                    transition: 'background-color 0.15s, border-color 0.15s',
                    '&:hover': {
                      bgcolor: theme.palette.action.hover,
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                  onClick={() => {
                    setAppMenuAnchor(null)
                    navigate({ to: app.route })
                  }}
                >
                  <Box sx={{ color: theme.palette.primary.main }}>{app.icon}</Box>
                  <Typography variant="caption" sx={{ fontWeight: 600, textAlign: 'center' }}>
                    {app.name}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Menu>

          <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
            {currentApp.name}
          </Typography>

          <Tooltip title="Notifications">
            <IconButton
              sx={{ mr: 1 }}
              onClick={(e) => setNotifMenuAnchor(e.currentTarget)}
            >
              <Badge badgeContent={3} color="error">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </Badge>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={notifMenuAnchor}
            open={Boolean(notifMenuAnchor)}
            onClose={() => setNotifMenuAnchor(null)}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{ paper: { sx: { mt: 1, minWidth: 320, borderRadius: 2, maxHeight: 360 } } }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Notifications
              </Typography>
            </Box>
            <Divider />
            {[
              { title: 'New user registered', description: 'John Doe created an account', time: '2 min ago', unread: true },
              { title: 'Server alert', description: 'CPU usage exceeded 90% on prod-01', time: '15 min ago', unread: true },
              { title: 'Weekly report ready', description: 'Download your analytics summary', time: '1 hour ago', unread: false },
              { title: 'Deployment successful', description: 'v2.4.1 deployed to production', time: '3 hours ago', unread: false },
            ].map((notif, i) => (
              <MenuItem
                key={i}
                sx={{ px: 2, py: 1.5, alignItems: 'flex-start', flexDirection: 'column' }}
                onClick={() => setNotifMenuAnchor(null)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                  {notif.unread && (
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0, mt: 0.5 }} />
                  )}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: notif.unread ? 700 : 400 }}>
                      {notif.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notif.description}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0 }}>
                    {notif.time}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
            <Divider />
            <MenuItem sx={{ justifyContent: 'center', py: 1 }} onClick={() => setNotifMenuAnchor(null)}>
              <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                View all notifications
              </Typography>
            </MenuItem>
          </Menu>

          <Tooltip title="Account">
            <IconButton onClick={(e) => setUserMenuAnchor(e.currentTarget)}>
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
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={() => setUserMenuAnchor(null)}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{ paper: { sx: { mt: 1, minWidth: 180, borderRadius: 2 } } }}
          >
            <MenuItem disabled sx={{ opacity: '1 !important' }}>
              <Box sx={{ py: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{user?.name}</Typography>
                <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem component={Link} to="/admin" onClick={() => setUserMenuAnchor(null)}>
              <ListItemIcon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </ListItemIcon>
              Admin
            </MenuItem>
            <MenuItem component={Link} to="/profile" onClick={() => setUserMenuAnchor(null)}>
              <ListItemIcon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={() => { setUserMenuAnchor(null); logout() }}>
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

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
