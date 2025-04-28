import Link from "next/link"
import { Twitter, Linkedin, Github } from "lucide-react"

export default function Footer() {
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
              <Link href="#" className="text-gray-400 hover:text-offensive transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-offensive transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-offensive transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-offensive transition-colors">
                  Ethical Hacking
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-offensive transition-colors">
                  Red Teaming
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-offensive transition-colors">
                  DevSecOps
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-offensive transition-colors">
                  Security Training
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-offensive transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-offensive transition-colors">
                  Whitepapers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-offensive transition-colors">
                  Tools
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/cherrera0001/web_dinamic"
                  className="text-gray-400 hover:text-offensive transition-colors"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-400 hover:text-offensive transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-offensive transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-offensive transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-offensive transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} C4A - Cybersecurity For All SpA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
