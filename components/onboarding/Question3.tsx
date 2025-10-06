// components/onboarding/Question3.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import {
  question3Schema,
  type Question3FormData,
} from "@/lib/utils/validation";

const weddingStyleOptions = [
  { value: "traditional", label: "Traditional" },
  { value: "modern", label: "Modern" },
  { value: "destination", label: "Destination" },
  { value: "cultural", label: "Cultural" },
  { value: "others", label: "Others" },
];

const atmosphereOptions = [
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
  { value: "luxury", label: "Luxury" },
  { value: "intimate", label: "Intimate" },
  { value: "others", label: "Others" },
];

export function Question3() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<Question3FormData>({
    resolver: zodResolver(question3Schema),
  });

  const onSubmit = async (data: Question3FormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Question 3 data:", data);

      sessionStorage.setItem("question3", JSON.stringify(data));

      router.push("/question4");
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
      title="Wedding Style & Theme"
      description="Select your wedding style & theme to plan your wedding"
      currentStep={3}
      totalSteps={4}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Wedding Style */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-900">
            What type of wedding style do you prefer?
          </Label>
          <Controller
            name="weddingStyle"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {weddingStyleOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`style-${option.value}`}
                    />
                    <Label
                      htmlFor={`style-${option.value}`}
                      className="text-sm font-normal cursor-pointer text-gray-900"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
          {errors.weddingStyle && (
            <p className="text-sm text-red-500">
              {errors.weddingStyle.message}
            </p>
          )}
        </div>

        {/* Atmosphere */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-900">
            What kind of atmosphere do you want
          </Label>
          <Controller
            name="atmosphere"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {atmosphereOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`atmosphere-${option.value}`}
                    />
                    <Label
                      htmlFor={`atmosphere-${option.value}`}
                      className="text-sm font-normal cursor-pointer text-gray-900"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
          {errors.atmosphere && (
            <p className="text-sm text-red-500">{errors.atmosphere.message}</p>
          )}
        </div>

        {/* Theme or Color Scheme */}
        <div className="space-y-2">
          <Label
            htmlFor="themeOrColor"
            className="text-sm font-medium text-gray-900"
          >
            Do you have a specific theme or color scheme in mind?
          </Label>
          <Input
            id="themeOrColor"
            type="text"
            placeholder="Enter specific theme or color"
            className="h-12 bg-white border-gray-200"
            {...register("themeOrColor")}
          />
          {errors.themeOrColor && (
            <p className="text-sm text-red-500">
              {errors.themeOrColor.message}
            </p>
          )}
        </div>

        {/* Cultural or Religious Rituals */}
        <div className="space-y-2">
          <Label
            htmlFor="culturalRituals"
            className="text-sm font-medium text-gray-900"
          >
            Are there any cultural or religious rituals that must be included?
          </Label>
          <Input
            id="culturalRituals"
            type="text"
            placeholder="Enter any cultural or religious ritual"
            className="h-12 bg-white border-gray-200"
            {...register("culturalRituals")}
          />
          {errors.culturalRituals && (
            <p className="text-sm text-red-500">
              {errors.culturalRituals.message}
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
              Next...
            </>
          ) : (
            "Next"
          )}
        </Button>
      </form>
    </OnboardingLayout>
  );
}
