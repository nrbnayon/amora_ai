// components/onboarding/Question4.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import {
  question4Schema,
  type Question4FormData,
} from "@/lib/utils/validation";

const venueOptions = [
  { value: "indoor", label: "Indoor" },
  { value: "outdoor", label: "Outdoor" },
  { value: "both", label: "Both" },
  { value: "not-sure", label: "Not Sure" },
];

const mealOptions = [
  { value: "buffet", label: "Buffet" },
  { value: "plated", label: "Plated Dinner" },
  { value: "cocktail", label: "Cocktail Style" },
  { value: "family-style", label: "Family Style" },
];

export function Question4() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<Question4FormData>({
    resolver: zodResolver(question4Schema),
  });

  const onSubmit = async (data: Question4FormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Question 4 data:", data);

      // Gather all data from sessionStorage
      const question1 = JSON.parse(sessionStorage.getItem("question1") || "{}");
      const question2 = JSON.parse(sessionStorage.getItem("question2") || "{}");
      const question3 = JSON.parse(sessionStorage.getItem("question3") || "{}");

      const completeData = {
        ...question1,
        ...question2,
        ...question3,
        ...data,
      };

      console.log("Complete onboarding data:", completeData);

      // Clear session storage
      sessionStorage.removeItem("question1");
      sessionStorage.removeItem("question2");
      sessionStorage.removeItem("question3");

      router.push("/dashboard");
    } catch (error) {
      setError("root", {
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OnboardingLayout
      title="Guest Details & Venue"
      description="Tell us about your guests and venue preferences"
      currentStep={4}
      totalSteps={4}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Guest Count Field */}
        <div className="space-y-2">
          <Label
            htmlFor="guestCount"
            className="text-sm font-medium text-gray-900"
          >
            How many guests are you expecting?
          </Label>
          <Input
            id="guestCount"
            type="number"
            placeholder="Enter number of guests"
            className="h-12 bg-white border-gray-200"
            {...register("guestCount")}
          />
          {errors.guestCount && (
            <p className="text-sm text-red-500">{errors.guestCount.message}</p>
          )}
        </div>

        {/* Venue Preference */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-900">
            What type of venue do you prefer?
          </Label>
          <Controller
            name="venuePreference"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {venueOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`venue-${option.value}`}
                    />
                    <Label
                      htmlFor={`venue-${option.value}`}
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
            <p className="text-sm text-red-500">
              {errors.venuePreference.message}
            </p>
          )}
        </div>

        {/* Meal Preference */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-900">
            What style of meal service do you prefer?
          </Label>
          <Controller
            name="mealPreference"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {mealOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`meal-${option.value}`}
                    />
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
            <p className="text-sm text-red-500">
              {errors.mealPreference.message}
            </p>
          )}
        </div>

        {/* Additional Notes */}
        <div className="space-y-2">
          <Label
            htmlFor="additionalNotes"
            className="text-sm font-medium text-gray-900"
          >
            Any additional notes or special requirements? (Optional)
          </Label>
          <Textarea
            id="additionalNotes"
            placeholder="Tell us anything else we should know..."
            className="min-h-[100px] bg-white border-gray-200 resize-none"
            {...register("additionalNotes")}
          />
          {errors.additionalNotes && (
            <p className="text-sm text-red-500">
              {errors.additionalNotes.message}
            </p>
          )}
        </div>

        {/* Info Text */}
        <p className="text-sm text-gray-600">
          You'll be able to update all the answers later
        </p>

        {/* Error Message */}
        {errors.root && (
          <p className="text-sm text-red-500 text-center">
            {errors.root.message}
          </p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 text-white font-medium"
          style={{ backgroundColor: "#8B1874" }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Completing...
            </>
          ) : (
            "Complete Setup"
          )}
        </Button>
      </form>
    </OnboardingLayout>
  );
}
