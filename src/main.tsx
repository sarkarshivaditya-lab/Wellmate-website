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
    const goldenHero=document.querySelector('main > .hero')
    if(!goldenHero) return

    const heroSlot=document.createElement('div')
    heroSlot.className='original-hero-slot'
    const goldenCta=goldenHero.querySelector<HTMLButtonElement>('.quiet-button')
    const handleGoldenCta=(event: Event)=>{
      event.preventDefault()
      event.stopImmediatePropagation()
      heroSlot.scrollIntoView({behavior:'smooth'})
    }
    goldenCta?.addEventListener('click',handleGoldenCta,true)
    goldenHero.insertAdjacentElement('afterend',heroSlot)
    setSlot(heroSlot)

    return ()=>{
      goldenCta?.removeEventListener('click',handleGoldenCta,true)
      heroSlot.remove()
    }
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
  </StrictMode>,
)
