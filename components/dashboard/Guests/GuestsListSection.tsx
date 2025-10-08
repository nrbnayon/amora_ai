// components/guests/GuestsListSection.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  SquareArrowOutUpRight,
  SquarePen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Guest, Table } from "./GuestsSeatingPage";

interface GuestsListSectionProps {
  guests: Guest[];
  tables: Table[];
  onAddGuest: () => void;
  onEditGuest: (guest: Guest) => void;
  onDeleteGuest: (id: string) => void;
  onExport: () => void;
  onAssignGuestToTable: (guestId: string, tableName: string) => void;
}

export function GuestsListSection({
  guests,
  tables,
  onAddGuest,
  onEditGuest,
  onExport,
  onAssignGuestToTable,
}: GuestsListSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(guests.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedGuests = guests.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Attending":
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

  const handleTableSelect = (guestId: string, tableName: string) => {
    onAssignGuestToTable(guestId, tableName);
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
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
    <div className="mb-6">
      {/* Section Header */}
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between mb-4">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-900">Guests List</h2>
          <p className="text-sm text-gray-600 mt-1">
            Select a guest and click a table's "Seat here" to assign.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            size="lg"
            onClick={onExport}
            variant="outline"
            className="flex items-center gap-2"
          >
            <SquareArrowOutUpRight className="w-5 h-5" />
            Export
          </Button>
          <Button
            size="lg"
            onClick={onAddGuest}
            className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Guest
          </Button>
        </div>
      </div>

      {/* Guests Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-auto mb-6">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">
                Guest Name
              </th>
              <th className="text-center py-4 px-6 font-semibold text-gray-900">
                Group
              </th>
              <th className="text-center py-4 px-6 font-semibold text-gray-900">
                Email
              </th>
              <th className="text-center py-4 px-6 font-semibold text-gray-900">
                Dietary
              </th>
              <th className="text-center py-4 px-6 font-semibold text-gray-900">
                Assigned Table
              </th>
              <th className="text-center py-4 px-6 font-semibold text-gray-900">
                Status
              </th>
              <th className="text-center py-4 px-6 font-semibold text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedGuests.map((guest) => (
              <tr
                key={guest.id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6 text-gray-900">{guest.name}</td>
                <td className="py-4 px-6 text-gray-600 text-center">
                  {guest.group}
                </td>
                <td className="py-4 px-6 text-gray-600 text-center">
                  {guest.email}
                </td>
                <td className="py-4 px-6 text-gray-600 text-center">
                  {guest.dietary}
                </td>
                <td className="py-4 px-6 text-center">
                  <select
                    value={guest.assignedTable}
                    onChange={(e) =>
                      handleTableSelect(guest.id, e.target.value)
                    }
                    className="px-3 py-1 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Select">Select</option>
                    {tables.map((table) => (
                      <option key={table.id} value={table.name}>
                        {table.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-4 px-6 text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-sm text-sm font-medium ${getStatusColor(
                      guest.status
                    )}`}
                  >
                    {guest.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => onEditGuest(guest)}
                    className="p-2 hover:bg-gray-100 rounded-sm transition-colors"
                  >
                    <SquarePen className="w-5 h-5 text-[#357D5F]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
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
    </div>
  );
}
