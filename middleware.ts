import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Función para establecer encabezados de seguridad
function setSecurityHeaders(headers: Headers) {
  headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self'; object-src 'none';");
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "no-referrer");
  headers.set("Permissions-Policy", "geolocation=(), microphone=()");
}

export function middleware(request: NextRequest) {
  // Crear respuesta
  const response = NextResponse.next();

  // Establecer encabezados de seguridad
  const headers = new Headers(response.headers);
  setSecurityHeaders(headers);

  // Aplicar encabezados a la respuesta
  headers.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return response;
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
};