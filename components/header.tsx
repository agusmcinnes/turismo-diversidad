"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#inicio", label: "Inicio" },
    { href: "#sobre-nosotros", label: "Sobre Nosotros" },
    { href: "#paquetes", label: "Paquetes" },
    { href: "#excursiones", label: "Excursiones" },
    { href: "/estadia", label: "Estadía" },
    { href: "#contacto", label: "Contacto" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:px-28 py-2.5 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm border-b border-slate-200" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="#inicio" className="flex items-center space-x-3">
            <Image
              src="/images/logo.png"
              alt="Turismo Diversidad"
              width={120}
              height={40}
              className={`transition-all duration-300 ${isScrolled ? "filter-none" : "brightness-0 invert"}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors font-medium ${
                  isScrolled ? "text-slate-700 hover:text-blue-900" : "text-white hover:text-emerald-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`md:hidden ${isScrolled ? "text-slate-700" : "text-white"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            className={`md:hidden mt-4 pb-4 pt-4 rounded-lg ${
              isScrolled ? "border-t border-slate-200" : "bg-black/20 backdrop-blur-sm"
            }`}
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors font-medium py-2 ${
                    isScrolled ? "text-slate-700 hover:text-blue-900" : "text-white hover:text-emerald-400"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
