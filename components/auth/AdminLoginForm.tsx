"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Shield } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Validation Schema
const adminLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email or phone is required")
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[\d\s-()]+$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      },
      { message: "Enter a valid email or phone number" }
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long"),
});

type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

export function AdminLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (data: AdminLoginFormData) => {
    setIsLoading(true);
    try {
      // Mock delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Admin sign in data:", data);

      // Dummy Credential Bypass for testing
      if (data.email === "admin@gmail.com") {
        document.cookie = `accessToken=dev-admin-token; path=/; max-age=${7 * 24 * 60 * 60}`;
        document.cookie = `userRole=admin; path=/; max-age=${7 * 24 * 60 * 60}`;
        router.push("/admin/dashboard");
        return;
      }

      if (data.email === "user@gmail.com") {
        document.cookie = `accessToken=dev-user-token; path=/; max-age=${7 * 24 * 60 * 60}`;
        document.cookie = `userRole=user; path=/; max-age=${7 * 24 * 60 * 60}`;
        router.push("/dashboard/all-weddings");
        return;
      }

      // For other emails, automatically navigate to admin dashboard for demo
      router.push("/admin/dashboard");
    } catch (error) {
      setError("root", {
        message: "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Admin Login
            </h1>
            <p className="text-sm text-gray-600">
              Enter your credentials to access the admin panel
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email/Phone Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-900"
            >
              Email or Phone Number
            </Label>
            <Input
              id="email"
              type="text"
              placeholder="admin@example.com or +1234567890"
              className="h-11 bg-white border-gray-200 focus:border-primary"
              {...register("email")}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
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
                placeholder="Enter your password"
                className="h-11 pr-10 bg-white border-gray-200 focus:border-primary"
                {...register("password")}
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              href="/admin-forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Error Message */}
          {errors.root && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-600 text-center">
                {errors.root.message}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
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

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Protected admin area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
