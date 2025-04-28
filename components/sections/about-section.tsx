import { Target, Eye } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-darker">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Sobre <span className="text-offensive">C4A</span>
            </h2>
            <p className="text-gray-300 mb-6">
              Fundada en Chile con una perspectiva global, C4A (Cybersecurity For All) es un equipo de expertos en
              seguridad ofensiva dedicados a ayudar a las organizaciones a desarrollar resiliencia contra las amenazas
              cibernéticas en evolución.
            </p>
            <p className="text-gray-300 mb-6">
              Nuestro enfoque combina experiencia técnica con pensamiento estratégico, asegurando que las medidas de
              seguridad se alineen con los objetivos comerciales mientras mitigan eficazmente los riesgos.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Target className="h-5 w-5 text-offensive" />
                </div>
                <div className="ml-3">
                  <h4 className="font-bold">Nuestra Misión</h4>
                  <p className="text-gray-400">
                    Democratizar el conocimiento de ciberseguridad y proporcionar servicios de seguridad ofensiva
                    accesibles y de alta calidad a organizaciones de todos los tamaños.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Eye className="h-5 w-5 text-offensive" />
                </div>
                <div className="ml-3">
                  <h4 className="font-bold">Nuestra Visión</h4>
                  <p className="text-gray-400">
                    Crear un mundo donde las organizaciones comprendan su postura de seguridad tan bien como lo hacen
                    los atacantes, permitiendo estrategias de defensa proactivas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dark border border-gray-800 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">
              Nuestra <span className="text-offensive">Experiencia</span>
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold mb-2">Seguridad Ofensiva</h4>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div className="bg-offensive h-2.5 rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-2">Red Teaming</h4>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div className="bg-offensive h-2.5 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-2">DevSecOps</h4>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div className="bg-offensive h-2.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-2">Security Training</h4>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div className="bg-training h-2.5 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-2">Strategic Consulting</h4>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div className="bg-strategic h-2.5 rounded-full" style={{ width: "88%" }}></div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800">
              <h3 className="text-2xl font-bold mb-6">
                Nuestras <span className="text-offensive">Certificaciones</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-dark border border-gray-700 rounded p-3 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold">OSCP</span>
                </div>
                <div className="bg-dark border border-gray-700 rounded p-3 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold">OSEP</span>
                </div>
                <div className="bg-dark border border-gray-700 rounded p-3 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold">CRTO</span>
                </div>
                <div className="bg-dark border border-gray-700 rounded p-3 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold">CISSP</span>
                </div>
                <div className="bg-dark border border-gray-700 rounded p-3 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold">CEH</span>
                </div>
                <div className="bg-dark border border-gray-700 rounded p-3 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold">AWS-SEC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
