// components/vendors/VendorCard.tsx
import React from "react";
import { Vendor } from "./VendorsPage";
import { MapPinHouse, Plus } from "lucide-react";

interface VendorCardProps {
  vendor: Vendor;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onVendorClick: (vendor: Vendor) => void;
}

export function VendorCard({
  vendor,
  isSaved,
  onToggleSave,
  onVendorClick,
}: VendorCardProps) {
  return (
    <div
      onClick={() => onVendorClick(vendor)}
      className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_##00000014] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(vendor.id);
          }}
          className={`absolute top-3 right-3 rounded-sm flex items-center gap-1 px-2 py-1 shadow-md transition-colors ${
            isSaved
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">
            {isSaved ? "Saved" : "Save"}
          </span>
        </button>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {vendor.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {vendor.description}
        </p>
        {/* <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-500">★</span>
          <span className="font-semibold text-gray-900">{vendor.rating}</span>
          <span className="text-sm text-gray-600">
            ({vendor.reviews} reviews)
          </span>
        </div> */}
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MapPinHouse className="w-4 h-4" />
          <span>{vendor.location}</span>
        </div>
      </div>
    </div>
  );
}
