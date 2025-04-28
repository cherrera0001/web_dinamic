"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { diagnosticFormSchema, type DiagnosticFormValues } from "@/lib/validation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import DiagnosticQuestions from "@/components/diagnostic/diagnostic-questions"

export default function DiagnosticForm() {
  const [step, setStep] = useState<"registration" | "questions" | "results">("registration")
  const [maturityScore, setMaturityScore] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<DiagnosticFormValues>({
    resolver: zodResolver(diagnosticFormSchema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      position: "",
      consent: false,
    },
  })

  const onSubmitRegistration = (data: DiagnosticFormValues) => {
    // Avanzamos al siguiente paso sin operaciones asíncronas
    setStep("questions")
  }

  const handleQuestionsComplete = (score: number) => {
    setMaturityScore(score)
    setStep("results")
  }

  const handleStartOver = () => {
    setStep("registration")
    setMaturityScore(null)
  }

  return (
    <div>
      {step === "registration" && (
        <Card className="bg-dark border-gray-800">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmitRegistration)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  className="bg-darker border-gray-700 focus:border-strategic"
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  {...register("company")}
                  className="bg-darker border-gray-700 focus:border-strategic"
                />
                {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="bg-darker border-gray-700 focus:border-strategic"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Cargo/Posición</Label>
                <Input
                  id="position"
                  {...register("position")}
                  className="bg-darker border-gray-700 focus:border-strategic"
                />
                {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="consent" {...register("consent")} />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="consent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Acepto los términos y condiciones y la política de privacidad
                  </Label>
                  {errors.consent && <p className="text-red-500 text-sm">{errors.consent.message}</p>}
                </div>
              </div>

              <Button type="submit" className="w-full bg-strategic hover:bg-strategic/90 text-dark font-bold">
                Continuar al Diagnóstico
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {step === "questions" && <DiagnosticQuestions userInfo={getValues()} onComplete={handleQuestionsComplete} />}

      {step === "results" && maturityScore !== null && (
        <Card className="bg-dark border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Resultados del Diagnóstico</h2>
              <div className="mb-6">
                <div className="text-4xl font-bold text-strategic mb-2">{maturityScore.toFixed(1)}/5.0</div>
                <p className="text-gray-300">Nivel de Madurez en Ciberseguridad</p>
              </div>

              <div className="mb-8">
                <p className="text-gray-300 mb-4">
                  Gracias por completar el diagnóstico de madurez en ciberseguridad. Hemos enviado un informe detallado
                  a su correo electrónico.
                </p>
                <p className="text-gray-300">
                  Un especialista de C4A se pondrá en contacto con usted para discutir los resultados y recomendaciones
                  personalizadas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleStartOver} variant="outline" className="border-gray-700 hover:border-strategic">
                  Realizar Nuevo Diagnóstico
                </Button>
                <Button asChild className="bg-strategic hover:bg-strategic/90 text-dark font-bold">
                  <a href="/">Volver al Inicio</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
