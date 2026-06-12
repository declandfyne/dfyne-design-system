"use client";

import { useEffect, useState, useRef } from "react";

export function Canvas({
  children,
  dark,
  fullWidth,
}: {
  children: React.ReactNode;
  dark: boolean;
  fullWidth?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const keyRef = useRef(0);

  /* Re-trigger fade-in whenever children change */
  useEffect(() => {
    setVisible(false);
    keyRef.current += 1;
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [children]);

  const dotColor = dark ? "#111111" : "#e0e0e0";
  const bgColor = dark ? "#080808" : "#f5f5f5";

  const dotGrid = [
    `radial-gradient(circle, ${dotColor} 0.75px, transparent 0.75px)`,
  ].join(", ");

  return (
    <div
      className="relative flex flex-1 items-center justify-center overflow-auto"
      style={{
        background: bgColor,
        backgroundImage: dotGrid,
        backgroundSize: "24px 24px",
        backgroundPosition: "12px 12px",
      }}
    >
      <div
        className={fullWidth ? "w-full" : "flex items-center justify-center p-10"}
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 200ms ease-out",
        }}
      >
        {children}
      </div>

      {/* Zoom indicator */}
      <span
        className="pointer-events-none absolute bottom-3 right-4 select-none font-mono text-[10px]"
        style={{ color: dark ? "#333" : "#bbb" }}
      >
        100%
      </span>
    </div>
  );
}
