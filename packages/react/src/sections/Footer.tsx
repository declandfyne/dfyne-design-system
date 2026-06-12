import { SocialIcons } from "../navigation/SocialIcons";
import type { SocialLink } from "../navigation/SocialIcons";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocial {
  platform: "instagram" | "facebook" | "youtube" | "tiktok" | "pinterest" | "twitter";
  href: string;
}

export interface FooterProps {
  links: FooterLink[];
  socials?: FooterSocial[];
  className?: string;
}

export function Footer({ links, socials, className = "" }: FooterProps) {
  return (
    <footer
      className={className}
      style={{
        borderTop: "1px solid #e8e8e1",
        backgroundColor: "#fff",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize: 11,
              fontWeight: 400,
              color: "#111",
              textDecoration: "none",
            }}
          >
            {label}
          </a>
        ))}
      </nav>

      {socials && socials.length > 0 && (
        <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
          <SocialIcons links={socials as SocialLink[]} size={20} />
        </div>
      )}
    </footer>
  );
}
