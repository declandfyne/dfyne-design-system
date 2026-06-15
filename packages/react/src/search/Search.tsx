import { useState, useEffect, useRef } from "react";
import { MagnifyingGlass, X, TrendUp } from "@phosphor-icons/react";

export type SearchResult = {
  id: string;
  title: string;
  image?: string;
  price?: string;
  color?: string;
  type?: "product" | "collection" | "page";
};

export interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  results?: SearchResult[];
  loading?: boolean;
  onSelect?: (result: SearchResult) => void;
  onClose?: () => void;
  popularSearches?: string[];
  recentlyViewed?: SearchResult[];
  onPopularSearch?: (term: string) => void;
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
  onClose,
  popularSearches,
  recentlyViewed,
  onPopularSearch,
}: SearchProps) {
  const [internalValue, setInternalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const hasQuery = internalValue.length > 0;

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
    <div
      style={{
        width: "100%",
        background: "#ffffff",
        fontFamily: "Raleway, sans-serif",
        position: "relative",
      }}
    >
      {/* Close button */}
      {onClose && (
        <button
          aria-label="Close search"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={24} color="#111" />
        </button>
      )}

      {/* Search input */}
      <div style={{ padding: "24px 24px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: 52,
            background: "#ffffff",
            border: "1px solid #e0e0d9",
            borderRadius: 4,
            padding: "0 16px",
            gap: 12,
          }}
        >
          <MagnifyingGlass size={20} color="#888" style={{ flexShrink: 0 }} />
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
              fontSize: 16,
              fontFamily: "Raleway, sans-serif",
              color: "#111",
            }}
          />
          {hasQuery && (
            <button
              aria-label="Clear"
              onClick={() => {
                setInternalValue("");
                onChange("");
                inputRef.current?.focus();
              }}
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
              <X size={18} color="#888" />
            </button>
          )}
        </div>
      </div>

      {/* Content area */}
      <div style={{ padding: "24px" }}>
        {/* Search results (when typing) */}
        {hasQuery && (
          <>
            {loading ? (
              <div style={{ fontSize: 13, color: "#666", padding: "8px 0" }}>
                Searching...
              </div>
            ) : results && results.length === 0 ? (
              <div style={{ fontSize: 13, color: "#666", padding: "8px 0" }}>
                No results found for &ldquo;{internalValue}&rdquo;
              </div>
            ) : (
              Object.entries(grouped).map(([type, items]) => (
                <div key={type} style={{ marginBottom: 24 }}>
                  {typeLabels[type] && (
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        color: "#111",
                        marginBottom: 12,
                      }}
                    >
                      {typeLabels[type]}
                    </div>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onSelect?.(item)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          width: "100%",
                          padding: "8px 4px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                          fontFamily: "Raleway, sans-serif",
                          fontSize: 13,
                          color: "#111",
                          borderRadius: 4,
                        }}
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt=""
                            style={{
                              width: 40,
                              height: 50,
                              objectFit: "cover",
                              borderRadius: 2,
                              background: "#f5f5f5",
                            }}
                          />
                        )}
                        <div style={{ flex: 1 }}>
                          <div>{item.title}</div>
                          {item.color && (
                            <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>{item.color}</div>
                          )}
                        </div>
                        {item.price && (
                          <span style={{ color: "#111", fontSize: 12, fontWeight: 400 }}>
                            {item.price}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* Default state: Popular searches + Recently viewed */}
        {!hasQuery && (
          <>
            {/* Popular Searches */}
            {popularSearches && popularSearches.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#111",
                    marginBottom: 16,
                  }}
                >
                  <TrendUp size={16} weight="bold" />
                  POPULAR SEARCHES
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setInternalValue(term);
                        onChange(term);
                        onPopularSearch?.(term);
                      }}
                      style={{
                        padding: "10px 20px",
                        border: "1px solid #d9d9d9",
                        borderRadius: 999,
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: "1.2px",
                        textTransform: "uppercase",
                        color: "#333",
                        fontFamily: "Raleway, sans-serif",
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recently Viewed */}
            {recentlyViewed && recentlyViewed.length > 0 && (
              <div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#111",
                    marginBottom: 16,
                  }}
                >
                  RECENTLY VIEWED
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    overflowX: "auto",
                    paddingBottom: 8,
                  }}
                >
                  {recentlyViewed.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onSelect?.(item)}
                      style={{
                        flexShrink: 0,
                        width: 160,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        padding: 0,
                        fontFamily: "Raleway, sans-serif",
                      }}
                    >
                      {item.image && (
                        <div
                          style={{
                            width: 160,
                            height: 200,
                            borderRadius: 4,
                            overflow: "hidden",
                            background: "#f5f5f5",
                            marginBottom: 8,
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      )}
                      <div style={{ fontSize: 12, color: "#111", lineHeight: 1.4 }}>
                        {item.title}
                      </div>
                      {item.color && (
                        <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                          {item.color}
                        </div>
                      )}
                      {item.price && (
                        <div style={{ fontSize: 12, color: "#111", marginTop: 2, fontWeight: 400 }}>
                          {item.price}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
