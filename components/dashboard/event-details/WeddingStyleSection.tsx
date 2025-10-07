// components/dashboard/event-details/WeddingStyleSection.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface WeddingStyleSectionProps {
  style: string;
  atmosphere: string;
  rituals: string;
  theme: string;
}

export function WeddingStyleSection({
  style,
  atmosphere,
  rituals,
  theme,
}: WeddingStyleSectionProps) {
  return (
    <Card className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-4 sm:p-6 lg:p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Wedding Style & Theme
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {/* Style */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Image
              src="/events/house.svg"
              alt="Style Icon"
              width={32}
              height={32}
              className="w-6 h-6"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">Style</p>
            <p className="text-gray-600">{style}</p>
          </div>
        </div>

        {/* Atmosphere */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Image
              src="/events/atmosphere.png"
              alt="Atmosphere Icon"
              width={32}
              height={32}
              className="w-6 h-6"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">Atmosphere</p>
            <p className="text-gray-600">{atmosphere}</p>
          </div>
        </div>

        {/* Rituals */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Image
              src="/events/rituals.png"
              alt="Rituals Icon"
              width={32}
              height={32}
              className="w-6 h-6"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">Rituals</p>
            <p className="text-gray-600">{rituals}</p>
          </div>
        </div>

        {/* Theme */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Image
              src="/events/theme.png"
              alt="Theme Icon"
              width={32}
              height={32}
              className="w-6 h-6"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">Theme</p>
            <p className="text-gray-600">{theme}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
