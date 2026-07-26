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

export const Route = createFileRoute('/_auth/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const navigate = useNavigate()
  const { register, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    try {
      await register(name, email, password)
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
        <Stack spacing={2.5}>
          <TextField
            label="Name"
            required
            fullWidth
            size="medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
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
            label="Password"
            type="password"
            required
            fullWidth
            size="medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="······"
            helperText="At least 6 characters"
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
