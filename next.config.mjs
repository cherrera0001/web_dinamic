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
};

export default nextConfig;