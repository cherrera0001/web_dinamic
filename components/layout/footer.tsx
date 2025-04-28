import Link from "next/link"
import { Twitter, Linkedin, Github } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Mover fuera del JSX para evitar problemas de renderizado

  return (
    <footer className="bg-darker border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">C4A</h3>
            <p className="text-gray-400 mb-4">
              Cybersecurity For All - Servicios de seguridad ofensiva para ayudar a las organizaciones a desarrollar
              resiliencia contra amenazas cibernéticas.
            </p>
            <div className="flex space-x-4">
              <Link href="https://x.com/Cristba31199756" className="text-gray-400 hover:text-offensive transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">X / Twitter</span>
              </Link>
              <Link href="https://www.linkedin.com/in/cherrera0001/" className="text-gray-400 hover:text-offensive transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://github.com/cherrera0001" className="text-gray-400 hover:text-offensive transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          {/* Otros bloques permanecen iguales */}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {currentYear} C4A - Cybersecurity For All SpA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}