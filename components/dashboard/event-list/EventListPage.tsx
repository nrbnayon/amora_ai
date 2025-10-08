// components/event-list/EventListPage.tsx
"use client";
import React, { useState } from "react";
import { EventCard } from "./EventCard";
import { AddEventSheet } from "./AddEventSheet";
import { EditEventSheet } from "./EditEventSheet";
import { ExportSheet } from "./ExportSheet";
import { Plus, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface Event {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
}

const initialEvents: Event[] = [
  {
    id: "1",
    name: "Engagement Party",
    date: "10 Sept, 2025",
    startTime: "10:00 am",
    endTime: "11:00 am",
    location: "Family Home",
    description: "Casual Gathering",
  },
  {
    id: "2",
    name: "Bridal Shower",
    date: "10 Sept, 2025",
    startTime: "10:00 am",
    endTime: "11:00 am",
    location: "Family Home",
    description: "Casual Gathering",
  },
  {
    id: "3",
    name: "Bachelor Party",
    date: "10 Sept, 2025",
    startTime: "10:00 am",
    endTime: "11:00 am",
    location: "Family Home",
    description: "Casual Gathering",
  },
  {
    id: "4",
    name: "Bachelorette Party",
    date: "10 Sept, 2025",
    startTime: "10:00 am",
    endTime: "11:00 am",
    location: "Family Home",
    description: "Casual Gathering",
  },
  {
    id: "5",
    name: "Rehearsal Dinner",
    date: "10 Sept, 2025",
    startTime: "10:00 am",
    endTime: "11:00 am",
    location: "Family Home",
    description: "Casual Gathering",
  },
  {
    id: "6",
    name: "Welcome Cocktail Party",
    date: "10 Sept, 2025",
    startTime: "10:00 am",
    endTime: "11:00 am",
    location: "Family Home",
    description: "Casual Gathering",
  },
  {
    id: "7",
    name: "Wedding Ceremony",
    date: "10 Sept, 2025",
    startTime: "10:00 am",
    endTime: "11:00 am",
    location: "Family Home",
    description: "Casual Gathering",
  },
  {
    id: "8",
    name: "Cocktail Hour",
    date: "10 Sept, 2025",
    startTime: "10:00 am",
    endTime: "11:00 am",
    location: "Family Home",
    description: "Casual Gathering",
  },
  {
    id: "9",
    name: "Reception",
    date: "10 Sept, 2025",
    startTime: "10:00 am",
    endTime: "11:00 am",
    location: "Family Home",
    description: "Casual Gathering",
  },
  {
    id: "10",
    name: "After Party",
    date: "10 Sept, 2025",
    startTime: "10:00 am",
    endTime: "11:00 am",
    location: "Family Home",
    description: "Casual Gathering",
  },
  {
    id: "11",
    name: "Farewell Brunch",
    date: "10 Sept, 2025",
    startTime: "10:00 am",
    endTime: "11:00 am",
    location: "Family Home",
    description: "Casual Gathering",
  },
];

export default function EventListPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isExportSheetOpen, setIsExportSheetOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleAddEvent = (newEvent: Omit<Event, "id">) => {
    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
    };
    setEvents([...events, event]);
    setIsAddSheetOpen(false);
    toast.success("Event added successfully!", {
      description: `${newEvent.name} has been added to your event list.`,
    });
  };

  const handleEditEvent = (updatedEvent: Event) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setIsEditSheetOpen(false);
    setSelectedEvent(null);
    toast.success("Event updated successfully!", {
      description: `${updatedEvent.name} has been updated.`,
    });
  };

  const handleDeleteEvent = (id: string) => {
    const eventToDelete = events.find((event) => event.id === id);
    setEvents(events.filter((event) => event.id !== id));
    toast.success("Event deleted successfully!", {
      description: `${eventToDelete?.name} has been removed from your event list.`,
    });
  };

  const handleExport = (format: string, webLink?: string) => {
    toast.success(`Exporting as ${format}`, {
      description: "Your event list is being prepared for download.",
    });
  };

  const openEditSheet = (event: Event) => {
    setSelectedEvent(event);
    setIsEditSheetOpen(true);
  };

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-center md:justify-between gap-3 border-b pb-3 mb-4">
        <div className="text-center md:text-left">
          <h1 className="text-xl md:text-3xl font-semibold text-gray-900">
            Event List
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Build and customize events using AI
          </p>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-2xl">
        {/* Section Header with Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Event List
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsExportSheetOpen(true)}
              className="text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <SquareArrowOutUpRight className="w-4 h-4" />
              Export
            </Button>
            <Button
              size="lg"
              onClick={() => setIsAddSheetOpen(true)}
              className="bg-primary text-white hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={openEditSheet}
              onDelete={handleDeleteEvent}
            />
          ))}
        </div>

        {/* Add Event Sheet */}
        <AddEventSheet
          isOpen={isAddSheetOpen}
          onClose={() => setIsAddSheetOpen(false)}
          onAdd={handleAddEvent}
        />

        {/* Edit Event Sheet */}
        {selectedEvent && (
          <EditEventSheet
            isOpen={isEditSheetOpen}
            onClose={() => {
              setIsEditSheetOpen(false);
              setSelectedEvent(null);
            }}
            event={selectedEvent}
            onUpdate={handleEditEvent}
          />
        )}

        {/* Export Sheet */}
        <ExportSheet
          isOpen={isExportSheetOpen}
          onClose={() => setIsExportSheetOpen(false)}
          onExport={handleExport}
          events={events}
        />
      </div>
    </div>
  );
}
