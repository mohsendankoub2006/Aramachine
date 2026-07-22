"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "./ThemeProvider"

const services = [
  {
    id: "web", label: "پایش بلادرنگ فرآیند", icon: "⟐",
    title: "پردازش جریانی داده‌ها و کشف ناهنجاری",
    desc: "دریافت بلادرنگ داده‌های ناهمگن از DCS، SCADA و Historian[cite: 1, 3]. تحلیل رفتار متغیرها بر روی P&ID پویا و صدور هشدار انحراف فرآیند زیر ۵ ثانیه[cite: 1].",
    features: ["پردازش ۵۰,۰۰۰ تگ فرآیندی در ثانیه[cite: 1]", "داشبورد تعاملی مبتنی بر نقشه P&ID[cite: 1]", "قابلیت Event Replay برای تحلیل ریشه‌ای (RCA)[cite: 1]", "ارتباط ایزوله OT/IT به‌صورت Read-Only[cite: 1]"],
  },
  {
    id: "ai", label: "نگهداری پیش‌بینانه (PdM)", icon: "⟡",
    title: "پیش‌بینی خرابی تجهیزات دوار حیاتی",
    desc: "تحلیل آنالیز لرزش، دما و پارامترهای عملیاتی برای کمپرسورها، پمپ‌ها و توربین‌ها[cite: 1, 3]. تخمین زمان باقی‌مانده تا خرابی (RUL) با مدل‌های LSTM و Autoencoders[cite: 1].",
    features: ["پیش‌بینی خرابی تا ۹۰ روز قبل از وقوع[cite: 2, 3]", "محاسبه شاخص سلامت تجهیز (Asset Health)[cite: 1]", "ارسال خودکار دستورکار به سیستم‌های CMMS/EAM[cite: 1, 2]", "ماژول هوش مصنوعی قابل تفسیر (XAI)[cite: 1]"],
  },
  {
    id: "design", label: "دستیار هوشمند (Copilot)", icon: "◇",
    title: "دستیار تصمیم‌یار اتاق کنترل با Strict-RAG",
    desc: "دستیار محاوره‌ای فارسی مجهز به معماری RAG جهت ارائه توصیه‌های گام‌به‌گام در شرایط بحرانی، بر اساس دستورالعمل‌های رسمی SOP و PSI بدون احتمال توهم[cite: 1, 2].",
    features: ["پاسخگویی هوشمند به زبان فارسی با مستندات SOP[cite: 1]", "جستجوی معنایی کتابچه‌های فنی با VectorDB[cite: 1]", "مکانیزم تأیید انسانی (Human-in-the-Loop)[cite: 1]", "ثبت و ماندگاری دانش ضمنی اپراتورها[cite: 1]"],
  },
  {
    id: "cloud", label: "دوقلوی دیجیتال و انرژی", icon: "△",
    title: "بهینه‌سازی مصرف انرژی و دوقلوی دیجیتال",
    desc: "مدل‌سازی مجازی زنده از مجتمع برای پایش الگوی مصرف بخار، برق و سوخت[cite: 1, 3]. ارائه توصیه‌های تنظیم بهینه Setpointها و کاهش فلرینگ[cite: 1, 2].",
    features: ["کاهش ۵ تا ۱۵ درصدی مصرف انرژی[cite: 3]", "کاهش فلرینگ و آلایندگی‌های محیط زیستی[cite: 2, 3]", "شبیه‌سازی سناریوهای عملیاتی پیش از اجرا[cite: 2, 3]", "انطباق کامل با استانداردهای IEC 61511 و IEC 62443[cite: 1]"],
  },
]

export default function Services() {
  const { t } = useTheme()
  const [active, setActive] = useState(services[0].id)
  const ref = useRef(null)

  return (
    <section id="services" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block px-4 py-1 border border-theme text-muted text-xs uppercase tracking-[0.2em] mb-6">{t("services.badge")}</span>
          <h2 className="font-display text-5xl sm:text-7xl tracking-wider text-theme">{t("services.title")} <span className="text-gradient-gold">⛰</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-2">
            {services.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActive(s.id)}
                className={`group text-left px-6 py-5 border transition-all duration-300 ${
                  active === s.id
                    ? "border-gold/40 bg-gold/5 text-gold hover-glow"
                    : "border-theme text-muted hover:border-light hover-border-glow"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl">{s.icon}</span>
                  <span className="font-display text-xl tracking-wider">{s.label}</span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {services.find((s) => s.id === active) && (
                <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="p-8 border border-theme">
                  <div className="text-4xl text-gold mb-6">{services.find((s) => s.id === active)?.icon}</div>
                  <h3 className="font-display text-3xl tracking-wider text-theme mb-4">{services.find((s) => s.id === active)?.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-8">{services.find((s) => s.id === active)?.desc}</p>
                  <ul className="space-y-3">
                    {services.find((s) => s.id === active)?.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-muted">
                        <span className="w-1.5 h-1.5 bg-gold/60 rounded-full shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}