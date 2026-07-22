"use client"

import { useRef, ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  yOffset?: number
}

export function Reveal({ children, className = "", delay = 0, yOffset = 50 }: RevealProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.8, 0.95], [0, 1, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.8, 0.95], [yOffset, 0, 0, 0, -yOffset * 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.8, 0.95], [0.92, 1, 1, 1, 0.96])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type RevealStaggerProps = {
  children: ReactNode[]
  className?: string
  itemClass?: string
}

export function RevealStagger({ children, className = "", itemClass = "" }: RevealStaggerProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * 0.1} className={itemClass}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}
