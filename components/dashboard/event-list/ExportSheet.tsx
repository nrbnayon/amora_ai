// components/event-list/ExportSheet.tsx
"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExportSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportSheet({ isOpen, onClose }: ExportSheetProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [webLink, setWebLink] = useState<string>("");

  const handleExport = () => {
    if (selectedFormat) {
      // Handle export logic here
      console.log("Exporting as:", selectedFormat);
      if (webLink) {
        console.log("Web link:", webLink);
      }
      onClose();
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

        <div className="bg-white p-5 h-screen space-y-6">
          <div className="text-black">
            <p className="text-sm font-medium mb-4">Export Event list as</p>

            {/* PDF Option */}
            <label className="flex items-center gap-3 p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors mb-3 text-black">
              <input
                type="radio"
                name="exportFormat"
                value="PDF"
                checked={selectedFormat === "PDF"}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-5 h-5"
              />
              <span className=" font-medium">PDF</span>
            </label>

            {/* CSV Option */}
            <label className="flex items-center gap-3 p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors mb-3">
              <input
                type="radio"
                name="exportFormat"
                value="CSV"
                checked={selectedFormat === "CSV"}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-5 h-5"
              />
              <span className=" font-medium">CSV</span>
            </label>

            {/* DOC Option */}
            <label className="flex items-center gap-3 p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors mb-6">
              <input
                type="radio"
                name="exportFormat"
                value="DOC"
                checked={selectedFormat === "DOC"}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-5 h-5 "
              />
              <span className="font-medium">DOC</span>
            </label>
          </div>

          {/* Web Link */}
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

          {/* Done Button */}
          <div className="flex justify-end">
            <Button
              size="lg"
              onClick={handleExport}
              disabled={!selectedFormat}
              className="bg-primary text-white font-semibold hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Done
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
