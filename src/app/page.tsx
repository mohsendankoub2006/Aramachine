import Header from "@/components/Header"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Services from "@/components/Services"
import Projects from "@/components/Projects"
import Stats from "@/components/Stats"
import Skills from "@/components/Skills"
import Timeline from "@/components/Timeline"
import FAQ from "@/components/FAQ"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import { Reveal } from "@/components/Reveal"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Reveal><About /></Reveal>
      <Reveal delay={0.1}><Services /></Reveal>
      <Reveal delay={0.05}><Projects /></Reveal>
      <Reveal delay={0.05}><Stats /></Reveal>
      <Reveal delay={0.1}><Skills /></Reveal>
      <Reveal delay={0.05}><Timeline /></Reveal>
      <Reveal delay={0.1}><FAQ /></Reveal>
      <Reveal delay={0.05}><Contact /></Reveal>
      <Footer />
    </main>
  )
}
