"use client";

import { QuantityInput } from "../primitives/QuantityInput";

export interface CartItemProps {
  image: { src: string; alt: string };
  name: string;
  variant: string;
  price: string;
  comparePrice?: string;
  quantity: number;
  onQuantityChange: (value: number) => void;
  onRemove: () => void;
  className?: string;
}

export function CartItem({
  image,
  name,
  variant,
  price,
  comparePrice,
  quantity,
  onQuantityChange,
  onRemove,
  className = "",
}: CartItemProps) {
  return (
    <div
      className={`flex gap-4 border-b border-[#e8e8e1] py-4 ${className}`.trim()}
      style={{ fontFamily: "Raleway, sans-serif" }}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="shrink-0 object-cover"
        style={{
          width: 80,
          height: 100,
          borderRadius: 2,
        }}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span
          style={{
            fontSize: 13,
            fontWeight: 400,
            color: "#111111",
            lineHeight: 1.4,
          }}
        >
          {name}
        </span>

        <span
          style={{
            fontSize: 11,
            fontWeight: 400,
            color: "#888888",
            lineHeight: 1.4,
          }}
        >
          {variant}
        </span>

        <div className="flex items-center gap-1.5">
          {comparePrice && (
            <span
              style={{
                fontSize: 11,
                color: "#888888",
                textDecoration: "line-through",
              }}
            >
              {comparePrice}
            </span>
          )}
          <span
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: "#1c1d1d",
            }}
          >
            {price}
          </span>
        </div>

        <div className="mt-2">
          <QuantityInput value={quantity} onChange={onQuantityChange} />
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="mt-1 self-start bg-transparent border-none cursor-pointer p-0 hover:underline"
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "#888888",
            textTransform: "uppercase",
            letterSpacing: "1.2px",
            fontFamily: "Raleway, sans-serif",
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
