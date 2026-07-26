'use client'

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react'
import type { ReactNode } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

type ColorMode = 'light' | 'dark'

interface ColorModeContextValue {
  mode: ColorMode
  toggleColorMode: () => void
}

const ColorModeContext = createContext<ColorModeContextValue>({
  mode: 'light',
  toggleColorMode: () => {},
})

export function useColorMode() {
  return useContext(ColorModeContext)
}

function getInitialMode(): ColorMode {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const lightPalette = {
  primary: { main: '#328f97', light: '#4fb8b2', dark: '#246f76', contrastText: '#ffffff' },
  secondary: { main: '#2f6a4a', light: '#6ec89a', dark: '#1a4d32' },
  error: { main: '#c44747' },
  background: { default: '#e7f3ec', paper: 'rgba(255,255,255,0.9)' },
  text: { primary: '#173a40', secondary: '#416166' },
  divider: 'rgba(23,58,64,0.14)',
}

const darkPalette = {
  primary: { main: '#60d7cf', light: '#8de5db', dark: '#4fb8b2', contrastText: '#0a1418' },
  secondary: { main: '#6ec89a', light: '#8de5b8', dark: '#2f6a4a' },
  error: { main: '#ef5350' },
  background: { default: '#0a1418', paper: 'rgba(15,27,31,0.92)' },
  text: { primary: '#d7ece8', secondary: '#afcdc8' },
  divider: 'rgba(141,229,219,0.18)',
}

export function MuiThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ColorMode>('light')

  useEffect(() => {
    setMode(getInitialMode())
  }, [])

  const toggleColorMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', next)
      return next
    })
  }, [])

  const colorModeCtx = useMemo(
    () => ({ mode, toggleColorMode }),
    [mode, toggleColorMode],
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light' ? lightPalette : darkPalette),
        },
        typography: {
          fontFamily: '"Manrope", ui-sans-serif, system-ui, sans-serif',
          button: { textTransform: 'none', fontWeight: 600 },
        },
        shape: { borderRadius: 12 },
        components: {
          MuiButton: {
            styleOverrides: {
              root: { borderRadius: 999, padding: '10px 24px' },
              contained: { boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: { '& .MuiOutlinedInput-root': { borderRadius: 12 } },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
              },
            },
          },
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={colorModeCtx}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
