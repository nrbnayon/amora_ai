// app/(dashboard)/dashboard/all-weddings/page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WeddingCard } from "@/components/dashboard/WeddingCard";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import type { Wedding, OnboardingFormData } from "@/lib/types";
import { Plus } from "lucide-react";

// Mock data for demonstration
const mockWeddings: Wedding[] = [
  {
    id: "1",
    userId: "user1",
    title: "John & Jane Smith",
    groomName: "John",
    brideName: "Jane Smith",
    date: new Date("2025-09-10"),
    time: "10:00 am - 11:00 am",
    venue: "Grand Hotel Ballroom",
    location: "Grand Hotel Ballroom",
    budget: 50000,
    guestCount: 170,
    status: "planning",
    progress: 85,
    daysUntilEvent: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    userId: "user1",
    title: "John & Jane Smith",
    groomName: "John",
    brideName: "Jane Smith",
    date: new Date("2025-09-10"),
    time: "10:00 am - 11:00 am",
    venue: "Grand Hotel Ballroom",
    location: "Grand Hotel Ballroom",
    budget: 50000,
    guestCount: 170,
    status: "planning",
    progress: 85,
    daysUntilEvent: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    userId: "user1",
    title: "John & Jane Smith",
    groomName: "John",
    brideName: "Jane Smith",
    date: new Date("2025-09-10"),
    time: "10:00 am - 11:00 am",
    venue: "Grand Hotel Ballroom",
    location: "Grand Hotel Ballroom",
    budget: 50000,
    guestCount: 170,
    status: "planning",
    progress: 85,
    daysUntilEvent: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    userId: "user1",
    title: "John & Jane Smith",
    groomName: "John",
    brideName: "Jane Smith",
    date: new Date("2025-09-10"),
    time: "10:00 am - 11:00 am",
    venue: "Grand Hotel Ballroom",
    location: "Grand Hotel Ballroom",
    budget: 50000,
    guestCount: 170,
    status: "planning",
    progress: 85,
    daysUntilEvent: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    userId: "user1",
    title: "John & Jane Smith",
    groomName: "John",
    brideName: "Jane Smith",
    date: new Date("2025-09-10"),
    time: "10:00 am - 11:00 am",
    venue: "Grand Hotel Ballroom",
    location: "Grand Hotel Ballroom",
    budget: 50000,
    guestCount: 170,
    status: "planning",
    progress: 85,
    daysUntilEvent: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    userId: "user1",
    title: "John & Jane Smith",
    groomName: "John",
    brideName: "Jane Smith",
    date: new Date("2025-09-10"),
    time: "10:00 am - 11:00 am",
    venue: "Grand Hotel Ballroom",
    location: "Grand Hotel Ballroom",
    budget: 50000,
    guestCount: 170,
    status: "planning",
    progress: 85,
    daysUntilEvent: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function AllWeddingsClient() {
  const router = useRouter();
  const [isOnboardingOpen, setIsOnboardingOpen] = React.useState(false);
  const [weddings, setWeddings] = React.useState<Wedding[]>(mockWeddings);

  // Calculate statistics
  const totalEvents = weddings.length;
  const activeEvents = weddings.filter((w) => w.status === "planning").length;
  const completedEvents = weddings.filter((w) => w.status === "completed").length;

  const handleCreateWedding = () => {
    setIsOnboardingOpen(true);
  };

  const handleOnboardingComplete = (data: OnboardingFormData) => {
    console.log("Onboarding completed with data:", data);
    
    // Create new wedding from onboarding data
    const newWedding: Wedding = {
      id: `wedding-${Date.now()}`,
      userId: "current-user",
      title: `${data.yourName} & ${data.partnerName}`,
      groomName: data.yourName,
      brideName: data.partnerName,
      date: new Date(data.weddingDate),
      location: data.weddingLocation,
      venue: data.weddingLocation,
      budget: parseInt(data.budget) || 0,
      guestCount: parseInt(data.guestCount) || 0,
      status: "planning",
      progress: 0,
      daysUntilEvent: Math.ceil(
        (new Date(data.weddingDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      ),
      topPriorities: data.topPriorities,
      entertainment: data.entertainment,
      weddingStyle: data.weddingStyle,
      atmosphere: data.atmosphere,
      themeOrColor: data.themeOrColor,
      culturalRituals: data.culturalRituals,
      venuePreference: data.venuePreference,
      mealPreference: data.mealPreference,
      additionalNotes: data.additionalNotes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setWeddings([newWedding, ...weddings]);
    
    // Navigate to the new wedding dashboard
    router.push(`/dashboard?weddingId=${newWedding.id}`);
  };

  const handleWeddingClick = (wedding: Wedding) => {
    router.push(`/dashboard?weddingId=${wedding.id}`);
  };

  return (
    <div className="w-full mx-auto">
      <div className="w-full mx-auto">
        {/* Header */}
      <div className="flex flex-wrap items-center justify-center md:justify-between gap-3 border-b pb-3 mb-4">
        <div className="text-center md:text-left">
          <h1 className="text-xl md:text-3xl font-semibold text-gray-900">
           Wedding Events
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Manage all wedding plans in one place
          </p>
        </div>
      </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white border-none shadow-[4px_4px_54px_0px_#0000000D]">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {totalEvents}
              </div>
              <div className="text-sm text-primary">Total Events</div>
            </div>
          </Card>
          <Card className="p-6 bg-white border-none shadow-[4px_4px_54px_0px_#0000000D]">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {activeEvents}
              </div>
              <div className="text-sm text-primary">Active Events</div>
            </div>
          </Card>
          <Card className="p-6 bg-white border-none shadow-[4px_4px_54px_0px_#0000000D]">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {completedEvents}
              </div>
              <div className="text-sm text-primary">Completed</div>
            </div>
          </Card>
        </div>

        {/* All Wedding Plans Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">
            All Wedding Plans
          </h2>
          <Button
            onClick={handleCreateWedding}
            className="bg-primary hover:bg-primary/80 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Wedding Plan
          </Button>
        </div>

        {/* Wedding Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weddings.map((wedding) => (
            <WeddingCard
              key={wedding.id}
              wedding={wedding}
              onClick={() => handleWeddingClick(wedding)}
            />
          ))}
        </div>

        {/* Empty State */}
        {weddings.length === 0 && (
          <Card className="p-12 text-center bg-white">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">💍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Wedding Plans Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start planning your dream wedding by creating your first wedding
                plan.
              </p>
              <Button
                onClick={handleCreateWedding}
                className="bg-primary hover:bg-primary/80 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Wedding Plan
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Onboarding Modal */}
      <OnboardingModal
        open={isOnboardingOpen}
        onOpenChange={setIsOnboardingOpen}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
}