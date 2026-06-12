"use client";

import { useEffect } from "react";
import { Check, Warning, Info, X } from "@phosphor-icons/react";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  visible: boolean;
  onClose?: () => void;
  duration?: number;
  className?: string;
}

const iconMap = {
  success: <Check size={20} weight="bold" color="#2d7d3a" />,
  error: <Warning size={20} weight="bold" color="#d02e2e" />,
  info: <Info size={20} weight="bold" color="#111111" />,
};

export function Toast({
  message,
  type = "success",
  visible,
  onClose,
  duration = 3000,
  className = "",
}: ToastProps) {
  useEffect(() => {
    if (!visible || duration === 0 || !onClose) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div
      role="status"
      className={`fixed bottom-6 right-6 z-50 flex max-w-[360px] items-center gap-3 ${className}`.trim()}
      style={{
        fontFamily: "Raleway, sans-serif",
        fontSize: "13px",
        color: "#111111",
        backgroundColor: "#ffffff",
        border: "1px solid #e8e8e1",
        borderRadius: "4px",
        padding: "12px 16px",
        boxShadow:
          "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
      }}
    >
      <span className="flex-shrink-0">{iconMap[type]}</span>
      <span className="flex-1">{message}</span>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="flex-shrink-0 cursor-pointer border-0 bg-transparent p-0"
        style={{ color: "#888888", lineHeight: 0 }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
      >
        <X size={16} weight="bold" />
      </button>
    </div>
  );
}
