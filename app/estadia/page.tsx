import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Wifi, Coffee, Car, Utensils, Bed, Calendar, Star, Phone, Mail } from "lucide-react"
import Image from "next/image"

export default function EstadiaPage() {
  const amenities = [
    { icon: Bed, label: "Habitaciones cómodas", description: "Camas queen size con ropa de cama premium" },
    {
      icon: Utensils,
      label: "Gastronomía regional",
      description: "Desayuno, almuerzo y cena con ingredientes locales",
    },
    { icon: Wifi, label: "WiFi gratuito", description: "Conexión de alta velocidad en todas las áreas" },
    { icon: Coffee, label: "Área de descanso", description: "Espacios comunes para relajarse y socializar" },
    { icon: Car, label: "Estacionamiento", description: "Seguro y gratuito para todos los huéspedes" },
    { icon: MapPin, label: "Ubicación privilegiada", description: "Acceso directo a los mejores puntos de avistaje" },
  ]

  const packages = [
    {
      name: "Escapada de Fin de Semana",
      duration: "2 días / 1 noche",
      price: "$45.000",
      includes: ["Alojamiento", "Desayuno", "1 excursión en lancha", "Guía especializado"],
      popular: false,
    },
    {
      name: "Experiencia Completa",
      duration: "3 días / 2 noches",
      price: "$85.000",
      includes: ["Alojamiento", "Pensión completa", "3 excursiones", "Safari fotográfico", "Guía especializado"],
      popular: true,
    },
    {
      name: "Aventura Extendida",
      duration: "5 días / 4 noches",
      price: "$150.000",
      includes: [
        "Alojamiento",
        "Pensión completa",
        "5 excursiones",
        "Cabalgata",
        "Avistaje nocturno",
        "Guía especializado",
      ],
      popular: false,
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/wild-wetlands-lodge-exterior-at-golden-hour--cozy-.png" alt="Wild Wetlands Lodge" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">Wild Wetlands Lodge</h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-200 max-w-3xl mx-auto leading-relaxed">
            En el corazón de los Esteros del Iberá, donde cada amanecer es una nueva aventura
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              <div className="lg:col-span-2 space-y-8">
                <Card className="bg-white shadow-lg border-0">
                  <CardContent className="p-8">
                    <h2 className="font-serif text-3xl font-bold text-slate-800 mb-6">Tu hogar en la naturaleza</h2>
                    <p className="text-lg text-slate-700 leading-relaxed mb-6">
                      Nuestro lodge está estratégicamente ubicado en el corazón de los Esteros del Iberá, ofreciendo
                      acceso inmediato a los mejores puntos de observación de fauna y flora. La construcción respeta la
                      arquitectura tradicional de la región, utilizando materiales locales y técnicas sostenibles.
                    </p>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      Cada habitación cuenta con vista panorámica a los humedales, permitiendo que despiertes con el
                      canto de las aves y te duermas arrullado por los sonidos de la naturaleza. Nuestro equipo de guías
                      locales está disponible las 24 horas para asistirte y compartir sus conocimientos sobre este
                      ecosistema único.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg border-0">
                  <CardContent className="p-8">
                    <h3 className="font-serif text-2xl font-bold text-slate-800 mb-6">Servicios y comodidades</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <div className="p-3 bg-emerald-100 rounded-full flex-shrink-0">
                            <amenity.icon className="h-6 w-6 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-1">{amenity.label}</h4>
                            <p className="text-slate-600 text-sm">{amenity.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-white shadow-lg border-0 sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-bold text-slate-800 mb-4">Información de contacto</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-emerald-600" />
                        <span className="text-slate-700">03786 42-0024</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-emerald-600" />
                        <span className="text-slate-700">info@turismodiversidad.com</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-emerald-600 mt-1" />
                        <span className="text-slate-700">Ituzaingó, Corrientes, Argentina</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700">
                      Consultar disponibilidad
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-slate-800 mb-12 text-center">Galería del lodge</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "lodge bedroom with rustic decor and nature view",
                "lodge dining area with regional cuisine",
                "lodge common area with fireplace and comfortable seating",
                "lodge exterior at sunset with wetlands view",
                "lodge bathroom with eco-friendly amenities",
                "lodge terrace overlooking the wetlands",
              ].map((query, index) => (
                <div
                  key={index}
                  className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Image
                    src={`/abstract-geometric-shapes.png?height=300&width=400&query=${query}`}
                    alt={`Lodge interior ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
