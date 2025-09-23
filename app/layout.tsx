import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Turismo Diversidad - Esteros del Iberá",
  description:
    "Descubrí la naturaleza en su máxima expresión con experiencias únicas en el corazón de Corrientes. Safaris, avistajes y aventuras en los Esteros del Iberá.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
