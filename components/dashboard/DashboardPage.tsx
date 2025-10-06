import React from "react";
import { Users, DollarSign, Calendar, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold text-gray-900">My Wedding</h1>
          <div className="flex gap-4">
            <button className="px-4 py-2 text-gray-900 font-medium border-b-2 border-gray-900">
              Dashboard
            </button>
            <button className="px-4 py-2 text-gray-400 font-medium hover:text-gray-600">
              Event Details
            </button>
          </div>
        </div>
        <p className="text-gray-600">
          A clear view of your wedding and upcoming tasks
        </p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Days Until */}
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100">
          <div className="text-6xl font-bold text-gray-900 mb-2">5</div>
          <p className="text-gray-600">Days Until 'I Do'</p>
        </div>

        {/* Planning Progress */}
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100">
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
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Next Action
          </h3>
          <p className="text-gray-600 mb-4">Finalize photographer contract</p>
          <button className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
            Mark as done
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        {/* Guest List */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
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
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-primary" />
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
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-primary" />
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

        <div className="grid grid-cols-3 gap-6">
          {/* Task Completion */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">
              Task Completion
            </h3>
            <div className="flex justify-around items-end">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">10</div>
                <div className="text-sm text-gray-600">To do</div>
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
          </div>

          {/* Budget Split */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">
              Budget Split
            </h3>
            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5d4ed"
                    strokeWidth="20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#7e22ce"
                    strokeWidth="20"
                    strokeDasharray="62.8 251.2"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="20"
                    strokeDasharray="50.24 251.2"
                    strokeDashoffset="-62.8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#c4a5d8"
                    strokeWidth="20"
                    strokeDasharray="37.68 251.2"
                    strokeDashoffset="-113.04"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#7e22ce]"></div>
                <span className="text-sm text-gray-700">Venue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#a855f7]"></div>
                <span className="text-sm text-gray-700">Catering</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#c4a5d8]"></div>
                <span className="text-sm text-gray-700">Decor</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#e5d4ed]"></div>
                <span className="text-sm text-gray-700">Other</span>
              </div>
            </div>
          </div>

          {/* Guest RSVP */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">
              Guest RSVP
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-1">120</div>
                <div className="text-sm text-primary">Accepted</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-1">15</div>
                <div className="text-sm text-gray-600">Declined</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-1">35</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-1">170</div>
                <div className="text-sm text-gray-600">Total Guests</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
