"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Terminal from "@/components/ui/terminal"

export default function HeroSection() {
  return (
    <section className="hero-gradient pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Su Primera Línea de Defensa Es <span className="text-offensive">Entender Cómo Piensan los Atacantes</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              C4A ayuda a las organizaciones a desarrollar resiliencia mediante pruebas de seguridad ofensiva,
              simulaciones de red team y consultoría estratégica de ciberseguridad.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-offensive hover:bg-offensive/90 text-white">
                <Link href="#contact">Solicitar Diagnóstico Gratuito</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-600 hover:border-gray-500">
                <Link href="#services">Explorar Servicios</Link>
              </Button>
            </div>
          </div>

          <Terminal />
        </div>
      </div>
    </section>
  )
}
