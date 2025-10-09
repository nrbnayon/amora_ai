// components/common/StatCard.tsx
import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

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
    <div className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            {value}
          </h3>
        </div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBgColor}`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-1">
          <span
            className={`text-sm font-medium flex items-center gap-1 ${
              trend.isPositive ? "text-green-600" : "text-primary"
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}{" "}
            {trend.value}
          </span>
          <span className="text-xs text-gray-500">{trend.text}</span>
        </div>
      )}
    </div>
  );
}
