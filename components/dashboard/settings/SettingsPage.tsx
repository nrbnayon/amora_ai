// components/settings/SettingsPage.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { UpdateUsernameSheet } from "./UpdateUsernameSheet";
import { UpdatePasswordSheet } from "./UpdatePasswordSheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function SettingsPage() {
  const router = useRouter();
  const [isUsernameSheetOpen, setIsUsernameSheetOpen] = useState(false);
  const [isPasswordSheetOpen, setIsPasswordSheetOpen] = useState(false);
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: "John Doe",
    email: "example@gmail.com",
    password: "**************",
  });

  const handleUpdateUsername = (newUsername: string) => {
    setUserData({ ...userData, username: newUsername });
    toast.success("Username updated successfully");
  };

  const handleUpdatePassword = () => {
    toast.success("Password updated successfully");
  };

  const handleSignOutClick = () => {
    setIsSignOutDialogOpen(true);
  };

  const handleConfirmSignOut = () => {
    // Clear all cookies using max-age=0 (most reliable method)
    document.cookie = "accessToken=; path=/; max-age=0;";
    document.cookie = "userRole=; path=/; max-age=0;";

    toast.success("Signed out successfully");
    setIsSignOutDialogOpen(false);

    // Small delay to ensure cookies are cleared before redirect
    setTimeout(() => {
      router.push("/");
    }, 100);
  };

  const handleCancelSignOut = () => {
    setIsSignOutDialogOpen(false);
  };

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-center md:justify-between gap-3 border-b pb-3 mb-4">
        <div className="text-center md:text-left">
          <h1 className="text-xl md:text-3xl font-semibold text-gray-900">
            Settings
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Get access to your account
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-xl my-2 md:my-12">
        {/* User image */}
        <div className="w-full flex items-center justify-center my-6">
          <Avatar className="text-center w-40 h-40 rounded-full border mx-auto mb-4">
            <AvatarImage src="/user.png" alt="User Avatar" />
            <AvatarFallback className="bg-gray-200 text-gray-500">
              Nayon
            </AvatarFallback>
          </Avatar>
        </div>

        {/* User Name */}
        <div className="flex items-center justify-between my-2">
          <label className="text-sm font-medium text-gray-900">User Name</label>
          <button
            onClick={() => setIsUsernameSheetOpen(true)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <SquarePen className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">
          {userData.username}
        </div>

        {/* Email */}
        <div className="my-3">
          <label className="text-sm font-medium text-gray-900 mb-2 block">
            Email
          </label>
          <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">
            {userData.email}
          </div>
        </div>

        {/* Change Password & Sign Out Buttons */}
        <div className="w-full flex flex-col gap-3 items-center justify-between">
          <Button
            onClick={() => setIsPasswordSheetOpen(true)}
            className="w-full flex items-center gap-2"
          >
            <SquarePen className="w-4 h-4 text-white" />
            Change Password
          </Button>
          <Button
            size="lg"
            onClick={handleSignOutClick}
            variant="outline"
            className="w-full border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* Update Sheets */}
      <UpdateUsernameSheet
        isOpen={isUsernameSheetOpen}
        onClose={() => setIsUsernameSheetOpen(false)}
        currentUsername={userData.username}
        onUpdate={handleUpdateUsername}
      />

      <UpdatePasswordSheet
        isOpen={isPasswordSheetOpen}
        onClose={() => setIsPasswordSheetOpen(false)}
        onUpdate={handleUpdatePassword}
      />

      {/* Sign Out Confirmation Dialog */}
      <AlertDialog
        open={isSignOutDialogOpen}
        onOpenChange={setIsSignOutDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out? You will need to sign in again
              to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelSignOut}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmSignOut}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
