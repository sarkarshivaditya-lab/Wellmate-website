import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { Activity, ArrowDown, ArrowRight, Brain, Utensils } from 'lucide-react'
import { SignupButton } from './auth'

const screens = [
  { src:'/screens/overview.svg', alt:'WellMate overview screen' },
]

export function OriginalHero(){
  const hero = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: hero, offset:['start start','end start'] })
  const scale = useSpring(useTransform(scrollYProgress,[0,1],[1,.9]),{stiffness:80,damping:20})
  const y = useTransform(scrollYProgress,[0,1],[0,100])
  const jump = (id:string)=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'})

  return <section ref={hero} className="hero">
    <motion.div className="hero-copy" style={{y}}>
      <motion.p className="kicker" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.25}}>A NEW KIND OF WELLBEING COMPANION</motion.p>
      <motion.h1 initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:.4,duration:.9}}>Your whole<br/><em>self, understood.</em></motion.h1>
      <motion.p className="hero-lede" initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:.65}}>WellMate brings nutrition, movement, sleep, habits and mental wellbeing together — then turns what you log into guidance from your personal AI companion.</motion.p>
      <motion.div className="hero-actions" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.85}}>
        <SignupButton className="primary" onFallback={()=>jump('access')}>Get WellMate <ArrowRight size={16}/></SignupButton>
        <button className="quiet-button" onClick={()=>jump('experience')}>See the product <ArrowDown size={16}/></button>
      </motion.div>
    </motion.div>
    <motion.div className="hero-product" style={{scale}}>
      <div className="hero-glow"/>
      <div className="floating-label one"><Utensils size={14}/> NUTRITION</div>
      <div className="floating-label two"><Activity size={14}/> MOVEMENT</div>
      <div className="floating-label three"><Brain size={14}/> MENTAL</div>
      <div className="device-frame hero-device"><div className="device-notch"/><img src={screens[0].src} alt={screens[0].alt}/></div>
    </motion.div>
    <div className="hero-foot"><span>THE PERSONAL WELLBEING SYSTEM</span><span>SCROLL TO EXPLORE ↓</span></div>
  </section>
}
