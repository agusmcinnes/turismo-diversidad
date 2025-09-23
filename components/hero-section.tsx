import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-carpincho.webp"
          alt="Carpincho en los Esteros del Iberá"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60" />
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-normal">
          Viví la magia de los
          <span className="block text-emerald-400">Esteros del Iberá</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-slate-200 max-w-3xl mx-auto leading-relaxed">
          Descubrí la naturaleza en su máxima expresión con experiencias únicas en el corazón de Corrientes
        </p>

        <Button
          size="lg"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
        >
          <a href="#excursiones">Explorar experiencias</a>
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        
      </div>
    </section>
  )
}
