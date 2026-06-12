"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { GlobeHemisphereWest } from "@phosphor-icons/react";

export interface Region {
  code: string;
  label: string;
  flag: string;
  currency?: string;
}

export interface RegionSelectorProps {
  regions: Region[];
  activeRegion: string;
  onChange: (code: string) => void;
  className?: string;
}

export function RegionSelector({
  regions,
  activeRegion,
  onChange,
  className,
}: RegionSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const active = regions.find((r) => r.code === activeRegion);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [],
  );

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [open, handleKeyDown, handleClickOutside]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", display: "inline-block" }}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          fontSize: 11,
          fontFamily: "Raleway, sans-serif",
          fontWeight: 600,
          textTransform: "uppercase",
          color: "#111",
          lineHeight: 1,
        }}
      >
        {active ? (
          <span>{active.flag}</span>
        ) : (
          <GlobeHemisphereWest size={14} color="#111" />
        )}
        <span>{active?.code ?? "Region"}</span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: 4,
            background: "#fff",
            border: "1px solid #e8e8e1",
            boxShadow:
              "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
            minWidth: 200,
            zIndex: 50,
          }}
        >
          {regions.map((region) => {
            const isActive = region.code === activeRegion;
            return (
              <button
                key={region.code}
                onClick={() => {
                  onChange(region.code);
                  setOpen(false);
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#fafafa";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: "8px 14px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 11,
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  color: "#111",
                  textAlign: "left",
                }}
              >
                <span>{region.flag}</span>
                <span style={{ flex: 1 }}>{region.label}</span>
                {region.currency && (
                  <span style={{ color: "#777" }}>{region.currency}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
