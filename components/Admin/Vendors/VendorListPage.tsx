// components/Admin/Vendors/VendorListPage.tsx
"use client";
import React, { useState } from "react";
import { PageHeader } from "../../common/PageHeader";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  Edit,
  Plus,
} from "lucide-react";
import { AddEditVendorSheet } from "./AddEditVendorSheet";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DeleteModal } from "@/components/common/DeleteModal";
import { VendorDetailsSheet } from "@/components/dashboard/vendors/VendorDetailsSheet";
import { Vendor } from "@/lib/types";


const initialVendors: Vendor[] = [
  {
    id: "1",
    name: "Sea Pearl Resort",
    category: "Venue",
    email: "example@gmail.com",
    location: "Downtown, NY",
    phone: "000-0000-000",
    website: "https://example.com/",
    status: "Active",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1571003123894-169f06b47b1b?w=400",
      "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=300",
      "https://images.unsplash.com/photo-1519681393784-afc1bcb81334?w=300",
    ],
    fullDescription:
      "Sea Pearl Beach Resort & Spa is located on Inani beach, Cox's Bazar with lush green hills rise from the east and endless sea stretching on the west, the resort offers panoramic visuals of Bay of Bengal. Nestled in the heart of nature along the world's longest natural sandy beach, the resort is spread over 15 acres, located 40 minutes away from the hustle of the Cox's Bazar city with easy accessibility to all the major tourist.",
    guestCapacity: "100-150",
  },
  {
    id: "2",
    name: "Eleen Florist",
    category: "Florist",
    email: "example@gmail.com",
    location: "Downtown, NY",
    phone: "000-0000-000",
    website: "https://example.com/",
    status: "Inactive",
    images: ["https://images.unsplash.com/photo-1561092036-0d3fee221d1f?w=800"],
    fullDescription:
      "Professional florist services specializing in wedding arrangements and event decoration.",
  },
  {
    id: "3",
    name: "Lucky Star Hotel",
    category: "Venue",
    email: "example@gmail.com",
    location: "Downtown, NY",
    phone: "000-0000-000",
    website: "https://example.com/",
    status: "Active",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    ],
    fullDescription: "Luxury hotel venue with state-of-the-art facilities.",
    guestCapacity: "200-300",
  },
  {
    id: "4",
    name: "Premium Catering",
    category: "Catering",
    email: "example@gmail.com",
    location: "Downtown, NY",
    phone: "000-0000-000",
    website: "https://example.com/",
    status: "Inactive",
    images: ["https://images.unsplash.com/photo-1555444333-4a0b6f9f7d9f?w=800"],
    fullDescription: "Premium catering services for weddings and events.",
  },
  {
    id: "5",
    name: "Pro Photographers",
    category: "Photography",
    email: "example@gmail.com",
    location: "Downtown, NY",
    phone: "000-0000-000",
    website: "https://example.com/",
    status: "Active",
    images: [
      "https://images.unsplash.com/photo-1502634297039-c90a73cb7d3d?w=800",
    ],
    fullDescription:
      "Professional photography and videography services for wedding events.",
  },
  {
    id: "6",
    name: "Floral Dreams",
    category: "Florist",
    email: "example@gmail.com",
    location: "Downtown, NY",
    phone: "000-0000-000",
    website: "https://example.com/",
    status: "Active",
    images: ["https://images.unsplash.com/photo-1561092036-0d3fee221d1f?w=800"],
    fullDescription: "Creative floral arrangements and decoration services.",
  },
];

