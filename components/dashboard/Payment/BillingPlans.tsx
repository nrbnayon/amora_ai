// components/payment/BillingPlans.tsx
"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export type BillingCycle = "monthly" | "yearly";
export type PlanType = "free" | "pro";

interface BillingPlansProps {
  onUpgrade: (plan: PlanType) => void;
}

export function BillingPlans({ onUpgrade }: BillingPlansProps) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const freePlanFeatures = [
    "Access to core wedding planning checklist",
    "Add and manage vendor prompts with limited credits",
    "Manage guest list within the platform",
    "Creating and edit seating chart manually",
  ];

  const proPlanFeatures = [
    "Customize checklist with advanced options",
    "Unlimited prompt edits",
    "Export guest list to CSV",
    "Use AI to auto generate seating chart",
    "Get suggestions directly from AI",
  ];

  const pricing = {
    monthly: {
      free: 0,
      pro: 9.99,
    },
    yearly: {
      free: 0,
      pro: 99.99,
    },
  };

  return (
    <div className="w-full">
      {/* Billing Cycle Toggle */}
      <div className="flex justify-center mb-8 md:mb-10">
        <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 md:px-8 py-2 md:py-2.5 rounded-md text-sm md:text-base font-medium transition-colors ${
              billingCycle === "monthly"
                ? "bg-primary text-white"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 md:px-8 py-2 md:py-2.5 rounded-md text-sm md:text-base font-medium transition-colors ${
              billingCycle === "yearly"
                ? "bg-primary text-white"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
              Free
            </h3>
            <div className="mb-2">
              <span className="text-4xl md:text-5xl font-bold text-gray-900">
                ${pricing[billingCycle].free}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Per {billingCycle === "monthly" ? "month" : "year"}
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full mb-6 md:mb-8 py-5 md:py-6 text-base border-gray-300"
            disabled
          >
            Current Plan
          </Button>

          <div className="space-y-4 md:space-y-5">
            <h4 className="font-semibold text-gray-900 text-sm md:text-base">
              Features you'll love:
            </h4>
            {freePlanFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
              Pro
            </h3>
            <div className="mb-2">
              <span className="text-4xl md:text-5xl font-bold text-gray-900">
                ${pricing[billingCycle].pro}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Per {billingCycle === "monthly" ? "month" : "year"}
            </p>
          </div>

          <Button
            onClick={() => onUpgrade("pro")}
            className="w-full mb-6 md:mb-8 bg-primary hover:bg-primary/90 text-white py-5 md:py-6 text-base"
          >
            Upgrade Plan
          </Button>

          <div className="space-y-4 md:space-y-5">
            <h4 className="font-semibold text-gray-900 text-sm md:text-base">
              Everything in Free, plus:
            </h4>
            {proPlanFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
