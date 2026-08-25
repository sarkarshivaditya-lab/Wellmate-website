import { useEffect, useRef, useState, type RefObject } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform, useMotionTemplate, type MotionValue } from 'motion/react'

const beats = [
  { eyebrow: 'THE GOLDEN HOUR', title: 'Thousands of people die everyday because...', tone: 'neutral' },
  { eyebrow: 'THE FIRST FAILURE', title: 'no one called the paramedics...', tone: 'red' },
  { eyebrow: 'THE SECOND FAILURE', title: 'the paramedics werent informed fast enough...', tone: 'blue' },
  { eyebrow: 'THE THIRD FAILURE', title: "the paramedics spend too much of precious time testing patient's blood sample for correct blood type and allergies...", tone: 'clinical' },
  { eyebrow: 'ENOUGH WAITING', title: 'BUT NOT ANYMORE', tone: 'impact' },
  { eyebrow: 'EMERGENCY CARE, REIMAGINED', title: 'INTRODUCING WELLMATE', tone: 'brand' },
] as const

function BootBeat({ index, beat, progress }: { index: number; beat: typeof beats[number]; progress: MotionValue<number> }) {
  const start = 0.08 + index * 0.145
  const peak = start + 0.045
  const end = start + 0.105
  const opacity = useTransform(progress, [start, peak, end], [0, 1, 0])
  const y = useTransform(progress, [start, peak, end], [42, 0, -30])
  const scale = useTransform(progress, [start, peak, end], [0.97, 1, 1.015])
  const blur = useTransform(progress, [start, peak, end], ['blur(8px)', 'blur(0px)', 'blur(5px)'])
  const filter = useMotionTemplate`${blur}`

  return (
    <motion.div className={`wellmate-boot-beat is-${beat.tone}`} style={{ opacity, y, scale }}>
      <motion.div className="wellmate-boot-copy" style={{ filter }}>
        <p>{beat.eyebrow}</p>
        <h2>{beat.title}</h2>
        <span className="wellmate-boot-progress">0{index + 1} / 06</span>
      </motion.div>
    </motion.div>
  )
}

export function WellmateBoot({ landingRef }: { landingRef?: RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLElement>(null)
  const [finished, setFinished] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const introOpacity = useTransform(scrollYProgress, [0, 0.045, 0.095], [1, 1, 0])
  const revealOpacity = useTransform(scrollYProgress, [0.88, 0.96, 1], [0, 0.55, 1])
  const revealScale = useTransform(scrollYProgress, [0.88, 1], [0.96, 1])

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

  return (
    <section ref={ref} className="wellmate-boot" aria-label="WellMate cinematic introduction">
      <div className="wellmate-boot-sticky">
        <motion.div className="wellmate-boot-intro" style={{ opacity: introOpacity }} aria-hidden="true">
          <span className="wellmate-boot-grid" />
          <span className="wellmate-boot-siren siren-red" />
          <span className="wellmate-boot-siren siren-blue" />
          <span className="wellmate-boot-flash flash-red" />
          <span className="wellmate-boot-flash flash-blue" />
          <div className="wellmate-boot-scanline" />
          <div className="wellmate-boot-noise" />
        </motion.div>

        <div className="wellmate-boot-content">
          {beats.map((beat, index) => <BootBeat key={beat.title} index={index} beat={beat} progress={scrollYProgress} />)}
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
