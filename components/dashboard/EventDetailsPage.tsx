"use client";
import React, { useState } from "react";
import { EditDetailsSheet } from "./EditDetailsSheet";
import { BasicInfoSection } from "./event-details/BasicInfoSection";
import { WeddingStyleSection } from "./event-details/WeddingStyleSection";
import { BudgetPrioritiesSection } from "./event-details/BudgetPrioritiesSection";
import { GuestsPersonalSection } from "./event-details/GuestsPersonalSection";
import Link from "next/link";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";

export interface EventDetailsData {
  partnerA: string;
  partnerB: string;
  weddingName: string;
  date: string;
  location: string;
  weddingStyle: string;
  atmosphere: string;
  rituals: string;
  theme: string;
  budget: string;
  topPriority: string;
  entertainment: string;
  guestCount: string;
  foodService: string;
  dietaryRestrictions: string;
}

export default function EventDetailsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [eventData, setEventData] = useState<EventDetailsData>({
    partnerA: "Jack",
    partnerB: "Emily",
    weddingName: "J + E Wedding",
    date: "26 Sept, 2025",
    location: "Downtown, NY",
    weddingStyle: "Traditional",
    atmosphere: "Casual",
    rituals: "Mehendi",
    theme: "Pink",
    budget: "$3000",
    topPriority: "Venue, Food, Decoration",
    entertainment: "DJ",
    guestCount: "80",
    foodService: "Plated",
    dietaryRestrictions: "Vegan, Lactose intolerant",
  });

  const handleUpdateDetails = (newData: EventDetailsData) => {
    setEventData(newData);
    setIsSheetOpen(false);
  };

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <div className="mb-8 border-b">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-4xl font-semibold text-gray-900">
              Event Details
            </h1>
            <p className="text-gray-600 mb-2">
              A clear view of your wedding and upcoming tasks
            </p>
          </div>
          <div className="flex gap-4 items-center mt-4 lg:mt-0">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-gray-400 font-medium hover:text-gray-600"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/event-details"
              className="px-4 py-2 text-gray-900 font-medium border-b-2 border-gray-900"
            >
              Event Details
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-6 flex justify-end">
        <Button
          onClick={() => setIsSheetOpen(true)}
          size="lg"
          className="bg-primary hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Edit />
          Edit Details
        </Button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <BasicInfoSection
          couple={`${eventData.partnerA} & ${eventData.partnerB}`}
          date={eventData.date}
          location={eventData.location}
        />

        {/* Wedding Style & Theme */}
        <WeddingStyleSection
          style={eventData.weddingStyle}
          atmosphere={eventData.atmosphere}
          rituals={eventData.rituals}
          theme={eventData.theme}
        />

        {/* Budget & Priorities */}
        <BudgetPrioritiesSection
          budget={eventData.budget}
          topPriorities={eventData.topPriority}
          entertainment={eventData.entertainment}
        />

        {/* Guests & Personal Touch */}
        <GuestsPersonalSection
          guestCount={eventData.guestCount}
          foodService={eventData.foodService}
          dietaryRestrictions={eventData.dietaryRestrictions}
        />
      </div>

      {/* Edit Details Sheet */}
      <EditDetailsSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        eventData={eventData}
        onUpdate={handleUpdateDetails}
      />
    </div>
  );
}
