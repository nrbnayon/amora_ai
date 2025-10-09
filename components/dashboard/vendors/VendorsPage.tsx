// components/vendors/VendorsPage.tsx
"use client";
import React, { useState } from "react";
import { VendorCategorySection } from "./VendorCategorySection";
import { ManageCategoriesSheet } from "./ManageCategoriesSheet";
import { VendorDetailsSheet } from "./VendorDetailsSheet";
import { MyVendorsPage } from "./MyVendorsPage";
import { Button } from "@/components/ui/button";
import { Vendor } from "@/lib/types";



const baseVendors: Vendor[] = [
  {
    id: "1",
    name: "Lucky Star Hotel & Resort",
    category: "Venue",
    description:
      "This highly-rated hotel provides elegant event spaces, including options suitable for fewer than 25 people.",
    location: "Downtown, Newyork",
    image: "/vendors/venue1.png",
    rating: 4.8,
    reviews: 32,
    email: "example@gmail.com",
    phone: "000-0000-000",
    website: "https://example.com/",
    fullDescription:
      "Sea Pearl Beach Resort & Spa is located on Inani beach, Cox's Bazar with lush green hills rise from the east and endless sea stretching on the west, the resort offers panoramic visuals of Bay of Bengal. Nestled in the heart of nature along the worlds longest natural sandy beach, the resort is spread over 15 acres, located 40 minutes away from the hustle of the Cox's Bazar city with easy accessibility to all the major tourist.",
    images: [
      "/vendors/hotel.png",
      "/vendors/catering.png",
      "/vendors/florists.png",
      "/vendors/catering.png",
    ],
  },
  {
    id: "2",
    name: "Foodie",
    category: "Catering",
    description:
      "This highly-rated hotel provides elegant event spaces, including options suitable for fewer than 25 people.",
    location: "Downtown, Newyork",
    image: "/vendors/catering.png",
    rating: 4.8,
    reviews: 32,
    email: "example@gmail.com",
    phone: "000-0000-000",
    website: "https://example.com/",
    fullDescription:
      "Premium catering service specializing in wedding events with customizable menus and exceptional presentation.",
    images: ["/vendors/catering.png"],
  },
  {
    id: "3",
    name: "Black Zang",
    category: "Entertainment",
    description:
      "This highly-rated hotel provides elegant event spaces, including options suitable for fewer than 25 people.",
    location: "Downtown, Newyork",
    image: "/vendors/entertainment.png",
    rating: 4.8,
    reviews: 32,
    email: "example@gmail.com",
    phone: "000-0000-000",
    website: "https://example.com/",
    fullDescription:
      "Professional DJ service bringing energy and excitement to your special day with diverse music selection.",
    images: ["/vendors/entertainment.png"],
  },
  {
    id: "4",
    name: "Lucy Flower Shop",
    category: "Florists",
    description:
      "This highly-rated hotel provides elegant event spaces, including options suitable for fewer than 25 people.",
    location: "Downtown, Newyork",
    image: "/vendors/florists.png",
    rating: 4.8,
    reviews: 32,
    email: "example@gmail.com",
    phone: "000-0000-000",
    website: "https://example.com/",
    fullDescription:
      "Artisanal flower arrangements and bouquets crafted with fresh, seasonal blooms for your wedding day.",
    images: ["/vendors/florists.png"],
  },
  {
    id: "5",
    name: "Damien Shoots",
    category: "Photographer",
    description:
      "This highly-rated hotel provides elegant event spaces, including options suitable for fewer than 25 people.",
    location: "Downtown, Newyork",
    image: "/vendors/photographer.png",
    rating: 4.8,
    reviews: 32,
    email: "example@gmail.com",
    phone: "000-0000-000",
    website: "https://example.com/",
    fullDescription:
      "Award-winning wedding photography capturing authentic moments and emotions with artistic vision.",
    images: ["/vendors/photographer.png"],
  },
  {
    id: "6",
    name: "Damien Shoots",
    category: "Videographer",
    description:
      "This highly-rated hotel provides elegant event spaces, including options suitable for fewer than 25 people.",
    location: "Downtown, Newyork",
    image: "/vendors/videographer.png",
    rating: 4.8,
    reviews: 32,
    email: "example@gmail.com",
    phone: "000-0000-000",
    website: "https://example.com/",
    fullDescription:
      "Cinematic wedding videography creating timeless films that tell your unique love story.",
    images: ["/vendors/videographer.png"],
  },
];

