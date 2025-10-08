// components/admin/RevenueChart.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jul", revenue: 3000 },
  { month: "Aug", revenue: 5000 },
  { month: "Sept", revenue: 2800 },
  { month: "Oct", revenue: 8500 },
];

export function RevenueChart() {
  return (
    <div className='bg-white rounded-2xl shadow-sm p-6 border border-gray-100'>
      <h3 className='text-lg font-semibold text-gray-900 mb-6'>
        Revenue Overview
      </h3>
      <ResponsiveContainer width='100%' height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
          <XAxis
            dataKey='month'
            stroke='#999'
            tick={{ fill: "#666", fontSize: 12 }}
          />
          <YAxis
            stroke='#999'
            tick={{ fill: "#666", fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Line
            type='monotone'
            dataKey='revenue'
            stroke='#7c3aed'
            strokeWidth={3}
            dot={{ fill: "#7c3aed", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
