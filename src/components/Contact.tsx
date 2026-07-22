"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "./ThemeProvider"

export default function Contact() {
  const { t } = useTheme()
  const ref = useRef(null)

  return (
    <section id="contact" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.03] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16">
          <span className="inline-block px-4 py-1 border border-theme text-muted text-xs uppercase tracking-[0.2em] mb-6">{t("contact.badge")}</span>
          <h2 className="font-display text-5xl sm:text-7xl tracking-wider text-theme">{t("contact.title")}</h2>
          <p className="mt-6 text-muted text-sm max-w-xl">{t("contact.desc")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {[
              { label: "Email", value: "info@aramachine.ir", href: "mailto:info@aramachine.ir" },
              { label: "Phone", value: "+98 21 8800 0000", href: "tel:+982188000000" },
              { label: "Location", value: "تهران، دفتر مرکزی آراماشین", href: "#" },
              { label: "Hours", value: "شنبه تا چهارشنبه: ۸:۰۰ الی ۱۷:۰۰", href: "#" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-xs uppercase tracking-[0.2em] text-gold/60 mb-1">{item.label}</div>
                <a href={item.href} className="text-theme-70 hover:text-gold transition-all duration-300 text-sm">{item.value}</a>
              </div>
            ))}
            <div className="flex gap-4 pt-4">
              {["LI", "X", "TG", "WEB"].map((s) => (
                <a key={s} href="#" className="w-10 h-10 flex items-center justify-center border border-theme text-muted text-xs hover:border-gold hover:text-gold hover-glow transition-all duration-300">{s}</a>
              ))}
            </div>
          </div>

          <form className="lg:col-span-3 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-muted mb-2">{t("form.name")}</label>
                <input type="text" required className="w-full bg-transparent border border-theme px-4 py-3 text-sm text-theme outline-none focus:border-gold/50 transition-colors" placeholder={t("form.placeholder.name")} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-muted mb-2">{t("form.email")}</label>
                <input type="email" required className="w-full bg-transparent border border-theme px-4 py-3 text-sm text-theme outline-none focus:border-gold/50 transition-colors" placeholder={t("form.placeholder.email")} />
              </div>
            </div>
            <div className="corner-fill">
              <label className="block text-xs uppercase tracking-[0.15em] text-muted mb-2">{t("form.project")}</label>
              <select className="w-full bg-transparent border border-theme px-4 py-3 text-sm text-muted outline-none focus:border-gold/50 transition-all corner-fill appearance-none">
                <option className="bg-elevated">سامانه پایش بلادرنگ و AI</option>
                <option className="bg-elevated">نگهداری پیش‌بینانه (PdM)</option>
                <option className="bg-elevated">دستیار هوشمند اتاق کنترل (Copilot)</option>
                <option className="bg-elevated">بهینه‌سازی انرژی و دوقلوی دیجیتال</option>
                <option className="bg-elevated">تأمین قطعات و تجهیزات صنعتی</option>
              </select>
            </div>
            <div className="corner-fill">
              <label className="block text-xs uppercase tracking-[0.15em] text-muted mb-2">{t("form.message")}</label>
              <textarea rows={5} required className="w-full bg-transparent border border-theme px-4 py-3 text-sm text-theme outline-none focus:border-gold/50 transition-all corner-fill resize-none" placeholder={t("form.placeholder.message")} />
            </div>
            <button type="submit" className="w-full px-8 py-4 bg-gold text-[var(--navy)] font-bold uppercase tracking-widest text-sm corner-fill hover:bg-gold-light hover-lift transition-all duration-300">{t("form.send")}</button>
          </form>
        </div>
      </div>
    </section>
  )
}