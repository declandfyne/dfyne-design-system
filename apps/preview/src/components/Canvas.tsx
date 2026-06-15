"use client";

export function Canvas({
  children,
  dark,
  fullWidth,
}: {
  children: React.ReactNode;
  dark: boolean;
  fullWidth?: boolean;
}) {
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
      <div className={fullWidth ? "w-full" : "flex items-center justify-center p-10"}>
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
