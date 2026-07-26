import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  useEffect,
} from 'react'
import type { ReactNode } from 'react'
import { useRouter } from '@tanstack/react-router'

export interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
}

type Listener = () => void

function createAuthStore(initialState: AuthState) {
  let state = initialState
  const listeners = new Set<Listener>()

  return {
    getState: () => state,
    setState: (partial: Partial<AuthState>) => {
      state = { ...state, ...partial }
      listeners.forEach((fn) => fn())
    },
    subscribe: (listener: Listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}

const store = createAuthStore({ user: null, isLoading: false })

function simulateDelay(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function fakeUser(email: string, name: string): User {
  return {
    id: crypto.randomUUID(),
    email,
    name,
  }
}

export async function login(email: string, _password: string) {
  store.setState({ isLoading: true })
  await simulateDelay()
  store.setState({ user: fakeUser(email, email.split('@')[0]), isLoading: false })
}

export async function register(name: string, email: string, _password: string) {
  store.setState({ isLoading: true })
  await simulateDelay()
  store.setState({ user: fakeUser(email, name), isLoading: false })
}

export function logout() {
  store.setState({ user: null })
}

export async function forgotPassword(_email: string) {
  store.setState({ isLoading: true })
  await simulateDelay(800)
  store.setState({ isLoading: false })
}

export async function resetPassword(_token: string, _password: string) {
  store.setState({ isLoading: true })
  await simulateDelay(800)
  store.setState({ isLoading: false })
}

export function getAuthState() {
  return store.getState()
}

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: typeof login
  register: typeof register
  logout: typeof logout
  forgotPassword: typeof forgotPassword
  resetPassword: typeof resetPassword
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(store.subscribe, store.getState)
  const router = useRouter()

  useEffect(() => {
    router.update({ context: { ...router.options.context, user: state.user } })
  }, [state.user, router])

  const ctx: AuthContextValue = {
    user: state.user,
    isAuthenticated: state.user !== null,
    isLoading: state.isLoading,
    login: useCallback(login, []),
    register: useCallback(register, []),
    logout: useCallback(logout, []),
    forgotPassword: useCallback(forgotPassword, []),
    resetPassword: useCallback(resetPassword, []),
  }

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
