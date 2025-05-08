import * as z from "zod";

// ✅ Esquema de validación optimizado y seguro con Zod
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." })
    .max(50, { message: "El nombre no puede exceder los 50 caracteres." }),
  email: z
    .string()
    .trim()
    .email({ message: "Por favor, introduzca una dirección de correo válida." })
    .max(100, { message: "El correo no puede exceder los 100 caracteres." }),
  company: z
    .string()
    .trim()
    .optional()
    .max(100, { message: "El nombre de la empresa no puede exceder los 100 caracteres." }),
  message: z
    .string()
    .trim()
    .min(5, { message: "El mensaje debe tener al menos 5 caracteres." })
    .max(500, { message: "El mensaje no puede exceder los 500 caracteres." }),
});

// ✅ Define el tipo para los valores del formulario
export type ContactFormValues = z.infer<typeof contactFormSchema>;

// ✅ Función de sanitización segura para prevenir XSS (mejorada)
function sanitizeInput(input: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
    "`": "&#x60;", // Nuevo: protección contra template literals
  };

  return input.replace(/[&<>"'/`]/g, (match) => map[match] || match);
}

// ✅ Validar y sanitizar datos del formulario (mejorado y seguro)
export function validateAndSanitizeContactForm(data: any): {
  isValid: boolean;
  sanitizedData?: ContactFormValues;
  errors?: Record<string, string[]>;
} {
  try {
    // ✅ Validar datos con Zod
    const validatedData = contactFormSchema.parse(data);

    // ✅ Sanitizar datos después de la validación
    const sanitizedData: ContactFormValues = {
      name: sanitizeInput(validatedData.name),
      email: sanitizeInput(validatedData.email),
      company: validatedData.company ? sanitizeInput(validatedData.company) : undefined,
      message: sanitizeInput(validatedData.message),
    };

    return {
      isValid: true,
      sanitizedData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // ✅ Captura y organiza errores específicos del formulario
      const formattedErrors = Object.fromEntries(
        Object.entries(error.flatten().fieldErrors)
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => [key, value ?? []])
      ) as Record<string, string[]>;

      return {
        isValid: false,
        errors: formattedErrors,
      };
    }

    // ✅ Manejo seguro de errores inesperados
    console.error("🚨 Error inesperado en la validación del formulario:", error);

    return {
      isValid: false,
      errors: {
        general: ["🚨 Error al procesar el formulario. Intente nuevamente más tarde."],
      },
    };
  }
}
