// components/common/DataTable.tsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  itemsPerPage?: number;
  onRowClick?: (item: T) => void;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  hoverable?: boolean;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  itemsPerPage = 10,
  onRowClick,
  currentPage: initialPage = 1,
  onPageChange,
  hoverable = true,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = React.useState(initialPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const getAlignClass = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    pages.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
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
          onClick={() => handlePageChange(2)}
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
          key={totalPages - 1}
          onClick={() => handlePageChange(totalPages - 1)}
          className="w-8 h-8 rounded border bg-white text-gray-700 border-gray-300 hover:border-primary"
        >
          {totalPages - 1}
        </button>
      );

      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="w-8 h-8 rounded border bg-white text-gray-700 border-gray-300 hover:border-primary"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`py-4 px-6 font-semibold text-gray-900 ${getAlignClass(
                    column.align
                  )}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedData.length > 0 ? (
              displayedData.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b last:border-b-0 ${
                    hoverable ? "hover:bg-gray-50 transition-colors" : ""
                  } ${onRowClick ? "cursor-pointer" : ""}`}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={`py-4 px-6 text-gray-700 ${getAlignClass(
                        column.align
                      )} ${column.className || ""}`}
                    >
                      {column.render
                        ? column.render(item[column.key], item)
                        : (item[column.key] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-8 px-6 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded border border-gray-300 bg-white flex items-center justify-center hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {renderPageNumbers()}

          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded border border-gray-300 bg-white flex items-center justify-center hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
