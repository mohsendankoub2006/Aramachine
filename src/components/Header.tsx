"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "./ThemeProvider"

const navLinks = [
  { labelKey: "nav.home", href: "#hero" },
  { labelKey: "nav.about", href: "#about" },
  { labelKey: "nav.services", href: "#services" },
  { labelKey: "nav.work", href: "#projects" },
  { labelKey: "nav.skills", href: "#skills" },
  { labelKey: "nav.contact", href: "#contact" },
]

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Header() {
  const { theme, lang, toggleTheme, toggleLang, t } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* بخش لوگو و نام برند با تنظیمات موقعیت و رنگ زرد */}
        <a 
          href="#hero" 
          className={`flex items-center group shrink-0 cursor-pointer transition-transform duration-500 translate-y-1 ${
            lang === "fa" ? "lg:-translate-x-10" : "lg:translate-x-10"
          }`}
        >
          <img
            src="/images/logo.jpg"
            alt="AraMachine Logo"
            className="h-20 lg:h-24 w-auto object-contain relative z-10 transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_0_8px_rgba(212,168,67,0.3)]"
          />
          <div className="grid overflow-hidden transition-all duration-500 ease-in-out grid-cols-[0fr] opacity-0 group-hover:grid-cols-[1fr] group-hover:opacity-100">
            <div className="min-w-0 flex items-center pl-2">
              <span className="font-display text-xl tracking-widest whitespace-nowrap">
                <span className="text-gold font-bold">ARA</span>{" "}
                <span className="text-gold font-semibold">MACHINE</span>
              </span>
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm uppercase tracking-[0.15em] text-muted hover:text-gold transition-colors duration-300 font-medium">
              {t(link.labelKey)}
            </a>
          ))}

          <div className="flex items-center gap-2 ml-4">
            <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center border border-theme text-muted hover:text-gold hover:border-gold/40 hover-glow transition-all duration-300" aria-label="Switch theme">
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            <button onClick={toggleLang} className="w-10 h-9 flex items-center justify-center border border-theme text-muted hover:text-gold hover:border-gold/40 hover-glow transition-all duration-300" aria-label="Switch language">
              <span className="text-[11px] font-mono font-bold tracking-wider">{lang === "en" ? "FA" : "EN"}</span>
            </button>
          </div>

          <a href="#contact" className="px-6 py-2.5 border border-gold/40 text-gold text-sm uppercase tracking-widest hover:bg-gold hover:text-[var(--navy)] hover-lift transition-all duration-300">
            {t("cta.start")}
          </a>
        </nav>

        <div className="flex lg:hidden items-center gap-2">
          <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center border border-theme text-muted hover:text-gold hover-glow transition-all duration-300">
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button onClick={toggleLang} className="w-10 h-9 flex items-center justify-center border border-theme text-muted hover:text-gold hover-glow transition-all duration-300">
            <span className="text-[11px] font-mono font-bold tracking-wider">{lang === "en" ? "FA" : "EN"}</span>
          </button>

          <button className="flex flex-col gap-1.5 w-8 h-8 items-center justify-center ml-1" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`block h-0.5 w-6 bg-theme transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1" : ""}`} />
            <span className={`block h-0.5 w-6 bg-theme transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-theme transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="lg:hidden glass border-t border-theme">
            <div className="px-6 py-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-lg uppercase tracking-widest text-muted hover:text-gold transition-colors">
                  {t(link.labelKey)}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-4 px-6 py-3 border border-gold/40 text-gold text-center uppercase tracking-widest hover:bg-gold hover:text-[var(--navy)] hover-lift transition-all duration-300">
                {t("cta.start")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}