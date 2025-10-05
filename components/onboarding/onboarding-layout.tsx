import type React from "react"
import { OnboardingProgress } from "./onboarding-progress"

interface OnboardingLayoutProps {
  children: React.ReactNode
}

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-responsive py-8">
        <OnboardingProgress />
        {children}
      </div>
    </div>
  )
}
