"use client";

import React, { useEffect } from "react";
import { CartItem } from "./CartItem";
import { Button } from "../primitives/Button";
import { X } from "@phosphor-icons/react";

export interface CartDrawerItem {
  image: { src: string; alt: string };
  name: string;
  variant: string;
  price: string;
  comparePrice?: string;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartDrawerItem[];
  onItemQuantityChange: (index: number, quantity: number) => void;
  onItemRemove: (index: number) => void;
  subtotal: string;
  shippingMessage?: string;
  upsells?: React.ReactNode;
  onCheckout?: () => void;
  className?: string;
}

export function CartDrawer({
  open,
  onClose,
  items,
  onItemQuantityChange,
  onItemRemove,
  subtotal,
  shippingMessage,
  upsells,
  onCheckout,
  className = "",
}: CartDrawerProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

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
      />

      {/* Drawer */}
      <div
        className={className}
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          width: 420,
          height: "100%",
          backgroundColor: "#ffffff",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
          zIndex: 51,
          display: "flex",
          flexDirection: "column",
          fontFamily: "Raleway, sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            borderBottom: "1px solid #e8e8e1",
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              fontFamily: "Raleway, sans-serif",
            }}
          >
            Your Bag{" "}
            <span style={{ fontWeight: 400 }}>({items.length})</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0 24px",
          }}
        >
          {items.map((item, index) => (
            <CartItem
              key={index}
              image={item.image}
              name={item.name}
              variant={item.variant}
              price={item.price}
              comparePrice={item.comparePrice}
              quantity={item.quantity}
              onQuantityChange={(value) => onItemQuantityChange(index, value)}
              onRemove={() => onItemRemove(index)}
            />
          ))}

          {upsells && <div style={{ marginTop: 16 }}>{upsells}</div>}
        </div>

        {/* Sticky Footer */}
        <div
          style={{
            borderTop: "1px solid #e8e8e1",
            padding: "16px 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                fontFamily: "Raleway, sans-serif",
              }}
            >
              Subtotal
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "Raleway, sans-serif",
              }}
            >
              {subtotal}
            </span>
          </div>

          {shippingMessage && (
            <div
              style={{
                fontSize: 11,
                color: "#888888",
                marginTop: 4,
              }}
            >
              {shippingMessage}
            </div>
          )}

          <div style={{ marginTop: 16 }}>
            <Button
              variant="primary"
              onClick={onCheckout}
              className="w-full"
            >
              CHECKOUT
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
