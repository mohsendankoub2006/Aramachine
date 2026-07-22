"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "./ThemeProvider"

const projects = [
  { title: "مجتمع‌های پتروشیمی", category: "پایش فرآیند و هوش مصنوعی", year: "صنعت هدف اصلی", color: "from-gold/20 to-transparent" },
  { title: "پالایشگاه‌های نفت و گاز", category: "نگهداری پیش‌بینانه کمپرسورها", year: "صنایع مادر", color: "from-orange/20 to-transparent" },
  { title: "واحدهای الفین و آروماتیک", category: "کنترل فرآیند و بهینه‌سازی انرژی", year: "خطوط فرآیندی", color: "from-gold/20 to-transparent" },
  { title: "تاسیسات یوتیلیتی و نیروگاهی", category: "پایش بویلرها و توربین‌ها", year: "پشتیبانی تولید", color: "from-blue/20 to-transparent" },
  { title: "صنایع شیمیایی و پلیمر", category: "تأمین تجهیزات ابزار دقیق", year: "تأمین صنعتی", color: "from-blue/20 to-transparent" },
  { title: "شبکه‌های انتقال و خطوط لوله", category: "سنسورهای مانیتورینگ لرزش", year: "پایش آنلاین", color: "from-gold/20 to-transparent" },
]

export default function Projects() {
  const { t } = useTheme()
  const ref = useRef(null)

  return (
    <section id="projects" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16">
          <span className="inline-block px-4 py-1 border border-theme text-muted text-xs uppercase tracking-[0.2em] mb-6">{t("projects.badge")}</span>
          <h2 className="font-display text-5xl sm:text-7xl tracking-wider text-theme">{t("projects.title")} <span className="text-gradient-gold">⛰</span></h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden border border-theme hover:border-gold/30 hover-border-glow hover-lift transition-all duration-300"
            >
              <div className={`aspect-[4/3] bg-elevated bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                <div className="text-center">
                  <div className="font-display text-6xl text-faint group-hover:text-theme-20 transition-all duration-300">
                    {(i + 1).toString().padStart(2, "0")}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-[0.15em] text-gold/60">{project.category}</span>
                  <span className="text-xs text-faint font-mono">{project.year}</span>
                </div>
                <h3 className="font-display text-2xl tracking-wider text-theme group-hover:text-gold transition-all duration-300">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}