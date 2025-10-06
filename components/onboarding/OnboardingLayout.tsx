"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProgressIndicator } from "@/components/onboarding/ProgressIndicator";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  imageSrc?: string;
  className?: string;
  currentStep?: number;
  totalSteps?: number;
}

export function OnboardingLayout({
  children,
  title,
  description,
  imageSrc = "/question.png",
  className,
  currentStep,
  totalSteps = 4,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Side - Form Container */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:w-1/2">
        <div
          className={cn(
            "w-full max-w-xl bg-white rounded-2xl p-8 sm:p-10",
            className
          )}
          style={{ boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.05)" }}
        >
          <div className="space-y-8">
            {/* Progress Indicator */}
            {currentStep && (
              <ProgressIndicator
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            )}

            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {title}
              </h1>
              <p className="text-sm text-gray-600">{description}</p>
            </div>

            {/* Form Content */}
            {children}
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-muted">
        <Image
          src={imageSrc}
          alt="Wedding"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
