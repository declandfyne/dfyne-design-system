"use client";

import React from "react";

interface CollectionGridProps {
  products: React.ReactNode[];
  filters?: React.ReactNode;
  heading?: string;
  productCount?: number;
  columns?: 2 | 3 | 4;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

function ShimmerCard() {
  return (
    <div data-testid="shimmer" className="animate-pulse">
      <div
        className="bg-[#f0f0f0] rounded"
        style={{ aspectRatio: "4 / 5" }}
      />
      <div className="mt-3 space-y-2">
        <div className="h-3 bg-[#f0f0f0] rounded w-3/4" />
        <div className="h-3 bg-[#f0f0f0] rounded w-1/2" />
        <div className="h-3 bg-[#f0f0f0] rounded w-1/3" />
      </div>
    </div>
  );
}

export function CollectionGrid({
  products,
  filters,
  heading,
  productCount,
  columns = 4,
  loading = false,
  emptyMessage = "No products found",
  className = "",
}: CollectionGridProps) {
  const gridCols =
    columns === 2
      ? "grid-cols-2"
      : columns === 3
        ? "grid-cols-3"
        : "grid-cols-4";

  return (
    <div className={className}>
      {/* Heading row */}
      {(heading || productCount != null) && (
        <div className="flex items-center justify-between mb-6">
          {heading && (
            <h2
              className="font-semibold uppercase"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontSize: "14px",
                letterSpacing: "1.5px",
              }}
            >
              {heading}
            </h2>
          )}
          {productCount != null && (
            <span
              className="text-[#888888]"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontSize: "11px",
              }}
            >
              {productCount} products
            </span>
          )}
        </div>
      )}

      {/* Main layout: filters + grid */}
      <div className={filters ? "flex gap-8" : ""}>
        {filters && (
          <aside className="shrink-0" style={{ width: "260px" }}>
            {filters}
          </aside>
        )}

        <div className="flex-1">
          {loading ? (
            <div className={`grid ${gridCols} gap-[22px]`}>
              {Array.from({ length: 8 }).map((_, i) => (
                <ShimmerCard key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p
                className="text-[#888888]"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "13px",
                }}
              >
                {emptyMessage}
              </p>
            </div>
          ) : (
            <div className={`grid ${gridCols} gap-[22px]`}>
              {products.map((product, i) => (
                <React.Fragment key={i}>{product}</React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
