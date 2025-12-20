"use client";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  TriangleAlert,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { Table as T } from "@/types/components";

export default function Table({
  headers,
  rows,
  sortable,
  itemsPerPage = 10,
}: T) {
  const [sortedRows, setSortedRows] = useState<ReactNode[][]>(rows);
  const [sortingItems, setSortingItems] = useState<{
    index: number;
    ascending: boolean;
  }>({ index: -1, ascending: true });
  const [currentPage, setCurrentPage] = useState(1);

  const isSortable = (header: string) =>
    sortable.map((sort) => sort.toLowerCase()).includes(header.toLowerCase());

  const handleSort = (index: number) => {
    const ascending =
      sortingItems.index === index ? !sortingItems.ascending : true;
    setSortingItems({ index, ascending });

    setSortedRows(
      [...rows].sort((a, b) => {
        const valA = String(a[index]).toLowerCase();
        const valB = String(b[index]).toLowerCase();
        return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }),
    );
  };

  const displayedRows = sortingItems.index === -1 ? rows : sortedRows;
  const totalPages = Math.ceil(displayedRows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRows = displayedRows.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="border-border relative w-full overflow-x-auto rounded-xl border bg-white">
      <table className="w-full min-w-max table-auto">
        <thead className="bg-primary/5 text-heading">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-5 py-4 text-center font-medium">
                {isSortable(header) ? (
                  <span
                    onClick={() => handleSort(i)}
                    className="inline-flex cursor-pointer items-center text-xs font-medium whitespace-nowrap lg:text-sm"
                  >
                    <h5 className="mr-2">{header}</h5>
                    {sortingItems.index !== i ? (
                      <ArrowUpDown size={14} />
                    ) : sortingItems.ascending ? (
                      <ArrowUp size={14} />
                    ) : (
                      <ArrowDown size={14} />
                    )}
                  </span>
                ) : (
                  <span className="text-xs font-medium whitespace-nowrap lg:text-sm">
                    {header}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedRows.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="text-text-secondary py-12 text-center"
              >
                <span className="flex flex-col items-center justify-center gap-2">
                  <TriangleAlert className="text-accent" size={40} />
                  <p className="text-heading text-sm font-semibold">
                    Tidak ada data, yuk isi dulu!
                  </p>
                </span>
              </td>
            </tr>
          ) : (
            paginatedRows.map((rows, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-border hover:bg-primary/5 border-t text-sm transition-all"
              >
                {rows.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`text-text-secondary px-5 py-4 text-center ${cellIndex === 0 || cellIndex === headers.length - 1 ? "w-20" : ""}`}
                  >
                    <span className="inline-flex items-center justify-center text-sm">
                      {cell}
                    </span>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-border flex items-center justify-between border-t px-5 py-4">
          <p className="text-text-secondary text-sm">
            Menampilkan {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, displayedRows.length)} dari{" "}
            {displayedRows.length} data
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-border hover:bg-primary/5 rounded-lg border p-2 transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-heading text-sm font-medium">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="border-border hover:bg-primary/5 rounded-lg border p-2 transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
