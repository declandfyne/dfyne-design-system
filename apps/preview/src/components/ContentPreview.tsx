"use client";

import { useState, useEffect, useRef } from "react";
import { client, isSanityConfigured } from "../sanity/client";

type SiteContent = {
  announcements?: Array<{ text?: string; detail?: string; link?: string }>;
  hero?: { caption?: string; heading?: string; ctaLabel?: string; secondaryCtaLabel?: string };
  newsletter?: { heading?: string; subtext?: string; placeholder?: string; buttonText?: string };
  uiLabels?: Record<string, string>;
  navigation?: Record<string, unknown>;
  footer?: { links?: Array<{ label?: string; href?: string }>; copyrightText?: string };
};

type SiteContentDoc = SiteContent & { _id?: string };

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

function EditableField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (val: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "5px 0",
        borderBottom: "1px solid var(--border-subtle)",
        gap: 12,
      }}
    >
      <span
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          flexShrink: 0,
          width: 120,
        }}
      >
        {label}
      </span>
      <input
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,
          background: "var(--input-bg)",
          border: focused ? "1px solid var(--text-muted)" : "1px solid var(--input-border)",
          color: "var(--text-primary)",
          borderRadius: 4,
          padding: "6px 10px",
          fontSize: 12,
          fontFamily: "inherit",
          width: "100%",
          outline: "none",
        }}
      />
    </div>
  );
}

