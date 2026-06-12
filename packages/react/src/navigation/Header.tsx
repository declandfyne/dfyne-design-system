"use client";

import { useState } from "react";
import {
  List,
  MagnifyingGlass,
  User,
  Bag,
  CaretDown,
  InstagramLogo,
  FacebookLogo,
  YoutubeLogo,
  TiktokLogo,
  XLogo,
  PinterestLogo,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface UtilityLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform:
    | "instagram"
    | "facebook"
    | "youtube"
    | "tiktok"
    | "twitter"
    | "pinterest";
  href: string;
}

export interface NavSection {
  heading?: string;
  links: { label: string; href: string }[];
}

export interface NavDropdown {
  label: string;
  sections: NavSection[];
}

export interface HeaderProps {
  logo: React.ReactNode;
  utilityLinks?: UtilityLink[];
  socials?: SocialLink[];
  regionFlag?: string;
  onRegionClick?: () => void;
  navDropdowns: NavDropdown[];
  onSearchClick?: () => void;
  onAccountClick?: () => void;
  onCartClick?: () => void;
  cartItemCount?: number;
  onMenuClick?: () => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Social icon map                                                    */
/* ------------------------------------------------------------------ */

const socialIconMap: Record<string, ComponentType<{ size?: number }>> = {
  instagram: InstagramLogo,
  facebook: FacebookLogo,
  youtube: YoutubeLogo,
  tiktok: TiktokLogo,
  twitter: XLogo,
  pinterest: PinterestLogo,
};

/* ------------------------------------------------------------------ */
/*  Shared inline styles                                               */
/* ------------------------------------------------------------------ */

const resetButton: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Header({
  logo,
  utilityLinks,
  socials,
  regionFlag,
  onRegionClick,
  navDropdowns,
  onSearchClick,
  onAccountClick,
  onCartClick,
  cartItemCount,
  onMenuClick,
  className,
}: HeaderProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header
      className={className}
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        background: "#fff",
        zIndex: 40,
        fontFamily: "Raleway, sans-serif",
      }}
    >
      {/* ============================================================ */}
      {/* Row 1 — Utility Bar                                          */}
      {/* ============================================================ */}
      <div
        className="hidden md:flex"
        style={{
          height: 40,
          padding: "0 24px",
          display: undefined, // overridden by className
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e8e8e1",
        }}
      >
        {/* Utility links (left) */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: 16 }}
          aria-label="Utility"
        >
          {utilityLinks?.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: 11,
                fontFamily: "Raleway, sans-serif",
                fontWeight: 400,
                color: "#111",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.textDecoration =
                  "underline";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.textDecoration =
                  "none";
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Socials + flag (right) */}
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {socials?.map(({ platform, href }) => {
            const SocialIcon = socialIconMap[platform];
            if (!SocialIcon) return null;
            return (
              <a
                key={platform}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform}
                style={{
                  color: "#111",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 26,
                  height: 40,
                }}
              >
                <SocialIcon size={16} />
              </a>
            );
          })}
          {regionFlag && (
            <button
              onClick={onRegionClick}
              aria-label="Region"
              style={{
                ...resetButton,
                fontSize: 16,
                marginLeft: 4,
              }}
            >
              {regionFlag}
            </button>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* Row 2 — Main Nav                                             */}
      {/* ============================================================ */}
      <div
        style={{
          height: 43,
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* Left — nav dropdowns (desktop) / hamburger (mobile) */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
          {/* Hamburger — mobile only */}
          <button
            aria-label="Menu"
            onClick={onMenuClick}
            style={resetButton}
            className="md:hidden"
          >
            <List size={24} color="#111" />
          </button>

          {/* Desktop nav dropdown triggers */}
          <nav
            className="hidden md:flex"
            style={{ display: undefined, alignItems: "center", gap: 20 }}
          >
            {navDropdowns.map((dropdown) => (
              <div
                key={dropdown.label}
                onMouseEnter={() => setOpenDropdown(dropdown.label)}
                onMouseLeave={() => setOpenDropdown(null)}
                style={{ position: "relative" }}
              >
                <button
                  style={{
                    ...resetButton,
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    color: "#111",
                    fontFamily: "Raleway, sans-serif",
                    gap: 4,
                  }}
                >
                  {dropdown.label}
                  <CaretDown size={10} weight="bold" />
                </button>
              </div>
            ))}
          </nav>
        </div>

        {/* Center — Logo */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {logo}
        </div>

        {/* Right — Account, Search, Cart */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, justifyContent: "flex-end" }}>
          {onAccountClick && (
            <button
              aria-label="Account"
              onClick={onAccountClick}
              style={resetButton}
              className="hidden md:flex"
            >
              <User size={20} color="#111" />
            </button>
          )}
          {onSearchClick && (
            <button
              aria-label="Search"
              onClick={onSearchClick}
              style={resetButton}
              className="hidden md:flex"
            >
              <MagnifyingGlass size={20} color="#111" />
            </button>
          )}
          <button
            aria-label="Cart"
            onClick={onCartClick}
            style={{ ...resetButton, position: "relative" }}
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
        </div>
      </div>

      {/* ============================================================ */}
      {/* Mega-menu overlay                                            */}
      {/* ============================================================ */}
      {navDropdowns.map((dropdown) =>
        openDropdown === dropdown.label ? (
          <div
            key={dropdown.label}
            onMouseEnter={() => setOpenDropdown(dropdown.label)}
            onMouseLeave={() => setOpenDropdown(null)}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#fff",
              borderTop: "1px solid #e8e8e1",
              boxShadow:
                "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
              padding: "32px 48px",
              zIndex: 50,
              display: "flex",
              gap: 48,
              fontFamily: "Raleway, sans-serif",
            }}
          >
            {dropdown.sections.map((section, sIdx) => (
              <div key={section.heading ?? `section-${sIdx}`}>
                {section.heading && (
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      color: "#111",
                      marginBottom: 12,
                    }}
                  >
                    {section.heading}
                  </div>
                )}
                {section.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      display: "block",
                      fontSize: 11,
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 400,
                      color: "#111",
                      textDecoration: "none",
                      padding: "5px 0",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#555";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#111";
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        ) : null,
      )}
    </header>
  );
}
