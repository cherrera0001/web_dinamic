"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export default function SimpleDiagnostic() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="bg-dark border-gray-800">
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">¡Gracias por su interés!</h2>
            <p className="text-gray-300 mb-6">
              Hemos recibido su solicitud para el diagnóstico de madurez en ciberseguridad. Un especialista de C4A se
              pondrá en contacto con usted pronto.
            </p>
            <Button asChild className="bg-strategic hover:bg-strategic/90 text-dark font-bold">
              <a href="/">Volver al Inicio</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-dark border-gray-800">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre Completo</Label>
            <Input
              id="fullName"
              name="fullName"
              required
              className="bg-darker border-gray-700 focus:border-strategic"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Empresa</Label>
            <Input id="company" name="company" required className="bg-darker border-gray-700 focus:border-strategic" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              required
              className="bg-darker border-gray-700 focus:border-strategic"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Cargo/Posición</Label>
            <Input
              id="position"
              name="position"
              required
              className="bg-darker border-gray-700 focus:border-strategic"
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="consent" name="consent" required />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="consent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Acepto los términos y condiciones y la política de privacidad
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full bg-strategic hover:bg-strategic/90 text-dark font-bold">
            Solicitar Diagnóstico
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
