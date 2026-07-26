import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { AuthProvider } from '../lib/auth'
import { MuiThemeProvider } from '../lib/theme'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import type { QueryClient } from '@tanstack/react-query'
import type { User } from '../lib/auth'

interface MyRouterContext {
  queryClient: QueryClient
  user: User | null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TanStack Start Starter' },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body style={{ margin: 0 }}>
        <MuiThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </MuiThemeProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
