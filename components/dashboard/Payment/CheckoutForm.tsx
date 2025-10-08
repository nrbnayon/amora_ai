// components/payment/CheckoutForm.tsx
"use client";
import React, { useState } from "react";
import { Shield, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export type PlanType = "free" | "pro";

interface CheckoutFormProps {
  selectedPlan: PlanType;
  onBack: () => void;
}

const countries = [
  "USA",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "India",
  "Bangladesh",
];

export function CheckoutForm({ selectedPlan, onBack }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    country: "USA",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({
    email: false,
    fullName: false,
    agreeToTerms: false,
  });

  const [touched, setTouched] = useState({
    email: false,
    fullName: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: false });
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = () => {
    const newErrors = {
      email: !formData.email || !validateEmail(formData.email),
      fullName: !formData.fullName.trim(),
      agreeToTerms: !formData.agreeToTerms,
    };

    setErrors(newErrors);
    setTouched({ email: true, fullName: true });

    if (Object.values(newErrors).some((error) => error)) {
      toast.error("Please complete all required fields");
      return;
    }

    toast.success("Subscription successful!");
    // Add payment processing logic here
  };

  const planPrice = 9.99;
  const vat = 0.0;
  const total = planPrice + vat;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Left Column - Contact Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
            Contact information
          </h2>

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="example@gmail.com"
                className={`w-full px-4 py-3 rounded-lg border ${
                  touched.email && errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                } text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm md:text-base`}
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid email
                </p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Full name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                onBlur={() => handleBlur("fullName")}
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-lg border ${
                  touched.fullName && errors.fullName
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                } text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm md:text-base`}
              />
              {touched.fullName && errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter your full name
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Country or region
              </label>
              <div className="relative">
                <select
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none bg-white text-sm md:text-base"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Subscription Summary */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
              Subscribe to Amora AI Pro Subscription
            </h3>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              ${planPrice.toFixed(2)}{" "}
              <span className="text-base font-normal text-gray-600">
                per month
              </span>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm md:text-base text-gray-700">
                Amora AI Pro
              </span>
              <span className="text-sm md:text-base font-medium text-gray-900">
                ${planPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-t border-gray-200">
              <span className="text-sm md:text-base font-medium text-gray-900">
                Subtotal
              </span>
              <span className="text-sm md:text-base font-medium text-gray-900">
                ${planPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm md:text-base text-gray-700">
                VAT (0%)
              </span>
              <span className="text-sm md:text-base font-medium text-gray-900">
                ${vat.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-t border-gray-200">
              <span className="text-base md:text-lg font-semibold text-gray-900">
                Total
              </span>
              <span className="text-base md:text-lg font-bold text-gray-900">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Payment Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          {/* Secure Payment Header */}
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-primary">
                Secure Payment
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-0.5">
                All Payment information is fully encrypted, secure and
                protected.
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Select payment method
            </h3>
            <div className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg bg-gray-50">
              <input
                type="radio"
                id="stripe"
                name="payment"
                checked
                readOnly
                className="w-4 h-4 text-primary"
              />
              <label
                htmlFor="stripe"
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="text-2xl md:text-3xl font-bold text-[#635BFF]">
                  stripe
                </span>
              </label>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="mb-6">
            <div className="flex items-start gap-3">
              <div className="flex items-center h-6">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    handleChange("agreeToTerms", e.target.checked)
                  }
                  className={`w-5 h-5 rounded border-2 ${
                    errors.agreeToTerms ? "border-red-500" : "border-gray-300"
                  } text-primary focus:ring-2 focus:ring-primary/50`}
                />
              </div>
              <label
                htmlFor="terms"
                className="text-xs md:text-sm text-gray-700 leading-relaxed cursor-pointer"
              >
                I agree to receive updates and promotions about Agoda and its
                affiliates or business partners via various channels, including
                WhatsApp. Opt out anytime. Read more in the Privacy Policy.
                <br />
                <br />
                By proceeding with this booking, I agree to Agoda's{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                .
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm mt-2">
                Please agree to the terms and conditions
              </p>
            )}
          </div>

          {/* Subscribe Button */}
          <Button
            onClick={handleSubscribe}
            className="w-full bg-primary hover:bg-primary/90 text-white py-5 md:py-6 text-base font-medium rounded-lg"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}
