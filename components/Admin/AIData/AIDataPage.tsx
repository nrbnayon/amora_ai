// components/Admin/AIData/AIDataPage.tsx
"use client";
import React from "react";
import { PageHeader } from "../../common/PageHeader";
import { StatCard } from "../../common/StatCard";
import { DataTable, TableColumn } from "../../common/DataTable";
import { Users, Zap, ShoppingCart, Clock } from "lucide-react";

interface AIInteraction {
  id: string;
  customer: string;
  lastUpdate: string;
  interaction: string;
  sessionCount: number;
  status: "Active" | "Inactive";
}

const aiInteractionData: AIInteraction[] = [
  {
    id: "1",
    customer: "Emily & John",
    lastUpdate: "30 Sept, 2025",
    interaction: "Venue Suggestion",
    sessionCount: 27,
    status: "Active",
  },
  {
    id: "2",
    customer: "Emily & John",
    lastUpdate: "30 Sept, 2025",
    interaction: "Event Planning",
    sessionCount: 42,
    status: "Inactive",
  },
  {
    id: "3",
    customer: "Emily & John",
    lastUpdate: "30 Sept, 2025",
    interaction: "Invitation",
    sessionCount: 13,
    status: "Active",
  },
  {
    id: "4",
    customer: "Emily & John",
    lastUpdate: "30 Sept, 2025",
    interaction: "Venue Suggestion",
    sessionCount: 46,
    status: "Inactive",
  },
  {
    id: "5",
    customer: "Emily & John",
    lastUpdate: "30 Sept, 2025",
    interaction: "Event Planning",
    sessionCount: 72,
    status: "Active",
  },
  {
    id: "6",
    customer: "Emily & John",
    lastUpdate: "30 Sept, 2025",
    interaction: "Invitation",
    sessionCount: 67,
    status: "Inactive",
  },
  {
    id: "7",
    customer: "Emily & John",
    lastUpdate: "30 Sept, 2025",
    interaction: "Venue Suggestion",
    sessionCount: 54,
    status: "Active",
  },
  {
    id: "8",
    customer: "Emily & John",
    lastUpdate: "30 Sept, 2025",
    interaction: "Event Planning",
    sessionCount: 38,
    status: "Inactive",
  },
  {
    id: "9",
    customer: "Emily & John",
    lastUpdate: "30 Sept, 2025",
    interaction: "Invitation",
    sessionCount: 78,
    status: "Active",
  },
  {
    id: "10",
    customer: "Emily & John",
    lastUpdate: "30 Sept, 2025",
    interaction: "Venue Suggestion",
    sessionCount: 69,
    status: "Inactive",
  },
  {
    id: "11",
    customer: "Emily & John",
    lastUpdate: "30 Sept, 2025",
    interaction: "Invitation",
    sessionCount: 78,
    status: "Active",
  },
];

const getStatusColor = (status: string) => {
  return status === "Active"
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";
};

export default function AIDataPage() {
  const aiInteractionColumns: TableColumn<AIInteraction>[] = [
    {
      key: "customer",
      label: "Customer",
      align: "left",
    },
    {
      key: "lastUpdate",
      label: "Last Update",
      align: "center",
    },
    {
      key: "interaction",
      label: "Interaction",
      align: "center",
    },
    {
      key: "sessionCount",
      label: "Session Count",
      align: "center",
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (status: string) => (
        <span
          className={`inline-block px-3 py-1 rounded-sm text-sm font-medium ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader title="AI Data" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Active Subscribers"
          value="1,689"
          trend={{
            value: "8.5%",
            isPositive: true,
            text: "Up from last month",
          }}
          icon={Users}
          iconBgColor="bg-purple-100"
          iconColor="text-primary"
        />

        <StatCard
          title="Active Sessions"
          value="1248"
          trend={{
            value: "4.3%",
            isPositive: false,
            text: "Down vs last month",
          }}
          icon={Zap}
          iconBgColor="bg-purple-100"
          iconColor="text-primary"
        />

        <StatCard
          title="AI Purchases"
          value="1,842"
          trend={{
            value: "4.3%",
            isPositive: false,
            text: "Down vs last month",
          }}
          icon={ShoppingCart}
          iconBgColor="bg-purple-100"
          iconColor="text-primary"
        />

        <StatCard
          title="Average Response Time"
          value="1.2s"
          trend={{
            value: "8.5%",
            isPositive: true,
            text: "faster than last month",
          }}
          icon={Clock}
          iconBgColor="bg-purple-100"
          iconColor="text-primary"
        />
      </div>

      {/* AI Interactions */}
      <div className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          AI Interactions
        </h2>

        <DataTable
          data={aiInteractionData}
          columns={aiInteractionColumns}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
}
