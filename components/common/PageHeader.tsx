// components/common/PageHeader.tsx
import React from "react";
import { Bell, User } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showNotification?: boolean;
  showUserMenu?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  showNotification = true,
  showUserMenu = true,
}: PageHeaderProps) {
  return (
    <div className='flex items-center justify-between mb-6 pb-4 border-b border-gray-200'>
      <div>
        <h1 className='text-2xl md:text-3xl font-semibold text-gray-900'>
          {title}
        </h1>
        {subtitle && (
          <p className='text-sm md:text-base text-gray-600'>{subtitle}</p>
        )}
      </div>

      <div className='flex items-center gap-4'>
        {showNotification && (
          <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
            <Bell className='w-5 h-5 text-gray-600' />
          </button>
        )}

        {showUserMenu && (
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center'>
              <User className='w-5 h-5 text-gray-600' />
            </div>
            <div className='hidden md:block'>
              <p className='text-sm font-semibold text-gray-900'>Admin</p>
              <p className='text-xs text-gray-600'>Admin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
