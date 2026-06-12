"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current <= 4) {
    pages.push(2, 3, 4, 5, "ellipsis", total);
  } else if (current >= total - 3) {
    pages.push("ellipsis", total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push("ellipsis", current - 1, current, current + 1, "ellipsis", total);
  }

  return pages;
}

const buttonBase: React.CSSProperties = {
  width: 30,
  height: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #e8e8e1",
  borderRadius: 0,
  cursor: "pointer",
  fontFamily: "Raleway, sans-serif",
  fontSize: 11,
  fontWeight: 400,
  padding: 0,
  lineHeight: 1,
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        justifyContent: "center",
      }}
    >
      <button
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{
          ...buttonBase,
          backgroundColor: "transparent",
          color: "#111111",
          opacity: currentPage === 1 ? 0.4 : 1,
          cursor: currentPage === 1 ? "default" : "pointer",
        }}
      >
        <CaretLeft size={14} />
      </button>

      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            style={{
              ...buttonBase,
              border: "none",
              cursor: "default",
              color: "#111111",
              backgroundColor: "transparent",
            }}
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            style={{
              ...buttonBase,
              backgroundColor: page === currentPage ? "#111111" : "transparent",
              color: page === currentPage ? "#ffffff" : "#111111",
            }}
            onMouseEnter={(e) => {
              if (page !== currentPage) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f5f5f5";
              }
            }}
            onMouseLeave={(e) => {
              if (page !== currentPage) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              }
            }}
          >
            {page}
          </button>
        )
      )}

      <button
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          ...buttonBase,
          backgroundColor: "transparent",
          color: "#111111",
          opacity: currentPage === totalPages ? 0.4 : 1,
          cursor: currentPage === totalPages ? "default" : "pointer",
        }}
      >
        <CaretRight size={14} />
      </button>
    </nav>
  );
}
