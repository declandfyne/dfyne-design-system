import React from "react";

export interface CategoryImage {
  image: string;
  alt: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface CategoryImageCarouselProps {
  items: CategoryImage[];
  className?: string;
}

export function CategoryImageCarousel({
  items,
  className = "",
}: CategoryImageCarouselProps) {
  return (
    <div
      className={`flex overflow-x-auto snap-x snap-mandatory scrollbar-hide ${className}`}
      style={{
        gap: "12px",
        padding: "0 24px",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="flex flex-col items-center shrink-0 snap-start"
          style={{ textDecoration: "none" }}
        >
          <img
            src={item.image}
            alt={item.alt}
            style={{
              width: "120px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "0",
              display: "block",
            }}
          />
          <span
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize: "10px",
              fontWeight: item.active ? 700 : 600,
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              color: "#111111",
              textAlign: "center",
              marginTop: "8px",
              whiteSpace: "nowrap",
            }}
          >
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
}
