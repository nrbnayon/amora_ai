// components/onboarding/ProgressIndicator.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  className,
}: ProgressIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-2 flex-1 rounded-full transition-colors",
            index < currentStep ? "bg-[#8B1874]" : "bg-gray-200"
          )}
        />
      ))}
    </div>
  );
}
