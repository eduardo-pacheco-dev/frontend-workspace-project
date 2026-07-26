import { QueryClient } from '@tanstack/react-query'
import { getAuthState } from '../../lib/auth'

export function getContext() {
  const queryClient = new QueryClient()
  const { user } = getAuthState()

  return {
    queryClient,
    user,
  }
}
export default function TanstackQueryProvider() {}
