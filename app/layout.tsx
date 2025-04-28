// filepath: [layout.tsx](http://_vscodecontentref_/1)
import type React from "react"
import type { Metadata } from "next"
import { Inter, Fira_Code } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
})

export const metadata: Metadata = {
  title: "C4A - Cybersecurity For All | Offensive Security Experts",
  description:
    "Chilean offensive cybersecurity firm specializing in ethical hacking, red teaming, DevSecOps, and security training. Your first line of defense against cyber threats.",
  metadataBase: new URL("https://www.c4a.cl"),
  generator: "C4A",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Meta tags de seguridad */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* Script de reCAPTCHA Enterprise */}
        <script
          src="https://www.google.com/recaptcha/enterprise.js?render=6LcnyiQrAAAAAOMZji4M1EHoV27cknXX4DkuEC1k"
          async
          defer
        ></script>
      </head>
      <body className={`${inter.variable} ${firaCode.variable} bg-darker text-gray-200 font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}