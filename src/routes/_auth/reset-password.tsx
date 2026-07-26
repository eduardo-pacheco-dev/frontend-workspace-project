import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import LinkMui from '@mui/material/Link'
import { useAuth } from '../../lib/auth'

export const Route = createFileRoute('/_auth/reset-password')({
  validateSearch: (search: Record<string, unknown>) => ({
    token: (search.token as string) || '',
  }),
  component: ResetPasswordPage,
})

function ResetPasswordPage() {
  const navigate = useNavigate()
  const { token } = Route.useSearch()
  const { resetPassword, isLoading } = useAuth()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    try {
      await resetPassword(token, password)
      navigate({ to: '/login' })
    } catch {
      setError('Reset failed. The link may have expired.')
    }
  }

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Set new password
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose a new password for your account.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {!token && (
        <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
          Invalid or missing reset token.
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <TextField
            label="New password"
            type="password"
            required
            fullWidth
            size="medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="······"
          />
          <TextField
            label="Confirm password"
            type="password"
            required
            fullWidth
            size="medium"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="······"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading || !token}
            sx={{ py: 1.5 }}
          >
            {isLoading ? 'Resetting…' : 'Reset password'}
          </Button>
        </Stack>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: 'center', mt: 4 }}
      >
        <LinkMui
          component={Link}
          to="/login"
          sx={{ fontWeight: 600 }}
          underline="hover"
        >
          Back to sign in
        </LinkMui>
      </Typography>
    </>
  )
}
