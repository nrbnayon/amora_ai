// components/event-list/AddEventSheet.tsx
"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { Event } from "./EventListPage";
import { Button } from "@/components/ui/button";
import {
  convertToDisplayDate,
  convertToInputDate,
  getTodayDate,
} from "@/lib/utils";

interface AddEventSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: Omit<Event, "id">) => void;
}

export function AddEventSheet({ isOpen, onClose, onAdd }: AddEventSheetProps) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (
      formData.name &&
      formData.date &&
      formData.startTime &&
      formData.endTime &&
      formData.location &&
      formData.description
    ) {
      onAdd(formData);
      setFormData({
        name: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        description: "",
      });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    const displayDate = convertToDisplayDate(inputDate);
    handleChange("date", displayDate);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:min-w-3xl bg-primary text-white overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-semibold text-white">
              Add Event
            </SheetTitle>
            <button
              onClick={onClose}
              className="text-white hover:text-white/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </SheetHeader>

        <div className="bg-white text-black p-5 h-screen space-y-6">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Event Name <span className="text-red-300">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Engagement Party"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Date <span className="text-red-300">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={convertToInputDate(formData.date)}
                onChange={handleDateChange}
                min={getTodayDate()}
                className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
          </div>

          {/* Event Starts */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Event Starts <span className="text-red-300">*</span>
            </label>
            <select
              value={formData.startTime}
              onChange={(e) => handleChange("startTime", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="">Select time</option>
              <option value="10:00 am">10:00 am</option>
              <option value="11:00 am">11:00 am</option>
              <option value="12:00 pm">12:00 pm</option>
              <option value="1:00 pm">1:00 pm</option>
              <option value="2:00 pm">2:00 pm</option>
              <option value="3:00 pm">3:00 pm</option>
              <option value="4:00 pm">4:00 pm</option>
              <option value="5:00 pm">5:00 pm</option>
              <option value="6:00 pm">6:00 pm</option>
              <option value="7:00 pm">7:00 pm</option>
              <option value="8:00 pm">8:00 pm</option>
            </select>
          </div>

          {/* Event Ends */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Event Ends <span className="text-red-300">*</span>
            </label>
            <select
              value={formData.endTime}
              onChange={(e) => handleChange("endTime", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="">Select time</option>
              <option value="11:00 am">11:00 am</option>
              <option value="12:00 pm">12:00 pm</option>
              <option value="1:00 pm">1:00 pm</option>
              <option value="2:00 pm">2:00 pm</option>
              <option value="3:00 pm">3:00 pm</option>
              <option value="4:00 pm">4:00 pm</option>
              <option value="5:00 pm">5:00 pm</option>
              <option value="6:00 pm">6:00 pm</option>
              <option value="7:00 pm">7:00 pm</option>
              <option value="8:00 pm">8:00 pm</option>
              <option value="9:00 pm">9:00 pm</option>
              <option value="10:00 pm">10:00 pm</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Location <span className="text-red-300">*</span>
            </label>
            <select
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="">Select location</option>
              <option value="Family Home">Family Home</option>
              <option value="Banquet Hall">Banquet Hall</option>
              <option value="Garden Venue">Garden Venue</option>
              <option value="Beach">Beach</option>
              <option value="Hotel">Hotel</option>
              <option value="Restaurant">Restaurant</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description <span className="text-red-300">*</span>
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Casual gathering"
            />
          </div>

          {/* Add Event Button */}
          <div className="w-full flex justify-end items-center">
            <Button
              size="lg"
              onClick={handleSubmit}
              className="text-white bg-primary hover:bg-primary/80 transition-colors mt-5"
            >
              Add Event
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
