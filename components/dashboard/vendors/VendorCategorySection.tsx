// components/vendors/VendorCategorySection.tsx
import React, { useState } from "react";
import { Vendor } from "./VendorsPage";
import { VendorCard } from "./VendorCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VendorCategorySectionProps {
  category: string;
  vendors: Vendor[];
  savedVendors: string[];
  onToggleSave: (id: string) => void;
  onVendorClick: (vendor: Vendor) => void;
}

export function VendorCategorySection({
  category,
  vendors,
  savedVendors,
  onToggleSave,
  onVendorClick,
}: VendorCategorySectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(vendors.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedVendors = vendors.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-8 h-8 rounded-md font-medium transition-all ${
              currentPage === i
                ? "bg-white text-primary border-2 border-primary"
                : "bg-white text-gray-700 border border-gray-300 hover:border-primary hover:text-primary"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      // Always show page 1
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`w-8 h-8 rounded-md font-medium transition-all ${
            currentPage === 1
              ? "bg-white text-primary border-2 border-primary"
              : "bg-white text-gray-700 border border-gray-300 hover:border-primary hover:text-primary"
          }`}
        >
          1
        </button>
      );

      // Show page 2 if we're not too far ahead
      if (currentPage <= 3) {
        pages.push(
          <button
            key={2}
            onClick={() => handlePageChange(2)}
            className={`w-8 h-8 rounded-md font-medium transition-all ${
              currentPage === 2
                ? "bg-white text-primary border-2 border-primary"
                : "bg-white text-gray-700 border border-gray-300 hover:border-primary hover:text-primary"
            }`}
          >
            2
          </button>
        );
      }

      // Show ellipsis and current page area
      if (currentPage > 3) {
        pages.push(
          <span
            key="dots1"
            className="w-8 h-8 flex items-center justify-center text-gray-500"
          >
            ...
          </span>
        );
      }

      // Show current page if it's not 1, 2, second-to-last, or last
      if (currentPage > 2 && currentPage < totalPages - 1) {
        pages.push(
          <button
            key={currentPage}
            onClick={() => handlePageChange(currentPage)}
            className="w-8 h-8 rounded-md font-medium bg-white text-primary border-2 border-primary"
          >
            {currentPage}
          </button>
        );
      }

      // Show ellipsis before last pages
      if (currentPage < totalPages - 2) {
        pages.push(
          <span
            key="dots2"
            className="w-8 h-8 flex items-center justify-center text-gray-500"
          >
            ...
          </span>
        );
      }

      // Show second-to-last page
      if (currentPage >= totalPages - 2) {
        pages.push(
          <button
            key={totalPages - 1}
            onClick={() => handlePageChange(totalPages - 1)}
            className={`w-8 h-8 rounded-md font-medium transition-all ${
              currentPage === totalPages - 1
                ? "bg-white text-primary border-2 border-primary"
                : "bg-white text-gray-700 border border-gray-300 hover:border-primary hover:text-primary"
            }`}
          >
            {totalPages - 1}
          </button>
        );
      }

      // Always show last page
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`w-8 h-8 rounded-md font-medium transition-all ${
            currentPage === totalPages
              ? "bg-white text-primary border-2 border-primary"
              : "bg-white text-gray-700 border border-gray-300 hover:border-primary hover:text-primary"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  if (vendors.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {displayedVendors.map((vendor) => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            isSaved={savedVendors.includes(vendor.id)}
            onToggleSave={onToggleSave}
            onVendorClick={onVendorClick}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-md border border-gray-300 bg-white flex items-center justify-center hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-400 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {renderPageNumbers()}

          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-md border border-gray-300 bg-white flex items-center justify-center hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-400 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
