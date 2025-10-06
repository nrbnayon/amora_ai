import React from "react";
import { DashboardActions } from "./../../../components/dashboard/dashboard-actions";
import { WelcomeModal } from "@/components/dashboard/welcome-modal";
import DashboardPage from "@/components/dashboard/DashboardPage";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";

export default function page() {
  return (
    <div>
      <WelcomeModal />
      <DashboardPage/>
      <DashboardActions />
      <DashboardCharts />
      <DashboardHeader />
      <DashboardStats />
    </div>
  );
}
