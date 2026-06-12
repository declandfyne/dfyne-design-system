"use client";

import { Minus, Plus } from "@phosphor-icons/react";

export function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  className = "",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}) {
  const atMin = value <= min;
  const atMax = value >= max;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseInt(e.target.value, 10);
    if (!isNaN(raw)) {
      onChange(raw);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const raw = parseInt(e.target.value, 10);
    const v = isNaN(raw) ? value : raw;
    if (v < min) onChange(min);
    else if (v > max) onChange(max);
    else if (v !== value) onChange(v);
  };

  return (
    <div
      className={`inline-flex items-center border border-[#e8e8e1] ${disabled ? "opacity-50" : ""} ${className}`}
      style={{ height: 42 }}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || atMin}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-full w-[42px] items-center justify-center border-r border-[#e8e8e1] text-[#111111] disabled:text-[#aaaaaa] disabled:cursor-not-allowed"
      >
        <Minus size={14} weight="bold" />
      </button>

      <input
        type="number"
        value={value}
        onChange={handleInput}
        onBlur={handleBlur}
        disabled={disabled}
        min={min}
        max={max}
        aria-label="Quantity"
        className="h-full w-[42px] border-none bg-transparent text-center text-[13px] font-normal text-[#111111] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        style={{ fontFamily: "Raleway, sans-serif" }}
      />

      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled || atMax}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-full w-[42px] items-center justify-center border-l border-[#e8e8e1] text-[#111111] disabled:text-[#aaaaaa] disabled:cursor-not-allowed"
      >
        <Plus size={14} weight="bold" />
      </button>
    </div>
  );
}
