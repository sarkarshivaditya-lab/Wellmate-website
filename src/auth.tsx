import { Auth0Provider } from '@auth0/auth0-react'
import type { ReactNode } from 'react'

export function AuthProvider({ children }: { children: ReactNode }) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN as string | undefined
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string | undefined
  const redirectUri = (import.meta.env.VITE_AUTH0_REDIRECT_URI as string | undefined) || window.location.origin

  if (!domain || !clientId) return <>{children}</>

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string | undefined,
        scope: 'openid profile email',
      }}
      cacheLocation="localstorage"
      useRefreshTokens
    >
      {children}
    </Auth0Provider>
  )
}
