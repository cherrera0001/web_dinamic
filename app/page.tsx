import HeroSection from "@/components/sections/hero-section"
import TrustBadges from "@/components/sections/trust-badges"
import ServicesSection from "@/components/sections/services-section"
import AboutSection from "@/components/sections/about-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import MaturityKitSection from "@/components/sections/maturity-kit-section"
import ContactSection from "@/components/sections/contact-section"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustBadges />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <MaturityKitSection />
      <ContactSection />
    </main>
  )
}
