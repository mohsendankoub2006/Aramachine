"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "./ThemeProvider"

const categories = ["همه", "پایش و پردازش", "مدل‌های AI", "پروتکل‌های OT", "تجهیزات صنعتی"]

const skills = [
  { name: "Apache Kafka & Flink", level: 95, category: "پایش و پردازش" },
  { name: "TimescaleDB / VectorDB", level: 92, category: "پایش و پردازش" },
  { name: "LSTM & Autoencoders (RUL)", level: 94, category: "مدل‌های AI" },
  { name: "Strict-RAG & XAI (SHAP)", level: 90, category: "مدل‌های AI" },
  { name: "OPC UA & Modbus Adapter", level: 92, category: "پروتکل‌های OT" },
  { name: "ایزولاسیون OT/IT & DMZ", level: 96, category: "پروتکل‌های OT" },
  { name: "سنسورهای آنالیز لرزش", level: 88, category: "تجهیزات صنعتی" },
  { name: "پمپ‌ها و کمپرسورهای فرآیندی", level: 85, category: "تجهیزات صنعتی" },
  { name: "شیرآلات کنترلی (Control Valves)", level: 86, category: "تجهیزات صنعتی" },
]

export default function Skills() {
  const { t } = useTheme()
  const [activeCat, setActiveCat] = useState("همه")
  const ref = useRef(null)
  const filtered = activeCat === "همه" ? skills : skills.filter((s) => s.category === activeCat)

  return (
    <section id="skills" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16">
          <span className="inline-block px-4 py-1 border border-theme text-muted text-xs uppercase tracking-[0.2em] mb-6">{t("skills.badge")}</span>
          <h2 className="font-display text-5xl sm:text-7xl tracking-wider text-theme">{t("skills.title")} <span className="text-gradient-gold">⛰</span></h2>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
                activeCat === cat ? "border-gold text-gold bg-gold/10 hover-glow" : "border-theme text-muted hover:border-light"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group p-5 border border-theme hover:border-gold/30 hover-border-glow transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-lg tracking-wider text-theme">{skill.name}</span>
                  <span className="font-mono text-xs text-gold">{skill.level}%</span>
                </div>
                <div className="h-1 bg-theme-10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-gold to-blue rounded-full"
                  />
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.15em] text-faint">{skill.category}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}