export default function DiagnosticPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-darker">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Diagnóstico de <span className="text-green-500">Madurez en Ciberseguridad</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Complete el siguiente formulario para recibir una evaluación personalizada de la madurez en ciberseguridad
            de su organización.
          </p>
        </div>

        <div className="bg-dark border border-gray-800 rounded-lg p-8">
          <p className="text-center text-gray-300">
            Estamos actualizando nuestro sistema de diagnóstico. Por favor, vuelva más tarde.
          </p>
        </div>
      </div>
    </div>
  )
}
