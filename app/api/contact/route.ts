import { type NextRequest, NextResponse } from "next/server";
import { validateAndSanitizeContactForm } from "@/lib/validation";
import { verifyOrigin, checkRateLimit, verifyRecaptcha, setSecurityHeaders } from "@/lib/security";

export async function POST(request: NextRequest) {
  const headers = new Headers();
  await setSecurityHeaders(headers);

  try {
    // ✅ Verificar origen de la solicitud
    if (!verifyOrigin(request)) {
      return NextResponse.json(
        { error: "🚫 Origen no permitido." },
        { status: 403, headers }
      );
    }

    // ✅ Verificar límite de tasa (Rate limiting)
    const ip = request.headers.get("x-forwarded-for") || request.ip || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "🚫 Demasiadas solicitudes. Por favor, inténtelo más tarde." },
        { status: 429, headers }
      );
    }

    // ✅ Obtener y validar datos del formulario
    const formData = await request.json();
    if (!formData) {
      return NextResponse.json(
        { error: "🚫 Datos del formulario no proporcionados." },
        { status: 400, headers }
      );
    }

    // ✅ Verificar reCAPTCHA (Obligatorio)
    if (!formData["g-recaptcha-response"]) {
      return NextResponse.json(
        { error: "🚫 reCAPTCHA no proporcionado." },
        { status: 400, headers }
      );
    }

    const isValidRecaptcha = await verifyRecaptcha(formData["g-recaptcha-response"]);
    if (!isValidRecaptcha) {
      return NextResponse.json(
        { error: "🚫 Verificación de reCAPTCHA fallida." },
        { status: 400, headers }
      );
    }

    // ✅ Validar y sanitizar datos del formulario
    const { isValid, sanitizedData, errors } = validateAndSanitizeContactForm(formData);

    if (!isValid || !sanitizedData) {
      return NextResponse.json(
        { 
          error: "🚫 Datos de formulario inválidos.", 
          details: errors 
        },
        { status: 400, headers }
      );
    }

    // ✅ Proceso exitoso (Enviar correo, guardar en DB, etc.)
    // Puedes reemplazar esto con tu lógica (por ejemplo, enviar correo con nodemailer)
    console.log("📧 Formulario recibido:", sanitizedData);

    return NextResponse.json(
      {
        success: true,
        message: "✅ Mensaje enviado con éxito.",
      },
      { status: 200, headers }
    );

  } catch (error) {
    console.error("🚨 Error en el procesamiento del formulario:", {
      message: (error as Error).message,
      stack: (error as Error).stack,
    });

    return NextResponse.json(
      {
        error: "🚨 Error interno del servidor. Por favor, intente nuevamente.",
        details: (error as Error).message,
      },
      { status: 500, headers }
    );
  }
}
