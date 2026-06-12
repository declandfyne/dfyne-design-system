"use client";

import React, { useEffect, useCallback } from "react";
import { Check, X } from "@phosphor-icons/react";
import { Accordion, AccordionItem } from "../disclosure/Accordion";
import { Button } from "../primitives/Button";
import type { FilterGroup, FilterOption, SortOption } from "./FilterPanel";

/* ─── Types ─── */

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: FilterGroup[];
  onFilterChange: (groupKey: string, value: string, selected: boolean) => void;
  sortOptions?: SortOption[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  activeFilterCount?: number;
  onClearAll?: () => void;
  className?: string;
}

/* ─── Checkbox Row ─── */

function CheckboxRow({
  option,
  groupKey,
  onFilterChange,
}: {
  option: FilterOption;
  groupKey: string;
  onFilterChange: FilterDrawerProps["onFilterChange"];
}) {
  return (
    <button
      type="button"
      onClick={() => onFilterChange(groupKey, option.value, !option.selected)}
      className="flex w-full items-center gap-[8px] py-[4px] text-left"
      style={{ fontFamily: "Raleway, sans-serif" }}
    >
      <span
        className="flex items-center justify-center shrink-0"
        style={{
          width: 16,
          height: 16,
          border: option.selected ? "none" : "1px solid #e8e8e1",
          backgroundColor: option.selected ? "#111111" : "transparent",
          borderRadius: 2,
        }}
      >
        {option.selected && <Check size={12} weight="bold" color="#ffffff" />}
      </span>
      <span className="text-[11px] text-[#111111]">{option.label}</span>
      {option.count != null && (
        <span className="text-[11px] text-[#999999] ml-auto">{option.count}</span>
      )}
    </button>
  );
}

/* ─── Swatch Grid ─── */

function SwatchGrid({
  options,
  groupKey,
  onFilterChange,
}: {
  options: FilterOption[];
  groupKey: string;
  onFilterChange: FilterDrawerProps["onFilterChange"];
}) {
  return (
    <div className="flex flex-wrap gap-[8px]">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-label={option.label}
          onClick={() => onFilterChange(groupKey, option.value, !option.selected)}
          className="shrink-0"
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: option.color || "#cccccc",
            outline: option.selected ? "2px solid #111111" : "none",
            outlineOffset: 2,
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Toggle Row ─── */

function ToggleRow({
  option,
  groupKey,
  onFilterChange,
}: {
  option: FilterOption;
  groupKey: string;
  onFilterChange: FilterDrawerProps["onFilterChange"];
}) {
  return (
    <button
      type="button"
      onClick={() => onFilterChange(groupKey, option.value, !option.selected)}
      className="flex w-full items-center justify-between py-[4px]"
      style={{ fontFamily: "Raleway, sans-serif" }}
    >
      <span className="text-[11px] text-[#111111]">{option.label}</span>
      <span
        className="relative shrink-0"
        style={{
          width: 40,
          height: 20,
          borderRadius: 10,
          backgroundColor: option.selected ? "#111111" : "#cccccc",
          transition: "background-color 200ms",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: option.selected ? 22 : 2,
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            transition: "left 200ms",
          }}
        />
      </span>
    </button>
  );
}

/* ─── FilterDrawer ─── */

export function FilterDrawer({
  open,
  onClose,
  filters,
  onFilterChange,
  sortOptions,
  sortValue,
  onSortChange,
  activeFilterCount,
  onClearAll,
  className,
}: FilterDrawerProps) {
  /* Escape key handler */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    /* Body scroll lock */
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 50,
        }}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Filter"
        className={className}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 360,
          maxWidth: "100vw",
          height: "100%",
          backgroundColor: "#ffffff",
          zIndex: 51,
          display: "flex",
          flexDirection: "column",
          fontFamily: "Raleway, sans-serif",
          animation: "filterDrawerSlideIn 300ms ease forwards",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between"
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #e8e8e1",
          }}
        >
          <div className="flex items-center gap-[8px]">
            <span
              className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#111111]"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Filter
            </span>
            {activeFilterCount != null && activeFilterCount > 0 && (
              <span
                className="flex items-center justify-center text-[9px] font-semibold text-white"
                style={{
                  backgroundColor: "#111111",
                  borderRadius: "50%",
                  width: 18,
                  height: 18,
                }}
              >
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              lineHeight: 0,
            }}
          >
            <X size={18} weight="bold" color="#111111" />
          </button>
        </div>

        {/* Clear all */}
        {activeFilterCount != null && activeFilterCount > 0 && onClearAll && (
          <div style={{ padding: "8px 20px 0" }}>
            <button
              type="button"
              onClick={onClearAll}
              className="text-[10px] font-semibold uppercase tracking-[2.7px] text-[#111111] underline"
              style={{
                fontFamily: "Raleway, sans-serif",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Clear all
            </button>
          </div>
        )}

        {/* Scrollable body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0 20px",
          }}
        >
          {/* Sort */}
          {sortOptions && sortOptions.length > 0 && (
            <div style={{ paddingTop: 12, paddingBottom: 4 }}>
              <select
                value={sortValue}
                onChange={(e) => onSortChange?.(e.target.value)}
                style={{
                  width: "100%",
                  height: 42,
                  backgroundColor: "#fafafa",
                  border: "1px solid #e0e0d9",
                  borderRadius: 0,
                  padding: "0 12px",
                  fontSize: 11,
                  fontFamily: "Raleway, sans-serif",
                  color: "#111111",
                  appearance: "auto",
                }}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Filter groups */}
          <Accordion allowMultiple>
            {filters.map((group) => (
              <AccordionItem key={group.key} title={group.label} defaultOpen>
                {group.type === "checkbox" &&
                  group.options.map((option) => (
                    <CheckboxRow
                      key={option.value}
                      option={option}
                      groupKey={group.key}
                      onFilterChange={onFilterChange}
                    />
                  ))}
                {group.type === "swatch" && (
                  <SwatchGrid
                    options={group.options}
                    groupKey={group.key}
                    onFilterChange={onFilterChange}
                  />
                )}
                {group.type === "toggle" &&
                  group.options.map((option) => (
                    <ToggleRow
                      key={option.value}
                      option={option}
                      groupKey={group.key}
                      onFilterChange={onFilterChange}
                    />
                  ))}
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 20px",
            borderTop: "1px solid #e8e8e1",
          }}
        >
          <Button onClick={onClose} className="w-full">
            Show Results
          </Button>
        </div>
      </aside>

      {/* Slide-in animation */}
      <style>{`
        @keyframes filterDrawerSlideIn {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
