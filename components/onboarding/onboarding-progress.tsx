"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/lib/constants"

const steps = [
  {
    id: 1,
    name: "Traditions",
    href: ROUTES.TRADITIONS,
  },
  {
    id: 2,
    name: "Basic Info",
    href: ROUTES.BASIC_INFO,
  },
  {
    id: 3,
    name: "Complete",
    href: ROUTES.DASHBOARD,
  },
]

export function OnboardingProgress() {
  const pathname = usePathname()

  const getCurrentStep = () => {
    if (pathname === ROUTES.TRADITIONS) return 1
    if (pathname === ROUTES.BASIC_INFO) return 2
    return 3
  }

  const currentStep = getCurrentStep()

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, stepIdx) => (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                step.id <= currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground text-muted-foreground",
              )}
            >
              {step.id}
            </div>
            {stepIdx < steps.length - 1 && (
              <div className={cn("h-0.5 w-16 mx-2", step.id < currentStep ? "bg-primary" : "bg-muted-foreground/30")} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        {steps.map((step) => (
          <div key={step.id} className="text-xs text-muted-foreground">
            {step.name}
          </div>
        ))}
      </div>
    </div>
  )
}
