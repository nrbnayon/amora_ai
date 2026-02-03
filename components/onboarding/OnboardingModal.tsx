// components/onboarding/OnboardingModal.tsx
"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Question1 } from "./Question1Modal";
import { Question2 } from "./Question2Modal";
import { Question3 } from "./Question3Modal";
import { Question4 } from "./Question4Modal";
import type { OnboardingFormData } from "@/lib/types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (data: OnboardingFormData) => void;
}

export function OnboardingModal({
  open,
  onOpenChange,
  onComplete,
}: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState<Partial<OnboardingFormData>>(
    {}
  );

  // Reset state when modal opens
  React.useEffect(() => {
    if (open) {
      setCurrentStep(1);
      setFormData({});
    }
  }, [open]);

  const handleNext = (stepData: Partial<OnboardingFormData>) => {
    console.log(`Step ${currentStep} completed with:`, stepData);
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Complete onboarding
      onComplete(updatedData as OnboardingFormData);
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-none shadow-2xl">
        <VisuallyHidden>
          <DialogTitle>Wedding Onboarding</DialogTitle>
        </VisuallyHidden>
        
        {currentStep === 1 && (
          <Question1 onNext={handleNext} currentStep={1} totalSteps={4} />
        )}
        {currentStep === 2 && (
          <Question2 onNext={handleNext} currentStep={2} totalSteps={4} />
        )}
        {currentStep === 3 && (
          <Question3 onNext={handleNext} currentStep={3} totalSteps={4} />
        )}
        {currentStep === 4 && (
          <Question4 onNext={handleNext} currentStep={4} totalSteps={4} />
        )}
      </DialogContent>
    </Dialog>
  );
}
