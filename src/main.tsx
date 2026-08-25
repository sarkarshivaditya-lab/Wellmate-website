import { StrictMode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AuthProvider } from './auth'
import { OriginalHero } from './OriginalHero'
import './styles.css'
import './cta.css'
import './emergency.css'

function Page(){
  const [slot,setSlot]=useState<HTMLElement | null>(null)

  useEffect(()=>{
    const goldenBreath=document.querySelector('main > .golden-breath')
    if(!goldenBreath) return

    const heroSlot=document.createElement('div')
    heroSlot.className='original-hero-slot'
    goldenBreath.insertAdjacentElement('afterend',heroSlot)
    setSlot(heroSlot)

    return ()=>heroSlot.remove()
  },[])

  return <>
    <App/>
    {slot ? createPortal(<OriginalHero/>,slot) : null}
  </>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Page />
    </AuthProvider>
  </>
)
