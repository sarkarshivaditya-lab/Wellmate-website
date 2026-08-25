import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export function AuthProvider({ children }: { children: ReactNode }) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN as string | undefined
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string | undefined
  const redirectUri = (import.meta.env.VITE_AUTH0_REDIRECT_URI as string | undefined) || window.location.origin
  const configured = Boolean(domain && clientId)

  return (
    <Auth0Provider
      domain={configured ? domain! : 'placeholder.auth0.com'}
      clientId={configured ? clientId! : 'placeholder'}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: (import.meta.env.VITE_AUTH0_AUDIENCE as string | undefined) || undefined,
        scope: 'openid profile email',
      }}
      cacheLocation="localstorage"
      useRefreshTokens
    >
      {children}
    </Auth0Provider>
  )
}

export function SignupButton({ children, onFallback, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; onFallback?: () => void }) {
  const { loginWithRedirect } = useAuth0()
  const configured = Boolean(import.meta.env.VITE_AUTH0_DOMAIN && import.meta.env.VITE_AUTH0_CLIENT_ID)

  const handleClick = async () => {
    if (!configured) {
      onFallback?.()
      return
    }
    await loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })
  }

  return <button {...props} onClick={handleClick}>{children}</button>
}
