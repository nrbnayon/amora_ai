// components/vendors/VendorExportSheet.tsx
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Vendor } from "./VendorsPage";
import { toast } from "sonner";

interface VendorExportSheetProps {
  isOpen: boolean;
  onClose: () => void;
  vendors: Vendor[];
}

export function VendorExportSheet({
  isOpen,
  onClose,
  vendors,
}: VendorExportSheetProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [webLink, setWebLink] = useState<string>("");
  const [errors, setErrors] = useState({ format: false });
  const [touched, setTouched] = useState({ format: false });

  const handleFormatChange = (format: string) => {
    setSelectedFormat(format);
    setErrors({ format: false });
    setTouched({ format: true });
  };

  const generateCSV = () => {
    const headers = [
      "Vendor Name",
      "Category",
      "Contact",
      "Location",
      "Email",
      "Website",
    ];
    const rows = vendors.map((vendor) => [
      vendor.name,
      vendor.category,
      vendor.phone,
      vendor.location,
      vendor.email,
      vendor.website,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `vendors-list-${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generatePDF = () => {
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Vendors List</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 40px;
            color: #333;
          }
          h1 { 
            color: #E91E63; 
            margin-bottom: 30px;
            font-size: 32px;
          }
          .vendor { 
            margin-bottom: 30px; 
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            page-break-inside: avoid;
          }
          .vendor h2 { 
            color: #E91E63; 
            margin-top: 0;
            font-size: 24px;
            margin-bottom: 15px;
          }
          .vendor-detail { 
            margin: 10px 0;
            display: flex;
          }
          .vendor-detail strong { 
            min-width: 120px;
            color: #000;
          }
          .vendor-detail span {
            color: #666;
          }
          ${
            webLink
              ? `.web-link { margin-top: 30px; padding: 15px; background: #f5f5f5; border-radius: 5px; }`
              : ""
          }
        </style>
      </head>
      <body>
        <h1>Vendors List</h1>
        ${vendors
          .map(
            (vendor) => `
          <div class="vendor">
            <h2>${vendor.name}</h2>
            <div class="vendor-detail">
              <strong>Category:</strong>
              <span>${vendor.category}</span>
            </div>
            <div class="vendor-detail">
              <strong>Location:</strong>
              <span>${vendor.location}</span>
            </div>
            <div class="vendor-detail">
              <strong>Contact:</strong>
              <span>${vendor.phone}</span>
            </div>
            <div class="vendor-detail">
              <strong>Email:</strong>
              <span>${vendor.email}</span>
            </div>
            <div class="vendor-detail">
              <strong>Website:</strong>
              <span>${vendor.website}</span>
            </div>
          </div>
        `
          )
          .join("")}
        ${
          webLink
            ? `<div class="web-link"><strong>Web Link:</strong> ${webLink}</div>`
            : ""
        }
      </body>
      </html>
    `;

    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, "_blank");

    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 250);
      };
    }
  };

  const generateDOC = () => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Vendors List</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 40px;
          }
          h1 { 
            color: #E91E63; 
            margin-bottom: 30px;
          }
          .vendor { 
            margin-bottom: 30px; 
            padding: 20px;
            border: 1px solid #e0e0e0;
          }
          .vendor h2 { 
            color: #E91E63; 
            margin-top: 0;
          }
          .vendor-detail { 
            margin: 10px 0;
          }
          .vendor-detail strong { 
            min-width: 120px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <h1>Vendors List</h1>
        ${vendors
          .map(
            (vendor) => `
          <div class="vendor">
            <h2>${vendor.name}</h2>
            <div class="vendor-detail">
              <strong>Category:</strong> ${vendor.category}
            </div>
            <div class="vendor-detail">
              <strong>Location:</strong> ${vendor.location}
            </div>
            <div class="vendor-detail">
              <strong>Contact:</strong> ${vendor.phone}
            </div>
            <div class="vendor-detail">
              <strong>Email:</strong> ${vendor.email}
            </div>
            <div class="vendor-detail">
              <strong>Website:</strong> ${vendor.website}
            </div>
          </div>
        `
          )
          .join("")}
        ${
          webLink
            ? `<div style="margin-top: 30px;"><strong>Web Link:</strong> ${webLink}</div>`
            : ""
        }
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff", content], {
      type: "application/msword",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `vendors-list-${Date.now()}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    if (!selectedFormat) {
      setErrors({ format: true });
      setTouched({ format: true });
      toast.error("Please select a format", {
        description: "Choose PDF, CSV, or DOC to export your vendors list.",
      });
      return;
    }

    try {
      switch (selectedFormat) {
        case "PDF":
          generatePDF();
          break;
        case "CSV":
          generateCSV();
          break;
        case "DOC":
          generateDOC();
          break;
        default:
          toast.error("Invalid format selected");
          return;
      }

      toast.success(`Exporting as ${selectedFormat}`, {
        description: "Your vendors list is being prepared for download.",
      });

      setSelectedFormat("");
      setWebLink("");
      setErrors({ format: false });
      setTouched({ format: false });
      onClose();
    } catch (error) {
      toast.error("Export failed", {
        description:
          "There was an error exporting your vendors list. Please try again.",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:min-w-3xl bg-primary text-white overflow-y-auto gap-0">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-semibold text-white">
              Export as
            </SheetTitle>
            <button
              onClick={onClose}
              className="text-white hover:text-white/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </SheetHeader>

        <div className="bg-white p-5 min-h-fit md:min-h-screen space-y-6">
          <div className="text-black">
            <p className="text-sm font-medium mb-4">
              Export Vendor list as <span className="text-red-500">*</span>
            </p>

            <label
              className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-colors mb-3 text-black border ${
                touched.format && errors.format
                  ? "border-red-500 bg-red-50"
                  : "bg-white/10 hover:bg-white/20 border-transparent"
              }`}
            >
              <input
                type="radio"
                name="exportFormat"
                value="PDF"
                checked={selectedFormat === "PDF"}
                onChange={(e) => handleFormatChange(e.target.value)}
                className="w-5 h-5"
              />
              <span className="font-medium">PDF</span>
            </label>

            <label
              className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-colors mb-3 text-black border ${
                touched.format && errors.format
                  ? "border-red-500 bg-red-50"
                  : "bg-white/10 hover:bg-white/20 border-transparent"
              }`}
            >
              <input
                type="radio"
                name="exportFormat"
                value="CSV"
                checked={selectedFormat === "CSV"}
                onChange={(e) => handleFormatChange(e.target.value)}
                className="w-5 h-5"
              />
              <span className="font-medium">CSV</span>
            </label>

            <label
              className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-colors mb-3 text-black border ${
                touched.format && errors.format
                  ? "border-red-500 bg-red-50"
                  : "bg-white/10 hover:bg-white/20 border-transparent"
              }`}
            >
              <input
                type="radio"
                name="exportFormat"
                value="DOC"
                checked={selectedFormat === "DOC"}
                onChange={(e) => handleFormatChange(e.target.value)}
                className="w-5 h-5"
              />
              <span className="font-medium">DOC</span>
            </label>

            {touched.format && errors.format && (
              <p className="text-red-500 text-sm mt-2">
                Please select an export format
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black">
              Web link:
            </label>
            <input
              type="text"
              value={webLink}
              onChange={(e) => setWebLink(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter web link (optional)"
            />
          </div>

          <div className="flex justify-end">
            <Button
              size="lg"
              onClick={handleExport}
              className="bg-primary text-white font-semibold hover:bg-primary/80 transition-colors cursor-pointer"
            >
              Done
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
