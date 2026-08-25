import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowRight, Check, Menu, X } from 'lucide-react'

const disciplines = [
  {
    eyebrow: '01 — Mind',
    title: 'A quieter mind\nchanges everything.',
    copy: 'Mood, journaling and mental wellness become part of the same picture — not another app you have to remember.',
  },
  {
    eyebrow: '02 — Body',
    title: 'Your body\nspeaks in patterns.',
    copy: 'Sleep, movement and nutrition move together. WellMate helps you notice what your day is trying to tell you.',
  },
  {
    eyebrow: '03 — Rhythm',
    title: 'Small rituals.\nRemarkable change.',
    copy: 'Habits become meaningful when they connect to how you actually feel, recover and perform.',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const orbX = useMotionValue(0)
  const orbY = useMotionValue(0)
  const smoothX = useSpring(orbX, { stiffness: 90, damping: 24 })
  const smoothY = useSpring(orbY, { stiffness: 90, damping: 24 })
  const tiltX = useTransform(smoothY, [-300, 300], [7, -7])
  const tiltY = useTransform(smoothX, [-500, 500], [-7, 7])
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      orbX.set(event.clientX - window.innerWidth / 2)
      orbY.set(event.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [orbX, orbY])

  const jump = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <button className="wordmark" onClick={() => jump('top')} aria-label="WellMate home">
          <span className="wordmark-mark">W</span>
          <span>WELLMATE</span>
        </button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Primary navigation">
          <button onClick={() => jump('experience')}>Experience</button>
          <button onClick={() => jump('intelligence')}>Intelligence</button>
          <button onClick={() => jump('access')}>Access</button>
        </nav>
        <button className="header-cta" onClick={() => jump('access')}>Join the list <ArrowRight size={15} /></button>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <section id="top" ref={heroRef} className="hero">
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            WELLNESS, RECOMPOSED.
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }}>
            One life.<br /><em>In balance.</em>
          </motion.h1>
          <motion.p className="hero-copy-text" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
            WellMate brings your mind, body and daily rhythm into one intelligent view — so feeling better starts to feel simpler.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}>
            <button className="button button-dark" onClick={() => jump('access')}>Get early access <ArrowRight size={16} /></button>
            <button className="text-button" onClick={() => jump('experience')}>Explore WellMate <ArrowDown size={16} /></button>
          </motion.div>
        </div>

        <motion.div
          className="hero-orbit"
          style={{ rotateX: tiltX, rotateY: tiltY }}
          initial={{ opacity: 0, scale: 0.84, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.3, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="orbit-glow" />
          <div className="orbit-ring ring-one" />
          <div className="orbit-ring ring-two" />
          <div className="orb-core">
            <div className="core-sheen" />
            <div className="core-copy"><span>W</span><small>WHOLE SELF</small></div>
          </div>
          <div className="orb-label label-one">MIND</div>
          <div className="orb-label label-two">BODY</div>
          <div className="orb-label label-three">RHYTHM</div>
        </motion.div>

        <div className="hero-edge-note">Designed around the human, not the dashboard.</div>
      </section>

      <section id="experience" className="manifesto section-wrap">
        <div className="section-meta">THE IDEA</div>
        <div className="manifesto-content">
          <p className="display-copy">You are not a collection of metrics.</p>
          <p className="body-copy">Sleep affects your mood. Your mood affects your habits. Your habits shape your energy. WellMate is designed around those connections — because your life is one system.</p>
        </div>
      </section>

      <section className="disciplines" aria-label="WellMate disciplines">
        {disciplines.map((item, index) => (
          <motion.article className="discipline" key={item.eyebrow} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-12% 0px' }} transition={{ duration: 0.75, delay: index * 0.08 }}>
            <div className="discipline-index">{item.eyebrow}</div>
            <h2>{item.title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h2>
            <p>{item.copy}</p>
            <div className="discipline-line" />
          </motion.article>
        ))}
      </section>

      <section id="intelligence" className="intelligence section-wrap">
        <div className="section-meta">THE INTELLIGENCE LAYER</div>
        <div className="intelligence-stage">
          <div className="intel-copy">
            <p className="eyebrow">PERSONAL, NOT GENERIC</p>
            <h2>It learns<br /><em>your</em> rhythm.</h2>
            <p>WellMate turns the things you log into context. The more you use it, the more useful the guidance becomes — less noise, more signal.</p>
            <div className="signal-list">
              {['Context over clutter', 'Patterns over snapshots', 'Guidance over guilt'].map((item) => <div className="signal" key={item}><Check size={14} />{item}</div>)}
            </div>
          </div>
          <motion.div className="intel-panel" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <div className="panel-header"><span>WELLMATE / TODAY</span><span>09:41</span></div>
            <div className="panel-title">Your week is<br /><em>starting to speak.</em></div>
            <div className="pulse-row"><span>RECOVERY</span><strong>↑ 12%</strong></div>
            <div className="pulse-chart"><span className="chart-fill" /></div>
            <div className="panel-insight"><span className="insight-dot" />Sleep has been steadier for 4 days. Your mood entries are following the same direction.</div>
            <div className="panel-footer"><span>PERSONAL INSIGHT</span><ArrowRight size={14} /></div>
          </motion.div>
        </div>
      </section>

      <section className="quiet section-wrap">
        <div className="quiet-word">Less<br /><em>noise.</em></div>
        <div className="quiet-copy"><p>One place to understand how you are doing. One place to start making the next day better.</p></div>
      </section>

      <section id="access" className="access section-wrap">
        <div className="access-panel">
          <div>
            <p className="eyebrow">EARLY ACCESS</p>
            <h2>Meet the version<br /><em>of wellness</em><br />that knows you.</h2>
          </div>
          <div className="access-form-wrap">
            {submitted ? (
              <div className="success-state"><Check size={18} /><strong>You are on the list.</strong><span>We’ll see you inside.</span></div>
            ) : (
              <form className="access-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Your email</label>
                <div className="form-row"><input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit">Request access <ArrowRight size={16} /></button></div>
                <p>No noise. Just your invitation when WellMate is ready.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="footer section-wrap">
        <div className="footer-brand"><span className="wordmark-mark">W</span><span>WELLMATE</span></div>
        <p>Built for a life that is bigger than the numbers.</p>
        <button onClick={() => jump('top')}>Back to top <ArrowRight size={15} /></button>
      </footer>
    </main>
  )
}

export default App
