import { z } from "zod"

// Esquema de validación para el formulario de contacto
export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres.",
  }),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

// Esquema de validación para el formulario de diagnóstico
export const diagnosticFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "El nombre completo debe tener al menos 2 caracteres.",
  }),
  company: z.string().min(2, {
    message: "El nombre de la empresa es requerido.",
  }),
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  position: z.string().min(2, {
    message: "El cargo/posición es requerido.",
  }),
  consent: z.boolean().refine((val) => val === true, {
    message: "Debe aceptar los términos y condiciones.",
  }),
})

export type DiagnosticFormValues = z.infer<typeof diagnosticFormSchema>

// Esquema para las preguntas de diagnóstico
export const diagnosticQuestionSchema = z.object({
  riskManagement: z.number().min(1).max(5),
  secureAccess: z.number().min(1).max(5),
  dataProtection: z.number().min(1).max(5),
  incidentResponse: z.number().min(1).max(5),
  secureDevelopment: z.number().min(1).max(5),
  assetManagement: z.number().min(1).max(5),
  securityAwareness: z.number().min(1).max(5),
  thirdPartyRisk: z.number().min(1).max(5),
})

export type DiagnosticQuestionValues = z.infer<typeof diagnosticQuestionSchema>

// Función para sanitizar texto de entrada
export function sanitizeInput(input: string): string {
  // Eliminar etiquetas HTML y caracteres especiales
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
}

// Función para validar y sanitizar datos del formulario
export function validateAndSanitizeContactForm(data: any): {
  isValid: boolean
  sanitizedData?: ContactFormValues
  errors?: Record<string, string[]>
} {
  try {
    // Primero sanitizamos los campos de texto
    const sanitizedData = {
      name: sanitizeInput(data.name || ""),
      email: sanitizeInput(data.email || ""),
      company: data.company ? sanitizeInput(data.company) : undefined,
      service: data.service ? sanitizeInput(data.service) : undefined,
      message: sanitizeInput(data.message || ""),
    }

    // Luego validamos con Zod
    const validatedData = contactFormSchema.parse(sanitizedData)

    return {
      isValid: true,
      sanitizedData: validatedData,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.flatten().fieldErrors,
      }
    }
    return {
      isValid: false,
      errors: {
        general: ["Ocurrió un error al procesar el formulario."],
      },
    }
  }
}
