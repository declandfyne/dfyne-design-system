import {
  InstagramLogo,
  TiktokLogo,
  FacebookLogo,
  YoutubeLogo,
  XLogo,
  PinterestLogo,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";

export type SocialPlatform =
  | "instagram"
  | "tiktok"
  | "facebook"
  | "youtube"
  | "twitter"
  | "pinterest";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
}

export interface SocialIconsProps {
  links: SocialLink[];
  size?: number;
  className?: string;
}

const iconMap: Record<SocialPlatform, ComponentType<{ size?: number }>> = {
  instagram: InstagramLogo,
  tiktok: TiktokLogo,
  facebook: FacebookLogo,
  youtube: YoutubeLogo,
  twitter: XLogo,
  pinterest: PinterestLogo,
};

export function SocialIcons({ links, size = 20, className }: SocialIconsProps) {
  return (
    <nav
      aria-label="Social media links"
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      {links.map(({ platform, href }) => {
        const Icon = iconMap[platform];
        return (
          <a
            key={platform}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform}
            style={{
              color: "#111",
              transition: "color 200ms",
              display: "inline-flex",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#555";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#111";
            }}
          >
            <Icon size={size} />
          </a>
        );
      })}
    </nav>
  );
}
