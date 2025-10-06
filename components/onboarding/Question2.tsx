// components/onboarding/Question2.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import {
  question2Schema,
  type Question2FormData,
} from "@/lib/utils/validation";

const topPrioritiesOptions = [
  { id: "venue", label: "Venue" },
  { id: "decoration", label: "Decoration" },
  { id: "catering", label: "Catering" },
  { id: "photography", label: "Photography" },
  { id: "videography", label: "Videography" },
  { id: "drinks", label: "Drinks" },
  { id: "other", label: "Other" },
];

const entertainmentOptions = [
  { id: "band", label: "Band" },
  { id: "dj", label: "DJ" },
  { id: "traditional", label: "Traditional" },
  { id: "others", label: "Others" },
];

export function Question2() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<Question2FormData>({
    resolver: zodResolver(question2Schema),
    defaultValues: {
      topPriorities: [],
      entertainment: [],
    },
  });

  const onSubmit = async (data: Question2FormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Question 2 data:", data);

      sessionStorage.setItem("question2", JSON.stringify(data));

      router.push("/question3");
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
      title="Budget & Priorities"
      description="Let's start with a few details about your budget & preferences"
      currentStep={2}
      totalSteps={4}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Budget Field */}
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-sm font-medium text-gray-900">
            What is your total budget for the wedding?
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              $
            </span>
            <Input
              id="budget"
              type="number"
              placeholder="Enter amount"
              className="h-12 pl-8 bg-white border-gray-200"
              {...register("budget")}
            />
          </div>
          {errors.budget && (
            <p className="text-sm text-red-500">{errors.budget.message}</p>
          )}
        </div>

        {/* Top Priorities */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-900">
            Top Priorities
          </Label>
          <Controller
            name="topPriorities"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topPrioritiesOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`priority-${option.id}`}
                      checked={field.value?.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, option.id]);
                        } else {
                          field.onChange(
                            field.value.filter((val) => val !== option.id)
                          );
                        }
                      }}
                    />
                    <Label
                      htmlFor={`priority-${option.id}`}
                      className="text-sm font-normal cursor-pointer text-gray-900"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          />
          {errors.topPriorities && (
            <p className="text-sm text-red-500">
              {errors.topPriorities.message}
            </p>
          )}
        </div>

        {/* Entertainment */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-900">
            Would you like entertainment arranged?
          </Label>
          <Controller
            name="entertainment"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {entertainmentOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`entertainment-${option.id}`}
                      checked={field.value?.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, option.id]);
                        } else {
                          field.onChange(
                            field.value.filter((val) => val !== option.id)
                          );
                        }
                      }}
                    />
                    <Label
                      htmlFor={`entertainment-${option.id}`}
                      className="text-sm font-normal cursor-pointer text-gray-900"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          />
          {errors.entertainment && (
            <p className="text-sm text-red-500">
              {errors.entertainment.message}
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