export function ContentPreview() {
  const [content, setContent] = useState<SiteContentDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const docId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!isSanityConfigured) {
      setLoading(false);
      return;
    }
    client
      .fetch<SiteContentDoc | null>(
        `*[_type == "siteContent"][0]{ _id, announcements, hero, newsletter, uiLabels, navigation, footer }`
      )
      .then((data) => {
        if (data) {
          docId.current = data._id;
        }
        setContent(data);
      })
      .catch(() => setContent(null))
      .finally(() => setLoading(false));
  }, []);

  const updateField = (path: string, value: string) => {
    setDirty(true);
    setContent((prev) => {
      if (!prev) return prev;
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split(".");
      let obj: Record<string, unknown> = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        if (/^\d+$/.test(key)) {
          obj = (obj as unknown as unknown[])[parseInt(key)] as Record<string, unknown>;
        } else {
          obj = obj[key] as Record<string, unknown>;
        }
      }
      obj[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  const addAnnouncement = () => {
    setDirty(true);
    setContent((prev) => {
      if (!prev) return prev;
      const copy = JSON.parse(JSON.stringify(prev));
      copy.announcements = [...(copy.announcements ?? []), { text: "", detail: "", link: "" }];
      return copy;
    });
  };

  const removeAnnouncement = (i: number) => {
    setDirty(true);
    setContent((prev) => {
      if (!prev) return prev;
      const copy = JSON.parse(JSON.stringify(prev));
      copy.announcements = (copy.announcements ?? []).filter((_: unknown, idx: number) => idx !== i);
      return copy;
    });
  };

  const addFooterLink = () => {
    setDirty(true);
    setContent((prev) => {
      if (!prev) return prev;
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy.footer) copy.footer = {};
      copy.footer.links = [...(copy.footer.links ?? []), { label: "", href: "" }];
      return copy;
    });
  };

  const removeFooterLink = (i: number) => {
    setDirty(true);
    setContent((prev) => {
      if (!prev) return prev;
      const copy = JSON.parse(JSON.stringify(prev));
      copy.footer.links = (copy.footer.links ?? []).filter((_: unknown, idx: number) => idx !== i);
      return copy;
    });
  };

  const handleSave = async () => {
    if (!isSanityConfigured || !docId.current) return;
    setSaving(true);
    try {
      await client.createOrReplace({
        _id: docId.current,
        _type: "siteContent",
        announcements: content?.announcements,
        hero: content?.hero,
        newsletter: content?.newsletter,
        uiLabels: content?.uiLabels,
        navigation: content?.navigation,
        footer: content?.footer,
      });
      setSaved(true);
      setDirty(false);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to save content:", err);
    } finally {
      setSaving(false);
    }
  };

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

  const saveLabel = saving ? "SAVING..." : saved ? "SAVED" : "SAVE CONTENT";
  const saveColor = saved ? "#22c55e" : "#ffffff";
  const saveBg = dirty && !saving ? "#111111" : "#333333";

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Header row with Save button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 24,
        }}
      >
        <button
          onClick={handleSave}
          disabled={!dirty || saving}
          style={{
            background: saveBg,
            color: saveColor,
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "2.7px",
            textTransform: "uppercase",
            padding: "10px 24px",
            borderRadius: 4,
            border: "none",
            cursor: dirty && !saving ? "pointer" : "default",
            transition: "background 0.15s",
          }}
        >
          {saveLabel}
        </button>
      </div>

      {/* Announcements */}
      <Section title="Announcements">
        {(content.announcements ?? []).map((a, i) => (
          <div
            key={i}
            style={{
              padding: "10px 0",
              borderBottom: "1px solid var(--border-subtle)",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                Announcement {i + 1}
              </span>
              <button
                onClick={() => removeAnnouncement(i)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  fontSize: 14,
                  lineHeight: 1,
                  padding: "0 4px",
                }}
                title="Remove"
              >
                ×
              </button>
            </div>
            <EditableField
              label="Text"
              value={a.text}
              onChange={(v) => updateField(`announcements.${i}.text`, v)}
            />
            <EditableField
              label="Detail"
              value={a.detail}
              onChange={(v) => updateField(`announcements.${i}.detail`, v)}
            />
            <EditableField
              label="Link"
              value={a.link}
              onChange={(v) => updateField(`announcements.${i}.link`, v)}
            />
          </div>
        ))}
        <button
          onClick={addAnnouncement}
          style={{
            marginTop: 8,
            background: "none",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            padding: "6px 14px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          + Add Announcement
        </button>
      </Section>

      {/* Hero */}
      <Section title="Hero">
        <EditableField
          label="Caption"
          value={content.hero?.caption}
          onChange={(v) => updateField("hero.caption", v)}
        />
        <EditableField
          label="Heading"
          value={content.hero?.heading}
          onChange={(v) => updateField("hero.heading", v)}
        />
        <EditableField
          label="CTA Label"
          value={content.hero?.ctaLabel}
          onChange={(v) => updateField("hero.ctaLabel", v)}
        />
        <EditableField
          label="Secondary CTA"
          value={content.hero?.secondaryCtaLabel}
          onChange={(v) => updateField("hero.secondaryCtaLabel", v)}
        />
      </Section>

      {/* Newsletter */}
      <Section title="Newsletter">
        <EditableField
          label="Heading"
          value={content.newsletter?.heading}
          onChange={(v) => updateField("newsletter.heading", v)}
        />
        <EditableField
          label="Subtext"
          value={content.newsletter?.subtext}
          onChange={(v) => updateField("newsletter.subtext", v)}
        />
        <EditableField
          label="Placeholder"
          value={content.newsletter?.placeholder}
          onChange={(v) => updateField("newsletter.placeholder", v)}
        />
        <EditableField
          label="Button Text"
          value={content.newsletter?.buttonText}
          onChange={(v) => updateField("newsletter.buttonText", v)}
        />
      </Section>

      {/* UI Labels */}
      {content.uiLabels && (
        <Section title="UI Labels">
          {Object.entries(content.uiLabels)
            .filter(([key]) => !key.startsWith("_"))
            .map(([key, value]) => (
              <EditableField
                key={key}
                label={key}
                value={value}
                onChange={(v) => updateField(`uiLabels.${key}`, v)}
              />
            ))}
        </Section>
      )}

      {/* Footer */}
      <Section title="Footer">
        <EditableField
          label="Copyright"
          value={content.footer?.copyrightText}
          onChange={(v) => updateField("footer.copyrightText", v)}
        />
        {(content.footer?.links ?? []).map((link, i) => (
          <div
            key={i}
            style={{
              padding: "10px 0",
              borderBottom: "1px solid var(--border-subtle)",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                Link {i + 1}
              </span>
              <button
                onClick={() => removeFooterLink(i)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  fontSize: 14,
                  lineHeight: 1,
                  padding: "0 4px",
                }}
                title="Remove"
              >
                ×
              </button>
            </div>
            <EditableField
              label="Label"
              value={link.label}
              onChange={(v) => updateField(`footer.links.${i}.label`, v)}
            />
            <EditableField
              label="Href"
              value={link.href}
              onChange={(v) => updateField(`footer.links.${i}.href`, v)}
            />
          </div>
        ))}
        <button
          onClick={addFooterLink}
          style={{
            marginTop: 8,
            background: "none",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            padding: "6px 14px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          + Add Link
        </button>
      </Section>
    </div>
  );
}
