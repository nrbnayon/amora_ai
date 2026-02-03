// components/onboarding/Question2Modal.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ProgressIndicator } from "./ProgressIndicator";
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

interface Question2Props {
  onNext: (data: Question2FormData) => void;
  currentStep: number;
  totalSteps: number;
}

export function Question2({ onNext, currentStep, totalSteps }: Question2Props) {
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
      budget: "",
      topPriorities: [],
      entertainment: [],
    },
  });

  const onSubmit = async (data: Question2FormData) => {
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
          Budget & Priorities
        </h2>
        <p className="text-sm text-gray-600">
          Let's start with a few details about your budget & preferences
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-sm font-medium text-gray-900">
            What is the total budget for the wedding?
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              $
            </span>
            <Input
              id="budget"
              type="text"
              placeholder="Enter amount"
              className="h-12 pl-8 bg-white border-gray-200"
              {...register("budget")}
            />
          </div>
          {errors.budget && (
            <p className="text-sm text-red-500">{errors.budget.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-900">
            Top Priorities
          </Label>
          <Controller
            name="topPriorities"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                {topPrioritiesOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`priority-${option.id}`}
                      checked={field.value?.includes(option.id)}
                      onCheckedChange={(checked) => {
                        const current = field.value || [];
                        if (checked) {
                          field.onChange([...current, option.id]);
                        } else {
                          field.onChange(current.filter((val) => val !== option.id));
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
            <p className="text-sm text-red-500">{errors.topPriorities.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-900">
            Would you like entertainment arranged?
          </Label>
          <Controller
            name="entertainment"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                {entertainmentOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`entertainment-${option.id}`}
                      checked={field.value?.includes(option.id)}
                      onCheckedChange={(checked) => {
                        const current = field.value || [];
                        if (checked) {
                          field.onChange([...current, option.id]);
                        } else {
                          field.onChange(current.filter((val) => val !== option.id));
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
            <p className="text-sm text-red-500">{errors.entertainment.message}</p>
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
          className="w-full h-12 text-white font-medium bg-primary hover:bg-primary/90"
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
    </div>
  );
}
