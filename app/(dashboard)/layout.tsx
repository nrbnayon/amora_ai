// app/(dashboard)/layout.tsx
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:px-8 py-3 bg-[#F3F3F3]">
        {children}
      </main>
    </div>
  );
}
