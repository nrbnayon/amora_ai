// components/guests/GuestsExportSheet.tsx
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Guest, Table } from "./GuestsSeatingPage";
import { toast } from "sonner";

interface GuestsExportSheetProps {
  isOpen: boolean;
  onClose: () => void;
  guests: Guest[];
  tables: Table[];
}

export function GuestsExportSheet({
  isOpen,
  onClose,
  guests,
  tables,
}: GuestsExportSheetProps) {
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
      "Guest Name",
      "Group",
      "Email",
      "Address",
      "Phone",
      "Dietary",
      "Status",
      "Assigned Table",
    ];

    const rows = guests.map((guest) => [
      guest.name,
      guest.group,
      guest.email,
      guest.address,
      guest.phone,
      guest.dietary,
      guest.status,
      guest.assignedTable,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `guests-list-${Date.now()}.csv`);
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
        <title>Guests List</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 40px;
            color: #333;
          }
          h1 { 
            color: #7c3aed; 
            margin-bottom: 30px;
            font-size: 32px;
            text-align: center;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 20px;
          }
          th, td { 
            border: 1px solid #ddd; 
            padding: 12px; 
            text-align: left;
          }
          th { 
            background-color: #7c3aed; 
            color: white;
            font-weight: bold;
          }
          tr:nth-child(even) { 
            background-color: #f9f9f9;
          }
          .status-attending { 
            color: #16a34a; 
            font-weight: bold;
          }
          .status-pending { 
            color: #ea580c; 
            font-weight: bold;
          }
          .status-declined { 
            color: #dc2626; 
            font-weight: bold;
          }
          ${
            webLink
              ? `.web-link { margin-top: 30px; padding: 15px; background: #f5f5f5; border-radius: 5px; }`
              : ""
          }
        </style>
      </head>
      <body>
        <h1>Guests & Seating List</h1>
        <table>
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Group</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Dietary</th>
              <th>Status</th>
              <th>Assigned Table</th>
            </tr>
          </thead>
          <tbody>
            ${guests
              .map(
                (guest) => `
              <tr>
                <td>${guest.name}</td>
                <td>${guest.group}</td>
                <td>${guest.email}</td>
                <td>${guest.phone}</td>
                <td>${guest.dietary}</td>
                <td class="status-${guest.status.toLowerCase()}">${
                  guest.status
                }</td>
                <td>${guest.assignedTable}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
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
        <title>Guests List</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 40px;
          }
          h1 { 
            color: #7c3aed; 
            margin-bottom: 30px;
            text-align: center;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 20px;
          }
          th, td { 
            border: 1px solid #ddd; 
            padding: 12px; 
            text-align: left;
          }
          th { 
            background-color: #7c3aed; 
            color: white;
            font-weight: bold;
          }
          tr:nth-child(even) { 
            background-color: #f9f9f9;
          }
        </style>
      </head>
      <body>
        <h1>Guests & Seating List</h1>
        <table>
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Group</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Dietary</th>
              <th>Status</th>
              <th>Assigned Table</th>
            </tr>
          </thead>
          <tbody>
            ${guests
              .map(
                (guest) => `
              <tr>
                <td>${guest.name}</td>
                <td>${guest.group}</td>
                <td>${guest.email}</td>
                <td>${guest.phone}</td>
                <td>${guest.dietary}</td>
                <td>${guest.status}</td>
                <td>${guest.assignedTable}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
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
    link.download = `guests-list-${Date.now()}.doc`;
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
        description: "Choose PDF, CSV, or DOC to export your guests list.",
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
        description: "Your guests list is being prepared for download.",
      });

      setSelectedFormat("");
      setWebLink("");
      setErrors({ format: false });
      setTouched({ format: false });
      onClose();
    } catch (error) {
      toast.error("Export failed", {
        description:
          "There was an error exporting your guests list. Please try again.",
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
              Export Guest list as <span className="text-red-500">*</span>
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
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
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
