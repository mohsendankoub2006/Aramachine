import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"

export const metadata: Metadata = {
  title: "PEAK STUDIO — Digital Elevation Agency",
  description: "Premium petrochemical supply and digital elevation agency.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth" suppressHydrationWarning>
      <body>
        <div className="noise-overlay" />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
