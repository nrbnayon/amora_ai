// components/dashboard/event-details/BudgetPrioritiesSection.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface BudgetPrioritiesSectionProps {
  budget: string;
  topPriorities: string;
  entertainment: string;
}

export function BudgetPrioritiesSection({
  budget,
  topPriorities,
  entertainment,
}: BudgetPrioritiesSectionProps) {
  return (
    <Card className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-4 sm:p-6 lg:p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Budget & Priorities
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {/* Budget */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Image
              src="/events/budgets.svg"
              alt="Budget Icon"
              width={32}
              height={32}
              className="w-6 h-6"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">Budget</p>
            <p className="text-gray-600">{budget}</p>
          </div>
        </div>

        {/* Top Priorities */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Image
              src="/events/top.svg"
              alt="Top Priorities Icon"
              width={32}
              height={32}
              className="w-6 h-6"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Top Priorities
            </p>
            <p className="text-gray-600">{topPriorities}</p>
          </div>
        </div>

        {/* Entertainment */}
        <div className="flex items-start gap-4 col-span-2">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Image
              src="/events/dj.svg"
              alt="Entertainment Icon"
              width={32}
              height={32}
              className="w-6 h-6"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Entertainment
            </p>
            <p className="text-gray-600">{entertainment}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
