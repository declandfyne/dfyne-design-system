"use client";

import { useEffect } from "react";
import { X } from "@phosphor-icons/react";
import { ProductGallery } from "../gallery/ProductGallery";
import { ColorSwatch } from "../cards/ColorSwatch";
import { SizeButton } from "../cards/SizeButton";
import { QuantityInput } from "../primitives/QuantityInput";
import { Button } from "../primitives/Button";

export interface QuickShopProduct {
  name: string;
  price: string;
  images: { src: string; alt: string }[];
  colors?: { image: string; label: string; selected: boolean }[];
  sizes?: { label: string; selected: boolean; soldOut: boolean }[];
}

interface QuickShopModalProps {
  open: boolean;
  onClose: () => void;
  product: QuickShopProduct;
  onColorSelect?: (index: number) => void;
  onSizeSelect?: (index: number) => void;
  quantity?: number;
  onQuantityChange?: (value: number) => void;
  onAddToBag?: () => void;
  className?: string;
}

export function QuickShopModal({
  open,
  onClose,
  product,
  onColorSelect,
  onSizeSelect,
  quantity = 1,
  onQuantityChange,
  onAddToBag,
  className = "",
}: QuickShopModalProps) {
  // Body scroll lock
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Escape key handler
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      data-testid="modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full max-w-[900px] bg-white p-6 ${className}`.trim()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-[36px] w-[36px] items-center justify-center"
        >
          <X size={20} />
        </button>

        {/* Two-column layout */}
        <div className="flex gap-6">
          {/* Left: Gallery */}
          <div className="w-1/2">
            <ProductGallery images={product.images} />
          </div>

          {/* Right: Product info */}
          <div className="flex w-1/2 flex-col gap-4">
            {/* Name */}
            <h2
              className="text-[14px] font-semibold uppercase tracking-[1.5px]"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              {product.name}
            </h2>

            {/* Price */}
            <span
              className="text-[13px] font-normal text-[#1c1d1d]"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              {product.price}
            </span>

            {/* Color swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex flex-row gap-2">
                {product.colors.map((color, i) => (
                  <ColorSwatch
                    key={i}
                    image={color.image}
                    label={color.label}
                    selected={color.selected}
                    onClick={() => onColorSelect?.(i)}
                  />
                ))}
              </div>
            )}

            {/* Size buttons */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="flex flex-row flex-wrap gap-2">
                {product.sizes.map((size, i) => (
                  <SizeButton
                    key={i}
                    label={size.label}
                    selected={size.selected}
                    soldOut={size.soldOut}
                    onClick={() => onSizeSelect?.(i)}
                  />
                ))}
              </div>
            )}

            {/* Quantity */}
            <QuantityInput
              value={quantity}
              onChange={(v) => onQuantityChange?.(v)}
            />

            {/* Add to bag */}
            <Button className="w-full" onClick={onAddToBag}>
              ADD TO BAG
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
