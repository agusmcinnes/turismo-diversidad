import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  const quickLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#sobre-nosotros", label: "Sobre nosotros" },
    { href: "#excursiones", label: "Excursiones" },
    { href: "#blog", label: "Blog" },
    { href: "#contacto", label: "Contacto" },
  ]

  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 w-fill">
              <Image src="/images/logo.png" alt="Turismo Diversidad" width={120} height={50} className="bg-white p-4 rounded-xl" />
            </div>
            <p className="text-slate-300 leading-relaxed">
              Experiencias auténticas en los Esteros del Iberá. Conectá con la naturaleza de Corrientes de manera
              responsable y segura.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6">Enlaces rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-300 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6">Seguinos</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center">
          <p className="text-slate-400">© 2025 Turismo Diversidad. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
