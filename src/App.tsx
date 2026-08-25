import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowRight, Check, Menu, X } from 'lucide-react'

const productScreens = [
  { src: '/screens/overview.png', alt: 'WellMate overview showing wellness at a glance, activity, habits, health areas and weekly review.', label: 'ONE VIEW', title: 'See the whole picture.', copy: 'Sleep, activity, nutrition and habits come together in one calm overview instead of being scattered across different tools.' },
  { src: '/screens/physical.png', alt: 'WellMate physical health screen with activity insights and weekly activity.', label: 'PHYSICAL', title: 'Know what your body is telling you.', copy: 'Track workouts, activity, recovery and nutrition so the numbers have context — and become useful.' },
  { src: '/screens/nutrition.png', alt: 'WellMate nutrition screen showing daily macros, nutrient distribution and meals.', label: 'NUTRITION', title: 'Every meal becomes context.', copy: 'Log what you eat and build a picture of calories, protein, fats, carbohydrates and the patterns behind them.' },
  { src: '/screens/habits.png', alt: 'WellMate habits screen showing consistency and a daily habit.', label: 'HABITS', title: 'Make consistency visible.', copy: 'Turn small actions into rhythms you can actually see, understand and continue.' },
  { src: '/screens/mental.png', alt: 'WellMate mental wellbeing screen with journal, coach and wellbeing tools.', label: 'MENTAL WELLBEING', title: 'A place to talk things through.', copy: 'WellMate combines mood, reflection and a calm conversational space for the moments when you need support.' },
]

