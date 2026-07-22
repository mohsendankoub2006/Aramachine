"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"

type Theme = "dark" | "light"
type Lang = "en" | "fa"

export interface ThemeContextType {
  theme: Theme
  lang: Lang
  toggleTheme: () => void
  toggleLang: () => void
  t: (key: string) => string
}

const translations: Record<string, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About AraMachine",
    "nav.services": "AI & Engineering Solutions",
    "nav.work": "Sectors Covered",
    "nav.skills": "Industrial Stack",
    "nav.contact": "Contact",
    "cta.start": "Request AI Demo",
    "hero.badge": "Smart Petrochemical & Industrial Intelligence",
    "slide.1.title": "ARAMACHINE",
    "slide.1.subtitle": "AI-Powered Real-Time Process Monitoring",
    "slide.1.caption": "Transforming process streaming data into actionable insights, predicting operational risk, and reducing unplanned shutdowns.",
    "slide.2.title": "PREDICTIVE MAINTENANCE",
    "slide.2.subtitle": "Rotating Equipment Health & RUL Prediction",
    "slide.2.caption": "Advanced machine learning models for early fault detection in pumps, turbines, and compressors up to 90 days ahead.",
    "slide.3.title": "OPERATIONS COPILOT",
    "slide.3.subtitle": "Smart Decision Assistant for Control Rooms",
    "slide.3.caption": "Combining Industrial LLMs with RAG to provide step-by-step SOP recommendations and eliminate operational errors.",
    "slide.4.title": "DIGITAL TWIN & ENERGY",
    "slide.4.subtitle": "Process Optimization & Energy Efficiency",
    "slide.4.caption": "Real-time virtual plant modeling to reduce energy consumption, minimize carbon emissions, and optimize setpoints.",
    "slide.5.title": "EQUIPMENT SUPPLY & RE",
    "slide.5.subtitle": "Precision Parts & Reverse Engineering",
    "slide.5.caption": "End-to-end technical sourcing and reverse engineering for critical spare parts backed by HSE and ISA standards.",
    "cta.quote": "Download Proposal",
    "cta.explore": "Explore Capabilities",
    "about.badge": "About AraMachine",
    "about.title": "PIONEERING INDUSTRIAL INTELLIGENCE",
    "about.desc": "AraMachine empowers petrochemical, refinery, and energy complexes with real-time AI monitoring, predictive maintenance, and high-reliability equipment sourcing. We turn raw operational data into smart decisions to safeguard plant continuity.",
    "services.badge": "Core Capabilities",
    "services.title": "OUR AI & INDUSTRIAL SOLUTIONS",
    "web.label": "Real-time Monitoring & Anomaly",
    "web.title": "AI Stream Processing & Anomaly Detection",
    "web.desc": "High-throughput stream processing layer (Kafka/TimescaleDB) analyzing thousands of process tags per second to detect hidden anomalies instantly.",
    "web.features.0": "Low-Latency Process Anomaly Detection (<5s)",
    "web.features.1": "Dynamic P&ID Interactive Dashboards",
    "web.features.2": "Root Cause Analysis (RCA) & Event Replay",
    "web.features.3": "OPC UA & Industrial Protocol Ingestion",
    "web.features.4": "Read-Only Isolated OT/IT Segregation",
    "ai.label": "Predictive Maintenance (PdM)",
    "ai.title": "Rotating Equipment Failure Prediction",
    "ai.desc": "ML models (LSTM, Autoencoders) monitoring vibration, temperature, and oil metrics to calculate Remaining Useful Life (RUL) for critical machinery.",
    "ai.features.0": "Compressor, Pump & Turbine Failure Forecast",
    "ai.features.1": "Vibration & Condition Monitoring Analytics",
    "ai.features.2": "Integration with CMMS / EAM Systems",
    "ai.features.3": "Explainable AI (XAI) Risk Scoring",
    "ai.features.4": "MLOps Pipelines for Automated Retraining",
    "design.label": "Operations Copilot (LLM)",
    "design.title": "Industrial Decision Assistant & RAG",
    "design.desc": "Strict-RAG generative AI assistant grounding responses in SOPs, PSI documents, and historical maintenance logs with zero hallucination.",
    "design.features.0": "Persian Industrial Conversational Assistant",
    "design.features.1": "Step-by-Step Emergency Response SOPs",
    "design.features.2": "VectorDB Semantic Document Search",
    "design.features.3": "Human-in-the-Loop Action Approvals",
    "design.features.4": "Organizational Knowledge Preservation",
    "cloud.label": "Process & Energy Optimization",
    "cloud.title": "Digital Twin & Carbon Footprint Reduction",
    "cloud.desc": "Optimizing steam, fuel, and electrical energy consumption via reinforcement learning and closed-loop/open-loop setpoint recommendations.",
    "cloud.features.0": "Real-time Steam & Utility Optimization",
    "cloud.features.1": "Closed-loop / Open-loop Setpoint Advisory",
    "cloud.features.2": "Digital Twin Process Simulation",
    "cloud.features.3": "Flaring & Emissions Reduction",
    "cloud.features.4": "IEC 61511 & IEC 62443 Compliance",
    "projects.badge": "Target Industries",
    "projects.title": "SECTORS WE TRANSFORM",
    "stats.badge": "Key Metrics",
    "stats.title": "QUANTIFIABLE INDUSTRIAL IMPACT",
    "skills.badge": "Tech & Equipment Stack",
    "skills.title": "INDUSTRIAL AI ARCHITECTURE",
    "timeline.badge": "Development Roadmap",
    "timeline.title": "PROJECT PHASE BREAKDOWN",
    "faq.badge": "FAQ",
    "faq.title": "FREQUENTLY ASKED QUESTIONS",
    "contact.badge": "Contact Us",
    "contact.title": "START YOUR DIGITAL TRANSFORMATION",
    "contact.desc": "Connect with AraMachine engineers to discuss AI system implementation, equipment sourcing, or schedule an operational demo.",
    "cta.send": "Send Technical Inquiry",
    "form.name": "Full Name / Enterprise",
    "form.email": "Corporate Email",
    "form.project": "Interest Area",
    "form.message": "Operational Requirements / Inquiry",
    "form.placeholder.name": "e.g., Petrochemical Operations Team",
    "form.placeholder.email": "engineering@petro.ir",
    "form.placeholder.message": "Explain your plant parameters, number of tags, or equipment sourcing needs...",
    "form.send": "Submit Technical Request",
    "faq.1.q": "How does AraMachine's AI system integrate with existing DCS/SCADA?",
    "faq.1.a": "The system connects via read-only industrial gateways (OPC UA, MQTT) inside an isolated OT/DMZ network, ensuring zero interference with active control loops.",
    "faq.2.q": "How far in advance can the system predict equipment failure?",
    "faq.2.a": "By analyzing vibration, temperature, and process trends, machine learning models can detect early signs of degradation up to 30 to 90 days before failure.",
    "faq.3.q": "How does the system prevent AI hallucinations in critical operations?",
    "faq.3.a": "Our Operations Copilot uses Strict RAG architecture, restricting answers strictly to verified plant SOPs, PSI manuals, and technical documents.",
    "faq.4.q": "Does AraMachine also supply physical spare parts?",
    "faq.4.a": "Yes, we combine AI condition monitoring with a specialized supply chain to source or reverse-engineer critical valves, pumps, and instrumentation.",
    "faq.5.q": "What is the expected ROI for implementing this system?",
    "faq.5.a": "Plants typically see a 20-50% reduction in emergency downtime, 10-30% lower maintenance costs, and 5-15% energy efficiency gains within the first 12 months.",
    "faq.6.q": "Is the system deployed On-Premise or in the Cloud?",
    "faq.6.a": "Due to cybersecurity and OT isolation regulations, the entire platform is deployed On-Premise using containerized Kubernetes architectures.",
    "footer.tagline": "AraMachine — Intelligent real-time monitoring, predictive maintenance, and digital transformation for petrochemical complexes.",
    "footer.copyright": "All rights reserved.",
    "footer.motto": "Data-Driven • AI-Powered • Industrial Grade",
  },
  fa: {
    "nav.home": "خانه",
    "nav.about": "درباره آراماشین",
    "nav.services": "راهکارهای هوش مصنوعی",
    "nav.work": "حوزه‌های کاربرد",
    "nav.skills": "معماری و تجهیزات",
    "nav.contact": "تماس با ما",
    "cta.start": "درخواست دمو سامانه",
    "hero.badge": "سامانه هوشمند پایش بلادرنگ و تحول دیجیتال پتروشیمی",
    "slide.1.title": "آراماشین",
    "slide.1.subtitle": "سامانه هوشمند پایش بلادرنگ و پیش‌بینی ریسک",
    "slide.1.caption": "تبدیل داده‌های جریانی فرآیند به بینش‌های هوشمند عملیاتی، پیش‌بینی ریسک و جلوگیری از توقف‌های ناخواسته تولید.",
    "slide.2.title": "نگهداری پیش‌بینانه",
    "slide.2.subtitle": "پایش سلامت و تخمین عمر باقی‌مانده (RUL)",
    "slide.2.caption": "پیش‌بینی زودهنگام خرابی در تجهیزات دوار حیاتی (کمپرسورها، پمپ‌ها و توربین‌ها) با الگوریتم‌های عمیق یادگیری ماشین.",
    "slide.3.title": "دستیار هوشمند عملیاتی",
    "slide.3.subtitle": "تصمیم‌یار صنعتی اتاق کنترل (Operations Copilot)",
    "slide.3.caption": "ارائه توصیه‌های گام‌به‌گام و راهنماهای دستورالعمل استاندارد (SOP) مبتنی بر مدل‌های زبانی صنعتی و معماری RAG.",
    "slide.4.title": "دوقلوی دیجیتال و انرژی",
    "slide.4.subtitle": "بهینه‌سازی فرآیند و کاهش مصرف انرژی",
    "slide.4.caption": "مدل‌سازی مجازی زنده مجتمع جهت کاهش مصرف بخار و برق، افت فلرینگ و تنظیم بهینه نقاط کاری فرآیند (Setpoints).",
    "slide.5.title": "تأمین تجهیزات و مهندسی",
    "slide.5.subtitle": "تأمین قطعات حساس و مهندسی معکوس",
    "slide.5.caption": "زنجیره تأمین یکپارچه قطعات ابزار دقیق، شیرآلات و قطعات دوار مطابق با استانداردهای بین‌المللی HSE و IEC.",
    "cta.quote": "دانلود پروپوزال طرح",
    "cta.explore": "مشاهده قابلیت‌ها",
    "about.badge": "درباره آراماشین",
    "about.title": "پیشگام هوشمندسازی و تامین صنعتی",
    "about.desc": "شرکت آراماشین با تلفیق فناوری‌های هوش مصنوعی (صنعت نسل ۴) و زنجیره تامین چابک، مجتمع‌های پتروشیمی و پالایشگاهی را به سامانه‌های هوشمند پایش بلادرنگ، نگهداری پیش‌بینانه و تصمیم‌یار عملیاتی مجهز می‌سازد تا تداوم تولید و کاهش هزینه‌ها محقق شود.",
    "services.badge": "قابلیت‌ها و زیرسیستم‌ها",
    "services.title": "خدمات هوشمندسازی و مهندسی ما",
    "web.label": "پایش بلادرنگ و تشخیص ناهنجاری",
    "web.title": "پردازش جریانی داده‌ها و کشف ناهنجاری (Anomaly)",
    "web.desc": "لایه پردازش جریانی پرسرعت (Kafka) برای دریافت و نرمال‌سازی ده‌ها هزار تگ فرآیندی در ثانیه و صدور هشدارهای پیش‌بینانه زیر ۵ ثانیه.",
    "web.features.0": "تشخیص بلادرنگ انحراف فرآیند با تأخیر کمتر از ۵ ثانیه",
    "web.features.1": "داشبورد مدیریتی و پایش بر روی نقشه P&ID پویا",
    "web.features.2": "قابلیت بازپخش وقایع (Replay) جهت تحلیل ریشه‌ای (RCA)",
    "web.features.3": "دریافت یکپارچه داده از DCS، SCADA و Historian",
    "web.features.4": "ارتباط امن فقط‌خواندنی (Read-Only) و ایزوله‌سازی شبکه OT/IT",
    "ai.label": "نگهداری پیش‌بینانه (PdM)",
    "ai.title": "پیش‌بینی خرابی تجهیزات دوار و حیاتی",
    "ai.desc": "الگوریتم‌های یادگیری ماشین (LSTM، Autoencoders) برای پایش لرزش، دما و روغن جهت محاسبه زمان باقی‌مانده تا خرابی (RUL).",
    "ai.features.0": "پیش‌بینی خرابی کمپرسور، پمپ فرآیندی و توربین",
    "ai.features.1": "تحلیل آنالیز لرزش و پایش وضعیت (Condition Monitoring)",
    "ai.features.2": "صدور خودکار دستورکار پیشگیرانه در سیستم‌های CMMS/EAM",
    "ai.features.3": "ماژول هوش مصنوعی قابل تفسیر (XAI) برای رتبه‌بندی ریسک",
    "ai.features.4": "خط لوله MLOps جهت بازآموزی خودکار مدل‌ها",
    "design.label": "دستیار هوشمند عملیاتی (Copilot)",
    "design.title": "دستیار تصمیم‌یار اتاق کنترل و جستجوی معنایی",
    "design.desc": "دستیار هوشمند تعاملی فارسی بر پایه Strict-RAG که توصیه‌های عملیاتی را صرفاً بر اساس مستندات تأییدشده SOP و PSI ارائه می‌دهد.",
    "design.features.0": "دستیار محاوره‌ای تخصصی به زبان فارسی برای اپراتورها",
    "design.features.1": "ارائه دستورالعمل‌های گام‌به‌گام واکنش در شرایط اضطراری",
    "design.features.2": "جستجوی هوشمند مستندات و سوابق تعمیراتی با VectorDB",
    "design.features.3": "مکانیزم اجباری تأیید انسانی (Human-in-the-Loop)",
    "design.features.4": "حفظ و ماندگاری دانش سازمانی اپراتورهای باسابقه",
    "cloud.label": "بهینه‌سازی فرآیند و انرژی",
    "cloud.title": "دوقلوی دیجیتال و بهینه‌سازی مصرف انرژی",
    "cloud.desc": "تحلیل بلادرنگ الگوی مصرف بخار، برق و سوخت و ارائه نقاط تنظیم بهینه (Setpoints) جهت کاهش هزینه‌های عملیاتی و آلایندگی.",
    "cloud.features.0": "بهینه‌سازی بلادرنگ مصرف بخار، سوخت و یوتیلیتی",
    "cloud.features.1": "توصیه هوشمند نقاط تنظیم فرآیند (Setpoints)",
    "cloud.features.2": "شبیه‌سازی سناریوهای عملیاتی با دوقلوی دیجیتال (Digital Twin)",
    "cloud.features.3": "پایش فلرینگ و کاهش انتشار گازهای گلخانه‌ای",
    "cloud.features.4": "رعایت کامل استانداردهای ایمنی IEC 61511 و IEC 62443",
    "projects.badge": "مجتمع‌ها و صنایع هدف",
    "projects.title": "صنایعی که به سامانه‌های ما مجهز می‌شوند",
    "stats.badge": "شاخص‌های دستاورد",
    "stats.title": "ارزش اقتصادی و عملیاتی هوشمندسازی",
    "skills.badge": "زرادخانه فناوری و قطعات",
    "skills.title": "معماری فنی و پشته هوش مصنوعی",
    "timeline.badge": "زمان‌بندی اجرایی (WBS)",
    "timeline.title": "فازهای توسعه و استقرار سامانه",
    "faq.badge": "پرسش‌های متداول",
    "faq.title": "سؤالات رایج مدیران و مهندسان",
    "contact.badge": "ارتباط با ما",
    "contact.title": "آغاز تحول دیجیتال مجتمع",
    "contact.desc": "برای دریافت مشاوره فنی، درخواست برگزاری جلسه دمو یا استعلام تامین قطعات با کارشناسان آراماشین در تماس باشید.",
    "cta.send": "ارسال استعلام فنی",
    "form.name": "نام و نام خانوادگی / سازمان",
    "form.email": "ایمیل سازمانی",
    "form.project": "حوزه درخواست",
    "form.message": "نیازمندی‌ها و شرح واحد فرآیندی",
    "form.placeholder.name": "مثال: تیم بهره‌برداری پتروشیمی...",
    "form.placeholder.email": "info@petro.ir",
    "form.placeholder.message": "تعداد تگ‌های فرآیندی، نوع تجهیزات دوار یا مشخصات قطعات مورد نیاز را بنویسید...",
    "form.send": "ثبت درخواست مشاوره",
    "faq.1.q": "سامانه آراماشین چگونه با DCS و SCADA موجود ارتباط برقرار می‌کند؟",
    "faq.1.a": "از طریق گیت‌وی‌های صنعتی استاندارد (OPC UA، MQTT) در شبکه ایزوله DMZ و به‌صورت کاملاً فقط‌خواندنی (Read-Only) ارتباط برقرار شده و هیچ اختلالی در حلقه‌های کنترلی ایجاد نمی‌شود.",
    "faq.2.q": "مدل‌های هوش مصنوعی تا چند روز قبل خرابی تجهیزات دوار را پیش‌بینی می‌کنند؟",
    "faq.2.a": "الگوریتم‌های پیش‌بینی خرابی (PdM) با تحلیل آنالیز لرزش، دما و پارامترهای فرآیندی می‌توانند علائم خرابی را از ۳۰ تا ۹۰ روز قبل شناسایی کنند.",
    "faq.3.q": "چگونه از بروز توهم (Hallucination) در دستیار هوشمند جلوگیری می‌شود؟",
    "faq.3.a": "با به‌کارگیری معماری Strict-RAG، مدل زبانی به پاسخ‌دهی صرفاً از روی منابع داخلی تأییدشده (SOP، کتابچه‌های PSI و سوابق CMMS) محدود می‌شود.",
    "faq.4.q": "آیا آراماشین علاوه بر سامانه نرم‌افزاری، قطعات فیزیکی هم تامین می‌کند؟",
    "faq.4.a": "بله، آراماشین علاوه بر نرم‌افزار هوشمند، امکان تأمین و مهندسی معکوس قطعات حساس دوار، ابزار دقیق و شیرآلات فرآیندی را داراست.",
    "faq.5.q": "نرخ بازگشت سرمایه (ROI) این سامانه برای پتروشیمی چقدر است؟",
    "faq.5.a": "با کاهش ۲۰ تا ۵۰ درصدی توقف‌های اضطراری، کاهش ۱۰ تا ۳۰ درصدی هزینه تعمیرات و بهبود ۵ تا ۱۵ درصدی مصرف انرژی، سرمایه‌گذاری ظرف کمتر از ۱ سال بازمی‌گردد.",
    "faq.6.q": "نحوه استقرار سامانه به چه صورت است (ابری یا محلی)؟",
    "faq.6.a": "با توجه به الزامات پدافند غیرعامل و ایمنی شبکه OT، سامانه به‌صورت تماماً محلی (On-Premise) بر روی زیرساخت کانتینری در مرکز داده مجتمع مستقر می‌شود.",
    "footer.tagline": "آراماشین — سامانه هوشمند پایش بلادرنگ، پیش‌بینی ریسک و تحول دیجیتال مجتمع‌های پتروشیمی.",
    "footer.copyright": "تمامی حقوق محفوظ است.",
    "footer.motto": "داده‌محور • متکی بر هوش مصنوعی • با درجه مقاومت صنعتی",
  },
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  lang: "fa",
  toggleTheme: () => {},
  toggleLang: () => {},
  t: (key: string) => key,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  const [lang, setLang] = useState<Lang>("fa")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("peak-theme") as Theme | null
    const savedLang = localStorage.getItem("peak-lang") as Lang | null
    if (savedTheme) setTheme(savedTheme)
    if (savedLang) setLang(savedLang)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("peak-theme", theme)
  }, [theme, mounted])

  useEffect(() => {
    if (!mounted) return
    const html = document.documentElement
    if (lang === "fa") {
      html.setAttribute("dir", "rtl")
      html.setAttribute("lang", "fa")
      html.setAttribute("data-lang", "fa")
    } else {
      html.setAttribute("dir", "ltr")
      html.setAttribute("lang", "en")
      html.removeAttribute("data-lang")
    }
    localStorage.setItem("peak-lang", lang)
  }, [lang, mounted])

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), [])
  const toggleLang = useCallback(() => setLang((l) => (l === "en" ? "fa" : "en")), [])

  const t = useCallback((key: string) => {
    return translations[lang]?.[key] || translations["en"]?.[key] || key
  }, [lang])

  return (
    <ThemeContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)