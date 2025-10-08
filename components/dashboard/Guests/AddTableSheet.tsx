// components/guests/AddTableSheet.tsx
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table } from "./GuestsSeatingPage";

interface AddTableSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (table: Omit<Table, "id" | "guests">) => void;
}

export function AddTableSheet({ isOpen, onClose, onAdd }: AddTableSheetProps) {
  const [numberOfTables, setNumberOfTables] = useState(1);
  const [numberOfSeats, setNumberOfSeats] = useState(8);
  const [error, setError] = useState("");

  const maxSeatsPerTable = 8;

  const handleTableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setNumberOfTables(value);
    setError("");
  };

  const handleSeatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value > maxSeatsPerTable) {
      setError(`Maximum number of seats per table: ${maxSeatsPerTable}`);
      setNumberOfSeats(maxSeatsPerTable);
    } else {
      setNumberOfSeats(value);
      setError("");
    }
  };

  const handleSubmit = () => {
    if (numberOfTables < 1) {
      setError("Please enter at least 1 table");
      return;
    }
    if (numberOfSeats < 1) {
      setError("Please enter at least 1 seat");
      return;
    }
    if (numberOfSeats > maxSeatsPerTable) {
      setError(`Maximum number of seats per table: ${maxSeatsPerTable}`);
      return;
    }

    for (let i = 0; i < numberOfTables; i++) {
      onAdd({
        name: `Table ${Date.now() + i}`,
        capacity: numberOfSeats,
      });
    }

    setNumberOfTables(1);
    setNumberOfSeats(8);
    setError("");
    onClose();
  };

  const handleClose = () => {
    setNumberOfTables(1);
    setNumberOfSeats(8);
    setError("");
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:min-w-3xl bg-primary text-white overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-semibold text-white">
              Add a Table
            </SheetTitle>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </SheetHeader>

        <div className="bg-white text-black p-5 min-h-screen space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Number of Tables
            </label>
            <input
              type="number"
              min="1"
              value={numberOfTables}
              onChange={handleTableChange}
              placeholder="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Number of Seats
            </label>
            <input
              type="number"
              min="1"
              max={maxSeatsPerTable}
              value={numberOfSeats}
              onChange={handleSeatsChange}
              placeholder="8"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-sm text-red-500 mt-2">
              Maximum number of seats per table: {maxSeatsPerTable}
            </p>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 p-6">
          <Button
            size="lg"
            onClick={handleSubmit}
            className="bg-primary text-white hover:bg-primary/90 px-8"
          >
            Add Table
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
