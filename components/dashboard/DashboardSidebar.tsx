// components/dashboard/DashboardSidebar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  CheckCircle,
  Store,
  Wallet,
  Users,
  Sparkles,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    name: "My Wedding",
    href: "/dashboard",
    icon: LayoutGrid,
  },
  {
    name: "Event List",
    href: "/dashboard/event-list",
    icon: CheckCircle,
  },
  {
    name: "Vendors",
    href: "/dashboard/vendors",
    icon: Store,
  },
  {
    name: "Budget Distribution",
    href: "/dashboard/budget",
    icon: Wallet,
  },
  {
    name: "Guests & Seating",
    href: "/dashboard/guests",
    icon: Users,
  },
  {
    name: "Assistant",
    href: "/dashboard/assistant",
    icon: Sparkles,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`
        ${isOpen ? "w-64" : "w-20"} 
        bg-white border-r border-gray-200 min-h-screen 
        transition-all duration-300 ease-in-out relative
        flex flex-col
      `}
    >
      {/* Toggle Button - Center Right Border */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-10 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1.5 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-md z-50"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {/* Logo */}
          {isOpen ? (
            <h1 className="text-2xl font-bold text-primary">Amora AI</h1>
          ) : (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">A</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group relative flex items-center gap-3 px-3 py-3 rounded-md
                transition-all duration-200
                ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-gray-600 hover:bg-primary/50 hover:text-gray-900"
                }
              `}
              title={!isOpen ? item.name : ""}
            >
              <div
                className={`
                flex items-center justify-center
                ${!isOpen ? "mx-auto" : ""}
              `}
              >
                <Icon
                  className={`
                  w-5 h-5 flex-shrink-0
                  ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 group-hover:text-gray-900"
                  }
                `}
                />
              </div>

              {isOpen && (
                <span className="font-medium text-[15px] whitespace-nowrap">
                  {item.name}
                </span>
              )}

              {/* Tooltip for collapsed state */}
              {!isOpen && (
                <div
                  className="
                  absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm
                  rounded-lg opacity-0 pointer-events-none group-hover:opacity-100
                  transition-opacity duration-200 whitespace-nowrap z-50
                "
                >
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
