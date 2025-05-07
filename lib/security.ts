import { headers } from "next/headers";
import type { NextRequest } from "next/server";

// ✅ Función para verificar CSRF token (mejorada)
import crypto from "crypto";

export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function verifyCsrfToken(request: NextRequest, token: string): boolean {
  const storedToken = request.cookies.get("csrf_token")?.value;
  return storedToken === token;
}

// ✅ Verificación de origen (más flexible)
export function verifyOrigin(request: NextRequest, allowedOrigins: string[] = []): boolean {
  const headersList = headers();
  const origin = headersList.get("origin");
  const host = headersList.get("host");

  if (!origin || !host) return false;

  const originUrl = new URL(origin);
  if (allowedOrigins.length > 0) {
    return allowedOrigins.includes(originUrl.origin);
  }

  return originUrl.host === host;
}

// ✅ Límite de tasa de solicitudes (Rate limiting mejorado)
const requestCounts = new Map<string, { count: number; timestamp: number }>();

export function checkRateLimit(ip: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const requestData = requestCounts.get(ip) || { count: 0, timestamp: now };

  // Reiniciar contador si ha pasado la ventana de tiempo
  if (now - requestData.timestamp > windowMs) {
    requestData.count = 1;
    requestData.timestamp = now;
  } else {
    requestData.count++;
  }

  // Eliminar IPs inactivas (evita fuga de memoria)
  for (const [key, value] of requestCounts) {
    if (now - value.timestamp > windowMs) {
      requestCounts.delete(key);
    }
  }

  requestCounts.set(ip, requestData);

  // Verificar si excede el límite
  return requestData.count <= limit;
}

// ✅ Verificación de reCAPTCHA v3 (mejorada)
export async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error("🚨 reCAPTCHA secret key not configured");
      return false;
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    console.log("🔍 reCAPTCHA Response:", data);

    // ✅ Configurable: Puedes ajustar el puntaje mínimo
    const minimumScore = 0.5;
    return data.success && data.score >= minimumScore;
  } catch (error) {
    console.error("🚨 reCAPTCHA verification error:", error);
    return false;
  }
}

// ✅ Encabezados de seguridad mejorados
export function setSecurityHeaders(headers: Headers): void {
  // ✅ Prevenir clickjacking
  headers.set("X-Frame-Options", "DENY");

  // ✅ Prevenir MIME sniffing
  headers.set("X-Content-Type-Options", "nosniff");

  // ✅ Habilitar protección XSS en navegadores antiguos
  headers.set("X-XSS-Protection", "1; mode=block");

  // ✅ Strict-Transport-Security (HSTS)
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  // ✅ Política de seguridad de contenido (CSP)
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google.com/recaptcha/ https://formspree.io; frame-src 'self' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/"
  );

  // ✅ Referrer Policy
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // ✅ Política de características del navegador
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // ✅ Política de recursos externos
  headers.set("Cross-Origin-Resource-Policy", "same-origin");

  // ✅ Política de recursos compartidos (CORS)
  headers.set("Access-Control-Allow-Origin", "*");
}
