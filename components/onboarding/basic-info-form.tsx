"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { basicInfoSchema, type BasicInfoFormData } from "@/lib/utils/validation"
import { ROUTES } from "@/lib/constants"

export function BasicInfoForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      guestCount: 100,
      budget: 2500,
    },
  })

  const watchedGuestCount = watch("guestCount")
  const watchedBudget = watch("budget")

  const onSubmit = async (data: BasicInfoFormData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("[v0] Basic info data:", data)
      router.push(ROUTES.DASHBOARD)
    } catch (error) {
      setError("root", {
        message: "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Guest Count */}
        <div className="space-y-3">
          <Label htmlFor="guestCount" className="text-base font-semibold">
            Guest Count
          </Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="guestCount"
              type="number"
              placeholder="100"
              className="pl-10"
              error={!!errors.guestCount}
              {...register("guestCount", { valueAsNumber: true })}
            />
          </div>
          {errors.guestCount && <p className="text-sm text-destructive">{errors.guestCount.message}</p>}
        </div>

        {/* Budget */}
        <div className="space-y-3">
          <Label htmlFor="budget" className="text-base font-semibold">
            Your Budget <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="budget"
              type="number"
              placeholder="2500"
              className="pl-10"
              error={!!errors.budget}
              {...register("budget", { valueAsNumber: true })}
            />
          </div>
          {errors.budget && <p className="text-sm text-destructive">{errors.budget.message}</p>}
        </div>

        {/* Note */}
        <p className="text-sm text-muted-foreground">You'll be able to update all the answers later</p>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
          Next
        </Button>

        {errors.root && <p className="text-sm text-destructive text-center">{errors.root.message}</p>}
      </form>
    </div>
  )
}
