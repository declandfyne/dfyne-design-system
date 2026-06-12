"use client";

import { useState, useRef, useCallback } from "react";

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

const positionStyles: Record<
  string,
  { tooltip: React.CSSProperties; arrow: React.CSSProperties }
> = {
  top: {
    tooltip: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: 6 },
    arrow: {
      top: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      borderLeft: "5px solid transparent",
      borderRight: "5px solid transparent",
      borderTop: "5px solid #111111",
    },
  },
  bottom: {
    tooltip: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 6 },
    arrow: {
      bottom: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      borderLeft: "5px solid transparent",
      borderRight: "5px solid transparent",
      borderBottom: "5px solid #111111",
    },
  },
  left: {
    tooltip: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: 6 },
    arrow: {
      left: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      borderTop: "5px solid transparent",
      borderBottom: "5px solid transparent",
      borderLeft: "5px solid #111111",
    },
  },
  right: {
    tooltip: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: 6 },
    arrow: {
      right: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      borderTop: "5px solid transparent",
      borderBottom: "5px solid transparent",
      borderRight: "5px solid #111111",
    },
  },
};

export function Tooltip({
  content,
  children,
  position = "top",
  className = "",
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = useCallback(() => {
    timerRef.current = setTimeout(() => setVisible(true), 150);
  }, []);

  const hideTooltip = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setVisible(false);
  }, []);

  const { tooltip: tooltipPos, arrow: arrowPos } = positionStyles[position];

  return (
    <div
      className={`inline-block relative ${className}`.trim()}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          style={{
            position: "absolute",
            zIndex: 50,
            pointerEvents: "none",
            whiteSpace: "normal",
            maxWidth: 200,
            fontFamily: "Raleway, sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            color: "#ffffff",
            backgroundColor: "#111111",
            borderRadius: "4px",
            padding: "6px 10px",
            ...tooltipPos,
          }}
        >
          {content}
          <span
            style={{
              position: "absolute",
              width: 0,
              height: 0,
              ...arrowPos,
            }}
          />
        </div>
      )}
    </div>
  );
}
