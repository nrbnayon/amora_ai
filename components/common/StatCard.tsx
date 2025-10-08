// components/common/StatCard.tsx
import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
    text: string;
  };
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
}

export function StatCard({
  title,
  value,
  trend,
  icon: Icon,
  iconBgColor,
  iconColor,
}: StatCardProps) {
  return (
    <div className='bg-white rounded-2xl shadow-sm p-6 border border-gray-100'>
      <div className='flex items-start justify-between mb-4'>
        <div>
          <p className='text-sm text-gray-600 mb-1'>{title}</p>
          <h3 className='text-2xl md:text-3xl font-bold text-gray-900'>
            {value}
          </h3>
        </div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBgColor}`}
        >
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>

      {trend && (
        <div className='flex items-center gap-1'>
          <span
            className={`text-sm font-medium ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "↑" : "↓"} {trend.value}
          </span>
          <span className='text-xs text-gray-500'>{trend.text}</span>
        </div>
      )}
    </div>
  );
}
