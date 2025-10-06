import React from "react";
import { DashboardActions } from "./../../../components/dashboard/dashboard-actions";
import { WelcomeModal } from "@/components/dashboard/welcome-modal";
import DashboardPage from "@/components/dashboard/DashboardPage";

export default function page() {
  return (
    <div>
      <WelcomeModal />
      <DashboardPage/>
      {/* <DashboardActions /> */}
    </div>
  );
}
