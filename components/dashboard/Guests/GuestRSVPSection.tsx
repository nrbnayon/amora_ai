// components/guests/GuestRSVPSection.tsx
import React from "react";

interface GuestRSVPSectionProps {
  attending: number;
  pending: number;
  declined: number;
  total: number;
}

export function GuestRSVPSection({
  attending,
  pending,
  declined,
  total,
}: GuestRSVPSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-3 md:mb-6 text-center">
        Guest RSVP
      </h2>
      <div className="grid grid-cols-4 gap-0 md:gap-6">
        <div className="text-center">
          <p className="text-3xl md:text-5xl font-bold text-gray-900 md:mb-2">
            {attending}
          </p>
          <p className="text-xs md:text-sm text-primary font-medium">
            Accepted
          </p>
        </div>
        <div className="text-center">
          <p className="text-3xl md:text-5xl font-bold text-gray-900 md:mb-2">
            {pending}
          </p>
          <p className="text-xs md:text-sm text-orange-600 font-medium">
            Pending
          </p>
        </div>
        <div className="text-center">
          <p className="text-3xl md:text-5xl font-bold text-gray-900 md:mb-2">
            {declined}
          </p>
          <p className="text-xs md:text-sm text-red-600 font-medium">
            Declined
          </p>
        </div>
        <div className="text-center">
          <p className="text-3xl md:text-5xl font-bold text-gray-900 md:mb-2">
            {total}
          </p>
          <p className="text-xs md:text-sm text-gray-600 font-medium">
            Total Guests
          </p>
        </div>
      </div>
    </div>
  );
}
