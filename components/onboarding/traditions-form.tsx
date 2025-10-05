"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { traditionsSchema, type TraditionsFormData } from "@/lib/utils/validation"
import { WEDDING_CULTURES, WEDDING_RELIGIONS, ROUTES } from "@/lib/constants"

export function TraditionsForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedCulture, setSelectedCulture] = React.useState<string>("")
  const [selectedReligion, setSelectedReligion] = React.useState<string>("")

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm<TraditionsFormData>({
    resolver: zodResolver(traditionsSchema),
    defaultValues: {
      culture: [],
      religion: [],
    },
  })

  const watchedCulture = watch("culture")
  const watchedReligion = watch("religion")

  const handleCultureChange = (value: string) => {
    setSelectedCulture(value)
    setValue("culture", [value])
  }

  const handleReligionChange = (value: string) => {
    setSelectedReligion(value)
    setValue("religion", [value])
  }

  const onSubmit = async (data: TraditionsFormData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("[v0] Traditions data:", data)
      router.push(ROUTES.BASIC_INFO)
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Culture Selection */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Culture</Label>
          <RadioGroup value={selectedCulture} onValueChange={handleCultureChange} className="grid grid-cols-2 gap-4">
            {WEDDING_CULTURES.map((culture) => (
              <div key={culture} className="flex items-center space-x-2">
                <RadioGroupItem value={culture} id={`culture-${culture}`} />
                <Label htmlFor={`culture-${culture}`} className="font-normal cursor-pointer">
                  {culture}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.culture && <p className="text-sm text-destructive">{errors.culture.message}</p>}
        </div>

        {/* Religion Selection */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Religion</Label>
          <RadioGroup value={selectedReligion} onValueChange={handleReligionChange} className="grid grid-cols-2 gap-4">
            {WEDDING_RELIGIONS.map((religion) => (
              <div key={religion} className="flex items-center space-x-2">
                <RadioGroupItem value={religion} id={`religion-${religion}`} />
                <Label htmlFor={`religion-${religion}`} className="font-normal cursor-pointer">
                  {religion}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.religion && <p className="text-sm text-destructive">{errors.religion.message}</p>}
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
