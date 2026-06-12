"use client";

import { useState } from "react";
import { List, MagnifyingGlass, Bag } from "@phosphor-icons/react";
import type { SearchResult } from "../search/Search";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface HeaderProps {
  logo: React.ReactNode;
  navItems: NavItem[];
  onSearch?: (query: string) => void;
  searchResults?: SearchResult[];
  cartItemCount?: number;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

export function Header({
  logo,
  navItems,
  onSearch,
  cartItemCount,
  onCartClick,
  onMenuClick,
  className,
}: HeaderProps) {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  return (
    <header
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        background: "#fff",
        borderBottom: "1px solid #e8e8e1",
        zIndex: 40,
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "Raleway, sans-serif",
      }}
    >
      {/* Left section */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {onMenuClick && (
          <button
            aria-label="Menu"
            onClick={onMenuClick}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            className="md:hidden"
          >
            <List size={24} color="#111" />
          </button>
        )}
        {logo}
      </div>

      {/* Center nav */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
        className="hidden md:flex"
      >
        {navItems.map((item) => (
          <div
            key={item.label}
            style={{ position: "relative" }}
            onMouseEnter={() =>
              item.children ? setHoveredNav(item.label) : undefined
            }
            onMouseLeave={() =>
              item.children ? setHoveredNav(null) : undefined
            }
          >
            <a
              href={item.href}
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: "#111",
                textDecoration: "none",
                fontFamily: "Raleway, sans-serif",
              }}
            >
              {item.label}
            </a>

            {/* Mega-menu */}
            {item.children && hoveredNav === item.label && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  background: "#fff",
                  border: "1px solid #e8e8e1",
                  boxShadow:
                    "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
                  padding: 24,
                  minWidth: 200,
                  zIndex: 50,
                }}
              >
                {item.children.map((child) => (
                  <a
                    key={child.label}
                    href={child.href}
                    style={{
                      display: "block",
                      fontSize: 11,
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 400,
                      color: "#111",
                      textDecoration: "none",
                      padding: "6px 0",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#555";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#111";
                    }}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Right section */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {onSearch && (
          <button
            aria-label="Search"
            onClick={() => onSearch("")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <MagnifyingGlass size={20} color="#111" />
          </button>
        )}
        {onCartClick && (
          <button
            aria-label="Cart"
            onClick={onCartClick}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              position: "relative",
            }}
          >
            <Bag size={20} color="#111" />
            {cartItemCount != null && cartItemCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -4,
                  right: -6,
                  background: "#111",
                  color: "#fff",
                  fontSize: 8,
                  fontWeight: 600,
                  fontFamily: "Raleway, sans-serif",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                }}
              >
                {cartItemCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
