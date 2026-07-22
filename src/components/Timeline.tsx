"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "./ThemeProvider"

const milestones = [
  { year: "فاز ۱", title: "طراحی معماری و زیرساخت OT", desc: "تعریف لایه‌های پردازش جریانی، ساختار داده زمانی و الگوی امنیت ایزوله طبق IEC 62443[cite: 1]." },
  { year: "فاز ۲", title: "توسعه MVP پایش بلادرنگ", desc: "اتصال به DCS از طریق OPC UA، پیاده‌سازی P&ID پویا و صدور هشدارهای انحراف زیر ۵ ثانیه[cite: 1]." },
  { year: "فاز ۳", title: "موتور هوشمند پیش‌بینی خرابی (PdM)", desc: "آموزش مدل‌های LSTM/Autoencoder، محاسبه RUL تجهیزات دوار و راه‌اندازی MLOps[cite: 1]." },
  { year: "فاز ۴", title: "دستیار عملیاتی Copilot & RAG", desc: "استقرار دستیار فارسی اتاق کنترل، جستجوی معنایی SOPها با VectorDB و اتصال به CMMS[cite: 1]." },
  { year: "فاز ۵", title: "آزمون، استقرار محوالی و تحویل", desc: "کانتینرسازی با Docker/Kubernetes، تست بار و استقرار نهایی در زیرساخت On-Premise[cite: 1]." },
]

export default function Timeline() {
  const { t } = useTheme()
  const ref = useRef(null)

  return (
    <section className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-20">
          <span className="inline-block px-4 py-1 border border-theme text-muted text-xs uppercase tracking-[0.2em] mb-6">{t("timeline.badge")}</span>
          <h2 className="font-display text-5xl sm:text-7xl tracking-wider text-theme">{t("timeline.title")} <span className="text-gradient-gold">⛰</span></h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-orange/20 to-transparent pointer-events-none" />
          <div className="space-y-16">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-20"
              >
                <div className="absolute left-4 top-2 w-2 h-2 rounded-full bg-gold shadow-[0_0_12px_rgba(212,168,67,0.5)]" />
                <div className="font-mono text-xs text-gold/60 mb-1">{m.year}</div>
                <h3 className="font-display text-2xl tracking-wider text-theme mb-2">{m.title}</h3>
                <p className="text-muted text-sm leading-relaxed max-w-lg">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}