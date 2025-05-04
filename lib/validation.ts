import * as z from "zod";

// Define el esquema de validación con Zod
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduzca una dirección de correo válida." }),
  company: z.string().optional(),
  message: z.string().min(5, { message: "El mensaje debe tener al menos 5 caracteres." }),
});

// Define el tipo para los valores del formulario
export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Función para sanitizar entradas
function sanitizeInput(input: string): string {
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
      const filteredErrors = Object.fromEntries(
        Object.entries(error.flatten().fieldErrors).filter(([, value]) => value !== undefined)
      ) as Record<string, string[]>;
      return {
        isValid: false,
        errors: filteredErrors,
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
