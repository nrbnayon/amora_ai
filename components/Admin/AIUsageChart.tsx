// components/admin/AIUsageChart.tsx
import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Invitation", value: 35, color: "#7B0B4E" },
  { name: "Budget Planning", value: 30, color: "#953C71" },
  { name: "Venue suggestion", value: 20, color: "#C28FAE" },
  { name: "Timeline Creation", value: 15, color: "#D6B3C8" },
];

export function AIUsageChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        AI Usage Statistics
      </h3>
      <div className="flex justify-between items-center flex-col md:flex-row gap-4">
        <div className="w-full">
           <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  style={{
                    filter:
                      activeIndex === index
                        ? "brightness(1.1)"
                        : "brightness(1)",
                    cursor: "pointer",
                  }}
                  stroke={activeIndex === index ? "#fff" : "none"}
                  strokeWidth={activeIndex === index ? 3 : 0}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
       </div>

        <div className="w-full mt-4 ">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-700">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