const disciplines = [
  { eyebrow: '01 — NUTRITION', title: 'Eat with context.', copy: 'Meal logging and nutrient tracking give WellMate the information it needs to understand how your intake fits into the rest of your day.' },
  { eyebrow: '02 — MOVEMENT', title: 'Train with purpose.', copy: 'Workouts and activity become part of the same picture as recovery, habits and how you feel.' },
  { eyebrow: '03 — RECOVERY', title: 'Sleep is part of the plan.', copy: 'Track sleep and recovery alongside the rest of your wellbeing, because a good day does not begin with a workout alone.' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [activeScreen, setActiveScreen] = useState(0)
  const orbX = useMotionValue(0)
  const orbY = useMotionValue(0)
  const smoothX = useSpring(orbX, { stiffness: 90, damping: 24 })
  const smoothY = useSpring(orbY, { stiffness: 90, damping: 24 })
  const tiltX = useTransform(smoothY, [-300, 300], [7, -7])
  const tiltY = useTransform(smoothX, [-500, 500], [-7, 7])

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
          <button onClick={() => jump('experience')}>Product</button>
          <button onClick={() => jump('intelligence')}>WellMate AI</button>
          <button onClick={() => jump('access')}>Join</button>
        </nav>
        <button className="header-cta" onClick={() => jump('access')}>Get WellMate <ArrowRight size={15} /></button>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            YOUR WELLBEING, IN ONE PLACE.
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }}>
            Know your<br /><em>whole self.</em>
          </motion.h1>
          <motion.p className="hero-copy-text" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
            WellMate brings nutrition, movement, sleep, habits and mental wellbeing together — then turns what you log into guidance from your personal AI companion.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}>
            <button className="button button-dark" onClick={() => jump('access')}>Join WellMate <ArrowRight size={16} /></button>
            <button className="text-button" onClick={() => jump('experience')}>See the product <ArrowDown size={16} /></button>
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
            <div className="core-copy"><span>W</span><small>PERSONAL WELLBEING</small></div>
          </div>
          <div className="orb-label label-one">NUTRITION</div>
          <div className="orb-label label-two">MOVEMENT</div>
          <div className="orb-label label-three">MENTAL</div>
        </motion.div>

        <div className="hero-edge-note">One system. One companion. Your life.</div>
      </section>

      <section id="experience" className="manifesto section-wrap">
        <div className="section-meta">THE PRODUCT</div>
        <div className="manifesto-content">
          <p className="display-copy">Wellness is connected. Your tools should be too.</p>
          <p className="body-copy">A meal can affect energy. Sleep can affect mood. Habits can affect consistency. WellMate is built around those connections so your health data stops being a collection of isolated numbers.</p>
        </div>
      </section>

      <section className="screen-story" aria-label="WellMate product screens">
        <div className="screen-stage">
          <div className="screen-stage-copy">
            <p className="section-meta">INSIDE WELLMATE</p>
            <h2>{productScreens[activeScreen].title}</h2>
            <p>{productScreens[activeScreen].copy}</p>
            <div className="screen-tabs" role="tablist" aria-label="WellMate screens">
              {productScreens.map((screen, index) => (
                <button key={screen.label} className={index === activeScreen ? 'screen-tab active' : 'screen-tab'} onClick={() => setActiveScreen(index)} role="tab" aria-selected={index === activeScreen}>
                  <span>{String(index + 1).padStart(2, '0')}</span>{screen.label}
                </button>
              ))}
            </div>
          </div>
          <motion.div className="device-frame" key={productScreens[activeScreen].src} initial={{ opacity: 0, y: 28, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .6, ease: [0.16, 1, .3, 1] }}>
            <div className="device-glow" />
            <div className="device-shell">
              <img src={productScreens[activeScreen].src} alt={productScreens[activeScreen].alt} />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="disciplines" aria-label="Core wellbeing tracking">
        {disciplines.map((item, index) => (
          <motion.article className="discipline" key={item.eyebrow} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-12% 0px' }} transition={{ duration: 0.75, delay: index * 0.08 }}>
            <div className="discipline-index">{item.eyebrow}</div>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
            <div className="discipline-line" />
          </motion.article>
        ))}
      </section>

      <section id="intelligence" className="intelligence section-wrap">
        <div className="section-meta">THE INTELLIGENCE LAYER</div>
        <div className="intelligence-stage">
          <div className="intel-copy">
            <p className="eyebrow">MEET WELLMATE</p>
            <h2>Your personal<br /><em>wellbeing team.</em></h2>
            <p>WellMate is designed to feel less like a chatbot and more like a companion: a personal trainer for your activity, a nutrition guide for your meals, and a mental wellbeing advisor when life gets heavy.</p>
            <div className="signal-list">
              {['Personal trainer', 'Nutrition companion', 'Mental wellbeing advisor'].map((item) => <div className="signal" key={item}><Check size={14} />{item}</div>)}
            </div>
          </div>
          <motion.div className="intel-panel" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <div className="panel-header"><span>WELLMATE / PERSONAL AI</span><span>LIVE CONTEXT</span></div>
            <div className="panel-title">Your data becomes<br /><em>conversation.</em></div>
            <div className="context-orbit" aria-hidden="true"><span className="context-node node-a">MEALS</span><span className="context-node node-b">SLEEP</span><span className="context-node node-c">ACTIVITY</span><span className="context-node node-d">MOOD</span><div className="context-core">W</div></div>
            <div className="panel-insight"><span className="insight-dot" />WellMate combines what you track to give advice that is grounded in your actual routine, not a generic wellness checklist.</div>
            <div className="panel-footer"><span>PERSONAL CONTEXT</span><ArrowRight size={14} /></div>
          </motion.div>
        </div>
      </section>

      <section className="ai-chat section-wrap">
        <div className="section-meta">HOW WELLMATE HELPS</div>
        <div className="chat-layout">
          <div className="chat-copy">
            <p className="eyebrow">ASK WELL MATE ANYTHING</p>
            <h2>From “what should I eat?” to “I had a hard day.”</h2>
            <p>WellMate is there for the practical questions and the human ones — using your personal context to make the answer more relevant.</p>
          </div>
          <div className="chat-window">
            <div className="chat-head"><div><strong>WellMate</strong><span>Your personal wellbeing companion</span></div><span className="online-dot">●</span></div>
            <div className="chat-bubble user-bubble">I slept badly and I’m feeling drained today. Should I still work out?</div>
            <div className="chat-bubble ai-bubble">Let’s look at the whole picture. Your sleep was shorter than usual, and you’ve already logged a meal. A lighter session may make more sense today. Want me to suggest one?</div>
            <div className="chat-options"><button>Suggest a workout <ArrowRight size={14} /></button><button>Tell me what to eat <ArrowRight size={14} /></button></div>
          </div>
        </div>
      </section>

      <section className="quiet section-wrap">
        <div className="quiet-word">More<br /><em>context.</em></div>
        <div className="quiet-copy"><p>The better WellMate understands your routine, the more useful its guidance can become.</p></div>
      </section>

      <section id="access" className="access section-wrap">
        <div className="access-panel">
          <div>
            <p className="eyebrow">JOIN WELLMATE</p>
            <h2>Make your wellbeing<br /><em>one conversation.</em></h2>
          </div>
          <div className="access-form-wrap">
            {submitted ? (
              <div className="success-state"><Check size={18} /><strong>You are on the list.</strong><span>We’ll see you inside.</span></div>
            ) : (
              <form className="access-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Your email</label>
                <div className="form-row"><input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit">Join WellMate <ArrowRight size={16} /></button></div>
                <p>A simple way to be first in when WellMate is ready.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="footer section-wrap">
        <div className="footer-brand"><span className="wordmark-mark">W</span><span>WELLMATE</span></div>
        <p>Built around the whole person.</p>
        <button onClick={() => jump('top')}>Back to top <ArrowRight size={15} /></button>
      </footer>
    </main>
  )
}

export default App
