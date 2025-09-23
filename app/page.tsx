import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import TravelPackagesSection from "@/components/travel-packages-section"
import ExcursionsSection from "@/components/excursions-section"
import LodgeSection from "@/components/lodge-section"
import GallerySection from "@/components/gallery-section"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-hidden">
      <Header />
      <HeroSection />
      <AboutSection />
      <TravelPackagesSection />
      <ExcursionsSection />
      <LodgeSection />
      <GallerySection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
