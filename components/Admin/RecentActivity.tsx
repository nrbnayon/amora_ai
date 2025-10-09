// components/admin/RecentActivity.tsx
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Activity {
  id: string;
  name: string;
  action: string;
  time: string;
  avatar: string;
}

const activities: Activity[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    action: "Created a new wedding plan.",
    time: "2 hours ago",
    avatar: "/user.png",
  },
  {
    id: "2",
    name: "Michael Brown",
    action: "Made a payment of $2500.",
    time: "Tuesday 2:00 PM",
    avatar: "/user.png",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    action: "Created a new wedding plan.",
    time: "2 hours ago",
    avatar: "/user.png",
  },
  {
    id: "4",
    name: "Michael Brown",
    action: "Made a payment of $2500.",
    time: "Tuesday 2:00 PM",
    avatar: "/user.png",
  },
  {
    id: "5",
    name: "Sarah Johnson",
    action: "Created a new wedding plan.",
    time: "2 hours ago",
    avatar: "/user.png",
  },
  {
    id: "6",
    name: "Michael Brown",
    action: "Made a payment of $2500.",
    time: "Tuesday 2:00 PM",
    avatar: "/user.png",
  },
  {
    id: "7",
    name: "Sarah Johnson",
    action: "Created a new wedding plan.",
    time: "2 hours ago",
    avatar: "/user.png",
  },
];

export function RecentActivity() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedActivities = activities.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`w-8 h-8 rounded border ${
              currentPage === i
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300 hover:border-primary"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className={`w-8 h-8 rounded border ${
            currentPage === 1
              ? "bg-primary text-white border-primary"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        pages.push(
          <span key='dots1' className='px-2'>
            ...
          </span>
        );
      }

      if (currentPage > 2 && currentPage < totalPages - 1) {
        pages.push(
          <button
            key={currentPage}
            className='w-8 h-8 rounded border bg-primary text-white border-primary'
          >
            {currentPage}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <span key='dots2' className='px-2'>
            ...
          </span>
        );
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={`w-8 h-8 rounded border ${
            currentPage === totalPages
              ? "bg-primary text-white border-primary"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-6 ">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Recent Activity
      </h3>

      <div className="space-y-4 ">
        {displayedActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 shadow-sm bg-white p-3 rounded-md border hover:shadow-lg transition-shadow hover:border-primary"
          >
            <div className="w-10 h-10 rounded-full border bg-gray-200 flex-shrink-0 flex items-center justify-center">
              <Image
                src={activity.avatar}
                alt={activity.name.charAt(0)}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {activity.name}
              </p>
              <p className="text-sm text-gray-600">{activity.action}</p>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {activity.time}
            </span>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded border border-gray-300 bg-white flex items-center justify-center hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {renderPageNumbers()}

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded border border-gray-300 bg-white flex items-center justify-center hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
