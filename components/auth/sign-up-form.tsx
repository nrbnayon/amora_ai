// components/auth/sign-up-form.tsx
"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SocialAuth } from "@/components/auth/social-auth";
import { signUpSchema, type SignUpFormData } from "@/lib/utils/validation";

export function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful signup
      console.log("Sign up data:", data);
      router.push("/verify-otp");
    } catch (error) {
      setError("root", {
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-muted">
        <Image
          src="/auth.png"
          alt="Authentication"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side - Form Container */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:w-1/2">
        {/* Form Card with Shadow */}
        <div
          className="w-full max-w-xl bg-white rounded-2xl p-8 sm:p-10"
          style={{ boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.05)" }}
        >
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Sign up
              </h1>
              <p className="text-sm text-gray-600">
                Create your account & explore
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900"
                >
                  Email or phone number
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email or Phone"
                  className="h-12 bg-white border-gray-200"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className="h-12 pr-10 bg-white border-gray-200"
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="h-12 pr-10 bg-white border-gray-200"
                    {...register("confirmPassword")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms and Privacy */}
              <p className="text-sm text-gray-600">
                By continuing you agree to the{" "}
                <Link href="/terms" className="text-gray-900 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-gray-900 hover:underline">
                  Privacy policy
                </Link>
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
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-400">Or</span>
              </div>
            </div>

            {/* Social Auth Buttons */}
            <div className="flex items-center justify-center gap-4">
              <SocialAuth />
            </div>

            {/* Sign In Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                href="/sign-in"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
