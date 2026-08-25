import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const beats = [
  { eyebrow: 'THE GOLDEN HOUR', title: 'Thousands of people die everyday because...', tone: 'neutral' },
  { eyebrow: 'THE FIRST FAILURE', title: 'no one called the paramedics...', tone: 'red' },
  { eyebrow: 'THE SECOND FAILURE', title: 'the paramedics werent informed fast enough...', tone: 'blue' },
  { eyebrow: 'THE THIRD FAILURE', title: 'the paramedics spend too much of precious time testing patient\'s blood sample for correct blood type and allergies...', tone: 'clinical' },
  { eyebrow: 'ENOUGH WAITING', title: 'BUT NOT ANYMORE', tone: 'impact' },
  { eyebrow: 'EMERGENCY CARE, REIMAGINED', title: 'INTRODUCING WELLMATE', tone: 'brand' },
]

function toneClass(tone: string) {
  return `wellmate-boot-beat is-${tone}`
}

function BootBeat({ index, beat, progress }: { index: number; beat: typeof beats[number]; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const start = 0.17 + index * 0.13
  const peak = start + 0.055
  const end = start + 0.115
  const opacity = useTransform(progress, [start, peak, end], [0, 1, 0])
  const y = useTransform(progress, [start, peak, end], [34, 0, -28])
  const scale = useTransform(progress, [start, peak, end], [0.985, 1, 1.01])
  const blur = useTransform(progress, [start, peak, end], [6, 0, 5], { clamp: true })

  return (
    <motion.div key={beat.title} className={toneClass(beat.tone)} style={{ opacity, y, scale }}>
      <motion.div className="wellmate-boot-copy" style={{ filter: blur.get() === 0 ? 'blur(0px)' : `blur(${blur.get()}px)` }}>
        <p>{beat.eyebrow}</p>
        <h2>{beat.title}</h2>
        <span className="wellmate-boot-progress">0{index + 1} / 06</span>
      </motion.div>
    </motion.div>
  )
}

export function WellmateBoot() {
  const ref = useRef<HTMLElement>(null)
  const [isFinished, setIsFinished] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.18], [1, 1, 0])
  const revealOpacity = useTransform(scrollYProgress, [0.82, 0.9, 1], [0, 0.35, 1])
  const revealScale = useTransform(scrollYProgress, [0.82, 1], [0.96, 1])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFinished(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (isFinished) return null

  return (
    <section ref={ref} className="wellmate-boot" aria-label="WellMate introduction">
      <div className="wellmate-boot-sticky">
        <motion.div className="wellmate-boot-intro" style={{ opacity: introOpacity }} aria-hidden="true">
          <span className="wellmate-boot-grid" />
          <span className="wellmate-boot-siren siren-red" />
          <span className="wellmate-boot-siren siren-blue" />
          <div className="wellmate-boot-scanline" />
          <div className="wellmate-boot-noise" />
        </motion.div>

        <div className="wellmate-boot-content">
          {beats.map((beat, index) => <BootBeat key={beat.title} index={index} beat={beat} progress={scrollYProgress} />)}
        </div>

        <motion.div className="wellmate-boot-reveal" style={{ opacity: revealOpacity, scale: revealScale }} aria-hidden="true">
          <div className="wellmate-boot-reveal-line" />
        </motion.div>

        <button className="wellmate-boot-skip" type="button" onClick={() => setIsFinished(true)}>SKIP INTRO</button>
        <span className="wellmate-boot-scroll">SCROLL TO CONTINUE ↓</span>
      </div>
    </section>
  )
}
