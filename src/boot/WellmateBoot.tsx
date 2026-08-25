import { useEffect, useRef, useState, type RefObject } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import './WellmateBootLayer.css'

const beats = [
  { eyebrow: 'THE GOLDEN HOUR', title: 'Thousands of people die everyday because...', tone: 'neutral' },
  { eyebrow: 'THE FIRST FAILURE', title: 'no one called the paramedics...', tone: 'red' },
  { eyebrow: 'THE SECOND FAILURE', title: 'the paramedics werent informed fast enough...', tone: 'blue' },
  { eyebrow: 'THE THIRD FAILURE', title: "the paramedics spend too much of precious time testing patient's blood sample for correct blood type and allergies...", tone: 'clinical' },
  { eyebrow: 'ENOUGH WAITING', title: 'BUT NOT ANYMORE', tone: 'impact' },
  { eyebrow: 'EMERGENCY CARE, REIMAGINED', title: 'INTRODUCING WELLMATE', tone: 'brand' },
] as const

function beatForProgress(progress: number) {
  if (progress < 0.36) return -1
  if (progress < 0.48) return 0
  if (progress < 0.59) return 1
  if (progress < 0.70) return 2
  if (progress < 0.81) return 3
  if (progress < 0.90) return 4
  if (progress < 0.97) return 5
  return -1
}

export function WellmateBoot({ landingRef }: { landingRef?: RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLElement>(null)
  const [finished, setFinished] = useState(false)
  const [activeBeat, setActiveBeat] = useState(-1)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const lightsOpacity = useTransform(scrollYProgress, [0.08, 0.18, 0.31, 0.36, 0.42], [0, 0.35, 1, 1, 0])
  const lightsX = useTransform(scrollYProgress, [0.08, 0.31, 0.42], ['-7%', '0%', '4%'])
  const revealOpacity = useTransform(scrollYProgress, [0.97, 0.985, 1], [0, 0.55, 1])
  const revealScale = useTransform(scrollYProgress, [0.97, 1], [0.96, 1])

  const finish = () => setFinished(true)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finish()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    setActiveBeat(previous => {
      const next = beatForProgress(latest)
      return next === previous ? previous : next
    })
    if (latest >= 0.999) finish()
  })

  useEffect(() => {
    if (!landingRef?.current || !finished) return
    landingRef.current.removeAttribute('aria-hidden')
    requestAnimationFrame(() => {
      landingRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' })
    })
  }, [landingRef, finished])

  useEffect(() => {
    if (!landingRef?.current || finished) return
    landingRef.current.setAttribute('aria-hidden', 'true')
    return () => landingRef.current?.removeAttribute('aria-hidden')
  }, [landingRef, finished])

  if (finished) return null

  const beat = activeBeat >= 0 ? beats[activeBeat] : null

  return (
    <section ref={ref} className="wellmate-boot" aria-label="WellMate cinematic introduction">
      <div className="wellmate-boot-sticky">
        <div className="wellmate-boot-black" aria-hidden="true" />

        <motion.div className="wellmate-boot-intro" style={{ opacity: lightsOpacity, x: lightsX }} aria-hidden="true">
          <span className="wellmate-boot-grid" />
          <span className="wellmate-boot-siren siren-red" />
          <span className="wellmate-boot-siren siren-blue" />
          <span className="wellmate-boot-flash flash-red" />
          <span className="wellmate-boot-flash flash-blue" />
          <div className="wellmate-boot-scanline" />
          <div className="wellmate-boot-noise" />
        </motion.div>

        <div className="wellmate-boot-content" aria-live="polite">
          {beat && (
            <div key={beat.title} className={`wellmate-boot-beat is-${beat.tone} wellmate-boot-beat-visible`}>
              <div className="wellmate-boot-copy">
                <p>{beat.eyebrow}</p>
                <h2>{beat.title}</h2>
                <span className="wellmate-boot-progress">0{activeBeat + 1} / 06</span>
              </div>
            </div>
          )}
        </div>

        <motion.div className="wellmate-boot-reveal" style={{ opacity: revealOpacity, scale: revealScale }} aria-hidden="true">
          <div className="wellmate-boot-reveal-line" />
        </motion.div>

        <button className="wellmate-boot-skip" type="button" onClick={finish}>SKIP INTRO</button>
        <span className="wellmate-boot-scroll">SCROLL TO CONTINUE ↓</span>
      </div>
    </section>
  )
}