// Function to duplicate vendors for pagination demo
const duplicateVendors = (vendors: Vendor[], count: number): Vendor[] => {
  const duplicated: Vendor[] = [];
  for (let i = 0; i < count; i++) {
    vendors.forEach((vendor) => {
      duplicated.push({
        ...vendor,
        id: `${vendor.id}-${i}`,
      });
    });
  }
  return duplicated;
};

const initialVendors: Vendor[] = duplicateVendors(baseVendors, 8);

const categories = [
  "Venue",
  "Attire",
  "Catering",
  "Cakes",
  "Decor",
  "Entertainment",
  "Favors / Gifts",
  "Florists",
  "Hair and Makeup",
  "Invitation",
  "Photographer",
  "Rentals",
  "Transportation",
  "Videographer",
  "Accomodation",
];

export default function VendorsPage() {
  const [activeTab, setActiveTab] = useState<"recommendations" | "my-vendors">(
    "recommendations"
  );
  const [vendors] = useState<Vendor[]>(initialVendors);
  const [savedVendors, setSavedVendors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Venue",
    "Catering",
    "Entertainment",
    "Florists",
    "Photographer",
    "Videographer",
  ]);
  const [isCategoriesSheetOpen, setIsCategoriesSheetOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isVendorDetailsOpen, setIsVendorDetailsOpen] = useState(false);

  const toggleSaveVendor = (vendorId: string) => {
    setSavedVendors((prev) =>
      prev.includes(vendorId)
        ? prev.filter((id) => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const handleVendorClick = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsVendorDetailsOpen(true);
  };

  const getVendorsByCategory = (category: string) => {
    return vendors.filter((v) => v.category === category);
  };

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <div className="mb-3 border-b pb-3">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-3">
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-3xl font-semibold text-gray-900">
              Vendors
            </h1>
            <p className="text-gray-600 text-sm md:text-base mt-2">
              Research, discover & compare vendors
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("recommendations")}
              className={`font-medium pb-1 transition-colors ${
                activeTab === "recommendations"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Recommendations
            </button>
            <button
              onClick={() => setActiveTab("my-vendors")}
              className={`font-medium pb-1 transition-colors ${
                activeTab === "my-vendors"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              My Vendors
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === "recommendations" ? (
        <div className="space-y-5">
          {/* Manage Categories Button */}
          <div className="flex justify-end">
            <Button
              size="lg"
              onClick={() => setIsCategoriesSheetOpen(true)}
              className="bg-primary text-white hover:bg-primary/90"
            >
              Manage vendor categories
            </Button>
          </div>

          {/* Vendor Categories */}
          {selectedCategories.map((category) => (
            <VendorCategorySection
              key={category}
              category={category}
              vendors={getVendorsByCategory(category)}
              savedVendors={savedVendors}
              onToggleSave={toggleSaveVendor}
              onVendorClick={handleVendorClick}
            />
          ))}
        </div>
      ) : (
        <MyVendorsPage
          vendors={vendors.filter((v) => savedVendors.includes(v.id))}
          onVendorClick={handleVendorClick}
        />
      )}

      {/* Manage Categories Sheet */}
      <ManageCategoriesSheet
        isOpen={isCategoriesSheetOpen}
        onClose={() => setIsCategoriesSheetOpen(false)}
        categories={categories}
        selectedCategories={selectedCategories}
        onUpdateCategories={setSelectedCategories}
      />

      {/* Vendor Details Sheet */}
      {selectedVendor && (
        <VendorDetailsSheet
          isOpen={isVendorDetailsOpen}
          onClose={() => {
            setIsVendorDetailsOpen(false);
            setSelectedVendor(null);
          }}
          vendor={selectedVendor}
          isSaved={savedVendors.includes(selectedVendor.id)}
          onToggleSave={toggleSaveVendor}
        />
      )}
    </div>
  );
}
