import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Wifi, Coffee, Car, Utensils, Bed } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LodgeSection() {
  const amenities = [
    { icon: Bed, label: "Habitaciones cómodas", description: "Descanso reparador" },
    { icon: Utensils, label: "Gastronomía regional", description: "Sabores auténticos" },
    { icon: Wifi, label: "WiFi gratuito", description: "Conectividad completa" },
    { icon: Coffee, label: "Desayuno incluido", description: "Energía para explorar" },
    { icon: Car, label: "Estacionamiento", description: "Seguro y gratuito" },
    { icon: MapPin, label: "Ubicación privilegiada", description: "En el corazón del Iberá" },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">Wild Wetlands Lodge</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              En el corazón de los Esteros del Iberá, te esperamos con la comodidad que merecés después de un día lleno
              de aventuras y descubrimientos.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6 animate-slide-up">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/cozy-eco-lodge-cabin-in-wetlands--wooden-architect.png"
                  alt="Wild Wetlands Lodge - Vista exterior"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm font-medium text-slate-800">Vista exterior del lodge</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-[180px] rounded-xl overflow-hidden shadow-lg">
                  <Image src="/comfortable-lodge-bedroom-with-rustic-decor--woode.png" alt="Habitación del lodge" fill className="object-cover" />
                </div>
                <div className="relative h-[180px] rounded-xl overflow-hidden shadow-lg">
                  <Image src="/lodge-dining-area-with-regional-food--rustic-table.png" alt="Área de comedor" fill className="object-cover" />
                </div>
              </div>
            </div>

            <div className="space-y-8 animate-slide-up">
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl font-bold text-slate-800 mb-4">Tu refugio en la naturaleza</h3>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    Nuestro lodge combina la autenticidad de la arquitectura regional con las comodidades modernas que
                    necesitás. Cada detalle está pensado para que tu estadía sea memorable, desde las habitaciones con
                    vista a los humedales hasta los espacios comunes donde podés relajarte y compartir experiencias con
                    otros viajeros.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="p-2 bg-emerald-100 rounded-full flex-shrink-0">
                          <amenity.icon className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{amenity.label}</p>
                          <p className="text-xs text-slate-600">{amenity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Link href="/estadia" className="flex-1">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                        Ver más detalles
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="flex-1 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                    >
                      Consultar disponibilidad
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center animate-fade-in">
            <Card className="bg-gradient-to-r from-emerald-600 to-blue-600 border-0 shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
                  ¿Listo para vivir la experiencia completa?
                </h3>
                <p className="text-emerald-100 text-lg mb-6 max-w-2xl mx-auto">
                  Combiná tus excursiones con una estadía inolvidable en nuestro lodge. Paquetes especiales disponibles.
                </p>
                <Link href="/estadia">
                  <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-slate-100">
                    Explorar paquetes de estadía
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
