"use client";

import { useState, useEffect } from "react";
import { client } from "../sanity/client";

type SiteContent = {
  announcements?: Array<{ text?: string; detail?: string; link?: string }>;
  hero?: { caption?: string; heading?: string; ctaLabel?: string; secondaryCtaLabel?: string };
  newsletter?: { heading?: string; subtext?: string; placeholder?: string; buttonText?: string };
  uiLabels?: Record<string, string>;
  footer?: { links?: Array<{ label?: string; href?: string }>; copyrightText?: string };
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: 12,
          paddingBottom: 8,
          borderBottom: "1px solid var(--border)",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--border-subtle)" }}>
      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{label}</span>
      <span style={{ fontSize: 12, color: value ? "var(--text-primary)" : "var(--text-muted)", fontStyle: value ? "normal" : "italic" }}>
        {value || "Not set"}
      </span>
    </div>
  );
}

export function ContentPreview() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch<SiteContent | null>(`*[_type == "siteContent"][0]`)
      .then((data) => setContent(data))
      .catch(() => setContent(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ color: "var(--text-muted)", fontSize: 12, padding: 20 }}>
        Loading content...
      </div>
    );
  }

  if (!content) {
    return (
      <div style={{ color: "var(--text-muted)", fontSize: 12, padding: 20 }}>
        No content document found. Create one in the Studio tab to get started.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {content.announcements && content.announcements.length > 0 && (
        <Section title="Announcements">
          {content.announcements.map((a, i) => (
            <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: 12, color: "var(--text-primary)" }}>{a.text || "Empty"}</div>
              {a.detail && (
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{a.detail}</div>
              )}
            </div>
          ))}
        </Section>
      )}

      <Section title="Hero">
        <Field label="Caption" value={content.hero?.caption} />
        <Field label="Heading" value={content.hero?.heading} />
        <Field label="CTA Label" value={content.hero?.ctaLabel} />
        <Field label="Secondary CTA" value={content.hero?.secondaryCtaLabel} />
      </Section>

      <Section title="Newsletter">
        <Field label="Heading" value={content.newsletter?.heading} />
        <Field label="Subtext" value={content.newsletter?.subtext} />
        <Field label="Placeholder" value={content.newsletter?.placeholder} />
        <Field label="Button Text" value={content.newsletter?.buttonText} />
      </Section>

      {content.uiLabels && (
        <Section title="UI Labels">
          {Object.entries(content.uiLabels)
            .filter(([key]) => !key.startsWith("_"))
            .map(([key, value]) => (
              <Field key={key} label={key} value={value} />
            ))}
        </Section>
      )}

      {content.footer && (
        <Section title="Footer">
          <Field label="Copyright" value={content.footer.copyrightText} />
          {content.footer.links?.map((link, i) => (
            <Field key={i} label={link.label || `Link ${i + 1}`} value={link.href} />
          ))}
        </Section>
      )}
    </div>
  );
}
