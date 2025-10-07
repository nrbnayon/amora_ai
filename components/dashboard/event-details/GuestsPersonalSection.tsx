// components/dashboard/event-details/GuestsPersonalSection.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface GuestsPersonalSectionProps {
  guestCount: string;
  foodService: string;
  dietaryRestrictions: string;
}

export function GuestsPersonalSection({
  guestCount,
  foodService,
  dietaryRestrictions,
}: GuestsPersonalSectionProps) {
  return (
    <Card className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-4 sm:p-6 lg:p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Guests & Personal Touch
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {/* Guest Count */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Image
              src="/events/guests.svg"
              alt="Guest Count Icon"
              width={32}
              height={32}
              className="w-6 h-6"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Guest Count
            </p>
            <p className="text-gray-600">{guestCount}</p>
          </div>
        </div>

        {/* Food Service */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Image
              src="/events/food.png"
              alt="Food Service Icon"
              width={32}
              height={32}
              className="w-6 h-6"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Food Service
            </p>
            <p className="text-gray-600">{foodService}</p>
          </div>
        </div>

        {/* Dietary Restrictions */}
        <div className="flex items-start gap-4 col-span-2">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Image
              src="/events/diet.svg"
              alt="Dietary Restrictions Icon"
              width={32}
              height={32}
              className="w-6 h-6"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Dietary Restrictions
            </p>
            <p className="text-gray-600">{dietaryRestrictions}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
