// components/budget/EditBudgetSheet.tsx
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BudgetItem } from "./BudgetPage";
import { toast } from "sonner";

interface EditBudgetSheetProps {
  isOpen: boolean;
  onClose: () => void;
  item: BudgetItem;
  onSave: (item: BudgetItem) => void;
}

const categories = [
  "Photographer",
  "Venue",
  "Florist",
  "Catering",
  "Entertainment",
  "Videographer",
  "Attire",
  "Cakes",
  "Decor",
  "Transportation",
];

export function EditBudgetSheet({
  isOpen,
  onClose,
  item,
  onSave,
}: EditBudgetSheetProps) {
  const [formData, setFormData] = useState({
    category: item.category,
    vendorName: item.vendorName,
    estimated: item.estimated.toString(),
    actual: item.actual.toString(),
    paid: item.paid.toString(),
  });

  const [errors, setErrors] = useState({
    category: false,
    vendorName: false,
    estimated: false,
  });

  const [touched, setTouched] = useState({
    category: false,
    vendorName: false,
    estimated: false,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        category: item.category,
        vendorName: item.vendorName,
        estimated: item.estimated.toString(),
        actual: item.actual.toString(),
        paid: item.paid.toString(),
      });
    }
  }, [item]);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: false });
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const validateForm = () => {
    const newErrors = {
      category: !formData.category,
      vendorName: !formData.vendorName.trim(),
      estimated: !formData.estimated || parseFloat(formData.estimated) <= 0,
    };

    setErrors(newErrors);
    setTouched({
      category: true,
      vendorName: true,
      estimated: true,
    });

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields", {
        description: "Category, vendor name, and estimated cost are required.",
      });
      return;
    }

    const updatedItem: BudgetItem = {
      ...item,
      category: formData.category,
      vendorName: formData.vendorName.trim(),
      estimated: parseFloat(formData.estimated),
      actual: formData.actual ? parseFloat(formData.actual) : 0,
      paid: formData.paid ? parseFloat(formData.paid) : 0,
    };

    onSave(updatedItem);
    toast.success("Budget item updated", {
      description: `${formData.category} has been updated successfully.`,
    });
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:min-w-3xl bg-primary text-white overflow-y-auto gap-0">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-semibold text-white">
              Edit Budget
            </SheetTitle>
            <button
              onClick={onClose}
              className="text-white hover:text-white/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </SheetHeader>

        <div className="bg-white p-6 min-h-fit md:min-h-screen space-y-6">
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              onBlur={() => handleBlur("category")}
              className={`w-full px-4 py-3 rounded-lg border ${
                touched.category && errors.category
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              } text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50`}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {touched.category && errors.category && (
              <p className="text-red-500 text-sm mt-1">
                Please select a category
              </p>
            )}
          </div>

          {/* Vendor Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Vendor Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.vendorName}
              onChange={(e) => handleChange("vendorName", e.target.value)}
              onBlur={() => handleBlur("vendorName")}
              className={`w-full px-4 py-3 rounded-lg border ${
                touched.vendorName && errors.vendorName
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              } text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50`}
              placeholder="Enter vendor name"
            />
            {touched.vendorName && errors.vendorName && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a vendor name
              </p>
            )}
          </div>

          {/* Estimated Cost */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Estimated Cost <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.estimated}
              onChange={(e) => handleChange("estimated", e.target.value)}
              onBlur={() => handleBlur("estimated")}
              className={`w-full px-4 py-3 rounded-lg border ${
                touched.estimated && errors.estimated
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              } text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50`}
              placeholder="0.00"
            />
            {touched.estimated && errors.estimated && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid estimated cost
              </p>
            )}
          </div>

          {/* Actual Cost */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Actual Cost
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.actual}
              onChange={(e) => handleChange("actual", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="0.00"
            />
          </div>

          {/* Paid */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Paid
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.paid}
              onChange={(e) => handleChange("paid", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="0.00"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              size="lg"
              onClick={handleSubmit}
              className="bg-primary text-white hover:bg-primary/90"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
