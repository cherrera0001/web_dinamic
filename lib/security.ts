import { headers } from "next/headers"
import type { NextRequest } from "next/server"

// Función para verificar CSRF token
export function verifyCsrfToken(request: NextRequest, token: string): boolean {
  const storedToken = request.cookies.get("csrf_token")?.value
  return storedToken === token
}

// Función para generar CSRF token
export function generateCsrfToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

// Función para verificar el origen de la solicitud
export function verifyOrigin(request: NextRequest): boolean {
  const headersList = headers()
  const origin = headersList.get("origin")
  const host = headersList.get("host")

  // Verificar que el origen coincida con el host
  if (!origin || !host) return false

  const originUrl = new URL(origin)
  return originUrl.host === host
}

// Función para verificar la tasa de solicitudes (rate limiting)
const requestCounts = new Map<string, { count: number; timestamp: number }>()

export function checkRateLimit(ip: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now()
  const requestData = requestCounts.get(ip) || { count: 0, timestamp: now }

  // Reiniciar contador si ha pasado la ventana de tiempo
  if (now - requestData.timestamp > windowMs) {
    requestData.count = 1
    requestData.timestamp = now
  } else {
    requestData.count++
  }

  requestCounts.set(ip, requestData)

  // Verificar si excede el límite
  return requestData.count <= limit
}

// Función para validar reCAPTCHA v3
export async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    if (!secretKey) {
      console.error("reCAPTCHA secret key not configured")
      return false
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    return data.success && data.score >= 0.5
  } catch (error) {
    console.error("reCAPTCHA verification error:", error)
    return false
  }
}

// Función para establecer encabezados de seguridad
export function setSecurityHeaders(headers: Headers): void {
  // Prevenir clickjacking
  headers.set("X-Frame-Options", "DENY")

  // Prevenir MIME sniffing
  headers.set("X-Content-Type-Options", "nosniff")

  // Habilitar protección XSS en navegadores antiguos
  headers.set("X-XSS-Protection", "1; mode=block")

  // Política de seguridad de contenido
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'",
  )

  // Referrer Policy
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  // Política de características del navegador
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
}
