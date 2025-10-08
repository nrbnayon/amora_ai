// components/admin/AdminDashboardPage.tsx
"use client";
import React from "react";
import { PageHeader } from "../common/PageHeader";
import { StatCard } from "../common/StatCard";
import { RevenueChart } from "./RevenueChart";
import { AIUsageChart } from "./AIUsageChart";
import { RecentActivity } from "./RecentActivity";
import { Users, DollarSign, Sparkles, Store } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className='w-full mx-auto px-4 sm:px-6 lg:px-8 py-6'>
      <PageHeader
        title='Admin Dashboard'
        subtitle='Overview of customers, vendors, finances and AI usage'
      />

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6'>
        <StatCard
          title='Active Weddings'
          value='1,689'
          trend={{
            value: "8.3%",
            isPositive: true,
            text: "Up from last month",
          }}
          icon={Users}
          iconBgColor='bg-purple-100'
          iconColor='text-purple-600'
        />

        <StatCard
          title='Monthly Revenue'
          value='$89,000'
          trend={{
            value: "4.3%",
            isPositive: false,
            text: "Down vs last month",
          }}
          icon={DollarSign}
          iconBgColor='bg-red-100'
          iconColor='text-red-600'
        />

        <StatCard
          title='AI Interactions'
          value='10,293'
          trend={{
            value: "1.3%",
            isPositive: true,
            text: "Up from last month",
          }}
          icon={Sparkles}
          iconBgColor='bg-yellow-100'
          iconColor='text-yellow-600'
        />

        <StatCard
          title='Active Vendors'
          value='40'
          trend={{
            value: "1.8%",
            isPositive: true,
            text: "Up from last month",
          }}
          icon={Store}
          iconBgColor='bg-orange-100'
          iconColor='text-orange-600'
        />
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
        <RevenueChart />
        <AIUsageChart />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}
