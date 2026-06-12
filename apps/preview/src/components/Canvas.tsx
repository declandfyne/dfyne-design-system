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
  return (
    <div
      className="flex flex-1 items-center justify-center overflow-auto p-10"
      style={{ background: dark ? "var(--canvas-bg)" : "#e8e8e8" }}
    >
      {fullWidth ? (
        <div className="w-full max-w-[1200px]">{children}</div>
      ) : (
        <div
          className="flex flex-col items-center gap-6 rounded-xl bg-white px-16 py-12"
          style={{ minWidth: 300, boxShadow: "0 0 0 1px rgba(255,255,255,0.05)" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
