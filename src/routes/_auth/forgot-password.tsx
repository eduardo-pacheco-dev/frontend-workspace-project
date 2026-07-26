import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import LinkMui from '@mui/material/Link'
import { useAuth } from '../../lib/auth'

export const Route = createFileRoute('/_auth/forgot-password')({
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  const { forgotPassword, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await forgotPassword(email)
    setSent(true)
  }

  if (sent) {
    return (
      <>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            sx={{
              mx: 'auto',
              mb: 2,
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: 'success.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'success.dark',
              fontSize: 24,
            }}
          >
            ✓
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Check your email
          </Typography>
          <Typography variant="body2" color="text.secondary">
            If an account with <strong>{email}</strong> exists, we&apos;ve sent
            a password reset link.
          </Typography>
        </Box>
        <LinkMui
          component={Link}
          to="/login"
          variant="body2"
          sx={{ display: 'block', textAlign: 'center' }}
          underline="hover"
        >
          Back to sign in
        </LinkMui>
      </>
    )
  }

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Forgot password
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your email and we&apos;ll send you a reset link.
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
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
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading || !email}
            sx={{ py: 1.5 }}
          >
            {isLoading ? 'Sending…' : 'Send reset link'}
          </Button>
        </Stack>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: 'center', mt: 4 }}
      >
        Remember your password?{' '}
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
