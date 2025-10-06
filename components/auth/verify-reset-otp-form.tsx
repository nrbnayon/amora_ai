// components/auth/verify-reset-otp-form.tsx
"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Input } from "../ui/input";

export function VerifyResetOTPForm() {
  const router = useRouter();
  const [otp, setOtp] = React.useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    // Get email from sessionStorage
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("resetEmail");
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        // Redirect back if no email found
        router.push("/forgot-password");
      }
    }
  }, [router]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);

    if (!/^\d+$/.test(pastedData)) {
      return;
    }

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 4; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    setError("");

    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[3]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.some((digit) => !digit)) {
      setError("Please enter all digits");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful verification
      console.log("Reset OTP verified:", otp.join(""));
      router.push("/reset-password");
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Reset OTP resent to:", email);
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      setError("Failed to resend OTP");
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
            {/* Back Button */}
            <Link
              href="/forgot-password"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>

            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                OTP verification
              </h1>
              <p className="text-sm text-gray-600">
                Code sent to{" "}
                <span className="font-medium" style={{ color: "#8B1874" }}>
                  {email || "your email"}
                </span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP Input Fields */}
              <div className="flex gap-3 justify-center">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-16 h-16 text-center text-2xl font-semibold border-2 border-gray-200 rounded-md focus:border-gray-900 focus:outline-none transition-colors"
                    style={{
                      borderColor: digit ? "#8B1874" : undefined,
                    }}
                  />
                ))}
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
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
                    Verifying...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>

            {/* Resend Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Didn't receive the OTP? </span>
              <button
                type="button"
                onClick={handleResend}
                disabled={isLoading}
                className="font-medium hover:underline"
                style={{ color: "#8B1874" }}
              >
                Click to resend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
