"use client"

import { useTheme } from "./ThemeProvider"

export default function Footer() {
  const { t } = useTheme()

  return (
    <footer className="relative border-t border-theme py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <a href="#hero" className="flex items-center gap-3 mb-6">
              <svg width="28" height="28" viewBox="0 0 100 100">
                <defs><linearGradient id="fG" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#d4a843"/><stop offset="100%" stopColor="#1e4a8a"/></linearGradient></defs>
                <polygon points="50,5 95,85 5,85" fill="none" stroke="url(#fG)" strokeWidth="4" />
                <circle cx="50" cy="55" r="8" fill="url(#fG)" />
              </svg>
              <span className="font-display text-xl tracking-widest text-theme">ARAMACHINE</span>
            </a>
            <p className="text-faint text-xs leading-relaxed">{t("footer.tagline")}</p>
          </div>
          <div>
            <h4 className="font-display text-sm tracking-widest text-theme-60 mb-6">{t("nav.services")}</h4>
            <div className="flex flex-col gap-3">
              {["پایش بلادرنگ فرآیند", "نگهداری پیش‌بینانه (PdM)", "دستیار هوشمند اتاق کنترل", "بهینه‌سازی انرژی و دوقلوی دیجیتال"].map((s) => (
                <a key={s} href="#services" className="text-xs text-faint hover:text-gold transition-colors">{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm tracking-widest text-theme-60 mb-6">{t("nav.about")}</h4>
            <div className="flex flex-col gap-3">
              {["درباره آراماشین", "صنایع هدف", "تکنولوژی‌ها", "زمان‌بندی اجرایی"].map((s) => (
                <a key={s} href="#" className="text-xs text-faint hover:text-gold transition-colors">{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm tracking-widest text-theme-60 mb-6">{t("nav.contact")}</h4>
            <div className="flex flex-col gap-3">
              {["info@aramachine.ir", "درخواست مشاوره", "دانلود پروپوزال", "پشتیبانی فنی"].map((s) => (
                <a key={s} href="#" className="text-xs text-faint hover:text-gold transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-theme">
          <p className="text-[10px] uppercase tracking-[0.2em] text-faint">&copy; {new Date().getFullYear()} ARAMACHINE. {t("footer.copyright")}</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-faint">{t("footer.motto")}</p>
        </div>
      </div>
    </footer>
  )
}