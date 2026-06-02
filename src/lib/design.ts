import type { CSSProperties } from "react";

export const tokens = {
  colors: {
    background: "#fdfbf7",
    foreground: "#2d2d2d",
    muted: "#e5e0d8",
    accent: "#ff4d4d",
    secondary: "#2d5da1",
    border: "#2d2d2d",
    paper: "#ffffff",
    paperSoft: "#fff9c4",
  },
  radius: {
    wobbly: "255px 15px 225px 15px / 15px 225px 15px 255px",
    wobblyMd: "75px 25px 75px 25px / 25px 75px 25px 75px",
  },
  shadow: {
    hard: "4px 4px 0px 0px #2d2d2d",
    hover: "2px 2px 0px 0px #2d2d2d",
    strong: "8px 8px 0px 0px #2d2d2d",
  },
};

export const cardBase: CSSProperties = {
  background: tokens.colors.paper,
  border: `3px solid ${tokens.colors.border}`,
  borderRadius: tokens.radius.wobbly,
  boxShadow: tokens.shadow.hard,
};

export const buttonBase: CSSProperties = {
  borderRadius: tokens.radius.wobbly,
  border: `3px solid ${tokens.colors.border}`,
  boxShadow: tokens.shadow.hard,
  cursor: "pointer",
  background: tokens.colors.paper,
  color: tokens.colors.foreground,
  fontFamily: "var(--font-patrick)",
  padding: "0.9rem 1.5rem",
  transition: "transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease, color 0.15s ease",
};

export const sectionHeaderStyles: CSSProperties = {
  fontWeight: 700,
  letterSpacing: "-0.04em",
  margin: "0 0 0.75rem",
  lineHeight: 1.05,
};
