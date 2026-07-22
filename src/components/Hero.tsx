"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "./ThemeProvider"

const slides = [
  {
    id: 1,
    titleKey: "slide.1.title",
    subtitleKey: "slide.1.subtitle",
    captionKey: "slide.1.caption",
    gradient: "from-[#0a1628] via-[#1a3a6a] to-[#0a1628]",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=80",
    ornament: (
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-[0.07]">
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#d4a843"/><stop offset="100%" stopColor="#1e4a8a"/></linearGradient></defs>
        <circle cx="200" cy="200" r="180" fill="none" stroke="url(#g1)" strokeWidth="0.5" />
        <path d="M200,20 L380,200 L200,380 L20,200 Z" fill="none" stroke="url(#g1)" strokeWidth="0.3" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 2,
    titleKey: "slide.2.title",
    subtitleKey: "slide.2.subtitle",
    captionKey: "slide.2.caption",
    gradient: "from-[#0a1628] via-[#e85d04]/20 to-[#0a1628]",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb1475f52?auto=format&fit=crop&w=1400&q=80",
    ornament: (
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-[0.07]">
        <defs><linearGradient id="g2" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#e85d04"/><stop offset="100%" stopColor="#d4a843"/></linearGradient></defs>
        <polygon points="200,40 360,320 40,320" fill="none" stroke="url(#g2)" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    id: 3,
    titleKey: "slide.3.title",
    subtitleKey: "slide.3.subtitle",
    captionKey: "slide.3.caption",
    gradient: "from-[#0a1628] via-[#1a3060] to-[#0a1628]",
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e7f?auto=format&fit=crop&w=1400&q=80",
    ornament: (
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-[0.07]">
        <defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c8c8c8"/><stop offset="100%" stopColor="#1e4a8a"/></linearGradient></defs>
        <rect x="60" y="60" width="280" height="280" fill="none" stroke="url(#g3)" strokeWidth="0.5" rx="40" />
      </svg>
    ),
  },
  {
    id: 4,
    titleKey: "slide.4.title",
    subtitleKey: "slide.4.subtitle",
    captionKey: "slide.4.caption",
    gradient: "from-[#0a1628] via-[#0f2240] to-[#0a1628]",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80",
    ornament: (
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-[0.07]">
        <defs><linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c8c8c8"/><stop offset="100%" stopColor="#0a1628"/></linearGradient></defs>
        <ellipse cx="200" cy="200" rx="60" ry="20" fill="none" stroke="url(#g4)" strokeWidth="0.3" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: 5,
    titleKey: "slide.5.title",
    subtitleKey: "slide.5.subtitle",
    captionKey: "slide.5.caption",
    gradient: "from-[#0a1628] via-[#d4a843]/15 to-[#0a1628]",
    image: "https://images.unsplash.com/photo-1563694982-5b4a3b2c8a7e?auto=format&fit=crop&w=1400&q=80",
    ornament: (
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-[0.07]">
        <polygon points="200,30 370,150 310,320 90,320 30,150" fill="none" stroke="#d4a843" strokeWidth="0.5" />
      </svg>
    ),
  },
]

const sliceVariants = {
  initial: (d: number) => ({ clipPath: d > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }),
  animate: { clipPath: "inset(0 0 0 0)", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
  exit: (d: number) => ({ clipPath: d > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }),
}

export default function Hero() {
  const { t } = useTheme()
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [progress, setProgress] = useState(0)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % slides.length)
    setProgress(0)
  }, [])

  useEffect(() => {
    const duration = 6000
    const interval = 50
    const step = (interval / duration) * 100
    const timer = setInterval(() => setProgress((p) => Math.min(p + step, 100)), interval)
    const slideTimer = setInterval(next, duration)
    return () => { clearInterval(timer); clearInterval(slideTimer) }
  }, [next])

  const slide = slides[current]

  return (
    <section id="hero" className="relative h-screen overflow-hidden bg-[var(--bg)]">
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div key={slide.id} custom={direction} variants={sliceVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
          <div className="absolute inset-0 opacity-[0.15] mix-blend-screen" style={{ backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
          {slide.ornament}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div key={`content-${slide.id}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, delay: 0.25 }} className="max-w-3xl">
              <span className="inline-block font-mono text-xs uppercase tracking-[0.25em] text-gold/70 border border-gold/20 px-4 py-1.5 mb-8">
                {t("hero.badge")}
              </span>
              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-none tracking-wider text-theme mb-3">
                {t(slide.titleKey)}
              </h1>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-wider text-muted mb-5">
                {t(slide.subtitleKey)}
              </h2>
              <p className="text-base sm:text-lg text-theme-40 max-w-xl leading-relaxed">
                {t(slide.captionKey)}
              </p>
              <div className="mt-10 flex gap-4">
                <a href="#contact" className="px-8 py-3.5 bg-gold text-[var(--navy)] font-bold uppercase tracking-widest text-sm hover:bg-gold-light hover-lift transition-all duration-300">
                  {t("cta.quote")}
                </a>
                <a href="#about" className="px-8 py-3.5 border border-theme-20 text-theme uppercase tracking-widest text-sm hover:border-gold hover:text-gold transition-all duration-300">
                  {t("cta.explore")}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <div key={i} className={`h-[2px] transition-all duration-500 ${i === current ? "w-12 bg-gold" : "w-6 bg-theme-15 hover:bg-theme-30"}`} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-theme-5">
        <motion.div className="h-full bg-gradient-to-r from-gold via-orange to-gold" style={{ width: `${progress}%` }} />
      </div>
    </section>
  )
}