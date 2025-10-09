// components/customers/CustomersPage.tsx
"use client";
import React, { useState } from "react";
import { PageHeader } from "../../common/PageHeader";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  Calendar,
  Edit,
} from "lucide-react";
import { CustomerDetailsModal } from "./CustomerDetailsModal";
import { EditCustomerStatusModal } from "./EditCustomerStatusModal";
import { toast } from "sonner";
import { DeleteModal } from "@/components/common/DeleteModal";

interface Customer {
  id: string;
  coupleName: string;
  email: string;
  eventDate: string;
  plan: "Pro" | "Free";
  status: "Active" | "Pending";
}

const initialCustomers: Customer[] = [
  {
    id: "1",
    coupleName: "Annie & John",
    email: "example@gmail.com",
    eventDate: "29 Aug 2025",
    plan: "Pro",
    status: "Active",
  },
  {
    id: "2",
    coupleName: "Jack & Emily",
    email: "example@gmail.com",
    eventDate: "29 Aug 2025",
    plan: "Free",
    status: "Pending",
  },
  {
    id: "3",
    coupleName: "Annie & John",
    email: "example@gmail.com",
    eventDate: "29 Aug 2025",
    plan: "Pro",
    status: "Active",
  },
  {
    id: "4",
    coupleName: "Annie & John",
    email: "example@gmail.com",
    eventDate: "29 Aug 2025",
    plan: "Free",
    status: "Pending",
  },
  {
    id: "5",
    coupleName: "Annie & John",
    email: "example@gmail.com",
    eventDate: "29 Aug 2025",
    plan: "Pro",
    status: "Active",
  },
  {
    id: "6",
    coupleName: "Annie & John",
    email: "example@gmail.com",
    eventDate: "29 Aug 2025",
    plan: "Free",
    status: "Pending",
  },
  {
    id: "7",
    coupleName: "Annie & John",
    email: "example@gmail.com",
    eventDate: "29 Aug 2025",
    plan: "Pro",
    status: "Active",
  },
  {
    id: "8",
    coupleName: "Annie & John",
    email: "example@gmail.com",
    eventDate: "29 Aug 2025",
    plan: "Free",
    status: "Pending",
  },
  {
    id: "9",
    coupleName: "Annie & John",
    email: "example@gmail.com",
    eventDate: "29 Aug 2025",
    plan: "Pro",
    status: "Active",
  },
  {
    id: "10",
    coupleName: "Annie & John",
    email: "example@gmail.com",
    eventDate: "29 Aug 2025",
    plan: "Free",
    status: "Pending",
  },
  {
    id: "11",
    coupleName: "Annie & John",
    email: "example@gmail.com",
    eventDate: "29 Aug 2025",
    plan: "Free",
    status: "Pending",
  },
  {
    id: "12",
    coupleName: "Annie & John",
    email: "example@gmail.com",
    eventDate: "29 Aug 2025",
    plan: "Pro",
    status: "Active",
  },
  {
    id: "13",
    coupleName: "Annie & John",
    email: "example@gmail.com",
    eventDate: "29 Aug 2025",
    plan: "Pro",
    status: "Active",
  },
  {
    id: "14",
    coupleName: "Annie & John",
    email: "example@gmail.com",
    eventDate: "29 Aug 2025",
    plan: "Free",
    status: "Pending",
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<"Monthly" | "Weekly" | "Yearly">(
    "Monthly"
  );

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCustomers = customers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  };

  // Modal handlers
  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsModalOpen(true);
  };

  const handleEditStatus = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCustomer) {
      setCustomers(customers.filter((c) => c.id !== selectedCustomer.id));
      toast.success("Customer deleted successfully", {
        description: `${selectedCustomer.coupleName} has been removed from the system.`,
      });
    }
    setIsDeleteModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomers(
      customers.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
    );
    toast.success("Customer updated successfully", {
      description: `${updatedCustomer.coupleName}'s information has been updated.`,
    });
  };

  const renderPageNumbers = () => {
    const pages = [];

    pages.push(
      <button
        key={1}
        onClick={() => setCurrentPage(1)}
        className={`w-8 h-8 rounded border ${
          currentPage === 1
            ? "bg-primary text-white border-primary"
            : "bg-white text-gray-700 border-gray-300 hover:border-primary"
        }`}
      >
        1
      </button>
    );

    if (totalPages > 1) {
      pages.push(
        <button
          key={2}
          onClick={() => setCurrentPage(2)}
          className={`w-8 h-8 rounded border ${
            currentPage === 2
              ? "bg-primary text-white border-primary"
              : "bg-white text-gray-700 border-gray-300 hover:border-primary"
          }`}
        >
          2
        </button>
      );
    }

    if (totalPages > 3) {
      pages.push(
        <span key='dots' className='px-2'>
          ...
        </span>
      );
    }

    if (totalPages > 2) {
      pages.push(
        <button
          key={9}
          onClick={() => setCurrentPage(9)}
          className='w-8 h-8 rounded border bg-white text-gray-700 border-gray-300 hover:border-primary'
        >
          9
        </button>
      );

      pages.push(
        <button
          key={10}
          onClick={() => setCurrentPage(10)}
          className='w-8 h-8 rounded border bg-white text-gray-700 border-gray-300 hover:border-primary'
        >
          10
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader title="Customers" />

      <div className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D]  p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Customer Details
          </h2>

          <div className="flex items-center gap-2 bg-gray-50 rounded-sm p-2 md:px-4 md:py-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as "Monthly" | "Weekly" | "Yearly")
              }
              className="bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer"
            >
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Couple Name
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Email
                </th>
                <th className="text-center py-4 px-6 font-semibold text-gray-900">
                  Event Date
                </th>
                <th className="text-center py-4 px-6 font-semibold text-gray-900">
                  Plan
                </th>
                <th className="text-center py-4 px-6 font-semibold text-gray-900">
                  Status
                </th>
                <th className="text-center py-4 px-6 font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 text-gray-900">
                    {customer.coupleName}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{customer.email}</td>
                  <td className="py-4 px-6 text-center text-gray-600">
                    {customer.eventDate}
                  </td>
                  <td className="py-4 px-6 text-center text-gray-600">
                    {customer.plan}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-sm text-sm font-medium ${getStatusColor(
                        customer.status
                      )}`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 ">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(customer)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5 text-purple-600" />
                      </button>
                      <button
                        onClick={() => handleEditStatus(customer)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Status"
                      >
                        <Edit className="w-5 h-5 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(customer)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Delete Customer"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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

      {/* Modals */}
      {selectedCustomer && (
        <>
          <DeleteModal
            title="Delete Customer"
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedCustomer(null);
            }}
            deleteName={selectedCustomer.coupleName}
            onConfirm={handleDeleteConfirm}
          />

          <CustomerDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => {
              setIsDetailsModalOpen(false);
              setSelectedCustomer(null);
            }}
            customer={selectedCustomer}
          />

          <EditCustomerStatusModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedCustomer(null);
            }}
            customer={selectedCustomer}
            onSave={handleUpdateCustomer}
          />
        </>
      )}
    </div>
  );
}
