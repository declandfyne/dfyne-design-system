"use client";

import React from "react";
import { Check } from "@phosphor-icons/react";
import { Accordion, AccordionItem } from "../disclosure/Accordion";

/* ─── Types ─── */

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  color?: string;
  selected: boolean;
}

export interface FilterGroup {
  key: string;
  label: string;
  type: "checkbox" | "swatch" | "toggle";
  options: FilterOption[];
}

export interface SortOption {
  value: string;
  label: string;
}

interface FilterPanelProps {
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
  onFilterChange: FilterPanelProps["onFilterChange"];
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
  onFilterChange: FilterPanelProps["onFilterChange"];
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
  onFilterChange: FilterPanelProps["onFilterChange"];
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

/* ─── FilterPanel ─── */

export function FilterPanel({
  filters,
  onFilterChange,
  sortOptions,
  sortValue,
  onSortChange,
  activeFilterCount,
  onClearAll,
  className,
}: FilterPanelProps) {
  return (
    <div className={className} style={{ fontFamily: "Raleway, sans-serif" }}>
      {/* Sort dropdown */}
      {sortOptions && sortOptions.length > 0 && (
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
      )}

      {/* Clear all */}
      {activeFilterCount != null && activeFilterCount > 0 && onClearAll && (
        <button
          type="button"
          onClick={onClearAll}
          className="mt-[12px] text-[10px] font-semibold uppercase tracking-[2.7px] text-[#111111] underline"
          style={{ fontFamily: "Raleway, sans-serif", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          Clear all
        </button>
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
  );
}