export default function VendorListPage() {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedVendors, setSavedVendors] = useState<string[]>([]);

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = useState(false);
  const [isAddEditSheetOpen, setIsAddEditSheetOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(vendors.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedVendors = vendors.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  // Modal handlers
  const handleViewDetails = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setEditingVendor(null);
    setIsDetailsSheetOpen(true);
  };

  const handleAddVendor = () => {
    setEditingVendor(null);
    setSelectedVendor(null);
    setIsAddEditSheetOpen(true);
  };

  const handleEditVendor = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setSelectedVendor(null);
    setIsAddEditSheetOpen(true);
  };

  const handleDeleteClick = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedVendor) {
      setVendors(vendors.filter((v) => v.id !== selectedVendor.id));
      setSavedVendors(savedVendors.filter((id) => id !== selectedVendor.id));
      toast.success("Vendor deleted successfully", {
        description: `${selectedVendor.name} has been removed from the system.`,
      });
    }
    setIsDeleteModalOpen(false);
    setSelectedVendor(null);
  };

  const handleSaveVendor = (vendor: Vendor) => {
    if (editingVendor) {
      // Update existing vendor
      setVendors(vendors.map((v) => (v.id === vendor.id ? vendor : v)));
      toast.success("Vendor updated successfully", {
        description: `${vendor.name}'s information has been updated.`,
      });
    } else {
      // Add new vendor
      const newVendor = {
        ...vendor,
        id: Date.now().toString(),
      };
      setVendors([...vendors, newVendor]);
      toast.success("Vendor added successfully", {
        description: `${newVendor.name} has been added to the system.`,
      });
    }
    setIsAddEditSheetOpen(false);
    setEditingVendor(null);
  };

  const handleToggleSave = (id: string) => {
    setSavedVendors((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
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
        <span key="dots" className="px-2">
          ...
        </span>
      );
    }

    if (totalPages > 2) {
      pages.push(
        <button
          key={9}
          onClick={() => setCurrentPage(9)}
          className="w-8 h-8 rounded border bg-white text-gray-700 border-gray-300 hover:border-primary"
        >
          9
        </button>
      );

      pages.push(
        <button
          key={10}
          onClick={() => setCurrentPage(10)}
          className="w-8 h-8 rounded border bg-white text-gray-700 border-gray-300 hover:border-primary"
        >
          10
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader title="Vendors" />

      <div className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Partner Vendors
          </h2>

          <Button
            onClick={handleAddVendor}
            className="flex items-center gap-2 bg-primary text-white rounded-sm p-2 md:px-4 md:py-2"
          >
            <Plus className="w-4 h-4" />
            Add Vendor
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Vendor Name
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Category
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Email
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Location
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
              {displayedVendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 text-gray-900">{vendor.name}</td>
                  <td className="py-4 px-6 text-gray-600">{vendor.category}</td>
                  <td className="py-4 px-6 text-gray-600">{vendor.email}</td>
                  <td className="py-4 px-6 text-gray-600">{vendor.location}</td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-sm text-sm font-medium ${getStatusColor(
                        vendor.status ?? ""
                      )}`}
                    >
                      {vendor.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(vendor)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5 text-purple-600" />
                      </button>
                      <button
                        onClick={() => handleEditVendor(vendor)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Vendor"
                      >
                        <Edit className="w-5 h-5 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(vendor)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Delete Vendor"
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

      {/* Modals and Sheets */}
      {selectedVendor && (
        <>
          <DeleteModal
            title="Delete Vendor"
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedVendor(null);
            }}
            deleteName={selectedVendor.name}
            onConfirm={handleDeleteConfirm}
          />

          <VendorDetailsSheet
            isOpen={isDetailsSheetOpen}
            onClose={() => {
              setIsDetailsSheetOpen(false);
              setSelectedVendor(null);
            }}
            vendor={selectedVendor}
            isSaved={savedVendors.includes(selectedVendor.id)}
            onToggleSave={handleToggleSave}
          />
        </>
      )}

      <AddEditVendorSheet
        isOpen={isAddEditSheetOpen}
        onClose={() => {
          setIsAddEditSheetOpen(false);
          setEditingVendor(null);
        }}
        vendor={editingVendor}
        onSave={handleSaveVendor}
      />
    </div>
  );
}
