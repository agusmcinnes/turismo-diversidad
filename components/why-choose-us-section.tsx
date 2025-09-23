import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, Shield, Phone, Leaf } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Guías locales expertos",
    description: "Conocimiento profundo del ecosistema y la cultura local",
  },
  {
    icon: Heart,
    title: "Experiencias personalizadas",
    description: "Adaptamos cada tour a tus intereses y necesidades",
  },
  {
    icon: Leaf,
    title: "Turismo responsable",
    description: "Comprometidos con la conservación del medio ambiente",
  },
  {
    icon: Shield,
    title: "Seguridad garantizada",
    description: "Equipos de seguridad y protocolos establecidos",
  },
  {
    icon: Phone,
    title: "Contacto directo y cercano",
    description: "Atención personalizada antes, durante y después del viaje",
  },
]

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">¿Por qué elegirnos?</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Nuestro compromiso con la excelencia y la naturaleza nos distingue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
