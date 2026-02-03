// components/onboarding/Question1Modal.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ProgressIndicator } from "./ProgressIndicator";
import {
  question1Schema,
  type Question1FormData,
} from "@/lib/utils/validation";

interface Question1Props {
  onNext: (data: Question1FormData) => void;
  currentStep: number;
  totalSteps: number;
}

export function Question1({ onNext, currentStep, totalSteps }: Question1Props) {
  const [isLoading, setIsLoading] = React.useState(false);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Question1FormData>({
    resolver: zodResolver(question1Schema),
  });

  const onSubmit = async (data: Question1FormData) => {
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
      {/* Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      {/* Header */}
      <div className="mb-6 mt-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Basic information
        </h2>
        <p className="text-sm text-gray-600">
          Let's start with a few details about you and your big day
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Groom's Name Field */}
        <div className="space-y-2">
          <Label
            htmlFor="yourName"
            className="text-sm font-medium text-gray-900"
          >
            Groom's name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="yourName"
            type="text"
            placeholder="Enter groom's name"
            className="h-12 bg-white border-gray-200"
            {...register("yourName")}
          />
          {errors.yourName && (
            <p className="text-sm text-red-500">{errors.yourName.message}</p>
          )}
        </div>

        {/* Bride's Name Field */}
        <div className="space-y-2">
          <Label
            htmlFor="partnerName"
            className="text-sm font-medium text-gray-900"
          >
            Bride's name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="partnerName"
            type="text"
            placeholder="Enter bride's name"
            className="h-12 bg-white border-gray-200"
            {...register("partnerName")}
          />
          {errors.partnerName && (
            <p className="text-sm text-red-500">{errors.partnerName.message}</p>
          )}
        </div>

        {/* Wedding Location Field */}
        <div className="space-y-2">
          <Label
            htmlFor="weddingLocation"
            className="text-sm font-medium text-gray-900"
          >
            Wedding location <span className="text-red-500">*</span>
          </Label>
          <Input
            id="weddingLocation"
            type="text"
            placeholder="Enter wedding location"
            className="h-12 bg-white border-gray-200"
            {...register("weddingLocation")}
          />
          {errors.weddingLocation && (
            <p className="text-sm text-red-500">
              {errors.weddingLocation.message}
            </p>
          )}
        </div>

        {/* Wedding Date Field */}
        <div className="space-y-2">
          <Label
            htmlFor="weddingDate"
            className="text-sm font-medium text-gray-900"
          >
            Approximate date of the wedding{" "}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="weddingDate"
            type="date"
            placeholder="dd-mm-yyyy"
            className="h-12 bg-white border-gray-200"
            min={today}
            {...register("weddingDate")}
          />
          {errors.weddingDate && (
            <p className="text-sm text-red-500">{errors.weddingDate.message}</p>
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
          className="w-full h-12 text-white font-medium bg-[#8B1874] hover:bg-[#6B1259]"
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
