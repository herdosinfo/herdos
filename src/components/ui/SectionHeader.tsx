import type { ReactNode } from "react";
import { tokens, sectionHeaderStyles } from "@/lib/design";

export function SectionHeader({
  title,
  subtitle,
  accent,
}: {
  title: string;
  subtitle?: string;
  accent?: string;
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      {subtitle ? (
        <div style={{ textTransform: "uppercase", letterSpacing: "0.2em", color: accent ?? tokens.colors.secondary, fontSize: 11, marginBottom: 8 }}>
          {subtitle}
        </div>
      ) : null}
      <h1 style={{ ...sectionHeaderStyles, fontSize: "clamp(2rem, 4vw, 3.8rem)", color: tokens.colors.foreground }}>{title}</h1>
    </div>
  );
}
