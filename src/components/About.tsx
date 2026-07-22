"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useTheme } from "./ThemeProvider"

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "پایش بلادرنگ",
    desc: "پردازش لحظه‌ای هزاران سیگنال عملیاتی (Tag) و صدور هشدارهای پیش‌بینانه زیر ۵ ثانیه[cite: 1].",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "دقت و ایمنی OT",
    desc: "ارتباط کاملاً Read-Only با DCS/SCADA طبق الزامات پدافند غیرعامل و IEC 62443[cite: 1].",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "تحول دیجیتال",
    desc: "کاهش توقف‌های ناخواسته، ماندگاری دانش سازمانی و دستیابی به بهره‌وری صنعت نسل ۴[cite: 1, 2].",
  },
]

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative p-8 border border-theme hover:border-gold/30 hover-border-glow transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="text-gold mb-6">{pillar.icon}</div>
        <h3 className="font-display text-2xl tracking-wider text-theme mb-4">{pillar.title}</h3>
        <p className="text-muted text-sm leading-relaxed">{pillar.desc}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
  const { t } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-center mb-20">
          <span className="inline-block px-4 py-1 border border-theme text-muted text-xs uppercase tracking-[0.2em] mb-6">
            {t("about.badge")}
          </span>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-wider text-theme">
            <span className="text-gradient-gold">{t("about.title")}</span>
          </h2>
          <p className="mt-6 text-muted max-w-2xl mx-auto text-sm leading-relaxed">
            {t("about.desc")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>

        <div className="mt-24 grid md:grid-cols-4 gap-8">
          {[
            { value: "50K+", label: "تگ فرآیندی/ثانیه (High Throughput)" },
            { value: "<5s", label: "تأخیر هشداردهی (Low Latency)" },
            { value: "90 Days", label: "پیش‌بینی زودهنگام خرابی" },
            { value: "100%", label: "انطباق با IEC 62443 & HSE" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="font-display text-4xl sm:text-5xl text-gradient-gold">{stat.value}</div>
              <div className="text-xs uppercase tracking-[0.2em] text-faint mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}