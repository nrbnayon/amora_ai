// components/budget/BudgetPage.tsx Update corrected page
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, SquareArrowOutUpRight } from "lucide-react";
import { BudgetCard } from "./BudgetCard";
import { AddBudgetSheet } from "./AddBudgetSheet";
import { EditBudgetSheet } from "./EditBudgetSheet";
import { BudgetExportSheet } from "./BudgetExportSheet";

export interface BudgetItem {
  id: string;
  category: string;
  vendorName: string;
  estimated: number;
  actual: number;
  paid: number;
}

const initialBudgetItems: BudgetItem[] = [
  {
    id: "1",
    category: "Photographer",
    vendorName: "Damien Shoots",
    estimated: 500,
    actual: 0,
    paid: 0,
  },
  {
    id: "2",
    category: "Venue",
    vendorName: "Lucky Star Hotel & Resort",
    estimated: 1000,
    actual: 0,
    paid: 0,
  },
  {
    id: "3",
    category: "Florist",
    vendorName: "Lucy Flower Shop",
    estimated: 300,
    actual: 0,
    paid: 0,
  },
  {
    id: "4",
    category: "Catering",
    vendorName: "Foodie",
    estimated: 700,
    actual: 0,
    paid: 0,
  },
  {
    id: "5",
    category: "Entertainment",
    vendorName: "Black Zang",
    estimated: 500,
    actual: 0,
    paid: 0,
  },
];

export default function BudgetPage() {
  const [budgetItems, setBudgetItems] =
    useState<BudgetItem[]>(initialBudgetItems);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [isEditBudgetOpen, setIsEditBudgetOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BudgetItem | null>(null);
  const [eventBudget, setEventBudget] = useState(3000);

  const totalEstimated = budgetItems.reduce(
    (sum, item) => sum + item.estimated,
    0
  );
  const totalActual = budgetItems.reduce((sum, item) => sum + item.actual, 0);
  const totalPaid = budgetItems.reduce((sum, item) => sum + item.paid, 0);

  const handleAddBudget = (item: Omit<BudgetItem, "id">) => {
    const newItem: BudgetItem = {
      ...item,
      id: Date.now().toString(),
    };
    setBudgetItems([...budgetItems, newItem]);
  };

  const handleEditBudget = (updatedItem: BudgetItem) => {
    setBudgetItems(
      budgetItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  const handleDeleteBudget = (id: string) => {
    setBudgetItems(budgetItems.filter((item) => item.id !== id));
  };

  const handleEditClick = (item: BudgetItem) => {
    setSelectedItem(item);
    setIsEditBudgetOpen(true);
  };

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <div className="mb-4 border-b pb-3">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-3">
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-3xl font-semibold text-gray-900">
              Budget
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              A simple and intuitive budget tracker
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mb-4">
        <Button
          size="lg"
          onClick={() => setIsExportOpen(true)}
          variant="outline"
          className="flex items-center gap-2 py-5"
        >
          <SquareArrowOutUpRight className="w-5 h-5" />
          Export
        </Button>
        <Button size="lg" onClick={() => setIsAddBudgetOpen(true)}>
          <Plus className="w-5 h-5" />
          Add Budget
        </Button>
      </div>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white text-center rounded-2xl shadow-[4px_4px_54px_0px_#00000014] p-6">
          <p className="text-gray-600 text-sm mb-2">Event Budget</p>
          <p className="text-4xl font-bold text-gray-900">${eventBudget}</p>
        </div>
        <div className="bg-white rounded-2xl text-center shadow-[4px_4px_54px_0px_#00000014] p-6">
          <p className="text-gray-600 text-sm mb-2">Estimated cost</p>
          <p className="text-4xl font-bold text-gray-900">${totalEstimated}</p>
        </div>
        <div className="bg-white rounded-2xl text-center shadow-[4px_4px_54px_0px_#00000014] p-6">
          <p className="text-gray-600 text-sm mb-2">Actual cost</p>
          <p className="text-4xl font-bold text-gray-900">${totalActual}</p>
        </div>
        <div className="bg-white rounded-2xl text-center shadow-[4px_4px_54px_0px_#00000014] p-6">
          <p className="text-gray-600 text-sm mb-2">Paid</p>
          <p className="text-4xl font-bold text-gray-900">${totalPaid}</p>
        </div>
      </div>

      {/* Tabs */}

      {/* Categories Section */}
      <div className="p-6 bg-gray-50 rounded-2xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgetItems.map((item) => (
            <BudgetCard
              key={item.id}
              item={item}
              onEdit={() => handleEditClick(item)}
              onDelete={() => handleDeleteBudget(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Sheets */}
      <AddBudgetSheet
        isOpen={isAddBudgetOpen}
        onClose={() => setIsAddBudgetOpen(false)}
        onAdd={handleAddBudget}
      />

      {selectedItem && (
        <EditBudgetSheet
          isOpen={isEditBudgetOpen}
          onClose={() => {
            setIsEditBudgetOpen(false);
            setSelectedItem(null);
          }}
          item={selectedItem}
          onSave={handleEditBudget}
        />
      )}

      <BudgetExportSheet
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        budgetItems={budgetItems}
        eventBudget={eventBudget}
        totalEstimated={totalEstimated}
        totalActual={totalActual}
        totalPaid={totalPaid}
      />
    </div>
  );
}
