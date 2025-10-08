// components/settings/UpdateUsernameSheet.tsx
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

interface UpdateUsernameSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsername: string;
  onUpdate: (newUsername: string) => void;
}

export function UpdateUsernameSheet({
  isOpen,
  onClose,
  currentUsername,
  onUpdate,
}: UpdateUsernameSheetProps) {
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: false, password: false });
  const [touched, setTouched] = useState({ username: false, password: false });

  useEffect(() => {
    if (isOpen) {
      setNewUsername(currentUsername);
      setPassword("");
      setErrors({ username: false, password: false });
      setTouched({ username: false, password: false });
    }
  }, [isOpen, currentUsername]);

  const handleUpdate = () => {
    const newErrors = {
      username: !newUsername.trim(),
      password: !password.trim(),
    };

    setErrors(newErrors);
    setTouched({ username: true, password: true });

    if (Object.values(newErrors).some((error) => error)) {
      toast.error("Please fill in all required fields");
      return;
    }

    onUpdate(newUsername.trim());
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:min-w-3xl bg-primary text-white overflow-y-auto gap-0">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-semibold text-white">
              Update Username
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
          {/* New Username */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              New user name
            </label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => {
                setNewUsername(e.target.value);
                setErrors({ ...errors, username: false });
              }}
              onBlur={() => setTouched({ ...touched, username: true })}
              className={`w-full px-4 py-3 rounded-lg border ${
                touched.username && errors.username
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              } text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50`}
              placeholder="John doe"
            />
            {touched.username && errors.username && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a username
              </p>
            )}
          </div>

          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Confirm with your current password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: false });
              }}
              onBlur={() => setTouched({ ...touched, password: true })}
              className={`w-full px-4 py-3 rounded-lg border ${
                touched.password && errors.password
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              } text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50`}
              placeholder="Enter password"
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm mt-1">
                Please enter your password
              </p>
            )}
          </div>

          {/* Update Button */}
          <div className="flex justify-end pt-4">
            <Button
              size="lg"
              onClick={handleUpdate}
              className="bg-primary text-white hover:bg-primary/90"
            >
              Update
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
