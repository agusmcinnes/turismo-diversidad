"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { TravelPackage } from "@/types/travel-package"
import Image from "next/image"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Car, Star } from "lucide-react"

export default function ExcursionsSection() {
  const [excursions, setExcursions] = useState<TravelPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function fetchExcursions() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("travel_packages")
        .select("*")
        .eq("type", "excursion")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching excursions:", error)
      } else {
        setExcursions(data || [])
      }
      setLoading(false)
    }

    fetchExcursions()
  }, [])

  const handleImageError = (excursionId: string) => {
    setImageErrors(prev => new Set(prev).add(excursionId))
  }

  if (loading) {
    return (
      <section id="excursiones" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">Excursiones y Experiencias</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Descubre experiencias únicas en los Esteros del Iberá
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-t-lg"></div>
                <div className="bg-white p-6 rounded-b-lg">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="excursiones" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">Excursiones y Experiencias</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Vive aventuras inolvidables en los Esteros del Iberá con nuestras excursiones especializadas
          </p>
        </div>

        {excursions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay excursiones disponibles en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {excursions.map((excursion) => (
              <Card
                key={excursion.id}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden bg-white p-0"
              >
                <div className="relative h-64 overflow-hidden">
                  {!excursion.image_url || imageErrors.has(excursion.id) ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <div className="text-center text-white">
                        <MapPin className="w-16 h-16 mx-auto mb-2 opacity-50" />
                        <p className="text-sm opacity-75">Imagen no disponible</p>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={excursion.image_url}
                      alt={excursion.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={() => handleImageError(excursion.id)}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{excursion.name}</h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {excursion.destination}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1">
                      Excursión
                    </Badge>
                  </div>
                  {excursion.price && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1">
                        ${excursion.price.toLocaleString()}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <CardDescription className="text-gray-600 mb-4 line-clamp-3">{excursion.description}</CardDescription>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="font-medium">
                        {excursion.duration_days} día{excursion.duration_days > 1 ? 's' : ''}
                        {excursion.duration_nights > 0 && `, ${excursion.duration_nights} noche${excursion.duration_nights > 1 ? 's' : ''}`}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Car className="w-4 h-4 mr-2 text-green-600" />
                      <span>{excursion.transportation}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      Servicios Incluidos
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {excursion.services.slice(0, 3).map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {excursion.services.length > 3 && (
                        <Badge variant="outline" className="text-xs text-gray-500">
                          +{excursion.services.length - 3} más
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    onClick={() => window.open(`https://wa.me/5437864089559?text=Hola! Me interesa la excursión "${excursion.name}". Me gustaría obtener más información.`, '_blank')}
                  >
                    Más Información
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}