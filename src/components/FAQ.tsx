"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "./ThemeProvider"

const faqKeys = [
  { q: "faq.1.q", a: "faq.1.a" },
  { q: "faq.2.q", a: "faq.2.a" },
  { q: "faq.3.q", a: "faq.3.a" },
  { q: "faq.4.q", a: "faq.4.a" },
  { q: "faq.5.q", a: "faq.5.a" },
  { q: "faq.6.q", a: "faq.6.a" },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const { t } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="border-b border-theme hover:border-gold/30 transition-colors duration-300">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left group hover-lift transition-all duration-300">
        <span className="font-body text-sm text-theme-70 group-hover:text-theme transition-all duration-300 pr-4">{t(q)}</span>
        <span className={`text-gold text-lg transition-transform duration-300 shrink-0 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <p className="pb-6 text-sm text-muted leading-relaxed max-w-2xl">{t(a)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const { t } = useTheme()

  return (
    <section className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16">
          <span className="inline-block px-4 py-1 border border-theme text-muted text-xs uppercase tracking-[0.2em] mb-6">{t("faq.badge")}</span>
          <h2 className="font-display text-5xl sm:text-7xl tracking-wider text-theme">{t("faq.title")}</h2>
        </motion.div>
        <div className="max-w-3xl">
          {faqKeys.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} index={i} />)}
        </div>
      </div>
    </section>
  )
}