"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { TravelPackage } from "@/types/travel-package"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Car, Star } from "lucide-react"
import Image from "next/image"

export default function TravelPackagesSection() {
  const [packages, setPackages] = useState<TravelPackage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPackages() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("travel_packages")
        .select("*")
        .eq("type", "paquete_viaje")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching packages:", error)
      } else {
        setPackages(data || [])
      }
      setLoading(false)
    }

    fetchPackages()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Paquetes de Viaje</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre experiencias únicas en los Esteros del Iberá
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-t-lg"></div>
                <div className="bg-white p-6 rounded-b-lg">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                  <div className="h-20 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="paquetes" className="py-20 bg-gradient-to-b from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Paquetes de Viaje</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre experiencias únicas en los Esteros del Iberá con nuestros paquetes cuidadosamente diseñados
          </p>
        </div>

        {packages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay paquetes de viaje disponibles en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden bg-white p-0"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={pkg.image_url || "/placeholder.svg?height=400&width=600&query=esteros del ibera landscape"}
                  alt={pkg.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="flex items-center text-white/90 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {pkg.destination}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge 
                    className={`${pkg.type === 'excursion' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'} text-white font-semibold px-3 py-1`}
                  >
                    {pkg.type === 'excursion' ? 'Excursión' : 'Paquete de Viaje'}
                  </Badge>
                </div>
                {pkg.price && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1">
                      ${pkg.price.toLocaleString()}
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <CardDescription className="text-gray-600 mb-4 line-clamp-3">{pkg.description}</CardDescription>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="font-medium">
                      {pkg.duration_days} días, {pkg.duration_nights} noches
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Car className="w-4 h-4 mr-2 text-green-600" />
                    <span>{pkg.transportation}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    Servicios Incluidos
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {pkg.services.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                        {service}
                      </Badge>
                    ))}
                    {pkg.services.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                        +{pkg.services.length - 3} más
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">Ver Detalles</Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                    onClick={() => window.open(`https://wa.me/5437864089559?text=Hola! Me interesa el paquete "${pkg.name}". Me gustaría obtener más información.`, '_blank')}
                  >
                    Más información
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        )}
      </div>
    </section>
  )
}
