// app\(dashboard)\dashboard\page.tsx
import React from "react";
import { WelcomeModal } from "@/components/dashboard/welcome-modal";
import DashboardPage from "@/components/dashboard/DashboardPage";

export default function page() {
  return (
    <div>
      <WelcomeModal />
      <DashboardPage />
    </div>
  );
}
