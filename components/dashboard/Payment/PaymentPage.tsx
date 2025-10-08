// components/payment/PaymentPage.tsx
"use client";
import React, { useState } from "react";
import { BillingPlans } from "./BillingPlans";
import { CheckoutForm } from "./CheckoutForm";

export type BillingCycle = "monthly" | "yearly";
export type PlanType = "free" | "pro";

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  const handleUpgrade = (plan: PlanType) => {
    setSelectedPlan(plan);
  };

  const handleBack = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="w-full min-h-screen ">
      <div className="flex flex-wrap items-center justify-center md:justify-between gap-3 border-b pb-3 mb-4">
        <div className="text-center md:text-left">
          <h1 className="text-xl md:text-3xl font-semibold text-gray-900">
            Payment
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Track your billing and plan details here.
          </p>
        </div>
      </div>

      {/* Content */}
      {selectedPlan ? (
        <CheckoutForm selectedPlan={selectedPlan} onBack={handleBack} />
      ) : (
        <BillingPlans onUpgrade={handleUpgrade} />
      )}
    </div>
  );
}
