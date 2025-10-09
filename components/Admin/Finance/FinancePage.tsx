// components/Admin/Finance/FinancePage.tsx
"use client";
import React from "react";
import { PageHeader } from "../../common/PageHeader";
import { StatCard } from "../../common/StatCard";
import { DataTable, TableColumn } from "../../common/DataTable";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

interface Transaction {
  id: string;
  customer: string;
  date: string;
  amount: string;
  package: "Pro" | "Free";
  status: "Active" | "Inactive";
}

const transactionData: Transaction[] = [
  {
    id: "1",
    customer: "Emily & John",
    date: "14 Sept, 2025",
    amount: "$99",
    package: "Pro",
    status: "Active",
  },
  {
    id: "2",
    customer: "Emily & John",
    date: "14 Sept, 2025",
    amount: "-",
    package: "Free",
    status: "Inactive",
  },
  {
    id: "3",
    customer: "Emily & John",
    date: "14 Sept, 2025",
    amount: "$99",
    package: "Pro",
    status: "Active",
  },
  {
    id: "4",
    customer: "Emily & John",
    date: "14 Sept, 2025",
    amount: "-",
    package: "Free",
    status: "Inactive",
  },
  {
    id: "5",
    customer: "Emily & John",
    date: "14 Sept, 2025",
    amount: "$99",
    package: "Pro",
    status: "Active",
  },
  {
    id: "6",
    customer: "Emily & John",
    date: "14 Sept, 2025",
    amount: "-",
    package: "Free",
    status: "Inactive",
  },
  {
    id: "7",
    customer: "Emily & John",
    date: "14 Sept, 2025",
    amount: "$99",
    package: "Pro",
    status: "Active",
  },
  {
    id: "8",
    customer: "Emily & John",
    date: "14 Sept, 2025",
    amount: "-",
    package: "Free",
    status: "Inactive",
  },
  {
    id: "9",
    customer: "Emily & John",
    date: "14 Sept, 2025",
    amount: "$99",
    package: "Pro",
    status: "Active",
  },
  {
    id: "10",
    customer: "Emily & John",
    date: "14 Sept, 2025",
    amount: "-",
    package: "Free",
    status: "Inactive",
  },
  {
    id: "11",
    customer: "Emily & John",
    date: "14 Sept, 2025",
    amount: "$99",
    package: "Pro",
    status: "Active",
  },
  {
    id: "12",
    customer: "Emily & John",
    date: "14 Sept, 2025",
    amount: "-",
    package: "Free",
    status: "Inactive",
  },
];

const getStatusColor = (status: string) => {
  return status === "Active"
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";
};

export default function FinancePage() {
  const transactionColumns: TableColumn<Transaction>[] = [
    {
      key: "customer",
      label: "Customer",
      align: "left",
    },
    {
      key: "date",
      label: "Date",
      align: "center",
    },
    {
      key: "amount",
      label: "Amount",
      align: "center",
    },
    {
      key: "package",
      label: "Package",
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
      <PageHeader title="Finance" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Monthly Revenue"
          value="$89,000"
          trend={{
            value: "4.3%",
            isPositive: false,
            text: "Down vs last month",
          }}
          icon={DollarSign}
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
          title="Average Purchase Value"
          value="$49"
          trend={{
            value: "8.5%",
            isPositive: true,
            text: "Up from last month",
          }}
          icon={TrendingUp}
          iconBgColor="bg-purple-100"
          iconColor="text-primary"
        />

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
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Recent Transactions
        </h2>

        <DataTable
          data={transactionData}
          columns={transactionColumns}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
}
