// components/onboarding/Question1.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import {
  question1Schema,
  type Question1FormData,
} from "@/lib/utils/validation";

export function Question1() {
  const router = useRouter();
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Question 1 data:", data);

      // Store data in session/state management if needed
      sessionStorage.setItem("question1", JSON.stringify(data));

      router.push("/question2");
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
      title='Basic information'
      description="Let's start with a few details about you and your big day"
      currentStep={1}
      totalSteps={4}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        {/* Your Name Field */}
        <div className='space-y-2'>
          <Label
            htmlFor='yourName'
            className='text-sm font-medium text-gray-900'
          >
            Your name <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='yourName'
            type='text'
            placeholder='Enter your name'
            className='h-12 bg-white border-gray-200'
            {...register("yourName")}
          />
          {errors.yourName && (
            <p className='text-sm text-red-500'>{errors.yourName.message}</p>
          )}
        </div>

        {/* Partner's Name Field */}
        <div className='space-y-2'>
          <Label
            htmlFor='partnerName'
            className='text-sm font-medium text-gray-900'
          >
            Partner's name <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='partnerName'
            type='text'
            placeholder="Enter partner's name"
            className='h-12 bg-white border-gray-200'
            {...register("partnerName")}
          />
          {errors.partnerName && (
            <p className='text-sm text-red-500'>{errors.partnerName.message}</p>
          )}
        </div>

        {/* Wedding Location Field */}
        <div className='space-y-2'>
          <Label
            htmlFor='weddingLocation'
            className='text-sm font-medium text-gray-900'
          >
            Wedding location <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='weddingLocation'
            type='text'
            placeholder='Enter wedding location'
            className='h-12 bg-white border-gray-200'
            {...register("weddingLocation")}
          />
          {errors.weddingLocation && (
            <p className='text-sm text-red-500'>
              {errors.weddingLocation.message}
            </p>
          )}
        </div>

        {/* Wedding Date Field */}
        <div className='space-y-2'>
          <Label
            htmlFor='weddingDate'
            className='text-sm font-medium text-gray-900'
          >
            Approximate date of your wedding{" "}
            <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='weddingDate'
            type='date'
            placeholder='dd-mm-yyyy'
            className='h-12 bg-white border-gray-200'
            min={today}
            {...register("weddingDate")}
          />
          {errors.weddingDate && (
            <p className='text-sm text-red-500'>{errors.weddingDate.message}</p>
          )}
        </div>

        {/* Info Text */}
        <p className='text-sm text-gray-600'>
          You'll be able to update all the answers later
        </p>

        {/* Error Message */}
        {errors.root && (
          <p className='text-sm text-red-500 text-center'>
            {errors.root.message}
          </p>
        )}

        {/* Submit Button */}
        <Button
          type='submit'
          className='w-full h-12 text-white font-medium'
          style={{ backgroundColor: "#8B1874" }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size='sm' className='mr-2' />
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
