// components/guests/SeatingLayoutSection.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, SquareArrowOutUpRight } from "lucide-react";
import { Table, Guest } from "./GuestsSeatingPage";
import Image from "next/image";

interface SeatingLayoutSectionProps {
  tables: Table[];
  guests: Guest[];
  onAddTable: () => void;
  onExport: () => void;
}

export function SeatingLayoutSection({
  tables,
  guests,
  onAddTable,
  onExport,
}: SeatingLayoutSectionProps) {
  const getTableGuests = (tableName: string) => {
    return guests.filter(
      (g) => g.assignedTable === tableName && g.status === "Attending"
    );
  };

  return (
    <div className="mb-6 bg-gray-50 rounded-2xl  px-4 py-6">
      {/* Section Header */}
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between mb-4">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-900">
            Seating Layout
          </h2>
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
            onClick={onAddTable}
            className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Table
          </Button>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {tables.map((table) => {
          const tableGuests = getTableGuests(table.name);
          return (
            <div
              key={table.id}
              className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-6 hover:shadow-md transition-shadow"
            >
              {/* Table Header */}
              <div className="flex items-center justify-center">
                <Image
                  src="/table.png"
                  alt="table"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center my-1">
                {table.name}
              </h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                {tableGuests.length}/{table.capacity} Guests
              </p>

              {/* Guest List */}
              <div className="space-y-2">
                {tableGuests.length > 0 ? (
                  tableGuests.map((guest) => (
                    <div
                      key={guest.id}
                      className="flex items-center justify-between rounded-lg"
                    >
                      <span className="text-sm text-gray-900">
                        {guest.name}
                      </span>
                      <span className="text-xs px-4 py-1 bg-green-100 text-green-700 rounded-sm font-medium">
                        {guest.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-0 md:py-8 text-gray-400 text-sm">
                    No guests assigned
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
