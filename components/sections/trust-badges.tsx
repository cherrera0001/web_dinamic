import { ShieldCheck, UserCheck, Code, GraduationCap } from "lucide-react"

export default function TrustBadges() {
  return (
    <div className="bg-dark py-8 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
          <div className="flex justify-center">
            <ShieldCheck className="h-10 w-10 text-offensive mr-3" />
            <div>
              <div className="text-2xl font-bold">100+</div>
              <div className="text-gray-400 text-sm">Security Assessments</div>
            </div>
          </div>
          <div className="flex justify-center">
            <UserCheck className="h-10 w-10 text-strategic mr-3" />
            <div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-gray-400 text-sm">Red Team Engagements</div>
            </div>
          </div>
          <div className="flex justify-center">
            <Code className="h-10 w-10 text-training mr-3" />
            <div>
              <div className="text-2xl font-bold">30+</div>
              <div className="text-gray-400 text-sm">DevSecOps Implementations</div>
            </div>
          </div>
          <div className="flex justify-center">
            <GraduationCap className="h-10 w-10 text-offensive mr-3" />
            <div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-gray-400 text-sm">Trained Professionals</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
