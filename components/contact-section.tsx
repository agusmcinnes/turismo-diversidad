"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, MessageCircle, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactSection() {
  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">Contactanos</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Estamos listos para planificar tu próxima aventura. Escribinos o llamanos y armemos juntos la experiencia
            que siempre soñaste en los Esteros del Iberá.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-3 text-lg">Teléfono</h3>
                <p className="text-slate-600 text-md font-medium">+54 3786 408959</p>
                <p className="text-sm text-slate-500 mt-2">Llamanos para consultas inmediatas</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-3 text-lg">Email</h3>
                <p className="text-slate-600 text-md font-medium">turismodiversidadevt@gmail.com</p>
                <p className="text-sm text-slate-500 mt-2">Escribinos para más información</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm md:col-span-2 lg:col-span-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-3 text-lg">Ubicación</h3>
                <p className="text-slate-600 text-md font-medium">Buenos Aires 2143</p>
                <p className="text-slate-600 text-base">Ituzaingó, Corrientes, Argentina</p>
                <p className="text-sm text-slate-500 mt-2">W3302ANY</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-0 shadow-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Horarios de Atención</h3>
                    <p className="text-emerald-100">Lunes a Domingo: 8:00 - 20:00</p>
                    <p className="text-emerald-100 text-sm mt-1">Disponibles para emergencias 24/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
                    <p className="text-blue-100">+54 3786 408959</p>
                    <p className="text-blue-100 text-sm mt-1">International: +44 7778185825</p>
                    <p className="text-blue-100 text-sm mt-1">Respuesta rápida y personalizada</p>
                  </div>
                </div>
                <Button 
                  onClick={() => window.open('https://wa.me/5437864089559?text=Hola! Me gustaría obtener más información sobre sus servicios turísticos.', '_blank')}
                  className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all duration-300"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Escríbenos
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-2xl overflow-hidden p-0">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white text-center">
                <h3 className="font-semibold text-xl mb-2">Nuestra Ubicación</h3>
                <p className="text-emerald-100">Buenos Aires 2143, Ituzaingó, Corrientes, Argentina</p>
              </div>
              <div className="h-80 bg-gradient-to-br from-slate-100 to-emerald-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/map-of-ituzaingo-corrientes-argentina.png')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 text-center">
                  <MapPin className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium text-lg">Buenos Aires 2143</p>
                  <p className="text-slate-500">Ituzaingó, Corrientes, Argentina</p>
                  <p className="text-slate-500 text-sm">W3302ANY</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Section */}
          <div className="mt-8 text-center">
            <h3 className="font-serif text-2xl font-bold text-slate-800 mb-6">Síguenos en redes sociales</h3>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <a 
                href="https://instagram.com/turismo_diversidad" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-slate-600 hover:text-pink-600"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Instagram className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-medium">@turismo_diversidad</span>
              </a>
              <a 
                href="https://facebook.com/turismodiversidadevt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-slate-600 hover:text-blue-600"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                  <Facebook className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-medium">turismodiversidadevt</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
