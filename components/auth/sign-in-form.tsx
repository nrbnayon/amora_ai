"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SocialAuth } from "@/components/auth/social-auth";
import { signInSchema, type SignInFormData } from "@/lib/utils/validation";

export function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Sign in data:", data);

      // Dummy Credential Bypass for testing
      if (data.email === "user@gmail.com" || data.email === "admin@gmail.com") {
        const role = data.email === "admin@gmail.com" ? "admin" : "user";
        const token = data.email === "admin@gmail.com" ? "dev-admin-token" : "dev-user-token";
        
        // Set cookies for middleware
        document.cookie = `accessToken=${token}; path=/; max-age=${7 * 24 * 60 * 60}`;
        document.cookie = `userRole=${role}; path=/; max-age=${7 * 24 * 60 * 60}`;

        if (role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard/all-weddings");
        }
        return;
      }

      // Normal flow (redirect to all-weddings for now)
      router.push("/dashboard/all-weddings");
    } catch (error) {
      setError("root", {
        message: "Invalid email or password. Please try again.",
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
        <div
          className="w-full max-w-xl bg-white rounded-2xl p-8 sm:p-10"
          style={{ boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.05)" }}
        >
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Sign in
              </h1>
              <p className="text-sm text-gray-600">
                Sign in to your account with your email, or create one below.
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Controller
                    name="rememberMe"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm font-normal cursor-pointer text-gray-900"
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-gray-900 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Error Message */}
              {errors.root && (
                <p className="text-sm text-red-500 text-center">
                  {errors.root.message}
                </p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/80 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Logging in...
                  </>
                ) : (
                  "Log in"
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

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                href="/sign-up"
                className="font-medium text-primary hover:underline"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
