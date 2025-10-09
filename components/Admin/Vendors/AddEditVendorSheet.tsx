// components/Admin/Vendors/AddEditVendorSheet.tsx
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Vendor } from "@/lib/types";

interface AddEditVendorSheetProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor | null;
  onSave: (vendor: Vendor) => void;
}

const categories = ["Venue", "Florist", "Catering", "Photography", "Other"];

export function AddEditVendorSheet({
  isOpen,
  onClose,
  vendor,
  onSave,
}: AddEditVendorSheetProps) {
  const [formData, setFormData] = useState<Vendor>({
    id: "",
    name: "",
    category: "Venue",
    email: "",
    location: "",
    phone: "",
    website: "",
    status: "Active",
    images: [],
    fullDescription: "",
    guestCapacity: "",
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (vendor) {
      setFormData(vendor);
      setUploadedImages(vendor.images || []);
    } else {
      setFormData({
        id: "",
        name: "",
        category: "Venue",
        email: "",
        location: "",
        phone: "",
        website: "",
        status: "Active",
        images: [],
        fullDescription: "",
        guestCapacity: "",
      });
      setUploadedImages([]);
    }
    setErrors({});
  }, [vendor, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Vendor name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.fullDescription.trim())
      newErrors.fullDescription = "Description is required";
    if (formData.category === "Venue" && !formData.guestCapacity?.trim()) {
      newErrors.guestCapacity = "Guest capacity is required for venues";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => {
        const reader = new FileReader();
        let imageUrl = "";
        reader.onload = (event) => {
          imageUrl = event.target?.result as string;
          setUploadedImages((prev) => [...prev, imageUrl]);
        };
        reader.readAsDataURL(file);
        return file;
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updatedVendor: Vendor = {
      ...formData,
      images: uploadedImages.length > 0 ? uploadedImages : formData.images,
    };

    onSave(updatedVendor);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:min-w-3xl bg-primary text-white overflow-y-auto gap-0">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-semibold text-white">
              {vendor ? "Edit vendor" : "Add vendor"}
            </SheetTitle>
            <button
              onClick={onClose}
              className="text-white hover:text-white/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 min-h-fit text-black"
        >
          <div className="space-y-6">
            {/* Vendor Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Vendor Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Sea Pearl Beach Resort"
                className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Contact Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Phone <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="000-0000-000"
                className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Link */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Link 
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://example.com/"
                className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.website ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.website && (
                <p className="text-red-600 text-sm mt-1">{errors.website}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Location <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="145 East 39th Street, NY, 10016"
                className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.location ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.location && (
                <p className="text-red-600 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            {/* Guest Capacity */}
            {formData.category === "Venue" && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Guest Capacity <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="guestCapacity"
                  value={formData.guestCapacity || ""}
                  onChange={handleInputChange}
                  placeholder="100-150"
                  className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.guestCapacity ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.guestCapacity && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.guestCapacity}
                  </p>
                )}
              </div>
            )}

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Category <span className="text-red-600">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                placeholder="Sea Pearl Beach Resort & Spa is located on Inani beach, Cox's Bazar..."
                rows={4}
                className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                  errors.fullDescription ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.fullDescription && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.fullDescription}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Add Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-sm p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-gray-700 font-medium">
                      Drop, Upload or Paste Images
                    </p>
                    <p className="text-gray-500 text-sm">
                      Supported formats: JPG, PNG
                    </p>
                  </div>
                </label>
              </div>

              {/* Uploaded Images Preview */}
              {uploadedImages.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    Uploaded Images ({uploadedImages.length})
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Uploaded ${index + 1}`}
                          className="w-full h-24 object-cover rounded-sm"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1 py-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-2"
              >
                {vendor ? "Update" : "Add Event"}
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
