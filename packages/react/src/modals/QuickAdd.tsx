"use client";

import { useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";
import { Button } from "../primitives/Button";

export interface QuickAddProduct {
  name: string;
  variant: string;
  price: string;
  images: { src: string; alt: string }[];
  lengths?: string[];
  sizes?: { label: string; soldOut: boolean }[];
  href: string;
}

interface QuickAddProps {
  open: boolean;
  onClose: () => void;
  product: QuickAddProduct;
  onLengthSelect?: (length: string) => void;
  onSizeSelect?: (size: string) => void;
  onAddToCart?: () => void;
  selectedLength?: string;
  selectedSize?: string;
  className?: string;
}

export function QuickAdd({
  open,
  onClose,
  product,
  onLengthSelect,
  onSizeSelect,
  onAddToCart,
  selectedLength,
  selectedSize,
  className = "",
}: QuickAddProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const hasLengths = product.lengths && product.lengths.length > 0;
  const hasSizes = product.sizes && product.sizes.length > 0;
  const needsLength = hasLengths && !selectedLength;
  const showSizes = hasSizes && (!hasLengths || selectedLength);

  let ctaLabel = "ADD TO CART";
  let ctaDisabled = false;
  if (needsLength) {
    ctaLabel = "SELECT LENGTH";
    ctaDisabled = true;
  } else if (hasSizes && !selectedSize) {
    ctaLabel = "SELECT SIZE";
    ctaDisabled = true;
  }

  return (
    <div
      data-testid="modal-backdrop"
      className="fixed inset-0 z-50 bg-black/40"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[51] max-h-[85vh] overflow-y-auto rounded-t-[16px] bg-white ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        style={{
          animation: "quickAddSlideUp 300ms ease forwards",
        }}
      >
        <style>{`
          @keyframes quickAddSlideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}</style>

        {/* Header */}
        <div className="relative flex items-center justify-center px-[16px] py-[12px]">
          <span
            className="text-[10px] font-semibold uppercase tracking-[1.5px]"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            QUICK ADD
          </span>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-[16px] flex h-[36px] w-[36px] items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image scroll */}
        <div
          ref={scrollRef}
          className="flex flex-row gap-[4px] overflow-x-auto px-[16px]"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className="flex-none object-cover"
              style={{
                width: "calc(50% - 2px)",
                aspectRatio: "4/5",
                scrollSnapAlign: "start",
              }}
            />
          ))}
        </div>

        {/* Product info */}
        <div className="px-[16px] pt-[12px]">
          <h2
            className="text-[14px] font-semibold text-[#111]"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            {product.name}
          </h2>
          <p
            className="text-[11px] font-normal text-[#888]"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            {product.variant}
          </p>
          <p
            className="mt-[2px] text-[13px] font-normal text-[#1c1d1d]"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            {product.price}
          </p>
        </div>

        {/* Length section */}
        {hasLengths && (
          <div className="px-[16px] pt-[16px]">
            <span
              className="mb-[8px] block text-[10px] font-semibold uppercase tracking-[1.5px]"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              SELECT LENGTH:
            </span>
            <div className="flex flex-row flex-wrap gap-[8px]">
              {product.lengths!.map((length) => (
                <button
                  key={length}
                  type="button"
                  onClick={() => onLengthSelect?.(length)}
                  aria-pressed={selectedLength === length}
                  className={`inline-flex h-[24px] items-center justify-center rounded-[25px] border px-[12px] text-[10px] font-normal tracking-[0.325px] transition-colors duration-200 ${
                    selectedLength === length
                      ? "border-[#292929] bg-black text-white"
                      : "border-black bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {length}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size section */}
        {showSizes && (
          <div className="px-[16px] pt-[16px]">
            <span
              className="mb-[8px] block text-[10px] font-semibold uppercase tracking-[1.5px]"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              SIZE:
            </span>
            <div className="flex flex-row flex-wrap gap-[8px]">
              {product.sizes!.map((size) => (
                <button
                  key={size.label}
                  type="button"
                  onClick={() => onSizeSelect?.(size.label)}
                  disabled={size.soldOut}
                  aria-pressed={selectedSize === size.label}
                  className={`inline-flex h-[24px] w-[40px] items-center justify-center rounded-[25px] border text-[10px] font-normal tracking-[0.325px] transition-colors duration-200 ${
                    size.soldOut
                      ? "cursor-not-allowed border-[#e0e0e0] bg-white text-[#bbbbbb] line-through"
                      : selectedSize === size.label
                        ? "border-[#292929] bg-black text-white"
                        : "border-black bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="px-[16px] pt-[16px] pb-[16px]">
          <Button
            className="w-full"
            disabled={ctaDisabled}
            onClick={() => onAddToCart?.()}
          >
            {ctaLabel}
          </Button>

          <a
            href={product.href}
            className="mt-[8px] flex w-full items-center justify-center rounded-[50px] border border-[#e8e8e1] bg-transparent px-[20px] py-[13px] text-[9px] font-semibold uppercase tracking-[2.7px] text-black transition-colors hover:border-black"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            VIEW PRODUCT
          </a>
        </div>
      </div>
    </div>
  );
}
