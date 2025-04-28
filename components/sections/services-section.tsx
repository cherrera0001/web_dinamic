"use client"

import { useEffect, useRef } from "react"
import { UserCheck, Flag, GitBranch, GraduationCap, LineChart, ShieldAlert } from "lucide-react"
import ServiceCard from "@/components/ui/service-card"

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".service-card")
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-fade-in-up")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Nuestros Servicios <span className="text-offensive">Ofensivos</span> y{" "}
            <span className="text-strategic">Estratégicos</span>
          </h2>
          <p className="section-description">
            Soluciones integrales de ciberseguridad adaptadas a las necesidades y nivel de madurez de su organización.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<UserCheck className="text-offensive text-2xl" />}
            title="Ethical Hacking"
            description="Identifique vulnerabilidades antes que los atacantes con nuestros servicios integrales de pruebas de penetración que cubren aplicaciones web, redes e ingeniería social."
            features={[
              "Pruebas de Aplicaciones Web",
              "Pruebas de Infraestructura de Red",
              "Evaluaciones de Ingeniería Social",
            ]}
            accentColor="offensive"
          />

          <ServiceCard
            icon={<Flag className="text-offensive text-2xl" />}
            title="Red Teaming"
            description="Simule ataques de adversarios reales para probar las capacidades de detección y respuesta de su organización en personas, procesos y tecnología."
            features={[
              "Simulación Completa de Adversarios",
              "Ejercicios de Purple Teaming",
              "Pruebas de Seguridad Física",
            ]}
            accentColor="offensive"
          />

          <ServiceCard
            icon={<GitBranch className="text-offensive text-2xl" />}
            title="DevSecOps"
            description="Integre la seguridad en su pipeline de CI/CD con nuestros servicios DevSecOps, garantizando código seguro desde el desarrollo hasta la producción."
            features={[
              "Integración de Seguridad en CI/CD",
              "Seguridad de Infraestructura como Código",
              "Seguridad de Contenedores y Kubernetes",
            ]}
            accentColor="offensive"
          />

          <ServiceCard
            icon={<GraduationCap className="text-training text-2xl" />}
            title="Security Trainings"
            description="Mejore las habilidades de su equipo con nuestros programas de capacitación práctica en ciberseguridad adaptados a diferentes roles y niveles de habilidad."
            features={[
              "Prácticas de Codificación Segura",
              "Capacitación en Respuesta a Incidentes",
              "Concientización Ejecutiva en Ciberseguridad",
            ]}
            accentColor="training"
          />

          <ServiceCard
            icon={<LineChart className="text-strategic text-2xl" />}
            title="Maturity Assessment"
            description="Evalúe su postura de ciberseguridad frente a estándares y marcos de la industria para identificar brechas y priorizar mejoras."
            features={[
              "Alineación con NIST CSF",
              "Análisis de Brechas ISO 27001",
              "Desarrollo de Hoja de Ruta Personalizada",
            ]}
            accentColor="strategic"
          />

          <ServiceCard
            icon={<ShieldAlert className="text-strategic text-2xl" />}
            title="Managed Security"
            description="Monitoreo continuo y operaciones de seguridad para proteger su organización 24/7 con nuestro equipo de expertos."
            features={[
              "Monitoreo y Ajuste de SIEM",
              "Servicios de Threat Hunting",
              "Retención para Respuesta a Incidentes",
            ]}
            accentColor="strategic"
          />
        </div>
      </div>
    </section>
  )
}
