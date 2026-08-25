import { useEffect, useRef, useState, type RefObject } from 'react'
import './WellmateBootLayer.css'

const beats = [
  { eyebrow: 'THE GOLDEN HOUR', title: 'Thousands of people die everyday because...', tone: 'neutral' },
  { eyebrow: 'THE FIRST FAILURE', title: 'no one called the paramedics...', tone: 'red' },
  { eyebrow: 'THE SECOND FAILURE', title: 'the paramedics werent informed fast enough...', tone: 'blue' },
  { eyebrow: 'THE THIRD FAILURE', title: "the paramedics spend too much of precious time testing patient's blood sample for correct blood type and allergies...", tone: 'clinical' },
  { eyebrow: 'ENOUGH WAITING', title: 'BUT NOT ANYMORE', tone: 'impact' },
  { eyebrow: 'EMERGENCY CARE, REIMAGINED', title: 'INTRODUCING WELLMATE', tone: 'brand' },
] as const

export function WellmateBoot({ landingRef }: { landingRef?: RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLElement>(null)
  const [activeBeat, setActiveBeat] = useState(0)
  const [progress, setProgress] = useState(0)
  const [finished, setFinished] = useState(false)

  const finish = () => setFinished(true)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    let ticking = false
    const update = () => {
      ticking = false
      const section = ref.current
      if (!section) return
      const max = Math.max(section.offsetHeight - window.innerHeight, 1)
      const raw = (window.scrollY - section.offsetTop) / max
      const next = Math.max(0, Math.min(1, raw))
      setProgress(next)
      setActiveBeat(Math.min(5, Math.floor(next * 6)))
      if (next >= 0.995) finish()
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finish()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!landingRef?.current || !finished) return
    landingRef.current.removeAttribute('aria-hidden')
    requestAnimationFrame(() => landingRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' }))
  }, [landingRef, finished])

  useEffect(() => {
    if (!landingRef?.current || finished) return
    landingRef.current.setAttribute('aria-hidden', 'true')
    return () => landingRef.current?.removeAttribute('aria-hidden')
  }, [landingRef, finished])

  if (finished) return null

  return (
    <section ref={ref} className="wellmate-boot" aria-label="WellMate cinematic introduction">
      <div className="wellmate-boot-sticky">
        <div className={`wellmate-boot-intro ${progress < 0.12 ? 'is-visible' : 'is-hidden'}`} aria-hidden="true">
          <span className="wellmate-boot-grid" />
          <span className="wellmate-boot-siren siren-red" />
          <span className="wellmate-boot-siren siren-blue" />
          <span className="wellmate-boot-flash flash-red" />
          <span className="wellmate-boot-flash flash-blue" />
          <div className="wellmate-boot-scanline" />
          <div className="wellmate-boot-noise" />
        </div>

        <div className="wellmate-boot-content">
          {beats.map((beat, index) => (
            <div key={beat.title} className={`wellmate-boot-beat is-${beat.tone} ${activeBeat === index ? 'is-active' : ''}`}>
              <div className="wellmate-boot-copy">
                <p>{beat.eyebrow}</p>
                <h2>{beat.title}</h2>
                <span className="wellmate-boot-progress">0{index + 1} / 06</span>
              </div>
            </div>
          ))}
        </div>

        <div className={`wellmate-boot-reveal ${progress > 0.88 ? 'is-visible' : ''}`} aria-hidden="true">
          <div className="wellmate-boot-reveal-line" />
        </div>

        <button className="wellmate-boot-skip" type="button" onClick={finish}>SKIP INTRO</button>
        <span className="wellmate-boot-scroll">SCROLL TO CONTINUE ↓</span>
      </div>
    </section>
  )
}
