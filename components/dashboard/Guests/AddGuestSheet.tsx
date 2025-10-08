// components/guests/AddGuestSheet.tsx
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Guest, Table } from "./GuestsSeatingPage";

interface AddGuestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (guest: Omit<Guest, "id">) => void;
  tables: Table[];
}

export function AddGuestSheet({
  isOpen,
  onClose,
  onAdd,
  tables,
}: AddGuestSheetProps) {
  const [formData, setFormData] = useState({
    name: "",
    group: "Groom" as "Bride" | "Groom",
    email: "",
    address: "",
    phone: "",
    dietary: "",
    status: "Pending" as "Attending" | "Pending" | "Declined",
    assignedTable: "Select",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    address: false,
    phone: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !formData.email.includes("@"),
      address: !formData.address.trim(),
      phone: !formData.phone.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAdd(formData);
      setFormData({
        name: "",
        group: "Groom",
        email: "",
        address: "",
        phone: "",
        dietary: "",
        status: "Pending",
        assignedTable: "Select",
      });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      group: "Groom",
      email: "",
      address: "",
      phone: "",
      dietary: "",
      status: "Pending",
      assignedTable: "Select",
    });
    setErrors({
      name: false,
      email: false,
      address: false,
      phone: false,
    });
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:min-w-3xl bg-primary text-white overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-semibold text-white">
              Add Guest
            </SheetTitle>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </SheetHeader>

        <div className="bg-white text-black p-5 min-h-fit md:min-h-screen space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jack"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Group <span className="text-red-500">*</span>
            </label>
            <select
              name="group"
              value={formData.group}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Groom">Groom</option>
              <option value="Bride">Bride</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="884 Baker Street, Miami, FL"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="000-0000-000"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Dietary <span className="text-red-500">*</span>
            </label>
            <select
              name="dietary"
              value={formData.dietary}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select dietary preference</option>
              <option value="None">None</option>
              <option value="Vegan">Vegan</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Gluten-free">Gluten-free</option>
              <option value="Dairy-free">Dairy-free</option>
              <option value="Halal">Halal</option>
              <option value="Kosher">Kosher</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Pending">Pending</option>
              <option value="Attending">Attending</option>
              <option value="Declined">Declined</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Assigned Table
            </label>
            <select
              name="assignedTable"
              value={formData.assignedTable}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Select">Select</option>
              {tables.map((table) => (
                <option key={table.id} value={table.name}>
                  {table.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex justify-end bg-white">
            <Button
              size="lg"
              onClick={handleSubmit}
              className="bg-primary text-white hover:bg-primary/90 px-8"
            >
              Add Guest
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
