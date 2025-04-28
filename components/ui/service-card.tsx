import type React from "react"
import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  accentColor: "offensive" | "strategic" | "training"
}

export default function ServiceCard({ icon, title, description, features, accentColor }: ServiceCardProps) {
  const getColorClass = (color: string) => {
    switch (color) {
      case "offensive":
        return "text-offensive"
      case "strategic":
        return "text-strategic"
      case "training":
        return "text-training"
      default:
        return "text-offensive"
    }
  }

  const getBgColorClass = (color: string) => {
    switch (color) {
      case "offensive":
        return "bg-offensive/20"
      case "strategic":
        return "bg-strategic/20"
      case "training":
        return "bg-training/20"
      default:
        return "bg-offensive/20"
    }
  }

  const getHoverBorderClass = (color: string) => {
    switch (color) {
      case "offensive":
        return "hover:border-offensive"
      case "strategic":
        return "hover:border-strategic"
      case "training":
        return "hover:border-training"
      default:
        return "hover:border-offensive"
    }
  }

  return (
    <div className={`service-card ${getHoverBorderClass(accentColor)}`}>
      <div className={`w-14 h-14 rounded-full ${getBgColorClass(accentColor)} flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <ul className="space-y-2 text-gray-400">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className={`h-4 w-4 mr-2 ${getColorClass(accentColor)}`} />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-gray-800">
        <Link href="#" className={`${getColorClass(accentColor)} flex items-center text-sm hover:underline`}>
          Más información <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  )
}
