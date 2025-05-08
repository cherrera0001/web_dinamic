import { type NextRequest, NextResponse } from "next/server";
import { validateAndSanitizeContactForm } from "@/lib/validation";
import { verifyOrigin, checkRateLimit, verifyRecaptcha, setSecurityHeaders } from "@/lib/security";

// ✅ Función principal de manejo de solicitudes POST
export async function POST(request: NextRequest) {
  const headers = new Headers();
  await setSecurityHeaders(headers);

  try {
    // ✅ Verificar origen de la solicitud (Más seguro y configurable)
    if (!verifyOrigin(request)) {
      return errorResponse("🚫 Origen no permitido.", 403, headers);
    }

    // ✅ Verificar límite de tasa (Rate limiting) (Control por IP, seguro)
    const ip = getClientIP(request);
    if (!checkRateLimit(ip)) {
      return errorResponse("🚫 Demasiadas solicitudes. Por favor, inténtelo más tarde.", 429, headers);
    }

    // ✅ Obtener y validar datos del formulario (Verificación robusta)
    const formData = await request.json();
    if (!formData || typeof formData !== "object") {
      return errorResponse("🚫 Datos del formulario no proporcionados o inválidos.", 400, headers);
    }

    // ✅ Verificar reCAPTCHA (Obligatorio y seguro)
    const recaptchaToken = formData["g-recaptcha-response"];
    if (!recaptchaToken) {
      return errorResponse("🚫 reCAPTCHA no proporcionado.", 400, headers);
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidRecaptcha) {
      return errorResponse("🚫 Verificación de reCAPTCHA fallida.", 400, headers);
    }

    // ✅ Validar y sanitizar datos del formulario
    const { isValid, sanitizedData, errors } = validateAndSanitizeContactForm(formData);

    if (!isValid || !sanitizedData) {
      return errorResponse(
        "🚫 Datos de formulario inválidos.",
        400,
        headers,
        { details: errors }
      );
    }

    // ✅ Proceso exitoso (Enviar correo, guardar en DB, etc.)
    console.log("📧 Formulario recibido:", sanitizedData);

    // ✅ Aquí puedes integrar tu lógica de envío de correos o almacenamiento
    // Por ejemplo: await sendEmail(sanitizedData);
    // await saveToDatabase(sanitizedData);

    return successResponse(
      "✅ Mensaje enviado con éxito.",
      sanitizedData,
      headers
    );

  } catch (error) {
    console.error("🚨 Error en el procesamiento del formulario:", {
      message: (error as Error).message,
      stack: (error as Error).stack,
    });

    return errorResponse(
      "🚨 Error interno del servidor. Por favor, intente nuevamente.",
      500,
      headers,
      { details: (error as Error).message }
    );
  }
}

// ✅ Función para obtener la IP del cliente (más robusta y segura)
function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || // Verificar proxy
    request.ip || // Fallback al IP original
    "unknown"
  );
}

// ✅ Función de respuesta de error estandarizada
function errorResponse(
  message: string,
  status: number,
  headers: Headers,
  extra?: Record<string, any>
) {
  return NextResponse.json(
    {
      error: message,
      ...extra,
    },
    { status, headers }
  );
}

// ✅ Función de respuesta de éxito estandarizada
function successResponse(
  message: string,
  data: Record<string, any>,
  headers: Headers
) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status: 200, headers }
  );
}
