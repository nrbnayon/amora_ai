// components/guests/GuestsSeatingPage.tsx
"use client";
import React, { useState } from "react";
import { GuestRSVPSection } from "./GuestRSVPSection";
import { SeatingChartSection } from "./SeatingChartSection";
import { SeatingLayoutSection } from "./SeatingLayoutSection";
import { GuestsListSection } from "./GuestsListSection";
import { AddGuestSheet } from "./AddGuestSheet";
import { EditGuestSheet } from "./EditGuestSheet";
import { AddTableSheet } from "./AddTableSheet";
import { GuestsExportSheet } from "./GuestsExportSheet";

export interface Guest {
  id: string;
  name: string;
  group: "Bride" | "Groom";
  email: string;
  address: string;
  phone: string;
  dietary: string;
  status: "Attending" | "Pending" | "Declined";
  assignedTable: string;
}

export interface Table {
  id: string;
  name: string;
  capacity: number;
  guests: Guest[];
}

const initialGuests: Guest[] = [
  {
    id: "1",
    name: "John Smith",
    group: "Bride",
    email: "example@gmail.com",
    address: "884 Baker Street, Miami, FL",
    phone: "000-0000-000",
    dietary: "None",
    status: "Attending",
    assignedTable: "Select",
  },
  {
    id: "2",
    name: "Emma Joel",
    group: "Groom",
    email: "example@gmail.com",
    address: "884 Baker Street, Miami, FL",
    phone: "000-0000-000",
    dietary: "Vegan",
    status: "Attending",
    assignedTable: "Main Table",
  },
  {
    id: "3",
    name: "John Smith",
    group: "Bride",
    email: "example@gmail.com",
    address: "884 Baker Street, Miami, FL",
    phone: "000-0000-000",
    dietary: "Gluten-free",
    status: "Declined",
    assignedTable: "Table 2",
  },
  {
    id: "4",
    name: "Emma Joel",
    group: "Groom",
    email: "example@gmail.com",
    address: "884 Baker Street, Miami, FL",
    phone: "000-0000-000",
    dietary: "Dairy-free",
    status: "Attending",
    assignedTable: "Table 2",
  },
  {
    id: "5",
    name: "John Smith",
    group: "Bride",
    email: "example@gmail.com",
    address: "884 Baker Street, Miami, FL",
    phone: "000-0000-000",
    dietary: "None",
    status: "Attending",
    assignedTable: "Table 3",
  },
  {
    id: "6",
    name: "Emma Joel",
    group: "Groom",
    email: "example@gmail.com",
    address: "884 Baker Street, Miami, FL",
    phone: "000-0000-000",
    dietary: "Dairy-free",
    status: "Declined",
    assignedTable: "Table 3",
  },
];

const initialTables: Table[] = [
  { id: "1", name: "Main Table", capacity: 8, guests: [] },
  { id: "2", name: "Table 2", capacity: 8, guests: [] },
  { id: "3", name: "Table 3", capacity: 8, guests: [] },
  { id: "4", name: "Table 4", capacity: 8, guests: [] },
  { id: "5", name: "Table 5", capacity: 8, guests: [] },
  { id: "6", name: "Table 6", capacity: 8, guests: [] },
  { id: "7", name: "Table 7", capacity: 8, guests: [] },
  { id: "8", name: "Table 8", capacity: 8, guests: [] },
  { id: "9", name: "Table 9", capacity: 8, guests: [] },
];

export default function GuestsSeatingPage() {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);
  const [isEditGuestOpen, setIsEditGuestOpen] = useState(false);
  const [isAddTableOpen, setIsAddTableOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  const attendingGuests = guests.filter((g) => g.status === "Attending").length;
  const pendingGuests = guests.filter((g) => g.status === "Pending").length;
  const declinedGuests = guests.filter((g) => g.status === "Declined").length;
  const totalGuests = guests.length;

  const handleAddGuest = (guest: Omit<Guest, "id">) => {
    const newGuest: Guest = {
      ...guest,
      id: Date.now().toString(),
    };
    setGuests([...guests, newGuest]);
  };

  const handleEditGuest = (updatedGuest: Guest) => {
    setGuests(guests.map((g) => (g.id === updatedGuest.id ? updatedGuest : g)));
  };

  const handleDeleteGuest = (id: string) => {
    setGuests(guests.filter((g) => g.id !== id));
  };

  const handleEditClick = (guest: Guest) => {
    setSelectedGuest(guest);
    setIsEditGuestOpen(true);
  };

  const handleAddTable = (table: Omit<Table, "id" | "guests">) => {
    const newTable: Table = {
      ...table,
      id: Date.now().toString(),
      guests: [],
    };
    setTables([...tables, newTable]);
  };

  const handleAssignGuestToTable = (guestId: string, tableName: string) => {
    setGuests(
      guests.map((g) =>
        g.id === guestId ? { ...g, assignedTable: tableName } : g
      )
    );
  };

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <div className="text-center md:text-left mb-5">
        <h1 className="text-3xl font-semibold text-gray-900">
          Guests & Seating
        </h1>
        <p className="text-gray-600 text-base mt-2">
          Manage RSPV's, dietary preferences & seating
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 md:gap-6 mb-2 md:mb-4">
        {/* Guest RSVP Section */}
        <GuestRSVPSection
          attending={attendingGuests}
          pending={pendingGuests}
          declined={declinedGuests}
          total={totalGuests}
        />

        {/* Seating Chart Section */}
        <SeatingChartSection tables={tables} guests={guests} />
      </div>

      {/* Seating Layout Section */}
      <SeatingLayoutSection
        tables={tables}
        guests={guests}
        onAddTable={() => setIsAddTableOpen(true)}
        onExport={() => setIsExportOpen(true)}
      />

      {/* Guests List Section */}
      <GuestsListSection
        guests={guests}
        tables={tables}
        onAddGuest={() => setIsAddGuestOpen(true)}
        onEditGuest={handleEditClick}
        onDeleteGuest={handleDeleteGuest}
        onExport={() => setIsExportOpen(true)}
        onAssignGuestToTable={handleAssignGuestToTable}
      />

      {/* Sheets */}
      <AddGuestSheet
        isOpen={isAddGuestOpen}
        onClose={() => setIsAddGuestOpen(false)}
        onAdd={handleAddGuest}
        tables={tables}
      />

      {selectedGuest && (
        <EditGuestSheet
          isOpen={isEditGuestOpen}
          onClose={() => {
            setIsEditGuestOpen(false);
            setSelectedGuest(null);
          }}
          guest={selectedGuest}
          onSave={handleEditGuest}
          tables={tables}
        />
      )}

      <AddTableSheet
        isOpen={isAddTableOpen}
        onClose={() => setIsAddTableOpen(false)}
        onAdd={handleAddTable}
      />

      <GuestsExportSheet
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        guests={guests}
        tables={tables}
      />
    </div>
  );
}
