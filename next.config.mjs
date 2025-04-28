/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Permite imágenes sin optimización en sitios estáticos
  },
  output: "export", // Habilita la exportación estática

  async headers() {
    return [
      {
        source: "/(.*)", // Aplica a todas las rutas
        headers: [
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'; object-src 'none';" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=()" },
        ],
      },
    ];
  },
};

export default nextConfig;