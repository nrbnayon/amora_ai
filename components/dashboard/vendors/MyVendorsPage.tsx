// components/vendors/MyVendorsPage.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Vendor } from "./VendorsPage";
import { VendorExportSheet } from "./VendorExportSheet";
import { ChevronLeft, ChevronRight, SquareArrowOutUpRight } from "lucide-react";

interface MyVendorsPageProps {
  vendors: Vendor[];
  onVendorClick: (vendor: Vendor) => void;
}

export function MyVendorsPage({ vendors, onVendorClick }: MyVendorsPageProps) {
  const [isExportSheetOpen, setIsExportSheetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(vendors.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedVendors = vendors.slice(startIndex, endIndex);

  // Mock vendor data with statuses
  const vendorsWithStatus = displayedVendors.map((vendor, index) => ({
    ...vendor,
    status:
      index % 3 === 0 ? "Confirmed" : index % 3 === 1 ? "Pending" : "Declined",
  })) as (Vendor & { status: "Confirmed" | "Pending" | "Declined" })[];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      case "Declined":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
            className={`w-8 h-8 rounded-sm font-medium transition-all ${
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
          className={`w-8 h-8 rounded-sm font-medium transition-all ${
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
            className={`w-8 h-8 rounded-sm font-medium transition-all ${
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
            className="w-8 h-8 rounded-sm font-medium bg-white text-primary border-2 border-primary"
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
            className={`w-8 h-8 rounded-sm font-medium transition-all ${
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
          className={`w-8 h-8 rounded-sm font-medium transition-all ${
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">My vendors</h2>
        <Button
          onClick={() => setIsExportSheetOpen(true)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <SquareArrowOutUpRight className="w-5 h-5" />
          Export
        </Button>
      </div>

      {vendors.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg">No vendors saved yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Browse recommendations and save vendors to see them here
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Vendor Name
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Contact
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {vendorsWithStatus.map((vendor) => (
                  <tr
                    key={vendor.id}
                    onClick={() => onVendorClick(vendor)}
                    className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-900">{vendor.name}</td>
                    <td className="py-4 px-6 text-gray-600">
                      {vendor.category}
                    </td>
                    <td className="py-4 px-6 text-gray-600">{vendor.phone}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-sm text-sm font-medium ${getStatusColor(
                          vendor.status
                        )}`}
                      >
                        {vendor.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-sm border border-gray-300 bg-white flex items-center justify-center hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-400 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {renderPageNumbers()}

              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-sm border border-gray-300 bg-white flex items-center justify-center hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-400 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}

      <VendorExportSheet
        isOpen={isExportSheetOpen}
        onClose={() => setIsExportSheetOpen(false)}
        vendors={vendors}
      />
    </div>
  );
}
