// components/guests/SeatingChartSection.tsx
import React from "react";
import { Table, Guest } from "./GuestsSeatingPage";
import Image from "next/image";

interface SeatingChartSectionProps {
  tables: Table[];
  guests: Guest[];
}

export function SeatingChartSection({
  tables,
  guests,
}: SeatingChartSectionProps) {
  const getTableGuestCount = (tableName: string) => {
    return guests.filter(
      (g) => g.assignedTable === tableName && g.status === "Attending"
    ).length;
  };

  return (
    <div className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-3 md:p-6 mb-3 md:mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-3 md:mb-6 text-center">
        Seating Chart
      </h2>
      <div className="grid grid-cols-3 gap-3 md:gap-6">
        {tables.slice(0, 6).map((table) => {
          const guestCount = getTableGuestCount(table.name);
          return (
            <div
              key={table.id}
              className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Image
                src="/table.png"
                alt="table"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <p className="text-md md:text-xl font-semibold text-gray-900 my-1">{table.name}</p>
              <p className="text-sm text-gray-600">
                {guestCount}/{table.capacity} Guests
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}



// // components/guests/SeatingChartSection.tsx
// import React from "react";
// import { Table, Guest } from "./GuestsSeatingPage";
// import Image from "next/image";

// interface SeatingChartSectionProps {
//   tables: Table[];
//   guests: Guest[];
// }

// export function SeatingChartSection({
//   tables,
//   guests,
// }: SeatingChartSectionProps) {
//   const getTableGuestCount = (tableName: string) => {
//     return guests.filter(
//       (g) => g.assignedTable === tableName && g.status === "Attending"
//     ).length;
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-6 mb-6">
//       <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
//         Seating Chart
//       </h2>
//       <div className="grid grid-cols-3 gap-6">
//         {tables.slice(0, 6).map((table) => {
//           const tableGuests = guests.filter(
//             (g) => g.assignedTable === table.name && g.status === "Attending"
//           );
//           return (
//             <div
//               key={table.id}
//               className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-6 hover:shadow-md transition-shadow"
//             >
//               {/* Table Header */}
//               <div className="flex items-center justify-center">
//                 <Image
//                   src="/table.png"
//                   alt="table"
//                   width={32}
//                   height={32}
//                   className="w-8 h-8"
//                 />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 text-center my-1">
//                 {table.name}
//               </h3>
//               <p className="text-sm text-gray-600 text-center mb-4">
//                 {tableGuests.length}/{table.capacity} Guests
//               </p>

//               {/* Guest List */}
//               <div className="space-y-2">
//                 {tableGuests.length > 0 ? (
//                   tableGuests.map((guest) => (
//                     <div
//                       key={guest.id}
//                       className="flex items-center justify-between py-2 px-3  rounded-lg"
//                     >
//                       <span className="text-sm text-gray-900">
//                         {guest.name}
//                       </span>
//                       <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-sm font-medium">
//                         {guest.status}
//                       </span>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-8 text-gray-400 text-sm">
//                     No guests assigned
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
