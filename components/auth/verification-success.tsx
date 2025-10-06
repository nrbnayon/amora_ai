// components/auth/verification-success.tsx
"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VerificationSuccess() {
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

      {/* Right Side - Success Container */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:w-1/2">
        {/* Success Card with Shadow */}
        <div
          className="w-full max-w-xl bg-white rounded-2xl p-8 sm:p-10"
          style={{ boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.05)" }}
        >
          <div className="space-y-8 text-center">
            {/* Icon */}
            <div className="flex justify-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#E3F2FD" }}
              >
                <ShieldCheck
                  className="w-12 h-12"
                  strokeWidth={3}
                  style={{ color: "#0088FF" }}
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Account verified
              </h1>
              <p className="text-sm text-gray-600">
                You're all set to use your account securely
              </p>
            </div>

            {/* Log In Button */}
            <Button
              asChild
              className="w-full h-12 text-white font-medium"
              style={{ backgroundColor: "#8B1874" }}
            >
              <Link href="/sign-in">Log in</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
