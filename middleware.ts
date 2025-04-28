import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { setSecurityHeaders } from "@/lib/security"

export function middleware(request: NextRequest) {
  // Crear respuesta
  const response = NextResponse.next()

  // Establecer encabezados de seguridad
  const headers = new Headers(response.headers)
  setSecurityHeaders(headers)

  // Aplicar encabezados a la respuesta
  headers.forEach((value, key) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas de solicitud excepto:
     * 1. Archivos estáticos (/_next/, /images/, /favicon.ico, etc.)
     * 2. Rutas de API (/api/)
     */
    "/((?!_next/|images/|favicon.ico|api/).*)",
  ],
}
