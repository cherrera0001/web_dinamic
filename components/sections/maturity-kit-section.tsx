import Link from "next/link"
import { Check, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MaturityKitSection() {
  return (
    <section id="kit" className="py-20 px-4 sm:px-6 lg:px-8 bg-darker">
      <div className="max-w-7xl mx-auto">
        <div className="bg-dark border border-strategic rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Kit Gratuito de <span className="text-strategic">Madurez en Ciberseguridad</span>
              </h2>
              <p className="text-gray-300 mb-6">
                Descargue nuestro Kit Gratuito de Evaluación de Madurez en Ciberseguridad para evaluar la postura de
                seguridad de su organización frente a los estándares de la industria.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-strategic mr-3" />
                  <span>Cuestionario de autoevaluación</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-strategic mr-3" />
                  <span>Metodología de puntuación</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-strategic mr-3" />
                  <span>Datos de benchmarking</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-strategic mr-3" />
                  <span>Recomendaciones accionables</span>
                </li>
              </ul>
              <Button asChild className="bg-strategic hover:bg-strategic/90 text-dark font-bold">
                <Link href="#contact">
                  <Download className="mr-2 h-4 w-4" /> Solicitar Kit Gratuito
                </Link>
              </Button>
            </div>

            <div className="bg-darker border border-gray-800 rounded-lg p-6 flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-24 w-24 text-strategic mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">C4A Maturity Kit</h3>
                <p className="text-gray-400">Evaluación interactiva de madurez en ciberseguridad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
