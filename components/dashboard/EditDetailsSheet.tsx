// components/dashboard/EditDetailsSheet.tsx
"use client";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EventDetailsData } from "./EventDetailsPage";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  convertToDisplayDate,
  convertToInputDate,
  getTodayDate,
} from "@/lib/utils";

interface EditDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: EventDetailsData;
  onUpdate: (data: EventDetailsData) => void;
}

export function EditDetailsSheet({
  isOpen,
  onClose,
  eventData,
  onUpdate,
}: EditDetailsSheetProps) {
  const [formData, setFormData] = useState<EventDetailsData>(eventData);

  useEffect(() => {
    setFormData(eventData);
  }, [eventData]);

  const handleChange = (field: keyof EventDetailsData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onUpdate(formData);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    const displayDate = convertToDisplayDate(inputDate);
    handleChange("date", displayDate);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:min-w-3xl bg-primary text-white overflow-y-auto gap-0">
        <SheetHeader className="mb-0 border-b border-white/20 p-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-semibold text-white">
              Edit Event Details
            </SheetTitle>
            <button
              onClick={onClose}
              className="text-white hover:text-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </SheetHeader>

        <div className="space-y-6 bg-white p-6 text-black">
          {/* Partner A */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Partner A <span className="text-pink-300">*</span>
            </label>
            <input
              type="text"
              value={formData.partnerA}
              onChange={(e) => handleChange("partnerA", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter partner A name"
            />
          </div>

          {/* Partner B */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Partner B <span className="text-pink-300">*</span>
            </label>
            <input
              type="text"
              value={formData.partnerB}
              onChange={(e) => handleChange("partnerB", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter partner B name"
            />
          </div>

          {/* Wedding Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Wedding Name <span className="text-pink-300">*</span>
            </label>
            <input
              type="text"
              value={formData.weddingName}
              onChange={(e) => handleChange("weddingName", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter wedding name"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Date <span className="text-pink-300">*</span>
            </label>
            <input
              type="date"
              value={convertToInputDate(formData.date)}
              onChange={handleDateChange}
              min={getTodayDate()}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="12 Sept, 2025"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Location <span className="text-pink-300">*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Miami, FL"
            />
          </div>

          {/* Wedding Style */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Wedding Style <span className="text-pink-300">*</span>
            </label>
            <select
              value={formData.weddingStyle}
              onChange={(e) => handleChange("weddingStyle", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="Traditional">Traditional</option>
              <option value="Modern">Modern</option>
              <option value="Rustic">Rustic</option>
              <option value="Beach">Beach</option>
              <option value="Garden">Garden</option>
            </select>
          </div>

          {/* Atmosphere */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Atmosphere <span className="text-pink-300">*</span>
            </label>
            <select
              value={formData.atmosphere}
              onChange={(e) => handleChange("atmosphere", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="Casual">Casual</option>
              <option value="Formal">Formal</option>
              <option value="Semi-Formal">Semi-Formal</option>
              <option value="Cocktail">Cocktail</option>
            </select>
          </div>

          {/* Rituals */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Rituals <span className="text-pink-300">*</span>
            </label>
            <select
              value={formData.rituals}
              onChange={(e) => handleChange("rituals", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="Mehendi">Mehendi</option>
              <option value="Sangeet">Sangeet</option>
              <option value="Haldi">Haldi</option>
              <option value="Traditional Ceremony">Traditional Ceremony</option>
              <option value="None">None</option>
            </select>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Theme <span className="text-pink-300">*</span>
            </label>
            <select
              value={formData.theme}
              onChange={(e) => handleChange("theme", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="Pink">Pink</option>
              <option value="Blue">Blue</option>
              <option value="Gold">Gold</option>
              <option value="Purple">Purple</option>
              <option value="Green">Green</option>
              <option value="Neutral">Neutral</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Budget <span className="text-pink-300">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => handleChange("budget", e.target.value)}
                className="flex-1 px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="$3,000"
              />
              <select className="px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>

          {/* Top Priority */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Top Priority <span className="text-pink-300">*</span>
            </label>
            <input
              type="text"
              value={formData.topPriority}
              onChange={(e) => handleChange("topPriority", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Venue, Food, Decoration"
            />
          </div>

          {/* Entertainment */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Entertainment <span className="text-pink-300">*</span>
            </label>
            <input
              type="text"
              value={formData.entertainment}
              onChange={(e) => handleChange("entertainment", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="DJ"
            />
          </div>

          {/* Guest Count */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Guest Count <span className="text-pink-300">*</span>
            </label>
            <input
              type="text"
              value={formData.guestCount}
              onChange={(e) => handleChange("guestCount", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="80"
            />
          </div>

          {/* Food Service */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Food Service <span className="text-pink-300">*</span>
            </label>
            <select
              value={formData.foodService}
              onChange={(e) => handleChange("foodService", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="Plated">Plated</option>
              <option value="Buffet">Buffet</option>
              <option value="Family Style">Family Style</option>
              <option value="Cocktail">Cocktail</option>
            </select>
          </div>

          {/* Dietary Restrictions */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Dietary Restrictions <span className="text-pink-300">*</span>
            </label>
            <input
              type="text"
              value={formData.dietaryRestrictions}
              onChange={(e) =>
                handleChange("dietaryRestrictions", e.target.value)
              }
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Vegan, Lactose intolerant"
            />
          </div>

          {/* Update Button */}
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleSubmit}
              size="lg"
              className="text-white bg-primary font-semibold hover:bg-primary/80 transition-colors mt-8"
            >
              Update
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
