// components/onboarding/Question4Modal.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ProgressIndicator } from "./ProgressIndicator";
import { Users } from "lucide-react";
import {
  question4Schema,
  type Question4FormData,
} from "@/lib/utils/validation";

const foodServiceOptions = [
  { value: "buffet", label: "Buffet" },
  { value: "plated", label: "Plated" },
  { value: "family-style", label: "Family Style" },
  { value: "others", label: "Others" },
];

const dietaryOptions = [
  { value: "vegan", label: "Vegan" },
  { value: "halal", label: "Halal" },
  { value: "allergies", label: "Allergies" },
  { value: "others", label: "Others" },
];

interface Question4Props {
  onNext: (data: Question4FormData) => void;
  currentStep: number;
  totalSteps: number;
}

export function Question4({ onNext, currentStep, totalSteps }: Question4Props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<Question4FormData>({
    resolver: zodResolver(question4Schema),
    defaultValues: {
      guestCount: "",
      venuePreference: "",
      mealPreference: "",
      additionalNotes: "",
    },
  });

  const onSubmit = async (data: Question4FormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onNext(data);
    } catch (error) {
      setError("root", {
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      <div className="mb-6 mt-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Guests & Personal Touch
        </h2>
        <p className="text-sm text-gray-600">
          Guests & personal preferences
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="guestCount" className="text-sm font-medium text-gray-900">
            Guest Count
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Users size={18} />
            </span>
            <Input
              id="guestCount"
              type="number"
              placeholder="Enter number"
              className="h-12 pl-10 bg-white border-gray-200"
              {...register("guestCount")}
            />
          </div>
          {errors.guestCount && (
            <p className="text-sm text-red-500">{errors.guestCount.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-900">
            What Type of food service do you prefer?
          </Label>
          <Controller
            name="mealPreference"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-2 gap-y-3 gap-x-4"
              >
                {foodServiceOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`meal-${option.value}`} />
                    <Label
                      htmlFor={`meal-${option.value}`}
                      className="text-sm font-normal cursor-pointer text-gray-900"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
          {errors.mealPreference && (
            <p className="text-sm text-red-500">{errors.mealPreference.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-900">
            Any dietary restrictions to consider?
          </Label>
          <Controller
            name="venuePreference"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-2 gap-y-3 gap-x-4"
              >
                {dietaryOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`dietary-${option.value}`} />
                    <Label
                      htmlFor={`dietary-${option.value}`}
                      className="text-sm font-normal cursor-pointer text-gray-900"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
          {errors.venuePreference && (
            <p className="text-sm text-red-500">{errors.venuePreference.message}</p>
          )}
        </div>

        <p className="text-sm text-gray-600">
          You'll be able to update all the answers later
        </p>

        {errors.root && (
          <p className="text-sm text-red-500 text-center">{errors.root.message}</p>
        )}

        <Button
          type="submit"
          className="w-full h-12 text-white font-medium bg-primary hover:bg-primary/80"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Completing...
            </>
          ) : (
            "Next"
          )}
        </Button>
      </form>
    </div>
  );
}
