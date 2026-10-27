import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TrendSpace - Donde la Creatividad se Convierte en Realidad",
  description:
    "La primera plataforma donde la comunidad decide qué diseños se producen. Descubre, vota y obtén prendas únicas que no encontrarás en ningún otro lugar.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
