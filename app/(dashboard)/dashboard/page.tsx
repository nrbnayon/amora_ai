import React from "react";
import { DashboardActions } from "./../../../components/dashboard/dashboard-actions";
import { WelcomeModal } from "@/components/dashboard/welcome-modal";

export default function page() {
  return (
    <div>
      <WelcomeModal />
      <DashboardActions />
    </div>
  );
}
