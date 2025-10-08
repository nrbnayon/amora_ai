// components/vendors/VendorDetailsSheet.tsx
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X, Bookmark, MapPin, Mail, Phone, Globe } from "lucide-react";
import { Vendor } from "./VendorsPage";

interface VendorDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export function VendorDetailsSheet({
  isOpen,
  onClose,
  vendor,
  isSaved,
  onToggleSave,
}: VendorDetailsSheetProps) {
  const [mainImage, setMainImage] = useState(vendor.images[0]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:min-w-3xl bg-primary text-white overflow-y-auto gap-0">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-semibold text-white">
              Vendor Details
            </SheetTitle>
            <button
              onClick={onClose}
              className="text-white hover:text-white/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </SheetHeader>

        <div className="bg-white p-6 min-h-fit md:min-h-screen">
          {/* Image Gallery */}
          <div className="space-y-3 mb-6">
            {vendor.images.length === 1 ? (
              // ✅ Single image: show full width
              <div>
                <img
                  src={vendor.images[0]}
                  alt={vendor.name}
                  className="w-full h-[400px] object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-primary/50 transition-all"
                />
              </div>
            ) : (
              <>
                {/* Top Section: Main Image + Right Side Images */}
                <div className="flex gap-3">
                  {/* Main Center Image */}
                  <div className="flex-[3]">
                    <img
                      src={mainImage}
                      alt={vendor.name}
                      className="w-full h-[400px] object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-primary/50 transition-all"
                    />
                  </div>

                  {/* Right Side Vertical Images (2, 3, 4) */}
                  <div className="flex-1 flex flex-col gap-3">
                    {vendor.images.slice(1, 4).map((image, index) => (
                      <div
                        key={index}
                        className="flex-1 cursor-pointer"
                        onClick={() => setMainImage(image)}
                      >
                        <img
                          src={image}
                          alt={`${vendor.name} ${index + 2}`}
                          className={`w-full h-full object-cover rounded-lg hover:opacity-80 transition-all ${
                            mainImage === image
                              ? "ring-2 ring-primary"
                              : "ring-1 ring-gray-200"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Section: Additional Images (5+) */}
                {vendor.images.length > 4 && (
                  <div className="grid grid-cols-4 gap-3">
                    {vendor.images.slice(4).map((image, index) => (
                      <div
                        key={index + 4}
                        className="cursor-pointer"
                        onClick={() => setMainImage(image)}
                      >
                        <img
                          src={image}
                          alt={`${vendor.name} ${index + 5}`}
                          className={`w-full h-[120px] object-cover rounded-lg hover:opacity-80 transition-all ${
                            mainImage === image
                              ? "ring-2 ring-primary"
                              : "ring-1 ring-gray-200"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Vendor Info */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h2 className="text-3xl font-semibold text-gray-900">
                {vendor.name}
              </h2>
              <button
                onClick={() => onToggleSave(vendor.id)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Bookmark
                  className="w-6 h-6"
                  fill={isSaved ? "#E91E63" : "none"}
                  stroke={isSaved ? "#E91E63" : "#000000"}
                  strokeWidth={2}
                />
              </button>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {vendor.fullDescription}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{vendor.location}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-primary" />
                <span>{vendor.email}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-primary" />
                <span>{vendor.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Globe className="w-5 h-5 text-primary" />
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {vendor.website}
                </a>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
