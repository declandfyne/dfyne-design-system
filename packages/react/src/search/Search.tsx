import { useState, useEffect, useRef } from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

export type SearchResult = {
  id: string;
  title: string;
  image?: string;
  price?: string;
  type?: "product" | "collection" | "page";
};

export interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  results?: SearchResult[];
  loading?: boolean;
  onSelect?: (result: SearchResult) => void;
}

const typeLabels: Record<string, string> = {
  product: "PRODUCTS",
  collection: "COLLECTIONS",
  page: "PAGES",
};

export function Search({
  value,
  onChange,
  placeholder = "Search",
  results,
  loading = false,
  onSelect,
}: SearchProps) {
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [internalValue, setInternalValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync internal value when controlled value changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Re-open dropdown when results or loading change
  useEffect(() => {
    setDropdownOpen(true);
  }, [results, loading]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  // Close dropdown on Escape key (document-level)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const showDropdown =
    dropdownOpen && (loading || results !== undefined);

  // Group results by type
  const grouped: Record<string, SearchResult[]> = {};
  if (results) {
    for (const r of results) {
      const key = r.type ?? "other";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(r);
    }
  }

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
      {/* Input wrapper */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 42,
          background: "#fafafa",
          border: "1px solid #e0e0d9",
          borderRadius: 4,
          padding: "0 12px",
          gap: 8,
        }}
      >
        <MagnifyingGlass size={18} color="#888" style={{ flexShrink: 0 }} />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={internalValue}
          onChange={(e) => {
            const newValue = e.target.value;
            setInternalValue(newValue);
            onChange(newValue);
          }}
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: 14,
            fontFamily: "Raleway, sans-serif",
            color: "#111",
          }}
        />
        {value && (
          <button
            aria-label="Clear"
            onClick={() => onChange("")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 2,
              flexShrink: 0,
            }}
          >
            <X size={16} color="#888" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "#ffffff",
            borderRadius: 4,
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            border: "1px solid #e0e0d9",
            zIndex: 100,
            maxHeight: 400,
            overflowY: "auto",
          }}
        >
          {loading ? (
            <div
              style={{
                padding: "16px",
                fontSize: 13,
                color: "#666",
                fontFamily: "Raleway, sans-serif",
              }}
            >
              Searching...
            </div>
          ) : results && results.length === 0 ? (
            <div
              style={{
                padding: "16px",
                fontSize: 13,
                color: "#666",
                fontFamily: "Raleway, sans-serif",
              }}
            >
              No results found
            </div>
          ) : (
            Object.entries(grouped).map(([type, items]) => (
              <div key={type}>
                {typeLabels[type] && (
                  <div
                    style={{
                      padding: "10px 12px 4px",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "#888",
                      fontFamily: "Raleway, sans-serif",
                    }}
                  >
                    {typeLabels[type]}
                  </div>
                )}
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelect?.(item);
                      setDropdownOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      width: "100%",
                      padding: "8px 12px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "Raleway, sans-serif",
                      fontSize: 13,
                      color: "#111",
                    }}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        style={{
                          width: 36,
                          height: 45,
                          objectFit: "cover",
                          borderRadius: 2,
                        }}
                      />
                    )}
                    <span style={{ flex: 1 }}>{item.title}</span>
                    {item.price && (
                      <span style={{ color: "#666", fontSize: 12 }}>
                        {item.price}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
