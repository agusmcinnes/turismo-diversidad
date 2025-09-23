import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Laura P.",
    text: "Una experiencia inolvidable, el contacto con la naturaleza es único",
    rating: 5,
  },
  {
    name: "Martín G.",
    text: "Los guías son súper atentos y conocedores del lugar",
    rating: 5,
  },
  {
    name: "Sofía R.",
    text: "Volvería una y mil veces, increíble todo lo que vimos",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">Testimonios</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Lo que dicen nuestros visitantes sobre sus experiencias
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 text-lg mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <p className="font-semibold text-slate-800">{testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
