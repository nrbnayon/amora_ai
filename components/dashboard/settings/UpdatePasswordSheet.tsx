// components/settings/UpdatePasswordSheet.tsx
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UpdatePasswordSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export function UpdatePasswordSheet({
  isOpen,
  onClose,
  onUpdate,
}: UpdatePasswordSheetProps) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [touched, setTouched] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
      });
      setTouched({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
      });
    }
  }, [isOpen]);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: false });
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const validateForm = () => {
    const newErrors = {
      currentPassword: !formData.currentPassword.trim(),
      newPassword:
        !formData.newPassword.trim() || formData.newPassword.length < 6,
      confirmPassword:
        !formData.confirmPassword.trim() ||
        formData.confirmPassword !== formData.newPassword,
    };

    setErrors(newErrors);
    setTouched({
      currentPassword: true,
      newPassword: true,
      confirmPassword: true,
    });

    return !Object.values(newErrors).some((error) => error);
  };

  const handleUpdate = () => {
    if (!validateForm()) {
      toast.error("Please check all fields", {
        description: "Make sure all passwords are entered correctly.",
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords don't match", {
        description: "New password and confirmation must be the same.",
      });
      return;
    }

    onUpdate();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:min-w-3xl bg-primary text-white overflow-y-auto gap-0 p-0">
        <SheetHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-semibold text-white">
              Update Password
            </SheetTitle>
            <button
              onClick={onClose}
              className="text-white hover:text-white/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </SheetHeader>

        <div className="bg-white p-6 min-h-screen space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Current password
            </label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
              onBlur={() => handleBlur("currentPassword")}
              className={`w-full px-4 py-3 rounded-lg border ${
                touched.currentPassword && errors.currentPassword
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              } text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50`}
              placeholder="Enter current password"
            />
            {touched.currentPassword && errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                Please enter your current password
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              New password
            </label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              onBlur={() => handleBlur("newPassword")}
              className={`w-full px-4 py-3 rounded-lg border ${
                touched.newPassword && errors.newPassword
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              } text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50`}
              placeholder="Enter new password"
            />
            {touched.newPassword && errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Confirm new password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              className={`w-full px-4 py-3 rounded-lg border ${
                touched.confirmPassword && errors.confirmPassword
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              } text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50`}
              placeholder="Confirm new password"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          {/* Update Button */}
          <Button
            onClick={handleUpdate}
            className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-base font-medium"
            size="lg"
          >
            Update Password
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
