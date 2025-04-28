import { type NextRequest, NextResponse } from "next/server"
import { validateAndSanitizeContactForm } from "@/lib/validation"
import { verifyOrigin, checkRateLimit, verifyRecaptcha, setSecurityHeaders } from "@/lib/security"

export async function POST(request: NextRequest) {
  // Establecer encabezados de seguridad
  const headers = new Headers()
  setSecurityHeaders(headers)

  try {
    // Verificar origen de la solicitud
    if (!verifyOrigin(request)) {
      return NextResponse.json({ error: "Origen no permitido" }, { status: 403, headers })
    }

    // Verificar límite de tasa (rate limiting)
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Por favor, inténtelo más tarde." },
        { status: 429, headers },
      )
    }

    // Obtener y validar datos del formulario
    const formData = await request.json()

    // Verificar reCAPTCHA
    if (formData.recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(formData.recaptchaToken)
      if (!isValidRecaptcha) {
        return NextResponse.json({ error: "Verificación de reCAPTCHA fallida" }, { status: 400, headers })
      }
    }

    // Validar y sanitizar datos del formulario
    const { isValid, sanitizedData, errors } = validateAndSanitizeContactForm(formData)

    if (!isValid || !sanitizedData) {
      return NextResponse.json({ error: "Datos de formulario inválidos", details: errors }, { status: 400, headers })
    }

    // Aquí procesaríamos los datos (enviar email, guardar en base de datos, etc.)
    // Por ahora, simulamos una respuesta exitosa

    return NextResponse.json(
      {
        success: true,
        message: "Mensaje enviado con éxito",
      },
      { status: 200, headers },
    )
  } catch (error) {
    console.error("Error en el procesamiento del formulario:", error)

    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500, headers })
  }
}
