import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LinkMui from '@mui/material/Link'
import { useTheme } from '@mui/material/styles'
import { useAuth } from '../../lib/auth'

export const Route = createFileRoute('/_auth/register')({
  component: RegisterPage,
})

interface PasswordRequirement {
  label: string
  test: (pw: string) => boolean
}

const requirements: PasswordRequirement[] = [
  { label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
  { label: 'One uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
  { label: 'One lowercase letter', test: (pw) => /[a-z]/.test(pw) },
  { label: 'One number', test: (pw) => /\d/.test(pw) },
  { label: 'One special character', test: (pw) => /[^A-Za-z0-9]/.test(pw) },
]

function getStrength(pw: string): { score: number; color: string; label: string } {
  const passed = requirements.filter((r) => r.test(pw)).length
  if (pw.length === 0) return { score: 0, color: 'transparent', label: '' }
  if (passed <= 1) return { score: 20, color: '#ef5350', label: 'Weak' }
  if (passed <= 2) return { score: 40, color: '#ff7043', label: 'Fair' }
  if (passed <= 3) return { score: 60, color: '#ffa726', label: 'Good' }
  if (passed <= 4) return { score: 80, color: '#66bb6a', label: 'Strong' }
  return { score: 100, color: '#43a047', label: 'Very strong' }
}

function RegisterPage() {
  const navigate = useNavigate()
  const theme = useTheme()
  const { register, isLoading } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [emailConfirm, setEmailConfirm] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')

  const strength = useMemo(() => getStrength(password), [password])
  const emailsMatch = email === emailConfirm
  const passwordsMatch = password === passwordConfirm
  const allPassRequirements = strength.score === 100

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!emailsMatch) {
      setError('Email addresses do not match.')
      return
    }
    if (!allPassRequirements) {
      setError('Password does not meet all requirements.')
      return
    }
    if (!passwordsMatch) {
      setError('Passwords do not match.')
      return
    }

    try {
      await register(`${firstName} ${lastName}`.trim(), email, password)
      navigate({ to: '/profile' })
    } catch {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Create account
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Fill in the details below to get started.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="First name"
                required
                fullWidth
                size="medium"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Last name"
                required
                fullWidth
                size="medium"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
              />
            </Grid>
          </Grid>

          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            size="medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <TextField
            label="Confirm email"
            type="email"
            required
            fullWidth
            size="medium"
            value={emailConfirm}
            onChange={(e) => setEmailConfirm(e.target.value)}
            placeholder="you@example.com"
            error={emailConfirm.length > 0 && !emailsMatch}
            helperText={
              emailConfirm.length > 0 && !emailsMatch
                ? 'Email addresses do not match'
                : ' '
            }
          />

          <Box>
            <TextField
              label="Password"
              type="password"
              required
              fullWidth
              size="medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="······"
            />

            {password.length > 0 && (
              <Box sx={{ mt: 1.5 }}>
                <LinearProgress
                  variant="determinate"
                  value={strength.score}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: theme.palette.divider,
                    '& .MuiLinearProgress-bar': {
                      bgcolor: strength.color,
                      transition: 'background-color 0.3s',
                    },
                  }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                  <Typography variant="caption" sx={{ color: strength.color, fontWeight: 600 }}>
                    {strength.label}
                  </Typography>
                </Box>

                <List dense disablePadding sx={{ mt: 1 }}>
                  {requirements.map((req) => {
                    const passed = req.test(password)
                    return (
                      <ListItem key={req.label} disableGutters sx={{ py: 0 }}>
                        <ListItemIcon sx={{ minWidth: 28 }}>
                          <Typography
                            variant="body2"
                            sx={{ color: passed ? 'success.main' : 'error.main' }}
                          >
                            {passed ? '●' : '○'}
                          </Typography>
                        </ListItemIcon>
                        <ListItemText
                          primary={req.label}
                          slotProps={{
                            primary: {
                              variant: 'caption',
                              sx: {
                                color: passed ? 'success.main' : 'error.main',
                                fontWeight: passed ? 600 : 400,
                              },
                            },
                          }}
                        />
                      </ListItem>
                    )
                  })}
                </List>
              </Box>
            )}
          </Box>

          <TextField
            label="Confirm password"
            type="password"
            required
            fullWidth
            size="medium"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="······"
            error={passwordConfirm.length > 0 && !passwordsMatch}
            helperText={
              passwordConfirm.length > 0 && !passwordsMatch
                ? 'Passwords do not match'
                : ' '
            }
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{ py: 1.5 }}
          >
            {isLoading ? 'Creating account…' : 'Create account'}
          </Button>
        </Stack>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: 'center', mt: 4 }}
      >
        Already have an account?{' '}
        <LinkMui
          component={Link}
          to="/login"
          sx={{ fontWeight: 600 }}
          underline="hover"
        >
          Sign in
        </LinkMui>
      </Typography>
    </>
  )
}
