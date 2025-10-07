// components/dashboard/event-details/BasicInfoSection.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface BasicInfoSectionProps {
  couple: string;
  date: string;
  location: string;
}

export function BasicInfoSection({
  couple,
  date,
  location,
}: BasicInfoSectionProps) {
  return (
    <Card className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-4 sm:p-6 lg:p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {/* Budget */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Image
              src="/events/couple.png"
              alt="Couple Icon"
              width={32}
              height={32}
              className="w-6 h-6"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold mb-1">Couple</p>
            <p className="text-gray-600">{couple}</p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Image
              src="/events/calender.svg"
              alt="Date Icon"
              width={32}
              height={32}
              className="w-6 h-6"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">Date</p>
            <p className="text-gray-600">{date}</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Image
              src="/events/location.png"
              alt="Location Icon"
              width={32}
              height={32}
              className="w-6 h-6"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">Location</p>
            <p className="text-gray-600">{location}</p>
          </div>
        </div>

        <div></div>
      </div>
    </Card>
  );
}
