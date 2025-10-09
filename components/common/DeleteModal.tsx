// components/common/DeleteModal.tsx
import React from "react";
import { X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  deleteName: string;
  onConfirm: () => void;
  title?: string;
}

export function DeleteModal({
  isOpen,
  onClose,
  deleteName,
  onConfirm,
  title = "Delete Item",
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-red-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-gray-700 mb-2">
              Are you sure you want to delete{" "}
              <span className="text-red-600 font-semibold">{deleteName}</span>?
            </p>
            <p className="text-sm text-gray-500">
              `This action cannot be undone. This data will be permanently
              removed.`
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1 py-2">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
