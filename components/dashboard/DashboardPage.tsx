// components\dashboard\DashboardPage.tsx
"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function DashboardPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const budgetData = [
    { name: "Venue", value: 25, color: "#7B0B4E" },
    { name: "Catering", value: 20, color: "#953C71" },
    { name: "Decor", value: 15, color: "#C28FAE" },
    { name: "Other", value: 40, color: "#D6B3C8" },
  ];

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <div className="mb-8 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-4xl font-semibold text-gray-900">
              My Wedding
            </h1>
            <p className="text-gray-600 mb-2">
              A clear view of your wedding and upcoming tasks
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-gray-900 font-medium border-b-2 border-gray-900"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/event-details"
              className="px-4 py-2  text-gray-400 font-medium hover:text-gray-600"
            >
              Event Details
            </Link>
          </div>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Days Until */}
        <div className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-8 flex flex-col items-center justify-center text-center">
          <div className="text-5xl font-semibold text-gray-900 mb-2">5</div>
          <p className="text-primary/80">Days Until 'I Do'</p>
        </div>

        {/* Planning Progress */}
        <div className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-8 flex flex-col items-center justify-center text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Planning Progress
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-primary h-3 rounded-full"
              style={{ width: "65%" }}
            ></div>
          </div>
          <p className="text-gray-600 font-medium">65% Completed</p>
        </div>

        {/* Next Action */}
        <div className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-8 flex flex-col items-center justify-center text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Next Action
          </h3>
          <p className="text-gray-600 mb-4">Finalize photographer contract</p>
          <button className="w-full bg-primary text-white hover:bg-primary/90 transition-colors px-4 py-2 rounded-lg font-medium">
            Mark as done
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        {/* Guest List */}
        <div className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-8 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center">
              <img src="/guest.svg" alt="Guest List" width="32" height="32" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
            Guest List
          </h3>
          <p className="text-gray-600 text-center mb-4 text-sm">
            Track RSVPs and dietary preferences
          </p>
          <button className="w-full text-primary font-semibold hover:underline flex items-center justify-center gap-2">
            Go to Guest List <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Budget */}
        <div className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-8 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center">
              <img src="/budget.svg" alt="Budget" width="32" height="32" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
            Budget
          </h3>
          <p className="text-gray-600 text-center mb-4 text-sm">
            Overview of expenses and balance
          </p>
          <button className="w-full text-primary font-semibold hover:underline flex items-center justify-center gap-2">
            Go to Budget <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-8 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center">
              <img src="/timeline.svg" alt="Timeline" width="32" height="32" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
            Timeline
          </h3>
          <p className="text-gray-600 text-center mb-4 text-sm">
            Organize chart & task list
          </p>
          <button className="w-full text-primary font-semibold hover:underline flex items-center justify-center gap-2">
            Go to Timeline <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Charts & Reports */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Charts & Reports
        </h2>

        <div className="grid grid-cols-3 gap-6 items-start">
          {/* Task Completion */}
          <Card className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-center mb-6">
              Task Completion
            </h3>
            <div className="flex justify-around items-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">10</div>
                <div className="text-sm text-primary">To do</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">0</div>
                <div className="text-sm text-primary">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">0</div>
                <div className="text-sm text-primary">Completed</div>
              </div>
            </div>
          </Card>

          {/* Budget Split - Professional Pie Chart with Recharts */}
          <Card className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">
              Budget Split
            </h3>
            <div className="flex justify-center mb-6">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {budgetData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        style={{
                          filter:
                            activeIndex === index
                              ? "brightness(1.1)"
                              : "brightness(1)",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        stroke={activeIndex === index ? "#fff" : "none"}
                        strokeWidth={activeIndex === index ? 3 : 0}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {budgetData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-sm text-gray-500 ml-auto">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Guest RSVP */}
          <Card className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">
              Guest RSVP
            </h3>
            <div className="flex justify-around items-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-1">120</div>
                <div className="text-sm text-primary">Accepted</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-1">15</div>
                <div className="text-sm text-primary">Declined</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-1">35</div>
                <div className="text-sm text-primary">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-1">170</div>
                <div className="text-sm text-primary">Total Guests</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
