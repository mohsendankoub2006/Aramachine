"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "./ThemeProvider"

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const counted = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          const duration = 2000, steps = 60, increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) { setCount(target); clearInterval(timer) }
            else setCount(Math.floor(current))
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <div ref={ref} className="font-display text-5xl sm:text-6xl lg:text-7xl text-gradient-gold">{count}{suffix}</div>
}

const stats = [
  { target: 50, suffix: "%", label: "کاهش توقف‌های اضطراری", desc: "کاهش توقف ناخواسته تولید با پیش‌بینی زودهنگام خرابی[cite: 3]." },
  { target: 30, suffix: "%", label: "کاهش هزینه تعمیرات", desc: "تبدیل تعمیرات اضطراری به برنامه‌ریزی هدفمند[cite: 3]." },
  { target: 15, suffix: "%", label: "صرفه‌جویی در انرژی", desc: "بهینه‌سازی مصرف بخار، برق و سوخت بویلرها[cite: 3]." },
  { target: 90, suffix: "روز", label: "پیش‌بینی خرابی قبل وقوع", desc: "کشف زودهنگام فرسودگی یاتاقان‌ها و قطعات دوار[cite: 2]." },
]

export default function Stats() {
  const { t } = useTheme()

  return (
    <section className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block px-4 py-1 border border-theme text-muted text-xs uppercase tracking-[0.2em] mb-6">{t("stats.badge")}</span>
          <h2 className="font-display text-5xl sm:text-7xl tracking-wider text-theme">{t("stats.title")} <span className="text-gradient-gold">⛰</span></h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 border border-theme hover:border-gold/30 hover-border-glow transition-all duration-500 group"
            >
              <Counter target={stat.target} suffix={stat.suffix} />
              <div className="mt-3 text-sm uppercase tracking-[0.15em] text-theme-60 font-medium">{stat.label}</div>
              <p className="mt-2 text-xs text-faint leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}