// components/budget/BudgetExportSheet.tsx
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BudgetItem } from "./BudgetPage";
import { toast } from "sonner";

interface BudgetExportSheetProps {
  isOpen: boolean;
  onClose: () => void;
  budgetItems: BudgetItem[];
  eventBudget: number;
  totalEstimated: number;
  totalActual: number;
  totalPaid: number;
}

export function BudgetExportSheet({
  isOpen,
  onClose,
  budgetItems,
  eventBudget,
  totalEstimated,
  totalActual,
  totalPaid,
}: BudgetExportSheetProps) {
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
    const headers = ["Category", "Vendor Name", "Estimated", "Actual", "Paid"];

    const summaryRows = [
      ["Event Budget", "", eventBudget, "", ""],
      ["Total Estimated", "", totalEstimated, "", ""],
      ["Total Actual", "", "", totalActual, ""],
      ["Total Paid", "", "", "", totalPaid],
      ["", "", "", "", ""],
    ];

    const dataRows = budgetItems.map((item) => [
      item.category,
      item.vendorName,
      item.estimated,
      item.actual,
      item.paid,
    ]);

    const csvContent = [
      headers.join(","),
      ...summaryRows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
      ...dataRows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
      webLink ? ["", "", "", "", ""] : [],
      webLink ? ["Web Link", webLink, "", "", ""] : [],
    ]
      .filter((row) => row.length > 0)
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `budget-${Date.now()}.csv`);
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
        <title>Budget Report</title>
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
          .summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 40px;
          }
          .summary-card {
            padding: 20px;
            background: #f5f5f5;
            border-radius: 8px;
          }
          .summary-card h3 {
            font-size: 14px;
            color: #666;
            margin: 0 0 10px 0;
          }
          .summary-card p {
            font-size: 28px;
            font-weight: bold;
            margin: 0;
            color: #000;
          }
          .budget-item { 
            margin-bottom: 30px; 
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            page-break-inside: avoid;
          }
          .budget-item h2 { 
            color: #E91E63; 
            margin-top: 0;
            font-size: 20px;
            margin-bottom: 10px;
          }
          .budget-item p {
            color: #666;
            margin: 5px 0;
          }
          .budget-detail { 
            margin: 10px 0;
            display: flex;
          }
          .budget-detail strong { 
            min-width: 120px;
            color: #000;
          }
          .budget-detail span {
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
        <h1>Budget</h1>
        <p style="color: #666; margin-bottom: 30px;">A simple and intuitive budget tracker</p>
        
        <div class="summary">
          <div class="summary-card">
            <h3>Event Budget</h3>
            <p>$${eventBudget}</p>
          </div>
          <div class="summary-card">
            <h3>Estimated cost</h3>
            <p>$${totalEstimated}</p>
          </div>
          <div class="summary-card">
            <h3>Actual cost</h3>
            <p>$${totalActual}</p>
          </div>
          <div class="summary-card">
            <h3>Paid</h3>
            <p>$${totalPaid}</p>
          </div>
        </div>

        <h2 style="font-size: 24px; margin-bottom: 20px;">Categories</h2>
        
        ${budgetItems
          .map(
            (item) => `
          <div class="budget-item">
            <h2>${item.category}</h2>
            <p style="margin-bottom: 15px;">${item.vendorName}</p>
            <div class="budget-detail">
              <strong>Estimated:</strong>
              <span>$${item.estimated}</span>
            </div>
            <div class="budget-detail">
              <strong>Actual:</strong>
              <span>$${item.actual}</span>
            </div>
            <div class="budget-detail">
              <strong>Paid:</strong>
              <span>$${item.paid}</span>
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
        <title>Budget Report</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 40px;
          }
          h1 { 
            color: #E91E63; 
            margin-bottom: 30px;
          }
          .summary {
            margin-bottom: 40px;
          }
          .summary-item {
            margin: 10px 0;
          }
          .budget-item { 
            margin-bottom: 30px; 
            padding: 20px;
            border: 1px solid #e0e0e0;
          }
          .budget-item h2 { 
            color: #E91E63; 
            margin-top: 0;
          }
          .budget-detail { 
            margin: 10px 0;
          }
          .budget-detail strong { 
            min-width: 120px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <h1>Budget</h1>
        <p>A simple and intuitive budget tracker</p>
        
        <div class="summary">
          <h2>Summary</h2>
          <div class="summary-item">
            <strong>Event Budget:</strong> $${eventBudget}
          </div>
          <div class="summary-item">
            <strong>Estimated cost:</strong> $${totalEstimated}
          </div>
          <div class="summary-item">
            <strong>Actual cost:</strong> $${totalActual}
          </div>
          <div class="summary-item">
            <strong>Paid:</strong> $${totalPaid}
          </div>
        </div>

        <h2>Categories</h2>
        
        ${budgetItems
          .map(
            (item) => `
          <div class="budget-item">
            <h2>${item.category}</h2>
            <p>${item.vendorName}</p>
            <div class="budget-detail">
              <strong>Estimated:</strong> $${item.estimated}
            </div>
            <div class="budget-detail">
              <strong>Actual:</strong> $${item.actual}
            </div>
            <div class="budget-detail">
              <strong>Paid:</strong> $${item.paid}
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
    link.download = `budget-${Date.now()}.doc`;
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
        description: "Choose PDF, CSV, or DOC to export your budget.",
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
        description: "Your budget is being prepared for download.",
      });

      setSelectedFormat("");
      setWebLink("");
      setErrors({ format: false });
      setTouched({ format: false });
      onClose();
    } catch (error) {
      toast.error("Export failed", {
        description:
          "There was an error exporting your budget. Please try again.",
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

        <div className="bg-white p-6 min-h-fit md:min-h-screen space-y-6">
          <div className="text-black">
            <p className="text-sm font-medium mb-4">
              Export Event list as <span className="text-red-500">*</span>
            </p>

            <label
              className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-colors mb-3 text-black border ${
                touched.format && errors.format
                  ? "border-red-500 bg-red-50"
                  : "bg-white hover:bg-gray-50 border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="exportFormat"
                value="PDF"
                checked={selectedFormat === "PDF"}
                onChange={(e) => handleFormatChange(e.target.value)}
                className="w-5 h-5 accent-primary"
              />
              <span className="font-medium">PDF</span>
            </label>

            <label
              className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-colors mb-3 text-black border ${
                touched.format && errors.format
                  ? "border-red-500 bg-red-50"
                  : "bg-white hover:bg-gray-50 border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="exportFormat"
                value="CSV"
                checked={selectedFormat === "CSV"}
                onChange={(e) => handleFormatChange(e.target.value)}
                className="w-5 h-5 accent-primary"
              />
              <span className="font-medium">CSV</span>
            </label>

            <label
              className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-colors mb-3 text-black border ${
                touched.format && errors.format
                  ? "border-red-500 bg-red-50"
                  : "bg-white hover:bg-gray-50 border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="exportFormat"
                value="DOC"
                checked={selectedFormat === "DOC"}
                onChange={(e) => handleFormatChange(e.target.value)}
                className="w-5 h-5 accent-primary"
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
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Enter web link (optional)"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              size="lg"
              onClick={handleExport}
              className="bg-primary text-white hover:bg-primary/90"
            >
              Done
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
