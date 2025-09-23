import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Bird, Waves } from "lucide-react"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-16 text-center">Sobre Nosotros</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 rounded-full">
                      <Leaf className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-slate-800">Acerca de nosotros</h3>
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed mb-4">
                    En Turismo Diversidad creemos que cada viaje debe ser una experiencia única.
                  </p>
                  <p className="text-lg text-slate-700 leading-relaxed mb-4">
                    Nacimos en 2003 en Barcelona, España, diseñando viajes a medida y experiencias personalizadas, siempre atentos a los deseos y expectativas de cada viajero.
                  </p>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    Desde 2009 continuamos nuestro camino en la provincia de Corrientes, Argentina, donde impulsamos el ecoturismo en los Esteros del Iberá y la región Litoral. Nuestro compromiso es ofrecer propuestas auténticas, que conecten a las personas con la naturaleza y la cultura local, generando al mismo tiempo un impacto positivo en la conservación y en las comunidades anfitrionas.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Bird className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-slate-800">Nuestra Experiencia</h3>
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed mb-4">
                    Con más de 20 años de trayectoria, son los propios viajeros quienes mejor nos definen en sus opiniones:
                  </p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2 text-slate-700">
                      <span className="text-emerald-600 mt-1">🌿</span>
                      <span>"Una atención cálida y personalizada desde el primer contacto"</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-700">
                      <span className="text-emerald-600 mt-1">🌿</span>
                      <span>"Experiencias únicas en plena naturaleza, organizadas con profesionalismo"</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-700">
                      <span className="text-emerald-600 mt-1">🌿</span>
                      <span>"Un servicio confiable, responsable y comprometido con la conservación"</span>
                    </div>
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    Estos reconocimientos en Tripadvisor y Google reflejan lo que más nos caracteriza: la pasión por brindar calidad, confianza y cercanía en cada experiencia.
                  </p>
                  <p className="text-lg text-slate-700 leading-relaxed mt-4 font-medium">
                    En Turismo Diversidad, cada viaje es una oportunidad para descubrir, aprender y disfrutar con conciencia.
                  </p>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Waves className="h-5 w-5" />
                  <span className="text-sm font-medium">Turismo Sostenible</span>
                </div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <div className="flex items-center gap-2 text-blue-600">
                  <Bird className="h-5 w-5" />
                  <span className="text-sm font-medium">Experiencias Auténticas</span>
                </div>
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="flex items-center gap-2 text-amber-600">
                  <Leaf className="h-5 w-5" />
                  <span className="text-sm font-medium">Guías Locales</span>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/beautiful-landscape-of-esteros-del-iber--wetlands-.png"
                  alt="Paisajes inspiradores de los Esteros del Iberá"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                  <Bird className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                  <Waves className="h-6 w-6 text-blue-600" />
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-amber-400 to-emerald-500 rounded-full opacity-15 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
