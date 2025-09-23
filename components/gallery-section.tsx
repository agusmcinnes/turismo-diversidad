import Image from "next/image"

const galleryImages = [
  {
    src: "/images/gallery-1.png",
    alt: "Atardecer en los Esteros del Iberá",
  },
  {
    src: "/images/gallery-2.png",
    alt: "Familia de carpinchos",
  },
  {
    src: "/images/gallery-3.png",
    alt: "Aves del Iberá",
  },
]

export default function GallerySection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">Galería</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Imágenes que capturan la belleza natural de los Esteros del Iberá
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative h-80 overflow-hidden rounded-lg shadow-lg group cursor-pointer">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
