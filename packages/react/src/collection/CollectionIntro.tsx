"use client";

import React, { useState } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";

interface CollectionIntroProps {
  category?: string;
  title: string;
  tags?: string[];
  description?: string;
  expandedContent?: React.ReactNode;
  className?: string;
}

export function CollectionIntro({
  category,
  title,
  tags,
  description,
  expandedContent,
  className = "",
}: CollectionIntroProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={className}
      style={{
        padding: "20px 24px",
        fontFamily: "Raleway, sans-serif",
      }}
    >
      {/* Category label */}
      {category && (
        <p
          style={{
            fontSize: "10px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1.2px",
            color: "#888",
            marginBottom: "4px",
            marginTop: 0,
          }}
        >
          {category}
        </p>
      )}

      {/* Title */}
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "#111",
          margin: 0,
          fontFamily: "Raleway, sans-serif",
        }}
      >
        {title}
      </h1>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginTop: "12px",
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "11px",
                fontWeight: 400,
                color: "#111",
                fontFamily: "Raleway, sans-serif",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: "13px",
            fontWeight: 400,
            color: "#555",
            lineHeight: 1.6,
            maxWidth: "600px",
            marginTop: "8px",
            marginBottom: 0,
            fontFamily: "Raleway, sans-serif",
          }}
        >
          {description}
        </p>
      )}

      {/* Learn more toggle */}
      {expandedContent && (
        <>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              fontWeight: 400,
              color: "#111",
              textDecoration: "underline",
              background: "none",
              border: "none",
              padding: 0,
              marginTop: "10px",
              cursor: "pointer",
              fontFamily: "Raleway, sans-serif",
            }}
          >
            Learn more
            {expanded ? <CaretUp size={10} /> : <CaretDown size={10} />}
          </button>

          <div
            style={{
              overflow: "hidden",
              maxHeight: expanded ? "2000px" : "0",
              opacity: expanded ? 1 : 0,
              transition: "max-height 0.3s ease, opacity 0.2s ease",
              visibility: expanded ? "visible" : "hidden",
            }}
          >
            <div style={{ marginTop: "12px" }}>{expandedContent}</div>
          </div>
        </>
      )}
    </div>
  );
}
