import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  name: string
  role: string
  initials: string
}

export default function TestimonialCard({ quote, name, role, initials }: TestimonialCardProps) {
  return (
    <div className="bg-darker border border-gray-800 rounded-lg p-8">
      <div className="flex items-center mb-4">
        <div className="text-yellow-400 flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
      </div>
      <p className="text-gray-300 mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-4">
          <span className="text-xl font-bold">{initials}</span>
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
    </div>
  )
}
