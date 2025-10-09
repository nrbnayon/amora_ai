// components/dashboard/DashboardSidebar.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Users,
  Store,
  Wallet,
  Sparkles,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutGrid,
  },
  {
    name: "Customers",
    href: "/admin/dashboard/customers",
    icon: Users,
  },
  {
    name: "Vendors",
    href: "/admin/dashboard/vendors",
    icon: Store,
  },
  {
    name: "Finance",
    href: "/admin/dashboard/finance",
    icon: Wallet,
  },
  {
    name: "AI Data",
    href: "/admin/dashboard/ai-data",
    icon: Sparkles,
  },
  {
    name: "Settings",
    href: "/admin/dashboard/settings",
    icon: Settings,
  },
];

export default function AdminDashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [manualToggle, setManualToggle] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const minWidth = 84;
  const maxWidth = 400;

  // Check if link is active
  const isLinkActive = useCallback(
    (href: string) => pathname === href,
    [pathname]
  );

  // Handle mouse down for resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setStartWidth(sidebarWidth);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  // Handle resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = e.clientX - startX;
      const newWidth = Math.min(
        Math.max(startWidth + deltaX, minWidth),
        maxWidth
      );

      setSidebarWidth(newWidth);

      if (newWidth <= minWidth + 20) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, startX, startWidth]);

  // Handle manual toggle
  useEffect(() => {
    if (!isResizing && manualToggle) {
      if (open) {
        setSidebarWidth(256);
      } else {
        setSidebarWidth(minWidth);
      }
      setManualToggle(false);
    }
  }, [open, isResizing, manualToggle]);

  const handleToggleClick = () => {
    setManualToggle(true);
    setOpen(!open);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className='lg:hidden fixed top-4 left-4 z-40 bg-white border border-gray-200 rounded-sm p-2 hover:bg-gray-50 shadow-md'
        aria-label='Open menu'
      >
        <Menu className='w-6 h-6 text-gray-600' />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className='hidden lg:flex relative overflow-visible'>
        {/* Sidebar */}
        <aside
          style={{ width: `${sidebarWidth}px` }}
          className={cn(
            "bg-white min-h-screen transition-all duration-300 ease-in-out relative flex flex-col border-r border-gray-100"
          )}
        >
          {/* Header Section */}
          <div className='p-6 border-b border-gray-100'>
            <motion.div
              animate={{
                justifyContent: open ? "flex-start" : "center",
              }}
              className='flex items-center'
            >
              {open ? (
                <h1 className='text-2xl font-bold text-primary'>Amora AI</h1>
              ) : (
                <div className='w-8 h-8 bg-primary rounded-sm flex items-center justify-center'>
                  <span className='text-white font-bold text-sm'>A</span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Navigation Menu */}
          <nav className='flex-1 px-4 py-6 space-y-2 overflow-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isLinkActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 group relative",
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                  title={!open ? item.name : ""}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 flex-shrink-0",
                      isActive ? "text-white" : "text-gray-700"
                    )}
                  />

                  <motion.span
                    animate={{
                      display: open ? "inline-block" : "none",
                      opacity: open ? 1 : 0,
                    }}
                    className='font-medium text-base whitespace-nowrap'
                  >
                    {item.name}
                  </motion.span>

                  {/* Tooltip for collapsed state */}
                  {!open && (
                    <div className='absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50'>
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Resizable Border */}
        <div
          className='w-1 bg-transparent cursor-col-resize hover:bg-primary/20 transition-colors duration-200 relative group'
          onMouseDown={handleMouseDown}
        >
          <div className='absolute inset-0 w-2 -ml-0.5 bg-transparent' />
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
        </div>

        {/* Toggle Button */}
        <button
          onClick={handleToggleClick}
          className={cn(
            "absolute top-4 z-50 cursor-pointer p-2 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200",
            open ? "-right-3" : "-right-3"
          )}
        >
          {open ? (
            <ChevronLeft className='h-4 w-4 text-gray-600' />
          ) : (
            <ChevronRight className='h-4 w-4 text-gray-600' />
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className='absolute top-4 right-4 bg-gray-100 rounded-full p-2 hover:bg-gray-200'
          aria-label='Close menu'
        >
          <X className='w-5 h-5 text-gray-600' />
        </button>

        {/* Header Section */}
        <div className='p-6 border-b border-gray-100'>
          <h1 className='text-2xl font-bold text-primary'>Amora AI</h1>
        </div>

        {/* Navigation Menu */}
        <nav className='flex-1 px-4 py-6 space-y-2 overflow-y-auto'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isLinkActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive ? "text-white" : "text-gray-700"
                  )}
                />
                <span className='font-medium text-base'>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
