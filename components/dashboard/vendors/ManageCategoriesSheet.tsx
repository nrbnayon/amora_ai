// components/vendors/ManageCategoriesSheet.tsx
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ManageCategoriesSheetProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategories: string[];
  onUpdateCategories: (categories: string[]) => void;
}

export function ManageCategoriesSheet({
  isOpen,
  onClose,
  categories,
  selectedCategories,
  onUpdateCategories,
}: ManageCategoriesSheetProps) {
  const [tempSelected, setTempSelected] =
    useState<string[]>(selectedCategories);

  const toggleCategory = (category: string) => {
    setTempSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleDone = () => {
    onUpdateCategories(tempSelected);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:min-w-3xl bg-primary text-white overflow-y-auto gap-0">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-semibold text-white">
              Manage vendor categories
            </SheetTitle>
            <button
              onClick={onClose}
              className="text-white hover:text-white/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </SheetHeader>

        <div className="bg-white p-6 min-h-fit space-y-6">
          <p className="text-sm text-gray-600 mb-4">
            Selected categories will have vendor recommendations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-colors bg-white hover:bg-gray-50 border border-gray-200"
              >
                <input
                  type="checkbox"
                  checked={tempSelected.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="w-5 h-5 accent-primary"
                />
                <span className="font-medium text-gray-900">{category}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              size="lg"
              onClick={handleDone}
              className="bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
            >
              Done
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
