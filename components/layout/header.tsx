"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-dark/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-offensive font-bold text-2xl">C4A</span>
              <span className="ml-2 text-gray-300 font-medium hidden sm:block">Cybersecurity For All</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#services" className="nav-link text-gray-300">
              Servicios
            </Link>
            <Link href="#about" className="nav-link text-gray-300">
              Nosotros
            </Link>
            <Link href="#testimonials" className="nav-link text-gray-300">
              Testimonios
            </Link>
            <Link href="#contact" className="nav-link text-gray-300">
              Contacto
            </Link>
            <Button asChild variant="default" className="bg-offensive hover:bg-offensive/90 text-white">
              <Link href="#kit">Descargar Kit</Link>
            </Button>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-dark/95 overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="#services"
            className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Servicios
          </Link>
          <Link
            href="#about"
            className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Nosotros
          </Link>
          <Link
            href="#testimonials"
            className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Testimonios
          </Link>
          <Link
            href="#contact"
            className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Contacto
          </Link>
          <Link
            href="#kit"
            className="block px-3 py-2 rounded-md bg-offensive text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Descargar Kit
          </Link>
        </div>
      </div>
    </header>
  )
}
