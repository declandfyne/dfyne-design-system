"use client";

import { useState } from "react";

export interface LengthSelectorProps {
  options: string[];
  selected?: string;
  onChange: (length: string) => void;
  className?: string;
}

/**
 * LengthSelector — "SELECT LENGTH:" pill toggle from PDP.
 *
 * Row of pill buttons (Regular / Tall / Petite).
 * Selected: bg #111, white text. Unselected: bg white, #111 text, border #e8e8e1.
 * Hover unselected: border #111.
 */
export function LengthSelector({
  options,
  selected,
  onChange,
  className = "",
}: LengthSelectorProps) {
  return (
    <div className={className}>
      <div
        style={{
          fontFamily: "Raleway, sans-serif",
          fontSize: "10px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1.2px",
          color: "#111111",
          marginBottom: "8px",
        }}
      >
        SELECT LENGTH:
      </div>
      <div className="flex flex-row gap-[8px]">
        {options.map((option) => {
          const isSelected = option === selected;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`cursor-pointer transition-colors ${
                isSelected
                  ? ""
                  : "hover:border-[#111111]"
              }`}
              style={{
                fontFamily: "Raleway, sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                height: "40px",
                minWidth: "120px",
                borderRadius: "50px",
                border: isSelected ? "1px solid transparent" : "1px solid #e8e8e1",
                backgroundColor: isSelected ? "#111111" : "#ffffff",
                color: isSelected ? "#ffffff" : "#111111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 16px",
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
