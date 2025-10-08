// components/budget/BudgetCard.tsx
import React from "react";
import { SquarePen } from "lucide-react";
import { BudgetItem } from "./BudgetPage";

interface BudgetCardProps {
  item: BudgetItem;
  onEdit: () => void;
  onDelete: () => void;
}

export function BudgetCard({ item, onEdit }: BudgetCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {item.category}
          </h3>
          <p className="text-sm text-gray-600">{item.vendorName}</p>
        </div>
        <button
          onClick={onEdit}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <SquarePen className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Budget Details */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Estimated</span>
          <span className="text-sm font-semibold text-gray-900">
            ${item.estimated}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Actual</span>
          <span className="text-sm font-semibold text-gray-900">
            ${item.actual}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Paid</span>
          <span className="text-sm font-semibold text-gray-900">
            ${item.paid}
          </span>
        </div>
      </div>
    </div>
  );
}
