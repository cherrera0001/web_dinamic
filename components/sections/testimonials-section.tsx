import TestimonialCard from "@/components/ui/testimonial-card"

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Lo Que Dicen Nuestros <span className="text-offensive">Clientes</span>
          </h2>
          <p className="section-description">
            Empresas de diversos sectores confían en nosotros para mejorar su postura de seguridad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            quote="Las pruebas de penetración de C4A descubrieron vulnerabilidades críticas en nuestras aplicaciones web que nuestro equipo interno había pasado por alto. Su informe detallado y guía de remediación fueron invaluables."
            name="Juan Fernández"
            role="CTO, Fintech Startup"
            initials="JF"
          />

          <TestimonialCard
            quote="El ejercicio de red team realizado por C4A fue revelador. Lograron eludir nuestros controles de seguridad de formas que no habíamos anticipado, proporcionándonos información procesable para mejorar nuestras defensas."
            name="María Pérez"
            role="CISO, Institución Financiera"
            initials="MP"
          />

          <TestimonialCard
            quote="La capacitación en DevSecOps de C4A transformó el enfoque de seguridad de nuestro equipo de desarrollo. Hemos reducido significativamente las vulnerabilidades en nuestro código base manteniendo nuestro rápido ciclo de lanzamiento."
            name="Andrés González"
            role="Director de Ingeniería, Empresa SaaS"
            initials="AG"
          />
        </div>
      </div>
    </section>
  )
}
