// components/dashboard/WeddingCard.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Wedding } from "@/lib/types";

interface WeddingCardProps {
  wedding: Wedding;
  onClick?: () => void;
}

export function WeddingCard({ wedding, onClick }: WeddingCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time?: string) => {
    if (!time) return "10:00 am - 11:00 am";
    return time;
  };

  return (
    <Card
      className="p-6 border-none shadow-[4px_4px_54px_0px_#00000014]
 hover:shadow-lg transition-shadow cursor-pointer bg-white"
      onClick={onClick}
    >
      {/* Wedding Title */}
      <h3 className="text-lg font-semibold text-primary text-center">
        {wedding.title}
      </h3>

      {/* Wedding Details */}
      <div className="space-y-2">
        <div className="flex items-start text-sm">
          <span className="font-medium text-gray-700 w-20">Date:</span>
          <span className="text-gray-600">{formatDate(wedding.date)}</span>
        </div>
        <div className="flex items-start text-sm">
          <span className="font-medium text-gray-700 w-20">Time:</span>
          <span className="text-gray-600">{formatTime(wedding.time)}</span>
        </div>
        <div className="flex items-start text-sm">
          <span className="font-medium text-gray-700 w-20">Location:</span>
          <span className="text-gray-600">{wedding.location || wedding.venue || "Grand Hotel Ballroom"}</span>
        </div>
        <div className="flex items-start text-sm">
          <span className="font-medium text-gray-700 w-20">Guests:</span>
          <span className="text-gray-600">{wedding.guestCount} guests</span>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Wedding Planning Progress</span>
        </div>
        <Progress value={wedding.progress} className="h-2" />
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{wedding.progress}% Completed</span>
        </div>
      </div>

      {/* Days Until Event */}
      <div className="py-3 bg-[#F5F5F5] rounded">
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">
            {wedding.daysUntilEvent}
          </div>
          <div className="text-sm text-primary">Days Until Event</div>
        </div>
      </div>
    </Card>
  );
}
