"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import type { DiagnosticFormValues } from "@/lib/validation"
import { ArrowLeft, ArrowRight, Send } from "lucide-react"

interface DiagnosticQuestionsProps {
  userInfo: DiagnosticFormValues
  onComplete: (score: number) => void
}

interface Question {
  id: string
  category: string
  text: string
  description: string
}

const questions: Question[] = [
  {
    id: "riskManagement",
    category: "Gestión de Riesgos",
    text: "¿Su organización tiene un proceso formal de gestión de riesgos de ciberseguridad?",
    description:
      "Evalúe si su organización identifica, evalúa y mitiga sistemáticamente los riesgos de ciberseguridad.",
  },
  {
    id: "secureAccess",
    category: "Control de Acceso",
    text: "¿Implementa controles de acceso basados en el principio de mínimo privilegio?",
    description: "Evalúe si los usuarios solo tienen acceso a los recursos necesarios para sus funciones laborales.",
  },
  {
    id: "dataProtection",
    category: "Protección de Datos",
    text: "¿Su organización clasifica los datos según su sensibilidad y aplica controles acordes?",
    description: "Evalúe si existen mecanismos para identificar y proteger adecuadamente la información sensible.",
  },
  {
    id: "incidentResponse",
    category: "Respuesta a Incidentes",
    text: "¿Cuenta con un plan documentado de respuesta a incidentes de ciberseguridad?",
    description: "Evalúe la capacidad de su organización para detectar, responder y recuperarse de incidentes.",
  },
  {
    id: "secureDevelopment",
    category: "Desarrollo Seguro",
    text: "¿Integra prácticas de seguridad en el ciclo de vida de desarrollo de software?",
    description: "Evalúe si la seguridad es considerada desde las etapas iniciales del desarrollo de aplicaciones.",
  },
  {
    id: "assetManagement",
    category: "Gestión de Activos",
    text: "¿Mantiene un inventario actualizado de activos tecnológicos y sus vulnerabilidades?",
    description: "Evalúe si conoce todos los dispositivos y sistemas conectados a su red y sus riesgos asociados.",
  },
  {
    id: "securityAwareness",
    category: "Concientización",
    text: "¿Realiza capacitaciones regulares de concientización en ciberseguridad para todos los empleados?",
    description: "Evalúe si los empleados están preparados para identificar y responder a amenazas como phishing.",
  },
  {
    id: "thirdPartyRisk",
    category: "Riesgo de Terceros",
    text: "¿Evalúa los riesgos de ciberseguridad de proveedores y socios comerciales?",
    description: "Evalúe si gestiona adecuadamente los riesgos introducidos por terceros en su ecosistema.",
  },
]

export default function DiagnosticQuestions({ userInfo, onComplete }: DiagnosticQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  const handleSliderChange = (value: number[]) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value[0],
    })
  }

  const handleNext = () => {
    // Asegurarse de que la pregunta actual tenga una respuesta
    if (answers[currentQuestion.id] === undefined) {
      setAnswers({
        ...answers,
        [currentQuestion.id]: 3, // Valor predeterminado medio
      })
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Calcular puntuación
      const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0)
      const averageScore = totalScore / totalQuestions

      // Completar diagnóstico
      onComplete(averageScore)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  return (
    <Card className="bg-dark border-gray-800">
      <CardContent className="pt-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Pregunta {currentQuestionIndex + 1} de {totalQuestions}
            </span>
            <span className="text-sm text-gray-400">{progress.toFixed(0)}% completado</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-strategic h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-sm text-strategic mb-1">{currentQuestion.category}</div>
          <h3 className="text-xl font-bold mb-2">{currentQuestion.text}</h3>
          <p className="text-gray-400 text-sm">{currentQuestion.description}</p>
        </div>

        <div className="mb-10">
          <div className="mb-6">
            <Slider
              defaultValue={[answers[currentQuestion.id] || 3]}
              min={1}
              max={5}
              step={1}
              onValueChange={handleSliderChange}
              className="my-6"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>Nivel Básico</span>
              <span>Nivel Avanzado</span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-strategic">{answers[currentQuestion.id] || 3}</div>
            <div className="text-sm text-gray-400">
              {answers[currentQuestion.id] === 1 && "Inicial - Procesos ad hoc o inexistentes"}
              {answers[currentQuestion.id] === 2 && "Básico - Procesos definidos pero inconsistentes"}
              {answers[currentQuestion.id] === 3 && "Intermedio - Procesos establecidos y documentados"}
              {answers[currentQuestion.id] === 4 && "Avanzado - Procesos gestionados y medidos"}
              {answers[currentQuestion.id] === 5 && "Optimizado - Procesos en mejora continua"}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="border-gray-700 hover:border-strategic"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
          </Button>

          <Button onClick={handleNext} className="bg-strategic hover:bg-strategic/90 text-dark font-bold">
            {currentQuestionIndex < totalQuestions - 1 ? (
              <>
                Siguiente <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Finalizar <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
